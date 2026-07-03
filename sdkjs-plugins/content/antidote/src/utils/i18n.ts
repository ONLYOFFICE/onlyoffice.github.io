/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

type Translations = Record<string, Record<string, string> | string>;

const DEFAULT_LANGUAGE = 'en-US';
const TRANSLATIONS_BASE_PATH = new URL('../translations', import.meta.url).href;

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
  console.log('Lang:', match);

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
  return normalizeLanguageCode(source);
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
