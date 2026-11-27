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

/// <reference path="../../../zotero/src/shared/types-global.js" />
/// <reference path="./sdk/types.js" />
/// <reference path="../../vendor/mendeley-sdk/standalone.min.js" />

/** @typedef {import("@onlyoffice/doceditor-plugin-types").AscTheme} AscTheme */

import { Theme } from "@shared/theme";
import { Router } from "@shared/router";
import { Sdk } from "./sdk";
import { SettingsPage } from "@shared/pages/settings";
import { LoginPage } from "./pages/login";
import { translate, CursorService } from "./services";
import { CitationService } from "@shared/services/citation-service";
import { AdditionalWindow } from "@shared/pages/additional-window";
import { ContentControlCitationDocument } from "./document/content-control-citation-document";
import { MendeleyDesktopFields } from "./document/mendeley-desktop-fields";
import { SelectCitationsComponent } from "@shared/ui/select-citation";
import { CitedItemKeys } from "@shared/item-keys";
import { SearchFilterComponents } from "./ui";
import { Button, Loader } from "@shared/components";
import { EditCitationMenuItem } from "@shared/ui/edit-citation-menu-item";

import "@shared/components.css";
import "../styles.css";

/**
 * Signing in from Desktop Editors with an authorization code works but is not
 * released yet: until then the plugin tells desktop users it is web-only.
 * The sign-in code stays in LoginPage; turn this on to ship it.
 */
const DESKTOP_SIGN_IN_ENABLED = false;

(function () {
    const displayNoneClass = "hidden";
    const isLocal = (function () {
        if (
            window.navigator &&
            window.navigator.userAgent
                .toLowerCase()
                .indexOf("ascdesktopeditor") < 0
        )
            return false;
        if (window.location && window.location.protocol == "file:") return true;
        const src = window.document.currentScript
            ? window.document.currentScript.getAttribute("src")
            : "";
        if (src && 0 == src.indexOf("file:///")) return true;
        return false;
    })();

    /** @type {Router} */
    let router;
    /** @type {Sdk} */
    let sdk;

    /** @type {SettingsPage} */
    let settings;
    /** @type {LoginPage} */
    let loginPage;

    /** @type {CitationService} */
    let citationService;
    /** @type {ContentControlCitationDocument} */
    let citationDocument;

    /** @type {LastSearch} */
    const lastSearch = {
        text: "",
        obj: null,
        groups: [],
        groupsHash: "",
        groupOrder: [],
    };
    let bInProgress = false;
    /**
     * Signed in, with the settings and the library loaded: until then
     * there is no style to format an edited citation with.
     * @type {boolean}
     */
    let canEditCitations = false;
    /**
     * Counts the searches: results that come for an earlier one, after the
     * list was cleared for a newer one, are not shown.
     */
    let searchGeneration = 0;
    /**
     * Items already cited in the document, so that the search results can put
     * them on top of the list.
     * @type {CitedItemKeys}
     */
    let citedItems;

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
            variant: "secondary"
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
        if (isLocal && !DESKTOP_SIGN_IN_ENABLED) {
            const message = "This plugin doesn't work into Desktop Editors.";
            const content = document.getElementById("content");
            if (!content) {
                console.error(message);
                return;
            }
            content.innerHTML =
                "<p id='message' style='text-align:center; font-size:14pt;' class='i18n'>" +
                message +
                "</p>";
            window.Asc.plugin.onTranslate = applyTranslations;
            return;
        }
        Loader.show();
        initElements();

        router = new Router();
        loginPage = new LoginPage(router, isLocal);

        sdk = new Sdk({
            authFlow: loginPage.getAuthFlow()
        });
        settings = new SettingsPage(router, displayNoneClass, {
            styleKey: "mendStyleId",
            styleCopyKey: "mendLastStyleCopy",
        });
        // Mendeley works online only.
        settings.setRestApiAvailable(true);
        citationDocument = new ContentControlCitationDocument();
        citedItems = new CitedItemKeys(citationDocument);
        citationService = new CitationService({
            name: "Mendeley",
            document: citationDocument,
            localesManager: settings.getLocalesManager(),
            cslStylesManager: settings.getStyleManager(),
            abbreviationsManager: settings.getAbbreviationsManager(),
        });
        let isInit = false;

        addEventListeners();
        // The editor fills its context menu only when every plugin that
        // listens to it has answered, so the plugin answers from the start.
        addContextMenuButtons();

        loginPage
            .init()
            .onOpen(function () {
                Loader.hide();
            })
            .onAuthorized(function () {
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

                Promise.all([
                    loadGroupsPromise,
                    initSettingsPromise,
                    upgradeMendeleyDesktopFields(),
                    showCitationsAtTheStartFromMyLibrary()
                ]).then(function ([g, s, isUpdateOldVersion, c]) {
                    if (isUpdateOldVersion) {
                        settings.show();
                    }
                }).catch(function (error) {
                    console.error(error.message);
                }).finally(function () {
                    canEditCitations = true;
                    Loader.hide();
                });
            });

        window.Asc.plugin.onTranslate = applyTranslations;
        
        getEditorVersion().then((editorVersion) => {
            window.Asc.scope.editorVersion = editorVersion; // 9003000
        });
    };
    
    /** @param {string} error */
    // @ts-ignore
    window.OAuthError = function (error) {
        loginPage.onAuthCallback(error);
    };

    /**
     * @param {string} token
     * @param {string} state
     */
    // @ts-ignore
    window.OAuthCallback = function (token, state) {
        loginPage.onAuthCallback(token, state);
    };

    function showCitationsAtTheStartFromMyLibrary() {
        libLoader.show();
        const promise = sdk.getItems(null)
            .then(res => {
                delete res.next;
                return res;
            })
        const generation = searchGeneration;
        return loadLibrary(promise, false)
            .then((res) => {
                // A search started meanwhile owns the list and its header.
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
                searchFilter.addGroups(groups);
                return groups;
            });
    }

    function addEventListeners() {
        selectCitation.subscribe(checkSelected);

        /**
         * @param {string} text
         * @param {Array<string|"all_collections">} selectedGroups
         * @param {string} groupsHash
         * @returns {Promise<Array<Promise<number>>>}
         */
        function searchFor(text, selectedGroups, groupsHash) {
            selectCitation.clearLibrary();
            searchGeneration++;
            /** @type {Array<Promise<number>>} */
            const promises = [];
            return new Promise(resolve => {
            //return sdk
            //    .getUserGroups()
            //    .then(function (
            //        /** @type {Array<UserGroupInfo>} */ userGroups
            //    ) {
                /** @type {Array<string|number>} */
                /*let groups = selectedGroups.filter(function (group) {
                    return (
                        group !== "all_collections"
                    );
                });*/

                promises.push(
                    loadLibrary(sdk.getItems(text), false),
                );

                /*for (let i = 0; i < groups.length; i++) {
                    promises.push(
                        loadLibrary(
                            sdk.getGroupItems(text, groups[i]),
                            true
                        )
                    );
                }*/
                lastSearch.text = text;
                lastSearch.obj = null;
                lastSearch.groups = [];
                lastSearch.groupsHash = groupsHash;
                resolve(promises);
            });
        }
        searchFilter.subscribe(function (text, selectedGroups) {
            text = text.trim();
            const groupsHash = selectedGroups.join(",");
            if (
                elements.mainState.classList.contains(displayNoneClass) ||
                !text ||
                (text == lastSearch.text &&
                    groupsHash === lastSearch.groupsHash) /*||
                selectedGroups.length === 0*/
            )
                return;

            // The error of the last search is not this one's.
            showError(false);
            const search = searchFor(text, selectedGroups, groupsHash);
            // searchFor has started a new search by now.
            const generation = searchGeneration;
            search
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
                        // A newer search owns the list by now.
                        if (generation !== searchGeneration) {
                            return;
                        }
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

            await onStartAction(true, "Mendeley (" + translate("Updating citations") + ")");
            let updateFn = citationService.updateCslItems.bind(
                citationService,
                false
            );

            const styleManager = settings.getStyleManager();
            if (styleManager.getLastUsedFormat() === "note") {
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
                    onEndAction(false, "Mendeley (" + translate("Updating citations") + ")");
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
            await onStartAction(true, "Mendeley (" + translate("Inserting bibliography") + ")");
            citationService
                .insertBibliography()
                .catch(function (error) {
                    console.error(error);
                    citationService.showWarningMessage("Failed to insert bibliography");

                    if (typeof error === "string") {
                        let message = translate(error);
                        showError(message);
                    }
                })
                .finally(function () {
                    onEndAction(false, "Mendeley (" + translate("Inserting bibliography") + ")");
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
            await onStartAction(true, "Mendeley (" + translate("Inserting citation") + ")");
            const items = selectCitation.getSelectedItems();
            let internalId = "";

            const current = await citationService.getCurrent();
            if (current && current.kind === "bibliography") {
                // Nothing is inserted, so the chosen sources stay selected.
                citationService.showWarningMessage("Citations cannot be inserted into the bibliography. Place the cursor outside it.");
                await onEndAction(false, "Mendeley (" + translate("Inserting citation") + ")");
                return;
            }
            if (current && current.kind === "citation" && !current.data) {
                // Nothing is added, so the chosen sources stay selected.
                citationService.showWarningMessage("A citation in this document is corrupted and cannot be processed. Please remove or replace it.");
                await onEndAction(false, "Mendeley (" + translate("Inserting citation") + ")");
                return;
            }
            // Another content control, not Mendeley's, takes no citation.
            const bInOtherControl =
                !current && !!(await citationDocument.controls.getCurrentContentControlPr());
            if (current || bInOtherControl) {
                const citation = current && current.kind === "citation" ? current : null;
                // Taken before the sources are added to the citation.
                const idsInDocument = citationService.getCitationItemIds(citation ? citation.data : null);
                return Promise.resolve()
                    .then(() => {
                        if (!citation) {
                            throw new Error("Invalid control tag");
                        }
                        return citationService.insertSelectedCitationsToCurrent(items, citation);
                    })
                    .then((data) => {
                        selectCitation.removeItems(Object.keys(items));
                        return showEditCitationWindow(citation, data, idsInDocument);
                    })
                    .then((bSuccess) => {
                        if (bSuccess) {
                            citationService.showSuccessMessage("Citation has been updated successfully");
                        }
                    }).catch(function (error) {
                        console.error(error);
                        citationService.showWarningMessage("Failed to edit citation");
                        let message = translate("Failed to edit citation");
                        if (typeof error === "string") {
                            message += ". " + translate(error);
                        }
                        showError(message);
                    })
                    .finally(async () => {
                        onEndAction(false, "Mendeley (" + translate("Inserting citation") + ")");
                    });
            }

            return citationService.insertSelectedCitations(items)
                .then(async function (result) {
                    internalId = result.id || "";
                    selectCitation.removeItems(Object.keys(items));
                    if (result.hasNotes) {
                        await citationService.updateCslItemsInNotes(
                            settings.getStyleManager().getLastUsedNotesStyle(),
                        );
                    } else {
                        await citationService.updateCslItems();
                    }
                })
                .then(async () => {
                    if (internalId) {
                        await citationService.moveCursorOutside(internalId);
                    }
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
                    await onEndAction(true, "Mendeley (" + translate("Inserting citation") + ")");
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
            await onStartAction(false, "Mendeley (" + translate("Saving as text") + ")");
            citationService.saveAsText().then(function () {
                onEndAction(false, "Mendeley (" + translate("Saving as text") + ")");
            });
        });

        settings.onChangeState(async function (newState, oldState) {
            // Citations edited by hand keep their text; asked here, the new
            // settings reach them too.
            const manualEdits = await citationService.countManualEdits();
            const options = {
                discardManualEdits:
                    manualEdits > 0 &&
                    (await citationService.confirmDiscardManualEdits(manualEdits)),
            };

            await onStartAction(
                true,
                "Mendeley (" + translate("Updating citations") + ")",
            );
            
            let updateFn = citationService.updateCslItems.bind(citationService, true, options);

            if ([newState.styleFormat, oldState.styleFormat].includes("note")) {
                if (newState.styleFormat !== oldState.styleFormat) {
                    if (newState.styleFormat === "note") {
                        updateFn = citationService.switchingBetweenNotesAndText.bind(
                            citationService,
                            newState.notesStyle,
                            null,
                            options
                        );
                    } else {
                        updateFn = citationService.switchingBetweenNotesAndText.bind(
                            citationService,
                            null,
                            oldState.notesStyle,
                            options
                        );
                    }
                } else if (newState.notesStyle !== oldState.notesStyle) {
                    updateFn = citationService.convertNotesStyle.bind(
                        citationService,
                        newState.notesStyle,
                        oldState.notesStyle,
                        options,
                    );
                } else {
                    updateFn = citationService.updateCslItemsInNotes.bind(
                        citationService,
                        newState.notesStyle,
                        options
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
                        "Mendeley (" + translate("Updating citations") + ")",
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
        citedItems.invalidate();
        insertBibBtn.enable();
        refreshBtn.enable();
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
        const generation = searchGeneration;
        return promise
            .then(function (res) {
                return displaySearchItems(res, null, isGroup, generation);
            })
            .catch(function (err) {
                console.error(err);
                // A replaced search's failure is nobody's concern any more.
                if (generation !== searchGeneration) {
                    return 0;
                }
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
     * @param {number} generation - the search it is the result of
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
            for (let index = 0; index < res.items.length; index++) {
                let item = res.items[index];
                item[isGroup ? "groupID" : "userID"] = res.id;
                fillUrisFromId(item);
            }
        }

        return getUsedItemKeys().then(function (usedItemKeys) {
            // The document is read meanwhile: check again.
            if (generation !== searchGeneration) {
                return 0;
            }
            selectCitation.setUsedItemKeys(usedItemKeys);
            return selectCitation.displaySearchItems(res, err, lastSearch);
        });
    }

    /** @returns {Promise<Set<string>>} */
    function getUsedItemKeys() {
        if (bInProgress) {
            // A document action owns the editor: reading the controls would
            // have to wait for it, and the search results must not wait for a
            // sort hint. Read them once the action is over.
            return Promise.resolve(citedItems.known);
        }
        return citedItems.read();
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

    /**
     * Offers to rewrite the citations of the old Mendeley Desktop plugin as
     * Mendeley Cite's; the plugin closes if the user declines.
     * @returns {Promise<boolean>} whether the document was updated
     */
    async function upgradeMendeleyDesktopFields() {
        const oldFields = new MendeleyDesktopFields(citationDocument.controls);
        const fields = await oldFields.find();
        if (!fields.length) {
            return false;
        }

        const dialog = new AdditionalWindow("Mendeley");
        const isUserAgree = await dialog.show(
            "Update this document",
            "<p class='i18n'>" + translate("Existing citations created with the Mendeley Desktop plugin are built using an old technology that is not compatible with Mendeley Cite. These citations have to be updated to start working with Mendeley Cite.") + "</p>" +
            "<p class='i18n'>" + translate("Rest assured nothing has happened to your document or your citations.") + "</p>" +
            "<p class='i18n'>" + translate("Press continue to be guided through the update process.") + "</p>",
        );

        if (isUserAgree) {
            let result;
            try {
                result = await oldFields.upgrade(fields);
            } catch (e) {
                console.error(e);
                showError(translate("An error occurred while updating the document. Try restarting the plugin."));
                return false;
            }
            let text = translate("Your document has been updated to use Mendeley Cite.") + " " +
                translate("Please select the citation style and language for future citation formatting.");
            if (result.unreadable) {
                text += " " + translate("Some citations could not be read and were left unchanged. To use them with Mendeley Cite, insert them again.") +
                    " " + translate("Citations left unchanged:") + " " + result.unreadable;
            }
            dialog.showInfoWindow("Update complete", text, result.unreadable ? "warning" : "success");
        } else {
            Asc.plugin.executeCommand("close", "");
        }
        return isUserAgree;
    }

    function addContextMenuButtons() {
        new EditCitationMenuItem(
            async function () {
                // A document action owns the editor: the menu does not wait for it.
                if (bInProgress) return false;
                const current = await citationService.getCurrent();
                return !!current && current.kind === "citation";
            },
            async function () {
                if (!canEditCitations) {
                    citationService.showWarningMessage("Sign in to Mendeley and wait until your library loads to edit citations.");
                    return;
                }
                const current = await citationService.getCurrent();

                await onStartAction(true, "Mendeley (" + translate("Updating citations") + ")");
                await showEditCitationWindow(current);
                onEndAction(false, "Mendeley (" + translate("Updating citations") + ")");
            },
        );
    }

    /**
     * @param {import("@shared/document/citation-document").DocCitation | import("@shared/document/citation-document").DocBibliography | null} current
     *  - the citation at the cursor
     * @param {CitationData | null} [data] - its data with sources just added, if
     *  other than the stored data
     * @param {Array<string>} [idsInDocument] - the ids of its sources in the
     *  document, if other than in its data
     * @returns {Promise<boolean>}
     */
    async function showEditCitationWindow(current, data, idsInDocument) {
        if (!current || current.kind !== "citation") {
            citationService.showWarningMessage("No Mendeley citation found at the cursor. Please click directly on a citation to edit it.");
            return false;
        }
        if (!current.data) {
            citationService.showWarningMessage("A citation in this document is corrupted and cannot be processed. Please remove or replace it.");
            return false;
        }
        const idsBeforeEdit = idsInDocument || citationService.getCitationItemIds(current.data);
        const updatedObject = await citationService.showEditCitationWindow(data || current.data, !!data);
        if (!updatedObject) {
            return false;
        }
        // Sources added, removed or reordered change the other citations
        // too, such as "ibid." or numbers, and the bibliography.
        const bItemsChanged =
            idsBeforeEdit.join("\u0000") !==
            citationService.getCitationItemIds(updatedObject).join("\u0000");

        let updateFn = citationService.updateItem.bind(
            citationService,
            updatedObject
        );

        const styleManager = settings.getStyleManager();
        const bIsNotesFormat = styleManager.getLastUsedFormat() === "note";
        const notesStyle = styleManager.getLastUsedNotesStyle();
        if (bIsNotesFormat) {
            // this way, because "SelectAddinField" does not work with notes
            updateFn = citationService.updateItem.bind(
                citationService,
                updatedObject,
                notesStyle
            );
        }

        return updateFn()
            .then(async () => {
                if (!bItemsChanged) {
                    return;
                }
                // The text of a citation in a note is in the note, not in
                // its control: notes are rewritten on their own.
                if (bIsNotesFormat) {
                    await citationService.updateCslItemsInNotes(notesStyle);
                } else {
                    await citationService.updateCslItems();
                }
            })
            .then(() => true)
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
