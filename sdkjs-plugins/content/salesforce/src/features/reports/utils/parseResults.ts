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

import type { ReportResults } from '@features/reports/types';

export interface ParsedReport {
  headers: string[];
  rows: (string | number | boolean | null)[][];
}

export function parseReport(results: ReportResults): ParsedReport {
  const { detailColumns } = results.reportMetadata;
  const { detailColumnInfo } = results.reportExtendedMetadata;

  const headers = detailColumns.map((col) => detailColumnInfo[col]?.label || col);

  const rows: ParsedReport['rows'] = [];

  for (const key of Object.keys(results.factMap)) {
    const section = results.factMap[key];
    if (!section.rows) continue;

    for (const row of section.rows) {
      const rowData = row.dataCells.map((cell) => {
        if (cell.value === null || cell.value === undefined) return cell.label || '';

        return typeof cell.value === 'object'
          ? cell.label
          : (cell.value as string | number | boolean);
      });

      rows.push(rowData);
    }
  }

  return { headers, rows };
}
