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

/**
 * @param {string} citPrefix
 * @param {string} citSuffix
 * @param {string} bibPrefix
 * @param {string} bibSuffix
 */
function CitationDocService(citPrefix, citSuffix, bibPrefix, bibSuffix) {
    this._citPrefixOld = "ZOTERO_CITATION";
    this._bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";

    this._citPrefix = citPrefix;
    this._citSuffix = citSuffix;
    this._bibPrefix = bibPrefix;
    this._bibSuffix = bibSuffix;

    /** @type {number} */
    this._repeatTimeout;
    /**
     * @type {{ updateItems: (arg0: string[]) => void; makeCitationCluster: (arg0: InfoForCitationCluster[]) => string; makeBibliography: () => any[][]; } | null}
     */
    this._formatter = null;
}

/**
 * @param {CustomField} field
 * @returns {Promise<void>}
 */
CitationDocService.prototype._addAddinField = function (field) {
    return new Promise(function (resolve) {
        window.Asc.plugin.executeMethod("AddAddinField", [field], resolve);
    });
};

/**
 * @param {string} text
 * @param {string} value
 * @returns {Promise<void>}
 */
CitationDocService.prototype.addBibliography = function (text, value) {
    const self = this;
    const supSubPositions = this._removeSuperSubTagsWithPositions(text);
    /** @type {CustomField} */
    const field = {
        Value: this._bibPrefix + value + this._bibSuffix,
        Content: supSubPositions.text,
    };

    return this._addAddinField(field).then(function () {
        if (!supSubPositions.positions.length) return;
        return self._setSuperSubByPositions(supSubPositions.positions);
    });
};

/**
 * @param {string} text
 * @param {string} value
 * @param {NoteStyle | null} notesStyle
 * @returns
 */
CitationDocService.prototype.addCitation = function (text, value, notesStyle) {
    const self = this;
    const supSubPositions = this._removeSuperSubTagsWithPositions(text);
    /** @type {CustomField} */
    const field = {
        Value: this._citPrefix + " " + this._citSuffix + value,
        Content: supSubPositions.text,
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

    return this._addAddinField(field).then(function () {
        if (!supSubPositions.positions.length) return;
        return self._setSuperSubByPositions(supSubPositions.positions);
    });
};
/**
        window.Asc.plugin.executeMethod("AddAddinField", [field], function () {
            const isCalc = true;
            const isClose = false;
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    doc.RemoveSelection();
                },
                isClose,
                isCalc,
                resolve
            );
        });
*/
/**
 * @returns {Promise<Array<CustomField>>}
 */
CitationDocService.prototype._getAllAddinFields = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
    });
};

/**
 * @returns {Promise<Array<CustomField>>}
 */
CitationDocService.prototype.getAddinZoteroFields = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        self._getAllAddinFields().then(function (arrFields) {
            try {
                if (arrFields.length) {
                    arrFields = arrFields.filter(function (field) {
                        return (
                            field.Value.indexOf(self._citPrefix) !== -1 ||
                            field.Value.indexOf(self._bibPrefix) !== -1 ||
                            field.Value.indexOf(self._citPrefixOld) !== -1 ||
                            field.Value.indexOf(self._bibPrefixOld) !== -1
                        );
                    });
                }
            } catch (e) {
                reject(e);
            }
            console.warn(arrFields);
            resolve(arrFields);
        });
    });
};

/**
 * @param {string} escapedHtmlText
 * @returns {{text: string, positions: Array<SupSubPositions>}}
 */
CitationDocService.prototype._removeSuperSubTagsWithPositions = function (
    escapedHtmlText
) {
    /** @type {Array<SupSubPositions>} */
    const positions = [];
    let currentIndex = 0;
    let result = "";

    let tempResult = escapedHtmlText;

    // Process <sup> tags
    tempResult = tempResult.replace(
        /<sup\b[^>]*>([^<]*)<\/sup>/gi,
        function (match, content, offset) {
            const start = offset + currentIndex;
            const end = start + content.length;

            positions.push({
                type: "sup",
                content: content,
                start: start,
                end: end,
                originalMatch: match,
            });

            currentIndex += content.length - match.length;
            return content;
        }
    );

    // Reset indexes for <sub> tags
    currentIndex = 0;
    result = tempResult;

    // Process <sub> tags
    tempResult = tempResult.replace(
        /<sub\b[^>]*>([^<]*)<\/sub>/gi,
        function (match, content, offset) {
            const start = offset + currentIndex;
            const end = start + content.length;

            positions.push({
                type: "sub",
                content: content,
                start: start,
                end: end,
                originalMatch: match,
            });

            currentIndex += content.length - match.length;
            return content;
        }
    );

    result = tempResult;

    return {
        text: result,
        positions: positions.sort(function (a, b) {
            return a.start - b.start;
        }),
    };
};

/**
 * @returns {Promise<boolean>}
 */
CitationDocService.prototype.saveAsText = function () {
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
};

/**
 * @param {Array<SupSubPositions>} positions
 * @returns {Promise<void>}
 */
CitationDocService.prototype._setSuperSubByPositions = function (positions) {
    return new Promise(function (resolve) {
        const isCalc = true;
        const isClose = false;
        Asc.scope.positions = positions;
        Asc.plugin.callCommand(
            function () {
                const doc = Api.GetDocument();
                let run = doc.GetCurrentRun();
                Asc.scope.positions.forEach(function (
                    /** @type {SupSubPositions} */ pos
                ) {
                    let range = run.GetRange(pos.start, pos.end);
                    if ("sup" === pos.type) {
                        range.SetVertAlign("superscript");
                    } else {
                        range.SetVertAlign("subscript");
                    }
                });
            },
            isClose,
            isCalc,
            resolve
        );
    });
};

/**
 * @param {Array<CustomField>} fields
 * @returns {Promise<void>}
 */
CitationDocService.prototype.updateAddinFields = function (fields) {
    const self = this;
    /*fields.forEach(function (field) {
        const supSubPositions = self._removeSuperSubTagsWithPositions(
            field.Content
        );
        field.Content = supSubPositions.text;
    });*/
    //console.log("updateAddinFields", fields);
    return new Promise(function (resolve) {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [fields], resolve);
    }) /*.then(function () {
        if (!supSubPositions.positions.length) return;
        return self._setSuperSubByPositions(supSubPositions.positions);
    })*/;
};

export { CitationDocService };
