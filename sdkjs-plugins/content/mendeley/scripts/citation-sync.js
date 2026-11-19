(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"), require("./csl-converter"), require("./citation-insert"), require("./citation-parser"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers", "./csl-converter", "./citation-insert", "./citation-parser"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CitationSync = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers, root.MendeleyApp.CslConverter, root.MendeleyApp.CitationInsert, root.MendeleyApp.CitationParser);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers, CslConverter, CitationInsert, CitationParser) {

    function refreshDocumentCitations() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var selectedStyle = app.selectedStyle || (Helpers && Helpers.getLastUsedStyle()) || "apa";
        var selectedLocale = app.selectedLocale || "en-US";
        var CslLoader = app.CslLoader || {};
        var documentModule = app.documentModule;

        if (!selectedStyle || !CslLoader.styles || !CslLoader.styles[selectedStyle] ||
            !selectedLocale || !CslLoader.locales || !CslLoader.locales[selectedLocale] || !documentModule) {
            return Promise.resolve();
        }

        return documentModule.getCitations().then(function (citationRecords) {
            if (!citationRecords || !citationRecords.length) return;
            var allDocCslItems = {};
            var allDocIds = [];
            var citationUpdates = [];

            citationRecords.forEach(function (cluster) {
                var cslItems = {};
                var ids = [];
                var keysList = [];
                cluster.citationItems.forEach(function (ci) {
                    cslItems[ci.id] = ci.itemData;
                    allDocCslItems[ci.id] = ci.itemData;
                    ids.push(ci.id);
                    if (allDocIds.indexOf(ci.id) === -1) allDocIds.push(ci.id);
                    var kObj = { id: ci.id };
                    if (ci.prefix) kObj.prefix = ci.prefix;
                    if (ci.suffix) kObj.suffix = ci.suffix;
                    if (ci.locator) {
                        kObj.locator = ci.locator;
                        kObj.label = ci.label || "page";
                    }
                    if (ci["suppress-author"]) kObj["suppress-author"] = true;
                    if (ci["author-only"]) kObj["author-only"] = true;
                    if (ci.displayMode) kObj.displayMode = ci.displayMode;
                    if (ci.manualOverride) kObj.manualOverride = ci.manualOverride;
                    keysList.push(kObj);
                });

                try {
                    var engine = new CSL.Engine({
                        retrieveLocale: function (l) { return CslLoader.locales[l]; },
                        retrieveItem: function (id) { return cslItems[id]; }
                    }, CslLoader.styles[selectedStyle], selectedLocale, true);
                    engine.updateItems(ids);

                    var formatted = "";
                    var hasOverride = keysList.length === 1 && keysList[0].manualOverride;
                    if (hasOverride) {
                        formatted = keysList[0].manualOverride;
                    } else {
                        var hasNarrative = keysList.some(function (k) { return k.displayMode === "narrative"; });
                        if (hasNarrative && keysList.length === 1) {
                            var singleKey = keysList[0];
                            var aClust = engine.makeCitationCluster([{ id: singleKey.id, "author-only": true }]);
                            var yClust = engine.makeCitationCluster([{
                                id: singleKey.id,
                                "suppress-author": true,
                                prefix: singleKey.prefix,
                                suffix: singleKey.suffix,
                                locator: singleKey.locator,
                                label: singleKey.label
                            }]);
                            var rA = (aClust && aClust.join) ? aClust.join("") : String(aClust || "");
                            var rY = (yClust && yClust.join) ? yClust.join("") : String(yClust || "");
                            formatted = rA + " " + rY;
                        } else {
                            formatted = engine.makeCitationCluster(keysList);
                        }
                    }

                    citationUpdates.push(documentModule.updateCitationText(cluster.internalId, formatted));
                } catch (e) {
                    if (Logger && typeof Logger.warn === "function") {
                        Logger.warn("CitationSync.refreshCitationError", { error: String(e) });
                    }
                }
            });

            var bibliographyUpdate = Promise.resolve();
            if (allDocIds.length) {
                bibliographyUpdate = documentModule.getBibliography().then(function (bibRecord) {
                    if (!bibRecord) return;
                    try {
                        var engineBib = new CSL.Engine({
                            retrieveLocale: function (l) { return CslLoader.locales[l]; },
                            retrieveItem: function (id) { return allDocCslItems[id]; }
                        }, CslLoader.styles[selectedStyle], selectedLocale, true);
                        engineBib.updateItems(allDocIds);
                        var bibRes = engineBib.makeBibliography();
                        if (bibRes && bibRes[1]) {
                            var bibParams = bibRes[0] || {};
                            var bibOptions = {
                                hangingIndent: bibParams.hangingindent !== 0 && bibParams.hangingindent !== false
                            };
                            return documentModule.updateBibliographyHtml(bibRecord.internalId, bibRes[1], bibOptions);
                        }
                    } catch (eb) {
                        if (Logger && typeof Logger.warn === "function") {
                            Logger.warn("CitationSync.refreshBibliographyError", { error: String(eb) });
                        }
                    }
                });
            }
            return Promise.all([Promise.all(citationUpdates), bibliographyUpdate]);
        });
    }

    function generateAndInsertBibliography(cslItems, ids) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var selectedStyle = app.selectedStyle || (Helpers && Helpers.getLastUsedStyle()) || "apa";
        var selectedLocale = app.selectedLocale || "en-US";
        var CslLoader = app.CslLoader || {};

        try {
            var engine = new CSL.Engine({
                retrieveLocale: function (l) { return CslLoader.locales ? CslLoader.locales[l] : ""; },
                retrieveItem: function (id) { return cslItems[id]; }
            }, CslLoader.styles ? CslLoader.styles[selectedStyle] : "", selectedLocale, true);
            engine.updateItems(ids);
            var bibRes = engine.makeBibliography();
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            if (bibRes && bibRes[1]) {
                var bibParams = bibRes[0] || {};
                var bibOptions = {
                    hangingIndent: bibParams.hangingindent !== 0 && bibParams.hangingindent !== false
                };
                if (CitationInsert && CitationInsert.insertInDocument) {
                    CitationInsert.insertInDocument(bibRes[1], bibOptions);
                }
            } else {
                if (Helpers && Helpers.showError) Helpers.showError("Bibliography could not be generated with selected style");
            }
        } catch (e) {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            if (Helpers && Helpers.showError) Helpers.showError(e);
        }
    }

    function insertBibliographyFromDocument() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var selectedStyle = app.selectedStyle || (Helpers && Helpers.getLastUsedStyle()) || "apa";
        var selectedLocale = app.selectedLocale || "en-US";
        var CslLoader = app.CslLoader || {};
        var documentModule = app.documentModule;
        var Parser = app.CitationParser || CitationParser || {};

        if (Helpers && Helpers.showLoader) Helpers.showLoader(true);
        var pStyle = CslLoader.getStyle ? CslLoader.getStyle(selectedStyle) : Promise.resolve();
        var pLocale = CslLoader.getLocale ? CslLoader.getLocale(selectedLocale) : Promise.resolve();

        Promise.all([pStyle, pLocale]).then(function () {
            if (!documentModule) return Promise.resolve(null);
            return documentModule.getCitations();
        }).then(function (citationRecords) {
            if (citationRecords && citationRecords.length) {
                var cslItems = {};
                var ids = [];
                citationRecords.forEach(function (cluster) {
                    if (cluster.citationItems) {
                        cluster.citationItems.forEach(function (ci) {
                            if (!cslItems[ci.id]) {
                                cslItems[ci.id] = ci.itemData;
                                ids.push(ci.id);
                            }
                        });
                    }
                });
                if (ids.length) {
                    generateAndInsertBibliography(cslItems, ids);
                    return;
                }
            }

            if (!documentModule) {
                if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                return;
            }

            return documentModule.getDocumentText().then(function (docText) {
                return Parser.findCitationsInTextAndLibrary ? Parser.findCitationsInTextAndLibrary(docText) : { cslItems: {}, ids: [] };
            }).then(function (matchedItems) {
                if (matchedItems && matchedItems.ids && matchedItems.ids.length) {
                    generateAndInsertBibliography(matchedItems.cslItems, matchedItems.ids);
                    return;
                }

                var Selection = app.CitationSelection || {};
                var selected = Selection.selected || {};
                if (selected.count && selected.count() > 0) {
                    var cslData = {};
                    var keys = [];
                    for (var k in selected.items) {
                        cslData[k] = CslConverter ? CslConverter.convertMendeleyToCSL(selected.items[k]) : selected.items[k];
                        keys.push(k);
                    }
                    generateAndInsertBibliography(cslData, keys);
                    return;
                }

                if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                if (Helpers && Helpers.showError) Helpers.showError("No citations found in document");
            });
        }).catch(function (err) {
            if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
            if (Helpers && Helpers.showError) Helpers.showError("Failed to insert bibliography: " + (err.message || err));
        });
    }

    function unlinkAllCitations() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var documentModule = app.documentModule;
        if (!documentModule) return;
        documentModule.unlinkAll().catch(function (err) {
            if (Logger && typeof Logger.warn === "function") {
                Logger.warn("CitationSync.unlinkAllCitations.error", { error: String(err) });
            }
        });
    }

    return {
        refreshDocumentCitations: refreshDocumentCitations,
        generateAndInsertBibliography: generateAndInsertBibliography,
        insertBibliographyFromDocument: insertBibliographyFromDocument,
        unlinkAllCitations: unlinkAllCitations
    };
});
