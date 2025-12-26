/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
var Theme = {
    addStylesForComponents: function addStylesForComponents(theme) {
        var styles = "";
        if (theme["background-toolbar"]) {
            styles += ".loader-body,\n" + ".loader-bg { background-color: " + theme["background-toolbar"] + "; }\n";
            styles += ".loader-body {     box-shadow: 0 0 99px 99px " + theme["background-toolbar"] + "; }\n";
        }
        if (theme["background-loader"]) {
            styles += ".loader-image { color: " + theme["background-loader"] + "; }\n";
        }
        if (theme["background-normal"]) {
            styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".input-field-element,\n" + ".selectbox-search-input,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".radio-visual, \n" + ".checkbox-visual, \n" + ".message { background-color: " + theme["background-normal"] + "; }\n";
        }
        if (theme["text-inverse"]) {
            styles += ".custom-button-primary { color: " + theme["text-inverse"] + "; }\n";
        }
        if (theme["border-regular-control"]) {
            styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".input-field-element,\n" + ".checkbox-visual,\n" + ".radio-visual,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".selectbox-search-input:focus,\n" + ".message { border-color: " + theme["border-regular-control"] + "; }\n";
            styles += ".selectbox-search,\n" + ".selectbox-option-divider { border-color: " + theme["border-regular-control"] + " !important; }\n";
        }
        if (theme["border-error"]) {
            styles += ".input-field-invalid .input-field-element { border-color: " + theme["border-error"] + "; }\n";
        }
        if (theme["border-control-focus"]) {
            styles += ".custom-button-icon-only:focus:not(:active):not(:hover),\n" + ".custom-button-secondary-icon:focus:not(:active):not(:hover),\n" + ".custom-button-secondary:focus:not(:active):not(:hover),\n" + ".input-field-element:focus,\n" + ".input-field-focused .input-field-element,\n" + ".selectbox-header:active,\n" + ".selectbox-header:focus,\n" + ".selectbox-header-open { border-color: " + theme["border-control-focus"] + "; }\n";
        }
        if (theme["highlight-button-hover"]) {
            styles += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".selectbox-custom-option:hover,\n" + ".selectbox-option:hover { background-color: " + theme["highlight-button-hover"] + "; }\n";
        }
        if (theme["highlight-button-pressed"]) {
            styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".selectbox-option-selected:hover,\n" + ".selectbox-option-selected { background-color: " + theme["highlight-button-pressed"] + "; }\n";
            styles += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + theme["highlight-button-pressed"] + "; }\n";
        }
        if (theme["highlight-primary-dialog-button-hover"]) {
            styles += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + theme["highlight-primary-dialog-button-hover"] + "; border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
        }
        if (theme["background-primary-dialog-button"]) {
            styles += ".checkbox-indeterminate,\n" + ".custom-button-primary { background-color: " + theme["background-primary-dialog-button"] + "; border-color: " + theme["background-primary-dialog-button"] + "; }\n";
        }
        if (theme["background-toolbar-additional"]) {
            styles += ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled { background-color: " + theme["background-toolbar-additional"] + "; border-color: " + theme["background-toolbar-additional"] + "; }\n";
        }
        if (theme["text-normal"]) {
            styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".custom-button-icon-only,\n" + ".selectbox-search-input,\n" + ".loader-image,\n" + ".input-field-element { color: " + theme["text-normal"] + "; }\n";
            styles += ".input-field-search-icon svg { fill: " + theme["text-normal"] + "; }\n";
        }
        if (theme["text-secondary"]) {
            styles += ".message-close:hover,\n" + ".input-field-clear:hover { color: " + theme["text-secondary"] + "; }\n";
        }
        if (theme["text-tertiary"]) {
            styles += ".input-field-clear,\n" + ".message-container:hover .message-close,\n" + ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled,\n" + ".input-field-element::placeholder,\n" + ".selectbox-search-input::placeholder { color: " + theme["text-tertiary"] + "; }\n";
        }
        var fontSize = "11px";
        if ([ "theme-white", "theme-night" ].indexOf(theme.name) !== -1 || [ "theme-white", "theme-night" ].indexOf(theme.Name) !== -1) {
            fontSize = "12px";
            styles += ".message,\n" + ".custom-button,\n" + ".selectbox-header,\n" + ".input-field-element { border-radius: 4px; }\n";
            styles += ".radio--checked .radio-visual { border-width: 4px; }\n";
            styles += ".checkbox-checkmark { color: " + theme["text-inverse"] + "; }\n";
            styles += ".checkbox--checked .checkbox-visual { background-color: " + theme["background-primary-dialog-button"] + "; }\n";
            styles += ".radio--checked .radio-visual,\n" + ".checkbox--checked .checkbox-visual { border-color: " + theme["background-primary-dialog-button"] + "; }\n";
            styles += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n" + ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + theme["highlight-button-hover"] + "; }\n";
            styles += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + theme["highlight-primary-dialog-button-hover"] + "; background-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
            styles += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
            styles += "body { font-size: 12px; }\n";
        } else {
            styles += ".checkbox-checkmark { color: " + theme["text-normal"] + "; }\n";
            styles += ".radio--checked .radio-visual { background-color: " + theme["text-normal"] + ";\n box-shadow: 0 0 0 2px" + theme["background-normal"] + " inset; }\n";
            styles += ".radio-button-container:hover .radio-visual,\n" + ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + theme["border-control-focus"] + "; }\n";
        }
        styles += "body, input, textarea, select, button { font-size: " + fontSize + "; }\n";
        var styleTheme = document.getElementById("componentsStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "componentsStyles";
            styleTheme.innerHTML = styles;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
            return styles;
        }
        styleTheme.innerHTML = styles;
        return styles;
    },
    fixThemeForIE: function fixThemeForIE(theme) {
        if (!theme["background-toolbar"]) {
            theme["background-toolbar"] = "#f7f7f7";
        }
        if (!theme["text-normal"]) {
            theme["text-normal"] = "rgb(51, 51, 51)";
        }
        if (!theme["text-secondary"]) {
            theme["text-secondary"] = "#848484";
        }
        if (!theme["highlight-button-hover"]) {
            theme["highlight-button-hover"] = "#e0e0e0";
        }
        if (!theme["background-normal"]) {
            theme["background-normal"] = "white";
        }
        if (!theme["background-loader"]) {
            theme["background-loader"] = "rgba(24, 24, 24, 0.9)";
        }
        if (!theme["highlight-button-pressed"]) {
            theme["highlight-button-pressed"] = "#cbcbcb";
        }
        if (!theme["text-inverse"]) {
            theme["text-inverse"] = "white";
        }
        if (!theme["border-regular-control"]) {
            theme["border-regular-control"] = "#c0c0c0";
        }
        if (!theme["border-error"]) {
            theme["border-error"] = "#f62211";
        }
        if (!theme["border-control-focus"]) {
            theme["border-control-focus"] = "#848484";
        }
        if (!theme["highlight-primary-dialog-button-hover"]) {
            theme["highlight-primary-dialog-button-hover"] = "#1c1c1c";
        }
        if (!theme["background-primary-dialog-button"]) {
            theme["background-primary-dialog-button"] = "#444444";
        }
        if (!theme["background-toolbar-additional"]) {
            theme["background-toolbar-additional"] = "#efefef";
        }
        if (!theme["text-tertiary"]) {
            theme["text-tertiary"] = "#bdbdbd";
        }
        return theme;
    }
};

function Router() {
    this._states = [ "mainState", "loginState", "settingsState" ];
    this._routes = [ "main", "login", "settings" ];
    this._currentRoute = "login";
    this._currentRouteIndex = 1;
    this._containers = this._states.map(function(route) {
        var container = document.getElementById(route);
        if (!container) throw new Error("container ".concat(route, " not found"));
        return container;
    });
}

Router.prototype.getRoute = function() {
    return this._currentRoute;
};

Router.prototype._setCurrentRoute = function(route) {
    this._containers[this._currentRouteIndex].classList.add("hidden");
    this._currentRoute = route;
    this._currentRouteIndex = this._routes.indexOf(route);
    this._containers[this._currentRouteIndex].classList.remove("hidden");
};

Router.prototype.openMain = function() {
    this._setCurrentRoute("main");
};

Router.prototype.openLogin = function() {
    this._setCurrentRoute("login");
};

Router.prototype.openSettings = function() {
    this._setCurrentRoute("settings");
};

var zoteroEnvironment = {
    restApiUrl: "https://api.zotero.org/",
    desktopApiUrl: "http://127.0.0.1:23119/api/"
};

var ZoteroApiChecker = {
    _done: false,
    _desktop: false,
    _hasPermission: true,
    _online: false,
    _hasKey: false,
    _timeout: 1e3,
    _callback: function _callback(e) {},
    _desktopVersion: function() {
        if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return false;
        if (window.location && window.location.protocol == "file:") return true;
        var src = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
        if (src && 0 == src.indexOf("file:///")) return true;
        return false;
    }(),
    runApisChecker: function runApisChecker(sdk) {
        var self = this;
        self._done = false;
        function attemptCheck() {
            if (self._done) return;
            self._checkApiAvailable(sdk).then(function(res) {
                if (self._done) return;
                if (res.online && res.hasKey) {
                    self._done = true;
                } else if (res.desktop && res.hasPermission) {
                    self._done = true;
                }
                self._callback(res);
                setTimeout(attemptCheck, self._timeout);
            });
        }
        attemptCheck();
        return {
            subscribe: function subscribe(callbackFn) {
                self._callback = callbackFn;
            },
            unsubscribe: function unsubscribe() {
                self._done = true;
                self._callback = function() {};
            }
        };
    },
    checkStatus: function checkStatus(sdk) {
        return this._checkApiAvailable(sdk);
    },
    successfullyLoggedInUsingApiKey: function successfullyLoggedInUsingApiKey() {
        this._done = true;
        this._callback({
            online: true,
            hasKey: true,
            desktop: this._desktop,
            hasPermission: this._hasPermission,
            desktopVersion: this._desktopVersion
        });
    },
    _checkApiAvailable: function _checkApiAvailable(sdk) {
        var self = this;
        return Promise.all([ fetch(zoteroEnvironment.restApiUrl, {
            method: "GET",
            cache: "no-cache"
        }).then(function(res) {
            return res.status === 200;
        }).catch(function() {
            return false;
        }), self._sendDesktopRequest(zoteroEnvironment.desktopApiUrl).then(function(res) {
            self._hasPermission = res.hasPermission;
            return res.isZoteroRunning;
        }).catch(function() {
            return false;
        }) ]).then(function(apisAvailable) {
            self._online = apisAvailable[0];
            self._desktop = apisAvailable[1];
            self._hasKey = sdk.hasSettings();
            return {
                online: self._online,
                hasKey: self._hasKey,
                desktop: self._desktop,
                hasPermission: self._hasPermission,
                desktopVersion: self._desktopVersion
            };
        });
    },
    _sendDesktopRequest: function _sendDesktopRequest(url) {
        var self = this;
        return new Promise(function(resolve, reject) {
            if (!self._desktopVersion) {
                resolve({
                    hasPermission: false,
                    isZoteroRunning: false
                });
                return;
            }
            window.AscSimpleRequest.createRequest({
                url: url,
                method: "GET",
                headers: {
                    "Zotero-API-Version": "3",
                    "User-Agent": "AscDesktopEditor"
                },
                complete: function complete(e) {
                    var hasPermission = false;
                    var isZoteroRunning = false;
                    if (e.responseStatus == 403) {
                        hasPermission = false;
                        isZoteroRunning = true;
                    } else if (e.responseStatus === 200) {
                        isZoteroRunning = true;
                        hasPermission = true;
                    }
                    resolve({
                        hasPermission: hasPermission,
                        isZoteroRunning: isZoteroRunning
                    });
                },
                error: function error(e) {
                    if (e.statusCode == -102) e.statusCode = 404;
                    reject(e);
                }
            });
        });
    }
};

function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
}

function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
        var i = n[a](c), u = i.value;
    } catch (n) {
        return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
}

function _asyncToGenerator(n) {
    return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
            }
            function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
            }
            _next(void 0);
        });
    };
}

function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}

function _classPrivateFieldGet2(s, a) {
    return s.get(_assertClassBrand(s, a));
}

function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
}

function _classPrivateFieldSet2(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
}

function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
}

function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
    }) : e[r] = t, e;
}

function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}

function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
            _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}

function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r);
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}

function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
}

var _maxRetries = new WeakMap;

var _initialDelay = new WeakMap;

var _maxDelay = new WeakMap;

var _backoffFactor = new WeakMap;

var _retryOn = new WeakMap;

var _requestLimit = new WeakMap;

var _requestWindow = new WeakMap;

var _requestTimestamps = new WeakMap;

var _requestCount = new WeakMap;

var _lastRequestTime = new WeakMap;

var _RateLimitedFetcher_brand = new WeakSet;

class RateLimitedFetcher {
    constructor() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classPrivateMethodInitSpec(this, _RateLimitedFetcher_brand);
        _classPrivateFieldInitSpec(this, _maxRetries, void 0);
        _classPrivateFieldInitSpec(this, _initialDelay, void 0);
        _classPrivateFieldInitSpec(this, _maxDelay, void 0);
        _classPrivateFieldInitSpec(this, _backoffFactor, void 0);
        _classPrivateFieldInitSpec(this, _retryOn, void 0);
        _classPrivateFieldInitSpec(this, _requestLimit, void 0);
        _classPrivateFieldInitSpec(this, _requestWindow, void 0);
        _classPrivateFieldInitSpec(this, _requestTimestamps, void 0);
        _classPrivateFieldInitSpec(this, _requestCount, void 0);
        _classPrivateFieldInitSpec(this, _lastRequestTime, void 0);
        _classPrivateFieldSet2(_maxRetries, this, options.maxRetries || 5);
        _classPrivateFieldSet2(_initialDelay, this, options.initialDelay || 1e3);
        _classPrivateFieldSet2(_maxDelay, this, options.maxDelay || 5e3);
        _classPrivateFieldSet2(_backoffFactor, this, options.backoffFactor || 2);
        _classPrivateFieldSet2(_retryOn, this, options.retryOn || [ 429, 502, 503, 504 ]);
        _classPrivateFieldSet2(_requestLimit, this, 10);
        _classPrivateFieldSet2(_requestWindow, this, 5e3);
        _classPrivateFieldSet2(_requestTimestamps, this, []);
        _classPrivateFieldSet2(_requestCount, this, 0);
        _classPrivateFieldSet2(_lastRequestTime, this, 0);
    }
    fetchWithRetry(url, headers, attempt) {
        var _this = this;
        return _asyncToGenerator(function*() {
            try {
                yield _assertClassBrand(_RateLimitedFetcher_brand, _this, _checkAndApplyRateLimit).call(_this);
                var response = yield fetch(url, {
                    headers: headers
                });
                if (response.ok) {
                    return response;
                }
                if (_classPrivateFieldGet2(_retryOn, _this).includes(response.status) && attempt < _classPrivateFieldGet2(_maxRetries, _this)) {
                    var delay = _assertClassBrand(_RateLimitedFetcher_brand, _this, _calculateDelay).call(_this, attempt, response);
                    console.log("Attempt ".concat(attempt + 1, "/").concat(_classPrivateFieldGet2(_maxRetries, _this), " failed with ").concat(response.status, ". Retrying in ").concat(delay, "ms"));
                    yield _assertClassBrand(_RateLimitedFetcher_brand, _this, _delay).call(_this, delay);
                    return _this.fetchWithRetry(url, headers, attempt + 1);
                }
                throw new Error("".concat(response.status, " ").concat(response.statusText));
            } catch (error) {
                if (attempt >= _classPrivateFieldGet2(_maxRetries, _this)) {
                    var message = "";
                    if (error instanceof Error) {
                        message = error.message;
                    }
                    throw new Error("Request failed after ".concat(_classPrivateFieldGet2(_maxRetries, _this), " attempts: ").concat(message));
                }
                if (attempt < _classPrivateFieldGet2(_maxRetries, _this)) {
                    var _delay2 = _assertClassBrand(_RateLimitedFetcher_brand, _this, _calculateDelay).call(_this, attempt);
                    console.log("Network error on attempt ".concat(attempt + 1, ". Retrying in ").concat(_delay2, "ms"));
                    yield _assertClassBrand(_RateLimitedFetcher_brand, _this, _delay).call(_this, _delay2);
                    return _this.fetchWithRetry(url, headers, attempt + 1);
                }
                throw error;
            }
        })();
    }
    resetCounter() {
        _classPrivateFieldSet2(_requestTimestamps, this, []);
        _classPrivateFieldSet2(_requestCount, this, 0);
        _classPrivateFieldSet2(_lastRequestTime, this, 0);
    }
}

function _cleanupOldRequests() {
    var now = Date.now();
    _classPrivateFieldSet2(_requestTimestamps, this, _classPrivateFieldGet2(_requestTimestamps, this).filter(timestamp => now - timestamp < _classPrivateFieldGet2(_requestWindow, this)));
}

function _checkAndApplyRateLimit() {
    return _checkAndApplyRateLimit2.apply(this, arguments);
}

function _checkAndApplyRateLimit2() {
    _checkAndApplyRateLimit2 = _asyncToGenerator(function*() {
        var _this$requestCount;
        _assertClassBrand(_RateLimitedFetcher_brand, this, _cleanupOldRequests).call(this);
        if (_classPrivateFieldGet2(_requestTimestamps, this).length >= _classPrivateFieldGet2(_requestLimit, this)) {
            var oldestRequest = _classPrivateFieldGet2(_requestTimestamps, this)[0];
            var timeSinceOldest = Date.now() - oldestRequest;
            if (timeSinceOldest < _classPrivateFieldGet2(_requestWindow, this)) {
                var waitTime = 500 * _classPrivateFieldGet2(_requestTimestamps, this).length - _classPrivateFieldGet2(_requestLimit, this);
                if (waitTime < 0) {
                    waitTime = 0;
                    console.warn("Wait time is less than 0");
                }
                console.log("Rate limit prevention: ".concat(_classPrivateFieldGet2(_requestTimestamps, this).length, " requests in last ").concat(_classPrivateFieldGet2(_requestWindow, this), "ms. Waiting ").concat(waitTime, "ms..."));
                yield _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, waitTime);
                _assertClassBrand(_RateLimitedFetcher_brand, this, _cleanupOldRequests).call(this);
            }
        }
        _classPrivateFieldGet2(_requestTimestamps, this).push(Date.now());
        _classPrivateFieldSet2(_requestCount, this, (_this$requestCount = _classPrivateFieldGet2(_requestCount, this), 
        _this$requestCount++, _this$requestCount));
        var now = Date.now();
        var timeSinceLastRequest = now - _classPrivateFieldGet2(_lastRequestTime, this);
        var minDelay = 100;
        if (timeSinceLastRequest < minDelay && _classPrivateFieldGet2(_lastRequestTime, this) > 0) {
            yield _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, minDelay - timeSinceLastRequest);
        }
        _classPrivateFieldSet2(_lastRequestTime, this, Date.now());
    });
    return _checkAndApplyRateLimit2.apply(this, arguments);
}

function _calculateDelay(attempt) {
    var response = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var retryAfterHeader = response === null || response === void 0 ? void 0 : response.headers.get("Retry-After");
    if (retryAfterHeader) {
        var seconds = parseInt(retryAfterHeader);
        if (seconds > 86400) {
            var timestamp = parseInt(retryAfterHeader) * 1e3;
            return Math.max(0, timestamp - Date.now());
        }
        return seconds * 1e3;
    }
    var exponentialDelay = _classPrivateFieldGet2(_initialDelay, this) * Math.pow(_classPrivateFieldGet2(_backoffFactor, this), attempt);
    var jitter = Math.random() * 1e3;
    return Math.min(exponentialDelay + jitter, _classPrivateFieldGet2(_maxDelay, this));
}

function _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var ZoteroSdk = function ZoteroSdk() {
    this._apiKey = null;
    this._userId = 0;
    this._userGroups = [];
    this._isOnlineAvailable = true;
    this._fetcher = new RateLimitedFetcher({
        maxRetries: 5,
        initialDelay: 5e3
    });
};

ZoteroSdk.prototype.ZOTERO_API_VERSION = "3";

ZoteroSdk.prototype.USER_AGENT = "AscDesktopEditor";

ZoteroSdk.prototype.DEFAULT_FORMAT = "csljson";

ZoteroSdk.prototype.STORAGE_KEYS = {
    USER_ID: "zoteroUserId",
    API_KEY: "zoteroApiKey"
};

ZoteroSdk.prototype.API_PATHS = {
    USERS: "users",
    GROUPS: "groups",
    ITEMS: "items",
    KEYS: "keys"
};

ZoteroSdk.prototype._getBaseUrl = function() {
    return this._isOnlineAvailable ? zoteroEnvironment.restApiUrl : zoteroEnvironment.desktopApiUrl;
};

ZoteroSdk.prototype._getDesktopRequest = function(url) {
    var self = this;
    return new Promise(function(resolve, reject) {
        window.AscSimpleRequest.createRequest({
            url: url,
            method: "GET",
            headers: {
                "Zotero-API-Version": self.ZOTERO_API_VERSION,
                "User-Agent": self.USER_AGENT
            },
            complete: resolve,
            error: function error(_error) {
                if (_error.statusCode === -102) {
                    _error.statusCode = 404;
                    _error.message = "Connection to Zotero failed. Make sure Zotero is running";
                }
                reject(_error);
            }
        });
    });
};

ZoteroSdk.prototype._getOnlineRequest = function(url) {
    var headers = {
        "Zotero-API-Version": this.ZOTERO_API_VERSION,
        "Zotero-API-Key": this._apiKey || ""
    };
    return fetch(url, {
        headers: headers
    }).then(function(response) {
        if (!response.ok) {
            var message = response.status + " " + response.statusText;
            console.error(message);
            throw new Error(message);
        }
        return response;
    }).catch(function(error) {
        if (typeof error === "object") {
            error.message = "Connection to Zotero failed";
        }
        throw error;
    });
};

ZoteroSdk.prototype._getRequestWithOfflineSupport = function(url) {
    return this._isOnlineAvailable ? this._getOnlineRequest(url) : this._getDesktopRequest(url.href);
};

ZoteroSdk.prototype._buildGetRequest = function(path, queryParams) {
    queryParams = queryParams || {};
    var url = new URL(path, this._getBaseUrl());
    Object.keys(queryParams).forEach(function(key) {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            url.searchParams.append(key, queryParams[key]);
        }
    });
    return this._getRequestWithOfflineSupport(url);
};

ZoteroSdk.prototype._parseLinkHeader = function(headerValue) {
    var links = {};
    var linkHeaderRegex = /<(.*?)>; rel="(.*?)"/g;
    if (!headerValue) return links;
    var match;
    while ((match = linkHeaderRegex.exec(headerValue.trim())) !== null) {
        links[match[2]] = match[1];
    }
    return links;
};

ZoteroSdk.prototype._parseDesktopItemsResponse = function(promise, resolve, reject, id) {
    return promise.then(function(response) {
        return {
            items: JSON.parse(response.responseText),
            id: id
        };
    }).then(resolve).catch(reject);
};

ZoteroSdk.prototype._parseItemsResponse = function(promise, resolve, reject, id) {
    var self = this;
    return promise.then(function(response) {
        return Promise.all([ response.json(), response ]);
    }).then(function(results) {
        var json = results[0];
        var response = results[1];
        var links = self._parseLinkHeader(response.headers.get("Link") || "");
        var result = {
            items: json,
            id: id
        };
        if (typeof json === "object" && json.items) {
            result.items = json.items;
        }
        if (links.next) {
            result.next = function() {
                return new Promise(function(rs, rj) {
                    self._parseItemsResponse(self._getOnlineRequest(new URL(links.next)), rs, rj, id);
                });
            };
        }
        resolve(result);
    }).catch(reject);
};

ZoteroSdk.prototype._parseResponse = function(promise, resolve, reject, id) {
    if (this._isOnlineAvailable) {
        var fetchPromise = promise;
        this._parseItemsResponse(fetchPromise, resolve, reject, id);
    } else {
        var ascSimplePromise = promise;
        this._parseDesktopItemsResponse(ascSimplePromise, resolve, reject, id);
    }
};

ZoteroSdk.prototype.getItems = function(search, itemsID, format) {
    var self = this;
    format = format || self.DEFAULT_FORMAT;
    return new Promise(function(resolve, reject) {
        var queryParams = {
            format: format
        };
        if (search) {
            queryParams.q = search;
        } else if (itemsID) {
            queryParams.itemKey = itemsID.join(",");
        }
        var path = self.API_PATHS.USERS + "/" + self._userId + "/" + self.API_PATHS.ITEMS;
        var request = self._buildGetRequest(path, queryParams);
        return self._parseResponse(request, resolve, reject, self._userId);
    });
};

ZoteroSdk.prototype.getGroupItems = function(search, groupId, itemsID, format) {
    var self = this;
    format = format || self.DEFAULT_FORMAT;
    return new Promise(function(resolve, reject) {
        var queryParams = {
            format: format
        };
        if (search) {
            queryParams.q = search;
        } else if (itemsID) {
            queryParams.itemKey = itemsID.join(",");
        }
        var path = self.API_PATHS.GROUPS + "/" + groupId + "/" + self.API_PATHS.ITEMS;
        var request = self._buildGetRequest(path, queryParams);
        return self._parseResponse(request, resolve, reject, groupId);
    });
};

ZoteroSdk.prototype.getUserGroups = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        if (self._userGroups.length > 0) {
            resolve(self._userGroups);
            return;
        }
        var path = self.API_PATHS.USERS + "/" + self._userId + "/groups";
        self._buildGetRequest(path).then(function(response) {
            if (self._isOnlineAvailable) {
                var fetchResponse = response;
                if (!fetchResponse.ok) {
                    throw new Error(fetchResponse.status + " " + fetchResponse.statusText);
                }
                return fetchResponse.json();
            }
            var ascSimpleResponse = response;
            return JSON.parse(ascSimpleResponse.responseText);
        }).then(function(groups) {
            self._userGroups = groups.map(function(group) {
                return {
                    id: group.id,
                    name: group.data.name
                };
            });
            resolve(self._userGroups);
        }).catch(reject);
    });
};

ZoteroSdk.prototype.setApiKey = function(key) {
    var self = this;
    var path = this.API_PATHS.KEYS + "/" + key;
    return this._buildGetRequest(path).then(function(response) {
        var fetchResponse = response;
        if (!fetchResponse.ok) {
            throw new Error(fetchResponse.status + " " + fetchResponse.statusText);
        }
        return fetchResponse.json();
    }).then(function(keyData) {
        self._saveSettings(keyData.userID, key);
        return true;
    });
};

ZoteroSdk.prototype._applySettings = function(userId, apiKey) {
    this._userId = userId;
    this._apiKey = apiKey;
};

ZoteroSdk.prototype._saveSettings = function(userId, apiKey) {
    this._applySettings(userId, apiKey);
    localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(userId));
    localStorage.setItem(this.STORAGE_KEYS.API_KEY, apiKey);
};

ZoteroSdk.prototype.hasSettings = function() {
    var userId = localStorage.getItem(this.STORAGE_KEYS.USER_ID);
    var apiKey = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
    if (userId && apiKey) {
        this._applySettings(Number(userId), apiKey);
        return true;
    }
    return false;
};

ZoteroSdk.prototype.clearSettings = function() {
    localStorage.removeItem(this.STORAGE_KEYS.USER_ID);
    localStorage.removeItem(this.STORAGE_KEYS.API_KEY);
    this._userGroups = [];
    this._userId = 0;
    this._apiKey = null;
};

ZoteroSdk.prototype.getUserId = function() {
    return this._userId;
};

ZoteroSdk.prototype.setIsOnlineAvailable = function(isOnline) {
    this._isOnlineAvailable = isOnline;
};

function InputField(input, options) {
    var self = this;
    options = options || {};
    if (typeof input === "string") {
        var temp = document.getElementById(input);
        if (temp instanceof HTMLInputElement) {
            input = temp;
        }
    }
    if (input instanceof HTMLInputElement) {
        this.input = input;
    } else {
        throw new Error("Invalid input element");
    }
    this._container = document.createElement("div");
    this._options = {
        type: options.type || input.type || "text",
        placeholder: options.placeholder || input.placeholder || "",
        value: options.value || input.value || "",
        autofocus: options.autofocus || false,
        disabled: options.disabled || false,
        readonly: options.readonly || false,
        required: options.required || false,
        showCounter: options.showCounter || false,
        showClear: options.showClear !== undefined ? options.showClear : true,
        autocomplete: options.autocomplete || "off"
    };
    for (var key in options) {
        if (!this._options.hasOwnProperty(key)) {
            this._options[key] = options[key];
        }
    }
    this._id = input.id || "input_" + Math.random().toString(36).slice(2, 9);
    this.isFocused = false;
    this.isValid = true;
    this._validationMessage = "";
    this._subscribers = [];
    this._boundHandles = {
        focus: function focus(e) {
            self._handleFocus(e);
        },
        blur: function blur(e) {
            self._handleBlur(e);
        },
        input: function input(e) {
            self._handleInput(e);
        },
        keydown: function keydown(e) {
            self._handleKeydown(e);
        },
        clear: function clear() {
            self.clear();
        },
        validate: function validate() {
            self.validate();
        }
    };
    this._clearButton = null;
    this._counter = null;
    this._counterCurrent = null;
    this._counterMax = null;
    this._validationElement = document.createElement("div");
    if (this._options.type === "search") {
        this._searchIcon = document.createElement("span");
        this._boundHandles.search = this._triggerSubmit.bind(this);
        this._container.classList.add("input-field-search");
    }
    this._createDOM();
    this._bindEvents();
    this._updateState();
    if (this._options.autofocus) {
        setTimeout(function(self) {
            return function() {
                self.focus();
            };
        }(this), 100);
    }
}

InputField.prototype = {
    constructor: InputField,
    input: null,
    _container: null,
    _options: {},
    _id: "",
    isFocused: false,
    isValid: true,
    _validationMessage: "",
    _subscribers: [],
    _boundHandles: null,
    _clearButton: null,
    _counter: null,
    _counterCurrent: null,
    _counterMax: null,
    _validationElement: null,
    _createDOM: function _createDOM() {
        var parent = this.input.parentNode;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className += " input-field-container  input-field-container-" + this._id;
        var inputField = document.createElement("div");
        this._container.appendChild(inputField);
        inputField.className += " input-field";
        if (this._options.disabled) {
            inputField.className += " input-field-disabled";
        }
        var inputFieldMain = document.createElement("div");
        inputField.appendChild(inputFieldMain);
        inputFieldMain.className += " input-field-main";
        this.input.className += " input-field-element";
        this.input.type = this._options.type || "text";
        this.input.placeholder = this._options.placeholder || "";
        this.input.value = String(this._options.value) || "";
        if (this._options.disabled) {
            this.input.disabled = true;
        }
        if (this._options.readonly) {
            this.input.readOnly = true;
        }
        if (this._options.required) {
            this.input.required = true;
        }
        if (this._options.maxLength) {
            this.input.maxLength = this._options.maxLength;
        }
        if (this._options.pattern) {
            this.input.pattern = this._options.pattern;
        }
        if (this._options.autocomplete) {
            this.input.autocomplete = this._options.autocomplete;
        }
        if (this._options.showCounter) {
            this._counter = document.createElement("div");
            inputField.appendChild(this._counter);
            this._counter.className += " input-field-counter";
            this._counterCurrent = document.createElement("span");
            this._counterCurrent.className += " input-field-counter-current";
            this._counterCurrent.textContent = "0";
            this._counter.appendChild(this._counterCurrent);
            var span = document.createElement("span");
            span.textContent = "/";
            this._counter.appendChild(span);
            this._counterMax = document.createElement("span");
            this._counterMax.className += " input-field-counter-max";
            this._counterMax.textContent = String(this._options.maxLength) || "∞";
            this._counter.appendChild(this._counterMax);
        }
        inputField.appendChild(this._validationElement);
        this._validationElement.className += " input-field-validation";
        this._validationElement.style.display = "none";
        if (this._options.showClear) {
            this.input.className += " input-field-clearable";
            this._clearButton = document.createElement("button");
            inputField.appendChild(this._clearButton);
            this._clearButton.className += " input-field-clear";
            this._clearButton.style.display = "none";
            this._clearButton.textContent = "×";
        }
        if (this._options.showSearchIcon) {
            this._searchIcon.classList.add("input-field-search-icon");
            this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd" ' + 'd="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" ' + 'fill="currentColor"/>' + "</svg>";
            inputFieldMain.appendChild(this._searchIcon);
        }
        if (parent) {
            parent.insertBefore(fragment, this.input);
        }
        inputFieldMain.appendChild(this.input);
    },
    _bindEvents: function _bindEvents() {
        this.input.addEventListener("focus", this._boundHandles.focus);
        this.input.addEventListener("blur", this._boundHandles.blur);
        this.input.addEventListener("input", this._boundHandles.input);
        this.input.addEventListener("keydown", this._boundHandles.keydown);
        if (this._clearButton) {
            this._clearButton.addEventListener("click", this._boundHandles.clear);
        }
        if (this._options.showSearchIcon && this._boundHandles.search) {
            this._searchIcon.addEventListener("click", this._boundHandles.search);
        }
        this.input.addEventListener("change", this._boundHandles.validate);
    },
    _handleFocus: function _handleFocus(e) {
        this.isFocused = true;
        this._container.className += " input-field-focused";
        this._updateClearButton();
        this._triggerFocusEvent(e);
    },
    _handleBlur: function _handleBlur(e) {
        this.isFocused = false;
        var classes = this._container.className.split(" ");
        var newClasses = [];
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] !== "input-field-focused") {
                newClasses.push(classes[i]);
            }
        }
        this._container.className = newClasses.join(" ");
        this.validate();
        this._triggerBlurEvent(e);
    },
    _handleInput: function _handleInput(e) {
        this._updateClearButton();
        this._updateCounter();
        this._triggerInputEvent(e);
    },
    _handleKeydown: function _handleKeydown(e) {
        var key = e.key || e.keyCode;
        if ((key === "Escape" || key === 27) && this._options.showClear) {
            this.clear();
            e.preventDefault();
        }
        if (key === "Enter" || key === 13) {
            this._triggerSubmit();
        }
    },
    _updateClearButton: function _updateClearButton() {
        if (this._clearButton) {
            var hasValue = this.input.value.length > 0;
            this._clearButton.style.display = hasValue ? "block" : "none";
        }
    },
    _updateCounter: function _updateCounter() {
        if (this._counter && this._options.maxLength) {
            var current = this.input.value.length;
            var max = this._options.maxLength;
            if (this._counterCurrent) {
                this._counterCurrent.textContent = String(current);
            }
            if (this._counterMax) {
                this._counterMax.textContent = String(max);
            }
            if (current > max * .9) {
                var counterClasses = this._counter.className.split(" ");
                if (counterClasses.indexOf("input-field-counter-warning") === -1) {
                    this._counter.className += " input-field-counter-warning";
                }
            } else {
                this._counter.className = this._counter.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-counter-warning";
                }).join(" ");
            }
            if (current > max) {
                var counterClasses = this._counter.className.split(" ");
                if (counterClasses.indexOf("input-field-counter-error") === -1) {
                    this._counter.className += " input-field-counter-error";
                }
            } else {
                this._counter.className = this._counter.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-counter-error";
                }).join(" ");
            }
        }
    },
    validate: function validate() {
        if (!this._options.validation) {
            this.isValid = true;
            return true;
        }
        var value = this.input.value;
        var isValid = true;
        var message = "";
        if (this._options.required && !value.trim()) {
            isValid = false;
            message = "This field is required";
        } else if (this._options.minLength && value.length < this._options.minLength) {
            isValid = false;
            message = "Minimum length is " + this._options.minLength + " characters";
        } else if (this._options.maxLength && value.length > this._options.maxLength) {
            isValid = false;
            message = "Maximum length is " + this._options.maxLength + " characters";
        } else if (this._options.pattern && !new RegExp(this._options.pattern).test(value)) {
            isValid = false;
            message = "Invalid format";
        }
        if (isValid && typeof this._options.validation === "function") {
            var customValidation = this._options.validation(value);
            if (customValidation && !customValidation.isValid) {
                isValid = false;
                message = customValidation.message || "Invalid value";
            }
        }
        this.isValid = isValid;
        this._validationMessage = message;
        this.updateValidationState();
        return isValid;
    },
    updateValidationState: function updateValidationState() {
        if (!this.isValid) {
            this._validationElement.textContent = this._validationMessage;
            this._validationElement.style.display = "block";
            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-invalid") === -1) {
                this._container.className += " input-field-invalid";
            }
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-valid";
            }).join(" ");
        } else if (this.input.value.length > 0) {
            this._validationElement.style.display = "none";
            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-valid") === -1) {
                this._container.className += " input-field-valid";
            }
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-invalid";
            }).join(" ");
        } else {
            this._validationElement.style.display = "none";
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-valid" && cls !== "input-field-invalid";
            }).join(" ");
        }
    },
    _updateState: function _updateState() {
        this._updateClearButton();
        this._updateCounter();
        this.validate();
    },
    getValue: function getValue() {
        return this.input.value.trim();
    },
    setValue: function setValue(value) {
        this.input.value = value;
        this._updateState();
        this._triggerChange();
    },
    setPlaceholder: function setPlaceholder(value) {
        this.input.placeholder = value;
        this._options.placeholder = value;
    },
    clear: function clear(bFocus) {
        bFocus = bFocus !== undefined ? bFocus : true;
        this.setValue("");
        if (bFocus) {
            this.input.focus();
        }
    },
    focus: function focus() {
        this.input.focus();
    },
    blur: function blur() {
        this.input.blur();
    },
    enable: function enable() {
        this.input.disabled = false;
        this._options.disabled = false;
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "input-field-disabled";
        }).join(" ");
    },
    disable: function disable() {
        this.input.disabled = true;
        this._options.disabled = true;
        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("input-field-disabled") === -1) {
            this._container.className += " input-field-disabled";
        }
    },
    subscribe: function subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    },
    _triggerInputEvent: function _triggerInputEvent(e) {
        var detail = {
            value: this.input.value,
            originalEvent: e
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:input",
                detail: detail
            });
        });
    },
    _triggerFocusEvent: function _triggerFocusEvent(e) {
        var detail = {
            value: this.input.value,
            originalEvent: e
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:focus",
                detail: detail
            });
        });
    },
    _triggerBlurEvent: function _triggerBlurEvent(e) {
        var detail = {
            value: this.input.value,
            originalEvent: e
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:blur",
                detail: detail
            });
        });
    },
    _triggerChange: function _triggerChange() {
        var detail = {
            value: this.input.value,
            isValid: this.isValid
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:change",
                detail: detail
            });
        });
    },
    _triggerSubmit: function _triggerSubmit() {
        var detail = {
            value: this.input.value,
            isValid: this.isValid
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:submit",
                detail: detail
            });
        });
    },
    destroy: function destroy() {
        this._subscribers = [];
        if (this._boundHandles) {
            try {
                this.input.removeEventListener("focus", this._boundHandles.focus);
                this.input.removeEventListener("blur", this._boundHandles.blur);
                this.input.removeEventListener("input", this._boundHandles.input);
                this.input.removeEventListener("keydown", this._boundHandles.keydown);
                if (this._clearButton) {
                    this._clearButton.removeEventListener("click", this._boundHandles.clear);
                }
                if (this._options.showSearchIcon && this._boundHandles.search) {
                    this._searchIcon.removeEventListener("click", this._boundHandles.search);
                }
                this.input.removeEventListener("change", this._boundHandles.validate);
            } catch (error) {
                console.error(error);
            }
        }
        this._container.innerHTML = "";
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "input-field-container";
        }).join(" ");
    }
};

function Message(container, options) {
    if (typeof container === "string") {
        var temp = document.getElementById(container);
        if (temp instanceof HTMLElement) {
            container = temp;
        }
    }
    if (container instanceof HTMLElement) {
        this.container = container;
    } else {
        throw new Error("Invalid container element");
    }
    this._options = Object.assign(this._options, options);
    this._isShow = false;
}

Message.prototype = {
    constructor: Message,
    _options: {
        type: "info",
        text: "",
        title: "",
        duration: 0,
        closeButton: true,
        autoClose: false,
        closeOnClickOutside: true
    },
    _outsideClickListener: null,
    _element: null,
    _timeoutId: null,
    _create: function _create() {
        var messageEl = document.createElement("div");
        messageEl.className = "message message-" + this._options.type;
        messageEl.setAttribute("role", "alert");
        var title = this._options.title;
        if (!title) {
            title = "Error";
            switch (this._options.type) {
              case "success":
                title = "Success";
                break;

              case "warning":
                title = "Warning";
                break;

              case "info":
                title = "Information";
                break;
            }
        }
        var text = this._options.text;
        if (!text) {
            text = "";
            switch (this._options.type) {
              case "success":
                text = "Operation completed successfully.";
                break;

              case "warning":
                text = "Please be cautious.";
                break;

              case "error":
                text = "Something went wrong.";
                break;
            }
        }
        messageEl.innerHTML = '<div class="message-content">' + '<span class="message-title">' + title + "</span>" + '<span class="message-text">' + text + "</span>" + "</div>";
        if (this._options.closeButton) {
            var closeBtn = document.createElement("button");
            closeBtn.className = "message-close";
            closeBtn.textContent = "×";
            closeBtn.setAttribute("aria-label", "Close");
            closeBtn.onclick = this.close.bind(this);
            messageEl.appendChild(closeBtn);
        }
        return messageEl;
    },
    addOutsideClickListener: function addOutsideClickListener() {
        if (this._outsideClickListener) {
            document.removeEventListener("click", this._outsideClickListener);
        }
        var self = this;
        this._outsideClickListener = function(e) {
            if (e.target instanceof HTMLElement === false) {
                return;
            }
            if (self._element && !self._element.contains(e.target)) {
                self.close();
            }
        };
        setTimeout(function() {
            if (!self._outsideClickListener) {
                return;
            }
            document.addEventListener("click", self._outsideClickListener);
        }, 10);
    },
    removeOutsideClickListener: function removeOutsideClickListener() {
        if (this._outsideClickListener) {
            document.removeEventListener("click", this._outsideClickListener);
            this._outsideClickListener = null;
        }
    },
    show: function show(text, title) {
        if (this._isShow) {
            return this;
        }
        this._isShow = true;
        if (!this.container.classList.contains("message-container")) {
            this.container.classList.add("message-container");
        }
        if (title) {
            this._options.title = title;
        }
        if (text) {
            this._options.text = text;
        }
        var messageEl = this._create();
        this._element = messageEl;
        this.container.appendChild(messageEl);
        setTimeout(function() {
            messageEl.style.opacity = "1";
            messageEl.style.transform = "translateY(0)";
        }, 10);
        if (this._options.autoClose && Number(this._options.duration) > 0) {
            this._timeoutId = setTimeout(this.close.bind(this), this._options.duration);
        }
        if (this._options.closeOnClickOutside) {
            this.addOutsideClickListener();
        }
        return this;
    },
    close: function close() {
        this._isShow = false;
        if (!this._element || !this._element.parentNode) {
            return;
        }
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
        }
        this.removeOutsideClickListener();
        var _element = this._element;
        _element.style.opacity = "0";
        _element.style.transform = "translateY(-20px)";
        setTimeout(function() {
            if (_element.parentNode) {
                _element.parentNode.removeChild(_element);
            }
        }, 300);
    }
};

function Button(button, options) {
    var self = this;
    if (typeof button === "string") {
        var temp = document.getElementById(button);
        if (temp instanceof HTMLButtonElement) {
            button = temp;
        }
    }
    if (button instanceof HTMLButtonElement) {
        this._button = button;
    } else {
        throw new Error("Invalid button");
    }
    this._container = document.createElement("div");
    this._options = options || {};
    this._options.text = this._options.text || button.textContent.trim();
    this._options.type = this._options.type || "button";
    this._options.variant = this._options.variant || "primary";
    this._options.size = this._options.size || "medium";
    this._options.iconPosition = this._options.iconPosition || "left";
    this.isLoading = false;
    this._originalText = this._options.text;
    this._subscribers = [];
    this._boundHandles = {
        click: function click(e) {
            self._handleClick(e);
        },
        mouseenter: function mouseenter() {
            self._handleMouseEnter();
        },
        mouseleave: function mouseleave() {
            self._handleMouseLeave();
        },
        focus: function focus() {
            self._handleFocus();
        },
        blur: function blur() {
            self._handleBlur();
        },
        keydown: function keydown(e) {
            self._handleKeydown(e);
        }
    };
    this._createDOM();
    this._bindEvents();
    this.updateState();
}

Button.prototype = {
    constructor: Button,
    _button: null,
    _buttonText: null,
    _spinner: null,
    _badgeElement: null,
    _createDOM: function _createDOM() {
        var parent = this._button.parentNode;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className += " custom-button-container";
        this._button.className += " custom-button";
        this._button.className += " custom-button-" + this._options.variant;
        this._button.className += " custom-button-" + this._options.size;
        if (this._options.disabled) {
            this._button.className += " custom-button-disabled";
        }
        if (this._options.loading) {
            this._container.className += " custom-button-loading";
        }
        if (this._options.type) {
            this._button.type = this._options.type;
        }
        if (this._options.tooltip) {
            this._button.title = this._options.tooltip;
        }
        if (this._options.disabled) {
            this._button.disabled = true;
        }
        if (this._options.text) {
            this._button.textContent = "";
            this._buttonText = document.createElement("span");
            this._buttonText.className = "custom-button-text";
            this._buttonText.textContent = this._options.text || "";
            if (this._options.icon) {
                var iconSpan = document.createElement("span");
                iconSpan.className = "custom-button-icon";
                if (this._options.iconPosition === "left") {
                    iconSpan.className += " custom-button-icon-left";
                    this._button.appendChild(iconSpan);
                    this._button.appendChild(this._buttonText);
                } else {
                    iconSpan.className += " custom-button-icon-right";
                    this._button.appendChild(this._buttonText);
                    this._button.appendChild(iconSpan);
                }
                iconSpan.innerHTML = this._options.icon;
            } else {
                this._button.appendChild(this._buttonText);
            }
        }
        if (this._options.loading) {
            this._spinner = document.createElement("span");
            this._spinner.className = "custom-button-spinner";
            this._button.appendChild(this._spinner);
        }
        if (this._options.badge) {
            this._badgeElement = document.createElement("span");
            this._badgeElement.className = "custom-button-badge";
            this._badgeElement.textContent = this._options.badge;
            this._button.appendChild(this._badgeElement);
        }
        if (parent) {
            parent.insertBefore(fragment, this._button);
        }
        this._container.appendChild(this._button);
    },
    _bindEvents: function _bindEvents() {
        this._button.addEventListener("click", this._boundHandles.click);
        this._button.addEventListener("mouseenter", this._boundHandles.mouseenter);
        this._button.addEventListener("mouseleave", this._boundHandles.mouseleave);
        this._button.addEventListener("focus", this._boundHandles.focus);
        this._button.addEventListener("blur", this._boundHandles.blur);
        this._button.addEventListener("keydown", this._boundHandles.keydown);
    },
    _handleClick: function _handleClick(e) {
        if (this._options.disabled || this.isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.triggerClickEvent(e);
    },
    _handleMouseEnter: function _handleMouseEnter() {
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-hover") === -1) {
            this._button.className += " custom-button-hover";
        }
        this.triggerEvent("mouseenter");
    },
    _handleMouseLeave: function _handleMouseLeave() {
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-hover";
        }).join(" ");
        this.triggerEvent("mouseleave");
    },
    _handleFocus: function _handleFocus() {
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-focused") === -1) {
            this._button.className += " custom-button-focused";
        }
        this.triggerEvent("focus");
    },
    _handleBlur: function _handleBlur() {
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-focused";
        }).join(" ");
        this.triggerEvent("blur");
    },
    _handleKeydown: function _handleKeydown(e) {
        var key = e.key || e.keyCode;
        if (key === " " || key === "Enter" || key === 32 || key === 13) {
            if (this._button.tagName === "BUTTON") ; else {
                e.preventDefault();
                this._button.click();
            }
        } else if (key === "Escape" || key === 27) {
            this._button.blur();
        }
        this.triggerEvent("keydown", {
            key: key
        });
    },
    subscribe: function subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    },
    setText: function setText(text) {
        if (typeof text === "undefined") return;
        this._options.text = text;
        if (!this._buttonText) {
            this._buttonText = document.createElement("span");
            this._buttonText.className = "custom-button-text";
            this._buttonText.textContent = "";
            this._button.appendChild(this._buttonText);
        }
        this._buttonText.textContent = text;
    },
    setIcon: function setIcon(icon, position) {
        this._options.icon = icon;
        this._options.iconPosition = position || "left";
    },
    setBadge: function setBadge(badge) {
        if (typeof badge === "undefined") return;
        this._options.badge = badge;
        if (this._badgeElement) {
            this._badgeElement.textContent = badge;
            this._badgeElement.style.display = badge ? "flex" : "none";
        }
    },
    setVariant: function setVariant(variant) {
        if (typeof variant === "undefined") return;
        var oldClass = "custom-button-" + this._options.variant;
        var newClass = "custom-button-" + variant;
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== oldClass;
        }).join(" ") + " " + newClass;
        this._options.variant = variant;
    },
    setSize: function setSize(size) {
        if (typeof size === "undefined") return;
        var oldClass = "custom-button-" + this._options.size;
        var newClass = "custom-button-" + size;
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== oldClass;
        }).join(" ") + " " + newClass;
        this._options.size = size;
    },
    enable: function enable() {
        this._options.disabled = false;
        this._button.disabled = false;
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-disabled";
        }).join(" ");
    },
    disable: function disable() {
        this._options.disabled = true;
        this._button.disabled = true;
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-disabled") === -1) {
            this._button.className += " custom-button-disabled";
        }
    },
    startLoading: function startLoading() {
        this.isLoading = true;
        if (typeof this._options.text !== "undefined") this._originalText = this._options.text;
        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("custom-button-loading") === -1) {
            this._container.className += " custom-button-loading";
        }
        if (this._spinner) {
            this._spinner.style.display = "inline-block";
        }
        if (this._buttonText) {
            this._buttonText.textContent = "Loading...";
        }
        this._button.disabled = true;
    },
    stopLoading: function stopLoading() {
        this.isLoading = false;
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-loading";
        }).join(" ");
        if (this._spinner) {
            this._spinner.style.display = "none";
        }
        if (this._buttonText) {
            this._buttonText.textContent = this._originalText;
        }
        this._button.disabled = !!this._options.disabled;
    },
    setTooltip: function setTooltip(tooltip) {
        if (typeof tooltip === "undefined") return;
        this._options.tooltip = tooltip;
        this._button.title = tooltip || "";
    },
    triggerClickEvent: function triggerClickEvent(e) {
        var detail = {
            originalEvent: e,
            button: this
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "button:click",
                detail: detail
            });
        });
    },
    triggerEvent: function triggerEvent(eventName, detail) {
        detail = detail || {};
        detail.button = this;
        this._subscribers.forEach(function(cb) {
            cb({
                type: "button:" + eventName,
                detail: detail
            });
        });
    },
    updateState: function updateState() {
        if (this._options.disabled) {
            this.disable();
        } else {
            this.enable();
        }
        if (this._options.loading) {
            this.startLoading();
        }
    },
    destroy: function destroy() {
        this._subscribers = [];
        if (this._boundHandles) {
            try {
                this._button.removeEventListener("click", this._boundHandles.click);
                this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter);
                this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave);
                this._button.removeEventListener("focus", this._boundHandles.focus);
                this._button.removeEventListener("blur", this._boundHandles.blur);
                this._button.removeEventListener("keydown", this._boundHandles.keydown);
            } catch (error) {
                console.error(error);
            }
        }
        this._container.innerHTML = "";
        var containerClasses = this._container.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-container";
        }).join(" ");
        this._container.className = containerClasses;
    }
};

var _container$1 = new WeakMap;

var _input = new WeakMap;

var _visualRadio = new WeakMap;

var _labelElement = new WeakMap;

var _options = new WeakMap;

var _handlers = new WeakMap;

var _subscribers = new WeakMap;

var _Radio_brand = new WeakSet;

class Radio {
    constructor(_radio, options) {
        _classPrivateMethodInitSpec(this, _Radio_brand);
        _classPrivateFieldInitSpec(this, _container$1, void 0);
        _classPrivateFieldInitSpec(this, _input, void 0);
        _classPrivateFieldInitSpec(this, _visualRadio, void 0);
        _classPrivateFieldInitSpec(this, _labelElement, null);
        _classPrivateFieldInitSpec(this, _options, void 0);
        _classPrivateFieldInitSpec(this, _handlers, new Map);
        _classPrivateFieldInitSpec(this, _subscribers, []);
        if (typeof _radio === "string") {
            var temp = document.getElementById(_radio);
            if (temp instanceof HTMLInputElement) {
                _radio = temp;
            }
        }
        if (!(_radio instanceof HTMLInputElement)) {
            throw new Error("Invalid input element");
        }
        _classPrivateFieldSet2(_input, this, _radio);
        _classPrivateFieldSet2(_options, this, Object.assign({
            id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
            checked: false,
            disabled: false,
            indeterminate: false,
            label: "",
            name: "",
            value: "on"
        }, options));
        _assertClassBrand(_Radio_brand, this, _applyInputAttributes).call(this);
        _classPrivateFieldSet2(_container$1, this, document.createElement("div"));
        _classPrivateFieldSet2(_visualRadio, this, document.createElement("span"));
        _assertClassBrand(_Radio_brand, this, _createDOM$2).call(this);
        _assertClassBrand(_Radio_brand, this, _setupEventListeners).call(this);
        _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this);
        if (!_classPrivateFieldGet2(_options, this).name) {
            throw new Error("Name attribute is required");
        }
        var sameNameInstances = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
        if (!sameNameInstances) {
            sameNameInstances = new Array;
            _instances$1._.set(_classPrivateFieldGet2(_options, this).name, sameNameInstances);
        }
        sameNameInstances.push(this);
    }
    subscribe(callback) {
        var self = this;
        _classPrivateFieldGet2(_subscribers, this).push(callback);
        return {
            unsubscribe: function unsubscribe() {
                _classPrivateFieldSet2(_subscribers, self, _classPrivateFieldGet2(_subscribers, self).filter(function(cb) {
                    return cb !== callback;
                }));
            }
        };
    }
    getElement() {
        return _classPrivateFieldGet2(_container$1, this);
    }
    check(bSilent) {
        if (_classPrivateFieldGet2(_options, this).disabled || _classPrivateFieldGet2(_options, this).checked) return;
        if (_classPrivateFieldGet2(_options, this).name) {
            var radios = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
            radios && radios.forEach(radio => {
                if (radio !== this && _classPrivateFieldGet2(_options, radio).checked) {
                    radio.uncheck();
                }
            });
        }
        _classPrivateFieldGet2(_options, this).checked = true;
        _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this);
        if (bSilent) return;
        _assertClassBrand(_Radio_brand, this, _triggerChange$1).call(this);
    }
    uncheck(bSilent) {
        if (_classPrivateFieldGet2(_options, this).disabled || !_classPrivateFieldGet2(_options, this).checked) return;
        _classPrivateFieldGet2(_options, this).checked = false;
        _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this);
        if (bSilent) return;
        _assertClassBrand(_Radio_brand, this, _triggerChange$1).call(this);
    }
    enable() {
        if (!_classPrivateFieldGet2(_options, this).disabled) return;
        _classPrivateFieldGet2(_options, this).disabled = false;
        _classPrivateFieldGet2(_input, this).disabled = false;
        _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", "false");
        if (_classPrivateFieldGet2(_options, this).checked) {
            _classPrivateFieldGet2(_container$1, this).tabIndex = 0;
        } else {
            _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
        }
        _classPrivateFieldGet2(_container$1, this).classList.remove("radio--disabled");
    }
    disable() {
        if (_classPrivateFieldGet2(_options, this).disabled) return;
        _classPrivateFieldGet2(_options, this).disabled = true;
        _classPrivateFieldGet2(_input, this).disabled = true;
        _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", "true");
        _classPrivateFieldGet2(_container$1, this).tabIndex = -1;
        _classPrivateFieldGet2(_container$1, this).classList.add("radio--disabled");
    }
    setLabel(label) {
        _classPrivateFieldGet2(_options, this).label = label;
        if (_classPrivateFieldGet2(_labelElement, this)) {
            _classPrivateFieldGet2(_labelElement, this).textContent = label;
        } else if (label) {
            _classPrivateFieldSet2(_labelElement, this, document.createElement("label"));
            _classPrivateFieldGet2(_labelElement, this).className = "radio-label";
            _classPrivateFieldGet2(_labelElement, this).htmlFor = String(_classPrivateFieldGet2(_options, this).id);
            _classPrivateFieldGet2(_labelElement, this).textContent = label;
            _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_labelElement, this));
        }
    }
    getState() {
        return {
            checked: !!_classPrivateFieldGet2(_options, this).checked,
            disabled: !!_classPrivateFieldGet2(_options, this).disabled,
            value: _classPrivateFieldGet2(_options, this).value || "",
            name: _classPrivateFieldGet2(_options, this).name || ""
        };
    }
    destroy() {
        _classPrivateFieldSet2(_subscribers, this, []);
        if (!_classPrivateFieldGet2(_options, this).name) return;
        var sameNameInstances = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
        if (sameNameInstances) {
            var index = sameNameInstances.indexOf(this);
            if (index >= 0) sameNameInstances.splice(index, 1);
        }
        _classPrivateFieldGet2(_handlers, this).forEach((handler, event) => {
            _classPrivateFieldGet2(_container$1, this).removeEventListener(event, handler);
        });
        _classPrivateFieldGet2(_handlers, this).clear();
        if (_classPrivateFieldGet2(_container$1, this) && _classPrivateFieldGet2(_container$1, this).parentNode) {
            _classPrivateFieldGet2(_container$1, this).parentNode.removeChild(_classPrivateFieldGet2(_container$1, this));
        }
        _classPrivateFieldSet2(_labelElement, this, null);
    }
}

function _applyInputAttributes() {
    _classPrivateFieldGet2(_input, this).type = "radio";
    var elId = _classPrivateFieldGet2(_input, this).getAttribute("id");
    var elName = _classPrivateFieldGet2(_input, this).getAttribute("name");
    var elValue = _classPrivateFieldGet2(_input, this).getAttribute("value");
    var elChecked = _classPrivateFieldGet2(_input, this).getAttribute("checked");
    var elDisabled = _classPrivateFieldGet2(_input, this).getAttribute("disabled");
    if (elId !== null) {
        _classPrivateFieldGet2(_options, this).id = elId;
    } else if (_classPrivateFieldGet2(_options, this).id) {
        _classPrivateFieldGet2(_input, this).setAttribute("id", _classPrivateFieldGet2(_options, this).id);
    }
    if (elName !== null) {
        _classPrivateFieldGet2(_options, this).name = elName;
    } else if (_classPrivateFieldGet2(_options, this).name) {
        _classPrivateFieldGet2(_input, this).setAttribute("name", _classPrivateFieldGet2(_options, this).name);
    }
    if (elValue !== null) {
        _classPrivateFieldGet2(_options, this).value = elValue;
    } else if (_classPrivateFieldGet2(_options, this).value) {
        _classPrivateFieldGet2(_input, this).setAttribute("value", _classPrivateFieldGet2(_options, this).value);
    }
    if (elChecked !== null) {
        _classPrivateFieldGet2(_options, this).checked = elChecked === "true";
    } else if (_classPrivateFieldGet2(_options, this).checked) {
        _classPrivateFieldGet2(_input, this).setAttribute("checked", "true");
    }
    if (elDisabled !== null) {
        _classPrivateFieldGet2(_options, this).disabled = elDisabled === "true";
    } else if (_classPrivateFieldGet2(_options, this).disabled) {
        _classPrivateFieldGet2(_input, this).setAttribute("disabled", "true");
    }
}

function _createDOM$2() {
    var parent = _classPrivateFieldGet2(_input, this).parentNode;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(_classPrivateFieldGet2(_container$1, this));
    _classPrivateFieldGet2(_container$1, this).classList.add("radio-button-container");
    _classPrivateFieldGet2(_container$1, this).setAttribute("role", "radio");
    _classPrivateFieldGet2(_container$1, this).setAttribute("aria-checked", String(!!_classPrivateFieldGet2(_options, this).checked));
    _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", String(!!_classPrivateFieldGet2(_options, this).disabled));
    _classPrivateFieldGet2(_container$1, this).tabIndex = _classPrivateFieldGet2(_options, this).disabled ? -1 : 0;
    _classPrivateFieldGet2(_visualRadio, this).className = "radio-visual";
    _classPrivateFieldGet2(_visualRadio, this).setAttribute("aria-hidden", "true");
    if (_classPrivateFieldGet2(_options, this).label) {
        _classPrivateFieldSet2(_labelElement, this, document.createElement("label"));
        _classPrivateFieldGet2(_labelElement, this).className = "i18n radio-label";
        _classPrivateFieldGet2(_labelElement, this).htmlFor = String(_classPrivateFieldGet2(_options, this).id);
        _classPrivateFieldGet2(_labelElement, this).textContent = _classPrivateFieldGet2(_options, this).label;
    }
    if (_classPrivateFieldGet2(_options, this).disabled) {
        _classPrivateFieldGet2(_container$1, this).classList.add("radio--disabled");
    }
    if (parent) {
        parent.insertBefore(fragment, _classPrivateFieldGet2(_input, this));
    }
    _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_input, this));
    _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_visualRadio, this));
    if (_classPrivateFieldGet2(_labelElement, this)) {
        _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_labelElement, this));
    }
    _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
}

function _updateRadioGroupTabIndex() {
    if (_classPrivateFieldGet2(_options, this).checked) {
        _classPrivateFieldGet2(_container$1, this).tabIndex = _classPrivateFieldGet2(_options, this).disabled ? -1 : 0;
    } else if (_classPrivateFieldGet2(_options, this).name && _instances$1._.has(_classPrivateFieldGet2(_options, this).name)) {
        var radios = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
        var hasChecked = false;
        radios && radios.forEach(radio => {
            if (_classPrivateFieldGet2(_options, radio).checked && radio !== this) {
                hasChecked = true;
            }
        });
        if (!hasChecked && !_classPrivateFieldGet2(_options, this).checked && !_classPrivateFieldGet2(_options, this).disabled) {
            _classPrivateFieldGet2(_container$1, this).tabIndex = 0;
        } else {
            _classPrivateFieldGet2(_container$1, this).tabIndex = -1;
        }
    }
}

function _setupEventListeners() {
    var handleClick = e => {
        e.preventDefault();
        if (!_classPrivateFieldGet2(_options, this).disabled && !_classPrivateFieldGet2(_options, this).checked) {
            this.check();
            _classPrivateFieldGet2(_container$1, this).focus();
        }
    };
    var handleKeyDown = e => {
        if (_classPrivateFieldGet2(_options, this).disabled) return;
        switch (e.key) {
          case " ":
          case "Spacebar":
          case "Enter":
            e.preventDefault();
            if (!_classPrivateFieldGet2(_options, this).checked) {
                this.check();
            }
            break;
        }
    };
    var handleFocus = () => {
        _classPrivateFieldGet2(_container$1, this).classList.add("radio--focused");
    };
    var handleBlur = () => {
        _classPrivateFieldGet2(_container$1, this).classList.remove("radio--focused");
    };
    _classPrivateFieldGet2(_handlers, this).set("click", handleClick);
    _classPrivateFieldGet2(_handlers, this).set("keydown", handleKeyDown);
    _classPrivateFieldGet2(_handlers, this).set("focus", handleFocus);
    _classPrivateFieldGet2(_handlers, this).set("blur", handleBlur);
    _classPrivateFieldGet2(_container$1, this).addEventListener("click", handleClick);
    _classPrivateFieldGet2(_container$1, this).addEventListener("keydown", handleKeyDown);
    _classPrivateFieldGet2(_container$1, this).addEventListener("focus", handleFocus);
    _classPrivateFieldGet2(_container$1, this).addEventListener("blur", handleBlur);
}

function _updateVisualState() {
    _classPrivateFieldGet2(_container$1, this).setAttribute("aria-checked", String(!!_classPrivateFieldGet2(_options, this).checked));
    _classPrivateFieldGet2(_container$1, this).classList.toggle("radio--checked", _classPrivateFieldGet2(_options, this).checked);
    _classPrivateFieldGet2(_input, this).checked = !!_classPrivateFieldGet2(_options, this).checked;
    _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
}

function _triggerChange$1(e) {
    var detail = this.getState();
    var objEvent = {
        type: "radio:change",
        detail: detail
    };
    if (e) {
        objEvent.originalEvent = e;
    }
    _classPrivateFieldGet2(_subscribers, this).forEach(function(cb) {
        cb(objEvent);
    });
}

var _instances$1 = {
    _: new Map
};

function Checkbox(checkbox, options) {
    if (typeof checkbox === "string") {
        var temp = document.getElementById(checkbox);
        if (temp instanceof HTMLInputElement) {
            checkbox = temp;
        }
    }
    if (checkbox instanceof HTMLInputElement === false) {
        throw new Error("Invalid input element");
    }
    this._options = Object.assign({
        id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
        checked: false,
        disabled: false,
        indeterminate: false,
        label: "",
        name: "",
        value: "on"
    }, options);
    this._options.disabled = options.disabled || false;
    this._handlers = new Map;
    this._createDOM(checkbox);
    this._setupEventListeners();
    this._updateVisualState();
    this._subscribers = [];
}

Checkbox.prototype = {
    constructor: Checkbox,
    _container: null,
    _input: null,
    _visualCheckbox: null,
    _labelElement: null,
    _createDOM: function _createDOM(checkbox) {
        var parent = checkbox.parentNode;
        var fragment = document.createDocumentFragment();
        this._container = document.createElement("div");
        fragment.appendChild(this._container);
        this._container.classList.add("checkbox-container");
        this._container.setAttribute("role", "checkbox");
        this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false");
        this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false");
        this._container.tabIndex = this._options.disabled ? -1 : 0;
        this._input = checkbox;
        var elId = this._input.getAttribute("id");
        if (elId !== null) {
            this._options.id = elId;
        } else if (this._options.id) {
            this._input.setAttribute("id", this._options.id);
        }
        this._input.type = "checkbox";
        if (this._options.name) {
            this._input.name = this._options.name;
        }
        if (this._options.value) {
            this._input.value = this._options.value;
        }
        this._input.checked = !!this._options.checked;
        if (this._options.disabled) {
            this._input.disabled = true;
        }
        if (this._options.indeterminate) {
            this._input.indeterminate = true;
        }
        this._visualCheckbox = document.createElement("span");
        this._visualCheckbox.className = "checkbox-visual";
        this._visualCheckbox.setAttribute("aria-hidden", "true");
        var svgNS = "http://www.w3.org/2000/svg";
        var checkmarkSVG = document.createElementNS(svgNS, "svg");
        checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
        checkmarkSVG.setAttribute("class", "checkbox-checkmark");
        var path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        checkmarkSVG.appendChild(path);
        this._visualCheckbox.appendChild(checkmarkSVG);
        var indeterminateLine = document.createElement("span");
        indeterminateLine.className = "checkbox-indeterminate";
        this._visualCheckbox.appendChild(indeterminateLine);
        if (this._options.label) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label i18n";
            if (this._options.id) this._labelElement.htmlFor = this._options.id;
            this._labelElement.textContent = this._options.label;
            if (this._options.title) {
                this._labelElement.setAttribute("title", this._options.label);
            }
        }
        if (this._options.disabled) {
            this._container.classList.add("checkbox--disabled");
        }
        if (parent) {
            parent.insertBefore(fragment, checkbox);
        }
        this._container.appendChild(this._input);
        this._container.appendChild(this._visualCheckbox);
        if (this._labelElement) {
            this._container.appendChild(this._labelElement);
        }
    },
    _setupEventListeners: function _setupEventListeners() {
        var self = this;
        if (!this._container) return;
        var handleClick = function handleClick(e) {
            e.preventDefault();
            if (!self._options.disabled && self._container) {
                self.toggle();
                self._container.focus();
            }
        };
        var handleKeyDown = function handleKeyDown(e) {
            if (self._options.disabled) return;
            switch (e.key) {
              case " ":
              case "Spacebar":
              case "Enter":
                e.preventDefault();
                self.toggle();
                break;

              case "ArrowRight":
              case "ArrowDown":
                e.preventDefault();
                if (!self._options.checked && !self._options.indeterminate) {
                    self._options.checked ? self.setIndeterminate() : self.check();
                }
                break;

              case "ArrowLeft":
              case "ArrowUp":
                e.preventDefault();
                if (self._options.checked || self._options.indeterminate) {
                    self._options.indeterminate ? self.uncheck() : self.setIndeterminate();
                }
                break;
            }
        };
        var handleFocus = function handleFocus() {
            if (!self._container) return;
            self._container.classList.add("checkbox--focused");
        };
        var handleBlur = function handleBlur() {
            if (!self._container) return;
            self._container.classList.remove("checkbox--focused");
        };
        this._handlers.set("click", handleClick);
        this._handlers.set("keydown", handleKeyDown);
        this._handlers.set("focus", handleFocus);
        this._handlers.set("blur", handleBlur);
        this._container.addEventListener("click", handleClick);
        this._container.addEventListener("keydown", handleKeyDown);
        this._container.addEventListener("focus", handleFocus);
        this._container.addEventListener("blur", handleBlur);
    },
    _updateVisualState: function _updateVisualState() {
        if (!this._container || !this._input) return;
        this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked));
        this._container.classList.toggle("checkbox--checked", this._options.checked);
        this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate);
        this._input.checked = !!this._options.checked;
        this._input.indeterminate = !!this._options.indeterminate;
    },
    toggle: function toggle() {
        if (this._options.disabled) return !!this._options.checked;
        if (this._options.indeterminate) {
            this._options.indeterminate = false;
            this._options.checked = true;
        } else {
            this._options.checked = !this._options.checked;
        }
        this._updateVisualState();
        this._triggerChange();
        return this._options.checked;
    },
    check: function check(bSilent) {
        if (this._options.disabled || this._options.checked && !this._options.indeterminate) return;
        this._options.checked = true;
        this._options.indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },
    uncheck: function uncheck(bSilent) {
        if (this._options.disabled || !this._options.checked && !this._options.indeterminate) return;
        this._options.checked = false;
        this._options.indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },
    setIndeterminate: function setIndeterminate() {
        if (this._options.disabled || this._options.indeterminate) return;
        this._options.indeterminate = true;
        this._updateVisualState();
        this._triggerChange();
    },
    enable: function enable() {
        if (!this._options.disabled || !this._container || !this._input) return;
        this._options.disabled = false;
        this._input.disabled = false;
        this._container.setAttribute("aria-disabled", "false");
        this._container.tabIndex = 0;
        this._container.classList.remove("checkbox--disabled");
    },
    disable: function disable() {
        if (this._options.disabled || !this._container || !this._input) return;
        this._options.disabled = true;
        this._input.disabled = true;
        this._container.setAttribute("aria-disabled", "true");
        this._container.tabIndex = -1;
        this._container.classList.add("checkbox--disabled");
    },
    setLabel: function setLabel(label) {
        this._options.label = label;
        if (this._labelElement) {
            this._labelElement.textContent = label;
        } else if (label && this._container) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label";
            if (this._options.id) this._labelElement.htmlFor = this._options.id;
            this._labelElement.textContent = label;
            this._container.appendChild(this._labelElement);
        }
        if (this._options.title && this._labelElement) {
            this._labelElement.setAttribute("title", label);
        }
    },
    getState: function getState() {
        if (this._input) {
            return {
                checked: this._input.checked,
                disabled: this._input.disabled,
                value: this._input.value
            };
        }
        return {
            checked: false,
            disabled: false,
            value: ""
        };
    },
    subscribe: function subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    },
    _triggerChange: function _triggerChange(e) {
        var detail = this.getState();
        var objEvent = {
            type: "checkbox:change",
            detail: detail
        };
        if (e) {
            objEvent.originalEvent = e;
        }
        this._subscribers.forEach(function(cb) {
            cb(objEvent);
        });
    },
    destroy: function destroy() {
        this._subscribers = [];
        this._handlers.forEach((handler, event) => {
            this._container && this._container.removeEventListener(event, handler);
        });
        this._handlers.clear();
        if (this._container && this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
        }
        this._container = null;
        this._input = null;
        this._visualCheckbox = null;
        this._labelElement = null;
    }
};

var _SelectBox_brand = new WeakSet;

class SelectBox {
    constructor(container, options) {
        _classPrivateMethodInitSpec(this, _SelectBox_brand);
        if (typeof container === "string") {
            var _temp = document.getElementById(container);
            if (_temp instanceof HTMLElement) {
                container = _temp;
            }
        }
        if (container instanceof HTMLElement) {
            this._container = container;
        } else {
            throw new Error("Invalid container");
        }
        this._options = Object.assign(options, {
            placeholder: options.placeholder || "Select...",
            searchable: options.searchable || false,
            multiple: options.multiple || false,
            description: options.description || ""
        });
        this._selectedValues = new Set;
        this.isOpen = false;
        this._items = [];
        this._customItems = [];
        this._subscribers = [];
        this._boundHandles = {
            toggle: e => {
                _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, e);
            },
            search: e => {
                _assertClassBrand(_SelectBox_brand, this, _handleSearch).call(this, e);
            },
            close: e => {
                if (e.target instanceof HTMLElement && !this._container.contains(e.target) && !e.target.classList.contains("selectbox-option")) {
                    _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                }
            },
            keydown: e => {
                _assertClassBrand(_SelectBox_brand, this, _handleKeydown).call(this, e);
            },
            dropdownClick: e => {
                _assertClassBrand(_SelectBox_brand, this, _handleDropdownClick).call(this, e);
            }
        };
        this._optionsContainer = null;
        this.searchInput = null;
        this._select = document.createElement("div");
        this._header = document.createElement("div");
        this._selectedText = document.createElement("span");
        this._arrow = document.createElement("span");
        this._dropdown = document.createElement("div");
        _assertClassBrand(_SelectBox_brand, this, _createDOM$1).call(this);
        _assertClassBrand(_SelectBox_brand, this, _bindEvents).call(this);
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
        _instances._.add(this);
    }
    openDropdown() {
        if (!this.isOpen) {
            document.addEventListener("click", this._boundHandles.close);
        }
        this.isOpen = true;
        this._dropdown.style.display = "block";
        this._arrow.className += " selectbox-arrow-open";
        this._header.className += " selectbox-header-open";
        if (this.searchInput) {
            setTimeout(function(self) {
                return function() {
                    if (self.searchInput) {
                        self.searchInput.focus();
                    }
                };
            }(this), 100);
        }
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
    }
    subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    }
    addItem(value, text, selected) {
        selected = selected || false;
        var bHasItem = this._items.some(item => item && item.value === value);
        if (bHasItem) {
            var item = this._items.find(item => item && item.value === value);
            if (item) item.selected = selected;
        } else {
            this._items.push({
                value: value,
                text: text,
                selected: selected
            });
        }
        if (selected) {
            if (this._options.multiple) {
                this._selectedValues.add(value);
            } else {
                this._selectedValues.clear();
                this._selectedValues.add(value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    }
    addItems(values, selectedValue) {
        var self = this;
        values.forEach(function(pair, index) {
            var bHasItem = self._items.some(item => item && item.value === pair[0]);
            if (bHasItem) return;
            var isSelected = selectedValue ? pair[0] === selectedValue : index === 0;
            if (isSelected) {
                if (self._options.multiple) {
                    self._selectedValues.add(pair[0]);
                } else {
                    self._selectedValues.clear();
                    self._selectedValues.add(pair[0]);
                }
            }
            self._items.push({
                value: pair[0],
                text: pair[1],
                selected: isSelected
            });
        }, this);
        if (this.isOpen) {
            _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    }
    addCustomItem(value, text) {
        this._customItems.push({
            value: value,
            text: text,
            selected: false
        });
    }
    addSeparator() {
        this._items.push(null);
    }
    removeItem(value) {
        this._items = this._items.filter(function(item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._customItems = this._customItems.filter(function(item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._selectedValues.delete(value);
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    }
    getSelectedValue() {
        if (this._options.multiple) {
            console.error("Method getSelectedValue is only available for single-select boxes.");
            return null;
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    getSelectedValues() {
        if (this._options.multiple) {
            return Array.from(this._selectedValues);
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    selectItems(values, bSilent) {
        var self = this;
        if (!this._options.multiple && Array.isArray(values)) {
            console.error("Method selectItem is only available for multi-select boxes.");
            return;
        }
        var value = "";
        if (this._options.multiple) {
            var checkMultiOption = function checkMultiOption(value) {
                if (self._optionsContainer) {
                    var option = self._optionsContainer.querySelector('[data-value="' + value + '"]');
                    if (option) {
                        var checkbox = option.querySelector('input[type="checkbox"]');
                        if (checkbox && checkbox instanceof HTMLInputElement) {
                            checkbox.checked = true;
                        }
                        option.classList.add("selectbox-option-selected");
                        option.classList.add("checkbox--checked");
                    }
                }
            };
            if (Array.isArray(values)) {
                for (var i = 0; i < values.length; i++) {
                    value = values[i];
                    if (!this._selectedValues.has(value)) {
                        this._selectedValues.add(value);
                        checkMultiOption(value);
                    }
                }
            } else {
                value = values;
                if (!this._selectedValues.has(value)) {
                    this._selectedValues.add(value);
                    checkMultiOption(value);
                }
            }
        } else if (!Array.isArray(values)) {
            value = values;
            this._selectedValues.clear();
            this._selectedValues.add(value);
            if (this._optionsContainer) {
                var selectedOptions = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + value + '"]');
                selectedOptions.forEach(function(option) {
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                });
                var option = this._optionsContainer.querySelector('[data-value="' + value + '"]');
                if (option) {
                    option.classList.add("selectbox-option-selected");
                    option.classList.add("checkbox--checked");
                }
            }
            _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        if (bSilent) {
            return;
        }
        _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, true);
    }
    unselectItems(values, bSilent) {
        var self = this;
        if (!this._options.multiple) {
            console.error("Method unselectItem is only available for multi-select boxes.");
            return;
        }
        var value = "";
        var uncheckMultiOption = function uncheckMultiOption(value) {
            if (self._optionsContainer) {
                var option = self._optionsContainer.querySelector('[data-value="' + value + '"]');
                if (option) {
                    var checkbox = option.querySelector('input[type="checkbox"]');
                    if (checkbox && checkbox instanceof HTMLInputElement) {
                        checkbox.checked = false;
                    }
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                }
            }
        };
        if (Array.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                value = values[i];
                if (this._selectedValues.has(value)) {
                    this._selectedValues.delete(value);
                    uncheckMultiOption(value);
                }
            }
        } else {
            value = values;
            if (this._selectedValues.has(value)) {
                this._selectedValues.delete(value);
                uncheckMultiOption(value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        if (bSilent) {
            return;
        }
        _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, true);
    }
    disable() {
        this._select.classList.add("selectbox-disabled");
    }
    enable() {
        this._select.classList.remove("selectbox-disabled");
    }
    clear(bSelectFirst) {
        bSelectFirst = bSelectFirst || false;
        this._selectedValues.clear();
        if (bSelectFirst && this._items.length > 0) {
            var firstItem = this._items[0];
            if (firstItem) {
                this._selectedValues.add(firstItem.value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
    }
    destroy() {
        this._subscribers = [];
        _instances._.delete(this);
        try {
            if (this._header && this._boundHandles) {
                this._header.removeEventListener("click", this._boundHandles.toggle);
            }
            if (this.searchInput && this._boundHandles) {
                this.searchInput.removeEventListener("input", this._boundHandles.search);
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick);
            }
            if (document && this._boundHandles) {
                document.removeEventListener("click", this._boundHandles.close);
            }
            if (this._header && this._boundHandles) {
                this._header.removeEventListener("keydown", this._boundHandles.keydown);
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
            }
        } catch (error) {
            console.error(error);
        }
        this._container.innerHTML = "";
        var containerClasses = this._container.className.split(" ");
        var newClasses = [];
        for (var i = 0; i < containerClasses.length; i++) {
            if (containerClasses[i] !== "selectbox-container") {
                newClasses.push(containerClasses[i]);
            }
        }
        this._container.className = newClasses.join(" ");
    }
}

function _createDOM$1() {
    this._container.innerHTML = "";
    this._container.className += " selectbox-container";
    var fragment = document.createDocumentFragment();
    this._select.className += " selectbox";
    if (this._options.multiple) {
        this._select.className += " selectbox-multiple";
    }
    fragment.appendChild(this._select);
    this._header.className += " selectbox-header";
    this._select.appendChild(this._header);
    this._header.setAttribute("tabindex", "0");
    this._selectedText.className += " selectbox-selected-text";
    this._selectedText.textContent = this._options.placeholder;
    this._header.appendChild(this._selectedText);
    this._arrow.className += " selectbox-arrow";
    this._arrow.innerHTML = '<svg width="6" height="6" viewBox="0 0 6 6" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd"' + ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75 2.24889L3 4.49724L5.25 ' + '2.24889L3 0.00053797Z" fill="currentColor"/>' + "</svg>";
    this._header.appendChild(this._arrow);
    this._dropdown.className += " selectbox-dropdown";
    this._select.appendChild(this._dropdown);
    if (this._options.description) {
        var description = document.createElement("div");
        description.className += " i18n selectbox-description";
        description.textContent = this._options.description;
        this._dropdown.appendChild(description);
    }
    if (this._options.searchable) {
        var search = document.createElement("div");
        search.className += " selectbox-search";
        this._dropdown.appendChild(search);
        this.searchInput = document.createElement("input");
        this.searchInput.className += " selectbox-search-input";
        this.searchInput.type = "text";
        this.searchInput.placeholder = "Search...";
        search.appendChild(this.searchInput);
    }
    this._optionsContainer = document.createElement("div");
    this._optionsContainer.className += " selectbox-options";
    this._dropdown.appendChild(this._optionsContainer);
    this._container.appendChild(fragment);
}

function _bindEvents() {
    this._header.addEventListener("click", this._boundHandles.toggle);
    if (this.searchInput) {
        this.searchInput.addEventListener("input", this._boundHandles.search);
    }
    this._dropdown.addEventListener("click", this._boundHandles.dropdownClick);
    this._dropdown.addEventListener("wheel", function(e) {
        e.stopPropagation();
    });
    this._header.addEventListener("keydown", this._boundHandles.keydown);
    this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}

function _toggle(e) {
    e && e.stopPropagation();
    this.isOpen ? _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this) : this.openDropdown();
    if (e && e.type === "click") {
        for (var selBox of _instances._) {
            if (selBox.isOpen && selBox !== this) {
                _assertClassBrand(_SelectBox_brand, selBox, _closeDropdown).call(selBox);
            }
        }
    }
}

function _closeDropdown() {
    if (this.isOpen && document && this._boundHandles) {
        document.removeEventListener("click", this._boundHandles.close);
    }
    this.isOpen = false;
    this._dropdown.style.display = "none";
    var arrowClasses = this._arrow.className.split(" ");
    var newArrowClasses = [];
    for (var i = 0; i < arrowClasses.length; i++) {
        if (arrowClasses[i] !== "selectbox-arrow-open") {
            newArrowClasses.push(arrowClasses[i]);
        }
    }
    this._arrow.className = newArrowClasses.join(" ");
    var headerClasses = this._header.className.split(" ");
    var newHeaderClasses = [];
    for (var i = 0; i < headerClasses.length; i++) {
        if (headerClasses[i] !== "selectbox-header-open") {
            newHeaderClasses.push(headerClasses[i]);
        }
    }
    this._header.className = newHeaderClasses.join(" ");
    if (this.searchInput) {
        this.searchInput.value = "";
    }
}

function _handleSearch(e) {
    var target = e.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }
    var searchTerm = target.value.toLowerCase();
    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, searchTerm);
}

function _selectNextPrevItem(direction) {
    var searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : "";
    var newItem;
    var items = this._items.filter(function(item) {
        return item !== null;
    });
    if (searchTerm) {
        items = items.filter(function(item) {
            return item.text.toLowerCase().indexOf(searchTerm) !== -1;
        });
    }
    if (items.length === 0) {
        return;
    }
    if (direction === "up") {
        if (this._selectedValues.size === 0 && items.length > 0) {
            newItem = items[items.length - 1];
            this._selectedValues.add(newItem.value);
        } else {
            var selectedArray = Array.from(this._selectedValues);
            var currentIndex = -1;
            for (var i = 0; i < items.length; i++) {
                if (items[i].value === selectedArray[0]) {
                    currentIndex = i;
                    break;
                }
            }
            var prevIndex = (currentIndex - 1 + items.length) % items.length;
            this._selectedValues.clear();
            newItem = items[prevIndex];
            this._selectedValues.add(newItem.value);
        }
    } else {
        if (this._selectedValues.size === 0 && items.length > 0) {
            newItem = items[0];
            this._selectedValues.add(newItem.value);
        } else {
            var selectedArray = Array.from(this._selectedValues);
            var currentIndex = -1;
            for (var i = 0; i < items.length; i++) {
                if (items[i].value === selectedArray[0]) {
                    currentIndex = i;
                    break;
                }
            }
            var nextIndex = (currentIndex + 1) % items.length;
            if (nextIndex === items.length) {
                nextIndex = 0;
            }
            this._selectedValues.clear();
            newItem = items[nextIndex];
            this._selectedValues.add(newItem.value);
        }
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, searchTerm, true);
    _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, newItem.value, true);
}

function _handleKeydown(e) {
    var key = e.key || e.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        e.preventDefault();
        _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, e);
        break;

      case "Escape":
      case 27:
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        break;

      case "ArrowDown":
      case 40:
        e.preventDefault();
        _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "down");
        break;

      case "ArrowUp":
      case 38:
        e.preventDefault();
        _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "up");
        break;

      case "Tab":
      case 9:
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        break;
    }
}

function _renderOptions(searchTerm, scrollIntoView) {
    searchTerm = searchTerm || "";
    if (!this._optionsContainer) return;
    this._optionsContainer.innerHTML = "";
    var selectedOption = null;
    var filteredItems = this._items;
    if (searchTerm) {
        filteredItems = filteredItems.filter(function(item) {
            return item !== null && item.text.toLowerCase().indexOf(searchTerm) !== -1;
        });
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < filteredItems.length; i++) {
        var item = filteredItems[i];
        if (!item) {
            var hr = document.createElement("hr");
            hr.className += " selectbox-option-divider";
            fragment.appendChild(hr);
            continue;
        }
        var option = document.createElement("div");
        option.className += " selectbox-option";
        if (this._selectedValues.has(item.value)) {
            option.className += " selectbox-option-selected checkbox--checked";
            selectedOption = option;
        }
        option.setAttribute("data-value", item.value);
        var label = document.createElement("label");
        label.className += " selectbox-option-text";
        label.textContent = item.text;
        if (this._options.multiple) {
            option.className += " selectbox-option-checkbox";
            var input = document.createElement("input");
            input.type = "checkbox";
            input.id = "checkbox-" + item.value;
            input.className += " selectbox-checkbox";
            input.checked = this._selectedValues.has(item.value);
            option.appendChild(input);
            var visualCheckbox = document.createElement("span");
            visualCheckbox.className = "checkbox-visual";
            visualCheckbox.setAttribute("aria-hidden", "true");
            var svgNS = "http://www.w3.org/2000/svg";
            var checkmarkSVG = document.createElementNS(svgNS, "svg");
            checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
            checkmarkSVG.setAttribute("class", "checkbox-checkmark");
            var path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", "2");
            checkmarkSVG.appendChild(path);
            visualCheckbox.appendChild(checkmarkSVG);
            option.appendChild(visualCheckbox);
        }
        option.appendChild(label);
        fragment.appendChild(option);
    }
    if (this._customItems.length) {
        var _hr = document.createElement("hr");
        _hr.className += " selectbox-option-divider";
        fragment.appendChild(_hr);
    }
    for (var i = 0; i < this._customItems.length; i++) {
        var _item = this._customItems[i];
        var _option = document.createElement("label");
        _option.className += " selectbox-custom-option";
        _option.setAttribute("data-value", _item.value);
        _option.setAttribute("for", _item.value);
        var span = document.createElement("span");
        span.className += " selectbox-option-text";
        span.textContent = _item.text;
        _option.appendChild(span);
        fragment.appendChild(_option);
    }
    this._optionsContainer.appendChild(fragment);
    if (scrollIntoView && this.isOpen && this._optionsContainer && selectedOption) {
        try {
            if (selectedOption.scrollIntoView) {
                selectedOption.scrollIntoView({
                    block: "nearest"
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

function _handleDropdownClick(e) {
    var target = e.target || e.srcElement;
    var option = null;
    if (target && target instanceof HTMLElement) {
        var temp = null;
        var classList = target.className.split(" ");
        var hasOptionClass = false;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i] === "selectbox-option") {
                hasOptionClass = true;
                break;
            } else if (classList[i] === "selectbox-custom-option") {
                var val = target.getAttribute("data-value");
                if (val) {
                    e.stopPropagation();
                    _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, val);
                    _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                    return;
                }
                break;
            }
        }
        if (hasOptionClass) {
            temp = target;
        } else if (target.parentNode && target.parentNode instanceof HTMLElement) {
            var parentClassList = target.parentNode.className.split(" ");
            var parentHasOptionClass = false;
            for (var i = 0; i < parentClassList.length; i++) {
                if (parentClassList[i] === "selectbox-option") {
                    parentHasOptionClass = true;
                    break;
                } else if (parentClassList[i] === "selectbox-custom-option") {
                    var _val = target.parentNode.getAttribute("data-value");
                    if (_val) {
                        e.stopPropagation();
                        _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, _val);
                        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                        return;
                    }
                    break;
                }
            }
            if (parentHasOptionClass) {
                temp = target.parentNode;
            }
        }
        if (temp instanceof HTMLDivElement) {
            option = temp;
        } else {
            return;
        }
    } else {
        return;
    }
    var value = option.getAttribute("data-value");
    if (value === null) return;
    var enabled = true;
    if (this._options.multiple) {
        if (this._selectedValues.has(value)) {
            this.unselectItems(value, true);
            enabled = false;
        } else {
            this.selectItems(value, true);
        }
    } else {
        this.selectItems(value, true);
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, enabled);
}

function _updateSelectedText() {
    if (this._selectedValues.size === 0) {
        this._selectedText.textContent = this._options.placeholder;
        return;
    }
    if (this._options.multiple) {
        var selectedItems = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this._selectedValues.has(item.value)) {
                selectedItems.push(item);
            }
        }
        if (selectedItems.length === 0) {
            this._selectedText.textContent = this._options.placeholder;
        } else if (selectedItems.length === 1) {
            this._selectedText.textContent = selectedItems[0].text;
        } else {
            this._selectedText.textContent = selectedItems.length + " items selected";
        }
    } else {
        var selectedItem = null;
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this._selectedValues.has(item.value)) {
                selectedItem = item;
                break;
            }
        }
        this._selectedText.textContent = selectedItem ? selectedItem.text : this._options.placeholder;
    }
}

function _triggerChange(currentValue, enabled) {
    var values = Array.from(this._selectedValues);
    var items = [];
    for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item && this._selectedValues.has(item.value)) {
            items.push(item);
        }
    }
    var detail = {
        values: values,
        items: items,
        current: currentValue,
        enabled: enabled
    };
    this._subscribers.forEach(function(cb) {
        cb({
            type: "selectbox:change",
            detail: detail
        });
    });
}

function _triggerCustomChange(currentValue) {
    var detail = {
        values: [],
        current: currentValue,
        enabled: false
    };
    this._subscribers.forEach(function(cb) {
        cb({
            type: "selectbox:custom",
            detail: detail
        });
    });
}

var _instances = {
    _: new Set
};

var _container = new WeakMap;

var _Loader_brand = new WeakSet;

class Loader {
    constructor(containerId, _text) {
        _classPrivateMethodInitSpec(this, _Loader_brand);
        _classPrivateFieldInitSpec(this, _container, void 0);
        var temp = document.getElementById(containerId);
        if (temp instanceof HTMLElement === false) throw new Error("Invalid container");
        _classPrivateFieldSet2(_container, this, temp);
        _assertClassBrand(_Loader_brand, this, _createDOM).call(this, _text);
    }
    show() {
        var _classPrivateFieldGet2$1;
        (_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_container, this)) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.classList.remove("hidden");
    }
    hide() {
        var _classPrivateFieldGet3;
        (_classPrivateFieldGet3 = _classPrivateFieldGet2(_container, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.classList.add("hidden");
    }
    static show() {
        var _assertClassBrand$_;
        (_assertClassBrand$_ = _assertClassBrand(Loader, this, _mainLoaderContainer)._) === null || _assertClassBrand$_ === void 0 || _assertClassBrand$_.classList.remove("hidden");
    }
    static hide() {
        var _assertClassBrand$_2;
        (_assertClassBrand$_2 = _assertClassBrand(Loader, this, _mainLoaderContainer)._) === null || _assertClassBrand$_2 === void 0 || _assertClassBrand$_2.classList.add("hidden");
    }
}

function _createDOM(text) {
    _classPrivateFieldGet2(_container, this).classList.add("loader-container");
    var svgNS = "http://www.w3.org/2000/svg";
    var image = document.createElementNS(svgNS, "svg");
    image.classList.add("loader-image");
    image.setAttribute("viewBox", "0 0 20 20");
    var circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "10");
    circle.setAttribute("cy", "10");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "currentColor");
    circle.setAttribute("stroke-width", "1.5");
    circle.setAttribute("r", "7.25");
    circle.setAttribute("stroke-dasharray", "160%, 40%");
    image.appendChild(circle);
    _classPrivateFieldGet2(_container, this).appendChild(image);
    var title = document.createElement("div");
    title.classList.add("loader-title");
    title.classList.add("i18n");
    title.innerText = text;
    _classPrivateFieldGet2(_container, this).appendChild(title);
}

var _mainLoaderContainer = {
    _: document.getElementById("loader")
};

function translate(message) {
    return window.Asc.plugin.tr(message);
}

function CitationDocService(citPrefix, citSuffix, bibPrefix, bibSuffix) {
    this._citPrefixOld = "ZOTERO_CITATION";
    this._bibPrefixOld = "ZOTERO_BIBLIOGRAPHY";
    this._citPrefix = citPrefix;
    this._citSuffix = citSuffix;
    this._bibPrefix = bibPrefix;
    this._bibSuffix = bibSuffix;
    this._repeatTimeout;
    this._formatter = null;
}

CitationDocService.prototype._addAddinField = function(field) {
    return new Promise(function(resolve) {
        window.Asc.plugin.executeMethod("AddAddinField", [ field ], resolve);
    });
};

CitationDocService.prototype.addBibliography = function(text, value) {
    var self = this;
    var supSubPositions = this._removeSuperSubTagsWithPositions(text);
    var field = {
        Value: this._bibPrefix + value + this._bibSuffix,
        Content: supSubPositions.text
    };
    return this._addAddinField(field).then(function() {
        if (!supSubPositions.positions.length) return;
        return self._setSuperSubByPositions(supSubPositions.positions);
    });
};

CitationDocService.prototype.addCitation = function(text, value, notesStyle) {
    var self = this;
    var supSubPositions = this._removeSuperSubTagsWithPositions(text);
    var field = {
        Value: this._citPrefix + " " + this._citSuffix + value,
        Content: supSubPositions.text
    };
    if ("footnotes" === notesStyle) {
        window.Asc.plugin.callCommand(function() {
            var oDocument = Api.GetDocument();
            oDocument.AddFootnote();
        });
    } else if ("endnotes" === notesStyle) {
        window.Asc.plugin.callCommand(function() {
            var oDocument = Api.GetDocument();
            oDocument.AddEndnote();
        });
    }
    return this._addAddinField(field).then(function() {
        if (!supSubPositions.positions.length) return;
        return self._setSuperSubByPositions(supSubPositions.positions);
    });
};

CitationDocService.prototype._getAllAddinFields = function() {
    return new Promise(function(resolve, reject) {
        window.Asc.plugin.executeMethod("GetAllAddinFields", null, resolve);
    });
};

CitationDocService.prototype.getAddinZoteroFields = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self._getAllAddinFields().then(function(arrFields) {
            try {
                if (arrFields.length) {
                    arrFields = arrFields.filter(function(field) {
                        return field.Value.indexOf(self._citPrefix) !== -1 || field.Value.indexOf(self._bibPrefix) !== -1 || field.Value.indexOf(self._citPrefixOld) !== -1 || field.Value.indexOf(self._bibPrefixOld) !== -1;
                    });
                }
            } catch (e) {
                reject(e);
            }
            console.warn(arrFields);
            resolve(arrFields);
        });
    });
};

CitationDocService.prototype._removeSuperSubTagsWithPositions = function(escapedHtmlText) {
    var positions = [];
    var currentIndex = 0;
    var result = "";
    var tempResult = escapedHtmlText;
    tempResult = tempResult.replace(/<sup\b[^>]*>([^<]*)<\/sup>/gi, function(match, content, offset) {
        var start = offset + currentIndex;
        var end = start + content.length;
        positions.push({
            type: "sup",
            content: content,
            start: start,
            end: end,
            originalMatch: match
        });
        currentIndex += content.length - match.length;
        return content;
    });
    currentIndex = 0;
    result = tempResult;
    tempResult = tempResult.replace(/<sub\b[^>]*>([^<]*)<\/sub>/gi, function(match, content, offset) {
        var start = offset + currentIndex;
        var end = start + content.length;
        positions.push({
            type: "sub",
            content: content,
            start: start,
            end: end,
            originalMatch: match
        });
        currentIndex += content.length - match.length;
        return content;
    });
    result = tempResult;
    return {
        text: result,
        positions: positions.sort(function(a, b) {
            return a.start - b.start;
        })
    };
};

CitationDocService.prototype.saveAsText = function() {
    return this.getAddinZoteroFields().then(function(arrFields) {
        var count = arrFields.length;
        if (!count) {
            window.Asc.plugin.executeCommand("close", "");
            return false;
        }
        return new Promise(function(resolve) {
            arrFields.forEach(function(field) {
                window.Asc.plugin.executeMethod("RemoveFieldWrapper", [ field.FieldId ], function() {
                    count--;
                    if (!count) {
                        resolve(true);
                        window.Asc.plugin.executeCommand("close", "");
                    }
                });
            });
        });
    });
};

CitationDocService.prototype._setSuperSubByPositions = function(positions) {
    return new Promise(function(resolve) {
        var isCalc = true;
        var isClose = false;
        Asc.scope.positions = positions;
        Asc.plugin.callCommand(function() {
            var doc = Api.GetDocument();
            var run = doc.GetCurrentRun();
            Asc.scope.positions.forEach(function(pos) {
                var range = run.GetRange(pos.start, pos.end);
                if ("sup" === pos.type) {
                    range.SetVertAlign("superscript");
                } else {
                    range.SetVertAlign("subscript");
                }
            });
        }, isClose, isCalc, resolve);
    });
};

CitationDocService.prototype.updateAddinFields = function(fields) {
    return new Promise(function(resolve) {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [ fields ], resolve);
    });
};

function CitationItemData(id) {
    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("CitationItemData: id is required");
    }
    this._id = id;
    this._type = undefined;
    this._citationKey = undefined;
    this._categories = new Array;
    this._language = undefined;
    this._journalAbbreviation = undefined;
    this._shortTitle = undefined;
    this._author = new Array;
    this._chair = new Array;
    this._collectionEditor = new Array;
    this._compiler = new Array;
    this._composer = new Array;
    this._containerAuthor = new Array;
    this._contributor = new Array;
    this._curator = new Array;
    this._director = new Array;
    this._editor = new Array;
    this._editorialDirector = new Array;
    this._executiveProducer = new Array;
    this._guest = new Array;
    this._host = new Array;
    this._illustrator = new Array;
    this._narrator = new Array;
    this._organizer = new Array;
    this._originalAuthor = new Array;
    this._performer = new Array;
    this._producer = new Array;
    this._recipient = new Array;
    this._reviewedAuthor = new Array;
    this._scriptwriter = new Array;
    this._seriesCreator = new Array;
    this._translator = new Array;
    this._accessed = {};
    this._container = {};
    this._eventDate = {};
    this._issued = {};
    this._originalDate = {};
    this._submitted = {};
    this._abstract = undefined;
    this._annote = undefined;
    this._archive = undefined;
    this._archiveCollection = undefined;
    this._archiveLocation = undefined;
    this._archivePlace = undefined;
    this._authority = undefined;
    this._callNumber = undefined;
    this._chapterNumber = undefined;
    this._citationNumber = undefined;
    this._citationLabel = undefined;
    this._collectionNumber = undefined;
    this._collectionTitle = undefined;
    this._containerTitle = undefined;
    this._containerTitleShort = undefined;
    this._dimensions = undefined;
    this._DOI = undefined;
    this._edition = undefined;
    this._event = undefined;
    this._eventTitle = undefined;
    this._eventPlace = undefined;
    this._firstReferenceNoteNumber = undefined;
    this._genre = undefined;
    this._ISBN = undefined;
    this._ISSN = undefined;
    this._issue = undefined;
    this._jurisdiction = undefined;
    this._keyword = undefined;
    this._locator = undefined;
    this._medium = undefined;
    this._note = undefined;
    this._number = undefined;
    this._numberOfPages = undefined;
    this._numberOfVolumes = undefined;
    this._originalPublisher = undefined;
    this._originalPublisherPlace = undefined;
    this._originalTitle = undefined;
    this._page = undefined;
    this._part = undefined;
    this._partTitle = undefined;
    this._pageFirst = undefined;
    this._PMCID = undefined;
    this._PMID = undefined;
    this._printing = undefined;
    this._publisher = undefined;
    this._publisherPlace = undefined;
    this._references = undefined;
    this._reviewedGenre = undefined;
    this._reviewedTitle = undefined;
    this._scale = undefined;
    this._section = undefined;
    this._source = undefined;
    this._status = undefined;
    this._title = undefined;
    this._titleShort = undefined;
    this._URL = undefined;
    this._version = undefined;
    this._volume = undefined;
    this._volumeTitle = undefined;
    this._volumeTitleShort = undefined;
    this._yearSuffix = undefined;
    this._custom = {};
    this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}

CitationItemData.prototype._addCustomProperty = function(key, value) {
    this._custom[key] = value;
    return this;
};

CitationItemData.prototype.getCustomProperty = function(key) {
    if (Object.hasOwnProperty.call(this._custom, key)) return this._custom[key];
    return null;
};

CitationItemData.prototype.fillFromObject = function(itemDataObject) {
    if (Object.hasOwnProperty.call(itemDataObject, "type")) {
        this._type = itemDataObject.type;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "categories")) {
        this._categories = itemDataObject.categories;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "citation-key")) {
        this._citationKey = itemDataObject["citation-key"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "language")) {
        this._language = itemDataObject.language;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "journalAbbreviation")) {
        this._journalAbbreviation = itemDataObject.journalAbbreviation;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "shortTitle")) {
        this._shortTitle = itemDataObject.shortTitle;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "author")) {
        this._author = itemDataObject.author;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "chair")) {
        this._chair = itemDataObject.chair;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "collection-editor")) {
        this._collectionEditor = itemDataObject["collection-editor"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "compiler")) {
        this._compiler = itemDataObject.compiler;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "composer")) {
        this._composer = itemDataObject.composer;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "container-author")) {
        this._containerAuthor = itemDataObject["container-author"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "contributor")) {
        this._contributor = itemDataObject.contributor;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "curator")) {
        this._curator = itemDataObject.curator;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "director")) {
        this._director = itemDataObject.director;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "editorial-director")) {
        this._editorialDirector = itemDataObject["editorial-director"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "editor")) {
        this._editor = itemDataObject.editor;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "executive-producer")) {
        this._executiveProducer = itemDataObject["executive-producer"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "guest")) {
        this._guest = itemDataObject.guest;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "host")) {
        this._host = itemDataObject.host;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "illustrator")) {
        this._illustrator = itemDataObject.illustrator;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "narrator")) {
        this._narrator = itemDataObject.narrator;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "organizer")) {
        this._organizer = itemDataObject.organizer;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "original-author")) {
        this._originalAuthor = itemDataObject["original-author"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "performer")) {
        this._performer = itemDataObject.performer;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "producer")) {
        this._producer = itemDataObject.producer;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "recipient")) {
        this._recipient = itemDataObject.recipient;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "reviewed-author")) {
        this._reviewedAuthor = itemDataObject["reviewed-author"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "script-writer")) {
        this._scriptWriter = itemDataObject["script-writer"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "series-creator")) {
        this._seriesCreator = itemDataObject["series-creator"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "translator")) {
        this._translator = itemDataObject.translator;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "accessed")) {
        this._accessed = itemDataObject.accessed;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "container")) {
        this._container = itemDataObject.container;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "event-date")) {
        this._eventDate = itemDataObject["event-date"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "issued")) {
        this._issued = itemDataObject.issued;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "original-date")) {
        this._originalDate = itemDataObject["original-date"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "submitted")) {
        this._submitted = itemDataObject.submitted;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "abstract")) {
        this._abstract = itemDataObject.abstract;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "annote")) {
        this._annote = itemDataObject.annote;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "archive")) {
        this._archive = itemDataObject.archive;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "archive_collection")) {
        this._archiveCollection = itemDataObject["archive_collection"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "archive_location")) {
        this._archiveLocation = itemDataObject["archive_location"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "archive-place")) {
        this._archivePlace = itemDataObject["archive-place"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "authority")) {
        this._authority = itemDataObject.authority;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "call-number")) {
        this._callNumber = itemDataObject["call-number"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "chapter-number")) {
        this._chapterNumber = itemDataObject["chapter-number"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "citation-number")) {
        this._citationNumber = itemDataObject["citation-number"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "citation-label")) {
        this._citationLabel = itemDataObject["citation-label"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "collection-number")) {
        this._collectionNumber = itemDataObject["collection-number"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "collection-title")) {
        this._collectionTitle = itemDataObject["collection-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "container-title")) {
        this._containerTitle = itemDataObject["container-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "container-title-short")) {
        this._containerTitleShort = itemDataObject["container-title-short"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "dimensions")) {
        this._dimensions = itemDataObject.dimensions;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "DOI")) {
        this._DOI = itemDataObject.DOI;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "edition")) {
        this._edition = itemDataObject.edition;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "event")) {
        this._event = itemDataObject.event;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "event-title")) {
        this._eventTitle = itemDataObject["event-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "event-place")) {
        this._eventPlace = itemDataObject["event-place"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "first-reference-note-number")) {
        this._firstReferenceNoteNumber = itemDataObject["first-reference-note-number"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "genre")) {
        this._genre = itemDataObject.genre;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "ISBN")) {
        this._ISBN = itemDataObject.ISBN;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "ISSN")) {
        this._ISSN = itemDataObject.ISSN;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "issue")) {
        this._issue = itemDataObject.issue;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "jurisdiction")) {
        this._jurisdiction = itemDataObject.jurisdiction;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "keyword")) {
        this._keyword = itemDataObject.keyword;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "locator")) {
        this._locator = itemDataObject.locator;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "medium")) {
        this._medium = itemDataObject.medium;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "note")) {
        this._note = itemDataObject.note;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "number")) {
        this._number = itemDataObject.number;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "number-of-pages")) {
        this._numberOfPages = itemDataObject["number-of-pages"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "number-of-volumes")) {
        this._numberOfVolumes = itemDataObject["number-of-volumes"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "original-publisher")) {
        this._originalPublisher = itemDataObject["original-publisher"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "original-publisher-place")) {
        this._originalPublisherPlace = itemDataObject["original-publisher-place"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "original-title")) {
        this._originalTitle = itemDataObject["original-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "page")) {
        this._page = itemDataObject.page;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "page-first")) {
        this._pageFirst = itemDataObject["page-first"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "part")) {
        this._part = itemDataObject.part;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "part-title")) {
        this._partTitle = itemDataObject["part-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "PMCID")) {
        this._PMCID = itemDataObject.PMCID;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "PMID")) {
        this._PMID = itemDataObject.PMID;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "printing")) {
        this._printing = itemDataObject.printing;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "publisher")) {
        this._publisher = itemDataObject.publisher;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "publisher-place")) {
        this._publisherPlace = itemDataObject["publisher-place"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "references")) {
        this._references = itemDataObject.references;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "reviewed-genre")) {
        this._reviewedGenre = itemDataObject["reviewed-genre"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "reviewed-title")) {
        this._reviewedTitle = itemDataObject["reviewed-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "scale")) {
        this._scale = itemDataObject.scale;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "section")) {
        this._section = itemDataObject.section;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "source")) {
        this._source = itemDataObject.source;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "status")) {
        this._status = itemDataObject.status;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "title")) {
        this._title = itemDataObject.title;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "title-short")) {
        this._titleShort = itemDataObject["title-short"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "URL")) {
        this._URL = itemDataObject.URL;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "version")) {
        this._version = itemDataObject.version;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "volume")) {
        this._volume = itemDataObject.volume;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "volume-title")) {
        this._volumeTitle = itemDataObject["volume-title"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "volume-title-short")) {
        this._volumeTitleShort = itemDataObject["volume-title-short"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "year-suffix")) {
        this._yearSuffix = itemDataObject["year-suffix"];
    }
    if (Object.hasOwnProperty.call(itemDataObject, "custom")) {
        this._custom = itemDataObject.custom;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "userID")) {
        this._addCustomProperty("userID", itemDataObject.userID);
    }
    if (Object.hasOwnProperty.call(itemDataObject, "groupID")) {
        this._addCustomProperty("groupID", itemDataObject.groupID);
    }
    if (Object.hasOwnProperty.call(itemDataObject, "creators")) {
        var self = this;
        itemDataObject.creators.forEach(function(creator) {
            var author = {};
            if (creator.firstName) {
                author.given = creator.firstName;
            }
            if (creator.lastName) {
                author.family = creator.lastName;
            }
            var bHasAuthor = self._author.some(function(a) {
                if (a.family !== author.family && (a.family || author.family)) {
                    return false;
                }
                if (a.given !== author.given && (a.given || author.given)) {
                    return false;
                }
                return true;
            });
            if (bHasAuthor) {
                return;
            }
            self._author.push(author);
        }, this);
    }
    if (Object.hasOwnProperty.call(itemDataObject, "libraryCatalog")) {
        this._source = itemDataObject.libraryCatalog;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "place")) {
        this._eventPlace = itemDataObject.place;
        this._publisherPlace = itemDataObject.place;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "numberOfVolumes")) {
        this._numberOfVolumes = itemDataObject.numberOfVolumes;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "callNumber")) {
        this._callNumber = itemDataObject.callNumber;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "seriesNumber")) {
        this._collectionNumber = itemDataObject.seriesNumber;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "series")) {
        this._collectionTitle = itemDataObject.series;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "bookTitle")) {
        this._containerTitle = itemDataObject.bookTitle;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "extra")) {
        this._note = itemDataObject.extra;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "rights")) {
        this._license = itemDataObject.rights;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "archiveLocation")) {
        this._archiveLocation = itemDataObject.archiveLocation;
    }
    if (Object.hasOwnProperty.call(itemDataObject, "abstractNote")) {
        this._abstract = itemDataObject.abstractNote;
    }
};

CitationItemData.prototype.getTitle = function() {
    return this._title;
};

CitationItemData.prototype.getType = function() {
    return this._type;
};

CitationItemData.prototype.setType = function(type) {
    this._type = type;
    return this;
};

CitationItemData.prototype.setCitationKey = function(key) {
    this._citationKey = key;
    return this;
};

CitationItemData.prototype.setCategories = function(categories) {
    this._categories = categories;
    return this;
};

CitationItemData.prototype.setLanguage = function(language) {
    this._language = language;
    return this;
};

CitationItemData.prototype.setJournalAbbreviation = function(journalAbbreviation) {
    this._journalAbbreviation = journalAbbreviation;
    return this;
};

CitationItemData.prototype.setShortTitle = function(shortTitle) {
    this._shortTitle = shortTitle;
    return this;
};

CitationItemData.prototype.setAuthor = function(author) {
    this._author = Array.isArray(author) ? author : [ author ];
    return this;
};

CitationItemData.prototype.setChair = function(chair) {
    this._chair = Array.isArray(chair) ? chair : [ chair ];
    return this;
};

CitationItemData.prototype.setCollectionEditor = function(collectionEditor) {
    this._collectionEditor = Array.isArray(collectionEditor) ? collectionEditor : [ collectionEditor ];
    return this;
};

CitationItemData.prototype.setCompiler = function(compiler) {
    this._compiler = Array.isArray(compiler) ? compiler : [ compiler ];
    return this;
};

CitationItemData.prototype.setComposer = function(composer) {
    this._composer = Array.isArray(composer) ? composer : [ composer ];
    return this;
};

CitationItemData.prototype.setContainerAuthor = function(containerAuthor) {
    this._containerAuthor = Array.isArray(containerAuthor) ? containerAuthor : [ containerAuthor ];
    return this;
};

CitationItemData.prototype.setContributor = function(contributor) {
    this._contributor = Array.isArray(contributor) ? contributor : [ contributor ];
    return this;
};

CitationItemData.prototype.setCurator = function(curator) {
    this._curator = Array.isArray(curator) ? curator : [ curator ];
    return this;
};

CitationItemData.prototype.setDirector = function(director) {
    this._director = Array.isArray(director) ? director : [ director ];
    return this;
};

CitationItemData.prototype.setEditor = function(editor) {
    this._editor = Array.isArray(editor) ? editor : [ editor ];
    return this;
};

CitationItemData.prototype.setEditorialDirector = function(editorialDirector) {
    this._editorialDirector = Array.isArray(editorialDirector) ? editorialDirector : [ editorialDirector ];
    return this;
};

CitationItemData.prototype.setExecutiveProducer = function(executiveProducer) {
    this._executiveProducer = Array.isArray(executiveProducer) ? executiveProducer : [ executiveProducer ];
    return this;
};

CitationItemData.prototype.setGuest = function(guest) {
    this._guest = Array.isArray(guest) ? guest : [ guest ];
    return this;
};

CitationItemData.prototype.setHost = function(host) {
    this._host = Array.isArray(host) ? host : [ host ];
    return this;
};

CitationItemData.prototype.setIllustrator = function(illustrator) {
    this._illustrator = Array.isArray(illustrator) ? illustrator : [ illustrator ];
    return this;
};

CitationItemData.prototype.setNarrator = function(narrator) {
    this._narrator = Array.isArray(narrator) ? narrator : [ narrator ];
    return this;
};

CitationItemData.prototype.setOrganizer = function(organizer) {
    this._organizer = Array.isArray(organizer) ? organizer : [ organizer ];
    return this;
};

CitationItemData.prototype.setOriginalAuthor = function(originalAuthor) {
    this._originalAuthor = Array.isArray(originalAuthor) ? originalAuthor : [ originalAuthor ];
    return this;
};

CitationItemData.prototype.setPerformer = function(performer) {
    this._performer = Array.isArray(performer) ? performer : [ performer ];
    return this;
};

CitationItemData.prototype.setProducer = function(producer) {
    this._producer = Array.isArray(producer) ? producer : [ producer ];
    return this;
};

CitationItemData.prototype.setRecipient = function(recipient) {
    this._recipient = Array.isArray(recipient) ? recipient : [ recipient ];
    return this;
};

CitationItemData.prototype.setReviewedAuthor = function(reviewedAuthor) {
    this._reviewedAuthor = Array.isArray(reviewedAuthor) ? reviewedAuthor : [ reviewedAuthor ];
    return this;
};

CitationItemData.prototype.setScriptwriter = function(scriptwriter) {
    this._scriptwriter = Array.isArray(scriptwriter) ? scriptwriter : [ scriptwriter ];
    return this;
};

CitationItemData.prototype.setSeriesCreator = function(seriesCreator) {
    this._seriesCreator = Array.isArray(seriesCreator) ? seriesCreator : [ seriesCreator ];
    return this;
};

CitationItemData.prototype.setTranslator = function(translator) {
    this._translator = Array.isArray(translator) ? translator : [ translator ];
    return this;
};

CitationItemData.prototype.setAccessed = function(accessed) {
    this._accessed = accessed || {};
    return this;
};

CitationItemData.prototype.setContainer = function(container) {
    this._container = container || {};
    return this;
};

CitationItemData.prototype.setEventDate = function(eventDate) {
    this._eventDate = eventDate || {};
    return this;
};

CitationItemData.prototype.setIssued = function(issued) {
    this._issued = issued || {};
    return this;
};

CitationItemData.prototype.setOriginalDate = function(originalDate) {
    this._originalDate = originalDate || {};
    return this;
};

CitationItemData.prototype.setSubmitted = function(submitted) {
    this._submitted = submitted || {};
    return this;
};

CitationItemData.prototype.setAbstract = function(abstract) {
    this._abstract = abstract;
    return this;
};

CitationItemData.prototype.setAnnote = function(annote) {
    this._annote = annote;
    return this;
};

CitationItemData.prototype.setArchive = function(archive) {
    this._archive = archive;
    return this;
};

CitationItemData.prototype.setArchiveCollection = function(archiveCollection) {
    this._archiveCollection = archiveCollection;
    return this;
};

CitationItemData.prototype.setArchiveLocation = function(archiveLocation) {
    this._archiveLocation = archiveLocation;
    return this;
};

CitationItemData.prototype.setArchivePlace = function(archivePlace) {
    this._archivePlace = archivePlace;
    return this;
};

CitationItemData.prototype.setAuthority = function(authority) {
    this._authority = authority;
    return this;
};

CitationItemData.prototype.setCallNumber = function(callNumber) {
    this._callNumber = callNumber;
    return this;
};

CitationItemData.prototype.setChapterNumber = function(chapterNumber) {
    this._chapterNumber = chapterNumber;
    return this;
};

CitationItemData.prototype.setCitationNumber = function(citationNumber) {
    this._citationNumber = citationNumber;
    return this;
};

CitationItemData.prototype.setCitationLabel = function(citationLabel) {
    this._citationLabel = citationLabel;
    return this;
};

CitationItemData.prototype.setCollectionNumber = function(collectionNumber) {
    this._collectionNumber = collectionNumber;
    return this;
};

CitationItemData.prototype.setCollectionTitle = function(collectionTitle) {
    this._collectionTitle = collectionTitle;
    return this;
};

CitationItemData.prototype.setContainerTitle = function(containerTitle) {
    this._containerTitle = containerTitle;
    return this;
};

CitationItemData.prototype.setContainerTitleShort = function(containerTitleShort) {
    this._containerTitleShort = containerTitleShort;
    return this;
};

CitationItemData.prototype.setDimensions = function(dimensions) {
    this._dimensions = dimensions;
    return this;
};

CitationItemData.prototype.setDOI = function(DOI) {
    this._DOI = DOI;
    return this;
};

CitationItemData.prototype.setEdition = function(edition) {
    this._edition = edition;
    return this;
};

CitationItemData.prototype.setEvent = function(event) {
    this._event = event;
    return this;
};

CitationItemData.prototype.setEventTitle = function(eventTitle) {
    this._eventTitle = eventTitle;
    return this;
};

CitationItemData.prototype.setEventPlace = function(eventPlace) {
    this._eventPlace = eventPlace;
    return this;
};

CitationItemData.prototype.setFirstReferenceNoteNumber = function(firstReferenceNoteNumber) {
    this._firstReferenceNoteNumber = firstReferenceNoteNumber;
    return this;
};

CitationItemData.prototype.setGenre = function(genre) {
    this._genre = genre;
    return this;
};

CitationItemData.prototype.setISBN = function(ISBN) {
    this._ISBN = ISBN;
    return this;
};

CitationItemData.prototype.setISSN = function(ISSN) {
    this._ISSN = ISSN;
    return this;
};

CitationItemData.prototype.setIssue = function(issue) {
    this._issue = issue;
    return this;
};

CitationItemData.prototype.setJurisdiction = function(jurisdiction) {
    this._jurisdiction = jurisdiction;
    return this;
};

CitationItemData.prototype.setKeyword = function(keyword) {
    this._keyword = keyword;
    return this;
};

CitationItemData.prototype.setLocator = function(locator) {
    this._locator = locator;
    return this;
};

CitationItemData.prototype.setMedium = function(medium) {
    this._medium = medium;
    return this;
};

CitationItemData.prototype.setNote = function(note) {
    this._note = note;
    return this;
};

CitationItemData.prototype.setNumber = function(number) {
    this._number = number;
    return this;
};

CitationItemData.prototype.setNumberOfPages = function(numberOfPages) {
    this._numberOfPages = numberOfPages;
    return this;
};

CitationItemData.prototype.setNumberOfVolumes = function(numberOfVolumes) {
    this._numberOfVolumes = numberOfVolumes;
    return this;
};

CitationItemData.prototype.setOriginalPublisher = function(originalPublisher) {
    this._originalPublisher = originalPublisher;
    return this;
};

CitationItemData.prototype.setOriginalPublisherPlace = function(originalPublisherPlace) {
    this._originalPublisherPlace = originalPublisherPlace;
    return this;
};

CitationItemData.prototype.setOriginalTitle = function(originalTitle) {
    this._originalTitle = originalTitle;
    return this;
};

CitationItemData.prototype.setPage = function(page) {
    this._page = page;
    return this;
};

CitationItemData.prototype.setPageFirst = function(pageFirst) {
    this._pageFirst = pageFirst;
    return this;
};

CitationItemData.prototype.setPart = function(part) {
    this._part = part;
    return this;
};

CitationItemData.prototype.setPartTitle = function(partTitle) {
    this._partTitle = partTitle;
    return this;
};

CitationItemData.prototype.setPMCID = function(PMCID) {
    this._PMCID = PMCID;
    return this;
};

CitationItemData.prototype.setPMID = function(PMID) {
    this._PMID = PMID;
    return this;
};

CitationItemData.prototype.setPrinting = function(printing) {
    this._printing = printing;
    return this;
};

CitationItemData.prototype.setPublisher = function(publisher) {
    this._publisher = publisher;
    return this;
};

CitationItemData.prototype.setPublisherPlace = function(publisherPlace) {
    this._publisherPlace = publisherPlace;
    return this;
};

CitationItemData.prototype.setReferences = function(references) {
    this._references = references;
    return this;
};

CitationItemData.prototype.setReviewedGenre = function(reviewedGenre) {
    this._reviewedGenre = reviewedGenre;
    return this;
};

CitationItemData.prototype.setReviewedTitle = function(reviewedTitle) {
    this._reviewedTitle = reviewedTitle;
    return this;
};

CitationItemData.prototype.setScale = function(scale) {
    this._scale = scale;
    return this;
};

CitationItemData.prototype.setSection = function(section) {
    this._section = section;
    return this;
};

CitationItemData.prototype.setSource = function(source) {
    this._source = source;
    return this;
};

CitationItemData.prototype.setStatus = function(status) {
    this._status = status;
    return this;
};

CitationItemData.prototype.setTitle = function(title) {
    this._title = title;
    return this;
};

CitationItemData.prototype.setTitleShort = function(titleShort) {
    this._titleShort = titleShort;
    return this;
};

CitationItemData.prototype.setURL = function(URL) {
    this._URL = URL;
    return this;
};

CitationItemData.prototype.setVersion = function(version) {
    this._version = version;
    return this;
};

CitationItemData.prototype.setVolume = function(volume) {
    this._volume = volume;
    return this;
};

CitationItemData.prototype.setVolumeTitle = function(volumeTitle) {
    this._volumeTitle = volumeTitle;
    return this;
};

CitationItemData.prototype.setVolumeTitleShort = function(volumeTitleShort) {
    this._volumeTitleShort = volumeTitleShort;
    return this;
};

CitationItemData.prototype.setYearSuffix = function(yearSuffix) {
    this._yearSuffix = yearSuffix;
    return this;
};

CitationItemData.prototype.setCustom = function(custom) {
    this._custom = Object.assign(this._custom, custom);
    return this;
};

CitationItemData.prototype.toJSON = function() {
    var result = {};
    result.id = this._id;
    if (this._type !== undefined && this._type !== "") result.type = this._type;
    if (this._citationKey !== undefined && this._citationKey !== "") result["citation-key"] = this._citationKey;
    if (this._categories.length > 0) result.categories = this._categories;
    if (this._language !== undefined && this._language !== "") result.language = this._language;
    if (this._journalAbbreviation !== undefined && this._journalAbbreviation !== "") result.journalAbbreviation = this._journalAbbreviation;
    if (this._shortTitle !== undefined && this._shortTitle !== "") {
        result.shortTitle = this._shortTitle;
        if (this._titleShort === undefined) result["title-short"] = this._shortTitle;
    }
    if (this._author.length > 0) result.author = this._author;
    if (this._chair.length > 0) result.chair = this._chair;
    if (this._collectionEditor.length > 0) result["collection-editor"] = this._collectionEditor;
    if (this._compiler.length > 0) result.compiler = this._compiler;
    if (this._composer.length > 0) result.composer = this._composer;
    if (this._containerAuthor.length > 0) result["container-author"] = this._containerAuthor;
    if (this._contributor.length > 0) result.contributor = this._contributor;
    if (this._curator.length > 0) result.curator = this._curator;
    if (this._director.length > 0) result.director = this._director;
    if (this._editor.length > 0) result.editor = this._editor;
    if (this._editorialDirector.length > 0) result["editorial-director"] = this._editorialDirector;
    if (this._executiveProducer.length > 0) result["executive-producer"] = this._executiveProducer;
    if (this._guest.length > 0) result.guest = this._guest;
    if (this._host.length > 0) result.host = this._host;
    if (this._illustrator.length > 0) result.illustrator = this._illustrator;
    if (this._narrator.length > 0) result.narrator = this._narrator;
    if (this._organizer.length > 0) result.organizer = this._organizer;
    if (this._originalAuthor.length > 0) result["original-author"] = this._originalAuthor;
    if (this._performer.length > 0) result.performer = this._performer;
    if (this._producer.length > 0) result.producer = this._producer;
    if (this._recipient.length > 0) result.recipient = this._recipient;
    if (this._reviewedAuthor.length > 0) result["reviewed-author"] = this._reviewedAuthor;
    if (this._scriptwriter.length > 0) result["script-writer"] = this._scriptwriter;
    if (this._seriesCreator.length > 0) result["series-creator"] = this._seriesCreator;
    if (this._translator.length > 0) result.translator = this._translator;
    if (Object.keys(this._accessed).length > 0) result.accessed = this._accessed;
    if (Object.keys(this._container).length > 0) result.container = this._container;
    if (Object.keys(this._eventDate).length > 0) result["event-date"] = this._eventDate;
    if (Object.keys(this._issued).length > 0) result.issued = this._issued;
    if (Object.keys(this._originalDate).length > 0) result["original-date"] = this._originalDate;
    if (Object.keys(this._submitted).length > 0) result.submitted = this._submitted;
    if (this._abstract !== undefined && this._abstract !== "") result.abstract = this._abstract;
    if (this._annote !== undefined && this._annote !== "") result.annote = this._annote;
    if (this._archive !== undefined && this._archive !== "") result.archive = this._archive;
    if (this._archiveCollection !== undefined && this._archiveCollection !== "") result["archive_collection"] = this._archiveCollection;
    if (this._archiveLocation !== undefined && this._archiveLocation !== "") result["archive_location"] = this._archiveLocation;
    if (this._archivePlace !== undefined && this._archivePlace !== "") result["archive-place"] = this._archivePlace;
    if (this._authority !== undefined && this._authority !== "") result.authority = this._authority;
    if (this._callNumber !== undefined && this._callNumber !== "") result["call-number"] = this._callNumber;
    if (this._chapterNumber !== undefined && this._chapterNumber !== "") result["chapter-number"] = this._chapterNumber;
    if (this._citationNumber !== undefined && this._citationNumber !== "") result["citation-number"] = this._citationNumber;
    if (this._citationLabel !== undefined && this._citationLabel !== "") result["citation-label"] = this._citationLabel;
    if (this._collectionNumber !== undefined && this._collectionNumber !== "") result["collection-number"] = this._collectionNumber;
    if (this._collectionTitle !== undefined && this._collectionTitle !== "") result["collection-title"] = this._collectionTitle;
    if (this._containerTitle !== undefined && this._containerTitle !== "") result["container-title"] = this._containerTitle;
    if (this._containerTitleShort !== undefined && this._containerTitleShort !== "") result["container-title-short"] = this._containerTitleShort;
    if (this._dimensions !== undefined && this._dimensions !== "") result.dimensions = this._dimensions;
    if (this._DOI !== undefined && this._DOI !== "") result.DOI = this._DOI;
    if (this._edition !== undefined && this._edition !== "") result.edition = this._edition;
    if (this._event !== undefined && this._event !== "") result.event = this._event;
    if (this._eventTitle !== undefined && this._eventTitle !== "") result["event-title"] = this._eventTitle;
    if (this._eventPlace !== undefined && this._eventPlace !== "") result["event-place"] = this._eventPlace;
    if (this._firstReferenceNoteNumber !== undefined && this._firstReferenceNoteNumber !== "") result["first-reference-note-number"] = this._firstReferenceNoteNumber;
    if (this._genre !== undefined && this._genre !== "") result.genre = this._genre;
    if (this._ISBN !== undefined && this._ISBN !== "") result.ISBN = this._ISBN;
    if (this._ISSN !== undefined && this._ISSN !== "") result.ISSN = this._ISSN;
    if (this._issue !== undefined && this._issue !== "") result.issue = this._issue;
    if (this._jurisdiction !== undefined && this._jurisdiction !== "") result.jurisdiction = this._jurisdiction;
    if (this._keyword !== undefined && this._keyword !== "") result.keyword = this._keyword;
    if (this._locator !== undefined && this._locator !== "") result.locator = this._locator;
    if (this._medium !== undefined && this._medium !== "") result.medium = this._medium;
    if (this._note !== undefined && this._note !== "") result.note = this._note;
    if (this._number !== undefined && this._number !== "") result.number = this._number;
    if (this._numberOfPages !== undefined && this._numberOfPages !== "") result["number-of-pages"] = this._numberOfPages;
    if (this._numberOfVolumes !== undefined && this._numberOfVolumes !== "") result["number-of-volumes"] = this._numberOfVolumes;
    if (this._originalPublisher !== undefined && this._originalPublisher !== "") result["original-publisher"] = this._originalPublisher;
    if (this._originalPublisherPlace !== undefined && this._originalPublisherPlace !== "") result["original-publisher-place"] = this._originalPublisherPlace;
    if (this._originalTitle !== undefined && this._originalTitle !== "") result["original-title"] = this._originalTitle;
    if (this._page !== undefined && this._page !== "") result.page = this._page;
    if (this._pageFirst !== undefined && this._pageFirst !== "") result["page-first"] = this._pageFirst;
    if (this._part !== undefined && this._part !== "") result.part = this._part;
    if (this._partTitle !== undefined && this._partTitle !== "") result["part-title"] = this._partTitle;
    if (this._PMCID !== undefined && this._PMCID !== "") result.PMCID = this._PMCID;
    if (this._PMID !== undefined && this._PMID !== "") result.PMID = this._PMID;
    if (this._printing !== undefined && this._printing !== "") result.printing = this._printing;
    if (this._publisher !== undefined && this._publisher !== "") result.publisher = this._publisher;
    if (this._publisherPlace !== undefined && this._publisherPlace !== "") result["publisher-place"] = this._publisherPlace;
    if (this._references !== undefined && this._references !== "") result.references = this._references;
    if (this._reviewedGenre !== undefined && this._reviewedGenre !== "") result["reviewed-genre"] = this._reviewedGenre;
    if (this._reviewedTitle !== undefined && this._reviewedTitle !== "") result["reviewed-title"] = this._reviewedTitle;
    if (this._scale !== undefined && this._scale !== "") result.scale = this._scale;
    if (this._section !== undefined && this._section !== "") result.section = this._section;
    if (this._source !== undefined && this._source !== "") result.source = this._source;
    if (this._status !== undefined && this._status !== "") result.status = this._status;
    if (this._title !== undefined && this._title !== "") result.title = this._title;
    if (this._titleShort !== undefined && this._titleShort !== "") result["title-short"] = this._titleShort;
    if (this._URL !== undefined && this._URL !== "") result.URL = this._URL;
    if (this._version !== undefined && this._version !== "") result.version = this._version;
    if (this._volume !== undefined && this._volume !== "") result.volume = this._volume;
    if (this._volumeTitle !== undefined && this._volumeTitle !== "") result["volume-title"] = this._volumeTitle;
    if (this._volumeTitleShort !== undefined && this._volumeTitleShort !== "") result["volume-title-short"] = this._volumeTitleShort;
    if (this._yearSuffix !== undefined && this._yearSuffix !== "") result["year-suffix"] = this._yearSuffix;
    if (Object.keys(this._custom).length !== 0) result.custom = this._custom;
    if (this._license !== undefined && this._license !== "") result.license = this._license;
    return result;
};

function CitationItem(id) {
    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("CitationItem: id is required");
    }
    this.id = id;
    this._itemData = new CitationItemData(id);
    this._prefix = undefined;
    this._suffix = undefined;
    this._locator = undefined;
    this._label = undefined;
    this._suppressAuthor = undefined;
    this._authorOnly = undefined;
    this._uris = new Array;
}

CitationItem.prototype.fillFromObject = function(itemObject) {
    var self = this;
    if (Object.hasOwnProperty.call(itemObject, "version") && Object.hasOwnProperty.call(itemObject, "library")) {
        this._itemData.fillFromObject(itemObject.data);
        if (Object.hasOwnProperty.call(itemObject, "links")) {
            if (Object.hasOwnProperty.call(itemObject.links, "self")) {
                this.addUri(itemObject.links.self.href);
            }
            if (Object.hasOwnProperty.call(itemObject.links, "alternate")) {
                this.addUri(itemObject.links.alternate.href);
            }
        }
    } else if (Object.hasOwnProperty.call(itemObject, "itemData")) {
        this._itemData.fillFromObject(itemObject.itemData);
    } else {
        this._itemData.fillFromObject(itemObject);
    }
    if (Object.hasOwnProperty.call(itemObject, "prefix")) this._prefix = itemObject.prefix;
    if (Object.hasOwnProperty.call(itemObject, "suffix")) this._suffix = itemObject.suffix;
    if (Object.hasOwnProperty.call(itemObject, "locator")) this._locator = itemObject.locator;
    if (Object.hasOwnProperty.call(itemObject, "label")) this._label = itemObject.label;
    if (Object.hasOwnProperty.call(itemObject, "suppress-author")) this._suppressAuthor = itemObject["suppress-author"];
    if (Object.hasOwnProperty.call(itemObject, "author-only")) this._authorOnly = itemObject["author-only"];
    if (Object.hasOwnProperty.call(itemObject, "uris")) {
        itemObject.uris.forEach(function(uri) {
            self.addUri(uri);
        }, this);
    }
};

CitationItem.prototype.getInfoForCitationCluster = function() {
    var info = {
        id: this.id,
        "suppress-author": this._suppressAuthor
    };
    if (this._prefix) {
        info.prefix = this._prefix;
    }
    if (this._suffix) {
        info.suffix = this._suffix;
    }
    if (this._locator) {
        info.locator = this._locator;
    }
    if (this._label) {
        info.label = this._label;
    }
    return info;
};

CitationItem.prototype.getItemData = function() {
    return this._itemData;
};

CitationItem.prototype.getProperty = function(key) {
    if (this._itemData.getCustomProperty(key) !== null) {
        return this._itemData.getCustomProperty(key);
    }
    return null;
};

CitationItem.prototype.setPrefix = function(prefix) {
    this._prefix = prefix;
    return this;
};

CitationItem.prototype.setSuffix = function(suffix) {
    this._suffix = suffix;
    return this;
};

CitationItem.prototype.setLocator = function(locator) {
    this._locator = locator;
    return this;
};

CitationItem.prototype.setLabel = function(label) {
    if (label) {
        var validLabels = [ "act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume" ];
        if (validLabels.indexOf(label) === -1) {
            throw new Error('CitationItem.setLocator: Invalid label "' + label + '"');
        }
        this._label = label;
    }
    return this;
};

CitationItem.prototype.setSuppressAuthor = function(value) {
    this._suppressAuthor = value;
    return this;
};

CitationItem.prototype.setAuthorOnly = function(value) {
    this._authorOnly = value;
    return this;
};

CitationItem.prototype.addUri = function(uri) {
    if (this._uris.indexOf(uri) !== -1) {
        return this;
    }
    this._uris.push(uri);
    return this;
};

CitationItem.prototype.toJSON = function() {
    var result = {};
    result.id = this.id;
    if (this._itemData) {
        result.itemData = this._itemData.toJSON ? this._itemData.toJSON() : this._itemData;
    }
    if (this._prefix !== undefined) result.prefix = this._prefix;
    if (this._suffix !== undefined) result.suffix = this._suffix;
    if (this._locator !== undefined) result.locator = this._locator;
    if (this._label !== undefined) result.label = this._label;
    if (this._suppressAuthor !== undefined) result["suppress-author"] = this._suppressAuthor;
    if (this._authorOnly !== undefined) result["author-only"] = this._authorOnly;
    if (this._uris.length) result.uris = this._uris;
    return result;
};

CitationItem.prototype.toFlatJSON = function(index) {
    var oldItem = {
        id: this.id,
        index: index
    };
    if (this._suppressAuthor !== undefined) {
        oldItem["suppress-author"] = this._suppressAuthor;
    }
    var itemDataObject = this._itemData.toJSON();
    Object.assign(oldItem, itemDataObject);
    if (typeof this._itemData.getCustomProperty("userID") !== "undefined" && this._itemData.getCustomProperty("userID") !== null) {
        oldItem.userID = String(this._itemData.getCustomProperty("userID"));
    }
    if (typeof this._itemData.getCustomProperty("groupID") !== "undefined" && this._itemData.getCustomProperty("groupID") !== null) {
        oldItem.groupID = String(this._itemData.getCustomProperty("groupID"));
    }
    return oldItem;
};

var _items = new WeakMap;

var _ids = new WeakMap;

class CSLCitationStorage {
    constructor() {
        _classPrivateFieldInitSpec(this, _items, void 0);
        _classPrivateFieldInitSpec(this, _ids, void 0);
        _classPrivateFieldSet2(_items, this, []);
        _classPrivateFieldSet2(_ids, this, []);
        this.size = 0;
    }
    get(id) {
        id = id.toString();
        var index = _classPrivateFieldGet2(_ids, this).indexOf(id);
        if (index >= 0) return _classPrivateFieldGet2(_items, this)[index];
        return null;
    }
    getIndex(id) {
        id = id.toString();
        return _classPrivateFieldGet2(_ids, this).indexOf(id);
    }
    clear() {
        _classPrivateFieldSet2(_items, this, []);
        _classPrivateFieldSet2(_ids, this, []);
        this.size = 0;
        return this;
    }
    delete(id) {
        id = id.toString();
        var index = _classPrivateFieldGet2(_ids, this).indexOf(id);
        if (index >= 0) {
            _classPrivateFieldGet2(_items, this).splice(index, 1);
            _classPrivateFieldGet2(_ids, this).splice(index, 1);
            this.size--;
        }
        return this;
    }
    forEach(callback) {
        for (var i = 0; i < this.size; i++) {
            callback(_classPrivateFieldGet2(_items, this)[i], _classPrivateFieldGet2(_ids, this)[i], this);
        }
    }
    has(id) {
        id = id.toString();
        return _classPrivateFieldGet2(_ids, this).indexOf(id) >= 0;
    }
    set(id, item) {
        id = id.toString();
        var index = _classPrivateFieldGet2(_ids, this).indexOf(id);
        if (index >= 0) {
            _classPrivateFieldGet2(_items, this)[index] = item;
            return this;
        }
        _classPrivateFieldGet2(_items, this).push(item);
        _classPrivateFieldGet2(_ids, this).push(id);
        this.size++;
        return this;
    }
}

function CSLCitation(itemsStartIndex, citationID) {
    if (!citationID) {
        citationID = this._generateId();
    }
    if (typeof itemsStartIndex !== "number") {
        throw new Error("itemsStartIndex is required");
    }
    this.citationID = citationID;
    this._itemsStartIndex = itemsStartIndex;
    this._citationItems = new Array;
    this._properties = {};
    this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
}

CSLCitation.prototype.fillFromObject = function(citationObject) {
    if (Object.hasOwnProperty.call(citationObject, "properties") || Object.hasOwnProperty.call(citationObject, "schema")) {
        return this._fillFromCitationObject(citationObject);
    } else if (Object.hasOwnProperty.call(citationObject, "citationItems")) {
        return this._fillFromFlatCitationObject(citationObject);
    } else if (Object.hasOwnProperty.call(citationObject, "version") && Object.hasOwnProperty.call(citationObject, "library")) {
        return this._fillFromJson(citationObject);
    }
    return this._fillFromCslJson(citationObject);
};

CSLCitation.prototype._fillFromCitationObject = function(citationObject) {
    var self = this;
    if (Object.hasOwnProperty.call(citationObject, "schema")) ;
    if (Object.hasOwnProperty.call(citationObject, "properties")) {
        this._setProperties(citationObject.properties);
    }
    if (!Object.hasOwnProperty.call(citationObject, "citationItems")) {
        console.error("citationItems is empty");
        return 0;
    }
    var existingIds = this._citationItems.map(function(item) {
        return item.id;
    });
    citationObject.citationItems.forEach(function(item) {
        var id = item.id;
        var citationItem;
        if (existingIds.indexOf(id) >= 0) {
            citationItem = self._citationItems[existingIds.indexOf(id)];
        } else {
            citationItem = new CitationItem(id);
            existingIds.push(id);
        }
        if (typeof id === "number") {
            id = self._extractIdFromWord365Citation(item);
        }
        citationItem.fillFromObject(item);
        self._addCitationItem(citationItem);
    }, this);
    return existingIds.length;
};

CSLCitation.prototype._fillFromFlatCitationObject = function(citationObject) {
    var self = this;
    if (citationObject.citationItems.length === 0) {
        console.error("CSLCitation.citationItems: citationItems is empty");
        return 0;
    } else if (citationObject.citationItems.length > 1) {
        console.warn("CSLCitation.citationItems: citationItems has more than one item");
    }
    citationObject.citationItems.forEach(function(itemObject) {
        self._fillFromCslJson(itemObject);
    }, this);
    return 1;
};

CSLCitation.prototype._fillFromCslJson = function(itemObject) {
    this._itemsStartIndex;
    var id = itemObject.id;
    var citationItem;
    var existingIds = this._citationItems.map(function(item) {
        return item.id;
    });
    if (existingIds.indexOf(id) >= 0) {
        citationItem = this._citationItems[existingIds.indexOf(id)];
    } else {
        citationItem = new CitationItem(id);
    }
    citationItem.fillFromObject(itemObject);
    this._addCitationItem(citationItem);
    return 1;
};

CSLCitation.prototype._fillFromJson = function(itemObject) {
    this._itemsStartIndex;
    if (!Object.hasOwnProperty.call(itemObject, "data")) {
        console.error("Invalid citation object");
        return 0;
    }
    var existingIds = this._citationItems.map(function(item) {
        return item.id;
    });
    var id = itemObject.data.key;
    var citationItem;
    if (existingIds.indexOf(id) >= 0) {
        citationItem = this._citationItems[existingIds.indexOf(id)];
    } else {
        citationItem = new CitationItem(id);
    }
    citationItem.fillFromObject(itemObject);
    this._addCitationItem(citationItem);
    return 1;
};

CSLCitation.prototype.getCitationItems = function() {
    return this._citationItems;
};

CSLCitation.prototype.getDoNotUpdate = function() {
    if (Object.hasOwnProperty.call(this._properties, "dontUpdate")) {
        return !!this._properties.dontUpdate;
    }
    return false;
};

CSLCitation.prototype.getInfoForCitationCluster = function() {
    return this._citationItems.map(function(item) {
        return item.getInfoForCitationCluster();
    }, this);
};

CSLCitation.prototype.getPlainCitation = function() {
    if (Object.hasOwnProperty.call(this._properties, "plainCitation")) {
        return String(this._properties.plainCitation);
    }
    return "";
};

CSLCitation.prototype._addCitationItem = function(item) {
    var existingIds = this._citationItems.map(function(item) {
        return item.id;
    });
    if (existingIds.indexOf(item.id) >= 0) {
        this._citationItems[existingIds.indexOf(item.id)] = item;
        return this;
    }
    this._citationItems.push(item);
    return this;
};

CSLCitation.prototype.addDoNotUpdate = function() {
    this._setProperties({
        dontUpdate: true
    });
    return this;
};

CSLCitation.prototype.addPlainCitation = function(plainCitation) {
    this._setProperties({
        plainCitation: plainCitation
    });
    return this;
};

CSLCitation.prototype._setProperties = function(properties) {
    var self = this;
    Object.keys(properties).forEach(function(key) {
        if (Object.hasOwnProperty.call(properties, key)) {
            self._properties[key] = properties[key];
        }
    }, this);
    return this;
};

CSLCitation.prototype._setSchema = function(schema) {
    this._schema = schema;
    return this;
};

CSLCitation.prototype._extractIdFromWord365Citation = function(item) {
    if (Object.hasOwnProperty.call(item, "uris") && item.uris.length) {
        var index = item.uris[0].lastIndexOf("/");
        return item.uris[0].slice(index + 1);
    }
    return item.id;
};

CSLCitation.prototype._generateId = function() {
    return Math.random().toString(36).substring(2, 15);
};

CSLCitation.prototype.validate = function() {
    var errors = [];
    if (!this._schema) errors.push("Schema is required");
    if (!this.citationID) errors.push("citationID is required");
    if (this._citationItems && Array.isArray(this._citationItems)) {
        for (var i = 0; i < this._citationItems.length; i++) {
            if (!this._citationItems[i].id) {
                errors.push("Citation item at index " + i + " must have an id");
            }
        }
    }
    return errors.length === 0 ? true : errors;
};

CSLCitation.prototype.toJSON = function() {
    var result = {
        citationID: this.citationID,
        schema: this._schema
    };
    if (this._properties && Object.keys(this._properties).length > 0) {
        result.properties = this._properties;
    }
    if (this._citationItems && this._citationItems.length > 0) {
        result.citationItems = this._citationItems.map(function(item) {
            return item.toJSON();
        });
    }
    return result;
};

function SearchFilterComponents() {
    this._searchField = new InputField("searchField", {
        type: "text",
        autofocus: true,
        showClear: false
    });
    this._filterButton = new Button("filterButton", {
        variant: "secondary-icon",
        size: "small"
    });
    this._librarySelectList = new SelectBox("librarySelectList", {
        placeholder: translate("No items selected"),
        multiple: true,
        description: translate("Search in:")
    });
    this._subscribers = [];
    this._addEventListeners();
}

SearchFilterComponents.prototype._addEventListeners = function() {
    var self = this;
    this._searchField.subscribe(function(e) {
        if (e.type === "inputfield:blur" || e.type === "inputfield:submit") {
            var selectedGroups = self._getSelectedGroups();
            self._subscribers.forEach(function(cb) {
                cb(e.detail.value, selectedGroups);
            });
        }
    });
    this._filterButton.subscribe(function(e) {
        if (e.type === "button:click") {
            if (!self._librarySelectList.isOpen) {
                if (e.detail.originalEvent) {
                    e.detail.originalEvent.stopPropagation();
                }
                self._librarySelectList.openDropdown();
            }
        }
    });
};

SearchFilterComponents.prototype.addGroups = function(groups) {
    var self = this;
    var savedGroups = localStorage.getItem("selectedGroups");
    var selectedItems = savedGroups ? JSON.parse(savedGroups).map(function(id) {
        return id.toString();
    }) : [ "my_library", "group_libraries" ];
    var hasSelected = false;
    groups.forEach(function(group) {
        group.id = String(group.id);
    });
    var customGroups = [ {
        id: "my_library",
        name: translate("My Library")
    }, {
        id: "group_libraries",
        name: translate("Group Libraries")
    } ];
    !hasSelected && customGroups.forEach(function(group) {
        if (selectedItems.indexOf(group.id) !== -1) {
            hasSelected = true;
        }
    });
    !hasSelected && groups.forEach(function(group) {
        if (selectedItems.indexOf(group.id.toString()) !== -1) {
            hasSelected = true;
        }
    });
    if (!hasSelected) {
        selectedItems = [ "my_library", "group_libraries" ];
    }
    var addGroupToSelectBox = function addGroupToSelectBox(id, name, selected) {
        if (typeof id === "number") {
            id = id.toString();
        }
        if (self._librarySelectList instanceof SelectBox) self._librarySelectList.addItem(id, name, selected);
    };
    for (var i = 0; i < customGroups.length; i++) {
        var id = customGroups[i].id;
        var name = customGroups[i].name;
        addGroupToSelectBox(id, name, selectedItems.indexOf(id) !== -1);
    }
    if (groups.length === 0) {
        return;
    }
    this._librarySelectList.addSeparator();
    var selected = selectedItems.indexOf("group_libraries") !== -1;
    for (var i = 0; i < groups.length; i++) {
        var _id = groups[i].id;
        var _name = groups[i].name;
        addGroupToSelectBox(_id, _name, selected || selectedItems.indexOf(_id.toString()) !== -1);
    }
    this._selectedGroupsWatcher(customGroups, groups);
};

SearchFilterComponents.prototype._getSelectedGroups = function() {
    var self = this;
    var ids = this._librarySelectList.getSelectedValues();
    if (Array.isArray(ids) === false || ids.length === 0) {
        setTimeout(function() {
            self._librarySelectList.openDropdown();
        }, 500);
    }
    if (ids === null || typeof ids === "string") {
        return [];
    }
    return ids;
};

SearchFilterComponents.prototype.subscribe = function(callback) {
    var self = this;
    this._subscribers.push(callback);
    return {
        unsubscribe: function unsubscribe() {
            self._subscribers = self._subscribers.filter(function(cb) {
                return cb !== callback;
            });
        }
    };
};

SearchFilterComponents.prototype._selectedGroupsWatcher = function(customGroups, groups) {
    var self = this;
    if (this._librarySelectList instanceof SelectBox === false) {
        return;
    }
    this._librarySelectList.subscribe(function(event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        var aGroupsToSave = [];
        var values = event.detail.values;
        var current = event.detail.current;
        var bEnabled = event.detail.enabled;
        var customIds = customGroups.map(function(group) {
            return group.id;
        });
        var ids = groups.map(function(group) {
            return group.id.toString();
        });
        var bWasCustom = customIds.indexOf(String(current)) !== -1;
        if (bWasCustom) {
            if (current === "group_libraries") {
                if (bEnabled) {
                    aGroupsToSave.push("group_libraries");
                    self._librarySelectList.selectItems(ids, true);
                } else {
                    self._librarySelectList.unselectItems(ids, true);
                }
                if (values.indexOf("my_library") !== -1) {
                    aGroupsToSave.push("my_library");
                }
            } else {
                if (values.indexOf("group_libraries") !== -1) {
                    aGroupsToSave.push("group_libraries");
                    if (bEnabled) {
                        aGroupsToSave.push(current);
                    }
                } else {
                    aGroupsToSave = values.slice();
                }
            }
        } else if (!bWasCustom) {
            var bAllGroupsSelected = ids.every(function(id) {
                return values.indexOf(id) !== -1;
            });
            if (bAllGroupsSelected) {
                self._librarySelectList.selectItems("group_libraries", true);
                aGroupsToSave.push("group_libraries");
                if (values.indexOf("my_library") !== -1) {
                    aGroupsToSave.push("my_library");
                }
            } else {
                self._librarySelectList.unselectItems("group_libraries", true);
                aGroupsToSave = values.filter(function(value) {
                    return value !== "group_libraries";
                });
            }
        }
        if (aGroupsToSave.length === 0) {
            localStorage.removeItem("selectedGroups");
        } else {
            localStorage.setItem("selectedGroups", JSON.stringify(aGroupsToSave));
        }
    });
};

function SelectCitationsComponent(displayNoneClass, fLoadMore, fShouldLoadMore) {
    this._displayNoneClass = displayNoneClass;
    this._items = {};
    this._html = {};
    this._checks = {};
    this._LOCATOR_VALUES = [ [ "appendix", "Appendix" ], [ "article", "Article" ], [ "book", "Book" ], [ "chapter", "Chapter" ], [ "column", "Column" ], [ "figure", "Figure" ], [ "folio", "Folio" ], [ "issue", "Issue" ], [ "line", "Line" ], [ "note", "Note" ], [ "opus", "Opus" ], [ "page", "Page" ], [ "paragraph", "Paragraph" ], [ "part", "Part" ], [ "rule", "Rule" ], [ "section", "Section" ], [ "sub-verbo", "Sub verbo" ], [ "table", "Table" ], [ "title", "Title" ], [ "verses", "Verses" ], [ "volume", "Volume" ] ];
    this._cancelSelectBtn = document.getElementById("cancelSelectBtn");
    this._docsHolder = document.getElementById("docsHolder");
    this._nothingFound = document.getElementById("nothingFound");
    this._docsThumb = document.getElementById("docsThumb");
    this._selectedWrapper = document.getElementById("selectedWrapper");
    this._selectedHolder = document.getElementById("selectedHolder");
    this._selectedInfo = document.getElementById("selectedInfo");
    this._selectedCount = document.getElementById("selectedCount");
    this._selectedThumb = document.getElementById("selectedThumb");
    if (this._selectedHolder && this._selectedThumb) {
        this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20);
    }
    if (this._docsHolder && this._docsThumb) {
        this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this));
    }
    this._subscribers = [];
    this._fShouldLoadMore = fShouldLoadMore;
    this._fLoadMore = fLoadMore;
    this._loadTimeout;
    this._init();
}

SelectCitationsComponent.prototype._init = function() {
    var self = this;
    if (this._cancelSelectBtn) {
        this._cancelSelectBtn.onclick = function(e) {
            var ids = [];
            for (var id in self._items) {
                ids.push(id);
            }
            for (var i = 0; i < ids.length; i++) {
                self._removeSelected(ids[i]);
            }
        };
    }
};

SelectCitationsComponent.prototype.clearLibrary = function() {
    this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
    var holder = this._docsHolder;
    while (holder && holder.lastChild) {
        holder.removeChild(holder.lastChild);
    }
    if (holder) holder.scrollTop = 0;
    this._docsScroller.onscroll();
};

SelectCitationsComponent.prototype.displayNothingFound = function() {
    this.clearLibrary();
    this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
};

SelectCitationsComponent.prototype.displaySearchItems = function(res, err) {
    var self = this;
    var holder = this._docsHolder;
    var numOfShown = 0;
    return new Promise((resolve, reject) => {
        if (res && res.items && res.items.length > 0) {
            var page = document.createElement("div");
            if (holder) page.classList.add("page" + holder.children.length);
            for (var index = 0; index < res.items.length; index++) {
                var item = res.items[index];
                page.appendChild(self._buildDocElement(item));
                numOfShown++;
            }
            if (holder) holder.appendChild(page);
        } else if (err) {
            reject(err);
        }
        this._docsScroller.onscroll();
        resolve(numOfShown);
    });
};

SelectCitationsComponent.prototype.getSelectedItems = function() {
    var items = Object.assign({}, this._items || {});
    return items;
};

SelectCitationsComponent.prototype.removeItems = function(keys) {
    var self = this;
    keys.forEach(function(key) {
        self._removeSelected(key);
    });
};

SelectCitationsComponent.prototype.subscribe = function(callback) {
    var self = this;
    this._subscribers.push(callback);
    return {
        unsubscribe: function unsubscribe() {
            self._subscribers = self._subscribers.filter(function(cb) {
                return cb !== callback;
            });
        }
    };
};

SelectCitationsComponent.prototype._buildDocElement = function(item) {
    var self = this;
    var root = document.createElement("div");
    root.classList.add("doc");
    var docInfo = document.createElement("div");
    docInfo.classList.add("docInfo");
    var checkHolder = document.createElement("div");
    var label = "";
    if (item.author && item.author.length > 0) {
        label = item.author.map(function(a) {
            if (a.family && a.given) {
                return a.family.trim() + ", " + a.given.trim();
            } else if (a.family) {
                return a.family.trim();
            } else if (a.given) {
                return a.given.trim();
            }
            return "";
        }).join("; ");
    }
    var arrow = document.createElement("div");
    arrow.classList.add("selectbox-arrow");
    arrow.innerHTML = '<svg width="6" height="6" viewBox="0 0 6 6" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd"' + ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75' + ' 2.24889L3 4.49724L5.25 2.24889L3 0.00053797Z" ' + 'fill="currentColor"/></svg>';
    var title = document.createElement("div");
    title.textContent = item.title.trim();
    title.classList.add("truncate-text");
    title.classList.add("secondary-text");
    if (item.publisher || item["publisher-place"]) {
        title.textContent += " · " + (item.publisher || item["publisher-place"] || "");
    }
    if (item.issued && item.issued["date-parts"]) {
        var date = item.issued["date-parts"][0];
        if (label.length > 20) {
            title.textContent += " (" + date.join("-") + ")";
        } else {
            if (label.length > 0 && label.slice(-1) !== "." && label.slice(-1) !== ",") label += ".";
            label += " " + date.join("-");
        }
    }
    if (label.length === 0) {
        label = title.textContent;
    }
    title.setAttribute("title", title.textContent);
    docInfo.appendChild(title);
    var check = document.createElement("input");
    checkHolder.appendChild(check);
    var checkInput = new Checkbox(check, {
        checked: !!this._items[item.id],
        label: label,
        title: true,
        id: item.id
    });
    if (this._items[item.id]) {
        this._checks[item.id] = checkInput;
    }
    checkHolder.appendChild(arrow);
    root.appendChild(checkHolder);
    root.appendChild(docInfo);
    var params;
    function toggleItem() {
        root.classList.toggle("doc-open");
        if (!params) {
            params = self._buildCitationParams(item);
            root.appendChild(params);
        }
    }
    arrow.onclick = toggleItem;
    checkInput.subscribe(function(event) {
        if (event.type !== "checkbox:change") {
            return;
        }
        if (event.detail.checked) {
            self._addSelected(item, checkInput);
        } else {
            self._removeSelected(item.id);
        }
    });
    return root;
};

SelectCitationsComponent.prototype._buildCitationParams = function(item) {
    var locatorLabel = localStorage.getItem("selectedLocator") || "page";
    item.label = locatorLabel;
    var params = document.createDocumentFragment();
    var prefixSuffixContainer = document.createElement("div");
    var prefix = document.createElement("input");
    var suffix = document.createElement("input");
    var locatorContainer = document.createElement("div");
    var locatorSelect = document.createElement("div");
    var locator = document.createElement("input");
    var omitAuthorContainer = document.createElement("div");
    var omitAuthor = document.createElement("input");
    params.appendChild(prefixSuffixContainer);
    prefixSuffixContainer.appendChild(prefix);
    prefixSuffixContainer.appendChild(suffix);
    params.appendChild(locatorContainer);
    locatorContainer.appendChild(locatorSelect);
    locatorContainer.appendChild(locator);
    var locatorPlaceholder = "";
    params.appendChild(omitAuthorContainer);
    omitAuthorContainer.appendChild(omitAuthor);
    var prefixInput = new InputField(prefix, {
        type: "text",
        placeholder: "Prefix"
    });
    var suffixInput = new InputField(suffix, {
        type: "text",
        placeholder: "Suffix"
    });
    var locatorSelectbox = new SelectBox(locatorSelect, {
        placeholder: "Locator"
    });
    this._LOCATOR_VALUES.forEach(function(info) {
        var selected = info[0] === locatorLabel;
        locatorSelectbox.addItem(info[0], info[1], selected);
        if (selected) {
            locatorPlaceholder = info[1];
        }
    });
    var locatorInput = new InputField(locator, {
        type: "text",
        placeholder: locatorPlaceholder
    });
    var omitAuthorInput = new Checkbox(omitAuthor, {
        label: "Omit author"
    });
    prefixInput.subscribe(function(event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        item.prefix = event.detail.value;
    });
    suffixInput.subscribe(function(event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        item.suffix = event.detail.value;
    });
    locatorInput.subscribe(function(event) {
        if (event.type !== "inputfield:input") {
            return;
        }
        item.locator = event.detail.value;
    });
    locatorSelectbox.subscribe(function(event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        if (!event.detail.items) {
            return;
        }
        var eventItem = event.detail.items[0];
        locatorInput.setPlaceholder(eventItem.text);
        item.label = event.detail.values[0].toString();
        localStorage.setItem("selectedLocator", item.label);
    });
    omitAuthorInput.subscribe(function(event) {
        if (event.type !== "checkbox:change") {
            return;
        }
        item["suppress-author"] = event.detail.checked;
    });
    return params;
};

SelectCitationsComponent.prototype._buildSelectedElement = function(item) {
    var self = this;
    var root = document.createElement("div");
    root.classList.add("selDoc");
    var span = document.createElement("span");
    if (item.author && item.author.length > 0) {
        span.textContent = item.author.map(function(a) {
            return a.family + ", " + a.given;
        }).join("; ");
    } else {
        span.textContent = item.title;
    }
    if (item.issued && item.issued["date-parts"]) {
        span.textContent += " " + item.issued["date-parts"][0].join("-");
    }
    span.setAttribute("title", span.textContent);
    root.appendChild(span);
    var remove = document.createElement("span");
    remove.onclick = function() {
        self._removeSelected(item.id);
    };
    remove.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829' + " 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275" + " 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443" + " 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162" + ' 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z"' + ' fill="currentColor" fill-opacity="0.8"/></svg>';
    root.appendChild(remove);
    return root;
};

SelectCitationsComponent.prototype._addSelected = function(item, checkbox) {
    var el = this._buildSelectedElement(item);
    this._items[item.id] = item;
    this._html[item.id] = el;
    this._checks[item.id] = checkbox;
    if (this._selectedHolder) {
        this._selectedHolder.appendChild(el);
    }
    this._docsScroller.onscroll();
    this._selectedScroller.onscroll();
    this._checkSelected();
};

SelectCitationsComponent.prototype._checkDocsScroll = function(holder, thumb) {
    var self = this;
    if (this._fShouldLoadMore(holder)) {
        if (this._loadTimeout) {
            clearTimeout(this._loadTimeout);
        }
        if (!lastSearch.obj && !lastSearch.text.trim() && !lastSearch.groups.length) return;
        this._loadTimeout = setTimeout(function() {
            if (self._fShouldLoadMore(holder)) {
                self._fLoadMore();
            }
        }, 500);
    }
};

SelectCitationsComponent.prototype._initScrollBox = function(holder, thumb, minThumbHeight, onscroll) {
    var scroller = {};
    scroller.onscroll = this._checkScroll(holder, thumb, minThumbHeight, onscroll);
    holder.onwheel = function(e) {
        holder.scrollTop += e.deltaY > 10 || e.deltaY < -10 ? e.deltaY : e.deltaY * 20;
        scroller.onscroll();
    };
    thumb.onmousedown = function(e) {
        thumb.classList.add("scrolling");
        var y = e.clientY;
        var initialPos = holder.scrollTop;
        window.onmouseup = function(e) {
            thumb.classList.remove("scrolling");
            window.onmouseup = null;
            window.onmousemove = null;
        };
        window.onmousemove = function(e) {
            var delta = e.clientY - y;
            var percMoved = delta / holder.clientHeight;
            var deltaScroll = holder.scrollHeight * percMoved;
            holder.scrollTop = initialPos + deltaScroll;
            scroller.onscroll();
        };
    };
    document.body.addEventListener("resize", function() {
        scroller.onscroll();
    });
    return scroller;
};

SelectCitationsComponent.prototype._checkScroll = function(holder, thumb, minThumbHeight, func) {
    var displayNoneClass = this._displayNoneClass;
    return function() {
        if (holder.scrollHeight <= holder.clientHeight) {
            thumb.classList.add(displayNoneClass);
        } else {
            thumb.classList.remove(displayNoneClass);
            var height = holder.clientHeight / holder.scrollHeight * holder.clientHeight;
            height = height < minThumbHeight ? minThumbHeight : height;
            thumb.style.height = height + "px";
            var scroll = holder.scrollHeight - holder.clientHeight;
            var percScrolled = holder.scrollTop / scroll;
            var margin = percScrolled * (holder.clientHeight - height);
            thumb.style.marginTop = margin + "px";
        }
        if (func) func(holder, thumb);
    };
};

SelectCitationsComponent.prototype._removeSelected = function(id) {
    var el = this._html[id];
    if (this._selectedHolder) {
        this._selectedHolder.removeChild(el);
    }
    delete this._items[id];
    delete this._html[id];
    if (this._checks[id]) {
        this._checks[id].uncheck(true);
        delete this._checks[id];
    }
    this._docsScroller.onscroll();
    this._selectedScroller.onscroll();
    this._checkSelected();
};

SelectCitationsComponent.prototype._checkSelected = function() {
    var numOfSelected = this.count();
    if (!this._selectedInfo || !this._selectedCount || !this._selectedWrapper) {
        return;
    }
    if (numOfSelected <= 0) {
        this._selectedWrapper.classList.add(this._displayNoneClass);
        this._selectedInfo.classList.add(this._displayNoneClass);
    } else {
        this._selectedWrapper.classList.remove(this._displayNoneClass);
        this._selectedInfo.classList.remove(this._displayNoneClass);
        this._selectedCount.textContent = numOfSelected + " " + translate("selected");
    }
    this._subscribers.forEach(function(cb) {
        cb(numOfSelected);
    });
};

SelectCitationsComponent.prototype.count = function() {
    var k = 0;
    for (var i in this._items) k++;
    return k;
};

class AdditionalWindow {
    constructor() {
        this._window = null;
    }
    show(fileName, description, text) {
        var variation = {
            url: fileName + ".html",
            description: window.Asc.plugin.tr(description),
            isVisual: true,
            isModal: false,
            EditorsSupport: [ "word" ],
            size: [ 400, 310 ],
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false
        };
        this._window = new window.Asc.PluginWindow;
        this._window.show(variation);
        this._window.button = function(id) {
            console.log("button", id);
            window.Asc.plugin.executeCommand("close", "");
        };
    }
    hide() {}
}

var _onUserEditCitationManuallyWindow = new WeakMap;

var _CitationService_brand = new WeakSet;

class CitationService {
    constructor(localesManager, cslStylesManager, sdk) {
        _classPrivateMethodInitSpec(this, _CitationService_brand);
        _classPrivateFieldInitSpec(this, _onUserEditCitationManuallyWindow, void 0);
        this._bibPlaceholderIfEmpty = "Please insert some citation into the document.";
        this._citPrefixNew = "ZOTERO_ITEM";
        this._citSuffixNew = "CSL_CITATION";
        this._citPrefix = "ZOTERO_CITATION";
        this._bibPrefixNew = "ZOTERO_BIBL";
        this._bibSuffixNew = "CSL_BIBLIOGRAPHY";
        this._bibPrefix = "ZOTERO_BIBLIOGRAPHY";
        this._sdk = sdk;
        this._localesManager = localesManager;
        this._cslStylesManager = cslStylesManager;
        this._storage = new CSLCitationStorage;
        this._formatter;
        this.citationDocService = new CitationDocService(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew);
        this._notesStyle;
        this._styleFormat;
        _classPrivateFieldSet2(_onUserEditCitationManuallyWindow, this, new AdditionalWindow);
    }
    saveAsText() {
        return this.citationDocService.saveAsText();
    }
    setNotesStyle(notesStyle) {
        this._notesStyle = notesStyle;
    }
    setStyleFormat(styleFormat) {
        this._styleFormat = styleFormat;
    }
    insertSelectedCitations(items) {
        var self = this;
        var cslCitation = new CSLCitation(self._storage.size, "");
        for (var citationID in items) {
            var item = items[citationID];
            cslCitation.fillFromObject(item);
        }
        return _assertClassBrand(_CitationService_brand, this, _getSelectedInJsonFormat).call(this, items).then(function(items) {
            items.forEach(function(item) {
                cslCitation.fillFromObject(item);
            });
            return _assertClassBrand(_CitationService_brand, self, _formatInsertLink).call(self, cslCitation);
        });
    }
    updateCslItems(bUpdateAll, bPastBib) {
        this._storage.clear();
        var self = this;
        return _assertClassBrand(_CitationService_brand, this, _synchronizeStorageWithDocItems).call(this).then(function(info) {
            var {fields: fields, updatedFields: updatedFields, bibField: bibField, bibFieldValue: bibFieldValue} = info;
            if (!bUpdateAll && !bPastBib) {
                return [];
            }
            if (bibField) {
                if (updatedFields.length === 0) {
                    bibField["Content"] = translate(self._bibPlaceholderIfEmpty);
                } else {
                    var bibliography = _assertClassBrand(_CitationService_brand, self, _makeBibliography).call(self);
                    bibField["Content"] = bibliography;
                }
                updatedFields.push(bibField);
            } else if (bPastBib) {
                var _bibliography = _assertClassBrand(_CitationService_brand, self, _makeBibliography).call(self);
                if (updatedFields.length === 0) {
                    _bibliography = translate(self._bibPlaceholderIfEmpty);
                }
                if (self._cslStylesManager.isLastUsedStyleContainBibliography()) {
                    return self.citationDocService.addBibliography(_bibliography, bibFieldValue).then(function() {
                        return updatedFields;
                    });
                } else {
                    throw "The current bibliographic style does not describe the bibliography";
                }
            }
            return updatedFields;
        }).then(function(updatedFields) {
            if (updatedFields && updatedFields.length) {
                return self.citationDocService.updateAddinFields(updatedFields);
            }
        });
    }
}

function _formatInsertLink(cslCitation) {
    var self = this;
    var bUpdateItems = false;
    var keys = [];
    var keysL = [];
    return Promise.resolve().then(function() {
        cslCitation.getCitationItems().forEach(function(item) {
            if (!self._storage.has(item.id)) {
                bUpdateItems = true;
            }
            self._storage.set(item.id, item);
            keys.push(item.id);
            keysL.push(item.getInfoForCitationCluster());
        });
        if (bUpdateItems) {
            var arrIds = [];
            self._storage.forEach(function(item, id) {
                arrIds.push(id);
            });
            self._formatter.updateItems(arrIds);
        }
    }).then(function() {
        var fragment = document.createDocumentFragment();
        var tempElement = document.createElement("div");
        fragment.appendChild(tempElement);
        tempElement.innerHTML = self._formatter.makeCitationCluster(keysL);
        cslCitation.addPlainCitation(tempElement.innerText);
        var notesStyle = null;
        if ("note" === self._styleFormat) {
            notesStyle = self._notesStyle;
        }
        return self.citationDocService.addCitation(tempElement.innerText, JSON.stringify(cslCitation.toJSON()), notesStyle);
    }).then(function() {
        return keys;
    });
}

function _getSelectedInJsonFormat(items) {
    var arrUsrItems = [];
    var arrGroupsItems = {};
    for (var citationID in items) {
        var item = items[citationID];
        var userID = item["userID"];
        var _groupID = item["groupID"];
        if (userID) {
            arrUsrItems.push(item.id);
        } else if (_groupID) {
            if (!arrGroupsItems[_groupID]) {
                arrGroupsItems[_groupID] = [];
            }
            arrGroupsItems[_groupID].push(item.id);
        }
    }
    var promises = [];
    if (arrUsrItems.length) {
        promises.push(this._sdk.getItems(null, arrUsrItems, "json").then(function(res) {
            var items = res.items || [];
            return items;
        }));
    }
    for (var groupID in arrGroupsItems) {
        if (Object.hasOwnProperty.call(arrGroupsItems, groupID)) {
            promises.push(this._sdk.getGroupItems(null, groupID, arrGroupsItems[groupID], "json").then(function(res) {
                var items = res.items || [];
                return items;
            }));
        }
    }
    return Promise.all(promises).then(function(res) {
        var items = [];
        res.forEach(function(resItems) {
            items = items.concat(resItems);
        });
        return items;
    });
}

function _makeBibliography() {
    var self = this;
    var fragment = document.createDocumentFragment();
    var tempElement = document.createElement("div");
    fragment.appendChild(tempElement);
    try {
        var bibItems = new Array(self._storage.size);
        var bibObject = self._formatter.makeBibliography();
        for (var i = 0; i < bibObject[0].entry_ids.length; i++) {
            var citationId = bibObject[0].entry_ids[i][0];
            var citationIndex = self._storage.getIndex(citationId);
            var bibText = bibObject[1][i];
            while (bibText.indexOf("\n") !== bibText.lastIndexOf("\n")) {
                bibText = bibText.replace(/\n/, "");
            }
            bibItems[citationIndex] = bibText;
        }
        tempElement.innerHTML = bibItems.join("");
    } catch (e) {
        if (false === self._cslStylesManager.isLastUsedStyleContainBibliography()) {
            tempElement.textContent = "";
        } else {
            console.error(e);
            throw "Failed to apply this style.";
        }
    }
    return tempElement.innerText;
}

function _extractField(field) {
    var citationObject;
    var citationStartIndex = field.Value.indexOf("{");
    var citationEndIndex = field.Value.lastIndexOf("}");
    if (citationStartIndex !== -1) {
        var citationString = field.Value.slice(citationStartIndex, citationEndIndex + 1);
        citationObject = JSON.parse(citationString);
    }
    return citationObject;
}

function _synchronizeStorageWithDocItems() {
    var self = this;
    return this.citationDocService.getAddinZoteroFields().then(function(arrFields) {
        var fragment = document.createDocumentFragment();
        var tempElement = document.createElement("div");
        fragment.appendChild(tempElement);
        var numOfItems = 0;
        var bibFieldValue = " ";
        var bibField = arrFields.find(function(field) {
            return field.Value.indexOf(self._bibPrefixNew) !== -1 || field.Value.indexOf(self._bibPrefix) !== -1;
        });
        if (bibField) {
            var citationObject = _assertClassBrand(_CitationService_brand, self, _extractField).call(self, bibField);
            if (typeof citationObject === "object" && Object.keys(citationObject).length > 0) {
                bibFieldValue = JSON.stringify(citationObject);
            }
        }
        var fields = arrFields.filter(function(field) {
            return field.Value.indexOf(self._citPrefixNew) !== -1 || field.Value.indexOf(self._citPrefix) !== -1;
        });
        var fieldsWithCitations = fields.map(function(field) {
            var citationObject = _assertClassBrand(_CitationService_brand, self, _extractField).call(self, field);
            var citationID = "";
            if (field.Value.indexOf(self._citPrefix) === -1) {
                citationID = citationObject.citationID;
            }
            var cslCitation = new CSLCitation(numOfItems, citationID);
            numOfItems += cslCitation.fillFromObject(citationObject);
            cslCitation.getCitationItems().forEach(function(item) {
                self._storage.set(item.id, item);
            });
            return {
                field: _objectSpread2({}, field),
                cslCitation: cslCitation
            };
        });
        _assertClassBrand(_CitationService_brand, self, _updateFormatter).call(self);
        var updatedFields = fieldsWithCitations.map(function(_ref, index) {
            var {field: field, cslCitation: cslCitation} = _ref;
            var keysL = cslCitation.getInfoForCitationCluster();
            tempElement.innerHTML = self._formatter.makeCitationCluster(keysL);
            var oldContent = field["Content"];
            var newContent = tempElement.innerText;
            if (oldContent !== newContent) {
                field["Content"] = newContent;
            }
            console.log(cslCitation.getDoNotUpdate());
            if (cslCitation) {
                field["Value"] = self._citPrefixNew + " " + self._citSuffixNew + JSON.stringify(cslCitation.toJSON());
            }
            return field;
        });
        return {
            fields: fields,
            updatedFields: updatedFields,
            bibField: bibField,
            bibFieldValue: bibFieldValue
        };
    });
}

function _updateFormatter() {
    var self = this;
    var arrIds = [];
    this._storage.forEach(function(item, id) {
        arrIds.push(id);
    });
    this._formatter = new CSL.Engine({
        retrieveLocale: function retrieveLocale(id) {
            if (self._localesManager.getLocale(id)) {
                return self._localesManager.getLocale(id);
            }
            return self._localesManager.getLocale();
        },
        retrieveItem: function retrieveItem(id) {
            var item = self._storage.get(id);
            var index = self._storage.getIndex(id);
            if (!item) return null;
            return item.toFlatJSON(index);
        }
    }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), true);
    if (arrIds.length) {
        this._formatter.updateItems(arrIds);
    }
    return;
}

var CslStylesParser = {
    getStyleInfo: function getStyleInfo(name, style) {
        var parser = new DOMParser;
        var xmlDoc = parser.parseFromString(style, "text/xml");
        var styleInfo = {
            categories: {
                fields: [],
                format: ""
            },
            dependent: 0,
            href: "",
            name: name,
            title: "",
            updated: ""
        };
        var title = xmlDoc.querySelector("info title");
        if (title) styleInfo.title = title.textContent;
        var href = xmlDoc.querySelector('info link[rel="self"]');
        if (href) {
            var attribute = href.getAttribute("href");
            if (attribute) styleInfo.href = attribute;
        }
        var parent = xmlDoc.querySelector('info link[rel="independent-parent"]');
        if (parent) {
            var _attribute = parent.getAttribute("href");
            if (_attribute) styleInfo.parent = _attribute;
            styleInfo.dependent = 1;
        }
        var updated = xmlDoc.querySelector("info updated");
        if (updated) styleInfo.updated = updated.textContent;
        var categoryFormat = xmlDoc.querySelector("info category[citation-format]");
        if (categoryFormat) {
            var _attribute2 = categoryFormat.getAttribute("citation-format");
            if (_attribute2) styleInfo.categories.format = _attribute2;
        }
        var categoryFields = xmlDoc.querySelectorAll("info category[field]");
        if (categoryFields) {
            categoryFields.forEach(function(category) {
                var attribute = category.getAttribute("field");
                if (attribute) styleInfo.categories.fields.push(attribute);
            });
        }
        return styleInfo;
    },
    getCitationFormat: function getCitationFormat(styleContent) {
        var parser = new DOMParser;
        var xmlDoc = parser.parseFromString(styleContent, "text/xml");
        var format = xmlDoc.querySelector("info category[citation-format]");
        if (!format) throw new Error("Citation format not found");
        var type = format.getAttribute("citation-format");
        if (!type) throw new Error("Citation format not found");
        switch (type) {
          case "note":
          case "numeric":
          case "author":
          case "author-date":
          case "label":
            return type;
        }
        throw new Error("Invalid citation format");
    },
    isStyleContainBibliography: function isStyleContainBibliography(styleContent) {
        return styleContent.indexOf("<bibliography") > -1;
    }
};

function CslStylesStorage() {
    this._customStyleNamesKey = "zoteroCustomStyleNames";
    this._customStylesKey = "zoteroCustomStyles";
}

CslStylesStorage.prototype.getStyleNames = function() {
    var customStyleNames = localStorage.getItem(this._customStyleNamesKey);
    if (customStyleNames) {
        return JSON.parse(customStyleNames);
    } else {
        return [];
    }
};

CslStylesStorage.prototype._getStyles = function() {
    var customStyles = localStorage.getItem(this._customStylesKey);
    if (customStyles) {
        return JSON.parse(customStyles);
    } else {
        return [];
    }
};

CslStylesStorage.prototype.getStyle = function(name) {
    var customStyleNames = this.getStyleNames();
    var styleIndex = customStyleNames.indexOf(name);
    if (styleIndex === -1) {
        return null;
    }
    return this._getStyles()[styleIndex];
};

CslStylesStorage.prototype.getStylesInfo = function() {
    var customStyleNames = this.getStyleNames();
    var customStyles = this._getStyles();
    var styles = [];
    for (var i = 0; i < customStyleNames.length; i++) {
        var result = CslStylesParser.getStyleInfo(customStyleNames[i], customStyles[i]);
        styles.push(result);
    }
    return styles;
};

CslStylesStorage.prototype.setStyle = function(name, data) {
    var customStyleNames = this.getStyleNames();
    var customStyles = this._getStyles();
    var styleIndex = customStyleNames.indexOf(name);
    if (styleIndex === -1) {
        styleIndex = customStyleNames.length;
    }
    customStyleNames[styleIndex] = name;
    customStyles[styleIndex] = data;
    localStorage.setItem(this._customStyleNamesKey, JSON.stringify(customStyleNames));
    localStorage.setItem(this._customStylesKey, JSON.stringify(customStyles));
    return CslStylesParser.getStyleInfo(name, data);
};

CslStylesStorage.prototype.deleteStyle = function(name) {
    var customStyleNames = this.getStyleNames();
    var customStyles = this._getStyles();
    var styleIndex = customStyleNames.indexOf(name);
    if (styleIndex === -1) {
        return name;
    }
    customStyleNames.splice(styleIndex, 1);
    customStyles.splice(styleIndex, 1);
    localStorage.setItem(this._customStyleNamesKey, JSON.stringify(customStyleNames));
    localStorage.setItem(this._customStylesKey, JSON.stringify(customStyles));
    return name;
};

function CslStylesManager() {
    this._isOnlineAvailable = false;
    this._isDesktopAvailable = false;
    this._customStylesStorage = new CslStylesStorage;
    this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json";
    this._STYLES_JSON_LOCAL = "./resources/csl/styles.json";
    this._STYLES_URL = "https://www.zotero.org/styles/";
    this._STYLES_LOCAL = "./resources/csl/styles/";
    this._lastStyleKey = "zoteroStyleId";
    this._lastNotesStyleKey = "zoteroNotesStyleId";
    this._lastFormatKey = "zoteroFormatId";
    this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography";
    this._defaultStyles = [ "american-medical-association", "american-political-science-association", "apa", "american-sociological-association", "chicago-author-date-17th-edition", "harvard-cite-them-right-10th-edition", "ieee", "modern-language-association-8th-edition", "nature" ];
    this._cache = {};
}

CslStylesManager.prototype.addCustomStyle = function(file) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var fileName = file.name.toLowerCase();
        if (fileName.slice(-4) === ".csl" || fileName.slice(-4) === ".xml") {
            fileName = fileName.substring(0, fileName.length - 4).trim();
        } else {
            reject("Please select a .csl or .xml file.");
        }
        if (file.size > 1024 * 1024) {
            reject("Maximum file size is 1 MB.");
        }
        resolve(fileName);
    }).then(function(fileName) {
        return self._readCSLFile(file).then(function(content) {
            if (self._defaultStyles.indexOf(fileName) === -1) {
                self._defaultStyles.push(fileName);
            }
            return self._customStylesStorage.setStyle(fileName, content);
        });
    });
};

CslStylesManager.prototype.getLastUsedFormat = function() {
    var lastUsedFormat = localStorage.getItem(this._lastFormatKey);
    switch (lastUsedFormat) {
      case "note":
      case "numeric":
      case "author":
      case "author-date":
      case "label":
        return lastUsedFormat;
    }
    return "numeric";
};

CslStylesManager.prototype.getLastUsedNotesStyle = function() {
    var lastUsedNotesStyle = localStorage.getItem(this._lastNotesStyleKey);
    if (lastUsedNotesStyle === "footnotes" || lastUsedNotesStyle === "endnotes") {
        return lastUsedNotesStyle;
    }
    return "footnotes";
};

CslStylesManager.prototype.getLastUsedStyleId = function() {
    var lastUsedStyle = localStorage.getItem(this._lastStyleKey);
    if (lastUsedStyle) {
        return lastUsedStyle;
    }
    return null;
};

CslStylesManager.prototype.getLastUsedStyleIdOrDefault = function() {
    var lastUsedStyle = localStorage.getItem(this._lastStyleKey);
    if (lastUsedStyle) {
        return lastUsedStyle;
    }
    return "ieee";
};

CslStylesManager.prototype.getStyle = function(styleName) {
    var saveToLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var self = this;
    return Promise.resolve(styleName).then(function(styleName) {
        if (self._cache[styleName]) {
            return self._cache[styleName];
        }
        var customStyleNames = self._customStylesStorage.getStyleNames();
        if (customStyleNames.indexOf(styleName) !== -1) {
            return self._customStylesStorage.getStyle(styleName);
        }
        var url = self._STYLES_LOCAL + styleName + ".csl";
        if (self._isOnlineAvailable) {
            url = self._STYLES_URL + styleName;
        }
        return fetch(url).then(function(resp) {
            return resp.text();
        });
    }).then(function(content) {
        if (content && !self._isValidCSL(content) && self._isOnlineAvailable) {
            var styleInfo = CslStylesParser.getStyleInfo(styleName, content);
            if (styleInfo && styleInfo.dependent > 0 && styleInfo.parent) {
                return fetch(styleInfo.parent).then(function(resp) {
                    return resp.text();
                });
            }
        }
        return content;
    }).then(function(content) {
        var styleFormat = content && CslStylesParser.getCitationFormat(content) || "numeric";
        var result = {
            content: content,
            styleFormat: styleFormat
        };
        if (content && saveToLocalStorage) {
            self._saveLastUsedStyle(styleName, content, styleFormat);
        }
        return result;
    });
};

CslStylesManager.prototype.getStylesInfo = function() {
    var self = this;
    return Promise.all([ this._getStylesJson(), this._customStylesStorage.getStylesInfo() ]).then(function(styles) {
        var lastStyle = self.getLastUsedStyleId() || "ieee";
        var resultStyles = [];
        var resultStyleNames = self._customStylesStorage.getStyleNames();
        var loadedStyles = styles[0];
        var customStyles = styles[1];
        if (self._isDesktopAvailable && !self._isOnlineAvailable) {
            loadedStyles = loadedStyles.filter(function(style) {
                return self._defaultStyles.indexOf(style.name) >= 0 || style.name == lastStyle;
            });
        }
        customStyles.forEach(function(style) {
            if (lastStyle === style.name) {
                resultStyles.unshift(style);
            } else {
                resultStyles.push(style);
            }
            if (self._defaultStyles.indexOf(style.name) === -1) {
                self._defaultStyles.push(style.name);
            }
        });
        loadedStyles.forEach(function(style) {
            if (resultStyleNames.indexOf(style.name) !== -1) {
                return;
            }
            if (lastStyle === style.name) {
                resultStyles.unshift(style);
            } else {
                resultStyles.push(style);
            }
        });
        return resultStyles;
    });
};

CslStylesManager.prototype._getStylesJson = function() {
    var url = this._STYLES_JSON_LOCAL;
    if (this._isOnlineAvailable) {
        url = this._STYLES_JSON_URL;
    }
    return fetch(url).then(function(resp) {
        return resp.json();
    });
};

CslStylesManager.prototype.cached = function(id) {
    if (Object.hasOwnProperty.call(this._cache, id)) {
        return this._cache[id];
    }
    return null;
};

CslStylesManager.prototype.isLastUsedStyleContainBibliography = function() {
    var containBibliography = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
    return containBibliography !== "false";
};

CslStylesManager.prototype.isStyleDefault = function(styleName) {
    return this._defaultStyles.indexOf(styleName) >= 0;
};

CslStylesManager.prototype._isValidCSL = function(content) {
    return content.indexOf("<?xml") > -1 && content.indexOf("<style") > -1 && content.indexOf("<macro") > -1 && content.indexOf("citation") > -1;
};

CslStylesManager.prototype._readCSLFile = function(file) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var reader = new FileReader;
        reader.onload = function(e) {
            var fileContent = e.target ? String(e.target.result) : "";
            if (!self._isValidCSL(fileContent)) {
                reject("The file is not a valid CSL file");
                return;
            }
            resolve(fileContent);
        };
        reader.onerror = function() {
            reject("Failed to read file");
        };
        reader.readAsText(file);
    });
};

CslStylesManager.prototype._saveLastUsedStyle = function(id, content, currentStyleFormat) {
    this._cache[id] = content;
    localStorage.setItem(this._lastStyleKey, id);
    localStorage.setItem(this._lastFormatKey, currentStyleFormat);
    var containBibliography = CslStylesParser.isStyleContainBibliography(content);
    localStorage.setItem(this._lastUsedStyleContainBibliographyKey, containBibliography.toString());
};

CslStylesManager.prototype.saveLastUsedNotesStyle = function(notesStyle) {
    localStorage.setItem(this._lastNotesStyleKey, notesStyle);
};

CslStylesManager.prototype.setDesktopApiAvailable = function(isApiAvailable) {
    this._isDesktopAvailable = isApiAvailable;
};

CslStylesManager.prototype.setRestApiAvailable = function(isApiAvailable) {
    this._isOnlineAvailable = isApiAvailable;
};

function LocalesManager() {
    this._isOnlineAvailable = false;
    this._isDesktopAvailable = false;
    this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/";
    this._LOCALES_PATH = "./resources/csl/locales/";
    this._lastLanguageKey = "zoteroLang";
    this._selectedLanguage = null;
    this._cache = {};
}

LocalesManager.prototype.loadLocale = function(langTag) {
    var self = this;
    this._selectedLanguage = langTag;
    if (this._cache[langTag]) {
        return Promise.resolve(this._cache[langTag]);
    }
    var url = this._getLocalesUrl() + "locales-" + langTag + ".xml";
    return fetch(url).then(function(response) {
        return response.text();
    }).then(function(text) {
        self._cache[langTag] = text;
        return text;
    });
};

LocalesManager.prototype.getLastUsedLanguage = function() {
    this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US";
    return this._selectedLanguage;
};

LocalesManager.prototype.getLocale = function(localeId) {
    if (localeId) {
        if (this._cache[localeId]) {
            return this._cache[localeId];
        }
        return null;
    }
    if (this._selectedLanguage && this._cache[this._selectedLanguage]) {
        return this._cache[this._selectedLanguage];
    }
    return null;
};

LocalesManager.prototype.saveLastUsedLanguage = function(language) {
    this._selectedLanguage = language;
    localStorage.setItem(this._lastLanguageKey, language);
};

LocalesManager.prototype._getLocalesUrl = function() {
    return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};

LocalesManager.prototype.setDesktopApiAvailable = function(isApiAvailable) {
    this._isDesktopAvailable = isApiAvailable;
};

LocalesManager.prototype.setRestApiAvailable = function(isApiAvailable) {
    this._isOnlineAvailable = isApiAvailable;
};

function SettingsPage(router, displayNoneClass) {
    this._router = router;
    this._displayNoneClass = displayNoneClass;
    this._openSettingsBtn = new Button("settingsBtn", {
        variant: "icon-only",
        size: "small"
    });
    this._saveBtn = new Button("saveSettingsBtn", {
        variant: "primary"
    });
    this._cancelBtn = new Button("cancelBtn", {
        variant: "secondary"
    });
    this._styleSelect = new SelectBox("styleSelectList", {
        placeholder: "Enter style name"
    });
    this._styleSelectListOther = new SelectBox("styleSelectedListOther", {
        placeholder: "Enter style name",
        searchable: true
    });
    this._notesStyleWrapper = document.getElementById("notesStyle");
    if (!this._notesStyleWrapper) {
        throw new Error("notesStyleWrapper not found");
    }
    this._footNotes = new Radio("footNotes", {
        label: "Footnotes"
    });
    this._endNotes = new Radio("endNotes", {
        label: "Endnotes"
    });
    this._cslFileInput = document.getElementById("cslFileInput");
    if (!this._cslFileInput) {
        throw new Error("cslFileInput not found");
    }
    this._languageSelect = new SelectBox("styleLangList", {
        placeholder: "Select language"
    });
    this._cslStylesManager = new CslStylesManager;
    this._localesManager = new LocalesManager;
    this._selectLists = [];
    this._onChangeState = function(settings) {};
    this._styleMessage = new Message("styleMessage", {
        type: "error"
    });
    this._langMessage = new Message("langMessage", {
        type: "error"
    });
    this._LANGUAGES = [ [ "af-ZA", "Afrikaans" ], [ "ar", "Arabic" ], [ "bg-BG", "Bulgarian" ], [ "ca-AD", "Catalan" ], [ "cs-CZ", "Czech" ], [ "cy-GB", "Welsh" ], [ "da-DK", "Danish" ], [ "de-AT", "German (Austria)" ], [ "de-CH", "German (Switzerland)" ], [ "de-DE", "German (Germany)" ], [ "el-GR", "Greek" ], [ "en-GB", "English (UK)" ], [ "en-US", "English (US)" ], [ "es-CL", "Spanish (Chile)" ], [ "es-ES", "Spanish (Spain)" ], [ "es-MX", "Spanish (Mexico)" ], [ "et-EE", "Estonian" ], [ "eu", "Basque" ], [ "fa-IR", "Persian" ], [ "fi-FI", "Finnish" ], [ "fr-CA", "French (Canada)" ], [ "fr-FR", "French (France)" ], [ "he-IL", "Hebrew" ], [ "hr-HR", "Croatian" ], [ "hu-HU", "Hungarian" ], [ "id-ID", "Indonesian" ], [ "is-IS", "Icelandic" ], [ "it-IT", "Italian" ], [ "ja-JP", "Japanese" ], [ "km-KH", "Khmer" ], [ "ko-KR", "Korean" ], [ "la", "Latin" ], [ "lt-LT", "Lithuanian" ], [ "lv-LV", "Latvian" ], [ "mn-MN", "Mongolian" ], [ "nb-NO", "Norwegian (Bokmål)" ], [ "nl-NL", "Dutch" ], [ "nn-NO", "Norwegian (Nynorsk)" ], [ "pl-PL", "Polish" ], [ "pt-BR", "Portuguese (Brazil)" ], [ "pt-PT", "Portuguese (Portugal)" ], [ "ro-RO", "Romanian" ], [ "ru-RU", "Russian" ], [ "sk-SK", "Slovak" ], [ "sl-SI", "Slovenian" ], [ "sr-RS", "Serbian" ], [ "sv-SE", "Swedish" ], [ "th-TH", "Thai" ], [ "tr-TR", "Turkish" ], [ "uk-UA", "Ukrainian" ], [ "vi-VN", "Vietnamese" ], [ "zh-CN", "Chinese (PRC)" ], [ "zh-TW", "Chinese (Taiwan)" ] ];
    this._bNumFormat = false;
    this._stateSettings = {
        style: "",
        notesStyle: "footnotes",
        styleFormat: "numeric"
    };
}

SettingsPage.prototype.getLocalesManager = function() {
    return this._localesManager;
};

SettingsPage.prototype.getStyleManager = function() {
    return this._cslStylesManager;
};

SettingsPage.prototype.getLocale = function() {
    return this._localesManager.getLocale();
};

SettingsPage.prototype.getLastUsedStyleId = function() {
    return this._cslStylesManager.getLastUsedStyleId();
};

SettingsPage.prototype.init = function() {
    var lastStyle = this._cslStylesManager.getLastUsedStyleId() || "ieee";
    var savedLang = this._localesManager.getLastUsedLanguage();
    this._addEventListeners();
    this._languageSelect.addItems(this._LANGUAGES, savedLang);
    var promises = [ this._onStyleChange(lastStyle), this._localesManager.loadLocale(savedLang), this._loadStyles() ];
    return Promise.all(promises);
};

SettingsPage.prototype.onChangeState = function(callbackFn) {
    this._onChangeState = callbackFn;
};

SettingsPage.prototype.setDesktopApiAvailable = function(isAvailable) {
    this._localesManager.setDesktopApiAvailable(isAvailable);
    this._cslStylesManager.setDesktopApiAvailable(isAvailable);
};

SettingsPage.prototype.setRestApiAvailable = function(isAvailable) {
    this._localesManager.setRestApiAvailable(isAvailable);
    this._cslStylesManager.setRestApiAvailable(isAvailable);
};

SettingsPage.prototype._addEventListeners = function() {
    var self = this;
    this._openSettingsBtn.subscribe(function(event) {
        if (event.type !== "button:click") {
            return;
        }
        self._show();
    });
    this._saveBtn.subscribe(function(event) {
        if (event.type !== "button:click") {
            return;
        }
        var selectedLang = self._languageSelect.getSelectedValue();
        if (selectedLang === null) {
            console.error("No language selected");
            return;
        }
        var promises = [];
        if (self._stateSettings.language !== selectedLang) {
            self._localesManager.saveLastUsedLanguage(selectedLang);
            promises.push(self._localesManager.loadLocale(selectedLang).catch(function(err) {
                console.error(err);
                self._langMessage.show(translate("Failed to load language"));
                throw err;
            }));
        }
        var noteValue = "footnotes";
        if (self._endNotes.getState().checked) {
            noteValue = "endnotes";
        }
        if (self._stateSettings.notesStyle !== noteValue) {
            self._cslStylesManager.saveLastUsedNotesStyle(noteValue);
        }
        var selectedStyleId = self._styleSelect.getSelectedValue();
        if (self._stateSettings.style !== selectedStyleId && selectedStyleId !== null) {
            promises.push(self._onStyleChange(selectedStyleId));
        }
        if (promises.length) {
            self._showLoader();
            Promise.all(promises).then(function() {
                self._hide();
                self._hideLoader();
                self._onChangeState({
                    language: selectedLang,
                    style: selectedStyleId || "ieee",
                    notesStyle: noteValue,
                    styleFormat: self._cslStylesManager.getLastUsedFormat()
                });
            }).catch(function(err) {
                self._hideLoader();
            });
        } else {
            self._hide();
        }
    });
    this._cancelBtn.subscribe(function(event) {
        if (event.type !== "button:click") {
            return;
        }
        var selectedLang = self._languageSelect.getSelectedValue();
        var selectedStyleId = self._styleSelect.getSelectedValue();
        if (selectedLang !== null && self._localesManager.getLastUsedLanguage() !== selectedLang) {
            self._languageSelect.selectItems(self._localesManager.getLastUsedLanguage(), true);
        }
        if (self._stateSettings.style !== selectedStyleId && selectedStyleId !== null) {
            self._styleSelect.selectItems(self._stateSettings.style, true);
            self._styleSelectListOther.selectItems(self._stateSettings.style, true);
            self._onStyleChange(self._stateSettings.style, true).then(function() {
                self._hide();
            });
        } else {
            self._hide();
        }
    });
    this._cslFileInput.onchange = function(e) {
        if (!(e.target instanceof HTMLInputElement)) return;
        var target = e.target;
        if (!target.files) return;
        var file = target.files[0];
        if (!file) {
            console.error("No file selected");
            return;
        }
        self._cslStylesManager.addCustomStyle(file).then(function(styleValue) {
            self._addStylesToList([ styleValue ]);
        }).catch(function(error) {
            console.error(error);
            self._styleMessage.show(translate("Invalid CSL style file"));
        }).finally(function() {
            self._hideLoader();
        });
    };
    this._styleSelect.subscribe(function(event) {
        if (event.type === "selectbox:change") {
            self._styleSelectListOther.selectItems(event.detail.current.toString(), true);
            self._somethingWasChanged();
            self._onStyleChange(event.detail.current.toString(), true);
            return;
        } else if (event.type !== "selectbox:custom") {
            return;
        }
        var actionId = event.detail.current;
        if (actionId === "more_styles") {
            self._styleSelectListOther.openDropdown();
        }
    });
    self._styleSelectListOther.subscribe(function(event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        if (!event.detail.items) return;
        var item = event.detail.items[0];
        self._styleSelect.addItem(item.value, item.text, true);
        self._somethingWasChanged();
        self._onStyleChange(item.value, true);
    });
    this._languageSelect.subscribe(function(event) {
        if (event.type !== "selectbox:change") {
            return;
        }
        self._somethingWasChanged();
    });
    this._footNotes.subscribe(function(event) {
        self._somethingWasChanged();
    });
    this._endNotes.subscribe(function(event) {
        self._somethingWasChanged();
    });
};

SettingsPage.prototype._hideAllMessages = function() {
    this._langMessage.close();
    this._styleMessage.close();
};

SettingsPage.prototype._hide = function() {
    this._router.openMain();
};

SettingsPage.prototype._show = function() {
    this._stateSettings = {
        language: this._localesManager.getLastUsedLanguage(),
        style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
        notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
        styleFormat: this._cslStylesManager.getLastUsedFormat()
    };
    this._saveBtn.disable();
    this._router.openSettings();
    if (this._stateSettings.notesStyle === this._endNotes.getState().value) {
        this._endNotes.check();
    } else {
        this._footNotes.check();
    }
};

SettingsPage.prototype._loadStyles = function() {
    var self = this;
    return this._cslStylesManager.getStylesInfo().then(function(stylesInfo) {
        self._addStylesToList(stylesInfo);
        self._styleSelect.addCustomItem("more_styles", "More Styles...");
        self._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
    }).catch(function(err) {
        console.error(err);
    });
};

SettingsPage.prototype._addStylesToList = function(stylesInfo) {
    var self = this;
    var lastStyle = this._cslStylesManager.getLastUsedStyleIdOrDefault();
    var allStyles = stylesInfo.map(function(style) {
        return [ style.name, style.title ];
    });
    var mainStyles = allStyles.filter(function(style) {
        if (style[0] == lastStyle) return true;
        if (self._cslStylesManager.isStyleDefault(style[0])) return true;
        return false;
    });
    this._styleSelect.addItems(mainStyles, lastStyle);
    this._styleSelectListOther.addItems(allStyles, lastStyle);
};

SettingsPage.prototype._somethingWasChanged = function() {
    this._saveBtn.enable();
};

SettingsPage.prototype._onStyleChange = function(styleName, isClick) {
    var self = this;
    isClick && self._showLoader();
    return self._cslStylesManager.getStyle(styleName, !isClick).then(function(styleInfo) {
        var styleFormat = styleInfo.styleFormat;
        self._bNumFormat = styleFormat == "numeric";
        if ("note" === styleFormat) {
            self._notesStyleWrapper.classList.remove(self._displayNoneClass);
        } else {
            self._notesStyleWrapper.classList.add(self._displayNoneClass);
        }
        isClick && self._hideLoader();
    }).catch(function(err) {
        console.error(err);
        if (typeof err === "string") {
            self._styleMessage.show(translate(err));
        }
        isClick && self._hideLoader();
    });
};

SettingsPage.prototype._showLoader = function() {
    this._cancelBtn.disable();
    this._saveBtn.disable();
    this._styleSelect.disable();
    this._languageSelect.disable();
};

SettingsPage.prototype._hideLoader = function() {
    this._cancelBtn.enable();
    this._saveBtn.enable();
    this._styleSelect.enable();
    this._languageSelect.enable();
};

function LoginPage(router, sdk) {
    this._router = router;
    this._sdk = sdk;
    this._apiKeyLoginField = new InputField("apiKeyField", {
        autofocus: true,
        autocomplete: "on"
    });
    this._saveApiKeyBtn = new Button("saveApiKeyBtn", {
        disabled: true
    });
    this._apiKeyMessage = new Message("apiKeyMessage", {
        type: "error"
    });
    this._useDesktopMessage = new Message("useDesktopMessage", {
        type: "error"
    });
    this._connectToLocalZotero = new Button("connectToLocalZotero", {
        variant: "secondary"
    });
    this._useDesktopApp = document.getElementById("useDesktopApp");
    if (!this._useDesktopApp) {
        throw new Error("useDesktopApp not found");
    }
    this._logoutLink = document.getElementById("logoutLink");
    if (!this._logoutLink) {
        throw new Error("logoutLink not found");
    }
    this._onAuthorized = function(e) {};
    this._onChangeState = function(e) {};
    this._onOpen = function() {};
}

LoginPage.prototype.init = function() {
    var self = this;
    this._addEventListeners();
    var hasFirstAnswer = false;
    var onlineZoteroElements = document.querySelectorAll(".for-zotero-online");
    var apisChecker = ZoteroApiChecker.runApisChecker(self._sdk);
    apisChecker.subscribe(function(apis) {
        self._onChangeState(apis);
        if (!hasFirstAnswer) {
            hasFirstAnswer = true;
            if (!apis.desktopVersion && self._useDesktopApp) {
                self._useDesktopApp.classList.add("hidden");
            }
            self._onOpen();
            self._show();
        }
        if (apis.online) {
            onlineZoteroElements.forEach(function(element) {
                element.classList.remove("hidden");
            });
        } else {
            onlineZoteroElements.forEach(function(element) {
                element.classList.add("hidden");
            });
        }
        if (apis.online && apis.hasKey) {
            self._sdk.setIsOnlineAvailable(true);
            self._hide(true);
            self._onAuthorized(apis);
            return;
        } else if (apis.desktop && apis.hasPermission) {
            self._sdk.setIsOnlineAvailable(false);
            self._hide();
            self._hideAllMessages();
            self._onAuthorized(apis);
            return;
        }
    });
    var triggers = {
        onOpen: function onOpen(callbackFn) {
            self._onOpen = callbackFn;
            return triggers;
        },
        onChangeState: function onChangeState(callbackFn) {
            self._onChangeState = callbackFn;
            return triggers;
        },
        onAuthorized: function onAuthorized(callbackFn) {
            self._onAuthorized = callbackFn;
            return triggers;
        }
    };
    return triggers;
};

LoginPage.prototype._addEventListeners = function() {
    var self = this;
    this._apiKeyLoginField.subscribe(function(event) {
        if (event.type !== "inputfield:submit") ;
        if (event.type === "inputfield:input") {
            if (self._apiKeyLoginField.getValue()) {
                self._saveApiKeyBtn.enable();
            } else {
                self._saveApiKeyBtn.disable();
            }
        }
    });
    this._saveApiKeyBtn.subscribe(function(event) {
        if (event.type !== "button:click") {
            return;
        }
        self._tryToApplyKey();
    });
    this._connectToLocalZotero.subscribe(function(event) {
        if (event.type !== "button:click") {
            return;
        }
        self._showLoader();
        ZoteroApiChecker.checkStatus(self._sdk).then(function(apis) {
            if (apis.desktop && apis.hasPermission) {
                self._sdk.setIsOnlineAvailable(false);
                self._hide();
                self._hideAllMessages();
            } else if (apis.desktop && !apis.hasPermission) {
                var errorMessage = "Connection to Zotero failed. " + "Please enable external connections in Zotero: " + 'Edit → Settings → Advanced → Check "Allow other ' + 'applications on this computer to communicate with Zotero"';
                self._useDesktopMessage.show(translate(errorMessage));
            } else if (!apis.desktop) {
                self._useDesktopMessage.show(translate("Connection to Zotero failed. Make sure Zotero is running."));
            }
        }).finally(function() {
            self._hideLoader();
        });
    });
    this._logoutLink.onclick = function(e) {
        self._sdk.clearSettings();
        self._show();
        return true;
    };
};

LoginPage.prototype._tryToApplyKey = function() {
    var self = this;
    var apiKey = self._apiKeyLoginField.getValue();
    if (apiKey) {
        self._showLoader();
        self._sdk.setApiKey(apiKey).then(function() {
            ZoteroApiChecker.successfullyLoggedInUsingApiKey();
            self._hide(true);
        }).catch(function(err) {
            console.error(err);
            self._apiKeyMessage.show(translate("Invalid API key"));
        }).finally(function() {
            self._hideLoader();
        });
    }
};

LoginPage.prototype._hideAllMessages = function() {
    this._apiKeyMessage.close();
};

LoginPage.prototype._hide = function(bShowLogoutLink) {
    this._router.openMain();
    if (bShowLogoutLink) {
        this._logoutLink.classList.remove("hidden");
    }
};

LoginPage.prototype._show = function() {
    this._router.openLogin();
    this._logoutLink.classList.add("hidden");
};

LoginPage.prototype._showLoader = function() {
    this._saveApiKeyBtn.disable();
    this._connectToLocalZotero.disable();
    this._apiKeyLoginField.disable();
};

LoginPage.prototype._hideLoader = function() {
    this._saveApiKeyBtn.enable();
    this._connectToLocalZotero.enable();
    this._apiKeyLoginField.enable();
};

(function() {
    var displayNoneClass = "hidden";
    var router;
    var sdk;
    var settings;
    var citationService;
    var lastSearch = {
        text: "",
        obj: null,
        groups: [],
        groupsHash: ""
    };
    var searchFilter;
    var selectCitation;
    var saveAsTextBtn;
    var insertLinkBtn;
    var insertBibBtn;
    var refreshBtn;
    var libLoader = new Loader("libLoader", translate("Loading..."));
    var elements = {};
    function initElements() {
        var error = document.getElementById("errorWrapper");
        if (!error) {
            throw new Error("errorWrapper not found");
        }
        var mainState = document.getElementById("mainState");
        if (!mainState) {
            throw new Error("mainState not found");
        }
        searchFilter = new SearchFilterComponents;
        selectCitation = new SelectCitationsComponent(displayNoneClass, loadMore, shouldLoadMore);
        saveAsTextBtn = new Button("saveAsTextBtn", {
            variant: "secondary"
        });
        insertLinkBtn = new Button("insertLinkBtn", {
            disabled: true
        });
        insertBibBtn = new Button("insertBibBtn", {
            variant: "secondary"
        });
        refreshBtn = new Button("refreshBtn", {
            variant: "secondary"
        });
        elements = {
            error: error,
            mainState: mainState
        };
    }
    window.Asc.plugin.init = function() {
        Loader.show();
        initElements();
        router = new Router;
        sdk = new ZoteroSdk;
        var loginPage = new LoginPage(router, sdk);
        settings = new SettingsPage(router, displayNoneClass);
        citationService = new CitationService(settings.getLocalesManager(), settings.getStyleManager(), sdk);
        var isInit = false;
        addEventListeners();
        loginPage.init().onOpen(function() {
            Loader.hide();
        }).onChangeState(function(apis) {
            settings.setDesktopApiAvailable(apis.desktop);
            settings.setRestApiAvailable(apis.online);
        }).onAuthorized(function(apis) {
            if (isInit) return;
            isInit = true;
            Loader.show();
            Promise.all([ loadGroups(), settings.init() ]).then(function() {
                Loader.hide();
            });
        });
        window.Asc.plugin.onTranslate = applyTranslations;
    };
    function loadGroups() {
        return sdk.getUserGroups().then(function(groups) {
            searchFilter.addGroups(groups);
        });
    }
    function addEventListeners() {
        selectCitation.subscribe(checkSelected);
        function searchFor(text, selectedGroups, groupsHash) {
            selectCitation.clearLibrary();
            var promises = [];
            return sdk.getUserGroups().then(function(userGroups) {
                var groups = selectedGroups.filter(function(group) {
                    return group !== "my_library" && group !== "group_libraries";
                });
                if (selectedGroups.indexOf("my_library") !== -1) {
                    promises.push(loadLibrary(sdk.getItems(text), false));
                }
                for (var i = 0; i < groups.length; i++) {
                    promises.push(loadLibrary(sdk.getGroupItems(text, groups[i]), true));
                }
                lastSearch.text = text;
                lastSearch.obj = null;
                lastSearch.groups = [];
                lastSearch.groupsHash = groupsHash;
                return promises;
            });
        }
        searchFilter.subscribe(function(text, selectedGroups) {
            text = text.trim();
            var groupsHash = selectedGroups.join(",");
            if (elements.mainState.classList.contains(displayNoneClass) || !text || text == lastSearch.text && groupsHash === lastSearch.groupsHash || selectedGroups.length === 0) return;
            searchFor(text, selectedGroups, groupsHash).catch(() => []).then(function(promises) {
                if (promises.length) {
                    libLoader.show();
                    Promise.any(promises).then(function() {
                        libLoader.hide();
                    }).finally(function() {
                        libLoader.hide();
                    });
                }
                return Promise.allSettled(promises);
            }).then(function(numOfShownByLib) {
                var numOfShown = 0;
                numOfShownByLib.forEach(function(promise) {
                    if (promise.status === "fulfilled") {
                        numOfShown += promise.value;
                    }
                });
                if (numOfShown === 0) {
                    selectCitation.displayNothingFound();
                }
            });
        });
        refreshBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            if (!settings.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!settings.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader();
            citationService.updateCslItems(true, false).catch(function(error) {
                console.error(error);
                var message = translate("Failed to refresh");
                if (typeof error === "string") {
                    message += ". " + translate(error);
                }
                showError(message);
            }).finally(function() {
                hideLoader();
            });
        });
        insertBibBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            if (!settings.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!settings.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader();
            citationService.updateCslItems(true, true).catch(function(error) {
                console.error(error);
                var message = translate("Failed to insert bibliography");
                if (typeof error === "string") {
                    message += ". " + translate(error);
                }
                showError(message);
            }).finally(function() {
                hideLoader();
            });
        });
        insertLinkBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            if (!settings.getLastUsedStyleId()) {
                showError(translate("Style is not selected"));
                return;
            }
            if (!settings.getLocale()) {
                showError(translate("Language is not selected"));
                return;
            }
            showLoader();
            citationService.updateCslItems(false, false).then(function() {
                var items = selectCitation.getSelectedItems();
                return citationService.insertSelectedCitations(items);
            }).then(function(keys) {
                selectCitation.removeItems(keys);
                return citationService.updateCslItems(true, false);
            }).catch(function(error) {
                console.error(error);
                var message = translate("Failed to insert citation");
                if (typeof error === "string") {
                    message += ". " + translate(error);
                }
                showError(message);
            }).finally(function() {
                hideLoader();
            });
        });
        saveAsTextBtn.subscribe(function(event) {
            if (event.type !== "button:click") {
                return;
            }
            showLoader();
            citationService.saveAsText().then(function() {
                hideLoader();
            });
        });
        settings.onChangeState(function(settings) {
            citationService.setNotesStyle(settings.notesStyle);
            citationService.setStyleFormat(settings.styleFormat);
            return citationService.updateCslItems(true, false);
        });
    }
    Asc.plugin.onThemeChanged = function(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        Theme.fixThemeForIE(theme);
        Theme.addStylesForComponents(theme);
        var rules = "";
        rules += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n";
        rules += ".doc { border-color: " + theme["border-regular-control"] + "; background-color: " + theme["background-normal"] + "; }\n";
        rules += ".scrollThumb { box-shadow: 0 0 8px 8px " + theme["highlight-button-hover"] + " inset; }\n";
        rules += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + theme["canvas-scroll-thumb-pressed"] + " inset; }\n";
        rules += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + theme["canvas-scroll-thumb-hover"] + " inset; }\n";
        if ([ "theme-white", "theme-night" ].indexOf(theme.name) !== -1 || [ "theme-white", "theme-night" ].indexOf(theme.Name) !== -1) {
            rules += ".doc { border-radius: 4px; }\n";
        }
        var styleTheme = document.getElementById("pluginStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "pluginStyles";
            styleTheme.innerHTML = rules;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
        } else {
            styleTheme.innerHTML = rules;
        }
        var themeType = theme.type || "light";
        var body = document.body;
        body.classList.remove("theme-dark");
        body.classList.remove("theme-light");
        body.classList.add("theme-" + themeType);
    };
    function applyTranslations() {
        var elements = document.getElementsByClassName("i18n");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el instanceof HTMLElement === false) continue;
            [ "placeholder", "title" ].forEach(attr => {
                if (el.hasAttribute(attr)) {
                    el.setAttribute(attr, translate(el.getAttribute(attr) || ""));
                }
            });
            var translated = translate(el.innerText.trim());
            if (translated) el.innerText = translated;
        }
    }
    function showError(message) {
        if (message && typeof message === "string") {
            translate("");
            switchClass(elements.error, displayNoneClass, false);
            elements.error.textContent = message;
            setTimeout(function() {
                window.onclick = function() {
                    showError(false);
                };
            }, 100);
        } else {
            switchClass(elements.error, displayNoneClass, true);
            elements.error.textContent = "";
            window.onclick = null;
        }
    }
    function showLoader() {
        insertBibBtn.disable();
        refreshBtn.disable();
        insertLinkBtn.disable();
    }
    function hideLoader() {
        insertBibBtn.enable();
        refreshBtn.enable();
        checkSelected();
    }
    function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }
    function loadMore() {
        console.warn("Loading more...");
        if (lastSearch.obj && lastSearch.obj.next) {
            loadLibrary(lastSearch.obj.next(), false);
        }
        for (var i = 0; i < lastSearch.groups.length && lastSearch.groups[i].next; i++) {
            loadLibrary(sdk.getGroupItems(lastSearch.groups[i].next(), lastSearch.groups[i].id), true);
        }
    }
    function shouldLoadMore(holder) {
        if (router.getRoute() != "main") return false;
        if (holder.scrollTop + holder.clientHeight < holder.scrollHeight) {
            return false;
        }
        var flag = true;
        lastSearch.groups.forEach(function(el) {
            if (el.next) flag = false;
        });
        if (!lastSearch.obj || !lastSearch.obj.next || !flag) return false;
        if (!lastSearch.obj && !lastSearch.text.trim() && !lastSearch.groups.length) return false;
        return true;
    }
    function loadLibrary(promise, isGroup) {
        return promise.then(function(res) {
            return displaySearchItems(res, null, isGroup);
        }).catch(function(err) {
            console.error(err);
            if (err.message) {
                showError(translate(err.message));
            }
            return displaySearchItems(null, err, isGroup);
        }).then(function(numOfShown) {
            return numOfShown;
        });
    }
    function displaySearchItems(res, err, isGroup) {
        var first = false;
        if (!lastSearch.obj && res && res.items && !res.items.length) first = true;
        if (err) {
            if (first) {
                lastSearch.obj = null;
                lastSearch.groups = [];
            }
            if (lastSearch && lastSearch.obj) {
                delete lastSearch.obj.next;
            }
        } else {
            if (isGroup && res && res.next) lastSearch.groups.push(res); else lastSearch.obj = res && res.items.length ? res : null;
        }
        var fillUrisFromId = function fillUrisFromId(item) {
            var slashFirstIndex = item.id.indexOf("/") + 1;
            var slashLastIndex = item.id.lastIndexOf("/") + 1;
            var httpIndex = item.id.indexOf("http");
            if (slashFirstIndex !== slashLastIndex && httpIndex === 0) {
                if (!item.uris) {
                    item.uris = [];
                }
                item.uris.push(item.id);
            }
            if (slashLastIndex) item.id = item.id.substring(slashLastIndex);
            return item;
        };
        if (res && res.items && res.items.length > 0) {
            for (var index = 0; index < res.items.length; index++) {
                var item = res.items[index];
                item[isGroup ? "groupID" : "userID"] = res.id;
                fillUrisFromId(item);
            }
        }
        return selectCitation.displaySearchItems(res, err);
    }
    function checkSelected(numOfSelected) {
        if (typeof numOfSelected === "undefined") {
            numOfSelected = selectCitation.count();
        }
        if (numOfSelected <= 0) {
            insertLinkBtn.disable();
            insertLinkBtn.setText(translate("Insert Citation"));
        } else {
            insertLinkBtn.enable();
            if (numOfSelected > 1) {
                insertLinkBtn.setText(translate("Insert " + numOfSelected + " Citations"));
            } else {
                insertLinkBtn.setText(translate("Insert Citation"));
            }
        }
    }
})();
//# sourceMappingURL=bundle.modern.js.map
