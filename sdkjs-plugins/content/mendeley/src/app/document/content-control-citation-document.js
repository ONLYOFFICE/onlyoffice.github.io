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

/// <reference path="../../../../zotero/shared/types-global.js" />

import { CitationDocument } from "@shared/document/citation-document";
import { CitationDocService } from "../services/citation-doc-service";

/** @typedef {import("@shared/document/citation-document").DocCitation} DocCitation */
/** @typedef {import("@shared/document/citation-document").DocBibliography} DocBibliography */
/** @typedef {import("@shared/document/citation-document").CitationChange} CitationChange */
/** @typedef {import("@shared/document/citation-document").BibliographyChange} BibliographyChange */
/** @typedef {import("@shared/document/citation-document").NoteStyle} NoteStyle */

// The tags of Mendeley Cite for Word.
const CITATION_PREFIX = "MENDELEY_CITATION";
const BIBLIOGRAPHY_PREFIX = "MENDELEY_BIBLIOGRAPHY";
const TAG_VERSION = "_v3_";

/**
 * The citations of a document kept in content controls, as Mendeley Cite for
 * Word keeps them: the tag holds the citation's JSON in base64, the control's
 * text is the citation.
 */
class ContentControlCitationDocument extends CitationDocument {
    /** @type {CitationDocService} */
    #controls;
    /**
     * The controls read, for writing back what was read.
     * @type {WeakMap<DocCitation | DocBibliography, ContentControlProperties>}
     */
    #source = new WeakMap();

    /** @param {CitationDocService} [controls] - the editor's controls */
    constructor(controls) {
        super();
        this.#controls =
            controls || new CitationDocService(CITATION_PREFIX, BIBLIOGRAPHY_PREFIX);
    }

    /**
     * The service the controls are read and written with, for what only
     * Mendeley does: upgrading the fields of its old versions.
     * @returns {CitationDocService}
     */
    get controls() {
        return this.#controls;
    }

    /** @param {NoteStyle | null} [notesStyle] */
    async readCitations(notesStyle) {
        const all = await this.#controls.getAddinMendeleyControls();
        const bibControl = all.find(isBibliographyControl);
        const citationControls = all.filter(isCitationControl);
        const citations = citationControls.map((control) =>
            this.#toCitation(control),
        );
        if (notesStyle) {
            // The text of a citation in a note is the note's. A control
            // without an id keeps its place in the list, matching nothing.
            const noteTexts = await this.#controls.getFootnotesControls(
                citationControls.map((control) => control.InternalId || ""),
                notesStyle,
            );
            noteTexts.forEach((text, index) => {
                if (text) citations[index].text = text;
            });
        }
        return {
            citations: citations,
            bibliography: bibControl ? this.#toBibliography(bibControl) : null,
        };
    }

    async getCurrent() {
        const control = await this.#controls.getCurrentContentControlPr();
        if (!control || !control.Tag) {
            return null;
        }
        if (isBibliographyControl(control)) {
            return this.#toBibliography(control);
        }
        if (isCitationControl(control)) {
            return this.#toCitation(control);
        }
        return null;
    }

    /**
     * @param {string} html
     * @param {Object} data
     * @param {NoteStyle | null} notesStyle
     */
    async insertCitation(html, data, notesStyle) {
        const id = await this.#controls.addCitation(html, encodeTag(data), notesStyle);
        return { id: id || null, inNote: !!notesStyle };
    }

    /**
     * @param {string} html
     * @param {Object | null} data - unused: the bibliography stores nothing
     */
    async insertBibliography(html, data) {
        return (await this.#controls.addBibliography(html)) || "";
    }

    /**
     * @param {Array<CitationChange>} changes
     * @param {BibliographyChange | null} [bibliography]
     */
    updateCitations(changes, bibliography) {
        const controls = changes.map((change) => this.#toControl(change));
        if (bibliography) {
            controls.push(
                Object.assign({}, this.#raw(bibliography.bibliography), {
                    PlaceHolderText: bibliography.html,
                }),
            );
        }
        return this.#controls.updateContentControls(controls);
    }

    /** @param {Array<CitationChange>} changes */
    convertNotesToText(changes) {
        return this.#controls.convertNotesToText(
            changes.map((change) => this.#toControl(change)),
        );
    }

    /**
     * @param {Array<CitationChange>} changes
     * @param {NoteStyle} notesStyle
     */
    convertTextToNotes(changes, notesStyle) {
        return this.#controls.convertTextToNotes(
            changes.map((change) => this.#toControl(change)),
            notesStyle,
        );
    }

    /**
     * @param {Array<CitationChange>} changes
     * @param {NoteStyle} notesStyle
     */
    convertNotesStyle(changes, notesStyle) {
        return this.#controls.convertNotesStyle(
            changes.map((change) => this.#toControl(change)),
            notesStyle,
        );
    }

    /**
     * @param {string} id
     * @param {boolean} [isBefore] - unused: the cursor goes after the control
     */
    moveCursorOutside(id, isBefore) {
        return this.#controls.moveCursorOutsideControl(id);
    }

    async saveAsText() {
        // The editor tells nothing of how it went.
        await this.#controls.saveAsText();
        return true;
    }

    /**
     * @param {ContentControlProperties} control
     * @returns {DocCitation}
     */
    #toCitation(control) {
        /** @type {DocCitation} */
        const citation = {
            kind: "citation",
            id: control.InternalId || "",
            data: decodeTag(control.Tag),
            text: control.PlaceHolderText || "",
            noteIndex: null,
            legacy: false,
        };
        this.#source.set(citation, control);
        return citation;
    }

    /**
     * @param {ContentControlProperties} control
     * @returns {DocBibliography}
     */
    #toBibliography(control) {
        /** @type {DocBibliography} */
        const bibliography = {
            kind: "bibliography",
            id: control.InternalId || "",
            data: null,
            text: control.PlaceHolderText || "",
        };
        this.#source.set(bibliography, control);
        return bibliography;
    }

    /**
     * The control to write for a change: the one read, with the new tag and
     * the new text, an empty one keeping the text it has.
     * @param {CitationChange} change
     * @returns {ContentControlProperties}
     */
    #toControl(change) {
        return Object.assign({}, this.#raw(change.citation), {
            Tag: encodeTag(change.data),
            PlaceHolderText: change.html === null ? "" : change.html,
        });
    }

    /**
     * @param {DocCitation | DocBibliography} item
     * @returns {ContentControlProperties}
     */
    #raw(item) {
        const control = this.#source.get(item);
        if (!control) {
            throw new Error("ContentControlCitationDocument: " + item.kind + " " + item.id + " was not read from this document");
        }
        return control;
    }
}

/** @param {ContentControlProperties} control */
function isCitationControl(control) {
    return !!control.Tag && control.Tag.indexOf(CITATION_PREFIX) !== -1;
}

/** @param {ContentControlProperties} control */
function isBibliographyControl(control) {
    return !!control.Tag && control.Tag.indexOf(BIBLIOGRAPHY_PREFIX) !== -1;
}

/**
 * The tag of a citation: its JSON as UTF-8 in base64.
 * @param {Object} data
 * @returns {string}
 */
function encodeTag(data) {
    const json = JSON.stringify(data);
    let binary = "";
    if (typeof TextEncoder !== "undefined") {
        const bytes = new TextEncoder().encode(json);
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
    } else {
        binary = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        });
    }
    return CITATION_PREFIX + TAG_VERSION + btoa(binary);
}

/**
 * The citation in a tag, null when it cannot be read.
 * @param {string} tag
 * @returns {Object | null}
 */
function decodeTag(tag) {
    // After the version: MENDELEY_CITATION_v3_<base64>.
    const start = tag.indexOf("_", CITATION_PREFIX.length + 1) + 1;
    if (start <= 0) {
        return null;
    }
    try {
        const binary = atob(tag.slice(start));
        let json;
        if (typeof TextDecoder !== "undefined") {
            const bytes = Uint8Array.from(binary, function (c) {
                return c.charCodeAt(0);
            });
            json = new TextDecoder("utf-8").decode(bytes);
        } else {
            let escaped = "";
            for (let i = 0; i < binary.length; i++) {
                escaped += "%" + ("00" + binary.charCodeAt(i).toString(16)).slice(-2);
            }
            json = decodeURIComponent(escaped);
        }
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}

export { ContentControlCitationDocument };
