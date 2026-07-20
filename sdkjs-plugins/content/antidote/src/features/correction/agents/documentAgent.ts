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
  TextStyle,
} from '@druide-informatique/antidote-api-js';

import { BaseCorrectionAgent } from './base';

interface ParagraphOffset {
  id: string;
  start: number;
  text: string;
  styleInfo?: StyleInfo[];
}

const PARAGRAPH_SEPARATOR = '\r\n\r\n';

// How long to wait after a document-content-change event before resyncing — batches a burst of
// several rapid edits (e.g. fast typing) into one resync instead of one per keystroke.
const RESYNC_DEBOUNCE_MS = 200;

// Whole-document scope. Only valid for editorType "word" — cell/pdf don't expose a paragraph
// object model the same way (see useHasSelection / Main.tsx, which restrict this scope to "word").
export class DocumentCorrectionAgent extends BaseCorrectionAgent {
  private paragraphs: ParagraphOffset[] = [];

  private resyncTimer: ReturnType<typeof setTimeout> | null = null;

  // Watches for edits happening concurrently with this correction session — another collaborator,
  // or the user typing directly in the document while Corrector is open — so `this.paragraphs`
  // (index + offset bookkeeping `applyCorrection`/`selectInterval` rely on) gets resynced instead
  // of silently drifting out of sync with the real document. Ignores changes caused by our own
  // corrections (`isApplyingCorrections`) — those already update `this.paragraphs` incrementally
  // in `applyCorrection` and don't need a full resync.
  sessionStarted(): void {
    this.editor.watchContentChanges(this.scheduleResync);
  }

  sessionEnded(): void {
    this.editor.stopWatchingContentChanges();
    if (this.resyncTimer) clearTimeout(this.resyncTimer);
    super.sessionEnded();
  }

  private scheduleResync = (): void => {
    if (this.isApplyingCorrections) return;
    if (this.resyncTimer) clearTimeout(this.resyncTimer);
    this.resyncTimer = setTimeout(() => {
      this.resyncTimer = null;
      if (this.isApplyingCorrections) return;
      this.loadParagraphs().catch(() => {});
    }, RESYNC_DEBOUNCE_MS);
  };

  private async loadParagraphs(): Promise<void> {
    const paragraphs = await this.editor.getDocumentContent();

    let start = 0;
    this.paragraphs = paragraphs.map((paragraph) => {
      const offset: ParagraphOffset = {
        id: paragraph.id, start, text: paragraph.text, styleInfo: paragraph.styleInfo,
      };
      start += paragraph.text.length + PARAGRAPH_SEPARATOR.length;
      return offset;
    });
  }

  async loadText(): Promise<void> {
    await this.preloadCorrectionMemory();
    await this.loadParagraphs();
  }

  configuration(): WordProcessorConfiguration {
    return {
      documentTitle: this.title,
      activeMarkup: DocumentType.text,
      carriageReturn: '\r\n',
      correctionMemory: this.correctionMemory,
    };
  }

  zonesToCorrect(_params: ParamsGetZonesToCorrect): TextZoneConnectix[] {
    const styleInfo: StyleInfo[] = [];
    this.paragraphs.forEach((paragraph) => {
      (paragraph.styleInfo ?? []).forEach((range) => {
        styleInfo.push({
          positionStart: range.positionStart + paragraph.start,
          positionEnd: range.positionEnd + paragraph.start,
          style: range.style as TextStyle,
        });
      });
    });

    return [{
      text: this.paragraphs.map((paragraph) => paragraph.text).join(PARAGRAPH_SEPARATOR),
      zoneId: '',
      zoneIsFocused: true,
      styleInfo,
    }];
  }

  private findParagraphAt(position: number): ParagraphOffset {
    let found = this.paragraphs[0];
    for (const paragraph of this.paragraphs) {
      if (paragraph.start > position) break;
      found = paragraph;
    }
    return found;
  }

  // See BaseCorrectionAgent.allowEdit — confirms the text at [positionStart, positionEnd) still
  // matches what Antidote expects (`context`) before letting the replacement through. Locating a
  // paragraph outside the current bounds (e.g. one was just deleted concurrently and a resync
  // hasn't caught up yet) can't match a slice at all, so this fails closed on any lookup issue.
  allowEdit(params: ParamsAllowEdit): boolean {
    const paragraph = this.findParagraphAt(params.positionStart);
    if (!paragraph) return false;
    const localStart = params.positionStart - paragraph.start;
    const localEnd = params.positionEnd - paragraph.start;
    const actualText = paragraph.text.slice(localStart, localEnd);
    return actualText === params.context;
  }

  // Antidote calls this when the user selects text inside its own Corrector window — mirror that
  // selection back onto the ONLYOFFICE document so it stays visible which part is being worked on.
  selectInterval(params: ParamsSelect): void {
    const paragraph = this.findParagraphAt(params.positionStart);
    const separatorLength = PARAGRAPH_SEPARATOR.length;
    const localStart = params.positionStart - paragraph.start;
    const localEnd = params.positionEnd - paragraph.start;
    this.editor.selectContentRange(paragraph.id, localStart, localEnd, separatorLength).catch(() => {
      console.error('Failed to select content range');
    });
  }

  protected async applyCorrection(params: ParamsReplace): Promise<void> {
    const paragraph = this.findParagraphAt(params.positionStartReplace);
    const localStart = params.positionStartReplace - paragraph.start;
    const localEnd = params.positionReplaceEnd - paragraph.start;
    const newText = paragraph.text.slice(0, localStart) + params.newString + paragraph.text.slice(localEnd);

    await this.editor.replaceContent(newText, paragraph.id);

    const diff = newText.length - paragraph.text.length;
    paragraph.text = newText;
    for (const other of this.paragraphs) {
      if (other.start > paragraph.start) other.start += diff;
    }
  }
}
