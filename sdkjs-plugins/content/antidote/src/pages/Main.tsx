/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

import { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Layout, Header, Footer, Button, TextField, StatusBanner,
} from '@components';
import { useHasSelection, useTranslation } from '@hooks';
import { useCorrection, CorrectionScope } from '@features/correction';
import { useLookup, LookupTool } from '@features/lookup';

function statusTone(state: ReturnType<typeof useCorrection>['connectionState']['value']) {
  if (state === 'connected') return 'success' as const;
  if (state === 'connecting') return 'pending' as const;
  if (state === 'error') return 'error' as const;
  return 'idle' as const;
}

export function Main(): JSX.Element {
  const { t } = useTranslation();
  const { route } = useLocation();
  const hasSelection = useHasSelection();
  const {
    connectionState, scope, errorMessage, check, stop,
  } = useCorrection();
  const { open: openLookup, error: lookupError } = useLookup();

  const [lookupText, setLookupText] = useState('');

  const editorType = window.Asc?.plugin?.info?.editorType;
  const canCheckWholeDocument = editorType === 'word';

  useEffect(() => {
    if (canCheckWholeDocument && !hasSelection) scope.value = 'document';
    else scope.value = 'selection';
  }, [hasSelection, canCheckWholeDocument]);

  const statusMessage = connectionState.value === 'error'
    ? (errorMessage.value ?? t('correction.errors.unknown'))
    : t(`correction.status.${connectionState.value}`);

  const handleScopeChange = (nextScope: CorrectionScope) => {
    if (connectionState.value === 'connecting') return;
    scope.value = nextScope;
  };

  const handleLookup = (tool: LookupTool) => {
    if (!lookupText.trim()) return;
    openLookup(tool, lookupText.trim());
  };

  return (
    <Layout
      header={<Header title={t('main.title')} onSettings={() => route('/settings')} />}
      footer={<Footer />}
    >
      <StatusBanner tone={statusTone(connectionState.value)} message={statusMessage} />

      <div class="antidote-section">
        <div class="antidote-section__title">{t('main.scopeTitle')}</div>
        <div class="antidote-scope-toggle">
          {canCheckWholeDocument && (
            <Button
              variant={scope.value === 'document' ? 'primary' : 'secondary'}
              onClick={() => handleScopeChange('document')}
            >
              {t('main.scope.document')}
            </Button>
          )}
          <Button
            variant={scope.value === 'selection' ? 'primary' : 'secondary'}
            onClick={() => handleScopeChange('selection')}
          >
            {t('main.scope.selection')}
          </Button>
        </div>

        {connectionState.value === 'connected' ? (
          <Button fullWidth onClick={stop}>{t('main.stop')}</Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={connectionState.value === 'connecting'}
            onClick={() => check(scope.value)}
          >
            {t('main.check')}
          </Button>
        )}
      </div>

      <div class="antidote-section">
        <div class="antidote-section__title">{t('main.lookup.title')}</div>
        <div class="antidote-lookup-row">
          <TextField
            value={lookupText}
            placeholder={t('main.lookup.placeholder')}
            onInput={setLookupText}
            onEnter={() => handleLookup('dictionaries')}
          />
        </div>
        <div class="antidote-lookup-row" style={{ marginTop: '8px' }}>
          <Button onClick={() => handleLookup('dictionaries')}>{t('main.lookup.dictionaries')}</Button>
          <Button onClick={() => handleLookup('guides')}>{t('main.lookup.guides')}</Button>
        </div>
        {lookupError && <StatusBanner tone="error" message={lookupError} />}
      </div>
    </Layout>
  );
}
