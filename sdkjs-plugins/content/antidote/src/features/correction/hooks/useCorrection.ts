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

import { useCallback, useRef } from 'preact/hooks';
import { ConnectixAgent } from '@druide-informatique/antidote-api-js';

import { getPortProvider, AntidoteError } from '@api/antidote';
import { t } from '@utils/i18n';

import { DocumentCorrectionAgent } from '../agents/documentAgent';
import { SelectionCorrectionAgent } from '../agents/selectionAgent';
import { connectionState, scope, errorMessage, CorrectionScope } from '../store/correctionStore';

const DOCUMENT_TITLE = 'ONLYOFFICE';

export function useCorrection() {
  const connectixRef = useRef<ConnectixAgent | null>(null);

  const stop = useCallback(() => {
    connectixRef.current?.close();
    connectixRef.current = null;
    connectionState.value = 'idle';
  }, []);

  const check = useCallback(async (targetScope: CorrectionScope = scope.value) => {
    errorMessage.value = null;
    connectionState.value = 'connecting';
    scope.value = targetScope;

    try {
      const portProvider = getPortProvider();

      const agent = targetScope === 'document'
        ? new DocumentCorrectionAgent(DOCUMENT_TITLE)
        : new SelectionCorrectionAgent(DOCUMENT_TITLE);

      if (agent instanceof DocumentCorrectionAgent) await agent.loadParagraphs();
      else await agent.loadSelection();

      const connectix = new ConnectixAgent(agent, portProvider);
      await connectix.connectWithAntidote();
      connectix.launchCorrector();

      connectixRef.current = connectix;
      connectionState.value = 'connected';
    } catch (error) {
      connectionState.value = 'error';
      errorMessage.value = error instanceof AntidoteError
        ? t('correction.errors.notDetected')
        : t('correction.errors.unknown');
    }
  }, []);

  return {
    connectionState,
    scope,
    errorMessage,
    check,
    stop,
  };
}
