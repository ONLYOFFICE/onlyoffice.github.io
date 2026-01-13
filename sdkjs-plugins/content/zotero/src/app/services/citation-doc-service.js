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

/// <reference path="../types-global.js" />
/// <reference path="../csl/citation/types.js" />
/// <reference path="../csl/styles/types.js" />

import { CslHtmlParser } from "./csl-html-parser";
import { CslDocFormatter } from "./csl-doc-formatter";

class CitationDocService {
    #citPrefixOld;
    #citPrefix;
    #bibPrefixOld;
    #citSuffix;
    #bibPrefix;
    #bibSuffix;

    /**
     * @param {string} citPrefix
     * @param {string} citSuffix
     * @param {string} bibPrefix
     * @param {string} bibSuffix
     */
    constructor(citPrefix, citSuffix, bibPrefix, bibSuffix) {
        this.#citPrefixOld = "ZOTERO_CITATION";
        this.#bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";

        this.#citPrefix = citPrefix;
        this.#citSuffix = citSuffix;
        this.#bibPrefix = bibPrefix;
        this.#bibSuffix = bibSuffix;
    }

    /**
     * @param {CustomField} field
     * @returns {Promise<void>}
     */
    #addAddinField(field) {
        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod("AddAddinField", [field], resolve);
        });
    }

    /**
     * @param {string} text
     * @param {string} value
     * @returns {Promise<void>}
     */
    addBibliography(text, value) {
        const self = this;
        const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
        /** @type {CustomField} */
        const field = {
            Value: this.#bibPrefix + value + this.#bibSuffix,
            Content: formattingPositions.text,
        };

        return this.#addAddinField(field).then(function () {
            if (!formattingPositions.formatting.length) return;
            return CslDocFormatter.formatAfterInsert(
                formattingPositions.formatting
            );
        });
    }

    /**
     * @param {string} text
     * @param {string} value
     * @param {NoteStyle | null} notesStyle
     * @returns
     */
    addCitation(text, value, notesStyle) {
        const self = this;
        const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
        /** @type {CustomField} */
        const field = {
            Value: this.#citPrefix + " " + this.#citSuffix + value,
            Content: formattingPositions.text,
        };
        if ("footnotes" === notesStyle) {
            window.Asc.plugin.callCommand(function () {
                const oDocument = Api.GetDocument();
                oDocument.AddFootnote();
            });
        } else if ("endnotes" === notesStyle) {
            window.Asc.plugin.callCommand(function () {
                const oDocument = Api.GetDocument();
                oDocument.AddEndnote();
            });
        }

        return this.#addAddinField(field).then(function () {
            if (!formattingPositions.formatting.length) return;
            return CslDocFormatter.formatAfterInsert(
                formattingPositions.formatting
            );
        });
    }

    /**
     * @returns {Promise<Array<CustomField>>}
     */
    #getAllAddinFields() {
        const self = this;
        return new Promise(function (resolve, reject) {
            window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
        });
    }

    /**
     * @returns {Promise<Array<CustomField>>}
     */
    getAddinZoteroFields() {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.#getAllAddinFields().then(function (arrFields) {
                try {
                    if (arrFields.length) {
                        arrFields = arrFields.filter(function (field) {
                            return (
                                field.Value.indexOf(self.#citPrefix) !== -1 ||
                                field.Value.indexOf(self.#bibPrefix) !== -1 ||
                                field.Value.indexOf(self.#citPrefixOld) !==
                                    -1 ||
                                field.Value.indexOf(self.#bibPrefixOld) !== -1
                            );
                        });
                    }
                } catch (e) {
                    reject(e);
                }
                resolve(arrFields);
            });
        });
    }

    /** @returns {Promise<boolean>} */
    saveAsText() {
        // TODO потом добавить ещё форматы, пока только как текст
        return this.getAddinZoteroFields().then(function (arrFields) {
            let count = arrFields.length;
            if (!count) {
                window.Asc.plugin.executeCommand("close", "");
                return false;
            }

            return new Promise(function (resolve) {
                arrFields.forEach(function (field) {
                    window.Asc.plugin.executeMethod(
                        "RemoveFieldWrapper",
                        [field.FieldId],
                        function () {
                            count--;
                            if (!count) {
                                resolve(true);
                                window.Asc.plugin.executeCommand("close", "");
                            }
                        }
                    );
                });
            });
        });
    }

    /**
     * @param {Array<CustomField>} fields
     * @returns {Promise<void>}
     */
    updateAddinFields(fields) {
        /** @type {Map<string, {text: string, formatting: Array<FormattingPositions>}>} */
        const formats = new Map();
        fields.forEach(function (field) {
            const formattingPositions = CslHtmlParser.parseHtmlFormatting(
                field.Content
            );
            field.Content = formattingPositions.text;
            if (formattingPositions.formatting.length && field.FieldId) {
                formats.set(field.FieldId, formattingPositions);
            }
        });

        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod(
                "UpdateAddinFields",
                [fields],
                resolve
            );
        }).then(function () {
            if (!formats.size) return;
            return CslDocFormatter.formatAfterUpdate(formats);
        });
    }
}

export { CitationDocService };
