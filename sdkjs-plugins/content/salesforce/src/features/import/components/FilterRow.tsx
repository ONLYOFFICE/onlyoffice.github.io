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

import { Select, TextButton } from '@components';

import { useTranslation } from '@hooks';

import type { FilterCondition } from '@features/import/components/types';

import './filter.css';

interface FilterRowProps {
  filter: FilterCondition;
  fields: string[];
  onUpdate: (id: string, key: keyof FilterCondition, value: string) => void;
  onRemove: (id: string) => void;
  showAndOr?: boolean;
  operators?: { value: string; label: string }[];
}

const DEFAULT_OPERATORS = [
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: 'LIKE', label: 'LIKE' },
  { value: 'IN', label: 'IN' },
  { value: 'NOT IN', label: 'NOT IN' },
  { value: 'IS NULL', label: 'IS NULL' },
  { value: 'IS NOT NULL', label: 'IS NOT NULL' },
];

export function FilterRow({
  filter,
  fields,
  showAndOr = false,
  onUpdate,
  onRemove,
  operators = DEFAULT_OPERATORS,
}: FilterRowProps) {
  const { t } = useTranslation();

  const fieldOptions = fields.map((f) => ({ value: f, label: f }));

  return (
    <div className="filter-row">
      {showAndOr && <span className="filter-row__connector">AND</span>}
      <Select
        value={filter.field}
        onChange={(value) => onUpdate(filter.id, 'field', value)}
        options={fieldOptions}
        placeholder={t('import.field')}
      />
      <Select
        value={filter.operator}
        onChange={(value) => onUpdate(filter.id, 'operator', value)}
        options={operators}
      />
      <input
        className="filter-row__input"
        value={filter.value}
        onInput={(e) => onUpdate(filter.id, 'value', (e.target as HTMLInputElement).value)}
        placeholder={t('import.value')}
      />
      <TextButton onClick={() => onRemove(filter.id)}>×</TextButton>
    </div>
  );
}
