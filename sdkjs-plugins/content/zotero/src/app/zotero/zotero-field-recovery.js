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

import { parseFieldCode } from "../document/field-citation-document";

/**
 * @typedef {import("@shared/csl/styles").CslStylesManager} CslStylesManager
 * @typedef {import("../document/field-citation-document").FieldCitationDocument} FieldCitationDocument
 * @typedef {import("./zotero-document-preferences").ZoteroDocumentPreferences} ZoteroDocumentPreferences
 */

/**
 * Brings back Zotero fields whose data survived without the field: fields
 * flattened into text by a copy between documents, and the links a document
 * converted by Zotero for another word processor carries instead of fields.
 */
class ZoteroFieldRecovery {
    /** @type {FieldCitationDocument} */
    #document;
    /** @type {ZoteroDocumentPreferences} */
    #preferences;

    /**
     * @param {FieldCitationDocument} document
     * @param {ZoteroDocumentPreferences} preferences
     */
    constructor(document, preferences) {
        this.#document = document;
        this.#preferences = preferences;
    }

    /**
     * Repairs citation/bibliography fields that were flattened into plain,
     * visible text - this happens when a field is copy/pasted between two
     * documents and the host editor fails to preserve the field wrapper,
     * leaving the raw "ADDIN ZOTERO_ITEM CSL_CITATION {json}" instruction
     * text visible in a footnote/endnote/paragraph instead of hidden field
     * code. The embedded JSON is still intact, so it's re-wrapped as a real
     * field here; callers are expected to run a normal refresh right after,
     * which will pick up the restored fields like any other citation.
     * @returns {Promise<{repaired: number, failed: number}>}
     */
    async repairBrokenCitations() {
        const fields = this.#document.fields;
        const matches = await fields.scanForBrokenFields();
        let repaired = 0;
        let failed = 0;

        // Repair within each location (body/footnote/endnote) from the
        // highest paragraph index down: repairing a match can change the
        // paragraph count at/after its own position (e.g. if selecting and
        // replacing its paragraph merges it with a neighbor), which would
        // invalidate the still-pending indices captured by the scan above.
        // Working back-to-front means every remaining match's index is still
        // upstream of any such shift.
        matches.sort(function (a, b) {
            if (a.location !== b.location) {
                return a.location < b.location ? 1 : -1;
            }
            return b.index - a.index;
        });

        for (const match of matches) {
            const citationObject = parseFieldCode(match.rawValue);
            if (!citationObject || typeof citationObject !== "object") {
                console.error("Failed to parse broken field JSON:", match.rawValue);
                failed++;
                continue;
            }

            const isBibliography = /ZOTERO_BIBL/i.test(match.rawValue);
            const field = this.#document.fieldFor(citationObject, isBibliography);

            const addedField = await fields.repairBrokenField(match, field);
            if (addedField) {
                repaired++;
            } else {
                failed++;
            }
        }

        return { repaired, failed };
    }

    /**
     * Whether Zotero converted the document for moving it between word
     * processors, so that its citations are links instead of fields.
     * @returns {Promise<boolean>}
     */
    isTransferDocument() {
        return this.#document.fields.isTransferDocument();
    }

    /**
     * Turns a document Zotero converted for moving it between word
     * processors back into one with fields, as Zotero does on a refresh:
     * the links that carry field codes become fields, the document
     * preferences are taken up and what Zotero added is removed. The
     * citations keep the text they had; a refresh brings it up to date.
     * @param {CslStylesManager} styleManager
     * @returns {Promise<{imported: number, failed: number, hasPreferences: boolean, unavailableStyle: boolean}>}
     */
    async importTransferDocument(styleManager) {
        const fields = this.#document.fields;
        const links = await fields.findTransferLinks();
        const preferencesPrefix = "DOCUMENT_PREFERENCES ";
        let imported = 0;
        let failed = 0;
        /** @type {string | null} */
        let preferences = null;

        // From the end, location by location, as in repairBrokenCitations:
        // a change can move what follows it, never what comes before.
        links.sort(function (a, b) {
            if (a.location !== b.location) {
                return a.location < b.location ? 1 : -1;
            }
            return b.paragraph - a.paragraph || b.element - a.element;
        });

        for (const link of links) {
            if (link.text.indexOf(preferencesPrefix) === 0) {
                preferences = link.text.substring(preferencesPrefix.length).trim();
                await fields.removeTransferLinkParagraph(link);
                continue;
            }

            const citationObject = /** @type {any} */ (parseFieldCode(link.text));
            if (!citationObject || typeof citationObject !== "object") {
                console.error("Failed to parse a transferred field:", link.text);
                failed++;
                continue;
            }
            const isBibliography = link.text.indexOf("BIBL ") === 0;
            if (!isBibliography && citationObject.properties) {
                // What the citation read before the transfer is not known,
                // so Zotero drops the mark of a manual edit; so do we.
                delete citationObject.properties.dontUpdate;
            }

            const field = this.#document.fieldFor(citationObject, isBibliography);
            const addedField = await fields.replaceTransferLink(link, field);
            if (addedField) {
                imported++;
            } else {
                failed++;
            }
        }

        await fields.removeTransferHeader();
        let unavailableStyle = false;
        if (preferences) {
            ({ unavailableStyle } = await this.#preferences.apply(preferences, styleManager));
        }
        return { imported, failed, hasPreferences: !!preferences, unavailableStyle };
    }
}

export { ZoteroFieldRecovery };
