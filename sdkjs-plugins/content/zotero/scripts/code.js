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
/// <reference path="./services/translate-service.js" />
/// <reference path="./services/citation-service.js" />
/// <reference path="./shared/components/search-filter.js" />
/// <reference path="./shared/components/select-citation.js" />
/// <reference path="./shared/ui/button.js" />
/// <reference path="./login.js" />
/// <reference path="./settings.js" />

(function () {
    var counter = 0; // счетчик отправленных запросов (используется чтобы знать показывать "not found" или нет)
    var displayNoneClass = "hidden";
    var blurClass = "blur";

    // TODO добавить ещё обработку событий (удаление линков) их не нужно удалять
    //     из библиографии автоматически (это делать только при обновлении библиографии
    //     или refresh), но их точно нужно удалить из formatter!
    // TODO добавить ещё обработку события (изменения линков), предлать пользователю
    //     обновить их или сохранить ручное форматирование (при ручном форматировании
    //     не меняем внешний вид цитаты при refresh (да и вообще не меняем))
    // TODO сейчас всегда делаем полный refresh при каждом действии
    //     (обновлении, вставке линков, вставке библиографии), потому что мы не знаем
    //     что поменялось без событий (потом добавить ещё сравнение контента)
    // TODO ms меняет линки (если стиль с нумерацией settings._bNumFormat) делает их по порядку
    //     как документе (для этого нужно знать где именно в документе мы вставляем цитату,
    //     какая цитата сверху и снизу от текущего курсора)

    /** @type {Router} */
    var router;
    /** @type {ZoteroSdk} */
    var sdk;

    /** @type {SettingsPage} */
    var settings;

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

        const mainState = document.getElementById("mainState");
        if (!mainState) {
            throw new Error("mainState not found");
        }

        const checkOmitAuthor = document.getElementById("omitAuthor");
        if (!checkOmitAuthor) {
            throw new Error("checkOmitAuthor not found");
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

            mainState: mainState,

            checkOmitAuthor: checkOmitAuthor,
        };
    }

    window.Asc.plugin.init = function () {
        initElements();
        showLoader(true);

        router = new Router();
        sdk = new ZoteroSdk();
        const loginPage = new LoginPage(router, sdk);
        settings = new SettingsPage(router, displayNoneClass);
        citationService = new CitationService(
            settings.getLocalesManager(),
            settings.getStyleManager(),
            sdk
        );

        addEventListeners();

        loginPage
            .init()
            .onOpen(function () {
                showLoader(false);
            })
            .onChangeState(function (apis) {
                settings.setDesktopApiAvailable(apis.desktop);
                settings.setRestApiAvailable(apis.online);
            })
            .onAuthorized(function (apis) {
                showLoader(true);

                Promise.all([loadGroups(), settings.init()]).then(function () {
                    showLoader(false);
                });
            });

        window.Asc.plugin.onTranslate = applyTranslations;
    };

    /** @returns {Promise<void>} */
    function loadGroups() {
        return sdk
            .getUserGroups()
            .then(function (/** @type {Array<UserGroupInfo>} */ groups) {
                searchFilter.addGroups(groups);
            });
    }

    function addEventListeners() {
        selectCitation.subscribe(checkSelected);

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
            if (!settings.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!settings.getLocale()) {
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
            if (!settings.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!settings.getLocale()) {
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
            if (!settings.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!settings.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader(true);
            citationService
                .updateCslItems(true, false, false)
                .then(function () {
                    let checked = false;
                    if (elements.checkOmitAuthor instanceof HTMLInputElement) {
                        checked = elements.checkOmitAuthor.checked;
                    }

                    return citationService.insertSelectedCitations(
                        selectCitation.getSelectedItems(),
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

        settings.onChangeState(function (/** @type {Promise<void>} */ promise) {
            showLoader(true);
            promise
                .then(function () {
                    return citationService.updateCslItems(true, true, false);
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
