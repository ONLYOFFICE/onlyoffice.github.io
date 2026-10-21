(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CslLoader = factory(root.MendeleyApp.Logger);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger) {

    var locales = {};
    var styles = {};
    var loadingLocale = false;
    var loadingStyle = false;

    function getLocale(langTag) {
        return new Promise(function (res, rej) {
            if (locales[langTag] != null) {
                res(locales[langTag]);
            } else {
                loadingLocale = true;
                if (Logger && typeof Logger.debug === "function") {
                    Logger.debug("CslLoader.getLocale.start", { langTag: langTag });
                }
                fetch("https://cdn.jsdelivr.net/gh/citation-style-language/locales@master/locales-" + langTag + ".xml")
                    .then(function (resp) { return resp.text(); })
                    .then(function (text) {
                        locales[langTag] = text;
                        loadingLocale = false;
                        if (Logger && typeof Logger.success === "function") {
                            Logger.success("CslLoader.getLocale.success", { langTag: langTag });
                        }
                        res(text);
                    })
                    .catch(function (err) {
                        loadingLocale = false;
                        if (Logger && typeof Logger.error === "function") {
                            Logger.error("CslLoader.getLocale.error", { langTag: langTag, error: String(err) });
                        }
                        rej(err);
                    });
            }
        });
    }

    function getStyle(styleName) {
        return new Promise(function (res, rej) {
            if (styles[styleName] != null) {
                res(styles[styleName]);
            } else {
                loadingStyle = true;
                if (Logger && typeof Logger.debug === "function") {
                    Logger.debug("CslLoader.getStyle.start", { styleName: styleName });
                }
                // Try official zotero styles first, then fallback to CSL official repo
                fetch("https://www.zotero.org/styles/" + styleName)
                    .then(function (resp) {
                        if (!resp.ok) throw new Error("Zotero style fetch status " + resp.status);
                        return resp.text();
                    })
                    .then(function (text) {
                        if (text && text.indexOf("<style") !== -1) {
                            styles[styleName] = text;
                            loadingStyle = false;
                            if (Logger && typeof Logger.success === "function") {
                                Logger.success("CslLoader.getStyle.success", { styleName: styleName, source: "zotero" });
                            }
                            res(text);
                        } else {
                            throw new Error("Invalid style response");
                        }
                    })
                    .catch(function (err) {
                        fetch("https://raw.githubusercontent.com/citation-style-language/styles/master/" + styleName + ".csl")
                            .then(function (r) {
                                if (!r.ok) throw new Error("CSL GitHub style fetch status " + r.status);
                                return r.text();
                            })
                            .then(function (text) {
                                styles[styleName] = text;
                                loadingStyle = false;
                                if (Logger && typeof Logger.success === "function") {
                                    Logger.success("CslLoader.getStyle.success", { styleName: styleName, source: "github" });
                                }
                                res(text);
                            })
                            .catch(function (e) {
                                loadingStyle = false;
                                if (Logger && typeof Logger.error === "function") {
                                    Logger.error("CslLoader.getStyle.error", { styleName: styleName, error: String(e) });
                                }
                                rej(e);
                            });
                    });
            }
        });
    }

    return {
        locales: locales,
        styles: styles,
        getLocale: getLocale,
        getStyle: getStyle,
        isLoadingLocale: function () { return loadingLocale; },
        isLoadingStyle: function () { return loadingStyle; }
    };
});
