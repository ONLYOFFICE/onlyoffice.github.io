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

import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Layout, Header, Footer, LoadingIndicator, SuccessMessage, ErrorBox, PageTransition,
} from '@components';
import { ReportForm, useReports } from '@features/reports';
import { useAuthentication } from '@features/authentication';

import { useTranslation } from '@hooks';

export function Reports() {
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { isAuthenticated } = useAuthentication();

  const {
    loading,
    error,
    step,
    search,
    setSearch,
    reports,
    selected,
    showDropdown,
    canSubmit,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    target,
    setTarget,
    select,
    focus,
    blur,
    submit,
    reset,
  } = useReports();

  useEffect(() => {
    if (!isAuthenticated.value) route('/login');
  }, [route, isAuthenticated.value]);

  if (!isReady) {
    return (
      <Layout
        header={<Header title="" onBack={() => route('/')} />}
        footer={<Footer onConfigure={() => route('/settings')} />}
      >
        {null}
      </Layout>
    );
  }

  const renderContent = () => {
    switch (step) {
      case 'select':
        return (
          <>
            <ReportForm
              search={search}
              onSearchChange={setSearch}
              reports={reports}
              selected={selected}
              onSelect={select}
              showDropdown={showDropdown}
              onFocus={focus}
              onBlur={blur}
              loading={loading}
              showFilters={showFilters}
              onShowFiltersChange={setShowFilters}
              filters={filters}
              onFiltersChange={setFilters}
              target={target}
              onTargetChange={setTarget}
              canSubmit={canSubmit}
              onSubmit={submit}
            />
            {error && <ErrorBox />}
          </>
        );

      case 'loading':
        return (
          <LoadingIndicator message={t('common.loading')} />
        );

      case 'success':
        return (
          <SuccessMessage
            message={t('reports.import_completed_success')}
            actions={[
              { label: t('common.reload'), onClick: submit },
              { label: t('reports.import_new_report'), onClick: reset },
            ]}
          />
        );

      default:
        return null;
    }
  };

  const isLoading = step === 'loading';
  const isSuccess = step === 'success';

  const getHeader = () => {
    if (isLoading) return null;
    if (isSuccess) return <Header title="" onBack={() => route('/')} />;
    return <Header title={t('reports.title')} onBack={() => route('/')} />;
  };

  return (
    <Layout
      header={getHeader()}
      footer={isLoading ? null : <Footer onConfigure={() => route('/settings')} />}
    >
      <PageTransition step={step}>
        {renderContent()}
      </PageTransition>
    </Layout>
  );
}
