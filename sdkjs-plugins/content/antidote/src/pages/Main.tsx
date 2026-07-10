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
  Layout, Header, Footer, Button, TextField, RadioGroup, StatusBanner, IconButton,
} from '@components';
import { useHasSelection, useTranslation } from '@hooks';
import { useCorrection, CorrectionScope } from '@features/correction';
import { useLookup, LookupTool } from '@features/lookup';
import { warmUpPort } from '@api/antidote';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `scope` is a stable module-level signal, not state
  }, [hasSelection, canCheckWholeDocument]);

  useEffect(() => {
    warmUpPort();
  }, []);

  const statusMessage = connectionState.value === 'error'
    ? (errorMessage.value ?? t('correction.errors.unknown'))
    : t(`correction.status.${connectionState.value}`);

  const handleScopeChange = (nextScope: CorrectionScope) => {
    if (connectionState.value === 'connecting') return;
    scope.value = nextScope;
  };

  const scopeOptions = [
    ...(canCheckWholeDocument
      ? [{ value: 'document' as CorrectionScope, label: t('main.scope.document') }]
      : []),
    { value: 'selection' as CorrectionScope, label: t('main.scope.selection') },
  ];

  const handleLookup = (tool: LookupTool) => {
    openLookup(tool, lookupText);
  };

  return (
    <Layout
      header={<Header title={t('main.title')} />}
      footer={<Footer />}
    >
      <StatusBanner tone={statusTone(connectionState.value)} message={statusMessage} />

      <div className="antidote-section antidote-section--secondary" hidden={scopeOptions.length <= 1}>
        <div className="antidote-section__title">{t('main.scopeTitle')}</div>
        <RadioGroup
          name="scope"
          value={scope.value}
          options={scopeOptions}
          ariaLabel={t('main.scopeTitle')}
          disabled={connectionState.value === 'connecting'}
          onChange={handleScopeChange}
        />
      </div>

      <div className="antidote-tools">
        <div className="antidote-tools__row">
          {connectionState.value === 'connected' ? (
            <Button fullWidth onClick={stop}>{t('main.stop')}</Button>
          ) : (
            <Button
              variant="primary"
              fullWidth
              disabled={connectionState.value === 'connecting'}
              onClick={() => check(scope.value)}
              title={t('main.check_title')}
            >
              {t('main.check')}
            </Button>
          )}
          <IconButton ariaLabel="Settings" title={t('settings.title')} onClick={() => route('/settings')}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.07031 10C8.72717 10 10.0703 8.65685 10.0703 7C10.0703 5.34315 8.72717 4 7.07031 4C5.41346 4 4.07031 5.34315 4.07031 7C4.07031 8.65685 5.41346 10 7.07031 10ZM9.07031 7C9.07031 8.10457 8.17488 9 7.07031 9C5.96574 9 5.07031 8.10457 5.07031 7C5.07031 5.89543 5.96574 5 7.07031 5C8.17488 5 9.07031 5.89543 9.07031 7Z" fill="currentcolor" fillOpacity="0.8" />
              <path fillRule="evenodd" clipRule="evenodd" d="M12.4834 11.7324L13.9299 9.30047C14.0421 9.10329 14.0196 8.94992 13.8626 8.84038L12.3488 7.69014C12.3712 7.53678 12.3825 7.30673 12.3825 7C12.3825 6.69327 12.3712 6.46322 12.3488 6.30986L13.8626 5.15962C14.0196 5.05008 14.0421 4.89671 13.9299 4.69953L12.4834 2.26761C12.3937 2.11424 12.2479 2.07042 12.0461 2.13615L10.2631 2.82629C9.88186 2.54147 9.47817 2.31142 9.05206 2.13615L8.78294 0.295775C8.73809 0.0985915 8.62595 0 8.44654 0H5.55346C5.37405 0 5.26191 0.0985915 5.21706 0.295775L4.94794 2.13615C4.61153 2.26761 4.20785 2.49765 3.73688 2.82629L1.95394 2.13615C1.7521 2.07042 1.60633 2.11424 1.51662 2.26761L0.0700841 4.69953C-0.0420505 4.89671 -0.0196235 5.05008 0.137365 5.15962L1.65118 6.30986C1.62875 6.46322 1.61754 6.69327 1.61754 7C1.61754 7.30673 1.62875 7.53678 1.65118 7.69014L0.137365 8.84038C-0.0196235 8.94992 -0.0420505 9.10329 0.0700841 9.30047L1.51662 11.7324C1.60633 11.8858 1.7521 11.9296 1.95394 11.8638L3.73688 11.1737C4.11814 11.4585 4.52183 11.6886 4.94794 11.8638L5.21706 13.7042C5.26191 13.9014 5.37405 14 5.55346 14H8.44654C8.62595 14 8.73809 13.9014 8.78294 13.7042L9.05206 11.8638C9.38847 11.7324 9.79215 11.5023 10.2631 11.1737L12.0461 11.8638C12.2479 11.9296 12.3937 11.8858 12.4834 11.7324ZM11.3593 7.54545L11.274 8.12935L12.7816 9.2749L11.9107 10.7391L10.1275 10.0489L9.69087 10.3536C9.25147 10.6602 8.92091 10.8415 8.6881 10.9324L8.14669 11.144L7.87529 13H6.12472L5.85501 11.1557L5.32835 10.939C4.98235 10.7967 4.65163 10.6088 4.33537 10.3726L3.89201 10.0414L2.08935 10.7391L1.2184 9.2749L2.72604 8.12935L2.64066 7.54545C2.6291 7.46641 2.61754 7.2955 2.61754 7C2.61754 6.7045 2.6291 6.53359 2.64066 6.45455L2.72604 5.87065L1.2184 4.7251L2.08935 3.26086L3.87247 3.95107L4.30913 3.64637C4.74853 3.33976 5.07909 3.15854 5.3119 3.06756L5.85331 2.856L6.12472 1H7.87529L8.14499 2.84433L8.67165 3.06097C9.01765 3.20329 9.34837 3.39116 9.66463 3.62742L10.108 3.95864L11.9107 3.26086L12.7816 4.7251L11.274 5.87065L11.3593 6.45455C11.3709 6.53359 11.3825 6.7045 11.3825 7C11.3825 7.2955 11.3709 7.46641 11.3593 7.54545Z" fill="currentcolor" fillOpacity="0.8" />
            </svg>
          </IconButton>
        </div>
        <Button
          fullWidth
          onClick={() => handleLookup('dictionaries')}
          title={t('main.lookup.dictionaries_title')}
        >
          {t('main.lookup.dictionaries')}
        </Button>
        <Button
          fullWidth
          onClick={() => handleLookup('guides')}
          title={t('main.lookup.guides_title')}
        >
          {t('main.lookup.guides')}
        </Button>

      </div>
      {lookupError && <StatusBanner tone="error" message={lookupError} />}

      <div className="antidote-section antidote-section--secondary">
        <div className="antidote-section__title">{t('main.lookup.title')}</div>
        <TextField
          value={lookupText}
          placeholder={t('main.lookup.placeholder')}
          onInput={setLookupText}
          onEnter={() => handleLookup('dictionaries')}
        />
      </div>
    </Layout>
  );
}
