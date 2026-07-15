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

import { useMemo, useState, useEffect } from 'preact/hooks';

import { Button, Label, Select } from '@components';

import { useTranslation } from '@hooks';

import type { FilterCondition } from '@features/import/components/types';

import pencilIcon from '@resources/images/pencil.svg';
import pencilDarkIcon from '@resources/images/pencil_dark.svg';

import './filter.css';

const DEFAULT_FILTER: Omit<FilterCondition, 'id'> = { field: '', operator: 'Equals', value: '' };

interface FilterStepProps {
  fields: string[];
  filters: FilterCondition[];
  maxRows: number;
  onEditFields: () => void;
  onAddFilter: (filter: Omit<FilterCondition, 'id'>) => void;
  onUpdateFilter: (id: string, key: keyof FilterCondition, value: string) => void;
  onRemoveFilter: (id: string) => void;
  onMaxRowsChange: (value: number) => void;
  onSubmit: () => void;
  onSOQL: () => void;
}

export function FilterStep({
  fields,
  filters,
  maxRows,
  onEditFields,
  onAddFilter,
  onUpdateFilter,
  onMaxRowsChange,
  onSubmit,
  onSOQL,
}: FilterStepProps) {
  const { t } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const { body } = document;
      setIsDarkTheme(
        body.classList.contains('theme-dark')
        || body.classList.contains('theme-contrast-dark')
        || body.classList.contains('theme-night')
        || body.classList.contains('theme-type-dark'),
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const OPERATORS = useMemo(() => [
    { value: 'Equals', label: t('filters.operators.equals') },
    { value: 'Not Equals', label: t('filters.operators.not_equals') },
    { value: 'Contains', label: t('filters.operators.contains') },
    { value: 'Greater Than', label: t('filters.operators.greater_than') },
    { value: 'Less Than', label: t('filters.operators.less_than') },
  ], [t]);

  const fieldOptions = useMemo(
    () => fields.map((f) => ({ value: f, label: f })),
    [fields],
  );

  const current = filters[0];
  const hasFilter = !!current;

  const updateOrAdd = (key: keyof FilterCondition, value: string) => {
    if (hasFilter) {
      onUpdateFilter(current.id, key, value);
    } else if (key === 'field') {
      onAddFilter({ ...DEFAULT_FILTER, field: value });
    }
  };

  const handleFieldChange = (value: string) => updateOrAdd('field', value);
  const handleOperatorChange = (value: string) => updateOrAdd('operator', value);
  const handleValueChange = (e: Event) => {
    const { value } = (e.target as HTMLInputElement);
    updateOrAdd('value', value);
  };

  const handleAdd = () => onAddFilter(DEFAULT_FILTER);
  const handleMaxRowsInput = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement).value) || 10000;
    onMaxRowsChange(value);
  };

  return (
    <div className="filters-step">
      <div className="form-group">
        <div className="section-header">
          <Label>{t('import.selected_fields')}</Label>
          <button type="button" className="edit-button" onClick={onEditFields} title={t('common.edit')}>
            <img src={isDarkTheme ? pencilDarkIcon : pencilIcon} alt={t('common.edit')} className="edit-button__icon" />
          </button>
        </div>
        <div className="selected-fields-list">
          {fields.map((field) => (
            <div key={field} className="selected-field-item">{field}</div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <Label>{t('import.add_filter_condition')}</Label>
        <Select
          options={fieldOptions}
          value={current?.field || ''}
          onChange={handleFieldChange}
          placeholder={t('import.filter_object_fields')}
        />
      </div>

      <div className="form-group">
        <Label>{t('import.specify_value')}</Label>
        <Select
          options={OPERATORS}
          value={current?.operator || 'Equals'}
          onChange={handleOperatorChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="filter-input"
          placeholder={t('import.enter_conditions')}
          value={current?.value || ''}
          onInput={handleValueChange}
        />
      </div>

      <div className="filter-add-row">
        <button type="button" className="filter-add-button" onClick={handleAdd}>
          {t('common.add')}
        </button>
      </div>

      <div className="form-group">
        <Label>{t('import.max_rows_to_import')}</Label>
        <input
          type="text"
          className="filter-input"
          value={maxRows.toString()}
          onInput={handleMaxRowsInput}
        />
      </div>

      <div className="filters-step__actions">
        <Button variant="primary" fullWidth onClick={onSubmit}>
          {t('import.get_data')}
        </Button>
        <Button variant="secondary" fullWidth onClick={onSOQL}>
          {t('import.soql_editor')}
        </Button>
      </div>
    </div>
  );
}
