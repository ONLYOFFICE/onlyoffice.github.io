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

/// <reference path="./types-global.js" />
/// <reference path="./zotero/zotero.js" />
/// <reference path="./zotero/zotero-api-checker.js" />
/// <reference path="./csl/citation/citation.js" />
/// <reference path="./csl/citation/storage.js" />
/// <reference path="./csl/styles/styles-manager.js" />
/// <reference path="./csl/locales/locales-manager.js" />
/// <reference path="./services/translate-service.js" />
/// <reference path="./services/citation-service.js" />

/**
 * @typedef {Object} Scroller
 * @property {Function} onscroll
 */

(function () {
    var counter = 0; // счетчик отправленных запросов (используется чтобы знать показывать "not found" или нет)
    var displayNoneClass = "display-none";
    var blurClass = "blur";
    /** @type {number} */
    var loadTimeout;
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

    var selected = {
        items: {},
        html: {},
        checks: {},
        count: function () {
            var k = 0;
            for (var i in selected.items) k++;
            return k;
        },
    };

    /** @type {ZoteroSdk} */
    var sdk;
    /** @type {CslStylesManager} */
    var cslStylesManager;
    /** @type {LocalesManager} */
    var localesManager;
    /** @type {CitationService} */
    var citationService;

    /** @type {{text: string, obj: SearchResult | null, groups: Array<SearchResult>}}} */
    var lastSearch = {
        text: "",
        obj: null,
        groups: [],
    };

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
        const docsHolder = document.getElementById("docsHolder");
        if (!docsHolder) {
            throw new Error("docsHolder not found");
        }
        const docsThumb = document.getElementById("docsThumb");
        if (!docsThumb) {
            throw new Error("docsThumb not found");
        }
        const configState = document.getElementById("configState");
        if (!configState) {
            throw new Error("configState not found");
        }
        const apiKeyConfigField = document.getElementById("apiKeyField");
        if (!apiKeyConfigField) {
            throw new Error("apiKeyConfigField not found");
        }
        const saveConfigBtn = document.getElementById("saveConfigBtn");
        if (!saveConfigBtn) {
            throw new Error("saveConfigBtn not found");
        }
        const mainState = document.getElementById("mainState");
        if (!mainState) {
            throw new Error("mainState not found");
        }
        const logoutLink = document.getElementById("logoutLink");
        if (!logoutLink) {
            throw new Error("logoutLink not found");
        }
        const selectedWrapper = document.getElementById("selectedWrapper");
        if (!selectedWrapper) {
            throw new Error("selectedWrapper not found");
        }
        const selectedHolder = document.getElementById("selectedHolder");
        if (!selectedHolder) {
            throw new Error("selectedHolder not found");
        }
        const selectedThumb = document.getElementById("selectedThumb");
        if (!selectedThumb) {
            throw new Error("selectedThumb not found");
        }
        const buttonsWrapper = document.getElementById("buttonsWrapper");
        if (!buttonsWrapper) {
            throw new Error("buttonsWrapper not found");
        }
        const locatorLabel = document.getElementById("locatorLabel");
        if (!locatorLabel) {
            throw new Error("locatorLabel not found");
        }
        const locatorLabelsList = document.getElementById("locatorLabelsList");
        if (!locatorLabelsList) {
            throw new Error("locatorLabelsList not found");
        }
        const library = document.getElementById("library");
        if (!library) {
            throw new Error("library not found");
        }
        const searchLibrary = document.getElementById("searchLibrary");
        if (!searchLibrary) {
            throw new Error("searchLibrary not found");
        }
        const searchLabel = document.getElementById("searchLabel");
        if (!searchLabel) {
            throw new Error("searchLabel not found");
        }
        const searchClear = document.getElementById("searchClear");
        if (!searchClear) {
            throw new Error("searchClear not found");
        }
        const searchField = document.getElementById("searchField");
        if (!searchField) {
            throw new Error("searchField not found");
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
        const insertBibBtn = document.getElementById("insertBibBtn");
        if (!insertBibBtn) {
            throw new Error("insertBibBtn not found");
        }
        const insertLinkBtn = document.getElementById("insertLinkBtn");
        if (!insertLinkBtn) {
            throw new Error("insertLinkBtn not found");
        }
        const cancelBtn = document.getElementById("cancelBtn");
        if (!cancelBtn) {
            throw new Error("cancelBtn not found");
        }
        const refreshBtn = document.getElementById("refreshBtn");
        if (!refreshBtn) {
            throw new Error("refreshBtn not found");
        }
        const saveAsTextBtn = document.getElementById("saveAsTextBtn");
        if (!saveAsTextBtn) {
            throw new Error("saveAsTextBtn not found");
        }
        const checkOmitAuthor = document.getElementById("omitAuthor");
        if (!checkOmitAuthor) {
            throw new Error("checkOmitAuthor not found");
        }
        const useDesktopApp = document.getElementById("useDesktopApp");
        if (!useDesktopApp) {
            throw new Error("useDesktopApp not found");
        }
        const cslFileInput = document.getElementById("cslFileInput");
        if (!cslFileInput) {
            throw new Error("cslFileInput not found");
        }
        elements = {
            loader: loader,
            libLoader: libLoader,
            error: error,

            contentHolder: contentHolder,
            docsHolder: docsHolder,
            docsThumb: docsThumb,

            configState: configState,
            apiKeyConfigField: apiKeyConfigField,
            saveConfigBtn: saveConfigBtn,

            mainState: mainState,
            logoutLink: logoutLink,

            selectedWrapper: selectedWrapper,
            selectedHolder: selectedHolder,
            selectedThumb: selectedThumb,
            buttonsWrapper: buttonsWrapper,

            locatorLabel: locatorLabel,
            locatorLabelsList: locatorLabelsList,

            library: library,
            searchLibrary: searchLibrary,
            searchLabel: searchLabel,
            searchClear: searchClear,
            searchField: searchField,

            styleWrapper: styleWrapper,
            styleSelectList: styleSelectList,
            styleSelectListOther: styleSelectListOther,
            styleSelect: styleSelect,
            styleLang: styleLang,
            styleLangList: styleLangList,
            notesStyleWrapper: notesStyleWrapper,
            footNotes: footNotes,
            endNotes: endNotes,

            insertBibBtn: insertBibBtn,
            insertLinkBtn: insertLinkBtn,
            cancelBtn: cancelBtn,
            refreshBtn: refreshBtn,
            saveAsTextBtn: saveAsTextBtn,

            checkOmitAuthor: checkOmitAuthor,
            useDesktopApp: useDesktopApp,
            cslFileInput: cslFileInput,
        };
    }

    /** @type {Scroller} */
    var selectedScroller;
    /** @type {Scroller} */
    var docsScroller;

    window.Asc.plugin.init = function () {
        initElements();
        showLoader(true);
        setTimeout(function () {
            if (elements.searchField) elements.searchField.focus();
        }, 100);

        sdk = new ZoteroSdk();
        cslStylesManager = new CslStylesManager();
        localesManager = new LocalesManager();
        citationService = new CitationService(
            localesManager,
            cslStylesManager,
            sdk
        );

        addEventListeners();
        initSelectBoxes();

        initSdkApis().then(function (availableApis) {
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
            initLocators();
        });

        window.Asc.plugin.onTranslate = applyTranslations;

        selectedScroller = initScrollBox(
            elements.selectedHolder,
            elements.selectedThumb
        );
        docsScroller = initScrollBox(
            elements.docsHolder,
            elements.docsThumb,
            checkDocsScroll
        );
    };

    function initSdkApis() {
        return new Promise(function (resolve) {
            let hasFirstAnswer = false;
            let onlineZoteroElements =
                document.querySelectorAll(".for-zotero-online");

            ZoteroApiChecker.runApisChecker(sdk).subscribe(function (
                /** @type {AvailableApis} */ apis
            ) {
                cslStylesManager.setDesktopApiAvailable(apis.desktop);
                cslStylesManager.setRestApiAvailable(apis.online);
                localesManager.setDesktopApiAvailable(apis.desktop);
                localesManager.setRestApiAvailable(apis.online);
                if (!hasFirstAnswer) {
                    hasFirstAnswer = true;
                    if (!apis.desktopVersion && elements.useDesktopApp) {
                        elements.useDesktopApp.classList.add("display-none");
                    }
                    showLoader(false);
                    switchAuthState("config");
                }

                if (apis.online) {
                    onlineZoteroElements.forEach(function (element) {
                        element.classList.remove("display-none");
                    });
                } else {
                    onlineZoteroElements.forEach(function (element) {
                        element.classList.add("display-none");
                    });
                }
                if (apis.online && apis.hasKey) {
                    sdk.setIsOnlineAvailable(true);
                    switchAuthState("main");
                    resolve(apis);
                    return;
                } else if (apis.desktop && apis.hasPermission) {
                    sdk.setIsOnlineAvailable(false);
                    if (elements.logoutLink)
                        elements.logoutLink.style.display = "none";
                    switchAuthState("main");
                    showError(false);
                    resolve(apis);
                    return;
                }
            });
        });
    }

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

    function initLocators() {
        const id = localStorage.getItem("selectedLocator") || "page";
        const option = elements.locatorLabelsList.querySelector(
            '[data-value="' + id + '"]'
        );
        if (!option || !(elements.locatorLabel instanceof HTMLInputElement)) {
            console.error("initLocators: no option");
            return;
        }
        option.setAttribute("selected", "");
        const name = option.textContent;

        elements.locatorLabel.value = option.textContent;
        elements.locatorLabel.setAttribute("data-value", id);
        elements.locatorLabel.setAttribute("title", name);
    }

    /** @returns {Promise<void>} */
    function loadStyles() {
        return cslStylesManager
            .getStylesInfo()
            .then(function (stylesInfo) {
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
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    /** @returns {Promise<void>} */
    function loadGroups() {
        return sdk
            .getUserGroups()
            .then(function (/** @type {Array<UserGroupInfo>} */ groups) {
                const customGroups = [
                    { id: "all", name: translate("Everywhere") },
                    { id: "my_library", name: translate("My Library") },
                    {
                        id: "group_libraries",
                        name: translate("Group Libraries"),
                    },
                ];
                if (elements.library instanceof HTMLInputElement) {
                    elements.library.value = customGroups[0].name;
                }
                elements.library.setAttribute("data-value", customGroups[0].id);
                elements.library.setAttribute("title", customGroups[0].name);

                const selectedItem =
                    localStorage.getItem("selectedGroup") || "all";

                /**
                 * @param {string|number} id
                 * @param {string} name
                 */
                const addGroupToSelectBox = function (id, name) {
                    if (typeof id === "number") {
                        id = id.toString();
                    }
                    const el = document.createElement("span");
                    el.setAttribute("data-value", id);
                    el.textContent = name;
                    elements.searchLibrary.appendChild(el);
                    if (
                        id === selectedItem &&
                        elements.library instanceof HTMLInputElement
                    ) {
                        el.setAttribute("selected", "");
                        elements.library.value = name;
                        elements.library.setAttribute("data-value", id);
                        elements.library.setAttribute("title", name);
                    }
                };

                const addSeparator = function () {
                    const el = document.createElement("hr");
                    elements.searchLibrary.appendChild(el);
                };

                elements.searchLibrary.addEventListener("click", function (e) {
                    const target = e.target;
                    let option;
                    if (target && target instanceof HTMLSpanElement) {
                        option = target;
                    } else {
                        return;
                    }
                    const selected =
                        elements.searchLibrary.querySelector("span[selected]");
                    selected && selected.attributes.removeNamedItem("selected");
                    option.setAttribute("selected", "");
                    const id = option.getAttribute("data-value");
                    const name = option.textContent;
                    if (
                        !(elements.library instanceof HTMLInputElement) ||
                        !(elements.searchField instanceof HTMLInputElement) ||
                        typeof id !== "string"
                    ) {
                        return;
                    }
                    elements.library.value = option.textContent;
                    elements.library.setAttribute("data-value", id);
                    elements.library.setAttribute("title", name);

                    localStorage.setItem("selectedGroup", id);

                    switchClass(elements.searchClear, displayNoneClass, true);
                    elements.searchField.value = "";
                    lastSearch.text = "";
                    clearLibrary();
                });

                if (groups.length === 0) {
                    return;
                }
                for (var i = 0; i < customGroups.length; i++) {
                    const id = customGroups[i].id;
                    const name = customGroups[i].name;
                    addGroupToSelectBox(id, name);
                }
                addSeparator();
                for (var i = 0; i < groups.length; i++) {
                    const id = groups[i].id;
                    const name = groups[i].name;
                    addGroupToSelectBox(id, name);
                }
            });
    }

    /**
     * @return {number|"all"|"my_library"|"group_libraries"}
     */
    function getSelectedGroup() {
        for (var i = 0; i < elements.searchLibrary.children.length; i++) {
            const option = elements.searchLibrary.children[i];
            if (option.hasAttribute("selected")) {
                const id = option.getAttribute("data-value");
                if (
                    id === "my_library" ||
                    id === "group_libraries" ||
                    id === "all"
                ) {
                    return id;
                }
                return Number(id);
            }
        }
        return "all";
    }

    /**
     * @param {Array<Object>} stylesInfo
     */
    function addStylesToList(stylesInfo) {
        var lastStyle = cslStylesManager.getLastUsedStyleId() || "ieee";

        /**
         * @param {HTMLElement} list - the list of styles where the element is added.
         * @param {HTMLElement} other - the list of styles where the element is removed.
         */
        var onStyleSelectOther = function (list, other) {
            return function (/** @type {MouseEvent} */ ev) {
                var tmpEl = list.removeChild(
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
                    elements.styleSelect
                );
                var event = new Event("click");
                newEl.dispatchEvent(event);
                openList(null);
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
                    elements.styleSelect
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
                selectInput(
                    elements.styleSelect,
                    el,
                    elements.styleSelectList,
                    false
                );
            }
        }
    }

    function addEventListeners() {
        elements.cslFileInput.onchange = function (e) {
            var file = e.target.files[0];
            if (!file) return;
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

        elements.useDesktopApp.onclick = function () {
            ZoteroApiChecker.checkStatus(sdk).then(function (
                /** @type {AvailableApis} */ apis
            ) {
                if (apis.desktop && apis.hasPermission) {
                    sdk.setIsOnlineAvailable(false);
                    elements.logoutLink.style.display = "none";
                    switchAuthState("main");
                    showError(false);
                } else if (apis.desktop && !apis.hasPermission) {
                    const errorMessage =
                        "Connection to Zotero failed. " +
                        "Please enable external connections in Zotero: " +
                        'Edit → Settings → Advanced → Check "Allow other ' +
                        'applications on this computer to communicate with Zotero"';
                    showError(translate(errorMessage));
                } else if (!apis.desktop) {
                    showError(
                        translate(
                            "Connection to Zotero failed. Make sure Zotero is running."
                        )
                    );
                }
            });
        };

        elements.logoutLink.onclick = function (e) {
            sdk.clearSettings();
            switchAuthState("config");
            return true;
        };

        /**
         * @param {string} text
         * @returns
         */
        function searchFor(text) {
            if (elements.mainState.classList.contains(displayNoneClass)) return;
            text = text.trim();
            if (!text) return;
            if (text == lastSearch.text) return;
            lastSearch.text = text;
            lastSearch.obj = null;
            lastSearch.groups = [];
            clearLibrary();

            /** @type {Array<Promise<void>>} */
            const promises = [];

            const selectedGroup = getSelectedGroup();

            return sdk
                .getUserGroups()
                .then(function (
                    /** @type {Array<UserGroupInfo>} */ userGroups
                ) {
                    /** @type {Array<string|number>} */
                    let groups = [];
                    switch (selectedGroup) {
                        case "my_library":
                            groups = [];
                            break;
                        case "all":
                        case "group_libraries":
                            groups = userGroups.map(function (group) {
                                return group.id;
                            });
                            break;
                        default:
                            groups = [selectedGroup];
                            break;
                    }

                    const append = true;
                    let showLoader = true;
                    let hideLoader = !groups.length;
                    const bCount = true;

                    if (
                        selectedGroup === "my_library" ||
                        selectedGroup === "all"
                    ) {
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
                                sdk.getGroupItems(lastSearch.text, groups[i]),
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
                    return Promise.all(promises);
                });
        }
        elements.searchField.onkeypress = function (e) {
            if (e.keyCode == 13) searchFor(e.target.value);
        };
        elements.searchField.onblur = function (e) {
            setTimeout(function () {
                searchFor(e.target.value);
            }, 500);
        };
        elements.searchField.onkeyup = function (e) {
            switchClass(
                elements.searchClear,
                displayNoneClass,
                !e.target.value
            );
        };
        elements.searchClear.onclick = function (e) {
            if (e.target.classList.contains(displayNoneClass)) return true;
            switchClass(elements.searchClear, displayNoneClass, true);
            elements.searchField.value = "";
            lastSearch.text = "";
            clearLibrary();
            return true;
        };

        elements.cancelBtn.onclick = function (e) {
            var ids = [];
            for (var id in selected.items) {
                ids.push(id);
            }
            for (var i = 0; i < ids.length; i++) {
                removeSelected(ids[i]);
            }
        };

        elements.saveConfigBtn.onclick = function (e) {
            var apikey = elements.apiKeyConfigField.value.trim();
            if (apikey) {
                sdk.setApiKey(apikey)
                    .then(function () {
                        ZoteroApiChecker.successfullyLoggedInUsingApiKey();
                        switchAuthState("main");
                    })
                    .catch(function (err) {
                        console.error(err);
                        showError(translate("Invalid API key"));
                    });
            }
        };

        elements.refreshBtn.onclick = function () {
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
        };

        elements.insertBibBtn.onclick = function () {
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
        };

        elements.insertLinkBtn.onclick = function () {
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

                    return citationService.insertSelectedCitations(
                        selected.items,
                        prefix,
                        suffix,
                        locatorInfo,
                        elements.checkOmitAuthor.checked
                    );
                })
                .then(function (keys) {
                    keys.forEach(function (key) {
                        removeSelected(key);
                    });
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
        };

        elements.saveAsTextBtn.onclick = function () {
            showLoader(true);
            citationService.saveAsText().then(function () {
                showLoader(false);
            });
        };

        elements.locatorLabelsList.addEventListener("click", function (e) {
            const target = e.target;
            let option;
            if (target && target instanceof HTMLSpanElement) {
                option = target;
            } else {
                return;
            }
            const id = option.getAttribute("data-value");
            localStorage.setItem("selectedLocator", id);
        });
    }

    function addStylesEventListeners() {
        /**
         * @param {Event|null} e - The input event.
         * @param {String} [filter] - The filter to apply on the style options.
         */
        elements.styleSelect.oninput = function (e, filter) {
            var input = elements.styleSelect;
            filter = filter !== undefined ? filter : input.value.toLowerCase();
            var list = elements.styleSelectList.classList.contains(
                displayNoneClass
            )
                ? elements.styleSelectListOther
                : elements.styleSelectList;

            for (var i = 0; i < list.children.length; i++) {
                var text =
                    list.children[i].textContent || list.children[i].innerText;
                var hide = true;
                if (!filter || text.toLowerCase().indexOf(filter) > -1) {
                    hide = false;
                }
                switchClass(list.children[i], displayNoneClass, hide);
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
            console.warn("load locale", val);
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

        elements.footNotes.addEventListener("change", function (event) {
            if (event.target.checked) {
                cslStylesManager.saveLastUsedNotesStyle(event.target.value);
            }
        });
        elements.endNotes.addEventListener("change", function (event) {
            if (event.target.checked) {
                cslStylesManager.saveLastUsedNotesStyle(event.target.value);
            }
        });
    }

    /**
     * @param {string} theme - The new theme of the SDK.
     */
    Asc.plugin.onThemeChanged = function (theme) {
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
    };

    /**
     * @param {HTMLElement} holder
     * @param {HTMLElement} thumb
     * @param {function(HTMLElement): void} [onscroll]
     * @returns {Scroller}
     */
    function initScrollBox(holder, thumb, onscroll) {
        var scroller = {};
        scroller.onscroll = checkScroll(holder, thumb, onscroll);

        holder.onwheel = function (e) {
            holder.scrollTop +=
                e.deltaY > 10 || e.deltaY < -10 ? e.deltaY : e.deltaY * 20;
            scroller.onscroll();
        };

        thumb.onmousedown = function (e) {
            switchClass(thumb, "scrolling", true);
            var y = e.clientY;
            var initialPos = holder.scrollTop;

            window.onmouseup = function (e) {
                switchClass(thumb, "scrolling", false);
                window.onmouseup = null;
                window.onmousemove = null;
            };
            window.onmousemove = function (e) {
                var delta = e.clientY - y;

                var percMoved = delta / holder.clientHeight;
                var deltaScroll = holder.scrollHeight * percMoved;
                holder.scrollTop = initialPos + deltaScroll;

                scroller.onscroll();
            };
        };

        document.body.addEventListener("resize", function () {
            scroller.onscroll();
        });

        return scroller;
    }

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
                        list.children[j].onclick = onClickListElement(
                            list,
                            input
                        );
                    }
                    // selectInput(input, list.children[0], list, false);
                }

                /**
                 * @param {HTMLElement} list
                 * @param {HTMLElement} input
                 * @returns {function}
                 */
                var f = function (list, input) {
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
                    input.onclick = f(list, input);
                    arrow.onclick = f(list, input);
                }
                selectLists.push(list);
            }
        }

        window.addEventListener("click", function () {
            openList(null);
        });
    }

    /**
     * @param {HTMLElement|null} el
     */
    function openList(el) {
        for (var i = 0; i < selectLists.length; i++) {
            var close = true;
            if (selectLists[i] === el) {
                close = false;
            }
            if (close && selectLists[i] === elements.styleSelectList)
                elements.styleSelect.oninput(null, "");

            switchClass(selectLists[i], displayNoneClass, close);
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
     * @param {Element} input
     */
    function onClickListElement(list, input) {
        return function (/** @type {MouseEvent} */ ev) {
            console.warn("onClickListElement", input);
            if (!ev.target || !(ev.target instanceof HTMLElement)) {
                console.error("onClickListElement: no target");
                return;
            }
            var sel = ev.target.getAttribute("data-value");
            for (var i = 0; i < list.children.length; i++) {
                if (list.children[i].getAttribute("data-value") == sel) {
                    list.children[i].setAttribute("selected", "");
                    selectInput(input, list.children[i], list, true);
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

            if (el.attributes["placeholder"])
                el.attributes["placeholder"].value = translate(
                    el.attributes["placeholder"].value
                );
            if (el.attributes["title"])
                el.attributes["title"].value = translate(
                    el.attributes["title"].value
                );
            if (el.innerText) el.innerText = translate(el.innerText);
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

    /**
     * @param {boolean} hide
     */
    function configState(hide) {
        switchClass(elements.configState, displayNoneClass, hide);
    }

    /**
     * @param {boolean} hide
     */
    function mainState(hide) {
        switchClass(elements.mainState, displayNoneClass, hide);
        switchClass(elements.logoutLink, displayNoneClass, hide);
    }

    /**
     * @type {"main"|"config"}
     */
    var currentAuthState;
    /**
     * @param {"main"|"config"} state
     */
    function switchAuthState(state) {
        currentAuthState = state;
        configState(true);
        mainState(true);
        switch (state) {
            case "config":
                configState(false);
                break;
            case "main":
                mainState(false);
                break;
        }
    }

    /**
     * @param {HTMLElement} holder
     * @param {HTMLElement} thumb
     * @param {function} [func] - an optional function to be called with the holder and thumb as arguments.
     * @returns {function} - a function that checks the scroll state and updates the thumb accordingly.
     * */
    function checkScroll(holder, thumb, func) {
        return function () {
            if (holder.scrollHeight <= holder.clientHeight) {
                switchClass(thumb, displayNoneClass, true);
            } else {
                switchClass(thumb, displayNoneClass, false);
                var height =
                    (holder.clientHeight / holder.scrollHeight) *
                    holder.clientHeight;
                height = height < 40 ? 40 : height;
                thumb.style.height = height + "px";

                var scroll = holder.scrollHeight - holder.clientHeight;
                var percScrolled = holder.scrollTop / scroll;

                var margin = percScrolled * (holder.clientHeight - height);
                thumb.style.marginTop = margin + "px";
            }

            if (func) func(holder, thumb);
        };
    }

    /**
     * @param {HTMLElement} holder - The element that contains the document list.
     * @param {HTMLElement} [thumb]
     */
    function checkDocsScroll(holder, thumb) {
        if (shouldLoadMore(holder)) {
            if (loadTimeout) {
                clearTimeout(loadTimeout);
            }

            if (
                !lastSearch.obj &&
                !lastSearch.text.trim() &&
                !lastSearch.groups.length
            )
                return;

            loadTimeout = setTimeout(function () {
                if (shouldLoadMore(holder)) {
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
                        i < lastSearch.groups.length &&
                        lastSearch.groups[i].next;
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
            }, 500);
        }
    }

    /**
     * @param {HTMLElement} holder
     * @returns {boolean}
     */
    function shouldLoadMore(holder) {
        if (currentAuthState != "main") return false;
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) {
            return false;
        }

        var flag = true;
        lastSearch.groups.forEach(function (el) {
            if (el.next) flag = false;
        });
        if (!lastSearch.obj || !lastSearch.obj.next || !flag) return false;

        return true;
    }

    function clearLibrary() {
        var holder = elements.docsHolder;
        while (holder.lastChild) {
            holder.removeChild(holder.lastChild);
        }
        holder.scrollTop = 0;
        docsScroller.onscroll();
    }

    /**
     * @param {Promise<SearchResult>} promise
     * @param {boolean} append
     * @param {boolean} showLoader
     * @param {boolean} hideLoader
     * @param {boolean} isGroup
     * @param {boolean} bCount
     * @returns {Promise<void>}
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
                console.log(res);
                if (bCount) counter--;
                displaySearchItems(
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
                displaySearchItems(
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
        var holder = elements.docsHolder;

        if (!append) {
            clearLibrary();
        }

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

        var page = document.createElement("div");
        page.classList.add("page" + holder.children.length);
        if (res && res.items && res.items.length > 0) {
            for (let index = 0; index < res.items.length; index++) {
                let item = res.items[index];
                item[isGroup ? "groupID" : "userID"] = res.id;
                citationService.fillUrisFromId(item);

                page.appendChild(buildDocElement(item));
            }
        } else if (err || first) {
            if (err) {
                showError(err);
            } else if (showNotFound) {
                var notFound = document.createElement("div");
                notFound.textContent = translate("Nothing found");
                notFound.classList.add("searchInfo");
                page.appendChild(notFound);
            }
        }
        holder.appendChild(page);

        docsScroller.onscroll();
    }

    /**
     * @param {SearchResultItem} item
     * @returns {HTMLElement}
     */
    function buildDocElement(item) {
        var root = document.createElement("div");
        root.classList.add("doc");

        var checkHolder = document.createElement("div");
        var checkWrapper = document.createElement("div");
        checkWrapper.classList.add("checkbox");
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        if (selected.items[item.id]) {
            check.checked = true;
            selected.checks[item.id] = check;
        }
        checkWrapper.appendChild(check);
        checkWrapper.appendChild(document.createElement("span"));
        checkHolder.appendChild(checkWrapper);

        var docInfo = document.createElement("div");
        docInfo.classList.add("docInfo");

        var title = document.createElement("div");
        title.textContent = item.title;
        title.classList.add("truncate-text");
        docInfo.appendChild(title);

        if (item.author && item.author.length > 0) {
            var authors = document.createElement("div");
            authors.textContent = item.author
                .map(function (a) {
                    return a.family + ", " + a.given;
                })
                .join("; ");
            authors.setAttribute("title", authors.textContent);
            authors.classList.add("secondary-text");
            authors.classList.add("truncate-text");
            authors.classList.add("nowrap");
            docInfo.appendChild(authors);
        }

        var source = document.createElement("div");
        if (item.publisher || item["publisher-place"]) {
            source.textContent = item.publisher || item["publisher-place"];
        }
        if (item.issued && item.issued["date-parts"]) {
            var date = item.issued["date-parts"][0];
            if (source.textContent) {
                source.textContent += " (" + date.join("-") + ")";
            } else {
                source.textContent = date.join("-");
            }
        }
        source.setAttribute("title", source.textContent);
        source.classList.add("secondary-text");
        source.classList.add("truncate-text");
        source.classList.add("nowrap");
        docInfo.appendChild(source);

        root.appendChild(checkHolder);
        root.appendChild(docInfo);

        /**
         * @param {HTMLInputElement} input
         * @param {unknown} item
         * @returns
         */
        function selectItem(input, item) {
            return function () {
                input.checked = !input.checked;
                if (input.checked) {
                    addSelected(item, input);
                } else {
                    removeSelected(item.id);
                }
            };
        }

        var f = selectItem(check, item);
        checkWrapper.onclick = f;
        docInfo.onclick = f;

        return root;
    }

    /**
     * @param {SearchResultItem} item
     * @param {HTMLInputElement} input
     */
    function addSelected(item, input) {
        var el = buildSelectedElement(item);
        selected.items[item.id] = item;
        selected.html[item.id] = el;
        selected.checks[item.id] = input;
        elements.selectedHolder.appendChild(el);
        docsScroller.onscroll();
        selectedScroller.onscroll();
        checkSelected();
    }

    function removeSelected(id) {
        var el = selected.html[id];
        delete selected.items[id];
        delete selected.html[id];
        if (selected.checks[id]) {
            selected.checks[id].checked = false;
            delete selected.checks[id];
        }
        elements.selectedHolder.removeChild(el);
        docsScroller.onscroll();
        selectedScroller.onscroll();
        checkSelected();
    }

    /**
     * @param {SearchResultItem} item
     */
    function buildSelectedElement(item) {
        var root = document.createElement("div");
        root.classList.add("selDoc");

        var name = document.createElement("span");
        name.textContent = item.title;
        name.setAttribute("title", item.title);

        var year = document.createElement("span");
        if (item.issued && item.issued["date-parts"]) {
            year.textContent = item.issued["date-parts"][0].join("-");
        }

        var remove = document.createElement("span");
        remove.onclick = function () {
            removeSelected(item.id);
        };
        remove.textContent = "×";

        root.appendChild(name);
        root.appendChild(year);
        root.appendChild(remove);

        return root;
    }

    function checkSelected() {
        if (selected.count() <= 0) {
            if (elements.insertLinkBtn)
                elements.insertLinkBtn.setAttribute("disabled", "");
            if (elements.cancelBtn)
                elements.cancelBtn.setAttribute("disabled", "");
        } else {
            if (elements.insertLinkBtn)
                elements.insertLinkBtn.removeAttribute("disabled");
            if (elements.cancelBtn)
                elements.cancelBtn.removeAttribute("disabled");
        }
    }
})();
