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

import { useState, useEffect } from 'preact/hooks';

import { t as translate, getCurrentLanguage, initI18n } from '@utils/i18n';

interface UseTranslationResult {
  t: (key: string, interpolations?: Record<string, string | number>) => string;
  language: string;
  isReady: boolean;
}

let isInitialized = false;
let isInitializing = false;
let initPromise: Promise<void> | null = null;

export function useTranslation(): UseTranslationResult {
  const [isReady, setIsReady] = useState(isInitialized);
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    const init = async () => {
      if (isInitialized) {
        setLanguage(getCurrentLanguage());
        setIsReady(true);
        return;
      }

      if (isInitializing) {
        await initPromise;
        setLanguage(getCurrentLanguage());
        setIsReady(true);
        return;
      }

      isInitializing = true;
      initPromise = initI18n();
      try {
        await initPromise;
        isInitialized = true;
        setLanguage(getCurrentLanguage());
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setIsReady(true);
      } finally {
        isInitializing = false;
        initPromise = null;
      }
    };

    init();
  }, []);

  return {
    t: translate,
    language,
    isReady,
  };
}
