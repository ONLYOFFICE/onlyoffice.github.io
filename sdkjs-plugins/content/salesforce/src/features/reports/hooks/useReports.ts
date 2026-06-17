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

import { useState, useCallback } from 'preact/hooks';

import { useModals } from '@store/modal';

import { useReportSearch } from '@features/reports/hooks/useReportSearch';
import { useAuthentication } from '@features/authentication';
import { parseReport } from '@features/reports/utils';
import type { Step, InsertTarget } from '@features/reports/types';

import { useTranslation } from '@hooks';

import { insertWithHeaders } from '@api/spreadsheet';
import { executeReport } from '@api/salesforce';

export function useReports() {
  const { t } = useTranslation();
  const { state } = useAuthentication();
  const { confirm } = useModals();

  const searchHook = useReportSearch();

  const [step, setStep] = useState<Step>('select');
  const [resultCount, setResultCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [target, setTarget] = useState<InsertTarget | null>(null);

  const combinedError = error || searchHook.error;

  const execute = useCallback(async () => {
    if (!searchHook.selected || !target) return;

    setStep('loading');
    setError(null);

    const { access_token, instance_url } = state.value;
    const res = await executeReport(instance_url, access_token, searchHook.selected.id);

    if (res.error) {
      setError(res.error.message);
      setStep('select');
      return;
    }

    if (res.data) {
      try {
        const { headers, rows } = parseReport(res.data);
        setResultCount(rows.length);
        await insertWithHeaders(headers, rows, { target, sheetNamePrefix: 'Report' });
        setStep('success');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : t('common.unknown_error');
        setError(`${t('reports.failed_to_insert')}: ${errorMsg}`);
        setStep('select');
      }
    }
  }, [state.value, searchHook.selected, target, t]);

  const submit = useCallback(() => {
    if (!searchHook.selected || !target) return;

    confirm(
      {
        title: t('reports.title'),
        message: t('reports.replace_warning'),
        confirmText: t('reports.replace'),
      },
      execute,
    );
  }, [confirm, execute, searchHook.selected, target, t]);

  const reset = () => {
    searchHook.reset();
    setResultCount(0);
    setStep('select');
  };

  return {
    loading: searchHook.loading,
    error: combinedError,
    step,
    resultCount,

    search: searchHook.search,
    setSearch: searchHook.setSearch,
    reports: searchHook.reports,
    selected: searchHook.selected,
    showDropdown: searchHook.showDropdown,
    canSubmit: searchHook.selected !== null && target !== null,
    select: searchHook.select,
    focus: searchHook.focus,
    blur: searchHook.blur,

    filters: searchHook.filters,
    setFilters: searchHook.setFilters,

    showFilters,
    setShowFilters,
    target,
    setTarget,

    submit,
    reset,
  };
}

export type UseReportsResult = ReturnType<typeof useReports>;
