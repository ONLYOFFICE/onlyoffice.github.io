(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.Events = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {

    function bindEvents(elements) {
        var App = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var Helpers = App.Helpers || {};
        var Auth = App.Auth || {};
        var LibraryView = App.LibraryView || {};
        var CitationSelection = App.CitationSelection || {};
        var CollectionDrawer = App.CollectionDrawer || {};
        var SettingsDrawer = App.SettingsDrawer || {};
        var CitationInsert = App.CitationInsert || {};
        var CitationSync = App.CitationSync || {};
        var Constants = App.Constants || {};
        var displayNoneClass = Constants.displayNoneClass || "display-none";

        if (elements.redirectUrlCopy) {
            elements.redirectUrlCopy.onclick = function () {
                elements.redirectConfigUrl.select();
                document.execCommand("copy");
                window.open("https://dev.mendeley.com/myapps.html", "_blank");
            };
        }

        function handleDesktopSync() {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(true);
            if (Helpers && Helpers.showError) Helpers.showError(null);
            if (App.tryAutoConnectDesktop) {
                App.tryAutoConnectDesktop(function (token) {
                    if (App.cancelDesktopChecks) App.cancelDesktopChecks();
                    if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                    window._activeMendToken = token;
                    if (typeof localStorage !== "undefined") localStorage.setItem("mendToken", token);
                    Auth.switchAuthState("main");
                    LibraryView.loadFilteredLibrary(false);
                }, function () {
                    if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                    Auth.switchAuthState("login");
                    Auth.authFlow.authenticate();
                });
            }
        }

        if (elements.autoConnectBtn) {
            elements.autoConnectBtn.onclick = handleDesktopSync;
        }

        if (elements.autoConnectBtnLogin) {
            elements.autoConnectBtnLogin.onclick = handleDesktopSync;
        }

        if (elements.reconfigBtn) {
            elements.reconfigBtn.onclick = function () {
                Helpers.clearSettings();
                Auth.switchAuthState("config");
            };
        }

        if (elements.loginBtn) {
            elements.loginBtn.onclick = function (e) {
                if (e.target.classList.contains(displayNoneClass)) return true;
                Auth.authFlow.authenticate();
                return true;
            };
        }

        if (elements.logoutLink) {
            elements.logoutLink.onclick = function (e) {
                if (e.target.classList.contains(displayNoneClass)) return true;
                if (App.cancelDesktopChecks) App.cancelDesktopChecks();
                if (typeof localStorage !== "undefined") localStorage.removeItem("mendToken");
                window._activeMendToken = null;
                LibraryView.clearLibrary();
                Auth.switchAuthState("login");
                return true;
            };
        }

        if (elements.searchField) {
            elements.searchField.onkeypress = function (e) {
                if (e.keyCode === 13) LibraryView.searchFor(e.target.value);
            };
            elements.searchField.onblur = function (e) {
                setTimeout(function () { LibraryView.searchFor(e.target.value); }, 500);
            };
            elements.searchField.onkeyup = function (e) {
                Helpers.switchClass(elements.searchClear, displayNoneClass, !e.target.value);
            };
        }

        if (elements.searchClear) {
            elements.searchClear.onclick = function (e) {
                if (e.target.classList.contains(displayNoneClass)) return true;
                Helpers.switchClass(elements.searchClear, displayNoneClass, true);
                if (elements.searchField) elements.searchField.value = "";
                LibraryView.lastSearch.text = "";
                LibraryView.clearLibrary();
                return true;
            };
        }

        if (elements.cancelBtn) {
            elements.cancelBtn.onclick = function () {
                var ids = Object.keys(CitationSelection.selected.items);
                ids.forEach(function (id) {
                    CitationSelection.removeSelected(id);
                });
            };
        }

        if (elements.saveConfigBtn) {
            elements.saveConfigBtn.onclick = function () {
                var appid = elements.appIdConfigField ? elements.appIdConfigField.value.trim() : "";
                if (appid) {
                    Helpers.saveSettings(appid);
                    Auth.switchAuthState("login");
                } else {
                    Helpers.showError(Helpers.getMessage("AppId is empty"));
                }
            };
        }

        if (elements.insertBibBtn) elements.insertBibBtn.onclick = CitationInsert.formatInsertBibliography;
        if (elements.insertLinkBtn) elements.insertLinkBtn.onclick = CitationInsert.formatInsertLink;

        // Drawer buttons
        if (elements.collectionSelectorBtn) {
            elements.collectionSelectorBtn.onclick = function () {
                elements.mainState.classList.add(displayNoneClass);
                elements.collectionDrawer.classList.remove(displayNoneClass);
                CollectionDrawer.renderCollectionDrawer();
            };
        }
        if (elements.drawerBackBtn) {
            elements.drawerBackBtn.onclick = function () {
                elements.collectionDrawer.classList.add(displayNoneClass);
                elements.mainState.classList.remove(displayNoneClass);
            };
        }

        var topSyncBtn = document.getElementById("topSyncBtn");
        if (topSyncBtn) {
            topSyncBtn.onclick = function () {
                LibraryView.loadFilteredLibrary(false);
                CitationSync.refreshDocumentCitations();
            };
        }

        var topMoreBtn = document.getElementById("topMoreBtn");
        var topMoreMenu = document.getElementById("topMoreMenu");
        if (topMoreBtn && topMoreMenu) {
            topMoreBtn.onclick = function (e) {
                e.stopPropagation();
                topMoreMenu.classList.toggle(displayNoneClass);
            };
            document.addEventListener("click", function () {
                topMoreMenu.classList.add(displayNoneClass);
            });
        }

        var menuBib = document.getElementById("menuItemInsertBib");
        if (menuBib) menuBib.onclick = CitationSync.insertBibliographyFromDocument;

        var menuSettings = document.getElementById("menuItemCitationSettings");
        if (menuSettings) {
            menuSettings.onclick = function () {
                topMoreMenu.classList.add(displayNoneClass);
                SettingsDrawer.openSettingsDrawer();
            };
        }

        var menuUnlink = document.getElementById("menuItemUnlinkCitations");
        if (menuUnlink) menuUnlink.onclick = CitationSync.unlinkAllCitations;

        var menuLogout = document.getElementById("menuItemLogout");
        if (menuLogout) {
            menuLogout.onclick = function () {
                if (typeof localStorage !== "undefined") localStorage.removeItem("mendToken");
                window._activeMendToken = null;
                Auth.switchAuthState("login");
            };
        }

        var settingsDrawer = document.getElementById("settingsDrawer");
        var settingsDrawerBack = document.getElementById("settingsDrawerBackBtn");
        var changeStyleDrawer = document.getElementById("changeStyleDrawer");
        var changeStyleBack = document.getElementById("changeStyleBackBtn");
        var changeLangDrawer = document.getElementById("changeLangDrawer");
        var changeLangBack = document.getElementById("changeLangBackBtn");
        var btnOpenStyle = document.getElementById("btnOpenChangeStyle");
        var btnOpenLang = document.getElementById("btnOpenChangeLang");

        if (settingsDrawerBack) {
            settingsDrawerBack.onclick = function () {
                settingsDrawer.classList.add(displayNoneClass);
                elements.mainState.classList.remove(displayNoneClass);
            };
        }
        if (changeStyleBack) {
            changeStyleBack.onclick = function () {
                changeStyleDrawer.classList.add(displayNoneClass);
                settingsDrawer.classList.remove(displayNoneClass);
                SettingsDrawer.updateSettingsOverview();
            };
        }
        if (changeLangBack) {
            changeLangBack.onclick = function () {
                changeLangDrawer.classList.add(displayNoneClass);
                settingsDrawer.classList.remove(displayNoneClass);
                SettingsDrawer.updateSettingsOverview();
            };
        }
        if (btnOpenStyle) {
            btnOpenStyle.onclick = function () {
                settingsDrawer.classList.add(displayNoneClass);
                changeStyleDrawer.classList.remove(displayNoneClass);
                SettingsDrawer.renderStyleCardsList();
            };
        }
        if (btnOpenLang) {
            btnOpenLang.onclick = function () {
                settingsDrawer.classList.add(displayNoneClass);
                changeLangDrawer.classList.remove(displayNoneClass);
                SettingsDrawer.renderLangCardsList();
            };
        }
    }

    return {
        bindEvents: bindEvents
    };
});
