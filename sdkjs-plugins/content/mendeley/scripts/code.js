(function () {
    // Mendeley ONLYOFFICE Plugin Main Coordinator

    var App = window.MendeleyApp || {};
    var Logger = App.Logger || { info: function () {}, error: function () {}, debug: function () {}, warn: function () {}, success: function () {} };
    var Constants = App.Constants || {};
    var Helpers = App.Helpers || {};
    var CslLoader = App.CslLoader || {};
    var Auth = App.Auth || {};
    var UiControls = App.UiControls || {};
    var LibraryView = App.LibraryView || {};
    var SettingsDrawer = App.SettingsDrawer || {};
    var CitationSync = App.CitationSync || {};
    var StylesInventory = App.StylesInventory || {};
    var Events = App.Events || {};

    var displayNoneClass = Constants.displayNoneClass || "display-none";

    // Global App State Bridge
    App.selectedLocale = "en-US";
    App.selectedStyle = (Helpers.getLastUsedStyle && Helpers.getLastUsedStyle()) || "apa";
    App.documentModule = new DocumentModule();
    App.sdk = null;
    App.elements = null;

    var desktopRequestVersion = 0;
    function tryAutoConnectDesktop(onSuccess, onFailure) {
        var requestVersion = desktopRequestVersion;
        var onCurrentSuccess = function (token) {
            if (requestVersion === desktopRequestVersion) onSuccess(token);
        };
        var onCurrentFailure = function (error) {
            if (requestVersion === desktopRequestVersion && onFailure) onFailure(error);
        };
        function tryXhr(url, cb) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.timeout = 3000;
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            if (data && data.token) {
                                cb(null, data.token);
                                return;
                            }
                        } catch (e) {}
                    }
                    cb(new Error("XHR status " + xhr.status));
                };
                xhr.onerror = function () { cb(new Error("XHR network error")); };
                xhr.ontimeout = function () { cb(new Error("XHR timeout")); };
                xhr.send();
            } catch (e) {
                cb(e);
            }
        }

        function tryEndpoint(url, cb) {
            if (typeof fetch === "function") {
                fetch(url, { cache: "no-store" })
                    .then(function (r) {
                        if (!r.ok) throw new Error("HTTP " + r.status);
                        return r.json();
                    })
                    .then(function (data) {
                        if (data && data.token) {
                            cb(null, data.token);
                        } else {
                            tryXhr(url, cb);
                        }
                    })
                    .catch(function () {
                        tryXhr(url, cb);
                    });
            } else {
                tryXhr(url, cb);
            }
        }

        tryEndpoint("http://127.0.0.1:8080/token", function (err, token) {
            if (token) {
                onCurrentSuccess(token);
            } else {
                if (requestVersion !== desktopRequestVersion) return;
                tryEndpoint("http://localhost:8080/token", function (err2, token2) {
                    if (token2) {
                        onCurrentSuccess(token2);
                    } else {
                        onCurrentFailure(err2 || err);
                    }
                });
            }
        });
    }
    function cancelDesktopChecks() {
        desktopRequestVersion++;
        Logger.debug("Auth.desktop.check.cancel", { version: desktopRequestVersion });
    }

    App.cancelDesktopChecks = cancelDesktopChecks;

    // Direct exports for module interoperability
    App.loadFilteredLibrary = LibraryView.loadFilteredLibrary;
    App.tryAutoConnectDesktop = tryAutoConnectDesktop;

    window.Asc.plugin.init = function () {
        var elements = {
            loader: document.getElementById("loader"),
            libLoader: document.getElementById("libLoader"),
            error: document.getElementById("errorWrapper"),
            contentHolder: document.getElementById("content"),
            docsWrapper: document.getElementById("docsWrapper"),
            docsHolder: document.getElementById("docsHolder"),
            docsThumb: document.getElementById("docsThumb"),
            configState: document.getElementById("configState"),
            autoConnectBtn: document.getElementById("autoConnectBtn"),
            autoConnectBtnLogin: document.getElementById("autoConnectBtnLogin"),
            redirectConfigUrl: document.getElementById("redirectConfig"),
            redirectUrlCopy: document.getElementById("redirectUrlCopy"),
            reconfigBtn: document.getElementById("reconfigBtn"),
            appIdConfigField: document.getElementById("appIdField"),
            saveConfigBtn: document.getElementById("saveConfigBtn"),
            loginState: document.getElementById("loginState"),
            mainState: document.getElementById("mainState"),
            logoutLink: document.getElementById("logoutLink"),
            loginBtn: document.getElementById("loginBtn"),
            selectedWrapper: document.getElementById("selectedWrapper"),
            selectedHolder: document.getElementById("selectedHolder"),
            selectedThumb: document.getElementById("selectedThumb"),
            buttonsWrapper: document.getElementById("buttonsWrapper"),
            searchLabel: document.getElementById("searchLabel"),
            searchClear: document.getElementById("searchClear"),
            searchField: document.getElementById("searchField"),
            styleWrapper: document.getElementById("styleWrapper"),
            styleSelectList: document.getElementById("styleSelectList"),
            styleSelectListOther: document.getElementById("styleSelectedListOther"),
            styleSelect: document.getElementById("styleSelect"),
            styleLang: document.getElementById("styleLang"),
            insertBibBtn: document.getElementById("insertBibBtn"),
            insertLinkBtn: document.getElementById("insertLinkBtn"),
            cancelBtn: document.getElementById("cancelBtn"),
            collectionDrawer: document.getElementById("collectionDrawer"),
            drawerBackBtn: document.getElementById("drawerBackBtn"),
            drawerListHolder: document.getElementById("drawerListHolder"),
            collectionSelectorBtn: document.getElementById("collectionSelectorBtn"),
            currentCollectionLabel: document.getElementById("currentCollectionLabel")
        };
        App.elements = elements;
        App.documentModule.unlockManagedContentControls().catch(function (err) {
            Logger.warn("Code.init.unlockManagedContentControls.error", { error: String(err) });
        });

        App.sdk = MendeleySDK({
            authFlow: Auth.authFlow
        });

        if (CslLoader.getStyle) CslLoader.getStyle(App.selectedStyle).catch(function () {});
        if (CslLoader.getLocale) CslLoader.getLocale(App.selectedLocale).catch(function () {});

        window.Asc.plugin.onTranslate = Helpers.applyTranslations;
        window.Asc.plugin.onThemeChanged = function (theme) {
            if (!theme) return;
            if (typeof window.Asc.plugin.onThemeChangedBase === "function") {
                window.Asc.plugin.onThemeChangedBase(theme);
            }
            if (Helpers.applyGlobalTheme) Helpers.applyGlobalTheme(theme);
        };

        var redirectUrl = (document.location.protocol === "file:") ?
            "http://localhost:8080/" :
            document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index.html", "oauth.html");
        App.redirectUrl = redirectUrl;

        if (elements.redirectConfigUrl) elements.redirectConfigUrl.value = redirectUrl;

        if (Events && Events.bindEvents) {
            Events.bindEvents(elements);
        }

        App.selectedScroller = UiControls.initScrollBox(elements.selectedHolder, elements.selectedThumb);
        App.docsScroller = UiControls.initScrollBox(elements.docsWrapper, null, LibraryView.checkDocsScroll);

        var onProcessStyles = (StylesInventory && StylesInventory.processStylesList) || SettingsDrawer.processStylesList;
        fetch("./scripts/styles_inventory.json")
            .then(function (r) { return r.json(); })
            .then(onProcessStyles)
            .catch(function () {
                fetch("https://www.zotero.org/styles-files/styles.json")
                    .then(function (resp) { return resp.json(); })
                    .then(onProcessStyles)
                    .catch(function () {});
            });

        if (elements.styleSelect) {
            elements.styleSelect.onkeyup = function () {
                var filter = elements.styleSelect.value.toLowerCase();
                var list = (elements.styleSelectList.classList.contains(displayNoneClass)) ?
                    elements.styleSelectListOther : elements.styleSelectList;
                for (var i = 0; i < list.children.length; i++) {
                    var text = list.children[i].textContent || list.children[i].innerText;
                    var hide = !(!filter || text.toLowerCase().indexOf(filter) > -1);
                    Helpers.switchClass(list.children[i], displayNoneClass, hide);
                }
            };
            elements.styleSelect.onselectchange = function (inp, val) {
                App.selectedStyle = val;
                if (CslLoader.getStyle) {
                    CslLoader.getStyle(val).then(function () {
                        CitationSync.refreshDocumentCitations();
                    }).catch(function () {});
                }
            };
        }

        if (elements.styleLang) {
            elements.styleLang.onselectchange = function (inp, val) {
                if (CslLoader.getLocale) CslLoader.getLocale(val).catch(function () {});
                App.selectedLocale = val;
            };
        }

        UiControls.initSelectBoxes();
        if (elements.styleSelectList) {
            elements.styleSelectList.onopen = function () {
                elements.styleSelectList.style.width = (elements.styleWrapper.clientWidth - 2) + "px";
            };
        }

        var existingToken = Auth.authFlow.getToken();
        if (existingToken) {
            Auth.switchAuthState("main");
            LibraryView.loadFilteredLibrary(false);
        } else {
            tryAutoConnectDesktop(function (token) {
                window._activeMendToken = token;
                if (typeof localStorage !== "undefined") localStorage.setItem("mendToken", token);
                Auth.switchAuthState("main");
                LibraryView.loadFilteredLibrary(false);
            }, function () {
                Auth.switchAuthState("login");
                Auth.authFlow.authenticate();
            });
        }

        if (window.Asc.plugin.mendeley && elements.reconfigBtn) {
            Helpers.switchClass(elements.reconfigBtn, displayNoneClass, true);
        }

        Logger.info("Plugin.init.complete", {});
    };

})();
