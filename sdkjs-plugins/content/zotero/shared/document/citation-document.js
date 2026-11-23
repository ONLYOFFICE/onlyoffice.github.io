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

/** @typedef {import("../csl/citation").CSLCitation} CSLCitation */

/**
 * The kind of note a note style puts its citations in.
 * @typedef {"footnotes" | "endnotes"} NoteStyle
 */

/**
 * A citation as it stands in the document.
 * @typedef {Object} DocCitation
 * @property {"citation"} kind
 * @property {string} id - the editor's id of the element that holds it
 * @property {Object | null} data - the CSL citation stored with it, null
 *  when it cannot be read
 * @property {string} text - its text in the document
 * @property {number | null} noteIndex - the number of the note it is in, 0
 *  for one in the text; null when the document cannot tell
 * @property {boolean} legacy - written by an old version of the plugin, in
 *  a format of its own
 */

/**
 * The bibliography as it stands in the document.
 * @typedef {Object} DocBibliography
 * @property {"bibliography"} kind
 * @property {string} id - the editor's id of the element that holds it
 * @property {Object | null} data - what the bibliography stores besides its
 *  text, null for nothing
 * @property {string} text
 */

/**
 * What to write into a citation of the document.
 * @typedef {Object} CitationChange
 * @property {DocCitation} citation
 * @property {Object} data - the CSL citation to store
 * @property {string | null} html - the new text; null keeps the text that is
 *  in the document, as for one the user edited
 */

/**
 * What to write into the bibliography of the document.
 * @typedef {Object} BibliographyChange
 * @property {DocBibliography} bibliography
 * @property {string} html - the new text
 */

/**
 * The document as the citation services see it: citations and a
 * bibliography, read and written without knowing what the editor keeps them
 * in. Each plugin implements it on its own elements: Zotero on addin fields,
 * Mendeley on content controls, as their plugins for Word do.
 *
 * The methods of this class are the contract; each throws until a subclass
 * implements it.
 */
class CitationDocument {
    /**
     * Whether the citations are numbered by their order, as notes would be,
     * whatever the style: so the plugin for Word numbers them when the
     * document cannot tell their notes. Otherwise a citation in the text has
     * no note number.
     * @returns {boolean}
     */
    get numbersCitationsByOrder() {
        return false;
    }

    /**
     * The citations of the document, in document order, and its bibliography.
     * @param {NoteStyle | null} [notesStyle] - where the citations of a note
     *  style sit: their text is then read from those notes
     * @returns {Promise<{citations: Array<DocCitation>, bibliography: DocBibliography | null}>}
     */
    readCitations(notesStyle) {
        return Promise.reject(notImplemented("readCitations"));
    }

    /**
     * The data stored with the citations of the document, in document order,
     * leaving out what cannot be read. A document that can read the data
     * without the text of the citations does it faster.
     * @returns {Promise<Array<Object>>}
     */
    readCitationData() {
        return this.readCitations().then(function (read) {
            /** @type {Array<Object>} */
            const data = [];
            read.citations.forEach(function (citation) {
                if (citation.data) data.push(citation.data);
            });
            return data;
        });
    }

    /**
     * The citation or the bibliography at the cursor.
     * @returns {Promise<DocCitation | DocBibliography | null>}
     */
    getCurrent() {
        return Promise.reject(notImplemented("getCurrent"));
    }

    /**
     * Inserts a citation at the cursor, into a new note for a note style.
     * @param {string} html
     * @param {Object} data - the CSL citation to store
     * @param {NoteStyle | null} notesStyle
     * @returns {Promise<{id: string | null, inNote: boolean}>} the id of the
     *  new citation, null when the editor does not tell it, and whether a
     *  note was made for it
     */
    insertCitation(html, data, notesStyle) {
        return Promise.reject(notImplemented("insertCitation"));
    }

    /**
     * Inserts the bibliography at the cursor.
     * @param {string} html
     * @param {Object | null} data - what the bibliography stores besides its
     *  text
     * @returns {Promise<string>} its id, empty when the editor does not tell it
     */
    insertBibliography(html, data) {
        return Promise.reject(notImplemented("insertBibliography"));
    }

    /**
     * Writes citations where they stand, and the bibliography.
     * @param {Array<CitationChange>} changes
     * @param {BibliographyChange | null} [bibliography]
     * @returns {Promise<Array<string>>} the ids of what was written
     */
    updateCitations(changes, bibliography) {
        return Promise.reject(notImplemented("updateCitations"));
    }

    /**
     * Moves citations from notes into the text, writing them as it goes.
     * @param {Array<CitationChange>} changes
     * @returns {Promise<void>}
     */
    convertNotesToText(changes) {
        return Promise.reject(notImplemented("convertNotesToText"));
    }

    /**
     * Moves citations from the text into new notes, writing them as it goes.
     * @param {Array<CitationChange>} changes
     * @param {NoteStyle} notesStyle
     * @returns {Promise<void>}
     */
    convertTextToNotes(changes, notesStyle) {
        return Promise.reject(notImplemented("convertTextToNotes"));
    }

    /**
     * Writes citations of a note style into new notes of the given kind,
     * replacing the notes they stand in: so they move between footnotes and
     * endnotes, or, given the kind they are in, are rewritten where they
     * stand. Where the citation is kept, in the note or at its reference, is
     * the document's own matter.
     * @param {Array<CitationChange>} changes
     * @param {NoteStyle} notesStyle - the kind of note they go to
     * @returns {Promise<void>}
     */
    convertNotesStyle(changes, notesStyle) {
        return Promise.reject(notImplemented("convertNotesStyle"));
    }

    /**
     * Puts the cursor next to a citation or the bibliography.
     * @param {string} id
     * @param {boolean} [isBefore] - before it rather than after
     * @returns {Promise<void>}
     */
    moveCursorOutside(id, isBefore) {
        return Promise.reject(notImplemented("moveCursorOutside"));
    }

    /**
     * Turns every citation and the bibliography into plain text.
     * @returns {Promise<boolean>} false when the document had none or the
     *  editor reported a failure
     */
    saveAsText() {
        return Promise.reject(notImplemented("saveAsText"));
    }

    /**
     * Records in a citation the text it was formatted to, as the plugin for
     * Word records it in the citation's data.
     * @param {CSLCitation} cslCitation
     * @param {string} text
     * @param {string | null} previousText - the text recorded before, null
     *  when it does not count
     */
    recordText(cslCitation, text, previousText) {
        throw notImplemented("recordText");
    }

    /**
     * Records in a citation that the user edited its text and wants it kept,
     * as the plugin for Word records it in the citation's data.
     * @param {CSLCitation} cslCitation
     * @param {string} formattedText - the text it would be formatted to
     * @param {string} editedText - the text in the document
     */
    recordManualEdit(cslCitation, formattedText, editedText) {
        throw notImplemented("recordManualEdit");
    }
}

/** @param {string} method */
function notImplemented(method) {
    return new Error("CitationDocument." + method + " is not implemented");
}

export { CitationDocument };
