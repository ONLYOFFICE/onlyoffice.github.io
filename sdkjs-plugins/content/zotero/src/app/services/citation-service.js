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
 */

import { CitationDocService } from "./citation-doc-service";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { AdditionalWindow } from "../pages/additional-window";

class CitationService {
    /** @type {AdditionalWindow} */
    #additionalWindow;
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
     * @param {CitationItem} item
     * @param {string} id
     * @returns {{id: string, userID?: string|number, groupID?: string|number}|null}
     */
    #getLibraryContext(item, id) {
        const userID = item.getProperty("userID");
        const groupID = item.getProperty("groupID");

        if (userID) {
            return { id: id, userID: userID };
        }
        if (groupID) {
            return { id: id, groupID: groupID };
        }

        const itemObject = item.toJSON();
        if (!Array.isArray(itemObject.uris)) {
            return null;
        }

        for (let i = 0; i < itemObject.uris.length; i++) {
            const uri = itemObject.uris[i];
            const match = uri.match(
                /zotero\.org\/(users|groups)\/([^/]+)\/items\/([^/?#]+)/i,
            );

            if (!match || match[3] !== id) {
                continue;
            }

            if (match[1] === "users") {
                return { id: id, userID: match[2] };
            }

            return { id: id, groupID: match[2] };
        }

        return null;
    }

    /** @returns {Promise<void>} */
    async #hydrateMissingAbstracts() {
        if (!this.#shouldPersistAbstract()) {
            return;
        }

        /** @type {Record<string, {id: string, userID?: string|number, groupID?: string|number}>} */
        const itemsToRefresh = {};

        this._storage.forEachItem((item, id) => {
            const flatItem = item.toFlatJSON(this._storage.getItemIndex(id));
            if (
                Object.hasOwnProperty.call(flatItem, "abstract") &&
                flatItem.abstract !== ""
            ) {
                return;
            }

            const libraryContext = this.#getLibraryContext(item, id);
            if (libraryContext) {
                itemsToRefresh[id] = libraryContext;
            }
        });

        if (Object.keys(itemsToRefresh).length === 0) {
            return;
        }

        const refreshedItems = await this.#getSelectedInJsonFormat(itemsToRefresh);

        refreshedItems.forEach((item) => {
            const itemId = item.key || (item.data && item.data.key) || item.id;
            if (!itemId) {
                return;
            }

            const storedItem = this._storage.getItem(itemId);
            if (storedItem) {
                storedItem.fillFromObject(item);
            }
        });
    }

    /** @returns {Promise<void>} */
    async #prepareStorageForCurrentStyle() {
        await this.#hydrateMissingAbstracts();
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
        tempElement.innerHTML = htmlCitation;
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
     * @returns {Promise<AddinFieldData[]>}
     */
    async #getUpdatedFields(fieldsWithCitations, bHardRefresh, bChangePosition) {
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
            tempElement.innerHTML = htmlCitation;
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
        }

        return updatedFields;
    }

    #updateFormatter() {
        const self = this;

        /** @type {string[]} */
        const arrIds = [];
        this._storage.forEachItem(function (item, id) {
            arrIds.push(id);
        });

        /** @type {Object<string, any>} */
        const sys = {
            /** @param {string} id */
            retrieveLocale: function (id) {
                if (self._localesManager.getLocale(id)) {
                    return self._localesManager.getLocale(id);
                }
                return self._localesManager.getLocale();
            },
            /** @param {string} id */
            retrieveItem: function (id) {
                const item = self._storage.getItem(id);
                let index = self._storage.getItemIndex(id);
                if (!item) return null;
                return item.toFlatJSON(index, self.#skipUrlForPaperArticles);
            },
        };

        if (
            this.#abbreviationsManager.isLoaded() &&
            this._cslStylesManager.getAbbreviateJournalTitles()
        ) {
            sys.getAbbreviation = this.#abbreviationsManager.createCiteprocHook();
        }

        // @ts-ignore
        this._formatter = new CSL.Engine(
            sys,
            this._cslStylesManager.cached(
                this._cslStylesManager.getLastUsedStyleIdOrDefault(),
            ),
            this._localesManager.getLastUsedLanguage(),
            true,
        );
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
     * @param {boolean} [bHardRefresh]
     * @returns {Promise<Array<string>>}
     */
    async updateCslItems(bHardRefresh) {
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
            if (typeof bHardRefresh === "boolean") {
                updatedFields = await this.#getUpdatedFields(
                    fieldsWithCitations,
                    bHardRefresh,
                );
            }

            if (bibField) {
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
