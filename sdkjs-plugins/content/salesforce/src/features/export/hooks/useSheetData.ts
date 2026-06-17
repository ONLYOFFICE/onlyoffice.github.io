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

import { useState, useCallback } from 'preact/hooks';

import { useTranslation } from '@hooks';

import { readSheetData, type SheetData } from '@api/spreadsheet';

export function useSheetData() {
  const { t } = useTranslation();
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await readSheetData();
      const indices = data.headers
        .map((h, i) => h?.trim() ? i : null)
        .filter((i): i is number => i !== null);
      
      const filtered: SheetData = {
        headers: indices.map((i) => data.headers[i]),
        rows: data.rows.map((row) => indices.map((i) => row[i])),
        rowCount: data.rowCount,
        colCount: indices.length,
      };
      
      setSheetData(filtered);
      return filtered;
    } catch (err) {
      const message = err instanceof Error ? err.message : t('export.failed_to_read_data');
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [t]);

  const clear = useCallback(() => {
    setSheetData(null);
    setError(null);
  }, []);

  return {
    sheetData,
    loading,
    error,
    load,
    clear,
  };
}
