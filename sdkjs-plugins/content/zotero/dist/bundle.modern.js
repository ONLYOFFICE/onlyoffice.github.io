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
function c(e, t, i) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : i;
  throw new TypeError("Private element is not present on this object");
}
function Wt(e, t, i, n, s, r, o) {
  try {
    var l = e[r](o), h = l.value;
  } catch (u) {
    return void i(u);
  }
  l.done ? t(h) : Promise.resolve(h).then(n, s);
}
function E(e) {
  return function() {
    var t = this, i = arguments;
    return new Promise(function(n, s) {
      var r = e.apply(t, i);
      function o(h) {
        Wt(r, n, s, o, l, "next", h);
      }
      function l(h) {
        Wt(r, n, s, o, l, "throw", h);
      }
      o(void 0);
    });
  };
}
function si(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function a(e, t) {
  return e.get(c(e, t));
}
function B(e, t, i) {
  si(e, t), t.set(e, i);
}
function x(e, t, i) {
  return e.set(c(e, t), i), i;
}
function ce(e, t) {
  si(e, t), t.add(e);
}
function yi(e, t, i) {
  return (t = wi(t)) in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
function Kt(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function ri(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Kt(Object(i), !0).forEach(function(n) {
      yi(e, n, i[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : Kt(Object(i)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
    });
  }
  return e;
}
function oi(e, t) {
  if (e == null) return {};
  var i, n, s = mi(e, t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (n = 0; n < r.length; n++) i = r[n], t.indexOf(i) === -1 && {}.propertyIsEnumerable.call(e, i) && (s[i] = e[i]);
  }
  return s;
}
function mi(e, t) {
  if (e == null) return {};
  var i = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    i[n] = e[n];
  }
  return i;
}
function bi(e, t) {
  if (typeof e != "object" || !e) return e;
  var i = e[Symbol.toPrimitive];
  if (i !== void 0) {
    var n = i.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function wi(e) {
  var t = bi(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
var zt = {
  /**
   * @param {AscTheme} theme
   */
  addStylesForComponents: function(t) {
    var i = "";
    t["background-toolbar"] && (i += `.loader-body,
.loader-bg { background-color: ` + t["background-toolbar"] + `; }
`, i += ".loader-body {     box-shadow: 0 0 99px 99px " + t["background-toolbar"] + `; }
`), t["background-loader"] && (i += ".loader-image { color: " + t["background-loader"] + `; }
`), t["background-normal"] && (i += `.custom-button-secondary-icon,
.custom-button-secondary,
.input-field-element,
.selectbox-search-input,
.selectbox-header,
.selectbox-dropdown,
.radio-visual, 
.checkbox-visual, 
.message { background-color: ` + t["background-normal"] + `; }
`), t["text-inverse"] && (i += ".custom-button-primary { color: " + t["text-inverse"] + `; }
`), t["border-regular-control"] && (i += `.custom-button-icon-only:active:not(.custom-button-disabled),
.custom-button-secondary-icon:active:not(.custom-button-disabled),
.custom-button-secondary:active:not(.custom-button-disabled),
.custom-button-icon-only:hover:not(.custom-button-disabled),
.custom-button-secondary-icon:hover:not(.custom-button-disabled),
.custom-button-secondary:hover:not(.custom-button-disabled),
.custom-button-secondary,
.custom-button-secondary-icon,
.input-field-element,
.checkbox-visual,
.radio-visual,
.selectbox-header,
.selectbox-dropdown,
.selectbox-search-input:focus,
.message { border-color: ` + t["border-regular-control"] + `; }
`, i += `.selectbox-search,
.selectbox-option-divider { border-color: ` + t["border-regular-control"] + ` !important; }
`), t["border-error"] && (i += ".input-field-invalid .input-field-element { border-color: " + t["border-error"] + `; }
`), t["border-control-focus"] && (i += `.custom-button-icon-only:focus:not(:active):not(:hover),
.custom-button-secondary-icon:focus:not(:active):not(:hover),
.custom-button-secondary:focus:not(:active):not(:hover),
.input-field-element:focus,
.input-field-focused .input-field-element,
.selectbox-header:active,
.selectbox-header:focus,
.selectbox-header-open { border-color: ` + t["border-control-focus"] + `; }
`), t["highlight-button-hover"] && (i += `.custom-button-icon-only:hover:not(.custom-button-disabled),
.custom-button-secondary-icon:hover:not(.custom-button-disabled),
.custom-button-secondary:hover:not(.custom-button-disabled),
.selectbox-custom-option:hover,
.selectbox-option:hover { background-color: ` + t["highlight-button-hover"] + `; }
`), t["highlight-button-pressed"] && (i += `.custom-button-icon-only:active:not(.custom-button-disabled),
.custom-button-secondary-icon:active:not(.custom-button-disabled),
.custom-button-secondary:active:not(.custom-button-disabled),
.selectbox-option-selected:hover,
.selectbox-option-selected { background-color: ` + t["highlight-button-pressed"] + `; }
`, i += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t["highlight-button-pressed"] + `; }
`), t["highlight-primary-dialog-button-hover"] && (i += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t["highlight-primary-dialog-button-hover"] + "; border-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`), t["background-primary-dialog-button"] && (i += `.checkbox-indeterminate,
.custom-button-primary { background-color: ` + t["background-primary-dialog-button"] + "; border-color: " + t["background-primary-dialog-button"] + `; }
`), t["background-toolbar-additional"] && (i += `.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled { background-color: ` + t["background-toolbar-additional"] + "; border-color: " + t["background-toolbar-additional"] + `; }
`), t["text-normal"] && (i += `.custom-button-secondary-icon,
.custom-button-secondary,
.custom-button-secondary-icon,
.custom-button-icon-only,
.selectbox-search-input,
.loader-image,
.input-field-element { color: ` + t["text-normal"] + `; }
`, i += ".input-field-search-icon svg { fill: " + t["text-normal"] + `; }
`, i += ".selectbox-arrow b { border-color: " + t["text-normal"] + `; }
`), t["text-secondary"] && (i += `.message-close:hover,
.input-field-clear:hover { color: ` + t["text-secondary"] + `; }
`), t["text-tertiary"] && (i += `.input-field-clear,
.message-container:hover .message-close,
.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled,
.input-field-element::placeholder,
.selectbox-search-input::placeholder { color: ` + t["text-tertiary"] + `; }
`);
    var n = "11px";
    ["theme-white", "theme-night"].indexOf(t.name) !== -1 || ["theme-white", "theme-night"].indexOf(t.Name) !== -1 ? (n = "12px", i += `.message,
.custom-button,
.selectbox-header,
.input-field-element { border-radius: 4px; }
`, i += `.radio--checked .radio-visual { border-width: 4px; }
`, i += ".checkbox-checkmark { color: " + t["text-inverse"] + `; }
`, i += ".checkbox--checked .checkbox-visual { background-color: " + t["background-primary-dialog-button"] + `; }
`, i += `.radio--checked .radio-visual,
.checkbox--checked .checkbox-visual { border-color: ` + t["background-primary-dialog-button"] + `; }
`, i += `.radio-button-container:hover:not(.radio--checked) .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: ` + t["highlight-button-hover"] + `; }
`, i += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; background-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`, i += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`, i += `body { font-size: 12px; }
`) : (i += ".checkbox-checkmark { color: " + t["text-normal"] + `; }
`, i += ".radio--checked .radio-visual { background-color: " + t["text-normal"] + `;
 box-shadow: 0 0 0 2px` + t["background-normal"] + ` inset; }
`, i += `.radio-button-container:hover .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: ` + t["border-control-focus"] + `; }
`), i += "body, input, textarea, select, button { font-size: " + n + `; }
`;
    var s = document.getElementById("componentsStyles");
    return s ? (s.innerHTML = i, i) : (s = document.createElement("style"), s.id = "componentsStyles", s.innerHTML = i, document.getElementsByTagName("head")[0].appendChild(s), i);
  },
  /**
   * @param {AscTheme} theme
   */
  fixThemeForIE: function(t) {
    return t["background-toolbar"] || (t["background-toolbar"] = "#f7f7f7"), t["text-normal"] || (t["text-normal"] = "rgb(51, 51, 51)"), t["text-secondary"] || (t["text-secondary"] = "#848484"), t["highlight-button-hover"] || (t["highlight-button-hover"] = "#e0e0e0"), t["background-normal"] || (t["background-normal"] = "white"), t["background-loader"] || (t["background-loader"] = "rgba(24, 24, 24, 0.9)"), t["highlight-button-pressed"] || (t["highlight-button-pressed"] = "#cbcbcb"), t["text-inverse"] || (t["text-inverse"] = "white"), t["border-regular-control"] || (t["border-regular-control"] = "#c0c0c0"), t["border-error"] || (t["border-error"] = "#f62211"), t["border-control-focus"] || (t["border-control-focus"] = "#848484"), t["highlight-primary-dialog-button-hover"] || (t["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t["background-primary-dialog-button"] || (t["background-primary-dialog-button"] = "#444444"), t["background-toolbar-additional"] || (t["background-toolbar-additional"] = "#efefef"), t["text-tertiary"] || (t["text-tertiary"] = "#bdbdbd"), t;
  }
};
function Ue() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
    var t = document.getElementById(e);
    if (!t) throw new Error("container ".concat(e, " not found"));
    return t;
  });
}
Ue.prototype.getRoute = function() {
  return this._currentRoute;
};
Ue.prototype._setCurrentRoute = function(e) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
};
Ue.prototype.openMain = function() {
  this._setCurrentRoute("main");
};
Ue.prototype.openLogin = function() {
  this._setCurrentRoute("login");
};
Ue.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
var rt = {
  restApiUrl: "https://api.zotero.org/",
  desktopApiUrl: "http://127.0.0.1:23119/api/"
}, Ft = {
  _done: !1,
  _desktop: !1,
  _hasPermission: !0,
  _online: !1,
  _hasKey: !1,
  _timeout: 1e3,
  // 1 second
  /** @type {function(AvailableApis): void} */
  _callback: function(t) {
  },
  _desktopVersion: (function() {
    if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return !1;
    if (window.location && window.location.protocol == "file:") return !0;
    var e = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
    return !!(e && e.indexOf("file:///") == 0);
  })(),
  /**
   * @param {ZoteroSdk} sdk
   * @returns
   */
  runApisChecker: function(t) {
    var i = this;
    i._done = !1;
    function n() {
      i._done || i._checkApiAvailable(t).then(function(s) {
        i._done || ((s.online && s.hasKey || s.desktop && s.hasPermission) && (i._done = !0), i._callback(s), setTimeout(n, i._timeout));
      });
    }
    return n(), {
      subscribe: function(r) {
        i._callback = r;
      },
      unsubscribe: function() {
        i._done = !0, i._callback = function() {
        };
      }
    };
  },
  /**
   * @param {ZoteroSdk} sdk
   * @returns
   */
  checkStatus: function(t) {
    return this._checkApiAvailable(t);
  },
  successfullyLoggedInUsingApiKey: function() {
    this._done = !0, this._callback({
      online: !0,
      hasKey: !0,
      desktop: this._desktop,
      hasPermission: this._hasPermission,
      desktopVersion: this._desktopVersion
    });
  },
  /**
   * @param {ZoteroSdk} sdk
   * @returns
   */
  _checkApiAvailable: function(t) {
    var i = this;
    return Promise.all([fetch(rt.restApiUrl, {
      method: "GET",
      cache: "no-cache"
    }).then(function(n) {
      return n.status === 200;
    }).catch(function() {
      return !1;
    }), i._sendDesktopRequest(rt.desktopApiUrl).then(function(n) {
      return i._hasPermission = n.hasPermission, n.isZoteroRunning;
    }).catch(function() {
      return !1;
    })]).then(function(n) {
      return i._online = n[0], i._desktop = n[1], i._hasKey = t.hasSettings(), {
        online: i._online,
        hasKey: i._hasKey,
        desktop: i._desktop,
        hasPermission: i._hasPermission,
        desktopVersion: i._desktopVersion
      };
    });
  },
  /**
   * @param {string} url
   * @returns
   */
  _sendDesktopRequest: function(t) {
    var i = this;
    return new Promise(function(n, s) {
      if (!i._desktopVersion) {
        n({
          hasPermission: !1,
          isZoteroRunning: !1
        });
        return;
      }
      window.AscSimpleRequest.createRequest({
        url: t,
        method: "GET",
        headers: {
          "Zotero-API-Version": "3",
          "User-Agent": "AscDesktopEditor"
        },
        complete: function(o) {
          var l = !1, h = !1;
          o.responseStatus == 403 ? (l = !1, h = !0) : o.responseStatus === 200 && (h = !0, l = !0), n({
            hasPermission: l,
            isZoteroRunning: h
          });
        },
        error: function(o) {
          o.statusCode == -102 && (o.statusCode = 404), s(o);
        }
      });
    });
  }
}, be = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet();
class Si {
  /**
   * @param {{maxRetries?: number, initialDelay?: number, maxDelay?: number, backoffFactor?: number, retryOn?: number[]}} options
   */
  constructor() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    ce(this, re), B(this, be, void 0), B(this, Lt, void 0), B(this, It, void 0), B(this, kt, void 0), B(this, gt, void 0), B(this, ot, void 0), B(this, Je, void 0), B(this, oe, void 0), B(this, De, void 0), B(this, He, void 0), x(be, this, t.maxRetries || 5), x(Lt, this, t.initialDelay || 1e3), x(It, this, t.maxDelay || 5e3), x(kt, this, t.backoffFactor || 2), x(gt, this, t.retryOn || [429, 502, 503, 504]), x(ot, this, 10), x(Je, this, 5e3), x(oe, this, []), x(De, this, 0), x(He, this, 0);
  }
  /**
   * @param {URL} url
   * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
   * @param {number} attempt
   * @returns {Promise<FetchResponse>}
   */
  fetchWithRetry(t, i, n) {
    var s = this;
    return E(function* () {
      try {
        yield c(re, s, xi).call(s);
        var r = yield fetch(t, {
          headers: i
        });
        if (r.ok)
          return r;
        if (a(gt, s).includes(r.status) && n < a(be, s)) {
          var o = c(re, s, Dt).call(s, n, r);
          return console.log("Attempt ".concat(n + 1, "/").concat(a(be, s), " failed with ").concat(r.status, ". Retrying in ").concat(o, "ms")), yield c(re, s, at).call(s, o), s.fetchWithRetry(t, i, n + 1);
        }
        throw new Error("".concat(r.status, " ").concat(r.statusText));
      } catch (u) {
        if (n >= a(be, s)) {
          var l = "";
          throw u instanceof Error && (l = u.message), new Error("Request failed after ".concat(a(be, s), " attempts: ").concat(l));
        }
        if (n < a(be, s)) {
          var h = c(re, s, Dt).call(s, n);
          return console.log("Network error on attempt ".concat(n + 1, ". Retrying in ").concat(h, "ms")), yield c(re, s, at).call(s, h), s.fetchWithRetry(t, i, n + 1);
        }
        throw u;
      }
    })();
  }
  resetCounter() {
    x(oe, this, []), x(De, this, 0), x(He, this, 0);
  }
}
function qt() {
  var e = Date.now();
  x(oe, this, a(oe, this).filter((t) => e - t < a(Je, this)));
}
function xi() {
  return Et.apply(this, arguments);
}
function Et() {
  return Et = E(function* () {
    var e;
    if (c(re, this, qt).call(this), a(oe, this).length >= a(ot, this)) {
      var t = a(oe, this)[0], i = Date.now() - t;
      if (i < a(Je, this)) {
        var n = 500 * a(oe, this).length - a(ot, this);
        n < 0 && (n = 0, console.warn("Wait time is less than 0")), console.log("Rate limit prevention: ".concat(a(oe, this).length, " requests in last ").concat(a(Je, this), "ms. Waiting ").concat(n, "ms...")), yield c(re, this, at).call(this, n), c(re, this, qt).call(this);
      }
    }
    a(oe, this).push(Date.now()), x(De, this, (e = a(De, this), e++, e));
    var s = Date.now(), r = s - a(He, this), o = 100;
    r < o && a(He, this) > 0 && (yield c(re, this, at).call(this, o - r)), x(He, this, Date.now());
  }), Et.apply(this, arguments);
}
function Dt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i = t == null ? void 0 : t.headers.get("Retry-After");
  if (i) {
    var n = parseInt(i);
    if (n > 86400) {
      var s = parseInt(i) * 1e3;
      return Math.max(0, s - Date.now());
    }
    return n * 1e3;
  }
  var r = a(Lt, this) * Math.pow(a(kt, this), e), o = Math.random() * 1e3;
  return Math.min(r + o, a(It, this));
}
function at(e) {
  return new Promise((t) => setTimeout(t, e));
}
var H = function() {
  this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = !0, this._fetcher = new Si({
    maxRetries: 5,
    initialDelay: 5e3
  });
};
H.prototype.ZOTERO_API_VERSION = "3";
H.prototype.USER_AGENT = "AscDesktopEditor";
H.prototype.DEFAULT_FORMAT = "csljson";
H.prototype.STORAGE_KEYS = {
  USER_ID: "zoteroUserId",
  API_KEY: "zoteroApiKey"
};
H.prototype.API_PATHS = {
  USERS: "users",
  GROUPS: "groups",
  ITEMS: "items",
  KEYS: "keys"
};
H.prototype._getBaseUrl = function() {
  return this._isOnlineAvailable ? rt.restApiUrl : rt.desktopApiUrl;
};
H.prototype._getDesktopRequest = function(e) {
  var t = this;
  return new Promise(function(i, n) {
    window.AscSimpleRequest.createRequest({
      url: e,
      method: "GET",
      headers: {
        "Zotero-API-Version": t.ZOTERO_API_VERSION,
        "User-Agent": t.USER_AGENT
      },
      complete: i,
      error: function(r) {
        r.statusCode === -102 && (r.statusCode = 404, r.message = "Connection to Zotero failed. Make sure Zotero is running"), n(r);
      }
    });
  });
};
H.prototype._getOnlineRequest = function(e) {
  var t = {
    "Zotero-API-Version": this.ZOTERO_API_VERSION,
    "Zotero-API-Key": this._apiKey || ""
  };
  return fetch(e, {
    headers: t
  }).then(function(i) {
    if (!i.ok) {
      var n = i.status + " " + i.statusText;
      throw console.error(n), new Error(n);
    }
    return i;
  }).catch(function(i) {
    throw typeof i == "object" && (i.message = "Connection to Zotero failed"), i;
  });
};
H.prototype._getRequestWithOfflineSupport = function(e) {
  return this._isOnlineAvailable ? this._getOnlineRequest(e) : this._getDesktopRequest(e.href);
};
H.prototype._buildGetRequest = function(e, t) {
  t = t || {};
  var i = new URL(e, this._getBaseUrl());
  return Object.keys(t).forEach(function(n) {
    t[n] !== void 0 && t[n] !== null && i.searchParams.append(n, t[n]);
  }), this._getRequestWithOfflineSupport(i);
};
H.prototype._parseLinkHeader = function(e) {
  var t = {}, i = /<(.*?)>; rel="(.*?)"/g;
  if (!e) return t;
  for (var n; (n = i.exec(e.trim())) !== null; )
    t[n[2]] = n[1];
  return t;
};
H.prototype._parseDesktopItemsResponse = function(e, t) {
  return e.then(function(i) {
    return {
      items: JSON.parse(i.responseText),
      id: t
    };
  });
};
H.prototype._parseItemsResponse = function(e, t) {
  var i = this;
  return e.then(function(n) {
    return Promise.all([n.json(), n]);
  }).then(function(n) {
    var s = n[0], r = n[1], o = i._parseLinkHeader(r.headers.get("Link") || ""), l = {
      items: s,
      id: t
    };
    return typeof s == "object" && s.items && (l.items = s.items), o.next && (l.next = function() {
      return i._parseItemsResponse(i._getOnlineRequest(new URL(o.next)), t);
    }), l;
  });
};
H.prototype._parseResponse = function(e, t) {
  if (this._isOnlineAvailable) {
    var i = (
      /** @type {Promise<FetchResponse>} */
      e
    );
    return this._parseItemsResponse(i, t);
  } else {
    var n = (
      /** @type {Promise<AscSimpleResponse>} */
      e
    );
    return this._parseDesktopItemsResponse(
      /** @type {Promise<AscSimpleResponse>} */
      n,
      t
    );
  }
};
H.prototype.getItems = function(e, t, i) {
  var n = this;
  i = i || n.DEFAULT_FORMAT;
  var s = {
    format: i,
    itemType: "-attachment"
    // skip attachments (pdf, docx, etc.)
  };
  e ? s.q = e : t ? s.itemKey = t.join(",") : (s.limit = 20, this._isOnlineAvailable || (s.format = "json"));
  var r = n.API_PATHS.USERS + "/" + n._userId + "/" + n.API_PATHS.ITEMS, o = n._buildGetRequest(r, s);
  return n._parseResponse(o, n._userId);
};
H.prototype.getGroupItems = function(e, t, i, n) {
  var s = this;
  n = n || s.DEFAULT_FORMAT;
  var r = (
    /** @type {{format: string, q?: string, itemKey?: string}} */
    {
      format: n
    }
  );
  e ? r.q = e : i && (r.itemKey = i.join(","));
  var o = s.API_PATHS.GROUPS + "/" + t + "/" + s.API_PATHS.ITEMS, l = s._buildGetRequest(o, r);
  return s._parseResponse(l, t);
};
H.prototype.getUserGroups = function() {
  var e = this;
  return new Promise(function(t, i) {
    if (e._userGroups.length > 0) {
      t(e._userGroups);
      return;
    }
    var n = e.API_PATHS.USERS + "/" + e._userId + "/groups";
    e._buildGetRequest(n).then(function(s) {
      if (e._isOnlineAvailable) {
        var r = (
          /** @type {FetchResponse} */
          s
        );
        if (!r.ok)
          throw new Error(r.status + " " + r.statusText);
        return r.json();
      }
      var o = (
        /** @type {AscSimpleResponse} */
        s
      );
      return JSON.parse(o.responseText);
    }).then(function(s) {
      e._userGroups = s.map(function(r) {
        return {
          id: r.id,
          name: r.data.name
        };
      }), t(e._userGroups);
    }).catch(i);
  });
};
H.prototype.setApiKey = function(e) {
  var t = this, i = this.API_PATHS.KEYS + "/" + e;
  return this._buildGetRequest(i).then(function(n) {
    var s = (
      /** @type {FetchResponse} */
      n
    );
    if (!s.ok)
      throw new Error(s.status + " " + s.statusText);
    return s.json();
  }).then(function(n) {
    return t._saveSettings(n.userID, e), !0;
  });
};
H.prototype._applySettings = function(e, t) {
  this._userId = e, this._apiKey = t;
};
H.prototype._saveSettings = function(e, t) {
  this._applySettings(e, t), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(e)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, t);
};
H.prototype.hasSettings = function() {
  var e = localStorage.getItem(this.STORAGE_KEYS.USER_ID), t = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
  return e && t ? (this._applySettings(Number(e), t), !0) : !1;
};
H.prototype.clearSettings = function() {
  localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
};
H.prototype.getUserId = function() {
  return this._userId;
};
H.prototype.setIsOnlineAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function Ee(e, t) {
  var i = this;
  if (t = t || {}, typeof e == "string") {
    var n = document.getElementById(e);
    n instanceof HTMLInputElement && (e = n);
  }
  if (e instanceof HTMLInputElement)
    this.input = e;
  else
    throw new Error("Invalid input element");
  this._container = document.createElement("div"), this._options = {
    type: t.type || e.type || "text",
    placeholder: t.placeholder || e.placeholder || "",
    value: t.value || e.value || "",
    autofocus: t.autofocus || !1,
    disabled: t.disabled || !1,
    readonly: t.readonly || !1,
    required: t.required || !1,
    showCounter: t.showCounter || !1,
    showClear: t.showClear !== void 0 ? t.showClear : !0,
    autocomplete: t.autocomplete || "off"
  };
  for (var s in t)
    this._options.hasOwnProperty(s) || (this._options[s] = t[s]);
  this._id = e.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = !1, this.isValid = !0, this._validationMessage = "", this._subscribers = [], this._boundHandles = {
    focus: function(o) {
      i._handleFocus(o);
    },
    blur: function(o) {
      i._handleBlur(o);
    },
    input: function(o) {
      i._handleInput(o);
    },
    keydown: function(o) {
      i._handleKeydown(o);
    },
    clear: function() {
      i.clear();
    },
    validate: function() {
      i.validate();
    }
  }, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), this._options.type === "search" && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(/* @__PURE__ */ (function(r) {
    return function() {
      r.focus();
    };
  })(this), 100);
}
Ee.prototype = {
  constructor: Ee,
  /** @type {HTMLInputElement} */
  // @ts-ignore
  input: null,
  /** @type {HTMLElement} */
  // @ts-ignore
  _container: null,
  /** @type {InputOptionsType} */
  _options: {},
  _id: "",
  isFocused: !1,
  isValid: !0,
  _validationMessage: "",
  /** @type {Function[]} */
  _subscribers: [],
  /** @type {InputBoundHandlesType} */
  // @ts-ignore
  _boundHandles: null,
  /** @type {HTMLButtonElement | null} */
  _clearButton: null,
  /** @type {HTMLDivElement | null} */
  _counter: null,
  /** @type {HTMLSpanElement | null} */
  _counterCurrent: null,
  /** @type {HTMLSpanElement | null} */
  _counterMax: null,
  /** @type {HTMLDivElement} */
  // @ts-ignore
  _validationElement: null,
  /**
   * @private
   */
  _createDOM: function() {
    var t = this.input.parentNode, i = document.createDocumentFragment();
    i.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
    var n = document.createElement("div");
    this._container.appendChild(n), n.className += " input-field", this._options.disabled && (n.className += " input-field-disabled");
    var s = document.createElement("div");
    if (n.appendChild(s), s.className += " input-field-main", this.input.className += " input-field-element i18n", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = !0), this._options.readonly && (this.input.readOnly = !0), this._options.required && (this.input.required = !0), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
      this._counter = document.createElement("div"), n.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
      var r = document.createElement("span");
      r.textContent = "/", this._counter.appendChild(r), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
    }
    n.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', s.appendChild(this._searchIcon)), t && t.insertBefore(i, this.input), s.appendChild(this.input);
  },
  /**
   * @private
   */
  _bindEvents: function() {
    this.input.addEventListener("focus", this._boundHandles.focus), this.input.addEventListener("blur", this._boundHandles.blur), this.input.addEventListener("input", this._boundHandles.input), this.input.addEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.addEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.addEventListener("click", this._boundHandles.search), this.input.addEventListener("change", this._boundHandles.validate);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleFocus: function(t) {
    this.isFocused = !0, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(t);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleBlur: function(t) {
    this.isFocused = !1;
    for (var i = this._container.className.split(" "), n = [], s = 0; s < i.length; s++)
      i[s] !== "input-field-focused" && n.push(i[s]);
    this._container.className = n.join(" "), this.validate(), this._triggerBlurEvent(t);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleInput: function(t) {
    this._updateClearButton(), this._updateCounter(), this._triggerInputEvent(t);
  },
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown: function(t) {
    var i = t.key || t.keyCode;
    (i === "Escape" || i === 27) && this._options.showClear && (this.clear(), t.preventDefault()), (i === "Enter" || i === 13) && this._triggerSubmit();
  },
  /**
   * @private
   */
  _updateClearButton: function() {
    if (this._clearButton) {
      var t = this.input.value.length > 0;
      this._clearButton.style.display = t ? "block" : "none";
    }
  },
  /**
   * @private
   */
  _updateCounter: function() {
    if (this._counter && this._options.maxLength) {
      var t = this.input.value.length, i = this._options.maxLength;
      if (this._counterCurrent && (this._counterCurrent.textContent = String(t)), this._counterMax && (this._counterMax.textContent = String(i)), t > i * 0.9) {
        var n = this._counter.className.split(" ");
        n.indexOf("input-field-counter-warning") === -1 && (this._counter.className += " input-field-counter-warning");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(s) {
          return s !== "input-field-counter-warning";
        }).join(" ");
      if (t > i) {
        var n = this._counter.className.split(" ");
        n.indexOf("input-field-counter-error") === -1 && (this._counter.className += " input-field-counter-error");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(s) {
          return s !== "input-field-counter-error";
        }).join(" ");
    }
  },
  validate: function() {
    if (!this._options.validation)
      return this.isValid = !0, !0;
    var t = this.input.value, i = !0, n = "";
    if (this._options.required && !t.trim() ? (i = !1, n = "This field is required") : this._options.minLength && t.length < this._options.minLength ? (i = !1, n = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && t.length > this._options.maxLength ? (i = !1, n = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(t) && (i = !1, n = "Invalid format"), i && typeof this._options.validation == "function") {
      var s = this._options.validation(t);
      s && !s.isValid && (i = !1, n = s.message || "Invalid value");
    }
    return this.isValid = i, this._validationMessage = n, this.updateValidationState(), i;
  },
  updateValidationState: function() {
    if (this.isValid)
      if (this.input.value.length > 0) {
        this._validationElement.style.display = "none";
        var t = this._container.className.split(" ");
        t.indexOf("input-field-valid") === -1 && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(n) {
          return n !== "input-field-invalid";
        }).join(" ");
      } else
        this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(i) {
          return i !== "input-field-valid" && i !== "input-field-invalid";
        }).join(" ");
    else {
      this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block";
      var t = this._container.className.split(" ");
      t.indexOf("input-field-invalid") === -1 && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(i) {
        return i !== "input-field-valid";
      }).join(" ");
    }
  },
  /**
   * @private
   */
  _updateState: function() {
    this._updateClearButton(), this._updateCounter(), this.validate();
  },
  // Public API
  getValue: function() {
    return this.input.value.trim();
  },
  /**
   * @param {string} value
   */
  setValue: function(t) {
    this.input.value = t, this._updateState(), this._triggerChange();
  },
  /**
   * @param {string} value
   */
  setPlaceholder: function(t) {
    this.input.placeholder = t, this._options.placeholder = t;
  },
  /**
   * @param {boolean} [bFocus]
   */
  clear: function(t) {
    t = t !== void 0 ? t : !0, this.setValue(""), t && this.input.focus();
  },
  focus: function() {
    this.input.focus();
  },
  blur: function() {
    this.input.blur();
  },
  enable: function() {
    this.input.disabled = !1, this._options.disabled = !1, this._container.className = this._container.className.split(" ").filter(function(t) {
      return t !== "input-field-disabled";
    }).join(" ");
  },
  disable: function() {
    this.input.disabled = !0, this._options.disabled = !0;
    var t = this._container.className.split(" ");
    t.indexOf("input-field-disabled") === -1 && (this._container.className += " input-field-disabled");
  },
  /**
   * @param {function(InputEventType): void} callback
   * @returns {Object}
   */
  subscribe: function(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== t;
        });
      }
    };
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerInputEvent: function(t) {
    var i = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "inputfield:input",
        detail: i
      });
    });
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerFocusEvent: function(t) {
    var i = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "inputfield:focus",
        detail: i
      });
    });
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerBlurEvent: function(t) {
    var i = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "inputfield:blur",
        detail: i
      });
    });
  },
  /**
   * @private
   */
  _triggerChange: function() {
    var t = {
      value: this.input.value,
      isValid: this.isValid
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:change",
        detail: t
      });
    });
  },
  /**
   * @private
   */
  _triggerSubmit: function() {
    var t = {
      value: this.input.value,
      isValid: this.isValid
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:submit",
        detail: t
      });
    });
  },
  destroy: function() {
    if (this._subscribers = [], this._boundHandles)
      try {
        this.input.removeEventListener("focus", this._boundHandles.focus), this.input.removeEventListener("blur", this._boundHandles.blur), this.input.removeEventListener("input", this._boundHandles.input), this.input.removeEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.removeEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.removeEventListener("click", this._boundHandles.search), this.input.removeEventListener("change", this._boundHandles.validate);
      } catch (t) {
        console.error(t);
      }
    this._container.innerHTML = "", this._container.className = this._container.className.split(" ").filter(function(t) {
      return t !== "input-field-container";
    }).join(" ");
  }
};
function Ve(e, t) {
  if (typeof e == "string") {
    var i = document.getElementById(e);
    i instanceof HTMLElement && (e = i);
  }
  if (e instanceof HTMLElement)
    this.container = e;
  else
    throw new Error("Invalid container element");
  this._options = Object.assign(this._options, t), this._isShow = !1;
}
Ve.prototype = {
  constructor: Ve,
  _options: {
    type: "info",
    text: "",
    title: "",
    duration: 0,
    closeButton: !0,
    autoClose: !1,
    closeOnClickOutside: !0
  },
  /**
   * @type {null | function(MouseEvent): void}
   * @private
   */
  _outsideClickListener: null,
  /**
   * @type {null | HTMLElement}
   * @private
   */
  _element: null,
  /**
   * @type {null | number}
   * @private
   */
  _timeoutId: null,
  /**
   * @returns {HTMLElement}
   * @private
   */
  _create: function() {
    var t = document.createElement("div");
    t.className = "message message-" + this._options.type, t.setAttribute("role", "alert");
    var i = this._options.title;
    if (!i)
      switch (i = "Error", this._options.type) {
        case "success":
          i = "Success";
          break;
        case "warning":
          i = "Warning";
          break;
        case "info":
          i = "Information";
          break;
      }
    var n = this._options.text;
    if (!n)
      switch (n = "", this._options.type) {
        case "success":
          n = "Operation completed successfully.";
          break;
        case "warning":
          n = "Please be cautious.";
          break;
        case "error":
          n = "Something went wrong.";
          break;
      }
    if (t.innerHTML = '<div class="message-content"><span class="message-title">' + i + '</span><span class="message-text">' + n + "</span></div>", this._options.closeButton) {
      var s = document.createElement("button");
      s.className = "message-close", s.textContent = "×", s.setAttribute("aria-label", "Close"), s.onclick = this.close.bind(this), t.appendChild(s);
    }
    return t;
  },
  addOutsideClickListener: function() {
    this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
    var t = this;
    this._outsideClickListener = function(i) {
      i.target instanceof HTMLElement && t._element && !t._element.contains(i.target) && t.close();
    }, setTimeout(function() {
      t._outsideClickListener && document.addEventListener("click", t._outsideClickListener);
    }, 10);
  },
  removeOutsideClickListener: function() {
    this._outsideClickListener && (document.removeEventListener("click", this._outsideClickListener), this._outsideClickListener = null);
  },
  /**
   * @param {string} [text]
   * @param {string} [title]
   * @returns
   */
  show: function(t, i) {
    if (this._isShow)
      return this;
    this._isShow = !0, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), i && (this._options.title = i), t && (this._options.text = t);
    var n = this._create();
    return this._element = n, this.container.appendChild(n), setTimeout(function() {
      n.style.opacity = "1", n.style.transform = "translateY(0)";
    }, 10), this._options.autoClose && Number(this._options.duration) > 0 && (this._timeoutId = setTimeout(this.close.bind(this), this._options.duration)), this._options.closeOnClickOutside && this.addOutsideClickListener(), this;
  },
  close: function() {
    if (this._isShow = !1, !(!this._element || !this._element.parentNode)) {
      this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null), this.removeOutsideClickListener();
      var t = this._element;
      t.style.opacity = "0", t.style.transform = "translateY(-20px)", setTimeout(function() {
        t.parentNode && t.parentNode.removeChild(t);
      }, 300);
    }
  }
};
function X(e, t) {
  var i = this;
  if (typeof e == "string") {
    var n = document.getElementById(e);
    n instanceof HTMLButtonElement && (e = n);
  }
  if (e instanceof HTMLButtonElement)
    this._button = e;
  else
    throw new Error("Invalid button");
  this._container = document.createElement("div"), this._options = t || {}, this._options.text = this._options.text || e.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = !1, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = {
    click: function(r) {
      i._handleClick(r);
    },
    mouseenter: function() {
      i._handleMouseEnter();
    },
    mouseleave: function() {
      i._handleMouseLeave();
    },
    focus: function() {
      i._handleFocus();
    },
    blur: function() {
      i._handleBlur();
    },
    keydown: function(r) {
      i._handleKeydown(r);
    }
  }, this._createDOM(), this._bindEvents(), this.updateState();
}
X.prototype = /** @lends Button.prototype */
{
  constructor: X,
  /**
   * @type {HTMLButtonElement}
   */
  // @ts-ignore
  _button: null,
  /**
   * @type {HTMLSpanElement | null}
   * @private
   */
  _buttonText: null,
  /**
   * @type {HTMLSpanElement | null}
   * @private
   */
  _spinner: null,
  /**
   * @private
   * @type {HTMLSpanElement | null}
   */
  _badgeElement: null,
  /**
   * @private
   */
  _createDOM: function() {
    var t = this._button.parentNode, i = document.createDocumentFragment();
    if (i.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = !0), this._options.text)
      if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
        var n = document.createElement("span");
        n.className = "custom-button-icon", this._options.iconPosition === "left" ? (n.className += " custom-button-icon-left", this._button.appendChild(n), this._button.appendChild(this._buttonText)) : (n.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n)), n.innerHTML = this._options.icon;
      } else
        this._button.appendChild(this._buttonText);
    this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), t && t.insertBefore(i, this._button), this._container.appendChild(this._button);
  },
  /** @private */
  _bindEvents: function() {
    this._button.addEventListener("click", this._boundHandles.click), this._button.addEventListener("mouseenter", this._boundHandles.mouseenter), this._button.addEventListener("mouseleave", this._boundHandles.mouseleave), this._button.addEventListener("focus", this._boundHandles.focus), this._button.addEventListener("blur", this._boundHandles.blur), this._button.addEventListener("keydown", this._boundHandles.keydown);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleClick: function(t) {
    if (this._options.disabled || this.isLoading) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.triggerClickEvent(t);
  },
  /** @private */
  _handleMouseEnter: function() {
    var t = this._button.className.split(" ");
    t.indexOf("custom-button-hover") === -1 && (this._button.className += " custom-button-hover"), this.triggerEvent("mouseenter");
  },
  /** @private */
  _handleMouseLeave: function() {
    this._button.className = this._button.className.split(" ").filter(function(t) {
      return t !== "custom-button-hover";
    }).join(" "), this.triggerEvent("mouseleave");
  },
  /** @private */
  _handleFocus: function() {
    var t = this._button.className.split(" ");
    t.indexOf("custom-button-focused") === -1 && (this._button.className += " custom-button-focused"), this.triggerEvent("focus");
  },
  /** @private */
  _handleBlur: function() {
    this._button.className = this._button.className.split(" ").filter(function(t) {
      return t !== "custom-button-focused";
    }).join(" "), this.triggerEvent("blur");
  },
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown: function(t) {
    var i = t.key || t.keyCode;
    i === " " || i === "Enter" || i === 32 || i === 13 ? this._button.tagName === "BUTTON" || (t.preventDefault(), this._button.click()) : (i === "Escape" || i === 27) && this._button.blur(), this.triggerEvent("keydown", {
      key: i
    });
  },
  /** @param {function(InputEventType): void} callback */
  subscribe: function(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== t;
        });
      }
    };
  },
  /** @param {ButtonOptionsType['text']} text */
  setText: function(t) {
    typeof t > "u" || (this._options.text = t, this._buttonText || (this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = "", this._button.appendChild(this._buttonText)), this._buttonText.textContent = t);
  },
  /**
   * @param {string} icon
   * @param {ButtonOptionsType['iconPosition']} position
   */
  setIcon: function(t, i) {
    this._options.icon = t, this._options.iconPosition = i || "left";
  },
  /** @param {ButtonOptionsType['badge']} badge */
  setBadge: function(t) {
    typeof t > "u" || (this._options.badge = t, this._badgeElement && (this._badgeElement.textContent = t, this._badgeElement.style.display = t ? "flex" : "none"));
  },
  /** @param {ButtonOptionsType['variant']} variant */
  setVariant: function(t) {
    if (!(typeof t > "u")) {
      var i = "custom-button-" + this._options.variant, n = "custom-button-" + t;
      this._button.className = this._button.className.split(" ").filter(function(s) {
        return s !== i;
      }).join(" ") + " " + n, this._options.variant = t;
    }
  },
  /** @param {ButtonOptionsType['size']} size */
  setSize: function(t) {
    if (!(typeof t > "u")) {
      var i = "custom-button-" + this._options.size, n = "custom-button-" + t;
      this._button.className = this._button.className.split(" ").filter(function(s) {
        return s !== i;
      }).join(" ") + " " + n, this._options.size = t;
    }
  },
  enable: function() {
    this._options.disabled = !1, this._button.disabled = !1, this._button.className = this._button.className.split(" ").filter(function(t) {
      return t !== "custom-button-disabled";
    }).join(" ");
  },
  disable: function() {
    this._options.disabled = !0, this._button.disabled = !0;
    var t = this._button.className.split(" ");
    t.indexOf("custom-button-disabled") === -1 && (this._button.className += " custom-button-disabled");
  },
  startLoading: function() {
    this.isLoading = !0, typeof this._options.text < "u" && (this._originalText = this._options.text);
    var t = this._container.className.split(" ");
    t.indexOf("custom-button-loading") === -1 && (this._container.className += " custom-button-loading"), this._spinner && (this._spinner.style.display = "inline-block"), this._buttonText && (this._buttonText.textContent = "Loading..."), this._button.disabled = !0;
  },
  stopLoading: function() {
    this.isLoading = !1, this._container.className = this._container.className.split(" ").filter(function(t) {
      return t !== "custom-button-loading";
    }).join(" "), this._spinner && (this._spinner.style.display = "none"), this._buttonText && (this._buttonText.textContent = this._originalText), this._button.disabled = !!this._options.disabled;
  },
  /** @param {ButtonOptionsType['tooltip']} tooltip */
  setTooltip: function(t) {
    typeof t > "u" || (this._options.tooltip = t, this._button.title = t || "");
  },
  /** @param {Event} e */
  triggerClickEvent: function(t) {
    var i = {
      originalEvent: t,
      button: this
    };
    this._subscribers.forEach(function(n) {
      n({
        type: "button:click",
        detail: i
      });
    });
  },
  /**
   * @param {"click"|"keydown" | "mouseenter" | "mouseleave" | "focus" | "blur"} eventName
   * @param {any} [detail]
   */
  triggerEvent: function(t, i) {
    i = i || {}, i.button = this, this._subscribers.forEach(function(n) {
      n({
        type: "button:" + t,
        detail: i
      });
    });
  },
  updateState: function() {
    this._options.disabled ? this.disable() : this.enable(), this._options.loading && this.startLoading();
  },
  destroy: function() {
    if (this._subscribers = [], this._boundHandles)
      try {
        this._button.removeEventListener("click", this._boundHandles.click), this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter), this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave), this._button.removeEventListener("focus", this._boundHandles.focus), this._button.removeEventListener("blur", this._boundHandles.blur), this._button.removeEventListener("keydown", this._boundHandles.keydown);
      } catch (i) {
        console.error(i);
      }
    this._container.innerHTML = "";
    var t = this._container.className.split(" ").filter(function(i) {
      return i !== "custom-button-container";
    }).join(" ");
    this._container.className = t;
  }
};
var N = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), Ie = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), te = /* @__PURE__ */ new WeakSet();
class Zt {
  /**
   * Create a Radio instance
   * @constructor
   * @param {string | HTMLInputElement} radio
   * @param {RadioOptionsType} options
   * @throws {Error} If invalid input element
   */
  constructor(t, i) {
    if (ce(this, te), B(this, N, void 0), B(this, W, void 0), B(this, Ze, void 0), B(this, j, null), B(this, S, void 0), B(this, Ie, /* @__PURE__ */ new Map()), B(this, Me, []), typeof t == "string") {
      var n = document.getElementById(t);
      n instanceof HTMLInputElement && (t = n);
    }
    if (!(t instanceof HTMLInputElement))
      throw new Error("Invalid input element");
    if (x(W, this, t), x(S, this, Object.assign({
      id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
      checked: !1,
      disabled: !1,
      indeterminate: !1,
      label: "",
      name: "",
      value: "on"
    }, i)), c(te, this, Ci).call(this), x(N, this, document.createElement("div")), x(Ze, this, document.createElement("span")), c(te, this, Ai).call(this), c(te, this, Li).call(this), c(te, this, yt).call(this), !a(S, this).name)
      throw new Error("Name attribute is required");
    var s = Be._.get(a(S, this).name);
    s || (s = new Array(), Be._.set(a(S, this).name, s)), s.push(this);
  }
  /**
   * @param {function(RadioEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return a(Me, this).push(t), {
      unsubscribe: function() {
        x(Me, i, a(Me, i).filter(function(s) {
          return s !== t;
        }));
      }
    };
  }
  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return a(N, this);
  }
  /** @param {boolean} [bSilent] */
  check(t) {
    if (!(a(S, this).disabled || a(S, this).checked)) {
      if (a(S, this).name) {
        var i = Be._.get(a(S, this).name);
        i && i.forEach((n) => {
          n !== this && a(S, n).checked && n.uncheck();
        });
      }
      a(S, this).checked = !0, c(te, this, yt).call(this), !t && c(te, this, Jt).call(this);
    }
  }
  /** @param {boolean} [bSilent] */
  uncheck(t) {
    a(S, this).disabled || !a(S, this).checked || (a(S, this).checked = !1, c(te, this, yt).call(this), !t && c(te, this, Jt).call(this));
  }
  enable() {
    a(S, this).disabled && (a(S, this).disabled = !1, a(W, this).disabled = !1, a(N, this).setAttribute("aria-disabled", "false"), a(S, this).checked ? a(N, this).tabIndex = 0 : c(te, this, Bt).call(this), a(N, this).classList.remove("radio--disabled"));
  }
  disable() {
    a(S, this).disabled || (a(S, this).disabled = !0, a(W, this).disabled = !0, a(N, this).setAttribute("aria-disabled", "true"), a(N, this).tabIndex = -1, a(N, this).classList.add("radio--disabled"));
  }
  /** @param {string} label */
  setLabel(t) {
    a(S, this).label = t, a(j, this) ? a(j, this).textContent = t : t && (x(j, this, document.createElement("label")), a(j, this).className = "radio-label", a(j, this).htmlFor = String(a(S, this).id), a(j, this).textContent = t, a(N, this).appendChild(a(j, this)));
  }
  /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
  getState() {
    return {
      checked: !!a(S, this).checked,
      disabled: !!a(S, this).disabled,
      value: a(S, this).value || "",
      name: a(S, this).name || ""
    };
  }
  destroy() {
    if (x(Me, this, []), !!a(S, this).name) {
      var t = Be._.get(a(S, this).name);
      if (t) {
        var i = t.indexOf(this);
        i >= 0 && t.splice(i, 1);
      }
      a(Ie, this).forEach((n, s) => {
        a(N, this).removeEventListener(s, n);
      }), a(Ie, this).clear(), a(N, this) && a(N, this).parentNode && a(N, this).parentNode.removeChild(a(N, this)), x(j, this, null);
    }
  }
}
function Ci() {
  a(W, this).type = "radio";
  var e = a(W, this).getAttribute("id"), t = a(W, this).getAttribute("name"), i = a(W, this).getAttribute("value"), n = a(W, this).getAttribute("checked"), s = a(W, this).getAttribute("disabled");
  e !== null ? a(S, this).id = e : a(S, this).id && a(W, this).setAttribute("id", a(S, this).id), t !== null ? a(S, this).name = t : a(S, this).name && a(W, this).setAttribute("name", a(S, this).name), i !== null ? a(S, this).value = i : a(S, this).value && a(W, this).setAttribute("value", a(S, this).value), n !== null ? a(S, this).checked = n === "true" : a(S, this).checked && a(W, this).setAttribute("checked", "true"), s !== null ? a(S, this).disabled = s === "true" : a(S, this).disabled && a(W, this).setAttribute("disabled", "true");
}
function Ai() {
  var e = a(W, this).parentNode, t = document.createDocumentFragment();
  t.appendChild(a(N, this)), a(N, this).classList.add("radio-button-container"), a(N, this).setAttribute("role", "radio"), a(N, this).setAttribute("aria-checked", String(!!a(S, this).checked)), a(N, this).setAttribute("aria-disabled", String(!!a(S, this).disabled)), a(N, this).tabIndex = a(S, this).disabled ? -1 : 0, a(Ze, this).className = "radio-visual", a(Ze, this).setAttribute("aria-hidden", "true"), a(S, this).label && (x(j, this, document.createElement("label")), a(j, this).className = "i18n radio-label", a(j, this).htmlFor = String(a(S, this).id), a(j, this).textContent = a(S, this).label), a(S, this).disabled && a(N, this).classList.add("radio--disabled"), e && e.insertBefore(t, a(W, this)), a(N, this).appendChild(a(W, this)), a(N, this).appendChild(a(Ze, this)), a(j, this) && a(N, this).appendChild(a(j, this)), c(te, this, Bt).call(this);
}
function Bt() {
  if (a(S, this).checked)
    a(N, this).tabIndex = a(S, this).disabled ? -1 : 0;
  else if (a(S, this).name && Be._.has(a(S, this).name)) {
    var e = Be._.get(a(S, this).name), t = !1;
    e && e.forEach((i) => {
      a(S, i).checked && i !== this && (t = !0);
    }), !t && !a(S, this).checked && !a(S, this).disabled ? a(N, this).tabIndex = 0 : a(N, this).tabIndex = -1;
  }
}
function Li() {
  var e = (s) => {
    s.preventDefault(), !a(S, this).disabled && !a(S, this).checked && (this.check(), a(N, this).focus());
  }, t = (s) => {
    if (!a(S, this).disabled)
      switch (s.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          s.preventDefault(), a(S, this).checked || this.check();
          break;
      }
  }, i = () => {
    a(N, this).classList.add("radio--focused");
  }, n = () => {
    a(N, this).classList.remove("radio--focused");
  };
  a(Ie, this).set("click", e), a(Ie, this).set("keydown", t), a(Ie, this).set("focus", i), a(Ie, this).set("blur", n), a(N, this).addEventListener("click", e), a(N, this).addEventListener("keydown", t), a(N, this).addEventListener("focus", i), a(N, this).addEventListener("blur", n);
}
function yt() {
  a(N, this).setAttribute("aria-checked", String(!!a(S, this).checked)), a(N, this).classList.toggle("radio--checked", a(S, this).checked), a(W, this).checked = !!a(S, this).checked, c(te, this, Bt).call(this);
}
function Jt(e) {
  var t = this.getState(), i = {
    type: "radio:change",
    detail: t
  };
  e && (i.originalEvent = e), a(Me, this).forEach(function(n) {
    n(i);
  });
}
var Be = {
  _: /* @__PURE__ */ new Map()
};
function lt(e, t) {
  if (typeof e == "string") {
    var i = document.getElementById(e);
    i instanceof HTMLInputElement && (e = i);
  }
  if (!(e instanceof HTMLInputElement))
    throw new Error("Invalid input element");
  this._options = Object.assign({
    id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
    checked: !1,
    disabled: !1,
    indeterminate: !1,
    label: "",
    name: "",
    value: "on"
  }, t), this._options.disabled = t.disabled || !1, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(e), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
lt.prototype = {
  constructor: lt,
  /**
   * @type {HTMLDivElement | null}
   * @private
   */
  // @ts-ignore
  _container: null,
  /**
   * @type {HTMLInputElement | null}
   */
  _input: null,
  /**
   * @type {null | HTMLSpanElement}
   * @private
   */
  _visualCheckbox: null,
  /**
   * @type {null | HTMLLabelElement}
   * @private
   */
  _labelElement: null,
  /**
   * @param {HTMLInputElement} checkbox
   * @private
   */
  _createDOM: function(t) {
    var i = t.parentNode, n = document.createDocumentFragment();
    this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = t;
    var s = this._input.getAttribute("id");
    s !== null ? this._options.id = s : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = !0), this._options.indeterminate && (this._input.indeterminate = !0), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
    var r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg");
    o.setAttribute("viewBox", "0 0 10 8"), o.setAttribute("class", "checkbox-checkmark");
    var l = document.createElementNS(r, "path");
    l.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), l.setAttribute("fill", "none"), l.setAttribute("stroke", "currentColor"), l.setAttribute("stroke-width", "2"), o.appendChild(l), this._visualCheckbox.appendChild(o);
    var h = document.createElement("span");
    if (h.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(h), this._options.label)
      this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var u = document.querySelector("label[for='" + this._options.id + "']");
      u instanceof HTMLLabelElement && (this._labelElement = u);
    }
    this._options.disabled && this._container.classList.add("checkbox--disabled"), i && i.insertBefore(n, t), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
  },
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners: function() {
    var t = this;
    if (this._container) {
      var i = function(l) {
        l.preventDefault(), !t._options.disabled && t._container && (t.toggle(), t._container.focus());
      }, n = function(l) {
        if (!t._options.disabled)
          switch (l.key) {
            case " ":
            case "Spacebar":
            case "Enter":
              l.preventDefault(), t.toggle();
              break;
            case "ArrowRight":
            case "ArrowDown":
              l.preventDefault(), !t._options.checked && !t._options.indeterminate && (t._options.checked ? t.setIndeterminate() : t.check());
              break;
            case "ArrowLeft":
            case "ArrowUp":
              l.preventDefault(), (t._options.checked || t._options.indeterminate) && (t._options.indeterminate ? t.uncheck() : t.setIndeterminate());
              break;
          }
      }, s = function() {
        t._container && t._container.classList.add("checkbox--focused");
      }, r = function() {
        t._container && t._container.classList.remove("checkbox--focused");
      };
      this._handlers.set("click", i), this._handlers.set("keydown", n), this._handlers.set("focus", s), this._handlers.set("blur", r), this._container.addEventListener("click", i), this._container.addEventListener("keydown", n), this._container.addEventListener("focus", s), this._container.addEventListener("blur", r);
    }
  },
  /**
   * Update visual state based on current properties
   * @private
   */
  _updateVisualState: function() {
    !this._container || !this._input || (this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked)), this._container.classList.toggle("checkbox--checked", this._options.checked), this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate), this._input.checked = !!this._options.checked, this._input.indeterminate = !!this._options.indeterminate);
  },
  /**
   * Toggle checkbox state
   * @returns {boolean} - New checked state
   */
  toggle: function() {
    return this._options.disabled ? !!this._options.checked : (this._options.indeterminate ? (this._options.indeterminate = !1, this._options.checked = !0) : this._options.checked = !this._options.checked, this._updateVisualState(), this._triggerChange(), this._options.checked);
  },
  /**
   * Set checkbox to checked state
   * @param {boolean} [bSilent]
   */
  check: function(t) {
    this._options.disabled || this._options.checked && !this._options.indeterminate || (this._options.checked = !0, this._options.indeterminate = !1, this._updateVisualState(), t || this._triggerChange());
  },
  /**
   * Set checkbox to unchecked state
   * @param {boolean} [bSilent]
   */
  uncheck: function(t) {
    this._options.disabled || !this._options.checked && !this._options.indeterminate || (this._options.checked = !1, this._options.indeterminate = !1, this._updateVisualState(), t || this._triggerChange());
  },
  /**
   * Set checkbox to indeterminate state
   */
  setIndeterminate: function() {
    this._options.disabled || this._options.indeterminate || (this._options.indeterminate = !0, this._updateVisualState(), this._triggerChange());
  },
  /**
   * Enable the checkbox
   */
  enable: function() {
    !this._options.disabled || !this._container || !this._input || (this._options.disabled = !1, this._input.disabled = !1, this._container.setAttribute("aria-disabled", "false"), this._container.tabIndex = 0, this._container.classList.remove("checkbox--disabled"));
  },
  /**
   * Disable the checkbox
   */
  disable: function() {
    this._options.disabled || !this._container || !this._input || (this._options.disabled = !0, this._input.disabled = !0, this._container.setAttribute("aria-disabled", "true"), this._container.tabIndex = -1, this._container.classList.add("checkbox--disabled"));
  },
  /**
   * Update checkbox label
   * @param {string} label - New label text
   */
  setLabel: function(t) {
    this._options.label = t, this._labelElement ? this._labelElement.textContent = t : t && this._container && (this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = t, this._container.appendChild(this._labelElement)), this._options.title && this._labelElement && this._labelElement.setAttribute("title", t);
  },
  /**
   * Get current checkbox state
   * @returns {{value: string, disabled: boolean, checked: boolean}} - State object
   */
  getState: function() {
    return this._input ? {
      checked: this._input.checked,
      disabled: this._input.disabled,
      value: this._input.value
    } : {
      checked: !1,
      disabled: !1,
      value: ""
    };
  },
  /**
   * @param {function(CheckboxEventType): void} callback
   * @returns {Object}
   */
  subscribe: function(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== t;
        });
      }
    };
  },
  /**
   * @param {Event} [e]
   * @private
   */
  _triggerChange: function(t) {
    var i = this.getState(), n = {
      type: "checkbox:change",
      detail: i
    };
    t && (n.originalEvent = t), this._subscribers.forEach(function(s) {
      s(n);
    });
  },
  /**
   * Clean up event listeners and references
   */
  destroy: function() {
    this._subscribers = [], this._handlers.forEach((t, i) => {
      this._container && this._container.removeEventListener(i, t);
    }), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
  }
};
var P = /* @__PURE__ */ new WeakSet();
class Pe {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(t, i) {
    if (ce(this, P), typeof t == "string") {
      var n = document.getElementById(t);
      if (n instanceof HTMLSelectElement)
        t = n;
      else if (n instanceof HTMLElement)
        this._container = n;
      else
        throw new Error("Invalid selectbox");
    } else t instanceof HTMLElement && (this._container = t);
    if (t instanceof HTMLSelectElement)
      this._selectbox = t, this._container = document.createElement("div");
    else if (!(this._container instanceof HTMLElement))
      throw new Error("Invalid container");
    this._options = Object.assign(i, {
      placeholder: i.placeholder || "Select...",
      searchable: i.searchable || !1,
      sortable: i.sortable || !1,
      translate: i.translate,
      multiple: i.multiple || !1,
      description: i.description || ""
    }), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = !1, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = {
      toggle: (s) => {
        c(P, this, ai).call(this, s);
      },
      search: (s) => {
        c(P, this, Ei).call(this, s);
      },
      close: (s) => {
        s.target instanceof HTMLElement && !this._container.contains(s.target) && !s.target.classList.contains("selectbox-option") && c(P, this, le).call(this);
      },
      keydown: (s) => {
        c(P, this, Pi).call(this, s);
      },
      dropdownClick: (s) => {
        c(P, this, Oi).call(this, s);
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), c(P, this, Ii).call(this), c(P, this, ki).call(this), c(P, this, Re).call(this), Pt._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t) {
      return function() {
        t.searchInput && t.searchInput.focus();
      };
    })(this), 100), c(P, this, Re).call(this);
  }
  /**
   * @param {function(SelectboxEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return this._subscribers.push(t), {
      unsubscribe() {
        i._subscribers = i._subscribers.filter(function(n) {
          return n !== t;
        });
      }
    };
  }
  /**
   * @param {string} value
   * @param {string} text
   * @param {boolean} selected
   */
  addItem(t, i, n) {
    n = n || !1;
    var s = this._items.some((o) => o && o.value === t);
    if (s) {
      var r = this._items.find((o) => o && o.value === t);
      r && (r.selected = n);
    } else
      this._items.push({
        value: t,
        text: i,
        selected: n
      }), this._options.sortable && this._items.sort((o, l) => o && l ? o.text.localeCompare(l.text) : o ? -1 : l ? 1 : 0);
    n && (this._options.multiple ? this._selectedValues.add(t) : (this._selectedValues.clear(), this._selectedValues.add(t))), c(P, this, fe).call(this);
  }
  /**
   * @param {Array<[string,string]>} values
   * @param {string} [selectedValue]
   */
  addItems(t, i) {
    var n = this;
    t.forEach(function(s, r) {
      var o = n._items.some((h) => h && h.value === s[0]);
      if (!o) {
        var l = i ? s[0] === i : r === 0;
        l && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(s[0])), n._items.push({
          value: s[0],
          text: s[1],
          selected: l
        });
      }
    }, this), this.isOpen && c(P, this, Re).call(this), c(P, this, fe).call(this);
  }
  /**
   * @param {string} value
   * @param {string} text
   */
  addCustomItem(t, i) {
    this._customItems.push({
      value: t,
      text: i,
      selected: !1
    });
  }
  addSeparator() {
    this._items.push(null);
  }
  /**
   * @param {string} value
   */
  removeItem(t) {
    this._items = this._items.filter(function(i) {
      return i === null || i.value !== t;
    }), this._customItems = this._customItems.filter(function(i) {
      return i === null || i.value !== t;
    }), this._selectedValues.delete(t), c(P, this, fe).call(this);
  }
  /**
   * @return {null | string}
   */
  getSelectedValue() {
    if (this._options.multiple)
      return console.error("Method getSelectedValue is only available for single-select boxes."), null;
    var t = Array.from(this._selectedValues);
    return t.length > 0 ? t[0] : null;
  }
  /**
   * @return {null | string | Array<string>}
   */
  getSelectedValues() {
    if (this._options.multiple)
      return Array.from(this._selectedValues);
    var t = Array.from(this._selectedValues);
    return t.length > 0 ? t[0] : null;
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  selectItems(t, i) {
    var n = this;
    if (!this._options.multiple && Array.isArray(t)) {
      console.error("Method selectItem is only available for multi-select boxes.");
      return;
    }
    var s = "";
    if (this._options.multiple) {
      var r = function(y) {
        if (n._optionsContainer) {
          var v = n._optionsContainer.querySelector('[data-value="' + y + '"]');
          if (v) {
            var m = v.querySelector('input[type="checkbox"]');
            m && m instanceof HTMLInputElement && (m.checked = !0), v.classList.add("selectbox-option-selected"), v.classList.add("checkbox--checked");
          }
        }
      };
      if (Array.isArray(t))
        for (var o = 0; o < t.length; o++)
          s = t[o], this._selectedValues.has(s) || (this._selectedValues.add(s), r(s));
      else
        s = t, this._selectedValues.has(s) || (this._selectedValues.add(s), r(s));
    } else if (!Array.isArray(t)) {
      if (s = t, this._selectedValues.clear(), this._selectedValues.add(s), this._optionsContainer) {
        var l = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + s + '"]');
        l.forEach(function(u) {
          u.classList.remove("selectbox-option-selected"), u.classList.remove("checkbox--checked");
        });
        var h = this._optionsContainer.querySelector('[data-value="' + s + '"]');
        h && (h.classList.add("selectbox-option-selected"), h.classList.add("checkbox--checked"));
      }
      c(P, this, le).call(this);
    }
    c(P, this, fe).call(this), !i && c(P, this, ct).call(this, s, !0);
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  unselectItems(t, i) {
    var n = this;
    if (!this._options.multiple) {
      console.error("Method unselectItem is only available for multi-select boxes.");
      return;
    }
    var s = "", r = function(h) {
      if (n._optionsContainer) {
        var u = n._optionsContainer.querySelector('[data-value="' + h + '"]');
        if (u) {
          var y = u.querySelector('input[type="checkbox"]');
          y && y instanceof HTMLInputElement && (y.checked = !1), u.classList.remove("selectbox-option-selected"), u.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(t))
      for (var o = 0; o < t.length; o++)
        s = t[o], this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    else
      s = t, this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    c(P, this, fe).call(this), !i && c(P, this, ct).call(this, s, !0);
  }
  disable() {
    this._select.classList.add("selectbox-disabled");
  }
  enable() {
    this._select.classList.remove("selectbox-disabled");
  }
  /**
   * @param {boolean} bSelectFirst
   */
  clear(t) {
    if (t = t || !1, this._selectedValues.clear(), t && this._items.length > 0) {
      var i = this._items[0];
      i && this._selectedValues.add(i.value);
    }
    c(P, this, fe).call(this), c(P, this, Re).call(this);
  }
  destroy() {
    this._subscribers = [], Pt._.delete(this);
    try {
      this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
    } catch (s) {
      console.error(s);
    }
    this._container.innerHTML = "";
    for (var t = this._container.className.split(" "), i = [], n = 0; n < t.length; n++)
      t[n] !== "selectbox-container" && i.push(t[n]);
    this._container.className = i.join(" ");
  }
}
function Ii() {
  this._container.innerHTML = "", this._container.className += " selectbox-container";
  var e = document.createDocumentFragment();
  if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), e.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text i18n", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._select.appendChild(this._dropdown), this._options.description) {
    var t = document.createElement("div");
    t.className += " i18n selectbox-description", t.textContent = this._options.description, this._dropdown.appendChild(t);
  }
  if (this._options.searchable) {
    var i = document.createElement("div");
    i.className += " selectbox-search", this._dropdown.appendChild(i), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", i.appendChild(this.searchInput);
  }
  if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(e), this._selectbox) {
    var n = this._selectbox.parentNode;
    if (n) {
      n.insertBefore(this._container, this._selectbox);
      var s = c(P, this, Ni).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
    }
  }
}
function ki() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
    e.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function ai(e) {
  if (e && e.stopPropagation(), this.isOpen ? c(P, this, le).call(this) : this.openDropdown(), e && e.type === "click")
    for (var t of Pt._)
      t.isOpen && t !== this && c(P, t, le).call(t);
}
function le() {
  this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = !1, this._dropdown.style.display = "none";
  for (var e = this._arrow.className.split(" "), t = [], i = 0; i < e.length; i++)
    e[i] !== "selectbox-arrow-open" && t.push(e[i]);
  this._arrow.className = t.join(" ");
  for (var n = this._header.className.split(" "), s = [], i = 0; i < n.length; i++)
    n[i] !== "selectbox-header-open" && s.push(n[i]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function Ei(e) {
  var t = e.target;
  if (t instanceof HTMLInputElement) {
    var i = t.value.toLowerCase();
    c(P, this, Re).call(this, i);
  }
}
function Yt(e) {
  var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", i, n = this._items.filter(function(u) {
    return u !== null;
  });
  if (t && (n = n.filter(function(u) {
    return u.text.toLowerCase().indexOf(t) !== -1;
  })), n.length !== 0) {
    if (e === "up")
      if (this._selectedValues.size === 0 && n.length > 0)
        i = n[n.length - 1], this._selectedValues.add(i.value);
      else {
        for (var s = Array.from(this._selectedValues), r = -1, o = 0; o < n.length; o++)
          if (n[o].value === s[0]) {
            r = o;
            break;
          }
        var l = (r - 1 + n.length) % n.length;
        this._selectedValues.clear(), i = n[l], this._selectedValues.add(i.value);
      }
    else if (this._selectedValues.size === 0 && n.length > 0)
      i = n[0], this._selectedValues.add(i.value);
    else {
      for (var s = Array.from(this._selectedValues), r = -1, o = 0; o < n.length; o++)
        if (n[o].value === s[0]) {
          r = o;
          break;
        }
      var h = (r + 1) % n.length;
      h === n.length && (h = 0), this._selectedValues.clear(), i = n[h], this._selectedValues.add(i.value);
    }
    c(P, this, fe).call(this), c(P, this, Re).call(this, t, !0), c(P, this, ct).call(this, i.value, !0);
  }
}
function Pi(e) {
  var t = e.key || e.keyCode;
  switch (t) {
    case "Enter":
    case 13:
      e.preventDefault(), c(P, this, ai).call(this, e);
      break;
    case "Escape":
    case 27:
      c(P, this, le).call(this);
      break;
    case "ArrowDown":
    case 40:
      e.preventDefault(), c(P, this, Yt).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      e.preventDefault(), c(P, this, Yt).call(this, "up");
      break;
    case "Tab":
    case 9:
      c(P, this, le).call(this);
      break;
  }
}
function Re(e, t) {
  if (e = e || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, n = this._items;
    if (e) {
      var s = e.split(/\s+/).filter(Boolean);
      n = n.filter(function(Q) {
        if (Q === null) return !1;
        var he = Q.text.toLowerCase();
        return s.every(function(We) {
          return he.indexOf(We) !== -1;
        });
      });
    }
    for (var r = document.createDocumentFragment(), o = 0; o < n.length; o++) {
      var l = n[o];
      if (!l) {
        var h = document.createElement("hr");
        h.className += " selectbox-option-divider", r.appendChild(h);
        continue;
      }
      var u = document.createElement("div");
      u.className += " selectbox-option", this._selectedValues.has(l.value) && (u.className += " selectbox-option-selected checkbox--checked", i = u), u.setAttribute("data-value", l.value);
      var y = document.createElement("label");
      if (y.className += " selectbox-option-text i18n", this._options.translate && (l.text = this._options.translate(l.text)), y.textContent = l.text, this._options.multiple) {
        u.className += " selectbox-option-checkbox";
        var v = document.createElement("input");
        v.type = "checkbox", v.id = "checkbox-" + l.value, v.className += " selectbox-checkbox", v.checked = this._selectedValues.has(l.value), u.appendChild(v);
        var m = document.createElement("span");
        m.className = "checkbox-visual", m.setAttribute("aria-hidden", "true");
        var w = "http://www.w3.org/2000/svg", C = document.createElementNS(w, "svg");
        C.setAttribute("viewBox", "0 0 10 8"), C.setAttribute("class", "checkbox-checkmark");
        var I = document.createElementNS(w, "path");
        I.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), I.setAttribute("fill", "none"), I.setAttribute("stroke", "currentColor"), I.setAttribute("stroke-width", "2"), C.appendChild(I), m.appendChild(C), u.appendChild(m);
      }
      u.appendChild(y), r.appendChild(u);
    }
    if (this._customItems.length) {
      var O = document.createElement("hr");
      O.className += " selectbox-option-divider", r.appendChild(O);
    }
    for (var o = 0; o < this._customItems.length; o++) {
      var k = this._customItems[o], G = document.createElement("label");
      G.className += " selectbox-custom-option", G.setAttribute("data-value", k.value), G.setAttribute("for", k.value);
      var $ = document.createElement("span");
      $.className += " selectbox-option-text i18n", this._options.translate && (k.text = this._options.translate(k.text)), $.textContent = k.text, G.appendChild($), r.appendChild(G);
    }
    if (this._optionsContainer.appendChild(r), t && this.isOpen && this._optionsContainer && i)
      try {
        i.scrollIntoView && i.scrollIntoView({
          block: "nearest"
        });
      } catch (Q) {
        console.error(Q);
      }
  }
}
function Oi(e) {
  var t = e.target || e.srcElement, i = null;
  if (t && t instanceof HTMLElement) {
    for (var n = null, s = t.className.split(" "), r = !1, o = 0; o < s.length; o++)
      if (s[o] === "selectbox-option") {
        r = !0;
        break;
      } else if (s[o] === "selectbox-custom-option") {
        var l = t.getAttribute("data-value");
        if (l) {
          e.stopPropagation(), c(P, this, jt).call(this, l), c(P, this, le).call(this);
          return;
        }
        break;
      }
    if (r)
      n = t;
    else if (t.parentNode && t.parentNode instanceof HTMLElement) {
      for (var h = t.parentNode.className.split(" "), u = !1, o = 0; o < h.length; o++)
        if (h[o] === "selectbox-option") {
          u = !0;
          break;
        } else if (h[o] === "selectbox-custom-option") {
          var y = t.parentNode.getAttribute("data-value");
          if (y) {
            e.stopPropagation(), c(P, this, jt).call(this, y), c(P, this, le).call(this);
            return;
          }
          break;
        }
      u && (n = t.parentNode);
    }
    if (n instanceof HTMLDivElement)
      i = n;
    else
      return;
  } else
    return;
  var v = i.getAttribute("data-value");
  if (v !== null) {
    var m = !0;
    this._options.multiple ? this._selectedValues.has(v) ? (this.unselectItems(v, !0), m = !1) : this.selectItems(v, !0) : (this.selectItems(v, !0), c(P, this, le).call(this)), c(P, this, fe).call(this), c(P, this, ct).call(this, v, m);
  }
}
function fe() {
  if (this._selectedValues.size === 0) {
    this._selectedText.textContent = this._options.placeholder;
    return;
  }
  if (this._options.multiple) {
    for (var e = [], t = 0; t < this._items.length; t++) {
      var i = this._items[t];
      i && this._selectedValues.has(i.value) && e.push(i);
    }
    e.length === 0 ? this._selectedText.textContent = this._options.placeholder : e.length === 1 ? this._selectedText.textContent = e[0].text : this._selectedText.textContent = e.length + " items selected";
  } else {
    for (var n = null, t = 0; t < this._items.length; t++) {
      var i = this._items[t];
      if (i && this._selectedValues.has(i.value)) {
        n = i;
        break;
      }
    }
    this._selectedText.textContent = n ? n.text : this._options.placeholder;
  }
}
function ct(e, t) {
  for (var i = Array.from(this._selectedValues), n = [], s = 0; s < this._items.length; s++) {
    var r = this._items[s];
    r && this._selectedValues.has(r.value) && n.push(r);
  }
  var o = {
    values: i,
    items: n,
    current: e,
    enabled: t
  };
  this._subscribers.forEach(function(l) {
    l({
      type: "selectbox:change",
      detail: o
    });
  });
}
function jt(e) {
  var t = {
    values: [],
    current: e,
    enabled: !1
  };
  this._subscribers.forEach(function(i) {
    i({
      type: "selectbox:custom",
      detail: t
    });
  });
}
function Ni(e) {
  var t = Array.from(e.options).map((s) => [s.value, s.text]), i = {
    values: t
  }, n = e.value;
  return n && (i.selectedValue = n), i;
}
var Pt = {
  _: /* @__PURE__ */ new Set()
}, ke = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakSet();
class ae {
  /**
   * @param {string} containerId
   * @param {string} text
   */
  constructor(t, i) {
    ce(this, $t), B(this, ke, void 0);
    var n = document.getElementById(t);
    if (!(n instanceof HTMLElement)) throw new Error("Invalid container");
    x(ke, this, n), c($t, this, Ti).call(this, i);
  }
  show() {
    var t;
    (t = a(ke, this)) === null || t === void 0 || t.classList.remove("hidden");
  }
  hide() {
    var t;
    (t = a(ke, this)) === null || t === void 0 || t.classList.add("hidden");
  }
  static show() {
    var t;
    (t = c(ae, this, Xt)._) === null || t === void 0 || t.classList.remove("hidden");
  }
  static hide() {
    var t;
    (t = c(ae, this, Xt)._) === null || t === void 0 || t.classList.add("hidden");
  }
}
function Ti(e) {
  a(ke, this).classList.add("loader-container");
  var t = "http://www.w3.org/2000/svg", i = document.createElementNS(t, "svg");
  i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
  var n = document.createElementNS(t, "circle");
  n.setAttribute("cx", "10"), n.setAttribute("cy", "10"), n.setAttribute("fill", "none"), n.setAttribute("stroke", "currentColor"), n.setAttribute("stroke-width", "1.5"), n.setAttribute("r", "7.25"), n.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(n), a(ke, this).appendChild(i);
  var s = document.createElement("div");
  s.classList.add("loader-title"), s.classList.add("i18n"), s.innerText = e, a(ke, this).appendChild(s);
}
var Xt = {
  _: document.getElementById("loader")
};
function g(e) {
  try {
    return window.Asc.plugin.tr(e);
  } catch (t) {
    return console.error(t), e;
  }
}
class Ye {
  /**
   * Parse HTML string to extract plain text and formatting information.
   * Only supports: <sub>, <sup>, <sc>, <i>, <u>, <b> tags
   * @param {string} htmlString - HTML string to parse
   * @returns {{text: string, formatting: Array<FormattingPositions>}} Object with text and formatting array
   */
  static parseHtmlFormatting(t) {
    for (var i = {
      text: "",
      formatting: []
    }, n = [], s = 0, r = 0; r < t.length; )
      if (t[r] === "<" && r + 1 < t.length) {
        var o = t[r + 1] === "/", l = t.indexOf(">", r);
        if (l === -1) {
          i.text += t[r], r++;
          continue;
        }
        var h = t.substring(o ? r + 2 : r + 1, l).trim(), u = h.split(" ");
        if (u.length === 0) {
          i.text += t[r], r++;
          continue;
        }
        var y = u[0].toLowerCase();
        if (y === "br") {
          i.text += `
`, r = l + 1;
          continue;
        }
        var v = y;
        if (h.indexOf("font-variant:small-caps") !== -1 ? v = "sc" : h.indexOf("text-decoration:underline") !== -1 && (v = "u"), c(Ye, this, Mi)._.has(y))
          if (o) {
            for (var m = n.length - 1; m >= 0; m--)
              if (n[m].tag === y) {
                var {
                  start: w,
                  styleTag: C
                } = n.splice(m, 1)[0];
                i.formatting.push({
                  type: C,
                  start: w,
                  end: s
                });
                break;
              }
          } else
            n.push({
              tag: y,
              start: s,
              styleTag: v
            });
        r = l + 1;
      } else
        i.text += t[r], s++, r++;
    return i.formatting.sort((I, O) => I.start === O.start ? O.end - I.end : I.start - O.start), i;
  }
}
var Mi = {
  _: /* @__PURE__ */ new Set(["i", "u", "b", "sc", "sup", "sub", "em", "div", "span"])
};
class we {
  /**
   * @param {Array<FormattingPositions>} positions
   * @returns {Promise<void>}
   */
  static formatAfterInsert(t) {
    return new Promise(function(i) {
      var n = !0, s = !1;
      Asc.scope.formatting = t, Asc.plugin.callCommand(function() {
        for (var r = Api.GetDocument(), o = r.GetCurrentRun(), l = Asc.scope.formatting.length - 1; l >= 0; l--) {
          var h = Asc.scope.formatting[l], u = o.GetRange(h.start, h.end);
          u && (h.type === "sup" ? u.SetVertAlign("superscript") : h.type === "sub" ? u.SetVertAlign("subscript") : h.type === "sc" ? u.SetSmallCaps(!0) : h.type === "u" ? u.SetUnderline(!0) : h.type === "b" ? u.SetBold(!0) : (h.type === "i" || h.type === "em") && u.SetItalic(!0));
        }
      }, s, n, i);
    });
  }
  /**
   * @param {string} fieldId
   * @param {{text: string, formatting: Array<FormattingPositions>}} formattingPositions
   * @returns {Promise<void>}
   */
  static formatAfterUpdate(t, i) {
    var n = !0, s = !1;
    return Asc.scope.fieldId = t, Asc.scope.text = i.text, Asc.scope.formatting = i.formatting, new Promise(function(r) {
      Asc.plugin.callCommand(function() {
        var o = Api.GetDocument(), l = o.GetRangeBySelect();
        if (!l)
          return;
        function h(C, I) {
          I === "sup" ? C.SetVertAlign("superscript") : I === "sub" ? C.SetVertAlign("subscript") : I === "sc" ? C.SetSmallCaps(!0) : I === "u" ? C.SetUnderline(!0) : I === "b" ? C.SetBold(!0) : (I === "i" || I === "em") && C.SetItalic(!0);
        }
        if (Asc.scope.formatting.length === 1) {
          var u = Asc.scope.formatting[0];
          if (u.start === 0 && u.end === l.GetText().length) {
            h(l, u.type);
            return;
          }
        }
        o.MoveCursorToPos(l.GetEndPos() - Asc.scope.text.length);
        for (var y = o.GetCurrentRun(), v = Asc.scope.formatting.length - 1; v >= 0; v--) {
          var m = Asc.scope.formatting[v], w = y.GetRange(m.start, m.end);
          w && h(w, m.type);
        }
      }, s, n, r);
    });
  }
}
var mt = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakSet();
class Fi {
  /**
   * @param {string} citPrefix
   * @param {string} citSuffix
   * @param {string} bibPrefix
   * @param {string} bibSuffix
   */
  constructor(t, i, n, s) {
    ce(this, F), B(this, mt, void 0), B(this, et, void 0), B(this, bt, void 0), B(this, wt, void 0), B(this, Se, void 0), B(this, tt, void 0), x(mt, this, "ZOTERO_CITATION"), x(bt, this, "ZOTERO_BIBLIOGRAPHY"), x(et, this, t), x(wt, this, i), x(Se, this, n), x(tt, this, s);
  }
  /**
   * @param {string} text
   * @param {string} value
   * @returns {Promise<string>}
   */
  addBibliography(t, i) {
    var n = this;
    return E(function* () {
      var s = window.Asc.scope.editorVersion;
      if (s && s < 9004e3) {
        var r = Ye.parseHtmlFormatting(t), o = "", l = {
          FieldId: o,
          Value: a(Se, n) + " " + i + " " + a(tt, n),
          Content: r.text
        };
        return c(F, n, Fe).call(n, l).then(() => n.getCurrentField()).then((u) => {
          if (o = (u == null ? void 0 : u.FieldId) || "", !!r.formatting.length)
            return we.formatAfterInsert(r.formatting);
        }).then(() => o);
      } else {
        var h = {
          FieldId: "",
          Value: a(Se, n) + " " + i + " " + a(tt, n),
          Content: " "
        };
        return yield c(F, n, ei).call(n, h, t);
      }
    })();
  }
  /**
   * @param {string} text
   * @param {string} value
   * @param {NoteStyle | null} notesStyle
   * @returns {Promise<boolean>}
   */
  addCitation(t, i, n) {
    var s = this;
    return E(function* () {
      var r = Ye.parseHtmlFormatting(t), o = {
        FieldId: "",
        Value: a(et, s) + " " + a(wt, s) + " " + i,
        Content: r.text
      }, l = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1);
      return l && (yield c(F, s, St).call(s, n)), yield c(F, s, Fe).call(s, o), r.formatting.length && (yield we.formatAfterInsert(r.formatting), l && (yield c(F, s, Qt).call(s))), l;
    })();
  }
  /** @returns {Promise<AddinFieldData | null>} */
  getCurrentField() {
    return new Promise(function(t, i) {
      window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, t);
    });
  }
  /** @returns {Promise<Array<AddinFieldData>>} */
  getAddinZoteroFields() {
    var t = this;
    return new Promise(function(i, n) {
      c(F, t, Bi).call(t).then(function(s) {
        try {
          s.length && (s = s.filter(function(r) {
            return r.Value.indexOf(a(et, t)) !== -1 || r.Value.indexOf(a(Se, t)) !== -1 || r.Value.indexOf(a(mt, t)) !== -1 || r.Value.indexOf(a(bt, t)) !== -1;
          }));
        } catch (r) {
          n(r);
        }
        i(s);
      });
    });
  }
  /** @returns {Promise<boolean>} */
  saveAsText() {
    return this.getAddinZoteroFields().then(function(t) {
      var i = t.length;
      if (!i)
        return window.Asc.plugin.executeCommand("close", ""), !1;
      var n = t.map(function(s) {
        return new Promise(function(r) {
          window.Asc.plugin.executeMethod("RemoveFieldWrapper", [s.FieldId], r);
        });
      });
      return Promise.all(n).then(() => !0).catch((s) => (console.error(s), !1));
    });
  }
  /**
   * @param {Array<AddinFieldData>} fields
   * @returns {Promise<string[]>}
   */
  updateAddinFields(t) {
    var i = this;
    return E(function* () {
      var n = t.map((m) => m.FieldId), s = window.Asc.scope.editorVersion, r = t.filter((m) => m.Value.indexOf(a(Se, i)) === 0);
      if (r.length && s && s >= 9004e3) {
        t = t.filter((m) => m.Value.indexOf(a(Se, i)) !== 0);
        var o = r[0];
        yield c(F, i, Ae).call(i, o.FieldId);
        var l = o.Content || "";
        o.Content = " ", yield c(F, i, xt).call(i), yield c(F, i, ei).call(i, o, l);
      }
      var h = c(F, i, it).call(i, t);
      if (yield new Promise((m) => {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [t], m);
      }), !h.size) return n;
      for (var [u, y] of h) {
        var v = yield c(F, i, Ae).call(i, u);
        v && (yield we.formatAfterUpdate(u, y));
      }
      return n;
    })();
  }
  /**
   * @param {Array<AddinFieldData>} fields
   * @returns {Promise<void>}
   */
  convertNotesToText(t) {
    var i = this;
    return E(function* () {
      for (var n = c(F, i, it).call(i, t), s = 0; s < t.length; s++) {
        var r = t[s];
        if (!r.FieldId) {
          console.error("Field id is not defined");
          continue;
        }
        var o = yield c(F, i, Ae).call(i, r.FieldId);
        if (o) {
          var l = yield c(F, i, Qt).call(i);
          if (l) {
            yield c(F, i, Vi).call(i), yield c(F, i, xt).call(i), yield c(F, i, Fe).call(i, r);
            var h = n.get(r.FieldId);
            h && (yield we.formatAfterInsert(h.formatting));
          }
        }
      }
    })();
  }
  /**
   * @param {Array<AddinFieldData>} fields
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  convertTextToNotes(t, i) {
    var n = this;
    return E(function* () {
      for (var s = c(F, n, it).call(n, t), r = 0; r < t.length; r++) {
        var o = t[r];
        if (o.FieldId) {
          var l = yield c(F, n, Ae).call(n, o.FieldId);
          if (l) {
            yield c(F, n, xt).call(n), yield c(F, n, St).call(n, i), yield c(F, n, Fe).call(n, o);
            var h = s.get(o.FieldId);
            h && (yield we.formatAfterInsert(h.formatting));
          }
        }
      }
    })();
  }
  /**
   * @param {Array<AddinFieldData>} fields
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  convertNotesStyle(t, i) {
    var n = this;
    return E(function* () {
      for (var s = [], r = c(F, n, it).call(n, t), o = 0; o < t.length; o++) {
        var l = t[o];
        if (l.FieldId) {
          if (!l.Content) {
            s.push(l);
            continue;
          }
          var h = yield c(F, n, Ae).call(n, l.FieldId);
          if (h) {
            var u = yield c(F, n, Hi).call(n);
            if (u) {
              s.push(l);
              continue;
            }
            yield c(F, n, St).call(n, i), yield c(F, n, Fe).call(n, l);
            var y = r.get(l.FieldId);
            y && (yield we.formatAfterInsert(y.formatting));
          }
        }
      }
      if (s.length) {
        yield new Promise(function(C) {
          window.Asc.plugin.executeMethod("UpdateAddinFields", [s], C);
        });
        for (var v of s) {
          var m = r.get(v.FieldId);
          if (m) {
            var w = yield c(F, n, Ae).call(n, v.FieldId);
            w && (yield we.formatAfterUpdate(v.FieldId, m));
          }
        }
      }
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBegin]
   * @returns {Promise<void>}
  */
  moveCursorToField(t, i) {
    return E(function* () {
      return new Promise((n) => {
        i = i ?? !0, window.Asc.plugin.executeMethod("MoveCursorToField", [t, i], n);
      });
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBeforeField]
   * @returns {Promise<void>}
  */
  moveCursorOutsideField(t, i) {
    return E(function* () {
      return new Promise((n) => {
        i = i ?? !1, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [t, i], n);
      });
    })();
  }
  /**
   * @returns {Promise<void>}
  */
  moveCursorRight() {
    return E(function* () {
      return new Promise((t) => {
        var i = !0, n = !1;
        Asc.plugin.callCommand(() => {
          var s = Api.GetDocument();
          s.MoveCursorRight(1, !1);
        }, n, i, t);
      });
    })();
  }
}
function Fe(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("AddAddinField", [e], t);
  });
}
function St(e) {
  return Asc.scope.notesStyle = e, new Promise((t) => {
    Asc.plugin.callCommand(() => {
      var i = Api.GetDocument();
      Asc.scope.notesStyle === "footnotes" ? i.AddFootnote() : Asc.scope.notesStyle === "endnotes" && i.AddEndnote();
    }, !1, !1, t);
  });
}
function Bi() {
  return new Promise(function(e, t) {
    window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
  });
}
function it(e) {
  var t = /* @__PURE__ */ new Map();
  return e.forEach(function(i) {
    if (i.Content) {
      var n = Ye.parseHtmlFormatting(i.Content);
      i.Content = n.text, n.formatting.length && i.FieldId && t.set(i.FieldId, n);
    }
  }), t;
}
function Ri(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("PasteHtml", [e], t);
  });
}
function Hi() {
  return new Promise((e) => {
    Asc.plugin.callCommand(() => {
      var t = Api.GetDocument(), i = t.GetCurrentFootEndnote();
      return !!i;
    }, !1, !0, (t) => e(!!t));
  });
}
function xt() {
  return new Promise((e) => {
    window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
  });
}
function Ae(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
  });
}
function Qt() {
  return new Promise(function(e) {
    var t = !0, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetCurrentFootEndnote();
      if (s)
        var r = s.SelectNoteReference();
    }, i, t, () => e(!0));
  });
}
function Vi() {
  return new Promise(function(e) {
    var t = !1, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetRangeBySelect();
      s && s.SetVertAlign("baseline");
    }, i, t, e);
  });
}
function ei(e, t) {
  return Ot.apply(this, arguments);
}
function Ot() {
  return Ot = E(function* (e, t) {
    if (yield c(F, this, Fe).call(this, e), yield new Promise((u) => {
      var y = !0, v = !1;
      Asc.plugin.callCommand(() => {
        var m = Api.GetDocument();
        m.MoveCursorLeft(1, !0);
      }, v, y, u);
    }), !Asc.scope.bibStyle)
      throw "Bibliography style is not defined";
    var i = new DOMParser(), n = i.parseFromString(t, "text/html"), s = n.querySelectorAll(".csl-entry"), r = new Array(s.length), o = Date.now().toString(36);
    s.forEach((u, y) => {
      var v = u.querySelector(".csl-left-margin"), m = u.querySelector(".csl-right-inline");
      if (m == null || m.replaceWith(...m.childNodes), v) {
        r[y] = v.textContent.trim() + o;
        for (var w = document.createElement("em"); v.firstChild; )
          w.appendChild(v.firstChild);
        var C = document.createElement("span");
        C.textContent = o, w.appendChild(C), v.replaceWith(w);
      }
      for (var I = document.createElement("p"); u.firstChild; )
        I.appendChild(u.firstChild);
      u.replaceWith(I);
    }), t = n.body.innerHTML, yield c(F, this, Ri).call(this, t);
    var l = yield this.getCurrentField();
    if (!l) {
      console.warn("Failed to get current field after paste");
      for (var h = 0; h < 5 && (yield new Promise((u) => {
        setTimeout(() => {
          u(!0);
        }, 100);
      }), l = yield this.getCurrentField(), !l); h++)
        ;
      if (!l)
        throw new Error("Failed to get current field after paste");
    }
    return yield c(F, this, Ae).call(this, l.FieldId), yield new Promise((u) => {
      var y = !1, v = !1;
      Asc.scope.numbers = r, Asc.scope.hash = o, Asc.plugin.callCommand(() => {
        var m = Api.GetDocument(), w = m.GetRangeBySelect();
        if (w) {
          var C = Asc.scope.bibStyle, I = w.GetAllParagraphs();
          I.forEach((O, k) => {
            var G = O.GetText().trim();
            if (G !== "")
              if (typeof C.linespacing == "number" && O.SetSpacingLine(240 * C.linespacing, "exact"), typeof C.entryspacing == "number" && O.SetSpacingAfter(240 * C.entryspacing), C["second-field-align"]) {
                for (var $ = String(Asc.scope.numbers[k]), Q = 0; Q < O.GetElementsCount(); Q++) {
                  var he = O.GetElement(Q);
                  if (he.GetText() === $) {
                    he.AddTabStop(), he.SetItalic(!1);
                    break;
                  }
                }
                var We = O.Search(Asc.scope.hash, !0)[0];
                We.Delete(), O.SetIndLeft(C.maxoffset * 120), O.SetIndFirstLine(-(C.maxoffset * 120));
              } else C.hangingindent && (O.SetIndLeft(720), O.SetIndFirstLine(-720));
          });
        }
      }, v, y, u);
    }), Asc.scope.bibStyle = null, l.FieldId;
  }), Ot.apply(this, arguments);
}
var pe = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakSet();
class Ui {
  constructor() {
    ce(this, ti), B(this, pe, void 0), B(this, se, void 0), B(this, ne, void 0), x(pe, this, []), x(se, this, []), x(ne, this, []), this.size = 0;
  }
  /** @returns {CitationItem} */
  /**
   * @param {string|number} id
   * @returns {CitationItem|null}
   **/
  getItem(t) {
    t = t.toString();
    var i = a(se, this).indexOf(t);
    return i >= 0 ? a(pe, this)[i] : null;
  }
  /**
   *
   * @param {string|number} id
   * @returns {number}
   */
  getItemIndex(t) {
    return t = t.toString(), a(se, this).indexOf(t);
  }
  clear() {
    return x(pe, this, []), x(ne, this, []), x(se, this, []), this.size = 0, this;
  }
  /**
   * @param {string|number} id
   * @returns {CSLCitationStorage}
   */
  deleteItem(t) {
    t = t.toString();
    var i = a(se, this).indexOf(t);
    return i >= 0 && (a(pe, this).splice(i, 1), a(se, this).splice(i, 1), this.size--), this;
  }
  /**
   * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
   */
  forEachItem(t) {
    for (var i = 0; i < this.size; i++)
      t(a(pe, this)[i], a(se, this)[i], this);
  }
  /**
   * @param {string|number} id
   * @returns {boolean}
   */
  hasItem(t) {
    return t = t.toString(), a(se, this).indexOf(t) >= 0;
  }
  /**
   * @param {CSLCitation} cslCitation
   * @returns {CSLCitationStorage}
   */
  addCslCitation(t) {
    return a(ne, this).push(t), t.setNoteIndex(a(ne, this).length), t.getCitationItems().forEach((i) => {
      c(ti, this, Gi).call(this, i.id, i);
    }), this;
  }
  getAllCitationsInJson() {
    return a(ne, this).map((t) => t.toJSON());
  }
  /**
   * @param {string} id
   * @returns {CSLCitation|undefined}
   */
  getCitation(t) {
    return a(ne, this).find((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {number}
   */
  getCitationIndex(t) {
    return a(ne, this).findIndex((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPre(t) {
    var i = [];
    return a(ne, this).find((n, s) => n.citationID === t ? !0 : (i.push([n.citationID, s + 1]), !1)), i;
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPost(t) {
    for (var i = [], n = this.getCitationIndex(t), s = n + 1; s < a(ne, this).length; s++) {
      var r = a(ne, this)[s];
      i.push([r.citationID, s + 1]);
    }
    return i;
  }
}
function Gi(e, t) {
  e = e.toString();
  var i = a(se, this).indexOf(e);
  return i >= 0 ? (a(pe, this)[i] = t, this) : (a(pe, this).push(t), a(se, this).push(e), this.size++, this);
}
var Wi = ["userID", "groupID"];
function f(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItemData: id is required");
  this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
f.prototype._addCustomProperty = function(e, t) {
  return this._custom[e] = t, this;
};
f.prototype.getCustomProperty = function(e) {
  return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
};
f.prototype.fillFromObject = function(e) {
  if (Object.hasOwnProperty.call(e, "type") && (this._type = e.type), Object.hasOwnProperty.call(e, "categories") && (this._categories = e.categories), Object.hasOwnProperty.call(e, "citation-key") && (this._citationKey = e["citation-key"]), Object.hasOwnProperty.call(e, "language") && (this._language = e.language), Object.hasOwnProperty.call(e, "journalAbbreviation") && (this._journalAbbreviation = e.journalAbbreviation), Object.hasOwnProperty.call(e, "shortTitle") && (this._shortTitle = e.shortTitle), Object.hasOwnProperty.call(e, "author") && (this._author = e.author), Object.hasOwnProperty.call(e, "chair") && (this._chair = e.chair), Object.hasOwnProperty.call(e, "collection-editor") && (this._collectionEditor = e["collection-editor"]), Object.hasOwnProperty.call(e, "compiler") && (this._compiler = e.compiler), Object.hasOwnProperty.call(e, "composer") && (this._composer = e.composer), Object.hasOwnProperty.call(e, "container-author") && (this._containerAuthor = e["container-author"]), Object.hasOwnProperty.call(e, "contributor") && (this._contributor = e.contributor), Object.hasOwnProperty.call(e, "curator") && (this._curator = e.curator), Object.hasOwnProperty.call(e, "director") && (this._director = e.director), Object.hasOwnProperty.call(e, "editorial-director") && (this._editorialDirector = e["editorial-director"]), Object.hasOwnProperty.call(e, "editor") && (this._editor = e.editor), Object.hasOwnProperty.call(e, "executive-producer") && (this._executiveProducer = e["executive-producer"]), Object.hasOwnProperty.call(e, "guest") && (this._guest = e.guest), Object.hasOwnProperty.call(e, "host") && (this._host = e.host), Object.hasOwnProperty.call(e, "illustrator") && (this._illustrator = e.illustrator), Object.hasOwnProperty.call(e, "narrator") && (this._narrator = e.narrator), Object.hasOwnProperty.call(e, "organizer") && (this._organizer = e.organizer), Object.hasOwnProperty.call(e, "original-author") && (this._originalAuthor = e["original-author"]), Object.hasOwnProperty.call(e, "performer") && (this._performer = e.performer), Object.hasOwnProperty.call(e, "producer") && (this._producer = e.producer), Object.hasOwnProperty.call(e, "recipient") && (this._recipient = e.recipient), Object.hasOwnProperty.call(e, "reviewed-author") && (this._reviewedAuthor = e["reviewed-author"]), Object.hasOwnProperty.call(e, "script-writer") && (this._scriptWriter = e["script-writer"]), Object.hasOwnProperty.call(e, "series-creator") && (this._seriesCreator = e["series-creator"]), Object.hasOwnProperty.call(e, "translator") && (this._translator = e.translator), Object.hasOwnProperty.call(e, "accessed") && (this._accessed = e.accessed), Object.hasOwnProperty.call(e, "container") && (this._container = e.container), Object.hasOwnProperty.call(e, "event-date") && (this._eventDate = e["event-date"]), Object.hasOwnProperty.call(e, "issued") && (this._issued = e.issued), Object.hasOwnProperty.call(e, "original-date") && (this._originalDate = e["original-date"]), Object.hasOwnProperty.call(e, "submitted") && (this._submitted = e.submitted), Object.hasOwnProperty.call(e, "abstract") && (this._abstract = e.abstract), Object.hasOwnProperty.call(e, "annote") && (this._annote = e.annote), Object.hasOwnProperty.call(e, "archive") && (this._archive = e.archive), Object.hasOwnProperty.call(e, "archive_collection") && (this._archiveCollection = e.archive_collection), Object.hasOwnProperty.call(e, "archive_location") && (this._archiveLocation = e.archive_location), Object.hasOwnProperty.call(e, "archive-place") && (this._archivePlace = e["archive-place"]), Object.hasOwnProperty.call(e, "authority") && (this._authority = e.authority), Object.hasOwnProperty.call(e, "call-number") && (this._callNumber = e["call-number"]), Object.hasOwnProperty.call(e, "chapter-number") && (this._chapterNumber = e["chapter-number"]), Object.hasOwnProperty.call(e, "citation-number") && (this._citationNumber = e["citation-number"]), Object.hasOwnProperty.call(e, "citation-label") && (this._citationLabel = e["citation-label"]), Object.hasOwnProperty.call(e, "collection-number") && (this._collectionNumber = e["collection-number"]), Object.hasOwnProperty.call(e, "collection-title") && (this._collectionTitle = e["collection-title"]), Object.hasOwnProperty.call(e, "container-title") && (this._containerTitle = e["container-title"]), Object.hasOwnProperty.call(e, "container-title-short") && (this._containerTitleShort = e["container-title-short"]), Object.hasOwnProperty.call(e, "dimensions") && (this._dimensions = e.dimensions), Object.hasOwnProperty.call(e, "DOI") && (this._DOI = e.DOI), Object.hasOwnProperty.call(e, "edition") && (this._edition = e.edition), Object.hasOwnProperty.call(e, "event") && (this._event = e.event), Object.hasOwnProperty.call(e, "event-title") && (this._eventTitle = e["event-title"]), Object.hasOwnProperty.call(e, "event-place") && (this._eventPlace = e["event-place"]), Object.hasOwnProperty.call(e, "first-reference-note-number") && (this._firstReferenceNoteNumber = e["first-reference-note-number"]), Object.hasOwnProperty.call(e, "genre") && (this._genre = e.genre), Object.hasOwnProperty.call(e, "ISBN") && (this._ISBN = e.ISBN), Object.hasOwnProperty.call(e, "ISSN") && (this._ISSN = e.ISSN), Object.hasOwnProperty.call(e, "issue") && (this._issue = e.issue), Object.hasOwnProperty.call(e, "jurisdiction") && (this._jurisdiction = e.jurisdiction), Object.hasOwnProperty.call(e, "keyword") && (this._keyword = e.keyword), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "medium") && (this._medium = e.medium), Object.hasOwnProperty.call(e, "note") && (this._note = e.note), Object.hasOwnProperty.call(e, "number") && (this._number = e.number), Object.hasOwnProperty.call(e, "number-of-pages") && (this._numberOfPages = e["number-of-pages"]), Object.hasOwnProperty.call(e, "number-of-volumes") && (this._numberOfVolumes = e["number-of-volumes"]), Object.hasOwnProperty.call(e, "original-publisher") && (this._originalPublisher = e["original-publisher"]), Object.hasOwnProperty.call(e, "original-publisher-place") && (this._originalPublisherPlace = e["original-publisher-place"]), Object.hasOwnProperty.call(e, "original-title") && (this._originalTitle = e["original-title"]), Object.hasOwnProperty.call(e, "page") && (this._page = e.page), Object.hasOwnProperty.call(e, "page-first") && (this._pageFirst = e["page-first"]), Object.hasOwnProperty.call(e, "part") && (this._part = e.part), Object.hasOwnProperty.call(e, "part-title") && (this._partTitle = e["part-title"]), Object.hasOwnProperty.call(e, "PMCID") && (this._PMCID = e.PMCID), Object.hasOwnProperty.call(e, "PMID") && (this._PMID = e.PMID), Object.hasOwnProperty.call(e, "printing") && (this._printing = e.printing), Object.hasOwnProperty.call(e, "publisher") && (this._publisher = e.publisher), Object.hasOwnProperty.call(e, "publisher-place") && (this._publisherPlace = e["publisher-place"]), Object.hasOwnProperty.call(e, "references") && (this._references = e.references), Object.hasOwnProperty.call(e, "reviewed-genre") && (this._reviewedGenre = e["reviewed-genre"]), Object.hasOwnProperty.call(e, "reviewed-title") && (this._reviewedTitle = e["reviewed-title"]), Object.hasOwnProperty.call(e, "scale") && (this._scale = e.scale), Object.hasOwnProperty.call(e, "section") && (this._section = e.section), Object.hasOwnProperty.call(e, "source") && (this._source = e.source), Object.hasOwnProperty.call(e, "status") && (this._status = e.status), Object.hasOwnProperty.call(e, "title") && (this._title = e.title), Object.hasOwnProperty.call(e, "title-short") && (this._titleShort = e["title-short"]), Object.hasOwnProperty.call(e, "URL") && (this._URL = e.URL), Object.hasOwnProperty.call(e, "version") && (this._version = e.version), Object.hasOwnProperty.call(e, "volume") && (this._volume = e.volume), Object.hasOwnProperty.call(e, "volume-title") && (this._volumeTitle = e["volume-title"]), Object.hasOwnProperty.call(e, "volume-title-short") && (this._volumeTitleShort = e["volume-title-short"]), Object.hasOwnProperty.call(e, "year-suffix") && (this._yearSuffix = e["year-suffix"]), Object.hasOwnProperty.call(e, "custom") && (this._custom = e.custom), Object.hasOwnProperty.call(e, "userID") && this._addCustomProperty("userID", e.userID), Object.hasOwnProperty.call(e, "groupID") && this._addCustomProperty("groupID", e.groupID), Object.hasOwnProperty.call(e, "creators")) {
    var t = this;
    e.creators.forEach(function(i) {
      var n = {};
      i.firstName && (n.given = i.firstName), i.lastName && (n.family = i.lastName);
      var s = t._author.some(function(r) {
        return !(r.family !== n.family && (r.family || n.family) || r.given !== n.given && (r.given || n.given));
      });
      s || t._author.push(n);
    }, this);
  }
  Object.hasOwnProperty.call(e, "libraryCatalog") && (this._source = e.libraryCatalog), Object.hasOwnProperty.call(e, "place") && (this._eventPlace = e.place, this._publisherPlace = e.place), Object.hasOwnProperty.call(e, "numberOfVolumes") && (this._numberOfVolumes = e.numberOfVolumes), Object.hasOwnProperty.call(e, "callNumber") && (this._callNumber = e.callNumber), Object.hasOwnProperty.call(e, "seriesNumber") && (this._collectionNumber = e.seriesNumber), Object.hasOwnProperty.call(e, "series") && (this._collectionTitle = e.series), Object.hasOwnProperty.call(e, "bookTitle") && (this._containerTitle = e.bookTitle), Object.hasOwnProperty.call(e, "extra") && (this._note = e.extra), Object.hasOwnProperty.call(e, "rights") && (this._license = e.rights), Object.hasOwnProperty.call(e, "archiveLocation") && (this._archiveLocation = e.archiveLocation), Object.hasOwnProperty.call(e, "abstractNote") && (this._abstract = e.abstractNote);
};
f.prototype.getTitle = function() {
  return this._title;
};
f.prototype.getType = function() {
  return this._type;
};
f.prototype.setType = function(e) {
  return this._type = e, this;
};
f.prototype.setCitationKey = function(e) {
  return this._citationKey = e, this;
};
f.prototype.setCategories = function(e) {
  return this._categories = e, this;
};
f.prototype.setLanguage = function(e) {
  return this._language = e, this;
};
f.prototype.setJournalAbbreviation = function(e) {
  return this._journalAbbreviation = e, this;
};
f.prototype.setShortTitle = function(e) {
  return this._shortTitle = e, this;
};
f.prototype.setAuthor = function(e) {
  return this._author = Array.isArray(e) ? e : [e], this;
};
f.prototype.setChair = function(e) {
  return this._chair = Array.isArray(e) ? e : [e], this;
};
f.prototype.setCollectionEditor = function(e) {
  return this._collectionEditor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setCompiler = function(e) {
  return this._compiler = Array.isArray(e) ? e : [e], this;
};
f.prototype.setComposer = function(e) {
  return this._composer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setContainerAuthor = function(e) {
  return this._containerAuthor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setContributor = function(e) {
  return this._contributor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setCurator = function(e) {
  return this._curator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setDirector = function(e) {
  return this._director = Array.isArray(e) ? e : [e], this;
};
f.prototype.setEditor = function(e) {
  return this._editor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setEditorialDirector = function(e) {
  return this._editorialDirector = Array.isArray(e) ? e : [e], this;
};
f.prototype.setExecutiveProducer = function(e) {
  return this._executiveProducer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setGuest = function(e) {
  return this._guest = Array.isArray(e) ? e : [e], this;
};
f.prototype.setHost = function(e) {
  return this._host = Array.isArray(e) ? e : [e], this;
};
f.prototype.setIllustrator = function(e) {
  return this._illustrator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setNarrator = function(e) {
  return this._narrator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setOrganizer = function(e) {
  return this._organizer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setOriginalAuthor = function(e) {
  return this._originalAuthor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setPerformer = function(e) {
  return this._performer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setProducer = function(e) {
  return this._producer = Array.isArray(e) ? e : [e], this;
};
f.prototype.setRecipient = function(e) {
  return this._recipient = Array.isArray(e) ? e : [e], this;
};
f.prototype.setReviewedAuthor = function(e) {
  return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
};
f.prototype.setScriptwriter = function(e) {
  return this._scriptwriter = Array.isArray(e) ? e : [e], this;
};
f.prototype.setSeriesCreator = function(e) {
  return this._seriesCreator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setTranslator = function(e) {
  return this._translator = Array.isArray(e) ? e : [e], this;
};
f.prototype.setAccessed = function(e) {
  return this._accessed = e || {}, this;
};
f.prototype.setContainer = function(e) {
  return this._container = e || {}, this;
};
f.prototype.setEventDate = function(e) {
  return this._eventDate = e || {}, this;
};
f.prototype.setIssued = function(e) {
  return this._issued = e || {}, this;
};
f.prototype.setOriginalDate = function(e) {
  return this._originalDate = e || {}, this;
};
f.prototype.setSubmitted = function(e) {
  return this._submitted = e || {}, this;
};
f.prototype.setAbstract = function(e) {
  return this._abstract = e, this;
};
f.prototype.setAnnote = function(e) {
  return this._annote = e, this;
};
f.prototype.setArchive = function(e) {
  return this._archive = e, this;
};
f.prototype.setArchiveCollection = function(e) {
  return this._archiveCollection = e, this;
};
f.prototype.setArchiveLocation = function(e) {
  return this._archiveLocation = e, this;
};
f.prototype.setArchivePlace = function(e) {
  return this._archivePlace = e, this;
};
f.prototype.setAuthority = function(e) {
  return this._authority = e, this;
};
f.prototype.setCallNumber = function(e) {
  return this._callNumber = e, this;
};
f.prototype.setChapterNumber = function(e) {
  return this._chapterNumber = e, this;
};
f.prototype.setCitationNumber = function(e) {
  return this._citationNumber = e, this;
};
f.prototype.setCitationLabel = function(e) {
  return this._citationLabel = e, this;
};
f.prototype.setCollectionNumber = function(e) {
  return this._collectionNumber = e, this;
};
f.prototype.setCollectionTitle = function(e) {
  return this._collectionTitle = e, this;
};
f.prototype.setContainerTitle = function(e) {
  return this._containerTitle = e, this;
};
f.prototype.setContainerTitleShort = function(e) {
  return this._containerTitleShort = e, this;
};
f.prototype.setDimensions = function(e) {
  return this._dimensions = e, this;
};
f.prototype.setDOI = function(e) {
  return this._DOI = e, this;
};
f.prototype.setEdition = function(e) {
  return this._edition = e, this;
};
f.prototype.setEvent = function(e) {
  return this._event = e, this;
};
f.prototype.setEventTitle = function(e) {
  return this._eventTitle = e, this;
};
f.prototype.setEventPlace = function(e) {
  return this._eventPlace = e, this;
};
f.prototype.setFirstReferenceNoteNumber = function(e) {
  return this._firstReferenceNoteNumber = e, this;
};
f.prototype.setGenre = function(e) {
  return this._genre = e, this;
};
f.prototype.setISBN = function(e) {
  return this._ISBN = e, this;
};
f.prototype.setISSN = function(e) {
  return this._ISSN = e, this;
};
f.prototype.setIssue = function(e) {
  return this._issue = e, this;
};
f.prototype.setJurisdiction = function(e) {
  return this._jurisdiction = e, this;
};
f.prototype.setKeyword = function(e) {
  return this._keyword = e, this;
};
f.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
f.prototype.setMedium = function(e) {
  return this._medium = e, this;
};
f.prototype.setNote = function(e) {
  return this._note = e, this;
};
f.prototype.setNumber = function(e) {
  return this._number = e, this;
};
f.prototype.setNumberOfPages = function(e) {
  return this._numberOfPages = e, this;
};
f.prototype.setNumberOfVolumes = function(e) {
  return this._numberOfVolumes = e, this;
};
f.prototype.setOriginalPublisher = function(e) {
  return this._originalPublisher = e, this;
};
f.prototype.setOriginalPublisherPlace = function(e) {
  return this._originalPublisherPlace = e, this;
};
f.prototype.setOriginalTitle = function(e) {
  return this._originalTitle = e, this;
};
f.prototype.setPage = function(e) {
  return this._page = e, this;
};
f.prototype.setPageFirst = function(e) {
  return this._pageFirst = e, this;
};
f.prototype.setPart = function(e) {
  return this._part = e, this;
};
f.prototype.setPartTitle = function(e) {
  return this._partTitle = e, this;
};
f.prototype.setPMCID = function(e) {
  return this._PMCID = e, this;
};
f.prototype.setPMID = function(e) {
  return this._PMID = e, this;
};
f.prototype.setPrinting = function(e) {
  return this._printing = e, this;
};
f.prototype.setPublisher = function(e) {
  return this._publisher = e, this;
};
f.prototype.setPublisherPlace = function(e) {
  return this._publisherPlace = e, this;
};
f.prototype.setReferences = function(e) {
  return this._references = e, this;
};
f.prototype.setReviewedGenre = function(e) {
  return this._reviewedGenre = e, this;
};
f.prototype.setReviewedTitle = function(e) {
  return this._reviewedTitle = e, this;
};
f.prototype.setScale = function(e) {
  return this._scale = e, this;
};
f.prototype.setSection = function(e) {
  return this._section = e, this;
};
f.prototype.setSource = function(e) {
  return this._source = e, this;
};
f.prototype.setStatus = function(e) {
  return this._status = e, this;
};
f.prototype.setTitle = function(e) {
  return this._title = e, this;
};
f.prototype.setTitleShort = function(e) {
  return this._titleShort = e, this;
};
f.prototype.setURL = function(e) {
  return this._URL = e, this;
};
f.prototype.setVersion = function(e) {
  return this._version = e, this;
};
f.prototype.setVolume = function(e) {
  return this._volume = e, this;
};
f.prototype.setVolumeTitle = function(e) {
  return this._volumeTitle = e, this;
};
f.prototype.setVolumeTitleShort = function(e) {
  return this._volumeTitleShort = e, this;
};
f.prototype.setYearSuffix = function(e) {
  return this._yearSuffix = e, this;
};
f.prototype.setCustom = function(e) {
  return this._custom = Object.assign(this._custom, e), this;
};
f.prototype.toJSON = function(e) {
  var t = {};
  if (t.id = this._id, this._type !== void 0 && this._type !== "" && (t.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), this._language !== void 0 && this._language !== "" && (t.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (t.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (t.shortTitle = this._shortTitle, this._titleShort === void 0 && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (t.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (t.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (t.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (t.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (t.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (t["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (t.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (t["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (t["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (t["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (t["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (t["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (t["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (t["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (t["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (t.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (t.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (t.edition = this._edition), this._event !== void 0 && this._event !== "" && (t.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (t["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (t["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (t.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (t.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (t.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (t.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (t.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (t.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (t.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (t.medium = this._medium), this._note !== void 0 && this._note !== "" && (t.note = this._note), this._number !== void 0 && this._number !== "" && (t.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (t["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (t["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (t["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (t["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (t["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (t.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (t["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (t.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (t["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (t.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (t.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (t.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (t.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (t["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (t.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (t["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (t["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (t.scale = this._scale), this._section !== void 0 && this._section !== "" && (t.section = this._section), this._source !== void 0 && this._source !== "" && (t.source = this._source), this._status !== void 0 && this._status !== "" && (t.status = this._status), this._title !== void 0 && this._title !== "" && (t.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (t["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (t.URL = this._URL), this._version !== void 0 && this._version !== "" && (t.version = this._version), this._volume !== void 0 && this._volume !== "" && (t.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (t["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (t["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (t["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0) {
    var i = this._custom, {
      userID: n,
      groupID: s
    } = i, r = oi(i, Wi);
    Object.keys(r).length > 0 && (t.custom = r);
  }
  return this._license !== void 0 && this._license !== "" && (t.license = this._license), t;
};
function J(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItem: id is required");
  this.id = e, this._itemData = new f(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
J.prototype.fillFromObject = function(e) {
  var t = this;
  Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(i) {
    t.addUri(i);
  }, this);
};
J.prototype.getInfoForCitationCluster = function() {
  var e = {
    id: this.id,
    "suppress-author": this._suppressAuthor
  };
  return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
};
J.prototype.getItemData = function() {
  return this._itemData;
};
J.prototype.getProperty = function(e) {
  return this._itemData.getCustomProperty(e) !== null ? this._itemData.getCustomProperty(e) : null;
};
J.prototype.setPrefix = function(e) {
  return this._prefix = e, this;
};
J.prototype.setSuffix = function(e) {
  return this._suffix = e, this;
};
J.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
J.prototype.setLabel = function(e) {
  if (e) {
    var t = ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"];
    if (t.indexOf(e) === -1)
      throw new Error('CitationItem.setLocator: Invalid label "' + e + '"');
    this._label = e;
  }
  return this;
};
J.prototype.setSuppressAuthor = function(e) {
  return this._suppressAuthor = e, this;
};
J.prototype.setAuthorOnly = function(e) {
  return this._authorOnly = e, this;
};
J.prototype.addUri = function(e) {
  return this._uris.indexOf(e) !== -1 ? this : (this._uris.push(e), this);
};
J.prototype.toJSON = function(e) {
  var t = {};
  t.id = this.id, this._itemData && (t.itemData = this._itemData.toJSON ? this._itemData.toJSON(e || !1) : this._itemData), this._prefix !== void 0 && (t.prefix = this._prefix), this._suffix !== void 0 && (t.suffix = this._suffix), this._locator !== void 0 && (t.locator = this._locator), this._label !== void 0 && (t.label = this._label), this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (t["author-only"] = this._authorOnly);
  var i = this._uris.filter(function(o) {
    return o.indexOf("localhost") === -1 && o.indexOf("api.zotero.org") === -1;
  });
  if (i.length)
    t.uris = i;
  else {
    var n = this._itemData && this._itemData.getCustomProperty ? this._itemData.getCustomProperty("userID") : null, s = this._itemData && this._itemData.getCustomProperty ? this._itemData.getCustomProperty("groupID") : null, r = typeof this.id == "string" ? this.id : "";
    r && n ? t.uris = ["http://zotero.org/users/" + n + "/items/" + r] : r && s ? t.uris = ["http://zotero.org/groups/" + s + "/items/" + r] : t.uris = [];
  }
  return t;
};
J.prototype.toFlatJSON = function(e) {
  var t = {
    id: this.id,
    index: e
  };
  this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(t, i), typeof this._itemData.getCustomProperty("userID") < "u" && this._itemData.getCustomProperty("userID") !== null && (t.userID = String(this._itemData.getCustomProperty("userID"))), typeof this._itemData.getCustomProperty("groupID") < "u" && this._itemData.getCustomProperty("groupID") !== null && (t.groupID = String(this._itemData.getCustomProperty("groupID"))), t;
};
var Ki = ["index"], q = /* @__PURE__ */ new WeakSet();
class Nt {
  /** @param {string} [citationID] */
  constructor(t) {
    ce(this, q), t || (t = c(q, this, ii).call(this)), Ct._.has(t) && (console.warn("Citation ID must be unique"), t = c(q, this, ii).call(this)), Ct._.add(t), this.citationID = t, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://github.com/citation-style-language/schema/raw/master/csl-citation.json";
  }
  static resetUsedIDs() {
    Ct._ = /* @__PURE__ */ new Set();
  }
  /**
   * @param {any} citationObject
   * @returns
   */
  fillFromObject(t) {
    return Object.hasOwnProperty.call(t, "properties") || Object.hasOwnProperty.call(t, "manualOverride") || Object.hasOwnProperty.call(t, "schema") ? c(q, this, zi).call(this, t) : Object.hasOwnProperty.call(t, "citationItems") ? c(q, this, qi).call(this, t) : Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? c(q, this, Di).call(this, t) : c(q, this, li).call(this, t);
  }
  getCitationItems() {
    return this._citationItems;
  }
  /**
   * @returns {boolean}
   */
  getDoNotUpdate() {
    return Object.hasOwnProperty.call(this._properties, "dontUpdate") ? !!this._properties.dontUpdate : Object.hasOwnProperty.call(this._manualOverride, "isManuallyOverridden") ? !!this._manualOverride.isManuallyOverridden : !1;
  }
  /**
   *
   * @returns {Array<InfoForCitationCluster>}
   */
  getInfoForCitationCluster() {
    return this._citationItems.map(function(t) {
      return t.getInfoForCitationCluster();
    }, this);
  }
  /** @returns {string} */
  getPlainCitation() {
    return Object.hasOwnProperty.call(this._properties, "plainCitation") ? String(this._properties.plainCitation) : this._manualOverride && Object.keys(this._manualOverride).length > 0 ? String(this._manualOverride.citeprocText) : "";
  }
  /**
   * @param {CitationItem} item
   * @returns
   */
  /**
   * @returns {CSLCitation}
   */
  setDoNotUpdate() {
    return c(q, this, qe).call(this, {
      dontUpdate: !0
    }), this;
  }
  /**
   * @param {number} noteIndex
   * @returns {CSLCitation}
   */
  setNoteIndex(t) {
    return c(q, this, qe).call(this, {
      noteIndex: t
    }), this;
  }
  /**
   * @param {string} plainCitation
   * @returns
   */
  setPlainCitation(t) {
    return c(q, this, qe).call(this, {
      plainCitation: t
    }), this;
  }
  /**
   * @param {string} formattedCitation
   * @returns
   */
  setFormattedCitation(t) {
    return c(q, this, qe).call(this, {
      formattedCitation: t
    }), this;
  }
  /**
   * @param {string} citeprocText
   * @param {string} [manualOverrideText]
   * @returns
   */
  setManualOverride(t, i) {
    var n = {
      citeprocText: t,
      isManuallyOverridden: !!i,
      manualOverrideText: i || ""
    };
    return this._manualOverride = n, this;
  }
  /**
   * @param {Object<string, string | number | boolean>} properties
   * @returns
   */
  validate() {
    var t = [];
    if (this._schema || t.push("Schema is required"), this.citationID || t.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems))
      for (var i = 0; i < this._citationItems.length; i++)
        this._citationItems[i].id || t.push("Citation item at index " + i + " must have an id");
    return t.length === 0 ? !0 : t;
  }
  toJSON() {
    var t = (
      /** @type {any} */
      {
        citationID: this.citationID,
        schema: this._schema
      }
    );
    if (this._properties && Object.keys(this._properties).length > 0) {
      var i = this._properties, {
        index: n
      } = i, s = oi(i, Ki);
      Object.keys(s).length > 0 && (t.properties = s);
    }
    return this._manualOverride && Object.keys(this._manualOverride).length > 0 && (t.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (t.citationItems = this._citationItems.map(function(r) {
      return r.toJSON();
    })), t;
  }
}
function zi(e) {
  var t = this;
  if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && c(q, this, qe).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems"))
    return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(n) {
    return n.id;
  });
  return e.citationItems.forEach(function(n) {
    var s = n.id, r;
    i.indexOf(s) >= 0 ? r = t._citationItems[i.indexOf(s)] : (r = new J(s), i.push(s)), typeof s == "number" && (s = c(q, t, Zi).call(t, n)), r.fillFromObject(n), c(q, t, Rt).call(t, r);
  }, this), i.length;
}
function qi(e) {
  var t = this;
  return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(i) {
    c(q, t, li).call(t, i);
  }, this), 1);
}
function li(e) {
  var t = e.id, i, n = this._citationItems.map(function(s) {
    return s.id;
  });
  return n.indexOf(t) >= 0 ? i = this._citationItems[n.indexOf(t)] : i = new J(t), i.fillFromObject(e), c(q, this, Rt).call(this, i), 1;
}
function Di(e) {
  if (!Object.hasOwnProperty.call(e, "data"))
    return console.error("Invalid citation object"), 0;
  var t = this._citationItems.map(function(s) {
    return s.id;
  }), i = e.data.key, n;
  return t.indexOf(i) >= 0 ? n = this._citationItems[t.indexOf(i)] : n = new J(i), n.fillFromObject(e), c(q, this, Rt).call(this, n), 1;
}
function Rt(e) {
  var t = this._citationItems.map(function(i) {
    return i.id;
  });
  return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
}
function qe(e) {
  var t = this;
  return Object.keys(e).forEach(function(i) {
    Object.hasOwnProperty.call(e, i) && (t._properties[i] = e[i]);
  }, this), this;
}
function Zi(e) {
  if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
    var t = e.uris[0].lastIndexOf("/");
    return e.uris[0].slice(t + 1);
  }
  return e.id;
}
function ii() {
  return Math.random().toString(36).substring(2, 15);
}
var Ct = {
  _: /* @__PURE__ */ new Set()
}, V = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakSet();
class Ji {
  constructor() {
    ce(this, de), B(this, V, void 0), B(this, ut, void 0), B(this, je, void 0), B(this, ht, void 0), x(V, this, new window.Asc.PluginWindow()), x(ut, this, window.Asc.plugin.button), x(je, this, Asc.plugin.onThemeChanged), x(ht, this, Asc.plugin.onTranslate);
  }
  /**
   * @param {string} description
   * @param {string} text
   */
  show(t, i) {
    x(V, this, new window.Asc.PluginWindow());
    var n = {
      name: "Zotero",
      url: "info-window.html",
      description: window.Asc.plugin.tr(t),
      isVisual: !0,
      buttons: [{
        text: window.Asc.plugin.tr("Yes"),
        primary: !0,
        isViewer: !1
      }, {
        text: window.Asc.plugin.tr("No"),
        primary: !1
      }],
      isModal: !1,
      EditorsSupport: ["word"],
      size: [380, 240],
      isViewer: !0,
      isDisplayedInViewer: !1,
      isInsideMode: !1
    };
    return c(de, this, At).call(this, n, i, "default"), a(V, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = (o, l) => {
        s(o === 0), c(de, this, nt).call(this);
      };
    });
  }
  /**
   * @param {any} content
   */
  showEditWindow(t) {
    var i = this;
    x(V, this, new window.Asc.PluginWindow());
    var n = {
      name: "Zotero",
      url: "edit-window.html",
      description: window.Asc.plugin.tr("Edit citation"),
      isVisual: !0,
      buttons: [{
        text: window.Asc.plugin.tr("Save"),
        primary: !0,
        isViewer: !1
      }, {
        text: window.Asc.plugin.tr("Cancel"),
        primary: !1
      }],
      isModal: !1,
      EditorsSupport: ["word"],
      size: [380, 150],
      isViewer: !0,
      isDisplayedInViewer: !1,
      isInsideMode: !1
    };
    return c(de, this, At).call(this, n, t, "default"), a(V, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = /* @__PURE__ */ (function() {
        var o = E(function* (l, h) {
          var u = yield new Promise((y) => {
            if (!a(V, i)) {
              y(null);
              return;
            }
            a(V, i).attachEvent("onSaveFields", y), a(V, i).command("onClickSave");
          });
          s(l === 0 ? u : null), c(de, i, nt).call(i);
        });
        return function(l, h) {
          return o.apply(this, arguments);
        };
      })();
    });
  }
  /**
   * @param {string} description
   * @param {string} text
   * @param {"default" | "warning" | "success"} [type]
   */
  showInfoWindow(t, i, n) {
    typeof n != "string" && (n = "warning"), x(V, this, new window.Asc.PluginWindow());
    var s = {
      name: "Mendeley",
      url: "info-window.html",
      description: window.Asc.plugin.tr(t),
      isVisual: !0,
      buttons: [{
        text: window.Asc.plugin.tr("OK"),
        primary: !0,
        isViewer: !1
      }],
      isModal: !1,
      EditorsSupport: ["word"],
      size: [350, 76],
      isViewer: !0,
      isDisplayedInViewer: !1,
      isInsideMode: !1
    };
    return c(de, this, At).call(this, s, window.Asc.plugin.tr(i), n), a(V, this).show(s), new Promise((r, o) => {
      window.Asc.plugin.button = (l, h) => {
        r(l === 0), c(de, this, nt).call(this);
      };
    });
  }
  destroy() {
    c(de, this, nt).call(this), x(V, this, null);
  }
}
function At(e, t, i) {
  a(V, this) && (x(ut, this, window.Asc.plugin.button), x(je, this, Asc.plugin.onThemeChanged), x(ht, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (n) => {
    var s;
    (s = a(V, this)) === null || s === void 0 || s.command("onThemeChanged", n), a(je, this).call(this, n);
  }, window.Asc.plugin.onTranslate = () => {
    var n;
    (n = a(V, this)) === null || n === void 0 || n.command("onTranslate"), a(ht, this).call(this);
  }, a(V, this).attachEvent("onWindowReady", () => {
    if (i === "warning") {
      var n;
      (n = a(V, this)) === null || n === void 0 || n.command("onWarning", t);
    } else if (i === "success") {
      var s;
      (s = a(V, this)) === null || s === void 0 || s.command("onSuccess", t);
    } else {
      var r;
      (r = a(V, this)) === null || r === void 0 || r.command("onAttachedContent", t);
    }
  }), a(V, this).attachEvent("onUpdateHeight", (n) => {
    var s;
    Asc.plugin.executeMethod("ResizeWindow", [(s = a(V, this)) === null || s === void 0 ? void 0 : s.id, [e.size[0] - 2, n]], () => {
    });
  }));
}
function nt() {
  a(V, this) && a(V, this).close(), window.Asc.plugin.button = a(ut, this), window.Asc.plugin.onThemeChanged = a(je, this);
}
var Le = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet();
class Yi {
  /**
   * @param {LocalesManager} localesManager
   * @param {CslStylesManager} cslStylesManager
   * @param {ZoteroSdk} sdk
   */
  constructor(t, i, n) {
    ce(this, T), B(this, Le, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = t, this._cslStylesManager = i, this._storage = new Ui(), this._formatter, this.citationDocService = new Fi(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), x(Le, this, new Ji());
  }
  /** @returns {Promise<AddinFieldData | null>} */
  getCurrentField() {
    var t = this;
    return E(function* () {
      return t.citationDocService.getCurrentField();
    })();
  }
  /**
   * @returns {Promise<boolean>}
   */
  saveAsText() {
    var t = this;
    return E(function* () {
      var i = yield t.citationDocService.saveAsText();
      return i && a(Le, t).showInfoWindow("Success!", "All active Mendeley citations and Bibliography have been replaced.", "success"), i;
    })();
  }
  /**
   * @param {Array<SearchResultItem>} items
   * @returns {Promise<boolean>}
   */
  insertSelectedCitations(t) {
    var i = this;
    return E(function* () {
      var n = i;
      try {
        yield c(T, i, xe).call(i), c(T, i, Ce).call(i);
      } catch (l) {
        throw l;
      }
      var s = new Nt("");
      for (var r in t) {
        var o = t[r];
        s.fillFromObject(o);
      }
      return c(T, i, $i).call(i, t).then((l) => (l.forEach(function(h) {
        s.fillFromObject(h);
      }), i._storage.addCslCitation(s), c(T, n, ji).call(n, s)));
    })();
  }
  /** @returns {Promise<string>} */
  insertBibliography() {
    var t = this;
    return E(function* () {
      try {
        var {
          fieldsWithCitations: i,
          bibFieldValue: n,
          bibField: s
        } = yield c(T, t, xe).call(t), r = i.length === 0;
        if (c(T, t, Ce).call(t), s) {
          var o = [yield c(T, t, st).call(t, r, s)];
          return t.citationDocService.updateAddinFields(o).then((l) => l ? l[0] : "");
        } else
          return c(T, t, Xi).call(t, r, n);
      } catch (l) {
        throw l;
      }
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBegin]
   * @returns {Promise<void>}
   */
  moveCursorToField(t, i) {
    var n = this;
    return E(function* () {
      return n.citationDocService.moveCursorToField(t, i);
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBeforeField]
   * @returns {Promise<void>}
   */
  moveCursorOutsideField(t, i) {
    var n = this;
    return E(function* () {
      return n.citationDocService.moveCursorOutsideField(t, i);
    })();
  }
  /**
   * @returns {Promise<void>}
   */
  moveCursorRight() {
    var t = this;
    return E(function* () {
      return t.citationDocService.moveCursorRight();
    })();
  }
  /**
   * @param {boolean} [bHardRefresh]
   * @returns {Promise<void>}
   */
  updateCslItems(t) {
    var i = this;
    return E(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(T, i, xe).call(i), r = n.length === 0;
        c(T, i, Ce).call(i);
        var o = [];
        if (typeof t > "u") {
          var l = i._cslStylesManager.getLastUsedFormat();
          l === "numeric" && (t = !0);
        }
        if (typeof t == "boolean" && (o = yield c(T, i, ze).call(i, n, t)), s && o.push(yield c(T, i, st).call(i, r, s)), o && o.length)
          return i.citationDocService.updateAddinFields(o);
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * // it is a crutch, because "SelectAddinField" does not work with notes
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  updateCslItemsInNotes(t) {
    var i = this;
    return E(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(T, i, xe).call(i), r = n.length === 0;
        c(T, i, Ce).call(i);
        var o = yield c(T, i, ze).call(i, n, !1);
        if (o && o.length && (yield i.citationDocService.convertNotesStyle(o, t)), s) {
          var l = [yield c(T, i, st).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(l);
        }
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * @param {Object & {citationID: string}} updatedField
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  updateItem(t, i) {
    var n = this;
    return E(function* () {
      try {
        var {
          fieldsWithCitations: s,
          bibField: r
        } = yield c(T, n, xe).call(n, t), o = s.length === 0;
        c(T, n, Ce).call(n);
        var l = yield c(T, n, ze).call(n, s, !0);
        if (i && l && l.length && (yield n.citationDocService.convertNotesStyle(l, i), l = []), l && l.length)
          return n.citationDocService.updateAddinFields(l);
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  switchingBetweenNotesAndText(t) {
    var i = this;
    return E(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(T, i, xe).call(i), r = n.length === 0;
        c(T, i, Ce).call(i);
        var o = yield c(T, i, ze).call(i, n, !0);
        if (o && o.length && (t ? yield i.citationDocService.convertTextToNotes(o, t) : yield i.citationDocService.convertNotesToText(o)), s) {
          var l = [yield c(T, i, st).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(l);
        }
      } catch (h) {
        throw h;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  convertNotesStyle(t) {
    var i = this;
    return E(function* () {
      try {
        var {
          fieldsWithCitations: n
        } = yield c(T, i, xe).call(i);
        c(T, i, Ce).call(i);
        var s = yield c(T, i, ze).call(i, n, !1, !0);
        if (!s || !s.length) return;
        yield i.citationDocService.convertNotesStyle(s, t);
      } catch (r) {
        throw r;
      }
    })();
  }
  /**
   * @param {AddinFieldData} field
   * @returns {Promise<Object & {citationID: string} | null>}
   */
  showEditCitationWindow(t) {
    var i = this;
    return E(function* () {
      if (!t) return null;
      var n = c(T, i, Tt).call(i, t), s = yield a(Le, i).showEditWindow(n);
      return s || null;
    })();
  }
  /** @param {string} message */
  showWarningMessage(t) {
    var i = this;
    return E(function* () {
      a(Le, i).showInfoWindow("Warning!", t);
    })();
  }
}
function ji(e) {
  var t = this, i = !1;
  return Promise.resolve().then(function() {
    if (e.getCitationItems().forEach(function(s) {
      t._storage.hasItem(s.id) || (i = !0);
    }), i) {
      var n = [];
      t._storage.forEachItem(function(s, r) {
        n.push(r);
      }), t._formatter.updateItems(n);
    }
  }).then(function() {
    var n = document.createDocumentFragment(), s = document.createElement("div"), r = t._storage.getCitationsPre(e.citationID), o = t._storage.getCitationsPost(e.citationID), l = t._storage.getAllCitationsInJson();
    t._formatter.rebuildProcessorState(l);
    var h = t._formatter.processCitationCluster(e.toJSON(), r, o), u = c(T, t, Ht).call(t, h[1][0][1]);
    n.appendChild(s), s.innerHTML = u, e.setPlainCitation(s.innerText), e.setFormattedCitation(u);
    var y = null;
    return t._cslStylesManager.getLastUsedFormat() === "note" && (y = t._cslStylesManager.getLastUsedNotesStyle()), t.citationDocService.addCitation(u, JSON.stringify(e.toJSON()), y);
  });
}
function $i(e) {
  var t = [], i = {};
  for (var n in e) {
    var s = e[n], r = s.userID, o = s.groupID;
    r ? t.push(s.id) : o && (i[o] || (i[o] = []), i[o].push(s.id));
  }
  var l = [];
  t.length && l.push(this._sdk.getItems(null, t, "json").then(function(u) {
    return u.items || [];
  }));
  for (var h in i)
    Object.hasOwnProperty.call(i, h) && l.push(this._sdk.getGroupItems(null, h, i[h], "json").then(function(u) {
      return u.items || [];
    }));
  return Promise.all(l).then(function(u) {
    return u.reduce((y, v) => y.concat(v), []);
  });
}
function ci() {
  try {
    for (var e = new Array(this._storage.size), t = this._formatter.makeBibliography(), i = 0; i < t[1].length; i++) {
      var n = c(T, this, Ht).call(this, t[1][i]);
      n = n.replaceAll(`
`, "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
      var s = '<div class="csl-entry">', r = "</div>";
      t[0]["second-field-align"] ? n.indexOf(s) === 0 && n.endsWith(r) && (n = s + n.substring(s.length, n.length - r.length).trim() + r) : (n = n.replace(/<\/?div[^>]*>/g, ""), n = "<p>" + n + "</p>"), window.Asc.scope.editorVersion < 9004e3 && (n += `
`), e.push(n);
    }
    var o = e.join("").trim();
    return Asc.scope.bibStyle = t[0], o;
  } catch (l) {
    if (this._cslStylesManager.isLastUsedStyleContainBibliography() === !1)
      a(Le, this).showInfoWindow("Warning!", "Style does not describe the bibliography");
    else
      throw console.error(l), "Failed to apply this style.";
    return "";
  }
}
function Tt(e) {
  var t, i = e.Value.indexOf("{"), n = e.Value.lastIndexOf("}");
  if (i !== -1) {
    var s = e.Value.slice(i, n + 1);
    t = JSON.parse(s);
  }
  return t;
}
function xe(e) {
  var t = this;
  return this._storage.clear(), Nt.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
    var n = 0, s = " ", r = i.find(function(u) {
      return u.Value.indexOf(t._bibPrefixNew) !== -1 || u.Value.indexOf(t._bibPrefix) !== -1;
    });
    if (r) {
      var o = c(T, t, Tt).call(t, r);
      typeof o == "object" && Object.keys(o).length > 0 && (s = JSON.stringify(o));
    }
    var l = i.filter(function(u) {
      return u.Value.indexOf(t._citPrefixNew) !== -1 || u.Value.indexOf(t._citPrefix) !== -1;
    }), h = l.map(function(u) {
      var y = c(T, t, Tt).call(t, u), v = "";
      u.Value.indexOf(t._citPrefix) === -1 && (v = y.citationID);
      var m = new Nt(v);
      return e ? n += m.fillFromObject(e) : n += m.fillFromObject(y), t._storage.addCslCitation(m), {
        field: ri({}, u),
        cslCitation: m
      };
    });
    return e && (h = h.filter(function(u) {
      return u.cslCitation.citationID === e.citationID;
    })), {
      bibField: r,
      bibFieldValue: s,
      fieldsWithCitations: h
    };
  });
}
function Xi(e, t) {
  var i = c(T, this, ci).call(this);
  if (e && (i = g(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography())
    return this.citationDocService.addBibliography(i, t);
  throw "The current bibliographic style does not describe the bibliography";
}
function st(e, t) {
  if (e)
    t.Content = g(this._bibPlaceholderIfEmpty);
  else {
    var i = c(T, this, ci).call(this);
    t.Content = i;
  }
  return t;
}
function ze(e, t, i) {
  return Mt.apply(this, arguments);
}
function Mt() {
  return Mt = E(function* (e, t, i) {
    var n = document.createDocumentFragment(), s = document.createElement("div");
    n.appendChild(s);
    for (var r = [], o = e.length - 1; o >= 0; o--) {
      var l = !!i, {
        field: h,
        cslCitation: u
      } = e[o], y = this._storage.getCitationsPre(u.citationID), v = this._storage.getCitationsPost(u.citationID), m = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(m);
      var w = this._formatter.processCitationCluster(u.toJSON(), y, v), C = c(T, this, Ht).call(this, w[1][0][1]);
      s.innerHTML = C, u.setFormattedCitation(C);
      var I = u.getPlainCitation(), O = h.Content;
      I === "" && (I = O);
      var k = s.innerText;
      if (!u.getDoNotUpdate()) {
        if (I !== O && !t) {
          var G = "<p>" + g("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + g("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + g("Original:") + " " + k + "</p><p>" + g("Modified:") + " " + O + "</p>", $ = yield a(Le, this).show("Saving custom edits", G);
          $ ? (u.setDoNotUpdate(), delete h.Content) : (h.Content = C, u.setPlainCitation(k)), l = !0;
        } else
          (k !== O || I !== O || I !== k) && (l = !0), h.Content = C, u.setPlainCitation(k);
        if (u) {
          var Q = this._citPrefixNew + " " + this._citSuffixNew + " " + JSON.stringify(u.toJSON());
          h.Value !== Q && (l = !0), h.Value = Q;
        }
        l && r.push(h);
      }
    }
    return r;
  }), Mt.apply(this, arguments);
}
function Ce() {
  var e = this, t = [];
  this._storage.forEachItem(function(i, n) {
    t.push(n);
  }), this._formatter = new CSL.Engine({
    /** @param {string} id */
    retrieveLocale: function(n) {
      return e._localesManager.getLocale(n) ? e._localesManager.getLocale(n) : e._localesManager.getLocale();
    },
    /** @param {string} id */
    retrieveItem: function(n) {
      var s = e._storage.getItem(n), r = e._storage.getItemIndex(n);
      return s ? s.toFlatJSON(r) : null;
    }
  }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), !0), t.length && this._formatter.updateItems(t);
}
function Ht(e) {
  return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
class ni {
  /** @returns {Promise<number>} */
  static getCursorPosition() {
    return new Promise(function(t) {
      var i = !1, n = !1;
      Asc.plugin.callCommand(() => {
        var s = Api.GetDocument(), r = 0;
        if (!s)
          return r;
        var o = s.GetCurrentRun();
        if (!o)
          return r;
        var l = o.GetRange(0, 0);
        return l ? l.GetEndPos() : r;
      }, n, i, t);
    });
  }
  /**
   * @param {number} pos 
   * @returns {Promise<void>}
   */
  static setCursorPosition(t) {
    return new Promise(function(i) {
      var n = !1, s = !1;
      Asc.scope.pos = t, Asc.plugin.callCommand(function() {
        var r = Api.GetDocument();
        r.MoveCursorToPos(Asc.scope.pos);
      }, s, n, i);
    });
  }
}
var $e = {
  /**
   * Parse a style object to extract relevant information.
   * @param {string} name
   * @param {string} style - A style string
   * @returns {StyleInfo} An object containing the parsed style information.
   */
  getStyleInfo: function(t, i) {
    var n = new DOMParser(), s = n.parseFromString(i, "text/xml"), r = {
      categories: {
        fields: [],
        format: ""
      },
      dependent: 0,
      href: "",
      name: t,
      title: "",
      updated: ""
    }, o = s.querySelector("info title");
    o && (r.title = o.textContent);
    var l = s.querySelector('info link[rel="self"]');
    if (l) {
      var h = l.getAttribute("href");
      h && (r.href = h);
    }
    var u = s.querySelector('info link[rel="independent-parent"]');
    if (u) {
      var y = u.getAttribute("href");
      y && (r.parent = y), r.dependent = 1;
    }
    var v = s.querySelector("info updated");
    v && (r.updated = v.textContent);
    var m = s.querySelector("info category[citation-format]");
    if (m) {
      var w = m.getAttribute("citation-format");
      w && (r.categories.format = w);
    }
    var C = s.querySelectorAll("info category[field]");
    return C && C.forEach(function(I) {
      var O = I.getAttribute("field");
      O && r.categories.fields.push(O);
    }), r;
  },
  /**
   * @param {string} styleContent
   * @returns {StyleFormat}
   */
  getCitationFormat: function(t) {
    var i = new DOMParser(), n = i.parseFromString(t, "text/xml"), s = n.querySelector("info category[citation-format]");
    if (!s) throw new Error("Citation format not found");
    var r = s.getAttribute("citation-format");
    if (!r) throw new Error("Citation format not found");
    switch (r) {
      case "note":
      case "numeric":
      case "author":
      case "author-date":
      case "label":
        return r;
    }
    throw new Error("Invalid citation format");
  },
  /**
   * @param {string} styleContent
   * @returns {boolean}
   */
  isStyleContainBibliography: function(t) {
    return t.indexOf("<bibliography") > -1;
  }
};
function Oe() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
Oe.prototype.getStyleNames = function() {
  var e = localStorage.getItem(this._customStyleNamesKey);
  return e ? JSON.parse(e) : [];
};
Oe.prototype._getStyles = function() {
  var e = localStorage.getItem(this._customStylesKey);
  return e ? JSON.parse(e) : [];
};
Oe.prototype.getStyle = function(e) {
  var t = this.getStyleNames(), i = t.indexOf(e);
  return i === -1 ? null : this._getStyles()[i];
};
Oe.prototype.getStylesInfo = function() {
  for (var e = this.getStyleNames(), t = this._getStyles(), i = [], n = 0; n < e.length; n++) {
    var s = $e.getStyleInfo(e[n], t[n]);
    i.push(s);
  }
  return i;
};
Oe.prototype.setStyle = function(e, t) {
  var i = this.getStyleNames(), n = this._getStyles(), s = i.indexOf(e);
  return s === -1 && (s = i.length), i[s] = e, n[s] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), $e.getStyleInfo(e, t);
};
Oe.prototype.deleteStyle = function(e) {
  var t = this.getStyleNames(), i = this._getStyles(), n = t.indexOf(e);
  return n === -1 || (t.splice(n, 1), i.splice(n, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), e;
};
function z(e) {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new Oe(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
z.prototype.addCustomStyle = function(e) {
  var t = this;
  return new Promise(function(i, n) {
    var s = e.name.toLowerCase();
    s.slice(-4) === ".csl" || s.slice(-4) === ".xml" ? s = s.substring(0, s.length - 4).trim() : n("Please select a .csl or .xml file."), e.size > 1024 * 1024 && n("Maximum file size is 1 MB."), i(s);
  }).then(function(i) {
    return t._readCSLFile(e).then(function(n) {
      return t._defaultStyles.indexOf(i) === -1 && t._defaultStyles.push(i), t._customStylesStorage.setStyle(i, n);
    });
  });
};
z.prototype.getLastUsedFormat = function() {
  var e = localStorage.getItem(this._lastFormatKey);
  switch (e) {
    case "note":
    case "numeric":
    case "author":
    case "author-date":
    case "label":
      return e;
  }
  return "numeric";
};
z.prototype.getLastUsedNotesStyle = function() {
  var e = localStorage.getItem(this._lastNotesStyleKey);
  return e === "footnotes" || e === "endnotes" ? e : "footnotes";
};
z.prototype.getLastUsedStyleId = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || null;
};
z.prototype.getLastUsedStyleIdOrDefault = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || "ieee";
};
z.prototype.getStyle = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, i = this;
  return Promise.resolve(e).then(function(n) {
    if (i._cache[n])
      return i._cache[n];
    var s = i._customStylesStorage.getStyleNames();
    if (s.indexOf(n) !== -1)
      return i._customStylesStorage.getStyle(n);
    var r = i._STYLES_LOCAL + n + ".csl";
    if (i._isOnlineAvailable)
      r = i._STYLES_URL + n;
    else if (i._defaultStyles.indexOf(n) === -1)
      throw "The style is not available in the local version of the plugin.";
    return fetch(r).then(function(o) {
      return o.text();
    });
  }).then(function(n) {
    if (n && !i._isValidCSL(n) && i._isOnlineAvailable) {
      var s = $e.getStyleInfo(e, n);
      if (s && s.dependent > 0 && s.parent)
        return fetch(s.parent).then(function(r) {
          return r.text();
        });
    }
    return n;
  }).then(function(n) {
    var s = n && $e.getCitationFormat(n) || "numeric", r = {
      content: n,
      styleFormat: s
    };
    return n && t && i._saveLastUsedStyle(e, n, s), r;
  });
};
z.prototype.getStylesInfo = function() {
  var e = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
    var i = e.getLastUsedStyleId() || "ieee", n = [], s = e._customStylesStorage.getStyleNames(), r = t[0], o = t[1];
    return e._isDesktopAvailable && !e._isOnlineAvailable && (r = r.filter(function(l) {
      return e._defaultStyles.indexOf(l.name) >= 0 || l.name == i;
    })), o.forEach(function(l) {
      n.push(l), e._defaultStyles.indexOf(l.name) === -1 && e._defaultStyles.push(l.name);
    }), r.forEach(function(l) {
      s.indexOf(l.name) === -1 && n.push(l);
    }), n.sort((l, h) => l.name.localeCompare(h.name)), n;
  });
};
z.prototype._getStylesJson = function() {
  var e = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(t) {
    return t.json();
  });
};
z.prototype.cached = function(e) {
  return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
};
z.prototype.isLastUsedStyleContainBibliography = function() {
  var e = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  return e !== "false";
};
z.prototype.isStyleDefault = function(e) {
  return this._defaultStyles.indexOf(e) >= 0;
};
z.prototype._isValidCSL = function(e) {
  return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
};
z.prototype._readCSLFile = function(e) {
  var t = this;
  return new Promise(function(i, n) {
    var s = new FileReader();
    s.onload = function(r) {
      var o = r.target ? String(r.target.result) : "";
      if (!t._isValidCSL(o)) {
        n("The file is not a valid CSL file");
        return;
      }
      i(o);
    }, s.onerror = function() {
      n("Failed to read file");
    }, s.readAsText(e);
  });
};
z.prototype._saveLastUsedStyle = function(e, t, i) {
  this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, i);
  var n = $e.isStyleContainBibliography(t);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, n.toString());
};
z.prototype.saveLastUsedNotesStyle = function(e) {
  localStorage.setItem(this._lastNotesStyleKey, e);
};
z.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
z.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function _e() {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
_e.prototype.loadLocale = function(e) {
  var t = this;
  if (this._selectedLanguage = e, this._cache[e])
    return Promise.resolve(this._cache[e]);
  var i = this._getLocalesUrl() + "locales-" + e + ".xml";
  return fetch(i).catch(function(n) {
    return console.error("Failed to load locale:", n), fetch(t._LOCALES_PATH + "locales-" + e + ".xml");
  }).then(function(n) {
    return n.text();
  }).then(function(n) {
    return t._cache[e] = n, n;
  });
};
_e.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
};
_e.prototype.getLocale = function(e) {
  return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
};
_e.prototype.saveLastUsedLanguage = function(e) {
  this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
};
_e.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};
_e.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
_e.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function K(e, t) {
  if (this._router = e, this._displayNoneClass = t, this._saveBtn = new X("saveSettingsBtn", {
    variant: "primary"
  }), this._cancelBtn = new X("cancelBtn", {
    variant: "secondary"
  }), this._styleSelect = new Pe("styleSelectList", {
    placeholder: "Enter style name",
    sortable: !0
  }), this._styleSelectListOther = new Pe("styleSelectedListOther", {
    placeholder: "Enter style name",
    searchable: !0
  }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper)
    throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new Zt("footNotes", {
    label: "Footnotes"
  }), this._endNotes = new Zt("endNotes", {
    label: "Endnotes"
  }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput)
    throw new Error("cslFileInput not found");
  this._languageSelect = new Pe("styleLangList", {
    placeholder: "Select language"
  }), this._cslStylesManager = new z("zoteroStyleId"), this._localesManager = new _e(), this._selectLists = [], this._onChangeState = function(i, n) {
  }, this._styleMessage = new Ve("styleMessage", {
    type: "error"
  }), this._langMessage = new Ve("langMessage", {
    type: "error"
  }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = !1, this._stateSettings = {
    style: "",
    notesStyle: "footnotes",
    styleFormat: "numeric"
  };
}
K.prototype.getLocalesManager = function() {
  return this._localesManager;
};
K.prototype.getStyleManager = function() {
  return this._cslStylesManager;
};
K.prototype.getLocale = function() {
  return this._localesManager.getLocale();
};
K.prototype.getLastUsedStyleId = function() {
  return this._cslStylesManager.getLastUsedStyleId();
};
K.prototype.init = function() {
  var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
  var i = [this._onStyleChange(e), this._localesManager.loadLocale(t), this._loadStyles()];
  return Promise.all(i);
};
K.prototype.onChangeState = function(e) {
  this._onChangeState = e;
};
K.prototype.setDesktopApiAvailable = function(e) {
  this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
};
K.prototype.setRestApiAvailable = function(e) {
  this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
};
K.prototype._addEventListeners = function() {
  var e = this;
  this._saveBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue();
      if (i === null) {
        console.error("No language selected");
        return;
      }
      var n = ri({}, e._stateSettings), s = [];
      e._stateSettings.language !== i && (e._localesManager.saveLastUsedLanguage(i), s.push(e._localesManager.loadLocale(i).catch(function(l) {
        throw console.error(l), e._langMessage.show(g("Failed to load language")), l;
      })));
      var r = "footnotes";
      e._endNotes.getState().checked && (r = "endnotes"), e._stateSettings.notesStyle !== r && (e._cslStylesManager.saveLastUsedNotesStyle(r), e._cslStylesManager.getLastUsedFormat() === "note" && s.push(Promise.resolve()));
      var o = e._styleSelect.getSelectedValue();
      e._stateSettings.style !== o && o !== null && s.push(e._onStyleChange(o)), s.length ? (e._showLoader(), Promise.all(s).then(function() {
        e._hide(), e._hideLoader();
        var l = {
          language: i,
          style: o || "ieee",
          notesStyle: r,
          styleFormat: e._cslStylesManager.getLastUsedFormat()
        };
        e._onChangeState(l, n);
      }).catch(function(l) {
        e._hideLoader();
      })) : e._hide();
    }
  }), this._cancelBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue(), n = e._styleSelect.getSelectedValue();
      i !== null && e._localesManager.getLastUsedLanguage() !== i && e._languageSelect.selectItems(e._localesManager.getLastUsedLanguage(), !0), e._stateSettings.style !== n && n !== null ? (e._styleSelect.selectItems(e._stateSettings.style, !0), e._styleSelectListOther.selectItems(e._stateSettings.style, !0), e._onStyleChange(e._stateSettings.style, !0).then(function() {
        e._hide();
      })) : e._hide();
    }
  }), this._cslFileInput.onchange = function(t) {
    if (t.target instanceof HTMLInputElement) {
      var i = t.target;
      if (i.files) {
        var n = i.files[0];
        if (!n) {
          console.error("No file selected");
          return;
        }
        e._cslStylesManager.addCustomStyle(n).then(function(s) {
          e._addStylesToList([s]);
        }).catch(function(s) {
          console.error(s), e._styleMessage.show(g("Invalid CSL style file"));
        }).finally(function() {
          e._hideLoader();
        });
      }
    }
  }, this._styleSelect.subscribe(function(t) {
    if (t.type === "selectbox:change") {
      e._styleSelectListOther.selectItems(t.detail.current.toString(), !0), e._somethingWasChanged(), e._onStyleChange(t.detail.current.toString(), !0);
      return;
    } else if (t.type !== "selectbox:custom")
      return;
    var i = t.detail.current;
    i === "more_styles" && e._styleSelectListOther.openDropdown();
  }), e._styleSelectListOther.subscribe(function(t) {
    if (t.type === "selectbox:change" && t.detail.items) {
      var i = t.detail.items[0];
      e._styleSelect.addItem(i.value, i.text, !0), e._somethingWasChanged(), e._onStyleChange(i.value, !0);
    }
  }), this._languageSelect.subscribe(function(t) {
    t.type === "selectbox:change" && e._somethingWasChanged();
  }), this._footNotes.subscribe(function(t) {
    e._somethingWasChanged();
  }), this._endNotes.subscribe(function(t) {
    e._somethingWasChanged();
  });
};
K.prototype._hideAllMessages = function() {
  this._langMessage.close(), this._styleMessage.close();
};
K.prototype._hide = function() {
  this._router.openMain();
};
K.prototype.show = function() {
  this._stateSettings = {
    language: this._localesManager.getLastUsedLanguage(),
    style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
    notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
    styleFormat: this._cslStylesManager.getLastUsedFormat()
  }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
};
K.prototype._loadStyles = function() {
  var e = this;
  return this._cslStylesManager.getStylesInfo().then(
    /** @param {Array<StyleInfo>} stylesInfo*/
    function(t) {
      e._addStylesToList(t), e._styleSelect.addCustomItem("more_styles", "More Styles..."), e._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
    }
  ).catch(function(t) {
    console.error(t);
  });
};
K.prototype._addStylesToList = function(e) {
  var t = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = e.map(function(r) {
    return [r.name, r.title];
  }), s = n.filter(function(r) {
    return !!(r[0] == i || t._cslStylesManager.isStyleDefault(r[0]));
  });
  this._styleSelect.addItems(s, i), this._styleSelectListOther.addItems(n, i);
};
K.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
};
K.prototype._onStyleChange = function(e, t) {
  var i = this;
  return t && i._showLoader(), i._cslStylesManager.getStyle(e, !t).then(function(n) {
    var s = n.styleFormat;
    i._bNumFormat = s == "numeric", s === "note" ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), t && i._hideLoader();
  }).catch(function(n) {
    throw console.error(n), typeof n == "string" && i._styleMessage.show(g(n)), t && i._hideLoader(), n;
  });
};
K.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
};
K.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
function ue(e, t) {
  if (this._router = e, this._sdk = t, this._apiKeyLoginField = new Ee("apiKeyField", {
    autofocus: !0,
    autocomplete: "on"
  }), this._saveApiKeyBtn = new X("saveApiKeyBtn", {
    disabled: !0
  }), this._apiKeyMessage = new Ve("apiKeyMessage", {
    type: "error"
  }), this._useDesktopMessage = new Ve("useDesktopMessage", {
    type: "error"
  }), this._connectToLocalZotero = new X("connectToLocalZotero", {
    variant: "secondary"
  }), this._useDesktopApp = document.getElementById("useDesktopApp"), !this._useDesktopApp)
    throw new Error("useDesktopApp not found");
  if (this._logoutLink = document.getElementById("logoutLink"), !this._logoutLink)
    throw new Error("logoutLink not found");
  this._onAuthorized = function(i) {
  }, this._onChangeState = function(i) {
  }, this._onOpen = function() {
  };
}
ue.prototype.init = function() {
  var e = this;
  this._addEventListeners();
  var t = !1, i = document.querySelectorAll(".for-zotero-online"), n = Ft.runApisChecker(e._sdk);
  n.subscribe(function(r) {
    if (e._onChangeState(r), t || (t = !0, !r.desktopVersion && e._useDesktopApp && e._useDesktopApp.classList.add("hidden"), e._onOpen(), e._show()), r.online ? i.forEach(function(o) {
      o.classList.remove("hidden");
    }) : i.forEach(function(o) {
      o.classList.add("hidden");
    }), r.online && r.hasKey) {
      e._sdk.setIsOnlineAvailable(!0), e._hide(!0), e._onAuthorized(r);
      return;
    } else if (r.desktop && r.hasPermission) {
      e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages(), e._onAuthorized(r);
      return;
    }
  });
  var s = {
    /**
     * @param {function(): void} callbackFn
     */
    onOpen: function(o) {
      return e._onOpen = o, s;
    },
    /**
     * @param {function(AvailableApis): void} callbackFn
     */
    onChangeState: function(o) {
      return e._onChangeState = o, s;
    },
    /**
     * @param {function(AvailableApis): void} callbackFn
     */
    onAuthorized: function(o) {
      return e._onAuthorized = o, s;
    }
  };
  return s;
};
ue.prototype._addEventListeners = function() {
  var e = this;
  this._apiKeyLoginField.subscribe(function(t) {
    t.type, t.type === "inputfield:input" && (e._apiKeyLoginField.getValue() ? e._saveApiKeyBtn.enable() : e._saveApiKeyBtn.disable());
  }), this._saveApiKeyBtn.subscribe(function(t) {
    t.type === "button:click" && e._tryToApplyKey();
  }), this._connectToLocalZotero.subscribe(function(t) {
    t.type === "button:click" && (e._showLoader(), Ft.checkStatus(e._sdk).then(function(i) {
      if (i.desktop && i.hasPermission)
        e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages();
      else if (i.desktop && !i.hasPermission) {
        var n = 'Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check "Allow other applications on this computer to communicate with Zotero"';
        e._useDesktopMessage.show(g(n));
      } else i.desktop || e._useDesktopMessage.show(g("Connection to Zotero failed. Make sure Zotero is running."));
    }).finally(function() {
      e._hideLoader();
    }));
  }), this._logoutLink.onclick = function(t) {
    return e._sdk.clearSettings(), e._show(), !0;
  };
};
ue.prototype._tryToApplyKey = function() {
  var e = this, t = e._apiKeyLoginField.getValue();
  t && (e._showLoader(), e._sdk.setApiKey(t).then(function() {
    Ft.successfullyLoggedInUsingApiKey(), e._hide(!0);
  }).catch(function(i) {
    console.error(i), e._apiKeyMessage.show(g("Invalid API key"));
  }).finally(function() {
    e._hideLoader();
  }));
};
ue.prototype._hideAllMessages = function() {
  this._apiKeyMessage.close();
};
ue.prototype._hide = function(e) {
  this._router.openMain(), e && this._logoutLink.classList.remove("hidden");
};
ue.prototype._show = function() {
  this._router.openLogin(), this._logoutLink.classList.add("hidden");
};
ue.prototype._showLoader = function() {
  this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
};
ue.prototype._hideLoader = function() {
  this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
function Ge() {
  this._searchField = new Ee("searchField", {
    type: "text",
    autofocus: !0,
    showClear: !1
  }), this._filterButton = new X("filterButton", {
    variant: "secondary-icon",
    size: "small"
  }), this._librarySelectList = new Pe("librarySelectList", {
    // TODO: add translation
    placeholder: g("No items selected"),
    multiple: !0,
    description: g("Search in:")
  }), this._subscribers = [], this._addEventListeners();
}
Ge.prototype._addEventListeners = function() {
  var e = this;
  this._searchField.subscribe(function(t) {
    if (t.type === "inputfield:blur" || t.type === "inputfield:submit") {
      var i = e._getSelectedGroups();
      e._subscribers.forEach(function(n) {
        n(t.detail.value, i);
      });
    }
  }), this._filterButton.subscribe(function(t) {
    t.type === "button:click" && (e._librarySelectList.isOpen || (t.detail.originalEvent && t.detail.originalEvent.stopPropagation(), e._librarySelectList.openDropdown()));
  });
};
Ge.prototype.addGroups = function(e) {
  var t = this, i = localStorage.getItem("selectedGroups"), n = i ? JSON.parse(i).map(function(w) {
    return w.toString();
  }) : ["my_library", "group_libraries"], s = !1;
  e.forEach(function(w) {
    w.id = String(w.id);
  });
  var r = [{
    id: "my_library",
    name: g("My Library")
  }, {
    id: "group_libraries",
    name: g("Group Libraries")
  }];
  !s && r.forEach(function(w) {
    n.indexOf(w.id) !== -1 && (s = !0);
  }), !s && e.forEach(function(w) {
    n.indexOf(w.id.toString()) !== -1 && (s = !0);
  }), s || (n = ["my_library", "group_libraries"]);
  for (var o = function(C, I, O) {
    typeof C == "number" && (C = C.toString()), t._librarySelectList instanceof Pe && t._librarySelectList.addItem(C, I, O);
  }, l = 0; l < r.length; l++) {
    var h = r[l].id, u = r[l].name;
    o(h, u, n.indexOf(h) !== -1);
  }
  if (e.length !== 0) {
    this._librarySelectList.addSeparator();
    for (var y = n.indexOf("group_libraries") !== -1, l = 0; l < e.length; l++) {
      var v = e[l].id, m = e[l].name;
      o(v, m, y || n.indexOf(v.toString()) !== -1);
    }
    this._selectedGroupsWatcher(r, e);
  }
};
Ge.prototype._getSelectedGroups = function() {
  var e = this, t = this._librarySelectList.getSelectedValues();
  return (Array.isArray(t) === !1 || t.length === 0) && setTimeout(function() {
    e._librarySelectList.openDropdown();
  }, 500), t === null || typeof t == "string" ? [] : t;
};
Ge.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
Ge.prototype._selectedGroupsWatcher = function(e, t) {
  var i = this;
  this._librarySelectList instanceof Pe && this._librarySelectList.subscribe(function(n) {
    if (n.type === "selectbox:change") {
      var s = [], r = n.detail.values, o = n.detail.current, l = n.detail.enabled, h = e.map(function(m) {
        return m.id;
      }), u = t.map(function(m) {
        return m.id.toString();
      }), y = h.indexOf(String(o)) !== -1;
      if (y)
        o === "group_libraries" ? (l ? (s.push("group_libraries"), i._librarySelectList.selectItems(u, !0)) : i._librarySelectList.unselectItems(u, !0), r.indexOf("my_library") !== -1 && s.push("my_library")) : r.indexOf("group_libraries") !== -1 ? (s.push("group_libraries"), l && s.push(o)) : s = r.slice();
      else if (!y) {
        var v = u.every(function(m) {
          return r.indexOf(m) !== -1;
        });
        v ? (i._librarySelectList.selectItems("group_libraries", !0), s.push("group_libraries"), r.indexOf("my_library") !== -1 && s.push("my_library")) : (i._librarySelectList.unselectItems("group_libraries", !0), s = r.filter(function(m) {
          return m !== "group_libraries";
        }));
      }
      s.length === 0 ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(s));
    }
  });
};
var Qi = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
function U(e, t, i) {
  this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = i, this._fLoadMore = t, this._loadTimeout, this._editMode = !1, this._init();
}
U.prototype._init = function() {
  var e = this;
  this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(t) {
    var i = [];
    for (var n in e._items)
      i.push(n);
    for (var s = 0; s < i.length; s++)
      e._removeSelected(i[s]);
  }), this._docsHolder && this._docsHolder.addEventListener("keydown", function(t) {
    if ((t.ctrlKey || t.metaKey) && t.key === "a") {
      var i;
      t.preventDefault();
      var n = (i = e._docsHolder) === null || i === void 0 ? void 0 : i.querySelectorAll(".checkbox-container:not(.checkbox--checked)");
      n == null || n.forEach(function(s) {
        s.click();
      });
    }
  });
};
U.prototype.clearLibrary = function() {
  this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
  for (var e = this._docsHolder; e && e.lastChild; )
    e.removeChild(e.lastChild);
  e && (e.scrollTop = 0), this._docsScroller.onscroll();
};
U.prototype.displayNothingFound = function() {
  this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
};
U.prototype.displaySearchItems = function(e, t, i) {
  var n = this, s = this._docsHolder;
  this._lastSearch = i;
  var r = 0;
  return new Promise((o, l) => {
    if (e && e.items && e.items.length > 0) {
      var h = document.createElement("div");
      s && h.classList.add("page" + s.children.length);
      for (var u = 0; u < e.items.length; u++) {
        var y = e.items[u];
        y.title && (h.appendChild(n._buildDocElement(y)), r++);
      }
      s && s.appendChild(h);
    } else t && l(t);
    this._docsScroller.onscroll(), o(r);
  });
};
U.prototype.getSelectedItems = function() {
  var e = Object.assign({}, this._items || {});
  return e;
};
U.prototype.removeItems = function(e) {
  var t = this;
  e.forEach(function(i) {
    t._removeSelected(i);
  });
};
U.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
U.prototype._buildDocElement = function(e) {
  var t = this;
  this._items[e.id] && (e = this._items[e.id]);
  var i = document.createElement("div");
  i.classList.add("doc");
  var n = document.createElement("div");
  n.classList.add("docInfo");
  var s = document.createElement("div"), r = "";
  e.author && e.author.length > 0 && (r = e.author.map(function(w) {
    return w.family && w.given ? w.family.trim() + ", " + w.given.trim() : w.family ? w.family.trim() : w.given ? w.given.trim() : "";
  }).join("; "));
  var o = document.createElement("div");
  o.classList.add("selectbox-arrow"), o.innerHTML = "<b></b>";
  var l = document.createElement("div");
  if (l.textContent = e.title.trim(), l.classList.add("truncate-text"), l.classList.add("secondary-text"), (e.publisher || e["publisher-place"]) && (l.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
    var h = e.issued["date-parts"][0];
    r.length > 20 ? l.textContent += " (" + h.join("-") + ")" : (r.length > 0 && r.slice(-1) !== "." && r.slice(-1) !== "," && (r += "."), r += " " + h.join("-"));
  }
  r.length === 0 && (r = l.textContent), l.setAttribute("title", l.textContent), n.appendChild(l);
  var u = document.createElement("input");
  s.appendChild(u);
  var y = new lt(u, {
    checked: !!this._items[e.id],
    label: r,
    title: !0,
    id: e.id
  });
  this._items[e.id] && (this._checks[e.id] = y), s.appendChild(o), i.appendChild(s), i.appendChild(n);
  var v;
  function m() {
    i.classList.toggle("doc-open"), v || (v = t._buildCitationParams(e), i.appendChild(v));
  }
  return o.onclick = m, y.subscribe(function(w) {
    w.type === "checkbox:change" && (w.detail.checked ? t._addSelected(e, y) : t._removeSelected(e.id));
  }), i;
};
U.prototype._buildCitationParams = function(e) {
  var t = e.label || localStorage.getItem("selectedLocator") || "page";
  e.label = t;
  var i = document.createDocumentFragment(), n = document.createElement("div"), s = document.createElement("input"), r = document.createElement("input"), o = document.createElement("div"), l = document.createElement("div"), h = document.createElement("input"), u = document.createElement("div"), y = document.createElement("input");
  i.appendChild(n), n.appendChild(s), n.appendChild(r), i.appendChild(o), o.appendChild(l), o.appendChild(h);
  var v = "";
  i.appendChild(u), u.appendChild(y);
  var m = new Ee(s, {
    type: "text",
    placeholder: g("Prefix"),
    value: e.prefix || ""
  }), w = new Ee(r, {
    type: "text",
    placeholder: g("Suffix"),
    value: e.suffix || ""
  }), C = new Pe(l, {
    placeholder: g("Locator"),
    translate: g
  });
  Qi.forEach(function(k) {
    var G = k[0] === t;
    C.addItem(k[0], k[1], G), G && (v = k[1]);
  });
  var I = new Ee(h, {
    type: "text",
    placeholder: g(v),
    value: e.locator || ""
  }), O = new lt(y, {
    label: g("Omit Author"),
    checked: !!e["suppress-author"]
  });
  return m.subscribe(function(k) {
    k.type === "inputfield:input" && (e.prefix = k.detail.value);
  }), w.subscribe(function(k) {
    k.type === "inputfield:input" && (e.suffix = k.detail.value);
  }), I.subscribe(function(k) {
    k.type === "inputfield:input" && (e.locator = k.detail.value);
  }), C.subscribe(function(k) {
    if (k.type === "selectbox:change" && k.detail.items) {
      var G = k.detail.items[0];
      I.setPlaceholder(G.text), e.label = k.detail.values[0].toString(), localStorage.setItem("selectedLocator", e.label);
    }
  }), O.subscribe(function(k) {
    k.type === "checkbox:change" && (e["suppress-author"] = k.detail.checked);
  }), i;
};
U.prototype._buildSelectedElement = function(e) {
  var t = this, i = document.createElement("div");
  i.classList.add("selDoc"), i.setAttribute("data-id", String(e.id));
  var n = document.createElement("span");
  if (e.author && e.author.length > 0 ? n.textContent = e.author.map(function(l) {
    return l.family + ", " + l.given;
  }).join("; ") : n.textContent = e.title, e.issued && e.issued["date-parts"] && (n.textContent += " " + e.issued["date-parts"][0].join("-")), n.setAttribute("title", n.textContent), i.appendChild(n), this._editMode) {
    var s = document.createElement("span");
    s.className = "selDoc-move", s.textContent = "▲", s.title = g("Move up"), s.onclick = function() {
      t._moveItem(e.id, -1);
    }, i.appendChild(s);
    var r = document.createElement("span");
    r.className = "selDoc-move", r.textContent = "▼", r.title = g("Move down"), r.onclick = function() {
      t._moveItem(e.id, 1);
    }, i.appendChild(r);
  }
  var o = document.createElement("span");
  return o.onclick = function() {
    t._removeSelected(e.id);
  }, o.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', i.appendChild(o), i;
};
U.prototype._addSelected = function(e, t) {
  var i = this._buildSelectedElement(e);
  this._items[e.id] = e, this._html[e.id] = i, this._checks[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
U.prototype._checkDocsScroll = function(e, t) {
  var i = this;
  if (this._fShouldLoadMore(e)) {
    if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
    this._loadTimeout = setTimeout(function() {
      i._fShouldLoadMore(e) && i._fLoadMore();
    }, 500);
  }
};
U.prototype._initScrollBox = function(e, t, i, n) {
  var s = {};
  return s.onscroll = this._checkScroll(e, t, i, n), e.onwheel = function(r) {
    e.scrollTop += r.deltaY > 10 || r.deltaY < -10 ? r.deltaY : r.deltaY * 20, s.onscroll();
  }, t.onmousedown = function(r) {
    t.classList.add("scrolling");
    var o = r.clientY, l = e.scrollTop;
    window.onmouseup = function(h) {
      t.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
    }, window.onmousemove = function(h) {
      var u = h.clientY - o, y = u / e.clientHeight, v = e.scrollHeight * y;
      e.scrollTop = l + v, s.onscroll();
    };
  }, document.body.addEventListener("resize", function() {
    s.onscroll();
  }), s;
};
U.prototype._checkScroll = function(e, t, i, n) {
  var s = this._displayNoneClass;
  return function() {
    if (e.scrollHeight <= e.clientHeight)
      t.classList.add(s);
    else {
      t.classList.remove(s);
      var r = e.clientHeight / e.scrollHeight * e.clientHeight;
      r = r < i ? i : r, t.style.height = r + "px";
      var o = e.scrollHeight - e.clientHeight, l = e.scrollTop / o, h = l * (e.clientHeight - r);
      t.style.marginTop = h + "px";
    }
    n && n(e, t);
  };
};
U.prototype._removeSelected = function(e) {
  var t = this._html[e];
  this._selectedHolder && this._selectedHolder.removeChild(t), delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
U.prototype._checkSelected = function() {
  var e = this.count();
  !this._selectedInfo || !this._selectedCount || !this._selectedWrapper || (e <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = e + " " + g("selected")), this._subscribers.forEach(function(t) {
    t(e);
  }));
};
U.prototype.count = function() {
  var e = 0;
  for (var t in this._items) e++;
  return e;
};
U.prototype.setEditMode = function(e) {
  this._editMode = e, this._selectedWrapper && (e ? this._selectedWrapper.classList.add("edit-mode") : this._selectedWrapper.classList.remove("edit-mode"));
};
U.prototype.addPreselectedItem = function(e) {
  this._items[e.id] = e;
  var t = this._buildSelectedElement(e);
  this._html[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(t);
  var i = this._buildDocElement(e);
  this._docsHolder && this._docsHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
U.prototype._moveItem = function(e, t) {
  var i = this._html[e];
  !i || !this._selectedHolder || (t === -1 && i.previousElementSibling ? this._selectedHolder.insertBefore(i, i.previousElementSibling) : t === 1 && i.nextElementSibling && i.nextElementSibling.after(i), this._selectedScroller.onscroll());
};
U.prototype.getSelectedItemsOrdered = function() {
  var e = [], t = this._selectedHolder;
  if (!t) return e;
  for (var i = 0; i < t.children.length; i++) {
    var n = t.children[i], s = n.getAttribute("data-id");
    s && this._items[s] && e.push(this._items[s]);
  }
  return e;
};
(function() {
  var e = "hidden", t, i, n, s, r = {
    text: "",
    obj: null,
    groups: [],
    groupsHash: ""
  }, o, l, h, u = !1, y = null, v = null, m, w, C, I, O, k, G = new ae("libLoader", g("Loading...")), $ = {};
  function Q() {
    var d = document.getElementById("errorWrapper");
    if (!d)
      throw new Error("errorWrapper not found");
    var p = document.getElementById("mainState");
    if (!p)
      throw new Error("mainState not found");
    o = new Ge(), l = new U(e, di, fi), m = new X("saveAsTextBtn", {
      variant: "secondary"
    }), w = new X("insertLinkBtn", {
      disabled: !0
    }), I = new X("editCitationBtn", {
      variant: "secondary"
    }), C = new X("settingsBtn", {
      variant: "icon-only",
      size: "small"
    }), O = new X("insertBibBtn", {
      variant: "secondary"
    }), k = new X("refreshBtn", {
      variant: "secondary"
    }), h = new X("cancelEditBtn", {
      variant: "secondary"
    }), $ = {
      error: d,
      mainState: p
    };
  }
  window.Asc.plugin.init = function() {
    ae.show(), Q(), t = new Ue(), i = new H();
    var d = new ue(t, i);
    n = new K(t, e), s = new Yi(n.getLocalesManager(), n.getStyleManager(), i);
    var p = !1;
    ui(), d.init().onOpen(function() {
      ae.hide();
    }).onChangeState(function(_) {
      n.setDesktopApiAvailable(_.desktop), n.setRestApiAvailable(_.online);
    }).onAuthorized(function(_) {
      if (!p) {
        p = !0, ae.show();
        var L = We().catch((A) => {
          console.error(A), D(g("An error occurred while loading library groups. Try restarting the plugin."));
        }), b = _i(n.getStyleManager()).catch((A) => console.error("Failed to read document prefs:", A)).then(() => n.init()).catch((A) => {
          console.error(A), D(g("An error occurred while loading settings. Try restarting the plugin.")), n.show();
        });
        Promise.all([L, b]).then(function() {
          return ae.hide(), he();
        }).finally(function() {
          ae.hide();
        });
      }
    }), window.Asc.plugin.onTranslate = hi, vi().then((_) => {
      window.Asc.scope.editorVersion = _, gi();
    }).catch((_) => {
      console.error(_);
    });
  };
  function he() {
    G.show();
    var d = i.getItems(null).then((p) => (delete p.next, p));
    return Ke(d, !1).then((p) => {
      p > 0 ? Xe("started") : Xe("empty");
    }).catch((p) => {
      console.error(p);
    }).finally(() => {
      G.hide();
    });
  }
  function We() {
    return i.getUserGroups().then(function(d) {
      return o.addGroups(d), d;
    });
  }
  function ui() {
    l.subscribe(Qe);
    function d(p, _, L) {
      l.clearLibrary();
      var b = [];
      return i.getUserGroups().then(function(A) {
        var M = _.filter(function(ee) {
          return ee !== "my_library" && ee !== "group_libraries";
        });
        _.indexOf("my_library") !== -1 && b.push(Ke(i.getItems(p), !1));
        for (var ie = 0; ie < M.length; ie++)
          b.push(Ke(i.getGroupItems(p, M[ie]), !0));
        return r.text = p, r.obj = null, r.groups = [], r.groupsHash = L, b;
      });
    }
    o.subscribe(function(p, _) {
      p = p.trim();
      var L = _.join(",");
      $.mainState.classList.contains(e) || !p || p == r.text && L === r.groupsHash || _.length === 0 || d(p, _, L).catch(() => []).then(function(b) {
        return b.length && (G.show(), Promise.any(b).then(function() {
          G.hide();
        }).finally(function() {
          G.hide();
        })), Promise.allSettled(b);
      }).then(function(b) {
        var A = 0;
        b.forEach(function(M) {
          M.status === "fulfilled" && (A += M.value);
        }), A === 0 ? (Xe("empty"), l.displayNothingFound()) : Xe("not-empty");
      });
    }), I.subscribe(/* @__PURE__ */ (function() {
      var p = E(function* (_) {
        _.type === "button:click" && (yield Ut());
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), h.subscribe(function(p) {
      p.type === "button:click" && Gt();
    }), k.subscribe(/* @__PURE__ */ (function() {
      var p = E(function* (_) {
        if (_.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            D(g("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            D(g("Language is not selected"));
            return;
          }
          yield Ne(!0, "Zotero (" + g("Updating citations") + ")");
          var L = s.updateCslItems.bind(s, !1), b = n.getStyleManager();
          b.getLastUsedFormat() === "note" && (L = s.updateCslItemsInNotes.bind(s, b.getLastUsedNotesStyle())), L().catch(function(A) {
            console.error(A);
            var M = g("Failed to refresh");
            typeof A == "string" && (M += ". " + g(A)), D(M);
          }).finally(function() {
            Te(!1, "Zotero (" + g("Updating citations") + ")");
          });
        }
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), O.subscribe(/* @__PURE__ */ (function() {
      var p = E(function* (_) {
        if (_.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            D(g("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            D(g("Language is not selected"));
            return;
          }
          yield Ne(!1, "Zotero (" + g("Inserting bibliography") + ")");
          var L = "";
          s.insertBibliography().then(function(b) {
            L = b;
          }).catch(function(b) {
            if (console.error(b), s.showWarningMessage("Failed to insert bibliography"), typeof b == "string") {
              var A = g(b);
              D(A);
            }
          }).finally(function() {
            Te(!1, "Zotero (" + g("Inserting bibliography") + ")"), L && s.moveCursorOutsideField(L);
          });
        }
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), w.subscribe(/* @__PURE__ */ (function() {
      var p = E(function* (_) {
        if (_.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            D(g("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            D(g("Language is not selected"));
            return;
          }
          if (u) {
            var L = l.getSelectedItemsOrdered();
            if (L.length === 0) {
              D(g("No citations selected"));
              return;
            }
            var b = L.map(function(R) {
              var Z = v.citationItems.find(function(me) {
                return me.id === R.id || me.itemData && me.itemData.id === R.id;
              });
              if (Z)
                return Z.prefix = R.prefix || "", Z.suffix = R.suffix || "", Z.locator = R.locator || "", Z.label = R.label || "page", Z["suppress-author"] = !!R["suppress-author"], Z;
              var Y = {
                id: R.id,
                itemData: Object.assign({}, R),
                uris: R.uris || []
              };
              return delete Y.itemData.prefix, delete Y.itemData.suffix, delete Y.itemData.locator, delete Y.itemData.label, delete Y.itemData["suppress-author"], delete Y.itemData.uris, Y.prefix = R.prefix || "", Y.suffix = R.suffix || "", Y.locator = R.locator || "", Y.label = R.label || "page", Y["suppress-author"] = !!R["suppress-author"], Y;
            }), A = JSON.parse(JSON.stringify(v));
            A.citationItems = b;
            var M = y;
            Gt(), yield Ne(!1, "Zotero (" + g("Updating citations") + ")");
            var ie = s.updateItem.bind(s, A), ee = n.getStyleManager();
            ee.getLastUsedFormat() === "note" && (ie = s.updateItem.bind(s, A, ee.getLastUsedNotesStyle())), ie().catch(function(R) {
              console.error(R);
              var Z = g("Failed to update citation");
              typeof R == "string" && (Z += ". " + g(R)), D(Z);
            }).finally(function() {
              Te(!1, "Zotero (" + g("Updating citations") + ")"), M && s.moveCursorOutsideField(M.FieldId);
            });
            return;
          }
          yield Ne(!0, "Zotero (" + g("Inserting citation") + ")");
          var ve = l.getSelectedItems(), ge = null, ye = !1;
          return s.insertSelectedCitations(ve).then(function(R) {
            return ye = R, l.removeItems(Object.keys(ve)), s.getCurrentField();
          }).then(function(R) {
            return ge = R, ye ? s.updateCslItems(!1) : s.updateCslItems();
          }).catch(function(R) {
            console.error(R);
            var Z = g("Failed to insert citation");
            typeof R == "string" && (Z += ". " + g(R)), D(Z);
          }).finally(/* @__PURE__ */ E(function* () {
            Te(!1, "Zotero (" + g("Inserting citation") + ")"), ye ? yield s.moveCursorRight() : ge && (yield s.moveCursorOutsideField(ge.FieldId));
          }));
        }
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), C.subscribe(function(p) {
      p.type === "button:click" && n.show();
    }), m.subscribe(/* @__PURE__ */ (function() {
      var p = E(function* (_) {
        _.type === "button:click" && (yield Ne(!1, "Zotero (" + g("Saving as text") + ")"), s.saveAsText().then(function() {
          Te(!1, "Zotero (" + g("Saving as text") + ")");
        }));
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), n.onChangeState(/* @__PURE__ */ (function() {
      var p = E(function* (_, L) {
        yield Ne(!0, "Zotero (" + g("Updating citations") + ")");
        var b = s.updateCslItems.bind(s, !0);
        [_.styleFormat, L.styleFormat].includes("note") && (_.styleFormat !== L.styleFormat ? _.styleFormat === "note" ? b = s.switchingBetweenNotesAndText.bind(s, _.notesStyle) : b = s.switchingBetweenNotesAndText.bind(s) : _.notesStyle !== L.notesStyle ? b = s.convertNotesStyle.bind(s, _.notesStyle) : b = s.updateCslItems.bind(s, !0)), b().catch(function(A) {
          console.error(A);
          var M = g("Failed to refresh");
          typeof A == "string" && (M += ". " + g(A)), D(M);
        }).finally(function() {
          Te(!1, "Zotero (" + g("Updating citations") + ")");
        });
      });
      return function(_, L) {
        return p.apply(this, arguments);
      };
    })());
  }
  Asc.plugin.onThemeChanged = function(d) {
    window.Asc.plugin.onThemeChangedBase(d), zt.fixThemeForIE(d), zt.addStylesForComponents(d);
    var p = "";
    p += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + ` !important;}
`, p += ".doc { border-color: " + d["border-regular-control"] + "; background-color: " + d["background-normal"] + `; }
`, p += ".scrollThumb { box-shadow: 0 0 8px 8px " + d["highlight-button-hover"] + ` inset; }
`, p += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + d["canvas-scroll-thumb-pressed"] + ` inset; }
`, p += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + d["canvas-scroll-thumb-hover"] + ` inset; }
`, (["theme-white", "theme-night"].indexOf(d.name) !== -1 || ["theme-white", "theme-night"].indexOf(d.Name) !== -1) && (p += `.doc { border-radius: 4px; }
`);
    var _ = document.getElementById("pluginStyles");
    _ ? _.innerHTML = p : (_ = document.createElement("style"), _.id = "pluginStyles", _.innerHTML = p, document.getElementsByTagName("head")[0].appendChild(_));
    var L = d.type || "light", b = document.body;
    b.classList.remove("theme-dark"), b.classList.remove("theme-light"), b.classList.add("theme-" + L);
  };
  function hi() {
    for (var d = document.getElementsByClassName("i18n"), p = function() {
      var b = d[_];
      if (!(b instanceof HTMLElement)) return 1;
      ["placeholder", "title"].forEach((M) => {
        b.hasAttribute(M) && b.setAttribute(M, g(b.getAttribute(M) || ""));
      });
      var A = g(b.innerText.trim().replace(/\s+/g, " "));
      A && (b.innerText = A);
    }, _ = 0; _ < d.length; _++)
      p();
  }
  function D(d) {
    d && typeof d == "string" ? (g(""), $.error.classList.remove(e), $.error.textContent = d, setTimeout(function() {
      window.onclick = function() {
        D(!1);
      };
    }, 100)) : ($.error.classList.add(e), $.error.textContent = "", window.onclick = null);
  }
  function Ne(d, p) {
    return dt.apply(this, arguments);
  }
  function dt() {
    return dt = E(function* (d, p) {
      O.disable(), k.disable(), w.disable(), I.disable();
      var _ = window.Asc.scope.editorVersion;
      _ && _ < 9004e3 ? window._cursorPosition = yield ni.getCursorPosition() : yield new Promise((L) => {
        Asc.plugin.executeMethod("StartAction", ["GroupActions", {
          lockScroll: !0,
          keepSelection: d
        }], L);
      });
    }), dt.apply(this, arguments);
  }
  function Te(d, p) {
    return ft.apply(this, arguments);
  }
  function ft() {
    return ft = E(function* (d, p) {
      O.enable(), k.enable(), I.enable(), Qe();
      var _ = window.Asc.scope.editorVersion;
      _ && _ < 9004e3 ? ni.setCursorPosition(window._cursorPosition || 0) : yield new Promise((L) => {
        Asc.plugin.executeMethod("EndAction", ["GroupActions", {
          scrollToTarget: d
        }], L);
      });
    }), ft.apply(this, arguments);
  }
  function Xe(d) {
    var p = document.getElementById("searchLabel");
    if (!p) {
      console.error("Search label not found");
      return;
    }
    var _ = p.querySelector(".when-empty"), L = p.querySelector(".when-not-empty"), b = p.querySelector(".when-started");
    if (!_ || !L || !b) {
      console.error("Search label elements not found");
      return;
    }
    switch (_.classList.add("hidden"), L.classList.add("hidden"), b.classList.add("hidden"), d) {
      case "empty":
        _.classList.remove("hidden");
        break;
      case "not-empty":
        L.classList.remove("hidden");
        break;
      case "started":
        L.classList.remove("hidden"), b.classList.remove("hidden");
        break;
    }
  }
  function di() {
    console.warn("Loading more..."), r.obj && r.obj.next && Ke(r.obj.next(), !1);
    for (var d = 0; d < r.groups.length && r.groups[d].next; d++)
      Ke(i.getGroupItems(r.groups[d].next(), r.groups[d].id), !0);
  }
  function fi(d) {
    if (t.getRoute() != "main" || d.scrollTop + d.clientHeight < d.scrollHeight)
      return !1;
    var p = !0;
    return r.groups.forEach(function(_) {
      _.next && (p = !1);
    }), !(!r.obj || !r.obj.next || !p || !r.obj && !r.text.trim() && !r.groups.length);
  }
  function Ke(d, p) {
    return d.then(function(_) {
      return Vt(_, null, p);
    }).catch(function(_) {
      return console.error(_), _.message && D(g(_.message)), Vt(null, _, p);
    }).then(function(_) {
      return _;
    });
  }
  function Vt(d, p, _) {
    var L = !1;
    !r.obj && d && d.items && !d.items.length && (L = !0), p ? (L && (r.obj = null, r.groups = []), r && r.obj && delete r.obj.next) : _ && d && d.next ? r.groups.push(d) : r.obj = d && d.items.length ? d : null;
    var b = function(M) {
      if (!M.id) return M;
      var ie = M.id.indexOf("/") + 1, ee = M.id.lastIndexOf("/") + 1, ve = M.id.indexOf("http");
      return ie !== ee && ve === 0 && (M.uris || (M.uris = []), M.uris.push(M.id)), ee && (M.id = M.id.substring(ee)), M;
    };
    return d && d.items && d.items.length > 0 && (d.items = d.items.map((A) => (A = pi(A), A[_ ? "groupID" : "userID"] = d.id, b(A), A))), l.displaySearchItems(d, p, r);
  }
  function pi(d) {
    if (d.id || !d.key) return d;
    var p = {
      id: d.key,
      title: d.data.title,
      type: d.data.itemType
    };
    return Object.hasOwnProperty.call(d, "url") && (p.URL = d.data.url), Object.hasOwnProperty.call(d, "volume") && (p.volume = d.data.volume), Object.hasOwnProperty.call(d, "language") && (p.language = d.data.language), Object.hasOwnProperty.call(d, "abstract") && (p.abstract = d.data.abstract), Object.hasOwnProperty.call(d, "note") && (p.note = d.data.note), Object.hasOwnProperty.call(d, "page") && (p.page = d.data.page), Object.hasOwnProperty.call(d, "shortTitle") && (p.shortTitle = d.data.shortTitle), Object.hasOwnProperty.call(d, "links") && (p.uris = [], Object.hasOwnProperty.call(d.links, "self") && p.uris.push(d.links.self.href), Object.hasOwnProperty.call(d.links, "alternate") && p.uris.push(d.links.alternate.href)), p;
  }
  function Qe(d) {
    if (typeof d > "u" && (d = l.count()), u) {
      d <= 0 ? (w.disable(), w.setText(g("Update Citation"))) : (w.enable(), w.setText(g("Update Citation")));
      return;
    }
    d <= 0 ? (w.disable(), w.setText(g("Insert Citation"))) : (w.enable(), d > 1 ? w.setText(g("Insert " + d + " Citations")) : w.setText(g("Insert Citation")));
  }
  function Ut() {
    return pt.apply(this, arguments);
  }
  function pt() {
    return pt = E(function* () {
      var d = yield new Promise((b) => {
        window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, b);
      });
      if (!d || !d.Value || d.Value.toLowerCase().indexOf("zotero_item") === -1) {
        s.showWarningMessage(g("No Zotero citation found at the cursor. Please click directly on a citation to edit it."));
        return;
      }
      var p = d.Value.indexOf("{"), _ = d.Value.lastIndexOf("}");
      if (p === -1) {
        s.showWarningMessage(g("Could not parse the citation data."));
        return;
      }
      var L = JSON.parse(d.Value.slice(p, _ + 1));
      l.removeItems(Object.keys(l.getSelectedItems())), l.clearLibrary(), u = !0, y = d, v = L, l.setEditMode(!0), L.citationItems && L.citationItems.forEach(function(b) {
        var A = Object.assign({}, b.itemData || {});
        !A.id && b.id && (A.id = b.id), b.uris && (A.uris = b.uris), b.prefix && (A.prefix = b.prefix), b.suffix && (A.suffix = b.suffix), b.locator && (A.locator = b.locator), b.label && (A.label = b.label), b["suppress-author"] && (A["suppress-author"] = b["suppress-author"]), l.addPreselectedItem(A);
      }), h._container.classList.remove("hidden"), I._container.classList.add("hidden"), O._container.classList.add("hidden"), k._container.classList.add("hidden"), w.setText(g("Update Citation")), w.enable(), Qe();
    }), pt.apply(this, arguments);
  }
  function Gt() {
    u = !1, y = null, v = null, l.setEditMode(!1), l.removeItems(Object.keys(l.getSelectedItems())), l.clearLibrary(), h._container.classList.add("hidden"), I._container.classList.remove("hidden"), O._container.classList.remove("hidden"), k._container.classList.remove("hidden"), w.setText(g("Insert Citation")), w.disable(), Qe(), he();
  }
  function _i(d) {
    return _t.apply(this, arguments);
  }
  function _t() {
    return _t = E(function* (d) {
      if (!d.getLastUsedStyleId()) {
        var p = yield new Promise((ge) => {
          Asc.plugin.callCommand(() => {
            var ye = Api.GetDocument(), R = ye.GetCustomProperties();
            if (!R) return "";
            for (var Z = "", Y = 1; ; ) {
              var me = R.Get("ZOTERO_PREF_" + Y);
              if (me == null) break;
              Z += String(me), Y++;
            }
            return Z;
          }, !1, !0, (ye) => ge(ye || ""));
        });
        if (p)
          try {
            var _ = new DOMParser(), L = _.parseFromString(p, "text/xml"), b = L.querySelector("style");
            if (b) {
              var A = b.getAttribute("id") || "", M = b.getAttribute("locale") || "";
              if (A) {
                var ie = A.replace(/^.*\/styles\//, "");
                ie && localStorage.setItem("zoteroStyleId", ie);
              }
              M && localStorage.setItem("zoteroLocale", M);
            }
            var ee = L.querySelector('pref[name="noteType"]');
            if (ee) {
              var ve = ee.getAttribute("value");
              ve === "1" ? localStorage.setItem("zoteroNotesStyleId", "footnotes") : ve === "2" && localStorage.setItem("zoteroNotesStyleId", "endnotes");
            }
          } catch (ge) {
            console.error("Failed to parse ZOTERO_PREF XML:", ge);
          }
      }
    }), _t.apply(this, arguments);
  }
  function vi() {
    return vt.apply(this, arguments);
  }
  function vt() {
    return vt = E(function* () {
      try {
        var d = yield new Promise((_) => {
          Asc.plugin.executeMethod("GetVersion", [], _);
        });
        d == "develop" && (d = "99.99.99");
        for (var p = d.split("."); 3 > p.length; ) p.push("0");
        return 1e6 * parseInt(p[0]) + 1e3 * parseInt(p[1]) + parseInt(p[2]);
      } catch (_) {
        return console.error(_), 99999999;
      }
    }), vt.apply(this, arguments);
  }
  function gi() {
    var d = new Asc.ButtonContextMenu();
    d.text = "Edit citation", d.addCheckers("Target", "Selection"), d.attachOnClick(/* @__PURE__ */ E(function* () {
      t.openMain(), yield Ut();
    })), Asc.Buttons.registerContextMenu();
  }
})();
//# sourceMappingURL=bundle.modern.js.map
