/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// @ts-check

/// <reference path="./router.js" />
/// <reference path="./types-global.js" />
/// <reference path="./zotero/zotero.js" />
/// <reference path="./csl/citation/citation.js" />
/// <reference path="./csl/citation/storage.js" />
/// <reference path="./csl/styles/styles-manager.js" />
/// <reference path="./csl/locales/locales-manager.js" />
/// <reference path="./services/translate-service.js" />
/// <reference path="./services/citation-service.js" />
/// <reference path="./shared/components/search-filter.js" />
/// <reference path="./shared/components/select-citation.js" />
/// <reference path="./shared/ui/input.js" />
/// <reference path="./shared/ui/selectbox.js" />
/// <reference path="./shared/ui/button.js" />
/// <reference path="./connection.js" />

(function () {
    var counter = 0; // счетчик отправленных запросов (используется чтобы знать показывать "not found" или нет)
    var displayNoneClass = "hidden";
    var blurClass = "blur";

    //var loadingStyle = false;
    //var loadingLocale = false;
    var bNumFormat = false;

    // TODO добавить ещё обработку событий (удаление линков) их не нужно удалять
    //     из библиографии автоматически (это делать только при обновлении библиографии
    //     или refresh), но их точно нужно удалить из formatter!
    // TODO добавить ещё обработку события (изменения линков), предлать пользователю
    //     обновить их или сохранить ручное форматирование (при ручном форматировании
    //     не меняем внешний вид цитаты при refresh (да и вообще не меняем))
    // TODO сейчас всегда делаем полный refresh при каждом действии
    //     (обновлении, вставке линков, вставке библиографии), потому что мы не знаем
    //     что поменялось без событий (потом добавить ещё сравнение контента)
    // TODO ms меняет линки (если стиль с нумерацией bNumFormat) делает их по порядку
    //     как документе (для этого нужно знать где именно в документе мы вставляем цитату,
    //     какая цитата сверху и снизу от текущего курсора)

    /** @type {Router} */
    var router;
    /** @type {ZoteroSdk} */
    var sdk;
    /** @type {ConnectingToApi} */
    var connectingToApi;
    /** @type {CslStylesManager} */
    var cslStylesManager;
    /** @type {LocalesManager} */
    var localesManager;
    /** @type {CitationService} */
    var citationService;

    /** @type {{text: string, obj: SearchResult | null, groups: Array<SearchResult>, groupsHash: string}}} */
    var lastSearch = {
        text: "",
        obj: null,
        groups: [],
        groupsHash: "",
    };

    /** @type {SearchFilterComponents} */
    var searchFilter;
    /** @type {SelectCitationsComponent} */
    var selectCitation;
    /** @type {Button} */
    var saveAsTextBtn;
    /** @type {Button} */
    var insertLinkBtn;
    /** @type {Button} */
    var settingsBtn;
    /** @type {Button} */
    var insertBibBtn;
    /** @type {Button} */
    var refreshBtn;
    /** @type {Object.<string, HTMLElement | HTMLInputElement>} */
    var elements = {};
    function initElements() {
        const loader = document.getElementById("loader");
        if (!loader) {
            throw new Error("loader not found");
        }
        const libLoader = document.getElementById("libLoader");
        if (!libLoader) {
            throw new Error("libLoader not found");
        }
        const error = document.getElementById("errorWrapper");
        if (!error) {
            throw new Error("errorWrapper not found");
        }
        const contentHolder = document.getElementById("content");
        if (!contentHolder) {
            throw new Error("contentHolder not found");
        }

        const configState = document.getElementById("configState");
        if (!configState) {
            throw new Error("configState not found");
        }
        const mainState = document.getElementById("mainState");
        if (!mainState) {
            throw new Error("mainState not found");
        }

        const styleWrapper = document.getElementById("styleWrapper");
        if (!styleWrapper) {
            throw new Error("styleWrapper not found");
        }
        const styleSelectList = document.getElementById("styleSelectList");
        if (!styleSelectList) {
            throw new Error("styleSelectList not found");
        }
        const styleSelectListOther = document.getElementById(
            "styleSelectedListOther"
        );
        if (!styleSelectListOther) {
            throw new Error("styleSelectListOther not found");
        }
        const styleSelect = document.getElementById("styleSelect");
        if (!styleSelect) {
            throw new Error("styleSelect not found");
        }
        const styleLang = document.getElementById("styleLang");
        if (!styleLang) {
            throw new Error("styleLang not found");
        }
        const styleLangList = document.getElementById("styleLangList");
        if (!styleLangList) {
            throw new Error("styleLangList not found");
        }
        const notesStyleWrapper = document.getElementById("notesStyle");
        if (!notesStyleWrapper) {
            throw new Error("notesStyleWrapper not found");
        }
        const footNotes = document.getElementById("footNotes");
        if (!footNotes) {
            throw new Error("footNotes not found");
        }
        const endNotes = document.getElementById("endNotes");
        if (!endNotes) {
            throw new Error("endNotes not found");
        }
        const checkOmitAuthor = document.getElementById("omitAuthor");
        if (!checkOmitAuthor) {
            throw new Error("checkOmitAuthor not found");
        }

        const cslFileInput = document.getElementById("cslFileInput");
        if (!cslFileInput) {
            throw new Error("cslFileInput not found");
        }
        searchFilter = new SearchFilterComponents();
        selectCitation = new SelectCitationsComponent(
            displayNoneClass,
            loadMore,
            shouldLoadMore
        );
        saveAsTextBtn = new Button("saveAsTextBtn", {
            variant: "secondary",
        });
        insertLinkBtn = new Button("insertLinkBtn", {
            disabled: true,
        });
        settingsBtn = new Button("settingsBtn", {
            variant: "icon-only",
            size: "small",
        });
        insertBibBtn = new Button("insertBibBtn", {
            variant: "secondary",
        });
        refreshBtn = new Button("refreshBtn", {
            variant: "secondary",
        });
        elements = {
            loader: loader,
            libLoader: libLoader,
            error: error,

            contentHolder: contentHolder,
            configState: configState,

            mainState: mainState,

            styleWrapper: styleWrapper,
            styleSelectList: styleSelectList,
            styleSelectListOther: styleSelectListOther,
            styleSelect: styleSelect,
            styleLang: styleLang,
            styleLangList: styleLangList,
            notesStyleWrapper: notesStyleWrapper,
            footNotes: footNotes,
            endNotes: endNotes,

            checkOmitAuthor: checkOmitAuthor,
            cslFileInput: cslFileInput,
        };
    }

    window.Asc.plugin.init = function () {
        initElements();
        showLoader(true);

        router = new Router();
        sdk = new ZoteroSdk();
        connectingToApi = new ConnectingToApi(router, sdk);
        cslStylesManager = new CslStylesManager();
        localesManager = new LocalesManager();
        citationService = new CitationService(
            localesManager,
            cslStylesManager,
            sdk
        );

        addEventListeners();
        initSelectBoxes();

        const connector = connectingToApi.init();
        connector.onOpen(function () {
            showLoader(false);
        });
        connector.onChangeState(function (apis) {
            cslStylesManager.setDesktopApiAvailable(apis.desktop);
            cslStylesManager.setRestApiAvailable(apis.online);
            localesManager.setDesktopApiAvailable(apis.desktop);
            localesManager.setRestApiAvailable(apis.online);
        });
        connector.onAuthorized(function (apis) {
            showLoader(true);

            Promise.all([
                loadGroups(),
                loadStyles(),
                preloadLastStyle(),
                initLanguageSelect(),
            ]).then(function () {
                showLoader(false);
            });

            addStylesEventListeners();
        });

        window.Asc.plugin.onTranslate = applyTranslations;
    };

    function preloadLastStyle() {
        var lastStyle = cslStylesManager.getLastUsedStyleId() || "ieee";
        return cslStylesManager.getStyle(lastStyle);
    }

    /**
     * @returns {Promise<string|null>}
     */
    function initLanguageSelect() {
        const savedLang = localesManager.getLastUsedLanguage();
        const option = elements.styleLangList.querySelector(
            '[data-value="' + savedLang + '"]'
        );
        if (!option || !(elements.styleLang instanceof HTMLInputElement)) {
            console.error("initLanguageSelect: no option");
            return Promise.resolve(null);
        }
        option.setAttribute("selected", "");
        elements.styleLang.value = option.textContent;
        elements.styleLang.setAttribute("data-value", savedLang);
        return localesManager.loadLocale(savedLang);
    }

    /** @returns {Promise<void>} */
    function loadStyles() {
        return cslStylesManager
            .getStylesInfo()
            .then(
                /** @param {Array<StyleInfo>} stylesInfo*/ function (
                    stylesInfo
                ) {
                    var openOtherStyleList = function (
                        /** @type {HTMLElement} */ list
                    ) {
                        return function (/** @type {MouseEvent} */ ev) {
                            elements.styleSelectListOther.style.width =
                                elements.styleWrapper.clientWidth - 2 + "px";
                            ev.stopPropagation();
                            openList(list);
                        };
                    };

                    addStylesToList(stylesInfo);

                    const el = document.createElement("hr");
                    elements.styleSelectList.appendChild(el);

                    if (elements.styleSelectListOther.children.length > 0) {
                        var other = document.createElement("span");
                        other.textContent = "More Styles...";
                        elements.styleSelectList.appendChild(other);
                        other.onclick = openOtherStyleList(
                            elements.styleSelectListOther
                        );
                    }

                    var custom = document.createElement("span");
                    custom.setAttribute("class", "select-file");
                    var label = document.createElement("label");
                    label.setAttribute("for", "cslFileInput");
                    label.textContent = "Add custom style...";
                    custom.appendChild(label);
                    elements.styleSelectList.appendChild(custom);
                }
            )
            .catch(function (err) {
                console.error(err);
            });
    }

    /** @returns {Promise<void>} */
    function loadGroups() {
        return sdk
            .getUserGroups()
            .then(function (/** @type {Array<UserGroupInfo>} */ groups) {
                searchFilter.addGroups(groups);
            });
    }

    /**
     * @param {Array<StyleInfo>} stylesInfo
     */
    function addStylesToList(stylesInfo) {
        var lastStyle = cslStylesManager.getLastUsedStyleIdOrDefault();
        const styleSelect = elements.styleSelect;
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
                    elements.styleSelectList,
                    elements.styleSelectListOther
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
                newEl.onclick = onClickListElement(
                    elements.styleSelectList,
                    styleSelect
                );
                var event = new Event("click");
                newEl.dispatchEvent(event);
                closeList();
            };
        };

        for (var i = 0; i < stylesInfo.length; i++) {
            var el = document.createElement("span");
            el.setAttribute("data-value", stylesInfo[i].name);
            el.textContent = stylesInfo[i].title;
            if (
                cslStylesManager.isStyleDefault(stylesInfo[i].name) ||
                stylesInfo[i].name == lastStyle
            ) {
                if (stylesInfo.length == 1)
                    elements.styleSelectList.insertBefore(
                        el,
                        elements.styleSelectList.firstElementChild
                    );
                else elements.styleSelectList.appendChild(el);
                el.onclick = onClickListElement(
                    elements.styleSelectList,
                    styleSelect
                );
            } else {
                elements.styleSelectListOther.appendChild(el);
                el.onclick = onStyleSelectOther(
                    elements.styleSelectList,
                    elements.styleSelectListOther
                );
            }
            if (stylesInfo[i].name == lastStyle) {
                el.setAttribute("selected", "");
                selectInput(styleSelect, el, elements.styleSelectList, false);
            }
        }
    }

    function addEventListeners() {
        selectCitation.subscribe(checkSelected);

        elements.cslFileInput.onchange = function (e) {
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

            cslStylesManager
                .addCustomStyle(file)
                .then(function (styleValue) {
                    addStylesToList([styleValue]);
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
         * @param {string} text
         * @param {Array<string|"my_library"|"group_libraries">} selectedGroups
         * @returns
         */
        function searchFor(text, selectedGroups) {
            text = text.trim();
            const groupsHash = selectedGroups.join(",");
            if (
                elements.mainState.classList.contains(displayNoneClass) ||
                !text ||
                (text == lastSearch.text &&
                    groupsHash === lastSearch.groupsHash) ||
                selectedGroups.length === 0
            )
                return Promise.resolve();

            selectCitation.clearLibrary();

            /** @type {Array<Promise<boolean>>} */
            const promises = [];

            return sdk
                .getUserGroups()
                .then(function (
                    /** @type {Array<UserGroupInfo>} */ userGroups
                ) {
                    /** @type {Array<string|number>} */
                    let groups = selectedGroups.filter(function (group) {
                        return (
                            group !== "my_library" &&
                            group !== "group_libraries"
                        );
                    });

                    const append = true;
                    let showLoader = true;
                    let hideLoader = !groups.length;
                    const bCount = true;

                    if (selectedGroups.indexOf("my_library") !== -1) {
                        promises.push(
                            loadLibrary(
                                sdk.getItems(text),
                                append,
                                showLoader,
                                hideLoader,
                                false,
                                bCount
                            )
                        );
                    }

                    for (var i = 0; i < groups.length; i++) {
                        showLoader = i === 0 && promises.length === 0;
                        hideLoader = i === groups.length - 1;
                        promises.push(
                            loadLibrary(
                                sdk.getGroupItems(text, groups[i]),
                                append,
                                showLoader,
                                hideLoader,
                                true,
                                bCount
                            )
                        );
                    }
                })
                .then(function () {
                    lastSearch.text = text;
                    lastSearch.obj = null;
                    lastSearch.groups = [];
                    lastSearch.groupsHash = groupsHash;
                    return Promise.all(promises);
                });
        }
        searchFilter.subscribe(function (text, selectedGroups) {
            searchFor(text, selectedGroups);
        });

        refreshBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            if (!cslStylesManager.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!localesManager.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader(true);
            citationService
                .updateCslItems(true, true, false)
                .catch(function (error) {
                    console.error(error);
                    let message = translate("Failed to refresh");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                })
                .finally(function () {
                    showLoader(false);
                });
        });

        insertBibBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            if (!cslStylesManager.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!localesManager.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader(true);
            // TODO #there
            // updateCslItems(true, false, true);
            citationService
                .updateCslItems(true, true, true)
                .catch(function (error) {
                    console.error(error);
                    let message = translate("Failed to insert bibliography");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                })
                .finally(function () {
                    showLoader(false);
                });
        });

        insertLinkBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            if (!cslStylesManager.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!localesManager.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader(true);
            citationService
                .updateCslItems(true, false, false)
                .then(function () {
                    const prefix = getPrefix();
                    const suffix = getSuffix();
                    const locatorInfo = getLocator();
                    let checked = false;
                    if (elements.checkOmitAuthor instanceof HTMLInputElement) {
                        checked = elements.checkOmitAuthor.checked;
                    }

                    return citationService.insertSelectedCitations(
                        selectCitation.getItems(),
                        prefix,
                        suffix,
                        locatorInfo,
                        checked
                    );
                })
                .then(function (keys) {
                    selectCitation.removeItems(keys);
                })
                .catch(function (error) {
                    console.error(error);
                    let message = translate("Failed to insert citation");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                })
                .finally(function () {
                    showLoader(false);
                });
        });

        saveAsTextBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            showLoader(true);
            citationService.saveAsText().then(function () {
                showLoader(false);
            });
        });
    }

    function addStylesEventListeners() {
        /**
         * @param {Event|null} e - The input event.
         * @param {String} [filter] - The filter to apply on the style options.
         */
        elements.styleSelect.oninput = function (e, filter) {
            var input = elements.styleSelect;
            if (!(input instanceof HTMLInputElement)) return;
            filter = filter !== undefined ? filter : input.value.toLowerCase();
            var list = elements.styleSelectList.classList.contains(
                displayNoneClass
            )
                ? elements.styleSelectListOther
                : elements.styleSelectList;

            for (var i = 0; i < list.children.length; i++) {
                const child = list.children[i];
                if (child instanceof HTMLElement === false) {
                    continue;
                }
                var text = child.textContent || child.innerText;
                var hide = true;
                if (!filter || text.toLowerCase().indexOf(filter) > -1) {
                    hide = false;
                }

                switchClass(child, displayNoneClass, hide);
            }
        };

        /**
         * @param {Event} inp - The input event.
         * @param {String} styleName - The name of the selected style.
         * @param {Boolean} isClick - Whether the style was selected manually or not.
         */
        elements.styleSelect.onselectchange = function (
            inp,
            styleName,
            isClick
        ) {
            isClick && showLoader(true);
            elements.styleSelect.oninput(inp, "");

            return cslStylesManager
                .getStyle(styleName)
                .then(function (style) {
                    onStyleChange();
                    if (isClick) {
                        return citationService.updateCslItems(
                            true,
                            true,
                            false
                        );
                    }
                })
                .catch(function (err) {
                    console.error(err);
                    if (typeof err === "string") {
                        showError(err);
                    }
                })
                .finally(function () {
                    isClick && showLoader(false);
                });
        };

        /**
         * @param {Event} inp - The select change event.
         * @param {String} val - The value of the selected language.
         * @param {Boolean} isClick - Whether the language was selected manually or not.
         */
        elements.styleLang.onselectchange = function (inp, val, isClick) {
            showLoader(true);
            localesManager.saveLastUsedLanguage(val);
            localesManager
                .loadLocale(val)
                .then(function () {
                    if (isClick)
                        return citationService.updateCslItems(
                            true,
                            true,
                            false
                        );
                })
                .catch(function (error) {
                    console.error(error);
                    if (typeof error === "string") {
                        showError(error);
                    }
                })
                .finally(function () {
                    showLoader(false);
                });
        };

        elements.styleSelectList.onopen = function () {
            elements.styleSelectList.style.width =
                elements.styleWrapper.clientWidth - 2 + "px";
        };

        [elements.footNotes, elements.endNotes].forEach(function (el) {
            el.addEventListener("change", function (event) {
                if (
                    event.target instanceof HTMLInputElement &&
                    event.target.checked
                ) {
                    const value = event.target.value;
                    if (value === "endnotes" || value === "footnotes") {
                        cslStylesManager.saveLastUsedNotesStyle(value);
                    } else {
                        console.error("Unknown notes style: " + value);
                    }
                }
            });
        });
    }

    /**
     * @param {Theme} theme - The new theme of the SDK.
     */
    Asc.plugin.onThemeChanged = function (theme) {
        // console.warn("theme", theme);
        window.Asc.plugin.onThemeChangedBase(theme);
        var rules =
            ".selectArrow > span { background-color: " +
            window.Asc.plugin.theme["text-normal"] +
            "}\n";
        rules +=
            ".link { color : " +
            window.Asc.plugin.theme["text-normal"] +
            ";}\n";
        rules +=
            ".control.select { background-color : " +
            window.Asc.plugin.theme["background-normal"] +
            ";}\n";
        rules +=
            ".control { color : " +
            window.Asc.plugin.theme["text-normal"] +
            "; border-color : " +
            window.Asc.plugin.theme["border-regular-control"] +
            "}\n";
        rules +=
            ".selectList { border-color : " +
            window.Asc.plugin.theme["border-regular-control"] +
            "; background-color: " +
            window.Asc.plugin.theme["background-normal"] +
            "; }\n";
        rules +=
            ".selectList > hr { border-color : " +
            window.Asc.plugin.theme["border-regular-control"] +
            "; }\n";
        rules +=
            ".selectList > span { background-color: " +
            window.Asc.plugin.theme["background-normal"] +
            "; ";
        rules += "color : " + window.Asc.plugin.theme["text-normal"] + "; }\n";
        rules +=
            ".selectList > span:hover { background-color : " +
            window.Asc.plugin.theme["highlight-button-hover"] +
            "; color : " +
            window.Asc.plugin.theme["text-normal"] +
            "}\n";
        rules +=
            '.selectList > span[selected=""] { background-color : ' +
            window.Asc.plugin.theme["highlight-button-pressed"] +
            ";" +
            "; color : " +
            window.Asc.plugin.theme["text-normal"] +
            "}";
        var styleTheme = document.createElement("style");
        styleTheme.type = "text/css";
        styleTheme.innerHTML = rules;
        document.getElementsByTagName("head")[0].appendChild(styleTheme);

        const themeType = theme.type || "light";

        const body = document.body;
        body.classList.remove("theme-dark");
        body.classList.remove("theme-light");
        body.classList.add("theme-" + themeType);
    };

    /** @type {HTMLElement[]} */
    var selectLists = [];
    function initSelectBoxes() {
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

            for (
                var k = 0;
                k < holder.getElementsByClassName("selectList").length;
                k++
            ) {
                var list = holder.getElementsByClassName("selectList")[k];
                if (list.children.length > 0) {
                    for (var j = 0; j < list.children.length; j++) {
                        const child = list.children[j];
                        if (child instanceof HTMLElement === false) {
                            continue;
                        }
                        child.onclick = onClickListElement(list, input);
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
                            !elements.styleSelectListOther.classList.contains(
                                displayNoneClass
                            )
                        )
                            return true;

                        if (list.onopen) {
                            list.onopen();
                        }
                        if (!input.hasAttribute("readonly")) {
                            input.select();
                        }
                        openList(list);

                        return true;
                    };
                };

                if (k !== 1) {
                    input.onclick = fOpen(list, input);
                    arrow.onclick = fOpen(list, input);
                }
                selectLists.push(list);
            }
        }
    }

    /**
     * @param {HTMLElement} el
     */
    function openList(el) {
        switchClass(el, displayNoneClass, false);
        window.addEventListener("click", closeList);
    }

    function closeList() {
        window.removeEventListener("click", closeList);
        for (var i = 0; i < selectLists.length; i++) {
            if (selectLists[i] === elements.styleSelectList)
                elements.styleSelect.oninput(null, "");
            switchClass(selectLists[i], displayNoneClass, true);
        }
    }

    /**
     * @param {HTMLInputElement} input
     * @param {HTMLElement} el
     * @param {HTMLElement} list
     * @param {boolean} isClick
     */
    function selectInput(input, el, list, isClick) {
        input.value = el.textContent;
        var val = el.getAttribute("data-value") || "";
        input.setAttribute("data-value", val);
        input.setAttribute("title", el.textContent);
        if (input.onselectchange) {
            input.onselectchange(input, val, isClick);
        }
        switchClass(list, displayNoneClass, true);
    }

    /**
     * @param {Element} list
     * @param {HTMLInputElement} input
     */
    function onClickListElement(list, input) {
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

                    selectInput(input, child, list, true);
                } else {
                    if (list.children[i].hasAttribute("selected")) {
                        list.children[i].attributes.removeNamedItem("selected");
                    }
                }
            }
        };
    }

    function onStyleChange() {
        let styleFormat = cslStylesManager.getLastUsedFormat();
        citationService.setStyleFormat(styleFormat);
        bNumFormat = styleFormat == "numeric";
        if ("note" === styleFormat) {
            elements.notesStyleWrapper.classList.remove(displayNoneClass);
        } else {
            elements.notesStyleWrapper.classList.add(displayNoneClass);
        }

        let notesStyle = cslStylesManager.getLastUsedNotesStyle();
        citationService.setNotesStyle(notesStyle);
        const notesAs = elements.notesStyleWrapper.querySelector(
            'input[name="notesAs"][value="' + notesStyle + '"]'
        );
        if (notesAs && notesAs instanceof HTMLInputElement) {
            notesAs.checked = true;
        }
    }

    function applyTranslations() {
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el instanceof HTMLElement === false) continue;

            ["placeholder", "title"].forEach((attr) => {
                if (el.hasAttribute(attr)) {
                    el.setAttribute(
                        attr,
                        translate(el.getAttribute(attr) || "")
                    );
                }
            });

            if (el.innerText) el.innerText = translate(el.innerText.trim());
        }
    }

    /**
     * @param {string|boolean} message
     */
    function showError(message) {
        if (message && typeof message === "string") {
            let m = translate("");
            switchClass(elements.error, displayNoneClass, false);
            elements.error.textContent = message;
            setTimeout(function () {
                window.onclick = function () {
                    showError(false);
                };
            }, 100);
        } else {
            switchClass(elements.error, displayNoneClass, true);
            elements.error.textContent = "";
            window.onclick = null;
        }
    }

    /**
     * @param {boolean} show
     */
    function showLoader(show) {
        switchClass(elements.loader, displayNoneClass, !show);
        switchClass(elements.contentHolder, blurClass, show);
    }

    /**
     * @param {boolean} show
     */
    function showLibLoader(show) {
        switchClass(elements.libLoader, displayNoneClass, !show);
    }

    /**
     * @param {HTMLElement} el
     * @param {string} className
     * @param {boolean} add
     */
    function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

    function loadMore() {
        console.warn("Loading more...");
        if (lastSearch.obj && lastSearch.obj.next) {
            loadLibrary(
                lastSearch.obj.next(),
                true,
                true,
                !lastSearch.groups.length,
                false,
                false
            );
        }

        for (
            var i = 0;
            i < lastSearch.groups.length && lastSearch.groups[i].next;
            i++
        ) {
            loadLibrary(
                sdk.getGroupItems(
                    lastSearch.groups[i].next(),
                    lastSearch.groups[i].id
                ),
                true,
                false,
                i == lastSearch.groups.length - 1,
                true,
                false
            );
        }
    }

    /**
     * @param {HTMLElement} holder
     * @returns {boolean}
     */
    function shouldLoadMore(holder) {
        if (router.getRoute() != "main") return false;
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) {
            return false;
        }

        var flag = true;
        lastSearch.groups.forEach(function (el) {
            if (el.next) flag = false;
        });
        if (!lastSearch.obj || !lastSearch.obj.next || !flag) return false;
        if (
            !lastSearch.obj &&
            !lastSearch.text.trim() &&
            !lastSearch.groups.length
        )
            return false;

        return true;
    }

    /**
     * @param {Promise<SearchResult>} promise
     * @param {boolean} append
     * @param {boolean} showLoader
     * @param {boolean} hideLoader
     * @param {boolean} isGroup
     * @param {boolean} bCount
     * @returns {Promise<boolean>}
     */
    function loadLibrary(
        promise,
        append,
        showLoader,
        hideLoader,
        isGroup,
        bCount
    ) {
        if (showLoader) showLibLoader(true);
        if (bCount) counter++;
        return promise
            .then(function (res) {
                console.warn(res);
                if (bCount) counter--;
                return displaySearchItems(
                    append,
                    res,
                    null,
                    isGroup,
                    bCount && !counter
                );
            })
            .catch(function (err) {
                if (bCount) counter--;
                console.error(err);
                if (err.message) {
                    showError(translate(err.message));
                }
                return displaySearchItems(
                    append,
                    null,
                    err,
                    isGroup,
                    bCount && !counter
                );
            })
            .finally(function () {
                if (hideLoader) {
                    showLibLoader(false);
                }
            });
    }

    /**
     * @returns {string}
     */
    function getPrefix() {
        const prefixInput = document.getElementById("prefixField");
        if (
            prefixInput &&
            prefixInput instanceof HTMLInputElement &&
            prefixInput.value
        ) {
            return prefixInput.value;
        }
        return "";
    }

    /**
     * @returns {string}
     */
    function getSuffix() {
        const suffixInput = document.getElementById("suffixField");
        if (
            suffixInput &&
            suffixInput instanceof HTMLInputElement &&
            suffixInput.value
        ) {
            return suffixInput.value;
        }
        return "";
    }

    /**
     * @returns {{locator: string, label: string} | null}
     */
    function getLocator() {
        const locatorInput = document.getElementById("locator");
        if (
            !locatorInput ||
            !(locatorInput instanceof HTMLInputElement) ||
            !locatorInput.value
        ) {
            return null;
        }
        const label = document.getElementById("locatorLabel");
        if (!label || !(label instanceof HTMLInputElement) || !label.value) {
            return null;
        }

        return {
            locator: locatorInput.value,
            label: label.getAttribute("data-value") || "",
        };
    }

    /**
     * @param {boolean} append
     * @param {SearchResult | null} res
     * @param {Error | null} err
     * @param {boolean} isGroup
     * @param {boolean} showNotFound
     */
    function displaySearchItems(append, res, err, isGroup, showNotFound) {
        var first = false;
        if (!lastSearch.obj && res && res.items && !res.items.length)
            first = true;
        if (err) {
            if (first) {
                lastSearch.obj = null;
                lastSearch.groups = [];
            }
            lastSearch.obj.next = null;
        } else {
            if (isGroup && res && res.next) lastSearch.groups.push(res);
            else lastSearch.obj = res && res.items.length ? res : null;
        }
        if (res && res.items && res.items.length > 0) {
            for (let index = 0; index < res.items.length; index++) {
                let item = res.items[index];
                item[isGroup ? "groupID" : "userID"] = res.id;
                citationService.fillUrisFromId(item);
            }
        }

        return selectCitation.displaySearchItems(
            append,
            res,
            err,
            showNotFound,
            first
        );
    }

    /**
     * @param {number} numOfSelected
     */
    function checkSelected(numOfSelected) {
        insertLinkBtn.setText(translate("Insert Citation"));
        if (numOfSelected <= 0) {
            insertLinkBtn.disable();
        } else {
            insertLinkBtn.enable();
            if (numOfSelected > 1)
                // TODO: add translate
                insertLinkBtn.setText(
                    translate("Insert " + numOfSelected + " Citations")
                );
        }
    }
})();
