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

import { useAuthentication } from '@features/authentication';
import { useSheetData } from '@features/export/hooks/useSheetData';
import { useSalesforceData } from '@features/export/hooks/useSalesforceData';
import { useFieldMappings } from '@features/export/hooks/useFieldMappings';
import type { ExportStep, FieldMapping } from '@features/export/types';

import { useModals } from '@store/modal';

import { useTranslation } from '@hooks';

import type { SheetData } from '@api/spreadsheet';
import {
  createRecordsBatch, updateRecordsBatch, type ExportResult, type SalesforceField,
} from '@api/salesforce';

const EXPORT_TIMEOUT = 60000;

function normalizeValue(value: unknown): unknown {
  if (value == null || value === '') return null;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const upper = trimmed.toUpperCase();
    if (upper === 'TRUE' || upper === '1' || upper === 'YES') return true;
    if (upper === 'FALSE' || upper === '0' || upper === 'NO') return false;

    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    } catch {
      // TODO: Handle invalid JSON
    }
  }

  return value;
}

function buildRecord(
  row: unknown[],
  headers: string[],
  mappings: FieldMapping[],
  fields: SalesforceField[],
): Record<string, unknown> {
  const record: Record<string, unknown> = {};
  const fieldMap = new Map(fields.map((f) => [f.name, f.type]));

  for (const { sourceColumn, targetField } of mappings) {
    const colIndex = headers.indexOf(sourceColumn);
    if (colIndex >= 0) {
      const rawValue = row[colIndex];
      const fieldType = fieldMap.get(targetField);

      let normalizedValue = normalizeValue(rawValue);
      if ((fieldType === 'boolean' || fieldType === 'Checkbox') && typeof normalizedValue !== 'boolean') {
        normalizedValue = Boolean(normalizedValue);
      }

      record[targetField] = normalizedValue;
    }
  }

  return record;
}

function buildCreateRecords(
  sheetData: SheetData,
  mappings: FieldMapping[],
  fields: SalesforceField[],
): Record<string, unknown>[] {
  return sheetData.rows.map((row) => buildRecord(row, sheetData.headers, mappings, fields));
}

function buildUpdateRecords(
  sheetData: SheetData,
  mappings: FieldMapping[],
  idColumn: string,
  fields: SalesforceField[],
): { id: string; data: Record<string, unknown> }[] {
  const idIndex = sheetData.headers.indexOf(idColumn);
  return sheetData.rows
    .map((row) => {
      const data = buildRecord(row, sheetData.headers, mappings, fields);
      delete data.Id;
      const id = idIndex >= 0 ? String(row[idIndex] ?? '') : '';
      return { id, data };
    })
    .filter((record) => record.id);
}

export function useExport() {
  const { state } = useAuthentication();
  const { confirm } = useModals();
  const { t } = useTranslation();

  const credentials = state.value;

  const sheet = useSheetData();
  const salesforce = useSalesforceData();
  const mapping = useFieldMappings();

  const [step, setStep] = useState<ExportStep>('source');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExportResult | null>(null);

  const loading = sheet.loading || salesforce.loading;

  const loadSheetData = useCallback(async () => {
    const data = await sheet.load();
    if (data) {
      mapping.initialize(data.headers);
      setStep('object');
    }
  }, [sheet, mapping]);

  const selectObject = useCallback(async (objectName: string) => {
    await salesforce.selectObject(objectName);
    setStep('mapping');
  }, [salesforce]);

  const execute = useCallback(async () => {
    if (!sheet.sheetData || !salesforce.selectedObject) return;

    if (!mapping.hasValidMappings) {
      setError(t('export.no_field_mappings'));
      return;
    }

    setStep('loading');
    setError(null);

    const { instance_url, access_token } = credentials;
    const records = mapping.operation === 'update'
      ? buildUpdateRecords(sheet.sheetData, mapping.validMappings, mapping.idColumn, salesforce.fields)
      : buildCreateRecords(sheet.sheetData, mapping.validMappings, salesforce.fields);

    const updateRecords = records as { id: string; data: Record<string, unknown> }[];
    const createRecords = records as Record<string, unknown>[];
    const batchOptions = { timeout: EXPORT_TIMEOUT };
    const res = mapping.operation === 'update'
      ? await updateRecordsBatch(instance_url, access_token, salesforce.selectedObject, updateRecords, batchOptions)
      : await createRecordsBatch(instance_url, access_token, salesforce.selectedObject, createRecords, batchOptions);

    if (res.error) {
      console.error('Export failed:', res.error);
      setError(res.error.message);
      setStep('mapping');
      return;
    }

    if (res.data && !res.data.success && res.data.errors.length > 0) {
      console.error('Export completed with errors:', res.data.errors);
    }

    setResult(res.data);
    setStep('success');
  }, [sheet.sheetData, salesforce.selectedObject, mapping, credentials, t]);

  const submit = useCallback(() => {
    const recordCount = sheet.sheetData?.rows.length ?? 0;
    const action = mapping.operation === 'create' ? t('export.created') : t('export.updated');

    confirm(
      {
        title: t('export.export_to_salesforce'),
        message: t('export.confirm_export', {
          count: recordCount,
          action,
          object: salesforce.selectedObject,
        }),
        confirmText: t('export.export'),
      },
      execute,
    );
  }, [sheet.sheetData, mapping.operation, salesforce.selectedObject, confirm, execute, t]);

  const reset = useCallback(() => {
    setStep('source');
    setError(null);
    setResult(null);
    sheet.clear();
    salesforce.clear();
    mapping.clear();
  }, [sheet, salesforce, mapping]);

  const canNext = useMemo(() => {
    switch (step) {
      case 'object':
        return !!salesforce.selectedObject;
      case 'mapping':
        return mapping.hasValidMappings;
      default:
        return true;
    }
  }, [step, salesforce.selectedObject, mapping.hasValidMappings]);

  return {
    step,
    loading,
    error: error || sheet.error || salesforce.error,
    sheetData: sheet.sheetData,
    objects: salesforce.objects,
    selectedObject: salesforce.selectedObject,
    objectFields: salesforce.fields,
    operation: mapping.operation,
    mappings: mapping.mappings,
    idColumn: mapping.idColumn,
    result,

    loadSheetData,
    loadObjects: salesforce.loadObjects,
    selectObject,
    setOperation: mapping.setOperation,
    updateMapping: mapping.update,
    setIdColumn: mapping.setIdColumn,
    submit,
    reset,
    goTo: setStep,
    canNext,
  };
}

export type UseExportResult = ReturnType<typeof useExport>;
