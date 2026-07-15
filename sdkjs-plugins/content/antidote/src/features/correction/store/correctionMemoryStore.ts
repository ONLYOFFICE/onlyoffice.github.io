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

// Backs WordProcessorAgent.documentPath()/newCorrectionMemory()/configuration().correctionMemory
// (see BaseCorrectionAgent) — lets Antidote remember which suggestions were already
// ignored/applied for a given document across separate Corrector sessions, per Antidote's own
// "remember the status of previous corrections between sessions" feature. `documentId` is the one
// stable per-document identifier the plugin host actually exposes (no file path/URL is available
// from inside the plugin sandbox); if it's ever missing, every function below degrades to its
// documented-safe no-memory behavior rather than guessing at an identifier.
const STORAGE_PREFIX = 'antidote.correctionMemory.';

function getDocumentId(): string {
  return window.Asc?.plugin?.info?.documentId ?? '';
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

// Returning '' is the documented way to tell Antidote "don't manage correction state for this
// document" — used when there's no documentId to key storage by.
export function getDocumentPath(): string {
  return getDocumentId();
}

export function loadCorrectionMemory(): string | undefined {
  const id = getDocumentId();
  if (!id) return undefined;

  try {
    return localStorage.getItem(STORAGE_PREFIX + id) ?? undefined;
  } catch {
    return undefined;
  }
}

export function saveCorrectionMemory(data: Uint8Array | string): void {
  const id = getDocumentId();
  if (!id) return;

  try {
    localStorage.setItem(STORAGE_PREFIX + id, typeof data === 'string' ? data : bytesToBase64(data));
  } catch {
    // Storage unavailable/quota exceeded — this is a best-effort convenience feature, not
    // correctness-critical, so dropping it silently is the safe degradation.
  }
}
