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
     * @returns {Promise<void>}
     */
    async addBibliography(text) {
        /** @type {ContentControlProperties} */
        const control = {
            Tag: this.#bibPrefix,
            Lock: 3, // can edit
            PlaceHolderText: "",
        };

        await this.#addContentControl(control);
        await new Promise(function (resolve) {
            window.Asc.plugin.executeMethod(
                "PasteHtml",
                [text],
                resolve,
            );
        });
    }

    /**
     * @param {string} text
     * @param {string} value
     * @param {NoteStyle | null} notesStyle
     * @returns {Promise<void>}
     */
    async addCitation(text, value, notesStyle) {
        /** @type {ContentControlProperties} */
        const control = {
            Tag: this.#citPrefix + "_v3_" + this.#base64Encode(value),
            Lock: 3, // can edit
            PlaceHolderText: "",
        };
        if (
            notesStyle &&
            ["footnotes", "endnotes"].indexOf(notesStyle) !== -1
        ) {
            await this.#addNote(notesStyle);
        }

        await this.#addContentControl(control);
        await new Promise(function (resolve) {
            window.Asc.plugin.executeMethod(
                "PasteHtml",
                [text],
                resolve,
            );
        });
    }

    /**
     * @param {"footnotes" | "endnotes"} [notesStyle]
     * @returns {Promise<Array<ContentControlProperties>>}
     */
    async getAddinMendeleyControls(notesStyle) {
        const self = this;

        try {
            const arrControls = await self.#getAllContentControls();
            const filteredFields = [];
            const internalIds = [];
            for (let i = 0; i < arrControls.length; i++) {
                const field = arrControls[i];
                const bHasCitPrefix = field.Tag.indexOf(self.#citPrefix) !== -1;
                const bHasBibPrefix = field.Tag.indexOf(self.#bibPrefix) !== -1;
                if (bHasCitPrefix || bHasBibPrefix) {
                    filteredFields.push(field);
                    internalIds.push(field.InternalId);
                }
            }
            Asc.scope.internalIds = internalIds;
            Asc.scope.useParagraph = !!notesStyle;
            const placeholderTexts = await new Promise((resolve) => Asc.plugin.callCommand(
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
                                element = control.GetRange(0, Number.MAX_SAFE_INTEGER);
                            }
                            let text = element.GetText();
                            if (text.lastIndexOf("\n") === text.length - 1) {
                                text = text.slice(0, -1);
                            }
                            if (text.lastIndexOf("\r") === text.length - 1) {
                                text = text.slice(0, -1);
                            }
                            text = text.trim();
                            placeholderTexts[index] = text;
                        }
                    });
                    return placeholderTexts;
                },
                false,
                false,
                resolve,
            ));
            filteredFields.forEach((field, index) => {
                if (placeholderTexts[index]) {
                    field.PlaceHolderText = placeholderTexts[index];
                }
            });
            return filteredFields;
        } catch (e) {
            console.error(e);
            return [];
        }

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
                        if (tag.indexOf(Asc.scope.citPrefix) === 0 || tag.indexOf(Asc.scope.bibPrefix) === 0) {
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
     * @returns {Promise<void>}
     */
    async updateContentControls(controls) {
        for (let i = 0; i < controls.length; i++) {
            const id = controls[i].InternalId;
            if (!id) {
                continue;
            }
            await window.Asc.plugin.executeMethod("SelectContentControl", [id]);

            let tag = controls[i].Tag;
            if (tag.indexOf(this.#bibPrefix) !== 0) {
                tag = this.#citPrefix + "_v3_" + this.#base64Encode(controls[i].Tag);
            }
            await new Promise((resolve) => {
                Asc.scope.tag = tag;
                Asc.scope.id = controls[i].InternalId;
                Asc.scope.placeholderText = controls[i].PlaceHolderText;
                Asc.plugin.callCommand(
                    () => {
                        const doc = Api.GetDocument();
                        const controls = doc.GetAllContentControls();
                        const control = controls.find((c) => c.GetInternalId() === Asc.scope.id);
                        if (control) {
                            control.SetTag(Asc.scope.tag);
                            if (Asc.scope.placeholderText) {
                                control.SetPlaceholderText("");
                            }
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
            await new Promise(function (resolve) {
                window.Asc.plugin.executeMethod(
                    "PasteHtml",
                    [controls[i].PlaceHolderText],
                    resolve,
                );
            });
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
                console.error("Field id is not defined");
                continue;
            }

            const selectFieldResult = await this.#selectControl(control.InternalId);
            if (!selectFieldResult) continue;
            const isReferenceSelected = await this.#selectFieldReference();
            if (!isReferenceSelected) continue;
            await this.#removeSuperscript();
            await this.#removeSelectedContent();
            const text = control.PlaceHolderText;
            control.PlaceHolderText = "";
            if (control.Tag.indexOf(this.#bibPrefix) !== 0) {
                control.Tag = this.#citPrefix + "_v3_" + this.#base64Encode(control.Tag);
            }
            await this.#addContentControl(control);
            
            await new Promise(function (resolve) {
                window.Asc.plugin.executeMethod(
                    "PasteHtml",
                    [text],
                    resolve,
                );
            });
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

            const selectFieldResult = await this.#selectControl(control.InternalId);
            if (!selectFieldResult) continue;
            await this.#deleteControl(control.InternalId);
            await this.#addNote(notesStyle);
            const text = control.PlaceHolderText;
            control.PlaceHolderText = "";
            if (control.Tag.indexOf(this.#bibPrefix) !== 0) {
                control.Tag = this.#citPrefix + "_v3_" + this.#base64Encode(control.Tag);
            }
            await this.#addContentControl(control);
            
            await new Promise(function (resolve) {
                window.Asc.plugin.executeMethod(
                    "PasteHtml",
                    [text],
                    resolve,
                );
            });
        }
    }

    /**
     * @param {Array<ContentControlProperties>} controls
     * @param {"footnotes" | "endnotes"} notesStyle
     * @returns {Promise<void>}
     */
    async convertNotesStyle(controls, notesStyle) {
        /** @type {Array<ContentControlProperties>} */
        const editedControls = [];

        for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            if (!control.InternalId) continue;

            if (!control.PlaceHolderText) {
                // save user changes
                editedControls.push(control);
                continue;
            }

            const selectFieldResult = await this.#selectControl(control.InternalId);
            if (!selectFieldResult) continue;
            const isReferenceSelected = await this.#selectFieldReference();
            if (!isReferenceSelected) continue;
            await this.#removeSelectedContent();
            await this.#addNote(notesStyle);
            const text = control.PlaceHolderText;
            control.PlaceHolderText = "";
            if (control.Tag.indexOf(this.#bibPrefix) !== 0) {
                control.Tag = this.#citPrefix + "_v3_" + this.#base64Encode(control.Tag);
            }
            await this.#addContentControl(control);
            
            await new Promise(function (resolve) {
                window.Asc.plugin.executeMethod(
                    "PasteHtml",
                    [text],
                    resolve,
                );
            });
        }
    }

    /**
     * @param {ContentControlProperties} field
     * @returns {Promise<void>}
     */
    #addContentControl(field) {
        return new Promise(function (resolve) {
            const type = 2; //2 - inline content control
            window.Asc.plugin.executeMethod(
                "AddContentControl",
                [type, field],
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
     * @param {string} internalId
     * @returns {Promise<boolean>}
     */
    #deleteControl(internalId) {
        return new Promise((resolve) => {
            Asc.scope.id = internalId;
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const controls = doc.GetAllContentControls();
                    const control = controls.find((c) => c.GetInternalId() === Asc.scope.id);
                    if (control) {
                        return control.Delete(false);
                    }
                    return false
                },
                false,
                false,
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
                    const control = controls.find((c) => c.GetInternalId() === Asc.scope.id);
                    if (control) {
                        return control.Select();
                    }
                    return false
                },
                false,
                false,
                resolve,
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

    /** @param {string} str */
    #base64Encode(str) {
        if (typeof TextEncoder !== "undefined") {
            var bytes = new TextEncoder().encode(str);
            var binary = "";
            for (var i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        }

        return btoa(
            encodeURIComponent(str).replace(
                /%([0-9A-F]{2})/g,
                function (match, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                },
            ),
        );
    }
}

export { CitationDocService };
