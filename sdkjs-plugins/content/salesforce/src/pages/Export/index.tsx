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

import {
  SourceStep,
  ObjectStep,
  MappingStep,
  useExport,
} from '@features/export';
import { useAuthentication } from '@features/authentication';

import { useTranslation } from '@hooks';

export function Export() {
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { isAuthenticated } = useAuthentication();

  const {
    step,
    loading,
    error,
    sheetData,
    objects,
    selectedObject,
    objectFields,
    operation,
    mappings,
    idColumn,
    result,
    loadSheetData,
    loadObjects,
    selectObject,
    setOperation,
    updateMapping,
    setIdColumn,
    submit,
    reset,
    goTo,
  } = useExport();

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
      case 'source':
        return (
          <>
            <SourceStep
              loading={loading}
              onLoadData={loadSheetData}
            />
            {error && <ErrorBox title={t('common.error')} message={error} />}
          </>
        );

      case 'object':
        return sheetData ? (
          <>
            <ObjectStep
              sheetData={sheetData}
              objects={objects}
              loading={loading}
              error={error}
              onLoadObjects={loadObjects}
              onSelect={selectObject}
              onBack={() => goTo('source')}
            />
            {error && <ErrorBox title={t('common.error')} message={error} />}
          </>
        ) : null;

      case 'mapping':
        return sheetData ? (
          <>
            <MappingStep
              objectName={selectedObject}
              fields={objectFields}
              mappings={mappings}
              operation={operation}
              idColumn={idColumn}
              headers={sheetData.headers}
              rowCount={sheetData.rows.length}
              loading={loading}
              canSubmit={mappings.some((m) => m.targetField)}
              onOperationChange={setOperation}
              onMappingChange={updateMapping}
              onIdColumnChange={setIdColumn}
              onBack={() => goTo('object')}
              onSubmit={submit}
            />
            {error && <ErrorBox title={t('common.error')} message={error} />}
          </>
        ) : null;

      case 'loading':
        return <LoadingIndicator message={t('export.exporting')} />;

      case 'success': {
        let message: string;
        if (result?.success) {
          message = t('export.export_completed_success_single');
        } else if (result?.successCount === 0) {
          message = t('export.export_with_errors_alt', {
            failed: result?.errorCount ?? 0,
          });
        } else {
          message = t('export.export_with_errors', {
            success: result?.successCount ?? 0,
            failed: result?.errorCount ?? 0,
          });
        }

        const errorMessages = (() => {
          if (!result?.errors?.length) return null;

          const grouped = result.errors.reduce((map, e) => {
            map.set(e.message, [...(map.get(e.message) || []), e.row]);
            return map;
          }, new Map<string, number[]>());

          return [...grouped].map(([msg, rows]) => {
            const label = rows.length === 1 ? t('export.row') : t('export.rows');
            const sorted = rows.sort((a, b) => a - b);
            const ranges = sorted.reduce<string[]>((acc, row, i) => {
              if (i === 0 || row !== sorted[i - 1] + 1) acc.push(String(row));
              else acc[acc.length - 1] = acc[acc.length - 1].split('-')[0] + '-' + row;
              return acc;
            }, []);
            return `${label} ${ranges.join(', ')}: ${msg}`;
          }).join('\n\n');
        })();

        return (
          <>
            <SuccessMessage
              message={message}
              actions={[
                { label: t('export.export_more'), onClick: reset },
              ]}
            />
            {errorMessages && (
              <ErrorBox
                title={t('export.salesforce_errors')}
                message={errorMessages}
              />
            )}
          </>
        );
      }

      default:
        return null;
    }
  };

  const isLoading = step === 'loading';
  const isSuccess = step === 'success';

  const getHeader = () => {
    if (isLoading) return null;
    if (isSuccess) return <Header title={t('export.title')} onBack={() => route('/')} />;
    return <Header title={t('export.title')} onBack={() => route('/')} />;
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
