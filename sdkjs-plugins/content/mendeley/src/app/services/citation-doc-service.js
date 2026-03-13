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

class CitationDocService {
    #citPrefix;
    #bibPrefix;

    /**
     * @param {string} citPrefix
     * @param {string} bibPrefix
     */
    constructor(citPrefix, bibPrefix) {
        this.#citPrefix = citPrefix;
        this.#bibPrefix = bibPrefix;
    }

    /**
     * @param {string} text
     * @returns {Promise<string>}
     */
    async addBibliography(text) {
        /** @type {ContentControlProperties} */
        const control = {
            Tag: this.#bibPrefix,
            Lock: 3, // can edit
            PlaceHolderText: "",
        };
        
        await this.#addContentControl(control, 1);
        return this.#pasteContentControlHtml(text);
    }

    /**
     * @param {string} text
     * @param {string} tag
     * @param {NoteStyle | null} notesStyle
     * @returns {Promise<string>}
     */
    async addCitation(text, tag, notesStyle) {
        /** @type {ContentControlProperties} */
        const control = {
            Tag: tag,
            Lock: 3, // can edit
            PlaceHolderText: "",
        };
        await this.#addContentControl(control);
        const bAddNote = notesStyle &&
            ["footnotes", "endnotes"].indexOf(notesStyle) !== -1;

        const internalId = await new Promise((resolve) => {
            Asc.scope.bAddNote = bAddNote;
            Asc.plugin.callCommand(
                () => {
                    const oDocument = Api.GetDocument();
                    const control = oDocument.GetCurrentContentControl();
                    if (Asc.scope.bAddNote) {
                        control.AddText(""); // required to select an empty control
                        control.Select();
                    }
                    return control.GetInternalId();
                },
                false,
                false,
                resolve,
            );
        });
        if (bAddNote) {
            await this.#addNote(notesStyle);
        }

        await this.#pasteHtml(text);
        return internalId;
    }

    /**
     * @param {"footnotes" | "endnotes"} [notesStyle]
     * @returns {Promise<Array<ContentControlProperties>>}
     */
    async getAddinMendeleyControls(notesStyle) {
        try {
            const arrControls = await this.#getAllContentControls();
            const filteredControls = [];
            const internalIds = [];
            for (let i = 0; i < arrControls.length; i++) {
                const control = arrControls[i];
                const bHasCitPrefix =
                    control.Tag.indexOf(this.#citPrefix) !== -1;
                const bHasBibPrefix =
                    control.Tag.indexOf(this.#bibPrefix) !== -1;
                if (bHasCitPrefix || bHasBibPrefix) {
                    filteredControls.push(control);
                    internalIds.push(control.InternalId);
                }
            }
            Asc.scope.internalIds = internalIds;
            Asc.scope.useParagraph = !!notesStyle;
            const placeholderTexts = await new Promise((resolve) =>
                Asc.plugin.callCommand(
                    () => {
                        /** @type {string[]} */
                        const placeholderTexts = [];
                        const doc = Api.GetDocument();
                        const controls = doc.GetAllContentControls();
                        controls.forEach((control) => {
                            const id = control.GetInternalId();
                            const index = Asc.scope.internalIds.indexOf(id);
                            if (index !== -1) {
                                let element;
                                if (Asc.scope.useParagraph) {
                                    element = control.GetParentParagraph();
                                } else {
                                    element = control.GetRange(
                                        0,
                                        Number.MAX_SAFE_INTEGER,
                                    );
                                }
                                let text = element.GetText();
                                text = text.trim();
                                placeholderTexts[index] = text;
                            }
                        });
                        return placeholderTexts;
                    },
                    false,
                    false,
                    resolve,
                ),
            );
            filteredControls.forEach((control, index) => {
                if (placeholderTexts[index]) {
                    control.PlaceHolderText = placeholderTexts[index];
                }
            });
            return filteredControls;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * For old version of Mendeley
     * @returns {Promise<Array<AddinFieldData>>}
     */
    async getAddinMendeleyFields() {
        try {
            let arrFields = await this.#getAllAddinFields();
            if (arrFields.length) {
                arrFields = arrFields.filter(
                    (control) =>
                        control.Value.indexOf("CSL_CITATION") === 0 ||
                        control.Value.indexOf("Mendeley Bibliography") === 0,
                );
            }
            return arrFields;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    /**
     * @param {Array<string>} controlInternalIds
     * @param {string} notesStyle
     * @returns {Promise<Array<any>>}
     */
    async getFootnotesControls(controlInternalIds, notesStyle) {
        return new Promise((resolve) => {
            Asc.scope.notesStyle = notesStyle;
            Asc.scope.controlInternalIds = controlInternalIds;
            window.Asc.plugin.callCommand(
                function () {
                    const controlsNotesText = new Array(Asc.scope.controlInternalIds.length);
                    let doc = Api.GetDocument();
                    let paragraphs = [];
                    if (Asc.scope.notesStyle === "footnotes") {
                        paragraphs = doc.GetFootnotesFirstParagraphs();
                    } else {
                        paragraphs = doc.GetEndNotesFirstParagraphs();
                    }

                    for (let i = 0; i < paragraphs.length; i++) {
                        const paragraph = paragraphs[i];
                        paragraph.Select();
                        const note = doc.GetCurrentFootEndnote();
                        if (!note) {
                            continue;
                        }
                        const reference = note.SelectNoteReference();
                        if (!reference) continue;
                        const control = doc.GetCurrentContentControl();
                        if (!control) continue;
                        const controlInternalId = control.GetInternalId();
                        const index = Asc.scope.controlInternalIds.indexOf(controlInternalId);
                        if (index !== -1) {
                            controlsNotesText[index] = note.GetText().trim();
                        }
                    }
                    return controlsNotesText;
                },
                false,
                false,
                resolve,
            );
        });
    }

    /** @returns {Promise<boolean>} */
    saveAsText() {
        return new Promise((resolve) => {
            Asc.scope.citPrefix = this.#citPrefix;
            Asc.scope.bibPrefix = this.#bibPrefix;
            window.Asc.plugin.callCommand(
                function () {
                    let doc = Api.GetDocument();
                    const controls = doc.GetAllContentControls();
                    if (!controls || controls.length === 0) return;
                    controls.forEach((control) => {
                        const tag = control.GetTag();
                        if (
                            tag.indexOf(Asc.scope.citPrefix) === 0 ||
                            tag.indexOf(Asc.scope.bibPrefix) === 0
                        ) {
                            control.Delete(true);
                        }
                    });
                },
                false,
                false,
                resolve,
            );
        });
    }

    /**
     * @param {Array<ContentControlProperties>} controls
     * @returns {Promise<Array<string>>}
     */
    async updateContentControls(controls) {
        let internalIds = controls.map(control => control.InternalId || "");
        const bibControls = controls.filter(control => control.Tag && control.Tag.indexOf(this.#bibPrefix) === 0);
        if (bibControls.length) {
            controls = controls.filter(control => control.Tag && control.Tag.indexOf(this.#bibPrefix) !== 0);
            const control = bibControls[0];
            const id = control.InternalId;
            if (id) {
                await new Promise(function (resolve) {
                    window.Asc.plugin.executeMethod("SelectContentControl", [id], resolve);
                });
            }
            const text = control.PlaceHolderText || '';
            await this.#pasteContentControlHtml(text);
        }

        for (let i = 0; i < controls.length; i++) {
            const id = controls[i].InternalId;
            if (!id) {
                console.error("Content control without ID found");
                continue;
            }
            await new Promise(function (resolve) {
                window.Asc.plugin.executeMethod("SelectContentControl", [id], resolve);
            });

            let tag = controls[i].Tag;
            await new Promise((resolve) => {
                Asc.scope.tag = tag;
                Asc.scope.id = controls[i].InternalId;
                Asc.scope.placeholderText = controls[i].PlaceHolderText;
                Asc.plugin.callCommand(
                    () => {
                        const doc = Api.GetDocument();
                        const control = doc.GetCurrentContentControl();
                        if (control) {
                            control.SetTag(Asc.scope.tag);
                            if (Asc.scope.placeholderText) {
                                control.SetPlaceholderText("");
                            }
                        } else {
                            console.error("Content control not found for ID:", Asc.scope.id);
                        }
                    },
                    false,
                    false,
                    resolve,
                );
            });
            if (!controls[i].PlaceHolderText) {
                continue;
            }
            await this.#pasteHtml(controls[i].PlaceHolderText);
        }
        return internalIds;
    }

    /**
     * When the user upgrades the plugin version, the citations are converted to the new format.
     * @param {{field: AddinFieldData, newValue: string}[]} fieldsWithCitations
     * @param {AddinFieldData} [bibField]
     * @returns {Promise<void>}
     */
    async upgradeCslItems(fieldsWithCitations, bibField) {
        for (let i = 0; i < fieldsWithCitations.length; i++) {
            const field = fieldsWithCitations[i].field;
            const newValue = fieldsWithCitations[i].newValue;

            await this.#selectField(field.FieldId);
            /** @type {ContentControlProperties} */
            const control = {
                Tag: newValue,
                Lock: 3, // can edit
                PlaceHolderText: "",
            };
            await this.#addContentControl(control);
            await this.#removeFieldWrapper(field.FieldId);
        }
        if (bibField) {
            await this.#selectField(bibField.FieldId);
            /** @type {ContentControlProperties} */
            const control = {
                Tag: this.#bibPrefix,
                Lock: 3, // can edit
                PlaceHolderText: "",
            };

            await this.#addContentControl(control, 1);
            await this.#removeFieldWrapper(bibField.FieldId);
        }
    }

    /**
     * @param {Array<ContentControlProperties>} controls
     * @returns {Promise<void>}
     */
    async convertNotesToText(controls) {
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            if (!control.InternalId) {
                console.error("Control id is not defined");
                continue;
            }

            const selectControlResult = await this.#selectControl(
                control.InternalId,
            );
            if (!selectControlResult) {
                console.error("Can not select content control with id: " + control.InternalId);
                continue;
            }
            await this.#removeSuperscript();
            await new Promise((resolve) => {
                Asc.scope.tag = control.Tag;
                Asc.plugin.callCommand(
                    () => {
                        const doc = Api.GetDocument();
                        const control = doc.GetCurrentContentControl();
                        if (control) {
                            control.SetTag(Asc.scope.tag);
                        } else {
                            console.error("Can not find content control");
                        }
                    },
                    false,
                    false,
                    resolve,
                );
            });

            await this.#removeSelectedContent();
            const text = control.PlaceHolderText;

            await this.#pasteHtml(text);
        }
    }

    /**
     * @param {Array<ContentControlProperties>} controls
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertTextToNotes(controls, notesStyle) {
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            if (!control.InternalId) continue;

            const selectControlResult = await this.#selectControl(
                control.InternalId,
            );
            if (!selectControlResult) continue;
            await new Promise((resolve) => {
                Asc.scope.tag = control.Tag;
                Asc.plugin.callCommand(
                    () => {
                        const doc = Api.GetDocument();
                        const control = doc.GetCurrentContentControl();
                        if (control) {
                            control.SetTag(Asc.scope.tag);
                        } else {
                            console.error("Can not find content control");
                        }
                    },
                    false,
                    false,
                    resolve,
                );
            });
            await this.#removeSelectedContent();
            await this.#addNote(notesStyle);
            const text = control.PlaceHolderText;

            await this.#pasteHtml(text);
        }
    }

    /**
     * @param {Array<ContentControlProperties>} controls
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertNotesStyle(controls, notesStyle) {
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            if (!control.InternalId) {
                console.error("Control id is not defined");
                continue;
            }

            const selectControlResult = await this.#selectControl(
                control.InternalId,
            );
            if (!selectControlResult) {
                console.error("Can not select content control with id: " + control.InternalId);
                continue;
            }
            await new Promise((resolve) => {
                Asc.scope.tag = control.Tag;
                Asc.plugin.callCommand(
                    () => {
                        const doc = Api.GetDocument();
                        const control = doc.GetCurrentContentControl();
                        if (control) {
                            control.SetTag(Asc.scope.tag);
                        } else {
                            console.error("Can not find content control");
                        }
                    },
                    false,
                    false,
                    resolve,
                );
            });
            if (control.PlaceHolderText) {
                await this.#removeSelectedContent();
                await this.#addNote(notesStyle);
                await this.#pasteHtml(control.PlaceHolderText);
            }
            
        }
    }

    /**
     * @param {string} internalId
     * @returns {Promise<void>}
    */
    async moveCursorOutsideControl(internalId) {
        await new Promise((resolve) => {
            Asc.scope.internalId = internalId;
            Asc.plugin.callCommand(
                () => {
                    const isAfter = true;
                    const doc = Api.GetDocument();
                    const control = doc.GetAllContentControls().find(
                        (c) => c.GetInternalId() === Asc.scope.internalId);

                    control && control.MoveCursorOutside(isAfter);
                },
                false,
                false,
                resolve,
            );
        });
    }

    /**
     * @param {ContentControlProperties} control
     * @param {1 | 2} [type] - 1 - block, 2 - inline
     * @returns {Promise<void>}
     */
    #addContentControl(control, type) {
        return new Promise(function (resolve) {
            if (typeof type !== "number") {
                type = 2;
            }
            window.Asc.plugin.executeMethod(
                "AddContentControl",
                [type, control],
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
            window.Asc.plugin.executeMethod(
                "GetAllAddinFields",
                undefined,
                resolve,
            );
        });
    }

    /**
     * @returns {Promise<Array<ContentControlProperties>>}
     */
    #getAllContentControls() {
        const self = this;
        return new Promise(function (resolve, reject) {
            window.Asc.plugin.executeMethod(
                "GetAllContentControls",
                undefined,
                resolve,
            );
        });
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

    /**
     * @param {string} fieldId
     * @returns {Promise<void>}
     */
    #removeFieldWrapper(fieldId) {
        return new Promise((resolve) => {
            window.Asc.plugin.executeMethod(
                "RemoveFieldWrapper",
                [fieldId],
                resolve,
            );
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
     * @param {string} internalId
     * @returns {Promise<boolean>}
     */
    #selectControl(internalId) {
        return new Promise((resolve) => {
            Asc.scope.id = internalId;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const controls = doc.GetAllContentControls();
                    const control = controls.find(
                        (c) => c.GetInternalId() === Asc.scope.id,
                    );
                    if (control) {
                        return control.Select();
                    }
                    return false;
                },
                false,
                false,
                resolve,
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
     * @param {string} html 
     * @returns {Promise<string>}
     */
    async #pasteContentControlHtml(html) {

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
            if (p.parentNode) {
                const newP = document.createElement('p');
                newP.innerHTML = p.innerHTML;
                p.parentNode.replaceChild(newP, p);
            }
        });
        
        html = doc.body.innerHTML;
        await this.#pasteHtml(html);

        return new Promise((resolve) => {
            const isCalc = true;
            const isClose = false;
            Asc.scope.numbers = numbers;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const control = doc.GetCurrentContentControl();
                    const range = control.GetRange(0, Number.MAX_SAFE_INTEGER);
                    if (!range) return;
                    /** @type {BibliographyStyles} */
                    const style = Asc.scope.bibStyle;
                    if (!style) {
                        return;
                    }

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
                            let elementIndex = 0;
                            paragraph.AddElement(margin, elementIndex);
                            paragraph.SetIndLeft(style.maxoffset * 120);
                            paragraph.SetIndFirstLine(-(style.maxoffset * 120));
                        } else if (style.hangingindent) {
                            paragraph.SetIndLeft(720);
                            paragraph.SetIndFirstLine(-720);
                        }
                    });
                    return control.GetInternalId();
                },
                isClose,
                isCalc,
                resolve,
            );
        }).then((internalId) => {
            Asc.scope.bibStyle = null;
            return internalId;
        });
        

    }
}

export { CitationDocService };
