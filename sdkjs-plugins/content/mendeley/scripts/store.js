(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory(require("./logger"));
    } else if (typeof define === "function" && define.amd) {
        define(["./logger"], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.Store = factory(root.MendeleyApp.Logger);
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function (Logger) {

    // Initial state tree
    var initialAppState = {
        auth: {
            state: "login",
            token: null,
            appId: null,
            redirectUrl: ""
        },
        library: {
            items: [],
            currentFilter: {
                type: "all",
                id: null,
                label: "All References"
            },
            searchQuery: "",
            isLoading: false,
            error: null
        },
        selection: {
            items: {},
            html: {},
            checks: {},
            currentlyEditing: null
        },
        csl: {
            selectedStyle: "apa",
            selectedLocale: "en-US",
            stylesCache: {},
            localesCache: {}
        }
    };

    // Redux Root Reducer
    function appReducer(state, action) {
        if (!state) state = initialAppState;
        switch (action.type) {
            case "AUTH_SET_STATE":
                return Object.assign({}, state, {
                    auth: Object.assign({}, state.auth, { state: action.payload })
                });
            case "AUTH_SET_TOKEN":
                return Object.assign({}, state, {
                    auth: Object.assign({}, state.auth, { token: action.payload })
                });
            case "AUTH_SET_APP_ID":
                return Object.assign({}, state, {
                    auth: Object.assign({}, state.auth, { appId: action.payload })
                });
            case "AUTH_SET_REDIRECT_URL":
                return Object.assign({}, state, {
                    auth: Object.assign({}, state.auth, { redirectUrl: action.payload })
                });
            case "LIBRARY_SET_FILTER":
                return Object.assign({}, state, {
                    library: Object.assign({}, state.library, { currentFilter: action.payload })
                });
            case "LIBRARY_SET_SEARCH":
                return Object.assign({}, state, {
                    library: Object.assign({}, state.library, { searchQuery: action.payload })
                });
            case "LIBRARY_SET_LOADING":
                return Object.assign({}, state, {
                    library: Object.assign({}, state.library, { isLoading: action.payload })
                });
            case "LIBRARY_SET_ERROR":
                return Object.assign({}, state, {
                    library: Object.assign({}, state.library, { error: action.payload })
                });
            case "SELECTION_ADD_ITEM":
                var newItems = Object.assign({}, state.selection.items);
                newItems[action.payload.id] = action.payload.item;
                return Object.assign({}, state, {
                    selection: Object.assign({}, state.selection, { items: newItems })
                });
            case "SELECTION_REMOVE_ITEM":
                var remItems = Object.assign({}, state.selection.items);
                delete remItems[action.payload];
                return Object.assign({}, state, {
                    selection: Object.assign({}, state.selection, { items: remItems })
                });
            case "SELECTION_CLEAR":
                return Object.assign({}, state, {
                    selection: Object.assign({}, state.selection, { items: {}, html: {}, checks: {} })
                });
            case "SELECTION_SET_EDITING":
                return Object.assign({}, state, {
                    selection: Object.assign({}, state.selection, { currentlyEditing: action.payload })
                });
            case "CSL_SET_STYLE":
                return Object.assign({}, state, {
                    csl: Object.assign({}, state.csl, { selectedStyle: action.payload })
                });
            case "CSL_SET_LOCALE":
                return Object.assign({}, state, {
                    csl: Object.assign({}, state.csl, { selectedLocale: action.payload })
                });
            default:
                return state;
        }
    }

    // Redux Store Implementation
    function createStore(reducer, preloadedState) {
        var currentReducer = reducer;
        var currentState = preloadedState || initialAppState;
        var currentListeners = [];

        function getState() {
            return currentState;
        }

        function subscribe(listener) {
            if (typeof listener !== "function") {
                throw new Error("Expected the listener to be a function.");
            }
            var isSubscribed = true;
            currentListeners.push(listener);

            return function unsubscribe() {
                if (!isSubscribed) return;
                isSubscribed = false;
                var index = currentListeners.indexOf(listener);
                currentListeners.splice(index, 1);
            };
        }

        function dispatch(action) {
            if (!action || typeof action.type !== "string") {
                throw new Error("Actions must be plain objects with a string type property.");
            }
            currentState = currentReducer(currentState, action);
            if (Logger && typeof Logger.debug === "function") {
                Logger.debug("Store.dispatch", { actionType: action.type, actionPayload: action.payload });
            }
            for (var i = 0; i < currentListeners.length; i++) {
                currentListeners[i]();
            }
            return action;
        }

        dispatch({ type: "@@redux/INIT" });

        return {
            getState: getState,
            dispatch: dispatch,
            subscribe: subscribe
        };
    }

    var defaultStore = createStore(appReducer, initialAppState);

    return {
        createStore: createStore,
        appReducer: appReducer,
        initialAppState: initialAppState,
        store: defaultStore
    };
});
