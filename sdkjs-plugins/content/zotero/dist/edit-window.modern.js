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
function InputField(t, e) {
  var n = this;
  if (e = e || {}, "string" == typeof t) {
    var i = document.getElementById(t);
    i instanceof HTMLInputElement && (t = i);
  }
  if (!(t instanceof HTMLInputElement)) throw new Error("Invalid input element");
  for (var s in this.input = t, this._container = document.createElement("div"), this._options = { type: e.type || t.type || "text", placeholder: e.placeholder || t.placeholder || "", value: e.value || t.value || "", autofocus: e.autofocus || false, disabled: e.disabled || false, readonly: e.readonly || false, required: e.required || false, showCounter: e.showCounter || false, showClear: void 0 === e.showClear || e.showClear, autocomplete: e.autocomplete || "off" }, e) this._options.hasOwnProperty(s) || (this._options[s] = e[s]);
  this._id = t.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = false, this.isValid = true, this._validationMessage = "", this._subscribers = [], this._boundHandles = { focus: function(t2) {
    n._handleFocus(t2);
  }, blur: function(t2) {
    n._handleBlur(t2);
  }, input: function(t2) {
    n._handleInput(t2);
  }, keydown: function(t2) {
    n._handleKeydown(t2);
  }, clear: function() {
    n.clear();
  }, validate: function() {
    n.validate();
  } }, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), "search" === this._options.type && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(/* @__PURE__ */ (function(t2) {
    return function() {
      t2.focus();
    };
  })(this), 100);
}
function Message(t, e) {
  if ("string" == typeof t) {
    var n = document.getElementById(t);
    n instanceof HTMLElement && (t = n);
  }
  if (!(t instanceof HTMLElement)) throw new Error("Invalid container element");
  this.container = t, this._options = Object.assign(this._options, e), this._isShow = false;
}
function Button(t, e) {
  var n = this;
  if ("string" == typeof t) {
    var i = document.getElementById(t);
    i instanceof HTMLButtonElement && (t = i);
  }
  if (!(t instanceof HTMLButtonElement)) throw new Error("Invalid button");
  this._button = t, this._container = document.createElement("div"), this._options = e || {}, this._options.text = this._options.text || t.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = false, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = { click: function(t2) {
    n._handleClick(t2);
  }, mouseenter: function() {
    n._handleMouseEnter();
  }, mouseleave: function() {
    n._handleMouseLeave();
  }, focus: function() {
    n._handleFocus();
  }, blur: function() {
    n._handleBlur();
  }, keydown: function(t2) {
    n._handleKeydown(t2);
  } }, this._createDOM(), this._bindEvents(), this.updateState();
}
function _assertClassBrand(t, e, n) {
  if ("function" == typeof t ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
  throw new TypeError("Private element is not present on this object");
}
function _checkPrivateRedeclaration(t, e) {
  if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateMethodInitSpec(t, e) {
  _checkPrivateRedeclaration(t, e), e.add(t);
}
function Checkbox(t, e) {
  if ("string" == typeof t) {
    var n = document.getElementById(t);
    n instanceof HTMLInputElement && (t = n);
  }
  if (t instanceof HTMLInputElement == false) throw new Error("Invalid input element");
  this._options = Object.assign({ id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)), checked: false, disabled: false, indeterminate: false, label: "", name: "", value: "on" }, e), this._options.disabled = e.disabled || false, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(t), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
InputField.prototype = { constructor: InputField, input: null, _container: null, _options: {}, _id: "", isFocused: false, isValid: true, _validationMessage: "", _subscribers: [], _boundHandles: null, _clearButton: null, _counter: null, _counterCurrent: null, _counterMax: null, _validationElement: null, _createDOM: function() {
  var t = this.input.parentNode, e = document.createDocumentFragment();
  e.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
  var n = document.createElement("div");
  this._container.appendChild(n), n.className += " input-field", this._options.disabled && (n.className += " input-field-disabled");
  var i = document.createElement("div");
  if (n.appendChild(i), i.className += " input-field-main", this.input.className += " input-field-element", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = true), this._options.readonly && (this.input.readOnly = true), this._options.required && (this.input.required = true), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
    this._counter = document.createElement("div"), n.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
    var s = document.createElement("span");
    s.textContent = "/", this._counter.appendChild(s), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
  }
  n.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), n.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', i.appendChild(this._searchIcon)), t && t.insertBefore(e, this.input), i.appendChild(this.input);
}, _bindEvents: function() {
  this.input.addEventListener("focus", this._boundHandles.focus), this.input.addEventListener("blur", this._boundHandles.blur), this.input.addEventListener("input", this._boundHandles.input), this.input.addEventListener("keydown", this._boundHandles.keydown), this._clearButton && this._clearButton.addEventListener("click", this._boundHandles.clear), this._options.showSearchIcon && this._boundHandles.search && this._searchIcon.addEventListener("click", this._boundHandles.search), this.input.addEventListener("change", this._boundHandles.validate);
}, _handleFocus: function(t) {
  this.isFocused = true, this._container.className += " input-field-focused", this._updateClearButton(), this._triggerFocusEvent(t);
}, _handleBlur: function(t) {
  this.isFocused = false;
  for (var e = this._container.className.split(" "), n = [], i = 0; i < e.length; i++) "input-field-focused" !== e[i] && n.push(e[i]);
  this._container.className = n.join(" "), this.validate(), this._triggerBlurEvent(t);
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
  var t = this.input.value, e = true, n = "";
  if (this._options.required && !t.trim() ? (e = false, n = "This field is required") : this._options.minLength && t.length < this._options.minLength ? (e = false, n = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && t.length > this._options.maxLength ? (e = false, n = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(t) && (e = false, n = "Invalid format"), e && "function" == typeof this._options.validation) {
    var i = this._options.validation(t);
    i && !i.isValid && (e = false, n = i.message || "Invalid value");
  }
  return this.isValid = e, this._validationMessage = n, this.updateValidationState(), e;
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
  }
  if (t.innerHTML = '<div class="message-content"><span class="message-title">' + e + '</span><span class="message-text">' + n + "</span></div>", this._options.closeButton) {
    var i = document.createElement("button");
    i.className = "message-close", i.textContent = "×", i.setAttribute("aria-label", "Close"), i.onclick = this.close.bind(this), t.appendChild(i);
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
  var n = this._create();
  return this._element = n, this.container.appendChild(n), setTimeout(function() {
    n.style.opacity = "1", n.style.transform = "translateY(0)";
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
    var n = document.createElement("span");
    n.className = "custom-button-icon", "left" === this._options.iconPosition ? (n.className += " custom-button-icon-left", this._button.appendChild(n), this._button.appendChild(this._buttonText)) : (n.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(n)), n.innerHTML = this._options.icon;
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
    var e = "custom-button-" + this._options.variant, n = "custom-button-" + t;
    this._button.className = this._button.className.split(" ").filter(function(t2) {
      return t2 !== e;
    }).join(" ") + " " + n, this._options.variant = t;
  }
}, setSize: function(t) {
  if (void 0 !== t) {
    var e = "custom-button-" + this._options.size, n = "custom-button-" + t;
    this._button.className = this._button.className.split(" ").filter(function(t2) {
      return t2 !== e;
    }).join(" ") + " " + n, this._options.size = t;
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
  (e = e || {}).button = this, this._subscribers.forEach(function(n) {
    n({ type: "button:" + t, detail: e });
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
} }, Checkbox.prototype = { constructor: Checkbox, _container: null, _input: null, _visualCheckbox: null, _labelElement: null, _createDOM: function(t) {
  var e = t.parentNode, n = document.createDocumentFragment();
  this._container = document.createElement("div"), n.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = t;
  var i = this._input.getAttribute("id");
  null !== i ? this._options.id = i : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = true), this._options.indeterminate && (this._input.indeterminate = true), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
  var s = "http://www.w3.org/2000/svg", o = document.createElementNS(s, "svg");
  o.setAttribute("viewBox", "0 0 10 8"), o.setAttribute("class", "checkbox-checkmark");
  var a = document.createElementNS(s, "path");
  a.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), a.setAttribute("fill", "none"), a.setAttribute("stroke", "currentColor"), a.setAttribute("stroke-width", "2"), o.appendChild(a), this._visualCheckbox.appendChild(o);
  var r = document.createElement("span");
  if (r.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(r), this._options.label) this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
  else {
    var l = document.querySelector("label[for='" + this._options.id + "']");
    l instanceof HTMLLabelElement && (this._labelElement = l);
  }
  this._options.disabled && this._container.classList.add("checkbox--disabled"), e && e.insertBefore(n, t), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
}, _setupEventListeners: function() {
  var t = this;
  if (this._container) {
    var e = function(e2) {
      e2.preventDefault(), !t._options.disabled && t._container && (t.toggle(), t._container.focus());
    }, n = function(e2) {
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
    }, i = function() {
      t._container && t._container.classList.add("checkbox--focused");
    }, s = function() {
      t._container && t._container.classList.remove("checkbox--focused");
    };
    this._handlers.set("click", e), this._handlers.set("keydown", n), this._handlers.set("focus", i), this._handlers.set("blur", s), this._container.addEventListener("click", e), this._container.addEventListener("keydown", n), this._container.addEventListener("focus", i), this._container.addEventListener("blur", s);
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
      var n = document.getElementById(t);
      if (n instanceof HTMLSelectElement) t = n;
      else {
        if (!(n instanceof HTMLElement)) throw new Error("Invalid selectbox");
        this._container = n;
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
    } }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), _assertClassBrand(_SelectBox_brand, this, _createDOM).call(this), _assertClassBrand(_SelectBox_brand, this, _bindEvents).call(this), _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this), _instances._.add(this);
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
  addItem(t, e, n) {
    n = n || false;
    var i = this._items.some((e2) => e2 && e2.value === t);
    if (i) {
      var s = this._items.find((e2) => e2 && e2.value === t);
      s && (s.selected = n);
    } else this._items.push({ value: t, text: e, selected: n }), this._options.sortable && this._items.sort((t2, e2) => t2 && e2 ? t2.text.localeCompare(e2.text) : t2 ? -1 : e2 ? 1 : 0);
    n && (this._options.multiple || this._selectedValues.clear(), this._selectedValues.add(t)), _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
  }
  addItems(t, e) {
    var n = this;
    t.forEach(function(t2, i) {
      if (!n._items.some((e2) => e2 && e2.value === t2[0])) {
        var s = e ? t2[0] === e : 0 === i;
        s && (n._options.multiple || n._selectedValues.clear(), n._selectedValues.add(t2[0])), n._items.push({ value: t2[0], text: t2[1], selected: s });
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
    var n = this;
    if (this._options.multiple || !Array.isArray(t)) {
      var i = "";
      if (this._options.multiple) {
        var s = function(t2) {
          if (n._optionsContainer) {
            var e2 = n._optionsContainer.querySelector('[data-value="' + t2 + '"]');
            if (e2) {
              var i2 = e2.querySelector('input[type="checkbox"]');
              i2 && i2 instanceof HTMLInputElement && (i2.checked = true), e2.classList.add("selectbox-option-selected"), e2.classList.add("checkbox--checked");
            }
          }
        };
        if (Array.isArray(t)) for (var o = 0; o < t.length; o++) i = t[o], this._selectedValues.has(i) || (this._selectedValues.add(i), s(i));
        else i = t, this._selectedValues.has(i) || (this._selectedValues.add(i), s(i));
      } else if (!Array.isArray(t)) {
        if (i = t, this._selectedValues.clear(), this._selectedValues.add(i), this._optionsContainer) {
          this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + i + '"]').forEach(function(t2) {
            t2.classList.remove("selectbox-option-selected"), t2.classList.remove("checkbox--checked");
          });
          var a = this._optionsContainer.querySelector('[data-value="' + i + '"]');
          a && (a.classList.add("selectbox-option-selected"), a.classList.add("checkbox--checked"));
        }
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
      }
      _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), e || _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, i, true);
    } else console.error("Method selectItem is only available for multi-select boxes.");
  }
  unselectItems(t, e) {
    var n = this;
    if (this._options.multiple) {
      var i = "", s = function(t2) {
        if (n._optionsContainer) {
          var e2 = n._optionsContainer.querySelector('[data-value="' + t2 + '"]');
          if (e2) {
            var i2 = e2.querySelector('input[type="checkbox"]');
            i2 && i2 instanceof HTMLInputElement && (i2.checked = false), e2.classList.remove("selectbox-option-selected"), e2.classList.remove("checkbox--checked");
          }
        }
      };
      if (Array.isArray(t)) for (var o = 0; o < t.length; o++) i = t[o], this._selectedValues.has(i) && (this._selectedValues.delete(i), s(i));
      else i = t, this._selectedValues.has(i) && (this._selectedValues.delete(i), s(i));
      _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), e || _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, i, true);
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
    for (var t = this._container.className.split(" "), e = [], n = 0; n < t.length; n++) "selectbox-container" !== t[n] && e.push(t[n]);
    this._container.className = e.join(" ");
  }
}
function _createDOM() {
  this._container.innerHTML = "", this._container.className += " selectbox-container";
  var t = document.createDocumentFragment();
  if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), t.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._select.appendChild(this._dropdown), this._options.description) {
    var e = document.createElement("div");
    e.className += " i18n selectbox-description", e.textContent = this._options.description, this._dropdown.appendChild(e);
  }
  if (this._options.searchable) {
    var n = document.createElement("div");
    n.className += " selectbox-search", this._dropdown.appendChild(n), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", n.appendChild(this.searchInput);
  }
  if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(t), this._selectbox) {
    var i = this._selectbox.parentNode;
    if (i) {
      i.insertBefore(this._container, this._selectbox);
      var s = _assertClassBrand(_SelectBox_brand, this, _extractOptions).call(this, this._selectbox);
      this.addItems(s.values, s.selectedValue), this._selectbox.remove();
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
  for (var t = this._arrow.className.split(" "), e = [], n = 0; n < t.length; n++) "selectbox-arrow-open" !== t[n] && e.push(t[n]);
  this._arrow.className = e.join(" ");
  var i = this._header.className.split(" "), s = [];
  for (n = 0; n < i.length; n++) "selectbox-header-open" !== i[n] && s.push(i[n]);
  this._header.className = s.join(" "), this.searchInput && (this.searchInput.value = "");
}
function _handleSearch(t) {
  var e = t.target;
  if (e instanceof HTMLInputElement) {
    var n = e.value.toLowerCase();
    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, n);
  }
}
function _selectNextPrevItem(t) {
  var e, n = this.searchInput ? this.searchInput.value.toLowerCase() : "", i = this._items.filter(function(t2) {
    return null !== t2;
  });
  if (n && (i = i.filter(function(t2) {
    return -1 !== t2.text.toLowerCase().indexOf(n);
  })), 0 !== i.length) {
    if ("up" === t) if (0 === this._selectedValues.size && i.length > 0) e = i[i.length - 1], this._selectedValues.add(e.value);
    else {
      for (var s = Array.from(this._selectedValues), o = -1, a = 0; a < i.length; a++) if (i[a].value === s[0]) {
        o = a;
        break;
      }
      var r = (o - 1 + i.length) % i.length;
      this._selectedValues.clear(), e = i[r], this._selectedValues.add(e.value);
    }
    else if (0 === this._selectedValues.size && i.length > 0) e = i[0], this._selectedValues.add(e.value);
    else {
      for (s = Array.from(this._selectedValues), o = -1, a = 0; a < i.length; a++) if (i[a].value === s[0]) {
        o = a;
        break;
      }
      var l = (o + 1) % i.length;
      l === i.length && (l = 0), this._selectedValues.clear(), e = i[l], this._selectedValues.add(e.value);
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, n, true), _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, e.value, true);
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
    var n = null, i = this._items;
    t && (i = i.filter(function(e2) {
      return null !== e2 && -1 !== e2.text.toLowerCase().indexOf(t);
    }));
    for (var s = document.createDocumentFragment(), o = 0; o < i.length; o++) {
      var a = i[o];
      if (a) {
        var r = document.createElement("div");
        r.className += " selectbox-option", this._selectedValues.has(a.value) && (r.className += " selectbox-option-selected checkbox--checked", n = r), r.setAttribute("data-value", a.value);
        var l = document.createElement("label");
        if (l.className += " selectbox-option-text", l.textContent = a.text, this._options.multiple) {
          r.className += " selectbox-option-checkbox";
          var c = document.createElement("input");
          c.type = "checkbox", c.id = "checkbox-" + a.value, c.className += " selectbox-checkbox", c.checked = this._selectedValues.has(a.value), r.appendChild(c);
          var d = document.createElement("span");
          d.className = "checkbox-visual", d.setAttribute("aria-hidden", "true");
          var h = "http://www.w3.org/2000/svg", u = document.createElementNS(h, "svg");
          u.setAttribute("viewBox", "0 0 10 8"), u.setAttribute("class", "checkbox-checkmark");
          var _ = document.createElementNS(h, "path");
          _.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), _.setAttribute("fill", "none"), _.setAttribute("stroke", "currentColor"), _.setAttribute("stroke-width", "2"), u.appendChild(_), d.appendChild(u), r.appendChild(d);
        }
        r.appendChild(l), s.appendChild(r);
      } else {
        var p = document.createElement("hr");
        p.className += " selectbox-option-divider", s.appendChild(p);
      }
    }
    if (this._customItems.length) {
      var b = document.createElement("hr");
      b.className += " selectbox-option-divider", s.appendChild(b);
    }
    for (o = 0; o < this._customItems.length; o++) {
      var m = this._customItems[o], v = document.createElement("label");
      v.className += " selectbox-custom-option", v.setAttribute("data-value", m.value), v.setAttribute("for", m.value);
      var f = document.createElement("span");
      f.className += " selectbox-option-text", f.textContent = m.text, v.appendChild(f), s.appendChild(v);
    }
    if (this._optionsContainer.appendChild(s), e && this.isOpen && this._optionsContainer && n) try {
      n.scrollIntoView && n.scrollIntoView({ block: "nearest" });
    } catch (t2) {
      console.error(t2);
    }
  }
}
function _handleDropdownClick(t) {
  var e = t.target || t.srcElement;
  if (e && e instanceof HTMLElement) {
    for (var n = null, i = e.className.split(" "), s = false, o = 0; o < i.length; o++) {
      if ("selectbox-option" === i[o]) {
        s = true;
        break;
      }
      if ("selectbox-custom-option" === i[o]) {
        var a = e.getAttribute("data-value");
        if (a) return t.stopPropagation(), _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, a), void _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        break;
      }
    }
    if (s) n = e;
    else if (e.parentNode && e.parentNode instanceof HTMLElement) {
      var r = e.parentNode.className.split(" "), l = false;
      for (o = 0; o < r.length; o++) {
        if ("selectbox-option" === r[o]) {
          l = true;
          break;
        }
        if ("selectbox-custom-option" === r[o]) {
          var c = e.parentNode.getAttribute("data-value");
          if (c) return t.stopPropagation(), _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, c), void _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
          break;
        }
      }
      l && (n = e.parentNode);
    }
    if (n instanceof HTMLDivElement) {
      var d = n.getAttribute("data-value");
      if (null !== d) {
        var h = true;
        this._options.multiple ? this._selectedValues.has(d) ? (this.unselectItems(d, true), h = false) : this.selectItems(d, true) : (this.selectItems(d, true), _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this)), _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this), _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, d, h);
      }
    }
  }
}
function _updateSelectedText() {
  if (0 !== this._selectedValues.size) if (this._options.multiple) {
    for (var t = [], e = 0; e < this._items.length; e++) {
      (i = this._items[e]) && this._selectedValues.has(i.value) && t.push(i);
    }
    0 === t.length ? this._selectedText.textContent = this._options.placeholder : 1 === t.length ? this._selectedText.textContent = t[0].text : this._selectedText.textContent = t.length + " items selected";
  } else {
    var n = null;
    for (e = 0; e < this._items.length; e++) {
      var i;
      if ((i = this._items[e]) && this._selectedValues.has(i.value)) {
        n = i;
        break;
      }
    }
    this._selectedText.textContent = n ? n.text : this._options.placeholder;
  }
  else this._selectedText.textContent = this._options.placeholder;
}
function _triggerChange(t, e) {
  for (var n = Array.from(this._selectedValues), i = [], s = 0; s < this._items.length; s++) {
    var o = this._items[s];
    o && this._selectedValues.has(o.value) && i.push(o);
  }
  var a = { values: n, items: i, current: t, enabled: e };
  this._subscribers.forEach(function(t2) {
    t2({ type: "selectbox:change", detail: a });
  });
}
function _triggerCustomChange(t) {
  var e = { values: [], current: t, enabled: false };
  this._subscribers.forEach(function(t2) {
    t2({ type: "selectbox:custom", detail: e });
  });
}
function _extractOptions(t) {
  var e = { values: Array.from(t.options).map((t2) => [t2.value, t2.text]) }, n = t.value;
  return n && (e.selectedValue = n), e;
}
var _instances = { _: /* @__PURE__ */ new Set() };
document.getElementById("loader");
var LOCATOR_VALUES = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]], Theme = { addStylesForComponents: function(t) {
  var e = "";
  t["background-toolbar"] && (e += ".loader-body,\n.loader-bg { background-color: " + t["background-toolbar"] + "; }\n", e += ".loader-body {     box-shadow: 0 0 99px 99px " + t["background-toolbar"] + "; }\n"), t["background-loader"] && (e += ".loader-image { color: " + t["background-loader"] + "; }\n"), t["background-normal"] && (e += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.input-field-element,\n.selectbox-search-input,\n.selectbox-header,\n.selectbox-dropdown,\n.radio-visual, \n.checkbox-visual, \n.message { background-color: " + t["background-normal"] + "; }\n"), t["text-inverse"] && (e += ".custom-button-primary { color: " + t["text-inverse"] + "; }\n"), t["border-regular-control"] && (e += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.input-field-element,\n.checkbox-visual,\n.radio-visual,\n.selectbox-header,\n.selectbox-dropdown,\n.selectbox-search-input:focus,\n.message { border-color: " + t["border-regular-control"] + "; }\n", e += ".selectbox-search,\n.selectbox-option-divider { border-color: " + t["border-regular-control"] + " !important; }\n"), t["border-error"] && (e += ".input-field-invalid .input-field-element { border-color: " + t["border-error"] + "; }\n"), t["border-control-focus"] && (e += ".custom-button-icon-only:focus:not(:active):not(:hover),\n.custom-button-secondary-icon:focus:not(:active):not(:hover),\n.custom-button-secondary:focus:not(:active):not(:hover),\n.input-field-element:focus,\n.input-field-focused .input-field-element,\n.selectbox-header:active,\n.selectbox-header:focus,\n.selectbox-header-open { border-color: " + t["border-control-focus"] + "; }\n"), t["highlight-button-hover"] && (e += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n.custom-button-secondary-icon:hover:not(.custom-button-disabled),\n.custom-button-secondary:hover:not(.custom-button-disabled),\n.selectbox-custom-option:hover,\n.selectbox-option:hover { background-color: " + t["highlight-button-hover"] + "; }\n"), t["highlight-button-pressed"] && (e += ".custom-button-icon-only:active:not(.custom-button-disabled),\n.custom-button-secondary-icon:active:not(.custom-button-disabled),\n.custom-button-secondary:active:not(.custom-button-disabled),\n.selectbox-option-selected:hover,\n.selectbox-option-selected { background-color: " + t["highlight-button-pressed"] + "; }\n", e += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t["highlight-button-pressed"] + "; }\n"), t["highlight-primary-dialog-button-hover"] && (e += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t["highlight-primary-dialog-button-hover"] + "; border-color: " + t["highlight-primary-dialog-button-hover"] + "; }\n"), t["background-primary-dialog-button"] && (e += ".checkbox-indeterminate,\n.custom-button-primary { background-color: " + t["background-primary-dialog-button"] + "; border-color: " + t["background-primary-dialog-button"] + "; }\n"), t["background-toolbar-additional"] && (e += ".custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled { background-color: " + t["background-toolbar-additional"] + "; border-color: " + t["background-toolbar-additional"] + "; }\n"), t["text-normal"] && (e += ".custom-button-secondary-icon,\n.custom-button-secondary,\n.custom-button-secondary-icon,\n.custom-button-icon-only,\n.selectbox-search-input,\n.loader-image,\n.input-field-element { color: " + t["text-normal"] + "; }\n", e += ".input-field-search-icon svg { fill: " + t["text-normal"] + "; }\n", e += ".selectbox-arrow b { border-color: " + t["text-normal"] + "; }\n"), t["text-secondary"] && (e += ".message-close:hover,\n.input-field-clear:hover { color: " + t["text-secondary"] + "; }\n"), t["text-tertiary"] && (e += ".input-field-clear,\n.message-container:hover .message-close,\n.custom-button-secondary-icon:disabled,\n.custom-button-secondary-icon.custom-button-disabled,\n.custom-button-secondary:disabled,\n.custom-button-secondary.custom-button-disabled,\n.input-field-element::placeholder,\n.selectbox-search-input::placeholder { color: " + t["text-tertiary"] + "; }\n");
  var n = "11px";
  -1 !== ["theme-white", "theme-night"].indexOf(t.name) || -1 !== ["theme-white", "theme-night"].indexOf(t.Name) ? (n = "12px", e += ".message,\n.custom-button,\n.selectbox-header,\n.input-field-element { border-radius: 4px; }\n", e += ".radio--checked .radio-visual { border-width: 4px; }\n", e += ".checkbox-checkmark { color: " + t["text-inverse"] + "; }\n", e += ".checkbox--checked .checkbox-visual { background-color: " + t["background-primary-dialog-button"] + "; }\n", e += ".radio--checked .radio-visual,\n.checkbox--checked .checkbox-visual { border-color: " + t["background-primary-dialog-button"] + "; }\n", e += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + t["highlight-button-hover"] + "; }\n", e += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; background-color: " + t["highlight-primary-dialog-button-hover"] + "; }\n", e += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; }\n", e += "body { font-size: 12px; }\n") : (e += ".checkbox-checkmark { color: " + t["text-normal"] + "; }\n", e += ".radio--checked .radio-visual { background-color: " + t["text-normal"] + ";\n box-shadow: 0 0 0 2px" + t["background-normal"] + " inset; }\n", e += ".radio-button-container:hover .radio-visual,\n.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["border-control-focus"] + "; }\n"), e += "body, input, textarea, select, button { font-size: " + n + "; }\n";
  var i = document.getElementById("componentsStyles");
  return i ? (i.innerHTML = e, e) : ((i = document.createElement("style")).id = "componentsStyles", i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i), e);
}, fixThemeForIE: function(t) {
  return t["background-toolbar"] || (t["background-toolbar"] = "#f7f7f7"), t["text-normal"] || (t["text-normal"] = "rgb(51, 51, 51)"), t["text-secondary"] || (t["text-secondary"] = "#848484"), t["highlight-button-hover"] || (t["highlight-button-hover"] = "#e0e0e0"), t["background-normal"] || (t["background-normal"] = "white"), t["background-loader"] || (t["background-loader"] = "rgba(24, 24, 24, 0.9)"), t["highlight-button-pressed"] || (t["highlight-button-pressed"] = "#cbcbcb"), t["text-inverse"] || (t["text-inverse"] = "white"), t["border-regular-control"] || (t["border-regular-control"] = "#c0c0c0"), t["border-error"] || (t["border-error"] = "#f62211"), t["border-control-focus"] || (t["border-control-focus"] = "#848484"), t["highlight-primary-dialog-button-hover"] || (t["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t["background-primary-dialog-button"] || (t["background-primary-dialog-button"] = "#444444"), t["background-toolbar-additional"] || (t["background-toolbar-additional"] = "#efefef"), t["text-tertiary"] || (t["text-tertiary"] = "#bdbdbd"), t;
} };
!(function() {
  var t = new class {
    constructor() {
      var t2 = document.querySelector(".container");
      if (t2 instanceof HTMLElement == false) throw new Error("container is not initialized");
      this._container = t2, this.citationObject = null, this.forms = [];
    }
    createForm(t2) {
      var e = document.createElement("form");
      e.classList.add("form"), e.classList.add("message-container"), this._container.appendChild(e);
      var n = document.createElement("button");
      n.className = "message-close i18n", n.textContent = "×", n.setAttribute("aria-label", "Close"), n.setAttribute("title", "Remove"), n.onclick = this.removeItem.bind(this, e, t2.id), e.appendChild(n);
      var i = document.createElement("div");
      i.classList.add("title"), i.textContent = t2.itemData.title, e.appendChild(i);
      var s = document.createDocumentFragment(), o = document.createElement("div"), a = document.createElement("input"), r = document.createElement("input"), l = document.createElement("div"), c = document.createElement("div"), d = document.createElement("input"), h = document.createElement("div"), u = document.createElement("input");
      s.appendChild(l), l.appendChild(c), l.appendChild(d);
      var _ = "";
      s.appendChild(o), o.appendChild(a), o.appendChild(r), s.appendChild(h), h.appendChild(u);
      var p = new InputField(a, { type: "text", placeholder: "Prefix", value: t2.prefix, showClear: false }), b = new InputField(r, { type: "text", placeholder: "Suffix", value: t2.suffix, showClear: false }), m = new SelectBox(c, { placeholder: "Locator" }), v = t2.label || "page";
      LOCATOR_VALUES.forEach(function(t3) {
        var e2 = t3[0] === v;
        m.addItem(t3[0], t3[1], e2), e2 && (_ = t3[1]);
      });
      var f = new InputField(d, { type: "text", placeholder: _, value: t2.locator, showClear: false }), g = new Checkbox(u, { label: "Omit author", checked: !!t2["suppress-author"] });
      m.subscribe(function(t3) {
        if ("selectbox:change" === t3.type && t3.detail.items) {
          var e2 = t3.detail.items[0];
          f.setPlaceholder(e2.text);
        }
      }), this.forms.push({ omitAuthorInput: g, prefixInput: p, suffixInput: b, locatorInput: f, locatorSelectbox: m }), e.appendChild(s);
    }
    updateRemoveButtonsVisibility() {
      var t2;
      if (this.citationObject) {
        var e = this.citationObject.citationItems.length;
        e > 1 ? this._container.classList.remove("hide-remove-button") : this._container.classList.add("hide-remove-button");
        var n = (null === (t2 = document.querySelector("form")) || void 0 === t2 ? void 0 : t2.offsetHeight) || 0, i = 1 === e ? n + 12 : 2 * n;
        window.Asc.plugin.sendToPlugin("onUpdateHeight", i);
      }
    }
    removeItem(t2, e) {
      this.citationObject && (this.citationObject.citationItems = this.citationObject.citationItems.filter((t3) => t3.id !== e), this._container.removeChild(t2), this.updateRemoveButtonsVisibility());
    }
    onThemeChanged(t2) {
      window.Asc.plugin.onThemeChangedBase(t2), Theme.fixThemeForIE(t2), Theme.addStylesForComponents(t2);
      var e = "";
      e += "body { background-color: " + t2["background-normal"] + " !important;}\n";
      var n = document.getElementById("pluginStyles");
      n ? n.innerHTML = e : ((n = document.createElement("style")).id = "pluginStyles", n.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(n));
    }
    onAttachedContent(t2) {
      this.citationObject = t2, this.citationObject && (this.citationObject.citationItems.forEach((t3) => {
        this.createForm(t3);
      }), this.updateRemoveButtonsVisibility());
    }
    onClickSave() {
      for (var t2 = false, e = 0; e < this.forms.length; e++) {
        var n, i = this.forms[e], s = null === (n = this.citationObject) || void 0 === n ? void 0 : n.citationItems[e];
        if (s) {
          var o = i.prefixInput.getValue(), a = i.suffixInput.getValue(), r = i.locatorSelectbox.getSelectedValue(), l = i.locatorInput.getValue(), c = i.omitAuthorInput.getState().checked;
          (s.prefix || o) && s.prefix !== o && (s.prefix = o, t2 = true), (s.suffix || a) && s.suffix !== a && (s.suffix = a, t2 = true), (s.label || r) && s.label !== r && r && (s.label = r, t2 = true), (s.locator || l) && s.locator !== l && (s.locator = l, t2 = true), !!s["suppress-author"] !== c && (s["suppress-author"] = c, t2 = true);
        }
      }
      return t2;
    }
  }();
  window.Asc.plugin.init = function() {
    window.Asc.plugin.sendToPlugin("onWindowReady", {});
  }, window.Asc.plugin.onThemeChanged = t.onThemeChanged.bind(t), window.Asc.plugin.attachEvent("onThemeChanged", t.onThemeChanged.bind(t)), window.Asc.plugin.attachEvent("onAttachedContent", t.onAttachedContent.bind(t)), window.Asc.plugin.attachEvent("onClickSave", () => {
    t.onClickSave() ? window.Asc.plugin.sendToPlugin("onSaveFields", t.citationObject) : window.Asc.plugin.sendToPlugin("onSaveFields", null);
  });
})();
//# sourceMappingURL=edit-window.modern.js.map
