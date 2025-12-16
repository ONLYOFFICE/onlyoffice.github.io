// @ts-check

/// <reference path="./router.js" />
/// <reference path="./shared/ui/button.js" />
/// <reference path="./shared/ui/selectbox.js" />
/// <reference path="./shared/ui/message.js" />
/// <reference path="./shared/ui/types.js" />
/// <reference path="./services/translate-service.js" />
/// <reference path="./csl/styles/styles-manager.js" />
/// <reference path="./csl/locales/locales-manager.js" />

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

    /*this._styleWrapper = document.getElementById("styleWrapper");
    if (!this._styleWrapper) {
        throw new Error("styleWrapper not found");
    }
    this._styleSelectList = document.getElementById("styleSelectList");
    if (!this._styleSelectList) {
        throw new Error("styleSelectList not found");
    }
    this._styleSelectListOther = document.getElementById(
        "styleSelectedListOther"
    );
    if (!this._styleSelectListOther) {
        throw new Error("styleSelectListOther not found");
    }*/
    this._styleSelect = new SelectBox("styleSelectList", {
        placeholder: "Enter style name",
    });
    this._styleSelectListOther = new SelectBox("styleSelectedListOther", {
        placeholder: "Enter style name",
        searchable: true,
    });
    /*this._styleSelect = document.getElementById("styleSelect");
    if (
        !this._styleSelect ||
        this._styleSelect instanceof HTMLInputElement === false
    ) {
        throw new Error("styleSelect not found");
    }*/
    this._notesStyleWrapper = document.getElementById("notesStyle");
    if (!this._notesStyleWrapper) {
        throw new Error("notesStyleWrapper not found");
    }
    this._footNotes = document.getElementById("footNotes");
    if (
        !this._footNotes ||
        this._footNotes instanceof HTMLInputElement === false
    ) {
        throw new Error("footNotes not found");
    }
    this._endNotes = document.getElementById("endNotes");
    if (
        !this._endNotes ||
        this._endNotes instanceof HTMLInputElement === false
    ) {
        throw new Error("endNotes not found");
    }

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

    this._initSelectBoxes();

    /** @type {Settings} */
    this._stateSettings = {
        style: "",
        notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
        styleFormat: this._cslStylesManager.getLastUsedFormat(),
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
        this._cslStylesManager.getStyle(lastStyle),
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

        [self._footNotes, self._endNotes].forEach(function (el) {
            if (el.checked) {
                const value = el.value;
                if (
                    (self._stateSettings.notesStyle !== value &&
                        value === "footnotes") ||
                    value === "endnotes"
                ) {
                    self._cslStylesManager.saveLastUsedNotesStyle(value);
                }
            }
        });

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
                        style: self._cslStylesManager.getLastUsedStyleIdOrDefault(),
                        notesStyle:
                            self._cslStylesManager.getLastUsedNotesStyle(),
                        styleFormat: self._cslStylesManager.getLastUsedFormat(),
                    });
                })
                .catch(function (err) {
                    self._hideLoader();
                });
        }
    });
    this._cancelBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        [self._footNotes, self._endNotes].forEach(function (el) {
            const value = el.value;
            if (self._stateSettings.notesStyle === value) {
                el.checked = true;
            }
        });
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
            const el = self._styleSelectList.querySelector(
                "[data-value='" + self._stateSettings.style + "']"
            );
            if (el && el instanceof HTMLElement) {
                self._selectStyle(el, false);
                self._onStyleChange(self._stateSettings.style, true).then(
                    function () {
                        self._hide();
                    }
                );
            }
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
            return;
        } else if (event.type !== "selectbox:custom") {
            return;
        }
        console.warn(event);
        const actionId = event.detail.current;
        if (actionId === "more_styles") {
            console.warn("More styles");

            self._styleSelectListOther.openDropdown();
        }
    });
    self._styleSelectListOther.subscribe(function (event) {
        if (event.type !== "selectbox:change") {
            return;
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

SettingsPage.prototype._show = function () {
    this._stateSettings = {
        language: this._localesManager.getLastUsedLanguage(),
        style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
        notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
        styleFormat: this._cslStylesManager.getLastUsedFormat(),
    };
    this._router.openSettings();
};

/** @returns {Promise<void>} */
SettingsPage.prototype._loadStyles = function () {
    const self = this;
    return this._cslStylesManager
        .getStylesInfo()
        .then(
            /** @param {Array<StyleInfo>} stylesInfo*/ function (stylesInfo) {
                /*var openOtherStyleList = function (
                    list
                ) {
                    return function (ev) {
                        self._styleSelectListOther.style.width =
                            self._styleWrapper.clientWidth - 2 + "px";
                        ev.stopPropagation();
                        self._openList(list);
                    };
                };*/

                self._addStylesToList(stylesInfo);
                self._styleSelect.addCustomItem(
                    "more_styles",
                    "More Styles..."
                );
                self._styleSelect.addCustomItem(
                    "cslFileInput",
                    "Add custom style..."
                );
                /*
                const el = document.createElement("hr");
                self._styleSelectList.appendChild(el);

                if (self._styleSelectListOther.children.length > 0) {
                    var other = document.createElement("span");
                    other.textContent = "More Styles...";
                    self._styleSelectList.appendChild(other);
                    other.onclick = openOtherStyleList(
                        self._styleSelectListOther
                    );
                }

                var custom = document.createElement("span");
                custom.setAttribute("class", "select-file");
                var label = document.createElement("label");
                label.setAttribute("for", "cslFileInput");
                label.textContent = "Add custom style...";
                custom.appendChild(label);
                self._styleSelectList.appendChild(custom);
                */
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

    /**
     * @param {HTMLElement} list - the list of styles where the element is added.
     * @param {HTMLElement} other - the list of styles where the element is removed.
     */
    /*var onStyleSelectOther = function (list, other) {
        return function ( ev) {
            let tmpEl = list.removeChild(
                list.children[list.children.length - 3]
            );
            var newEl = document.createElement("span");
            newEl.setAttribute(
                "data-value",
                String(tmpEl.getAttribute("data-value"))
            );
            newEl.textContent = tmpEl.textContent;
            other.appendChild(newEl);
            newEl.onclick = onStyleSelectOther(
                self._styleSelectList,
                self._styleSelectListOther
            );

            if (ev.target instanceof HTMLElement === false) {
                console.error("ev.target is not an HTMLElement");
                return;
            }
            tmpEl = other.removeChild(ev.target);
            newEl = document.createElement("span");
            newEl.setAttribute(
                "data-value",
                String(tmpEl.getAttribute("data-value"))
            );
            newEl.textContent = tmpEl.textContent;
            list.insertBefore(newEl, list.firstElementChild);
            newEl.onclick = self._onClickListElement(self._styleSelectList);
            var event = new Event("click");
            newEl.dispatchEvent(event);
            self._closeList();
        };
    };
*/
    /** @type {[string, string][]} */
    const allStyles = stylesInfo.map(function (style) {
        return [style.name, style.title];
    });
    const mainStyles = allStyles.filter(function (style) {
        if (style[0] == lastStyle) return true;
        if (self._cslStylesManager.isStyleDefault(style[0])) return true;
        return false;
    });
    const otherStyles = allStyles.filter(function (style) {
        if (style[0] == lastStyle) return false;
        if (self._cslStylesManager.isStyleDefault(style[0])) return false;
        return true;
    });

    this._styleSelect.addItems(mainStyles, lastStyle);
    this._styleSelectListOther.addItems(mainStyles, lastStyle);
    this._styleSelectListOther.addItems(otherStyles);

    /*for (var i = 0; i < stylesInfo.length; i++) {
        var el = document.createElement("span");
        el.setAttribute("data-value", stylesInfo[i].name);
        el.textContent = stylesInfo[i].title;
        if (
            self._cslStylesManager.isStyleDefault(stylesInfo[i].name) ||
            stylesInfo[i].name == lastStyle
        ) {
            if (stylesInfo.length == 1)
                self._styleSelectList.insertBefore(
                    el,
                    self._styleSelectList.firstElementChild
                );
            else self._styleSelectList.appendChild(el);
            el.onclick = self._onClickListElement(self._styleSelectList);
        } else {
            self._styleSelectListOther.appendChild(el);
            el.onclick = onStyleSelectOther(
                self._styleSelectList,
                self._styleSelectListOther
            );
        }
        if (stylesInfo[i].name == lastStyle) {
            el.setAttribute("selected", "");
            self._selectStyle(el, false);
        }
    }*/
};

/**
 * @param {HTMLElement} el
 */
SettingsPage.prototype._openList = function (el) {
    const self = this;
    el.classList.remove(this._displayNoneClass);
    const f = function () {
        self._closeList();
        window.removeEventListener("click", f);
    };
    window.addEventListener("click", f);
};

SettingsPage.prototype._closeList = function () {
    for (var i = 0; i < this._selectLists.length; i++) {
        if (this._selectLists[i] === this._styleSelectList)
            this._onStyleFilterInput("");
        this._selectLists[i].classList.add(this._displayNoneClass);
    }
};

SettingsPage.prototype._initSelectBoxes = function () {
    const self = this;
    var select = document.getElementsByClassName("control select");
    for (var i = 0; i < select.length; i++) {
        var input = select[i];
        var holder = input.parentElement;
        if (!(input instanceof HTMLInputElement) || !holder) {
            console.error("initSelectBoxes: no input or holder");
            continue;
        }

        var arrow = document.createElement("span");
        arrow.classList.add("selectArrow");
        arrow.appendChild(document.createElement("span"));
        arrow.appendChild(document.createElement("span"));
        holder.appendChild(arrow);

        const holderElement = holder.getElementsByClassName("selectList");

        for (var k = 0; k < holderElement.length; k++) {
            var temp = holderElement[k];
            var list;
            if (temp instanceof HTMLElement) {
                list = temp;
            } else {
                console.error(
                    "initSelectBoxes: holderElement is not HTMLElement"
                );
                continue;
            }

            if (list.children.length > 0) {
                for (var j = 0; j < list.children.length; j++) {
                    const child = list.children[j];
                    if (child instanceof HTMLElement === false) {
                        continue;
                    }
                    child.onclick = self._onClickListElement(list);
                }
                // selectInput(input, list.children[0], list, false);
            }

            /**
             * @param {HTMLElement} list
             * @param {HTMLElement} input
             * @returns {function}
             */
            var fOpen = function (list, input) {
                return function (/** @type {MouseEvent} */ ev) {
                    ev.stopPropagation();
                    if (
                        !self._styleSelectListOther.classList.contains(
                            self._displayNoneClass
                        )
                    )
                        return true;

                    self._styleSelectList.style.width =
                        self._styleWrapper.clientWidth - 2 + "px";
                    if (!input.hasAttribute("readonly")) {
                        input.select();
                    }
                    self._openList(list);

                    return true;
                };
            };

            if (k !== 1) {
                input.onclick = fOpen(list, input);
                arrow.onclick = fOpen(list, input);
            }
            self._selectLists.push(list);
        }
    }
};

/**
 * @param {HTMLElement} list
 */
SettingsPage.prototype._onClickListElement = function (list) {
    const self = this;
    return function (/** @type {MouseEvent} */ ev) {
        if (!ev.target || !(ev.target instanceof HTMLElement)) {
            console.error("onClickListElement: no target");
            return;
        }
        var sel = ev.target.getAttribute("data-value");
        for (var i = 0; i < list.children.length; i++) {
            const temp = list.children[i];
            if (temp instanceof HTMLElement === false) continue;
            /** @type {HTMLElement} */
            const child = temp;
            if (list.children[i].getAttribute("data-value") == sel) {
                list.children[i].setAttribute("selected", "");

                self._selectStyle(child, true);
            } else {
                if (list.children[i].hasAttribute("selected")) {
                    list.children[i].attributes.removeNamedItem("selected");
                }
            }
        }
    };
};

/**
 * @param {HTMLElement} el
 * @param {boolean} isClick
 */
SettingsPage.prototype._selectStyle = function (el, isClick) {
    this._styleSelect.value = el.textContent;
    var val = el.getAttribute("data-value") || "";
    this._styleSelect.setAttribute("data-value", val);
    this._styleSelect.setAttribute("title", el.textContent);

    this._onStyleFilterInput("");
    this._onStyleChange(val, isClick);

    this._styleSelectList.classList.add(this._displayNoneClass);
};

/**
 * @param {String} [filter] - The filter to apply on the style options.
 */
SettingsPage.prototype._onStyleFilterInput = function (filter) {
    var input = this._styleSelect;
    if (!(input instanceof HTMLInputElement)) return;
    filter = filter !== undefined ? filter : input.value.toLowerCase();
    var list = this._styleSelectList.classList.contains(this._displayNoneClass)
        ? this._styleSelectListOther
        : this._styleSelectList;

    for (var i = 0; i < list.children.length; i++) {
        const child = list.children[i];
        if (child instanceof HTMLElement === false) {
            continue;
        }
        var text = child.textContent || child.innerText;
        if (!filter || text.toLowerCase().indexOf(filter) > -1) {
            child.classList.remove(this._displayNoneClass);
        } else {
            child.classList.add(this._displayNoneClass);
        }
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
        .getStyle(styleName)
        .then(function (style) {
            let styleFormat = self._cslStylesManager.getLastUsedFormat();
            self._bNumFormat = styleFormat == "numeric";
            if ("note" === styleFormat) {
                self._notesStyleWrapper.classList.remove(
                    self._displayNoneClass
                );
            } else {
                self._notesStyleWrapper.classList.add(self._displayNoneClass);
            }

            let notesStyle = self._cslStylesManager.getLastUsedNotesStyle();
            const notesAs = self._notesStyleWrapper.querySelector(
                'input[name="notesAs"][value="' + notesStyle + '"]'
            );
            if (notesAs && notesAs instanceof HTMLInputElement) {
                notesAs.checked = true;
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
};
SettingsPage.prototype._hideLoader = function () {
    this._cancelBtn.enable();
    this._saveBtn.enable();
};
