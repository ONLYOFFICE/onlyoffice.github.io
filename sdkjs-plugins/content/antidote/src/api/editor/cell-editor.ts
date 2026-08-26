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

import type { Cell } from 'onlyoffice-plugins-api';

import {
  BaseEditor, CORRECTION_MEMORY_PROPERTY, DocumentContent,
} from './base';

// This file only ever calls Cell's Api - see the class comment below. Shadows the ambient global
// `Api` (typed as the intersection of every editor's entry point) with the precise type for this
// file only; no runtime effect. Same technique used in text-editor.ts.
declare const Api: Cell.Api;

// zoneId prefix for a cell's own zone (see getDocumentContent) — the id after it is the cell's
// own address (e.g. "A1"), which doubles as the DocumentParagraph id replaceContent/
// selectContentRange resolve back to a real cell via Api.GetActiveSheet().GetRange(address).
const CELL_ZONE_PREFIX = 'cell:';

export class CellEditor extends BaseEditor {
  constructor() {
    super('spreadsheet');
  }

  // Mirrors TextEditor's word implementation for Dictionaries/Guides: falls back to a word when
  // nothing's explicitly selected. A spreadsheet cell has no in-text caret position to read (only
  // Word exposes GetCurrentWord()), so "the current word" here is just the active cell's first word.
  getCurrentWord(): Promise<string> {
    return this.runQuery<string>(() => {
      const sheet = Api.GetActiveSheet();
      const cell = sheet.GetActiveCell();
      if (!cell) return '';
      const value = cell.GetText();
      const text = typeof value === 'string' ? value : '';
      const match = text.match(/[\p{L}\p{N}]+/u);
      return match ? match[0] : '';
    }).catch(() => '');
  }

  // Spreadsheets have a real per-cell object model (unlike a single linear document), so each
  // selected cell becomes its own independent zone — one cell selected means one zone, several
  // selected cells mean one zone each. See BaseEditor.supportsZones.
  supportsZones(): boolean {
    return true;
  }

  // Word's absolute-character-position model (getSelectionStart/End + a getDocumentContent range)
  // doesn't map onto a spreadsheet selection at all — there's no single linear text to offset
  // into. getDocumentContent below always reflects whatever's currently selected regardless of any
  // range passed to it, so these two only need to return distinct non-null values: just enough for
  // SelectionCorrectionAgent's "is there a tracked selection" null-checks to pass.
  getSelectionStart(): Promise<number | null> {
    return Promise.resolve(0);
  }

  getSelectionEnd(): Promise<number | null> {
    return Promise.resolve(1);
  }

  // Ignores `_range` (see getSelectionStart/End above) — always reflects the sheet's current
  // selection. One zone per selected cell, each with a single "paragraph" entry (a cell has no
  // paragraph structure of its own) whose id is the cell's address.
  getDocumentContent(_range?: { start: number; end: number }): Promise<DocumentContent> {
    return this.runQuery<DocumentContent>(() => {
      const { cellZonePrefix } = Asc.scope as { cellZonePrefix: string };
      const sheet = Api.GetActiveSheet();
      const selection = sheet.GetSelection();
      const rows = selection.GetRowsCount();
      const cols = selection.GetColumnsCount();
      const zones: { zoneId: string; paragraphs: { id: string; text: string }[] }[] = [];

      // GetAddress needs a "relative to" ApiRange argument we have no use for here, so the
      // address is built directly from the cell's own (0-based) row/col instead.
      function colToLetter(col: number): string {
        let n = col + 1;
        let letters = '';
        while (n > 0) {
          const rem = (n - 1) % 26;
          letters = String.fromCharCode(65 + rem) + letters;
          n = Math.floor((n - 1) / 26);
        }
        return letters;
      }

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const cell = selection.GetCells(row, col);
          if (!cell) continue;
          const address = colToLetter(cell.GetCol()) + (cell.GetRow() + 1);
          // A cell range obtained via selection.GetCells(row, col) reports its own row/col
          // correctly but its GetText()/GetValue() come back empty — re-fetching the same address
          // directly (the same lookup replaceContent/selectContentRange already rely on) instead.
          const realCell = Api.GetRange(address);
          const value = realCell ? realCell.GetText() : '';
          const text = typeof value === 'string' ? value : String(value ?? '');
          zones.push({ zoneId: cellZonePrefix + address, paragraphs: [{ id: address, text }] });
        }
      }

      return { zones };
    }, { cellZonePrefix: CELL_ZONE_PREFIX });
  }

  // Overwrites the whole cell's value — a cell has no sub-paragraph structure to preserve outside
  // the correction (unlike Word's replaceContent, which must be careful not to clobber untouched
  // text elsewhere in the paragraph).
  replaceContent(text: string, id: string): Promise<void> {
    return this.runCommand(() => {
      const { text: newText, id: address } = Asc.scope as { text: string; id: string };
      const cell = Api.GetRange(address);
      if (cell) cell.SetValue(newText);
    }, { text, id });
  }

  // Each zone is exactly one cell (see getDocumentContent), so idFirstParagraph/idLastParagraph
  // are always the same cell address here — start/end aren't used, selecting the whole cell is
  // the closest spreadsheet equivalent of highlighting the corrected sub-range.
  selectContentRange(_idFirstParagraph: string, _idLastParagraph: string, _start: number, _end: number): Promise<void> {
    return this.runCommand(() => {
      const { _idFirstParagraph: address } = Asc.scope as { _idFirstParagraph: string };
      const cell = Api.GetRange(address);
      if (cell) cell.Select();
    }, { _idFirstParagraph });
  }

  // Mirrors TextEditor's word implementation: stores the correction-memory blob as a custom
  // property on the workbook itself, so it travels with the file for any collaborator to pick up.
  loadCorrectionMemory(): Promise<string> {
    return this.runQuery<string>(() => {
      const { CORRECTION_MEMORY_PROPERTY: property } = Asc.scope as { CORRECTION_MEMORY_PROPERTY: string };
      const workbook = Api.GetActiveWorkbook();
      const value = workbook.GetCustomProperties().Get(property);
      return typeof value === 'string' ? value : '';
    }, { CORRECTION_MEMORY_PROPERTY }).then((value) => value ?? '').catch(() => '');
  }

  saveCorrectionMemory(data: string): Promise<void> {
    return this.runCommand(() => {
      const { data: value, CORRECTION_MEMORY_PROPERTY: property } = Asc.scope as { data: string; CORRECTION_MEMORY_PROPERTY: string };
      const workbook = Api.GetActiveWorkbook();
      workbook.GetCustomProperties().Add(property, value);
    }, { data, CORRECTION_MEMORY_PROPERTY });
  }
}
