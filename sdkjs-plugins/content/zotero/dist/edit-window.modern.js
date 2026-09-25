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
//#region src/app/shared/components/input.js
function e(e, t) {
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
e.prototype = {
	constructor: e,
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
		n.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.tabIndex = -1, this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z\" fill=\"currentColor\"/></svg>", r.appendChild(this._searchIcon)), e && e.insertBefore(t, this.input), r.appendChild(this.input);
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
		this._clearButton && (this.input.value.length > 0 ? (this._clearButton.style.display = "block", this._clearButton.tabIndex = 0) : (this._clearButton.style.display = "none", this._clearButton.tabIndex = -1));
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
		this._container.textContent = "", this._container.className = this._container.className.split(" ").filter(function(e) {
			return e !== "input-field-container";
		}).join(" ");
	}
};
//#endregion
//#region src/app/services/translate-service.js
function t(e) {
	try {
		return window.Asc.plugin.tr(e);
	} catch (t) {
		return console.error(t), e;
	}
}
//#endregion
//#region src/app/shared/components/message.js
function n(e, t) {
	if (typeof e == "string") {
		var n = document.getElementById(e);
		n instanceof HTMLElement && (e = n);
	}
	if (e instanceof HTMLElement) this.container = e;
	else throw Error("Invalid container element");
	this._options = Object.assign(this._options, t), this._isShow = !1;
}
n.prototype = {
	constructor: n,
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
		let n = this._options.title;
		if (!n) switch (n = t("Error"), this._options.type) {
			case "success":
				n = t("Success");
				break;
			case "warning":
				n = t("Warning");
				break;
			case "info": n = t("Information");
		}
		let r = this._options.text;
		if (!r) switch (r = "", this._options.type) {
			case "success":
				r = t("Operation completed successfully");
				break;
			case "warning":
				r = t("Please be cautious");
				break;
			case "error": r = t("Something went wrong");
		}
		if (e.innerHTML = "<div class=\"message-content\"><span class=\"message-title\">" + n + "</span><span class=\"message-text\">" + r + "</span></div>", this._options.closeButton) {
			var i = document.createElement("button");
			i.className = "message-close", i.textContent = "×", i.setAttribute("aria-label", "Close"), i.onclick = this.close.bind(this), e.appendChild(i);
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
function r(e, t) {
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
r.prototype = {
	constructor: r,
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
		this._container.textContent = "";
		var e = this._container.className.split(" ").filter(function(e) {
			return e !== "custom-button-container";
		}).join(" ");
		this._container.className = e;
	}
};
//#endregion
//#region src/app/shared/components/checkbox.js
function i(e, t) {
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
i.prototype = {
	constructor: i,
	_container: null,
	_input: null,
	_visualCheckbox: null,
	_labelElement: null,
	_createDOM: function(e) {
		var t = e.parentNode, n = document.createDocumentFragment();
		this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._input = e;
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
var a = class e {
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
		this._container.textContent = "", this._container.className += " selectbox-container";
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
			this._optionsContainer.textContent = "";
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
		this._container.textContent = "";
		for (var t = this._container.className.split(" "), n = [], r = 0; r < t.length; r++) t[r] !== "selectbox-container" && n.push(t[r]);
		this._container.className = n.join(" ");
	}
};
(class {
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
});
//#endregion
//#region src/app/shared/constants/locator-values.js
var o = [
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
], s = {
	addStylesForComponents: function(e) {
		let t = "";
		e["background-toolbar"] && (t += ".loader-body,\n.loader-bg { background-color: " + e["background-toolbar"] + "; }\n", t += ".loader-body {     box-shadow: 0 0 99px 99px " + e["background-toolbar"] + "; }\n"), e["background-loader"] && (t += ".loader-image { color: " + e["background-loader"] + "; }\n"), e["background-normal"] && (t += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n#previewWrapper, \n.message { background-color: " + e["background-normal"] + "; }\n", t += ".custom-button-primary:focus-visible { box-shadow: 0 0 0 1px inset " + e["background-normal"] + "; }\n"), e["text-inverse"] && (t += ".custom-button-primary { color: " + e["text-inverse"] + "; }\n"), e["border-regular-control"] && (t += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n#previewWrapper,\n.message { border-color: " + e["border-regular-control"] + "; }\n", t += ".selectbox-search,\n.selectbox-option-divider { border-color: " + e["border-regular-control"] + " !important; }\n"), e["border-error"] && (t += ".input-field-invalid .input-field-element { border-color: " + e["border-error"] + "; }\n"), e["border-control-focus"] && (t += ".custom-button-icon-only:focus-visible,\n.custom-button-secondary-icon:focus-visible,\n.custom-button-secondary:focus-visible,\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus-visible,\n.link:focus-visible,\n.selectbox-arrow:focus-visible b,\n.selectbox-header-open { border-color: " + e["border-control-focus"] + "; }\n", t += ".link:focus-visible { color: " + e["border-control-focus"] + "; }\n", t += "input:focus-visible + .checkbox-visual,\ninput:focus-visible + .radio-visual { outline: 1px solid " + e["border-control-focus"] + "; }\n"), e["highlight-button-hover"] && (t += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + e["highlight-button-hover"] + "; }\n"), e["highlight-button-pressed"] && (t += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + e["highlight-button-pressed"] + "; }\n", t += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + e["highlight-button-pressed"] + "; }\n"), e["highlight-primary-dialog-button-hover"] && (t += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + e["highlight-primary-dialog-button-hover"] + "; border-color: " + e["highlight-primary-dialog-button-hover"] + "; }\n"), e["background-primary-dialog-button"] && (t += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + e["background-primary-dialog-button"] + "; border-color: " + e["background-primary-dialog-button"] + "; }\n"), e["background-toolbar-additional"] && (t += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + e["background-toolbar-additional"] + "; border-color: " + e["background-toolbar-additional"] + "; }\n"), e["text-normal"] && (t += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + e["text-normal"] + "; }\n", t += ".input-field-search-icon svg { fill: " + e["text-normal"] + "; }\n", t += ".selectbox-arrow b { border-color: " + e["text-normal"] + "; }\n"), e["text-secondary"] && (t += ".message-close:hover,\n.input-field-clear:hover { color: " + e["text-secondary"] + "; }\n"), e["text-tertiary"] && (t += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + e["text-tertiary"] + "; }\n");
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
//#region src/app/edit-window.js
(function() {
	class t {
		constructor() {
			let e = document.querySelector(".container");
			if (!(e instanceof HTMLElement)) throw Error("container is not initialized");
			this._container = e, this.citationObject = null, this.forms = [], this.bItemsRemoved = !1;
		}
		createForm(t) {
			let n = document.createElement("form");
			n.classList.add("form"), n.classList.add("message-container"), this._container.appendChild(n);
			var r = document.createElement("button");
			r.className = "message-close i18n", r.textContent = "×", r.setAttribute("aria-label", "Close"), r.setAttribute("title", "Remove"), r.setAttribute("type", "button"), r.onclick = this.removeItem.bind(this, n, t.id), n.appendChild(r);
			let s = document.createElement("div");
			s.classList.add("title"), s.textContent = t.itemData.title, n.appendChild(s);
			let c = document.createDocumentFragment(), l = document.createElement("div"), u = document.createElement("input"), d = document.createElement("input"), f = document.createElement("div"), p = document.createElement("div"), m = document.createElement("input"), h = document.createElement("div"), g = document.createElement("input");
			c.appendChild(f), f.appendChild(p), f.appendChild(m);
			let _ = "";
			c.appendChild(l), l.appendChild(u), l.appendChild(d), c.appendChild(h), h.appendChild(g);
			let v = new e(u, {
				type: "text",
				placeholder: "Prefix",
				value: t.prefix,
				showClear: !1
			}), y = new e(d, {
				type: "text",
				placeholder: "Suffix",
				value: t.suffix,
				showClear: !1
			}), b = new a(p, {
				placeholder: "Locator",
				translate: Asc.plugin.tr
			}), x = t.label || "page";
			o.forEach(function(e) {
				let t = e[0] === x;
				b.addItem(e[0], e[1], t), t && (_ = e[1]);
			});
			let S = new e(m, {
				type: "text",
				placeholder: _,
				value: t.locator,
				showClear: !1
			}), C = new i(g, {
				label: "Omit Author",
				checked: !!t["suppress-author"]
			});
			b.subscribe(function(e) {
				if (e.type !== "selectbox:change" || !e.detail.items) return;
				let t = e.detail.items[0];
				S.setPlaceholder(t.text);
			}), this.forms.push({
				omitAuthorInput: C,
				prefixInput: v,
				suffixInput: y,
				locatorInput: S,
				locatorSelectbox: b
			}), n.appendChild(c);
		}
		updateRemoveButtonsVisibility() {
			if (!this.citationObject) return;
			let e = this.citationObject.citationItems.length;
			e > 1 ? this._container.classList.remove("hide-remove-button") : this._container.classList.add("hide-remove-button");
			let t = document.querySelector("form")?.offsetHeight || 134, n = e === 1 ? t + 16 : 2 * t;
			window.Asc.plugin.sendToPlugin("onUpdateHeight", n);
		}
		removeItem(e, t) {
			if (!this.citationObject) return;
			let n = this.citationObject.citationItems.findIndex((e) => e.id === t);
			n !== -1 && (this.citationObject.citationItems.splice(n, 1), this.forms.splice(n, 1), this.bItemsRemoved = !0, this._container.removeChild(e), this.updateRemoveButtonsVisibility());
		}
		onTranslate() {
			let e = document.getElementsByClassName("i18n");
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (!(n instanceof HTMLElement)) continue;
				["placeholder", "title"].forEach((e) => {
					n.hasAttribute(e) && n.setAttribute(e, window.Asc.plugin.tr(n.getAttribute(e) || ""));
				});
				let r = window.Asc.plugin.tr(n.innerText.trim().replace(/\s+/g, " "));
				r && (n.innerText = r);
			}
		}
		onThemeChanged(e) {
			window.Asc.plugin.onThemeChangedBase(e), s.fixThemeForIE(e), s.addStylesForComponents(e);
			let t = "";
			t += "body { background-color: " + e["background-normal"] + " !important;}\n";
			let n = document.getElementById("pluginStyles");
			n ? n.innerHTML = t : (n = document.createElement("style"), n.id = "pluginStyles", n.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(n));
		}
		async onAttachedContent(e) {
			if (this.citationObject = e, this.citationObject) {
				this.citationObject.citationItems.forEach((e) => {
					this.createForm(e);
				}), this.updateRemoveButtonsVisibility();
				for (let e = 0; e < 10; e++) {
					if (window.Asc.plugin.translateManager) {
						this.onTranslate(), e = 2 ** 53 - 1;
						break;
					}
					await new Promise((e) => setTimeout(() => e(!0), 100));
				}
			}
		}
		onClickSave() {
			let e = !1;
			for (let t = 0; t < this.forms.length; t++) {
				let n = this.forms[t], r = this.citationObject?.citationItems[t];
				if (!r) continue;
				let i = n.prefixInput.getValue(), a = n.suffixInput.getValue(), o = n.locatorSelectbox.getSelectedValue(), s = n.locatorInput.getValue(), c = n.omitAuthorInput.getState().checked;
				(r.prefix || i) && r.prefix !== i && (r.prefix = i, e = !0), (r.suffix || a) && r.suffix !== a && (r.suffix = a, e = !0), (r.label || o) && r.label !== o && o && (r.label = o, e = !0), (r.locator || s) && r.locator !== s && (r.locator = s, e = !0), !!r["suppress-author"] !== c && (r["suppress-author"] = c, e = !0);
			}
			return e || this.bItemsRemoved;
		}
	}
	let n = new t();
	window.Asc.plugin.init = function() {
		window.Asc.plugin.sendToPlugin("onWindowReady", {});
	}, window.Asc.plugin.onThemeChanged = n.onThemeChanged.bind(n), window.Asc.plugin.attachEvent("onThemeChanged", n.onThemeChanged.bind(n)), window.Asc.plugin.attachEvent("onAttachedContent", n.onAttachedContent.bind(n)), window.Asc.plugin.attachEvent("onClickSave", () => {
		n.onClickSave() ? window.Asc.plugin.sendToPlugin("onSaveFields", n.citationObject) : window.Asc.plugin.sendToPlugin("onSaveFields", null);
	});
})();
//#endregion

//# sourceMappingURL=edit-window.modern.js.map