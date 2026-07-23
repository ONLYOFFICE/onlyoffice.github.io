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

import { registerModal } from '@store/modal';

import './confirmation.css';

interface ConfirmationProps {
  params: URLSearchParams;
}

export function Confirmation({ params }: ConfirmationProps) {
  const { t } = useTranslation();

  const message = params.get('message') || t('common.are_you_sure');

  return (
    <div className="confirmation">
      <p className="confirmation__message">{message}</p>
    </div>
  );
}

registerModal('confirmation', Confirmation);
