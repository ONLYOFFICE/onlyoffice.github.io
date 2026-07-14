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

import { useMemo } from 'preact/hooks';

import {
  Button, Label, Select,
} from '@components';

import type { FieldMapping, ExportOperation } from '@features/export/types';
import { MappingRow } from '@features/export/components/MappingRow';

import type { SalesforceField } from '@api/salesforce';

import { useTranslation } from '@hooks';

import './mapping.css';

interface MappingStepProps {
  objectName: string;
  fields: SalesforceField[];
  mappings: FieldMapping[];
  operation: ExportOperation;
  idColumn: string;
  headers: string[];
  rowCount: number;
  loading: boolean;
  canSubmit: boolean;
  onOperationChange: (op: ExportOperation) => void;
  onMappingChange: (source: string, target: string) => void;
  onIdColumnChange: (column: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function MappingStep({
  objectName,
  fields,
  mappings,
  operation,
  idColumn,
  headers,
  rowCount,
  loading,
  canSubmit,
  onOperationChange,
  onMappingChange,
  onIdColumnChange,
  onBack,
  onSubmit,
}: MappingStepProps) {
  const { t } = useTranslation();

  const isUpdate = operation === 'update';

  const fieldOptions = useMemo(() => [
    { value: '', label: '-' },
    ...fields
      .filter((f) => f.type !== 'id' || isUpdate)
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((f) => ({ value: f.name, label: f.label })),
  ], [fields, isUpdate]);

  const headerOptions = useMemo(() => [
    { value: '', label: t('export.select_id_column') },
    ...headers.map((h) => ({ value: h, label: h })),
  ], [headers, t]);

  const submitDisabled = loading || !canSubmit || (isUpdate && !idColumn);

  return (
    <div className="mapping-step">
      <div className="mapping-step__target-object">
        <span className="mapping-step__target-label">
          {t('export.target_object')}
          :
        </span>
        <span className="mapping-step__target-value">{objectName}</span>
      </div>

      <div className="mapping-step__divider" />

      <p className="mapping-step__instructions">
        {t('export.mapping_instructions')}
      </p>

      <div className="mapping-step__mappings">
        {mappings.map((m) => (
          <MappingRow
            key={m.sourceColumn}
            sourceColumn={m.sourceColumn}
            targetField={m.targetField}
            fieldOptions={fieldOptions}
            onChange={(target) => onMappingChange(m.sourceColumn, target)}
          />
        ))}
      </div>

      {isUpdate && (
      <section className="mapping-step__id-section">
        <Label>{t('export.id_column')}</Label>
        <Select options={headerOptions} value={idColumn} onChange={onIdColumnChange} />
      </section>
      )}

      <footer className="mapping-step__footer">
        <Button variant="primary" fullWidth onClick={onSubmit} disabled={submitDisabled}>
          {t('export.export')}
          {' '}
          (
          {rowCount}
          )
        </Button>
      </footer>
    </div>
  );
}
