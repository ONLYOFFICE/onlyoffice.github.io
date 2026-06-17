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

import { render } from 'preact';
import {
  LocationProvider, Router, Route, useLocation,
} from 'preact-iso';

import {
  Layout, Header, Footer, LoadingIndicator, ErrorBox, Button,
} from '@components';
import { AuthenticationProvider } from '@features/authentication';

import { AuthGuard } from '@store/guard';
import { ModalStore, ModalRenderer } from '@store/modal';

import { usePluginReady, useTranslation, useTheme } from '@hooks';

import { Main } from '@pages/Main';
import { Login } from '@pages/Login';
import { Import } from '@pages/Import';
import { Export } from '@pages/Export';
import { Reports } from '@pages/Reports';
import { Settings } from '@pages/Settings';
import { DesktopPlaceholder } from '@pages/DesktopPlaceholder';

import { isDesktop } from '@utils';

import '@components/modal/confirmation/Confirmation';
import '@components/modal/soql/SoqlEditor';

import './variables.css';
import './styles/themes.css';

const isModalMode = new URLSearchParams(window.location.search).has('modal');

function PluginReadyGuard({ children }: { children: preact.ComponentChildren }) {
  const { route } = useLocation();
  const { ready, error } = usePluginReady();
  const { t, isReady: translationsReady } = useTranslation();

  useTheme();

  if (error) {
    return (
      <Layout
        header={<Header title={t('common.error')} onBack={() => route('/')} />}
        footer={<Footer onConfigure={() => route('/settings')} />}
      >
        <ErrorBox title={t('common.error')} message={error} />
        <div style={{ marginTop: '16px' }}>
          <Button variant="primary" fullWidth onClick={() => window.location.reload()}>
            {t('common.reload')}
          </Button>
        </div>
      </Layout>
    );
  }

  if (!ready) {
    const message = translationsReady
      ? t('common.initializing_plugin')
      : 'Initializing plugin...';
    return (
      <Layout
        header={null}
        footer={null}
      >
        <LoadingIndicator message={message} />
      </Layout>
    );
  }

  return <>{children}</>;
}

export function App() {
  return (
    <ModalStore>
      {isModalMode ? (
        <ModalRenderer />
      ) : (
        <PluginReadyGuard>
          <AuthenticationProvider>
            <LocationProvider>
              <AuthGuard>
                <Router>
                  <Route path="/" component={Main} />
                  <Route path="/login" component={Login} />
                  <Route path="/import" component={Import} />
                  <Route path="/export" component={Export} />
                  <Route path="/reports" component={Reports} />
                  <Route path="/settings" component={Settings} />
                  <Route default component={Main} />
                </Router>
              </AuthGuard>
            </LocationProvider>
          </AuthenticationProvider>
        </PluginReadyGuard>
      )}
    </ModalStore>
  );
}

render(isDesktop ? <DesktopPlaceholder /> : <App />, document.getElementById('app')!);
