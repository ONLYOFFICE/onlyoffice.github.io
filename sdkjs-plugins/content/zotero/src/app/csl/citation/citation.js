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
/// <reference path="./types.js" />

import { CitationItem } from "./citation-item";

/**
 * @typedef {Object} CitationJsonData
 * @property {string} key
 * @property {string} itemType
 * @property {string} title
 * @property {string} url
 * @property {string} accessDate
 * @property {string} parentItem
 * @property {string} linkMode
 * @property {string} contentType
 * @property {string} charset
 * @property {string} filename
 * @property {string} md5
 * @property {string} dateAdded
 * @property {string} dateModified
 * @property {Array<string>} tags
 * @property {number} version
 * @property {number} mtime
 * @property {Object} relations
 */

class CSLCitation {
    static #usedIDs = new Set();

    /** @param {string} [citationID] */
    constructor(citationID) {
        if (!citationID) {
            // if no citationID, create new citation
            citationID = this.#generateId();
        }
        if (CSLCitation.#usedIDs.has(citationID)) {
            console.warn("Citation ID must be unique");
            citationID = this.#generateId();
        }
        CSLCitation.#usedIDs.add(citationID);

        /** @type {string} */
        this.citationID = citationID;
        /** @type {Array<CitationItem>} */
        this._citationItems = new Array();
        /** @type {Object<string, string|number|boolean>} */
        this._properties = {};
        /** @type {Object<string, string|boolean>} */
        this._manualOverride = {}; // for mendeley

        this._schema =
            "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
    }

    static resetUsedIDs() {
        CSLCitation.#usedIDs = new Set();
    }

    /**
     * @param {any} citationObject
     * @returns
     */
    fillFromObject(citationObject) {
        if (
            Object.hasOwnProperty.call(citationObject, "properties") ||
            Object.hasOwnProperty.call(citationObject, "manualOverride") ||
            Object.hasOwnProperty.call(citationObject, "schema")
        ) {
            return this.#fillFromCitationObject(citationObject);
        } else if (Object.hasOwnProperty.call(citationObject, "citationItems")) {
            return this.#fillFromFlatCitationObject(citationObject);
        } else if (
            Object.hasOwnProperty.call(citationObject, "version") &&
            Object.hasOwnProperty.call(citationObject, "library")
        ) {
            return this.#fillFromJson(citationObject);
        }

        return this.#fillFromCslJson(citationObject);
    }

    /**
     * @param {any} citationObject
     * @returns
     */
    #fillFromCitationObject(citationObject) {
        const self = this;
        if (Object.hasOwnProperty.call(citationObject, "schema")) {
            // this.#setSchema(citationObject.schema);
        }
        if (Object.hasOwnProperty.call(citationObject, "properties")) {
            this.#setProperties(citationObject.properties);
        }
        if (Object.hasOwnProperty.call(citationObject, "manualOverride")) {
            this._manualOverride = citationObject.manualOverride;
        }

        if (!Object.hasOwnProperty.call(citationObject, "citationItems")) {
            console.error("citationItems is empty");
            return 0;
        }

        const existingIds = this._citationItems.map(function (item) {
            return item.id;
        });

        citationObject.citationItems.forEach(function (
            /** @type {CitationItem} */ item
        ) {
            let id = item.id;
            let citationItem;
            if (existingIds.indexOf(id) >= 0) {
                citationItem = self._citationItems[existingIds.indexOf(id)];
            } else {
                citationItem = new CitationItem(id);
                existingIds.push(id);
            }

            if (typeof id === "number") {
                // Word 365 or wps
                id = self.#extractIdFromWord365Citation(item);
            }

            citationItem.fillFromObject(item);

            self.#addCitationItem(citationItem);
        },
        this);
        return existingIds.length;
    }

    /**
     * @param {{citationItems: OldCitationItem[]}} citationObject
     * @returns
     */
    #fillFromFlatCitationObject(citationObject) {
        const self = this;
        if (citationObject.citationItems.length === 0) {
            console.error("CSLCitation.citationItems: citationItems is empty");
            return 0;
        } else if (citationObject.citationItems.length > 1) {
            console.warn(
                "CSLCitation.citationItems: citationItems has more than one item"
            );
        }

        citationObject.citationItems.forEach(function (itemObject) {
            self.#fillFromCslJson(itemObject);
        }, this);

        return 1;
    }

    /**
     * @param {any} itemObject
     * @returns
     */
    #fillFromCslJson(itemObject) {
        const id = itemObject.id;
        let citationItem;

        const existingIds = this._citationItems.map(function (item) {
            return item.id;
        });
        if (existingIds.indexOf(id) >= 0) {
            citationItem = this._citationItems[existingIds.indexOf(id)];
        } else {
            citationItem = new CitationItem(id);
        }

        citationItem.fillFromObject(itemObject);
        this.#addCitationItem(citationItem);

        return 1;
    }

    /**
     * @param {{key: string, version: number, library: Object, links: Object, meta: Object, data: CitationJsonData}} itemObject
     * @returns
     */
    #fillFromJson(itemObject) {
        if (!Object.hasOwnProperty.call(itemObject, "data")) {
            console.error("Invalid citation object");
            return 0;
        }

        const existingIds = this._citationItems.map(function (item) {
            return item.id;
        });
        const id = itemObject.data.key;
        let citationItem;
        if (existingIds.indexOf(id) >= 0) {
            citationItem = this._citationItems[existingIds.indexOf(id)];
        } else {
            citationItem = new CitationItem(id);
        }
        citationItem.fillFromObject(itemObject);
        this.#addCitationItem(citationItem);

        return 1;
    }
    getCitationItems() {
        return this._citationItems;
    }

    /**
     * @returns {boolean}
     */
    getDoNotUpdate() {
        if (Object.hasOwnProperty.call(this._properties, "dontUpdate")) {
            return !!this._properties.dontUpdate;
        }
        if (Object.hasOwnProperty.call(this._manualOverride, "isManuallyOverridden")) {
            return !!this._manualOverride.isManuallyOverridden;
        }
        return false;
    }

    /**
     *
     * @returns {Array<InfoForCitationCluster>}
     */
    getInfoForCitationCluster() {
        return this._citationItems.map(function (item) {
            return item.getInfoForCitationCluster();
        }, this);
    }

    /** @returns {string} */
    getPlainCitation() {
        if (Object.hasOwnProperty.call(this._properties, "plainCitation")) {
            return String(this._properties.plainCitation);
        } else if (this._manualOverride && Object.keys(this._manualOverride).length > 0) {
            return String(this._manualOverride.citeprocText);
        }

        return "";
    }

    /**
     * @param {CitationItem} item
     * @returns
     */
    #addCitationItem(item) {
        const existingIds = this._citationItems.map(function (item) {
            return item.id;
        });
        if (existingIds.indexOf(item.id) >= 0) {
            this._citationItems[existingIds.indexOf(item.id)] = item;
            return this;
        }
        this._citationItems.push(item);
        return this;
    }

    /**
     * @returns {CSLCitation}
     */
    setDoNotUpdate() {
        this.#setProperties({ dontUpdate: true });
        return this;
    }

    /**
     * @param {number} noteIndex
     * @returns {CSLCitation}
     */
    setNoteIndex(noteIndex) {
        this.#setProperties({ noteIndex });
        return this;
    }

    /**
     * @param {string} plainCitation
     * @returns
     */
    setPlainCitation(plainCitation) {
        this.#setProperties({ plainCitation: plainCitation });
        return this;
    }

    /**
     * @param {string} citeprocText
     * @param {string} [manualOverrideText]
     * @returns
     */
    setManualOverride(citeprocText, manualOverrideText) {
        let manualOverride = {
            citeprocText: citeprocText,
            isManuallyOverridden: !!manualOverrideText,
            manualOverrideText: manualOverrideText || ""
        };
        this._manualOverride = manualOverride;
        return this;
    }

    /**
     * @param {Object<string, string | number | boolean>} properties
     * @returns
     */
    #setProperties(properties) {
        const self = this;
        Object.keys(properties).forEach(function (key) {
            if (Object.hasOwnProperty.call(properties, key)) {
                self._properties[key] = properties[key];
            }
        }, this);
        return this;
    }

    /**
     * @param {string} schema
     * @returns
     */
    #setSchema(schema) {
        this._schema = schema;
        return this;
    }

    /**
     * @param {any} item
     * @returns {string}
     */
    #extractIdFromWord365Citation(item) {
        if (Object.hasOwnProperty.call(item, "uris") && item.uris.length) {
            const index = item.uris[0].lastIndexOf("/");
            return item.uris[0].slice(index + 1);
        }
        return item.id;
    }

    /**
     * @returns {string}
     */
    #generateId() {
        return Math.random().toString(36).substring(2, 15); // o4wi5z43own for example
    }
    validate() {
        var errors = [];

        if (!this._schema) errors.push("Schema is required");
        if (!this.citationID) errors.push("citationID is required");

        if (this._citationItems && Array.isArray(this._citationItems)) {
            for (var i = 0; i < this._citationItems.length; i++) {
                if (!this._citationItems[i].id) {
                    errors.push("Citation item at index " + i + " must have an id");
                }
            }
        }

        return errors.length === 0 ? true : errors;
    }

    toJSON() {
        var result = /** @type {any} */ ({
            citationID: this.citationID,
            schema: this._schema,
        });

        if (this._properties && Object.keys(this._properties).length > 0) {
            result.properties = this._properties;
        }
        if (this._manualOverride && Object.keys(this._manualOverride).length > 0) {
            result.manualOverride = this._manualOverride;
        }

        if (this._citationItems && this._citationItems.length > 0) {
            result.citationItems = this._citationItems.map(function (item) {
                return item.toJSON();
            });
        }

        return result;
    }
}

export { CSLCitation };
