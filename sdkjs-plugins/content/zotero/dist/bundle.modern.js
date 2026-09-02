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
	return (t = b(t)) in e ? Object.defineProperty(e, t, {
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
	if (e == null) return {};
	var n, r, i = _(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function _(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function v(e, t) {
	return n(e) || f(e, t) || x(e, t) || p();
}
function y(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function b(e) {
	var t = y(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function x(e, n) {
	if (e) {
		if (typeof e == "string") return t(e, n);
		var r = {}.toString.call(e).slice(8, -1);
		return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? t(e, n) : void 0;
	}
}
function S(t) {
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
S.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, S.prototype.next = function(e) {
	return this._invoke("next", e);
}, S.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, S.prototype.return = function(e) {
	return this._invoke("return", e);
};
//#endregion
//#region src/app/theme.js
var ee = {
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
function te() {
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
te.prototype.getRoute = function() {
	return this._currentRoute;
}, te.prototype._setCurrentRoute = function(e) {
	this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
}, te.prototype.openMain = function() {
	this._setCurrentRoute("main");
}, te.prototype.openLogin = function() {
	this._setCurrentRoute("login");
}, te.prototype.openSettings = function() {
	this._setCurrentRoute("settings");
};
//#endregion
//#region src/app/zotero/zotero-environment.js
var ne = { desktopApiUrl: "http://127.0.0.1:23119/api/" }, re = "https://api.zotero.org/", ie = {
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
		return Promise.all([fetch(re, {
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
}, C = /*#__PURE__*/ new WeakMap(), ae = /*#__PURE__*/ new WeakMap(), oe = /*#__PURE__*/ new WeakMap(), se = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), ce = /*#__PURE__*/ new WeakMap(), le = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), ue = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakSet(), de = class {
	constructor() {
		var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		u(this, D), c(this, C, void 0), c(this, ae, void 0), c(this, oe, void 0), c(this, se, void 0), c(this, w, void 0), c(this, ce, void 0), c(this, le, void 0), c(this, T, void 0), c(this, ue, void 0), c(this, E, void 0), l(C, this, e.maxRetries || 5), l(ae, this, e.initialDelay || 1e3), l(oe, this, e.maxDelay || 5e3), l(se, this, e.backoffFactor || 2), l(w, this, e.retryOn || [
			429,
			502,
			503,
			504
		]), l(ce, this, 10), l(le, this, 5e3), l(T, this, []), l(ue, this, 0), l(E, this, 0);
	}
	fetchWithRetry(e, t, n) {
		var i = this;
		return a(function* () {
			try {
				yield r(D, i, pe).call(i);
				var a = yield fetch(e, { headers: t });
				if (a.ok) return a;
				if (s(w, i).includes(a.status) && n < s(C, i)) {
					var o = r(D, i, he).call(i, n, a);
					return console.log(`Attempt ${n + 1}/${s(C, i)} failed with ${a.status}. Retrying in ${o}ms`), yield r(D, i, ge).call(i, o), i.fetchWithRetry(e, t, n + 1);
				}
				throw Error(`${a.status} ${a.statusText}`);
			} catch (a) {
				if (n >= s(C, i)) {
					var c = "";
					throw a instanceof Error && (c = a.message), Error(`Request failed after ${s(C, i)} attempts: ${c}`);
				}
				if (n < s(C, i)) {
					var l = r(D, i, he).call(i, n);
					return console.log(`Network error on attempt ${n + 1}. Retrying in ${l}ms`), yield r(D, i, ge).call(i, l), i.fetchWithRetry(e, t, n + 1);
				}
				throw a;
			}
		})();
	}
	resetCounter() {
		l(T, this, []), l(ue, this, 0), l(E, this, 0);
	}
};
function fe() {
	var e = Date.now();
	l(T, this, s(T, this).filter((t) => e - t < s(le, this)));
}
function pe() {
	return me.apply(this, arguments);
}
function me() {
	return me = a(function* () {
		var e;
		if (r(D, this, fe).call(this), s(T, this).length >= s(ce, this)) {
			var t = s(T, this)[0];
			if (Date.now() - t < s(le, this)) {
				var n = 500 * s(T, this).length - s(ce, this);
				n < 0 && (n = 0, console.warn("Wait time is less than 0")), console.log(`Rate limit prevention: ${s(T, this).length} requests in last ${s(le, this)}ms. Waiting ${n}ms...`), yield r(D, this, ge).call(this, n), r(D, this, fe).call(this);
			}
		}
		s(T, this).push(Date.now()), l(ue, this, (e = s(ue, this), e++, e));
		var i = Date.now() - s(E, this), a = 100;
		i < a && s(E, this) > 0 && (yield r(D, this, ge).call(this, a - i)), l(E, this, Date.now());
	}), me.apply(this, arguments);
}
function he(e) {
	var t = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null)?.headers.get("Retry-After");
	if (t) {
		var n = parseInt(t);
		if (n > 86400) {
			var r = parseInt(t) * 1e3;
			return Math.max(0, r - Date.now());
		}
		return n * 1e3;
	}
	var i = s(ae, this) * s(se, this) ** +e, a = Math.random() * 1e3;
	return Math.min(i + a, s(oe, this));
}
function ge(e) {
	return new Promise((t) => setTimeout(t, e));
}
//#endregion
//#region src/app/zotero/zotero.js
var _e = "https://api.zotero.org/", O = function() {
	this._apiKey = null, this._userId = 0, this._userGroups = [], this._userGroupsLoaded = !1, this._isOnlineAvailable = !0, this._fetcher = new de({
		maxRetries: 5,
		initialDelay: 5e3
	});
};
O.prototype.ZOTERO_API_VERSION = "3", O.prototype.USER_AGENT = "AscDesktopEditor", O.prototype.DEFAULT_FORMAT = "csljson", O.prototype.SEARCH_RESULT_LIMIT = 50, O.prototype.STORAGE_KEYS = {
	USER_ID: "zoteroUserId",
	API_KEY: "zoteroApiKey"
}, O.prototype.API_PATHS = {
	USERS: "users",
	GROUPS: "groups",
	ITEMS: "items",
	KEYS: "keys"
}, O.prototype._getBaseUrl = function() {
	return this._isOnlineAvailable ? _e : ne.desktopApiUrl;
}, O.prototype._getDesktopRequest = function(e) {
	var t = this;
	return new Promise(function(n, r) {
		window.AscSimpleRequest.createRequest({
			url: e,
			method: "GET",
			headers: {
				"Zotero-API-Version": t.ZOTERO_API_VERSION,
				"User-Agent": t.USER_AGENT,
				"Cache-Control": "no-cache"
			},
			complete: n,
			error: function(e) {
				e.statusCode === -102 && (e.statusCode = 404, e.message = "Connection to Zotero failed. Make sure Zotero is running"), r(e);
			}
		});
	});
}, O.prototype._getOnlineRequest = function(e) {
	var t = {
		"Zotero-API-Version": this.ZOTERO_API_VERSION,
		"Zotero-API-Key": this._apiKey || ""
	};
	return fetch(e, {
		headers: t,
		cache: "no-store"
	}).then(function(e) {
		if (!e.ok) {
			var t = e.status + " " + e.statusText;
			throw console.error(t), Error(t);
		}
		return e;
	}).catch(function(e) {
		throw typeof e == "object" && (e.message = "Connection to Zotero failed"), e;
	});
}, O.prototype._getRequestWithOfflineSupport = function(e) {
	return this._isOnlineAvailable ? this._getOnlineRequest(e) : this._getDesktopRequest(e.href);
}, O.prototype._buildGetRequest = function(e, t) {
	t ||= {};
	var n = new URL(e, this._getBaseUrl());
	return Object.keys(t).forEach(function(e) {
		t[e] !== void 0 && t[e] !== null && n.searchParams.append(e, t[e]);
	}), this._getRequestWithOfflineSupport(n);
}, O.prototype._parseLinkHeader = function(e) {
	var t = {}, n = /<(.*?)>; rel="(.*?)"/g;
	if (!e) return t;
	for (var r; (r = n.exec(e.trim())) !== null;) t[r[2]] = r[1];
	return t;
}, O.prototype._parseDesktopItemsResponse = function(e, t) {
	return e.then(function(e) {
		return {
			items: JSON.parse(e.responseText),
			id: t
		};
	});
}, O.prototype._parseItemsResponse = function(e, t) {
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
}, O.prototype._parseResponse = function(e, t) {
	if (this._isOnlineAvailable) {
		var n = e;
		return this._parseItemsResponse(n, t);
	} else {
		var r = e;
		return this._parseDesktopItemsResponse(r, t);
	}
}, O.prototype.getItems = function(e, t, n) {
	var r = this;
	n ||= r.DEFAULT_FORMAT;
	var i = { format: n };
	e ? (i.q = e, i.limit = r.SEARCH_RESULT_LIMIT, i.itemType = "-attachment", this._isOnlineAvailable || (i.format = "json")) : t ? i.itemKey = t.join(",") : (i.limit = 20, i.itemType = "-attachment", this._isOnlineAvailable || (i.format = "json"));
	var a = r.API_PATHS.USERS + "/" + r._userId + "/" + r.API_PATHS.ITEMS, o = r._buildGetRequest(a, i);
	return r._parseResponse(o, r._userId);
}, O.prototype.getGroupItems = function(e, t, n, r) {
	var i = this;
	r ||= i.DEFAULT_FORMAT;
	var a = { format: r };
	e ? (a.q = e, a.limit = i.SEARCH_RESULT_LIMIT, this._isOnlineAvailable || (a.format = "json")) : n && (a.itemKey = n.join(","));
	var o = i.API_PATHS.GROUPS + "/" + t + "/" + i.API_PATHS.ITEMS, s = i._buildGetRequest(o, a);
	return i._parseResponse(s, t);
}, O.prototype.searchUserItemsEverything = function(e) {
	var t = this.API_PATHS.USERS + "/" + this._userId + "/" + this.API_PATHS.ITEMS, n = this._buildGetRequest(t, {
		format: "json",
		q: e,
		qmode: "everything",
		itemType: "-attachment",
		limit: 10
	});
	return this._parseResponse(n, this._userId);
}, O.prototype.getItemByKey = function(e, t) {
	var n = this.API_PATHS.USERS + "/" + this._userId + "/" + this.API_PATHS.ITEMS + "/" + e, r = this._buildGetRequest(n, { format: t || this.DEFAULT_FORMAT });
	return this._parseResponse(r, this._userId);
}, O.prototype.getGroupItemByKey = function(e, t, n) {
	var r = this.API_PATHS.GROUPS + "/" + e + "/" + this.API_PATHS.ITEMS + "/" + t, i = this._buildGetRequest(r, { format: n || this.DEFAULT_FORMAT });
	return this._parseResponse(i, e);
}, O.prototype.getUserGroups = function() {
	var e = this;
	return new Promise(function(t, n) {
		if (e._userGroupsLoaded) {
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
			}), e._userGroupsLoaded = !0, t(e._userGroups);
		}).catch(n);
	});
}, O.prototype.setApiKey = function(e) {
	var t = this, n = this.API_PATHS.KEYS + "/" + e;
	return this._buildGetRequest(n).then(function(e) {
		var t = e;
		if (!t.ok) throw Error(t.status + " " + t.statusText);
		return t.json();
	}).then(function(n) {
		return t._saveSettings(n.userID, e), !0;
	});
}, O.prototype._applySettings = function(e, t) {
	this._userId = e, this._apiKey = t;
}, O.prototype._saveSettings = function(e, t) {
	this._applySettings(e, t), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(e)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, t);
}, O.prototype.hasSettings = function() {
	var e = localStorage.getItem(this.STORAGE_KEYS.USER_ID), t = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
	return e && t ? (this._applySettings(Number(e), t), !0) : !1;
}, O.prototype.clearSettings = function() {
	localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userGroupsLoaded = !1, this._userId = 0, this._apiKey = null;
}, O.prototype.getUserId = function() {
	return this._userId;
}, O.prototype.setIsOnlineAvailable = function(e) {
	this._isOnlineAvailable = e;
}, O.prototype.getIsOnlineAvailable = function() {
	return this._isOnlineAvailable;
};
//#endregion
//#region src/app/shared/components/input.js
function ve(e, t) {
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
ve.prototype = {
	constructor: ve,
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
function ye(e, t) {
	if (typeof e == "string") {
		var n = document.getElementById(e);
		n instanceof HTMLElement && (e = n);
	}
	if (e instanceof HTMLElement) this.container = e;
	else throw Error("Invalid container element");
	this._options = Object.assign(this._options, t), this._isShow = !1;
}
ye.prototype = {
	constructor: ye,
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
function k(e, t) {
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
k.prototype = {
	constructor: k,
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
var A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), be = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), xe = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakSet(), Se = class {
	constructor(e, t) {
		if (u(this, F), c(this, A, void 0), c(this, j, void 0), c(this, be, void 0), c(this, M, null), c(this, N, void 0), c(this, P, /* @__PURE__ */ new Map()), c(this, xe, []), typeof e == "string") {
			var n = document.getElementById(e);
			n instanceof HTMLInputElement && (e = n);
		}
		if (!(e instanceof HTMLInputElement)) throw Error("Invalid input element");
		if (l(j, this, e), l(N, this, Object.assign({
			id: `radio_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
			checked: !1,
			disabled: !1,
			indeterminate: !1,
			label: "",
			name: "",
			value: "on"
		}, t)), r(F, this, Ce).call(this), l(A, this, document.createElement("div")), l(be, this, document.createElement("span")), r(F, this, we).call(this), r(F, this, Ee).call(this), r(F, this, De).call(this), !s(N, this).name) throw Error("Name attribute is required");
		var i = ke._.get(s(N, this).name);
		i || (i = [], ke._.set(s(N, this).name, i)), i.push(this);
	}
	subscribe(e) {
		var t = this;
		return s(xe, this).push(e), { unsubscribe: function() {
			l(xe, t, s(xe, t).filter(function(t) {
				return t !== e;
			}));
		} };
	}
	getElement() {
		return s(A, this);
	}
	check(e) {
		if (!(s(N, this).disabled || s(N, this).checked)) {
			if (s(N, this).name) {
				var t = ke._.get(s(N, this).name);
				t && t.forEach((e) => {
					e !== this && s(N, e).checked && e.uncheck();
				});
			}
			s(N, this).checked = !0, r(F, this, De).call(this), !e && r(F, this, Oe).call(this);
		}
	}
	uncheck(e) {
		s(N, this).disabled || !s(N, this).checked || (s(N, this).checked = !1, r(F, this, De).call(this), !e && r(F, this, Oe).call(this));
	}
	enable() {
		s(N, this).disabled && (s(N, this).disabled = !1, s(j, this).disabled = !1, s(A, this).setAttribute("aria-disabled", "false"), s(N, this).checked ? s(A, this).tabIndex = 0 : r(F, this, Te).call(this), s(A, this).classList.remove("radio--disabled"));
	}
	disable() {
		s(N, this).disabled || (s(N, this).disabled = !0, s(j, this).disabled = !0, s(A, this).setAttribute("aria-disabled", "true"), s(A, this).tabIndex = -1, s(A, this).classList.add("radio--disabled"));
	}
	setLabel(e) {
		s(N, this).label = e, s(M, this) ? s(M, this).textContent = e : e && (l(M, this, document.createElement("label")), s(M, this).className = "radio-label", s(M, this).htmlFor = String(s(N, this).id), s(M, this).textContent = e, s(A, this).appendChild(s(M, this)));
	}
	getState() {
		return {
			checked: !!s(N, this).checked,
			disabled: !!s(N, this).disabled,
			value: s(N, this).value || "",
			name: s(N, this).name || ""
		};
	}
	destroy() {
		if (l(xe, this, []), s(N, this).name) {
			var e = ke._.get(s(N, this).name);
			if (e) {
				var t = e.indexOf(this);
				t >= 0 && e.splice(t, 1);
			}
			s(P, this).forEach((e, t) => {
				s(A, this).removeEventListener(t, e);
			}), s(P, this).clear(), s(A, this) && s(A, this).parentNode && s(A, this).parentNode.removeChild(s(A, this)), l(M, this, null);
		}
	}
};
function Ce() {
	s(j, this).type = "radio";
	var e = s(j, this).getAttribute("id"), t = s(j, this).getAttribute("name"), n = s(j, this).getAttribute("value"), r = s(j, this).getAttribute("checked"), i = s(j, this).getAttribute("disabled");
	e === null ? s(N, this).id && s(j, this).setAttribute("id", s(N, this).id) : s(N, this).id = e, t === null ? s(N, this).name && s(j, this).setAttribute("name", s(N, this).name) : s(N, this).name = t, n === null ? s(N, this).value && s(j, this).setAttribute("value", s(N, this).value) : s(N, this).value = n, r === null ? s(N, this).checked && s(j, this).setAttribute("checked", "true") : s(N, this).checked = r === "true", i === null ? s(N, this).disabled && s(j, this).setAttribute("disabled", "true") : s(N, this).disabled = i === "true";
}
function we() {
	var e = s(j, this).parentNode, t = document.createDocumentFragment();
	t.appendChild(s(A, this)), s(A, this).classList.add("radio-button-container"), s(A, this).setAttribute("role", "radio"), s(A, this).setAttribute("aria-checked", String(!!s(N, this).checked)), s(A, this).setAttribute("aria-disabled", String(!!s(N, this).disabled)), s(A, this).tabIndex = s(N, this).disabled ? -1 : 0, s(be, this).className = "radio-visual", s(be, this).setAttribute("aria-hidden", "true"), s(N, this).label && (l(M, this, document.createElement("label")), s(M, this).className = "i18n radio-label", s(M, this).htmlFor = String(s(N, this).id), s(M, this).textContent = s(N, this).label), s(N, this).disabled && s(A, this).classList.add("radio--disabled"), e && e.insertBefore(t, s(j, this)), s(A, this).appendChild(s(j, this)), s(A, this).appendChild(s(be, this)), s(M, this) && s(A, this).appendChild(s(M, this)), r(F, this, Te).call(this);
}
function Te() {
	if (s(N, this).checked) s(A, this).tabIndex = s(N, this).disabled ? -1 : 0;
	else if (s(N, this).name && ke._.has(s(N, this).name)) {
		var e = ke._.get(s(N, this).name), t = !1;
		e && e.forEach((e) => {
			s(N, e).checked && e !== this && (t = !0);
		}), !t && !s(N, this).checked && !s(N, this).disabled ? s(A, this).tabIndex = 0 : s(A, this).tabIndex = -1;
	}
}
function Ee() {
	var e = (e) => {
		e.preventDefault(), !s(N, this).disabled && !s(N, this).checked && (this.check(), s(A, this).focus());
	}, t = (e) => {
		if (!s(N, this).disabled) switch (e.key) {
			case " ":
			case "Spacebar":
			case "Enter":
				e.preventDefault(), s(N, this).checked || this.check();
				break;
		}
	}, n = () => {
		s(A, this).classList.add("radio--focused");
	}, r = () => {
		s(A, this).classList.remove("radio--focused");
	};
	s(P, this).set("click", e), s(P, this).set("keydown", t), s(P, this).set("focus", n), s(P, this).set("blur", r), s(A, this).addEventListener("click", e), s(A, this).addEventListener("keydown", t), s(A, this).addEventListener("focus", n), s(A, this).addEventListener("blur", r);
}
function De() {
	s(A, this).setAttribute("aria-checked", String(!!s(N, this).checked)), s(A, this).classList.toggle("radio--checked", s(N, this).checked), s(j, this).checked = !!s(N, this).checked, r(F, this, Te).call(this);
}
function Oe(e) {
	var t = {
		type: "radio:change",
		detail: this.getState()
	};
	e && (t.originalEvent = e), s(xe, this).forEach(function(e) {
		e(t);
	});
}
var ke = { _: /* @__PURE__ */ new Map() };
//#endregion
//#region src/app/shared/components/checkbox.js
function Ae(e, t) {
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
Ae.prototype = {
	constructor: Ae,
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
var I = /*#__PURE__*/ new WeakSet(), je = class {
	constructor(e, t) {
		if (u(this, I), typeof e == "string") {
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
				r(I, this, Pe).call(this, e);
			},
			search: (e) => {
				r(I, this, Fe).call(this, e);
			},
			close: (e) => {
				e.target instanceof HTMLElement && !this._container.contains(e.target) && !e.target.classList.contains("selectbox-option") && r(I, this, L).call(this);
			},
			keydown: (e) => {
				r(I, this, Re).call(this, e);
			},
			dropdownClick: (e) => {
				r(I, this, Be).call(this, e);
			},
			scrollCheck: () => {
				if (this._headerRectOnOpen) {
					var e = this._header.getBoundingClientRect();
					Math.abs(e.top - this._headerRectOnOpen.top) > 1 && r(I, this, L).call(this);
				}
			}
		}, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), r(I, this, Me).call(this), r(I, this, Ne).call(this), r(I, this, ze).call(this), Ke._.add(this);
	}
	openDropdown() {
		this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._headerRectOnOpen = this._header.getBoundingClientRect(), document.addEventListener("scroll", this._boundHandles.scrollCheck, !0), this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(function(e) {
			return function() {
				e.searchInput && e.searchInput.focus();
			};
		}(this), 100), r(I, this, ze).call(this), r(I, this, He).call(this);
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
		n && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(e)), r(I, this, Ve).call(this);
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
		}, this), this.isOpen && r(I, this, ze).call(this), r(I, this, Ve).call(this);
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
		}), this._selectedValues.delete(e), r(I, this, Ve).call(this);
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
			r(I, this, L).call(this);
		}
		r(I, this, Ve).call(this), !t && r(I, this, Ue).call(this, i, !0);
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
		r(I, this, Ve).call(this), !t && r(I, this, Ue).call(this, i, !0);
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
		r(I, this, Ve).call(this), r(I, this, ze).call(this);
	}
	destroy() {
		this._subscribers = [], Ke._.delete(this);
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
function Me() {
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
			var a = r(I, this, Ge).call(this, this._selectbox);
			this.addItems(a.values, a.selectedValue), this._selectbox.remove();
		}
	}
}
function Ne() {
	this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
		e.stopPropagation();
	}), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function Pe(e) {
	if (e && e.stopPropagation(), this.isOpen ? r(I, this, L).call(this) : this.openDropdown(), e && e.type === "click") for (var t of Ke._) t.isOpen && t !== this && r(I, t, L).call(t);
}
function L() {
	this.isOpen && document && this._boundHandles && (document.removeEventListener("click", this._boundHandles.close), document.removeEventListener("scroll", this._boundHandles.scrollCheck, !0)), this.isOpen = !1, this._dropdown.style.display = "none", this._options.usePortal ? (this._dropdown.style.left = "", this._dropdown.style.width = "", this._dropdown.style.top = "") : this._dropdown.classList.remove("selectbox-dropdown-top");
	for (var e = this._arrow.className.split(" "), t = [], n = 0; n < e.length; n++) e[n] !== "selectbox-arrow-open" && t.push(e[n]);
	this._arrow.className = t.join(" ");
	for (var r = this._header.className.split(" "), i = [], n = 0; n < r.length; n++) r[n] !== "selectbox-header-open" && i.push(r[n]);
	this._header.className = i.join(" "), this.searchInput && (this.searchInput.value = "");
}
function Fe(e) {
	var t = e.target;
	if (t instanceof HTMLInputElement) {
		var n = t.value.toLowerCase();
		r(I, this, ze).call(this, n);
	}
}
function Ie(e, t) {
	if (t === null) return !1;
	if (!e) return !0;
	var n = e.split(/\s+/).filter(Boolean), r = t.text.toLowerCase();
	return n.every(function(e) {
		return r.indexOf(e) !== -1;
	});
}
function Le(e) {
	var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", n, i = this._items.filter(function(e) {
		return e !== null;
	});
	if (t && (i = i.filter((e) => r(I, this, Ie).call(this, t, e))), i.length !== 0) {
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
		r(I, this, Ve).call(this), r(I, this, ze).call(this, t, !0), r(I, this, Ue).call(this, n.value, !0);
	}
}
function Re(e) {
	switch (e.key || e.keyCode) {
		case "Enter":
		case 13:
			e.preventDefault(), r(I, this, Pe).call(this, e);
			break;
		case "Escape":
		case 27:
			r(I, this, L).call(this);
			break;
		case "ArrowDown":
		case 40:
			e.preventDefault(), r(I, this, Le).call(this, "down");
			break;
		case "ArrowUp":
		case 38:
			e.preventDefault(), r(I, this, Le).call(this, "up");
			break;
		case "Tab":
		case 9:
			r(I, this, L).call(this);
			break;
	}
}
function ze(e, t) {
	if (e ||= "", this._optionsContainer) {
		this._optionsContainer.innerHTML = "";
		var n = null, i = this._items;
		e && (i = i.filter((t) => r(I, this, Ie).call(this, e, t)));
		for (var a = document.createDocumentFragment(), o = 0; o < i.length; o++) {
			var s = i[o];
			if (!s) {
				var c = document.createElement("hr");
				c.className += " selectbox-option-divider", a.appendChild(c);
				continue;
			}
			var l = document.createElement("div");
			l.className += " selectbox-option", this._selectedValues.has(s.value) && (l.className += " selectbox-option-selected checkbox--checked", n = l), l.setAttribute("data-value", s.value);
			var u = document.createElement("label");
			if (u.className += " selectbox-option-text i18n", this._options.translate && (s.text = this._options.translate(s.text)), u.textContent = s.text, this._options.multiple) {
				l.className += " selectbox-option-checkbox";
				var d = document.createElement("input");
				d.type = "checkbox", d.id = "checkbox-" + s.value, d.className += " selectbox-checkbox", d.checked = this._selectedValues.has(s.value), l.appendChild(d);
				var f = document.createElement("span");
				f.className = "checkbox-visual", f.setAttribute("aria-hidden", "true");
				var p = "http://www.w3.org/2000/svg", m = document.createElementNS(p, "svg");
				m.setAttribute("viewBox", "0 0 10 8"), m.setAttribute("class", "checkbox-checkmark");
				var h = document.createElementNS(p, "path");
				h.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), h.setAttribute("fill", "none"), h.setAttribute("stroke", "currentColor"), h.setAttribute("stroke-width", "2"), m.appendChild(h), f.appendChild(m), l.appendChild(f);
			}
			l.appendChild(u), a.appendChild(l);
		}
		if (this._customItems.length) {
			var g = document.createElement("hr");
			g.className += " selectbox-option-divider", a.appendChild(g);
		}
		for (var o = 0; o < this._customItems.length; o++) {
			var _ = this._customItems[o], v = document.createElement("label");
			v.className += " selectbox-custom-option", v.setAttribute("data-value", _.value), v.setAttribute("for", _.value);
			var y = document.createElement("span");
			y.className += " selectbox-option-text i18n", this._options.translate && (_.text = this._options.translate(_.text)), y.textContent = _.text, v.appendChild(y), a.appendChild(v);
		}
		if (this._optionsContainer.appendChild(a), t && this.isOpen && this._optionsContainer && n) try {
			n.scrollIntoView && n.scrollIntoView({ block: "nearest" });
		} catch (e) {
			console.error(e);
		}
	}
}
function Be(e) {
	var t = e.target || e.srcElement, n = null;
	if (t && t instanceof HTMLElement) {
		for (var i = null, a = t.className.split(" "), o = !1, s = 0; s < a.length; s++) if (a[s] === "selectbox-option") {
			o = !0;
			break;
		} else if (a[s] === "selectbox-custom-option") {
			var c = t.getAttribute("data-value");
			if (c) {
				e.stopPropagation(), r(I, this, We).call(this, c), r(I, this, L).call(this);
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
					e.stopPropagation(), r(I, this, We).call(this, d), r(I, this, L).call(this);
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
		this._options.multiple ? this._selectedValues.has(f) ? (this.unselectItems(f, !0), p = !1) : this.selectItems(f, !0) : (this.selectItems(f, !0), r(I, this, L).call(this)), r(I, this, Ve).call(this), r(I, this, Ue).call(this, f, p);
	}
}
function Ve() {
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
function He() {
	var e = window.innerHeight;
	if (this._options.usePortal) {
		var t = this._header.getBoundingClientRect(), n = this._dropdown.offsetHeight;
		this._dropdown.style.left = t.left + "px", this._dropdown.style.width = t.width - 2 + "px";
		var r = e - t.bottom;
		r < n && t.top > r ? this._dropdown.style.top = t.top - n - 2 + "px" : this._dropdown.style.top = t.bottom + 2 + "px";
	} else this._dropdown.getBoundingClientRect().bottom > e && this._dropdown.classList.add("selectbox-dropdown-top");
}
function Ue(e, t) {
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
function We(e) {
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
function Ge(e) {
	var t = { values: Array.from(e.options).map((e) => [e.value, e.text]) }, n = e.value;
	return n && (t.selectedValue = n), t;
}
var Ke = { _: /* @__PURE__ */ new Set() }, qe, Je = /*#__PURE__*/ new WeakMap(), Ye = /*#__PURE__*/ new WeakMap(), Xe = /*#__PURE__*/ new WeakMap(), Ze = /*#__PURE__*/ new WeakSet(), R = class e {
	constructor(e, t) {
		u(this, Ze), c(this, Je, void 0), c(this, Ye, null), c(this, Xe, null);
		var n = document.getElementById(e);
		if (!(n instanceof HTMLElement)) throw Error("Invalid container");
		l(Je, this, n), r(Ze, this, Qe).call(this, t);
	}
	show() {
		var e;
		(e = s(Je, this)) == null || e.classList.remove("hidden");
	}
	hide() {
		var e;
		(e = s(Je, this)) == null || e.classList.add("hidden");
	}
	setText(e) {
		s(Xe, this) && (s(Xe, this).innerText = e);
	}
	setProgress(t) {
		$e.call(e, s(Je, this), s(Ye, this), t);
	}
	static show() {
		var t;
		(t = r(e, this, et)._) == null || t.classList.remove("hidden");
	}
	static hide() {
		var t;
		(t = r(e, this, et)._) == null || t.classList.add("hidden");
	}
	static setText(t) {
		r(e, this, nt)._ && (r(e, this, nt)._.innerText = t);
	}
	static setProgress(t) {
		r(e, this, $e).call(this, r(e, this, et)._, r(e, this, tt)._, t);
	}
};
qe = R;
function Qe(e) {
	s(Je, this).classList.add("loader-container");
	var t = "http://www.w3.org/2000/svg", n = document.createElementNS(t, "svg");
	n.classList.add("loader-image"), n.setAttribute("viewBox", "0 0 20 20");
	var r = document.createElementNS(t, "circle");
	r.setAttribute("cx", "10"), r.setAttribute("cy", "10"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "1.5"), r.setAttribute("r", "7.25"), r.setAttribute("stroke-dasharray", "160%, 40%"), n.appendChild(r), s(Je, this).appendChild(n);
	var i = document.createElement("div");
	i.classList.add("loader-title"), i.classList.add("i18n"), i.innerText = e, s(Je, this).appendChild(i), l(Ye, this, r), l(Xe, this, i);
}
function $e(e, t, n) {
	if (!(!e || !t)) {
		if (n == null) {
			e.classList.remove("loader-determinate"), t.style.strokeDasharray = "", t.style.strokeDashoffset = "";
			return;
		}
		var i = Math.max(0, Math.min(1, n));
		e.classList.add("loader-determinate"), t.style.strokeDasharray = String(r(qe, this, rt)._), t.style.strokeDashoffset = String(r(qe, this, rt)._ * (1 - i));
	}
}
var et = { _: document.getElementById("loader") }, tt = { _: document.querySelector("#loader .loader-image circle") }, nt = { _: document.querySelector("#loader .loader-title") }, rt = { _: 2 * Math.PI * 7.25 };
//#endregion
//#region src/app/services/translate-service.js
function z(e) {
	try {
		return window.Asc.plugin.tr(e);
	} catch (t) {
		return console.error(t), e;
	}
}
//#endregion
//#region src/app/services/csl-html-parser.js
var it = class e {
	static purifyHtml(t) {
		if (typeof t != "string" || t.length === 0) return "";
		var n = r(e, this, ot)._, i = new DOMParser().parseFromString("<div id=\"__purify_root__\">" + t + "</div>", "text/html").getElementById("__purify_root__");
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
			n.has(s) ? at.call(e, o) : a(o);
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
			if (l.indexOf("font-variant:small-caps") === -1 ? l.indexOf("text-decoration:underline") !== -1 && (f = "u") : f = "sc", r(e, this, ot)._.has(d)) if (s) {
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
function at(e) {
	var t = /^\s*(javascript|vbscript|data)\s*:/i;
	for (var n of Array.from(e.attributes)) {
		var r = n.name.toLowerCase(), i = n.value || "";
		if (r.startsWith("on")) {
			e.removeAttribute(n.name);
			continue;
		}
		if (st._.has(r)) {
			var a = i.replace(/[\u0000-\u001F\u007F]/g, "");
			if (t.test(a)) {
				e.removeAttribute(n.name);
				continue;
			}
		}
		r === "style" && /expression\s*\(|javascript\s*:/i.test(i) && e.removeAttribute(n.name);
	}
}
var ot = { _: new Set([
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
]) }, st = { _: new Set([
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
]) }, B = class {
	static formatAfterInsert(e, t) {
		return new Promise(function(n) {
			var r = !0, i = !1;
			Asc.scope.formatting = e, Asc.scope.textToMatch = t || "", Asc.plugin.callCommand(function() {
				var e = Api.GetDocument();
				function t(e, t) {
					t === "sup" ? e.SetVertAlign("superscript") : t === "sub" ? e.SetVertAlign("subscript") : t === "sc" ? e.SetSmallCaps(!0) : t === "u" ? e.SetUnderline(!0) : t === "b" ? e.SetBold(!0) : (t === "i" || t === "em") && e.SetItalic(!0);
				}
				var n = null, r = e.GetCurrentFootEndnote();
				if (r && Asc.scope.textToMatch) for (var i = r.GetElementsCount(), a = 0; a < i; a++) {
					var o = r.GetElement(a);
					if (o) {
						for (var s = o.GetElementsCount ? o.GetElementsCount() : 0, c = 0; c < s; c++) {
							var l = o.GetElement(c);
							if (!(!l || typeof l.GetRange != "function") && (l.GetText ? l.GetText() : "") === Asc.scope.textToMatch) {
								n = l;
								break;
							}
						}
						if (n) break;
					}
				}
				if (n ||= e.GetCurrentRun(), n) for (var u = Asc.scope.formatting.length - 1; u >= 0; u--) {
					var d = Asc.scope.formatting[u], f = n.GetRange(d.start, d.end);
					f && t(f, d.type);
				}
			}, i, r, n);
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
				var i = null, a = t.GetAllParagraphs();
				if (a && a.length) for (var o = 0; o < a.length; o++) {
					var s = a[o];
					if (s) {
						for (var c = s.GetElementsCount(), l = 0; l < c; l++) {
							var u = s.GetElement(l);
							if (!(!u || typeof u.GetRange != "function") && (u.GetText ? u.GetText() : "") === Asc.scope.text) {
								i = u;
								break;
							}
						}
						if (i) break;
					}
				}
				if (i ||= (e.MoveCursorToPos(t.GetEndPos() - Asc.scope.text.length), e.GetCurrentRun()), i) for (var d = Asc.scope.formatting.length - 1; d >= 0; d--) {
					var f = Asc.scope.formatting[d], p = i.GetRange(f.start, f.end);
					p && n(p, f.type);
				}
			}, r, n, e);
		});
	}
}, ct = /*#__PURE__*/ new WeakMap(), lt = /*#__PURE__*/ new WeakMap(), ut = /*#__PURE__*/ new WeakMap(), dt = /*#__PURE__*/ new WeakMap(), ft = /*#__PURE__*/ new WeakMap(), pt = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakSet(), mt = class {
	constructor(e, t, n, r) {
		u(this, V), c(this, ct, void 0), c(this, lt, void 0), c(this, ut, void 0), c(this, dt, void 0), c(this, ft, void 0), c(this, pt, void 0), l(ct, this, "ZOTERO_CITATION"), l(ut, this, "ZOTERO_BIBLIOGRAPHY"), l(lt, this, e), l(dt, this, t), l(ft, this, n), l(pt, this, r);
	}
	addBibliography(e, t) {
		var n = this;
		return a(function* () {
			var i = window.Asc.scope.editorVersion;
			if (i && i < 9004e3) {
				var a = it.parseHtmlFormatting(e), o = "", c = {
					FieldId: o,
					Value: s(ft, n) + " " + t + " " + s(pt, n),
					Content: a.text
				};
				return r(V, n, ht).call(n, c).then(() => n.getCurrentField()).then((e) => {
					if (o = e?.FieldId || "", a.formatting.length) return o ? r(V, n, H).call(n, o).then(() => B.formatAfterUpdate(o, a)) : B.formatAfterInsert(a.formatting, a.text);
				}).then(() => o);
			} else {
				var l = {
					FieldId: "",
					Value: s(ft, n) + " " + t + " " + s(pt, n),
					Content: " "
				};
				return yield r(V, n, Tt).call(n, l, e);
			}
		})();
	}
	addCitation(e, t, n) {
		var i = this;
		return a(function* () {
			var a = it.parseHtmlFormatting(e), o = {
				FieldId: "",
				Value: s(lt, i) + " " + s(dt, i) + " " + t,
				Content: a.text
			}, c = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1), l = c ? yield r(V, i, bt).call(i) : !1, u = c && !l;
			if (u && (yield r(V, i, gt).call(i, n)), yield r(V, i, ht).call(i, o), a.formatting.length) {
				var d = yield i.getCurrentField();
				d && d.FieldId ? (yield r(V, i, H).call(i, d.FieldId), yield B.formatAfterUpdate(d.FieldId, a)) : yield B.formatAfterInsert(a.formatting, a.text);
			}
			return u && (yield r(V, i, Ct).call(i)), u;
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
			r(V, e, _t).call(e).then(function(r) {
				try {
					r.length && (r = r.filter(function(t) {
						return t.Value.indexOf(s(lt, e)) !== -1 || t.Value.indexOf(s(ft, e)) !== -1 || t.Value.indexOf(s(ct, e)) !== -1 || t.Value.indexOf(s(ut, e)) !== -1;
					}));
				} catch (e) {
					n(e);
				}
				t(r);
			});
		});
	}
	scanForBrokenFields() {
		return new Promise((e) => {
			Asc.plugin.callCommand(() => {
				function e(e, t) {
					for (var n = [], r = 0; r < e.length; r++) {
						var i = e[r].GetText().trim();
						/^ADDIN\s*(ZOTERO_ITEM|ZOTERO_BIBL)/i.test(i) && i.indexOf("{") !== -1 && i.lastIndexOf("}") === i.length - 1 && n.push({
							location: t,
							index: r,
							rawValue: i
						});
					}
					return n;
				}
				var t = Api.GetDocument();
				return e(t.GetAllParagraphs(), "body").concat(e(t.GetFootnotesFirstParagraphs(), "footnote")).concat(e(t.GetEndNotesFirstParagraphs(), "endnote"));
			}, !1, !0, (t) => e(t || []));
		});
	}
	repairBrokenField(e, t) {
		var n = this;
		return a(function* () {
			return (yield r(V, n, St).call(n, e.location, e.index)) ? (yield r(V, n, xt).call(n), yield r(V, n, ht).call(n, t), n.getCurrentField()) : null;
		})();
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
			var n = e.map((e) => e.FieldId), i = window.Asc.scope.editorVersion, a = e.filter((e) => e.Value.indexOf(s(ft, t)) === 0);
			if (a.length && i && i >= 9004e3) {
				e = e.filter((e) => e.Value.indexOf(s(ft, t)) !== 0);
				var o = a[0];
				yield r(V, t, H).call(t, o.FieldId);
				var c = o.Content || "";
				o.Content = " ", yield r(V, t, xt).call(t), yield r(V, t, Tt).call(t, o, c);
			}
			var l = r(V, t, vt).call(t, e);
			if (yield new Promise((t) => {
				window.Asc.plugin.executeMethod("UpdateAddinFields", [e], t);
			}), !l.size) return n;
			for (var u of l) {
				var d = v(u, 2), f = d[0], p = d[1];
				(yield r(V, t, H).call(t, f)) && (yield B.formatAfterUpdate(f, p));
			}
			return n;
		})();
	}
	updateAddinFieldsInNotes(e) {
		var t = this;
		return a(function* () {
			var n = e.map((e) => e.FieldId), i = r(V, t, vt).call(t, e);
			if (yield new Promise((t) => {
				window.Asc.plugin.executeMethod("UpdateAddinFields", [e], t);
			}), !i.size) return n;
			for (var a of i) {
				var o = v(a, 2), s = o[0], c = o[1];
				yield B.formatAfterUpdate(s, c);
			}
			return n;
		})();
	}
	convertNotesToText(e) {
		var t = this;
		return a(function* () {
			for (var n = r(V, t, vt).call(t, e), i = 0; i < e.length; i++) {
				var a = e[i];
				if (!a.FieldId) {
					console.error("Field id is not defined");
					continue;
				}
				if ((yield r(V, t, H).call(t, a.FieldId)) && (yield r(V, t, Ct).call(t))) {
					yield r(V, t, wt).call(t), yield r(V, t, xt).call(t), yield r(V, t, ht).call(t, a);
					var o = n.get(a.FieldId);
					if (o) {
						var s = yield t.getCurrentField();
						s && s.FieldId ? (yield r(V, t, H).call(t, s.FieldId), yield B.formatAfterUpdate(s.FieldId, o)) : yield B.formatAfterInsert(o.formatting, o.text);
					}
				}
			}
		})();
	}
	convertTextToNotes(e, t) {
		var n = this;
		return a(function* () {
			for (var i = r(V, n, vt).call(n, e), a = 0; a < e.length; a++) {
				var o = e[a];
				if (o.FieldId && (yield r(V, n, H).call(n, o.FieldId))) {
					yield r(V, n, xt).call(n), yield r(V, n, gt).call(n, t), yield r(V, n, ht).call(n, o);
					var s = i.get(o.FieldId);
					if (s) {
						var c = yield n.getCurrentField();
						c && c.FieldId ? (yield r(V, n, H).call(n, c.FieldId), yield B.formatAfterUpdate(c.FieldId, s)) : yield B.formatAfterInsert(s.formatting, s.text);
					}
				}
			}
		})();
	}
	convertNotesStyle(e, t) {
		var n = this;
		return a(function* () {
			for (var i = [], a = r(V, n, vt).call(n, e), o = 0; o < e.length; o++) {
				var s = e[o];
				if (s.FieldId) {
					if (!s.Content) {
						i.push(s);
						continue;
					}
					if (yield r(V, n, H).call(n, s.FieldId)) {
						if (yield r(V, n, bt).call(n)) {
							i.push(s);
							continue;
						}
						yield r(V, n, gt).call(n, t), yield r(V, n, ht).call(n, s);
						var c = a.get(s.FieldId);
						if (c) {
							var l = yield n.getCurrentField();
							l && l.FieldId ? (yield r(V, n, H).call(n, l.FieldId), yield B.formatAfterUpdate(l.FieldId, c)) : yield B.formatAfterInsert(c.formatting, c.text);
						}
					}
				}
			}
			if (i.length) {
				yield new Promise(function(e) {
					window.Asc.plugin.executeMethod("UpdateAddinFields", [i], e);
				});
				for (var u of i) {
					var d = a.get(u.FieldId);
					d && (yield r(V, n, H).call(n, u.FieldId)) && (yield B.formatAfterUpdate(u.FieldId, d));
				}
			}
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
function ht(e) {
	return new Promise(function(t) {
		window.Asc.plugin.executeMethod("AddAddinField", [e], t);
	});
}
function gt(e) {
	return Asc.scope.notesStyle = e, new Promise((e) => {
		Asc.plugin.callCommand(() => {
			var e = Api.GetDocument();
			Asc.scope.notesStyle === "footnotes" ? e.AddFootnote() : Asc.scope.notesStyle === "endnotes" && e.AddEndnote();
		}, !1, !1, e);
	});
}
function _t() {
	return new Promise(function(e, t) {
		window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
	});
}
function vt(e) {
	var t = /* @__PURE__ */ new Map();
	return e.forEach(function(e) {
		if (e.Content) {
			var n = it.parseHtmlFormatting(e.Content);
			e.Content = n.text, n.formatting.length && e.FieldId && t.set(e.FieldId, n);
		}
	}), t;
}
function yt(e) {
	return new Promise(function(t) {
		window.Asc.plugin.executeMethod("PasteHtml", [e], t);
	});
}
function bt() {
	return new Promise((e) => {
		Asc.plugin.callCommand(() => !!Api.GetDocument().GetCurrentFootEndnote(), !1, !0, (t) => e(!!t));
	});
}
function xt() {
	return new Promise((e) => {
		window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
	});
}
function H(e) {
	return new Promise(function(t) {
		window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
	});
}
function St(e, t) {
	return new Promise((n) => {
		Asc.scope.brokenFieldLocation = e, Asc.scope.brokenFieldIndex = t, Asc.plugin.callCommand(() => {
			var e = Api.GetDocument(), t = (Asc.scope.brokenFieldLocation === "footnote" ? e.GetFootnotesFirstParagraphs() : Asc.scope.brokenFieldLocation === "endnote" ? e.GetEndNotesFirstParagraphs() : e.GetAllParagraphs())[Asc.scope.brokenFieldIndex];
			return t ? (t.Select(), !0) : !1;
		}, !1, !0, (e) => n(!!e));
	});
}
function Ct() {
	return new Promise(function(e) {
		Asc.plugin.callCommand(() => {
			var e = Api.GetDocument().GetCurrentFootEndnote();
			e && e.SelectNoteReference();
		}, !1, !0, () => e(!0));
	});
}
function wt() {
	return new Promise(function(e) {
		Asc.plugin.callCommand(() => {
			var e = Api.GetDocument().GetRangeBySelect();
			e && e.SetVertAlign("baseline");
		}, !1, !1, e);
	});
}
function Tt(e, t) {
	return Et.apply(this, arguments);
}
function Et() {
	return Et = a(function* (e, t) {
		if (t = it.purifyHtml(t), yield r(V, this, ht).call(this, e), yield new Promise((e) => {
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
		}), t = n.body.innerHTML, yield r(V, this, yt).call(this, t);
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
		return yield r(V, this, H).call(this, s.FieldId), yield new Promise((e) => {
			var t = !1, n = !1;
			Asc.scope.numbers = a, Asc.scope.hash = o, Asc.plugin.callCommand(() => {
				var e = Api.GetDocument().GetRangeBySelect();
				if (e) {
					var t = Asc.scope.bibStyle;
					e.GetAllParagraphs().forEach((e, n) => {
						if (e.GetText().trim() !== "") if (typeof t.linespacing == "number" && e.SetSpacingLine(240 * t.linespacing, "exact"), typeof t.entryspacing == "number" && e.SetSpacingAfter(240 * t.entryspacing), t["second-field-align"]) {
							for (var r = String(Asc.scope.numbers[n]), i = 0; i < e.GetElementsCount(); i++) {
								var a = e.GetElement(i);
								if (a.GetText() === r) {
									a.AddTabStop(), a.SetItalic(!1);
									break;
								}
							}
							e.Search(Asc.scope.hash, !0)[0].Delete(), e.SetIndLeft(t.maxoffset * 120), e.SetIndFirstLine(-(t.maxoffset * 120));
						} else t.hangingindent && (e.SetIndLeft(720), e.SetIndFirstLine(-720));
					});
				}
			}, n, t, e);
		}), Asc.scope.bibStyle = null, s.FieldId;
	}), Et.apply(this, arguments);
}
//#endregion
//#region src/app/csl/citation/storage.js
var Dt = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), Ot = /*#__PURE__*/ new WeakSet(), kt = class {
	constructor() {
		u(this, Ot), c(this, Dt, void 0), c(this, U, void 0), c(this, W, void 0), l(Dt, this, []), l(U, this, []), l(W, this, []), this.size = 0;
	}
	getItem(e) {
		e = e.toString();
		var t = s(U, this).indexOf(e);
		return t >= 0 ? s(Dt, this)[t] : null;
	}
	getItemIndex(e) {
		return e = e.toString(), s(U, this).indexOf(e);
	}
	clear() {
		return l(Dt, this, []), l(W, this, []), l(U, this, []), this.size = 0, this;
	}
	deleteItem(e) {
		e = e.toString();
		var t = s(U, this).indexOf(e);
		return t >= 0 && (s(Dt, this).splice(t, 1), s(U, this).splice(t, 1), this.size--), this;
	}
	forEachItem(e) {
		for (var t = 0; t < this.size; t++) e(s(Dt, this)[t], s(U, this)[t], this);
	}
	hasItem(e) {
		return e = e.toString(), s(U, this).indexOf(e) >= 0;
	}
	addCslCitation(e) {
		return s(W, this).push(e), e.setNoteIndex(s(W, this).length), e.getCitationItems().forEach((e) => {
			r(Ot, this, At).call(this, e.id, e);
		}), this;
	}
	getAllCitationsInJson() {
		return s(W, this).map((e) => e.toJSON());
	}
	getCitation(e) {
		return s(W, this).find((t) => t.citationID === e);
	}
	getCitationIndex(e) {
		return s(W, this).findIndex((t) => t.citationID === e);
	}
	getCitationsPre(e) {
		var t = [];
		return s(W, this).find((n, r) => n.citationID === e ? !0 : (t.push([n.citationID, r + 1]), !1)), t;
	}
	getCitationsPost(e) {
		for (var t = [], n = this.getCitationIndex(e) + 1; n < s(W, this).length; n++) {
			var r = s(W, this)[n];
			t.push([r.citationID, n + 1]);
		}
		return t;
	}
};
function At(e, t) {
	e = e.toString();
	var n = s(U, this).indexOf(e);
	return n >= 0 ? (s(Dt, this)[n] = t, this) : (s(Dt, this).push(t), s(U, this).push(e), this.size++, this);
}
//#endregion
//#region src/app/csl/citation/citation-item-data.js
var jt = ["userID", "groupID"];
function G(e) {
	if (typeof e != "string" && typeof e != "number") throw Error("CitationItemData: id is required");
	this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = [], this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = [], this._chair = [], this._collectionEditor = [], this._compiler = [], this._composer = [], this._containerAuthor = [], this._contributor = [], this._curator = [], this._director = [], this._editor = [], this._editorialDirector = [], this._executiveProducer = [], this._guest = [], this._host = [], this._illustrator = [], this._narrator = [], this._organizer = [], this._originalAuthor = [], this._performer = [], this._producer = [], this._recipient = [], this._reviewedAuthor = [], this._scriptwriter = [], this._seriesCreator = [], this._translator = [], this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
G.prototype._addCustomProperty = function(e, t) {
	return this._custom[e] = t, this;
}, G.prototype.getCustomProperty = function(e) {
	return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
}, G.prototype.fillFromObject = function(e) {
	if (Object.hasOwnProperty.call(e, "type") && (this._type = e.type), Object.hasOwnProperty.call(e, "categories") && (this._categories = e.categories), Object.hasOwnProperty.call(e, "citation-key") && (this._citationKey = e["citation-key"]), Object.hasOwnProperty.call(e, "language") && (this._language = e.language), Object.hasOwnProperty.call(e, "journalAbbreviation") && (this._journalAbbreviation = e.journalAbbreviation), Object.hasOwnProperty.call(e, "shortTitle") && (this._shortTitle = e.shortTitle), Object.hasOwnProperty.call(e, "author") && (this._author = e.author), Object.hasOwnProperty.call(e, "chair") && (this._chair = e.chair), Object.hasOwnProperty.call(e, "collection-editor") && (this._collectionEditor = e["collection-editor"]), Object.hasOwnProperty.call(e, "compiler") && (this._compiler = e.compiler), Object.hasOwnProperty.call(e, "composer") && (this._composer = e.composer), Object.hasOwnProperty.call(e, "container-author") && (this._containerAuthor = e["container-author"]), Object.hasOwnProperty.call(e, "contributor") && (this._contributor = e.contributor), Object.hasOwnProperty.call(e, "curator") && (this._curator = e.curator), Object.hasOwnProperty.call(e, "director") && (this._director = e.director), Object.hasOwnProperty.call(e, "editorial-director") && (this._editorialDirector = e["editorial-director"]), Object.hasOwnProperty.call(e, "editor") && (this._editor = e.editor), Object.hasOwnProperty.call(e, "executive-producer") && (this._executiveProducer = e["executive-producer"]), Object.hasOwnProperty.call(e, "guest") && (this._guest = e.guest), Object.hasOwnProperty.call(e, "host") && (this._host = e.host), Object.hasOwnProperty.call(e, "illustrator") && (this._illustrator = e.illustrator), Object.hasOwnProperty.call(e, "narrator") && (this._narrator = e.narrator), Object.hasOwnProperty.call(e, "organizer") && (this._organizer = e.organizer), Object.hasOwnProperty.call(e, "original-author") && (this._originalAuthor = e["original-author"]), Object.hasOwnProperty.call(e, "performer") && (this._performer = e.performer), Object.hasOwnProperty.call(e, "producer") && (this._producer = e.producer), Object.hasOwnProperty.call(e, "recipient") && (this._recipient = e.recipient), Object.hasOwnProperty.call(e, "reviewed-author") && (this._reviewedAuthor = e["reviewed-author"]), Object.hasOwnProperty.call(e, "script-writer") && (this._scriptWriter = e["script-writer"]), Object.hasOwnProperty.call(e, "series-creator") && (this._seriesCreator = e["series-creator"]), Object.hasOwnProperty.call(e, "translator") && (this._translator = e.translator), Object.hasOwnProperty.call(e, "accessed") && (this._accessed = e.accessed), Object.hasOwnProperty.call(e, "container") && (this._container = e.container), Object.hasOwnProperty.call(e, "event-date") && (this._eventDate = e["event-date"]), Object.hasOwnProperty.call(e, "issued") && (this._issued = e.issued), Object.hasOwnProperty.call(e, "original-date") && (this._originalDate = e["original-date"]), Object.hasOwnProperty.call(e, "submitted") && (this._submitted = e.submitted), Object.hasOwnProperty.call(e, "abstract") && (this._abstract = e.abstract), Object.hasOwnProperty.call(e, "annote") && (this._annote = e.annote), Object.hasOwnProperty.call(e, "archive") && (this._archive = e.archive), Object.hasOwnProperty.call(e, "archive_collection") && (this._archiveCollection = e.archive_collection), Object.hasOwnProperty.call(e, "archive_location") && (this._archiveLocation = e.archive_location), Object.hasOwnProperty.call(e, "archive-place") && (this._archivePlace = e["archive-place"]), Object.hasOwnProperty.call(e, "authority") && (this._authority = e.authority), Object.hasOwnProperty.call(e, "call-number") && (this._callNumber = e["call-number"]), Object.hasOwnProperty.call(e, "chapter-number") && (this._chapterNumber = e["chapter-number"]), Object.hasOwnProperty.call(e, "citation-number") && (this._citationNumber = e["citation-number"]), Object.hasOwnProperty.call(e, "citation-label") && (this._citationLabel = e["citation-label"]), Object.hasOwnProperty.call(e, "collection-number") && (this._collectionNumber = e["collection-number"]), Object.hasOwnProperty.call(e, "collection-title") && (this._collectionTitle = e["collection-title"]), Object.hasOwnProperty.call(e, "container-title") && (this._containerTitle = e["container-title"]), Object.hasOwnProperty.call(e, "container-title-short") && (this._containerTitleShort = e["container-title-short"]), Object.hasOwnProperty.call(e, "dimensions") && (this._dimensions = e.dimensions), Object.hasOwnProperty.call(e, "DOI") && (this._DOI = e.DOI), Object.hasOwnProperty.call(e, "edition") && (this._edition = e.edition), Object.hasOwnProperty.call(e, "event") && (this._event = e.event), Object.hasOwnProperty.call(e, "event-title") && (this._eventTitle = e["event-title"]), Object.hasOwnProperty.call(e, "event-place") && (this._eventPlace = e["event-place"]), Object.hasOwnProperty.call(e, "first-reference-note-number") && (this._firstReferenceNoteNumber = e["first-reference-note-number"]), Object.hasOwnProperty.call(e, "genre") && (this._genre = e.genre), Object.hasOwnProperty.call(e, "ISBN") && (this._ISBN = e.ISBN), Object.hasOwnProperty.call(e, "ISSN") && (this._ISSN = e.ISSN), Object.hasOwnProperty.call(e, "issue") && (this._issue = e.issue), Object.hasOwnProperty.call(e, "jurisdiction") && (this._jurisdiction = e.jurisdiction), Object.hasOwnProperty.call(e, "keyword") && (this._keyword = e.keyword), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "medium") && (this._medium = e.medium), Object.hasOwnProperty.call(e, "note") && (this._note = e.note), Object.hasOwnProperty.call(e, "number") && (this._number = e.number), Object.hasOwnProperty.call(e, "number-of-pages") && (this._numberOfPages = e["number-of-pages"]), Object.hasOwnProperty.call(e, "number-of-volumes") && (this._numberOfVolumes = e["number-of-volumes"]), Object.hasOwnProperty.call(e, "original-publisher") && (this._originalPublisher = e["original-publisher"]), Object.hasOwnProperty.call(e, "original-publisher-place") && (this._originalPublisherPlace = e["original-publisher-place"]), Object.hasOwnProperty.call(e, "original-title") && (this._originalTitle = e["original-title"]), Object.hasOwnProperty.call(e, "page") && (this._page = e.page), Object.hasOwnProperty.call(e, "page-first") && (this._pageFirst = e["page-first"]), Object.hasOwnProperty.call(e, "part") && (this._part = e.part), Object.hasOwnProperty.call(e, "part-title") && (this._partTitle = e["part-title"]), Object.hasOwnProperty.call(e, "PMCID") && (this._PMCID = e.PMCID), Object.hasOwnProperty.call(e, "PMID") && (this._PMID = e.PMID), Object.hasOwnProperty.call(e, "printing") && (this._printing = e.printing), Object.hasOwnProperty.call(e, "publisher") && (this._publisher = e.publisher), Object.hasOwnProperty.call(e, "publisher-place") && (this._publisherPlace = e["publisher-place"]), Object.hasOwnProperty.call(e, "references") && (this._references = e.references), Object.hasOwnProperty.call(e, "reviewed-genre") && (this._reviewedGenre = e["reviewed-genre"]), Object.hasOwnProperty.call(e, "reviewed-title") && (this._reviewedTitle = e["reviewed-title"]), Object.hasOwnProperty.call(e, "scale") && (this._scale = e.scale), Object.hasOwnProperty.call(e, "section") && (this._section = e.section), Object.hasOwnProperty.call(e, "source") && (this._source = e.source), Object.hasOwnProperty.call(e, "status") && (this._status = e.status), Object.hasOwnProperty.call(e, "title") && (this._title = e.title), Object.hasOwnProperty.call(e, "title-short") && (this._titleShort = e["title-short"]), Object.hasOwnProperty.call(e, "URL") && (this._URL = e.URL), Object.hasOwnProperty.call(e, "version") && (this._version = e.version), Object.hasOwnProperty.call(e, "volume") && (this._volume = e.volume), Object.hasOwnProperty.call(e, "volume-title") && (this._volumeTitle = e["volume-title"]), Object.hasOwnProperty.call(e, "volume-title-short") && (this._volumeTitleShort = e["volume-title-short"]), Object.hasOwnProperty.call(e, "year-suffix") && (this._yearSuffix = e["year-suffix"]), Object.hasOwnProperty.call(e, "custom") && (this._custom = e.custom), Object.hasOwnProperty.call(e, "userID") && this._addCustomProperty("userID", e.userID), Object.hasOwnProperty.call(e, "groupID") && this._addCustomProperty("groupID", e.groupID), Object.hasOwnProperty.call(e, "creators")) {
		var t = this, n = {
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
		e.creators.forEach(function(e) {
			var r = {};
			e.firstName && (r.given = e.firstName), e.lastName && (r.family = e.lastName), e.name && (r.literal = e.name);
			var i = t[n[e.creatorType || "author"] || "_author"];
			Array.isArray(i) || (i = t._author), !i.some(function(e) {
				return !(e.family !== r.family && (e.family || r.family) || e.given !== r.given && (e.given || r.given) || e.literal !== r.literal && (e.literal || r.literal));
			}) && i.push(r);
		}, this);
	}
	if (Object.hasOwnProperty.call(e, "libraryCatalog") && (this._source = e.libraryCatalog), Object.hasOwnProperty.call(e, "place") && (this._eventPlace = e.place, this._publisherPlace = e.place), Object.hasOwnProperty.call(e, "numberOfVolumes") && (this._numberOfVolumes = e.numberOfVolumes), Object.hasOwnProperty.call(e, "callNumber") && (this._callNumber = e.callNumber), Object.hasOwnProperty.call(e, "seriesNumber") && (this._collectionNumber = e.seriesNumber), Object.hasOwnProperty.call(e, "series") && (this._collectionTitle = e.series), Object.hasOwnProperty.call(e, "bookTitle") && (this._containerTitle = e.bookTitle), Object.hasOwnProperty.call(e, "publicationTitle") && (this._containerTitle = e.publicationTitle), Object.hasOwnProperty.call(e, "proceedingsTitle") && (this._containerTitle = e.proceedingsTitle), Object.hasOwnProperty.call(e, "encyclopediaTitle") && (this._containerTitle = e.encyclopediaTitle), Object.hasOwnProperty.call(e, "dictionaryTitle") && (this._containerTitle = e.dictionaryTitle), Object.hasOwnProperty.call(e, "pages") && (this._page = e.pages), Object.hasOwnProperty.call(e, "date") && !Object.hasOwnProperty.call(e, "issued")) {
		var r = e.date;
		if (typeof r == "string" && r) {
			var i = r.replace(/\//g, "-").split("-").map(Number).filter(function(e) {
				return !isNaN(e);
			});
			i.length && (this._issued = { "date-parts": [i] });
		}
	}
	if (Object.hasOwnProperty.call(e, "url") && !Object.hasOwnProperty.call(e, "URL") && (this._URL = e.url), Object.hasOwnProperty.call(e, "numPages") && (this._numberOfPages = e.numPages), Object.hasOwnProperty.call(e, "itemType") && !Object.hasOwnProperty.call(e, "type")) {
		var a = {
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
		this._type = a[e.itemType] || e.itemType;
	}
	Object.hasOwnProperty.call(e, "extra") && (this._note = e.extra), Object.hasOwnProperty.call(e, "rights") && (this._license = e.rights), Object.hasOwnProperty.call(e, "archiveLocation") && (this._archiveLocation = e.archiveLocation), Object.hasOwnProperty.call(e, "abstractNote") && (this._abstract = e.abstractNote);
}, G.prototype.getTitle = function() {
	return this._title;
}, G.prototype.getType = function() {
	return this._type;
}, G.prototype.setType = function(e) {
	return this._type = e, this;
}, G.prototype.setCitationKey = function(e) {
	return this._citationKey = e, this;
}, G.prototype.setCategories = function(e) {
	return this._categories = e, this;
}, G.prototype.setLanguage = function(e) {
	return this._language = e, this;
}, G.prototype.setJournalAbbreviation = function(e) {
	return this._journalAbbreviation = e, this;
}, G.prototype.setShortTitle = function(e) {
	return this._shortTitle = e, this;
}, G.prototype.setAuthor = function(e) {
	return this._author = Array.isArray(e) ? e : [e], this;
}, G.prototype.setChair = function(e) {
	return this._chair = Array.isArray(e) ? e : [e], this;
}, G.prototype.setCollectionEditor = function(e) {
	return this._collectionEditor = Array.isArray(e) ? e : [e], this;
}, G.prototype.setCompiler = function(e) {
	return this._compiler = Array.isArray(e) ? e : [e], this;
}, G.prototype.setComposer = function(e) {
	return this._composer = Array.isArray(e) ? e : [e], this;
}, G.prototype.setContainerAuthor = function(e) {
	return this._containerAuthor = Array.isArray(e) ? e : [e], this;
}, G.prototype.setContributor = function(e) {
	return this._contributor = Array.isArray(e) ? e : [e], this;
}, G.prototype.setCurator = function(e) {
	return this._curator = Array.isArray(e) ? e : [e], this;
}, G.prototype.setDirector = function(e) {
	return this._director = Array.isArray(e) ? e : [e], this;
}, G.prototype.setEditor = function(e) {
	return this._editor = Array.isArray(e) ? e : [e], this;
}, G.prototype.setEditorialDirector = function(e) {
	return this._editorialDirector = Array.isArray(e) ? e : [e], this;
}, G.prototype.setExecutiveProducer = function(e) {
	return this._executiveProducer = Array.isArray(e) ? e : [e], this;
}, G.prototype.setGuest = function(e) {
	return this._guest = Array.isArray(e) ? e : [e], this;
}, G.prototype.setHost = function(e) {
	return this._host = Array.isArray(e) ? e : [e], this;
}, G.prototype.setIllustrator = function(e) {
	return this._illustrator = Array.isArray(e) ? e : [e], this;
}, G.prototype.setNarrator = function(e) {
	return this._narrator = Array.isArray(e) ? e : [e], this;
}, G.prototype.setOrganizer = function(e) {
	return this._organizer = Array.isArray(e) ? e : [e], this;
}, G.prototype.setOriginalAuthor = function(e) {
	return this._originalAuthor = Array.isArray(e) ? e : [e], this;
}, G.prototype.setPerformer = function(e) {
	return this._performer = Array.isArray(e) ? e : [e], this;
}, G.prototype.setProducer = function(e) {
	return this._producer = Array.isArray(e) ? e : [e], this;
}, G.prototype.setRecipient = function(e) {
	return this._recipient = Array.isArray(e) ? e : [e], this;
}, G.prototype.setReviewedAuthor = function(e) {
	return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
}, G.prototype.setScriptwriter = function(e) {
	return this._scriptwriter = Array.isArray(e) ? e : [e], this;
}, G.prototype.setSeriesCreator = function(e) {
	return this._seriesCreator = Array.isArray(e) ? e : [e], this;
}, G.prototype.setTranslator = function(e) {
	return this._translator = Array.isArray(e) ? e : [e], this;
}, G.prototype.setAccessed = function(e) {
	return this._accessed = e || {}, this;
}, G.prototype.setContainer = function(e) {
	return this._container = e || {}, this;
}, G.prototype.setEventDate = function(e) {
	return this._eventDate = e || {}, this;
}, G.prototype.setIssued = function(e) {
	return this._issued = e || {}, this;
}, G.prototype.setOriginalDate = function(e) {
	return this._originalDate = e || {}, this;
}, G.prototype.setSubmitted = function(e) {
	return this._submitted = e || {}, this;
}, G.prototype.setAbstract = function(e) {
	return this._abstract = e, this;
}, G.prototype.setAnnote = function(e) {
	return this._annote = e, this;
}, G.prototype.setArchive = function(e) {
	return this._archive = e, this;
}, G.prototype.setArchiveCollection = function(e) {
	return this._archiveCollection = e, this;
}, G.prototype.setArchiveLocation = function(e) {
	return this._archiveLocation = e, this;
}, G.prototype.setArchivePlace = function(e) {
	return this._archivePlace = e, this;
}, G.prototype.setAuthority = function(e) {
	return this._authority = e, this;
}, G.prototype.setCallNumber = function(e) {
	return this._callNumber = e, this;
}, G.prototype.setChapterNumber = function(e) {
	return this._chapterNumber = e, this;
}, G.prototype.setCitationNumber = function(e) {
	return this._citationNumber = e, this;
}, G.prototype.setCitationLabel = function(e) {
	return this._citationLabel = e, this;
}, G.prototype.setCollectionNumber = function(e) {
	return this._collectionNumber = e, this;
}, G.prototype.setCollectionTitle = function(e) {
	return this._collectionTitle = e, this;
}, G.prototype.setContainerTitle = function(e) {
	return this._containerTitle = e, this;
}, G.prototype.setContainerTitleShort = function(e) {
	return this._containerTitleShort = e, this;
}, G.prototype.setDimensions = function(e) {
	return this._dimensions = e, this;
}, G.prototype.setDOI = function(e) {
	return this._DOI = e, this;
}, G.prototype.setEdition = function(e) {
	return this._edition = e, this;
}, G.prototype.setEvent = function(e) {
	return this._event = e, this;
}, G.prototype.setEventTitle = function(e) {
	return this._eventTitle = e, this;
}, G.prototype.setEventPlace = function(e) {
	return this._eventPlace = e, this;
}, G.prototype.setFirstReferenceNoteNumber = function(e) {
	return this._firstReferenceNoteNumber = e, this;
}, G.prototype.setGenre = function(e) {
	return this._genre = e, this;
}, G.prototype.setISBN = function(e) {
	return this._ISBN = e, this;
}, G.prototype.setISSN = function(e) {
	return this._ISSN = e, this;
}, G.prototype.setIssue = function(e) {
	return this._issue = e, this;
}, G.prototype.setJurisdiction = function(e) {
	return this._jurisdiction = e, this;
}, G.prototype.setKeyword = function(e) {
	return this._keyword = e, this;
}, G.prototype.setLocator = function(e) {
	return this._locator = e, this;
}, G.prototype.setMedium = function(e) {
	return this._medium = e, this;
}, G.prototype.setNote = function(e) {
	return this._note = e, this;
}, G.prototype.setNumber = function(e) {
	return this._number = e, this;
}, G.prototype.setNumberOfPages = function(e) {
	return this._numberOfPages = e, this;
}, G.prototype.setNumberOfVolumes = function(e) {
	return this._numberOfVolumes = e, this;
}, G.prototype.setOriginalPublisher = function(e) {
	return this._originalPublisher = e, this;
}, G.prototype.setOriginalPublisherPlace = function(e) {
	return this._originalPublisherPlace = e, this;
}, G.prototype.setOriginalTitle = function(e) {
	return this._originalTitle = e, this;
}, G.prototype.setPage = function(e) {
	return this._page = e, this;
}, G.prototype.setPageFirst = function(e) {
	return this._pageFirst = e, this;
}, G.prototype.setPart = function(e) {
	return this._part = e, this;
}, G.prototype.setPartTitle = function(e) {
	return this._partTitle = e, this;
}, G.prototype.setPMCID = function(e) {
	return this._PMCID = e, this;
}, G.prototype.setPMID = function(e) {
	return this._PMID = e, this;
}, G.prototype.setPrinting = function(e) {
	return this._printing = e, this;
}, G.prototype.setPublisher = function(e) {
	return this._publisher = e, this;
}, G.prototype.setPublisherPlace = function(e) {
	return this._publisherPlace = e, this;
}, G.prototype.setReferences = function(e) {
	return this._references = e, this;
}, G.prototype.setReviewedGenre = function(e) {
	return this._reviewedGenre = e, this;
}, G.prototype.setReviewedTitle = function(e) {
	return this._reviewedTitle = e, this;
}, G.prototype.setScale = function(e) {
	return this._scale = e, this;
}, G.prototype.setSection = function(e) {
	return this._section = e, this;
}, G.prototype.setSource = function(e) {
	return this._source = e, this;
}, G.prototype.setStatus = function(e) {
	return this._status = e, this;
}, G.prototype.setTitle = function(e) {
	return this._title = e, this;
}, G.prototype.setTitleShort = function(e) {
	return this._titleShort = e, this;
}, G.prototype.setURL = function(e) {
	return this._URL = e, this;
}, G.prototype.setVersion = function(e) {
	return this._version = e, this;
}, G.prototype.setVolume = function(e) {
	return this._volume = e, this;
}, G.prototype.setVolumeTitle = function(e) {
	return this._volumeTitle = e, this;
}, G.prototype.setVolumeTitleShort = function(e) {
	return this._volumeTitleShort = e, this;
}, G.prototype.setYearSuffix = function(e) {
	return this._yearSuffix = e, this;
}, G.prototype.setCustom = function(e) {
	return this._custom = Object.assign(this._custom, e), this;
}, G.prototype.toJSON = function(e) {
	var t = {};
	if (t.id = this._id, this._type !== void 0 && this._type !== "" && (t.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), this._language !== void 0 && this._language !== "" && (t.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (t.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (t.shortTitle = this._shortTitle, this._titleShort === void 0 && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (t.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (t.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (t.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (t.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (t.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (t["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (t.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (t["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (t["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (t["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (t["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (t["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (t["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (t["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (t["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (t.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (t.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (t.edition = this._edition), this._event !== void 0 && this._event !== "" && (t.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (t["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (t["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (t.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (t.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (t.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (t.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (t.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (t.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (t.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (t.medium = this._medium), this._note !== void 0 && this._note !== "" && (t.note = this._note), this._number !== void 0 && this._number !== "" && (t.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (t["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (t["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (t["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (t["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (t["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (t.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (t["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (t.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (t["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (t.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (t.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (t.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (t.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (t["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (t.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (t["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (t["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (t.scale = this._scale), this._section !== void 0 && this._section !== "" && (t.section = this._section), this._source !== void 0 && this._source !== "" && (t.source = this._source), this._status !== void 0 && this._status !== "" && (t.status = this._status), this._title !== void 0 && this._title !== "" && (t.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (t["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (t.URL = this._URL), this._version !== void 0 && this._version !== "" && (t.version = this._version), this._volume !== void 0 && this._volume !== "" && (t.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (t["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (t["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (t["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0) {
		var n = this._custom;
		n.userID, n.groupID;
		var r = g(n, jt);
		Object.keys(r).length > 0 && (t.custom = r);
	}
	return this._license !== void 0 && this._license !== "" && (t.license = this._license), t;
};
//#endregion
//#region src/app/csl/citation/citation-item.js
function K(e) {
	if (typeof e != "string" && typeof e != "number") throw Error("CitationItem: id is required");
	this.id = e, this._itemData = new G(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = [];
}
K.prototype.fillFromObject = function(e) {
	var t = this;
	Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(e) {
		t.addUri(e);
	}, this);
}, K.prototype.replaceItemDataFromCsl = function(e) {
	var t = this._itemData;
	this._itemData = new G(this.id);
	var n = t.getCustomProperty("userID"), r = t.getCustomProperty("groupID");
	n !== null && this._itemData._addCustomProperty("userID", n), r !== null && this._itemData._addCustomProperty("groupID", r), this._itemData.fillFromObject(e);
}, K.prototype.getInfoForCitationCluster = function() {
	var e = {
		id: this.id,
		"suppress-author": this._suppressAuthor
	};
	return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
}, K.prototype.getItemData = function() {
	return this._itemData;
}, K.prototype.getProperty = function(e) {
	return this._itemData.getCustomProperty(e) === null ? null : this._itemData.getCustomProperty(e);
}, K.prototype.setPrefix = function(e) {
	return this._prefix = e, this;
}, K.prototype.setSuffix = function(e) {
	return this._suffix = e, this;
}, K.prototype.setLocator = function(e) {
	return this._locator = e, this;
}, K.prototype.setLabel = function(e) {
	if (e) {
		if ((/* @__PURE__ */ "act.appendix.article-locator.book.canon.chapter.column.elocation.equation.figure.folio.issue.line.note.opus.page.paragraph.part.rule.scene.section.sub-verbo.supplement.table.timestamp.title-locator.verse.version.volume".split(".")).indexOf(e) === -1) throw Error("CitationItem.setLocator: Invalid label \"" + e + "\"");
		this._label = e;
	}
	return this;
}, K.prototype.setSuppressAuthor = function(e) {
	return this._suppressAuthor = e, this;
}, K.prototype.setAuthorOnly = function(e) {
	return this._authorOnly = e, this;
}, K.prototype.addUri = function(e) {
	return this._uris.indexOf(e) === -1 && this._uris.push(e), this;
}, K.prototype.toJSON = function(e) {
	var t = {};
	t.id = this.id, this._itemData && (t.itemData = this._itemData.toJSON ? this._itemData.toJSON(e || !1) : this._itemData), this._prefix !== void 0 && (t.prefix = this._prefix), this._suffix !== void 0 && (t.suffix = this._suffix), this._locator !== void 0 && (t.locator = this._locator), this._label !== void 0 && (t.label = this._label), this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (t["author-only"] = this._authorOnly);
	var n = this._uris.filter(function(e) {
		return e.indexOf("localhost") === -1 && e.indexOf("api.zotero.org") === -1;
	});
	if (n.length) t.uris = n;
	else {
		var r = this._itemData && this._itemData.getCustomProperty ? this._itemData.getCustomProperty("userID") : null, i = this._itemData && this._itemData.getCustomProperty ? this._itemData.getCustomProperty("groupID") : null, a = typeof this.id == "string" ? this.id : "";
		a && r ? t.uris = ["http://zotero.org/users/" + r + "/items/" + a] : a && i ? t.uris = ["http://zotero.org/groups/" + i + "/items/" + a] : t.uris = [];
	}
	return t;
}, K.prototype.toFlatJSON = function(e) {
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
var Mt = ["index"], q = /*#__PURE__*/ new WeakSet(), Nt = class {
	constructor(e) {
		u(this, q), e ||= r(q, this, Vt).call(this), Ht._.has(e) && (console.warn("Citation ID must be unique"), e = r(q, this, Vt).call(this)), Ht._.add(e), this.citationID = e, this._citationItems = [], this._properties = {}, this._manualOverride = {}, this._schema = "https://github.com/citation-style-language/schema/raw/master/csl-citation.json";
	}
	static resetUsedIDs() {
		Ht._ = /* @__PURE__ */ new Set();
	}
	fillFromObject(e) {
		return Object.hasOwnProperty.call(e, "properties") || Object.hasOwnProperty.call(e, "manualOverride") || Object.hasOwnProperty.call(e, "schema") ? r(q, this, Pt).call(this, e) : Object.hasOwnProperty.call(e, "citationItems") ? r(q, this, Ft).call(this, e) : Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? r(q, this, Lt).call(this, e) : r(q, this, It).call(this, e);
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
		return r(q, this, zt).call(this, { dontUpdate: !0 }), this;
	}
	setNoteIndex(e) {
		return r(q, this, zt).call(this, { noteIndex: e }), this;
	}
	setPlainCitation(e) {
		return r(q, this, zt).call(this, { plainCitation: e }), this;
	}
	setFormattedCitation(e) {
		return r(q, this, zt).call(this, { formattedCitation: e }), this;
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
		if (this._properties && Object.keys(this._properties).length > 0) {
			var t = this._properties;
			t.index;
			var n = g(t, Mt);
			Object.keys(n).length > 0 && (e.properties = n);
		}
		return this._manualOverride && Object.keys(this._manualOverride).length > 0 && (e.manualOverride = this._manualOverride), this._citationItems && this._citationItems.length > 0 && (e.citationItems = this._citationItems.map(function(e) {
			return e.toJSON();
		})), e;
	}
};
function Pt(e) {
	var t = this;
	if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && r(q, this, zt).call(this, e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems")) return console.error("citationItems is empty"), 0;
	var n = this._citationItems.map(function(e) {
		return e.id;
	});
	return e.citationItems.forEach(function(e) {
		var i = e.id, a;
		n.indexOf(i) >= 0 ? a = t._citationItems[n.indexOf(i)] : (a = new K(i), n.push(i)), typeof i == "number" && (i = r(q, t, Bt).call(t, e)), a.fillFromObject(e), r(q, t, Rt).call(t, a);
	}, this), n.length;
}
function Ft(e) {
	var t = this;
	return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(e) {
		r(q, t, It).call(t, e);
	}, this), 1);
}
function It(e) {
	var t = e.id, n, i = this._citationItems.map(function(e) {
		return e.id;
	});
	return n = i.indexOf(t) >= 0 ? this._citationItems[i.indexOf(t)] : new K(t), n.fillFromObject(e), r(q, this, Rt).call(this, n), 1;
}
function Lt(e) {
	if (!Object.hasOwnProperty.call(e, "data")) return console.error("Invalid citation object"), 0;
	var t = this._citationItems.map(function(e) {
		return e.id;
	}), n = e.data.key, i = t.indexOf(n) >= 0 ? this._citationItems[t.indexOf(n)] : new K(n);
	return i.fillFromObject(e), r(q, this, Rt).call(this, i), 1;
}
function Rt(e) {
	var t = this._citationItems.map(function(e) {
		return e.id;
	});
	return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
}
function zt(e) {
	var t = this;
	return Object.keys(e).forEach(function(n) {
		Object.hasOwnProperty.call(e, n) && (t._properties[n] = e[n]);
	}, this), this;
}
function Bt(e) {
	if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
		var t = e.uris[0].lastIndexOf("/");
		return e.uris[0].slice(t + 1);
	}
	return e.id;
}
function Vt() {
	return Math.random().toString(36).substring(2, 15);
}
var Ht = { _: /* @__PURE__ */ new Set() }, J = /*#__PURE__*/ new WeakMap(), Ut = /*#__PURE__*/ new WeakMap(), Wt = /*#__PURE__*/ new WeakMap(), Gt = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakSet(), Kt = class {
	constructor() {
		u(this, Y), c(this, J, void 0), c(this, Ut, void 0), c(this, Wt, void 0), c(this, Gt, void 0), l(J, this, null), l(Ut, this, window.Asc.plugin.button), l(Wt, this, Asc.plugin.onThemeChanged), l(Gt, this, Asc.plugin.onTranslate);
	}
	show(e, t) {
		s(J, this) && r(Y, this, Jt).call(this), l(J, this, new window.Asc.PluginWindow());
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
		return r(Y, this, qt).call(this, n, t, "default"), s(J, this).show(n), new Promise((e, t) => {
			window.Asc.plugin.button = (t, n) => {
				e(t === 0), r(Y, this, Jt).call(this);
			};
		});
	}
	showEditWindow(e) {
		var t = this;
		s(J, this) && r(Y, this, Jt).call(this), l(J, this, new window.Asc.PluginWindow());
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
		return r(Y, this, qt).call(this, n, e, "default"), s(J, this).show(n), new Promise((e, n) => {
			window.Asc.plugin.button = /*#__PURE__*/ function() {
				var n = a(function* (n, i) {
					var a = yield new Promise((e) => {
						if (!s(J, t)) {
							e(null);
							return;
						}
						s(J, t).attachEvent("onSaveFields", e), s(J, t).command("onClickSave");
					});
					e(n === 0 ? a : null), r(Y, t, Jt).call(t);
				});
				return function(e, t) {
					return n.apply(this, arguments);
				};
			}();
		});
	}
	showInfoWindow(e, t, n) {
		s(J, this) && r(Y, this, Jt).call(this), typeof n != "string" && (n = "warning"), l(J, this, new window.Asc.PluginWindow());
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
		return r(Y, this, qt).call(this, i, window.Asc.plugin.tr(t), n), s(J, this).show(i), new Promise((e, t) => {
			window.Asc.plugin.button = (t, n) => {
				e(t === 0), r(Y, this, Jt).call(this);
			};
		});
	}
};
function qt(e, t, n) {
	s(J, this) && (l(Ut, this, window.Asc.plugin.button), l(Wt, this, Asc.plugin.onThemeChanged), l(Gt, this, Asc.plugin.onTranslate), window.Asc.plugin.onThemeChanged = (e) => {
		var t;
		(t = s(J, this)) == null || t.command("onThemeChanged", e), s(Wt, this).call(this, e);
	}, window.Asc.plugin.onTranslate = () => {
		var e;
		(e = s(J, this)) == null || e.command("onTranslate"), s(Gt, this).call(this);
	}, s(J, this).attachEvent("onWindowReady", () => {
		if (n === "warning") {
			var e;
			(e = s(J, this)) == null || e.command("onWarning", t);
		} else if (n === "success") {
			var r;
			(r = s(J, this)) == null || r.command("onSuccess", t);
		} else {
			var i;
			(i = s(J, this)) == null || i.command("onAttachedContent", t);
		}
	}), s(J, this).attachEvent("onUpdateHeight", (t) => {
		Asc.plugin.executeMethod("ResizeWindow", [s(J, this)?.id, [e.size[0] - 2, t]], () => {});
	}));
}
function Jt() {
	s(J, this) && (s(J, this).close(), l(J, this, null)), window.Asc.plugin.button = s(Ut, this), window.Asc.plugin.onThemeChanged = s(Wt, this);
}
//#endregion
//#region src/app/shared/item-keys.js
function Yt(e) {
	if (e == null) return "";
	var t = String(e).trim(), n = t.search(/[?#]/);
	n !== -1 && (t = t.slice(0, n));
	var r = t.lastIndexOf("/");
	return r !== -1 && (t = t.slice(r + 1)), t;
}
function Xt(e) {
	var t = [], n = function(e) {
		var n = Yt(e);
		n && t.indexOf(n) === -1 && t.push(n);
	};
	return e ? (n(e.id), e.itemData && n(e.itemData.id), Array.isArray(e.uris) && e.uris.forEach(n), t) : t;
}
//#endregion
//#region src/app/services/citation-service.js
var Zt = /*#__PURE__*/ new WeakMap(), Qt = /*#__PURE__*/ new WeakMap(), $t = /*#__PURE__*/ new WeakMap(), X = /*#__PURE__*/ new WeakSet(), en = class {
	constructor(e, t, n) {
		u(this, X), c(this, Zt, void 0), c(this, Qt, /* @__PURE__ */ new Map()), c(this, $t, null), this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = e, this._cslStylesManager = t, this._storage = new kt(), this._formatter, this.citationDocService = new mt(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), l(Zt, this, new Kt());
	}
	getUsedItemKeys() {
		var e = this;
		return a(function* () {
			var t = e, n = /* @__PURE__ */ new Set();
			return (yield e.citationDocService.getAddinZoteroFields()).forEach(function(e) {
				if (!(e.Value.indexOf(t._citPrefixNew) === -1 && e.Value.indexOf(t._citPrefix) === -1)) {
					var i;
					try {
						i = r(X, t, bn).call(t, e);
					} catch (e) {
						console.error(e);
						return;
					}
					!i || !Array.isArray(i.citationItems) || i.citationItems.forEach(function(e) {
						Xt(e).forEach(function(e) {
							n.add(e);
						});
					});
				}
			}), n;
		})();
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
			try {
				yield r(X, t, xn).call(t), yield r(X, t, pn).call(t);
			} catch (e) {
				throw e;
			}
			var i = new Nt("");
			for (var a in e) {
				var o = e[a];
				i.fillFromObject(o);
			}
			return r(X, t, _n).call(t, e).then((e) => (e.forEach(function(e) {
				i.fillFromObject(e);
			}), t._storage.addCslCitation(i), r(X, n, hn).call(n, i)));
		})();
	}
	insertSelectedCitationsToCurrentField(e, t) {
		var n = this;
		return a(function* () {
			var i = r(X, n, bn).call(n, t), a = i.citationID, o = new Nt("");
			for (var s in o.fillFromObject(i), e) {
				var c = e[s];
				o.fillFromObject(c);
			}
			(yield r(X, n, _n).call(n, e)).forEach(function(e) {
				o.fillFromObject(e);
			});
			var l = (yield r(X, n, xn).call(n, o.toJSON(), a)).fieldsWithCitations;
			r(X, n, Dn).call(n);
			var u = l.find((e) => e.cslCitation.citationID === a)?.cslCitation;
			if (!u) throw Error("Citation not found");
			return r(X, n, gn).call(n, u).then((e) => (t.Content = e, t.Value = n._citPrefixNew + " " + n._citSuffixNew + JSON.stringify(u.toJSON()), t));
		})();
	}
	insertBibliography() {
		var e = this;
		return a(function* () {
			try {
				var t = yield r(X, e, xn).call(e), n = t.fieldsWithCitations, i = t.bibFieldValue, a = t.bibField, o = n.length === 0;
				if (yield r(X, e, pn).call(e), a) {
					var s = [yield r(X, e, Cn).call(e, o, a)];
					return e.citationDocService.updateAddinFields(s).then((e) => e ? e[0] : "");
				} else return r(X, e, Sn).call(e, o, i);
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
	updateCslItems(e, t) {
		var n = this;
		return a(function* () {
			try {
				var i = yield r(X, n, xn).call(n), a = i.fieldsWithCitations, o = i.bibField, s = a.length === 0;
				yield r(X, n, pn).call(n);
				var c = [];
				e === void 0 && n._cslStylesManager.getLastUsedFormat() === "numeric" && (e = !0);
				var l = !!(t && t.skipCitations), u = !!(t && t.skipBibliography);
				if (!l && typeof e == "boolean" && (c = yield r(X, n, wn).call(n, a, e)), !u && o && c.push(yield r(X, n, Cn).call(n, s, o)), c && c.length) return n.citationDocService.updateAddinFields(c);
			} catch (e) {
				throw e;
			}
		})();
	}
	updateCslItemsInNotes(e) {
		var t = this;
		return a(function* () {
			try {
				var n = yield r(X, t, xn).call(t), i = n.fieldsWithCitations, a = n.bibField, o = i.length === 0;
				yield r(X, t, pn).call(t);
				var s = yield r(X, t, wn).call(t, i, !1);
				if (s && s.length && (yield t.citationDocService.convertNotesStyle(s, e)), a) {
					var c = [yield r(X, t, Cn).call(t, o, a)];
					yield t.citationDocService.updateAddinFields(c);
				}
			} catch (e) {
				throw e;
			}
		})();
	}
	prepareRefreshCslItems(e, t) {
		var n = this;
		return a(function* () {
			var i = yield r(X, n, xn).call(n), a = i.fieldsWithCitations, o = i.bibField, s = a.length === 0;
			yield r(X, n, pn).call(n, {
				refreshItems: !0,
				onProgress: t
			});
			var c = [], l = !!(e && e.skipCitations), u = !!(e && e.skipBibliography);
			return l || (c = yield r(X, n, wn).call(n, a, !1, !1, t)), !u && o && c.push(yield r(X, n, Cn).call(n, s, o)), c;
		})();
	}
	applyRefreshCslItems(e) {
		var t = this;
		return a(function* () {
			if (e && e.length) return t.citationDocService.updateAddinFields(e);
		})();
	}
	prepareRefreshCslItemsInNotes(e, t) {
		var n = this;
		return a(function* () {
			var i = yield r(X, n, xn).call(n), a = i.fieldsWithCitations, o = i.bibField, s = a.length === 0;
			return yield r(X, n, pn).call(n, {
				refreshItems: !0,
				onProgress: t
			}), {
				updatedFields: yield r(X, n, wn).call(n, a, !1, !1, t),
				bibFields: o ? [yield r(X, n, Cn).call(n, s, o)] : [],
				notesStyle: e
			};
		})();
	}
	applyRefreshCslItemsInNotes(e) {
		var t = this;
		return a(function* () {
			var n = e.updatedFields, r = e.bibFields, i = e.notesStyle;
			n && n.length && (yield t.citationDocService.convertNotesStyle(n, i)), r && r.length && (yield t.citationDocService.updateAddinFields(r));
		})();
	}
	updateItem(e, t) {
		var n = this;
		return a(function* () {
			try {
				var i = yield r(X, n, xn).call(n, e, e.citationID), a = i.fieldsWithCitations;
				i.bibField, a.length, yield r(X, n, pn).call(n), e && (a = a.filter(function(t) {
					return t.cslCitation.citationID === e.citationID;
				}));
				var o = yield r(X, n, wn).call(n, a, !0);
				if (t && o && o.length) return n.citationDocService.updateAddinFieldsInNotes(o);
				if (o && o.length) return n.citationDocService.updateAddinFields(o);
			} catch (e) {
				throw e;
			}
		})();
	}
	switchingBetweenNotesAndText(e) {
		var t = this;
		return a(function* () {
			try {
				var n = yield r(X, t, xn).call(t), i = n.fieldsWithCitations, a = n.bibField, o = i.length === 0;
				yield r(X, t, pn).call(t);
				var s = yield r(X, t, wn).call(t, i, !0);
				if (s && s.length && (e ? yield t.citationDocService.convertTextToNotes(s, e) : yield t.citationDocService.convertNotesToText(s)), a) {
					var c = [yield r(X, t, Cn).call(t, o, a)];
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
				var n = (yield r(X, t, xn).call(t)).fieldsWithCitations;
				yield r(X, t, pn).call(t);
				var i = yield r(X, t, wn).call(t, n, !1, !0);
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
			var n = r(X, t, bn).call(t, e);
			return (yield s(Zt, t).showEditWindow(n)) || null;
		})();
	}
	repairBrokenCitations() {
		var e = this;
		return a(function* () {
			var t = yield e.citationDocService.scanForBrokenFields(), n = 0, i = 0;
			for (var a of t) {
				var o = void 0;
				try {
					o = r(X, e, bn).call(e, {
						Value: a.rawValue,
						FieldId: "",
						Content: ""
					});
				} catch (e) {
					console.error("Failed to parse broken field JSON:", e);
				}
				if (!o || typeof o != "object") {
					i++;
					continue;
				}
				var s = /ZOTERO_BIBL/i.test(a.rawValue), c = s ? e._bibPrefixNew : e._citPrefixNew, l = s ? e._bibSuffixNew : e._citSuffixNew, u = s ? z("Bibliography") : o.properties && o.properties.plainCitation || z("Citation"), d = {
					FieldId: "",
					Value: c + " " + l + " " + JSON.stringify(o),
					Content: u
				};
				(yield e.citationDocService.repairBrokenField(a, d)) ? n++ : i++;
			}
			return {
				repaired: n,
				failed: i
			};
		})();
	}
	showWarningMessage(e) {
		var t = this;
		return a(function* () {
			s(Zt, t).showInfoWindow("Warning!", e);
		})();
	}
	showSuccessMessage(e) {
		var t = this;
		return a(function* () {
			s(Zt, t).showInfoWindow("Success!", e, "success");
		})();
	}
};
function tn() {
	var e = this._cslStylesManager.getLastUsedStyleIdOrDefault(), t = this._cslStylesManager.cached(e);
	return typeof t != "string" || t === "" ? !0 : /\bvariable\s*=\s*"[^"]*\babstract\b[^"]*"/.test(t);
}
function nn(e) {
	!e || !Array.isArray(e.citationItems) || e.citationItems.forEach(function(e) {
		e && e.itemData && Object.hasOwnProperty.call(e.itemData, "abstract") && delete e.itemData.abstract;
	});
}
function rn(e) {
	var t = e.toJSON();
	return r(X, this, tn).call(this) || r(X, this, nn).call(this, t), t;
}
function an(e, t) {
	var n = e.getProperty("userID"), r = e.getProperty("groupID");
	if (n) return {
		id: t,
		fetchKey: t,
		userID: n
	};
	if (r) return {
		id: t,
		fetchKey: t,
		groupID: r
	};
	var i = e.toJSON();
	if (!Array.isArray(i.uris)) return null;
	for (var a = null, o = 0; o < i.uris.length; o++) {
		var s = i.uris[o], c = null, l = s.match(/zotero\.org\/(users|groups)\/(\d+)\/items\/([^/?#]+)/i), u = s.match(/zotero\.org\/users\/local\/[^/]+\/items\/([^/?#]+)/i);
		if (l ? c = l[1] === "users" ? {
			id: t,
			fetchKey: l[3],
			userID: l[2]
		} : {
			id: t,
			fetchKey: l[3],
			groupID: l[2]
		} : u && (c = {
			id: t,
			fetchKey: u[1],
			userID: "local"
		}), c) {
			if (c.fetchKey === t) return c;
			a ||= c;
		}
	}
	return a;
}
function on(e, t, n) {
	return sn.apply(this, arguments);
}
function sn() {
	return sn = a(function* (e, t, n) {
		var i = [], a = [];
		this._storage.forEachItem((t, n) => {
			if (e(t, n)) {
				var o = r(X, this, an).call(this, t, n);
				o ? i.push(o) : a.push(n);
			}
		});
		var o = i.length + a.length;
		if (o !== 0) {
			var s = 0, c = () => {
				s++, n && n({
					phase: "fetch",
					completed: s,
					total: o
				});
			}, l = i.map((e) => (e.groupID ? this._sdk.getGroupItemByKey(e.groupID, e.fetchKey, t || "json") : this._sdk.getItemByKey(e.fetchKey, t || "json")).then((n) => {
				var i = r(X, this, cn).call(this, n);
				if (i.length !== 1) {
					console.warn("Zotero returned " + i.length + " items for key " + e.fetchKey);
					return;
				}
				var a = this._storage.getItem(e.id);
				a && ((t || "json") === "csljson" ? a.replaceItemDataFromCsl(i[0]) : a.fillFromObject(i[0]));
			}).catch((t) => {
				console.warn("Failed to refresh item " + e.id + " (Zotero key " + e.fetchKey + "):", t);
			}).finally(c)), u = a.map((e) => r(X, this, ln).call(this, e).catch((t) => {
				console.warn("Failed to re-link item " + e + ":", t);
			}).finally(c));
			yield Promise.all(l.concat(u));
		}
	}), sn.apply(this, arguments);
}
function cn(e) {
	var t = e && e.items;
	return Array.isArray(t) ? t : t ? [t] : [];
}
function ln(e) {
	return un.apply(this, arguments);
}
function un() {
	return un = a(function* (e) {
		var t = yield this._sdk.searchUserItemsEverything(e);
		for (var n of t && t.items || []) {
			var i = n.key || n.data && n.data.key;
			if (i) {
				var a = yield this._sdk.getItemByKey(i, "csljson"), o = r(X, this, cn).call(this, a)[0];
				if (o && !(o["citation-key"] !== e && o.id !== e)) {
					var s = this._storage.getItem(e);
					if (!s) return;
					s.replaceItemDataFromCsl(o);
					var c = n.library;
					if (c && c.id !== void 0 && c.id !== null) {
						var l = c.type === "group" ? "groups" : "users";
						s.addUri("http://zotero.org/" + l + "/" + c.id + "/items/" + i);
					}
					return;
				}
			}
		}
		console.warn("Could not locate item " + e + " in the Zotero library; it will not be refreshed.");
	}), un.apply(this, arguments);
}
function dn() {
	return fn.apply(this, arguments);
}
function fn() {
	return fn = a(function* () {
		r(X, this, tn).call(this) && (yield r(X, this, on).call(this, (e, t) => {
			var n = e.toFlatJSON(this._storage.getItemIndex(t));
			return !(Object.hasOwnProperty.call(n, "abstract") && n.abstract !== "");
		}, "json"));
	}), fn.apply(this, arguments);
}
function pn(e) {
	return mn.apply(this, arguments);
}
function mn() {
	return mn = a(function* (e) {
		e && e.refreshItems ? (yield r(X, this, on).call(this, () => !0, "csljson", e && e.onProgress), l($t, this, null)) : yield r(X, this, dn).call(this), r(X, this, Dn).call(this);
	}), mn.apply(this, arguments);
}
function hn(e) {
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
	}).then(() => r(X, this, yn).call(this, e)).then((n) => {
		e.setFormattedCitation(n);
		var i = null;
		t._cslStylesManager.getLastUsedFormat() === "note" && (i = t._cslStylesManager.getLastUsedNotesStyle());
		var a = r(X, t, rn).call(t, e);
		return t.citationDocService.addCitation(n, JSON.stringify(a), i);
	});
}
function gn(e) {
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
	}).then(() => r(X, this, yn).call(this, e));
}
function _n(e, t) {
	t ||= "json";
	var n = [];
	for (var i in e) {
		var a = e[i], o = a.groupID, s = a.userID, c = null;
		o ? c = this._sdk.getGroupItemByKey(o, a.id, t) : (s || s === 0 || s === "0") && (c = this._sdk.getItemByKey(a.id, t)), c && n.push(c.then((e) => r(X, this, cn).call(this, e)[0] || null));
	}
	return Promise.all(n).then(function(e) {
		return e.filter(function(e) {
			return e !== null;
		});
	});
}
function vn() {
	try {
		for (var e = Array(this._storage.size), t = this._formatter.makeBibliography(), n = 0; n < t[1].length; n++) {
			var i = r(X, this, On).call(this, t[1][n]);
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
function yn(e) {
	var t = document.createDocumentFragment(), n = document.createElement("div"), i = this._storage.getCitationsPre(e.citationID), a = this._storage.getCitationsPost(e.citationID), o = this._storage.getAllCitationsInJson();
	this._formatter.rebuildProcessorState(o);
	var s = this._formatter.processCitationCluster(e.toJSON(), i, a), c = r(X, this, On).call(this, s[1][0][1]);
	return t.appendChild(n), n.innerHTML = c, e.setPlainCitation(n.innerText), c;
}
function bn(e) {
	var t, n = e.Value.indexOf("{"), r = e.Value.lastIndexOf("}");
	if (n !== -1) {
		var i = e.Value.slice(n, r + 1);
		t = JSON.parse(i);
	}
	return t;
}
function xn(e, t) {
	var n = this;
	return this._storage.clear(), Nt.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(i) {
		var a = 0, o = " ", s = i.find(function(e) {
			return e.Value.indexOf(n._bibPrefixNew) !== -1 || e.Value.indexOf(n._bibPrefix) !== -1;
		});
		if (s) {
			var c = r(X, n, bn).call(n, s);
			typeof c == "object" && Object.keys(c).length > 0 && (o = JSON.stringify(c));
		}
		var l = i.filter(function(e) {
			return e.Value.indexOf(n._citPrefixNew) !== -1 || e.Value.indexOf(n._citPrefix) !== -1;
		}).map(function(i) {
			var o = r(X, n, bn).call(n, i), s = "";
			i.Value.indexOf(n._citPrefix) === -1 && (s = o.citationID);
			var c = new Nt(s);
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
function Sn(e, t) {
	var n = r(X, this, vn).call(this);
	if (e && (n = z(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography()) return this.citationDocService.addBibliography(n, t);
	throw "The current bibliographic style does not describe the bibliography";
}
function Cn(e, t) {
	return e ? t.Content = z(this._bibPlaceholderIfEmpty) : t.Content = r(X, this, vn).call(this), t;
}
function wn(e, t, n, r) {
	return Tn.apply(this, arguments);
}
function Tn() {
	return Tn = a(function* (e, t, n, i) {
		var a = document.createDocumentFragment(), o = document.createElement("div");
		a.appendChild(o);
		for (var c = [], l = e.length, u = e.length - 1; u >= 0; u--) {
			var d = !!n, f = e[u], p = f.field, m = f.cslCitation, h = this._storage.getCitationsPre(m.citationID), g = this._storage.getCitationsPost(m.citationID), _ = this._storage.getAllCitationsInJson();
			this._formatter.rebuildProcessorState(_);
			var v = this._formatter.processCitationCluster(m.toJSON(), h, g), y = r(X, this, On).call(this, v[1][0][1]);
			o.innerHTML = y, m.setFormattedCitation(y);
			var b = m.getPlainCitation(), x = p.Content;
			b === "" && (b = x);
			var S = o.innerText;
			if (!m.getDoNotUpdate()) {
				if (b !== x && !t) {
					var ee = "<p>" + z("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + z("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + z("Original:") + " " + S + "</p><p>" + z("Modified:") + " " + x + "</p>";
					(yield s(Zt, this).show("Saving custom edits", ee)) ? (m.setDoNotUpdate(), delete p.Content) : (p.Content = y, m.setPlainCitation(S)), d = !0;
				} else (S !== x || b !== x || b !== S) && (d = !0), p.Content = y, m.setPlainCitation(S);
				if (m) {
					var te = this._citPrefixNew + " " + this._citSuffixNew + " " + JSON.stringify(r(X, this, rn).call(this, m));
					p.Value !== te && (d = !0), p.Value = te;
				}
				d && c.push(p), i && i({
					phase: "apply",
					completed: l - u,
					total: l
				});
			}
		}
		return c;
	}), Tn.apply(this, arguments);
}
function En(e) {
	var t = s(Qt, this).get(e);
	if (t) return t;
	var n = e;
	try {
		var r = new DOMParser().parseFromString(e, "application/xml").documentElement;
		r && r.nodeName !== "parsererror" && (n = r);
	} catch (e) {
		console.error("Failed to pre-parse CSL/locale XML, falling back to citeproc's slower string parser:", e);
	}
	return s(Qt, this).set(e, n), n;
}
function Dn() {
	var e = this, t = [];
	this._storage.forEachItem(function(e, n) {
		t.push(n);
	});
	var n = this._cslStylesManager.getLastUsedStyleIdOrDefault(), i = this._localesManager.getLastUsedLanguage(), a = this._cslStylesManager.cached(n), o = n + " " + i + " " + (a ? a.length : 0);
	if (this._formatter && s($t, this) === o) {
		t.length && this._formatter.updateItems(t);
		return;
	}
	this._formatter = new CSL.Engine({
		retrieveLocale: function(t) {
			var n = e._localesManager.getLocale(t) || e._localesManager.getLocale();
			return n && r(X, e, En).call(e, n);
		},
		retrieveItem: function(t) {
			var n = e._storage.getItem(t), r = e._storage.getItemIndex(t);
			return n ? n.toFlatJSON(r) : null;
		}
	}, a && r(X, this, En).call(this, a), i, !0), l($t, this, o), t.length && this._formatter.updateItems(t);
}
function On(e) {
	return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
}
//#endregion
//#region src/app/services/cursor-service.js
var kn = class {
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
}, An = {
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
function jn() {
	this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
jn.prototype.getStyleNames = function() {
	var e = localStorage.getItem(this._customStyleNamesKey);
	return e ? JSON.parse(e) : [];
}, jn.prototype._getStyles = function() {
	var e = localStorage.getItem(this._customStylesKey);
	return e ? JSON.parse(e) : [];
}, jn.prototype.getStyle = function(e) {
	var t = this.getStyleNames().indexOf(e);
	return t === -1 ? null : this._getStyles()[t];
}, jn.prototype.getStylesInfo = function() {
	for (var e = this.getStyleNames(), t = this._getStyles(), n = [], r = 0; r < e.length; r++) {
		var i = An.getStyleInfo(e[r], t[r]);
		n.push(i);
	}
	return n;
}, jn.prototype.setStyle = function(e, t) {
	var n = this.getStyleNames(), r = this._getStyles(), i = n.indexOf(e);
	return i === -1 && (i = n.length), n[i] = e, r[i] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(n)), localStorage.setItem(this._customStylesKey, JSON.stringify(r)), An.getStyleInfo(e, t);
}, jn.prototype.deleteStyle = function(e) {
	var t = this.getStyleNames(), n = this._getStyles(), r = t.indexOf(e);
	return r === -1 ? e : (t.splice(r, 1), n.splice(r, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), e);
};
//#endregion
//#region src/app/csl/styles/styles-manager.js
function Z(e) {
	this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new jn(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._cachedStylePrefix = "zoteroCachedStyle_", this._defaultStyles = [
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
Z.prototype.addCustomStyle = function(e) {
	var t = this;
	return new Promise(function(t, n) {
		var r = e.name.toLowerCase();
		r.slice(-4) === ".csl" || r.slice(-4) === ".xml" ? r = r.substring(0, r.length - 4).trim() : n("Please select a .csl or .xml file."), e.size > 1024 * 1024 && n("Maximum file size is 1 MB."), t(r);
	}).then(function(n) {
		return t._readCSLFile(e).then(function(e) {
			return t._defaultStyles.indexOf(n) === -1 && t._defaultStyles.push(n), t._customStylesStorage.setStyle(n, e);
		});
	});
}, Z.prototype.getLastUsedFormat = function() {
	var e = localStorage.getItem(this._lastFormatKey);
	switch (e) {
		case "note":
		case "numeric":
		case "author":
		case "author-date":
		case "label": return e;
	}
	return "numeric";
}, Z.prototype.getLastUsedNotesStyle = function() {
	var e = localStorage.getItem(this._lastNotesStyleKey);
	return e === "footnotes" || e === "endnotes" ? e : "footnotes";
}, Z.prototype.getLastUsedStyleId = function() {
	return localStorage.getItem(this._lastStyleKey) || null;
}, Z.prototype.getLastUsedStyleIdOrDefault = function() {
	return localStorage.getItem(this._lastStyleKey) || "ieee";
}, Z.prototype.getStyle = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = this;
	return Promise.resolve(e).then(function(e) {
		if (n._cache[e]) return n._cache[e];
		if (n._customStylesStorage.getStyleNames().indexOf(e) !== -1) return n._customStylesStorage.getStyle(e);
		var t = n._STYLES_LOCAL + e + ".csl";
		if (n._isOnlineAvailable) t = n._STYLES_URL + e;
		else if (n._defaultStyles.indexOf(e) === -1) {
			var r = n._getCachedStyle(e);
			if (!r) throw "The style is not available in the local version of the plugin.";
			return r;
		}
		return fetch(t).then(function(e) {
			return e.text();
		});
	}).then(function(t) {
		if (t && !n._isValidCSL(t) && n._isOnlineAvailable) {
			var r = An.getStyleInfo(e, t);
			if (r && r.dependent > 0 && r.parent) return fetch(r.parent).then(function(e) {
				return e.text();
			});
		}
		return t;
	}).then(function(r) {
		var i = r && An.getCitationFormat(r) || "numeric", a = {
			content: r,
			styleFormat: i
		};
		return r && t && n._saveLastUsedStyle(e, r, i), r && n._isOnlineAvailable && n._defaultStyles.indexOf(e) === -1 && n._saveCachedStyle(e, r), a;
	});
}, Z.prototype.getStylesInfo = function() {
	var e = this;
	return Promise.all([this._getStylesJson(), this._customStylesStorage.getStylesInfo()]).then(function(t) {
		var n = e.getLastUsedStyleId() || "ieee", r = [], i = e._customStylesStorage.getStyleNames(), a = t[0], o = t[1];
		if (!e._isOnlineAvailable) {
			var s = e._getCachedStyleNames();
			a = a.filter(function(t) {
				return e._defaultStyles.indexOf(t.name) >= 0 || t.name == n || s.indexOf(t.name) >= 0;
			});
		}
		return o.forEach(function(t) {
			r.push(t), e._defaultStyles.indexOf(t.name) === -1 && e._defaultStyles.push(t.name);
		}), a.forEach(function(e) {
			i.indexOf(e.name) === -1 && r.push(e);
		}), r.sort((e, t) => e.name.localeCompare(t.name)), r;
	});
}, Z.prototype._getStylesJson = function() {
	var e = this._STYLES_JSON_LOCAL;
	return this._isOnlineAvailable && (e = this._STYLES_JSON_URL), fetch(e).then(function(e) {
		return e.json();
	});
}, Z.prototype.cached = function(e) {
	return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
}, Z.prototype.isLastUsedStyleContainBibliography = function() {
	return localStorage.getItem(this._lastUsedStyleContainBibliographyKey) !== "false";
}, Z.prototype.isStyleDefault = function(e) {
	return this._defaultStyles.indexOf(e) >= 0;
}, Z.prototype._isValidCSL = function(e) {
	return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
}, Z.prototype._readCSLFile = function(e) {
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
}, Z.prototype._saveCachedStyle = function(e, t) {
	this._cache[e] = t;
	try {
		localStorage.setItem(this._cachedStylePrefix + e, t);
	} catch {}
}, Z.prototype._getCachedStyle = function(e) {
	if (this._cache[e]) return this._cache[e];
	var t = localStorage.getItem(this._cachedStylePrefix + e);
	return t && (this._cache[e] = t), t;
}, Z.prototype._getCachedStyleNames = function() {
	for (var e = [], t = 0; t < localStorage.length; t++) {
		var n = localStorage.key(t);
		n && n.indexOf(this._cachedStylePrefix) === 0 && e.push(n.substring(this._cachedStylePrefix.length));
	}
	return e;
}, Z.prototype._saveLastUsedStyle = function(e, t, n) {
	this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, n);
	var r = An.isStyleContainBibliography(t);
	localStorage.setItem(this._lastUsedStyleContainBibliographyKey, r.toString());
}, Z.prototype.saveLastUsedNotesStyle = function(e) {
	localStorage.setItem(this._lastNotesStyleKey, e);
}, Z.prototype.setDesktopApiAvailable = function(e) {
	this._isDesktopAvailable = e;
}, Z.prototype.setRestApiAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/csl/locales/locales-manager.js
function Mn() {
	this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
Mn.prototype.loadLocale = function(e) {
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
}, Mn.prototype.getLastUsedLanguage = function() {
	return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
}, Mn.prototype.getLocale = function(e) {
	return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
}, Mn.prototype.saveLastUsedLanguage = function(e) {
	this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
}, Mn.prototype._getLocalesUrl = function() {
	return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
}, Mn.prototype.setDesktopApiAvailable = function(e) {
	this._isDesktopAvailable = e;
}, Mn.prototype.setRestApiAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/pages/settings.js
function Q(e, t, n) {
	if (this._router = e, this._displayNoneClass = t, this._sdk = n || null, this._saveBtn = new k("saveSettingsBtn", { variant: "primary" }), this._cancelBtn = new k("cancelBtn", { variant: "secondary" }), this._styleSelect = new je("styleSelectList", {
		placeholder: "Enter style name",
		sortable: !0
	}), this._styleSelectListOther = new je("styleSelectedListOther", {
		placeholder: "Enter style name",
		searchable: !0
	}), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper) throw Error("notesStyleWrapper not found");
	if (this._footNotes = new Se("footNotes", { label: "Footnotes" }), this._endNotes = new Se("endNotes", { label: "Endnotes" }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput) throw Error("cslFileInput not found");
	this._languageSelect = new je("styleLangList", { placeholder: "Select language" }), this._cslStylesManager = new Z("zoteroStyleId"), this._localesManager = new Mn(), this._selectLists = [], this._onChangeState = function(e, t) {}, this._styleMessage = new ye("styleMessage", { type: "error" }), this._langMessage = new ye("langMessage", { type: "error" }), this._LANGUAGES = [
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
	], this._bNumFormat = !1, this._connectionStatus = document.getElementById("connectionStatus"), this._switchToApiBtn = new k("switchToApiBtn", { variant: "secondary" }), this._switchToLocalBtn = new k("switchToLocalBtn", { variant: "secondary" }), this._settingsApiKeyWrapper = document.getElementById("settingsApiKeyWrapper"), this._settingsApiKeyField = new ve("settingsApiKeyField", { type: "text" }), this._settingsSaveApiKeyBtn = new k("settingsSaveApiKeyBtn", { variant: "secondary" }), this._settingsApiKeyMessage = new ye("settingsApiKeyMessage", { type: "error" }), this._settingsLocalMessage = new ye("settingsLocalMessage", { type: "error" }), this._onReconnect = function() {}, this._desktopAvailable = !1, this._onlineAvailable = !1, this._stateSettings = {
		style: "",
		notesStyle: "footnotes",
		styleFormat: "numeric"
	}, this._autoUpdateCitationsCheckbox = document.getElementById("autoUpdateCitations"), this._autoUpdateBibCheckbox = document.getElementById("autoUpdateBibliography");
	var r = this;
	this._autoUpdateCitationsCheckbox && (this._autoUpdateCitationsCheckbox.checked = localStorage.getItem("zoteroAutoUpdateCitations") !== "false", this._autoUpdateCitationsCheckbox.addEventListener("change", function() {
		localStorage.setItem("zoteroAutoUpdateCitations", String(this.checked)), r._somethingWasChanged();
	})), this._autoUpdateBibCheckbox && (this._autoUpdateBibCheckbox.checked = localStorage.getItem("zoteroAutoUpdateBib") !== "false", this._autoUpdateBibCheckbox.addEventListener("change", function() {
		localStorage.setItem("zoteroAutoUpdateBib", String(this.checked)), r._somethingWasChanged();
	}));
}
Q.prototype.getLocalesManager = function() {
	return this._localesManager;
}, Q.prototype.getStyleManager = function() {
	return this._cslStylesManager;
}, Q.prototype.getAutoUpdateCitations = function() {
	return localStorage.getItem("zoteroAutoUpdateCitations") !== "false";
}, Q.prototype.getAutoUpdateBibliography = function() {
	return localStorage.getItem("zoteroAutoUpdateBib") !== "false";
}, Q.prototype.getLocale = function() {
	return this._localesManager.getLocale();
}, Q.prototype.getLastUsedStyleId = function() {
	return this._cslStylesManager.getLastUsedStyleId();
}, Q.prototype.init = function() {
	var e = this._cslStylesManager.getLastUsedStyleId() || "ieee", t = this._localesManager.getLastUsedLanguage();
	this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, t);
	var n = [
		this._onStyleChange(e),
		this._localesManager.loadLocale(t),
		this._loadStyles()
	];
	return Promise.all(n);
}, Q.prototype.onChangeState = function(e) {
	this._onChangeState = e;
}, Q.prototype.setDesktopApiAvailable = function(e) {
	this._desktopAvailable = e, this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
}, Q.prototype.setRestApiAvailable = function(e) {
	this._onlineAvailable = e, this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
}, Q.prototype._addEventListeners = function() {
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
				throw console.error(t), e._langMessage.show(z("Failed to load language")), t;
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
					console.error(t), e._styleMessage.show(z("Invalid CSL style file"));
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
			e._switchToLocalBtn.disable(), ie.checkStatus(e._sdk).then(function(t) {
				t.desktop && t.hasPermission ? (e._sdk.clearSettings(), e._sdk.setIsOnlineAvailable(!1), e._hide(), e._onReconnect()) : t.desktop && !t.hasPermission ? e._settingsLocalMessage.show(z("Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check 'Allow other applications on this computer to communicate with Zotero'")) : e._settingsLocalMessage.show(z("Connection to Zotero failed. Make sure Zotero is running."));
			}).finally(function() {
				e._switchToLocalBtn.enable();
			});
		}
	}), this._settingsSaveApiKeyBtn.subscribe(function(t) {
		if (t.type === "button:click" && e._sdk) {
			var n = e._settingsApiKeyField.getValue();
			n && (e._settingsSaveApiKeyBtn.disable(), e._sdk.setApiKey(n).then(function() {
				ie.successfullyLoggedInUsingApiKey(), e._sdk.setIsOnlineAvailable(!0), e._settingsApiKeyWrapper && e._settingsApiKeyWrapper.classList.add("hidden"), e._settingsApiKeyMessage.close(), e._hide(), e._onReconnect();
			}).catch(function(t) {
				console.error(t), e._settingsApiKeyMessage.show(z("Invalid API key"));
			}).finally(function() {
				e._settingsSaveApiKeyBtn.enable();
			}));
		}
	});
}, Q.prototype._hideAllMessages = function() {
	this._langMessage.close(), this._styleMessage.close();
}, Q.prototype._hide = function() {
	this._router.openMain();
}, Q.prototype.show = function() {
	this._stateSettings = {
		language: this._localesManager.getLastUsedLanguage(),
		style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
		notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
		styleFormat: this._cslStylesManager.getLastUsedFormat()
	}, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check() : this._footNotes.check(), this._updateConnectionUI();
}, Q.prototype._loadStyles = function() {
	var e = this;
	return this._cslStylesManager.getStylesInfo().then(function(t) {
		e._addStylesToList(t), e._styleSelect.addCustomItem("more_styles", "More Styles..."), e._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
	}).catch(function(e) {
		console.error(e);
	});
}, Q.prototype._addStylesToList = function(e) {
	var t = this, n = this._cslStylesManager.getLastUsedStyleIdOrDefault(), r = e.map(function(e) {
		return [e.name, e.title];
	}), i = r.filter(function(e) {
		return !!(e[0] == n || t._cslStylesManager.isStyleDefault(e[0]));
	});
	this._styleSelect.addItems(i, n), this._styleSelectListOther.addItems(r, n);
}, Q.prototype._somethingWasChanged = function() {
	this._saveBtn.enable();
}, Q.prototype._onStyleChange = function(e, t) {
	var n = this;
	return t && n._showLoader(), n._cslStylesManager.getStyle(e, !t).then(function(e) {
		var r = e.styleFormat;
		n._bNumFormat = r == "numeric", r === "note" ? n._notesStyleWrapper.classList.remove(n._displayNoneClass) : n._notesStyleWrapper.classList.add(n._displayNoneClass), t && n._hideLoader();
	}).catch(function(e) {
		throw console.error(e), typeof e == "string" && n._styleMessage.show(z(e)), t && n._hideLoader(), e;
	});
}, Q.prototype._showLoader = function() {
	this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
}, Q.prototype._hideLoader = function() {
	this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
}, Q.prototype._updateConnectionUI = function() {
	this._settingsApiKeyWrapper && this._settingsApiKeyWrapper.classList.add("hidden"), this._settingsApiKeyMessage.close(), this._settingsLocalMessage.close();
	var e = this._sdk && this._sdk.getIsOnlineAvailable();
	this._connectionStatus && (e ? this._connectionStatus.textContent = z("Connected via API Key") : this._connectionStatus.textContent = z("Connected to Local Zotero"));
	var t = document.getElementById("switchToApiBtn"), n = document.getElementById("switchToLocalBtn");
	e ? (t && (t.classList.remove("hidden"), t.textContent = z("Log out from API Key")), n && this._desktopAvailable ? (n.classList.remove("hidden"), n.textContent = z("Connect to Local Zotero")) : n && n.classList.add("hidden")) : (n && (n.classList.remove("hidden"), n.textContent = z("Log out from Local Zotero")), t && this._onlineAvailable ? (t.classList.remove("hidden"), t.textContent = z("Connect with API Key")) : t && t.classList.add("hidden"));
}, Q.prototype.onReconnect = function(e) {
	this._onReconnect = e;
};
//#endregion
//#region src/app/pages/login.js
function Nn(e, t) {
	if (this._router = e, this._sdk = t, this._apiKeyLoginField = new ve("apiKeyField", {
		autofocus: !0,
		autocomplete: "on"
	}), this._saveApiKeyBtn = new k("saveApiKeyBtn", { disabled: !0 }), this._apiKeyMessage = new ye("apiKeyMessage", { type: "error" }), this._useDesktopMessage = new ye("useDesktopMessage", { type: "error" }), this._connectToLocalZotero = new k("connectToLocalZotero", { variant: "secondary" }), this._useDesktopApp = document.getElementById("useDesktopApp"), !this._useDesktopApp) throw Error("useDesktopApp not found");
	if (this._logoutLink = document.getElementById("logoutLink"), !this._logoutLink) throw Error("logoutLink not found");
	this._onAuthorized = function(e) {}, this._onChangeState = function(e) {}, this._onOpen = function() {};
}
Nn.prototype.init = function() {
	var e = this;
	this._addEventListeners();
	var t = !1, n = document.querySelectorAll(".for-zotero-online");
	ie.runApisChecker(e._sdk).subscribe(function(r) {
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
		} else if (r.hasKey && !r.online && !r.desktop) {
			e._sdk.setIsOnlineAvailable(!1), e._hide(!0), e._hideAllMessages(), e._onAuthorized(r);
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
}, Nn.prototype._addEventListeners = function() {
	var e = this;
	this._apiKeyLoginField.subscribe(function(t) {
		t.type, t.type === "inputfield:input" && (e._apiKeyLoginField.getValue() ? e._saveApiKeyBtn.enable() : e._saveApiKeyBtn.disable());
	}), this._saveApiKeyBtn.subscribe(function(t) {
		t.type === "button:click" && e._tryToApplyKey();
	}), this._connectToLocalZotero.subscribe(function(t) {
		t.type === "button:click" && (e._showLoader(), ie.checkStatus(e._sdk).then(function(t) {
			t.desktop && t.hasPermission ? (e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages()) : t.desktop && !t.hasPermission ? e._useDesktopMessage.show(z("Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check \"Allow other applications on this computer to communicate with Zotero\"")) : t.desktop || e._useDesktopMessage.show(z("Connection to Zotero failed. Make sure Zotero is running."));
		}).finally(function() {
			e._hideLoader();
		}));
	}), this._logoutLink.onclick = function(t) {
		return e._sdk.clearSettings(), e._show(), !0;
	};
}, Nn.prototype._tryToApplyKey = function() {
	var e = this, t = e._apiKeyLoginField.getValue();
	t && (e._showLoader(), e._sdk.setApiKey(t).then(function() {
		ie.successfullyLoggedInUsingApiKey(), e._hide(!0);
	}).catch(function(t) {
		console.error(t), e._apiKeyMessage.show(z("Invalid API key"));
	}).finally(function() {
		e._hideLoader();
	}));
}, Nn.prototype._hideAllMessages = function() {
	this._apiKeyMessage.close();
}, Nn.prototype._hide = function(e) {
	this._router.openMain(), e && this._logoutLink.classList.remove("hidden");
}, Nn.prototype._show = function() {
	this._router.openLogin(), this._logoutLink.classList.add("hidden");
}, Nn.prototype._showLoader = function() {
	this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
}, Nn.prototype._hideLoader = function() {
	this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
//#endregion
//#region src/app/shared/ui/search-filter.js
function Pn() {
	this._searchField = new ve("searchField", {
		type: "text",
		autofocus: !0,
		showClear: !1
	}), this._filterButton = new k("filterButton", {
		variant: "secondary-icon",
		size: "small"
	}), this._librarySelectList = new je("librarySelectList", {
		placeholder: z("No items selected"),
		multiple: !0,
		description: z("Search in:")
	}), this._subscribers = [], this._addEventListeners();
}
Pn.prototype._addEventListeners = function() {
	var e = this, t = null;
	this._searchField.subscribe(function(n) {
		if (n.type === "inputfield:blur" || n.type === "inputfield:submit") {
			t &&= (clearTimeout(t), null);
			var r = e._getSelectedGroups();
			e._subscribers.forEach(function(e) {
				e(n.detail.value, r);
			});
		} else n.type === "inputfield:input" && (t && clearTimeout(t), t = setTimeout(function() {
			t = null;
			var r = e._getSelectedGroups();
			e._subscribers.forEach(function(e) {
				e(n.detail.value, r);
			});
		}, 350));
	}), this._filterButton.subscribe(function(t) {
		t.type === "button:click" && (e._librarySelectList.isOpen || (t.detail.originalEvent && t.detail.originalEvent.stopPropagation(), e._librarySelectList.openDropdown()));
	});
}, Pn.prototype.addGroups = function(e) {
	var t = this, n = localStorage.getItem("selectedGroups"), r = n ? JSON.parse(n).map(function(e) {
		return e.toString();
	}) : ["my_library", "group_libraries"], i = !1;
	e.forEach(function(e) {
		e.id = String(e.id);
	});
	var a = [{
		id: "my_library",
		name: z("My Library")
	}, {
		id: "group_libraries",
		name: z("Group Libraries")
	}];
	!i && a.forEach(function(e) {
		r.indexOf(e.id) !== -1 && (i = !0);
	}), !i && e.forEach(function(e) {
		r.indexOf(e.id.toString()) !== -1 && (i = !0);
	}), i || (r = ["my_library", "group_libraries"]);
	for (var o = function(e, n, r) {
		typeof e == "number" && (e = e.toString()), t._librarySelectList instanceof je && t._librarySelectList.addItem(e, n, r);
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
}, Pn.prototype._getSelectedGroups = function() {
	var e = this, t = this._librarySelectList.getSelectedValues();
	return (Array.isArray(t) === !1 || t.length === 0) && setTimeout(function() {
		e._librarySelectList.openDropdown();
	}, 500), t === null || typeof t == "string" ? [] : t;
}, Pn.prototype.subscribe = function(e) {
	var t = this;
	return this._subscribers.push(e), { unsubscribe: function() {
		t._subscribers = t._subscribers.filter(function(t) {
			return t !== e;
		});
	} };
}, Pn.prototype._selectedGroupsWatcher = function(e, t) {
	var n = this;
	this._librarySelectList instanceof je && this._librarySelectList.subscribe(function(r) {
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
var Fn = [
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
	this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._orderedIds = [], this._docRoots = {}, this._reorderBtns = {}, this._usedItemKeys = /* @__PURE__ */ new Set(), this._priorityHolder = null, this._priorityEntries = [], this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = n, this._fLoadMore = t, this._loadTimeout, this._editMode = !1, this._init();
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
	e && (e.scrollTop = 0), this._docRoots = {}, this._reorderBtns = {}, this._priorityHolder = null, this._priorityEntries = [], this._docsScroller.onscroll();
}, $.prototype.displayNothingFound = function() {
	this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
}, $.prototype.displaySearchItems = function(e, t, n) {
	var r = this, i = this._docsHolder;
	this._lastSearch = n;
	var a = 0;
	return new Promise((n, o) => {
		if (e && e.items && e.items.length > 0) {
			for (var s = document.createElement("div"), c = [], l = 0; l < e.items.length; l++) {
				var u = e.items[l];
				u.title && (r._isUsedInDocument(u) ? c.push(u) : s.appendChild(r._buildDocElement(u)), a++);
			}
			i && s.children.length && (s.classList.add("page" + i.children.length), i.appendChild(s)), r._addPriorityItems(c);
		} else t && o(t);
		this._docsScroller.onscroll(), n(a);
	});
}, $.prototype.setUsedItemKeys = function(e) {
	this._usedItemKeys = e instanceof Set ? e : /* @__PURE__ */ new Set();
}, $.prototype._isUsedInDocument = function(e) {
	if (!this._usedItemKeys || this._usedItemKeys.size === 0) return !1;
	for (var t = Xt(e), n = 0; n < t.length; n++) if (this._usedItemKeys.has(t[n])) return !0;
	return !1;
}, $.prototype._getAlphabeticalKey = function(e) {
	var t = "";
	if (e.author && e.author.length > 0) {
		var n = e.author[0];
		t = [n.family, n.given].filter(function(e) {
			return !!e;
		}).join(" ").trim(), !t && n.literal && (t = String(n.literal).trim());
	}
	return t ||= (e.title || "").trim(), t.toLowerCase();
}, $.prototype._addPriorityItems = function(e) {
	var t = this, n = this._docsHolder;
	if (!(!e.length || !n)) {
		this._priorityHolder || (this._priorityHolder = document.createElement("div"), this._priorityHolder.classList.add("docs-priority"));
		var r = this._priorityHolder;
		r.parentNode !== n && n.insertBefore(r, n.firstChild), e.forEach(function(e) {
			t._priorityEntries.push({
				key: t._getAlphabeticalKey(e),
				element: t._buildDocElement(e)
			});
		}), this._priorityEntries.sort(function(e, t) {
			return e.key.localeCompare(t.key);
		}), this._priorityEntries.forEach(function(e) {
			r.appendChild(e.element);
		});
	}
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
	var t = this;
	this._items[e.id] && (e = this._items[e.id]);
	var n = document.createElement("div");
	n.classList.add("doc");
	var r = document.createElement("div");
	r.classList.add("docInfo");
	var i = document.createElement("div"), a = "";
	e.author && e.author.length > 0 && (a = e.author.map(function(e) {
		return e.family && e.given ? e.family.trim() + ", " + e.given.trim() : e.family ? e.family.trim() : e.given ? e.given.trim() : "";
	}).join("; "));
	var o = document.createElement("div");
	o.classList.add("doc-expand-btn"), o.innerHTML = "•••";
	var s = document.createElement("div");
	if (s.textContent = e.title.trim(), s.classList.add("truncate-text"), (e.publisher || e["publisher-place"]) && (s.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
		var c = e.issued["date-parts"][0];
		a.length > 20 ? s.textContent += " (" + c.join("-") + ")" : (a.length > 0 && a.slice(-1) !== "." && a.slice(-1) !== "," && (a += "."), a += " " + c.join("-"));
	}
	a.length === 0 && (a = s.textContent), s.setAttribute("title", s.textContent), r.appendChild(s);
	var l = document.createElement("input");
	i.appendChild(l);
	var u = new Ae(l, {
		checked: !!this._items[e.id],
		label: a,
		title: !0,
		id: e.id
	});
	this._items[e.id] && (this._checks[e.id] = u);
	var d = document.createElement("div");
	d.classList.add("doc-reorder-btns"), d.style.display = this._items[e.id] ? "flex" : "none";
	var f = document.createElement("span");
	f.className = "doc-reorder-btn", f.textContent = "▲", f.title = z("Move up"), f.onclick = function(n) {
		n.stopPropagation(), t._moveItem(e.id, -1);
	};
	var p = document.createElement("span");
	p.className = "doc-reorder-btn", p.textContent = "▼", p.title = z("Move down"), p.onclick = function(n) {
		n.stopPropagation(), t._moveItem(e.id, 1);
	}, d.appendChild(f), d.appendChild(p), this._reorderBtns[e.id] = d, i.appendChild(d), i.appendChild(o), n.appendChild(i), n.appendChild(r), n.setAttribute("data-id", String(e.id)), this._docRoots[e.id] = n;
	var m;
	function h() {
		n.classList.toggle("doc-open"), m || (m = t._buildCitationParams(e), n.appendChild(m));
	}
	o.onclick = function(e) {
		e.stopPropagation(), h();
	};
	var g = i.querySelector(".checkbox-container");
	return g && g.addEventListener("click", function(e) {
		var t = e.target;
		t.classList.contains("checkbox-visual") || t.classList.contains("checkbox-checkmark") || t.closest(".checkbox-visual") || t === u._input || (e.stopImmediatePropagation(), e.preventDefault(), h());
	}, !0), r.style.cursor = "pointer", r.onclick = function(e) {
		e.stopPropagation(), h();
	}, u.subscribe(function(r) {
		r.type === "checkbox:change" && (r.detail.checked ? t._addSelected(e, u, n) : t._removeSelected(e.id));
	}), n;
}, $.prototype._buildCitationParams = function(e) {
	var t = e.label || localStorage.getItem("selectedLocator") || "page";
	e.label = t;
	var n = document.createDocumentFragment(), r = document.createElement("div"), i = document.createElement("input"), a = document.createElement("input"), o = document.createElement("div"), s = document.createElement("div"), c = document.createElement("input"), l = document.createElement("div"), u = document.createElement("input");
	n.appendChild(r), r.appendChild(i), r.appendChild(a), n.appendChild(o), o.appendChild(s), o.appendChild(c);
	var d = "";
	n.appendChild(l), l.appendChild(u);
	var f = new ve(i, {
		type: "text",
		placeholder: z("Prefix"),
		value: e.prefix || ""
	}), p = new ve(a, {
		type: "text",
		placeholder: z("Suffix"),
		value: e.suffix || ""
	}), m = new je(s, {
		placeholder: z("Locator"),
		usePortal: !0,
		translate: z
	});
	Fn.forEach(function(e) {
		var n = e[0] === t;
		m.addItem(e[0], e[1], n), n && (d = e[1]);
	});
	var h = new ve(c, {
		type: "text",
		placeholder: z(d),
		value: e.locator || ""
	}), g = new Ae(u, {
		label: z("Omit Author"),
		checked: !!e["suppress-author"]
	});
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
	n.classList.add("selDoc"), n.setAttribute("data-id", String(e.id));
	var r = document.createElement("span");
	e.author && e.author.length > 0 ? r.textContent = e.author.map(function(e) {
		return e.family + ", " + e.given;
	}).join("; ") : r.textContent = e.title, e.issued && e.issued["date-parts"] && (r.textContent += " " + e.issued["date-parts"][0].join("-")), r.setAttribute("title", r.textContent), n.appendChild(r);
	var i = document.createElement("span");
	i.className = "selDoc-move", i.textContent = "▲", i.title = z("Move up"), i.onclick = function() {
		t._moveItem(e.id, -1);
	}, n.appendChild(i);
	var a = document.createElement("span");
	a.className = "selDoc-move", a.textContent = "▼", a.title = z("Move down"), a.onclick = function() {
		t._moveItem(e.id, 1);
	}, n.appendChild(a);
	var o = document.createElement("span");
	return o.onclick = function() {
		t._removeSelected(e.id);
	}, o.innerHTML = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z\" fill=\"currentColor\" fill-opacity=\"0.8\"/></svg>", n.appendChild(o), n;
}, $.prototype._addSelected = function(e, t, n) {
	this._items[e.id] = e, this._checks[e.id] = t, this._orderedIds.push(e.id), this._reorderBtns[e.id] && (this._reorderBtns[e.id].style.display = ""), this._docsScroller.onscroll(), this._checkSelected();
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
	delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]);
	var t = this._orderedIds.indexOf(e);
	t !== -1 && this._orderedIds.splice(t, 1), this._reorderBtns[e] && (this._reorderBtns[e].style.display = "none"), this._docsScroller.onscroll(), this._checkSelected();
}, $.prototype._checkSelected = function() {
	var e = this.count();
	this._selectedWrapper && this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo && this._selectedInfo.classList.add(this._displayNoneClass), this._subscribers.forEach(function(t) {
		t(e);
	});
}, $.prototype.count = function() {
	var e = 0;
	for (var t in this._items) e++;
	return e;
}, $.prototype.setEditMode = function(e) {
	this._editMode = e, this._selectedWrapper && (e ? this._selectedWrapper.classList.add("edit-mode") : this._selectedWrapper.classList.remove("edit-mode"));
}, $.prototype.addPreselectedItem = function(e) {
	this._items[e.id] = e, this._orderedIds.push(e.id);
	var t = this._buildDocElement(e);
	this._docsHolder && this._docsHolder.appendChild(t), this._docsScroller.onscroll(), this._checkSelected();
}, $.prototype._moveItem = function(e, t) {
	var n = this._orderedIds.indexOf(e);
	if (n !== -1) {
		var r = n + t;
		if (!(r < 0 || r >= this._orderedIds.length)) {
			var i = this._orderedIds[r];
			this._orderedIds[r] = this._orderedIds[n], this._orderedIds[n] = i;
			var a = this._docRoots[e], o = this._docRoots[i];
			if (a && o && a.parentNode) {
				var s = document.createElement("div");
				a.parentNode.insertBefore(s, a), o.parentNode.insertBefore(a, o), s.parentNode.insertBefore(o, s), s.parentNode.removeChild(s);
			}
			this._docsScroller.onscroll();
		}
	}
}, $.prototype.getSelectedItemsOrdered = function() {
	for (var e = [], t = 0; t < this._orderedIds.length; t++) {
		var n = this._orderedIds[t];
		this._items[n] && e.push(this._items[n]);
	}
	return e;
}, (function() {
	var e = "hidden", t, n, r, i, o = {
		text: "",
		obj: null,
		groups: [],
		groupsHash: ""
	}, s = !1, c = {
		keys: /* @__PURE__ */ new Set(),
		promise: null,
		fetchedAt: 0,
		ttl: 5e3,
		timeout: 3e3
	}, l, u, d, f = !1, p = null, m = null, h, g, _, v, y, b, x = new R("libLoader", z("Loading...")), S = {};
	function ne() {
		var t = document.getElementById("errorWrapper");
		if (!t) throw Error("errorWrapper not found");
		var n = document.getElementById("mainState");
		if (!n) throw Error("mainState not found");
		l = new Pn(), u = new $(e, me, he), h = new k("saveAsTextBtn", { variant: "secondary" }), g = new k("insertLinkBtn", { disabled: !0 }), v = new k("editCitationBtn", { variant: "secondary" }), _ = new k("settingsBtn", {
			variant: "icon-only",
			size: "small"
		}), y = new k("insertBibBtn", { variant: "secondary" }), b = new k("refreshBtn", { variant: "secondary" }), d = new k("cancelEditBtn", { variant: "secondary" }), S = {
			error: t,
			mainState: n
		};
	}
	window.Asc.plugin.init = function() {
		R.show(), ne(), t = new te(), n = new O();
		var a = new Nn(t, n);
		r = new Q(t, e, n), i = new en(r.getLocalesManager(), r.getStyleManager(), n);
		var o = !1;
		oe(), r.onReconnect(function() {
			ae().catch(function(e) {
				console.error(e);
			}), C();
		}), a.init().onOpen(function() {
			R.hide();
		}).onChangeState(function(e) {
			r.setDesktopApiAvailable(e.desktop), r.setRestApiAvailable(e.online);
		}).onAuthorized(function(e) {
			if (!o) {
				o = !0, R.show();
				var t = ae().catch((e) => {
					console.error(e), w(z("An error occurred while loading library groups. Try restarting the plugin."));
				}), n = N().catch((e) => console.error("Failed to read document prefs:", e)).then(() => r.init()).catch((e) => {
					console.error(e), w(z("An error occurred while loading settings. Try restarting the plugin.")), r.show();
				});
				Promise.all([t, n]).then(function() {
					return R.hide(), C();
				}).finally(function() {
					R.hide();
				});
			}
		}), window.Asc.plugin.onTranslate = se, F().then((e) => {
			window.Asc.scope.editorVersion = e, Ce();
		}).catch((e) => {
			console.error(e);
		});
	};
	function re() {
		c.promise = null, c.fetchedAt = 0;
	}
	function ie() {
		var e = Date.now();
		return c.promise && e - c.fetchedAt < c.ttl ? c.promise : s ? Promise.resolve(c.keys) : (c.fetchedAt = e, c.promise = new Promise(function(e) {
			var t = setTimeout(function() {
				re(), e(c.keys);
			}, c.timeout);
			i.getUsedItemKeys().then(function(n) {
				clearTimeout(t), c.keys = n, e(n);
			}).catch(function(n) {
				clearTimeout(t), console.error(n), re(), e(c.keys);
			});
		}), c.promise);
	}
	function C() {
		return x.show(), ge(n.getItems(null).then((e) => (delete e.next, e)), !1).then((e) => {
			pe(e > 0 ? "started" : "empty");
		}).catch((e) => {
			console.error(e);
		}).finally(() => {
			x.hide();
		});
	}
	function ae() {
		return n.getUserGroups().then(function(e) {
			return l.addGroups(e), e;
		});
	}
	function oe() {
		u.subscribe(A);
		function t(e, t, r) {
			u.clearLibrary();
			var i = [];
			return n.getUserGroups().then(function(a) {
				var s = t.filter(function(e) {
					return e !== "my_library" && e !== "group_libraries";
				});
				t.indexOf("my_library") !== -1 && i.push(ge(n.getItems(e), !1));
				for (var c = 0; c < s.length; c++) i.push(ge(n.getGroupItems(e, s[c]), !0));
				return o.text = e, o.obj = null, o.groups = [], o.groupsHash = r, i;
			});
		}
		l.subscribe(function(n, r) {
			n = n.trim();
			var i = r.join(",");
			S.mainState.classList.contains(e) || !n || n == o.text && i === o.groupsHash || r.length === 0 || t(n, r, i).catch(() => []).then(function(e) {
				return e.length && (x.show(), Promise.any(e).then(function() {
					x.hide();
				}).finally(function() {
					x.hide();
				})), Promise.allSettled(e);
			}).then(function(e) {
				var t = 0;
				e.forEach(function(e) {
					e.status === "fulfilled" && (t += e.value);
				}), t === 0 ? (pe("empty"), u.displayNothingFound()) : pe("not-empty");
			});
		}), v.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				e.type === "button:click" && (yield j());
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), d.subscribe(function(e) {
			e.type === "button:click" && M();
		}), b.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				if (e.type !== "button:click") return;
				if (!r.getLastUsedStyleId()) {
					w(z("Style is not selected"));
					return;
				}
				if (!r.getLocale()) {
					w(z("Language is not selected"));
					return;
				}
				y.disable(), b.disable(), g.disable(), v.disable();
				var t = 0, n = 0;
				function a(e) {
					var r = e.total > 0 ? e.completed / e.total : 1;
					e.phase === "fetch" ? t = r : n = r, R.setProgress(t * .4 + n * .6);
					var i = e.phase === "fetch" ? z("Fetching updated references") : z("Updating citations");
					R.setText("Zotero (" + i + " " + e.completed + "/" + e.total + ")");
				}
				R.setText("Zotero (" + z("Updating citations") + ")"), R.setProgress(0), R.show();
				var o = r.getStyleManager(), s = o.getLastUsedFormat() === "note";
				try {
					yield ce(!0);
					var c;
					try {
						c = yield i.repairBrokenCitations();
					} finally {
						yield T(!1);
					}
					if (s) {
						var l = yield i.prepareRefreshCslItemsInNotes(o.getLastUsedNotesStyle(), a);
						yield ce(!0);
						try {
							yield i.applyRefreshCslItemsInNotes(l);
						} finally {
							yield T(!1);
						}
					} else {
						var u = yield i.prepareRefreshCslItems(void 0, a);
						yield ce(!0);
						try {
							yield i.applyRefreshCslItems(u);
						} finally {
							yield T(!1);
						}
					}
					if (c.repaired > 0) {
						var d = z("Repaired") + " " + c.repaired + " " + z("citation(s) that had lost their formatting.");
						c.failed > 0 && (d += " " + c.failed + " " + z("could not be repaired.")), i.showSuccessMessage(d);
					}
				} catch (e) {
					console.error(e);
					var f = z("Failed to refresh");
					typeof e == "string" && (f += ". " + z(e)), w(f);
				} finally {
					R.setProgress(null), R.hide(), y.enable(), b.enable(), v.enable(), A();
				}
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), y.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				if (e.type === "button:click") {
					if (!r.getLastUsedStyleId()) {
						w(z("Style is not selected"));
						return;
					}
					if (!r.getLocale()) {
						w(z("Language is not selected"));
						return;
					}
					yield E(!1, "Zotero (" + z("Inserting bibliography") + ")");
					var t = "";
					i.insertBibliography().then(function(e) {
						t = e;
					}).catch(function(e) {
						console.error(e), i.showWarningMessage("Failed to insert bibliography"), typeof e == "string" && w(z(e));
					}).finally(function() {
						de(!1, "Zotero (" + z("Inserting bibliography") + ")"), t && i.moveCursorOutsideField(t);
					});
				}
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), g.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				if (e.type === "button:click") {
					if (!r.getLastUsedStyleId()) {
						w(z("Style is not selected"));
						return;
					}
					if (!r.getLocale()) {
						w(z("Language is not selected"));
						return;
					}
					if (f) {
						var t = u.getSelectedItemsOrdered();
						if (t.length === 0) {
							w(z("No citations selected"));
							return;
						}
						var n = t.map(function(e) {
							var t = m.citationItems.find(function(t) {
								return t.id === e.id || t.itemData && t.itemData.id === e.id;
							});
							if (t) return t.prefix = e.prefix || "", t.suffix = e.suffix || "", t.locator = e.locator || "", t.label = e.label || "page", t["suppress-author"] = !!e["suppress-author"], t;
							var n = {
								id: e.id,
								itemData: Object.assign({}, e),
								uris: e.uris || []
							};
							return delete n.itemData.prefix, delete n.itemData.suffix, delete n.itemData.locator, delete n.itemData.label, delete n.itemData["suppress-author"], delete n.itemData.uris, n.prefix = e.prefix || "", n.suffix = e.suffix || "", n.locator = e.locator || "", n.label = e.label || "page", n["suppress-author"] = !!e["suppress-author"], n;
						}), o = JSON.parse(JSON.stringify(m));
						o.citationItems = n;
						var s = p;
						M(), yield E(!0, "Zotero (" + z("Updating citations") + ")");
						var c = i.updateItem.bind(i, o), l = r.getStyleManager();
						l.getLastUsedFormat() === "note" && (c = i.updateItem.bind(i, o, l.getLastUsedNotesStyle())), c().catch(function(e) {
							console.error(e);
							var t = z("Failed to update citation");
							typeof e == "string" && (t += ". " + z(e)), w(t);
						}).finally(/*#__PURE__*/ a(function* () {
							xe();
							var e = l.getLastUsedFormat() === "note";
							yield de(!1, "Zotero (" + z("Updating citations") + ")", e), s && (e ? yield i.moveCursorToField(s.FieldId, !1) : yield i.moveCursorOutsideField(s.FieldId));
						}));
						return;
					}
					yield E(!0, "Zotero (" + z("Inserting citation") + ")");
					var d = u.getSelectedItems(), h = !1, g = r.getStyleManager().getLastUsedFormat() === "note", _ = yield i.getCurrentField();
					if (_) return i.insertSelectedCitationsToCurrentField(d, _).then((e) => (u.removeItems(Object.keys(d)), we(e))).then((e) => {
						e && _ && i.showSuccessMessage("Citation has been updated successfully");
					}).finally(/*#__PURE__*/ a(function* () {
						de(!1, "Zotero (" + z("Inserting citation") + ")");
					}));
					var v = null;
					return i.insertSelectedCitations(d).then(function(e) {
						return h = e, u.removeItems(Object.keys(d)), i.getCurrentField();
					}).then(function(e) {
						if (v = e, !(g && !h)) {
							var t = {
								skipCitations: !r.getAutoUpdateCitations(),
								skipBibliography: !r.getAutoUpdateBibliography()
							};
							return h ? i.updateCslItems(!1, t) : i.updateCslItems(void 0, t);
						}
					}).then(() => {
						if (h) return i.moveCursorRight();
						if (_) return i.moveCursorOutsideField(_.FieldId);
					}).catch(function(e) {
						console.error(e);
						var t = z("Failed to insert citation");
						typeof e == "string" && (t += ". " + z(e)), w(t);
					}).finally(/*#__PURE__*/ a(function* () {
						var e = g && !h;
						de(!1, "Zotero (" + z("Inserting citation") + ")", e), xe(), h ? yield i.moveCursorRight() : v && (yield i.moveCursorOutsideField(v.FieldId));
					}));
				}
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), _.subscribe(function(e) {
			e.type === "button:click" && r.show();
		}), h.subscribe(/*#__PURE__*/ function() {
			var e = a(function* (e) {
				e.type === "button:click" && (yield E(!1, "Zotero (" + z("Saving as text") + ")"), i.saveAsText().then(function() {
					de(!1, "Zotero (" + z("Saving as text") + ")");
				}));
			});
			return function(t) {
				return e.apply(this, arguments);
			};
		}()), r.onChangeState(/*#__PURE__*/ function() {
			var e = a(function* (e, t) {
				yield E(!0, "Zotero (" + z("Updating citations") + ")");
				var n = i.updateCslItems.bind(i, !0);
				[e.styleFormat, t.styleFormat].includes("note") && (n = e.styleFormat === t.styleFormat ? e.notesStyle === t.notesStyle ? i.updateCslItems.bind(i, !0) : i.convertNotesStyle.bind(i, e.notesStyle) : e.styleFormat === "note" ? i.switchingBetweenNotesAndText.bind(i, e.notesStyle) : i.switchingBetweenNotesAndText.bind(i)), n().catch(function(e) {
					console.error(e);
					var t = z("Failed to refresh");
					typeof e == "string" && (t += ". " + z(e)), w(t);
				}).finally(function() {
					de(!1, "Zotero (" + z("Updating citations") + ")"), xe();
				});
			});
			return function(t, n) {
				return e.apply(this, arguments);
			};
		}());
	}
	Asc.plugin.onThemeChanged = function(e) {
		window.Asc.plugin.onThemeChangedBase(e), ee.fixThemeForIE(e), ee.addStylesForComponents(e);
		var t = "";
		t += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n", t += ".doc { border-color: " + e["border-regular-control"] + "; background-color: " + e["background-normal"] + "; }\n", t += ".scrollThumb { box-shadow: 0 0 8px 8px " + e["highlight-button-hover"] + " inset; }\n", t += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + e["canvas-scroll-thumb-pressed"] + " inset; }\n", t += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + e["canvas-scroll-thumb-hover"] + " inset; }\n", (["theme-white", "theme-night"].indexOf(e.name) !== -1 || ["theme-white", "theme-night"].indexOf(e.Name) !== -1) && (t += ".doc { border-radius: 4px; }\n");
		var n = document.getElementById("pluginStyles");
		n ? n.innerHTML = t : (n = document.createElement("style"), n.id = "pluginStyles", n.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(n));
		var r = e.type || "light", i = document.body;
		i.classList.remove("theme-dark"), i.classList.remove("theme-light"), i.classList.add("theme-" + r);
	};
	function se() {
		for (var e = document.getElementsByClassName("i18n"), t = function() {
			var t = e[n];
			if (!(t instanceof HTMLElement)) return 1;
			["placeholder", "title"].forEach((e) => {
				t.hasAttribute(e) && t.setAttribute(e, z(t.getAttribute(e) || ""));
			});
			var r = z(t.innerText.trim().replace(/\s+/g, " "));
			r && (t.innerText = r);
		}, n = 0; n < e.length; n++) if (t()) continue;
	}
	function w(t) {
		t && typeof t == "string" ? (z(""), S.error.classList.remove(e), S.error.textContent = t, setTimeout(function() {
			window.onclick = function() {
				w(!1);
			};
		}, 100)) : (S.error.classList.add(e), S.error.textContent = "", window.onclick = null);
	}
	function ce(e) {
		return le.apply(this, arguments);
	}
	function le() {
		return le = a(function* (e) {
			var t = window.Asc.scope.editorVersion;
			t && t < 9004e3 ? window._cursorPosition = yield kn.getCursorPosition() : yield new Promise((t) => {
				Asc.plugin.executeMethod("StartAction", ["GroupActions", {
					lockScroll: !0,
					keepSelection: e
				}], t);
			});
		}), le.apply(this, arguments);
	}
	function T(e, t) {
		return ue.apply(this, arguments);
	}
	function ue() {
		return ue = a(function* (e, t) {
			var n = window.Asc.scope.editorVersion;
			n && n < 9004e3 ? t || (yield kn.setCursorPosition(window._cursorPosition || 0)) : yield new Promise((t) => {
				Asc.plugin.executeMethod("EndAction", ["GroupActions", { scrollToTarget: e }], t);
			});
		}), ue.apply(this, arguments);
	}
	function E(e, t) {
		return D.apply(this, arguments);
	}
	function D() {
		return D = a(function* (e, t) {
			s = !0, y.disable(), b.disable(), g.disable(), v.disable(), yield ce(e);
		}), D.apply(this, arguments);
	}
	function de(e, t, n) {
		return fe.apply(this, arguments);
	}
	function fe() {
		return fe = a(function* (e, t, n) {
			s = !1, re(), y.enable(), b.enable(), v.enable(), A(), yield T(e, n);
		}), fe.apply(this, arguments);
	}
	function pe(e) {
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
	function me() {
		console.warn("Loading more..."), o.obj && o.obj.next && ge(o.obj.next(), !1);
		for (var e = 0; e < o.groups.length && o.groups[e].next; e++) ge(n.getGroupItems(o.groups[e].next(), o.groups[e].id), !0);
	}
	function he(e) {
		if (t.getRoute() != "main" || e.scrollTop + e.clientHeight < e.scrollHeight) return !1;
		var n = !0;
		return o.groups.forEach(function(e) {
			e.next && (n = !1);
		}), !(!o.obj || !o.obj.next || !n || !o.obj && !o.text.trim() && !o.groups.length);
	}
	function ge(e, t) {
		return e.then(function(e) {
			return _e(e, null, t);
		}).catch(function(e) {
			return console.error(e), e.message && w(z(e.message)), _e(null, e, t);
		}).then(function(e) {
			return e;
		});
	}
	function _e(e, t, n) {
		var r = !1;
		!o.obj && e && e.items && !e.items.length && (r = !0), t ? (r && (o.obj = null, o.groups = []), o && o.obj && delete o.obj.next) : n && e && e.next ? o.groups.push(e) : o.obj = e && e.items.length ? e : null;
		var i = function(e) {
			if (!e.id) return e;
			var t = e.id.indexOf("/") + 1, n = e.id.lastIndexOf("/") + 1, r = e.id.indexOf("http");
			return t !== n && r === 0 && (e.uris ||= [], e.uris.push(e.id)), n && (e.id = e.id.substring(n)), e;
		};
		return e && e.items && e.items.length > 0 && (e.items = e.items.map((t) => (t = ye(t), t[n ? "groupID" : "userID"] = String(e.id), i(t), t))), ie().then(function(n) {
			return u.setUsedItemKeys(n), u.displaySearchItems(e, t, o);
		});
	}
	var ve = {
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
	function ye(e) {
		if (e.id || !e.key) return e;
		var t = e.data || {}, n = {
			id: e.key,
			title: t.title || "",
			type: ve[t.itemType] || t.itemType || ""
		};
		if (Array.isArray(t.creators) && t.creators.forEach(function(e) {
			var t = {};
			e.firstName && (t.given = e.firstName), e.lastName && (t.family = e.lastName), e.name && (t.literal = e.name);
			var r = e.creatorType || "author";
			n[r] || (n[r] = []), n[r].push(t);
		}), t.date) {
			var r = t.date.replace(/\//g, "-").split("-").map(Number).filter(function(e) {
				return !isNaN(e);
			});
			r.length && (n.issued = { "date-parts": [r] });
		}
		return t.url && (n.URL = t.url), t.volume && (n.volume = t.volume), t.issue && (n.issue = t.issue), t.pages && (n.page = t.pages), t.edition && (n.edition = t.edition), t.language && (n.language = t.language), t.abstractNote && (n.abstract = t.abstractNote), t.note && (n.note = t.note), t.shortTitle && (n.shortTitle = t.shortTitle), t.publisher && (n.publisher = t.publisher), t.place && (n["publisher-place"] = t.place), t.DOI && (n.DOI = t.DOI), t.ISBN && (n.ISBN = t.ISBN), t.ISSN && (n.ISSN = t.ISSN), t.publicationTitle && (n["container-title"] = t.publicationTitle), t.bookTitle && (n["container-title"] = t.bookTitle), t.series && (n["collection-title"] = t.series), t.seriesNumber && (n["collection-number"] = t.seriesNumber), t.numberOfVolumes && (n["number-of-volumes"] = t.numberOfVolumes), t.numPages && (n["number-of-pages"] = t.numPages), e.links && (n.uris = [], e.links.self && n.uris.push(e.links.self.href), e.links.alternate && n.uris.push(e.links.alternate.href)), n;
	}
	function A(e) {
		if (e === void 0 && (e = u.count()), f) {
			e <= 0 ? (g.disable(), g.setText(z("Update Citation"))) : (g.enable(), g.setText(z("Update Citation")));
			return;
		}
		e <= 0 ? (g.disable(), g.setText(z("Insert/Edit Citation"))) : (!s && g.enable(), e > 1 ? g.setText(z("Insert " + e + " Citations")) : g.setText(z("Insert/Edit Citation")));
	}
	function j() {
		return be.apply(this, arguments);
	}
	function be() {
		return be = a(function* () {
			var e = yield new Promise((e) => {
				window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
			});
			if (!e || !e.Value || e.Value.toLowerCase().indexOf("zotero_item") === -1) {
				i.showWarningMessage(z("No Zotero citation found at the cursor. Please click directly on a citation to edit it."));
				return;
			}
			var t = e.Value.indexOf("{"), n = e.Value.lastIndexOf("}");
			if (t === -1 || n === -1 || n < t) {
				i.showWarningMessage(z("Could not parse the citation data."));
				return;
			}
			var r = e.Value.slice(t, n + 1), a;
			try {
				a = JSON.parse(r);
			} catch (e) {
				console.error("Failed to parse citation data:", e), i.showWarningMessage(z("Could not parse the citation data."));
				return;
			}
			u.removeItems(Object.keys(u.getSelectedItems())), u.clearLibrary(), f = !0, p = e, m = a, u.setEditMode(!0), a.citationItems && a.citationItems.forEach(function(e) {
				var t = Object.assign({}, e.itemData || {});
				!t.id && e.id && (t.id = e.id), e.uris && (t.uris = e.uris), e.prefix && (t.prefix = e.prefix), e.suffix && (t.suffix = e.suffix), e.locator && (t.locator = e.locator), e.label && (t.label = e.label), e["suppress-author"] && (t["suppress-author"] = e["suppress-author"]), u.addPreselectedItem(t);
			}), d._container.classList.remove("hidden"), v._container.classList.add("hidden"), y._container.classList.add("hidden"), b._container.classList.add("hidden"), g.setText(z("Update Citation")), g.enable(), A();
		}), be.apply(this, arguments);
	}
	function M() {
		f = !1, p = null, m = null, u.setEditMode(!1), u.removeItems(Object.keys(u.getSelectedItems())), u.clearLibrary(), d._container.classList.add("hidden"), v._container.classList.remove("hidden"), y._container.classList.remove("hidden"), b._container.classList.remove("hidden"), g.setText(z("Insert Citation")), g.disable(), A(), C();
	}
	function N() {
		return P.apply(this, arguments);
	}
	function P() {
		return P = a(function* () {
			var e = yield new Promise((e) => {
				Asc.plugin.callCommand(() => {
					var e = Api.GetDocument().GetCustomProperties();
					if (!e) return "";
					var t = typeof e.Get == "function" ? e.Get("ZOTERO_PREF_COUNT") : null, n = parseInt(String(t || ""), 10), r = "", i = 1;
					if (!isNaN(n) && n > 0) {
						for (; i <= n; i++) {
							var a = e.Get("ZOTERO_PREF_" + i);
							if (a == null || a === "") break;
							r += String(a);
						}
						return r;
					}
					for (;;) {
						var o = e.Get("ZOTERO_PREF_" + i);
						if (o == null || o === "") break;
						r += String(o), i++;
					}
					return r;
				}, !1, !0, (t) => e(t || ""));
			});
			if (e) try {
				var t = new DOMParser().parseFromString(e, "text/xml"), n = t.querySelector("style");
				if (n) {
					var r = n.getAttribute("id") || "", i = n.getAttribute("locale") || "";
					if (r) {
						var a = r.replace(/^.*\/styles\//, "");
						a && localStorage.setItem("zoteroStyleId", a);
					}
					i && localStorage.setItem("zoteroLang", i);
					var o = n.getAttribute("hasBibliography");
					o !== null && localStorage.setItem("zoteroContainBibliography", o === "1" || o === "true" ? "true" : "false");
				}
				var s = t.querySelector("pref[name=\"noteType\"]");
				if (s) {
					var c = s.getAttribute("value");
					c === "1" ? (localStorage.setItem("zoteroNotesStyleId", "footnotes"), localStorage.setItem("zoteroFormatId", "note")) : c === "2" && (localStorage.setItem("zoteroNotesStyleId", "endnotes"), localStorage.setItem("zoteroFormatId", "note"));
				}
				var l = t.querySelector("pref[name=\"hasBibliography\"]");
				if (l) {
					var u = l.getAttribute("value");
					u !== null && localStorage.setItem("zoteroContainBibliography", u === "true" ? "true" : "false");
				}
			} catch (e) {
				console.error("Failed to parse ZOTERO_PREF XML:", e);
			}
		}), P.apply(this, arguments);
	}
	function xe() {
		var e = r.getStyleManager(), t = e.getLastUsedStyleId();
		if (!t) return Promise.resolve();
		var n = r.getLocalesManager().getLastUsedLanguage() || "en-US", i = e.getLastUsedFormat(), a = e.getLastUsedNotesStyle(), o = "0";
		i === "note" && (o = a === "endnotes" ? "2" : "1");
		for (var s = e.isLastUsedStyleContainBibliography() ? "1" : "0", c = "<data data-version=\"3\" zotero-version=\"5.0.96\"><style id=\"http://www.zotero.org/styles/" + t + "\" locale=\"" + n + "\" hasBibliography=\"" + s + "\" bibliographyStyleHasBeenSet=\"1\"/><prefs><pref name=\"fieldType\" value=\"Field\"/><pref name=\"automaticJournalAbbreviations\" value=\"true\"/><pref name=\"noteType\" value=\"" + o + "\"/></prefs></data>", l = [], u = 0; u < c.length; u += 255) l.push(c.substring(u, u + 255));
		return new Promise(function(e) {
			Asc.scope.prefChunks = l, Asc.plugin.callCommand(function() {
				function e(e, t) {
					return typeof e.Get == "function" ? e.Get(t) : null;
				}
				function t(e, t) {
					typeof e.Delete == "function" ? e.Delete(t) : typeof e.Remove == "function" && e.Remove(t);
				}
				var n = Api.GetDocument().GetCustomProperties(), r = Asc.scope.prefChunks, i = "ZOTERO_PREF_", a = parseInt(String(e(n, "ZOTERO_PREF_COUNT") || ""), 10);
				if (!isNaN(a) && a > 0) for (var o = 1; o <= a; o++) t(n, i + o);
				else for (var s = 1;; s++) {
					var c = e(n, i + s);
					if (c == null || c === "") break;
					t(n, i + s);
				}
				t(n, "ZOTERO_PREF_COUNT");
				for (var l = 0; l < r.length; l++) n.Add(i + (l + 1), r[l]);
				n.Add("ZOTERO_PREF_COUNT", String(r.length));
			}, !1, !1, function() {
				e();
			});
		});
	}
	function F() {
		return Se.apply(this, arguments);
	}
	function Se() {
		return Se = a(function* () {
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
		}), Se.apply(this, arguments);
	}
	function Ce() {
		var e = new Asc.ButtonContextMenu();
		e.text = "Edit citation", e.addCheckers("Target", "Selection"), e.attachOnClick(/*#__PURE__*/ a(function* () {
			var e = yield new Promise((e) => {
				window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
			});
			yield E(!1, "Zotero (" + z("Updating citations") + ")"), yield we(e), yield de(!1, "Zotero (" + z("Updating citations") + ")");
		})), Asc.Buttons.registerContextMenu();
	}
	function we(e) {
		return Te.apply(this, arguments);
	}
	function Te() {
		return Te = a(function* (e) {
			if (!e || !e.Value || e.Value.toLowerCase().indexOf("zotero_item") === -1) return i.showWarningMessage("No Zotero citation found at the cursor. Please click directly on a citation to edit it."), !1;
			var t = yield i.showEditCitationWindow(e);
			if (!t) return !1;
			var n = i.updateItem.bind(i, t), a = r.getStyleManager();
			return a.getLastUsedFormat() === "note" && (n = i.updateItem.bind(i, t, a.getLastUsedNotesStyle())), n().then(() => (e && i.moveCursorOutsideField(e.FieldId), !0)).catch(function(e) {
				console.error(e);
				var t = z("Failed to insert citation");
				return typeof e == "string" && (t += ". " + z(e)), w(t), !1;
			});
		}), Te.apply(this, arguments);
	}
})();
//#endregion

//# sourceMappingURL=bundle.modern.js.map