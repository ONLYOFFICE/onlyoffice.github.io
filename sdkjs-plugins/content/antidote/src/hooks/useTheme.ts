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

import { useEffect } from 'preact/hooks';
import type { AscTheme } from 'onlyoffice-plugins-api';

const COLOR_REGEX = /^(#([0-9a-f]{3}){1,2}|rgba?\([^)]+\)|hsl\([^)]+\))$/i;
const DARK_KEYWORDS = ['dark', 'night', 'contrast'];

function isDark(name = '', type = ''): boolean {
  return DARK_KEYWORDS.some((keyword) => name.includes(keyword) || type.includes(keyword));
}

function getThemeClasses(type = '', name = ''): string[] {
  const classes = [];

  if (name) classes.push(name);
  else if (type) classes.push(`theme-${type}`);

  if (type) classes.push(`theme-type-${type}`);
  if (!name) classes.push(isDark(name, type) ? 'theme-dark' : 'theme-light');

  return classes;
}

function applyThemeClasses(type: string, name: string): void {
  const newClasses = getThemeClasses(type, name);

  const { body } = document;
  if (!body) return;

  Array.from(body.classList)
    .filter((cls) => cls.startsWith('theme-'))
    .forEach((cls) => body.classList.remove(cls));

  newClasses.forEach((cls) => body.classList.add(cls));
}

function applyThemeVariables(theme: AscTheme): void {
  document.getElementById('theme-variables')?.remove();

  const vars = Object.entries(theme)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string' && COLOR_REGEX.test(entry[1]))
    .map(([key, value]) => {
      const cssKey = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return `  ${cssKey}: ${value};`;
    });

  if (vars.length === 0) return;

  const style = document.createElement('style');
  style.id = 'theme-variables';
  style.textContent = `:root {\n${vars.join('\n')}\n}`;
  document.head.appendChild(style);
}

function applyTheme(theme: AscTheme): void {
  applyThemeClasses(theme.type, theme.name);
  applyThemeVariables(theme);
}

export function useTheme(): void {
  useEffect(() => {
    const plugin = window.Asc?.plugin;
    if (!plugin) return undefined;

    const handler = (theme: AscTheme) => {
      plugin.onThemeChangedBase?.(theme);
      applyTheme(theme);
    };

    plugin.onThemeChanged = handler;

    if (plugin.info?.theme) {
      applyTheme(plugin.info.theme);
    }

    return () => {
      plugin.onThemeChanged = () => {};
    };
  }, []);
}
