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
} from '@druide-informatique/antidote-api-js';

import { BaseCorrectionAgent } from './base';
import {
  Zone, buildZone, allowEditInZones, selectIntervalInZones, applyCorrectionInZones, zonesToTextZones,
} from './zones';

// How long to wait after a document-content-change event before resyncing — batches a burst of
// several rapid edits (e.g. fast typing) into one resync instead of one per keystroke.
const RESYNC_DEBOUNCE_MS = 200;

// Whole-document scope. Only valid for editorType "word" — cell/pdf don't expose a paragraph
// object model the same way (see useHasSelection / Main.tsx, which restrict this scope to "word").
export class DocumentCorrectionAgent extends BaseCorrectionAgent {
  private zones: Zone[] = [];

  private resyncTimer: ReturnType<typeof setTimeout> | null = null;

  // Watches for edits happening concurrently with this correction session — another collaborator,
  // or the user typing directly in the document while Corrector is open — so `this.zones`
  // (offset bookkeeping applyCorrection/selectInterval rely on, via zones.ts) gets resynced instead
  // of silently drifting out of sync with the real document. Ignores changes caused by our own
  // corrections (`isApplyingCorrections`) — those already update the affected zone incrementally
  // and don't need a full resync.
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
      this.enqueue(() => this.loadZones()).catch(() => {});
    }, RESYNC_DEBOUNCE_MS);
  };

  private async loadZones(): Promise<void> {
    const content = await this.editor.getDocumentContent();
    this.zones = content.zones.map((zone) => buildZone(zone.zoneId, zone.paragraphs, this.PARAGRAPH_SEPARATOR));
  }

  async loadText(): Promise<void> {
    await this.preloadCorrectionMemory();
    await this.loadZones();
  }

  configuration(): WordProcessorConfiguration {
    return {
      documentTitle: this.title,
      activeMarkup: DocumentType.text,
      carriageReturn: '\r\n',
      correctionMemory: this.correctionMemory,
    };
  }

  zonesToCorrect(params: ParamsGetZonesToCorrect): TextZoneConnectix[] {
    return zonesToTextZones(this.zones, this.PARAGRAPH_SEPARATOR, params);
  }

  allowEdit(params: ParamsAllowEdit): boolean {
    return allowEditInZones(this.zones, params);
  }

  selectInterval(params: ParamsSelect): void {
    this.debounceSelectInterval(() => selectIntervalInZones(this.zones, this.editor, params));
  }

  protected async applyCorrection(params: ParamsReplace): Promise<void> {
    await applyCorrectionInZones(this.zones, this.editor, params);
  }
}
