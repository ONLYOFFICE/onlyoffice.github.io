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

import { useCallback, useState } from 'preact/hooks';
import { ConnectixAgent } from '@druide-informatique/antidote-api-js';

import { getPortProvider, AntidoteError } from '@api/antidote';
import { Editor } from '@api/editor';
import { t } from '@utils/i18n';

import { LookupAgent } from '../agents/lookupAgent';

export type LookupTool = 'dictionaries' | 'guides';

// Mirrors Antidote's own Word add-in: an explicit selection always wins, but absent one it falls
// back to whatever word the caret is in or next to (getCurrentWord, word editor only) rather than
// requiring the user to select anything first. The manual text field is the last resort, for
// cell/pdf (no caret-word API) or when there's truly nothing at the caret. If none of the three
// produce anything, a separate PluginWindow warns the user instead of silently doing nothing.
export function useLookup() {
  const [error, setError] = useState<string | null>(null);
  const [incorrectPort, setIncorrectPort] = useState(false);
  const [pending, setPending] = useState(false);

  const open = useCallback(async (tool: LookupTool, manualText: string) => {
    setError(null);
    const editor = Editor.create();

    let selected = '';
    try {
      selected = await editor.getSelectedText();
    } catch {
      console.error('Failed to get selected text');
    }
    const currentWord = selected.trim() ? '' : await editor.getCurrentWord();
    const text = selected.trim() || currentWord.trim() || manualText.trim();
    if (tool === 'dictionaries' && !text) {
      setError(t('Select some text or place the cursor on a word to look it up.'));
      return;
    }

    setPending(true);

    try {
      const portProvider = getPortProvider();
      const agent = new LookupAgent(text);
      const connectix = new ConnectixAgent(agent, portProvider);

      await connectix.connectWithAntidote();
      if (tool === 'dictionaries') connectix.launchDictionaries();
      else connectix.launchGuides();
    } catch (err) {
      if (err instanceof AntidoteError) {
        setError(t('Antidote wasn\'t detected. Make sure Antidote 12 and its Connectix agent are installed and running.'));
      } else {
        setError(t('An unexpected error occurred while talking to Antidote. Reload the plugin or edit the port in settings.'));
        setIncorrectPort(true);
      }
    } finally {
      setPending(false);
    }
  }, []);

  return {
    open, error, pending, incorrectPort,
  };
}
