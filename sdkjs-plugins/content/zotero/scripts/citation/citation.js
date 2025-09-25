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
    this._properties = undefined;

    this._schema =
        "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
}

CSLCitation.prototype.getSuppressAuthors = function () {
    return this._citationItems.map(function (item) {
        return { id: item.id, "suppress-author": item.getSuppressAuthor() };
    });
};

CSLCitation.prototype.fillFromObject = function (citationObject) {
    if (citationObject.citationID) {
        return this._fillFromCitationObject(citationObject);
    } else {
        return this._fillFromOldCitationObject(citationObject);
    }
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

        if (Object.hasOwnProperty.call(item, "prefix")) {
            citationItem.setPrefix(item.prefix);
        }

        if (Object.hasOwnProperty.call(item, "uris")) {
            item.uris.forEach(function (uri) {
                citationItem.addUri(uri);
            });
        }

        this._addCitationItem(citationItem);
    }, this);
    return tmpArr.length;
};

/**
 * @param {{id: string, index: number, "suppress-author": boolean, title: string, type: string, userID: string}} itemObject
 * @returns
 */
CSLCitation.prototype._fillFromOldCitationObject = function (itemObject) {
    var index =
        this._itemsStartIndex >= 0 ? this._itemsStartIndex : itemObject.index;
    var citationItem = new CitationItem(index);
    var citationItemData = new CitationItemData(index);
    citationItem.setItemData(citationItemData);

    if (Object.hasOwnProperty.call(itemObject, "suppress-author")) {
        citationItem.setSuppressAuthor(itemObject["suppress-author"]);
    }
    if (Object.hasOwnProperty.call(itemObject, "userID")) {
        //
    }
    if (Object.hasOwnProperty.call(itemObject, "groupID")) {
        //
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
        schema: this._schema,
        citationID: this.citationID,
    };

    if (this._citationItems && this._citationItems.length > 0) {
        result.citationItems = this._citationItems.map(function (item) {
            return item.toJSON ? item.toJSON() : item;
        });
    }

    if (this._properties) {
        result.properties = this._properties;
    }

    return result;
};
