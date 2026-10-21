(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.CollectionDrawer = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers) {

    var DRAWER_ICONS = (Constants && Constants.DRAWER_ICONS) || {};

    function renderCollectionDrawer() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var holder = elements.drawerListHolder;
        if (!holder) return;
        holder.innerHTML = "";

        var currentFilter = (app.LibraryView && app.LibraryView.currentFilter) || { type: "all", id: null, label: "All References" };

        function createItem(icon, label, filterObj) {
            var row = document.createElement("div");
            row.style.cssText = "display:flex; align-items:center; gap:12px; padding:11px 16px; cursor:pointer; font-size:13px; color:var(--text-main); border-bottom:1px solid var(--border-subtle);";
            if (currentFilter.type === filterObj.type && currentFilter.id === filterObj.id) {
                row.style.backgroundColor = "var(--brand-selection)";
                row.style.fontWeight = "600";
                row.style.color = "var(--brand-accent)";
            }
            row.innerHTML = "<span class=\"ui-icon\" style=\"width:20px; text-align:center; color:currentColor;\">" + icon + "</span><span>" + label + "</span>";
            row.onclick = function () {
                if (app.LibraryView && app.LibraryView.applyFilter) {
                    app.LibraryView.applyFilter(filterObj);
                }
            };
            return row;
        }

        function createHeader(title) {
            var hdr = document.createElement("div");
            hdr.className = "form-section-title";
            hdr.style.padding = "14px 16px 6px 16px";
            hdr.textContent = title;
            return hdr;
        }

        // Standard filter options
        holder.appendChild(createItem(DRAWER_ICONS.all, "All References", { type: "all", id: null, label: "All References" }));
        holder.appendChild(createItem(DRAWER_ICONS.recently_added, "Recently Added", { type: "recently_added", id: null, label: "Recently Added" }));
        holder.appendChild(createItem(DRAWER_ICONS.favorites, "Favorites", { type: "favorites", id: null, label: "Favorites" }));

        // Folders list
        holder.appendChild(createHeader("Collections"));
        var token = (app.Auth && app.Auth.authFlow && app.Auth.authFlow.getToken && app.Auth.authFlow.getToken()) || null;
        if (token) {
            fetch("https://api.mendeley.com/folders", {
                headers: { "Authorization": "Bearer " + token, "Accept": "application/vnd.mendeley-folder.1+json" }
            }).then(function (r) { return r.json(); }).then(function (folders) {
                if (folders && folders.length) {
                    folders.forEach(function (f) {
                        holder.appendChild(createItem(DRAWER_ICONS.folder, f.name, { type: "folder", id: f.id, label: f.name }));
                    });
                } else {
                    var emptyF = document.createElement("div");
                    emptyF.style.cssText = "padding:6px 16px; color:#999; font-size:12px; font-style:italic;";
                    emptyF.textContent = "No collections created yet";
                    holder.appendChild(emptyF);
                }
            }).catch(function () {});
        }

        // Groups list
        holder.appendChild(createHeader("Groups"));
        if (token) {
            fetch("https://api.mendeley.com/groups", {
                headers: { "Authorization": "Bearer " + token, "Accept": "application/vnd.mendeley-group.1+json" }
            }).then(function (r) { return r.json(); }).then(function (groups) {
                if (groups && groups.length) {
                    groups.forEach(function (g) {
                        holder.appendChild(createItem(DRAWER_ICONS.group, g.name, { type: "group", id: g.id, label: g.name }));
                    });
                } else {
                    var emptyG = document.createElement("div");
                    emptyG.style.cssText = "padding:6px 16px; color:#999; font-size:12px; font-style:italic;";
                    emptyG.textContent = "No groups created yet";
                    holder.appendChild(emptyG);
                }
            }).catch(function () {});
        }

        if (Logger && typeof Logger.debug === "function") {
            Logger.debug("CollectionDrawer.rendered", {});
        }
    }

    return {
        renderCollectionDrawer: renderCollectionDrawer
    };
});
