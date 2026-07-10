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
function hi(e, t, i, n, s, r, o) {
  try {
    var a = e[r](o), u = a.value;
  } catch (h) {
    return void i(h);
  }
  a.done ? t(u) : Promise.resolve(u).then(n, s);
}
function k(e) {
  return function() {
    var t = this, i = arguments;
    return new Promise(function(n, s) {
      var r = e.apply(t, i);
      function o(u) {
        hi(r, n, s, o, a, "next", u);
      }
      function a(u) {
        hi(r, n, s, o, a, "throw", u);
      }
      o(void 0);
    });
  };
}
function Oi(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function l(e, t) {
  return e.get(c(e, t));
}
function B(e, t, i) {
  Oi(e, t), t.set(e, i);
}
function A(e, t, i) {
  return e.set(c(e, t), i), i;
}
function we(e, t) {
  Oi(e, t), t.add(e);
}
function $i(e, t, i) {
  return (t = en(t)) in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
function di(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function Ti(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? di(Object(i), !0).forEach(function(n) {
      $i(e, n, i[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : di(Object(i)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
    });
  }
  return e;
}
function Ni(e, t) {
  if (e == null) return {};
  var i, n, s = Xi(e, t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (n = 0; n < r.length; n++) i = r[n], t.indexOf(i) === -1 && {}.propertyIsEnumerable.call(e, i) && (s[i] = e[i]);
  }
  return s;
}
function Xi(e, t) {
  if (e == null) return {};
  var i = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    i[n] = e[n];
  }
  return i;
}
function Qi(e, t) {
  if (typeof e != "object" || !e) return e;
  var i = e[Symbol.toPrimitive];
  if (i !== void 0) {
    var n = i.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function en(e) {
  var t = Qi(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
var fi = {
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
function Ze() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
    var t = document.getElementById(e);
    if (!t) throw new Error("container ".concat(e, " not found"));
    return t;
  });
}
Ze.prototype.getRoute = function() {
  return this._currentRoute;
};
Ze.prototype._setCurrentRoute = function(e) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
};
Ze.prototype.openMain = function() {
  this._setCurrentRoute("main");
};
Ze.prototype.openLogin = function() {
  this._setCurrentRoute("login");
};
Ze.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
var Mi = {
  desktopApiUrl: "http://127.0.0.1:23119/api/"
}, tn = "https://api.zotero.org/", nt = {
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
    return Promise.all([
      // Always check online availability for resource loading (styles, locales).
      fetch(tn, {
        method: "GET",
        cache: "no-cache"
      }).then(function(n) {
        return n.status === 200;
      }).catch(function() {
        return !1;
      }),
      i._sendDesktopRequest(Mi.desktopApiUrl).then(function(n) {
        return i._hasPermission = n.hasPermission, n.isZoteroRunning;
      }).catch(function() {
        return !1;
      })
    ]).then(function(n) {
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
          var a = !1, u = !1;
          o.responseStatus == 403 ? (a = !1, u = !0) : o.responseStatus === 200 && (u = !0, a = !0), n({
            hasPermission: a,
            isZoteroRunning: u
          });
        },
        error: function(o) {
          o.statusCode == -102 && (o.statusCode = 404), s(o);
        }
      });
    });
  }
}, Me = /* @__PURE__ */ new WeakMap(), Gt = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakSet();
class nn {
  /**
   * @param {{maxRetries?: number, initialDelay?: number, maxDelay?: number, backoffFactor?: number, retryOn?: number[]}} options
   */
  constructor() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    we(this, _e), B(this, Me, void 0), B(this, Gt, void 0), B(this, Wt, void 0), B(this, Dt, void 0), B(this, Tt, void 0), B(this, _t, void 0), B(this, st, void 0), B(this, ve, void 0), B(this, tt, void 0), B(this, qe, void 0), A(Me, this, t.maxRetries || 5), A(Gt, this, t.initialDelay || 1e3), A(Wt, this, t.maxDelay || 5e3), A(Dt, this, t.backoffFactor || 2), A(Tt, this, t.retryOn || [429, 502, 503, 504]), A(_t, this, 10), A(st, this, 5e3), A(ve, this, []), A(tt, this, 0), A(qe, this, 0);
  }
  /**
   * @param {URL} url
   * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
   * @param {number} attempt
   * @returns {Promise<FetchResponse>}
   */
  fetchWithRetry(t, i, n) {
    var s = this;
    return k(function* () {
      try {
        yield c(_e, s, sn).call(s);
        var r = yield fetch(t, {
          headers: i
        });
        if (r.ok)
          return r;
        if (l(Tt, s).includes(r.status) && n < l(Me, s)) {
          var o = c(_e, s, _i).call(s, n, r);
          return console.log("Attempt ".concat(n + 1, "/").concat(l(Me, s), " failed with ").concat(r.status, ". Retrying in ").concat(o, "ms")), yield c(_e, s, vt).call(s, o), s.fetchWithRetry(t, i, n + 1);
        }
        throw new Error("".concat(r.status, " ").concat(r.statusText));
      } catch (h) {
        if (n >= l(Me, s)) {
          var a = "";
          throw h instanceof Error && (a = h.message), new Error("Request failed after ".concat(l(Me, s), " attempts: ").concat(a));
        }
        if (n < l(Me, s)) {
          var u = c(_e, s, _i).call(s, n);
          return console.log("Network error on attempt ".concat(n + 1, ". Retrying in ").concat(u, "ms")), yield c(_e, s, vt).call(s, u), s.fetchWithRetry(t, i, n + 1);
        }
        throw h;
      }
    })();
  }
  resetCounter() {
    A(ve, this, []), A(tt, this, 0), A(qe, this, 0);
  }
}
function pi() {
  var e = Date.now();
  A(ve, this, l(ve, this).filter((t) => e - t < l(st, this)));
}
function sn() {
  return zt.apply(this, arguments);
}
function zt() {
  return zt = k(function* () {
    var e;
    if (c(_e, this, pi).call(this), l(ve, this).length >= l(_t, this)) {
      var t = l(ve, this)[0], i = Date.now() - t;
      if (i < l(st, this)) {
        var n = 500 * l(ve, this).length - l(_t, this);
        n < 0 && (n = 0, console.warn("Wait time is less than 0")), console.log("Rate limit prevention: ".concat(l(ve, this).length, " requests in last ").concat(l(st, this), "ms. Waiting ").concat(n, "ms...")), yield c(_e, this, vt).call(this, n), c(_e, this, pi).call(this);
      }
    }
    l(ve, this).push(Date.now()), A(tt, this, (e = l(tt, this), e++, e));
    var s = Date.now(), r = s - l(qe, this), o = 100;
    r < o && l(qe, this) > 0 && (yield c(_e, this, vt).call(this, o - r)), A(qe, this, Date.now());
  }), zt.apply(this, arguments);
}
function _i(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i = t == null ? void 0 : t.headers.get("Retry-After");
  if (i) {
    var n = parseInt(i);
    if (n > 86400) {
      var s = parseInt(i) * 1e3;
      return Math.max(0, s - Date.now());
    }
    return n * 1e3;
  }
  var r = l(Gt, this) * Math.pow(l(Dt, this), e), o = Math.random() * 1e3;
  return Math.min(r + o, l(Wt, this));
}
function vt(e) {
  return new Promise((t) => setTimeout(t, e));
}
var rn = "https://api.zotero.org/", V = function() {
  this._apiKey = null, this._userId = 0, this._userGroups = [], this._userGroupsLoaded = !1, this._isOnlineAvailable = !0, this._fetcher = new nn({
    maxRetries: 5,
    initialDelay: 5e3
  });
};
V.prototype.ZOTERO_API_VERSION = "3";
V.prototype.USER_AGENT = "AscDesktopEditor";
V.prototype.DEFAULT_FORMAT = "csljson";
V.prototype.SEARCH_RESULT_LIMIT = 50;
V.prototype.STORAGE_KEYS = {
  USER_ID: "zoteroUserId",
  API_KEY: "zoteroApiKey"
};
V.prototype.API_PATHS = {
  USERS: "users",
  GROUPS: "groups",
  ITEMS: "items",
  KEYS: "keys"
};
V.prototype._getBaseUrl = function() {
  return this._isOnlineAvailable ? rn : Mi.desktopApiUrl;
};
V.prototype._getDesktopRequest = function(e) {
  var t = this;
  return new Promise(function(i, n) {
    window.AscSimpleRequest.createRequest({
      url: e,
      method: "GET",
      headers: {
        "Zotero-API-Version": t.ZOTERO_API_VERSION,
        "User-Agent": t.USER_AGENT,
        "Cache-Control": "no-cache"
      },
      complete: i,
      error: function(r) {
        r.statusCode === -102 && (r.statusCode = 404, r.message = "Connection to Zotero failed. Make sure Zotero is running"), n(r);
      }
    });
  });
};
V.prototype._getOnlineRequest = function(e) {
  var t = {
    "Zotero-API-Version": this.ZOTERO_API_VERSION,
    "Zotero-API-Key": this._apiKey || ""
  };
  return fetch(e, {
    headers: t,
    cache: "no-store"
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
V.prototype._getRequestWithOfflineSupport = function(e) {
  return this._isOnlineAvailable ? this._getOnlineRequest(e) : this._getDesktopRequest(e.href);
};
V.prototype._buildGetRequest = function(e, t) {
  t = t || {};
  var i = new URL(e, this._getBaseUrl());
  return Object.keys(t).forEach(function(n) {
    t[n] !== void 0 && t[n] !== null && i.searchParams.append(n, t[n]);
  }), this._getRequestWithOfflineSupport(i);
};
V.prototype._parseLinkHeader = function(e) {
  var t = {}, i = /<(.*?)>; rel="(.*?)"/g;
  if (!e) return t;
  for (var n; (n = i.exec(e.trim())) !== null; )
    t[n[2]] = n[1];
  return t;
};
V.prototype._parseDesktopItemsResponse = function(e, t) {
  return e.then(function(i) {
    return {
      items: JSON.parse(i.responseText),
      id: t
    };
  });
};
V.prototype._parseItemsResponse = function(e, t) {
  var i = this;
  return e.then(function(n) {
    return Promise.all([n.json(), n]);
  }).then(function(n) {
    var s = n[0], r = n[1], o = i._parseLinkHeader(r.headers.get("Link") || ""), a = {
      items: s,
      id: t
    };
    return typeof s == "object" && s.items && (a.items = s.items), o.next && (a.next = function() {
      return i._parseItemsResponse(i._getOnlineRequest(new URL(o.next)), t);
    }), a;
  });
};
V.prototype._parseResponse = function(e, t) {
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
V.prototype.getItems = function(e, t, i) {
  var n = this;
  i = i || n.DEFAULT_FORMAT;
  var s = {
    format: i
  };
  e ? (s.q = e, s.limit = n.SEARCH_RESULT_LIMIT, s.itemType = "-attachment", this._isOnlineAvailable || (s.format = "json")) : t ? s.itemKey = t.join(",") : (s.limit = 20, s.itemType = "-attachment", this._isOnlineAvailable || (s.format = "json"));
  var r = n.API_PATHS.USERS + "/" + n._userId + "/" + n.API_PATHS.ITEMS, o = n._buildGetRequest(r, s);
  return n._parseResponse(o, n._userId);
};
V.prototype.getGroupItems = function(e, t, i, n) {
  var s = this;
  n = n || s.DEFAULT_FORMAT;
  var r = (
    /** @type {{format: string, q?: string, itemKey?: string, limit?: number}} */
    {
      format: n
    }
  );
  e ? (r.q = e, r.limit = s.SEARCH_RESULT_LIMIT, this._isOnlineAvailable || (r.format = "json")) : i && (r.itemKey = i.join(","));
  var o = s.API_PATHS.GROUPS + "/" + t + "/" + s.API_PATHS.ITEMS, a = s._buildGetRequest(o, r);
  return s._parseResponse(a, t);
};
V.prototype.searchUserItemsEverything = function(e) {
  var t = this.API_PATHS.USERS + "/" + this._userId + "/" + this.API_PATHS.ITEMS, i = this._buildGetRequest(t, {
    format: "json",
    q: e,
    qmode: "everything",
    itemType: "-attachment",
    limit: 10
  });
  return this._parseResponse(i, this._userId);
};
V.prototype.getItemByKey = function(e, t) {
  var i = this.API_PATHS.USERS + "/" + this._userId + "/" + this.API_PATHS.ITEMS + "/" + e, n = this._buildGetRequest(i, {
    format: t || this.DEFAULT_FORMAT
  });
  return this._parseResponse(n, this._userId);
};
V.prototype.getGroupItemByKey = function(e, t, i) {
  var n = this.API_PATHS.GROUPS + "/" + e + "/" + this.API_PATHS.ITEMS + "/" + t, s = this._buildGetRequest(n, {
    format: i || this.DEFAULT_FORMAT
  });
  return this._parseResponse(s, e);
};
V.prototype.getUserGroups = function() {
  var e = this;
  return new Promise(function(t, i) {
    if (e._userGroupsLoaded) {
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
      }), e._userGroupsLoaded = !0, t(e._userGroups);
    }).catch(i);
  });
};
V.prototype.setApiKey = function(e) {
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
V.prototype._applySettings = function(e, t) {
  this._userId = e, this._apiKey = t;
};
V.prototype._saveSettings = function(e, t) {
  this._applySettings(e, t), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(e)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, t);
};
V.prototype.hasSettings = function() {
  var e = localStorage.getItem(this.STORAGE_KEYS.USER_ID), t = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
  return e && t ? (this._applySettings(Number(e), t), !0) : !1;
};
V.prototype.clearSettings = function() {
  localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userGroupsLoaded = !1, this._userId = 0, this._apiKey = null;
};
V.prototype.getUserId = function() {
  return this._userId;
};
V.prototype.setIsOnlineAvailable = function(e) {
  this._isOnlineAvailable = e;
};
V.prototype.getIsOnlineAvailable = function() {
  return this._isOnlineAvailable;
};
function Oe(e, t) {
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
Oe.prototype = {
  constructor: Oe,
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
function Pe(e, t) {
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
Pe.prototype = {
  constructor: Pe,
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
function te(e, t) {
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
te.prototype = /** @lends Button.prototype */
{
  constructor: te,
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
var R = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), x = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakSet();
class vi {
  /**
   * Create a Radio instance
   * @constructor
   * @param {string | HTMLInputElement} radio
   * @param {RadioOptionsType} options
   * @throws {Error} If invalid input element
   */
  constructor(t, i) {
    if (we(this, he), B(this, R, void 0), B(this, Y, void 0), B(this, it, void 0), B(this, re, null), B(this, x, void 0), B(this, Ue, /* @__PURE__ */ new Map()), B(this, Ge, []), typeof t == "string") {
      var n = document.getElementById(t);
      n instanceof HTMLInputElement && (t = n);
    }
    if (!(t instanceof HTMLInputElement))
      throw new Error("Invalid input element");
    if (A(Y, this, t), A(x, this, Object.assign({
      id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
      checked: !1,
      disabled: !1,
      indeterminate: !1,
      label: "",
      name: "",
      value: "on"
    }, i)), c(he, this, on).call(this), A(R, this, document.createElement("div")), A(it, this, document.createElement("span")), c(he, this, an).call(this), c(he, this, ln).call(this), c(he, this, Nt).call(this), !l(x, this).name)
      throw new Error("Name attribute is required");
    var s = De._.get(l(x, this).name);
    s || (s = new Array(), De._.set(l(x, this).name, s)), s.push(this);
  }
  /**
   * @param {function(RadioEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return l(Ge, this).push(t), {
      unsubscribe: function() {
        A(Ge, i, l(Ge, i).filter(function(s) {
          return s !== t;
        }));
      }
    };
  }
  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return l(R, this);
  }
  /** @param {boolean} [bSilent] */
  check(t) {
    if (!(l(x, this).disabled || l(x, this).checked)) {
      if (l(x, this).name) {
        var i = De._.get(l(x, this).name);
        i && i.forEach((n) => {
          n !== this && l(x, n).checked && n.uncheck();
        });
      }
      l(x, this).checked = !0, c(he, this, Nt).call(this), !t && c(he, this, gi).call(this);
    }
  }
  /** @param {boolean} [bSilent] */
  uncheck(t) {
    l(x, this).disabled || !l(x, this).checked || (l(x, this).checked = !1, c(he, this, Nt).call(this), !t && c(he, this, gi).call(this));
  }
  enable() {
    l(x, this).disabled && (l(x, this).disabled = !1, l(Y, this).disabled = !1, l(R, this).setAttribute("aria-disabled", "false"), l(x, this).checked ? l(R, this).tabIndex = 0 : c(he, this, si).call(this), l(R, this).classList.remove("radio--disabled"));
  }
  disable() {
    l(x, this).disabled || (l(x, this).disabled = !0, l(Y, this).disabled = !0, l(R, this).setAttribute("aria-disabled", "true"), l(R, this).tabIndex = -1, l(R, this).classList.add("radio--disabled"));
  }
  /** @param {string} label */
  setLabel(t) {
    l(x, this).label = t, l(re, this) ? l(re, this).textContent = t : t && (A(re, this, document.createElement("label")), l(re, this).className = "radio-label", l(re, this).htmlFor = String(l(x, this).id), l(re, this).textContent = t, l(R, this).appendChild(l(re, this)));
  }
  /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
  getState() {
    return {
      checked: !!l(x, this).checked,
      disabled: !!l(x, this).disabled,
      value: l(x, this).value || "",
      name: l(x, this).name || ""
    };
  }
  destroy() {
    if (A(Ge, this, []), !!l(x, this).name) {
      var t = De._.get(l(x, this).name);
      if (t) {
        var i = t.indexOf(this);
        i >= 0 && t.splice(i, 1);
      }
      l(Ue, this).forEach((n, s) => {
        l(R, this).removeEventListener(s, n);
      }), l(Ue, this).clear(), l(R, this) && l(R, this).parentNode && l(R, this).parentNode.removeChild(l(R, this)), A(re, this, null);
    }
  }
}
function on() {
  l(Y, this).type = "radio";
  var e = l(Y, this).getAttribute("id"), t = l(Y, this).getAttribute("name"), i = l(Y, this).getAttribute("value"), n = l(Y, this).getAttribute("checked"), s = l(Y, this).getAttribute("disabled");
  e !== null ? l(x, this).id = e : l(x, this).id && l(Y, this).setAttribute("id", l(x, this).id), t !== null ? l(x, this).name = t : l(x, this).name && l(Y, this).setAttribute("name", l(x, this).name), i !== null ? l(x, this).value = i : l(x, this).value && l(Y, this).setAttribute("value", l(x, this).value), n !== null ? l(x, this).checked = n === "true" : l(x, this).checked && l(Y, this).setAttribute("checked", "true"), s !== null ? l(x, this).disabled = s === "true" : l(x, this).disabled && l(Y, this).setAttribute("disabled", "true");
}
function an() {
  var e = l(Y, this).parentNode, t = document.createDocumentFragment();
  t.appendChild(l(R, this)), l(R, this).classList.add("radio-button-container"), l(R, this).setAttribute("role", "radio"), l(R, this).setAttribute("aria-checked", String(!!l(x, this).checked)), l(R, this).setAttribute("aria-disabled", String(!!l(x, this).disabled)), l(R, this).tabIndex = l(x, this).disabled ? -1 : 0, l(it, this).className = "radio-visual", l(it, this).setAttribute("aria-hidden", "true"), l(x, this).label && (A(re, this, document.createElement("label")), l(re, this).className = "i18n radio-label", l(re, this).htmlFor = String(l(x, this).id), l(re, this).textContent = l(x, this).label), l(x, this).disabled && l(R, this).classList.add("radio--disabled"), e && e.insertBefore(t, l(Y, this)), l(R, this).appendChild(l(Y, this)), l(R, this).appendChild(l(it, this)), l(re, this) && l(R, this).appendChild(l(re, this)), c(he, this, si).call(this);
}
function si() {
  if (l(x, this).checked)
    l(R, this).tabIndex = l(x, this).disabled ? -1 : 0;
  else if (l(x, this).name && De._.has(l(x, this).name)) {
    var e = De._.get(l(x, this).name), t = !1;
    e && e.forEach((i) => {
      l(x, i).checked && i !== this && (t = !0);
    }), !t && !l(x, this).checked && !l(x, this).disabled ? l(R, this).tabIndex = 0 : l(R, this).tabIndex = -1;
  }
}
function ln() {
  var e = (s) => {
    s.preventDefault(), !l(x, this).disabled && !l(x, this).checked && (this.check(), l(R, this).focus());
  }, t = (s) => {
    if (!l(x, this).disabled)
      switch (s.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          s.preventDefault(), l(x, this).checked || this.check();
          break;
      }
  }, i = () => {
    l(R, this).classList.add("radio--focused");
  }, n = () => {
    l(R, this).classList.remove("radio--focused");
  };
  l(Ue, this).set("click", e), l(Ue, this).set("keydown", t), l(Ue, this).set("focus", i), l(Ue, this).set("blur", n), l(R, this).addEventListener("click", e), l(R, this).addEventListener("keydown", t), l(R, this).addEventListener("focus", i), l(R, this).addEventListener("blur", n);
}
function Nt() {
  l(R, this).setAttribute("aria-checked", String(!!l(x, this).checked)), l(R, this).classList.toggle("radio--checked", l(x, this).checked), l(Y, this).checked = !!l(x, this).checked, c(he, this, si).call(this);
}
function gi(e) {
  var t = this.getState(), i = {
    type: "radio:change",
    detail: t
  };
  e && (i.originalEvent = e), l(Ge, this).forEach(function(n) {
    n(i);
  });
}
var De = {
  _: /* @__PURE__ */ new Map()
};
function gt(e, t) {
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
gt.prototype = {
  constructor: gt,
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
    var a = document.createElementNS(r, "path");
    a.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), a.setAttribute("fill", "none"), a.setAttribute("stroke", "currentColor"), a.setAttribute("stroke-width", "2"), o.appendChild(a), this._visualCheckbox.appendChild(o);
    var u = document.createElement("span");
    if (u.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(u), this._options.label)
      this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var h = document.querySelector("label[for='" + this._options.id + "']");
      h instanceof HTMLLabelElement && (this._labelElement = h);
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
      var i = function(a) {
        a.preventDefault(), !t._options.disabled && t._container && (t.toggle(), t._container.focus());
      }, n = function(a) {
        if (!t._options.disabled)
          switch (a.key) {
            case " ":
            case "Spacebar":
            case "Enter":
              a.preventDefault(), t.toggle();
              break;
            case "ArrowRight":
            case "ArrowDown":
              a.preventDefault(), !t._options.checked && !t._options.indeterminate && (t._options.checked ? t.setIndeterminate() : t.check());
              break;
            case "ArrowLeft":
            case "ArrowUp":
              a.preventDefault(), (t._options.checked || t._options.indeterminate) && (t._options.indeterminate ? t.uncheck() : t.setIndeterminate());
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
var N = /* @__PURE__ */ new WeakSet();
class He {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(t, i) {
    if (we(this, N), typeof t == "string") {
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
        c(N, this, Fi).call(this, s);
      },
      search: (s) => {
        c(N, this, hn).call(this, s);
      },
      close: (s) => {
        s.target instanceof HTMLElement && !this._container.contains(s.target) && !s.target.classList.contains("selectbox-option") && c(N, this, be).call(this);
      },
      keydown: (s) => {
        c(N, this, dn).call(this, s);
      },
      dropdownClick: (s) => {
        c(N, this, fn).call(this, s);
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), c(N, this, cn).call(this), c(N, this, un).call(this), c(N, this, ze).call(this), qt._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t) {
      return function() {
        t.searchInput && t.searchInput.focus();
      };
    })(this), 100), c(N, this, ze).call(this);
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
      }), this._options.sortable && this._items.sort((o, a) => o && a ? o.text.localeCompare(a.text) : o ? -1 : a ? 1 : 0);
    n && (this._options.multiple ? this._selectedValues.add(t) : (this._selectedValues.clear(), this._selectedValues.add(t))), c(N, this, ke).call(this);
  }
  /**
   * @param {Array<[string,string]>} values
   * @param {string} [selectedValue]
   */
  addItems(t, i) {
    var n = this;
    t.forEach(function(s, r) {
      var o = n._items.some((u) => u && u.value === s[0]);
      if (!o) {
        var a = i ? s[0] === i : r === 0;
        a && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(s[0])), n._items.push({
          value: s[0],
          text: s[1],
          selected: a
        });
      }
    }, this), this.isOpen && c(N, this, ze).call(this), c(N, this, ke).call(this);
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
    }), this._selectedValues.delete(t), c(N, this, ke).call(this);
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
      var r = function(_) {
        if (n._optionsContainer) {
          var g = n._optionsContainer.querySelector('[data-value="' + _ + '"]');
          if (g) {
            var y = g.querySelector('input[type="checkbox"]');
            y && y instanceof HTMLInputElement && (y.checked = !0), g.classList.add("selectbox-option-selected"), g.classList.add("checkbox--checked");
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
        var a = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + s + '"]');
        a.forEach(function(h) {
          h.classList.remove("selectbox-option-selected"), h.classList.remove("checkbox--checked");
        });
        var u = this._optionsContainer.querySelector('[data-value="' + s + '"]');
        u && (u.classList.add("selectbox-option-selected"), u.classList.add("checkbox--checked"));
      }
      c(N, this, be).call(this);
    }
    c(N, this, ke).call(this), !i && c(N, this, yt).call(this, s, !0);
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
    var s = "", r = function(u) {
      if (n._optionsContainer) {
        var h = n._optionsContainer.querySelector('[data-value="' + u + '"]');
        if (h) {
          var _ = h.querySelector('input[type="checkbox"]');
          _ && _ instanceof HTMLInputElement && (_.checked = !1), h.classList.remove("selectbox-option-selected"), h.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(t))
      for (var o = 0; o < t.length; o++)
        s = t[o], this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    else
      s = t, this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    c(N, this, ke).call(this), !i && c(N, this, yt).call(this, s, !0);
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
    c(N, this, ke).call(this), c(N, this, ze).call(this);
  }
  destroy() {
    this._subscribers = [], qt._.delete(this);
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
function cn() {
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
      var s = c(N, this, pn).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
    }
  }
}
function un() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
    e.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function Fi(e) {
  if (e && e.stopPropagation(), this.isOpen ? c(N, this, be).call(this) : this.openDropdown(), e && e.type === "click")
    for (var t of qt._)
      t.isOpen && t !== this && c(N, t, be).call(t);
}
function be() {
  this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = !1, this._dropdown.style.display = "none";
  for (var e = this._arrow.className.split(" "), t = [], i = 0; i < e.length; i++)
    e[i] !== "selectbox-arrow-open" && t.push(e[i]);
  this._arrow.className = t.join(" ");
  for (var n = this._header.className.split(" "), s = [], i = 0; i < n.length; i++)
    n[i] !== "selectbox-header-open" && s.push(n[i]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function hn(e) {
  var t = e.target;
  if (t instanceof HTMLInputElement) {
    var i = t.value.toLowerCase();
    c(N, this, ze).call(this, i);
  }
}
function Ri(e, t) {
  if (t === null)
    return !1;
  if (!e)
    return !0;
  var i = e.split(/\s+/).filter(Boolean), n = t.text.toLowerCase();
  return i.every(function(s) {
    return n.indexOf(s) !== -1;
  });
}
function yi(e) {
  var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", i, n = this._items.filter(function(h) {
    return h !== null;
  });
  if (t && (n = n.filter((h) => c(N, this, Ri).call(this, t, h))), n.length !== 0) {
    if (e === "up")
      if (this._selectedValues.size === 0 && n.length > 0)
        i = n[n.length - 1], this._selectedValues.add(i.value);
      else {
        for (var s = Array.from(this._selectedValues), r = -1, o = 0; o < n.length; o++)
          if (n[o].value === s[0]) {
            r = o;
            break;
          }
        var a = (r - 1 + n.length) % n.length;
        this._selectedValues.clear(), i = n[a], this._selectedValues.add(i.value);
      }
    else if (this._selectedValues.size === 0 && n.length > 0)
      i = n[0], this._selectedValues.add(i.value);
    else {
      for (var s = Array.from(this._selectedValues), r = -1, o = 0; o < n.length; o++)
        if (n[o].value === s[0]) {
          r = o;
          break;
        }
      var u = (r + 1) % n.length;
      u === n.length && (u = 0), this._selectedValues.clear(), i = n[u], this._selectedValues.add(i.value);
    }
    c(N, this, ke).call(this), c(N, this, ze).call(this, t, !0), c(N, this, yt).call(this, i.value, !0);
  }
}
function dn(e) {
  var t = e.key || e.keyCode;
  switch (t) {
    case "Enter":
    case 13:
      e.preventDefault(), c(N, this, Fi).call(this, e);
      break;
    case "Escape":
    case 27:
      c(N, this, be).call(this);
      break;
    case "ArrowDown":
    case 40:
      e.preventDefault(), c(N, this, yi).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      e.preventDefault(), c(N, this, yi).call(this, "up");
      break;
    case "Tab":
    case 9:
      c(N, this, be).call(this);
      break;
  }
}
function ze(e, t) {
  if (e = e || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, n = this._items;
    e && (n = n.filter((K) => c(N, this, Ri).call(this, e, K)));
    for (var s = document.createDocumentFragment(), r = 0; r < n.length; r++) {
      var o = n[r];
      if (!o) {
        var a = document.createElement("hr");
        a.className += " selectbox-option-divider", s.appendChild(a);
        continue;
      }
      var u = document.createElement("div");
      u.className += " selectbox-option", this._selectedValues.has(o.value) && (u.className += " selectbox-option-selected checkbox--checked", i = u), u.setAttribute("data-value", o.value);
      var h = document.createElement("label");
      if (h.className += " selectbox-option-text i18n", this._options.translate && (o.text = this._options.translate(o.text)), h.textContent = o.text, this._options.multiple) {
        u.className += " selectbox-option-checkbox";
        var _ = document.createElement("input");
        _.type = "checkbox", _.id = "checkbox-" + o.value, _.className += " selectbox-checkbox", _.checked = this._selectedValues.has(o.value), u.appendChild(_);
        var g = document.createElement("span");
        g.className = "checkbox-visual", g.setAttribute("aria-hidden", "true");
        var y = "http://www.w3.org/2000/svg", w = document.createElementNS(y, "svg");
        w.setAttribute("viewBox", "0 0 10 8"), w.setAttribute("class", "checkbox-checkmark");
        var E = document.createElementNS(y, "path");
        E.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), E.setAttribute("fill", "none"), E.setAttribute("stroke", "currentColor"), E.setAttribute("stroke-width", "2"), w.appendChild(E), g.appendChild(w), u.appendChild(g);
      }
      u.appendChild(h), s.appendChild(u);
    }
    if (this._customItems.length) {
      var T = document.createElement("hr");
      T.className += " selectbox-option-divider", s.appendChild(T);
    }
    for (var r = 0; r < this._customItems.length; r++) {
      var L = this._customItems[r], b = document.createElement("label");
      b.className += " selectbox-custom-option", b.setAttribute("data-value", L.value), b.setAttribute("for", L.value);
      var U = document.createElement("span");
      U.className += " selectbox-option-text i18n", this._options.translate && (L.text = this._options.translate(L.text)), U.textContent = L.text, b.appendChild(U), s.appendChild(b);
    }
    if (this._optionsContainer.appendChild(s), t && this.isOpen && this._optionsContainer && i)
      try {
        i.scrollIntoView && i.scrollIntoView({
          block: "nearest"
        });
      } catch (K) {
        console.error(K);
      }
  }
}
function fn(e) {
  var t = e.target || e.srcElement, i = null;
  if (t && t instanceof HTMLElement) {
    for (var n = null, s = t.className.split(" "), r = !1, o = 0; o < s.length; o++)
      if (s[o] === "selectbox-option") {
        r = !0;
        break;
      } else if (s[o] === "selectbox-custom-option") {
        var a = t.getAttribute("data-value");
        if (a) {
          e.stopPropagation(), c(N, this, mi).call(this, a), c(N, this, be).call(this);
          return;
        }
        break;
      }
    if (r)
      n = t;
    else if (t.parentNode && t.parentNode instanceof HTMLElement) {
      for (var u = t.parentNode.className.split(" "), h = !1, o = 0; o < u.length; o++)
        if (u[o] === "selectbox-option") {
          h = !0;
          break;
        } else if (u[o] === "selectbox-custom-option") {
          var _ = t.parentNode.getAttribute("data-value");
          if (_) {
            e.stopPropagation(), c(N, this, mi).call(this, _), c(N, this, be).call(this);
            return;
          }
          break;
        }
      h && (n = t.parentNode);
    }
    if (n instanceof HTMLDivElement)
      i = n;
    else
      return;
  } else
    return;
  var g = i.getAttribute("data-value");
  if (g !== null) {
    var y = !0;
    this._options.multiple ? this._selectedValues.has(g) ? (this.unselectItems(g, !0), y = !1) : this.selectItems(g, !0) : (this.selectItems(g, !0), c(N, this, be).call(this)), c(N, this, ke).call(this), c(N, this, yt).call(this, g, y);
  }
}
function ke() {
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
function yt(e, t) {
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
  this._subscribers.forEach(function(a) {
    a({
      type: "selectbox:change",
      detail: o
    });
  });
}
function mi(e) {
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
function pn(e) {
  var t = Array.from(e.options).map((s) => [s.value, s.text]), i = {
    values: t
  }, n = e.value;
  return n && (i.selectedValue = n), i;
}
var qt = {
  _: /* @__PURE__ */ new Set()
}, Zt, Ee = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), bi = /* @__PURE__ */ new WeakSet();
class D {
  /**
   * @param {string} containerId
   * @param {string} text
   */
  constructor(t, i) {
    we(this, bi), B(this, Ee, void 0), B(this, Jt, null), B(this, pt, null);
    var n = document.getElementById(t);
    if (!(n instanceof HTMLElement)) throw new Error("Invalid container");
    A(Ee, this, n), c(bi, this, _n).call(this, i);
  }
  show() {
    var t;
    (t = l(Ee, this)) === null || t === void 0 || t.classList.remove("hidden");
  }
  hide() {
    var t;
    (t = l(Ee, this)) === null || t === void 0 || t.classList.add("hidden");
  }
  /** @param {string} text */
  setText(t) {
    l(pt, this) && (l(pt, this).innerText = t);
  }
  /**
   * Switches the ring from an indeterminate spin to a determinate progress
   * arc, or back to indeterminate when called with null/undefined.
   * @param {number|null} [fraction] value from 0 to 1
   */
  setProgress(t) {
    wi.call(D, l(Ee, this), l(Jt, this), t);
  }
  static show() {
    var t;
    (t = c(D, this, Mt)._) === null || t === void 0 || t.classList.remove("hidden");
  }
  static hide() {
    var t;
    (t = c(D, this, Mt)._) === null || t === void 0 || t.classList.add("hidden");
  }
  /** @param {string} text */
  static setText(t) {
    c(D, this, Si)._ && (c(D, this, Si)._.innerText = t);
  }
  /** @param {number|null} [fraction] value from 0 to 1 */
  static setProgress(t) {
    c(D, this, wi).call(this, c(D, this, Mt)._, c(D, this, vn)._, t);
  }
  /**
   * @param {HTMLElement|null} [container]
   * @param {SVGCircleElement|null} [circle]
   * @param {number|null} [fraction]
   */
}
Zt = D;
function _n(e) {
  l(Ee, this).classList.add("loader-container");
  var t = "http://www.w3.org/2000/svg", i = document.createElementNS(t, "svg");
  i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
  var n = document.createElementNS(t, "circle");
  n.setAttribute("cx", "10"), n.setAttribute("cy", "10"), n.setAttribute("fill", "none"), n.setAttribute("stroke", "currentColor"), n.setAttribute("stroke-width", "1.5"), n.setAttribute("r", "7.25"), n.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(n), l(Ee, this).appendChild(i);
  var s = document.createElement("div");
  s.classList.add("loader-title"), s.classList.add("i18n"), s.innerText = e, l(Ee, this).appendChild(s), A(Jt, this, n), A(pt, this, s);
}
function wi(e, t, i) {
  if (!(!e || !t)) {
    if (i == null) {
      e.classList.remove("loader-determinate"), t.style.strokeDasharray = "", t.style.strokeDashoffset = "";
      return;
    }
    var n = Math.max(0, Math.min(1, i));
    e.classList.add("loader-determinate"), t.style.strokeDasharray = String(c(Zt, this, Ci)._), t.style.strokeDashoffset = String(c(Zt, this, Ci)._ * (1 - n));
  }
}
var Mt = {
  _: document.getElementById("loader")
}, vn = {
  _: document.querySelector("#loader .loader-image circle")
}, Si = {
  _: document.querySelector("#loader .loader-title")
}, Ci = {
  _: 2 * Math.PI * 7.25
};
function m(e) {
  try {
    return window.Asc.plugin.tr(e);
  } catch (t) {
    return console.error(t), e;
  }
}
class rt {
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
        var o = t[r + 1] === "/", a = t.indexOf(">", r);
        if (a === -1) {
          i.text += t[r], r++;
          continue;
        }
        var u = t.substring(o ? r + 2 : r + 1, a).trim(), h = u.split(" ");
        if (h.length === 0) {
          i.text += t[r], r++;
          continue;
        }
        var _ = h[0].toLowerCase();
        if (_ === "br") {
          i.text += `
`, r = a + 1;
          continue;
        }
        var g = _;
        if (u.indexOf("font-variant:small-caps") !== -1 ? g = "sc" : u.indexOf("text-decoration:underline") !== -1 && (g = "u"), c(rt, this, gn)._.has(_))
          if (o) {
            for (var y = n.length - 1; y >= 0; y--)
              if (n[y].tag === _) {
                var {
                  start: w,
                  styleTag: E
                } = n.splice(y, 1)[0];
                i.formatting.push({
                  type: E,
                  start: w,
                  end: s
                });
                break;
              }
          } else
            n.push({
              tag: _,
              start: s,
              styleTag: g
            });
        r = a + 1;
      } else
        i.text += t[r], s++, r++;
    return i.formatting.sort((T, L) => T.start === L.start ? L.end - T.end : T.start - L.start), i;
  }
}
var gn = {
  _: /* @__PURE__ */ new Set(["i", "u", "b", "sc", "sup", "sub", "em", "div", "span"])
};
class le {
  /**
   * @param {Array<FormattingPositions>} positions
   * @returns {Promise<void>}
   */
  static formatAfterInsert(t, i) {
    return new Promise(function(n) {
      var s = !0, r = !1;
      Asc.scope.formatting = t, Asc.scope.textToMatch = i || "", Asc.plugin.callCommand(function() {
        var o = Api.GetDocument();
        function a(X, G) {
          G === "sup" ? X.SetVertAlign("superscript") : G === "sub" ? X.SetVertAlign("subscript") : G === "sc" ? X.SetSmallCaps(!0) : G === "u" ? X.SetUnderline(!0) : G === "b" ? X.SetBold(!0) : (G === "i" || G === "em") && X.SetItalic(!0);
        }
        var u = null, h = o.GetCurrentFootEndnote();
        if (h && Asc.scope.textToMatch)
          for (var _ = h.GetElementsCount(), g = 0; g < _; g++) {
            var y = h.GetElement(g);
            if (y) {
              for (var w = y.GetElementsCount ? y.GetElementsCount() : 0, E = 0; E < w; E++) {
                var T = y.GetElement(E);
                if (!(!T || typeof T.GetRange != "function")) {
                  var L = T.GetText ? T.GetText() : "";
                  if (L === Asc.scope.textToMatch) {
                    u = T;
                    break;
                  }
                }
              }
              if (u) break;
            }
          }
        if (u || (u = o.GetCurrentRun()), !!u)
          for (var b = Asc.scope.formatting.length - 1; b >= 0; b--) {
            var U = Asc.scope.formatting[b], K = u.GetRange(U.start, U.end);
            K && a(K, U.type);
          }
      }, r, s, n);
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
        var o = Api.GetDocument(), a = o.GetRangeBySelect();
        if (!a)
          return;
        function u(G, se) {
          se === "sup" ? G.SetVertAlign("superscript") : se === "sub" ? G.SetVertAlign("subscript") : se === "sc" ? G.SetSmallCaps(!0) : se === "u" ? G.SetUnderline(!0) : se === "b" ? G.SetBold(!0) : (se === "i" || se === "em") && G.SetItalic(!0);
        }
        if (Asc.scope.formatting.length === 1) {
          var h = Asc.scope.formatting[0];
          if (h.start === 0 && h.end === a.GetText().length) {
            u(a, h.type);
            return;
          }
        }
        var _ = null, g = a.GetAllParagraphs();
        if (g && g.length)
          for (var y = 0; y < g.length; y++) {
            var w = g[y];
            if (w) {
              for (var E = w.GetElementsCount(), T = 0; T < E; T++) {
                var L = w.GetElement(T);
                if (!(!L || typeof L.GetRange != "function")) {
                  var b = L.GetText ? L.GetText() : "";
                  if (b === Asc.scope.text) {
                    _ = L;
                    break;
                  }
                }
              }
              if (_) break;
            }
          }
        if (_ || (o.MoveCursorToPos(a.GetEndPos() - Asc.scope.text.length), _ = o.GetCurrentRun()), !!_)
          for (var U = Asc.scope.formatting.length - 1; U >= 0; U--) {
            var K = Asc.scope.formatting[U], X = _.GetRange(K.start, K.end);
            X && u(X, K.type);
          }
      }, s, n, r);
    });
  }
}
var Ft = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakSet();
class yn {
  /**
   * @param {string} citPrefix
   * @param {string} citSuffix
   * @param {string} bibPrefix
   * @param {string} bibSuffix
   */
  constructor(t, i, n, s) {
    we(this, F), B(this, Ft, void 0), B(this, ht, void 0), B(this, Rt, void 0), B(this, Bt, void 0), B(this, Fe, void 0), B(this, dt, void 0), A(Ft, this, "ZOTERO_CITATION"), A(Rt, this, "ZOTERO_BIBLIOGRAPHY"), A(ht, this, t), A(Bt, this, i), A(Fe, this, n), A(dt, this, s);
  }
  /**
   * @param {string} text
   * @param {string} value
   * @returns {Promise<string>}
   */
  addBibliography(t, i) {
    var n = this;
    return k(function* () {
      var s = window.Asc.scope.editorVersion;
      if (s && s < 9004e3) {
        var r = rt.parseHtmlFormatting(t), o = "", a = {
          FieldId: o,
          Value: l(Fe, n) + " " + i + " " + l(dt, n),
          Content: r.text
        };
        return c(F, n, We).call(n, a).then(() => n.getCurrentField()).then((h) => {
          if (o = (h == null ? void 0 : h.FieldId) || "", !!r.formatting.length)
            return o ? c(F, n, ue).call(n, o).then(() => le.formatAfterUpdate(o, r)) : le.formatAfterInsert(r.formatting, r.text);
        }).then(() => o);
      } else {
        var u = {
          FieldId: "",
          Value: l(Fe, n) + " " + i + " " + l(dt, n),
          Content: " "
        };
        return yield c(F, n, Ai).call(n, u, t);
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
    return k(function* () {
      var r = rt.parseHtmlFormatting(t), o = {
        FieldId: "",
        Value: l(ht, s) + " " + l(Bt, s) + " " + i,
        Content: r.text
      }, a = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1), u = a ? yield c(F, s, xi).call(s) : !1, h = a && !u;
      if (h && (yield c(F, s, Ut).call(s, n)), yield c(F, s, We).call(s, o), r.formatting.length) {
        var _ = yield s.getCurrentField();
        _ && _.FieldId ? (yield c(F, s, ue).call(s, _.FieldId), yield le.formatAfterUpdate(_.FieldId, r)) : yield le.formatAfterInsert(r.formatting, r.text);
      }
      return h && (yield c(F, s, Ii).call(s)), h;
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
      c(F, t, mn).call(t).then(function(s) {
        try {
          s.length && (s = s.filter(function(r) {
            return r.Value.indexOf(l(ht, t)) !== -1 || r.Value.indexOf(l(Fe, t)) !== -1 || r.Value.indexOf(l(Ft, t)) !== -1 || r.Value.indexOf(l(Rt, t)) !== -1;
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
    return k(function* () {
      var n = t.map((y) => y.FieldId), s = window.Asc.scope.editorVersion, r = t.filter((y) => y.Value.indexOf(l(Fe, i)) === 0);
      if (r.length && s && s >= 9004e3) {
        t = t.filter((y) => y.Value.indexOf(l(Fe, i)) !== 0);
        var o = r[0];
        yield c(F, i, ue).call(i, o.FieldId);
        var a = o.Content || "";
        o.Content = " ", yield c(F, i, Ht).call(i), yield c(F, i, Ai).call(i, o, a);
      }
      var u = c(F, i, Qe).call(i, t);
      if (yield new Promise((y) => {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [t], y);
      }), !u.size) return n;
      for (var [h, _] of u) {
        var g = yield c(F, i, ue).call(i, h);
        g && (yield le.formatAfterUpdate(h, _));
      }
      return n;
    })();
  }
  /**
   * Update fields that are already inside notes without re-selecting addin fields.
   * SelectAddinField is unreliable for notes and can move the viewport unexpectedly.
   * @param {Array<AddinFieldData>} fields
   * @returns {Promise<string[]>}
   */
  updateAddinFieldsInNotes(t) {
    var i = this;
    return k(function* () {
      var n = t.map((a) => a.FieldId), s = c(F, i, Qe).call(i, t);
      if (yield new Promise((a) => {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [t], a);
      }), !s.size) return n;
      for (var [r, o] of s)
        yield le.formatAfterUpdate(r, o);
      return n;
    })();
  }
  /**
   * @param {Array<AddinFieldData>} fields
   * @returns {Promise<void>}
   */
  convertNotesToText(t) {
    var i = this;
    return k(function* () {
      for (var n = c(F, i, Qe).call(i, t), s = 0; s < t.length; s++) {
        var r = t[s];
        if (!r.FieldId) {
          console.error("Field id is not defined");
          continue;
        }
        var o = yield c(F, i, ue).call(i, r.FieldId);
        if (o) {
          var a = yield c(F, i, Ii).call(i);
          if (a) {
            yield c(F, i, wn).call(i), yield c(F, i, Ht).call(i), yield c(F, i, We).call(i, r);
            var u = n.get(r.FieldId);
            if (u) {
              var h = yield i.getCurrentField();
              h && h.FieldId ? (yield c(F, i, ue).call(i, h.FieldId), yield le.formatAfterUpdate(h.FieldId, u)) : yield le.formatAfterInsert(u.formatting, u.text);
            }
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
    return k(function* () {
      for (var s = c(F, n, Qe).call(n, t), r = 0; r < t.length; r++) {
        var o = t[r];
        if (o.FieldId) {
          var a = yield c(F, n, ue).call(n, o.FieldId);
          if (a) {
            yield c(F, n, Ht).call(n), yield c(F, n, Ut).call(n, i), yield c(F, n, We).call(n, o);
            var u = s.get(o.FieldId);
            if (u) {
              var h = yield n.getCurrentField();
              h && h.FieldId ? (yield c(F, n, ue).call(n, h.FieldId), yield le.formatAfterUpdate(h.FieldId, u)) : yield le.formatAfterInsert(u.formatting, u.text);
            }
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
    return k(function* () {
      for (var s = [], r = c(F, n, Qe).call(n, t), o = 0; o < t.length; o++) {
        var a = t[o];
        if (a.FieldId) {
          if (!a.Content) {
            s.push(a);
            continue;
          }
          var u = yield c(F, n, ue).call(n, a.FieldId);
          if (u) {
            var h = yield c(F, n, xi).call(n);
            if (h) {
              s.push(a);
              continue;
            }
            yield c(F, n, Ut).call(n, i), yield c(F, n, We).call(n, a);
            var _ = r.get(a.FieldId);
            if (_) {
              var g = yield n.getCurrentField();
              g && g.FieldId ? (yield c(F, n, ue).call(n, g.FieldId), yield le.formatAfterUpdate(g.FieldId, _)) : yield le.formatAfterInsert(_.formatting, _.text);
            }
          }
        }
      }
      if (s.length) {
        yield new Promise(function(T) {
          window.Asc.plugin.executeMethod("UpdateAddinFields", [s], T);
        });
        for (var y of s) {
          var w = r.get(y.FieldId);
          if (w) {
            var E = yield c(F, n, ue).call(n, y.FieldId);
            E && (yield le.formatAfterUpdate(y.FieldId, w));
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
    return k(function* () {
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
    return k(function* () {
      return new Promise((n) => {
        i = i ?? !1, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [t, i], n);
      });
    })();
  }
  /**
   * @returns {Promise<void>}
  */
  moveCursorRight() {
    return k(function* () {
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
function We(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("AddAddinField", [e], t);
  });
}
function Ut(e) {
  return Asc.scope.notesStyle = e, new Promise((t) => {
    Asc.plugin.callCommand(() => {
      var i = Api.GetDocument();
      Asc.scope.notesStyle === "footnotes" ? i.AddFootnote() : Asc.scope.notesStyle === "endnotes" && i.AddEndnote();
    }, !1, !1, t);
  });
}
function mn() {
  return new Promise(function(e, t) {
    window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
  });
}
function Qe(e) {
  var t = /* @__PURE__ */ new Map();
  return e.forEach(function(i) {
    if (i.Content) {
      var n = rt.parseHtmlFormatting(i.Content);
      i.Content = n.text, n.formatting.length && i.FieldId && t.set(i.FieldId, n);
    }
  }), t;
}
function bn(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("PasteHtml", [e], t);
  });
}
function xi() {
  return new Promise((e) => {
    Asc.plugin.callCommand(() => {
      var t = Api.GetDocument(), i = t.GetCurrentFootEndnote();
      return !!i;
    }, !1, !0, (t) => e(!!t));
  });
}
function Ht() {
  return new Promise((e) => {
    window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
  });
}
function ue(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
  });
}
function Ii() {
  return new Promise(function(e) {
    var t = !0, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetCurrentFootEndnote();
      if (s)
        var r = s.SelectNoteReference();
    }, i, t, () => e(!0));
  });
}
function wn() {
  return new Promise(function(e) {
    var t = !1, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetRangeBySelect();
      s && s.SetVertAlign("baseline");
    }, i, t, e);
  });
}
function Ai(e, t) {
  return Yt.apply(this, arguments);
}
function Yt() {
  return Yt = k(function* (e, t) {
    if (yield c(F, this, We).call(this, e), yield new Promise((h) => {
      var _ = !0, g = !1;
      Asc.plugin.callCommand(() => {
        var y = Api.GetDocument();
        y.MoveCursorLeft(1, !0);
      }, g, _, h);
    }), !Asc.scope.bibStyle)
      throw "Bibliography style is not defined";
    var i = new DOMParser(), n = i.parseFromString(t, "text/html"), s = n.querySelectorAll(".csl-entry"), r = new Array(s.length), o = Date.now().toString(36);
    s.forEach((h, _) => {
      var g = h.querySelector(".csl-left-margin"), y = h.querySelector(".csl-right-inline");
      if (y == null || y.replaceWith(...y.childNodes), g) {
        r[_] = g.textContent.trim() + o;
        for (var w = document.createElement("em"); g.firstChild; )
          w.appendChild(g.firstChild);
        var E = document.createElement("span");
        E.textContent = o, w.appendChild(E), g.replaceWith(w);
      }
      for (var T = document.createElement("p"); h.firstChild; )
        T.appendChild(h.firstChild);
      h.replaceWith(T);
    }), t = n.body.innerHTML, yield c(F, this, bn).call(this, t);
    var a = yield this.getCurrentField();
    if (!a) {
      console.warn("Failed to get current field after paste");
      for (var u = 0; u < 5 && (yield new Promise((h) => {
        setTimeout(() => {
          h(!0);
        }, 100);
      }), a = yield this.getCurrentField(), !a); u++)
        ;
      if (!a)
        throw new Error("Failed to get current field after paste");
    }
    return yield c(F, this, ue).call(this, a.FieldId), yield new Promise((h) => {
      var _ = !1, g = !1;
      Asc.scope.numbers = r, Asc.scope.hash = o, Asc.plugin.callCommand(() => {
        var y = Api.GetDocument(), w = y.GetRangeBySelect();
        if (w) {
          var E = Asc.scope.bibStyle, T = w.GetAllParagraphs();
          T.forEach((L, b) => {
            var U = L.GetText().trim();
            if (U !== "")
              if (typeof E.linespacing == "number" && L.SetSpacingLine(240 * E.linespacing, "exact"), typeof E.entryspacing == "number" && L.SetSpacingAfter(240 * E.entryspacing), E["second-field-align"]) {
                for (var K = String(Asc.scope.numbers[b]), X = 0; X < L.GetElementsCount(); X++) {
                  var G = L.GetElement(X);
                  if (G.GetText() === K) {
                    G.AddTabStop(), G.SetItalic(!1);
                    break;
                  }
                }
                var se = L.Search(Asc.scope.hash, !0)[0];
                se.Delete(), L.SetIndLeft(E.maxoffset * 120), L.SetIndFirstLine(-(E.maxoffset * 120));
              } else E.hangingindent && (L.SetIndLeft(720), L.SetIndFirstLine(-720));
          });
        }
      }, g, _, h);
    }), Asc.scope.bibStyle = null, a.FieldId;
  }), Yt.apply(this, arguments);
}
var Le = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakSet();
class Sn {
  constructor() {
    we(this, ki), B(this, Le, void 0), B(this, pe, void 0), B(this, fe, void 0), A(Le, this, []), A(pe, this, []), A(fe, this, []), this.size = 0;
  }
  /** @returns {CitationItem} */
  /**
   * @param {string|number} id
   * @returns {CitationItem|null}
   **/
  getItem(t) {
    t = t.toString();
    var i = l(pe, this).indexOf(t);
    return i >= 0 ? l(Le, this)[i] : null;
  }
  /**
   *
   * @param {string|number} id
   * @returns {number}
   */
  getItemIndex(t) {
    return t = t.toString(), l(pe, this).indexOf(t);
  }
  clear() {
    return A(Le, this, []), A(fe, this, []), A(pe, this, []), this.size = 0, this;
  }
  /**
   * @param {string|number} id
   * @returns {CSLCitationStorage}
   */
  deleteItem(t) {
    t = t.toString();
    var i = l(pe, this).indexOf(t);
    return i >= 0 && (l(Le, this).splice(i, 1), l(pe, this).splice(i, 1), this.size--), this;
  }
  /**
   * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
   */
  forEachItem(t) {
    for (var i = 0; i < this.size; i++)
      t(l(Le, this)[i], l(pe, this)[i], this);
  }
  /**
   * @param {string|number} id
   * @returns {boolean}
   */
  hasItem(t) {
    return t = t.toString(), l(pe, this).indexOf(t) >= 0;
  }
  /**
   * @param {CSLCitation} cslCitation
   * @returns {CSLCitationStorage}
   */
  addCslCitation(t) {
    return l(fe, this).push(t), t.setNoteIndex(l(fe, this).length), t.getCitationItems().forEach((i) => {
      c(ki, this, Cn).call(this, i.id, i);
    }), this;
  }
  getAllCitationsInJson() {
    return l(fe, this).map((t) => t.toJSON());
  }
  /**
   * @param {string} id
   * @returns {CSLCitation|undefined}
   */
  getCitation(t) {
    return l(fe, this).find((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {number}
   */
  getCitationIndex(t) {
    return l(fe, this).findIndex((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPre(t) {
    var i = [];
    return l(fe, this).find((n, s) => n.citationID === t ? !0 : (i.push([n.citationID, s + 1]), !1)), i;
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPost(t) {
    for (var i = [], n = this.getCitationIndex(t), s = n + 1; s < l(fe, this).length; s++) {
      var r = l(fe, this)[s];
      i.push([r.citationID, s + 1]);
    }
    return i;
  }
}
function Cn(e, t) {
  e = e.toString();
  var i = l(pe, this).indexOf(e);
  return i >= 0 ? (l(Le, this)[i] = t, this) : (l(Le, this).push(t), l(pe, this).push(e), this.size++, this);
}
var xn = ["userID", "groupID"];
function v(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItemData: id is required");
  this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
v.prototype._addCustomProperty = function(e, t) {
  return this._custom[e] = t, this;
};
v.prototype.getCustomProperty = function(e) {
  return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
};
v.prototype.fillFromObject = function(e) {
  if (Object.hasOwnProperty.call(e, "type") && (this._type = e.type), Object.hasOwnProperty.call(e, "categories") && (this._categories = e.categories), Object.hasOwnProperty.call(e, "citation-key") && (this._citationKey = e["citation-key"]), Object.hasOwnProperty.call(e, "language") && (this._language = e.language), Object.hasOwnProperty.call(e, "journalAbbreviation") && (this._journalAbbreviation = e.journalAbbreviation), Object.hasOwnProperty.call(e, "shortTitle") && (this._shortTitle = e.shortTitle), Object.hasOwnProperty.call(e, "author") && (this._author = e.author), Object.hasOwnProperty.call(e, "chair") && (this._chair = e.chair), Object.hasOwnProperty.call(e, "collection-editor") && (this._collectionEditor = e["collection-editor"]), Object.hasOwnProperty.call(e, "compiler") && (this._compiler = e.compiler), Object.hasOwnProperty.call(e, "composer") && (this._composer = e.composer), Object.hasOwnProperty.call(e, "container-author") && (this._containerAuthor = e["container-author"]), Object.hasOwnProperty.call(e, "contributor") && (this._contributor = e.contributor), Object.hasOwnProperty.call(e, "curator") && (this._curator = e.curator), Object.hasOwnProperty.call(e, "director") && (this._director = e.director), Object.hasOwnProperty.call(e, "editorial-director") && (this._editorialDirector = e["editorial-director"]), Object.hasOwnProperty.call(e, "editor") && (this._editor = e.editor), Object.hasOwnProperty.call(e, "executive-producer") && (this._executiveProducer = e["executive-producer"]), Object.hasOwnProperty.call(e, "guest") && (this._guest = e.guest), Object.hasOwnProperty.call(e, "host") && (this._host = e.host), Object.hasOwnProperty.call(e, "illustrator") && (this._illustrator = e.illustrator), Object.hasOwnProperty.call(e, "narrator") && (this._narrator = e.narrator), Object.hasOwnProperty.call(e, "organizer") && (this._organizer = e.organizer), Object.hasOwnProperty.call(e, "original-author") && (this._originalAuthor = e["original-author"]), Object.hasOwnProperty.call(e, "performer") && (this._performer = e.performer), Object.hasOwnProperty.call(e, "producer") && (this._producer = e.producer), Object.hasOwnProperty.call(e, "recipient") && (this._recipient = e.recipient), Object.hasOwnProperty.call(e, "reviewed-author") && (this._reviewedAuthor = e["reviewed-author"]), Object.hasOwnProperty.call(e, "script-writer") && (this._scriptWriter = e["script-writer"]), Object.hasOwnProperty.call(e, "series-creator") && (this._seriesCreator = e["series-creator"]), Object.hasOwnProperty.call(e, "translator") && (this._translator = e.translator), Object.hasOwnProperty.call(e, "accessed") && (this._accessed = e.accessed), Object.hasOwnProperty.call(e, "container") && (this._container = e.container), Object.hasOwnProperty.call(e, "event-date") && (this._eventDate = e["event-date"]), Object.hasOwnProperty.call(e, "issued") && (this._issued = e.issued), Object.hasOwnProperty.call(e, "original-date") && (this._originalDate = e["original-date"]), Object.hasOwnProperty.call(e, "submitted") && (this._submitted = e.submitted), Object.hasOwnProperty.call(e, "abstract") && (this._abstract = e.abstract), Object.hasOwnProperty.call(e, "annote") && (this._annote = e.annote), Object.hasOwnProperty.call(e, "archive") && (this._archive = e.archive), Object.hasOwnProperty.call(e, "archive_collection") && (this._archiveCollection = e.archive_collection), Object.hasOwnProperty.call(e, "archive_location") && (this._archiveLocation = e.archive_location), Object.hasOwnProperty.call(e, "archive-place") && (this._archivePlace = e["archive-place"]), Object.hasOwnProperty.call(e, "authority") && (this._authority = e.authority), Object.hasOwnProperty.call(e, "call-number") && (this._callNumber = e["call-number"]), Object.hasOwnProperty.call(e, "chapter-number") && (this._chapterNumber = e["chapter-number"]), Object.hasOwnProperty.call(e, "citation-number") && (this._citationNumber = e["citation-number"]), Object.hasOwnProperty.call(e, "citation-label") && (this._citationLabel = e["citation-label"]), Object.hasOwnProperty.call(e, "collection-number") && (this._collectionNumber = e["collection-number"]), Object.hasOwnProperty.call(e, "collection-title") && (this._collectionTitle = e["collection-title"]), Object.hasOwnProperty.call(e, "container-title") && (this._containerTitle = e["container-title"]), Object.hasOwnProperty.call(e, "container-title-short") && (this._containerTitleShort = e["container-title-short"]), Object.hasOwnProperty.call(e, "dimensions") && (this._dimensions = e.dimensions), Object.hasOwnProperty.call(e, "DOI") && (this._DOI = e.DOI), Object.hasOwnProperty.call(e, "edition") && (this._edition = e.edition), Object.hasOwnProperty.call(e, "event") && (this._event = e.event), Object.hasOwnProperty.call(e, "event-title") && (this._eventTitle = e["event-title"]), Object.hasOwnProperty.call(e, "event-place") && (this._eventPlace = e["event-place"]), Object.hasOwnProperty.call(e, "first-reference-note-number") && (this._firstReferenceNoteNumber = e["first-reference-note-number"]), Object.hasOwnProperty.call(e, "genre") && (this._genre = e.genre), Object.hasOwnProperty.call(e, "ISBN") && (this._ISBN = e.ISBN), Object.hasOwnProperty.call(e, "ISSN") && (this._ISSN = e.ISSN), Object.hasOwnProperty.call(e, "issue") && (this._issue = e.issue), Object.hasOwnProperty.call(e, "jurisdiction") && (this._jurisdiction = e.jurisdiction), Object.hasOwnProperty.call(e, "keyword") && (this._keyword = e.keyword), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "medium") && (this._medium = e.medium), Object.hasOwnProperty.call(e, "note") && (this._note = e.note), Object.hasOwnProperty.call(e, "number") && (this._number = e.number), Object.hasOwnProperty.call(e, "number-of-pages") && (this._numberOfPages = e["number-of-pages"]), Object.hasOwnProperty.call(e, "number-of-volumes") && (this._numberOfVolumes = e["number-of-volumes"]), Object.hasOwnProperty.call(e, "original-publisher") && (this._originalPublisher = e["original-publisher"]), Object.hasOwnProperty.call(e, "original-publisher-place") && (this._originalPublisherPlace = e["original-publisher-place"]), Object.hasOwnProperty.call(e, "original-title") && (this._originalTitle = e["original-title"]), Object.hasOwnProperty.call(e, "page") && (this._page = e.page), Object.hasOwnProperty.call(e, "page-first") && (this._pageFirst = e["page-first"]), Object.hasOwnProperty.call(e, "part") && (this._part = e.part), Object.hasOwnProperty.call(e, "part-title") && (this._partTitle = e["part-title"]), Object.hasOwnProperty.call(e, "PMCID") && (this._PMCID = e.PMCID), Object.hasOwnProperty.call(e, "PMID") && (this._PMID = e.PMID), Object.hasOwnProperty.call(e, "printing") && (this._printing = e.printing), Object.hasOwnProperty.call(e, "publisher") && (this._publisher = e.publisher), Object.hasOwnProperty.call(e, "publisher-place") && (this._publisherPlace = e["publisher-place"]), Object.hasOwnProperty.call(e, "references") && (this._references = e.references), Object.hasOwnProperty.call(e, "reviewed-genre") && (this._reviewedGenre = e["reviewed-genre"]), Object.hasOwnProperty.call(e, "reviewed-title") && (this._reviewedTitle = e["reviewed-title"]), Object.hasOwnProperty.call(e, "scale") && (this._scale = e.scale), Object.hasOwnProperty.call(e, "section") && (this._section = e.section), Object.hasOwnProperty.call(e, "source") && (this._source = e.source), Object.hasOwnProperty.call(e, "status") && (this._status = e.status), Object.hasOwnProperty.call(e, "title") && (this._title = e.title), Object.hasOwnProperty.call(e, "title-short") && (this._titleShort = e["title-short"]), Object.hasOwnProperty.call(e, "URL") && (this._URL = e.URL), Object.hasOwnProperty.call(e, "version") && (this._version = e.version), Object.hasOwnProperty.call(e, "volume") && (this._volume = e.volume), Object.hasOwnProperty.call(e, "volume-title") && (this._volumeTitle = e["volume-title"]), Object.hasOwnProperty.call(e, "volume-title-short") && (this._volumeTitleShort = e["volume-title-short"]), Object.hasOwnProperty.call(e, "year-suffix") && (this._yearSuffix = e["year-suffix"]), Object.hasOwnProperty.call(e, "custom") && (this._custom = e.custom), Object.hasOwnProperty.call(e, "userID") && this._addCustomProperty("userID", e.userID), Object.hasOwnProperty.call(e, "groupID") && this._addCustomProperty("groupID", e.groupID), Object.hasOwnProperty.call(e, "creators")) {
    var t = this, i = {
      author: "_author",
      editor: "_editor",
      translator: "_translator",
      contributor: "_contributor",
      composer: "_composer",
      director: "_director",
      producer: "_producer",
      performer: "_performer",
      recipient: "_recipient",
      narrator: "_narrator",
      illustrator: "_illustrator",
      interviewer: "_author",
      interviewee: "_contributor",
      seriesEditor: "_collectionEditor",
      bookAuthor: "_containerAuthor",
      reviewedAuthor: "_reviewedAuthor",
      scriptwriter: "_scriptwriter",
      guest: "_guest",
      host: "_host",
      organizer: "_organizer",
      curator: "_curator",
      compiler: "_compiler"
    };
    e.creators.forEach(function(o) {
      var a = {};
      o.firstName && (a.given = o.firstName), o.lastName && (a.family = o.lastName), o.name && (a.literal = o.name);
      var u = i[o.creatorType || "author"] || "_author", h = t[u];
      Array.isArray(h) || (h = t._author);
      var _ = h.some(function(g) {
        return !(g.family !== a.family && (g.family || a.family) || g.given !== a.given && (g.given || a.given) || g.literal !== a.literal && (g.literal || a.literal));
      });
      _ || h.push(a);
    }, this);
  }
  if (Object.hasOwnProperty.call(e, "libraryCatalog") && (this._source = e.libraryCatalog), Object.hasOwnProperty.call(e, "place") && (this._eventPlace = e.place, this._publisherPlace = e.place), Object.hasOwnProperty.call(e, "numberOfVolumes") && (this._numberOfVolumes = e.numberOfVolumes), Object.hasOwnProperty.call(e, "callNumber") && (this._callNumber = e.callNumber), Object.hasOwnProperty.call(e, "seriesNumber") && (this._collectionNumber = e.seriesNumber), Object.hasOwnProperty.call(e, "series") && (this._collectionTitle = e.series), Object.hasOwnProperty.call(e, "bookTitle") && (this._containerTitle = e.bookTitle), Object.hasOwnProperty.call(e, "publicationTitle") && (this._containerTitle = e.publicationTitle), Object.hasOwnProperty.call(e, "proceedingsTitle") && (this._containerTitle = e.proceedingsTitle), Object.hasOwnProperty.call(e, "encyclopediaTitle") && (this._containerTitle = e.encyclopediaTitle), Object.hasOwnProperty.call(e, "dictionaryTitle") && (this._containerTitle = e.dictionaryTitle), Object.hasOwnProperty.call(e, "pages") && (this._page = e.pages), Object.hasOwnProperty.call(e, "date") && !Object.hasOwnProperty.call(e, "issued")) {
    var n = e.date;
    if (typeof n == "string" && n) {
      var s = n.replace(/\//g, "-").split("-").map(Number).filter(function(o) {
        return !isNaN(o);
      });
      s.length && (this._issued = {
        "date-parts": [s]
      });
    }
  }
  if (Object.hasOwnProperty.call(e, "url") && !Object.hasOwnProperty.call(e, "URL") && (this._URL = e.url), Object.hasOwnProperty.call(e, "numPages") && (this._numberOfPages = e.numPages), Object.hasOwnProperty.call(e, "itemType") && !Object.hasOwnProperty.call(e, "type")) {
    var r = {
      artwork: "graphic",
      audioRecording: "song",
      bill: "bill",
      blogPost: "post-weblog",
      book: "book",
      bookSection: "chapter",
      case: "legal_case",
      computerProgram: "software",
      conferencePaper: "paper-conference",
      dictionaryEntry: "entry-dictionary",
      document: "document",
      email: "personal_communication",
      encyclopediaEntry: "entry-encyclopedia",
      film: "motion_picture",
      forumPost: "post",
      hearing: "hearing",
      instantMessage: "personal_communication",
      interview: "interview",
      journalArticle: "article-journal",
      letter: "personal_communication",
      magazineArticle: "article-magazine",
      manuscript: "manuscript",
      map: "map",
      newspaperArticle: "article-newspaper",
      patent: "patent",
      podcast: "song",
      presentation: "speech",
      radioBroadcast: "broadcast",
      report: "report",
      statute: "legislation",
      thesis: "thesis",
      tvBroadcast: "broadcast",
      videoRecording: "motion_picture",
      webpage: "webpage"
    };
    this._type = r[e.itemType] || e.itemType;
  }
  Object.hasOwnProperty.call(e, "extra") && (this._note = e.extra), Object.hasOwnProperty.call(e, "rights") && (this._license = e.rights), Object.hasOwnProperty.call(e, "archiveLocation") && (this._archiveLocation = e.archiveLocation), Object.hasOwnProperty.call(e, "abstractNote") && (this._abstract = e.abstractNote);
};
v.prototype.getTitle = function() {
  return this._title;
};
v.prototype.getType = function() {
  return this._type;
};
v.prototype.setType = function(e) {
  return this._type = e, this;
};
v.prototype.setCitationKey = function(e) {
  return this._citationKey = e, this;
};
v.prototype.setCategories = function(e) {
  return this._categories = e, this;
};
v.prototype.setLanguage = function(e) {
  return this._language = e, this;
};
v.prototype.setJournalAbbreviation = function(e) {
  return this._journalAbbreviation = e, this;
};
v.prototype.setShortTitle = function(e) {
  return this._shortTitle = e, this;
};
v.prototype.setAuthor = function(e) {
  return this._author = Array.isArray(e) ? e : [e], this;
};
v.prototype.setChair = function(e) {
  return this._chair = Array.isArray(e) ? e : [e], this;
};
v.prototype.setCollectionEditor = function(e) {
  return this._collectionEditor = Array.isArray(e) ? e : [e], this;
};
v.prototype.setCompiler = function(e) {
  return this._compiler = Array.isArray(e) ? e : [e], this;
};
v.prototype.setComposer = function(e) {
  return this._composer = Array.isArray(e) ? e : [e], this;
};
v.prototype.setContainerAuthor = function(e) {
  return this._containerAuthor = Array.isArray(e) ? e : [e], this;
};
v.prototype.setContributor = function(e) {
  return this._contributor = Array.isArray(e) ? e : [e], this;
};
v.prototype.setCurator = function(e) {
  return this._curator = Array.isArray(e) ? e : [e], this;
};
v.prototype.setDirector = function(e) {
  return this._director = Array.isArray(e) ? e : [e], this;
};
v.prototype.setEditor = function(e) {
  return this._editor = Array.isArray(e) ? e : [e], this;
};
v.prototype.setEditorialDirector = function(e) {
  return this._editorialDirector = Array.isArray(e) ? e : [e], this;
};
v.prototype.setExecutiveProducer = function(e) {
  return this._executiveProducer = Array.isArray(e) ? e : [e], this;
};
v.prototype.setGuest = function(e) {
  return this._guest = Array.isArray(e) ? e : [e], this;
};
v.prototype.setHost = function(e) {
  return this._host = Array.isArray(e) ? e : [e], this;
};
v.prototype.setIllustrator = function(e) {
  return this._illustrator = Array.isArray(e) ? e : [e], this;
};
v.prototype.setNarrator = function(e) {
  return this._narrator = Array.isArray(e) ? e : [e], this;
};
v.prototype.setOrganizer = function(e) {
  return this._organizer = Array.isArray(e) ? e : [e], this;
};
v.prototype.setOriginalAuthor = function(e) {
  return this._originalAuthor = Array.isArray(e) ? e : [e], this;
};
v.prototype.setPerformer = function(e) {
  return this._performer = Array.isArray(e) ? e : [e], this;
};
v.prototype.setProducer = function(e) {
  return this._producer = Array.isArray(e) ? e : [e], this;
};
v.prototype.setRecipient = function(e) {
  return this._recipient = Array.isArray(e) ? e : [e], this;
};
v.prototype.setReviewedAuthor = function(e) {
  return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
};
v.prototype.setScriptwriter = function(e) {
  return this._scriptwriter = Array.isArray(e) ? e : [e], this;
};
v.prototype.setSeriesCreator = function(e) {
  return this._seriesCreator = Array.isArray(e) ? e : [e], this;
};
v.prototype.setTranslator = function(e) {
  return this._translator = Array.isArray(e) ? e : [e], this;
};
v.prototype.setAccessed = function(e) {
  return this._accessed = e || {}, this;
};
v.prototype.setContainer = function(e) {
  return this._container = e || {}, this;
};
v.prototype.setEventDate = function(e) {
  return this._eventDate = e || {}, this;
};
v.prototype.setIssued = function(e) {
  return this._issued = e || {}, this;
};
v.prototype.setOriginalDate = function(e) {
  return this._originalDate = e || {}, this;
};
v.prototype.setSubmitted = function(e) {
  return this._submitted = e || {}, this;
};
v.prototype.setAbstract = function(e) {
  return this._abstract = e, this;
};
v.prototype.setAnnote = function(e) {
  return this._annote = e, this;
};
v.prototype.setArchive = function(e) {
  return this._archive = e, this;
};
v.prototype.setArchiveCollection = function(e) {
  return this._archiveCollection = e, this;
};
v.prototype.setArchiveLocation = function(e) {
  return this._archiveLocation = e, this;
};
v.prototype.setArchivePlace = function(e) {
  return this._archivePlace = e, this;
};
v.prototype.setAuthority = function(e) {
  return this._authority = e, this;
};
v.prototype.setCallNumber = function(e) {
  return this._callNumber = e, this;
};
v.prototype.setChapterNumber = function(e) {
  return this._chapterNumber = e, this;
};
v.prototype.setCitationNumber = function(e) {
  return this._citationNumber = e, this;
};
v.prototype.setCitationLabel = function(e) {
  return this._citationLabel = e, this;
};
v.prototype.setCollectionNumber = function(e) {
  return this._collectionNumber = e, this;
};
v.prototype.setCollectionTitle = function(e) {
  return this._collectionTitle = e, this;
};
v.prototype.setContainerTitle = function(e) {
  return this._containerTitle = e, this;
};
v.prototype.setContainerTitleShort = function(e) {
  return this._containerTitleShort = e, this;
};
v.prototype.setDimensions = function(e) {
  return this._dimensions = e, this;
};
v.prototype.setDOI = function(e) {
  return this._DOI = e, this;
};
v.prototype.setEdition = function(e) {
  return this._edition = e, this;
};
v.prototype.setEvent = function(e) {
  return this._event = e, this;
};
v.prototype.setEventTitle = function(e) {
  return this._eventTitle = e, this;
};
v.prototype.setEventPlace = function(e) {
  return this._eventPlace = e, this;
};
v.prototype.setFirstReferenceNoteNumber = function(e) {
  return this._firstReferenceNoteNumber = e, this;
};
v.prototype.setGenre = function(e) {
  return this._genre = e, this;
};
v.prototype.setISBN = function(e) {
  return this._ISBN = e, this;
};
v.prototype.setISSN = function(e) {
  return this._ISSN = e, this;
};
v.prototype.setIssue = function(e) {
  return this._issue = e, this;
};
v.prototype.setJurisdiction = function(e) {
  return this._jurisdiction = e, this;
};
v.prototype.setKeyword = function(e) {
  return this._keyword = e, this;
};
v.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
v.prototype.setMedium = function(e) {
  return this._medium = e, this;
};
v.prototype.setNote = function(e) {
  return this._note = e, this;
};
v.prototype.setNumber = function(e) {
  return this._number = e, this;
};
v.prototype.setNumberOfPages = function(e) {
  return this._numberOfPages = e, this;
};
v.prototype.setNumberOfVolumes = function(e) {
  return this._numberOfVolumes = e, this;
};
v.prototype.setOriginalPublisher = function(e) {
  return this._originalPublisher = e, this;
};
v.prototype.setOriginalPublisherPlace = function(e) {
  return this._originalPublisherPlace = e, this;
};
v.prototype.setOriginalTitle = function(e) {
  return this._originalTitle = e, this;
};
v.prototype.setPage = function(e) {
  return this._page = e, this;
};
v.prototype.setPageFirst = function(e) {
  return this._pageFirst = e, this;
};
v.prototype.setPart = function(e) {
  return this._part = e, this;
};
v.prototype.setPartTitle = function(e) {
  return this._partTitle = e, this;
};
v.prototype.setPMCID = function(e) {
  return this._PMCID = e, this;
};
v.prototype.setPMID = function(e) {
  return this._PMID = e, this;
};
v.prototype.setPrinting = function(e) {
  return this._printing = e, this;
};
v.prototype.setPublisher = function(e) {
  return this._publisher = e, this;
};
v.prototype.setPublisherPlace = function(e) {
  return this._publisherPlace = e, this;
};
v.prototype.setReferences = function(e) {
  return this._references = e, this;
};
v.prototype.setReviewedGenre = function(e) {
  return this._reviewedGenre = e, this;
};
v.prototype.setReviewedTitle = function(e) {
  return this._reviewedTitle = e, this;
};
v.prototype.setScale = function(e) {
  return this._scale = e, this;
};
v.prototype.setSection = function(e) {
  return this._section = e, this;
};
v.prototype.setSource = function(e) {
  return this._source = e, this;
};
v.prototype.setStatus = function(e) {
  return this._status = e, this;
};
v.prototype.setTitle = function(e) {
  return this._title = e, this;
};
v.prototype.setTitleShort = function(e) {
  return this._titleShort = e, this;
};
v.prototype.setURL = function(e) {
  return this._URL = e, this;
};
v.prototype.setVersion = function(e) {
  return this._version = e, this;
};
v.prototype.setVolume = function(e) {
  return this._volume = e, this;
};
v.prototype.setVolumeTitle = function(e) {
  return this._volumeTitle = e, this;
};
v.prototype.setVolumeTitleShort = function(e) {
  return this._volumeTitleShort = e, this;
};
v.prototype.setYearSuffix = function(e) {
  return this._yearSuffix = e, this;
};
v.prototype.setCustom = function(e) {
  return this._custom = Object.assign(this._custom, e), this;
};
v.prototype.toJSON = function(e) {
  var t = {};
  if (t.id = this._id, this._type !== void 0 && this._type !== "" && (t.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), this._language !== void 0 && this._language !== "" && (t.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (t.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (t.shortTitle = this._shortTitle, this._titleShort === void 0 && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (t.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (t.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (t.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (t.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (t.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (t["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (t.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (t["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (t["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (t["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (t["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (t["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (t["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (t["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (t["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (t.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (t.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (t.edition = this._edition), this._event !== void 0 && this._event !== "" && (t.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (t["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (t["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (t.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (t.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (t.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (t.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (t.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (t.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (t.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (t.medium = this._medium), this._note !== void 0 && this._note !== "" && (t.note = this._note), this._number !== void 0 && this._number !== "" && (t.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (t["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (t["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (t["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (t["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (t["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (t.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (t["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (t.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (t["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (t.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (t.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (t.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (t.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (t["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (t.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (t["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (t["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (t.scale = this._scale), this._section !== void 0 && this._section !== "" && (t.section = this._section), this._source !== void 0 && this._source !== "" && (t.source = this._source), this._status !== void 0 && this._status !== "" && (t.status = this._status), this._title !== void 0 && this._title !== "" && (t.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (t["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (t.URL = this._URL), this._version !== void 0 && this._version !== "" && (t.version = this._version), this._volume !== void 0 && this._volume !== "" && (t.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (t["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (t["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (t["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0) {
    var i = this._custom, {
      userID: n,
      groupID: s
    } = i, r = Ni(i, xn);
    Object.keys(r).length > 0 && (t.custom = r);
  }
  return this._license !== void 0 && this._license !== "" && (t.license = this._license), t;
};
function ie(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItem: id is required");
  this.id = e, this._itemData = new v(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
ie.prototype.fillFromObject = function(e) {
  var t = this;
  Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(i) {
    t.addUri(i);
  }, this);
};
ie.prototype.replaceItemDataFromCsl = function(e) {
  var t = this._itemData;
  this._itemData = new v(this.id);
  var i = t.getCustomProperty("userID"), n = t.getCustomProperty("groupID");
  i !== null && this._itemData._addCustomProperty("userID", i), n !== null && this._itemData._addCustomProperty("groupID", n), this._itemData.fillFromObject(e);
};
ie.prototype.getInfoForCitationCluster = function() {
  var e = {
    id: this.id,
    "suppress-author": this._suppressAuthor
  };
  return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
};
ie.prototype.getItemData = function() {
  return this._itemData;
};
ie.prototype.getProperty = function(e) {
  return this._itemData.getCustomProperty(e) !== null ? this._itemData.getCustomProperty(e) : null;
};
ie.prototype.setPrefix = function(e) {
  return this._prefix = e, this;
};
ie.prototype.setSuffix = function(e) {
  return this._suffix = e, this;
};
ie.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
ie.prototype.setLabel = function(e) {
  if (e) {
    var t = ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"];
    if (t.indexOf(e) === -1)
      throw new Error('CitationItem.setLocator: Invalid label "' + e + '"');
    this._label = e;
  }
  return this;
};
ie.prototype.setSuppressAuthor = function(e) {
  return this._suppressAuthor = e, this;
};
ie.prototype.setAuthorOnly = function(e) {
  return this._authorOnly = e, this;
};
ie.prototype.addUri = function(e) {
  return this._uris.indexOf(e) !== -1 ? this : (this._uris.push(e), this);
};
ie.prototype.toJSON = function(e) {
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
ie.prototype.toFlatJSON = function(e) {
  var t = {
    id: this.id,
    index: e
  };
  this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(t, i), typeof this._itemData.getCustomProperty("userID") < "u" && this._itemData.getCustomProperty("userID") !== null && (t.userID = String(this._itemData.getCustomProperty("userID"))), typeof this._itemData.getCustomProperty("groupID") < "u" && this._itemData.getCustomProperty("groupID") !== null && (t.groupID = String(this._itemData.getCustomProperty("groupID"))), t;
};
var In = ["index"], ee = /* @__PURE__ */ new WeakSet();
class jt {
  /** @param {string} [citationID] */
  constructor(t) {
    we(this, ee), t || (t = c(ee, this, Li).call(this)), Vt._.has(t) && (console.warn("Citation ID must be unique"), t = c(ee, this, Li).call(this)), Vt._.add(t), this.citationID = t, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://github.com/citation-style-language/schema/raw/master/csl-citation.json";
  }
  static resetUsedIDs() {
    Vt._ = /* @__PURE__ */ new Set();
  }
  /**
   * @param {any} citationObject
   * @returns
   */
  fillFromObject(t) {
    return Object.hasOwnProperty.call(t, "properties") || Object.hasOwnProperty.call(t, "manualOverride") || Object.hasOwnProperty.call(t, "schema") ? c(ee, this, An).call(this, t) : Object.hasOwnProperty.call(t, "citationItems") ? c(ee, this, kn).call(this, t) : Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? c(ee, this, Ln).call(this, t) : c(ee, this, Bi).call(this, t);
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
    return c(ee, this, et).call(this, {
      dontUpdate: !0
    }), this;
  }
  /**
   * @param {number} noteIndex
   * @returns {CSLCitation}
   */
  setNoteIndex(t) {
    return c(ee, this, et).call(this, {
      noteIndex: t
    }), this;
  }
  /**
   * @param {string} plainCitation
   * @returns
   */
  setPlainCitation(t) {
    return c(ee, this, et).call(this, {
      plainCitation: t
    }), this;
  }
  /**
   * @param {string} formattedCitation
   * @returns
   */
  setFormattedCitation(t) {
    return c(ee, this, et).call(this, {
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
      } = i, s = Ni(i, In);
      Object.keys(s).length > 0 && (t.properties = s);
    }
    return this._manualOverride && Object.keys(this._manualOverride).length > 0 && (t.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (t.citationItems = this._citationItems.map(function(r) {
      return r.toJSON();
    })), t;
  }
}
function An(e) {
  var t = this;
  if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && c(ee, this, et).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems"))
    return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(n) {
    return n.id;
  });
  return e.citationItems.forEach(function(n) {
    var s = n.id, r;
    i.indexOf(s) >= 0 ? r = t._citationItems[i.indexOf(s)] : (r = new ie(s), i.push(s)), typeof s == "number" && (s = c(ee, t, En).call(t, n)), r.fillFromObject(n), c(ee, t, ri).call(t, r);
  }, this), i.length;
}
function kn(e) {
  var t = this;
  return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(i) {
    c(ee, t, Bi).call(t, i);
  }, this), 1);
}
function Bi(e) {
  var t = e.id, i, n = this._citationItems.map(function(s) {
    return s.id;
  });
  return n.indexOf(t) >= 0 ? i = this._citationItems[n.indexOf(t)] : i = new ie(t), i.fillFromObject(e), c(ee, this, ri).call(this, i), 1;
}
function Ln(e) {
  if (!Object.hasOwnProperty.call(e, "data"))
    return console.error("Invalid citation object"), 0;
  var t = this._citationItems.map(function(s) {
    return s.id;
  }), i = e.data.key, n;
  return t.indexOf(i) >= 0 ? n = this._citationItems[t.indexOf(i)] : n = new ie(i), n.fillFromObject(e), c(ee, this, ri).call(this, n), 1;
}
function ri(e) {
  var t = this._citationItems.map(function(i) {
    return i.id;
  });
  return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
}
function et(e) {
  var t = this;
  return Object.keys(e).forEach(function(i) {
    Object.hasOwnProperty.call(e, i) && (t._properties[i] = e[i]);
  }, this), this;
}
function En(e) {
  if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
    var t = e.uris[0].lastIndexOf("/");
    return e.uris[0].slice(t + 1);
  }
  return e.id;
}
function Li() {
  return Math.random().toString(36).substring(2, 15);
}
var Vt = {
  _: /* @__PURE__ */ new Set()
}, z = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakSet();
class Pn {
  constructor() {
    we(this, Ae), B(this, z, void 0), B(this, mt, void 0), B(this, ot, void 0), B(this, bt, void 0), A(z, this, new window.Asc.PluginWindow()), A(mt, this, window.Asc.plugin.button), A(ot, this, Asc.plugin.onThemeChanged), A(bt, this, Asc.plugin.onTranslate);
  }
  /**
   * @param {string} description
   * @param {string} text
   */
  show(t, i) {
    A(z, this, new window.Asc.PluginWindow());
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
    return c(Ae, this, Kt).call(this, n, i, "default"), l(z, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = (o, a) => {
        s(o === 0), c(Ae, this, ft).call(this);
      };
    });
  }
  /**
   * @param {any} content
   */
  showEditWindow(t) {
    var i = this;
    A(z, this, new window.Asc.PluginWindow());
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
    return c(Ae, this, Kt).call(this, n, t, "default"), l(z, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = /* @__PURE__ */ (function() {
        var o = k(function* (a, u) {
          var h = yield new Promise((_) => {
            if (!l(z, i)) {
              _(null);
              return;
            }
            l(z, i).attachEvent("onSaveFields", _), l(z, i).command("onClickSave");
          });
          s(a === 0 ? h : null), c(Ae, i, ft).call(i);
        });
        return function(a, u) {
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
    typeof n != "string" && (n = "warning"), A(z, this, new window.Asc.PluginWindow());
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
    return c(Ae, this, Kt).call(this, s, window.Asc.plugin.tr(i), n), l(z, this).show(s), new Promise((r, o) => {
      window.Asc.plugin.button = (a, u) => {
        r(a === 0), c(Ae, this, ft).call(this);
      };
    });
  }
  destroy() {
    c(Ae, this, ft).call(this), A(z, this, null);
  }
}
function Kt(e, t, i) {
  l(z, this) && (A(mt, this, window.Asc.plugin.button), A(ot, this, Asc.plugin.onThemeChanged), A(bt, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (n) => {
    var s;
    (s = l(z, this)) === null || s === void 0 || s.command("onThemeChanged", n), l(ot, this).call(this, n);
  }, window.Asc.plugin.onTranslate = () => {
    var n;
    (n = l(z, this)) === null || n === void 0 || n.command("onTranslate"), l(bt, this).call(this);
  }, l(z, this).attachEvent("onWindowReady", () => {
    if (i === "warning") {
      var n;
      (n = l(z, this)) === null || n === void 0 || n.command("onWarning", t);
    } else if (i === "success") {
      var s;
      (s = l(z, this)) === null || s === void 0 || s.command("onSuccess", t);
    } else {
      var r;
      (r = l(z, this)) === null || r === void 0 || r.command("onAttachedContent", t);
    }
  }), l(z, this).attachEvent("onUpdateHeight", (n) => {
    var s;
    Asc.plugin.executeMethod("ResizeWindow", [(s = l(z, this)) === null || s === void 0 ? void 0 : s.id, [e.size[0] - 2, n]], () => {
    });
  }));
}
function ft() {
  l(z, this) && l(z, this).close(), window.Asc.plugin.button = l(mt, this), window.Asc.plugin.onThemeChanged = l(ot, this);
}
var Be = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakSet();
class On {
  /**
   * @param {LocalesManager} localesManager
   * @param {CslStylesManager} cslStylesManager
   * @param {ZoteroSdk} sdk
   */
  constructor(t, i, n) {
    we(this, I), B(this, Be, void 0), B(this, $t, /* @__PURE__ */ new Map()), B(this, wt, null), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = t, this._cslStylesManager = i, this._storage = new Sn(), this._formatter, this.citationDocService = new yn(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), A(Be, this, new Pn());
  }
  /** @returns {Promise<AddinFieldData | null>} */
  getCurrentField() {
    var t = this;
    return k(function* () {
      return t.citationDocService.getCurrentField();
    })();
  }
  /**
   * @returns {Promise<boolean>}
   */
  saveAsText() {
    var t = this;
    return k(function* () {
      var i = yield t.citationDocService.saveAsText();
      return i && l(Be, t).showInfoWindow("Success!", "All active Mendeley citations and Bibliography have been replaced.", "success"), i;
    })();
  }
  /**
   * @param {Array<SearchResultItem>} items
   * @returns {Promise<boolean>}
   */
  insertSelectedCitations(t) {
    var i = this;
    return k(function* () {
      var n = i;
      try {
        yield c(I, i, me).call(i), yield c(I, i, ye).call(i);
      } catch (a) {
        throw a;
      }
      var s = new jt("");
      for (var r in t) {
        var o = t[r];
        s.fillFromObject(o);
      }
      return c(I, i, Bn).call(i, t).then((a) => (a.forEach(function(u) {
        s.fillFromObject(u);
      }), i._storage.addCslCitation(s), c(I, n, Rn).call(n, s)));
    })();
  }
  /** @returns {Promise<string>} */
  insertBibliography() {
    var t = this;
    return k(function* () {
      try {
        var {
          fieldsWithCitations: i,
          bibFieldValue: n,
          bibField: s
        } = yield c(I, t, me).call(t), r = i.length === 0;
        if (yield c(I, t, ye).call(t), s) {
          var o = [yield c(I, t, Ke).call(t, r, s)];
          return t.citationDocService.updateAddinFields(o).then((a) => a ? a[0] : "");
        } else
          return c(I, t, Un).call(t, r, n);
      } catch (a) {
        throw a;
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
    return k(function* () {
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
    return k(function* () {
      return n.citationDocService.moveCursorOutsideField(t, i);
    })();
  }
  /**
   * @returns {Promise<void>}
   */
  moveCursorRight() {
    var t = this;
    return k(function* () {
      return t.citationDocService.moveCursorRight();
    })();
  }
  /**
   * @param {boolean} [bHardRefresh]
   * @param {{skipCitations?: boolean, skipBibliography?: boolean}} [skipOptions]
   * @returns {Promise<void>}
   */
  updateCslItems(t, i) {
    var n = this;
    return k(function* () {
      try {
        var {
          fieldsWithCitations: s,
          bibField: r
        } = yield c(I, n, me).call(n), o = s.length === 0;
        yield c(I, n, ye).call(n);
        var a = [];
        if (typeof t > "u") {
          var u = n._cslStylesManager.getLastUsedFormat();
          u === "numeric" && (t = !0);
        }
        var h = !!(i && i.skipCitations), _ = !!(i && i.skipBibliography);
        if (!h && typeof t == "boolean" && (a = yield c(I, n, Re).call(n, s, t)), !_ && r && a.push(yield c(I, n, Ke).call(n, o, r)), a && a.length)
          return n.citationDocService.updateAddinFields(a);
      } catch (g) {
        throw g;
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
    return k(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(I, i, me).call(i), r = n.length === 0;
        yield c(I, i, ye).call(i);
        var o = yield c(I, i, Re).call(i, n, !1);
        if (o && o.length && (yield i.citationDocService.convertNotesStyle(o, t)), s) {
          var a = [yield c(I, i, Ke).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(a);
        }
      } catch (u) {
        throw u;
      }
    })();
  }
  /**
   * Fetches fresh data from Zotero and recomputes formatted citations, without
   * touching the document. Kept separate from `applyRefreshCslItems` so callers
   * can avoid holding a document-wide edit lock for the (potentially slow)
   * network round-trip.
   * @param {{skipCitations?: boolean, skipBibliography?: boolean}} [skipOptions]
   * @param {RefreshProgressCallback} [onProgress]
   * @returns {Promise<AddinFieldData[]>}
   */
  prepareRefreshCslItems(t, i) {
    var n = this;
    return k(function* () {
      var {
        fieldsWithCitations: s,
        bibField: r
      } = yield c(I, n, me).call(n), o = s.length === 0;
      yield c(I, n, ye).call(n, {
        refreshItems: !0,
        onProgress: i
      });
      var a = [], u = !!(t && t.skipCitations), h = !!(t && t.skipBibliography);
      return u || (a = yield c(I, n, Re).call(n, s, !1, !1, i)), !h && r && a.push(yield c(I, n, Ke).call(n, o, r)), a;
    })();
  }
  /**
   * @param {AddinFieldData[]} updatedFields
   * @returns {Promise<string[] | void>}
   */
  applyRefreshCslItems(t) {
    var i = this;
    return k(function* () {
      if (t && t.length)
        return i.citationDocService.updateAddinFields(t);
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} notesStyle
   * @param {RefreshProgressCallback} [onProgress]
   * @returns {Promise<{updatedFields: AddinFieldData[], bibFields: AddinFieldData[], notesStyle: "footnotes" | "endnotes"}>}
   */
  prepareRefreshCslItemsInNotes(t, i) {
    var n = this;
    return k(function* () {
      var {
        fieldsWithCitations: s,
        bibField: r
      } = yield c(I, n, me).call(n), o = s.length === 0;
      yield c(I, n, ye).call(n, {
        refreshItems: !0,
        onProgress: i
      });
      var a = yield c(I, n, Re).call(n, s, !1, !1, i), u = r ? [yield c(I, n, Ke).call(n, o, r)] : [];
      return {
        updatedFields: a,
        bibFields: u,
        notesStyle: t
      };
    })();
  }
  /**
   * @param {{updatedFields: AddinFieldData[], bibFields: AddinFieldData[], notesStyle: "footnotes" | "endnotes"}} prepared
   * @returns {Promise<void>}
   */
  applyRefreshCslItemsInNotes(t) {
    var i = this;
    return k(function* () {
      var {
        updatedFields: n,
        bibFields: s,
        notesStyle: r
      } = t;
      n && n.length && (yield i.citationDocService.convertNotesStyle(n, r)), s && s.length && (yield i.citationDocService.updateAddinFields(s));
    })();
  }
  /**
   * @param {Object & {citationID: string}} updatedField
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  updateItem(t, i) {
    var n = this;
    return k(function* () {
      try {
        var {
          fieldsWithCitations: s,
          bibField: r
        } = yield c(I, n, me).call(n, t), o = s.length === 0;
        yield c(I, n, ye).call(n);
        var a = yield c(I, n, Re).call(n, s, !0);
        if (i && a && a.length)
          return n.citationDocService.updateAddinFieldsInNotes(a);
        if (a && a.length)
          return n.citationDocService.updateAddinFields(a);
      } catch (u) {
        throw u;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  switchingBetweenNotesAndText(t) {
    var i = this;
    return k(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(I, i, me).call(i), r = n.length === 0;
        yield c(I, i, ye).call(i);
        var o = yield c(I, i, Re).call(i, n, !0);
        if (o && o.length && (t ? yield i.citationDocService.convertTextToNotes(o, t) : yield i.citationDocService.convertNotesToText(o)), s) {
          var a = [yield c(I, i, Ke).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(a);
        }
      } catch (u) {
        throw u;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  convertNotesStyle(t) {
    var i = this;
    return k(function* () {
      try {
        var {
          fieldsWithCitations: n
        } = yield c(I, i, me).call(i);
        yield c(I, i, ye).call(i);
        var s = yield c(I, i, Re).call(i, n, !1, !0);
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
    return k(function* () {
      if (!t) return null;
      var n = c(I, i, ii).call(i, t), s = yield l(Be, i).showEditWindow(n);
      return s || null;
    })();
  }
  /** @param {string} message */
  showWarningMessage(t) {
    var i = this;
    return k(function* () {
      l(Be, i).showInfoWindow("Warning!", t);
    })();
  }
}
function Ui() {
  var e = this._cslStylesManager.getLastUsedStyleIdOrDefault(), t = this._cslStylesManager.cached(e);
  return typeof t != "string" || t === "" ? !0 : /\bvariable\s*=\s*"[^"]*\babstract\b[^"]*"/.test(t);
}
function Tn(e) {
  !e || !Array.isArray(e.citationItems) || e.citationItems.forEach(function(t) {
    t && t.itemData && Object.hasOwnProperty.call(t.itemData, "abstract") && delete t.itemData.abstract;
  });
}
function Hi(e) {
  var t = e.toJSON();
  return c(I, this, Ui).call(this) || c(I, this, Tn).call(this, t), t;
}
function Nn(e, t) {
  var i = e.getProperty("userID"), n = e.getProperty("groupID");
  if (i)
    return {
      id: t,
      fetchKey: t,
      userID: i
    };
  if (n)
    return {
      id: t,
      fetchKey: t,
      groupID: n
    };
  var s = e.toJSON();
  if (!Array.isArray(s.uris))
    return null;
  for (var r = null, o = 0; o < s.uris.length; o++) {
    var a = s.uris[o], u = null, h = a.match(/zotero\.org\/(users|groups)\/(\d+)\/items\/([^/?#]+)/i), _ = a.match(/zotero\.org\/users\/local\/[^/]+\/items\/([^/?#]+)/i);
    if (h ? u = h[1] === "users" ? {
      id: t,
      fetchKey: h[3],
      userID: h[2]
    } : {
      id: t,
      fetchKey: h[3],
      groupID: h[2]
    } : _ && (u = {
      id: t,
      fetchKey: _[1],
      userID: "local"
    }), !!u) {
      if (u.fetchKey === t)
        return u;
      r || (r = u);
    }
  }
  return r;
}
function Vi(e, t, i) {
  return Xt.apply(this, arguments);
}
function Xt() {
  return Xt = k(function* (e, t, i) {
    var n = [], s = [];
    this._storage.forEachItem((_, g) => {
      if (e(_, g)) {
        var y = c(I, this, Nn).call(this, _, g);
        y ? n.push(y) : s.push(g);
      }
    });
    var r = n.length + s.length;
    if (r !== 0) {
      var o = 0, a = () => {
        o++, i && i({
          phase: "fetch",
          completed: o,
          total: r
        });
      }, u = n.map((_) => {
        var g = _.groupID ? this._sdk.getGroupItemByKey(_.groupID, _.fetchKey, t || "json") : this._sdk.getItemByKey(_.fetchKey, t || "json");
        return g.then((y) => {
          var w = c(I, this, oi).call(this, y);
          if (w.length !== 1) {
            console.warn("Zotero returned " + w.length + " items for key " + _.fetchKey);
            return;
          }
          var E = this._storage.getItem(_.id);
          E && ((t || "json") === "csljson" ? E.replaceItemDataFromCsl(w[0]) : E.fillFromObject(w[0]));
        }).catch((y) => {
          console.warn("Failed to refresh item " + _.id + " (Zotero key " + _.fetchKey + "):", y);
        }).finally(a);
      }), h = s.map((_) => c(I, this, Mn).call(this, _).catch((g) => {
        console.warn("Failed to re-link item " + _ + ":", g);
      }).finally(a));
      yield Promise.all(u.concat(h));
    }
  }), Xt.apply(this, arguments);
}
function oi(e) {
  var t = e && e.items;
  return Array.isArray(t) ? t : t ? [t] : [];
}
function Mn(e) {
  return Qt.apply(this, arguments);
}
function Qt() {
  return Qt = k(function* (e) {
    var t = yield this._sdk.searchUserItemsEverything(e), i = t && t.items || [];
    for (var n of i) {
      var s = n.key || n.data && n.data.key;
      if (s) {
        var r = yield this._sdk.getItemByKey(s, "csljson"), o = c(I, this, oi).call(this, r)[0];
        if (o && !(o["citation-key"] !== e && o.id !== e)) {
          var a = this._storage.getItem(e);
          if (!a)
            return;
          a.replaceItemDataFromCsl(o);
          var u = n.library;
          if (u && u.id !== void 0 && u.id !== null) {
            var h = u.type === "group" ? "groups" : "users";
            a.addUri("http://zotero.org/" + h + "/" + u.id + "/items/" + s);
          }
          return;
        }
      }
    }
    console.warn("Could not locate item " + e + " in the Zotero library; it will not be refreshed.");
  }), Qt.apply(this, arguments);
}
function Fn() {
  return ei.apply(this, arguments);
}
function ei() {
  return ei = k(function* () {
    c(I, this, Ui).call(this) && (yield c(I, this, Vi).call(this, (e, t) => {
      var i = e.toFlatJSON(this._storage.getItemIndex(t));
      return !(Object.hasOwnProperty.call(i, "abstract") && i.abstract !== "");
    }, "json"));
  }), ei.apply(this, arguments);
}
function ye(e) {
  return ti.apply(this, arguments);
}
function ti() {
  return ti = k(function* (e) {
    var t = !!(e && e.refreshItems);
    t ? (yield c(I, this, Vi).call(this, () => !0, "csljson", e && e.onProgress), A(wt, this, null)) : yield c(I, this, Fn).call(this), c(I, this, Hn).call(this);
  }), ti.apply(this, arguments);
}
function Rn(e) {
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
    var n = document.createDocumentFragment(), s = document.createElement("div"), r = t._storage.getCitationsPre(e.citationID), o = t._storage.getCitationsPost(e.citationID), a = t._storage.getAllCitationsInJson();
    t._formatter.rebuildProcessorState(a);
    var u = t._formatter.processCitationCluster(e.toJSON(), r, o), h = c(I, t, ai).call(t, u[1][0][1]);
    n.appendChild(s), s.innerHTML = h, e.setPlainCitation(s.innerText), e.setFormattedCitation(h);
    var _ = null;
    t._cslStylesManager.getLastUsedFormat() === "note" && (_ = t._cslStylesManager.getLastUsedNotesStyle());
    var g = c(I, t, Hi).call(t, e);
    return t.citationDocService.addCitation(h, JSON.stringify(g), _);
  });
}
function Bn(e, t) {
  t = t || "json";
  var i = [];
  for (var n in e) {
    var s = e[n], r = s.groupID, o = s.userID, a = null;
    r ? a = this._sdk.getGroupItemByKey(r, s.id, t) : (o || o === 0 || o === "0") && (a = this._sdk.getItemByKey(s.id, t)), a && i.push(a.then((u) => {
      var h = c(I, this, oi).call(this, u);
      return h[0] || null;
    }));
  }
  return Promise.all(i).then(function(u) {
    return u.filter(function(h) {
      return h !== null;
    });
  });
}
function Ki() {
  try {
    for (var e = new Array(this._storage.size), t = this._formatter.makeBibliography(), i = 0; i < t[1].length; i++) {
      var n = c(I, this, ai).call(this, t[1][i]);
      n = n.replaceAll(`
`, "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
      var s = '<div class="csl-entry">', r = "</div>";
      t[0]["second-field-align"] ? n.indexOf(s) === 0 && n.endsWith(r) && (n = s + n.substring(s.length, n.length - r.length).trim() + r) : (n = n.replace(/<\/?div[^>]*>/g, ""), n = "<p>" + n + "</p>"), window.Asc.scope.editorVersion < 9004e3 && (n += `
`), e.push(n);
    }
    var o = e.join("").trim();
    return Asc.scope.bibStyle = t[0], o;
  } catch (a) {
    if (this._cslStylesManager.isLastUsedStyleContainBibliography() === !1)
      l(Be, this).showInfoWindow("Warning!", "Style does not describe the bibliography");
    else
      throw console.error(a), "Failed to apply this style.";
    return "";
  }
}
function ii(e) {
  var t, i = e.Value.indexOf("{"), n = e.Value.lastIndexOf("}");
  if (i !== -1) {
    var s = e.Value.slice(i, n + 1);
    t = JSON.parse(s);
  }
  return t;
}
function me(e) {
  var t = this;
  return this._storage.clear(), jt.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
    var n = 0, s = " ", r = i.find(function(h) {
      return h.Value.indexOf(t._bibPrefixNew) !== -1 || h.Value.indexOf(t._bibPrefix) !== -1;
    });
    if (r) {
      var o = c(I, t, ii).call(t, r);
      typeof o == "object" && Object.keys(o).length > 0 && (s = JSON.stringify(o));
    }
    var a = i.filter(function(h) {
      return h.Value.indexOf(t._citPrefixNew) !== -1 || h.Value.indexOf(t._citPrefix) !== -1;
    }), u = a.map(function(h) {
      var _ = c(I, t, ii).call(t, h), g = "";
      h.Value.indexOf(t._citPrefix) === -1 && (g = _.citationID);
      var y = new jt(g);
      return e && y.citationID === e.citationID ? n += y.fillFromObject(e) : n += y.fillFromObject(_), t._storage.addCslCitation(y), {
        field: Ti({}, h),
        cslCitation: y
      };
    });
    return e && (u = u.filter(function(h) {
      return h.cslCitation.citationID === e.citationID;
    })), {
      bibField: r,
      bibFieldValue: s,
      fieldsWithCitations: u
    };
  });
}
function Un(e, t) {
  var i = c(I, this, Ki).call(this);
  if (e && (i = m(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography())
    return this.citationDocService.addBibliography(i, t);
  throw "The current bibliographic style does not describe the bibliography";
}
function Ke(e, t) {
  if (e)
    t.Content = m(this._bibPlaceholderIfEmpty);
  else {
    var i = c(I, this, Ki).call(this);
    t.Content = i;
  }
  return t;
}
function Re(e, t, i, n) {
  return ni.apply(this, arguments);
}
function ni() {
  return ni = k(function* (e, t, i, n) {
    var s = document.createDocumentFragment(), r = document.createElement("div");
    s.appendChild(r);
    for (var o = [], a = e.length, u = e.length - 1; u >= 0; u--) {
      var h = !!i, {
        field: _,
        cslCitation: g
      } = e[u], y = this._storage.getCitationsPre(g.citationID), w = this._storage.getCitationsPost(g.citationID), E = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(E);
      var T = this._formatter.processCitationCluster(g.toJSON(), y, w), L = c(I, this, ai).call(this, T[1][0][1]);
      r.innerHTML = L, g.setFormattedCitation(L);
      var b = g.getPlainCitation(), U = _.Content;
      b === "" && (b = U);
      var K = r.innerText;
      if (!g.getDoNotUpdate()) {
        if (b !== U && !t) {
          var X = "<p>" + m("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + m("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + m("Original:") + " " + K + "</p><p>" + m("Modified:") + " " + U + "</p>", G = yield l(Be, this).show("Saving custom edits", X);
          G ? (g.setDoNotUpdate(), delete _.Content) : (_.Content = L, g.setPlainCitation(K)), h = !0;
        } else
          (K !== U || b !== U || b !== K) && (h = !0), _.Content = L, g.setPlainCitation(K);
        if (g) {
          var se = this._citPrefixNew + " " + this._citSuffixNew + " " + JSON.stringify(c(I, this, Hi).call(this, g));
          _.Value !== se && (h = !0), _.Value = se;
        }
        h && o.push(_), n && n({
          phase: "apply",
          completed: a - u,
          total: a
        });
      }
    }
    return o;
  }), ni.apply(this, arguments);
}
function Ei(e) {
  var t = l($t, this).get(e);
  if (t)
    return t;
  var i = e;
  try {
    var n = new DOMParser().parseFromString(e, "application/xml").documentElement;
    n && n.nodeName !== "parsererror" && (i = n);
  } catch (s) {
    console.error("Failed to pre-parse CSL/locale XML, falling back to citeproc's slower string parser:", s);
  }
  return l($t, this).set(e, i), i;
}
function Hn() {
  var e = this, t = [];
  this._storage.forEachItem(function(o, a) {
    t.push(a);
  });
  var i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = this._localesManager.getLastUsedLanguage(), s = this._cslStylesManager.cached(i), r = i + " " + n + " " + (s ? s.length : 0);
  if (this._formatter && l(wt, this) === r) {
    t.length && this._formatter.updateItems(t);
    return;
  }
  this._formatter = new CSL.Engine({
    /** @param {string} id */
    retrieveLocale: function(a) {
      var u = e._localesManager.getLocale(a) || e._localesManager.getLocale();
      return u && c(I, e, Ei).call(e, u);
    },
    /** @param {string} id */
    retrieveItem: function(a) {
      var u = e._storage.getItem(a), h = e._storage.getItemIndex(a);
      return u ? u.toFlatJSON(h) : null;
    }
  }, s && c(I, this, Ei).call(this, s), n, !0), A(wt, this, r), t.length && this._formatter.updateItems(t);
}
function ai(e) {
  return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
class Pi {
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
        var a = o.GetRange(0, 0);
        return a ? a.GetEndPos() : r;
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
var at = {
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
    var a = s.querySelector('info link[rel="self"]');
    if (a) {
      var u = a.getAttribute("href");
      u && (r.href = u);
    }
    var h = s.querySelector('info link[rel="independent-parent"]');
    if (h) {
      var _ = h.getAttribute("href");
      _ && (r.parent = _), r.dependent = 1;
    }
    var g = s.querySelector("info updated");
    g && (r.updated = g.textContent);
    var y = s.querySelector("info category[citation-format]");
    if (y) {
      var w = y.getAttribute("citation-format");
      w && (r.categories.format = w);
    }
    var E = s.querySelectorAll("info category[field]");
    return E && E.forEach(function(T) {
      var L = T.getAttribute("field");
      L && r.categories.fields.push(L);
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
function Ve() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
Ve.prototype.getStyleNames = function() {
  var e = localStorage.getItem(this._customStyleNamesKey);
  return e ? JSON.parse(e) : [];
};
Ve.prototype._getStyles = function() {
  var e = localStorage.getItem(this._customStylesKey);
  return e ? JSON.parse(e) : [];
};
Ve.prototype.getStyle = function(e) {
  var t = this.getStyleNames(), i = t.indexOf(e);
  return i === -1 ? null : this._getStyles()[i];
};
Ve.prototype.getStylesInfo = function() {
  for (var e = this.getStyleNames(), t = this._getStyles(), i = [], n = 0; n < e.length; n++) {
    var s = at.getStyleInfo(e[n], t[n]);
    i.push(s);
  }
  return i;
};
Ve.prototype.setStyle = function(e, t) {
  var i = this.getStyleNames(), n = this._getStyles(), s = i.indexOf(e);
  return s === -1 && (s = i.length), i[s] = e, n[s] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), at.getStyleInfo(e, t);
};
Ve.prototype.deleteStyle = function(e) {
  var t = this.getStyleNames(), i = this._getStyles(), n = t.indexOf(e);
  return n === -1 || (t.splice(n, 1), i.splice(n, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), e;
};
function J(e) {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new Ve(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._cachedStylePrefix = "zoteroCachedStyle_", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
J.prototype.addCustomStyle = function(e) {
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
J.prototype.getLastUsedFormat = function() {
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
J.prototype.getLastUsedNotesStyle = function() {
  var e = localStorage.getItem(this._lastNotesStyleKey);
  return e === "footnotes" || e === "endnotes" ? e : "footnotes";
};
J.prototype.getLastUsedStyleId = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || null;
};
J.prototype.getLastUsedStyleIdOrDefault = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || "ieee";
};
J.prototype.getStyle = function(e) {
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
    else if (i._defaultStyles.indexOf(n) === -1) {
      var o = i._getCachedStyle(n);
      if (!o)
        throw "The style is not available in the local version of the plugin.";
      return o;
    }
    return fetch(r).then(function(a) {
      return a.text();
    });
  }).then(function(n) {
    if (n && !i._isValidCSL(n) && i._isOnlineAvailable) {
      var s = at.getStyleInfo(e, n);
      if (s && s.dependent > 0 && s.parent)
        return fetch(s.parent).then(function(r) {
          return r.text();
        });
    }
    return n;
  }).then(function(n) {
    var s = n && at.getCitationFormat(n) || "numeric", r = {
      content: n,
      styleFormat: s
    };
    return n && t && i._saveLastUsedStyle(e, n, s), n && i._isOnlineAvailable && i._defaultStyles.indexOf(e) === -1 && i._saveCachedStyle(e, n), r;
  });
};
J.prototype.getStylesInfo = function() {
  var e = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
    var i = e.getLastUsedStyleId() || "ieee", n = [], s = e._customStylesStorage.getStyleNames(), r = t[0], o = t[1];
    if (!e._isOnlineAvailable) {
      var a = e._getCachedStyleNames();
      r = r.filter(function(u) {
        return e._defaultStyles.indexOf(u.name) >= 0 || u.name == i || a.indexOf(u.name) >= 0;
      });
    }
    return o.forEach(function(u) {
      n.push(u), e._defaultStyles.indexOf(u.name) === -1 && e._defaultStyles.push(u.name);
    }), r.forEach(function(u) {
      s.indexOf(u.name) === -1 && n.push(u);
    }), n.sort((u, h) => u.name.localeCompare(h.name)), n;
  });
};
J.prototype._getStylesJson = function() {
  var e = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(t) {
    return t.json();
  });
};
J.prototype.cached = function(e) {
  return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
};
J.prototype.isLastUsedStyleContainBibliography = function() {
  var e = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  return e !== "false";
};
J.prototype.isStyleDefault = function(e) {
  return this._defaultStyles.indexOf(e) >= 0;
};
J.prototype._isValidCSL = function(e) {
  return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
};
J.prototype._readCSLFile = function(e) {
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
J.prototype._saveCachedStyle = function(e, t) {
  this._cache[e] = t;
  try {
    localStorage.setItem(this._cachedStylePrefix + e, t);
  } catch {
  }
};
J.prototype._getCachedStyle = function(e) {
  if (this._cache[e])
    return this._cache[e];
  var t = localStorage.getItem(this._cachedStylePrefix + e);
  return t && (this._cache[e] = t), t;
};
J.prototype._getCachedStyleNames = function() {
  for (var e = [], t = 0; t < localStorage.length; t++) {
    var i = localStorage.key(t);
    i && i.indexOf(this._cachedStylePrefix) === 0 && e.push(i.substring(this._cachedStylePrefix.length));
  }
  return e;
};
J.prototype._saveLastUsedStyle = function(e, t, i) {
  this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, i);
  var n = at.isStyleContainBibliography(t);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, n.toString());
};
J.prototype.saveLastUsedNotesStyle = function(e) {
  localStorage.setItem(this._lastNotesStyleKey, e);
};
J.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
J.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function Te() {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
Te.prototype.loadLocale = function(e) {
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
Te.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
};
Te.prototype.getLocale = function(e) {
  return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
};
Te.prototype.saveLastUsedLanguage = function(e) {
  this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
};
Te.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};
Te.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
Te.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function q(e, t, i) {
  if (this._router = e, this._displayNoneClass = t, this._sdk = i || null, this._saveBtn = new te("saveSettingsBtn", {
    variant: "primary"
  }), this._cancelBtn = new te("cancelBtn", {
    variant: "secondary"
  }), this._styleSelect = new He("styleSelectList", {
    placeholder: "Enter style name",
    sortable: !0
  }), this._styleSelectListOther = new He("styleSelectedListOther", {
    placeholder: "Enter style name",
    searchable: !0
  }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper)
    throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new vi("footNotes", {
    label: "Footnotes"
  }), this._endNotes = new vi("endNotes", {
    label: "Endnotes"
  }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput)
    throw new Error("cslFileInput not found");
  this._languageSelect = new He("styleLangList", {
    placeholder: "Select language"
  }), this._cslStylesManager = new J("zoteroStyleId"), this._localesManager = new Te(), this._selectLists = [], this._onChangeState = function(s, r) {
  }, this._styleMessage = new Pe("styleMessage", {
    type: "error"
  }), this._langMessage = new Pe("langMessage", {
    type: "error"
  }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = !1, this._connectionStatus = document.getElementById("connectionStatus"), this._switchToApiBtn = new te("switchToApiBtn", {
    variant: "secondary"
  }), this._switchToLocalBtn = new te("switchToLocalBtn", {
    variant: "secondary"
  }), this._settingsApiKeyWrapper = document.getElementById("settingsApiKeyWrapper"), this._settingsApiKeyField = new Oe("settingsApiKeyField", {
    type: "text"
  }), this._settingsSaveApiKeyBtn = new te("settingsSaveApiKeyBtn", {
    variant: "secondary"
  }), this._settingsApiKeyMessage = new Pe("settingsApiKeyMessage", {
    type: "error"
  }), this._settingsLocalMessage = new Pe("settingsLocalMessage", {
    type: "error"
  }), this._onReconnect = function() {
  }, this._desktopAvailable = !1, this._onlineAvailable = !1, this._stateSettings = {
    style: "",
    notesStyle: "footnotes",
    styleFormat: "numeric"
  }, this._autoUpdateCitationsCheckbox = document.getElementById("autoUpdateCitations"), this._autoUpdateBibCheckbox = document.getElementById("autoUpdateBibliography");
  var n = this;
  this._autoUpdateCitationsCheckbox && (this._autoUpdateCitationsCheckbox.checked = localStorage.getItem("zoteroAutoUpdateCitations") !== "false", this._autoUpdateCitationsCheckbox.addEventListener("change", function() {
    localStorage.setItem("zoteroAutoUpdateCitations", String(this.checked)), n._somethingWasChanged();
  })), this._autoUpdateBibCheckbox && (this._autoUpdateBibCheckbox.checked = localStorage.getItem("zoteroAutoUpdateBib") !== "false", this._autoUpdateBibCheckbox.addEventListener("change", function() {
    localStorage.setItem("zoteroAutoUpdateBib", String(this.checked)), n._somethingWasChanged();
  }));
}
q.prototype.getLocalesManager = function() {
  return this._localesManager;
};
q.prototype.getStyleManager = function() {
  return this._cslStylesManager;
};
q.prototype.getAutoUpdateCitations = function() {
  return localStorage.getItem("zoteroAutoUpdateCitations") !== "false";
};
q.prototype.getAutoUpdateBibliography = function() {
  return localStorage.getItem("zoteroAutoUpdateBib") !== "false";
};
q.prototype.getLocale = function() {
  return this._localesManager.getLocale();
};
q.prototype.getLastUsedStyleId = function() {
  return this._cslStylesManager.getLastUsedStyleId();
};
q.prototype.init = function() {
  var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
  var i = [this._onStyleChange(e), this._localesManager.loadLocale(t), this._loadStyles()];
  return Promise.all(i);
};
q.prototype.onChangeState = function(e) {
  this._onChangeState = e;
};
q.prototype.setDesktopApiAvailable = function(e) {
  this._desktopAvailable = e, this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
};
q.prototype.setRestApiAvailable = function(e) {
  this._onlineAvailable = e, this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
};
q.prototype._addEventListeners = function() {
  var e = this;
  this._saveBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue();
      if (i === null) {
        console.error("No language selected");
        return;
      }
      var n = Ti({}, e._stateSettings), s = [];
      e._stateSettings.language !== i && (e._localesManager.saveLastUsedLanguage(i), s.push(e._localesManager.loadLocale(i).catch(function(a) {
        throw console.error(a), e._langMessage.show(m("Failed to load language")), a;
      })));
      var r = "footnotes";
      e._endNotes.getState().checked && (r = "endnotes"), e._stateSettings.notesStyle !== r && (e._cslStylesManager.saveLastUsedNotesStyle(r), e._cslStylesManager.getLastUsedFormat() === "note" && s.push(Promise.resolve()));
      var o = e._styleSelect.getSelectedValue();
      e._stateSettings.style !== o && o !== null && s.push(e._onStyleChange(o)), s.length ? (e._showLoader(), Promise.all(s).then(function() {
        e._hide(), e._hideLoader();
        var a = {
          language: i,
          style: o || "ieee",
          notesStyle: r,
          styleFormat: e._cslStylesManager.getLastUsedFormat()
        };
        e._onChangeState(a, n);
      }).catch(function(a) {
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
          console.error(s), e._styleMessage.show(m("Invalid CSL style file"));
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
  }), this._switchToApiBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      if (e._sdk && e._sdk.getIsOnlineAvailable()) {
        e._sdk.clearSettings(), e._router.openLogin();
        return;
      }
      e._settingsApiKeyWrapper && e._settingsApiKeyWrapper.classList.remove("hidden"), e._settingsLocalMessage.close();
    }
  }), this._switchToLocalBtn.subscribe(function(t) {
    if (t.type === "button:click" && e._sdk) {
      if (e._settingsApiKeyMessage.close(), e._settingsApiKeyWrapper && e._settingsApiKeyWrapper.classList.add("hidden"), !e._sdk.getIsOnlineAvailable()) {
        e._sdk.clearSettings(), e._router.openLogin();
        return;
      }
      e._switchToLocalBtn.disable(), nt.checkStatus(e._sdk).then(function(i) {
        i.desktop && i.hasPermission ? (e._sdk.clearSettings(), e._sdk.setIsOnlineAvailable(!1), e._hide(), e._onReconnect()) : i.desktop && !i.hasPermission ? e._settingsLocalMessage.show(m("Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check 'Allow other applications on this computer to communicate with Zotero'")) : e._settingsLocalMessage.show(m("Connection to Zotero failed. Make sure Zotero is running."));
      }).finally(function() {
        e._switchToLocalBtn.enable();
      });
    }
  }), this._settingsSaveApiKeyBtn.subscribe(function(t) {
    if (t.type === "button:click" && e._sdk) {
      var i = e._settingsApiKeyField.getValue();
      i && (e._settingsSaveApiKeyBtn.disable(), e._sdk.setApiKey(i).then(function() {
        nt.successfullyLoggedInUsingApiKey(), e._sdk.setIsOnlineAvailable(!0), e._settingsApiKeyWrapper && e._settingsApiKeyWrapper.classList.add("hidden"), e._settingsApiKeyMessage.close(), e._hide(), e._onReconnect();
      }).catch(function(n) {
        console.error(n), e._settingsApiKeyMessage.show(m("Invalid API key"));
      }).finally(function() {
        e._settingsSaveApiKeyBtn.enable();
      }));
    }
  });
};
q.prototype._hideAllMessages = function() {
  this._langMessage.close(), this._styleMessage.close();
};
q.prototype._hide = function() {
  this._router.openMain();
};
q.prototype.show = function() {
  this._stateSettings = {
    language: this._localesManager.getLastUsedLanguage(),
    style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
    notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
    styleFormat: this._cslStylesManager.getLastUsedFormat()
  }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check(), this._updateConnectionUI();
};
q.prototype._loadStyles = function() {
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
q.prototype._addStylesToList = function(e) {
  var t = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = e.map(function(r) {
    return [r.name, r.title];
  }), s = n.filter(function(r) {
    return !!(r[0] == i || t._cslStylesManager.isStyleDefault(r[0]));
  });
  this._styleSelect.addItems(s, i), this._styleSelectListOther.addItems(n, i);
};
q.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
};
q.prototype._onStyleChange = function(e, t) {
  var i = this;
  return t && i._showLoader(), i._cslStylesManager.getStyle(e, !t).then(function(n) {
    var s = n.styleFormat;
    i._bNumFormat = s == "numeric", s === "note" ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), t && i._hideLoader();
  }).catch(function(n) {
    throw console.error(n), typeof n == "string" && i._styleMessage.show(m(n)), t && i._hideLoader(), n;
  });
};
q.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
};
q.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
q.prototype._updateConnectionUI = function() {
  this._settingsApiKeyWrapper && this._settingsApiKeyWrapper.classList.add("hidden"), this._settingsApiKeyMessage.close(), this._settingsLocalMessage.close();
  var e = this._sdk && this._sdk.getIsOnlineAvailable();
  this._connectionStatus && (e ? this._connectionStatus.textContent = m("Connected via API Key") : this._connectionStatus.textContent = m("Connected to Local Zotero"));
  var t = document.getElementById("switchToApiBtn"), i = document.getElementById("switchToLocalBtn");
  e ? (t && (t.classList.remove("hidden"), t.textContent = m("Log out from API Key")), i && this._desktopAvailable ? (i.classList.remove("hidden"), i.textContent = m("Connect to Local Zotero")) : i && i.classList.add("hidden")) : (i && (i.classList.remove("hidden"), i.textContent = m("Log out from Local Zotero")), t && this._onlineAvailable ? (t.classList.remove("hidden"), t.textContent = m("Connect with API Key")) : t && t.classList.add("hidden"));
};
q.prototype.onReconnect = function(e) {
  this._onReconnect = e;
};
function Se(e, t) {
  if (this._router = e, this._sdk = t, this._apiKeyLoginField = new Oe("apiKeyField", {
    autofocus: !0,
    autocomplete: "on"
  }), this._saveApiKeyBtn = new te("saveApiKeyBtn", {
    disabled: !0
  }), this._apiKeyMessage = new Pe("apiKeyMessage", {
    type: "error"
  }), this._useDesktopMessage = new Pe("useDesktopMessage", {
    type: "error"
  }), this._connectToLocalZotero = new te("connectToLocalZotero", {
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
Se.prototype.init = function() {
  var e = this;
  this._addEventListeners();
  var t = !1, i = document.querySelectorAll(".for-zotero-online"), n = nt.runApisChecker(e._sdk);
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
    } else if (r.hasKey && !r.online && !r.desktop) {
      e._sdk.setIsOnlineAvailable(!1), e._hide(!0), e._hideAllMessages(), e._onAuthorized(r);
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
Se.prototype._addEventListeners = function() {
  var e = this;
  this._apiKeyLoginField.subscribe(function(t) {
    t.type, t.type === "inputfield:input" && (e._apiKeyLoginField.getValue() ? e._saveApiKeyBtn.enable() : e._saveApiKeyBtn.disable());
  }), this._saveApiKeyBtn.subscribe(function(t) {
    t.type === "button:click" && e._tryToApplyKey();
  }), this._connectToLocalZotero.subscribe(function(t) {
    t.type === "button:click" && (e._showLoader(), nt.checkStatus(e._sdk).then(function(i) {
      if (i.desktop && i.hasPermission)
        e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages();
      else if (i.desktop && !i.hasPermission) {
        var n = 'Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check "Allow other applications on this computer to communicate with Zotero"';
        e._useDesktopMessage.show(m(n));
      } else i.desktop || e._useDesktopMessage.show(m("Connection to Zotero failed. Make sure Zotero is running."));
    }).finally(function() {
      e._hideLoader();
    }));
  }), this._logoutLink.onclick = function(t) {
    return e._sdk.clearSettings(), e._show(), !0;
  };
};
Se.prototype._tryToApplyKey = function() {
  var e = this, t = e._apiKeyLoginField.getValue();
  t && (e._showLoader(), e._sdk.setApiKey(t).then(function() {
    nt.successfullyLoggedInUsingApiKey(), e._hide(!0);
  }).catch(function(i) {
    console.error(i), e._apiKeyMessage.show(m("Invalid API key"));
  }).finally(function() {
    e._hideLoader();
  }));
};
Se.prototype._hideAllMessages = function() {
  this._apiKeyMessage.close();
};
Se.prototype._hide = function(e) {
  this._router.openMain(), e && this._logoutLink.classList.remove("hidden");
};
Se.prototype._show = function() {
  this._router.openLogin(), this._logoutLink.classList.add("hidden");
};
Se.prototype._showLoader = function() {
  this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
};
Se.prototype._hideLoader = function() {
  this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
function Je() {
  this._searchField = new Oe("searchField", {
    type: "text",
    autofocus: !0,
    showClear: !1
  }), this._filterButton = new te("filterButton", {
    variant: "secondary-icon",
    size: "small"
  }), this._librarySelectList = new He("librarySelectList", {
    // TODO: add translation
    placeholder: m("No items selected"),
    multiple: !0,
    description: m("Search in:")
  }), this._subscribers = [], this._addEventListeners();
}
Je.prototype._addEventListeners = function() {
  var e = this, t = null;
  this._searchField.subscribe(function(i) {
    if (i.type === "inputfield:blur" || i.type === "inputfield:submit") {
      t && (clearTimeout(t), t = null);
      var n = e._getSelectedGroups();
      e._subscribers.forEach(function(s) {
        s(i.detail.value, n);
      });
    } else i.type === "inputfield:input" && (t && clearTimeout(t), t = setTimeout(function() {
      t = null;
      var s = e._getSelectedGroups();
      e._subscribers.forEach(function(r) {
        r(i.detail.value, s);
      });
    }, 350));
  }), this._filterButton.subscribe(function(i) {
    i.type === "button:click" && (e._librarySelectList.isOpen || (i.detail.originalEvent && i.detail.originalEvent.stopPropagation(), e._librarySelectList.openDropdown()));
  });
};
Je.prototype.addGroups = function(e) {
  var t = this, i = localStorage.getItem("selectedGroups"), n = i ? JSON.parse(i).map(function(w) {
    return w.toString();
  }) : ["my_library", "group_libraries"], s = !1;
  e.forEach(function(w) {
    w.id = String(w.id);
  });
  var r = [{
    id: "my_library",
    name: m("My Library")
  }, {
    id: "group_libraries",
    name: m("Group Libraries")
  }];
  !s && r.forEach(function(w) {
    n.indexOf(w.id) !== -1 && (s = !0);
  }), !s && e.forEach(function(w) {
    n.indexOf(w.id.toString()) !== -1 && (s = !0);
  }), s || (n = ["my_library", "group_libraries"]);
  for (var o = function(E, T, L) {
    typeof E == "number" && (E = E.toString()), t._librarySelectList instanceof He && t._librarySelectList.addItem(E, T, L);
  }, a = 0; a < r.length; a++) {
    var u = r[a].id, h = r[a].name;
    o(u, h, n.indexOf(u) !== -1);
  }
  if (e.length !== 0) {
    this._librarySelectList.addSeparator();
    for (var _ = n.indexOf("group_libraries") !== -1, a = 0; a < e.length; a++) {
      var g = e[a].id, y = e[a].name;
      o(g, y, _ || n.indexOf(g.toString()) !== -1);
    }
    this._selectedGroupsWatcher(r, e);
  }
};
Je.prototype._getSelectedGroups = function() {
  var e = this, t = this._librarySelectList.getSelectedValues();
  return (Array.isArray(t) === !1 || t.length === 0) && setTimeout(function() {
    e._librarySelectList.openDropdown();
  }, 500), t === null || typeof t == "string" ? [] : t;
};
Je.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
Je.prototype._selectedGroupsWatcher = function(e, t) {
  var i = this;
  this._librarySelectList instanceof He && this._librarySelectList.subscribe(function(n) {
    if (n.type === "selectbox:change") {
      var s = [], r = n.detail.values, o = n.detail.current, a = n.detail.enabled, u = e.map(function(y) {
        return y.id;
      }), h = t.map(function(y) {
        return y.id.toString();
      }), _ = u.indexOf(String(o)) !== -1;
      if (_)
        o === "group_libraries" ? (a ? (s.push("group_libraries"), i._librarySelectList.selectItems(h, !0)) : i._librarySelectList.unselectItems(h, !0), r.indexOf("my_library") !== -1 && s.push("my_library")) : r.indexOf("group_libraries") !== -1 ? (s.push("group_libraries"), a && s.push(o)) : s = r.slice();
      else if (!_) {
        var g = h.every(function(y) {
          return r.indexOf(y) !== -1;
        });
        g ? (i._librarySelectList.selectItems("group_libraries", !0), s.push("group_libraries"), r.indexOf("my_library") !== -1 && s.push("my_library")) : (i._librarySelectList.unselectItems("group_libraries", !0), s = r.filter(function(y) {
          return y !== "group_libraries";
        }));
      }
      s.length === 0 ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(s));
    }
  });
};
var Vn = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
function Z(e, t, i) {
  this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._orderedIds = [], this._docRoots = {}, this._reorderBtns = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = i, this._fLoadMore = t, this._loadTimeout, this._editMode = !1, this._init();
}
Z.prototype._init = function() {
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
Z.prototype.clearLibrary = function() {
  this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
  for (var e = this._docsHolder; e && e.lastChild; )
    e.removeChild(e.lastChild);
  e && (e.scrollTop = 0), this._docRoots = {}, this._reorderBtns = {}, this._docsScroller.onscroll();
};
Z.prototype.displayNothingFound = function() {
  this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
};
Z.prototype.displaySearchItems = function(e, t, i) {
  var n = this, s = this._docsHolder;
  this._lastSearch = i;
  var r = 0;
  return new Promise((o, a) => {
    if (e && e.items && e.items.length > 0) {
      var u = document.createElement("div");
      s && u.classList.add("page" + s.children.length);
      for (var h = 0; h < e.items.length; h++) {
        var _ = e.items[h];
        _.title && (u.appendChild(n._buildDocElement(_)), r++);
      }
      s && s.appendChild(u);
    } else t && a(t);
    this._docsScroller.onscroll(), o(r);
  });
};
Z.prototype.getSelectedItems = function() {
  var e = Object.assign({}, this._items || {});
  return e;
};
Z.prototype.removeItems = function(e) {
  var t = this;
  e.forEach(function(i) {
    t._removeSelected(i);
  });
};
Z.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
Z.prototype._buildDocElement = function(e) {
  var t = this;
  this._items[e.id] && (e = this._items[e.id]);
  var i = document.createElement("div");
  i.classList.add("doc");
  var n = document.createElement("div");
  n.classList.add("docInfo");
  var s = document.createElement("div"), r = "";
  e.author && e.author.length > 0 && (r = e.author.map(function(b) {
    return b.family && b.given ? b.family.trim() + ", " + b.given.trim() : b.family ? b.family.trim() : b.given ? b.given.trim() : "";
  }).join("; "));
  var o = document.createElement("div");
  o.classList.add("doc-expand-btn"), o.innerHTML = "•••";
  var a = document.createElement("div");
  if (a.textContent = e.title.trim(), a.classList.add("truncate-text"), (e.publisher || e["publisher-place"]) && (a.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
    var u = e.issued["date-parts"][0];
    r.length > 20 ? a.textContent += " (" + u.join("-") + ")" : (r.length > 0 && r.slice(-1) !== "." && r.slice(-1) !== "," && (r += "."), r += " " + u.join("-"));
  }
  r.length === 0 && (r = a.textContent), a.setAttribute("title", a.textContent), n.appendChild(a);
  var h = document.createElement("input");
  s.appendChild(h);
  var _ = new gt(h, {
    checked: !!this._items[e.id],
    label: r,
    title: !0,
    id: e.id
  });
  this._items[e.id] && (this._checks[e.id] = _);
  var g = document.createElement("div");
  g.classList.add("doc-reorder-btns"), g.style.display = this._items[e.id] ? "flex" : "none";
  var y = document.createElement("span");
  y.className = "doc-reorder-btn", y.textContent = "▲", y.title = m("Move up"), y.onclick = function(b) {
    b.stopPropagation(), t._moveItem(e.id, -1);
  };
  var w = document.createElement("span");
  w.className = "doc-reorder-btn", w.textContent = "▼", w.title = m("Move down"), w.onclick = function(b) {
    b.stopPropagation(), t._moveItem(e.id, 1);
  }, g.appendChild(y), g.appendChild(w), this._reorderBtns[e.id] = g, s.appendChild(g), s.appendChild(o), i.appendChild(s), i.appendChild(n), i.setAttribute("data-id", String(e.id)), this._docRoots[e.id] = i;
  var E;
  function T() {
    i.classList.toggle("doc-open"), E || (E = t._buildCitationParams(e), i.appendChild(E));
  }
  o.onclick = function(b) {
    b.stopPropagation(), T();
  };
  var L = s.querySelector(".checkbox-container");
  return L && L.addEventListener("click", function(b) {
    var U = (
      /** @type {HTMLElement} */
      b.target
    ), K = U.classList.contains("checkbox-visual") || U.classList.contains("checkbox-checkmark") || U.closest(".checkbox-visual") || U === _._input;
    K || (b.stopImmediatePropagation(), b.preventDefault(), T());
  }, !0), n.style.cursor = "pointer", n.onclick = function(b) {
    b.stopPropagation(), T();
  }, _.subscribe(function(b) {
    b.type === "checkbox:change" && (b.detail.checked ? t._addSelected(e, _, i) : t._removeSelected(e.id));
  }), i;
};
Z.prototype._buildCitationParams = function(e) {
  var t = e.label || localStorage.getItem("selectedLocator") || "page";
  e.label = t;
  var i = document.createDocumentFragment(), n = document.createElement("div"), s = document.createElement("input"), r = document.createElement("input"), o = document.createElement("div"), a = document.createElement("div"), u = document.createElement("input"), h = document.createElement("div"), _ = document.createElement("input");
  i.appendChild(n), n.appendChild(s), n.appendChild(r), i.appendChild(o), o.appendChild(a), o.appendChild(u);
  var g = "";
  i.appendChild(h), h.appendChild(_);
  var y = new Oe(s, {
    type: "text",
    placeholder: m("Prefix"),
    value: e.prefix || ""
  }), w = new Oe(r, {
    type: "text",
    placeholder: m("Suffix"),
    value: e.suffix || ""
  }), E = new He(a, {
    placeholder: m("Locator"),
    translate: m
  });
  Vn.forEach(function(b) {
    var U = b[0] === t;
    E.addItem(b[0], b[1], U), U && (g = b[1]);
  });
  var T = new Oe(u, {
    type: "text",
    placeholder: m(g),
    value: e.locator || ""
  }), L = new gt(_, {
    label: m("Omit Author"),
    checked: !!e["suppress-author"]
  });
  return y.subscribe(function(b) {
    b.type === "inputfield:input" && (e.prefix = b.detail.value);
  }), w.subscribe(function(b) {
    b.type === "inputfield:input" && (e.suffix = b.detail.value);
  }), T.subscribe(function(b) {
    b.type === "inputfield:input" && (e.locator = b.detail.value);
  }), E.subscribe(function(b) {
    if (b.type === "selectbox:change" && b.detail.items) {
      var U = b.detail.items[0];
      T.setPlaceholder(U.text), e.label = b.detail.values[0].toString(), localStorage.setItem("selectedLocator", e.label);
    }
  }), L.subscribe(function(b) {
    b.type === "checkbox:change" && (e["suppress-author"] = b.detail.checked);
  }), i;
};
Z.prototype._buildSelectedElement = function(e) {
  var t = this, i = document.createElement("div");
  i.classList.add("selDoc"), i.setAttribute("data-id", String(e.id));
  var n = document.createElement("span");
  e.author && e.author.length > 0 ? n.textContent = e.author.map(function(a) {
    return a.family + ", " + a.given;
  }).join("; ") : n.textContent = e.title, e.issued && e.issued["date-parts"] && (n.textContent += " " + e.issued["date-parts"][0].join("-")), n.setAttribute("title", n.textContent), i.appendChild(n);
  var s = document.createElement("span");
  s.className = "selDoc-move", s.textContent = "▲", s.title = m("Move up"), s.onclick = function() {
    t._moveItem(e.id, -1);
  }, i.appendChild(s);
  var r = document.createElement("span");
  r.className = "selDoc-move", r.textContent = "▼", r.title = m("Move down"), r.onclick = function() {
    t._moveItem(e.id, 1);
  }, i.appendChild(r);
  var o = document.createElement("span");
  return o.onclick = function() {
    t._removeSelected(e.id);
  }, o.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', i.appendChild(o), i;
};
Z.prototype._addSelected = function(e, t, i) {
  this._items[e.id] = e, this._checks[e.id] = t, this._orderedIds.push(e.id), this._reorderBtns[e.id] && (this._reorderBtns[e.id].style.display = ""), this._docsScroller.onscroll(), this._checkSelected();
};
Z.prototype._checkDocsScroll = function(e, t) {
  var i = this;
  if (this._fShouldLoadMore(e)) {
    if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
    this._loadTimeout = setTimeout(function() {
      i._fShouldLoadMore(e) && i._fLoadMore();
    }, 500);
  }
};
Z.prototype._initScrollBox = function(e, t, i, n) {
  var s = {};
  return s.onscroll = this._checkScroll(e, t, i, n), e.onwheel = function(r) {
    e.scrollTop += r.deltaY > 10 || r.deltaY < -10 ? r.deltaY : r.deltaY * 20, s.onscroll();
  }, t.onmousedown = function(r) {
    t.classList.add("scrolling");
    var o = r.clientY, a = e.scrollTop;
    window.onmouseup = function(u) {
      t.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
    }, window.onmousemove = function(u) {
      var h = u.clientY - o, _ = h / e.clientHeight, g = e.scrollHeight * _;
      e.scrollTop = a + g, s.onscroll();
    };
  }, document.body.addEventListener("resize", function() {
    s.onscroll();
  }), s;
};
Z.prototype._checkScroll = function(e, t, i, n) {
  var s = this._displayNoneClass;
  return function() {
    if (e.scrollHeight <= e.clientHeight)
      t.classList.add(s);
    else {
      t.classList.remove(s);
      var r = e.clientHeight / e.scrollHeight * e.clientHeight;
      r = r < i ? i : r, t.style.height = r + "px";
      var o = e.scrollHeight - e.clientHeight, a = e.scrollTop / o, u = a * (e.clientHeight - r);
      t.style.marginTop = u + "px";
    }
    n && n(e, t);
  };
};
Z.prototype._removeSelected = function(e) {
  delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]);
  var t = this._orderedIds.indexOf(e);
  t !== -1 && this._orderedIds.splice(t, 1), this._reorderBtns[e] && (this._reorderBtns[e].style.display = "none"), this._docsScroller.onscroll(), this._checkSelected();
};
Z.prototype._checkSelected = function() {
  var e = this.count();
  this._selectedWrapper && this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo && this._selectedInfo.classList.add(this._displayNoneClass), this._subscribers.forEach(function(t) {
    t(e);
  });
};
Z.prototype.count = function() {
  var e = 0;
  for (var t in this._items) e++;
  return e;
};
Z.prototype.setEditMode = function(e) {
  this._editMode = e, this._selectedWrapper && (e ? this._selectedWrapper.classList.add("edit-mode") : this._selectedWrapper.classList.remove("edit-mode"));
};
Z.prototype.addPreselectedItem = function(e) {
  this._items[e.id] = e, this._orderedIds.push(e.id);
  var t = this._buildDocElement(e);
  this._docsHolder && this._docsHolder.appendChild(t), this._docsScroller.onscroll(), this._checkSelected();
};
Z.prototype._moveItem = function(e, t) {
  var i = this._orderedIds.indexOf(e);
  if (i !== -1) {
    var n = i + t;
    if (!(n < 0 || n >= this._orderedIds.length)) {
      var s = this._orderedIds[n];
      this._orderedIds[n] = this._orderedIds[i], this._orderedIds[i] = s;
      var r = this._docRoots[e], o = this._docRoots[s];
      if (r && o && r.parentNode) {
        var a = document.createElement("div");
        r.parentNode.insertBefore(a, r), o.parentNode.insertBefore(r, o), a.parentNode.insertBefore(o, a), a.parentNode.removeChild(a);
      }
      this._docsScroller.onscroll();
    }
  }
};
Z.prototype.getSelectedItemsOrdered = function() {
  for (var e = [], t = 0; t < this._orderedIds.length; t++) {
    var i = this._orderedIds[t];
    this._items[i] && e.push(this._items[i]);
  }
  return e;
};
(function() {
  var e = "hidden", t, i, n, s, r = {
    text: "",
    obj: null,
    groups: [],
    groupsHash: ""
  }, o, a, u, h = !1, _ = null, g = null, y, w, E, T, L, b, U = new D("libLoader", m("Loading...")), K = {};
  function X() {
    var p = document.getElementById("errorWrapper");
    if (!p)
      throw new Error("errorWrapper not found");
    var d = document.getElementById("mainState");
    if (!d)
      throw new Error("mainState not found");
    o = new Je(), a = new Z(e, Di, zi), y = new te("saveAsTextBtn", {
      variant: "secondary"
    }), w = new te("insertLinkBtn", {
      disabled: !0
    }), T = new te("editCitationBtn", {
      variant: "secondary"
    }), E = new te("settingsBtn", {
      variant: "icon-only",
      size: "small"
    }), L = new te("insertBibBtn", {
      variant: "secondary"
    }), b = new te("refreshBtn", {
      variant: "secondary"
    }), u = new te("cancelEditBtn", {
      variant: "secondary"
    }), K = {
      error: p,
      mainState: d
    };
  }
  window.Asc.plugin.init = function() {
    D.show(), X(), t = new Ze(), i = new V();
    var p = new Se(t, i);
    n = new q(t, e, i), s = new On(n.getLocalesManager(), n.getStyleManager(), i);
    var d = !1;
    Gi(), n.onReconnect(function() {
      se().catch(function(f) {
        console.error(f);
      }), G();
    }), p.init().onOpen(function() {
      D.hide();
    }).onChangeState(function(f) {
      n.setDesktopApiAvailable(f.desktop), n.setRestApiAvailable(f.online);
    }).onAuthorized(function(f) {
      if (!d) {
        d = !0, D.show();
        var O = se().catch((C) => {
          console.error(C), ne(m("An error occurred while loading library groups. Try restarting the plugin."));
        }), S = Ji().catch((C) => console.error("Failed to read document prefs:", C)).then(() => n.init()).catch((C) => {
          console.error(C), ne(m("An error occurred while loading settings. Try restarting the plugin.")), n.show();
        });
        Promise.all([O, S]).then(function() {
          return D.hide(), G();
        }).finally(function() {
          D.hide();
        });
      }
    }), window.Asc.plugin.onTranslate = Wi, Yi().then((f) => {
      window.Asc.scope.editorVersion = f, ji();
    }).catch((f) => {
      console.error(f);
    });
  };
  function G() {
    U.show();
    var p = i.getItems(null).then((d) => (delete d.next, d));
    return $e(p, !1).then((d) => {
      d > 0 ? lt("started") : lt("empty");
    }).catch((d) => {
      console.error(d);
    }).finally(() => {
      U.hide();
    });
  }
  function se() {
    return i.getUserGroups().then(function(p) {
      return o.addGroups(p), p;
    });
  }
  function Gi() {
    a.subscribe(Xe);
    function p(d, f, O) {
      a.clearLibrary();
      var S = [];
      return i.getUserGroups().then(function(C) {
        var P = f.filter(function(j) {
          return j !== "my_library" && j !== "group_libraries";
        });
        f.indexOf("my_library") !== -1 && S.push($e(i.getItems(d), !1));
        for (var Q = 0; Q < P.length; Q++)
          S.push($e(i.getGroupItems(d, P[Q]), !0));
        return r.text = d, r.obj = null, r.groups = [], r.groupsHash = O, S;
      });
    }
    o.subscribe(function(d, f) {
      d = d.trim();
      var O = f.join(",");
      K.mainState.classList.contains(e) || !d || d == r.text && O === r.groupsHash || f.length === 0 || p(d, f, O).catch(() => []).then(function(S) {
        return S.length && (U.show(), Promise.any(S).then(function() {
          U.hide();
        }).finally(function() {
          U.hide();
        })), Promise.allSettled(S);
      }).then(function(S) {
        var C = 0;
        S.forEach(function(P) {
          P.status === "fulfilled" && (C += P.value);
        }), C === 0 ? (lt("empty"), a.displayNothingFound()) : lt("not-empty");
      });
    }), T.subscribe(/* @__PURE__ */ (function() {
      var d = k(function* (f) {
        f.type === "button:click" && (yield ci());
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), u.subscribe(function(d) {
      d.type === "button:click" && ui();
    }), b.subscribe(/* @__PURE__ */ (function() {
      var d = k(function* (f) {
        if (f.type !== "button:click")
          return;
        if (!n.getLastUsedStyleId()) {
          ne(m("Style is not selected"));
          return;
        }
        if (!n.getLocale()) {
          ne(m("Language is not selected"));
          return;
        }
        L.disable(), b.disable(), w.disable(), T.disable();
        var O = 0, S = 0;
        function C(W) {
          var ae = W.total > 0 ? W.completed / W.total : 1;
          W.phase === "fetch" ? O = ae : S = ae, D.setProgress(O * 0.4 + S * 0.6);
          var M = W.phase === "fetch" ? m("Fetching updated references") : m("Updating citations");
          D.setText("Zotero (" + M + " " + W.completed + "/" + W.total + ")");
        }
        D.setText("Zotero (" + m("Updating citations") + ")"), D.setProgress(0), D.show();
        var P = n.getStyleManager(), Q = P.getLastUsedFormat() === "note";
        try {
          if (Q) {
            var j = yield s.prepareRefreshCslItemsInNotes(P.getLastUsedNotesStyle(), C);
            yield St(!0);
            try {
              yield s.applyRefreshCslItemsInNotes(j);
            } finally {
              yield xt(!1);
            }
          } else {
            var oe = yield s.prepareRefreshCslItems(void 0, C);
            yield St(!0);
            try {
              yield s.applyRefreshCslItems(oe);
            } finally {
              yield xt(!1);
            }
          }
        } catch (W) {
          console.error(W);
          var de = m("Failed to refresh");
          typeof W == "string" && (de += ". " + m(W)), ne(de);
        } finally {
          D.setProgress(null), D.hide(), L.enable(), b.enable(), T.enable(), Xe();
        }
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), L.subscribe(/* @__PURE__ */ (function() {
      var d = k(function* (f) {
        if (f.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            ne(m("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            ne(m("Language is not selected"));
            return;
          }
          yield Ye(!1, "Zotero (" + m("Inserting bibliography") + ")");
          var O = "";
          s.insertBibliography().then(function(S) {
            O = S;
          }).catch(function(S) {
            if (console.error(S), s.showWarningMessage("Failed to insert bibliography"), typeof S == "string") {
              var C = m(S);
              ne(C);
            }
          }).finally(function() {
            je(!1, "Zotero (" + m("Inserting bibliography") + ")"), O && s.moveCursorOutsideField(O);
          });
        }
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), w.subscribe(/* @__PURE__ */ (function() {
      var d = k(function* (f) {
        if (f.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            ne(m("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            ne(m("Language is not selected"));
            return;
          }
          if (h) {
            var O = a.getSelectedItemsOrdered();
            if (O.length === 0) {
              ne(m("No citations selected"));
              return;
            }
            var S = O.map(function(M) {
              var H = g.citationItems.find(function(ce) {
                return ce.id === M.id || ce.itemData && ce.itemData.id === M.id;
              });
              if (H)
                return H.prefix = M.prefix || "", H.suffix = M.suffix || "", H.locator = M.locator || "", H.label = M.label || "page", H["suppress-author"] = !!M["suppress-author"], H;
              var $ = {
                id: M.id,
                itemData: Object.assign({}, M),
                uris: M.uris || []
              };
              return delete $.itemData.prefix, delete $.itemData.suffix, delete $.itemData.locator, delete $.itemData.label, delete $.itemData["suppress-author"], delete $.itemData.uris, $.prefix = M.prefix || "", $.suffix = M.suffix || "", $.locator = M.locator || "", $.label = M.label || "page", $["suppress-author"] = !!M["suppress-author"], $;
            }), C = JSON.parse(JSON.stringify(g));
            C.citationItems = S;
            var P = _;
            ui(), yield Ye(!0, "Zotero (" + m("Updating citations") + ")");
            var Q = s.updateItem.bind(s, C), j = n.getStyleManager();
            j.getLastUsedFormat() === "note" && (Q = s.updateItem.bind(s, C, j.getLastUsedNotesStyle())), Q().catch(function(M) {
              console.error(M);
              var H = m("Failed to update citation");
              typeof M == "string" && (H += ". " + m(M)), ne(H);
            }).finally(/* @__PURE__ */ k(function* () {
              Pt();
              var M = j.getLastUsedFormat() === "note";
              yield je(!1, "Zotero (" + m("Updating citations") + ")", M), P && (M ? yield s.moveCursorToField(P.FieldId, !1) : yield s.moveCursorOutsideField(P.FieldId));
            }));
            return;
          }
          yield Ye(!0, "Zotero (" + m("Inserting citation") + ")");
          var oe = a.getSelectedItems(), de = null, W = !1, ae = n.getStyleManager().getLastUsedFormat() === "note";
          return s.insertSelectedCitations(oe).then(function(M) {
            return W = M, a.removeItems(Object.keys(oe)), s.getCurrentField();
          }).then(function(M) {
            if (de = M, !(ae && !W)) {
              var H = {
                skipCitations: !n.getAutoUpdateCitations(),
                skipBibliography: !n.getAutoUpdateBibliography()
              };
              return W ? s.updateCslItems(!1, H) : s.updateCslItems(void 0, H);
            }
          }).catch(function(M) {
            console.error(M);
            var H = m("Failed to insert citation");
            typeof M == "string" && (H += ". " + m(M)), ne(H);
          }).finally(/* @__PURE__ */ k(function* () {
            var M = ae && !W;
            je(!1, "Zotero (" + m("Inserting citation") + ")", M), Pt(), W ? yield s.moveCursorRight() : de && (yield s.moveCursorOutsideField(de.FieldId));
          }));
        }
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), E.subscribe(function(d) {
      d.type === "button:click" && n.show();
    }), y.subscribe(/* @__PURE__ */ (function() {
      var d = k(function* (f) {
        f.type === "button:click" && (yield Ye(!1, "Zotero (" + m("Saving as text") + ")"), s.saveAsText().then(function() {
          je(!1, "Zotero (" + m("Saving as text") + ")");
        }));
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), n.onChangeState(/* @__PURE__ */ (function() {
      var d = k(function* (f, O) {
        yield Ye(!0, "Zotero (" + m("Updating citations") + ")");
        var S = s.updateCslItems.bind(s, !0);
        [f.styleFormat, O.styleFormat].includes("note") && (f.styleFormat !== O.styleFormat ? f.styleFormat === "note" ? S = s.switchingBetweenNotesAndText.bind(s, f.notesStyle) : S = s.switchingBetweenNotesAndText.bind(s) : f.notesStyle !== O.notesStyle ? S = s.convertNotesStyle.bind(s, f.notesStyle) : S = s.updateCslItems.bind(s, !0)), S().catch(function(C) {
          console.error(C);
          var P = m("Failed to refresh");
          typeof C == "string" && (P += ". " + m(C)), ne(P);
        }).finally(function() {
          je(!1, "Zotero (" + m("Updating citations") + ")"), Pt();
        });
      });
      return function(f, O) {
        return d.apply(this, arguments);
      };
    })());
  }
  Asc.plugin.onThemeChanged = function(p) {
    window.Asc.plugin.onThemeChangedBase(p), fi.fixThemeForIE(p), fi.addStylesForComponents(p);
    var d = "";
    d += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + ` !important;}
`, d += ".doc { border-color: " + p["border-regular-control"] + "; background-color: " + p["background-normal"] + `; }
`, d += ".scrollThumb { box-shadow: 0 0 8px 8px " + p["highlight-button-hover"] + ` inset; }
`, d += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + p["canvas-scroll-thumb-pressed"] + ` inset; }
`, d += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + p["canvas-scroll-thumb-hover"] + ` inset; }
`, (["theme-white", "theme-night"].indexOf(p.name) !== -1 || ["theme-white", "theme-night"].indexOf(p.Name) !== -1) && (d += `.doc { border-radius: 4px; }
`);
    var f = document.getElementById("pluginStyles");
    f ? f.innerHTML = d : (f = document.createElement("style"), f.id = "pluginStyles", f.innerHTML = d, document.getElementsByTagName("head")[0].appendChild(f));
    var O = p.type || "light", S = document.body;
    S.classList.remove("theme-dark"), S.classList.remove("theme-light"), S.classList.add("theme-" + O);
  };
  function Wi() {
    for (var p = document.getElementsByClassName("i18n"), d = function() {
      var S = p[f];
      if (!(S instanceof HTMLElement)) return 1;
      ["placeholder", "title"].forEach((P) => {
        S.hasAttribute(P) && S.setAttribute(P, m(S.getAttribute(P) || ""));
      });
      var C = m(S.innerText.trim().replace(/\s+/g, " "));
      C && (S.innerText = C);
    }, f = 0; f < p.length; f++)
      d();
  }
  function ne(p) {
    p && typeof p == "string" ? (m(""), K.error.classList.remove(e), K.error.textContent = p, setTimeout(function() {
      window.onclick = function() {
        ne(!1);
      };
    }, 100)) : (K.error.classList.add(e), K.error.textContent = "", window.onclick = null);
  }
  function St(p) {
    return Ct.apply(this, arguments);
  }
  function Ct() {
    return Ct = k(function* (p) {
      var d = window.Asc.scope.editorVersion;
      d && d < 9004e3 ? window._cursorPosition = yield Pi.getCursorPosition() : yield new Promise((f) => {
        Asc.plugin.executeMethod("StartAction", ["GroupActions", {
          lockScroll: !0,
          keepSelection: p
        }], f);
      });
    }), Ct.apply(this, arguments);
  }
  function xt(p, d) {
    return It.apply(this, arguments);
  }
  function It() {
    return It = k(function* (p, d) {
      var f = window.Asc.scope.editorVersion;
      f && f < 9004e3 ? d || (yield Pi.setCursorPosition(window._cursorPosition || 0)) : yield new Promise((O) => {
        Asc.plugin.executeMethod("EndAction", ["GroupActions", {
          scrollToTarget: p
        }], O);
      });
    }), It.apply(this, arguments);
  }
  function Ye(p, d) {
    return At.apply(this, arguments);
  }
  function At() {
    return At = k(function* (p, d) {
      L.disable(), b.disable(), w.disable(), T.disable(), yield St(p);
    }), At.apply(this, arguments);
  }
  function je(p, d, f) {
    return kt.apply(this, arguments);
  }
  function kt() {
    return kt = k(function* (p, d, f) {
      L.enable(), b.enable(), T.enable(), Xe(), yield xt(p, f);
    }), kt.apply(this, arguments);
  }
  function lt(p) {
    var d = document.getElementById("searchLabel");
    if (!d) {
      console.error("Search label not found");
      return;
    }
    var f = d.querySelector(".when-empty"), O = d.querySelector(".when-not-empty"), S = d.querySelector(".when-started");
    if (!f || !O || !S) {
      console.error("Search label elements not found");
      return;
    }
    switch (f.classList.add("hidden"), O.classList.add("hidden"), S.classList.add("hidden"), p) {
      case "empty":
        f.classList.remove("hidden");
        break;
      case "not-empty":
        O.classList.remove("hidden");
        break;
      case "started":
        O.classList.remove("hidden"), S.classList.remove("hidden");
        break;
    }
  }
  function Di() {
    console.warn("Loading more..."), r.obj && r.obj.next && $e(r.obj.next(), !1);
    for (var p = 0; p < r.groups.length && r.groups[p].next; p++)
      $e(i.getGroupItems(r.groups[p].next(), r.groups[p].id), !0);
  }
  function zi(p) {
    if (t.getRoute() != "main" || p.scrollTop + p.clientHeight < p.scrollHeight)
      return !1;
    var d = !0;
    return r.groups.forEach(function(f) {
      f.next && (d = !1);
    }), !(!r.obj || !r.obj.next || !d || !r.obj && !r.text.trim() && !r.groups.length);
  }
  function $e(p, d) {
    return p.then(function(f) {
      return li(f, null, d);
    }).catch(function(f) {
      return console.error(f), f.message && ne(m(f.message)), li(null, f, d);
    }).then(function(f) {
      return f;
    });
  }
  function li(p, d, f) {
    var O = !1;
    !r.obj && p && p.items && !p.items.length && (O = !0), d ? (O && (r.obj = null, r.groups = []), r && r.obj && delete r.obj.next) : f && p && p.next ? r.groups.push(p) : r.obj = p && p.items.length ? p : null;
    var S = function(P) {
      if (!P.id) return P;
      var Q = P.id.indexOf("/") + 1, j = P.id.lastIndexOf("/") + 1, oe = P.id.indexOf("http");
      return Q !== j && oe === 0 && (P.uris || (P.uris = []), P.uris.push(P.id)), j && (P.id = P.id.substring(j)), P;
    };
    return p && p.items && p.items.length > 0 && (p.items = p.items.map((C) => (C = Zi(C), C[f ? "groupID" : "userID"] = String(p.id), S(C), C))), a.displaySearchItems(p, d, r);
  }
  var qi = {
    artwork: "graphic",
    audioRecording: "song",
    bill: "bill",
    blogPost: "post-weblog",
    book: "book",
    bookSection: "chapter",
    case: "legal_case",
    computerProgram: "software",
    conferencePaper: "paper-conference",
    dictionaryEntry: "entry-dictionary",
    document: "document",
    email: "personal_communication",
    encyclopediaEntry: "entry-encyclopedia",
    film: "motion_picture",
    forumPost: "post",
    hearing: "hearing",
    instantMessage: "personal_communication",
    interview: "interview",
    journalArticle: "article-journal",
    letter: "personal_communication",
    magazineArticle: "article-magazine",
    manuscript: "manuscript",
    map: "map",
    newspaperArticle: "article-newspaper",
    patent: "patent",
    podcast: "song",
    presentation: "speech",
    radioBroadcast: "broadcast",
    report: "report",
    statute: "legislation",
    thesis: "thesis",
    tvBroadcast: "broadcast",
    videoRecording: "motion_picture",
    webpage: "webpage"
  };
  function Zi(p) {
    if (p.id || !p.key) return p;
    var d = p.data || {}, f = {
      id: p.key,
      title: d.title || "",
      type: qi[d.itemType] || d.itemType || ""
    };
    if (Array.isArray(d.creators) && d.creators.forEach(function(S) {
      var C = {};
      S.firstName && (C.given = S.firstName), S.lastName && (C.family = S.lastName), S.name && (C.literal = S.name);
      var P = S.creatorType || "author";
      f[P] || (f[P] = []), f[P].push(C);
    }), d.date) {
      var O = d.date.replace(/\//g, "-").split("-").map(Number).filter(function(S) {
        return !isNaN(S);
      });
      O.length && (f.issued = {
        "date-parts": [O]
      });
    }
    return d.url && (f.URL = d.url), d.volume && (f.volume = d.volume), d.issue && (f.issue = d.issue), d.pages && (f.page = d.pages), d.edition && (f.edition = d.edition), d.language && (f.language = d.language), d.abstractNote && (f.abstract = d.abstractNote), d.note && (f.note = d.note), d.shortTitle && (f.shortTitle = d.shortTitle), d.publisher && (f.publisher = d.publisher), d.place && (f["publisher-place"] = d.place), d.DOI && (f.DOI = d.DOI), d.ISBN && (f.ISBN = d.ISBN), d.ISSN && (f.ISSN = d.ISSN), d.publicationTitle && (f["container-title"] = d.publicationTitle), d.bookTitle && (f["container-title"] = d.bookTitle), d.series && (f["collection-title"] = d.series), d.seriesNumber && (f["collection-number"] = d.seriesNumber), d.numberOfVolumes && (f["number-of-volumes"] = d.numberOfVolumes), d.numPages && (f["number-of-pages"] = d.numPages), p.links && (f.uris = [], p.links.self && f.uris.push(p.links.self.href), p.links.alternate && f.uris.push(p.links.alternate.href)), f;
  }
  function Xe(p) {
    if (typeof p > "u" && (p = a.count()), h) {
      p <= 0 ? (w.disable(), w.setText(m("Update Citation"))) : (w.enable(), w.setText(m("Update Citation")));
      return;
    }
    p <= 0 ? (w.disable(), w.setText(m("Insert Citation"))) : (w.enable(), p > 1 ? w.setText(m("Insert " + p + " Citations")) : w.setText(m("Insert Citation")));
  }
  function ci() {
    return Lt.apply(this, arguments);
  }
  function Lt() {
    return Lt = k(function* () {
      var p = yield new Promise((C) => {
        window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, C);
      });
      if (!p || !p.Value || p.Value.toLowerCase().indexOf("zotero_item") === -1) {
        s.showWarningMessage(m("No Zotero citation found at the cursor. Please click directly on a citation to edit it."));
        return;
      }
      var d = p.Value.indexOf("{"), f = p.Value.lastIndexOf("}");
      if (d === -1 || f === -1 || f < d) {
        s.showWarningMessage(m("Could not parse the citation data."));
        return;
      }
      var O = p.Value.slice(d, f + 1), S;
      try {
        S = JSON.parse(O);
      } catch (C) {
        console.error("Failed to parse citation data:", C), s.showWarningMessage(m("Could not parse the citation data."));
        return;
      }
      a.removeItems(Object.keys(a.getSelectedItems())), a.clearLibrary(), h = !0, _ = p, g = S, a.setEditMode(!0), S.citationItems && S.citationItems.forEach(function(C) {
        var P = Object.assign({}, C.itemData || {});
        !P.id && C.id && (P.id = C.id), C.uris && (P.uris = C.uris), C.prefix && (P.prefix = C.prefix), C.suffix && (P.suffix = C.suffix), C.locator && (P.locator = C.locator), C.label && (P.label = C.label), C["suppress-author"] && (P["suppress-author"] = C["suppress-author"]), a.addPreselectedItem(P);
      }), u._container.classList.remove("hidden"), T._container.classList.add("hidden"), L._container.classList.add("hidden"), b._container.classList.add("hidden"), w.setText(m("Update Citation")), w.enable(), Xe();
    }), Lt.apply(this, arguments);
  }
  function ui() {
    h = !1, _ = null, g = null, a.setEditMode(!1), a.removeItems(Object.keys(a.getSelectedItems())), a.clearLibrary(), u._container.classList.add("hidden"), T._container.classList.remove("hidden"), L._container.classList.remove("hidden"), b._container.classList.remove("hidden"), w.setText(m("Insert Citation")), w.disable(), Xe(), G();
  }
  function Ji() {
    return Et.apply(this, arguments);
  }
  function Et() {
    return Et = k(function* () {
      var p = yield new Promise((ae) => {
        Asc.plugin.callCommand(() => {
          var M = Api.GetDocument(), H = M.GetCustomProperties();
          if (!H) return "";
          var $ = typeof H.Get == "function" ? H.Get("ZOTERO_PREF_COUNT") : null, ce = parseInt(String($ || ""), 10), Ce = "", ge = 1;
          if (!isNaN(ce) && ce > 0) {
            for (; ge <= ce; ge++) {
              var xe = H.Get("ZOTERO_PREF_" + ge);
              if (xe == null || xe === "")
                break;
              Ce += String(xe);
            }
            return Ce;
          }
          for (; ; ) {
            var Ie = H.Get("ZOTERO_PREF_" + ge);
            if (Ie == null || Ie === "") break;
            Ce += String(Ie), ge++;
          }
          return Ce;
        }, !1, !0, (M) => ae(M || ""));
      });
      if (p)
        try {
          var d = new DOMParser(), f = d.parseFromString(p, "text/xml"), O = f.querySelector("style");
          if (O) {
            var S = O.getAttribute("id") || "", C = O.getAttribute("locale") || "";
            if (S) {
              var P = S.replace(/^.*\/styles\//, "");
              P && localStorage.setItem("zoteroStyleId", P);
            }
            C && localStorage.setItem("zoteroLang", C);
            var Q = O.getAttribute("hasBibliography");
            Q !== null && localStorage.setItem("zoteroContainBibliography", Q === "1" || Q === "true" ? "true" : "false");
          }
          var j = f.querySelector('pref[name="noteType"]');
          if (j) {
            var oe = j.getAttribute("value");
            oe === "1" ? (localStorage.setItem("zoteroNotesStyleId", "footnotes"), localStorage.setItem("zoteroFormatId", "note")) : oe === "2" && (localStorage.setItem("zoteroNotesStyleId", "endnotes"), localStorage.setItem("zoteroFormatId", "note"));
          }
          var de = f.querySelector('pref[name="hasBibliography"]');
          if (de) {
            var W = de.getAttribute("value");
            W !== null && localStorage.setItem("zoteroContainBibliography", W === "true" ? "true" : "false");
          }
        } catch (ae) {
          console.error("Failed to parse ZOTERO_PREF XML:", ae);
        }
    }), Et.apply(this, arguments);
  }
  function Pt() {
    var p = n.getStyleManager(), d = p.getLastUsedStyleId();
    if (!d) return Promise.resolve();
    var f = n.getLocalesManager().getLastUsedLanguage() || "en-US", O = p.getLastUsedFormat(), S = p.getLastUsedNotesStyle(), C = "0";
    O === "note" && (C = S === "endnotes" ? "2" : "1");
    for (var P = p.isLastUsedStyleContainBibliography() ? "1" : "0", Q = '<data data-version="3" zotero-version="5.0.96"><style id="http://www.zotero.org/styles/' + d + '" locale="' + f + '" hasBibliography="' + P + '" bibliographyStyleHasBeenSet="1"/><prefs><pref name="fieldType" value="Field"/><pref name="automaticJournalAbbreviations" value="true"/><pref name="noteType" value="' + C + '"/></prefs></data>', j = [], oe = 0; oe < Q.length; oe += 255)
      j.push(Q.substring(oe, oe + 255));
    return new Promise(function(de) {
      Asc.scope.prefChunks = j, Asc.plugin.callCommand(function() {
        function W(Ne, ut) {
          return typeof Ne.Get == "function" ? Ne.Get(ut) : null;
        }
        function ae(Ne, ut) {
          typeof Ne.Delete == "function" ? Ne.Delete(ut) : typeof Ne.Remove == "function" && Ne.Remove(ut);
        }
        var M = Api.GetDocument(), H = M.GetCustomProperties(), $ = Asc.scope.prefChunks, ce = "ZOTERO_PREF_", Ce = parseInt(String(W(H, "ZOTERO_PREF_COUNT") || ""), 10);
        if (!isNaN(Ce) && Ce > 0)
          for (var ge = 1; ge <= Ce; ge++)
            ae(H, ce + ge);
        else
          for (var xe = 1; ; xe++) {
            var Ie = W(H, ce + xe);
            if (Ie == null || Ie === "")
              break;
            ae(H, ce + xe);
          }
        ae(H, "ZOTERO_PREF_COUNT");
        for (var ct = 0; ct < $.length; ct++)
          H.Add(ce + (ct + 1), $[ct]);
        H.Add("ZOTERO_PREF_COUNT", String($.length));
      }, !1, !1, function() {
        de();
      });
    });
  }
  function Yi() {
    return Ot.apply(this, arguments);
  }
  function Ot() {
    return Ot = k(function* () {
      try {
        var p = yield new Promise((f) => {
          Asc.plugin.executeMethod("GetVersion", [], f);
        });
        p == "develop" && (p = "99.99.99");
        for (var d = p.split("."); 3 > d.length; ) d.push("0");
        return 1e6 * parseInt(d[0]) + 1e3 * parseInt(d[1]) + parseInt(d[2]);
      } catch (f) {
        return console.error(f), 99999999;
      }
    }), Ot.apply(this, arguments);
  }
  function ji() {
    var p = new Asc.ButtonContextMenu();
    p.text = "Edit citation", p.addCheckers("Target", "Selection"), p.attachOnClick(/* @__PURE__ */ k(function* () {
      t.openMain(), yield ci();
    })), Asc.Buttons.registerContextMenu();
  }
})();
//# sourceMappingURL=bundle.modern.js.map
