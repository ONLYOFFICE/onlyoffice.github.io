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
function _assertClassBrand(t, e, i) {
  if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : i;
  throw new TypeError("Private element is not present on this object");
}
function asyncGeneratorStep(t, e, i, s, n, a, r) {
  try {
    var o = t[a](r), l = o.value;
  } catch (t2) {
    return void i(t2);
  }
  o.done ? e(l) : Promise.resolve(l).then(s, n);
}
function _asyncToGenerator(t) {
  return function() {
    var e = this, i = arguments;
    return new Promise(function(s, n) {
      var a = t.apply(e, i);
      function r(t2) {
        asyncGeneratorStep(a, s, n, r, o, "next", t2);
      }
      function o(t2) {
        asyncGeneratorStep(a, s, n, r, o, "throw", t2);
      }
      r(void 0);
    });
  };
}
function _checkPrivateRedeclaration(t, e) {
  if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet2(t, e) {
  return t.get(_assertClassBrand(t, e));
}
function _classPrivateFieldInitSpec(t, e, i) {
  _checkPrivateRedeclaration(t, e), e.set(t, i);
}
function _classPrivateFieldSet2(t, e, i) {
  return t.set(_assertClassBrand(t, e), i), i;
}
function _classPrivateMethodInitSpec(t, e) {
  _checkPrivateRedeclaration(t, e), e.add(t);
}
function _defineProperty(t, e, i) {
  return (e = _toPropertyKey(e)) in t ? Object.defineProperty(t, e, { value: i, enumerable: true, configurable: true, writable: true }) : t[e] = i, t;
}
function ownKeys(t, e) {
  var i = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    e && (s = s.filter(function(e2) {
      return Object.getOwnPropertyDescriptor(t, e2).enumerable;
    })), i.push.apply(i, s);
  }
  return i;
}
function _objectSpread2(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = null != arguments[e] ? arguments[e] : {};
    e % 2 ? ownKeys(Object(i), true).forEach(function(e2) {
      _defineProperty(t, e2, i[e2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : ownKeys(Object(i)).forEach(function(e2) {
      Object.defineProperty(t, e2, Object.getOwnPropertyDescriptor(i, e2));
    });
  }
  return t;
}
function _toPrimitive(t, e) {
  if ("object" != typeof t || !t) return t;
  var i = t[Symbol.toPrimitive];
  if (void 0 !== i) {
    var s = i.call(t, e);
    if ("object" != typeof s) return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}
function _toPropertyKey(t) {
  var e = _toPrimitive(t, "string");
  return "symbol" == typeof e ? e : e + "";
}
var Theme = { addStylesForComponents: function(t) {
  var e = "";
  t["background-toolbar"] && (e += ".loader-body,\n.loader-bg { background-color: " + t["background-toolbar"] + "; }\n", e += ".loader-body {     box-shadow: 0 0 99px 99px " + t["background-toolbar"] + "; }\n"), t["background-loader"] && (e += ".loader-image { color: " + t["background-loader"] + "; }\n"), t["background-normal"] && (e += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n.message { background-color: " + t["background-normal"] + "; }\n"), t["text-inverse"] && (e += ".custom-button-primary { color: " + t["text-inverse"] + "; }\n"), t["border-regular-control"] && (e += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n.message { border-color: " + t["border-regular-control"] + "; }\n", e += ".selectbox-search,\n.selectbox-option-divider { border-color: " + t["border-regular-control"] + " !important; }\n"), t["border-error"] && (e += ".input-field-invalid .input-field-element { border-color: " + t["border-error"] + "; }\n"), t["border-control-focus"] && (e += ".custom-button-icon-only:focus:not(:active):not(:hover),\n.custom-button-secondary-icon:focus:not(:active):not(:hover),\n.custom-button-secondary:focus:not(:active):not(:hover),\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus,\n.selectbox-header-open { border-color: " + t["border-control-focus"] + "; }\n"), t["highlight-button-hover"] && (e += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + t["highlight-button-hover"] + "; }\n"), t["highlight-button-pressed"] && (e += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + t["highlight-button-pressed"] + "; }\n", e += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t["highlight-button-pressed"] + "; }\n"), t["highlight-primary-dialog-button-hover"] && (e += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t["highlight-primary-dialog-button-hover"] + "; border-color: " + t["highlight-primary-dialog-button-hover"] + "; }\n"), t["background-primary-dialog-button"] && (e += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + t["background-primary-dialog-button"] + "; border-color: " + t["background-primary-dialog-button"] + "; }\n"), t["background-toolbar-additional"] && (e += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + t["background-toolbar-additional"] + "; border-color: " + t["background-toolbar-additional"] + "; }\n"), t["text-normal"] && (e += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + t["text-normal"] + "; }\n", e += ".input-field-search-icon svg { fill: " + t["text-normal"] + "; }\n", e += ".selectbox-arrow b { border-color: " + t["text-normal"] + "; }\n"), t["text-secondary"] && (e += ".message-close:hover,\n.input-field-clear:hover { color: " + t["text-secondary"] + "; }\n"), t["text-tertiary"] && (e += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + t["text-tertiary"] + "; }\n");
  var i = "11px";
  -1 !== ["theme-white", "theme-night"].indexOf(t.name) || -1 !== ["theme-white", "theme-night"].indexOf(t.Name) ? (i = "12px", e += ".message,\n.custom-button,\n.selectbox-header,\n.input-field-element { border-radius: 4px; }\n", e += ".radio--checked .radio-visual { border-width: 4px; }\n", e += ".checkbox-checkmark { color: " + t["text-inverse"] + "; }\n", e += ".checkbox--checked .checkbox-visual { background-color: " + t["background-primary-dialog-button"] + "; }\n", e += ".radio--checked .radio-visual,\n.checkbox--checked .checkbox-visual { border-color: " + t["background-primary-dialog-button"] + "; }\n", e += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + t["highlight-button-hover"] + "; }\n", e += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; background-color: " + t["highlight-primary-dialog-button-hover"] + "; }\n", e += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; }\n", e += "body { font-size: 12px; }\n") : (e += ".checkbox-checkmark { color: " + t["text-normal"] + "; }\n", e += ".radio--checked .radio-visual { background-color: " + t["text-normal"] + ";\n box-shadow: 0 0 0 2px" + t["background-normal"] + " inset; }\n", e += ".radio-button-container:hover .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["border-control-focus"] + "; }\n"), e += "body, input, textarea, select, button { font-size: " + i + "; }\n";
  var s = document.getElementById("componentsStyles");
  return s ? (s.innerHTML = e, e) : ((s = document.createElement("style")).id = "componentsStyles", s.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(s), e);
}, fixThemeForIE: function(t) {
  return t["background-toolbar"] || (t["background-toolbar"] = "#f7f7f7"), t["text-normal"] || (t["text-normal"] = "rgb(51, 51, 51)"), t["text-secondary"] || (t["text-secondary"] = "#848484"), t["highlight-button-hover"] || (t["highlight-button-hover"] = "#e0e0e0"), t["background-normal"] || (t["background-normal"] = "white"), t["background-loader"] || (t["background-loader"] = "rgba(24, 24, 24, 0.9)"), t["highlight-button-pressed"] || (t["highlight-button-pressed"] = "#cbcbcb"), t["text-inverse"] || (t["text-inverse"] = "white"), t["border-regular-control"] || (t["border-regular-control"] = "#c0c0c0"), t["border-error"] || (t["border-error"] = "#f62211"), t["border-control-focus"] || (t["border-control-focus"] = "#848484"), t["highlight-primary-dialog-button-hover"] || (t["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t["background-primary-dialog-button"] || (t["background-primary-dialog-button"] = "#444444"), t["background-toolbar-additional"] || (t["background-toolbar-additional"] = "#efefef"), t["text-tertiary"] || (t["text-tertiary"] = "#bdbdbd"), t;
} };
function Router() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(t) {
    var e = document.getElementById(t);
    if (!e) throw new Error("container ".concat(t, " not found"));
    return e;
  });
}
Router.prototype.getRoute = function() {
  return this._currentRoute;
}, Router.prototype._setCurrentRoute = function(t) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = t, this._currentRouteIndex = this._routes.indexOf(t), this._containers[this._currentRouteIndex].classList.remove("hidden");
}, Router.prototype.openMain = function() {
  this._setCurrentRoute("main");
}, Router.prototype.openLogin = function() {
  this._setCurrentRoute("login");
}, Router.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
var zoteroEnvironment = { restApiUrl: "https://api.zotero.org/", desktopApiUrl: "http://127.0.0.1:23119/api/" }, ZoteroApiChecker = { _done: false, _desktop: false, _hasPermission: true, _online: false, _hasKey: false, _timeout: 1e3, _callback: function(t) {
}, _desktopVersion: (function() {
  if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return false;
  if (window.location && "file:" == window.location.protocol) return true;
  var t = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
  return !(!t || 0 != t.indexOf("file:///"));
})(), runApisChecker: function(t) {
  var e = this;
  return e._done = false, (function i() {
    e._done || e._checkApiAvailable(t).then(function(t2) {
      e._done || ((t2.online && t2.hasKey || t2.desktop && t2.hasPermission) && (e._done = true), e._callback(t2), setTimeout(i, e._timeout));
    });
  })(), { subscribe: function(t2) {
    e._callback = t2;
  }, unsubscribe: function() {
    e._done = true, e._callback = function() {
    };
  } };
}, checkStatus: function(t) {
  return this._checkApiAvailable(t);
}, successfullyLoggedInUsingApiKey: function() {
  this._done = true, this._callback({ online: true, hasKey: true, desktop: this._desktop, hasPermission: this._hasPermission, desktopVersion: this._desktopVersion });
}, _checkApiAvailable: function(t) {
  var e = this;
  return Promise.all([fetch(zoteroEnvironment.restApiUrl, { method: "GET", cache: "no-cache" }).then(function(t2) {
    return 200 === t2.status;
  }).catch(function() {
    return false;
  }), e._sendDesktopRequest(zoteroEnvironment.desktopApiUrl).then(function(t2) {
    return e._hasPermission = t2.hasPermission, t2.isZoteroRunning;
  }).catch(function() {
    return false;
  })]).then(function(i) {
    return e._online = i[0], e._desktop = i[1], e._hasKey = t.hasSettings(), { online: e._online, hasKey: e._hasKey, desktop: e._desktop, hasPermission: e._hasPermission, desktopVersion: e._desktopVersion };
  });
}, _sendDesktopRequest: function(t) {
  var e = this;
  return new Promise(function(i, s) {
    e._desktopVersion ? window.AscSimpleRequest.createRequest({ url: t, method: "GET", headers: { "Zotero-API-Version": "3", "User-Agent": "AscDesktopEditor" }, complete: function(t2) {
      var e2 = false, s2 = false;
      403 == t2.responseStatus ? (e2 = false, s2 = true) : 200 === t2.responseStatus && (s2 = true, e2 = true), i({ hasPermission: e2, isZoteroRunning: s2 });
    }, error: function(t2) {
      -102 == t2.statusCode && (t2.statusCode = 404), s(t2);
    } }) : i({ hasPermission: false, isZoteroRunning: false });
  });
} }, _maxRetries = /* @__PURE__ */ new WeakMap(), _initialDelay = /* @__PURE__ */ new WeakMap(), _maxDelay = /* @__PURE__ */ new WeakMap(), _backoffFactor = /* @__PURE__ */ new WeakMap(), _retryOn = /* @__PURE__ */ new WeakMap(), _requestLimit = /* @__PURE__ */ new WeakMap(), _requestWindow = /* @__PURE__ */ new WeakMap(), _requestTimestamps = /* @__PURE__ */ new WeakMap(), _requestCount = /* @__PURE__ */ new WeakMap(), _lastRequestTime = /* @__PURE__ */ new WeakMap(), _RateLimitedFetcher_brand = /* @__PURE__ */ new WeakSet();
class RateLimitedFetcher {
  constructor() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    _classPrivateMethodInitSpec(this, _RateLimitedFetcher_brand), _classPrivateFieldInitSpec(this, _maxRetries, void 0), _classPrivateFieldInitSpec(this, _initialDelay, void 0), _classPrivateFieldInitSpec(this, _maxDelay, void 0), _classPrivateFieldInitSpec(this, _backoffFactor, void 0), _classPrivateFieldInitSpec(this, _retryOn, void 0), _classPrivateFieldInitSpec(this, _requestLimit, void 0), _classPrivateFieldInitSpec(this, _requestWindow, void 0), _classPrivateFieldInitSpec(this, _requestTimestamps, void 0), _classPrivateFieldInitSpec(this, _requestCount, void 0), _classPrivateFieldInitSpec(this, _lastRequestTime, void 0), _classPrivateFieldSet2(_maxRetries, this, t.maxRetries || 5), _classPrivateFieldSet2(_initialDelay, this, t.initialDelay || 1e3), _classPrivateFieldSet2(_maxDelay, this, t.maxDelay || 5e3), _classPrivateFieldSet2(_backoffFactor, this, t.backoffFactor || 2), _classPrivateFieldSet2(_retryOn, this, t.retryOn || [429, 502, 503, 504]), _classPrivateFieldSet2(_requestLimit, this, 10), _classPrivateFieldSet2(_requestWindow, this, 5e3), _classPrivateFieldSet2(_requestTimestamps, this, []), _classPrivateFieldSet2(_requestCount, this, 0), _classPrivateFieldSet2(_lastRequestTime, this, 0);
  }
  fetchWithRetry(t, e, i) {
    var s = this;
    return _asyncToGenerator(function* () {
      try {
        yield _assertClassBrand(_RateLimitedFetcher_brand, s, _checkAndApplyRateLimit).call(s);
        var n = yield fetch(t, { headers: e });
        if (n.ok) return n;
        if (_classPrivateFieldGet2(_retryOn, s).includes(n.status) && i < _classPrivateFieldGet2(_maxRetries, s)) {
          var a = _assertClassBrand(_RateLimitedFetcher_brand, s, _calculateDelay).call(s, i, n);
          return console.log("Attempt ".concat(i + 1, "/").concat(_classPrivateFieldGet2(_maxRetries, s), " failed with ").concat(n.status, ". Retrying in ").concat(a, "ms")), yield _assertClassBrand(_RateLimitedFetcher_brand, s, _delay).call(s, a), s.fetchWithRetry(t, e, i + 1);
        }
        throw new Error("".concat(n.status, " ").concat(n.statusText));
      } catch (n2) {
        if (i >= _classPrivateFieldGet2(_maxRetries, s)) {
          var r = "";
          throw n2 instanceof Error && (r = n2.message), new Error("Request failed after ".concat(_classPrivateFieldGet2(_maxRetries, s), " attempts: ").concat(r));
        }
        if (i < _classPrivateFieldGet2(_maxRetries, s)) {
          var o = _assertClassBrand(_RateLimitedFetcher_brand, s, _calculateDelay).call(s, i);
          return console.log("Network error on attempt ".concat(i + 1, ". Retrying in ").concat(o, "ms")), yield _assertClassBrand(_RateLimitedFetcher_brand, s, _delay).call(s, o), s.fetchWithRetry(t, e, i + 1);
        }
        throw n2;
      }
    })();
  }
  resetCounter() {
    _classPrivateFieldSet2(_requestTimestamps, this, []), _classPrivateFieldSet2(_requestCount, this, 0), _classPrivateFieldSet2(_lastRequestTime, this, 0);
  }
}
function _cleanupOldRequests() {
  var t = Date.now();
  _classPrivateFieldSet2(_requestTimestamps, this, _classPrivateFieldGet2(_requestTimestamps, this).filter((e) => t - e < _classPrivateFieldGet2(_requestWindow, this)));
}
function _checkAndApplyRateLimit() {
  return _checkAndApplyRateLimit2.apply(this, arguments);
}
function _checkAndApplyRateLimit2() {
  return (_checkAndApplyRateLimit2 = _asyncToGenerator(function* () {
    var t;
    if (_assertClassBrand(_RateLimitedFetcher_brand, this, _cleanupOldRequests).call(this), _classPrivateFieldGet2(_requestTimestamps, this).length >= _classPrivateFieldGet2(_requestLimit, this)) {
      var e = _classPrivateFieldGet2(_requestTimestamps, this)[0];
      if (Date.now() - e < _classPrivateFieldGet2(_requestWindow, this)) {
        var i = 500 * _classPrivateFieldGet2(_requestTimestamps, this).length - _classPrivateFieldGet2(_requestLimit, this);
        i < 0 && (i = 0, console.warn("Wait time is less than 0")), console.log("Rate limit prevention: ".concat(_classPrivateFieldGet2(_requestTimestamps, this).length, " requests in last ").concat(_classPrivateFieldGet2(_requestWindow, this), "ms. Waiting ").concat(i, "ms...")), yield _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, i), _assertClassBrand(_RateLimitedFetcher_brand, this, _cleanupOldRequests).call(this);
      }
    }
    _classPrivateFieldGet2(_requestTimestamps, this).push(Date.now()), _classPrivateFieldSet2(_requestCount, this, (t = _classPrivateFieldGet2(_requestCount, this), ++t));
    var s = Date.now() - _classPrivateFieldGet2(_lastRequestTime, this);
    s < 100 && _classPrivateFieldGet2(_lastRequestTime, this) > 0 && (yield _assertClassBrand(_RateLimitedFetcher_brand, this, _delay).call(this, 100 - s)), _classPrivateFieldSet2(_lastRequestTime, this, Date.now());
  })).apply(this, arguments);
}
function _calculateDelay(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = null == e ? void 0 : e.headers.get("Retry-After");
  if (i) {
    var s = parseInt(i);
    if (s > 86400) {
      var n = 1e3 * parseInt(i);
      return Math.max(0, n - Date.now());
    }
    return 1e3 * s;
  }
  var a = _classPrivateFieldGet2(_initialDelay, this) * Math.pow(_classPrivateFieldGet2(_backoffFactor, this), t), r = 1e3 * Math.random();
  return Math.min(a + r, _classPrivateFieldGet2(_maxDelay, this));
}
function _delay(t) {
  return new Promise((e) => setTimeout(e, t));
}
var ZoteroSdk = function() {
  this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = true, this._fetcher = new RateLimitedFetcher({ maxRetries: 5, initialDelay: 5e3 });
};
function InputField(t, e) {
  var i = this;
  if (e = e || {}, "string" == typeof t) {
    var s = document.getElementById(t);
    s instanceof HTMLInputElement && (t = s);
  }
  if (!(t instanceof HTMLInputElement)) throw new Error("Invalid input element");
  for (var n in this.input = t, this._container = document.createElement("div"), this._options = { type: e.type || t.type || "text", placeholder: e.placeholder || t.placeholder || "", value: e.value || t.value || "", autofocus: e.autofocus || false, disabled: e.disabled || false, readonly: e.readonly || false, required: e.required || false, showCounter: e.showCounter || false, showClear: void 0 === e.showClear || e.showClear, autocomplete: e.autocomplete || "off" }, e) this._options.hasOwnProperty(n) || (this._options[n] = e[n]);
  this._id = t.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = false, this.isValid = true, this._validationMessage = "", this._subscribers = [], this._boundHandles = { focus: function(t2) {
    i._handleFocus(t2);
  }, blur: function(t2) {
    i._handleBlur(t2);
  }, input: function(t2) {
    i._handleInput(t2);
  }, keydown: function(t2) {
    i._handleKeydown(t2);
  }, clear: function() {
    i.clear();
  }, validate: function() {
    i.validate();
  } }, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), "search" === this._options.type && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(/* @__PURE__ */ (function(t2) {
    return function() {
      t2.focus();
    };
  })(this), 100);
}
function Message(t, e) {
  if ("string" == typeof t) {
    var i = document.getElementById(t);
    i instanceof HTMLElement && (t = i);
  }
  if (!(t instanceof HTMLElement)) throw new Error("Invalid container element");
  this.container = t, this._options = Object.assign(this._options, e), this._isShow = false;
}
function Button(t, e) {
  var i = this;
  if ("string" == typeof t) {
    var s = document.getElementById(t);
    s instanceof HTMLButtonElement && (t = s);
  }
  if (!(t instanceof HTMLButtonElement)) throw new Error("Invalid button");
  this._button = t, this._container = document.createElement("div"), this._options = e || {}, this._options.text = this._options.text || t.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = false, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = { click: function(t2) {
    i._handleClick(t2);
  }, mouseenter: function() {
    i._handleMouseEnter();
  }, mouseleave: function() {
    i._handleMouseLeave();
  }, focus: function() {
    i._handleFocus();
  }, blur: function() {
    i._handleBlur();
  }, keydown: function(t2) {
    i._handleKeydown(t2);
  } }, this._createDOM(), this._bindEvents(), this.updateState();
}
ZoteroSdk.prototype.ZOTERO_API_VERSION = "3", ZoteroSdk.prototype.USER_AGENT = "AscDesktopEditor", ZoteroSdk.prototype.DEFAULT_FORMAT = "csljson", ZoteroSdk.prototype.STORAGE_KEYS = { USER_ID: "zoteroUserId", API_KEY: "zoteroApiKey" }, ZoteroSdk.prototype.API_PATHS = { USERS: "users", GROUPS: "groups", ITEMS: "items", KEYS: "keys" }, ZoteroSdk.prototype._getBaseUrl = function() {
  return this._isOnlineAvailable ? zoteroEnvironment.restApiUrl : zoteroEnvironment.desktopApiUrl;
}, ZoteroSdk.prototype._getDesktopRequest = function(t) {
  var e = this;
  return new Promise(function(i, s) {
    window.AscSimpleRequest.createRequest({ url: t, method: "GET", headers: { "Zotero-API-Version": e.ZOTERO_API_VERSION, "User-Agent": e.USER_AGENT }, complete: i, error: function(t2) {
      -102 === t2.statusCode && (t2.statusCode = 404, t2.message = "Connection to Zotero failed. Make sure Zotero is running"), s(t2);
    } });
  });
}, ZoteroSdk.prototype._getOnlineRequest = function(t) {
  var e = { "Zotero-API-Version": this.ZOTERO_API_VERSION, "Zotero-API-Key": this._apiKey || "" };
  return fetch(t, { headers: e }).then(function(t2) {
    if (!t2.ok) {
      var e2 = t2.status + " " + t2.statusText;
      throw console.error(e2), new Error(e2);
    }
    return t2;
  }).catch(function(t2) {
    throw "object" == typeof t2 && (t2.message = "Connection to Zotero failed"), t2;
  });
}, ZoteroSdk.prototype._getRequestWithOfflineSupport = function(t) {
  return this._isOnlineAvailable ? this._getOnlineRequest(t) : this._getDesktopRequest(t.href);
}, ZoteroSdk.prototype._buildGetRequest = function(t, e) {
  e = e || {};
  var i = new URL(t, this._getBaseUrl());
  return Object.keys(e).forEach(function(t2) {
    void 0 !== e[t2] && null !== e[t2] && i.searchParams.append(t2, e[t2]);
  }), this._getRequestWithOfflineSupport(i);
}, ZoteroSdk.prototype._parseLinkHeader = function(t) {
  var e, i = {}, s = /<(.*?)>; rel="(.*?)"/g;
  if (!t) return i;
  for (; null !== (e = s.exec(t.trim())); ) i[e[2]] = e[1];
  return i;
}, ZoteroSdk.prototype._parseDesktopItemsResponse = function(t, e) {
  return t.then(function(t2) {
    return { items: JSON.parse(t2.responseText), id: e };
  });
}, ZoteroSdk.prototype._parseItemsResponse = function(t, e) {
  var i = this;
  return t.then(function(t2) {
    return Promise.all([t2.json(), t2]);
  }).then(function(t2) {
    var s = t2[0], n = t2[1], a = i._parseLinkHeader(n.headers.get("Link") || ""), r = { items: s, id: e };
    return "object" == typeof s && s.items && (r.items = s.items), a.next && (r.next = function() {
      return i._parseItemsResponse(i._getOnlineRequest(new URL(a.next)), e);
    }), r;
  });
}, ZoteroSdk.prototype._parseResponse = function(t, e) {
  if (this._isOnlineAvailable) {
    var i = t;
    return this._parseItemsResponse(i, e);
  }
  var s = t;
  return this._parseDesktopItemsResponse(s, e);
}, ZoteroSdk.prototype.getItems = function(t, e, i) {
  var s = this, n = { format: i = i || s.DEFAULT_FORMAT, itemType: "-attachment" };
  t ? n.q = t : e ? n.itemKey = e.join(",") : (n.limit = 20, this._isOnlineAvailable || (n.format = "json"));
  var a = s.API_PATHS.USERS + "/" + s._userId + "/" + s.API_PATHS.ITEMS, r = s._buildGetRequest(a, n);
  return s._parseResponse(r, s._userId);
}, ZoteroSdk.prototype.getGroupItems = function(t, e, i, s) {
  var n = this, a = { format: s = s || n.DEFAULT_FORMAT };
  t ? a.q = t : i && (a.itemKey = i.join(","));
  var r = n.API_PATHS.GROUPS + "/" + e + "/" + n.API_PATHS.ITEMS, o = n._buildGetRequest(r, a);
  return n._parseResponse(o, e);
}, ZoteroSdk.prototype.getUserGroups = function() {
  var t = this;
  return new Promise(function(e, i) {
    if (t._userGroups.length > 0) e(t._userGroups);
    else {
      var s = t.API_PATHS.USERS + "/" + t._userId + "/groups";
      t._buildGetRequest(s).then(function(e2) {
        if (t._isOnlineAvailable) {
          var i2 = e2;
          if (!i2.ok) throw new Error(i2.status + " " + i2.statusText);
          return i2.json();
        }
        var s2 = e2;
        return JSON.parse(s2.responseText);
      }).then(function(i2) {
        t._userGroups = i2.map(function(t2) {
          return { id: t2.id, name: t2.data.name };
        }), e(t._userGroups);
      }).catch(i);
    }
  });
}, ZoteroSdk.prototype.setApiKey = function(t) {
  var e = this, i = this.API_PATHS.KEYS + "/" + t;
  return this._buildGetRequest(i).then(function(t2) {
    var e2 = t2;
    if (!e2.ok) throw new Error(e2.status + " " + e2.statusText);
    return e2.json();
  }).then(function(i2) {
    return e._saveSettings(i2.userID, t), true;
  });
}, ZoteroSdk.prototype._applySettings = function(t, e) {
  this._userId = t, this._apiKey = e;
}, ZoteroSdk.prototype._saveSettings = function(t, e) {
  this._applySettings(t, e), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(t)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, e);
}, ZoteroSdk.prototype.hasSettings = function() {
  var t = localStorage.getItem(this.STORAGE_KEYS.USER_ID), e = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
  return !(!t || !e) && (this._applySettings(Number(t), e), true);
}, ZoteroSdk.prototype.clearSettings = function() {
  localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
}, ZoteroSdk.prototype.getUserId = function() {
  return this._userId;
}, ZoteroSdk.prototype.setIsOnlineAvailable = function(t) {
  this._isOnlineAvailable = t;
}, InputField.prototype = { constructor: InputField, input: null, _container: null, _options: {}, _id: "", isFocused: false, isValid: true, _validationMessage: "", _subscribers: [], _boundHandles: null, _clearButton: null, _counter: null, _counterCurrent: null, _counterMax: null, _validationElement: null, _createDOM: function() {
  var t = this.input.parentNode, e = document.createDocumentFragment();
  e.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
  var i = document.createElement("div");
  this._container.appendChild(i), i.className += " input-field", this._options.disabled && (i.className += " input-field-disabled");
  var s = document.createElement("div");
  if (i.appendChild(s), s.className += " input-field-main", this.input.className += " input-field-element", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = true), this._options.readonly && (this.input.readOnly = true), this._options.required && (this.input.required = true), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
    this._counter = document.createElement("div"), i.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
    var n = document.createElement("span");
    n.textContent = "/", this._counter.appendChild(n), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
  }
  i.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), i.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', s.appendChild(this._searchIcon)), t && t.insertBefore(e, this.input), s.appendChild(this.input);
}, _bindEvents: function() {
  this.input.addEventListener("focus", this._boundHandles.focus), this.input.addEventListener("blur", this._boundHandles.blur), this.input.addEventListener("input", this._boundHandles.input), this.input.addEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.addEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.addEventListener("click", this._boundHandles.search), this.input.addEventListener("change", this._boundHandles.validate);
}, _handleFocus: function(t) {
  this.isFocused = true, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(t);
}, _handleBlur: function(t) {
  this.isFocused = false;
  for (var e = this._container.className.split(" "), i = [], s = 0; s < e.length; s++) "input-field-focused" !== e[s] && i.push(e[s]);
  this._container.className = i.join(" "), this.validate(), this._triggerBlurEvent(t);
}, _handleInput: function(t) {
  this._updateClearButton(), this._updateCounter(), this._triggerInputEvent(t);
}, _handleKeydown: function(t) {
  var e = t.key || t.keyCode;
  "Escape" !== e && 27 !== e || !this._options.showClear || (this.clear(), t.preventDefault()), "Enter" !== e && 13 !== e || this._triggerSubmit();
}, _updateClearButton: function() {
  if (this._clearButton) {
    var t = this.input.value.length > 0;
    this._clearButton.style.display = t ? "block" : "none";
  }
}, _updateCounter: function() {
  if (this._counter && this._options.maxLength) {
    var t = this.input.value.length, e = this._options.maxLength;
    if (this._counterCurrent && (this._counterCurrent.textContent = String(t)), this._counterMax && (this._counterMax.textContent = String(e)), t > 0.9 * e) -1 === this._counter.className.split(" ").indexOf("input-field-counter-warning") && (this._counter.className += " input-field-counter-warning");
    else this._counter.className = this._counter.className.split(" ").filter(function(t2) {
      return "input-field-counter-warning" !== t2;
    }).join(" ");
    if (t > e) -1 === this._counter.className.split(" ").indexOf("input-field-counter-error") && (this._counter.className += " input-field-counter-error");
    else this._counter.className = this._counter.className.split(" ").filter(function(t2) {
      return "input-field-counter-error" !== t2;
    }).join(" ");
  }
}, validate: function() {
  if (!this._options.validation) return this.isValid = true, true;
  var t = this.input.value, e = true, i = "";
  if (this._options.required && !t.trim() ? (e = false, i = "This field is required") : this._options.minLength && t.length < this._options.minLength ? (e = false, i = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && t.length > this._options.maxLength ? (e = false, i = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(t) && (e = false, i = "Invalid format"), e && "function" == typeof this._options.validation) {
    var s = this._options.validation(t);
    s && !s.isValid && (e = false, i = s.message || "Invalid value");
  }
  return this.isValid = e, this._validationMessage = i, this.updateValidationState(), e;
}, updateValidationState: function() {
  if (this.isValid) if (this.input.value.length > 0) {
    this._validationElement.style.display = "none", -1 === this._container.className.split(" ").indexOf("input-field-valid") && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(t) {
      return "input-field-invalid" !== t;
    }).join(" ");
  } else this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(t) {
    return "input-field-valid" !== t && "input-field-invalid" !== t;
  }).join(" ");
  else this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block", -1 === this._container.className.split(" ").indexOf("input-field-invalid") && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(t) {
    return "input-field-valid" !== t;
  }).join(" ");
}, _updateState: function() {
  this._updateClearButton(), this._updateCounter(), this.validate();
}, getValue: function() {
  return this.input.value.trim();
}, setValue: function(t) {
  this.input.value = t, this._updateState(), this._triggerChange();
}, setPlaceholder: function(t) {
  this.input.placeholder = t, this._options.placeholder = t;
}, clear: function(t) {
  t = void 0 === t || t, this.setValue(""), t && this.input.focus();
}, focus: function() {
  this.input.focus();
}, blur: function() {
  this.input.blur();
}, enable: function() {
  this.input.disabled = false, this._options.disabled = false, this._container.className = this._container.className.split(" ").filter(function(t) {
    return "input-field-disabled" !== t;
  }).join(" ");
}, disable: function() {
  this.input.disabled = true, this._options.disabled = true, -1 === this._container.className.split(" ").indexOf("input-field-disabled") && (this._container.className += " input-field-disabled");
}, subscribe: function(t) {
  var e = this;
  return this._subscribers.push(t), { unsubscribe: function() {
    e._subscribers = e._subscribers.filter(function(e2) {
      return e2 !== t;
    });
  } };
}, _triggerInputEvent: function(t) {
  var e = { value: this.input.value, originalEvent: t };
  this._subscribers.forEach(function(t2) {
    t2({ type: "inputfield:input", detail: e });
  });
}, _triggerFocusEvent: function(t) {
  var e = { value: this.input.value, originalEvent: t };
  this._subscribers.forEach(function(t2) {
    t2({ type: "inputfield:focus", detail: e });
  });
}, _triggerBlurEvent: function(t) {
  var e = { value: this.input.value, originalEvent: t };
  this._subscribers.forEach(function(t2) {
    t2({ type: "inputfield:blur", detail: e });
  });
}, _triggerChange: function() {
  var t = { value: this.input.value, isValid: this.isValid };
  this._subscribers.forEach(function(e) {
    e({ type: "inputfield:change", detail: t });
  });
}, _triggerSubmit: function() {
  var t = { value: this.input.value, isValid: this.isValid };
  this._subscribers.forEach(function(e) {
    e({ type: "inputfield:submit", detail: t });
  });
}, destroy: function() {
  if (this._subscribers = [], this._boundHandles) try {
    this.input.removeEventListener("focus", this._boundHandles.focus), this.input.removeEventListener("blur", this._boundHandles.blur), this.input.removeEventListener("input", this._boundHandles.input), this.input.removeEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.removeEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.removeEventListener("click", this._boundHandles.search), this.input.removeEventListener("change", this._boundHandles.validate);
  } catch (t) {
    console.error(t);
  }
  this._container.innerHTML = "", this._container.className = this._container.className.split(" ").filter(function(t) {
    return "input-field-container" !== t;
  }).join(" ");
} }, Message.prototype = { constructor: Message, _options: { type: "info", text: "", title: "", duration: 0, closeButton: true, autoClose: false, closeOnClickOutside: true }, _outsideClickListener: null, _element: null, _timeoutId: null, _create: function() {
  var t = document.createElement("div");
  t.className = "message message-" + this._options.type, t.setAttribute("role", "alert");
  var e = this._options.title;
  if (!e) switch (e = "Error", this._options.type) {
    case "success":
      e = "Success";
      break;
    case "warning":
      e = "Warning";
      break;
    case "info":
      e = "Information";
  }
  var i = this._options.text;
  if (!i) switch (i = "", this._options.type) {
    case "success":
      i = "Operation completed successfully.";
      break;
    case "warning":
      i = "Please be cautious.";
      break;
    case "error":
      i = "Something went wrong.";
  }
  if (t.innerHTML = '<div class="message-content"><span class="message-title">' + e + '</span><span class="message-text">' + i + "</span></div>", this._options.closeButton) {
    var s = document.createElement("button");
    s.className = "message-close", s.textContent = "×", s.setAttribute("aria-label", "Close"), s.onclick = this.close.bind(this), t.appendChild(s);
  }
  return t;
}, addOutsideClickListener: function() {
  this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
  var t = this;
  this._outsideClickListener = function(e) {
    e.target instanceof HTMLElement != false && t._element && !t._element.contains(e.target) && t.close();
  }, setTimeout(function() {
    t._outsideClickListener && document.addEventListener("click", t._outsideClickListener);
  }, 10);
}, removeOutsideClickListener: function() {
  this._outsideClickListener && (document.removeEventListener("click", this._outsideClickListener), this._outsideClickListener = null);
}, show: function(t, e) {
  if (this._isShow) return this;
  this._isShow = true, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), e && (this._options.title = e), t && (this._options.text = t);
  var i = this._create();
  return this._element = i, this.container.appendChild(i), setTimeout(function() {
    i.style.opacity = "1", i.style.transform = "translateY(0)";
  }, 10), this._options.autoClose && Number(this._options.duration) > 0 && (this._timeoutId = setTimeout(this.close.bind(this), this._options.duration)), this._options.closeOnClickOutside && this.addOutsideClickListener(), this;
}, close: function() {
  if (this._isShow = false, this._element && this._element.parentNode) {
    this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null), this.removeOutsideClickListener();
    var t = this._element;
    t.style.opacity = "0", t.style.transform = "translateY(-20px)", setTimeout(function() {
      t.parentNode && t.parentNode.removeChild(t);
    }, 300);
  }
} }, Button.prototype = { constructor: Button, _button: null, _buttonText: null, _spinner: null, _badgeElement: null, _createDOM: function() {
  var t = this._button.parentNode, e = document.createDocumentFragment();
  if (e.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = true), this._options.text) if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
    var i = document.createElement("span");
    i.className = "custom-button-icon", "left" === this._options.iconPosition ? (i.className += " custom-button-icon-left", this._button.appendChild(i), this._button.appendChild(this._buttonText)) : (i.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(i)), i.innerHTML = this._options.icon;
  } else this._button.appendChild(this._buttonText);
  this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), t && t.insertBefore(e, this._button), this._container.appendChild(this._button);
}, _bindEvents: function() {
  this._button.addEventListener("click", this._boundHandles.click), this._button.addEventListener("mouseenter", this._boundHandles.mouseenter), this._button.addEventListener("mouseleave", this._boundHandles.mouseleave), this._button.addEventListener("focus", this._boundHandles.focus), this._button.addEventListener("blur", this._boundHandles.blur), this._button.addEventListener("keydown", this._boundHandles.keydown);
}, _handleClick: function(t) {
  if (this._options.disabled || this.isLoading) return t.preventDefault(), void t.stopPropagation();
  this.triggerClickEvent(t);
}, _handleMouseEnter: function() {
  -1 === this._button.className.split(" ").indexOf("custom-button-hover") && (this._button.className += " custom-button-hover"), this.triggerEvent("mouseenter");
}, _handleMouseLeave: function() {
  this._button.className = this._button.className.split(" ").filter(function(t) {
    return "custom-button-hover" !== t;
  }).join(" "), this.triggerEvent("mouseleave");
}, _handleFocus: function() {
  -1 === this._button.className.split(" ").indexOf("custom-button-focused") && (this._button.className += " custom-button-focused"), this.triggerEvent("focus");
}, _handleBlur: function() {
  this._button.className = this._button.className.split(" ").filter(function(t) {
    return "custom-button-focused" !== t;
  }).join(" "), this.triggerEvent("blur");
}, _handleKeydown: function(t) {
  var e = t.key || t.keyCode;
  " " === e || "Enter" === e || 32 === e || 13 === e ? "BUTTON" === this._button.tagName || (t.preventDefault(), this._button.click()) : "Escape" !== e && 27 !== e || this._button.blur(), this.triggerEvent("keydown", { key: e });
}, subscribe: function(t) {
  var e = this;
  return this._subscribers.push(t), { unsubscribe: function() {
    e._subscribers = e._subscribers.filter(function(e2) {
      return e2 !== t;
    });
  } };
}, setText: function(t) {
  void 0 !== t && (this._options.text = t, this._buttonText || (this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = "", this._button.appendChild(this._buttonText)), this._buttonText.textContent = t);
}, setIcon: function(t, e) {
  this._options.icon = t, this._options.iconPosition = e || "left";
}, setBadge: function(t) {
  void 0 !== t && (this._options.badge = t, this._badgeElement && (this._badgeElement.textContent = t, this._badgeElement.style.display = t ? "flex" : "none"));
}, setVariant: function(t) {
  if (void 0 !== t) {
    var e = "custom-button-" + this._options.variant, i = "custom-button-" + t;
    this._button.className = this._button.className.split(" ").filter(function(t2) {
      return t2 !== e;
    }).join(" ") + " " + i, this._options.variant = t;
  }
}, setSize: function(t) {
  if (void 0 !== t) {
    var e = "custom-button-" + this._options.size, i = "custom-button-" + t;
    this._button.className = this._button.className.split(" ").filter(function(t2) {
      return t2 !== e;
    }).join(" ") + " " + i, this._options.size = t;
  }
}, enable: function() {
  this._options.disabled = false, this._button.disabled = false, this._button.className = this._button.className.split(" ").filter(function(t) {
    return "custom-button-disabled" !== t;
  }).join(" ");
}, disable: function() {
  this._options.disabled = true, this._button.disabled = true, -1 === this._button.className.split(" ").indexOf("custom-button-disabled") && (this._button.className += " custom-button-disabled");
}, startLoading: function() {
  this.isLoading = true, void 0 !== this._options.text && (this._originalText = this._options.text), -1 === this._container.className.split(" ").indexOf("custom-button-loading") && (this._container.className += " custom-button-loading"), this._spinner && (this._spinner.style.display = "inline-block"), this._buttonText && (this._buttonText.textContent = "Loading..."), this._button.disabled = true;
}, stopLoading: function() {
  this.isLoading = false, this._container.className = this._container.className.split(" ").filter(function(t) {
    return "custom-button-loading" !== t;
  }).join(" "), this._spinner && (this._spinner.style.display = "none"), this._buttonText && (this._buttonText.textContent = this._originalText), this._button.disabled = !!this._options.disabled;
}, setTooltip: function(t) {
  void 0 !== t && (this._options.tooltip = t, this._button.title = t || "");
}, triggerClickEvent: function(t) {
  var e = { originalEvent: t, button: this };
  this._subscribers.forEach(function(t2) {
    t2({ type: "button:click", detail: e });
  });
}, triggerEvent: function(t, e) {
  (e = e || {}).button = this, this._subscribers.forEach(function(i) {
    i({ type: "button:" + t, detail: e });
  });
}, updateState: function() {
  this._options.disabled ? this.disable() : this.enable(), this._options.loading && this.startLoading();
}, destroy: function() {
  if (this._subscribers = [], this._boundHandles) try {
    this._button.removeEventListener("click", this._boundHandles.click), this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter), this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave), this._button.removeEventListener("focus", this._boundHandles.focus), this._button.removeEventListener("blur", this._boundHandles.blur), this._button.removeEventListener("keydown", this._boundHandles.keydown);
  } catch (t2) {
    console.error(t2);
  }
  this._container.innerHTML = "";
  var t = this._container.className.split(" ").filter(function(t2) {
    return "custom-button-container" !== t2;
  }).join(" ");
  this._container.className = t;
} };
var _container$1 = /* @__PURE__ */ new WeakMap(), _input = /* @__PURE__ */ new WeakMap(), _visualRadio = /* @__PURE__ */ new WeakMap(), _labelElement = /* @__PURE__ */ new WeakMap(), _options = /* @__PURE__ */ new WeakMap(), _handlers = /* @__PURE__ */ new WeakMap(), _subscribers = /* @__PURE__ */ new WeakMap(), _Radio_brand = /* @__PURE__ */ new WeakSet();
class Radio {
  constructor(t, e) {
    if (_classPrivateMethodInitSpec(this, _Radio_brand), _classPrivateFieldInitSpec(this, _container$1, void 0), _classPrivateFieldInitSpec(this, _input, void 0), _classPrivateFieldInitSpec(this, _visualRadio, void 0), _classPrivateFieldInitSpec(this, _labelElement, null), _classPrivateFieldInitSpec(this, _options, void 0), _classPrivateFieldInitSpec(this, _handlers, /* @__PURE__ */ new Map()), _classPrivateFieldInitSpec(this, _subscribers, []), "string" == typeof t) {
      var i = document.getElementById(t);
      i instanceof HTMLInputElement && (t = i);
    }
    if (!(t instanceof HTMLInputElement)) throw new Error("Invalid input element");
    if (_classPrivateFieldSet2(_input, this, t), _classPrivateFieldSet2(_options, this, Object.assign({ id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)), checked: false, disabled: false, indeterminate: false, label: "", name: "", value: "on" }, e)), _assertClassBrand(_Radio_brand, this, _applyInputAttributes).call(this), _classPrivateFieldSet2(_container$1, this, document.createElement("div")), _classPrivateFieldSet2(_visualRadio, this, document.createElement("span")), _assertClassBrand(_Radio_brand, this, _createDOM$2).call(this), _assertClassBrand(_Radio_brand, this, _setupEventListeners).call(this), _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this), !_classPrivateFieldGet2(_options, this).name) throw new Error("Name attribute is required");
    var s = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
    s || (s = new Array(), _instances$1._.set(_classPrivateFieldGet2(_options, this).name, s)), s.push(this);
  }
  subscribe(t) {
    var e = this;
    return _classPrivateFieldGet2(_subscribers, this).push(t), { unsubscribe: function() {
      _classPrivateFieldSet2(_subscribers, e, _classPrivateFieldGet2(_subscribers, e).filter(function(e2) {
        return e2 !== t;
      }));
    } };
  }
  getElement() {
    return _classPrivateFieldGet2(_container$1, this);
  }
  check(t) {
    if (!_classPrivateFieldGet2(_options, this).disabled && !_classPrivateFieldGet2(_options, this).checked) {
      if (_classPrivateFieldGet2(_options, this).name) {
        var e = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
        e && e.forEach((t2) => {
          t2 !== this && _classPrivateFieldGet2(_options, t2).checked && t2.uncheck();
        });
      }
      _classPrivateFieldGet2(_options, this).checked = true, _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this), t || _assertClassBrand(_Radio_brand, this, _triggerChange$1).call(this);
    }
  }
  uncheck(t) {
    !_classPrivateFieldGet2(_options, this).disabled && _classPrivateFieldGet2(_options, this).checked && (_classPrivateFieldGet2(_options, this).checked = false, _assertClassBrand(_Radio_brand, this, _updateVisualState).call(this), t || _assertClassBrand(_Radio_brand, this, _triggerChange$1).call(this));
  }
  enable() {
    _classPrivateFieldGet2(_options, this).disabled && (_classPrivateFieldGet2(_options, this).disabled = false, _classPrivateFieldGet2(_input, this).disabled = false, _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", "false"), _classPrivateFieldGet2(_options, this).checked ? _classPrivateFieldGet2(_container$1, this).tabIndex = 0 : _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this), _classPrivateFieldGet2(_container$1, this).classList.remove("radio--disabled"));
  }
  disable() {
    _classPrivateFieldGet2(_options, this).disabled || (_classPrivateFieldGet2(_options, this).disabled = true, _classPrivateFieldGet2(_input, this).disabled = true, _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", "true"), _classPrivateFieldGet2(_container$1, this).tabIndex = -1, _classPrivateFieldGet2(_container$1, this).classList.add("radio--disabled"));
  }
  setLabel(t) {
    _classPrivateFieldGet2(_options, this).label = t, _classPrivateFieldGet2(_labelElement, this) ? _classPrivateFieldGet2(_labelElement, this).textContent = t : t && (_classPrivateFieldSet2(_labelElement, this, document.createElement("label")), _classPrivateFieldGet2(_labelElement, this).className = "radio-label", _classPrivateFieldGet2(_labelElement, this).htmlFor = String(_classPrivateFieldGet2(_options, this).id), _classPrivateFieldGet2(_labelElement, this).textContent = t, _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_labelElement, this)));
  }
  getState() {
    return { checked: !!_classPrivateFieldGet2(_options, this).checked, disabled: !!_classPrivateFieldGet2(_options, this).disabled, value: _classPrivateFieldGet2(_options, this).value || "", name: _classPrivateFieldGet2(_options, this).name || "" };
  }
  destroy() {
    if (_classPrivateFieldSet2(_subscribers, this, []), _classPrivateFieldGet2(_options, this).name) {
      var t = _instances$1._.get(_classPrivateFieldGet2(_options, this).name);
      if (t) {
        var e = t.indexOf(this);
        e >= 0 && t.splice(e, 1);
      }
      _classPrivateFieldGet2(_handlers, this).forEach((t2, e2) => {
        _classPrivateFieldGet2(_container$1, this).removeEventListener(e2, t2);
      }), _classPrivateFieldGet2(_handlers, this).clear(), _classPrivateFieldGet2(_container$1, this) && _classPrivateFieldGet2(_container$1, this).parentNode && _classPrivateFieldGet2(_container$1, this).parentNode.removeChild(_classPrivateFieldGet2(_container$1, this)), _classPrivateFieldSet2(_labelElement, this, null);
    }
  }
}
function _applyInputAttributes() {
  _classPrivateFieldGet2(_input, this).type = "radio";
  var t = _classPrivateFieldGet2(_input, this).getAttribute("id"), e = _classPrivateFieldGet2(_input, this).getAttribute("name"), i = _classPrivateFieldGet2(_input, this).getAttribute("value"), s = _classPrivateFieldGet2(_input, this).getAttribute("checked"), n = _classPrivateFieldGet2(_input, this).getAttribute("disabled");
  null !== t ? _classPrivateFieldGet2(_options, this).id = t : _classPrivateFieldGet2(_options, this).id && _classPrivateFieldGet2(_input, this).setAttribute("id", _classPrivateFieldGet2(_options, this).id), null !== e ? _classPrivateFieldGet2(_options, this).name = e : _classPrivateFieldGet2(_options, this).name && _classPrivateFieldGet2(_input, this).setAttribute("name", _classPrivateFieldGet2(_options, this).name), null !== i ? _classPrivateFieldGet2(_options, this).value = i : _classPrivateFieldGet2(_options, this).value && _classPrivateFieldGet2(_input, this).setAttribute("value", _classPrivateFieldGet2(_options, this).value), null !== s ? _classPrivateFieldGet2(_options, this).checked = "true" === s : _classPrivateFieldGet2(_options, this).checked && _classPrivateFieldGet2(_input, this).setAttribute("checked", "true"), null !== n ? _classPrivateFieldGet2(_options, this).disabled = "true" === n : _classPrivateFieldGet2(_options, this).disabled && _classPrivateFieldGet2(_input, this).setAttribute("disabled", "true");
}
function _createDOM$2() {
  var t = _classPrivateFieldGet2(_input, this).parentNode, e = document.createDocumentFragment();
  e.appendChild(_classPrivateFieldGet2(_container$1, this)), _classPrivateFieldGet2(_container$1, this).classList.add("radio-button-container"), _classPrivateFieldGet2(_container$1, this).setAttribute("role", "radio"), _classPrivateFieldGet2(_container$1, this).setAttribute("aria-checked", String(!!_classPrivateFieldGet2(_options, this).checked)), _classPrivateFieldGet2(_container$1, this).setAttribute("aria-disabled", String(!!_classPrivateFieldGet2(_options, this).disabled)), _classPrivateFieldGet2(_container$1, this).tabIndex = _classPrivateFieldGet2(_options, this).disabled ? -1 : 0, _classPrivateFieldGet2(_visualRadio, this).className = "radio-visual", _classPrivateFieldGet2(_visualRadio, this).setAttribute("aria-hidden", "true"), _classPrivateFieldGet2(_options, this).label && (_classPrivateFieldSet2(_labelElement, this, document.createElement("label")), _classPrivateFieldGet2(_labelElement, this).className = "i18n radio-label", _classPrivateFieldGet2(_labelElement, this).htmlFor = String(_classPrivateFieldGet2(_options, this).id), _classPrivateFieldGet2(_labelElement, this).textContent = _classPrivateFieldGet2(_options, this).label), _classPrivateFieldGet2(_options, this).disabled && _classPrivateFieldGet2(_container$1, this).classList.add("radio--disabled"), t && t.insertBefore(e, _classPrivateFieldGet2(_input, this)), _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_input, this)), _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_visualRadio, this)), _classPrivateFieldGet2(_labelElement, this) && _classPrivateFieldGet2(_container$1, this).appendChild(_classPrivateFieldGet2(_labelElement, this)), _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
}
function _updateRadioGroupTabIndex() {
  if (_classPrivateFieldGet2(_options, this).checked) _classPrivateFieldGet2(_container$1, this).tabIndex = _classPrivateFieldGet2(_options, this).disabled ? -1 : 0;
  else if (_classPrivateFieldGet2(_options, this).name && _instances$1._.has(_classPrivateFieldGet2(_options, this).name)) {
    var t = _instances$1._.get(_classPrivateFieldGet2(_options, this).name), e = false;
    t && t.forEach((t2) => {
      _classPrivateFieldGet2(_options, t2).checked && t2 !== this && (e = true);
    }), e || _classPrivateFieldGet2(_options, this).checked || _classPrivateFieldGet2(_options, this).disabled ? _classPrivateFieldGet2(_container$1, this).tabIndex = -1 : _classPrivateFieldGet2(_container$1, this).tabIndex = 0;
  }
}
function _setupEventListeners() {
  var t = (t2) => {
    t2.preventDefault(), _classPrivateFieldGet2(_options, this).disabled || _classPrivateFieldGet2(_options, this).checked || (this.check(), _classPrivateFieldGet2(_container$1, this).focus());
  }, e = (t2) => {
    if (!_classPrivateFieldGet2(_options, this).disabled) switch (t2.key) {
      case " ":
      case "Spacebar":
      case "Enter":
        t2.preventDefault(), _classPrivateFieldGet2(_options, this).checked || this.check();
    }
  }, i = () => {
    _classPrivateFieldGet2(_container$1, this).classList.add("radio--focused");
  }, s = () => {
    _classPrivateFieldGet2(_container$1, this).classList.remove("radio--focused");
  };
  _classPrivateFieldGet2(_handlers, this).set("click", t), _classPrivateFieldGet2(_handlers, this).set("keydown", e), _classPrivateFieldGet2(_handlers, this).set("focus", i), _classPrivateFieldGet2(_handlers, this).set("blur", s), _classPrivateFieldGet2(_container$1, this).addEventListener("click", t), _classPrivateFieldGet2(_container$1, this).addEventListener("keydown", e), _classPrivateFieldGet2(_container$1, this).addEventListener("focus", i), _classPrivateFieldGet2(_container$1, this).addEventListener("blur", s);
}
function _updateVisualState() {
  _classPrivateFieldGet2(_container$1, this).setAttribute("aria-checked", String(!!_classPrivateFieldGet2(_options, this).checked)), _classPrivateFieldGet2(_container$1, this).classList.toggle("radio--checked", _classPrivateFieldGet2(_options, this).checked), _classPrivateFieldGet2(_input, this).checked = !!_classPrivateFieldGet2(_options, this).checked, _assertClassBrand(_Radio_brand, this, _updateRadioGroupTabIndex).call(this);
}
function _triggerChange$1(t) {
  var e = { type: "radio:change", detail: this.getState() };
  t && (e.originalEvent = t), _classPrivateFieldGet2(_subscribers, this).forEach(function(t2) {
    t2(e);
  });
}
var _instances$1 = { _: /* @__PURE__ */ new Map() };
function Checkbox(t, e) {
  if ("string" == typeof t) {
    var i = document.getElementById(t);
    i instanceof HTMLInputElement && (t = i);
  }
  if (t instanceof HTMLInputElement == false) throw new Error("Invalid input element");
  this._options = Object.assign({ id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)), checked: false, disabled: false, indeterminate: false, label: "", name: "", value: "on" }, e), this._options.disabled = e.disabled || false, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(t), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
Checkbox.prototype = { constructor: Checkbox, _container: null, _input: null, _visualCheckbox: null, _labelElement: null, _createDOM: function(t) {
  var e = t.parentNode, i = document.createDocumentFragment();
  this._container = document.createElement("div"), i.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = t;
  var s = this._input.getAttribute("id");
  null !== s ? this._options.id = s : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = true), this._options.indeterminate && (this._input.indeterminate = true), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
  var n = "http://www.w3.org/2000/svg", a = document.createElementNS(n, "svg");
  a.setAttribute("viewBox", "0 0 10 8"), a.setAttribute("class", "checkbox-checkmark");
  var r = document.createElementNS(n, "path");
  r.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), a.appendChild(r), this._visualCheckbox.appendChild(a);
  var o = document.createElement("span");
  if (o.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(o), this._options.label) this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
  else {
    var l = document.querySelector("label[for='" + this._options.id + "']");
    l instanceof HTMLLabelElement && (this._labelElement = l);
  }
  this._options.disabled && this._container.classList.add("checkbox--disabled"), e && e.insertBefore(i, t), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
}, _setupEventListeners: function() {
  var t = this;
  if (this._container) {
    var e = function(e2) {
      e2.preventDefault(), !t._options.disabled && t._container && (t.toggle(), t._container.focus());
    }, i = function(e2) {
      if (!t._options.disabled) switch (e2.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          e2.preventDefault(), t.toggle();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e2.preventDefault(), t._options.checked || t._options.indeterminate || (t._options.checked ? t.setIndeterminate() : t.check());
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e2.preventDefault(), (t._options.checked || t._options.indeterminate) && (t._options.indeterminate ? t.uncheck() : t.setIndeterminate());
      }
    }, s = function() {
      t._container && t._container.classList.add("checkbox--focused");
    }, n = function() {
      t._container && t._container.classList.remove("checkbox--focused");
    };
    this._handlers.set("click", e), this._handlers.set("keydown", i), this._handlers.set("focus", s), this._handlers.set("blur", n), this._container.addEventListener("click", e), this._container.addEventListener("keydown", i), this._container.addEventListener("focus", s), this._container.addEventListener("blur", n);
  }
}, _updateVisualState: function() {
  this._container && this._input && (this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked)), this._container.classList.toggle("checkbox--checked", this._options.checked), this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate), this._input.checked = !!this._options.checked, this._input.indeterminate = !!this._options.indeterminate);
}, toggle: function() {
  return this._options.disabled ? !!this._options.checked : (this._options.indeterminate ? (this._options.indeterminate = false, this._options.checked = true) : this._options.checked = !this._options.checked, this._updateVisualState(), this._triggerChange(), this._options.checked);
}, check: function(t) {
  this._options.disabled || this._options.checked && !this._options.indeterminate || (this._options.checked = true, this._options.indeterminate = false, this._updateVisualState(), t || this._triggerChange());
}, uncheck: function(t) {
  this._options.disabled || !this._options.checked && !this._options.indeterminate || (this._options.checked = false, this._options.indeterminate = false, this._updateVisualState(), t || this._triggerChange());
}, setIndeterminate: function() {
  this._options.disabled || this._options.indeterminate || (this._options.indeterminate = true, this._updateVisualState(), this._triggerChange());
}, enable: function() {
  this._options.disabled && this._container && this._input && (this._options.disabled = false, this._input.disabled = false, this._container.setAttribute("aria-disabled", "false"), this._container.tabIndex = 0, this._container.classList.remove("checkbox--disabled"));
}, disable: function() {
  !this._options.disabled && this._container && this._input && (this._options.disabled = true, this._input.disabled = true, this._container.setAttribute("aria-disabled", "true"), this._container.tabIndex = -1, this._container.classList.add("checkbox--disabled"));
}, setLabel: function(t) {
  this._options.label = t, this._labelElement ? this._labelElement.textContent = t : t && this._container && (this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = t, this._container.appendChild(this._labelElement)), this._options.title && this._labelElement && this._labelElement.setAttribute("title", t);
}, getState: function() {
  return this._input ? { checked: this._input.checked, disabled: this._input.disabled, value: this._input.value } : { checked: false, disabled: false, value: "" };
}, subscribe: function(t) {
  var e = this;
  return this._subscribers.push(t), { unsubscribe: function() {
    e._subscribers = e._subscribers.filter(function(e2) {
      return e2 !== t;
    });
  } };
}, _triggerChange: function(t) {
  var e = { type: "checkbox:change", detail: this.getState() };
  t && (e.originalEvent = t), this._subscribers.forEach(function(t2) {
    t2(e);
  });
}, destroy: function() {
  this._subscribers = [], this._handlers.forEach((t, e) => {
    this._container && this._container.removeEventListener(e, t);
  }), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
} };
var _SelectBox_brand = /* @__PURE__ */ new WeakSet();
class SelectBox {
  constructor(t, e) {
    if (_classPrivateMethodInitSpec(this, _SelectBox_brand), "string" == typeof t) {
      var i = document.getElementById(t);
      if (i instanceof HTMLSelectElement) t = i;
      else {
        if (!(i instanceof HTMLElement)) throw new Error("Invalid selectbox");
        this._container = i;
      }
    } else t instanceof HTMLElement && (this._container = t);
    if (t instanceof HTMLSelectElement) this._selectbox = t, this._container = document.createElement("div");
    else if (this._container instanceof HTMLElement == false) throw new Error("Invalid container");
    this._options = Object.assign(e, { placeholder: e.placeholder || "Select...", searchable: e.searchable || false, sortable: e.sortable || false, multiple: e.multiple || false, description: e.description || "" }), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = false, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = { toggle: (t2) => {
      _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, t2);
    }, search: (t2) => {
      _assertClassBrand(_SelectBox_brand, this, _handleSearch).call(this, t2);
    }, close: (t2) => {
      t2.target instanceof HTMLElement && !this._container.contains(t2.target) && !t2.target.classList.contains("selectbox-option") && _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
    }, keydown: (t2) => {
      _assertClassBrand(_SelectBox_brand, this, _handleKeydown).call(this, t2);
    }, dropdownClick: (t2) => {
      _assertClassBrand(_SelectBox_brand, this, _handleDropdownClick).call(this, t2);
    } }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), _assertClassBrand(_SelectBox_brand, this, _createDOM$1).call(this), _assertClassBrand(_SelectBox_brand, this, _bindEvents).call(this), _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this), _instances._.add(this);
  }
  openDropdown() {
    var t;
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = true, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout((t = this, function() {
      t.searchInput && t.searchInput.focus();
    }), 100), _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
  }
  subscribe(t) {
    var e = this;
    return this._subscribers.push(t), { unsubscribe() {
      e._subscribers = e._subscribers.filter(function(e2) {
        return e2 !== t;
      });
    } };
  }
  addItem(t, e, i) {
    i = i || false;
    var s = this._items.some((e2) => e2 && e2.value === t);
    if (s) {
      var n = this._items.find((e2) => e2 && e2.value === t);
      n && (n.selected = i);
    } else this._items.push({ value: t, text: e, selected: i }), this._options.sortable && this._items.sort((t2, e2) => t2 && e2 ? t2.text.localeCompare(e2.text) : t2 ? -1 : e2 ? 1 : 0);
    i && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(t)), _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
  }
  addItems(t, e) {
    var i = this;
    t.forEach(function(t2, s) {
      if (!i._items.some((e2) => e2 && e2.value === t2[0])) {
        var n = e ? t2[0] === e : 0 === s;
        n && (i._options.multiple || i._selectedValues.clear(), i._selectedValues.add(t2[0])), i._items.push({ value: t2[0], text: t2[1], selected: n });
      }
    }, this), this.isOpen && _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this), _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
  }
  addCustomItem(t, e) {
    this._customItems.push({ value: t, text: e, selected: false });
  }
  addSeparator() {
    this._items.push(null);
  }
  removeItem(t) {
    this._items = this._items.filter(function(e) {
      return null === e || e.value !== t;
    }), this._customItems = this._customItems.filter(function(e) {
      return null === e || e.value !== t;
    }), this._selectedValues.delete(t), _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
  }
  getSelectedValue() {
    if (this._options.multiple) return console.error("Method getSelectedValue is only available for single-select boxes."), null;
    var t = Array.from(this._selectedValues);
    return t.length > 0 ? t[0] : null;
  }
  getSelectedValues() {
    if (this._options.multiple) return Array.from(this._selectedValues);
    var t = Array.from(this._selectedValues);
    return t.length > 0 ? t[0] : null;
  }
  selectItems(t, e) {
    var i = this;
    if (this._options.multiple || !Array.isArray(t)) {
      var s = "";
      if (this._options.multiple) {
        var n = function(t2) {
          if (i._optionsContainer) {
            var e2 = i._optionsContainer.querySelector('[data-value="' + t2 + '"]');
            if (e2) {
              var s2 = e2.querySelector('input[type="checkbox"]');
              s2 && s2 instanceof HTMLInputElement && (s2.checked = true), e2.classList.add("selectbox-option-selected"), e2.classList.add("checkbox--checked");
            }
          }
        };
        if (Array.isArray(t)) for (var a = 0; a < t.length; a++) s = t[a], this._selectedValues.has(s) || (this._selectedValues.add(s), n(s));
        else s = t, this._selectedValues.has(s) || (this._selectedValues.add(s), n(s));
      } else if (!Array.isArray(t)) {
        if (s = t, this._selectedValues.clear(), this._selectedValues.add(s), this._optionsContainer) {
          this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + s + '"]').forEach(function(t2) {
            t2.classList.remove("selectbox-option-selected"), t2.classList.remove("checkbox--checked");
          });
          var r = this._optionsContainer.querySelector('[data-value="' + s + '"]');
          r && (r.classList.add("selectbox-option-selected"), r.classList.add("checkbox--checked"));
        }
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
      }
      _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), e || _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, s, true);
    } else console.error("Method selectItem is only available for multi-select boxes.");
  }
  unselectItems(t, e) {
    var i = this;
    if (this._options.multiple) {
      var s = "", n = function(t2) {
        if (i._optionsContainer) {
          var e2 = i._optionsContainer.querySelector('[data-value="' + t2 + '"]');
          if (e2) {
            var s2 = e2.querySelector('input[type="checkbox"]');
            s2 && s2 instanceof HTMLInputElement && (s2.checked = false), e2.classList.remove("selectbox-option-selected"), e2.classList.remove("checkbox--checked");
          }
        }
      };
      if (Array.isArray(t)) for (var a = 0; a < t.length; a++) s = t[a], this._selectedValues.has(s) && (this._selectedValues.delete(s), n(s));
      else s = t, this._selectedValues.has(s) && (this._selectedValues.delete(s), n(s));
      _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), e || _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, s, true);
    } else console.error("Method unselectItem is only available for multi-select boxes.");
  }
  disable() {
    this._select.classList.add("selectbox-disabled");
  }
  enable() {
    this._select.classList.remove("selectbox-disabled");
  }
  clear(t) {
    if (t = t || false, this._selectedValues.clear(), t && this._items.length > 0) {
      var e = this._items[0];
      e && this._selectedValues.add(e.value);
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
  }
  destroy() {
    this._subscribers = [], _instances._.delete(this);
    try {
      this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
    } catch (t2) {
      console.error(t2);
    }
    this._container.innerHTML = "";
    for (var t = this._container.className.split(" "), e = [], i = 0; i < t.length; i++) "selectbox-container" !== t[i] && e.push(t[i]);
    this._container.className = e.join(" ");
  }
}
function _createDOM$1() {
  this._container.innerHTML = "", this._container.className += " selectbox-container";
  var t = document.createDocumentFragment();
  if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), t.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._select.appendChild(this._dropdown), this._options.description) {
    var e = document.createElement("div");
    e.className += " i18n selectbox-description", e.textContent = this._options.description, this._dropdown.appendChild(e);
  }
  if (this._options.searchable) {
    var i = document.createElement("div");
    i.className += " selectbox-search", this._dropdown.appendChild(i), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", i.appendChild(this.searchInput);
  }
  if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(t), this._selectbox) {
    var s = this._selectbox.parentNode;
    if (s) {
      s.insertBefore(this._container, this._selectbox);
      var n = _assertClassBrand(_SelectBox_brand, this, _extractOptions).call(this, this._selectbox);
      this.addItems(n.values, n.selectedValue), this._selectbox.remove();
    }
  }
}
function _bindEvents() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(t) {
    t.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function _toggle(t) {
  if (t && t.stopPropagation(), this.isOpen ? _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this) : this.openDropdown(), t && "click" === t.type) for (var e of _instances._) e.isOpen && e !== this && _assertClassBrand(_SelectBox_brand, e, _closeDropdown).call(e);
}
function _closeDropdown() {
  this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = false, this._dropdown.style.display = "none";
  for (var t = this._arrow.className.split(" "), e = [], i = 0; i < t.length; i++) "selectbox-arrow-open" !== t[i] && e.push(t[i]);
  this._arrow.className = e.join(" ");
  var s = this._header.className.split(" "), n = [];
  for (i = 0; i < s.length; i++) "selectbox-header-open" !== s[i] && n.push(s[i]);
  this._header.className = n.join(" "), this.searchInput && (this.searchInput.value = "");
}
function _handleSearch(t) {
  var e = t.target;
  if (e instanceof HTMLInputElement) {
    var i = e.value.toLowerCase();
    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, i);
  }
}
function _selectNextPrevItem(t) {
  var e, i = this.searchInput ? this.searchInput.value.toLowerCase() : "", s = this._items.filter(function(t2) {
    return null !== t2;
  });
  if (i && (s = s.filter(function(t2) {
    return -1 !== t2.text.toLowerCase().indexOf(i);
  })), 0 !== s.length) {
    if ("up" === t) if (0 === this._selectedValues.size && s.length > 0) e = s[s.length - 1], this._selectedValues.add(e.value);
    else {
      for (var n = Array.from(this._selectedValues), a = -1, r = 0; r < s.length; r++) if (s[r].value === n[0]) {
        a = r;
        break;
      }
      var o = (a - 1 + s.length) % s.length;
      this._selectedValues.clear(), e = s[o], this._selectedValues.add(e.value);
    }
    else if (0 === this._selectedValues.size && s.length > 0) e = s[0], this._selectedValues.add(e.value);
    else {
      for (n = Array.from(this._selectedValues), a = -1, r = 0; r < s.length; r++) if (s[r].value === n[0]) {
        a = r;
        break;
      }
      var l = (a + 1) % s.length;
      l === s.length && (l = 0), this._selectedValues.clear(), e = s[l], this._selectedValues.add(e.value);
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, i, true), _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, e.value, true);
  }
}
function _handleKeydown(t) {
  switch (t.key || t.keyCode) {
    case "Enter":
    case 13:
      t.preventDefault(), _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, t);
      break;
    case "Escape":
    case 27:
    case "Tab":
    case 9:
      _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
      break;
    case "ArrowDown":
    case 40:
      t.preventDefault(), _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      t.preventDefault(), _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "up");
  }
}
function _renderOptions(t, e) {
  if (t = t || "", this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, s = this._items;
    t && (s = s.filter(function(e2) {
      return null !== e2 && -1 !== e2.text.toLowerCase().indexOf(t);
    }));
    for (var n = document.createDocumentFragment(), a = 0; a < s.length; a++) {
      var r = s[a];
      if (r) {
        var o = document.createElement("div");
        o.className += " selectbox-option", this._selectedValues.has(r.value) && (o.className += " selectbox-option-selected checkbox--checked", i = o), o.setAttribute("data-value", r.value);
        var l = document.createElement("label");
        if (l.className += " selectbox-option-text", l.textContent = r.text, this._options.multiple) {
          o.className += " selectbox-option-checkbox";
          var c = document.createElement("input");
          c.type = "checkbox", c.id = "checkbox-" + r.value, c.className += " selectbox-checkbox", c.checked = this._selectedValues.has(r.value), o.appendChild(c);
          var h = document.createElement("span");
          h.className = "checkbox-visual", h.setAttribute("aria-hidden", "true");
          var d = "http://www.w3.org/2000/svg", u = document.createElementNS(d, "svg");
          u.setAttribute("viewBox", "0 0 10 8"), u.setAttribute("class", "checkbox-checkmark");
          var _ = document.createElementNS(d, "path");
          _.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), _.setAttribute("fill", "none"), _.setAttribute("stroke", "currentColor"), _.setAttribute("stroke-width", "2"), u.appendChild(_), h.appendChild(u), o.appendChild(h);
        }
        o.appendChild(l), n.appendChild(o);
      } else {
        var p = document.createElement("hr");
        p.className += " selectbox-option-divider", n.appendChild(p);
      }
    }
    if (this._customItems.length) {
      var m = document.createElement("hr");
      m.className += " selectbox-option-divider", n.appendChild(m);
    }
    for (a = 0; a < this._customItems.length; a++) {
      var b = this._customItems[a], v = document.createElement("label");
      v.className += " selectbox-custom-option", v.setAttribute("data-value", b.value), v.setAttribute("for", b.value);
      var f = document.createElement("span");
      f.className += " selectbox-option-text", f.textContent = b.text, v.appendChild(f), n.appendChild(v);
    }
    if (this._optionsContainer.appendChild(n), e && this.isOpen && this._optionsContainer && i) try {
      i.scrollIntoView && i.scrollIntoView({ block: "nearest" });
    } catch (t2) {
      console.error(t2);
    }
  }
}
function _handleDropdownClick(t) {
  var e = t.target || t.srcElement;
  if (e && e instanceof HTMLElement) {
    for (var i = null, s = e.className.split(" "), n = false, a = 0; a < s.length; a++) {
      if ("selectbox-option" === s[a]) {
        n = true;
        break;
      }
      if ("selectbox-custom-option" === s[a]) {
        var r = e.getAttribute("data-value");
        if (r) return t.stopPropagation(), _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, r), void _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        break;
      }
    }
    if (n) i = e;
    else if (e.parentNode && e.parentNode instanceof HTMLElement) {
      var o = e.parentNode.className.split(" "), l = false;
      for (a = 0; a < o.length; a++) {
        if ("selectbox-option" === o[a]) {
          l = true;
          break;
        }
        if ("selectbox-custom-option" === o[a]) {
          var c = e.parentNode.getAttribute("data-value");
          if (c) return t.stopPropagation(), _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, c), void _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
          break;
        }
      }
      l && (i = e.parentNode);
    }
    if (i instanceof HTMLDivElement) {
      var h = i.getAttribute("data-value");
      if (null !== h) {
        var d = true;
        this._options.multiple ? this._selectedValues.has(h) ? (this.unselectItems(h, true), d = false) : this.selectItems(h, true) : (this.selectItems(h, true), _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this)), _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, h, d);
      }
    }
  }
}
function _updateSelectedText() {
  if (0 !== this._selectedValues.size) if (this._options.multiple) {
    for (var t = [], e = 0; e < this._items.length; e++) {
      (s = this._items[e]) && this._selectedValues.has(s.value) && t.push(s);
    }
    0 === t.length ? this._selectedText.textContent = this._options.placeholder : 1 === t.length ? this._selectedText.textContent = t[0].text : this._selectedText.textContent = t.length + " items selected";
  } else {
    var i = null;
    for (e = 0; e < this._items.length; e++) {
      var s;
      if ((s = this._items[e]) && this._selectedValues.has(s.value)) {
        i = s;
        break;
      }
    }
    this._selectedText.textContent = i ? i.text : this._options.placeholder;
  }
  else this._selectedText.textContent = this._options.placeholder;
}
function _triggerChange(t, e) {
  for (var i = Array.from(this._selectedValues), s = [], n = 0; n < this._items.length; n++) {
    var a = this._items[n];
    a && this._selectedValues.has(a.value) && s.push(a);
  }
  var r = { values: i, items: s, current: t, enabled: e };
  this._subscribers.forEach(function(t2) {
    t2({ type: "selectbox:change", detail: r });
  });
}
function _triggerCustomChange(t) {
  var e = { values: [], current: t, enabled: false };
  this._subscribers.forEach(function(t2) {
    t2({ type: "selectbox:custom", detail: e });
  });
}
function _extractOptions(t) {
  var e = { values: Array.from(t.options).map((t2) => [t2.value, t2.text]) }, i = t.value;
  return i && (e.selectedValue = i), e;
}
var _instances = { _: /* @__PURE__ */ new Set() }, _container = /* @__PURE__ */ new WeakMap(), _Loader_brand = /* @__PURE__ */ new WeakSet();
class Loader {
  constructor(t, e) {
    _classPrivateMethodInitSpec(this, _Loader_brand), _classPrivateFieldInitSpec(this, _container, void 0);
    var i = document.getElementById(t);
    if (i instanceof HTMLElement == false) throw new Error("Invalid container");
    _classPrivateFieldSet2(_container, this, i), _assertClassBrand(_Loader_brand, this, _createDOM).call(this, e);
  }
  show() {
    var t;
    null === (t = _classPrivateFieldGet2(_container, this)) || void 0 === t || t.classList.remove("hidden");
  }
  hide() {
    var t;
    null === (t = _classPrivateFieldGet2(_container, this)) || void 0 === t || t.classList.add("hidden");
  }
  static show() {
    var t;
    null === (t = _assertClassBrand(Loader, this, _mainLoaderContainer)._) || void 0 === t || t.classList.remove("hidden");
  }
  static hide() {
    var t;
    null === (t = _assertClassBrand(Loader, this, _mainLoaderContainer)._) || void 0 === t || t.classList.add("hidden");
  }
}
function _createDOM(t) {
  _classPrivateFieldGet2(_container, this).classList.add("loader-container");
  var e = "http://www.w3.org/2000/svg", i = document.createElementNS(e, "svg");
  i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
  var s = document.createElementNS(e, "circle");
  s.setAttribute("cx", "10"), s.setAttribute("cy", "10"), s.setAttribute("fill", "none"), s.setAttribute("stroke", "currentColor"), s.setAttribute("stroke-width", "1.5"), s.setAttribute("r", "7.25"), s.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(s), _classPrivateFieldGet2(_container, this).appendChild(i);
  var n = document.createElement("div");
  n.classList.add("loader-title"), n.classList.add("i18n"), n.innerText = t, _classPrivateFieldGet2(_container, this).appendChild(n);
}
var _mainLoaderContainer = { _: document.getElementById("loader") };
function translate(t) {
  try {
    return window.Asc.plugin.tr(t);
  } catch (e) {
    return console.error(e), t;
  }
}
class CslHtmlParser {
  static parseHtmlFormatting(t) {
    for (var e = { text: "", formatting: [] }, i = [], s = 0, n = 0; n < t.length; ) if ("<" === t[n] && n + 1 < t.length) {
      var a = "/" === t[n + 1], r = t.indexOf(">", n);
      if (-1 === r) {
        e.text += t[n], n++;
        continue;
      }
      var o = t.substring(a ? n + 2 : n + 1, r).trim(), l = o.split(" ");
      if (0 === l.length) {
        e.text += t[n], n++;
        continue;
      }
      var c = l[0].toLowerCase();
      if ("br" === c) {
        e.text += "\n", n = r + 1;
        continue;
      }
      var h = c;
      if (-1 !== o.indexOf("font-variant:small-caps") ? h = "sc" : -1 !== o.indexOf("text-decoration:underline") && (h = "u"), _assertClassBrand(CslHtmlParser, this, _allowedTags)._.has(c)) if (a) {
        for (var d = i.length - 1; d >= 0; d--) if (i[d].tag === c) {
          var { start: u, styleTag: _ } = i.splice(d, 1)[0];
          e.formatting.push({ type: _, start: u, end: s });
          break;
        }
      } else i.push({ tag: c, start: s, styleTag: h });
      n = r + 1;
    } else e.text += t[n], s++, n++;
    return e.formatting.sort((t2, e2) => t2.start === e2.start ? e2.end - t2.end : t2.start - e2.start), e;
  }
}
var _allowedTags = { _: /* @__PURE__ */ new Set(["i", "u", "b", "sc", "sup", "sub", "em", "div", "span"]) };
class CslDocFormatter {
  static formatAfterInsert(t) {
    return new Promise(function(e) {
      Asc.scope.formatting = t, Asc.plugin.callCommand(function() {
        for (var t2 = Api.GetDocument().GetCurrentRun(), e2 = Asc.scope.formatting.length - 1; e2 >= 0; e2--) {
          var i = Asc.scope.formatting[e2], s = t2.GetRange(i.start, i.end);
          s && ("sup" === i.type ? s.SetVertAlign("superscript") : "sub" === i.type ? s.SetVertAlign("subscript") : "sc" === i.type ? s.SetSmallCaps(true) : "u" === i.type ? s.SetUnderline(true) : "b" === i.type ? s.SetBold(true) : "i" !== i.type && "em" !== i.type || s.SetItalic(true));
        }
      }, false, true, e);
    });
  }
  static formatAfterUpdate(t, e) {
    return Asc.scope.fieldId = t, Asc.scope.text = e.text, Asc.scope.formatting = e.formatting, new Promise(function(t2) {
      Asc.plugin.callCommand(function() {
        var t3 = Api.GetDocument(), e2 = t3.GetRangeBySelect();
        if (e2) {
          if (1 === Asc.scope.formatting.length) {
            var i = Asc.scope.formatting[0];
            if (0 === i.start && i.end === e2.GetText().length) return void o(e2, i.type);
          }
          t3.MoveCursorToPos(e2.GetEndPos() - Asc.scope.text.length);
          for (var s = t3.GetCurrentRun(), n = Asc.scope.formatting.length - 1; n >= 0; n--) {
            var a = Asc.scope.formatting[n], r = s.GetRange(a.start, a.end);
            r && o(r, a.type);
          }
        }
        function o(t4, e3) {
          "sup" === e3 ? t4.SetVertAlign("superscript") : "sub" === e3 ? t4.SetVertAlign("subscript") : "sc" === e3 ? t4.SetSmallCaps(true) : "u" === e3 ? t4.SetUnderline(true) : "b" === e3 ? t4.SetBold(true) : "i" !== e3 && "em" !== e3 || t4.SetItalic(true);
        }
      }, false, true, t2);
    });
  }
}
var _citPrefixOld = /* @__PURE__ */ new WeakMap(), _citPrefix = /* @__PURE__ */ new WeakMap(), _bibPrefixOld = /* @__PURE__ */ new WeakMap(), _citSuffix = /* @__PURE__ */ new WeakMap(), _bibPrefix = /* @__PURE__ */ new WeakMap(), _bibSuffix = /* @__PURE__ */ new WeakMap(), _CitationDocService_brand = /* @__PURE__ */ new WeakSet();
class CitationDocService {
  constructor(t, e, i, s) {
    _classPrivateMethodInitSpec(this, _CitationDocService_brand), _classPrivateFieldInitSpec(this, _citPrefixOld, void 0), _classPrivateFieldInitSpec(this, _citPrefix, void 0), _classPrivateFieldInitSpec(this, _bibPrefixOld, void 0), _classPrivateFieldInitSpec(this, _citSuffix, void 0), _classPrivateFieldInitSpec(this, _bibPrefix, void 0), _classPrivateFieldInitSpec(this, _bibSuffix, void 0), _classPrivateFieldSet2(_citPrefixOld, this, "ZOTERO_CITATION"), _classPrivateFieldSet2(_bibPrefixOld, this, "ZOTERO_BIBLIOGRAPHY"), _classPrivateFieldSet2(_citPrefix, this, t), _classPrivateFieldSet2(_citSuffix, this, e), _classPrivateFieldSet2(_bibPrefix, this, i), _classPrivateFieldSet2(_bibSuffix, this, s);
  }
  addBibliography(t, e) {
    var i = this;
    return _asyncToGenerator(function* () {
      var s = window.Asc.scope.editorVersion;
      if (s && s < 9004e3) {
        var n = CslHtmlParser.parseHtmlFormatting(t), a = "", r = { FieldId: a, Value: _classPrivateFieldGet2(_bibPrefix, i) + e + _classPrivateFieldGet2(_bibSuffix, i), Content: n.text };
        return _assertClassBrand(_CitationDocService_brand, i, _addAddinField).call(i, r).then(() => i.getCurrentField()).then((t2) => {
          if (a = (null == t2 ? void 0 : t2.FieldId) || "", n.formatting.length) return CslDocFormatter.formatAfterInsert(n.formatting);
        }).then(() => a);
      }
      var o = { FieldId: "", Value: _classPrivateFieldGet2(_bibPrefix, i) + e + _classPrivateFieldGet2(_bibSuffix, i), Content: " " };
      return yield _assertClassBrand(_CitationDocService_brand, i, _pasteBibliographyWithHtml).call(i, o, t);
    })();
  }
  addCitation(t, e, i) {
    var s = this;
    return _asyncToGenerator(function* () {
      var n = CslHtmlParser.parseHtmlFormatting(t), a = { FieldId: "", Value: _classPrivateFieldGet2(_citPrefix, s) + " " + _classPrivateFieldGet2(_citSuffix, s) + e, Content: n.text }, r = !(!i || -1 === ["footnotes", "endnotes"].indexOf(i));
      return r && (yield _assertClassBrand(_CitationDocService_brand, s, _addNote).call(s, i)), yield _assertClassBrand(_CitationDocService_brand, s, _addAddinField).call(s, a), n.formatting.length ? (yield CslDocFormatter.formatAfterInsert(n.formatting), r && (yield _assertClassBrand(_CitationDocService_brand, s, _selectFieldReference).call(s)), r) : r;
    })();
  }
  getCurrentField() {
    return new Promise(function(t, e) {
      window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, t);
    });
  }
  getAddinZoteroFields() {
    var t = this;
    return new Promise(function(e, i) {
      _assertClassBrand(_CitationDocService_brand, t, _getAllAddinFields).call(t).then(function(s) {
        try {
          s.length && (s = s.filter(function(e2) {
            return -1 !== e2.Value.indexOf(_classPrivateFieldGet2(_citPrefix, t)) || -1 !== e2.Value.indexOf(_classPrivateFieldGet2(_bibPrefix, t)) || -1 !== e2.Value.indexOf(_classPrivateFieldGet2(_citPrefixOld, t)) || -1 !== e2.Value.indexOf(_classPrivateFieldGet2(_bibPrefixOld, t));
          }));
        } catch (t2) {
          i(t2);
        }
        e(s);
      });
    });
  }
  saveAsText() {
    return this.getAddinZoteroFields().then(function(t) {
      if (!t.length) return window.Asc.plugin.executeCommand("close", ""), false;
      var e = t.map(function(t2) {
        return new Promise(function(e2) {
          window.Asc.plugin.executeMethod("RemoveFieldWrapper", [t2.FieldId], e2);
        });
      });
      return Promise.all(e).then(() => true).catch((t2) => (console.error(t2), false));
    });
  }
  updateAddinFields(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      var i = t.map((t2) => t2.FieldId), s = window.Asc.scope.editorVersion, n = t.filter((t2) => 0 === t2.Value.indexOf(_classPrivateFieldGet2(_bibPrefix, e)));
      if (n.length && s && s >= 9004e3) {
        t = t.filter((t2) => 0 !== t2.Value.indexOf(_classPrivateFieldGet2(_bibPrefix, e)));
        var a = n[0];
        yield _assertClassBrand(_CitationDocService_brand, e, _selectField).call(e, a.FieldId);
        var r = a.Content || "";
        a.Content = " ", yield _assertClassBrand(_CitationDocService_brand, e, _removeSelectedContent).call(e), yield _assertClassBrand(_CitationDocService_brand, e, _pasteBibliographyWithHtml).call(e, a, r);
      }
      var o = _assertClassBrand(_CitationDocService_brand, e, _makeFormattingPositions).call(e, t);
      if (yield new Promise((e2) => {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [t], e2);
      }), !o.size) return i;
      for (var [l, c] of o) {
        (yield _assertClassBrand(_CitationDocService_brand, e, _selectField).call(e, l)) && (yield CslDocFormatter.formatAfterUpdate(l, c));
      }
      return i;
    })();
  }
  convertNotesToText(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      for (var i = _assertClassBrand(_CitationDocService_brand, e, _makeFormattingPositions).call(e, t), s = 0; s < t.length; s++) {
        var n = t[s];
        if (n.FieldId) {
          if (yield _assertClassBrand(_CitationDocService_brand, e, _selectField).call(e, n.FieldId)) {
            if (yield _assertClassBrand(_CitationDocService_brand, e, _selectFieldReference).call(e)) {
              yield _assertClassBrand(_CitationDocService_brand, e, _removeSuperscript).call(e), yield _assertClassBrand(_CitationDocService_brand, e, _removeSelectedContent).call(e), yield _assertClassBrand(_CitationDocService_brand, e, _addAddinField).call(e, n);
              var a = i.get(n.FieldId);
              a && (yield CslDocFormatter.formatAfterInsert(a.formatting));
            }
          }
        } else console.error("Field id is not defined");
      }
    })();
  }
  convertTextToNotes(t, e) {
    var i = this;
    return _asyncToGenerator(function* () {
      for (var s = _assertClassBrand(_CitationDocService_brand, i, _makeFormattingPositions).call(i, t), n = 0; n < t.length; n++) {
        var a = t[n];
        if (a.FieldId) {
          if (yield _assertClassBrand(_CitationDocService_brand, i, _selectField).call(i, a.FieldId)) {
            yield _assertClassBrand(_CitationDocService_brand, i, _removeSelectedContent).call(i), yield _assertClassBrand(_CitationDocService_brand, i, _addNote).call(i, e), yield _assertClassBrand(_CitationDocService_brand, i, _addAddinField).call(i, a);
            var r = s.get(a.FieldId);
            r && (yield CslDocFormatter.formatAfterInsert(r.formatting));
          }
        }
      }
    })();
  }
  convertNotesStyle(t, e) {
    var i = this;
    return _asyncToGenerator(function* () {
      for (var s = [], n = _assertClassBrand(_CitationDocService_brand, i, _makeFormattingPositions).call(i, t), a = 0; a < t.length; a++) {
        var r = t[a];
        if (r.FieldId) if (r.Content) {
          if (yield _assertClassBrand(_CitationDocService_brand, i, _selectField).call(i, r.FieldId)) {
            if (yield _assertClassBrand(_CitationDocService_brand, i, _selectFieldReference).call(i)) {
              yield _assertClassBrand(_CitationDocService_brand, i, _removeSuperscript).call(i), yield _assertClassBrand(_CitationDocService_brand, i, _removeSelectedContent).call(i), yield _assertClassBrand(_CitationDocService_brand, i, _addNote).call(i, e), yield _assertClassBrand(_CitationDocService_brand, i, _addAddinField).call(i, r);
              var o = n.get(r.FieldId);
              o && (yield CslDocFormatter.formatAfterInsert(o.formatting));
            }
          }
        } else s.push(r);
      }
      s.length && (yield new Promise(function(t2) {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [s], t2);
      }));
    })();
  }
  moveCursorToField(t, e) {
    return _asyncToGenerator(function* () {
      return new Promise((i) => {
        e = null == e || e, window.Asc.plugin.executeMethod("MoveCursorToField", [t, e], i);
      });
    })();
  }
  moveCursorOutsideField(t, e) {
    return _asyncToGenerator(function* () {
      return new Promise((i) => {
        e = null != e && e, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [t, e], i);
      });
    })();
  }
  moveCursorRight() {
    return _asyncToGenerator(function* () {
      return new Promise((t) => {
        Asc.plugin.callCommand(() => {
          Api.GetDocument().MoveCursorRight(1, false);
        }, false, true, t);
      });
    })();
  }
}
function _addAddinField(t) {
  return new Promise(function(e) {
    window.Asc.plugin.executeMethod("AddAddinField", [t], e);
  });
}
function _addNote(t) {
  return Asc.scope.notesStyle = t, new Promise((t2) => {
    Asc.plugin.callCommand(() => {
      var t3 = Api.GetDocument();
      "footnotes" === Asc.scope.notesStyle ? t3.AddFootnote() : "endnotes" === Asc.scope.notesStyle && t3.AddEndnote();
    }, false, false, t2);
  });
}
function _getAllAddinFields() {
  return new Promise(function(t, e) {
    window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, t);
  });
}
function _makeFormattingPositions(t) {
  var e = /* @__PURE__ */ new Map();
  return t.forEach(function(t2) {
    if (t2.Content) {
      var i = CslHtmlParser.parseHtmlFormatting(t2.Content);
      t2.Content = i.text, i.formatting.length && t2.FieldId && e.set(t2.FieldId, i);
    }
  }), e;
}
function _pasteHtml(t) {
  return new Promise(function(e) {
    window.Asc.plugin.executeMethod("PasteHtml", [t], e);
  });
}
function _removeSelectedContent() {
  return new Promise((t) => {
    window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, t);
  });
}
function _selectField(t) {
  return new Promise(function(e) {
    window.Asc.plugin.executeMethod("SelectAddinField", [t], () => e(true));
  });
}
function _selectFieldReference() {
  return new Promise(function(t) {
    Asc.plugin.callCommand(() => {
      var t2 = Api.GetDocument().GetCurrentFootEndnote();
      if (t2) t2.SelectNoteReference();
    }, false, true, () => t(true));
  });
}
function _removeSuperscript() {
  return new Promise(function(t) {
    Asc.plugin.callCommand(() => {
      var t2 = Api.GetDocument().GetRangeBySelect();
      t2 && t2.SetVertAlign("baseline");
    }, false, false, t);
  });
}
function _pasteBibliographyWithHtml(t, e) {
  return _pasteBibliographyWithHtml2.apply(this, arguments);
}
function _pasteBibliographyWithHtml2() {
  return (_pasteBibliographyWithHtml2 = _asyncToGenerator(function* (t, e) {
    if (yield _assertClassBrand(_CitationDocService_brand, this, _addAddinField).call(this, t), yield new Promise((t2) => {
      Asc.plugin.callCommand(() => {
        Api.GetDocument().MoveCursorLeft(1, true);
      }, false, true, t2);
    }), !Asc.scope.bibStyle) throw "Bibliography style is not defined";
    var i = new DOMParser().parseFromString(e, "text/html"), s = i.querySelectorAll(".csl-entry"), n = new Array(s.length);
    s.forEach((t2, e2) => {
      var i2 = t2.querySelector(".csl-left-margin"), s2 = t2.querySelector(".csl-right-inline");
      null == s2 || s2.replaceWith(...s2.childNodes), i2 && (n[e2] = i2.textContent.trim(), i2.remove());
    }), e = i.body.innerHTML, yield _assertClassBrand(_CitationDocService_brand, this, _pasteHtml).call(this, e);
    var a = yield this.getCurrentField();
    return a ? (yield _assertClassBrand(_CitationDocService_brand, this, _selectField).call(this, a.FieldId), yield new Promise((t2) => {
      Asc.scope.numbers = n, Asc.plugin.callCommand(() => {
        var t3 = Api.GetDocument().GetRangeBySelect();
        if (t3) {
          var e2 = Asc.scope.bibStyle;
          t3.GetAllParagraphs().forEach((t4, i2) => {
            if ("" !== t4.GetText().trim()) if ("number" == typeof e2.linespacing && t4.SetSpacingLine(240 * e2.linespacing, "exact"), "number" == typeof e2.entryspacing && t4.SetSpacingAfter(240 * e2.entryspacing), e2["second-field-align"]) {
              var s2 = Api.CreateRun();
              s2.AddText(Asc.scope.numbers[i2]), s2.AddTabStop();
              var n2 = 0 === i2 ? 4 : 0;
              t4.AddElement(s2, n2), t4.SetIndLeft(120 * e2.maxoffset), t4.SetIndFirstLine(-120 * e2.maxoffset);
            } else e2.hangingindent && (t4.SetIndLeft(720), t4.SetIndFirstLine(-720));
          });
        }
      }, false, false, t2);
    }), Asc.scope.bibStyle = null, a.FieldId) : "";
  })).apply(this, arguments);
}
var _items = /* @__PURE__ */ new WeakMap(), _itemIds = /* @__PURE__ */ new WeakMap(), _citations = /* @__PURE__ */ new WeakMap(), _CSLCitationStorage_brand = /* @__PURE__ */ new WeakSet();
class CSLCitationStorage {
  constructor() {
    _classPrivateMethodInitSpec(this, _CSLCitationStorage_brand), _classPrivateFieldInitSpec(this, _items, void 0), _classPrivateFieldInitSpec(this, _itemIds, void 0), _classPrivateFieldInitSpec(this, _citations, void 0), _classPrivateFieldSet2(_items, this, []), _classPrivateFieldSet2(_itemIds, this, []), _classPrivateFieldSet2(_citations, this, []), this.size = 0;
  }
  getItem(t) {
    t = t.toString();
    var e = _classPrivateFieldGet2(_itemIds, this).indexOf(t);
    return e >= 0 ? _classPrivateFieldGet2(_items, this)[e] : null;
  }
  getItemIndex(t) {
    return t = t.toString(), _classPrivateFieldGet2(_itemIds, this).indexOf(t);
  }
  clear() {
    return _classPrivateFieldSet2(_items, this, []), _classPrivateFieldSet2(_citations, this, []), _classPrivateFieldSet2(_itemIds, this, []), this.size = 0, this;
  }
  deleteItem(t) {
    t = t.toString();
    var e = _classPrivateFieldGet2(_itemIds, this).indexOf(t);
    return e >= 0 && (_classPrivateFieldGet2(_items, this).splice(e, 1), _classPrivateFieldGet2(_itemIds, this).splice(e, 1), this.size--), this;
  }
  forEachItem(t) {
    for (var e = 0; e < this.size; e++) t(_classPrivateFieldGet2(_items, this)[e], _classPrivateFieldGet2(_itemIds, this)[e], this);
  }
  hasItem(t) {
    return t = t.toString(), _classPrivateFieldGet2(_itemIds, this).indexOf(t) >= 0;
  }
  addCslCitation(t) {
    return _classPrivateFieldGet2(_citations, this).push(t), t.setNoteIndex(_classPrivateFieldGet2(_citations, this).length), t.getCitationItems().forEach((t2) => {
      _assertClassBrand(_CSLCitationStorage_brand, this, _setItem).call(this, t2.id, t2);
    }), this;
  }
  getAllCitationsInJson() {
    return _classPrivateFieldGet2(_citations, this).map((t) => t.toJSON());
  }
  getCitation(t) {
    return _classPrivateFieldGet2(_citations, this).find((e) => e.citationID === t);
  }
  getCitationIndex(t) {
    return _classPrivateFieldGet2(_citations, this).findIndex((e) => e.citationID === t);
  }
  getCitationsPre(t) {
    var e = [];
    return _classPrivateFieldGet2(_citations, this).find((i, s) => i.citationID === t || (e.push([i.citationID, s + 1]), false)), e;
  }
  getCitationsPost(t) {
    for (var e = [], i = this.getCitationIndex(t) + 1; i < _classPrivateFieldGet2(_citations, this).length; i++) {
      var s = _classPrivateFieldGet2(_citations, this)[i];
      e.push([s.citationID, i + 1]);
    }
    return e;
  }
}
function _setItem(t, e) {
  t = t.toString();
  var i = _classPrivateFieldGet2(_itemIds, this).indexOf(t);
  return i >= 0 ? (_classPrivateFieldGet2(_items, this)[i] = e, this) : (_classPrivateFieldGet2(_items, this).push(e), _classPrivateFieldGet2(_itemIds, this).push(t), this.size++, this);
}
function CitationItemData(t) {
  if ("string" != typeof t && "number" != typeof t) throw new Error("CitationItemData: id is required");
  this._id = t, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
function CitationItem(t) {
  if ("string" != typeof t && "number" != typeof t) throw new Error("CitationItem: id is required");
  this.id = t, this._itemData = new CitationItemData(t), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
CitationItemData.prototype._addCustomProperty = function(t, e) {
  return this._custom[t] = e, this;
}, CitationItemData.prototype.getCustomProperty = function(t) {
  return Object.hasOwnProperty.call(this._custom, t) ? this._custom[t] : null;
}, CitationItemData.prototype.fillFromObject = function(t) {
  if (Object.hasOwnProperty.call(t, "type") && (this._type = t.type), Object.hasOwnProperty.call(t, "categories") && (this._categories = t.categories), Object.hasOwnProperty.call(t, "citation-key") && (this._citationKey = t["citation-key"]), Object.hasOwnProperty.call(t, "language") && (this._language = t.language), Object.hasOwnProperty.call(t, "journalAbbreviation") && (this._journalAbbreviation = t.journalAbbreviation), Object.hasOwnProperty.call(t, "shortTitle") && (this._shortTitle = t.shortTitle), Object.hasOwnProperty.call(t, "author") && (this._author = t.author), Object.hasOwnProperty.call(t, "chair") && (this._chair = t.chair), Object.hasOwnProperty.call(t, "collection-editor") && (this._collectionEditor = t["collection-editor"]), Object.hasOwnProperty.call(t, "compiler") && (this._compiler = t.compiler), Object.hasOwnProperty.call(t, "composer") && (this._composer = t.composer), Object.hasOwnProperty.call(t, "container-author") && (this._containerAuthor = t["container-author"]), Object.hasOwnProperty.call(t, "contributor") && (this._contributor = t.contributor), Object.hasOwnProperty.call(t, "curator") && (this._curator = t.curator), Object.hasOwnProperty.call(t, "director") && (this._director = t.director), Object.hasOwnProperty.call(t, "editorial-director") && (this._editorialDirector = t["editorial-director"]), Object.hasOwnProperty.call(t, "editor") && (this._editor = t.editor), Object.hasOwnProperty.call(t, "executive-producer") && (this._executiveProducer = t["executive-producer"]), Object.hasOwnProperty.call(t, "guest") && (this._guest = t.guest), Object.hasOwnProperty.call(t, "host") && (this._host = t.host), Object.hasOwnProperty.call(t, "illustrator") && (this._illustrator = t.illustrator), Object.hasOwnProperty.call(t, "narrator") && (this._narrator = t.narrator), Object.hasOwnProperty.call(t, "organizer") && (this._organizer = t.organizer), Object.hasOwnProperty.call(t, "original-author") && (this._originalAuthor = t["original-author"]), Object.hasOwnProperty.call(t, "performer") && (this._performer = t.performer), Object.hasOwnProperty.call(t, "producer") && (this._producer = t.producer), Object.hasOwnProperty.call(t, "recipient") && (this._recipient = t.recipient), Object.hasOwnProperty.call(t, "reviewed-author") && (this._reviewedAuthor = t["reviewed-author"]), Object.hasOwnProperty.call(t, "script-writer") && (this._scriptWriter = t["script-writer"]), Object.hasOwnProperty.call(t, "series-creator") && (this._seriesCreator = t["series-creator"]), Object.hasOwnProperty.call(t, "translator") && (this._translator = t.translator), Object.hasOwnProperty.call(t, "accessed") && (this._accessed = t.accessed), Object.hasOwnProperty.call(t, "container") && (this._container = t.container), Object.hasOwnProperty.call(t, "event-date") && (this._eventDate = t["event-date"]), Object.hasOwnProperty.call(t, "issued") && (this._issued = t.issued), Object.hasOwnProperty.call(t, "original-date") && (this._originalDate = t["original-date"]), Object.hasOwnProperty.call(t, "submitted") && (this._submitted = t.submitted), Object.hasOwnProperty.call(t, "abstract") && (this._abstract = t.abstract), Object.hasOwnProperty.call(t, "annote") && (this._annote = t.annote), Object.hasOwnProperty.call(t, "archive") && (this._archive = t.archive), Object.hasOwnProperty.call(t, "archive_collection") && (this._archiveCollection = t.archive_collection), Object.hasOwnProperty.call(t, "archive_location") && (this._archiveLocation = t.archive_location), Object.hasOwnProperty.call(t, "archive-place") && (this._archivePlace = t["archive-place"]), Object.hasOwnProperty.call(t, "authority") && (this._authority = t.authority), Object.hasOwnProperty.call(t, "call-number") && (this._callNumber = t["call-number"]), Object.hasOwnProperty.call(t, "chapter-number") && (this._chapterNumber = t["chapter-number"]), Object.hasOwnProperty.call(t, "citation-number") && (this._citationNumber = t["citation-number"]), Object.hasOwnProperty.call(t, "citation-label") && (this._citationLabel = t["citation-label"]), Object.hasOwnProperty.call(t, "collection-number") && (this._collectionNumber = t["collection-number"]), Object.hasOwnProperty.call(t, "collection-title") && (this._collectionTitle = t["collection-title"]), Object.hasOwnProperty.call(t, "container-title") && (this._containerTitle = t["container-title"]), Object.hasOwnProperty.call(t, "container-title-short") && (this._containerTitleShort = t["container-title-short"]), Object.hasOwnProperty.call(t, "dimensions") && (this._dimensions = t.dimensions), Object.hasOwnProperty.call(t, "DOI") && (this._DOI = t.DOI), Object.hasOwnProperty.call(t, "edition") && (this._edition = t.edition), Object.hasOwnProperty.call(t, "event") && (this._event = t.event), Object.hasOwnProperty.call(t, "event-title") && (this._eventTitle = t["event-title"]), Object.hasOwnProperty.call(t, "event-place") && (this._eventPlace = t["event-place"]), Object.hasOwnProperty.call(t, "first-reference-note-number") && (this._firstReferenceNoteNumber = t["first-reference-note-number"]), Object.hasOwnProperty.call(t, "genre") && (this._genre = t.genre), Object.hasOwnProperty.call(t, "ISBN") && (this._ISBN = t.ISBN), Object.hasOwnProperty.call(t, "ISSN") && (this._ISSN = t.ISSN), Object.hasOwnProperty.call(t, "issue") && (this._issue = t.issue), Object.hasOwnProperty.call(t, "jurisdiction") && (this._jurisdiction = t.jurisdiction), Object.hasOwnProperty.call(t, "keyword") && (this._keyword = t.keyword), Object.hasOwnProperty.call(t, "locator") && (this._locator = t.locator), Object.hasOwnProperty.call(t, "medium") && (this._medium = t.medium), Object.hasOwnProperty.call(t, "note") && (this._note = t.note), Object.hasOwnProperty.call(t, "number") && (this._number = t.number), Object.hasOwnProperty.call(t, "number-of-pages") && (this._numberOfPages = t["number-of-pages"]), Object.hasOwnProperty.call(t, "number-of-volumes") && (this._numberOfVolumes = t["number-of-volumes"]), Object.hasOwnProperty.call(t, "original-publisher") && (this._originalPublisher = t["original-publisher"]), Object.hasOwnProperty.call(t, "original-publisher-place") && (this._originalPublisherPlace = t["original-publisher-place"]), Object.hasOwnProperty.call(t, "original-title") && (this._originalTitle = t["original-title"]), Object.hasOwnProperty.call(t, "page") && (this._page = t.page), Object.hasOwnProperty.call(t, "page-first") && (this._pageFirst = t["page-first"]), Object.hasOwnProperty.call(t, "part") && (this._part = t.part), Object.hasOwnProperty.call(t, "part-title") && (this._partTitle = t["part-title"]), Object.hasOwnProperty.call(t, "PMCID") && (this._PMCID = t.PMCID), Object.hasOwnProperty.call(t, "PMID") && (this._PMID = t.PMID), Object.hasOwnProperty.call(t, "printing") && (this._printing = t.printing), Object.hasOwnProperty.call(t, "publisher") && (this._publisher = t.publisher), Object.hasOwnProperty.call(t, "publisher-place") && (this._publisherPlace = t["publisher-place"]), Object.hasOwnProperty.call(t, "references") && (this._references = t.references), Object.hasOwnProperty.call(t, "reviewed-genre") && (this._reviewedGenre = t["reviewed-genre"]), Object.hasOwnProperty.call(t, "reviewed-title") && (this._reviewedTitle = t["reviewed-title"]), Object.hasOwnProperty.call(t, "scale") && (this._scale = t.scale), Object.hasOwnProperty.call(t, "section") && (this._section = t.section), Object.hasOwnProperty.call(t, "source") && (this._source = t.source), Object.hasOwnProperty.call(t, "status") && (this._status = t.status), Object.hasOwnProperty.call(t, "title") && (this._title = t.title), Object.hasOwnProperty.call(t, "title-short") && (this._titleShort = t["title-short"]), Object.hasOwnProperty.call(t, "URL") && (this._URL = t.URL), Object.hasOwnProperty.call(t, "version") && (this._version = t.version), Object.hasOwnProperty.call(t, "volume") && (this._volume = t.volume), Object.hasOwnProperty.call(t, "volume-title") && (this._volumeTitle = t["volume-title"]), Object.hasOwnProperty.call(t, "volume-title-short") && (this._volumeTitleShort = t["volume-title-short"]), Object.hasOwnProperty.call(t, "year-suffix") && (this._yearSuffix = t["year-suffix"]), Object.hasOwnProperty.call(t, "custom") && (this._custom = t.custom), Object.hasOwnProperty.call(t, "userID") && this._addCustomProperty("userID", t.userID), Object.hasOwnProperty.call(t, "groupID") && this._addCustomProperty("groupID", t.groupID), Object.hasOwnProperty.call(t, "creators")) {
    var e = this;
    t.creators.forEach(function(t2) {
      var i = {};
      t2.firstName && (i.given = t2.firstName), t2.lastName && (i.family = t2.lastName), e._author.some(function(t3) {
        return (t3.family === i.family || !t3.family && !i.family) && (t3.given === i.given || !t3.given && !i.given);
      }) || e._author.push(i);
    }, this);
  }
  Object.hasOwnProperty.call(t, "libraryCatalog") && (this._source = t.libraryCatalog), Object.hasOwnProperty.call(t, "place") && (this._eventPlace = t.place, this._publisherPlace = t.place), Object.hasOwnProperty.call(t, "numberOfVolumes") && (this._numberOfVolumes = t.numberOfVolumes), Object.hasOwnProperty.call(t, "callNumber") && (this._callNumber = t.callNumber), Object.hasOwnProperty.call(t, "seriesNumber") && (this._collectionNumber = t.seriesNumber), Object.hasOwnProperty.call(t, "series") && (this._collectionTitle = t.series), Object.hasOwnProperty.call(t, "bookTitle") && (this._containerTitle = t.bookTitle), Object.hasOwnProperty.call(t, "extra") && (this._note = t.extra), Object.hasOwnProperty.call(t, "rights") && (this._license = t.rights), Object.hasOwnProperty.call(t, "archiveLocation") && (this._archiveLocation = t.archiveLocation), Object.hasOwnProperty.call(t, "abstractNote") && (this._abstract = t.abstractNote);
}, CitationItemData.prototype.getTitle = function() {
  return this._title;
}, CitationItemData.prototype.getType = function() {
  return this._type;
}, CitationItemData.prototype.setType = function(t) {
  return this._type = t, this;
}, CitationItemData.prototype.setCitationKey = function(t) {
  return this._citationKey = t, this;
}, CitationItemData.prototype.setCategories = function(t) {
  return this._categories = t, this;
}, CitationItemData.prototype.setLanguage = function(t) {
  return this._language = t, this;
}, CitationItemData.prototype.setJournalAbbreviation = function(t) {
  return this._journalAbbreviation = t, this;
}, CitationItemData.prototype.setShortTitle = function(t) {
  return this._shortTitle = t, this;
}, CitationItemData.prototype.setAuthor = function(t) {
  return this._author = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setChair = function(t) {
  return this._chair = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setCollectionEditor = function(t) {
  return this._collectionEditor = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setCompiler = function(t) {
  return this._compiler = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setComposer = function(t) {
  return this._composer = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setContainerAuthor = function(t) {
  return this._containerAuthor = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setContributor = function(t) {
  return this._contributor = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setCurator = function(t) {
  return this._curator = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setDirector = function(t) {
  return this._director = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setEditor = function(t) {
  return this._editor = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setEditorialDirector = function(t) {
  return this._editorialDirector = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setExecutiveProducer = function(t) {
  return this._executiveProducer = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setGuest = function(t) {
  return this._guest = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setHost = function(t) {
  return this._host = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setIllustrator = function(t) {
  return this._illustrator = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setNarrator = function(t) {
  return this._narrator = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setOrganizer = function(t) {
  return this._organizer = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setOriginalAuthor = function(t) {
  return this._originalAuthor = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setPerformer = function(t) {
  return this._performer = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setProducer = function(t) {
  return this._producer = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setRecipient = function(t) {
  return this._recipient = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setReviewedAuthor = function(t) {
  return this._reviewedAuthor = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setScriptwriter = function(t) {
  return this._scriptwriter = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setSeriesCreator = function(t) {
  return this._seriesCreator = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setTranslator = function(t) {
  return this._translator = Array.isArray(t) ? t : [t], this;
}, CitationItemData.prototype.setAccessed = function(t) {
  return this._accessed = t || {}, this;
}, CitationItemData.prototype.setContainer = function(t) {
  return this._container = t || {}, this;
}, CitationItemData.prototype.setEventDate = function(t) {
  return this._eventDate = t || {}, this;
}, CitationItemData.prototype.setIssued = function(t) {
  return this._issued = t || {}, this;
}, CitationItemData.prototype.setOriginalDate = function(t) {
  return this._originalDate = t || {}, this;
}, CitationItemData.prototype.setSubmitted = function(t) {
  return this._submitted = t || {}, this;
}, CitationItemData.prototype.setAbstract = function(t) {
  return this._abstract = t, this;
}, CitationItemData.prototype.setAnnote = function(t) {
  return this._annote = t, this;
}, CitationItemData.prototype.setArchive = function(t) {
  return this._archive = t, this;
}, CitationItemData.prototype.setArchiveCollection = function(t) {
  return this._archiveCollection = t, this;
}, CitationItemData.prototype.setArchiveLocation = function(t) {
  return this._archiveLocation = t, this;
}, CitationItemData.prototype.setArchivePlace = function(t) {
  return this._archivePlace = t, this;
}, CitationItemData.prototype.setAuthority = function(t) {
  return this._authority = t, this;
}, CitationItemData.prototype.setCallNumber = function(t) {
  return this._callNumber = t, this;
}, CitationItemData.prototype.setChapterNumber = function(t) {
  return this._chapterNumber = t, this;
}, CitationItemData.prototype.setCitationNumber = function(t) {
  return this._citationNumber = t, this;
}, CitationItemData.prototype.setCitationLabel = function(t) {
  return this._citationLabel = t, this;
}, CitationItemData.prototype.setCollectionNumber = function(t) {
  return this._collectionNumber = t, this;
}, CitationItemData.prototype.setCollectionTitle = function(t) {
  return this._collectionTitle = t, this;
}, CitationItemData.prototype.setContainerTitle = function(t) {
  return this._containerTitle = t, this;
}, CitationItemData.prototype.setContainerTitleShort = function(t) {
  return this._containerTitleShort = t, this;
}, CitationItemData.prototype.setDimensions = function(t) {
  return this._dimensions = t, this;
}, CitationItemData.prototype.setDOI = function(t) {
  return this._DOI = t, this;
}, CitationItemData.prototype.setEdition = function(t) {
  return this._edition = t, this;
}, CitationItemData.prototype.setEvent = function(t) {
  return this._event = t, this;
}, CitationItemData.prototype.setEventTitle = function(t) {
  return this._eventTitle = t, this;
}, CitationItemData.prototype.setEventPlace = function(t) {
  return this._eventPlace = t, this;
}, CitationItemData.prototype.setFirstReferenceNoteNumber = function(t) {
  return this._firstReferenceNoteNumber = t, this;
}, CitationItemData.prototype.setGenre = function(t) {
  return this._genre = t, this;
}, CitationItemData.prototype.setISBN = function(t) {
  return this._ISBN = t, this;
}, CitationItemData.prototype.setISSN = function(t) {
  return this._ISSN = t, this;
}, CitationItemData.prototype.setIssue = function(t) {
  return this._issue = t, this;
}, CitationItemData.prototype.setJurisdiction = function(t) {
  return this._jurisdiction = t, this;
}, CitationItemData.prototype.setKeyword = function(t) {
  return this._keyword = t, this;
}, CitationItemData.prototype.setLocator = function(t) {
  return this._locator = t, this;
}, CitationItemData.prototype.setMedium = function(t) {
  return this._medium = t, this;
}, CitationItemData.prototype.setNote = function(t) {
  return this._note = t, this;
}, CitationItemData.prototype.setNumber = function(t) {
  return this._number = t, this;
}, CitationItemData.prototype.setNumberOfPages = function(t) {
  return this._numberOfPages = t, this;
}, CitationItemData.prototype.setNumberOfVolumes = function(t) {
  return this._numberOfVolumes = t, this;
}, CitationItemData.prototype.setOriginalPublisher = function(t) {
  return this._originalPublisher = t, this;
}, CitationItemData.prototype.setOriginalPublisherPlace = function(t) {
  return this._originalPublisherPlace = t, this;
}, CitationItemData.prototype.setOriginalTitle = function(t) {
  return this._originalTitle = t, this;
}, CitationItemData.prototype.setPage = function(t) {
  return this._page = t, this;
}, CitationItemData.prototype.setPageFirst = function(t) {
  return this._pageFirst = t, this;
}, CitationItemData.prototype.setPart = function(t) {
  return this._part = t, this;
}, CitationItemData.prototype.setPartTitle = function(t) {
  return this._partTitle = t, this;
}, CitationItemData.prototype.setPMCID = function(t) {
  return this._PMCID = t, this;
}, CitationItemData.prototype.setPMID = function(t) {
  return this._PMID = t, this;
}, CitationItemData.prototype.setPrinting = function(t) {
  return this._printing = t, this;
}, CitationItemData.prototype.setPublisher = function(t) {
  return this._publisher = t, this;
}, CitationItemData.prototype.setPublisherPlace = function(t) {
  return this._publisherPlace = t, this;
}, CitationItemData.prototype.setReferences = function(t) {
  return this._references = t, this;
}, CitationItemData.prototype.setReviewedGenre = function(t) {
  return this._reviewedGenre = t, this;
}, CitationItemData.prototype.setReviewedTitle = function(t) {
  return this._reviewedTitle = t, this;
}, CitationItemData.prototype.setScale = function(t) {
  return this._scale = t, this;
}, CitationItemData.prototype.setSection = function(t) {
  return this._section = t, this;
}, CitationItemData.prototype.setSource = function(t) {
  return this._source = t, this;
}, CitationItemData.prototype.setStatus = function(t) {
  return this._status = t, this;
}, CitationItemData.prototype.setTitle = function(t) {
  return this._title = t, this;
}, CitationItemData.prototype.setTitleShort = function(t) {
  return this._titleShort = t, this;
}, CitationItemData.prototype.setURL = function(t) {
  return this._URL = t, this;
}, CitationItemData.prototype.setVersion = function(t) {
  return this._version = t, this;
}, CitationItemData.prototype.setVolume = function(t) {
  return this._volume = t, this;
}, CitationItemData.prototype.setVolumeTitle = function(t) {
  return this._volumeTitle = t, this;
}, CitationItemData.prototype.setVolumeTitleShort = function(t) {
  return this._volumeTitleShort = t, this;
}, CitationItemData.prototype.setYearSuffix = function(t) {
  return this._yearSuffix = t, this;
}, CitationItemData.prototype.setCustom = function(t) {
  return this._custom = Object.assign(this._custom, t), this;
}, CitationItemData.prototype.toJSON = function() {
  var t = {};
  return t.id = this._id, void 0 !== this._type && "" !== this._type && (t.type = this._type), void 0 !== this._citationKey && "" !== this._citationKey && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), void 0 !== this._language && "" !== this._language && (t.language = this._language), void 0 !== this._journalAbbreviation && "" !== this._journalAbbreviation && (t.journalAbbreviation = this._journalAbbreviation), void 0 !== this._shortTitle && "" !== this._shortTitle && (t.shortTitle = this._shortTitle, void 0 === this._titleShort && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), void 0 !== this._abstract && "" !== this._abstract && (t.abstract = this._abstract), void 0 !== this._annote && "" !== this._annote && (t.annote = this._annote), void 0 !== this._archive && "" !== this._archive && (t.archive = this._archive), void 0 !== this._archiveCollection && "" !== this._archiveCollection && (t.archive_collection = this._archiveCollection), void 0 !== this._archiveLocation && "" !== this._archiveLocation && (t.archive_location = this._archiveLocation), void 0 !== this._archivePlace && "" !== this._archivePlace && (t["archive-place"] = this._archivePlace), void 0 !== this._authority && "" !== this._authority && (t.authority = this._authority), void 0 !== this._callNumber && "" !== this._callNumber && (t["call-number"] = this._callNumber), void 0 !== this._chapterNumber && "" !== this._chapterNumber && (t["chapter-number"] = this._chapterNumber), void 0 !== this._citationNumber && "" !== this._citationNumber && (t["citation-number"] = this._citationNumber), void 0 !== this._citationLabel && "" !== this._citationLabel && (t["citation-label"] = this._citationLabel), void 0 !== this._collectionNumber && "" !== this._collectionNumber && (t["collection-number"] = this._collectionNumber), void 0 !== this._collectionTitle && "" !== this._collectionTitle && (t["collection-title"] = this._collectionTitle), void 0 !== this._containerTitle && "" !== this._containerTitle && (t["container-title"] = this._containerTitle), void 0 !== this._containerTitleShort && "" !== this._containerTitleShort && (t["container-title-short"] = this._containerTitleShort), void 0 !== this._dimensions && "" !== this._dimensions && (t.dimensions = this._dimensions), void 0 !== this._DOI && "" !== this._DOI && (t.DOI = this._DOI), void 0 !== this._edition && "" !== this._edition && (t.edition = this._edition), void 0 !== this._event && "" !== this._event && (t.event = this._event), void 0 !== this._eventTitle && "" !== this._eventTitle && (t["event-title"] = this._eventTitle), void 0 !== this._eventPlace && "" !== this._eventPlace && (t["event-place"] = this._eventPlace), void 0 !== this._firstReferenceNoteNumber && "" !== this._firstReferenceNoteNumber && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), void 0 !== this._genre && "" !== this._genre && (t.genre = this._genre), void 0 !== this._ISBN && "" !== this._ISBN && (t.ISBN = this._ISBN), void 0 !== this._ISSN && "" !== this._ISSN && (t.ISSN = this._ISSN), void 0 !== this._issue && "" !== this._issue && (t.issue = this._issue), void 0 !== this._jurisdiction && "" !== this._jurisdiction && (t.jurisdiction = this._jurisdiction), void 0 !== this._keyword && "" !== this._keyword && (t.keyword = this._keyword), void 0 !== this._locator && "" !== this._locator && (t.locator = this._locator), void 0 !== this._medium && "" !== this._medium && (t.medium = this._medium), void 0 !== this._note && "" !== this._note && (t.note = this._note), void 0 !== this._number && "" !== this._number && (t.number = this._number), void 0 !== this._numberOfPages && "" !== this._numberOfPages && (t["number-of-pages"] = this._numberOfPages), void 0 !== this._numberOfVolumes && "" !== this._numberOfVolumes && (t["number-of-volumes"] = this._numberOfVolumes), void 0 !== this._originalPublisher && "" !== this._originalPublisher && (t["original-publisher"] = this._originalPublisher), void 0 !== this._originalPublisherPlace && "" !== this._originalPublisherPlace && (t["original-publisher-place"] = this._originalPublisherPlace), void 0 !== this._originalTitle && "" !== this._originalTitle && (t["original-title"] = this._originalTitle), void 0 !== this._page && "" !== this._page && (t.page = this._page), void 0 !== this._pageFirst && "" !== this._pageFirst && (t["page-first"] = this._pageFirst), void 0 !== this._part && "" !== this._part && (t.part = this._part), void 0 !== this._partTitle && "" !== this._partTitle && (t["part-title"] = this._partTitle), void 0 !== this._PMCID && "" !== this._PMCID && (t.PMCID = this._PMCID), void 0 !== this._PMID && "" !== this._PMID && (t.PMID = this._PMID), void 0 !== this._printing && "" !== this._printing && (t.printing = this._printing), void 0 !== this._publisher && "" !== this._publisher && (t.publisher = this._publisher), void 0 !== this._publisherPlace && "" !== this._publisherPlace && (t["publisher-place"] = this._publisherPlace), void 0 !== this._references && "" !== this._references && (t.references = this._references), void 0 !== this._reviewedGenre && "" !== this._reviewedGenre && (t["reviewed-genre"] = this._reviewedGenre), void 0 !== this._reviewedTitle && "" !== this._reviewedTitle && (t["reviewed-title"] = this._reviewedTitle), void 0 !== this._scale && "" !== this._scale && (t.scale = this._scale), void 0 !== this._section && "" !== this._section && (t.section = this._section), void 0 !== this._source && "" !== this._source && (t.source = this._source), void 0 !== this._status && "" !== this._status && (t.status = this._status), void 0 !== this._title && "" !== this._title && (t.title = this._title), void 0 !== this._titleShort && "" !== this._titleShort && (t["title-short"] = this._titleShort), void 0 !== this._URL && "" !== this._URL && (t.URL = this._URL), void 0 !== this._version && "" !== this._version && (t.version = this._version), void 0 !== this._volume && "" !== this._volume && (t.volume = this._volume), void 0 !== this._volumeTitle && "" !== this._volumeTitle && (t["volume-title"] = this._volumeTitle), void 0 !== this._volumeTitleShort && "" !== this._volumeTitleShort && (t["volume-title-short"] = this._volumeTitleShort), void 0 !== this._yearSuffix && "" !== this._yearSuffix && (t["year-suffix"] = this._yearSuffix), 0 !== Object.keys(this._custom).length && (t.custom = this._custom), void 0 !== this._license && "" !== this._license && (t.license = this._license), t;
}, CitationItem.prototype.fillFromObject = function(t) {
  var e = this;
  Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? (this._itemData.fillFromObject(t.data), Object.hasOwnProperty.call(t, "links") && (Object.hasOwnProperty.call(t.links, "self") && this.addUri(t.links.self.href), Object.hasOwnProperty.call(t.links, "alternate") && this.addUri(t.links.alternate.href))) : Object.hasOwnProperty.call(t, "itemData") ? this._itemData.fillFromObject(t.itemData) : this._itemData.fillFromObject(t), Object.hasOwnProperty.call(t, "prefix") && (this._prefix = t.prefix), Object.hasOwnProperty.call(t, "suffix") && (this._suffix = t.suffix), Object.hasOwnProperty.call(t, "locator") && (this._locator = t.locator), Object.hasOwnProperty.call(t, "label") && (this._label = t.label), Object.hasOwnProperty.call(t, "suppress-author") && (this._suppressAuthor = t["suppress-author"]), Object.hasOwnProperty.call(t, "author-only") && (this._authorOnly = t["author-only"]), Object.hasOwnProperty.call(t, "uris") && t.uris.forEach(function(t2) {
    e.addUri(t2);
  }, this);
}, CitationItem.prototype.getInfoForCitationCluster = function() {
  var t = { id: this.id, "suppress-author": this._suppressAuthor };
  return this._prefix && (t.prefix = this._prefix), this._suffix && (t.suffix = this._suffix), this._locator && (t.locator = this._locator), this._label && (t.label = this._label), t;
}, CitationItem.prototype.getItemData = function() {
  return this._itemData;
}, CitationItem.prototype.getProperty = function(t) {
  return null !== this._itemData.getCustomProperty(t) ? this._itemData.getCustomProperty(t) : null;
}, CitationItem.prototype.setPrefix = function(t) {
  return this._prefix = t, this;
}, CitationItem.prototype.setSuffix = function(t) {
  return this._suffix = t, this;
}, CitationItem.prototype.setLocator = function(t) {
  return this._locator = t, this;
}, CitationItem.prototype.setLabel = function(t) {
  if (t) {
    if (-1 === ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"].indexOf(t)) throw new Error('CitationItem.setLocator: Invalid label "' + t + '"');
    this._label = t;
  }
  return this;
}, CitationItem.prototype.setSuppressAuthor = function(t) {
  return this._suppressAuthor = t, this;
}, CitationItem.prototype.setAuthorOnly = function(t) {
  return this._authorOnly = t, this;
}, CitationItem.prototype.addUri = function(t) {
  return -1 !== this._uris.indexOf(t) || this._uris.push(t), this;
}, CitationItem.prototype.toJSON = function() {
  var t = {};
  return t.id = this.id, this._itemData && (t.itemData = this._itemData.toJSON ? this._itemData.toJSON() : this._itemData), void 0 !== this._prefix && (t.prefix = this._prefix), void 0 !== this._suffix && (t.suffix = this._suffix), void 0 !== this._locator && (t.locator = this._locator), void 0 !== this._label && (t.label = this._label), void 0 !== this._suppressAuthor && (t["suppress-author"] = this._suppressAuthor), void 0 !== this._authorOnly && (t["author-only"] = this._authorOnly), this._uris.length && (t.uris = this._uris), t;
}, CitationItem.prototype.toFlatJSON = function(t) {
  var e = { id: this.id, index: t };
  void 0 !== this._suppressAuthor && (e["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(e, i), void 0 !== this._itemData.getCustomProperty("userID") && null !== this._itemData.getCustomProperty("userID") && (e.userID = String(this._itemData.getCustomProperty("userID"))), void 0 !== this._itemData.getCustomProperty("groupID") && null !== this._itemData.getCustomProperty("groupID") && (e.groupID = String(this._itemData.getCustomProperty("groupID"))), e;
};
var _CSLCitation_brand = /* @__PURE__ */ new WeakSet();
class CSLCitation {
  constructor(t) {
    _classPrivateMethodInitSpec(this, _CSLCitation_brand), t || (t = _assertClassBrand(_CSLCitation_brand, this, _generateId).call(this)), _usedIDs._.has(t) && (console.warn("Citation ID must be unique"), t = _assertClassBrand(_CSLCitation_brand, this, _generateId).call(this)), _usedIDs._.add(t), this.citationID = t, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
  }
  static resetUsedIDs() {
    _usedIDs._ = /* @__PURE__ */ new Set();
  }
  fillFromObject(t) {
    return Object.hasOwnProperty.call(t, "properties") || Object.hasOwnProperty.call(t, "manualOverride") || Object.hasOwnProperty.call(t, "schema") ? _assertClassBrand(_CSLCitation_brand, this, _fillFromCitationObject).call(this, t) : Object.hasOwnProperty.call(t, "citationItems") ? _assertClassBrand(_CSLCitation_brand, this, _fillFromFlatCitationObject).call(this, t) : Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? _assertClassBrand(_CSLCitation_brand, this, _fillFromJson).call(this, t) : _assertClassBrand(_CSLCitation_brand, this, _fillFromCslJson).call(this, t);
  }
  getCitationItems() {
    return this._citationItems;
  }
  getDoNotUpdate() {
    return Object.hasOwnProperty.call(this._properties, "dontUpdate") ? !!this._properties.dontUpdate : !!Object.hasOwnProperty.call(this._manualOverride, "isManuallyOverridden") && !!this._manualOverride.isManuallyOverridden;
  }
  getInfoForCitationCluster() {
    return this._citationItems.map(function(t) {
      return t.getInfoForCitationCluster();
    }, this);
  }
  getPlainCitation() {
    return Object.hasOwnProperty.call(this._properties, "plainCitation") ? String(this._properties.plainCitation) : this._manualOverride && Object.keys(this._manualOverride).length > 0 ? String(this._manualOverride.citeprocText) : "";
  }
  setDoNotUpdate() {
    return _assertClassBrand(_CSLCitation_brand, this, _setProperties).call(this, { dontUpdate: true }), this;
  }
  setNoteIndex(t) {
    return _assertClassBrand(_CSLCitation_brand, this, _setProperties).call(this, { noteIndex: t }), this;
  }
  setPlainCitation(t) {
    return _assertClassBrand(_CSLCitation_brand, this, _setProperties).call(this, { plainCitation: t }), this;
  }
  setManualOverride(t, e) {
    var i = { citeprocText: t, isManuallyOverridden: !!e, manualOverrideText: e || "" };
    return this._manualOverride = i, this;
  }
  validate() {
    var t = [];
    if (this._schema || t.push("Schema is required"), this.citationID || t.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems)) for (var e = 0; e < this._citationItems.length; e++) this._citationItems[e].id || t.push("Citation item at index " + e + " must have an id");
    return 0 === t.length || t;
  }
  toJSON() {
    var t = { citationID: this.citationID, schema: this._schema };
    return this._properties && Object.keys(this._properties).length > 0 && (t.properties = this._properties), this._manualOverride && Object.keys(this._manualOverride).length > 0 && (t.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (t.citationItems = this._citationItems.map(function(t2) {
      return t2.toJSON();
    })), t;
  }
}
function _fillFromCitationObject(t) {
  var e = this;
  if (Object.hasOwnProperty.call(t, "schema"), Object.hasOwnProperty.call(t, "properties") && _assertClassBrand(_CSLCitation_brand, this, _setProperties).call(this, t.properties), Object.hasOwnProperty.call(t, "manualOverride") && (this._manualOverride = t.manualOverride), !Object.hasOwnProperty.call(t, "citationItems")) return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(t2) {
    return t2.id;
  });
  return t.citationItems.forEach(function(t2) {
    var s, n = t2.id;
    i.indexOf(n) >= 0 ? s = e._citationItems[i.indexOf(n)] : (s = new CitationItem(n), i.push(n)), "number" == typeof n && (n = _assertClassBrand(_CSLCitation_brand, e, _extractIdFromWord365Citation).call(e, t2)), s.fillFromObject(t2), _assertClassBrand(_CSLCitation_brand, e, _addCitationItem).call(e, s);
  }, this), i.length;
}
function _fillFromFlatCitationObject(t) {
  var e = this;
  return 0 === t.citationItems.length ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (t.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), t.citationItems.forEach(function(t2) {
    _assertClassBrand(_CSLCitation_brand, e, _fillFromCslJson).call(e, t2);
  }, this), 1);
}
function _fillFromCslJson(t) {
  var e, i = t.id, s = this._citationItems.map(function(t2) {
    return t2.id;
  });
  return (e = s.indexOf(i) >= 0 ? this._citationItems[s.indexOf(i)] : new CitationItem(i)).fillFromObject(t), _assertClassBrand(_CSLCitation_brand, this, _addCitationItem).call(this, e), 1;
}
function _fillFromJson(t) {
  if (!Object.hasOwnProperty.call(t, "data")) return console.error("Invalid citation object"), 0;
  var e, i = this._citationItems.map(function(t2) {
    return t2.id;
  }), s = t.data.key;
  return (e = i.indexOf(s) >= 0 ? this._citationItems[i.indexOf(s)] : new CitationItem(s)).fillFromObject(t), _assertClassBrand(_CSLCitation_brand, this, _addCitationItem).call(this, e), 1;
}
function _addCitationItem(t) {
  var e = this._citationItems.map(function(t2) {
    return t2.id;
  });
  return e.indexOf(t.id) >= 0 ? (this._citationItems[e.indexOf(t.id)] = t, this) : (this._citationItems.push(t), this);
}
function _setProperties(t) {
  var e = this;
  return Object.keys(t).forEach(function(i) {
    Object.hasOwnProperty.call(t, i) && (e._properties[i] = t[i]);
  }, this), this;
}
function _extractIdFromWord365Citation(t) {
  if (Object.hasOwnProperty.call(t, "uris") && t.uris.length) {
    var e = t.uris[0].lastIndexOf("/");
    return t.uris[0].slice(e + 1);
  }
  return t.id;
}
function _generateId() {
  return Math.random().toString(36).substring(2, 15);
}
var _usedIDs = { _: /* @__PURE__ */ new Set() }, _window = /* @__PURE__ */ new WeakMap(), _defaultButtonFn = /* @__PURE__ */ new WeakMap(), _defaultThemeChangedFn = /* @__PURE__ */ new WeakMap(), _defaultTranslateFn = /* @__PURE__ */ new WeakMap(), _AdditionalWindow_brand = /* @__PURE__ */ new WeakSet();
class AdditionalWindow {
  constructor() {
    _classPrivateMethodInitSpec(this, _AdditionalWindow_brand), _classPrivateFieldInitSpec(this, _window, void 0), _classPrivateFieldInitSpec(this, _defaultButtonFn, void 0), _classPrivateFieldInitSpec(this, _defaultThemeChangedFn, void 0), _classPrivateFieldInitSpec(this, _defaultTranslateFn, void 0), _classPrivateFieldSet2(_window, this, new window.Asc.PluginWindow()), _classPrivateFieldSet2(_defaultButtonFn, this, window.Asc.plugin.button), _classPrivateFieldSet2(_defaultThemeChangedFn, this, Asc.plugin.onThemeChanged), _classPrivateFieldSet2(_defaultTranslateFn, this, Asc.plugin.onTranslate);
  }
  show(t, e) {
    _classPrivateFieldSet2(_window, this, new window.Asc.PluginWindow());
    var i = { name: "Zotero", url: "info-window.html", description: window.Asc.plugin.tr(t), isVisual: true, buttons: [{ text: window.Asc.plugin.tr("Yes"), primary: true, isViewer: false }, { text: window.Asc.plugin.tr("No"), primary: false }], isModal: false, EditorsSupport: ["word"], size: [380, 240], isViewer: true, isDisplayedInViewer: false, isInsideMode: false };
    return _assertClassBrand(_AdditionalWindow_brand, this, _onShow).call(this, i, e, "default"), _classPrivateFieldGet2(_window, this).show(i), new Promise((t2, e2) => {
      window.Asc.plugin.button = (e3, i2) => {
        t2(0 === e3), _assertClassBrand(_AdditionalWindow_brand, this, _hide).call(this);
      };
    });
  }
  showEditWindow(t) {
    var e = this;
    _classPrivateFieldSet2(_window, this, new window.Asc.PluginWindow());
    var i = { name: "Zotero", url: "edit-window.html", description: window.Asc.plugin.tr("Edit citation"), isVisual: true, buttons: [{ text: window.Asc.plugin.tr("Save"), primary: true, isViewer: false }, { text: window.Asc.plugin.tr("Cancel"), primary: false }], isModal: false, EditorsSupport: ["word"], size: [380, 150], isViewer: true, isDisplayedInViewer: false, isInsideMode: false };
    return _assertClassBrand(_AdditionalWindow_brand, this, _onShow).call(this, i, t, "default"), _classPrivateFieldGet2(_window, this).show(i), new Promise((t2, i2) => {
      window.Asc.plugin.button = (function() {
        var i3 = _asyncToGenerator(function* (i4, s) {
          var n = yield new Promise((t3) => {
            _classPrivateFieldGet2(_window, e) ? (_classPrivateFieldGet2(_window, e).attachEvent("onSaveFields", t3), _classPrivateFieldGet2(_window, e).command("onClickSave")) : t3(null);
          });
          t2(0 === i4 ? n : null), _assertClassBrand(_AdditionalWindow_brand, e, _hide).call(e);
        });
        return function(t3, e2) {
          return i3.apply(this, arguments);
        };
      })();
    });
  }
  showInfoWindow(t, e, i) {
    "string" != typeof i && (i = "warning"), _classPrivateFieldSet2(_window, this, new window.Asc.PluginWindow());
    var s = { name: "Mendeley", url: "info-window.html", description: window.Asc.plugin.tr(t), isVisual: true, buttons: [{ text: window.Asc.plugin.tr("OK"), primary: true, isViewer: false }], isModal: false, EditorsSupport: ["word"], size: [350, 76], isViewer: true, isDisplayedInViewer: false, isInsideMode: false };
    return _assertClassBrand(_AdditionalWindow_brand, this, _onShow).call(this, s, window.Asc.plugin.tr(e), i), _classPrivateFieldGet2(_window, this).show(s), new Promise((t2, e2) => {
      window.Asc.plugin.button = (e3, i2) => {
        t2(0 === e3), _assertClassBrand(_AdditionalWindow_brand, this, _hide).call(this);
      };
    });
  }
  destroy() {
    _assertClassBrand(_AdditionalWindow_brand, this, _hide).call(this), _classPrivateFieldSet2(_window, this, null);
  }
}
function _onShow(t, e, i) {
  _classPrivateFieldGet2(_window, this) && (_classPrivateFieldSet2(_defaultButtonFn, this, window.Asc.plugin.button), _classPrivateFieldSet2(_defaultThemeChangedFn, this, Asc.plugin.onThemeChanged), _classPrivateFieldSet2(_defaultTranslateFn, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (t2) => {
    var e2;
    null === (e2 = _classPrivateFieldGet2(_window, this)) || void 0 === e2 || e2.command("onThemeChanged", t2), _classPrivateFieldGet2(_defaultThemeChangedFn, this).call(this, t2);
  }, window.Asc.plugin.onTranslate = () => {
    var t2;
    null === (t2 = _classPrivateFieldGet2(_window, this)) || void 0 === t2 || t2.command("onTranslate"), _classPrivateFieldGet2(_defaultTranslateFn, this).call(this);
  }, _classPrivateFieldGet2(_window, this).attachEvent("onWindowReady", () => {
    var t2;
    if ("warning" === i) null === (t2 = _classPrivateFieldGet2(_window, this)) || void 0 === t2 || t2.command("onWarning", e);
    else if ("success" === i) {
      var s;
      null === (s = _classPrivateFieldGet2(_window, this)) || void 0 === s || s.command("onSuccess", e);
    } else {
      var n;
      null === (n = _classPrivateFieldGet2(_window, this)) || void 0 === n || n.command("onAttachedContent", e);
    }
  }), _classPrivateFieldGet2(_window, this).attachEvent("onUpdateHeight", (e2) => {
    var i2;
    Asc.plugin.executeMethod("ResizeWindow", [null === (i2 = _classPrivateFieldGet2(_window, this)) || void 0 === i2 ? void 0 : i2.id, [t.size[0] - 2, e2]], () => {
    });
  }));
}
function _hide() {
  _classPrivateFieldGet2(_window, this) && _classPrivateFieldGet2(_window, this).close(), window.Asc.plugin.button = _classPrivateFieldGet2(_defaultButtonFn, this), window.Asc.plugin.onThemeChanged = _classPrivateFieldGet2(_defaultThemeChangedFn, this);
}
var _additionalWindow = /* @__PURE__ */ new WeakMap(), _CitationService_brand = /* @__PURE__ */ new WeakSet();
class CitationService {
  constructor(t, e, i) {
    _classPrivateMethodInitSpec(this, _CitationService_brand), _classPrivateFieldInitSpec(this, _additionalWindow, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = i, this._localesManager = t, this._cslStylesManager = e, this._storage = new CSLCitationStorage(), this._formatter, this.citationDocService = new CitationDocService(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), _classPrivateFieldSet2(_additionalWindow, this, new AdditionalWindow());
  }
  getCurrentField() {
    var t = this;
    return _asyncToGenerator(function* () {
      return t.citationDocService.getCurrentField();
    })();
  }
  saveAsText() {
    var t = this;
    return _asyncToGenerator(function* () {
      var e = yield t.citationDocService.saveAsText();
      return e && _classPrivateFieldGet2(_additionalWindow, t).showInfoWindow("Success!", "All active Mendeley citations and Bibliography have been replaced.", "success"), e;
    })();
  }
  insertSelectedCitations(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      var i = e;
      try {
        yield _assertClassBrand(_CitationService_brand, e, _synchronizeStorageWithDocItems).call(e), _assertClassBrand(_CitationService_brand, e, _updateFormatter).call(e);
      } catch (t2) {
        throw t2;
      }
      var s = new CSLCitation("");
      for (var n in t) {
        var a = t[n];
        s.fillFromObject(a);
      }
      return _assertClassBrand(_CitationService_brand, e, _getSelectedInJsonFormat).call(e, t).then((t2) => (t2.forEach(function(t3) {
        s.fillFromObject(t3);
      }), e._storage.addCslCitation(s), _assertClassBrand(_CitationService_brand, i, _formatInsertLink).call(i, s)));
    })();
  }
  insertBibliography() {
    var t = this;
    return _asyncToGenerator(function* () {
      try {
        var { fieldsWithCitations: e, bibFieldValue: i, bibField: s } = yield _assertClassBrand(_CitationService_brand, t, _synchronizeStorageWithDocItems).call(t), n = 0 === e.length;
        if (_assertClassBrand(_CitationService_brand, t, _updateFormatter).call(t), s) {
          var a = [yield _assertClassBrand(_CitationService_brand, t, _updateBibliography).call(t, n, s)];
          return t.citationDocService.updateAddinFields(a).then((t2) => t2 ? t2[0] : "");
        }
        return _assertClassBrand(_CitationService_brand, t, _addBibliography).call(t, n, i);
      } catch (t2) {
        throw t2;
      }
    })();
  }
  moveCursorToField(t, e) {
    var i = this;
    return _asyncToGenerator(function* () {
      return i.citationDocService.moveCursorToField(t, e);
    })();
  }
  moveCursorOutsideField(t, e) {
    var i = this;
    return _asyncToGenerator(function* () {
      return i.citationDocService.moveCursorOutsideField(t, e);
    })();
  }
  moveCursorRight() {
    var t = this;
    return _asyncToGenerator(function* () {
      return t.citationDocService.moveCursorRight();
    })();
  }
  updateCslItems(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      try {
        var { fieldsWithCitations: i, bibField: s } = yield _assertClassBrand(_CitationService_brand, e, _synchronizeStorageWithDocItems).call(e), n = 0 === i.length;
        _assertClassBrand(_CitationService_brand, e, _updateFormatter).call(e);
        var a = [];
        if (void 0 === t) "numeric" === e._cslStylesManager.getLastUsedFormat() && (t = true);
        if ("boolean" == typeof t && (a = yield _assertClassBrand(_CitationService_brand, e, _getUpdatedFields).call(e, i, t)), s && a.push(yield _assertClassBrand(_CitationService_brand, e, _updateBibliography).call(e, n, s)), a && a.length) return e.citationDocService.updateAddinFields(a);
      } catch (t2) {
        throw t2;
      }
    })();
  }
  updateCslItemsInNotes(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      try {
        var { fieldsWithCitations: i, bibField: s } = yield _assertClassBrand(_CitationService_brand, e, _synchronizeStorageWithDocItems).call(e), n = 0 === i.length;
        _assertClassBrand(_CitationService_brand, e, _updateFormatter).call(e);
        var a = yield _assertClassBrand(_CitationService_brand, e, _getUpdatedFields).call(e, i, false);
        if (a && a.length && (yield e.citationDocService.convertNotesStyle(a, t)), s) {
          var r = [yield _assertClassBrand(_CitationService_brand, e, _updateBibliography).call(e, n, s)];
          yield e.citationDocService.updateAddinFields(r);
        }
      } catch (t2) {
        throw t2;
      }
    })();
  }
  updateItem(t, e) {
    var i = this;
    return _asyncToGenerator(function* () {
      try {
        var { fieldsWithCitations: s, bibField: n } = yield _assertClassBrand(_CitationService_brand, i, _synchronizeStorageWithDocItems).call(i, t);
        s.length;
        _assertClassBrand(_CitationService_brand, i, _updateFormatter).call(i);
        var a = yield _assertClassBrand(_CitationService_brand, i, _getUpdatedFields).call(i, s, true);
        if (e && a && a.length && (yield i.citationDocService.convertNotesStyle(a, e), a = []), a && a.length) return i.citationDocService.updateAddinFields(a);
      } catch (t2) {
        throw t2;
      }
    })();
  }
  switchingBetweenNotesAndText(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      try {
        var { fieldsWithCitations: i, bibField: s } = yield _assertClassBrand(_CitationService_brand, e, _synchronizeStorageWithDocItems).call(e), n = 0 === i.length;
        _assertClassBrand(_CitationService_brand, e, _updateFormatter).call(e);
        var a = yield _assertClassBrand(_CitationService_brand, e, _getUpdatedFields).call(e, i, true);
        if (a && a.length && (t ? yield e.citationDocService.convertTextToNotes(a, t) : yield e.citationDocService.convertNotesToText(a)), s) {
          var r = [yield _assertClassBrand(_CitationService_brand, e, _updateBibliography).call(e, n, s)];
          yield e.citationDocService.updateAddinFields(r);
        }
      } catch (t2) {
        throw t2;
      }
    })();
  }
  convertNotesStyle(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      try {
        var { fieldsWithCitations: i } = yield _assertClassBrand(_CitationService_brand, e, _synchronizeStorageWithDocItems).call(e);
        _assertClassBrand(_CitationService_brand, e, _updateFormatter).call(e);
        var s = yield _assertClassBrand(_CitationService_brand, e, _getUpdatedFields).call(e, i, false, true);
        if (!s || !s.length) return;
        yield e.citationDocService.convertNotesStyle(s, t);
      } catch (t2) {
        throw t2;
      }
    })();
  }
  showEditCitationWindow(t) {
    var e = this;
    return _asyncToGenerator(function* () {
      if (!t) return null;
      var i = _assertClassBrand(_CitationService_brand, e, _extractField).call(e, t), s = yield _classPrivateFieldGet2(_additionalWindow, e).showEditWindow(i);
      return s || null;
    })();
  }
}
function _formatInsertLink(t) {
  var e = this, i = false;
  return Promise.resolve().then(function() {
    if (t.getCitationItems().forEach(function(t2) {
      e._storage.hasItem(t2.id) || (i = true);
    }), i) {
      var s = [];
      e._storage.forEachItem(function(t2, e2) {
        s.push(e2);
      }), e._formatter.updateItems(s);
    }
  }).then(function() {
    var i2 = document.createDocumentFragment(), s = document.createElement("div"), n = e._storage.getCitationsPre(t.citationID), a = e._storage.getCitationsPost(t.citationID), r = e._storage.getAllCitationsInJson();
    e._formatter.rebuildProcessorState(r);
    var o = e._formatter.processCitationCluster(t.toJSON(), n, a), l = _assertClassBrand(_CitationService_brand, e, _unEscapeHtml).call(e, o[1][0][1]);
    i2.appendChild(s), s.innerHTML = l, t.setPlainCitation(s.innerText);
    var c = null;
    return "note" === e._cslStylesManager.getLastUsedFormat() && (c = e._cslStylesManager.getLastUsedNotesStyle()), e.citationDocService.addCitation(l, JSON.stringify(t.toJSON()), c);
  });
}
function _getSelectedInJsonFormat(t) {
  var e = [], i = {};
  for (var s in t) {
    var n = t[s], a = n.userID, r = n.groupID;
    a ? e.push(n.id) : r && (i[r] || (i[r] = []), i[r].push(n.id));
  }
  var o = [];
  for (var l in e.length && o.push(this._sdk.getItems(null, e, "json").then(function(t2) {
    return t2.items || [];
  })), i) Object.hasOwnProperty.call(i, l) && o.push(this._sdk.getGroupItems(null, l, i[l], "json").then(function(t2) {
    return t2.items || [];
  }));
  return Promise.all(o).then(function(t2) {
    return t2.reduce((t3, e2) => t3.concat(e2), []);
  });
}
function _makeBibliography() {
  try {
    for (var t = new Array(this._storage.size), e = this._formatter.makeBibliography(), i = 0; i < e[1].length; i++) {
      var s = _assertClassBrand(_CitationService_brand, this, _unEscapeHtml).call(this, e[1][i]);
      s = s.replaceAll("\n", "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
      var n = '<div class="csl-entry">', a = "</div>";
      e[0]["second-field-align"] ? 0 === s.indexOf(n) && s.endsWith(a) && (s = n + s.substring(23, s.length - 6).trim() + a) : s = "<p>" + (s = s.replace(/<\/?div[^>]*>/g, "")) + "</p>", window.Asc.scope.editorVersion < 9004e3 && (s += "\n"), t.push(s);
    }
    var r = t.join("").trim();
    return Asc.scope.bibStyle = e[0], r;
  } catch (t2) {
    if (false !== this._cslStylesManager.isLastUsedStyleContainBibliography()) throw console.error(t2), "Failed to apply this style.";
    return _classPrivateFieldGet2(_additionalWindow, this).showInfoWindow("Warning!", "Style does not describe the bibliography"), "";
  }
}
function _extractField(t) {
  var e, i = t.Value.indexOf("{"), s = t.Value.lastIndexOf("}");
  if (-1 !== i) {
    var n = t.Value.slice(i, s + 1);
    e = JSON.parse(n);
  }
  return e;
}
function _synchronizeStorageWithDocItems(t) {
  var e = this;
  return this._storage.clear(), CSLCitation.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
    var s = " ", n = i.find(function(t2) {
      return -1 !== t2.Value.indexOf(e._bibPrefixNew) || -1 !== t2.Value.indexOf(e._bibPrefix);
    });
    if (n) {
      var a = _assertClassBrand(_CitationService_brand, e, _extractField).call(e, n);
      "object" == typeof a && Object.keys(a).length > 0 && (s = JSON.stringify(a));
    }
    var r = i.filter(function(t2) {
      return -1 !== t2.Value.indexOf(e._citPrefixNew) || -1 !== t2.Value.indexOf(e._citPrefix);
    }).map(function(i2) {
      var s2 = _assertClassBrand(_CitationService_brand, e, _extractField).call(e, i2), n2 = "";
      -1 === i2.Value.indexOf(e._citPrefix) && (n2 = s2.citationID);
      var a2 = new CSLCitation(n2);
      return t ? a2.fillFromObject(t) : a2.fillFromObject(s2), e._storage.addCslCitation(a2), { field: _objectSpread2({}, i2), cslCitation: a2 };
    });
    return t && (r = r.filter(function(e2) {
      return e2.cslCitation.citationID === t.citationID;
    })), { bibField: n, bibFieldValue: s, fieldsWithCitations: r };
  });
}
function _addBibliography(t, e) {
  var i = _assertClassBrand(_CitationService_brand, this, _makeBibliography).call(this);
  if (t && (i = translate(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography()) return this.citationDocService.addBibliography(i, e);
  throw "The current bibliographic style does not describe the bibliography";
}
function _updateBibliography(t, e) {
  if (t) e.Content = translate(this._bibPlaceholderIfEmpty);
  else {
    var i = _assertClassBrand(_CitationService_brand, this, _makeBibliography).call(this);
    e.Content = i;
  }
  return e;
}
function _getUpdatedFields(t, e, i) {
  return _getUpdatedFields2.apply(this, arguments);
}
function _getUpdatedFields2() {
  return (_getUpdatedFields2 = _asyncToGenerator(function* (t, e, i) {
    var s = document.createDocumentFragment(), n = document.createElement("div");
    s.appendChild(n);
    for (var a = [], r = t.length - 1; r >= 0; r--) {
      var o = !!i, { field: l, cslCitation: c } = t[r], h = this._storage.getCitationsPre(c.citationID), d = this._storage.getCitationsPost(c.citationID), u = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(u);
      var _ = this._formatter.processCitationCluster(c.toJSON(), h, d), p = _assertClassBrand(_CitationService_brand, this, _unEscapeHtml).call(this, _[1][0][1]);
      n.innerHTML = p;
      var m = c.getPlainCitation(), b = l.Content;
      "" === m && (m = b);
      var v = n.innerText;
      if (!c.getDoNotUpdate()) {
        if (m === b || e) v === b && m === b && m === v || (o = true), l.Content = p, c.setPlainCitation(v);
        else {
          var f = "<p>" + translate("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + translate("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + translate("Original:") + " " + v + "</p><p>" + translate("Modified:") + " " + b + "</p>";
          (yield _classPrivateFieldGet2(_additionalWindow, this).show("Saving custom edits", f)) ? (c.setDoNotUpdate(), delete l.Content) : (l.Content = p, c.setPlainCitation(v)), o = true;
        }
        if (c) {
          var g = this._citPrefixNew + " " + this._citSuffixNew + JSON.stringify(c.toJSON());
          l.Value !== g && (o = true), l.Value = g;
        }
        o && a.push(l);
      }
    }
    return a;
  })).apply(this, arguments);
}
function _updateFormatter() {
  var t = this, e = [];
  this._storage.forEachItem(function(t2, i) {
    e.push(i);
  }), this._formatter = new CSL.Engine({ retrieveLocale: function(e2) {
    return t._localesManager.getLocale(e2) ? t._localesManager.getLocale(e2) : t._localesManager.getLocale();
  }, retrieveItem: function(e2) {
    var i = t._storage.getItem(e2), s = t._storage.getItemIndex(e2);
    return i ? i.toFlatJSON(s) : null;
  } }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), true), e.length && this._formatter.updateItems(e);
}
function _unEscapeHtml(t) {
  return t.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
class CursorService {
  static getCursorPosition() {
    return new Promise(function(t) {
      Asc.plugin.callCommand(() => {
        var t2 = Api.GetDocument();
        if (!t2) return 0;
        var e = t2.GetCurrentRun();
        if (!e) return 0;
        var i = e.GetRange(0, 0);
        return i ? i.GetEndPos() : 0;
      }, false, false, t);
    });
  }
  static setCursorPosition(t) {
    return new Promise(function(e) {
      Asc.scope.pos = t, Asc.plugin.callCommand(function() {
        Api.GetDocument().MoveCursorToPos(Asc.scope.pos);
      }, false, false, e);
    });
  }
}
var CslStylesParser = { getStyleInfo: function(t, e) {
  var i = new DOMParser().parseFromString(e, "text/xml"), s = { categories: { fields: [], format: "" }, dependent: 0, href: "", name: t, title: "", updated: "" }, n = i.querySelector("info title");
  n && (s.title = n.textContent);
  var a = i.querySelector('info link[rel="self"]');
  if (a) {
    var r = a.getAttribute("href");
    r && (s.href = r);
  }
  var o = i.querySelector('info link[rel="independent-parent"]');
  if (o) {
    var l = o.getAttribute("href");
    l && (s.parent = l), s.dependent = 1;
  }
  var c = i.querySelector("info updated");
  c && (s.updated = c.textContent);
  var h = i.querySelector("info category[citation-format]");
  if (h) {
    var d = h.getAttribute("citation-format");
    d && (s.categories.format = d);
  }
  var u = i.querySelectorAll("info category[field]");
  return u && u.forEach(function(t2) {
    var e2 = t2.getAttribute("field");
    e2 && s.categories.fields.push(e2);
  }), s;
}, getCitationFormat: function(t) {
  var e = new DOMParser().parseFromString(t, "text/xml").querySelector("info category[citation-format]");
  if (!e) throw new Error("Citation format not found");
  var i = e.getAttribute("citation-format");
  if (!i) throw new Error("Citation format not found");
  switch (i) {
    case "note":
    case "numeric":
    case "author":
    case "author-date":
    case "label":
      return i;
  }
  throw new Error("Invalid citation format");
}, isStyleContainBibliography: function(t) {
  return t.indexOf("<bibliography") > -1;
} };
function CslStylesStorage() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
function CslStylesManager(t) {
  this._isOnlineAvailable = false, this._isDesktopAvailable = false, this._customStylesStorage = new CslStylesStorage(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = t, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
function LocalesManager() {
  this._isOnlineAvailable = false, this._isDesktopAvailable = false, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
function SettingsPage(t, e) {
  if (this._router = t, this._displayNoneClass = e, this._saveBtn = new Button("saveSettingsBtn", { variant: "primary" }), this._cancelBtn = new Button("cancelBtn", { variant: "secondary" }), this._styleSelect = new SelectBox("styleSelectList", { placeholder: "Enter style name", sortable: true }), this._styleSelectListOther = new SelectBox("styleSelectedListOther", { placeholder: "Enter style name", searchable: true }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper) throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new Radio("footNotes", { label: "Footnotes" }), this._endNotes = new Radio("endNotes", { label: "Endnotes" }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput) throw new Error("cslFileInput not found");
  this._languageSelect = new SelectBox("styleLangList", { placeholder: "Select language" }), this._cslStylesManager = new CslStylesManager("zoteroStyleId"), this._localesManager = new LocalesManager(), this._selectLists = [], this._onChangeState = function(t2, e2) {
  }, this._styleMessage = new Message("styleMessage", { type: "error" }), this._langMessage = new Message("langMessage", { type: "error" }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = false, this._stateSettings = { style: "", notesStyle: "footnotes", styleFormat: "numeric" };
}
function LoginPage(t, e) {
  if (this._router = t, this._sdk = e, this._apiKeyLoginField = new InputField("apiKeyField", { autofocus: true, autocomplete: "on" }), this._saveApiKeyBtn = new Button("saveApiKeyBtn", { disabled: true }), this._apiKeyMessage = new Message("apiKeyMessage", { type: "error" }), this._useDesktopMessage = new Message("useDesktopMessage", { type: "error" }), this._connectToLocalZotero = new Button("connectToLocalZotero", { variant: "secondary" }), this._useDesktopApp = document.getElementById("useDesktopApp"), !this._useDesktopApp) throw new Error("useDesktopApp not found");
  if (this._logoutLink = document.getElementById("logoutLink"), !this._logoutLink) throw new Error("logoutLink not found");
  this._onAuthorized = function(t2) {
  }, this._onChangeState = function(t2) {
  }, this._onOpen = function() {
  };
}
function SearchFilterComponents() {
  this._searchField = new InputField("searchField", { type: "text", autofocus: true, showClear: false }), this._filterButton = new Button("filterButton", { variant: "secondary-icon", size: "small" }), this._librarySelectList = new SelectBox("librarySelectList", { placeholder: translate("No items selected"), multiple: true, description: translate("Search in:") }), this._subscribers = [], this._addEventListeners();
}
CslStylesStorage.prototype.getStyleNames = function() {
  var t = localStorage.getItem(this._customStyleNamesKey);
  return t ? JSON.parse(t) : [];
}, CslStylesStorage.prototype._getStyles = function() {
  var t = localStorage.getItem(this._customStylesKey);
  return t ? JSON.parse(t) : [];
}, CslStylesStorage.prototype.getStyle = function(t) {
  var e = this.getStyleNames().indexOf(t);
  return -1 === e ? null : this._getStyles()[e];
}, CslStylesStorage.prototype.getStylesInfo = function() {
  for (var t = this.getStyleNames(), e = this._getStyles(), i = [], s = 0; s < t.length; s++) {
    var n = CslStylesParser.getStyleInfo(t[s], e[s]);
    i.push(n);
  }
  return i;
}, CslStylesStorage.prototype.setStyle = function(t, e) {
  var i = this.getStyleNames(), s = this._getStyles(), n = i.indexOf(t);
  return -1 === n && (n = i.length), i[n] = t, s[n] = e, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(s)), CslStylesParser.getStyleInfo(t, e);
}, CslStylesStorage.prototype.deleteStyle = function(t) {
  var e = this.getStyleNames(), i = this._getStyles(), s = e.indexOf(t);
  return -1 === s || (e.splice(s, 1), i.splice(s, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(e)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), t;
}, CslStylesManager.prototype.addCustomStyle = function(t) {
  var e = this;
  return new Promise(function(e2, i) {
    var s = t.name.toLowerCase();
    ".csl" === s.slice(-4) || ".xml" === s.slice(-4) ? s = s.substring(0, s.length - 4).trim() : i("Please select a .csl or .xml file."), t.size > 1048576 && i("Maximum file size is 1 MB."), e2(s);
  }).then(function(i) {
    return e._readCSLFile(t).then(function(t2) {
      return -1 === e._defaultStyles.indexOf(i) && e._defaultStyles.push(i), e._customStylesStorage.setStyle(i, t2);
    });
  });
}, CslStylesManager.prototype.getLastUsedFormat = function() {
  var t = localStorage.getItem(this._lastFormatKey);
  switch (t) {
    case "note":
    case "numeric":
    case "author":
    case "author-date":
    case "label":
      return t;
  }
  return "numeric";
}, CslStylesManager.prototype.getLastUsedNotesStyle = function() {
  var t = localStorage.getItem(this._lastNotesStyleKey);
  return "footnotes" === t || "endnotes" === t ? t : "footnotes";
}, CslStylesManager.prototype.getLastUsedStyleId = function() {
  var t = localStorage.getItem(this._lastStyleKey);
  return t || null;
}, CslStylesManager.prototype.getLastUsedStyleIdOrDefault = function() {
  var t = localStorage.getItem(this._lastStyleKey);
  return t || "ieee";
}, CslStylesManager.prototype.getStyle = function(t) {
  var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], i = this;
  return Promise.resolve(t).then(function(t2) {
    if (i._cache[t2]) return i._cache[t2];
    if (-1 !== i._customStylesStorage.getStyleNames().indexOf(t2)) return i._customStylesStorage.getStyle(t2);
    var e2 = i._STYLES_LOCAL + t2 + ".csl";
    if (i._isOnlineAvailable) e2 = i._STYLES_URL + t2;
    else if (-1 === i._defaultStyles.indexOf(t2)) throw "The style is not available in the local version of the plugin.";
    return fetch(e2).then(function(t3) {
      return t3.text();
    });
  }).then(function(e2) {
    if (e2 && !i._isValidCSL(e2) && i._isOnlineAvailable) {
      var s = CslStylesParser.getStyleInfo(t, e2);
      if (s && s.dependent > 0 && s.parent) return fetch(s.parent).then(function(t2) {
        return t2.text();
      });
    }
    return e2;
  }).then(function(s) {
    var n = s && CslStylesParser.getCitationFormat(s) || "numeric", a = { content: s, styleFormat: n };
    return s && e && i._saveLastUsedStyle(t, s, n), a;
  });
}, CslStylesManager.prototype.getStylesInfo = function() {
  var t = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(e) {
    var i = t.getLastUsedStyleId() || "ieee", s = [], n = t._customStylesStorage.getStyleNames(), a = e[0], r = e[1];
    return t._isDesktopAvailable && !t._isOnlineAvailable && (a = a.filter(function(e2) {
      return t._defaultStyles.indexOf(e2.name) >= 0 || e2.name == i;
    })), r.forEach(function(e2) {
      s.push(e2), -1 === t._defaultStyles.indexOf(e2.name) && t._defaultStyles.push(e2.name);
    }), a.forEach(function(t2) {
      -1 === n.indexOf(t2.name) && s.push(t2);
    }), s.sort((t2, e2) => t2.name.localeCompare(e2.name)), s;
  });
}, CslStylesManager.prototype._getStylesJson = function() {
  var t = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (t = this._STYLES_JSON_URL), fetch(t).then(function(t2) {
    return t2.json();
  });
}, CslStylesManager.prototype.cached = function(t) {
  return Object.hasOwnProperty.call(this._cache, t) ? this._cache[t] : null;
}, CslStylesManager.prototype.isLastUsedStyleContainBibliography = function() {
  return "false" !== localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
}, CslStylesManager.prototype.isStyleDefault = function(t) {
  return this._defaultStyles.indexOf(t) >= 0;
}, CslStylesManager.prototype._isValidCSL = function(t) {
  return t.indexOf("<?xml") > -1 && t.indexOf("<style") > -1 && t.indexOf("<macro") > -1 && t.indexOf("citation") > -1;
}, CslStylesManager.prototype._readCSLFile = function(t) {
  var e = this;
  return new Promise(function(i, s) {
    var n = new FileReader();
    n.onload = function(t2) {
      var n2 = t2.target ? String(t2.target.result) : "";
      e._isValidCSL(n2) ? i(n2) : s("The file is not a valid CSL file");
    }, n.onerror = function() {
      s("Failed to read file");
    }, n.readAsText(t);
  });
}, CslStylesManager.prototype._saveLastUsedStyle = function(t, e, i) {
  this._cache[t] = e, localStorage.setItem(this._lastStyleKey, t), localStorage.setItem(this._lastFormatKey, i);
  var s = CslStylesParser.isStyleContainBibliography(e);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, s.toString());
}, CslStylesManager.prototype.saveLastUsedNotesStyle = function(t) {
  localStorage.setItem(this._lastNotesStyleKey, t);
}, CslStylesManager.prototype.setDesktopApiAvailable = function(t) {
  this._isDesktopAvailable = t;
}, CslStylesManager.prototype.setRestApiAvailable = function(t) {
  this._isOnlineAvailable = t;
}, LocalesManager.prototype.loadLocale = function(t) {
  var e = this;
  if (this._selectedLanguage = t, this._cache[t]) return Promise.resolve(this._cache[t]);
  var i = this._getLocalesUrl() + "locales-" + t + ".xml";
  return fetch(i).catch(function(i2) {
    return console.error("Failed to load locale:", i2), fetch(e._LOCALES_PATH + "locales-" + t + ".xml");
  }).then(function(t2) {
    return t2.text();
  }).then(function(i2) {
    return e._cache[t] = i2, i2;
  });
}, LocalesManager.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
}, LocalesManager.prototype.getLocale = function(t) {
  return t ? this._cache[t] ? this._cache[t] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
}, LocalesManager.prototype.saveLastUsedLanguage = function(t) {
  this._selectedLanguage = t, localStorage.setItem(this._lastLanguageKey, t);
}, LocalesManager.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
}, LocalesManager.prototype.setDesktopApiAvailable = function(t) {
  this._isDesktopAvailable = t;
}, LocalesManager.prototype.setRestApiAvailable = function(t) {
  this._isOnlineAvailable = t;
}, SettingsPage.prototype.getLocalesManager = function() {
  return this._localesManager;
}, SettingsPage.prototype.getStyleManager = function() {
  return this._cslStylesManager;
}, SettingsPage.prototype.getLocale = function() {
  return this._localesManager.getLocale();
}, SettingsPage.prototype.getLastUsedStyleId = function() {
  return this._cslStylesManager.getLastUsedStyleId();
}, SettingsPage.prototype.init = function() {
  var t = this._cslStylesManager.getLastUsedStyleId() || "ieee", e = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, e);
  var i = [this._onStyleChange(t), this._localesManager.loadLocale(e), this._loadStyles()];
  return Promise.all(i);
}, SettingsPage.prototype.onChangeState = function(t) {
  this._onChangeState = t;
}, SettingsPage.prototype.setDesktopApiAvailable = function(t) {
  this._localesManager.setDesktopApiAvailable(t), this._cslStylesManager.setDesktopApiAvailable(t);
}, SettingsPage.prototype.setRestApiAvailable = function(t) {
  this._localesManager.setRestApiAvailable(t), this._cslStylesManager.setRestApiAvailable(t);
}, SettingsPage.prototype._addEventListeners = function() {
  var t = this;
  this._saveBtn.subscribe(function(e) {
    if ("button:click" === e.type) {
      var i = t._languageSelect.getSelectedValue();
      if (null !== i) {
        var s = _objectSpread2({}, t._stateSettings), n = [];
        t._stateSettings.language !== i && (t._localesManager.saveLastUsedLanguage(i), n.push(t._localesManager.loadLocale(i).catch(function(e2) {
          throw console.error(e2), t._langMessage.show(translate("Failed to load language")), e2;
        })));
        var a = "footnotes";
        t._endNotes.getState().checked && (a = "endnotes"), t._stateSettings.notesStyle !== a && (t._cslStylesManager.saveLastUsedNotesStyle(a), "note" === t._cslStylesManager.getLastUsedFormat() && n.push(Promise.resolve()));
        var r = t._styleSelect.getSelectedValue();
        t._stateSettings.style !== r && null !== r && n.push(t._onStyleChange(r)), n.length ? (t._showLoader(), Promise.all(n).then(function() {
          t._hide(), t._hideLoader();
          var e2 = { language: i, style: r || "ieee", notesStyle: a, styleFormat: t._cslStylesManager.getLastUsedFormat() };
          t._onChangeState(e2, s);
        }).catch(function(e2) {
          t._hideLoader();
        })) : t._hide();
      } else console.error("No language selected");
    }
  }), this._cancelBtn.subscribe(function(e) {
    if ("button:click" === e.type) {
      var i = t._languageSelect.getSelectedValue(), s = t._styleSelect.getSelectedValue();
      null !== i && t._localesManager.getLastUsedLanguage() !== i && t._languageSelect.selectItems(t._localesManager.getLastUsedLanguage(), true), t._stateSettings.style !== s && null !== s ? (t._styleSelect.selectItems(t._stateSettings.style, true), t._styleSelectListOther.selectItems(t._stateSettings.style, true), t._onStyleChange(t._stateSettings.style, true).then(function() {
        t._hide();
      })) : t._hide();
    }
  }), this._cslFileInput.onchange = function(e) {
    if (e.target instanceof HTMLInputElement) {
      var i = e.target;
      if (i.files) {
        var s = i.files[0];
        s ? t._cslStylesManager.addCustomStyle(s).then(function(e2) {
          t._addStylesToList([e2]);
        }).catch(function(e2) {
          console.error(e2), t._styleMessage.show(translate("Invalid CSL style file"));
        }).finally(function() {
          t._hideLoader();
        }) : console.error("No file selected");
      }
    }
  }, this._styleSelect.subscribe(function(e) {
    if ("selectbox:change" === e.type) return t._styleSelectListOther.selectItems(e.detail.current.toString(), true), t._somethingWasChanged(), void t._onStyleChange(e.detail.current.toString(), true);
    "selectbox:custom" === e.type && ("more_styles" === e.detail.current && t._styleSelectListOther.openDropdown());
  }), t._styleSelectListOther.subscribe(function(e) {
    if ("selectbox:change" === e.type && e.detail.items) {
      var i = e.detail.items[0];
      t._styleSelect.addItem(i.value, i.text, true), t._somethingWasChanged(), t._onStyleChange(i.value, true);
    }
  }), this._languageSelect.subscribe(function(e) {
    "selectbox:change" === e.type && t._somethingWasChanged();
  }), this._footNotes.subscribe(function(e) {
    t._somethingWasChanged();
  }), this._endNotes.subscribe(function(e) {
    t._somethingWasChanged();
  });
}, SettingsPage.prototype._hideAllMessages = function() {
  this._langMessage.close(), this._styleMessage.close();
}, SettingsPage.prototype._hide = function() {
  this._router.openMain();
}, SettingsPage.prototype.show = function() {
  this._stateSettings = { language: this._localesManager.getLastUsedLanguage(), style: this._cslStylesManager.getLastUsedStyleIdOrDefault(), notesStyle: this._cslStylesManager.getLastUsedNotesStyle(), styleFormat: this._cslStylesManager.getLastUsedFormat() }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
}, SettingsPage.prototype._loadStyles = function() {
  var t = this;
  return this._cslStylesManager.getStylesInfo().then(function(e) {
    t._addStylesToList(e), t._styleSelect.addCustomItem("more_styles", "More Styles..."), t._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
  }).catch(function(t2) {
    console.error(t2);
  });
}, SettingsPage.prototype._addStylesToList = function(t) {
  var e = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), s = t.map(function(t2) {
    return [t2.name, t2.title];
  }), n = s.filter(function(t2) {
    return t2[0] == i || !!e._cslStylesManager.isStyleDefault(t2[0]);
  });
  this._styleSelect.addItems(n, i), this._styleSelectListOther.addItems(s, i);
}, SettingsPage.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
}, SettingsPage.prototype._onStyleChange = function(t, e) {
  var i = this;
  return e && i._showLoader(), i._cslStylesManager.getStyle(t, !e).then(function(t2) {
    var s = t2.styleFormat;
    i._bNumFormat = "numeric" == s, "note" === s ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), e && i._hideLoader();
  }).catch(function(t2) {
    throw console.error(t2), "string" == typeof t2 && i._styleMessage.show(translate(t2)), e && i._hideLoader(), t2;
  });
}, SettingsPage.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
}, SettingsPage.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
}, LoginPage.prototype.init = function() {
  var t = this;
  this._addEventListeners();
  var e = false, i = document.querySelectorAll(".for-zotero-online");
  ZoteroApiChecker.runApisChecker(t._sdk).subscribe(function(s2) {
    return t._onChangeState(s2), e || (e = true, !s2.desktopVersion && t._useDesktopApp && t._useDesktopApp.classList.add("hidden"), t._onOpen(), t._show()), s2.online ? i.forEach(function(t2) {
      t2.classList.remove("hidden");
    }) : i.forEach(function(t2) {
      t2.classList.add("hidden");
    }), s2.online && s2.hasKey ? (t._sdk.setIsOnlineAvailable(true), t._hide(true), void t._onAuthorized(s2)) : s2.desktop && s2.hasPermission ? (t._sdk.setIsOnlineAvailable(false), t._hide(), t._hideAllMessages(), void t._onAuthorized(s2)) : void 0;
  });
  var s = { onOpen: function(e2) {
    return t._onOpen = e2, s;
  }, onChangeState: function(e2) {
    return t._onChangeState = e2, s;
  }, onAuthorized: function(e2) {
    return t._onAuthorized = e2, s;
  } };
  return s;
}, LoginPage.prototype._addEventListeners = function() {
  var t = this;
  this._apiKeyLoginField.subscribe(function(e) {
    e.type, "inputfield:input" === e.type && (t._apiKeyLoginField.getValue() ? t._saveApiKeyBtn.enable() : t._saveApiKeyBtn.disable());
  }), this._saveApiKeyBtn.subscribe(function(e) {
    "button:click" === e.type && t._tryToApplyKey();
  }), this._connectToLocalZotero.subscribe(function(e) {
    "button:click" === e.type && (t._showLoader(), ZoteroApiChecker.checkStatus(t._sdk).then(function(e2) {
      if (e2.desktop && e2.hasPermission) t._sdk.setIsOnlineAvailable(false), t._hide(), t._hideAllMessages();
      else if (e2.desktop && !e2.hasPermission) {
        t._useDesktopMessage.show(translate('Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check "Allow other applications on this computer to communicate with Zotero"'));
      } else e2.desktop || t._useDesktopMessage.show(translate("Connection to Zotero failed. Make sure Zotero is running."));
    }).finally(function() {
      t._hideLoader();
    }));
  }), this._logoutLink.onclick = function(e) {
    return t._sdk.clearSettings(), t._show(), true;
  };
}, LoginPage.prototype._tryToApplyKey = function() {
  var t = this, e = t._apiKeyLoginField.getValue();
  e && (t._showLoader(), t._sdk.setApiKey(e).then(function() {
    ZoteroApiChecker.successfullyLoggedInUsingApiKey(), t._hide(true);
  }).catch(function(e2) {
    console.error(e2), t._apiKeyMessage.show(translate("Invalid API key"));
  }).finally(function() {
    t._hideLoader();
  }));
}, LoginPage.prototype._hideAllMessages = function() {
  this._apiKeyMessage.close();
}, LoginPage.prototype._hide = function(t) {
  this._router.openMain(), t && this._logoutLink.classList.remove("hidden");
}, LoginPage.prototype._show = function() {
  this._router.openLogin(), this._logoutLink.classList.add("hidden");
}, LoginPage.prototype._showLoader = function() {
  this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
}, LoginPage.prototype._hideLoader = function() {
  this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
}, SearchFilterComponents.prototype._addEventListeners = function() {
  var t = this;
  this._searchField.subscribe(function(e) {
    if ("inputfield:blur" === e.type || "inputfield:submit" === e.type) {
      var i = t._getSelectedGroups();
      t._subscribers.forEach(function(t2) {
        t2(e.detail.value, i);
      });
    }
  }), this._filterButton.subscribe(function(e) {
    "button:click" === e.type && (t._librarySelectList.isOpen || (e.detail.originalEvent && e.detail.originalEvent.stopPropagation(), t._librarySelectList.openDropdown()));
  });
}, SearchFilterComponents.prototype.addGroups = function(t) {
  var e = this, i = localStorage.getItem("selectedGroups"), s = i ? JSON.parse(i).map(function(t2) {
    return t2.toString();
  }) : ["my_library", "group_libraries"], n = false;
  t.forEach(function(t2) {
    t2.id = String(t2.id);
  });
  var a = [{ id: "my_library", name: translate("My Library") }, { id: "group_libraries", name: translate("Group Libraries") }];
  !n && a.forEach(function(t2) {
    -1 !== s.indexOf(t2.id) && (n = true);
  }), !n && t.forEach(function(t2) {
    -1 !== s.indexOf(t2.id.toString()) && (n = true);
  }), n || (s = ["my_library", "group_libraries"]);
  for (var r = function(t2, i2, s2) {
    "number" == typeof t2 && (t2 = t2.toString()), e._librarySelectList instanceof SelectBox && e._librarySelectList.addItem(t2, i2, s2);
  }, o = 0; o < a.length; o++) {
    var l = a[o].id;
    r(l, a[o].name, -1 !== s.indexOf(l));
  }
  if (0 !== t.length) {
    this._librarySelectList.addSeparator();
    var c = -1 !== s.indexOf("group_libraries");
    for (o = 0; o < t.length; o++) {
      var h = t[o].id;
      r(h, t[o].name, c || -1 !== s.indexOf(h.toString()));
    }
    this._selectedGroupsWatcher(a, t);
  }
}, SearchFilterComponents.prototype._getSelectedGroups = function() {
  var t = this, e = this._librarySelectList.getSelectedValues();
  return false !== Array.isArray(e) && 0 !== e.length || setTimeout(function() {
    t._librarySelectList.openDropdown();
  }, 500), null === e || "string" == typeof e ? [] : e;
}, SearchFilterComponents.prototype.subscribe = function(t) {
  var e = this;
  return this._subscribers.push(t), { unsubscribe: function() {
    e._subscribers = e._subscribers.filter(function(e2) {
      return e2 !== t;
    });
  } };
}, SearchFilterComponents.prototype._selectedGroupsWatcher = function(t, e) {
  var i = this;
  this._librarySelectList instanceof SelectBox != false && this._librarySelectList.subscribe(function(s) {
    if ("selectbox:change" === s.type) {
      var n = [], a = s.detail.values, r = s.detail.current, o = s.detail.enabled, l = t.map(function(t2) {
        return t2.id;
      }), c = e.map(function(t2) {
        return t2.id.toString();
      }), h = -1 !== l.indexOf(String(r));
      if (h) "group_libraries" === r ? (o ? (n.push("group_libraries"), i._librarySelectList.selectItems(c, true)) : i._librarySelectList.unselectItems(c, true), -1 !== a.indexOf("my_library") && n.push("my_library")) : -1 !== a.indexOf("group_libraries") ? (n.push("group_libraries"), o && n.push(r)) : n = a.slice();
      else if (!h) {
        c.every(function(t2) {
          return -1 !== a.indexOf(t2);
        }) ? (i._librarySelectList.selectItems("group_libraries", true), n.push("group_libraries"), -1 !== a.indexOf("my_library") && n.push("my_library")) : (i._librarySelectList.unselectItems("group_libraries", true), n = a.filter(function(t2) {
          return "group_libraries" !== t2;
        }));
      }
      0 === n.length ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(n));
    }
  });
};
var LOCATOR_VALUES = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
function SelectCitationsComponent(t, e, i) {
  this._displayNoneClass = t, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = i, this._fLoadMore = e, this._loadTimeout, this._init();
}
SelectCitationsComponent.prototype._init = function() {
  var t = this;
  this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(e) {
    var i = [];
    for (var s in t._items) i.push(s);
    for (var n = 0; n < i.length; n++) t._removeSelected(i[n]);
  });
}, SelectCitationsComponent.prototype.clearLibrary = function() {
  this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
  for (var t = this._docsHolder; t && t.lastChild; ) t.removeChild(t.lastChild);
  t && (t.scrollTop = 0), this._docsScroller.onscroll();
}, SelectCitationsComponent.prototype.displayNothingFound = function() {
  this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
}, SelectCitationsComponent.prototype.displaySearchItems = function(t, e, i) {
  var s = this, n = this._docsHolder;
  this._lastSearch = i;
  var a = 0;
  return new Promise((i2, r) => {
    if (t && t.items && t.items.length > 0) {
      var o = document.createElement("div");
      n && o.classList.add("page" + n.children.length);
      for (var l = 0; l < t.items.length; l++) {
        var c = t.items[l];
        c.title && (o.appendChild(s._buildDocElement(c)), a++);
      }
      n && n.appendChild(o);
    } else e && r(e);
    this._docsScroller.onscroll(), i2(a);
  });
}, SelectCitationsComponent.prototype.getSelectedItems = function() {
  return Object.assign({}, this._items || {});
}, SelectCitationsComponent.prototype.removeItems = function(t) {
  var e = this;
  t.forEach(function(t2) {
    e._removeSelected(t2);
  });
}, SelectCitationsComponent.prototype.subscribe = function(t) {
  var e = this;
  return this._subscribers.push(t), { unsubscribe: function() {
    e._subscribers = e._subscribers.filter(function(e2) {
      return e2 !== t;
    });
  } };
}, SelectCitationsComponent.prototype._buildDocElement = function(t) {
  var e = this, i = document.createElement("div");
  i.classList.add("doc");
  var s = document.createElement("div");
  s.classList.add("docInfo");
  var n = document.createElement("div"), a = "";
  t.author && t.author.length > 0 && (a = t.author.map(function(t2) {
    return t2.family && t2.given ? t2.family.trim() + ", " + t2.given.trim() : t2.family ? t2.family.trim() : t2.given ? t2.given.trim() : "";
  }).join("; "));
  var r = document.createElement("div");
  r.classList.add("selectbox-arrow"), r.innerHTML = "<b></b>";
  var o = document.createElement("div");
  if (o.textContent = t.title.trim(), o.classList.add("truncate-text"), o.classList.add("secondary-text"), (t.publisher || t["publisher-place"]) && (o.textContent += " · " + (t.publisher || t["publisher-place"] || "")), t.issued && t.issued["date-parts"]) {
    var l = t.issued["date-parts"][0];
    a.length > 20 ? o.textContent += " (" + l.join("-") + ")" : (a.length > 0 && "." !== a.slice(-1) && "," !== a.slice(-1) && (a += "."), a += " " + l.join("-"));
  }
  0 === a.length && (a = o.textContent), o.setAttribute("title", o.textContent), s.appendChild(o);
  var c = document.createElement("input");
  n.appendChild(c);
  var h, d = new Checkbox(c, { checked: !!this._items[t.id], label: a, title: true, id: t.id });
  return this._items[t.id] && (this._checks[t.id] = d), n.appendChild(r), i.appendChild(n), i.appendChild(s), r.onclick = function() {
    i.classList.toggle("doc-open"), h || (h = e._buildCitationParams(t), i.appendChild(h));
  }, d.subscribe(function(i2) {
    "checkbox:change" === i2.type && (i2.detail.checked ? e._addSelected(t, d) : e._removeSelected(t.id));
  }), i;
}, SelectCitationsComponent.prototype._buildCitationParams = function(t) {
  var e = localStorage.getItem("selectedLocator") || "page";
  t.label = e;
  var i = document.createDocumentFragment(), s = document.createElement("div"), n = document.createElement("input"), a = document.createElement("input"), r = document.createElement("div"), o = document.createElement("div"), l = document.createElement("input"), c = document.createElement("div"), h = document.createElement("input");
  i.appendChild(s), s.appendChild(n), s.appendChild(a), i.appendChild(r), r.appendChild(o), r.appendChild(l);
  var d = "";
  i.appendChild(c), c.appendChild(h);
  var u = new InputField(n, { type: "text", placeholder: "Prefix" }), _ = new InputField(a, { type: "text", placeholder: "Suffix" }), p = new SelectBox(o, { placeholder: "Locator" });
  LOCATOR_VALUES.forEach(function(t2) {
    var i2 = t2[0] === e;
    p.addItem(t2[0], t2[1], i2), i2 && (d = t2[1]);
  });
  var m = new InputField(l, { type: "text", placeholder: d }), b = new Checkbox(h, { label: translate("Omit author") });
  return u.subscribe(function(e2) {
    "inputfield:input" === e2.type && (t.prefix = e2.detail.value);
  }), _.subscribe(function(e2) {
    "inputfield:input" === e2.type && (t.suffix = e2.detail.value);
  }), m.subscribe(function(e2) {
    "inputfield:input" === e2.type && (t.locator = e2.detail.value);
  }), p.subscribe(function(e2) {
    if ("selectbox:change" === e2.type && e2.detail.items) {
      var i2 = e2.detail.items[0];
      m.setPlaceholder(i2.text), t.label = e2.detail.values[0].toString(), localStorage.setItem("selectedLocator", t.label);
    }
  }), b.subscribe(function(e2) {
    "checkbox:change" === e2.type && (t["suppress-author"] = e2.detail.checked);
  }), i;
}, SelectCitationsComponent.prototype._buildSelectedElement = function(t) {
  var e = this, i = document.createElement("div");
  i.classList.add("selDoc");
  var s = document.createElement("span");
  t.author && t.author.length > 0 ? s.textContent = t.author.map(function(t2) {
    return t2.family + ", " + t2.given;
  }).join("; ") : s.textContent = t.title, t.issued && t.issued["date-parts"] && (s.textContent += " " + t.issued["date-parts"][0].join("-")), s.setAttribute("title", s.textContent), i.appendChild(s);
  var n = document.createElement("span");
  return n.onclick = function() {
    e._removeSelected(t.id);
  }, n.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', i.appendChild(n), i;
}, SelectCitationsComponent.prototype._addSelected = function(t, e) {
  var i = this._buildSelectedElement(t);
  this._items[t.id] = t, this._html[t.id] = i, this._checks[t.id] = e, this._selectedHolder && this._selectedHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
}, SelectCitationsComponent.prototype._checkDocsScroll = function(t, e) {
  var i = this;
  if (this._fShouldLoadMore(t)) {
    if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
    this._loadTimeout = setTimeout(function() {
      i._fShouldLoadMore(t) && i._fLoadMore();
    }, 500);
  }
}, SelectCitationsComponent.prototype._initScrollBox = function(t, e, i, s) {
  var n = {};
  return n.onscroll = this._checkScroll(t, e, i, s), t.onwheel = function(e2) {
    t.scrollTop += e2.deltaY > 10 || e2.deltaY < -10 ? e2.deltaY : 20 * e2.deltaY, n.onscroll();
  }, e.onmousedown = function(i2) {
    e.classList.add("scrolling");
    var s2 = i2.clientY, a = t.scrollTop;
    window.onmouseup = function(t2) {
      e.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
    }, window.onmousemove = function(e2) {
      var i3 = (e2.clientY - s2) / t.clientHeight, r = t.scrollHeight * i3;
      t.scrollTop = a + r, n.onscroll();
    };
  }, document.body.addEventListener("resize", function() {
    n.onscroll();
  }), n;
}, SelectCitationsComponent.prototype._checkScroll = function(t, e, i, s) {
  var n = this._displayNoneClass;
  return function() {
    if (t.scrollHeight <= t.clientHeight) e.classList.add(n);
    else {
      e.classList.remove(n);
      var a = t.clientHeight / t.scrollHeight * t.clientHeight;
      a = a < i ? i : a, e.style.height = a + "px";
      var r = t.scrollHeight - t.clientHeight, o = t.scrollTop / r * (t.clientHeight - a);
      e.style.marginTop = o + "px";
    }
    s && s(t, e);
  };
}, SelectCitationsComponent.prototype._removeSelected = function(t) {
  var e = this._html[t];
  this._selectedHolder && this._selectedHolder.removeChild(e), delete this._items[t], delete this._html[t], this._checks[t] && (this._checks[t].uncheck(true), delete this._checks[t]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
}, SelectCitationsComponent.prototype._checkSelected = function() {
  var t = this.count();
  this._selectedInfo && this._selectedCount && this._selectedWrapper && (t <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = t + " " + translate("selected")), this._subscribers.forEach(function(e) {
    e(t);
  }));
}, SelectCitationsComponent.prototype.count = function() {
  var t = 0;
  for (var e in this._items) t++;
  return t;
}, (function() {
  var t, e, i, s, n, a, r, o, l, c, h, d = "hidden", u = { text: "", obj: null, groups: [], groupsHash: "" }, _ = new Loader("libLoader", translate("Loading...")), p = {};
  function m() {
    for (var t2 = document.getElementsByClassName("i18n"), e2 = function() {
      var e3 = t2[i2];
      if (e3 instanceof HTMLElement == false) return 1;
      ["placeholder", "title"].forEach((t3) => {
        e3.hasAttribute(t3) && e3.setAttribute(t3, translate(e3.getAttribute(t3) || ""));
      });
      var s2 = translate(e3.innerText.trim().replace(/\s+/g, " "));
      s2 && (e3.innerText = s2);
    }, i2 = 0; i2 < t2.length; i2++) e2();
  }
  function b(t2) {
    t2 && "string" == typeof t2 ? (translate(""), p.error.classList.remove(d), p.error.textContent = t2, setTimeout(function() {
      window.onclick = function() {
        b(false);
      };
    }, 100)) : (p.error.classList.add(d), p.error.textContent = "", window.onclick = null);
  }
  function v(t2, e2) {
    return f.apply(this, arguments);
  }
  function f() {
    return (f = _asyncToGenerator(function* (t2, e2) {
      c.disable(), h.disable(), o.disable();
      var i2 = window.Asc.scope.editorVersion;
      i2 && i2 < 9004e3 ? window._cursorPosition = yield CursorService.getCursorPosition() : yield new Promise((e3) => {
        Asc.plugin.executeMethod("StartAction", ["GroupActions", { lockScroll: true, keepSelection: t2 }], e3);
      });
    })).apply(this, arguments);
  }
  function g(t2, e2) {
    return y.apply(this, arguments);
  }
  function y() {
    return (y = _asyncToGenerator(function* (t2, e2) {
      c.enable(), h.enable(), x();
      var i2 = window.Asc.scope.editorVersion;
      i2 && i2 < 9004e3 ? CursorService.setCursorPosition(window._cursorPosition || 0) : yield new Promise((e3) => {
        Asc.plugin.executeMethod("EndAction", ["GroupActions", { scrollToTarget: t2 }], e3);
      });
    })).apply(this, arguments);
  }
  function S(t2) {
    var e2 = document.getElementById("searchLabel");
    if (e2) {
      var i2 = e2.querySelector(".when-empty"), s2 = e2.querySelector(".when-not-empty"), n2 = e2.querySelector(".when-started");
      if (i2 && s2 && n2) switch (i2.classList.add("hidden"), s2.classList.add("hidden"), n2.classList.add("hidden"), t2) {
        case "empty":
          i2.classList.remove("hidden");
          break;
        case "not-empty":
          s2.classList.remove("hidden");
          break;
        case "started":
          s2.classList.remove("hidden"), n2.classList.remove("hidden");
      }
      else console.error("Search label elements not found");
    } else console.error("Search label not found");
  }
  function C() {
    console.warn("Loading more..."), u.obj && u.obj.next && P(u.obj.next(), false);
    for (var t2 = 0; t2 < u.groups.length && u.groups[t2].next; t2++) P(e.getGroupItems(u.groups[t2].next(), u.groups[t2].id), true);
  }
  function w(e2) {
    if ("main" != t.getRoute()) return false;
    if (e2.scrollTop + e2.clientHeight < e2.scrollHeight) return false;
    var i2 = true;
    return u.groups.forEach(function(t2) {
      t2.next && (i2 = false);
    }), !!(u.obj && u.obj.next && i2) && !!(u.obj || u.text.trim() || u.groups.length);
  }
  function P(t2, e2) {
    return t2.then(function(t3) {
      return I(t3, null, e2);
    }).catch(function(t3) {
      return console.error(t3), t3.message && b(translate(t3.message)), I(null, t3, e2);
    }).then(function(t3) {
      return t3;
    });
  }
  function I(t2, e2, i2) {
    var s2 = false;
    !u.obj && t2 && t2.items && !t2.items.length && (s2 = true), e2 ? (s2 && (u.obj = null, u.groups = []), u && u.obj && delete u.obj.next) : i2 && t2 && t2.next ? u.groups.push(t2) : u.obj = t2 && t2.items.length ? t2 : null;
    return t2 && t2.items && t2.items.length > 0 && (t2.items = t2.items.map((e3) => (e3 = (function(t3) {
      if (t3.id || !t3.key) return t3;
      var e4 = { id: t3.key, title: t3.data.title, type: t3.data.itemType };
      Object.hasOwnProperty.call(t3, "url") && (e4.URL = t3.data.url);
      Object.hasOwnProperty.call(t3, "volume") && (e4.volume = t3.data.volume);
      Object.hasOwnProperty.call(t3, "language") && (e4.language = t3.data.language);
      Object.hasOwnProperty.call(t3, "abstract") && (e4.abstract = t3.data.abstract);
      Object.hasOwnProperty.call(t3, "note") && (e4.note = t3.data.note);
      Object.hasOwnProperty.call(t3, "page") && (e4.page = t3.data.page);
      Object.hasOwnProperty.call(t3, "shortTitle") && (e4.shortTitle = t3.data.shortTitle);
      Object.hasOwnProperty.call(t3, "links") && (e4.uris = [], Object.hasOwnProperty.call(t3.links, "self") && e4.uris.push(t3.links.self.href), Object.hasOwnProperty.call(t3.links, "alternate") && e4.uris.push(t3.links.alternate.href));
      return e4;
    })(e3), e3[i2 ? "groupID" : "userID"] = t2.id, (function(t3) {
      if (!t3.id) return t3;
      var e4 = t3.id.indexOf("/") + 1, i3 = t3.id.lastIndexOf("/") + 1, s3 = t3.id.indexOf("http");
      e4 !== i3 && 0 === s3 && (t3.uris || (t3.uris = []), t3.uris.push(t3.id)), i3 && (t3.id = t3.id.substring(i3));
    })(e3), e3))), a.displaySearchItems(t2, e2, u);
  }
  function x(t2) {
    void 0 === t2 && (t2 = a.count()), t2 <= 0 ? (o.disable(), o.setText(translate("Insert Citation"))) : (o.enable(), t2 > 1 ? o.setText(translate("Insert " + t2 + " Citations")) : o.setText(translate("Insert Citation")));
  }
  function O() {
    return (O = _asyncToGenerator(function* () {
      try {
        var t2 = yield new Promise((t3) => {
          Asc.plugin.executeMethod("GetVersion", [], t3);
        });
        "develop" == t2 && (t2 = "99.99.99");
        for (var e2 = t2.split("."); 3 > e2.length; ) e2.push("0");
        return 1e6 * parseInt(e2[0]) + 1e3 * parseInt(e2[1]) + parseInt(e2[2]);
      } catch (t3) {
        return console.error(t3), 99999999;
      }
    })).apply(this, arguments);
  }
  window.Asc.plugin.init = function() {
    Loader.show(), (function() {
      var t2 = document.getElementById("errorWrapper");
      if (!t2) throw new Error("errorWrapper not found");
      var e2 = document.getElementById("mainState");
      if (!e2) throw new Error("mainState not found");
      n = new SearchFilterComponents(), a = new SelectCitationsComponent(d, C, w), r = new Button("saveAsTextBtn", { variant: "secondary" }), o = new Button("insertLinkBtn", { disabled: true }), l = new Button("settingsBtn", { variant: "icon-only", size: "small" }), c = new Button("insertBibBtn", { variant: "secondary" }), h = new Button("refreshBtn", { variant: "secondary" }), p = { error: t2, mainState: e2 };
    })(), t = new Router(), e = new ZoteroSdk();
    var f2 = new LoginPage(t, e);
    i = new SettingsPage(t, d), s = new CitationService(i.getLocalesManager(), i.getStyleManager(), e);
    var y2 = false;
    !(function() {
      function t2(t3, i2, s2) {
        a.clearLibrary();
        var n2 = [];
        return e.getUserGroups().then(function(a2) {
          var r2 = i2.filter(function(t4) {
            return "my_library" !== t4 && "group_libraries" !== t4;
          });
          -1 !== i2.indexOf("my_library") && n2.push(P(e.getItems(t3), false));
          for (var o2 = 0; o2 < r2.length; o2++) n2.push(P(e.getGroupItems(t3, r2[o2]), true));
          return u.text = t3, u.obj = null, u.groups = [], u.groupsHash = s2, n2;
        });
      }
      a.subscribe(x), n.subscribe(function(e2, i2) {
        e2 = e2.trim();
        var s2 = i2.join(",");
        p.mainState.classList.contains(d) || !e2 || e2 == u.text && s2 === u.groupsHash || 0 === i2.length || t2(e2, i2, s2).catch(() => []).then(function(t3) {
          return t3.length && (_.show(), Promise.any(t3).then(function() {
            _.hide();
          }).finally(function() {
            _.hide();
          })), Promise.allSettled(t3);
        }).then(function(t3) {
          var e3 = 0;
          t3.forEach(function(t4) {
            "fulfilled" === t4.status && (e3 += t4.value);
          }), 0 === e3 ? (S("empty"), a.displayNothingFound()) : S("not-empty");
        });
      }), h.subscribe((function() {
        var t3 = _asyncToGenerator(function* (t4) {
          if ("button:click" === t4.type) if (i.getLastUsedStyleId()) if (i.getLocale()) {
            yield v(true, "Zotero (" + translate("Updating citations") + ")");
            var e2 = s.updateCslItems.bind(s, false), n2 = i.getStyleManager();
            "note" === n2.getLastUsedFormat() && (e2 = s.updateCslItemsInNotes.bind(s, n2.getLastUsedNotesStyle())), e2().catch(function(t5) {
              console.error(t5);
              var e3 = translate("Failed to refresh");
              "string" == typeof t5 && (e3 += ". " + translate(t5)), b(e3);
            }).finally(function() {
              g(false, "Zotero (" + translate("Updating citations") + ")");
            });
          } else b(translate("Language is not selected"));
          else b(translate("Style is not selected"));
        });
        return function(e2) {
          return t3.apply(this, arguments);
        };
      })()), c.subscribe((function() {
        var t3 = _asyncToGenerator(function* (t4) {
          if ("button:click" === t4.type) if (i.getLastUsedStyleId()) if (i.getLocale()) {
            yield v(false, "Zotero (" + translate("Inserting bibliography") + ")");
            var e2 = "";
            s.insertBibliography().then(function(t5) {
              e2 = t5;
            }).catch(function(t5) {
              console.error(t5);
              var e3 = translate("Failed to insert bibliography");
              "string" == typeof t5 && (e3 += ". " + translate(t5)), b(e3);
            }).finally(function() {
              g(false, "Zotero (" + translate("Inserting bibliography") + ")"), e2 && s.moveCursorOutsideField(e2);
            });
          } else b(translate("Language is not selected"));
          else b(translate("Style is not selected"));
        });
        return function(e2) {
          return t3.apply(this, arguments);
        };
      })()), o.subscribe((function() {
        var t3 = _asyncToGenerator(function* (t4) {
          if ("button:click" === t4.type) if (i.getLastUsedStyleId()) {
            if (i.getLocale()) {
              yield v(true, "Zotero (" + translate("Inserting citation") + ")");
              var e2 = a.getSelectedItems(), n2 = null, r2 = false;
              return s.insertSelectedCitations(e2).then(function(t5) {
                return r2 = t5, a.removeItems(Object.keys(e2)), s.getCurrentField();
              }).then(function(t5) {
                return n2 = t5, s.updateCslItems();
              }).catch(function(t5) {
                console.error(t5);
                var e3 = translate("Failed to insert citation");
                "string" == typeof t5 && (e3 += ". " + translate(t5)), b(e3);
              }).finally(_asyncToGenerator(function* () {
                g(false, "Zotero (" + translate("Inserting citation") + ")"), r2 ? yield s.moveCursorRight() : n2 && (yield s.moveCursorOutsideField(n2.FieldId));
              }));
            }
            b(translate("Language is not selected"));
          } else b(translate("Style is not selected"));
        });
        return function(e2) {
          return t3.apply(this, arguments);
        };
      })()), l.subscribe(function(t3) {
        "button:click" === t3.type && i.show();
      }), r.subscribe((function() {
        var t3 = _asyncToGenerator(function* (t4) {
          "button:click" === t4.type && (yield v(false, "Zotero (" + translate("Saving as text") + ")"), s.saveAsText().then(function() {
            g(false, "Zotero (" + translate("Saving as text") + ")");
          }));
        });
        return function(e2) {
          return t3.apply(this, arguments);
        };
      })()), i.onChangeState((function() {
        var t3 = _asyncToGenerator(function* (t4, e2) {
          yield v(true, "Zotero (" + translate("Updating citations") + ")");
          var i2 = s.updateCslItems.bind(s, true);
          [t4.styleFormat, e2.styleFormat].includes("note") && (i2 = t4.styleFormat !== e2.styleFormat ? "note" === t4.styleFormat ? s.switchingBetweenNotesAndText.bind(s, t4.notesStyle) : s.switchingBetweenNotesAndText.bind(s) : t4.notesStyle !== e2.notesStyle ? s.convertNotesStyle.bind(s, t4.notesStyle) : s.updateCslItems.bind(s, true)), i2().catch(function(t5) {
            console.error(t5);
            var e3 = translate("Failed to refresh");
            "string" == typeof t5 && (e3 += ". " + translate(t5)), b(e3);
          }).finally(function() {
            g(false, "Zotero (" + translate("Updating citations") + ")");
          });
        });
        return function(e2, i2) {
          return t3.apply(this, arguments);
        };
      })());
    })(), f2.init().onOpen(function() {
      Loader.hide();
    }).onChangeState(function(t2) {
      i.setDesktopApiAvailable(t2.desktop), i.setRestApiAvailable(t2.online);
    }).onAuthorized(function(t2) {
      if (!y2) {
        y2 = true, Loader.show();
        var s2 = e.getUserGroups().then(function(t3) {
          return n.addGroups(t3), t3;
        }).catch((t3) => {
          console.error(t3), b(translate("An error occurred while loading library groups. Try restarting the plugin."));
        }), a2 = i.init().catch((t3) => {
          console.error(t3), b(translate("An error occurred while loading settings. Try restarting the plugin.")), i.show();
        });
        Promise.all([s2, a2]).then(function() {
          return Loader.hide(), _.show(), P(e.getItems(null).then((t3) => (delete t3.next, t3)), false).then((t3) => {
            S(t3 > 0 ? "started" : "empty");
          }).catch((t3) => {
            console.error(t3);
          }).finally(() => {
            _.hide();
          });
        }).finally(function() {
          Loader.hide();
        });
      }
    }), window.Asc.plugin.onTranslate = m, (function() {
      return O.apply(this, arguments);
    })().then((t2) => {
      var e2;
      window.Asc.scope.editorVersion = t2, (e2 = new Asc.ButtonContextMenu()).text = "Edit citation", e2.addCheckers("Target", "Selection"), e2.attachOnClick(_asyncToGenerator(function* () {
        var t3 = yield new Promise((t4) => {
          window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, t4);
        });
        if (t3 && t3.Value && -1 !== t3.Value.toLowerCase().indexOf("zotero_item")) {
          var e3 = yield s.showEditCitationWindow(t3);
          if (e3) {
            yield v(false, "Zotero (" + translate("Updating citations") + ")");
            var n2 = s.updateItem.bind(s, e3), a2 = i.getStyleManager();
            "note" === a2.getLastUsedFormat() && (n2 = s.updateItem.bind(s, e3, a2.getLastUsedNotesStyle())), n2().catch(function(t4) {
              console.error(t4);
              var e4 = translate("Failed to insert citation");
              "string" == typeof t4 && (e4 += ". " + translate(t4)), b(e4);
            }).finally(function() {
              g(false, "Zotero (" + translate("Updating citations") + ")"), t3 && s.moveCursorOutsideField(t3.FieldId);
            });
          }
        }
      })), Asc.Buttons.registerContextMenu();
    }).catch((t2) => {
      console.error(t2);
    });
  }, Asc.plugin.onThemeChanged = function(t2) {
    window.Asc.plugin.onThemeChangedBase(t2), Theme.fixThemeForIE(t2), Theme.addStylesForComponents(t2);
    var e2 = "";
    e2 += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n", e2 += ".doc { border-color: " + t2["border-regular-control"] + "; background-color: " + t2["background-normal"] + "; }\n", e2 += ".scrollThumb { box-shadow: 0 0 8px 8px " + t2["highlight-button-hover"] + " inset; }\n", e2 += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + t2["canvas-scroll-thumb-pressed"] + " inset; }\n", e2 += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + t2["canvas-scroll-thumb-hover"] + " inset; }\n", -1 === ["theme-white", "theme-night"].indexOf(t2.name) && -1 === ["theme-white", "theme-night"].indexOf(t2.Name) || (e2 += ".doc { border-radius: 4px; }\n");
    var i2 = document.getElementById("pluginStyles");
    i2 ? i2.innerHTML = e2 : ((i2 = document.createElement("style")).id = "pluginStyles", i2.innerHTML = e2, document.getElementsByTagName("head")[0].appendChild(i2));
    var s2 = t2.type || "light", n2 = document.body;
    n2.classList.remove("theme-dark"), n2.classList.remove("theme-light"), n2.classList.add("theme-" + s2);
  };
})();
//# sourceMappingURL=bundle.modern.js.map
