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

import { useState, useEffect } from 'preact/hooks';

import { useAuthentication } from '@features/authentication';

import { useAbortSignal, useTranslation } from '@hooks';
import { fetchObjects, type SalesforceObject } from '@api/salesforce';

const MAX_OBJECTS = 5;

export interface UseObjectsResult {
  objects: SalesforceObject[];
  selectedObjects: string[];
  loading: boolean;
  error: string | null;
  validationError: string | null;
  toggleObject: (value: string) => void;
  reset: () => void;
}

export function useObjects(): UseObjectsResult {
  const { t } = useTranslation();
  const { state, isAuthenticated } = useAuthentication();

  const signal = useAbortSignal([state.value, isAuthenticated.value]);

  const [objects, setObjects] = useState<SalesforceObject[]>([]);
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated.value) return;

    const load = async () => {
      setLoading(true);
      setError(null);

      const { access_token, instance_url } = state.value;
      const res = await fetchObjects(instance_url, access_token, { signal });

      if (signal.aborted) return;

      if (res.data) {
        setObjects(
          res.data.sobjects
            .filter((o) => o.queryable)
            .sort((a, b) => a.label.localeCompare(b.label)),
        );
      }

      if (res.error && !res.error.aborted) setError(res.error.message);
      setLoading(false);
    };

    load();
  }, [state.value, isAuthenticated.value]);

  const toggleObject = (value: string) => {
    setSelectedObjects((prev) => {
      const isSelected = prev.includes(value);

      if (isSelected) {
        const newSelection = prev.filter((v) => v !== value);
        if (newSelection.length <= MAX_OBJECTS) setValidationError(null);
        else setValidationError(t('import.max_objects_warning', { max: MAX_OBJECTS }));

        return newSelection;
      }

      const newSelection = [...prev, value];

      if (newSelection.length > MAX_OBJECTS) {
        setValidationError(t('import.max_objects_warning', { max: MAX_OBJECTS }));
      } else {
        setValidationError(null);
      }

      return newSelection;
    });
  };

  const reset = () => {
    setSelectedObjects([]);
    setValidationError(null);
  };

  return {
    objects, selectedObjects, toggleObject, loading, error, validationError, reset,
  };
}
