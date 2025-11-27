// @ts-check

function CslStylesStorage() {
    this._customStyleNamesKey = "zoteroCustomStyleNames";
    this._customStylesKey = "zoteroCustomStyles";
}

/**
 * @returns {Array<string>}
 */
CslStylesStorage.prototype.getStyleNames = function () {
    let customStyleNames = localStorage.getItem(this._customStyleNamesKey);
    if (customStyleNames) {
        return JSON.parse(customStyleNames);
    } else {
        return [];
    }
};

/**
 * @returns {Array<string>}
 */
CslStylesStorage.prototype._getStyles = function () {
    let customStyles = localStorage.getItem(this._customStylesKey);
    if (customStyles) {
        return JSON.parse(customStyles);
    } else {
        return [];
    }
};

/**
 * @param {string} name
 * @returns {string | null}
 */
CslStylesStorage.prototype.getStyle = function (name) {
    /** @type {Array<string>} */
    let customStyleNames = this.getStyleNames();
    const styleIndex = customStyleNames.indexOf(name);
    if (styleIndex === -1) {
        return null;
    }

    return this._getStyles()[styleIndex];
};

/**
 * Returns a list of custom styles.
 * @returns {Array<StyleInfo>}
 */
CslStylesStorage.prototype.getStylesInfo = function () {
    const self = this;
    /** @type {Array<string>} */
    let customStyleNames = this.getStyleNames();
    let customStyles = this._getStyles();

    /** @type {Array<StyleInfo>} */
    let styles = [];

    for (let i = 0; i < customStyleNames.length; i++) {
        /** @type {StyleInfo} */
        const result = CslStylesParser.getStyleInfo(
            customStyleNames[i],
            customStyles[i]
        );
        styles.push(result);
    }
    return styles;
};

/**
 * Add a custom style to the storage.
 * @param {string} name - The name of the style.
 * @param {string} data - The content of the style.
 * @returns {StyleInfo}
 */
CslStylesStorage.prototype.setStyle = function (name, data) {
    /** @type {Array<string>} */
    let customStyleNames = this.getStyleNames();
    let customStyles = this._getStyles();

    let styleIndex = customStyleNames.indexOf(name);
    if (styleIndex === -1) {
        styleIndex = customStyleNames.length;
    }

    customStyleNames[styleIndex] = name;
    customStyles[styleIndex] = data;

    localStorage.setItem(
        this._customStyleNamesKey,
        JSON.stringify(customStyleNames)
    );
    localStorage.setItem(this._customStylesKey, JSON.stringify(customStyles));

    return CslStylesParser.getStyleInfo(name, data);
};

/**
 * Delete a custom style from the storage.
 * @param {string} name - The name of the style.
 * @returns {string} - The name of the deleted style.
 */
CslStylesStorage.prototype.deleteStyle = function (name) {
    /** @type {Array<string>} */
    let customStyleNames = this.getStyleNames();
    let customStyles = this._getStyles();

    const styleIndex = customStyleNames.indexOf(name);
    if (styleIndex === -1) {
        return name;
    }

    customStyleNames.splice(styleIndex, 1);
    customStyles.splice(styleIndex, 1);

    localStorage.setItem(
        this._customStyleNamesKey,
        JSON.stringify(customStyleNames)
    );
    localStorage.setItem(this._customStylesKey, JSON.stringify(customStyles));

    return name;
};
