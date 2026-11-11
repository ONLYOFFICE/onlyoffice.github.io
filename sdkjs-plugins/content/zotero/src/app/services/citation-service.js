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

/// <reference path="../zotero/types.js" />
/// <reference path="../../../vendor/citeproc/citeproc_commonjs.js" />

/**
 * @typedef {import('../csl/styles').CslStylesManager} CslStylesManager
 * @typedef {import('../zotero/zotero').ZoteroSdk} ZoteroSdk
 * @typedef {import('../csl/locales').LocalesManager} LocalesManager
 * @typedef {import('../csl/abbreviations').AbbreviationsManager} AbbreviationsManager
 * @typedef {(progress: {phase: "fetch"|"apply", completed: number, total: number}) => void} RefreshProgressCallback
 */

/**
 * A cited item as Zotero returned it on a refresh.
 * @typedef {Object} FetchedItem
 * @property {any} cslItem - the item in CSL JSON
 * @property {string} [uri] - a library URI learnt while locating the item
 */

import { CitationDocService } from "./citation-doc-service";
import { CslHtmlParser } from "./csl-html-parser";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { CitationItem } from "../csl/citation/citation-item";
import { BibliographyEdits, customEntryToHtml } from "../csl/bibliography";
import { AdditionalWindow } from "../pages/additional-window";
import { collectItemKeys } from "../shared/item-keys";

class CitationService {
    /** @type {AdditionalWindow} */
    #additionalWindow;
    /**
     * Parsed CSL/locale XML, keyed by the source string. Handed a raw
     * string, citeproc-js falls back to its pure-JS CSL.XmlJSON node engine
     * instead of the native CSL.XmlDOM one it uses for a DOM Element.
     * @type {Map<string, Element|string>}
     */
    #parsedXmlCache = new Map();
    /**
     * Identifies what this._formatter was built for, so an engine that is
     * still valid is reused instead of recompiling the whole CSL style.
     * @type {string|null}
     */
    #formatterCacheKey = null;
    /**
     * The URL setting the items in this._formatter were read with: citeproc
     * keeps the items it has read, so a change of it needs them read again.
     */
    #formatterSkipsUrl = false;
    /** @type {boolean} */
    #skipUrlForPaperArticles;
    /** @type {AbbreviationsManager} */
    #abbreviationsManager;
    /**
     * Fresh copies of the cited items, fetched by prefetchCitedItems() before
     * the document is locked and used up by the refresh that follows. null
     * marks an item Zotero did not return.
     * @type {Map<string, FetchedItem | null> | null}
     */
    #prefetchedItems = null;
    /**
     * What was changed in the document's bibliography with Zotero's
     * bibliography editor, read along with the citations.
     * @type {BibliographyEdits}
     */
    #bibliographyEdits = new BibliographyEdits();
    /**
     * The items the bibliography lists without a citation, fetched from
     * Zotero once a session, by item key (see BibliographyEdits.itemKey).
     * null marks one Zotero did not return.
     * @type {Map<string, CitationItem | null>}
     */
    #uncitedItems = new Map();

    /**
     * @param {LocalesManager} localesManager
     * @param {CslStylesManager} cslStylesManager
     * @param {ZoteroSdk} sdk
     * @param {AbbreviationsManager} abbreviationsManager
     */
    constructor(localesManager, cslStylesManager, sdk, abbreviationsManager) {
        this._bibPlaceholderIfEmpty =
            "Please insert some citation into the document.";
        this._citPrefixNew = "ZOTERO_ITEM";
        this._citSuffixNew = "CSL_CITATION";
        this._citPrefix = "ZOTERO_CITATION";
        this._bibPrefixNew = "ZOTERO_BIBL";
        this._bibSuffixNew = "CSL_BIBLIOGRAPHY";
        this._bibPrefix = "ZOTERO_BIBLIOGRAPHY";
        this._sdk = sdk;
        this._localesManager = localesManager;
        this._cslStylesManager = cslStylesManager;
        this._storage = new CSLCitationStorage();
        /** @type {CSL.Engine} */
        this._formatter;
        this.citationDocService = new CitationDocService(
            this._citPrefixNew,
            this._citSuffixNew,
            this._bibPrefixNew,
            this._bibSuffixNew,
        );
        this.#additionalWindow = new AdditionalWindow();
        this.#skipUrlForPaperArticles = false; // true only for bibliography
        this.#abbreviationsManager = abbreviationsManager;
        this.#abbreviationsManager.load();
    }

    /**
     * Persist abstracts only for CSL styles that explicitly reference them.
     * When the style does not use the variable, storing it only bloats field payloads.
     * @returns {boolean}
     */
    #shouldPersistAbstract() {
        const styleId = this._cslStylesManager.getLastUsedStyleIdOrDefault();
        const styleContent = this._cslStylesManager.cached(styleId);

        if (typeof styleContent !== "string" || styleContent === "") {
            return true;
        }

        return /\bvariable\s*=\s*"[^"]*\babstract\b[^"]*"/.test(
            styleContent,
        );
    }

    /**
     * @param {any} citationObject
     * @returns {void}
     */
    #stripAbstractFromCitation(citationObject) {
        if (!citationObject || !Array.isArray(citationObject.citationItems)) {
            return;
        }

        citationObject.citationItems.forEach(function (citationItem) {
            if (
                citationItem &&
                citationItem.itemData &&
                Object.hasOwnProperty.call(citationItem.itemData, "abstract")
            ) {
                delete citationItem.itemData.abstract;
            }
        });
    }

    /**
     * @param {CSLCitation} cslCitation
     * @returns {any}
     */
    #serializeCitation(cslCitation) {
        const citationObject = cslCitation.toJSON();

        if (!this.#shouldPersistAbstract()) {
            this.#stripAbstractFromCitation(citationObject);
        }

        return citationObject;
    }

    /**
     * Works out which Zotero library an item belongs to and under which key
     * it has to be fetched. fetchKey can differ from the stored id: a
     * citation written by the Word Zotero plugin, or by this plugin against
     * a local library, is identified by a CSL citation key (a Better BibTeX
     * key, say) and carries the real Zotero item key only inside its URIs.
     * @param {CitationItem} item
     * @param {string} id
     * @returns {{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}|null}
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

        /** @type {{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}|null} */
        let fallback = null;

        for (let i = 0; i < itemObject.uris.length; i++) {
            const uri = itemObject.uris[i];

            /** @type {{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}|null} */
            let context = null;

            const remote = uri.match(
                /zotero\.org\/(users|groups)\/(\d+)\/items\/([^/?#]+)/i,
            );
            // A "users/local/<id>" URI comes from a library that was never
            // synced, so the item lives only in the local Zotero.
            const local = uri.match(
                /zotero\.org\/users\/local\/[^/]+\/items\/([^/?#]+)/i,
            );

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
     * Fetches fresh copies of every cited item from Zotero ahead of a refresh,
     * without touching the document. The fetch is one queued request per
     * item and can take a while, so it runs before the document is locked;
     * the refresh then reads the document again, uses these copies and only
     * fetches what was cited meanwhile.
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<void>}
     */
    async prefetchCitedItems(onProgress) {
        this.#prefetchedItems = null;
        await this.#synchronizeStorageWithDocItems();
        /** @type {Map<string, FetchedItem | null>} */
        const fetched = new Map();
        await this.#refreshStoredItems(() => true, "csljson", onProgress, fetched);
        this.#prefetchedItems = fetched;
    }

    /**
     * @param {string} id
     * @param {FetchedItem} fetched
     */
    #applyFetchedItem(id, fetched) {
        const storedItem = this._storage.getItem(id);
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
     * together. A csljson refresh first uses what prefetchCitedItems()
     * fetched.
     * @param {(item: CitationItem, id: string) => boolean} shouldRefreshItem
     * @param {"csljson"|"json"} format
     * @param {RefreshProgressCallback} [onProgress]
     * @param {Map<string, FetchedItem | null>} [fetched] - collects what
     *  Zotero returned, null for an item it did not
     * @returns {Promise<boolean>} whether anything was fetched
     */
    async #refreshStoredItems(shouldRefreshItem, format, onProgress, fetched) {
        const prefetched = format === "csljson" ? this.#prefetchedItems : null;
        this.#prefetchedItems = null;
        let bAppliedPrefetched = false;

        /** @type {Array<{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}>} */
        const itemsToRefresh = [];
        /** @type {Array<string>} */
        const unresolvedIds = [];

        this._storage.forEachItem((item, id) => {
            if (!shouldRefreshItem(item, id)) {
                return;
            }
            if (prefetched && prefetched.has(id)) {
                // Fetched before the lock; an item Zotero did not return
                // then is not asked for again, it keeps its stored data.
                const copy = prefetched.get(id);
                if (copy) {
                    this.#applyFetchedItem(id, copy);
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
                    "Zotero returned no item for key " +
                        context.fetchKey +
                        " (" +
                        context.id +
                        ")",
                );
                if (fetched) fetched.set(context.id, null);
                return;
            }
            if (fetched) {
                fetched.set(context.id, { cslItem: item });
            }
            const storedItem = this._storage.getItem(context.id);
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
        /** @type {Map<string, Array<{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}>>} */
        const byLibrary = new Map();
        itemsToRefresh.forEach((context) => {
            const library = context.groupID ? "groups/" + context.groupID : "user";
            const contexts = byLibrary.get(library) || [];
            contexts.push(context);
            byLibrary.set(library, contexts);
        });
        const batchSize = this._sdk.MAX_KEYS_PER_REQUEST;
        /** @type {Array<Promise<void>>} */
        const keyedRequests = [];
        byLibrary.forEach((contexts) => {
            for (let i = 0; i < contexts.length; i += batchSize) {
                const batch = contexts.slice(i, i + batchSize);
                keyedRequests.push(
                    this._sdk
                        .getItemsByKeys(
                            batch.map((context) => context.fetchKey),
                            batch[0].groupID || null,
                            format,
                        )
                        .then((found) => {
                            const byKey = new Map(
                                found.map((item) => [item.key, item.data]),
                            );
                            batch.forEach((context) =>
                                applyItem(context, byKey.get(context.fetchKey)),
                            );
                        })
                        .catch((error) => {
                            // A library that cannot be read must not abort
                            // the rest of the refresh.
                            console.warn(
                                "Failed to refresh " +
                                    batch.length +
                                    " item(s):",
                                error,
                            );
                            batch.forEach((context) => {
                                if (fetched) fetched.set(context.id, null);
                            });
                        })
                        .finally(() => batch.forEach(reportProgress)),
                );
            }
        });

        const citationKeyRequests = unresolvedIds.map((id) =>
            this.#refreshItemByCitationKey(id)
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
     * @param {string} storedId
     * @returns {Promise<FetchedItem | null>} what was found, null for nothing
     */
    async #refreshItemByCitationKey(storedId) {
        const searchResult = await this._sdk.searchUserItemsEverything(storedId);
        const candidates = (searchResult && searchResult.items) || [];

        for (const candidate of candidates) {
            const candidateKey =
                candidate.key || (candidate.data && candidate.data.key);
            if (!candidateKey) {
                continue;
            }

            const res = await this._sdk.getItemByKey(candidateKey, "csljson");
            const cslItem = this.#normalizeSingleItemResponse(res)[0];
            if (!cslItem) {
                continue;
            }
            if (
                cslItem["citation-key"] !== storedId &&
                cslItem.id !== storedId
            ) {
                continue;
            }

            /** @type {FetchedItem} */
            const found = { cslItem: cslItem };
            const library = candidate.library;
            if (library && library.id !== undefined && library.id !== null) {
                const libraryPath =
                    library.type === "group" ? "groups" : "users";
                found.uri =
                    "http://zotero.org/" +
                    libraryPath +
                    "/" +
                    library.id +
                    "/items/" +
                    candidateKey;
            }
            this.#applyFetchedItem(storedId, found);
            return found;
        }

        console.warn(
            "Could not locate item " +
                storedId +
                " in the Zotero library; it will not be refreshed.",
        );
        return null;
    }

    /** @returns {Promise<boolean>} whether anything was fetched */
    async #hydrateMissingAbstracts() {
        if (!this.#shouldPersistAbstract()) {
            return false;
        }

        return this.#refreshStoredItems((item, id) => {
            const flatItem = item.toFlatJSON(this._storage.getItemIndex(id));
            return !(
                Object.hasOwnProperty.call(flatItem, "abstract") &&
                flatItem.abstract !== ""
            );
        }, "json");
    }

    /**
     * @param {{refreshItems?: boolean, onProgress?: RefreshProgressCallback}} [options]
     * @returns {Promise<void>}
     */
    async #prepareStorageForCurrentStyle(options) {
        const bChanged = (options && options.refreshItems)
            ? await this.#refreshStoredItems(
                  () => true,
                  "csljson",
                  options.onProgress,
              )
            : await this.#hydrateMissingAbstracts();

        if (bChanged) {
            // citeproc keeps item data in its own registry and updateItems()
            // does not re-read items it already knows, so an engine built
            // before this would go on formatting the stale copies.
            this.#formatterCacheKey = null;
        }
        if (options && options.refreshItems) {
            // A refresh reads these from Zotero again as well.
            this.#uncitedItems.clear();
        }
        await this.#loadUncitedItems();

        this.#updateFormatter();
    }

    /**
     * The cited items by item key (see BibliographyEdits.itemKey), for the
     * URIs in the bibliography code to find them.
     * @returns {Map<string, string>}
     */
    #getCitedItemIds() {
        /** @type {Map<string, string>} */
        const ids = new Map();
        this._storage.forEachItem((item, id) => {
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
        for (const uris of this.#bibliographyEdits.uncited) {
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
     * citation, as far as they are not fetched yet: Zotero keeps only
     * their URIs. One that cannot be fetched is left out of the
     * bibliography, and the bibliography code keeps it all the same.
     * @returns {Promise<void>}
     */
    async #loadUncitedItems() {
        const missing = this.#getUncitedEntries(this.#getCitedItemIds())
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

        const batchSize = this._sdk.MAX_KEYS_PER_REQUEST;
        /** @type {Array<Promise<void>>} */
        const requests = [];
        byLibrary.forEach((entries, library) => {
            const groupId = library.indexOf("groups/") === 0
                ? library.substring("groups/".length)
                : null;
            for (let i = 0; i < entries.length; i += batchSize) {
                const batch = entries.slice(i, i + batchSize);
                const itemKeys = batch.map((entry) =>
                    entry.key.substring(entry.key.lastIndexOf("/") + 1)
                );
                requests.push(
                    this._sdk
                        .getItemsByKeys(itemKeys, groupId, "csljson")
                        .then((found) => {
                            const byKey = new Map(
                                found.map((item) => [item.key, item.data]),
                            );
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
                                "Failed to fetch " + batch.length +
                                    " item(s) listed in the bibliography:",
                                error,
                            );
                        }),
                );
            }
        });
        await Promise.all(requests);
    }

    /**
     * Leaves out the entries removed with Zotero's bibliography editor and
     * puts in the text of the entries rewritten there.
     * @param {any} bibObject - as citeproc's makeBibliography() gives it
     * @param {Map<string, string>} citedIds
     */
    #applyBibliographyEdits(bibObject, citedIds) {
        const edits = this.#bibliographyEdits;
        const entryIds = bibObject && bibObject[0] && bibObject[0].entry_ids;
        if (edits.isEmpty() || !Array.isArray(entryIds)) {
            return;
        }
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
     * @param {CSLCitation} cslCitation
     * @returns {Promise<boolean>} - has notes
     */
    #formatInsertLink(cslCitation) {
        const self = this;
        let bUpdateItems = false;

        return Promise.resolve()
            .then(function () {
                cslCitation
                    .getCitationItems()
                    .forEach(function (/** @type {CitationItem} */ item) {
                        if (!self._storage.hasItem(item.id)) {
                            bUpdateItems = true;
                        }
                    });

                if (bUpdateItems) {
                    /** @type {string[]} */
                    var arrIds = [];
                    self._storage.forEachItem(function (item, id) {
                        arrIds.push(id);
                    });
                    self._formatter.updateItems(arrIds);
                }
            })
            .then(() => this.#makeCitationHtml(cslCitation))
            .then((htmlCitation) => {
                let notesStyle = null;
                if ("note" === self._cslStylesManager.getLastUsedFormat()) {
                    notesStyle = self._cslStylesManager.getLastUsedNotesStyle();
                }
                const serializedCitation = self.#serializeCitation(cslCitation);
                return self.citationDocService.addCitation(
                    htmlCitation,
                    JSON.stringify(serializedCitation),
                    notesStyle,
                );
            });
    }

    /**
     * @param {CSLCitation} cslCitation
     * @returns {Promise<string>}
     */
    #formatGetUpdatedFieldHtml(cslCitation) {
        const self = this;
        let bUpdateItems = false;


        return Promise.resolve()
            .then(function () {
                cslCitation
                    .getCitationItems()
                    .forEach(function (/** @type {CitationItem} */ item) {
                        if (!self._storage.hasItem(item.id)) {
                            bUpdateItems = true;
                        }
                    });

                if (bUpdateItems) {
                    /** @type {string[]} */
                    var arrIds = [];
                    self._storage.forEachItem(function (item, id) {
                        arrIds.push(id);
                    });
                    self._formatter.updateItems(arrIds);
                }
            })
            .then(() => this.#makeCitationHtml(cslCitation));
    }

    /**
     * @param {Array<any>} items
     * @returns {Promise<Array<SearchResultItem>>}
     */
    #getSelectedInJsonFormat(items) {
        var arrUsrItems = [];
        /** @type {Object<string, string[]>} */
        var arrGroupsItems = {};
        for (var citationID in items) {
            var item = items[citationID];
            var userID = item["userID"];
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

        /** @type {Array<Promise<SearchResultItem[]>>} */
        var promises = [];
        if (arrUsrItems.length) {
            promises.push(
                this._sdk
                    .getItems(null, arrUsrItems, "json")
                    .then(function (res) {
                        return res.items || [];
                    }),
            );
        }

        for (var groupID in arrGroupsItems) {
            if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
                promises.push(
                    this._sdk
                        .getGroupItems(
                            null,
                            groupID,
                            arrGroupsItems[groupID],
                            "json",
                        )
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

    #makeBibliography() {
        try {
            const bibItems = new Array();
            this.#skipUrlForPaperArticles = !this._cslStylesManager.getIncludeUrlForPaperArticles();
            if (this.#skipUrlForPaperArticles) {
                this.#updateFormatter();
            }
            // Given anew each time: citeproc keeps the uncited items of
            // the previous bibliography otherwise.
            const citedIds = this.#getCitedItemIds();
            this._formatter.updateUncitedItems(
                this.#getUncitedEntries(citedIds)
                    .filter((entry) => this.#uncitedItems.get(entry.key))
                    .map((entry) => entry.key),
            );
            /** @type {false | any} */
            const bibObject = this._formatter.makeBibliography();
            this.#applyBibliographyEdits(bibObject, citedIds);
            if (this.#skipUrlForPaperArticles) {
                this.#skipUrlForPaperArticles = false;
                this.#updateFormatter();
            }
            
            for (let i = 0; i < bibObject[1].length; i++) {
                /** @type {string} */
                let bibText = this.#unEscapeHtml(bibObject[1][i])
                    .replaceAll('\n', '')
                    .replaceAll('\r', '')
                    .replace(/\s+/g, ' ')
                    .trim();

                const paragraphStart = '<div class="csl-entry">';
                const paragraphEnd = '</div>';
                if (bibText.indexOf(paragraphStart) === 0 && bibText.endsWith(paragraphEnd)) {
                    bibText = paragraphStart + bibText.substring(paragraphStart.length, bibText.length - paragraphEnd.length).trim() + paragraphEnd;
                }

                if (!bibObject[0]['second-field-align']) {
                    bibText = bibText.replace(/<div class=\"csl-left-margin\">([\s\S]*?)<\/div>/, '$1\t');
                    bibText = bibText.replace(/<div class=\"csl-block\">([\s\S]*?)<\/div>/, '$1\n\r');
                    bibText = bibText.replace(/<\/?div[^>]*>/g, ' ');
                    bibText = "<p>" + bibText.trim() + "</p>";
                }
                bibText = bibText
                    .split('\n')
                    .map(line => line.replace(/[ ]{2,}/g, ' ').trim())
                    .join('\n');

                if (window.Asc.scope.editorVersion < 9004000) {
                    bibText += '\n';
                }
                bibItems.push(bibText);
            }
            const htmlBibliography = bibItems.join("").trim();
            Asc.scope.bibStyle = bibObject[0];
            return htmlBibliography;
        } catch (e) {
            if (
                false ===
                this._cslStylesManager.isLastUsedStyleContainBibliography()
            ) {
                this.showWarningMessage("Style does not describe the bibliography");
            } else {
                console.error(e);
                throw "Failed to apply this style.";
            }
            return "";
        }
    }

    /**
     * @param {CSLCitation} cslCitation
     * @returns {string}
     */
    #makeCitationHtml(cslCitation) {
        const fragment = document.createDocumentFragment();
        const tempElement = document.createElement("div");

        const citationsPre = this._storage.getCitationsPre(cslCitation.citationID);
        const citationsPost = this._storage.getCitationsPost(cslCitation.citationID);;

        const citations = this._storage.getAllCitationsInJson();
        this._formatter.rebuildProcessorState(citations);
        
        const formattedCitationObj = this._formatter.processCitationCluster(
            cslCitation.toJSON(),
            citationsPre,
            citationsPost
        );

        let htmlCitation = this.#unEscapeHtml(formattedCitationObj[1][0][1]);
        fragment.appendChild(tempElement);
        tempElement.innerHTML = CslHtmlParser.purifyHtml(htmlCitation);
        cslCitation.setPlainCitation(tempElement.innerText);
        
        return htmlCitation;
    }

    /** @param {AddinFieldData} field */
    #extractField(field) {
        let citationObject;
        const citationStartIndex = field.Value.indexOf("{");
        const citationEndIndex = field.Value.lastIndexOf("}");
        if (citationStartIndex !== -1) {
            var citationString = field.Value.slice(
                citationStartIndex,
                citationEndIndex + 1,
            );
            citationObject = JSON.parse(citationString);
        }
        return citationObject;
    }
    /**
     * @param {Object & {citationID: string}} [updatedField]
     * @param {string} [updatedCitationId]
     * @returns {Promise<{fieldsWithCitations: {field: AddinFieldData, cslCitation: CSLCitation}[], bibFieldValue: string, bibField: AddinFieldData | undefined}>}
     */
    #synchronizeStorageWithDocItems(updatedField, updatedCitationId) {
        const self = this;
        this._storage.clear();
        CSLCitation.resetUsedIDs();
        return this.citationDocService
            .getAddinZoteroFields()
            .then(function (/** @type {AddinFieldData[]} */ arrFields) {
                let numOfItems = 0;
                let bibFieldValue = " ";
                self.#bibliographyEdits = new BibliographyEdits();

                /** @type {AddinFieldData | undefined} */
                const bibField = arrFields.find(function (field) {
                    return self.isBibliographyField(field);
                });
                if (bibField) {
                    let citationObject = self.#extractField(bibField);
                    if (
                        typeof citationObject === "object" &&
                        Object.keys(citationObject).length > 0
                    ) {
                        bibFieldValue = JSON.stringify(citationObject);
                        self.#bibliographyEdits = new BibliographyEdits(citationObject);
                    }
                }

                const fields = arrFields.filter(function (field) {
                    return (
                        field.Value.indexOf(self._citPrefixNew) !== -1 ||
                        field.Value.indexOf(self._citPrefix) !== -1
                    );
                });
                let fieldsWithCitations = fields.map(function (field) {
                    let citationObject = self.#extractField(field);

                    let citationID = ""; // old format
                    if (field.Value.indexOf(self._citPrefix) === -1) {
                        citationID = citationObject.citationID;
                    }

                    let cslCitation = new CSLCitation(citationID);
                    if (updatedField && updatedCitationId === citationID) {
                        numOfItems += cslCitation.fillFromObject(updatedField);
                    } else {
                        numOfItems +=
                            cslCitation.fillFromObject(citationObject);
                    }
                    self._storage.addCslCitation(cslCitation);

                    return { field: { ...field }, cslCitation: cslCitation };
                });

                return {
                    bibField: bibField,
                    bibFieldValue: bibFieldValue,
                    fieldsWithCitations: fieldsWithCitations,
                };
            });
    }

    /**
     * @param {boolean} bNoHaveFields
     * @param {string} bibFieldValue
     * @returns
     */
    #addBibliography(bNoHaveFields, bibFieldValue) {
        let bibliography = this.#makeBibliography();
        if (bNoHaveFields) {
            bibliography = translate(this._bibPlaceholderIfEmpty);
        }
        if (this._cslStylesManager.isLastUsedStyleContainBibliography()) {
            return this.citationDocService.addBibliography(
                bibliography,
                bibFieldValue,
            );
        } else {
            throw "The current bibliographic style does not describe the bibliography";
        }
    }

    /**
     * @param {boolean} bNoHaveFields
     * @param {AddinFieldData} bibField
     * @returns {AddinFieldData}
     */
    #updateBibliography(bNoHaveFields, bibField) {
        if (bNoHaveFields) {
            bibField["Content"] = translate(this._bibPlaceholderIfEmpty);
            Asc.scope.bibStyle = {};
        } else {
            let bibliography = this.#makeBibliography();
            bibField["Content"] = bibliography;
        }

        return bibField;
    }

    /**
     * @param {{field: AddinFieldData, cslCitation: CSLCitation}[]} fieldsWithCitations
     * @param {boolean} bOverwriteManualEdits
     * @param {boolean} [bChangePosition]
     * @returns {Promise<AddinFieldData[]>}
     */
    async #getUpdatedFields(fieldsWithCitations, bOverwriteManualEdits, bChangePosition) {
        const fragment = document.createDocumentFragment();
        const tempElement = document.createElement("div");
        fragment.appendChild(tempElement);

        /** @type {AddinFieldData[]} */
        const updatedFields = [];

        for (let i = fieldsWithCitations.length - 1; i >= 0; i--) {
            let bHasChanges = !!bChangePosition;
            const { field, cslCitation } = fieldsWithCitations[i];

            const citationsPre = this._storage.getCitationsPre(cslCitation.citationID);
            const citationsPost = this._storage.getCitationsPost(cslCitation.citationID);;

            const citations = this._storage.getAllCitationsInJson();
            this._formatter.rebuildProcessorState(citations);
            
            const formattedCitationObj = this._formatter.processCitationCluster(
                cslCitation.toJSON(),
                citationsPre,
                citationsPost
            );

            let htmlCitation = this.#unEscapeHtml(formattedCitationObj[1][0][1]);
            tempElement.innerHTML = CslHtmlParser.purifyHtml(htmlCitation);
            let oldContentInCit = cslCitation.getPlainCitation();
            const oldContentInDoc = field["Content"];
            if (oldContentInCit === "") {
                oldContentInCit = oldContentInDoc; // for old versions of plugin, where "PlainCitation" was not saved
            }
            const newContent = tempElement.innerText;

            if (cslCitation.getDoNotUpdate()) {
                continue;
            }

            /*if (oldContentInCit === oldContentInDoc && oldContentInCit === newContent && !bChangePosition) {
                continue;
            }*/

            if (oldContentInCit !== oldContentInDoc && !bOverwriteManualEdits) {
                // content was changed by user, but not saved in citation object
                let text =
                    "<p>" +
                    translate(
                        "You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?",
                    ) +
                    "</p>" +
                    "<p>" +
                    translate(
                        "Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.",
                    ) +
                    "</p>" +
                    "<p>" +
                    translate("Original:") +
                    " " +
                    newContent +
                    "</p>" +
                    "<p>" +
                    translate("Modified:") +
                    " " +
                    oldContentInDoc +
                    "</p>";
                const bNeedSaveUserInput =
                    await this.#additionalWindow.show(
                        "Saving custom edits",
                        CslHtmlParser.purifyHtml(text),
                    );
                if (bNeedSaveUserInput) {
                    cslCitation.setDoNotUpdate();
                    // @ts-ignore
                    delete field["Content"];
                } else {
                    field["Content"] = htmlCitation;
                    cslCitation.setPlainCitation(newContent);
                    cslCitation.removeFormattedCitation();
                }
                bHasChanges = true;
            } else {
                if (newContent !== oldContentInDoc || oldContentInCit !== oldContentInDoc || oldContentInCit !== newContent) {
                    bHasChanges = true;
                }
                field["Content"] = htmlCitation;
                cslCitation.setPlainCitation(newContent);
                // Only a changed text outdates Word's cache; dropping it
                // otherwise would rewrite every field of a Word document.
                if (newContent !== oldContentInCit) {
                    cslCitation.removeFormattedCitation();
                }
            }

            if (cslCitation) {
                const newValue =
                    this._citPrefixNew +
                    " " +
                    this._citSuffixNew +
                    " " +
                    JSON.stringify(this.#serializeCitation(cslCitation));
                if (field["Value"] !== newValue) {
                    bHasChanges = true;
                }
                field["Value"] = newValue;
            }

            if (bHasChanges) {
                updatedFields.push(field);
            }
        }

        return updatedFields;
    }

    /**
     * Parses CSL/locale XML into a DOM Element so citeproc-js takes its
     * native CSL.XmlDOM path. Returns the original string if parsing fails,
     * which citeproc still handles, only slower.
     * @param {string} xmlString
     * @returns {Element|string}
     */
    #parseXmlCached(xmlString) {
        const cached = this.#parsedXmlCache.get(xmlString);
        if (cached) {
            return cached;
        }

        let result = xmlString;
        try {
            const root = new DOMParser().parseFromString(
                xmlString,
                "application/xml",
            ).documentElement;
            if (root && root.nodeName !== "parsererror") {
                result = root;
            }
        } catch (e) {
            console.error(
                "Failed to pre-parse CSL/locale XML, falling back to citeproc's string parser:",
                e,
            );
        }

        this.#parsedXmlCache.set(xmlString, result);
        return result;
    }

    #updateFormatter() {
        const self = this;

        /** @type {string[]} */
        const arrIds = [];
        this._storage.forEachItem(function (item, id) {
            arrIds.push(id);
        });

        const styleId = this._cslStylesManager.getLastUsedStyleIdOrDefault();
        const language = this._localesManager.getLastUsedLanguage();
        const styleContent = this._cslStylesManager.cached(styleId);
        const bAbbreviate =
            this.#abbreviationsManager.isLoaded() &&
            this._cslStylesManager.getAbbreviateJournalTitles();
        // Building a CSL.Engine compiles the whole style XML into a token
        // tree, a fixed cost paid on every citation action. citeproc-js is
        // meant to keep one engine per session and be fed updateItems(), so
        // only rebuild when something the engine baked in has changed. The
        // style content length is part of the key so that re-uploading a
        // custom style under the same id still invalidates it, and the
        // abbreviation flag is there because the hook below is bound once,
        // at construction.
        const cacheKey =
            styleId +
            " " +
            language +
            " " +
            (styleContent ? styleContent.length : 0) +
            " " +
            bAbbreviate;

        if (this._formatter && this.#formatterCacheKey === cacheKey) {
            if (this.#formatterSkipsUrl !== this.#skipUrlForPaperArticles) {
                // The items were read with the other URL setting, and
                // updateItems() reads only the items the engine does not
                // know yet, so it has to forget them first. This costs far
                // less than building a new engine.
                this._formatter.updateItems([]);
                this.#formatterSkipsUrl = this.#skipUrlForPaperArticles;
            }
            if (arrIds.length) {
                this._formatter.updateItems(arrIds);
            }
            return;
        }

        /** @type {Object<string, any>} */
        const sys = {
            /** @param {string} id */
            retrieveLocale: function (id) {
                const localeContent =
                    self._localesManager.getLocale(id) ||
                    self._localesManager.getLocale();
                return localeContent
                    ? self.#parseXmlCached(localeContent)
                    : localeContent;
            },
            /** @param {string} id */
            retrieveItem: function (id) {
                const item = self._storage.getItem(id);
                let index = self._storage.getItemIndex(id);
                if (!item) {
                    // Listed in the bibliography without a citation.
                    const uncited = self.#uncitedItems.get(String(id));
                    return uncited
                        ? uncited.toFlatJSON(0, self.#skipUrlForPaperArticles)
                        : null;
                }
                return item.toFlatJSON(index, self.#skipUrlForPaperArticles);
            },
        };

        if (bAbbreviate) {
            sys.getAbbreviation = this.#abbreviationsManager.createCiteprocHook();
        }

        // @ts-ignore
        this._formatter = new CSL.Engine(
            sys,
            styleContent ? this.#parseXmlCached(styleContent) : styleContent,
            language,
            true,
        );
        this.#formatterCacheKey = cacheKey;
        this.#formatterSkipsUrl = this.#skipUrlForPaperArticles;
        if (arrIds.length) {
            this._formatter.updateItems(arrIds);
        }

        return;
    }

    /**
     * @param {string} htmlString
     * @returns {string}
     */
    #unEscapeHtml(htmlString) {
        return htmlString
            .replace(/\u00A0/g, " ")
            .replace(/&#60;/g, "<")
            .replace(/&#62;/g, ">")
            .replace(/&#38;/g, "&");
    }

    /**
     * Keys of every item already cited somewhere in the document, used to give
     * references the document already relies on priority in the search results.
     * Deliberately does not touch `this._storage`: that is formatting engine
     * state which only the insert/refresh flows may rebuild.
     * @returns {Promise<Set<string>>}
     */
    async getUsedItemKeys() {
        const self = this;
        /** @type {Set<string>} */
        const keys = new Set();
        const arrFields = await this.citationDocService.getAddinZoteroFields();

        arrFields.forEach(function (field) {
            if (
                field.Value.indexOf(self._citPrefixNew) === -1 &&
                field.Value.indexOf(self._citPrefix) === -1
            ) {
                return;
            }
            let citationObject;
            try {
                citationObject = self.#extractField(field);
            } catch (e) {
                // A single unparseable field must not cost the priority
                // sorting of the whole document.
                console.error(e);
                return;
            }
            if (
                !citationObject ||
                !Array.isArray(citationObject.citationItems)
            ) {
                return;
            }
            citationObject.citationItems.forEach(function (citationItem) {
                collectItemKeys(citationItem).forEach(function (key) {
                    keys.add(key);
                });
            });
        });

        return keys;
    }

    /** @returns {Promise<AddinFieldData | null>} */
    async getCurrentField() {
        return this.citationDocService.getCurrentField();
    }

    /**
     * @param {AddinFieldData} field
     * @returns {boolean} whether the field is a Zotero bibliography
     */
    isBibliographyField(field) {
        return (
            !!field.Value &&
            (field.Value.indexOf(this._bibPrefixNew) !== -1 ||
                field.Value.indexOf(this._bibPrefix) !== -1)
        );
    }

    /**
     * @returns {Promise<boolean>}
     */
    async saveAsText() {
        const isOk = await this.citationDocService.saveAsText();
        if (isOk) {
            this.showSuccessMessage(
                "All active Zotero citations and Bibliography have been replaced."
            );
        }
        return isOk;
    }

    /**
     * @param {Array<SearchResultItem>} items
     * @returns {Promise<boolean>}
     */
    async insertSelectedCitations(items) {
        const self = this;

        await this.#synchronizeStorageWithDocItems();
        await this.#prepareStorageForCurrentStyle();

        const cslCitation = new CSLCitation("");
        for (var citationID in items) {
            const item = items[citationID];
            cslCitation.fillFromObject(item);
        }

        return this.#getSelectedInJsonFormat(items).then((items) => {
            // adding information to existing information
            items.forEach(function (item) {
                cslCitation.fillFromObject(item);
            });
            this._storage.addCslCitation(cslCitation);
            return self.#formatInsertLink(cslCitation);
        });
    }

    /**
     * @param {Array<SearchResultItem>} items
     * @param {AddinFieldData} currentField
     * @returns {Promise<AddinFieldData>}
     */
    async insertSelectedCitationsToCurrentField(items, currentField) {
        const citationObject = this.#extractField(currentField);
        if (!citationObject || !citationObject.citationID) {
            return currentField;
        }
        
        let citationID = citationObject.citationID;

        const tempCitation = new CSLCitation("");
        tempCitation.fillFromObject(citationObject);
        for (let id in items) {
            const item = items[id];
            tempCitation.fillFromObject(item);
        }
        const itemsInJsonFormat = await this.#getSelectedInJsonFormat(items);
        itemsInJsonFormat.forEach(function (item) {
            tempCitation.fillFromObject(item);
        });

        const { fieldsWithCitations } = await this.#synchronizeStorageWithDocItems(tempCitation.toJSON(), citationID);
        await this.#prepareStorageForCurrentStyle();

        const cslCitation = fieldsWithCitations.find((f) => f.cslCitation.citationID === citationID)?.cslCitation;
        if (!cslCitation) {
            throw new Error("Citation not found");
        }

        return this.#formatGetUpdatedFieldHtml(cslCitation)
            .then((htmlCitation) => {
                currentField.Content = htmlCitation;
                currentField.Value =
                    this._citPrefixNew +
                    " " +
                    this._citSuffixNew +
                    " " +
                    JSON.stringify(this.#serializeCitation(cslCitation));
                return currentField;
            });
    }

    /**
     * Updates the bibliography of the document, or inserts one at the
     * cursor if there is none.
     * @returns {Promise<{fieldId: string, isNew: boolean}>}
     */
    async insertBibliography() {
        try {
            const { fieldsWithCitations, bibFieldValue, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle();

            if (bibField) {
                const updatedFields = [
                    await this.#updateBibliography(bNoHaveFields, bibField),
                ];
                return this.citationDocService.updateAddinFields(updatedFields)
                    .then((fieldIds) => ({
                        fieldId: fieldIds ? fieldIds[0] : "",
                        isNew: false,
                    }));
            } else {
                return this.#addBibliography(bNoHaveFields, bibFieldValue)
                    .then((fieldId) => ({ fieldId: fieldId, isNew: true }));
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {string} fieldId
     * @param {boolean} [isBegin]
     * @returns {Promise<void>}
     */
    async moveCursorToField(fieldId, isBegin) {
        return this.citationDocService.moveCursorToField(fieldId, isBegin);
    }

    /**
     * @returns {Promise<void>}
     */
    async addParagraphAfterCursor() {
        return this.citationDocService.addParagraphAfterCursor();
    }

    /**
     * @param {string} fieldId
     * @param {boolean} [isBeforeField]
     * @returns {Promise<void>}
     */
    async moveCursorOutsideField(fieldId, isBeforeField) {
        return this.citationDocService.moveCursorOutsideField(fieldId, isBeforeField);
    }

    /**
     * @returns {Promise<void>}
     */
    async moveCursorRight() {
        return this.citationDocService.moveCursorRight();
    }

    /**
     * Rewrites the document's citations. By default it reformats the data the
     * document already stores; with refreshItems it first re-reads every cited
     * item from Zotero and replaces that data.
     * @param {boolean|undefined} bOverwriteManualEdits
     * @param {{skipCitations?: boolean, skipBibliography?: boolean, refreshItems?: boolean, onProgress?: RefreshProgressCallback}} [options]
     * @returns {Promise<Array<string>>}
     */
    async updateCslItems(bOverwriteManualEdits, options) {
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle(options);

            /** @type {AddinFieldData[]} */
            let updatedFields = [];

            if (typeof bOverwriteManualEdits === "undefined") {
                const format = this._cslStylesManager.getLastUsedFormat();
                if (format === "numeric") {
                    bOverwriteManualEdits = true;
                }
            }
            const bSkipCitations = !!(options && options.skipCitations);
            const bSkipBibliography = !!(
                options && options.skipBibliography
            );

            if (!bSkipCitations && typeof bOverwriteManualEdits === "boolean") {
                updatedFields = await this.#getUpdatedFields(
                    fieldsWithCitations,
                    bOverwriteManualEdits,
                );
            }

            if (!bSkipBibliography && bibField) {
                updatedFields.push(
                    await this.#updateBibliography(bNoHaveFields, bibField),
                );
            }

            if (updatedFields && updatedFields.length) {
                return this.citationDocService.updateAddinFields(updatedFields);
            }
            return [];
        } catch (e) {
            throw e;
        }
    }
    /**
     * // it is a crutch, because "SelectAddinField" does not work with notes
     * @param {"footnotes" | "endnotes"} notesStyle
     * @param {{skipCitations?: boolean, skipBibliography?: boolean, refreshItems?: boolean, onProgress?: RefreshProgressCallback}} [options]
     * @returns {Promise<void>}
     */
    async updateCslItemsInNotes(notesStyle, options) {
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle(options);

            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                false,
            );

            if (updatedFields && updatedFields.length) {
                await this.citationDocService.convertNotesStyle(
                    updatedFields,
                    notesStyle,
                );
            }

            if (bibField) {
                const bibFields = [
                    await this.#updateBibliography(bNoHaveFields, bibField),
                ];
                await this.citationDocService.updateAddinFields(bibFields);
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {Object & {citationID: string}} updatedField
     * @param {"footnotes" | "endnotes"} [notesStyle]
     * @returns {Promise<Array<string>>}
     */
    async updateItem(updatedField, notesStyle) {
        try {
            let { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems(updatedField, updatedField.citationID);
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle();

            if (updatedField) {
                fieldsWithCitations = fieldsWithCitations.filter(
                    function (b) {
                        if (
                            b.cslCitation.citationID ===
                            updatedField.citationID
                        ) {
                            return true;
                        }
                        return false;
                    },
                );
            }
            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                true,
            );

            if (notesStyle && updatedFields && updatedFields.length) {
                await this.citationDocService.convertNotesStyle(
                    updatedFields,
                    notesStyle,
                );
                updatedFields = [];
            }

            /*if (bibField) {
                updatedFields.push(
                    await this.#updateBibliography(bNoHaveFields, bibField),
                );
            }*/

            if (updatedFields && updatedFields.length) {
                return this.citationDocService.updateAddinFields(updatedFields);
            }
            return [];
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {"footnotes" | "endnotes"} [notesStyle]
     * @returns {Promise<void>}
     */
    async switchingBetweenNotesAndText(notesStyle) {
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle();

            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                true,
            );

            if (updatedFields && updatedFields.length) {
                if (notesStyle) {
                    await this.citationDocService.convertTextToNotes(
                        updatedFields,
                        notesStyle,
                    );
                } else {
                    await this.citationDocService.convertNotesToText(
                        updatedFields,
                    );
                }
            }

            if (bibField) {
                const bibFields = [
                    await this.#updateBibliography(bNoHaveFields, bibField),
                ];
                await this.citationDocService.updateAddinFields(bibFields);
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertNotesStyle(notesStyle) {
        try {
            const { fieldsWithCitations } =
                await this.#synchronizeStorageWithDocItems();

            await this.#prepareStorageForCurrentStyle();

            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                false,
                true,
            );

            if (!updatedFields || !updatedFields.length) return;

            await this.citationDocService.convertNotesStyle(
                updatedFields,
                notesStyle,
            );
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {AddinFieldData} field
     * @returns {Array<string>}
     */
    getCitationItemIds(field) {
        const citationObject = this.#extractField(field);
        const items =
            (citationObject && citationObject.citationItems) || [];
        return items.map(function (/** @type {{id: string|number}} */ item) {
            return String(item.id);
        });
    }

    /**
     * @param {AddinFieldData} field
     * @returns {Promise<Object & {citationID: string, citationItems?: CitationItem[]} | null>}
     */
    async showEditCitationWindow(field) {
        if (!field) return null;

        const citationObject = this.#extractField(field);
        const updatedField =
            await this.#additionalWindow.showEditWindow(citationObject);
        if (!updatedField) {
            // Cancel click
            return null;
        }
        return updatedField;
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
        const matches = await this.citationDocService.scanForBrokenFields();
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
            let citationObject;
            try {
                citationObject = this.#extractField({ Value: match.rawValue, FieldId: "", Content: "" });
            } catch (e) {
                console.error("Failed to parse broken field JSON:", e);
            }
            if (!citationObject || typeof citationObject !== "object") {
                failed++;
                continue;
            }

            const isBibliography = /ZOTERO_BIBL/i.test(match.rawValue);
            const field = this.#makeFieldData(citationObject, isBibliography);

            const addedField = await this.citationDocService.repairBrokenField(match, field);
            if (addedField) {
                repaired++;
            } else {
                failed++;
            }
        }

        return { repaired, failed };
    }

    /**
     * The field for a citation or a bibliography whose data is known but
     * whose field is gone. Its text is the one the citation had, until a
     * refresh writes it anew.
     * @param {Object} citationObject - the data of the field code
     * @param {boolean} isBibliography
     * @returns {AddinFieldData}
     */
    #makeFieldData(citationObject, isBibliography) {
        const prefix = isBibliography ? this._bibPrefixNew : this._citPrefixNew;
        const suffix = isBibliography ? this._bibSuffixNew : this._citSuffixNew;
        const properties = /** @type {{properties?: {plainCitation?: string}}} */ (
            citationObject
        ).properties;
        const content = isBibliography
            ? translate("Bibliography")
            : (properties && properties.plainCitation) || translate("Citation");

        const json = JSON.stringify(citationObject);
        return {
            FieldId: "",
            Value: isBibliography
                ? prefix + " " + json + " " + suffix
                : prefix + " " + suffix + " " + json,
            Content: content,
        };
    }

    /**
     * Whether Zotero converted the document for moving it between word
     * processors, so that its citations are links instead of fields.
     * @returns {Promise<boolean>}
     */
    isTransferDocument() {
        return this.citationDocService.isTransferDocument();
    }

    /**
     * Turns a document Zotero converted for moving it between word
     * processors back into one with fields, as Zotero does on a refresh:
     * the links that carry field codes become fields, the document
     * preferences are taken up and what Zotero added is removed. The
     * citations keep the text they had; a refresh brings it up to date.
     * @param {import('../csl/styles').CslStylesManager} styleManager
     * @returns {Promise<{imported: number, failed: number, hasPreferences: boolean}>}
     */
    async importTransferDocument(styleManager) {
        const links = await this.citationDocService.findTransferLinks();
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
                await this.citationDocService.removeTransferLinkParagraph(link);
                continue;
            }

            let citationObject;
            try {
                citationObject = this.#extractField({ Value: link.text, FieldId: "", Content: "" });
            } catch (e) {
                console.error("Failed to parse a transferred field:", e);
            }
            if (!citationObject || typeof citationObject !== "object") {
                failed++;
                continue;
            }
            const isBibliography = link.text.indexOf("BIBL ") === 0;
            if (!isBibliography && citationObject.properties) {
                // What the citation read before the transfer is not known,
                // so Zotero drops the mark of a manual edit; so do we.
                delete citationObject.properties.dontUpdate;
            }

            const field = this.#makeFieldData(citationObject, isBibliography);
            const addedField = await this.citationDocService.replaceTransferLink(link, field);
            if (addedField) {
                imported++;
            } else {
                failed++;
            }
        }

        await this.citationDocService.removeTransferHeader();
        if (preferences) {
            this.#applyDocumentPreferences(preferences, styleManager);
        }
        return { imported, failed, hasPreferences: !!preferences };
    }

    /** @param {string} message */
    async showWarningMessage(message) {
        this.#additionalWindow.showInfoWindow("Warning!", message);
    }
    /** @param {string} message */
    async showSuccessMessage(message) {
        this.#additionalWindow.showInfoWindow(
            "Success!",
            message,
            "success",
        );
    }

    /**
     * Reads ZOTERO_PREF from document custom properties and applies it,
     * unconditionally - this document's own saved style should win over
     * whatever was last used elsewhere, since saveStyleToDocument() keeps
     * ZOTERO_PREF in sync with every citation change made here. This
     * preserves the citation style when opening a DOCX created by the
     * Word Zotero plugin, or a previous session of this plugin.
     * @param {import('../csl/styles').CslStylesManager} styleManager
     * @returns {Promise<void>}
     */
    async loadStyleFromDocument(styleManager) {
        await this.citationDocService
            .loadEmbeddedStyle()
            .then((style) => {
                styleManager.setDocumentStyle(style);
            })
            .catch((e) => console.error("Failed to read the document style:", e));

        const prefXml = await this.citationDocService.loadStyleFromDocument();

        if (!prefXml) return;

        this.#applyDocumentPreferences(prefXml, styleManager);
    }

    /**
     * Saves the style, the language and the note type of Zotero's document
     * preferences as the ones to use.
     * @param {string} prefXml - as Zotero writes it in ZOTERO_PREF
     * @param {import('../csl/styles').CslStylesManager} styleManager
     */
    #applyDocumentPreferences(prefXml, styleManager) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(prefXml, "text/xml");
            const styleEl = xmlDoc.querySelector("style");
            if (styleEl) {
                const styleUrl = styleEl.getAttribute("id") || "";
                const locale = styleEl.getAttribute("locale") || "";
                if (styleUrl) {
                    const styleId = styleUrl.replace(/^.*\/styles\//, "");
                    if (styleId) {
                        localStorage.setItem("zoteroStyleId", styleId);
                    }
                }
                if (locale) {
                    this._localesManager.saveLastUsedLanguage(locale);
                }
            }
            const noteTypePref = xmlDoc.querySelector('pref[name="noteType"]');
            if (noteTypePref) {
                const noteType = noteTypePref.getAttribute("value");
                if (noteType === "1") {
                    styleManager.saveLastUsedNotesStyle("footnotes");
                } else if (noteType === "2") {
                    styleManager.saveLastUsedNotesStyle("endnotes");
                }
            }
        } catch (e) {
            console.error("Failed to parse ZOTERO_PREF XML:", e);
        }
    }
    
    /**
     * Writes ZOTERO_PREF_{n} to document custom properties so that Word/Zotero
     * can read the chosen citation style when the file is opened there.
     * The XML is chunked into 255-char segments across multiple properties
     * to respect the OOXML custom property value length limit.
     * @param {import('../csl/styles').CslStylesManager} styleManager
     * @param {string} locale
     * @returns {Promise<void>}
     */
    async saveStyleToDocument(styleManager, locale) {;
        const styleId = styleManager.getLastUsedStyleId();
        if (!styleId) return Promise.resolve();

        const format = styleManager.getLastUsedFormat();
        const notesStyle = styleManager.getLastUsedNotesStyle();

        let noteTypeValue = "0";
        if (format === "note") {
            noteTypeValue = notesStyle === "endnotes" ? "2" : "1";
        }

        const hasBib = styleManager.isLastUsedStyleContainBibliography() ? "1" : "0";

        const prefXml =
            '<data data-version="3" zotero-version="5.0.96">' +
            '<style id="http://www.zotero.org/styles/' + styleId + '"' +
            ' locale="' + locale + '"' +
            ' hasBibliography="' + hasBib + '"' +
            ' bibliographyStyleHasBeenSet="1"/>' +
            '<prefs>' +
            '<pref name="fieldType" value="Field"/>' +
            '<pref name="automaticJournalAbbreviations" value="true"/>' +
            '<pref name="noteType" value="' + noteTypeValue + '"/>' +
            '</prefs>' +
            '</data>';

        const savedPrefXml = await this.citationDocService.loadStyleFromDocument();
        if (prefXml !== savedPrefXml) {
            await this.#savePrefXmlToDocument(prefXml);
        }
        await this.#saveEmbeddedStyle(styleManager);
    }

    /**
     * @param {string} prefXml
     * @returns {Promise<void>}
     */
    async #savePrefXmlToDocument(prefXml) {
        // Chunk into 255-char segments (OOXML custom property value limit)
        var chunks = [];
        for (var i = 0; i < prefXml.length; i += 255) {
            chunks.push(prefXml.substring(i, i + 255));
        }

        return this.citationDocService.saveStyleToDocument(chunks);
    }

    /**
     * Keeps the CSL of the style in use inside the document, so the document
     * can be formatted where the style repository is out of reach. A style
     * the repository updated replaces the stored one on the next save, once
     * the citations have been formatted with it.
     * @param {import('../csl/styles').CslStylesManager} styleManager
     * @returns {Promise<void>}
     */
    async #saveEmbeddedStyle(styleManager) {
        const style = styleManager.getStyleToEmbed();
        const key = embeddedStyleKey(style);
        try {
            const stored = await this.citationDocService.loadEmbeddedStyleVersion();
            if (key === embeddedStyleKey(stored)) {
                return;
            }
            if (style) {
                await this.citationDocService.saveEmbeddedStyle(style);
            } else {
                await this.citationDocService.removeEmbeddedStyle();
            }
        } catch (e) {
            console.error("Failed to store the style in the document:", e);
        }
        
    }

}

/**
 * @param {{styleId: string, updated: string} | null} style
 * @returns {string}
 */
function embeddedStyleKey(style) {
    return style ? style.styleId + "\n" + style.updated : "";
}

export { CitationService };
