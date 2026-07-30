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

import { StyleInfo } from '@druide-informatique/antidote-api-js';
import { DocumentError } from './errors';
import type { PluginEditorEventName } from 'onlyoffice-plugins-api';

export type CorrectionStyle = 'bold' | 'italic' | 'superscript' | 'subscript' | 'strike';

export interface TextWithStyle {
  text: string;
  styleInfo?: StyleInfo[];
}

export interface DocumentParagraph extends TextWithStyle {
  id: string;
  // Present only when `text` is a sub-range clip of this paragraph's real, full text
  // (getDocumentContent's `range` param — SelectionCorrectionAgent's zone mode, for whichever
  // paragraph the selection starts/ends mid-way through): the part of the real text that sits
  // before/after `text`. Needed to offset selection positions back to the real paragraph, and to
  // reconstruct the full paragraph (rather than lose the untouched prefix/suffix) on replace.
  prefix?: string;
  suffix?: string;
}

// A table cell's own paragraphs, kept out of the surrounding main-text zone and passed to Antidote
// as their own independent zone instead — so a correction inside a table cell never has to share
// position bookkeeping with the main text (see DocumentCorrectionAgent).
export interface DocumentZone {
  zoneId: string;
  paragraphs: DocumentParagraph[];
}

// Zones in document order — the main text is split into its own zone around each table (rather
// than one zone for all the main text followed by all table zones), so Antidote's Corrector window
// lists the table where it actually occurs instead of always at the bottom.
export interface DocumentContent {
  zones: DocumentZone[];
}

const SELECTED_TEXT_OPTIONS = {
  Numbering: false,
  Math: false,
  ParaSeparator: '\r\n\r\n',
  TableCellSeparator: '\t',
  TabSymbol: String.fromCharCode(160),
};

export const CORRECTION_MEMORY_PROPERTY = 'AntidoteCorrectionMemory';

// The three editor-content-mutation events TextEditor listens for to detect changes happening
// concurrently with an active correction session — text edited within an existing paragraph, or
// paragraphs added/removed (which would otherwise silently shift DocumentCorrectionAgent's
// index-based paragraph bookkeeping out of sync).
export const CONTENT_CHANGE_EVENTS: PluginEditorEventName[] = ['onChangeCurrentPage', 'onParagraphText', 'onPargraphAdd', 'onParagraphRemove'] as const;

// Generic host methods live here; editor-specific object-model methods belong in subclasses.
export abstract class BaseEditor {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // eslint-disable-next-line class-methods-use-this -- shared instance helper, no per-editor state needed
  protected ensurePlugin(): void {
    if (!window.Asc?.plugin?.callCommand) throw new DocumentError('Plugin API unavailable', 'PLUGIN_UNAVAILABLE');
  }

  // No caret-word API outside Word's object model. TextEditor overrides this with the real
  // `Api.GetDocument().GetCurrentWord()` call; every other editor keeps this empty-string default,
  // which callers (e.g. useLookup's Dictionaries/Guides caret fallback) treat as "nothing found."
  // eslint-disable-next-line class-methods-use-this -- overridden by subclasses; base is a no-op
  getCurrentWord(): Promise<string> {
    console.error('getCurrentWord is not implemented in this editor');
    return Promise.resolve('');
  }

  // `range` scopes this to a sub-range of the document (SelectionCorrectionAgent's zone mode);
  // omitted, it covers the whole document (DocumentCorrectionAgent).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  getDocumentContent(_range?: { start: number; end: number }): Promise<DocumentContent> {
    console.error('getDocumentContent is not implemented in this editor');
    return Promise.resolve({ zones: [] });
  }

  // Whether this editor can group content into independent zones (table cells kept apart from the
  // surrounding main text — see getDocumentContent) via a real paragraph object model. False by
  // default; only TextEditor (Word) has one. SelectionCorrectionAgent uses this to pick between
  // its zone-aware mode and its generic cross-editor flat-string fallback.
  // eslint-disable-next-line class-methods-use-this -- overridden by TextEditor; base is always false
  supportsZones(): boolean {
    return false;
  }

  // executeMethod calls a built-in host method directly (works uniformly across word/cell/pdf,
  // unlike Api.GetDocument() which is word-specific).
  getSelectedText(): Promise<string> {
    this.ensurePlugin();
    return new Promise((resolve) => {
      window.Asc.plugin.executeMethod('GetSelectedText', [SELECTED_TEXT_OPTIONS], (text) => resolve(text ?? ''));
    });
  }

  // No run-level style-range extraction outside Word's object model. TextEditor overrides this
  // to add `styleInfo`; every other editor keeps the plain-text default (cosmetic-only data, so
  // dropping it here is always a safe degradation, never a correctness risk for the correction
  // itself).
  getSelectedTextWithStyle(): Promise<TextWithStyle> {
    console.error('getSelectedTextWithStyle is not implemented in this editor');
    return this.getSelectedText().then((text) => ({ text }));
  }

  // Non-selecting counterpart to getSelectedTextWithStyle — reads text/style at an explicit
  // absolute range without touching the live document selection. TextEditor overrides this with a
  // real object-model implementation; every other editor keeps this empty-text default (used only
  // when getSelectionStart/End are non-null, which they aren't outside TextEditor).
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  getRangeTextWithStyle(_start: number, _end: number): Promise<TextWithStyle> {
    console.error('getRangeTextWithStyle is not implemented in this editor');
    return Promise.resolve({ text: '' });
  }

  getSelectionEnd(): Promise<number | null> {
    console.error('getSelectionEnd is not implemented in this editor');
    return Promise.resolve(null);
  }

  getSelectionStart(): Promise<number | null> {
    console.error('getSelectionStart is not implemented in this editor');
    return Promise.resolve(null);
  }

  hasSelection(): Promise<boolean> {
    return this.getSelectedText()
      .then((text) => text.trim().length > 0)
      .catch(() => false);
  }

  // Lets Antidote remember which suggestions were already ignored/applied for this document
  // across multiple Corrector sessions — stored as a custom document property (GetCustomProperties)
  loadCorrectionMemory(): Promise<string> {
    console.error('loadCorrectionMemory is not implemented in this editor');
    return Promise.resolve('');
  }

  replaceContent(text: string, id: string): Promise<void> {
    console.error('replaceContent is not implemented in this editor', { text, id });
    return Promise.resolve();
  }

  replaceSelectedText(paragraphs: string[]): Promise<boolean> {
    this.ensurePlugin();
    return new Promise((resolve) => {
      window.Asc.plugin.executeMethod('ReplaceTextSmart', [paragraphs, undefined, String.fromCharCode(160)], (ok) => resolve(Boolean(ok)));
    });
  }

  // See runQuery for the callCommand sandboxing constraints.
  protected runCommand<T extends Record<string, unknown>>(command: () => void, scope: T): Promise<void> {
    this.ensurePlugin();
    return new Promise((resolve) => {
      window.Asc.scope = scope;
      window.Asc.plugin.callCommand(command, false, true, resolve);
    });
  }

  // callCommand runs `command` inside the document's sandboxed object-model context, where the
  // global `Api`/`Asc.scope` are available. `command` itself must stay self-contained — it's
  // serialized and re-evaluated in that separate realm, so it can only see `Api`/`Asc.scope` and
  // whatever it declares itself; `this` and any outer closure (including this very method) are
  // invisible there. Subclasses passing a command to this must not reference `this` inside it.
  protected runQuery<TResult>(command: () => TResult | { error: string }, scope?: Record<string, unknown>): Promise<TResult> {
    this.ensurePlugin();
    return new Promise(function(resolve, reject) {
      if (scope) {
        window.Asc.scope = scope;
      }
      window.Asc.plugin.callCommand(command, false, true, function(result: unknown) {
        if (result === undefined) {
          reject(new DocumentError('No response from plugin', 'NO_RESPONSE'));
        } else if (typeof result === 'object' && result !== null && 'error' in result && (result as { error?: string }).error) {
          reject(new DocumentError((result as { error: string }).error, 'QUERY_ERROR'));
        } else {
          resolve(result as TResult);
        }
      });
    });
  }

  saveCorrectionMemory(_data: string): Promise<void> {
    console.error('saveCorrectionMemory is not implemented in this editor');
    return Promise.resolve();
  }

  // Highlights a sub-range of a specific paragraph (paragraph-local `start`/`end`, matching how
  // `applyCorrection` already slices `paragraph.text` locally). Called when Antidote reports the
  // user selected text inside its own Corrector window (WordProcessorAgent.selectInterval) — a
  // real no-op path for editors without a paragraph object model, so it's silent by design (this
  // is expected to happen routinely on cell, unlike getDocumentContent/replaceContent which
  // whole-document scope already keeps out of reach there).
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  selectContentRange(_idFirstParagraph: string, _idLastParagraph: string, _start: number, _end: number): Promise<void> {
    console.error('selectContentRange is not implemented in this editor');
    return Promise.resolve();
  }

  // Highlights a sub-range of the current document selection (`start`/`end` relative to that
  // selection's own text, matching the positions Antidote was given via
  // getSelectedTextWithStyle/zonesToCorrect). Same selectInterval use case as
  // selectContentRange above, just for SelectionCorrectionAgent instead of DocumentCorrectionAgent.
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  selectWithinSelection(_selectionStart: number, _selectionEnd: number, _start: number, _end: number, _separatorLength?: number): Promise<void> {
    console.error('selectWithinSelection is not implemented in this editor');
    return Promise.resolve();
  }

  selectSourceRange(_selectionStart: number, _selectionEnd: number): Promise<void> {
    console.error('selectSourceRange is not implemented in this editor');
    return Promise.resolve();
  }

  // Notifies `onChange` whenever the document's content changes (text edited, paragraphs
  // added/removed) — used to detect edits that happen concurrently with an active correction
  // session (another collaborator, or the user typing directly) so cached positions can be
  // resynced instead of silently drifting. No-op outside Word's editor-event API; every other
  // editor just has no concurrent-edit detection yet.
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  watchContentChanges(onChange: (eventName: string, event?: Event) => void): void {}

  // eslint-disable-next-line class-methods-use-this -- overridden by TextEditor; base is a no-op
  stopWatchingContentChanges(): void {}
}
