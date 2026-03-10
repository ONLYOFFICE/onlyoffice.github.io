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
    constructor(citPrefix, citSuffix, bibPrefix, bibSuffix) {
        this.#citPrefixOld = "ZOTERO_CITATION";
        this.#bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";

        this.#citPrefix = citPrefix;
        this.#citSuffix = citSuffix;
        this.#bibPrefix = bibPrefix;
        this.#bibSuffix = bibSuffix;
    }

    /**
     * @param {string} text
     * @param {string} value
     * @returns {Promise<void>}
     */
    async addBibliography(text, value) {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
            const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
            /** @type {AddinFieldData} */
            const field = {
                FieldId: "",
                Value: this.#bibPrefix + value + this.#bibSuffix,
                Content: formattingPositions.text,
            };

            return this.#addAddinField(field).then(function () {
                if (!formattingPositions.formatting.length) return;
                return CslDocFormatter.formatAfterInsert(
                    formattingPositions.formatting,
                );
            });
        } else {
            /** @type {AddinFieldData} */
            const field = {
                FieldId: "",
                Value: this.#bibPrefix + value + this.#bibSuffix,
                Content: " ",
            };

            await this.#pasteAddinFieldWithHtml(field, text);
        }
    }

    /**
     * @param {string} text
     * @param {string} value
     * @param {NoteStyle | null} notesStyle
     * @returns
     */
    async addCitation(text, value, notesStyle) {
        const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
        /** @type {AddinFieldData} */
        const field = {
            FieldId: "",
            Value: this.#citPrefix + " " + this.#citSuffix + value,
            Content: formattingPositions.text,
        };
        if (
            notesStyle &&
            ["footnotes", "endnotes"].indexOf(notesStyle) !== -1
        ) {
            await this.#addNote(notesStyle);
        }

        return this.#addAddinField(field).then(function () {
            if (!formattingPositions.formatting.length) return;
            return CslDocFormatter.formatAfterInsert(
                formattingPositions.formatting
            );
        });
    }

    /** @returns {Promise<Array<AddinFieldData>>} */
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
            return Promise.all(promises).then(() => {
                return true;
            }).catch(e => {
                console.error(e);
                return false;
            });
        });
    }

    /**
     * @param {Array<CustomField>} fields
     * @returns {Promise<void>}
     */
    async updateAddinFields(fields) {
        const editorVersion = window.Asc.scope.editorVersion;
        const bibFields = fields.filter(field => field.Value.indexOf(this.#bibPrefix) === 0);

        if (bibFields.length && editorVersion && editorVersion >= 9004000) {
            fields = fields.filter(field => field.Value.indexOf(this.#bibPrefix) !== 0);
            const field = bibFields[0];
            await this.#selectField(field.FieldId);
            const text = field.Content || '';
            field.Content = " ";
            await this.#removeSelectedContent();
            await this.#pasteAddinFieldWithHtml(field, text);
        }

        const formats = this.#makeFormattingPositions(fields);
        await new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "UpdateAddinFields",
                [fields],
                resolve,
            );
        });

        if (!formats.size) return;
        for (const [fieldId, formattingPositions] of formats) {
            const selectFieldResult = await this.#selectField(fieldId);
            if (!selectFieldResult) continue;
            await CslDocFormatter.formatAfterUpdate(
                fieldId,
                formattingPositions,
            );
        }
    }

    /**
     * @param {Array<CustomField>} fields
     * @returns {Promise<void>}
     */
    async convertNotesToText(fields) {
        const formats = this.#makeFormattingPositions(fields);
    
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (!field.FieldId) {
                console.error("Field id is not defined");
                continue;
            }

            const selectFieldResult = await this.#selectField(field.FieldId);
            if (!selectFieldResult) continue;
            const isReferenceSelected = await this.#selectFieldReference();
            if (!isReferenceSelected) continue;
            await this.#removeSuperscript();
            await this.#removeSelectedContent();
            await this.#addAddinField(field);
            const formatting = formats.get(field.FieldId);
            if (!formatting) continue;
            await CslDocFormatter.formatAfterInsert(formatting.formatting);
        }
    }

    /**
     * @param {Array<CustomField>} fields
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertTextToNotes(fields, notesStyle) {
        const formats = this.#makeFormattingPositions(fields);

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (!field.FieldId) continue;

            const selectFieldResult = await this.#selectField(field.FieldId);
            if (!selectFieldResult) continue;
            await this.#removeSelectedContent();
            await this.#addNote(notesStyle);
            await this.#addAddinField(field);
            const formatting = formats.get(field.FieldId);
            if (!formatting) continue;
            await CslDocFormatter.formatAfterInsert(formatting.formatting);
        }
    }

    /**
     * @param {Array<CustomField>} fields
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertNotesStyle(fields, notesStyle) {
        /** @type {Array<AddinFieldData>} */
        const editedFields = [];
        const formats = this.#makeFormattingPositions(fields);

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (!field.FieldId) continue;

            if (!field.Content) {
                // save user changes
                editedFields.push(field);
                continue;
            }

            const selectFieldResult = await this.#selectField(field.FieldId);
            if (!selectFieldResult) continue;
            const isReferenceSelected = await this.#selectFieldReference();
            if (!isReferenceSelected) continue;
            await this.#removeSuperscript();
            await this.#removeSelectedContent();
            await this.#addNote(notesStyle);
            await this.#addAddinField(field);
            const formatting = formats.get(field.FieldId);
            if (!formatting) continue;
            await CslDocFormatter.formatAfterInsert(formatting.formatting);
        }
        if (editedFields.length) {
            await new Promise(function (resolve) {
                window.Asc.plugin.executeMethod(
                    "UpdateAddinFields",
                    [editedFields],
                    resolve,
                );
            });
        }
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
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    #addNote(notesStyle) {
        Asc.scope.notesStyle = notesStyle;
        return new Promise((resolve) => {
            Asc.plugin.callCommand(
                () => {
                    const oDocument = Api.GetDocument();
                    if ("footnotes" === Asc.scope.notesStyle) {
                        oDocument.AddFootnote();
                    } else if ("endnotes" === Asc.scope.notesStyle) {
                        oDocument.AddEndnote();
                    }
                },
                false,
                false,
                resolve,
            );
        });
    }

    /**
     * @returns {Promise<Array<CustomField>>}
     */
    #getAllAddinFields() {
        return new Promise(function (resolve, reject) {
            window.Asc.plugin.executeMethod("GetAllAddinFields", undefined, resolve);
        });
    }

    /** @returns {Promise<AddinFieldData | null>} */
    #getCurrentField() {
        return new Promise(function (resolve, reject) {
            window.Asc.plugin.executeMethod("GetCurrentAddinField", undefined, resolve);
        });
    }

    /**
     * @param {Array<CustomField>} fields
     * @returns {Map<string, {text: string, formatting: Array<FormattingPositions>}>}
     * @modifies {fields}
     */
    #makeFormattingPositions(fields) {
        /** @type {Map<string, {text: string, formatting: Array<FormattingPositions>}>} */
        const formats = new Map();
        fields.forEach(function (field) {
            if (!field.Content) return;
            const formattingPositions = CslHtmlParser.parseHtmlFormatting(
                field.Content
            );
            field.Content = formattingPositions.text;
            if (formattingPositions.formatting.length && field.FieldId) {
                formats.set(field.FieldId, formattingPositions);
            }
        });
        return formats;
    }

    /** @returns {Promise<void>} */
    #removeSelectedContent() {
        return new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "RemoveSelectedContent",
                undefined,
                resolve,
            );
        });
    }
    /**
     * @param {string} fieldId
     * @returns {Promise<boolean>}
     */
    #selectField(fieldId) {
        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod("SelectAddinField", [fieldId], () =>
                resolve(true),
            );
        });
    }

    /**
     * @returns {Promise<boolean>}
     */
    #selectFieldReference() {
        return new Promise(function (resolve) {
            const isCalc = true;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const note = doc.GetCurrentFootEndnote();
                    if (!note) return;
                    const reference = note.SelectNoteReference();
                    if (!reference) return;
                },
                isClose,
                isCalc,
                () => resolve(true),
            );
        });
    }

    #removeSuperscript() {
        return new Promise(function (resolve) {
            const isCalc = false;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const selRange = doc.GetRangeBySelect();
                    if (!selRange) return;
                    selRange.SetVertAlign("baseline");
                },
                isClose,
                isCalc,
                resolve,
            );
        });
    }

    /**
     * @param {AddinFieldData} field 
     * @param {string} html 
     * @returns {Promise<void>}
     */
    async #pasteAddinFieldWithHtml(field, html) {
        await this.#addAddinField(field);
        await new Promise((resolve) => {
            const isCalc = true;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    doc.MoveCursorLeft(1, true);
                },
                isClose,
                isCalc,
                resolve,
            );
        });

        // Only apply bibliography style if this is a bibliography field (starts with bibPrefix)
        if (field.Value.indexOf(this.#bibPrefix) === 0 && Asc.scope.bibStyle) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const paragraphs = doc.querySelectorAll(".csl-entry");
            const numbers = new Array(paragraphs.length);
            paragraphs.forEach((p, index) => {
                const margin = p.querySelector(".csl-left-margin");
                const right = p.querySelector(".csl-right-inline");
                right?.replaceWith(...right.childNodes);
                if (margin) {
                    numbers[index] = margin.textContent.trim();
                    margin.remove();
                }
            });
            
            html = doc.body.innerHTML;
            await this.#pasteHtml(html);

            const field = await this.#getCurrentField();
            if (!field) return;
            await this.#selectField(field.FieldId);
            await new Promise((resolve) => {
                const isCalc = false;
                const isClose = false;
                Asc.scope.numbers = numbers;
                Asc.plugin.callCommand(
                    () => {
                        const doc = Api.GetDocument();
                        const range = doc.GetRangeBySelect();
                        if (!range) return;
                        /** @type {BibliographyStyles} */
                        const style = Asc.scope.bibStyle;
                        const paragraphs = range.GetAllParagraphs();

                        paragraphs.forEach((paragraph, index) => {
                            const text = paragraph.GetText().trim();
                            if (text === '') {
                                return;
                            }
                            if (typeof style.linespacing === "number") {
                                paragraph.SetSpacingLine(240 * style.linespacing, "exact");
                            }
                            if (typeof style.entryspacing === "number") {
                                paragraph.SetSpacingAfter(240 * style.entryspacing);
                            }
                            if (style['second-field-align']) { 
                                let margin = Api.CreateRun();
                                margin.AddText(Asc.scope.numbers[index]);
                                margin.AddTabStop();
                                let elementIndex = index === 0 ? 4 : 0; // 4 - magic number, need to find out why
                                paragraph.AddElement(margin, elementIndex);
                                paragraph.SetIndLeft(style.maxoffset * 120);
                                paragraph.SetIndFirstLine(-(style.maxoffset * 120));
                            } else if (style.hangingindent) {
                                paragraph.SetIndLeft(720);
                                paragraph.SetIndFirstLine(-720);
                            }
                        });
                    },
                    isClose,
                    isCalc,
                    resolve,
                );
            });
            Asc.scope.bibStyle = null;
        } else {
            await this.#pasteHtml(html);
        }
    }
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
