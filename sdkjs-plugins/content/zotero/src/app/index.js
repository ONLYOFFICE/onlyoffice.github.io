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
    let cancelEditBtn;

    /** Edit mode state */
    let editMode = false;
    /** @type {AddinFieldData | null} */
    let editField = null;
    /** @type {Object | null} */
    let editCitationObject = null;

    /** @type {Button} */
    let saveAsTextBtn;
    /** @type {Button} */
    let insertLinkBtn;
    /** @type {Button} */
    let openSettingsBtn;
    /** @type {Button} */
    let editCitationBtn;
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
        editCitationBtn = new Button("editCitationBtn", {
            variant: "secondary",
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
        cancelEditBtn = new Button("cancelEditBtn", {
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
                let initSettingsPromise = loadStyleFromDocument(settings.getStyleManager())
                    .catch((e) => console.error("Failed to read document prefs:", e))
                    .then(() => settings.init())
                    .catch((e) => {
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
            window.Asc.scope.editorVersion = editorVersion; // 9003000
            addContextMenuButtons();
        }).catch((e) => {
            console.error(e);
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

        editCitationBtn.subscribe(async function (event) {
            if (event.type !== "button:click") {
                return;
            }
            await enterEditMode();
        });

        cancelEditBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            exitEditMode();
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
            await onStartAction(true, "Zotero (" + translate("Updating citations") + ")");

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
                    onEndAction(false, "Zotero (" + translate("Updating citations") + ")");
                });
        });

        insertBibBtn.subscribe(async (event) => {
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
            await onStartAction(false, "Zotero (" + translate("Inserting bibliography") + ")");
            /** @type {string} */
            let addedFieldId = "";

            citationService
                .insertBibliography()
                .then(function (fieldId) {
                    addedFieldId = fieldId;
                })
                .catch(function (error) {
                    console.error(error);
                    citationService.showWarningMessage("Failed to insert bibliography");

                    if (typeof error === "string") {
                        let message = translate(error);
                        showError(message);
                    }
                })
                .finally(function () {
                    onEndAction(false, "Zotero (" + translate("Inserting bibliography") + ")");
                    if (addedFieldId) {
                        citationService.moveCursorOutsideField(addedFieldId);
                    }
                });
        });

        insertLinkBtn.subscribe(async (event) => {
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

            if (editMode) {
                // Edit mode: build updated citation object and call updateItem
                const orderedItems = selectCitation.getSelectedItemsOrdered();
                if (orderedItems.length === 0) {
                    showError(translate("No citations selected"));
                    return;
                }

                // Rebuild citationItems from selected items
                const newCitationItems = orderedItems.map(function (item) {
                    // Look for original citationItem by id
                    const origItem = editCitationObject.citationItems.find(function (ci) {
                        return ci.id === item.id || (ci.itemData && ci.itemData.id === item.id);
                    });
                    if (origItem) {
                        // Update params from the UI-modified item
                        origItem.prefix = item.prefix || "";
                        origItem.suffix = item.suffix || "";
                        origItem.locator = item.locator || "";
                        origItem.label = item.label || "page";
                        origItem["suppress-author"] = !!item["suppress-author"];
                        return origItem;
                    } else {
                        // New item from search — build citationItem structure
                        const newItem = {
                            id: item.id,
                            itemData: Object.assign({}, item),
                            uris: item.uris || [],
                        };
                        // Remove UI-only properties from itemData copy
                        delete newItem.itemData.prefix;
                        delete newItem.itemData.suffix;
                        delete newItem.itemData.locator;
                        delete newItem.itemData.label;
                        delete newItem.itemData["suppress-author"];
                        delete newItem.itemData.uris;

                        newItem.prefix = item.prefix || "";
                        newItem.suffix = item.suffix || "";
                        newItem.locator = item.locator || "";
                        newItem.label = item.label || "page";
                        newItem["suppress-author"] = !!item["suppress-author"];
                        return newItem;
                    }
                });

                const updatedCitationObject = JSON.parse(JSON.stringify(editCitationObject));
                updatedCitationObject.citationItems = newCitationItems;

                const field = editField;
                exitEditMode();

                await onStartAction(false, "Zotero (" + translate("Updating citations") + ")");

                let updateFn = citationService.updateItem.bind(
                    citationService,
                    updatedCitationObject
                );

                const styleManager = settings.getStyleManager();
                if (styleManager.getLastUsedFormat() === "note") {
                    updateFn = citationService.updateItem.bind(
                        citationService,
                        updatedCitationObject,
                        styleManager.getLastUsedNotesStyle()
                    );
                }

                updateFn()
                    .catch(function (error) {
                        console.error(error);
                        let message = translate("Failed to update citation");
                        if (typeof error === "string") {
                            message += ". " + translate(error);
                        }
                        showError(message);
                    })
                    .finally(function () {
                        onEndAction(false, "Zotero (" + translate("Updating citations") + ")");
                        if (field) {
                            citationService.moveCursorOutsideField(field.FieldId);
                        }
                    });
                return;
            }

            await onStartAction(true, "Zotero (" + translate("Inserting citation") + ")");
            const items = selectCitation.getSelectedItems();
            /** @type {AddinFieldData | null} */
            let addedField = null;
            let bHasNotes = false;

            return citationService.insertSelectedCitations(items)
                .then(function (hasNotes) {
                    bHasNotes = hasNotes;
                    selectCitation.removeItems(Object.keys(items));
                    return citationService.getCurrentField();
                })
                .then(function (field) {
                    addedField = field;
                    if (bHasNotes) {
                        return citationService.updateCslItems(false);
                    }
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
                .finally(async () => {
                    onEndAction(false, "Zotero (" + translate("Inserting citation") + ")");
                    if (bHasNotes) {
                        await citationService.moveCursorRight();
                    } else if (addedField) {
                        await citationService.moveCursorOutsideField(addedField.FieldId);
                    }
                });
        });

        openSettingsBtn.subscribe(function (event) {
            if (event.type !== "button:click") {
                return;
            }
            settings.show();
        });

        saveAsTextBtn.subscribe(async (event) => {
            if (event.type !== "button:click") {
                return;
            }
            await onStartAction(false, "Zotero (" + translate("Saving as text") + ")");
            citationService.saveAsText().then(function () {
                onEndAction(false, "Zotero (" + translate("Saving as text") + ")");
            });
        });

        settings.onChangeState(async function (newState, oldState) {
            await onStartAction(
                true,
                "Zotero (" + translate("Updating citations") + ")",
            );

            let updateFn = citationService.updateCslItems.bind(
                citationService,
                true,
            );

            if ([newState.styleFormat, oldState.styleFormat].includes("note")) {
                if (newState.styleFormat !== oldState.styleFormat) {
                    if (newState.styleFormat === "note") {
                        updateFn =
                            citationService.switchingBetweenNotesAndText.bind(
                                citationService,
                                newState.notesStyle,
                            );
                    } else {
                        updateFn =
                            citationService.switchingBetweenNotesAndText.bind(
                                citationService,
                            );
                    }
                } else if (newState.notesStyle !== oldState.notesStyle) {
                    updateFn = citationService.convertNotesStyle.bind(
                        citationService,
                        newState.notesStyle,
                    );
                } else {
                    updateFn = citationService.updateCslItems.bind(
                        citationService,
                        true,
                    );
                }
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
                    onEndAction(
                        false,
                        "Zotero (" + translate("Updating citations") + ")",
                    );
                });
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
            elements.error.classList.remove(displayNoneClass);
            elements.error.textContent = message;
            setTimeout(function () {
                window.onclick = function () {
                    showError(false);
                };
            }, 100);
        } else {
            elements.error.classList.add(displayNoneClass);
            elements.error.textContent = "";
            window.onclick = null;
        }
    }

    /**
     * @param {boolean} keepSelection
     * @param {string} [preloaderMessage]
     */
    async function onStartAction(keepSelection, preloaderMessage) {
        insertBibBtn.disable();
        refreshBtn.disable();
        insertLinkBtn.disable();
        editCitationBtn.disable();

        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
            // @ts-ignore
            window._cursorPosition = await CursorService.getCursorPosition();
        } else {
            await new Promise(resolve => {
                Asc.plugin.executeMethod("StartAction", ["GroupActions", { "lockScroll" : true, "keepSelection" : keepSelection }], resolve);
            });
        }
        /*if (preloaderMessage) {
            await new Promise(resolve => {
                Asc.plugin.executeMethod("StartAction", ["Info", preloaderMessage], function(returnValue){
                    resolve(returnValue);
                });
            });
        }*/
    }

    /**
     * @param {boolean} scrollToTarget
     * @param {string} [preloaderMessage]
     */
    async function onEndAction(scrollToTarget, preloaderMessage) {
        insertBibBtn.enable();
        refreshBtn.enable();
        editCitationBtn.enable();
        checkSelected();
        
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
            // @ts-ignore
            CursorService.setCursorPosition(window._cursorPosition || 0);
        } else {
            await new Promise(resolve => {
                Asc.plugin.executeMethod("EndAction", ["GroupActions", { "scrollToTarget" : scrollToTarget }], resolve);
            });
        }
        /*if (preloaderMessage) {
            await new Promise(resolve => {
                Asc.plugin.executeMethod("EndAction", ["Info", preloaderMessage], function(returnValue){
                    resolve(returnValue);
                });
            });
        }*/
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

    /** @type {Object<string, string>} */
    const zoteroTypeToCsl = {
        "artwork": "graphic",
        "audioRecording": "song",
        "bill": "bill",
        "blogPost": "post-weblog",
        "book": "book",
        "bookSection": "chapter",
        "case": "legal_case",
        "computerProgram": "software",
        "conferencePaper": "paper-conference",
        "dictionaryEntry": "entry-dictionary",
        "document": "document",
        "email": "personal_communication",
        "encyclopediaEntry": "entry-encyclopedia",
        "film": "motion_picture",
        "forumPost": "post",
        "hearing": "hearing",
        "instantMessage": "personal_communication",
        "interview": "interview",
        "journalArticle": "article-journal",
        "letter": "personal_communication",
        "magazineArticle": "article-magazine",
        "manuscript": "manuscript",
        "map": "map",
        "newspaperArticle": "article-newspaper",
        "patent": "patent",
        "podcast": "song",
        "presentation": "speech",
        "radioBroadcast": "broadcast",
        "report": "report",
        "statute": "legislation",
        "thesis": "thesis",
        "tvBroadcast": "broadcast",
        "videoRecording": "motion_picture",
        "webpage": "webpage",
    };

    /**
     * @param {any} item 
     * @returns {SearchResultItem}
     */
    function convertJsonToCsl(item) {
        if (item.id || !item.key) return item;
        var d = item.data || {};
        /** @type {SearchResultItem} */
        const res = {
            id: item.key,
            title: d.title || "",
            type: zoteroTypeToCsl[d.itemType] || d.itemType || "",
        };

        // creators → author / editor / translator
        if (Array.isArray(d.creators)) {
            d.creators.forEach(function (/** @type {any} */ c) {
                var name = {};
                if (c.firstName) name.given = c.firstName;
                if (c.lastName) name.family = c.lastName;
                if (c.name) name.literal = c.name;
                var cslRole = c.creatorType || "author";
                if (!res[cslRole]) res[cslRole] = [];
                res[cslRole].push(name);
            });
        }

        // date → issued
        if (d.date) {
            var parts = d.date.replace(/\//g, "-").split("-").map(Number).filter(function (n) { return !isNaN(n); });
            if (parts.length) res.issued = { "date-parts": [parts] };
        }

        // simple 1-to-1 fields (Zotero name → CSL name)
        if (d.url) res.URL = d.url;
        if (d.volume) res.volume = d.volume;
        if (d.issue) res.issue = d.issue;
        if (d.pages) res.page = d.pages;
        if (d.edition) res.edition = d.edition;
        if (d.language) res.language = d.language;
        if (d.abstractNote) res.abstract = d.abstractNote;
        if (d.note) res.note = d.note;
        if (d.shortTitle) res.shortTitle = d.shortTitle;
        if (d.publisher) res.publisher = d.publisher;
        if (d.place) res["publisher-place"] = d.place;
        if (d.DOI) res.DOI = d.DOI;
        if (d.ISBN) res.ISBN = d.ISBN;
        if (d.ISSN) res.ISSN = d.ISSN;
        if (d.publicationTitle) res["container-title"] = d.publicationTitle;
        if (d.bookTitle) res["container-title"] = d.bookTitle;
        if (d.series) res["collection-title"] = d.series;
        if (d.seriesNumber) res["collection-number"] = d.seriesNumber;
        if (d.numberOfVolumes) res["number-of-volumes"] = d.numberOfVolumes;
        if (d.numPages) res["number-of-pages"] = d.numPages;

        // uris from links
        if (item.links) {
            res.uris = [];
            if (item.links.self) res.uris.push(item.links.self.href);
            if (item.links.alternate) res.uris.push(item.links.alternate.href);
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
        if (editMode) {
            if (numOfSelected <= 0) {
                insertLinkBtn.disable();
                insertLinkBtn.setText(translate("Update Citation"));
            } else {
                insertLinkBtn.enable();
                insertLinkBtn.setText(translate("Update Citation"));
            }
            return;
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

    async function enterEditMode() {
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
            citationService.showWarningMessage(translate("No Zotero citation found at the cursor. Please click directly on a citation to edit it."));
            return;
        }

        const citationStartIndex = field.Value.indexOf("{");
        const citationEndIndex = field.Value.lastIndexOf("}");
        if (citationStartIndex === -1) {
            citationService.showWarningMessage(translate("Could not parse the citation data."));
            return;
        }
        const citationObject = JSON.parse(
            field.Value.slice(citationStartIndex, citationEndIndex + 1)
        );

        // Clear current state
        selectCitation.removeItems(Object.keys(selectCitation.getSelectedItems()));
        selectCitation.clearLibrary();

        // Enable edit mode
        editMode = true;
        editField = field;
        editCitationObject = citationObject;
        selectCitation.setEditMode(true);

        // Pre-populate selected items from citation
        if (citationObject.citationItems) {
            citationObject.citationItems.forEach(function (ci) {
                // Convert citationItem to SearchResultItem format
                const item = Object.assign({}, ci.itemData || {});
                if (!item.id && ci.id) item.id = ci.id;
                if (ci.uris) item.uris = ci.uris;
                if (ci.prefix) item.prefix = ci.prefix;
                if (ci.suffix) item.suffix = ci.suffix;
                if (ci.locator) item.locator = ci.locator;
                if (ci.label) item.label = ci.label;
                if (ci["suppress-author"]) item["suppress-author"] = ci["suppress-author"];
                selectCitation.addPreselectedItem(item);
            });
        }

        // Update UI
        cancelEditBtn._container.classList.remove("hidden");
        editCitationBtn._container.classList.add("hidden");
        insertBibBtn._container.classList.add("hidden");
        refreshBtn._container.classList.add("hidden");
        insertLinkBtn.setText(translate("Update Citation"));
        insertLinkBtn.enable();
        checkSelected();
    }

    function exitEditMode() {
        editMode = false;
        editField = null;
        editCitationObject = null;

        selectCitation.setEditMode(false);
        selectCitation.removeItems(Object.keys(selectCitation.getSelectedItems()));
        selectCitation.clearLibrary();

        cancelEditBtn._container.classList.add("hidden");
        editCitationBtn._container.classList.remove("hidden");
        insertBibBtn._container.classList.remove("hidden");
        refreshBtn._container.classList.remove("hidden");
        insertLinkBtn.setText(translate("Insert Citation"));
        insertLinkBtn.disable();
        checkSelected();

        // Reload initial library
        showCitationsAtTheStartFromMyLibrary();
    }

    /**
     * @returns {Promise<number>}
     */
    /**
     * Reads ZOTERO_PREF from document custom properties and sets localStorage
     * if no style is currently saved. This preserves the citation style when
     * opening a DOCX created by the Word Zotero plugin.
     * @param {import('../csl/styles').CslStylesManager} styleManager
     * @returns {Promise<void>}
     */
    async function loadStyleFromDocument(styleManager) {
        if (styleManager.getLastUsedStyleId()) return;

        const prefXml = await new Promise((resolve) => {
            Asc.plugin.callCommand(
                () => {
                    const doc = Api.GetDocument();
                    const props = doc.GetCustomProperties();
                    if (!props) return "";
                    let xml = "";
                    let i = 1;
                    while (true) {
                        const val = props.Get("ZOTERO_PREF_" + i);
                        if (val === null || val === undefined) break;
                        xml += String(val);
                        i++;
                    }
                    return xml;
                },
                false,
                true,
                (result) => resolve(result || ""),
            );
        });

        if (!prefXml) return;

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(prefXml, "text/xml");
            const styleEl = xmlDoc.querySelector("style");
            if (styleEl) {
                const styleUrl = styleEl.getAttribute("id") || "";
                const locale = styleEl.getAttribute("locale") || "";
                if (styleUrl) {
                    const styleId = styleUrl.replace(/^.*\/styles\//, "");
                    if (styleId) {
                        localStorage.setItem("zoteroStyleId", styleId);
                    }
                }
                if (locale) {
                    localStorage.setItem("zoteroLocale", locale);
                }
            }
            const noteTypePref = xmlDoc.querySelector('pref[name="noteType"]');
            if (noteTypePref) {
                const noteType = noteTypePref.getAttribute("value");
                if (noteType === "1") {
                    localStorage.setItem("zoteroNotesStyleId", "footnotes");
                } else if (noteType === "2") {
                    localStorage.setItem("zoteroNotesStyleId", "endnotes");
                }
            }
        } catch (e) {
            console.error("Failed to parse ZOTERO_PREF XML:", e);
        }
    }

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
            router.openMain();
            await enterEditMode();
        });
        Asc.Buttons.registerContextMenu();

    }
})();
