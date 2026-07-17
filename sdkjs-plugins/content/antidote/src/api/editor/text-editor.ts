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
  BaseEditor, SelectedTextWithStyle, CustomProperties, CORRECTION_MEMORY_PROPERTY,
  PluginWithEditorEvents, CONTENT_CHANGE_EVENTS,
} from './base';

export interface DocumentParagraph {
  index: number;
  text: string;
  // Present only when the paragraph's content could be walked run-by-run and the reconstructed
  // text matched `text` exactly (see walkStyledContent) — paragraphs with forms, fields,
  // footnotes, or math bail out to `undefined` rather than risk style ranges drifting out of
  // sync with the positions Antidote corrects against.
  styleInfo?: StyleInfo[];
}

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
  getDocumentContent(): Promise<DocumentParagraph[]> {
    return this.runQuery<DocumentParagraph[]>(function() {
      const { textStyle: TextStyle } = Asc.scope as { textStyle: typeof import('@druide-informatique/antidote-api-js').TextStyle };
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

      const paragraphs = Api.GetDocument().GetAllParagraphs();
      const result = paragraphs.map((paragraph, index) => {
        const text = paragraph.GetText({ Numbering: false });
        const styled = walkStyledContent(paragraph);
        return {
          index,
          text: text.replace(/\r\n$/, ''),
          styleInfo: (styled) ? styled.styleInfo : undefined,
        };
      });
      return result;
    }, { textStyle: {
        bold: TextStyle.bold,
        italic: TextStyle.italic,
        strike: TextStyle.strike,
        superscript: TextStyle.superscript,
        subscript: TextStyle.subscript,
      } }).then((result) => {
        console.log('getDocumentContent res:', result);
        return result;
      });
  }

  // Selection scope: walks the paragraphs touched by the selection via the object model to build
  // styleInfo, then verifies the reconstruction matches `getSelectedText()` (the host-level
  // method, always correct, used everywhere else) byte-for-byte before trusting it. `GetAllParagraphs`
  // on a range returns whole paragraphs rather than text clipped to the selection, so a selection
  // that starts/ends mid-paragraph — or spans a table — won't reconstruct identically; those cases
  // just fall back to plain text, same as the BaseEditor default this overrides.
  async getSelectedTextWithStyle(): Promise<SelectedTextWithStyle> {
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
          const paragraphText = paragraph.GetText({ Numbering: false });
          const styledParagraph = walkStyledContent(paragraph);
          console.warn('styledParagraph', styledParagraph);
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

      if (styled && styled.text === text) {
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

  // NOTE: tried reading back the paragraph's actual post-replace text here (to guard against
  // `ReplaceTextSmart` producing something other than `text`) but that made things worse in
  // practice — replace stopped working and the selection jumped to the start of the document,
  // so the `paragraph` reference obtained before `ReplaceTextSmart` is apparently not safe to call
  // `.GetText()` on afterward (likely invalidated/rebuilt by the replace). Reverted to trusting
  // `text` as-is; revisit only with a way to actually verify against a live host.
  replaceContent(text: string, index: number): Promise<void> {
    console.log('replaceContent', { text, index });
    return this.runCommand(() => {
      const { index: paraIndex, text: newText } = Asc.scope as { index: number; text: string };
      const paragraph = Api.GetDocument().GetAllParagraphs()[paraIndex];
      paragraph.Select();
      Api.ReplaceTextSmart([newText]);
    }, { index, text });
  }

  selectContentRange(index: number, start: number, end: number, textLength?: number, separatorLength?: number): Promise<void> {
    
    return this.runCommand(() => {
      let { 
        index: paraIndex,
        start: paraStart,
        end: paraEnd,
        textLength: tl,
        separatorLength: sl
      } = Asc.scope as { index: number; start: number; end: number; textLength: number; separatorLength: number };
      const doc = Api.GetDocument();
      const paragraphs = doc.GetAllParagraphs();
      const paragraph = paragraphs[paraIndex];
      // ↓↓↓ Doesn't work well in areas with formatting
      // paragraph.GetRange(paraStart, paraEnd).Select();
      // ↓↓↓ Workaround ↑↑↑
      console.log('selectContentRange', { paraIndex, paraStart, paraEnd, tl, sl });
      if (paraStart > tl) {
        let minusOffset = paraStart;
        let index = paraIndex;
        let numOfP = 0;
        let p = paragraphs[index];
        let pLen = p.GetText().replace(/\r\n$/, '').length;
        while (minusOffset >= pLen && p) {
          minusOffset -= (pLen + sl);
          index++;
          if (minusOffset >= 0) {
            numOfP++;
          }
          p = paragraphs[index];
          if (!p) break;
          pLen = p.GetText().replace(/\r\n$/, '').length;
        }
        if (minusOffset < 0) {
          paraStart -= (sl + minusOffset);
        }
        if (numOfP > 0) {
         for (let i = 0; i < numOfP; i++) {
          paraStart -= sl;
         }
        }
      }
      if (paraEnd > tl) {
        let minusOffset = paraEnd;
        let index = paraIndex;
        let numOfP = 0;
        let p = paragraphs[index];
        let pLen = p.GetText().replace(/\r\n$/, '').length;
        while (minusOffset >= pLen && p) {
          minusOffset -= (pLen + sl);
          index++;
          if (minusOffset >= 0) {
            numOfP++;
          }
          p = paragraphs[index];
          if (!p) break;
          pLen = p.GetText().replace(/\r\n$/, '').length;
        }
        if (minusOffset < 0) {
          paraEnd -= (sl + minusOffset);
        }
        if (numOfP > 0) {
          if (paraStart > 0) {
            paraEnd += 1; // to select gap 
          }
          for (let i = 0; i < numOfP; i++) {
            paraEnd -= sl;
          }
        }
      }

      paragraph.GetRange(0, 0).Select();
      doc.MoveCursorRight(paraStart, true);
      doc.RemoveSelection();
      
      if (paraEnd > paraStart) {
        doc.MoveCursorRight((paraEnd - paraStart), true);
      }
    }, { index, start, end, textLength, separatorLength });
  }

  // Antidote positions are relative to the initial selection, so each interval uses its saved document offset.
  selectWithinSelection(selectionStart: number, start: number, end: number): Promise<void> {
    console.log('selectWithinSelection', { selectionStart, start, end });
    return this.runCommand(() => {
      const { selectionStart: offset, start: s, end: e } = Asc.scope as { selectionStart: number; start: number; end: number };
      // ↓↓↓ Doesn't work well in areas with formatting
      // Api.GetDocument().GetRange(offset + s, offset + e).Select();
      // ↓↓↓ Workaround ↑↑↑
      const doc = Api.GetDocument();
      doc.GetRange(offset, offset).Select();
      doc.MoveCursorRight(s, true);
      doc.RemoveSelection();
      if (e > s) {
        doc.MoveCursorRight(e - s, true);
      }

    }, { selectionStart, start, end });
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

  saveCorrectionMemory(data: string): Promise<void> {
    return this.runCommand(() => {
      const { data: value, CORRECTION_MEMORY_PROPERTY: property } = Asc.scope as { data: string; CORRECTION_MEMORY_PROPERTY: string };
      const doc = Api.GetDocument() as unknown as { GetCustomProperties(): CustomProperties };
      doc.GetCustomProperties().Add(property, value);
    }, { data, CORRECTION_MEMORY_PROPERTY });
  }

  watchContentChanges(onChange: () => void): void {
    const plugin = window.Asc.plugin as unknown as PluginWithEditorEvents;
    CONTENT_CHANGE_EVENTS.forEach((eventName) => plugin.attachEditorEvent(eventName, () => onChange()));
  }

  stopWatchingContentChanges(): void {
    const plugin = window.Asc.plugin as unknown as PluginWithEditorEvents;
    CONTENT_CHANGE_EVENTS.forEach((eventName) => plugin.detachEditorEvent(eventName));
  }
}
