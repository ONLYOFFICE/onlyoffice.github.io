/*
 * (c) Copyright Ascensio System SIA 2010-2026
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
//#region \0rollupPluginBabelHelpers.js
function e(e, t) {
	this.v = e, this.k = t;
}
function t(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function n(e) {
	if (Array.isArray(e)) return e;
}
function r(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function i(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function a(e) {
	return function() {
		var t = this, n = arguments;
		return new Promise(function(r, a) {
			var o = e.apply(t, n);
			function s(e) {
				i(o, r, a, s, c, "next", e);
			}
			function c(e) {
				i(o, r, a, s, c, "throw", e);
			}
			s(void 0);
		});
	};
}
function o(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function s(e, t) {
	return e.get(r(e, t));
}
function c(e, t, n) {
	o(e, t), t.set(e, n);
}
function l(e, t, n) {
	return e.set(r(e, t), n), n;
}
function u(e, t) {
	o(e, t), t.add(e);
}
function d(e, t, n) {
	return (t = v(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function f(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function p() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function m(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function h(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? m(Object(n), !0).forEach(function(t) {
			d(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function g(e, t) {
	return n(e) || f(e, t) || ee(e, t) || p();
}
function _(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function v(e) {
	var t = _(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ee(e, n) {
	if (e) {
		if (typeof e == "string") return t(e, n);
		var r = {}.toString.call(e).slice(8, -1);
		return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? t(e, n) : void 0;
	}
}
function y(t) {
	var n, r;
	function i(n, r) {
		try {
			var o = t[n](r), s = o.value, c = s instanceof e;
			Promise.resolve(c ? s.v : s).then(function(e) {
				if (c) {
					var r = n === "return" && s.k ? n : "next";
					if (!s.k || e.done) return i(r, e);
					e = t[r](e).value;
				}
				a(!!o.done, e);
			}, function(e) {
				i("throw", e);
			});
		} catch (e) {
			a(2, e);
		}
	}
	function a(e, t) {
		e === 2 ? n.reject(t) : n.resolve({
			value: t,
			done: e
		}), (n = n.next) ? i(n.key, n.arg) : r = null;
	}
	this._invoke = function(e, t) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: t,
				resolve: a,
				reject: o,
				next: null
			};
			r ? r = r.next = s : (n = r = s, i(e, t));
		});
	}, typeof t.return != "function" && (this.return = void 0);
}
y.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, y.prototype.next = function(e) {
	return this._invoke("next", e);
}, y.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, y.prototype.return = function(e) {
	return this._invoke("return", e);
};
//#endregion
//#region src/app/theme.js
var te = {
	addStylesForComponents: function(e) {
		var t = "";
		e["background-toolbar"] && (t += ".loader-body,\n.loader-bg { background-color: " + e["background-toolbar"] + "; }\n", t += ".loader-body {     box-shadow: 0 0 99px 99px " + e["background-toolbar"] + "; }\n"), e["background-loader"] && (t += ".loader-image { color: " + e["background-loader"] + "; }\n"), e["background-normal"] && (t += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n.message { background-color: " + e["background-normal"] + "; }\n"), e["text-inverse"] && (t += ".custom-button-primary { color: " + e["text-inverse"] + "; }\n"), e["border-regular-control"] && (t += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n.message { border-color: " + e["border-regular-control"] + "; }\n", t += ".selectbox-search,\n.selectbox-option-divider { border-color: " + e["border-regular-control"] + " !important; }\n"), e["border-error"] && (t += ".input-field-invalid .input-field-element { border-color: " + e["border-error"] + "; }\n"), e["border-control-focus"] && (t += ".custom-button-icon-only:focus:not(:active):not(:hover),\n.custom-button-secondary-icon:focus:not(:active):not(:hover),\n.custom-button-secondary:focus:not(:active):not(:hover),\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus,\n.selectbox-header-open { border-color: " + e["border-control-focus"] + "; }\n"), e["highlight-button-hover"] && (t += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + e["highlight-button-hover"] + "; }\n"), e["highlight-button-pressed"] && (t += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + e["highlight-button-pressed"] + "; }\n", t += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + e["highlight-button-pressed"] + "; }\n"), e["highlight-primary-dialog-button-hover"] && (t += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + e["highlight-primary-dialog-button-hover"] + "; border-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n"), e["background-primary-dialog-button"] && (t += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + e["background-primary-dialog-button"] + "; border-color: " + e["background-primary-dialog-button"] + "; }\n"), e["background-toolbar-additional"] && (t += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + e["background-toolbar-additional"] + "; border-color: " + e["background-toolbar-additional"] + "; }\n"), e["text-normal"] && (t += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + e["text-normal"] + "; }\n", t += ".input-field-search-icon svg { fill: " + e["text-normal"] + "; }\n", t += ".selectbox-arrow b { border-color: " + e["text-normal"] + "; }\n"), e["text-secondary"] && (t += ".message-close:hover,\n.input-field-clear:hover { color: " + e["text-secondary"] + "; }\n"), e["text-tertiary"] && (t += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + e["text-tertiary"] + "; }\n");
		var n = "11px";
		["theme-white", "theme-night"].indexOf(e.name) !== -1 || ["theme-white", "theme-night"].indexOf(e.Name) !== -1 ? (n = "12px", t += ".message,\n.custom-button,\n.selectbox-header,\n.input-field-element { border-radius: 4px; }\n", t += ".radio--checked .radio-visual { border-width: 4px; }\n", t += ".checkbox-checkmark { color: " + e["text-inverse"] + "; }\n", t += ".checkbox--checked .checkbox-visual { background-color: " + e["background-primary-dialog-button"] + "; }\n", t += ".radio--checked .radio-visual,\n.checkbox--checked .checkbox-visual { border-color: " + e["background-primary-dialog-button"] + "; }\n", t += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + e["highlight-button-hover"] + "; }\n", t += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + e["highlight-primary-dialog-button-hover"] + "; background-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n", t += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n", t += "body { font-size: 12px; }\n") : (t += ".checkbox-checkmark { color: " + e["text-normal"] + "; }\n", t += ".radio--checked .radio-visual { background-color: " + e["text-normal"] + ";\n box-shadow: 0 0 0 2px" + e["background-normal"] + " inset; }\n", t += ".radio-button-container:hover .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + e["border-control-focus"] + "; }\n"), t += "body, input, textarea, select, button { font-size: " + n + "; }\n";
		var r = document.getElementById("componentsStyles");
		return r ? (r.innerHTML = t, t) : (r = document.createElement("style"), r.id = "componentsStyles", r.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(r), t);
	},
	fixThemeForIE: function(e) {
		return e["background-toolbar"] ||= "#f7f7f7", e["text-normal"] ||= "rgb(51, 51, 51)", e["text-secondary"] ||= "#848484", e["highlight-button-hover"] ||= "#e0e0e0", e["background-normal"] ||= "white", e["background-loader"] ||= "rgba(24, 24, 24, 0.9)", e["highlight-button-pressed"] ||= "#cbcbcb", e["text-inverse"] ||= "white", e["border-regular-control"] ||= "#c0c0c0", e["border-error"] ||= "#f62211", e["border-control-focus"] ||= "#848484", e["highlight-primary-dialog-button-hover"] ||= "#1c1c1c", e["background-primary-dialog-button"] ||= "#444444", e["background-toolbar-additional"] ||= "#efefef", e["text-tertiary"] ||= "#bdbdbd", e;
	}
};
//#endregion
//#region src/app/router.js
function b() {
	this._states = [
		"mainState",
		"loginState",
		"settingsState"
	], this._routes = [
		"main",
		"login",
		"settings"
	], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
		var t = document.getElementById(e);
		if (!t) throw Error(`container ${e} not found`);
		return t;
	});
}
b.prototype.getRoute = function() {
	return this._currentRoute;
}, b.prototype._setCurrentRoute = function(e) {
	this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
}, b.prototype.openMain = function() {
	this._setCurrentRoute("main");
}, b.prototype.openLogin = function() {
	this._setCurrentRoute("login");
}, b.prototype.openSettings = function() {
	this._setCurrentRoute("settings");
};
//#endregion
//#region src/app/zotero/zotero-environment.js
var ne = {
	restApiUrl: "https://api.zotero.org/",
	desktopApiUrl: "http://127.0.0.1:23119/api/"
}, x = {
	_done: !1,
	_desktop: !1,
	_hasPermission: !0,
	_online: !1,
	_hasKey: !1,
	_timeout: 1e3,
	_callback: function(e) {},
	_desktopVersion: function() {
		if (window.navigator && window.navigator.userAgent.toLowerCase().indexOf("ascdesktopeditor") < 0) return !1;
		if (window.location && window.location.protocol == "file:") return !0;
		var e = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
		return !!(e && e.indexOf("file:///") == 0);
	}(),
	runApisChecker: function(e) {
		var t = this;
		t._done = !1;
		function n() {
			t._done || t._checkApiAvailable(e).then(function(e) {
				t._done || ((e.online && e.hasKey || e.desktop && e.hasPermission) && (t._done = !0), t._callback(e), setTimeout(n, t._timeout));
			});
		}
		return n(), {
			subscribe: function(e) {
				t._callback = e;
			},
			unsubscribe: function() {
				t._done = !0, t._callback = function() {};
			}
		};
	},
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
	_checkApiAvailable: function(e) {
		var t = this;
		return Promise.all([fetch(ne.restApiUrl, {
			method: "GET",
			cache: "no-cache"
		}).then(function(e) {
			return e.status === 200;
		}).catch(function() {
			return !1;
		}), t._sendDesktopRequest(ne.desktopApiUrl).then(function(e) {
			return t._hasPermission = e.hasPermission, e.isZoteroRunning;
		}).catch(function() {
			return !1;
		})]).then(function(n) {
			return t._online = n[0], t._desktop = n[1], t._hasKey = e.hasSettings(), {
				online: t._online,
				hasKey: t._hasKey,
				desktop: t._desktop,
				hasPermission: t._hasPermission,
				desktopVersion: t._desktopVersion
			};
		});
	},
	_sendDesktopRequest: function(e) {
		var t = this;
		return new Promise(function(n, r) {
			if (!t._desktopVersion) {
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
				complete: function(e) {
					var t = !1, r = !1;
					e.responseStatus == 403 ? (t = !1, r = !0) : e.responseStatus === 200 && (r = !0, t = !0), n({
						hasPermission: t,
						isZoteroRunning: r
					});
				},
				error: function(e) {
					e.statusCode == -102 && (e.statusCode = 404), r(e);
				}
			});
		});
	}
}, S = /*#__PURE__*/ new WeakMap(), re = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), ie = /*#__PURE__*/ new WeakMap(), ae = /*#__PURE__*/ new WeakMap(), oe = /*#__PURE__*/ new WeakMap(), se = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), ce = /*#__PURE__*/ new WeakMap(), le = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakSet(), ue = class {
	constructor() {
		var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		u(this, T), c(this, S, void 0), c(this, re, void 0), c(this, C, void 0), c(this, ie, void 0), c(this, ae, void 0), c(this, oe, void 0), c(this, se, void 0), c(this, w, void 0), c(this, ce, void 0), c(this, le, void 0), l(S, this, e.maxRetries || 5), l(re, this, e.initialDelay || 1e3), l(C, this, e.maxDelay || 5e3), l(ie, this, e.backoffFactor || 2), l(ae, this, e.retryOn || [
			429,
			502,
			503,
			504
		]), l(oe, this, 10), l(se, this, 5e3), l(w, this, []), l(ce, this, 0), l(le, this, 0);
	}
	fetchWithRetry(e, t, n) {
		var i = this;
		return a(function* () {
			try {
				yield r(T, i, fe).call(i);
				var a = yield fetch(e, { headers: t });
				if (a.ok) return a;
				if (s(ae, i).includes(a.status) && n < s(S, i)) {
					var o = r(T, i, me).call(i, n, a);
					return console.log(`Attempt ${n + 1}/${s(S, i)} failed with ${a.status}. Retrying in ${o}ms`), yield r(T, i, he).call(i, o), i.fetchWithRetry(e, t, n + 1);
				}
				throw Error(`${a.status} ${a.statusText}`);
			} catch (a) {
				if (n >= s(S, i)) {
					var c = "";
					throw a instanceof Error && (c = a.message), Error(`Request failed after ${s(S, i)} attempts: ${c}`);
				}
				if (n < s(S, i)) {
					var l = r(T, i, me).call(i, n);
					return console.log(`Network error on attempt ${n + 1}. Retrying in ${l}ms`), yield r(T, i, he).call(i, l), i.fetchWithRetry(e, t, n + 1);
				}
				throw a;
			}
		})();
	}
	resetCounter() {
		l(w, this, []), l(ce, this, 0), l(le, this, 0);
	}
};
function de() {
	var e = Date.now();
	l(w, this, s(w, this).filter((t) => e - t < s(se, this)));
}
function fe() {
	return pe.apply(this, arguments);
}
function pe() {
	return pe = a(function* () {
		var e;
		if (r(T, this, de).call(this), s(w, this).length >= s(oe, this)) {
			var t = s(w, this)[0];
			if (Date.now() - t < s(se, this)) {
				var n = 500 * s(w, this).length - s(oe, this);
				n < 0 && (n = 0, console.warn("Wait time is less than 0")), console.log(`Rate limit prevention: ${s(w, this).length} requests in last ${s(se, this)}ms. Waiting ${n}ms...`), yield r(T, this, he).call(this, n), r(T, this, de).call(this);
			}
		}
		s(w, this).push(Date.now()), l(ce, this, (e = s(ce, this), e++, e));
		var i = Date.now() - s(le, this), a = 100;
		i < a && s(le, this) > 0 && (yield r(T, this, he).call(this, a - i)), l(le, this, Date.now());
	}), pe.apply(this, arguments);
}
function me(e) {
	var t = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null)?.headers.get("Retry-After");
	if (t) {
		var n = parseInt(t);
		if (n > 86400) {
			var r = parseInt(t) * 1e3;
			return Math.max(0, r - Date.now());
		}
		return n * 1e3;
	}
	var i = s(re, this) * s(ie, this) ** +e, a = Math.random() * 1e3;
	return Math.min(i + a, s(C, this));
}
function he(e) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region src/app/zotero/zotero.js
var E = function() {
	this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = !0, this._fetcher = new ue({
		maxRetries: 5,
		initialDelay: 5e3
	});
};
E.prototype.ZOTERO_API_VERSION = "3", E.prototype.USER_AGENT = "AscDesktopEditor", E.prototype.DEFAULT_FORMAT = "csljson", E.prototype.STORAGE_KEYS = {
	USER_ID: "zoteroUserId",
	API_KEY: "zoteroApiKey"
}, E.prototype.API_PATHS = {
	USERS: "users",
	GROUPS: "groups",
	ITEMS: "items",
	KEYS: "keys"
}, E.prototype._getBaseUrl = function() {
	return this._isOnlineAvailable ? ne.restApiUrl : ne.desktopApiUrl;
}, E.prototype._getDesktopRequest = function(e) {
	var t = this;
	return new Promise(function(n, r) {
		window.AscSimpleRequest.createRequest({
			url: e,
			method: "GET",
			headers: {
				"Zotero-API-Version": t.ZOTERO_API_VERSION,
				"User-Agent": t.USER_AGENT
			},
			complete: n,
			error: function(e) {
				e.statusCode === -102 && (e.statusCode = 404, e.message = "Connection to Zotero failed. Make sure Zotero is running"), r(e);
			}
		});
	});
}, E.prototype._getOnlineRequest = function(e) {
	var t = {
		"Zotero-API-Version": this.ZOTERO_API_VERSION,
		"Zotero-API-Key": this._apiKey || ""
	};
	return fetch(e, { headers: t }).then(function(e) {
		if (!e.ok) {
			var t = e.status + " " + e.statusText;
			throw console.error(t), Error(t);
		}
		return e;
	}).catch(function(e) {
		throw typeof e == "object" && (e.message = "Connection to Zotero failed"), e;
	});
}, E.prototype._getRequestWithOfflineSupport = function(e) {
	return this._isOnlineAvailable ? this._getOnlineRequest(e) : this._getDesktopRequest(e.href);
}, E.prototype._buildGetRequest = function(e, t) {
	t ||= {};
	var n = new URL(e, this._getBaseUrl());
	return Object.keys(t).forEach(function(e) {
		t[e] !== void 0 && t[e] !== null && n.searchParams.append(e, t[e]);
	}), this._getRequestWithOfflineSupport(n);
}, E.prototype._parseLinkHeader = function(e) {
	var t = {}, n = /<(.*?)>; rel="(.*?)"/g;
	if (!e) return t;
	for (var r; (r = n.exec(e.trim())) !== null;) t[r[2]] = r[1];
	return t;
}, E.prototype._parseDesktopItemsResponse = function(e, t) {
	return e.then(function(e) {
		return {
			items: JSON.parse(e.responseText),
			id: t
		};
	});
}, E.prototype._parseItemsResponse = function(e, t) {
	var n = this;
	return e.then(function(e) {
		return Promise.all([e.json(), e]);
	}).then(function(e) {
		var r = e[0], i = e[1], a = n._parseLinkHeader(i.headers.get("Link") || ""), o = {
			items: r,
			id: t
		};
		return typeof r == "object" && r.items && (o.items = r.items), a.next && (o.next = function() {
			return n._parseItemsResponse(n._getOnlineRequest(new URL(a.next)), t);
		}), o;
	});
}, E.prototype._parseResponse = function(e, t) {
	if (this._isOnlineAvailable) {
		var n = e;
		return this._parseItemsResponse(n, t);
	} else {
		var r = e;
		return this._parseDesktopItemsResponse(r, t);
	}
}, E.prototype.getItems = function(e, t, n) {
	var r = this;
	n ||= r.DEFAULT_FORMAT;
	var i = {
		format: n,
		itemType: "-attachment"
	};
	e ? i.q = e : t ? i.itemKey = t.join(",") : (i.limit = 20, this._isOnlineAvailable || (i.format = "json"));
	var a = r.API_PATHS.USERS + "/" + r._userId + "/" + r.API_PATHS.ITEMS, o = r._buildGetRequest(a, i);
	return r._parseResponse(o, r._userId);
}, E.prototype.getGroupItems = function(e, t, n, r) {
	var i = this;
	r ||= i.DEFAULT_FORMAT;
	var a = { format: r };
	e ? a.q = e : n && (a.itemKey = n.join(","));
	var o = i.API_PATHS.GROUPS + "/" + t + "/" + i.API_PATHS.ITEMS, s = i._buildGetRequest(o, a);
	return i._parseResponse(s, t);
}, E.prototype.getUserGroups = function() {
	var e = this;
	return new Promise(function(t, n) {
		if (e._userGroups.length > 0) {
			t(e._userGroups);
			return;
		}
		var r = e.API_PATHS.USERS + "/" + e._userId + "/groups";
		e._buildGetRequest(r).then(function(t) {
			if (e._isOnlineAvailable) {
				var n = t;
				if (!n.ok) throw Error(n.status + " " + n.statusText);
				return n.json();
			}
			return JSON.parse(t.responseText);
		}).then(function(n) {
			e._userGroups = n.map(function(e) {
				return {
					id: e.id,
					name: e.data.name
				};
			}), t(e._userGroups);
		}).catch(n);
	});
}, E.prototype.setApiKey = function(e) {
	var t = this, n = this.API_PATHS.KEYS + "/" + e;
	return this._buildGetRequest(n).then(function(e) {
		var t = e;
		if (!t.ok) throw Error(t.status + " " + t.statusText);
		return t.json();
	}).then(function(n) {
		return t._saveSettings(n.userID, e), !0;
	});
}, E.prototype._applySettings = function(e, t) {
	this._userId = e, this._apiKey = t;
}, E.prototype._saveSettings = function(e, t) {
	this._applySettings(e, t), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(e)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, t);
}, E.prototype.hasSettings = function() {
	var e = localStorage.getItem(this.STORAGE_KEYS.USER_ID), t = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
	return e && t ? (this._applySettings(Number(e), t), !0) : !1;
}, E.prototype.clearSettings = function() {
	localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
}, E.prototype.getUserId = function() {
	return this._userId;
}, E.prototype.setIsOnlineAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/shared/components/input.js
function ge(e, t) {
	var n = this;
	if (t ||= {}, typeof e == "string") {
		var r = document.getElementById(e);
		r instanceof HTMLInputElement && (e = r);
	}
	if (e instanceof HTMLInputElement) this.input = e;
	else throw Error("Invalid input element");
	for (var i in this._container = document.createElement("div"), this._options = {
		type: t.type || e.type || "text",
		placeholder: t.placeholder || e.placeholder || "",
		value: t.value || e.value || "",
		autofocus: t.autofocus || !1,
		disabled: t.disabled || !1,
		readonly: t.readonly || !1,
		required: t.required || !1,
		showCounter: t.showCounter || !1,
		showClear: t.showClear === void 0 ? !0 : t.showClear,
		autocomplete: t.autocomplete || "off"
	}, t) this._options.hasOwnProperty(i) || (this._options[i] = t[i]);
	this._id = e.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = !1, this.isValid = !0, this._validationMessage = "", this._subscribers = [], this._boundHandles = {
		focus: function(e) {
			n._handleFocus(e);
		},
		blur: function(e) {
			n._handleBlur(e);
		},
		input: function(e) {
			n._handleInput(e);
		},
		keydown: function(e) {
			n._handleKeydown(e);
		},
		clear: function() {
			n.clear();
		},
		validate: function() {
			n.validate();
		}
	}, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), this._options.type === "search" && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(function(e) {
		return function() {
			e.focus();
		};
	}(this), 100);
}
ge.prototype = {
	constructor: ge,
	input: null,
	_container: null,
	_options: {},
	_id: "",
	isFocused: !1,
	isValid: !0,
	_validationMessage: "",
	_subscribers: [],
	_boundHandles: null,
	_clearButton: null,
	_counter: null,
	_counterCurrent: null,
	_counterMax: null,
	_validationElement: null,
	_createDOM: function() {
		var e = this.input.parentNode, t = document.createDocumentFragment();
		t.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
		var n = document.createElement("div");
		this._container.appendChild(n), n.className += " input-field", this._options.disabled && (n.className += " input-field-disabled");
		var r = document.createElement("div");
		if (n.appendChild(r), r.className += " input-field-main", this.input.className += " input-field-element i18n", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = !0), this._options.readonly && (this.input.readOnly = !0), this._options.required && (this.input.required = !0), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
			this._counter = document.createElement("div"), n.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
			var i = document.createElement("span");
			i.textContent = "/", this._counter.appendChild(i), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
		}
		n.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z\" fill=\"currentColor\"/></svg>", r.appendChild(this._searchIcon)), e && e.insertBefore(t, this.input), r.appendChild(this.input);
	},
	_bindEvents: function() {
		this.input.addEventListener("focus", this._boundHandles.focus), this.input.addEventListener("blur", this._boundHandles.blur), this.input.addEventListener("input", this._boundHandles.input), this.input.addEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.addEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.addEventListener("click", this._boundHandles.search), this.input.addEventListener("change", this._boundHandles.validate);
	},
	_handleFocus: function(e) {
		this.isFocused = !0, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(e);
	},
	_handleBlur: function(e) {
		this.isFocused = !1;
		for (var t = this._container.className.split(" "), n = [], r = 0; r < t.length; r++) t[r] !== "input-field-focused" && n.push(t[r]);
		this._container.className = n.join(" "), this.validate(), this._triggerBlurEvent(e);
	},
	_handleInput: function(e) {
		this._updateClearButton(), this._updateCounter(), this._triggerInputEvent(e);
	},
	_handleKeydown: function(e) {
		var t = e.key || e.keyCode;
		(t === "Escape" || t === 27) && this._options.showClear && (this.clear(), e.preventDefault()), (t === "Enter" || t === 13) && this._triggerSubmit();
	},
	_updateClearButton: function() {
		if (this._clearButton) {
			var e = this.input.value.length > 0;
			this._clearButton.style.display = e ? "block" : "none";
		}
	},
	_updateCounter: function() {
		if (this._counter && this._options.maxLength) {
			var e = this.input.value.length, t = this._options.maxLength;
			if (this._counterCurrent && (this._counterCurrent.textContent = String(e)), this._counterMax && (this._counterMax.textContent = String(t)), e > t * .9) {
				var n = this._counter.className.split(" ");
				n.indexOf("input-field-counter-warning") === -1 && (this._counter.className += " input-field-counter-warning");
			} else this._counter.className = this._counter.className.split(" ").filter(function(e) {
				return e !== "input-field-counter-warning";
			}).join(" ");
			if (e > t) {
				var n = this._counter.className.split(" ");
				n.indexOf("input-field-counter-error") === -1 && (this._counter.className += " input-field-counter-error");
			} else this._counter.className = this._counter.className.split(" ").filter(function(e) {
				return e !== "input-field-counter-error";
			}).join(" ");
		}
	},
	validate: function() {
		if (!this._options.validation) return this.isValid = !0, !0;
		var e = this.input.value, t = !0, n = "";
		if (this._options.required && !e.trim() ? (t = !1, n = "This field is required") : this._options.minLength && e.length < this._options.minLength ? (t = !1, n = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && e.length > this._options.maxLength ? (t = !1, n = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(e) && (t = !1, n = "Invalid format"), t && typeof this._options.validation == "function") {
			var r = this._options.validation(e);
			r && !r.isValid && (t = !1, n = r.message || "Invalid value");
		}
		return this.isValid = t, this._validationMessage = n, this.updateValidationState(), t;
	},
	updateValidationState: function() {
		if (!this.isValid) {
			this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block";
			var e = this._container.className.split(" ");
			e.indexOf("input-field-invalid") === -1 && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(e) {
				return e !== "input-field-valid";
			}).join(" ");
		} else if (this.input.value.length > 0) {
			this._validationElement.style.display = "none";
			var e = this._container.className.split(" ");
			e.indexOf("input-field-valid") === -1 && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(e) {
				return e !== "input-field-invalid";
			}).join(" ");
		} else this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(e) {
			return e !== "input-field-valid" && e !== "input-field-invalid";
		}).join(" ");
	},
	_updateState: function() {
		this._updateClearButton(), this._updateCounter(), this.validate();
	},
	getValue: function() {
		return this.input.value.trim();
	},
	setValue: function(e) {
		this.input.value = e, this._updateState(), this._triggerChange();
	},
	setPlaceholder: function(e) {
		this.input.placeholder = e, this._options.placeholder = e;
	},
	clear: function(e) {
		e = e === void 0 ? !0 : e, this.setValue(""), e && this.input.focus();
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
		this.input.disabled = !0, this._options.disabled = !0, this._container.className.split(" ").indexOf("input-field-disabled") === -1 && (this._container.className += " input-field-disabled");
	},
	subscribe: function(e) {
		var t = this;
		return this._subscribers.push(e), { unsubscribe: function() {
			t._subscribers = t._subscribers.filter(function(t) {
				return t !== e;
			});
		} };
	},
	_triggerInputEvent: function(e) {
		var t = {
			value: this.input.value,
			originalEvent: e
		};
		this._subscribers.forEach(function(e) {
			e({
				type: "inputfield:input",
				detail: t
			});
		});
	},
	_triggerFocusEvent: function(e) {
		var t = {
			value: this.input.value,
			originalEvent: e
		};
		this._subscribers.forEach(function(e) {
			e({
				type: "inputfield:focus",
				detail: t
			});
		});
	},
	_triggerBlurEvent: function(e) {
		var t = {
			value: this.input.value,
			originalEvent: e
		};
		this._subscribers.forEach(function(e) {
			e({
				type: "inputfield:blur",
				detail: t
			});
		});
	},
	_triggerChange: function() {
		var e = {
			value: this.input.value,
			isValid: this.isValid
		};
		this._subscribers.forEach(function(t) {
			t({
				type: "inputfield:change",
				detail: e
			});
		});
	},
	_triggerSubmit: function() {
		var e = {
			value: this.input.value,
			isValid: this.isValid
		};
		this._subscribers.forEach(function(t) {
			t({
				type: "inputfield:submit",
				detail: e
			});
		});
	},
	destroy: function() {
		if (this._subscribers = [], this._boundHandles) try {
			this.input.removeEventListener("focus", this._boundHandles.focus), this.input.removeEventListener("blur", this._boundHandles.blur), this.input.removeEventListener("input", this._boundHandles.input), this.input.removeEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.removeEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.removeEventListener("click", this._boundHandles.search), this.input.removeEventListener("change", this._boundHandles.validate);
		} catch (e) {
			console.error(e);
		}
		this._container.innerHTML = "", this._container.className = this._container.className.split(" ").filter(function(e) {
			return e !== "input-field-container";
		}).join(" ");
	}
};
//#endregion
//#region src/app/shared/components/message.js
function _e(e, t) {
	if (typeof e == "string") {
		var n = document.getElementById(e);
		n instanceof HTMLElement && (e = n);
	}
	if (e instanceof HTMLElement) this.container = e;
	else throw Error("Invalid container element");
	this._options = Object.assign(this._options, t), this._isShow = !1;
}
_e.prototype = {
	constructor: _e,
	_options: {
		type: "info",
		text: "",
		title: "",
		duration: 0,
		closeButton: !0,
		autoClose: !1,
		closeOnClickOutside: !0
	},
	_outsideClickListener: null,
	_element: null,
	_timeoutId: null,
	_create: function() {
		var e = document.createElement("div");
		e.className = "message message-" + this._options.type, e.setAttribute("role", "alert");
		var t = this._options.title;
		if (!t) switch (t = "Error", this._options.type) {
			case "success":
				t = "Success";
				break;
			case "warning":
				t = "Warning";
				break;
			case "info":
				t = "Information";
				break;
		}
		var n = this._options.text;
		if (!n) switch (n = "", this._options.type) {
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
		if (e.innerHTML = "<div class=\"message-content\"><span class=\"message-title\">" + t + "</span><span class=\"message-text\">" + n + "</span></div>", this._options.closeButton) {
			var r = document.createElement("button");
			r.className = "message-close", r.textContent = "×", r.setAttribute("aria-label", "Close"), r.onclick = this.close.bind(this), e.appendChild(r);
		}
		return e;
	},
	addOutsideClickListener: function() {
		this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
		var e = this;
		this._outsideClickListener = function(t) {
			t.target instanceof HTMLElement && e._element && !e._element.contains(t.target) && e.close();
		}, setTimeout(function() {
			e._outsideClickListener && document.addEventListener("click", e._outsideClickListener);
		}, 10);
	},
	removeOutsideClickListener: function() {
		this._outsideClickListener &&= (document.removeEventListener("click", this._outsideClickListener), null);
	},
	show: function(e, t) {
		if (this._isShow) return this;
		this._isShow = !0, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), t && (this._options.title = t), e && (this._options.text = e);
		var n = this._create();
		return this._element = n, this.container.appendChild(n), setTimeout(function() {
			n.style.opacity = "1", n.style.transform = "translateY(0)";
		}, 10), this._options.autoClose && Number(this._options.duration) > 0 && (this._timeoutId = setTimeout(this.close.bind(this), this._options.duration)), this._options.closeOnClickOutside && this.addOutsideClickListener(), this;
	},
	close: function() {
		if (this._isShow = !1, !(!this._element || !this._element.parentNode)) {
			this._timeoutId &&= (clearTimeout(this._timeoutId), null), this.removeOutsideClickListener();
			var e = this._element;
			e.style.opacity = "0", e.style.transform = "translateY(-20px)", setTimeout(function() {
				e.parentNode && e.parentNode.removeChild(e);
			}, 300);
		}
	}
};
//#endregion
//#region src/app/shared/components/button.js
function D(e, t) {
	var n = this;
	if (typeof e == "string") {
		var r = document.getElementById(e);
		r instanceof HTMLButtonElement && (e = r);
	}
	if (e instanceof HTMLButtonElement) this._button = e;
	else throw Error("Invalid button");
	this._container = document.createElement("div"), this._options = t || {}, this._options.text = this._options.text || e.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = !1, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = {
		click: function(e) {
			n._handleClick(e);
		},
		mouseenter: function() {
			n._handleMouseEnter();
		},
		mouseleave: function() {
			n._handleMouseLeave();
		},
		focus: function() {
			n._handleFocus();
		},
		blur: function() {
			n._handleBlur();
		},
		keydown: function(e) {
			n._handleKeydown(e);
		}
	}, this._createDOM(), this._bindEvents(), this.updateState();
}
D.prototype = {
	constructor: D,
	_button: null,
	_buttonText: null,
	_spinner: null,
	_badgeElement: null,
	_createDOM: function() {
		var e = this._button.parentNode, t = document.createDocumentFragment();
		if (t.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = !0), this._options.text) if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
			var n = document.createElement("span");
			n.className = "custom-button-icon", this._options.iconPosition === "left" ? (n.className += " custom-button-icon-left", this._button.appendChild(n), this._button.appendChild(this._buttonText)) : (n.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n)), n.innerHTML = this._options.icon;
		} else this._button.appendChild(this._buttonText);
		this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), e && e.insertBefore(t, this._button), this._container.appendChild(this._button);
	},
	_bindEvents: function() {
		this._button.addEventListener("click", this._boundHandles.click), this._button.addEventListener("mouseenter", this._boundHandles.mouseenter), this._button.addEventListener("mouseleave", this._boundHandles.mouseleave), this._button.addEventListener("focus", this._boundHandles.focus), this._button.addEventListener("blur", this._boundHandles.blur), this._button.addEventListener("keydown", this._boundHandles.keydown);
	},
	_handleClick: function(e) {
		if (this._options.disabled || this.isLoading) {
			e.preventDefault(), e.stopPropagation();
			return;
		}
		this.triggerClickEvent(e);
	},
	_handleMouseEnter: function() {
		this._button.className.split(" ").indexOf("custom-button-hover") === -1 && (this._button.className += " custom-button-hover"), this.triggerEvent("mouseenter");
	},
	_handleMouseLeave: function() {
		this._button.className = this._button.className.split(" ").filter(function(e) {
			return e !== "custom-button-hover";
		}).join(" "), this.triggerEvent("mouseleave");
	},
	_handleFocus: function() {
		this._button.className.split(" ").indexOf("custom-button-focused") === -1 && (this._button.className += " custom-button-focused"), this.triggerEvent("focus");
	},
	_handleBlur: function() {
		this._button.className = this._button.className.split(" ").filter(function(e) {
			return e !== "custom-button-focused";
		}).join(" "), this.triggerEvent("blur");
	},
	_handleKeydown: function(e) {
		var t = e.key || e.keyCode;
		t === " " || t === "Enter" || t === 32 || t === 13 ? this._button.tagName === "BUTTON" || (e.preventDefault(), this._button.click()) : (t === "Escape" || t === 27) && this._button.blur(), this.triggerEvent("keydown", { key: t });
	},
	subscribe: function(e) {
		var t = this;
		return this._subscribers.push(e), { unsubscribe: function() {
			t._subscribers = t._subscribers.filter(function(t) {
				return t !== e;
			});
		} };
	},
	setText: function(e) {
		e !== void 0 && (this._options.text = e, this._buttonText || (this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = "", this._button.appendChild(this._buttonText)), this._buttonText.textContent = e);
	},
	setIcon: function(e, t) {
		this._options.icon = e, this._options.iconPosition = t || "left";
	},
	setBadge: function(e) {
		e !== void 0 && (this._options.badge = e, this._badgeElement && (this._badgeElement.textContent = e, this._badgeElement.style.display = e ? "flex" : "none"));
	},
	setVariant: function(e) {
		if (e !== void 0) {
			var t = "custom-button-" + this._options.variant, n = "custom-button-" + e;
			this._button.className = this._button.className.split(" ").filter(function(e) {
				return e !== t;
			}).join(" ") + " " + n, this._options.variant = e;
		}
	},
	setSize: function(e) {
		if (e !== void 0) {
			var t = "custom-button-" + this._options.size, n = "custom-button-" + e;
			this._button.className = this._button.className.split(" ").filter(function(e) {
				return e !== t;
			}).join(" ") + " " + n, this._options.size = e;
		}
	},
	enable: function() {
		this._options.disabled = !1, this._button.disabled = !1, this._button.className = this._button.className.split(" ").filter(function(e) {
			return e !== "custom-button-disabled";
		}).join(" ");
	},
	disable: function() {
		this._options.disabled = !0, this._button.disabled = !0, this._button.className.split(" ").indexOf("custom-button-disabled") === -1 && (this._button.className += " custom-button-disabled");
	},
	startLoading: function() {
		this.isLoading = !0, this._options.text !== void 0 && (this._originalText = this._options.text), this._container.className.split(" ").indexOf("custom-button-loading") === -1 && (this._container.className += " custom-button-loading"), this._spinner && (this._spinner.style.display = "inline-block"), this._buttonText && (this._buttonText.textContent = "Loading..."), this._button.disabled = !0;
	},
	stopLoading: function() {
		this.isLoading = !1, this._container.className = this._container.className.split(" ").filter(function(e) {
			return e !== "custom-button-loading";
		}).join(" "), this._spinner && (this._spinner.style.display = "none"), this._buttonText && (this._buttonText.textContent = this._originalText), this._button.disabled = !!this._options.disabled;
	},
	setTooltip: function(e) {
		e !== void 0 && (this._options.tooltip = e, this._button.title = e || "");
	},
	triggerClickEvent: function(e) {
		var t = {
			originalEvent: e,
			button: this
		};
		this._subscribers.forEach(function(e) {
			e({
				type: "button:click",
				detail: t
			});
		});
	},
	triggerEvent: function(e, t) {
		t ||= {}, t.button = this, this._subscribers.forEach(function(n) {
			n({
				type: "button:" + e,
				detail: t
			});
		});
	},
	updateState: function() {
		this._options.disabled ? this.disable() : this.enable(), this._options.loading && this.startLoading();
	},
	destroy: function() {
		if (this._subscribers = [], this._boundHandles) try {
			this._button.removeEventListener("click", this._boundHandles.click), this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter), this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave), this._button.removeEventListener("focus", this._boundHandles.focus), this._button.removeEventListener("blur", this._boundHandles.blur), this._button.removeEventListener("keydown", this._boundHandles.keydown);
		} catch (e) {
			console.error(e);
		}
		this._container.innerHTML = "";
		var e = this._container.className.split(" ").filter(function(e) {
			return e !== "custom-button-container";
		}).join(" ");
		this._container.className = e;
	}
};
//#endregion
//#region src/app/shared/components/radio.js
var O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), ve = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), ye = /*#__PURE__*/ new WeakMap(), be = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakSet(), xe = class {
	constructor(e, t) {
		if (u(this, M), c(this, O, void 0), c(this, k, void 0), c(this, ve, void 0), c(this, A, null), c(this, j, void 0), c(this, ye, /* @__PURE__ */ new Map()), c(this, be, []), typeof e == "string") {
			var n = document.getElementById(e);
			n instanceof HTMLInputElement && (e = n);
		}
		if (!(e instanceof HTMLInputElement)) throw Error("Invalid input element");
		if (l(k, this, e), l(j, this, Object.assign({
			id: `radio_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
			checked: !1,
			disabled: !1,
			indeterminate: !1,
			label: "",
			name: "",
			value: "on"
		}, t)), r(M, this, Se).call(this), l(O, this, document.createElement("div")), l(ve, this, document.createElement("span")), r(M, this, Ce).call(this), r(M, this, Te).call(this), r(M, this, Ee).call(this), !s(j, this).name) throw Error("Name attribute is required");
		var i = Oe._.get(s(j, this).name);
		i || (i = [], Oe._.set(s(j, this).name, i)), i.push(this);
	}
	subscribe(e) {
		var t = this;
		return s(be, this).push(e), { unsubscribe: function() {
			l(be, t, s(be, t).filter(function(t) {
				return t !== e;
			}));
		} };
	}
	getElement() {
		return s(O, this);
	}
	check(e) {
		if (!(s(j, this).disabled || s(j, this).checked)) {
			if (s(j, this).name) {
				var t = Oe._.get(s(j, this).name);
				t && t.forEach((e) => {
					e !== this && s(j, e).checked && e.uncheck();
				});
			}
			s(j, this).checked = !0, r(M, this, Ee).call(this), !e && r(M, this, De).call(this);
		}
	}
	uncheck(e) {
		s(j, this).disabled || !s(j, this).checked || (s(j, this).checked = !1, r(M, this, Ee).call(this), !e && r(M, this, De).call(this));
	}
	enable() {
		s(j, this).disabled && (s(j, this).disabled = !1, s(k, this).disabled = !1, s(O, this).setAttribute("aria-disabled", "false"), s(j, this).checked ? s(O, this).tabIndex = 0 : r(M, this, we).call(this), s(O, this).classList.remove("radio--disabled"));
	}
	disable() {
		s(j, this).disabled || (s(j, this).disabled = !0, s(k, this).disabled = !0, s(O, this).setAttribute("aria-disabled", "true"), s(O, this).tabIndex = -1, s(O, this).classList.add("radio--disabled"));
	}
	setLabel(e) {
		s(j, this).label = e, s(A, this) ? s(A, this).textContent = e : e && (l(A, this, document.createElement("label")), s(A, this).className = "radio-label", s(A, this).htmlFor = String(s(j, this).id), s(A, this).textContent = e, s(O, this).appendChild(s(A, this)));
	}
	getState() {
		return {
			checked: !!s(j, this).checked,
			disabled: !!s(j, this).disabled,
			value: s(j, this).value || "",
			name: s(j, this).name || ""
		};
	}
	destroy() {
		if (l(be, this, []), s(j, this).name) {
			var e = Oe._.get(s(j, this).name);
			if (e) {
				var t = e.indexOf(this);
				t >= 0 && e.splice(t, 1);
			}
			s(ye, this).forEach((e, t) => {
				s(O, this).removeEventListener(t, e);
			}), s(ye, this).clear(), s(O, this) && s(O, this).parentNode && s(O, this).parentNode.removeChild(s(O, this)), l(A, this, null);
		}
	}
};
function Se() {
	s(k, this).type = "radio";
	var e = s(k, this).getAttribute("id"), t = s(k, this).getAttribute("name"), n = s(k, this).getAttribute("value"), r = s(k, this).getAttribute("checked"), i = s(k, this).getAttribute("disabled");
	e === null ? s(j, this).id && s(k, this).setAttribute("id", s(j, this).id) : s(j, this).id = e, t === null ? s(j, this).name && s(k, this).setAttribute("name", s(j, this).name) : s(j, this).name = t, n === null ? s(j, this).value && s(k, this).setAttribute("value", s(j, this).value) : s(j, this).value = n, r === null ? s(j, this).checked && s(k, this).setAttribute("checked", "true") : s(j, this).checked = r === "true", i === null ? s(j, this).disabled && s(k, this).setAttribute("disabled", "true") : s(j, this).disabled = i === "true";
}
function Ce() {
	var e = s(k, this).parentNode, t = document.createDocumentFragment();
	t.appendChild(s(O, this)), s(O, this).classList.add("radio-button-container"), s(O, this).setAttribute("role", "radio"), s(O, this).setAttribute("aria-checked", String(!!s(j, this).checked)), s(O, this).setAttribute("aria-disabled", String(!!s(j, this).disabled)), s(O, this).tabIndex = s(j, this).disabled ? -1 : 0, s(ve, this).className = "radio-visual", s(ve, this).setAttribute("aria-hidden", "true"), s(j, this).label && (l(A, this, document.createElement("label")), s(A, this).className = "i18n radio-label", s(A, this).htmlFor = String(s(j, this).id), s(A, this).textContent = s(j, this).label), s(j, this).disabled && s(O, this).classList.add("radio--disabled"), e && e.insertBefore(t, s(k, this)), s(O, this).appendChild(s(k, this)), s(O, this).appendChild(s(ve, this)), s(A, this) && s(O, this).appendChild(s(A, this)), r(M, this, we).call(this);
}
function we() {
	if (s(j, this).checked) s(O, this).tabIndex = s(j, this).disabled ? -1 : 0;
	else if (s(j, this).name && Oe._.has(s(j, this).name)) {
		var e = Oe._.get(s(j, this).name), t = !1;
		e && e.forEach((e) => {
			s(j, e).checked && e !== this && (t = !0);
		}), !t && !s(j, this).checked && !s(j, this).disabled ? s(O, this).tabIndex = 0 : s(O, this).tabIndex = -1;
	}
}
function Te() {
	var e = (e) => {
		e.preventDefault(), !s(j, this).disabled && !s(j, this).checked && (this.check(), s(O, this).focus());
	}, t = (e) => {
		if (!s(j, this).disabled) switch (e.key) {
			case " ":
			case "Spacebar":
			case "Enter":
				e.preventDefault(), s(j, this).checked || this.check();
				break;
		}
	}, n = () => {
		s(O, this).classList.add("radio--focused");
	}, r = () => {
		s(O, this).classList.remove("radio--focused");
	};
	s(ye, this).set("click", e), s(ye, this).set("keydown", t), s(ye, this).set("focus", n), s(ye, this).set("blur", r), s(O, this).addEventListener("click", e), s(O, this).addEventListener("keydown", t), s(O, this).addEventListener("focus", n), s(O, this).addEventListener("blur", r);
}
function Ee() {
	s(O, this).setAttribute("aria-checked", String(!!s(j, this).checked)), s(O, this).classList.toggle("radio--checked", s(j, this).checked), s(k, this).checked = !!s(j, this).checked, r(M, this, we).call(this);
}
function De(e) {
	var t = {
		type: "radio:change",
		detail: this.getState()
	};
	e && (t.originalEvent = e), s(be, this).forEach(function(e) {
		e(t);
	});
}
var Oe = { _: /* @__PURE__ */ new Map() };
//#endregion
//#region src/app/shared/components/checkbox.js
function ke(e, t) {
	if (typeof e == "string") {
		var n = document.getElementById(e);
		n instanceof HTMLInputElement && (e = n);
	}
	if (!(e instanceof HTMLInputElement)) throw Error("Invalid input element");
	this._options = Object.assign({
		id: `checkbox_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
		checked: !1,
		disabled: !1,
		indeterminate: !1,
		label: "",
		name: "",
		value: "on"
	}, t), this._options.disabled = t.disabled || !1, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(e), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
ke.prototype = {
	constructor: ke,
	_container: null,
	_input: null,
	_visualCheckbox: null,
	_labelElement: null,
	_createDOM: function(e) {
		var t = e.parentNode, n = document.createDocumentFragment();
		this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = e;
		var r = this._input.getAttribute("id");
		r === null ? this._options.id && this._input.setAttribute("id", this._options.id) : this._options.id = r, this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = !0), this._options.indeterminate && (this._input.indeterminate = !0), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
		var i = "http://www.w3.org/2000/svg", a = document.createElementNS(i, "svg");
		a.setAttribute("viewBox", "0 0 10 8"), a.setAttribute("class", "checkbox-checkmark");
		var o = document.createElementNS(i, "path");
		o.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), o.setAttribute("fill", "none"), o.setAttribute("stroke", "currentColor"), o.setAttribute("stroke-width", "2"), a.appendChild(o), this._visualCheckbox.appendChild(a);
		var s = document.createElement("span");
		if (s.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(s), this._options.label) this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
		else {
			var c = document.querySelector("label[for='" + this._options.id + "']");
			c instanceof HTMLLabelElement && (this._labelElement = c);
		}
		this._options.disabled && this._container.classList.add("checkbox--disabled"), t && t.insertBefore(n, e), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
	},
	_setupEventListeners: function() {
		var e = this;
		if (this._container) {
			var t = function(t) {
				t.preventDefault(), !e._options.disabled && e._container && (e.toggle(), e._container.focus());
			}, n = function(t) {
				if (!e._options.disabled) switch (t.key) {
					case " ":
					case "Spacebar":
					case "Enter":
						t.preventDefault(), e.toggle();
						break;
					case "ArrowRight":
					case "ArrowDown":
						t.preventDefault(), !e._options.checked && !e._options.indeterminate && (e._options.checked ? e.setIndeterminate() : e.check());
						break;
					case "ArrowLeft":
					case "ArrowUp":
						t.preventDefault(), (e._options.checked || e._options.indeterminate) && (e._options.indeterminate ? e.uncheck() : e.setIndeterminate());
						break;
				}
			}, r = function() {
				e._container && e._container.classList.add("checkbox--focused");
			}, i = function() {
				e._container && e._container.classList.remove("checkbox--focused");
			};
			this._handlers.set("click", t), this._handlers.set("keydown", n), this._handlers.set("focus", r), this._handlers.set("blur", i), this._container.addEventListener("click", t), this._container.addEventListener("keydown", n), this._container.addEventListener("focus", r), this._container.addEventListener("blur", i);
		}
	},
	_updateVisualState: function() {
		!this._container || !this._input || (this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked)), this._container.classList.toggle("checkbox--checked", this._options.checked), this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate), this._input.checked = !!this._options.checked, this._input.indeterminate = !!this._options.indeterminate);
	},
	toggle: function() {
		return this._options.disabled ? !!this._options.checked : (this._options.indeterminate ? (this._options.indeterminate = !1, this._options.checked = !0) : this._options.checked = !this._options.checked, this._updateVisualState(), this._triggerChange(), this._options.checked);
	},
	check: function(e) {
		this._options.disabled || this._options.checked && !this._options.indeterminate || (this._options.checked = !0, this._options.indeterminate = !1, this._updateVisualState(), e || this._triggerChange());
	},
	uncheck: function(e) {
		this._options.disabled || !this._options.checked && !this._options.indeterminate || (this._options.checked = !1, this._options.indeterminate = !1, this._updateVisualState(), e || this._triggerChange());
	},
	setIndeterminate: function() {
		this._options.disabled || this._options.indeterminate || (this._options.indeterminate = !0, this._updateVisualState(), this._triggerChange());
	},
	enable: function() {
		!this._options.disabled || !this._container || !this._input || (this._options.disabled = !1, this._input.disabled = !1, this._container.setAttribute("aria-disabled", "false"), this._container.tabIndex = 0, this._container.classList.remove("checkbox--disabled"));
	},
	disable: function() {
		this._options.disabled || !this._container || !this._input || (this._options.disabled = !0, this._input.disabled = !0, this._container.setAttribute("aria-disabled", "true"), this._container.tabIndex = -1, this._container.classList.add("checkbox--disabled"));
	},
	setLabel: function(e) {
		this._options.label = e, this._labelElement ? this._labelElement.textContent = e : e && this._container && (this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = e, this._container.appendChild(this._labelElement)), this._options.title && this._labelElement && this._labelElement.setAttribute("title", e);
	},
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
	subscribe: function(e) {
		var t = this;
		return this._subscribers.push(e), { unsubscribe: function() {
			t._subscribers = t._subscribers.filter(function(t) {
				return t !== e;
			});
		} };
	},
	_triggerChange: function(e) {
		var t = {
			type: "checkbox:change",
			detail: this.getState()
		};
		e && (t.originalEvent = e), this._subscribers.forEach(function(e) {
			e(t);
		});
	},
	destroy: function() {
		this._subscribers = [], this._handlers.forEach((e, t) => {
			this._container && this._container.removeEventListener(t, e);
		}), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
	}
};
//#endregion
//#region src/app/shared/components/selectbox.js
var N = /*#__PURE__*/ new WeakSet(), Ae = class {
	constructor(e, t) {
		if (u(this, N), typeof e == "string") {
			var n = document.getElementById(e);
			if (n instanceof HTMLSelectElement) e = n;
			else if (n instanceof HTMLElement) this._container = n;
			else throw Error("Invalid selectbox");
		} else e instanceof HTMLElement && (this._container = e);
		if (e instanceof HTMLSelectElement) this._selectbox = e, this._container = document.createElement("div");
		else if (!(this._container instanceof HTMLElement)) throw Error("Invalid container");
		this._options = Object.assign(t, {
			placeholder: t.placeholder || "Select...",
			searchable: t.searchable || !1,
			sortable: t.sortable || !1,
			translate: t.translate,
			multiple: t.multiple || !1,
			usePortal: t.usePortal || !1,
			description: t.description || ""
		}), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = !1, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = {
			toggle: (e) => {
				r(N, this, Ne).call(this, e);
			},
			search: (e) => {
				r(N, this, Pe).call(this, e);
			},
			close: (e) => {
				e.target instanceof HTMLElement && !this._container.contains(e.target) && !e.target.classList.contains("selectbox-option") && r(N, this, P).call(this);
			},
			keydown: (e) => {
				r(N, this, Ie).call(this, e);
			},
			dropdownClick: (e) => {
				r(N, this, Re).call(this, e);
			},
			scrollCheck: () => {
				if (this._headerRectOnOpen) {
					var e = this._header.getBoundingClientRect();
					Math.abs(e.top - this._headerRectOnOpen.top) > 1 && r(N, this, P).call(this);
				}
			}
		}, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), r(N, this, je).call(this), r(N, this, Me).call(this), r(N, this, Le).call(this), Ue._.add(this);
	}
	openDropdown() {
		this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._headerRectOnOpen = this._header.getBoundingClientRect(), document.addEventListener("scroll", this._boundHandles.scrollCheck, !0), this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(function(e) {
			return function() {
				e.searchInput && e.searchInput.focus();
			};
		}(this), 100), r(N, this, Le).call(this), r(N, this, ze).call(this);
	}
	subscribe(e) {
		var t = this;
		return this._subscribers.push(e), { unsubscribe() {
			t._subscribers = t._subscribers.filter(function(t) {
				return t !== e;
			});
		} };
	}
	addItem(e, t, n) {
		if (n ||= !1, this._items.some((t) => t && t.value === e)) {
			var i = this._items.find((t) => t && t.value === e);
			i && (i.selected = n);
		} else this._items.push({
			value: e,
			text: t,
			selected: n
		}), this._options.sortable && this._items.sort((e, t) => e && t ? e.text.localeCompare(t.text) : e ? -1 : +!!t);
		n && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(e)), r(N, this, F).call(this);
	}
	addItems(e, t) {
		var n = this;
		e.forEach(function(e, r) {
			if (!n._items.some((t) => t && t.value === e[0])) {
				var i = t ? e[0] === t : r === 0;
				i && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(e[0])), n._items.push({
					value: e[0],
					text: e[1],
					selected: i
				});
			}
		}, this), this.isOpen && r(N, this, Le).call(this), r(N, this, F).call(this);
	}
	addCustomItem(e, t) {
		this._customItems.push({
			value: e,
			text: t,
			selected: !1
		});
	}
	addSeparator() {
		this._items.push(null);
	}
	removeItem(e) {
		this._items = this._items.filter(function(t) {
			return t === null || t.value !== e;
		}), this._customItems = this._customItems.filter(function(t) {
			return t === null || t.value !== e;
		}), this._selectedValues.delete(e), r(N, this, F).call(this);
	}
	getSelectedValue() {
		if (this._options.multiple) return console.error("Method getSelectedValue is only available for single-select boxes."), null;
		var e = Array.from(this._selectedValues);
		return e.length > 0 ? e[0] : null;
	}
	getSelectedValues() {
		if (this._options.multiple) return Array.from(this._selectedValues);
		var e = Array.from(this._selectedValues);
		return e.length > 0 ? e[0] : null;
	}
	selectItems(e, t) {
		var n = this;
		if (!this._options.multiple && Array.isArray(e)) {
			console.error("Method selectItem is only available for multi-select boxes.");
			return;
		}
		var i = "";
		if (this._options.multiple) {
			var a = function(e) {
				if (n._optionsContainer) {
					var t = n._optionsContainer.querySelector("[data-value=\"" + e + "\"]");
					if (t) {
						var r = t.querySelector("input[type=\"checkbox\"]");
						r && r instanceof HTMLInputElement && (r.checked = !0), t.classList.add("selectbox-option-selected"), t.classList.add("checkbox--checked");
					}
				}
			};
			if (Array.isArray(e)) for (var o = 0; o < e.length; o++) i = e[o], this._selectedValues.has(i) || (this._selectedValues.add(i), a(i));
			else i = e, this._selectedValues.has(i) || (this._selectedValues.add(i), a(i));
		} else if (!Array.isArray(e)) {
			if (i = e, this._selectedValues.clear(), this._selectedValues.add(i), this._optionsContainer) {
				this._optionsContainer.querySelectorAll(".selectbox-option-selected[data-value=\"" + i + "\"]").forEach(function(e) {
					e.classList.remove("selectbox-option-selected"), e.classList.remove("checkbox--checked");
				});
				var s = this._optionsContainer.querySelector("[data-value=\"" + i + "\"]");
				s && (s.classList.add("selectbox-option-selected"), s.classList.add("checkbox--checked"));
			}
			r(N, this, P).call(this);
		}
		r(N, this, F).call(this), !t && r(N, this, Be).call(this, i, !0);
	}
	unselectItems(e, t) {
		var n = this;
		if (!this._options.multiple) {
			console.error("Method unselectItem is only available for multi-select boxes.");
			return;
		}
		var i = "", a = function(e) {
			if (n._optionsContainer) {
				var t = n._optionsContainer.querySelector("[data-value=\"" + e + "\"]");
				if (t) {
					var r = t.querySelector("input[type=\"checkbox\"]");
					r && r instanceof HTMLInputElement && (r.checked = !1), t.classList.remove("selectbox-option-selected"), t.classList.remove("checkbox--checked");
				}
			}
		};
		if (Array.isArray(e)) for (var o = 0; o < e.length; o++) i = e[o], this._selectedValues.has(i) && (this._selectedValues.delete(i), a(i));
		else i = e, this._selectedValues.has(i) && (this._selectedValues.delete(i), a(i));
		r(N, this, F).call(this), !t && r(N, this, Be).call(this, i, !0);
	}
	disable() {
		this._select.classList.add("selectbox-disabled");
	}
	enable() {
		this._select.classList.remove("selectbox-disabled");
	}
	clear(e) {
		if (e ||= !1, this._selectedValues.clear(), e && this._items.length > 0) {
			var t = this._items[0];
			t && this._selectedValues.add(t.value);
		}
		r(N, this, F).call(this), r(N, this, Le).call(this);
	}
	destroy() {
		this._subscribers = [], Ue._.delete(this);
		try {
			this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
		} catch (e) {
			console.error(e);
		}
		this._container.innerHTML = "";
		for (var e = this._container.className.split(" "), t = [], n = 0; n < e.length; n++) e[n] !== "selectbox-container" && t.push(e[n]);
		this._container.className = t.join(" ");
	}
};
function je() {
	this._container.innerHTML = "", this._container.className += " selectbox-container";
	var e = document.createDocumentFragment();
	if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), e.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text i18n", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._options.usePortal && (this._dropdown.className += " selectbox-fixed"), this._select.appendChild(this._dropdown), this._options.description) {
		var t = document.createElement("div");
		t.className += " i18n selectbox-description", t.textContent = this._options.description, this._dropdown.appendChild(t);
	}
	if (this._options.searchable) {
		var n = document.createElement("div");
		n.className += " selectbox-search", this._dropdown.appendChild(n), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", n.appendChild(this.searchInput);
	}
	if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(e), this._selectbox) {
		var i = this._selectbox.parentNode;
		if (i) {
			i.insertBefore(this._container, this._selectbox);
			var a = r(N, this, He).call(this, this._selectbox);
			this.addItems(a.values, a.selectedValue), this._selectbox.remove();
		}
	}
}
function Me() {
	this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
		e.stopPropagation();
	}), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function Ne(e) {
	if (e && e.stopPropagation(), this.isOpen ? r(N, this, P).call(this) : this.openDropdown(), e && e.type === "click") for (var t of Ue._) t.isOpen && t !== this && r(N, t, P).call(t);
}
function P() {
	this.isOpen && document && this._boundHandles && (document.removeEventListener("click", this._boundHandles.close), document.removeEventListener("scroll", this._boundHandles.scrollCheck, !0)), this.isOpen = !1, this._dropdown.style.display = "none", this._options.usePortal ? (this._dropdown.style.left = "", this._dropdown.style.width = "", this._dropdown.style.top = "") : this._dropdown.classList.remove("selectbox-dropdown-top");
	for (var e = this._arrow.className.split(" "), t = [], n = 0; n < e.length; n++) e[n] !== "selectbox-arrow-open" && t.push(e[n]);
	this._arrow.className = t.join(" ");
	for (var r = this._header.className.split(" "), i = [], n = 0; n < r.length; n++) r[n] !== "selectbox-header-open" && i.push(r[n]);
	this._header.className = i.join(" "), this.searchInput && (this.searchInput.value = "");
}
function Pe(e) {
	var t = e.target;
	if (t instanceof HTMLInputElement) {
		var n = t.value.toLowerCase();
		r(N, this, Le).call(this, n);
	}
}
function Fe(e) {
	var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", n, i = this._items.filter(function(e) {
		return e !== null;
	});
	if (t && (i = i.filter(function(e) {
		return e.text.toLowerCase().indexOf(t) !== -1;
	})), i.length !== 0) {
		if (e === "up") if (this._selectedValues.size === 0 && i.length > 0) n = i[i.length - 1], this._selectedValues.add(n.value);
		else {
			for (var a = Array.from(this._selectedValues), o = -1, s = 0; s < i.length; s++) if (i[s].value === a[0]) {
				o = s;
				break;
			}
			var c = (o - 1 + i.length) % i.length;
			this._selectedValues.clear(), n = i[c], this._selectedValues.add(n.value);
		}
		else if (this._selectedValues.size === 0 && i.length > 0) n = i[0], this._selectedValues.add(n.value);
		else {
			for (var a = Array.from(this._selectedValues), o = -1, s = 0; s < i.length; s++) if (i[s].value === a[0]) {
				o = s;
				break;
			}
			var l = (o + 1) % i.length;
			l === i.length && (l = 0), this._selectedValues.clear(), n = i[l], this._selectedValues.add(n.value);
		}
		r(N, this, F).call(this), r(N, this, Le).call(this, t, !0), r(N, this, Be).call(this, n.value, !0);
	}
}
function Ie(e) {
	switch (e.key || e.keyCode) {
		case "Enter":
		case 13:
			e.preventDefault(), r(N, this, Ne).call(this, e);
			break;
		case "Escape":
		case 27:
			r(N, this, P).call(this);
			break;
		case "ArrowDown":
		case 40:
			e.preventDefault(), r(N, this, Fe).call(this, "down");
			break;
		case "ArrowUp":
		case 38:
			e.preventDefault(), r(N, this, Fe).call(this, "up");
			break;
		case "Tab":
		case 9:
			r(N, this, P).call(this);
			break;
	}
}
function Le(e, t) {
	if (e ||= "", this._optionsContainer) {
		this._optionsContainer.innerHTML = "";
		var n = null, r = this._items;
		e && (r = r.filter(function(t) {
			return t !== null && t.text.toLowerCase().indexOf(e) !== -1;
		}));
		for (var i = document.createDocumentFragment(), a = 0; a < r.length; a++) {
			var o = r[a];
			if (!o) {
				var s = document.createElement("hr");
				s.className += " selectbox-option-divider", i.appendChild(s);
				continue;
			}
			var c = document.createElement("div");
			c.className += " selectbox-option", this._selectedValues.has(o.value) && (c.className += " selectbox-option-selected checkbox--checked", n = c), c.setAttribute("data-value", o.value);
			var l = document.createElement("label");
			if (l.className += " selectbox-option-text i18n", this._options.translate && (o.text = this._options.translate(o.text)), l.textContent = o.text, this._options.multiple) {
				c.className += " selectbox-option-checkbox";
				var u = document.createElement("input");
				u.type = "checkbox", u.id = "checkbox-" + o.value, u.className += " selectbox-checkbox", u.checked = this._selectedValues.has(o.value), c.appendChild(u);
				var d = document.createElement("span");
				d.className = "checkbox-visual", d.setAttribute("aria-hidden", "true");
				var f = "http://www.w3.org/2000/svg", p = document.createElementNS(f, "svg");
				p.setAttribute("viewBox", "0 0 10 8"), p.setAttribute("class", "checkbox-checkmark");
				var m = document.createElementNS(f, "path");
				m.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), m.setAttribute("fill", "none"), m.setAttribute("stroke", "currentColor"), m.setAttribute("stroke-width", "2"), p.appendChild(m), d.appendChild(p), c.appendChild(d);
			}
			c.appendChild(l), i.appendChild(c);
		}
		if (this._customItems.length) {
			var h = document.createElement("hr");
			h.className += " selectbox-option-divider", i.appendChild(h);
		}
		for (var a = 0; a < this._customItems.length; a++) {
			var g = this._customItems[a], _ = document.createElement("label");
			_.className += " selectbox-custom-option", _.setAttribute("data-value", g.value), _.setAttribute("for", g.value);
			var v = document.createElement("span");
			v.className += " selectbox-option-text i18n", this._options.translate && (g.text = this._options.translate(g.text)), v.textContent = g.text, _.appendChild(v), i.appendChild(_);
		}
		if (this._optionsContainer.appendChild(i), t && this.isOpen && this._optionsContainer && n) try {
			n.scrollIntoView && n.scrollIntoView({ block: "nearest" });
		} catch (e) {
			console.error(e);
		}
	}
}
function Re(e) {
	var t = e.target || e.srcElement, n = null;
	if (t && t instanceof HTMLElement) {
		for (var i = null, a = t.className.split(" "), o = !1, s = 0; s < a.length; s++) if (a[s] === "selectbox-option") {
			o = !0;
			break;
		} else if (a[s] === "selectbox-custom-option") {
			var c = t.getAttribute("data-value");
			if (c) {
				e.stopPropagation(), r(N, this, Ve).call(this, c), r(N, this, P).call(this);
				return;
			}
			break;
		}
		if (o) i = t;
		else if (t.parentNode && t.parentNode instanceof HTMLElement) {
			for (var l = t.parentNode.className.split(" "), u = !1, s = 0; s < l.length; s++) if (l[s] === "selectbox-option") {
				u = !0;
				break;
			} else if (l[s] === "selectbox-custom-option") {
				var d = t.parentNode.getAttribute("data-value");
				if (d) {
					e.stopPropagation(), r(N, this, Ve).call(this, d), r(N, this, P).call(this);
					return;
				}
				break;
			}
			u && (i = t.parentNode);
		}
		if (i instanceof HTMLDivElement) n = i;
		else return;
	} else return;
	var f = n.getAttribute("data-value");
	if (f !== null) {
		var p = !0;
		this._options.multiple ? this._selectedValues.has(f) ? (this.unselectItems(f, !0), p = !1) : this.selectItems(f, !0) : (this.selectItems(f, !0), r(N, this, P).call(this)), r(N, this, F).call(this), r(N, this, Be).call(this, f, p);
	}
}
function F() {
	if (this._selectedValues.size === 0) {
		this._selectedText.textContent = this._options.placeholder;
		return;
	}
	if (this._options.multiple) {
		for (var e = [], t = 0; t < this._items.length; t++) {
			var n = this._items[t];
			n && this._selectedValues.has(n.value) && e.push(n);
		}
		e.length === 0 ? this._selectedText.textContent = this._options.placeholder : e.length === 1 ? this._selectedText.textContent = e[0].text : this._selectedText.textContent = e.length + " items selected";
	} else {
		for (var r = null, t = 0; t < this._items.length; t++) {
			var n = this._items[t];
			if (n && this._selectedValues.has(n.value)) {
				r = n;
				break;
			}
		}
		this._selectedText.textContent = r ? r.text : this._options.placeholder;
	}
}
function ze() {
	var e = window.innerHeight;
	if (this._options.usePortal) {
		var t = this._header.getBoundingClientRect(), n = this._dropdown.offsetHeight;
		this._dropdown.style.left = t.left + "px", this._dropdown.style.width = t.width - 2 + "px";
		var r = e - t.bottom;
		r < n && t.top > r ? this._dropdown.style.top = t.top - n - 2 + "px" : this._dropdown.style.top = t.bottom + 2 + "px";
	} else this._dropdown.getBoundingClientRect().bottom > e && this._dropdown.classList.add("selectbox-dropdown-top");
}
function Be(e, t) {
	for (var n = Array.from(this._selectedValues), r = [], i = 0; i < this._items.length; i++) {
		var a = this._items[i];
		a && this._selectedValues.has(a.value) && r.push(a);
	}
	var o = {
		values: n,
		items: r,
		current: e,
		enabled: t
	};
	this._subscribers.forEach(function(e) {
		e({
			type: "selectbox:change",
			detail: o
		});
	});
}
function Ve(e) {
	var t = {
		values: [],
		current: e,
		enabled: !1
	};
	this._subscribers.forEach(function(e) {
		e({
			type: "selectbox:custom",
			detail: t
		});
	});
}
function He(e) {
	var t = { values: Array.from(e.options).map((e) => [e.value, e.text]) }, n = e.value;
	return n && (t.selectedValue = n), t;
}
var Ue = { _: /* @__PURE__ */ new Set() }, We = /*#__PURE__*/ new WeakMap(), Ge = /*#__PURE__*/ new WeakSet(), Ke = class e {
	constructor(e, t) {
		u(this, Ge), c(this, We, void 0);
		var n = document.getElementById(e);
		if (!(n instanceof HTMLElement)) throw Error("Invalid container");
		l(We, this, n), r(Ge, this, qe).call(this, t);
	}
	show() {
		var e;
		(e = s(We, this)) == null || e.classList.remove("hidden");
	}
	hide() {
		var e;
		(e = s(We, this)) == null || e.classList.add("hidden");
	}
	static show() {
		var t;
		(t = r(e, this, Je)._) == null || t.classList.remove("hidden");
	}
	static hide() {
		var t;
		(t = r(e, this, Je)._) == null || t.classList.add("hidden");
	}
};
function qe(e) {
	s(We, this).classList.add("loader-container");
	var t = "http://www.w3.org/2000/svg", n = document.createElementNS(t, "svg");
	n.classList.add("loader-image"), n.setAttribute("viewBox", "0 0 20 20");
	var r = document.createElementNS(t, "circle");
	r.setAttribute("cx", "10"), r.setAttribute("cy", "10"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "1.5"), r.setAttribute("r", "7.25"), r.setAttribute("stroke-dasharray", "160%, 40%"), n.appendChild(r), s(We, this).appendChild(n);
	var i = document.createElement("div");
	i.classList.add("loader-title"), i.classList.add("i18n"), i.innerText = e, s(We, this).appendChild(i);
}
var Je = { _: document.getElementById("loader") };
//#endregion
//#region src/app/services/translate-service.js
function I(e) {
	try {
		return window.Asc.plugin.tr(e);
	} catch (t) {
		return console.error(t), e;
	}
}
//#endregion
//#region src/app/services/csl-html-parser.js
var Ye = class e {
	static purifyHtml(t) {
		if (typeof t != "string" || t.length === 0) return "";
		var n = r(e, this, Ze)._, i = new DOMParser().parseFromString("<div id=\"__purify_root__\">" + t + "</div>", "text/html").getElementById("__purify_root__");
		if (!i) return "";
		var a = (e) => {
			var t = e.parentNode;
			if (t) {
				for (; e.firstChild;) t.insertBefore(e.firstChild, e);
				t.removeChild(e);
			}
		};
		for (var o of Array.from(i.getElementsByTagName("*"))) {
			var s = o.tagName.toLowerCase();
			n.has(s) ? Xe.call(e, o) : a(o);
		}
		return i.innerHTML;
	}
	static parseHtmlFormatting(t) {
		for (var n = {
			text: "",
			formatting: []
		}, i = [], a = 0, o = 0; o < t.length;) if (t[o] === "<" && o + 1 < t.length) {
			var s = t[o + 1] === "/", c = t.indexOf(">", o);
			if (c === -1) {
				n.text += t[o], o++;
				continue;
			}
			var l = t.substring(s ? o + 2 : o + 1, c).trim(), u = l.split(" ");
			if (u.length === 0) {
				n.text += t[o], o++;
				continue;
			}
			var d = u[0].toLowerCase();
			if (d === "br") {
				n.text += "\n", o = c + 1;
				continue;
			}
			var f = d;
			if (l.indexOf("font-variant:small-caps") === -1 ? l.indexOf("text-decoration:underline") !== -1 && (f = "u") : f = "sc", r(e, this, Ze)._.has(d)) if (s) {
				for (var p = i.length - 1; p >= 0; p--) if (i[p].tag === d) {
					var m = i.splice(p, 1)[0], h = m.start, g = m.styleTag;
					n.formatting.push({
						type: g,
						start: h,
						end: a
					});
					break;
				}
			} else i.push({
				tag: d,
				start: a,
				styleTag: f
			});
			o = c + 1;
		} else n.text += t[o], a++, o++;
		return n.formatting.sort((e, t) => e.start === t.start ? t.end - e.end : e.start - t.start), n;
	}
};
function Xe(e) {
	var t = /^\s*(javascript|vbscript|data)\s*:/i;
	for (var n of Array.from(e.attributes)) {
		var r = n.name.toLowerCase(), i = n.value || "";
		if (r.startsWith("on")) {
			e.removeAttribute(n.name);
			continue;
		}
		if (Qe._.has(r)) {
			var a = i.replace(/[\u0000-\u001F\u007F]/g, "");
			if (t.test(a)) {
				e.removeAttribute(n.name);
				continue;
			}
		}
		r === "style" && /expression\s*\(|javascript\s*:/i.test(i) && e.removeAttribute(n.name);
	}
}
var Ze = { _: new Set([
	"i",
	"u",
	"b",
	"p",
	"sc",
	"sup",
	"sub",
	"em",
	"div",
	"span"
]) }, Qe = { _: new Set([
	"href",
	"src",
	"xlink:href",
	"action",
	"formaction",
	"background",
	"poster",
	"srcdoc",
	"ping",
	"data"
]) }, $e = class {
	static formatAfterInsert(e) {
		return new Promise(function(t) {
			var n = !0, r = !1;
			Asc.scope.formatting = e, Asc.plugin.callCommand(function() {
				for (var e = Api.GetDocument().GetCurrentRun(), t = Asc.scope.formatting.length - 1; t >= 0; t--) {
					var n = Asc.scope.formatting[t], r = e.GetRange(n.start, n.end);
					r && (n.type === "sup" ? r.SetVertAlign("superscript") : n.type === "sub" ? r.SetVertAlign("subscript") : n.type === "sc" ? r.SetSmallCaps(!0) : n.type === "u" ? r.SetUnderline(!0) : n.type === "b" ? r.SetBold(!0) : (n.type === "i" || n.type === "em") && r.SetItalic(!0));
				}
			}, r, n, t);
		});
	}
	static formatAfterUpdate(e, t) {
		var n = !0, r = !1;
		return Asc.scope.fieldId = e, Asc.scope.text = t.text, Asc.scope.formatting = t.formatting, new Promise(function(e) {
			Asc.plugin.callCommand(function() {
				var e = Api.GetDocument(), t = e.GetRangeBySelect();
				if (!t) return;
				function n(e, t) {
					t === "sup" ? e.SetVertAlign("superscript") : t === "sub" ? e.SetVertAlign("subscript") : t === "sc" ? e.SetSmallCaps(!0) : t === "u" ? e.SetUnderline(!0) : t === "b" ? e.SetBold(!0) : (t === "i" || t === "em") && e.SetItalic(!0);
				}
				if (Asc.scope.formatting.length === 1) {
					var r = Asc.scope.formatting[0];
					if (r.start === 0 && r.end === t.GetText().length) {
						n(t, r.type);
						return;
					}
				}
				e.MoveCursorToPos(t.GetEndPos() - Asc.scope.text.length);
				for (var i = e.GetCurrentRun(), a = Asc.scope.formatting.length - 1; a >= 0; a--) {
					var o = Asc.scope.formatting[a], s = i.GetRange(o.start, o.end);
					s && n(s, o.type);
				}
			}, r, n, e);
		});
	}
}, et = /*#__PURE__*/ new WeakMap(), tt = /*#__PURE__*/ new WeakMap(), nt = /*#__PURE__*/ new WeakMap(), rt = /*#__PURE__*/ new WeakMap(), it = /*#__PURE__*/ new WeakMap(), at = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakSet(), ot = class {
	constructor(e, t, n, r) {
		u(this, L), c(this, et, void 0), c(this, tt, void 0), c(this, nt, void 0), c(this, rt, void 0), c(this, it, void 0), c(this, at, void 0), l(et, this, "ZOTERO_CITATION"), l(nt, this, "ZOTERO_BIBLIOGRAPHY"), l(tt, this, e), l(rt, this, t), l(it, this, n), l(at, this, r);
	}
	addBibliography(e, t) {
		var n = this;
		return a(function* () {
			var i = window.Asc.scope.editorVersion;
			if (i && i < 9004e3) {
				var a = Ye.parseHtmlFormatting(e), o = "", c = {
					FieldId: o,
					Value: s(it, n) + t + s(at, n),
					Content: a.text
				};
				return r(L, n, st).call(n, c).then(() => n.getCurrentField()).then((e) => {
					if (o = e?.FieldId || "", a.formatting.length) return $e.formatAfterInsert(a.formatting);
				}).then(() => o);
			} else {
				var l = {
					FieldId: "",
					Value: s(it, n) + t + s(at, n),
					Content: " "
				};
				return yield r(L, n, gt).call(n, l, e);
			}
		})();
	}
	addCitation(e, t, n) {
		var i = this;
		return a(function* () {
			var a = Ye.parseHtmlFormatting(e), o = {
				FieldId: "",
				Value: s(tt, i) + " " + s(rt, i) + t,
				Content: a.text
			}, c = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1);
			return c && (yield r(L, i, ct).call(i, n)), yield r(L, i, st).call(i, o), a.formatting.length ? (yield $e.formatAfterInsert(a.formatting), c && (yield r(L, i, mt).call(i)), c) : c;
		})();
	}
	getCurrentField() {
		return new Promise(function(e, t) {
			window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
		});
	}
	getAddinZoteroFields() {
		var e = this;
		return new Promise(function(t, n) {
			r(L, e, lt).call(e).then(function(r) {
				try {
					r.length && (r = r.filter(function(t) {
						return t.Value.indexOf(s(tt, e)) !== -1 || t.Value.indexOf(s(it, e)) !== -1 || t.Value.indexOf(s(et, e)) !== -1 || t.Value.indexOf(s(nt, e)) !== -1;
					}));
				} catch (e) {
					n(e);
				}
				t(r);
			});
		});
	}
	saveAsText() {
		return this.getAddinZoteroFields().then(function(e) {
			if (!e.length) return window.Asc.plugin.executeCommand("close", ""), !1;
			var t = e.map(function(e) {
				return new Promise(function(t) {
					window.Asc.plugin.executeMethod("RemoveFieldWrapper", [e.FieldId], t);
				});
			});
			return Promise.all(t).then(() => !0).catch((e) => (console.error(e), !1));
		});
	}
	updateAddinFields(e) {
		var t = this;
		return a(function* () {
			var n = e.map((e) => e.FieldId), i = window.Asc.scope.editorVersion, a = e.filter((e) => e.Value.indexOf(s(it, t)) === 0);
			if (a.length && i && i >= 9004e3) {
				e = e.filter((e) => e.Value.indexOf(s(it, t)) !== 0);
				var o = a[0];
				yield r(L, t, pt).call(t, o.FieldId);
				var c = o.Content || "";
				o.Content = " ", yield r(L, t, ft).call(t), yield r(L, t, gt).call(t, o, c);
			}
			var l = r(L, t, ut).call(t, e);
			if (yield new Promise((t) => {
				window.Asc.plugin.executeMethod("UpdateAddinFields", [e], t);
			}), !l.size) return n;
			for (var u of l) {
				var d = g(u, 2), f = d[0], p = d[1];
				(yield r(L, t, pt).call(t, f)) && (yield $e.formatAfterUpdate(f, p));
			}
			return n;
		})();
	}
	convertNotesToText(e) {
		var t = this;
		return a(function* () {
			for (var n = r(L, t, ut).call(t, e), i = 0; i < e.length; i++) {
				var a = e[i];
				if (!a.FieldId) {
					console.error("Field id is not defined");
					continue;
				}
				if ((yield r(L, t, pt).call(t, a.FieldId)) && (yield r(L, t, mt).call(t))) {
					yield r(L, t, ht).call(t), yield r(L, t, ft).call(t), yield r(L, t, st).call(t, a);
					var o = n.get(a.FieldId);
					o && (yield $e.formatAfterInsert(o.formatting));
				}
			}
		})();
	}
	convertTextToNotes(e, t) {
		var n = this;
		return a(function* () {
			for (var i = r(L, n, ut).call(n, e), a = 0; a < e.length; a++) {
				var o = e[a];
				if (o.FieldId && (yield r(L, n, pt).call(n, o.FieldId))) {
					yield r(L, n, ft).call(n), yield r(L, n, ct).call(n, t), yield r(L, n, st).call(n, o);
					var s = i.get(o.FieldId);
					s && (yield $e.formatAfterInsert(s.formatting));
				}
			}
		})();
	}
	convertNotesStyle(e, t) {
		var n = this;
		return a(function* () {
			for (var i = [], a = r(L, n, ut).call(n, e), o = 0; o < e.length; o++) {
				var s = e[o];
				if (s.FieldId) {
					if (!s.Content) {
						i.push(s);
						continue;
					}
					if ((yield r(L, n, pt).call(n, s.FieldId)) && (yield r(L, n, mt).call(n))) {
						yield r(L, n, ht).call(n), yield r(L, n, ft).call(n), yield r(L, n, ct).call(n, t), yield r(L, n, st).call(n, s);
						var c = a.get(s.FieldId);
						c && (yield $e.formatAfterInsert(c.formatting));
					}
				}
			}
			i.length && (yield new Promise(function(e) {
				window.Asc.plugin.executeMethod("UpdateAddinFields", [i], e);
			}));
		})();
	}
	moveCursorToField(e, t) {
		return a(function* () {
			return new Promise((n) => {
				t ??= !0, window.Asc.plugin.executeMethod("MoveCursorToField", [e, t], n);
			});
		})();
	}
	moveCursorOutsideField(e, t) {
		return a(function* () {
			return new Promise((n) => {
				t ??= !1, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [e, t], n);
			});
		})();
	}
	moveCursorRight() {
		return a(function* () {
			return new Promise((e) => {
				Asc.plugin.callCommand(() => {
					Api.GetDocument().MoveCursorRight(1, !1);
				}, !1, !0, e);
			});
		})();
	}
};
function st(e) {
	return new Promise(function(t) {
		window.Asc.plugin.executeMethod("AddAddinField", [e], t);
	});
}
function ct(e) {
	return Asc.scope.notesStyle = e, new Promise((e) => {
		Asc.plugin.callCommand(() => {
			var e = Api.GetDocument();
			Asc.scope.notesStyle === "footnotes" ? e.AddFootnote() : Asc.scope.notesStyle === "endnotes" && e.AddEndnote();
		}, !1, !1, e);
	});
}
function lt() {
	return new Promise(function(e, t) {
		window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
	});
}
function ut(e) {
	var t = /* @__PURE__ */ new Map();
	return e.forEach(function(e) {
		if (e.Content) {
			var n = Ye.parseHtmlFormatting(e.Content);
			e.Content = n.text, n.formatting.length && e.FieldId && t.set(e.FieldId, n);
		}
	}), t;
}
function dt(e) {
	return new Promise(function(t) {
		window.Asc.plugin.executeMethod("PasteHtml", [e], t);
	});
}
function ft() {
	return new Promise((e) => {
		window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
	});
}
function pt(e) {
	return new Promise(function(t) {
		window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
	});
}
function mt() {
	return new Promise(function(e) {
		Asc.plugin.callCommand(() => {
			var e = Api.GetDocument().GetCurrentFootEndnote();
			e && e.SelectNoteReference();
		}, !1, !0, () => e(!0));
	});
}
function ht() {
	return new Promise(function(e) {
		Asc.plugin.callCommand(() => {
			var e = Api.GetDocument().GetRangeBySelect();
			e && e.SetVertAlign("baseline");
		}, !1, !1, e);
	});
}
function gt(e, t) {
	return _t.apply(this, arguments);
}
function _t() {
	return _t = a(function* (e, t) {
		if (t = Ye.purifyHtml(t), yield r(L, this, st).call(this, e), yield new Promise((e) => {
			Asc.plugin.callCommand(() => {
				Api.GetDocument().MoveCursorLeft(1, !0);
			}, !1, !0, e);
		}), !Asc.scope.bibStyle) throw "Bibliography style is not defined";
		var n = new DOMParser().parseFromString(t, "text/html"), i = n.querySelectorAll(".csl-entry"), a = Array(i.length), o = Date.now().toString(36);
		i.forEach((e, t) => {
			var n = e.querySelector(".csl-left-margin"), r = e.querySelector(".csl-right-inline");
			if (r?.replaceWith(...r.childNodes), n) {
				a[t] = n.textContent.trim() + o;
				for (var i = document.createElement("em"); n.firstChild;) i.appendChild(n.firstChild);
				var s = document.createElement("span");
				s.textContent = o, i.appendChild(s), n.replaceWith(i);
			}
			for (var c = document.createElement("p"); e.firstChild;) c.appendChild(e.firstChild);
			e.replaceWith(c);
		}), t = n.body.innerHTML, yield r(L, this, dt).call(this, t);
		var s = yield this.getCurrentField();
		if (!s) {
			console.warn("Failed to get current field after paste");
			for (var c = 0; c < 5 && (yield new Promise((e) => {
				setTimeout(() => {
					e(!0);
				}, 100);
			}), s = yield this.getCurrentField(), !s); c++);
			if (!s) throw Error("Failed to get current field after paste");
		}
		return yield r(L, this, pt).call(this, s.FieldId), yield new Promise((e) => {
			var t = !1, n = !1;
			Asc.scope.numbers = a, Asc.scope.hash = o, Asc.plugin.callCommand(() => {
				var e = Api.GetDocument().GetRangeBySelect();
				if (e) {
					var t = Asc.scope.bibStyle;
					e.GetAllParagraphs().forEach((e, n) => {
						if (e.GetText().trim() !== "") if (typeof t.linespacing == "number" && e.SetSpacingLine(240 * t.linespacing, "exact"), typeof t.entryspacing == "number" && e.SetSpacingAfter(240 * t.entryspacing), t["second-field-align"]) {
							for (var r = String(Asc.scope.numbers[n]), i = 0; i < e.GetElementsCount(); i++) {
								var a = e.GetElement(i);
								if (!(!a || typeof a.GetText != "function") && a.GetText() === r) {
									a.AddTabStop(), a.SetItalic(!1);
									break;
								}
							}
							var o = e.Search(Asc.scope.hash, !0)[0];
							if (!o) return;
							o.Delete(), e.SetIndLeft(t.maxoffset * 120), e.SetIndFirstLine(-(t.maxoffset * 120));
						} else t.hangingindent && (e.SetIndLeft(720), e.SetIndFirstLine(-720));
					});
				}
			}, n, t, e);
		}), Asc.scope.bibStyle = null, s.FieldId;
	}), _t.apply(this, arguments);
}
//#endregion
//#region src/app/csl/citation/storage.js
var R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), vt = /*#__PURE__*/ new WeakSet(), yt = class {
	constructor() {
		u(this, vt), c(this, R, void 0), c(this, z, void 0), c(this, B, void 0), l(R, this, []), l(z, this, []), l(B, this, []), this.size = 0;
	}
	getItem(e) {
		e = e.toString();
		var t = s(z, this).indexOf(e);
		return t >= 0 ? s(R, this)[t] : null;
	}
	getItemIndex(e) {
		return e = e.toString(), s(z, this).indexOf(e);
	}
	clear() {
		return l(R, this, []), l(B, this, []), l(z, this, []), this.size = 0, this;
	}
	deleteItem(e) {
		e = e.toString();
		var t = s(z, this).indexOf(e);
		return t >= 0 && (s(R, this).splice(t, 1), s(z, this).splice(t, 1), this.size--), this;
	}
	forEachItem(e) {
		for (var t = 0; t < this.size; t++) e(s(R, this)[t], s(z, this)[t], this);
	}
	hasItem(e) {
		return e = e.toString(), s(z, this).indexOf(e) >= 0;
	}
	addCslCitation(e) {
		return s(B, this).push(e), e.setNoteIndex(s(B, this).length), e.getCitationItems().forEach((e) => {
			r(vt, this, bt).call(this, e.id, e);
		}), this;
	}
	getAllCitationsInJson() {
		return s(B, this).map((e) => e.toJSON());
	}
	getCitation(e) {
		return s(B, this).find((t) => t.citationID === e);
	}
	getCitationIndex(e) {
		return s(B, this).findIndex((t) => t.citationID === e);
	}
	getCitationsPre(e) {
		var t = [];
		return s(B, this).find((n, r) => n.citationID === e ? !0 : (t.push([n.citationID, r + 1]), !1)), t;
	}
	getCitationsPost(e) {
		for (var t = [], n = this.getCitationIndex(e) + 1; n < s(B, this).length; n++) {
			var r = s(B, this)[n];
			t.push([r.citationID, n + 1]);
		}
		return t;
	}
};
function bt(e, t) {
	e = e.toString();
	var n = s(z, this).indexOf(e);
	return n >= 0 ? (s(R, this)[n] = t, this) : (s(R, this).push(t), s(z, this).push(e), this.size++, this);
}
//#endregion
//#region src/app/csl/citation/citation-item-data.js
function V(e) {
	if (typeof e != "string" && typeof e != "number") throw Error("CitationItemData: id is required");
	this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = [], this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = [], this._chair = [], this._collectionEditor = [], this._compiler = [], this._composer = [], this._containerAuthor = [], this._contributor = [], this._curator = [], this._director = [], this._editor = [], this._editorialDirector = [], this._executiveProducer = [], this._guest = [], this._host = [], this._illustrator = [], this._narrator = [], this._organizer = [], this._originalAuthor = [], this._performer = [], this._producer = [], this._recipient = [], this._reviewedAuthor = [], this._scriptwriter = [], this._seriesCreator = [], this._translator = [], this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
V.prototype._addCustomProperty = function(e, t) {
	return this._custom[e] = t, this;
}, V.prototype.getCustomProperty = function(e) {
	return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
}, V.prototype.fillFromObject = function(e) {
	if (Object.hasOwnProperty.call(e, "type") && (this._type = e.type), Object.hasOwnProperty.call(e, "categories") && (this._categories = e.categories), Object.hasOwnProperty.call(e, "citation-key") && (this._citationKey = e["citation-key"]), Object.hasOwnProperty.call(e, "language") && (this._language = e.language), Object.hasOwnProperty.call(e, "journalAbbreviation") && (this._journalAbbreviation = e.journalAbbreviation), Object.hasOwnProperty.call(e, "shortTitle") && (this._shortTitle = e.shortTitle), Object.hasOwnProperty.call(e, "author") && (this._author = e.author), Object.hasOwnProperty.call(e, "chair") && (this._chair = e.chair), Object.hasOwnProperty.call(e, "collection-editor") && (this._collectionEditor = e["collection-editor"]), Object.hasOwnProperty.call(e, "compiler") && (this._compiler = e.compiler), Object.hasOwnProperty.call(e, "composer") && (this._composer = e.composer), Object.hasOwnProperty.call(e, "container-author") && (this._containerAuthor = e["container-author"]), Object.hasOwnProperty.call(e, "contributor") && (this._contributor = e.contributor), Object.hasOwnProperty.call(e, "curator") && (this._curator = e.curator), Object.hasOwnProperty.call(e, "director") && (this._director = e.director), Object.hasOwnProperty.call(e, "editorial-director") && (this._editorialDirector = e["editorial-director"]), Object.hasOwnProperty.call(e, "editor") && (this._editor = e.editor), Object.hasOwnProperty.call(e, "executive-producer") && (this._executiveProducer = e["executive-producer"]), Object.hasOwnProperty.call(e, "guest") && (this._guest = e.guest), Object.hasOwnProperty.call(e, "host") && (this._host = e.host), Object.hasOwnProperty.call(e, "illustrator") && (this._illustrator = e.illustrator), Object.hasOwnProperty.call(e, "narrator") && (this._narrator = e.narrator), Object.hasOwnProperty.call(e, "organizer") && (this._organizer = e.organizer), Object.hasOwnProperty.call(e, "original-author") && (this._originalAuthor = e["original-author"]), Object.hasOwnProperty.call(e, "performer") && (this._performer = e.performer), Object.hasOwnProperty.call(e, "producer") && (this._producer = e.producer), Object.hasOwnProperty.call(e, "recipient") && (this._recipient = e.recipient), Object.hasOwnProperty.call(e, "reviewed-author") && (this._reviewedAuthor = e["reviewed-author"]), Object.hasOwnProperty.call(e, "script-writer") && (this._scriptWriter = e["script-writer"]), Object.hasOwnProperty.call(e, "series-creator") && (this._seriesCreator = e["series-creator"]), Object.hasOwnProperty.call(e, "translator") && (this._translator = e.translator), Object.hasOwnProperty.call(e, "accessed") && (this._accessed = e.accessed), Object.hasOwnProperty.call(e, "container") && (this._container = e.container), Object.hasOwnProperty.call(e, "event-date") && (this._eventDate = e["event-date"]), Object.hasOwnProperty.call(e, "issued") && (this._issued = e.issued), Object.hasOwnProperty.call(e, "original-date") && (this._originalDate = e["original-date"]), Object.hasOwnProperty.call(e, "submitted") && (this._submitted = e.submitted), Object.hasOwnProperty.call(e, "abstract") && (this._abstract = e.abstract), Object.hasOwnProperty.call(e, "annote") && (this._annote = e.annote), Object.hasOwnProperty.call(e, "archive") && (this._archive = e.archive), Object.hasOwnProperty.call(e, "archive_collection") && (this._archiveCollection = e.archive_collection), Object.hasOwnProperty.call(e, "archive_location") && (this._archiveLocation = e.archive_location), Object.hasOwnProperty.call(e, "archive-place") && (this._archivePlace = e["archive-place"]), Object.hasOwnProperty.call(e, "authority") && (this._authority = e.authority), Object.hasOwnProperty.call(e, "call-number") && (this._callNumber = e["call-number"]), Object.hasOwnProperty.call(e, "chapter-number") && (this._chapterNumber = e["chapter-number"]), Object.hasOwnProperty.call(e, "citation-number") && (this._citationNumber = e["citation-number"]), Object.hasOwnProperty.call(e, "citation-label") && (this._citationLabel = e["citation-label"]), Object.hasOwnProperty.call(e, "collection-number") && (this._collectionNumber = e["collection-number"]), Object.hasOwnProperty.call(e, "collection-title") && (this._collectionTitle = e["collection-title"]), Object.hasOwnProperty.call(e, "container-title") && (this._containerTitle = e["container-title"]), Object.hasOwnProperty.call(e, "container-title-short") && (this._containerTitleShort = e["container-title-short"]), Object.hasOwnProperty.call(e, "dimensions") && (this._dimensions = e.dimensions), Object.hasOwnProperty.call(e, "DOI") && (this._DOI = e.DOI), Object.hasOwnProperty.call(e, "edition") && (this._edition = e.edition), Object.hasOwnProperty.call(e, "event") && (this._event = e.event), Object.hasOwnProperty.call(e, "event-title") && (this._eventTitle = e["event-title"]), Object.hasOwnProperty.call(e, "event-place") && (this._eventPlace = e["event-place"]), Object.hasOwnProperty.call(e, "first-reference-note-number") && (this._firstReferenceNoteNumber = e["first-reference-note-number"]), Object.hasOwnProperty.call(e, "genre") && (this._genre = e.genre), Object.hasOwnProperty.call(e, "ISBN") && (this._ISBN = e.ISBN), Object.hasOwnProperty.call(e, "ISSN") && (this._ISSN = e.ISSN), Object.hasOwnProperty.call(e, "issue") && (this._issue = e.issue), Object.hasOwnProperty.call(e, "jurisdiction") && (this._jurisdiction = e.jurisdiction), Object.hasOwnProperty.call(e, "keyword") && (this._keyword = e.keyword), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "medium") && (this._medium = e.medium), Object.hasOwnProperty.call(e, "note") && (this._note = e.note), Object.hasOwnProperty.call(e, "number") && (this._number = e.number), Object.hasOwnProperty.call(e, "number-of-pages") && (this._numberOfPages = e["number-of-pages"]), Object.hasOwnProperty.call(e, "number-of-volumes") && (this._numberOfVolumes = e["number-of-volumes"]), Object.hasOwnProperty.call(e, "original-publisher") && (this._originalPublisher = e["original-publisher"]), Object.hasOwnProperty.call(e, "original-publisher-place") && (this._originalPublisherPlace = e["original-publisher-place"]), Object.hasOwnProperty.call(e, "original-title") && (this._originalTitle = e["original-title"]), Object.hasOwnProperty.call(e, "page") && (this._page = e.page), Object.hasOwnProperty.call(e, "page-first") && (this._pageFirst = e["page-first"]), Object.hasOwnProperty.call(e, "part") && (this._part = e.part), Object.hasOwnProperty.call(e, "part-title") && (this._partTitle = e["part-title"]), Object.hasOwnProperty.call(e, "PMCID") && (this._PMCID = e.PMCID), Object.hasOwnProperty.call(e, "PMID") && (this._PMID = e.PMID), Object.hasOwnProperty.call(e, "printing") && (this._printing = e.printing), Object.hasOwnProperty.call(e, "publisher") && (this._publisher = e.publisher), Object.hasOwnProperty.call(e, "publisher-place") && (this._publisherPlace = e["publisher-place"]), Object.hasOwnProperty.call(e, "references") && (this._references = e.references), Object.hasOwnProperty.call(e, "reviewed-genre") && (this._reviewedGenre = e["reviewed-genre"]), Object.hasOwnProperty.call(e, "reviewed-title") && (this._reviewedTitle = e["reviewed-title"]), Object.hasOwnProperty.call(e, "scale") && (this._scale = e.scale), Object.hasOwnProperty.call(e, "section") && (this._section = e.section), Object.hasOwnProperty.call(e, "source") && (this._source = e.source), Object.hasOwnProperty.call(e, "status") && (this._status = e.status), Object.hasOwnProperty.call(e, "title") && (this._title = e.title), Object.hasOwnProperty.call(e, "title-short") && (this._titleShort = e["title-short"]), Object.hasOwnProperty.call(e, "URL") && (this._URL = e.URL), Object.hasOwnProperty.call(e, "version") && (this._version = e.version), Object.hasOwnProperty.call(e, "volume") && (this._volume = e.volume), Object.hasOwnProperty.call(e, "volume-title") && (this._volumeTitle = e["volume-title"]), Object.hasOwnProperty.call(e, "volume-title-short") && (this._volumeTitleShort = e["volume-title-short"]), Object.hasOwnProperty.call(e, "year-suffix") && (this._yearSuffix = e["year-suffix"]), Object.hasOwnProperty.call(e, "custom") && (this._custom = e.custom), Object.hasOwnProperty.call(e, "userID") && this._addCustomProperty("userID", e.userID), Object.hasOwnProperty.call(e, "groupID") && this._addCustomProperty("groupID", e.groupID), Object.hasOwnProperty.call(e, "creators")) {
		var t = this;
		e.creators.forEach(function(e) {
			var n = {};
			e.firstName && (n.given = e.firstName), e.lastName && (n.family = e.lastName), !t._author.some(function(e) {
				return !(e.family !== n.family && (e.family || n.family) || e.given !== n.given && (e.given || n.given));
			}) && t._author.push(n);
		}, this);
	}
	Object.hasOwnProperty.call(e, "libraryCatalog") && (this._source = e.libraryCatalog), Object.hasOwnProperty.call(e, "place") && (this._eventPlace = e.place, this._publisherPlace = e.place), Object.hasOwnProperty.call(e, "numberOfVolumes") && (this._numberOfVolumes = e.numberOfVolumes), Object.hasOwnProperty.call(e, "callNumber") && (this._callNumber = e.callNumber), Object.hasOwnProperty.call(e, "seriesNumber") && (this._collectionNumber = e.seriesNumber), Object.hasOwnProperty.call(e, "series") && (this._collectionTitle = e.series), Object.hasOwnProperty.call(e, "bookTitle") && (this._containerTitle = e.bookTitle), Object.hasOwnProperty.call(e, "extra") && (this._note = e.extra), Object.hasOwnProperty.call(e, "rights") && (this._license = e.rights), Object.hasOwnProperty.call(e, "archiveLocation") && (this._archiveLocation = e.archiveLocation), Object.hasOwnProperty.call(e, "abstractNote") && (this._abstract = e.abstractNote);
}, V.prototype.getTitle = function() {
	return this._title;
}, V.prototype.getType = function() {
	return this._type;
}, V.prototype.setType = function(e) {
	return this._type = e, this;
}, V.prototype.setCitationKey = function(e) {
	return this._citationKey = e, this;
}, V.prototype.setCategories = function(e) {
	return this._categories = e, this;
}, V.prototype.setLanguage = function(e) {
	return this._language = e, this;
}, V.prototype.setJournalAbbreviation = function(e) {
	return this._journalAbbreviation = e, this;
}, V.prototype.setShortTitle = function(e) {
	return this._shortTitle = e, this;
}, V.prototype.setAuthor = function(e) {
	return this._author = Array.isArray(e) ? e : [e], this;
}, V.prototype.setChair = function(e) {
	return this._chair = Array.isArray(e) ? e : [e], this;
}, V.prototype.setCollectionEditor = function(e) {
	return this._collectionEditor = Array.isArray(e) ? e : [e], this;
}, V.prototype.setCompiler = function(e) {
	return this._compiler = Array.isArray(e) ? e : [e], this;
}, V.prototype.setComposer = function(e) {
	return this._composer = Array.isArray(e) ? e : [e], this;
}, V.prototype.setContainerAuthor = function(e) {
	return this._containerAuthor = Array.isArray(e) ? e : [e], this;
}, V.prototype.setContributor = function(e) {
	return this._contributor = Array.isArray(e) ? e : [e], this;
}, V.prototype.setCurator = function(e) {
	return this._curator = Array.isArray(e) ? e : [e], this;
}, V.prototype.setDirector = function(e) {
	return this._director = Array.isArray(e) ? e : [e], this;
}, V.prototype.setEditor = function(e) {
	return this._editor = Array.isArray(e) ? e : [e], this;
}, V.prototype.setEditorialDirector = function(e) {
	return this._editorialDirector = Array.isArray(e) ? e : [e], this;
}, V.prototype.setExecutiveProducer = function(e) {
	return this._executiveProducer = Array.isArray(e) ? e : [e], this;
}, V.prototype.setGuest = function(e) {
	return this._guest = Array.isArray(e) ? e : [e], this;
}, V.prototype.setHost = function(e) {
	return this._host = Array.isArray(e) ? e : [e], this;
}, V.prototype.setIllustrator = function(e) {
	return this._illustrator = Array.isArray(e) ? e : [e], this;
}, V.prototype.setNarrator = function(e) {
	return this._narrator = Array.isArray(e) ? e : [e], this;
}, V.prototype.setOrganizer = function(e) {
	return this._organizer = Array.isArray(e) ? e : [e], this;
}, V.prototype.setOriginalAuthor = function(e) {
	return this._originalAuthor = Array.isArray(e) ? e : [e], this;
}, V.prototype.setPerformer = function(e) {
	return this._performer = Array.isArray(e) ? e : [e], this;
}, V.prototype.setProducer = function(e) {
	return this._producer = Array.isArray(e) ? e : [e], this;
}, V.prototype.setRecipient = function(e) {
	return this._recipient = Array.isArray(e) ? e : [e], this;
}, V.prototype.setReviewedAuthor = function(e) {
	return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
}, V.prototype.setScriptwriter = function(e) {
	return this._scriptwriter = Array.isArray(e) ? e : [e], this;
}, V.prototype.setSeriesCreator = function(e) {
	return this._seriesCreator = Array.isArray(e) ? e : [e], this;
}, V.prototype.setTranslator = function(e) {
	return this._translator = Array.isArray(e) ? e : [e], this;
}, V.prototype.setAccessed = function(e) {
	return this._accessed = e || {}, this;
}, V.prototype.setContainer = function(e) {
	return this._container = e || {}, this;
}, V.prototype.setEventDate = function(e) {
	return this._eventDate = e || {}, this;
}, V.prototype.setIssued = function(e) {
	return this._issued = e || {}, this;
}, V.prototype.setOriginalDate = function(e) {
	return this._originalDate = e || {}, this;
}, V.prototype.setSubmitted = function(e) {
	return this._submitted = e || {}, this;
}, V.prototype.setAbstract = function(e) {
	return this._abstract = e, this;
}, V.prototype.setAnnote = function(e) {
	return this._annote = e, this;
}, V.prototype.setArchive = function(e) {
	return this._archive = e, this;
}, V.prototype.setArchiveCollection = function(e) {
	return this._archiveCollection = e, this;
}, V.prototype.setArchiveLocation = function(e) {
	return this._archiveLocation = e, this;
}, V.prototype.setArchivePlace = function(e) {
	return this._archivePlace = e, this;
}, V.prototype.setAuthority = function(e) {
	return this._authority = e, this;
}, V.prototype.setCallNumber = function(e) {
	return this._callNumber = e, this;
}, V.prototype.setChapterNumber = function(e) {
	return this._chapterNumber = e, this;
}, V.prototype.setCitationNumber = function(e) {
	return this._citationNumber = e, this;
}, V.prototype.setCitationLabel = function(e) {
	return this._citationLabel = e, this;
}, V.prototype.setCollectionNumber = function(e) {
	return this._collectionNumber = e, this;
}, V.prototype.setCollectionTitle = function(e) {
	return this._collectionTitle = e, this;
}, V.prototype.setContainerTitle = function(e) {
	return this._containerTitle = e, this;
}, V.prototype.setContainerTitleShort = function(e) {
	return this._containerTitleShort = e, this;
}, V.prototype.setDimensions = function(e) {
	return this._dimensions = e, this;
}, V.prototype.setDOI = function(e) {
	return this._DOI = e, this;
}, V.prototype.setEdition = function(e) {
	return this._edition = e, this;
}, V.prototype.setEvent = function(e) {
	return this._event = e, this;
}, V.prototype.setEventTitle = function(e) {
	return this._eventTitle = e, this;
}, V.prototype.setEventPlace = function(e) {
	return this._eventPlace = e, this;
}, V.prototype.setFirstReferenceNoteNumber = function(e) {
	return this._firstReferenceNoteNumber = e, this;
}, V.prototype.setGenre = function(e) {
	return this._genre = e, this;
}, V.prototype.setISBN = function(e) {
	return this._ISBN = e, this;
}, V.prototype.setISSN = function(e) {
	return this._ISSN = e, this;
}, V.prototype.setIssue = function(e) {
	return this._issue = e, this;
}, V.prototype.setJurisdiction = function(e) {
	return this._jurisdiction = e, this;
}, V.prototype.setKeyword = function(e) {
	return this._keyword = e, this;
}, V.prototype.setLocator = function(e) {
	return this._locator = e, this;
}, V.prototype.setMedium = function(e) {
	return this._medium = e, this;
}, V.prototype.setNote = function(e) {
	return this._note = e, this;
}, V.prototype.setNumber = function(e) {
	return this._number = e, this;
}, V.prototype.setNumberOfPages = function(e) {
	return this._numberOfPages = e, this;
}, V.prototype.setNumberOfVolumes = function(e) {
	return this._numberOfVolumes = e, this;
}, V.prototype.setOriginalPublisher = function(e) {
	return this._originalPublisher = e, this;
}, V.prototype.setOriginalPublisherPlace = function(e) {
	return this._originalPublisherPlace = e, this;
}, V.prototype.setOriginalTitle = function(e) {
	return this._originalTitle = e, this;
}, V.prototype.setPage = function(e) {
	return this._page = e, this;
}, V.prototype.setPageFirst = function(e) {
	return this._pageFirst = e, this;
}, V.prototype.setPart = function(e) {
	return this._part = e, this;
}, V.prototype.setPartTitle = function(e) {
	return this._partTitle = e, this;
}, V.prototype.setPMCID = function(e) {
	return this._PMCID = e, this;
}, V.prototype.setPMID = function(e) {
	return this._PMID = e, this;
}, V.prototype.setPrinting = function(e) {
	return this._printing = e, this;
}, V.prototype.setPublisher = function(e) {
	return this._publisher = e, this;
}, V.prototype.setPublisherPlace = function(e) {
	return this._publisherPlace = e, this;
}, V.prototype.setReferences = function(e) {
	return this._references = e, this;
}, V.prototype.setReviewedGenre = function(e) {
	return this._reviewedGenre = e, this;
}, V.prototype.setReviewedTitle = function(e) {
	return this._reviewedTitle = e, this;
}, V.prototype.setScale = function(e) {
	return this._scale = e, this;
}, V.prototype.setSection = function(e) {
	return this._section = e, this;
}, V.prototype.setSource = function(e) {
	return this._source = e, this;
}, V.prototype.setStatus = function(e) {
	return this._status = e, this;
}, V.prototype.setTitle = function(e) {
	return this._title = e, this;
}, V.prototype.setTitleShort = function(e) {
	return this._titleShort = e, this;
}, V.prototype.setURL = function(e) {
	return this._URL = e, this;
}, V.prototype.setVersion = function(e) {
	return this._version = e, this;
}, V.prototype.setVolume = function(e) {
	return this._volume = e, this;
}, V.prototype.setVolumeTitle = function(e) {
	return this._volumeTitle = e, this;
}, V.prototype.setVolumeTitleShort = function(e) {
	return this._volumeTitleShort = e, this;
}, V.prototype.setYearSuffix = function(e) {
	return this._yearSuffix = e, this;
}, V.prototype.setCustom = function(e) {
	return this._custom = Object.assign(this._custom, e), this;
}, V.prototype.toJSON = function(e) {
	var t = {};
	return t.id = this._id, this._type !== void 0 && this._type !== "" && (t.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), this._language !== void 0 && this._language !== "" && (t.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (t.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (t.shortTitle = this._shortTitle, this._titleShort === void 0 && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (t.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (t.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (t.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (t.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (t.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (t["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (t.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (t["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (t["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (t["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (t["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (t["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (t["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (t["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (t["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (t.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (t.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (t.edition = this._edition), this._event !== void 0 && this._event !== "" && (t.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (t["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (t["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (t.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (t.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (t.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (t.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (t.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (t.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (t.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (t.medium = this._medium), this._note !== void 0 && this._note !== "" && (t.note = this._note), this._number !== void 0 && this._number !== "" && (t.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (t["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (t["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (t["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (t["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (t["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (t.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (t["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (t.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (t["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (t.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (t.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (t.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (t.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (t["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (t.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (t["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (t["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (t.scale = this._scale), this._section !== void 0 && this._section !== "" && (t.section = this._section), this._source !== void 0 && this._source !== "" && (t.source = this._source), this._status !== void 0 && this._status !== "" && (t.status = this._status), this._title !== void 0 && this._title !== "" && (t.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (t["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (t.URL = this._URL), this._version !== void 0 && this._version !== "" && (t.version = this._version), this._volume !== void 0 && this._volume !== "" && (t.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (t["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (t["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (t["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0 && (t.custom = this._custom), this._license !== void 0 && this._license !== "" && (t.license = this._license), t;
};
//#endregion
//#region src/app/csl/citation/citation-item.js
function H(e) {
	if (typeof e != "string" && typeof e != "number") throw Error("CitationItem: id is required");
	this.id = e, this._itemData = new V(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = [];
}
H.prototype.fillFromObject = function(e) {
	var t = this;
	Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(e) {
		t.addUri(e);
	}, this);
}, H.prototype.getInfoForCitationCluster = function() {
	var e = {
		id: this.id,
		"suppress-author": this._suppressAuthor
	};
	return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
}, H.prototype.getItemData = function() {
	return this._itemData;
}, H.prototype.getProperty = function(e) {
	return this._itemData.getCustomProperty(e) === null ? null : this._itemData.getCustomProperty(e);
}, H.prototype.setPrefix = function(e) {
	return this._prefix = e, this;
}, H.prototype.setSuffix = function(e) {
	return this._suffix = e, this;
}, H.prototype.setLocator = function(e) {
	return this._locator = e, this;
}, H.prototype.setLabel = function(e) {
	if (e) {
		if ((/* @__PURE__ */ "act.appendix.article-locator.book.canon.chapter.column.elocation.equation.figure.folio.issue.line.note.opus.page.paragraph.part.rule.scene.section.sub-verbo.supplement.table.timestamp.title-locator.verse.version.volume".split(".")).indexOf(e) === -1) throw Error("CitationItem.setLocator: Invalid label \"" + e + "\"");
		this._label = e;
	}
	return this;
}, H.prototype.setSuppressAuthor = function(e) {
	return this._suppressAuthor = e, this;
}, H.prototype.setAuthorOnly = function(e) {
	return this._authorOnly = e, this;
}, H.prototype.addUri = function(e) {
	return this._uris.indexOf(e) === -1 && this._uris.push(e), this;
}, H.prototype.toJSON = function(e) {
	var t = {};
	return t.id = this.id, this._itemData && (t.itemData = this._itemData.toJSON ? this._itemData.toJSON(e || !1) : this._itemData), this._prefix !== void 0 && (t.prefix = this._prefix), this._suffix !== void 0 && (t.suffix = this._suffix), this._locator !== void 0 && (t.locator = this._locator), this._label !== void 0 && (t.label = this._label), this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (t["author-only"] = this._authorOnly), this._uris.length && (t.uris = this._uris), t;
}, H.prototype.toFlatJSON = function(e) {
	var t = {
		id: this.id,
		index: e
	};
	this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor);
	var n = this._itemData.toJSON();
	return Object.assign(t, n), this._itemData.getCustomProperty("userID") !== void 0 && this._itemData.getCustomProperty("userID") !== null && (t.userID = String(this._itemData.getCustomProperty("userID"))), this._itemData.getCustomProperty("groupID") !== void 0 && this._itemData.getCustomProperty("groupID") !== null && (t.groupID = String(this._itemData.getCustomProperty("groupID"))), t;
};
//#endregion
//#region src/app/csl/citation/citation.js
var U = /*#__PURE__*/ new WeakSet(), xt = class {
	constructor(e) {
		u(this, U), e ||= r(U, this, kt).call(this), At._.has(e) && (console.warn("Citation ID must be unique"), e = r(U, this, kt).call(this)), At._.add(e), this.citationID = e, this._citationItems = [], this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
	}
	static resetUsedIDs() {
		At._ = /* @__PURE__ */ new Set();
	}
	fillFromObject(e) {
		return Object.hasOwnProperty.call(e, "properties") || Object.hasOwnProperty.call(e, "manualOverride") || Object.hasOwnProperty.call(e, "schema") ? r(U, this, St).call(this, e) : Object.hasOwnProperty.call(e, "citationItems") ? r(U, this, Ct).call(this, e) : Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? r(U, this, Tt).call(this, e) : r(U, this, wt).call(this, e);
	}
	getCitationItems() {
		return this._citationItems;
	}
	getDoNotUpdate() {
		return Object.hasOwnProperty.call(this._properties, "dontUpdate") ? !!this._properties.dontUpdate : Object.hasOwnProperty.call(this._manualOverride, "isManuallyOverridden") ? !!this._manualOverride.isManuallyOverridden : !1;
	}
	getInfoForCitationCluster() {
		return this._citationItems.map(function(e) {
			return e.getInfoForCitationCluster();
		}, this);
	}
	getPlainCitation() {
		return Object.hasOwnProperty.call(this._properties, "plainCitation") ? String(this._properties.plainCitation) : this._manualOverride && Object.keys(this._manualOverride).length > 0 ? String(this._manualOverride.citeprocText) : "";
	}
	setDoNotUpdate() {
		return r(U, this, Dt).call(this, { dontUpdate: !0 }), this;
	}
	setNoteIndex(e) {
		return r(U, this, Dt).call(this, { noteIndex: e }), this;
	}
	setPlainCitation(e) {
		return r(U, this, Dt).call(this, { plainCitation: e }), this;
	}
	setManualOverride(e, t) {
		var n = {
			citeprocText: e,
			isManuallyOverridden: !!t,
			manualOverrideText: t || ""
		};
		return this._manualOverride = n, this;
	}
	validate() {
		var e = [];
		if (this._schema || e.push("Schema is required"), this.citationID || e.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems)) for (var t = 0; t < this._citationItems.length; t++) this._citationItems[t].id || e.push("Citation item at index " + t + " must have an id");
		return e.length === 0 ? !0 : e;
	}
	toJSON() {
		var e = {
			citationID: this.citationID,
			schema: this._schema
		};
		return this._properties && Object.keys(this._properties).length > 0 && (e.properties = this._properties), this._manualOverride && Object.keys(this._manualOverride).length > 0 && (e.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (e.citationItems = this._citationItems.map(function(e) {
			return e.toJSON();
		})), e;
	}
};
function St(e) {
	var t = this;
	if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && r(U, this, Dt).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems")) return console.error("citationItems is empty"), 0;
	var n = this._citationItems.map(function(e) {
		return e.id;
	});
	return e.citationItems.forEach(function(e) {
		var i = e.id, a;
		n.indexOf(i) >= 0 ? a = t._citationItems[n.indexOf(i)] : (a = new H(i), n.push(i)), typeof i == "number" && (i = r(U, t, Ot).call(t, e)), a.fillFromObject(e), r(U, t, Et).call(t, a);
	}, this), n.length;
}
function Ct(e) {
	var t = this;
	return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(e) {
		r(U, t, wt).call(t, e);
	}, this), 1);
}
function wt(e) {
	var t = e.id, n, i = this._citationItems.map(function(e) {
		return e.id;
	});
	return n = i.indexOf(t) >= 0 ? this._citationItems[i.indexOf(t)] : new H(t), n.fillFromObject(e), r(U, this, Et).call(this, n), 1;
}
function Tt(e) {
	if (!Object.hasOwnProperty.call(e, "data")) return console.error("Invalid citation object"), 0;
	var t = this._citationItems.map(function(e) {
		return e.id;
	}), n = e.data.key, i = t.indexOf(n) >= 0 ? this._citationItems[t.indexOf(n)] : new H(n);
	return i.fillFromObject(e), r(U, this, Et).call(this, i), 1;
}
function Et(e) {
	var t = this._citationItems.map(function(e) {
		return e.id;
	});
	return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
}
function Dt(e) {
	var t = this;
	return Object.keys(e).forEach(function(n) {
		Object.hasOwnProperty.call(e, n) && (t._properties[n] = e[n]);
	}, this), this;
}
function Ot(e) {
	if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
		var t = e.uris[0].lastIndexOf("/");
		return e.uris[0].slice(t + 1);
	}
	return e.id;
}
function kt() {
	return Math.random().toString(36).substring(2, 15);
}
var At = { _: /* @__PURE__ */ new Set() }, W = /*#__PURE__*/ new WeakMap(), jt = /*#__PURE__*/ new WeakMap(), Mt = /*#__PURE__*/ new WeakMap(), Nt = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakSet(), Pt = class {
	constructor() {
		u(this, G), c(this, W, void 0), c(this, jt, void 0), c(this, Mt, void 0), c(this, Nt, void 0), l(W, this, null), l(jt, this, window.Asc.plugin.button), l(Mt, this, Asc.plugin.onThemeChanged), l(Nt, this, Asc.plugin.onTranslate);
	}
	show(e, t) {
		s(W, this) && r(G, this, It).call(this), l(W, this, new window.Asc.PluginWindow());
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
		return r(G, this, Ft).call(this, n, t, "default"), s(W, this).show(n), new Promise((e, t) => {
			window.Asc.plugin.button = (t, n) => {
				e(t === 0), r(G, this, It).call(this);
			};
		});
	}
	showEditWindow(e) {
		var t = this;
		s(W, this) && r(G, this, It).call(this), l(W, this, new window.Asc.PluginWindow());
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
		return r(G, this, Ft).call(this, n, e, "default"), s(W, this).show(n), new Promise((e, n) => {
			window.Asc.plugin.button = /*#__PURE__*/ function() {
				var n = a(function* (n, i) {
					var a = yield new Promise((e) => {
						if (!s(W, t)) {
							e(null);
							return;
						}
						s(W, t).attachEvent("onSaveFields", e), s(W, t).command("onClickSave");
					});
					e(n === 0 ? a : null), r(G, t, It).call(t);
				});
				return function(e, t) {
					return n.apply(this, arguments);
				};
			}();
		});
	}
	showInfoWindow(e, t, n) {
		s(W, this) && r(G, this, It).call(this), typeof n != "string" && (n = "warning"), l(W, this, new window.Asc.PluginWindow());
		var i = {
			name: "Zotero",
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
		return r(G, this, Ft).call(this, i, window.Asc.plugin.tr(t), n), s(W, this).show(i), new Promise((e, t) => {
			window.Asc.plugin.button = (t, n) => {
				e(t === 0), r(G, this, It).call(this);
			};
		});
	}
};
function Ft(e, t, n) {
	s(W, this) && (l(jt, this, window.Asc.plugin.button), l(Mt, this, Asc.plugin.onThemeChanged), l(Nt, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (e) => {
		var t;
		(t = s(W, this)) == null || t.command("onThemeChanged", e), s(Mt, this).call(this, e);
	}, window.Asc.plugin.onTranslate = () => {
		var e;
		(e = s(W, this)) == null || e.command("onTranslate"), s(Nt, this).call(this);
	}, s(W, this).attachEvent("onWindowReady", () => {
		if (n === "warning") {
			var e;
			(e = s(W, this)) == null || e.command("onWarning", t);
		} else if (n === "success") {
			var r;
			(r = s(W, this)) == null || r.command("onSuccess", t);
		} else {
			var i;
			(i = s(W, this)) == null || i.command("onAttachedContent", t);
		}
	}), s(W, this).attachEvent("onUpdateHeight", (t) => {
		Asc.plugin.executeMethod("ResizeWindow", [s(W, this)?.id, [e.size[0] - 2, t]], () => {});
	}));
}
function It() {
	s(W, this) && (s(W, this).close(), l(W, this, null)), window.Asc.plugin.button = s(jt, this), window.Asc.plugin.onThemeChanged = s(Mt, this);
}
//#endregion
//#region src/app/services/citation-service.js
var Lt = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakSet(), Rt = class {
	constructor(e, t, n) {
		u(this, K), c(this, Lt, void 0), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = e, this._cslStylesManager = t, this._storage = new yt(), this._formatter, this.citationDocService = new ot(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), l(Lt, this, new Pt());
	}
	getCurrentField() {
		var e = this;
		return a(function* () {
			return e.citationDocService.getCurrentField();
		})();
	}
	saveAsText() {
		var e = this;
		return a(function* () {
			var t = yield e.citationDocService.saveAsText();
			return t && e.showSuccessMessage("All active Zotero citations and Bibliography have been replaced."), t;
		})();
	}
	insertSelectedCitations(e) {
		var t = this;
		return a(function* () {
			var n = t;
			yield r(K, t, q).call(t), r(K, t, J).call(t);
			var i = new xt("");
			for (var a in e) {
				var o = e[a];
				i.fillFromObject(o);
			}
			return r(K, t, Vt).call(t, e).then((e) => (e.forEach(function(e) {
				i.fillFromObject(e);
			}), t._storage.addCslCitation(i), r(K, n, zt).call(n, i)));
		})();
	}
	insertSelectedCitationsToCurrentField(e, t) {
		var n = this;
		return a(function* () {
			var i = r(K, n, Wt).call(n, t), a = i.citationID, o = new xt("");
			for (var s in o.fillFromObject(i), e) {
				var c = e[s];
				o.fillFromObject(c);
			}
			(yield r(K, n, Vt).call(n, e)).forEach(function(e) {
				o.fillFromObject(e);
			});
			var l = (yield r(K, n, q).call(n, o.toJSON(), a)).fieldsWithCitations;
			r(K, n, J).call(n);
			var u = l.find((e) => e.cslCitation.citationID === a)?.cslCitation;
			if (!u) throw Error("Citation not found");
			return r(K, n, Bt).call(n, u).then((e) => (t.Content = e, t.Value = n._citPrefixNew + " " + n._citSuffixNew + JSON.stringify(u.toJSON()), t));
		})();
	}
	insertBibliography() {
		var e = this;
		return a(function* () {
			try {
				var t = yield r(K, e, q).call(e), n = t.fieldsWithCitations, i = t.bibFieldValue, a = t.bibField, o = n.length === 0;
				if (r(K, e, J).call(e), a) {
					var s = [yield r(K, e, Kt).call(e, o, a)];
					return e.citationDocService.updateAddinFields(s).then((e) => e ? e[0] : "");
				} else return r(K, e, Gt).call(e, o, i);
			} catch (e) {
				throw e;
			}
		})();
	}
	moveCursorToField(e, t) {
		var n = this;
		return a(function* () {
			return n.citationDocService.moveCursorToField(e, t);
		})();
	}
	moveCursorOutsideField(e, t) {
		var n = this;
		return a(function* () {
			return n.citationDocService.moveCursorOutsideField(e, t);
		})();
	}
	moveCursorRight() {
		var e = this;
		return a(function* () {
			return e.citationDocService.moveCursorRight();
		})();
	}
	updateCslItems(e) {
		var t = this;
		return a(function* () {
			try {
				var n = yield r(K, t, q).call(t), i = n.fieldsWithCitations, a = n.bibField, o = i.length === 0;
				r(K, t, J).call(t);
				var s = [];
				if (e === void 0 && t._cslStylesManager.getLastUsedFormat() === "numeric" && (e = !0), typeof e == "boolean" && (s = yield r(K, t, qt).call(t, i, e)), a && s.push(yield r(K, t, Kt).call(t, o, a)), s && s.length) return t.citationDocService.updateAddinFields(s);
			} catch (e) {
				throw e;
			}
		})();
	}
	updateCslItemsInNotes(e) {
		var t = this;
		return a(function* () {
			try {
				var n = yield r(K, t, q).call(t), i = n.fieldsWithCitations, a = n.bibField, o = i.length === 0;
				r(K, t, J).call(t);
				var s = yield r(K, t, qt).call(t, i, !1);
				if (s && s.length && (yield t.citationDocService.convertNotesStyle(s, e)), a) {
					var c = [yield r(K, t, Kt).call(t, o, a)];
					yield t.citationDocService.updateAddinFields(c);
				}
			} catch (e) {
				throw e;
			}
		})();
	}
	updateItem(e, t) {
		var n = this;
		return a(function* () {
			try {
				var i = yield r(K, n, q).call(n, e, e.citationID), a = i.fieldsWithCitations;
				i.bibField, a.length, r(K, n, J).call(n), e && (a = a.filter(function(t) {
					return t.cslCitation.citationID === e.citationID;
				}));
				var o = yield r(K, n, qt).call(n, a, !0);
				if (t && o && o.length && (yield n.citationDocService.convertNotesStyle(o, t), o = []), o && o.length) return n.citationDocService.updateAddinFields(o);
			} catch (e) {
				throw e;
			}
		})();
	}
	switchingBetweenNotesAndText(e) {
		var t = this;
		return a(function* () {
			try {
				var n = yield r(K, t, q).call(t), i = n.fieldsWithCitations, a = n.bibField, o = i.length === 0;
				r(K, t, J).call(t);
				var s = yield r(K, t, qt).call(t, i, !0);
				if (s && s.length && (e ? yield t.citationDocService.convertTextToNotes(s, e) : yield t.citationDocService.convertNotesToText(s)), a) {
					var c = [yield r(K, t, Kt).call(t, o, a)];
					yield t.citationDocService.updateAddinFields(c);
				}
			} catch (e) {
				throw e;
			}
		})();
	}
	convertNotesStyle(e) {
		var t = this;
		return a(function* () {
			try {
				var n = (yield r(K, t, q).call(t)).fieldsWithCitations;
				r(K, t, J).call(t);
				var i = yield r(K, t, qt).call(t, n, !1, !0);
				if (!i || !i.length) return;
				yield t.citationDocService.convertNotesStyle(i, e);
			} catch (e) {
				throw e;
			}
		})();
	}
	showEditCitationWindow(e) {
		var t = this;
		return a(function* () {
			if (!e) return null;
			var n = r(K, t, Wt).call(t, e);
			return (yield s(Lt, t).showEditWindow(n)) || null;
		})();
	}
	showWarningMessage(e) {
		var t = this;
		return a(function* () {
			s(Lt, t).showInfoWindow("Warning!", e);
		})();
	}
	showSuccessMessage(e) {
		var t = this;
		return a(function* () {
			s(Lt, t).showInfoWindow("Success!", e, "success");
		})();
	}
};
function zt(e) {
	var t = this, n = !1;
	return Promise.resolve().then(function() {
		if (e.getCitationItems().forEach(function(e) {
			t._storage.hasItem(e.id) || (n = !0);
		}), n) {
			var r = [];
			t._storage.forEachItem(function(e, t) {
				r.push(t);
			}), t._formatter.updateItems(r);
		}
	}).then(() => r(K, this, Ut).call(this, e)).then((n) => {
		var r = null;
		return t._cslStylesManager.getLastUsedFormat() === "note" && (r = t._cslStylesManager.getLastUsedNotesStyle()), t.citationDocService.addCitation(n, JSON.stringify(e.toJSON()), r);
	});
}
function Bt(e) {
	var t = this, n = !1;
	return Promise.resolve().then(function() {
		if (e.getCitationItems().forEach(function(e) {
			t._storage.hasItem(e.id) || (n = !0);
		}), n) {
			var r = [];
			t._storage.forEachItem(function(e, t) {
				r.push(t);
			}), t._formatter.updateItems(r);
		}
	}).then(() => r(K, this, Ut).call(this, e));
}
function Vt(e) {
	var t = [], n = {};
	for (var r in e) {
		var i = e[r], a = i.userID, o = i.groupID;
		a ? t.push(i.id) : o && (n[o] || (n[o] = []), n[o].push(i.id));
	}
	var s = [];
	for (var c in t.length && s.push(this._sdk.getItems(null, t, "json").then(function(e) {
		return e.items || [];
	})), n) Object.hasOwnProperty.call(n, c) && s.push(this._sdk.getGroupItems(null, c, n[c], "json").then(function(e) {
		return e.items || [];
	}));
	return Promise.all(s).then(function(e) {
		return e.reduce((e, t) => e.concat(t), []);
	});
}
function Ht() {
	try {
		for (var e = Array(this._storage.size), t = this._formatter.makeBibliography(), n = 0; n < t[1].length; n++) {
			var i = r(K, this, Yt).call(this, t[1][n]);
			i = i.replaceAll("\n", "").replaceAll("\r", "").replace(/\s+/g, " ").trim();
			var a = "<div class=\"csl-entry\">", o = "</div>";
			t[0]["second-field-align"] ? i.indexOf(a) === 0 && i.endsWith(o) && (i = a + i.substring(a.length, i.length - o.length).trim() + o) : (i = i.replace(/<\/?div[^>]*>/g, ""), i = "<p>" + i + "</p>"), window.Asc.scope.editorVersion < 9004e3 && (i += "\n"), e.push(i);
		}
		var s = e.join("").trim();
		return Asc.scope.bibStyle = t[0], s;
	} catch (e) {
		if (!1 === this._cslStylesManager.isLastUsedStyleContainBibliography()) this.showWarningMessage("Style does not describe the bibliography");
		else throw console.error(e), "Failed to apply this style.";
		return "";
	}
}
function Ut(e) {
	var t = document.createDocumentFragment(), n = document.createElement("div"), i = this._storage.getCitationsPre(e.citationID), a = this._storage.getCitationsPost(e.citationID), o = this._storage.getAllCitationsInJson();
	this._formatter.rebuildProcessorState(o);
	var s = this._formatter.processCitationCluster(e.toJSON(), i, a), c = r(K, this, Yt).call(this, s[1][0][1]);
	return t.appendChild(n), n.innerHTML = c, e.setPlainCitation(n.innerText), c;
}
function Wt(e) {
	var t, n = e.Value.indexOf("{"), r = e.Value.lastIndexOf("}");
	if (n !== -1) {
		var i = e.Value.slice(n, r + 1);
		t = JSON.parse(i);
	}
	return t;
}
function q(e, t) {
	var n = this;
	return this._storage.clear(), xt.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
		var a = 0, o = " ", s = i.find(function(e) {
			return e.Value.indexOf(n._bibPrefixNew) !== -1 || e.Value.indexOf(n._bibPrefix) !== -1;
		});
		if (s) {
			var c = r(K, n, Wt).call(n, s);
			typeof c == "object" && Object.keys(c).length > 0 && (o = JSON.stringify(c));
		}
		var l = i.filter(function(e) {
			return e.Value.indexOf(n._citPrefixNew) !== -1 || e.Value.indexOf(n._citPrefix) !== -1;
		}).map(function(i) {
			var o = r(K, n, Wt).call(n, i), s = "";
			i.Value.indexOf(n._citPrefix) === -1 && (s = o.citationID);
			var c = new xt(s);
			return e && t === s ? a += c.fillFromObject(e) : a += c.fillFromObject(o), n._storage.addCslCitation(c), {
				field: h({}, i),
				cslCitation: c
			};
		});
		return {
			bibField: s,
			bibFieldValue: o,
			fieldsWithCitations: l
		};
	});
}
function Gt(e, t) {
	var n = r(K, this, Ht).call(this);
	if (e && (n = I(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography()) return this.citationDocService.addBibliography(n, t);
	throw "The current bibliographic style does not describe the bibliography";
}
function Kt(e, t) {
	return e ? t.Content = I(this._bibPlaceholderIfEmpty) : t.Content = r(K, this, Ht).call(this), t;
}
function qt(e, t, n) {
	return Jt.apply(this, arguments);
}
function Jt() {
	return Jt = a(function* (e, t, n) {
		var i = document.createDocumentFragment(), a = document.createElement("div");
		i.appendChild(a);
		for (var o = [], c = e.length - 1; c >= 0; c--) {
			var l = !!n, u = e[c], d = u.field, f = u.cslCitation, p = this._storage.getCitationsPre(f.citationID), m = this._storage.getCitationsPost(f.citationID), h = this._storage.getAllCitationsInJson();
			this._formatter.rebuildProcessorState(h);
			var g = this._formatter.processCitationCluster(f.toJSON(), p, m), _ = r(K, this, Yt).call(this, g[1][0][1]);
			a.innerHTML = _;
			var v = f.getPlainCitation(), ee = d.Content;
			v === "" && (v = ee);
			var y = a.innerText;
			if (!f.getDoNotUpdate()) {
				if (v !== ee && !t) {
					var te = "<p>" + I("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + I("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + I("Original:") + " " + y + "</p><p>" + I("Modified:") + " " + ee + "</p>";
					(yield s(Lt, this).show("Saving custom edits", te)) ? (f.setDoNotUpdate(), delete d.Content) : (d.Content = _, f.setPlainCitation(y)), l = !0;
				} else (y !== ee || v !== ee || v !== y) && (l = !0), d.Content = _, f.setPlainCitation(y);
				if (f) {
					var b = this._citPrefixNew + " " + this._citSuffixNew + JSON.stringify(f.toJSON());
					d.Value !== b && (l = !0), d.Value = b;
				}
				l && o.push(d);
			}
		}
		return o;
	}), Jt.apply(this, arguments);
}
function J() {
	var e = this, t = [];
	this._storage.forEachItem(function(e, n) {
		t.push(n);
	}), this._formatter = new CSL.Engine({
		retrieveLocale: function(t) {
			return e._localesManager.getLocale(t) ? e._localesManager.getLocale(t) : e._localesManager.getLocale();
		},
		retrieveItem: function(t) {
			var n = e._storage.getItem(t), r = e._storage.getItemIndex(t);
			return n ? n.toFlatJSON(r) : null;
		}
	}, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), !0), t.length && this._formatter.updateItems(t);
}
function Yt(e) {
	return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
//#endregion
//#region src/app/services/cursor-service.js
var Xt = class {
	static getCursorPosition() {
		return new Promise(function(e) {
			Asc.plugin.callCommand(() => {
				var e = Api.GetDocument(), t = 0;
				if (!e) return t;
				var n = e.GetCurrentRun();
				if (!n) return t;
				var r = n.GetRange(0, 0);
				return r ? r.GetEndPos() : t;
			}, !1, !1, e);
		});
	}
	static setCursorPosition(e) {
		return new Promise(function(t) {
			var n = !1, r = !1;
			Asc.scope.pos = e, Asc.plugin.callCommand(function() {
				Api.GetDocument().MoveCursorToPos(Asc.scope.pos);
			}, r, n, t);
		});
	}
}, Zt = {
	getStyleInfo: function(e, t) {
		var n = new DOMParser().parseFromString(t, "text/xml"), r = {
			categories: {
				fields: [],
				format: ""
			},
			dependent: 0,
			href: "",
			name: e,
			title: "",
			updated: ""
		}, i = n.querySelector("info title");
		i && (r.title = i.textContent);
		var a = n.querySelector("info link[rel=\"self\"]");
		if (a) {
			var o = a.getAttribute("href");
			o && (r.href = o);
		}
		var s = n.querySelector("info link[rel=\"independent-parent\"]");
		if (s) {
			var c = s.getAttribute("href");
			c && (r.parent = c), r.dependent = 1;
		}
		var l = n.querySelector("info updated");
		l && (r.updated = l.textContent);
		var u = n.querySelector("info category[citation-format]");
		if (u) {
			var d = u.getAttribute("citation-format");
			d && (r.categories.format = d);
		}
		var f = n.querySelectorAll("info category[field]");
		return f && f.forEach(function(e) {
			var t = e.getAttribute("field");
			t && r.categories.fields.push(t);
		}), r;
	},
	getCitationFormat: function(e) {
		var t = new DOMParser().parseFromString(e, "text/xml").querySelector("info category[citation-format]");
		if (!t) throw Error("Citation format not found");
		var n = t.getAttribute("citation-format");
		if (!n) throw Error("Citation format not found");
		switch (n) {
			case "note":
			case "numeric":
			case "author":
			case "author-date":
			case "label": return n;
		}
		throw Error("Invalid citation format");
	},
	isStyleContainBibliography: function(e) {
		return e.indexOf("<bibliography") > -1;
	}
};
//#endregion
//#region src/app/csl/styles/storage.js
function Qt() {
	this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
Qt.prototype.getStyleNames = function() {
	var e = localStorage.getItem(this._customStyleNamesKey);
	return e ? JSON.parse(e) : [];
}, Qt.prototype._getStyles = function() {
	var e = localStorage.getItem(this._customStylesKey);
	return e ? JSON.parse(e) : [];
}, Qt.prototype.getStyle = function(e) {
	var t = this.getStyleNames().indexOf(e);
	return t === -1 ? null : this._getStyles()[t];
}, Qt.prototype.getStylesInfo = function() {
	for (var e = this.getStyleNames(), t = this._getStyles(), n = [], r = 0; r < e.length; r++) {
		var i = Zt.getStyleInfo(e[r], t[r]);
		n.push(i);
	}
	return n;
}, Qt.prototype.setStyle = function(e, t) {
	var n = this.getStyleNames(), r = this._getStyles(), i = n.indexOf(e);
	return i === -1 && (i = n.length), n[i] = e, r[i] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(n)), localStorage.setItem(this._customStylesKey, JSON.stringify(r)), Zt.getStyleInfo(e, t);
}, Qt.prototype.deleteStyle = function(e) {
	var t = this.getStyleNames(), n = this._getStyles(), r = t.indexOf(e);
	return r === -1 ? e : (t.splice(r, 1), n.splice(r, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), e);
};
//#endregion
//#region src/app/csl/styles/styles-manager.js
function Y(e) {
	this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new Qt(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._defaultStyles = [
		"american-anthropological-association",
		"american-medical-association",
		"american-political-science-association",
		"american-sociological-association",
		"apa",
		"chicago-author-date",
		"chicago-notes-bibliography",
		"harvard-cite-them-right",
		"ieee",
		"modern-language-association",
		"nature"
	], this._cache = {};
}
Y.prototype.addCustomStyle = function(e) {
	var t = this;
	return new Promise(function(t, n) {
		var r = e.name.toLowerCase();
		r.slice(-4) === ".csl" || r.slice(-4) === ".xml" ? r = r.substring(0, r.length - 4).trim() : n("Please select a .csl or .xml file."), e.size > 1024 * 1024 && n("Maximum file size is 1 MB."), t(r);
	}).then(function(n) {
		return t._readCSLFile(e).then(function(e) {
			return t._defaultStyles.indexOf(n) === -1 && t._defaultStyles.push(n), t._customStylesStorage.setStyle(n, e);
		});
	});
}, Y.prototype.getLastUsedFormat = function() {
	var e = localStorage.getItem(this._lastFormatKey);
	switch (e) {
		case "note":
		case "numeric":
		case "author":
		case "author-date":
		case "label": return e;
	}
	return "numeric";
}, Y.prototype.getLastUsedNotesStyle = function() {
	var e = localStorage.getItem(this._lastNotesStyleKey);
	return e === "footnotes" || e === "endnotes" ? e : "footnotes";
}, Y.prototype.getLastUsedStyleId = function() {
	return localStorage.getItem(this._lastStyleKey) || null;
}, Y.prototype.getLastUsedStyleIdOrDefault = function() {
	return localStorage.getItem(this._lastStyleKey) || "ieee";
}, Y.prototype.getStyle = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = this;
	return Promise.resolve(e).then(function(e) {
		if (n._cache[e]) return n._cache[e];
		if (n._customStylesStorage.getStyleNames().indexOf(e) !== -1) return n._customStylesStorage.getStyle(e);
		var t = n._STYLES_LOCAL + e + ".csl";
		if (n._isOnlineAvailable) t = n._STYLES_URL + e;
		else if (n._defaultStyles.indexOf(e) === -1) throw "The style is not available in the local version of the plugin.";
		return fetch(t).then(function(e) {
			return e.text();
		});
	}).then(function(t) {
		if (t && !n._isValidCSL(t) && n._isOnlineAvailable) {
			var r = Zt.getStyleInfo(e, t);
			if (r && r.dependent > 0 && r.parent) return fetch(r.parent).then(function(e) {
				return e.text();
			});
		}
		return t;
	}).then(function(r) {
		var i = r && Zt.getCitationFormat(r) || "numeric", a = {
			content: r,
			styleFormat: i
		};
		return r && t && n._saveLastUsedStyle(e, r, i), a;
	});
}, Y.prototype.getStylesInfo = function() {
	var e = this;
	return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
		var n = e.getLastUsedStyleId() || "ieee", r = [], i = e._customStylesStorage.getStyleNames(), a = t[0], o = t[1];
		return e._isDesktopAvailable && !e._isOnlineAvailable && (a = a.filter(function(t) {
			return e._defaultStyles.indexOf(t.name) >= 0 || t.name == n;
		})), o.forEach(function(t) {
			r.push(t), e._defaultStyles.indexOf(t.name) === -1 && e._defaultStyles.push(t.name);
		}), a.forEach(function(e) {
			i.indexOf(e.name) === -1 && r.push(e);
		}), r.sort((e, t) => e.name.localeCompare(t.name)), r;
	});
}, Y.prototype._getStylesJson = function() {
	var e = this._STYLES_JSON_LOCAL;
	return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(e) {
		return e.json();
	});
}, Y.prototype.cached = function(e) {
	return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
}, Y.prototype.isLastUsedStyleContainBibliography = function() {
	return localStorage.getItem(this._lastUsedStyleContainBibliographyKey) !== "false";
}, Y.prototype.isStyleDefault = function(e) {
	return this._defaultStyles.indexOf(e) >= 0;
}, Y.prototype._isValidCSL = function(e) {
	return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
}, Y.prototype._readCSLFile = function(e) {
	var t = this;
	return new Promise(function(n, r) {
		var i = new FileReader();
		i.onload = function(e) {
			var i = e.target ? String(e.target.result) : "";
			if (!t._isValidCSL(i)) {
				r("The file is not a valid CSL file");
				return;
			}
			n(i);
		}, i.onerror = function() {
			r("Failed to read file");
		}, i.readAsText(e);
	});
}, Y.prototype._saveLastUsedStyle = function(e, t, n) {
	this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, n);
	var r = Zt.isStyleContainBibliography(t);
	localStorage.setItem(this._lastUsedStyleContainBibliographyKey, r.toString());
}, Y.prototype.saveLastUsedNotesStyle = function(e) {
	localStorage.setItem(this._lastNotesStyleKey, e);
}, Y.prototype.setDesktopApiAvailable = function(e) {
	this._isDesktopAvailable = e;
}, Y.prototype.setRestApiAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/csl/locales/locales-manager.js
function X() {
	this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
X.prototype.loadLocale = function(e) {
	var t = this;
	if (this._selectedLanguage = e, this._cache[e]) return Promise.resolve(this._cache[e]);
	var n = this._getLocalesUrl() + "locales-" + e + ".xml";
	return fetch(n).catch(function(n) {
		return console.error("Failed to load locale:", n), fetch(t._LOCALES_PATH + "locales-" + e + ".xml");
	}).then(function(e) {
		return e.text();
	}).then(function(n) {
		return t._cache[e] = n, n;
	});
}, X.prototype.getLastUsedLanguage = function() {
	return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
}, X.prototype.getLocale = function(e) {
	return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
}, X.prototype.saveLastUsedLanguage = function(e) {
	this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
}, X.prototype._getLocalesUrl = function() {
	return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
}, X.prototype.setDesktopApiAvailable = function(e) {
	this._isDesktopAvailable = e;
}, X.prototype.setRestApiAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/pages/settings.js
function Z(e, t) {
	if (this._router = e, this._displayNoneClass = t, this._saveBtn = new D("saveSettingsBtn", { variant: "primary" }), this._cancelBtn = new D("cancelBtn", { variant: "secondary" }), this._styleSelect = new Ae("styleSelectList", {
		placeholder: "Enter style name",
		sortable: !0
	}), this._styleSelectListOther = new Ae("styleSelectedListOther", {
		placeholder: "Enter style name",
		searchable: !0
	}), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper) throw Error("notesStyleWrapper not found");
	if (this._footNotes = new xe("footNotes", { label: "Footnotes" }), this._endNotes = new xe("endNotes", { label: "Endnotes" }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput) throw Error("cslFileInput not found");
	this._languageSelect = new Ae("styleLangList", { placeholder: "Select language" }), this._cslStylesManager = new Y("zoteroStyleId"), this._localesManager = new X(), this._selectLists = [], this._onChangeState = function(e, t) {}, this._styleMessage = new _e("styleMessage", { type: "error" }), this._langMessage = new _e("langMessage", { type: "error" }), this._LANGUAGES = [
		["af-ZA", "Afrikaans"],
		["ar", "Arabic"],
		["bg-BG", "Bulgarian"],
		["ca-AD", "Catalan"],
		["cs-CZ", "Czech"],
		["cy-GB", "Welsh"],
		["da-DK", "Danish"],
		["de-AT", "German (Austria)"],
		["de-CH", "German (Switzerland)"],
		["de-DE", "German (Germany)"],
		["el-GR", "Greek"],
		["en-GB", "English (UK)"],
		["en-US", "English (US)"],
		["es-CL", "Spanish (Chile)"],
		["es-ES", "Spanish (Spain)"],
		["es-MX", "Spanish (Mexico)"],
		["et-EE", "Estonian"],
		["eu", "Basque"],
		["fa-IR", "Persian"],
		["fi-FI", "Finnish"],
		["fr-CA", "French (Canada)"],
		["fr-FR", "French (France)"],
		["he-IL", "Hebrew"],
		["hr-HR", "Croatian"],
		["hu-HU", "Hungarian"],
		["id-ID", "Indonesian"],
		["is-IS", "Icelandic"],
		["it-IT", "Italian"],
		["ja-JP", "Japanese"],
		["km-KH", "Khmer"],
		["ko-KR", "Korean"],
		["la", "Latin"],
		["lt-LT", "Lithuanian"],
		["lv-LV", "Latvian"],
		["mn-MN", "Mongolian"],
		["nb-NO", "Norwegian (Bokmål)"],
		["nl-NL", "Dutch"],
		["nn-NO", "Norwegian (Nynorsk)"],
		["pl-PL", "Polish"],
		["pt-BR", "Portuguese (Brazil)"],
		["pt-PT", "Portuguese (Portugal)"],
		["ro-RO", "Romanian"],
		["ru-RU", "Russian"],
		["sk-SK", "Slovak"],
		["sl-SI", "Slovenian"],
		["sr-RS", "Serbian"],
		["sv-SE", "Swedish"],
		["th-TH", "Thai"],
		["tr-TR", "Turkish"],
		["uk-UA", "Ukrainian"],
		["vi-VN", "Vietnamese"],
		["zh-CN", "Chinese (PRC)"],
		["zh-TW", "Chinese (Taiwan)"]
	], this._bNumFormat = !1, this._stateSettings = {
		style: "",
		notesStyle: "footnotes",
		styleFormat: "numeric"
	};
}
Z.prototype.getLocalesManager = function() {
	return this._localesManager;
}, Z.prototype.getStyleManager = function() {
	return this._cslStylesManager;
}, Z.prototype.getLocale = function() {
	return this._localesManager.getLocale();
}, Z.prototype.getLastUsedStyleId = function() {
	return this._cslStylesManager.getLastUsedStyleId();
}, Z.prototype.init = function() {
	var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
	this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
	var n = [
		this._onStyleChange(e),
		this._localesManager.loadLocale(t),
		this._loadStyles()
	];
	return Promise.all(n);
}, Z.prototype.onChangeState = function(e) {
	this._onChangeState = e;
}, Z.prototype.setDesktopApiAvailable = function(e) {
	this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
}, Z.prototype.setRestApiAvailable = function(e) {
	this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
}, Z.prototype._addEventListeners = function() {
	var e = this;
	this._saveBtn.subscribe(function(t) {
		if (t.type === "button:click") {
			var n = e._languageSelect.getSelectedValue();
			if (n === null) {
				console.error("No language selected");
				return;
			}
			var r = h({}, e._stateSettings), i = [];
			e._stateSettings.language !== n && (e._localesManager.saveLastUsedLanguage(n), i.push(e._localesManager.loadLocale(n).catch(function(t) {
				throw console.error(t), e._langMessage.show(I("Failed to load language")), t;
			})));
			var a = "footnotes";
			e._endNotes.getState().checked && (a = "endnotes"), e._stateSettings.notesStyle !== a && (e._cslStylesManager.saveLastUsedNotesStyle(a), e._cslStylesManager.getLastUsedFormat() === "note" && i.push(Promise.resolve()));
			var o = e._styleSelect.getSelectedValue();
			e._stateSettings.style !== o && o !== null && i.push(e._onStyleChange(o)), i.length ? (e._showLoader(), Promise.all(i).then(function() {
				e._hide(), e._hideLoader();
				var t = {
					language: n,
					style: o || "ieee",
					notesStyle: a,
					styleFormat: e._cslStylesManager.getLastUsedFormat()
				};
				e._onChangeState(t, r);
			}).catch(function(t) {
				e._hideLoader();
			})) : e._hide();
		}
	}), this._cancelBtn.subscribe(function(t) {
		if (t.type === "button:click") {
			var n = e._languageSelect.getSelectedValue(), r = e._styleSelect.getSelectedValue();
			n !== null && e._localesManager.getLastUsedLanguage() !== n && e._languageSelect.selectItems(e._localesManager.getLastUsedLanguage(), !0), e._stateSettings.style !== r && r !== null ? (e._styleSelect.selectItems(e._stateSettings.style, !0), e._styleSelectListOther.selectItems(e._stateSettings.style, !0), e._onStyleChange(e._stateSettings.style, !0).then(function() {
				e._hide();
			})) : e._hide();
		}
	}), this._cslFileInput.onchange = function(t) {
		if (t.target instanceof HTMLInputElement) {
			var n = t.target;
			if (n.files) {
				var r = n.files[0];
				if (!r) {
					console.error("No file selected");
					return;
				}
				e._cslStylesManager.addCustomStyle(r).then(function(t) {
					e._addStylesToList([t]);
				}).catch(function(t) {
					console.error(t), e._styleMessage.show(I("Invalid CSL style file"));
				}).finally(function() {
					e._hideLoader();
				});
			}
		}
	}, this._styleSelect.subscribe(function(t) {
		if (t.type === "selectbox:change") {
			e._styleSelectListOther.selectItems(t.detail.current.toString(), !0), e._somethingWasChanged(), e._onStyleChange(t.detail.current.toString(), !0);
			return;
		} else if (t.type !== "selectbox:custom") return;
		t.detail.current === "more_styles" && e._styleSelectListOther.openDropdown();
	}), e._styleSelectListOther.subscribe(function(t) {
		if (t.type === "selectbox:change" && t.detail.items) {
			var n = t.detail.items[0];
			e._styleSelect.addItem(n.value, n.text, !0), e._somethingWasChanged(), e._onStyleChange(n.value, !0);
		}
	}), this._languageSelect.subscribe(function(t) {
		t.type === "selectbox:change" && e._somethingWasChanged();
	}), this._footNotes.subscribe(function(t) {
		e._somethingWasChanged();
	}), this._endNotes.subscribe(function(t) {
		e._somethingWasChanged();
	});
}, Z.prototype._hideAllMessages = function() {
	this._langMessage.close(), this._styleMessage.close();
}, Z.prototype._hide = function() {
	this._router.openMain();
}, Z.prototype.show = function() {
	this._stateSettings = {
		language: this._localesManager.getLastUsedLanguage(),
		style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
		notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
		styleFormat: this._cslStylesManager.getLastUsedFormat()
	}, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check();
}, Z.prototype._loadStyles = function() {
	var e = this;
	return this._cslStylesManager.getStylesInfo().then(function(t) {
		e._addStylesToList(t), e._styleSelect.addCustomItem("more_styles", "More Styles..."), e._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
	}).catch(function(e) {
		console.error(e);
	});
}, Z.prototype._addStylesToList = function(e) {
	var t = this, n = this._cslStylesManager.getLastUsedStyleIdOrDefault(), r = e.map(function(e) {
		return [e.name, e.title];
	}), i = r.filter(function(e) {
		return !!(e[0] == n || t._cslStylesManager.isStyleDefault(e[0]));
	});
	this._styleSelect.addItems(i, n), this._styleSelectListOther.addItems(r, n);
}, Z.prototype._somethingWasChanged = function() {
	this._saveBtn.enable();
}, Z.prototype._onStyleChange = function(e, t) {
	var n = this;
	return t && n._showLoader(), n._cslStylesManager.getStyle(e, !t).then(function(e) {
		var r = e.styleFormat;
		n._bNumFormat = r == "numeric", r === "note" ? n._notesStyleWrapper.classList.remove(n._displayNoneClass) : n._notesStyleWrapper.classList.add(n._displayNoneClass), t && n._hideLoader();
	}).catch(function(e) {
		throw console.error(e), typeof e == "string" && n._styleMessage.show(I(e)), t && n._hideLoader(), e;
	});
}, Z.prototype._showLoader = function() {
	this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
}, Z.prototype._hideLoader = function() {
	this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
//#endregion
//#region src/app/pages/login.js
function Q(e, t) {
	if (this._router = e, this._sdk = t, this._apiKeyLoginField = new ge("apiKeyField", {
		autofocus: !0,
		autocomplete: "on"
	}), this._saveApiKeyBtn = new D("saveApiKeyBtn", { disabled: !0 }), this._apiKeyMessage = new _e("apiKeyMessage", { type: "error" }), this._useDesktopMessage = new _e("useDesktopMessage", { type: "error" }), this._connectToLocalZotero = new D("connectToLocalZotero", { variant: "secondary" }), this._useDesktopApp = document.getElementById("useDesktopApp"), !this._useDesktopApp) throw Error("useDesktopApp not found");
	if (this._logoutLink = document.getElementById("logoutLink"), !this._logoutLink) throw Error("logoutLink not found");
	this._onAuthorized = function(e) {}, this._onChangeState = function(e) {}, this._onOpen = function() {};
}
Q.prototype.init = function() {
	var e = this;
	this._addEventListeners();
	var t = !1, n = document.querySelectorAll(".for-zotero-online");
	x.runApisChecker(e._sdk).subscribe(function(r) {
		if (e._onChangeState(r), t || (t = !0, !r.desktopVersion && e._useDesktopApp && e._useDesktopApp.classList.add("hidden"), e._onOpen(), e._show()), r.online ? n.forEach(function(e) {
			e.classList.remove("hidden");
		}) : n.forEach(function(e) {
			e.classList.add("hidden");
		}), r.online && r.hasKey) {
			e._sdk.setIsOnlineAvailable(!0), e._hide(!0), e._onAuthorized(r);
			return;
		} else if (r.desktop && r.hasPermission) {
			e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages(), e._onAuthorized(r);
			return;
		}
	});
	var r = {
		onOpen: function(t) {
			return e._onOpen = t, r;
		},
		onChangeState: function(t) {
			return e._onChangeState = t, r;
		},
		onAuthorized: function(t) {
			return e._onAuthorized = t, r;
		}
	};
	return r;
}, Q.prototype._addEventListeners = function() {
	var e = this;
	this._apiKeyLoginField.subscribe(function(t) {
		t.type, t.type === "inputfield:input" && (e._apiKeyLoginField.getValue() ? e._saveApiKeyBtn.enable() : e._saveApiKeyBtn.disable());
	}), this._saveApiKeyBtn.subscribe(function(t) {
		t.type === "button:click" && e._tryToApplyKey();
	}), this._connectToLocalZotero.subscribe(function(t) {
		t.type === "button:click" && (e._showLoader(), x.checkStatus(e._sdk).then(function(t) {
			t.desktop && t.hasPermission ? (e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages()) : t.desktop && !t.hasPermission ? e._useDesktopMessage.show(I("Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check \"Allow other applications on this computer to communicate with Zotero\"")) : t.desktop || e._useDesktopMessage.show(I("Connection to Zotero failed. Make sure Zotero is running."));
		}).finally(function() {
			e._hideLoader();
		}));
	}), this._logoutLink.onclick = function(t) {
		return e._sdk.clearSettings(), e._show(), !0;
	};
}, Q.prototype._tryToApplyKey = function() {
	var e = this, t = e._apiKeyLoginField.getValue();
	t && (e._showLoader(), e._sdk.setApiKey(t).then(function() {
		x.successfullyLoggedInUsingApiKey(), e._hide(!0);
	}).catch(function(t) {
		console.error(t), e._apiKeyMessage.show(I("Invalid API key"));
	}).finally(function() {
		e._hideLoader();
	}));
}, Q.prototype._hideAllMessages = function() {
	this._apiKeyMessage.close();
}, Q.prototype._hide = function(e) {
	this._router.openMain(), e && this._logoutLink.classList.remove("hidden");
}, Q.prototype._show = function() {
	this._router.openLogin(), this._logoutLink.classList.add("hidden");
}, Q.prototype._showLoader = function() {
	this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
}, Q.prototype._hideLoader = function() {
	this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
//#endregion
//#region src/app/shared/ui/search-filter.js
function $t() {
	this._searchField = new ge("searchField", {
		type: "text",
		autofocus: !0,
		showClear: !1
	}), this._filterButton = new D("filterButton", {
		variant: "secondary-icon",
		size: "small"
	}), this._librarySelectList = new Ae("librarySelectList", {
		placeholder: I("No items selected"),
		multiple: !0,
		description: I("Search in:")
	}), this._subscribers = [], this._addEventListeners();
}
$t.prototype._addEventListeners = function() {
	var e = this;
	this._searchField.subscribe(function(t) {
		if (t.type === "inputfield:blur" || t.type === "inputfield:submit") {
			var n = e._getSelectedGroups();
			e._subscribers.forEach(function(e) {
				e(t.detail.value, n);
			});
		}
	}), this._filterButton.subscribe(function(t) {
		t.type === "button:click" && (e._librarySelectList.isOpen || (t.detail.originalEvent && t.detail.originalEvent.stopPropagation(), e._librarySelectList.openDropdown()));
	});
}, $t.prototype.addGroups = function(e) {
	var t = this, n = localStorage.getItem("selectedGroups"), r = n ? JSON.parse(n).map(function(e) {
		return e.toString();
	}) : ["my_library", "group_libraries"], i = !1;
	e.forEach(function(e) {
		e.id = String(e.id);
	});
	var a = [{
		id: "my_library",
		name: I("My Library")
	}, {
		id: "group_libraries",
		name: I("Group Libraries")
	}];
	!i && a.forEach(function(e) {
		r.indexOf(e.id) !== -1 && (i = !0);
	}), !i && e.forEach(function(e) {
		r.indexOf(e.id.toString()) !== -1 && (i = !0);
	}), i || (r = ["my_library", "group_libraries"]);
	for (var o = function(e, n, r) {
		typeof e == "number" && (e = e.toString()), t._librarySelectList instanceof Ae && t._librarySelectList.addItem(e, n, r);
	}, s = 0; s < a.length; s++) {
		var c = a[s].id, l = a[s].name;
		o(c, l, r.indexOf(c) !== -1);
	}
	if (e.length !== 0) {
		this._librarySelectList.addSeparator();
		for (var u = r.indexOf("group_libraries") !== -1, s = 0; s < e.length; s++) {
			var d = e[s].id, f = e[s].name;
			o(d, f, u || r.indexOf(d.toString()) !== -1);
		}
		this._selectedGroupsWatcher(a, e);
	}
}, $t.prototype._getSelectedGroups = function() {
	var e = this, t = this._librarySelectList.getSelectedValues();
	return (Array.isArray(t) === !1 || t.length === 0) && setTimeout(function() {
		e._librarySelectList.openDropdown();
	}, 500), t === null || typeof t == "string" ? [] : t;
}, $t.prototype.subscribe = function(e) {
	var t = this;
	return this._subscribers.push(e), { unsubscribe: function() {
		t._subscribers = t._subscribers.filter(function(t) {
			return t !== e;
		});
	} };
}, $t.prototype._selectedGroupsWatcher = function(e, t) {
	var n = this;
	this._librarySelectList instanceof Ae && this._librarySelectList.subscribe(function(r) {
		if (r.type === "selectbox:change") {
			var i = [], a = r.detail.values, o = r.detail.current, s = r.detail.enabled, c = e.map(function(e) {
				return e.id;
			}), l = t.map(function(e) {
				return e.id.toString();
			}), u = c.indexOf(String(o)) !== -1;
			u ? o === "group_libraries" ? (s ? (i.push("group_libraries"), n._librarySelectList.selectItems(l, !0)) : n._librarySelectList.unselectItems(l, !0), a.indexOf("my_library") !== -1 && i.push("my_library")) : a.indexOf("group_libraries") === -1 ? i = a.slice() : (i.push("group_libraries"), s && i.push(o)) : u || (l.every(function(e) {
				return a.indexOf(e) !== -1;
			}) ? (n._librarySelectList.selectItems("group_libraries", !0), i.push("group_libraries"), a.indexOf("my_library") !== -1 && i.push("my_library")) : (n._librarySelectList.unselectItems("group_libraries", !0), i = a.filter(function(e) {
				return e !== "group_libraries";
			}))), i.length === 0 ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(i));
		}
	});
};
//#endregion
//#region src/app/shared/constants/locator-values.js
var en = [
	["appendix", "Appendix"],
	["article", "Article"],
	["book", "Book"],
	["chapter", "Chapter"],
	["column", "Column"],
	["figure", "Figure"],
	["folio", "Folio"],
	["issue", "Issue"],
	["line", "Line"],
	["note", "Note"],
	["opus", "Opus"],
	["page", "Page"],
	["paragraph", "Paragraph"],
	["part", "Part"],
	["rule", "Rule"],
	["section", "Section"],
	["sub-verbo", "Sub verbo"],
	["table", "Table"],
	["title", "Title"],
	["verses", "Verses"],
	["volume", "Volume"]
];
//#endregion
//#region src/app/shared/ui/select-citation.js
function $(e, t, n) {
	this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = n, this._fLoadMore = t, this._loadTimeout, this._init();
}
//#endregion
//#region src/app/index.js
$.prototype._init = function() {
	var e = this;
	this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(t) {
		var n = [];
		for (var r in e._items) n.push(r);
		for (var i = 0; i < n.length; i++) e._removeSelected(n[i]);
	}), this._docsHolder && this._docsHolder.addEventListener("keydown", function(t) {
		(t.ctrlKey || t.metaKey) && t.key === "a" && (t.preventDefault(), (e._docsHolder?.querySelectorAll(".checkbox-container:not(.checkbox--checked)"))?.forEach(function(e) {
			e.click();
		}));
	});
}, $.prototype.clearLibrary = function() {
	this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
	for (var e = this._docsHolder; e && e.lastChild;) e.removeChild(e.lastChild);
	e && (e.scrollTop = 0), this._docsScroller.onscroll();
}, $.prototype.displayNothingFound = function() {
	this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
}, $.prototype.displaySearchItems = function(e, t, n) {
	var r = this, i = this._docsHolder;
	this._lastSearch = n;
	var a = 0;
	return new Promise((n, o) => {
		if (e && e.items && e.items.length > 0) {
			var s = document.createElement("div");
			i && s.classList.add("page" + i.children.length);
			for (var c = 0; c < e.items.length; c++) {
				var l = e.items[c];
				l.title && (s.appendChild(r._buildDocElement(l)), a++);
			}
			i && i.appendChild(s);
		} else t && o(t);
		this._docsScroller.onscroll(), n(a);
	});
}, $.prototype.getSelectedItems = function() {
	return Object.assign({}, this._items || {});
}, $.prototype.removeItems = function(e) {
	var t = this;
	e.forEach(function(e) {
		t._removeSelected(e);
	});
}, $.prototype.subscribe = function(e) {
	var t = this;
	return this._subscribers.push(e), { unsubscribe: function() {
		t._subscribers = t._subscribers.filter(function(t) {
			return t !== e;
		});
	} };
}, $.prototype._buildDocElement = function(e) {
	var t = this, n = document.createElement("div");
	n.classList.add("doc");
	var r = document.createElement("div");
	r.classList.add("docInfo");
	var i = document.createElement("div"), a = "";
	e.author && e.author.length > 0 && (a = e.author.map(function(e) {
		return e.family && e.given ? e.family.trim() + ", " + e.given.trim() : e.family ? e.family.trim() : e.given ? e.given.trim() : "";
	}).join("; "));
	var o = document.createElement("div");
	o.classList.add("selectbox-arrow"), o.innerHTML = "<b></b>";
	var s = document.createElement("div");
	if (s.textContent = e.title.trim(), s.classList.add("truncate-text"), s.classList.add("secondary-text"), (e.publisher || e["publisher-place"]) && (s.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
		var c = e.issued["date-parts"][0];
		a.length > 20 ? s.textContent += " (" + c.join("-") + ")" : (a.length > 0 && a.slice(-1) !== "." && a.slice(-1) !== "," && (a += "."), a += " " + c.join("-"));
	}
	a.length === 0 && (a = s.textContent), s.setAttribute("title", s.textContent), r.appendChild(s);
	var l = document.createElement("input");
	i.appendChild(l);
	var u = new ke(l, {
		checked: !!this._items[e.id],
		label: a,
		title: !0,
		id: e.id
	});
	this._items[e.id] && (this._checks[e.id] = u), i.appendChild(o), n.appendChild(i), n.appendChild(r);
	var d;
	function f() {
		n.classList.toggle("doc-open"), d || (d = t._buildCitationParams(e), n.appendChild(d));
	}
	return o.onclick = f, u.subscribe(function(n) {
		n.type === "checkbox:change" && (n.detail.checked ? t._addSelected(e, u) : t._removeSelected(e.id));
	}), n;
}, $.prototype._buildCitationParams = function(e) {
	var t = localStorage.getItem("selectedLocator") || "page";
	e.label = t;
	var n = document.createDocumentFragment(), r = document.createElement("div"), i = document.createElement("input"), a = document.createElement("input"), o = document.createElement("div"), s = document.createElement("div"), c = document.createElement("input"), l = document.createElement("div"), u = document.createElement("input");
	n.appendChild(r), r.appendChild(i), r.appendChild(a), n.appendChild(o), o.appendChild(s), o.appendChild(c);
	var d = "";
	n.appendChild(l), l.appendChild(u);
	var f = new ge(i, {
		type: "text",
		placeholder: I("Prefix")
	}), p = new ge(a, {
		type: "text",
		placeholder: I("Suffix")
	}), m = new Ae(s, {
		placeholder: I("Locator"),
		usePortal: !0,
		translate: I
	});
	en.forEach(function(e) {
		var n = e[0] === t;
		m.addItem(e[0], e[1], n), n && (d = e[1]);
	});
	var h = new ge(c, {
		type: "text",
		placeholder: I(d)
	}), g = new ke(u, { label: I("Omit Author") });
	return f.subscribe(function(t) {
		t.type === "inputfield:input" && (e.prefix = t.detail.value);
	}), p.subscribe(function(t) {
		t.type === "inputfield:input" && (e.suffix = t.detail.value);
	}), h.subscribe(function(t) {
		t.type === "inputfield:input" && (e.locator = t.detail.value);
	}), m.subscribe(function(t) {
		if (t.type === "selectbox:change" && t.detail.items) {
			var n = t.detail.items[0];
			h.setPlaceholder(n.text), e.label = t.detail.values[0].toString(), localStorage.setItem("selectedLocator", e.label);
		}
	}), g.subscribe(function(t) {
		t.type === "checkbox:change" && (e["suppress-author"] = t.detail.checked);
	}), n;
}, $.prototype._buildSelectedElement = function(e) {
	var t = this, n = document.createElement("div");
	n.classList.add("selDoc");
	var r = document.createElement("span");
	e.author && e.author.length > 0 ? r.textContent = e.author.map(function(e) {
		return e.family + ", " + e.given;
	}).join("; ") : r.textContent = e.title, e.issued && e.issued["date-parts"] && (r.textContent += " " + e.issued["date-parts"][0].join("-")), r.setAttribute("title", r.textContent), n.appendChild(r);
	var i = document.createElement("span");
	return i.onclick = function() {
		t._removeSelected(e.id);
	}, i.innerHTML = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z\" fill=\"currentColor\" fill-opacity=\"0.8\"/></svg>", n.appendChild(i), n;
}, $.prototype._addSelected = function(e, t) {
	var n = this._buildSelectedElement(e);
	this._items[e.id] = e, this._html[e.id] = n, this._checks[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(n), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
}, $.prototype._checkDocsScroll = function(e, t) {
	var n = this;
	if (this._fShouldLoadMore(e)) {
		if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
		this._loadTimeout = setTimeout(function() {
			n._fShouldLoadMore(e) && n._fLoadMore();
		}, 500);
	}
}, $.prototype._initScrollBox = function(e, t, n, r) {
	var i = {};
	return i.onscroll = this._checkScroll(e, t, n, r), e.onwheel = function(t) {
		e.scrollTop += t.deltaY > 10 || t.deltaY < -10 ? t.deltaY : t.deltaY * 20, i.onscroll();
	}, t.onmousedown = function(n) {
		t.classList.add("scrolling");
		var r = n.clientY, a = e.scrollTop;
		window.onmouseup = function(e) {
			t.classList.remove("scrolling"), window.onmouseup = null, window.onmousemove = null;
		}, window.onmousemove = function(t) {
			var n = (t.clientY - r) / e.clientHeight;
			e.scrollTop = a + e.scrollHeight * n, i.onscroll();
		};
	}, document.body.addEventListener("resize", function() {
		i.onscroll();
	}), i;
}, $.prototype._checkScroll = function(e, t, n, r) {
	var i = this._displayNoneClass;
	return function() {
		if (e.scrollHeight <= e.clientHeight) t.classList.add(i);
		else {
			t.classList.remove(i);
			var a = e.clientHeight / e.scrollHeight * e.clientHeight;
			a = a < n ? n : a, t.style.height = a + "px";
			var o = e.scrollHeight - e.clientHeight, s = e.scrollTop / o * (e.clientHeight - a);
			t.style.marginTop = s + "px";
		}
		r && r(e, t);
	};
}, $.prototype._removeSelected = function(e) {
	var t = this._html[e];
	this._selectedHolder && this._selectedHolder.removeChild(t), delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
}, $.prototype._checkSelected = function() {
	var e = this.count();
	!this._selectedInfo || !this._selectedCount || !this._selectedWrapper || (e <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = e + " " + I("selected")), this._subscribers.forEach(function(t) {
		t(e);
	}));
}, $.prototype.count = function() {
	var e = 0;
	for (var t in this._items) e++;
	return e;
}, (function() {
	var e = "hidden", t, n, r, i, o = {
		text: "",
		obj: null,
		groups: [],
		groupsHash: ""
	}, s = !1, c, l, u, d, f, p, m, h = new Ke("libLoader", I("Loading...")), g = {};
	function _() {
		var t = document.getElementById("errorWrapper");
		if (!t) throw Error("errorWrapper not found");
		var n = document.getElementById("mainState");
		if (!n) throw Error("mainState not found");
		c = new $t(), l = new $(e, oe, se), u = new D("saveAsTextBtn", { variant: "secondary" }), d = new D("insertLinkBtn", { disabled: !0 }), f = new D("settingsBtn", {
			variant: "icon-only",
			size: "small"
		}), p = new D("insertBibBtn", { variant: "secondary" }), m = new D("refreshBtn", { variant: "secondary" }), g = {
			error: t,
			mainState: n
		};
	}
	window.Asc.plugin.init = function() {
		Ke.show(), _(), t = new b(), n = new E();
		var a = new Q(t, n);
		r = new Z(t, e), i = new Rt(r.getLocalesManager(), r.getStyleManager(), n);
		var o = !1;
		y(), a.init().onOpen(function() {
			Ke.hide();
		}).onChangeState(function(e) {
			r.setDesktopApiAvailable(e.desktop), r.setRestApiAvailable(e.online);
		}).onAuthorized(function(e) {
			if (!o) {
				o = !0, Ke.show();
				var t = ee().catch((e) => {
					console.error(e), x(I("An error occurred while loading library groups. Try restarting the plugin."));
				}), n = r.init().catch((e) => {
					console.error(e), x(I("An error occurred while loading settings. Try restarting the plugin.")), r.show();
				});
				Promise.all([t, n]).then(function() {
					return Ke.hide(), v();
				}).finally(function() {
					Ke.hide();
				});
			}
		}), window.Asc.plugin.onTranslate = ne, ue().then((e) => {
			window.Asc.scope.editorVersion = e, fe();
		}).catch((e) => {
			console.error(e);
		});
	};
	function v() {
		return h.show(), w(n.getItems(null).then((e) => (delete e.next, e)), !1).then((e) => {
			ae(e > 0 ? "started" : "empty");
		}).catch((e) => {
			console.error(e);
		}).finally(() => {
			h.hide();
		});
	}
	function ee() {
		return n.getUserGroups().then(function(e) {
			return c.addGroups(e), e;
		});
	}
	function y() {
		l.subscribe(T);
		function t(e, t, r) {
			l.clearLibrary();
			var i = [];
			return n.getUserGroups().then(function(a) {
				var s = t.filter(function(e) {
					return e !== "my_library" && e !== "group_libraries";
				});
				t.indexOf("my_library") !== -1 && i.push(w(n.getItems(e), !1));
				for (var c = 0; c < s.length; c++) i.push(w(n.getGroupItems(e, s[c]), !0));
				return o.text = e, o.obj = null, o.groups = [], o.groupsHash = r, i;
			});
		}
		c.subscribe(function(n, r) {
			n = n.trim();
			var i = r.join(",");
			g.mainState.classList.contains(e) || !n || n == o.text && i === o.groupsHash || r.length === 0 || t(n, r, i).catch(() => []).then(function(e) {
				return e.length && (h.show(), Promise.any(e).then(function() {
					h.hide();
				}).finally(function() {
					h.hide();
				})), Promise.allSettled(e);
			}).then(function(e) {
				var t = 0;
				e.forEach(function(e) {
					e.status === "fulfilled" && (t += e.value);
				}), t === 0 ? (ae("empty"), l.displayNothingFound()) : ae("not-empty");
			});
		}), m.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				if (e.type === "button:click") {
					if (!r.getLastUsedStyleId()) {
						x(I("Style is not selected"));
						return;
					}
					if (!r.getLocale()) {
						x(I("Language is not selected"));
						return;
					}
					yield S(!0, "Zotero (" + I("Updating citations") + ")");
					var t = i.updateCslItems.bind(i, !1), n = r.getStyleManager();
					n.getLastUsedFormat() === "note" && (t = i.updateCslItemsInNotes.bind(i, n.getLastUsedNotesStyle())), t().catch(function(e) {
						console.error(e);
						var t = I("Failed to refresh");
						typeof e == "string" && (t += ". " + I(e)), x(t);
					}).finally(function() {
						C(!1, "Zotero (" + I("Updating citations") + ")");
					});
				}
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), p.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				if (e.type === "button:click") {
					if (!r.getLastUsedStyleId()) {
						x(I("Style is not selected"));
						return;
					}
					if (!r.getLocale()) {
						x(I("Language is not selected"));
						return;
					}
					yield S(!1, "Zotero (" + I("Inserting bibliography") + ")");
					var t = "";
					i.insertBibliography().then(function(e) {
						t = e;
					}).catch(function(e) {
						console.error(e), i.showWarningMessage("Failed to insert bibliography"), typeof e == "string" && x(I(e));
					}).finally(function() {
						C(!1, "Zotero (" + I("Inserting bibliography") + ")"), t && i.moveCursorOutsideField(t);
					});
				}
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), d.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				if (e.type === "button:click") {
					if (!r.getLastUsedStyleId()) {
						x(I("Style is not selected"));
						return;
					}
					if (!r.getLocale()) {
						x(I("Language is not selected"));
						return;
					}
					yield S(!0, "Zotero (" + I("Inserting citation") + ")");
					var t = l.getSelectedItems(), n = !1, o = yield i.getCurrentField();
					return o ? i.insertSelectedCitationsToCurrentField(t, o).then((e) => (l.removeItems(Object.keys(t)), pe(e))).then((e) => {
						e && o && i.showSuccessMessage("Citation has been updated successfully");
					}).finally(/*#__PURE__*/ a(function* () {
						C(!1, "Zotero (" + I("Inserting citation") + ")");
					})) : i.insertSelectedCitations(t).then(function(e) {
						return n = e, l.removeItems(Object.keys(t)), i.getCurrentField();
					}).then(function(e) {
						return o = e, n ? i.updateCslItems(!1) : i.updateCslItems();
					}).then(() => {
						if (n) return i.moveCursorRight();
						if (o) return i.moveCursorOutsideField(o.FieldId);
					}).catch(function(e) {
						console.error(e);
						var t = I("Failed to insert citation");
						typeof e == "string" && (t += ". " + I(e)), x(t);
					}).finally(/*#__PURE__*/ a(function* () {
						C(!1, "Zotero (" + I("Inserting citation") + ")");
					}));
				}
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), f.subscribe(function(e) {
			e.type === "button:click" && r.show();
		}), u.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				e.type === "button:click" && (yield S(!1, "Zotero (" + I("Saving as text") + ")"), i.saveAsText().then(function() {
					C(!1, "Zotero (" + I("Saving as text") + ")");
				}));
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), r.onChangeState(/*#__PURE__*/ function() {
			var e = a(function* (e, t) {
				yield S(!0, "Zotero (" + I("Updating citations") + ")");
				var n = i.updateCslItems.bind(i, !0);
				[e.styleFormat, t.styleFormat].includes("note") && (n = e.styleFormat === t.styleFormat ? e.notesStyle === t.notesStyle ? i.updateCslItems.bind(i, !0) : i.convertNotesStyle.bind(i, e.notesStyle) : e.styleFormat === "note" ? i.switchingBetweenNotesAndText.bind(i, e.notesStyle) : i.switchingBetweenNotesAndText.bind(i)), n().catch(function(e) {
					console.error(e);
					var t = I("Failed to refresh");
					typeof e == "string" && (t += ". " + I(e)), x(t);
				}).finally(function() {
					C(!1, "Zotero (" + I("Updating citations") + ")");
				});
			});
			return function(t, n) {
				return e.apply(this, arguments);
			};
		}());
	}
	Asc.plugin.onThemeChanged = function(e) {
		window.Asc.plugin.onThemeChangedBase(e), te.fixThemeForIE(e), te.addStylesForComponents(e);
		var t = "";
		t += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n", t += ".doc { border-color: " + e["border-regular-control"] + "; background-color: " + e["background-normal"] + "; }\n", t += ".scrollThumb { box-shadow: 0 0 8px 8px " + e["highlight-button-hover"] + " inset; }\n", t += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + e["canvas-scroll-thumb-pressed"] + " inset; }\n", t += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + e["canvas-scroll-thumb-hover"] + " inset; }\n", (["theme-white", "theme-night"].indexOf(e.name) !== -1 || ["theme-white", "theme-night"].indexOf(e.Name) !== -1) && (t += ".doc { border-radius: 4px; }\n");
		var n = document.getElementById("pluginStyles");
		n ? n.innerHTML = t : (n = document.createElement("style"), n.id = "pluginStyles", n.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(n));
		var r = e.type || "light", i = document.body;
		i.classList.remove("theme-dark"), i.classList.remove("theme-light"), i.classList.add("theme-" + r);
	};
	function ne() {
		for (var e = document.getElementsByClassName("i18n"), t = function() {
			var t = e[n];
			if (!(t instanceof HTMLElement)) return 1;
			["placeholder", "title"].forEach((e) => {
				t.hasAttribute(e) && t.setAttribute(e, I(t.getAttribute(e) || ""));
			});
			var r = I(t.innerText.trim().replace(/\s+/g, " "));
			r && (t.innerText = r);
		}, n = 0; n < e.length; n++) if (t()) continue;
	}
	function x(t) {
		t && typeof t == "string" ? (I(""), g.error.classList.remove(e), g.error.textContent = t, setTimeout(function() {
			window.onclick = function() {
				x(!1);
			};
		}, 100)) : (g.error.classList.add(e), g.error.textContent = "", window.onclick = null);
	}
	function S(e, t) {
		return re.apply(this, arguments);
	}
	function re() {
		return re = a(function* (e, t) {
			s = !0, p.disable(), m.disable(), d.disable();
			var n = window.Asc.scope.editorVersion;
			n && n < 9004e3 ? window._cursorPosition = yield Xt.getCursorPosition() : yield new Promise((t) => {
				Asc.plugin.executeMethod("StartAction", ["GroupActions", {
					lockScroll: !0,
					keepSelection: e
				}], t);
			});
		}), re.apply(this, arguments);
	}
	function C(e, t) {
		return ie.apply(this, arguments);
	}
	function ie() {
		return ie = a(function* (e, t) {
			s = !1, p.enable(), m.enable(), T();
			var n = window.Asc.scope.editorVersion;
			n && n < 9004e3 ? Xt.setCursorPosition(window._cursorPosition || 0) : yield new Promise((t) => {
				Asc.plugin.executeMethod("EndAction", ["GroupActions", { scrollToTarget: e }], t);
			});
		}), ie.apply(this, arguments);
	}
	function ae(e) {
		var t = document.getElementById("searchLabel");
		if (!t) {
			console.error("Search label not found");
			return;
		}
		var n = t.querySelector(".when-empty"), r = t.querySelector(".when-not-empty"), i = t.querySelector(".when-started");
		if (!n || !r || !i) {
			console.error("Search label elements not found");
			return;
		}
		switch (n.classList.add("hidden"), r.classList.add("hidden"), i.classList.add("hidden"), e) {
			case "empty":
				n.classList.remove("hidden");
				break;
			case "not-empty":
				r.classList.remove("hidden");
				break;
			case "started":
				r.classList.remove("hidden"), i.classList.remove("hidden");
				break;
		}
	}
	function oe() {
		console.warn("Loading more..."), o.obj && o.obj.next && w(o.obj.next(), !1);
		for (var e = 0; e < o.groups.length && o.groups[e].next; e++) w(n.getGroupItems(o.groups[e].next(), o.groups[e].id), !0);
	}
	function se(e) {
		if (t.getRoute() != "main" || e.scrollTop + e.clientHeight < e.scrollHeight) return !1;
		var n = !0;
		return o.groups.forEach(function(e) {
			e.next && (n = !1);
		}), !(!o.obj || !o.obj.next || !n || !o.obj && !o.text.trim() && !o.groups.length);
	}
	function w(e, t) {
		return e.then(function(e) {
			return ce(e, null, t);
		}).catch(function(e) {
			return console.error(e), e.message && x(I(e.message)), ce(null, e, t);
		}).then(function(e) {
			return e;
		});
	}
	function ce(e, t, n) {
		var r = !1;
		!o.obj && e && e.items && !e.items.length && (r = !0), t ? (r && (o.obj = null, o.groups = []), o && o.obj && delete o.obj.next) : n && e && e.next ? o.groups.push(e) : o.obj = e && e.items.length ? e : null;
		var i = function(e) {
			if (!e.id) return e;
			var t = e.id.indexOf("/") + 1, n = e.id.lastIndexOf("/") + 1, r = e.id.indexOf("http");
			return t !== n && r === 0 && (e.uris ||= [], e.uris.push(e.id)), n && (e.id = e.id.substring(n)), e;
		};
		return e && e.items && e.items.length > 0 && (e.items = e.items.map((t) => (t = le(t), t[n ? "groupID" : "userID"] = e.id, i(t), t))), l.displaySearchItems(e, t, o);
	}
	function le(e) {
		if (e.id || !e.key) return e;
		var t = {
			id: e.key,
			title: e.data.title,
			type: e.data.itemType
		};
		return Object.hasOwnProperty.call(e, "url") && (t.URL = e.data.url), Object.hasOwnProperty.call(e, "volume") && (t.volume = e.data.volume), Object.hasOwnProperty.call(e, "language") && (t.language = e.data.language), Object.hasOwnProperty.call(e, "abstract") && (t.abstract = e.data.abstract), Object.hasOwnProperty.call(e, "note") && (t.note = e.data.note), Object.hasOwnProperty.call(e, "page") && (t.page = e.data.page), Object.hasOwnProperty.call(e, "shortTitle") && (t.shortTitle = e.data.shortTitle), Object.hasOwnProperty.call(e, "links") && (t.uris = [], Object.hasOwnProperty.call(e.links, "self") && t.uris.push(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && t.uris.push(e.links.alternate.href)), t;
	}
	function T(e) {
		e === void 0 && (e = l.count()), e <= 0 ? (d.disable(), d.setText(I("Insert/Edit Citation"))) : (!s && d.enable(), e > 1 ? d.setText(I("Insert " + e + " Citations")) : d.setText(I("Insert/Edit Citation")));
	}
	function ue() {
		return de.apply(this, arguments);
	}
	function de() {
		return de = a(function* () {
			try {
				var e = yield new Promise((e) => {
					Asc.plugin.executeMethod("GetVersion", [], e);
				});
				e == "develop" && (e = "99.99.99");
				for (var t = e.split("."); 3 > t.length;) t.push("0");
				return 1e6 * parseInt(t[0]) + 1e3 * parseInt(t[1]) + parseInt(t[2]);
			} catch (e) {
				return console.error(e), 99999999;
			}
		}), de.apply(this, arguments);
	}
	function fe() {
		var e = new Asc.ButtonContextMenu();
		e.text = "Edit citation", e.addCheckers("Target", "Selection"), e.attachOnClick(/*#__PURE__*/ a(function* () {
			var e = yield new Promise((e) => {
				window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
			});
			yield S(!1, "Zotero (" + I("Updating citations") + ")"), yield pe(e), yield C(!1, "Zotero (" + I("Updating citations") + ")");
		})), Asc.Buttons.registerContextMenu();
	}
	function pe(e) {
		return me.apply(this, arguments);
	}
	function me() {
		return me = a(function* (e) {
			if (!e || !e.Value || e.Value.toLowerCase().indexOf("zotero_item") === -1) return i.showWarningMessage("No Zotero citation found at the cursor. Please click directly on a citation to edit it."), !1;
			var t = yield i.showEditCitationWindow(e);
			if (!t) return !1;
			var n = i.updateItem.bind(i, t), a = r.getStyleManager();
			return a.getLastUsedFormat() === "note" && (n = i.updateItem.bind(i, t, a.getLastUsedNotesStyle())), n().then(() => (e && i.moveCursorOutsideField(e.FieldId), !0)).catch(function(e) {
				console.error(e);
				var t = I("Failed to insert citation");
				return typeof e == "string" && (t += ". " + I(e)), x(t), !1;
			});
		}), me.apply(this, arguments);
	}
})();
//#endregion

//# sourceMappingURL=bundle.modern.js.map