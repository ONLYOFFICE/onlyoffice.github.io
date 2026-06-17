/**
 *
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

export type CellValue = string | number | boolean | null;
export type DataMatrix = CellValue[][];
export type InsertTarget = 'cursor' | 'active' | 'new';

export interface InsertOptions {
  target?: InsertTarget;
  sheetNamePrefix?: string;
}

export interface SheetData {
  headers: string[];
  rows: CellValue[][];
  rowCount: number;
  colCount: number;
}

export interface SelectionInfo {
  row: number;
  col: number;
  rowCount: number;
  colCount: number;
}

export class SpreadsheetError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'SpreadsheetError';
  }
}

function ensurePlugin(): void {
  if (!window.Asc?.plugin?.callCommand) throw new SpreadsheetError('Plugin API unavailable', 'PLUGIN_UNAVAILABLE');
}

function runCommand<T extends Record<string, unknown>>(
  scope: T,
  command: () => void,
): Promise<void> {
  ensurePlugin();
  return new Promise((resolve) => {
    window.Asc.scope = scope;
    window.Asc.plugin.callCommand(command, false, true, () => resolve());
  });
}

function runQuery<TResult>(
  command: () => TResult | { error: string },
): Promise<TResult> {
  ensurePlugin();
  return new Promise((resolve, reject) => {
    window.Asc.plugin.callCommand(
      command,
      false,
      true,
      (result: TResult | { error?: string } | undefined) => {
        if (!result) {
          reject(new SpreadsheetError('No response from plugin', 'NO_RESPONSE'));
        } else if (typeof result === 'object' && 'error' in result && result.error) {
          reject(new SpreadsheetError(result.error, 'QUERY_ERROR'));
        } else {
          resolve(result as TResult);
        }
      },
    );
  });
}

function normalizeValue(value: unknown): CellValue {
  if (value == null) return null;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

export function insertData(data: DataMatrix, options: InsertOptions = {}): Promise<void> {
  if (!data.length) return Promise.reject(new SpreadsheetError('Data cannot be empty', 'EMPTY_DATA'));

  return runCommand(
    { data, target: options.target ?? 'cursor', prefix: options.sheetNamePrefix ?? 'Sheet' },
    () => {
      const { data: rows, target, prefix } = Asc.scope as {
        data: CellValue[][];
        target: string;
        prefix: string;
      };

      if (!rows?.length) return;

      const colLetter = (col: number): string => {
        let s = '';
        let n = col;
        while (n >= 0) {
          s = String.fromCharCode((n % 26) + 65) + s;
          n = Math.floor(n / 26) - 1;
        }
        return s;
      };

      let startRow = 1;
      let startCol = 0;
      let sheet;

      if (target === 'new') {
        const name = `${prefix} ${Api.GetSheets().length + 1}`;
        Api.AddSheet(name);
        sheet = Api.GetSheet(name) ?? Api.GetActiveSheet();
        sheet?.SetActive();
      } else {
        sheet = Api.GetActiveSheet();
        const sel = Api.GetSelection();
        if (sel) {
          startRow = sel.GetRow();
          startCol = sel.GetCol() - 1;
        }
      }

      if (!sheet) return;

      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        if (!row) continue;
        for (let c = 0; c < row.length; c++) {
          sheet.GetRange(colLetter(startCol + c) + (startRow + r)).SetValue(row[c] ?? '');
        }
      }
    },
  );
}

export function insertWithHeaders(
  headers: string[],
  rows: DataMatrix,
  options?: InsertOptions,
): Promise<void> {
  if (!headers?.length) return Promise.reject(new SpreadsheetError('Headers required', 'INVALID_HEADERS'));
  return insertData([headers, ...rows], options);
}

export function insertRecords(
  headers: string[],
  records: Record<string, unknown>[],
  fields: string[],
  options?: InsertOptions,
): Promise<void> {
  if (headers.length !== fields.length) return Promise.reject(new SpreadsheetError('Headers/fields length mismatch', 'LENGTH_MISMATCH'));

  const rows = records.map((rec) => fields.map((f) => normalizeValue(rec[f])));
  return insertWithHeaders(headers, rows, options);
}

export function readSheetData(): Promise<SheetData> {
  return runQuery<{ data: CellValue[][]; rowCount: number; colCount: number }>(
    () => {
      const sheet = Api.GetActiveSheet();
      if (!sheet) return { error: 'No active sheet' };

      const letterToCol = (colStr: string): number => {
        let col = 0;
        for (let i = 0; i < colStr.length; i++) col = col * 26 + (colStr.charCodeAt(i) - 64);
        return col;
      };

      const parseCell = (cell: string): { col: number; row: number } => {
        const match = cell.match(/^([A-Z]+)(\d+)$/);
        if (!match) return { col: 1, row: 1 };
        return { col: letterToCol(match[1]), row: parseInt(match[2]) };
      };

      const colLetter = (col: number): string => {
        let s = '';
        let n = col - 1;
        while (n >= 0) {
          s = String.fromCharCode((n % 26) + 65) + s;
          n = Math.floor(n / 26) - 1;
        }
        return s;
      };

      const selection = Api.GetSelection();
      if (!selection) return { error: 'No selection' };

      const selAny = selection as unknown as { GetAddress: (a: boolean, b: boolean, c: string, d: boolean) => string };
      const address = selAny.GetAddress(false, false, '', false);
      if (!address) return { error: 'Cannot get selection address' };

      const parts = address.split(':');
      const start = parseCell(parts[0]);
      const end = parts.length > 1 ? parseCell(parts[1]) : start;

      const { row: startRow, col: startCol } = start;
      const { row: lastRow, col: lastCol } = end;
      const rowCount = lastRow - startRow + 1;
      const colCount = lastCol - startCol + 1;

      if (rowCount <= 0 || colCount <= 0) return { error: 'No cells selected' };

      const data: CellValue[][] = [];
      for (let r = startRow; r <= lastRow; r++) {
        const rowData: CellValue[] = [];
        for (let c = startCol; c <= lastCol; c++) {
          const cell = sheet.GetRange(colLetter(c) + r);
          const value = cell.GetValue();
          rowData.push(value === '' ? null : value);
        }
        data.push(rowData);
      }

      return { data, rowCount, colCount };
    },
  ).then((result) => {
    if (result.data.length < 2) throw new SpreadsheetError('Selection must include headers and at least one data row', 'INSUFFICIENT_DATA');

    const headers = result.data[0]?.map((h) => String(h ?? '')) ?? [];
    const rows = result.data.slice(1);
    if (headers.every((h) => !h || h.trim() === '')) throw new SpreadsheetError('Selection must include at least one non-empty header', 'EMPTY_HEADERS');

    const hasDataRow = rows.some((row) => row.some((cell) => cell !== null && cell !== ''));
    if (!hasDataRow) throw new SpreadsheetError('Selection must include at least one row with data', 'EMPTY_ROWS');

    return {
      headers,
      rows,
      rowCount: result.rowCount,
      colCount: result.colCount,
    };
  });
}

export function getSelectionInfo(): Promise<SelectionInfo> {
  return runQuery<{ row: number; col: number; rowCount: number; colCount: number }>(
    () => {
      const letterToCol = (colStr: string): number => {
        let col = 0;
        for (let i = 0; i < colStr.length; i++) col = col * 26 + (colStr.charCodeAt(i) - 64);
        return col;
      };

      const parseCell = (cell: string): { col: number; row: number } => {
        const match = cell.match(/^([A-Z]+)(\d+)$/);
        if (!match) return { col: 1, row: 1 };
        return { col: letterToCol(match[1]), row: parseInt(match[2]) };
      };

      const selection = Api.GetSelection();
      if (!selection) return { error: 'No selection' };

      const selAny = selection as unknown as { GetAddress: (a: boolean, b: boolean, c: string, d: boolean) => string };
      const address = selAny.GetAddress(false, false, '', false);
      if (!address) return { error: 'Cannot get selection address' };

      const parts = address.split(':');
      const start = parseCell(parts[0]);
      const end = parts.length > 1 ? parseCell(parts[1]) : start;

      return {
        row: start.row,
        col: start.col,
        rowCount: end.row - start.row + 1,
        colCount: end.col - start.col + 1,
      };
    },
  );
}

export function hasValidSelection(): Promise<boolean> {
  return runQuery<boolean>(
    () => {
      const selection = Api.GetSelection();
      if (!selection) return false;

      const selAny = selection as unknown as { GetAddress: (a: boolean, b: boolean, c: string, d: boolean) => string };
      const address = selAny.GetAddress(false, false, '', false);
      if (!address) return false;

      const isRange = address.includes(':');
      if (!isRange) return false;

      const letterToCol = (colStr: string): number => {
        let col = 0;
        for (let i = 0; i < colStr.length; i++) col = col * 26 + (colStr.charCodeAt(i) - 64);
        return col;
      };

      const parseCell = (cell: string): { col: number; row: number } => {
        const match = cell.match(/^([A-Z]+)(\d+)$/);
        if (!match) return { col: 1, row: 1 };
        return { col: letterToCol(match[1]), row: parseInt(match[2]) };
      };

      const parts = address.split(':');
      const start = parseCell(parts[0]);
      const end = parseCell(parts[1]);

      const rowCount = end.row - start.row + 1;
      const colCount = end.col - start.col + 1;

      return rowCount > 1 && colCount > 0;
    },
  );
}
