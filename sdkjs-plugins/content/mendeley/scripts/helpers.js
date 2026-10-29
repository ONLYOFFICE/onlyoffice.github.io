(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.Helpers = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants) {

    var displayNoneClass = (Constants && Constants.displayNoneClass) || "display-none";
    var blurClass = (Constants && Constants.blurClass) || "blur";

    function getMessage(key) {
        if (typeof window !== "undefined" && window.Asc && window.Asc.plugin && typeof window.Asc.plugin.tr === "function") {
            return window.Asc.plugin.tr(key);
        }
        return key;
    }

    function switchClass(el, className, add) {
        if (!el) return;
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

    function showLoader(show, elements) {
        var el = elements || (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.elements) || {};
        if (el.loader) switchClass(el.loader, displayNoneClass, !show);
        if (el.contentHolder) switchClass(el.contentHolder, blurClass, show);
        if (Logger && typeof Logger.debug === "function") {
            Logger.debug("UI.showLoader", { show: show });
        }
    }

    function showError(message, elements) {
        var el = elements || (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.elements) || {};
        if (!el.error) return;
        if (message) {
            switchClass(el.error, displayNoneClass, false);
            el.error.textContent = message;
            if (Logger && typeof Logger.error === "function") {
                Logger.error("UI.showError", { message: message });
            }
            setTimeout(function () {
                window.onclick = function () { showError(null, el); };
            }, 100);
        } else {
            switchClass(el.error, displayNoneClass, true);
            el.error.textContent = "";
            window.onclick = null;
        }
    }

    function showLibLoader(show, elements) {
        var el = elements || (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.elements) || {};
        if (el.libLoader) switchClass(el.libLoader, displayNoneClass, !show);
        if (Logger && typeof Logger.debug === "function") {
            Logger.debug("UI.showLibLoader", { show: show });
        }
    }

    function saveLastUsedStyle(id) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("mendStyleId", id);
        }
        if (Logger && typeof Logger.info === "function") {
            Logger.info("Settings.saveLastUsedStyle", { id: id });
        }
    }

    function getLastUsedStyle() {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem("mendStyleId");
        }
        return null;
    }

    function saveSettings(id) {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("mendAppId", id);
        }
        if (typeof window !== "undefined" && window.MendeleyApp) {
            window.MendeleyApp.mendAppId = id;
        }
        if (Logger && typeof Logger.info === "function") {
            Logger.info("Settings.saveSettings", { appId: id });
        }
    }

    function getSettings() {
        if (typeof localStorage !== "undefined") {
            var id = localStorage.getItem("mendAppId");
            if (typeof window !== "undefined" && window.MendeleyApp) {
                window.MendeleyApp.mendAppId = id;
            }
            return id;
        }
        return null;
    }

    function clearSettings() {
        if (typeof window !== "undefined" && window.MendeleyApp) {
            window.MendeleyApp.mendAppId = null;
        }
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem("mendAppId");
        }
        if (Logger && typeof Logger.info === "function") {
            Logger.info("Settings.clearSettings", {});
        }
    }

    function applyTranslations() {
        if (typeof document === "undefined") return;
        var elements = document.getElementsByClassName("i18n");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            if (el.innerText) el.innerText = getMessage(el.innerText);
        }
    }

    function applyGlobalTheme(theme) {
        if (typeof document === "undefined") return;
        var styleId = "mendeley-dynamic-theme";
        var styleEl = document.getElementById(styleId);
        if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }

        var bgNormal = theme["background-normal"] || "#ffffff";
        var textNormal = theme["text-normal"] || "#333333";
        var bgToolbar = theme["background-toolbar"] || "#f4f4f4";
        var borderCtrl = theme["border-regular-control"] || "#cccccc";
        var isDark = (theme.type && theme.type.indexOf("dark") !== -1) || theme.name === "theme-night" || bgNormal.toLowerCase() === "#333333" || bgNormal.toLowerCase() === "#282828";

        var css = "";
        css += "body, html, #content, #mainCont { background-color: " + bgNormal + " !important; color: " + textNormal + " !important; }\n";
        css += "#collectionDrawer, #editCitationDrawer, #mainState { background-color: " + bgNormal + " !important; color: " + textNormal + " !important; }\n";
        css += "#collectionSelectorBtn { background-color: " + (isDark ? bgToolbar : "#ffffff") + " !important; border-color: " + borderCtrl + " !important; color: " + textNormal + " !important; }\n";
        css += "#currentCollectionLabel { color: " + textNormal + " !important; }\n";
        css += "input.form-control, select.form-control, textarea.form-control { background-color: " + (isDark ? "#2d2d2d" : "#ffffff") + " !important; color: " + (isDark ? "#eeeeee" : "#222222") + " !important; border-color: " + borderCtrl + " !important; }\n";
        css += "select.form-control option { background-color: " + (isDark ? "#2d2d2d" : "#ffffff") + " !important; color: " + (isDark ? "#eeeeee" : "#222222") + " !important; }\n";
        css += "#drawerBackBtn, #editCitationBackBtn { border-color: " + borderCtrl + " !important; color: " + textNormal + " !important; }\n";
        css += ".doc { background-color: " + bgNormal + " !important; border-color: " + borderCtrl + " !important; color: " + textNormal + " !important; }\n";
        css += ".doc .docInfo div { color: " + textNormal + " !important; }\n";
        css += ".doc .secondary-text { opacity: 0.75 !important; }\n";
        css += "#buttonsWrapper { background-color: " + bgNormal + " !important; border-top: 1px solid " + borderCtrl + " !important; }\n";
        css += "#selectedWrapper { background-color: " + bgNormal + " !important; border-top: 1px solid " + borderCtrl + " !important; }\n";
        css += "#cancelBtn { background-color: " + (isDark ? bgToolbar : "#ffffff") + " !important; border-color: " + borderCtrl + " !important; color: " + textNormal + " !important; }\n";
        css += "#cancelCitationChangesBtn { background-color: " + (isDark ? bgToolbar : "#ffffff") + " !important; border-color: " + borderCtrl + " !important; color: " + textNormal + " !important; }\n";
        css += "#editCitationPreviewText { color: " + (isDark ? "#eeeeee" : "#111111") + " !important; }\n";
        css += ".selDoc { background-color: " + (isDark ? "#2d2d2d" : "#ffffff") + " !important; border-color: " + borderCtrl + " !important; color: " + (isDark ? "#64b5f6" : "#1a5276") + " !important; }\n";

        styleEl.textContent = css;
    }

    return {
        getMessage: getMessage,
        switchClass: switchClass,
        showLoader: showLoader,
        showError: showError,
        showLibLoader: showLibLoader,
        saveLastUsedStyle: saveLastUsedStyle,
        getLastUsedStyle: getLastUsedStyle,
        saveSettings: saveSettings,
        getSettings: getSettings,
        clearSettings: clearSettings,
        applyTranslations: applyTranslations,
        applyGlobalTheme: applyGlobalTheme
    };
});
