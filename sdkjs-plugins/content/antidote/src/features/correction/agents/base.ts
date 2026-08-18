/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

import {
  WordProcessorAgent, ParamsReplace, ParamsAllowEdit, ParamsNewCorrectionMemory,
} from '@druide-informatique/antidote-api-js';

import { Editor, BaseEditor } from '@api/editor';

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

const SELECT_INTERVAL_DEBOUNCE_MS = 500;

// Antidote requires `correctIntoWordProcessor` to return synchronously, but applying a correction
// into the ONLYOFFICE document is async (callCommand/executeMethod round-trip). Corrections are
// queued and applied one at a time so two in-flight replacements can never race on the same
// paragraph/selection offsets.
export abstract class BaseCorrectionAgent extends WordProcessorAgent {
  protected title: string;

  protected editor: BaseEditor = Editor.create();

  protected readonly PARAGRAPH_SEPARATOR = '\r\n\r\n';

  // Populated by `preloadCorrectionMemory()` (call from `loadText`, which
  // already run before the session starts) so the synchronous `configuration()` has it ready —
  // reading it from the document itself is async and can't happen inside `configuration()`.
  protected correctionMemory: string | undefined;

  // True for as long as at least one of our own corrections is queued/applying — lets subclasses
  // that watch for external document-content-change events (see TextEditor.watchContentChanges)
  // tell "the document just changed because Antidote's own correction wrote it" apart from a
  // genuine concurrent edit (another collaborator, or the user typing directly) they need to react
  // to. A count rather than a bool since corrections can queue up faster than they apply.
  protected get isApplyingCorrections(): boolean {
    return this.pendingCorrections > 0;
  }

  private pendingCorrections = 0;

  private queue: Promise<void> = Promise.resolve();

  private selectIntervalTimer: ReturnType<typeof setTimeout> | null = null;

  protected debounceSelectInterval(fn: () => void): void {
    if (this.selectIntervalTimer) clearTimeout(this.selectIntervalTimer);
    this.selectIntervalTimer = setTimeout(() => {
      this.selectIntervalTimer = null;
      fn();
    }, SELECT_INTERVAL_DEBOUNCE_MS);
  }

  // Serializes arbitrary async work (e.g. a concurrent-edit resync rebuilding zone offsets) behind
  // whatever correction is currently applying, and vice versa — the two must never run concurrently,
  // since both mutate the same zone/offset bookkeeping. Without this, a resync racing an in-flight
  // correctIntoWordProcessor can overwrite zones with a stale/mismatched view, so the *next*
  // correction's offsets no longer match what Antidote expects ("the correct location in the text
  // cannot be found") — reproducible via rapid undo/redo firing a burst of content-change events.
  protected enqueue<T>(fn: () => Promise<T>): Promise<T> {
    const result = this.queue.then(fn);
    this.queue = result.then(() => undefined, () => undefined);
    return result;
  }

  constructor(title: string, private readonly onSessionEnded?: () => void) {
    super();
    this.title = title;
  }

  // Lets Antidote remember which suggestions were already ignored/applied for this document
  // across separate Corrector sessions — see BaseEditor.loadCorrectionMemory/saveCorrectionMemory
  // (stored as a custom document property, so it travels with the file for any collaborator to
  // pick up, rather than staying local to this browser).
  protected async preloadCorrectionMemory(): Promise<string> {
    this.correctionMemory = await this.editor.loadCorrectionMemory();
    return this.correctionMemory;
  }

  // Antidote calls this when the correction window (or Antidote itself) closes on its own — not
  // just when we call `connectix.close()` ourselves. Without this, `useCorrection`'s connection
  // state would only ever reset via our own "Stop" button, going stale the moment the user closes
  // Antidote's window directly instead.
  sessionEnded(): void {
    if (this.selectIntervalTimer) clearTimeout(this.selectIntervalTimer);
    this.onSessionEnded?.();
  }

  // `documentId` is the one stable per-document identifier the plugin host exposes — separate
  // from (and in addition to) the correctionMemory blob itself, in case Antidote's own cache also
  // keys off this.
  documentPath(): string {
    return window.Asc?.plugin?.info?.documentId ?? '';
  }

  newCorrectionMemory(params: ParamsNewCorrectionMemory): void {
    let data = '';
    if (typeof params === 'string') {
      data = params;
    } else if (params && typeof params === 'object' && 'data' in params) {
      data = typeof params.data === 'string' ? params.data : bytesToBase64(params.data);
    }
    if (!data) {
      return;
    }
    this.editor.saveCorrectionMemory(data).catch((err) => {
      console.error('Failed to save correction memory:', err);
    });
  }

  // Verifies the text Antidote thinks is at [positionStart, positionEnd) (`context`) still matches
  // what we actually have cached — our best defense against a correction landing in the wrong
  // place after a concurrent edit (another collaborator, or the user typing directly) that
  // resyncing (see DocumentCorrectionAgent.scheduleResync) didn't catch or hasn't run yet. Each
  // subclass checks against its own text representation (paragraph-indexed vs. one flat string).
  abstract allowEdit(params: ParamsAllowEdit): boolean;

  correctIntoWordProcessor(params: ParamsReplace): boolean {
    this.pendingCorrections += 1;
    this.enqueue(() => this.applyCorrection(params)).finally(() => {
      this.pendingCorrections -= 1;
    });
    return true;
  }

  protected abstract applyCorrection(params: ParamsReplace): Promise<void>;
}
