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
import { CitationItemData } from "./citation-item-data";

/**
 * @param {string|number} id
 */
function CitationItem(id) {
    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("CitationItem: id is required");
    }
    /** @type {string|number} */
    this.id = id;
    this._itemData = new CitationItemData(id);
    this._prefix = undefined;
    this._suffix = undefined;
    this._locator = undefined;
    this._label = undefined;
    this._suppressAuthor = undefined;
    this._authorOnly = undefined;
    this._uris = new Array();
}

/**
 * @param {any} itemObject
 */
CitationItem.prototype.fillFromObject = function (itemObject) {
    const self = this;
    if (
        Object.hasOwnProperty.call(itemObject, "version") &&
        Object.hasOwnProperty.call(itemObject, "library")
    ) {
        this._itemData.fillFromObject(itemObject.data);
        if (Object.hasOwnProperty.call(itemObject, "links")) {
            if (Object.hasOwnProperty.call(itemObject.links, "self")) {
                this.addUri(itemObject.links.self.href);
            }
            if (Object.hasOwnProperty.call(itemObject.links, "alternate")) {
                this.addUri(itemObject.links.alternate.href);
            }
        }
    } else if (Object.hasOwnProperty.call(itemObject, "itemData")) {
        this._itemData.fillFromObject(itemObject.itemData);
    } else {
        this._itemData.fillFromObject(itemObject);
    }

    if (Object.hasOwnProperty.call(itemObject, "prefix"))
        this._prefix = itemObject.prefix;
    if (Object.hasOwnProperty.call(itemObject, "suffix"))
        this._suffix = itemObject.suffix;
    if (Object.hasOwnProperty.call(itemObject, "locator"))
        this._locator = itemObject.locator;
    if (Object.hasOwnProperty.call(itemObject, "label"))
        this._label = itemObject.label;
    if (Object.hasOwnProperty.call(itemObject, "suppress-author"))
        this._suppressAuthor = itemObject["suppress-author"];
    if (Object.hasOwnProperty.call(itemObject, "author-only"))
        this._authorOnly = itemObject["author-only"];
    if (Object.hasOwnProperty.call(itemObject, "uris")) {
        itemObject.uris.forEach(function (/** @type {string} */ uri) {
            self.addUri(uri);
        }, this);
    }
};

/**
 * @returns {InfoForCitationCluster}
 */
CitationItem.prototype.getInfoForCitationCluster = function () {
    /** @type {InfoForCitationCluster} */
    let info = {
        id: this.id,
        "suppress-author": this._suppressAuthor,
    };
    if (this._prefix) {
        info.prefix = this._prefix;
    }
    if (this._suffix) {
        info.suffix = this._suffix;
    }
    if (this._locator) {
        info.locator = this._locator;
    }
    if (this._label) {
        info.label = this._label;
    }
    return info;
};

CitationItem.prototype.getItemData = function () {
    return this._itemData;
};

/**
 *
 * @param {string} key
 * @returns {string|number|null}
 */
CitationItem.prototype.getProperty = function (key) {
    if (this._itemData.getCustomProperty(key) !== null) {
        return this._itemData.getCustomProperty(key);
    }
    return null;
};

/**
 * @param {string} prefix
 * @returns {CitationItem}
 */
CitationItem.prototype.setPrefix = function (prefix) {
    this._prefix = prefix;
    return this;
};

/**
 * @param {string} suffix
 * @returns {CitationItem}
 */
CitationItem.prototype.setSuffix = function (suffix) {
    this._suffix = suffix;
    return this;
};

/**
 * @param {string} locator
 * @returns {CitationItem}
 */
CitationItem.prototype.setLocator = function (locator) {
    this._locator = locator;
    return this;
};

/**
 * @param {string} label
 * @param {"act"|"appendix"|"article-locator"|"book"|"canon"|"chapter"|"column"|"elocation"|"equation"|"figure"|"folio"|"issue"|"line"|"note"|"opus"|"page"|"paragraph"|"part"|"rule"|"scene"|"section"|"sub-verbo"|"supplement"|"table"|"timestamp"|"title-locator"|"verse"|"version"|"volume"} [label]
 * @returns {CitationItem}
 */
CitationItem.prototype.setLabel = function (label) {
    if (label) {
        var validLabels = [
            "act",
            "appendix",
            "article-locator",
            "book",
            "canon",
            "chapter",
            "column",
            "elocation",
            "equation",
            "figure",
            "folio",
            "issue",
            "line",
            "note",
            "opus",
            "page",
            "paragraph",
            "part",
            "rule",
            "scene",
            "section",
            "sub-verbo",
            "supplement",
            "table",
            "timestamp",
            "title-locator",
            "verse",
            "version",
            "volume",
        ];

        if (validLabels.indexOf(label) === -1) {
            throw new Error(
                'CitationItem.setLocator: Invalid label "' + label + '"'
            );
        }

        this._label = label;
    }

    return this;
};

/**
 * @param {string|number|boolean} value
 * @returns {CitationItem}
 */
CitationItem.prototype.setSuppressAuthor = function (value) {
    this._suppressAuthor = value;
    return this;
};

/**
 * @param {string|number|boolean} value
 * @returns {CitationItem}
 */
CitationItem.prototype.setAuthorOnly = function (value) {
    this._authorOnly = value;
    return this;
};

/**
 * @param {string} uri
 * @returns {CitationItem}
 */
CitationItem.prototype.addUri = function (uri) {
    if (this._uris.indexOf(uri) !== -1) {
        return this;
    }
    this._uris.push(uri);
    return this;
};

CitationItem.prototype.toJSON = function () {
    var result = {};
    result.id = this.id;

    if (this._itemData) {
        result.itemData = this._itemData.toJSON
            ? this._itemData.toJSON()
            : this._itemData;
    }
    if (this._prefix !== undefined) result.prefix = this._prefix;
    if (this._suffix !== undefined) result.suffix = this._suffix;
    if (this._locator !== undefined) result.locator = this._locator;
    if (this._label !== undefined) result.label = this._label;
    if (this._suppressAuthor !== undefined)
        result["suppress-author"] = this._suppressAuthor;
    if (this._authorOnly !== undefined)
        result["author-only"] = this._authorOnly;
    if (this._uris.length) result.uris = this._uris;

    return result;
};

/**
 * @param {number} index
 * @returns
 */
CitationItem.prototype.toFlatJSON = function (index) {
    /** @type {OldCitationItem} */
    var oldItem = {
        id: this.id,
        index: index,
    };
    if (this._suppressAuthor !== undefined) {
        oldItem["suppress-author"] = this._suppressAuthor;
    }

    let itemDataObject = this._itemData.toJSON();
    Object.assign(oldItem, itemDataObject);

    if (
        typeof this._itemData.getCustomProperty("userID") !== "undefined" &&
        this._itemData.getCustomProperty("userID") !== null
    ) {
        oldItem.userID = String(this._itemData.getCustomProperty("userID"));
    }
    if (
        typeof this._itemData.getCustomProperty("groupID") !== "undefined" &&
        this._itemData.getCustomProperty("groupID") !== null
    ) {
        oldItem.groupID = String(this._itemData.getCustomProperty("groupID"));
    }

    return oldItem;
};

export { CitationItem };
