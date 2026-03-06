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

/// <reference path="../../../../../v1/onlyoffice-types/index.d.ts" /> 
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

            await this.#addAddinField(field);
            await this.#moveCursorLeft();
            await this.#pasteHtml(text);
        }
    }

    /**
     * @param {string} text
     * @param {string} value
     * @param {NoteStyle | null} notesStyle
     * @returns {Promise<void>}
     */
    async addCitation(text, value, notesStyle) {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
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
        } else {
            /** @type {AddinFieldData} */
            const field = {
                FieldId: "",
                Value: this.#citPrefix + " " + this.#citSuffix + value,
                Content: " ",
            };
            if (
                notesStyle &&
                ["footnotes", "endnotes"].indexOf(notesStyle) !== -1
            ) {
                await this.#addNote(notesStyle);
            }

            await this.#addAddinField(field);
            await this.#moveCursorLeft();
            await this.#pasteHtml(text);
        }
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
            const promises = arrFields.map(function (field) {
                return new Promise(function (resolve) {
                    window.Asc.plugin.executeMethod(
                        "RemoveFieldWrapper",
                        [field.FieldId],
                        resolve,
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
     * @param {Array<AddinFieldData>} fields
     * @returns {Promise<void>}
     */
    async updateAddinFields(fields) {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
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
        } else {
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (!field.FieldId) {
                    console.error("Field id is not defined");
                    continue;
                }

                const selectFieldResult = await this.#selectField(field.FieldId);
                if (!selectFieldResult) continue;
                const text = field.Content || '';
                field.Content = " ";
                await this.#removeSelectedContent();
                await this.#addAddinField(field);
                await this.#moveCursorLeft();
                await this.#pasteHtml(text);
            }
        }
    }

    /**
     * @param {Array<AddinFieldData>} fields
     * @returns {Promise<void>}
     */
    async convertNotesToText(fields) {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
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
        } else {
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
                
                const text = field.Content || '';
                field.Content = " ";
                await this.#addAddinField(field);
                await this.#moveCursorLeft();
                await this.#pasteHtml(text);
            }
        }
        
    }

    /**
     * @param {Array<AddinFieldData>} fields
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertTextToNotes(fields, notesStyle) {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
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
        } else {
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (!field.FieldId) continue;

                const selectFieldResult = await this.#selectField(field.FieldId);
                if (!selectFieldResult) continue;
                await this.#removeSelectedContent();
                await this.#addNote(notesStyle);
                
                const text = field.Content || '';
                field.Content = " ";
                await this.#addAddinField(field);
                await this.#moveCursorLeft();
                await this.#pasteHtml(text);
            }
        }
    }

    /**
     * @param {Array<AddinFieldData>} fields
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertNotesStyle(fields, notesStyle) {
        /** @type {Array<AddinFieldData>} */
        const editedFields = [];
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
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
        } else {
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

                const text = field.Content || '';
                field.Content = " ";
                await this.#addAddinField(field);
                await this.#moveCursorLeft();
                await this.#pasteHtml(text);
            }
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
     * @param {AddinFieldData} field
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
     * @returns {Promise<Array<AddinFieldData>>}
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
     * @param {Array<AddinFieldData>} fields
     * @returns {Map<string, {text: string, formatting: Array<FormattingPositions>}>}
     * @modifies {fields}
     */
    #makeFormattingPositions(fields) {
        /** @type {Map<string, {text: string, formatting: Array<FormattingPositions>}>} */
        const formats = new Map();
        fields.forEach(function (field) {
            if (!field.Content) return;
            const formattingPositions = CslHtmlParser.parseHtmlFormatting(
                field.Content,
            );
            field.Content = formattingPositions.text;
            if (formattingPositions.formatting.length && field.FieldId) {
                formats.set(field.FieldId, formattingPositions);
            }
        });
        return formats;
    }

    /**
     * @param {string} html
     * @returns {Promise<void>}
     */
    #pasteHtml(html) {
        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod("PasteHtml", [html], resolve);
        });
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
            const editorVersion = window.Asc.scope.editorVersion;
            if (editorVersion && editorVersion < 9003000) {
                console.error("Cannot select addin field.");
                console.error("Editor version is less than 9.3.0");
                resolve(false);
            }
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
            const editorVersion = window.Asc.scope.editorVersion;
            if (editorVersion && editorVersion < 9003000) {
                console.error("Cannot select addin field reference.");
                console.error("Editor version is less than 9.3.0");
                resolve(false);
            }
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

    async #moveCursorLeft() {
        return new Promise(function (resolve) {
            const isCalc = false;
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
    }
}

export { CitationDocService };
