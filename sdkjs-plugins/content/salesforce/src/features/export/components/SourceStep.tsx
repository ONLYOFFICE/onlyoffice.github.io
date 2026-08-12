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

import { Button, Paragraph } from '@components';

import { useTranslation, useHasSelection } from '@hooks';

import './source.css';

interface SourceStepProps {
  loading: boolean;
  onLoadData: () => void;
}

export function SourceStep({ loading, onLoadData }: SourceStepProps) {
  const { t } = useTranslation();
  const hasSelection = useHasSelection();

  return (
    <div className="source-step">
      <div className="source-step__content">
        <Paragraph className="source-step__paragraph">
          {t('export.select_source_data_desc')}
        </Paragraph>
        <Paragraph className="source-step__paragraph">
          {t('export.first_row_headers_desc')}
        </Paragraph>
      </div>

      <div className="source-step__actions">
        <Button
          variant="primary"
          fullWidth
          onClick={onLoadData}
          disabled={loading || !hasSelection}
        >
          {loading ? t('common.loading') : t('export.load_data')}
        </Button>
      </div>
    </div>
  );
}
