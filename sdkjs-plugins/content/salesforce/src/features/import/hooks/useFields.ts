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
  useState, useEffect, useMemo, useCallback,
} from 'preact/hooks';

import { useAuthentication } from '@features/authentication';

import { useAbortSignal } from '@hooks';
import { describeObject, type SalesforceField } from '@api/salesforce';

export interface PrefixedField extends SalesforceField {
  objectName: string;
  prefixedName: string;
}

export interface UseFieldsResult {
  fields: PrefixedField[];
  selected: string[];
  loading: boolean;
  error: string | null;
  toggle: (prefixedName: string) => void;
  setSelectedFields: (values: string[]) => void;
  selectAll: () => void;
  clearAll: () => void;
  reset: () => void;
  getFieldByPrefixedName: (prefixedName: string) => PrefixedField | undefined;
  getFieldsByObject: (objectName: string) => PrefixedField[];
}

export function useFields(objects: string[]): UseFieldsResult {
  const { state, isAuthenticated } = useAuthentication();
  const objectsKey = objects.join(',');
  const signal = useAbortSignal([objectsKey, state.value, isAuthenticated.value]);

  const [fieldsByObject, setFieldsByObject] = useState<Record<string, SalesforceField[]>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (objects.length === 0 || !isAuthenticated.value) {
      setFieldsByObject({});
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);

      const { access_token, instance_url } = state.value;
      const results: Record<string, SalesforceField[]> = {};
      const errors: string[] = [];

      await Promise.all(
        objects.map(async (objectName) => {
          const res = await describeObject(instance_url, access_token, objectName, { signal });
          if (signal.aborted) return;

          if (res.data) {
            results[objectName] = res.data.fields;
          }
          if (res.error && !res.error.aborted) {
            errors.push(`${objectName}: ${res.error.message}`);
          }
        }),
      );

      if (signal.aborted) return;

      setFieldsByObject(results);
      if (errors.length > 0) {
        setError(errors.join('; '));
      }
      setLoading(false);
    };

    load();
  }, [objectsKey, state.value, isAuthenticated.value]);

  useEffect(() => {
    setSelected([]);
  }, [objectsKey]);

  const fields = useMemo<PrefixedField[]>(() => objects.flatMap((objectName) => {
    const objectFields = fieldsByObject[objectName] || [];
    return objectFields.map((field) => ({
      ...field,
      objectName,
      prefixedName: `${objectName}::${field.name}`,
    }));
  }), [objects, fieldsByObject]);

  const toggle = useCallback((prefixedName: string) => {
    setSelected((prev) => (prev.includes(prefixedName)
      ? prev.filter((f) => f !== prefixedName)
      : [...prev, prefixedName]));
  }, []);

  const setSelectedFields = useCallback((values: string[]) => setSelected(values), []);
  const selectAll = useCallback(() => setSelected(fields.map((f) => f.prefixedName)), [fields]);
  const clearAll = useCallback(() => setSelected([]), []);
  const reset = clearAll;

  const getFieldByPrefixedName = useCallback(
    (prefixedName: string) => fields.find((f) => f.prefixedName === prefixedName),
    [fields],
  );

  const getFieldsByObject = useCallback(
    (objectName: string) => fields.filter((f) => f.objectName === objectName),
    [fields],
  );

  return {
    fields,
    selected,
    toggle,
    setSelectedFields,
    selectAll,
    clearAll,
    loading,
    error,
    reset,
    getFieldByPrefixedName,
    getFieldsByObject,
  };
}
