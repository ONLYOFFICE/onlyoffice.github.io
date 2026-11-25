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

// @ts-check

/**
 * The note numbers of citations, citeproc's noteIndex: the number of the
 * footnote or endnote a citation is in, 0 for one in the text.
 */

/**
 * Tells the note of each field from its text. The editor tells no field's
 * note without selecting it, so the fields' text is found in the text of
 * the notes instead. The fields come in document order, a note's ones where
 * its reference is, so each is looked for from where the one before was
 * found on. A field found in no note ahead is in the text. One in the text
 * whose very text a later note holds is taken for that note's.
 * @param {Array<string>} fieldTexts - the text of each field, in document
 *  order
 * @param {{footnotes: Array<string>, endnotes: Array<string>}} notes - the
 *  text of every footnote and every endnote, in document order
 * @returns {Array<number>} the note number of each field, by its kind of
 *  note
 */
function findNoteNumbers(fieldTexts, notes) {
    /** @param {string} text */
    const normalize = (text) => text.replace(/\s+/g, " ");
    const kinds = [notes.footnotes, notes.endnotes].map((texts) => ({
        texts: texts.map(normalize),
        note: 0,
        offset: 0,
    }));

    return fieldTexts.map((fieldText) => {
        const text = normalize(fieldText || "").trim();
        if (!text) return 0;
        // Where each kind of note holds the text next, and how many of its
        // notes lie before that: the nearer is taken.
        let best = null;
        for (const kind of kinds) {
            for (let note = kind.note; note < kind.texts.length; note++) {
                const from = note === kind.note ? kind.offset : 0;
                const at = kind.texts[note].indexOf(text, from);
                if (at === -1) continue;
                const skipped = note - kind.note;
                if (!best || skipped < best.skipped) {
                    best = { kind: kind, note: note, at: at, skipped: skipped };
                }
                break;
            }
        }
        if (!best) return 0;
        best.kind.note = best.note;
        best.kind.offset = best.at + text.length;
        return best.note + 1;
    });
}

/**
 * The note numbers citations will have once those in the text are put into
 * notes of their own, as a notes style has them: each takes the note after
 * the last one before it, and the notes after it move up.
 * @param {Array<number>} noteNumbers - in document order, 0 for a citation
 *  in the text
 * @returns {Array<number>}
 */
function numberAsInNotes(noteNumbers) {
    let added = 0;
    let lastNote = 0;
    return noteNumbers.map(function (note) {
        if (note === 0) {
            added++;
            return lastNote + added;
        }
        lastNote = note;
        return note + added;
    });
}

export { findNoteNumbers, numberAsInNotes };
