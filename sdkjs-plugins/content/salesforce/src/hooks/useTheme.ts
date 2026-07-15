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

import { useEffect } from 'preact/hooks';

interface Theme {
  type: 'light' | 'dark';
  name: string;
  [key: string]: string;
}

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

function applyThemeVariables(theme: Record<string, string>): void {
  document.getElementById('theme-variables')?.remove();

  const vars = Object.entries(theme)
    .filter(([, value]) => COLOR_REGEX.test(value))
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

function applyTheme(theme: Theme): void {
  applyThemeClasses(theme.type, theme.name);
  applyThemeVariables(theme);
}

export function useTheme(): void {
  useEffect(() => {
    const plugin = window.Asc?.plugin;
    if (!plugin) return;

    const handler = (theme: Theme) => {
      plugin.onThemeChangedBase?.(theme);
      applyTheme(theme);
    };

    plugin.onThemeChanged = handler;
    plugin.attachEvent?.('onThemeChanged', handler);

    if (plugin.info?.theme) {
      applyTheme(plugin.info.theme);
    }

    return () => {
      plugin.detachEvent?.('onThemeChanged', handler);
      plugin.onThemeChanged = undefined;
    };
  }, []);
}
