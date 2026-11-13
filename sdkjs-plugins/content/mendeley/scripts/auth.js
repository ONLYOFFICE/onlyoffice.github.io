(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.Auth = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers) {

    var displayNoneClass = (Constants && Constants.displayNoneClass) || "display-none";
    var loginStateHash = null;
    var currentAuthState = "login";

    var authFlow = {
        authenticate: function () {
            if (Helpers && Helpers.showError) Helpers.showError(null);
            var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
            if (app.cancelDesktopChecks) app.cancelDesktopChecks();
            if (typeof localStorage !== "undefined") localStorage.removeItem("mendToken");
            if (typeof window !== "undefined") window._activeMendToken = null;
            if (typeof window !== "undefined" && window.Asc && window.Asc.plugin && window.Asc.plugin.mendeley && window.Asc.plugin.mendeley.auth) {
                startAuthentication();
                return;
            }
            fetch("http://127.0.0.1:8080/health").then(function (response) {
                if (!response.ok) throw new Error("Mendeley Helper is not responding on port 8080.");
                return response.json().catch(function () {
                    throw new Error("Port 8080 is not running the Mendeley Helper. Close any other application using this port and try again.");
                });
            }).then(function (health) {
                if (!health || health.service !== "mendeley-loopback" || health.status !== "ok") {
                    throw new Error("Port 8080 is used by another application. Close it and try again.");
                }
                return fetch("http://127.0.0.1:8080/token", { method: "DELETE" });
            }).then(function (response) {
                if (!response.ok) throw new Error("Could not prepare Mendeley Helper for sign-in.");
                startAuthentication();
            }).catch(function (error) {
                if (Logger && typeof Logger.warn === "function") {
                    Logger.warn("Auth.loopback.unavailable, fallback to web OAuth", { error: String(error) });
                }
                startAuthentication();
            });
        },
        getToken: function () {
            var token = (typeof window !== "undefined" && window._activeMendToken) ||
                        (typeof localStorage !== "undefined" && localStorage.getItem("mendToken")) || null;
            return token;
        },
        refreshToken: function () {
            return false;
        }
    };

    function startAuthentication() {
        loginStateHash = new Date().getTime();
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var appId = app.mendAppId || (Helpers && Helpers.getSettings && Helpers.getSettings()) || "26014";
        var redirectUrl = app.redirectUrl || "";

        if (Logger && typeof Logger.info === "function") {
            Logger.info("Auth.authenticate.start", { appId: appId, redirectUrl: redirectUrl });
        }

        var link = "https://api.mendeley.com/oauth/authorize?client_id=" + appId + "&redirect_uri=" + encodeURI(redirectUrl) + "&response_type=token&scope=all&state=" + loginStateHash;
        if (window.Asc && window.Asc.plugin && window.Asc.plugin.mendeley && window.Asc.plugin.mendeley.auth) {
            link = window.Asc.plugin.mendeley.auth();
        }

        var wnd = null;
        try {
            wnd = window.open(link, null, "width=500,height=700");
        } catch (e) {}
        if (Helpers && Helpers.showLoader) Helpers.showLoader(true);

        var timer = setInterval(function () {
            if (wnd && wnd.closed) {
                clearInterval(timer);
                if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                return;
            }
            var savedToken = (typeof localStorage !== "undefined") ? localStorage.getItem("mendToken") : null;
            if (savedToken) {
                completeAuthentication(timer, savedToken, wnd);
                return;
            }
            fetch("http://127.0.0.1:8080/token")
                .then(function (response) {
                    if (!response.ok) throw new Error("Mendeley Helper could not retrieve the token.");
                    return response.json();
                })
                .then(function (data) {
                    if (data && data.token) completeAuthentication(timer, data.token, wnd);
                })
                .catch(function (error) {
                    if (Logger && typeof Logger.warn === "function") {
                        Logger.warn("Auth.loopback.poll.error", { error: String(error) });
                    }
                });
        }, 1000);
    }

    function completeAuthentication(timer, token, wnd) {
        clearInterval(timer);
        if (typeof localStorage !== "undefined") localStorage.setItem("mendToken", token);
        if (typeof window !== "undefined") window._activeMendToken = token;
        if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
        switchAuthState("main");
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        if (app.loadFilteredLibrary) app.loadFilteredLibrary(false);
        if (wnd && !wnd.closed) {
            try { wnd.close(); } catch (e) {}
        }
    }

    function configState(hide) {
        var el = (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.elements) || {};
        if (el.configState && Helpers) Helpers.switchClass(el.configState, displayNoneClass, hide);
    }

    function loginState(hide) {
        var el = (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.elements) || {};
        if (el.loginState && Helpers) Helpers.switchClass(el.loginState, displayNoneClass, hide);
    }

    function mainState(hide) {
        var el = (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.elements) || {};
        if (el.mainState && Helpers) Helpers.switchClass(el.mainState, displayNoneClass, hide);
        if (el.logoutLink && Helpers) Helpers.switchClass(el.logoutLink, displayNoneClass, hide);
    }

    function switchAuthState(state) {
        currentAuthState = state;
        configState(true);
        loginState(true);
        mainState(true);
        switch (state) {
            case "config":
                configState(false);
                break;
            case "login":
                loginState(false);
                break;
            case "main":
                mainState(false);
                break;
        }
        if (Logger && typeof Logger.info === "function") {
            Logger.info("Auth.switchAuthState", { state: state });
        }
    }

    function OAuthError(error) {
        if (Logger && typeof Logger.error === "function") {
            Logger.error("Auth.OAuthError", { error: String(error) });
        }
        if (Helpers && Helpers.showError) Helpers.showError(error);
    }

    function OAuthCallback(token, state) {
        if (state && loginStateHash && state != loginStateHash &&
            !(typeof window !== "undefined" && window.Asc && window.Asc.plugin && window.Asc.plugin.mendeley)) {
            OAuthError("State validation failed. Possible CSRF attack.");
            return;
        }
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("mendToken", token);
        }
        if (typeof window !== "undefined") {
            window._activeMendToken = token;
        }
        if (Logger && typeof Logger.success === "function") {
            Logger.success("Auth.OAuthCallback.success", {});
        }
        if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
        switchAuthState("main");
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        if (app.loadFilteredLibrary) app.loadFilteredLibrary(false);
    }

    if (typeof window !== "undefined") {
        window.OAuthError = OAuthError;
        window.OAuthCallback = OAuthCallback;
    }

    return {
        authFlow: authFlow,
        configState: configState,
        loginState: loginState,
        mainState: mainState,
        switchAuthState: switchAuthState,
        OAuthError: OAuthError,
        OAuthCallback: OAuthCallback,
        getCurrentAuthState: function () { return currentAuthState; }
    };
});
