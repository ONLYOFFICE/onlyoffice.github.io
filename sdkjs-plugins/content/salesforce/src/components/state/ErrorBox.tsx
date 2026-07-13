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

import alertIcon from '@resources/images/alert.svg';

import './error.css';

interface ErrorBoxProps {
  title?: string;
  message?: string;
}

export function ErrorBox({
  title,
  message,
}: ErrorBoxProps) {
  const { t } = useTranslation();

  const displayTitle = title || t('common.error');
  const displayMessage = message || t('errors.check_data_and_retry');

  return (
    <div className="error-box">
      <div className="error-box__header">
        <img
          src={alertIcon}
          alt=""
          className="error-box__icon"
        />
        <div className="error-box__title">{displayTitle}</div>
      </div>
      <div className="error-box__message">{displayMessage}</div>
    </div>
  );
}
