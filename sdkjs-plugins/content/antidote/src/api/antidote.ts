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
import { manualPort, manualProbeTimeout } from '@features/correction/store/correctionStore';

export class AntidoteError extends Error {
  constructor(message: string, public readonly code: 'NOT_DETECTED') {
    super(message);
    this.name = 'AntidoteError';
  }
}

// isDetected() only recognizes the browser extension, unavailable in ONLYOFFICE's webview.
// The sandbox cannot query Connectix's port or run AgentConnectixConsole, so the plugin probes
// Connectix's ephemeral range and provides a manual-port fallback.
const PORT_RANGE_START = 49152;
const PORT_RANGE_SIZE = 13;

const isDesktop = window.location.protocol === 'file:';
export const DEFAULT_PROBE_TIMEOUT_MS = isDesktop ? 2000 : 500;
export const PROBE_TIMEOUT_RANGE = { min: 100, max: 5000 };

// The port found by the last successful scan/probe, exposed so Settings can display it as the
// effective port even when the user hasn't set a manual override — as if they had typed it in.
export const discoveredPort = signal<number | null>(null);

// Exported so callers can re-check reachability of a specific, already-connected port later (e.g.
// useCorrection distinguishing a genuine connection drop from the user just closing the Corrector
// window — sessionEnded() fires identically for both, so this is the only way to tell them apart).
export function probePort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const socket = new WebSocket(`ws://127.0.0.1:${port}`);

    let timer: ReturnType<typeof setTimeout>;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.close();
      resolve(ok);
    };

    timer = setTimeout(() => finish(false), manualProbeTimeout.value ?? DEFAULT_PROBE_TIMEOUT_MS);
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
export function getPortProvider(refresh = false): () => Promise<number> {
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
export function warmUpPort(refresh = false): void {
  if (!refresh && (manualPort.value !== null || discoveredPort.value !== null || warmupInFlight !== null)) return;

  warmupInFlight = getPortProvider(refresh)();
  warmupInFlight.catch(() => {
    console.error('Failed to warm up Antidote port');
  }).finally(() => {
    warmupInFlight = null;
  });
}
