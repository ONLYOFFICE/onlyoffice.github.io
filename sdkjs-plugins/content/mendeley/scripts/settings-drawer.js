(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.SettingsDrawer = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers) {

    var displayNoneClass = (Constants && Constants.displayNoneClass) || "display-none";
    var styleDisplayNames = (Constants && Constants.styleDisplayNames) || {};

    function openSettingsDrawer() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var settingsDrawer = document.getElementById("settingsDrawer");
        if (elements.mainState) elements.mainState.classList.add(displayNoneClass);
        if (settingsDrawer) settingsDrawer.classList.remove(displayNoneClass);
        updateSettingsOverview();
    }

    function updateSettingsOverview() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var selectedStyle = app.selectedStyle || (Helpers && Helpers.getLastUsedStyle()) || "apa";
        var selectedLocale = app.selectedLocale || "en-US";
        var curStyleLabel = document.getElementById("settingsCurrentStyleName");
        var curLangLabel = document.getElementById("settingsCurrentLangName");
        var previewBox = document.getElementById("settingsStylePreviewBox");

        var sName = styleDisplayNames[selectedStyle] || selectedStyle || "APA Style 7th edition";
        if (curStyleLabel) curStyleLabel.textContent = sName;
        if (curLangLabel) curLangLabel.textContent = selectedLocale || "English (US)";

        if (previewBox) {
            try {
                var mockDoc = {
                    "mock-1": {
                        id: "mock-1",
                        type: "article-journal",
                        title: "Placeholder Text: A Study",
                        author: [
                            { family: "Smith", given: "J." },
                            { family: "Petrovic", given: "P." },
                            { family: "Rose", given: "M." },
                            { family: "De Souz", given: "C." }
                        ],
                        issued: { "date-parts": [[2021]] },
                        "container-title": "The Journal of Citation Styles",
                        volume: "3",
                        DOI: "10.10/X"
                    }
                };
                var CslLoader = app.CslLoader || {};
                var engine = new CSL.Engine({
                    retrieveLocale: function (l) { return CslLoader.locales ? CslLoader.locales[l] : ""; },
                    retrieveItem: function (id) { return mockDoc[id]; }
                }, CslLoader.styles ? CslLoader.styles[selectedStyle] : "", selectedLocale, true);
                engine.updateItems(["mock-1"]);
                var citPreview = engine.makeCitationCluster([{ id: "mock-1" }]);
                var bibPreview = engine.makeBibliography();
                var bibText = (bibPreview && bibPreview[1]) ? bibPreview[1].join("") : "";
                previewBox.innerHTML = "<div style=\"font-weight:600; margin-bottom:4px;\">" + citPreview + "</div><div style=\"font-size:11px; color:#555;\">" + bibText.replace(/<[^>]+>/g, "") + "</div>";
            } catch (e) {
                previewBox.textContent = "(Smith et al., 2021)";
            }
        }
    }

    function renderStyleCardsList() {
        var holder = document.getElementById("styleListItemsContainer");
        if (!holder) return;
        holder.innerHTML = "";

        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var popularStyles = [
            { id: "apa", title: "APA Style 7th edition", cit: "(Smith et al., 2021)", bib: "Smith, J., Petrovic, P., Rose, M., De Souz, C. (2021). Placeholder Text: A Study. The Journal of Citation Styles, 3." },
            { id: "chicago-author-date", title: "Chicago Manual of Style 18th edition (author-date)", cit: "(Smith et al. 2021)", bib: "Smith, J., P. Petrovic, M. Rose, and C. De Souz. 2021. \"Placeholder Text: A Study.\" The Journal of Citation Styles 3." },
            { id: "ieee", title: "IEEE Reference Guide", cit: "[1]", bib: "[1] J. Smith, P. Petrovic, M. Rose, and C. De Souz, \"Placeholder Text: A Study,\" The Journal of Citation Styles, vol. 3, 2021." },
            { id: "nature", title: "Nature", cit: "1", bib: "1. Smith, J., Petrovic, P., Rose, M. & De Souz, C. Placeholder Text: A Study. The Journal of Citation Styles 3 (2021)." },
            { id: "american-medical-association", title: "American Medical Association 11th edition", cit: "1", bib: "1. Smith J, Petrovic P, Rose M, De Souz C. Placeholder Text: A Study. The Journal of Citation Styles. 2021;3." },
            { id: "harvard-cite-them-right", title: "Cite Them Right 10th edition - Harvard", cit: "(Smith et al., 2021)", bib: "Smith, J. et al. (2021) 'Placeholder Text: A Study', The Journal of Citation Styles, 3." },
            { id: "modern-language-association", title: "Modern Language Association 9th edition", cit: "(Smith et al.)", bib: "Smith, J., et al. \"Placeholder Text: A Study.\" The Journal of Citation Styles, vol. 3, 2021." },
            { id: "vancouver", title: "Vancouver", cit: "(1)", bib: "1. Smith J, Petrovic P. Placeholder Text. J Cit Styles. 2021;3." },
            { id: "springer-basic-author-date", title: "Springer - Basic (author-date)", cit: "(Smith et al. 2021)", bib: "Smith J, Petrovic P (2021) Placeholder Text. J Cit Styles 3." },
            { id: "elsevier-harvard", title: "Elsevier - Harvard (with titles)", cit: "(Smith et al., 2021)", bib: "Smith, J., Petrovic, P., 2021. Placeholder Text. J Cit Styles 3." }
        ];

        var fullList = (window._allStylesList && window._allStylesList.length) ? window._allStylesList : [];
        var independentStyles = fullList.filter(function (s) { return s.dep === 0 || s.dependent === 0; });
        var activeDataset = independentStyles.length ? independentStyles : popularStyles;
        var currentLimit = 50;
        var currentFilterQuery = "";
        var changeStyleDrawer = document.getElementById("changeStyleDrawer");
        var settingsDrawer = document.getElementById("settingsDrawer");

        function createCard(s) {
            var card = document.createElement("div");
            card.style.cssText = "padding:12px 16px; border-bottom:1px solid #e0e0e0; cursor:pointer;";
            var styleId = s.name || s.id;
            var isSelected = (app.selectedStyle === styleId);
            if (isSelected) card.style.backgroundColor = "#e8f0fe";

            var sTitle = s.title || s.name;
            var sCit = s.cit || "";
            var sBib = s.bib || "";

            card.innerHTML = "<div style=\"font-weight:700; color:" + (isSelected ? "#103864" : "#222") + "; font-size:13px; margin-bottom:4px;\">" + sTitle + "</div>" +
                             (sCit ? "<div style=\"font-size:12px; color:#444; margin-bottom:4px;\">" + sCit + "</div>" : "") +
                             (sBib ? "<div style=\"font-size:11px; color:#666; line-height:1.35;\">" + sBib + "</div>" : "");

            card.onclick = function () {
                app.selectedStyle = styleId;
                styleDisplayNames[styleId] = sTitle;
                if (Helpers && Helpers.saveLastUsedStyle) Helpers.saveLastUsedStyle(styleId);
                if (Helpers && Helpers.showLoader) Helpers.showLoader(true);
                var CslLoader = app.CslLoader || {};
                var fetchPromise = CslLoader.getStyle ? CslLoader.getStyle(styleId) : Promise.resolve();
                fetchPromise.then(function () {
                    if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                    var refreshPromise = app.CitationSync && app.CitationSync.refreshDocumentCitations ?
                        app.CitationSync.refreshDocumentCitations() : Promise.resolve();
                    return refreshPromise.then(function () {
                        if (changeStyleDrawer) changeStyleDrawer.classList.add(displayNoneClass);
                        if (settingsDrawer) settingsDrawer.classList.remove(displayNoneClass);
                        updateSettingsOverview();
                    });
                }).catch(function (err) {
                    if (Helpers && Helpers.showLoader) Helpers.showLoader(false);
                    if (Helpers && Helpers.showError) Helpers.showError("Failed to load citation style: " + err.message);
                });
            };
            return card;
        }

        function renderCurrentView() {
            holder.innerHTML = "";
            var dataset = activeDataset;
            if (currentFilterQuery) {
                dataset = fullList.filter(function (st) {
                    return (st.title && st.title.toLowerCase().indexOf(currentFilterQuery) !== -1) ||
                           (st.name && st.name.toLowerCase().indexOf(currentFilterQuery) !== -1);
                });
            }

            var itemsToShow = dataset.slice(0, currentLimit);
            itemsToShow.forEach(function (s) { holder.appendChild(createCard(s)); });

            if (dataset.length > currentLimit) {
                var moreBtn = document.createElement("div");
                moreBtn.style.cssText = "padding:12px; text-align:center; color:#005a9e; font-weight:600; cursor:pointer; background:#f7f9fa; border-top:1px solid #e0e0e0;";
                moreBtn.textContent = "Load more styles (" + (dataset.length - currentLimit) + " remaining)...";
                moreBtn.onclick = function () {
                    currentLimit += 50;
                    renderCurrentView();
                };
                holder.appendChild(moreBtn);
            }
        }

        renderCurrentView();

        var searchInp = document.getElementById("styleSearchInput");
        if (searchInp) {
            searchInp.value = "";
            searchInp.oninput = function () {
                currentFilterQuery = searchInp.value.trim().toLowerCase();
                currentLimit = 50;
                renderCurrentView();
            };
        }
    }

    function renderLangCardsList() {
        var holder = document.getElementById("langListItemsContainer");
        if (!holder) return;
        holder.innerHTML = "";

        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var changeLangDrawer = document.getElementById("changeLangDrawer");
        var settingsDrawer = document.getElementById("settingsDrawer");

        var langs = [
            { code: "en-US", name: "English (US)" },
            { code: "en-GB", name: "English (UK)" },
            { code: "id-ID", name: "Indonesian" },
            { code: "es-ES", name: "Spanish" },
            { code: "fr-FR", name: "French" },
            { code: "de-DE", name: "German" },
            { code: "ja-JP", name: "Japanese" },
            { code: "zh-CN", name: "Chinese (PRC)" }
        ];

        langs.forEach(function (l) {
            var row = document.createElement("div");
            row.style.cssText = "padding:12px 16px; border-bottom:1px solid #eee; cursor:pointer; font-size:13px; color:#222;";
            if (app.selectedLocale === l.code) {
                row.style.backgroundColor = "#e8f0fe";
                row.style.fontWeight = "bold";
                row.style.color = "#1a73e8";
            }
            row.textContent = l.name;
            row.onclick = function () {
                app.selectedLocale = l.code;
                var CslLoader = app.CslLoader || {};
                var fetchPromise = CslLoader.getLocale ? CslLoader.getLocale(l.code) : Promise.resolve();
                fetchPromise.then(function () {
                    if (app.CitationSync && app.CitationSync.refreshDocumentCitations) {
                        app.CitationSync.refreshDocumentCitations();
                    }
                }).catch(function () {});
                if (changeLangDrawer) changeLangDrawer.classList.add(displayNoneClass);
                if (settingsDrawer) settingsDrawer.classList.remove(displayNoneClass);
                updateSettingsOverview();
            };
            holder.appendChild(row);
        });
    }

    return {
        openSettingsDrawer: openSettingsDrawer,
        updateSettingsOverview: updateSettingsOverview,
        renderStyleCardsList: renderStyleCardsList,
        renderLangCardsList: renderLangCardsList
    };
});
