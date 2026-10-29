(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"), require("./csl-converter"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers", "./csl-converter"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CitationInsert = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers, root.MendeleyApp.CslConverter);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers, CslConverter) {

    var repeatTimeout = null;

    function formatInsertBibliography() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var selectedStyle = app.selectedStyle || (Helpers && Helpers.getLastUsedStyle()) || "apa";
        var selectedLocale = app.selectedLocale || "en-US";
        var CslLoader = app.CslLoader || {};
        var Selection = app.CitationSelection || {};
        var selectedItems = (Selection.selected && Selection.selected.items) || {};

        if (!selectedStyle) {
            if (Helpers && Helpers.showError) Helpers.showError(Helpers.getMessage("Style is not selected"));
            return;
        }
        if (!selectedLocale) {
            if (Helpers && Helpers.showError) Helpers.showError(Helpers.getMessage("Language is not selected"));
            return;
        }

        clearTimeout(repeatTimeout);
        if (CslLoader.isLoadingStyle && (CslLoader.isLoadingStyle() || CslLoader.isLoadingLocale())) {
            repeatTimeout = setTimeout(formatInsertBibliography, 100);
            return;
        }

        var data = {};
        var keys = [];
        for (var item in selectedItems) {
            data[item] = CslConverter ? CslConverter.convertMendeleyToCSL(selectedItems[item]) : selectedItems[item];
            keys.push(item);
        }

        try {
            var locales = CslLoader.locales || {};
            var styles = CslLoader.styles || {};
            var formatter = new CSL.Engine({
                retrieveLocale: function (id) { return locales[id]; },
                retrieveItem: function (id) { return data[id]; }
            }, styles[selectedStyle], selectedLocale, true);
            formatter.updateItems(keys);

            var bibRes = formatter.makeBibliography();
            var bibParams = (bibRes && bibRes[0]) || {};
            var bibOptions = {
                hangingIndent: bibParams.hangingindent !== 0 && bibParams.hangingindent !== false
            };
            insertInDocument((bibRes && bibRes[1]) || [], bibOptions);
            if (Logger && typeof Logger.success === "function") {
                Logger.success("CitationInsert.formatInsertBibliography.success", { count: keys.length });
            }
        } catch (e) {
            if (Helpers && Helpers.showError) Helpers.showError(e);
        }
    }

    function formatInsertLink() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        if (!app.selectedStyle) app.selectedStyle = (Helpers && Helpers.getLastUsedStyle()) || "apa";
        if (!app.selectedLocale) app.selectedLocale = "en-US";

        if (Helpers && Helpers.showLoader) Helpers.showLoader(true);
        var CslLoader = app.CslLoader || {};
        var pStyle = CslLoader.getStyle ? CslLoader.getStyle(app.selectedStyle) : Promise.resolve();
        var pLocale = CslLoader.getLocale ? CslLoader.getLocale(app.selectedLocale) : Promise.resolve();

        Promise.all([pStyle, pLocale]).then(function () {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            executeInsertLink();
        }).catch(function (err) {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            if (Helpers && Helpers.showError) Helpers.showError("Failed to prepare citation engine: " + (err.message || err));
        });
    }

    function executeInsertLink() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var Selection = app.CitationSelection || {};
        var selectedItems = (Selection.selected && Selection.selected.items) || {};
        var CslLoader = app.CslLoader || {};
        var selectedStyle = app.selectedStyle || "apa";
        var selectedLocale = app.selectedLocale || "en-US";

        var data = {};
        var keys = [];
        var keysL = [];
        for (var item in selectedItems) {
            var selItem = selectedItems[item];
            data[item] = CslConverter ? CslConverter.convertMendeleyToCSL(selItem) : selItem;
            keys.push(item);
            var itemParams = selItem.citationParams || {};
            var keyObj = { id: item };
            if (itemParams.prefix) keyObj.prefix = itemParams.prefix;
            if (itemParams.suffix) keyObj.suffix = itemParams.suffix;
            if (itemParams.locatorValue) {
                keyObj.locator = itemParams.locatorValue;
                keyObj.label = itemParams.locatorType || "page";
            }
            if (itemParams.displayAs === "year_only") {
                keyObj["suppress-author"] = true;
            } else if (itemParams.displayAs === "author_only") {
                keyObj["author-only"] = true;
            }
            keyObj.displayMode = itemParams.displayAs || "default";
            if (itemParams.manualOverride) {
                keyObj.manualOverride = itemParams.manualOverride;
            }
            keysL.push(keyObj);
        }

        try {
            var locales = CslLoader.locales || {};
            var styles = CslLoader.styles || {};
            var formatter = new CSL.Engine({
                retrieveLocale: function (id) { return locales[id]; },
                retrieveItem: function (id) { return data[id]; }
            }, styles[selectedStyle], selectedLocale, true);
            formatter.updateItems(keys);

            var renderedText = "";
            var hasOverride = keysL.length === 1 && keysL[0].manualOverride;
            if (hasOverride) {
                renderedText = keysL[0].manualOverride;
            } else {
                var hasNarrative = keysL.some(function (k) { return k.displayMode === "narrative"; });
                if (hasNarrative && keysL.length === 1) {
                    var singleKey = keysL[0];
                    var authorCluster = formatter.makeCitationCluster([{ id: singleKey.id, "author-only": true }]);
                    var yearCluster = formatter.makeCitationCluster([{
                        id: singleKey.id,
                        "suppress-author": true,
                        prefix: singleKey.prefix,
                        suffix: singleKey.suffix,
                        locator: singleKey.locator,
                        label: singleKey.label
                    }]);
                    var rawAuthor = (authorCluster && authorCluster.join) ? authorCluster.join("") : String(authorCluster || "");
                    var rawYear = (yearCluster && yearCluster.join) ? yearCluster.join("") : String(yearCluster || "");
                    renderedText = rawAuthor + " " + rawYear;
                } else {
                    renderedText = formatter.makeCitationCluster(keysL);
                }
            }

            var isNoteStyle = (formatter.opt && formatter.opt.class === "note") ||
                              (styles[selectedStyle] && styles[selectedStyle].indexOf('class="note"') !== -1);

            insertCitationContentControl(renderedText, keys, data, keysL, isNoteStyle);
        } catch (e) {
            if (Helpers && Helpers.showError) Helpers.showError(e);
        }
    }

    function insertCitationContentControl(renderedText, keys, cslDataMap, keysL, isNoteStyle) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var documentModule = app.documentModule;
        var citationItems = keys.map(function (k, idx) {
            var kObj = (keysL && keysL[idx]) ? keysL[idx] : {};
            var itemPayload = {
                id: k,
                itemData: cslDataMap[k] || {}
            };
            if (kObj.prefix) itemPayload.prefix = kObj.prefix;
            if (kObj.suffix) itemPayload.suffix = kObj.suffix;
            if (kObj.locator) {
                itemPayload.locator = kObj.locator;
                itemPayload.label = kObj.label;
            }
            if (kObj["suppress-author"]) itemPayload["suppress-author"] = true;
            if (kObj["author-only"]) itemPayload["author-only"] = true;
            if (kObj.displayMode && kObj.displayMode !== "default") itemPayload.displayMode = kObj.displayMode;
            if (kObj.manualOverride) itemPayload.manualOverride = kObj.manualOverride;
            return itemPayload;
        });

        if (Helpers && Helpers.showLoader) Helpers.showLoader(true);
        if (!documentModule) {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            return;
        }

        documentModule.insertCitation(citationItems, renderedText, isNoteStyle).then(function () {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            if (Logger && typeof Logger.success === "function") {
                Logger.success("CitationInsert.insertCitation.success", { count: citationItems.length, isNoteStyle: isNoteStyle });
            }
        }).catch(function (err) {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            if (Helpers && Helpers.showError) Helpers.showError("Failed to insert citation: " + (err.message || err));
        });
    }

    function insertInDocument(html, options) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var documentModule = app.documentModule;
        if (!html) {
            if (Helpers && Helpers.showError) Helpers.showError(Helpers.getMessage("Bibliography cannot be created with selected style"));
            return;
        }
        var rawHtml = (html && html.join) ? html.join("") : String(html || "");
        if (!documentModule) return;

        documentModule.getBibliography().then(function (bibRecord) {
            if (bibRecord && bibRecord.internalId) {
                return documentModule.updateBibliographyHtml(bibRecord.internalId, rawHtml, options);
            } else {
                return documentModule.insertBibliography(rawHtml, options);
            }
        }).then(function () {
            if (Logger && typeof Logger.success === "function") {
                Logger.success("CitationInsert.insertInDocument.success", {});
            }
        }).catch(function (err) {
            if (Logger && typeof Logger.warn === "function") {
                Logger.warn("CitationInsert.insertBibliography.error", { error: String(err) });
            }
            if (Helpers && Helpers.showError) Helpers.showError("Failed to insert bibliography: " + (err.message || err));
        });
    }

    return {
        formatInsertBibliography: formatInsertBibliography,
        formatInsertLink: formatInsertLink,
        executeInsertLink: executeInsertLink,
        insertCitationContentControl: insertCitationContentControl,
        insertInDocument: insertInDocument
    };
});
