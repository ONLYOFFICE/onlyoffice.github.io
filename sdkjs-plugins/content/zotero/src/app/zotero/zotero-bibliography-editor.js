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

import { BibliographyEditor } from "@shared/services/bibliography-editor";
import { CitationItem } from "@shared/csl/citation/citation-item";
import { BibliographyEdits, customEntryToHtml } from "../csl/bibliography";

/**
 * @typedef {import("./zotero").ZoteroSdk} ZoteroSdk
 * @typedef {import("@shared/csl/citation").CSLCitationStorage} CSLCitationStorage
 * @typedef {import("@shared/services/citation-library").PrepareOptions} PrepareOptions
 */

/**
 * What was changed in a bibliography with Zotero's bibliography editor in
 * Word, kept in its field code: items listed without a citation, entries
 * left out, entries rewritten.
 */
class ZoteroBibliographyEditor extends BibliographyEditor {
    /** @type {ZoteroSdk} */
    #sdk;
    /** @type {BibliographyEdits} */
    #edits = new BibliographyEdits();
    /**
     * The items the bibliography lists without a citation, fetched from
     * Zotero once a session, by item key (see BibliographyEdits.itemKey).
     * null marks one Zotero did not return.
     * @type {Map<string, CitationItem | null>}
     */
    #uncitedItems = new Map();

    /** @param {ZoteroSdk} sdk */
    constructor(sdk) {
        super();
        this.#sdk = sdk;
    }

    /** @param {Object | null} data - the field code's JSON */
    read(data) {
        this.#edits = data ? new BibliographyEdits(data) : new BibliographyEdits();
    }

    /**
     * Fetches the items the bibliography lists without a citation; a refresh
     * reads them from Zotero again.
     * @param {CSLCitationStorage} storage
     * @param {PrepareOptions} [options]
     */
    async prepare(storage, options) {
        if (options && options.refreshItems) {
            this.#uncitedItems.clear();
        }
        await this.#loadUncitedItems(storage);
    }

    /** @param {CSLCitationStorage} storage */
    uncitedItemIds(storage) {
        return this.#getUncitedEntries(this.#getCitedItemIds(storage))
            .filter((entry) => this.#uncitedItems.get(entry.key))
            .map((entry) => entry.key);
    }

    /** @param {string} id */
    uncitedItem(id) {
        return this.#uncitedItems.get(id) || null;
    }

    /**
     * Leaves out the entries removed with Zotero's bibliography editor and
     * puts in the text of the entries rewritten there.
     * @param {any} bibObject - as citeproc's makeBibliography() gives it
     * @param {CSLCitationStorage} storage
     */
    apply(bibObject, storage) {
        const edits = this.#edits;
        const entryIds = bibObject && bibObject[0] && bibObject[0].entry_ids;
        if (edits.isEmpty() || !Array.isArray(entryIds)) {
            return;
        }
        const citedIds = this.#getCitedItemIds(storage);
        /**
         * The id the formatter knows the item by: a cited one, or one
         * listed without a citation.
         * @param {Array<string>} uris
         * @param {boolean} citedOnly
         * @returns {string | null}
         */
        const idOf = (uris, citedOnly) => {
            for (const uri of uris) {
                const key = BibliographyEdits.itemKey(uri);
                if (!key) continue;
                const citedId = citedIds.get(key);
                if (citedId !== undefined) return citedId;
                if (!citedOnly && this.#uncitedItems.get(key)) return key;
            }
            return null;
        };

        // As in Zotero: only a cited item can be left out.
        /** @type {Set<string>} */
        const omitted = new Set();
        edits.omitted.forEach((uris) => {
            const id = idOf(uris, true);
            if (id !== null) omitted.add(id);
        });
        /** @type {Map<string, string>} */
        const custom = new Map();
        edits.custom.forEach((entry) => {
            const id = idOf(entry.uris, false);
            if (id !== null) custom.set(id, entry.text);
        });

        /** @type {Array<string>} */
        const entries = [];
        /** @type {Array<Array<string|number>>} */
        const ids = [];
        bibObject[1].forEach((/** @type {string} */ entry, /** @type {number} */ index) => {
            /** @type {Array<string>} */
            const itemIds = (entryIds[index] || []).map(String);
            if (itemIds.length && itemIds.every((id) => omitted.has(id))) {
                return;
            }
            // An entry for several items has no text of its own to replace.
            const text = itemIds.length === 1 ? custom.get(itemIds[0]) : undefined;
            if (text !== undefined) {
                const html = customEntryToHtml(text);
                entry = /^\s*<div class="csl-entry"/.test(html)
                    ? html
                    : '<div class="csl-entry">' + html + "</div>";
            }
            entries.push(entry);
            ids.push(entryIds[index]);
        });
        bibObject[1] = entries;
        bibObject[0].entry_ids = ids;
    }

    /**
     * The cited items by item key (see BibliographyEdits.itemKey), for the
     * URIs in the bibliography code to find them.
     * @param {CSLCitationStorage} storage
     * @returns {Map<string, string>}
     */
    #getCitedItemIds(storage) {
        /** @type {Map<string, string>} */
        const ids = new Map();
        storage.forEachItem((item, id) => {
            const uris = item.toJSON().uris || [];
            uris.forEach((/** @type {string} */ uri) => {
                const key = BibliographyEdits.itemKey(uri);
                if (key && !ids.has(key)) {
                    ids.set(key, String(id));
                }
            });
        });
        return ids;
    }

    /**
     * The items the bibliography lists without a citation that no citation
     * names now, by item key, each with its URIs.
     * @param {Map<string, string>} citedIds
     * @returns {Array<{key: string, uris: Array<string>}>}
     */
    #getUncitedEntries(citedIds) {
        /** @type {Array<{key: string, uris: Array<string>}>} */
        const entries = [];
        for (const uris of this.#edits.uncited) {
            /** @type {Array<string>} */
            const keys = [];
            uris.forEach((uri) => {
                const key = BibliographyEdits.itemKey(uri);
                if (key) keys.push(key);
            });
            if (!keys.length || keys.some((key) => citedIds.has(key))) {
                continue;
            }
            entries.push({ key: keys[0], uris: uris });
        }
        return entries;
    }

    /**
     * Fetches from Zotero the items the bibliography lists without a
     * citation, as far as they are not fetched yet: Zotero keeps only their
     * URIs. One that cannot be fetched is left out of the bibliography, and
     * the bibliography code keeps it all the same.
     * @param {CSLCitationStorage} storage
     * @returns {Promise<void>}
     */
    async #loadUncitedItems(storage) {
        const missing = this.#getUncitedEntries(this.#getCitedItemIds(storage))
            .filter((entry) => !this.#uncitedItems.has(entry.key));
        if (!missing.length) {
            return;
        }

        /** @type {Map<string, Array<{key: string, uris: Array<string>}>>} */
        const byLibrary = new Map();
        missing.forEach((entry) => {
            const library = entry.key.slice(0, entry.key.lastIndexOf("/"));
            const entries = byLibrary.get(library) || [];
            entries.push(entry);
            byLibrary.set(library, entries);
        });

        const batchSize = this.#sdk.MAX_KEYS_PER_REQUEST;
        /** @type {Array<Promise<void>>} */
        const requests = [];
        byLibrary.forEach((entries, library) => {
            const groupId = library.indexOf("groups/") === 0 ? library.substring("groups/".length) : null;
            for (let i = 0; i < entries.length; i += batchSize) {
                const batch = entries.slice(i, i + batchSize);
                const itemKeys = batch.map((entry) => entry.key.substring(entry.key.lastIndexOf("/") + 1));
                requests.push(
                    this.#sdk
                        .getItemsByKeys(itemKeys, groupId, "csljson")
                        .then((found) => {
                            const byKey = new Map(found.map((item) => [item.key, item.data]));
                            batch.forEach((entry, index) => {
                                const data = byKey.get(itemKeys[index]);
                                if (!data) {
                                    this.#uncitedItems.set(entry.key, null);
                                    return;
                                }
                                const item = new CitationItem(entry.key);
                                item.replaceItemDataFromCsl(data);
                                entry.uris.forEach((uri) => item.addUri(uri));
                                this.#uncitedItems.set(entry.key, item);
                            });
                        })
                        .catch((error) => {
                            // Not remembered, so the next update tries again.
                            console.warn(
                                "Failed to fetch " + batch.length + " item(s) listed in the bibliography:",
                                error,
                            );
                        }),
                );
            }
        });
        await Promise.all(requests);
    }
}

export { ZoteroBibliographyEditor };
