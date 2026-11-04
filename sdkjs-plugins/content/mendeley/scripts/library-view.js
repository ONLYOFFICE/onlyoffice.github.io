(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"), require("./constants"), require("./helpers"), require("./doc-card"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger", "./constants", "./helpers", "./doc-card"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.LibraryView = factory(root.MendeleyApp.Logger, root.MendeleyApp.Constants, root.MendeleyApp.Helpers, root.MendeleyApp.DocCard);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger, Constants, Helpers, DocCard) {

    var displayNoneClass = (Constants && Constants.displayNoneClass) || "display-none";

    var lastSearch = {
        text: "",
        catObj: null,
        ownObj: null
    };

    var currentFilter = {
        type: "all",
        id: null,
        label: "All References"
    };

    var waitForLoad = false;
    var loadTimeout = null;

    function shouldLoadMore(holder, currentAuthState) {
        var state = currentAuthState ||
            (typeof window !== "undefined" && window.MendeleyApp && window.MendeleyApp.Auth && window.MendeleyApp.Auth.getCurrentAuthState && window.MendeleyApp.Auth.getCurrentAuthState()) || "main";
        if (state !== "main") return false;
        if (waitForLoad) return false;

        var hasNext = (lastSearch.ownObj && typeof lastSearch.ownObj.next === "function") ||
                      (lastSearch.catObj && typeof lastSearch.catObj.next === "function");
        if (!hasNext) return false;

        var threshold = 250;
        var currentScroll = holder.scrollTop + holder.clientHeight;
        var maxScroll = holder.scrollHeight;

        return currentScroll >= (maxScroll - threshold);
    }

    function checkDocsScroll(holder) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var scrollEl = holder || elements.docsWrapper || elements.docsHolder;
        if (!scrollEl) return;

        var authState = (app.Auth && app.Auth.getCurrentAuthState && app.Auth.getCurrentAuthState()) || "main";
        if (shouldLoadMore(scrollEl, authState)) {
            if (waitForLoad) return;
            waitForLoad = true;
            clearTimeout(loadTimeout);

            loadTimeout = setTimeout(function () {
                var latestState = (app.Auth && app.Auth.getCurrentAuthState && app.Auth.getCurrentAuthState()) || "main";
                if (latestState !== "main") {
                    waitForLoad = false;
                    return;
                }

                if (lastSearch.ownObj && typeof lastSearch.ownObj.next === "function") {
                    loadLibrary(lastSearch.ownObj.next(), true, true);
                } else if (lastSearch.catObj && typeof lastSearch.catObj.next === "function") {
                    loadLibrary(lastSearch.catObj.next(), true, false);
                } else {
                    waitForLoad = false;
                }
            }, 60);
        }
    }

    function clearLibrary() {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var holder = elements.docsHolder;
        if (holder) {
            while (holder.lastChild) {
                holder.removeChild(holder.lastChild);
            }
        }
        if (elements.docsWrapper) {
            elements.docsWrapper.scrollTop = 0;
        } else if (holder) {
            holder.scrollTop = 0;
        }
        lastSearch.catObj = null;
        lastSearch.ownObj = null;
        waitForLoad = false;
        if (loadTimeout) {
            clearTimeout(loadTimeout);
            loadTimeout = null;
        }
        if (app.docsScroller && app.docsScroller.onscroll) app.docsScroller.onscroll();
        if (Logger && typeof Logger.debug === "function") {
            Logger.debug("LibraryView.clearLibrary", {});
        }
    }

    function loadLibrary(promise, append, own) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        if (Helpers && Helpers.showLibLoader) Helpers.showLibLoader(true);

        promise
            .then(function (res) {
                displaySearchItems(append, own, res, null);
                if (Logger && typeof Logger.success === "function") {
                    Logger.success("LibraryView.loadLibrary.success", { count: res && res.items ? res.items.length : 0 });
                }
            })
            .catch(function (err) {
                var status = err && err.response ? err.response.status : null;
                var errMsg = String((err && (err.message || err.statusText || err)) || "");
                if (status === 401 || errMsg.indexOf("401") !== -1 || errMsg.indexOf("Unauthorized") !== -1) {
                    if (Logger && typeof Logger.warn === "function") {
                        Logger.warn("LibraryView.tokenExpired", { status: status });
                    }
                    if (typeof localStorage !== "undefined") localStorage.removeItem("mendToken");
                    if (typeof window !== "undefined") window._activeMendToken = null;
                    clearLibrary();
                    if (app.Auth && app.Auth.switchAuthState) app.Auth.switchAuthState("login");
                    if (Helpers && Helpers.showError) Helpers.showError("Session expired or invalid token. Please login again.");
                } else {
                    displaySearchItems(append, own, null, errMsg);
                }
            })
            .finally(function () {
                if (Helpers && Helpers.showLibLoader) Helpers.showLibLoader(false);
                waitForLoad = false;
                setTimeout(function () {
                    checkDocsScroll(elements.docsWrapper);
                }, 150);
            });
    }

    function loadFilteredLibrary(append) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var sdk = app.sdk;
        if (!sdk || !sdk.documents) return;

        var params = { limit: 50, view: "bib" };
        if (lastSearch.text) {
            params.query = lastSearch.text;
        }

        if (currentFilter.type === "favorites") {
            params.starred = true;
            loadLibrary(sdk.documents.list(params), append, true);
        } else if (currentFilter.type === "recently_added") {
            params.sort = "created";
            params.order = "desc";
            loadLibrary(sdk.documents.list(params), append, true);
        } else if (currentFilter.type === "group" && currentFilter.id) {
            params.group_id = currentFilter.id;
            loadLibrary(sdk.documents.list(params), append, true);
        } else if (currentFilter.type === "folder" && currentFilter.id) {
            params.folderId = currentFilter.id;
            loadLibrary(sdk.documents.list(params), append, true);
        } else {
            if (lastSearch.text) {
                loadLibrary(sdk.documents.search(params), append, true);
            } else {
                loadLibrary(sdk.documents.list(params), append, true);
            }
        }
    }

    function displaySearchItems(append, own, res, err) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        var holder = elements.docsHolder;
        if (!holder) return;

        if (!append) {
            clearLibrary();
        }

        var first = false;
        if (own) {
            if (!lastSearch.ownObj) first = true;
            if (err) {
                if (first) lastSearch.ownObj = {};
                lastSearch.ownObj.next = null;
            } else {
                lastSearch.ownObj = res;
            }
        } else {
            if (!lastSearch.catObj) first = true;
            if (err) {
                if (first) lastSearch.catObj = {};
                lastSearch.catObj.next = null;
            } else {
                lastSearch.catObj = res;
            }
        }

        if (!own && first) {
            var divider = document.createElement("div");
            divider.textContent = (Helpers && Helpers.getMessage) ? Helpers.getMessage("Search in all literature:") : "Search in all literature:";
            divider.classList.add("searchDivider", "defaultlable");
            holder.appendChild(divider);
        }

        var page = document.createElement("div");
        page.classList.add("page" + holder.children.length);
        var cardBuilder = (app.DocCard && app.DocCard.buildDocElement) || (DocCard && DocCard.buildDocElement);

        if (res && res.items && res.items.length > 0) {
            for (var i = 0; i < res.items.length; i++) {
                if (cardBuilder) page.appendChild(cardBuilder(res.items[i]));
            }
        } else if (err || first) {
            if (err) {
                if (Helpers && Helpers.showError) Helpers.showError(err);
            } else {
                var notFound = document.createElement("div");
                notFound.textContent = own ?
                    ((Helpers && Helpers.getMessage) ? Helpers.getMessage("Nothing found in your library") : "Nothing found in your library") :
                    ((Helpers && Helpers.getMessage) ? Helpers.getMessage("Nothing found") : "Nothing found");
                notFound.classList.add("searchInfo", "defaultlable");
                page.appendChild(notFound);
            }
        }
        holder.appendChild(page);

        if (app.docsScroller && app.docsScroller.onscroll) app.docsScroller.onscroll();
    }

    function searchFor(text) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        if (elements.mainState && elements.mainState.classList.contains(displayNoneClass)) return;

        text = (text || "").trim();
        if (text === lastSearch.text) return;
        lastSearch.text = text;
        lastSearch.catObj = null;
        lastSearch.ownObj = null;

        clearLibrary();
        loadFilteredLibrary(false);
    }

    function applyFilter(filter) {
        var app = (typeof window !== "undefined" && window.MendeleyApp) || {};
        var elements = app.elements || {};
        currentFilter = filter;
        if (elements.currentCollectionLabel) elements.currentCollectionLabel.textContent = filter.label;
        if (elements.searchField) elements.searchField.value = "";
        lastSearch.text = "";
        clearLibrary();

        if (elements.collectionDrawer) elements.collectionDrawer.classList.add(displayNoneClass);
        if (elements.mainState) elements.mainState.classList.remove(displayNoneClass);

        loadFilteredLibrary(false);
    }

    return {
        lastSearch: lastSearch,
        currentFilter: currentFilter,
        shouldLoadMore: shouldLoadMore,
        checkDocsScroll: checkDocsScroll,
        clearLibrary: clearLibrary,
        loadLibrary: loadLibrary,
        loadFilteredLibrary: loadFilteredLibrary,
        displaySearchItems: displaySearchItems,
        searchFor: searchFor,
        applyFilter: applyFilter
    };
});
