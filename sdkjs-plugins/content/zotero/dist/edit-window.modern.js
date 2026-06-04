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
function d(s, t, e) {
  if (typeof s == "function" ? s === t : s.has(t)) return arguments.length < 3 ? t : e;
  throw new TypeError("Private element is not present on this object");
}
function V(s, t, e, i, n, a, o) {
  try {
    var r = s[a](o), c = r.value;
  } catch (l) {
    return void e(l);
  }
  r.done ? t(c) : Promise.resolve(c).then(i, n);
}
function q(s) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(i, n) {
      var a = s.apply(t, e);
      function o(c) {
        V(a, i, n, o, r, "next", c);
      }
      function r(c) {
        V(a, i, n, o, r, "throw", c);
      }
      o(void 0);
    });
  };
}
function z(s, t) {
  if (t.has(s)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function R(s, t) {
  z(s, t), t.add(s);
}
function N(s, t) {
  var e = this;
  if (t = t || {}, typeof s == "string") {
    var i = document.getElementById(s);
    i instanceof HTMLInputElement && (s = i);
  }
  if (s instanceof HTMLInputElement)
    this.input = s;
  else
    throw new Error("Invalid input element");
  this._container = document.createElement("div"), this._options = {
    type: t.type || s.type || "text",
    placeholder: t.placeholder || s.placeholder || "",
    value: t.value || s.value || "",
    autofocus: t.autofocus || !1,
    disabled: t.disabled || !1,
    readonly: t.readonly || !1,
    required: t.required || !1,
    showCounter: t.showCounter || !1,
    showClear: t.showClear !== void 0 ? t.showClear : !0,
    autocomplete: t.autocomplete || "off"
  };
  for (var n in t)
    this._options.hasOwnProperty(n) || (this._options[n] = t[n]);
  this._id = s.id || "input_" + Math.random().toString(36).slice(2, 9), this.isFocused = !1, this.isValid = !0, this._validationMessage = "", this._subscribers = [], this._boundHandles = {
    focus: function(o) {
      e._handleFocus(o);
    },
    blur: function(o) {
      e._handleBlur(o);
    },
    input: function(o) {
      e._handleInput(o);
    },
    keydown: function(o) {
      e._handleKeydown(o);
    },
    clear: function() {
      e.clear();
    },
    validate: function() {
      e.validate();
    }
  }, this._clearButton = null, this._counter = null, this._counterCurrent = null, this._counterMax = null, this._validationElement = document.createElement("div"), this._options.type === "search" && (this._searchIcon = document.createElement("span"), this._boundHandles.search = this._triggerSubmit.bind(this), this._container.classList.add("input-field-search")), this._createDOM(), this._bindEvents(), this._updateState(), this._options.autofocus && setTimeout(/* @__PURE__ */ (function(a) {
    return function() {
      a.focus();
    };
  })(this), 100);
}
N.prototype = {
  constructor: N,
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
    var t = this.input.parentNode, e = document.createDocumentFragment();
    e.appendChild(this._container), this._container.className += " input-field-container  input-field-container-" + this._id;
    var i = document.createElement("div");
    this._container.appendChild(i), i.className += " input-field", this._options.disabled && (i.className += " input-field-disabled");
    var n = document.createElement("div");
    if (i.appendChild(n), n.className += " input-field-main", this.input.className += " input-field-element i18n", this.input.type = this._options.type || "text", this.input.placeholder = this._options.placeholder || "", this.input.value = String(this._options.value) || "", this._options.disabled && (this.input.disabled = !0), this._options.readonly && (this.input.readOnly = !0), this._options.required && (this.input.required = !0), this._options.maxLength && (this.input.maxLength = this._options.maxLength), this._options.pattern && (this.input.pattern = this._options.pattern), this._options.autocomplete && (this.input.autocomplete = this._options.autocomplete), this._options.showCounter) {
      this._counter = document.createElement("div"), i.appendChild(this._counter), this._counter.className += " input-field-counter", this._counterCurrent = document.createElement("span"), this._counterCurrent.className += " input-field-counter-current", this._counterCurrent.textContent = "0", this._counter.appendChild(this._counterCurrent);
      var a = document.createElement("span");
      a.textContent = "/", this._counter.appendChild(a), this._counterMax = document.createElement("span"), this._counterMax.className += " input-field-counter-max", this._counterMax.textContent = String(this._options.maxLength) || "∞", this._counter.appendChild(this._counterMax);
    }
    i.appendChild(this._validationElement), this._validationElement.className += " input-field-validation", this._validationElement.style.display = "none", this._options.showClear && (this.input.className += " input-field-clearable", this._clearButton = document.createElement("button"), i.appendChild(this._clearButton), this._clearButton.className += " input-field-clear", this._clearButton.style.display = "none", this._clearButton.textContent = "×"), this._options.showSearchIcon && (this._searchIcon.classList.add("input-field-search-icon"), this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" fill="currentColor"/></svg>', n.appendChild(this._searchIcon)), t && t.insertBefore(e, this.input), n.appendChild(this.input);
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
    for (var e = this._container.className.split(" "), i = [], n = 0; n < e.length; n++)
      e[n] !== "input-field-focused" && i.push(e[n]);
    this._container.className = i.join(" "), this.validate(), this._triggerBlurEvent(t);
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
    var e = t.key || t.keyCode;
    (e === "Escape" || e === 27) && this._options.showClear && (this.clear(), t.preventDefault()), (e === "Enter" || e === 13) && this._triggerSubmit();
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
      var t = this.input.value.length, e = this._options.maxLength;
      if (this._counterCurrent && (this._counterCurrent.textContent = String(t)), this._counterMax && (this._counterMax.textContent = String(e)), t > e * 0.9) {
        var i = this._counter.className.split(" ");
        i.indexOf("input-field-counter-warning") === -1 && (this._counter.className += " input-field-counter-warning");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(n) {
          return n !== "input-field-counter-warning";
        }).join(" ");
      if (t > e) {
        var i = this._counter.className.split(" ");
        i.indexOf("input-field-counter-error") === -1 && (this._counter.className += " input-field-counter-error");
      } else
        this._counter.className = this._counter.className.split(" ").filter(function(n) {
          return n !== "input-field-counter-error";
        }).join(" ");
    }
  },
  validate: function() {
    if (!this._options.validation)
      return this.isValid = !0, !0;
    var t = this.input.value, e = !0, i = "";
    if (this._options.required && !t.trim() ? (e = !1, i = "This field is required") : this._options.minLength && t.length < this._options.minLength ? (e = !1, i = "Minimum length is " + this._options.minLength + " characters") : this._options.maxLength && t.length > this._options.maxLength ? (e = !1, i = "Maximum length is " + this._options.maxLength + " characters") : this._options.pattern && !new RegExp(this._options.pattern).test(t) && (e = !1, i = "Invalid format"), e && typeof this._options.validation == "function") {
      var n = this._options.validation(t);
      n && !n.isValid && (e = !1, i = n.message || "Invalid value");
    }
    return this.isValid = e, this._validationMessage = i, this.updateValidationState(), e;
  },
  updateValidationState: function() {
    if (this.isValid)
      if (this.input.value.length > 0) {
        this._validationElement.style.display = "none";
        var t = this._container.className.split(" ");
        t.indexOf("input-field-valid") === -1 && (this._container.className += " input-field-valid"), this._container.className = this._container.className.split(" ").filter(function(i) {
          return i !== "input-field-invalid";
        }).join(" ");
      } else
        this._validationElement.style.display = "none", this._container.className = this._container.className.split(" ").filter(function(e) {
          return e !== "input-field-valid" && e !== "input-field-invalid";
        }).join(" ");
    else {
      this._validationElement.textContent = this._validationMessage, this._validationElement.style.display = "block";
      var t = this._container.className.split(" ");
      t.indexOf("input-field-invalid") === -1 && (this._container.className += " input-field-invalid"), this._container.className = this._container.className.split(" ").filter(function(e) {
        return e !== "input-field-valid";
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
    var e = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        e._subscribers = e._subscribers.filter(function(n) {
          return n !== t;
        });
      }
    };
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerInputEvent: function(t) {
    var e = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:input",
        detail: e
      });
    });
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerFocusEvent: function(t) {
    var e = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:focus",
        detail: e
      });
    });
  },
  /**
   * @param {Event} e
   * @private
   */
  _triggerBlurEvent: function(t) {
    var e = {
      value: this.input.value,
      originalEvent: t
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "inputfield:blur",
        detail: e
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
    this._subscribers.forEach(function(e) {
      e({
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
    this._subscribers.forEach(function(e) {
      e({
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
function O(s, t) {
  if (typeof s == "string") {
    var e = document.getElementById(s);
    e instanceof HTMLElement && (s = e);
  }
  if (s instanceof HTMLElement)
    this.container = s;
  else
    throw new Error("Invalid container element");
  this._options = Object.assign(this._options, t), this._isShow = !1;
}
O.prototype = {
  constructor: O,
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
    var e = this._options.title;
    if (!e)
      switch (e = "Error", this._options.type) {
        case "success":
          e = "Success";
          break;
        case "warning":
          e = "Warning";
          break;
        case "info":
          e = "Information";
          break;
      }
    var i = this._options.text;
    if (!i)
      switch (i = "", this._options.type) {
        case "success":
          i = "Operation completed successfully.";
          break;
        case "warning":
          i = "Please be cautious.";
          break;
        case "error":
          i = "Something went wrong.";
          break;
      }
    if (t.innerHTML = '<div class="message-content"><span class="message-title">' + e + '</span><span class="message-text">' + i + "</span></div>", this._options.closeButton) {
      var n = document.createElement("button");
      n.className = "message-close", n.textContent = "×", n.setAttribute("aria-label", "Close"), n.onclick = this.close.bind(this), t.appendChild(n);
    }
    return t;
  },
  addOutsideClickListener: function() {
    this._outsideClickListener && document.removeEventListener("click", this._outsideClickListener);
    var t = this;
    this._outsideClickListener = function(e) {
      e.target instanceof HTMLElement && t._element && !t._element.contains(e.target) && t.close();
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
  show: function(t, e) {
    if (this._isShow)
      return this;
    this._isShow = !0, this.container.classList.contains("message-container") || this.container.classList.add("message-container"), e && (this._options.title = e), t && (this._options.text = t);
    var i = this._create();
    return this._element = i, this.container.appendChild(i), setTimeout(function() {
      i.style.opacity = "1", i.style.transform = "translateY(0)";
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
function B(s, t) {
  var e = this;
  if (typeof s == "string") {
    var i = document.getElementById(s);
    i instanceof HTMLButtonElement && (s = i);
  }
  if (s instanceof HTMLButtonElement)
    this._button = s;
  else
    throw new Error("Invalid button");
  this._container = document.createElement("div"), this._options = t || {}, this._options.text = this._options.text || s.textContent.trim(), this._options.type = this._options.type || "button", this._options.variant = this._options.variant || "primary", this._options.size = this._options.size || "medium", this._options.iconPosition = this._options.iconPosition || "left", this.isLoading = !1, this._originalText = this._options.text, this._subscribers = [], this._boundHandles = {
    click: function(a) {
      e._handleClick(a);
    },
    mouseenter: function() {
      e._handleMouseEnter();
    },
    mouseleave: function() {
      e._handleMouseLeave();
    },
    focus: function() {
      e._handleFocus();
    },
    blur: function() {
      e._handleBlur();
    },
    keydown: function(a) {
      e._handleKeydown(a);
    }
  }, this._createDOM(), this._bindEvents(), this.updateState();
}
B.prototype = /** @lends Button.prototype */
{
  constructor: B,
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
    var t = this._button.parentNode, e = document.createDocumentFragment();
    if (e.appendChild(this._container), this._container.className += " custom-button-container", this._button.className += " custom-button", this._button.className += " custom-button-" + this._options.variant, this._button.className += " custom-button-" + this._options.size, this._options.disabled && (this._button.className += " custom-button-disabled"), this._options.loading && (this._container.className += " custom-button-loading"), this._options.type && (this._button.type = this._options.type), this._options.tooltip && (this._button.title = this._options.tooltip), this._options.disabled && (this._button.disabled = !0), this._options.text)
      if (this._button.textContent = "", this._buttonText = document.createElement("span"), this._buttonText.className = "custom-button-text", this._buttonText.textContent = this._options.text || "", this._options.icon) {
        var i = document.createElement("span");
        i.className = "custom-button-icon", this._options.iconPosition === "left" ? (i.className += " custom-button-icon-left", this._button.appendChild(i), this._button.appendChild(this._buttonText)) : (i.className += " custom-button-icon-right", this._button.appendChild(this._buttonText), this._button.appendChild(i)), i.innerHTML = this._options.icon;
      } else
        this._button.appendChild(this._buttonText);
    this._options.loading && (this._spinner = document.createElement("span"), this._spinner.className = "custom-button-spinner", this._button.appendChild(this._spinner)), this._options.badge && (this._badgeElement = document.createElement("span"), this._badgeElement.className = "custom-button-badge", this._badgeElement.textContent = this._options.badge, this._button.appendChild(this._badgeElement)), t && t.insertBefore(e, this._button), this._container.appendChild(this._button);
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
    var e = t.key || t.keyCode;
    e === " " || e === "Enter" || e === 32 || e === 13 ? this._button.tagName === "BUTTON" || (t.preventDefault(), this._button.click()) : (e === "Escape" || e === 27) && this._button.blur(), this.triggerEvent("keydown", {
      key: e
    });
  },
  /** @param {function(InputEventType): void} callback */
  subscribe: function(t) {
    var e = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        e._subscribers = e._subscribers.filter(function(n) {
          return n !== t;
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
  setIcon: function(t, e) {
    this._options.icon = t, this._options.iconPosition = e || "left";
  },
  /** @param {ButtonOptionsType['badge']} badge */
  setBadge: function(t) {
    typeof t > "u" || (this._options.badge = t, this._badgeElement && (this._badgeElement.textContent = t, this._badgeElement.style.display = t ? "flex" : "none"));
  },
  /** @param {ButtonOptionsType['variant']} variant */
  setVariant: function(t) {
    if (!(typeof t > "u")) {
      var e = "custom-button-" + this._options.variant, i = "custom-button-" + t;
      this._button.className = this._button.className.split(" ").filter(function(n) {
        return n !== e;
      }).join(" ") + " " + i, this._options.variant = t;
    }
  },
  /** @param {ButtonOptionsType['size']} size */
  setSize: function(t) {
    if (!(typeof t > "u")) {
      var e = "custom-button-" + this._options.size, i = "custom-button-" + t;
      this._button.className = this._button.className.split(" ").filter(function(n) {
        return n !== e;
      }).join(" ") + " " + i, this._options.size = t;
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
    var e = {
      originalEvent: t,
      button: this
    };
    this._subscribers.forEach(function(i) {
      i({
        type: "button:click",
        detail: e
      });
    });
  },
  /**
   * @param {"click"|"keydown" | "mouseenter" | "mouseleave" | "focus" | "blur"} eventName
   * @param {any} [detail]
   */
  triggerEvent: function(t, e) {
    e = e || {}, e.button = this, this._subscribers.forEach(function(i) {
      i({
        type: "button:" + t,
        detail: e
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
      } catch (e) {
        console.error(e);
      }
    this._container.innerHTML = "";
    var t = this._container.className.split(" ").filter(function(e) {
      return e !== "custom-button-container";
    }).join(" ");
    this._container.className = t;
  }
};
function S(s, t) {
  if (typeof s == "string") {
    var e = document.getElementById(s);
    e instanceof HTMLInputElement && (s = e);
  }
  if (!(s instanceof HTMLInputElement))
    throw new Error("Invalid input element");
  this._options = Object.assign({
    id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
    checked: !1,
    disabled: !1,
    indeterminate: !1,
    label: "",
    name: "",
    value: "on"
  }, t), this._options.disabled = t.disabled || !1, this._handlers = /* @__PURE__ */ new Map(), this._createDOM(s), this._setupEventListeners(), this._updateVisualState(), this._subscribers = [];
}
S.prototype = {
  constructor: S,
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
    var e = t.parentNode, i = document.createDocumentFragment();
    this._container = document.createElement("div"), i.appendChild(this._container), this._container.classList.add("checkbox-container"), this._container.setAttribute("role", "checkbox"), this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false"), this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false"), this._container.tabIndex = this._options.disabled ? -1 : 0, this._input = t;
    var n = this._input.getAttribute("id");
    n !== null ? this._options.id = n : this._options.id && this._input.setAttribute("id", this._options.id), this._input.type = "checkbox", this._options.name && (this._input.name = this._options.name), this._options.value && (this._input.value = this._options.value), this._input.checked = !!this._options.checked, this._options.disabled && (this._input.disabled = !0), this._options.indeterminate && (this._input.indeterminate = !0), this._visualCheckbox = document.createElement("span"), this._visualCheckbox.className = "checkbox-visual", this._visualCheckbox.setAttribute("aria-hidden", "true");
    var a = "http://www.w3.org/2000/svg", o = document.createElementNS(a, "svg");
    o.setAttribute("viewBox", "0 0 10 8"), o.setAttribute("class", "checkbox-checkmark");
    var r = document.createElementNS(a, "path");
    r.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), r.setAttribute("fill", "none"), r.setAttribute("stroke", "currentColor"), r.setAttribute("stroke-width", "2"), o.appendChild(r), this._visualCheckbox.appendChild(o);
    var c = document.createElement("span");
    if (c.className = "checkbox-indeterminate", this._visualCheckbox.appendChild(c), this._options.label)
      this._labelElement = document.createElement("label"), this._labelElement.className = "checkbox-label i18n", this._options.id && (this._labelElement.htmlFor = this._options.id), this._labelElement.textContent = this._options.label, this._options.title && this._labelElement.setAttribute("title", this._options.label);
    else {
      var l = document.querySelector("label[for='" + this._options.id + "']");
      l instanceof HTMLLabelElement && (this._labelElement = l);
    }
    this._options.disabled && this._container.classList.add("checkbox--disabled"), e && e.insertBefore(i, t), this._container.appendChild(this._input), this._container.appendChild(this._visualCheckbox), this._labelElement && this._container.appendChild(this._labelElement);
  },
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners: function() {
    var t = this;
    if (this._container) {
      var e = function(r) {
        r.preventDefault(), !t._options.disabled && t._container && (t.toggle(), t._container.focus());
      }, i = function(r) {
        if (!t._options.disabled)
          switch (r.key) {
            case " ":
            case "Spacebar":
            case "Enter":
              r.preventDefault(), t.toggle();
              break;
            case "ArrowRight":
            case "ArrowDown":
              r.preventDefault(), !t._options.checked && !t._options.indeterminate && (t._options.checked ? t.setIndeterminate() : t.check());
              break;
            case "ArrowLeft":
            case "ArrowUp":
              r.preventDefault(), (t._options.checked || t._options.indeterminate) && (t._options.indeterminate ? t.uncheck() : t.setIndeterminate());
              break;
          }
      }, n = function() {
        t._container && t._container.classList.add("checkbox--focused");
      }, a = function() {
        t._container && t._container.classList.remove("checkbox--focused");
      };
      this._handlers.set("click", e), this._handlers.set("keydown", i), this._handlers.set("focus", n), this._handlers.set("blur", a), this._container.addEventListener("click", e), this._container.addEventListener("keydown", i), this._container.addEventListener("focus", n), this._container.addEventListener("blur", a);
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
    var e = this;
    return this._subscribers.push(t), {
      unsubscribe: function() {
        e._subscribers = e._subscribers.filter(function(n) {
          return n !== t;
        });
      }
    };
  },
  /**
   * @param {Event} [e]
   * @private
   */
  _triggerChange: function(t) {
    var e = this.getState(), i = {
      type: "checkbox:change",
      detail: e
    };
    t && (i.originalEvent = t), this._subscribers.forEach(function(n) {
      n(i);
    });
  },
  /**
   * Clean up event listeners and references
   */
  destroy: function() {
    this._subscribers = [], this._handlers.forEach((t, e) => {
      this._container && this._container.removeEventListener(e, t);
    }), this._handlers.clear(), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container), this._container = null, this._input = null, this._visualCheckbox = null, this._labelElement = null;
  }
};
var u = /* @__PURE__ */ new WeakSet();
class K {
  /**
   * @param {string | HTMLSelectElement | HTMLElement} selectbox
   * @param {SelectboxOptionsType} options
   */
  constructor(t, e) {
    if (R(this, u), typeof t == "string") {
      var i = document.getElementById(t);
      if (i instanceof HTMLSelectElement)
        t = i;
      else if (i instanceof HTMLElement)
        this._container = i;
      else
        throw new Error("Invalid selectbox");
    } else t instanceof HTMLElement && (this._container = t);
    if (t instanceof HTMLSelectElement)
      this._selectbox = t, this._container = document.createElement("div");
    else if (!(this._container instanceof HTMLElement))
      throw new Error("Invalid container");
    this._options = Object.assign(e, {
      placeholder: e.placeholder || "Select...",
      searchable: e.searchable || !1,
      sortable: e.sortable || !1,
      translate: e.translate,
      multiple: e.multiple || !1,
      description: e.description || ""
    }), this._selectedValues = /* @__PURE__ */ new Set(), this.isOpen = !1, this._items = [], this._customItems = [], this._subscribers = [], this._boundHandles = {
      toggle: (n) => {
        d(u, this, P).call(this, n);
      },
      search: (n) => {
        d(u, this, Y).call(this, n);
      },
      close: (n) => {
        n.target instanceof HTMLElement && !this._container.contains(n.target) && !n.target.classList.contains("selectbox-option") && d(u, this, f).call(this);
      },
      keydown: (n) => {
        d(u, this, Z).call(this, n);
      },
      dropdownClick: (n) => {
        d(u, this, G).call(this, n);
      }
    }, this._optionsContainer = null, this.searchInput = null, this._select = document.createElement("div"), this._header = document.createElement("div"), this._selectedText = document.createElement("span"), this._arrow = document.createElement("span"), this._dropdown = document.createElement("div"), d(u, this, U).call(this), d(u, this, W).call(this), d(u, this, C).call(this), M._.add(this);
  }
  openDropdown() {
    this.isOpen || document.addEventListener("click", this._boundHandles.close), this.isOpen = !0, this._dropdown.style.display = "block", this._arrow.className += " selectbox-arrow-open", this._header.className += " selectbox-header-open", this.searchInput && setTimeout(/* @__PURE__ */ (function(t) {
      return function() {
        t.searchInput && t.searchInput.focus();
      };
    })(this), 100), d(u, this, C).call(this);
  }
  /**
   * @param {function(SelectboxEventType): void} callback
   * @returns {Object}
   */
  subscribe(t) {
    var e = this;
    return this._subscribers.push(t), {
      unsubscribe() {
        e._subscribers = e._subscribers.filter(function(i) {
          return i !== t;
        });
      }
    };
  }
  /**
   * @param {string} value
   * @param {string} text
   * @param {boolean} selected
   */
  addItem(t, e, i) {
    i = i || !1;
    var n = this._items.some((o) => o && o.value === t);
    if (n) {
      var a = this._items.find((o) => o && o.value === t);
      a && (a.selected = i);
    } else
      this._items.push({
        value: t,
        text: e,
        selected: i
      }), this._options.sortable && this._items.sort((o, r) => o && r ? o.text.localeCompare(r.text) : o ? -1 : r ? 1 : 0);
    i && (this._options.multiple ? this._selectedValues.add(t) : (this._selectedValues.clear(), this._selectedValues.add(t))), d(u, this, v).call(this);
  }
  /**
   * @param {Array<[string,string]>} values
   * @param {string} [selectedValue]
   */
  addItems(t, e) {
    var i = this;
    t.forEach(function(n, a) {
      var o = i._items.some((c) => c && c.value === n[0]);
      if (!o) {
        var r = e ? n[0] === e : a === 0;
        r && (i._options.multiple || i._selectedValues.clear(), i._selectedValues.add(n[0])), i._items.push({
          value: n[0],
          text: n[1],
          selected: r
        });
      }
    }, this), this.isOpen && d(u, this, C).call(this), d(u, this, v).call(this);
  }
  /**
   * @param {string} value
   * @param {string} text
   */
  addCustomItem(t, e) {
    this._customItems.push({
      value: t,
      text: e,
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
    this._items = this._items.filter(function(e) {
      return e === null || e.value !== t;
    }), this._customItems = this._customItems.filter(function(e) {
      return e === null || e.value !== t;
    }), this._selectedValues.delete(t), d(u, this, v).call(this);
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
  selectItems(t, e) {
    var i = this;
    if (!this._options.multiple && Array.isArray(t)) {
      console.error("Method selectItem is only available for multi-select boxes.");
      return;
    }
    var n = "";
    if (this._options.multiple) {
      var a = function(p) {
        if (i._optionsContainer) {
          var h = i._optionsContainer.querySelector('[data-value="' + p + '"]');
          if (h) {
            var _ = h.querySelector('input[type="checkbox"]');
            _ && _ instanceof HTMLInputElement && (_.checked = !0), h.classList.add("selectbox-option-selected"), h.classList.add("checkbox--checked");
          }
        }
      };
      if (Array.isArray(t))
        for (var o = 0; o < t.length; o++)
          n = t[o], this._selectedValues.has(n) || (this._selectedValues.add(n), a(n));
      else
        n = t, this._selectedValues.has(n) || (this._selectedValues.add(n), a(n));
    } else if (!Array.isArray(t)) {
      if (n = t, this._selectedValues.clear(), this._selectedValues.add(n), this._optionsContainer) {
        var r = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + n + '"]');
        r.forEach(function(l) {
          l.classList.remove("selectbox-option-selected"), l.classList.remove("checkbox--checked");
        });
        var c = this._optionsContainer.querySelector('[data-value="' + n + '"]');
        c && (c.classList.add("selectbox-option-selected"), c.classList.add("checkbox--checked"));
      }
      d(u, this, f).call(this);
    }
    d(u, this, v).call(this), !e && d(u, this, I).call(this, n, !0);
  }
  /**
   * @param {string | Array<string>} values
   * @param {boolean} [bSilent]
   */
  unselectItems(t, e) {
    var i = this;
    if (!this._options.multiple) {
      console.error("Method unselectItem is only available for multi-select boxes.");
      return;
    }
    var n = "", a = function(c) {
      if (i._optionsContainer) {
        var l = i._optionsContainer.querySelector('[data-value="' + c + '"]');
        if (l) {
          var p = l.querySelector('input[type="checkbox"]');
          p && p instanceof HTMLInputElement && (p.checked = !1), l.classList.remove("selectbox-option-selected"), l.classList.remove("checkbox--checked");
        }
      }
    };
    if (Array.isArray(t))
      for (var o = 0; o < t.length; o++)
        n = t[o], this._selectedValues.has(n) && (this._selectedValues.delete(n), a(n));
    else
      n = t, this._selectedValues.has(n) && (this._selectedValues.delete(n), a(n));
    d(u, this, v).call(this), !e && d(u, this, I).call(this, n, !0);
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
      var e = this._items[0];
      e && this._selectedValues.add(e.value);
    }
    d(u, this, v).call(this), d(u, this, C).call(this);
  }
  destroy() {
    this._subscribers = [], M._.delete(this);
    try {
      this._header && this._boundHandles && this._header.removeEventListener("click", this._boundHandles.toggle), this.searchInput && this._boundHandles && this.searchInput.removeEventListener("input", this._boundHandles.search), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick), document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this._header && this._boundHandles && this._header.removeEventListener("keydown", this._boundHandles.keydown), this._dropdown && this._boundHandles && this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
    } catch (n) {
      console.error(n);
    }
    this._container.innerHTML = "";
    for (var t = this._container.className.split(" "), e = [], i = 0; i < t.length; i++)
      t[i] !== "selectbox-container" && e.push(t[i]);
    this._container.className = e.join(" ");
  }
}
function U() {
  this._container.innerHTML = "", this._container.className += " selectbox-container";
  var s = document.createDocumentFragment();
  if (this._select.className += " selectbox", this._options.multiple && (this._select.className += " selectbox-multiple"), s.appendChild(this._select), this._header.className += " selectbox-header", this._select.appendChild(this._header), this._header.setAttribute("tabindex", "0"), this._selectedText.className += " selectbox-selected-text i18n", this._selectedText.textContent = this._options.placeholder, this._header.appendChild(this._selectedText), this._arrow.className += " selectbox-arrow", this._arrow.innerHTML = "<b></b>", this._header.appendChild(this._arrow), this._dropdown.className += " selectbox-dropdown", this._select.appendChild(this._dropdown), this._options.description) {
    var t = document.createElement("div");
    t.className += " i18n selectbox-description", t.textContent = this._options.description, this._dropdown.appendChild(t);
  }
  if (this._options.searchable) {
    var e = document.createElement("div");
    e.className += " selectbox-search", this._dropdown.appendChild(e), this.searchInput = document.createElement("input"), this.searchInput.className += " selectbox-search-input", this.searchInput.type = "text", this.searchInput.placeholder = "Search...", e.appendChild(this.searchInput);
  }
  if (this._optionsContainer = document.createElement("div"), this._optionsContainer.className += " selectbox-options", this._dropdown.appendChild(this._optionsContainer), this._container.appendChild(s), this._selectbox) {
    var i = this._selectbox.parentNode;
    if (i) {
      i.insertBefore(this._container, this._selectbox);
      var n = d(u, this, X).call(this, this._selectbox);
      this.addItems(n.values, n.selectedValue), this._selectbox.remove();
    }
  }
}
function W() {
  this._header.addEventListener("click", this._boundHandles.toggle), this.searchInput && this.searchInput.addEventListener("input", this._boundHandles.search), this._dropdown.addEventListener("click", this._boundHandles.dropdownClick), this._dropdown.addEventListener("wheel", function(s) {
    s.stopPropagation();
  }), this._header.addEventListener("keydown", this._boundHandles.keydown), this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}
function P(s) {
  if (s && s.stopPropagation(), this.isOpen ? d(u, this, f).call(this) : this.openDropdown(), s && s.type === "click")
    for (var t of M._)
      t.isOpen && t !== this && d(u, t, f).call(t);
}
function f() {
  this.isOpen && document && this._boundHandles && document.removeEventListener("click", this._boundHandles.close), this.isOpen = !1, this._dropdown.style.display = "none";
  for (var s = this._arrow.className.split(" "), t = [], e = 0; e < s.length; e++)
    s[e] !== "selectbox-arrow-open" && t.push(s[e]);
  this._arrow.className = t.join(" ");
  for (var i = this._header.className.split(" "), n = [], e = 0; e < i.length; e++)
    i[e] !== "selectbox-header-open" && n.push(i[e]);
  this._header.className = n.join(" "), this.searchInput && (this.searchInput.value = "");
}
function Y(s) {
  var t = s.target;
  if (t instanceof HTMLInputElement) {
    var e = t.value.toLowerCase();
    d(u, this, C).call(this, e);
  }
}
function D(s) {
  var t = this.searchInput ? this.searchInput.value.toLowerCase() : "", e, i = this._items.filter(function(l) {
    return l !== null;
  });
  if (t && (i = i.filter(function(l) {
    return l.text.toLowerCase().indexOf(t) !== -1;
  })), i.length !== 0) {
    if (s === "up")
      if (this._selectedValues.size === 0 && i.length > 0)
        e = i[i.length - 1], this._selectedValues.add(e.value);
      else {
        for (var n = Array.from(this._selectedValues), a = -1, o = 0; o < i.length; o++)
          if (i[o].value === n[0]) {
            a = o;
            break;
          }
        var r = (a - 1 + i.length) % i.length;
        this._selectedValues.clear(), e = i[r], this._selectedValues.add(e.value);
      }
    else if (this._selectedValues.size === 0 && i.length > 0)
      e = i[0], this._selectedValues.add(e.value);
    else {
      for (var n = Array.from(this._selectedValues), a = -1, o = 0; o < i.length; o++)
        if (i[o].value === n[0]) {
          a = o;
          break;
        }
      var c = (a + 1) % i.length;
      c === i.length && (c = 0), this._selectedValues.clear(), e = i[c], this._selectedValues.add(e.value);
    }
    d(u, this, v).call(this), d(u, this, C).call(this, t, !0), d(u, this, I).call(this, e.value, !0);
  }
}
function Z(s) {
  var t = s.key || s.keyCode;
  switch (t) {
    case "Enter":
    case 13:
      s.preventDefault(), d(u, this, P).call(this, s);
      break;
    case "Escape":
    case 27:
      d(u, this, f).call(this);
      break;
    case "ArrowDown":
    case 40:
      s.preventDefault(), d(u, this, D).call(this, "down");
      break;
    case "ArrowUp":
    case 38:
      s.preventDefault(), d(u, this, D).call(this, "up");
      break;
    case "Tab":
    case 9:
      d(u, this, f).call(this);
      break;
  }
}
function C(s, t) {
  if (s = s || "", !!this._optionsContainer) {
    this._optionsContainer.innerHTML = "";
    var e = null, i = this._items;
    if (s) {
      var n = s.split(/\s+/).filter(Boolean);
      i = i.filter(function(k) {
        if (k === null) return !1;
        var T = k.text.toLowerCase();
        return n.every(function(A) {
          return T.indexOf(A) !== -1;
        });
      });
    }
    for (var a = document.createDocumentFragment(), o = 0; o < i.length; o++) {
      var r = i[o];
      if (!r) {
        var c = document.createElement("hr");
        c.className += " selectbox-option-divider", a.appendChild(c);
        continue;
      }
      var l = document.createElement("div");
      l.className += " selectbox-option", this._selectedValues.has(r.value) && (l.className += " selectbox-option-selected checkbox--checked", e = l), l.setAttribute("data-value", r.value);
      var p = document.createElement("label");
      if (p.className += " selectbox-option-text i18n", this._options.translate && (r.text = this._options.translate(r.text)), p.textContent = r.text, this._options.multiple) {
        l.className += " selectbox-option-checkbox";
        var h = document.createElement("input");
        h.type = "checkbox", h.id = "checkbox-" + r.value, h.className += " selectbox-checkbox", h.checked = this._selectedValues.has(r.value), l.appendChild(h);
        var _ = document.createElement("span");
        _.className = "checkbox-visual", _.setAttribute("aria-hidden", "true");
        var w = "http://www.w3.org/2000/svg", g = document.createElementNS(w, "svg");
        g.setAttribute("viewBox", "0 0 10 8"), g.setAttribute("class", "checkbox-checkmark");
        var b = document.createElementNS(w, "path");
        b.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"), b.setAttribute("fill", "none"), b.setAttribute("stroke", "currentColor"), b.setAttribute("stroke-width", "2"), g.appendChild(b), _.appendChild(g), l.appendChild(_);
      }
      l.appendChild(p), a.appendChild(l);
    }
    if (this._customItems.length) {
      var L = document.createElement("hr");
      L.className += " selectbox-option-divider", a.appendChild(L);
    }
    for (var o = 0; o < this._customItems.length; o++) {
      var x = this._customItems[o], y = document.createElement("label");
      y.className += " selectbox-custom-option", y.setAttribute("data-value", x.value), y.setAttribute("for", x.value);
      var E = document.createElement("span");
      E.className += " selectbox-option-text i18n", this._options.translate && (x.text = this._options.translate(x.text)), E.textContent = x.text, y.appendChild(E), a.appendChild(y);
    }
    if (this._optionsContainer.appendChild(a), t && this.isOpen && this._optionsContainer && e)
      try {
        e.scrollIntoView && e.scrollIntoView({
          block: "nearest"
        });
      } catch (k) {
        console.error(k);
      }
  }
}
function G(s) {
  var t = s.target || s.srcElement, e = null;
  if (t && t instanceof HTMLElement) {
    for (var i = null, n = t.className.split(" "), a = !1, o = 0; o < n.length; o++)
      if (n[o] === "selectbox-option") {
        a = !0;
        break;
      } else if (n[o] === "selectbox-custom-option") {
        var r = t.getAttribute("data-value");
        if (r) {
          s.stopPropagation(), d(u, this, F).call(this, r), d(u, this, f).call(this);
          return;
        }
        break;
      }
    if (a)
      i = t;
    else if (t.parentNode && t.parentNode instanceof HTMLElement) {
      for (var c = t.parentNode.className.split(" "), l = !1, o = 0; o < c.length; o++)
        if (c[o] === "selectbox-option") {
          l = !0;
          break;
        } else if (c[o] === "selectbox-custom-option") {
          var p = t.parentNode.getAttribute("data-value");
          if (p) {
            s.stopPropagation(), d(u, this, F).call(this, p), d(u, this, f).call(this);
            return;
          }
          break;
        }
      l && (i = t.parentNode);
    }
    if (i instanceof HTMLDivElement)
      e = i;
    else
      return;
  } else
    return;
  var h = e.getAttribute("data-value");
  if (h !== null) {
    var _ = !0;
    this._options.multiple ? this._selectedValues.has(h) ? (this.unselectItems(h, !0), _ = !1) : this.selectItems(h, !0) : (this.selectItems(h, !0), d(u, this, f).call(this)), d(u, this, v).call(this), d(u, this, I).call(this, h, _);
  }
}
function v() {
  if (this._selectedValues.size === 0) {
    this._selectedText.textContent = this._options.placeholder;
    return;
  }
  if (this._options.multiple) {
    for (var s = [], t = 0; t < this._items.length; t++) {
      var e = this._items[t];
      e && this._selectedValues.has(e.value) && s.push(e);
    }
    s.length === 0 ? this._selectedText.textContent = this._options.placeholder : s.length === 1 ? this._selectedText.textContent = s[0].text : this._selectedText.textContent = s.length + " items selected";
  } else {
    for (var i = null, t = 0; t < this._items.length; t++) {
      var e = this._items[t];
      if (e && this._selectedValues.has(e.value)) {
        i = e;
        break;
      }
    }
    this._selectedText.textContent = i ? i.text : this._options.placeholder;
  }
}
function I(s, t) {
  for (var e = Array.from(this._selectedValues), i = [], n = 0; n < this._items.length; n++) {
    var a = this._items[n];
    a && this._selectedValues.has(a.value) && i.push(a);
  }
  var o = {
    values: e,
    items: i,
    current: s,
    enabled: t
  };
  this._subscribers.forEach(function(r) {
    r({
      type: "selectbox:change",
      detail: o
    });
  });
}
function F(s) {
  var t = {
    values: [],
    current: s,
    enabled: !1
  };
  this._subscribers.forEach(function(e) {
    e({
      type: "selectbox:custom",
      detail: t
    });
  });
}
function X(s) {
  var t = Array.from(s.options).map((n) => [n.value, n.text]), e = {
    values: t
  }, i = s.value;
  return i && (e.selectedValue = i), e;
}
var M = {
  _: /* @__PURE__ */ new Set()
};
document.getElementById("loader");
var J = [["appendix", "Appendix"], ["article", "Article"], ["book", "Book"], ["chapter", "Chapter"], ["column", "Column"], ["figure", "Figure"], ["folio", "Folio"], ["issue", "Issue"], ["line", "Line"], ["note", "Note"], ["opus", "Opus"], ["page", "Page"], ["paragraph", "Paragraph"], ["part", "Part"], ["rule", "Rule"], ["section", "Section"], ["sub-verbo", "Sub verbo"], ["table", "Table"], ["title", "Title"], ["verses", "Verses"], ["volume", "Volume"]], j = {
  /**
   * @param {AscTheme} theme
   */
  addStylesForComponents: function(t) {
    var e = "";
    t["background-toolbar"] && (e += `.loader-body,
.loader-bg { background-color: ` + t["background-toolbar"] + `; }
`, e += ".loader-body {     box-shadow: 0 0 99px 99px " + t["background-toolbar"] + `; }
`), t["background-loader"] && (e += ".loader-image { color: " + t["background-loader"] + `; }
`), t["background-normal"] && (e += `.custom-button-secondary-icon,
.custom-button-secondary,
.input-field-element,
.selectbox-search-input,
.selectbox-header,
.selectbox-dropdown,
.radio-visual, 
.checkbox-visual, 
.message { background-color: ` + t["background-normal"] + `; }
`), t["text-inverse"] && (e += ".custom-button-primary { color: " + t["text-inverse"] + `; }
`), t["border-regular-control"] && (e += `.custom-button-icon-only:active:not(.custom-button-disabled),
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
`, e += `.selectbox-search,
.selectbox-option-divider { border-color: ` + t["border-regular-control"] + ` !important; }
`), t["border-error"] && (e += ".input-field-invalid .input-field-element { border-color: " + t["border-error"] + `; }
`), t["border-control-focus"] && (e += `.custom-button-icon-only:focus:not(:active):not(:hover),
.custom-button-secondary-icon:focus:not(:active):not(:hover),
.custom-button-secondary:focus:not(:active):not(:hover),
.input-field-element:focus,
.input-field-focused .input-field-element,
.selectbox-header:active,
.selectbox-header:focus,
.selectbox-header-open { border-color: ` + t["border-control-focus"] + `; }
`), t["highlight-button-hover"] && (e += `.custom-button-icon-only:hover:not(.custom-button-disabled),
.custom-button-secondary-icon:hover:not(.custom-button-disabled),
.custom-button-secondary:hover:not(.custom-button-disabled),
.selectbox-custom-option:hover,
.selectbox-option:hover { background-color: ` + t["highlight-button-hover"] + `; }
`), t["highlight-button-pressed"] && (e += `.custom-button-icon-only:active:not(.custom-button-disabled),
.custom-button-secondary-icon:active:not(.custom-button-disabled),
.custom-button-secondary:active:not(.custom-button-disabled),
.selectbox-option-selected:hover,
.selectbox-option-selected { background-color: ` + t["highlight-button-pressed"] + `; }
`, e += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + t["highlight-button-pressed"] + `; }
`), t["highlight-primary-dialog-button-hover"] && (e += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + t["highlight-primary-dialog-button-hover"] + "; border-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`), t["background-primary-dialog-button"] && (e += `.checkbox-indeterminate,
.custom-button-primary { background-color: ` + t["background-primary-dialog-button"] + "; border-color: " + t["background-primary-dialog-button"] + `; }
`), t["background-toolbar-additional"] && (e += `.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled { background-color: ` + t["background-toolbar-additional"] + "; border-color: " + t["background-toolbar-additional"] + `; }
`), t["text-normal"] && (e += `.custom-button-secondary-icon,
.custom-button-secondary,
.custom-button-secondary-icon,
.custom-button-icon-only,
.selectbox-search-input,
.loader-image,
.input-field-element { color: ` + t["text-normal"] + `; }
`, e += ".input-field-search-icon svg { fill: " + t["text-normal"] + `; }
`, e += ".selectbox-arrow b { border-color: " + t["text-normal"] + `; }
`), t["text-secondary"] && (e += `.message-close:hover,
.input-field-clear:hover { color: ` + t["text-secondary"] + `; }
`), t["text-tertiary"] && (e += `.input-field-clear,
.message-container:hover .message-close,
.custom-button-secondary-icon:disabled,
.custom-button-secondary-icon.custom-button-disabled,
.custom-button-secondary:disabled,
.custom-button-secondary.custom-button-disabled,
.input-field-element::placeholder,
.selectbox-search-input::placeholder { color: ` + t["text-tertiary"] + `; }
`);
    var i = "11px";
    ["theme-white", "theme-night"].indexOf(t.name) !== -1 || ["theme-white", "theme-night"].indexOf(t.Name) !== -1 ? (i = "12px", e += `.message,
.custom-button,
.selectbox-header,
.input-field-element { border-radius: 4px; }
`, e += `.radio--checked .radio-visual { border-width: 4px; }
`, e += ".checkbox-checkmark { color: " + t["text-inverse"] + `; }
`, e += ".checkbox--checked .checkbox-visual { background-color: " + t["background-primary-dialog-button"] + `; }
`, e += `.radio--checked .radio-visual,
.checkbox--checked .checkbox-visual { border-color: ` + t["background-primary-dialog-button"] + `; }
`, e += `.radio-button-container:hover:not(.radio--checked) .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: ` + t["highlight-button-hover"] + `; }
`, e += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + "; background-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`, e += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + t["highlight-primary-dialog-button-hover"] + `; }
`, e += `body { font-size: 12px; }
`) : (e += ".checkbox-checkmark { color: " + t["text-normal"] + `; }
`, e += ".radio--checked .radio-visual { background-color: " + t["text-normal"] + `;
 box-shadow: 0 0 0 2px` + t["background-normal"] + ` inset; }
`, e += `.radio-button-container:hover .radio-visual,
.checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: ` + t["border-control-focus"] + `; }
`), e += "body, input, textarea, select, button { font-size: " + i + `; }
`;
    var n = document.getElementById("componentsStyles");
    return n ? (n.innerHTML = e, e) : (n = document.createElement("style"), n.id = "componentsStyles", n.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(n), e);
  },
  /**
   * @param {AscTheme} theme
   */
  fixThemeForIE: function(t) {
    return t["background-toolbar"] || (t["background-toolbar"] = "#f7f7f7"), t["text-normal"] || (t["text-normal"] = "rgb(51, 51, 51)"), t["text-secondary"] || (t["text-secondary"] = "#848484"), t["highlight-button-hover"] || (t["highlight-button-hover"] = "#e0e0e0"), t["background-normal"] || (t["background-normal"] = "white"), t["background-loader"] || (t["background-loader"] = "rgba(24, 24, 24, 0.9)"), t["highlight-button-pressed"] || (t["highlight-button-pressed"] = "#cbcbcb"), t["text-inverse"] || (t["text-inverse"] = "white"), t["border-regular-control"] || (t["border-regular-control"] = "#c0c0c0"), t["border-error"] || (t["border-error"] = "#f62211"), t["border-control-focus"] || (t["border-control-focus"] = "#848484"), t["highlight-primary-dialog-button-hover"] || (t["highlight-primary-dialog-button-hover"] = "#1c1c1c"), t["background-primary-dialog-button"] || (t["background-primary-dialog-button"] = "#444444"), t["background-toolbar-additional"] || (t["background-toolbar-additional"] = "#efefef"), t["text-tertiary"] || (t["text-tertiary"] = "#bdbdbd"), t;
  }
};
(function() {
  class s {
    constructor() {
      var i = document.querySelector(".container");
      if (!(i instanceof HTMLElement))
        throw new Error("container is not initialized");
      this._container = i, this.citationObject = null, this.forms = [];
    }
    /**
     * @param {CitationItem} citationItem
     */
    createForm(i) {
      var n = document.createElement("form");
      n.classList.add("form"), n.classList.add("message-container"), this._container.appendChild(n);
      var a = document.createElement("button");
      a.className = "message-close i18n", a.textContent = "×", a.setAttribute("aria-label", "Close"), a.setAttribute("title", "Remove"), a.setAttribute("type", "button"), a.onclick = this.removeItem.bind(this, n, i.id), n.appendChild(a);
      var o = document.createElement("div");
      o.classList.add("title"), o.textContent = i.itemData.title, n.appendChild(o);
      var r = document.createDocumentFragment(), c = document.createElement("div"), l = document.createElement("input"), p = document.createElement("input"), h = document.createElement("div"), _ = document.createElement("div"), w = document.createElement("input"), g = document.createElement("div"), b = document.createElement("input");
      r.appendChild(h), h.appendChild(_), h.appendChild(w);
      var L = "";
      r.appendChild(c), c.appendChild(l), c.appendChild(p), r.appendChild(g), g.appendChild(b);
      var x = new N(l, {
        type: "text",
        placeholder: "Prefix",
        value: i.prefix,
        showClear: !1
      }), y = new N(p, {
        type: "text",
        placeholder: "Suffix",
        value: i.suffix,
        showClear: !1
      }), E = new K(_, {
        placeholder: "Locator",
        translate: Asc.plugin.tr
      }), k = i.label || "page";
      J.forEach(function(m) {
        var H = m[0] === k;
        E.addItem(m[0], m[1], H), H && (L = m[1]);
      });
      var T = new N(w, {
        type: "text",
        placeholder: L,
        value: i.locator,
        showClear: !1
      }), A = new S(b, {
        label: "Omit Author",
        checked: !!i["suppress-author"]
      });
      E.subscribe(function(m) {
        if (!(m.type !== "selectbox:change" || !m.detail.items)) {
          var H = m.detail.items[0];
          T.setPlaceholder(H.text);
        }
      }), this.forms.push({
        omitAuthorInput: A,
        prefixInput: x,
        suffixInput: y,
        locatorInput: T,
        locatorSelectbox: E
      }), n.appendChild(r);
    }
    updateRemoveButtonsVisibility() {
      var i;
      if (this.citationObject) {
        var n = this.citationObject.citationItems.length;
        n > 1 ? this._container.classList.remove("hide-remove-button") : this._container.classList.add("hide-remove-button");
        var a = ((i = document.querySelector("form")) === null || i === void 0 ? void 0 : i.offsetHeight) || 134, o = n === 1 ? a + 16 : 2 * a;
        window.Asc.plugin.sendToPlugin("onUpdateHeight", o);
      }
    }
    /**
     * @param {HTMLFormElement} form
     * @param {string} id
     */
    removeItem(i, n) {
      this.citationObject && (this.citationObject.citationItems = this.citationObject.citationItems.filter((a) => a.id !== n), this._container.removeChild(i), this.updateRemoveButtonsVisibility());
    }
    onTranslate() {
      for (var i = document.getElementsByClassName("i18n"), n = function() {
        var r = i[a];
        if (!(r instanceof HTMLElement)) return 1;
        ["placeholder", "title"].forEach((l) => {
          r.hasAttribute(l) && r.setAttribute(l, window.Asc.plugin.tr(r.getAttribute(l) || ""));
        });
        var c = window.Asc.plugin.tr(r.innerText.trim().replace(/\s+/g, " "));
        c && (r.innerText = c);
      }, a = 0; a < i.length; a++)
        n();
    }
    /** @param {AscTheme} theme */
    onThemeChanged(i) {
      window.Asc.plugin.onThemeChangedBase(i), j.fixThemeForIE(i), j.addStylesForComponents(i);
      var n = "";
      n += "body { background-color: " + i["background-normal"] + ` !important;}
`;
      var a = document.getElementById("pluginStyles");
      a ? a.innerHTML = n : (a = document.createElement("style"), a.id = "pluginStyles", a.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(a));
    }
    /** @param {{citationItems: CitationItem[]}} citationObject */
    onAttachedContent(i) {
      var n = this;
      return q(function* () {
        if (n.citationObject = i, !!n.citationObject) {
          n.citationObject.citationItems.forEach((o) => {
            n.createForm(o);
          }), n.updateRemoveButtonsVisibility();
          for (var a = 0; a < 10; a++) {
            if (window.Asc.plugin.translateManager) {
              n.onTranslate(), a = Number.MAX_SAFE_INTEGER;
              break;
            }
            yield new Promise((o) => setTimeout(() => o(!0), 100));
          }
        }
      })();
    }
    onClickSave() {
      for (var i = !1, n = 0; n < this.forms.length; n++) {
        var a, o = this.forms[n], r = (a = this.citationObject) === null || a === void 0 ? void 0 : a.citationItems[n];
        if (r) {
          var c = o.prefixInput.getValue(), l = o.suffixInput.getValue(), p = o.locatorSelectbox.getSelectedValue(), h = o.locatorInput.getValue(), _ = o.omitAuthorInput.getState().checked;
          (r.prefix || c) && r.prefix !== c && (r.prefix = c, i = !0), (r.suffix || l) && r.suffix !== l && (r.suffix = l, i = !0), (r.label || p) && r.label !== p && p && (r.label = p, i = !0), (r.locator || h) && r.locator !== h && (r.locator = h, i = !0), !!r["suppress-author"] !== _ && (r["suppress-author"] = _, i = !0);
        }
      }
      return i;
    }
  }
  var t = new s();
  window.Asc.plugin.init = function() {
    window.Asc.plugin.sendToPlugin("onWindowReady", {});
  }, window.Asc.plugin.onThemeChanged = t.onThemeChanged.bind(t), window.Asc.plugin.attachEvent("onThemeChanged", t.onThemeChanged.bind(t)), window.Asc.plugin.attachEvent("onAttachedContent", t.onAttachedContent.bind(t)), window.Asc.plugin.attachEvent("onClickSave", () => {
    var e = t.onClickSave();
    e ? window.Asc.plugin.sendToPlugin("onSaveFields", t.citationObject) : window.Asc.plugin.sendToPlugin("onSaveFields", null);
  });
})();
//# sourceMappingURL=edit-window.modern.js.map
