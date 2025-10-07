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

CslStylesManager.prototype.addCustomStyle = function (file) {
    var fileName = file.name.toLowerCase();

    if (fileName.slice(-4) === ".csl" || fileName.slice(-4) === ".xml") {
        fileName = fileName.substring(0, fileName.length - 4);
    } else {
        throw new Error("Please select a .csl or .xml file.");
    }

    if (file.size > 1024 * 1024) {
        throw new Error("Maximum file size is 1 MB.");
    }

    return this._readCSLFile(file).then(
        function (content) {
            this.saveLastUsedStyle(fileName);
            if (this._defaultStyles.indexOf(fileName) === -1) {
                this._defaultStyles.push(fileName);
            }

            return this._customStylesStorage.setStyle(fileName, content);
        }.bind(this)
    );
};

CslStylesManager.prototype._readCSLFile = function (file) {
    const self = this;
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var fileContent = e.target.result;

            if (!self._isValidCSL(fileContent)) {
                reject("The file is not a valid CSL file");
                return;
            }

            resolve(fileContent);
        };

        reader.onerror = function () {
            reject("Failed to read file");
        };

        reader.readAsText(file);
    });
};

CslStylesManager.prototype._isValidCSL = function (content) {
    return (
        content.includes("<?xml") &&
        content.includes("<style") &&
        content.includes("citation") &&
        content.includes("bibliography")
    );
};

/**
 * @returns {Array<{name: string, title: string, dependent: number}>}
 */
CslStylesManager.prototype.getStyles = function () {
    const self = this;
    return Promise.all([
        this._getStylesJson(),
        this._customStylesStorage.getStyles(),
    ]).then(function (styles) {
        var lastStyle = self.getLastUsedStyle();
        var resultStyles = [];
        var resultStyleNames = self._customStylesStorage.getStyleNames();
        var loadedStyles = styles[0];
        var customStyles = styles[1];

        if (self._isDesktopAvailable && !self._isOnlineAvailable) {
            loadedStyles = loadedStyles.filter(function (style) {
                return (
                    self._defaultStyles.indexOf(style.name) >= 0 ||
                    style.name == lastStyle
                );
            });
        } else {
            loadedStyles = loadedStyles.filter(function (style) {
                return style.dependent === 0;
            });
        }

        customStyles.forEach(function (style) {
            if (lastStyle === style.id) {
                resultStyles.unshift(style);
            } else {
                resultStyles.push(style);
            }
            if (self._defaultStyles.indexOf(style.name) === -1) {
                self._defaultStyles.push(style.name);
            }
        });

        loadedStyles.forEach(function (style) {
            if (resultStyleNames.indexOf(style.name) !== -1) {
                // already added
                return;
            }
            if (lastStyle === style.name) {
                resultStyles.unshift(style);
            } else {
                resultStyles.push(style);
            }
        });

        return resultStyles;
    });
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
    const customStyleNames = this._customStylesStorage.getStyleNames();
    if (customStyleNames.indexOf(styleName) !== -1) {
        return this._customStylesStorage
            .getStyle(styleName)
            .then(function (style) {
                return style.content;
            });
    }
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
