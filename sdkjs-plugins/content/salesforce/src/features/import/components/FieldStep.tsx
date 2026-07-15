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

import {
  useMemo, useState, useRef, useEffect,
} from 'preact/hooks';

import {
  Button, Label, MultiSelect, ErrorBox, Select,
} from '@components';

import { useTranslation } from '@hooks';

import type { FilterCondition } from '@features/import/components/types';
import { FieldSummary } from '@features/import/components/FieldSummary';

import type { SalesforceObject } from '@api/salesforce';
import type { PrefixedField } from '@features/import/hooks/useFields';

import pencilIcon from '@resources/images/pencil.svg';
import pencilDarkIcon from '@resources/images/pencil_dark.svg';
import chevronIcon from '@resources/images/chevron.svg';
import datepickerIcon from '@resources/images/datepicker.svg';
import removeIcon from '@resources/images/remove.svg';
import removeDarkIcon from '@resources/images/remove_dark.svg';

import './fields.css';

const DATE_TYPES = ['date', 'datetime', 'time'];

const isDateType = (type: string) => DATE_TYPES.includes(type.toLowerCase());
const formatFieldLabel = (f: PrefixedField) => `${f.objectName}::${f.label}`;

interface FieldStepProps {
  objects: SalesforceObject[];
  selectedObjects: string[];
  fields: PrefixedField[];
  selected: string[];
  loading: boolean;
  canSubmit: boolean;
  filters: FilterCondition[];
  maxRows: number;
  error: string | null;
  onToggle: (name: string) => void;
  onSetSelected: (values: string[]) => void;
  onEditObjects: () => void;
  onAddFilter: (filter: Omit<FilterCondition, 'id'>) => void;
  onUpdateFilter: (id: string, key: keyof FilterCondition, value: string) => void;
  onRemoveFilter: (id: string) => void;
  onMaxRowsChange: (value: number) => void;
  onSubmit: () => void;
  onSOQL: () => void;
  onClearError?: () => void;
}

export function FieldStep({
  objects,
  selectedObjects,
  fields,
  selected,
  loading,
  canSubmit,
  filters,
  maxRows,
  error,
  onToggle,
  onSetSelected,
  onEditObjects,
  onAddFilter,
  onUpdateFilter,
  onRemoveFilter,
  onMaxRowsChange,
  onSubmit,
  onSOQL,
  onClearError,
}: FieldStepProps) {
  const { t } = useTranslation();
  const [confirmed, setConfirmed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filterField, setFilterField] = useState('');
  const [filterOp, setFilterOp] = useState('Equals');
  const [filterVal, setFilterVal] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

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

  const BASE_OPERATORS = useMemo(() => [
    { value: 'Equals', label: t('filters.operators.equals') },
    { value: 'Does not equal', label: t('filters.operators.not_equals') },
    { value: 'Is null', label: t('filters.operators.is_null') },
    { value: 'Is not null', label: t('filters.operators.is_not_null') },
  ], [t]);

  const DATE_OPERATORS = useMemo(() => [
    ...BASE_OPERATORS,
    { value: 'Greater than', label: t('filters.operators.greater_than') },
    { value: 'Greater than or equal to', label: t('filters.operators.greater_than_or_equal') },
    { value: 'Less than', label: t('filters.operators.less_than') },
    { value: 'Less than or equal to', label: t('filters.operators.less_than_or_equal') },
  ], [BASE_OPERATORS, t]);

  const OP_SYMBOLS = useMemo<Record<string, string>>(() => ({
    Equals: '=',
    'Does not equal': '!=',
    'Is null': t('filters.operators.is_null'),
    'Is not null': t('filters.operators.is_not_null'),
    'Greater than': '>',
    'Greater than or equal to': '>=',
    'Less than': '<',
    'Less than or equal to': '<=',
  }), [t]);

  const getOperators = (type?: string) => (type && isDateType(type) ? DATE_OPERATORS : BASE_OPERATORS);

  const fieldMap = useMemo(() => new Map(fields.map((f) => [f.prefixedName, f])), [fields]);
  const getField = (name: string) => fieldMap.get(name);
  const getLabel = (name: string) => {
    const f = getField(name);
    return f ? formatFieldLabel(f) : name;
  };

  const currentField = getField(filterField);
  const isDate = currentField ? isDateType(currentField.type) : false;
  const needsValue = filterOp !== 'Is null' && filterOp !== 'Is not null';
  const showFilters = confirmed && selected.length > 0 && !editing;

  const fieldOptions = useMemo(
    () => fields.map((f) => ({
      value: f.prefixedName,
      label: formatFieldLabel(f),
      extra: `(${f.type})`,
    })),
    [fields],
  );

  const filterFieldOptions = useMemo(
    () => selected.map((name) => ({ value: name, label: getLabel(name) })),
    [selected, fieldMap],
  );

  const operatorOptions = useMemo(
    () => getOperators(currentField?.type),
    [currentField],
  );

  const clearError = () => onClearError?.();

  const handleFieldChange = (name: string) => {
    setFilterField(name);
    setFilterVal('');
    const f = getField(name);
    if (f && !getOperators(f.type).some((op) => op.value === filterOp)) {
      setFilterOp('Equals');
    }
  };

  const handleAddFilter = () => {
    if (!filterField) return;
    clearError();
    onAddFilter({
      field: filterField,
      operator: filterOp,
      value: filterVal,
      connector: filters.length > 0 ? 'And' : undefined,
    });
    setFilterField('');
    setFilterOp('Equals');
    setFilterVal('');
  };

  const handleToggle = (name: string) => {
    clearError();
    onToggle(name);
  };

  const handleClose = () => {
    if (selected.length > 0) {
      setConfirmed(true);
      setEditing(false);
    }
  };

  const canAddFilter = filterField && filterOp && (needsValue ? filterVal : true);

  return (
    <div className="fields-step">
      <FieldSummary objects={objects} selectedObjects={selectedObjects} onEdit={onEditObjects} />
      <hr className="section-divider" />
      {(!confirmed || editing) && (
      <div className="form-group">
        <Label>{t('import.enter_or_select_fields')}</Label>
        <MultiSelect
          options={fieldOptions}
          selected={selected}
          placeholder={t('import.enter_or_select_fields')}
          disabled={loading}
          onToggle={handleToggle}
          onSelectAll={onSetSelected}
          onClose={handleClose}
        />
      </div>
      )}

      {showFilters && (
      <>
        <div className="form-group">
          <div className="section-header">
            <Label>{t('import.selected_fields')}</Label>
            <button type="button" className="edit-button" onClick={() => setEditing(true)} title={t('common.edit')}>
              <img src={isDarkTheme ? pencilDarkIcon : pencilIcon} alt={t('common.edit')} className="edit-button__icon" />
            </button>
          </div>
          <div className="selected-fields-list">
            {selected.map((name) => (
              <div key={name} className="selected-field-item">{getLabel(name)}</div>
            ))}
          </div>
        </div>

        <hr className="section-divider" />

        <div className="form-group">
          <Label>{t('import.add_filter_condition')}</Label>
          <Select
            options={filterFieldOptions}
            value={filterField}
            onChange={handleFieldChange}
            placeholder={t('import.filter_object_fields')}
          />
        </div>

        <div className="form-group">
          <Label>{t('import.specify_value')}</Label>
          <Select options={operatorOptions} value={filterOp} onChange={setFilterOp} />
        </div>

        {needsValue && (
        <div className="form-group">
          {isDate ? (
            <div className="date-input-wrapper">
              <input
                ref={dateRef}
                type="date"
                className="filter-input filter-input--date"
                value={filterVal}
                onChange={(e) => setFilterVal((e.target as HTMLInputElement).value)}
              />
              <button
                type="button"
                className="date-picker-button"
                onClick={() => dateRef.current?.showPicker()}
                title={t('import.open_calendar')}
              >
                <img src={datepickerIcon} alt={t('import.open_calendar')} className="date-picker-icon" />
              </button>
            </div>
          ) : (
            <input
              type="text"
              className="filter-input"
              placeholder={t('import.enter_conditions')}
              value={filterVal}
              onInput={(e) => setFilterVal((e.target as HTMLInputElement).value)}
            />
          )}
        </div>
        )}

        <div className="form-group">
          <Button variant="secondary" fullWidth onClick={handleAddFilter} disabled={!canAddFilter}>
            {t('common.add')}
          </Button>
        </div>

        {filters.length > 0 && (
        <div className="added-filters">
          {filters.map((f, i) => (
            <div key={f.id} className="added-filter-item">
              <div className="added-filter-row">
                <div className="added-filter-text">
                  {getLabel(f.field)}
                  <br />
                  {OP_SYMBOLS[f.operator] || f.operator}
                  {' '}
                  {f.value}
                </div>
                <button
                  type="button"
                  className="added-filter-remove"
                  onClick={() => {
                    clearError();
                    onRemoveFilter(f.id);
                  }}
                  title={t('filters.remove_filter')}
                >
                  <img src={isDarkTheme ? removeDarkIcon : removeIcon} alt={t('filters.remove_filter')} className="added-filter-remove__icon" />
                </button>
              </div>
              {i < filters.length - 1 && (
                <div className="added-filter-connector-row">
                  <select
                    className="connector-select"
                    value={filters[i + 1].connector || 'And'}
                    onChange={(e) => {
                      clearError();
                      onUpdateFilter(filters[i + 1].id, 'connector', (e.target as HTMLSelectElement).value);
                    }}
                  >
                    <option value="And">{t('filters.connectors.and')}</option>
                    <option value="Or">{t('filters.connectors.or')}</option>
                  </select>
                  <img src={chevronIcon} alt="" className="connector-arrow" />
                </div>
              )}
            </div>
          ))}
        </div>
        )}

        <hr className="section-divider" />

        <div className="form-group">
          <Label>{t('import.max_rows_to_import')}</Label>
          <input
            type="text"
            className="filter-input"
            value={maxRows.toString()}
            onInput={(e) => {
              clearError();
              onMaxRowsChange(parseInt((e.target as HTMLInputElement).value) || 10000);
            }}
          />
        </div>
      </>
      )}

      <div className="fields-step__actions">
        <Button variant="primary" fullWidth onClick={onSubmit} disabled={!canSubmit}>
          {t('import.get_data')}
        </Button>
        <Button variant="secondary" fullWidth onClick={onSOQL}>
          {t('import.soql_editor')}
        </Button>
      </div>

      {error && (
      <ErrorBox title={t('common.error')} message={t('errors.check_data_and_retry')} />
      )}
    </div>
  );
}
