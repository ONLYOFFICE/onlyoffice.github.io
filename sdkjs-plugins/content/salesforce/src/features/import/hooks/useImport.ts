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

import { useState, useMemo, useCallback } from 'preact/hooks';

import { useFields, type PrefixedField } from '@features/import/hooks/useFields';
import { useAuthentication } from '@features/authentication';
import { useObjects } from '@features/import/hooks/useObjects';
import { useFilters } from '@features/import/hooks/useFilters';

import { useModals } from '@store/modal';

import { useTranslation } from '@hooks';

import { insertRecords } from '@api/spreadsheet';
import { executeQuery } from '@api/salesforce';

export type Step = 'object' | 'fields' | 'filters' | 'loading' | 'success' | 'soql';

const VALID_IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const DATE_TYPES = ['date', 'datetime', 'time'];
const MAX_ROWS_DEFAULT = 10000;
const MAX_ROWS_LIMIT = 50000;

const escapeSOQL = (value: string) => value
  .replace(/\\/g, '\\\\')
  .replace(/'/g, "\\'")
  .replace(/\n/g, '\\n')
  .replace(/\r/g, '\\r');

const isValidId = (name: string) => VALID_IDENTIFIER.test(name);

const parsePrefixed = (name: string) => {
  const [objectName, fieldName] = name.split('::');
  return { objectName: objectName || '', fieldName: fieldName || name };
};

const groupByObject = (fields: string[]): Map<string, string[]> => {
  const grouped = new Map<string, string[]>();
  fields.forEach((prefixed) => {
    const { objectName, fieldName } = parsePrefixed(prefixed);
    if (!grouped.has(objectName)) grouped.set(objectName, []);
    grouped.get(objectName).push(fieldName);
  });

  return grouped;
};

const mapOperator = (uiOp: string): { op: string; isNull: boolean } => {
  const map: Record<string, { op: string; isNull: boolean }> = {
    Equals: { op: '=', isNull: false },
    'Does not equal': { op: '!=', isNull: false },
    'Is null': { op: '= null', isNull: true },
    'Is not null': { op: '!= null', isNull: true },
    'Greater than': { op: '>', isNull: false },
    'Greater than or equal to': { op: '>=', isNull: false },
    'Less than': { op: '<', isNull: false },
    'Less than or equal to': { op: '<=', isNull: false },
    'Not Equals': { op: '!=', isNull: false },
    Contains: { op: 'LIKE', isNull: false },
    'Greater Than': { op: '>', isNull: false },
    'Less Than': { op: '<', isNull: false },
    'Greater Than or Equal': { op: '>=', isNull: false },
    'Less Than or Equal': { op: '<=', isNull: false },
  };

  return map[uiOp] || { op: uiOp, isNull: false };
};

const formatDate = (value: string, type: string): string => {
  if (type.toLowerCase() === 'datetime' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T00:00:00Z`;

  return value;
};

const buildCondition = (filter: any, fieldName: string, fieldType: string): string => {
  const { op, isNull } = mapOperator(filter.operator);
  const isDate = DATE_TYPES.includes(fieldType.toLowerCase());

  if (isNull) return `${fieldName} ${op}`;
  if (op === 'LIKE') return `${fieldName} LIKE '%${escapeSOQL(filter.value)}%'`;
  if (isDate) return `${fieldName} ${op} ${formatDate(filter.value, fieldType)}`;
  return `${fieldName} ${op} '${escapeSOQL(filter.value)}'`;
};

export function useImport() {
  const { t } = useTranslation();
  const { state } = useAuthentication();
  const { confirm, soqlEditor } = useModals();

  const objects = useObjects();
  const filters = useFilters();
  const fields = useFields(objects.selectedObjects);

  const [step, setStep] = useState<Step>('object');
  const [query, setQuery] = useState('');
  const [resultCount, setResultCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loading = objects.loading || fields.loading;
  const combinedError = error || objects.error || fields.error;

  const getHeader = useCallback((prefixed: string) => {
    const field = fields.getFieldByPrefixedName(prefixed);
    return field?.label || prefixed;
  }, [fields]);

  const buildQuery = useCallback((objectName: string, fieldNames: string[], allFields: PrefixedField[]): string => {
    const safe = fieldNames.filter(isValidId);
    if (safe.length === 0) throw new Error(`No valid fields for ${objectName}`);
    if (!isValidId(objectName)) throw new Error(`Invalid object: ${objectName}`);

    let q = `SELECT ${safe.join(', ')} FROM ${objectName}`;

    const objectFilters = filters.filters
      .filter((f) => parsePrefixed(f.field).objectName === objectName)
      .filter((f) => {
        const { fieldName } = parsePrefixed(f.field);
        if (!fieldName || !isValidId(fieldName)) return false;
        const { isNull } = mapOperator(f.operator);
        return isNull || f.value;
      });

    if (objectFilters.length > 0) {
      const conditions = objectFilters.map((filter, i) => {
        const { fieldName } = parsePrefixed(filter.field);
        const field = allFields.find((f) => f.objectName === objectName && f.name === fieldName);
        const condition = buildCondition(filter, fieldName, field?.type || '');
        const connector = filter.connector === 'Or' ? 'OR' : 'AND';
        return i === 0 ? condition : `${connector} ${condition}`;
      });
      q += ` WHERE ${conditions.join(' ')}`;
    }

    const maxRowsNum = Math.floor(Number(filters.maxRows)) || MAX_ROWS_DEFAULT;
    const limit = Math.max(1, Math.min(MAX_ROWS_LIMIT, maxRowsNum));
    return `${q} LIMIT ${limit}`;
  }, [filters]);

  const executeCustomQuery = useCallback(async (customQuery: string) => {
    const match = customQuery.match(/SELECT\s+(.+?)\s+FROM/i);
    const fieldNames = match ? match[1].split(',').map((f) => f.trim()) : [];

    const { access_token, instance_url } = state.value;
    const res = await executeQuery(instance_url, access_token, customQuery);

    if (res.error) {
      setError(res.error.message);
      fields.reset();
      filters.reset();
      setStep('fields');
      return;
    }

    if (res.data) {
      const records = res.data.records || [];
      setResultCount(records.length);
      try {
        await insertRecords(fieldNames, records, fieldNames, {
          target: 'active',
          sheetNamePrefix: 'Import',
        });
        setStep('success');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : t('common.unknown_error');
        setError(`${t('import.insert_failed')}: ${errorMsg}`);
        setStep('object');
      }
    }
  }, [state.value, fields, filters, t]);

  const executeRegular = useCallback(async () => {
    const fieldsByObject = groupByObject(fields.selected);
    const objectsToQuery = Array.from(fieldsByObject.keys());

    if (objectsToQuery.length === 0) {
      setError(t('import.no_fields_selected'));
      setStep('fields');
      return;
    }

    const { access_token, instance_url } = state.value;
    let totalRecords = 0;
    const errors: string[] = [];

    for (const objectName of objectsToQuery) {
      const fieldNames = fieldsByObject.get(objectName);

      let q: string;
      try {
        q = buildQuery(objectName, fieldNames, fields.fields);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : t('import.build_query_failed', { object: objectName });
        errors.push(errorMsg);
        continue;
      }

      const res = await executeQuery(instance_url, access_token, q);
      if (res.error) {
        errors.push(`${objectName}: ${res.error.message}`);
        continue;
      }

      if (res.data) {
        const records = res.data.records || [];
        totalRecords += records.length;

        try {
          const headers = fieldNames.map((name) => getHeader(`${objectName}::${name}`));
          await insertRecords(headers, records, fieldNames, {
            target: 'active',
            sheetNamePrefix: objectName,
          });
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : t('common.unknown_error');
          errors.push(`${objectName}: ${t('import.insert_failed')} - ${errorMsg}`);
        }
      }
    }

    setResultCount(totalRecords);

    if (errors.length > 0) {
      setError(errors.join('; '));
      fields.reset();
      filters.reset();
      setStep('fields');
      return;
    }

    setStep('success');
  }, [state.value, fields, filters, buildQuery, getHeader, t]);

  const execute = useCallback(async (customQuery?: string) => {
    setStep('loading');
    setError(null);
    if (customQuery) {
      await executeCustomQuery(customQuery);
    } else {
      await executeRegular();
    }
  }, [executeCustomQuery, executeRegular]);

  const executeSoqlDirect = useCallback(async (q: string) => {
    const { access_token, instance_url } = state.value;
    const match = q.match(/SELECT\s+(.+?)\s+FROM/i);
    const fieldNames = match ? match[1].split(',').map((f) => f.trim()) : [];

    const res = await executeQuery(instance_url, access_token, q);
    if (res.error) return { success: false, error: res.error.message };

    if (res.data) {
      const records = res.data.records || [];
      try {
        await insertRecords(fieldNames, records, fieldNames, {
          target: 'active',
          sheetNamePrefix: 'SOQL',
        });
        return { success: true };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : t('import.failed_to_insert_data');
        return { success: false, error: errorMsg };
      }
    }

    return { success: false, error: t('import.no_data_returned') };
  }, [state.value, t]);

  const submit = useCallback(() => {
    confirm(
      {
        title: t('import.title'),
        message: t('import.replace_warning'),
        confirmText: t('import.replace'),
      },
      () => execute(),
    );
  }, [confirm, execute, t]);

  const openSoqlEditor = useCallback(() => {
    soqlEditor({ query }, async (q) => {
      const result = await executeSoqlDirect(q);
      setQuery(result.success ? '' : q);
      return result;
    });
  }, [soqlEditor, query, executeSoqlDirect]);

  const reset = useCallback(() => {
    objects.reset();
    fields.reset();
    filters.reset();
    setResultCount(0);
    setQuery('');
    setStep('object');
    setError(null);
  }, [objects, fields, filters]);

  const canNext = useMemo(() => {
    if (step === 'object') return objects.selectedObjects.length > 0 && !objects.validationError;
    if (step === 'fields') return fields.selected.length > 0;
    return true;
  }, [step, objects, fields]);

  return {
    loading,
    objectsLoading: objects.loading,
    fieldsLoading: fields.loading,
    error: combinedError,
    step,
    resultCount,

    objects: objects.objects,
    selectedObjects: objects.selectedObjects,
    toggleObject: objects.toggleObject,
    validationError: objects.validationError,

    fields: fields.fields,
    selected: fields.selected,
    toggle: fields.toggle,
    setSelectedFields: fields.setSelectedFields,
    selectAll: fields.selectAll,
    clearAll: fields.clearAll,
    getFieldByPrefixedName: fields.getFieldByPrefixedName,

    ...filters,
    query,
    setQuery,

    goTo: setStep,
    canNext,

    submit,
    openSoqlEditor,
    reload: () => execute(),
    reset,
    clearError: () => setError(null),
  };
}

export type UseImportResult = ReturnType<typeof useImport>;
