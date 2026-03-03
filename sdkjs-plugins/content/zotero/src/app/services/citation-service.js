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
/// <reference path="../../../scripts/citeproc/citeproc_commonjs.js" />

/**
 * @typedef {import('../csl/styles').CslStylesManager} CslStylesManager
 * @typedef {import('../zotero/zotero').ZoteroSdk} ZoteroSdk
 * @typedef {import('../csl/locales').LocalesManager} LocalesManager
 * @typedef {import('../csl/citation/citation-item').CitationItem} CitationItem
 */

import { CitationDocService } from "./citation-doc-service";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { AdditionalWindow } from "../pages/additional-window";

class CitationService {
    /** @type {AdditionalWindow} */
    #additionalWindow;

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

    /** @returns {boolean} */
    #checkEditor() {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9003000) {
            this.#additionalWindow.showInfoWindow(
                "Something went wrong",
                "Update your editor to use this feature.",
                "warning",
            );
            return false;
        }
        return true;
    }

    /**
     * @param {CSLCitation} cslCitation
     * @returns {Promise<Array<string|number>>}
     */
    #formatInsertLink(cslCitation) {
        const self = this;
        let bUpdateItems = false;
        /** @type {Array<string|number>} */
        const keys = [];

        return Promise.resolve()
            .then(function () {
                cslCitation
                    .getCitationItems()
                    .forEach(function (/** @type {CitationItem} */ item) {
                        if (!self._storage.hasItem(item.id)) {
                            bUpdateItems = true;
                        }
                        keys.push(item.id);
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
                let notesStyle = null;
                if ("note" === self._cslStylesManager.getLastUsedFormat()) {
                    notesStyle = self._cslStylesManager.getLastUsedNotesStyle();
                }
                return self.citationDocService.addCitation(
                    htmlCitation,
                    JSON.stringify(cslCitation.toJSON()),
                    notesStyle,
                );
            })
            .then(function () {
                return keys;
            });
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
                        var items = res.items || [];
                        return items;
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
                            var items = res.items || [];
                            return items;
                        }),
                );
            }
        }

        return Promise.all(promises).then(function (res) {
            /** @type {Array<SearchResultItem>} */
            var items = [];
            res.forEach(function (resItems) {
                items = items.concat(resItems);
            });
            return items;
        });
    }

    #makeBibliography() {
        try {
            const bibItems = new Array(this._storage.size);
            /** @type {false | any} */
            const bibObject = this._formatter.makeBibliography();

            for (let i = 0; i < bibObject[0].entry_ids.length; i++) {
                /** @type {string} */
                let bibText = this.#unEscapeHtml(bibObject[1][i]);
                while (bibText.indexOf("\n") !== bibText.lastIndexOf("\n")) {
                    bibText = bibText.replace(/\n/, "");
                }

                bibItems.push(bibText);
            }
            const htmlBibliography = bibItems.join("");
            return htmlBibliography;
        } catch (e) {
            if (
                false ===
                this._cslStylesManager.isLastUsedStyleContainBibliography()
            ) {
                // style does not describe the bibliography
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
                    if (updatedField) {
                        numOfItems += cslCitation.fillFromObject(updatedField);
                    } else {
                        numOfItems +=
                            cslCitation.fillFromObject(citationObject);
                    }
                    self._storage.addCitation(cslCitation);

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
     * @returns {Promise<AddinFieldData[]>}
     */
    async #getUpdatedFields(fieldsWithCitations, bHardRefresh, bChangePosition) {
        const fragment = document.createDocumentFragment();
        const tempElement = document.createElement("div");
        fragment.appendChild(tempElement);

        /** @type {AddinFieldData[]} */
        const updatedFields = [];

        for (let i = fieldsWithCitations.length - 1; i >= 0; i--) {
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
            const oldContent = field["Content"];
            const newContent = tempElement.innerText;

            if (cslCitation.getDoNotUpdate()) {
                continue;
            }

            if (oldContent === newContent && !bChangePosition) {
                continue;
            }
            if (
                !bHardRefresh &&
                (oldContent === "null" || oldContent === null)
            ) {
                console.error("Unable to update footnotes");
                // TODO: Modify "GetAllAddinFields" method for footnotes
                // window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
                bHardRefresh = true;
            }

            if (bHardRefresh) {
                field["Content"] = htmlCitation;
                cslCitation.setPlainCitation(newContent);
            } else if (oldContent !== newContent) {
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
                    oldContent +
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
            }

            if (cslCitation) {
                field["Value"] =
                    this._citPrefixNew +
                    " " +
                    this._citSuffixNew +
                    JSON.stringify(cslCitation.toJSON());
            }

            updatedFields.push(field);
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
        // @ts-ignore
        this._formatter = new CSL.Engine(
            {
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
                    return item.toFlatJSON(index);
                },
            },
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
     * @returns {Promise<Array<string|number>>}
     */
    async insertSelectedCitations(items) {
        const self = this;

        try {
            await this.#synchronizeStorageWithDocItems();
            this.#updateFormatter();
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
            this._storage.addCitation(cslCitation);
            return self.#formatInsertLink(cslCitation);
        });
    }

    /** @returns {Promise<void>} */
    async insertBibliography() {
        if (!this.#checkEditor()) {
            return;
        }

        try {
            const { fieldsWithCitations, bibFieldValue, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            this.#updateFormatter();

            if (bibField) {
                const updatedFields = [
                    await this.#updateBibliography(bNoHaveFields, bibField),
                ];
                return this.citationDocService.updateAddinFields(updatedFields);
            } else {
                return this.#addBibliography(bNoHaveFields, bibFieldValue);
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * @param {boolean} [bHardRefresh]
     * @returns {Promise<void>}
     */
    async updateCslItems(bHardRefresh) {
        if (!this.#checkEditor()) {
            return;
        }

        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            this.#updateFormatter();

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
        if (!this.#checkEditor()) {
            return;
        }
        
        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            this.#updateFormatter();

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
     * @returns {Promise<void>}
     */
    async updateItem(updatedField) {
        if (!this.#checkEditor()) {
            return;
        }

        try {
            const { fieldsWithCitations } =
                await this.#synchronizeStorageWithDocItems(updatedField);

            this.#updateFormatter();

            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                true,
            );

            if (updatedFields && updatedFields.length) {
                return this.citationDocService.updateAddinFields(updatedFields);
            }
        } catch (e) {
            throw e;
        }
    }
    /**
     * // it is a crutch, because "SelectAddinField" does not work with notes
     * @param {Object & {citationID: string}} updatedField
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async updateItemInNotes(updatedField, notesStyle) {
        try {
            const { fieldsWithCitations } =
                await this.#synchronizeStorageWithDocItems(updatedField);

            this.#updateFormatter();

            /** @type {AddinFieldData[]} */
            let updatedFields = await this.#getUpdatedFields(
                fieldsWithCitations,
                true,
            );

            if (updatedFields && updatedFields.length) {
                await this.citationDocService.convertNotesStyle(
                    updatedFields,
                    notesStyle,
                );
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
        if (!this.#checkEditor()) {
            return;
        }

        try {
            const { fieldsWithCitations, bibField } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveFields = fieldsWithCitations.length === 0;

            this.#updateFormatter();

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
        if (!this.#checkEditor()) {
            return;
        }
        
        try {
            const { fieldsWithCitations } =
                await this.#synchronizeStorageWithDocItems();

            this.#updateFormatter();

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
     * @returns {Promise<AddinFieldData | null>}
     */
    async showEditCitationWindow(field) {
        if (!field) return null;

        const updatedField =
            await this.#additionalWindow.showEditWindow(field);
        if (!updatedField) {
            // Cancel click
            return null;
        }
        return updatedField;
    }
}

export { CitationService };
