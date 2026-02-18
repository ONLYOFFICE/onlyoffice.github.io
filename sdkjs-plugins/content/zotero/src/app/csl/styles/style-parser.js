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

const CslStylesParser = {
    /**
     * Parse a style object to extract relevant information.
     * @param {string} name
     * @param {string} style - A style string
     * @returns {StyleInfo} An object containing the parsed style information.
     */
    getStyleInfo: function (name, style) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(style, "text/xml");

        /** @type {StyleInfo} */
        const styleInfo = {
            categories: {
                fields: [],
                format: "",
            },
            dependent: 0,
            href: "",
            name: name,
            title: "",
            updated: "",
        };

        const title = xmlDoc.querySelector("info title");
        if (title) styleInfo.title = title.textContent;

        const href = xmlDoc.querySelector('info link[rel="self"]');
        if (href) {
            let attribute = href.getAttribute("href");
            if (attribute) styleInfo.href = attribute;
        }

        const parent = xmlDoc.querySelector(
            'info link[rel="independent-parent"]'
        );
        if (parent) {
            let attribute = parent.getAttribute("href");
            if (attribute) styleInfo.parent = attribute;
            styleInfo.dependent = 1;
        }

        const updated = xmlDoc.querySelector("info updated");
        if (updated) styleInfo.updated = updated.textContent;

        const categoryFormat = xmlDoc.querySelector(
            "info category[citation-format]"
        );
        if (categoryFormat) {
            let attribute = categoryFormat.getAttribute("citation-format");
            if (attribute) styleInfo.categories.format = attribute;
        }

        const categoryFields = xmlDoc.querySelectorAll("info category[field]");
        if (categoryFields) {
            categoryFields.forEach(function (category) {
                let attribute = category.getAttribute("field");
                if (attribute) styleInfo.categories.fields.push(attribute);
            });
        }

        return styleInfo;
    },
    /**
     * @param {string} styleContent
     * @returns {StyleFormat}
     */
    getCitationFormat: function (styleContent) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(styleContent, "text/xml");
        const format = xmlDoc.querySelector("info category[citation-format]");
        if (!format) throw new Error("Citation format not found");
        const type = format.getAttribute("citation-format");
        if (!type) throw new Error("Citation format not found");
        switch (type) {
            case "note":
            case "numeric":
            case "author":
            case "author-date":
            case "label":
                return type;
        }

        throw new Error("Invalid citation format");
    },
    /**
     * @param {string} styleContent
     * @returns {boolean}
     */
    isStyleContainBibliography: function (styleContent) {
        return styleContent.indexOf("<bibliography") > -1;
    },
};

export { CslStylesParser };
