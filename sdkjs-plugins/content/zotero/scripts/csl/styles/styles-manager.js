function CslStylesManager(isOnlineAvailable, isDesktopAvailable) {
    this._isOnlineAvailable = isOnlineAvailable;
    this._isDesktopAvailable = isDesktopAvailable;

    this._customStylesStorage = new CslStylesStorage();

    this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
    this._STYLES_JSON_LOCAL = "./resources/csl/styles.json";
    this._STYLES_URL = "https://www.zotero.org/styles/";
    this._STYLES_LOCAL = "./resources/csl/styles/";

    this._lastStyleKey = "zoteroStyleId";

    this._defaultStyles = [
        "american-medical-association",
        "american-political-science-association",
        "apa",
        "american-sociological-association",
        "chicago-author-date-17th-edition",
        "harvard-cite-them-right-10th-edition",
        "ieee",
        "modern-language-association-8th-edition",
        "nature",
    ];
}

/**
 * @param {{name: string, title: string, dependent: number}} style
 */
CslStylesManager.prototype.addCustomStyle = function (style) {
    console.log("addCustomStyle");
    this._customStylesStorage.addCustomStyle(style);
};

/**
 * @returns {Array<{name: string, title: string, dependent: number}>}
 */
CslStylesManager.prototype.getStyles = function () {
    const self = this;
    let jsonStyles = this._getStylesJson();
    let customStyles = this._customStylesStorage.getStyles();
    return Promise.all([jsonStyles, customStyles]).then(function (styles) {
        var lastStyle = self.getLastUsedStyle();
        var resultStyles = [];
        var resultStyleNames = self._customStylesStorage.getStyleNames();

        if (self._isDesktopAvailable && !self._isOnlineAvailable) {
            styles[0] = styles[0].filter(function (style) {
                return (
                    self._defaultStyles.indexOf(style.name) >= 0 ||
                    style.name == lastStyle
                );
            });
        }

        styles[1].forEach(function (style) {
            if (lastStyle === style.name) {
                resultStyles.unshift(style);
            } else {
                resultStyles.push(style);
            }
        });

        styles[0].forEach(function (style) {
            if (lastStyle === style.name) {
                resultStyles.unshift(style);
            } else if (resultStyleNames.indexOf(style.name) === -1) {
                resultStyles.push(style);
            }
        });

        return resultStyles;
    });
};

CslStylesManager.prototype._getCustomStyles = function () {
    console.log("getCustomStyles");
};

CslStylesManager.prototype._getStylesJson = function () {
    let url = this._STYLES_JSON_LOCAL;
    if (this._isOnlineAvailable) {
        url = this._STYLES_JSON_URL;
    }
    return fetch(url).then(function (resp) {
        return resp.json();
    });
};

/**
 * @param {string} styleName
 * @returns
 */
CslStylesManager.prototype.getStyle = function (styleName) {
    let url = this._STYLES_LOCAL + styleName + ".csl";
    if (this._isOnlineAvailable) {
        url = this._STYLES_URL + styleName;
    }
    return fetch(url).then(function (resp) {
        return resp.text();
    });
};

CslStylesManager.prototype.getLastUsedStyle = function () {
    return localStorage.getItem(this._lastStyleKey);
};

CslStylesManager.prototype.isStyleDefault = function (styleName) {
    return this._defaultStyles.indexOf(styleName) >= 0;
};

CslStylesManager.prototype.saveLastUsedStyle = function (id) {
    localStorage.setItem(this._lastStyleKey, id);
};
