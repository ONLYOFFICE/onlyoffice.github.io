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

/// <reference path="./types-global.js" />
/// <reference path="./zotero/types.js" />

import { Theme } from "./theme";
import { Router } from "./router";
import { ZoteroSdk } from "./zotero";
import { SettingsPage } from "./settings";
import { LoginPage } from "./login";
import { translate, CitationService } from "./services";
import { SearchFilterComponents, SelectCitationsComponent } from "./shared/ui";
import { Button } from "./shared/components";

import "../components.css";
import "../styles.css";

(function () {
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
        let isInit = false;

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
                if (isInit) return;
                isInit = true;
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
         * @returns {Promise<Array<Promise<number>>}
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
                return Promise.resolve([]);

            selectCitation.clearLibrary();

            /** @type {Array<Promise<number>>} */
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

                    let showLoader = true;
                    let hideLoader = !groups.length;

                    if (selectedGroups.indexOf("my_library") !== -1) {
                        promises.push(
                            loadLibrary(
                                sdk.getItems(text),
                                showLoader,
                                hideLoader,
                                false
                            )
                        );
                    }

                    for (var i = 0; i < groups.length; i++) {
                        showLoader = i === 0 && promises.length === 0;
                        hideLoader = i === groups.length - 1;
                        promises.push(
                            loadLibrary(
                                sdk.getGroupItems(text, groups[i]),
                                showLoader,
                                hideLoader,
                                true
                            )
                        );
                    }
                    lastSearch.text = text;
                    lastSearch.obj = null;
                    lastSearch.groups = [];
                    lastSearch.groupsHash = groupsHash;
                    return promises;
                });
        }
        searchFilter.subscribe(function (text, selectedGroups) {
            searchFor(text, selectedGroups)
                .catch(() => {
                    return [];
                })
                .then(function (promises) {
                    return Promise.allSettled(promises);
                })
                .then(function (
                    /** @type {Array<PromiseSettledResult<number>>} */ numOfShownByLib
                ) {
                    let numOfShown = 0;
                    numOfShownByLib.forEach(function (promise) {
                        if (promise.status === "fulfilled") {
                            numOfShown += promise.value;
                        }
                    });
                    if (numOfShown === 0) {
                        selectCitation.displayNothingFound();
                    }
                    console.warn(numOfShown);
                });
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
                    const items = selectCitation.getSelectedItems();
                    return citationService.insertSelectedCitations(items);
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

        settings.onChangeState(function (settings) {
            citationService.setNotesStyle(settings.notesStyle);
            citationService.setStyleFormat(settings.styleFormat);
            return citationService.updateCslItems(true, true, false);
        });
    }

    /**
     * @param {ThemeColors} theme - The new theme of the SDK.
     */
    Asc.plugin.onThemeChanged = function (theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        Theme.fixThemeForIE(theme);
        Theme.addStylesForComponents(theme);
        var rules = "";
        rules +=
            ".link { color : " +
            window.Asc.plugin.theme["text-normal"] +
            ";}\n";
        rules +=
            ".doc { border-color: " +
            theme["border-regular-control"] +
            "; background-color: " +
            theme["background-normal"] +
            "; }\n";
        rules +=
            ".scrollThumb { box-shadow: 0 0 8px 8px " +
            theme["highlight-button-hover"] +
            " inset; }\n";
        rules +=
            ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " +
            theme["canvas-scroll-thumb-pressed"] +
            " inset; }\n";
        rules +=
            ".scrollThumb:hover { box-shadow: 0 0 8px 8px " +
            theme["canvas-scroll-thumb-hover"] +
            " inset; }\n";
        if (
            ["theme-white", "theme-night"].indexOf(theme.name) !== -1 ||
            ["theme-white", "theme-night"].indexOf(theme.Name) !== -1
        ) {
            rules += ".doc { border-radius: 4px; }\n";
        }

        let styleTheme = document.getElementById("pluginStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "pluginStyles";
            styleTheme.innerHTML = rules;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
        } else {
            styleTheme.innerHTML = rules;
        }

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

            const translated = translate(el.innerText.trim());
            if (translated) el.innerText = translated;
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
                !lastSearch.groups.length,
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
                false,
                i == lastSearch.groups.length - 1,
                true
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
     * @param {boolean} showLoader
     * @param {boolean} hideLoader
     * @param {boolean} isGroup
     * @returns {Promise<number>}
     */
    function loadLibrary(promise, showLoader, hideLoader, isGroup) {
        if (showLoader) showLibLoader(true);
        return promise
            .then(function (res) {
                return displaySearchItems(res, null, isGroup);
            })
            .catch(function (err) {
                console.error(err);
                if (err.message) {
                    showError(translate(err.message));
                }
                return displaySearchItems(null, err, isGroup);
            })
            .then(function (numOfShown) {
                if (hideLoader) {
                    showLibLoader(false);
                }
                return numOfShown;
            });
    }

    /**
     * @param {SearchResult | null} res
     * @param {Error | null} err
     * @param {boolean} isGroup
     * @returns {Promise<number>}
     */
    function displaySearchItems(res, err, isGroup) {
        var first = false;
        if (!lastSearch.obj && res && res.items && !res.items.length)
            first = true;
        if (err) {
            if (first) {
                lastSearch.obj = null;
                lastSearch.groups = [];
            }
            if (lastSearch && lastSearch.obj) {
                delete lastSearch.obj.next;
            }
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

        return selectCitation.displaySearchItems(res, err);
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
