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

import { t } from '@utils/i18n';

// index.html's boot script re-dispatches every `window.Asc.plugin.button(id)` callback as a
// `plugin:button` window CustomEvent — reuse that existing bridge for the OK button instead of
// overriding/restoring `window.Asc.plugin.button` ourselves.
const PLUGIN_BUTTON_EVENT = 'plugin:button';

// The warning is rendered by this same app/bundle (src/pages/Warning.tsx via a `?modal=warning`
// query flag checked in index.tsx) — no separate static HTML page to keep in sync with the panel's
// CSS/theme/translations. `modal=warning` only selects which page to mount; it carries no
// user-facing data.
const WARNING_WINDOW_URL = `${new URL('index.html', window.location.href).href}?modal=warning`;

let activeWindow: InstanceType<typeof window.Asc.PluginWindow> | null = null;

function closeWarning(): void {
  activeWindow?.close();
  activeWindow = null;
}

// Opens a small separate PluginWindow (not an in-panel banner) with a warning message — used when
// there's nothing to act on (e.g. Dictionaries/Guides clicked with no selection and no word at the
// cursor). The message itself travels over PluginWindow's own message channel — `command()` once
// the child signals `onWindowReady` (Warning.tsx's `attachEvent('onWarning', ...)` receives it) —
// the same attachEvent/command pair other ONLYOFFICE plugins in this repo use for info/warning
// windows (e.g. Zotero's info-window.html), rather than a URL query param: no encoding/length
// concerns for arbitrary text, and the payload never touches window.location/history.
// Initial guess only — `onUpdateHeight` below resizes the window to the actual rendered content
// once Warning.tsx reports it, so a wrong guess here just means a brief resize, not clipped text.
const WARNING_WINDOW_SIZE: [number, number] = [340, 74];

export function showWarning(message: string): void {
  if (!window.Asc?.PluginWindow) return;

  closeWarning();

  const pluginWindow = new window.Asc.PluginWindow();
  activeWindow = pluginWindow;

  pluginWindow.attachEvent('onWindowReady', () => {
    pluginWindow.command('onWarning', message);
  });

  // see Warning.tsx, the opener resizes the actual window to fit it.
  pluginWindow.attachEvent('onUpdateHeight', (height: number) => {
    window.Asc.plugin.executeMethod(
      'ResizeWindow',
      [pluginWindow.id, [WARNING_WINDOW_SIZE[0], height]],
      () => {},
    );
  });

  const onButtonClick = () => {
    window.removeEventListener(PLUGIN_BUTTON_EVENT, onButtonClick);
    closeWarning();
  };
  window.addEventListener(PLUGIN_BUTTON_EVENT, onButtonClick);

  pluginWindow.show({
    url: WARNING_WINDOW_URL,
    description: t('common.warning') + '!',
    isModal: true,
    isVisual: true,
    EditorsSupport: ['word', 'cell', 'pdf'],
    size: WARNING_WINDOW_SIZE,
    buttons: [{ text: t('common.ok'), primary: true }],
  });
}
