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

import { Button, Label } from '@components';
import { useAuthentication } from '@features/authentication';

import { useTranslation } from '@hooks';

import { openGuide } from '@utils';

import './main.css';

interface OperationProps {
  title: string;
  description: string;
  onClick: () => void;
}

function Operation({ title, description, onClick }: OperationProps) {
  return (
    <div className="main-page__operation" onClick={onClick} role="button" tabIndex={0}>
      <div className="main-page__operation-content">
        <p className="main-page__operation-title">{title}</p>
        <p className="main-page__operation-description">{description}</p>
      </div>
      <span className="main-page__operation-arrow">›</span>
    </div>
  );
}

export function Main() {
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated.value) route('/login');
  }, [route, isAuthenticated.value]);

  if (!isReady) {
    return (
      <div className="main-page page-enter">
        <div className="main-page__content" />
      </div>
    );
  }

  return (
    <div className="main-page page-enter">
      <div className="main-page__content">
        <div className="main-page__label">
          <Label>{t('main.select_operation')}</Label>
        </div>

        <div className="main-page__operations">
          <Operation
            title={t('main.reports')}
            description={t('main.reports_description')}
            onClick={() => route('/reports')}
          />
          <Operation
            title={t('main.import')}
            description={t('main.import_description')}
            onClick={() => route('/import')}
          />
          <Operation
            title={t('main.export')}
            description={t('main.export_description')}
            onClick={() => route('/export')}
          />
        </div>
      </div>

      <div className="main-page__footer">
        <Button variant="link" onClick={() => route('/settings')}>
          {t('settings.configure_plugin')}
        </Button>
        <Button variant="link" onClick={openGuide}>
          {t('common.open_guide')}
        </Button>
      </div>
    </div>
  );
}
