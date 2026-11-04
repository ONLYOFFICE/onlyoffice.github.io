(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CitationSelection = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers) {

    var displayNoneClass = (Constants && Constants.displayNoneClass) || "display-none";
    var switchClass = (Helpers && Helpers.switchClass) || function (el, cls, add) {
        if (!el) return;
        if (add) el.classList.add(cls); else el.classList.remove(cls);
    };

    var selected = {
        items: {},
        html: {},
        checks: {},
        count: function () {
            var k = 0;
            for (var i in selected.items) k++;
            return k;
        }
    };

    var currentlyEditingItem = null;

    function getCitationPillLabel(item) {
        var year = item.year || "";
        if (item.authors && item.authors.length > 0) {
            var primary = item.authors[0].last_name || item.authors[0].family || "";
            if (item.authors.length === 1) {
                return primary + (year ? " " + year : "");
            } else if (item.authors.length === 2) {
                var second = item.authors[1].last_name || item.authors[1].family || "";
                return primary + " & " + second + (year ? " " + year : "");
            } else {
                return primary + " et al." + (year ? " " + year : "");
            }
        }
        var t = item.title || "Reference";
        if (t.length > 25) t = t.slice(0, 22) + "...";
        return t + (year ? " " + year : "");
    }

    function checkSelected() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var count = selected.count();
        var hasSelected = count > 0;
        var manySelected = count >= 3;

        switchClass(elements.selectedWrapper, displayNoneClass, !hasSelected);
        switchClass(elements.mainState, "has-many-selected", manySelected);

        if (elements.insertLinkBtn) {
            elements.insertLinkBtn.style.opacity = hasSelected ? "1" : "0.6";
            elements.insertLinkBtn.style.pointerEvents = hasSelected ? "auto" : "none";
        }
        if (elements.cancelBtn) {
            elements.cancelBtn.style.opacity = hasSelected ? "1" : "0.6";
            elements.cancelBtn.style.pointerEvents = hasSelected ? "auto" : "none";
        }
        if (Logger && typeof Logger.debug === "function") {
            Logger.debug("CitationSelection.checkSelected", { count: count });
        }
    }

    function addSelected(item, input) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var el = buildSelectedElement(item);
        selected.items[item.id] = item;
        selected.html[item.id] = el;
        selected.checks[item.id] = input;
        if (elements.selectedHolder) elements.selectedHolder.appendChild(el);
        if (app.docsScroller && app.docsScroller.onscroll) app.docsScroller.onscroll();
        if (app.selectedScroller && app.selectedScroller.onscroll) app.selectedScroller.onscroll();
        checkSelected();
        if (Logger && typeof Logger.info === "function") {
            Logger.info("CitationSelection.addSelected", { id: item.id, title: item.title });
        }
    }

    function removeSelected(id) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var el = selected.html[id];
        delete selected.items[id];
        delete selected.html[id];
        if (selected.checks[id]) {
            selected.checks[id].checked = false;
            delete selected.checks[id];
        }
        if (el && elements.selectedHolder) elements.selectedHolder.removeChild(el);
        if (app.docsScroller && app.docsScroller.onscroll) app.docsScroller.onscroll();
        if (app.selectedScroller && app.selectedScroller.onscroll) app.selectedScroller.onscroll();
        checkSelected();
        if (Logger && typeof Logger.info === "function") {
            Logger.info("CitationSelection.removeSelected", { id: id });
        }
    }

    function buildSelectedElement(item) {
        var root = document.createElement("div");
        root.className = "citation-pill";

        var label = document.createElement("span");
        label.className = "citation-pill-label";
        label.textContent = getCitationPillLabel(item);
        label.setAttribute("title", "Click to edit citation parameters");
        label.onclick = function (e) {
            e.stopPropagation();
            openEditCitationDrawer(item);
        };

        var remove = document.createElement("span");
        remove.className = "citation-pill-remove";
        remove.innerHTML = "&#xd7;";
        remove.onclick = function (e) {
            e.stopPropagation();
            removeSelected(item.id);
        };

        root.appendChild(label);
        root.appendChild(remove);
        return root;
    }

    function calculateDefaultCitationText(item, prefix, suffix, locVal, locType, displayAs) {
        var pfx = (prefix ? prefix.value : "").trim();
        var sfx = (suffix ? suffix.value : "").trim();
        var lv = (locVal ? locVal.value : "").trim();
        var lt = locType ? locType.value : "page";
        var mode = displayAs ? displayAs.value : "default";
        var yr = item.year || "2025";
        var authors = item.authors && item.authors[0] ? (item.authors[0].last_name || item.authors[0].family || "Author") : "Author";
        if (item.authors && item.authors.length > 2) authors += " et al.";
        else if (item.authors && item.authors.length === 2) authors += " & " + (item.authors[1].last_name || item.authors[1].family || "");

        var locStr = lv ? (", " + (lt === "page" ? "p. " : lt + " ") + lv) : "";
        if (mode === "narrative") {
            return authors + " (" + (pfx ? pfx + " " : "") + yr + locStr + (sfx ? " " + sfx : "") + ")";
        } else if (mode === "author_only") {
            return authors;
        } else if (mode === "year_only") {
            return "(" + (pfx ? pfx + " " : "") + yr + locStr + (sfx ? " " + sfx : "") + ")";
        } else {
            return "(" + (pfx ? pfx + " " : "") + authors + ", " + yr + locStr + (sfx ? " " + sfx : "") + ")";
        }
    }

    function openEditCitationDrawer(item) {
        currentlyEditingItem = item;
        item.citationParams = item.citationParams || {
            displayAs: "default",
            locatorType: "page",
            locatorValue: "",
            prefix: "",
            suffix: ""
        };

        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var drawer = document.getElementById("editCitationDrawer");
        var main = elements.mainState;
        var docName = document.getElementById("editCitationDocName");
        var displayAs = document.getElementById("editDisplayAsSelect");
        var locType = document.getElementById("editLocatorTypeSelect");
        var locVal = document.getElementById("editLocatorValueInput");
        var prefix = document.getElementById("editPrefixInput");
        var suffix = document.getElementById("editSuffixInput");

        var overrideDrawer = document.getElementById("overrideManuallyDrawer");
        var btnOpenOverride = document.getElementById("btnOpenOverrideManually");
        var overrideTextarea = document.getElementById("manualOverrideTextarea");
        var btnRevertOverride = document.getElementById("btnRevertDefaultOverride");
        var saveOverrideBtn = document.getElementById("saveManualOverrideBtn");
        var cancelOverrideBtn = document.getElementById("cancelManualOverrideBtn");
        var overrideBackBtn = document.getElementById("overrideManuallyBackBtn");

        if (docName) docName.textContent = getCitationPillLabel(item);
        if (displayAs) displayAs.value = item.citationParams.displayAs || "default";
        if (locType) locType.value = item.citationParams.locatorType || "page";
        if (locVal) locVal.value = item.citationParams.locatorValue || "";
        if (prefix) prefix.value = item.citationParams.prefix || "";
        if (suffix) suffix.value = item.citationParams.suffix || "";

        function updatePreview() {
            var prevBox = document.getElementById("editCitationPreviewText");
            if (!prevBox) return;
            if (item.citationParams && item.citationParams.manualOverride) {
                prevBox.textContent = item.citationParams.manualOverride;
            } else {
                prevBox.textContent = calculateDefaultCitationText(item, prefix, suffix, locVal, locType, displayAs);
            }
        }

        if (displayAs) displayAs.onchange = updatePreview;
        if (locType) locType.onchange = updatePreview;
        if (locVal) locVal.oninput = updatePreview;
        if (prefix) prefix.oninput = updatePreview;
        if (suffix) suffix.oninput = updatePreview;

        updatePreview();

        function closeOverrideDrawer() {
            if (overrideDrawer) overrideDrawer.classList.add(displayNoneClass);
            if (drawer) drawer.classList.remove(displayNoneClass);
        }

        if (btnOpenOverride) {
            btnOpenOverride.onclick = function () {
                drawer.classList.add(displayNoneClass);
                overrideDrawer.classList.remove(displayNoneClass);
                if (overrideTextarea) {
                    overrideTextarea.value = (item.citationParams && item.citationParams.manualOverride) ?
                        item.citationParams.manualOverride : calculateDefaultCitationText(item, prefix, suffix, locVal, locType, displayAs);
                }
            };
        }

        if (btnRevertOverride) {
            btnRevertOverride.onclick = function () {
                if (overrideTextarea) {
                    overrideTextarea.value = calculateDefaultCitationText(item, prefix, suffix, locVal, locType, displayAs);
                }
            };
        }

        if (saveOverrideBtn) {
            saveOverrideBtn.onclick = function () {
                if (currentlyEditingItem) {
                    currentlyEditingItem.citationParams.manualOverride = overrideTextarea ? overrideTextarea.value : "";
                }
                closeOverrideDrawer();
                updatePreview();
            };
        }

        if (cancelOverrideBtn) cancelOverrideBtn.onclick = closeOverrideDrawer;
        if (overrideBackBtn) overrideBackBtn.onclick = closeOverrideDrawer;

        var saveBtn = document.getElementById("saveCitationChangesBtn");
        var cancelBtn = document.getElementById("cancelCitationChangesBtn");
        var backBtn = document.getElementById("editCitationBackBtn");

        function closeDrawer() {
            if (drawer) drawer.classList.add(displayNoneClass);
            if (main) main.classList.remove(displayNoneClass);
        }

        if (saveBtn) {
            saveBtn.onclick = function () {
                if (currentlyEditingItem) {
                    currentlyEditingItem.citationParams.displayAs = displayAs ? displayAs.value : "default";
                    currentlyEditingItem.citationParams.locatorType = locType ? locType.value : "page";
                    currentlyEditingItem.citationParams.locatorValue = locVal ? locVal.value : "";
                    currentlyEditingItem.citationParams.prefix = prefix ? prefix.value : "";
                    currentlyEditingItem.citationParams.suffix = suffix ? suffix.value : "";
                }
                closeDrawer();
            };
        }
        if (cancelBtn) cancelBtn.onclick = closeDrawer;
        if (backBtn) backBtn.onclick = closeDrawer;

        if (main) main.classList.add(displayNoneClass);
        if (drawer) drawer.classList.remove(displayNoneClass);
    }

    return {
        selected: selected,
        checkSelected: checkSelected,
        addSelected: addSelected,
        removeSelected: removeSelected,
        getCitationPillLabel: getCitationPillLabel,
        buildSelectedElement: buildSelectedElement,
        openEditCitationDrawer: openEditCitationDrawer,
        calculateDefaultCitationText: calculateDefaultCitationText,
        getCurrentlyEditingItem: function () { return currentlyEditingItem; }
    };
});
