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

import { Button, Label, Select } from '@components';

import { useTranslation } from '@hooks';

import type { SalesforceField } from '@api/salesforce';
import type { FilterCondition } from '@features/import/components/types';

import './fields.css';

const OPERATOR_MAP: Record<string, string> = {
  Equals: '=',
  'Does not equal': '!=',
  'Is null': '= null',
  'Is not null': '!= null',
  'Greater than': '>',
  'Greater than or equal to': '>=',
  'Less than': '<',
  'Less than or equal to': '<=',
  Contains: 'LIKE',
  'Does not contain': 'NOT LIKE',
};

const NULL_OPERATORS = ['Is null', 'Is not null'];
const LIKE_OPERATORS = ['Contains', 'Does not contain'];

interface FilterFormProps {
  fields: SalesforceField[];
  onAdd: (filter: Omit<FilterCondition, 'id'>) => void;
}

export function FilterForm({ fields, onAdd }: FilterFormProps) {
  const { t } = useTranslation();

  const [field, setField] = useState('');
  const [operator, setOperator] = useState('Equals');
  const [value, setValue] = useState('');

  const OPERATOR_OPTIONS = useMemo(() => [
    { value: 'Equals', label: t('filters.operators.equals') },
    { value: 'Does not equal', label: t('filters.operators.not_equals') },
    { value: 'Is null', label: t('filters.operators.is_null') },
    { value: 'Is not null', label: t('filters.operators.is_not_null') },
    { value: 'Greater than', label: t('filters.operators.greater_than') },
    { value: 'Greater than or equal to', label: t('filters.operators.greater_than_or_equal') },
    { value: 'Less than', label: t('filters.operators.less_than') },
    { value: 'Less than or equal to', label: t('filters.operators.less_than_or_equal') },
    { value: 'Contains', label: t('filters.operators.contains') },
    { value: 'Does not contain', label: t('filters.operators.does_not_contain') },
  ], [t]);

  const fieldOptions = useMemo(
    () => fields.map((f) => ({ value: f.name, label: f.label })),
    [fields],
  );

  const isNullOperator = NULL_OPERATORS.includes(operator);
  const isValid = field && (isNullOperator || value);

  const handleAdd = useCallback(() => {
    if (!isValid) return;

    const soqlOperator = OPERATOR_MAP[operator] || '=';
    const finalValue = LIKE_OPERATORS.includes(operator) ? `%${value}%` : value;

    onAdd({
      field,
      operator: soqlOperator,
      value: isNullOperator ? '' : finalValue,
    });

    setField('');
    setOperator('Equals');
    setValue('');
  }, [field, operator, value, isValid, isNullOperator, onAdd]);

  return (
    <>
      <div className="form-group">
        <Label>{t('import.add_filter_condition')}</Label>
        <Select
          value={field}
          onChange={setField}
          options={fieldOptions}
          placeholder={t('import.filter_object_fields')}
        />
      </div>

      <div className="form-group">
        <Label>{t('import.specify_value')}</Label>
        <Select
          value={operator}
          onChange={setOperator}
          options={OPERATOR_OPTIONS}
        />
      </div>

      {!isNullOperator && (
      <div className="form-group">
        <input
          type="text"
          className="filter-value-input"
          value={value}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          placeholder={t('import.enter_conditions')}
        />
      </div>
      )}

      <div className="form-group">
        <Button variant="secondary" fullWidth onClick={handleAdd} disabled={!isValid}>
          {t('common.add')}
        </Button>
      </div>
    </>
  );
}
