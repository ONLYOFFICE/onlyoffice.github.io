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
import type { SalesforceReport, ReportFilters } from '@features/reports/types';

import { useAbortSignal } from '@hooks';
import { fetchReports } from '@api/salesforce';

const DEFAULT_FILTERS: ReportFilters = {
  source: 'all',
  myReportsOnly: false,
  privateFolderOnly: false,
  groupResults: false,
};

const extractUserId = (url: string) => url?.split('/').pop() || null;

export interface UseReportSearchResult {
  reports: SalesforceReport[];
  search: string;
  selected: SalesforceReport | null;
  showDropdown: boolean;
  loading: boolean;
  error: string | null;
  filters: ReportFilters;
  setSearch: (value: string) => void;
  select: (report: SalesforceReport) => void;
  focus: () => void;
  blur: () => void;
  reset: () => void;
  setFilters: (filters: ReportFilters) => void;
  refetch: () => void;
}

export function useReportSearch(): UseReportSearchResult {
  const { state, isAuthenticated } = useAuthentication();

  const signal = useAbortSignal([state.value, isAuthenticated.value]);

  const [allReports, setAllReports] = useState<SalesforceReport[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<SalesforceReport | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ReportFilters>(DEFAULT_FILTERS);

  const userId = useMemo(() => extractUserId(state.value.id), [state.value.id]);

  const loadReports = useCallback(async () => {
    if (!isAuthenticated.value) return;

    setLoading(true);
    setError(null);

    const { access_token, instance_url } = state.value;
    const res = await fetchReports(instance_url, access_token, {
      signal,
      filters,
      userId: userId || undefined,
    });

    if (signal.aborted) return;

    if (res.data) setAllReports(res.data.sort((a, b) => a.name.localeCompare(b.name)));

    if (res.error && !res.error.aborted) setError(res.error.message);

    setLoading(false);
  }, [state.value, isAuthenticated.value, filters, userId, signal]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const reports = useMemo(() => {
    if (!search) return allReports;
    const query = search.toLowerCase();
    return allReports.filter((r) => r.name.toLowerCase().includes(query));
  }, [allReports, search]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setSelected(null);
    setShowDropdown(true);
  }, []);

  const handleSelect = useCallback((report: SalesforceReport) => {
    setSelected(report);
    setSearch(report.name);
    setShowDropdown(false);
  }, []);

  const handleFocus = useCallback(() => setShowDropdown(true), []);
  const handleBlur = useCallback(() => setTimeout(() => setShowDropdown(false), 200), []);

  const reset = useCallback(() => {
    setSelected(null);
    setSearch('');
  }, []);

  return {
    reports,
    search,
    setSearch: handleSearch,
    selected,
    select: handleSelect,
    showDropdown,
    focus: handleFocus,
    blur: handleBlur,
    loading,
    error,
    reset,
    filters,
    setFilters,
    refetch: loadReports,
  };
}
