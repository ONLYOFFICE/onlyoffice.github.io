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
function t(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function n(e, t, n, r, i, a, o) {
	try {
		var s = e[a](o), c = s.value;
	} catch (e) {
		n(e);
		return;
	}
	s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function r(e) {
	return function() {
		var t = this, r = arguments;
		return new Promise(function(i, a) {
			var o = e.apply(t, r);
			function s(e) {
				n(o, i, a, s, c, "next", e);
			}
			function c(e) {
				n(o, i, a, s, c, "throw", e);
			}
			s(void 0);
		});
	};
}
function i(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function a(e, t) {
	i(e, t), t.add(e);
}
function o(t) {
	var n, r;
	function i(n, r) {
		try {
			var o = t[n](r), s = o.value, c = s instanceof e;
			Promise.resolve(c ? s.v : s).then(function(e) {
				if (c) {
					var r = n === "return" ? "return" : "next";
					if (!s.k || e.done) return i(r, e);
					e = t[r](e).value;
				}
				a(o.done ? "return" : "normal", e);
			}, function(e) {
				i("throw", e);
			});
		} catch (e) {
			a("throw", e);
		}
	}
	function a(e, t) {
		switch (e) {
			case "return":
				n.resolve({
					value: t,
					done: !0
				});
				break;
			case "throw":
				n.reject(t);
				break;
			default: n.resolve({
				value: t,
				done: !1
			});
		}
		(n = n.next) ? i(n.key, n.arg) : r = null;
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
o.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, o.prototype.next = function(e) {
	return this._invoke("next", e);
}, o.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, o.prototype.return = function(e) {
	return this._invoke("return", e);
};
//#endregion
//#region src/app/shared/components/input.js
function s(e, t) {
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
s.prototype = {
	constructor: s,
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
function c(e, t) {
	if (typeof e == "string") {
		var n = document.getElementById(e);
		n instanceof HTMLElement && (e = n);
	}
	if (e instanceof HTMLElement) this.container = e;
	else throw Error("Invalid container element");
	this._options = Object.assign(this._options, t), this._isShow = !1;
}
c.prototype = {
	constructor: c,
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
function l(e, t) {
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
l.prototype = {
	constructor: l,
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
var d = /*#__PURE__*/ new WeakSet(), f = class {
	constructor(e, n) {
		if (a(this, d), typeof e == "string") {
			var r = document.getElementById(e);
			if (r instanceof HTMLSelectElement) e = r;
			else if (r instanceof HTMLElement) this._container = r;
			else throw Error("Invalid selectbox");
		} else e instanceof HTMLElement && (this._container = e);
		if (e instanceof HTMLSelectElement) this._selectbox = e, this._container = document.createElement("div");
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
				t(d, this, h).call(this, e);
			},
			search: (e) => {
				t(d, this, _).call(this, e);
			},
			close: (e) => {
				e.target instanceof HTMLElement && !this._container.contains(e.target) && !e.target.classList.contains("selectbox-option") && t(d, this, g).call(this);
			},
			keydown: (e) => {
				t(d, this, y).call(this, e);
			},
			dropdownClick: (e) => {
				t(d, this, x).call(this, e);
			},
			scrollCheck: () => {
				if (this._headerRectOnOpen) {
					var e = this._header.getBoundingClientRect();
					Math.abs(e.top - this._headerRectOnOpen.top) > 1 && t(d, this, g).call(this);
				}
			}
		}, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), t(d, this, p).call(this), t(d, this, m).call(this), t(d, this, b).call(this), D._.add(this);
	}
	openDropdown() {
		this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._headerRectOnOpen = this._header.getBoundingClientRect(), document.addEventListener("scroll", this._boundHandles.scrollCheck, !0), this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(function(e) {
			return function() {
				e.searchInput && e.searchInput.focus();
			};
		}(this), 100), t(d, this, b).call(this), t(d, this, C).call(this);
	}
	subscribe(e) {
		var t = this;
		return this._subscribers.push(e), { unsubscribe() {
			t._subscribers = t._subscribers.filter(function(t) {
				return t !== e;
			});
		} };
	}
	addItem(e, n, r) {
		if (r ||= !1, this._items.some((t) => t && t.value === e)) {
			var i = this._items.find((t) => t && t.value === e);
			i && (i.selected = r);
		} else this._items.push({
			value: e,
			text: n,
			selected: r
		}), this._options.sortable && this._items.sort((e, t) => e && t ? e.text.localeCompare(t.text) : e ? -1 : +!!t);
		r && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(e)), t(d, this, S).call(this);
	}
	addItems(e, n) {
		var r = this;
		e.forEach(function(e, t) {
			if (!r._items.some((t) => t && t.value === e[0])) {
				var i = n ? e[0] === n : t === 0;
				i && (r._options.multiple || r._selectedValues.clear(), r._selectedValues.add(e[0])), r._items.push({
					value: e[0],
					text: e[1],
					selected: i
				});
			}
		}, this), this.isOpen && t(d, this, b).call(this), t(d, this, S).call(this);
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
		}), this._selectedValues.delete(e), t(d, this, S).call(this);
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
	selectItems(e, n) {
		var r = this;
		if (!this._options.multiple && Array.isArray(e)) {
			console.error("Method selectItem is only available for multi-select boxes.");
			return;
		}
		var i = "";
		if (this._options.multiple) {
			var a = function(e) {
				if (r._optionsContainer) {
					var t = r._optionsContainer.querySelector("[data-value=\"" + e + "\"]");
					if (t) {
						var n = t.querySelector("input[type=\"checkbox\"]");
						n && n instanceof HTMLInputElement && (n.checked = !0), t.classList.add("selectbox-option-selected"), t.classList.add("checkbox--checked");
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
			t(d, this, g).call(this);
		}
		t(d, this, S).call(this), !n && t(d, this, w).call(this, i, !0);
	}
	unselectItems(e, n) {
		var r = this;
		if (!this._options.multiple) {
			console.error("Method unselectItem is only available for multi-select boxes.");
			return;
		}
		var i = "", a = function(e) {
			if (r._optionsContainer) {
				var t = r._optionsContainer.querySelector("[data-value=\"" + e + "\"]");
				if (t) {
					var n = t.querySelector("input[type=\"checkbox\"]");
					n && n instanceof HTMLInputElement && (n.checked = !1), t.classList.remove("selectbox-option-selected"), t.classList.remove("checkbox--checked");
				}
			}
		};
		if (Array.isArray(e)) for (var o = 0; o < e.length; o++) i = e[o], this._selectedValues.has(i) && (this._selectedValues.delete(i), a(i));
		else i = e, this._selectedValues.has(i) && (this._selectedValues.delete(i), a(i));
		t(d, this, S).call(this), !n && t(d, this, w).call(this, i, !0);
	}
	disable() {
		this._select.classList.add("selectbox-disabled");
	}
	enable() {
		this._select.classList.remove("selectbox-disabled");
	}
	clear(e) {
		if (e ||= !1, this._selectedValues.clear(), e && this._items.length > 0) {
			var n = this._items[0];
			n && this._selectedValues.add(n.value);
		}
		t(d, this, S).call(this), t(d, this, b).call(this);
	}
	destroy() {
		this._subscribers = [], D._.delete(this);
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
function p() {
	this._container.innerHTML = "", this._container.className += " selectbox-container";
	var e = document.createDocumentFragment();
	if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), e.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text i18n", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._options.usePortal && (this._dropdown.className += " selectbox-fixed"), this._select.appendChild(this._dropdown), this._options.description) {
		var n = document.createElement("div");
		n.className += " i18n selectbox-description", n.textContent = this._options.description, this._dropdown.appendChild(n);
	}
	if (this._options.searchable) {
		var r = document.createElement("div");
		r.className += " selectbox-search", this._dropdown.appendChild(r), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", r.appendChild(this.searchInput);
	}
	if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(e), this._selectbox) {
		var i = this._selectbox.parentNode;
		if (i) {
			i.insertBefore(this._container, this._selectbox);
			var a = t(d, this, E).call(this, this._selectbox);
			this.addItems(a.values, a.selectedValue), this._selectbox.remove();
		}
	}
}
function m() {
	this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(e) {
		e.stopPropagation();
	}), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function h(e) {
	if (e && e.stopPropagation(), this.isOpen ? t(d, this, g).call(this) : this.openDropdown(), e && e.type === "click") for (var n of D._) n.isOpen && n !== this && t(d, n, g).call(n);
}
function g() {
	this.isOpen && document && this._boundHandles && (document.removeEventListener("click", this._boundHandles.close), document.removeEventListener("scroll", this._boundHandles.scrollCheck, !0)), this.isOpen = !1, this._dropdown.style.display = "none", this._options.usePortal ? (this._dropdown.style.left = "", this._dropdown.style.width = "", this._dropdown.style.top = "") : this._dropdown.classList.remove("selectbox-dropdown-top");
	for (var e = this._arrow.className.split(" "), t = [], n = 0; n < e.length; n++) e[n] !== "selectbox-arrow-open" && t.push(e[n]);
	this._arrow.className = t.join(" ");
	for (var r = this._header.className.split(" "), i = [], n = 0; n < r.length; n++) r[n] !== "selectbox-header-open" && i.push(r[n]);
	this._header.className = i.join(" "), this.searchInput && (this.searchInput.value = "");
}
function _(e) {
	var n = e.target;
	if (n instanceof HTMLInputElement) {
		var r = n.value.toLowerCase();
		t(d, this, b).call(this, r);
	}
}
function v(e) {
	var n = this.searchInput ? this.searchInput.value.toLowerCase() : "", r, i = this._items.filter(function(e) {
		return e !== null;
	});
	if (n && (i = i.filter(function(e) {
		return e.text.toLowerCase().indexOf(n) !== -1;
	})), i.length !== 0) {
		if (e === "up") if (this._selectedValues.size === 0 && i.length > 0) r = i[i.length - 1], this._selectedValues.add(r.value);
		else {
			for (var a = Array.from(this._selectedValues), o = -1, s = 0; s < i.length; s++) if (i[s].value === a[0]) {
				o = s;
				break;
			}
			var c = (o - 1 + i.length) % i.length;
			this._selectedValues.clear(), r = i[c], this._selectedValues.add(r.value);
		}
		else if (this._selectedValues.size === 0 && i.length > 0) r = i[0], this._selectedValues.add(r.value);
		else {
			for (var a = Array.from(this._selectedValues), o = -1, s = 0; s < i.length; s++) if (i[s].value === a[0]) {
				o = s;
				break;
			}
			var l = (o + 1) % i.length;
			l === i.length && (l = 0), this._selectedValues.clear(), r = i[l], this._selectedValues.add(r.value);
		}
		t(d, this, S).call(this), t(d, this, b).call(this, n, !0), t(d, this, w).call(this, r.value, !0);
	}
}
function y(e) {
	switch (e.key || e.keyCode) {
		case "Enter":
		case 13:
			e.preventDefault(), t(d, this, h).call(this, e);
			break;
		case "Escape":
		case 27:
			t(d, this, g).call(this);
			break;
		case "ArrowDown":
		case 40:
			e.preventDefault(), t(d, this, v).call(this, "down");
			break;
		case "ArrowUp":
		case 38:
			e.preventDefault(), t(d, this, v).call(this, "up");
			break;
		case "Tab":
		case 9:
			t(d, this, g).call(this);
			break;
	}
}
function b(e, t) {
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
function x(e) {
	var n = e.target || e.srcElement, r = null;
	if (n && n instanceof HTMLElement) {
		for (var i = null, a = n.className.split(" "), o = !1, s = 0; s < a.length; s++) if (a[s] === "selectbox-option") {
			o = !0;
			break;
		} else if (a[s] === "selectbox-custom-option") {
			var c = n.getAttribute("data-value");
			if (c) {
				e.stopPropagation(), t(d, this, T).call(this, c), t(d, this, g).call(this);
				return;
			}
			break;
		}
		if (o) i = n;
		else if (n.parentNode && n.parentNode instanceof HTMLElement) {
			for (var l = n.parentNode.className.split(" "), u = !1, s = 0; s < l.length; s++) if (l[s] === "selectbox-option") {
				u = !0;
				break;
			} else if (l[s] === "selectbox-custom-option") {
				var f = n.parentNode.getAttribute("data-value");
				if (f) {
					e.stopPropagation(), t(d, this, T).call(this, f), t(d, this, g).call(this);
					return;
				}
				break;
			}
			u && (i = n.parentNode);
		}
		if (i instanceof HTMLDivElement) r = i;
		else return;
	} else return;
	var p = r.getAttribute("data-value");
	if (p !== null) {
		var m = !0;
		this._options.multiple ? this._selectedValues.has(p) ? (this.unselectItems(p, !0), m = !1) : this.selectItems(p, !0) : (this.selectItems(p, !0), t(d, this, g).call(this)), t(d, this, S).call(this), t(d, this, w).call(this, p, m);
	}
}
function S() {
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
function C() {
	var e = window.innerHeight;
	if (this._options.usePortal) {
		var t = this._header.getBoundingClientRect(), n = this._dropdown.offsetHeight;
		this._dropdown.style.left = t.left + "px", this._dropdown.style.width = t.width - 2 + "px";
		var r = e - t.bottom;
		r < n && t.top > r ? this._dropdown.style.top = t.top - n - 2 + "px" : this._dropdown.style.top = t.bottom + 2 + "px";
	} else this._dropdown.getBoundingClientRect().bottom > e && this._dropdown.classList.add("selectbox-dropdown-top");
}
function w(e, t) {
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
function T(e) {
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
function E(e) {
	var t = { values: Array.from(e.options).map((e) => [e.value, e.text]) }, n = e.value;
	return n && (t.selectedValue = n), t;
}
var D = { _: /* @__PURE__ */ new Set() };
document.getElementById("loader");
//#endregion
//#region src/app/shared/constants/locator-values.js
var O = [
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
], k = {
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
//#region src/app/edit-window.js
(function() {
	class e {
		constructor() {
			var e = document.querySelector(".container");
			if (!(e instanceof HTMLElement)) throw Error("container is not initialized");
			this._container = e, this.citationObject = null, this.forms = [];
		}
		createForm(e) {
			var t = document.createElement("form");
			t.classList.add("form"), t.classList.add("message-container"), this._container.appendChild(t);
			var n = document.createElement("button");
			n.className = "message-close i18n", n.textContent = "×", n.setAttribute("aria-label", "Close"), n.setAttribute("title", "Remove"), n.setAttribute("type", "button"), n.onclick = this.removeItem.bind(this, t, e.id), t.appendChild(n);
			var r = document.createElement("div");
			r.classList.add("title"), r.textContent = e.itemData.title, t.appendChild(r);
			var i = document.createDocumentFragment(), a = document.createElement("div"), o = document.createElement("input"), c = document.createElement("input"), l = document.createElement("div"), d = document.createElement("div"), p = document.createElement("input"), m = document.createElement("div"), h = document.createElement("input");
			i.appendChild(l), l.appendChild(d), l.appendChild(p);
			var g = "";
			i.appendChild(a), a.appendChild(o), a.appendChild(c), i.appendChild(m), m.appendChild(h);
			var _ = new s(o, {
				type: "text",
				placeholder: "Prefix",
				value: e.prefix,
				showClear: !1
			}), v = new s(c, {
				type: "text",
				placeholder: "Suffix",
				value: e.suffix,
				showClear: !1
			}), y = new f(d, {
				placeholder: "Locator",
				translate: Asc.plugin.tr
			}), b = e.label || "page";
			O.forEach(function(e) {
				var t = e[0] === b;
				y.addItem(e[0], e[1], t), t && (g = e[1]);
			});
			var x = new s(p, {
				type: "text",
				placeholder: g,
				value: e.locator,
				showClear: !1
			}), S = new u(h, {
				label: "Omit Author",
				checked: !!e["suppress-author"]
			});
			y.subscribe(function(e) {
				if (!(e.type !== "selectbox:change" || !e.detail.items)) {
					var t = e.detail.items[0];
					x.setPlaceholder(t.text);
				}
			}), this.forms.push({
				omitAuthorInput: S,
				prefixInput: _,
				suffixInput: v,
				locatorInput: x,
				locatorSelectbox: y
			}), t.appendChild(i);
		}
		updateRemoveButtonsVisibility() {
			if (this.citationObject) {
				var e = this.citationObject.citationItems.length;
				e > 1 ? this._container.classList.remove("hide-remove-button") : this._container.classList.add("hide-remove-button");
				var t = document.querySelector("form")?.offsetHeight || 134, n = e === 1 ? t + 16 : 2 * t;
				window.Asc.plugin.sendToPlugin("onUpdateHeight", n);
			}
		}
		removeItem(e, t) {
			this.citationObject && (this.citationObject.citationItems = this.citationObject.citationItems.filter((e) => e.id !== t), this._container.removeChild(e), this.updateRemoveButtonsVisibility());
		}
		onTranslate() {
			for (var e = document.getElementsByClassName("i18n"), t = function() {
				var t = e[n];
				if (!(t instanceof HTMLElement)) return 1;
				["placeholder", "title"].forEach((e) => {
					t.hasAttribute(e) && t.setAttribute(e, window.Asc.plugin.tr(t.getAttribute(e) || ""));
				});
				var r = window.Asc.plugin.tr(t.innerText.trim().replace(/\s+/g, " "));
				r && (t.innerText = r);
			}, n = 0; n < e.length; n++) if (t()) continue;
		}
		onThemeChanged(e) {
			window.Asc.plugin.onThemeChangedBase(e), k.fixThemeForIE(e), k.addStylesForComponents(e);
			var t = "";
			t += "body { background-color: " + e["background-normal"] + " !important;}\n";
			var n = document.getElementById("pluginStyles");
			n ? n.innerHTML = t : (n = document.createElement("style"), n.id = "pluginStyles", n.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(n));
		}
		onAttachedContent(e) {
			var t = this;
			return r(function* () {
				if (t.citationObject = e, t.citationObject) {
					t.citationObject.citationItems.forEach((e) => {
						t.createForm(e);
					}), t.updateRemoveButtonsVisibility();
					for (var n = 0; n < 10; n++) {
						if (window.Asc.plugin.translateManager) {
							t.onTranslate(), n = 2 ** 53 - 1;
							break;
						}
						yield new Promise((e) => setTimeout(() => e(!0), 100));
					}
				}
			})();
		}
		onClickSave() {
			for (var e = !1, t = 0; t < this.forms.length; t++) {
				var n = this.forms[t], r = this.citationObject?.citationItems[t];
				if (r) {
					var i = n.prefixInput.getValue(), a = n.suffixInput.getValue(), o = n.locatorSelectbox.getSelectedValue(), s = n.locatorInput.getValue(), c = n.omitAuthorInput.getState().checked;
					(r.prefix || i) && r.prefix !== i && (r.prefix = i, e = !0), (r.suffix || a) && r.suffix !== a && (r.suffix = a, e = !0), (r.label || o) && r.label !== o && o && (r.label = o, e = !0), (r.locator || s) && r.locator !== s && (r.locator = s, e = !0), !!r["suppress-author"] !== c && (r["suppress-author"] = c, e = !0);
				}
			}
			return e;
		}
	}
	var t = new e();
	window.Asc.plugin.init = function() {
		window.Asc.plugin.sendToPlugin("onWindowReady", {});
	}, window.Asc.plugin.onThemeChanged = t.onThemeChanged.bind(t), window.Asc.plugin.attachEvent("onThemeChanged", t.onThemeChanged.bind(t)), window.Asc.plugin.attachEvent("onAttachedContent", t.onAttachedContent.bind(t)), window.Asc.plugin.attachEvent("onClickSave", () => {
		t.onClickSave() ? window.Asc.plugin.sendToPlugin("onSaveFields", t.citationObject) : window.Asc.plugin.sendToPlugin("onSaveFields", null);
	});
})();
//#endregion

//# sourceMappingURL=edit-window.modern.js.map