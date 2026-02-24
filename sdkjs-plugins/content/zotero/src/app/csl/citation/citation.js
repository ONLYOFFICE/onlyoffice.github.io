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

/**
 * @param {number} [itemsStartIndex]
 * @param {string} [citationID]
 */
function CSLCitation(itemsStartIndex, citationID) {
    if (!citationID) {
        // if no citationID, create new citation
        citationID = this._generateId();
    }
    if (typeof itemsStartIndex !== "number") {
        throw new Error("itemsStartIndex is required");
    }
    /** @type {string} */
    this.citationID = citationID;
    this._itemsStartIndex = itemsStartIndex;
    /** @type {Array<CitationItem>} */
    this._citationItems = new Array();
    /** @type {Object<string, string|boolean>} */
    this._properties = {};

    this._schema =
        "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
}

/**
 * @param {any} citationObject
 * @returns
 */
CSLCitation.prototype.fillFromObject = function (citationObject) {
    if (
        Object.hasOwnProperty.call(citationObject, "properties") ||
        Object.hasOwnProperty.call(citationObject, "schema")
    ) {
        return this._fillFromCitationObject(citationObject);
    } else if (Object.hasOwnProperty.call(citationObject, "citationItems")) {
        return this._fillFromFlatCitationObject(citationObject);
    } else if (
        Object.hasOwnProperty.call(citationObject, "version") &&
        Object.hasOwnProperty.call(citationObject, "library")
    ) {
        return this._fillFromJson(citationObject);
    }

    return this._fillFromCslJson(citationObject);
};

/**
 * @param {any} citationObject
 * @returns
 */
CSLCitation.prototype._fillFromCitationObject = function (citationObject) {
    const self = this;
    if (Object.hasOwnProperty.call(citationObject, "schema")) {
        // this._setSchema(citationObject.schema);
    }
    if (Object.hasOwnProperty.call(citationObject, "properties")) {
        this._setProperties(citationObject.properties);
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
            id = self._extractIdFromWord365Citation(item);
        }

        citationItem.fillFromObject(item);

        self._addCitationItem(citationItem);
    },
    this);
    return existingIds.length;
};

/**
 * @param {{citationItems: OldCitationItem[]}} citationObject
 * @returns
 */
CSLCitation.prototype._fillFromFlatCitationObject = function (citationObject) {
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
        self._fillFromCslJson(itemObject);
    }, this);

    return 1;
};

/**
 * @param {any} itemObject
 * @returns
 */
CSLCitation.prototype._fillFromCslJson = function (itemObject) {
    var index = this._itemsStartIndex;

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
    this._addCitationItem(citationItem);

    return 1;
};

/**
 * @param {{key: string, version: number, library: Object, links: Object, meta: Object, data: CitationJsonData}} itemObject
 * @returns
 */
CSLCitation.prototype._fillFromJson = function (itemObject) {
    var index = this._itemsStartIndex;
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
    this._addCitationItem(citationItem);

    return 1;
};

CSLCitation.prototype.getCitationItems = function () {
    return this._citationItems;
};

/**
 * @returns {boolean}
 */
CSLCitation.prototype.getDoNotUpdate = function () {
    if (Object.hasOwnProperty.call(this._properties, "dontUpdate")) {
        return !!this._properties.dontUpdate;
    }
    return false;
};

/**
 *
 * @returns {Array<InfoForCitationCluster>}
 */
CSLCitation.prototype.getInfoForCitationCluster = function () {
    return this._citationItems.map(function (item) {
        return item.getInfoForCitationCluster();
    }, this);
};

/**
 * @returns {string}
 */
CSLCitation.prototype.getPlainCitation = function () {
    if (Object.hasOwnProperty.call(this._properties, "plainCitation")) {
        return String(this._properties.plainCitation);
    }

    return "";
};

/**
 * @param {CitationItem} item
 * @returns
 */
CSLCitation.prototype._addCitationItem = function (item) {
    const existingIds = this._citationItems.map(function (item) {
        return item.id;
    });
    if (existingIds.indexOf(item.id) >= 0) {
        this._citationItems[existingIds.indexOf(item.id)] = item;
        return this;
    }
    this._citationItems.push(item);
    return this;
};

/**
 * @returns
 */
CSLCitation.prototype.addDoNotUpdate = function () {
    this._setProperties({ dontUpdate: true });
    return this;
};

/**
 * @param {string} plainCitation
 * @returns
 */
CSLCitation.prototype.addPlainCitation = function (plainCitation) {
    this._setProperties({ plainCitation: plainCitation });
    return this;
};

/**
 * @param {Object<string, string | boolean>} properties
 * @returns
 */
CSLCitation.prototype._setProperties = function (properties) {
    const self = this;
    Object.keys(properties).forEach(function (key) {
        if (Object.hasOwnProperty.call(properties, key)) {
            self._properties[key] = properties[key];
        }
    }, this);
    return this;
};

/**
 * @param {string} schema
 * @returns
 */
CSLCitation.prototype._setSchema = function (schema) {
    this._schema = schema;
    return this;
};

/**
 * @param {any} item
 * @returns {string}
 */
CSLCitation.prototype._extractIdFromWord365Citation = function (item) {
    if (Object.hasOwnProperty.call(item, "uris") && item.uris.length) {
        const index = item.uris[0].lastIndexOf("/");
        return item.uris[0].slice(index + 1);
    }
    return item.id;
};

/**
 * @returns {string}
 */
CSLCitation.prototype._generateId = function () {
    return Math.random().toString(36).substring(2, 15); // o4wi5z43own for example
};

CSLCitation.prototype.validate = function () {
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
};

CSLCitation.prototype.toJSON = function () {
    var result = /** @type {any} */ ({
        citationID: this.citationID,
        schema: this._schema,
    });

    if (this._properties && Object.keys(this._properties).length > 0) {
        result.properties = this._properties;
    }

    if (this._citationItems && this._citationItems.length > 0) {
        result.citationItems = this._citationItems.map(function (item) {
            return item.toJSON();
        });
    }

    return result;
};

export { CSLCitation };
