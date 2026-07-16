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

import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import {
  Layout, LoadingIndicator, ErrorBox, Button,
} from '@components';

import { usePluginReady, useTranslation, useTheme } from '@hooks';

import { Main } from '@pages/Main';
import { Settings } from '@pages/Settings';
import { Warning } from '@pages/Warning';

import './variables.css';

// Warning PluginWindows reuse this bundle; modal selects the page and its message arrives separately.
const modalName = new URLSearchParams(window.location.search).get('modal');

function PluginReadyGuard({ children }: { children: preact.ComponentChildren }) {
  const { ready, error } = usePluginReady();
  const { t } = useTranslation();

  useTheme();

  if (error) {
    return (
      <Layout header={null} footer={null}>
        <ErrorBox title={t('Error')} message={error} />
        <div style={{ marginTop: '16px' }}>
          <Button variant="primary" fullWidth onClick={() => window.location.reload()}>
            {t('Reload')}
          </Button>
        </div>
      </Layout>
    );
  }

  if (!ready) {
    const message = `${t('Loading')}…`;
    return (
      <Layout header={null} footer={null}>
        <LoadingIndicator message={message} />
      </Layout>
    );
  }

  return <>{children}</>;
}

function ModalApp() {
  useTheme();

  if (modalName === 'warning') return <Warning />;
  return null;
}

export function App() {
  if (modalName) return <ModalApp />;

  return (
    <PluginReadyGuard>
      <LocationProvider>
        <Router>
          <Route path="/" component={Main} />
          <Route path="/settings" component={Settings} />
          <Route default component={Main} />
        </Router>
      </LocationProvider>
    </PluginReadyGuard>
  );
}

render(<App />, document.getElementById('app'));
