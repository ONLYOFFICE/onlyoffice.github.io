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

import type {
  ApiParagraph, ApiRun, ApiHyperlink, ParagraphContent,
} from 'onlyoffice-plugins-api';

export class DocumentError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'DocumentError';
  }
}

export type CorrectionStyle = 'bold' | 'italic' | 'superscript' | 'subscript' | 'strike';

export interface CorrectionStyleRange {
  positionStart: number;
  positionEnd: number;
  style: CorrectionStyle;
}

export interface DocumentParagraph {
  index: number;
  text: string;
  // Present only when the paragraph's content could be walked run-by-run and the reconstructed
  // text matched `text` exactly (see walkStyledContent) — paragraphs with forms, fields,
  // footnotes, or math bail out to `undefined` rather than risk style ranges drifting out of
  // sync with the positions Antidote corrects against.
  styleInfo?: CorrectionStyleRange[];
}

function ensurePlugin(): void {
  if (!window.Asc?.plugin?.callCommand) throw new DocumentError('Plugin API unavailable', 'PLUGIN_UNAVAILABLE');
}

// callCommand runs `command` inside the document's sandboxed object-model context, where the
// global `Api`/`Asc.scope` are available. Used for whole-document paragraph access.
function runQuery<TResult>(command: () => TResult | { error: string }): Promise<TResult> {
  ensurePlugin();
  return new Promise((resolve, reject) => {
    window.Asc.plugin.callCommand(command, false, true, (result: unknown) => {
      if (result === undefined) {
        reject(new DocumentError('No response from plugin', 'NO_RESPONSE'));
        return;
      }
      if (typeof result === 'object' && result !== null && 'error' in result && (result as { error?: string }).error) {
        reject(new DocumentError((result as { error: string }).error, 'QUERY_ERROR'));
        return;
      }
      resolve(result as TResult);
    });
  });
}

function runCommand<T extends Record<string, unknown>>(scope: T, command: () => void): Promise<void> {
  ensurePlugin();
  return new Promise((resolve) => {
    window.Asc.scope = scope;
    window.Asc.plugin.callCommand(command, false, true, () => resolve());
  });
}

const SELECTED_TEXT_OPTIONS = {
  Numbering: false,
  Math: false,
  ParaSeparator: '\r\n\r\n',
  TableCellSeparator: '\t',
  TabSymbol: String.fromCharCode(160),
};

// executeMethod calls a built-in host method directly (works uniformly across word/cell/pdf,
// unlike Api.GetDocument() which is word/pdf-specific).
export function getSelectedText(): Promise<string> {
  ensurePlugin();
  return new Promise((resolve) => {
    window.Asc.plugin.executeMethod('GetSelectedText', [SELECTED_TEXT_OPTIONS], (text) => resolve(text ?? ''));
  });
}

export function hasSelection(): Promise<boolean> {
  return getSelectedText()
    .then((text) => text.trim().length > 0)
    .catch(() => false);
}

// Word only: `ApiDocument.GetCurrentWord()` isn't exposed for cell/pdf's object model (same
// restriction as getDocumentParagraphs). Mirrors Antidote's own Word add-in, which looks up
// whatever word the caret is in or next to rather than requiring an explicit selection first.
export function getCurrentWord(): Promise<string> {
  if (window.Asc?.plugin?.info?.editorType !== 'word') return Promise.resolve('');
  return runQuery<string>(() => Api.GetDocument().GetCurrentWord()).catch(() => '');
}

export function replaceSelectedText(paragraphs: string[]): Promise<boolean> {
  ensurePlugin();
  return new Promise((resolve) => {
    window.Asc.plugin.executeMethod('ReplaceTextSmart', [paragraphs, undefined, String.fromCharCode(160)], (ok) => resolve(Boolean(ok)));
  });
}

// Whole-document scope: word/pdf only (cell has no paragraph object model — see useHasSelection /
// the correction feature, which restrict this path to editorType === 'word').
//
// `walkStyledContent` (and its `isRun`/`isHyperlink` type guards) have to be declared *inside* the
// callCommand callback: callCommand runs its argument in the document's sandboxed object-model
// context by serializing the function, so it can only see `Api`/`Asc.scope` and whatever it
// declares itself — any outer closure (including a module-level helper) is invisible there, same
// reason runCommand below smuggles data through `Asc.scope` instead of a normal closure. Only the
// *types* (ApiParagraph/ApiRun/ApiHyperlink, imported above) can come from outside, since those are
// erased at compile time and never need to survive into the serialized runtime function.
export function getDocumentParagraphs(): Promise<DocumentParagraph[]> {
  return runQuery<DocumentParagraph[]>(() => {
    type StyledContainer = ApiParagraph | ApiHyperlink;

    function isRun(element: ParagraphContent): element is ApiRun {
      return element.GetClassType() === 'run';
    }
    function isHyperlink(element: ParagraphContent): element is ApiHyperlink {
      return element.GetClassType() === 'hyperlink';
    }

    // Walks a paragraph's (or hyperlink's) content run-by-run, collecting plain text and Antidote
    // `styleInfo` ranges over it. Bails out (returns null) the moment it meets anything besides a
    // run or a hyperlink of runs — forms, fields, footnotes, breaks, and math aren't walkable this
    // way, and the caller drops styleInfo for that paragraph rather than risk positions drifting
    // out of sync with the correction text.
    function walkStyledContent(container: StyledContainer): { text: string; styleInfo: CorrectionStyleRange[] } | null {
      let text = '';
      const styleInfo: CorrectionStyleRange[] = [];
      const count = container.GetElementsCount();

      for (let i = 0; i < count; i += 1) {
        const element = container.GetElement(i);
        if (!element) return null;

        if (isRun(element)) {
          const runText = element.GetText();
          const start = text.length;
          const end = start + runText.length;
          const textPr = element.GetTextPr();

          if (textPr.GetBold()) styleInfo.push({ positionStart: start, positionEnd: end, style: 'bold' });
          if (textPr.GetItalic()) styleInfo.push({ positionStart: start, positionEnd: end, style: 'italic' });
          if (textPr.GetStrikeout()) styleInfo.push({ positionStart: start, positionEnd: end, style: 'strike' });
          const vertAlign = textPr.GetVertAlign();
          if (vertAlign === 'superscript' || vertAlign === 'subscript') {
            styleInfo.push({ positionStart: start, positionEnd: end, style: vertAlign });
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
    return paragraphs.map((paragraph, index) => {
      const text = paragraph.GetText({ Numbering: false });
      const styled = walkStyledContent(paragraph);
      return {
        index,
        text,
        styleInfo: (styled && styled.text === text) ? styled.styleInfo : undefined,
      };
    });
  });
}

export interface SelectedTextWithStyle {
  text: string;
  styleInfo?: CorrectionStyleRange[];
}

// Selection scope, word only: walks the paragraphs touched by the selection via the object model
// to build styleInfo, then verifies the reconstruction matches `getSelectedText()` (the host-level
// method, always correct, used everywhere else) byte-for-byte before trusting it. `GetAllParagraphs`
// on a range returns whole paragraphs rather than text clipped to the selection, so a selection that
// starts/ends mid-paragraph — or spans a table — won't reconstruct identically; those cases just
// fall back to plain text, same as before this function existed.
export async function getSelectedTextWithStyle(): Promise<SelectedTextWithStyle> {
  const text = await getSelectedText();
  if (window.Asc?.plugin?.info?.editorType !== 'word' || !text) return { text };

  try {
    const styled = await runQuery<{ text: string; styleInfo: CorrectionStyleRange[] } | null>(() => {
      // See getDocumentParagraphs above for why this is declared here rather than shared.
      type StyledContainer = ApiParagraph | ApiHyperlink;

      function isRun(element: ParagraphContent): element is ApiRun {
        return element.GetClassType() === 'run';
      }
      function isHyperlink(element: ParagraphContent): element is ApiHyperlink {
        return element.GetClassType() === 'hyperlink';
      }

      function walkStyledContent(
        container: StyledContainer,
      ): { text: string; styleInfo: CorrectionStyleRange[] } | null {
        let elementText = '';
        const elementStyleInfo: CorrectionStyleRange[] = [];
        const count = container.GetElementsCount();

        for (let i = 0; i < count; i += 1) {
          const element = container.GetElement(i);
          if (!element) return null;

          if (isRun(element)) {
            const runText = element.GetText();
            const start = elementText.length;
            const end = start + runText.length;
            const textPr = element.GetTextPr();

            if (textPr.GetBold()) elementStyleInfo.push({ positionStart: start, positionEnd: end, style: 'bold' });
            if (textPr.GetItalic()) elementStyleInfo.push({ positionStart: start, positionEnd: end, style: 'italic' });
            if (textPr.GetStrikeout()) elementStyleInfo.push({ positionStart: start, positionEnd: end, style: 'strike' });
            const vertAlign = textPr.GetVertAlign();
            if (vertAlign === 'superscript' || vertAlign === 'subscript') {
              elementStyleInfo.push({ positionStart: start, positionEnd: end, style: vertAlign });
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
      const joinedStyleInfo: CorrectionStyleRange[] = [];

      for (let i = 0; i < paragraphs.length; i += 1) {
        if (i > 0) joinedText += '\r\n\r\n';

        const paragraph = paragraphs[i];
        const paragraphText = paragraph.GetText({ Numbering: false });
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
    });

    if (styled && styled.text === text) return { text, styleInfo: styled.styleInfo };
  } catch {
    // Object-model access failed (e.g. no selection to build a range from) — fall back below.
    console.error('Failed to get selected text with style info');
  }

  return { text };
}

export function replaceParagraph(index: number, text: string): Promise<void> {
  return runCommand({ index, text }, () => {
    const { index: paraIndex, text: newText } = Asc.scope as { index: number; text: string };
    const paragraph = Api.GetDocument().GetAllParagraphs()[paraIndex];
    paragraph.Select();
    Api.ReplaceTextSmart([newText]);
  });
}
