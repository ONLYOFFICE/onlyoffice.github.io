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

import { Button, ErrorBox } from '@components';

import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from '@hooks';

import { registerModal } from '@store/modal';
import { SOQL_STORAGE_KEYS as STORAGE_KEYS } from '@utils/keys';

import './soql.css';

const PLACEHOLDER = 'SELECT Id, Name FROM Account LIMIT 10';

const closeModal = () => {
  localStorage.setItem(STORAGE_KEYS.cancel, 'true');
  if (window.Asc?.plugin?.button) window.Asc.plugin.button(1);
};

interface SoqlEditorProps {
  params: URLSearchParams;
}

export function SoqlEditor({ params }: SoqlEditorProps) {
  const { t } = useTranslation();

  const [query, setQuery] = useState(params.get('query') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmMessage, setConfirmMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.query, query);
  }, [query]);

  useEffect(() => {
    if (!isLoading) return;

    const poll = setInterval(() => {
      const result = localStorage.getItem(STORAGE_KEYS.result);
      if (!result) return;

      localStorage.removeItem(STORAGE_KEYS.result);
      const { success, error, cancelled } = JSON.parse(result);

      if (success) {
        closeModal();
      } else if (cancelled) {
        const msg = localStorage.getItem(STORAGE_KEYS.confirm);
        if (msg) {
          localStorage.removeItem(STORAGE_KEYS.confirm);
          setConfirmMessage(msg);
        }

        setIsLoading(false);
      } else {
        setError(error || t('errors.generic'));
        setIsLoading(false);
      }
    }, 100);

    return () => clearInterval(poll);
  }, [isLoading]);

  const handleExecute = () => {
    setError(null);
    setIsLoading(true);
    localStorage.setItem(STORAGE_KEYS.execute, 'true');
  };

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEYS.confirmed, 'true');
    setConfirmMessage(null);
    setIsLoading(true);
    localStorage.setItem(STORAGE_KEYS.execute, 'true');
  };

  const handleCancelConfirm = () => {
    setConfirmMessage(null);
  };

  if (confirmMessage) {
    return (
      <div className="soql">
        <div className="soql__content">
          <p className="soql__confirmation-message">{confirmMessage}</p>
        </div>
        <hr className="soql__divider" />
        <div className="soql__buttons">
          <Button variant="primary" onClick={handleConfirm}>{t('import.replace')}</Button>
          <Button variant="secondary" onClick={handleCancelConfirm}>{t('common.cancel')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="soql">
      <div className="soql__content">
        <div className="soql__label">{t('import.enter_soql')}</div>
        <textarea
          className="soql__textarea"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLTextAreaElement).value)}
          placeholder={PLACEHOLDER}
          disabled={isLoading}
        />
        {error && (
        <ErrorBox
          title={t('common.error')}
          message={t('errors.check_data_and_retry')}
        />
        )}
      </div>
      <hr className="soql__divider" />
      <div className="soql__buttons">
        <Button variant="primary" onClick={handleExecute} disabled={isLoading || !query.trim()}>
          {isLoading ? t('import.executing') : t('import.execute')}
        </Button>
        <Button variant="secondary" onClick={closeModal} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  );
}

registerModal('soql-editor', SoqlEditor);
