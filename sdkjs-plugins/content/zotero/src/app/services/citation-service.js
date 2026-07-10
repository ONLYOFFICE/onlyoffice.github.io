/*
 * (c) Copyright Ascensio System SIA 2010-2025
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
 * @typedef {import('../csl/citation/citation-item').CitationItem} CitationItem
 * @typedef {(progress: {phase: "fetch"|"apply", completed: number, total: number}) => void} RefreshProgressCallback
 */

import { CitationDocService } from "./citation-doc-service";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { AdditionalWindow } from "../pages/additional-window";

class CitationService {
    /** @type {AdditionalWindow} */
    #additionalWindow;
    /**
     * Caches parsed CSL/locale XML (string -> DOM Element). citeproc-js
     * falls back to a slow, pure-JS node-query engine (CSL.XmlJSON) whenever
     * it's handed a raw XML string, instead of the native, much faster
     * CSL.XmlDOM backend it uses for an already-parsed DOM Element - this
     * was the dominant cost of every citation refresh/format.
     * @type {Map<string, Element|string>}
     */
    #parsedXmlCache = new Map();
    /**
     * Identifies the style+language the current `this._formatter` engine was
     * built for, so `#updateFormatter` can reuse it instead of recompiling
     * the whole CSL style from scratch on every single citation action.
     * @type {string|null}
     */
    #formatterCacheKey = null;

    /**
     * @param {LocalesManager} localesManager
     * @param {CslStylesManager} cslStylesManager
     * @param {ZoteroSdk} sdk
     */
    constructor(localesManager, cslStylesManager, sdk) {
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
     * Determines which Zotero library an item belongs to and which item key
     * to fetch it under. `fetchKey` can differ from the stored `id`:
     * citations created by the Word Zotero plugin (or by this plugin in
     * desktop mode, where CSL JSON ids are citation keys such as Better
     * BibTeX keys) store the real Zotero item key only inside their URIs.
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
            // "users/local/<id>" URIs come from never-synced Zotero libraries;
            // the items only exist in the local desktop library.
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
            // Prefer a URI whose key matches the stored id exactly; otherwise
            // remember the first parseable URI as a fallback.
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
     * @param {(item: CitationItem, id: string) => boolean} shouldRefreshItem
     * @param {"csljson"|"json"} [format]
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<void>}
     */
    async #refreshStoredItems(shouldRefreshItem, format, onProgress) {
        /** @type {Array<{id: string, fetchKey: string, userID?: string|number, groupID?: string|number}>} */
        const itemsToRefresh = [];
        /** @type {Array<string>} */
        const unresolvedIds = [];

        this._storage.forEachItem((item, id) => {
            if (!shouldRefreshItem(item, id)) {
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
            return;
        }

        let completed = 0;
        const reportProgress = () => {
            completed++;
            if (onProgress) {
                onProgress({ phase: "fetch", completed, total });
            }
        };

        // One request per item key, via the single-item endpoint: Zotero's
        // "csljson" format identifies items by their CSL citation key (e.g.
        // a Better BibTeX key), not their Zotero item key, so a batched
        // response cannot be matched back to the stored items. A single-item
        // request maps its returned item back to the requested key
        // unambiguously, and excludes child notes/attachments.
        const keyedRequests = itemsToRefresh.map((context) => {
            const requestPromise = context.groupID
                ? this._sdk.getGroupItemByKey(
                      context.groupID,
                      context.fetchKey,
                      format || "json",
                  )
                : this._sdk.getItemByKey(context.fetchKey, format || "json");

            return requestPromise
                .then((res) => {
                    const items = this.#normalizeSingleItemResponse(res);
                    if (items.length !== 1) {
                        console.warn(
                            "Zotero returned " +
                                items.length +
                                " items for key " +
                                context.fetchKey,
                        );
                        return;
                    }

                    const storedItem = this._storage.getItem(context.id);
                    if (!storedItem) {
                        return;
                    }
                    if ((format || "json") === "csljson") {
                        // A full refresh replaces the item data so fields
                        // deleted in Zotero disappear; the "json" format is
                        // only used for merge-style backfills (abstracts).
                        storedItem.replaceItemDataFromCsl(items[0]);
                    } else {
                        storedItem.fillFromObject(items[0]);
                    }
                })
                .catch((error) => {
                    // One unresolvable item (deleted in Zotero, stale key,
                    // library unavailable) must not abort the whole refresh.
                    console.warn(
                        "Failed to refresh item " +
                            context.id +
                            " (Zotero key " +
                            context.fetchKey +
                            "):",
                        error,
                    );
                })
                .finally(reportProgress);
        });

        const citationKeyRequests = unresolvedIds.map((id) =>
            this.#refreshItemByCitationKey(id)
                .catch((error) => {
                    console.warn(
                        "Failed to re-link item " + id + ":",
                        error,
                    );
                })
                .finally(reportProgress),
        );

        await Promise.all(keyedRequests.concat(citationKeyRequests));
    }

    /**
     * Single-item responses are a one-element array in "csljson" format but
     * a bare object in "json" format.
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
     * Fallback for citations that carry no library information at all:
     * their stored id is typically a CSL citation key (e.g. a Better BibTeX
     * key) from a citation inserted in desktop mode. Searches the library
     * for the key, verifies each candidate by comparing its own csljson
     * citation key, and on a match also records the item's canonical URI so
     * the rewritten field becomes directly resolvable in future refreshes.
     * @param {string} storedId
     * @returns {Promise<void>}
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

            const storedItem = this._storage.getItem(storedId);
            if (!storedItem) {
                return;
            }
            storedItem.replaceItemDataFromCsl(cslItem);

            const library = candidate.library;
            if (library && library.id !== undefined && library.id !== null) {
                const libraryPath =
                    library.type === "group" ? "groups" : "users";
                storedItem.addUri(
                    "http://zotero.org/" +
                        libraryPath +
                        "/" +
                        library.id +
                        "/items/" +
                        candidateKey,
                );
            }
            return;
        }

        console.warn(
            "Could not locate item " +
                storedId +
                " in the Zotero library; it will not be refreshed.",
        );
    }

    /** @returns {Promise<void>} */
    async #hydrateMissingAbstracts() {
        if (!this.#shouldPersistAbstract()) {
            return;
        }

        await this.#refreshStoredItems((item, id) => {
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
        const refreshItems = !!(options && options.refreshItems);

        if (refreshItems) {
            await this.#refreshStoredItems(() => true, "csljson", options && options.onProgress);
            // The reused citeproc engine caches item data inside its
            // registry, so after fetching fresh data the engine must be
            // rebuilt - otherwise it keeps formatting the stale copies.
            this.#formatterCacheKey = null;
        } else {
            await this.#hydrateMissingAbstracts();
        }

        this.#updateFormatter();
    }

    /**
     * @param {CSLCitation} cslCitation
     * @returns {Promise<boolean>}
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
            .then(function () {
                const fragment = document.createDocumentFragment();
                const tempElement = document.createElement("div");

                const citationsPre = self._storage.getCitationsPre(cslCitation.citationID);
                const citationsPost = self._storage.getCitationsPost(cslCitation.citationID);;

                const citations = self._storage.getAllCitationsInJson();
                self._formatter.rebuildProcessorState(citations);
                
                const formattedCitationObj = self._formatter.processCitationCluster(
                    cslCitation.toJSON(),
                    citationsPre,
                    citationsPost
                );

                let htmlCitation = self.#unEscapeHtml(formattedCitationObj[1][0][1]);
                fragment.appendChild(tempElement);
                tempElement.innerHTML = htmlCitation;
                cslCitation.setPlainCitation(tempElement.innerText);
                cslCitation.setFormattedCitation(htmlCitation);
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
     * Fetches the given items one by one via the single-item endpoint. The
     * list endpoint with ?itemKey= would also return each item's child
     * notes/attachments, which must not end up inside citations.
     * @param {Array<any>} items
     * @param {"csljson"|"json"} [format]
     * @returns {Promise<Array<SearchResultItem>>}
     */
    #getSelectedInJsonFormat(items, format) {
        format = format || "json";

        /** @type {Array<Promise<SearchResultItem|null>>} */
        const promises = [];
        for (const citationID in items) {
            const item = items[citationID];
            const groupID = item["groupID"];
            const userID = item["userID"];

            /** @type {Promise<any>|null} */
            let requestPromise = null;
            if (groupID) {
                requestPromise = this._sdk.getGroupItemByKey(
                    groupID,
                    item.id,
                    format,
                );
            } else if (userID || userID === 0 || userID === "0") {
                requestPromise = this._sdk.getItemByKey(item.id, format);
            }
            if (!requestPromise) {
                continue;
            }

            promises.push(
                requestPromise.then((res) => {
                    const resItems = this.#normalizeSingleItemResponse(res);
                    return resItems[0] || null;
                }),
            );
        }

        return Promise.all(promises).then(function (res) {
            return res.filter(function (item) {
                return item !== null;
            });
        });
    }

    #makeBibliography() {
        try {
            const bibItems = new Array(this._storage.size);
            /** @type {false | any} */
            const bibObject = this._formatter.makeBibliography();

            for (let i = 0; i < bibObject[1].length; i++) {
                /** @type {string} */
                let bibText = this.#unEscapeHtml(bibObject[1][i]);
                bibText = bibText
                    .replaceAll('\n', '')
                    .replaceAll('\r', '')
                    .replace(/\s+/g, ' ')
                    .trim();

                const paragraphStart = '<div class="csl-entry">';
                const paragraphEnd = '</div>';
                if (!bibObject[0]['second-field-align']) {
                    bibText = bibText.replace(/<\/?div[^>]*>/g, '');
                    bibText = "<p>" + bibText + "</p>";
                } else if (bibText.indexOf(paragraphStart) === 0 && bibText.endsWith(paragraphEnd)) {
                    bibText = paragraphStart + bibText.substring(paragraphStart.length, bibText.length - paragraphEnd.length).trim() + paragraphEnd;
                }
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
                this.#additionalWindow.showInfoWindow("Warning!", "Style does not describe the bibliography");
            } else {
                console.error(e);
                throw "Failed to apply this style.";
            }
            return "";
        }
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
     * @returns {Promise<{fieldsWithCitations: {field: AddinFieldData, cslCitation: CSLCitation}[], bibFieldValue: string, bibField: AddinFieldData | undefined}>}
     */
    #synchronizeStorageWithDocItems(updatedField) {
        const self = this;
        this._storage.clear();
        CSLCitation.resetUsedIDs();
        return this.citationDocService
            .getAddinZoteroFields()
            .then(function (/** @type {AddinFieldData[]} */ arrFields) {
                let numOfItems = 0;
                let bibFieldValue = " ";

                /** @type {AddinFieldData | undefined} */
                const bibField = arrFields.find(function (field) {
                    return (
                        field.Value.indexOf(self._bibPrefixNew) !== -1 ||
                        field.Value.indexOf(self._bibPrefix) !== -1
                    );
                });
                if (bibField) {
                    let citationObject = self.#extractField(bibField);
                    if (
                        typeof citationObject === "object" &&
                        Object.keys(citationObject).length > 0
                    ) {
                        bibFieldValue = JSON.stringify(citationObject);
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
                    if (updatedField && cslCitation.citationID === updatedField.citationID) {
                        numOfItems += cslCitation.fillFromObject(updatedField);
                    } else {
                        numOfItems +=
                            cslCitation.fillFromObject(citationObject);
                    }
                    self._storage.addCslCitation(cslCitation);

                    return { field: { ...field }, cslCitation: cslCitation };
                });
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
        } else {
            let bibliography = this.#makeBibliography();
            bibField["Content"] = bibliography;
        }

        return bibField;
    }

    /**
     * @param {{field: AddinFieldData, cslCitation: CSLCitation}[]} fieldsWithCitations
     * @param {boolean} bHardRefresh
     * @param {boolean} [bChangePosition]
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<AddinFieldData[]>}
     */
    async #getUpdatedFields(fieldsWithCitations, bHardRefresh, bChangePosition, onProgress) {
        const fragment = document.createDocumentFragment();
        const tempElement = document.createElement("div");
        fragment.appendChild(tempElement);

        /** @type {AddinFieldData[]} */
        const updatedFields = [];
        const total = fieldsWithCitations.length;

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
            tempElement.innerHTML = htmlCitation;
            cslCitation.setFormattedCitation(htmlCitation);
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

            if (oldContentInCit !== oldContentInDoc && !bHardRefresh) {
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
                        text,
                    );
                if (bNeedSaveUserInput) {
                    cslCitation.setDoNotUpdate();
                    // @ts-ignore
                    delete field["Content"];
                } else {
                    field["Content"] = htmlCitation;
                    cslCitation.setPlainCitation(newContent);
                }
                bHasChanges = true;
            } else {
                if (newContent !== oldContentInDoc || oldContentInCit !== oldContentInDoc || oldContentInCit !== newContent) {
                    bHasChanges = true;
                }
                field["Content"] = htmlCitation;
                cslCitation.setPlainCitation(newContent);
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

            if (onProgress) {
                onProgress({
                    phase: "apply",
                    completed: total - i,
                    total,
                });
            }
        }

        return updatedFields;
    }

    /**
     * Parses a CSL/locale XML string into a DOM Element, so citeproc-js uses
     * its native CSL.XmlDOM backend (getElementsByTagName) instead of the
     * pure-JS CSL.XmlJSON fallback it uses for raw strings. Falls back to
     * returning the original string (citeproc's slower but still correct
     * path) if parsing fails for any reason.
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
                "Failed to pre-parse CSL/locale XML, falling back to citeproc's slower string parser:",
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
        // Includes the style content's length so re-uploading/editing a
        // custom style under the same id still invalidates the cache.
        const cacheKey =
            styleId + " " + language + " " + (styleContent ? styleContent.length : 0);

        // Building a CSL.Engine compiles the *entire* style XML into an
        // internal token tree - a fixed cost that's independent of how many
        // items are cited, and the dominant cost of every citation action
        // when repeated needlessly. citeproc-js is designed to have a single
        // long-lived engine per document session, updated via updateItems()
        // as citations change; only rebuild it when the style or language
        // actually changed.
        if (this._formatter && this.#formatterCacheKey === cacheKey) {
            if (arrIds.length) {
                this._formatter.updateItems(arrIds);
            }
            return;
        }

        // @ts-ignore
        this._formatter = new CSL.Engine(
            {
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
                    if (!item) return null;
                    return item.toFlatJSON(index);
                },
            },
            styleContent ? this.#parseXmlCached(styleContent) : styleContent,
            language,
            true,
        );
        this.#formatterCacheKey = cacheKey;
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

    /** @returns {Promise<AddinFieldData | null>} */
    async getCurrentField() {
        return this.citationDocService.getCurrentField();
    }

    /**
     * @returns {Promise<boolean>}
     */
    async saveAsText() {
        const isOk = await this.citationDocService.saveAsText();
        if (isOk) {
            this.#additionalWindow.showInfoWindow(
                "Success!",
                "All active Mendeley citations and Bibliography have been replaced.",
                "success",
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

        try {
            await this.#synchronizeStorageWithDocItems();
            await this.#prepareStorageForCurrentStyle();
        } catch (e) {
            throw e;
        }

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

    /** @returns {Promise<string>} */
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
                    .then((fieldIds) => fieldIds ? fieldIds[0] : "");
            } else {
                return this.#addBibliography(bNoHaveFields, bibFieldValue);
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
     * @param {boolean} [bHardRefresh]
     * @param {{skipCitations?: boolean, skipBibliography?: boolean}} [skipOptions]
     * @returns {Promise<void>}
     */
    async updateCslItems(bHardRefresh, skipOptions) {
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle();

            /** @type {AddinFieldData[]} */
            let updatedFields = [];

            if (typeof bHardRefresh === "undefined") {
                const format = this._cslStylesManager.getLastUsedFormat();
                if (format === "numeric") {
                    bHardRefresh = true;
                }
            }
            const bSkipCitations = !!(skipOptions && skipOptions.skipCitations);
            const bSkipBib = !!(skipOptions && skipOptions.skipBibliography);

            if (!bSkipCitations && typeof bHardRefresh === "boolean") {
                updatedFields = await this.#getUpdatedFields(
                    fieldsWithCitations,
                    bHardRefresh,
                );
            }

            if (!bSkipBib && bibField) {
                updatedFields.push(
                    await this.#updateBibliography(bNoHaveFields, bibField),
                );
            }

            if (updatedFields && updatedFields.length) {
                return this.citationDocService.updateAddinFields(updatedFields);
            }
        } catch (e) {
            throw e;
        }
    }
    /**
     * // it is a crutch, because "SelectAddinField" does not work with notes
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async updateCslItemsInNotes(notesStyle) {
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle();

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
     * Fetches fresh data from Zotero and recomputes formatted citations, without
     * touching the document. Kept separate from `applyRefreshCslItems` so callers
     * can avoid holding a document-wide edit lock for the (potentially slow)
     * network round-trip.
     * @param {{skipCitations?: boolean, skipBibliography?: boolean}} [skipOptions]
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<AddinFieldData[]>}
     */
    async prepareRefreshCslItems(skipOptions, onProgress) {
        const { fieldsWithCitations, bibField } =
            await this.#synchronizeStorageWithDocItems();
        const bNoHaveFields = fieldsWithCitations.length === 0;

        await this.#prepareStorageForCurrentStyle({
            refreshItems: true,
            onProgress,
        });

        /** @type {AddinFieldData[]} */
        let updatedFields = [];

        const bSkipCitations = !!(skipOptions && skipOptions.skipCitations);
        const bSkipBib = !!(skipOptions && skipOptions.skipBibliography);

        if (!bSkipCitations) {
            updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                false,
                false,
                onProgress,
            );
        }

        if (!bSkipBib && bibField) {
            updatedFields.push(
                await this.#updateBibliography(bNoHaveFields, bibField),
            );
        }

        return updatedFields;
    }

    /**
     * @param {AddinFieldData[]} updatedFields
     * @returns {Promise<string[] | void>}
     */
    async applyRefreshCslItems(updatedFields) {
        if (updatedFields && updatedFields.length) {
            return this.citationDocService.updateAddinFields(updatedFields);
        }
    }

    /**
     * @param {"footnotes" | "endnotes"} notesStyle
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<{updatedFields: AddinFieldData[], bibFields: AddinFieldData[], notesStyle: "footnotes" | "endnotes"}>}
     */
    async prepareRefreshCslItemsInNotes(notesStyle, onProgress) {
        const { fieldsWithCitations, bibField } =
            await this.#synchronizeStorageWithDocItems();
        const bNoHaveFields = fieldsWithCitations.length === 0;

        await this.#prepareStorageForCurrentStyle({
            refreshItems: true,
            onProgress,
        });

        /** @type {AddinFieldData[]} */
        const updatedFields = await this.#getUpdatedFields(
            fieldsWithCitations,
            false,
            false,
            onProgress,
        );

        /** @type {AddinFieldData[]} */
        const bibFields = bibField
            ? [await this.#updateBibliography(bNoHaveFields, bibField)]
            : [];

        return { updatedFields, bibFields, notesStyle };
    }

    /**
     * @param {{updatedFields: AddinFieldData[], bibFields: AddinFieldData[], notesStyle: "footnotes" | "endnotes"}} prepared
     * @returns {Promise<void>}
     */
    async applyRefreshCslItemsInNotes(prepared) {
        const { updatedFields, bibFields, notesStyle } = prepared;

        if (updatedFields && updatedFields.length) {
            await this.citationDocService.convertNotesStyle(
                updatedFields,
                notesStyle,
            );
        }

        if (bibFields && bibFields.length) {
            await this.citationDocService.updateAddinFields(bibFields);
        }
    }

    /**
     * @param {Object & {citationID: string}} updatedField
     * @param {"footnotes" | "endnotes"} [notesStyle]
     * @returns {Promise<void>}
     */
    async updateItem(updatedField, notesStyle) {
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems(updatedField);
            const bNoHaveFields = fieldsWithCitations.length === 0;

            await this.#prepareStorageForCurrentStyle();

            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                true,
            );

            if (notesStyle && updatedFields && updatedFields.length) {
                // Editing an existing note citation should update that note in place.
                // The note conversion path uses SelectAddinField, which is unreliable
                // for notes and can move the viewport to unrelated pages.
                return this.citationDocService.updateAddinFieldsInNotes(
                    updatedFields,
                );
            }

            /*if (bibField) {
                updatedFields.push(
                    await this.#updateBibliography(bNoHaveFields, bibField),
                );
            }*/

            if (updatedFields && updatedFields.length) {
                return this.citationDocService.updateAddinFields(updatedFields);
            }
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
     * @returns {Promise<Object & {citationID: string} | null>}
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

    /** @param {string} message */
    async showWarningMessage(message) {
        this.#additionalWindow.showInfoWindow("Warning!", message);
    }
}

export { CitationService };
