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

// Warning windows reuse this bundle; modal only selects the page to mount.
const WARNING_WINDOW_URL = `${new URL('index.html', window.location.href).href}?modal=warning`;

let activeWindow: InstanceType<typeof window.Asc.PluginWindow> | null = null;

function closeWarning(): void {
  activeWindow?.close();
  activeWindow = null;
}

// Warning text travels through PluginWindow's message channel rather than URL parameters.
// onUpdateHeight resizes the initial window to its rendered content.
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
  pluginWindow.attachEvent('onUpdateHeight', (height: unknown) => {
    if (typeof height !== 'number') return;
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
    description: `${t('Warning')}!`,
    isModal: true,
    isVisual: true,
    EditorsSupport: ['word', 'cell', 'pdf'],
    size: WARNING_WINDOW_SIZE,
    buttons: [{ text: t('OK'), primary: true }],
  });
}
