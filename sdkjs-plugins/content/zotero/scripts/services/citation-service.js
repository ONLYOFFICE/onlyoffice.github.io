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

/// <reference path="../citeproc/citeproc_commonjs.js" />
/// <reference path="../zotero/zotero.js" />
/// <reference path="../csl/citation/storage.js" />
/// <reference path="../csl/citation/citation.js" />
/// <reference path="./translate-service.js" />
/// <reference path="./citation-doc-service.js" />
/// <reference path="../csl/styles/styles-manager.js" />
/// <reference path="../csl/locales/locales-manager.js" />

/**
 * @param {LocalesManager} localesManager
 * @param {CslStylesManager} cslStylesManager
 * @param {ZoteroSdk} sdk
 */
function CitationService(localesManager, cslStylesManager, sdk) {
    this._bibPlaceholder = "Please insert some citation into the document.";
    this._citPrefixNew = "ZOTERO_ITEM";
    this._citSuffixNew = "CSL_CITATION";
    this._citPrefix = "ZOTERO_CITATION";
    this._bibPrefixNew = "ZOTERO_BIBL";
    this._bibSuffixNew = "CSL_BIBLIOGRAPHY";
    this._bibPrefix = "ZOTERO_BIBLIOGRAPHY";
    this._sdk = sdk;
    this._localesManager = localesManager;
    this._cslStylesManager = cslStylesManager;
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
}

CitationService.prototype = {
    constructor: CitationService,
    /**
     * @param {SearchResultItem} item
     * @returns
     */
    fillUrisFromId: function (item) {
        const slashFirstIndex = item.id.indexOf("/") + 1;
        const slashLastIndex = item.id.lastIndexOf("/") + 1;
        const httpIndex = item.id.indexOf("http");
        if (slashFirstIndex !== slashLastIndex && httpIndex === 0) {
            if (!item.uris) {
                item.uris = [];
            }
            item.uris.push(item.id);
        }
        if (slashLastIndex) item.id = item.id.substring(slashLastIndex);

        return item;
    },

    /**
     *
     * @param {*} cslCitation
     * @returns {Promise<Array<string|number>>}
     */
    _formatInsertLink: function (cslCitation) {
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
                        if (!CSLCitationStorage.has(item.id)) {
                            bUpdateItems = true;
                        }
                        CSLCitationStorage.set(item.id, item);
                        keys.push(item.id);
                        keysL.push(item.getInfoForCitationCluster());
                    });

                if (bUpdateItems) {
                    /** @type {string[]} */
                    var arrIds = [];
                    CSLCitationStorage.forEach(function (item, id) {
                        arrIds.push(id);
                    });
                    self._formatter.updateItems(arrIds);
                }
            })
            .then(function () {
                const fragment = document.createDocumentFragment();
                const tempElement = document.createElement("div");
                fragment.appendChild(tempElement);

                // TODO может ещё очистить поиск (подумать над этим)
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
                // TODO есть проблема, что в плагине мы индексы обновили, а вот в документе нет (по идее надо обновить и индексы в документе перед вставкой)
                // но тогда у нас уедет селект и новое поле вставится не там, поэтому пока обновлять приходится в конце
                // такая же проблем с вставкой библиографии (при обнолении индексов в плагине надо бы их обновлять и в документе тоже)
                return self.updateCslItems(true, true, false);
            })
            .then(function () {
                return keys;
            });
    },

    /**
     * @param {Array<any>} items
     * @returns {Promise<Array<SearchResultItem>>}
     */
    _getSelectedInJsonFormat: function (items) {
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
    },

    /**
     * @param {Array<SearchResultItem>} items
     * @returns {Promise<Array<string|number>>}
     */
    insertSelectedCitations: function (items) {
        const self = this;

        var cslCitation = new CSLCitation(CSLCitationStorage.size, "");
        for (var citationID in items) {
            const item = items[citationID];

            cslCitation.fillFromObject(item);
        }

        return this._getSelectedInJsonFormat(items).then(function (items) {
            items.forEach(function (item) {
                cslCitation.fillFromObject(item);
            });
            return self._formatInsertLink(cslCitation);
        });
    },

    /**
     * @returns {Promise<boolean>}
     */
    saveAsText: function () {
        return this.citationDocService.saveAsText();
    },

    /**
     * @param {NoteStyle} notesStyle
     */
    setNotesStyle: function (notesStyle) {
        this._notesStyle = notesStyle;
    },

    /**
     * @param {StyleFormat} styleFormat
     */
    setStyleFormat: function (styleFormat) {
        this._styleFormat = styleFormat;
    },

    /**
     * @param {boolean} bUpdateAll
     * @param {boolean} bPastBib
     * @returns {Promise<void>}
     */
    _updateAllOrAddBib: function (bUpdateAll, bPastBib) {
        const self = this;
        return this.citationDocService
            .getAddinZoteroFields()
            .then(function (/** @type {CustomField[]} */ arrFields) {
                if (!arrFields.length) {
                    return;
                }
                /** @type {CustomField[]} */
                var updatedFields = [];
                var bibField = null;
                var bibFieldValue = " ";

                const fragment = document.createDocumentFragment();
                const tempElement = document.createElement("div");
                fragment.appendChild(tempElement);

                try {
                    var bibItems = new Array(CSLCitationStorage.size);
                    /** @type {false | any} */
                    var bibObject = self._formatter.makeBibliography();
                    // Sort bibliography items
                    for (var i = 0; i < bibObject[0].entry_ids.length; i++) {
                        var citationId = bibObject[0].entry_ids[i][0];
                        var citationIndex =
                            CSLCitationStorage.getIndex(citationId);
                        /** @type {string} */
                        var bibText = bibObject[1][i];
                        while (
                            bibText.indexOf("\n") !== bibText.lastIndexOf("\n")
                        ) {
                            bibText = bibText.replace(/\n/, "");
                        }
                        // Check if bibliography item contains <sup> or <sub>
                        if (
                            /<sup[^>]*>|<\/sup>|<sub[^>]*>|<\/sub>/i.test(
                                bibText
                            )
                        ) {
                            // Escape <sup> and <sub>
                            bibText = bibText
                                .replace(/<sup\b[^>]*>/gi, "&lt;sup&gt;")
                                .replace(/<\/sup>/gi, "&lt;/sup&gt;")
                                .replace(/<sub\b[^>]*>/gi, "&lt;sub&gt;")
                                .replace(/<\/sub>/gi, "&lt;/sub&gt;");
                        }
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

                var bibliography = tempElement.innerText;
                arrFields.forEach(function (field) {
                    var citationObject;
                    var citationStartIndex = field.Value.indexOf("{");
                    var citationEndIndex = field.Value.lastIndexOf("}");
                    if (citationStartIndex !== -1) {
                        var citationString = field.Value.slice(
                            citationStartIndex,
                            citationEndIndex + 1
                        );
                        citationObject = JSON.parse(citationString);
                    }
                    var keysL = [];
                    var cslCitation;
                    if (
                        bUpdateAll &&
                        (field.Value.indexOf(self._citPrefixNew) !== -1 ||
                            field.Value.indexOf(self._citPrefix) !== -1)
                    ) {
                        var citationID = ""; // old format
                        if (field.Value.indexOf(self._citPrefix) === -1) {
                            citationID = citationObject.citationID;
                        }

                        cslCitation = new CSLCitation(keysL.length, citationID);
                        cslCitation.fillFromObject(citationObject);
                        keysL = cslCitation.getInfoForCitationCluster();
                        tempElement.innerHTML =
                            self._formatter.makeCitationCluster(keysL);
                        field["Content"] = tempElement.innerText;
                        cslCitation.addPlainCitation(field["Content"]);
                        if (cslCitation) {
                            field["Value"] =
                                self._citPrefixNew +
                                " " +
                                self._citSuffixNew +
                                JSON.stringify(cslCitation.toJSON());
                        }
                        updatedFields.push(field);
                    } else if (
                        field.Value.indexOf(self._bibPrefix) !== -1 ||
                        field.Value.indexOf(self._bibPrefixNew) !== -1
                    ) {
                        bibField = field;
                        bibField["Content"] = bibliography;
                        if (
                            typeof citationObject === "object" &&
                            Object.keys(citationObject).length > 0
                        ) {
                            bibFieldValue = JSON.stringify(citationObject);
                        }
                    }
                });
                if (bibField) {
                    updatedFields.push(bibField);
                } else if (bPastBib) {
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
    },

    // onInit (1,0,0)
    // Insert Citation (1,0,0)
    // Insert Bibliography (1,1,1)
    // Refresh (1,1,0)
    /**
     * @param {boolean} bUpdateFormatter
     * @param {boolean} bUpdateAll
     * @param {boolean} bPastBib
     * @returns {Promise<void>}
     */
    updateCslItems: function (bUpdateFormatter, bUpdateAll, bPastBib) {
        CSLCitationStorage.clear();
        const self = this;

        return this.citationDocService
            .getAddinZoteroFields()
            .then(function (/** @type {CustomField[]} */ arrFields) {
                var bibFieldValue = " ";
                if (arrFields.length) {
                    var numOfItems = 0;
                    /** @type {CustomField | null} */
                    let bibField = arrFields.reduce(function (
                        /** @type {CustomField | null}*/ accumulator,
                        field
                    ) {
                        var citationObject;
                        var citationStartIndex = field.Value.indexOf("{");
                        var citationEndIndex = field.Value.lastIndexOf("}");
                        if (
                            citationStartIndex !== -1 &&
                            citationEndIndex !== -1
                        ) {
                            var citationString = field.Value.slice(
                                citationStartIndex,
                                citationEndIndex + 1
                            );
                            citationObject = JSON.parse(citationString);
                        }

                        if (
                            field.Value.indexOf(self._citPrefix) !== -1 ||
                            field.Value.indexOf(self._citPrefixNew) !== -1
                        ) {
                            var citationID = ""; // old format
                            if (field.Value.indexOf(self._citPrefix) === -1) {
                                citationID = citationObject.citationID;
                            }
                            var cslCitation = new CSLCitation(
                                numOfItems,
                                citationID
                            );
                            numOfItems +=
                                cslCitation.fillFromObject(citationObject);
                            cslCitation
                                .getCitationItems()
                                .forEach(function (item) {
                                    CSLCitationStorage.set(item.id, item);
                                });
                        } else if (
                            field.Value.indexOf(self._bibPrefix) !== -1 ||
                            field.Value.indexOf(self._bibPrefixNew) !== -1
                        ) {
                            accumulator = field;
                            if (
                                typeof citationObject === "object" &&
                                Object.keys(citationObject).length > 0
                            ) {
                                bibFieldValue = JSON.stringify(citationObject);
                            }
                        }
                        return accumulator;
                    },
                    null);

                    if (numOfItems) {
                        // sort?
                    } else if (bUpdateFormatter && bibField && bUpdateAll) {
                        // no need to find bib field again
                        bUpdateFormatter = false;
                        bibField["Content"] = translate(self._bibPlaceholder);
                        return self.citationDocService
                            .updateAddinFields([bibField])
                            .then(function () {
                                return bUpdateFormatter;
                            });
                    }
                } else if (bUpdateFormatter && bPastBib) {
                    if (
                        self._cslStylesManager.isLastUsedStyleContainBibliography()
                    ) {
                        return self.citationDocService
                            .addBibliography(
                                translate(self._bibPlaceholder),
                                bibFieldValue
                            )
                            .then(function () {
                                return bUpdateFormatter;
                            });
                    } else {
                        throw "The current bibliographic style does not describe the bibliography";
                    }
                }
                return bUpdateFormatter;
            })
            .then(function (bUpdateFormatter) {
                if (bUpdateFormatter) return self._updateFormatter();
            })
            .then(function () {
                if (bUpdateAll) {
                    return self._updateAllOrAddBib(bUpdateAll, bPastBib);
                }
            });
    },

    _updateFormatter: function () {
        const self = this;

        /** @type {string[]} */
        const arrIds = [];
        CSLCitationStorage.forEach(function (item, id) {
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
                    var item = CSLCitationStorage.get(id);
                    let index = CSLCitationStorage.getIndex(id);
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
    },
};
