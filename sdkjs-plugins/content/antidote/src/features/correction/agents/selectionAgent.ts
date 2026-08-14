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
  ParamsGetZonesToCorrect,
  ParamsReplace,
  ParamsSelect,
  ParamsAllowEdit,
  TextZoneConnectix,
  WordProcessorConfiguration,
  DocumentType,
  StyleInfo,
} from '@druide-informatique/antidote-api-js';

import { BaseCorrectionAgent } from './base';
import {
  Zone, buildZone, allowEditInZones, selectIntervalInZones, applyCorrectionInZones, zonesToTextZones,
} from './zones';

// How long to wait after a document-content-change event before resyncing — batches a burst of
// several rapid edits (e.g. fast typing) into one resync instead of one per keystroke.
const RESYNC_DEBOUNCE_MS = 200;

// Selection scope works across word/cell/pdf. On Word (editor.supportsZones()) it gets the same
// table-aware, per-zone treatment as DocumentCorrectionAgent — the selected range is split into
// zones (main-text segments + one per table cell) via zones.ts, so a correction inside a table
// cell within the selection never shares position math with the rest of it. Cell/pdf (and Word
// if zones aren't available for some reason) fall back to the original single flat string built
// from the generic cross-editor selection methods — styleInfo there is Word-only regardless.
export class SelectionCorrectionAgent extends BaseCorrectionAgent {
  private useZones = false;

  // Zone mode (word)
  private zones: Zone[] = [];

  // Flat mode (cell/pdf)
  private text = '';

  private styleInfo: StyleInfo[] = [];

  private selectionStart: number | null = null;

  private selectionEnd: number | null = null;

  private resyncTimer: ReturnType<typeof setTimeout> | null = null;

  // Same concurrent-edit resilience as DocumentCorrectionAgent — see its sessionStarted for the
  // full rationale. Here it also covers the selection itself being edited directly (not just
  // through Antidote), keeping the cached zones/text and selection bounds in sync.
  sessionStarted(): void {
    this.editor.watchContentChanges(this.scheduleResync);
  }

  sessionEnded(): void {
    this.editor.stopWatchingContentChanges();
    if (this.resyncTimer) clearTimeout(this.resyncTimer);
    super.sessionEnded();
  }

  private scheduleResync = (eventName: string, event?: unknown): void => {
    if (this.isApplyingCorrections) return;
    if (this.resyncTimer) clearTimeout(this.resyncTimer);
    this.resyncTimer = setTimeout(() => {
      this.resyncTimer = null;
      if (this.isApplyingCorrections) return;
      this.resync().catch(() => {});
    }, RESYNC_DEBOUNCE_MS);
  };

  // Re-reads content for the tracked bounds (selectionStart/selectionEnd) without touching the
  // document's live selection — unlike selecting the range first, this doesn't steal the cursor
  // away from whatever the user is currently typing elsewhere in the document. The actual
  // `.Select()` only happens where it's unavoidable: right before applyCorrection replaces
  // something, or when Antidote itself asks via selectInterval.
  private async resync(): Promise<void> {
    if (this.selectionStart === null || this.selectionEnd === null) return;

    if (this.useZones) {
      const content = await this.editor.getDocumentContent({ start: this.selectionStart, end: this.selectionEnd });
      this.zones = content.zones.map((zone) => buildZone(zone.zoneId, zone.paragraphs, this.PARAGRAPH_SEPARATOR));
      return;
    }

    const range = await this.editor.getRangeTextWithStyle(this.selectionStart, this.selectionEnd);
    this.text = range.text;
    this.styleInfo = range.styleInfo ?? [];
  }

  async loadText(): Promise<void> {
    await this.preloadCorrectionMemory();
    this.useZones = this.editor.supportsZones();
    this.selectionStart = await this.editor.getSelectionStart();
    this.selectionEnd = await this.editor.getSelectionEnd();

    if (this.useZones) {
      await this.resync();
      return;
    }

    const selected = await this.editor.getSelectedTextWithStyle();
    this.text = selected.text;
    this.styleInfo = selected.styleInfo ?? [];
  }

  configuration(): WordProcessorConfiguration {
    return {
      documentTitle: `${this.title} — selection`,
      activeMarkup: DocumentType.text,
      carriageReturn: '\r\n',
      correctionMemory: this.correctionMemory,
    };
  }

  zonesToCorrect(params: ParamsGetZonesToCorrect): TextZoneConnectix[] {
    if (this.useZones) {
      return zonesToTextZones(this.zones, this.PARAGRAPH_SEPARATOR, params);
    }

    const styleInfo: StyleInfo[] = this.styleInfo.map((range) => ({
      positionStart: range.positionStart,
      positionEnd: range.positionEnd,
      style: range.style,
    }));

    return [{
      text: this.text, zoneId: '', zoneIsFocused: true, styleInfo,
    }];
  }

  allowEdit(params: ParamsAllowEdit): boolean {
    if (this.useZones) return allowEditInZones(this.zones, params);
    return this.text.slice(params.positionStart, params.positionEnd) === params.context;
  }

  // Antidote calls this when the user selects text inside its own Corrector window — mirror that
  // selection back onto the ONLYOFFICE document. Silent no-op on editors without an object model
  // for it (see BaseEditor.selectWithinSelection) — expected on cell, not a bug.
  selectInterval(params: ParamsSelect): void {
    if (this.useZones) {
      selectIntervalInZones(this.zones, this.editor, params);
      return;
    }

    if (this.selectionStart === null || this.selectionEnd === null) return;
    const { positionStart, positionEnd } = params;
    const separatorLength = this.PARAGRAPH_SEPARATOR.length;
    const { selectionStart, selectionEnd } = this;
    this.editor
      .selectWithinSelection(selectionStart, selectionEnd, positionStart, positionEnd, separatorLength)
      .catch(() => {});
  }

  protected async applyCorrection(params: ParamsReplace): Promise<void> {
    if (this.useZones) {
      const diff = await applyCorrectionInZones(this.zones, this.editor, params);
      if (this.selectionEnd !== null) this.selectionEnd += diff;
      return;
    }

    if (this.selectionStart === null || this.selectionEnd === null) return;

    this.text = this.text.slice(0, params.positionStartReplace)
      + params.newString
      + this.text.slice(params.positionReplaceEnd);

    // Keep the tracked bounds accurate as the text's length changes, since resync() re-reads
    // exactly [selectionStart, selectionEnd] — a stale end would read/select the wrong range.
    this.selectionEnd += params.newString.length - (params.positionReplaceEnd - params.positionStartReplace);

    const paragraphs = this.text.replace(/(?:\r\n)+$/, '').split(/\r\n\r\n/);
    await this.editor.selectSourceRange(this.selectionStart, this.selectionEnd);
    await this.editor.replaceSelectedText(paragraphs);
  }
}
