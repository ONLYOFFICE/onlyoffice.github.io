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

import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Button, Label, Select, Paragraph,
} from '@components';
import { useAuthentication, openSalesforceAuth } from '@features/authentication';

import { useTranslation } from '@hooks';

import { openGuide } from '@utils';

import './login.css';

type Environment = 'production' | 'sandbox';

export function Login() {
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { authenticate } = useAuthentication();

  const [environment, setEnvironment] = useState<Environment>('production');
  const [clientId, setClientId] = useState(() => localStorage.getItem('salesforce_client_id') ?? '');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'salesforce_auth' && event.data.params) {
        if (event.data.redirectUri) {
          localStorage.setItem('salesforce_redirect_uri', event.data.redirectUri);
        }
        authenticate({ ...event.data.params });
        route('/');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleClientIdChange = (e: Event) => {
    const { value } = e.target as HTMLInputElement;
    setClientId(value);
    localStorage.setItem('salesforce_client_id', value);
  };

  const handleAuthorize = () => {
    if (!clientId.trim()) return;
    openSalesforceAuth(clientId.trim(), environment);
  };

  if (!isReady) {
    return (
      <div className="login-page page-enter">
        <div className="login-page__content" />
      </div>
    );
  }

  return (
    <div className="login-page page-enter">
      <div className="login-page__content">
        <div className="login-page__spacing">
          <Paragraph>{t('auth.please_login')}</Paragraph>
        </div>

        <div className="login-page__label-spacing">
          <Label>
            {t('auth.client_id')}
            :
          </Label>
        </div>
        <div className="login-page__spacing">
          <input
            className="login-page__input"
            type="text"
            value={clientId}
            onInput={handleClientIdChange}
            placeholder={t('auth.client_id_placeholder')}
          />
        </div>

        <div className="login-page__label-spacing">
          <Label>
            {t('auth.environment')}
            :
          </Label>
        </div>
        <div className="login-page__spacing">
          <Select
            options={[
              { value: 'production', label: t('auth.production') },
              { value: 'sandbox', label: t('auth.sandbox') },
            ]}
            value={environment}
            onChange={(value) => setEnvironment(value as Environment)}
          />
        </div>

        <div className="login-page__spacing">
          <Paragraph>{t('auth.authorize_description')}</Paragraph>
        </div>

        <Button variant="primary" fullWidth onClick={handleAuthorize} disabled={!clientId.trim()}>
          {t('auth.login')}
        </Button>
      </div>

      <div className="login-page__footer">
        <Button variant="link" onClick={openGuide}>
          {t('common.open_guide')}
        </Button>
      </div>
    </div>
  );
}
