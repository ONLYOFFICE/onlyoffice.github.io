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
function zt(e, t, i, n, s, r, o) {
  try {
    var a = e[r](o), h = a.value;
  } catch (u) {
    return void i(u);
  }
  a.done ? t(h) : Promise.resolve(h).then(n, s);
}
function O(e) {
  return function() {
    var t = this, i = arguments;
    return new Promise(function(n, s) {
      var r = e.apply(t, i);
      function o(h) {
        zt(r, n, s, o, a, "next", h);
      }
      function a(h) {
        zt(r, n, s, o, a, "throw", h);
      }
      o(void 0);
    });
  };
}
function oi(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function l(e, t) {
  return e.get(c(e, t));
}
function R(e, t, i) {
  oi(e, t), t.set(e, i);
}
function C(e, t, i) {
  return e.set(c(e, t), i), i;
}
function fe(e, t) {
  oi(e, t), t.add(e);
}
function Ci(e, t, i) {
  return (t = Li(t)) in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e;
}
function qt(e, t) {
  var i = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(e, s).enumerable;
    })), i.push.apply(i, n);
  }
  return i;
}
function ai(e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qt(Object(i), !0).forEach(function(n) {
      Ci(e, n, i[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : qt(Object(i)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(i, n));
    });
  }
  return e;
}
function li(e, t) {
  if (e == null) return {};
  var i, n, s = Ai(e, t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (n = 0; n < r.length; n++) i = r[n], t.indexOf(i) === -1 && {}.propertyIsEnumerable.call(e, i) && (s[i] = e[i]);
  }
  return s;
}
function Ai(e, t) {
  if (e == null) return {};
  var i = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    i[n] = e[n];
  }
  return i;
}
function Ii(e, t) {
  if (typeof e != "object" || !e) return e;
  var i = e[Symbol.toPrimitive];
  if (i !== void 0) {
    var n = i.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Li(e) {
  var t = Ii(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
var Dt = {
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
function Ge() {
  this._states = ["mainState", "loginState", "settingsState"], this._routes = ["main", "login", "settings"], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
    var t = document.getElementById(e);
    if (!t) throw new Error("container ".concat(e, " not found"));
    return t;
  });
}
Ge.prototype.getRoute = function() {
  return this._currentRoute;
};
Ge.prototype._setCurrentRoute = function(e) {
  this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
};
Ge.prototype.openMain = function() {
  this._setCurrentRoute("main");
};
Ge.prototype.openLogin = function() {
  this._setCurrentRoute("login");
};
Ge.prototype.openSettings = function() {
  this._setCurrentRoute("settings");
};
var rt = {
  restApiUrl: "https://api.zotero.org/",
  desktopApiUrl: "http://127.0.0.1:23119/api/"
}, Bt = {
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
          var a = !1, h = !1;
          o.responseStatus == 403 ? (a = !1, h = !0) : o.responseStatus === 200 && (h = !0, a = !0), n({
            hasPermission: a,
            isZoteroRunning: h
          });
        },
        error: function(o) {
          o.statusCode == -102 && (o.statusCode = 404), s(o);
        }
      });
    });
  }
}, xe = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakSet();
class ki {
  /**
   * @param {{maxRetries?: number, initialDelay?: number, maxDelay?: number, backoffFactor?: number, retryOn?: number[]}} options
   */
  constructor() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    fe(this, ce), R(this, xe, void 0), R(this, It, void 0), R(this, Lt, void 0), R(this, kt, void 0), R(this, gt, void 0), R(this, ot, void 0), R(this, Je, void 0), R(this, ue, void 0), R(this, De, void 0), R(this, Ve, void 0), C(xe, this, t.maxRetries || 5), C(It, this, t.initialDelay || 1e3), C(Lt, this, t.maxDelay || 5e3), C(kt, this, t.backoffFactor || 2), C(gt, this, t.retryOn || [429, 502, 503, 504]), C(ot, this, 10), C(Je, this, 5e3), C(ue, this, []), C(De, this, 0), C(Ve, this, 0);
  }
  /**
   * @param {URL} url
   * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
   * @param {number} attempt
   * @returns {Promise<FetchResponse>}
   */
  fetchWithRetry(t, i, n) {
    var s = this;
    return O(function* () {
      try {
        yield c(ce, s, Ei).call(s);
        var r = yield fetch(t, {
          headers: i
        });
        if (r.ok)
          return r;
        if (l(gt, s).includes(r.status) && n < l(xe, s)) {
          var o = c(ce, s, Jt).call(s, n, r);
          return console.log("Attempt ".concat(n + 1, "/").concat(l(xe, s), " failed with ").concat(r.status, ". Retrying in ").concat(o, "ms")), yield c(ce, s, at).call(s, o), s.fetchWithRetry(t, i, n + 1);
        }
        throw new Error("".concat(r.status, " ").concat(r.statusText));
      } catch (u) {
        if (n >= l(xe, s)) {
          var a = "";
          throw u instanceof Error && (a = u.message), new Error("Request failed after ".concat(l(xe, s), " attempts: ").concat(a));
        }
        if (n < l(xe, s)) {
          var h = c(ce, s, Jt).call(s, n);
          return console.log("Network error on attempt ".concat(n + 1, ". Retrying in ").concat(h, "ms")), yield c(ce, s, at).call(s, h), s.fetchWithRetry(t, i, n + 1);
        }
        throw u;
      }
    })();
  }
  resetCounter() {
    C(ue, this, []), C(De, this, 0), C(Ve, this, 0);
  }
}
function Zt() {
  var e = Date.now();
  C(ue, this, l(ue, this).filter((t) => e - t < l(Je, this)));
}
function Ei() {
  return Et.apply(this, arguments);
}
function Et() {
  return Et = O(function* () {
    var e;
    if (c(ce, this, Zt).call(this), l(ue, this).length >= l(ot, this)) {
      var t = l(ue, this)[0], i = Date.now() - t;
      if (i < l(Je, this)) {
        var n = 500 * l(ue, this).length - l(ot, this);
        n < 0 && (n = 0, console.warn("Wait time is less than 0")), console.log("Rate limit prevention: ".concat(l(ue, this).length, " requests in last ").concat(l(Je, this), "ms. Waiting ").concat(n, "ms...")), yield c(ce, this, at).call(this, n), c(ce, this, Zt).call(this);
      }
    }
    l(ue, this).push(Date.now()), C(De, this, (e = l(De, this), e++, e));
    var s = Date.now(), r = s - l(Ve, this), o = 100;
    r < o && l(Ve, this) > 0 && (yield c(ce, this, at).call(this, o - r)), C(Ve, this, Date.now());
  }), Et.apply(this, arguments);
}
function Jt(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, i = t == null ? void 0 : t.headers.get("Retry-After");
  if (i) {
    var n = parseInt(i);
    if (n > 86400) {
      var s = parseInt(i) * 1e3;
      return Math.max(0, s - Date.now());
    }
    return n * 1e3;
  }
  var r = l(It, this) * Math.pow(l(kt, this), e), o = Math.random() * 1e3;
  return Math.min(r + o, l(Lt, this));
}
function at(e) {
  return new Promise((t) => setTimeout(t, e));
}
var V = function() {
  this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = !0, this._fetcher = new ki({
    maxRetries: 5,
    initialDelay: 5e3
  });
};
V.prototype.ZOTERO_API_VERSION = "3";
V.prototype.USER_AGENT = "AscDesktopEditor";
V.prototype.DEFAULT_FORMAT = "csljson";
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
  return this._isOnlineAvailable ? rt.restApiUrl : rt.desktopApiUrl;
};
V.prototype._getDesktopRequest = function(e) {
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
V.prototype._getOnlineRequest = function(e) {
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
    format: i,
    itemType: "-attachment"
    // skip attachments (pdf, docx, etc.)
  };
  e ? s.q = e : t ? s.itemKey = t.join(",") : (s.limit = 20, this._isOnlineAvailable || (s.format = "json"));
  var r = n.API_PATHS.USERS + "/" + n._userId + "/" + n.API_PATHS.ITEMS, o = n._buildGetRequest(r, s);
  return n._parseResponse(o, n._userId);
};
V.prototype.getGroupItems = function(e, t, i, n) {
  var s = this;
  n = n || s.DEFAULT_FORMAT;
  var r = (
    /** @type {{format: string, q?: string, itemKey?: string}} */
    {
      format: n
    }
  );
  e ? r.q = e : i && (r.itemKey = i.join(","));
  var o = s.API_PATHS.GROUPS + "/" + t + "/" + s.API_PATHS.ITEMS, a = s._buildGetRequest(o, r);
  return s._parseResponse(a, t);
};
V.prototype.getUserGroups = function() {
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
  localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
};
V.prototype.getUserId = function() {
  return this._userId;
};
V.prototype.setIsOnlineAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function Pe(e, t) {
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
Pe.prototype = {
  constructor: Pe,
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
function Ue(e, t) {
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
Ue.prototype = {
  constructor: Ue,
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
function ee(e, t) {
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
ee.prototype = /** @lends Button.prototype */
{
  constructor: ee,
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
var F = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakSet();
class Yt {
  /**
   * Create a Radio instance
   * @constructor
   * @param {string | HTMLInputElement} radio
   * @param {RadioOptionsType} options
   * @throws {Error} If invalid input element
   */
  constructor(t, i) {
    if (fe(this, re), R(this, F, void 0), R(this, q, void 0), R(this, Ze, void 0), R(this, Q, null), R(this, S, void 0), R(this, ke, /* @__PURE__ */ new Map()), R(this, Fe, []), typeof t == "string") {
      var n = document.getElementById(t);
      n instanceof HTMLInputElement && (t = n);
    }
    if (!(t instanceof HTMLInputElement))
      throw new Error("Invalid input element");
    if (C(q, this, t), C(S, this, Object.assign({
      id: "radio_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
      checked: !1,
      disabled: !1,
      indeterminate: !1,
      label: "",
      name: "",
      value: "on"
    }, i)), c(re, this, Pi).call(this), C(F, this, document.createElement("div")), C(Ze, this, document.createElement("span")), c(re, this, Oi).call(this), c(re, this, Ni).call(this), c(re, this, mt).call(this), !l(S, this).name)
      throw new Error("Name attribute is required");
    var s = Be._.get(l(S, this).name);
    s || (s = new Array(), Be._.set(l(S, this).name, s)), s.push(this);
  }
  /**
   * @param {function(RadioEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var i = this;
    return l(Fe, this).push(t), {
      unsubscribe: function() {
        C(Fe, i, l(Fe, i).filter(function(s) {
          return s !== t;
        }));
      }
    };
  }
  /**
   * @returns {HTMLElement}
   */
  getElement() {
    return l(F, this);
  }
  /** @param {boolean} [bSilent] */
  check(t) {
    if (!(l(S, this).disabled || l(S, this).checked)) {
      if (l(S, this).name) {
        var i = Be._.get(l(S, this).name);
        i && i.forEach((n) => {
          n !== this && l(S, n).checked && n.uncheck();
        });
      }
      l(S, this).checked = !0, c(re, this, mt).call(this), !t && c(re, this, jt).call(this);
    }
  }
  /** @param {boolean} [bSilent] */
  uncheck(t) {
    l(S, this).disabled || !l(S, this).checked || (l(S, this).checked = !1, c(re, this, mt).call(this), !t && c(re, this, jt).call(this));
  }
  enable() {
    l(S, this).disabled && (l(S, this).disabled = !1, l(q, this).disabled = !1, l(F, this).setAttribute("aria-disabled", "false"), l(S, this).checked ? l(F, this).tabIndex = 0 : c(re, this, Ht).call(this), l(F, this).classList.remove("radio--disabled"));
  }
  disable() {
    l(S, this).disabled || (l(S, this).disabled = !0, l(q, this).disabled = !0, l(F, this).setAttribute("aria-disabled", "true"), l(F, this).tabIndex = -1, l(F, this).classList.add("radio--disabled"));
  }
  /** @param {string} label */
  setLabel(t) {
    l(S, this).label = t, l(Q, this) ? l(Q, this).textContent = t : t && (C(Q, this, document.createElement("label")), l(Q, this).className = "radio-label", l(Q, this).htmlFor = String(l(S, this).id), l(Q, this).textContent = t, l(F, this).appendChild(l(Q, this)));
  }
  /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
  getState() {
    return {
      checked: !!l(S, this).checked,
      disabled: !!l(S, this).disabled,
      value: l(S, this).value || "",
      name: l(S, this).name || ""
    };
  }
  destroy() {
    if (C(Fe, this, []), !!l(S, this).name) {
      var t = Be._.get(l(S, this).name);
      if (t) {
        var i = t.indexOf(this);
        i >= 0 && t.splice(i, 1);
      }
      l(ke, this).forEach((n, s) => {
        l(F, this).removeEventListener(s, n);
      }), l(ke, this).clear(), l(F, this) && l(F, this).parentNode && l(F, this).parentNode.removeChild(l(F, this)), C(Q, this, null);
    }
  }
}
function Pi() {
  l(q, this).type = "radio";
  var e = l(q, this).getAttribute("id"), t = l(q, this).getAttribute("name"), i = l(q, this).getAttribute("value"), n = l(q, this).getAttribute("checked"), s = l(q, this).getAttribute("disabled");
  e !== null ? l(S, this).id = e : l(S, this).id && l(q, this).setAttribute("id", l(S, this).id), t !== null ? l(S, this).name = t : l(S, this).name && l(q, this).setAttribute("name", l(S, this).name), i !== null ? l(S, this).value = i : l(S, this).value && l(q, this).setAttribute("value", l(S, this).value), n !== null ? l(S, this).checked = n === "true" : l(S, this).checked && l(q, this).setAttribute("checked", "true"), s !== null ? l(S, this).disabled = s === "true" : l(S, this).disabled && l(q, this).setAttribute("disabled", "true");
}
function Oi() {
  var e = l(q, this).parentNode, t = document.createDocumentFragment();
  t.appendChild(l(F, this)), l(F, this).classList.add("radio-button-container"), l(F, this).setAttribute("role", "radio"), l(F, this).setAttribute("aria-checked", String(!!l(S, this).checked)), l(F, this).setAttribute("aria-disabled", String(!!l(S, this).disabled)), l(F, this).tabIndex = l(S, this).disabled ? -1 : 0, l(Ze, this).className = "radio-visual", l(Ze, this).setAttribute("aria-hidden", "true"), l(S, this).label && (C(Q, this, document.createElement("label")), l(Q, this).className = "i18n radio-label", l(Q, this).htmlFor = String(l(S, this).id), l(Q, this).textContent = l(S, this).label), l(S, this).disabled && l(F, this).classList.add("radio--disabled"), e && e.insertBefore(t, l(q, this)), l(F, this).appendChild(l(q, this)), l(F, this).appendChild(l(Ze, this)), l(Q, this) && l(F, this).appendChild(l(Q, this)), c(re, this, Ht).call(this);
}
function Ht() {
  if (l(S, this).checked)
    l(F, this).tabIndex = l(S, this).disabled ? -1 : 0;
  else if (l(S, this).name && Be._.has(l(S, this).name)) {
    var e = Be._.get(l(S, this).name), t = !1;
    e && e.forEach((i) => {
      l(S, i).checked && i !== this && (t = !0);
    }), !t && !l(S, this).checked && !l(S, this).disabled ? l(F, this).tabIndex = 0 : l(F, this).tabIndex = -1;
  }
}
function Ni() {
  var e = (s) => {
    s.preventDefault(), !l(S, this).disabled && !l(S, this).checked && (this.check(), l(F, this).focus());
  }, t = (s) => {
    if (!l(S, this).disabled)
      switch (s.key) {
        case " ":
        case "Spacebar":
        case "Enter":
          s.preventDefault(), l(S, this).checked || this.check();
          break;
      }
  }, i = () => {
    l(F, this).classList.add("radio--focused");
  }, n = () => {
    l(F, this).classList.remove("radio--focused");
  };
  l(ke, this).set("click", e), l(ke, this).set("keydown", t), l(ke, this).set("focus", i), l(ke, this).set("blur", n), l(F, this).addEventListener("click", e), l(F, this).addEventListener("keydown", t), l(F, this).addEventListener("focus", i), l(F, this).addEventListener("blur", n);
}
function mt() {
  l(F, this).setAttribute("aria-checked", String(!!l(S, this).checked)), l(F, this).classList.toggle("radio--checked", l(S, this).checked), l(q, this).checked = !!l(S, this).checked, c(re, this, Ht).call(this);
}
function jt(e) {
  var t = this.getState(), i = {
    type: "radio:change",
    detail: t
  };
  e && (i.originalEvent = e), l(Fe, this).forEach(function(n) {
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
    var a = document.createElementNS(r, "path");
    a.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), a.setAttribute("fill", "none"), a.setAttribute("stroke", "currentColor"), a.setAttribute("stroke-width", "2"), o.appendChild(a), this._visualCheckbox.appendChild(o);
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
class Oe {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(t, i) {
    if (fe(this, N), typeof t == "string") {
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
        c(N, this, ci).call(this, s);
      },
      search: (s) => {
        c(N, this, Fi).call(this, s);
      },
      close: (s) => {
        s.target instanceof HTMLElement && !this._container.contains(s.target) && !s.target.classList.contains("selectbox-option") && c(N, this, de).call(this);
      },
      keydown: (s) => {
        c(N, this, Ri).call(this, s);
      },
      dropdownClick: (s) => {
        c(N, this, Bi).call(this, s);
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), c(N, this, Ti).call(this), c(N, this, Mi).call(this), c(N, this, He).call(this), Pt._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t) {
      return function() {
        t.searchInput && t.searchInput.focus();
      };
    })(this), 100), c(N, this, He).call(this);
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
    n && (this._options.multiple ? this._selectedValues.add(t) : (this._selectedValues.clear(), this._selectedValues.add(t))), c(N, this, ve).call(this);
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
        var a = i ? s[0] === i : r === 0;
        a && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(s[0])), n._items.push({
          value: s[0],
          text: s[1],
          selected: a
        });
      }
    }, this), this.isOpen && c(N, this, He).call(this), c(N, this, ve).call(this);
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
    }), this._selectedValues.delete(t), c(N, this, ve).call(this);
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
      var r = function(g) {
        if (n._optionsContainer) {
          var v = n._optionsContainer.querySelector('[data-value="' + g + '"]');
          if (v) {
            var y = v.querySelector('input[type="checkbox"]');
            y && y instanceof HTMLInputElement && (y.checked = !0), v.classList.add("selectbox-option-selected"), v.classList.add("checkbox--checked");
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
        a.forEach(function(u) {
          u.classList.remove("selectbox-option-selected"), u.classList.remove("checkbox--checked");
        });
        var h = this._optionsContainer.querySelector('[data-value="' + s + '"]');
        h && (h.classList.add("selectbox-option-selected"), h.classList.add("checkbox--checked"));
      }
      c(N, this, de).call(this);
    }
    c(N, this, ve).call(this), !i && c(N, this, ct).call(this, s, !0);
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
          var g = u.querySelector('input[type="checkbox"]');
          g && g instanceof HTMLInputElement && (g.checked = !1), u.classList.remove("selectbox-option-selected"), u.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(t))
      for (var o = 0; o < t.length; o++)
        s = t[o], this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    else
      s = t, this._selectedValues.has(s) && (this._selectedValues.delete(s), r(s));
    c(N, this, ve).call(this), !i && c(N, this, ct).call(this, s, !0);
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
    c(N, this, ve).call(this), c(N, this, He).call(this);
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
function Ti() {
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
      var s = c(N, this, Hi).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
    }
  }
}
function Mi() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
    e.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function ci(e) {
  if (e && e.stopPropagation(), this.isOpen ? c(N, this, de).call(this) : this.openDropdown(), e && e.type === "click")
    for (var t of Pt._)
      t.isOpen && t !== this && c(N, t, de).call(t);
}
function de() {
  this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = !1, this._dropdown.style.display = "none";
  for (var e = this._arrow.className.split(" "), t = [], i = 0; i < e.length; i++)
    e[i] !== "selectbox-arrow-open" && t.push(e[i]);
  this._arrow.className = t.join(" ");
  for (var n = this._header.className.split(" "), s = [], i = 0; i < n.length; i++)
    n[i] !== "selectbox-header-open" && s.push(n[i]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function Fi(e) {
  var t = e.target;
  if (t instanceof HTMLInputElement) {
    var i = t.value.toLowerCase();
    c(N, this, He).call(this, i);
  }
}
function $t(e) {
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
      var h = (r + 1) % n.length;
      h === n.length && (h = 0), this._selectedValues.clear(), i = n[h], this._selectedValues.add(i.value);
    }
    c(N, this, ve).call(this), c(N, this, He).call(this, t, !0), c(N, this, ct).call(this, i.value, !0);
  }
}
function Ri(e) {
  var t = e.key || e.keyCode;
  switch (t) {
    case "Enter":
    case 13:
      e.preventDefault(), c(N, this, ci).call(this, e);
      break;
    case "Escape":
    case 27:
      c(N, this, de).call(this);
      break;
    case "ArrowDown":
    case 40:
      e.preventDefault(), c(N, this, $t).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      e.preventDefault(), c(N, this, $t).call(this, "up");
      break;
    case "Tab":
    case 9:
      c(N, this, de).call(this);
      break;
  }
}
function He(e, t) {
  if (e = e || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var i = null, n = this._items;
    if (e) {
      var s = e.split(/\s+/).filter(Boolean);
      n = n.filter(function(U) {
        if (U === null) return !1;
        var G = U.text.toLowerCase();
        return s.every(function(te) {
          return G.indexOf(te) !== -1;
        });
      });
    }
    for (var r = document.createDocumentFragment(), o = 0; o < n.length; o++) {
      var a = n[o];
      if (!a) {
        var h = document.createElement("hr");
        h.className += " selectbox-option-divider", r.appendChild(h);
        continue;
      }
      var u = document.createElement("div");
      u.className += " selectbox-option", this._selectedValues.has(a.value) && (u.className += " selectbox-option-selected checkbox--checked", i = u), u.setAttribute("data-value", a.value);
      var g = document.createElement("label");
      if (g.className += " selectbox-option-text i18n", this._options.translate && (a.text = this._options.translate(a.text)), g.textContent = a.text, this._options.multiple) {
        u.className += " selectbox-option-checkbox";
        var v = document.createElement("input");
        v.type = "checkbox", v.id = "checkbox-" + a.value, v.className += " selectbox-checkbox", v.checked = this._selectedValues.has(a.value), u.appendChild(v);
        var y = document.createElement("span");
        y.className = "checkbox-visual", y.setAttribute("aria-hidden", "true");
        var w = "http://www.w3.org/2000/svg", k = document.createElementNS(w, "svg");
        k.setAttribute("viewBox", "0 0 10 8"), k.setAttribute("class", "checkbox-checkmark");
        var I = document.createElementNS(w, "path");
        I.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), I.setAttribute("fill", "none"), I.setAttribute("stroke", "currentColor"), I.setAttribute("stroke-width", "2"), k.appendChild(I), y.appendChild(k), u.appendChild(y);
      }
      u.appendChild(g), r.appendChild(u);
    }
    if (this._customItems.length) {
      var E = document.createElement("hr");
      E.className += " selectbox-option-divider", r.appendChild(E);
    }
    for (var o = 0; o < this._customItems.length; o++) {
      var A = this._customItems[o], H = document.createElement("label");
      H.className += " selectbox-custom-option", H.setAttribute("data-value", A.value), H.setAttribute("for", A.value);
      var z = document.createElement("span");
      z.className += " selectbox-option-text i18n", this._options.translate && (A.text = this._options.translate(A.text)), z.textContent = A.text, H.appendChild(z), r.appendChild(H);
    }
    if (this._optionsContainer.appendChild(r), t && this.isOpen && this._optionsContainer && i)
      try {
        i.scrollIntoView && i.scrollIntoView({
          block: "nearest"
        });
      } catch (U) {
        console.error(U);
      }
  }
}
function Bi(e) {
  var t = e.target || e.srcElement, i = null;
  if (t && t instanceof HTMLElement) {
    for (var n = null, s = t.className.split(" "), r = !1, o = 0; o < s.length; o++)
      if (s[o] === "selectbox-option") {
        r = !0;
        break;
      } else if (s[o] === "selectbox-custom-option") {
        var a = t.getAttribute("data-value");
        if (a) {
          e.stopPropagation(), c(N, this, Xt).call(this, a), c(N, this, de).call(this);
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
          var g = t.parentNode.getAttribute("data-value");
          if (g) {
            e.stopPropagation(), c(N, this, Xt).call(this, g), c(N, this, de).call(this);
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
    var y = !0;
    this._options.multiple ? this._selectedValues.has(v) ? (this.unselectItems(v, !0), y = !1) : this.selectItems(v, !0) : (this.selectItems(v, !0), c(N, this, de).call(this)), c(N, this, ve).call(this), c(N, this, ct).call(this, v, y);
  }
}
function ve() {
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
  this._subscribers.forEach(function(a) {
    a({
      type: "selectbox:change",
      detail: o
    });
  });
}
function Xt(e) {
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
function Hi(e) {
  var t = Array.from(e.options).map((s) => [s.value, s.text]), i = {
    values: t
  }, n = e.value;
  return n && (i.selectedValue = n), i;
}
var Pt = {
  _: /* @__PURE__ */ new Set()
}, Ee = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakSet();
class he {
  /**
   * @param {string} containerId
   * @param {string} text
   */
  constructor(t, i) {
    fe(this, Qt), R(this, Ee, void 0);
    var n = document.getElementById(t);
    if (!(n instanceof HTMLElement)) throw new Error("Invalid container");
    C(Ee, this, n), c(Qt, this, Vi).call(this, i);
  }
  show() {
    var t;
    (t = l(Ee, this)) === null || t === void 0 || t.classList.remove("hidden");
  }
  hide() {
    var t;
    (t = l(Ee, this)) === null || t === void 0 || t.classList.add("hidden");
  }
  static show() {
    var t;
    (t = c(he, this, ei)._) === null || t === void 0 || t.classList.remove("hidden");
  }
  static hide() {
    var t;
    (t = c(he, this, ei)._) === null || t === void 0 || t.classList.add("hidden");
  }
}
function Vi(e) {
  l(Ee, this).classList.add("loader-container");
  var t = "http://www.w3.org/2000/svg", i = document.createElementNS(t, "svg");
  i.classList.add("loader-image"), i.setAttribute("viewBox", "0 0 20 20");
  var n = document.createElementNS(t, "circle");
  n.setAttribute("cx", "10"), n.setAttribute("cy", "10"), n.setAttribute("fill", "none"), n.setAttribute("stroke", "currentColor"), n.setAttribute("stroke-width", "1.5"), n.setAttribute("r", "7.25"), n.setAttribute("stroke-dasharray", "160%, 40%"), i.appendChild(n), l(Ee, this).appendChild(i);
  var s = document.createElement("div");
  s.classList.add("loader-title"), s.classList.add("i18n"), s.innerText = e, l(Ee, this).appendChild(s);
}
var ei = {
  _: document.getElementById("loader")
};
function b(e) {
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
        var o = t[r + 1] === "/", a = t.indexOf(">", r);
        if (a === -1) {
          i.text += t[r], r++;
          continue;
        }
        var h = t.substring(o ? r + 2 : r + 1, a).trim(), u = h.split(" ");
        if (u.length === 0) {
          i.text += t[r], r++;
          continue;
        }
        var g = u[0].toLowerCase();
        if (g === "br") {
          i.text += `
`, r = a + 1;
          continue;
        }
        var v = g;
        if (h.indexOf("font-variant:small-caps") !== -1 ? v = "sc" : h.indexOf("text-decoration:underline") !== -1 && (v = "u"), c(Ye, this, Ui)._.has(g))
          if (o) {
            for (var y = n.length - 1; y >= 0; y--)
              if (n[y].tag === g) {
                var {
                  start: w,
                  styleTag: k
                } = n.splice(y, 1)[0];
                i.formatting.push({
                  type: k,
                  start: w,
                  end: s
                });
                break;
              }
          } else
            n.push({
              tag: g,
              start: s,
              styleTag: v
            });
        r = a + 1;
      } else
        i.text += t[r], s++, r++;
    return i.formatting.sort((I, E) => I.start === E.start ? E.end - I.end : I.start - E.start), i;
  }
}
var Ui = {
  _: /* @__PURE__ */ new Set(["i", "u", "b", "sc", "sup", "sub", "em", "div", "span"])
};
class ne {
  /**
   * @param {Array<FormattingPositions>} positions
   * @returns {Promise<void>}
   */
  static formatAfterInsert(t, i) {
    return new Promise(function(n) {
      var s = !0, r = !1;
      Asc.scope.formatting = t, Asc.scope.textToMatch = i || "", Asc.plugin.callCommand(function() {
        var o = Api.GetDocument();
        function a(U, G) {
          G === "sup" ? U.SetVertAlign("superscript") : G === "sub" ? U.SetVertAlign("subscript") : G === "sc" ? U.SetSmallCaps(!0) : G === "u" ? U.SetUnderline(!0) : G === "b" ? U.SetBold(!0) : (G === "i" || G === "em") && U.SetItalic(!0);
        }
        var h = null, u = o.GetCurrentFootEndnote();
        if (u && Asc.scope.textToMatch)
          for (var g = u.GetElementsCount(), v = 0; v < g; v++) {
            var y = u.GetElement(v);
            if (y) {
              for (var w = y.GetElementsCount ? y.GetElementsCount() : 0, k = 0; k < w; k++) {
                var I = y.GetElement(k);
                if (!(!I || typeof I.GetRange != "function")) {
                  var E = I.GetText ? I.GetText() : "";
                  if (E === Asc.scope.textToMatch) {
                    h = I;
                    break;
                  }
                }
              }
              if (h) break;
            }
          }
        if (h || (h = o.GetCurrentRun()), !!h)
          for (var A = Asc.scope.formatting.length - 1; A >= 0; A--) {
            var H = Asc.scope.formatting[A], z = h.GetRange(H.start, H.end);
            z && a(z, H.type);
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
        function h(G, te) {
          te === "sup" ? G.SetVertAlign("superscript") : te === "sub" ? G.SetVertAlign("subscript") : te === "sc" ? G.SetSmallCaps(!0) : te === "u" ? G.SetUnderline(!0) : te === "b" ? G.SetBold(!0) : (te === "i" || te === "em") && G.SetItalic(!0);
        }
        if (Asc.scope.formatting.length === 1) {
          var u = Asc.scope.formatting[0];
          if (u.start === 0 && u.end === a.GetText().length) {
            h(a, u.type);
            return;
          }
        }
        var g = null, v = a.GetAllParagraphs();
        if (v && v.length)
          for (var y = 0; y < v.length; y++) {
            var w = v[y];
            if (w) {
              for (var k = w.GetElementsCount(), I = 0; I < k; I++) {
                var E = w.GetElement(I);
                if (!(!E || typeof E.GetRange != "function")) {
                  var A = E.GetText ? E.GetText() : "";
                  if (A === Asc.scope.text) {
                    g = E;
                    break;
                  }
                }
              }
              if (g) break;
            }
          }
        if (g || (o.MoveCursorToPos(a.GetEndPos() - Asc.scope.text.length), g = o.GetCurrentRun()), !!g)
          for (var H = Asc.scope.formatting.length - 1; H >= 0; H--) {
            var z = Asc.scope.formatting[H], U = g.GetRange(z.start, z.end);
            U && h(U, z.type);
          }
      }, s, n, r);
    });
  }
}
var yt = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), tt = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakSet();
class Gi {
  /**
   * @param {string} citPrefix
   * @param {string} citSuffix
   * @param {string} bibPrefix
   * @param {string} bibSuffix
   */
  constructor(t, i, n, s) {
    fe(this, M), R(this, yt, void 0), R(this, et, void 0), R(this, bt, void 0), R(this, wt, void 0), R(this, Ce, void 0), R(this, tt, void 0), C(yt, this, "ZOTERO_CITATION"), C(bt, this, "ZOTERO_BIBLIOGRAPHY"), C(et, this, t), C(wt, this, i), C(Ce, this, n), C(tt, this, s);
  }
  /**
   * @param {string} text
   * @param {string} value
   * @returns {Promise<string>}
   */
  addBibliography(t, i) {
    var n = this;
    return O(function* () {
      var s = window.Asc.scope.editorVersion;
      if (s && s < 9004e3) {
        var r = Ye.parseHtmlFormatting(t), o = "", a = {
          FieldId: o,
          Value: l(Ce, n) + " " + i + " " + l(tt, n),
          Content: r.text
        };
        return c(M, n, Re).call(n, a).then(() => n.getCurrentField()).then((u) => {
          if (o = (u == null ? void 0 : u.FieldId) || "", !!r.formatting.length)
            return o ? c(M, n, se).call(n, o).then(() => ne.formatAfterUpdate(o, r)) : ne.formatAfterInsert(r.formatting, r.text);
        }).then(() => o);
      } else {
        var h = {
          FieldId: "",
          Value: l(Ce, n) + " " + i + " " + l(tt, n),
          Content: " "
        };
        return yield c(M, n, ii).call(n, h, t);
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
    return O(function* () {
      var r = Ye.parseHtmlFormatting(t), o = {
        FieldId: "",
        Value: l(et, s) + " " + l(wt, s) + " " + i,
        Content: r.text
      }, a = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1);
      if (a && (yield c(M, s, St).call(s, n)), yield c(M, s, Re).call(s, o), r.formatting.length) {
        var h = yield s.getCurrentField();
        h && h.FieldId ? (yield c(M, s, se).call(s, h.FieldId), yield ne.formatAfterUpdate(h.FieldId, r)) : yield ne.formatAfterInsert(r.formatting, r.text);
      }
      return a && (yield c(M, s, ti).call(s)), a;
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
      c(M, t, Wi).call(t).then(function(s) {
        try {
          s.length && (s = s.filter(function(r) {
            return r.Value.indexOf(l(et, t)) !== -1 || r.Value.indexOf(l(Ce, t)) !== -1 || r.Value.indexOf(l(yt, t)) !== -1 || r.Value.indexOf(l(bt, t)) !== -1;
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
    return O(function* () {
      var n = t.map((y) => y.FieldId), s = window.Asc.scope.editorVersion, r = t.filter((y) => y.Value.indexOf(l(Ce, i)) === 0);
      if (r.length && s && s >= 9004e3) {
        t = t.filter((y) => y.Value.indexOf(l(Ce, i)) !== 0);
        var o = r[0];
        yield c(M, i, se).call(i, o.FieldId);
        var a = o.Content || "";
        o.Content = " ", yield c(M, i, xt).call(i), yield c(M, i, ii).call(i, o, a);
      }
      var h = c(M, i, it).call(i, t);
      if (yield new Promise((y) => {
        window.Asc.plugin.executeMethod("UpdateAddinFields", [t], y);
      }), !h.size) return n;
      for (var [u, g] of h) {
        var v = yield c(M, i, se).call(i, u);
        v && (yield ne.formatAfterUpdate(u, g));
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
    return O(function* () {
      for (var n = c(M, i, it).call(i, t), s = 0; s < t.length; s++) {
        var r = t[s];
        if (!r.FieldId) {
          console.error("Field id is not defined");
          continue;
        }
        var o = yield c(M, i, se).call(i, r.FieldId);
        if (o) {
          var a = yield c(M, i, ti).call(i);
          if (a) {
            yield c(M, i, qi).call(i), yield c(M, i, xt).call(i), yield c(M, i, Re).call(i, r);
            var h = n.get(r.FieldId);
            if (h) {
              var u = yield i.getCurrentField();
              u && u.FieldId ? (yield c(M, i, se).call(i, u.FieldId), yield ne.formatAfterUpdate(u.FieldId, h)) : yield ne.formatAfterInsert(h.formatting, h.text);
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
    return O(function* () {
      for (var s = c(M, n, it).call(n, t), r = 0; r < t.length; r++) {
        var o = t[r];
        if (o.FieldId) {
          var a = yield c(M, n, se).call(n, o.FieldId);
          if (a) {
            yield c(M, n, xt).call(n), yield c(M, n, St).call(n, i), yield c(M, n, Re).call(n, o);
            var h = s.get(o.FieldId);
            if (h) {
              var u = yield n.getCurrentField();
              u && u.FieldId ? (yield c(M, n, se).call(n, u.FieldId), yield ne.formatAfterUpdate(u.FieldId, h)) : yield ne.formatAfterInsert(h.formatting, h.text);
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
    return O(function* () {
      for (var s = [], r = c(M, n, it).call(n, t), o = 0; o < t.length; o++) {
        var a = t[o];
        if (a.FieldId) {
          if (!a.Content) {
            s.push(a);
            continue;
          }
          var h = yield c(M, n, se).call(n, a.FieldId);
          if (h) {
            var u = yield c(M, n, zi).call(n);
            if (u) {
              s.push(a);
              continue;
            }
            yield c(M, n, St).call(n, i), yield c(M, n, Re).call(n, a);
            var g = r.get(a.FieldId);
            if (g) {
              var v = yield n.getCurrentField();
              v && v.FieldId ? (yield c(M, n, se).call(n, v.FieldId), yield ne.formatAfterUpdate(v.FieldId, g)) : yield ne.formatAfterInsert(g.formatting, g.text);
            }
          }
        }
      }
      if (s.length) {
        yield new Promise(function(I) {
          window.Asc.plugin.executeMethod("UpdateAddinFields", [s], I);
        });
        for (var y of s) {
          var w = r.get(y.FieldId);
          if (w) {
            var k = yield c(M, n, se).call(n, y.FieldId);
            k && (yield ne.formatAfterUpdate(y.FieldId, w));
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
    return O(function* () {
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
    return O(function* () {
      return new Promise((n) => {
        i = i ?? !1, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [t, i], n);
      });
    })();
  }
  /**
   * @returns {Promise<void>}
  */
  moveCursorRight() {
    return O(function* () {
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
function Re(e) {
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
function Wi() {
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
function Ki(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("PasteHtml", [e], t);
  });
}
function zi() {
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
function se(e) {
  return new Promise(function(t) {
    window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
  });
}
function ti() {
  return new Promise(function(e) {
    var t = !0, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetCurrentFootEndnote();
      if (s)
        var r = s.SelectNoteReference();
    }, i, t, () => e(!0));
  });
}
function qi() {
  return new Promise(function(e) {
    var t = !1, i = !1;
    Asc.plugin.callCommand(() => {
      var n = Api.GetDocument(), s = n.GetRangeBySelect();
      s && s.SetVertAlign("baseline");
    }, i, t, e);
  });
}
function ii(e, t) {
  return Ot.apply(this, arguments);
}
function Ot() {
  return Ot = O(function* (e, t) {
    if (yield c(M, this, Re).call(this, e), yield new Promise((u) => {
      var g = !0, v = !1;
      Asc.plugin.callCommand(() => {
        var y = Api.GetDocument();
        y.MoveCursorLeft(1, !0);
      }, v, g, u);
    }), !Asc.scope.bibStyle)
      throw "Bibliography style is not defined";
    var i = new DOMParser(), n = i.parseFromString(t, "text/html"), s = n.querySelectorAll(".csl-entry"), r = new Array(s.length), o = Date.now().toString(36);
    s.forEach((u, g) => {
      var v = u.querySelector(".csl-left-margin"), y = u.querySelector(".csl-right-inline");
      if (y == null || y.replaceWith(...y.childNodes), v) {
        r[g] = v.textContent.trim() + o;
        for (var w = document.createElement("em"); v.firstChild; )
          w.appendChild(v.firstChild);
        var k = document.createElement("span");
        k.textContent = o, w.appendChild(k), v.replaceWith(w);
      }
      for (var I = document.createElement("p"); u.firstChild; )
        I.appendChild(u.firstChild);
      u.replaceWith(I);
    }), t = n.body.innerHTML, yield c(M, this, Ki).call(this, t);
    var a = yield this.getCurrentField();
    if (!a) {
      console.warn("Failed to get current field after paste");
      for (var h = 0; h < 5 && (yield new Promise((u) => {
        setTimeout(() => {
          u(!0);
        }, 100);
      }), a = yield this.getCurrentField(), !a); h++)
        ;
      if (!a)
        throw new Error("Failed to get current field after paste");
    }
    return yield c(M, this, se).call(this, a.FieldId), yield new Promise((u) => {
      var g = !1, v = !1;
      Asc.scope.numbers = r, Asc.scope.hash = o, Asc.plugin.callCommand(() => {
        var y = Api.GetDocument(), w = y.GetRangeBySelect();
        if (w) {
          var k = Asc.scope.bibStyle, I = w.GetAllParagraphs();
          I.forEach((E, A) => {
            var H = E.GetText().trim();
            if (H !== "")
              if (typeof k.linespacing == "number" && E.SetSpacingLine(240 * k.linespacing, "exact"), typeof k.entryspacing == "number" && E.SetSpacingAfter(240 * k.entryspacing), k["second-field-align"]) {
                for (var z = String(Asc.scope.numbers[A]), U = 0; U < E.GetElementsCount(); U++) {
                  var G = E.GetElement(U);
                  if (G.GetText() === z) {
                    G.AddTabStop(), G.SetItalic(!1);
                    break;
                  }
                }
                var te = E.Search(Asc.scope.hash, !0)[0];
                te.Delete(), E.SetIndLeft(k.maxoffset * 120), E.SetIndFirstLine(-(k.maxoffset * 120));
              } else k.hangingindent && (E.SetIndLeft(720), E.SetIndFirstLine(-720));
          });
        }
      }, v, g, u);
    }), Asc.scope.bibStyle = null, a.FieldId;
  }), Ot.apply(this, arguments);
}
var ge = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakSet();
class Di {
  constructor() {
    fe(this, ni), R(this, ge, void 0), R(this, le, void 0), R(this, ae, void 0), C(ge, this, []), C(le, this, []), C(ae, this, []), this.size = 0;
  }
  /** @returns {CitationItem} */
  /**
   * @param {string|number} id
   * @returns {CitationItem|null}
   **/
  getItem(t) {
    t = t.toString();
    var i = l(le, this).indexOf(t);
    return i >= 0 ? l(ge, this)[i] : null;
  }
  /**
   *
   * @param {string|number} id
   * @returns {number}
   */
  getItemIndex(t) {
    return t = t.toString(), l(le, this).indexOf(t);
  }
  clear() {
    return C(ge, this, []), C(ae, this, []), C(le, this, []), this.size = 0, this;
  }
  /**
   * @param {string|number} id
   * @returns {CSLCitationStorage}
   */
  deleteItem(t) {
    t = t.toString();
    var i = l(le, this).indexOf(t);
    return i >= 0 && (l(ge, this).splice(i, 1), l(le, this).splice(i, 1), this.size--), this;
  }
  /**
   * @param {function(CitationItem, string, CSLCitationStorage?): void} callback
   */
  forEachItem(t) {
    for (var i = 0; i < this.size; i++)
      t(l(ge, this)[i], l(le, this)[i], this);
  }
  /**
   * @param {string|number} id
   * @returns {boolean}
   */
  hasItem(t) {
    return t = t.toString(), l(le, this).indexOf(t) >= 0;
  }
  /**
   * @param {CSLCitation} cslCitation
   * @returns {CSLCitationStorage}
   */
  addCslCitation(t) {
    return l(ae, this).push(t), t.setNoteIndex(l(ae, this).length), t.getCitationItems().forEach((i) => {
      c(ni, this, Zi).call(this, i.id, i);
    }), this;
  }
  getAllCitationsInJson() {
    return l(ae, this).map((t) => t.toJSON());
  }
  /**
   * @param {string} id
   * @returns {CSLCitation|undefined}
   */
  getCitation(t) {
    return l(ae, this).find((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {number}
   */
  getCitationIndex(t) {
    return l(ae, this).findIndex((i) => i.citationID === t);
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPre(t) {
    var i = [];
    return l(ae, this).find((n, s) => n.citationID === t ? !0 : (i.push([n.citationID, s + 1]), !1)), i;
  }
  /**
   * @param {string} id
   * @returns {Array<[string, number]>}
   */
  getCitationsPost(t) {
    for (var i = [], n = this.getCitationIndex(t), s = n + 1; s < l(ae, this).length; s++) {
      var r = l(ae, this)[s];
      i.push([r.citationID, s + 1]);
    }
    return i;
  }
}
function Zi(e, t) {
  e = e.toString();
  var i = l(le, this).indexOf(e);
  return i >= 0 ? (l(ge, this)[i] = t, this) : (l(ge, this).push(t), l(le, this).push(e), this.size++, this);
}
var Ji = ["userID", "groupID"];
function p(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItemData: id is required");
  this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = new Array(), this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = new Array(), this._chair = new Array(), this._collectionEditor = new Array(), this._compiler = new Array(), this._composer = new Array(), this._containerAuthor = new Array(), this._contributor = new Array(), this._curator = new Array(), this._director = new Array(), this._editor = new Array(), this._editorialDirector = new Array(), this._executiveProducer = new Array(), this._guest = new Array(), this._host = new Array(), this._illustrator = new Array(), this._narrator = new Array(), this._organizer = new Array(), this._originalAuthor = new Array(), this._performer = new Array(), this._producer = new Array(), this._recipient = new Array(), this._reviewedAuthor = new Array(), this._scriptwriter = new Array(), this._seriesCreator = new Array(), this._translator = new Array(), this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
p.prototype._addCustomProperty = function(e, t) {
  return this._custom[e] = t, this;
};
p.prototype.getCustomProperty = function(e) {
  return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
};
p.prototype.fillFromObject = function(e) {
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
      var h = i[o.creatorType || "author"] || "_author", u = t[h];
      Array.isArray(u) || (u = t._author);
      var g = u.some(function(v) {
        return !(v.family !== a.family && (v.family || a.family) || v.given !== a.given && (v.given || a.given));
      });
      g || u.push(a);
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
p.prototype.getTitle = function() {
  return this._title;
};
p.prototype.getType = function() {
  return this._type;
};
p.prototype.setType = function(e) {
  return this._type = e, this;
};
p.prototype.setCitationKey = function(e) {
  return this._citationKey = e, this;
};
p.prototype.setCategories = function(e) {
  return this._categories = e, this;
};
p.prototype.setLanguage = function(e) {
  return this._language = e, this;
};
p.prototype.setJournalAbbreviation = function(e) {
  return this._journalAbbreviation = e, this;
};
p.prototype.setShortTitle = function(e) {
  return this._shortTitle = e, this;
};
p.prototype.setAuthor = function(e) {
  return this._author = Array.isArray(e) ? e : [e], this;
};
p.prototype.setChair = function(e) {
  return this._chair = Array.isArray(e) ? e : [e], this;
};
p.prototype.setCollectionEditor = function(e) {
  return this._collectionEditor = Array.isArray(e) ? e : [e], this;
};
p.prototype.setCompiler = function(e) {
  return this._compiler = Array.isArray(e) ? e : [e], this;
};
p.prototype.setComposer = function(e) {
  return this._composer = Array.isArray(e) ? e : [e], this;
};
p.prototype.setContainerAuthor = function(e) {
  return this._containerAuthor = Array.isArray(e) ? e : [e], this;
};
p.prototype.setContributor = function(e) {
  return this._contributor = Array.isArray(e) ? e : [e], this;
};
p.prototype.setCurator = function(e) {
  return this._curator = Array.isArray(e) ? e : [e], this;
};
p.prototype.setDirector = function(e) {
  return this._director = Array.isArray(e) ? e : [e], this;
};
p.prototype.setEditor = function(e) {
  return this._editor = Array.isArray(e) ? e : [e], this;
};
p.prototype.setEditorialDirector = function(e) {
  return this._editorialDirector = Array.isArray(e) ? e : [e], this;
};
p.prototype.setExecutiveProducer = function(e) {
  return this._executiveProducer = Array.isArray(e) ? e : [e], this;
};
p.prototype.setGuest = function(e) {
  return this._guest = Array.isArray(e) ? e : [e], this;
};
p.prototype.setHost = function(e) {
  return this._host = Array.isArray(e) ? e : [e], this;
};
p.prototype.setIllustrator = function(e) {
  return this._illustrator = Array.isArray(e) ? e : [e], this;
};
p.prototype.setNarrator = function(e) {
  return this._narrator = Array.isArray(e) ? e : [e], this;
};
p.prototype.setOrganizer = function(e) {
  return this._organizer = Array.isArray(e) ? e : [e], this;
};
p.prototype.setOriginalAuthor = function(e) {
  return this._originalAuthor = Array.isArray(e) ? e : [e], this;
};
p.prototype.setPerformer = function(e) {
  return this._performer = Array.isArray(e) ? e : [e], this;
};
p.prototype.setProducer = function(e) {
  return this._producer = Array.isArray(e) ? e : [e], this;
};
p.prototype.setRecipient = function(e) {
  return this._recipient = Array.isArray(e) ? e : [e], this;
};
p.prototype.setReviewedAuthor = function(e) {
  return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
};
p.prototype.setScriptwriter = function(e) {
  return this._scriptwriter = Array.isArray(e) ? e : [e], this;
};
p.prototype.setSeriesCreator = function(e) {
  return this._seriesCreator = Array.isArray(e) ? e : [e], this;
};
p.prototype.setTranslator = function(e) {
  return this._translator = Array.isArray(e) ? e : [e], this;
};
p.prototype.setAccessed = function(e) {
  return this._accessed = e || {}, this;
};
p.prototype.setContainer = function(e) {
  return this._container = e || {}, this;
};
p.prototype.setEventDate = function(e) {
  return this._eventDate = e || {}, this;
};
p.prototype.setIssued = function(e) {
  return this._issued = e || {}, this;
};
p.prototype.setOriginalDate = function(e) {
  return this._originalDate = e || {}, this;
};
p.prototype.setSubmitted = function(e) {
  return this._submitted = e || {}, this;
};
p.prototype.setAbstract = function(e) {
  return this._abstract = e, this;
};
p.prototype.setAnnote = function(e) {
  return this._annote = e, this;
};
p.prototype.setArchive = function(e) {
  return this._archive = e, this;
};
p.prototype.setArchiveCollection = function(e) {
  return this._archiveCollection = e, this;
};
p.prototype.setArchiveLocation = function(e) {
  return this._archiveLocation = e, this;
};
p.prototype.setArchivePlace = function(e) {
  return this._archivePlace = e, this;
};
p.prototype.setAuthority = function(e) {
  return this._authority = e, this;
};
p.prototype.setCallNumber = function(e) {
  return this._callNumber = e, this;
};
p.prototype.setChapterNumber = function(e) {
  return this._chapterNumber = e, this;
};
p.prototype.setCitationNumber = function(e) {
  return this._citationNumber = e, this;
};
p.prototype.setCitationLabel = function(e) {
  return this._citationLabel = e, this;
};
p.prototype.setCollectionNumber = function(e) {
  return this._collectionNumber = e, this;
};
p.prototype.setCollectionTitle = function(e) {
  return this._collectionTitle = e, this;
};
p.prototype.setContainerTitle = function(e) {
  return this._containerTitle = e, this;
};
p.prototype.setContainerTitleShort = function(e) {
  return this._containerTitleShort = e, this;
};
p.prototype.setDimensions = function(e) {
  return this._dimensions = e, this;
};
p.prototype.setDOI = function(e) {
  return this._DOI = e, this;
};
p.prototype.setEdition = function(e) {
  return this._edition = e, this;
};
p.prototype.setEvent = function(e) {
  return this._event = e, this;
};
p.prototype.setEventTitle = function(e) {
  return this._eventTitle = e, this;
};
p.prototype.setEventPlace = function(e) {
  return this._eventPlace = e, this;
};
p.prototype.setFirstReferenceNoteNumber = function(e) {
  return this._firstReferenceNoteNumber = e, this;
};
p.prototype.setGenre = function(e) {
  return this._genre = e, this;
};
p.prototype.setISBN = function(e) {
  return this._ISBN = e, this;
};
p.prototype.setISSN = function(e) {
  return this._ISSN = e, this;
};
p.prototype.setIssue = function(e) {
  return this._issue = e, this;
};
p.prototype.setJurisdiction = function(e) {
  return this._jurisdiction = e, this;
};
p.prototype.setKeyword = function(e) {
  return this._keyword = e, this;
};
p.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
p.prototype.setMedium = function(e) {
  return this._medium = e, this;
};
p.prototype.setNote = function(e) {
  return this._note = e, this;
};
p.prototype.setNumber = function(e) {
  return this._number = e, this;
};
p.prototype.setNumberOfPages = function(e) {
  return this._numberOfPages = e, this;
};
p.prototype.setNumberOfVolumes = function(e) {
  return this._numberOfVolumes = e, this;
};
p.prototype.setOriginalPublisher = function(e) {
  return this._originalPublisher = e, this;
};
p.prototype.setOriginalPublisherPlace = function(e) {
  return this._originalPublisherPlace = e, this;
};
p.prototype.setOriginalTitle = function(e) {
  return this._originalTitle = e, this;
};
p.prototype.setPage = function(e) {
  return this._page = e, this;
};
p.prototype.setPageFirst = function(e) {
  return this._pageFirst = e, this;
};
p.prototype.setPart = function(e) {
  return this._part = e, this;
};
p.prototype.setPartTitle = function(e) {
  return this._partTitle = e, this;
};
p.prototype.setPMCID = function(e) {
  return this._PMCID = e, this;
};
p.prototype.setPMID = function(e) {
  return this._PMID = e, this;
};
p.prototype.setPrinting = function(e) {
  return this._printing = e, this;
};
p.prototype.setPublisher = function(e) {
  return this._publisher = e, this;
};
p.prototype.setPublisherPlace = function(e) {
  return this._publisherPlace = e, this;
};
p.prototype.setReferences = function(e) {
  return this._references = e, this;
};
p.prototype.setReviewedGenre = function(e) {
  return this._reviewedGenre = e, this;
};
p.prototype.setReviewedTitle = function(e) {
  return this._reviewedTitle = e, this;
};
p.prototype.setScale = function(e) {
  return this._scale = e, this;
};
p.prototype.setSection = function(e) {
  return this._section = e, this;
};
p.prototype.setSource = function(e) {
  return this._source = e, this;
};
p.prototype.setStatus = function(e) {
  return this._status = e, this;
};
p.prototype.setTitle = function(e) {
  return this._title = e, this;
};
p.prototype.setTitleShort = function(e) {
  return this._titleShort = e, this;
};
p.prototype.setURL = function(e) {
  return this._URL = e, this;
};
p.prototype.setVersion = function(e) {
  return this._version = e, this;
};
p.prototype.setVolume = function(e) {
  return this._volume = e, this;
};
p.prototype.setVolumeTitle = function(e) {
  return this._volumeTitle = e, this;
};
p.prototype.setVolumeTitleShort = function(e) {
  return this._volumeTitleShort = e, this;
};
p.prototype.setYearSuffix = function(e) {
  return this._yearSuffix = e, this;
};
p.prototype.setCustom = function(e) {
  return this._custom = Object.assign(this._custom, e), this;
};
p.prototype.toJSON = function(e) {
  var t = {};
  if (t.id = this._id, this._type !== void 0 && this._type !== "" && (t.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), this._language !== void 0 && this._language !== "" && (t.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (t.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (t.shortTitle = this._shortTitle, this._titleShort === void 0 && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (t.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (t.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (t.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (t.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (t.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (t["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (t.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (t["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (t["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (t["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (t["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (t["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (t["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (t["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (t["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (t.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (t.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (t.edition = this._edition), this._event !== void 0 && this._event !== "" && (t.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (t["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (t["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (t.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (t.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (t.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (t.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (t.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (t.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (t.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (t.medium = this._medium), this._note !== void 0 && this._note !== "" && (t.note = this._note), this._number !== void 0 && this._number !== "" && (t.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (t["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (t["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (t["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (t["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (t["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (t.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (t["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (t.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (t["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (t.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (t.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (t.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (t.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (t["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (t.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (t["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (t["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (t.scale = this._scale), this._section !== void 0 && this._section !== "" && (t.section = this._section), this._source !== void 0 && this._source !== "" && (t.source = this._source), this._status !== void 0 && this._status !== "" && (t.status = this._status), this._title !== void 0 && this._title !== "" && (t.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (t["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (t.URL = this._URL), this._version !== void 0 && this._version !== "" && (t.version = this._version), this._volume !== void 0 && this._volume !== "" && (t.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (t["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (t["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (t["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0) {
    var i = this._custom, {
      userID: n,
      groupID: s
    } = i, r = li(i, Ji);
    Object.keys(r).length > 0 && (t.custom = r);
  }
  return this._license !== void 0 && this._license !== "" && (t.license = this._license), t;
};
function $(e) {
  if (typeof e != "string" && typeof e != "number")
    throw new Error("CitationItem: id is required");
  this.id = e, this._itemData = new p(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = new Array();
}
$.prototype.fillFromObject = function(e) {
  var t = this;
  Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(i) {
    t.addUri(i);
  }, this);
};
$.prototype.getInfoForCitationCluster = function() {
  var e = {
    id: this.id,
    "suppress-author": this._suppressAuthor
  };
  return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
};
$.prototype.getItemData = function() {
  return this._itemData;
};
$.prototype.getProperty = function(e) {
  return this._itemData.getCustomProperty(e) !== null ? this._itemData.getCustomProperty(e) : null;
};
$.prototype.setPrefix = function(e) {
  return this._prefix = e, this;
};
$.prototype.setSuffix = function(e) {
  return this._suffix = e, this;
};
$.prototype.setLocator = function(e) {
  return this._locator = e, this;
};
$.prototype.setLabel = function(e) {
  if (e) {
    var t = ["act", "appendix", "article-locator", "book", "canon", "chapter", "column", "elocation", "equation", "figure", "folio", "issue", "line", "note", "opus", "page", "paragraph", "part", "rule", "scene", "section", "sub-verbo", "supplement", "table", "timestamp", "title-locator", "verse", "version", "volume"];
    if (t.indexOf(e) === -1)
      throw new Error('CitationItem.setLocator: Invalid label "' + e + '"');
    this._label = e;
  }
  return this;
};
$.prototype.setSuppressAuthor = function(e) {
  return this._suppressAuthor = e, this;
};
$.prototype.setAuthorOnly = function(e) {
  return this._authorOnly = e, this;
};
$.prototype.addUri = function(e) {
  return this._uris.indexOf(e) !== -1 ? this : (this._uris.push(e), this);
};
$.prototype.toJSON = function(e) {
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
$.prototype.toFlatJSON = function(e) {
  var t = {
    id: this.id,
    index: e
  };
  this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor);
  var i = this._itemData.toJSON();
  return Object.assign(t, i), typeof this._itemData.getCustomProperty("userID") < "u" && this._itemData.getCustomProperty("userID") !== null && (t.userID = String(this._itemData.getCustomProperty("userID"))), typeof this._itemData.getCustomProperty("groupID") < "u" && this._itemData.getCustomProperty("groupID") !== null && (t.groupID = String(this._itemData.getCustomProperty("groupID"))), t;
};
var Yi = ["index"], J = /* @__PURE__ */ new WeakSet();
class Nt {
  /** @param {string} [citationID] */
  constructor(t) {
    fe(this, J), t || (t = c(J, this, si).call(this)), Ct._.has(t) && (console.warn("Citation ID must be unique"), t = c(J, this, si).call(this)), Ct._.add(t), this.citationID = t, this._citationItems = new Array(), this._properties = {}, this._manualOverride = {}, this._schema = "https://github.com/citation-style-language/schema/raw/master/csl-citation.json";
  }
  static resetUsedIDs() {
    Ct._ = /* @__PURE__ */ new Set();
  }
  /**
   * @param {any} citationObject
   * @returns
   */
  fillFromObject(t) {
    return Object.hasOwnProperty.call(t, "properties") || Object.hasOwnProperty.call(t, "manualOverride") || Object.hasOwnProperty.call(t, "schema") ? c(J, this, ji).call(this, t) : Object.hasOwnProperty.call(t, "citationItems") ? c(J, this, $i).call(this, t) : Object.hasOwnProperty.call(t, "version") && Object.hasOwnProperty.call(t, "library") ? c(J, this, Xi).call(this, t) : c(J, this, ui).call(this, t);
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
    return c(J, this, qe).call(this, {
      dontUpdate: !0
    }), this;
  }
  /**
   * @param {number} noteIndex
   * @returns {CSLCitation}
   */
  setNoteIndex(t) {
    return c(J, this, qe).call(this, {
      noteIndex: t
    }), this;
  }
  /**
   * @param {string} plainCitation
   * @returns
   */
  setPlainCitation(t) {
    return c(J, this, qe).call(this, {
      plainCitation: t
    }), this;
  }
  /**
   * @param {string} formattedCitation
   * @returns
   */
  setFormattedCitation(t) {
    return c(J, this, qe).call(this, {
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
      } = i, s = li(i, Yi);
      Object.keys(s).length > 0 && (t.properties = s);
    }
    return this._manualOverride && Object.keys(this._manualOverride).length > 0 && (t.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (t.citationItems = this._citationItems.map(function(r) {
      return r.toJSON();
    })), t;
  }
}
function ji(e) {
  var t = this;
  if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && c(J, this, qe).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems"))
    return console.error("citationItems is empty"), 0;
  var i = this._citationItems.map(function(n) {
    return n.id;
  });
  return e.citationItems.forEach(function(n) {
    var s = n.id, r;
    i.indexOf(s) >= 0 ? r = t._citationItems[i.indexOf(s)] : (r = new $(s), i.push(s)), typeof s == "number" && (s = c(J, t, Qi).call(t, n)), r.fillFromObject(n), c(J, t, Vt).call(t, r);
  }, this), i.length;
}
function $i(e) {
  var t = this;
  return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(i) {
    c(J, t, ui).call(t, i);
  }, this), 1);
}
function ui(e) {
  var t = e.id, i, n = this._citationItems.map(function(s) {
    return s.id;
  });
  return n.indexOf(t) >= 0 ? i = this._citationItems[n.indexOf(t)] : i = new $(t), i.fillFromObject(e), c(J, this, Vt).call(this, i), 1;
}
function Xi(e) {
  if (!Object.hasOwnProperty.call(e, "data"))
    return console.error("Invalid citation object"), 0;
  var t = this._citationItems.map(function(s) {
    return s.id;
  }), i = e.data.key, n;
  return t.indexOf(i) >= 0 ? n = this._citationItems[t.indexOf(i)] : n = new $(i), n.fillFromObject(e), c(J, this, Vt).call(this, n), 1;
}
function Vt(e) {
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
function Qi(e) {
  if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
    var t = e.uris[0].lastIndexOf("/");
    return e.uris[0].slice(t + 1);
  }
  return e.id;
}
function si() {
  return Math.random().toString(36).substring(2, 15);
}
var Ct = {
  _: /* @__PURE__ */ new Set()
}, W = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakSet();
class en {
  constructor() {
    fe(this, _e), R(this, W, void 0), R(this, ut, void 0), R(this, je, void 0), R(this, ht, void 0), C(W, this, new window.Asc.PluginWindow()), C(ut, this, window.Asc.plugin.button), C(je, this, Asc.plugin.onThemeChanged), C(ht, this, Asc.plugin.onTranslate);
  }
  /**
   * @param {string} description
   * @param {string} text
   */
  show(t, i) {
    C(W, this, new window.Asc.PluginWindow());
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
    return c(_e, this, At).call(this, n, i, "default"), l(W, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = (o, a) => {
        s(o === 0), c(_e, this, nt).call(this);
      };
    });
  }
  /**
   * @param {any} content
   */
  showEditWindow(t) {
    var i = this;
    C(W, this, new window.Asc.PluginWindow());
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
    return c(_e, this, At).call(this, n, t, "default"), l(W, this).show(n), new Promise((s, r) => {
      window.Asc.plugin.button = /* @__PURE__ */ (function() {
        var o = O(function* (a, h) {
          var u = yield new Promise((g) => {
            if (!l(W, i)) {
              g(null);
              return;
            }
            l(W, i).attachEvent("onSaveFields", g), l(W, i).command("onClickSave");
          });
          s(a === 0 ? u : null), c(_e, i, nt).call(i);
        });
        return function(a, h) {
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
    typeof n != "string" && (n = "warning"), C(W, this, new window.Asc.PluginWindow());
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
    return c(_e, this, At).call(this, s, window.Asc.plugin.tr(i), n), l(W, this).show(s), new Promise((r, o) => {
      window.Asc.plugin.button = (a, h) => {
        r(a === 0), c(_e, this, nt).call(this);
      };
    });
  }
  destroy() {
    c(_e, this, nt).call(this), C(W, this, null);
  }
}
function At(e, t, i) {
  l(W, this) && (C(ut, this, window.Asc.plugin.button), C(je, this, Asc.plugin.onThemeChanged), C(ht, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (n) => {
    var s;
    (s = l(W, this)) === null || s === void 0 || s.command("onThemeChanged", n), l(je, this).call(this, n);
  }, window.Asc.plugin.onTranslate = () => {
    var n;
    (n = l(W, this)) === null || n === void 0 || n.command("onTranslate"), l(ht, this).call(this);
  }, l(W, this).attachEvent("onWindowReady", () => {
    if (i === "warning") {
      var n;
      (n = l(W, this)) === null || n === void 0 || n.command("onWarning", t);
    } else if (i === "success") {
      var s;
      (s = l(W, this)) === null || s === void 0 || s.command("onSuccess", t);
    } else {
      var r;
      (r = l(W, this)) === null || r === void 0 || r.command("onAttachedContent", t);
    }
  }), l(W, this).attachEvent("onUpdateHeight", (n) => {
    var s;
    Asc.plugin.executeMethod("ResizeWindow", [(s = l(W, this)) === null || s === void 0 ? void 0 : s.id, [e.size[0] - 2, n]], () => {
    });
  }));
}
function nt() {
  l(W, this) && l(W, this).close(), window.Asc.plugin.button = l(ut, this), window.Asc.plugin.onThemeChanged = l(je, this);
}
var Le = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakSet();
class tn {
  /**
   * @param {LocalesManager} localesManager
   * @param {CslStylesManager} cslStylesManager
   * @param {ZoteroSdk} sdk
   */
  constructor(t, i, n) {
    fe(this, P), R(this, Le, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = t, this._cslStylesManager = i, this._storage = new Di(), this._formatter, this.citationDocService = new Gi(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), C(Le, this, new en());
  }
  /** @returns {Promise<AddinFieldData | null>} */
  getCurrentField() {
    var t = this;
    return O(function* () {
      return t.citationDocService.getCurrentField();
    })();
  }
  /**
   * @returns {Promise<boolean>}
   */
  saveAsText() {
    var t = this;
    return O(function* () {
      var i = yield t.citationDocService.saveAsText();
      return i && l(Le, t).showInfoWindow("Success!", "All active Mendeley citations and Bibliography have been replaced.", "success"), i;
    })();
  }
  /**
   * @param {Array<SearchResultItem>} items
   * @returns {Promise<boolean>}
   */
  insertSelectedCitations(t) {
    var i = this;
    return O(function* () {
      var n = i;
      try {
        yield c(P, i, Ie).call(i), yield c(P, i, Ae).call(i);
      } catch (a) {
        throw a;
      }
      var s = new Nt("");
      for (var r in t) {
        var o = t[r];
        s.fillFromObject(o);
      }
      return c(P, i, fi).call(i, t).then((a) => (a.forEach(function(h) {
        s.fillFromObject(h);
      }), i._storage.addCslCitation(s), c(P, n, on).call(n, s)));
    })();
  }
  /** @returns {Promise<string>} */
  insertBibliography() {
    var t = this;
    return O(function* () {
      try {
        var {
          fieldsWithCitations: i,
          bibFieldValue: n,
          bibField: s
        } = yield c(P, t, Ie).call(t), r = i.length === 0;
        if (yield c(P, t, Ae).call(t), s) {
          var o = [yield c(P, t, st).call(t, r, s)];
          return t.citationDocService.updateAddinFields(o).then((a) => a ? a[0] : "");
        } else
          return c(P, t, an).call(t, r, n);
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
    return O(function* () {
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
    return O(function* () {
      return n.citationDocService.moveCursorOutsideField(t, i);
    })();
  }
  /**
   * @returns {Promise<void>}
   */
  moveCursorRight() {
    var t = this;
    return O(function* () {
      return t.citationDocService.moveCursorRight();
    })();
  }
  /**
   * @param {boolean} [bHardRefresh]
   * @returns {Promise<void>}
   */
  updateCslItems(t) {
    var i = this;
    return O(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(P, i, Ie).call(i), r = n.length === 0;
        yield c(P, i, Ae).call(i);
        var o = [];
        if (typeof t > "u") {
          var a = i._cslStylesManager.getLastUsedFormat();
          a === "numeric" && (t = !0);
        }
        if (typeof t == "boolean" && (o = yield c(P, i, ze).call(i, n, t)), s && o.push(yield c(P, i, st).call(i, r, s)), o && o.length)
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
    return O(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(P, i, Ie).call(i), r = n.length === 0;
        yield c(P, i, Ae).call(i);
        var o = yield c(P, i, ze).call(i, n, !1);
        if (o && o.length && (yield i.citationDocService.convertNotesStyle(o, t)), s) {
          var a = [yield c(P, i, st).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(a);
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
    return O(function* () {
      try {
        var {
          fieldsWithCitations: s,
          bibField: r
        } = yield c(P, n, Ie).call(n, t), o = s.length === 0;
        yield c(P, n, Ae).call(n);
        var a = yield c(P, n, ze).call(n, s, !0);
        if (i && a && a.length && (yield n.citationDocService.convertNotesStyle(a, i), a = []), a && a.length)
          return n.citationDocService.updateAddinFields(a);
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
    return O(function* () {
      try {
        var {
          fieldsWithCitations: n,
          bibField: s
        } = yield c(P, i, Ie).call(i), r = n.length === 0;
        yield c(P, i, Ae).call(i);
        var o = yield c(P, i, ze).call(i, n, !0);
        if (o && o.length && (t ? yield i.citationDocService.convertTextToNotes(o, t) : yield i.citationDocService.convertNotesToText(o)), s) {
          var a = [yield c(P, i, st).call(i, r, s)];
          yield i.citationDocService.updateAddinFields(a);
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
    return O(function* () {
      try {
        var {
          fieldsWithCitations: n
        } = yield c(P, i, Ie).call(i);
        yield c(P, i, Ae).call(i);
        var s = yield c(P, i, ze).call(i, n, !1, !0);
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
    return O(function* () {
      if (!t) return null;
      var n = c(P, i, Ft).call(i, t), s = yield l(Le, i).showEditWindow(n);
      return s || null;
    })();
  }
  /** @param {string} message */
  showWarningMessage(t) {
    var i = this;
    return O(function* () {
      l(Le, i).showInfoWindow("Warning!", t);
    })();
  }
}
function hi() {
  var e = this._cslStylesManager.getLastUsedStyleIdOrDefault(), t = this._cslStylesManager.cached(e);
  return typeof t != "string" || t === "" ? !0 : /\bvariable\s*=\s*"[^"]*\babstract\b[^"]*"/.test(t);
}
function nn(e) {
  !e || !Array.isArray(e.citationItems) || e.citationItems.forEach(function(t) {
    t && t.itemData && Object.hasOwnProperty.call(t.itemData, "abstract") && delete t.itemData.abstract;
  });
}
function di(e) {
  var t = e.toJSON();
  return c(P, this, hi).call(this) || c(P, this, nn).call(this, t), t;
}
function sn(e, t) {
  var i = e.getProperty("userID"), n = e.getProperty("groupID");
  if (i)
    return {
      id: t,
      userID: i
    };
  if (n)
    return {
      id: t,
      groupID: n
    };
  var s = e.toJSON();
  if (!Array.isArray(s.uris))
    return null;
  for (var r = 0; r < s.uris.length; r++) {
    var o = s.uris[r], a = o.match(/zotero\.org\/(users|groups)\/([^/]+)\/items\/([^/?#]+)/i);
    if (!(!a || a[3] !== t))
      return a[1] === "users" ? {
        id: t,
        userID: a[2]
      } : {
        id: t,
        groupID: a[2]
      };
  }
  return null;
}
function rn() {
  return Tt.apply(this, arguments);
}
function Tt() {
  return Tt = O(function* () {
    if (c(P, this, hi).call(this)) {
      var e = {};
      if (this._storage.forEachItem((i, n) => {
        var s = i.toFlatJSON(this._storage.getItemIndex(n));
        if (!(Object.hasOwnProperty.call(s, "abstract") && s.abstract !== "")) {
          var r = c(P, this, sn).call(this, i, n);
          r && (e[n] = r);
        }
      }), Object.keys(e).length !== 0) {
        var t = yield c(P, this, fi).call(this, e);
        t.forEach((i) => {
          var n = i.key || i.data && i.data.key || i.id;
          if (n) {
            var s = this._storage.getItem(n);
            s && s.fillFromObject(i);
          }
        });
      }
    }
  }), Tt.apply(this, arguments);
}
function Ae() {
  return Mt.apply(this, arguments);
}
function Mt() {
  return Mt = O(function* () {
    yield c(P, this, rn).call(this), c(P, this, ln).call(this);
  }), Mt.apply(this, arguments);
}
function on(e) {
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
    var h = t._formatter.processCitationCluster(e.toJSON(), r, o), u = c(P, t, Ut).call(t, h[1][0][1]);
    n.appendChild(s), s.innerHTML = u, e.setPlainCitation(s.innerText), e.setFormattedCitation(u);
    var g = null;
    t._cslStylesManager.getLastUsedFormat() === "note" && (g = t._cslStylesManager.getLastUsedNotesStyle());
    var v = c(P, t, di).call(t, e);
    return t.citationDocService.addCitation(u, JSON.stringify(v), g);
  });
}
function fi(e) {
  var t = [], i = {};
  for (var n in e) {
    var s = e[n], r = s.userID, o = s.groupID;
    r ? t.push(s.id) : o && (i[o] || (i[o] = []), i[o].push(s.id));
  }
  var a = [];
  t.length && a.push(this._sdk.getItems(null, t, "json").then(function(u) {
    return u.items || [];
  }));
  for (var h in i)
    Object.hasOwnProperty.call(i, h) && a.push(this._sdk.getGroupItems(null, h, i[h], "json").then(function(u) {
      return u.items || [];
    }));
  return Promise.all(a).then(function(u) {
    return u.reduce((g, v) => g.concat(v), []);
  });
}
function pi() {
  try {
    for (var e = new Array(this._storage.size), t = this._formatter.makeBibliography(), i = 0; i < t[1].length; i++) {
      var n = c(P, this, Ut).call(this, t[1][i]);
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
      l(Le, this).showInfoWindow("Warning!", "Style does not describe the bibliography");
    else
      throw console.error(a), "Failed to apply this style.";
    return "";
  }
}
function Ft(e) {
  var t, i = e.Value.indexOf("{"), n = e.Value.lastIndexOf("}");
  if (i !== -1) {
    var s = e.Value.slice(i, n + 1);
    t = JSON.parse(s);
  }
  return t;
}
function Ie(e) {
  var t = this;
  return this._storage.clear(), Nt.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
    var n = 0, s = " ", r = i.find(function(u) {
      return u.Value.indexOf(t._bibPrefixNew) !== -1 || u.Value.indexOf(t._bibPrefix) !== -1;
    });
    if (r) {
      var o = c(P, t, Ft).call(t, r);
      typeof o == "object" && Object.keys(o).length > 0 && (s = JSON.stringify(o));
    }
    var a = i.filter(function(u) {
      return u.Value.indexOf(t._citPrefixNew) !== -1 || u.Value.indexOf(t._citPrefix) !== -1;
    }), h = a.map(function(u) {
      var g = c(P, t, Ft).call(t, u), v = "";
      u.Value.indexOf(t._citPrefix) === -1 && (v = g.citationID);
      var y = new Nt(v);
      return e ? n += y.fillFromObject(e) : n += y.fillFromObject(g), t._storage.addCslCitation(y), {
        field: ai({}, u),
        cslCitation: y
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
function an(e, t) {
  var i = c(P, this, pi).call(this);
  if (e && (i = b(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography())
    return this.citationDocService.addBibliography(i, t);
  throw "The current bibliographic style does not describe the bibliography";
}
function st(e, t) {
  if (e)
    t.Content = b(this._bibPlaceholderIfEmpty);
  else {
    var i = c(P, this, pi).call(this);
    t.Content = i;
  }
  return t;
}
function ze(e, t, i) {
  return Rt.apply(this, arguments);
}
function Rt() {
  return Rt = O(function* (e, t, i) {
    var n = document.createDocumentFragment(), s = document.createElement("div");
    n.appendChild(s);
    for (var r = [], o = e.length - 1; o >= 0; o--) {
      var a = !!i, {
        field: h,
        cslCitation: u
      } = e[o], g = this._storage.getCitationsPre(u.citationID), v = this._storage.getCitationsPost(u.citationID), y = this._storage.getAllCitationsInJson();
      this._formatter.rebuildProcessorState(y);
      var w = this._formatter.processCitationCluster(u.toJSON(), g, v), k = c(P, this, Ut).call(this, w[1][0][1]);
      s.innerHTML = k, u.setFormattedCitation(k);
      var I = u.getPlainCitation(), E = h.Content;
      I === "" && (I = E);
      var A = s.innerText;
      if (!u.getDoNotUpdate()) {
        if (I !== E && !t) {
          var H = "<p>" + b("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + b("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + b("Original:") + " " + A + "</p><p>" + b("Modified:") + " " + E + "</p>", z = yield l(Le, this).show("Saving custom edits", H);
          z ? (u.setDoNotUpdate(), delete h.Content) : (h.Content = k, u.setPlainCitation(A)), a = !0;
        } else
          (A !== E || I !== E || I !== A) && (a = !0), h.Content = k, u.setPlainCitation(A);
        if (u) {
          var U = this._citPrefixNew + " " + this._citSuffixNew + " " + JSON.stringify(c(P, this, di).call(this, u));
          h.Value !== U && (a = !0), h.Value = U;
        }
        a && r.push(h);
      }
    }
    return r;
  }), Rt.apply(this, arguments);
}
function ln() {
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
function Ut(e) {
  return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
class ri {
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
    var a = s.querySelector('info link[rel="self"]');
    if (a) {
      var h = a.getAttribute("href");
      h && (r.href = h);
    }
    var u = s.querySelector('info link[rel="independent-parent"]');
    if (u) {
      var g = u.getAttribute("href");
      g && (r.parent = g), r.dependent = 1;
    }
    var v = s.querySelector("info updated");
    v && (r.updated = v.textContent);
    var y = s.querySelector("info category[citation-format]");
    if (y) {
      var w = y.getAttribute("citation-format");
      w && (r.categories.format = w);
    }
    var k = s.querySelectorAll("info category[field]");
    return k && k.forEach(function(I) {
      var E = I.getAttribute("field");
      E && r.categories.fields.push(E);
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
function Ne() {
  this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
Ne.prototype.getStyleNames = function() {
  var e = localStorage.getItem(this._customStyleNamesKey);
  return e ? JSON.parse(e) : [];
};
Ne.prototype._getStyles = function() {
  var e = localStorage.getItem(this._customStylesKey);
  return e ? JSON.parse(e) : [];
};
Ne.prototype.getStyle = function(e) {
  var t = this.getStyleNames(), i = t.indexOf(e);
  return i === -1 ? null : this._getStyles()[i];
};
Ne.prototype.getStylesInfo = function() {
  for (var e = this.getStyleNames(), t = this._getStyles(), i = [], n = 0; n < e.length; n++) {
    var s = $e.getStyleInfo(e[n], t[n]);
    i.push(s);
  }
  return i;
};
Ne.prototype.setStyle = function(e, t) {
  var i = this.getStyleNames(), n = this._getStyles(), s = i.indexOf(e);
  return s === -1 && (s = i.length), i[s] = e, n[s] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(i)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), $e.getStyleInfo(e, t);
};
Ne.prototype.deleteStyle = function(e) {
  var t = this.getStyleNames(), i = this._getStyles(), n = t.indexOf(e);
  return n === -1 || (t.splice(n, 1), i.splice(n, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(i))), e;
};
function Z(e) {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new Ne(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = ["american-anthropological-association", "american-medical-association", "american-political-science-association", "american-sociological-association", "apa", "chicago-author-date", "chicago-notes-bibliography", "harvard-cite-them-right", "ieee", "modern-language-association", "nature"], this._cache = {};
}
Z.prototype.addCustomStyle = function(e) {
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
Z.prototype.getLastUsedFormat = function() {
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
Z.prototype.getLastUsedNotesStyle = function() {
  var e = localStorage.getItem(this._lastNotesStyleKey);
  return e === "footnotes" || e === "endnotes" ? e : "footnotes";
};
Z.prototype.getLastUsedStyleId = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || null;
};
Z.prototype.getLastUsedStyleIdOrDefault = function() {
  var e = localStorage.getItem(this._lastStyleKey);
  return e || "ieee";
};
Z.prototype.getStyle = function(e) {
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
Z.prototype.getStylesInfo = function() {
  var e = this;
  return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
    var i = e.getLastUsedStyleId() || "ieee", n = [], s = e._customStylesStorage.getStyleNames(), r = t[0], o = t[1];
    return e._isDesktopAvailable && !e._isOnlineAvailable && (r = r.filter(function(a) {
      return e._defaultStyles.indexOf(a.name) >= 0 || a.name == i;
    })), o.forEach(function(a) {
      n.push(a), e._defaultStyles.indexOf(a.name) === -1 && e._defaultStyles.push(a.name);
    }), r.forEach(function(a) {
      s.indexOf(a.name) === -1 && n.push(a);
    }), n.sort((a, h) => a.name.localeCompare(h.name)), n;
  });
};
Z.prototype._getStylesJson = function() {
  var e = this._STYLES_JSON_LOCAL;
  return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(t) {
    return t.json();
  });
};
Z.prototype.cached = function(e) {
  return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
};
Z.prototype.isLastUsedStyleContainBibliography = function() {
  var e = localStorage.getItem(this._lastUsedStyleContainBibliographyKey);
  return e !== "false";
};
Z.prototype.isStyleDefault = function(e) {
  return this._defaultStyles.indexOf(e) >= 0;
};
Z.prototype._isValidCSL = function(e) {
  return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
};
Z.prototype._readCSLFile = function(e) {
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
Z.prototype._saveLastUsedStyle = function(e, t, i) {
  this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, i);
  var n = $e.isStyleContainBibliography(t);
  localStorage.setItem(this._lastUsedStyleContainBibliographyKey, n.toString());
};
Z.prototype.saveLastUsedNotesStyle = function(e) {
  localStorage.setItem(this._lastNotesStyleKey, e);
};
Z.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
Z.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function me() {
  this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
me.prototype.loadLocale = function(e) {
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
me.prototype.getLastUsedLanguage = function() {
  return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
};
me.prototype.getLocale = function(e) {
  return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
};
me.prototype.saveLastUsedLanguage = function(e) {
  this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
};
me.prototype._getLocalesUrl = function() {
  return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
};
me.prototype.setDesktopApiAvailable = function(e) {
  this._isDesktopAvailable = e;
};
me.prototype.setRestApiAvailable = function(e) {
  this._isOnlineAvailable = e;
};
function D(e, t) {
  if (this._router = e, this._displayNoneClass = t, this._saveBtn = new ee("saveSettingsBtn", {
    variant: "primary"
  }), this._cancelBtn = new ee("cancelBtn", {
    variant: "secondary"
  }), this._styleSelect = new Oe("styleSelectList", {
    placeholder: "Enter style name",
    sortable: !0
  }), this._styleSelectListOther = new Oe("styleSelectedListOther", {
    placeholder: "Enter style name",
    searchable: !0
  }), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper)
    throw new Error("notesStyleWrapper not found");
  if (this._footNotes = new Yt("footNotes", {
    label: "Footnotes"
  }), this._endNotes = new Yt("endNotes", {
    label: "Endnotes"
  }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput)
    throw new Error("cslFileInput not found");
  this._languageSelect = new Oe("styleLangList", {
    placeholder: "Select language"
  }), this._cslStylesManager = new Z("zoteroStyleId"), this._localesManager = new me(), this._selectLists = [], this._onChangeState = function(i, n) {
  }, this._styleMessage = new Ue("styleMessage", {
    type: "error"
  }), this._langMessage = new Ue("langMessage", {
    type: "error"
  }), this._LANGUAGES = [["af-ZA", "Afrikaans"], ["ar", "Arabic"], ["bg-BG", "Bulgarian"], ["ca-AD", "Catalan"], ["cs-CZ", "Czech"], ["cy-GB", "Welsh"], ["da-DK", "Danish"], ["de-AT", "German (Austria)"], ["de-CH", "German (Switzerland)"], ["de-DE", "German (Germany)"], ["el-GR", "Greek"], ["en-GB", "English (UK)"], ["en-US", "English (US)"], ["es-CL", "Spanish (Chile)"], ["es-ES", "Spanish (Spain)"], ["es-MX", "Spanish (Mexico)"], ["et-EE", "Estonian"], ["eu", "Basque"], ["fa-IR", "Persian"], ["fi-FI", "Finnish"], ["fr-CA", "French (Canada)"], ["fr-FR", "French (France)"], ["he-IL", "Hebrew"], ["hr-HR", "Croatian"], ["hu-HU", "Hungarian"], ["id-ID", "Indonesian"], ["is-IS", "Icelandic"], ["it-IT", "Italian"], ["ja-JP", "Japanese"], ["km-KH", "Khmer"], ["ko-KR", "Korean"], ["la", "Latin"], ["lt-LT", "Lithuanian"], ["lv-LV", "Latvian"], ["mn-MN", "Mongolian"], ["nb-NO", "Norwegian (Bokmål)"], ["nl-NL", "Dutch"], ["nn-NO", "Norwegian (Nynorsk)"], ["pl-PL", "Polish"], ["pt-BR", "Portuguese (Brazil)"], ["pt-PT", "Portuguese (Portugal)"], ["ro-RO", "Romanian"], ["ru-RU", "Russian"], ["sk-SK", "Slovak"], ["sl-SI", "Slovenian"], ["sr-RS", "Serbian"], ["sv-SE", "Swedish"], ["th-TH", "Thai"], ["tr-TR", "Turkish"], ["uk-UA", "Ukrainian"], ["vi-VN", "Vietnamese"], ["zh-CN", "Chinese (PRC)"], ["zh-TW", "Chinese (Taiwan)"]], this._bNumFormat = !1, this._stateSettings = {
    style: "",
    notesStyle: "footnotes",
    styleFormat: "numeric"
  };
}
D.prototype.getLocalesManager = function() {
  return this._localesManager;
};
D.prototype.getStyleManager = function() {
  return this._cslStylesManager;
};
D.prototype.getLocale = function() {
  return this._localesManager.getLocale();
};
D.prototype.getLastUsedStyleId = function() {
  return this._cslStylesManager.getLastUsedStyleId();
};
D.prototype.init = function() {
  var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
  this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
  var i = [this._onStyleChange(e), this._localesManager.loadLocale(t), this._loadStyles()];
  return Promise.all(i);
};
D.prototype.onChangeState = function(e) {
  this._onChangeState = e;
};
D.prototype.setDesktopApiAvailable = function(e) {
  this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
};
D.prototype.setRestApiAvailable = function(e) {
  this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
};
D.prototype._addEventListeners = function() {
  var e = this;
  this._saveBtn.subscribe(function(t) {
    if (t.type === "button:click") {
      var i = e._languageSelect.getSelectedValue();
      if (i === null) {
        console.error("No language selected");
        return;
      }
      var n = ai({}, e._stateSettings), s = [];
      e._stateSettings.language !== i && (e._localesManager.saveLastUsedLanguage(i), s.push(e._localesManager.loadLocale(i).catch(function(a) {
        throw console.error(a), e._langMessage.show(b("Failed to load language")), a;
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
          console.error(s), e._styleMessage.show(b("Invalid CSL style file"));
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
D.prototype._hideAllMessages = function() {
  this._langMessage.close(), this._styleMessage.close();
};
D.prototype._hide = function() {
  this._router.openMain();
};
D.prototype.show = function() {
  this._stateSettings = {
    language: this._localesManager.getLastUsedLanguage(),
    style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
    notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
    styleFormat: this._cslStylesManager.getLastUsedFormat()
  }, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
};
D.prototype._loadStyles = function() {
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
D.prototype._addStylesToList = function(e) {
  var t = this, i = this._cslStylesManager.getLastUsedStyleIdOrDefault(), n = e.map(function(r) {
    return [r.name, r.title];
  }), s = n.filter(function(r) {
    return !!(r[0] == i || t._cslStylesManager.isStyleDefault(r[0]));
  });
  this._styleSelect.addItems(s, i), this._styleSelectListOther.addItems(n, i);
};
D.prototype._somethingWasChanged = function() {
  this._saveBtn.enable();
};
D.prototype._onStyleChange = function(e, t) {
  var i = this;
  return t && i._showLoader(), i._cslStylesManager.getStyle(e, !t).then(function(n) {
    var s = n.styleFormat;
    i._bNumFormat = s == "numeric", s === "note" ? i._notesStyleWrapper.classList.remove(i._displayNoneClass) : i._notesStyleWrapper.classList.add(i._displayNoneClass), t && i._hideLoader();
  }).catch(function(n) {
    throw console.error(n), typeof n == "string" && i._styleMessage.show(b(n)), t && i._hideLoader(), n;
  });
};
D.prototype._showLoader = function() {
  this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
};
D.prototype._hideLoader = function() {
  this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
function pe(e, t) {
  if (this._router = e, this._sdk = t, this._apiKeyLoginField = new Pe("apiKeyField", {
    autofocus: !0,
    autocomplete: "on"
  }), this._saveApiKeyBtn = new ee("saveApiKeyBtn", {
    disabled: !0
  }), this._apiKeyMessage = new Ue("apiKeyMessage", {
    type: "error"
  }), this._useDesktopMessage = new Ue("useDesktopMessage", {
    type: "error"
  }), this._connectToLocalZotero = new ee("connectToLocalZotero", {
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
pe.prototype.init = function() {
  var e = this;
  this._addEventListeners();
  var t = !1, i = document.querySelectorAll(".for-zotero-online"), n = Bt.runApisChecker(e._sdk);
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
pe.prototype._addEventListeners = function() {
  var e = this;
  this._apiKeyLoginField.subscribe(function(t) {
    t.type, t.type === "inputfield:input" && (e._apiKeyLoginField.getValue() ? e._saveApiKeyBtn.enable() : e._saveApiKeyBtn.disable());
  }), this._saveApiKeyBtn.subscribe(function(t) {
    t.type === "button:click" && e._tryToApplyKey();
  }), this._connectToLocalZotero.subscribe(function(t) {
    t.type === "button:click" && (e._showLoader(), Bt.checkStatus(e._sdk).then(function(i) {
      if (i.desktop && i.hasPermission)
        e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages();
      else if (i.desktop && !i.hasPermission) {
        var n = 'Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check "Allow other applications on this computer to communicate with Zotero"';
        e._useDesktopMessage.show(b(n));
      } else i.desktop || e._useDesktopMessage.show(b("Connection to Zotero failed. Make sure Zotero is running."));
    }).finally(function() {
      e._hideLoader();
    }));
  }), this._logoutLink.onclick = function(t) {
    return e._sdk.clearSettings(), e._show(), !0;
  };
};
pe.prototype._tryToApplyKey = function() {
  var e = this, t = e._apiKeyLoginField.getValue();
  t && (e._showLoader(), e._sdk.setApiKey(t).then(function() {
    Bt.successfullyLoggedInUsingApiKey(), e._hide(!0);
  }).catch(function(i) {
    console.error(i), e._apiKeyMessage.show(b("Invalid API key"));
  }).finally(function() {
    e._hideLoader();
  }));
};
pe.prototype._hideAllMessages = function() {
  this._apiKeyMessage.close();
};
pe.prototype._hide = function(e) {
  this._router.openMain(), e && this._logoutLink.classList.remove("hidden");
};
pe.prototype._show = function() {
  this._router.openLogin(), this._logoutLink.classList.add("hidden");
};
pe.prototype._showLoader = function() {
  this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
};
pe.prototype._hideLoader = function() {
  this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
function We() {
  this._searchField = new Pe("searchField", {
    type: "text",
    autofocus: !0,
    showClear: !1
  }), this._filterButton = new ee("filterButton", {
    variant: "secondary-icon",
    size: "small"
  }), this._librarySelectList = new Oe("librarySelectList", {
    // TODO: add translation
    placeholder: b("No items selected"),
    multiple: !0,
    description: b("Search in:")
  }), this._subscribers = [], this._addEventListeners();
}
We.prototype._addEventListeners = function() {
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
We.prototype.addGroups = function(e) {
  var t = this, i = localStorage.getItem("selectedGroups"), n = i ? JSON.parse(i).map(function(w) {
    return w.toString();
  }) : ["my_library", "group_libraries"], s = !1;
  e.forEach(function(w) {
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
  }), !s && e.forEach(function(w) {
    n.indexOf(w.id.toString()) !== -1 && (s = !0);
  }), s || (n = ["my_library", "group_libraries"]);
  for (var o = function(k, I, E) {
    typeof k == "number" && (k = k.toString()), t._librarySelectList instanceof Oe && t._librarySelectList.addItem(k, I, E);
  }, a = 0; a < r.length; a++) {
    var h = r[a].id, u = r[a].name;
    o(h, u, n.indexOf(h) !== -1);
  }
  if (e.length !== 0) {
    this._librarySelectList.addSeparator();
    for (var g = n.indexOf("group_libraries") !== -1, a = 0; a < e.length; a++) {
      var v = e[a].id, y = e[a].name;
      o(v, y, g || n.indexOf(v.toString()) !== -1);
    }
    this._selectedGroupsWatcher(r, e);
  }
};
We.prototype._getSelectedGroups = function() {
  var e = this, t = this._librarySelectList.getSelectedValues();
  return (Array.isArray(t) === !1 || t.length === 0) && setTimeout(function() {
    e._librarySelectList.openDropdown();
  }, 500), t === null || typeof t == "string" ? [] : t;
};
We.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
We.prototype._selectedGroupsWatcher = function(e, t) {
  var i = this;
  this._librarySelectList instanceof Oe && this._librarySelectList.subscribe(function(n) {
    if (n.type === "selectbox:change") {
      var s = [], r = n.detail.values, o = n.detail.current, a = n.detail.enabled, h = e.map(function(y) {
        return y.id;
      }), u = t.map(function(y) {
        return y.id.toString();
      }), g = h.indexOf(String(o)) !== -1;
      if (g)
        o === "group_libraries" ? (a ? (s.push("group_libraries"), i._librarySelectList.selectItems(u, !0)) : i._librarySelectList.unselectItems(u, !0), r.indexOf("my_library") !== -1 && s.push("my_library")) : r.indexOf("group_libraries") !== -1 ? (s.push("group_libraries"), a && s.push(o)) : s = r.slice();
      else if (!g) {
        var v = u.every(function(y) {
          return r.indexOf(y) !== -1;
        });
        v ? (i._librarySelectList.selectItems("group_libraries", !0), s.push("group_libraries"), r.indexOf("my_library") !== -1 && s.push("my_library")) : (i._librarySelectList.unselectItems("group_libraries", !0), s = r.filter(function(y) {
          return y !== "group_libraries";
        }));
      }
      s.length === 0 ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(s));
    }
  });
};
var cn = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]];
function K(e, t, i) {
  this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = i, this._fLoadMore = t, this._loadTimeout, this._editMode = !1, this._init();
}
K.prototype._init = function() {
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
K.prototype.clearLibrary = function() {
  this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
  for (var e = this._docsHolder; e && e.lastChild; )
    e.removeChild(e.lastChild);
  e && (e.scrollTop = 0), this._docsScroller.onscroll();
};
K.prototype.displayNothingFound = function() {
  this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
};
K.prototype.displaySearchItems = function(e, t, i) {
  var n = this, s = this._docsHolder;
  this._lastSearch = i;
  var r = 0;
  return new Promise((o, a) => {
    if (e && e.items && e.items.length > 0) {
      var h = document.createElement("div");
      s && h.classList.add("page" + s.children.length);
      for (var u = 0; u < e.items.length; u++) {
        var g = e.items[u];
        g.title && (h.appendChild(n._buildDocElement(g)), r++);
      }
      s && s.appendChild(h);
    } else t && a(t);
    this._docsScroller.onscroll(), o(r);
  });
};
K.prototype.getSelectedItems = function() {
  var e = Object.assign({}, this._items || {});
  return e;
};
K.prototype.removeItems = function(e) {
  var t = this;
  e.forEach(function(i) {
    t._removeSelected(i);
  });
};
K.prototype.subscribe = function(e) {
  var t = this;
  return this._subscribers.push(e), {
    unsubscribe: function() {
      t._subscribers = t._subscribers.filter(function(n) {
        return n !== e;
      });
    }
  };
};
K.prototype._buildDocElement = function(e) {
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
  var a = document.createElement("div");
  if (a.textContent = e.title.trim(), a.classList.add("truncate-text"), a.classList.add("secondary-text"), (e.publisher || e["publisher-place"]) && (a.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
    var h = e.issued["date-parts"][0];
    r.length > 20 ? a.textContent += " (" + h.join("-") + ")" : (r.length > 0 && r.slice(-1) !== "." && r.slice(-1) !== "," && (r += "."), r += " " + h.join("-"));
  }
  r.length === 0 && (r = a.textContent), a.setAttribute("title", a.textContent), n.appendChild(a);
  var u = document.createElement("input");
  s.appendChild(u);
  var g = new lt(u, {
    checked: !!this._items[e.id],
    label: r,
    title: !0,
    id: e.id
  });
  this._items[e.id] && (this._checks[e.id] = g), s.appendChild(o), i.appendChild(s), i.appendChild(n);
  var v;
  function y() {
    i.classList.toggle("doc-open"), v || (v = t._buildCitationParams(e), i.appendChild(v));
  }
  return o.onclick = y, g.subscribe(function(w) {
    w.type === "checkbox:change" && (w.detail.checked ? t._addSelected(e, g) : t._removeSelected(e.id));
  }), i;
};
K.prototype._buildCitationParams = function(e) {
  var t = e.label || localStorage.getItem("selectedLocator") || "page";
  e.label = t;
  var i = document.createDocumentFragment(), n = document.createElement("div"), s = document.createElement("input"), r = document.createElement("input"), o = document.createElement("div"), a = document.createElement("div"), h = document.createElement("input"), u = document.createElement("div"), g = document.createElement("input");
  i.appendChild(n), n.appendChild(s), n.appendChild(r), i.appendChild(o), o.appendChild(a), o.appendChild(h);
  var v = "";
  i.appendChild(u), u.appendChild(g);
  var y = new Pe(s, {
    type: "text",
    placeholder: b("Prefix"),
    value: e.prefix || ""
  }), w = new Pe(r, {
    type: "text",
    placeholder: b("Suffix"),
    value: e.suffix || ""
  }), k = new Oe(a, {
    placeholder: b("Locator"),
    translate: b
  });
  cn.forEach(function(A) {
    var H = A[0] === t;
    k.addItem(A[0], A[1], H), H && (v = A[1]);
  });
  var I = new Pe(h, {
    type: "text",
    placeholder: b(v),
    value: e.locator || ""
  }), E = new lt(g, {
    label: b("Omit Author"),
    checked: !!e["suppress-author"]
  });
  return y.subscribe(function(A) {
    A.type === "inputfield:input" && (e.prefix = A.detail.value);
  }), w.subscribe(function(A) {
    A.type === "inputfield:input" && (e.suffix = A.detail.value);
  }), I.subscribe(function(A) {
    A.type === "inputfield:input" && (e.locator = A.detail.value);
  }), k.subscribe(function(A) {
    if (A.type === "selectbox:change" && A.detail.items) {
      var H = A.detail.items[0];
      I.setPlaceholder(H.text), e.label = A.detail.values[0].toString(), localStorage.setItem("selectedLocator", e.label);
    }
  }), E.subscribe(function(A) {
    A.type === "checkbox:change" && (e["suppress-author"] = A.detail.checked);
  }), i;
};
K.prototype._buildSelectedElement = function(e) {
  var t = this, i = document.createElement("div");
  i.classList.add("selDoc"), i.setAttribute("data-id", String(e.id));
  var n = document.createElement("span");
  e.author && e.author.length > 0 ? n.textContent = e.author.map(function(a) {
    return a.family + ", " + a.given;
  }).join("; ") : n.textContent = e.title, e.issued && e.issued["date-parts"] && (n.textContent += " " + e.issued["date-parts"][0].join("-")), n.setAttribute("title", n.textContent), i.appendChild(n);
  var s = document.createElement("span");
  s.className = "selDoc-move", s.textContent = "▲", s.title = b("Move up"), s.onclick = function() {
    t._moveItem(e.id, -1);
  }, i.appendChild(s);
  var r = document.createElement("span");
  r.className = "selDoc-move", r.textContent = "▼", r.title = b("Move down"), r.onclick = function() {
    t._moveItem(e.id, 1);
  }, i.appendChild(r);
  var o = document.createElement("span");
  return o.onclick = function() {
    t._removeSelected(e.id);
  }, o.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z" fill="currentColor" fill-opacity="0.8"/></svg>', i.appendChild(o), i;
};
K.prototype._addSelected = function(e, t) {
  var i = this._buildSelectedElement(e);
  this._items[e.id] = e, this._html[e.id] = i, this._checks[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
K.prototype._checkDocsScroll = function(e, t) {
  var i = this;
  if (this._fShouldLoadMore(e)) {
    if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
    this._loadTimeout = setTimeout(function() {
      i._fShouldLoadMore(e) && i._fLoadMore();
    }, 500);
  }
};
K.prototype._initScrollBox = function(e, t, i, n) {
  var s = {};
  return s.onscroll = this._checkScroll(e, t, i, n), e.onwheel = function(r) {
    e.scrollTop += r.deltaY > 10 || r.deltaY < -10 ? r.deltaY : r.deltaY * 20, s.onscroll();
  }, t.onmousedown = function(r) {
    t.classList.add("scrolling");
    var o = r.clientY, a = e.scrollTop;
    window.onmouseup = function(h) {
      t.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
    }, window.onmousemove = function(h) {
      var u = h.clientY - o, g = u / e.clientHeight, v = e.scrollHeight * g;
      e.scrollTop = a + v, s.onscroll();
    };
  }, document.body.addEventListener("resize", function() {
    s.onscroll();
  }), s;
};
K.prototype._checkScroll = function(e, t, i, n) {
  var s = this._displayNoneClass;
  return function() {
    if (e.scrollHeight <= e.clientHeight)
      t.classList.add(s);
    else {
      t.classList.remove(s);
      var r = e.clientHeight / e.scrollHeight * e.clientHeight;
      r = r < i ? i : r, t.style.height = r + "px";
      var o = e.scrollHeight - e.clientHeight, a = e.scrollTop / o, h = a * (e.clientHeight - r);
      t.style.marginTop = h + "px";
    }
    n && n(e, t);
  };
};
K.prototype._removeSelected = function(e) {
  var t = this._html[e];
  this._selectedHolder && this._selectedHolder.removeChild(t), delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
K.prototype._checkSelected = function() {
  var e = this.count();
  !this._selectedInfo || !this._selectedCount || !this._selectedWrapper || (e <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = e + " " + b("selected")), this._subscribers.forEach(function(t) {
    t(e);
  }));
};
K.prototype.count = function() {
  var e = 0;
  for (var t in this._items) e++;
  return e;
};
K.prototype.setEditMode = function(e) {
  this._editMode = e, this._selectedWrapper && (e ? this._selectedWrapper.classList.add("edit-mode") : this._selectedWrapper.classList.remove("edit-mode"));
};
K.prototype.addPreselectedItem = function(e) {
  this._items[e.id] = e;
  var t = this._buildSelectedElement(e);
  this._html[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(t);
  var i = this._buildDocElement(e);
  this._docsHolder && this._docsHolder.appendChild(i), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
};
K.prototype._moveItem = function(e, t) {
  var i = this._html[e];
  !i || !this._selectedHolder || (t === -1 && i.previousElementSibling ? this._selectedHolder.insertBefore(i, i.previousElementSibling) : t === 1 && i.nextElementSibling && i.nextElementSibling.after(i), this._selectedScroller.onscroll());
};
K.prototype.getSelectedItemsOrdered = function() {
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
  }, o, a, h, u = !1, g = null, v = null, y, w, k, I, E, A, H = new he("libLoader", b("Loading...")), z = {};
  function U() {
    var _ = document.getElementById("errorWrapper");
    if (!_)
      throw new Error("errorWrapper not found");
    var d = document.getElementById("mainState");
    if (!d)
      throw new Error("mainState not found");
    o = new We(), a = new K(e, gi, mi), y = new ee("saveAsTextBtn", {
      variant: "secondary"
    }), w = new ee("insertLinkBtn", {
      disabled: !0
    }), I = new ee("editCitationBtn", {
      variant: "secondary"
    }), k = new ee("settingsBtn", {
      variant: "icon-only",
      size: "small"
    }), E = new ee("insertBibBtn", {
      variant: "secondary"
    }), A = new ee("refreshBtn", {
      variant: "secondary"
    }), h = new ee("cancelEditBtn", {
      variant: "secondary"
    }), z = {
      error: _,
      mainState: d
    };
  }
  window.Asc.plugin.init = function() {
    he.show(), U(), t = new Ge(), i = new V();
    var _ = new pe(t, i);
    n = new D(t, e), s = new tn(n.getLocalesManager(), n.getStyleManager(), i);
    var d = !1;
    _i(), _.init().onOpen(function() {
      he.hide();
    }).onChangeState(function(f) {
      n.setDesktopApiAvailable(f.desktop), n.setRestApiAvailable(f.online);
    }).onAuthorized(function(f) {
      if (!d) {
        d = !0, he.show();
        var L = te().catch((x) => {
          console.error(x), Y(b("An error occurred while loading library groups. Try restarting the plugin."));
        }), m = wi(n.getStyleManager()).catch((x) => console.error("Failed to read document prefs:", x)).then(() => n.init()).catch((x) => {
          console.error(x), Y(b("An error occurred while loading settings. Try restarting the plugin.")), n.show();
        });
        Promise.all([L, m]).then(function() {
          return he.hide(), G();
        }).finally(function() {
          he.hide();
        });
      }
    }), window.Asc.plugin.onTranslate = vi, Si().then((f) => {
      window.Asc.scope.editorVersion = f, xi();
    }).catch((f) => {
      console.error(f);
    });
  };
  function G() {
    H.show();
    var _ = i.getItems(null).then((d) => (delete d.next, d));
    return Ke(_, !1).then((d) => {
      d > 0 ? Xe("started") : Xe("empty");
    }).catch((d) => {
      console.error(d);
    }).finally(() => {
      H.hide();
    });
  }
  function te() {
    return i.getUserGroups().then(function(_) {
      return o.addGroups(_), _;
    });
  }
  function _i() {
    a.subscribe(Qe);
    function _(d, f, L) {
      a.clearLibrary();
      var m = [];
      return i.getUserGroups().then(function(x) {
        var T = f.filter(function(ie) {
          return ie !== "my_library" && ie !== "group_libraries";
        });
        f.indexOf("my_library") !== -1 && m.push(Ke(i.getItems(d), !1));
        for (var oe = 0; oe < T.length; oe++)
          m.push(Ke(i.getGroupItems(d, T[oe]), !0));
        return r.text = d, r.obj = null, r.groups = [], r.groupsHash = L, m;
      });
    }
    o.subscribe(function(d, f) {
      d = d.trim();
      var L = f.join(",");
      z.mainState.classList.contains(e) || !d || d == r.text && L === r.groupsHash || f.length === 0 || _(d, f, L).catch(() => []).then(function(m) {
        return m.length && (H.show(), Promise.any(m).then(function() {
          H.hide();
        }).finally(function() {
          H.hide();
        })), Promise.allSettled(m);
      }).then(function(m) {
        var x = 0;
        m.forEach(function(T) {
          T.status === "fulfilled" && (x += T.value);
        }), x === 0 ? (Xe("empty"), a.displayNothingFound()) : Xe("not-empty");
      });
    }), I.subscribe(/* @__PURE__ */ (function() {
      var d = O(function* (f) {
        f.type === "button:click" && (yield Wt());
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), h.subscribe(function(d) {
      d.type === "button:click" && Kt();
    }), A.subscribe(/* @__PURE__ */ (function() {
      var d = O(function* (f) {
        if (f.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            Y(b("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            Y(b("Language is not selected"));
            return;
          }
          yield Te(!0, "Zotero (" + b("Updating citations") + ")");
          var L = s.updateCslItems.bind(s, !1), m = n.getStyleManager();
          m.getLastUsedFormat() === "note" && (L = s.updateCslItemsInNotes.bind(s, m.getLastUsedNotesStyle())), L().catch(function(x) {
            console.error(x);
            var T = b("Failed to refresh");
            typeof x == "string" && (T += ". " + b(x)), Y(T);
          }).finally(function() {
            Me(!1, "Zotero (" + b("Updating citations") + ")");
          });
        }
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), E.subscribe(/* @__PURE__ */ (function() {
      var d = O(function* (f) {
        if (f.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            Y(b("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            Y(b("Language is not selected"));
            return;
          }
          yield Te(!1, "Zotero (" + b("Inserting bibliography") + ")");
          var L = "";
          s.insertBibliography().then(function(m) {
            L = m;
          }).catch(function(m) {
            if (console.error(m), s.showWarningMessage("Failed to insert bibliography"), typeof m == "string") {
              var x = b(m);
              Y(x);
            }
          }).finally(function() {
            Me(!1, "Zotero (" + b("Inserting bibliography") + ")"), L && s.moveCursorOutsideField(L);
          });
        }
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), w.subscribe(/* @__PURE__ */ (function() {
      var d = O(function* (f) {
        if (f.type === "button:click") {
          if (!n.getLastUsedStyleId()) {
            Y(b("Style is not selected"));
            return;
          }
          if (!n.getLocale()) {
            Y(b("Language is not selected"));
            return;
          }
          if (u) {
            var L = a.getSelectedItemsOrdered();
            if (L.length === 0) {
              Y(b("No citations selected"));
              return;
            }
            var m = L.map(function(B) {
              var j = v.citationItems.find(function(Se) {
                return Se.id === B.id || Se.itemData && Se.itemData.id === B.id;
              });
              if (j)
                return j.prefix = B.prefix || "", j.suffix = B.suffix || "", j.locator = B.locator || "", j.label = B.label || "page", j["suppress-author"] = !!B["suppress-author"], j;
              var X = {
                id: B.id,
                itemData: Object.assign({}, B),
                uris: B.uris || []
              };
              return delete X.itemData.prefix, delete X.itemData.suffix, delete X.itemData.locator, delete X.itemData.label, delete X.itemData["suppress-author"], delete X.itemData.uris, X.prefix = B.prefix || "", X.suffix = B.suffix || "", X.locator = B.locator || "", X.label = B.label || "page", X["suppress-author"] = !!B["suppress-author"], X;
            }), x = JSON.parse(JSON.stringify(v));
            x.citationItems = m;
            var T = g;
            Kt(), yield Te(!1, "Zotero (" + b("Updating citations") + ")");
            var oe = s.updateItem.bind(s, x), ie = n.getStyleManager();
            ie.getLastUsedFormat() === "note" && (oe = s.updateItem.bind(s, x, ie.getLastUsedNotesStyle())), oe().catch(function(B) {
              console.error(B);
              var j = b("Failed to update citation");
              typeof B == "string" && (j += ". " + b(B)), Y(j);
            }).finally(function() {
              Me(!1, "Zotero (" + b("Updating citations") + ")"), T && s.moveCursorOutsideField(T.FieldId);
            });
            return;
          }
          yield Te(!0, "Zotero (" + b("Inserting citation") + ")");
          var ye = a.getSelectedItems(), be = null, we = !1;
          return s.insertSelectedCitations(ye).then(function(B) {
            return we = B, a.removeItems(Object.keys(ye)), s.getCurrentField();
          }).then(function(B) {
            return be = B, we ? s.updateCslItems(!1) : s.updateCslItems();
          }).catch(function(B) {
            console.error(B);
            var j = b("Failed to insert citation");
            typeof B == "string" && (j += ". " + b(B)), Y(j);
          }).finally(/* @__PURE__ */ O(function* () {
            Me(!1, "Zotero (" + b("Inserting citation") + ")"), we ? yield s.moveCursorRight() : be && (yield s.moveCursorOutsideField(be.FieldId));
          }));
        }
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), k.subscribe(function(d) {
      d.type === "button:click" && n.show();
    }), y.subscribe(/* @__PURE__ */ (function() {
      var d = O(function* (f) {
        f.type === "button:click" && (yield Te(!1, "Zotero (" + b("Saving as text") + ")"), s.saveAsText().then(function() {
          Me(!1, "Zotero (" + b("Saving as text") + ")");
        }));
      });
      return function(f) {
        return d.apply(this, arguments);
      };
    })()), n.onChangeState(/* @__PURE__ */ (function() {
      var d = O(function* (f, L) {
        yield Te(!0, "Zotero (" + b("Updating citations") + ")");
        var m = s.updateCslItems.bind(s, !0);
        [f.styleFormat, L.styleFormat].includes("note") && (f.styleFormat !== L.styleFormat ? f.styleFormat === "note" ? m = s.switchingBetweenNotesAndText.bind(s, f.notesStyle) : m = s.switchingBetweenNotesAndText.bind(s) : f.notesStyle !== L.notesStyle ? m = s.convertNotesStyle.bind(s, f.notesStyle) : m = s.updateCslItems.bind(s, !0)), m().catch(function(x) {
          console.error(x);
          var T = b("Failed to refresh");
          typeof x == "string" && (T += ". " + b(x)), Y(T);
        }).finally(function() {
          Me(!1, "Zotero (" + b("Updating citations") + ")");
        });
      });
      return function(f, L) {
        return d.apply(this, arguments);
      };
    })());
  }
  Asc.plugin.onThemeChanged = function(_) {
    window.Asc.plugin.onThemeChangedBase(_), Dt.fixThemeForIE(_), Dt.addStylesForComponents(_);
    var d = "";
    d += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + ` !important;}
`, d += ".doc { border-color: " + _["border-regular-control"] + "; background-color: " + _["background-normal"] + `; }
`, d += ".scrollThumb { box-shadow: 0 0 8px 8px " + _["highlight-button-hover"] + ` inset; }
`, d += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + _["canvas-scroll-thumb-pressed"] + ` inset; }
`, d += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + _["canvas-scroll-thumb-hover"] + ` inset; }
`, (["theme-white", "theme-night"].indexOf(_.name) !== -1 || ["theme-white", "theme-night"].indexOf(_.Name) !== -1) && (d += `.doc { border-radius: 4px; }
`);
    var f = document.getElementById("pluginStyles");
    f ? f.innerHTML = d : (f = document.createElement("style"), f.id = "pluginStyles", f.innerHTML = d, document.getElementsByTagName("head")[0].appendChild(f));
    var L = _.type || "light", m = document.body;
    m.classList.remove("theme-dark"), m.classList.remove("theme-light"), m.classList.add("theme-" + L);
  };
  function vi() {
    for (var _ = document.getElementsByClassName("i18n"), d = function() {
      var m = _[f];
      if (!(m instanceof HTMLElement)) return 1;
      ["placeholder", "title"].forEach((T) => {
        m.hasAttribute(T) && m.setAttribute(T, b(m.getAttribute(T) || ""));
      });
      var x = b(m.innerText.trim().replace(/\s+/g, " "));
      x && (m.innerText = x);
    }, f = 0; f < _.length; f++)
      d();
  }
  function Y(_) {
    _ && typeof _ == "string" ? (b(""), z.error.classList.remove(e), z.error.textContent = _, setTimeout(function() {
      window.onclick = function() {
        Y(!1);
      };
    }, 100)) : (z.error.classList.add(e), z.error.textContent = "", window.onclick = null);
  }
  function Te(_, d) {
    return dt.apply(this, arguments);
  }
  function dt() {
    return dt = O(function* (_, d) {
      E.disable(), A.disable(), w.disable(), I.disable();
      var f = window.Asc.scope.editorVersion;
      f && f < 9004e3 ? window._cursorPosition = yield ri.getCursorPosition() : yield new Promise((L) => {
        Asc.plugin.executeMethod("StartAction", ["GroupActions", {
          lockScroll: !0,
          keepSelection: _
        }], L);
      });
    }), dt.apply(this, arguments);
  }
  function Me(_, d) {
    return ft.apply(this, arguments);
  }
  function ft() {
    return ft = O(function* (_, d) {
      E.enable(), A.enable(), I.enable(), Qe();
      var f = window.Asc.scope.editorVersion;
      f && f < 9004e3 ? ri.setCursorPosition(window._cursorPosition || 0) : yield new Promise((L) => {
        Asc.plugin.executeMethod("EndAction", ["GroupActions", {
          scrollToTarget: _
        }], L);
      });
    }), ft.apply(this, arguments);
  }
  function Xe(_) {
    var d = document.getElementById("searchLabel");
    if (!d) {
      console.error("Search label not found");
      return;
    }
    var f = d.querySelector(".when-empty"), L = d.querySelector(".when-not-empty"), m = d.querySelector(".when-started");
    if (!f || !L || !m) {
      console.error("Search label elements not found");
      return;
    }
    switch (f.classList.add("hidden"), L.classList.add("hidden"), m.classList.add("hidden"), _) {
      case "empty":
        f.classList.remove("hidden");
        break;
      case "not-empty":
        L.classList.remove("hidden");
        break;
      case "started":
        L.classList.remove("hidden"), m.classList.remove("hidden");
        break;
    }
  }
  function gi() {
    console.warn("Loading more..."), r.obj && r.obj.next && Ke(r.obj.next(), !1);
    for (var _ = 0; _ < r.groups.length && r.groups[_].next; _++)
      Ke(i.getGroupItems(r.groups[_].next(), r.groups[_].id), !0);
  }
  function mi(_) {
    if (t.getRoute() != "main" || _.scrollTop + _.clientHeight < _.scrollHeight)
      return !1;
    var d = !0;
    return r.groups.forEach(function(f) {
      f.next && (d = !1);
    }), !(!r.obj || !r.obj.next || !d || !r.obj && !r.text.trim() && !r.groups.length);
  }
  function Ke(_, d) {
    return _.then(function(f) {
      return Gt(f, null, d);
    }).catch(function(f) {
      return console.error(f), f.message && Y(b(f.message)), Gt(null, f, d);
    }).then(function(f) {
      return f;
    });
  }
  function Gt(_, d, f) {
    var L = !1;
    !r.obj && _ && _.items && !_.items.length && (L = !0), d ? (L && (r.obj = null, r.groups = []), r && r.obj && delete r.obj.next) : f && _ && _.next ? r.groups.push(_) : r.obj = _ && _.items.length ? _ : null;
    var m = function(T) {
      if (!T.id) return T;
      var oe = T.id.indexOf("/") + 1, ie = T.id.lastIndexOf("/") + 1, ye = T.id.indexOf("http");
      return oe !== ie && ye === 0 && (T.uris || (T.uris = []), T.uris.push(T.id)), ie && (T.id = T.id.substring(ie)), T;
    };
    return _ && _.items && _.items.length > 0 && (_.items = _.items.map((x) => (x = bi(x), x[f ? "groupID" : "userID"] = _.id, m(x), x))), a.displaySearchItems(_, d, r);
  }
  var yi = {
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
  function bi(_) {
    if (_.id || !_.key) return _;
    var d = _.data || {}, f = {
      id: _.key,
      title: d.title || "",
      type: yi[d.itemType] || d.itemType || ""
    };
    if (Array.isArray(d.creators) && d.creators.forEach(function(m) {
      var x = {};
      m.firstName && (x.given = m.firstName), m.lastName && (x.family = m.lastName), m.name && (x.literal = m.name);
      var T = m.creatorType || "author";
      f[T] || (f[T] = []), f[T].push(x);
    }), d.date) {
      var L = d.date.replace(/\//g, "-").split("-").map(Number).filter(function(m) {
        return !isNaN(m);
      });
      L.length && (f.issued = {
        "date-parts": [L]
      });
    }
    return d.url && (f.URL = d.url), d.volume && (f.volume = d.volume), d.issue && (f.issue = d.issue), d.pages && (f.page = d.pages), d.edition && (f.edition = d.edition), d.language && (f.language = d.language), d.abstractNote && (f.abstract = d.abstractNote), d.note && (f.note = d.note), d.shortTitle && (f.shortTitle = d.shortTitle), d.publisher && (f.publisher = d.publisher), d.place && (f["publisher-place"] = d.place), d.DOI && (f.DOI = d.DOI), d.ISBN && (f.ISBN = d.ISBN), d.ISSN && (f.ISSN = d.ISSN), d.publicationTitle && (f["container-title"] = d.publicationTitle), d.bookTitle && (f["container-title"] = d.bookTitle), d.series && (f["collection-title"] = d.series), d.seriesNumber && (f["collection-number"] = d.seriesNumber), d.numberOfVolumes && (f["number-of-volumes"] = d.numberOfVolumes), d.numPages && (f["number-of-pages"] = d.numPages), _.links && (f.uris = [], _.links.self && f.uris.push(_.links.self.href), _.links.alternate && f.uris.push(_.links.alternate.href)), f;
  }
  function Qe(_) {
    if (typeof _ > "u" && (_ = a.count()), u) {
      _ <= 0 ? (w.disable(), w.setText(b("Update Citation"))) : (w.enable(), w.setText(b("Update Citation")));
      return;
    }
    _ <= 0 ? (w.disable(), w.setText(b("Insert Citation"))) : (w.enable(), _ > 1 ? w.setText(b("Insert " + _ + " Citations")) : w.setText(b("Insert Citation")));
  }
  function Wt() {
    return pt.apply(this, arguments);
  }
  function pt() {
    return pt = O(function* () {
      var _ = yield new Promise((m) => {
        window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, m);
      });
      if (!_ || !_.Value || _.Value.toLowerCase().indexOf("zotero_item") === -1) {
        s.showWarningMessage(b("No Zotero citation found at the cursor. Please click directly on a citation to edit it."));
        return;
      }
      var d = _.Value.indexOf("{"), f = _.Value.lastIndexOf("}");
      if (d === -1) {
        s.showWarningMessage(b("Could not parse the citation data."));
        return;
      }
      var L = JSON.parse(_.Value.slice(d, f + 1));
      a.removeItems(Object.keys(a.getSelectedItems())), a.clearLibrary(), u = !0, g = _, v = L, a.setEditMode(!0), L.citationItems && L.citationItems.forEach(function(m) {
        var x = Object.assign({}, m.itemData || {});
        !x.id && m.id && (x.id = m.id), m.uris && (x.uris = m.uris), m.prefix && (x.prefix = m.prefix), m.suffix && (x.suffix = m.suffix), m.locator && (x.locator = m.locator), m.label && (x.label = m.label), m["suppress-author"] && (x["suppress-author"] = m["suppress-author"]), a.addPreselectedItem(x);
      }), h._container.classList.remove("hidden"), I._container.classList.add("hidden"), E._container.classList.add("hidden"), A._container.classList.add("hidden"), w.setText(b("Update Citation")), w.enable(), Qe();
    }), pt.apply(this, arguments);
  }
  function Kt() {
    u = !1, g = null, v = null, a.setEditMode(!1), a.removeItems(Object.keys(a.getSelectedItems())), a.clearLibrary(), h._container.classList.add("hidden"), I._container.classList.remove("hidden"), E._container.classList.remove("hidden"), A._container.classList.remove("hidden"), w.setText(b("Insert Citation")), w.disable(), Qe(), G();
  }
  function wi(_) {
    return _t.apply(this, arguments);
  }
  function _t() {
    return _t = O(function* (_) {
      if (!_.getLastUsedStyleId()) {
        var d = yield new Promise((be) => {
          Asc.plugin.callCommand(() => {
            var we = Api.GetDocument(), B = we.GetCustomProperties();
            if (!B) return "";
            for (var j = "", X = 1; ; ) {
              var Se = B.Get("ZOTERO_PREF_" + X);
              if (Se == null) break;
              j += String(Se), X++;
            }
            return j;
          }, !1, !0, (we) => be(we || ""));
        });
        if (d)
          try {
            var f = new DOMParser(), L = f.parseFromString(d, "text/xml"), m = L.querySelector("style");
            if (m) {
              var x = m.getAttribute("id") || "", T = m.getAttribute("locale") || "";
              if (x) {
                var oe = x.replace(/^.*\/styles\//, "");
                oe && localStorage.setItem("zoteroStyleId", oe);
              }
              T && localStorage.setItem("zoteroLocale", T);
            }
            var ie = L.querySelector('pref[name="noteType"]');
            if (ie) {
              var ye = ie.getAttribute("value");
              ye === "1" ? localStorage.setItem("zoteroNotesStyleId", "footnotes") : ye === "2" && localStorage.setItem("zoteroNotesStyleId", "endnotes");
            }
          } catch (be) {
            console.error("Failed to parse ZOTERO_PREF XML:", be);
          }
      }
    }), _t.apply(this, arguments);
  }
  function Si() {
    return vt.apply(this, arguments);
  }
  function vt() {
    return vt = O(function* () {
      try {
        var _ = yield new Promise((f) => {
          Asc.plugin.executeMethod("GetVersion", [], f);
        });
        _ == "develop" && (_ = "99.99.99");
        for (var d = _.split("."); 3 > d.length; ) d.push("0");
        return 1e6 * parseInt(d[0]) + 1e3 * parseInt(d[1]) + parseInt(d[2]);
      } catch (f) {
        return console.error(f), 99999999;
      }
    }), vt.apply(this, arguments);
  }
  function xi() {
    var _ = new Asc.ButtonContextMenu();
    _.text = "Edit citation", _.addCheckers("Target", "Selection"), _.attachOnClick(/* @__PURE__ */ O(function* () {
      t.openMain(), yield Wt();
    })), Asc.Buttons.registerContextMenu();
  }
})();
//# sourceMappingURL=bundle.modern.js.map
