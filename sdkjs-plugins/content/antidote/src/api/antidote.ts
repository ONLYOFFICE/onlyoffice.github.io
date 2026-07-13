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

import { signal } from '@preact/signals';
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
// used by other Antidote/word-processor desktop integrations.
//
// The deterministic alternative — read `HKLM\SOFTWARE\Druide informatique inc.\Connectix` for the
// install path, then spawn `AgentConnectixConsole --api` and parse its `{"port":N}` stdout — is what
// Obsidian's Antidote plugin does (see AgentConnectix.ts/Registry.ts in
// https://github.com/Heziode/obsidian-antidote/tree/main/src/lib/antidote). It needs Node's
// `child_process`/registry access, which a sandboxed ONLYOFFICE plugin iframe doesn't have, so it's
// not an option here — confirms probing + the manual-port Settings fallback is the ceiling for this
// environment, not a workaround we should keep trying to replace.
const PORT_RANGE_START = 49152;
const PORT_RANGE_SIZE = 13;
const PROBE_TIMEOUT_MS = 500;

// The port found by the last successful scan/probe, exposed so Settings can display it as the
// effective port even when the user hasn't set a manual override — as if they had typed it in.
export const discoveredPort = signal<number | null>(null);

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
export function getPortProvider(refresh: boolean = false): () => Promise<number> {
  if (!refresh && manualPort.value !== null) {
    const port = manualPort.value;
    return () => Promise.resolve(port);
  }

  return async () => {
    const cachedPort = discoveredPort.value;
    if (cachedPort !== null && await probePort(cachedPort)) return cachedPort;

    AntidoteConnector.announcePresence();
    if (AntidoteConnector.isDetected()) {
      discoveredPort.value = await AntidoteConnector.getWebSocketPort();
      return discoveredPort.value;
    }

    discoveredPort.value = await scanForPort();
    return discoveredPort.value;
  };
}

let warmupInFlight: Promise<number> | null = null;

// Runs the same port discovery as `getPortProvider()`, but ahead of time (e.g. as soon as the panel
// opens) so `discoveredPort` is already populated by the time the user presses "Corrector"/
// "Dictionaries"/"Guides" — the actual click then only pays for `probePort`'s single round trip
// instead of the full up-to-13-port scan. Safe to call repeatedly (e.g. on every Main mount): a
// no-op once a port is already cached or manually overridden, and de-duped while a scan is already
// in progress.
export function warmUpPort(refresh: boolean = false): void {
  if (manualPort.value !== null || discoveredPort.value !== null || warmupInFlight !== null) return;

  warmupInFlight = getPortProvider(refresh)();
  warmupInFlight.catch(() => {
    console.error('Failed to warm up Antidote port');
  }).finally(() => {
    warmupInFlight = null;
  });
}
