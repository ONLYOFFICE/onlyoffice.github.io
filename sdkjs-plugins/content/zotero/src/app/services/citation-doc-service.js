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
     * @returns {Promise<string>}
     */
    async addBibliography(text, value) {
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
            const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
            let fieldId = "";
            /** @type {AddinFieldData} */
            const field = {
                FieldId: fieldId,
                Value: this.#bibPrefix + " " + value + " " + this.#bibSuffix,
                Content: formattingPositions.text,
            };

            return this.#addAddinField(field)
                .then(() => {
                    return this.getCurrentField();
                }).then((addedField) => {
                    fieldId = addedField?.FieldId || "";
                    if (!formattingPositions.formatting.length) return;
                    return CslDocFormatter.formatAfterInsert(
                        formattingPositions.formatting,
                    );
                }).then(() => fieldId);
        } else {
            /** @type {AddinFieldData} */
            const field = {
                FieldId: "",
                Value: this.#bibPrefix + " " + value + " " + this.#bibSuffix,
                Content: " ",
            };

            return await this.#pasteBibliographyWithHtml(field, text);
        }
    }

    /**
     * @param {string} text
     * @param {string} value
     * @param {NoteStyle | null} notesStyle
     * @returns {Promise<boolean>}
     */
    async addCitation(text, value, notesStyle) {
        const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
        /** @type {AddinFieldData} */
        const field = {
            FieldId: "",
            Value: this.#citPrefix + " " + this.#citSuffix + " " + value,
            Content: formattingPositions.text,
        };
        const bHasNotes = !!(notesStyle && ["footnotes", "endnotes"].indexOf(notesStyle) !== -1)
        if (bHasNotes) {
            await this.#addNote(notesStyle);
        }

        await this.#addAddinField(field);

        if (!formattingPositions.formatting.length) return bHasNotes;
        await CslDocFormatter.formatAfterInsert(formattingPositions.formatting);
        
        if (bHasNotes) {
            await this.#selectFieldReference();
        }
        return bHasNotes;
        
    }

    /** @returns {Promise<AddinFieldData | null>} */
    getCurrentField() {
        return new Promise(function (resolve, reject) {
            window.Asc.plugin.executeMethod("GetCurrentAddinField", undefined, resolve);
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
     * @returns {Promise<string[]>}
     */
    async updateAddinFields(fields) {
        const fieldIds = fields.map(field => field.FieldId);
        const editorVersion = window.Asc.scope.editorVersion;
        const bibFields = fields.filter(field => field.Value.indexOf(this.#bibPrefix) === 0);

        if (bibFields.length && editorVersion && editorVersion >= 9004000) {
            fields = fields.filter(field => field.Value.indexOf(this.#bibPrefix) !== 0);
            const field = bibFields[0];
            await this.#selectField(field.FieldId);
            const text = field.Content || '';
            field.Content = " ";
            await this.#removeSelectedContent();
            await this.#pasteBibliographyWithHtml(field, text);
        }

        const formats = this.#makeFormattingPositions(fields);
        await new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "UpdateAddinFields",
                [fields],
                resolve,
            );
        });

        if (!formats.size) return fieldIds;
        for (const [fieldId, formattingPositions] of formats) {
            const selectFieldResult = await this.#selectField(fieldId);
            if (!selectFieldResult) continue;
            await CslDocFormatter.formatAfterUpdate(
                fieldId,
                formattingPositions,
            );
        }
        return fieldIds;
    }

    /**
     * @param {Array<AddinFieldData>} fields
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
     * @param {Array<AddinFieldData>} fields
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
     * @param {Array<AddinFieldData>} fields
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
     * @param {string} fieldId
     * @param {boolean} [isBegin]
     * @returns {Promise<void>}
    */
    async moveCursorToField(fieldId, isBegin) {
        return new Promise((resolve) => {
            isBegin = isBegin ?? true;
            window.Asc.plugin.executeMethod("MoveCursorToField", [fieldId, isBegin], resolve);
        });
    }

    /**
     * @param {string} fieldId
     * @param {boolean} [isBeforeField]
     * @returns {Promise<void>}
    */
    async moveCursorOutsideField(fieldId, isBeforeField) {
        return new Promise((resolve) => {
            isBeforeField = isBeforeField ?? false;
            window.Asc.plugin.executeMethod("MoveCursorOutsideField", [fieldId, isBeforeField], resolve);
        });
    }

    /**
     * @returns {Promise<void>}
    */
    async moveCursorRight() {
        return new Promise((resolve) => {
            const isCalc = true;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    doc.MoveCursorRight(1, false);
                },
                isClose,
                isCalc,
                resolve,
            );
        });
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
     * @returns {Promise<string>}
     */
    async #pasteBibliographyWithHtml(field, html) {
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
        if (!Asc.scope.bibStyle) {
            throw "Bibliography style is not defined";
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const paragraphs = doc.querySelectorAll(".csl-entry");
        const numbers = new Array(paragraphs.length);
        const hash = Date.now().toString(36);
        paragraphs.forEach((p, index) => {
            const margin = p.querySelector(".csl-left-margin");
            const right = p.querySelector(".csl-right-inline");
            right?.replaceWith(...right.childNodes);
            if (margin) {
                numbers[index] = margin.textContent.trim() + hash;
                const em = document.createElement("em");
                while (margin.firstChild) {
                    em.appendChild(margin.firstChild);
                }
                const span = document.createElement("span");
                span.textContent = hash;
                em.appendChild(span);
                margin.replaceWith(em);
            }
            const paragraph = document.createElement('p');
            while (p.firstChild) {
                paragraph.appendChild(p.firstChild);
            }
            p.replaceWith(paragraph);
        });
        
        html = doc.body.innerHTML;
        await this.#pasteHtml(html);

        let addedField = await this.getCurrentField();
        if (!addedField) {
            console.warn('Failed to get current field after paste');
            // I don't know why the field is unavailable, but this happens with a large number of quotes.
            for (let i = 0; i < 5; i++) {
                await new Promise(r => {
                    setTimeout(() => {r(true)}, 100);
                });
                addedField = await this.getCurrentField();
                if (addedField) {
                    break;
                }
            }
            
            if (!addedField) {
                throw new Error('Failed to get current field after paste');
            }
            
        }
        
        await this.#selectField(addedField.FieldId);
        await new Promise((resolve) => {
            const isCalc = false;
            const isClose = false;
            Asc.scope.numbers = numbers;
            Asc.scope.hash = hash;
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
                            const numberText = String(Asc.scope.numbers[index]);
                            
                            for (let i = 0; i < paragraph.GetElementsCount(); i++) {
                                 let margin = paragraph.GetElement(i);
                                 if (margin.GetText() === numberText) {
                                    margin.AddTabStop();
                                    margin.SetItalic(false);
                                    break;
                                 }
                            }
                            let margin = paragraph.Search(Asc.scope.hash, true)[0];
                            margin.Delete();

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
        return addedField.FieldId;
    }
}

export { CitationDocService };
