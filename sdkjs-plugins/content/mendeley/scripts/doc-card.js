(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.DocCard = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {

    function buildDocElement(item) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var Selection = app.CitationSelection || {};
        var selItems = (Selection.selected && Selection.selected.items) || {};
        var selChecks = (Selection.selected && Selection.selected.checks) || {};

        var root = document.createElement("div");
        root.className = "doc-card";

        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.className = "doc-checkbox";
        if (selItems[item.id]) {
            check.checked = true;
            selChecks[item.id] = check;
            root.classList.add("selected");
        }

        var docInfo = document.createElement("div");
        docInfo.className = "doc-content";

        var title = document.createElement("div");
        title.textContent = item.title;
        title.className = "doc-title";
        docInfo.appendChild(title);

        if (item.authors && item.authors.length > 0) {
            var authors = document.createElement("div");
            authors.textContent = item.authors
                .map(function (a) { return (a.last_name || a.family || "") + ", " + (a.first_name || a.given || ""); })
                .join("; ");
            authors.setAttribute("title", authors.textContent);
            authors.className = "doc-authors";
            docInfo.appendChild(authors);
        }

        var source = document.createElement("div");
        if (item.source || item.publisher) {
            source.textContent = item.source || item.publisher;
        }
        if (item.year) {
            if (source.textContent) {
                source.textContent += " (" + item.year + ")";
            } else {
                source.textContent = item.year;
            }
        }
        source.setAttribute("title", source.textContent);
        source.className = "doc-source";
        docInfo.appendChild(source);

        root.appendChild(check);
        root.appendChild(docInfo);

        check.onclick = function (e) {
            e.stopPropagation();
            if (check.checked) {
                root.classList.add("selected");
                if (Selection.addSelected) Selection.addSelected(item, check);
            } else {
                root.classList.remove("selected");
                if (Selection.removeSelected) Selection.removeSelected(item.id);
            }
        };

        docInfo.onclick = function () {
            check.checked = !check.checked;
            if (check.checked) {
                root.classList.add("selected");
                if (Selection.addSelected) Selection.addSelected(item, check);
            } else {
                root.classList.remove("selected");
                if (Selection.removeSelected) Selection.removeSelected(item.id);
            }
        };

        return root;
    }

    return {
        buildDocElement: buildDocElement
    };
});
