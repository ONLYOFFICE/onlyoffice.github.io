// @ts-check

/// <reference path="./types-global.js" />
/// <reference path="./csl/citation/citation.js" />
/// <reference path="./csl/styles/style-parser.js" />

/**
 * @typedef {Object} CustomField
 * @property {string} Value
 * @property {string} Content
 * @property {string} [FieldId]
 */

/**
 * @param {string} citPrefix
 * @param {string} citSuffix
 * @param {string} bibPrefix
 * @param {string} bibSuffix
 * @param {StyleFormat} styleFormat
 * @param {"footnotes" | "endnotes"} notesStyle
 */
function CitationDocService(
    citPrefix,
    citSuffix,
    bibPrefix,
    bibSuffix,
    styleFormat,
    notesStyle
) {
    this._citPrefixOld = "ZOTERO_CITATION";
    this._bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";

    this._citPrefix = citPrefix;
    this._citSuffix = citSuffix;
    this._bibPrefix = bibPrefix;
    this._bibSuffix = bibSuffix;
    this._styleFormat = styleFormat;
    this._notesStyle = notesStyle;

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
 * @returns
 */
CitationDocService.prototype.addCitation = function (text, value) {
    const self = this;
    const supSubPositions = this._removeSuperSubTagsWithPositions(text);
    /** @type {CustomField} */
    const field = {
        Value: this._citPrefix + " " + this._citSuffix + value,
        Content: supSubPositions.text,
    };
    if ("note" === this._styleFormat) {
        switch (this._notesStyle) {
            case "footnotes":
                window.Asc.plugin.callCommand(function () {
                    const oDocument = Api.GetDocument();
                    oDocument.AddFootnote();
                });
                break;
            case "endnotes":
                window.Asc.plugin.callCommand(function () {
                    const oDocument = Api.GetDocument();
                    oDocument.AddEndnote();
                });
                break;
        }
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
CitationDocService.prototype.getAllAddinFields = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
    });
};

/**
 * @returns {Promise<Array<CustomField>>}
 */
CitationDocService.prototype._getAddinZoteroFields = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
        self.getAllAddinFields().then(function (arrFields) {
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
    return this._getAddinZoteroFields().then(function (arrFields) {
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
 * @param {"footnotes" | "endnotes"} notesStyle
 */
CitationDocService.prototype.setNotesStyle = function (notesStyle) {
    this._notesStyle = notesStyle;
};

/**
 * @param {StyleFormat} styleFormat
 */
CitationDocService.prototype.setStyleFormat = function (styleFormat) {
    this._styleFormat = styleFormat;
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
