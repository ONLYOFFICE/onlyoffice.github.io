/**
 * @typedef {Object} SuppressAuthor
 * @property {string} id
 * @property {boolean} "suppress-author"
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
    this._citationItems = new Array();
    this._properties = new Object();

    this._schema =
        "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
}

/**
 * @param {*} citationObject 
 * @returns 
 */
CSLCitation.prototype.fillFromObject = function (citationObject) {
    if (
        Object.hasOwnProperty.call(citationObject, "properties") ||
        Object.hasOwnProperty.call(citationObject, "schema")
    ) {
        return this._fillFromCitationObject(citationObject);
    } else if (Object.hasOwnProperty.call(citationObject, "citationItems")) {
        return this._fillFromOldCitationObject(citationObject);
    }

    return this._fillFromOldCitationItem(citationObject);
};

CSLCitation.prototype._fillFromCitationObject = function (citationObject) {
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

    var tmpArr = new Array();
    citationObject.citationItems.forEach(function (item) {
        if (tmpArr.indexOf(item.id) >= 0) {
            console.error("CSLCitation.citationItems: duplicate id");
            return;
        }
        tmpArr.push(item.id);

        var index = this._itemsStartIndex;

        var id = item.id;
        var citationItem = new CitationItem(id);
        var citationItemData = new CitationItemData(id);

        if (Object.hasOwnProperty.call(item, "itemData")) {
            citationItem.setItemData(item.itemData);

            citationItemData.setType(item.itemData.type);
            citationItemData.setContainerTitle(
                item.itemData["container-title"]
            );
            citationItemData.setTitle(item.itemData.title);
        }

        citationItem.fillFromObject(item);

        this._addCitationItem(citationItem);
    }, this);
    return tmpArr.length;
};

/**
 * @param {{citationObject: Array<{id: string, index: number, "suppress-author": boolean, title: string, type: string, userID: string, groupID: string}>}} citationObject
 * @returns
 */
CSLCitation.prototype._fillFromOldCitationObject = function (citationObject) {
    if (citationObject.citationItems.length === 0) {
        console.error("CSLCitation.citationItems: citationItems is empty");
        return 0;
    } else if (citationObject.citationItems.length > 1) {
        console.warn(
            "CSLCitation.citationItems: citationItems has more than one item"
        );
    }

    citationObject.citationItems.forEach(function (itemObject) {
        this._fillFromOldCitationItem(itemObject);
    }, this);

    return 1;
};

/**
 * @param {} citationObject
 * @returns
 */
CSLCitation.prototype._fillFromOldCitationItem = function (itemObject) {
    var index = this._itemsStartIndex;

    var id = itemObject.id;
    var citationItem = new CitationItem(id);
    var citationItemData = new CitationItemData(id);
    citationItem.setItemData(citationItemData);

    citationItem.fillFromObject(itemObject);

    if (Object.hasOwnProperty.call(itemObject, "suppress-author")) {
        citationItem.setSuppressAuthor(itemObject["suppress-author"]);
    }
    if (Object.hasOwnProperty.call(itemObject, "userID")) {
        citationItemData.addCustomProperty("userID", itemObject.userID);
    }
    if (Object.hasOwnProperty.call(itemObject, "groupID")) {
        citationItemData.addCustomProperty("groupID", itemObject.groupID);
    }
    if (Object.hasOwnProperty.call(itemObject, "title")) {
        citationItemData.setTitle(itemObject.title);
    }
    if (Object.hasOwnProperty.call(itemObject, "type")) {
        citationItemData.setType(itemObject.type);
    }
    this._addCitationItem(citationItem);

    return 1;
};

CSLCitation.prototype.getCitationItems = function () {
    return this._citationItems;
};

/**
 *
 * @returns {Array<SuppressAuthor>}
 */
CSLCitation.prototype.getSuppressAuthors = function () {
    return this._citationItems.map(function (item) {
        return item.getSuppressAuthor();
    }, this);
};

CSLCitation.prototype.getProperty = function (key) {
    let items = this._citationItems;
    for (var i = 0; i < items.length; i++) {
        let itemData = items[i].getItemData();
        if (itemData.getCustomProperty(key) !== null) {
            return itemData.getCustomProperty(key);
        }
    }

    return null;
};

CSLCitation.prototype._addCitationItem = function (item) {
    this._citationItems.push(item);
    return this;
};

CSLCitation.prototype._setProperties = function (properties) {
    this._properties = properties;
    return this;
};

CSLCitation.prototype._setSchema = function (schema) {
    this._schema = schema;
    return this;
};

/**
 * @returns {string}
 */
CSLCitation.prototype._generateId = function () {
    return Math.random().toString(36).substring(2, 15); // o4wi5z43own
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
    var result = {
        citationID: this.citationID,
    };

    if (this._properties && Object.keys(this._properties).length > 0) {
        result.properties = this._properties;
    }

    if (this._citationItems && this._citationItems.length > 0) {
        result.citationItems = this._citationItems.map(function (item) {
            return item.toJSON ? item.toJSON() : item;
        });
    }

    result.schema = this._schema;

    return result;
};

/**
 *
 * @returns {{id: string, index: number, "suppress-author": boolean, title: string, type: string, userID: string, , groupID: string}}
 */
CSLCitation.prototype.toOldJSON = function () {
    var result = [];

    if (!this._citationItems || this._citationItems.length === 0) {
        return result;
    }

    this._citationItems.forEach(function (item, index) {
        var oldItem = item.toOldJSON(this._itemsStartIndex + index);

        result.push(oldItem);
    }, this);

    if (result.length === 0) {
        console.error("No citation items found");
        return null;
    } else if (result.length > 1) {
        console.warn("Multiple citation items found");
    }

    return result[0];
};
