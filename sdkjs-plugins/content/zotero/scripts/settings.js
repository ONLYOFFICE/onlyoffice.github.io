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

    this._styleWrapper = document.getElementById("styleWrapper");
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
    }
    this._styleSelect = document.getElementById("styleSelect");
    if (!this._styleSelect) {
        throw new Error("styleSelect not found");
    }
    this._notesStyleWrapper = document.getElementById("notesStyle");
    if (!this._notesStyleWrapper) {
        throw new Error("notesStyleWrapper not found");
    }
    this._footNotes = document.getElementById("footNotes");
    if (!this._footNotes) {
        throw new Error("footNotes not found");
    }
    this._endNotes = document.getElementById("endNotes");
    if (!this._endNotes) {
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
     * @param {Promise<void>} promise
     */
    this._onChangeState = function (promise) {};
    this._apiKeyMessage = new Message("apiKeyMessage", { type: "error" });
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
 * @param {function(Promise<void>): void} callbackFn
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
        if (self._localesManager.getLastUsedLanguage() !== selectedLang) {
            self._localesManager.saveLastUsedLanguage(selectedLang);
            promises.push(self._localesManager.loadLocale(selectedLang));
        }

        if (promises.length) {
            self._onChangeState(
                Promise.all(promises).then(function () {
                    self._hide();
                })
            );
        }
    });
    this._cancelBtn.subscribe(function (event) {
        if (event.type !== "button:click") {
            return;
        }
        self._hide();
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
                showError(translate("Failed to upload file"));
            })
            .finally(function () {
                showLoader(false);
            });
    };

    /**
     * @param {Event|null} e - The input event.
     * @param {String} [filter] - The filter to apply on the style options.
     */
    this._styleSelect.oninput = function (e, filter) {
        var input = self._styleSelect;
        if (!(input instanceof HTMLInputElement)) return;
        filter = filter !== undefined ? filter : input.value.toLowerCase();
        var list = self._styleSelectList.classList.contains(
            self._displayNoneClass
        )
            ? self._styleSelectListOther
            : self._styleSelectList;

        for (var i = 0; i < list.children.length; i++) {
            const child = list.children[i];
            if (child instanceof HTMLElement === false) {
                continue;
            }
            var text = child.textContent || child.innerText;
            if (!filter || text.toLowerCase().indexOf(filter) > -1) {
                child.classList.remove(self._displayNoneClass);
            } else {
                child.classList.add(self._displayNoneClass);
            }
        }
    };

    /**
     * @param {Event} inp - The input event.
     * @param {String} styleName - The name of the selected style.
     * @param {Boolean} isClick - Whether the style was selected manually or not.
     */
    this._styleSelect.onselectchange = function (inp, styleName, isClick) {
        isClick && self._showLoader(true);
        self._styleSelect.oninput(inp, "");

        return self._cslStylesManager
            .getStyle(styleName)
            .then(function (style) {
                self._onStyleChange();
                if (isClick) {
                    return self._citationService.updateCslItems(
                        true,
                        true,
                        false
                    );
                }
            })
            .catch(function (err) {
                console.error(err);
                if (typeof err === "string") {
                    self._showError(err);
                }
            })
            .finally(function () {
                isClick && self._showLoader(false);
            });
    };

    this._styleSelectList.onopen = function () {
        self._styleSelectList.style.width =
            self._styleWrapper.clientWidth - 2 + "px";
    };

    [this._footNotes, this._endNotes].forEach(function (el) {
        el.addEventListener("change", function (event) {
            if (
                event.target instanceof HTMLInputElement &&
                event.target.checked
            ) {
                const value = event.target.value;
                if (value === "endnotes" || value === "footnotes") {
                    self._cslStylesManager.saveLastUsedNotesStyle(value);
                } else {
                    console.error("Unknown notes style: " + value);
                }
            }
        });
    });
};

SettingsPage.prototype._hideAllMessages = function () {
    this._apiKeyMessage.close();
};

SettingsPage.prototype._hide = function () {
    this._router.openMain();
};

SettingsPage.prototype._show = function () {
    this._router.openSettings();
};

/** @returns {Promise<void>} */
SettingsPage.prototype._loadStyles = function () {
    const self = this;
    return this._cslStylesManager
        .getStylesInfo()
        .then(
            /** @param {Array<StyleInfo>} stylesInfo*/ function (stylesInfo) {
                var openOtherStyleList = function (
                    /** @type {HTMLElement} */ list
                ) {
                    return function (/** @type {MouseEvent} */ ev) {
                        self._styleSelectListOther.style.width =
                            self._styleWrapper.clientWidth - 2 + "px";
                        ev.stopPropagation();
                        self._openList(list);
                    };
                };

                self._addStylesToList(stylesInfo);

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
    const styleSelect = this._styleSelect;
    if (styleSelect instanceof HTMLInputElement === false) {
        console.error("styleSelect is not an input element");
        return;
    }

    /**
     * @param {HTMLElement} list - the list of styles where the element is added.
     * @param {HTMLElement} other - the list of styles where the element is removed.
     */
    var onStyleSelectOther = function (list, other) {
        return function (/** @type {MouseEvent} */ ev) {
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
            newEl.onclick = self._onClickListElement(
                self._styleSelectList,
                styleSelect
            );
            var event = new Event("click");
            newEl.dispatchEvent(event);
            self._closeList();
        };
    };

    for (var i = 0; i < stylesInfo.length; i++) {
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
            el.onclick = self._onClickListElement(
                self._styleSelectList,
                styleSelect
            );
        } else {
            self._styleSelectListOther.appendChild(el);
            el.onclick = onStyleSelectOther(
                self._styleSelectList,
                self._styleSelectListOther
            );
        }
        if (stylesInfo[i].name == lastStyle) {
            el.setAttribute("selected", "");
            self._selectInput(styleSelect, el, self._styleSelectList, false);
        }
    }
};

SettingsPage.prototype._onStyleChange = function () {
    let styleFormat = this._cslStylesManager.getLastUsedFormat();
    this._citationService.setStyleFormat(styleFormat);
    this._bNumFormat = styleFormat == "numeric";
    if ("note" === styleFormat) {
        this._notesStyleWrapper.classList.remove(this._displayNoneClass);
    } else {
        this._notesStyleWrapper.classList.add(this._displayNoneClass);
    }

    let notesStyle = this._cslStylesManager.getLastUsedNotesStyle();
    this._citationService.setNotesStyle(notesStyle);
    const notesAs = this._notesStyleWrapper.querySelector(
        'input[name="notesAs"][value="' + notesStyle + '"]'
    );
    if (notesAs && notesAs instanceof HTMLInputElement) {
        notesAs.checked = true;
    }
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
            this._styleSelect.oninput(null, "");
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
                    child.onclick = self._onClickListElement(list, input);
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

                    if (list.onopen) {
                        list.onopen();
                    }
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
 * @param {HTMLInputElement} input
 */
SettingsPage.prototype._onClickListElement = function (list, input) {
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

                self._selectInput(input, child, list, true);
            } else {
                if (list.children[i].hasAttribute("selected")) {
                    list.children[i].attributes.removeNamedItem("selected");
                }
            }
        }
    };
};

/**
 * @param {HTMLInputElement} input
 * @param {HTMLElement} el
 * @param {HTMLElement} list
 * @param {boolean} isClick
 */
SettingsPage.prototype._selectInput = function (input, el, list, isClick) {
    input.value = el.textContent;
    var val = el.getAttribute("data-value") || "";
    input.setAttribute("data-value", val);
    input.setAttribute("title", el.textContent);
    if (input.onselectchange) {
        input.onselectchange(input, val, isClick);
    }
    list.classList.add(this._displayNoneClass);
};
