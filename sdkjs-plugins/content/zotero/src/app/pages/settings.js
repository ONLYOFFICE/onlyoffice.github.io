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

/**
 * @typedef {import('../router').Router} Router
 */

import {
    Button,
    SelectBox,
    Radio,
    Checkbox,
    Message,
    Loader,
} from "../shared/components";
import { translate } from "../services";
import { CslStylesManager } from "../csl/styles";
import { CslHtmlParser } from "../services/csl-html-parser";
import { LocalesManager } from "../csl/locales";
import { AbbreviationsManager } from "../csl/abbreviations";
import { CitationItemData } from "../csl/citation/citation-item-data";

const PREVIEW_ITEMS = [
    {
        id: "preview-book",
        type: "book",
        title: "The Art of Scientific Writing",
        author: [{ family: "Miller", given: "Alex" }],
        issued: { "date-parts": [[2022]] },
        publisher: "North Star Press",
        "publisher-place": "New York",
        edition: "2",
        volume: "1",
        URL: "https://example.com/scientific-writing",
        accessed: { "date-parts": [[2024, 3, 15]] },
    },
    {
        id: "preview-article",
        type: "article-journal",
        title: "Designing Better Research Workflows",
        author: [{ family: "Giannis", given: "Dimitris" }],
        issued: { "date-parts": [[2021, 6, 10]] },
        "container-title": "Journal of Computational Biology",
        volume: "14",
        issue: "3",
        page: "45-58",
        DOI: "10.1234/jdr.2021.14.3.45",
        URL: "https://example.com/research-workflows",
        accessed: { "date-parts": [[2024, 3, 15]] },
    },
];

/**
 * @typedef {Object} Settings
 * @property {string} [language]
 * @property {string} style
 * @property {NoteStyle} notesStyle
 * @property {StyleFormat} styleFormat
 * @property {boolean} includeUrlForPaperArticles
 * @property {boolean} abbreviateJournalTitles
 */

/**
 * @param {Router} router
 * @param {string} displayNoneClass
 */
function SettingsPage(router, displayNoneClass) {
    this._router = router;
    this._displayNoneClass = displayNoneClass;

    this._saveBtn = new Button("saveSettingsBtn", {
        variant: "primary",
    });
    this._cancelBtn = new Button("cancelBtn", {
        variant: "secondary",
    });

    this._styleSelect = new SelectBox("styleSelectList", {
        placeholder: "Enter style name",
        sortable: true
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

    this._includeUrlWrapper = document.getElementById("includeUrlWrapper");
    if (!this._includeUrlWrapper) {
        throw new Error("includeUrlWrapper not found");
    }

    this._includeUrlCheckbox = new Checkbox("includeUrlForPaperArticles", {
        label: "Include URLs of paper articles",
    });

    this._abbreviateJournalTitlesWrapper = document.getElementById(
        "abbreviateJournalTitlesWrapper"
    );
    if (!this._abbreviateJournalTitlesWrapper) {
        throw new Error("abbreviateJournalTitlesWrapper not found");
    }

    this._abbreviateJournalTitlesCheckbox = new Checkbox(
        "abbreviateJournalTitles",
        {
            label: "Use MEDLINE journal abbreviations",
        }
    );

    this._cslFileInput = document.getElementById("cslFileInput");
    if (!this._cslFileInput) {
        throw new Error("cslFileInput not found");
    }

    this._languageSelect = new SelectBox("styleLangList", {
        placeholder: "Select language",
    });

    this._previewWrapper = document.getElementById("previewWrapper");
    if (!this._previewWrapper) {
        throw new Error("previewWrapper not found");
    }

    this._cslStylesManager = new CslStylesManager("zoteroStyleId");
    this._localesManager = new LocalesManager();
    this._abbreviationsManager = new AbbreviationsManager();

    /** @type {HTMLElement[]} */
    this._selectLists = [];
    /**
     * @param {Settings} newSettings
     * @param {Settings} oldSettings 
     * @returns {void}
     */
    this._onChangeState = function (newSettings, oldSettings) {};
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

    /** @type {string|null} */
    this._currentStyleContent = null;

    /** @type {Settings} */
    this._stateSettings = {
        style: "",
        notesStyle: "footnotes",
        styleFormat: "numeric",
        includeUrlForPaperArticles: false,
        abbreviateJournalTitles: false,
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
 * @returns {AbbreviationsManager}
 */
SettingsPage.prototype.getAbbreviationsManager = function () {
    return this._abbreviationsManager;
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

    const previewPromise = Promise.all([
        this._localesManager.loadLocale(savedLang),
        this._abbreviationsManager.load(),
    ]).then(function () {
        return self._onStyleChange(lastStyle);
    });

    return Promise.all([previewPromise, this._loadStyles()]);
};

/**
 * @param {function(Settings, Settings): void} callbackFn
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

    this._saveBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        const selectedLang = self._languageSelect.getSelectedValue();
        if (selectedLang === null) {
            console.error("No language selected");
            return;
        }

        /** @type {Settings} */
        const oldState = {...self._stateSettings};

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
            if (self._cslStylesManager.getLastUsedFormat() === "note") {
                promises.push(Promise.resolve());
            }
        }

        const selectedStyleId = self._styleSelect.getSelectedValue();
        if (
            self._stateSettings.style !== selectedStyleId &&
            selectedStyleId !== null
        ) {
            promises.push(self._onStyleChange(selectedStyleId));
        }

        const includeUrlChecked = self._includeUrlCheckbox.getState().checked;
        if (
            self._stateSettings.includeUrlForPaperArticles !==
            includeUrlChecked
        ) {
            self._cslStylesManager.saveIncludeUrlForPaperArticles(
                includeUrlChecked
            );
            promises.push(Promise.resolve());
        }

        const abbreviateJournalTitlesChecked =
            self._abbreviateJournalTitlesCheckbox.getState().checked;
        if (
            self._stateSettings.abbreviateJournalTitles !==
            abbreviateJournalTitlesChecked
        ) {
            self._cslStylesManager.saveAbbreviateJournalTitles(
                abbreviateJournalTitlesChecked
            );
            promises.push(Promise.resolve());
        }

        if (promises.length) {
            self._showLoader();
            Promise.all(promises)
                .then(function () {
                    self._hide();
                    self._hideLoader();

                    const newState = {
                        language: selectedLang,
                        style: selectedStyleId || "ieee",
                        notesStyle: noteValue,
                        styleFormat: self._cslStylesManager.getLastUsedFormat(),
                        includeUrlForPaperArticles: includeUrlChecked,
                        abbreviateJournalTitles: abbreviateJournalTitlesChecked,
                    };

                    self._onChangeState(newState, oldState);
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
    this._includeUrlCheckbox.subscribe(function (event) {
        self._somethingWasChanged();
        if (self._currentStyleContent) {
            self._showPreview(
                self._currentStyleContent,
                self._localesManager.getLastUsedLanguage()
            );
        }
    });
    this._abbreviateJournalTitlesCheckbox.subscribe(function (event) {
        self._somethingWasChanged();
        if (self._currentStyleContent) {
            self._showPreview(
                self._currentStyleContent,
                self._localesManager.getLastUsedLanguage()
            );
        }
    });
};

SettingsPage.prototype._hideAllMessages = function () {
    this._langMessage.close();
    this._styleMessage.close();
};

SettingsPage.prototype._hide = function () {
    this._router.openMain();
};

SettingsPage.prototype.show = function () {
    this._stateSettings = {
        language: this._localesManager.getLastUsedLanguage(),
        style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
        notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
        styleFormat: this._cslStylesManager.getLastUsedFormat(),
        includeUrlForPaperArticles:
            this._cslStylesManager.getIncludeUrlForPaperArticles(),
        abbreviateJournalTitles:
            this._cslStylesManager.getAbbreviateJournalTitles(),
    };
    this._saveBtn.disable();
    this._router.openSettings();
    if (this._stateSettings.notesStyle === this._endNotes.getState().value) {
        this._endNotes.check(true);
    } else {
        this._footNotes.check(true);
    }
    if (this._stateSettings.includeUrlForPaperArticles) {
        this._includeUrlCheckbox.check(true);
    } else {
        this._includeUrlCheckbox.uncheck(true);
    }
    if (this._stateSettings.abbreviateJournalTitles) {
        this._abbreviateJournalTitlesCheckbox.check(true);
    } else {
        this._abbreviateJournalTitlesCheckbox.uncheck(true);
    }
    if (this._currentStyleContent) {
        this._showPreview(
            this._currentStyleContent,
            this._stateSettings.language ||
                this._localesManager.getLastUsedLanguage()
        );
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
 * @param {string|null} styleContent
 * @param {string} language
 */
SettingsPage.prototype._showPreview = function (styleContent, language) {
    if (!styleContent) {
        this._previewWrapper.classList.add(this._displayNoneClass);
        this._previewWrapper.innerHTML = "";
        return;
    }

    try {
        const skipUrlForPaperArticles =
            !this._includeUrlCheckbox.getState().checked;

        const previewItems = Object.fromEntries(
            PREVIEW_ITEMS.map(function (item) {
                return [item.id, item];
            })
        );
        const localesManager = this._localesManager;
        /** @type {Object<string, any>} */
        const sys = {
            retrieveLocale: function (/** @type {string} */ id) {
                return (
                    localesManager.getLocale(id) ||
                    localesManager.getLocale(language) ||
                    localesManager.getLocale()
                );
            },
            retrieveItem: function (/** @type {string} */ id) {
                const raw = previewItems[id];
                if (!raw) return null;
                const itemData = new CitationItemData(id);
                itemData.fillFromObject(raw);
                return itemData.toJSON(skipUrlForPaperArticles);
            },
        };
        if (
            this._abbreviationsManager.isLoaded() &&
            this._abbreviateJournalTitlesCheckbox.getState().checked
        ) {
            sys.getAbbreviation = this._abbreviationsManager.createCiteprocHook();
        }
        // @ts-ignore citeproc does not expose an Engine constructor declaration.
        const formatter = new CSL.Engine(sys, styleContent, language, true);
        formatter.updateItems(PREVIEW_ITEMS.map((item) => item.id));
        const bibliography = formatter.makeBibliography();
        const bibMeta = bibliography && bibliography[0];
        const entries = bibliography && bibliography[1];

        if (!entries || !entries.length) {
            this._previewWrapper.classList.add(this._displayNoneClass);
            this._previewWrapper.innerHTML = "";
            return;
        }

        const title = document.createElement("div");
        title.className = "preview-title";
        title.textContent = translate("Bibliography preview");
        const content = document.createElement("div");
        content.className = "preview-content";
        content.innerHTML = CslHtmlParser.purifyHtml(entries.join(""));
        this._applyBibliographyStyles(content, bibMeta);
        this._previewWrapper.innerHTML = "";
        this._previewWrapper.appendChild(title);
        this._previewWrapper.appendChild(content);
        this._previewWrapper.classList.remove(this._displayNoneClass);
    } catch (error) {
        console.error("Failed to render bibliography preview:", error);
        this._previewWrapper.classList.add(this._displayNoneClass);
        this._previewWrapper.innerHTML = "";
    }
};

/**
 * citeproc only returns bibliography formatting (hanging indent,
 * left-margin/right-inline layout, entry/line spacing) as metadata in
 * `makeBibliography()[0]` — the returned HTML entries carry classes
 * (csl-entry, csl-left-margin, csl-right-inline) but no styling. Apply
 * that metadata as inline styles so the preview actually reflects it.
 * @param {HTMLElement} container
 * @param {{entryspacing?: number, linespacing?: number, hangingindent?: boolean, "second-field-align"?: boolean, maxoffset?: number}} [meta]
 */
SettingsPage.prototype._applyBibliographyStyles = function (container, meta) {
    if (!meta) return;

    const entries = container.querySelectorAll(".csl-entry");
    for (let i = 0; i < entries.length; i++) {
        const entry = /** @type {HTMLDivElement} */ (entries[i]);
        entry.style.clear = "both";
        if (meta.entryspacing) {
            entry.style.marginBottom = meta.entryspacing + "em";
        }
        if (meta.linespacing) {
            entry.style.lineHeight = String(meta.linespacing);
        }
        if (meta.hangingindent && !meta["second-field-align"]) {
            entry.style.marginLeft = "2em";
            entry.style.textIndent = "-2em";
        }
    }

    if (meta["second-field-align"]) {
        const marginWidthEm = (meta.maxoffset || 0) + 0.5;
        const elemsLeftMargin = container.querySelectorAll(".csl-left-margin");
        for (let i = 0; i < elemsLeftMargin.length; i++) {
            const el = /** @type {HTMLDivElement} */ (elemsLeftMargin[i]);
            el.style.float = "left";
            el.style.minWidth = marginWidthEm + "em";
        }
        
        const elemsRightInline = container.querySelectorAll(".csl-right-inline");
        for (let i = 0; i < elemsRightInline.length; i++) {
            const el = /** @type {HTMLDivElement} */ (elemsRightInline[i]);
            el.style.display = "block";
            el.style.marginLeft = marginWidthEm + "em";
        }
    }
};

/**
 * Empirically checks whether "Include URLs of paper articles" changes the
 * rendered bibliography for this style: renders the synthetic paginated
 * preview article through the real CSL engine with the setting on and off
 * and diffs the output. A static XML heuristic can't do this reliably,
 * since CSL condition trees can gate URL/accessed on anything (DOI, ISBN,
 * container-title, ...) - running the actual engine is the only way to get
 * an exact answer.
 * @param {string} styleContent
 * @param {string} language
 * @returns {boolean}
 */
SettingsPage.prototype._styleRespondsToIncludeUrlToggle = function (
    styleContent,
    language
) {
    const localesManager = this._localesManager;
    const previewItems = Object.fromEntries(
        PREVIEW_ITEMS.map(function (item) {
            return [item.id, item];
        })
    );

    /**
     * @param {boolean} skipUrlForPaperArticles
     * @returns {string}
     */
    function render(skipUrlForPaperArticles) {
        // @ts-ignore citeproc does not expose an Engine constructor declaration.
        const formatter = new CSL.Engine(
            {
                retrieveLocale: function (/** @type {string} */ id) {
                    return (
                        localesManager.getLocale(id) ||
                        localesManager.getLocale(language) ||
                        localesManager.getLocale()
                    );
                },
                retrieveItem: function (/** @type {string} */ id) {
                    const raw = previewItems[id];
                    if (!raw) return null;
                    const itemData = new CitationItemData(id);
                    itemData.fillFromObject(raw);
                    return itemData.toJSON(skipUrlForPaperArticles);
                },
            },
            styleContent,
            language,
            true
        );
        formatter.updateItems(PREVIEW_ITEMS.map((item) => item.id));
        const bibliography = formatter.makeBibliography();
        const entries = bibliography && bibliography[1];
        return entries ? entries.join("") : "";
    }

    try {
        const withUrl = render(false);
        const withoutUrl = render(true);
        return withoutUrl !== withUrl;
    } catch (error) {
        console.error("Failed to probe include-URL toggle:", error);
        return true;
    }
};

/**
 * Empirically checks whether "Use MEDLINE journal abbreviations" changes
 * the rendered bibliography for this style: renders the synthetic preview
 * article through the real CSL engine with and without the MEDLINE
 * abbreviation hook and diffs the output. Whether a style requests the
 * short form of `container-title` can depend on item type or other
 * conditions (e.g. Chicago only abbreviates periodicals in some contexts),
 * so a static XML check can't answer this reliably - same reasoning as
 * _styleRespondsToIncludeUrlToggle.
 * @param {string} styleContent
 * @param {string} language
 * @returns {boolean}
 */
SettingsPage.prototype._styleRespondsToAbbreviateJournalTitles = function (
    styleContent,
    language
) {
    if (!this._abbreviationsManager.isLoaded()) {
        // Fail open: don't hide a potentially-relevant option just because
        // the MEDLINE table hasn't finished loading yet.
        return true;
    }

    const abbreviationsManager = this._abbreviationsManager;
    const localesManager = this._localesManager;
    const skipUrlForPaperArticles = !this._includeUrlCheckbox.getState().checked;
    const previewItems = Object.fromEntries(
        PREVIEW_ITEMS.map(function (item) {
            return [item.id, item];
        })
    );

    /**
     * @param {boolean} withAbbreviations
     * @returns {string}
     */
    function render(withAbbreviations) {
        /** @type {Object<string, any>} */
        const sys = {
            retrieveLocale: function (/** @type {string} */ id) {
                return (
                    localesManager.getLocale(id) ||
                    localesManager.getLocale(language) ||
                    localesManager.getLocale()
                );
            },
            retrieveItem: function (/** @type {string} */ id) {
                const raw = previewItems[id];
                if (!raw) return null;
                const itemData = new CitationItemData(id);
                itemData.fillFromObject(raw);
                return itemData.toJSON(skipUrlForPaperArticles);
            },
        };
        if (withAbbreviations) {
            sys.getAbbreviation = abbreviationsManager.createCiteprocHook();
        }
        // @ts-ignore citeproc does not expose an Engine constructor declaration.
        const formatter = new CSL.Engine(sys, styleContent, language, true);
        formatter.updateItems(PREVIEW_ITEMS.map((item) => item.id));
        const bibliography = formatter.makeBibliography();
        const entries = bibliography && bibliography[1];
        return entries ? entries.join("") : "";
    }

    try {
        const withoutAbbreviations = render(false);
        const withAbbreviations = render(true);
        return withoutAbbreviations !== withAbbreviations;
    } catch (error) {
        console.error(
            "Failed to probe abbreviate-journal-titles toggle:",
            error
        );
        return true;
    }
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

            self._currentStyleContent = styleInfo.content;

            self._showPreview(
                styleInfo.content,
                self._localesManager.getLastUsedLanguage()
            );

            const canUseIncludeUrl = Boolean(
                styleInfo.content &&
                    self._styleRespondsToIncludeUrlToggle(
                        styleInfo.content,
                        self._localesManager.getLastUsedLanguage()
                    )
            );
            if (canUseIncludeUrl) {
                self._includeUrlWrapper.classList.remove(
                    self._displayNoneClass
                );
            } else {
                self._includeUrlWrapper.classList.add(
                    self._displayNoneClass
                );
            }

            const canAbbreviateJournalTitles = Boolean(
                styleInfo.content &&
                    self._styleRespondsToAbbreviateJournalTitles(
                        styleInfo.content,
                        self._localesManager.getLastUsedLanguage()
                    )
            );
            if (canAbbreviateJournalTitles) {
                self._abbreviateJournalTitlesWrapper.classList.remove(
                    self._displayNoneClass
                );
            } else {
                self._abbreviateJournalTitlesWrapper.classList.add(
                    self._displayNoneClass
                );
            }

            isClick && self._hideLoader();
        })
        .catch(function (err) {
            console.error(err);
            if (typeof err === "string") {
                self._styleMessage.show(translate(err));
            }
            isClick && self._hideLoader();
            throw err;
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
