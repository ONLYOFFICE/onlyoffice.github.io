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
 * @param {CitationDocService} citationDocService
 * @param {LocalesManager} localesManager
 * @param {CslStylesManager} cslStylesManager
 * @param {ZoteroSdk} sdk
 */
function CitationService(
    citationDocService,
    localesManager,
    cslStylesManager,
    sdk
) {
    this.bibPlaceholder = "Please insert some citation into the document.";
    this.citPrefixNew = "ZOTERO_ITEM";
    this.citSuffixNew = "CSL_CITATION";
    this.citPrefix = "ZOTERO_CITATION";
    this.bibPrefixNew = "ZOTERO_BIBL";
    this.bibPrefix = "ZOTERO_BIBLIOGRAPHY";
    this.sdk = sdk;
    this.localesManager = localesManager;
    this.cslStylesManager = cslStylesManager;
    /** @type {CSL.Engine} */
    this.formatter;
    this.citationDocService = citationDocService;
}

CitationService.prototype = {
    /**
     * @param {{id: string, uris: string[]}} item
     * @returns
     */
    fillUrisFromId: function (item) {
        const slashFirstIndex = item.id.indexOf("/") + 1;
        const slashLastIndex = item.id.lastIndexOf("/") + 1;
        const httpIndex = item.id.indexOf("http");
        if (slashFirstIndex !== slashLastIndex && httpIndex === 0) {
            if (!Object.hasOwnProperty.call(item, "uris")) {
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
                    self.formatter.updateItems(arrIds);
                }
            })
            .then(function () {
                const fragment = document.createDocumentFragment();
                const tempElement = document.createElement("div");
                fragment.appendChild(tempElement);

                // TODO может ещё очистить поиск (подумать над этим)
                tempElement.innerHTML =
                    self.formatter.makeCitationCluster(keysL);
                cslCitation.addPlainCitation(tempElement.innerText);
                return self.citationDocService.addCitation(
                    tempElement.innerText,
                    JSON.stringify(cslCitation.toJSON())
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
     * @returns {Promise<CslJsonObjectItem[]>}
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

        var promises = [];
        if (arrUsrItems.length) {
            promises.push(
                this.sdk
                    .getItems(null, arrUsrItems, "json")
                    .then(function (res) {
                        var items = res.items || [];
                        return items;
                    })
                    .catch(function (err) {
                        console.error(err);
                    })
            );
        }

        for (var groupID in arrGroupsItems) {
            if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
                promises.push(
                    this.sdk
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
                        .catch(function (err) {
                            console.error(err);
                        })
                );
            }
        }

        return Promise.all(promises).then(function (res) {
            /** @type {CslJsonObjectItem[]} */
            var items = [];
            res.forEach(function (resItems) {
                if (
                    !Array.isArray(resItems) &&
                    Object.hasOwnProperty.call(resItems, "items")
                ) {
                    resItems = resItems.items;
                }
                items = items.concat(resItems);
            });
            return items;
        });
    },

    /**
     * @param {Array<any>} items
     * @param {string} prefix
     * @param {string} suffix
     * @param {{locator: string, label: string} | null} locatorInfo
     * @param {boolean} bOmitAuthor
     * @returns {Promise<Array<string|number>>}
     */
    insertSelectedCitations: function (
        items,
        prefix,
        suffix,
        locatorInfo,
        bOmitAuthor
    ) {
        const self = this;

        var cslCitation = new CSLCitation(CSLCitationStorage.size, "");
        for (var citationID in items) {
            const item = items[citationID];
            item["suppress-author"] = bOmitAuthor;

            if (prefix !== "") {
                item.prefix = prefix;
            }
            if (suffix !== "") {
                item.suffix = suffix;
            }
            if (locatorInfo) {
                item.locator = locatorInfo.locator;
                item.label = locatorInfo.label;
            }
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
     * @param {{id: string, uris: string[]}} item
     * @returns
     */
    /*synchronizeCSLItem: function (item) {
        this.fillUrisFromId(item);

        var cslItem = CSLCitationStorage.get(item.id);
        if (!cslItem) {
            return;
        }
        cslItem.fillFromObject(item);
    },*/

    /*synchronizeData: function () {
        const self = this;
        // form an array for request (one array for user and other for groups)
        // todo now we should make full update (because when we make refresh, we check fields into the document). Fix it in new version (when we change refreshing and updating processes)
        if (!CSLCitationStorage.size) return;

        showLoader(true);

        var bHasGroupsItems = false;
        var arrUsrItems = [];
        var arrGroupsItems = {};
        CSLCitationStorage.forEach(function (citationItem, id) {
            let index = CSLCitationStorage.getIndex(id);
            let item = citationItem.toFlatJSON(index);
            var userID = citationItem.getProperty("userID");
            var groupID = citationItem.getProperty("groupID");
            if (userID) {
                arrUsrItems.push(citationItem.id);
            } else if (groupID) {
                if (!arrGroupsItems[groupID]) arrGroupsItems[groupID] = [];
                arrGroupsItems[groupID].push(item.id);
            }
        });

        const promises = [];

        if (arrUsrItems.length) {
            promises.push(this.sdk
                .getItems(null, arrUsrItems)
                .then(function (res) {
                    var items = (res.items ? res.items.items : []) || [];
                    items.forEach(function (item) {
                        self.synchronizeCSLItem(item);
                    });
                }));
        }

        for (var groupID in arrGroupsItems) {
            if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
                bHasGroupsItems = true;
                promises.push(this.sdk
                    .getGroupItems(null, groupID, arrGroupsItems[groupID])
                    .then(function (res) {
                        var items = (res.items ? res.items.items : []) || [];
                        items.forEach(function (item) {
                            self.synchronizeCSLItem(item);
                        });
                    }));
            }
        }
        Promise.all(promises).catch(function (err) {
            console.error(err);
        }).then(function () {
            return self._updateAfterSync();
        });

    },*/

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
                    var bibObject = self.formatter.makeBibliography();
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
                        self.cslStylesManager.isLastUsedStyleContainBibliography()
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
                        (field.Value.indexOf(self.citPrefixNew) !== -1 ||
                            field.Value.indexOf(self.citPrefix) !== -1)
                    ) {
                        var citationID = ""; // old format
                        if (field.Value.indexOf(self.citPrefix) === -1) {
                            citationID = citationObject.citationID;
                        }

                        cslCitation = new CSLCitation(keysL.length, citationID);
                        cslCitation.fillFromObject(citationObject);
                        keysL = cslCitation.getInfoForCitationCluster();
                        tempElement.innerHTML =
                            self.formatter.makeCitationCluster(keysL);
                        field["Content"] = tempElement.innerText;
                        cslCitation.addPlainCitation(field["Content"]);
                        if (cslCitation) {
                            field["Value"] =
                                self.citPrefixNew +
                                " " +
                                self.citSuffixNew +
                                JSON.stringify(cslCitation.toJSON());
                        }
                        updatedFields.push(field);
                    } else if (
                        field.Value.indexOf(self.bibPrefix) !== -1 ||
                        field.Value.indexOf(self.bibPrefixNew) !== -1
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
                        self.cslStylesManager.isLastUsedStyleContainBibliography()
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
    /*_updateAfterSync: function () {
        // todo now we should make full update (because when we make refresh, we check fields into the document). Fix it in new version (when we change refreshing and updating processes)
        this._updateFormatter(true, false, true);
    },*/

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
                            field.Value.indexOf(self.citPrefix) !== -1 ||
                            field.Value.indexOf(self.citPrefixNew) !== -1
                        ) {
                            var citationID = ""; // old format
                            if (field.Value.indexOf(self.citPrefix) === -1) {
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
                            field.Value.indexOf(self.bibPrefix) !== -1 ||
                            field.Value.indexOf(self.bibPrefixNew) !== -1
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
                        bibField["Content"] = translate(self.bibPlaceholder);
                        return self.citationDocService
                            .updateAddinFields([bibField])
                            .then(function () {
                                return bUpdateFormatter;
                            });
                    }
                } else if (bUpdateFormatter && bPastBib) {
                    if (
                        self.cslStylesManager.isLastUsedStyleContainBibliography()
                    ) {
                        return self.citationDocService
                            .addBibliography(
                                translate(self.bibPlaceholder),
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
        this.formatter = new CSL.Engine(
            {
                /** @param {string} id */
                retrieveLocale: function (id) {
                    if (self.localesManager.getLocale(id)) {
                        return self.localesManager.getLocale(id);
                    }
                    return self.localesManager.getLocale();
                },
                /** @param {string} id */
                retrieveItem: function (id) {
                    var item = CSLCitationStorage.get(id);
                    let index = CSLCitationStorage.getIndex(id);
                    if (!item) return null;
                    return item.toFlatJSON(index);
                },
            },
            this.cslStylesManager.cached(
                this.cslStylesManager.getLastUsedStyleId()
            ),
            this.localesManager.getLastUsedLanguage(),
            true
        );
        if (arrIds.length) {
            this.formatter.updateItems(arrIds);
        }

        return;
    },
};
