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

import { StyleInfo, TextStyle } from '@druide-informatique/antidote-api-js';
import type {
  ApiParagraph, ApiRun, ApiHyperlink, ParagraphContent,
} from 'onlyoffice-plugins-api';

import {
  BaseEditor, TextWithStyle, CustomProperties, CORRECTION_MEMORY_PROPERTY,
  PluginWithEditorEvents, CONTENT_CHANGE_EVENTS, DocumentContent,
} from './base';

// zoneId prefixes used by getDocumentContent — MAIN_ZONE_PREFIX is followed by that segment's
// index (document order), TABLE_ZONE_PREFIX by the cell's own GetInternalId().
export const MAIN_ZONE_PREFIX = 'main:';
export const TABLE_ZONE_PREFIX = 'table-cell:';

// Word only: everything here is built on `Api.GetDocument()`'s paragraph object model, which
// isn't exposed for cell/pdf (see BaseEditor for the generic selection-based capabilities every
// editor type shares instead).
export class TextEditor extends BaseEditor {
  constructor() {
    super('document');
  }

  // Mirrors Antidote's own Word add-in, which looks up whatever word the caret is in or next to
  // rather than requiring an explicit selection first.
  getCurrentWord(): Promise<string> {
    return this.runQuery<string>(() => Api.GetDocument().GetCurrentWord()).catch(() => '');
  }

  // Whole-document scope. Helpers stay inside callCommand due to its sandbox boundary; see BaseEditor.runQuery.
  // Zones come back in document order: the main text is split into its own zone around each
  // table, and each table cell gets its own zone too, so Antidote's Corrector window lists a table
  // where it actually occurs instead of always lumping every table at the very end — see
  // DocumentCorrectionAgent, the only consumer of the zones this returns.
  getDocumentContent(): Promise<DocumentContent> {
    console.log('get doc content');
    return this.runQuery<DocumentContent>(function() {
      const { mainZonePrefix, tableZonePrefix, textStyle: TextStyle } = Asc.scope as {
        mainZonePrefix: string;
        tableZonePrefix: string;
        textStyle: typeof import('@druide-informatique/antidote-api-js').TextStyle;
      };
      type StyledContainer = ApiParagraph | ApiHyperlink;
      function isRun(element: ParagraphContent): element is ApiRun {
        return element.GetClassType() === 'run';
      }
      function isHyperlink(element: ParagraphContent): element is ApiHyperlink {
        return element.GetClassType() === 'hyperlink';
      }

      // Walks a paragraph's (or hyperlink's) content run-by-run, collecting plain text and
      // Antidote `styleInfo` ranges over it. Bails out (returns null) the moment it meets anything
      // besides a run or a hyperlink of runs — forms, fields, footnotes, breaks, and math aren't
      // walkable this way, and the caller drops styleInfo for that paragraph rather than risk
      // positions drifting out of sync with the correction text.
      function walkStyledContent(
        container: StyledContainer,
      ): { text: string; styleInfo: StyleInfo[] } | null {
        let text = '';
        const styleInfo: StyleInfo[] = [];
        const count = container.GetElementsCount();

        for (let i = 0; i < count; i += 1) {
          const element = container.GetElement(i);
          if (!element) return null;

          if (isRun(element)) {
            const runText = element.GetText();
            const start = text.length;
            const end = start + runText.length;
            const textPr = element.GetTextPr();

            if (textPr.GetBold()) styleInfo.push({ positionStart: start, positionEnd: end, style: TextStyle.bold });
            if (textPr.GetItalic()) styleInfo.push({ positionStart: start, positionEnd: end, style: TextStyle.italic });
            if (textPr.GetStrikeout()) styleInfo.push({ positionStart: start, positionEnd: end, style: TextStyle.strike });
            const vertAlign = textPr.GetVertAlign();
            if (vertAlign === 'superscript' || vertAlign === 'subscript') {
              styleInfo.push({ positionStart: start, positionEnd: end, style: vertAlign === 'superscript' ? TextStyle.superscript : TextStyle.subscript });
            }

            text += runText;
          } else if (isHyperlink(element)) {
            const nested = walkStyledContent(element);
            if (!nested) return null;

            const offset = text.length;
            for (let j = 0; j < nested.styleInfo.length; j += 1) {
              const range = nested.styleInfo[j];
              styleInfo.push({
                positionStart: range.positionStart + offset,
                positionEnd: range.positionEnd + offset,
                style: range.style,
              });
            }

            text += nested.text;
          } else {
            return null;
          }
        }

        return { text, styleInfo };
      }

      type Entry = { id: string; text: string; styleInfo: StyleInfo[] | undefined };
      const paragraphs = Api.GetDocument().GetAllParagraphs();
      const zones: { zoneId: string; paragraphs: Entry[] }[] = [];

      let mainIndex = 0;
      let currentMain: Entry[] = [];
      let currentCellId: string | null = null;
      let currentCell: Entry[] = [];

      function flushMain() {
        if (currentMain.length) {
          zones.push({ zoneId: mainZonePrefix + mainIndex, paragraphs: currentMain });
          mainIndex += 1;
        }
        currentMain = [];
      }

      function flushCell() {
        if (currentCellId && currentCell.length) {
          zones.push({ zoneId: tableZonePrefix + currentCellId, paragraphs: currentCell });
        }
        currentCellId = null;
        currentCell = [];
      }

      for (let i = 0; i < paragraphs.length; i += 1) {
        const paragraph = paragraphs[i];
        const text = paragraph.GetText({ Numbering: false }).replace(/[\t\r\n\v\f]+$/, '');
        const styled = walkStyledContent(paragraph);
        const entry = {
          id: paragraph.GetInternalId(),
          text: text,
          styleInfo: (styled) ? styled.styleInfo : undefined,
        };

        const cell = paragraph.GetParentTableCell();
        if (cell) {
          const cellId = cell.GetInternalId();
          if (currentCellId !== cellId) {
            // Entering a different cell (or the first cell of a table) — whatever main-text run
            // came before it is now done, and so is the previous cell's own zone if any.
            flushCell();
            flushMain();
            currentCellId = cellId;
          }
          currentCell.push(entry);
        } else {
          // Back in the main body — close off whatever cell zone was in progress.
          flushCell();
          currentMain.push(entry);
        }
      }
      flushCell();
      flushMain();

      return { zones };
    }, {
      mainZonePrefix: MAIN_ZONE_PREFIX,
      tableZonePrefix: TABLE_ZONE_PREFIX,
      textStyle: {
        bold: TextStyle.bold,
        italic: TextStyle.italic,
        strike: TextStyle.strike,
        superscript: TextStyle.superscript,
        subscript: TextStyle.subscript,
      },
    }).then((result) => {
        console.log('getDocumentContent res:', result);
        return result;
      });
  }

  // Same reconstruction as getSelectedTextWithStyle, but for an explicit absolute [start, end)
  // range instead of the live selection — doesn't call `.Select()`, so it doesn't touch whatever
  // the user is currently doing in the document (used by SelectionCorrectionAgent's background
  // resync, which must not steal the cursor/selection away from someone actively typing).
  getRangeTextWithStyle(start: number, end: number): Promise<TextWithStyle> {
    console.log('getRangeTextWithStyle', { start, end });
    return this.runQuery<{ text: string; styleInfo: StyleInfo[] } | null>(() => {
      const {
        start: rangeStart, end: rangeEnd, textStyle: TextStyle,
      } = Asc.scope as { start: number; end: number; textStyle: typeof import('@druide-informatique/antidote-api-js').TextStyle };
      // See getDocumentContent above for why this is declared here rather than shared.
      type StyledContainer = ApiParagraph | ApiHyperlink;

      function isRun(element: ParagraphContent): element is ApiRun {
        return element.GetClassType() === 'run';
      }
      function isHyperlink(element: ParagraphContent): element is ApiHyperlink {
        return element.GetClassType() === 'hyperlink';
      }

      function walkStyledContent(
        container: StyledContainer,
      ): { text: string; styleInfo: StyleInfo[] } | null {
        let elementText = '';
        const elementStyleInfo: StyleInfo[] = [];
        const count = container.GetElementsCount();

        for (let i = 0; i < count; i += 1) {
          const element = container.GetElement(i);
          if (!element) return null;

          if (isRun(element)) {
            const runText = element.GetText();
            const start2 = elementText.length;
            const end2 = start2 + runText.length;
            const textPr = element.GetTextPr();

            if (textPr.GetBold()) elementStyleInfo.push({ positionStart: start2, positionEnd: end2, style: TextStyle.bold });
            if (textPr.GetItalic()) elementStyleInfo.push({ positionStart: start2, positionEnd: end2, style: TextStyle.italic });
            if (textPr.GetStrikeout()) elementStyleInfo.push({ positionStart: start2, positionEnd: end2, style: TextStyle.strike });
            const vertAlign = textPr.GetVertAlign();
            if (vertAlign === 'superscript' || vertAlign === 'subscript') {
              elementStyleInfo.push({ positionStart: start2, positionEnd: end2, style: vertAlign === 'superscript' ? TextStyle.superscript : TextStyle.subscript });
            }

            elementText += runText;
          } else if (isHyperlink(element)) {
            const nested = walkStyledContent(element);
            if (!nested) return null;

            const offset = elementText.length;
            for (let j = 0; j < nested.styleInfo.length; j += 1) {
              const range = nested.styleInfo[j];
              elementStyleInfo.push({
                positionStart: range.positionStart + offset,
                positionEnd: range.positionEnd + offset,
                style: range.style,
              });
            }

            elementText += nested.text;
          } else {
            return null;
          }
        }

        return { text: elementText, styleInfo: elementStyleInfo };
      }

      const range = Api.GetDocument().GetRange(rangeStart, rangeEnd);
      if (!range) return null;

      const paragraphs = range.GetAllParagraphs();
      let joinedText = '';
      const joinedStyleInfo: StyleInfo[] = [];

      for (let i = 0; i < paragraphs.length; i += 1) {
        if (i > 0) joinedText += '\r\n\r\n';

        const paragraph = paragraphs[i];
        const paragraphText = paragraph.GetText({ Numbering: false }).replace(/[\t\r\n\v\f]+$/, '');
        const styledParagraph = walkStyledContent(paragraph);
        const start2 = joinedText.length;
        if (styledParagraph && styledParagraph.text === paragraphText) {
          for (let j = 0; j < styledParagraph.styleInfo.length; j += 1) {
            const range2 = styledParagraph.styleInfo[j];
            joinedStyleInfo.push({
              positionStart: range2.positionStart + start2,
              positionEnd: range2.positionEnd + start2,
              style: range2.style,
            });
          }
        }

        joinedText += paragraphText;
      }

      return { text: joinedText, styleInfo: joinedStyleInfo };
    }, {
      start, end, textStyle: {
        bold: TextStyle.bold,
        italic: TextStyle.italic,
        strike: TextStyle.strike,
        superscript: TextStyle.superscript,
        subscript: TextStyle.subscript,
      },
    }).then((styled) => (styled ?? { text: '' })).catch(() => ({ text: '' }));
  }

  // Selection scope: walks the paragraphs touched by the selection via the object model to build
  // styleInfo, then verifies the reconstruction matches `getSelectedText()` (the host-level
  // method, always correct, used everywhere else) byte-for-byte before trusting it. `GetAllParagraphs`
  // on a range returns whole paragraphs rather than text clipped to the selection, so a selection
  // that starts/ends mid-paragraph — or spans a table — won't reconstruct identically; those cases
  // just fall back to plain text, same as the BaseEditor default this overrides.
  async getSelectedTextWithStyle(): Promise<TextWithStyle> {
    console.log('get selected text with style');
    const text = await this.getSelectedText();
    if (!text) return { text };

    try {
      const styled = await this.runQuery<{ text: string; styleInfo: StyleInfo[] } | null>(() => {
        const { textStyle: TextStyle } = Asc.scope as { textStyle: typeof import('@druide-informatique/antidote-api-js').TextStyle };
        // See getDocumentContent above for why this is declared here rather than shared.
        type StyledContainer = ApiParagraph | ApiHyperlink;

        function isRun(element: ParagraphContent): element is ApiRun {
          return element.GetClassType() === 'run';
        }
        function isHyperlink(element: ParagraphContent): element is ApiHyperlink {
          return element.GetClassType() === 'hyperlink';
        }

        function walkStyledContent(
          container: StyledContainer,
        ): { text: string; styleInfo: StyleInfo[] } | null {
          let elementText = '';
          const elementStyleInfo: StyleInfo[] = [];
          const count = container.GetElementsCount();

          for (let i = 0; i < count; i += 1) {
            const element = container.GetElement(i);
            if (!element) return null;

            if (isRun(element)) {
              const runText = element.GetText();
              const start = elementText.length;
              const end = start + runText.length;
              const textPr = element.GetTextPr();

              if (textPr.GetBold()) elementStyleInfo.push({ positionStart: start, positionEnd: end, style: TextStyle.bold });
              if (textPr.GetItalic()) elementStyleInfo.push({ positionStart: start, positionEnd: end, style: TextStyle.italic });
              if (textPr.GetStrikeout()) elementStyleInfo.push({ positionStart: start, positionEnd: end, style: TextStyle.strike });
              const vertAlign = textPr.GetVertAlign();
              if (vertAlign === 'superscript' || vertAlign === 'subscript') {
                elementStyleInfo.push({ positionStart: start, positionEnd: end, style: vertAlign === 'superscript' ? TextStyle.superscript : TextStyle.subscript });
              }

              elementText += runText;
            } else if (isHyperlink(element)) {
              const nested = walkStyledContent(element);
              if (!nested) return null;

              const offset = elementText.length;
              for (let j = 0; j < nested.styleInfo.length; j += 1) {
                const range = nested.styleInfo[j];
                elementStyleInfo.push({
                  positionStart: range.positionStart + offset,
                  positionEnd: range.positionEnd + offset,
                  style: range.style,
                });
              }

              elementText += nested.text;
            } else {
              return null;
            }
          }

          return { text: elementText, styleInfo: elementStyleInfo };
        }

        const range = Api.GetDocument().GetRangeBySelect();
        if (!range) return null;

        const paragraphs = range.GetAllParagraphs();
        let joinedText = '';
        const joinedStyleInfo: StyleInfo[] = [];

        for (let i = 0; i < paragraphs.length; i += 1) {
          if (i > 0) joinedText += '\r\n\r\n';

          const paragraph = paragraphs[i];
          const paragraphText = paragraph.GetText({ Numbering: false }).replace(/[\t\r\n\v\f]+$/, '');
          const styledParagraph = walkStyledContent(paragraph);
          const start = joinedText.length;

          if (styledParagraph && styledParagraph.text === paragraphText) {
            for (let j = 0; j < styledParagraph.styleInfo.length; j += 1) {
              const range2 = styledParagraph.styleInfo[j];
              joinedStyleInfo.push({
                positionStart: range2.positionStart + start,
                positionEnd: range2.positionEnd + start,
                style: range2.style,
              });
            }
          }

          joinedText += paragraphText;
        }

        return { text: joinedText, styleInfo: joinedStyleInfo };
      }, { textStyle: {
        bold: TextStyle.bold,
        italic: TextStyle.italic,
        strike: TextStyle.strike,
        superscript: TextStyle.superscript,
        subscript: TextStyle.subscript,
      } });

      if (styled && styled.text) {
        console.log('getSelectedTextWithStyle matched', { styled, text });
        return { text, styleInfo: styled.styleInfo };
      }
    } catch {
      // Object-model access failed (e.g. no selection to build a range from) — fall back below.
      console.error('Failed to get selected text with style info');
    }
    console.log('getSelectedTextWithStyle fallback', { text });
    return { text };
  }

  getSelectionEnd(): Promise<number | null> {
    console.log('getSelectionEnd');
    return this.runQuery<number | null>(() => {
      const range = Api.GetDocument().GetRangeBySelect();
      return range ? range.GetEndPos() : null;
    }).catch(() => null);
  }

  getSelectionStart(): Promise<number | null> {
    console.log('getSelectionStart');
    return this.runQuery<number | null>(() => {
      const range = Api.GetDocument().GetRangeBySelect();
      return range ? range.GetStartPos() : null;
    }).catch(() => null);
  }

  // Stores correction memory as a custom document property so it travels with the file.
  loadCorrectionMemory(): Promise<string> {
    return this.runQuery<string>(() => {
      const { CORRECTION_MEMORY_PROPERTY: property } = Asc.scope as { CORRECTION_MEMORY_PROPERTY: string };
      const doc = Api.GetDocument();
      const props = doc.GetCustomProperties();
      if (!props) return '';
      const value = props.Get(property);
      return value && typeof value === 'string' ? value : '';
    }, { CORRECTION_MEMORY_PROPERTY }).then((value) => {
      return value;
    }).catch(() => {
      return '';
    });
  }

  // NOTE: tried reading back the paragraph's actual post-replace text here (to guard against
  // `ReplaceTextSmart` producing something other than `text`) but that made things worse in
  // practice — replace stopped working and the selection jumped to the start of the document,
  // so the `paragraph` reference obtained before `ReplaceTextSmart` is apparently not safe to call
  // `.GetText()` on afterward (likely invalidated/rebuilt by the replace). Reverted to trusting
  // `text` as-is; revisit only with a way to actually verify against a live host.
  replaceContent(text: string, id: string): Promise<void> {
    console.log('replaceContent', { text, id });
    return this.runCommand(() => {
      const { id: paraId, text: newText } = Asc.scope as { id: string; text: string };
      const paragraph = Api.GetDocument().GetAllParagraphs().find((p) => p.GetInternalId() === paraId);
      if (!paragraph) return;
      paragraph.Select();
      Api.ReplaceTextSmart([newText]);
    }, { id, text });
  }

  saveCorrectionMemory(data: string): Promise<void> {
    return this.runCommand(() => {
      const { data: value, CORRECTION_MEMORY_PROPERTY: property } = Asc.scope as { data: string; CORRECTION_MEMORY_PROPERTY: string };
      const doc = Api.GetDocument() as unknown as { GetCustomProperties(): CustomProperties };
      doc.GetCustomProperties().Add(property, value);
    }, { data, CORRECTION_MEMORY_PROPERTY });
  }

  selectContentRange(_idFirstParagraph: string, _idLastParagraph: string, _start: number, _end: number): Promise<void> {
    console.log('selectContentRange', { _idFirstParagraph, _idLastParagraph, _start, _end });
    return this.runCommand(() => {
      let {
        _idFirstParagraph: paraIdFirst,
        _idLastParagraph: paraIdLast,
        _start: start,
        _end: end,
      } = Asc.scope as { _idFirstParagraph: string; _idLastParagraph: string; _start: number; _end: number };
      const doc = Api.GetDocument();
      const paragraphs = doc.GetAllParagraphs();
      const indexFirstParagraph = paragraphs.findIndex((p) => p.GetInternalId() === paraIdFirst);
      const indexLastParagraph = paragraphs.findIndex((p) => p.GetInternalId() === paraIdLast);
      if (indexFirstParagraph === -1 || indexLastParagraph === -1) return;
      const firstParagraph = paragraphs[indexFirstParagraph];
      const lastParagraph = paragraphs[indexLastParagraph];
      if (!firstParagraph || !lastParagraph) return;
      const fpLen = firstParagraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length;
      const lpLen = lastParagraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length;

      if (start > fpLen) {
        start = fpLen;
      }
      if (end > lpLen) {
        end = lpLen;
      }

      firstParagraph.GetRange(0, 0).Select();
      doc.MoveCursorRight(start, true);
      start = doc.GetRangeBySelect().GetEndPos();
      
      lastParagraph.GetRange(0, 0).Select();
      doc.MoveCursorRight(end, true);
      end = doc.GetRangeBySelect().GetEndPos();
      doc.RemoveSelection();
      Api.GetDocument().GetRange(start, end).Select();

    }, { _idFirstParagraph, _idLastParagraph, _start, _end });
  }

  selectSourceRange(_selectionStart: number, _selectionEnd: number): Promise<void> {
   return this.runCommand(() => {
      let { 
        _selectionStart: selectionStart,
        _selectionEnd: selectionEnd,
      } = Asc.scope as { _selectionStart: number; _selectionEnd: number };

      const doc = Api.GetDocument();
      doc.GetRange(selectionStart, selectionEnd).Select();
    }, { _selectionStart, _selectionEnd});
  }

  // Antidote positions are relative to the initial selection, so each interval uses its saved document offset.
  selectWithinSelection(_selectionStart: number, _selectionEnd: number, _start: number, _end: number, _separatorLength = 4): Promise<void> {
    console.log('selectWithinSelection', { _selectionStart, _selectionEnd, _start, _end, _separatorLength });
    return this.runCommand(() => {
      let { 
        _selectionStart: selectionStart,
        _selectionEnd: selectionEnd,
        _start: start,
        _end: end,
        _separatorLength: sl,
      } = Asc.scope as { _selectionStart: number; _selectionEnd: number; _start: number; _end: number; _separatorLength: number };
      // ↓↓↓ Doesn't work well in areas with formatting
      // Api.GetDocument().GetRange(selectionStart + s, selectionStart + e).Select();
      // ↓↓↓ Workaround ↑↑↑
      const doc = Api.GetDocument();
      const sourceRange = doc.GetRange(selectionStart, selectionEnd);
      const paragraphs = sourceRange.GetAllParagraphs();
      if (!paragraphs || paragraphs.length === 0) return;
      let firstParagraph = paragraphs[0];
      let firstParagraphStart = firstParagraph.GetRange(0, 0).GetStartPos();
      let fpLen = firstParagraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length;

      let firstAppendixRange = doc.GetRange(firstParagraphStart, selectionStart);
      selectionStart = firstParagraphStart;
      const firstParagraphAppendixLength = firstAppendixRange.GetText().replace(/[\t\r\n\v\f]+$/, '').length;
      console.warn('firstParagraphStart', firstParagraphStart, 'selectionStart', selectionStart);
      console.log('firstParagraphAppendixLength', firstParagraphAppendixLength, 'selectionEnd', selectionEnd);

      start += firstParagraphAppendixLength;
      end += firstParagraphAppendixLength;
      while (start >= fpLen + sl && paragraphs.length > 1) {
        start -= (fpLen + sl);
        end -= (fpLen + sl);
        paragraphs.shift();
        firstParagraph = paragraphs[0];
        fpLen = firstParagraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length;
      }

      console.log('s = ' + start + ' e = ' + end);
      function findParagraphAt(pos: number, paragraphs: ApiParagraph[], sl: number): ApiParagraph {
        let startPos = 0;
        for (let i = 0; i < paragraphs.length; i++) {
          const paragraph = paragraphs[i];
          const pLen = paragraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length + sl;
          startPos += pLen;
          if (startPos > pos) {
            return paragraph;
          }
        }
        return paragraphs[0];
      }


      let lastParagraph = findParagraphAt(end, paragraphs, sl);
      let lpLen = lastParagraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length;
      const index = paragraphs.indexOf(lastParagraph);
      for (let i = 0; i < index; i++) {
        const paragraph = paragraphs[i];
        end -= paragraph.GetText().replace(/[\t\r\n\v\f]+$/, '').length + sl;
      }

      if (start > fpLen) {
        start = fpLen;
      }
      if (end > lpLen) {
        end = lpLen;
      }
      console.warn('fpLen', fpLen, 'lpLen', lpLen);
      console.error(start, end);
      firstParagraph.GetRange(0, 0).Select();
      doc.MoveCursorRight(start, true);
      start = doc.GetRangeBySelect().GetEndPos();
      lastParagraph.GetRange(0, 0).Select();
      doc.MoveCursorRight(end, true);
      end = doc.GetRangeBySelect().GetEndPos();
      doc.RemoveSelection();
      console.warn('select Range', { start, end, s: Asc.scope._start, e: Asc.scope._end });
      Api.GetDocument().GetRange(start, end).Select();


    }, { _selectionStart, _selectionEnd, _start, _end, _separatorLength });
  }

  stopWatchingContentChanges(): void {
    const plugin = window.Asc.plugin as unknown as PluginWithEditorEvents;
    CONTENT_CHANGE_EVENTS.forEach((eventName) => plugin.detachEditorEvent(eventName));
  }
  watchContentChanges(onChange: (eventName: string, event?: Event) => void): void {
    const plugin = window.Asc.plugin as unknown as PluginWithEditorEvents;
    CONTENT_CHANGE_EVENTS.forEach((eventName) => plugin.attachEditorEvent(eventName, (e?: Event) => onChange(eventName, e)));
  }

}
