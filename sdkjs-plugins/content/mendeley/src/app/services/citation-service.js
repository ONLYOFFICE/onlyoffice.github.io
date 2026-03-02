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

/// <reference path="../sdk/types.js" />
/// <reference path="../../../scripts/citeproc/citeproc_commonjs.js" />

/**
 * @typedef {import('../csl/styles').CslStylesManager} CslStylesManager
 * @typedef {import('../csl/locales').LocalesManager} LocalesManager
 * @typedef {import('../csl/citation/citation-item').CitationItem} CitationItem
 */

import { CitationDocService } from "./citation-doc-service";
import { translate } from "./translate-service";
import { CSLCitation, CSLCitationStorage } from "../csl/citation";
import { AdditionalWindow } from "../pages/additional-window";

class CitationService {
    #additionalWindow;

    /**
     * @param {LocalesManager} localesManager
     * @param {CslStylesManager} cslStylesManager
     */
    constructor(localesManager, cslStylesManager) {
        this._bibPlaceholderIfEmpty =
            "Please insert some citation into the document.";
        this._citPrefixNew = "MENDELEY_CITATION";
        this._bibPrefixNew = "MENDELEY_BIBLIOGRAPHY";
        this._localesManager = localesManager;
        this._cslStylesManager = cslStylesManager;
        this._storage = new CSLCitationStorage();
        /** @type {CSL.Engine} */
        this._formatter;
        this.citationDocService = new CitationDocService(
            this._citPrefixNew,
            this._bibPrefixNew,
        );
        this.#additionalWindow = new AdditionalWindow();
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
                let htmlCitation = self._formatter.makeCitationCluster(keysL);
                htmlCitation = self.#unEscapeHtml(htmlCitation);
                fragment.appendChild(tempElement);
                tempElement.innerHTML = htmlCitation;
                cslCitation.setManualOverride(tempElement.innerText);
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

    /** @returns {string} */
    #makeBibliography() {
        try {
            const bibItems = new Array(this._storage.size);
            /** @type {false | any} */
            const bibObject = this._formatter.makeBibliography();

            for (let i = 0; i < bibObject[0].entry_ids.length; i++) {
                const citationId = bibObject[0].entry_ids[i][0];
                const citationIndex = this._storage.getIndex(citationId);
                /** @type {string} */
                let bibText = this.#unEscapeHtml(bibObject[1][i]);
                bibText = bibText.replaceAll(/\n/g, "").trim();
                if (bibText.slice(0, 4) === "<div" || bibText.slice(-5) === "</div>") {
                    bibText = "<p" + bibText.slice(4, -5) + "</p>";
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

    /** @param {ContentControlProperties} control */
    #extractControl(control) {
        let citationObject;
        if (control.Tag.indexOf(this._bibPrefixNew) !== -1) {
            return {};
        }
        const citationStartIndex = control.Tag.indexOf("_", this._citPrefixNew.length + 1) + 1;

        if (citationStartIndex > 0) {
            const base64String = control.Tag.slice(
                citationStartIndex,
            );

            try {
                let binary = atob(base64String);
                let citationString;
                if (typeof TextDecoder !== "undefined") {
                    let bytes = Uint8Array.from(binary, function(c) {
                        return c.charCodeAt(0);
                    });
                    citationString = new TextDecoder("utf-8").decode(bytes);
                } else { // old browser without TextDecoder
                    var escaped = "";
                    for (var i = 0; i < binary.length; i++) {
                        escaped += "%" + ("00" + binary.charCodeAt(i).toString(16)).slice(-2);
                    }
                    citationString = decodeURIComponent(escaped);
                }

                citationObject = JSON.parse(citationString);
            } catch (e) {
                console.error("Failed to extract citation", control);
                console.error(e);
            }
        }
        return citationObject;
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
     * @param {Object} [updatedControl]
     * @param {"footnotes" | "endnotes"} [notesStyle]
     * @returns {Promise<{controlsWithCitations: {control: ContentControlProperties, cslCitation: CSLCitation}[], bibControl: ContentControlProperties | undefined}>}
     */
    #synchronizeStorageWithDocItems(updatedControl, notesStyle) {
        const self = this;
        return this.citationDocService
            .getAddinMendeleyControls(notesStyle)
            .then(function (/** @type {ContentControlProperties[]} */ arrControls) {
                let numOfItems = 0;
                /** @type {ContentControlProperties | undefined} */
                const bibControl = arrControls.find(function (control) {
                    return (
                        control.Tag.indexOf(self._bibPrefixNew) !== -1
                    );
                });

                const controls = arrControls.filter(function (control) {
                    return (
                        control.Tag.indexOf(self._citPrefixNew) !== -1
                    );
                });
                let controlsWithCitations = controls.map(function (control) {
                    let citationObject = self.#extractControl(control);

                    let cslCitation = new CSLCitation(numOfItems);
                    if (updatedControl) {
                        numOfItems += cslCitation.fillFromObject(updatedControl);
                    } else {
                        numOfItems +=
                            cslCitation.fillFromObject(citationObject);
                    }

                    cslCitation.getCitationItems().forEach(function (item) {
                        self._storage.set(item.id, item);
                    });

                    return { control: { ...control }, cslCitation: cslCitation };
                });
                if (updatedControl) {
                    controlsWithCitations = controlsWithCitations.filter(
                        function (b) {
                            if (
                                b.cslCitation.citationID ===
                                updatedControl.citationID
                            ) {
                                return true;
                            }
                            return false;
                        },
                    );
                }

                return {
                    bibControl: bibControl,
                    controlsWithCitations: controlsWithCitations,
                };
            });
    }

    /**
     * @param {boolean} bNoHaveControls
     * @returns
     */
    #addBibliography(bNoHaveControls) {
        let bibliography = this.#makeBibliography();
        if (bNoHaveControls) {
            bibliography = translate(this._bibPlaceholderIfEmpty);
        }
        if (this._cslStylesManager.isLastUsedStyleContainBibliography()) {
            return this.citationDocService.addBibliography(
                bibliography,
            );
        } else {
            throw "The current bibliographic style does not describe the bibliography";
        }
    }

    /**
     * @param {boolean} bNoHaveControls
     * @param {ContentControlProperties} bibControl
     * @returns {ContentControlProperties}
     */
    #updateBibliography(bNoHaveControls, bibControl) {
        if (bNoHaveControls) {
            bibControl.PlaceHolderText = translate(this._bibPlaceholderIfEmpty);
        } else {
            let bibliography = this.#makeBibliography();
            bibControl.PlaceHolderText = bibliography;
        }

        return bibControl;
    }

    /**
     * @param {{control: ContentControlProperties, cslCitation: CSLCitation}[]} controlsWithCitations
     * @param {boolean} bHardRefresh
     * @param {boolean} [bChangePosition]
     * @returns {Promise<ContentControlProperties[]>}
     */
    async #getUpdatedControls(controlsWithCitations, bHardRefresh, bChangePosition) {
        const fragment = document.createDocumentFragment();
        const tempElement = document.createElement("div");
        fragment.appendChild(tempElement);

        /** @type {ContentControlProperties[]} */
        const updatedControls = [];

        for (let i = controlsWithCitations.length - 1; i >= 0; i--) {
            const { control, cslCitation } = controlsWithCitations[i];
            let keysL = cslCitation.getInfoForCitationCluster();
            let htmlCitation = this._formatter.makeCitationCluster(keysL);
            htmlCitation = this.#unEscapeHtml(htmlCitation);
            tempElement.innerHTML = htmlCitation;
            const oldContent = control.PlaceHolderText;
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
                bHardRefresh = true;
            }

            if (bHardRefresh) {
                control.PlaceHolderText = htmlCitation;
                cslCitation.setManualOverride(newContent);
            } else if (oldContent !== newContent) {
                let text =
                    "<p>" +
                    translate(
                        "You have modified this citation since Mendeley generated it. Do you want to keep your modifications and prevent future updates?",
                    ) +
                    "</p>" +
                    "<p>" +
                    translate(
                        "Clicking „Yes“ will prevent Mendeley from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.",
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
                    cslCitation.setManualOverride(newContent, oldContent);
                    control.PlaceHolderText = "";
                } else {
                    control.PlaceHolderText = htmlCitation;
                    cslCitation.setManualOverride(newContent);
                }
            }

            if (cslCitation) {
                control.Tag = JSON.stringify(cslCitation.toJSON());
            }

            updatedControls.push(control);
        }

        return updatedControls;
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
                    const item = self._storage.get(id);
                    let index = self._storage.getIndex(id);
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
        if (!isOk) {
            await this.#additionalWindow.showInfoWindow(
                "Success!",
                "All active Mendeley citations and Bibliography have been replaced.",
                "success",
            );
        } else {
            await this.#additionalWindow.showInfoWindow(
                "Warning!",
                "Replace all active Mendeley citations and Bibliography failed",
                "warning",
            );
        }
        
        return isOk;
    }

    /**
     * @param {Array<SearchResultItem>} items
     * @returns {Promise<Array<string|number>>}
     */
    async insertSelectedCitations(items) {
        this._storage.clear();
        try {
            await this.#synchronizeStorageWithDocItems();
            this.#updateFormatter();
        } catch (e) {
            throw e;
        }
        const cslCitation = new CSLCitation(this._storage.size, "");
        for (var citationID in items) {
            const item = items[citationID];

            cslCitation.fillFromObject(item);
        }

        return this.#formatInsertLink(cslCitation);

    }

    /** @returns {Promise<void>} */
    async insertBibliography() {
        this._storage.clear();

        try {
            const { controlsWithCitations, bibControl } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveControls = controlsWithCitations.length === 0;

            this.#updateFormatter();

            if (bibControl) {
                const updatedControls = [
                    await this.#updateBibliography(bNoHaveControls, bibControl),
                ];
                return this.citationDocService.updateContentControls(updatedControls);
            } else {
                return this.#addBibliography(bNoHaveControls);
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
        this._storage.clear();

        try {
            const { controlsWithCitations, bibControl } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveControls = controlsWithCitations.length === 0;

            this.#updateFormatter();

            /** @type {ContentControlProperties[]} */
            let updatedControls = [];

            if (typeof bHardRefresh === "undefined") {
                const format = this._cslStylesManager.getLastUsedFormat();
                if (format === "numeric") {
                    bHardRefresh = true;
                }
            }
            if (typeof bHardRefresh === "boolean") {
                updatedControls = await this.#getUpdatedControls(
                    controlsWithCitations,
                    bHardRefresh,
                );
            }

            if (bibControl) {
                updatedControls.push(
                    await this.#updateBibliography(bNoHaveControls, bibControl),
                );
            }

            if (updatedControls && updatedControls.length) {
                return this.citationDocService.updateContentControls(updatedControls);
            }
        } catch (e) {
            throw e;
        }
    }
    
    /**
     * @param {Object} updatedControl
     * @returns {Promise<void>}
     */
    async updateItem(updatedControl) {
        this._storage.clear();

        try {
            const { controlsWithCitations } =
                await this.#synchronizeStorageWithDocItems(updatedControl);

            this.#updateFormatter();

            /** @type {ContentControlProperties[]} */
            let updatedControls = await this.#getUpdatedControls(
                controlsWithCitations,
                true,
            );

            if (updatedControls && updatedControls.length) {
                return this.citationDocService.updateContentControls(updatedControls);
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
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9003000) {
            await this.#additionalWindow.showInfoWindow(
                "Something went wrong",
                "Update your editor to use this feature.",
            );
            return;
        }

        this._storage.clear();

        try {
            const { controlsWithCitations, bibControl } =
                await this.#synchronizeStorageWithDocItems();
            const bNoHaveControls = controlsWithCitations.length === 0;

            this.#updateFormatter();

            /** @type {ContentControlProperties[]} */
            let updatedControls = await this.#getUpdatedControls(
                controlsWithCitations,
                true,
            );

            if (updatedControls && updatedControls.length) {
                if (notesStyle) {
                    await this.citationDocService.convertTextToNotes(
                        updatedControls,
                        notesStyle,
                    );
                } else {
                    await this.citationDocService.convertNotesToText(
                        updatedControls,
                    );
                }
            }

            if (bibControl) {
                const bibControls = [
                    await this.#updateBibliography(bNoHaveControls, bibControl),
                ];
                await this.citationDocService.updateContentControls(bibControls);
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
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9003000) {
            await this.#additionalWindow.showInfoWindow(
                "Something went wrong",
                "Update your editor to use this feature.",
            );
            return;
        }
        
        this._storage.clear();
        try {
            const { controlsWithCitations } =
                await this.#synchronizeStorageWithDocItems(false, notesStyle);

            this.#updateFormatter();

            /** @type {ContentControlProperties[]} */
            let updatedControls = await this.#getUpdatedControls(
                controlsWithCitations,
                false,
                true
            );
            if (!updatedControls || !updatedControls.length) return;

            await this.citationDocService.convertNotesStyle(
                updatedControls,
                notesStyle,
            );
        } catch (e) {
            throw e;
        }
    }
    /**
     * @param {AddinFieldData[]} arrFields
     * @returns {Promise<{fieldsWithCitations: {field: AddinFieldData, cslCitation: CSLCitation}[], bibField: AddinFieldData | undefined}>}
     */
    async #synchronizeStorageBeforeUpgrade(arrFields) {
        const self = this;
        this._storage.clear();

        let numOfItems = 0;

        /** @type {AddinFieldData | undefined} */
        const bibField = arrFields.find((field) => 
            field.Value.indexOf("Mendeley Bibliography") === 0
        );

        let fieldsWithCitations = arrFields.filter((field) => 
            !bibField || bibField.FieldId !== field.FieldId
        ).map((field) => {
            let citationObject = this.#extractField(field);
            if (citationObject && citationObject.citationItems) {
                citationObject.citationItems.forEach(function (item) {
                    if (item.uris && item.uris.length) {
                        let id = item.id;
                        item.uris.some(/** @param {string} uri */ uri => {
                            const sign = "?uuid=";
                            const index = uri.indexOf(sign);
                            if (index === -1) {
                                return false;
                            }
                            const lastIndex = uri.indexOf("&", index + sign.length);
                            if (lastIndex === -1) {
                                id = uri.slice(index + sign.length);
                                return true;
                            }
                            id = uri.slice(index + sign.length, lastIndex);
                            return true;
                        });
                        item.id = id;
                        item.itemData.id = id;
                    }
                });
            }
            let cslCitation = new CSLCitation(numOfItems);
            numOfItems +=
                cslCitation.fillFromObject(citationObject);
            cslCitation.setManualOverride(field.Content);

            cslCitation.getCitationItems().forEach(function (item) {
                self._storage.set(item.id, item);
            });

            return { field: { ...field }, cslCitation: cslCitation };
        });

        return {
            bibField: bibField,
            fieldsWithCitations: fieldsWithCitations,
        };
    }

    /**
     * @returns {Promise<boolean>}
     */
    async checkOldVersion() {
        let isOk = true;
        let fields = await this.citationDocService.getAddinMendeleyFields();
        if (fields.length) {
            isOk = false;
        }
        if (isOk) {
            return false;
        }

        const isUserAgree = await this.#additionalWindow.show(
            "Update this document",
            "<p class='i18n'>" + translate("Existing citations created with the Mendeley Desktop plugin are built using an old technology that is not compatible with Mendeley Cite. These citations have to be updated to start working with Mendeley Cite.") + "</p>" +
            "<p class='i18n'>" + translate("Rest assured nothing has happened to your document or your citations.") + "</p>" +
            "<p class='i18n'>" + translate("Press continue to be guided through the update process.") + "</p>",
        );

        if (isUserAgree) {
            const { fieldsWithCitations, bibField } =await this.#synchronizeStorageBeforeUpgrade(fields);
            const infoForUpgrade = fieldsWithCitations.map((field) => {
                return {
                    field: field.field,
                    newValue: JSON.stringify(field.cslCitation.toJSON())
                };
            })
            await this.citationDocService.upgradeCslItems(infoForUpgrade, bibField);
            this.#additionalWindow.showInfoWindow(
                "Update complete",
                translate("Your document has been updated to use Mendeley Cite.") + " " +
                translate("Please select the citation style and language for future citation formatting."),
                "success"
            );
        } else {
            Asc.plugin.executeCommand("close", "");
        }
        return isUserAgree;
    }

}

export { CitationService };
