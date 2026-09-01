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

import { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

// Rendered in PluginWindow via ?modal=warning; message text arrives through its message channel.
export function Warning(): JSX.Element {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const plugin = window.Asc?.plugin;
    if (!plugin) return undefined;

    const handleWarning = (text: unknown) => setMessage(typeof text === 'string' ? text : '');
    plugin.attachEvent?.('onWarning', handleWarning);

    // Send only after the host calls plugin.init; preserve the boot script's existing handler.
    const previousInit = plugin.init;
    plugin.init = () => {
      previousInit?.();
      plugin.sendToPlugin?.('onWindowReady');
    };

    return () => {
      plugin.detachEvent?.('onWarning');
      plugin.init = previousInit;
    };
  }, []);

  // Report height after rendering so the opener can resize the window.
  useEffect(() => {
    if (!message) return;
    window.Asc.plugin.sendToPlugin?.('onUpdateHeight', document.body.scrollHeight);
  }, [message]);

  return (
    <div className="antidote-warning noselect">
      <svg width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5201 0.853631C21.1693 -0.284655 22.8103 -0.284653 23.4594 0.853633L43.7548 36.4414C44.398 37.5693 43.5835 38.9714 42.2851 38.9714H1.69445C0.396056 38.9714 -0.418416 37.5693 0.224796 36.4414L20.5201 0.853631Z" fill="#F2BE08" />
        <circle cx="21.99" cy="32.4614" r="2.51612" fill="white" />
        <path d="M25.3447 12.3324C25.3447 13.1968 24.33 17.5992 23.6672 21.5581C23.0761 25.0894 22.8285 28.2678 22.8285 28.2678C22.4092 28.2678 21.7103 28.2678 21.1511 28.2678C21.1511 28.2678 20.9036 25.0894 20.3124 21.5581C19.6496 17.5992 18.635 13.1968 18.635 12.3324C18.635 10.4795 20.137 8.97754 21.9898 8.97754C23.8427 8.97754 25.3447 10.4795 25.3447 12.3324Z" fill="white" />
      </svg>
      <p className="antidote-warning__message">{message}</p>
    </div>
  );
}
