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

import { CslStylesStorage } from "./storage";
import { CslStylesParser } from "./style-parser";

function CslStylesManager() {
    this._isOnlineAvailable = false;
    this._isDesktopAvailable = false;

    this._customStylesStorage = new CslStylesStorage();

    this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
    this._STYLES_JSON_LOCAL = "./resources/csl/styles.json";
    this._STYLES_URL = "https://www.zotero.org/styles/";
    this._STYLES_LOCAL = "./resources/csl/styles/";

    this._lastStyleKey = "zoteroStyleId";
    this._lastNotesStyleKey = "zoteroNotesStyleId";
    this._lastFormatKey = "zoteroFormatId";
    this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography";

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

    /** @type {Object.<string, string>} */
    this._cache = {};
}

/**
 * @param {File} file - The file to be added.
 * @returns {Promise<StyleInfo>} - A promise that resolves when the file is added.
 * @throws {Error} - If the file is not a .csl or .xml file, or if the file size is greater than 1 MB.
 */
CslStylesManager.prototype.addCustomStyle = function (file) {
    var self = this;

    return new Promise(function (resolve, reject) {
        let fileName = file.name.toLowerCase();
        if (fileName.slice(-4) === ".csl" || fileName.slice(-4) === ".xml") {
            fileName = fileName.substring(0, fileName.length - 4).trim();
        } else {
            reject("Please select a .csl or .xml file.");
        }

        if (file.size > 1024 * 1024) {
            reject("Maximum file size is 1 MB.");
        }
        resolve(fileName);
    }).then(function (fileName) {
        return self._readCSLFile(file).then(function (content) {
            if (self._defaultStyles.indexOf(fileName) === -1) {
                self._defaultStyles.push(fileName);
            }

            return self._customStylesStorage.setStyle(fileName, content);
        });
    });
};

/**
 * @returns {StyleFormat}
 */
CslStylesManager.prototype.getLastUsedFormat = function () {
    let lastUsedFormat = localStorage.getItem(this._lastFormatKey);
    switch (lastUsedFormat) {
        case "note":
        case "numeric":
        case "author":
        case "author-date":
        case "label":
            return lastUsedFormat;
    }
    return "numeric";
};

/**
 * @returns {NoteStyle}
 */
CslStylesManager.prototype.getLastUsedNotesStyle = function () {
    let lastUsedNotesStyle = localStorage.getItem(this._lastNotesStyleKey);
    if (
        lastUsedNotesStyle === "footnotes" ||
        lastUsedNotesStyle === "endnotes"
    ) {
        return lastUsedNotesStyle;
    }
    return "footnotes";
};

/**
 * @returns {string|null} - style id
 */
CslStylesManager.prototype.getLastUsedStyleId = function () {
    let lastUsedStyle = localStorage.getItem(this._lastStyleKey);
    if (lastUsedStyle) {
        return lastUsedStyle;
    }
    return null;
};

/**
 * @returns {string} - style id
 */
CslStylesManager.prototype.getLastUsedStyleIdOrDefault = function () {
    let lastUsedStyle = localStorage.getItem(this._lastStyleKey);
    if (lastUsedStyle) {
        return lastUsedStyle;
    }
    return "ieee";
};

/**
 * @param {string} styleName
 * @param {boolean} saveToLocalStorage
 * @returns {Promise<{content: string|null, styleFormat: StyleFormat}>} - csl file content
 */
CslStylesManager.prototype.getStyle = function (
    styleName,
    saveToLocalStorage = true
) {
    const self = this;

    return Promise.resolve(styleName)
        .then(function (styleName) {
            if (self._cache[styleName]) {
                return self._cache[styleName];
            }
            const customStyleNames = self._customStylesStorage.getStyleNames();
            if (customStyleNames.indexOf(styleName) !== -1) {
                return self._customStylesStorage.getStyle(styleName);
            }
            let url = self._STYLES_LOCAL + styleName + ".csl";
            if (self._isOnlineAvailable) {
                url = self._STYLES_URL + styleName;
            }
            return fetch(url).then(function (resp) {
                return resp.text();
            });
        })
        .then(function (content) {
            if (
                content &&
                !self._isValidCSL(content) &&
                self._isOnlineAvailable
            ) {
                /** @type {StyleInfo} */
                let styleInfo = CslStylesParser.getStyleInfo(
                    styleName,
                    content
                );
                if (styleInfo && styleInfo.dependent > 0 && styleInfo.parent) {
                    return fetch(styleInfo.parent).then(function (resp) {
                        return resp.text();
                    });
                }
            }

            return content;
        })
        .then(function (content) {
            const styleFormat =
                (content && CslStylesParser.getCitationFormat(content)) ||
                "numeric";
            const result = {
                content: content,
                styleFormat: styleFormat,
            };
            if (content && saveToLocalStorage) {
                self._saveLastUsedStyle(styleName, content, styleFormat);
            }

            return result;
        });
};

/**
 * @returns {Promise<Array<StyleInfo>>}
 */
CslStylesManager.prototype.getStylesInfo = function () {
    const self = this;
    return Promise.all([
        this._getStylesJson(),
        this._customStylesStorage.getStylesInfo(),
    ]).then(function (styles) {
        var lastStyle = self.getLastUsedStyleId() || "ieee";
        /** @type {Array<StyleInfo>} */
        var resultStyles = [];
        var resultStyleNames = self._customStylesStorage.getStyleNames();
        /** @type {Array<StyleInfo>} */
        var loadedStyles = styles[0];
        /** @type {Array<StyleInfo>} */
        var customStyles = styles[1];

        if (self._isDesktopAvailable && !self._isOnlineAvailable) {
            loadedStyles = loadedStyles.filter(function (style) {
                return (
                    self._defaultStyles.indexOf(style.name) >= 0 ||
                    style.name == lastStyle
                );
            });
        }

        customStyles.forEach(function (style) {
            if (lastStyle === style.name) {
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
 * @param {string} id
 * @returns {string | null}
 */
CslStylesManager.prototype.cached = function (id) {
    if (Object.hasOwnProperty.call(this._cache, id)) {
        return this._cache[id];
    }
    return null;
};

/**
 * @returns {boolean}
 */
CslStylesManager.prototype.isLastUsedStyleContainBibliography = function () {
    let containBibliography = localStorage.getItem(
        this._lastUsedStyleContainBibliographyKey
    );
    return containBibliography !== "false";
};

/**
 * @param {string} styleName
 * @returns {boolean}
 */
CslStylesManager.prototype.isStyleDefault = function (styleName) {
    return this._defaultStyles.indexOf(styleName) >= 0;
};

/**
 * @param {string} content
 * @returns {boolean}
 */
CslStylesManager.prototype._isValidCSL = function (content) {
    return (
        content.indexOf("<?xml") > -1 &&
        content.indexOf("<style") > -1 &&
        content.indexOf("<macro") > -1 &&
        content.indexOf("citation") > -1
    );
};

/**
 * Reads a file and returns its content as a string.
 * Rejects the promise if the file is not a valid CSL file.
 * @param {File} file - The file to be read.
 * @returns {Promise<string>} - A promise that resolves with the file content if the file is a valid CSL file.
 * @throws {Error} - If the file is not a valid CSL file.
 */
CslStylesManager.prototype._readCSLFile = function (file) {
    const self = this;
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var fileContent = e.target ? String(e.target.result) : "";

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

/**
 * @param {string} content
 * @param {string} id
 * @param {StyleFormat} currentStyleFormat
 */
CslStylesManager.prototype._saveLastUsedStyle = function (
    id,
    content,
    currentStyleFormat
) {
    this._cache[id] = content;
    localStorage.setItem(this._lastStyleKey, id);
    localStorage.setItem(this._lastFormatKey, currentStyleFormat);
    const containBibliography =
        CslStylesParser.isStyleContainBibliography(content);
    localStorage.setItem(
        this._lastUsedStyleContainBibliographyKey,
        containBibliography.toString()
    );
};

/**
 * @param {NoteStyle} notesStyle
 */
CslStylesManager.prototype.saveLastUsedNotesStyle = function (notesStyle) {
    localStorage.setItem(this._lastNotesStyleKey, notesStyle);
};

/**
 * @param {boolean} isApiAvailable
 */
CslStylesManager.prototype.setDesktopApiAvailable = function (isApiAvailable) {
    this._isDesktopAvailable = isApiAvailable;
};
/**
 * @param {boolean} isApiAvailable
 */
CslStylesManager.prototype.setRestApiAvailable = function (isApiAvailable) {
    this._isOnlineAvailable = isApiAvailable;
};

export { CslStylesManager };
