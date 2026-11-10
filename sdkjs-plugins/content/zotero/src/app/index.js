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

/// <reference path="./types-global.js" />
/// <reference path="./zotero/types.js" />

/** @typedef {import("@onlyoffice/doceditor-plugin-types").AscTheme} AscTheme */

import { Theme } from "./theme";
import { Router } from "./router";
import { ZoteroSdk } from "./zotero";
import { SettingsPage } from "./pages/settings";
import { AdvancedPage } from "./pages/advanced";
import { LoginPage } from "./pages/login";
import { translate, CitationService, CursorService } from "./services";
import { SearchFilterComponents, SelectCitationsComponent } from "./shared/ui";
import { Button, Loader } from "./shared/components";
import { AutoUpdatePreferences } from "./auto-update-preferences";

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
    /** @type {AdvancedPage} */
    let advanced;

    /** @type {CitationService} */
    let citationService;

    /** @type {LastSearch} */
    const lastSearch = {
        text: "",
        obj: null,
        groups: [],
        groupOrder: [],
        groupsHash: "",
    };
    /**
     * Bumped by every new search. The list is cleared for it, so a library
     * answer that belongs to an earlier search must not land in the list.
     */
    let searchGeneration = 0;
    /**
     * Cancels the requests of the search on screen, so that a newer search
     * drops what the older one still has queued.
     * @type {AbortController | null}
     */
    let searchAbort = null;
    let bInProgress = false;

    /**
     * Items already cited in the document, so that the search results can put
     * them on top of the list. Collecting them walks every Zotero field of the
     * document, which is too slow to redo on every keystroke, so the scan is
     * cached for a short while and dropped whenever the plugin edits the
     * document.
     */
    const usedItems = {
        /** @type {Set<string>} */
        keys: new Set(),
        /** @type {Promise<Set<string>>|null} */
        promise: null,
        fetchedAt: 0,
        ttl: 5000,
        timeout: 1000,
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

        searchFilter = new SearchFilterComponents(function (groupId) {
            return sdk.getCollections(groupId);
        });
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
        advanced = new AdvancedPage(router, displayNoneClass);
        citationService = new CitationService(
            settings.getLocalesManager(),
            settings.getStyleManager(),
            sdk,
            settings.getAbbreviationsManager()
        );
        advanced.setCitationService(citationService);
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
                Loader.show();

                let loadGroupsPromise = loadGroups().catch((e) => {
                    console.error(e);
                    showError(translate("An error occurred while loading library groups. Try restarting the plugin."));
                });

                if (isInit) {
                    return loadGroupsPromise.finally(function () {
                        Loader.hide();
                    });
                }

                let initSettingsPromise = citationService.loadStyleFromDocument(settings.getStyleManager())
                    .catch((e) => console.error("Failed to read document prefs:", e))
                    .then(() => settings.init())
                    .catch((e) => {
                        console.error(e);
                        showError(translate("An error occurred while loading settings. Try restarting the plugin."));
                        settings.show();
                    });

                Promise.all([loadGroupsPromise, initSettingsPromise]).then(function () {
                    Loader.hide();
                    isInit = true;
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

    function invalidateUsedItems() {
        usedItems.promise = null;
        usedItems.fetchedAt = 0;
    }

    /** @returns {Promise<Set<string>>} */
    function getUsedItemKeys() {
        const now = Date.now();
        if (usedItems.promise && now - usedItems.fetchedAt < usedItems.ttl) {
            return usedItems.promise;
        }
        if (bInProgress) {
            // A document action owns the editor: reading the fields would have
            // to wait for it, and the search results must not wait for a sort
            // hint. Rescan once the action is over.
            return Promise.resolve(usedItems.keys);
        }
        usedItems.fetchedAt = now;
        usedItems.promise = new Promise(function (resolve) {
            const timer = setTimeout(function () {
                // The editor did not answer - priority sorting is optional,
                // displaying the results is not. The scan stays in the cache:
                // its late answer serves the next search, and a new scan
                // would only queue up behind it.
                resolve(usedItems.keys);
            }, usedItems.timeout);
            citationService
                .getUsedItemKeys()
                .then(function (keys) {
                    clearTimeout(timer);
                    usedItems.keys = keys;
                    resolve(keys);
                })
                .catch(function (e) {
                    clearTimeout(timer);
                    console.error(e);
                    invalidateUsedItems();
                    resolve(usedItems.keys);
                });
        });
        return usedItems.promise;
    }

    function showCitationsAtTheStartFromMyLibrary() {
        libLoader.show();
        const promise = sdk.getItems(null)
            .then(res => {
                delete res.next;
                return res;
            })
        const generation = searchGeneration;
        return loadLibrary(promise, false, generation)
            .then((res) => {
                // A search started meanwhile and owns the header now.
                if (generation !== searchGeneration) {
                    return;
                }
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
                searchFilter.clearGroups();
                searchFilter.addGroups(groups);
                return groups;
            });
    }

    function addEventListeners() {
        selectCitation.subscribe(checkSelected);

        /**
         * @param {string} text
         * @param {Array<LibraryScope>} scope
         * @param {string} groupsHash
         * @param {number} generation
         * @param {AbortSignal} [signal]
         * @returns {Promise<Array<Promise<number>>>}
         */
        function searchFor(text, scope, groupsHash, generation, signal) {
            selectCitation.clearLibrary();
            /** @type {Array<Promise<number>>} */
            const promises = [];

            return sdk
                .getUserGroups()
                .then(function (
                    /** @type {Array<UserGroupInfo>} */ userGroups
                ) {
                    if (generation !== searchGeneration) {
                        return promises;
                    }
                    /** @type {Array<string>} */
                    const groups = [];
                    scope.forEach(function (library) {
                        const groupId = library.groupId;
                        /** @type {Promise<SearchResult>} */
                        let request;
                        if (library.collections) {
                            request = sdk.searchCollections(
                                text,
                                groupId,
                                library.collections,
                                signal,
                            );
                        } else if (groupId !== null) {
                            request = sdk.getGroupItems(
                                text,
                                groupId,
                                undefined,
                                undefined,
                                signal,
                            );
                        } else {
                            request = sdk.getItems(
                                text,
                                null,
                                undefined,
                                signal,
                            );
                        }
                        if (groupId !== null) {
                            groups.push(groupId);
                        }
                        promises.push(
                            loadLibrary(request, groupId !== null, generation),
                        );
                    });
                    lastSearch.text = text;
                    lastSearch.obj = null;
                    lastSearch.groups = [];
                    lastSearch.groupOrder = groups;
                    lastSearch.groupsHash = groupsHash;
                    return promises;
                });
        }
        searchFilter.subscribe(function (text, scope) {
            text = text.trim();
            const groupsHash = JSON.stringify(scope);
            if (
                elements.mainState.classList.contains(displayNoneClass) ||
                !text ||
                (text == lastSearch.text &&
                    groupsHash === lastSearch.groupsHash) ||
                scope.length === 0
            )
                return;

            const generation = ++searchGeneration;
            if (searchAbort) {
                searchAbort.abort();
            }
            searchAbort =
                typeof AbortController === "function"
                    ? new AbortController()
                    : null;
            searchFor(
                text,
                scope,
                groupsHash,
                generation,
                searchAbort ? searchAbort.signal : undefined,
            )
                .catch(() => {
                    return [];
                })
                .then(function (promises) {
                    if (promises.length) {
                        libLoader.show();
                    }
                    return Promise.allSettled(promises);
                })
                .then(function (
                        /** @type {Array<PromiseSettledResult<number>>} */ numOfShownByLib,
                    ) {
                        // A newer search owns the list by now.
                        if (generation !== searchGeneration) {
                            return;
                        }
                        // Every library has answered.
                        libLoader.hide();
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

            // Re-reading the items from Zotero is one queued request per
            // cited item and can take a while, so it happens before the
            // document is locked; the lock then covers only the update.
            insertBibBtn.disable();
            refreshBtn.disable();
            insertLinkBtn.disable();
            const updatingText = "Zotero (" + translate("Updating citations") + ")";
            Loader.setText(updatingText);
            Loader.setProgress(0);
            Loader.show();
            try {
                await citationService.prefetchCitedItems(function (progress) {
                    Loader.setProgress(progress.completed / progress.total);
                    Loader.setText(
                        "Zotero (" +
                            translate("Updating citations") +
                            " " +
                            progress.completed +
                            "/" +
                            progress.total +
                            ")",
                    );
                });
            } catch (error) {
                // The refresh below fetches what is missing itself.
                console.error(error);
            }
            Loader.setProgress(null);
            Loader.setText(updatingText);

            await onStartAction(true, updatingText);

            let updateFn = citationService.updateCslItems.bind(
                citationService,
                false,
                { refreshItems: true }
            );
            
            const styleManager = settings.getStyleManager();
            if (styleManager.getLastUsedFormat() === "note") {
                // this way, because "SelectAddinField" does not work with notes
                updateFn = citationService.updateCslItemsInNotes.bind(
                    citationService,
                    styleManager.getLastUsedNotesStyle(),
                    { refreshItems: true }
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
                .finally(async function () {
                    await onEndAction(false, "Zotero (" + translate("Updating citations") + ")");
                    Loader.hide();
                    Loader.setText(translate("Loading..."));
                    const locale = settings.getLocalesManager().getLastUsedLanguage() || "en-US";
                    await citationService.saveStyleToDocument(styleManager, locale);
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
                .finally(async function () {
                    await onEndAction(false, "Zotero (" + translate("Inserting bibliography") + ")");
                    if (addedFieldId) {
                        await citationService.moveCursorOutsideField(addedFieldId);
                    }
                    const locale = settings.getLocalesManager().getLastUsedLanguage() || "en-US";
                    await citationService.saveStyleToDocument(settings.getStyleManager(), locale);
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
            await onStartAction(true, "Zotero (" + translate("Inserting citation") + ")");
            const items = selectCitation.getSelectedItems();
            let bHasNotes = false;

            /** @type {AddinFieldData | null} */
            let currentField = await citationService.getCurrentField();
            if (currentField) {
                return citationService.insertSelectedCitationsToCurrentField(items, currentField)
                    .then((field) => {
                        selectCitation.removeItems(Object.keys(items));
                        return showEditCitationWindow(field);
                    })
                    .then((bSuccess) => {
                        if (bSuccess && currentField) {
                            citationService.showSuccessMessage("Citation has been updated successfully");
                        }
                    })
                    .finally(async () => {
                        onEndAction(false, "Zotero (" + translate("Inserting citation") + ")");
                    });
            }

            return citationService.insertSelectedCitations(items)
                .then(function (hasNotes) {
                    bHasNotes = hasNotes;
                    selectCitation.removeItems(Object.keys(items));
                    return citationService.getCurrentField();
                })
                .then(function (field) {
                    currentField = field;
                    const updateOptions = {
                        skipCitations:
                            !AutoUpdatePreferences.shouldUpdateCitations(),
                        skipBibliography:
                            !AutoUpdatePreferences.shouldUpdateBibliography(),
                    };
                    if (bHasNotes) {
                        return citationService.updateCslItems(false, updateOptions);
                    }
                    return citationService.updateCslItems(undefined, updateOptions);
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
                    await onEndAction(false, "Zotero (" + translate("Inserting citation") + ")");
                    if (bHasNotes) {
                        citationService.moveCursorRight();
                    } else if (currentField) {
                        citationService.moveCursorOutsideField(currentField.FieldId);
                    }
                    const locale = settings.getLocalesManager().getLastUsedLanguage() || "en-US";
                    await citationService.saveStyleToDocument(settings.getStyleManager(), locale);
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
            const bAffectsRendering =
                newState.language !== oldState.language ||
                newState.style !== oldState.style ||
                newState.notesStyle !== oldState.notesStyle ||
                newState.styleFormat !== oldState.styleFormat ||
                newState.includeUrlForPaperArticles !==
                    oldState.includeUrlForPaperArticles ||
                newState.abbreviateJournalTitles !==
                    oldState.abbreviateJournalTitles;
            if (!bAffectsRendering) {
                return;
            }

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
                .finally(async function () {
                    await onEndAction(
                        false,
                        "Zotero (" + translate("Updating citations") + ")",
                    );
                    const locale = settings.getLocalesManager().getLastUsedLanguage() || "en-US";
                    await citationService.saveStyleToDocument(settings.getStyleManager(), locale);
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
            ".link:not(:focus-visible), .link:visited:not(:focus-visible), .link:hover:not(:focus-visible) { color : " +
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
        bInProgress = true;
        insertBibBtn.disable();
        refreshBtn.disable();
        insertLinkBtn.disable();

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
        bInProgress = false;
        invalidateUsedItems();
        insertBibBtn.enable();
        refreshBtn.enable();
        checkSelected();
        
        const editorVersion = window.Asc.scope.editorVersion;
        if (editorVersion && editorVersion < 9004000) {
            // @ts-ignore
            await CursorService.setCursorPosition(window._cursorPosition || 0);
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
        // Each `next` is taken before its request goes out, so another
        // scroll cannot ask for the same page while this one is loading.
        // One page from one library per scroll: the user's own library is
        // read to its end first, then the groups in the order of the filter.
        /** @type {Array<Promise<number>>} */
        const pages = [];
        const order = lastSearch.groupOrder;
        const group = lastSearch.groups
            .filter(function (group) {
                return !!group.next;
            })
            .sort(function (a, b) {
                return order.indexOf(String(a.id)) - order.indexOf(String(b.id));
            })[0];
        if (lastSearch.obj && lastSearch.obj.next) {
            const next = lastSearch.obj.next;
            delete lastSearch.obj.next;
            pages.push(loadLibrary(next(), false, searchGeneration));
        } else if (group && group.next) {
            const next = group.next;
            delete group.next;
            pages.push(loadLibrary(next(), true, searchGeneration));
        }

        if (pages.length) {
            const generation = searchGeneration;
            libLoader.show();
            Promise.allSettled(pages).then(function () {
                // A newer search shows the loader for its own requests.
                if (generation === searchGeneration) {
                    libLoader.hide();
                }
            });
        }
    }

    /**
     * @param {HTMLElement} holder
     * @returns {boolean}
     */
    function shouldLoadMore(holder) {
        if (router.getRoute() != "main") return false;
        // A pixel of slack: native scrolling can stop a fraction short of
        // the end at some zoom levels.
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight - 1) {
            return false;
        }

        const hasMore =
            !!(lastSearch.obj && lastSearch.obj.next) ||
            lastSearch.groups.some(function (group) {
                return !!group.next;
            });
        if (!hasMore) return false;
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
     * @param {number} generation the search the request was made for
     * @returns {Promise<number>}
     */
    function loadLibrary(promise, isGroup, generation) {
        return promise
            .then(function (res) {
                return displaySearchItems(res, null, isGroup, generation);
            })
            .catch(function (err) {
                // A replaced search's failures, its cancelled requests
                // among them, are nobody's concern any more.
                if (generation !== searchGeneration) {
                    return 0;
                }
                console.error(err);
                if (err.message) {
                    showError(translate(err.message));
                }
                return displaySearchItems(null, err, isGroup, generation);
            })
            .then(function (numOfShown) {
                return numOfShown;
            });
    }

    /**
     * @param {SearchResult | null} res
     * @param {Error | null} err
     * @param {boolean} isGroup
     * @param {number} generation the search the results belong to
     * @returns {Promise<number>}
     */
    function displaySearchItems(res, err, isGroup, generation) {
        // The list was cleared for a newer search while this one was loading.
        if (generation !== searchGeneration) {
            return Promise.resolve(0);
        }
        let first = false;
        if (!lastSearch.obj && res && res.items && !res.items.length)
            first = true;
        if (err) {
            if (first) {
                lastSearch.obj = null;
                lastSearch.groups = [];
            }
            if (!isGroup && lastSearch && lastSearch.obj) {
                delete lastSearch.obj.next;
            }
        } else if (isGroup && res) {
            // One entry per group, holding the page to continue from.
            const index = lastSearch.groups.findIndex(function (group) {
                return group.id === res.id;
            });
            if (!res.next) {
                if (index !== -1) lastSearch.groups.splice(index, 1);
            } else if (index === -1) {
                lastSearch.groups.push(res);
            } else {
                lastSearch.groups[index] = res;
            }
        } else if (!isGroup) {
            lastSearch.obj = res && res.items.length ? res : null;
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
                item[isGroup ? "groupID" : "userID"] = res.id;
                fillUrisFromId(item);
                return item;
            });
        }

        return getUsedItemKeys().then(function (usedItemKeys) {
            // The document scan takes time too: check again.
            if (generation !== searchGeneration) {
                return 0;
            }
            selectCitation.setUsedItemKeys(usedItemKeys);
            return selectCitation.displaySearchItems(res, err, lastSearch);
        });
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
            insertLinkBtn.setText(translate("Insert/Edit Citation"));
        } else {
            !bInProgress && insertLinkBtn.enable();
            if (numOfSelected > 1) {
                // TODO: add translate
                insertLinkBtn.setText(
                    translate("Insert " + numOfSelected + " Citations"),
                );
            } else {
                insertLinkBtn.setText(translate("Insert/Edit Citation"));
            }
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
            /** @type {AddinFieldData | null} */
            const field = await new Promise((resolve) => {
                window.Asc.plugin.executeMethod(
                    "GetCurrentAddinField",
                    undefined,
                    resolve,
                );
            });
            await onStartAction(false, "Zotero (" + translate("Updating citations") + ")");
            await showEditCitationWindow(field);
            await onEndAction(false, "Zotero (" + translate("Updating citations") + ")");
        });
        Asc.Buttons.registerContextMenu();

    }

    /**
     * @param {AddinFieldData | null} field
     * @returns {Promise<boolean>}
     */
    async function showEditCitationWindow(field) {
        if (
            !field ||
            !field.Value ||
            field.Value.toLowerCase().indexOf("zotero_item") === -1
        ) {
            citationService.showWarningMessage("No Zotero citation found at the cursor. Please click directly on a citation to edit it.");
            return false;
        }
        const idsBeforeEdit = citationService.getCitationItemIds(field);
        const updatedField = await citationService.showEditCitationWindow(field);
        if (!updatedField) {
            return false;
        }
        const idsAfterEdit = (updatedField.citationItems || []).map(
            (/** @type {{id: string|number}} */ item) => String(item.id)
        );
        const bItemsChanged =
            idsBeforeEdit.join("\u0000") !==
            idsAfterEdit.join("\u0000");

        let updateFn = citationService.updateItem.bind(
            citationService,
            updatedField
        );

        const styleManager = settings.getStyleManager();
        const bIsNotesFormat = styleManager.getLastUsedFormat() === "note";
        if (bIsNotesFormat) {
            // this way, because "SelectAddinField" does not work with notes
            updateFn = citationService.updateItem.bind(
                citationService,
                updatedField,
                styleManager.getLastUsedNotesStyle()
            );
        }

        return updateFn()
            .then(() => {
                if (!bItemsChanged) {
                    return;
                }
                const updateOptions = {
                    skipCitations:
                        !AutoUpdatePreferences.shouldUpdateCitations(),
                    skipBibliography:
                        !AutoUpdatePreferences.shouldUpdateBibliography(),
                };
                return citationService.updateCslItems(
                    bIsNotesFormat ? false : undefined,
                    updateOptions
                );
            })
            .then(() => {
                if (field) {
                    citationService.moveCursorOutsideField(field.FieldId);
                }
                return true;
            })
            .catch(function (error) {
                console.error(error);
                let message = translate("Failed to insert citation");
                if (typeof error === "string") {
                    message += ". " + translate(error);
                }
                showError(message);
                return false;
            });
    }
})();
