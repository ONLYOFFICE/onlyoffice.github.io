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
import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Layout, Header, Footer, Button, TextField,
} from '@components';
import { useTranslation } from '@hooks';
import { manualPort, setManualPort } from '@features/correction';
import { discoveredPort } from '@api/antidote';

export function Settings(): JSX.Element {
  const { t } = useTranslation();
  const { route, query } = useLocation();
  // No manual override yet? Prefill with the port auto-discovery already found, so the field reads
  // as if the user had typed it in themselves rather than showing blank while a port is in use.
  const effectivePort = manualPort.value ?? discoveredPort.value;
  const [value, setValue] = useState(effectivePort ? String(effectivePort) : '');
  const [placeholder, setPlaceholder] = useState(effectivePort ? String(effectivePort) : '59004');

  const save = () => {
    const port = Number(value.trim());
    setManualPort(Number.isFinite(port) && port > 0 ? port : null);
    route('/');
  };

  const clear = () => {
    setValue('');
    setManualPort(null);
  };

  if (query.reason === 'connectionError') {
    if (discoveredPort.value) {
      setPlaceholder(String(discoveredPort.value));
      setManualPort(discoveredPort.value);
      setValue('');
    }
  }

  return (
    <Layout
      header={<Header title={t('Settings')} />}
      footer={<Footer />}
    >
      <div className="antidote-section">
        <TextField
          label={t('Connectix WebSocket port')}
          caption={t('Leave empty to auto-detect. Find the port by running "AgentConnectixConsole --api".')}
          value={value}
          placeholder={placeholder}
          clearable
          clearLabel={t('Clear')}
          onInput={setValue}
          onEnter={save}
          onClear={clear}
        />
        <div className="antidote-lookup-row">
          <Button variant="primary" onClick={save}>{t('Save')}</Button>
          <Button
            fullWidth
            onClick={() => route('/')}
            title={t('Back')}
          >
            {t('Back')}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
