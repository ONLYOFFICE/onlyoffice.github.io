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

type Translations = Record<string, Record<string, string> | string>;

const DEFAULT_LANGUAGE = 'en-US';
const TRANSLATIONS_BASE_PATH = './translations';

let supportedLanguages: string[] = [DEFAULT_LANGUAGE];
let currentLanguage = DEFAULT_LANGUAGE;
let translations: Translations = {};

async function loadSupportedLanguages(): Promise<void> {
  try {
    const response = await fetch(`${TRANSLATIONS_BASE_PATH}/langs.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    supportedLanguages = await response.json();
  } catch (error) {
    console.error('Failed to load langs.json:', error);
    supportedLanguages = [DEFAULT_LANGUAGE];
  }
}

export async function loadTranslations(lang: string): Promise<void> {
  try {
    const response = await fetch(`${TRANSLATIONS_BASE_PATH}/${lang}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    translations = await response.json();
    currentLanguage = lang;
  } catch (error) {
    console.error(`Failed to load ${lang}:`, error);
    if (lang !== DEFAULT_LANGUAGE) {
      await loadTranslations(DEFAULT_LANGUAGE);
    }
  }
}

export function t(key: string, interpolations?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: Translations | string = translations;

  for (const k of keys) {
    if (typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  if (typeof value !== 'string') return key;

  if (interpolations) {
    return Object.entries(interpolations).reduce(
      (str, [k, v]) => str.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
      value,
    );
  }

  return value;
}

export function getCurrentLanguage(): string {
  return currentLanguage;
}

function normalizeLanguageCode(lang: string): string {
  if (!lang) return DEFAULT_LANGUAGE;

  const normalized = lang.toLowerCase().trim();
  const base = normalized.split('-')[0];

  const match = supportedLanguages.find((supported) => supported.toLowerCase().startsWith(base));

  return match || DEFAULT_LANGUAGE;
}

function detectLanguageSource(): string {
  const editorLang = window.Asc?.plugin?.info?.lang;
  if (editorLang && editorLang !== 'en-EN') {
    return editorLang;
  }

  const htmlLang = document.documentElement.lang;
  if (htmlLang && htmlLang !== 'en') {
    return htmlLang;
  }

  return navigator.language || navigator.languages?.[0] || DEFAULT_LANGUAGE;
}

export function detectLanguage(): string {
  const source = detectLanguageSource();
  const normalized = normalizeLanguageCode(source);
  return normalized;
}

async function waitForPlugin(maxAttempts: number, delay: number): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    if (window.Asc?.plugin?.info) return true;
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), delay);
    });
  }
  return false;
}

export async function initI18n(): Promise<void> {
  await loadSupportedLanguages();
  await waitForPlugin(20, 100);
  const lang = detectLanguage();
  await loadTranslations(lang);
}
