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

/** @typedef {import("../../../../v1/onlyoffice-types").AscTheme} AscTheme */

import { Theme } from "./theme";
import { Router } from "./router";
import { ZoteroSdk } from "./zotero";
import { SettingsPage } from "./pages/settings";
import { LoginPage } from "./pages/login";
import { translate, CitationService, CursorService } from "./services";
import { SearchFilterComponents, SelectCitationsComponent } from "./shared/ui";
import { Button, Loader } from "./shared/components";

import "../components.css";
import "../styles.css";

(function () {
    const displayNoneClass = "hidden";

    /** @type {Router} */
    let router;
    /** @type {ZoteroSdk} */
    let sdk;

    /** @type {SettingsPage} */
    let settings;

    /** @type {CitationService} */
    let citationService;

    /** @type {LastSearch} */
    const lastSearch = {
        text: "",
        obj: null,
        groups: [],
        groupsHash: "",
    };

    /** @type {SearchFilterComponents} */
    let searchFilter;
    /** @type {SelectCitationsComponent} */
    let selectCitation;
    /** @type {Button} */
    let saveAsTextBtn;
    /** @type {Button} */
    let insertLinkBtn;
    /** @type {Button} */
    let openSettingsBtn;
    /** @type {Button} */
    let insertBibBtn;
    /** @type {Button} */
    let refreshBtn;
    const libLoader = new Loader("libLoader", translate("Loading..."));
    /** @type {Object.<string, HTMLElement | HTMLInputElement>} */
    let elements = {};
    function initElements() {
        const error = document.getElementById("errorWrapper");
        if (!error) {
            throw new Error("errorWrapper not found");
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
        openSettingsBtn = new Button("settingsBtn", {
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
            error: error,
            mainState: mainState,
        };
    }

    window.Asc.plugin.init = function () {
        Loader.show();
        initElements();

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
                Loader.hide();
            })
            .onChangeState(function (apis) {
                settings.setDesktopApiAvailable(apis.desktop);
                settings.setRestApiAvailable(apis.online);
            })
            .onAuthorized(function (apis) {
                if (isInit) return;
                isInit = true;
                Loader.show();

                let loadGroupsPromise = loadGroups().catch((e) => {
                    console.error(e);
                    showError(translate("An error occurred while loading library groups. Try restarting the plugin."));
                });
                let initSettingsPromise = settings.init().catch((e) => {
                    console.error(e);
                    showError(translate("An error occurred while loading settings. Try restarting the plugin."));
                    settings.show();
                });

                Promise.all([loadGroupsPromise, initSettingsPromise]).then(function () {
                    Loader.hide();
                    return showCitationsAtTheStartFromMyLibrary();
                }).finally(function () {
                    Loader.hide();
                });
            });

        window.Asc.plugin.onTranslate = applyTranslations;
        
        getEditorVersion().then((editorVersion) => {
            window.Asc.scope.editorVersion = editorVersion;
            addContextMenuButtons();
        });
        
    };

    function showCitationsAtTheStartFromMyLibrary() {
        libLoader.show();
        const promise = sdk.getItems(null)
            .then(res => {
                delete res.next;
                return res;
            })
        return loadLibrary(promise, false)
            .then((res) => {
                if (res > 0) {
                    updateHeaderText("started"); 
                } else {
                    updateHeaderText("empty");
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                libLoader.hide();
            });
    }

    /** @returns {Promise<UserGroupInfo[]>} */
    function loadGroups() {
        return sdk
            .getUserGroups()
            .then(function (/** @type {Array<UserGroupInfo>} */ groups) {
                searchFilter.addGroups(groups);
                return groups;
            });
    }

    function addEventListeners() {
        selectCitation.subscribe(checkSelected);

        /**
         * @param {string} text
         * @param {Array<string|"my_library"|"group_libraries">} selectedGroups
         * @param {string} groupsHash
         * @returns {Promise<Array<Promise<number>>>}
         */
        function searchFor(text, selectedGroups, groupsHash) {
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

                    if (selectedGroups.indexOf("my_library") !== -1) {
                        promises.push(
                            loadLibrary(sdk.getItems(text), false),
                        );
                    }

                    for (var i = 0; i < groups.length; i++) {
                        promises.push(
                            loadLibrary(
                                sdk.getGroupItems(text, groups[i]),
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
            text = text.trim();
            const groupsHash = selectedGroups.join(",");
            if (
                elements.mainState.classList.contains(displayNoneClass) ||
                !text ||
                (text == lastSearch.text &&
                    groupsHash === lastSearch.groupsHash) ||
                selectedGroups.length === 0
            )
                return;

            searchFor(text, selectedGroups, groupsHash)
                .catch(() => {
                    return [];
                })
                .then(function (promises) {
                    if (promises.length) {
                        libLoader.show();
                        Promise.any(promises)
                            .then(function () {
                                libLoader.hide();
                            })
                            .finally(function () {
                                libLoader.hide();
                            });
                    }
                    return Promise.allSettled(promises);
                })
                .then(function (
                        /** @type {Array<PromiseSettledResult<number>>} */ numOfShownByLib,
                    ) {
                        let numOfShown = 0;
                        numOfShownByLib.forEach(function (promise) {
                            if (promise.status === "fulfilled") {
                                numOfShown += promise.value;
                            }
                        });
                        if (numOfShown === 0) {
                            updateHeaderText("empty");
                            selectCitation.displayNothingFound();
                        } else {
                            updateHeaderText("not-empty");
                        }
                    },
                );
        });

        refreshBtn.subscribe(async function (event) {
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
            showLoader();
            /** @type {number} */
            let cursorPos = await CursorService.getCursorPosition();
            let updateFn = citationService.updateCslItems.bind(
                citationService,
                false
            );

            const styleManager = settings.getStyleManager();
            if (styleManager.getLastUsedFormat() === "note") {
                // this way, because "SelectAddinField" does not work with notes
                updateFn = citationService.updateCslItemsInNotes.bind(
                    citationService,
                    styleManager.getLastUsedNotesStyle()
                );
            }

            updateFn()
                .catch(function (error) {
                    console.error(error);
                    let message = translate("Failed to refresh");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                })
                .finally(function () {
                    hideLoader();
                    CursorService.setCursorPosition(cursorPos);
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
            showLoader();
            citationService
                .insertBibliography()
                .catch(function (error) {
                    console.error(error);
                    let message = translate("Failed to insert bibliography");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                })
                .finally(function () {
                    hideLoader();
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
            showLoader();
            const items = selectCitation.getSelectedItems();
            /** @type {number} */
            let cursorPos;
            CursorService.getCursorPosition()
                .then(function (pos) {
                    cursorPos = pos;
                    return citationService.insertSelectedCitations(items);
                })
                .then(function (keys) {
                    selectCitation.removeItems(keys);
                    return citationService.updateCslItems();
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
                    hideLoader();
                    CursorService.setCursorPosition(cursorPos);
                });
        });

        openSettingsBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            settings.show();
        });

        saveAsTextBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            showLoader();
            citationService.saveAsText().then(function () {
                hideLoader();
            });
        });

        settings.onChangeState(async function (newState, oldState) {
            /** @type {number} */
            const cursorPos = await CursorService.getCursorPosition();

            if ([newState.styleFormat, oldState.styleFormat].includes("note")) {
                if (newState.styleFormat !== oldState.styleFormat) {
                    if (newState.styleFormat === "note") {
                        await citationService.switchingBetweenNotesAndText(
                            newState.notesStyle,
                        );
                    } else {
                        await citationService.switchingBetweenNotesAndText();
                    }
                } else if (newState.notesStyle !== oldState.notesStyle) {
                    await citationService.convertNotesStyle(
                        newState.notesStyle,
                    );
                } else {
                    await citationService.updateCslItems(true);
                }
            } else {
                await citationService.updateCslItems(true);
            }

            await CursorService.setCursorPosition(cursorPos);
        });
    }

    /**
     * @param {AscTheme} theme - The new theme of the SDK.
     */
    Asc.plugin.onThemeChanged = function (theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        Theme.fixThemeForIE(theme);
        Theme.addStylesForComponents(theme);
        let rules = "";
        rules +=
            ".link, .link:visited, .link:hover { color : " +
            window.Asc.plugin.theme["text-normal"] +
            " !important;}\n";
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
        let elements = document.getElementsByClassName("i18n");

        for (let i = 0; i < elements.length; i++) {
            let el = elements[i];
            if (el instanceof HTMLElement === false) continue;

            ["placeholder", "title"].forEach((attr) => {
                if (el.hasAttribute(attr)) {
                    el.setAttribute(
                        attr,
                        translate(el.getAttribute(attr) || ""),
                    );
                }
            });

            const translated = translate(
                el.innerText.trim().replace(/\s+/g, " "),
            );
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

    function showLoader() {
        insertBibBtn.disable();
        refreshBtn.disable();
        insertLinkBtn.disable();
    }
    function hideLoader() {
        insertBibBtn.enable();
        refreshBtn.enable();
        checkSelected();
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
     * @param {"empty" | "not-empty" | "started"} whatToShow
     */
    function updateHeaderText(whatToShow) {
        const searchLabel = document.getElementById("searchLabel");
        if (!searchLabel) {
            console.error("Search label not found");
            return;
        }
        const textWhenEmpty = searchLabel.querySelector('.when-empty');
        const textWhenNotEmpty = searchLabel.querySelector('.when-not-empty');
        const textWhenStarted = searchLabel.querySelector('.when-started');
        if (!textWhenEmpty || !textWhenNotEmpty || !textWhenStarted) {
            console.error("Search label elements not found");
            return;
        }
        textWhenEmpty.classList.add("hidden");
        textWhenNotEmpty.classList.add("hidden");
        textWhenStarted.classList.add("hidden");
        switch (whatToShow) {
            case "empty":
                textWhenEmpty.classList.remove("hidden");
                break;
            case "not-empty":
                textWhenNotEmpty.classList.remove("hidden");
                break;
            case "started":
                textWhenNotEmpty.classList.remove("hidden");
                textWhenStarted.classList.remove("hidden");
                break;
        } 
    }

    function loadMore() {
        console.warn("Loading more...");
        if (lastSearch.obj && lastSearch.obj.next) {
            loadLibrary(lastSearch.obj.next(), false);
        }

        for (
            let i = 0;
            i < lastSearch.groups.length && lastSearch.groups[i].next;
            i++
        ) {
            loadLibrary(
                sdk.getGroupItems(
                    lastSearch.groups[i].next(),
                    lastSearch.groups[i].id,
                ),
                true,
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

        let flag = true;
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
     * @param {boolean} isGroup
     * @returns {Promise<number>}
     */
    function loadLibrary(promise, isGroup) {
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
        let first = false;
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
        /**
         * @param {SearchResultItem} item
         * @returns
         */
        const fillUrisFromId = function (item) {
            if (!item.id) return item;
            const slashFirstIndex = item.id.indexOf("/") + 1;
            const slashLastIndex = item.id.lastIndexOf("/") + 1;
            const httpIndex = item.id.indexOf("http");
            if (slashFirstIndex !== slashLastIndex && httpIndex === 0) {
                if (!item.uris) {
                    item.uris = [];
                }
                item.uris.push(item.id);
            }
            if (slashLastIndex) item.id = item.id.substring(slashLastIndex);

            return item;
        };
        if (res && res.items && res.items.length > 0) {
            res.items = res.items.map(item => {
                item = convertJsonToCsl(item);
                item[isGroup ? "groupID" : "userID"] = res.id;
                fillUrisFromId(item);
                return item;
            });
        }

        return selectCitation.displaySearchItems(res, err, lastSearch);
    }

    /**
     * @param {any} item 
     * @returns {SearchResultItem}
     */
    function convertJsonToCsl(item) {
        if (item.id || !item.key) return item;
        /** @type {SearchResultItem} */
        const res = {
            id: item.key,
            title: item.data.title,
            type: item.data.itemType,
        };
        if (Object.hasOwnProperty.call(item, "url")) {
            res.URL = item.data.url;
        }
        if (Object.hasOwnProperty.call(item, "volume")) {
            res.volume = item.data.volume;
        }
        if (Object.hasOwnProperty.call(item, "language")) {
            res.language = item.data.language;
        }
        if (Object.hasOwnProperty.call(item, "abstract")) {
            res.abstract = item.data.abstract;
        }
        if (Object.hasOwnProperty.call(item, "note")) {
            res.note = item.data.note;
        }
        if (Object.hasOwnProperty.call(item, "page")) {
            res.page = item.data.page;
        }
        if (Object.hasOwnProperty.call(item, "shortTitle")) {
            res.shortTitle = item.data.shortTitle;
        }
        if (Object.hasOwnProperty.call(item, "links")) {
            res.uris = [];
            if (Object.hasOwnProperty.call(item.links, "self")) {
                res.uris.push(item.links.self.href)
            }
            if (Object.hasOwnProperty.call(item.links, "alternate")) {
                res.uris.push(item.links.alternate.href)
            }
        }

        return res;
    }

    /**
     * @param {number} [numOfSelected]
     */
    function checkSelected(numOfSelected) {
        if (typeof numOfSelected === "undefined") {
            numOfSelected = selectCitation.count();
        }
        if (numOfSelected <= 0) {
            insertLinkBtn.disable();
            insertLinkBtn.setText(translate("Insert Citation"));
        } else {
            insertLinkBtn.enable();
            if (numOfSelected > 1) {
                // TODO: add translate
                insertLinkBtn.setText(
                    translate("Insert " + numOfSelected + " Citations"),
                );
            } else {
                insertLinkBtn.setText(translate("Insert Citation"));
            }
        }
    }

    /**
     * @returns {Promise<number>}
     */
    async function getEditorVersion() {
        try {
            let version = await new Promise(resolve => {
                Asc.plugin.executeMethod("GetVersion", [], resolve);
            });
            if ("develop" == version)
                version = "99.99.99";

            let arrVer = version.split(".");
            while (3 > arrVer.length)
                arrVer.push("0");

            return 1000000 * parseInt(arrVer[0]) +  1000 * parseInt(arrVer[1]) + parseInt(arrVer[2]);
        } catch (error) {
            console.error(error);
            return 99_999_999;
        }
		
	}

    function addContextMenuButtons() {
        let buttonMain = new Asc.ButtonContextMenu();
        buttonMain.text = "Edit citation";
        buttonMain.addCheckers("Target", "Selection");
        buttonMain.attachOnClick(async function () {
            /** @type {AddinFieldData | null} */
            const field = await new Promise((resolve) => {
                window.Asc.plugin.executeMethod(
                    "GetCurrentAddinField",
                    undefined,
                    resolve,
                );
            });
            if (
                !field ||
                !field.Value ||
                field.Value.toLowerCase().indexOf("zotero_item") === -1
            ) {
                return;
            }
            const updatedField = await citationService.showEditCitationWindow(field);
            if (!updatedField) {
                return;
            }
            showLoader();
            /** @type {number} */
            let cursorPos = await CursorService.getCursorPosition();
            let updateFn = citationService.updateItem.bind(
                citationService,
                updatedField
            );

            const styleManager = settings.getStyleManager();
            if (styleManager.getLastUsedFormat() === "note") {
                // this way, because "SelectAddinField" does not work with notes
                updateFn = citationService.updateItemInNotes.bind(
                    citationService,
                    updatedField,
                    styleManager.getLastUsedNotesStyle()
                );
            }

            updateFn()
                .catch(function (error) {
                    console.error(error);
                    let message = translate("Failed to insert citation");
                    if (typeof error === "string") {
                        message += ". " + translate(error);
                    }
                    showError(message);
                })
                .finally(function () {
                    hideLoader();
                    CursorService.setCursorPosition(cursorPos);
                });
        });
        Asc.Buttons.registerContextMenu();

    }
})();
