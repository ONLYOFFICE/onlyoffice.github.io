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
//#region src/app/theme.js
var e = {
	addStylesForComponents: function(e) {
		let t = "";
		e["background-toolbar"] && (t += ".loader-body,\n.loader-bg { background-color: " + e["background-toolbar"] + "; }\n", t += ".loader-body {     box-shadow: 0 0 99px 99px " + e["background-toolbar"] + "; }\n"), e["background-loader"] && (t += ".loader-image { color: " + e["background-loader"] + "; }\n"), e["background-normal"] && (t += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n#previewWrapper, \n.message { background-color: " + e["background-normal"] + "; }\n"), e["text-inverse"] && (t += ".custom-button-primary { color: " + e["text-inverse"] + "; }\n"), e["border-regular-control"] && (t += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n#previewWrapper,\n.message { border-color: " + e["border-regular-control"] + "; }\n", t += ".selectbox-search,\n.selectbox-option-divider { border-color: " + e["border-regular-control"] + " !important; }\n"), e["border-error"] && (t += ".input-field-invalid .input-field-element { border-color: " + e["border-error"] + "; }\n"), e["border-control-focus"] && (t += ".custom-button-icon-only:focus:not(:active):not(:hover),\n.custom-button-secondary-icon:focus:not(:active):not(:hover),\n.custom-button-secondary:focus:not(:active):not(:hover),\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus,\n.selectbox-header-open { border-color: " + e["border-control-focus"] + "; }\n"), e["highlight-button-hover"] && (t += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + e["highlight-button-hover"] + "; }\n"), e["highlight-button-pressed"] && (t += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + e["highlight-button-pressed"] + "; }\n", t += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + e["highlight-button-pressed"] + "; }\n"), e["highlight-primary-dialog-button-hover"] && (t += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + e["highlight-primary-dialog-button-hover"] + "; border-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n"), e["background-primary-dialog-button"] && (t += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + e["background-primary-dialog-button"] + "; border-color: " + e["background-primary-dialog-button"] + "; }\n"), e["background-toolbar-additional"] && (t += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + e["background-toolbar-additional"] + "; border-color: " + e["background-toolbar-additional"] + "; }\n"), e["text-normal"] && (t += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + e["text-normal"] + "; }\n", t += ".input-field-search-icon svg { fill: " + e["text-normal"] + "; }\n", t += ".selectbox-arrow b { border-color: " + e["text-normal"] + "; }\n"), e["text-secondary"] && (t += ".message-close:hover,\n.input-field-clear:hover { color: " + e["text-secondary"] + "; }\n"), e["text-tertiary"] && (t += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + e["text-tertiary"] + "; }\n");
		let n = "11px";
		["theme-white", "theme-night"].indexOf(e.name) !== -1 || ["theme-white", "theme-night"].indexOf(e.Name) !== -1 ? (n = "12px", t += ".message,\n#previewWrapper,\n.custom-button,\n.selectbox-header,\n.input-field-element { border-radius: 4px; }\n", t += ".radio--checked .radio-visual { border-width: 4px; }\n", t += ".checkbox-checkmark { color: " + e["text-inverse"] + "; }\n", t += ".checkbox--checked .checkbox-visual { background-color: " + e["background-primary-dialog-button"] + "; }\n", t += ".radio--checked .radio-visual,\n.checkbox--checked .checkbox-visual { border-color: " + e["background-primary-dialog-button"] + "; }\n", t += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + e["highlight-button-hover"] + "; }\n", t += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + e["highlight-primary-dialog-button-hover"] + "; background-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n", t += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n", t += "body { font-size: 12px; }\n") : (t += ".checkbox-checkmark { color: " + e["text-normal"] + "; }\n", t += ".radio--checked .radio-visual { background-color: " + e["text-normal"] + ";\n box-shadow: 0 0 0 2px" + e["background-normal"] + " inset; }\n", t += ".radio-button-container:hover .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + e["border-control-focus"] + "; }\n"), t += "body, input, textarea, select, button { font-size: " + n + "; }\n";
		let r = document.getElementById("componentsStyles");
		return r ? (r.innerHTML = t, t) : (r = document.createElement("style"), r.id = "componentsStyles", r.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(r), t);
	},
	fixThemeForIE: function(e) {
		return e["background-toolbar"] ||= "#f7f7f7", e["text-normal"] ||= "rgb(51, 51, 51)", e["text-secondary"] ||= "#848484", e["highlight-button-hover"] ||= "#e0e0e0", e["background-normal"] ||= "white", e["background-loader"] ||= "rgba(24, 24, 24, 0.9)", e["highlight-button-pressed"] ||= "#cbcbcb", e["text-inverse"] ||= "white", e["border-regular-control"] ||= "#c0c0c0", e["border-error"] ||= "#f62211", e["border-control-focus"] ||= "#848484", e["highlight-primary-dialog-button-hover"] ||= "#1c1c1c", e["background-primary-dialog-button"] ||= "#444444", e["background-toolbar-additional"] ||= "#efefef", e["text-tertiary"] ||= "#bdbdbd", e;
	}
};
//#endregion
//#region src/app/router.js
function t() {
	this._states = [
		"mainState",
		"loginState",
		"settingsState"
	], this._routes = [
		"main",
		"login",
		"settings"
	], this._currentRoute = "login", this._currentRouteIndex = 1, this._containers = this._states.map(function(e) {
		let t = document.getElementById(e);
		if (!t) throw Error(`container ${e} not found`);
		return t;
	});
}
t.prototype.getRoute = function() {
	return this._currentRoute;
}, t.prototype._setCurrentRoute = function(e) {
	this._containers[this._currentRouteIndex].classList.add("hidden"), this._currentRoute = e, this._currentRouteIndex = this._routes.indexOf(e), this._containers[this._currentRouteIndex].classList.remove("hidden");
}, t.prototype.openMain = function() {
	this._setCurrentRoute("main");
}, t.prototype.openLogin = function() {
	this._setCurrentRoute("login");
}, t.prototype.openSettings = function() {
	this._setCurrentRoute("settings");
};
//#endregion
//#region src/app/zotero/zotero-environment.js
var n = {
	restApiUrl: "https://api.zotero.org/",
	desktopApiUrl: "http://127.0.0.1:23119/api/"
}, r = {
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
		let e = window.document.currentScript ? window.document.currentScript.getAttribute("src") : "";
		return !!(e && e.indexOf("file:///") == 0);
	}(),
	runApisChecker: function(e) {
		let t = this;
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
		let t = this;
		return Promise.all([fetch(n.restApiUrl, {
			method: "GET",
			cache: "no-cache"
		}).then(function(e) {
			return e.status === 200;
		}).catch(function() {
			return !1;
		}), t._sendDesktopRequest(n.desktopApiUrl).then(function(e) {
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
		let t = this;
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
					let t = !1, r = !1;
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
}, i = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	constructor(e = {}) {
		this.#e = e.maxRetries || 5, this.#t = e.initialDelay || 1e3, this.#n = e.maxDelay || 5e3, this.#r = e.backoffFactor || 2, this.#i = e.retryOn || [
			429,
			502,
			503,
			504
		], this.#a = 10, this.#o = 5e3, this.#s = [], this.#c = 0, this.#l = 0;
	}
	async fetchWithRetry(e, t, n) {
		try {
			await this.#d();
			let r = await fetch(e, { headers: t });
			if (r.ok) return r;
			if (this.#i.includes(r.status) && n < this.#e) {
				let i = this.#f(n, r);
				return console.log(`Attempt ${n + 1}/${this.#e} failed with ${r.status}. Retrying in ${i}ms`), await this.#p(i), this.fetchWithRetry(e, t, n + 1);
			}
			throw Error(`${r.status} ${r.statusText}`);
		} catch (r) {
			if (n >= this.#e) {
				let e = "";
				throw r instanceof Error && (e = r.message), Error(`Request failed after ${this.#e} attempts: ${e}`);
			}
			if (n < this.#e) {
				let r = this.#f(n);
				return console.log(`Network error on attempt ${n + 1}. Retrying in ${r}ms`), await this.#p(r), this.fetchWithRetry(e, t, n + 1);
			}
			throw r;
		}
	}
	resetCounter() {
		this.#s = [], this.#c = 0, this.#l = 0;
	}
	#u() {
		let e = Date.now();
		this.#s = this.#s.filter((t) => e - t < this.#o);
	}
	async #d() {
		if (this.#u(), this.#s.length >= this.#a) {
			let e = this.#s[0];
			if (Date.now() - e < this.#o) {
				let e = 500 * this.#s.length - this.#a;
				e < 0 && (e = 0, console.warn("Wait time is less than 0")), console.log(`Rate limit prevention: ${this.#s.length} requests in last ${this.#o}ms. Waiting ${e}ms...`), await this.#p(e), this.#u();
			}
		}
		this.#s.push(Date.now()), this.#c++;
		let e = Date.now() - this.#l;
		e < 100 && this.#l > 0 && await this.#p(100 - e), this.#l = Date.now();
	}
	#f(e, t = null) {
		let n = t?.headers.get("Retry-After");
		if (n) {
			let e = parseInt(n);
			if (e > 86400) {
				let e = parseInt(n) * 1e3;
				return Math.max(0, e - Date.now());
			}
			return e * 1e3;
		}
		let r = this.#t * this.#r ** +e, i = Math.random() * 1e3;
		return Math.min(r + i, this.#n);
	}
	#p(e) {
		return new Promise((t) => setTimeout(t, e));
	}
}, a = function() {
	this._apiKey = null, this._userId = 0, this._userGroups = [], this._isOnlineAvailable = !0, this._fetcher = new i({
		maxRetries: 5,
		initialDelay: 5e3
	});
};
a.prototype.ZOTERO_API_VERSION = "3", a.prototype.USER_AGENT = "AscDesktopEditor", a.prototype.DEFAULT_FORMAT = "csljson", a.prototype.STORAGE_KEYS = {
	USER_ID: "zoteroUserId",
	API_KEY: "zoteroApiKey"
}, a.prototype.API_PATHS = {
	USERS: "users",
	GROUPS: "groups",
	ITEMS: "items",
	KEYS: "keys"
}, a.prototype._getBaseUrl = function() {
	return this._isOnlineAvailable ? n.restApiUrl : n.desktopApiUrl;
}, a.prototype._getDesktopRequest = function(e) {
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
}, a.prototype._getOnlineRequest = function(e) {
	let t = {
		"Zotero-API-Version": this.ZOTERO_API_VERSION,
		"Zotero-API-Key": this._apiKey || ""
	};
	return fetch(e, { headers: t }).then(function(e) {
		if (!e.ok) {
			let t = e.status + " " + e.statusText;
			throw console.error(t), Error(t);
		}
		return e;
	}).catch(function(e) {
		throw typeof e == "object" && (e.message = "Connection to Zotero failed"), e;
	});
}, a.prototype._getRequestWithOfflineSupport = function(e) {
	return this._isOnlineAvailable ? this._getOnlineRequest(e) : this._getDesktopRequest(e.href);
}, a.prototype._buildGetRequest = function(e, t) {
	t ||= {};
	var n = new URL(e, this._getBaseUrl());
	return Object.keys(t).forEach(function(e) {
		t[e] !== void 0 && t[e] !== null && n.searchParams.append(e, t[e]);
	}), this._getRequestWithOfflineSupport(n);
}, a.prototype._parseLinkHeader = function(e) {
	var t = {}, n = /<(.*?)>; rel="(.*?)"/g;
	if (!e) return t;
	for (var r; (r = n.exec(e.trim())) !== null;) t[r[2]] = r[1];
	return t;
}, a.prototype._parseDesktopItemsResponse = function(e, t) {
	return e.then(function(e) {
		return {
			items: JSON.parse(e.responseText),
			id: t
		};
	});
}, a.prototype._parseItemsResponse = function(e, t) {
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
}, a.prototype._parseResponse = function(e, t) {
	if (this._isOnlineAvailable) {
		let n = e;
		return this._parseItemsResponse(n, t);
	}
	{
		let n = e;
		return this._parseDesktopItemsResponse(n, t);
	}
}, a.prototype.getItems = function(e, t, n) {
	var r = this;
	n ||= r.DEFAULT_FORMAT;
	let i = {
		format: n,
		itemType: "-attachment"
	};
	e ? i.q = e : t ? i.itemKey = t.join(",") : (i.limit = 20, this._isOnlineAvailable || (i.format = "json"));
	var a = r.API_PATHS.USERS + "/" + r._userId + "/" + r.API_PATHS.ITEMS, o = r._buildGetRequest(a, i);
	return r._parseResponse(o, r._userId);
}, a.prototype.getGroupItems = function(e, t, n, r) {
	var i = this;
	r ||= i.DEFAULT_FORMAT;
	var a = { format: r };
	e ? a.q = e : n && (a.itemKey = n.join(","));
	var o = i.API_PATHS.GROUPS + "/" + t + "/" + i.API_PATHS.ITEMS, s = i._buildGetRequest(o, a);
	return i._parseResponse(s, t);
}, a.prototype.getUserGroups = function() {
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
}, a.prototype.setApiKey = function(e) {
	var t = this, n = this.API_PATHS.KEYS + "/" + e;
	return this._buildGetRequest(n).then(function(e) {
		var t = e;
		if (!t.ok) throw Error(t.status + " " + t.statusText);
		return t.json();
	}).then(function(n) {
		return t._saveSettings(n.userID, e), !0;
	});
}, a.prototype._applySettings = function(e, t) {
	this._userId = e, this._apiKey = t;
}, a.prototype._saveSettings = function(e, t) {
	this._applySettings(e, t), localStorage.setItem(this.STORAGE_KEYS.USER_ID, String(e)), localStorage.setItem(this.STORAGE_KEYS.API_KEY, t);
}, a.prototype.hasSettings = function() {
	var e = localStorage.getItem(this.STORAGE_KEYS.USER_ID), t = localStorage.getItem(this.STORAGE_KEYS.API_KEY);
	return e && t ? (this._applySettings(Number(e), t), !0) : !1;
}, a.prototype.clearSettings = function() {
	localStorage.removeItem(this.STORAGE_KEYS.USER_ID), localStorage.removeItem(this.STORAGE_KEYS.API_KEY), this._userGroups = [], this._userId = 0, this._apiKey = null;
}, a.prototype.getUserId = function() {
	return this._userId;
}, a.prototype.setIsOnlineAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/shared/components/input.js
function o(e, t) {
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
		showClear: t.showClear === void 0 || t.showClear,
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
o.prototype = {
	constructor: o,
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
		e = e === void 0 || e, this.setValue(""), e && this.input.focus();
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
function s(e, t) {
	if (typeof e == "string") {
		var n = document.getElementById(e);
		n instanceof HTMLElement && (e = n);
	}
	if (e instanceof HTMLElement) this.container = e;
	else throw Error("Invalid container element");
	this._options = Object.assign(this._options, t), this._isShow = !1;
}
s.prototype = {
	constructor: s,
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
		let t = this._options.title;
		if (!t) switch (t = "Error", this._options.type) {
			case "success":
				t = "Success";
				break;
			case "warning":
				t = "Warning";
				break;
			case "info": t = "Information";
		}
		let n = this._options.text;
		if (!n) switch (n = "", this._options.type) {
			case "success":
				n = "Operation completed successfully.";
				break;
			case "warning":
				n = "Please be cautious.";
				break;
			case "error": n = "Something went wrong.";
		}
		if (e.innerHTML = "<div class=\"message-content\"><span class=\"message-title\">" + t + "</span><span class=\"message-text\">" + n + "</span></div>", this._options.closeButton) {
			var r = document.createElement("button");
			r.className = "message-close", r.textContent = "×", r.setAttribute("aria-label", "Close"), r.onclick = this.close.bind(this), e.appendChild(r);
		}
		return e;
	},
	addOutsideClickListener: function() {
		this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
		let e = this;
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
		if (this._isShow = !1, this._element && this._element.parentNode) {
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
function c(e, t) {
	let n = this;
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
c.prototype = {
	constructor: c,
	_button: null,
	_buttonText: null,
	_spinner: null,
	_badgeElement: null,
	_createDOM: function() {
		var e = this._button.parentNode, t = document.createDocumentFragment();
		if (t.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = !0), this._options.text) {
			if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
				var n = document.createElement("span");
				n.className = "custom-button-icon", this._options.iconPosition === "left" ? (n.className += " custom-button-icon-left", this._button.appendChild(n), this._button.appendChild(this._buttonText)) : (n.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n)), n.innerHTML = this._options.icon;
			} else this._button.appendChild(this._buttonText);
		}
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
var l = class e {
	static #e = /* @__PURE__ */ new Map();
	#t;
	#n;
	#r;
	#i = null;
	#a;
	#o = /* @__PURE__ */ new Map();
	#s = [];
	constructor(t, n) {
		if (typeof t == "string") {
			let e = document.getElementById(t);
			e instanceof HTMLInputElement && (t = e);
		}
		if (!(t instanceof HTMLInputElement)) throw Error("Invalid input element");
		if (this.#n = t, this.#a = Object.assign({
			id: `radio_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
			checked: !1,
			disabled: !1,
			indeterminate: !1,
			label: "",
			name: "",
			value: "on"
		}, n), this.#c(), this.#t = document.createElement("div"), this.#r = document.createElement("span"), this.#l(), this.#d(), this.#f(), !this.#a.name) throw Error("Name attribute is required");
		let r = e.#e.get(this.#a.name);
		r || (r = [], e.#e.set(this.#a.name, r)), r.push(this);
	}
	#c() {
		this.#n.type = "radio";
		let e = this.#n.getAttribute("id"), t = this.#n.getAttribute("name"), n = this.#n.getAttribute("value"), r = this.#n.getAttribute("checked"), i = this.#n.getAttribute("disabled");
		e === null ? this.#a.id && this.#n.setAttribute("id", this.#a.id) : this.#a.id = e, t === null ? this.#a.name && this.#n.setAttribute("name", this.#a.name) : this.#a.name = t, n === null ? this.#a.value && this.#n.setAttribute("value", this.#a.value) : this.#a.value = n, r === null ? this.#a.checked && this.#n.setAttribute("checked", "true") : this.#a.checked = r === "true", i === null ? this.#a.disabled && this.#n.setAttribute("disabled", "true") : this.#a.disabled = i === "true";
	}
	#l() {
		let e = this.#n.parentNode, t = document.createDocumentFragment();
		t.appendChild(this.#t), this.#t.classList.add("radio-button-container"), this.#t.setAttribute("role", "radio"), this.#t.setAttribute("aria-checked", String(!!this.#a.checked)), this.#t.setAttribute("aria-disabled", String(!!this.#a.disabled)), this.#t.tabIndex = this.#a.disabled ? -1 : 0, this.#r.className = "radio-visual", this.#r.setAttribute("aria-hidden", "true"), this.#a.label && (this.#i = document.createElement("label"), this.#i.className = "i18n radio-label", this.#i.htmlFor = String(this.#a.id), this.#i.textContent = this.#a.label), this.#a.disabled && this.#t.classList.add("radio--disabled"), e && e.insertBefore(t, this.#n), this.#t.appendChild(this.#n), this.#t.appendChild(this.#r), this.#i && this.#t.appendChild(this.#i), this.#u();
	}
	#u() {
		if (this.#a.checked) this.#t.tabIndex = this.#a.disabled ? -1 : 0;
		else if (this.#a.name && e.#e.has(this.#a.name)) {
			let t = e.#e.get(this.#a.name), n = !1;
			t && t.forEach((e) => {
				e.#a.checked && e !== this && (n = !0);
			}), !n && !this.#a.checked && !this.#a.disabled ? this.#t.tabIndex = 0 : this.#t.tabIndex = -1;
		}
	}
	#d() {
		let e = (e) => {
			e.preventDefault(), !this.#a.disabled && !this.#a.checked && (this.check(), this.#t.focus());
		}, t = (e) => {
			if (!this.#a.disabled) switch (e.key) {
				case " ":
				case "Spacebar":
				case "Enter": e.preventDefault(), this.#a.checked || this.check();
			}
		}, n = () => {
			this.#t.classList.add("radio--focused");
		}, r = () => {
			this.#t.classList.remove("radio--focused");
		};
		this.#o.set("click", e), this.#o.set("keydown", t), this.#o.set("focus", n), this.#o.set("blur", r), this.#t.addEventListener("click", e), this.#t.addEventListener("keydown", t), this.#t.addEventListener("focus", n), this.#t.addEventListener("blur", r);
	}
	#f() {
		this.#t.setAttribute("aria-checked", String(!!this.#a.checked)), this.#t.classList.toggle("radio--checked", this.#a.checked), this.#n.checked = !!this.#a.checked, this.#u();
	}
	#p(e) {
		let t = {
			type: "radio:change",
			detail: this.getState()
		};
		e && (t.originalEvent = e), this.#s.forEach(function(e) {
			e(t);
		});
	}
	subscribe(e) {
		var t = this;
		return this.#s.push(e), { unsubscribe: function() {
			t.#s = t.#s.filter(function(t) {
				return t !== e;
			});
		} };
	}
	getElement() {
		return this.#t;
	}
	check(t) {
		if (!(this.#a.disabled || this.#a.checked)) {
			if (this.#a.name) {
				let t = e.#e.get(this.#a.name);
				t && t.forEach((e) => {
					e !== this && e.#a.checked && e.uncheck();
				});
			}
			this.#a.checked = !0, this.#f(), !t && this.#p();
		}
	}
	uncheck(e) {
		!this.#a.disabled && this.#a.checked && (this.#a.checked = !1, this.#f(), !e && this.#p());
	}
	enable() {
		this.#a.disabled && (this.#a.disabled = !1, this.#n.disabled = !1, this.#t.setAttribute("aria-disabled", "false"), this.#a.checked ? this.#t.tabIndex = 0 : this.#u(), this.#t.classList.remove("radio--disabled"));
	}
	disable() {
		this.#a.disabled || (this.#a.disabled = !0, this.#n.disabled = !0, this.#t.setAttribute("aria-disabled", "true"), this.#t.tabIndex = -1, this.#t.classList.add("radio--disabled"));
	}
	setLabel(e) {
		this.#a.label = e, this.#i ? this.#i.textContent = e : e && (this.#i = document.createElement("label"), this.#i.className = "radio-label", this.#i.htmlFor = String(this.#a.id), this.#i.textContent = e, this.#t.appendChild(this.#i));
	}
	getState() {
		return {
			checked: !!this.#a.checked,
			disabled: !!this.#a.disabled,
			value: this.#a.value || "",
			name: this.#a.name || ""
		};
	}
	destroy() {
		if (this.#s = [], !this.#a.name) return;
		let t = e.#e.get(this.#a.name);
		if (t) {
			let e = t.indexOf(this);
			e >= 0 && t.splice(e, 1);
		}
		this.#o.forEach((e, t) => {
			this.#t.removeEventListener(t, e);
		}), this.#o.clear(), this.#t && this.#t.parentNode && this.#t.parentNode.removeChild(this.#t), this.#i = null;
	}
};
//#endregion
//#region src/app/shared/components/checkbox.js
function u(e, t) {
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
u.prototype = {
	constructor: u,
	_container: null,
	_input: null,
	_visualCheckbox: null,
	_labelElement: null,
	_createDOM: function(e) {
		var t = e.parentNode, n = document.createDocumentFragment();
		this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = e;
		let r = this._input.getAttribute("id");
		r === null ? this._options.id && this._input.setAttribute("id", this._options.id) : this._options.id = r, this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = !0), this._options.indeterminate && (this._input.indeterminate = !0), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
		let i = "http://www.w3.org/2000/svg", a = document.createElementNS(i, "svg");
		a.setAttribute("viewBox", "0 0 10 8"), a.setAttribute("class", "checkbox-checkmark");
		let o = document.createElementNS(i, "path");
		o.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), o.setAttribute("fill", "none"), o.setAttribute("stroke", "currentColor"), o.setAttribute("stroke-width", "2"), a.appendChild(o), this._visualCheckbox.appendChild(a);
		let s = document.createElement("span");
		if (s.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(s), this._options.label) this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
		else {
			let e = document.querySelector("label[for='" + this._options.id + "']");
			e instanceof HTMLLabelElement && (this._labelElement = e);
		}
		this._options.disabled && this._container.classList.add("checkbox--disabled"), t && t.insertBefore(n, e), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
	},
	_setupEventListeners: function() {
		let e = this;
		if (!this._container) return;
		let t = function(t) {
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
				case "ArrowUp": t.preventDefault(), (e._options.checked || e._options.indeterminate) && (e._options.indeterminate ? e.uncheck() : e.setIndeterminate());
			}
		}, r = function() {
			e._container && e._container.classList.add("checkbox--focused");
		}, i = function() {
			e._container && e._container.classList.remove("checkbox--focused");
		};
		this._handlers.set("click", t), this._handlers.set("keydown", n), this._handlers.set("focus", r), this._handlers.set("blur", i), this._container.addEventListener("click", t), this._container.addEventListener("keydown", n), this._container.addEventListener("focus", r), this._container.addEventListener("blur", i);
	},
	_updateVisualState: function() {
		this._container && this._input && (this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked)), this._container.classList.toggle("checkbox--checked", this._options.checked), this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate), this._input.checked = !!this._options.checked, this._input.indeterminate = !!this._options.indeterminate);
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
		this._options.disabled && this._container && this._input && (this._options.disabled = !1, this._input.disabled = !1, this._container.setAttribute("aria-disabled", "false"), this._container.tabIndex = 0, this._container.classList.remove("checkbox--disabled"));
	},
	disable: function() {
		!this._options.disabled && this._container && this._input && (this._options.disabled = !0, this._input.disabled = !0, this._container.setAttribute("aria-disabled", "true"), this._container.tabIndex = -1, this._container.classList.add("checkbox--disabled"));
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
		let t = {
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
var d = class e {
	static #e = /* @__PURE__ */ new Set();
	constructor(t, n) {
		if (typeof t == "string") {
			let e = document.getElementById(t);
			if (e instanceof HTMLSelectElement) t = e;
			else if (e instanceof HTMLElement) this._container = e;
			else throw Error("Invalid selectbox");
		} else t instanceof HTMLElement && (this._container = t);
		if (t instanceof HTMLSelectElement) this._selectbox = t, this._container = document.createElement("div");
		else if (!(this._container instanceof HTMLElement)) throw Error("Invalid container");
		this._options = Object.assign(n, {
			placeholder: n.placeholder || "Select...",
			searchable: n.searchable || !1,
			sortable: n.sortable || !1,
			translate: n.translate,
			multiple: n.multiple || !1,
			usePortal: n.usePortal || !1,
			description: n.description || ""
		}), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = !1, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = {
			toggle: (e) => {
				this.#r(e);
			},
			search: (e) => {
				this.#a(e);
			},
			close: (e) => {
				e.target instanceof HTMLElement && !this._container.contains(e.target) && !e.target.classList.contains("selectbox-option") && this.#i();
			},
			keydown: (e) => {
				this.#s(e);
			},
			dropdownClick: (e) => {
				this.#l(e);
			},
			scrollCheck: () => {
				if (!this._headerRectOnOpen) return;
				let e = this._header.getBoundingClientRect();
				Math.abs(e.top - this._headerRectOnOpen.top) > 1 && this.#i();
			}
		}, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), this.#t(), this.#n(), this.#c(), e.#e.add(this);
	}
	#t() {
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
			let e = this._selectbox.parentNode;
			if (e) {
				e.insertBefore(this._container, this._selectbox);
				let t = this.#m(this._selectbox);
				this.addItems(t.values, t.selectedValue), this._selectbox.remove();
			}
		}
	}
	#n() {
		this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
			e.stopPropagation();
		}), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
	}
	#r(t) {
		if (t && t.stopPropagation(), this.isOpen ? this.#i() : this.openDropdown(), t && t.type === "click") for (let t of e.#e) t.isOpen && t !== this && t.#i();
	}
	openDropdown() {
		this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._headerRectOnOpen = this._header.getBoundingClientRect(), document.addEventListener("scroll", this._boundHandles.scrollCheck, !0), this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(function(e) {
			return function() {
				e.searchInput && e.searchInput.focus();
			};
		}(this), 100), this.#c(), this.#d();
	}
	#i() {
		this.isOpen && document && this._boundHandles && (document.removeEventListener("click", this._boundHandles.close), document.removeEventListener("scroll", this._boundHandles.scrollCheck, !0)), this.isOpen = !1, this._dropdown.style.display = "none", this._options.usePortal ? (this._dropdown.style.left = "", this._dropdown.style.width = "", this._dropdown.style.top = "") : this._dropdown.classList.remove("selectbox-dropdown-top");
		for (var e = this._arrow.className.split(" "), t = [], n = 0; n < e.length; n++) e[n] !== "selectbox-arrow-open" && t.push(e[n]);
		this._arrow.className = t.join(" ");
		for (var r = this._header.className.split(" "), i = [], n = 0; n < r.length; n++) r[n] !== "selectbox-header-open" && i.push(r[n]);
		this._header.className = i.join(" "), this.searchInput && (this.searchInput.value = "");
	}
	#a(e) {
		var t = e.target;
		if (t instanceof HTMLInputElement) {
			var n = t.value.toLowerCase();
			this.#c(n);
		}
	}
	#o(e) {
		let t = this.searchInput ? this.searchInput.value.toLowerCase() : "", n, r = this._items.filter(function(e) {
			return e !== null;
		});
		if (t && (r = r.filter(function(e) {
			return e.text.toLowerCase().indexOf(t) !== -1;
		})), r.length !== 0) {
			if (e === "up") {
				if (this._selectedValues.size === 0 && r.length > 0) n = r[r.length - 1], this._selectedValues.add(n.value);
				else {
					for (var i = Array.from(this._selectedValues), a = -1, o = 0; o < r.length; o++) if (r[o].value === i[0]) {
						a = o;
						break;
					}
					var s = (a - 1 + r.length) % r.length;
					this._selectedValues.clear(), n = r[s], this._selectedValues.add(n.value);
				}
			} else if (this._selectedValues.size === 0 && r.length > 0) n = r[0], this._selectedValues.add(n.value);
			else {
				for (var i = Array.from(this._selectedValues), a = -1, o = 0; o < r.length; o++) if (r[o].value === i[0]) {
					a = o;
					break;
				}
				var c = (a + 1) % r.length;
				c === r.length && (c = 0), this._selectedValues.clear(), n = r[c], this._selectedValues.add(n.value);
			}
			this.#u(), this.#c(t, !0), this.#f(n.value, !0);
		}
	}
	#s(e) {
		switch (e.key || e.keyCode) {
			case "Enter":
			case 13:
				e.preventDefault(), this.#r(e);
				break;
			case "Escape":
			case 27:
				this.#i();
				break;
			case "ArrowDown":
			case 40:
				e.preventDefault(), this.#o("down");
				break;
			case "ArrowUp":
			case 38:
				e.preventDefault(), this.#o("up");
				break;
			case "Tab":
			case 9: this.#i();
		}
	}
	#c(e, t) {
		if (e ||= "", this._optionsContainer) {
			this._optionsContainer.innerHTML = "";
			var n = null, r = this._items;
			e && (r = r.filter(function(t) {
				return t !== null && t.text.toLowerCase().indexOf(e) !== -1;
			}));
			for (var i = document.createDocumentFragment(), a = 0; a < r.length; a++) {
				let e = r[a];
				if (!e) {
					let e = document.createElement("hr");
					e.className += " selectbox-option-divider", i.appendChild(e);
					continue;
				}
				let t = document.createElement("div");
				t.className += " selectbox-option", this._selectedValues.has(e.value) && (t.className += " selectbox-option-selected checkbox--checked", n = t), t.setAttribute("data-value", e.value);
				let o = document.createElement("label");
				if (o.className += " selectbox-option-text i18n", this._options.translate && (e.text = this._options.translate(e.text)), o.textContent = e.text, this._options.multiple) {
					t.className += " selectbox-option-checkbox";
					let n = document.createElement("input");
					n.type = "checkbox", n.id = "checkbox-" + e.value, n.className += " selectbox-checkbox", n.checked = this._selectedValues.has(e.value), t.appendChild(n);
					let r = document.createElement("span");
					r.className = "checkbox-visual", r.setAttribute("aria-hidden", "true");
					let i = "http://www.w3.org/2000/svg", a = document.createElementNS(i, "svg");
					a.setAttribute("viewBox", "0 0 10 8"), a.setAttribute("class", "checkbox-checkmark");
					let o = document.createElementNS(i, "path");
					o.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), o.setAttribute("fill", "none"), o.setAttribute("stroke", "currentColor"), o.setAttribute("stroke-width", "2"), a.appendChild(o), r.appendChild(a), t.appendChild(r);
				}
				t.appendChild(o), i.appendChild(t);
			}
			if (this._customItems.length) {
				let e = document.createElement("hr");
				e.className += " selectbox-option-divider", i.appendChild(e);
			}
			for (var a = 0; a < this._customItems.length; a++) {
				let e = this._customItems[a], t = document.createElement("label");
				t.className += " selectbox-custom-option", t.setAttribute("data-value", e.value), t.setAttribute("for", e.value);
				var o = document.createElement("span");
				o.className += " selectbox-option-text i18n", this._options.translate && (e.text = this._options.translate(e.text)), o.textContent = e.text, t.appendChild(o), i.appendChild(t);
			}
			if (this._optionsContainer.appendChild(i), t && this.isOpen && this._optionsContainer && n) try {
				n.scrollIntoView && n.scrollIntoView({ block: "nearest" });
			} catch (e) {
				console.error(e);
			}
		}
	}
	#l(e) {
		var t = e.target || e.srcElement, n = null;
		if (t && t instanceof HTMLElement) {
			for (var r = null, i = t.className.split(" "), a = !1, o = 0; o < i.length; o++) if (i[o] === "selectbox-option") {
				a = !0;
				break;
			} else if (i[o] === "selectbox-custom-option") {
				let n = t.getAttribute("data-value");
				if (n) {
					e.stopPropagation(), this.#p(n), this.#i();
					return;
				}
				break;
			}
			if (a) r = t;
			else if (t.parentNode && t.parentNode instanceof HTMLElement) {
				for (var s = t.parentNode.className.split(" "), c = !1, o = 0; o < s.length; o++) if (s[o] === "selectbox-option") {
					c = !0;
					break;
				} else if (s[o] === "selectbox-custom-option") {
					let n = t.parentNode.getAttribute("data-value");
					if (n) {
						e.stopPropagation(), this.#p(n), this.#i();
						return;
					}
					break;
				}
				c && (r = t.parentNode);
			}
			if (r instanceof HTMLDivElement) n = r;
			else return;
		} else return;
		var l = n.getAttribute("data-value");
		if (l === null) return;
		let u = !0;
		this._options.multiple ? this._selectedValues.has(l) ? (this.unselectItems(l, !0), u = !1) : this.selectItems(l, !0) : (this.selectItems(l, !0), this.#i()), this.#u(), this.#f(l, u);
	}
	#u() {
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
	#d() {
		let e = window.innerHeight;
		if (this._options.usePortal) {
			let t = this._header.getBoundingClientRect(), n = this._dropdown.offsetHeight;
			this._dropdown.style.left = t.left + "px", this._dropdown.style.width = t.width - 2 + "px";
			let r = e - t.bottom;
			r < n && t.top > r ? this._dropdown.style.top = t.top - n - 2 + "px" : this._dropdown.style.top = t.bottom + 2 + "px";
		} else this._dropdown.getBoundingClientRect().bottom > e && this._dropdown.classList.add("selectbox-dropdown-top");
	}
	#f(e, t) {
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
	#p(e) {
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
	#m(e) {
		let t = { values: Array.from(e.options).map((e) => [e.value, e.text]) }, n = e.value;
		return n && (t.selectedValue = n), t;
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
			let t = this._items.find((t) => t && t.value === e);
			t && (t.selected = n);
		} else this._items.push({
			value: e,
			text: t,
			selected: n
		}), this._options.sortable && this._items.sort((e, t) => e && t ? e.text.localeCompare(t.text) : e ? -1 : +!!t);
		n && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(e)), this.#u();
	}
	addItems(e, t) {
		let n = this;
		e.forEach(function(e, r) {
			if (n._items.some((t) => t && t.value === e[0])) return;
			let i = t ? e[0] === t : r === 0;
			i && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(e[0])), n._items.push({
				value: e[0],
				text: e[1],
				selected: i
			});
		}, this), this.isOpen && this.#c(), this.#u();
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
		}), this._selectedValues.delete(e), this.#u();
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
		let n = this;
		if (!this._options.multiple && Array.isArray(e)) {
			console.error("Method selectItem is only available for multi-select boxes.");
			return;
		}
		let r = "";
		if (this._options.multiple) {
			let t = function(e) {
				if (n._optionsContainer) {
					let t = n._optionsContainer.querySelector("[data-value=\"" + e + "\"]");
					if (t) {
						let e = t.querySelector("input[type=\"checkbox\"]");
						e && e instanceof HTMLInputElement && (e.checked = !0), t.classList.add("selectbox-option-selected"), t.classList.add("checkbox--checked");
					}
				}
			};
			if (Array.isArray(e)) for (var i = 0; i < e.length; i++) r = e[i], this._selectedValues.has(r) || (this._selectedValues.add(r), t(r));
			else r = e, this._selectedValues.has(r) || (this._selectedValues.add(r), t(r));
		} else if (!Array.isArray(e)) {
			if (r = e, this._selectedValues.clear(), this._selectedValues.add(r), this._optionsContainer) {
				this._optionsContainer.querySelectorAll(".selectbox-option-selected[data-value=\"" + r + "\"]").forEach(function(e) {
					e.classList.remove("selectbox-option-selected"), e.classList.remove("checkbox--checked");
				});
				let e = this._optionsContainer.querySelector("[data-value=\"" + r + "\"]");
				e && (e.classList.add("selectbox-option-selected"), e.classList.add("checkbox--checked"));
			}
			this.#i();
		}
		this.#u(), !t && this.#f(r, !0);
	}
	unselectItems(e, t) {
		let n = this;
		if (!this._options.multiple) {
			console.error("Method unselectItem is only available for multi-select boxes.");
			return;
		}
		let r = "", i = function(e) {
			if (n._optionsContainer) {
				let t = n._optionsContainer.querySelector("[data-value=\"" + e + "\"]");
				if (t) {
					let e = t.querySelector("input[type=\"checkbox\"]");
					e && e instanceof HTMLInputElement && (e.checked = !1), t.classList.remove("selectbox-option-selected"), t.classList.remove("checkbox--checked");
				}
			}
		};
		if (Array.isArray(e)) for (var a = 0; a < e.length; a++) r = e[a], this._selectedValues.has(r) && (this._selectedValues.delete(r), i(r));
		else r = e, this._selectedValues.has(r) && (this._selectedValues.delete(r), i(r));
		this.#u(), !t && this.#f(r, !0);
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
		this.#u(), this.#c();
	}
	destroy() {
		this._subscribers = [], e.#e.delete(this);
		try {
			this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
		} catch (e) {
			console.error(e);
		}
		this._container.innerHTML = "";
		for (var t = this._container.className.split(" "), n = [], r = 0; r < t.length; r++) t[r] !== "selectbox-container" && n.push(t[r]);
		this._container.className = n.join(" ");
	}
}, f = class {
	static #e = document.getElementById("loader");
	#t;
	constructor(e, t) {
		let n = document.getElementById(e);
		if (!(n instanceof HTMLElement)) throw Error("Invalid container");
		this.#t = n, this.#n(t);
	}
	#n(e) {
		this.#t.classList.add("loader-container");
		let t = "http://www.w3.org/2000/svg", n = document.createElementNS(t, "svg");
		n.classList.add("loader-image"), n.setAttribute("viewBox", "0 0 20 20");
		let r = document.createElementNS(t, "circle");
		r.setAttribute("cx", "10"), r.setAttribute("cy", "10"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "1.5"), r.setAttribute("r", "7.25"), r.setAttribute("stroke-dasharray", "160%, 40%"), n.appendChild(r), this.#t.appendChild(n);
		let i = document.createElement("div");
		i.classList.add("loader-title"), i.classList.add("i18n"), i.innerText = e, this.#t.appendChild(i);
	}
	show() {
		this.#t?.classList.remove("hidden");
	}
	hide() {
		this.#t?.classList.add("hidden");
	}
	static show() {
		this.#e?.classList.remove("hidden");
	}
	static hide() {
		this.#e?.classList.add("hidden");
	}
};
//#endregion
//#region src/app/services/translate-service.js
function p(e) {
	try {
		return window.Asc.plugin.tr(e);
	} catch (t) {
		return console.error(t), e;
	}
}
//#endregion
//#region src/app/services/csl-html-parser.js
var m = class e {
	static #e = /* @__PURE__ */ new Set([
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
	]);
	static #t = /* @__PURE__ */ new Set([
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
	]);
	static #n(t) {
		let n = /^\s*(javascript|vbscript|data)\s*:/i;
		for (let r of Array.from(t.attributes)) {
			let i = r.name.toLowerCase(), a = r.value || "";
			if (i.startsWith("on")) {
				t.removeAttribute(r.name);
				continue;
			}
			if (e.#t.has(i)) {
				let e = a.replace(/[\u0000-\u001F\u007F]/g, "");
				if (n.test(e)) {
					t.removeAttribute(r.name);
					continue;
				}
			}
			i === "style" && /expression\s*\(|javascript\s*:/i.test(a) && t.removeAttribute(r.name);
		}
	}
	static purifyHtml(t) {
		if (typeof t != "string" || t.length === 0) return "";
		let n = this.#e, r = new DOMParser().parseFromString("<div id=\"__purify_root__\">" + t + "</div>", "text/html").getElementById("__purify_root__");
		if (!r) return "";
		let i = (e) => {
			let t = e.parentNode;
			if (t) {
				for (; e.firstChild;) t.insertBefore(e.firstChild, e);
				t.removeChild(e);
			}
		}, a = Array.from(r.getElementsByTagName("*"));
		for (let t of a) {
			let r = t.tagName.toLowerCase();
			n.has(r) ? e.#n(t) : i(t);
		}
		return r.innerHTML;
	}
	static parseHtmlFormatting(e) {
		let t = {
			text: "",
			formatting: []
		}, n = [], r = 0, i = 0;
		for (; i < e.length;) if (e[i] === "<" && i + 1 < e.length) {
			let a = e[i + 1] === "/", o = e.indexOf(">", i);
			if (o === -1) {
				t.text += e[i], i++;
				continue;
			}
			let s = e.substring(a ? i + 2 : i + 1, o).trim(), c = s.split(" ");
			if (c.length === 0) {
				t.text += e[i], i++;
				continue;
			}
			let l = c[0].toLowerCase();
			if (l === "br") {
				t.text += "\n", i = o + 1;
				continue;
			}
			let u = l;
			if (s.indexOf("font-variant:small-caps") === -1 ? s.indexOf("text-decoration:underline") !== -1 && (u = "u") : u = "sc", this.#e.has(l)) {
				if (a) {
					for (let e = n.length - 1; e >= 0; e--) if (n[e].tag === l) {
						let { start: i, styleTag: a } = n.splice(e, 1)[0];
						t.formatting.push({
							type: a,
							start: i,
							end: r
						});
						break;
					}
				} else n.push({
					tag: l,
					start: r,
					styleTag: u
				});
			}
			i = o + 1;
		} else t.text += e[i], r++, i++;
		return t.formatting.sort((e, t) => e.start === t.start ? t.end - e.end : e.start - t.start), t;
	}
}, h = class {
	static formatAfterInsert(e) {
		return new Promise(function(t) {
			Asc.scope.formatting = e, Asc.plugin.callCommand(function() {
				let e = Api.GetDocument().GetCurrentRun();
				for (let t = Asc.scope.formatting.length - 1; t >= 0; t--) {
					let n = Asc.scope.formatting[t], r = e.GetRange(n.start, n.end);
					r && (n.type === "sup" ? r.SetVertAlign("superscript") : n.type === "sub" ? r.SetVertAlign("subscript") : n.type === "sc" ? r.SetSmallCaps(!0) : n.type === "u" ? r.SetUnderline(!0) : n.type === "b" ? r.SetBold(!0) : (n.type === "i" || n.type === "em") && r.SetItalic(!0));
				}
			}, !1, !0, t);
		});
	}
	static formatAfterUpdate(e, t) {
		return Asc.scope.fieldId = e, Asc.scope.text = t.text, Asc.scope.formatting = t.formatting, new Promise(function(e) {
			Asc.plugin.callCommand(function() {
				let e = Api.GetDocument(), t = e.GetRangeBySelect();
				if (!t) return;
				function n(e, t) {
					t === "sup" ? e.SetVertAlign("superscript") : t === "sub" ? e.SetVertAlign("subscript") : t === "sc" ? e.SetSmallCaps(!0) : t === "u" ? e.SetUnderline(!0) : t === "b" ? e.SetBold(!0) : (t === "i" || t === "em") && e.SetItalic(!0);
				}
				if (Asc.scope.formatting.length === 1) {
					let e = Asc.scope.formatting[0];
					if (e.start === 0 && e.end === t.GetText().length) {
						n(t, e.type);
						return;
					}
				}
				e.MoveCursorToPos(t.GetEndPos() - Asc.scope.text.length);
				let r = e.GetCurrentRun();
				for (let e = Asc.scope.formatting.length - 1; e >= 0; e--) {
					let t = Asc.scope.formatting[e], i = r.GetRange(t.start, t.end);
					i && n(i, t.type);
				}
			}, !1, !0, e);
		});
	}
}, g = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	constructor(e, t, n, r) {
		this.#e = "ZOTERO_CITATION", this.#n = "ZOTERO_BIBLIOGRAPHY", this.#t = e, this.#r = t, this.#i = n, this.#a = r;
	}
	async addBibliography(e, t) {
		await this.#s();
		let n = window.Asc.scope.editorVersion;
		if (n && n < 9004e3) {
			let n = m.parseHtmlFormatting(e), r = "", i = {
				FieldId: r,
				Value: this.#i + t + this.#a,
				Content: n.text
			};
			return this.#o(i).then(() => this.getCurrentField()).then((e) => {
				if (r = e?.FieldId || "", n.formatting.length) return h.formatAfterInsert(n.formatting);
			}).then(() => r);
		}
		{
			let n = {
				FieldId: "",
				Value: this.#i + t + this.#a,
				Content: " "
			};
			return await this.#g(n, e);
		}
	}
	async addCitation(e, t, n) {
		let r = m.parseHtmlFormatting(e), i = {
			FieldId: "",
			Value: this.#t + " " + this.#r + t,
			Content: r.text
		}, a = !!(n && ["footnotes", "endnotes"].indexOf(n) !== -1);
		return a && await this.#c(n), await this.#o(i), r.formatting.length ? (await h.formatAfterInsert(r.formatting), a && await this.#m(), a) : a;
	}
	getCurrentField() {
		return new Promise(function(e, t) {
			window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
		});
	}
	getAddinZoteroFields() {
		let e = this;
		return new Promise(function(t, n) {
			e.#l().then(function(r) {
				try {
					r.length && (r = r.filter(function(t) {
						return t.Value.indexOf(e.#t) !== -1 || t.Value.indexOf(e.#i) !== -1 || t.Value.indexOf(e.#e) !== -1 || t.Value.indexOf(e.#n) !== -1;
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
			let t = e.map(function(e) {
				return new Promise(function(t) {
					window.Asc.plugin.executeMethod("RemoveFieldWrapper", [e.FieldId], t);
				});
			});
			return Promise.all(t).then(() => !0).catch((e) => (console.error(e), !1));
		});
	}
	async updateAddinFields(e) {
		let t = e.map((e) => e.FieldId), n = window.Asc.scope.editorVersion, r = e.filter((e) => e.Value.indexOf(this.#i) === 0);
		if (r.length && n && n >= 9004e3) {
			e = e.filter((e) => e.Value.indexOf(this.#i) !== 0);
			let t = r[0];
			await this.#p(t.FieldId);
			let n = t.Content || "";
			t.Content = " ", await this.#f(), await this.#g(t, n);
		}
		let i = this.#u(e);
		if (await new Promise((t) => {
			window.Asc.plugin.executeMethod("UpdateAddinFields", [e], t);
		}), !i.size) return t;
		for (let [e, t] of i) await this.#p(e) && await h.formatAfterUpdate(e, t);
		return t;
	}
	async convertNotesToText(e) {
		let t = this.#u(e);
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (!r.FieldId) {
				console.error("Field id is not defined");
				continue;
			}
			if (!await this.#p(r.FieldId) || !await this.#m()) continue;
			await this.#h(), await this.#f(), await this.#o(r);
			let i = t.get(r.FieldId);
			i && await h.formatAfterInsert(i.formatting);
		}
	}
	async convertTextToNotes(e, t) {
		let n = this.#u(e);
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (!i.FieldId || !await this.#p(i.FieldId)) continue;
			await this.#f(), await this.#c(t), await this.#o(i);
			let a = n.get(i.FieldId);
			a && await h.formatAfterInsert(a.formatting);
		}
	}
	async convertNotesStyle(e, t) {
		let n = [], r = this.#u(e);
		for (let i = 0; i < e.length; i++) {
			let a = e[i];
			if (!a.FieldId) continue;
			if (!a.Content) {
				n.push(a);
				continue;
			}
			if (!await this.#p(a.FieldId) || !await this.#m()) continue;
			await this.#h(), await this.#f(), await this.#c(t), await this.#o(a);
			let o = r.get(a.FieldId);
			o && await h.formatAfterInsert(o.formatting);
		}
		n.length && await new Promise(function(e) {
			window.Asc.plugin.executeMethod("UpdateAddinFields", [n], e);
		});
	}
	async moveCursorToField(e, t) {
		return new Promise((n) => {
			t ??= !0, window.Asc.plugin.executeMethod("MoveCursorToField", [e, t], n);
		});
	}
	async moveCursorOutsideField(e, t) {
		return new Promise((n) => {
			t ??= !1, window.Asc.plugin.executeMethod("MoveCursorOutsideField", [e, t], n);
		});
	}
	async moveCursorRight() {
		return new Promise((e) => {
			Asc.plugin.callCommand(() => {
				Api.GetDocument().MoveCursorRight(1, !1);
			}, !1, !0, e);
		});
	}
	#o(e) {
		return new Promise(function(t) {
			window.Asc.plugin.executeMethod("AddAddinField", [e], t);
		});
	}
	#s() {
		return new Promise((e) => {
			Asc.plugin.callCommand(() => {
				let e = Api.GetDocument().GetCurrentParagraph();
				if (!e || e.GetText() === "") return;
				let t = e.InsertParagraph("", "after", !0);
				if (!t) return;
				let n = t.GetRange();
				n && n.MoveCursorToPos(0);
			}, !1, !1, e);
		});
	}
	#c(e) {
		return Asc.scope.notesStyle = e, new Promise((e) => {
			Asc.plugin.callCommand(() => {
				let e = Api.GetDocument();
				Asc.scope.notesStyle === "footnotes" ? e.AddFootnote() : Asc.scope.notesStyle === "endnotes" && e.AddEndnote();
			}, !1, !1, e);
		});
	}
	#l() {
		return new Promise(function(e, t) {
			window.Asc.plugin.executeMethod("GetAllAddinFields", void 0, e);
		});
	}
	#u(e) {
		let t = /* @__PURE__ */ new Map();
		return e.forEach(function(e) {
			if (!e.Content) return;
			let n = m.parseHtmlFormatting(e.Content);
			e.Content = n.text, n.formatting.length && e.FieldId && t.set(e.FieldId, n);
		}), t;
	}
	#d(e) {
		return new Promise(function(t) {
			window.Asc.plugin.executeMethod("PasteHtml", [e], t);
		});
	}
	#f() {
		return new Promise((e) => {
			window.Asc.plugin.executeMethod("RemoveSelectedContent", void 0, e);
		});
	}
	#p(e) {
		return new Promise(function(t) {
			window.Asc.plugin.executeMethod("SelectAddinField", [e], () => t(!0));
		});
	}
	#m() {
		return new Promise(function(e) {
			Asc.plugin.callCommand(() => {
				let e = Api.GetDocument().GetCurrentFootEndnote();
				e && e.SelectNoteReference();
			}, !1, !0, () => e(!0));
		});
	}
	#h() {
		return new Promise(function(e) {
			Asc.plugin.callCommand(() => {
				let e = Api.GetDocument().GetRangeBySelect();
				e && e.SetVertAlign("baseline");
			}, !1, !1, e);
		});
	}
	async #g(e, t) {
		if (t = m.purifyHtml(t), await this.#o(e), await new Promise((e) => {
			Asc.plugin.callCommand(() => {
				Api.GetDocument().MoveCursorLeft(1, !0);
			}, !1, !0, e);
		}), !Asc.scope.bibStyle) throw "Bibliography style is not defined";
		let n = new DOMParser().parseFromString(t, "text/html"), r = n.querySelectorAll(".csl-entry"), i = Array(r.length), a = Date.now().toString(36);
		r.forEach((e, t) => {
			let n = e.querySelector(".csl-left-margin"), r = e.querySelector(".csl-right-inline");
			if (r?.replaceWith(...r.childNodes), n) {
				i[t] = n.textContent.trim() + a;
				let e = document.createElement("em");
				for (; n.firstChild;) e.appendChild(n.firstChild);
				let r = document.createElement("span");
				r.textContent = a, e.appendChild(r), n.replaceWith(e);
			}
			let o = document.createElement("p");
			for (; e.firstChild;) o.appendChild(e.firstChild);
			e.replaceWith(o);
		}), t = n.body.innerHTML, await this.#d(t);
		let o = await this.getCurrentField();
		if (!o) {
			console.warn("Failed to get current field after paste");
			for (let e = 0; e < 5 && (await new Promise((e) => {
				setTimeout(() => {
					e(!0);
				}, 100);
			}), o = await this.getCurrentField(), !o); e++);
			if (!o) throw Error("Failed to get current field after paste");
		}
		return await this.#p(o.FieldId), await new Promise((e) => {
			Asc.scope.numbers = i, Asc.scope.hash = a, Asc.plugin.callCommand(() => {
				let e = Api.GetDocument().GetRangeBySelect();
				if (!e) return;
				let t = Asc.scope.bibStyle;
				e.GetAllParagraphs().forEach((e, n) => {
					if (e.GetText().trim() !== "") {
						if (typeof t.linespacing == "number" && e.SetSpacingLine(240 * t.linespacing, "exact"), typeof t.entryspacing == "number" && e.SetSpacingAfter(240 * t.entryspacing), t["second-field-align"]) {
							let r = String(Asc.scope.numbers[n]);
							for (let t = 0; t < e.GetElementsCount(); t++) {
								let n = e.GetElement(t);
								if (n && typeof n.GetText == "function" && n.GetText() === r) {
									n.AddTabStop(), n.SetItalic(!1);
									break;
								}
							}
							let i = e.Search(Asc.scope.hash, !0)[0];
							if (!i) return;
							i.Delete(), e.SetIndLeft(t.maxoffset * 120), e.SetIndFirstLine(-(t.maxoffset * 120));
						} else t.hangingindent && (e.SetIndLeft(720), e.SetIndFirstLine(-720));
					}
				});
			}, !1, !1, e);
		}), Asc.scope.bibStyle = null, o.FieldId;
	}
}, _ = class {
	#e;
	#t;
	#n;
	constructor() {
		this.#e = [], this.#t = [], this.#n = [], this.size = 0;
	}
	getItem(e) {
		e = e.toString();
		let t = this.#t.indexOf(e);
		return t >= 0 ? this.#e[t] : null;
	}
	getItemIndex(e) {
		return e = e.toString(), this.#t.indexOf(e);
	}
	clear() {
		return this.#e = [], this.#n = [], this.#t = [], this.size = 0, this;
	}
	deleteItem(e) {
		e = e.toString();
		let t = this.#t.indexOf(e);
		return t >= 0 && (this.#e.splice(t, 1), this.#t.splice(t, 1), this.size--), this;
	}
	forEachItem(e) {
		for (var t = 0; t < this.size; t++) e(this.#e[t], this.#t[t], this);
	}
	hasItem(e) {
		return e = e.toString(), this.#t.indexOf(e) >= 0;
	}
	#r(e, t) {
		e = e.toString();
		let n = this.#t.indexOf(e);
		return n >= 0 ? (this.#e[n] = t, this) : (this.#e.push(t), this.#t.push(e), this.size++, this);
	}
	addCslCitation(e) {
		return this.#n.push(e), e.setNoteIndex(this.#n.length), e.getCitationItems().forEach((e) => {
			this.#r(e.id, e);
		}), this;
	}
	getAllCitationsInJson() {
		return this.#n.map((e) => e.toJSON());
	}
	getCitation(e) {
		return this.#n.find((t) => t.citationID === e);
	}
	getCitationIndex(e) {
		return this.#n.findIndex((t) => t.citationID === e);
	}
	getCitationsPre(e) {
		let t = [];
		return this.#n.find((n, r) => n.citationID === e || (t.push([n.citationID, r + 1]), !1)), t;
	}
	getCitationsPost(e) {
		let t = [], n = this.getCitationIndex(e);
		for (let e = n + 1; e < this.#n.length; e++) {
			let n = this.#n[e];
			t.push([n.citationID, e + 1]);
		}
		return t;
	}
};
//#endregion
//#region src/app/csl/citation/citation-item-data.js
function v(e) {
	if (typeof e != "string" && typeof e != "number") throw Error("CitationItemData: id is required");
	this._id = e, this._type = void 0, this._citationKey = void 0, this._categories = [], this._language = void 0, this._journalAbbreviation = void 0, this._shortTitle = void 0, this._author = [], this._chair = [], this._collectionEditor = [], this._compiler = [], this._composer = [], this._containerAuthor = [], this._contributor = [], this._curator = [], this._director = [], this._editor = [], this._editorialDirector = [], this._executiveProducer = [], this._guest = [], this._host = [], this._illustrator = [], this._narrator = [], this._organizer = [], this._originalAuthor = [], this._performer = [], this._producer = [], this._recipient = [], this._reviewedAuthor = [], this._scriptwriter = [], this._seriesCreator = [], this._translator = [], this._accessed = {}, this._container = {}, this._eventDate = {}, this._issued = {}, this._originalDate = {}, this._submitted = {}, this._abstract = void 0, this._annote = void 0, this._archive = void 0, this._archiveCollection = void 0, this._archiveLocation = void 0, this._archivePlace = void 0, this._authority = void 0, this._callNumber = void 0, this._chapterNumber = void 0, this._citationNumber = void 0, this._citationLabel = void 0, this._collectionNumber = void 0, this._collectionTitle = void 0, this._containerTitle = void 0, this._containerTitleShort = void 0, this._dimensions = void 0, this._DOI = void 0, this._edition = void 0, this._event = void 0, this._eventTitle = void 0, this._eventPlace = void 0, this._firstReferenceNoteNumber = void 0, this._genre = void 0, this._ISBN = void 0, this._ISSN = void 0, this._issue = void 0, this._jurisdiction = void 0, this._keyword = void 0, this._locator = void 0, this._medium = void 0, this._note = void 0, this._number = void 0, this._numberOfPages = void 0, this._numberOfVolumes = void 0, this._originalPublisher = void 0, this._originalPublisherPlace = void 0, this._originalTitle = void 0, this._page = void 0, this._part = void 0, this._partTitle = void 0, this._pageFirst = void 0, this._PMCID = void 0, this._PMID = void 0, this._printing = void 0, this._publisher = void 0, this._publisherPlace = void 0, this._references = void 0, this._reviewedGenre = void 0, this._reviewedTitle = void 0, this._scale = void 0, this._section = void 0, this._source = void 0, this._status = void 0, this._title = void 0, this._titleShort = void 0, this._URL = void 0, this._version = void 0, this._volume = void 0, this._volumeTitle = void 0, this._volumeTitleShort = void 0, this._yearSuffix = void 0, this._custom = {}, this.schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-data.json#/items";
}
v.prototype._addCustomProperty = function(e, t) {
	return this._custom[e] = t, this;
}, v.prototype.getCustomProperty = function(e) {
	return Object.hasOwnProperty.call(this._custom, e) ? this._custom[e] : null;
}, v.prototype.fillFromObject = function(e) {
	if (Object.hasOwnProperty.call(e, "type") && (this._type = e.type), Object.hasOwnProperty.call(e, "categories") && (this._categories = e.categories), Object.hasOwnProperty.call(e, "citation-key") && (this._citationKey = e["citation-key"]), Object.hasOwnProperty.call(e, "language") && (this._language = e.language), Object.hasOwnProperty.call(e, "journalAbbreviation") && (this._journalAbbreviation = e.journalAbbreviation), Object.hasOwnProperty.call(e, "shortTitle") && (this._shortTitle = e.shortTitle), Object.hasOwnProperty.call(e, "author") && (this._author = e.author), Object.hasOwnProperty.call(e, "chair") && (this._chair = e.chair), Object.hasOwnProperty.call(e, "collection-editor") && (this._collectionEditor = e["collection-editor"]), Object.hasOwnProperty.call(e, "compiler") && (this._compiler = e.compiler), Object.hasOwnProperty.call(e, "composer") && (this._composer = e.composer), Object.hasOwnProperty.call(e, "container-author") && (this._containerAuthor = e["container-author"]), Object.hasOwnProperty.call(e, "contributor") && (this._contributor = e.contributor), Object.hasOwnProperty.call(e, "curator") && (this._curator = e.curator), Object.hasOwnProperty.call(e, "director") && (this._director = e.director), Object.hasOwnProperty.call(e, "editorial-director") && (this._editorialDirector = e["editorial-director"]), Object.hasOwnProperty.call(e, "editor") && (this._editor = e.editor), Object.hasOwnProperty.call(e, "executive-producer") && (this._executiveProducer = e["executive-producer"]), Object.hasOwnProperty.call(e, "guest") && (this._guest = e.guest), Object.hasOwnProperty.call(e, "host") && (this._host = e.host), Object.hasOwnProperty.call(e, "illustrator") && (this._illustrator = e.illustrator), Object.hasOwnProperty.call(e, "narrator") && (this._narrator = e.narrator), Object.hasOwnProperty.call(e, "organizer") && (this._organizer = e.organizer), Object.hasOwnProperty.call(e, "original-author") && (this._originalAuthor = e["original-author"]), Object.hasOwnProperty.call(e, "performer") && (this._performer = e.performer), Object.hasOwnProperty.call(e, "producer") && (this._producer = e.producer), Object.hasOwnProperty.call(e, "recipient") && (this._recipient = e.recipient), Object.hasOwnProperty.call(e, "reviewed-author") && (this._reviewedAuthor = e["reviewed-author"]), Object.hasOwnProperty.call(e, "script-writer") && (this._scriptWriter = e["script-writer"]), Object.hasOwnProperty.call(e, "series-creator") && (this._seriesCreator = e["series-creator"]), Object.hasOwnProperty.call(e, "translator") && (this._translator = e.translator), Object.hasOwnProperty.call(e, "accessed") && (this._accessed = e.accessed), Object.hasOwnProperty.call(e, "container") && (this._container = e.container), Object.hasOwnProperty.call(e, "event-date") && (this._eventDate = e["event-date"]), Object.hasOwnProperty.call(e, "issued") && (this._issued = e.issued), Object.hasOwnProperty.call(e, "original-date") && (this._originalDate = e["original-date"]), Object.hasOwnProperty.call(e, "submitted") && (this._submitted = e.submitted), Object.hasOwnProperty.call(e, "abstract") && (this._abstract = e.abstract), Object.hasOwnProperty.call(e, "annote") && (this._annote = e.annote), Object.hasOwnProperty.call(e, "archive") && (this._archive = e.archive), Object.hasOwnProperty.call(e, "archive_collection") && (this._archiveCollection = e.archive_collection), Object.hasOwnProperty.call(e, "archive_location") && (this._archiveLocation = e.archive_location), Object.hasOwnProperty.call(e, "archive-place") && (this._archivePlace = e["archive-place"]), Object.hasOwnProperty.call(e, "authority") && (this._authority = e.authority), Object.hasOwnProperty.call(e, "call-number") && (this._callNumber = e["call-number"]), Object.hasOwnProperty.call(e, "chapter-number") && (this._chapterNumber = e["chapter-number"]), Object.hasOwnProperty.call(e, "citation-number") && (this._citationNumber = e["citation-number"]), Object.hasOwnProperty.call(e, "citation-label") && (this._citationLabel = e["citation-label"]), Object.hasOwnProperty.call(e, "collection-number") && (this._collectionNumber = e["collection-number"]), Object.hasOwnProperty.call(e, "collection-title") && (this._collectionTitle = e["collection-title"]), Object.hasOwnProperty.call(e, "container-title") && (this._containerTitle = e["container-title"]), Object.hasOwnProperty.call(e, "container-title-short") && (this._containerTitleShort = e["container-title-short"]), Object.hasOwnProperty.call(e, "dimensions") && (this._dimensions = e.dimensions), Object.hasOwnProperty.call(e, "DOI") && (this._DOI = e.DOI), Object.hasOwnProperty.call(e, "edition") && (this._edition = e.edition), Object.hasOwnProperty.call(e, "event") && (this._event = e.event), Object.hasOwnProperty.call(e, "event-title") && (this._eventTitle = e["event-title"]), Object.hasOwnProperty.call(e, "event-place") && (this._eventPlace = e["event-place"]), Object.hasOwnProperty.call(e, "first-reference-note-number") && (this._firstReferenceNoteNumber = e["first-reference-note-number"]), Object.hasOwnProperty.call(e, "genre") && (this._genre = e.genre), Object.hasOwnProperty.call(e, "ISBN") && (this._ISBN = e.ISBN), Object.hasOwnProperty.call(e, "ISSN") && (this._ISSN = e.ISSN), Object.hasOwnProperty.call(e, "issue") && (this._issue = e.issue), Object.hasOwnProperty.call(e, "jurisdiction") && (this._jurisdiction = e.jurisdiction), Object.hasOwnProperty.call(e, "keyword") && (this._keyword = e.keyword), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "medium") && (this._medium = e.medium), Object.hasOwnProperty.call(e, "note") && (this._note = e.note), Object.hasOwnProperty.call(e, "number") && (this._number = e.number), Object.hasOwnProperty.call(e, "number-of-pages") && (this._numberOfPages = e["number-of-pages"]), Object.hasOwnProperty.call(e, "number-of-volumes") && (this._numberOfVolumes = e["number-of-volumes"]), Object.hasOwnProperty.call(e, "original-publisher") && (this._originalPublisher = e["original-publisher"]), Object.hasOwnProperty.call(e, "original-publisher-place") && (this._originalPublisherPlace = e["original-publisher-place"]), Object.hasOwnProperty.call(e, "original-title") && (this._originalTitle = e["original-title"]), Object.hasOwnProperty.call(e, "page") && (this._page = e.page), Object.hasOwnProperty.call(e, "page-first") && (this._pageFirst = e["page-first"]), Object.hasOwnProperty.call(e, "part") && (this._part = e.part), Object.hasOwnProperty.call(e, "part-title") && (this._partTitle = e["part-title"]), Object.hasOwnProperty.call(e, "PMCID") && (this._PMCID = e.PMCID), Object.hasOwnProperty.call(e, "PMID") && (this._PMID = e.PMID), Object.hasOwnProperty.call(e, "printing") && (this._printing = e.printing), Object.hasOwnProperty.call(e, "publisher") && (this._publisher = e.publisher), Object.hasOwnProperty.call(e, "publisher-place") && (this._publisherPlace = e["publisher-place"]), Object.hasOwnProperty.call(e, "references") && (this._references = e.references), Object.hasOwnProperty.call(e, "reviewed-genre") && (this._reviewedGenre = e["reviewed-genre"]), Object.hasOwnProperty.call(e, "reviewed-title") && (this._reviewedTitle = e["reviewed-title"]), Object.hasOwnProperty.call(e, "scale") && (this._scale = e.scale), Object.hasOwnProperty.call(e, "section") && (this._section = e.section), Object.hasOwnProperty.call(e, "source") && (this._source = e.source), Object.hasOwnProperty.call(e, "status") && (this._status = e.status), Object.hasOwnProperty.call(e, "title") && (this._title = e.title), Object.hasOwnProperty.call(e, "title-short") && (this._titleShort = e["title-short"]), Object.hasOwnProperty.call(e, "URL") && (this._URL = e.URL), Object.hasOwnProperty.call(e, "versionNumber") && (this._version = e.versionNumber), Object.hasOwnProperty.call(e, "volume") && (this._volume = e.volume), Object.hasOwnProperty.call(e, "volume-title") && (this._volumeTitle = e["volume-title"]), Object.hasOwnProperty.call(e, "volume-title-short") && (this._volumeTitleShort = e["volume-title-short"]), Object.hasOwnProperty.call(e, "year-suffix") && (this._yearSuffix = e["year-suffix"]), Object.hasOwnProperty.call(e, "custom") && (this._custom = e.custom), Object.hasOwnProperty.call(e, "userID") && this._addCustomProperty("userID", e.userID), Object.hasOwnProperty.call(e, "groupID") && this._addCustomProperty("groupID", e.groupID), Object.hasOwnProperty.call(e, "creators")) {
		let t = this;
		e.creators.forEach(function(e) {
			let n = {};
			e.firstName && (n.given = e.firstName), e.lastName && (n.family = e.lastName), !t._author.some(function(e) {
				return !(e.family !== n.family && (e.family || n.family) || e.given !== n.given && (e.given || n.given));
			}) && t._author.push(n);
		}, this);
	}
	Object.hasOwnProperty.call(e, "libraryCatalog") && (this._source = e.libraryCatalog), Object.hasOwnProperty.call(e, "place") && (this._eventPlace = e.place, this._publisherPlace = e.place), Object.hasOwnProperty.call(e, "numberOfVolumes") && (this._numberOfVolumes = e.numberOfVolumes), Object.hasOwnProperty.call(e, "callNumber") && (this._callNumber = e.callNumber), Object.hasOwnProperty.call(e, "seriesNumber") && (this._collectionNumber = e.seriesNumber), Object.hasOwnProperty.call(e, "series") && (this._collectionTitle = e.series), Object.hasOwnProperty.call(e, "bookTitle") && (this._containerTitle = e.bookTitle), Object.hasOwnProperty.call(e, "extra") && (this._note = e.extra), Object.hasOwnProperty.call(e, "rights") && (this._license = e.rights), Object.hasOwnProperty.call(e, "archiveLocation") && (this._archiveLocation = e.archiveLocation), Object.hasOwnProperty.call(e, "abstractNote") && (this._abstract = e.abstractNote);
}, v.prototype.getTitle = function() {
	return this._title;
}, v.prototype.getType = function() {
	return this._type;
}, v.prototype.setType = function(e) {
	return this._type = e, this;
}, v.prototype.setCitationKey = function(e) {
	return this._citationKey = e, this;
}, v.prototype.setCategories = function(e) {
	return this._categories = e, this;
}, v.prototype.setLanguage = function(e) {
	return this._language = e, this;
}, v.prototype.setJournalAbbreviation = function(e) {
	return this._journalAbbreviation = e, this;
}, v.prototype.setShortTitle = function(e) {
	return this._shortTitle = e, this;
}, v.prototype.setAuthor = function(e) {
	return this._author = Array.isArray(e) ? e : [e], this;
}, v.prototype.setChair = function(e) {
	return this._chair = Array.isArray(e) ? e : [e], this;
}, v.prototype.setCollectionEditor = function(e) {
	return this._collectionEditor = Array.isArray(e) ? e : [e], this;
}, v.prototype.setCompiler = function(e) {
	return this._compiler = Array.isArray(e) ? e : [e], this;
}, v.prototype.setComposer = function(e) {
	return this._composer = Array.isArray(e) ? e : [e], this;
}, v.prototype.setContainerAuthor = function(e) {
	return this._containerAuthor = Array.isArray(e) ? e : [e], this;
}, v.prototype.setContributor = function(e) {
	return this._contributor = Array.isArray(e) ? e : [e], this;
}, v.prototype.setCurator = function(e) {
	return this._curator = Array.isArray(e) ? e : [e], this;
}, v.prototype.setDirector = function(e) {
	return this._director = Array.isArray(e) ? e : [e], this;
}, v.prototype.setEditor = function(e) {
	return this._editor = Array.isArray(e) ? e : [e], this;
}, v.prototype.setEditorialDirector = function(e) {
	return this._editorialDirector = Array.isArray(e) ? e : [e], this;
}, v.prototype.setExecutiveProducer = function(e) {
	return this._executiveProducer = Array.isArray(e) ? e : [e], this;
}, v.prototype.setGuest = function(e) {
	return this._guest = Array.isArray(e) ? e : [e], this;
}, v.prototype.setHost = function(e) {
	return this._host = Array.isArray(e) ? e : [e], this;
}, v.prototype.setIllustrator = function(e) {
	return this._illustrator = Array.isArray(e) ? e : [e], this;
}, v.prototype.setNarrator = function(e) {
	return this._narrator = Array.isArray(e) ? e : [e], this;
}, v.prototype.setOrganizer = function(e) {
	return this._organizer = Array.isArray(e) ? e : [e], this;
}, v.prototype.setOriginalAuthor = function(e) {
	return this._originalAuthor = Array.isArray(e) ? e : [e], this;
}, v.prototype.setPerformer = function(e) {
	return this._performer = Array.isArray(e) ? e : [e], this;
}, v.prototype.setProducer = function(e) {
	return this._producer = Array.isArray(e) ? e : [e], this;
}, v.prototype.setRecipient = function(e) {
	return this._recipient = Array.isArray(e) ? e : [e], this;
}, v.prototype.setReviewedAuthor = function(e) {
	return this._reviewedAuthor = Array.isArray(e) ? e : [e], this;
}, v.prototype.setScriptwriter = function(e) {
	return this._scriptwriter = Array.isArray(e) ? e : [e], this;
}, v.prototype.setSeriesCreator = function(e) {
	return this._seriesCreator = Array.isArray(e) ? e : [e], this;
}, v.prototype.setTranslator = function(e) {
	return this._translator = Array.isArray(e) ? e : [e], this;
}, v.prototype.setAccessed = function(e) {
	return this._accessed = e || {}, this;
}, v.prototype.setContainer = function(e) {
	return this._container = e || {}, this;
}, v.prototype.setEventDate = function(e) {
	return this._eventDate = e || {}, this;
}, v.prototype.setIssued = function(e) {
	return this._issued = e || {}, this;
}, v.prototype.setOriginalDate = function(e) {
	return this._originalDate = e || {}, this;
}, v.prototype.setSubmitted = function(e) {
	return this._submitted = e || {}, this;
}, v.prototype.setAbstract = function(e) {
	return this._abstract = e, this;
}, v.prototype.setAnnote = function(e) {
	return this._annote = e, this;
}, v.prototype.setArchive = function(e) {
	return this._archive = e, this;
}, v.prototype.setArchiveCollection = function(e) {
	return this._archiveCollection = e, this;
}, v.prototype.setArchiveLocation = function(e) {
	return this._archiveLocation = e, this;
}, v.prototype.setArchivePlace = function(e) {
	return this._archivePlace = e, this;
}, v.prototype.setAuthority = function(e) {
	return this._authority = e, this;
}, v.prototype.setCallNumber = function(e) {
	return this._callNumber = e, this;
}, v.prototype.setChapterNumber = function(e) {
	return this._chapterNumber = e, this;
}, v.prototype.setCitationNumber = function(e) {
	return this._citationNumber = e, this;
}, v.prototype.setCitationLabel = function(e) {
	return this._citationLabel = e, this;
}, v.prototype.setCollectionNumber = function(e) {
	return this._collectionNumber = e, this;
}, v.prototype.setCollectionTitle = function(e) {
	return this._collectionTitle = e, this;
}, v.prototype.setContainerTitle = function(e) {
	return this._containerTitle = e, this;
}, v.prototype.setContainerTitleShort = function(e) {
	return this._containerTitleShort = e, this;
}, v.prototype.setDimensions = function(e) {
	return this._dimensions = e, this;
}, v.prototype.setDOI = function(e) {
	return this._DOI = e, this;
}, v.prototype.setEdition = function(e) {
	return this._edition = e, this;
}, v.prototype.setEvent = function(e) {
	return this._event = e, this;
}, v.prototype.setEventTitle = function(e) {
	return this._eventTitle = e, this;
}, v.prototype.setEventPlace = function(e) {
	return this._eventPlace = e, this;
}, v.prototype.setFirstReferenceNoteNumber = function(e) {
	return this._firstReferenceNoteNumber = e, this;
}, v.prototype.setGenre = function(e) {
	return this._genre = e, this;
}, v.prototype.setISBN = function(e) {
	return this._ISBN = e, this;
}, v.prototype.setISSN = function(e) {
	return this._ISSN = e, this;
}, v.prototype.setIssue = function(e) {
	return this._issue = e, this;
}, v.prototype.setJurisdiction = function(e) {
	return this._jurisdiction = e, this;
}, v.prototype.setKeyword = function(e) {
	return this._keyword = e, this;
}, v.prototype.setLocator = function(e) {
	return this._locator = e, this;
}, v.prototype.setMedium = function(e) {
	return this._medium = e, this;
}, v.prototype.setNote = function(e) {
	return this._note = e, this;
}, v.prototype.setNumber = function(e) {
	return this._number = e, this;
}, v.prototype.setNumberOfPages = function(e) {
	return this._numberOfPages = e, this;
}, v.prototype.setNumberOfVolumes = function(e) {
	return this._numberOfVolumes = e, this;
}, v.prototype.setOriginalPublisher = function(e) {
	return this._originalPublisher = e, this;
}, v.prototype.setOriginalPublisherPlace = function(e) {
	return this._originalPublisherPlace = e, this;
}, v.prototype.setOriginalTitle = function(e) {
	return this._originalTitle = e, this;
}, v.prototype.setPage = function(e) {
	return this._page = e, this;
}, v.prototype.setPageFirst = function(e) {
	return this._pageFirst = e, this;
}, v.prototype.setPart = function(e) {
	return this._part = e, this;
}, v.prototype.setPartTitle = function(e) {
	return this._partTitle = e, this;
}, v.prototype.setPMCID = function(e) {
	return this._PMCID = e, this;
}, v.prototype.setPMID = function(e) {
	return this._PMID = e, this;
}, v.prototype.setPrinting = function(e) {
	return this._printing = e, this;
}, v.prototype.setPublisher = function(e) {
	return this._publisher = e, this;
}, v.prototype.setPublisherPlace = function(e) {
	return this._publisherPlace = e, this;
}, v.prototype.setReferences = function(e) {
	return this._references = e, this;
}, v.prototype.setReviewedGenre = function(e) {
	return this._reviewedGenre = e, this;
}, v.prototype.setReviewedTitle = function(e) {
	return this._reviewedTitle = e, this;
}, v.prototype.setScale = function(e) {
	return this._scale = e, this;
}, v.prototype.setSection = function(e) {
	return this._section = e, this;
}, v.prototype.setSource = function(e) {
	return this._source = e, this;
}, v.prototype.setStatus = function(e) {
	return this._status = e, this;
}, v.prototype.setTitle = function(e) {
	return this._title = e, this;
}, v.prototype.setTitleShort = function(e) {
	return this._titleShort = e, this;
}, v.prototype.setURL = function(e) {
	return this._URL = e, this;
}, v.prototype.setVersion = function(e) {
	return this._version = e, this;
}, v.prototype.setVolume = function(e) {
	return this._volume = e, this;
}, v.prototype.setVolumeTitle = function(e) {
	return this._volumeTitle = e, this;
}, v.prototype.setVolumeTitleShort = function(e) {
	return this._volumeTitleShort = e, this;
}, v.prototype.setYearSuffix = function(e) {
	return this._yearSuffix = e, this;
}, v.prototype.setCustom = function(e) {
	return this._custom = Object.assign(this._custom, e), this;
}, v.prototype.toJSON = function(e) {
	var t = {};
	return t.id = this._id, this._type !== void 0 && this._type !== "" && (t.type = this._type), this._citationKey !== void 0 && this._citationKey !== "" && (t["citation-key"] = this._citationKey), this._categories.length > 0 && (t.categories = this._categories), this._language !== void 0 && this._language !== "" && (t.language = this._language), this._journalAbbreviation !== void 0 && this._journalAbbreviation !== "" && (t.journalAbbreviation = this._journalAbbreviation), this._shortTitle !== void 0 && this._shortTitle !== "" && (t.shortTitle = this._shortTitle, this._titleShort === void 0 && (t["title-short"] = this._shortTitle)), this._author.length > 0 && (t.author = this._author), this._chair.length > 0 && (t.chair = this._chair), this._collectionEditor.length > 0 && (t["collection-editor"] = this._collectionEditor), this._compiler.length > 0 && (t.compiler = this._compiler), this._composer.length > 0 && (t.composer = this._composer), this._containerAuthor.length > 0 && (t["container-author"] = this._containerAuthor), this._contributor.length > 0 && (t.contributor = this._contributor), this._curator.length > 0 && (t.curator = this._curator), this._director.length > 0 && (t.director = this._director), this._editor.length > 0 && (t.editor = this._editor), this._editorialDirector.length > 0 && (t["editorial-director"] = this._editorialDirector), this._executiveProducer.length > 0 && (t["executive-producer"] = this._executiveProducer), this._guest.length > 0 && (t.guest = this._guest), this._host.length > 0 && (t.host = this._host), this._illustrator.length > 0 && (t.illustrator = this._illustrator), this._narrator.length > 0 && (t.narrator = this._narrator), this._organizer.length > 0 && (t.organizer = this._organizer), this._originalAuthor.length > 0 && (t["original-author"] = this._originalAuthor), this._performer.length > 0 && (t.performer = this._performer), this._producer.length > 0 && (t.producer = this._producer), this._recipient.length > 0 && (t.recipient = this._recipient), this._reviewedAuthor.length > 0 && (t["reviewed-author"] = this._reviewedAuthor), this._scriptwriter.length > 0 && (t["script-writer"] = this._scriptwriter), this._seriesCreator.length > 0 && (t["series-creator"] = this._seriesCreator), this._translator.length > 0 && (t.translator = this._translator), Object.keys(this._accessed).length > 0 && (t.accessed = this._accessed), Object.keys(this._container).length > 0 && (t.container = this._container), Object.keys(this._eventDate).length > 0 && (t["event-date"] = this._eventDate), Object.keys(this._issued).length > 0 && (t.issued = this._issued), Object.keys(this._originalDate).length > 0 && (t["original-date"] = this._originalDate), Object.keys(this._submitted).length > 0 && (t.submitted = this._submitted), this._abstract !== void 0 && this._abstract !== "" && (t.abstract = this._abstract), this._annote !== void 0 && this._annote !== "" && (t.annote = this._annote), this._archive !== void 0 && this._archive !== "" && (t.archive = this._archive), this._archiveCollection !== void 0 && this._archiveCollection !== "" && (t.archive_collection = this._archiveCollection), this._archiveLocation !== void 0 && this._archiveLocation !== "" && (t.archive_location = this._archiveLocation), this._archivePlace !== void 0 && this._archivePlace !== "" && (t["archive-place"] = this._archivePlace), this._authority !== void 0 && this._authority !== "" && (t.authority = this._authority), this._callNumber !== void 0 && this._callNumber !== "" && (t["call-number"] = this._callNumber), this._chapterNumber !== void 0 && this._chapterNumber !== "" && (t["chapter-number"] = this._chapterNumber), this._citationNumber !== void 0 && this._citationNumber !== "" && (t["citation-number"] = this._citationNumber), this._citationLabel !== void 0 && this._citationLabel !== "" && (t["citation-label"] = this._citationLabel), this._collectionNumber !== void 0 && this._collectionNumber !== "" && (t["collection-number"] = this._collectionNumber), this._collectionTitle !== void 0 && this._collectionTitle !== "" && (t["collection-title"] = this._collectionTitle), this._containerTitle !== void 0 && this._containerTitle !== "" && (t["container-title"] = this._containerTitle), this._containerTitleShort !== void 0 && this._containerTitleShort !== "" && (t["container-title-short"] = this._containerTitleShort), this._dimensions !== void 0 && this._dimensions !== "" && (t.dimensions = this._dimensions), this._DOI !== void 0 && this._DOI !== "" && (t.DOI = this._DOI), this._edition !== void 0 && this._edition !== "" && (t.edition = this._edition), this._event !== void 0 && this._event !== "" && (t.event = this._event), this._eventTitle !== void 0 && this._eventTitle !== "" && (t["event-title"] = this._eventTitle), this._eventPlace !== void 0 && this._eventPlace !== "" && (t["event-place"] = this._eventPlace), this._firstReferenceNoteNumber !== void 0 && this._firstReferenceNoteNumber !== "" && (t["first-reference-note-number"] = this._firstReferenceNoteNumber), this._genre !== void 0 && this._genre !== "" && (t.genre = this._genre), this._ISBN !== void 0 && this._ISBN !== "" && (t.ISBN = this._ISBN), this._ISSN !== void 0 && this._ISSN !== "" && (t.ISSN = this._ISSN), this._issue !== void 0 && this._issue !== "" && (t.issue = this._issue), this._jurisdiction !== void 0 && this._jurisdiction !== "" && (t.jurisdiction = this._jurisdiction), this._keyword !== void 0 && this._keyword !== "" && (t.keyword = this._keyword), this._locator !== void 0 && this._locator !== "" && (t.locator = this._locator), this._medium !== void 0 && this._medium !== "" && (t.medium = this._medium), this._note !== void 0 && this._note !== "" && (t.note = this._note), this._number !== void 0 && this._number !== "" && (t.number = this._number), this._numberOfPages !== void 0 && this._numberOfPages !== "" && (t["number-of-pages"] = this._numberOfPages), this._numberOfVolumes !== void 0 && this._numberOfVolumes !== "" && (t["number-of-volumes"] = this._numberOfVolumes), this._originalPublisher !== void 0 && this._originalPublisher !== "" && (t["original-publisher"] = this._originalPublisher), this._originalPublisherPlace !== void 0 && this._originalPublisherPlace !== "" && (t["original-publisher-place"] = this._originalPublisherPlace), this._originalTitle !== void 0 && this._originalTitle !== "" && (t["original-title"] = this._originalTitle), this._page !== void 0 && this._page !== "" && (t.page = this._page), this._pageFirst !== void 0 && this._pageFirst !== "" && (t["page-first"] = this._pageFirst), this._part !== void 0 && this._part !== "" && (t.part = this._part), this._partTitle !== void 0 && this._partTitle !== "" && (t["part-title"] = this._partTitle), this._PMCID !== void 0 && this._PMCID !== "" && (t.PMCID = this._PMCID), this._PMID !== void 0 && this._PMID !== "" && (t.PMID = this._PMID), this._printing !== void 0 && this._printing !== "" && (t.printing = this._printing), this._publisher !== void 0 && this._publisher !== "" && (t.publisher = this._publisher), this._publisherPlace !== void 0 && this._publisherPlace !== "" && (t["publisher-place"] = this._publisherPlace), this._references !== void 0 && this._references !== "" && (t.references = this._references), this._reviewedGenre !== void 0 && this._reviewedGenre !== "" && (t["reviewed-genre"] = this._reviewedGenre), this._reviewedTitle !== void 0 && this._reviewedTitle !== "" && (t["reviewed-title"] = this._reviewedTitle), this._scale !== void 0 && this._scale !== "" && (t.scale = this._scale), this._section !== void 0 && this._section !== "" && (t.section = this._section), this._source !== void 0 && this._source !== "" && (t.source = this._source), this._status !== void 0 && this._status !== "" && (t.status = this._status), this._title !== void 0 && this._title !== "" && (t.title = this._title), this._titleShort !== void 0 && this._titleShort !== "" && (t["title-short"] = this._titleShort), this._URL !== void 0 && this._URL !== "" && (t.URL = this._URL), this._version !== void 0 && this._version !== "" && (t.version = this._version), this._volume !== void 0 && this._volume !== "" && (t.volume = this._volume), this._volumeTitle !== void 0 && this._volumeTitle !== "" && (t["volume-title"] = this._volumeTitle), this._volumeTitleShort !== void 0 && this._volumeTitleShort !== "" && (t["volume-title-short"] = this._volumeTitleShort), this._yearSuffix !== void 0 && this._yearSuffix !== "" && (t["year-suffix"] = this._yearSuffix), Object.keys(this._custom).length !== 0 && (t.custom = this._custom), this._license !== void 0 && this._license !== "" && (t.license = this._license), e && t.page && (t.type === "article-journal" || t.type === "article-magazine" || t.type === "article-newspaper") && delete t.URL, t;
};
//#endregion
//#region src/app/csl/citation/citation-item.js
function y(e) {
	if (typeof e != "string" && typeof e != "number") throw Error("CitationItem: id is required");
	this.id = e, this._itemData = new v(e), this._prefix = void 0, this._suffix = void 0, this._locator = void 0, this._label = void 0, this._suppressAuthor = void 0, this._authorOnly = void 0, this._uris = [];
}
y.prototype.fillFromObject = function(e) {
	let t = this;
	Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? (this._itemData.fillFromObject(e.data), Object.hasOwnProperty.call(e, "links") && (Object.hasOwnProperty.call(e.links, "self") && this.addUri(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && this.addUri(e.links.alternate.href))) : Object.hasOwnProperty.call(e, "itemData") ? this._itemData.fillFromObject(e.itemData) : this._itemData.fillFromObject(e), Object.hasOwnProperty.call(e, "prefix") && (this._prefix = e.prefix), Object.hasOwnProperty.call(e, "suffix") && (this._suffix = e.suffix), Object.hasOwnProperty.call(e, "locator") && (this._locator = e.locator), Object.hasOwnProperty.call(e, "label") && (this._label = e.label), Object.hasOwnProperty.call(e, "suppress-author") && (this._suppressAuthor = e["suppress-author"]), Object.hasOwnProperty.call(e, "author-only") && (this._authorOnly = e["author-only"]), Object.hasOwnProperty.call(e, "uris") && e.uris.forEach(function(e) {
		t.addUri(e);
	}, this);
}, y.prototype.getInfoForCitationCluster = function() {
	let e = {
		id: this.id,
		"suppress-author": this._suppressAuthor
	};
	return this._prefix && (e.prefix = this._prefix), this._suffix && (e.suffix = this._suffix), this._locator && (e.locator = this._locator), this._label && (e.label = this._label), e;
}, y.prototype.getItemData = function() {
	return this._itemData;
}, y.prototype.getProperty = function(e) {
	return this._itemData.getCustomProperty(e) === null ? null : this._itemData.getCustomProperty(e);
}, y.prototype.setPrefix = function(e) {
	return this._prefix = e, this;
}, y.prototype.setSuffix = function(e) {
	return this._suffix = e, this;
}, y.prototype.setLocator = function(e) {
	return this._locator = e, this;
}, y.prototype.setLabel = function(e) {
	if (e) {
		if ((/* @__PURE__ */ "act.appendix.article-locator.book.canon.chapter.column.elocation.equation.figure.folio.issue.line.note.opus.page.paragraph.part.rule.scene.section.sub-verbo.supplement.table.timestamp.title-locator.verse.version.volume".split(".")).indexOf(e) === -1) throw Error("CitationItem.setLocator: Invalid label \"" + e + "\"");
		this._label = e;
	}
	return this;
}, y.prototype.setSuppressAuthor = function(e) {
	return this._suppressAuthor = e, this;
}, y.prototype.setAuthorOnly = function(e) {
	return this._authorOnly = e, this;
}, y.prototype.addUri = function(e) {
	return this._uris.indexOf(e) === -1 && this._uris.push(e), this;
}, y.prototype.toJSON = function(e) {
	var t = {};
	return t.id = this.id, this._itemData && (t.itemData = this._itemData.toJSON ? this._itemData.toJSON(e) : this._itemData), this._prefix !== void 0 && (t.prefix = this._prefix), this._suffix !== void 0 && (t.suffix = this._suffix), this._locator !== void 0 && (t.locator = this._locator), this._label !== void 0 && (t.label = this._label), this._suppressAuthor !== void 0 && (t["suppress-author"] = this._suppressAuthor), this._authorOnly !== void 0 && (t["author-only"] = this._authorOnly), this._uris.length && (t.uris = this._uris), t;
}, y.prototype.toFlatJSON = function(e, t) {
	var n = {
		id: this.id,
		index: e
	};
	this._suppressAuthor !== void 0 && (n["suppress-author"] = this._suppressAuthor);
	let r = this._itemData.toJSON(t);
	return Object.assign(n, r), this._itemData.getCustomProperty("userID") !== void 0 && this._itemData.getCustomProperty("userID") !== null && (n.userID = String(this._itemData.getCustomProperty("userID"))), this._itemData.getCustomProperty("groupID") !== void 0 && this._itemData.getCustomProperty("groupID") !== null && (n.groupID = String(this._itemData.getCustomProperty("groupID"))), n;
};
//#endregion
//#region src/app/csl/citation/citation.js
var b = class e {
	static #e = /* @__PURE__ */ new Set();
	constructor(t) {
		t ||= this.#c(), e.#e.has(t) && (console.warn("Citation ID must be unique"), t = this.#c()), e.#e.add(t), this.citationID = t, this._citationItems = [], this._properties = {}, this._manualOverride = {}, this._schema = "https://raw.githubusercontent.com/citation-style-language/schema/master/schemas/input/csl-citation.json";
	}
	static resetUsedIDs() {
		e.#e = /* @__PURE__ */ new Set();
	}
	fillFromObject(e) {
		return Object.hasOwnProperty.call(e, "properties") || Object.hasOwnProperty.call(e, "manualOverride") || Object.hasOwnProperty.call(e, "schema") ? this.#t(e) : Object.hasOwnProperty.call(e, "citationItems") ? this.#n(e) : Object.hasOwnProperty.call(e, "version") && Object.hasOwnProperty.call(e, "library") ? this.#i(e) : this.#r(e);
	}
	#t(e) {
		let t = this;
		if (Object.hasOwnProperty.call(e, "schema"), Object.hasOwnProperty.call(e, "properties") && this.#o(e.properties), Object.hasOwnProperty.call(e, "manualOverride") && (this._manualOverride = e.manualOverride), !Object.hasOwnProperty.call(e, "citationItems")) return console.error("citationItems is empty"), 0;
		let n = this._citationItems.map(function(e) {
			return e.id;
		});
		return e.citationItems.forEach(function(e) {
			let r = e.id, i;
			n.indexOf(r) >= 0 ? i = t._citationItems[n.indexOf(r)] : (i = new y(r), n.push(r)), typeof r == "number" && (r = t.#s(e)), i.fillFromObject(e), t.#a(i);
		}, this), n.length;
	}
	#n(e) {
		let t = this;
		return e.citationItems.length === 0 ? (console.error("CSLCitation.citationItems: citationItems is empty"), 0) : (e.citationItems.length > 1 && console.warn("CSLCitation.citationItems: citationItems has more than one item"), e.citationItems.forEach(function(e) {
			t.#r(e);
		}, this), 1);
	}
	#r(e) {
		let t = e.id, n, r = this._citationItems.map(function(e) {
			return e.id;
		});
		return n = r.indexOf(t) >= 0 ? this._citationItems[r.indexOf(t)] : new y(t), n.fillFromObject(e), this.#a(n), 1;
	}
	#i(e) {
		if (!Object.hasOwnProperty.call(e, "data")) return console.error("Invalid citation object"), 0;
		let t = this._citationItems.map(function(e) {
			return e.id;
		}), n = e.data.key, r;
		return r = t.indexOf(n) >= 0 ? this._citationItems[t.indexOf(n)] : new y(n), r.fillFromObject(e), this.#a(r), 1;
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
	#a(e) {
		let t = this._citationItems.map(function(e) {
			return e.id;
		});
		return t.indexOf(e.id) >= 0 ? (this._citationItems[t.indexOf(e.id)] = e, this) : (this._citationItems.push(e), this);
	}
	setDoNotUpdate() {
		return this.#o({ dontUpdate: !0 }), this;
	}
	setNoteIndex(e) {
		return this.#o({ noteIndex: e }), this;
	}
	setPlainCitation(e) {
		return this.#o({ plainCitation: e }), this;
	}
	setManualOverride(e, t) {
		let n = {
			citeprocText: e,
			isManuallyOverridden: !!t,
			manualOverrideText: t || ""
		};
		return this._manualOverride = n, this;
	}
	#o(e) {
		let t = this;
		return Object.keys(e).forEach(function(n) {
			Object.hasOwnProperty.call(e, n) && (t._properties[n] = e[n]);
		}, this), this;
	}
	#s(e) {
		if (Object.hasOwnProperty.call(e, "uris") && e.uris.length) {
			let t = e.uris[0].lastIndexOf("/");
			return e.uris[0].slice(t + 1);
		}
		return e.id;
	}
	#c() {
		return Math.random().toString(36).substring(2, 15);
	}
	validate() {
		var e = [];
		if (this._schema || e.push("Schema is required"), this.citationID || e.push("citationID is required"), this._citationItems && Array.isArray(this._citationItems)) for (var t = 0; t < this._citationItems.length; t++) this._citationItems[t].id || e.push("Citation item at index " + t + " must have an id");
		return e.length === 0 || e;
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
}, x = class {
	#e;
	#t;
	#n;
	#r;
	constructor() {
		this.#e = null, this.#t = window.Asc.plugin.button, this.#n = Asc.plugin.onThemeChanged, this.#r = Asc.plugin.onTranslate;
	}
	show(e, t) {
		this.#e && this.#a(), this.#e = new window.Asc.PluginWindow();
		let n = {
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
		return this.#i(n, t, "default"), this.#e.show(n), new Promise((e, t) => {
			window.Asc.plugin.button = (t, n) => {
				e(t === 0), this.#a();
			};
		});
	}
	showEditWindow(e) {
		this.#e && this.#a(), this.#e = new window.Asc.PluginWindow();
		let t = {
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
		return this.#i(t, e, "default"), this.#e.show(t), new Promise((e, t) => {
			window.Asc.plugin.button = async (t, n) => {
				let r = await new Promise((e) => {
					if (!this.#e) {
						e(null);
						return;
					}
					this.#e.attachEvent("onSaveFields", e), this.#e.command("onClickSave");
				});
				e(t === 0 ? r : null), this.#a();
			};
		});
	}
	showInfoWindow(e, t, n) {
		this.#e && this.#a(), typeof n != "string" && (n = "warning"), this.#e = new window.Asc.PluginWindow();
		let r = {
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
		return this.#i(r, window.Asc.plugin.tr(t), n), this.#e.show(r), new Promise((e, t) => {
			window.Asc.plugin.button = (t, n) => {
				e(t === 0), this.#a();
			};
		});
	}
	#i(e, t, n) {
		this.#e && (this.#t = window.Asc.plugin.button, this.#n = Asc.plugin.onThemeChanged, this.#r = Asc.plugin.onTranslate, window.Asc.plugin.onThemeChanged = (e) => {
			this.#e?.command("onThemeChanged", e), this.#n(e);
		}, window.Asc.plugin.onTranslate = () => {
			this.#e?.command("onTranslate"), this.#r();
		}, this.#e.attachEvent("onWindowReady", () => {
			n === "warning" ? this.#e?.command("onWarning", t) : n === "success" ? this.#e?.command("onSuccess", t) : this.#e?.command("onAttachedContent", t);
		}), this.#e.attachEvent("onUpdateHeight", (t) => {
			Asc.plugin.executeMethod("ResizeWindow", [this.#e?.id, [e.size[0] - 2, t]], () => {});
		}));
	}
	#a() {
		this.#e &&= (this.#e.close(), null), window.Asc.plugin.button = this.#t, window.Asc.plugin.onThemeChanged = this.#n;
	}
}, S = class {
	#e;
	#t;
	#n;
	constructor(e, t, n, r) {
		this._bibPlaceholderIfEmpty = "Please insert some citation into the document.", this._citPrefixNew = "ZOTERO_ITEM", this._citSuffixNew = "CSL_CITATION", this._citPrefix = "ZOTERO_CITATION", this._bibPrefixNew = "ZOTERO_BIBL", this._bibSuffixNew = "CSL_BIBLIOGRAPHY", this._bibPrefix = "ZOTERO_BIBLIOGRAPHY", this._sdk = n, this._localesManager = e, this._cslStylesManager = t, this._storage = new _(), this._formatter, this.citationDocService = new g(this._citPrefixNew, this._citSuffixNew, this._bibPrefixNew, this._bibSuffixNew), this.#e = new x(), this.#t = !1, this.#n = r, this.#n.load();
	}
	#r(e) {
		let t = this, n = !1;
		return Promise.resolve().then(function() {
			if (e.getCitationItems().forEach(function(e) {
				t._storage.hasItem(e.id) || (n = !0);
			}), n) {
				var r = [];
				t._storage.forEachItem(function(e, t) {
					r.push(t);
				}), t._formatter.updateItems(r);
			}
		}).then(() => this.#s(e)).then((n) => {
			let r = null;
			return t._cslStylesManager.getLastUsedFormat() === "note" && (r = t._cslStylesManager.getLastUsedNotesStyle()), t.citationDocService.addCitation(n, JSON.stringify(e.toJSON()), r);
		});
	}
	#i(e) {
		let t = this, n = !1;
		return Promise.resolve().then(function() {
			if (e.getCitationItems().forEach(function(e) {
				t._storage.hasItem(e.id) || (n = !0);
			}), n) {
				var r = [];
				t._storage.forEachItem(function(e, t) {
					r.push(t);
				}), t._formatter.updateItems(r);
			}
		}).then(() => this.#s(e));
	}
	#a(e) {
		var t = [], n = {};
		for (var r in e) {
			var i = e[r], a = i.userID;
			let o = i.groupID;
			a ? t.push(i.id) : o && (n[o] || (n[o] = []), n[o].push(i.id));
		}
		var o = [];
		for (var s in t.length && o.push(this._sdk.getItems(null, t, "json").then(function(e) {
			return e.items || [];
		})), n) Object.hasOwnProperty.call(n, s) && o.push(this._sdk.getGroupItems(null, s, n[s], "json").then(function(e) {
			return e.items || [];
		}));
		return Promise.all(o).then(function(e) {
			return e.reduce((e, t) => e.concat(t), []);
		});
	}
	#o() {
		try {
			let e = [];
			this.#t = !this._cslStylesManager.getIncludeUrlForPaperArticles(), this.#t && this.#p();
			let t = this._formatter.makeBibliography();
			this.#t && (this.#t = !1, this.#p());
			for (let n = 0; n < t[1].length; n++) {
				let r = this.#m(t[1][n]).replaceAll("\n", "").replaceAll("\r", "").replace(/\s+/g, " ").trim(), i = "<div class=\"csl-entry\">", a = "</div>";
				r.indexOf(i) === 0 && r.endsWith(a) && (r = i + r.substring(23, r.length - 6).trim() + a), t[0]["second-field-align"] || (r = r.replace(/<div class=\"csl-left-margin\">([\s\S]*?)<\/div>/, "$1	"), r = r.replace(/<div class=\"csl-block\">([\s\S]*?)<\/div>/, "$1\n\r"), r = r.replace(/<\/?div[^>]*>/g, " "), r = "<p>" + r.trim() + "</p>"), r = r.split("\n").map((e) => e.replace(/[ ]{2,}/g, " ").trim()).join("\n"), window.Asc.scope.editorVersion < 9004e3 && (r += "\n"), e.push(r);
			}
			let n = e.join("").trim();
			return Asc.scope.bibStyle = t[0], n;
		} catch (e) {
			if (!1 === this._cslStylesManager.isLastUsedStyleContainBibliography()) this.showWarningMessage("Style does not describe the bibliography");
			else throw console.error(e), "Failed to apply this style.";
			return "";
		}
	}
	#s(e) {
		let t = document.createDocumentFragment(), n = document.createElement("div"), r = this._storage.getCitationsPre(e.citationID), i = this._storage.getCitationsPost(e.citationID), a = this._storage.getAllCitationsInJson();
		this._formatter.rebuildProcessorState(a);
		let o = this._formatter.processCitationCluster(e.toJSON(), r, i), s = this.#m(o[1][0][1]);
		return t.appendChild(n), n.innerHTML = s, e.setPlainCitation(n.innerText), s;
	}
	#c(e) {
		let t, n = e.Value.indexOf("{"), r = e.Value.lastIndexOf("}");
		if (n !== -1) {
			var i = e.Value.slice(n, r + 1);
			t = JSON.parse(i);
		}
		return t;
	}
	#l(e, t) {
		let n = this;
		return this._storage.clear(), b.resetUsedIDs(), this.citationDocService.getAddinZoteroFields().then(function(r) {
			let i = 0, a = " ", o = r.find(function(e) {
				return e.Value.indexOf(n._bibPrefixNew) !== -1 || e.Value.indexOf(n._bibPrefix) !== -1;
			});
			if (o) {
				let e = n.#c(o);
				typeof e == "object" && Object.keys(e).length > 0 && (a = JSON.stringify(e));
			}
			let s = r.filter(function(e) {
				return e.Value.indexOf(n._citPrefixNew) !== -1 || e.Value.indexOf(n._citPrefix) !== -1;
			}).map(function(r) {
				let a = n.#c(r), o = "";
				r.Value.indexOf(n._citPrefix) === -1 && (o = a.citationID);
				let s = new b(o);
				return i += e && t === o ? s.fillFromObject(e) : s.fillFromObject(a), n._storage.addCslCitation(s), {
					field: { ...r },
					cslCitation: s
				};
			});
			return {
				bibField: o,
				bibFieldValue: a,
				fieldsWithCitations: s
			};
		});
	}
	#u(e, t) {
		let n = this.#o();
		if (e && (n = p(this._bibPlaceholderIfEmpty)), this._cslStylesManager.isLastUsedStyleContainBibliography()) return this.citationDocService.addBibliography(n, t);
		throw "The current bibliographic style does not describe the bibliography";
	}
	#d(e, t) {
		return e ? (t.Content = p(this._bibPlaceholderIfEmpty), Asc.scope.bibStyle = {}) : t.Content = this.#o(), t;
	}
	async #f(e, t, n) {
		let r = document.createDocumentFragment(), i = document.createElement("div");
		r.appendChild(i);
		let a = [];
		for (let r = e.length - 1; r >= 0; r--) {
			let o = !!n, { field: s, cslCitation: c } = e[r], l = this._storage.getCitationsPre(c.citationID), u = this._storage.getCitationsPost(c.citationID), d = this._storage.getAllCitationsInJson();
			this._formatter.rebuildProcessorState(d);
			let f = this._formatter.processCitationCluster(c.toJSON(), l, u), m = this.#m(f[1][0][1]);
			i.innerHTML = m;
			let h = c.getPlainCitation(), g = s.Content;
			h === "" && (h = g);
			let _ = i.innerText;
			if (!c.getDoNotUpdate()) {
				if (h !== g && !t) {
					let e = "<p>" + p("You have modified this citation since Zotero generated it. Do you want to keep your modifications and prevent future updates?") + "</p><p>" + p("Clicking „Yes“ will prevent Zotero from updating this citation if you add additional citations, switch styles, or modify the item to which it refers. Clicking „No“ will erase your changes.") + "</p><p>" + p("Original:") + " " + _ + "</p><p>" + p("Modified:") + " " + g + "</p>";
					await this.#e.show("Saving custom edits", e) ? (c.setDoNotUpdate(), delete s.Content) : (s.Content = m, c.setPlainCitation(_)), o = !0;
				} else (_ !== g || h !== g || h !== _) && (o = !0), s.Content = m, c.setPlainCitation(_);
				if (c) {
					let e = this._citPrefixNew + " " + this._citSuffixNew + JSON.stringify(c.toJSON());
					s.Value !== e && (o = !0), s.Value = e;
				}
				o && a.push(s);
			}
		}
		return a;
	}
	#p() {
		let e = this, t = [];
		this._storage.forEachItem(function(e, n) {
			t.push(n);
		});
		let n = {
			retrieveLocale: function(t) {
				return e._localesManager.getLocale(t) ? e._localesManager.getLocale(t) : e._localesManager.getLocale();
			},
			retrieveItem: function(t) {
				let n = e._storage.getItem(t), r = e._storage.getItemIndex(t);
				return n ? n.toFlatJSON(r, e.#t) : null;
			}
		};
		this.#n.isLoaded() && this._cslStylesManager.getAbbreviateJournalTitles() && (n.getAbbreviation = this.#n.createCiteprocHook()), this._formatter = new CSL.Engine(n, this._cslStylesManager.cached(this._cslStylesManager.getLastUsedStyleIdOrDefault()), this._localesManager.getLastUsedLanguage(), !0), t.length && this._formatter.updateItems(t);
	}
	#m(e) {
		return e.replace(/\u00A0/g, " ").replace(/&#60;/g, "<").replace(/&#62;/g, ">").replace(/&#38;/g, "&");
	}
	async getCurrentField() {
		return this.citationDocService.getCurrentField();
	}
	async saveAsText() {
		let e = await this.citationDocService.saveAsText();
		return e && this.showSuccessMessage("All active Zotero citations and Bibliography have been replaced."), e;
	}
	async insertSelectedCitations(e) {
		let t = this;
		await this.#l(), this.#p();
		let n = new b("");
		for (var r in e) {
			let t = e[r];
			n.fillFromObject(t);
		}
		return this.#a(e).then((e) => (e.forEach(function(e) {
			n.fillFromObject(e);
		}), this._storage.addCslCitation(n), t.#r(n)));
	}
	async insertSelectedCitationsToCurrentField(e, t) {
		let n = this.#c(t), r = n.citationID, i = new b("");
		i.fillFromObject(n);
		for (let t in e) {
			let n = e[t];
			i.fillFromObject(n);
		}
		(await this.#a(e)).forEach(function(e) {
			i.fillFromObject(e);
		});
		let { fieldsWithCitations: a } = await this.#l(i.toJSON(), r);
		this.#p();
		let o = a.find((e) => e.cslCitation.citationID === r)?.cslCitation;
		if (!o) throw Error("Citation not found");
		return this.#i(o).then((e) => (t.Content = e, t.Value = this._citPrefixNew + " " + this._citSuffixNew + JSON.stringify(o.toJSON()), t));
	}
	async insertBibliography() {
		try {
			let { fieldsWithCitations: e, bibFieldValue: t, bibField: n } = await this.#l(), r = e.length === 0;
			if (this.#p(), n) {
				let e = [await this.#d(r, n)];
				return this.citationDocService.updateAddinFields(e).then((e) => e ? e[0] : "");
			}
			return this.#u(r, t);
		} catch (e) {
			throw e;
		}
	}
	async moveCursorToField(e, t) {
		return this.citationDocService.moveCursorToField(e, t);
	}
	async moveCursorOutsideField(e, t) {
		return this.citationDocService.moveCursorOutsideField(e, t);
	}
	async moveCursorRight() {
		return this.citationDocService.moveCursorRight();
	}
	async updateCslItems(e) {
		try {
			let { fieldsWithCitations: t, bibField: n } = await this.#l(), r = t.length === 0;
			this.#p();
			let i = [];
			return e === void 0 && this._cslStylesManager.getLastUsedFormat() === "numeric" && (e = !0), typeof e == "boolean" && (i = await this.#f(t, e)), n && i.push(await this.#d(r, n)), i && i.length ? this.citationDocService.updateAddinFields(i) : [];
		} catch (e) {
			throw e;
		}
	}
	async updateCslItemsInNotes(e) {
		try {
			let { fieldsWithCitations: t, bibField: n } = await this.#l(), r = t.length === 0;
			this.#p();
			let i = await this.#f(t, !1);
			if (i && i.length && await this.citationDocService.convertNotesStyle(i, e), n) {
				let e = [await this.#d(r, n)];
				await this.citationDocService.updateAddinFields(e);
			}
		} catch (e) {
			throw e;
		}
	}
	async updateItem(e, t) {
		try {
			let { fieldsWithCitations: n, bibField: r } = await this.#l(e, e.citationID);
			n.length, this.#p(), e && (n = n.filter(function(t) {
				return t.cslCitation.citationID === e.citationID;
			}));
			let i = await this.#f(n, !0);
			return t && i && i.length && (await this.citationDocService.convertNotesStyle(i, t), i = []), i && i.length ? this.citationDocService.updateAddinFields(i) : [];
		} catch (e) {
			throw e;
		}
	}
	async switchingBetweenNotesAndText(e) {
		try {
			let { fieldsWithCitations: t, bibField: n } = await this.#l(), r = t.length === 0;
			this.#p();
			let i = await this.#f(t, !0);
			if (i && i.length && (e ? await this.citationDocService.convertTextToNotes(i, e) : await this.citationDocService.convertNotesToText(i)), n) {
				let e = [await this.#d(r, n)];
				await this.citationDocService.updateAddinFields(e);
			}
		} catch (e) {
			throw e;
		}
	}
	async convertNotesStyle(e) {
		try {
			let { fieldsWithCitations: t } = await this.#l();
			this.#p();
			let n = await this.#f(t, !1, !0);
			if (!n || !n.length) return;
			await this.citationDocService.convertNotesStyle(n, e);
		} catch (e) {
			throw e;
		}
	}
	getCitationItemIds(e) {
		let t = this.#c(e);
		return (t && t.citationItems || []).map(function(e) {
			return String(e.id);
		});
	}
	async showEditCitationWindow(e) {
		if (!e) return null;
		let t = this.#c(e);
		return await this.#e.showEditWindow(t) || null;
	}
	async showWarningMessage(e) {
		this.#e.showInfoWindow("Warning!", e);
	}
	async showSuccessMessage(e) {
		this.#e.showInfoWindow("Success!", e, "success");
	}
}, C = class {
	static getCursorPosition() {
		return new Promise(function(e) {
			Asc.plugin.callCommand(() => {
				let e = Api.GetDocument();
				if (!e) return 0;
				let t = e.GetCurrentRun();
				if (!t) return 0;
				let n = t.GetRange(0, 0);
				return n ? n.GetEndPos() : 0;
			}, !1, !1, e);
		});
	}
	static setCursorPosition(e) {
		return new Promise(function(t) {
			Asc.scope.pos = e, Asc.plugin.callCommand(function() {
				Api.GetDocument().MoveCursorToPos(Asc.scope.pos);
			}, !1, !1, t);
		});
	}
}, w = {
	getStyleInfo: function(e, t) {
		let n = {
			categories: {
				fields: [],
				format: ""
			},
			dependent: 0,
			href: "",
			name: e,
			title: "",
			updated: ""
		};
		try {
			let e = new DOMParser().parseFromString(t, "text/xml"), r = e.querySelector("info title");
			r && (n.title = r.textContent);
			let i = e.querySelector("info link[rel=\"self\"]");
			if (i) {
				let e = i.getAttribute("href");
				e && (n.href = e);
			}
			let a = e.querySelector("info link[rel=\"independent-parent\"]");
			if (a) {
				let e = a.getAttribute("href");
				e && (n.parent = e), n.dependent = 1;
			}
			let o = e.querySelector("info updated");
			o && (n.updated = o.textContent);
			let s = e.querySelector("info category[citation-format]");
			if (s) {
				let e = s.getAttribute("citation-format");
				e && (n.categories.format = e);
			}
			let c = e.querySelectorAll("info category[field]");
			c && c.forEach(function(e) {
				let t = e.getAttribute("field");
				t && n.categories.fields.push(t);
			});
		} catch (e) {
			console.error("Invalid style format"), console.error(e);
		}
		return n;
	},
	getCitationFormat: function(e) {
		try {
			let t = new DOMParser().parseFromString(e, "text/xml").querySelector("info category[citation-format]");
			if (!t) throw Error("Citation format not found");
			let n = t.getAttribute("citation-format");
			if (!n) throw Error("Citation format not found");
			switch (n) {
				case "note":
				case "numeric":
				case "author":
				case "author-date":
				case "label": return n;
			}
		} catch (e) {
			console.error("Invalid citation format"), console.error(e);
		}
		throw Error("Invalid citation format");
	},
	isStyleContainBibliography: function(e) {
		return e.indexOf("<bibliography") > -1;
	}
};
//#endregion
//#region src/app/csl/styles/storage.js
function T() {
	this._customStyleNamesKey = "zoteroCustomStyleNames", this._customStylesKey = "zoteroCustomStyles";
}
T.prototype.getStyleNames = function() {
	let e = localStorage.getItem(this._customStyleNamesKey);
	return e ? JSON.parse(e) : [];
}, T.prototype._getStyles = function() {
	let e = localStorage.getItem(this._customStylesKey);
	return e ? JSON.parse(e) : [];
}, T.prototype.getStyle = function(e) {
	let t = this.getStyleNames().indexOf(e);
	return t === -1 ? null : this._getStyles()[t];
}, T.prototype.getStylesInfo = function() {
	let e = this.getStyleNames(), t = this._getStyles(), n = [];
	for (let r = 0; r < e.length; r++) {
		let i = w.getStyleInfo(e[r], t[r]);
		n.push(i);
	}
	return n;
}, T.prototype.setStyle = function(e, t) {
	let n = this.getStyleNames(), r = this._getStyles(), i = n.indexOf(e);
	return i === -1 && (i = n.length), n[i] = e, r[i] = t, localStorage.setItem(this._customStyleNamesKey, JSON.stringify(n)), localStorage.setItem(this._customStylesKey, JSON.stringify(r)), w.getStyleInfo(e, t);
}, T.prototype.deleteStyle = function(e) {
	let t = this.getStyleNames(), n = this._getStyles(), r = t.indexOf(e);
	return r === -1 ? e : (t.splice(r, 1), n.splice(r, 1), localStorage.setItem(this._customStyleNamesKey, JSON.stringify(t)), localStorage.setItem(this._customStylesKey, JSON.stringify(n)), e);
};
//#endregion
//#region src/app/csl/styles/styles-manager.js
function E(e) {
	this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._customStylesStorage = new T(), this._STYLES_JSON_URL = "https://www.zotero.org/styles-files/styles.json", this._STYLES_JSON_LOCAL = "./resources/csl/styles.json", this._STYLES_URL = "https://www.zotero.org/styles/", this._STYLES_LOCAL = "./resources/csl/styles/", this._lastStyleKey = e, this._lastNotesStyleKey = "zoteroNotesStyleId", this._lastFormatKey = "zoteroFormatId", this._lastUsedStyleContainBibliographyKey = "zoteroContainBibliography", this._lastIncludeUrlForPaperArticlesKey = "zoteroIncludeUrlForPaperArticles", this._lastAbbreviateJournalTitlesKey = "zoteroAbbreviateJournalTitles", this._defaultStyles = [
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
E.prototype.addCustomStyle = function(e) {
	var t = this;
	return new Promise(function(t, n) {
		let r = e.name.toLowerCase();
		r.slice(-4) === ".csl" || r.slice(-4) === ".xml" ? r = r.substring(0, r.length - 4).trim() : n("Please select a .csl or .xml file."), e.size > 1048576 && n("Maximum file size is 1 MB."), t(r);
	}).then(function(n) {
		return t._readCSLFile(e).then(function(e) {
			return t._defaultStyles.indexOf(n) === -1 && t._defaultStyles.push(n), t._customStylesStorage.setStyle(n, e);
		});
	});
}, E.prototype.getLastUsedFormat = function() {
	let e = localStorage.getItem(this._lastFormatKey);
	switch (e) {
		case "note":
		case "numeric":
		case "author":
		case "author-date":
		case "label": return e;
	}
	return "numeric";
}, E.prototype.getLastUsedNotesStyle = function() {
	let e = localStorage.getItem(this._lastNotesStyleKey);
	return e === "footnotes" || e === "endnotes" ? e : "footnotes";
}, E.prototype.getLastUsedStyleId = function() {
	return localStorage.getItem(this._lastStyleKey) || null;
}, E.prototype.getLastUsedStyleIdOrDefault = function() {
	return localStorage.getItem(this._lastStyleKey) || "ieee";
}, E.prototype.getStyle = function(e, t = !0) {
	let n = this;
	return Promise.resolve(e).then(function(e) {
		if (n._cache[e]) return n._cache[e];
		if (n._customStylesStorage.getStyleNames().indexOf(e) !== -1) return n._customStylesStorage.getStyle(e);
		let t = n._STYLES_LOCAL + e + ".csl";
		if (n._isOnlineAvailable) t = n._STYLES_URL + e;
		else if (n._defaultStyles.indexOf(e) === -1) throw "The style is not available in the local version of the plugin.";
		return fetch(t).then(function(e) {
			return e.text();
		});
	}).then(function(t) {
		if (t && !n._isValidCSL(t) && n._isOnlineAvailable) {
			let n = w.getStyleInfo(e, t);
			if (n && n.dependent > 0 && n.parent) return fetch(n.parent).then(function(e) {
				return e.text();
			});
		}
		return t;
	}).then(function(r) {
		let i = r && w.getCitationFormat(r) || "numeric", a = {
			content: r,
			styleFormat: i
		};
		return r && t && n._saveLastUsedStyle(e, r, i), a;
	});
}, E.prototype.getStylesInfo = function() {
	let e = this;
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
}, E.prototype._getStylesJson = function() {
	let e = this._STYLES_JSON_LOCAL, t = e;
	return this._isOnlineAvailable && (t = this._STYLES_JSON_URL), fetch(t).then(function(e) {
		return e.json();
	}).catch(function(t) {
		return fetch(e).then(function(e) {
			return e.json();
		});
	});
}, E.prototype.cached = function(e) {
	return Object.hasOwnProperty.call(this._cache, e) ? this._cache[e] : null;
}, E.prototype.isLastUsedStyleContainBibliography = function() {
	return localStorage.getItem(this._lastUsedStyleContainBibliographyKey) !== "false";
}, E.prototype.isStyleDefault = function(e) {
	return this._defaultStyles.indexOf(e) >= 0;
}, E.prototype._isValidCSL = function(e) {
	return e.indexOf("<?xml") > -1 && e.indexOf("<style") > -1 && e.indexOf("<macro") > -1 && e.indexOf("citation") > -1;
}, E.prototype._readCSLFile = function(e) {
	let t = this;
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
}, E.prototype._saveLastUsedStyle = function(e, t, n) {
	this._cache[e] = t, localStorage.setItem(this._lastStyleKey, e), localStorage.setItem(this._lastFormatKey, n);
	let r = w.isStyleContainBibliography(t);
	localStorage.setItem(this._lastUsedStyleContainBibliographyKey, r.toString());
}, E.prototype.saveLastUsedNotesStyle = function(e) {
	localStorage.setItem(this._lastNotesStyleKey, e);
}, E.prototype.getIncludeUrlForPaperArticles = function() {
	return localStorage.getItem(this._lastIncludeUrlForPaperArticlesKey) !== "false";
}, E.prototype.saveIncludeUrlForPaperArticles = function(e) {
	localStorage.setItem(this._lastIncludeUrlForPaperArticlesKey, e ? "true" : "false");
}, E.prototype.getAbbreviateJournalTitles = function() {
	return localStorage.getItem(this._lastAbbreviateJournalTitlesKey) === "true";
}, E.prototype.saveAbbreviateJournalTitles = function(e) {
	localStorage.setItem(this._lastAbbreviateJournalTitlesKey, e ? "true" : "false");
}, E.prototype.setDesktopApiAvailable = function(e) {
	this._isDesktopAvailable = e;
}, E.prototype.setRestApiAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/csl/locales/locales-manager.js
function D() {
	this._isOnlineAvailable = !1, this._isDesktopAvailable = !1, this._LOCALES_URL = "https://raw.githubusercontent.com/citation-style-language/locales/master/", this._LOCALES_PATH = "./resources/csl/locales/", this._lastLanguageKey = "zoteroLang", this._selectedLanguage = null, this._cache = {};
}
D.prototype.loadLocale = function(e) {
	let t = this;
	if (this._selectedLanguage = e, this._cache[e]) return Promise.resolve(this._cache[e]);
	var n = this._getLocalesUrl() + "locales-" + e + ".xml";
	return fetch(n).catch(function(n) {
		return console.error("Failed to load locale:", n), fetch(t._LOCALES_PATH + "locales-" + e + ".xml");
	}).then(function(e) {
		return e.text();
	}).then(function(n) {
		return t._cache[e] = n, n;
	});
}, D.prototype.getLastUsedLanguage = function() {
	return this._selectedLanguage = this._selectedLanguage || localStorage.getItem(this._lastLanguageKey) || "en-US", this._selectedLanguage;
}, D.prototype.getLocale = function(e) {
	return e ? this._cache[e] ? this._cache[e] : null : this._selectedLanguage && this._cache[this._selectedLanguage] ? this._cache[this._selectedLanguage] : null;
}, D.prototype.saveLastUsedLanguage = function(e) {
	this._selectedLanguage = e, localStorage.setItem(this._lastLanguageKey, e);
}, D.prototype._getLocalesUrl = function() {
	return this._isOnlineAvailable ? this._LOCALES_URL : this._LOCALES_PATH;
}, D.prototype.setDesktopApiAvailable = function(e) {
	this._isDesktopAvailable = e;
}, D.prototype.setRestApiAvailable = function(e) {
	this._isOnlineAvailable = e;
};
//#endregion
//#region src/app/csl/abbreviations/abbreviations-manager.js
function O() {
	this._ABBREVIATIONS_PATH = "./resources/csl/abbreviations/medline-abbreviations.json", this._map = null, this._loadingPromise = null;
}
O.prototype.load = function() {
	if (this._map) return Promise.resolve();
	if (this._loadingPromise) return this._loadingPromise;
	let e = this;
	return this._loadingPromise = fetch(this._ABBREVIATIONS_PATH).then(function(e) {
		return e.json();
	}).then(function(t) {
		e._map = t;
	}).catch(function(t) {
		console.error("Failed to load MEDLINE journal abbreviations:", t), e._map = {};
	}), this._loadingPromise;
}, O.prototype.isLoaded = function() {
	return this._map !== null;
}, O.prototype.getJournalAbbreviation = function(e) {
	return !this._map || !e ? null : this._map[e.trim().toLowerCase()] || null;
}, O.prototype.createCiteprocHook = function() {
	let e = this;
	return function(t, n, r, i, a) {
		if (i === "container-title") {
			let t = e.getJournalAbbreviation(a);
			t && (n[r] || (n[r] = new this.AbbreviationSegments()), n[r][i] || (n[r][i] = {}), n[r][i][a] = t);
		}
		return r;
	};
};
//#endregion
//#region src/app/pages/settings.js
var k = [{
	id: "preview-book",
	type: "book",
	title: "The Art of Scientific Writing",
	author: [{
		family: "Miller",
		given: "Alex"
	}],
	issued: { "date-parts": [[2022]] },
	publisher: "North Star Press",
	"publisher-place": "New York",
	edition: "2",
	volume: "1",
	URL: "https://example.com/scientific-writing",
	accessed: { "date-parts": [[
		2024,
		3,
		15
	]] }
}, {
	id: "preview-article",
	type: "article-journal",
	title: "Designing Better Research Workflows",
	author: [{
		family: "Giannis",
		given: "Dimitris"
	}],
	issued: { "date-parts": [[
		2021,
		6,
		10
	]] },
	"container-title": "Journal of Computational Biology",
	volume: "14",
	issue: "3",
	page: "45-58",
	DOI: "10.1234/jdr.2021.14.3.45",
	URL: "https://example.com/research-workflows",
	accessed: { "date-parts": [[
		2024,
		3,
		15
	]] }
}];
function A(e, t) {
	if (this._router = e, this._displayNoneClass = t, this._saveBtn = new c("saveSettingsBtn", { variant: "primary" }), this._cancelBtn = new c("cancelBtn", { variant: "secondary" }), this._styleSelect = new d("styleSelectList", {
		placeholder: "Enter style name",
		sortable: !0
	}), this._styleSelectListOther = new d("styleSelectedListOther", {
		placeholder: "Enter style name",
		searchable: !0
	}), this._notesStyleWrapper = document.getElementById("notesStyle"), !this._notesStyleWrapper) throw Error("notesStyleWrapper not found");
	if (this._footNotes = new l("footNotes", { label: "Footnotes" }), this._endNotes = new l("endNotes", { label: "Endnotes" }), this._includeUrlWrapper = document.getElementById("includeUrlWrapper"), !this._includeUrlWrapper) throw Error("includeUrlWrapper not found");
	if (this._includeUrlCheckbox = new u("includeUrlForPaperArticles", { label: "Include URLs of paper articles" }), this._abbreviateJournalTitlesWrapper = document.getElementById("abbreviateJournalTitlesWrapper"), !this._abbreviateJournalTitlesWrapper) throw Error("abbreviateJournalTitlesWrapper not found");
	if (this._abbreviateJournalTitlesCheckbox = new u("abbreviateJournalTitles", { label: "Use MEDLINE journal abbreviations" }), this._cslFileInput = document.getElementById("cslFileInput"), !this._cslFileInput) throw Error("cslFileInput not found");
	if (this._languageSelect = new d("styleLangList", { placeholder: "Select language" }), this._previewWrapper = document.getElementById("previewWrapper"), !this._previewWrapper) throw Error("previewWrapper not found");
	this._cslStylesManager = new E("zoteroStyleId"), this._localesManager = new D(), this._abbreviationsManager = new O(), this._selectLists = [], this._onChangeState = function(e, t) {}, this._styleMessage = new s("styleMessage", { type: "error" }), this._langMessage = new s("langMessage", { type: "error" }), this._LANGUAGES = [
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
	], this._bNumFormat = !1, this._currentStyleContent = null, this._stateSettings = {
		style: "",
		notesStyle: "footnotes",
		styleFormat: "numeric",
		includeUrlForPaperArticles: !1,
		abbreviateJournalTitles: !1
	};
}
A.prototype.getLocalesManager = function() {
	return this._localesManager;
}, A.prototype.getStyleManager = function() {
	return this._cslStylesManager;
}, A.prototype.getAbbreviationsManager = function() {
	return this._abbreviationsManager;
}, A.prototype.getLocale = function() {
	return this._localesManager.getLocale();
}, A.prototype.getLastUsedStyleId = function() {
	return this._cslStylesManager.getLastUsedStyleId();
}, A.prototype.init = function() {
	let e = this;
	var t = this._cslStylesManager.getLastUsedStyleId() || "ieee";
	let n = this._localesManager.getLastUsedLanguage();
	this._addEventListeners(), this._languageSelect.addItems(this._LANGUAGES, n);
	let r = Promise.all([this._localesManager.loadLocale(n), this._abbreviationsManager.load()]).then(function() {
		return e._onStyleChange(t);
	});
	return Promise.all([r, this._loadStyles()]);
}, A.prototype.onChangeState = function(e) {
	this._onChangeState = e;
}, A.prototype.setDesktopApiAvailable = function(e) {
	this._localesManager.setDesktopApiAvailable(e), this._cslStylesManager.setDesktopApiAvailable(e);
}, A.prototype.setRestApiAvailable = function(e) {
	this._localesManager.setRestApiAvailable(e), this._cslStylesManager.setRestApiAvailable(e);
}, A.prototype._addEventListeners = function() {
	let e = this;
	this._saveBtn.subscribe(function(t) {
		if (t.type !== "button:click") return;
		let n = e._languageSelect.getSelectedValue();
		if (n === null) {
			console.error("No language selected");
			return;
		}
		let r = { ...e._stateSettings }, i = [];
		e._stateSettings.language !== n && (e._localesManager.saveLastUsedLanguage(n), i.push(e._localesManager.loadLocale(n).catch(function(t) {
			throw console.error(t), e._langMessage.show(p("Failed to load language")), t;
		})));
		let a = "footnotes";
		e._endNotes.getState().checked && (a = "endnotes"), e._stateSettings.notesStyle !== a && (e._cslStylesManager.saveLastUsedNotesStyle(a), e._cslStylesManager.getLastUsedFormat() === "note" && i.push(Promise.resolve()));
		let o = e._styleSelect.getSelectedValue();
		e._stateSettings.style !== o && o !== null && i.push(e._onStyleChange(o));
		let s = e._includeUrlCheckbox.getState().checked;
		e._stateSettings.includeUrlForPaperArticles !== s && (e._cslStylesManager.saveIncludeUrlForPaperArticles(s), i.push(Promise.resolve()));
		let c = e._abbreviateJournalTitlesCheckbox.getState().checked;
		e._stateSettings.abbreviateJournalTitles !== c && (e._cslStylesManager.saveAbbreviateJournalTitles(c), i.push(Promise.resolve())), i.length ? (e._showLoader(), Promise.all(i).then(function() {
			e._hide(), e._hideLoader();
			let t = {
				language: n,
				style: o || "ieee",
				notesStyle: a,
				styleFormat: e._cslStylesManager.getLastUsedFormat(),
				includeUrlForPaperArticles: s,
				abbreviateJournalTitles: c
			};
			e._onChangeState(t, r);
		}).catch(function(t) {
			e._hideLoader();
		})) : e._hide();
	}), this._cancelBtn.subscribe(function(t) {
		if (t.type !== "button:click") return;
		let n = e._languageSelect.getSelectedValue(), r = e._styleSelect.getSelectedValue();
		n !== null && e._localesManager.getLastUsedLanguage() !== n && e._languageSelect.selectItems(e._localesManager.getLastUsedLanguage(), !0), e._stateSettings.style !== r && r !== null ? (e._styleSelect.selectItems(e._stateSettings.style, !0), e._styleSelectListOther.selectItems(e._stateSettings.style, !0), e._onStyleChange(e._stateSettings.style, !0).then(function() {
			e._hide();
		})) : e._hide();
	}), this._cslFileInput.onchange = function(t) {
		if (!(t.target instanceof HTMLInputElement)) return;
		let n = t.target;
		if (n.files) {
			var r = n.files[0];
			if (!r) {
				console.error("No file selected");
				return;
			}
			e._cslStylesManager.addCustomStyle(r).then(function(t) {
				e._addStylesToList([t]);
			}).catch(function(t) {
				console.error(t), e._styleMessage.show(p("Invalid CSL style file"));
			}).finally(function() {
				e._hideLoader();
			});
		}
	}, this._styleSelect.subscribe(function(t) {
		if (t.type === "selectbox:change") {
			e._styleSelectListOther.selectItems(t.detail.current.toString(), !0), e._somethingWasChanged(), e._onStyleChange(t.detail.current.toString(), !0);
			return;
		}
		t.type === "selectbox:custom" && t.detail.current === "more_styles" && e._styleSelectListOther.openDropdown();
	}), e._styleSelectListOther.subscribe(function(t) {
		if (t.type !== "selectbox:change" || !t.detail.items) return;
		let n = t.detail.items[0];
		e._styleSelect.addItem(n.value, n.text, !0), e._somethingWasChanged(), e._onStyleChange(n.value, !0);
	}), this._languageSelect.subscribe(function(t) {
		t.type === "selectbox:change" && e._somethingWasChanged();
	}), this._footNotes.subscribe(function(t) {
		e._somethingWasChanged();
	}), this._endNotes.subscribe(function(t) {
		e._somethingWasChanged();
	}), this._includeUrlCheckbox.subscribe(function(t) {
		e._somethingWasChanged(), e._currentStyleContent && e._showPreview(e._currentStyleContent, e._localesManager.getLastUsedLanguage());
	}), this._abbreviateJournalTitlesCheckbox.subscribe(function(t) {
		e._somethingWasChanged(), e._currentStyleContent && e._showPreview(e._currentStyleContent, e._localesManager.getLastUsedLanguage());
	});
}, A.prototype._hideAllMessages = function() {
	this._langMessage.close(), this._styleMessage.close();
}, A.prototype._hide = function() {
	this._router.openMain();
}, A.prototype.show = function() {
	this._stateSettings = {
		language: this._localesManager.getLastUsedLanguage(),
		style: this._cslStylesManager.getLastUsedStyleIdOrDefault(),
		notesStyle: this._cslStylesManager.getLastUsedNotesStyle(),
		styleFormat: this._cslStylesManager.getLastUsedFormat(),
		includeUrlForPaperArticles: this._cslStylesManager.getIncludeUrlForPaperArticles(),
		abbreviateJournalTitles: this._cslStylesManager.getAbbreviateJournalTitles()
	}, this._saveBtn.disable(), this._router.openSettings(), this._stateSettings.notesStyle === this._endNotes.getState().value ? this._endNotes.check(!0) : this._footNotes.check(!0), this._stateSettings.includeUrlForPaperArticles ? this._includeUrlCheckbox.check(!0) : this._includeUrlCheckbox.uncheck(!0), this._stateSettings.abbreviateJournalTitles ? this._abbreviateJournalTitlesCheckbox.check(!0) : this._abbreviateJournalTitlesCheckbox.uncheck(!0), this._currentStyleContent && this._showPreview(this._currentStyleContent, this._stateSettings.language || this._localesManager.getLastUsedLanguage());
}, A.prototype._loadStyles = function() {
	let e = this;
	return this._cslStylesManager.getStylesInfo().then(function(t) {
		e._addStylesToList(t), e._styleSelect.addCustomItem("more_styles", "More Styles..."), e._styleSelect.addCustomItem("cslFileInput", "Add custom style...");
	}).catch(function(e) {
		console.error(e);
	});
}, A.prototype._addStylesToList = function(e) {
	let t = this;
	var n = this._cslStylesManager.getLastUsedStyleIdOrDefault();
	let r = e.map(function(e) {
		return [e.name, e.title];
	}), i = r.filter(function(e) {
		return !!(e[0] == n || t._cslStylesManager.isStyleDefault(e[0]));
	});
	this._styleSelect.addItems(i, n), this._styleSelectListOther.addItems(r, n);
}, A.prototype._somethingWasChanged = function() {
	this._saveBtn.enable();
}, A.prototype._showPreview = function(e, t) {
	if (!e) {
		this._previewWrapper.classList.add(this._displayNoneClass), this._previewWrapper.innerHTML = "";
		return;
	}
	try {
		let n = !this._includeUrlCheckbox.getState().checked, r = Object.fromEntries(k.map(function(e) {
			return [e.id, e];
		})), i = this._localesManager, a = {
			retrieveLocale: function(e) {
				return i.getLocale(e) || i.getLocale(t) || i.getLocale();
			},
			retrieveItem: function(e) {
				let t = r[e];
				if (!t) return null;
				let i = new v(e);
				return i.fillFromObject(t), i.toJSON(n);
			}
		};
		this._abbreviationsManager.isLoaded() && this._abbreviateJournalTitlesCheckbox.getState().checked && (a.getAbbreviation = this._abbreviationsManager.createCiteprocHook());
		let o = new CSL.Engine(a, e, t, !0);
		o.updateItems(k.map((e) => e.id));
		let s = o.makeBibliography(), c = s && s[0], l = s && s[1];
		if (!l || !l.length) {
			this._previewWrapper.classList.add(this._displayNoneClass), this._previewWrapper.innerHTML = "";
			return;
		}
		let u = document.createElement("div");
		u.className = "preview-title", u.textContent = p("Bibliography preview");
		let d = document.createElement("div");
		d.className = "preview-content", d.innerHTML = m.purifyHtml(l.join("")), this._applyBibliographyStyles(d, c), this._previewWrapper.innerHTML = "", this._previewWrapper.appendChild(u), this._previewWrapper.appendChild(d), this._previewWrapper.classList.remove(this._displayNoneClass);
	} catch (e) {
		console.error("Failed to render bibliography preview:", e), this._previewWrapper.classList.add(this._displayNoneClass), this._previewWrapper.innerHTML = "";
	}
}, A.prototype._applyBibliographyStyles = function(e, t) {
	if (!t) return;
	let n = e.querySelectorAll(".csl-entry");
	for (let e = 0; e < n.length; e++) {
		let r = n[e];
		r.style.clear = "both", t.entryspacing && (r.style.marginBottom = t.entryspacing + "em"), t.linespacing && (r.style.lineHeight = String(t.linespacing)), t.hangingindent && !t["second-field-align"] && (r.style.marginLeft = "2em", r.style.textIndent = "-2em");
	}
	if (t["second-field-align"]) {
		let n = (t.maxoffset || 0) + .5, r = e.querySelectorAll(".csl-left-margin");
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			t.style.float = "left", t.style.minWidth = n + "em";
		}
		let i = e.querySelectorAll(".csl-right-inline");
		for (let e = 0; e < i.length; e++) {
			let t = i[e];
			t.style.display = "block", t.style.marginLeft = n + "em";
		}
	}
}, A.prototype._styleRespondsToIncludeUrlToggle = function(e, t) {
	let n = this._localesManager, r = Object.fromEntries(k.map(function(e) {
		return [e.id, e];
	}));
	function i(i) {
		let a = new CSL.Engine({
			retrieveLocale: function(e) {
				return n.getLocale(e) || n.getLocale(t) || n.getLocale();
			},
			retrieveItem: function(e) {
				let t = r[e];
				if (!t) return null;
				let n = new v(e);
				return n.fillFromObject(t), n.toJSON(i);
			}
		}, e, t, !0);
		a.updateItems(k.map((e) => e.id));
		let o = a.makeBibliography(), s = o && o[1];
		return s ? s.join("") : "";
	}
	try {
		let e = i(!1);
		return i(!0) !== e;
	} catch (e) {
		return console.error("Failed to probe include-URL toggle:", e), !0;
	}
}, A.prototype._styleRespondsToAbbreviateJournalTitles = function(e, t) {
	if (!this._abbreviationsManager.isLoaded()) return !0;
	let n = this._abbreviationsManager, r = this._localesManager, i = !this._includeUrlCheckbox.getState().checked, a = Object.fromEntries(k.map(function(e) {
		return [e.id, e];
	}));
	function o(o) {
		let s = {
			retrieveLocale: function(e) {
				return r.getLocale(e) || r.getLocale(t) || r.getLocale();
			},
			retrieveItem: function(e) {
				let t = a[e];
				if (!t) return null;
				let n = new v(e);
				return n.fillFromObject(t), n.toJSON(i);
			}
		};
		o && (s.getAbbreviation = n.createCiteprocHook());
		let c = new CSL.Engine(s, e, t, !0);
		c.updateItems(k.map((e) => e.id));
		let l = c.makeBibliography(), u = l && l[1];
		return u ? u.join("") : "";
	}
	try {
		return o(!1) !== o(!0);
	} catch (e) {
		return console.error("Failed to probe abbreviate-journal-titles toggle:", e), !0;
	}
}, A.prototype._onStyleChange = function(e, t) {
	let n = this;
	return t && n._showLoader(), n._cslStylesManager.getStyle(e, !t).then(function(e) {
		let r = e.styleFormat;
		n._bNumFormat = r == "numeric", r === "note" ? n._notesStyleWrapper.classList.remove(n._displayNoneClass) : n._notesStyleWrapper.classList.add(n._displayNoneClass), n._currentStyleContent = e.content, n._showPreview(e.content, n._localesManager.getLastUsedLanguage()), e.content && n._styleRespondsToIncludeUrlToggle(e.content, n._localesManager.getLastUsedLanguage()) ? n._includeUrlWrapper.classList.remove(n._displayNoneClass) : n._includeUrlWrapper.classList.add(n._displayNoneClass), e.content && n._styleRespondsToAbbreviateJournalTitles(e.content, n._localesManager.getLastUsedLanguage()) ? n._abbreviateJournalTitlesWrapper.classList.remove(n._displayNoneClass) : n._abbreviateJournalTitlesWrapper.classList.add(n._displayNoneClass), t && n._hideLoader();
	}).catch(function(e) {
		throw console.error(e), typeof e == "string" && n._styleMessage.show(p(e)), t && n._hideLoader(), e;
	});
}, A.prototype._showLoader = function() {
	this._cancelBtn.disable(), this._saveBtn.disable(), this._styleSelect.disable(), this._languageSelect.disable();
}, A.prototype._hideLoader = function() {
	this._cancelBtn.enable(), this._saveBtn.enable(), this._styleSelect.enable(), this._languageSelect.enable();
};
//#endregion
//#region src/app/pages/login.js
function j(e, t) {
	if (this._router = e, this._sdk = t, this._apiKeyLoginField = new o("apiKeyField", {
		autofocus: !0,
		autocomplete: "on"
	}), this._saveApiKeyBtn = new c("saveApiKeyBtn", { disabled: !0 }), this._apiKeyMessage = new s("apiKeyMessage", { type: "error" }), this._useDesktopMessage = new s("useDesktopMessage", { type: "error" }), this._connectToLocalZotero = new c("connectToLocalZotero", { variant: "secondary" }), this._useDesktopApp = document.getElementById("useDesktopApp"), !this._useDesktopApp) throw Error("useDesktopApp not found");
	if (this._logoutLink = document.getElementById("logoutLink"), !this._logoutLink) throw Error("logoutLink not found");
	this._onAuthorized = function(e) {}, this._onChangeState = function(e) {}, this._onOpen = function() {};
}
j.prototype.init = function() {
	let e = this;
	this._addEventListeners();
	let t = !1, n = document.querySelectorAll(".for-zotero-online");
	r.runApisChecker(e._sdk).subscribe(function(r) {
		if (e._onChangeState(r), t || (t = !0, !r.desktopVersion && e._useDesktopApp && e._useDesktopApp.classList.add("hidden"), e._onOpen(), e._show()), r.online ? n.forEach(function(e) {
			e.classList.remove("hidden");
		}) : n.forEach(function(e) {
			e.classList.add("hidden");
		}), r.online && r.hasKey) {
			e._sdk.setIsOnlineAvailable(!0), e._hide(!0), e._onAuthorized(r);
			return;
		}
		if (r.desktop && r.hasPermission) {
			e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages(), e._onAuthorized(r);
			return;
		}
	});
	let i = {
		onOpen: function(t) {
			return e._onOpen = t, i;
		},
		onChangeState: function(t) {
			return e._onChangeState = t, i;
		},
		onAuthorized: function(t) {
			return e._onAuthorized = t, i;
		}
	};
	return i;
}, j.prototype._addEventListeners = function() {
	let e = this;
	this._apiKeyLoginField.subscribe(function(t) {
		t.type, t.type === "inputfield:input" && (e._apiKeyLoginField.getValue() ? e._saveApiKeyBtn.enable() : e._saveApiKeyBtn.disable());
	}), this._saveApiKeyBtn.subscribe(function(t) {
		t.type === "button:click" && e._tryToApplyKey();
	}), this._connectToLocalZotero.subscribe(function(t) {
		t.type === "button:click" && (e._showLoader(), r.checkStatus(e._sdk).then(function(t) {
			t.desktop && t.hasPermission ? (e._sdk.setIsOnlineAvailable(!1), e._hide(), e._hideAllMessages()) : t.desktop && !t.hasPermission ? e._useDesktopMessage.show(p("Connection to Zotero failed. Please enable external connections in Zotero: Edit → Settings → Advanced → Check \"Allow other applications on this computer to communicate with Zotero\"")) : t.desktop || e._useDesktopMessage.show(p("Connection to Zotero failed. Make sure Zotero is running."));
		}).finally(function() {
			e._hideLoader();
		}));
	}), this._logoutLink.onclick = function(t) {
		return e._sdk.clearSettings(), e._show(), !0;
	};
}, j.prototype._tryToApplyKey = function() {
	let e = this, t = e._apiKeyLoginField.getValue();
	t && (e._showLoader(), e._sdk.setApiKey(t).then(function() {
		r.successfullyLoggedInUsingApiKey(), e._hide(!0);
	}).catch(function(t) {
		console.error(t), e._apiKeyMessage.show(p("Invalid API key"));
	}).finally(function() {
		e._hideLoader();
	}));
}, j.prototype._hideAllMessages = function() {
	this._apiKeyMessage.close();
}, j.prototype._hide = function(e) {
	this._router.openMain(), e && this._logoutLink.classList.remove("hidden");
}, j.prototype._show = function() {
	this._router.openLogin(), this._logoutLink.classList.add("hidden");
}, j.prototype._showLoader = function() {
	this._saveApiKeyBtn.disable(), this._connectToLocalZotero.disable(), this._apiKeyLoginField.disable();
}, j.prototype._hideLoader = function() {
	this._saveApiKeyBtn.enable(), this._connectToLocalZotero.enable(), this._apiKeyLoginField.enable();
};
//#endregion
//#region src/app/shared/ui/search-filter.js
function M() {
	this._searchField = new o("searchField", {
		type: "text",
		autofocus: !0,
		showClear: !1
	}), this._filterButton = new c("filterButton", {
		variant: "secondary-icon",
		size: "small"
	}), this._librarySelectList = new d("librarySelectList", {
		placeholder: p("No items selected"),
		multiple: !0,
		description: p("Search in:")
	}), this._subscribers = [], this._addEventListeners();
}
M.prototype._addEventListeners = function() {
	let e = this;
	this._searchField.subscribe(function(t) {
		if (t.type === "inputfield:blur" || t.type === "inputfield:submit") {
			let n = e._getSelectedGroups();
			e._subscribers.forEach(function(e) {
				e(t.detail.value, n);
			});
		}
	}), this._filterButton.subscribe(function(t) {
		t.type === "button:click" && (e._librarySelectList.isOpen || (t.detail.originalEvent && t.detail.originalEvent.stopPropagation(), e._librarySelectList.openDropdown()));
	});
}, M.prototype.addGroups = function(e) {
	let t = this, n = localStorage.getItem("selectedGroups"), r = n ? JSON.parse(n).map(function(e) {
		return e.toString();
	}) : ["my_library", "group_libraries"], i = !1;
	e.forEach(function(e) {
		e.id = String(e.id);
	});
	let a = [{
		id: "my_library",
		name: p("My Library")
	}, {
		id: "group_libraries",
		name: p("Group Libraries")
	}];
	!i && a.forEach(function(e) {
		r.indexOf(e.id) !== -1 && (i = !0);
	}), !i && e.forEach(function(e) {
		r.indexOf(e.id.toString()) !== -1 && (i = !0);
	}), i || (r = ["my_library", "group_libraries"]);
	let o = function(e, n, r) {
		typeof e == "number" && (e = e.toString()), t._librarySelectList instanceof d && t._librarySelectList.addItem(e, n, r);
	};
	for (var s = 0; s < a.length; s++) {
		let e = a[s].id, t = a[s].name;
		o(e, t, r.indexOf(e) !== -1);
	}
	if (e.length === 0) return;
	this._librarySelectList.addSeparator();
	let c = r.indexOf("group_libraries") !== -1;
	for (var s = 0; s < e.length; s++) {
		let t = e[s].id, n = e[s].name;
		o(t, n, c || r.indexOf(t.toString()) !== -1);
	}
	this._selectedGroupsWatcher(a, e);
}, M.prototype._getSelectedGroups = function() {
	let e = this, t = this._librarySelectList.getSelectedValues();
	return (Array.isArray(t) === !1 || t.length === 0) && setTimeout(function() {
		e._librarySelectList.openDropdown();
	}, 500), t === null || typeof t == "string" ? [] : t;
}, M.prototype.subscribe = function(e) {
	var t = this;
	return this._subscribers.push(e), { unsubscribe: function() {
		t._subscribers = t._subscribers.filter(function(t) {
			return t !== e;
		});
	} };
}, M.prototype._selectedGroupsWatcher = function(e, t) {
	let n = this;
	this._librarySelectList instanceof d && this._librarySelectList.subscribe(function(r) {
		if (r.type !== "selectbox:change") return;
		let i = [], a = r.detail.values, o = r.detail.current, s = r.detail.enabled, c = e.map(function(e) {
			return e.id;
		}), l = t.map(function(e) {
			return e.id.toString();
		}), u = c.indexOf(String(o)) !== -1;
		u ? o === "group_libraries" ? (s ? (i.push("group_libraries"), n._librarySelectList.selectItems(l, !0)) : n._librarySelectList.unselectItems(l, !0), a.indexOf("my_library") !== -1 && i.push("my_library")) : a.indexOf("group_libraries") === -1 ? i = a.slice() : (i.push("group_libraries"), s && i.push(o)) : u || (l.every(function(e) {
			return a.indexOf(e) !== -1;
		}) ? (n._librarySelectList.selectItems("group_libraries", !0), i.push("group_libraries"), a.indexOf("my_library") !== -1 && i.push("my_library")) : (n._librarySelectList.unselectItems("group_libraries", !0), i = a.filter(function(e) {
			return e !== "group_libraries";
		}))), i.length === 0 ? localStorage.removeItem("selectedGroups") : localStorage.setItem("selectedGroups", JSON.stringify(i));
	});
};
//#endregion
//#region src/app/shared/constants/locator-values.js
var N = [
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
function P(e, t, n) {
	this._displayNoneClass = e, this._items = {}, this._html = {}, this._checks = {}, this._cancelSelectBtn = document.getElementById("cancelSelectBtn"), this._docsHolder = document.getElementById("docsHolder"), this._nothingFound = document.getElementById("nothingFound"), this._docsThumb = document.getElementById("docsThumb"), this._selectedWrapper = document.getElementById("selectedWrapper"), this._selectedHolder = document.getElementById("selectedHolder"), this._selectedInfo = document.getElementById("selectedInfo"), this._selectedCount = document.getElementById("selectedCount"), this._selectedThumb = document.getElementById("selectedThumb"), this._selectedHolder && this._selectedThumb && (this._selectedScroller = this._initScrollBox(this._selectedHolder, this._selectedThumb, 20)), this._docsHolder && this._docsThumb && (this._docsScroller = this._initScrollBox(this._docsHolder, this._docsThumb, 40, this._checkDocsScroll.bind(this))), this._lastSearch = null, this._subscribers = [], this._fShouldLoadMore = n, this._fLoadMore = t, this._loadTimeout, this._init();
}
//#endregion
//#region src/app/index.js
P.prototype._init = function() {
	let e = this;
	this._cancelSelectBtn && (this._cancelSelectBtn.onclick = function(t) {
		var n = [];
		for (var r in e._items) n.push(r);
		for (var i = 0; i < n.length; i++) e._removeSelected(n[i]);
	}), this._docsHolder && this._docsHolder.addEventListener("keydown", function(t) {
		(t.ctrlKey || t.metaKey) && t.key === "a" && (t.preventDefault(), (e._docsHolder?.querySelectorAll(".checkbox-container:not(.checkbox--checked)"))?.forEach(function(e) {
			e.click();
		}));
	});
}, P.prototype.clearLibrary = function() {
	this._nothingFound && this._nothingFound.classList.add(this._displayNoneClass);
	for (var e = this._docsHolder; e && e.lastChild;) e.removeChild(e.lastChild);
	e && (e.scrollTop = 0), this._docsScroller.onscroll();
}, P.prototype.displayNothingFound = function() {
	this.clearLibrary(), this._nothingFound && this._nothingFound.classList.remove(this._displayNoneClass);
}, P.prototype.displaySearchItems = function(e, t, n) {
	let r = this;
	var i = this._docsHolder;
	this._lastSearch = n;
	let a = 0;
	return new Promise((n, o) => {
		if (e && e.items && e.items.length > 0) {
			let t = document.createElement("div");
			i && t.classList.add("page" + i.children.length);
			for (let n = 0; n < e.items.length; n++) {
				let i = e.items[n];
				i.title && (t.appendChild(r._buildDocElement(i)), a++);
			}
			i && i.appendChild(t);
		} else t && o(t);
		this._docsScroller.onscroll(), n(a);
	});
}, P.prototype.getSelectedItems = function() {
	return Object.assign({}, this._items || {});
}, P.prototype.removeItems = function(e) {
	let t = this;
	e.forEach(function(e) {
		t._removeSelected(e);
	});
}, P.prototype.subscribe = function(e) {
	var t = this;
	return this._subscribers.push(e), { unsubscribe: function() {
		t._subscribers = t._subscribers.filter(function(t) {
			return t !== e;
		});
	} };
}, P.prototype._buildDocElement = function(e) {
	let t = this;
	var n = document.createElement("div");
	n.classList.add("doc");
	var r = document.createElement("div");
	r.classList.add("docInfo");
	var i = document.createElement("div");
	let a = "";
	e.author && e.author.length > 0 && (a = e.author.map(function(e) {
		return e.family && e.given ? e.family.trim() + ", " + e.given.trim() : e.family ? e.family.trim() : e.given ? e.given.trim() : "";
	}).join("; "));
	let o = document.createElement("div");
	o.classList.add("selectbox-arrow"), o.innerHTML = "<b></b>";
	var s = document.createElement("div");
	if (s.textContent = e.title.trim(), s.classList.add("truncate-text"), s.classList.add("secondary-text"), (e.publisher || e["publisher-place"]) && (s.textContent += " · " + (e.publisher || e["publisher-place"] || "")), e.issued && e.issued["date-parts"]) {
		var c = e.issued["date-parts"][0];
		a.length > 20 ? s.textContent += " (" + c.join("-") + ")" : (a.length > 0 && a.slice(-1) !== "." && a.slice(-1) !== "," && (a += "."), a += " " + c.join("-"));
	}
	a.length === 0 && (a = s.textContent), s.setAttribute("title", s.textContent), r.appendChild(s);
	let l = document.createElement("input");
	i.appendChild(l);
	let d = new u(l, {
		checked: !!this._items[e.id],
		label: a,
		title: !0,
		id: e.id
	});
	this._items[e.id] && (this._checks[e.id] = d), i.appendChild(o), n.appendChild(i), n.appendChild(r);
	let f;
	function p() {
		n.classList.toggle("doc-open"), f || (f = t._buildCitationParams(e), n.appendChild(f));
	}
	return o.onclick = p, d.subscribe(function(n) {
		n.type === "checkbox:change" && (n.detail.checked ? t._addSelected(e, d) : t._removeSelected(e.id));
	}), n;
}, P.prototype._buildCitationParams = function(e) {
	let t = localStorage.getItem("selectedLocator") || "page";
	e.label = t;
	let n = document.createDocumentFragment(), r = document.createElement("div"), i = document.createElement("input"), a = document.createElement("input"), s = document.createElement("div"), c = document.createElement("div"), l = document.createElement("input"), f = document.createElement("div"), m = document.createElement("input");
	n.appendChild(r), r.appendChild(i), r.appendChild(a), n.appendChild(s), s.appendChild(c), s.appendChild(l);
	let h = "";
	n.appendChild(f), f.appendChild(m);
	let g = new o(i, {
		type: "text",
		placeholder: p("Prefix")
	}), _ = new o(a, {
		type: "text",
		placeholder: p("Suffix")
	}), v = new d(c, {
		placeholder: p("Locator"),
		usePortal: !0,
		translate: p
	});
	N.forEach(function(e) {
		let n = e[0] === t;
		v.addItem(e[0], e[1], n), n && (h = e[1]);
	});
	let y = new o(l, {
		type: "text",
		placeholder: p(h)
	}), b = new u(m, { label: p("Omit Author") });
	return g.subscribe(function(t) {
		t.type === "inputfield:input" && (e.prefix = t.detail.value);
	}), _.subscribe(function(t) {
		t.type === "inputfield:input" && (e.suffix = t.detail.value);
	}), y.subscribe(function(t) {
		t.type === "inputfield:input" && (e.locator = t.detail.value);
	}), v.subscribe(function(t) {
		if (t.type !== "selectbox:change" || !t.detail.items) return;
		let n = t.detail.items[0];
		y.setPlaceholder(n.text), e.label = t.detail.values[0].toString(), localStorage.setItem("selectedLocator", e.label);
	}), b.subscribe(function(t) {
		t.type === "checkbox:change" && (e["suppress-author"] = t.detail.checked);
	}), n;
}, P.prototype._buildSelectedElement = function(e) {
	let t = this;
	var n = document.createElement("div");
	n.classList.add("selDoc");
	let r = document.createElement("span");
	r.textContent = e.author && e.author.length > 0 ? e.author.map(function(e) {
		return e.family + ", " + e.given;
	}).join("; ") : e.title, e.issued && e.issued["date-parts"] && (r.textContent += " " + e.issued["date-parts"][0].join("-")), r.setAttribute("title", r.textContent), n.appendChild(r);
	var i = document.createElement("span");
	return i.onclick = function() {
		t._removeSelected(e.id);
	}, i.innerHTML = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.0718 4.6333L11.564 5.14404L10.5483 6.1665L8.70459 8.02002L10.3862 9.7124L11.4829 10.8149L12.0308 11.3667L11.3218 12.0718L10.7729 11.52L9.67725 10.4175L7.99951 8.729L6.32275 10.4165L5.22705 11.52L4.67822 12.0718L3.96924 11.3667L4.51709 10.8149L5.61377 9.7124L7.29443 8.02002L5.45166 6.1665L4.43604 5.14404L3.92822 4.6333L4.63721 3.92822L5.14502 4.43896L6.16162 5.46143L7.99951 7.31104L9.83838 5.46143L10.855 4.43896L11.3628 3.92822L12.0718 4.6333Z\" fill=\"currentColor\" fill-opacity=\"0.8\"/></svg>", n.appendChild(i), n;
}, P.prototype._addSelected = function(e, t) {
	var n = this._buildSelectedElement(e);
	this._items[e.id] = e, this._html[e.id] = n, this._checks[e.id] = t, this._selectedHolder && this._selectedHolder.appendChild(n), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
}, P.prototype._checkDocsScroll = function(e, t) {
	let n = this;
	if (this._fShouldLoadMore(e)) {
		if (this._loadTimeout && clearTimeout(this._loadTimeout), !this._lastSearch.obj && !this._lastSearch.text.trim() && !this._lastSearch.groups.length) return;
		this._loadTimeout = setTimeout(function() {
			n._fShouldLoadMore(e) && n._fLoadMore();
		}, 500);
	}
}, P.prototype._initScrollBox = function(e, t, n, r) {
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
}, P.prototype._checkScroll = function(e, t, n, r) {
	let i = this._displayNoneClass;
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
}, P.prototype._removeSelected = function(e) {
	var t = this._html[e];
	this._selectedHolder && this._selectedHolder.removeChild(t), delete this._items[e], delete this._html[e], this._checks[e] && (this._checks[e].uncheck(!0), delete this._checks[e]), this._docsScroller.onscroll(), this._selectedScroller.onscroll(), this._checkSelected();
}, P.prototype._checkSelected = function() {
	let e = this.count();
	this._selectedInfo && this._selectedCount && this._selectedWrapper && (e <= 0 ? (this._selectedWrapper.classList.add(this._displayNoneClass), this._selectedInfo.classList.add(this._displayNoneClass)) : (this._selectedWrapper.classList.remove(this._displayNoneClass), this._selectedInfo.classList.remove(this._displayNoneClass), this._selectedCount.textContent = e + " " + p("selected")), this._subscribers.forEach(function(t) {
		t(e);
	}));
}, P.prototype.count = function() {
	var e = 0;
	for (var t in this._items) e++;
	return e;
}, (function() {
	let n = "hidden", r, i, o, s, l = {
		text: "",
		obj: null,
		groups: [],
		groupsHash: ""
	}, u = !1, d, m, h, g, _, v, y, b = new f("libLoader", p("Loading...")), x = {};
	function w() {
		let e = document.getElementById("errorWrapper");
		if (!e) throw Error("errorWrapper not found");
		let t = document.getElementById("mainState");
		if (!t) throw Error("mainState not found");
		d = new M(), m = new P(n, L, R), h = new c("saveAsTextBtn", { variant: "secondary" }), g = new c("insertLinkBtn", { disabled: !0 }), _ = new c("settingsBtn", {
			variant: "icon-only",
			size: "small"
		}), v = new c("insertBibBtn", { variant: "secondary" }), y = new c("refreshBtn", { variant: "secondary" }), x = {
			error: e,
			mainState: t
		};
	}
	window.Asc.plugin.init = function() {
		f.show(), w(), r = new t(), i = new a();
		let e = new j(r, i);
		o = new A(r, n), s = new S(o.getLocalesManager(), o.getStyleManager(), i, o.getAbbreviationsManager());
		let c = !1;
		D(), e.init().onOpen(function() {
			f.hide();
		}).onChangeState(function(e) {
			o.setDesktopApiAvailable(e.desktop), o.setRestApiAvailable(e.online);
		}).onAuthorized(function(e) {
			if (c) return;
			c = !0, f.show();
			let t = E().catch((e) => {
				console.error(e), k(p("An error occurred while loading library groups. Try restarting the plugin."));
			}), n = o.init().catch((e) => {
				console.error(e), k(p("An error occurred while loading settings. Try restarting the plugin.")), o.show();
			});
			Promise.all([t, n]).then(function() {
				return f.hide(), T();
			}).finally(function() {
				f.hide();
			});
		}), window.Asc.plugin.onTranslate = O, U().then((e) => {
			window.Asc.scope.editorVersion = e, W();
		}).catch((e) => {
			console.error(e);
		});
	};
	function T() {
		return b.show(), z(i.getItems(null).then((e) => (delete e.next, e)), !1).then((e) => {
			I(e > 0 ? "started" : "empty");
		}).catch((e) => {
			console.error(e);
		}).finally(() => {
			b.hide();
		});
	}
	function E() {
		return i.getUserGroups().then(function(e) {
			return d.addGroups(e), e;
		});
	}
	function D() {
		m.subscribe(H);
		function e(e, t, n) {
			m.clearLibrary();
			let r = [];
			return i.getUserGroups().then(function(a) {
				let o = t.filter(function(e) {
					return e !== "my_library" && e !== "group_libraries";
				});
				t.indexOf("my_library") !== -1 && r.push(z(i.getItems(e), !1));
				for (var s = 0; s < o.length; s++) r.push(z(i.getGroupItems(e, o[s]), !0));
				return l.text = e, l.obj = null, l.groups = [], l.groupsHash = n, r;
			});
		}
		d.subscribe(function(t, r) {
			t = t.trim();
			let i = r.join(",");
			x.mainState.classList.contains(n) || !t || t == l.text && i === l.groupsHash || r.length === 0 || e(t, r, i).catch(() => []).then(function(e) {
				return e.length && (b.show(), Promise.any(e).then(function() {
					b.hide();
				}).finally(function() {
					b.hide();
				})), Promise.allSettled(e);
			}).then(function(e) {
				let t = 0;
				e.forEach(function(e) {
					e.status === "fulfilled" && (t += e.value);
				}), t === 0 ? (I("empty"), m.displayNothingFound()) : I("not-empty");
			});
		}), y.subscribe(async function(e) {
			if (e.type !== "button:click") return;
			if (!o.getLastUsedStyleId()) {
				k(p("Style is not selected"));
				return;
			}
			if (!o.getLocale()) {
				k(p("Language is not selected"));
				return;
			}
			await N(!0, "Zotero (" + p("Updating citations") + ")");
			let t = s.updateCslItems.bind(s, !1), n = o.getStyleManager();
			n.getLastUsedFormat() === "note" && (t = s.updateCslItemsInNotes.bind(s, n.getLastUsedNotesStyle())), t().catch(function(e) {
				console.error(e);
				let t = p("Failed to refresh");
				typeof e == "string" && (t += ". " + p(e)), k(t);
			}).finally(function() {
				F(!1, "Zotero (" + p("Updating citations") + ")");
			});
		}), v.subscribe(async (e) => {
			if (e.type !== "button:click") return;
			if (!o.getLastUsedStyleId()) {
				k(p("Style is not selected"));
				return;
			}
			if (!o.getLocale()) {
				k(p("Language is not selected"));
				return;
			}
			await N(!1, "Zotero (" + p("Inserting bibliography") + ")");
			let t = "";
			s.insertBibliography().then(function(e) {
				t = e;
			}).catch(function(e) {
				console.error(e), s.showWarningMessage("Failed to insert bibliography"), typeof e == "string" && k(p(e));
			}).finally(function() {
				F(!1, "Zotero (" + p("Inserting bibliography") + ")"), t && s.moveCursorOutsideField(t);
			});
		}), g.subscribe(async (e) => {
			if (e.type !== "button:click") return;
			if (!o.getLastUsedStyleId()) {
				k(p("Style is not selected"));
				return;
			}
			if (!o.getLocale()) {
				k(p("Language is not selected"));
				return;
			}
			await N(!0, "Zotero (" + p("Inserting citation") + ")");
			let t = m.getSelectedItems(), n = !1, r = await s.getCurrentField();
			return r ? s.insertSelectedCitationsToCurrentField(t, r).then((e) => (m.removeItems(Object.keys(t)), G(e))).then((e) => {
				e && r && s.showSuccessMessage("Citation has been updated successfully");
			}).finally(async () => {
				F(!1, "Zotero (" + p("Inserting citation") + ")");
			}) : s.insertSelectedCitations(t).then(function(e) {
				return n = e, m.removeItems(Object.keys(t)), s.getCurrentField();
			}).then(function(e) {
				return r = e, n ? s.updateCslItems(!1) : s.updateCslItems();
			}).then(() => {
				if (n) return s.moveCursorRight();
				if (r) return s.moveCursorOutsideField(r.FieldId);
			}).catch(function(e) {
				console.error(e);
				let t = p("Failed to insert citation");
				typeof e == "string" && (t += ". " + p(e)), k(t);
			}).finally(async () => {
				F(!1, "Zotero (" + p("Inserting citation") + ")");
			});
		}), _.subscribe(function(e) {
			e.type === "button:click" && o.show();
		}), h.subscribe(async (e) => {
			e.type === "button:click" && (await N(!1, "Zotero (" + p("Saving as text") + ")"), s.saveAsText().then(function() {
				F(!1, "Zotero (" + p("Saving as text") + ")");
			}));
		}), o.onChangeState(async function(e, t) {
			await N(!0, "Zotero (" + p("Updating citations") + ")");
			let n = s.updateCslItems.bind(s, !0);
			[e.styleFormat, t.styleFormat].includes("note") && (n = e.styleFormat === t.styleFormat ? e.notesStyle === t.notesStyle ? s.updateCslItems.bind(s, !0) : s.convertNotesStyle.bind(s, e.notesStyle) : e.styleFormat === "note" ? s.switchingBetweenNotesAndText.bind(s, e.notesStyle) : s.switchingBetweenNotesAndText.bind(s)), n().catch(function(e) {
				console.error(e);
				let t = p("Failed to refresh");
				typeof e == "string" && (t += ". " + p(e)), k(t);
			}).finally(function() {
				F(!1, "Zotero (" + p("Updating citations") + ")");
			});
		});
	}
	Asc.plugin.onThemeChanged = function(t) {
		window.Asc.plugin.onThemeChangedBase(t), e.fixThemeForIE(t), e.addStylesForComponents(t);
		let n = "";
		n += ".link, .link:visited, .link:hover { color : " + window.Asc.plugin.theme["text-normal"] + " !important;}\n", n += ".doc { border-color: " + t["border-regular-control"] + "; background-color: " + t["background-normal"] + "; }\n", n += ".scrollThumb { box-shadow: 0 0 8px 8px " + t["highlight-button-hover"] + " inset; }\n", n += ".scrollThumb:active, .scrollThumb.scrolling { box-shadow: 0 0 8px 8px " + t["canvas-scroll-thumb-pressed"] + " inset; }\n", n += ".scrollThumb:hover { box-shadow: 0 0 8px 8px " + t["canvas-scroll-thumb-hover"] + " inset; }\n", (["theme-white", "theme-night"].indexOf(t.name) !== -1 || ["theme-white", "theme-night"].indexOf(t.Name) !== -1) && (n += ".doc { border-radius: 4px; }\n");
		let r = document.getElementById("pluginStyles");
		r ? r.innerHTML = n : (r = document.createElement("style"), r.id = "pluginStyles", r.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(r));
		let i = t.type || "light", a = document.body;
		a.classList.remove("theme-dark"), a.classList.remove("theme-light"), a.classList.add("theme-" + i);
	};
	function O() {
		let e = document.getElementsByClassName("i18n");
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			if (!(n instanceof HTMLElement)) continue;
			["placeholder", "title"].forEach((e) => {
				n.hasAttribute(e) && n.setAttribute(e, p(n.getAttribute(e) || ""));
			});
			let r = p(n.innerText.trim().replace(/\s+/g, " "));
			r && (n.innerText = r);
		}
	}
	function k(e) {
		e && typeof e == "string" ? (p(""), x.error.classList.remove(n), x.error.textContent = e, setTimeout(function() {
			window.onclick = function() {
				k(!1);
			};
		}, 100)) : (x.error.classList.add(n), x.error.textContent = "", window.onclick = null);
	}
	async function N(e, t) {
		u = !0, v.disable(), y.disable(), g.disable();
		let n = window.Asc.scope.editorVersion;
		n && n < 9004e3 ? window._cursorPosition = await C.getCursorPosition() : await new Promise((t) => {
			Asc.plugin.executeMethod("StartAction", ["GroupActions", {
				lockScroll: !0,
				keepSelection: e
			}], t);
		});
	}
	async function F(e, t) {
		u = !1, v.enable(), y.enable(), H();
		let n = window.Asc.scope.editorVersion;
		n && n < 9004e3 ? C.setCursorPosition(window._cursorPosition || 0) : await new Promise((t) => {
			Asc.plugin.executeMethod("EndAction", ["GroupActions", { scrollToTarget: e }], t);
		});
	}
	function I(e) {
		let t = document.getElementById("searchLabel");
		if (!t) {
			console.error("Search label not found");
			return;
		}
		let n = t.querySelector(".when-empty"), r = t.querySelector(".when-not-empty"), i = t.querySelector(".when-started");
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
			case "started": r.classList.remove("hidden"), i.classList.remove("hidden");
		}
	}
	function L() {
		console.warn("Loading more..."), l.obj && l.obj.next && z(l.obj.next(), !1);
		for (let e = 0; e < l.groups.length && l.groups[e].next; e++) z(i.getGroupItems(l.groups[e].next(), l.groups[e].id), !0);
	}
	function R(e) {
		if (r.getRoute() != "main" || e.scrollTop + e.clientHeight < e.scrollHeight) return !1;
		let t = !0;
		return l.groups.forEach(function(e) {
			e.next && (t = !1);
		}), !(!l.obj || !l.obj.next || !t || !l.obj && !l.text.trim() && !l.groups.length);
	}
	function z(e, t) {
		return e.then(function(e) {
			return B(e, null, t);
		}).catch(function(e) {
			return console.error(e), e.message && k(p(e.message)), B(null, e, t);
		}).then(function(e) {
			return e;
		});
	}
	function B(e, t, n) {
		let r = !1;
		!l.obj && e && e.items && !e.items.length && (r = !0), t ? (r && (l.obj = null, l.groups = []), l && l.obj && delete l.obj.next) : n && e && e.next ? l.groups.push(e) : l.obj = e && e.items.length ? e : null;
		let i = function(e) {
			if (!e.id) return e;
			let t = e.id.indexOf("/") + 1, n = e.id.lastIndexOf("/") + 1, r = e.id.indexOf("http");
			return t !== n && r === 0 && (e.uris ||= [], e.uris.push(e.id)), n && (e.id = e.id.substring(n)), e;
		};
		return e && e.items && e.items.length > 0 && (e.items = e.items.map((t) => (t = V(t), t[n ? "groupID" : "userID"] = e.id, i(t), t))), m.displaySearchItems(e, t, l);
	}
	function V(e) {
		if (e.id || !e.key) return e;
		let t = {
			id: e.key,
			title: e.data.title,
			type: e.data.itemType
		};
		return Object.hasOwnProperty.call(e, "url") && (t.URL = e.data.url), Object.hasOwnProperty.call(e, "volume") && (t.volume = e.data.volume), Object.hasOwnProperty.call(e, "language") && (t.language = e.data.language), Object.hasOwnProperty.call(e, "abstract") && (t.abstract = e.data.abstract), Object.hasOwnProperty.call(e, "note") && (t.note = e.data.note), Object.hasOwnProperty.call(e, "page") && (t.page = e.data.page), Object.hasOwnProperty.call(e, "shortTitle") && (t.shortTitle = e.data.shortTitle), Object.hasOwnProperty.call(e, "links") && (t.uris = [], Object.hasOwnProperty.call(e.links, "self") && t.uris.push(e.links.self.href), Object.hasOwnProperty.call(e.links, "alternate") && t.uris.push(e.links.alternate.href)), t;
	}
	function H(e) {
		e === void 0 && (e = m.count()), e <= 0 ? (g.disable(), g.setText(p("Insert/Edit Citation"))) : (!u && g.enable(), e > 1 ? g.setText(p("Insert " + e + " Citations")) : g.setText(p("Insert/Edit Citation")));
	}
	async function U() {
		try {
			let e = await new Promise((e) => {
				Asc.plugin.executeMethod("GetVersion", [], e);
			});
			e == "develop" && (e = "99.99.99");
			let t = e.split(".");
			for (; 3 > t.length;) t.push("0");
			return 1e6 * parseInt(t[0]) + 1e3 * parseInt(t[1]) + parseInt(t[2]);
		} catch (e) {
			return console.error(e), 99999999;
		}
	}
	function W() {
		let e = new Asc.ButtonContextMenu();
		e.text = "Edit citation", e.addCheckers("Target", "Selection"), e.attachOnClick(async function() {
			let e = await new Promise((e) => {
				window.Asc.plugin.executeMethod("GetCurrentAddinField", void 0, e);
			});
			await N(!1, "Zotero (" + p("Updating citations") + ")"), await G(e), await F(!1, "Zotero (" + p("Updating citations") + ")");
		}), Asc.Buttons.registerContextMenu();
	}
	async function G(e) {
		if (!e || !e.Value || e.Value.toLowerCase().indexOf("zotero_item") === -1) return s.showWarningMessage("No Zotero citation found at the cursor. Please click directly on a citation to edit it."), !1;
		let t = s.getCitationItemIds(e), n = await s.showEditCitationWindow(e);
		if (!n) return !1;
		let r = (n.citationItems || []).map((e) => String(e.id)), i = t.slice().sort().join("\0") !== r.slice().sort().join("\0"), a = s.updateItem.bind(s, n), c = o.getStyleManager(), l = c.getLastUsedFormat() === "note";
		return l && (a = s.updateItem.bind(s, n, c.getLastUsedNotesStyle())), a().then(() => {
			if (i) return s.updateCslItems(!l && void 0);
		}).then(() => (e && s.moveCursorOutsideField(e.FieldId), !0)).catch(function(e) {
			console.error(e);
			let t = p("Failed to insert citation");
			return typeof e == "string" && (t += ". " + p(e)), k(t), !1;
		});
	}
})();
//#endregion

//# sourceMappingURL=bundle.modern.js.map