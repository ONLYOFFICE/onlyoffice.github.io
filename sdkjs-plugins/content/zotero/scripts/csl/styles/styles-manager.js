function CslStylesManager(isOnlineAvailable, isDesktopAvailable) {
    this._isOnlineAvailable = isOnlineAvailable;
    this._isDesktopAvailable = isDesktopAvailable;

    this._customStylesStorage = new CslStylesStorage();

    this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
    this._STYLES_JSON_LOCAL = "./resources/csl/styles.json";
    this._STYLES_URL = "https://www.zotero.org/styles/";
    this._STYLES_LOCAL = "./resources/csl/styles/";

    this._lastStyleKey = "zoteroStyleId";

    this.defaultStyles = {
        "American Medical Association 11th edition":
            "american-medical-association",
        "American Political Science Association":
            "american-political-science-association",
        "American Psychological Association 7th edition": "apa",
        "American Sociological Association 6th/7th edition":
            "american-sociological-association",
        "Chicago Manual of Style 17th edition (author-date)":
            "chicago-author-date-17th-edition",
        "Cite Them Right 10th edition - Harvard":
            "harvard-cite-them-right-10th-edition",
        IEEE: "ieee",
        "Modern Language Association 8th edition":
            "modern-language-association-8th-edition",
        Nature: "nature",
    };
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
    return new Promise(function (resolve, reject) {
        let jsonStyles = this._getStylesJson();
        let customStyles = this._customStylesStorage.getStyles();
        const self = this;

        Promise.all([jsonStyles, customStyles])
            .then(function (styles) {
                var resultStyles = styles[1];
                if (self._isDesktopAvailable && !self._isOnlineAvailable) {
                    styles[0] = styles[0].filter(function (style, i) {
                        return !!self.defaultStyles[style[i].title];
                    });
                }
                styles[0].forEach(function (style) {
                    resultStyles.push(style);
                });
                resolve(
                    resultStyles.filter(function (style) {
                        return style.dependent === 0;
                    })
                );
            })
            .catch(function (err) {
                reject(err);
            });
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

CslStylesManager.prototype.saveLastUsedStyle = function (id) {
    localStorage.setItem(this._lastStyleKey, id);
};
CslStylesManager.prototype._getLastUsedStyle = function () {
    return localStorage.getItem(this._lastStyleKey);
};
