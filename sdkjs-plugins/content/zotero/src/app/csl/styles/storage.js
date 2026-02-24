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

import { CslStylesParser } from "./style-parser";

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

export { CslStylesStorage };
