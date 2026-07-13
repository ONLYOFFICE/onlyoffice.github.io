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

import type { ComponentChildren } from 'preact';

import { useTranslation } from '@hooks';

import './mapping.css';

interface MappingTableProps {
  children: ComponentChildren;
}

export function MappingTable({ children }: MappingTableProps) {
  const { t } = useTranslation();

  return (
    <div className="mapping-step__table">
      <div className="mapping-step__table-header">
        <span>{t('export.column')}</span>
        <span>{t('export.salesforce_field')}</span>
      </div>
      <div className="mapping-step__table-body">
        {children}
      </div>
    </div>
  );
}
