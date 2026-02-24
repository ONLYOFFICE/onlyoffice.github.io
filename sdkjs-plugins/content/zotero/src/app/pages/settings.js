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

/**
 * @typedef {import('../router').Router} Router
 */

import {
    Button,
    SelectBox,
    Radio,
    Message,
    Loader,
} from "../shared/components";
import { translate } from "../services";
import { CslStylesManager } from "../csl/styles";
import { LocalesManager } from "../csl/locales";

/**
 * @typedef {Object} Settings
 * @property {string} [language]
 * @property {string} style
 * @property {NoteStyle} notesStyle
 * @property {StyleFormat} styleFormat
 */

/**
 * @param {Router} router
 * @param {string} displayNoneClass
 */
function SettingsPage(router, displayNoneClass) {
    this._router = router;
    this._displayNoneClass = displayNoneClass;

    this._openSettingsBtn = new Button("settingsBtn", {
        variant: "icon-only",
        size: "small",
    });
    this._saveBtn = new Button("saveSettingsBtn", {
        variant: "primary",
    });
    this._cancelBtn = new Button("cancelBtn", {
        variant: "secondary",
    });

    this._styleSelect = new SelectBox("styleSelectList", {
        placeholder: "Enter style name",
    });
    this._styleSelectListOther = new SelectBox("styleSelectedListOther", {
        placeholder: "Enter style name",
        searchable: true,
    });

    this._notesStyleWrapper = document.getElementById("notesStyle");
    if (!this._notesStyleWrapper) {
        throw new Error("notesStyleWrapper not found");
    }

    this._footNotes = new Radio("footNotes", {
        label: "Footnotes",
    });
    this._endNotes = new Radio("endNotes", {
        label: "Endnotes",
    });

    this._cslFileInput = document.getElementById("cslFileInput");
    if (!this._cslFileInput) {
        throw new Error("cslFileInput not found");
    }

    this._languageSelect = new SelectBox("styleLangList", {
        placeholder: "Select language",
    });

    this._cslStylesManager = new CslStylesManager();
    this._localesManager = new LocalesManager();

    /** @type {HTMLElement[]} */
    this._selectLists = [];
    /**
     * @param {Settings} settings
     */
    this._onChangeState = function (settings) {};
    this._styleMessage = new Message("styleMessage", { type: "error" });
    this._langMessage = new Message("langMessage", { type: "error" });
    /** @type {Array<[string, string]>} */
    this._LANGUAGES = [
        ["af-ZA", "Afrikaans"],
        ["ar", "Arabic"],
        ["bg-BG", "Bulgarian"],
        ["ca-AD", "Catalan"],
        ["cs-CZ", "Czech"],
        ["cy-GB", "Welsh"],
        ["da-DK", "Danish"],
        ["de-AT", "German (Austria)"],
        ["de-CH", "German (Switzerland)"],
        ["de-DE", "German (Germany)"],
        ["el-GR", "Greek"],
        ["en-GB", "English (UK)"],
        ["en-US", "English (US)"],
        ["es-CL", "Spanish (Chile)"],
        ["es-ES", "Spanish (Spain)"],
        ["es-MX", "Spanish (Mexico)"],
        ["et-EE", "Estonian"],
        ["eu", "Basque"],
        ["fa-IR", "Persian"],
        ["fi-FI", "Finnish"],
        ["fr-CA", "French (Canada)"],
        ["fr-FR", "French (France)"],
        ["he-IL", "Hebrew"],
        ["hr-HR", "Croatian"],
        ["hu-HU", "Hungarian"],
        ["id-ID", "Indonesian"],
        ["is-IS", "Icelandic"],
        ["it-IT", "Italian"],
        ["ja-JP", "Japanese"],
        ["km-KH", "Khmer"],
        ["ko-KR", "Korean"],
        ["la", "Latin"],
        ["lt-LT", "Lithuanian"],
        ["lv-LV", "Latvian"],
        ["mn-MN", "Mongolian"],
        ["nb-NO", "Norwegian (Bokmål)"],
        ["nl-NL", "Dutch"],
        ["nn-NO", "Norwegian (Nynorsk)"],
        ["pl-PL", "Polish"],
        ["pt-BR", "Portuguese (Brazil)"],
        ["pt-PT", "Portuguese (Portugal)"],
        ["ro-RO", "Romanian"],
        ["ru-RU", "Russian"],
        ["sk-SK", "Slovak"],
        ["sl-SI", "Slovenian"],
        ["sr-RS", "Serbian"],
        ["sv-SE", "Swedish"],
        ["th-TH", "Thai"],
        ["tr-TR", "Turkish"],
        ["uk-UA", "Ukrainian"],
        ["vi-VN", "Vietnamese"],
        ["zh-CN", "Chinese (PRC)"],
        ["zh-TW", "Chinese (Taiwan)"],
    ];

    this._bNumFormat = false;

    /** @type {Settings} */
    this._stateSettings = {
        style: "",
        notesStyle: "footnotes",
        styleFormat: "numeric",
    };
}

/**
 * @returns {LocalesManager}
 */
SettingsPage.prototype.getLocalesManager = function () {
    return this._localesManager;
};

/**
 * @returns {CslStylesManager}
 */
SettingsPage.prototype.getStyleManager = function () {
    return this._cslStylesManager;
};

/**
 * @returns {string|null}
 */
SettingsPage.prototype.getLocale = function () {
    return this._localesManager.getLocale();
};

/**
 * @returns {string|null}
 */
SettingsPage.prototype.getLastUsedStyleId = function () {
    return this._cslStylesManager.getLastUsedStyleId();
};

/**
 * @returns
 */
SettingsPage.prototype.init = function () {
    const self = this;
    var lastStyle = this._cslStylesManager.getLastUsedStyleId() || "ieee";
    const savedLang = this._localesManager.getLastUsedLanguage();
    this._addEventListeners();
    this._languageSelect.addItems(this._LANGUAGES, savedLang);

    const promises = [
        this._onStyleChange(lastStyle),
        this._localesManager.loadLocale(savedLang),
        this._loadStyles(),
    ];

    return Promise.all(promises);
};

/**
 * @param {function(Settings): void} callbackFn
 */
SettingsPage.prototype.onChangeState = function (callbackFn) {
    this._onChangeState = callbackFn;
};

/**
 * @param {boolean} isAvailable
 */
SettingsPage.prototype.setDesktopApiAvailable = function (isAvailable) {
    this._localesManager.setDesktopApiAvailable(isAvailable);
    this._cslStylesManager.setDesktopApiAvailable(isAvailable);
};

/**
 * @param {boolean} isAvailable
 */
SettingsPage.prototype.setRestApiAvailable = function (isAvailable) {
    this._localesManager.setRestApiAvailable(isAvailable);
    this._cslStylesManager.setRestApiAvailable(isAvailable);
};

SettingsPage.prototype._addEventListeners = function () {
    const self = this;

    this._openSettingsBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        self._show();
    });
    this._saveBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        const selectedLang = self._languageSelect.getSelectedValue();
        if (selectedLang === null) {
            console.error("No language selected");
            return;
        }
        const promises = [];
        if (self._stateSettings.language !== selectedLang) {
            self._localesManager.saveLastUsedLanguage(selectedLang);
            promises.push(
                self._localesManager
                    .loadLocale(selectedLang)
                    .catch(function (err) {
                        console.error(err);
                        self._langMessage.show(
                            translate("Failed to load language")
                        );
                        throw err;
                    })
            );
        }

        /** @type {NoteStyle} */
        let noteValue = "footnotes";
        if (self._endNotes.getState().checked) {
            noteValue = "endnotes";
        }
        if (self._stateSettings.notesStyle !== noteValue) {
            self._cslStylesManager.saveLastUsedNotesStyle(noteValue);
        }

        const selectedStyleId = self._styleSelect.getSelectedValue();
        if (
            self._stateSettings.style !== selectedStyleId &&
            selectedStyleId !== null
        ) {
            promises.push(self._onStyleChange(selectedStyleId));
        }

        if (promises.length) {
            self._showLoader();
            Promise.all(promises)
                .then(function () {
                    self._hide();
                    self._hideLoader();

                    self._onChangeState({
                        language: selectedLang,
                        style: selectedStyleId || "ieee",
                        notesStyle: noteValue,
                        styleFormat: self._cslStylesManager.getLastUsedFormat(),
                    });
                })
                .catch(function (err) {
                    self._hideLoader();
                });
        } else {
            self._hide();
        }
    });
    this._cancelBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }

        const selectedLang = self._languageSelect.getSelectedValue();
        const selectedStyleId = self._styleSelect.getSelectedValue();

        if (
            selectedLang !== null &&
            self._localesManager.getLastUsedLanguage() !== selectedLang
        ) {
            self._languageSelect.selectItems(
                self._localesManager.getLastUsedLanguage(),
                true
            );
        }
        if (
            self._stateSettings.style !== selectedStyleId &&
            selectedStyleId !== null
        ) {
            self._styleSelect.selectItems(self._stateSettings.style, true);
            self._styleSelectListOther.selectItems(
                self._stateSettings.style,
                true
            );
            self._onStyleChange(self._stateSettings.style, true).then(
                function () {
                    self._hide();
                }
            );
        } else {
            self._hide();
        }
    });

    this._cslFileInput.onchange = function (e) {
        if (!(e.target instanceof HTMLInputElement)) return;
        /** @type {HTMLInputElement} */
        const target = e.target;
        if (!target.files) return;
        var file = target.files[0];
        if (!file) {
            console.error("No file selected");
            return;
        }
        //showLoader(true);

        self._cslStylesManager
            .addCustomStyle(file)
            .then(function (styleValue) {
                self._addStylesToList([styleValue]);
            })
            .catch(function (error) {
                console.error(error);
                self._styleMessage.show(translate("Invalid CSL style file"));
            })
            .finally(function () {
                self._hideLoader();
            });
    };

    this._styleSelect.subscribe(function (event) {
        if (event.type === "selectbox:change") {
            self._styleSelectListOther.selectItems(
                event.detail.current.toString(),
                true
            );
            self._somethingWasChanged();
            self._onStyleChange(event.detail.current.toString(), true);
            return;
        } else if (event.type !== "selectbox:custom") {
            return;
        }
        const actionId = event.detail.current;
        if (actionId === "more_styles") {
            self._styleSelectListOther.openDropdown();
        }
    });
    self._styleSelectListOther.subscribe(function (event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        if (!event.detail.items) return;
        const item = event.detail.items[0];
        self._styleSelect.addItem(item.value, item.text, true);
        self._somethingWasChanged();
        self._onStyleChange(item.value, true);
    });
    this._languageSelect.subscribe(function (event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        self._somethingWasChanged();
    });
    this._footNotes.subscribe(function (event) {
        self._somethingWasChanged();
    });
    this._endNotes.subscribe(function (event) {
        self._somethingWasChanged();
    });
};

SettingsPage.prototype._hideAllMessages = function () {
    this._langMessage.close();
    this._styleMessage.close();
};

SettingsPage.prototype._hide = function () {
    this._router.openMain();
};

SettingsPage.prototype._show = function () {
    this._stateSettings = {
        language: this._localesManager.getLastUsedLanguage(),
        style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
        notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
        styleFormat: this._cslStylesManager.getLastUsedFormat(),
    };
    this._saveBtn.disable();
    this._router.openSettings();
    if (this._stateSettings.notesStyle === this._endNotes.getState().value) {
        this._endNotes.check();
    } else {
        this._footNotes.check();
    }
};

/** @returns {Promise<void>} */
SettingsPage.prototype._loadStyles = function () {
    const self = this;
    return this._cslStylesManager
        .getStylesInfo()
        .then(
            /** @param {Array<StyleInfo>} stylesInfo*/ function (stylesInfo) {
                self._addStylesToList(stylesInfo);
                self._styleSelect.addCustomItem(
                    "more_styles",
                    "More Styles..."
                );
                self._styleSelect.addCustomItem(
                    "cslFileInput",
                    "Add custom style..."
                );
            }
        )
        .catch(function (err) {
            console.error(err);
        });
};

/**
 * @param {Array<StyleInfo>} stylesInfo
 */
SettingsPage.prototype._addStylesToList = function (stylesInfo) {
    const self = this;
    var lastStyle = this._cslStylesManager.getLastUsedStyleIdOrDefault();

    /** @type {[string, string][]} */
    const allStyles = stylesInfo.map(function (style) {
        return [style.name, style.title];
    });
    const mainStyles = allStyles.filter(function (style) {
        if (style[0] == lastStyle) return true;
        if (self._cslStylesManager.isStyleDefault(style[0])) return true;
        return false;
    });

    this._styleSelect.addItems(mainStyles, lastStyle);
    this._styleSelectListOther.addItems(allStyles, lastStyle);
};

SettingsPage.prototype._somethingWasChanged = function () {
    this._saveBtn.enable();
};

/**
 * @param {String} styleName - The name of the selected style.
 * @param {Boolean} [isClick] - Whether the style was selected manually or not.
 * @returns {Promise<void>}
 */
SettingsPage.prototype._onStyleChange = function (styleName, isClick) {
    const self = this;
    isClick && self._showLoader();

    return self._cslStylesManager
        .getStyle(styleName, !isClick)
        .then(function (styleInfo) {
            let styleFormat = styleInfo.styleFormat;
            self._bNumFormat = styleFormat == "numeric";
            if ("note" === styleFormat) {
                self._notesStyleWrapper.classList.remove(
                    self._displayNoneClass
                );
            } else {
                self._notesStyleWrapper.classList.add(self._displayNoneClass);
            }

            isClick && self._hideLoader();
        })
        .catch(function (err) {
            console.error(err);
            if (typeof err === "string") {
                self._styleMessage.show(translate(err));
            }
            isClick && self._hideLoader();
        });
};

SettingsPage.prototype._showLoader = function () {
    this._cancelBtn.disable();
    this._saveBtn.disable();
    this._styleSelect.disable();
    this._languageSelect.disable();
    //Loader.show();
};
SettingsPage.prototype._hideLoader = function () {
    this._cancelBtn.enable();
    this._saveBtn.enable();
    this._styleSelect.enable();
    this._languageSelect.enable();
    //Loader.hide();
};

export { SettingsPage };
