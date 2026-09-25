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
 * @typedef {import('../csl/citation/citation-item').CitationItem} CitationItem
 * @typedef {(progress: {phase: "fetch"|"apply", completed: number, total: number}) => void} RefreshProgressCallback
 */

import { CitationDocService } from "./citation-doc-service";
import { CslHtmlParser } from "./csl-html-parser";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { AdditionalWindow } from "../pages/additional-window";

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
    /** @type {boolean} */
    #skipUrlForPaperArticles;
    /** @type {AbbreviationsManager} */
    #abbreviationsManager;
    /** @type {string|undefined} last XML handed to saveStyleToDocument() */
    #lastSavedPrefXml;

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
     * Re-reads stored items from Zotero, one request per item key.
     * @param {(item: CitationItem, id: string) => boolean} shouldRefreshItem
     * @param {"csljson"|"json"} format
     * @param {RefreshProgressCallback} [onProgress]
     * @returns {Promise<boolean>} whether anything was fetched
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
            return false;
        }

        let completed = 0;
        const reportProgress = () => {
            completed++;
            if (onProgress) {
                onProgress({ phase: "fetch", completed, total });
            }
        };

        // One request per key, through the single-item endpoint: the csljson
        // format identifies items by CSL citation key rather than by item
        // key, so a batched answer cannot be matched back to what was asked
        // for. A single-item request maps unambiguously and leaves out the
        // child notes and attachments.
        const keyedRequests = itemsToRefresh.map((context) => {
            const requestPromise = context.groupID
                ? this._sdk.getGroupItemByKey(
                      context.groupID,
                      context.fetchKey,
                      format,
                  )
                : this._sdk.getItemByKey(context.fetchKey, format);

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
                    if (format === "csljson") {
                        // A full refresh replaces the data, so a field
                        // deleted in Zotero disappears here too. The json
                        // format is only used to backfill single fields.
                        storedItem.replaceItemDataFromCsl(items[0]);
                    } else {
                        storedItem.fillFromObject(items[0]);
                    }
                })
                .catch((error) => {
                    // One item that cannot be resolved - deleted in Zotero,
                    // stale key, library unavailable - must not abort the
                    // rest of the refresh.
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

        this.#updateFormatter();
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
            /** @type {false | any} */
            const bibObject = this._formatter.makeBibliography();
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
                if (!item) return null;
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
            const prefix = isBibliography ? this._bibPrefixNew : this._citPrefixNew;
            const suffix = isBibliography ? this._bibSuffixNew : this._citSuffixNew;
            const content = isBibliography
                ? translate("Bibliography")
                : (citationObject.properties && citationObject.properties.plainCitation) ||
                  translate("Citation");

            /** @type {AddinFieldData} */
            const field = {
                FieldId: "",
                Value: prefix + " " + suffix + " " + JSON.stringify(citationObject),
                Content: content,
            };

            const addedField = await this.citationDocService.repairBrokenField(match, field);
            if (addedField) {
                repaired++;
            } else {
                failed++;
            }
        }

        return { repaired, failed };
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
        const prefXml = await this.citationDocService.loadStyleFromDocument();

        if (!prefXml) return;

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
                    localStorage.setItem("zoteroLocale", locale);
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

        if (prefXml === this.#lastSavedPrefXml) return Promise.resolve();

        // Chunk into 255-char segments (OOXML custom property value limit)
        var chunks = [];
        for (var i = 0; i < prefXml.length; i += 255) {
            chunks.push(prefXml.substring(i, i + 255));
        }

        // ApiCustomProperties only exposes Add/Get, no way to remove a
        // property - and Add() overwrites an existing one by name rather
        // than appending, so switching to a style/locale that needs fewer
        // chunks than before would otherwise leave stale trailing
        // ZOTERO_PREF_N values in place. loadStyleFromDocument() reads
        // ZOTERO_PREF_1..N until one is missing, so a leftover chunk from
        // the previous, longer XML would get concatenated onto the new
        // (shorter) one and fail to parse. Blank out a generous number of
        // slots first so old chunks can never outlive the value they came from.
        

        return this.citationDocService.saveStyleToDocument(chunks).then(() => {
            this.#lastSavedPrefXml = prefXml;
        });
        
    }

}

export { CitationService };
