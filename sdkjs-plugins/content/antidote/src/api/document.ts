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

export class DocumentError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'DocumentError';
  }
}

export interface DocumentParagraph {
  index: number;
  text: string;
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

export function replaceSelectedText(paragraphs: string[]): Promise<boolean> {
  ensurePlugin();
  return new Promise((resolve) => {
    window.Asc.plugin.executeMethod('ReplaceTextSmart', [paragraphs, undefined, String.fromCharCode(160)], (ok) => resolve(Boolean(ok)));
  });
}

// Whole-document scope: word/pdf only (cell has no paragraph object model — see useHasSelection /
// the correction feature, which restrict this path to editorType === 'word').
export function getDocumentParagraphs(): Promise<DocumentParagraph[]> {
  return runQuery<DocumentParagraph[]>(() => {
    const paragraphs = Api.GetDocument().GetAllParagraphs();
    return paragraphs.map((paragraph, index) => ({
      index,
      text: paragraph.GetText({ Numbering: false }),
    }));
  });
}

export function replaceParagraph(index: number, text: string): Promise<void> {
  return runCommand({ index, text }, () => {
    const { index: paraIndex, text: newText } = Asc.scope as { index: number; text: string };
    const paragraph = Api.GetDocument().GetAllParagraphs()[paraIndex];
    paragraph.Select();
    Api.ReplaceTextSmart([newText]);
  });
}
