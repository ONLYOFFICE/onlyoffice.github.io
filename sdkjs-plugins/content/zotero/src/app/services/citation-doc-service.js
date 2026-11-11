/*
 * (c) Copyright Ascensio System SIA 2010-2026
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

/// <reference types="@onlyoffice/doceditor-plugin-types" />
/// <reference types="@onlyoffice/doceditor-plugin-types/word" />
/// <reference path="../types-global.js" />
/// <reference path="../csl/citation/types.js" />
/// <reference path="../csl/styles/types.js" />

import { CslHtmlParser } from "./csl-html-parser";
import { CslDocFormatter } from "./csl-doc-formatter";

/** @typedef {import("@onlyoffice/doceditor-plugin-types/word").Word.ApiParagraph} ApiParagraph */

class CitationDocService {
    #citPrefixOld;
    #citPrefix;
    #bibPrefixOld;
    #citSuffix;
    #bibPrefix;
    #bibSuffix;
    /**
     * Namespace of the custom XML part that carries the document's citation
     * style. The CSL sits in it as text, so it comes back exactly as stored.
     */
    #EMBEDDED_STYLE_NAMESPACE = "urn:onlyoffice:zotero:style";

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
        await this.#addParagraphIfNeeded();

        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
            const formattingPositions = CslHtmlParser.parseHtmlFormatting(text);
            let fieldId = "";
            /** @type {AddinFieldData} */
            const field = {
                FieldId: fieldId,
                Value: this.#bibliographyCode(value),
                Content: formattingPositions.text,
            };

            return this.#addAddinField(field)
                .then(() => {
                    return this.getCurrentField();
                }).then((addedField) => {
                    fieldId = addedField?.FieldId || "";
                    if (!formattingPositions.formatting.length) return;
                    if (fieldId) {
                        return this.#selectField(fieldId).then(() =>
                            CslDocFormatter.formatAfterUpdate(formattingPositions)
                        );
                    }
                    return CslDocFormatter.formatAfterInsert(
                        formattingPositions.formatting,
                        formattingPositions.text,
                    );
                }).then(() => fieldId);
        } else {
            /** @type {AddinFieldData} */
            const field = {
                FieldId: "",
                Value: this.#bibliographyCode(value),
                Content: " ",
            };

            return await this.#pasteBibliographyWithHtml(field, text);
        }
    }

    /**
     * The code of a bibliography field, spaced the way the Zotero plugin for
     * Word writes it: ZOTERO_BIBL {json} CSL_BIBLIOGRAPHY. A bibliography
     * without stored settings has no JSON part.
     * @param {string} value
     * @returns {string}
     */
    #bibliographyCode(value) {
        return [this.#bibPrefix, value.trim(), this.#bibSuffix]
            .filter(function (part) {
                return part !== "";
            })
            .join(" ");
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
        // Inserting while the cursor already sits inside a footnote/endnote
        // must not open a second note nested in the first one.
        const wantsNote = !!(notesStyle && ["footnotes", "endnotes"].indexOf(notesStyle) !== -1);
        const bHasNotes = wantsNote && !(await this.#isInNote());

        if (bHasNotes) {
            await this.#addNote(notesStyle);
        }

        await this.#addAddinField(field);

        if (formattingPositions.formatting.length) {
            const addedField = await this.getCurrentField();
            if (addedField && addedField.FieldId) {
                await this.#selectField(addedField.FieldId);
                await CslDocFormatter.formatAfterUpdate(
                    formattingPositions,
                );
            } else {
                await CslDocFormatter.formatAfterInsert(formattingPositions.formatting, formattingPositions.text);
            }
        }

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

    /**
     * Scans the document body, footnotes and endnotes for paragraphs whose
     * ENTIRE text is a complex field's raw instruction text (e.g. "ADDIN
     * ZOTERO_ITEM CSL_CITATION {json}") exposed as visible content instead
     * of hidden field code. This happens when a field is copy/pasted into a
     * different document and the host editor fails to preserve the field
     * wrapper. Only whole-paragraph matches are reported, so paragraphs
     * that merely mention Zotero amid other text are left untouched.
     * @returns {Promise<Array<{location: "body" | "footnote" | "endnote", index: number, rawValue: string}>>}
     */
    scanForBrokenFields() {
        return new Promise((resolve) => {
            const isCalc = true;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    /**
                     * @param {Array<ApiParagraph>} paragraphs
                     * @param {"body" | "footnote" | "endnote"} location
                     */
                    function scan(paragraphs, location) {
                        const found = [];
                        for (let i = 0; i < paragraphs.length; i++) {
                            const text = paragraphs[i].GetText().trim();
                            if (!/^ADDIN\s*(ZOTERO_ITEM|ZOTERO_BIBL)/i.test(text)) continue;
                            if (text.indexOf("{") === -1) continue;
                            if (text.lastIndexOf("}") !== text.length - 1) continue;
                            found.push({ location: location, index: i, rawValue: text });
                        }
                        return found;
                    }

                    const doc = Api.GetDocument();
                    return scan(doc.GetAllParagraphs(), "body")
                        .concat(scan(doc.GetFootnotesFirstParagraphs(), "footnote"))
                        .concat(scan(doc.GetEndNotesFirstParagraphs(), "endnote"));
                },
                isClose,
                isCalc,
                (result) => resolve(result || []),
            );
        });
    }

    /**
     * Replaces a broken (plain-text) field's paragraph content with a real
     * field carrying the given data.
     * @param {{location: "body" | "footnote" | "endnote", index: number}} match
     * @param {AddinFieldData} field
     * @returns {Promise<AddinFieldData | null>}
     */
    async repairBrokenField(match, field) {
        const selected = await this.#selectBrokenFieldParagraph(match.location, match.index);
        if (!selected) return null;
        await this.#removeSelectedContent();
        await this.#addAddinField(field);
        return this.getCurrentField();
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
            const field = bibFields[0];
            // The bibliography is written anew where the old one was. If
            // that one is gone, it is updated in place like the other
            // fields, so that no second one appears at the cursor.
            const removed = await this.#removeAddinField(field.FieldId);
            if (removed) {
                fields = fields.filter(field => field.Value.indexOf(this.#bibPrefix) !== 0);
                const text = field.Content || '';
                field.Content = " ";
                await this.#pasteBibliographyWithHtml(field, text);
            }
        }

        const formats = this.#makeFormattingPositions(fields);
        await new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "UpdateAddinFields",
                [fields],
                resolve,
            );
        });

        for (const field of fields) {
            if (!field.Content || !field.FieldId) continue;
            const selectFieldResult = await this.#selectField(field.FieldId);
            if (!selectFieldResult) continue;
            await CslDocFormatter.clearFormatting();
            const formattingPositions = formats.get(field.FieldId);
            if (!formattingPositions) continue;
            await CslDocFormatter.formatAfterUpdate(
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
            const addedField = await this.getCurrentField();
            if (addedField && addedField.FieldId) {
                await this.#selectField(addedField.FieldId);
                await CslDocFormatter.formatAfterUpdate(formatting);
            } else {
                await CslDocFormatter.formatAfterInsert(formatting.formatting, formatting.text);
            }
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
            const addedField = await this.getCurrentField();
            if (addedField && addedField.FieldId) {
                await this.#selectField(addedField.FieldId);
                await CslDocFormatter.formatAfterUpdate(formatting);
            } else {
                await CslDocFormatter.formatAfterInsert(formatting.formatting, formatting.text);
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

            const isInNote = await this.#isInNote();
            if (isInNote) {
                // Field is already in a footnote/endnote - update in place
                editedFields.push(field);
                continue;
            }

            // Field is inline - needs to be moved into a note
            await this.#addNote(notesStyle);
            await this.#addAddinField(field);
            const formatting = formats.get(field.FieldId);
            if (!formatting) continue;
            const addedField = await this.getCurrentField();
            if (addedField && addedField.FieldId) {
                await this.#selectField(addedField.FieldId);
                await CslDocFormatter.formatAfterUpdate(formatting);
            } else {
                await CslDocFormatter.formatAfterInsert(formatting.formatting, formatting.text);
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
            // Apply formatting (italic, bold, etc.) after updating fields
            for (const field of editedFields) {
                const formatting = formats.get(field.FieldId);
                if (!formatting) continue;
                const selectFieldResult = await this.#selectField(field.FieldId);
                if (!selectFieldResult) continue;
                await CslDocFormatter.formatAfterUpdate(
                    formatting,
                );
            }
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
            window.Asc.plugin.executeMethod("MoveCursorToField", [fieldId, isBegin], () => resolve());
        });
    }

    /**
     * @returns {Promise<void>}
     */
    addParagraphAfterCursor() {
        return new Promise((resolve) => {
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const paragraph = doc.GetCurrentParagraph();
                    if (!paragraph) return;
                    if (!paragraph.InsertParagraph("", "after", true)) return;
                    doc.MoveCursorRight(1);
                },
                false,
                false,
                () => resolve(),
            );
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
            window.Asc.plugin.executeMethod("MoveCursorOutsideField", [fieldId, isBeforeField], () => resolve());
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
     * @returns {Promise<AddinFieldData | null>}
     */
    #addAddinField(field) {
        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod("AddAddinField", [field], resolve);
        });
    }

    /**
     * @returns {Promise<void>}
     */
    #addParagraphIfNeeded() {
        return new Promise((resolve) => {
            Asc.plugin.callCommand(
                () => {
                    const oDocument = Api.GetDocument();
                    const oParagraph = oDocument.GetCurrentParagraph();
                    if (!oParagraph) {
                        return;
                    }
                    if (oParagraph.GetText() === "") {
                        return;
                    }

                    const oNewParagraph = oParagraph.InsertParagraph(
                        "",
                        "after",
                        true,
                    );
                    if (!oNewParagraph) {
                        return;
                    }

                    const oRange = oNewParagraph.GetRange();
                    if (oRange) {
                        oRange.MoveCursorToPos(0);
                    }
                },
                false,
                false,
                resolve,
            );
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
            window.Asc.plugin.executeMethod(
                "PasteHtml",
                [html, { MergeLast: true }],
                function () {
                    resolve();
                },
            );
        });
    }

    /** @returns {Promise<boolean>} */
    #isInNote() {
        return new Promise((resolve) => {
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const note = doc.GetCurrentFootEndnote();
                    return !!note;
                },
                false,
                true,
                (result) => resolve(!!result),
            );
        });
    }

    /**
     * Removes a field the way a paste replaces a selection: the cursor
     * stays where the field was.
     * @param {string} fieldId
     * @returns {Promise<boolean>} false if the editor found no such field
     */
    #removeAddinField(fieldId) {
        return new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "RemoveAddinField",
                [fieldId],
                (result) => resolve(result === true),
            );
        });
    }

    /** @returns {Promise<void>} */
    #removeSelectedContent() {
        return new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "RemoveSelectedContent",
                undefined,
                () => resolve(),
            );
        });
    }
    /**
     * @param {string} fieldId
     * @returns {Promise<boolean>}
     */
    #selectField(fieldId) {
        return new Promise(function (resolve) {
            window.Asc.plugin.executeMethod(
                "SelectAddinField",
                [fieldId],
                (result) => resolve(result !== false),
            );
        });
    }

    /**
     * Re-locates a paragraph reported by `scanForBrokenFields` by its stable
     * index (paragraph object references don't survive across separate
     * `callCommand` calls, so it has to be looked up again each time) and
     * selects it, ready for `#removeSelectedContent`.
     * @param {"body" | "footnote" | "endnote"} location
     * @param {number} index
     * @returns {Promise<boolean>}
     */
    #selectBrokenFieldParagraph(location, index) {
        return new Promise((resolve) => {
            Asc.scope.brokenFieldLocation = location;
            Asc.scope.brokenFieldIndex = index;
            const isCalc = true;
            const isClose = false;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    let paragraphs;
                    if ("footnote" === Asc.scope.brokenFieldLocation) {
                        paragraphs = doc.GetFootnotesFirstParagraphs();
                    } else if ("endnote" === Asc.scope.brokenFieldLocation) {
                        paragraphs = doc.GetEndNotesFirstParagraphs();
                    } else {
                        paragraphs = doc.GetAllParagraphs();
                    }
                    const paragraph = paragraphs[Asc.scope.brokenFieldIndex];
                    if (!paragraph) return false;
                    paragraph.Select();
                    return true;
                },
                isClose,
                isCalc,
                (result) => resolve(!!result),
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
     * @param {string} html - HTML string with formatting
     * @returns {Promise<string>}
     */
    async #pasteBibliographyWithHtml(field, html) {
        html = CslHtmlParser.purifyHtml(html);
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
                                 if (!margin || !("GetText" in margin) || !("AddText" in margin)) continue;
                                 if (margin.GetText() === numberText) {
                                    margin.AddText("\t");
                                    margin.SetItalic(false);
                                    break;
                                 }
                            }
                            let margin = paragraph.Search(Asc.scope.hash, true)[0];
                            if (!margin) return;
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

    async loadStyleFromDocument() {
        return new Promise((resolve) => {
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const props = doc.GetCustomProperties();
                    if (!props) return "";
                    let xml = "";
                    let i = 1;
                    const MAX_ZOTERO_PREF_CHUNKS = 1000;
                    while (i <= MAX_ZOTERO_PREF_CHUNKS) {
                        const val = props.Get("ZOTERO_PREF_" + i);
                        if (val === null || val === undefined) break;
                        xml += String(val);
                        i++;
                    }
                    return xml;
                },
                false,
                true,
                (result) => resolve(result || ""),
            );
        });
    }

    /**
     * The citation style stored in the document by saveEmbeddedStyle().
     * @returns {Promise<StyleCopy|null>}
     */
    async loadEmbeddedStyle() {
        const xml = await new Promise((resolve) => {
            Asc.scope.embeddedStyleNamespace = this.#EMBEDDED_STYLE_NAMESPACE;
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    if (!doc) {
                        return "";
                    }
                    const customParts = doc.GetCustomXmlParts();
                    if (!customParts) {
                        return "";
                    }
                    const parts = customParts
                        .GetByNamespace(Asc.scope.embeddedStyleNamespace);
                    return parts.length ? parts[0].GetXml() : "";
                },
                false,
                false,
                resolve
            );
        });
        if (!xml) {
            return null;
        }
        const root = new DOMParser().parseFromString(
            xml,
            "application/xml"
        ).documentElement;
        if (!root || root.namespaceURI !== this.#EMBEDDED_STYLE_NAMESPACE) {
            return null;
        }
        return {
            styleId: root.getAttribute("style-id") || "",
            updated: root.getAttribute("updated") || "",
            content: root.textContent || "",
        };
    }

    /**
     * Stores the citation style in the document, replacing the one there -
     * unless the document already holds this style in the same or a newer
     * version, which a co-author may have stored meanwhile.
     * @param {StyleCopy} style
     * @returns {Promise<void>}
     */
    async saveEmbeddedStyle(style) {
        /**
         * @param {string} text
         * @returns {string}
         */
        const escapeXml = (text) => String(text)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;");

        const xml =
            '<?xml version="1.0" encoding="UTF-8"?>' +
            '<embeddedStyle xmlns="' + this.#EMBEDDED_STYLE_NAMESPACE + '"' +
            ' style-id="' + escapeXml(style.styleId) + '"' +
            ' updated="' + escapeXml(style.updated) + '">' +
            escapeXml(style.content) +
            "</embeddedStyle>";
        return new Promise((resolve) => {
            Asc.scope.embeddedStyleNamespace = this.#EMBEDDED_STYLE_NAMESPACE;
            Asc.scope.embeddedStyle = {
                styleId: style.styleId,
                updated: style.updated,
                xml: xml,
            };
            Asc.plugin.callCommand(
                function () {
                    const style = Asc.scope.embeddedStyle;
                    const doc = Api.GetDocument();
                    if (!doc) {
                        return;
                    }
                    const customParts = doc.GetCustomXmlParts();
                    if (!customParts) {
                        return;
                    }
                    const stored = customParts.GetByNamespace(
                        Asc.scope.embeddedStyleNamespace
                    );
                    for (let i = 0; i < stored.length; i++) {
                        // The attributes come before the CSL text.
                        const head = stored[i].GetXml().slice(0, 1000);
                        const id = /style-id="([^"]*)"/.exec(head);
                        const updated = /updated="([^"]*)"/.exec(head);
                        if (!id || id[1] !== style.styleId || !updated) {
                            continue;
                        }
                        const storedTime = Date.parse(updated[1]);
                        const newTime = Date.parse(style.updated);
                        if (isNaN(newTime) || storedTime >= newTime) {
                            return;
                        }
                    }
                    for (let i = 0; i < stored.length; i++) {
                        stored[i].Delete();
                    }
                    customParts.Add(style.xml);
                },
                false,
                false,
                function () {
                    resolve();
                }
            );
        });
    }

    /**
     * Drops the citation style stored by saveEmbeddedStyle().
     * @returns {Promise<void>}
     */
    async removeEmbeddedStyle() {
        return new Promise((resolve) => {
            Asc.scope.embeddedStyleNamespace = this.#EMBEDDED_STYLE_NAMESPACE;
            Asc.plugin.callCommand(
                function () {
                    const doc = Api.GetDocument();
                    if (!doc) {
                        return;
                    }
                    const customParts = doc.GetCustomXmlParts();
                    if (!customParts) {
                        return;
                    }
                    const stored = customParts
                        .GetByNamespace(Asc.scope.embeddedStyleNamespace);
                    for (let i = 0; i < stored.length; i++) {
                        stored[i].Delete();
                    }
                },
                false,
                false,
                function () {
                    resolve();
                }
            );
        });
    }

    /**
     * @param {Array<string>} chunks
     * @returns 
     */
    async saveStyleToDocument(chunks) {
        return new Promise(function (resolve) {
            Asc.scope.prefChunks = chunks;
            Asc.plugin.callCommand(
                function () {
                    var doc = Api.GetDocument();
                    var props = doc.GetCustomProperties();
                    var chunks = Asc.scope.prefChunks;
                    var slotsToClear = Math.max(chunks.length, 10);
                    for (var i = 0; i < slotsToClear; i++) {
                        props.Add("ZOTERO_PREF_" + (i + 1), i < chunks.length ? chunks[i] : "");
                    }
                },
                false,
                false,
                resolve
            );
        });
    }
}

export { CitationDocService };
