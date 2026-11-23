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
import { translate } from "@shared/services/translate-service";
import { CitationItem } from "@shared/csl/citation/citation-item";
import { CitationDocService } from "../services/citation-doc-service";
import { zoteroItemUris } from "../zotero/zotero-item-uris";

/** @typedef {import("@shared/csl/citation").CSLCitation} CSLCitation */
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
        // The Zotero plugin for Word finds an item by its zotero.org URI.
        CitationItem.setFallbackUris(zoteroItemUris);
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
     * Zotero keeps the text as plainCitation, and the formatted text Word
     * caches as formattedCitation: only a changed text outdates the cache;
     * dropping it otherwise would rewrite every field of a Word document.
     * @param {CSLCitation} cslCitation
     * @param {string} text
     * @param {string | null} previousText
     */
    recordText(cslCitation, text, previousText) {
        cslCitation.setPlainCitation(text);
        if (text !== previousText) {
            cslCitation.removeFormattedCitation();
        }
    }

    /**
     * Zotero marks a citation the user edited as one not to update.
     * @param {CSLCitation} cslCitation
     * @param {string} formattedText
     * @param {string} editedText
     */
    recordManualEdit(cslCitation, formattedText, editedText) {
        cslCitation.setDoNotUpdate();
    }

    /**
     * The field for a citation or a bibliography whose data is known but
     * whose field is gone. Its text is the one the citation had, until a
     * refresh writes it anew.
     * @param {Object} data - the data of the field code
     * @param {boolean} isBibliography
     * @returns {AddinFieldData}
     */
    fieldFor(data, isBibliography) {
        const properties = /** @type {{properties?: {plainCitation?: string}}} */ (data).properties;
        const content = isBibliography
            ? translate("Bibliography")
            : (properties && properties.plainCitation) || translate("Citation");
        const json = JSON.stringify(data);
        return {
            FieldId: "",
            Value: isBibliography
                ? BIBLIOGRAPHY_PREFIX + " " + json + " " + BIBLIOGRAPHY_SUFFIX
                : CITATION_PREFIX + " " + CITATION_SUFFIX + " " + json,
            Content: content,
        };
    }

    /**
     * The stored data of the citations, without telling where they stand.
     * @returns {Promise<Array<CitationData>>}
     */
    async readCitationData() {
        const all = await this.#fields.getAddinZoteroFields();
        /** @type {Array<CitationData>} */
        const data = [];
        all.filter(isCitationField).forEach((field) => {
            const parsed = parseCitation(field.Value);
            if (parsed) data.push(parsed);
        });
        return data;
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
            data: parseCitation(field.Value),
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
 * The citation a field code stores, null when it cannot be read.
 * @param {string} code
 * @returns {CitationData | null}
 */
function parseCitation(code) {
    return /** @type {CitationData | null} */ (parseCode(code));
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

export { FieldCitationDocument, parseCode as parseFieldCode };
