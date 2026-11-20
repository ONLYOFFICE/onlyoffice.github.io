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

/// <reference path="./types.js" />

import { CitationLibrary } from "@shared/services/citation-library";

/**
 * @typedef {import("./zotero").ZoteroSdk} ZoteroSdk
 * @typedef {import("@shared/csl/styles").CslStylesManager} CslStylesManager
 * @typedef {import("@shared/csl/citation").CSLCitationStorage} CSLCitationStorage
 * @typedef {import("@shared/csl/citation/citation-item").CitationItem} CitationItem
 * @typedef {import("@shared/services/citation-library").RefreshProgressCallback} RefreshProgressCallback
 * @typedef {import("@shared/services/citation-library").PrepareOptions} PrepareOptions
 */

/**
 * A cited item as Zotero returned it on a refresh.
 * @typedef {Object} FetchedItem
 * @property {any} cslItem - the item in CSL JSON
 * @property {string} [uri] - a library URI learnt while locating the item
 */

/**
 * @typedef {{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}} LibraryContext
 */

/**
 * The user's Zotero libraries as the source of the cited items: their data
 * is read from there again on a refresh, and fetched where the style needs
 * what the document does not store.
 */
class ZoteroLibrary extends CitationLibrary {
    /** @type {ZoteroSdk} */
    #sdk;
    /** @type {CslStylesManager} */
    #cslStylesManager;
    /**
     * Fresh copies of the cited items, fetched by prefetch() before the
     * document is locked and used up by the refresh that follows. null marks
     * an item Zotero did not return.
     * @type {Map<string, FetchedItem | null> | null}
     */
    #prefetchedItems = null;
    /**
     * The items asked from Zotero for their abstract this session: one that
     * has none there is not asked again on every action.
     * @type {Set<string>}
     */
    #abstractsAskedFor = new Set();

    /**
     * @param {ZoteroSdk} sdk
     * @param {CslStylesManager} cslStylesManager
     */
    constructor(sdk, cslStylesManager) {
        super();
        this.#sdk = sdk;
        this.#cslStylesManager = cslStylesManager;
    }

    /**
     * The items picked for a new citation, in Zotero's json format: it has
     * what the search results leave out.
     * @param {Object<string, SearchResultItem>} items
     * @returns {Promise<Array<Object>>}
     */
    completeSelected(items) {
        /** @type {Array<string|number>} */
        const arrUsrItems = [];
        /** @type {Object<string, Array<string|number>>} */
        const arrGroupsItems = {};
        for (const citationID in items) {
            const item = items[citationID];
            const userID = item["userID"];
            const groupID = item["groupID"];
            if (userID) {
                arrUsrItems.push(item.id);
            } else if (groupID) {
                if (!arrGroupsItems[groupID]) {
                    arrGroupsItems[groupID] = [];
                }
                arrGroupsItems[groupID].push(item.id);
            }
        }

        /** @type {Array<Promise<Array<Object>>>} */
        const promises = [];
        if (arrUsrItems.length) {
            promises.push(
                this.#sdk
                    // @ts-ignore the keys are strings at run time
                    .getItems(null, arrUsrItems, "json")
                    .then(function (res) {
                        return res.items || [];
                    }),
            );
        }

        for (const groupID in arrGroupsItems) {
            if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
                promises.push(
                    this.#sdk
                        // @ts-ignore the keys are strings at run time
                        .getGroupItems(null, groupID, arrGroupsItems[groupID], "json")
                        .then(function (res) {
                            return res.items || [];
                        }),
                );
            }
        }

        return Promise.all(promises).then(function (res) {
            return res.reduce((acc, resItems) => acc.concat(resItems), []);
        });
    }

    /**
     * Re-reads every stored item from Zotero with refreshItems; otherwise
     * fetches the abstracts the style prints and the document lacks.
     * @param {CSLCitationStorage} storage
     * @param {PrepareOptions} [options]
     * @returns {Promise<boolean>} whether anything was fetched
     */
    prepare(storage, options) {
        if (options && options.refreshItems) {
            return this.#refreshStoredItems(storage, () => true, "csljson", options.onProgress);
        }
        return this.#hydrateMissingAbstracts(storage);
    }

    /**
     * Fetches fresh copies of every stored item from Zotero ahead of a
     * refresh, without touching the document. The fetch is one queued
     * request per item and can take a while, so it runs before the document
     * is locked; the refresh then reads the document again, uses these
     * copies and only fetches what was cited meanwhile.
     * @param {CSLCitationStorage} storage
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<void>}
     */
    async prefetch(storage, onProgress) {
        this.#prefetchedItems = null;
        /** @type {Map<string, FetchedItem | null>} */
        const fetched = new Map();
        await this.#refreshStoredItems(storage, () => true, "csljson", onProgress, fetched);
        this.#prefetchedItems = fetched;
    }

    /**
     * Whether the style in use prints abstracts; so it is taken if the
     * style is not loaded yet.
     * @returns {boolean}
     */
    #styleUsesAbstract() {
        const styleId = this.#cslStylesManager.getLastUsedStyleIdOrDefault();
        const styleContent = this.#cslStylesManager.cached(styleId);

        if (typeof styleContent !== "string" || styleContent === "") {
            return true;
        }

        return /\bvariable\s*=\s*"[^"]*\babstract\b[^"]*"/.test(styleContent);
    }

    /**
     * Works out which Zotero library an item belongs to and under which key
     * it has to be fetched. fetchKey can differ from the stored id: a
     * citation written by the Word Zotero plugin, or by this plugin against
     * a local library, is identified by a CSL citation key (a Better BibTeX
     * key, say) and carries the real Zotero item key only inside its URIs.
     * @param {CitationItem} item
     * @param {string} id
     * @returns {LibraryContext | null}
     */
    #getLibraryContext(item, id) {
        const userID = item.getProperty("userID");
        const groupID = item.getProperty("groupID");

        if (userID) {
            return { id: id, fetchKey: id, userID: userID };
        }
        if (groupID) {
            return { id: id, fetchKey: id, groupID: groupID };
        }

        const itemObject = item.toJSON();
        if (!Array.isArray(itemObject.uris)) {
            return null;
        }

        /** @type {LibraryContext | null} */
        let fallback = null;

        for (let i = 0; i < itemObject.uris.length; i++) {
            const uri = itemObject.uris[i];

            /** @type {LibraryContext | null} */
            let context = null;

            const remote = uri.match(/zotero\.org\/(users|groups)\/(\d+)\/items\/([^/?#]+)/i);
            // A "users/local/<id>" URI comes from a library that was never
            // synced, so the item lives only in the local Zotero.
            const local = uri.match(/zotero\.org\/users\/local\/[^/]+\/items\/([^/?#]+)/i);

            if (remote) {
                context =
                    remote[1] === "users"
                        ? { id: id, fetchKey: remote[3], userID: remote[2] }
                        : { id: id, fetchKey: remote[3], groupID: remote[2] };
            } else if (local) {
                context = { id: id, fetchKey: local[1], userID: "local" };
            }

            if (!context) {
                continue;
            }
            // A URI whose key equals the stored id is the certain match;
            // otherwise keep the first parseable one as a fallback.
            if (context.fetchKey === id) {
                return context;
            }
            if (!fallback) {
                fallback = context;
            }
        }

        return fallback;
    }

    /**
     * A single-item answer is a one-element array in csljson format but a
     * bare object in json format.
     * @param {any} res
     * @returns {Array<any>}
     */
    #normalizeSingleItemResponse(res) {
        const items = res && res.items;
        if (Array.isArray(items)) {
            return items;
        }
        return items ? [items] : [];
    }

    /**
     * @param {CSLCitationStorage} storage
     * @param {string} id
     * @param {FetchedItem} fetched
     */
    #applyFetchedItem(storage, id, fetched) {
        const storedItem = storage.getItem(id);
        if (!storedItem) {
            return;
        }
        // A full refresh replaces the data, so a field deleted in Zotero
        // disappears here too.
        storedItem.replaceItemDataFromCsl(fetched.cslItem);
        if (fetched.uri) {
            storedItem.addUri(fetched.uri);
        }
    }

    /**
     * Re-reads stored items from Zotero, the items of one library asked for
     * together. A csljson refresh first uses what prefetch() fetched.
     * @param {CSLCitationStorage} storage
     * @param {(item: CitationItem, id: string) => boolean} shouldRefreshItem
     * @param {"csljson"|"json"} format
     * @param {RefreshProgressCallback} [onProgress]
     * @param {Map<string, FetchedItem | null>} [fetched] - collects what
     *  Zotero returned, null for an item it did not
     * @returns {Promise<boolean>} whether anything was fetched
     */
    async #refreshStoredItems(storage, shouldRefreshItem, format, onProgress, fetched) {
        const prefetched = format === "csljson" ? this.#prefetchedItems : null;
        this.#prefetchedItems = null;
        let bAppliedPrefetched = false;

        /** @type {Array<LibraryContext>} */
        const itemsToRefresh = [];
        /** @type {Array<string>} */
        const unresolvedIds = [];

        storage.forEachItem((item, id) => {
            if (!shouldRefreshItem(item, id)) {
                return;
            }
            if (prefetched && prefetched.has(id)) {
                // Fetched before the lock; an item Zotero did not return
                // then is not asked for again, it keeps its stored data.
                const copy = prefetched.get(id);
                if (copy) {
                    this.#applyFetchedItem(storage, id, copy);
                    bAppliedPrefetched = true;
                }
                return;
            }
            const libraryContext = this.#getLibraryContext(item, id);
            if (libraryContext) {
                itemsToRefresh.push(libraryContext);
            } else {
                unresolvedIds.push(id);
            }
        });

        const total = itemsToRefresh.length + unresolvedIds.length;
        if (total === 0) {
            return bAppliedPrefetched;
        }

        let completed = 0;
        const reportProgress = () => {
            completed++;
            if (onProgress) {
                onProgress({ phase: "fetch", completed, total });
            }
        };

        /**
         * @param {{id: string, fetchKey: string}} context
         * @param {any} item - as Zotero returned it, undefined if it did not
         */
        const applyItem = (context, item) => {
            if (!item) {
                // Deleted in Zotero, stale key: the item keeps its data.
                console.warn(
                    "Zotero returned no item for key " + context.fetchKey + " (" + context.id + ")",
                );
                if (fetched) fetched.set(context.id, null);
                return;
            }
            if (fetched) {
                fetched.set(context.id, { cslItem: item });
            }
            const storedItem = storage.getItem(context.id);
            if (!storedItem) {
                return;
            }
            if (format === "csljson") {
                // A full refresh replaces the data, so a field deleted in
                // Zotero disappears here too. The json format is only used
                // to backfill single fields.
                storedItem.replaceItemDataFromCsl(item);
            } else {
                storedItem.fillFromObject(item);
            }
        };

        // The items of one library are asked for together, up to the
        // number of keys one request takes.
        /** @type {Map<string, Array<LibraryContext>>} */
        const byLibrary = new Map();
        itemsToRefresh.forEach((context) => {
            const library = context.groupID ? "groups/" + context.groupID : "user";
            const contexts = byLibrary.get(library) || [];
            contexts.push(context);
            byLibrary.set(library, contexts);
        });
        const batchSize = this.#sdk.MAX_KEYS_PER_REQUEST;
        /** @type {Array<Promise<void>>} */
        const keyedRequests = [];
        byLibrary.forEach((contexts) => {
            for (let i = 0; i < contexts.length; i += batchSize) {
                const batch = contexts.slice(i, i + batchSize);
                keyedRequests.push(
                    this.#sdk
                        .getItemsByKeys(
                            batch.map((context) => context.fetchKey),
                            batch[0].groupID || null,
                            format,
                        )
                        .then((found) => {
                            const byKey = new Map(found.map((item) => [item.key, item.data]));
                            batch.forEach((context) => applyItem(context, byKey.get(context.fetchKey)));
                        })
                        .catch((error) => {
                            // A library that cannot be read must not abort
                            // the rest of the refresh.
                            console.warn("Failed to refresh " + batch.length + " item(s):", error);
                            batch.forEach((context) => {
                                if (fetched) fetched.set(context.id, null);
                            });
                        })
                        .finally(() => batch.forEach(reportProgress)),
                );
            }
        });

        const citationKeyRequests = unresolvedIds.map((id) =>
            this.#refreshItemByCitationKey(storage, id)
                .then((found) => {
                    if (fetched) fetched.set(id, found);
                })
                .catch((error) => {
                    if (fetched) fetched.set(id, null);
                    console.warn("Failed to re-link item " + id + ":", error);
                })
                .finally(reportProgress),
        );

        await Promise.all(keyedRequests.concat(citationKeyRequests));
        return true;
    }

    /**
     * Last resort for a citation that carries no library information at all:
     * its stored id is then typically a CSL citation key. Searches the
     * library for that key, confirms each candidate by comparing its own
     * csljson citation key, and on a match also records the canonical URI of
     * the item so that the next refresh can resolve it directly.
     * @param {CSLCitationStorage} storage
     * @param {string} storedId
     * @returns {Promise<FetchedItem | null>} what was found, null for nothing
     */
    async #refreshItemByCitationKey(storage, storedId) {
        const searchResult = await this.#sdk.searchUserItemsEverything(storedId);
        const candidates = (searchResult && searchResult.items) || [];

        for (const candidate of candidates) {
            const candidateKey = candidate.key || (candidate.data && candidate.data.key);
            if (!candidateKey) {
                continue;
            }

            const res = await this.#sdk.getItemByKey(candidateKey, "csljson");
            const cslItem = this.#normalizeSingleItemResponse(res)[0];
            if (!cslItem) {
                continue;
            }
            if (cslItem["citation-key"] !== storedId && cslItem.id !== storedId) {
                continue;
            }

            /** @type {FetchedItem} */
            const found = { cslItem: cslItem };
            const library = candidate.library;
            if (library && library.id !== undefined && library.id !== null) {
                const libraryPath = library.type === "group" ? "groups" : "users";
                found.uri =
                    "http://zotero.org/" + libraryPath + "/" + library.id + "/items/" + candidateKey;
            }
            this.#applyFetchedItem(storage, storedId, found);
            return found;
        }

        console.warn(
            "Could not locate item " + storedId + " in the Zotero library; it will not be refreshed.",
        );
        return null;
    }

    /**
     * @param {CSLCitationStorage} storage
     * @returns {Promise<boolean>} whether anything was fetched
     */
    async #hydrateMissingAbstracts(storage) {
        if (!this.#styleUsesAbstract()) {
            return false;
        }

        return this.#refreshStoredItems(storage, (item, id) => {
            if (this.#abstractsAskedFor.has(id)) {
                return false;
            }
            const flatItem = item.toFlatJSON(storage.getItemIndex(id));
            const hasAbstract =
                Object.hasOwnProperty.call(flatItem, "abstract") && flatItem.abstract !== "";
            if (!hasAbstract) {
                // Asked once: an item with no abstract in Zotero keeps
                // having none, and a refresh reads it again anyway.
                this.#abstractsAskedFor.add(id);
            }
            return !hasAbstract;
        }, "json");
    }
}

export { ZoteroLibrary };
