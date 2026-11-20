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

/// <reference path="../../../shared/types-global.js" />

import { CitationDocument } from "@shared/document/citation-document";
import { CitationDocService } from "../services/citation-doc-service";

/** @typedef {import("@shared/document/citation-document").DocCitation} DocCitation */
/** @typedef {import("@shared/document/citation-document").DocBibliography} DocBibliography */
/** @typedef {import("@shared/document/citation-document").CitationChange} CitationChange */
/** @typedef {import("@shared/document/citation-document").BibliographyChange} BibliographyChange */
/** @typedef {import("@shared/document/citation-document").NoteStyle} NoteStyle */

// The field codes of the Zotero plugin for Word.
const CITATION_PREFIX = "ZOTERO_ITEM";
const CITATION_SUFFIX = "CSL_CITATION";
const BIBLIOGRAPHY_PREFIX = "ZOTERO_BIBL";
const BIBLIOGRAPHY_SUFFIX = "CSL_BIBLIOGRAPHY";
// Written by old versions of the plugin.
const LEGACY_CITATION_PREFIX = "ZOTERO_CITATION";
const LEGACY_BIBLIOGRAPHY_PREFIX = "ZOTERO_BIBLIOGRAPHY";

/**
 * The citations of a document kept in addin fields, as the Zotero plugin for
 * Word keeps them: the field code holds the citation's JSON, the field's
 * text is the citation.
 */
class FieldCitationDocument extends CitationDocument {
    /** @type {CitationDocService} */
    #fields;
    /**
     * The fields read, for writing back what was read.
     * @type {WeakMap<DocCitation | DocBibliography, AddinFieldData>}
     */
    #source = new WeakMap();

    /** @param {CitationDocService} [fields] - the editor's fields */
    constructor(fields) {
        super();
        this.#fields =
            fields ||
            new CitationDocService(
                CITATION_PREFIX,
                CITATION_SUFFIX,
                BIBLIOGRAPHY_PREFIX,
                BIBLIOGRAPHY_SUFFIX,
            );
    }

    /**
     * The service the fields are read and written with, for what only
     * Zotero does: its document preferences, transfer documents and repair.
     * @returns {CitationDocService}
     */
    get fields() {
        return this.#fields;
    }

    /**
     * @param {NoteStyle | null} [notesStyle] - unused: a field keeps its text
     *  wherever it is
     */
    async readCitations(notesStyle) {
        const all = await this.#fields.getAddinZoteroFields();
        const bibField = all.find(isBibliographyField);
        const citationFields = all.filter(isCitationField);
        const noteNumbers = await this.#fields.getNoteNumbers(citationFields);
        return {
            citations: citationFields.map((field, index) =>
                this.#toCitation(field, noteNumbers[index]),
            ),
            bibliography: bibField ? this.#toBibliography(bibField) : null,
        };
    }

    async getCurrent() {
        const field = await this.#fields.getCurrentField();
        if (!field || !field.Value) {
            return null;
        }
        if (isBibliographyField(field)) {
            return this.#toBibliography(field);
        }
        if (isCitationField(field)) {
            return this.#toCitation(field, null);
        }
        return null;
    }

    /**
     * @param {string} html
     * @param {Object} data
     * @param {NoteStyle | null} notesStyle
     */
    async insertCitation(html, data, notesStyle) {
        const inNote = await this.#fields.addCitation(
            html,
            JSON.stringify(data),
            notesStyle,
        );
        return { id: null, inNote: inNote };
    }

    /**
     * @param {string} html
     * @param {Object | null} data
     */
    insertBibliography(html, data) {
        return this.#fields.addBibliography(
            html,
            data && Object.keys(data).length ? JSON.stringify(data) : " ",
        );
    }

    /**
     * @param {Array<CitationChange>} changes
     * @param {BibliographyChange | null} [bibliography]
     */
    updateCitations(changes, bibliography) {
        const fields = changes.map((change) => this.#toField(change));
        if (bibliography) {
            fields.push(
                Object.assign({}, this.#raw(bibliography.bibliography), {
                    Content: bibliography.html,
                }),
            );
        }
        return this.#fields.updateAddinFields(fields);
    }

    /** @param {Array<CitationChange>} changes */
    convertNotesToText(changes) {
        return this.#fields.convertNotesToText(
            changes.map((change) => this.#toField(change)),
        );
    }

    /**
     * @param {Array<CitationChange>} changes
     * @param {NoteStyle} notesStyle
     */
    convertTextToNotes(changes, notesStyle) {
        return this.#fields.convertTextToNotes(
            changes.map((change) => this.#toField(change)),
            notesStyle,
        );
    }

    /**
     * @param {Array<CitationChange>} changes
     * @param {NoteStyle} notesStyle
     */
    convertNotesStyle(changes, notesStyle) {
        return this.#fields.convertNotesStyle(
            changes.map((change) => this.#toField(change)),
            notesStyle,
        );
    }

    /**
     * @param {string} id
     * @param {boolean} [isBefore]
     */
    moveCursorOutside(id, isBefore) {
        return this.#fields.moveCursorOutsideField(id, isBefore);
    }

    saveAsText() {
        return this.#fields.saveAsText();
    }

    /**
     * @param {AddinFieldData} field
     * @param {number | null} noteIndex
     * @returns {DocCitation}
     */
    #toCitation(field, noteIndex) {
        /** @type {DocCitation} */
        const citation = {
            kind: "citation",
            id: field.FieldId,
            data: parseCode(field.Value),
            text: field.Content || "",
            noteIndex: typeof noteIndex === "number" ? noteIndex : null,
            legacy: field.Value.indexOf(LEGACY_CITATION_PREFIX) !== -1,
        };
        this.#source.set(citation, field);
        return citation;
    }

    /**
     * @param {AddinFieldData} field
     * @returns {DocBibliography}
     */
    #toBibliography(field) {
        const data = parseCode(field.Value);
        /** @type {DocBibliography} */
        const bibliography = {
            kind: "bibliography",
            id: field.FieldId,
            data: data && Object.keys(data).length ? data : null,
            text: field.Content || "",
        };
        this.#source.set(bibliography, field);
        return bibliography;
    }

    /**
     * The field to write for a change: the one read, with the new code and,
     * unless the text is kept, the new text.
     * @param {CitationChange} change
     * @returns {AddinFieldData}
     */
    #toField(change) {
        const field = Object.assign({}, this.#raw(change.citation));
        if (change.html === null) {
            // A field written without its text keeps the text it has.
            // @ts-ignore
            delete field.Content;
        } else {
            field.Content = change.html;
        }
        field.Value =
            CITATION_PREFIX + " " + CITATION_SUFFIX + " " + JSON.stringify(change.data);
        return field;
    }

    /**
     * @param {DocCitation | DocBibliography} item
     * @returns {AddinFieldData}
     */
    #raw(item) {
        const field = this.#source.get(item);
        if (!field) {
            throw new Error("FieldCitationDocument: " + item.kind + " " + item.id + " was not read from this document");
        }
        return field;
    }
}

/** @param {AddinFieldData} field */
function isCitationField(field) {
    return (
        field.Value.indexOf(CITATION_PREFIX) !== -1 ||
        field.Value.indexOf(LEGACY_CITATION_PREFIX) !== -1
    );
}

/** @param {AddinFieldData} field */
function isBibliographyField(field) {
    return (
        !!field.Value &&
        (field.Value.indexOf(BIBLIOGRAPHY_PREFIX) !== -1 ||
            field.Value.indexOf(LEGACY_BIBLIOGRAPHY_PREFIX) !== -1)
    );
}

/**
 * The JSON of a field code, from its first "{" to its last "}".
 * @param {string} code
 * @returns {Object | null}
 */
function parseCode(code) {
    const start = code.indexOf("{");
    if (start === -1) {
        return null;
    }
    try {
        return JSON.parse(code.slice(start, code.lastIndexOf("}") + 1));
    } catch (e) {
        return null;
    }
}

export { FieldCitationDocument };
