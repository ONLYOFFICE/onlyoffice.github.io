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

import { Button, Label } from '@components';
import { SearchableSelect, FilterToggle, RadioGroup } from '@components/form';

import type {
  InsertTarget, SalesforceReport, ReportFilters, ReportSource,
} from '@features/reports/types';

import { useTranslation } from '@hooks';

import './report.css';

interface ReportFormProps {
  search: string;
  reports: SalesforceReport[];
  selected: SalesforceReport | null;
  showDropdown: boolean;
  loading: boolean;
  showFilters: boolean;
  filters: ReportFilters;
  target: InsertTarget | null;
  canSubmit: boolean;
  onSearchChange: (value: string) => void;
  onSelect: (report: SalesforceReport) => void;
  onFocus: () => void;
  onBlur: () => void;
  onShowFiltersChange: (show: boolean) => void;
  onFiltersChange: (filters: ReportFilters) => void;
  onTargetChange: (target: InsertTarget) => void;
  onSubmit: () => void;
}

export function ReportForm({
  search,
  reports,
  selected,
  showDropdown,
  loading,
  showFilters,
  filters,
  target,
  canSubmit,
  onSearchChange,
  onSelect,
  onFocus,
  onBlur,
  onShowFiltersChange,
  onFiltersChange,
  onTargetChange,
  onSubmit,
}: ReportFormProps) {
  const { t } = useTranslation();

  const targetOptions = useMemo(() => [
    { value: 'active' as const, label: t('reports.insert_to_active') },
    { value: 'new' as const, label: t('reports.insert_to_new') },
  ], [t]);

  const sourceOptions = useMemo(() => [
    { value: 'all' as const, label: t('reports.search_all') },
    { value: 'recent' as const, label: t('reports.use_recent') },
  ], [t]);

  const handleSourceChange = (value: string) => {
    onFiltersChange({ ...filters, source: value as ReportSource });
  };

  const handleCheckboxChange = (key: keyof ReportFilters) => (e: Event) => {
    const target = e.target as HTMLInputElement;
    onFiltersChange({ ...filters, [key]: target.checked });
  };

  const emptyMessage = useMemo(() => {
    if (loading) return undefined;
    return reports.length === 0 ? t('reports.no_reports_available') : undefined;
  }, [loading, reports.length, t]);

  return (
    <div>
      <SearchableSelect
        label={t('reports.enter_or_select_report')}
        placeholder={t('reports.enter_or_select_report')}
        value={search}
        onChange={onSearchChange}
        options={reports}
        selectedOption={selected}
        onSelect={onSelect}
        showDropdown={showDropdown}
        onFocus={onFocus}
        onBlur={onBlur}
        loading={loading}
        emptyMessage={emptyMessage}
      />

      <FilterToggle expanded={showFilters} onToggle={onShowFiltersChange}>
        <div className="report-form__filters">
          <RadioGroup
            label={t('reports.report_source')}
            value={filters.source || 'all'}
            onChange={handleSourceChange}
            options={sourceOptions}
            name="reportSource"
          />

          <div>
            <Label>{t('reports.additionally')}</Label>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.myReportsOnly}
                  onChange={handleCheckboxChange('myReportsOnly')}
                />
                {t('reports.show_only_my_reports')}
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.privateFolderOnly}
                  onChange={handleCheckboxChange('privateFolderOnly')}
                />
                {t('reports.private_folder_only')}
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.groupResults}
                  onChange={handleCheckboxChange('groupResults')}
                />
                {t('reports.group_results_if_possible')}
              </label>
            </div>
          </div>
        </div>
      </FilterToggle>

      <hr className="divider" />

      <RadioGroup
        label={t('reports.import_to')}
        value={target}
        onChange={onTargetChange}
        options={targetOptions}
        disabled={!selected}
      />

      <div className="button-group">
        <Button variant="primary" fullWidth onClick={onSubmit} disabled={!canSubmit}>
          {t('reports.get_data')}
        </Button>
      </div>
    </div>
  );
}
