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

import { useTranslation } from '@hooks';

import './loading.css';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({ message }: LoadingIndicatorProps) {
  const { t, isReady } = useTranslation();

  return (
    <div className="loading-state">
      <p className="loading-state__message">
        {isReady ? t('common.loading_warning') : 'Please do not close the plugin panel.'}
      </p>
      <div className="loading-state__indicator">
        <span className="loading-state__spinner" />
        <span className="loading-state__text">{message || (isReady ? t('common.loading') : 'Loading...')}</span>
      </div>
    </div>
  );
}
