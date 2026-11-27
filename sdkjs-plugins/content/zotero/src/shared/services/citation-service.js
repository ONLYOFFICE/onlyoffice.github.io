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

/// <reference path="../types-global.js" />

import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { numberAsInNotes } from "../csl/citation/note-numbers";
import { AdditionalWindow } from "../pages/additional-window";
import { CitationFormatter } from "./citation-formatter";
import { CitationLibrary } from "./citation-library";
import { BibliographyEditor } from "./bibliography-editor";
import { bibliographyHtml } from "./bibliography-html";
import { CslHtmlParser } from "./csl-html-parser";
import { translate } from "./translate-service";

/**
 * @typedef {Object} DiscardOptions
 * @property {boolean} [discardManualEdits] - the citations edited by hand
 *  are formatted as the others again
 */

/**
 * @typedef {import("../csl/styles").CslStylesManager} CslStylesManager
 * @typedef {import("../csl/locales").LocalesManager} LocalesManager
 * @typedef {import("../csl/abbreviations").AbbreviationsManager} AbbreviationsManager
 * @typedef {import("../document/citation-document").CitationDocument} CitationDocument
 * @typedef {import("../document/citation-document").DocCitation} DocCitation
 * @typedef {import("../document/citation-document").DocBibliography} DocBibliography
 * @typedef {import("../document/citation-document").CitationChange} CitationChange
 * @typedef {import("../document/citation-document").BibliographyChange} BibliographyChange
 * @typedef {import("../document/citation-document").NoteStyle} NoteStyle
 * @typedef {import("./citation-library").PrepareOptions} PrepareOptions
 * @typedef {import("./citation-library").RefreshProgressCallback} RefreshProgressCallback
 */

/**
 * A citation of the document with what was made of it in the storage.
 * @typedef {{citation: DocCitation, cslCitation: CSLCitation}} StoredCitation
 */

const BIBLIOGRAPHY_PLACEHOLDER = "Please insert some citation into the document.";

/**
 * What a reference plugin does with the citations of a document: reads them
 * into the storage, formats them with citeproc and writes them back, in the
 * text or in notes, with the bibliography.
 */
class CitationService {
    /** The plugin's name, as the user knows it. */
    #name;
    /** @type {CitationDocument} */
    #document;
    /** @type {CitationLibrary} */
    #library;
    /** @type {BibliographyEditor} */
    #bibliographyEditor;
    /** @type {CslStylesManager} */
    #cslStylesManager;
    /** @type {CSLCitationStorage} */
    #storage = new CSLCitationStorage();
    /** @type {CitationFormatter} */
    #formatter;
    /** @type {AdditionalWindow} */
    #additionalWindow;

    /**
     * @param {Object} options
     * @param {string} options.name - "Zotero", "Mendeley"
     * @param {CitationDocument} options.document
     * @param {LocalesManager} options.localesManager
     * @param {CslStylesManager} options.cslStylesManager
     * @param {AbbreviationsManager} options.abbreviationsManager
     * @param {CitationLibrary} [options.library]
     * @param {BibliographyEditor} [options.bibliographyEditor]
     */
    constructor(options) {
        this.#name = options.name;
        this.#document = options.document;
        this.#library = options.library || new CitationLibrary();
        this.#bibliographyEditor = options.bibliographyEditor || new BibliographyEditor();
        this.#cslStylesManager = options.cslStylesManager;
        const bibliographyEditor = this.#bibliographyEditor;
        this.#formatter = new CitationFormatter({
            storage: this.#storage,
            localesManager: options.localesManager,
            cslStylesManager: options.cslStylesManager,
            abbreviationsManager: options.abbreviationsManager,
            extraItem: (id) => bibliographyEditor.uncitedItem(id),
        });
        this.#additionalWindow = new AdditionalWindow(options.name);
        options.abbreviationsManager.load();
    }

    /**
     * Fetches fresh copies of the cited items ahead of a refresh, without
     * touching the document: the refresh that follows uses them.
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<void>}
     */
    async prefetchCitedItems(onProgress) {
        await this.#readDocument();
        await this.#library.prefetch(this.#storage, onProgress);
    }

    /** @returns {Promise<DocCitation | DocBibliography | null>} */
    getCurrent() {
        return this.#document.getCurrent();
    }

    /**
     * @returns {Promise<boolean>}
     */
    async saveAsText() {
        const isOk = await this.#document.saveAsText();
        if (isOk) {
            this.showSuccessMessage(
                "All active " + this.#name + " citations and Bibliography have been replaced.",
            );
        }
        return isOk;
    }

    /**
     * @param {Object<string, SearchResultItem>} items
     * @returns {Promise<{hasNotes: boolean, citationID: string, id: string | null}>}
     *  whether a note was made for the citation, its id in the storage and
     *  its id in the document, null when the editor does not tell it
     */
    async insertSelectedCitations(items) {
        await this.#readDocument();
        await this.#prepareStorage();

        const cslCitation = new CSLCitation("");
        for (const citationID in items) {
            cslCitation.fillFromObject(items[citationID]);
        }
        // adding information to existing information
        const completed = await this.#library.completeSelected(items);
        completed.forEach(function (item) {
            cslCitation.fillFromObject(item);
        });
        // Its place is not known before it is in the document: it is taken
        // for the last, in a note after the last one, and updated where it
        // is once inserted.
        const isNoteStyle = "note" === this.#cslStylesManager.getLastUsedFormat();
        const bNumbered = isNoteStyle || this.#document.numbersCitationsByOrder;
        cslCitation.setNoteIndex(bNumbered ? this.#storage.getLastNoteIndex() + 1 : 0);
        this.#storage.addCslCitation(cslCitation);

        this.#formatter.addItemsOf(cslCitation);
        const htmlCitation = this.#formatter.formatCitation(cslCitation);
        const notesStyle = isNoteStyle ? this.#cslStylesManager.getLastUsedNotesStyle() : null;
        const inserted = await this.#document.insertCitation(
            htmlCitation,
            cslCitation.toJSON(),
            notesStyle,
        );
        return {
            hasNotes: inserted.inNote,
            citationID: cslCitation.citationID,
            id: inserted.id,
        };
    }

    /**
     * The data of a citation of the document with the picked items added,
     * formatted where it stands; nothing is written yet.
     * @param {Object<string, SearchResultItem>} items
     * @param {DocCitation} current
     * @returns {Promise<CitationData | null>} the citation's data, as it was when
     *  it has no id; null when it cannot be read
     */
    async insertSelectedCitationsToCurrent(items, current) {
        const citationObject = current.data;
        if (!citationObject || !citationObject.citationID) {
            return citationObject;
        }
        const citationID = citationObject.citationID;

        const tempCitation = new CSLCitation("");
        tempCitation.fillFromObject(citationObject);
        for (const id in items) {
            tempCitation.fillFromObject(items[id]);
        }
        const completed = await this.#library.completeSelected(items);
        completed.forEach(function (item) {
            tempCitation.fillFromObject(item);
        });

        const { entries } = await this.#readDocument(undefined, tempCitation.toJSON(), citationID);
        await this.#prepareStorage();

        const entry = entries.find((e) => e.cslCitation.citationID === citationID);
        if (!entry) {
            throw new Error("Citation not found");
        }
        this.#formatter.addItemsOf(entry.cslCitation);
        this.#formatter.formatCitation(entry.cslCitation);
        return entry.cslCitation.toJSON();
    }

    /**
     * Updates the bibliography of the document, or inserts one at the cursor
     * if there is none.
     * @returns {Promise<{id: string, isNew: boolean}>}
     */
    async insertBibliography() {
        const { entries, bibliography, bUnreadable } = await this.#readDocument();
        const bNoCitations = entries.length === 0;

        await this.#prepareStorage();

        if (bibliography) {
            if (bUnreadable) {
                return { id: bibliography.id, isNew: false };
            }
            const ids = await this.#document.updateCitations(
                [],
                this.#bibliographyChange(bNoCitations, bibliography),
            );
            return { id: ids ? ids[0] : "", isNew: false };
        }

        let html = this.#makeBibliography();
        if (bNoCitations) {
            html = translate(BIBLIOGRAPHY_PLACEHOLDER);
        }
        if (!this.#cslStylesManager.isLastUsedStyleContainBibliography()) {
            throw "The current bibliographic style does not describe the bibliography";
        }
        const id = await this.#document.insertBibliography(html, null);
        return { id: id, isNew: true };
    }

    /**
     * @param {string} id
     * @param {boolean} [isBefore]
     * @returns {Promise<void>}
     */
    moveCursorOutside(id, isBefore) {
        return this.#document.moveCursorOutside(id, isBefore);
    }

    /**
     * Rewrites the document's citations. By default it reformats the data the
     * document already stores; with refreshItems the library first gives the
     * cited items anew.
     * A citation just inserted is given as insertedCitationID: it was
     * formatted as the last one of the document, its place there unknown,
     * so it is updated even when the other citations are skipped.
     * @param {boolean} [bOverwriteManualEdits] - without it, a numeric style
     *  overwrites manual edits and another style leaves the citations be
     * @param {PrepareOptions & DiscardOptions & {skipCitations?: boolean, skipBibliography?: boolean, insertedCitationID?: string}} [options]
     * @returns {Promise<Array<string>>}
     */
    async updateCslItems(bOverwriteManualEdits, options) {
        const { entries, bibliography, bUnreadable } = await this.#readDocument();
        if (options && options.discardManualEdits) this.#discardManualEdits(entries);
        const bNoCitations = entries.length === 0;

        await this.#prepareStorage(options);

        /** @type {Array<CitationChange>} */
        let changes = [];

        if (typeof bOverwriteManualEdits === "undefined") {
            if (this.#cslStylesManager.getLastUsedFormat() === "numeric") {
                bOverwriteManualEdits = true;
            }
        }
        const bSkipCitations = !!(options && options.skipCitations);
        const bSkipBibliography = !!(options && options.skipBibliography);

        if (typeof bOverwriteManualEdits === "boolean") {
            const insertedCitationID = options && options.insertedCitationID;
            const toUpdate = bSkipCitations
                ? entries.filter(function (entry) {
                    return !!insertedCitationID && entry.cslCitation.citationID === insertedCitationID;
                })
                : entries;
            if (toUpdate.length) {
                changes = await this.#getChanges(toUpdate, bOverwriteManualEdits);
            }
        }

        /** @type {BibliographyChange | null} */
        let bibliographyChange = null;
        if (!bSkipBibliography && bibliography && !bUnreadable) {
            bibliographyChange = this.#bibliographyChange(bNoCitations, bibliography);
        }

        if (changes.length || bibliographyChange) {
            return this.#document.updateCitations(changes, bibliographyChange);
        }
        return [];
    }

    /**
     * Rewrites the citations of a note style where they stand, in notes of
     * the given kind.
     * @param {NoteStyle} notesStyle
     * @param {PrepareOptions & DiscardOptions} [options]
     * @returns {Promise<void>}
     */
    async updateCslItemsInNotes(notesStyle, options) {
        const { entries, bibliography, bUnreadable } = await this.#readDocument(notesStyle);
        if (options && options.discardManualEdits) this.#discardManualEdits(entries);
        const bNoCitations = entries.length === 0;
        this.#numberAsInNotes(entries);

        await this.#prepareStorage(options);

        const changes = await this.#getChanges(entries, false);
        if (changes.length) {
            await this.#document.convertNotesStyle(changes, notesStyle);
        }
        if (bibliography && !bUnreadable) {
            await this.#document.updateCitations([], this.#bibliographyChange(bNoCitations, bibliography));
        }
    }

    /**
     * Writes a citation the user edited.
     * @param {Object & {citationID: string}} updatedData
     * @param {NoteStyle} [notesStyle] - where it stands in a note style
     * @returns {Promise<Array<string>>}
     */
    async updateItem(updatedData, notesStyle) {
        let { entries } = await this.#readDocument(notesStyle, updatedData, updatedData.citationID);

        await this.#prepareStorage();

        entries = entries.filter(function (entry) {
            return entry.cslCitation.citationID === updatedData.citationID;
        });
        // Editing a citation gives up its manual edit, as in Zotero: the
        // user was told so before the edit window opened.
        this.#discardManualEdits(entries);
        const changes = await this.#getChanges(entries, true);

        if (notesStyle && changes.length) {
            await this.#document.convertNotesStyle(changes, notesStyle);
            return [];
        }
        if (changes.length) {
            return this.#document.updateCitations(changes);
        }
        return [];
    }

    /**
     * Moves the citations into notes for a note style, or into the text for
     * any other.
     * @param {NoteStyle | null} [notesStyle] - the notes they go to; none
     *  for the text
     * @param {NoteStyle | null} [oldNotesStyle] - the notes they are in
     * @param {DiscardOptions} [options]
     * @returns {Promise<void>}
     */
    async switchingBetweenNotesAndText(notesStyle, oldNotesStyle, options) {
        const { entries, bibliography, bUnreadable } = await this.#readDocument(oldNotesStyle || undefined);
        if (options && options.discardManualEdits) this.#discardManualEdits(entries);
        const bNoCitations = entries.length === 0;
        if (notesStyle) {
            this.#numberAsInNotes(entries);
        } else {
            // Taken out of their notes, the citations are in no note: as
            // Zotero records a citation in the text. One left in a note
            // with the user's text is given its number by the next update.
            entries.forEach(({ cslCitation }) => cslCitation.setNoteIndex(0));
        }

        await this.#prepareStorage();

        const changes = await this.#getChanges(entries, true);
        if (changes.length) {
            if (notesStyle) {
                // Not all of them need be in the text: a citation edited by
                // hand stays in its note through a change of style, and
                // given up later, it is moved from there.
                await this.#document.convertNotesStyle(changes, notesStyle);
            } else {
                await this.#document.convertNotesToText(changes);
            }
        }
        if (bibliography && !bUnreadable) {
            await this.#document.updateCitations([], this.#bibliographyChange(bNoCitations, bibliography));
        }
    }

    /**
     * Moves the citations between footnotes and endnotes.
     * @param {NoteStyle} notesStyle - the notes they go to
     * @param {NoteStyle} [oldNotesStyle] - the notes they are in
     * @param {DiscardOptions} [options]
     * @returns {Promise<void>}
     */
    async convertNotesStyle(notesStyle, oldNotesStyle, options) {
        const { entries } = await this.#readDocument(oldNotesStyle);
        if (options && options.discardManualEdits) this.#discardManualEdits(entries);
        this.#numberAsInNotes(entries);

        await this.#prepareStorage();

        const changes = await this.#getChanges(entries, false, true);
        if (!changes.length) return;

        await this.#document.convertNotesStyle(changes, notesStyle);
    }

    /**
     * How many citations of the document keep the text they were edited to
     * by hand: no update of the document reaches them. Only the data of the
     * citations is read, not their text or notes.
     * @returns {Promise<number>}
     */
    async countManualEdits() {
        const data = await this.#document.readCitationData();
        return data.filter((citation) => this.#isEditedByHand(citation)).length;
    }

    /**
     * @param {CitationData | null} data - a citation's data
     * @returns {Array<string>} the ids of its items
     */
    getCitationItemIds(data) {
        const items = (data && data.citationItems) || [];
        return items.map(function (/** @type {{id: string|number}} */ item) {
            return String(item.id);
        });
    }

    /**
     * @param {CitationData | null} data - a citation's data
     * @param {boolean} [bUnsaved] - the data is not the document's, such as
     *  with sources just added: saved without edits, it is still saved
     * @returns {Promise<CitationData | null>} the data to
     *  write, null when cancelled or saved without a change
     */
    async showEditCitationWindow(data, bUnsaved) {
        if (!data) return null;
        const bEditedByHand = this.#isEditedByHand(data);
        if (bEditedByHand) {
            const bDiscard = await this.#additionalWindow.show(
                "Edit citation",
                "<p>" +
                    CslHtmlParser.purifyHtml(translate(
                        "This citation was edited by hand. Editing it will discard those edits and format it like the other citations. Do you want to continue?",
                    )) +
                    "</p>",
            );
            if (!bDiscard) return null;
        }
        const result = await this.#additionalWindow.showEditWindow(data);
        if (!result.saved) return null;
        // Saved without a change, an edited citation is still written: its
        // manual edit is given up.
        return result.data || (bUnsaved || bEditedByHand ? data : null);
    }

    /**
     * Asks whether to give up the manual edits of the document's citations,
     * so that new settings reach them too.
     * @param {number} count - the citations edited by hand
     * @returns {Promise<boolean>}
     */
    confirmDiscardManualEdits(count) {
        return this.#additionalWindow.show(
            "Citations edited by hand",
            CslHtmlParser.purifyHtml(
                "<p>" +
                    translate("Citations edited by hand keep their text when the style or other settings change. Number in this document:") +
                    " " + count +
                    "</p><p>" +
                    translate("Do you want to discard those edits and format these citations with the new settings?") +
                    "</p>",
            ),
        );
    }

    /**
     * @param {CitationData} data - a citation's data
     * @returns {boolean} whether it keeps a text edited by hand
     */
    #isEditedByHand(data) {
        // A copy to ask: one with the document's id would take another.
        const citation = new CSLCitation("");
        citation.fillFromObject(data);
        return citation.getDoNotUpdate();
    }

    /**
     * Gives up the manual edits of the citations, so that they are formatted
     * as the others.
     * @param {Array<StoredCitation>} entries
     */
    #discardManualEdits(entries) {
        entries.forEach(({ citation, cslCitation }) => {
            if (cslCitation.getDoNotUpdate()) {
                this.#document.discardManualEdit(cslCitation, citation.text);
            }
        });
    }

    /** @param {string} message */
    async showWarningMessage(message) {
        this.#additionalWindow.showInfoWindow("Warning!", message);
    }

    /** @param {string} message */
    async showSuccessMessage(message) {
        this.#additionalWindow.showInfoWindow("Success!", message, "success");
    }

    /**
     * Reads the document's citations into the storage, in document order.
     * @param {NoteStyle} [notesStyle] - where the citations sit, for their
     *  text in notes
     * @param {CitationData} [updatedData] - a citation's new data, to take for its
     *  stored one
     * @param {string} [updatedCitationId] - the citation it is for
     * @returns {Promise<{entries: Array<StoredCitation>, bibliography: DocBibliography | null, bUnreadable: boolean}>}
     *  bUnreadable: the document has citations, none of which can be read;
     *  its bibliography is then left as it is, not emptied
     */
    async #readDocument(notesStyle, updatedData, updatedCitationId) {
        this.#storage.clear();
        CSLCitation.resetUsedIDs();
        const { citations, bibliography } = await this.#document.readCitations(notesStyle);
        this.#bibliographyEditor.read(bibliography ? bibliography.data : null);

        /** @type {Array<StoredCitation>} */
        const entries = [];
        let bCorrupted = false;
        citations.forEach((citation, index) => {
            const data = citation.data;
            if (!data) {
                bCorrupted = true;
                return;
            }
            // An old citation's id was not kept apart from others'.
            const citationID = citation.legacy ? "" : data.citationID || "";
            const cslCitation = new CSLCitation(citationID);
            if (updatedData && updatedCitationId === citationID) {
                cslCitation.fillFromObject(updatedData);
            } else {
                cslCitation.fillFromObject(data);
            }
            // Where the document cannot tell the note, the citations are
            // numbered as they follow each other.
            cslCitation.setNoteIndex(citation.noteIndex !== null ? citation.noteIndex : index + 1);
            this.#storage.addCslCitation(cslCitation);
            entries.push({ citation: citation, cslCitation: cslCitation });
        });
        if (bCorrupted) {
            this.showWarningMessage(
                "A citation in this document is corrupted and cannot be processed. Please remove or replace it.",
            );
        }
        return {
            entries: entries,
            bibliography: bibliography,
            bUnreadable: bCorrupted && entries.length === 0,
        };
    }

    /**
     * Brings the stored items up to date and the formatter with them.
     * @param {PrepareOptions} [options]
     * @returns {Promise<void>}
     */
    async #prepareStorage(options) {
        const bChanged = await this.#library.prepare(this.#storage, options);
        if (bChanged) {
            // citeproc keeps item data in its own registry and updateItems()
            // does not re-read items it already knows, so an engine built
            // before this would go on formatting the stale copies.
            this.#formatter.invalidate();
        }
        await this.#bibliographyEditor.prepare(this.#storage, options);
        this.#formatter.update();
    }

    /**
     * Numbers the citations as they will be once those in the text are put
     * into notes of their own, as a notes style has them: each takes the
     * note after the last one before it, and the notes after it move up.
     * @param {Array<StoredCitation>} entries - in document order
     */
    #numberAsInNotes(entries) {
        const numbers = numberAsInNotes(entries.map(({ cslCitation }) => cslCitation.getNoteIndex()));
        entries.forEach(({ cslCitation }, index) => {
            cslCitation.setNoteIndex(numbers[index]);
        });
    }

    /**
     * @param {boolean} bNoCitations
     * @param {DocBibliography} bibliography
     * @returns {BibliographyChange}
     */
    #bibliographyChange(bNoCitations, bibliography) {
        let html;
        if (bNoCitations) {
            html = translate(BIBLIOGRAPHY_PLACEHOLDER);
            Asc.scope.bibStyle = {};
        } else {
            html = this.#makeBibliography();
        }
        return { bibliography: bibliography, html: html };
    }

    /** @returns {string} */
    #makeBibliography() {
        try {
            const bibObject = this.#formatter.makeBibliography(
                this.#bibliographyEditor.uncitedItemIds(this.#storage),
                !this.#cslStylesManager.getIncludeUrlForPaperArticles(),
            );
            this.#bibliographyEditor.apply(bibObject, this.#storage);
            const html = bibliographyHtml(bibObject, window.Asc.scope.editorVersion);
            Asc.scope.bibStyle = bibObject[0];
            return html;
        } catch (e) {
            if (false === this.#cslStylesManager.isLastUsedStyleContainBibliography()) {
                this.showWarningMessage("Style does not describe the bibliography");
            } else {
                console.error(e);
                throw "Failed to apply this style.";
            }
            return "";
        }
    }

    /**
     * What to write into the citations: the formatted text and the data of
     * each one that changed. A citation the user edited is asked about,
     * unless manual edits are overwritten.
     * @param {Array<StoredCitation>} entries
     * @param {boolean} bOverwriteManualEdits
     * @param {boolean} [bChangePosition] - every citation moves, so each is
     *  written
     * @returns {Promise<Array<CitationChange>>}
     */
    async #getChanges(entries, bOverwriteManualEdits, bChangePosition) {
        const tempElement = document.createElement("div");
        document.createDocumentFragment().appendChild(tempElement);

        /** @type {Array<CitationChange>} */
        const changes = [];

        // citeproc formats every citation of the document in one pass, each
        // knowing the ones before it; done for each citation in turn, the
        // work grew with the square of their number.
        const formattedById = this.#formatter.formatAll();

        for (let i = entries.length - 1; i >= 0; i--) {
            let bHasChanges = !!bChangePosition;
            const { citation, cslCitation } = entries[i];

            const htmlCitation = formattedById.get(cslCitation.citationID);
            if (htmlCitation === undefined) {
                continue;
            }
            tempElement.innerHTML = CslHtmlParser.purifyHtml(htmlCitation);
            let oldContentInCit = cslCitation.getPlainCitation();
            const oldContentInDoc = citation.text;
            if (oldContentInCit === "") {
                oldContentInCit = oldContentInDoc; // for old versions of plugin, where "PlainCitation" was not saved
            }
            const newContent = tempElement.innerText;

            if (cslCitation.getDoNotUpdate()) {
                continue;
            }

            /** @type {string | null} */
            let html;
            if (oldContentInCit !== oldContentInDoc && !bOverwriteManualEdits) {
                // content was changed by user, but not saved in citation object
                const bKeep = await this.#additionalWindow.show(
                    "Saving custom edits",
                    CslHtmlParser.purifyHtml(this.#manualEditQuestion(newContent, oldContentInDoc)),
                );
                if (bKeep) {
                    this.#document.recordManualEdit(cslCitation, newContent, oldContentInDoc);
                    html = null;
                } else {
                    html = htmlCitation;
                    this.#document.recordText(cslCitation, newContent, null);
                }
                bHasChanges = true;
            } else {
                if (newContent !== oldContentInDoc || oldContentInCit !== oldContentInDoc || oldContentInCit !== newContent) {
                    bHasChanges = true;
                }
                html = htmlCitation;
                this.#document.recordText(cslCitation, newContent, oldContentInCit);
            }

            const data = cslCitation.toJSON();
            // An old citation is written in the current format.
            if (citation.legacy || JSON.stringify(data) !== JSON.stringify(citation.data)) {
                bHasChanges = true;
            }
            if (bHasChanges) {
                changes.push({ citation: citation, data: data, html: html });
            }
        }
        return changes;
    }

    /**
     * @param {string} original - the text the citation is formatted to
     * @param {string} modified - its text in the document
     * @returns {string}
     */
    #manualEditQuestion(original, modified) {
        return (
            "<p>" +
            translate(
                "You have modified this citation since " + this.#name +
                    " generated it. Do you want to keep your modifications and prevent future updates?",
            ) +
            "</p>" +
            "<p>" +
            translate(
                "Clicking „Yes“ will prevent " + this.#name +
                    " from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.",
            ) +
            "</p>" +
            "<p>" + translate("Original:") + " " + CslHtmlParser.escapeHtml(original) + "</p>" +
            "<p>" + translate("Modified:") + " " + CslHtmlParser.escapeHtml(modified) + "</p>"
        );
    }
}

export { CitationService };
