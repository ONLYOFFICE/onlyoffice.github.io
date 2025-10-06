/**
 * @param {string} citationID
 * @param {number} [itemsStartIndex]
 */
function CSLCitation(citationID, itemsStartIndex) {
    if (!citationID) {
        throw new Error("CSLCitation: citationID is required");
    }
    this.citationID = citationID;
    this._itemsStartIndex =
        typeof itemsStartIndex === "number" ? itemsStartIndex : -1;
    this._citationItems = new Array();
    this._properties = new Object();

    this._schema =
        "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
}

CSLCitation.prototype.getSuppressAuthors = function () {
    return this._citationItems.map(function (item) {
        return {
            id: this.citationID,
            "suppress-author": item.getSuppressAuthor(),
        };
    }, this);
};

CSLCitation.prototype.getProperty = function (key) {
    if (Object.hasOwnProperty.call(this._properties, key)) {
        return this._properties[key];
    }
    return null;
};

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

    var tmpArr = new Array();
    citationObject.citationItems.forEach(function (item) {
        if (tmpArr.indexOf(item.id) >= 0) {
            console.error("CSLCitation.citationItems: duplicate id");
            return;
        }
        tmpArr.push(item.id);

        var index =
            this._itemsStartIndex >= 0 ? this._itemsStartIndex : item.id;
        var citationItem = new CitationItem(index);
        var citationItemData = new CitationItemData(index);

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
        console.error(
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
    var index =
        this._itemsStartIndex >= 0 ? this._itemsStartIndex : itemObject.index;
    var citationItem = new CitationItem(index);
    var citationItemData = new CitationItemData(index);
    citationItem.setItemData(citationItemData);

    if (Object.hasOwnProperty.call(itemObject, "suppress-author")) {
        citationItem.setSuppressAuthor(itemObject["suppress-author"]);
    }
    if (Object.hasOwnProperty.call(itemObject, "userID")) {
        this._addProperty("userID", itemObject.userID);
    }
    if (Object.hasOwnProperty.call(itemObject, "groupID")) {
        this._addProperty("groupID", itemObject.groupID);
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

CSLCitation.prototype._addCitationItem = function (item) {
    this._citationItems.push(item);
    return this;
};

CSLCitation.prototype._setProperties = function (properties) {
    this._properties = properties;
    return this;
};

CSLCitation.prototype._addProperty = function (key, value) {
    this._properties[key] = value;
    return this;
};

CSLCitation.prototype._setSchema = function (schema) {
    this._schema = schema;
    return this;
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

    this._citationItems.forEach(function (item) {
        var oldItem = {
            id: this.citationID,
            index: item.id,
        };
        if (item.getSuppressAuthor() !== undefined) {
            oldItem["suppress-author"] = item.getSuppressAuthor();
        }
        if (
            item.getItemData().getTitle() !== "" &&
            item.getItemData().getTitle() !== undefined
        ) {
            oldItem.title = item.getItemData().getTitle();
        }
        if (item.getItemData().getType()) {
            oldItem.type = item.getItemData().getType();
        }
        if (this._properties && Object.keys(this._properties).length > 0) {
            if (this._properties.userID) {
                oldItem.userID = this._properties.userID;
            }
            if (this._properties.groupID) {
                oldItem.groupID = this._properties.groupID;
            }
        }

        result.push(oldItem);
    }, this);

    if (result.length === 0) {
        console.error("No citation items found");
        return null;
    } else if (result.length > 1) {
        console.error("Multiple citation items found");
    }

    return result[0];
};
