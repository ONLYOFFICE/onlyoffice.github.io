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

import { Button } from '@components';

import { useTranslation } from '@hooks';

import './success.css';

interface SuccessAction {
  label: string;
  onClick: () => void;
}

interface SuccessMessageProps {
  message?: string;
  actions: SuccessAction[];
}

export function SuccessMessage({
  message,
  actions,
}: SuccessMessageProps) {
  const { t } = useTranslation();

  const displayMessage = message || t('common.success');

  return (
    <div className="success-state">
      <p className="success-state__title">{displayMessage}</p>
      <div className="success-state__actions">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="secondary"
            fullWidth
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
