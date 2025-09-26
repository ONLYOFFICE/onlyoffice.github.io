/**
 * @param {string|number} id
 */
function CitationItem(id) {
    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("CitationItem: id is required");
    }

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

CitationItem.prototype.fillFromObject = function (itemObject) {
    if (Object.hasOwnProperty.call(itemObject, "itemData")) {
        var citationItemData = new CitationItemData(itemObject.itemData.id);
        citationItemData.fillFromObject(itemObject.itemData);
        this.setItemData(citationItemData);
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
        itemObject.uris.forEach(function (uri) {
            this.addUri(uri);
        }, this);
    }
};

CitationItem.prototype.getSuppressAuthor = function () {
    return this._suppressAuthor;
};

CitationItem.prototype.getItemData = function () {
    return this._itemData;
};

/**
 * @param {CitationItemData} itemData
 * @returns {CitationItem}
 */
CitationItem.prototype.setItemData = function (itemData) {
    this._itemData = itemData;
    return this;
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
