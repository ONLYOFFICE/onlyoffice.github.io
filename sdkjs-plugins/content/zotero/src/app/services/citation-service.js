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
/// <reference path="../citeproc/citeproc_commonjs.js" />

/**
 * @typedef {import('../csl/styles').CslStylesManager} CslStylesManager
 * @typedef {import('../zotero/zotero').ZoteroSdk} ZoteroSdk
 * @typedef {import('../csl/locales').LocalesManager} LocalesManager
 * @typedef {import('../csl/citation/citation-item').CitationItem} CitationItem
 */

import { CitationDocService } from "./citation-doc-service";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { AdditionalWindow } from "../shared/ui";

class CitationService {
    #onUserEditCitationManuallyWindow;

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
            this._bibSuffixNew
        );
        /** @type {NoteStyle} */
        this._notesStyle;
        /** @type {StyleFormat} */
        this._styleFormat;
        this.#onUserEditCitationManuallyWindow = new AdditionalWindow();
    }

    /**
     *
     * @param {*} cslCitation
     * @returns {Promise<Array<string|number>>}
     */
    #formatInsertLink(cslCitation) {
        const self = this;
        let bUpdateItems = false;
        /** @type {Array<string|number>} */
        const keys = [];
        /** @type {Array<InfoForCitationCluster>} */
        const keysL = [];

        return Promise.resolve()
            .then(function () {
                cslCitation
                    .getCitationItems()
                    .forEach(function (/** @type {CitationItem} */ item) {
                        if (!self._storage.has(item.id)) {
                            bUpdateItems = true;
                        }
                        self._storage.set(item.id, item);
                        keys.push(item.id);
                        keysL.push(item.getInfoForCitationCluster());
                    });

                if (bUpdateItems) {
                    /** @type {string[]} */
                    var arrIds = [];
                    self._storage.forEach(function (item, id) {
                        arrIds.push(id);
                    });
                    self._formatter.updateItems(arrIds);
                }
            })
            .then(function () {
                const fragment = document.createDocumentFragment();
                const tempElement = document.createElement("div");
                fragment.appendChild(tempElement);

                // TODO: Maybe I should clear the search (think about it)
                tempElement.innerHTML =
                    self._formatter.makeCitationCluster(keysL);
                cslCitation.addPlainCitation(tempElement.innerText);
                let notesStyle = null;
                if ("note" === self._styleFormat) {
                    notesStyle = self._notesStyle;
                }
                return self.citationDocService.addCitation(
                    tempElement.innerText,
                    JSON.stringify(cslCitation.toJSON()),
                    notesStyle
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
                    })
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
                            "json"
                        )
                        .then(function (res) {
                            var items = res.items || [];
                            return items;
                        })
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
        const self = this;
        const fragment = document.createDocumentFragment();
        const tempElement = document.createElement("div");
        fragment.appendChild(tempElement);

        try {
            var bibItems = new Array(self._storage.size);
            /** @type {false | any} */
            var bibObject = self._formatter.makeBibliography();
            // Sort bibliography items
            for (var i = 0; i < bibObject[0].entry_ids.length; i++) {
                var citationId = bibObject[0].entry_ids[i][0];
                var citationIndex = self._storage.getIndex(citationId);
                /** @type {string} */
                var bibText = bibObject[1][i];
                while (bibText.indexOf("\n") !== bibText.lastIndexOf("\n")) {
                    bibText = bibText.replace(/\n/, "");
                }
                // Check if bibliography item contains <sup> or <sub>
                /*if (/<sup[^>]*>|<\/sup>|<sub[^>]*>|<\/sub>/i.test(bibText)) {
                    // Escape <sup> and <sub>
                    bibText = bibText
                        .replace(/<sup\b[^>]*>/gi, "&lt;sup&gt;")
                        .replace(/<\/sup>/gi, "&lt;/sup&gt;")
                        .replace(/<sub\b[^>]*>/gi, "&lt;sub&gt;")
                        .replace(/<\/sub>/gi, "&lt;/sub&gt;"); 
                }*/
                bibItems[citationIndex] = bibText;
            }
            tempElement.innerHTML = bibItems.join("");
        } catch (e) {
            if (
                false ===
                self._cslStylesManager.isLastUsedStyleContainBibliography()
            ) {
                // style does not describe the bibliography
                tempElement.textContent = "";
            } else {
                console.error(e);
                throw "Failed to apply this style.";
            }
        }
        return tempElement.innerText;
    }

    /** @param {CustomField} field */
    #extractField(field) {
        let citationObject;
        const citationStartIndex = field.Value.indexOf("{");
        const citationEndIndex = field.Value.lastIndexOf("}");
        if (citationStartIndex !== -1) {
            var citationString = field.Value.slice(
                citationStartIndex,
                citationEndIndex + 1
            );
            citationObject = JSON.parse(citationString);
        }
        return citationObject;
    }

    /**
     *
     * @returns {Promise<{bibField: CustomField | undefined, fields: CustomField[], updatedFields: CustomField[], bibFieldValue: string}>}
     */
    #synchronizeStorageWithDocItems() {
        const self = this;
        return this.citationDocService
            .getAddinZoteroFields()
            .then(function (/** @type {CustomField[]} */ arrFields) {
                const fragment = document.createDocumentFragment();
                const tempElement = document.createElement("div");
                fragment.appendChild(tempElement);

                let numOfItems = 0;
                let bibFieldValue = " ";

                /** @type {CustomField | undefined} */
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
                const fieldsWithCitations = fields.map(function (field) {
                    let citationObject = self.#extractField(field);

                    let citationID = ""; // old format
                    if (field.Value.indexOf(self._citPrefix) === -1) {
                        citationID = citationObject.citationID;
                    }

                    let cslCitation = new CSLCitation(numOfItems, citationID);
                    numOfItems += cslCitation.fillFromObject(citationObject);
                    cslCitation.getCitationItems().forEach(function (item) {
                        self._storage.set(item.id, item);
                    });

                    return { field: { ...field }, cslCitation: cslCitation };
                });

                self.#updateFormatter();

                /** @type {CustomField[]} */
                const updatedFields = fieldsWithCitations.map(function (
                    { field, cslCitation },
                    index
                ) {
                    let keysL = cslCitation.getInfoForCitationCluster();
                    tempElement.innerHTML =
                        self._formatter.makeCitationCluster(keysL);
                    const oldContent = field["Content"];
                    const newContent = tempElement.innerText;

                    if (oldContent !== newContent) {
                        field["Content"] = newContent;
                        /* self.#onUserEditCitationManuallyWindow.show(
                            "info-window",
                            "Zotero Citation",
                            newContent
                        );*/
                    }

                    console.log(cslCitation.getDoNotUpdate());

                    // cslCitation.addPlainCitation(field["Content"]);
                    if (cslCitation) {
                        field["Value"] =
                            self._citPrefixNew +
                            " " +
                            self._citSuffixNew +
                            JSON.stringify(cslCitation.toJSON());
                    }

                    return field;
                });

                return {
                    fields: fields,
                    updatedFields: updatedFields,
                    bibField: bibField,
                    bibFieldValue: bibFieldValue,
                };
            });
    }

    #updateFormatter() {
        const self = this;

        /** @type {string[]} */
        const arrIds = [];
        this._storage.forEach(function (item, id) {
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
                    var item = self._storage.get(id);
                    let index = self._storage.getIndex(id);
                    if (!item) return null;
                    return item.toFlatJSON(index);
                },
            },
            this._cslStylesManager.cached(
                this._cslStylesManager.getLastUsedStyleIdOrDefault()
            ),
            this._localesManager.getLastUsedLanguage(),
            true
        );
        if (arrIds.length) {
            this._formatter.updateItems(arrIds);
        }

        return;
    }

    /**
     * @returns {Promise<boolean>}
     */
    saveAsText() {
        return this.citationDocService.saveAsText();
    }

    /**
     * @param {NoteStyle} notesStyle
     */
    setNotesStyle(notesStyle) {
        this._notesStyle = notesStyle;
    }

    /**
     * @param {StyleFormat} styleFormat
     */
    setStyleFormat(styleFormat) {
        this._styleFormat = styleFormat;
    }

    /**
     * @param {Array<SearchResultItem>} items
     * @returns {Promise<Array<string|number>>}
     */
    insertSelectedCitations(items) {
        const self = this;

        var cslCitation = new CSLCitation(self._storage.size, "");
        for (var citationID in items) {
            const item = items[citationID];

            cslCitation.fillFromObject(item);
        }

        return this.#getSelectedInJsonFormat(items).then(function (items) {
            items.forEach(function (item) {
                cslCitation.fillFromObject(item);
            });
            return self.#formatInsertLink(cslCitation);
        });
    }

    // onInit (0,0)
    // Insert Citation (0,0)
    // Insert Bibliography (1,1)
    // Refresh (1,0)
    /**
     * @param {boolean} bUpdateAll
     * @param {boolean} bPastBib
     * @returns {Promise<void>}
     */
    updateCslItems(bUpdateAll, bPastBib) {
        this._storage.clear();
        const self = this;

        return this.#synchronizeStorageWithDocItems()
            .then(function (info) {
                const { fields, updatedFields, bibField, bibFieldValue } = info;

                if (!bUpdateAll && !bPastBib) {
                    return [];
                }

                if (bibField) {
                    if (updatedFields.length === 0) {
                        bibField["Content"] = translate(
                            self._bibPlaceholderIfEmpty
                        );
                    } else {
                        let bibliography = self.#makeBibliography();
                        bibField["Content"] = bibliography;
                    }
                    updatedFields.push(bibField);
                } else if (bPastBib) {
                    let bibliography = self.#makeBibliography();
                    if (updatedFields.length === 0) {
                        bibliography = translate(self._bibPlaceholderIfEmpty);
                    }
                    if (
                        self._cslStylesManager.isLastUsedStyleContainBibliography()
                    ) {
                        return self.citationDocService
                            .addBibliography(bibliography, bibFieldValue)
                            .then(function () {
                                return updatedFields;
                            });
                    } else {
                        throw "The current bibliographic style does not describe the bibliography";
                    }
                }
                return updatedFields;
            })
            .then(function (
                /** @type {CustomField[] | undefined} */ updatedFields
            ) {
                if (updatedFields && updatedFields.length) {
                    return self.citationDocService.updateAddinFields(
                        updatedFields
                    );
                }
            });
    }
}

export { CitationService };
