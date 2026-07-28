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

import {
  ParamsAllowEdit, ParamsGetZonesToCorrect, ParamsReplace, ParamsSelect,
  StyleInfo, TextZoneConnectix,
} from '@druide-informatique/antidote-api-js';

import { BaseEditor, DocumentParagraph } from '@api/editor';

// Shared zone/paragraph bookkeeping used by both DocumentCorrectionAgent (whole document) and
// SelectionCorrectionAgent's word/zone mode (a selection, when the editor supports zones) — kept
// in one place so the two never drift into subtly different position math.

export interface ParagraphOffset extends DocumentParagraph {
  start: number;
}

// One independent text zone for Antidote: a main-text segment or a single table cell (see
// TextEditor.getDocumentContent). Each zone keeps its own paragraph/offset bookkeeping so a
// correction inside one zone never has to share position math with any other zone.
export interface Zone {
  zoneId: string;
  paragraphs: ParagraphOffset[];
}

export function buildZone(
  zoneId: string,
  paragraphs: DocumentParagraph[],
  separator: string,
): Zone {
  let start = 0;
  const offsets = paragraphs.map((paragraph) => {
    const offset: ParagraphOffset = {
      ...paragraph,
      start,
    };
    start += paragraph.text.length + separator.length;
    return offset;
  });
  return { zoneId, paragraphs: offsets };
}

export function findZone(zones: Zone[], zoneId: string): Zone | undefined {
  return zones.find((zone) => zone.zoneId === zoneId);
}

export function findParagraphAt(zones: Zone[], zoneId: string, position: number): ParagraphOffset | undefined {
  const zone = findZone(zones, zoneId);
  if (!zone) return undefined;
  let found = zone.paragraphs[0];
  for (const paragraph of zone.paragraphs) {
    if (paragraph.start > position) break;
    found = paragraph;
  }
  return found;
}

// Confirms the text Antidote expects at [positionStart, positionEnd) (`context`) still matches
// what's cached before letting a replacement through — the defense against a correction landing in
// the wrong place after a concurrent edit a resync hasn't caught up to yet. A paragraph outside
// current bounds, or a zone that no longer exists (e.g. a table cell removed concurrently), can't
// match a slice at all, so this fails closed on any lookup issue.
export function allowEditInZones(zones: Zone[], params: ParamsAllowEdit): boolean {
  const paragraph = findParagraphAt(zones, params.zoneId, params.positionStart);
  if (!paragraph) return false;
  const localStart = params.positionStart - paragraph.start;
  const localEnd = params.positionEnd - paragraph.start;
  return paragraph.text.slice(localStart, localEnd) === params.context;
}

// Antidote calls this when the user selects text inside its own Corrector window — mirror that
// selection back onto the ONLYOFFICE document so it stays visible which part is being worked on.
export function selectIntervalInZones(zones: Zone[], editor: BaseEditor, params: ParamsSelect): void {
  const firstParagraph = findParagraphAt(zones, params.zoneId, params.positionStart);
  const lastParagraph = findParagraphAt(zones, params.zoneId, params.positionEnd);
  if (!firstParagraph || !lastParagraph) return;
  // editor.selectContentRange resolves positions against the paragraph's real, full text — if this
  // paragraph's `text` was clipped to a sub-range (a selection starting/ending mid-paragraph — see
  // DocumentParagraph.prefix/suffix), the trimmed prefix needs adding back so the position lands
  // where it actually is in the real paragraph, not `prefix.length` characters too early.
  const localStart = params.positionStart - firstParagraph.start + (firstParagraph.prefix?.length ?? 0);
  const localEnd = params.positionEnd - lastParagraph.start + (lastParagraph.prefix?.length ?? 0);
  editor.selectContentRange(firstParagraph.id, lastParagraph.id, localStart, localEnd).catch(() => {
    console.error('Failed to select content range');
  });
}

// Applies the replacement into the correct zone's paragraph and shifts that zone's own later
// paragraph offsets by the resulting length diff. Returns the diff (0 if the target paragraph or
// zone no longer exists) so a caller tracking extra bounds of its own — e.g.
// SelectionCorrectionAgent's selectionEnd, which spans every zone — can stay in sync too.
export async function applyCorrectionInZones(
  zones: Zone[],
  editor: BaseEditor,
  params: ParamsReplace,
): Promise<number> {
  const paragraph = findParagraphAt(zones, params.zoneId, params.positionStartReplace);
  if (!paragraph) return 0;
  const localStart = params.positionStartReplace - paragraph.start;
  const localEnd = params.positionReplaceEnd - paragraph.start;
  const newText = paragraph.text.slice(0, localStart) + params.newString + paragraph.text.slice(localEnd);

  // If this paragraph's `text` was clipped to a sub-range (see DocumentParagraph.prefix/suffix),
  // replaceContent still overwrites the paragraph's *entire* real text — stitch the untouched
  // prefix/suffix back on so that part isn't silently deleted along with the edit.
  const fullText = (paragraph.prefix ?? '') + newText + (paragraph.suffix ?? '');
  await editor.replaceContent(fullText, paragraph.id);

  const diff = newText.length - paragraph.text.length;
  paragraph.text = newText;
  const zone = findZone(zones, params.zoneId);
  if (zone) {
    for (const other of zone.paragraphs) {
      if (other.start > paragraph.start) other.start += diff;
    }
  }
  return diff;
}

export function zonesToTextZones(
  zones: Zone[],
  separator: string,
  _params: ParamsGetZonesToCorrect,
): TextZoneConnectix[] {
  return zones.map((zone, index) => {
    const styleInfo: StyleInfo[] = [];
    zone.paragraphs.forEach((paragraph) => {
      (paragraph.styleInfo ?? []).forEach((range) => {
        styleInfo.push({
          positionStart: range.positionStart + paragraph.start,
          positionEnd: range.positionEnd + paragraph.start,
          style: range.style,
        });
      });
    });

    return {
      text: zone.paragraphs.map((paragraph) => paragraph.text).join(separator),
      zoneId: zone.zoneId,
      // Only the very first zone in document order starts focused — the rest (later main-text
      // segments, table cells) are passive text Antidote can still check/correct but shouldn't
      // assume has keyboard focus.
      zoneIsFocused: index === 0,
      styleInfo,
    };
  });
}
