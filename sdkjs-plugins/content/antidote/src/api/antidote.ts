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

import { AntidoteConnector } from '@druide-informatique/antidote-api-js';
import { manualPort } from '@features/correction/store/correctionStore';

export class AntidoteError extends Error {
  constructor(message: string, public readonly code: 'NOT_DETECTED') {
    super(message);
    this.name = 'AntidoteError';
  }
}

// `AntidoteConnector.isDetected()` only recognizes the Antidote *browser extension* (Firefox/
// Chrome/Safari) — it's never present inside ONLYOFFICE Desktop's webview. There is also no way to
// ask Connectix for its WebSocket port from plugin JS: `AgentConnectixConsole --api` is a CLI tool.
// So on desktop we fall back to probing the ephemeral port range Connectix binds to, same approach
// used by other Antidote/word-processor desktop integrations (e.g. the "textcure" OnlyOffice plugin).
const PORT_RANGE_START = 49152;
const PORT_RANGE_SIZE = 13;
const PROBE_TIMEOUT_MS = 500;

let cachedPort: number | null = null;

function probePort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const socket = new WebSocket(`ws://localhost:${port}`);

    let timer: ReturnType<typeof setTimeout>;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.close();
      resolve(ok);
    };

    timer = setTimeout(() => finish(false), PROBE_TIMEOUT_MS);
    socket.addEventListener('open', () => finish(true));
    socket.addEventListener('error', () => finish(false));
  });
}

async function scanForPort(): Promise<number> {
  for (let offset = 0; offset < PORT_RANGE_SIZE; offset++) {
    const port = PORT_RANGE_START + offset;
    // eslint-disable-next-line no-await-in-loop
    if (await probePort(port)) return port;
  }
  throw new AntidoteError('Antidote connector not detected', 'NOT_DETECTED');
}

// AgentConnectix's WebSocket port is either overridden manually in Settings, cached from a previous
// successful scan, discovered through the Antidote browser connector (only relevant outside
// desktop), or found by probing the local port range. If none work, Antidote/Connectix isn't
// installed or running on this machine.
export function getPortProvider(): () => Promise<number> {
  if (manualPort.value !== null) {
    const port = manualPort.value;
    return () => Promise.resolve(port);
  }

  return async () => {
    if (cachedPort !== null && await probePort(cachedPort)) return cachedPort;

    AntidoteConnector.announcePresence();
    if (AntidoteConnector.isDetected()) {
      cachedPort = await AntidoteConnector.getWebSocketPort();
      return cachedPort;
    }

    cachedPort = await scanForPort();
    return cachedPort;
  };
}
