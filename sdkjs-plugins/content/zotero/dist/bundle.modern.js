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
function c(t, e, i) {
  if (typeof t == "function" ? t === e : t.has(e)) return arguments.length < 3 ? e : i;
  throw new TypeError("Private element is not present on this object");
}
function Ee(t, e, i, n, s, r, o) {
  try {
    var l = t[r](o), u = l.value;
  } catch (h) {
    return void i(h);
  }
  l.done ? e(u) : Promise.resolve(u).then(n, s);
}
function I(t) {
  return function() {
    var e = this, i = arguments;
    return new Promise(function(n, s) {
      var r = t.apply(e, i);
      function o(u) {
        Ee(r, n, s, o, l, "next", u);
      }
      function l(u) {
        Ee(r, n, s, o, l, "throw", u);
      }
      o(void 0);
    });
  };
}
function ze(t, e) {
  if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function a(t, e) {
  return t.get(c(t, e));
}
function R(t, e, i) {
  ze(t, e), e.set(t, i);
}
function x(t, e, i) {
  return t.set(c(t, e), i), i;
}
function st(t, e) {
  ze(t, e), e.add(t);
}
function ii(t, e, i) {
  return (e = si(e)) in t ? Object.defineProperty(t, e, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = i, t;
}
function Pe(t, e) {
  var i = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function Ze(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Pe(Object(i), !0).forEach(function(n) {
      ii(t, n, i[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : Pe(Object(i)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(i, n));
    });
  }
  return t;
}
function ni(t, e) {
  if (typeof t != "object" || !t) return t;
  var i = t[Symbol.toPrimitive];
  if (i !== void 0) {
    var n = i.call(t, e);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function si(t) {
  var e = ni(t, "string");
  return typeof e == "symbol" ? e : e + "";
}
var Oe = {
  /**
   * @param {AscTheme} theme
   */
  addStylesForComponents: function(e) {
    var i = "";
    e["background-toolbar"] && (i += `.loader-body,
.loader-bg { background-color: ` + e["background-toolbar"] + `; }
`, i += ".loader-body {     box-shadow: 0 0 99px 99px " + e["background-toolbar"] + `; }
`), e["background-loader"] && (i += ".loader-image { color: " + e["background-loader"] + `; }
`), e["background-normal"] && (i += `.custom-button-secondary-icon,
.custom-button-secondary,
.input-field-element,
.selectbox-search-input,
.selectbox-header,
.selectbox-dropdown,
.radio-visual, 
.checkbox-visual, 
.message { background-color: ` + e["background-normal"] + `; }
`), e["text-inverse"] && (i += ".custom-button-primary { color: " + e["text-inverse"] + `; }
`), e["border-regular-control"] && (i += `.custom-button-icon-only:active:not(.custom-button-disabled),
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
.message { border-color: ` + e["border-regular-control"] + `; }
`, i += `.selectbox-search,
.selectbox-option-divider { border-color: ` + e["border-regular-control"] + ` !important; }
`), e["border-error"] && (i += ".input-field-invalid .input-field-element { border-color: " + e["border-error"] + `; }
`), e["border-control-focus"] && (i += `.custom-button-icon-only:focus:not(:active):not(:hover),
.custom-button-secondary-icon:focus:not(:active):not(:hover),
.custom-button-secondary:focus:not(:active):not(:hover),
.input-field-element:focus,
.input-field-focused .input-field-element,
.selectbox-header:active,
.selectbox-header:focus,
.selectbox-header-open { border-color: ` + e["border-control-focus"] + `; }
`), e["highlight-button-hover"] && (i += `.custom-button-icon-only:hover:not(.custom-button-disabled),
.custom-button-secondary-icon:hover:not(.custom-button-disabled),
.custom-button-secondary:hover:not(.custom-button-disabled),
.selectbox-custom-option:hover,
.selectbox-option:hover { background-color: ` + e["highlight-button-hover"] + `; }
`), e["highlight-button-pressed"] && (i += `.custom-button-icon-only:active:not(.custom-button-disabled),
.custom-button-secondary-icon:active:not(.custom-button-disabled),
.custom-button-secondary:active:not(.custom-button-disabled),
.selectbox-option-selected:hover,
.selectbox-option-selected { background-color: ` + e["highlight-button-pressed"] + `; }
`, i += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + e["highlight-button-pressed"] + `; }
`), e["highlight-primary-dialog-button-hover"] && (i += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + e["highlight-primary-dialog-button-hover"] + "; border-color: " + e["highlight-primary-dialog-button-hover"] + `; }
`), e["background-primary-dialog-button"] && (i += `.checkbox-indeterminate,
.custom-button-primary { background-color: ` + e["background-primary-dialog-button"] + "; border-color: " + e["background-primary-dialog-button"] + `; }
`), e["background-toolbar-additional"] && (i += `.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled { background-color: ` + e["background-toolbar-additional"] + "; border-color: " + e["background-toolbar-additional"] + `; }
`), e["text-normal"] && (i += `.custom-button-secondary-icon,
.custom-button-secondary,
.custom-button-secondary-icon,
.custom-button-icon-only,
.selectbox-search-input,
.loader-image,
.input-field-element { color: ` + e["text-normal"] + `; }
`, i += ".input-field-search-icon svg { fill: " + e["text-normal"] + `; }
`, i += ".selectbox-arrow b { border-color: " + e["text-normal"] + `; }
`), e["text-secondary"] && (i += `.message-close:hover,
.input-field-clear:hover { color: ` + e["text-secondary"] + `; }
`), e["text-tertiary"] && (i += `.input-field-clear,
.message-container:hover .message-close,
.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled,
.input-field-element::placeholder,
.selectbox-search-input::placeholder { color: ` + e["text-tertiary"] + `; }
`);
    var n = "11px";
    ["theme-white", "theme-night"].indexOf(e.name) !== -1 || ["theme-white", "theme-night"].indexOf(e.Name) !== -1 ? (n = "12px", i += `.message,
.custom-button,
.selectbox-header,
.input-field-element { border-radius: 4px; }
`, i += `.radio--checked .radio-visual { border-width: 4px; }
`, i += ".checkbox-checkmark { color: " + e["text-inverse"] + `; }
`, i += ".checkbox--checked .checkbox-visual { background-color: " + e["background-primary-dialog-button"] + `; }
`, i += `.radio--checked .radio-visual,
.checkbox--checked .checkbox-visual { border-color: ` + e["background-primary-dialog-button"] + `; }
`, i += `.radio-button-container:hover:not(.radio--checked) .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: ` + e["highlight-button-hover"] + `; }
`, i += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + e["highlight-primary-dialog-button-hover"] + "; background-color: " + e["highlight-primary-dialog-button-hover"] + `; }
`, i += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + e["highlight-primary-dialog-button-hover"] + `; }
`, i += `body { font-size: 12px; }
`) : (i += ".checkbox-checkmark { color: " + e["text-normal"] + `; }
`, i += ".radio--checked .radio-visual { background-color: " + e["text-normal"] + `;
 box-shadow: 0 0 0 2px` + e["background-normal"] + ` inset; }
`, i += `.radio-button-container:hover .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: ` + e["border-control-focus"] + `; }
`), i += "body, input, textarea, select, button { font-size: " + n + `; }
`;
    var s = document.getElementById("componentsStyles");
    return s ? (s.innerHTML = i, i) : (s = document.createElement("style"), s.id = "componentsStyles", s.innerHTML = i, document.getElementsByTagName("head")[0].appendChild(s), i);
  },
  /**
   * @param {AscTheme} theme
   */
  fixThemeForIE: function(e) {
    return e["background-toolbar"] || (e["background-toolbar"] = "#f7f7f7"), e["text-normal"] || (e["text-normal"] = "rgb(51, 51, 51)"), e["text-secondary"] || (e["text-secondary"] = "#848484"), e["highlight-button-hover"] || (e["highlight-button-hover"] = "#e0e0e0"), e["background-normal"] || (e["background-normal"] = "white"), e["background-loader"] || (e["background-loader"] = "rgba(24, 24, 24, 0.9)"), e["highlight-button-pressed"] || (e["highlight-button-pressed"] = "#cbcbcb"), e["text-inverse"] || (e["text-inverse"] = "white"), e["border-regular-control"] || (e["border-regular-control"] = "#c0c0c0"), e["border-error"] || (e["border-error"] = "#f62211"), e["border-control-focus"] || (e["border-control-focus"] = "#848484"), e["highlight-primary-dialog-button-hover"] || (e["highlight-primary-dialog-button-hover"] = "#1c1c1c"), e["background-primary-dialog-button"] || (e["background-primary-dialog-button"] = "#444444"), e["background-toolbar-additional"] || (e["background-toolbar-additional"] = "#efefef"), e["text-tertiary"] || (e["text-tertiary"] = "#bdbdbd"), e;
  }
};
function Ot() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(t) {
    var e = document.getElementById(t);
    if (!e) throw new Error("container ".concat(t, " not found"));
    return e;
  });
}
Ot.prototype.getRoute = function() {
  return this._currentRoute;
};
Ot.prototype._setCurrentRoute = function(t) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = t, this._currentRouteIndex = this._routes.indexOf(t), this._containers[this._currentRouteIndex].classList.remove("hidden");
};
Ot.prototype.openMain = function() {
  this._setCurrentRoute("main");
};
Ot.prototype.openLogin = function() {
  this._setCurrentRoute("login");
};
Ot.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
var jt = {
  restApiUrl: "https://api.zotero.org/",
  desktopApiUrl: "http://127.0.0.1:23119/api/"
}, xe = {
  _done: !1,
  _desktop: !1,
  _hasPermission: !0,
  _online: !1,
  _hasKey: !1,
  _timeout: 1e3,
  // 1 second
  /** @type {function(AvailableApis): void} */
  _callback: function(e) {
  },
  _desktopVersion: (function() {
    if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return !1;
    if (window.location && window.location.protocol == "file:") return !0;
    var t = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
    return !!(t && t.indexOf("file:///") == 0);
  })(),
  /**
   * @param {ZoteroSdk} sdk
   * @returns
   */
  runApisChecker: function(e) {
    var i = this;
    i._done = !1;
    function n() {
      i._done || i._checkApiAvailable(e).then(function(s) {
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
  checkStatus: function(e) {
    return this._checkApiAvailable(e);
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
  _checkApiAvailable: function(e) {
    var i = this;
    return Promise.all([fetch(jt.restApiUrl, {
      method: "GET",
      cache: "no-cache"
    }).then(function(n) {
      return n.status === 200;
    }).catch(function() {
      return !1;
    }), i._sendDesktopRequest(jt.desktopApiUrl).then(function(n) {
      return i._hasPermission = n.hasPermission, n.isZoteroRunning;
    }).catch(function() {
      return !1;
    })]).then(function(n) {
      return i._online = n[0], i._desktop = n[1], i._hasKey = e.hasSettings(), {
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
  _sendDesktopRequest: function(e) {
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
        url: e,
        method: "GET",
        headers: {
          "Zotero-API-Version": "3",
          "User-Agent": "AscDesktopEditor"
        },
        complete: function(o) {
          var l = !1, u = !1;
          o.responseStatus == 403 ? (l = !1, u = !0) : o.responseStatus === 200 && (u = !0, l = !0), n({
            hasPermission: l,
            isZoteroRunning: u
          });
        },
        error: function(o) {
          o.statusCode == -102 && (o.statusCode = 404), s(o);
        }
      });
    });
  }
}, ht = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakSet();
class ri {
  /**
   * @param {{maxRetries?: number, initialDelay?: number, maxDelay?: number, backoffFactor?: number, retryOn?: number[]}} options
   */
  constructor() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    st(this, tt), R(this, ht, void 0), R(this, pe, void 0), R(this, _e, void 0), R(this, ve, void 0), R(this, re, void 0), R(this, $t, void 0), R(this, Ht, void 0), R(this, et, void 0), R(this, Rt, void 0), R(this, Et, void 0), x(ht, this, e.maxRetries || 5), x(pe, this, e.initialDelay || 1e3), x(_e, this, e.maxDelay || 5e3), x(ve, this, e.backoffFactor || 2), x(re, this, e.retryOn || [429, 502, 503, 504]), x($t, this, 10), x(Ht, this, 5e3), x(et, this, []), x(Rt, this, 0), x(Et, this, 0);
  }
  /**
   * @param {URL} url
   * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
   * @param {number} attempt
   * @returns {Promise<FetchResponse>}
   */
  fetchWithRetry(e, i, n) {
    var s = this;
    return I(function* () {
      try {
        yield c(tt, s, oi).call(s);
        var r = yield fetch(e, {
          headers: i
        });
        if (r.ok)
          return r;
        if (a(re, s).includes(r.status) && n < a(ht, s)) {
          var o = c(tt, s, Te).call(s, n, r);
          return console.log("Attempt ".concat(n + 1, "/").concat(a(ht, s), " failed with ").concat(r.status, ". Retrying in ").concat(o, "ms")), yield c(tt, s, Xt).call(s, o), s.fetchWithRetry(e, i, n + 1);
        }
        throw new Error("".concat(r.status, " ").concat(r.statusText));
      } catch (h) {
        if (n >= a(ht, s)) {
          var l = "";
          throw h instanceof Error && (l = h.message), new Error("Request failed after ".concat(a(ht, s), " attempts: ").concat(l));
        }
        if (n < a(ht, s)) {
          var u = c(tt, s, Te).call(s, n);
          return console.log("Network error on attempt ".concat(n + 1, ". Retrying in ").concat(u, "ms")), yield c(tt, s, Xt).call(s, u), s.fetchWithRetry(e, i, n + 1);
        }
        throw h;
      }
    })();
  }
  resetCounter() {
    x(et, this, []), x(Rt, this, 0), x(Et, this, 0);
  }
}
function Ne() {
  var t = Date.now();
  x(et, this, a(et, this).filter((e) => t - e < a(Ht, this)));
}
function oi() {
  return ge.apply(this, arguments);
}
function ge() {
  return ge = I(function* () {
    var t;
    if (c(tt, this, Ne).call(this), a(et, this).length >= a($t, this)) {
      var e = a(et, this)[0], i = Date.now() - e;
      if (i < a(Ht, this)) {
        var n = 500 * a(et, this).length - a($t, this);
        n < 0 && (n = 0, console.warn("Wait time is less than 0")), console.log("Rate limit prevention: ".concat(a(et, this).length, " requests in last ").concat(a(Ht, this), "ms. Waiting ").concat(n, "ms...")), yield c(tt, this, Xt).call(this, n), c(tt, this, Ne).call(this);
      }
    }
    a(et, this).push(Date.now()), x(Rt, this, (t = a(Rt, this), t++, t));
    var s = Date.now(), r = s - a(Et, this), o = 100;
    r < o && a(Et, this) > 0 && (yield c(tt, this, Xt).call(this, o - r)), x(Et, this, Date.now());
  }), ge.apply(this, arguments);
}
function Te(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i = e == null ? void 0 : e.headers.get("Retry-After");
  if (i) {
    var n = parseInt(i);
    if (n > 86400) {
      var s = parseInt(i) * 1e3;
      return Math.max(0, s - Date.now());
    }
    return n * 1e3;
  }
  var r = a(pe, this) * Math.pow(a(ve, this), t), o = Math.random() * 1e3;
  return Math.min(r + o, a(_e, this));
}
function Xt(t) {
  return new Promise((e) => setTimeout(e, t));
}
var B = function() {
  this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = !0, this._fetcher = new ri({
    maxRetries: 5,
    initialDelay: 5e3
  });
};
B.prototype.ZOTERO_API_VERSION = "3";
B.prototype.USER_AGENT = "AscDesktopEditor";
B.prototype.DEFAULT_FORMAT = "csljson";
B.prototype.STORAGE_KEYS = {
  USER_ID: "zoteroUserId",
  API_KEY: "zoteroApiKey"
};
B.prototype.API_PATHS = {
  USERS: "users",
  GROUPS: "groups",
  ITEMS: "items",
  KEYS: "keys"
};
B.prototype._getBaseUrl = function() {
  return this._isOnlineAvailable ? jt.restApiUrl : jt.desktopApiUrl;
};
B.prototype._getDesktopRequest = function(t) {
  var e = this;
  return new Promise(function(i, n) {
    window.AscSimpleRequest.createRequest({
      url: t,
      method: "GET",
      headers: {
        "Zotero-API-Version": e.ZOTERO_API_VERSION,
        "User-Agent": e.USER_AGENT
      },
      complete: i,
      error: function(r) {
        r.statusCode === -102 && (r.statusCode = 404, r.message = "Connection to Zotero failed. Make sure Zotero is running"), n(r);
      }
    });
  });
};
B.prototype._getOnlineRequest = function(t) {
  var e = {
    "Zotero-API-Version": this.ZOTERO_API_VERSION,
    "Zotero-API-Key": this._apiKey || ""
  };
  return fetch(t, {
    headers: e
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
B.prototype._getRequestWithOfflineSupport = function(t) {
  return this._isOnlineAvailable ? this._getOnlineRequest(t) : this._getDesktopRequest(t.href);
};
B.prototype._buildGetRequest = function(t, e) {
  e = e || {};
  var i = new URL(t, this._getBaseUrl());
  return Object.keys(e).forEach(function(n) {
    e[n] !== void 0 && e[n] !== null && i.searchParams.append(n, e[n]);
  }), this._getRequestWithOfflineSupport(i);
};
B.prototype._parseLinkHeader = function(t) {
  var e = {}, i = /<(.*?)>; rel="(.*?)"/g;
  if (!t) return e;
  for (var n; (n = i.exec(t.trim())) !== null; )
    e[n[2]] = n[1];
  return e;
};
B.prototype._parseDesktopItemsResponse = function(t, e) {
  return t.then(function(i) {
    return {
      items: JSON.parse(i.responseText),
      id: e
    };
  });
};
B.prototype._parseItemsResponse = function(t, e) {
  var i = this;
  return t.then(function(n) {
    return Promise.all([n.json(), n]);
  }).then(function(n) {
    var s = n[0], r = n[1], o = i._parseLinkHeader(r.headers.get("Link") || ""), l = {
      items: s,
      id: e
    };
    return typeof s == "object" && s.items && (l.items = s.items), o.next && (l.next = function() {
      return i._parseItemsResponse(i._getOnlineRequest(new URL(o.next)), e);
    }), l;
  });
};
B.prototype._parseResponse = function(t, e) {
  if (this._isOnlineAvailable) {
    var i = (
      /** @type {Promise<FetchResponse>} */
      t
    );
    return this._parseItemsResponse(i, e);
  } else {
    var n = (
      /** @type {Promise<AscSimpleResponse>} */
      t
    );
    return this._parseDesktopItemsResponse(
      /** @type {Promise<AscSimpleResponse>} */
      n,
      e
    );
  }
};
B.prototype.getItems = function(t, e, i) {
  var n = this;
  i = i || n.DEFAULT_FORMAT;
  var s = {
    format: i,
    itemType: "-attachment"
    // skip attachments (pdf, docx, etc.)
  };
  t ? s.q = t : e ? s.itemKey = e.join(",") : (s.limit = 20, this._isOnlineAvailable || (s.format = "json"));
  var r = n.API_PATHS.USERS + "/" + n._userId + "/" + n.API_PATHS.ITEMS, o = n._buildGetRequest(r, s);
  return n._parseResponse(o, n._userId);
};
B.prototype.getGroupItems = function(t, e, i, n) {
  var s = this;
  n = n || s.DEFAULT_FORMAT;
  var r = (
    /** @type {{format: string, q?: string, itemKey?: string}} */
    {
      format: n
    }
  );
  t ? r.q = t : i && (r.itemKey = i.join(","));
  var o = s.API_PATHS.GROUPS + "/" + e + "/" + s.API_PATHS.ITEMS, l = s._buildGetRequest(o, r);
  return s._parseResponse(l, e);
};
B.prototype.getUserGroups = function() {
  var t = this;
  return new Promise(function(e, i) {
    if (t._userGroups.length > 0) {
      e(t._userGroups);
      return;
    }
    var n = t.API_PATHS.USERS + "/" + t._userId + "/groups";
    t._buildGetRequest(n).then(function(s) {
      if (t._isOnlineAvailable) {
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
      t._userGroups = s.map(function(r) {
        return {
          id: r.id,
          name: r.data.name
        };
      }), e(t._userGroups);
    }).catch(i);
  });
};
B.prototype.setApiKey = function(t) {
  var e = this, i = this.API_PATHS.KEYS + "/" + t;
  return this._buildGetRequest(i).then(function(n) {
    var s = (
      /** @type {FetchResponse} */
      n
    );
    if (!s.ok)
      throw new Error(s.status + " " + s.statusText);
    return s.json();
  }).then(function(n) {
    return e._saveSettings(n.userID, t), !0;
  });
};
B.prototype._applySettings = function(t, e) {
  this._userId = t, this._apiKey = e;
};
B.prototype._saveSettings = function(t, e) {
  this._applySettings(t, e), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(t)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, e);
};
B.prototype.hasSettings = function() {
  var t = localStorage.getItem(this.STORAGE_KEYS.USER_ID), e = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
  return t && e ? (this._applySettings(Number(t), e), !0) : !1;
};
B.prototype.clearSettings = function() {
  localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
};
B.prototype.getUserId = function() {
  return this._userId;
};
B.prototype.setIsOnlineAvailable = function(t) {
  this._isOnlineAvailable = t;
};
function yt(t, e) {
  var i = this;
  if (e = e || {}, typeof t == "string") {
    var n = document.getElementById(t);
    n instanceof HTMLInputElement && (t = n);
  }
  if (t instanceof HTMLInputElement)
    this.input = t;
  else
    throw new Error("Invalid input element");
  this._container = document.createElement("div"), this._options = {
    type: e.type || t.type || "text",
    placeholder: e.placeholder || t.placeholder || "",
    value: e.value || t.value || "",
    autofocus: e.autofocus || !1,
    disabled: e.disabled || !1,
    readonly: e.readonly || !1,
    required: e.required || !1,
    showCounter: e.showCounter || !1,
    showClear: e.showClear !== void 0 ? e.showClear : !0,
    autocomplete: e.autocomplete || "off"
  };
  for (var s in e)
    this._options.hasOwnProperty(s) || (this._options[s] = e[s]);
  this._id = t.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = !1, this.isValid = !0, this._validationMessage = "", this._subscribers = [], this._boundHandles = {
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
yt.prototype = {
  constructor: yt,
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
    var e = this.input.parentNode, i = document.createDocumentFragment();
    i.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
    var n = document.createElement("div");
    this._container.appendChild(n), n.className += " input-field", this._options.disabled && (n.className += " input-field-disabled");
    var s = document.createElement("div");
    if (n.appendChild(s), s.className += " input-field-main", this.input.className += " input-field-element i18n", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = !0), this._options.readonly && (this.input.readOnly = !0), this._options.required && (this.input.required = !0), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
      this._counter = document.createElement("div"), n.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
      var r = document.createElement("span");
      r.textContent = "/", this._counter.appendChild(r), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
    }
    n.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', s.appendChild(this._searchIcon)), e && e.insertBefore(i, this.input), s.appendChild(this.input);
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
  _handleFocus: function(e) {
    this.isFocused = !0, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(e);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleBlur: function(e) {
    this.isFocused = !1;
    for (var i = this._container.className.split(" "), n = [], s = 0; s < i.length; s++)
      i[s] !== "input-field-focused" && n.push(i[s]);
    this._container.className = n.join(" "), this.validate(), this._triggerBlurEvent(e);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleInput: function(e) {
    this._updateClearButton(), this._updateCounter(), this._triggerInputEvent(e);
  },
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown: function(e) {
    var i = e.key || e.keyCode;
    (i === "Escape" || i === 27) && this._options.showClear && (this.clear(), e.preventDefault()), (i === "Enter" || i === 13) && this._triggerSubmit();
  },
  /**
   * @private
   */
  _updateClearButton: function() {
    if (this._clearButton) {
      var e = this.input.value.length > 0;
      this._clearButton.style.display = e ? "block" : "none";
    }
  },
  /**
   * @private
   */
  _updateCounter: function() {
    if (this._counter && this._options.maxLength) {
      var e = this.input.value.length, i = this._options.maxLength;
      if (this._counterCurrent && (this._counterCurrent.textContent = String(e)), this._counterMax && (this._counterMax.textContent = String(i)), e > i * 0.9) {
        var n = this._counter.className.split(" ");
        n.indexOf("input-field-counter-warning") === -1 && (this._counter.className += " input-field-counter-warning");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(s) {
          return s !== "input-field-counter-warning";
        }).join(" ");
      if (e > i) {
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
    var e = this.input.value, i = !0, n = "";
    if (this._options.required && !e.trim() ? (i = !1, n = "This field is required") : this._options.minLength && e.length < this._options.minLength ? (i = !1, n = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && e.length > this._options.maxLength ? (i = !1, n = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(e) && (i = !1, n = "Invalid format"), i && typeof this._options.validation == "function") {
      var s = this._options.validation(e);
      s && !s.isValid && (i = !1, n = s.message || "Invalid value");
    }
    return this.isValid = i, this._validationMessage = n, this.updateValidationState(), i;
  },
  updateValidationState: function() {
    if (this.isValid)
      if (this.input.value.length > 0) {
        this._validationElement.style.display = "none";
        var e = this._container.className.split(" ");
        e.indexOf("input-field-valid") === -1 && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(n) {
          return n !== "input-field-invalid";
        }).join(" ");
      } else
        this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(i) {
          return i !== "input-field-valid" && i !== "input-field-invalid";
        }).join(" ");
    else {
      this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block";
      var e = this._container.className.split(" ");
      e.indexOf("input-field-invalid") === -1 && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(i) {
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
  setValue: function(e) {
    this.input.value = e, this._updateState(), this._triggerChange();
  },
  /**
   * @param {string} value
   */
  setPlaceholder: function(e) {
    this.input.placeholder = e, this._options.placeholder = e;
  },
  /**
   * @param {boolean} [bFocus]
   */
  clear: function(e) {
    e = e !== void 0 ? e : !0, this.setValue(""), e && this.input.focus();
  },
  focus: function() {
    this.input.focus();
  },
  blur: function() {
    this.input.blur();
  },
  enable: function() {
    this.input.disabled = !1, this._options.disabled = !1, this._container.className = this._container.className.split(" ").filter(function(e) {
      return e !== "input-field-disabled";
    }).join(" ");
  },
  disable: function() {
    this.input.disabled = !0, this._options.disabled = !0;
    var e = this._container.className.split(" ");
    e.indexOf("input-field-disabled") === -1 && (this._container.className += " input-field-disabled");
  },
  /**
   * @param {function(InputEventType): void} callback
   * @returns {Object}
   */
  subscribe: function(e) {
    var i = this;
    return this._subscribers.push(e), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== e;
        });
      }
    };
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerInputEvent: function(e) {
    var i = {
      value: this.input.value,
      originalEvent: e
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
  _triggerFocusEvent: function(e) {
    var i = {
      value: this.input.value,
      originalEvent: e
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
  _triggerBlurEvent: function(e) {
    var i = {
      value: this.input.value,
      originalEvent: e
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
    var e = {
      value: this.input.value,
      isValid: this.isValid
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:change",
        detail: e
      });
    });
  },
  /**
   * @private
   */
  _triggerSubmit: function() {
    var e = {
      value: this.input.value,
      isValid: this.isValid
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:submit",
        detail: e
      });
    });
  },
  destroy: function() {
    if (this._subscribers = [], this._boundHandles)
      try {
        this.input.removeEventListener("focus", this._boundHandles.focus), this.input.removeEventListener("blur", this._boundHandles.blur), this.input.removeEventListener("input", this._boundHandles.input), this.input.removeEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.removeEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.removeEventListener("click", this._boundHandles.search), this.input.removeEventListener("change", this._boundHandles.validate);
      } catch (e) {
        console.error(e);
      }
    this._container.innerHTML = "", this._container.className = this._container.className.split(" ").filter(function(e) {
      return e !== "input-field-container";
    }).join(" ");
  }
};
function Pt(t, e) {
  if (typeof t == "string") {
    var i = document.getElementById(t);
    i instanceof HTMLElement && (t = i);
  }
  if (t instanceof HTMLElement)
    this.container = t;
  else
    throw new Error("Invalid container element");
  this._options = Object.assign(this._options, e), this._isShow = !1;
}
Pt.prototype = {
  constructor: Pt,
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
    var e = document.createElement("div");
    e.className = "message message-" + this._options.type, e.setAttribute("role", "alert");
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
    if (e.innerHTML = '<div class="message-content"><span class="message-title">' + i + '</span><span class="message-text">' + n + "</span></div>", this._options.closeButton) {
      var s = document.createElement("button");
      s.className = "message-close", s.textContent = "×", s.setAttribute("aria-label", "Close"), s.onclick = this.close.bind(this), e.appendChild(s);
    }
    return e;
  },
  addOutsideClickListener: function() {
    this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
    var e = this;
    this._outsideClickListener = function(i) {
      i.target instanceof HTMLElement && e._element && !e._element.contains(i.target) && e.close();
    }, setTimeout(function() {
      e._outsideClickListener && document.addEventListener("click", e._outsideClickListener);
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
  show: function(e, i) {
    if (this._isShow)
      return this;
    this._isShow = !0, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), i && (this._options.title = i), e && (this._options.text = e);
    var n = this._create();
    return this._element = n, this.container.appendChild(n), setTimeout(function() {
      n.style.opacity = "1", n.style.transform = "translateY(0)";
    }, 10), this._options.autoClose && Number(this._options.duration) > 0 && (this._timeoutId = setTimeout(this.close.bind(this), this._options.duration)), this._options.closeOnClickOutside && this.addOutsideClickListener(), this;
  },
  close: function() {
    if (this._isShow = !1, !(!this._element || !this._element.parentNode)) {
      this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null), this.removeOutsideClickListener();
      var e = this._element;
      e.style.opacity = "0", e.style.transform = "translateY(-20px)", setTimeout(function() {
        e.parentNode && e.parentNode.removeChild(e);
      }, 300);
    }
  }
};
function Y(t, e) {
  var i = this;
  if (typeof t == "string") {
    var n = document.getElementById(t);
    n instanceof HTMLButtonElement && (t = n);
  }
  if (t instanceof HTMLButtonElement)
    this._button = t;
  else
    throw new Error("Invalid button");
  this._container = document.createElement("div"), this._options = e || {}, this._options.text = this._options.text || t.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = !1, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = {
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
Y.prototype = /** @lends Button.prototype */
{
  constructor: Y,
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
    var e = this._button.parentNode, i = document.createDocumentFragment();
    if (i.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = !0), this._options.text)
      if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
        var n = document.createElement("span");
        n.className = "custom-button-icon", this._options.iconPosition === "left" ? (n.className += " custom-button-icon-left", this._button.appendChild(n), this._button.appendChild(this._buttonText)) : (n.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n)), n.innerHTML = this._options.icon;
      } else
        this._button.appendChild(this._buttonText);
    this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), e && e.insertBefore(i, this._button), this._container.appendChild(this._button);
  },
  /** @private */
  _bindEvents: function() {
    this._button.addEventListener("click", this._boundHandles.click), this._button.addEventListener("mouseenter", this._boundHandles.mouseenter), this._button.addEventListener("mouseleave", this._boundHandles.mouseleave), this._button.addEventListener("focus", this._boundHandles.focus), this._button.addEventListener("blur", this._boundHandles.blur), this._button.addEventListener("keydown", this._boundHandles.keydown);
  },
  /**
   * @param {Event} e
   * @private
   */
  _handleClick: function(e) {
    if (this._options.disabled || this.isLoading) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.triggerClickEvent(e);
  },
  /** @private */
  _handleMouseEnter: function() {
    var e = this._button.className.split(" ");
    e.indexOf("custom-button-hover") === -1 && (this._button.className += " custom-button-hover"), this.triggerEvent("mouseenter");
  },
  /** @private */
  _handleMouseLeave: function() {
    this._button.className = this._button.className.split(" ").filter(function(e) {
      return e !== "custom-button-hover";
    }).join(" "), this.triggerEvent("mouseleave");
  },
  /** @private */
  _handleFocus: function() {
    var e = this._button.className.split(" ");
    e.indexOf("custom-button-focused") === -1 && (this._button.className += " custom-button-focused"), this.triggerEvent("focus");
  },
  /** @private */
  _handleBlur: function() {
    this._button.className = this._button.className.split(" ").filter(function(e) {
      return e !== "custom-button-focused";
    }).join(" "), this.triggerEvent("blur");
  },
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown: function(e) {
    var i = e.key || e.keyCode;
    i === " " || i === "Enter" || i === 32 || i === 13 ? this._button.tagName === "BUTTON" || (e.preventDefault(), this._button.click()) : (i === "Escape" || i === 27) && this._button.blur(), this.triggerEvent("keydown", {
      key: i
    });
  },
  /** @param {function(InputEventType): void} callback */
  subscribe: function(e) {
    var i = this;
    return this._subscribers.push(e), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== e;
        });
      }
    };
  },
  /** @param {ButtonOptionsType['text']} text */
  setText: function(e) {
    typeof e > "u" || (this._options.text = e, this._buttonText || (this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = "", this._button.appendChild(this._buttonText)), this._buttonText.textContent = e);
  },
  /**
   * @param {string} icon
   * @param {ButtonOptionsType['iconPosition']} position
   */
  setIcon: function(e, i) {
    this._options.icon = e, this._options.iconPosition = i || "left";
  },
  /** @param {ButtonOptionsType['badge']} badge */
  setBadge: function(e) {
    typeof e > "u" || (this._options.badge = e, this._badgeElement && (this._badgeElement.textContent = e, this._badgeElement.style.display = e ? "flex" : "none"));
  },
  /** @param {ButtonOptionsType['variant']} variant */
  setVariant: function(e) {
    if (!(typeof e > "u")) {
      var i = "custom-button-" + this._options.variant, n = "custom-button-" + e;
      this._button.className = this._button.className.split(" ").filter(function(s) {
        return s !== i;
      }).join(" ") + " " + n, this._options.variant = e;
    }
  },
  /** @param {ButtonOptionsType['size']} size */
  setSize: function(e) {
    if (!(typeof e > "u")) {
      var i = "custom-button-" + this._options.size, n = "custom-button-" + e;
      this._button.className = this._button.className.split(" ").filter(function(s) {
        return s !== i;
      }).join(" ") + " " + n, this._options.size = e;
    }
  },
  enable: function() {
    this._options.disabled = !1, this._button.disabled = !1, this._button.className = this._button.className.split(" ").filter(function(e) {
      return e !== "custom-button-disabled";
    }).join(" ");
  },
  disable: function() {
    this._options.disabled = !0, this._button.disabled = !0;
    var e = this._button.className.split(" ");
    e.indexOf("custom-button-disabled") === -1 && (this._button.className += " custom-button-disabled");
  },
  startLoading: function() {
    this.isLoading = !0, typeof this._options.text < "u" && (this._originalText = this._options.text);
    var e = this._container.className.split(" ");
    e.indexOf("custom-button-loading") === -1 && (this._container.className += " custom-button-loading"), this._spinner && (this._spinner.style.display = "inline-block"), this._buttonText && (this._buttonText.textContent = "Loading..."), this._button.disabled = !0;
  },
  stopLoading: function() {
    this.isLoading = !1, this._container.className = this._container.className.split(" ").filter(function(e) {
      return e !== "custom-button-loading";
    }).join(" "), this._spinner && (this._spinner.style.display = "none"), this._buttonText && (this._buttonText.textContent = this._originalText), this._button.disabled = !!this._options.disabled;
  },
  /** @param {ButtonOptionsType['tooltip']} tooltip */
  setTooltip: function(e) {
    typeof e > "u" || (this._options.tooltip = e, this._button.title = e || "");
  },
  /** @param {Event} e */
  triggerClickEvent: function(e) {
    var i = {
      originalEvent: e,
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
  triggerEvent: function(e, i) {
    i = i || {}, i.button = this, this._subscribers.forEach(function(n) {
      n({
        type: "button:" + e,
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
    var e = this._container.className.split(" ").filter(function(i) {
      return i !== "custom-button-container";
    }).join(" ");
    this._container.className = e;
  }
};
var O = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap(), Z = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakSet();
class Me {
  /**
   * Create a Radio instance
   * @constructor
   * @param {string | HTMLInputElement} radio
   * @param {RadioOptionsType} options
   * @throws {Error} If invalid input element
   */
  constructor(e, i) {
    if (st(this, D), R(this, O, void 0), R(this, U, void 0), R(this, Bt, void 0), R(this, Z, null), R(this, m, void 0), R(this, vt, /* @__PURE__ */ new Map()), R(this, Ct, []), typeof e == "string") {
      var n = document.getElementById(e);
      n instanceof HTMLInputElement && (e = n);
    }
    if (!(e instanceof HTMLInputElement))
      throw new Error("Invalid input element");
    if (x(U, this, e), x(m, this, Object.assign({
      id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
      checked: !1,
      disabled: !1,
      indeterminate: !1,
      label: "",
      name: "",
      value: "on"
    }, i)), c(D, this, ai).call(this), x(O, this, document.createElement("div")), x(Bt, this, document.createElement("span")), c(D, this, li).call(this), c(D, this, ci).call(this), c(D, this, oe).call(this), !a(m, this).name)
      throw new Error("Name attribute is required");
    var s = kt._.get(a(m, this).name);
    s || (s = new Array(), kt._.set(a(m, this).name, s)), s.push(this);
  }
  /**
   * @param {function(RadioEventType): void} callback
   * @returns {Object}
   */
  subscribe(e) {
    var i = this;
    return a(Ct, this).push(e), {
      unsubscribe: function() {
        x(Ct, i, a(Ct, i).filter(function(s) {
          return s !== e;
        }));
      }
    };
  }
  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return a(O, this);
  }
  /** @param {boolean} [bSilent] */
  check(e) {
    if (!(a(m, this).disabled || a(m, this).checked)) {
      if (a(m, this).name) {
        var i = kt._.get(a(m, this).name);
        i && i.forEach((n) => {
          n !== this && a(m, n).checked && n.uncheck();
        });
      }
      a(m, this).checked = !0, c(D, this, oe).call(this), !e && c(D, this, Fe).call(this);
    }
  }
  /** @param {boolean} [bSilent] */
  uncheck(e) {
    a(m, this).disabled || !a(m, this).checked || (a(m, this).checked = !1, c(D, this, oe).call(this), !e && c(D, this, Fe).call(this));
  }
  enable() {
    a(m, this).disabled && (a(m, this).disabled = !1, a(U, this).disabled = !1, a(O, this).setAttribute("aria-disabled", "false"), a(m, this).checked ? a(O, this).tabIndex = 0 : c(D, this, Ce).call(this), a(O, this).classList.remove("radio--disabled"));
  }
  disable() {
    a(m, this).disabled || (a(m, this).disabled = !0, a(U, this).disabled = !0, a(O, this).setAttribute("aria-disabled", "true"), a(O, this).tabIndex = -1, a(O, this).classList.add("radio--disabled"));
  }
  /** @param {string} label */
  setLabel(e) {
    a(m, this).label = e, a(Z, this) ? a(Z, this).textContent = e : e && (x(Z, this, document.createElement("label")), a(Z, this).className = "radio-label", a(Z, this).htmlFor = String(a(m, this).id), a(Z, this).textContent = e, a(O, this).appendChild(a(Z, this)));
  }
  /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
  getState() {
    return {
      checked: !!a(m, this).checked,
      disabled: !!a(m, this).disabled,
      value: a(m, this).value || "",
      name: a(m, this).name || ""
    };
  }
  destroy() {
    if (x(Ct, this, []), !!a(m, this).name) {
      var e = kt._.get(a(m, this).name);
      if (e) {
        var i = e.indexOf(this);
        i >= 0 && e.splice(i, 1);
      }
      a(vt, this).forEach((n, s) => {
        a(O, this).removeEventListener(s, n);
      }), a(vt, this).clear(), a(O, this) && a(O, this).parentNode && a(O, this).parentNode.removeChild(a(O, this)), x(Z, this, null);
    }
  }
}
function ai() {
  a(U, this).type = "radio";
  var t = a(U, this).getAttribute("id"), e = a(U, this).getAttribute("name"), i = a(U, this).getAttribute("value"), n = a(U, this).getAttribute("checked"), s = a(U, this).getAttribute("disabled");
  t !== null ? a(m, this).id = t : a(m, this).id && a(U, this).setAttribute("id", a(m, this).id), e !== null ? a(m, this).name = e : a(m, this).name && a(U, this).setAttribute("name", a(m, this).name), i !== null ? a(m, this).value = i : a(m, this).value && a(U, this).setAttribute("value", a(m, this).value), n !== null ? a(m, this).checked = n === "true" : a(m, this).checked && a(U, this).setAttribute("checked", "true"), s !== null ? a(m, this).disabled = s === "true" : a(m, this).disabled && a(U, this).setAttribute("disabled", "true");
}
function li() {
  var t = a(U, this).parentNode, e = document.createDocumentFragment();
  e.appendChild(a(O, this)), a(O, this).classList.add("radio-button-container"), a(O, this).setAttribute("role", "radio"), a(O, this).setAttribute("aria-checked", String(!!a(m, this).checked)), a(O, this).setAttribute("aria-disabled", String(!!a(m, this).disabled)), a(O, this).tabIndex = a(m, this).disabled ? -1 : 0, a(Bt, this).className = "radio-visual", a(Bt, this).setAttribute("aria-hidden", "true"), a(m, this).label && (x(Z, this, document.createElement("label")), a(Z, this).className = "i18n radio-label", a(Z, this).htmlFor = String(a(m, this).id), a(Z, this).textContent = a(m, this).label), a(m, this).disabled && a(O, this).classList.add("radio--disabled"), t && t.insertBefore(e, a(U, this)), a(O, this).appendChild(a(U, this)), a(O, this).appendChild(a(Bt, this)), a(Z, this) && a(O, this).appendChild(a(Z, this)), c(D, this, Ce).call(this);
}
function Ce() {
  if (a(m, this).checked)
    a(O, this).tabIndex = a(m, this).disabled ? -1 : 0;
  else if (a(m, this).name && kt._.has(a(m, this).name)) {
    var t = kt._.get(a(m, this).name), e = !1;
    t && t.forEach((i) => {
      a(m, i).checked && i !== this && (e = !0);
    }), !e && !a(m, this).checked && !a(m, this).disabled ? a(O, this).tabIndex = 0 : a(O, this).tabIndex = -1;
  }
}
function ci() {
  var t = (s) => {
    s.preventDefault(), !a(m, this).disabled && !a(m, this).checked && (this.check(), a(O, this).focus());
  }, e = (s) => {
    if (!a(m, this).disabled)
      switch (s.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          s.preventDefault(), a(m, this).checked || this.check();
          break;
      }
  }, i = () => {
    a(O, this).classList.add("radio--focused");
  }, n = () => {
    a(O, this).classList.remove("radio--focused");
  };
  a(vt, this).set("click", t), a(vt, this).set("keydown", e), a(vt, this).set("focus", i), a(vt, this).set("blur", n), a(O, this).addEventListener("click", t), a(O, this).addEventListener("keydown", e), a(O, this).addEventListener("focus", i), a(O, this).addEventListener("blur", n);
}
function oe() {
  a(O, this).setAttribute("aria-checked", String(!!a(m, this).checked)), a(O, this).classList.toggle("radio--checked", a(m, this).checked), a(U, this).checked = !!a(m, this).checked, c(D, this, Ce).call(this);
}
function Fe(t) {
  var e = this.getState(), i = {
    type: "radio:change",
    detail: e
  };
  t && (i.originalEvent = t), a(Ct, this).forEach(function(n) {
    n(i);
  });
}
var kt = {
  _: /* @__PURE__ */ new Map()
};
function Qt(t, e) {
  if (typeof t == "string") {
    var i = document.getElementById(t);
    i instanceof HTMLInputElement && (t = i);
  }
  if (!(t instanceof HTMLInputElement))
    throw new Error("Invalid input element");
  this._options = Object.assign({
    id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
    checked: !1,
    disabled: !1,
    indeterminate: !1,
    label: "",
    name: "",
    value: "on"
  }, e), this._options.disabled = e.disabled || !1, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(t), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
Qt.prototype = {
  constructor: Qt,
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
  _createDOM: function(e) {
    var i = e.parentNode, n = document.createDocumentFragment();
    this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = e;
    var s = this._input.getAttribute("id");
    s !== null ? this._options.id = s : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = !0), this._options.indeterminate && (this._input.indeterminate = !0), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
    var r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg");
    o.setAttribute("viewBox", "0 0 10 8"), o.setAttribute("class", "checkbox-checkmark");
    var l = document.createElementNS(r, "path");
    l.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), l.setAttribute("fill", "none"), l.setAttribute("stroke", "currentColor"), l.setAttribute("stroke-width", "2"), o.appendChild(l), this._visualCheckbox.appendChild(o);
    var u = document.createElement("span");
    if (u.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(u), this._options.label)
      this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var h = document.querySelector("label[for='" + this._options.id + "']");
      h instanceof HTMLLabelElement && (this._labelElement = h);
    }
    this._options.disabled && this._container.classList.add("checkbox--disabled"), i && i.insertBefore(n, e), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
  },
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners: function() {
    var e = this;
    if (this._container) {
      var i = function(l) {
        l.preventDefault(), !e._options.disabled && e._container && (e.toggle(), e._container.focus());
      }, n = function(l) {
        if (!e._options.disabled)
          switch (l.key) {
            case " ":
            case "Spacebar":
            case "Enter":
              l.preventDefault(), e.toggle();
              break;
            case "ArrowRight":
            case "ArrowDown":
              l.preventDefault(), !e._options.checked && !e._options.indeterminate && (e._options.checked ? e.setIndeterminate() : e.check());
              break;
            case "ArrowLeft":
            case "ArrowUp":
              l.preventDefault(), (e._options.checked || e._options.indeterminate) && (e._options.indeterminate ? e.uncheck() : e.setIndeterminate());
              break;
          }
      }, s = function() {
        e._container && e._container.classList.add("checkbox--focused");
      }, r = function() {
        e._container && e._container.classList.remove("checkbox--focused");
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
  check: function(e) {
    this._options.disabled || this._options.checked && !this._options.indeterminate || (this._options.checked = !0, this._options.indeterminate = !1, this._updateVisualState(), e || this._triggerChange());
  },
  /**
   * Set checkbox to unchecked state
   * @param {boolean} [bSilent]
   */
  uncheck: function(e) {
    this._options.disabled || !this._options.checked && !this._options.indeterminate || (this._options.checked = !1, this._options.indeterminate = !1, this._updateVisualState(), e || this._triggerChange());
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
  setLabel: function(e) {
    this._options.label = e, this._labelElement ? this._labelElement.textContent = e : e && this._container && (this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = e, this._container.appendChild(this._labelElement)), this._options.title && this._labelElement && this._labelElement.setAttribute("title", e);
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
  subscribe: function(e) {
    var i = this;
    return this._subscribers.push(e), {
      unsubscribe: function() {
        i._subscribers = i._subscribers.filter(function(s) {
          return s !== e;
        });
      }
    };
  },
  /**
   * @param {Event} [e]
   * @private
   */
  _triggerChange: function(e) {
    var i = this.getState(), n = {
      type: "checkbox:change",
      detail: i
    };
    e && (n.originalEvent = e), this._subscribers.forEach(function(s) {
      s(n);
    });
  },
  /**
   * Clean up event listeners and references
   */
  destroy: function() {
    this._subscribers = [], this._handlers.forEach((e, i) => {
      this._container && this._container.removeEventListener(i, e);
    }), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
  }
};
var A = /* @__PURE__ */ new WeakSet();
class mt {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(e, i) {
    if (st(this, A), typeof e == "string") {
      var n = document.getElementById(e);
      if (n instanceof HTMLSelectElement)
        e = n;
      else if (n instanceof HTMLElement)
        this._container = n;
      else
        throw new Error("Invalid selectbox");
    } else e instanceof HTMLElement && (this._container = e);
    if (e instanceof HTMLSelectElement)
      this._selectbox = e, this._container = document.createElement("div");
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
        c(A, this, Je).call(this, s);
      },
      search: (s) => {
        c(A, this, di).call(this, s);
      },
      close: (s) => {
        s.target instanceof HTMLElement && !this._container.contains(s.target) && !s.target.classList.contains("selectbox-option") && c(A, this, nt).call(this);
      },
      keydown: (s) => {
        c(A, this, fi).call(this, s);
      },
      dropdownClick: (s) => {
        c(A, this, pi).call(this, s);
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), c(A, this, ui).call(this), c(A, this, hi).call(this), c(A, this, It).call(this), ye._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(e) {
      return function() {
        e.searchInput && e.searchInput.focus();
      };
    })(this), 100), c(A, this, It).call(this);
  }
  /**
   * @param {function(SelectboxEventType): void} callback
   * @returns {Object}
   */
  subscribe(e) {
    var i = this;
    return this._subscribers.push(e), {
      unsubscribe() {
        i._subscribers = i._subscribers.filter(function(n) {
          return n !== e;
        });
      }
    };
  }
  /**
   * @param {string} value
   * @param {string} text
   * @param {boolean} selected
   */
  addItem(e, i, n) {
    n = n || !1;
    var s = this._items.some((o) => o && o.value === e);
    if (s) {
      var r = this._items.find((o) => o && o.value === e);
      r && (r.selected = n);
    } else
      this._items.push({
        value: e,
        text: i,
        selected: n
      }), this._options.sortable && this._items.sort((o, l) => o && l ? o.text.localeCompare(l.text) : o ? -1 : l ? 1 : 0);
    n && (this._options.multiple ? this._selectedValues.add(e) : (this._selectedValues.clear(), this._selectedValues.add(e))), c(A, this, lt).call(this);
  }
  /**
   * @param {Array<[string,string]>} values
   * @param {string} [selectedValue]
   */
  addItems(e, i) {
    var n = this;
    e.forEach(function(s, r) {
      var o = n._items.some((u) => u && u.value === s[0]);
      if (!o) {
        var l = i ? s[0] === i : r === 0;
        l && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(s[0])), n._items.push({
          value: s[0],
          text: s[1],
          selected: l
        });
      }
    }, this), this.isOpen && c(A, this, It).call(this), c(A, this, lt).call(this);
  }
  /**
   * @param {string} value
   * @param {string} text
   */
  addCustomItem(e, i) {
    this._customItems.push({
      value: e,
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
  removeItem(e) {
    this._items = this._items.filter(function(i) {
      return i === null || i.value !== e;
    }), this._customItems = this._customItems.filter(function(i) {
      return i === null || i.value !== e;
    }), this._selectedValues.delete(e), c(A, this, lt).call(this);
  }
  /**
   * @return {null | string}
   */
  getSelectedValue() {
    if (this._options.multiple)
      return console.error("Method getSelectedValue is only available for single-select boxes."), null;
    var e = Array.from(this._selectedValues);
    return e.length > 0 ? e[0] : null;
  }
  /**
   * @return {null | string | Array<string>}
   */
  getSelectedValues() {
    if (this._options.multiple)
      return Array.from(this._selectedValues);
    var e = Array.from(this._selectedValues);
    return e.length > 0 ? e[0] : null;
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  selectItems(e, i) {
    var n = this;
    if (!this._options.multiple && Array.isArray(e)) {
      console.error("Method selectItem is only available for multi-select boxes.");
      return;
    }
    var s = "";
    if (this._options.multiple) {
      var r = function(v) {
        if (n._optionsContainer) {
          var g = n._optionsContainer.querySelector('[data-value="' + v + '"]');
          if (g) {
            var y = g.querySelector('input[type="checkbox"]');
            y && y instanceof HTMLInputElement && (y.checked = !0), g.classList.add("selectbox-option-selected"), g.classList.add("checkbox--checked");
          }
        }
      };
      if (Array.isArray(e))
        for (var o = 0; o < e.length; o++)
          s = e[o], this._selectedValues.has(s) || (this._selectedValues.add(s), r(s));
      else
        s = e, this._selectedValues.has(s) || (this._selectedValues.add(s), r(s));
    } else if (!Array.isArray(e)) {
      if (s = e, this._selectedValues.clear(), this._selectedValues.add(s), this._optionsContainer) {
        var l = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + s + '"]');
        l.forEach(function(h) {
          h.classList.remove("selectbox-option-selected"), h.classList.remove("checkbox--checked");
        });
        var u = this._optionsContainer.querySelector('[data-value="' + s + '"]');
        u && (u.classList.add("selectbox-option-selected"), u.classList.add("checkbox--checked"));
      }
      c(A, this, nt).call(this);
    }
    c(A, this, lt).call(this), !i && c(A, this, te).call(this, s, !0);
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  unselectItems(e, i) {
    var n = this;
    if (!this._options.multiple) {
      console.error("Method unselectItem is only available for multi-select boxes.");
      return;
    }
    var s = "", r = function(u) {
      if (n._optionsContainer) {
        var h = n._optionsContainer.querySelector('[data-value="' + u + '"]');
        if (h) {
          var v = h.querySelector('input[type="checkbox"]');
          v && v instanceof HTMLInputElement && (v.checked = !1), h.classList.remove("selectbox-option-selected"), h.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(e))
      for (var o = 0; o < e.length; o++)
        s = e[o], this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    else
      s = e, this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    c(A, this, lt).call(this), !i && c(A, this, te).call(this, s, !0);
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
  clear(e) {
    if (e = e || !1, this._selectedValues.clear(), e && this._items.length > 0) {
      var i = this._items[0];
      i && this._selectedValues.add(i.value);
    }
    c(A, this, lt).call(this), c(A, this, It).call(this);
  }
  destroy() {
    this._subscribers = [], ye._.delete(this);
    try {
      this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
    } catch (s) {
      console.error(s);
    }
    this._container.innerHTML = "";
    for (var e = this._container.className.split(" "), i = [], n = 0; n < e.length; n++)
      e[n] !== "selectbox-container" && i.push(e[n]);
    this._container.className = i.join(" ");
  }
}
function ui() {
  this._container.innerHTML = "", this._container.className += " selectbox-container";
  var t = document.createDocumentFragment();
  if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), t.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text i18n", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._select.appendChild(this._dropdown), this._options.description) {
    var e = document.createElement("div");
    e.className += " i18n selectbox-description", e.textContent = this._options.description, this._dropdown.appendChild(e);
  }
  if (this._options.searchable) {
    var i = document.createElement("div");
    i.className += " selectbox-search", this._dropdown.appendChild(i), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", i.appendChild(this.searchInput);
  }
  if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(t), this._selectbox) {
    var n = this._selectbox.parentNode;
    if (n) {
      n.insertBefore(this._container, this._selectbox);
      var s = c(A, this, _i).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
    }
  }
}
function hi() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(t) {
    t.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function Je(t) {
  if (t && t.stopPropagation(), this.isOpen ? c(A, this, nt).call(this) : this.openDropdown(), t && t.type === "click")
    for (var e of ye._)
      e.isOpen && e !== this && c(A, e, nt).call(e);
}
function nt() {
  this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = !1, this._dropdown.style.display = "none";
  for (var t = this._arrow.className.split(" "), e = [], i = 0; i < t.length; i++)
    t[i] !== "selectbox-arrow-open" && e.push(t[i]);
  this._arrow.className = e.join(" ");
  for (var n = this._header.className.split(" "), s = [], i = 0; i < n.length; i++)
    n[i] !== "selectbox-header-open" && s.push(n[i]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function di(t) {
  var e = t.target;
  if (e instanceof HTMLInputElement) {
    var i = e.value.toLowerCase();
    c(A, this, It).call(this, i);
  }
}
function Re(t) {
  var e = this.searchInput ? this.searchInput.value.toLowerCase() : "", i, n = this._items.filter(function(h) {
    return h !== null;
  });
  if (e && (n = n.filter(function(h) {
    return h.text.toLowerCase().indexOf(e) !== -1;
  })), n.length !== 0) {
    if (t === "up")
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
      var u = (r + 1) % n.length;
      u === n.length && (u = 0), this._selectedValues.clear(), i = n[u], this._selectedValues.add(i.value);
    }
    c(A, this, lt).call(this), c(A, this, It).call(this, e, !0), c(A, this, te).call(this, i.value, !0);
  }
}
function fi(t) {
  var e = t.key || t.keyCode;
  switch (e) {
    case "Enter":
    case 13:
      t.preventDefault(), c(A, this, Je).call(this, t);
      break;
    case "Escape":
    case 27:
      c(A, this, nt).call(this);
      break;
    case "ArrowDown":
    case 40:
      t.preventDefault(), c(A, this, Re).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      t.preventDefault(), c(A, this, Re).call(this, "up");
      break;
    case "Tab":
    case 9:
      c(A, this, nt).call(this);
      break;
  }
}
function It(t, e) {
  if (t = t || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, n = this._items;
    t && (n = n.filter(function(X) {
      return X !== null && X.text.toLowerCase().indexOf(t) !== -1;
    }));
    for (var s = document.createDocumentFragment(), r = 0; r < n.length; r++) {
      var o = n[r];
      if (!o) {
        var l = document.createElement("hr");
        l.className += " selectbox-option-divider", s.appendChild(l);
        continue;
      }
      var u = document.createElement("div");
      u.className += " selectbox-option", this._selectedValues.has(o.value) && (u.className += " selectbox-option-selected checkbox--checked", i = u), u.setAttribute("data-value", o.value);
      var h = document.createElement("label");
      if (h.className += " selectbox-option-text i18n", this._options.translate && (o.text = this._options.translate(o.text)), h.textContent = o.text, this._options.multiple) {
        u.className += " selectbox-option-checkbox";
        var v = document.createElement("input");
        v.type = "checkbox", v.id = "checkbox-" + o.value, v.className += " selectbox-checkbox", v.checked = this._selectedValues.has(o.value), u.appendChild(v);
        var g = document.createElement("span");
        g.className = "checkbox-visual", g.setAttribute("aria-hidden", "true");
        var y = "http://www.w3.org/2000/svg", w = document.createElementNS(y, "svg");
        w.setAttribute("viewBox", "0 0 10 8"), w.setAttribute("class", "checkbox-checkmark");
        var C = document.createElementNS(y, "path");
        C.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), C.setAttribute("fill", "none"), C.setAttribute("stroke", "currentColor"), C.setAttribute("stroke-width", "2"), w.appendChild(C), g.appendChild(w), u.appendChild(g);
      }
      u.appendChild(h), s.appendChild(u);
    }
    if (this._customItems.length) {
      var M = document.createElement("hr");
      M.className += " selectbox-option-divider", s.appendChild(M);
    }
    for (var r = 0; r < this._customItems.length; r++) {
      var N = this._customItems[r], E = document.createElement("label");
      E.className += " selectbox-custom-option", E.setAttribute("data-value", N.value), E.setAttribute("for", N.value);
      var J = document.createElement("span");
      J.className += " selectbox-option-text i18n", this._options.translate && (N.text = this._options.translate(N.text)), J.textContent = N.text, E.appendChild(J), s.appendChild(E);
    }
    if (this._optionsContainer.appendChild(s), e && this.isOpen && this._optionsContainer && i)
      try {
        i.scrollIntoView && i.scrollIntoView({
          block: "nearest"
        });
      } catch (X) {
        console.error(X);
      }
  }
}
function pi(t) {
  var e = t.target || t.srcElement, i = null;
  if (e && e instanceof HTMLElement) {
    for (var n = null, s = e.className.split(" "), r = !1, o = 0; o < s.length; o++)
      if (s[o] === "selectbox-option") {
        r = !0;
        break;
      } else if (s[o] === "selectbox-custom-option") {
        var l = e.getAttribute("data-value");
        if (l) {
          t.stopPropagation(), c(A, this, Be).call(this, l), c(A, this, nt).call(this);
          return;
        }
        break;
      }
    if (r)
      n = e;
    else if (e.parentNode && e.parentNode instanceof HTMLElement) {
      for (var u = e.parentNode.className.split(" "), h = !1, o = 0; o < u.length; o++)
        if (u[o] === "selectbox-option") {
          h = !0;
          break;
        } else if (u[o] === "selectbox-custom-option") {
          var v = e.parentNode.getAttribute("data-value");
          if (v) {
            t.stopPropagation(), c(A, this, Be).call(this, v), c(A, this, nt).call(this);
            return;
          }
          break;
        }
      h && (n = e.parentNode);
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
    this._options.multiple ? this._selectedValues.has(g) ? (this.unselectItems(g, !0), y = !1) : this.selectItems(g, !0) : (this.selectItems(g, !0), c(A, this, nt).call(this)), c(A, this, lt).call(this), c(A, this, te).call(this, g, y);
  }
}
function lt() {
  if (this._selectedValues.size === 0) {
    this._selectedText.textContent = this._options.placeholder;
    return;
  }
  if (this._options.multiple) {
    for (var t = [], e = 0; e < this._items.length; e++) {
      var i = this._items[e];
      i && this._selectedValues.has(i.value) && t.push(i);
    }
    t.length === 0 ? this._selectedText.textContent = this._options.placeholder : t.length === 1 ? this._selectedText.textContent = t[0].text : this._selectedText.textContent = t.length + " items selected";
  } else {
    for (var n = null, e = 0; e < this._items.length; e++) {
      var i = this._items[e];
      if (i && this._selectedValues.has(i.value)) {
        n = i;
        break;
      }
    }
    this._selectedText.textContent = n ? n.text : this._options.placeholder;
  }
}
function te(t, e) {
  for (var i = Array.from(this._selectedValues), n = [], s = 0; s < this._items.length; s++) {
    var r = this._items[s];
    r && this._selectedValues.has(r.value) && n.push(r);
  }
  var o = {
    values: i,
    items: n,
    current: t,
    enabled: e
  };
  this._subscribers.forEach(function(l) {
    l({
      type: "selectbox:change",
      detail: o
    });
  });
}
function Be(t) {
  var e = {
    values: [],
    current: t,
    enabled: !1
  };
  this._subscribers.forEach(function(i) {
    i({
      type: "selectbox:custom",
      detail: e
    });
  });
}
function _i(t) {
  var e = Array.from(t.options).map((s) => [s.value, s.text]), i = {
    values: e
  }, n = t.value;
  return n && (i.selectedValue = n), i;
}
var ye = {
  _: /* @__PURE__ */ new Set()
}, gt = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakSet();
class it {
  /**
   * @param {string} containerId
   * @param {string} text
   */
  constructor(e, i) {
    st(this, He), R(this, gt, void 0);
    var n = document.getElementById(e);
    if (!(n instanceof HTMLElement)) throw new Error("Invalid container");
    x(gt, this, n), c(He, this, vi).call(this, i);
  }
  show() {
    var e;
    (e = a(gt, this)) === null || e === void 0 || e.classList.remove("hidden");
  }
  hide() {
    var e;
    (e = a(gt, this)) === null || e === void 0 || e.classList.add("hidden");
  }
  static show() {
    var e;
    (e = c(it, this, Ve)._) === null || e === void 0 || e.classList.remove("hidden");
  }
  static hide() {
    var e;
    (e = c(it, this, Ve)._) === null || e === void 0 || e.classList.add("hidden");
  }
}
function vi(t) {
  a(gt, this).classList.add("loader-container");
  var e = "http://www.w3.org/2000/svg", i = document.createElementNS(e, "svg");
  i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
  var n = document.createElementNS(e, "circle");
  n.setAttribute("cx", "10"), n.setAttribute("cy", "10"), n.setAttribute("fill", "none"), n.setAttribute("stroke", "currentColor"), n.setAttribute("stroke-width", "1.5"), n.setAttribute("r", "7.25"), n.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(n), a(gt, this).appendChild(i);
  var s = document.createElement("div");
  s.classList.add("loader-title"), s.classList.add("i18n"), s.innerText = t, a(gt, this).appendChild(s);
}
var Ve = {
  _: document.getElementById("loader")
};
function b(t) {
  try {
    return window.Asc.plugin.tr(t);
  } catch (e) {
    return console.error(e), t;
  }
}
class Vt {
  /**
   * Parse HTML string to extract plain text and formatting information.
   * Only supports: <sub>, <sup>, <sc>, <i>, <u>, <b> tags
   * @param {string} htmlString - HTML string to parse
   * @returns {{text: string, formatting: Array<FormattingPositions>}} Object with text and formatting array
   */
  static parseHtmlFormatting(e) {
    for (var i = {
      text: "",
      formatting: []
    }, n = [], s = 0, r = 0; r < e.length; )
      if (e[r] === "<" && r + 1 < e.length) {
        var o = e[r + 1] === "/", l = e.indexOf(">", r);
        if (l === -1) {
          i.text += e[r], r++;
          continue;
        }
        var u = e.substring(o ? r + 2 : r + 1, l).trim(), h = u.split(" ");
        if (h.length === 0) {
          i.text += e[r], r++;
          continue;
        }
        var v = h[0].toLowerCase();
        if (v === "br") {
          i.text += `
`, r = l + 1;
          continue;
        }
        var g = v;
        if (u.indexOf("font-variant:small-caps") !== -1 ? g = "sc" : u.indexOf("text-decoration:underline") !== -1 && (g = "u"), c(Vt, this, gi)._.has(v))
          if (o) {
            for (var y = n.length - 1; y >= 0; y--)
              if (n[y].tag === v) {
                var {
                  start: w,
                  styleTag: C
                } = n.splice(y, 1)[0];
                i.formatting.push({
                  type: C,
                  start: w,
                  end: s
                });
                break;
              }
          } else
            n.push({
              tag: v,
              start: s,
              styleTag: g
            });
        r = l + 1;
      } else
        i.text += e[r], s++, r++;
    return i.formatting.sort((M, N) => M.start === N.start ? N.end - M.end : M.start - N.start), i;
  }
}
var gi = {
  _: /* @__PURE__ */ new Set(["i", "u", "b", "sc", "sup", "sub", "em", "div", "span"])
};
class xt {
  /**
   * @param {Array<FormattingPositions>} positions
   * @returns {Promise<void>}
   */
  static formatAfterInsert(e) {
    return new Promise(function(i) {
      var n = !0, s = !1;
      Asc.scope.formatting = e, Asc.plugin.callCommand(function() {
        for (var r = Api.GetDocument(), o = r.GetCurrentRun(), l = Asc.scope.formatting.length - 1; l >= 0; l--) {
          var u = Asc.scope.formatting[l], h = o.GetRange(u.start, u.end);
          h && (u.type === "sup" ? h.SetVertAlign("superscript") : u.type === "sub" ? h.SetVertAlign("subscript") : u.type === "sc" ? h.SetSmallCaps(!0) : u.type === "u" ? h.SetUnderline(!0) : u.type === "b" ? h.SetBold(!0) : (u.type === "i" || u.type === "em") && h.SetItalic(!0));
        }
      }, s, n, i);
    });
  }
  /**
   * @param {string} fieldId
   * @param {{text: string, formatting: Array<FormattingPositions>}} formattingPositions
   * @returns {Promise<void>}
   */
  static formatAfterUpdate(e, i) {
    var n = !0, s = !1;
    return Asc.scope.fieldId = e, Asc.scope.text = i.text, Asc.scope.formatting = i.formatting, new Promise(function(r) {
      Asc.plugin.callCommand(function() {
        var o = Api.GetDocument(), l = o.GetRangeBySelect();
        if (!l)
          return;
        function u(C, M) {
          M === "sup" ? C.SetVertAlign("superscript") : M === "sub" ? C.SetVertAlign("subscript") : M === "sc" ? C.SetSmallCaps(!0) : M === "u" ? C.SetUnderline(!0) : M === "b" ? C.SetBold(!0) : (M === "i" || M === "em") && C.SetItalic(!0);
        }
        if (Asc.scope.formatting.length === 1) {
          var h = Asc.scope.formatting[0];
          if (h.start === 0 && h.end === l.GetText().length) {
            u(l, h.type);
            return;
          }
        }
        o.MoveCursorToPos(l.GetEndPos() - Asc.scope.text.length);
        for (var v = o.GetCurrentRun(), g = Asc.scope.formatting.length - 1; g >= 0; g--) {
          var y = Asc.scope.formatting[g], w = v.GetRange(y.start, y.end);
          w && u(w, y.type);
        }
      }, s, n, r);
    });
  }
}
var ae = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), F = /* @__PURE__ */ new WeakSet();
class yi {
  /**
   * @param {string} citPrefix
   * @param {string} citSuffix
   * @param {string} bibPrefix
   * @param {string} bibSuffix
   */
  constructor(e, i, n, s) {
    st(this, F), R(this, ae, void 0), R(this, Wt, void 0), R(this, le, void 0), R(this, ce, void 0), R(this, dt, void 0), R(this, qt, void 0), x(ae, this, "ZOTERO_CITATION"), x(le, this, "ZOTERO_BIBLIOGRAPHY"), x(Wt, this, e), x(ce, this, i), x(dt, this, n), x(qt, this, s);
  }
  /**
   * @param {string} text
   * @param {string} value
   * @returns {Promise<string>}
   */
  addBibliography(e, i) {
    var n = this;
    return I(function* () {
      var s = window.Asc.scope.editorVersion;
      if (s && s < 9004e3) {
        var r = Vt.parseHtmlFormatting(e), o = "", l = {
          FieldId: o,
          Value: a(dt, n) + i + a(qt, n),
          Content: r.text
        };
        return c(F, n, At).call(n, l).then(() => n.getCurrentField()).then((h) => {
          if (o = (h == null ? void 0 : h.FieldId) || "", !!r.formatting.length)
            return xt.formatAfterInsert(r.formatting);
        }).then(() => o);
      } else {
        var u = {
          FieldId: "",
          Value: a(dt, n) + i + a(qt, n),
          Content: " "
        };
        return yield c(F, n, Ke).call(n, u, e);
      }
    })();
  }
  /**
   * @param {string} text
   * @param {string} value
   * @param {NoteStyle | null} notesStyle
   * @returns {Promise<boolean>}
   */
  addCitation(e, i, n) {
    var s = this;
    return I(function* () {
      var r = Vt.parseHtmlFormatting(e), o = {
        FieldId: "",
        Value: a(Wt, s) + " " + a(ce, s) + i,
        Content: r.text
      }, l = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1);
      return l && (yield c(F, s, ue).call(s, n)), yield c(F, s, At).call(s, o), r.formatting.length && (yield xt.formatAfterInsert(r.formatting), l && (yield c(F, s, he).call(s))), l;
    })();
  }
  /** @returns {Promise<AddinFieldData | null>} */
  getCurrentField() {
    return new Promise(function(e, i) {
      window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
    });
  }
  /** @returns {Promise<Array<AddinFieldData>>} */
  getAddinZoteroFields() {
    var e = this;
    return new Promise(function(i, n) {
      c(F, e, mi).call(e).then(function(s) {
        try {
          s.length && (s = s.filter(function(r) {
            return r.Value.indexOf(a(Wt, e)) !== -1 || r.Value.indexOf(a(dt, e)) !== -1 || r.Value.indexOf(a(ae, e)) !== -1 || r.Value.indexOf(a(le, e)) !== -1;
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
    return this.getAddinZoteroFields().then(function(e) {
      var i = e.length;
      if (!i)
        return window.Asc.plugin.executeCommand("close", ""), !1;
      var n = e.map(function(s) {
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
  updateAddinFields(e) {
    var i = this;
    return I(function* () {
      var n = e.map((y) => y.FieldId), s = window.Asc.scope.editorVersion, r = e.filter((y) => y.Value.indexOf(a(dt, i)) === 0);
      if (r.length && s && s >= 9004e3) {
        e = e.filter((y) => y.Value.indexOf(a(dt, i)) !== 0);
        var o = r[0];
        yield c(F, i, Lt).call(i, o.FieldId);
        var l = o.Content || "";
        o.Content = " ", yield c(F, i, Zt).call(i), yield c(F, i, Ke).call(i, o, l);
      }
      var u = c(F, i, zt).call(i, e);
      if (yield new Promise((y) => {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [e], y);
      }), !u.size) return n;
      for (var [h, v] of u) {
        var g = yield c(F, i, Lt).call(i, h);
        g && (yield xt.formatAfterUpdate(h, v));
      }
      return n;
    })();
  }
  /**
   * @param {Array<AddinFieldData>} fields
   * @returns {Promise<void>}
   */
  convertNotesToText(e) {
    var i = this;
    return I(function* () {
      for (var n = c(F, i, zt).call(i, e), s = 0; s < e.length; s++) {
        var r = e[s];
        if (!r.FieldId) {
          console.error("Field id is not defined");
          continue;
        }
        var o = yield c(F, i, Lt).call(i, r.FieldId);
        if (o) {
          var l = yield c(F, i, he).call(i);
          if (l) {
            yield c(F, i, Ue).call(i), yield c(F, i, Zt).call(i), yield c(F, i, At).call(i, r);
            var u = n.get(r.FieldId);
            u && (yield xt.formatAfterInsert(u.formatting));
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
  convertTextToNotes(e, i) {
    var n = this;
    return I(function* () {
      for (var s = c(F, n, zt).call(n, e), r = 0; r < e.length; r++) {
        var o = e[r];
        if (o.FieldId) {
          var l = yield c(F, n, Lt).call(n, o.FieldId);
          if (l) {
            yield c(F, n, Zt).call(n), yield c(F, n, ue).call(n, i), yield c(F, n, At).call(n, o);
            var u = s.get(o.FieldId);
            u && (yield xt.formatAfterInsert(u.formatting));
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
  convertNotesStyle(e, i) {
    var n = this;
    return I(function* () {
      for (var s = [], r = c(F, n, zt).call(n, e), o = 0; o < e.length; o++) {
        var l = e[o];
        if (l.FieldId) {
          if (!l.Content) {
            s.push(l);
            continue;
          }
          var u = yield c(F, n, Lt).call(n, l.FieldId);
          if (u) {
            var h = yield c(F, n, he).call(n);
            if (h) {
              yield c(F, n, Ue).call(n), yield c(F, n, Zt).call(n), yield c(F, n, ue).call(n, i), yield c(F, n, At).call(n, l);
              var v = r.get(l.FieldId);
              v && (yield xt.formatAfterInsert(v.formatting));
            }
          }
        }
      }
      s.length && (yield new Promise(function(g) {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [s], g);
      }));
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBegin]
   * @returns {Promise<void>}
  */
  moveCursorToField(e, i) {
    return I(function* () {
      return new Promise((n) => {
        i = i ?? !0, window.Asc.plugin.executeMethod("MoveCursorToField", [e, i], n);
      });
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBeforeField]
   * @returns {Promise<void>}
  */
  moveCursorOutsideField(e, i) {
    return I(function* () {
      return new Promise((n) => {
        i = i ?? !1, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [e, i], n);
      });
    })();
  }
  /**
   * @returns {Promise<void>}
  */
  moveCursorRight() {
    return I(function* () {
      return new Promise((e) => {
        var i = !0, n = !1;
        Asc.plugin.callCommand(() => {
          var s = Api.GetDocument();
          s.MoveCursorRight(1, !1);
        }, n, i, e);
      });
    })();
  }
}
function At(t) {
  return new Promise(function(e) {
    window.Asc.plugin.executeMethod("AddAddinField", [t], e);
  });
}
function ue(t) {
  return Asc.scope.notesStyle = t, new Promise((e) => {
    Asc.plugin.callCommand(() => {
      var i = Api.GetDocument();
      Asc.scope.notesStyle === "footnotes" ? i.AddFootnote() : Asc.scope.notesStyle === "endnotes" && i.AddEndnote();
    }, !1, !1, e);
  });
}
function mi() {
  return new Promise(function(t, e) {
    window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, t);
  });
}
function zt(t) {
  var e = /* @__PURE__ */ new Map();
  return t.forEach(function(i) {
    if (i.Content) {
      var n = Vt.parseHtmlFormatting(i.Content);
      i.Content = n.text, n.formatting.length && i.FieldId && e.set(i.FieldId, n);
    }
  }), e;
}
function bi(t) {
  return new Promise(function(e) {
    window.Asc.plugin.executeMethod("PasteHtml", [t], e);
  });
}
function Zt() {
  return new Promise((t) => {
    window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, t);
  });
}
function Lt(t) {
  return new Promise(function(e) {
    window.Asc.plugin.executeMethod("SelectAddinField", [t], () => e(!0));
  });
}
function he() {
  return new Promise(function(t) {
    var e = !0, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetCurrentFootEndnote();
      if (s)
        var r = s.SelectNoteReference();
    }, i, e, () => t(!0));
  });
}
function Ue() {
  return new Promise(function(t) {
    var e = !1, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetRangeBySelect();
      s && s.SetVertAlign("baseline");
    }, i, e, t);
  });
}
function Ke(t, e) {
  return me.apply(this, arguments);
}
function me() {
  return me = I(function* (t, e) {
    if (yield c(F, this, At).call(this, t), yield new Promise((h) => {
      var v = !0, g = !1;
      Asc.plugin.callCommand(() => {
        var y = Api.GetDocument();
        y.MoveCursorLeft(1, !0);
      }, g, v, h);
    }), !Asc.scope.bibStyle)
      throw "Bibliography style is not defined";
    var i = new DOMParser(), n = i.parseFromString(e, "text/html"), s = n.querySelectorAll(".csl-entry"), r = new Array(s.length), o = Date.now().toString(36);
    s.forEach((h, v) => {
      var g = h.querySelector(".csl-left-margin"), y = h.querySelector(".csl-right-inline");
      if (y == null || y.replaceWith(...y.childNodes), g) {
        r[v] = g.textContent.trim() + o;
        for (var w = document.createElement("em"); g.firstChild; )
          w.appendChild(g.firstChild);
        var C = document.createElement("span");
        C.textContent = o, w.appendChild(C), g.replaceWith(w);
      }
      for (var M = document.createElement("p"); h.firstChild; )
        M.appendChild(h.firstChild);
      h.replaceWith(M);
    }), e = n.body.innerHTML, yield c(F, this, bi).call(this, e);
    var l = yield this.getCurrentField();
    if (!l) {
      console.warn("Failed to get current field after paste");
      for (var u = 0; u < 5 && (yield new Promise((h) => {
        setTimeout(() => {
          h(!0);
        }, 100);
      }), l = yield this.getCurrentField(), !l); u++)
        ;
      if (!l)
        throw new Error("Failed to get current field after paste");
    }
    return yield c(F, this, Lt).call(this, l.FieldId), yield new Promise((h) => {
      var v = !1, g = !1;
      Asc.scope.numbers = r, Asc.scope.hash = o, Asc.plugin.callCommand(() => {
        var y = Api.GetDocument(), w = y.GetRangeBySelect();
        if (w) {
          var C = Asc.scope.bibStyle, M = w.GetAllParagraphs();
          M.forEach((N, E) => {
            var J = N.GetText().trim();
            if (J !== "")
              if (typeof C.linespacing == "number" && N.SetSpacingLine(240 * C.linespacing, "exact"), typeof C.entryspacing == "number" && N.SetSpacingAfter(240 * C.entryspacing), C["second-field-align"]) {
                for (var X = String(Asc.scope.numbers[E]), V = 0; V < N.GetElementsCount(); V++) {
                  var Q = N.GetElement(V);
                  if (Q.GetText() === X) {
                    Q.AddTabStop(), Q.SetItalic(!1);
                    break;
                  }
                }
                var Tt = N.Search(Asc.scope.hash, !0)[0];
                Tt.Delete(), N.SetIndLeft(C.maxoffset * 120), N.SetIndFirstLine(-(C.maxoffset * 120));
              } else C.hangingindent && (N.SetIndLeft(720), N.SetIndFirstLine(-720));
          });
        }
      }, g, v, h);
    }), Asc.scope.bibStyle = null, l.FieldId;
  }), me.apply(this, arguments);
}
var ct = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakSet();
class wi {
  constructor() {
    st(this, Ge), R(this, ct, void 0), R(this, $, void 0), R(this, j, void 0), x(ct, this, []), x($, this, []), x(j, this, []), this.size = 0;
  }
  /** @returns {CitationItem} */
  /**
   * @param {string|number} id
   * @returns {CitationItem|null}
   **/
  getItem(e) {
    e = e.toString();
    var i = a($, this).indexOf(e);
    return i >= 0 ? a(ct, this)[i] : null;
  }
  /**
   *
   * @param {string|number} id
   * @returns {number}
   */
  getItemIndex(e) {
    return e = e.toString(), a($, this).indexOf(e);
  }
  clear() {
    return x(ct, this, []), x(j, this, []), x($, this, []), this.size = 0, this;
  }
  /**
   * @param {string|number} id
   * @returns {CSLCitationStorage}
   */
  deleteItem(e) {
    e = e.toString();
    var i = a($, this).indexOf(e);
    return i >= 0 && (a(ct, this).splice(i, 1), a($, this).splice(i, 1), this.size--), this;
  }
  /**
   * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
   */
  forEachItem(e) {
    for (var i = 0; i < this.size; i++)
      e(a(ct, this)[i], a($, this)[i], this);
  }
  /**
   * @param {string|number} id
   * @returns {boolean}
   */
  hasItem(e) {
    return e = e.toString(), a($, this).indexOf(e) >= 0;
  }
  /**
   * @param {CSLCitation} cslCitation
   * @returns {CSLCitationStorage}
   */
  addCslCitation(e) {
    return a(j, this).push(e), e.setNoteIndex(a(j, this).length), e.getCitationItems().forEach((i) => {
      c(Ge, this, Si).call(this, i.id, i);
    }), this;
  }
  getAllCitationsInJson() {
    return a(j, this).map((e) => e.toJSON());
  }
  /**
   * @param {string} id
   * @returns {CSLCitation|undefined}
   */
  getCitation(e) {
    return a(j, this).find((i) => i.citationID === e);
  }
  /**
   * @param {string} id
   * @returns {number}
   */
  getCitationIndex(e) {
    return a(j, this).findIndex((i) => i.citationID === e);
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPre(e) {
    var i = [];
    return a(j, this).find((n, s) => n.citationID === e ? !0 : (i.push([n.citationID, s + 1]), !1)), i;
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPost(e) {
    for (var i = [], n = this.getCitationIndex(e), s = n + 1; s < a(j, this).length; s++) {
      var r = a(j, this)[s];
      i.push([r.citationID, s + 1]);
    }
    return i;
  }
}
function Si(t, e) {
  t = t.toString();
  var i = a($, this).indexOf(t);
  return i >= 0 ? (a(ct, this)[i] = e, this) : (a(ct, this).push(e), a($, this).push(t), this.size++, this);
}
function f(t) {
  if (typeof t != "string" && typeof t != "number")
    throw new Error("CitationItemData: id is required");
  this._id = t, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
f.prototype._addCustomProperty = function(t, e) {
  return this._custom[t] = e, this;
};
f.prototype.getCustomProperty = function(t) {
  return Object.hasOwnProperty.call(this._custom, t) ? this._custom[t] : null;
};
f.prototype.fillFromObject = function(t) {
  if (Object.hasOwnProperty.call(t, "type") && (this._type = t.type), Object.hasOwnProperty.call(t, "categories") && (this._categories = t.categories), Object.hasOwnProperty.call(t, "citation-key") && (this._citationKey = t["citation-key"]), Object.hasOwnProperty.call(t, "language") && (this._language = t.language), Object.hasOwnProperty.call(t, "journalAbbreviation") && (this._journalAbbreviation = t.journalAbbreviation), Object.hasOwnProperty.call(t, "shortTitle") && (this._shortTitle = t.shortTitle), Object.hasOwnProperty.call(t, "author") && (this._author = t.author), Object.hasOwnProperty.call(t, "chair") && (this._chair = t.chair), Object.hasOwnProperty.call(t, "collection-editor") && (this._collectionEditor = t["collection-editor"]), Object.hasOwnProperty.call(t, "compiler") && (this._compiler = t.compiler), Object.hasOwnProperty.call(t, "composer") && (this._composer = t.composer), Object.hasOwnProperty.call(t, "container-author") && (this._containerAuthor = t["container-author"]), Object.hasOwnProperty.call(t, "contributor") && (this._contributor = t.contributor), Object.hasOwnProperty.call(t, "curator") && (this._curator = t.curator), Object.hasOwnProperty.call(t, "director") && (this._director = t.director), Object.hasOwnProperty.call(t, "editorial-director") && (this._editorialDirector = t["editorial-director"]), Object.hasOwnProperty.call(t, "editor") && (this._editor = t.editor), Object.hasOwnProperty.call(t, "executive-producer") && (this._executiveProducer = t["executive-producer"]), Object.hasOwnProperty.call(t, "guest") && (this._guest = t.guest), Object.hasOwnProperty.call(t, "host") && (this._host = t.host), Object.hasOwnProperty.call(t, "illustrator") && (this._illustrator = t.illustrator), Object.hasOwnProperty.call(t, "narrator") && (this._narrator = t.narrator), Object.hasOwnProperty.call(t, "organizer") && (this._organizer = t.organizer), Object.hasOwnProperty.call(t, "original-author") && (this._originalAuthor = t["original-author"]), Object.hasOwnProperty.call(t, "performer") && (this._performer = t.performer), Object.hasOwnProperty.call(t, "producer") && (this._producer = t.producer), Object.hasOwnProperty.call(t, "recipient") && (this._recipient = t.recipient), Object.hasOwnProperty.call(t, "reviewed-author") && (this._reviewedAuthor = t["reviewed-author"]), Object.hasOwnProperty.call(t, "script-writer") && (this._scriptWriter = t["script-writer"]), Object.hasOwnProperty.call(t, "series-creator") && (this._seriesCreator = t["series-creator"]), Object.hasOwnProperty.call(t, "translator") && (this._translator = t.translator), Object.hasOwnProperty.call(t, "accessed") && (this._accessed = t.accessed), Object.hasOwnProperty.call(t, "container") && (this._container = t.container), Object.hasOwnProperty.call(t, "event-date") && (this._eventDate = t["event-date"]), Object.hasOwnProperty.call(t, "issued") && (this._issued = t.issued), Object.hasOwnProperty.call(t, "original-date") && (this._originalDate = t["original-date"]), Object.hasOwnProperty.call(t, "submitted") && (this._submitted = t.submitted), Object.hasOwnProperty.call(t, "abstract") && (this._abstract = t.abstract), Object.hasOwnProperty.call(t, "annote") && (this._annote = t.annote), Object.hasOwnProperty.call(t, "archive") && (this._archive = t.archive), Object.hasOwnProperty.call(t, "archive_collection") && (this._archiveCollection = t.archive_collection), Object.hasOwnProperty.call(t, "archive_location") && (this._archiveLocation = t.archive_location), Object.hasOwnProperty.call(t, "archive-place") && (this._archivePlace = t["archive-place"]), Object.hasOwnProperty.call(t, "authority") && (this._authority = t.authority), Object.hasOwnProperty.call(t, "call-number") && (this._callNumber = t["call-number"]), Object.hasOwnProperty.call(t, "chapter-number") && (this._chapterNumber = t["chapter-number"]), Object.hasOwnProperty.call(t, "citation-number") && (this._citationNumber = t["citation-number"]), Object.hasOwnProperty.call(t, "citation-label") && (this._citationLabel = t["citation-label"]), Object.hasOwnProperty.call(t, "collection-number") && (this._collectionNumber = t["collection-number"]), Object.hasOwnProperty.call(t, "collection-title") && (this._collectionTitle = t["collection-title"]), Object.hasOwnProperty.call(t, "container-title") && (this._containerTitle = t["container-title"]), Object.hasOwnProperty.call(t, "container-title-short") && (this._containerTitleShort = t["container-title-short"]), Object.hasOwnProperty.call(t, "dimensions") && (this._dimensions = t.dimensions), Object.hasOwnProperty.call(t, "DOI") && (this._DOI = t.DOI), Object.hasOwnProperty.call(t, "edition") && (this._edition = t.edition), Object.hasOwnProperty.call(t, "event") && (this._event = t.event), Object.hasOwnProperty.call(t, "event-title") && (this._eventTitle = t["event-title"]), Object.hasOwnProperty.call(t, "event-place") && (this._eventPlace = t["event-place"]), Object.hasOwnProperty.call(t, "first-reference-note-number") && (this._firstReferenceNoteNumber = t["first-reference-note-number"]), Object.hasOwnProperty.call(t, "genre") && (this._genre = t.genre), Object.hasOwnProperty.call(t, "ISBN") && (this._ISBN = t.ISBN), Object.hasOwnProperty.call(t, "ISSN") && (this._ISSN = t.ISSN), Object.hasOwnProperty.call(t, "issue") && (this._issue = t.issue), Object.hasOwnProperty.call(t, "jurisdiction") && (this._jurisdiction = t.jurisdiction), Object.hasOwnProperty.call(t, "keyword") && (this._keyword = t.keyword), Object.hasOwnProperty.call(t, "locator") && (this._locator = t.locator), Object.hasOwnProperty.call(t, "medium") && (this._medium = t.medium), Object.hasOwnProperty.call(t, "note") && (this._note = t.note), Object.hasOwnProperty.call(t, "number") && (this._number = t.number), Object.hasOwnProperty.call(t, "number-of-pages") && (this._numberOfPages = t["number-of-pages"]), Object.hasOwnProperty.call(t, "number-of-volumes") && (this._numberOfVolumes = t["number-of-volumes"]), Object.hasOwnProperty.call(t, "original-publisher") && (this._originalPublisher = t["original-publisher"]), Object.hasOwnProperty.call(t, "original-publisher-place") && (this._originalPublisherPlace = t["original-publisher-place"]), Object.hasOwnProperty.call(t, "original-title") && (this._originalTitle = t["original-title"]), Object.hasOwnProperty.call(t, "page") && (this._page = t.page), Object.hasOwnProperty.call(t, "page-first") && (this._pageFirst = t["page-first"]), Object.hasOwnProperty.call(t, "part") && (this._part = t.part), Object.hasOwnProperty.call(t, "part-title") && (this._partTitle = t["part-title"]), Object.hasOwnProperty.call(t, "PMCID") && (this._PMCID = t.PMCID), Object.hasOwnProperty.call(t, "PMID") && (this._PMID = t.PMID), Object.hasOwnProperty.call(t, "printing") && (this._printing = t.printing), Object.hasOwnProperty.call(t, "publisher") && (this._publisher = t.publisher), Object.hasOwnProperty.call(t, "publisher-place") && (this._publisherPlace = t["publisher-place"]), Object.hasOwnProperty.call(t, "references") && (this._references = t.references), Object.hasOwnProperty.call(t, "reviewed-genre") && (this._reviewedGenre = t["reviewed-genre"]), Object.hasOwnProperty.call(t, "reviewed-title") && (this._reviewedTitle = t["reviewed-title"]), Object.hasOwnProperty.call(t, "scale") && (this._scale = t.scale), Object.hasOwnProperty.call(t, "section") && (this._section = t.section), Object.hasOwnProperty.call(t, "source") && (this._source = t.source), Object.hasOwnProperty.call(t, "status") && (this._status = t.status), Object.hasOwnProperty.call(t, "title") && (this._title = t.title), Object.hasOwnProperty.call(t, "title-short") && (this._titleShort = t["title-short"]), Object.hasOwnProperty.call(t, "URL") && (this._URL = t.URL), Object.hasOwnProperty.call(t, "version") && (this._version = t.version), Object.hasOwnProperty.call(t, "volume") && (this._volume = t.volume), Object.hasOwnProperty.call(t, "volume-title") && (this._volumeTitle = t["volume-title"]), Object.hasOwnProperty.call(t, "volume-title-short") && (this._volumeTitleShort = t["volume-title-short"]), Object.hasOwnProperty.call(t, "year-suffix") && (this._yearSuffix = t["year-suffix"]), Object.hasOwnProperty.call(t, "custom") && (this._custom = t.custom), Object.hasOwnProperty.call(t, "userID") && this._addCustomProperty("userID", t.userID), Object.hasOwnProperty.call(t, "groupID") && this._addCustomProperty("groupID", t.groupID), Object.hasOwnProperty.call(t, "creators")) {
    var e = this;
    t.creators.forEach(function(i) {
      var n = {};
      i.firstName && (n.given = i.firstName), i.lastName && (n.family = i.lastName);
      var s = e._author.some(function(r) {
        return !(r.family !== n.family && (r.family || n.family) || r.given !== n.given && (r.given || n.given));
      });
      s || e._author.push(n);
    }, this);
  }
  Object.hasOwnProperty.call(t, "libraryCatalog") && (this._source = t.libraryCatalog), Object.hasOwnProperty.call(t, "place") && (this._eventPlace = t.place, this._publisherPlace = t.place), Object.hasOwnProperty.call(t, "numberOfVolumes") && (this._numberOfVolumes = t.numberOfVolumes), Object.hasOwnProperty.call(t, "callNumber") && (this._callNumber = t.callNumber), Object.hasOwnProperty.call(t, "seriesNumber") && (this._collectionNumber = t.seriesNumber), Object.hasOwnProperty.call(t, "series") && (this._collectionTitle = t.series), Object.hasOwnProperty.call(t, "bookTitle") && (this._containerTitle = t.bookTitle), Object.hasOwnProperty.call(t, "extra") && (this._note = t.extra), Object.hasOwnProperty.call(t, "rights") && (this._license = t.rights), Object.hasOwnProperty.call(t, "archiveLocation") && (this._archiveLocation = t.archiveLocation), Object.hasOwnProperty.call(t, "abstractNote") && (this._abstract = t.abstractNote);
};
f.prototype.getTitle = function() {
  return this._title;
};
f.prototype.getType = function() {
  return this._type;
};
f.prototype.setType = function(t) {
  return this._type = t, this;
};
f.prototype.setCitationKey = function(t) {
  return this._citationKey = t, this;
};
f.prototype.setCategories = function(t) {
  return this._categories = t, this;
};
f.prototype.setLanguage = function(t) {
  return this._language = t, this;
};
f.prototype.setJournalAbbreviation = function(t) {
  return this._journalAbbreviation = t, this;
};
f.prototype.setShortTitle = function(t) {
  return this._shortTitle = t, this;
};
f.prototype.setAuthor = function(t) {
  return this._author = Array.isArray(t) ? t : [t], this;
};
f.prototype.setChair = function(t) {
  return this._chair = Array.isArray(t) ? t : [t], this;
};
f.prototype.setCollectionEditor = function(t) {
  return this._collectionEditor = Array.isArray(t) ? t : [t], this;
};
f.prototype.setCompiler = function(t) {
  return this._compiler = Array.isArray(t) ? t : [t], this;
};
f.prototype.setComposer = function(t) {
  return this._composer = Array.isArray(t) ? t : [t], this;
};
f.prototype.setContainerAuthor = function(t) {
  return this._containerAuthor = Array.isArray(t) ? t : [t], this;
};
f.prototype.setContributor = function(t) {
  return this._contributor = Array.isArray(t) ? t : [t], this;
};
f.prototype.setCurator = function(t) {
  return this._curator = Array.isArray(t) ? t : [t], this;
};
f.prototype.setDirector = function(t) {
  return this._director = Array.isArray(t) ? t : [t], this;
};
f.prototype.setEditor = function(t) {
  return this._editor = Array.isArray(t) ? t : [t], this;
};
f.prototype.setEditorialDirector = function(t) {
  return this._editorialDirector = Array.isArray(t) ? t : [t], this;
};
f.prototype.setExecutiveProducer = function(t) {
  return this._executiveProducer = Array.isArray(t) ? t : [t], this;
};
f.prototype.setGuest = function(t) {
  return this._guest = Array.isArray(t) ? t : [t], this;
};
f.prototype.setHost = function(t) {
  return this._host = Array.isArray(t) ? t : [t], this;
};
f.prototype.setIllustrator = function(t) {
  return this._illustrator = Array.isArray(t) ? t : [t], this;
};
f.prototype.setNarrator = function(t) {
  return this._narrator = Array.isArray(t) ? t : [t], this;
};
f.prototype.setOrganizer = function(t) {
  return this._organizer = Array.isArray(t) ? t : [t], this;
};
f.prototype.setOriginalAuthor = function(t) {
  return this._originalAuthor = Array.isArray(t) ? t : [t], this;
};
f.prototype.setPerformer = function(t) {
  return this._performer = Array.isArray(t) ? t : [t], this;
};
f.prototype.setProducer = function(t) {
  return this._producer = Array.isArray(t) ? t : [t], this;
};
f.prototype.setRecipient = function(t) {
  return this._recipient = Array.isArray(t) ? t : [t], this;
};
f.prototype.setReviewedAuthor = function(t) {
  return this._reviewedAuthor = Array.isArray(t) ? t : [t], this;
};
f.prototype.setScriptwriter = function(t) {
  return this._scriptwriter = Array.isArray(t) ? t : [t], this;
};
f.prototype.setSeriesCreator = function(t) {
  return this._seriesCreator = Array.isArray(t) ? t : [t], this;
};
f.prototype.setTranslator = function(t) {
  return this._translator = Array.isArray(t) ? t : [t], this;
};
f.prototype.setAccessed = function(t) {
  return this._accessed = t || {}, this;
};
f.prototype.setContainer = function(t) {
  return this._container = t || {}, this;
};
f.prototype.setEventDate = function(t) {
  return this._eventDate = t || {}, this;
};
f.prototype.setIssued = function(t) {
  return this._issued = t || {}, this;
};
f.prototype.setOriginalDate = function(t) {
  return this._originalDate = t || {}, this;
};
f.prototype.setSubmitted = function(t) {
  return this._submitted = t || {}, this;
};
f.prototype.setAbstract = function(t) {
  return this._abstract = t, this;
};
f.prototype.setAnnote = function(t) {
  return this._annote = t, this;
};
f.prototype.setArchive = function(t) {
  return this._archive = t, this;
};
f.prototype.setArchiveCollection = function(t) {
  return this._archiveCollection = t, this;
};
f.prototype.setArchiveLocation = function(t) {
  return this._archiveLocation = t, this;
};
f.prototype.setArchivePlace = function(t) {
  return this._archivePlace = t, this;
};
f.prototype.setAuthority = function(t) {
  return this._authority = t, this;
};
f.prototype.setCallNumber = function(t) {
  return this._callNumber = t, this;
};
f.prototype.setChapterNumber = function(t) {
  return this._chapterNumber = t, this;
};
f.prototype.setCitationNumber = function(t) {
  return this._citationNumber = t, this;
};
f.prototype.setCitationLabel = function(t) {
  return this._citationLabel = t, this;
};
f.prototype.setCollectionNumber = function(t) {
  return this._collectionNumber = t, this;
};
f.prototype.setCollectionTitle = function(t) {
  return this._collectionTitle = t, this;
};
f.prototype.setContainerTitle = function(t) {
  return this._containerTitle = t, this;
};
f.prototype.setContainerTitleShort = function(t) {
  return this._containerTitleShort = t, this;
};
f.prototype.setDimensions = function(t) {
  return this._dimensions = t, this;
};
f.prototype.setDOI = function(t) {
  return this._DOI = t, this;
};
f.prototype.setEdition = function(t) {
  return this._edition = t, this;
};
f.prototype.setEvent = function(t) {
  return this._event = t, this;
};
f.prototype.setEventTitle = function(t) {
  return this._eventTitle = t, this;
};
f.prototype.setEventPlace = function(t) {
  return this._eventPlace = t, this;
};
f.prototype.setFirstReferenceNoteNumber = function(t) {
  return this._firstReferenceNoteNumber = t, this;
};
f.prototype.setGenre = function(t) {
  return this._genre = t, this;
};
f.prototype.setISBN = function(t) {
  return this._ISBN = t, this;
};
f.prototype.setISSN = function(t) {
  return this._ISSN = t, this;
};
f.prototype.setIssue = function(t) {
  return this._issue = t, this;
};
f.prototype.setJurisdiction = function(t) {
  return this._jurisdiction = t, this;
};
f.prototype.setKeyword = function(t) {
  return this._keyword = t, this;
};
f.prototype.setLocator = function(t) {
  return this._locator = t, this;
};
f.prototype.setMedium = function(t) {
  return this._medium = t, this;
};
f.prototype.setNote = function(t) {
  return this._note = t, this;
};
f.prototype.setNumber = function(t) {
  return this._number = t, this;
};
f.prototype.setNumberOfPages = function(t) {
  return this._numberOfPages = t, this;
};
f.prototype.setNumberOfVolumes = function(t) {
  return this._numberOfVolumes = t, this;
};
f.prototype.setOriginalPublisher = function(t) {
  return this._originalPublisher = t, this;
};
f.prototype.setOriginalPublisherPlace = function(t) {
  return this._originalPublisherPlace = t, this;
};
f.prototype.setOriginalTitle = function(t) {
  return this._originalTitle = t, this;
};
f.prototype.setPage = function(t) {
  return this._page = t, this;
};
f.prototype.setPageFirst = function(t) {
  return this._pageFirst = t, this;
};
f.prototype.setPart = function(t) {
  return this._part = t, this;
};
f.prototype.setPartTitle = function(t) {
  return this._partTitle = t, this;
};
f.prototype.setPMCID = function(t) {
  return this._PMCID = t, this;
};
f.prototype.setPMID = function(t) {
  return this._PMID = t, this;
};
f.prototype.setPrinting = function(t) {
  return this._printing = t, this;
};
f.prototype.setPublisher = function(t) {
  return this._publisher = t, this;
};
f.prototype.setPublisherPlace = function(t) {
  return this._publisherPlace = t, this;
};
f.prototype.setReferences = function(t) {
  return this._references = t, this;
};
f.prototype.setReviewedGenre = function(t) {
  return this._reviewedGenre = t, this;
};
f.prototype.setReviewedTitle = function(t) {
  return this._reviewedTitle = t, this;
};
f.prototype.setScale = function(t) {
  return this._scale = t, this;
};
f.prototype.setSection = function(t) {
  return this._section = t, this;
};
f.prototype.setSource = function(t) {
  return this._source = t, this;
};
f.prototype.setStatus = function(t) {
  return this._status = t, this;
};
f.prototype.setTitle = function(t) {
  return this._title = t, this;
};
f.prototype.setTitleShort = function(t) {
  return this._titleShort = t, this;
};
f.prototype.setURL = function(t) {
  return this._URL = t, this;
};
f.prototype.setVersion = function(t) {
  return this._version = t, this;
};
f.prototype.setVolume = function(t) {
  return this._volume = t, this;
};
f.prototype.setVolumeTitle = function(t) {
  return this._volumeTitle = t, this;
};
f.prototype.setVolumeTitleShort = function(t) {
  return this._volumeTitleShort = t, this;
};
f.prototype.setYearSuffix = function(t) {
  return this._yearSuffix = t, this;
};
f.prototype.setCustom = function(t) {
  return this._custom = Object.assign(this._custom, t), this;
};
f.prototype.toJSON = function(t) {
  var e = {};
  return e.id = this._id, this._type !== void 0 && this._type !== "" && (e.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (e["citation-key"] = this._citationKey), this._categories.length > 0 && (e.categories = this._categories), this._language !== void 0 && this._language !== "" && (e.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (e.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (e.shortTitle = this._shortTitle, this._titleShort === void 0 && (e["title-short"] = this._shortTitle)), this._author.length > 0 && (e.author = this._author), this._chair.length > 0 && (e.chair = this._chair), this._collectionEditor.length > 0 && (e["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (e.compiler = this._compiler), this._composer.length > 0 && (e.composer = this._composer), this._containerAuthor.length > 0 && (e["container-author"] = this._containerAuthor), this._contributor.length > 0 && (e.contributor = this._contributor), this._curator.length > 0 && (e.curator = this._curator), this._director.length > 0 && (e.director = this._director), this._editor.length > 0 && (e.editor = this._editor), this._editorialDirector.length > 0 && (e["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (e["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (e.guest = this._guest), this._host.length > 0 && (e.host = this._host), this._illustrator.length > 0 && (e.illustrator = this._illustrator), this._narrator.length > 0 && (e.narrator = this._narrator), this._organizer.length > 0 && (e.organizer = this._organizer), this._originalAuthor.length > 0 && (e["original-author"] = this._originalAuthor), this._performer.length > 0 && (e.performer = this._performer), this._producer.length > 0 && (e.producer = this._producer), this._recipient.length > 0 && (e.recipient = this._recipient), this._reviewedAuthor.length > 0 && (e["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (e["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (e["series-creator"] = this._seriesCreator), this._translator.length > 0 && (e.translator = this._translator), Object.keys(this._accessed).length > 0 && (e.accessed = this._accessed), Object.keys(this._container).length > 0 && (e.container = this._container), Object.keys(this._eventDate).length > 0 && (e["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (e.issued = this._issued), Object.keys(this._originalDate).length > 0 && (e["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (e.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (e.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (e.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (e.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (e.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (e.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (e["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (e.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (e["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (e["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (e["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (e["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (e["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (e["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (e["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (e["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (e.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (e.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (e.edition = this._edition), this._event !== void 0 && this._event !== "" && (e.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (e["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (e["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (e["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (e.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (e.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (e.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (e.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (e.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (e.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (e.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (e.medium = this._medium), this._note !== void 0 && this._note !== "" && (e.note = this._note), this._number !== void 0 && this._number !== "" && (e.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (e["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (e["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (e["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (e["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (e["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (e.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (e["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (e.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (e["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (e.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (e.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (e.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (e.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (e["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (e.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (e["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (e["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (e.scale = this._scale), this._section !== void 0 && this._section !== "" && (e.section = this._section), this._source !== void 0 && this._source !== "" && (e.source = this._source), this._status !== void 0 && this._status !== "" && (e.status = this._status), this._title !== void 0 && this._title !== "" && (e.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (e["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (e.URL = this._URL), this._version !== void 0 && this._version !== "" && (e.version = this._version), this._volume !== void 0 && this._volume !== "" && (e.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (e["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (e["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (e["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0 && (e.custom = this._custom), this._license !== void 0 && this._license !== "" && (e.license = this._license), e;
};
function z(t) {
  if (typeof t != "string" && typeof t != "number")
    throw new Error("CitationItem: id is required");
  this.id = t, this._itemData = new f(t), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
z.prototype.fillFromObject = function(t) {
  var e = this;
  Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? (this._itemData.fillFromObject(t.data), Object.hasOwnProperty.call(t, "links") && (Object.hasOwnProperty.call(t.links, "self") && this.addUri(t.links.self.href), Object.hasOwnProperty.call(t.links, "alternate") && this.addUri(t.links.alternate.href))) : Object.hasOwnProperty.call(t, "itemData") ? this._itemData.fillFromObject(t.itemData) : this._itemData.fillFromObject(t), Object.hasOwnProperty.call(t, "prefix") && (this._prefix = t.prefix), Object.hasOwnProperty.call(t, "suffix") && (this._suffix = t.suffix), Object.hasOwnProperty.call(t, "locator") && (this._locator = t.locator), Object.hasOwnProperty.call(t, "label") && (this._label = t.label), Object.hasOwnProperty.call(t, "suppress-author") && (this._suppressAuthor = t["suppress-author"]), Object.hasOwnProperty.call(t, "author-only") && (this._authorOnly = t["author-only"]), Object.hasOwnProperty.call(t, "uris") && t.uris.forEach(function(i) {
    e.addUri(i);
  }, this);
};
z.prototype.getInfoForCitationCluster = function() {
  var t = {
    id: this.id,
    "suppress-author": this._suppressAuthor
  };
  return this._prefix && (t.prefix = this._prefix), this._suffix && (t.suffix = this._suffix), this._locator && (t.locator = this._locator), this._label && (t.label = this._label), t;
};
z.prototype.getItemData = function() {
  return this._itemData;
};
z.prototype.getProperty = function(t) {
  return this._itemData.getCustomProperty(t) !== null ? this._itemData.getCustomProperty(t) : null;
};
z.prototype.setPrefix = function(t) {
  return this._prefix = t, this;
};
z.prototype.setSuffix = function(t) {
  return this._suffix = t, this;
};
z.prototype.setLocator = function(t) {
  return this._locator = t, this;
};
z.prototype.setLabel = function(t) {
  if (t) {
    var e = ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"];
    if (e.indexOf(t) === -1)
      throw new Error('CitationItem.setLocator: Invalid label "' + t + '"');
    this._label = t;
  }
  return this;
};
z.prototype.setSuppressAuthor = function(t) {
  return this._suppressAuthor = t, this;
};
z.prototype.setAuthorOnly = function(t) {
  return this._authorOnly = t, this;
};
z.prototype.addUri = function(t) {
  return this._uris.indexOf(t) !== -1 ? this : (this._uris.push(t), this);
};
z.prototype.toJSON = function(t) {
  var e = {};
  return e.id = this.id, this._itemData && (e.itemData = this._itemData.toJSON ? this._itemData.toJSON(t || !1) : this._itemData), this._prefix !== void 0 && (e.prefix = this._prefix), this._suffix !== void 0 && (e.suffix = this._suffix), this._locator !== void 0 && (e.locator = this._locator), this._label !== void 0 && (e.label = this._label), this._suppressAuthor !== void 0 && (e["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (e["author-only"] = this._authorOnly), this._uris.length && (e.uris = this._uris), e;
};
z.prototype.toFlatJSON = function(t) {
  var e = {
    id: this.id,
    index: t
  };
  this._suppressAuthor !== void 0 && (e["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(e, i), typeof this._itemData.getCustomProperty("userID") < "u" && this._itemData.getCustomProperty("userID") !== null && (e.userID = String(this._itemData.getCustomProperty("userID"))), typeof this._itemData.getCustomProperty("groupID") < "u" && this._itemData.getCustomProperty("groupID") !== null && (e.groupID = String(this._itemData.getCustomProperty("groupID"))), e;
};
var q = /* @__PURE__ */ new WeakSet();
class be {
  /** @param {string} [citationID] */
  constructor(e) {
    st(this, q), e || (e = c(q, this, We).call(this)), de._.has(e) && (console.warn("Citation ID must be unique"), e = c(q, this, We).call(this)), de._.add(e), this.citationID = e, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
  }
  static resetUsedIDs() {
    de._ = /* @__PURE__ */ new Set();
  }
  /**
   * @param {any} citationObject
   * @returns
   */
  fillFromObject(e) {
    return Object.hasOwnProperty.call(e, "properties") || Object.hasOwnProperty.call(e, "manualOverride") || Object.hasOwnProperty.call(e, "schema") ? c(q, this, xi).call(this, e) : Object.hasOwnProperty.call(e, "citationItems") ? c(q, this, Ci).call(this, e) : Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? c(q, this, Ai).call(this, e) : c(q, this, De).call(this, e);
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
    return this._citationItems.map(function(e) {
      return e.getInfoForCitationCluster();
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
    return c(q, this, Yt).call(this, {
      dontUpdate: !0
    }), this;
  }
  /**
   * @param {number} noteIndex
   * @returns {CSLCitation}
   */
  setNoteIndex(e) {
    return c(q, this, Yt).call(this, {
      noteIndex: e
    }), this;
  }
  /**
   * @param {string} plainCitation
   * @returns
   */
  setPlainCitation(e) {
    return c(q, this, Yt).call(this, {
      plainCitation: e
    }), this;
  }
  /**
   * @param {string} citeprocText
   * @param {string} [manualOverrideText]
   * @returns
   */
  setManualOverride(e, i) {
    var n = {
      citeprocText: e,
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
    var e = [];
    if (this._schema || e.push("Schema is required"), this.citationID || e.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems))
      for (var i = 0; i < this._citationItems.length; i++)
        this._citationItems[i].id || e.push("Citation item at index " + i + " must have an id");
    return e.length === 0 ? !0 : e;
  }
  toJSON() {
    var e = (
      /** @type {any} */
      {
        citationID: this.citationID,
        schema: this._schema
      }
    );
    return this._properties && Object.keys(this._properties).length > 0 && (e.properties = this._properties), this._manualOverride && Object.keys(this._manualOverride).length > 0 && (e.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (e.citationItems = this._citationItems.map(function(i) {
      return i.toJSON();
    })), e;
  }
}
function xi(t) {
  var e = this;
  if (Object.hasOwnProperty.call(t, "schema"), Object.hasOwnProperty.call(t, "properties") && c(q, this, Yt).call(this, t.properties), Object.hasOwnProperty.call(t, "manualOverride") && (this._manualOverride = t.manualOverride), !Object.hasOwnProperty.call(t, "citationItems"))
    return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(n) {
    return n.id;
  });
  return t.citationItems.forEach(function(n) {
    var s = n.id, r;
    i.indexOf(s) >= 0 ? r = e._citationItems[i.indexOf(s)] : (r = new z(s), i.push(s)), typeof s == "number" && (s = c(q, e, Li).call(e, n)), r.fillFromObject(n), c(q, e, Ae).call(e, r);
  }, this), i.length;
}
function Ci(t) {
  var e = this;
  return t.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (t.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), t.citationItems.forEach(function(i) {
    c(q, e, De).call(e, i);
  }, this), 1);
}
function De(t) {
  var e = t.id, i, n = this._citationItems.map(function(s) {
    return s.id;
  });
  return n.indexOf(e) >= 0 ? i = this._citationItems[n.indexOf(e)] : i = new z(e), i.fillFromObject(t), c(q, this, Ae).call(this, i), 1;
}
function Ai(t) {
  if (!Object.hasOwnProperty.call(t, "data"))
    return console.error("Invalid citation object"), 0;
  var e = this._citationItems.map(function(s) {
    return s.id;
  }), i = t.data.key, n;
  return e.indexOf(i) >= 0 ? n = this._citationItems[e.indexOf(i)] : n = new z(i), n.fillFromObject(t), c(q, this, Ae).call(this, n), 1;
}
function Ae(t) {
  var e = this._citationItems.map(function(i) {
    return i.id;
  });
  return e.indexOf(t.id) >= 0 ? (this._citationItems[e.indexOf(t.id)] = t, this) : (this._citationItems.push(t), this);
}
function Yt(t) {
  var e = this;
  return Object.keys(t).forEach(function(i) {
    Object.hasOwnProperty.call(t, i) && (e._properties[i] = t[i]);
  }, this), this;
}
function Li(t) {
  if (Object.hasOwnProperty.call(t, "uris") && t.uris.length) {
    var e = t.uris[0].lastIndexOf("/");
    return t.uris[0].slice(e + 1);
  }
  return t.id;
}
function We() {
  return Math.random().toString(36).substring(2, 15);
}
var de = {
  _: /* @__PURE__ */ new Set()
}, H = /* @__PURE__ */ new WeakMap(), ee = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakSet();
class ki {
  constructor() {
    st(this, at), R(this, H, void 0), R(this, ee, void 0), R(this, Ut, void 0), R(this, ie, void 0), x(H, this, new window.Asc.PluginWindow()), x(ee, this, window.Asc.plugin.button), x(Ut, this, Asc.plugin.onThemeChanged), x(ie, this, Asc.plugin.onTranslate);
  }
  /**
   * @param {string} description
   * @param {string} text
   */
  show(e, i) {
    x(H, this, new window.Asc.PluginWindow());
    var n = {
      name: "Zotero",
      url: "info-window.html",
      description: window.Asc.plugin.tr(e),
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
    return c(at, this, fe).call(this, n, i, "default"), a(H, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = (o, l) => {
        s(o === 0), c(at, this, Jt).call(this);
      };
    });
  }
  /**
   * @param {any} content
   */
  showEditWindow(e) {
    var i = this;
    x(H, this, new window.Asc.PluginWindow());
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
    return c(at, this, fe).call(this, n, e, "default"), a(H, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = /* @__PURE__ */ (function() {
        var o = I(function* (l, u) {
          var h = yield new Promise((v) => {
            if (!a(H, i)) {
              v(null);
              return;
            }
            a(H, i).attachEvent("onSaveFields", v), a(H, i).command("onClickSave");
          });
          s(l === 0 ? h : null), c(at, i, Jt).call(i);
        });
        return function(l, u) {
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
  showInfoWindow(e, i, n) {
    typeof n != "string" && (n = "warning"), x(H, this, new window.Asc.PluginWindow());
    var s = {
      name: "Mendeley",
      url: "info-window.html",
      description: window.Asc.plugin.tr(e),
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
    return c(at, this, fe).call(this, s, window.Asc.plugin.tr(i), n), a(H, this).show(s), new Promise((r, o) => {
      window.Asc.plugin.button = (l, u) => {
        r(l === 0), c(at, this, Jt).call(this);
      };
    });
  }
  destroy() {
    c(at, this, Jt).call(this), x(H, this, null);
  }
}
function fe(t, e, i) {
  a(H, this) && (x(ee, this, window.Asc.plugin.button), x(Ut, this, Asc.plugin.onThemeChanged), x(ie, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (n) => {
    var s;
    (s = a(H, this)) === null || s === void 0 || s.command("onThemeChanged", n), a(Ut, this).call(this, n);
  }, window.Asc.plugin.onTranslate = () => {
    var n;
    (n = a(H, this)) === null || n === void 0 || n.command("onTranslate"), a(ie, this).call(this);
  }, a(H, this).attachEvent("onWindowReady", () => {
    if (i === "warning") {
      var n;
      (n = a(H, this)) === null || n === void 0 || n.command("onWarning", e);
    } else if (i === "success") {
      var s;
      (s = a(H, this)) === null || s === void 0 || s.command("onSuccess", e);
    } else {
      var r;
      (r = a(H, this)) === null || r === void 0 || r.command("onAttachedContent", e);
    }
  }), a(H, this).attachEvent("onUpdateHeight", (n) => {
    var s;
    Asc.plugin.executeMethod("ResizeWindow", [(s = a(H, this)) === null || s === void 0 ? void 0 : s.id, [t.size[0] - 2, n]], () => {
    });
  }));
}
function Jt() {
  a(H, this) && a(H, this).close(), window.Asc.plugin.button = a(ee, this), window.Asc.plugin.onThemeChanged = a(Ut, this);
}
var _t = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakSet();
class Ii {
  /**
   * @param {LocalesManager} localesManager
   * @param {CslStylesManager} cslStylesManager
   * @param {ZoteroSdk} sdk
   */
  constructor(e, i, n) {
    st(this, T), R(this, _t, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = e, this._cslStylesManager = i, this._storage = new wi(), this._formatter, this.citationDocService = new yi(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), x(_t, this, new ki());
  }
  /** @returns {Promise<AddinFieldData | null>} */
  getCurrentField() {
    var e = this;
    return I(function* () {
      return e.citationDocService.getCurrentField();
    })();
  }
  /**
   * @returns {Promise<boolean>}
   */
  saveAsText() {
    var e = this;
    return I(function* () {
      var i = yield e.citationDocService.saveAsText();
      return i && a(_t, e).showInfoWindow("Success!", "All active Mendeley citations and Bibliography have been replaced.", "success"), i;
    })();
  }
  /**
   * @param {Array<SearchResultItem>} items
   * @returns {Promise<boolean>}
   */
  insertSelectedCitations(e) {
    var i = this;
    return I(function* () {
      var n = i;
      try {
        yield c(T, i, ft).call(i), c(T, i, pt).call(i);
      } catch (l) {
        throw l;
      }
      var s = new be("");
      for (var r in e) {
        var o = e[r];
        s.fillFromObject(o);
      }
      return c(T, i, Pi).call(i, e).then((l) => (l.forEach(function(u) {
        s.fillFromObject(u);
      }), i._storage.addCslCitation(s), c(T, n, Ei).call(n, s)));
    })();
  }
  /** @returns {Promise<string>} */
  insertBibliography() {
    var e = this;
    return I(function* () {
      try {
        var {
          fieldsWithCitations: i,
          bibFieldValue: n,
          bibField: s
        } = yield c(T, e, ft).call(e), r = i.length === 0;
        if (c(T, e, pt).call(e), s) {
          var o = [yield c(T, e, Dt).call(e, r, s)];
          return e.citationDocService.updateAddinFields(o).then((l) => l ? l[0] : "");
        } else
          return c(T, e, Oi).call(e, r, n);
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
  moveCursorToField(e, i) {
    var n = this;
    return I(function* () {
      return n.citationDocService.moveCursorToField(e, i);
    })();
  }
  /**
   * @param {string} fieldId
   * @param {boolean} [isBeforeField]
   * @returns {Promise<void>}
   */
  moveCursorOutsideField(e, i) {
    var n = this;
    return I(function* () {
      return n.citationDocService.moveCursorOutsideField(e, i);
    })();
  }
  /**
   * @returns {Promise<void>}
   */
  moveCursorRight() {
    var e = this;
    return I(function* () {
      return e.citationDocService.moveCursorRight();
    })();
  }
  /**
   * @param {boolean} [bHardRefresh]
   * @returns {Promise<void>}
   */
  updateCslItems(e) {
    var i = this;
    return I(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(T, i, ft).call(i), r = n.length === 0;
        c(T, i, pt).call(i);
        var o = [];
        if (typeof e > "u") {
          var l = i._cslStylesManager.getLastUsedFormat();
          l === "numeric" && (e = !0);
        }
        if (typeof e == "boolean" && (o = yield c(T, i, Ft).call(i, n, e)), s && o.push(yield c(T, i, Dt).call(i, r, s)), o && o.length)
          return i.citationDocService.updateAddinFields(o);
      } catch (u) {
        throw u;
      }
    })();
  }
  /**
   * // it is a crutch, because "SelectAddinField" does not work with notes
   * @param {"footnotes" | "endnotes"} notesStyle
   * @returns {Promise<void>}
   */
  updateCslItemsInNotes(e) {
    var i = this;
    return I(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(T, i, ft).call(i), r = n.length === 0;
        c(T, i, pt).call(i);
        var o = yield c(T, i, Ft).call(i, n, !1);
        if (o && o.length && (yield i.citationDocService.convertNotesStyle(o, e)), s) {
          var l = [yield c(T, i, Dt).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(l);
        }
      } catch (u) {
        throw u;
      }
    })();
  }
  /**
   * @param {Object & {citationID: string}} updatedField
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  updateItem(e, i) {
    var n = this;
    return I(function* () {
      try {
        var {
          fieldsWithCitations: s,
          bibField: r
        } = yield c(T, n, ft).call(n, e), o = s.length === 0;
        c(T, n, pt).call(n);
        var l = yield c(T, n, Ft).call(n, s, !0);
        if (i && l && l.length && (yield n.citationDocService.convertNotesStyle(l, i), l = []), l && l.length)
          return n.citationDocService.updateAddinFields(l);
      } catch (u) {
        throw u;
      }
    })();
  }
  /**
   * @param {"footnotes" | "endnotes"} [notesStyle]
   * @returns {Promise<void>}
   */
  switchingBetweenNotesAndText(e) {
    var i = this;
    return I(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(T, i, ft).call(i), r = n.length === 0;
        c(T, i, pt).call(i);
        var o = yield c(T, i, Ft).call(i, n, !0);
        if (o && o.length && (e ? yield i.citationDocService.convertTextToNotes(o, e) : yield i.citationDocService.convertNotesToText(o)), s) {
          var l = [yield c(T, i, Dt).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(l);
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
  convertNotesStyle(e) {
    var i = this;
    return I(function* () {
      try {
        var {
          fieldsWithCitations: n
        } = yield c(T, i, ft).call(i);
        c(T, i, pt).call(i);
        var s = yield c(T, i, Ft).call(i, n, !1, !0);
        if (!s || !s.length) return;
        yield i.citationDocService.convertNotesStyle(s, e);
      } catch (r) {
        throw r;
      }
    })();
  }
  /**
   * @param {AddinFieldData} field
   * @returns {Promise<Object & {citationID: string} | null>}
   */
  showEditCitationWindow(e) {
    var i = this;
    return I(function* () {
      if (!e) return null;
      var n = c(T, i, we).call(i, e), s = yield a(_t, i).showEditWindow(n);
      return s || null;
    })();
  }
  /** @param {string} message */
  showWarningMessage(e) {
    var i = this;
    return I(function* () {
      a(_t, i).showInfoWindow("Warning!", e);
    })();
  }
}
function Ei(t) {
  var e = this, i = !1;
  return Promise.resolve().then(function() {
    if (t.getCitationItems().forEach(function(s) {
      e._storage.hasItem(s.id) || (i = !0);
    }), i) {
      var n = [];
      e._storage.forEachItem(function(s, r) {
        n.push(r);
      }), e._formatter.updateItems(n);
    }
  }).then(function() {
    var n = document.createDocumentFragment(), s = document.createElement("div"), r = e._storage.getCitationsPre(t.citationID), o = e._storage.getCitationsPost(t.citationID), l = e._storage.getAllCitationsInJson();
    e._formatter.rebuildProcessorState(l);
    var u = e._formatter.processCitationCluster(t.toJSON(), r, o), h = c(T, e, Le).call(e, u[1][0][1]);
    n.appendChild(s), s.innerHTML = h, t.setPlainCitation(s.innerText);
    var v = null;
    return e._cslStylesManager.getLastUsedFormat() === "note" && (v = e._cslStylesManager.getLastUsedNotesStyle()), e.citationDocService.addCitation(h, JSON.stringify(t.toJSON()), v);
  });
}
function Pi(t) {
  var e = [], i = {};
  for (var n in t) {
    var s = t[n], r = s.userID, o = s.groupID;
    r ? e.push(s.id) : o && (i[o] || (i[o] = []), i[o].push(s.id));
  }
  var l = [];
  e.length && l.push(this._sdk.getItems(null, e, "json").then(function(h) {
    return h.items || [];
  }));
  for (var u in i)
    Object.hasOwnProperty.call(i, u) && l.push(this._sdk.getGroupItems(null, u, i[u], "json").then(function(h) {
      return h.items || [];
    }));
  return Promise.all(l).then(function(h) {
    return h.reduce((v, g) => v.concat(g), []);
  });
}
function Ye() {
  try {
    for (var t = new Array(this._storage.size), e = this._formatter.makeBibliography(), i = 0; i < e[1].length; i++) {
      var n = c(T, this, Le).call(this, e[1][i]);
      n = n.replaceAll(`
`, "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
      var s = '<div class="csl-entry">', r = "</div>";
      e[0]["second-field-align"] ? n.indexOf(s) === 0 && n.endsWith(r) && (n = s + n.substring(s.length, n.length - r.length).trim() + r) : (n = n.replace(/<\/?div[^>]*>/g, ""), n = "<p>" + n + "</p>"), window.Asc.scope.editorVersion < 9004e3 && (n += `
`), t.push(n);
    }
    var o = t.join("").trim();
    return Asc.scope.bibStyle = e[0], o;
  } catch (l) {
    if (this._cslStylesManager.isLastUsedStyleContainBibliography() === !1)
      a(_t, this).showInfoWindow("Warning!", "Style does not describe the bibliography");
    else
      throw console.error(l), "Failed to apply this style.";
    return "";
  }
}
function we(t) {
  var e, i = t.Value.indexOf("{"), n = t.Value.lastIndexOf("}");
  if (i !== -1) {
    var s = t.Value.slice(i, n + 1);
    e = JSON.parse(s);
  }
  return e;
}
function ft(t) {
  var e = this;
  return this._storage.clear(), be.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
    var n = 0, s = " ", r = i.find(function(h) {
      return h.Value.indexOf(e._bibPrefixNew) !== -1 || h.Value.indexOf(e._bibPrefix) !== -1;
    });
    if (r) {
      var o = c(T, e, we).call(e, r);
      typeof o == "object" && Object.keys(o).length > 0 && (s = JSON.stringify(o));
    }
    var l = i.filter(function(h) {
      return h.Value.indexOf(e._citPrefixNew) !== -1 || h.Value.indexOf(e._citPrefix) !== -1;
    }), u = l.map(function(h) {
      var v = c(T, e, we).call(e, h), g = "";
      h.Value.indexOf(e._citPrefix) === -1 && (g = v.citationID);
      var y = new be(g);
      return t ? n += y.fillFromObject(t) : n += y.fillFromObject(v), e._storage.addCslCitation(y), {
        field: Ze({}, h),
        cslCitation: y
      };
    });
    return t && (u = u.filter(function(h) {
      return h.cslCitation.citationID === t.citationID;
    })), {
      bibField: r,
      bibFieldValue: s,
      fieldsWithCitations: u
    };
  });
}
function Oi(t, e) {
  var i = c(T, this, Ye).call(this);
  if (t && (i = b(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography())
    return this.citationDocService.addBibliography(i, e);
  throw "The current bibliographic style does not describe the bibliography";
}
function Dt(t, e) {
  if (t)
    e.Content = b(this._bibPlaceholderIfEmpty);
  else {
    var i = c(T, this, Ye).call(this);
    e.Content = i;
  }
  return e;
}
function Ft(t, e, i) {
  return Se.apply(this, arguments);
}
function Se() {
  return Se = I(function* (t, e, i) {
    var n = document.createDocumentFragment(), s = document.createElement("div");
    n.appendChild(s);
    for (var r = [], o = t.length - 1; o >= 0; o--) {
      var l = !!i, {
        field: u,
        cslCitation: h
      } = t[o], v = this._storage.getCitationsPre(h.citationID), g = this._storage.getCitationsPost(h.citationID), y = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(y);
      var w = this._formatter.processCitationCluster(h.toJSON(), v, g), C = c(T, this, Le).call(this, w[1][0][1]);
      s.innerHTML = C;
      var M = h.getPlainCitation(), N = u.Content;
      M === "" && (M = N);
      var E = s.innerText;
      if (!h.getDoNotUpdate()) {
        if (M !== N && !e) {
          var J = "<p>" + b("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + b("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + b("Original:") + " " + E + "</p><p>" + b("Modified:") + " " + N + "</p>", X = yield a(_t, this).show("Saving custom edits", J);
          X ? (h.setDoNotUpdate(), delete u.Content) : (u.Content = C, h.setPlainCitation(E)), l = !0;
        } else
          (E !== N || M !== N || M !== E) && (l = !0), u.Content = C, h.setPlainCitation(E);
        if (h) {
          var V = this._citPrefixNew + " " + this._citSuffixNew + JSON.stringify(h.toJSON());
          u.Value !== V && (l = !0), u.Value = V;
        }
        l && r.push(u);
      }
    }
    return r;
  }), Se.apply(this, arguments);
}
function pt() {
  var t = this, e = [];
  this._storage.forEachItem(function(i, n) {
    e.push(n);
  }), this._formatter = new CSL.Engine({
    /** @param {string} id */
    retrieveLocale: function(n) {
      return t._localesManager.getLocale(n) ? t._localesManager.getLocale(n) : t._localesManager.getLocale();
    },
    /** @param {string} id */
    retrieveItem: function(n) {
      var s = t._storage.getItem(n), r = t._storage.getItemIndex(n);
      return s ? s.toFlatJSON(r) : null;
    }
  }, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), !0), e.length && this._formatter.updateItems(e);
}
function Le(t) {
  return t.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
class qe {
  /** @returns {Promise<number>} */
  static getCursorPosition() {
    return new Promise(function(e) {
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
      }, n, i, e);
    });
  }
  /**
   * @param {number} pos 
   * @returns {Promise<void>}
   */
  static setCursorPosition(e) {
    return new Promise(function(i) {
      var n = !1, s = !1;
      Asc.scope.pos = e, Asc.plugin.callCommand(function() {
        var r = Api.GetDocument();
        r.MoveCursorToPos(Asc.scope.pos);
      }, s, n, i);
    });
  }
}
var Kt = {
  /**
   * Parse a style object to extract relevant information.
   * @param {string} name
   * @param {string} style - A style string
   * @returns {StyleInfo} An object containing the parsed style information.
   */
  getStyleInfo: function(e, i) {
    var n = new DOMParser(), s = n.parseFromString(i, "text/xml"), r = {
      categories: {
        fields: [],
        format: ""
      },
      dependent: 0,
      href: "",
      name: e,
      title: "",
      updated: ""
    }, o = s.querySelector("info title");
    o && (r.title = o.textContent);
    var l = s.querySelector('info link[rel="self"]');
    if (l) {
      var u = l.getAttribute("href");
      u && (r.href = u);
    }
    var h = s.querySelector('info link[rel="independent-parent"]');
    if (h) {
      var v = h.getAttribute("href");
      v && (r.parent = v), r.dependent = 1;
    }
    var g = s.querySelector("info updated");
    g && (r.updated = g.textContent);
    var y = s.querySelector("info category[citation-format]");
    if (y) {
      var w = y.getAttribute("citation-format");
      w && (r.categories.format = w);
    }
    var C = s.querySelectorAll("info category[field]");
    return C && C.forEach(function(M) {
      var N = M.getAttribute("field");
      N && r.categories.fields.push(N);
    }), r;
  },
  /**
   * @param {string} styleContent
   * @returns {StyleFormat}
   */
  getCitationFormat: function(e) {
    var i = new DOMParser(), n = i.parseFromString(e, "text/xml"), s = n.querySelector("info category[citation-format]");
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
  isStyleContainBibliography: function(e) {
    return e.indexOf("<bibliography") > -1;
  }
};
function bt() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
bt.prototype.getStyleNames = function() {
  var t = localStorage.getItem(this._customStyleNamesKey);
  return t ? JSON.parse(t) : [];
};
bt.prototype._getStyles = function() {
  var t = localStorage.getItem(this._customStylesKey);
  return t ? JSON.parse(t) : [];
};
bt.prototype.getStyle = function(t) {
  var e = this.getStyleNames(), i = e.indexOf(t);
  return i === -1 ? null : this._getStyles()[i];
};
bt.prototype.getStylesInfo = function() {
  for (var t = this.getStyleNames(), e = this._getStyles(), i = [], n = 0; n < t.length; n++) {
    var s = Kt.getStyleInfo(t[n], e[n]);
    i.push(s);
  }
  return i;
};
bt.prototype.setStyle = function(t, e) {
  var i = this.getStyleNames(), n = this._getStyles(), s = i.indexOf(t);
  return s === -1 && (s = i.length), i[s] = t, n[s] = e, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), Kt.getStyleInfo(t, e);
};
bt.prototype.deleteStyle = function(t) {
  var e = this.getStyleNames(), i = this._getStyles(), n = e.indexOf(t);
  return n === -1 || (e.splice(n, 1), i.splice(n, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(e)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), t;
};
function G(t) {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new bt(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = t, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
G.prototype.addCustomStyle = function(t) {
  var e = this;
  return new Promise(function(i, n) {
    var s = t.name.toLowerCase();
    s.slice(-4) === ".csl" || s.slice(-4) === ".xml" ? s = s.substring(0, s.length - 4).trim() : n("Please select a .csl or .xml file."), t.size > 1024 * 1024 && n("Maximum file size is 1 MB."), i(s);
  }).then(function(i) {
    return e._readCSLFile(t).then(function(n) {
      return e._defaultStyles.indexOf(i) === -1 && e._defaultStyles.push(i), e._customStylesStorage.setStyle(i, n);
    });
  });
};
G.prototype.getLastUsedFormat = function() {
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
};
G.prototype.getLastUsedNotesStyle = function() {
  var t = localStorage.getItem(this._lastNotesStyleKey);
  return t === "footnotes" || t === "endnotes" ? t : "footnotes";
};
G.prototype.getLastUsedStyleId = function() {
  var t = localStorage.getItem(this._lastStyleKey);
  return t || null;
};
G.prototype.getLastUsedStyleIdOrDefault = function() {
  var t = localStorage.getItem(this._lastStyleKey);
  return t || "ieee";
};
G.prototype.getStyle = function(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, i = this;
  return Promise.resolve(t).then(function(n) {
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
      var s = Kt.getStyleInfo(t, n);
      if (s && s.dependent > 0 && s.parent)
        return fetch(s.parent).then(function(r) {
          return r.text();
        });
    }
    return n;
  }).then(function(n) {
    var s = n && Kt.getCitationFormat(n) || "numeric", r = {
      content: n,
      styleFormat: s
    };
    return n && e && i._saveLastUsedStyle(t, n, s), r;
  });
};
G.prototype.getStylesInfo = function() {
  var t = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(e) {
    var i = t.getLastUsedStyleId() || "ieee", n = [], s = t._customStylesStorage.getStyleNames(), r = e[0], o = e[1];
    return t._isDesktopAvailable && !t._isOnlineAvailable && (r = r.filter(function(l) {
      return t._defaultStyles.indexOf(l.name) >= 0 || l.name == i;
    })), o.forEach(function(l) {
      n.push(l), t._defaultStyles.indexOf(l.name) === -1 && t._defaultStyles.push(l.name);
    }), r.forEach(function(l) {
      s.indexOf(l.name) === -1 && n.push(l);
    }), n.sort((l, u) => l.name.localeCompare(u.name)), n;
  });
};
G.prototype._getStylesJson = function() {
  var t = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (t = this._STYLES_JSON_URL), fetch(t).then(function(e) {
    return e.json();
  });
};
G.prototype.cached = function(t) {
  return Object.hasOwnProperty.call(this._cache, t) ? this._cache[t] : null;
};
G.prototype.isLastUsedStyleContainBibliography = function() {
  var t = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  return t !== "false";
};
G.prototype.isStyleDefault = function(t) {
  return this._defaultStyles.indexOf(t) >= 0;
};
G.prototype._isValidCSL = function(t) {
  return t.indexOf("<?xml") > -1 && t.indexOf("<style") > -1 && t.indexOf("<macro") > -1 && t.indexOf("citation") > -1;
};
G.prototype._readCSLFile = function(t) {
  var e = this;
  return new Promise(function(i, n) {
    var s = new FileReader();
    s.onload = function(r) {
      var o = r.target ? String(r.target.result) : "";
      if (!e._isValidCSL(o)) {
        n("The file is not a valid CSL file");
        return;
      }
      i(o);
    }, s.onerror = function() {
      n("Failed to read file");
    }, s.readAsText(t);
  });
};
G.prototype._saveLastUsedStyle = function(t, e, i) {
  this._cache[t] = e, localStorage.setItem(this._lastStyleKey, t), localStorage.setItem(this._lastFormatKey, i);
  var n = Kt.isStyleContainBibliography(e);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, n.toString());
};
G.prototype.saveLastUsedNotesStyle = function(t) {
  localStorage.setItem(this._lastNotesStyleKey, t);
};
G.prototype.setDesktopApiAvailable = function(t) {
  this._isDesktopAvailable = t;
};
G.prototype.setRestApiAvailable = function(t) {
  this._isOnlineAvailable = t;
};
function ut() {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
ut.prototype.loadLocale = function(t) {
  var e = this;
  if (this._selectedLanguage = t, this._cache[t])
    return Promise.resolve(this._cache[t]);
  var i = this._getLocalesUrl() + "locales-" + t + ".xml";
  return fetch(i).catch(function(n) {
    return console.error("Failed to load locale:", n), fetch(e._LOCALES_PATH + "locales-" + t + ".xml");
  }).then(function(n) {
    return n.text();
  }).then(function(n) {
    return e._cache[t] = n, n;
  });
};
ut.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
};
ut.prototype.getLocale = function(t) {
  return t ? this._cache[t] ? this._cache[t] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
};
ut.prototype.saveLastUsedLanguage = function(t) {
  this._selectedLanguage = t, localStorage.setItem(this._lastLanguageKey, t);
};
ut.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};
ut.prototype.setDesktopApiAvailable = function(t) {
  this._isDesktopAvailable = t;
};
ut.prototype.setRestApiAvailable = function(t) {
  this._isOnlineAvailable = t;
};
function K(t, e) {
  if (this._router = t, this._displayNoneClass = e, this._saveBtn = new Y("saveSettingsBtn", {
    variant: "primary"
  }), this._cancelBtn = new Y("cancelBtn", {
    variant: "secondary"
  }), this._styleSelect = new mt("styleSelectList", {
    placeholder: "Enter style name",
    sortable: !0
  }), this._styleSelectListOther = new mt("styleSelectedListOther", {
    placeholder: "Enter style name",
    searchable: !0
  }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper)
    throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new Me("footNotes", {
    label: "Footnotes"
  }), this._endNotes = new Me("endNotes", {
    label: "Endnotes"
  }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput)
    throw new Error("cslFileInput not found");
  this._languageSelect = new mt("styleLangList", {
    placeholder: "Select language"
  }), this._cslStylesManager = new G("zoteroStyleId"), this._localesManager = new ut(), this._selectLists = [], this._onChangeState = function(i, n) {
  }, this._styleMessage = new Pt("styleMessage", {
    type: "error"
  }), this._langMessage = new Pt("langMessage", {
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
  var t = this._cslStylesManager.getLastUsedStyleId() || "ieee", e = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, e);
  var i = [this._onStyleChange(t), this._localesManager.loadLocale(e), this._loadStyles()];
  return Promise.all(i);
};
K.prototype.onChangeState = function(t) {
  this._onChangeState = t;
};
K.prototype.setDesktopApiAvailable = function(t) {
  this._localesManager.setDesktopApiAvailable(t), this._cslStylesManager.setDesktopApiAvailable(t);
};
K.prototype.setRestApiAvailable = function(t) {
  this._localesManager.setRestApiAvailable(t), this._cslStylesManager.setRestApiAvailable(t);
};
K.prototype._addEventListeners = function() {
  var t = this;
  this._saveBtn.subscribe(function(e) {
    if (e.type === "button:click") {
      var i = t._languageSelect.getSelectedValue();
      if (i === null) {
        console.error("No language selected");
        return;
      }
      var n = Ze({}, t._stateSettings), s = [];
      t._stateSettings.language !== i && (t._localesManager.saveLastUsedLanguage(i), s.push(t._localesManager.loadLocale(i).catch(function(l) {
        throw console.error(l), t._langMessage.show(b("Failed to load language")), l;
      })));
      var r = "footnotes";
      t._endNotes.getState().checked && (r = "endnotes"), t._stateSettings.notesStyle !== r && (t._cslStylesManager.saveLastUsedNotesStyle(r), t._cslStylesManager.getLastUsedFormat() === "note" && s.push(Promise.resolve()));
      var o = t._styleSelect.getSelectedValue();
      t._stateSettings.style !== o && o !== null && s.push(t._onStyleChange(o)), s.length ? (t._showLoader(), Promise.all(s).then(function() {
        t._hide(), t._hideLoader();
        var l = {
          language: i,
          style: o || "ieee",
          notesStyle: r,
          styleFormat: t._cslStylesManager.getLastUsedFormat()
        };
        t._onChangeState(l, n);
      }).catch(function(l) {
        t._hideLoader();
      })) : t._hide();
    }
  }), this._cancelBtn.subscribe(function(e) {
    if (e.type === "button:click") {
      var i = t._languageSelect.getSelectedValue(), n = t._styleSelect.getSelectedValue();
      i !== null && t._localesManager.getLastUsedLanguage() !== i && t._languageSelect.selectItems(t._localesManager.getLastUsedLanguage(), !0), t._stateSettings.style !== n && n !== null ? (t._styleSelect.selectItems(t._stateSettings.style, !0), t._styleSelectListOther.selectItems(t._stateSettings.style, !0), t._onStyleChange(t._stateSettings.style, !0).then(function() {
        t._hide();
      })) : t._hide();
    }
  }), this._cslFileInput.onchange = function(e) {
    if (e.target instanceof HTMLInputElement) {
      var i = e.target;
      if (i.files) {
        var n = i.files[0];
        if (!n) {
          console.error("No file selected");
          return;
        }
        t._cslStylesManager.addCustomStyle(n).then(function(s) {
          t._addStylesToList([s]);
        }).catch(function(s) {
          console.error(s), t._styleMessage.show(b("Invalid CSL style file"));
        }).finally(function() {
          t._hideLoader();
        });
      }
    }
  }, this._styleSelect.subscribe(function(e) {
    if (e.type === "selectbox:change") {
      t._styleSelectListOther.selectItems(e.detail.current.toString(), !0), t._somethingWasChanged(), t._onStyleChange(e.detail.current.toString(), !0);
      return;
    } else if (e.type !== "selectbox:custom")
      return;
    var i = e.detail.current;
    i === "more_styles" && t._styleSelectListOther.openDropdown();
  }), t._styleSelectListOther.subscribe(function(e) {
    if (e.type === "selectbox:change" && e.detail.items) {
      var i = e.detail.items[0];
      t._styleSelect.addItem(i.value, i.text, !0), t._somethingWasChanged(), t._onStyleChange(i.value, !0);
    }
  }), this._languageSelect.subscribe(function(e) {
    e.type === "selectbox:change" && t._somethingWasChanged();
  }), this._footNotes.subscribe(function(e) {
    t._somethingWasChanged();
  }), this._endNotes.subscribe(function(e) {
    t._somethingWasChanged();
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
  var t = this;
  return this._cslStylesManager.getStylesInfo().then(
    /** @param {Array<StyleInfo>} stylesInfo*/
    function(e) {
      t._addStylesToList(e), t._styleSelect.addCustomItem("more_styles", "More Styles..."), t._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
    }
  ).catch(function(e) {
    console.error(e);
  });
};
K.prototype._addStylesToList = function(t) {
  var e = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = t.map(function(r) {
    return [r.name, r.title];
  }), s = n.filter(function(r) {
    return !!(r[0] == i || e._cslStylesManager.isStyleDefault(r[0]));
  });
  this._styleSelect.addItems(s, i), this._styleSelectListOther.addItems(n, i);
};
K.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
};
K.prototype._onStyleChange = function(t, e) {
  var i = this;
  return e && i._showLoader(), i._cslStylesManager.getStyle(t, !e).then(function(n) {
    var s = n.styleFormat;
    i._bNumFormat = s == "numeric", s === "note" ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), e && i._hideLoader();
  }).catch(function(n) {
    throw console.error(n), typeof n == "string" && i._styleMessage.show(b(n)), e && i._hideLoader(), n;
  });
};
K.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
};
K.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
function rt(t, e) {
  if (this._router = t, this._sdk = e, this._apiKeyLoginField = new yt("apiKeyField", {
    autofocus: !0,
    autocomplete: "on"
  }), this._saveApiKeyBtn = new Y("saveApiKeyBtn", {
    disabled: !0
  }), this._apiKeyMessage = new Pt("apiKeyMessage", {
    type: "error"
  }), this._useDesktopMessage = new Pt("useDesktopMessage", {
    type: "error"
  }), this._connectToLocalZotero = new Y("connectToLocalZotero", {
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
rt.prototype.init = function() {
  var t = this;
  this._addEventListeners();
  var e = !1, i = document.querySelectorAll(".for-zotero-online"), n = xe.runApisChecker(t._sdk);
  n.subscribe(function(r) {
    if (t._onChangeState(r), e || (e = !0, !r.desktopVersion && t._useDesktopApp && t._useDesktopApp.classList.add("hidden"), t._onOpen(), t._show()), r.online ? i.forEach(function(o) {
      o.classList.remove("hidden");
    }) : i.forEach(function(o) {
      o.classList.add("hidden");
    }), r.online && r.hasKey) {
      t._sdk.setIsOnlineAvailable(!0), t._hide(!0), t._onAuthorized(r);
      return;
    } else if (r.desktop && r.hasPermission) {
      t._sdk.setIsOnlineAvailable(!1), t._hide(), t._hideAllMessages(), t._onAuthorized(r);
      return;
    }
  });
  var s = {
    /**
     * @param {function(): void} callbackFn
     */
    onOpen: function(o) {
      return t._onOpen = o, s;
    },
    /**
     * @param {function(AvailableApis): void} callbackFn
     */
    onChangeState: function(o) {
      return t._onChangeState = o, s;
    },
    /**
     * @param {function(AvailableApis): void} callbackFn
     */
    onAuthorized: function(o) {
      return t._onAuthorized = o, s;
    }
  };
  return s;
};
rt.prototype._addEventListeners = function() {
  var t = this;
  this._apiKeyLoginField.subscribe(function(e) {
    e.type, e.type === "inputfield:input" && (t._apiKeyLoginField.getValue() ? t._saveApiKeyBtn.enable() : t._saveApiKeyBtn.disable());
  }), this._saveApiKeyBtn.subscribe(function(e) {
    e.type === "button:click" && t._tryToApplyKey();
  }), this._connectToLocalZotero.subscribe(function(e) {
    e.type === "button:click" && (t._showLoader(), xe.checkStatus(t._sdk).then(function(i) {
      if (i.desktop && i.hasPermission)
        t._sdk.setIsOnlineAvailable(!1), t._hide(), t._hideAllMessages();
      else if (i.desktop && !i.hasPermission) {
        var n = 'Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check "Allow other applications on this computer to communicate with Zotero"';
        t._useDesktopMessage.show(b(n));
      } else i.desktop || t._useDesktopMessage.show(b("Connection to Zotero failed. Make sure Zotero is running."));
    }).finally(function() {
      t._hideLoader();
    }));
  }), this._logoutLink.onclick = function(e) {
    return t._sdk.clearSettings(), t._show(), !0;
  };
};
rt.prototype._tryToApplyKey = function() {
  var t = this, e = t._apiKeyLoginField.getValue();
  e && (t._showLoader(), t._sdk.setApiKey(e).then(function() {
    xe.successfullyLoggedInUsingApiKey(), t._hide(!0);
  }).catch(function(i) {
    console.error(i), t._apiKeyMessage.show(b("Invalid API key"));
  }).finally(function() {
    t._hideLoader();
  }));
};
rt.prototype._hideAllMessages = function() {
  this._apiKeyMessage.close();
};
rt.prototype._hide = function(t) {
  this._router.openMain(), t && this._logoutLink.classList.remove("hidden");
};
rt.prototype._show = function() {
  this._router.openLogin(), this._logoutLink.classList.add("hidden");
};
rt.prototype._showLoader = function() {
  this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
};
rt.prototype._hideLoader = function() {
  this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
function Nt() {
  this._searchField = new yt("searchField", {
    type: "text",
    autofocus: !0,
    showClear: !1
  }), this._filterButton = new Y("filterButton", {
    variant: "secondary-icon",
    size: "small"
  }), this._librarySelectList = new mt("librarySelectList", {
    // TODO: add translation
    placeholder: b("No items selected"),
    multiple: !0,
    description: b("Search in:")
  }), this._subscribers = [], this._addEventListeners();
}
Nt.prototype._addEventListeners = function() {
  var t = this;
  this._searchField.subscribe(function(e) {
    if (e.type === "inputfield:blur" || e.type === "inputfield:submit") {
      var i = t._getSelectedGroups();
      t._subscribers.forEach(function(n) {
        n(e.detail.value, i);
      });
    }
  }), this._filterButton.subscribe(function(e) {
    e.type === "button:click" && (t._librarySelectList.isOpen || (e.detail.originalEvent && e.detail.originalEvent.stopPropagation(), t._librarySelectList.openDropdown()));
  });
};
Nt.prototype.addGroups = function(t) {
  var e = this, i = localStorage.getItem("selectedGroups"), n = i ? JSON.parse(i).map(function(w) {
    return w.toString();
  }) : ["my_library", "group_libraries"], s = !1;
  t.forEach(function(w) {
    w.id = String(w.id);
  });
  var r = [{
    id: "my_library",
    name: b("My Library")
  }, {
    id: "group_libraries",
    name: b("Group Libraries")
  }];
  !s && r.forEach(function(w) {
    n.indexOf(w.id) !== -1 && (s = !0);
  }), !s && t.forEach(function(w) {
    n.indexOf(w.id.toString()) !== -1 && (s = !0);
  }), s || (n = ["my_library", "group_libraries"]);
  for (var o = function(C, M, N) {
    typeof C == "number" && (C = C.toString()), e._librarySelectList instanceof mt && e._librarySelectList.addItem(C, M, N);
  }, l = 0; l < r.length; l++) {
    var u = r[l].id, h = r[l].name;
    o(u, h, n.indexOf(u) !== -1);
  }
  if (t.length !== 0) {
    this._librarySelectList.addSeparator();
    for (var v = n.indexOf("group_libraries") !== -1, l = 0; l < t.length; l++) {
      var g = t[l].id, y = t[l].name;
      o(g, y, v || n.indexOf(g.toString()) !== -1);
    }
    this._selectedGroupsWatcher(r, t);
  }
};
Nt.prototype._getSelectedGroups = function() {
  var t = this, e = this._librarySelectList.getSelectedValues();
  return (Array.isArray(e) === !1 || e.length === 0) && setTimeout(function() {
    t._librarySelectList.openDropdown();
  }, 500), e === null || typeof e == "string" ? [] : e;
};
Nt.prototype.subscribe = function(t) {
  var e = this;
  return this._subscribers.push(t), {
    unsubscribe: function() {
      e._subscribers = e._subscribers.filter(function(n) {
        return n !== t;
      });
    }
  };
};
Nt.prototype._selectedGroupsWatcher = function(t, e) {
  var i = this;
  this._librarySelectList instanceof mt && this._librarySelectList.subscribe(function(n) {
    if (n.type === "selectbox:change") {
      var s = [], r = n.detail.values, o = n.detail.current, l = n.detail.enabled, u = t.map(function(y) {
        return y.id;
      }), h = e.map(function(y) {
        return y.id.toString();
      }), v = u.indexOf(String(o)) !== -1;
      if (v)
        o === "group_libraries" ? (l ? (s.push("group_libraries"), i._librarySelectList.selectItems(h, !0)) : i._librarySelectList.unselectItems(h, !0), r.indexOf("my_library") !== -1 && s.push("my_library")) : r.indexOf("group_libraries") !== -1 ? (s.push("group_libraries"), l && s.push(o)) : s = r.slice();
      else if (!v) {
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
var Ni = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
function W(t, e, i) {
  this._displayNoneClass = t, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = i, this._fLoadMore = e, this._loadTimeout, this._init();
}
W.prototype._init = function() {
  var t = this;
  this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(e) {
    var i = [];
    for (var n in t._items)
      i.push(n);
    for (var s = 0; s < i.length; s++)
      t._removeSelected(i[s]);
  }), this._docsHolder && this._docsHolder.addEventListener("keydown", function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      var i;
      e.preventDefault();
      var n = (i = t._docsHolder) === null || i === void 0 ? void 0 : i.querySelectorAll(".checkbox-container:not(.checkbox--checked)");
      n == null || n.forEach(function(s) {
        s.click();
      });
    }
  });
};
W.prototype.clearLibrary = function() {
  this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
  for (var t = this._docsHolder; t && t.lastChild; )
    t.removeChild(t.lastChild);
  t && (t.scrollTop = 0), this._docsScroller.onscroll();
};
W.prototype.displayNothingFound = function() {
  this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
};
W.prototype.displaySearchItems = function(t, e, i) {
  var n = this, s = this._docsHolder;
  this._lastSearch = i;
  var r = 0;
  return new Promise((o, l) => {
    if (t && t.items && t.items.length > 0) {
      var u = document.createElement("div");
      s && u.classList.add("page" + s.children.length);
      for (var h = 0; h < t.items.length; h++) {
        var v = t.items[h];
        v.title && (u.appendChild(n._buildDocElement(v)), r++);
      }
      s && s.appendChild(u);
    } else e && l(e);
    this._docsScroller.onscroll(), o(r);
  });
};
W.prototype.getSelectedItems = function() {
  var t = Object.assign({}, this._items || {});
  return t;
};
W.prototype.removeItems = function(t) {
  var e = this;
  t.forEach(function(i) {
    e._removeSelected(i);
  });
};
W.prototype.subscribe = function(t) {
  var e = this;
  return this._subscribers.push(t), {
    unsubscribe: function() {
      e._subscribers = e._subscribers.filter(function(n) {
        return n !== t;
      });
    }
  };
};
W.prototype._buildDocElement = function(t) {
  var e = this, i = document.createElement("div");
  i.classList.add("doc");
  var n = document.createElement("div");
  n.classList.add("docInfo");
  var s = document.createElement("div"), r = "";
  t.author && t.author.length > 0 && (r = t.author.map(function(w) {
    return w.family && w.given ? w.family.trim() + ", " + w.given.trim() : w.family ? w.family.trim() : w.given ? w.given.trim() : "";
  }).join("; "));
  var o = document.createElement("div");
  o.classList.add("selectbox-arrow"), o.innerHTML = "<b></b>";
  var l = document.createElement("div");
  if (l.textContent = t.title.trim(), l.classList.add("truncate-text"), l.classList.add("secondary-text"), (t.publisher || t["publisher-place"]) && (l.textContent += " · " + (t.publisher || t["publisher-place"] || "")), t.issued && t.issued["date-parts"]) {
    var u = t.issued["date-parts"][0];
    r.length > 20 ? l.textContent += " (" + u.join("-") + ")" : (r.length > 0 && r.slice(-1) !== "." && r.slice(-1) !== "," && (r += "."), r += " " + u.join("-"));
  }
  r.length === 0 && (r = l.textContent), l.setAttribute("title", l.textContent), n.appendChild(l);
  var h = document.createElement("input");
  s.appendChild(h);
  var v = new Qt(h, {
    checked: !!this._items[t.id],
    label: r,
    title: !0,
    id: t.id
  });
  this._items[t.id] && (this._checks[t.id] = v), s.appendChild(o), i.appendChild(s), i.appendChild(n);
  var g;
  function y() {
    i.classList.toggle("doc-open"), g || (g = e._buildCitationParams(t), i.appendChild(g));
  }
  return o.onclick = y, v.subscribe(function(w) {
    w.type === "checkbox:change" && (w.detail.checked ? e._addSelected(t, v) : e._removeSelected(t.id));
  }), i;
};
W.prototype._buildCitationParams = function(t) {
  var e = localStorage.getItem("selectedLocator") || "page";
  t.label = e;
  var i = document.createDocumentFragment(), n = document.createElement("div"), s = document.createElement("input"), r = document.createElement("input"), o = document.createElement("div"), l = document.createElement("div"), u = document.createElement("input"), h = document.createElement("div"), v = document.createElement("input");
  i.appendChild(n), n.appendChild(s), n.appendChild(r), i.appendChild(o), o.appendChild(l), o.appendChild(u);
  var g = "";
  i.appendChild(h), h.appendChild(v);
  var y = new yt(s, {
    type: "text",
    placeholder: b("Prefix")
  }), w = new yt(r, {
    type: "text",
    placeholder: b("Suffix")
  }), C = new mt(l, {
    placeholder: b("Locator"),
    translate: b
  });
  Ni.forEach(function(E) {
    var J = E[0] === e;
    C.addItem(E[0], E[1], J), J && (g = E[1]);
  });
  var M = new yt(u, {
    type: "text",
    placeholder: b(g)
  }), N = new Qt(v, {
    label: b("Omit Author")
  });
  return y.subscribe(function(E) {
    E.type === "inputfield:input" && (t.prefix = E.detail.value);
  }), w.subscribe(function(E) {
    E.type === "inputfield:input" && (t.suffix = E.detail.value);
  }), M.subscribe(function(E) {
    E.type === "inputfield:input" && (t.locator = E.detail.value);
  }), C.subscribe(function(E) {
    if (E.type === "selectbox:change" && E.detail.items) {
      var J = E.detail.items[0];
      M.setPlaceholder(J.text), t.label = E.detail.values[0].toString(), localStorage.setItem("selectedLocator", t.label);
    }
  }), N.subscribe(function(E) {
    E.type === "checkbox:change" && (t["suppress-author"] = E.detail.checked);
  }), i;
};
W.prototype._buildSelectedElement = function(t) {
  var e = this, i = document.createElement("div");
  i.classList.add("selDoc");
  var n = document.createElement("span");
  t.author && t.author.length > 0 ? n.textContent = t.author.map(function(r) {
    return r.family + ", " + r.given;
  }).join("; ") : n.textContent = t.title, t.issued && t.issued["date-parts"] && (n.textContent += " " + t.issued["date-parts"][0].join("-")), n.setAttribute("title", n.textContent), i.appendChild(n);
  var s = document.createElement("span");
  return s.onclick = function() {
    e._removeSelected(t.id);
  }, s.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', i.appendChild(s), i;
};
W.prototype._addSelected = function(t, e) {
  var i = this._buildSelectedElement(t);
  this._items[t.id] = t, this._html[t.id] = i, this._checks[t.id] = e, this._selectedHolder && this._selectedHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
W.prototype._checkDocsScroll = function(t, e) {
  var i = this;
  if (this._fShouldLoadMore(t)) {
    if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
    this._loadTimeout = setTimeout(function() {
      i._fShouldLoadMore(t) && i._fLoadMore();
    }, 500);
  }
};
W.prototype._initScrollBox = function(t, e, i, n) {
  var s = {};
  return s.onscroll = this._checkScroll(t, e, i, n), t.onwheel = function(r) {
    t.scrollTop += r.deltaY > 10 || r.deltaY < -10 ? r.deltaY : r.deltaY * 20, s.onscroll();
  }, e.onmousedown = function(r) {
    e.classList.add("scrolling");
    var o = r.clientY, l = t.scrollTop;
    window.onmouseup = function(u) {
      e.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
    }, window.onmousemove = function(u) {
      var h = u.clientY - o, v = h / t.clientHeight, g = t.scrollHeight * v;
      t.scrollTop = l + g, s.onscroll();
    };
  }, document.body.addEventListener("resize", function() {
    s.onscroll();
  }), s;
};
W.prototype._checkScroll = function(t, e, i, n) {
  var s = this._displayNoneClass;
  return function() {
    if (t.scrollHeight <= t.clientHeight)
      e.classList.add(s);
    else {
      e.classList.remove(s);
      var r = t.clientHeight / t.scrollHeight * t.clientHeight;
      r = r < i ? i : r, e.style.height = r + "px";
      var o = t.scrollHeight - t.clientHeight, l = t.scrollTop / o, u = l * (t.clientHeight - r);
      e.style.marginTop = u + "px";
    }
    n && n(t, e);
  };
};
W.prototype._removeSelected = function(t) {
  var e = this._html[t];
  this._selectedHolder && this._selectedHolder.removeChild(e), delete this._items[t], delete this._html[t], this._checks[t] && (this._checks[t].uncheck(!0), delete this._checks[t]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
W.prototype._checkSelected = function() {
  var t = this.count();
  !this._selectedInfo || !this._selectedCount || !this._selectedWrapper || (t <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = t + " " + b("selected")), this._subscribers.forEach(function(e) {
    e(t);
  }));
};
W.prototype.count = function() {
  var t = 0;
  for (var e in this._items) t++;
  return t;
};
(function() {
  var t = "hidden", e, i, n, s, r = {
    text: "",
    obj: null,
    groups: [],
    groupsHash: ""
  }, o, l, u, h, v, g, y, w = new it("libLoader", b("Loading...")), C = {};
  function M() {
    var d = document.getElementById("errorWrapper");
    if (!d)
      throw new Error("errorWrapper not found");
    var p = document.getElementById("mainState");
    if (!p)
      throw new Error("mainState not found");
    o = new Nt(), l = new W(t, je, $e), u = new Y("saveAsTextBtn", {
      variant: "secondary"
    }), h = new Y("insertLinkBtn", {
      disabled: !0
    }), v = new Y("settingsBtn", {
      variant: "icon-only",
      size: "small"
    }), g = new Y("insertBibBtn", {
      variant: "secondary"
    }), y = new Y("refreshBtn", {
      variant: "secondary"
    }), C = {
      error: d,
      mainState: p
    };
  }
  window.Asc.plugin.init = function() {
    it.show(), M(), e = new Ot(), i = new B();
    var d = new rt(e, i);
    n = new K(e, t), s = new Ii(n.getLocalesManager(), n.getStyleManager(), i);
    var p = !1;
    J(), d.init().onOpen(function() {
      it.hide();
    }).onChangeState(function(_) {
      n.setDesktopApiAvailable(_.desktop), n.setRestApiAvailable(_.online);
    }).onAuthorized(function(_) {
      if (!p) {
        p = !0, it.show();
        var L = E().catch((P) => {
          console.error(P), V(b("An error occurred while loading library groups. Try restarting the plugin."));
        }), S = n.init().catch((P) => {
          console.error(P), V(b("An error occurred while loading settings. Try restarting the plugin.")), n.show();
        });
        Promise.all([L, S]).then(function() {
          return it.hide(), N();
        }).finally(function() {
          it.hide();
        });
      }
    }), window.Asc.plugin.onTranslate = X, Qe().then((_) => {
      window.Asc.scope.editorVersion = _, ti();
    }).catch((_) => {
      console.error(_);
    });
  };
  function N() {
    w.show();
    var d = i.getItems(null).then((p) => (delete p.next, p));
    return Mt(d, !1).then((p) => {
      p > 0 ? Gt("started") : Gt("empty");
    }).catch((p) => {
      console.error(p);
    }).finally(() => {
      w.hide();
    });
  }
  function E() {
    return i.getUserGroups().then(function(d) {
      return o.addGroups(d), d;
    });
  }
  function J() {
    l.subscribe(Ie);
    function d(p, _, L) {
      l.clearLibrary();
      var S = [];
      return i.getUserGroups().then(function(P) {
        var k = _.filter(function(St) {
          return St !== "my_library" && St !== "group_libraries";
        });
        _.indexOf("my_library") !== -1 && S.push(Mt(i.getItems(p), !1));
        for (var ot = 0; ot < k.length; ot++)
          S.push(Mt(i.getGroupItems(p, k[ot]), !0));
        return r.text = p, r.obj = null, r.groups = [], r.groupsHash = L, S;
      });
    }
    o.subscribe(function(p, _) {
      p = p.trim();
      var L = _.join(",");
      C.mainState.classList.contains(t) || !p || p == r.text && L === r.groupsHash || _.length === 0 || d(p, _, L).catch(() => []).then(function(S) {
        return S.length && (w.show(), Promise.any(S).then(function() {
          w.hide();
        }).finally(function() {
          w.hide();
        })), Promise.allSettled(S);
      }).then(function(S) {
        var P = 0;
        S.forEach(function(k) {
          k.status === "fulfilled" && (P += k.value);
        }), P === 0 ? (Gt("empty"), l.displayNothingFound()) : Gt("not-empty");
      });
    }), y.subscribe(/* @__PURE__ */ (function() {
      var p = I(function* (_) {
        if (_.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            V(b("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            V(b("Language is not selected"));
            return;
          }
          yield Q(!0, "Zotero (" + b("Updating citations") + ")");
          var L = s.updateCslItems.bind(s, !1), S = n.getStyleManager();
          S.getLastUsedFormat() === "note" && (L = s.updateCslItemsInNotes.bind(s, S.getLastUsedNotesStyle())), L().catch(function(P) {
            console.error(P);
            var k = b("Failed to refresh");
            typeof P == "string" && (k += ". " + b(P)), V(k);
          }).finally(function() {
            wt(!1, "Zotero (" + b("Updating citations") + ")");
          });
        }
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), g.subscribe(/* @__PURE__ */ (function() {
      var p = I(function* (_) {
        if (_.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            V(b("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            V(b("Language is not selected"));
            return;
          }
          yield Q(!1, "Zotero (" + b("Inserting bibliography") + ")");
          var L = "";
          s.insertBibliography().then(function(S) {
            L = S;
          }).catch(function(S) {
            if (console.error(S), s.showWarningMessage("Failed to insert bibliography"), typeof S == "string") {
              var P = b(S);
              V(P);
            }
          }).finally(function() {
            wt(!1, "Zotero (" + b("Inserting bibliography") + ")"), L && s.moveCursorOutsideField(L);
          });
        }
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), h.subscribe(/* @__PURE__ */ (function() {
      var p = I(function* (_) {
        if (_.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            V(b("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            V(b("Language is not selected"));
            return;
          }
          yield Q(!0, "Zotero (" + b("Inserting citation") + ")");
          var L = l.getSelectedItems(), S = null, P = !1;
          return s.insertSelectedCitations(L).then(function(k) {
            return P = k, l.removeItems(Object.keys(L)), s.getCurrentField();
          }).then(function(k) {
            return S = k, s.updateCslItems(P);
          }).catch(function(k) {
            console.error(k);
            var ot = b("Failed to insert citation");
            typeof k == "string" && (ot += ". " + b(k)), V(ot);
          }).finally(/* @__PURE__ */ I(function* () {
            wt(!1, "Zotero (" + b("Inserting citation") + ")"), P ? yield s.moveCursorRight() : S && (yield s.moveCursorOutsideField(S.FieldId));
          }));
        }
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), v.subscribe(function(p) {
      p.type === "button:click" && n.show();
    }), u.subscribe(/* @__PURE__ */ (function() {
      var p = I(function* (_) {
        _.type === "button:click" && (yield Q(!1, "Zotero (" + b("Saving as text") + ")"), s.saveAsText().then(function() {
          wt(!1, "Zotero (" + b("Saving as text") + ")");
        }));
      });
      return function(_) {
        return p.apply(this, arguments);
      };
    })()), n.onChangeState(/* @__PURE__ */ (function() {
      var p = I(function* (_, L) {
        yield Q(!0, "Zotero (" + b("Updating citations") + ")");
        var S = s.updateCslItems.bind(s, !0);
        [_.styleFormat, L.styleFormat].includes("note") && (_.styleFormat !== L.styleFormat ? _.styleFormat === "note" ? S = s.switchingBetweenNotesAndText.bind(s, _.notesStyle) : S = s.switchingBetweenNotesAndText.bind(s) : _.notesStyle !== L.notesStyle ? S = s.convertNotesStyle.bind(s, _.notesStyle) : S = s.updateCslItems.bind(s, !0)), S().catch(function(P) {
          console.error(P);
          var k = b("Failed to refresh");
          typeof P == "string" && (k += ". " + b(P)), V(k);
        }).finally(function() {
          wt(!1, "Zotero (" + b("Updating citations") + ")");
        });
      });
      return function(_, L) {
        return p.apply(this, arguments);
      };
    })());
  }
  Asc.plugin.onThemeChanged = function(d) {
    window.Asc.plugin.onThemeChangedBase(d), Oe.fixThemeForIE(d), Oe.addStylesForComponents(d);
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
    var L = d.type || "light", S = document.body;
    S.classList.remove("theme-dark"), S.classList.remove("theme-light"), S.classList.add("theme-" + L);
  };
  function X() {
    for (var d = document.getElementsByClassName("i18n"), p = function() {
      var S = d[_];
      if (!(S instanceof HTMLElement)) return 1;
      ["placeholder", "title"].forEach((k) => {
        S.hasAttribute(k) && S.setAttribute(k, b(S.getAttribute(k) || ""));
      });
      var P = b(S.innerText.trim().replace(/\s+/g, " "));
      P && (S.innerText = P);
    }, _ = 0; _ < d.length; _++)
      p();
  }
  function V(d) {
    d && typeof d == "string" ? (b(""), C.error.classList.remove(t), C.error.textContent = d, setTimeout(function() {
      window.onclick = function() {
        V(!1);
      };
    }, 100)) : (C.error.classList.add(t), C.error.textContent = "", window.onclick = null);
  }
  function Q(d, p) {
    return Tt.apply(this, arguments);
  }
  function Tt() {
    return Tt = I(function* (d, p) {
      g.disable(), y.disable(), h.disable();
      var _ = window.Asc.scope.editorVersion;
      _ && _ < 9004e3 ? window._cursorPosition = yield qe.getCursorPosition() : yield new Promise((L) => {
        Asc.plugin.executeMethod("StartAction", ["GroupActions", {
          lockScroll: !0,
          keepSelection: d
        }], L);
      });
    }), Tt.apply(this, arguments);
  }
  function wt(d, p) {
    return ne.apply(this, arguments);
  }
  function ne() {
    return ne = I(function* (d, p) {
      g.enable(), y.enable(), Ie();
      var _ = window.Asc.scope.editorVersion;
      _ && _ < 9004e3 ? qe.setCursorPosition(window._cursorPosition || 0) : yield new Promise((L) => {
        Asc.plugin.executeMethod("EndAction", ["GroupActions", {
          scrollToTarget: d
        }], L);
      });
    }), ne.apply(this, arguments);
  }
  function Gt(d) {
    var p = document.getElementById("searchLabel");
    if (!p) {
      console.error("Search label not found");
      return;
    }
    var _ = p.querySelector(".when-empty"), L = p.querySelector(".when-not-empty"), S = p.querySelector(".when-started");
    if (!_ || !L || !S) {
      console.error("Search label elements not found");
      return;
    }
    switch (_.classList.add("hidden"), L.classList.add("hidden"), S.classList.add("hidden"), d) {
      case "empty":
        _.classList.remove("hidden");
        break;
      case "not-empty":
        L.classList.remove("hidden");
        break;
      case "started":
        L.classList.remove("hidden"), S.classList.remove("hidden");
        break;
    }
  }
  function je() {
    console.warn("Loading more..."), r.obj && r.obj.next && Mt(r.obj.next(), !1);
    for (var d = 0; d < r.groups.length && r.groups[d].next; d++)
      Mt(i.getGroupItems(r.groups[d].next(), r.groups[d].id), !0);
  }
  function $e(d) {
    if (e.getRoute() != "main" || d.scrollTop + d.clientHeight < d.scrollHeight)
      return !1;
    var p = !0;
    return r.groups.forEach(function(_) {
      _.next && (p = !1);
    }), !(!r.obj || !r.obj.next || !p || !r.obj && !r.text.trim() && !r.groups.length);
  }
  function Mt(d, p) {
    return d.then(function(_) {
      return ke(_, null, p);
    }).catch(function(_) {
      return console.error(_), _.message && V(b(_.message)), ke(null, _, p);
    }).then(function(_) {
      return _;
    });
  }
  function ke(d, p, _) {
    var L = !1;
    !r.obj && d && d.items && !d.items.length && (L = !0), p ? (L && (r.obj = null, r.groups = []), r && r.obj && delete r.obj.next) : _ && d && d.next ? r.groups.push(d) : r.obj = d && d.items.length ? d : null;
    var S = function(k) {
      if (!k.id) return k;
      var ot = k.id.indexOf("/") + 1, St = k.id.lastIndexOf("/") + 1, ei = k.id.indexOf("http");
      return ot !== St && ei === 0 && (k.uris || (k.uris = []), k.uris.push(k.id)), St && (k.id = k.id.substring(St)), k;
    };
    return d && d.items && d.items.length > 0 && (d.items = d.items.map((P) => (P = Xe(P), P[_ ? "groupID" : "userID"] = d.id, S(P), P))), l.displaySearchItems(d, p, r);
  }
  function Xe(d) {
    if (d.id || !d.key) return d;
    var p = {
      id: d.key,
      title: d.data.title,
      type: d.data.itemType
    };
    return Object.hasOwnProperty.call(d, "url") && (p.URL = d.data.url), Object.hasOwnProperty.call(d, "volume") && (p.volume = d.data.volume), Object.hasOwnProperty.call(d, "language") && (p.language = d.data.language), Object.hasOwnProperty.call(d, "abstract") && (p.abstract = d.data.abstract), Object.hasOwnProperty.call(d, "note") && (p.note = d.data.note), Object.hasOwnProperty.call(d, "page") && (p.page = d.data.page), Object.hasOwnProperty.call(d, "shortTitle") && (p.shortTitle = d.data.shortTitle), Object.hasOwnProperty.call(d, "links") && (p.uris = [], Object.hasOwnProperty.call(d.links, "self") && p.uris.push(d.links.self.href), Object.hasOwnProperty.call(d.links, "alternate") && p.uris.push(d.links.alternate.href)), p;
  }
  function Ie(d) {
    typeof d > "u" && (d = l.count()), d <= 0 ? (h.disable(), h.setText(b("Insert Citation"))) : (h.enable(), d > 1 ? h.setText(b("Insert " + d + " Citations")) : h.setText(b("Insert Citation")));
  }
  function Qe() {
    return se.apply(this, arguments);
  }
  function se() {
    return se = I(function* () {
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
    }), se.apply(this, arguments);
  }
  function ti() {
    var d = new Asc.ButtonContextMenu();
    d.text = "Edit citation", d.addCheckers("Target", "Selection"), d.attachOnClick(/* @__PURE__ */ I(function* () {
      var p = yield new Promise((P) => {
        window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, P);
      });
      if (!p || !p.Value || p.Value.toLowerCase().indexOf("zotero_item") === -1) {
        s.showWarningMessage("No Zotero citation found at the cursor. Please click directly on a citation to edit it.");
        return;
      }
      var _ = yield s.showEditCitationWindow(p);
      if (_) {
        yield Q(!1, "Zotero (" + b("Updating citations") + ")");
        var L = s.updateItem.bind(s, _), S = n.getStyleManager();
        S.getLastUsedFormat() === "note" && (L = s.updateItem.bind(s, _, S.getLastUsedNotesStyle())), L().catch(function(P) {
          console.error(P);
          var k = b("Failed to insert citation");
          typeof P == "string" && (k += ". " + b(P)), V(k);
        }).finally(function() {
          wt(!1, "Zotero (" + b("Updating citations") + ")"), p && s.moveCursorOutsideField(p.FieldId);
        });
      }
    })), Asc.Buttons.registerContextMenu();
  }
})();
//# sourceMappingURL=bundle.modern.js.map
