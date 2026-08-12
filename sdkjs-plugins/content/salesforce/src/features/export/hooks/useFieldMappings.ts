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

import { useState, useCallback, useMemo } from 'preact/hooks';

import type { ExportOperation, FieldMapping } from '@features/export/types';

export function useFieldMappings() {
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [operation, setOperation] = useState<ExportOperation>('create');
  const [idColumn, setIdColumn] = useState('');

  const initialize = useCallback((headers: string[]) => {
    setMappings(headers.filter((header) => header !== '').map((header) => ({ sourceColumn: header, targetField: '' })));
  }, []);

  const update = useCallback((sourceColumn: string, targetField: string) => {
    setMappings((prev) => prev.map((m) => (m.sourceColumn === sourceColumn ? { ...m, targetField } : m)));
  }, []);

  const clear = useCallback(() => {
    setMappings([]);
    setOperation('create');
    setIdColumn('');
  }, []);

  const validMappings = useMemo(
    () => mappings.filter((m) => m.targetField),
    [mappings],
  );

  const hasValidMappings = validMappings.length > 0;

  return {
    mappings,
    operation,
    idColumn,
    validMappings,
    hasValidMappings,
    initialize,
    update,
    setOperation,
    setIdColumn,
    clear,
  };
}
