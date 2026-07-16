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
  Button, Label, ErrorBox, MultiSelect, Tag,
} from '@components';

import { useTranslation } from '@hooks';

import type { SalesforceObject } from '@api/salesforce';

import './object.css';

interface ObjectStepProps {
  objects: SalesforceObject[];
  selectedObjects: string[];
  loading: boolean;
  canNext: boolean;
  validationError: string | null;
  onToggle: (value: string) => void;
  onNext: () => void;
  onSOQL: () => void;
}

export function ObjectStep({
  loading,
  canNext,
  objects,
  selectedObjects,
  validationError,
  onToggle,
  onNext,
  onSOQL,
}: ObjectStepProps) {
  const { t } = useTranslation();

  const objectOptions = useMemo(
    () => objects.map((obj) => ({
      value: obj.name,
      label: obj.label,
    })),
    [objects],
  );

  const getLabel = (name: string) => objects.find((o) => o.name === name)?.label ?? name;

  const placeholder = selectedObjects.length > 0
    ? t('import.add_more')
    : t('import.enter_or_select_objects');

  return (
    <div>
      <div className="form-group">
        <Label>{t('import.enter_or_select_objects')}</Label>

        {selectedObjects.length > 0 && (
        <div className="selected-items">
          {selectedObjects.map((name) => (
            <Tag key={name} onRemove={() => onToggle(name)}>
              {getLabel(name)}
            </Tag>
          ))}
        </div>
        )}

        <MultiSelect
          options={objectOptions}
          selected={selectedObjects}
          placeholder={placeholder}
          disabled={loading}
          onToggle={onToggle}
        />
      </div>

      {validationError && (
      <ErrorBox message={validationError} />
      )}

      <div className="import-actions">
        <Button variant="primary" fullWidth onClick={onNext} disabled={!canNext}>
          {t('common.next')}
        </Button>

        <Button variant="secondary" fullWidth onClick={onSOQL}>
          {t('import.soql_editor')}
        </Button>
      </div>
    </div>
  );
}
