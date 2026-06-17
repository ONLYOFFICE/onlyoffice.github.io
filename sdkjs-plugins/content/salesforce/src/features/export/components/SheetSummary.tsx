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

import type { SheetData } from '@api/spreadsheet';

import './object.css';

interface SheetSummaryProps {
  sheetData: SheetData;
  maxHeaders?: number;
}

export function SheetSummary({ sheetData, maxHeaders = 3 }: SheetSummaryProps) {
  const { t } = useTranslation();

  const { headers, rows } = sheetData;
  const headerPreview = headers.slice(0, maxHeaders).join(', ');
  const hasMore = headers.length > maxHeaders;

  return (
    <dl className="sheet-info">
      <div className="sheet-info__row">
        <dt className="sheet-info__label">
          {t('export.columns')}
          :
        </dt>
        <dd className="sheet-info__value">{headers.length}</dd>
      </div>
      <div className="sheet-info__row">
        <dt className="sheet-info__label">
          {t('export.rows')}
          :
        </dt>
        <dd className="sheet-info__value">{rows.length}</dd>
      </div>
      <div className="sheet-info__row">
        <dt className="sheet-info__label">
          {t('export.headers')}
          :
        </dt>
        <dd className="sheet-info__value">
          {headerPreview}
          {hasMore && '...'}
        </dd>
      </div>
    </dl>
  );
}
