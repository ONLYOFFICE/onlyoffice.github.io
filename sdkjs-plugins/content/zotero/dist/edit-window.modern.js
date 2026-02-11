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
function InputField(input, options) {
    var self = this;
    options = options || {};
    if (typeof input === "string") {
        var temp = document.getElementById(input);
        if (temp instanceof HTMLInputElement) {
            input = temp;
        }
    }
    if (input instanceof HTMLInputElement) {
        this.input = input;
    } else {
        throw new Error("Invalid input element");
    }
    this._container = document.createElement("div");
    this._options = {
        type: options.type || input.type || "text",
        placeholder: options.placeholder || input.placeholder || "",
        value: options.value || input.value || "",
        autofocus: options.autofocus || false,
        disabled: options.disabled || false,
        readonly: options.readonly || false,
        required: options.required || false,
        showCounter: options.showCounter || false,
        showClear: options.showClear !== undefined ? options.showClear : true,
        autocomplete: options.autocomplete || "off"
    };
    for (var key in options) {
        if (!this._options.hasOwnProperty(key)) {
            this._options[key] = options[key];
        }
    }
    this._id = input.id || "input_" + Math.random().toString(36).slice(2, 9);
    this.isFocused = false;
    this.isValid = true;
    this._validationMessage = "";
    this._subscribers = [];
    this._boundHandles = {
        focus: function focus(e) {
            self._handleFocus(e);
        },
        blur: function blur(e) {
            self._handleBlur(e);
        },
        input: function input(e) {
            self._handleInput(e);
        },
        keydown: function keydown(e) {
            self._handleKeydown(e);
        },
        clear: function clear() {
            self.clear();
        },
        validate: function validate() {
            self.validate();
        }
    };
    this._clearButton = null;
    this._counter = null;
    this._counterCurrent = null;
    this._counterMax = null;
    this._validationElement = document.createElement("div");
    if (this._options.type === "search") {
        this._searchIcon = document.createElement("span");
        this._boundHandles.search = this._triggerSubmit.bind(this);
        this._container.classList.add("input-field-search");
    }
    this._createDOM();
    this._bindEvents();
    this._updateState();
    if (this._options.autofocus) {
        setTimeout(function(self) {
            return function() {
                self.focus();
            };
        }(this), 100);
    }
}

InputField.prototype = {
    constructor: InputField,
    input: null,
    _container: null,
    _options: {},
    _id: "",
    isFocused: false,
    isValid: true,
    _validationMessage: "",
    _subscribers: [],
    _boundHandles: null,
    _clearButton: null,
    _counter: null,
    _counterCurrent: null,
    _counterMax: null,
    _validationElement: null,
    _createDOM: function _createDOM() {
        var parent = this.input.parentNode;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className += " input-field-container  input-field-container-" + this._id;
        var inputField = document.createElement("div");
        this._container.appendChild(inputField);
        inputField.className += " input-field";
        if (this._options.disabled) {
            inputField.className += " input-field-disabled";
        }
        var inputFieldMain = document.createElement("div");
        inputField.appendChild(inputFieldMain);
        inputFieldMain.className += " input-field-main";
        this.input.className += " input-field-element";
        this.input.type = this._options.type || "text";
        this.input.placeholder = this._options.placeholder || "";
        this.input.value = String(this._options.value) || "";
        if (this._options.disabled) {
            this.input.disabled = true;
        }
        if (this._options.readonly) {
            this.input.readOnly = true;
        }
        if (this._options.required) {
            this.input.required = true;
        }
        if (this._options.maxLength) {
            this.input.maxLength = this._options.maxLength;
        }
        if (this._options.pattern) {
            this.input.pattern = this._options.pattern;
        }
        if (this._options.autocomplete) {
            this.input.autocomplete = this._options.autocomplete;
        }
        if (this._options.showCounter) {
            this._counter = document.createElement("div");
            inputField.appendChild(this._counter);
            this._counter.className += " input-field-counter";
            this._counterCurrent = document.createElement("span");
            this._counterCurrent.className += " input-field-counter-current";
            this._counterCurrent.textContent = "0";
            this._counter.appendChild(this._counterCurrent);
            var span = document.createElement("span");
            span.textContent = "/";
            this._counter.appendChild(span);
            this._counterMax = document.createElement("span");
            this._counterMax.className += " input-field-counter-max";
            this._counterMax.textContent = String(this._options.maxLength) || "∞";
            this._counter.appendChild(this._counterMax);
        }
        inputField.appendChild(this._validationElement);
        this._validationElement.className += " input-field-validation";
        this._validationElement.style.display = "none";
        if (this._options.showClear) {
            this.input.className += " input-field-clearable";
            this._clearButton = document.createElement("button");
            inputField.appendChild(this._clearButton);
            this._clearButton.className += " input-field-clear";
            this._clearButton.style.display = "none";
            this._clearButton.textContent = "×";
        }
        if (this._options.showSearchIcon) {
            this._searchIcon.classList.add("input-field-search-icon");
            this._searchIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" ' + 'fill="none" xmlns="http://www.w3.org/2000/svg">' + '<path fill-rule="evenodd" clip-rule="evenodd" ' + 'd="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" ' + 'fill="currentColor"/>' + "</svg>";
            inputFieldMain.appendChild(this._searchIcon);
        }
        if (parent) {
            parent.insertBefore(fragment, this.input);
        }
        inputFieldMain.appendChild(this.input);
    },
    _bindEvents: function _bindEvents() {
        this.input.addEventListener("focus", this._boundHandles.focus);
        this.input.addEventListener("blur", this._boundHandles.blur);
        this.input.addEventListener("input", this._boundHandles.input);
        this.input.addEventListener("keydown", this._boundHandles.keydown);
        if (this._clearButton) {
            this._clearButton.addEventListener("click", this._boundHandles.clear);
        }
        if (this._options.showSearchIcon && this._boundHandles.search) {
            this._searchIcon.addEventListener("click", this._boundHandles.search);
        }
        this.input.addEventListener("change", this._boundHandles.validate);
    },
    _handleFocus: function _handleFocus(e) {
        this.isFocused = true;
        this._container.className += " input-field-focused";
        this._updateClearButton();
        this._triggerFocusEvent(e);
    },
    _handleBlur: function _handleBlur(e) {
        this.isFocused = false;
        var classes = this._container.className.split(" ");
        var newClasses = [];
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] !== "input-field-focused") {
                newClasses.push(classes[i]);
            }
        }
        this._container.className = newClasses.join(" ");
        this.validate();
        this._triggerBlurEvent(e);
    },
    _handleInput: function _handleInput(e) {
        this._updateClearButton();
        this._updateCounter();
        this._triggerInputEvent(e);
    },
    _handleKeydown: function _handleKeydown(e) {
        var key = e.key || e.keyCode;
        if ((key === "Escape" || key === 27) && this._options.showClear) {
            this.clear();
            e.preventDefault();
        }
        if (key === "Enter" || key === 13) {
            this._triggerSubmit();
        }
    },
    _updateClearButton: function _updateClearButton() {
        if (this._clearButton) {
            var hasValue = this.input.value.length > 0;
            this._clearButton.style.display = hasValue ? "block" : "none";
        }
    },
    _updateCounter: function _updateCounter() {
        if (this._counter && this._options.maxLength) {
            var current = this.input.value.length;
            var max = this._options.maxLength;
            if (this._counterCurrent) {
                this._counterCurrent.textContent = String(current);
            }
            if (this._counterMax) {
                this._counterMax.textContent = String(max);
            }
            if (current > max * .9) {
                var counterClasses = this._counter.className.split(" ");
                if (counterClasses.indexOf("input-field-counter-warning") === -1) {
                    this._counter.className += " input-field-counter-warning";
                }
            } else {
                this._counter.className = this._counter.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-counter-warning";
                }).join(" ");
            }
            if (current > max) {
                var counterClasses = this._counter.className.split(" ");
                if (counterClasses.indexOf("input-field-counter-error") === -1) {
                    this._counter.className += " input-field-counter-error";
                }
            } else {
                this._counter.className = this._counter.className.split(" ").filter(function(cls) {
                    return cls !== "input-field-counter-error";
                }).join(" ");
            }
        }
    },
    validate: function validate() {
        if (!this._options.validation) {
            this.isValid = true;
            return true;
        }
        var value = this.input.value;
        var isValid = true;
        var message = "";
        if (this._options.required && !value.trim()) {
            isValid = false;
            message = "This field is required";
        } else if (this._options.minLength && value.length < this._options.minLength) {
            isValid = false;
            message = "Minimum length is " + this._options.minLength + " characters";
        } else if (this._options.maxLength && value.length > this._options.maxLength) {
            isValid = false;
            message = "Maximum length is " + this._options.maxLength + " characters";
        } else if (this._options.pattern && !new RegExp(this._options.pattern).test(value)) {
            isValid = false;
            message = "Invalid format";
        }
        if (isValid && typeof this._options.validation === "function") {
            var customValidation = this._options.validation(value);
            if (customValidation && !customValidation.isValid) {
                isValid = false;
                message = customValidation.message || "Invalid value";
            }
        }
        this.isValid = isValid;
        this._validationMessage = message;
        this.updateValidationState();
        return isValid;
    },
    updateValidationState: function updateValidationState() {
        if (!this.isValid) {
            this._validationElement.textContent = this._validationMessage;
            this._validationElement.style.display = "block";
            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-invalid") === -1) {
                this._container.className += " input-field-invalid";
            }
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-valid";
            }).join(" ");
        } else if (this.input.value.length > 0) {
            this._validationElement.style.display = "none";
            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-valid") === -1) {
                this._container.className += " input-field-valid";
            }
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-invalid";
            }).join(" ");
        } else {
            this._validationElement.style.display = "none";
            this._container.className = this._container.className.split(" ").filter(function(cls) {
                return cls !== "input-field-valid" && cls !== "input-field-invalid";
            }).join(" ");
        }
    },
    _updateState: function _updateState() {
        this._updateClearButton();
        this._updateCounter();
        this.validate();
    },
    getValue: function getValue() {
        return this.input.value.trim();
    },
    setValue: function setValue(value) {
        this.input.value = value;
        this._updateState();
        this._triggerChange();
    },
    setPlaceholder: function setPlaceholder(value) {
        this.input.placeholder = value;
        this._options.placeholder = value;
    },
    clear: function clear(bFocus) {
        bFocus = bFocus !== undefined ? bFocus : true;
        this.setValue("");
        if (bFocus) {
            this.input.focus();
        }
    },
    focus: function focus() {
        this.input.focus();
    },
    blur: function blur() {
        this.input.blur();
    },
    enable: function enable() {
        this.input.disabled = false;
        this._options.disabled = false;
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "input-field-disabled";
        }).join(" ");
    },
    disable: function disable() {
        this.input.disabled = true;
        this._options.disabled = true;
        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("input-field-disabled") === -1) {
            this._container.className += " input-field-disabled";
        }
    },
    subscribe: function subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    },
    _triggerInputEvent: function _triggerInputEvent(e) {
        var detail = {
            value: this.input.value,
            originalEvent: e
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:input",
                detail: detail
            });
        });
    },
    _triggerFocusEvent: function _triggerFocusEvent(e) {
        var detail = {
            value: this.input.value,
            originalEvent: e
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:focus",
                detail: detail
            });
        });
    },
    _triggerBlurEvent: function _triggerBlurEvent(e) {
        var detail = {
            value: this.input.value,
            originalEvent: e
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:blur",
                detail: detail
            });
        });
    },
    _triggerChange: function _triggerChange() {
        var detail = {
            value: this.input.value,
            isValid: this.isValid
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:change",
                detail: detail
            });
        });
    },
    _triggerSubmit: function _triggerSubmit() {
        var detail = {
            value: this.input.value,
            isValid: this.isValid
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "inputfield:submit",
                detail: detail
            });
        });
    },
    destroy: function destroy() {
        this._subscribers = [];
        if (this._boundHandles) {
            try {
                this.input.removeEventListener("focus", this._boundHandles.focus);
                this.input.removeEventListener("blur", this._boundHandles.blur);
                this.input.removeEventListener("input", this._boundHandles.input);
                this.input.removeEventListener("keydown", this._boundHandles.keydown);
                if (this._clearButton) {
                    this._clearButton.removeEventListener("click", this._boundHandles.clear);
                }
                if (this._options.showSearchIcon && this._boundHandles.search) {
                    this._searchIcon.removeEventListener("click", this._boundHandles.search);
                }
                this.input.removeEventListener("change", this._boundHandles.validate);
            } catch (error) {
                console.error(error);
            }
        }
        this._container.innerHTML = "";
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "input-field-container";
        }).join(" ");
    }
};

function Message(container, options) {
    if (typeof container === "string") {
        var temp = document.getElementById(container);
        if (temp instanceof HTMLElement) {
            container = temp;
        }
    }
    if (container instanceof HTMLElement) {
        this.container = container;
    } else {
        throw new Error("Invalid container element");
    }
    this._options = Object.assign(this._options, options);
    this._isShow = false;
}

Message.prototype = {
    constructor: Message,
    _options: {
        type: "info",
        text: "",
        title: "",
        duration: 0,
        closeButton: true,
        autoClose: false,
        closeOnClickOutside: true
    },
    _outsideClickListener: null,
    _element: null,
    _timeoutId: null,
    _create: function _create() {
        var messageEl = document.createElement("div");
        messageEl.className = "message message-" + this._options.type;
        messageEl.setAttribute("role", "alert");
        var title = this._options.title;
        if (!title) {
            title = "Error";
            switch (this._options.type) {
              case "success":
                title = "Success";
                break;

              case "warning":
                title = "Warning";
                break;

              case "info":
                title = "Information";
                break;
            }
        }
        var text = this._options.text;
        if (!text) {
            text = "";
            switch (this._options.type) {
              case "success":
                text = "Operation completed successfully.";
                break;

              case "warning":
                text = "Please be cautious.";
                break;

              case "error":
                text = "Something went wrong.";
                break;
            }
        }
        messageEl.innerHTML = '<div class="message-content">' + '<span class="message-title">' + title + "</span>" + '<span class="message-text">' + text + "</span>" + "</div>";
        if (this._options.closeButton) {
            var closeBtn = document.createElement("button");
            closeBtn.className = "message-close";
            closeBtn.textContent = "×";
            closeBtn.setAttribute("aria-label", "Close");
            closeBtn.onclick = this.close.bind(this);
            messageEl.appendChild(closeBtn);
        }
        return messageEl;
    },
    addOutsideClickListener: function addOutsideClickListener() {
        if (this._outsideClickListener) {
            document.removeEventListener("click", this._outsideClickListener);
        }
        var self = this;
        this._outsideClickListener = function(e) {
            if (e.target instanceof HTMLElement === false) {
                return;
            }
            if (self._element && !self._element.contains(e.target)) {
                self.close();
            }
        };
        setTimeout(function() {
            if (!self._outsideClickListener) {
                return;
            }
            document.addEventListener("click", self._outsideClickListener);
        }, 10);
    },
    removeOutsideClickListener: function removeOutsideClickListener() {
        if (this._outsideClickListener) {
            document.removeEventListener("click", this._outsideClickListener);
            this._outsideClickListener = null;
        }
    },
    show: function show(text, title) {
        if (this._isShow) {
            return this;
        }
        this._isShow = true;
        if (!this.container.classList.contains("message-container")) {
            this.container.classList.add("message-container");
        }
        if (title) {
            this._options.title = title;
        }
        if (text) {
            this._options.text = text;
        }
        var messageEl = this._create();
        this._element = messageEl;
        this.container.appendChild(messageEl);
        setTimeout(function() {
            messageEl.style.opacity = "1";
            messageEl.style.transform = "translateY(0)";
        }, 10);
        if (this._options.autoClose && Number(this._options.duration) > 0) {
            this._timeoutId = setTimeout(this.close.bind(this), this._options.duration);
        }
        if (this._options.closeOnClickOutside) {
            this.addOutsideClickListener();
        }
        return this;
    },
    close: function close() {
        this._isShow = false;
        if (!this._element || !this._element.parentNode) {
            return;
        }
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = null;
        }
        this.removeOutsideClickListener();
        var _element = this._element;
        _element.style.opacity = "0";
        _element.style.transform = "translateY(-20px)";
        setTimeout(function() {
            if (_element.parentNode) {
                _element.parentNode.removeChild(_element);
            }
        }, 300);
    }
};

function Button(button, options) {
    var self = this;
    if (typeof button === "string") {
        var temp = document.getElementById(button);
        if (temp instanceof HTMLButtonElement) {
            button = temp;
        }
    }
    if (button instanceof HTMLButtonElement) {
        this._button = button;
    } else {
        throw new Error("Invalid button");
    }
    this._container = document.createElement("div");
    this._options = options || {};
    this._options.text = this._options.text || button.textContent.trim();
    this._options.type = this._options.type || "button";
    this._options.variant = this._options.variant || "primary";
    this._options.size = this._options.size || "medium";
    this._options.iconPosition = this._options.iconPosition || "left";
    this.isLoading = false;
    this._originalText = this._options.text;
    this._subscribers = [];
    this._boundHandles = {
        click: function click(e) {
            self._handleClick(e);
        },
        mouseenter: function mouseenter() {
            self._handleMouseEnter();
        },
        mouseleave: function mouseleave() {
            self._handleMouseLeave();
        },
        focus: function focus() {
            self._handleFocus();
        },
        blur: function blur() {
            self._handleBlur();
        },
        keydown: function keydown(e) {
            self._handleKeydown(e);
        }
    };
    this._createDOM();
    this._bindEvents();
    this.updateState();
}

Button.prototype = {
    constructor: Button,
    _button: null,
    _buttonText: null,
    _spinner: null,
    _badgeElement: null,
    _createDOM: function _createDOM() {
        var parent = this._button.parentNode;
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className += " custom-button-container";
        this._button.className += " custom-button";
        this._button.className += " custom-button-" + this._options.variant;
        this._button.className += " custom-button-" + this._options.size;
        if (this._options.disabled) {
            this._button.className += " custom-button-disabled";
        }
        if (this._options.loading) {
            this._container.className += " custom-button-loading";
        }
        if (this._options.type) {
            this._button.type = this._options.type;
        }
        if (this._options.tooltip) {
            this._button.title = this._options.tooltip;
        }
        if (this._options.disabled) {
            this._button.disabled = true;
        }
        if (this._options.text) {
            this._button.textContent = "";
            this._buttonText = document.createElement("span");
            this._buttonText.className = "custom-button-text";
            this._buttonText.textContent = this._options.text || "";
            if (this._options.icon) {
                var iconSpan = document.createElement("span");
                iconSpan.className = "custom-button-icon";
                if (this._options.iconPosition === "left") {
                    iconSpan.className += " custom-button-icon-left";
                    this._button.appendChild(iconSpan);
                    this._button.appendChild(this._buttonText);
                } else {
                    iconSpan.className += " custom-button-icon-right";
                    this._button.appendChild(this._buttonText);
                    this._button.appendChild(iconSpan);
                }
                iconSpan.innerHTML = this._options.icon;
            } else {
                this._button.appendChild(this._buttonText);
            }
        }
        if (this._options.loading) {
            this._spinner = document.createElement("span");
            this._spinner.className = "custom-button-spinner";
            this._button.appendChild(this._spinner);
        }
        if (this._options.badge) {
            this._badgeElement = document.createElement("span");
            this._badgeElement.className = "custom-button-badge";
            this._badgeElement.textContent = this._options.badge;
            this._button.appendChild(this._badgeElement);
        }
        if (parent) {
            parent.insertBefore(fragment, this._button);
        }
        this._container.appendChild(this._button);
    },
    _bindEvents: function _bindEvents() {
        this._button.addEventListener("click", this._boundHandles.click);
        this._button.addEventListener("mouseenter", this._boundHandles.mouseenter);
        this._button.addEventListener("mouseleave", this._boundHandles.mouseleave);
        this._button.addEventListener("focus", this._boundHandles.focus);
        this._button.addEventListener("blur", this._boundHandles.blur);
        this._button.addEventListener("keydown", this._boundHandles.keydown);
    },
    _handleClick: function _handleClick(e) {
        if (this._options.disabled || this.isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.triggerClickEvent(e);
    },
    _handleMouseEnter: function _handleMouseEnter() {
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-hover") === -1) {
            this._button.className += " custom-button-hover";
        }
        this.triggerEvent("mouseenter");
    },
    _handleMouseLeave: function _handleMouseLeave() {
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-hover";
        }).join(" ");
        this.triggerEvent("mouseleave");
    },
    _handleFocus: function _handleFocus() {
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-focused") === -1) {
            this._button.className += " custom-button-focused";
        }
        this.triggerEvent("focus");
    },
    _handleBlur: function _handleBlur() {
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-focused";
        }).join(" ");
        this.triggerEvent("blur");
    },
    _handleKeydown: function _handleKeydown(e) {
        var key = e.key || e.keyCode;
        if (key === " " || key === "Enter" || key === 32 || key === 13) {
            if (this._button.tagName === "BUTTON") ; else {
                e.preventDefault();
                this._button.click();
            }
        } else if (key === "Escape" || key === 27) {
            this._button.blur();
        }
        this.triggerEvent("keydown", {
            key: key
        });
    },
    subscribe: function subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    },
    setText: function setText(text) {
        if (typeof text === "undefined") return;
        this._options.text = text;
        if (!this._buttonText) {
            this._buttonText = document.createElement("span");
            this._buttonText.className = "custom-button-text";
            this._buttonText.textContent = "";
            this._button.appendChild(this._buttonText);
        }
        this._buttonText.textContent = text;
    },
    setIcon: function setIcon(icon, position) {
        this._options.icon = icon;
        this._options.iconPosition = position || "left";
    },
    setBadge: function setBadge(badge) {
        if (typeof badge === "undefined") return;
        this._options.badge = badge;
        if (this._badgeElement) {
            this._badgeElement.textContent = badge;
            this._badgeElement.style.display = badge ? "flex" : "none";
        }
    },
    setVariant: function setVariant(variant) {
        if (typeof variant === "undefined") return;
        var oldClass = "custom-button-" + this._options.variant;
        var newClass = "custom-button-" + variant;
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== oldClass;
        }).join(" ") + " " + newClass;
        this._options.variant = variant;
    },
    setSize: function setSize(size) {
        if (typeof size === "undefined") return;
        var oldClass = "custom-button-" + this._options.size;
        var newClass = "custom-button-" + size;
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== oldClass;
        }).join(" ") + " " + newClass;
        this._options.size = size;
    },
    enable: function enable() {
        this._options.disabled = false;
        this._button.disabled = false;
        this._button.className = this._button.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-disabled";
        }).join(" ");
    },
    disable: function disable() {
        this._options.disabled = true;
        this._button.disabled = true;
        var classes = this._button.className.split(" ");
        if (classes.indexOf("custom-button-disabled") === -1) {
            this._button.className += " custom-button-disabled";
        }
    },
    startLoading: function startLoading() {
        this.isLoading = true;
        if (typeof this._options.text !== "undefined") this._originalText = this._options.text;
        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("custom-button-loading") === -1) {
            this._container.className += " custom-button-loading";
        }
        if (this._spinner) {
            this._spinner.style.display = "inline-block";
        }
        if (this._buttonText) {
            this._buttonText.textContent = "Loading...";
        }
        this._button.disabled = true;
    },
    stopLoading: function stopLoading() {
        this.isLoading = false;
        this._container.className = this._container.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-loading";
        }).join(" ");
        if (this._spinner) {
            this._spinner.style.display = "none";
        }
        if (this._buttonText) {
            this._buttonText.textContent = this._originalText;
        }
        this._button.disabled = !!this._options.disabled;
    },
    setTooltip: function setTooltip(tooltip) {
        if (typeof tooltip === "undefined") return;
        this._options.tooltip = tooltip;
        this._button.title = tooltip || "";
    },
    triggerClickEvent: function triggerClickEvent(e) {
        var detail = {
            originalEvent: e,
            button: this
        };
        this._subscribers.forEach(function(cb) {
            cb({
                type: "button:click",
                detail: detail
            });
        });
    },
    triggerEvent: function triggerEvent(eventName, detail) {
        detail = detail || {};
        detail.button = this;
        this._subscribers.forEach(function(cb) {
            cb({
                type: "button:" + eventName,
                detail: detail
            });
        });
    },
    updateState: function updateState() {
        if (this._options.disabled) {
            this.disable();
        } else {
            this.enable();
        }
        if (this._options.loading) {
            this.startLoading();
        }
    },
    destroy: function destroy() {
        this._subscribers = [];
        if (this._boundHandles) {
            try {
                this._button.removeEventListener("click", this._boundHandles.click);
                this._button.removeEventListener("mouseenter", this._boundHandles.mouseenter);
                this._button.removeEventListener("mouseleave", this._boundHandles.mouseleave);
                this._button.removeEventListener("focus", this._boundHandles.focus);
                this._button.removeEventListener("blur", this._boundHandles.blur);
                this._button.removeEventListener("keydown", this._boundHandles.keydown);
            } catch (error) {
                console.error(error);
            }
        }
        this._container.innerHTML = "";
        var containerClasses = this._container.className.split(" ").filter(function(cls) {
            return cls !== "custom-button-container";
        }).join(" ");
        this._container.className = containerClasses;
    }
};

function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
}

function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}

function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
}

function Checkbox(checkbox, options) {
    if (typeof checkbox === "string") {
        var temp = document.getElementById(checkbox);
        if (temp instanceof HTMLInputElement) {
            checkbox = temp;
        }
    }
    if (checkbox instanceof HTMLInputElement === false) {
        throw new Error("Invalid input element");
    }
    this._options = Object.assign({
        id: "checkbox_".concat(Date.now(), "_").concat(Math.random().toString(36).slice(2, 11)),
        checked: false,
        disabled: false,
        indeterminate: false,
        label: "",
        name: "",
        value: "on"
    }, options);
    this._options.disabled = options.disabled || false;
    this._handlers = new Map;
    this._createDOM(checkbox);
    this._setupEventListeners();
    this._updateVisualState();
    this._subscribers = [];
}

Checkbox.prototype = {
    constructor: Checkbox,
    _container: null,
    _input: null,
    _visualCheckbox: null,
    _labelElement: null,
    _createDOM: function _createDOM(checkbox) {
        var parent = checkbox.parentNode;
        var fragment = document.createDocumentFragment();
        this._container = document.createElement("div");
        fragment.appendChild(this._container);
        this._container.classList.add("checkbox-container");
        this._container.setAttribute("role", "checkbox");
        this._container.setAttribute("aria-checked", this._options.checked ? "true" : "false");
        this._container.setAttribute("aria-disabled", this._options.disabled ? "true" : "false");
        this._container.tabIndex = this._options.disabled ? -1 : 0;
        this._input = checkbox;
        var elId = this._input.getAttribute("id");
        if (elId !== null) {
            this._options.id = elId;
        } else if (this._options.id) {
            this._input.setAttribute("id", this._options.id);
        }
        this._input.type = "checkbox";
        if (this._options.name) {
            this._input.name = this._options.name;
        }
        if (this._options.value) {
            this._input.value = this._options.value;
        }
        this._input.checked = !!this._options.checked;
        if (this._options.disabled) {
            this._input.disabled = true;
        }
        if (this._options.indeterminate) {
            this._input.indeterminate = true;
        }
        this._visualCheckbox = document.createElement("span");
        this._visualCheckbox.className = "checkbox-visual";
        this._visualCheckbox.setAttribute("aria-hidden", "true");
        var svgNS = "http://www.w3.org/2000/svg";
        var checkmarkSVG = document.createElementNS(svgNS, "svg");
        checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
        checkmarkSVG.setAttribute("class", "checkbox-checkmark");
        var path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        checkmarkSVG.appendChild(path);
        this._visualCheckbox.appendChild(checkmarkSVG);
        var indeterminateLine = document.createElement("span");
        indeterminateLine.className = "checkbox-indeterminate";
        this._visualCheckbox.appendChild(indeterminateLine);
        if (this._options.label) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label i18n";
            if (this._options.id) this._labelElement.htmlFor = this._options.id;
            this._labelElement.textContent = this._options.label;
            if (this._options.title) {
                this._labelElement.setAttribute("title", this._options.label);
            }
        } else {
            var label = document.querySelector("label[for='" + this._options.id + "']");
            if (label instanceof HTMLLabelElement) {
                this._labelElement = label;
            }
        }
        if (this._options.disabled) {
            this._container.classList.add("checkbox--disabled");
        }
        if (parent) {
            parent.insertBefore(fragment, checkbox);
        }
        this._container.appendChild(this._input);
        this._container.appendChild(this._visualCheckbox);
        if (this._labelElement) {
            this._container.appendChild(this._labelElement);
        }
    },
    _setupEventListeners: function _setupEventListeners() {
        var self = this;
        if (!this._container) return;
        var handleClick = function handleClick(e) {
            e.preventDefault();
            if (!self._options.disabled && self._container) {
                self.toggle();
                self._container.focus();
            }
        };
        var handleKeyDown = function handleKeyDown(e) {
            if (self._options.disabled) return;
            switch (e.key) {
              case " ":
              case "Spacebar":
              case "Enter":
                e.preventDefault();
                self.toggle();
                break;

              case "ArrowRight":
              case "ArrowDown":
                e.preventDefault();
                if (!self._options.checked && !self._options.indeterminate) {
                    self._options.checked ? self.setIndeterminate() : self.check();
                }
                break;

              case "ArrowLeft":
              case "ArrowUp":
                e.preventDefault();
                if (self._options.checked || self._options.indeterminate) {
                    self._options.indeterminate ? self.uncheck() : self.setIndeterminate();
                }
                break;
            }
        };
        var handleFocus = function handleFocus() {
            if (!self._container) return;
            self._container.classList.add("checkbox--focused");
        };
        var handleBlur = function handleBlur() {
            if (!self._container) return;
            self._container.classList.remove("checkbox--focused");
        };
        this._handlers.set("click", handleClick);
        this._handlers.set("keydown", handleKeyDown);
        this._handlers.set("focus", handleFocus);
        this._handlers.set("blur", handleBlur);
        this._container.addEventListener("click", handleClick);
        this._container.addEventListener("keydown", handleKeyDown);
        this._container.addEventListener("focus", handleFocus);
        this._container.addEventListener("blur", handleBlur);
    },
    _updateVisualState: function _updateVisualState() {
        if (!this._container || !this._input) return;
        this._container.setAttribute("aria-checked", this._options.indeterminate ? "mixed" : String(this._options.checked));
        this._container.classList.toggle("checkbox--checked", this._options.checked);
        this._container.classList.toggle("checkbox--indeterminate", this._options.indeterminate);
        this._input.checked = !!this._options.checked;
        this._input.indeterminate = !!this._options.indeterminate;
    },
    toggle: function toggle() {
        if (this._options.disabled) return !!this._options.checked;
        if (this._options.indeterminate) {
            this._options.indeterminate = false;
            this._options.checked = true;
        } else {
            this._options.checked = !this._options.checked;
        }
        this._updateVisualState();
        this._triggerChange();
        return this._options.checked;
    },
    check: function check(bSilent) {
        if (this._options.disabled || this._options.checked && !this._options.indeterminate) return;
        this._options.checked = true;
        this._options.indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },
    uncheck: function uncheck(bSilent) {
        if (this._options.disabled || !this._options.checked && !this._options.indeterminate) return;
        this._options.checked = false;
        this._options.indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },
    setIndeterminate: function setIndeterminate() {
        if (this._options.disabled || this._options.indeterminate) return;
        this._options.indeterminate = true;
        this._updateVisualState();
        this._triggerChange();
    },
    enable: function enable() {
        if (!this._options.disabled || !this._container || !this._input) return;
        this._options.disabled = false;
        this._input.disabled = false;
        this._container.setAttribute("aria-disabled", "false");
        this._container.tabIndex = 0;
        this._container.classList.remove("checkbox--disabled");
    },
    disable: function disable() {
        if (this._options.disabled || !this._container || !this._input) return;
        this._options.disabled = true;
        this._input.disabled = true;
        this._container.setAttribute("aria-disabled", "true");
        this._container.tabIndex = -1;
        this._container.classList.add("checkbox--disabled");
    },
    setLabel: function setLabel(label) {
        this._options.label = label;
        if (this._labelElement) {
            this._labelElement.textContent = label;
        } else if (label && this._container) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label";
            if (this._options.id) this._labelElement.htmlFor = this._options.id;
            this._labelElement.textContent = label;
            this._container.appendChild(this._labelElement);
        }
        if (this._options.title && this._labelElement) {
            this._labelElement.setAttribute("title", label);
        }
    },
    getState: function getState() {
        if (this._input) {
            return {
                checked: this._input.checked,
                disabled: this._input.disabled,
                value: this._input.value
            };
        }
        return {
            checked: false,
            disabled: false,
            value: ""
        };
    },
    subscribe: function subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe: function unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    },
    _triggerChange: function _triggerChange(e) {
        var detail = this.getState();
        var objEvent = {
            type: "checkbox:change",
            detail: detail
        };
        if (e) {
            objEvent.originalEvent = e;
        }
        this._subscribers.forEach(function(cb) {
            cb(objEvent);
        });
    },
    destroy: function destroy() {
        this._subscribers = [];
        this._handlers.forEach((handler, event) => {
            this._container && this._container.removeEventListener(event, handler);
        });
        this._handlers.clear();
        if (this._container && this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
        }
        this._container = null;
        this._input = null;
        this._visualCheckbox = null;
        this._labelElement = null;
    }
};

var _SelectBox_brand = new WeakSet;

class SelectBox {
    constructor(_selectbox, _options) {
        _classPrivateMethodInitSpec(this, _SelectBox_brand);
        if (typeof _selectbox === "string") {
            var temp = document.getElementById(_selectbox);
            if (temp instanceof HTMLSelectElement) {
                _selectbox = temp;
            } else if (temp instanceof HTMLElement) {
                this._container = temp;
            } else {
                throw new Error("Invalid selectbox");
            }
        } else if (_selectbox instanceof HTMLElement) {
            this._container = _selectbox;
        }
        if (_selectbox instanceof HTMLSelectElement) {
            this._selectbox = _selectbox;
            this._container = document.createElement("div");
        } else if (this._container instanceof HTMLElement === false) {
            throw new Error("Invalid container");
        }
        this._options = Object.assign(_options, {
            placeholder: _options.placeholder || "Select...",
            searchable: _options.searchable || false,
            multiple: _options.multiple || false,
            description: _options.description || ""
        });
        this._selectedValues = new Set;
        this.isOpen = false;
        this._items = [];
        this._customItems = [];
        this._subscribers = [];
        this._boundHandles = {
            toggle: e => {
                _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, e);
            },
            search: e => {
                _assertClassBrand(_SelectBox_brand, this, _handleSearch).call(this, e);
            },
            close: e => {
                if (e.target instanceof HTMLElement && !this._container.contains(e.target) && !e.target.classList.contains("selectbox-option")) {
                    _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                }
            },
            keydown: e => {
                _assertClassBrand(_SelectBox_brand, this, _handleKeydown).call(this, e);
            },
            dropdownClick: e => {
                _assertClassBrand(_SelectBox_brand, this, _handleDropdownClick).call(this, e);
            }
        };
        this._optionsContainer = null;
        this.searchInput = null;
        this._select = document.createElement("div");
        this._header = document.createElement("div");
        this._selectedText = document.createElement("span");
        this._arrow = document.createElement("span");
        this._dropdown = document.createElement("div");
        _assertClassBrand(_SelectBox_brand, this, _createDOM).call(this);
        _assertClassBrand(_SelectBox_brand, this, _bindEvents).call(this);
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
        _instances._.add(this);
    }
    openDropdown() {
        if (!this.isOpen) {
            document.addEventListener("click", this._boundHandles.close);
        }
        this.isOpen = true;
        this._dropdown.style.display = "block";
        this._arrow.className += " selectbox-arrow-open";
        this._header.className += " selectbox-header-open";
        if (this.searchInput) {
            setTimeout(function(self) {
                return function() {
                    if (self.searchInput) {
                        self.searchInput.focus();
                    }
                };
            }(this), 100);
        }
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
    }
    subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);
        return {
            unsubscribe() {
                self._subscribers = self._subscribers.filter(function(cb) {
                    return cb !== callback;
                });
            }
        };
    }
    addItem(value, text, selected) {
        selected = selected || false;
        var bHasItem = this._items.some(item => item && item.value === value);
        if (bHasItem) {
            var item = this._items.find(item => item && item.value === value);
            if (item) item.selected = selected;
        } else {
            this._items.push({
                value: value,
                text: text,
                selected: selected
            });
        }
        if (selected) {
            if (this._options.multiple) {
                this._selectedValues.add(value);
            } else {
                this._selectedValues.clear();
                this._selectedValues.add(value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    }
    addItems(values, selectedValue) {
        var self = this;
        values.forEach(function(pair, index) {
            var bHasItem = self._items.some(item => item && item.value === pair[0]);
            if (bHasItem) return;
            var isSelected = selectedValue ? pair[0] === selectedValue : index === 0;
            if (isSelected) {
                if (self._options.multiple) {
                    self._selectedValues.add(pair[0]);
                } else {
                    self._selectedValues.clear();
                    self._selectedValues.add(pair[0]);
                }
            }
            self._items.push({
                value: pair[0],
                text: pair[1],
                selected: isSelected
            });
        }, this);
        if (this.isOpen) {
            _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    }
    addCustomItem(value, text) {
        this._customItems.push({
            value: value,
            text: text,
            selected: false
        });
    }
    addSeparator() {
        this._items.push(null);
    }
    removeItem(value) {
        this._items = this._items.filter(function(item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._customItems = this._customItems.filter(function(item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._selectedValues.delete(value);
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    }
    getSelectedValue() {
        if (this._options.multiple) {
            console.error("Method getSelectedValue is only available for single-select boxes.");
            return null;
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    getSelectedValues() {
        if (this._options.multiple) {
            return Array.from(this._selectedValues);
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    selectItems(values, bSilent) {
        var self = this;
        if (!this._options.multiple && Array.isArray(values)) {
            console.error("Method selectItem is only available for multi-select boxes.");
            return;
        }
        var value = "";
        if (this._options.multiple) {
            var checkMultiOption = function checkMultiOption(value) {
                if (self._optionsContainer) {
                    var option = self._optionsContainer.querySelector('[data-value="' + value + '"]');
                    if (option) {
                        var checkbox = option.querySelector('input[type="checkbox"]');
                        if (checkbox && checkbox instanceof HTMLInputElement) {
                            checkbox.checked = true;
                        }
                        option.classList.add("selectbox-option-selected");
                        option.classList.add("checkbox--checked");
                    }
                }
            };
            if (Array.isArray(values)) {
                for (var i = 0; i < values.length; i++) {
                    value = values[i];
                    if (!this._selectedValues.has(value)) {
                        this._selectedValues.add(value);
                        checkMultiOption(value);
                    }
                }
            } else {
                value = values;
                if (!this._selectedValues.has(value)) {
                    this._selectedValues.add(value);
                    checkMultiOption(value);
                }
            }
        } else if (!Array.isArray(values)) {
            value = values;
            this._selectedValues.clear();
            this._selectedValues.add(value);
            if (this._optionsContainer) {
                var selectedOptions = this._optionsContainer.querySelectorAll('.selectbox-option-selected[data-value="' + value + '"]');
                selectedOptions.forEach(function(option) {
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                });
                var option = this._optionsContainer.querySelector('[data-value="' + value + '"]');
                if (option) {
                    option.classList.add("selectbox-option-selected");
                    option.classList.add("checkbox--checked");
                }
            }
            _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        if (bSilent) {
            return;
        }
        _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, true);
    }
    unselectItems(values, bSilent) {
        var self = this;
        if (!this._options.multiple) {
            console.error("Method unselectItem is only available for multi-select boxes.");
            return;
        }
        var value = "";
        var uncheckMultiOption = function uncheckMultiOption(value) {
            if (self._optionsContainer) {
                var option = self._optionsContainer.querySelector('[data-value="' + value + '"]');
                if (option) {
                    var checkbox = option.querySelector('input[type="checkbox"]');
                    if (checkbox && checkbox instanceof HTMLInputElement) {
                        checkbox.checked = false;
                    }
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                }
            }
        };
        if (Array.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                value = values[i];
                if (this._selectedValues.has(value)) {
                    this._selectedValues.delete(value);
                    uncheckMultiOption(value);
                }
            }
        } else {
            value = values;
            if (this._selectedValues.has(value)) {
                this._selectedValues.delete(value);
                uncheckMultiOption(value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        if (bSilent) {
            return;
        }
        _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, true);
    }
    disable() {
        this._select.classList.add("selectbox-disabled");
    }
    enable() {
        this._select.classList.remove("selectbox-disabled");
    }
    clear(bSelectFirst) {
        bSelectFirst = bSelectFirst || false;
        this._selectedValues.clear();
        if (bSelectFirst && this._items.length > 0) {
            var firstItem = this._items[0];
            if (firstItem) {
                this._selectedValues.add(firstItem.value);
            }
        }
        _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
        _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this);
    }
    destroy() {
        this._subscribers = [];
        _instances._.delete(this);
        try {
            if (this._header && this._boundHandles) {
                this._header.removeEventListener("click", this._boundHandles.toggle);
            }
            if (this.searchInput && this._boundHandles) {
                this.searchInput.removeEventListener("input", this._boundHandles.search);
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener("click", this._boundHandles.dropdownClick);
            }
            if (document && this._boundHandles) {
                document.removeEventListener("click", this._boundHandles.close);
            }
            if (this._header && this._boundHandles) {
                this._header.removeEventListener("keydown", this._boundHandles.keydown);
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener("keydown", this._boundHandles.keydown);
            }
        } catch (error) {
            console.error(error);
        }
        this._container.innerHTML = "";
        var containerClasses = this._container.className.split(" ");
        var newClasses = [];
        for (var i = 0; i < containerClasses.length; i++) {
            if (containerClasses[i] !== "selectbox-container") {
                newClasses.push(containerClasses[i]);
            }
        }
        this._container.className = newClasses.join(" ");
    }
}

function _createDOM() {
    this._container.innerHTML = "";
    this._container.className += " selectbox-container";
    var fragment = document.createDocumentFragment();
    this._select.className += " selectbox";
    if (this._options.multiple) {
        this._select.className += " selectbox-multiple";
    }
    fragment.appendChild(this._select);
    this._header.className += " selectbox-header";
    this._select.appendChild(this._header);
    this._header.setAttribute("tabindex", "0");
    this._selectedText.className += " selectbox-selected-text";
    this._selectedText.textContent = this._options.placeholder;
    this._header.appendChild(this._selectedText);
    this._arrow.className += " selectbox-arrow";
    this._arrow.innerHTML = "<b></b>";
    this._header.appendChild(this._arrow);
    this._dropdown.className += " selectbox-dropdown";
    this._select.appendChild(this._dropdown);
    if (this._options.description) {
        var description = document.createElement("div");
        description.className += " i18n selectbox-description";
        description.textContent = this._options.description;
        this._dropdown.appendChild(description);
    }
    if (this._options.searchable) {
        var search = document.createElement("div");
        search.className += " selectbox-search";
        this._dropdown.appendChild(search);
        this.searchInput = document.createElement("input");
        this.searchInput.className += " selectbox-search-input";
        this.searchInput.type = "text";
        this.searchInput.placeholder = "Search...";
        search.appendChild(this.searchInput);
    }
    this._optionsContainer = document.createElement("div");
    this._optionsContainer.className += " selectbox-options";
    this._dropdown.appendChild(this._optionsContainer);
    this._container.appendChild(fragment);
    if (this._selectbox) {
        var parent = this._selectbox.parentNode;
        if (parent) {
            parent.insertBefore(this._container, this._selectbox);
            var options = _assertClassBrand(_SelectBox_brand, this, _extractOptions).call(this, this._selectbox);
            this.addItems(options.values, options.selectedValue);
            this._selectbox.remove();
        }
    }
}

function _bindEvents() {
    this._header.addEventListener("click", this._boundHandles.toggle);
    if (this.searchInput) {
        this.searchInput.addEventListener("input", this._boundHandles.search);
    }
    this._dropdown.addEventListener("click", this._boundHandles.dropdownClick);
    this._dropdown.addEventListener("wheel", function(e) {
        e.stopPropagation();
    });
    this._header.addEventListener("keydown", this._boundHandles.keydown);
    this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
}

function _toggle(e) {
    e && e.stopPropagation();
    this.isOpen ? _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this) : this.openDropdown();
    if (e && e.type === "click") {
        for (var selBox of _instances._) {
            if (selBox.isOpen && selBox !== this) {
                _assertClassBrand(_SelectBox_brand, selBox, _closeDropdown).call(selBox);
            }
        }
    }
}

function _closeDropdown() {
    if (this.isOpen && document && this._boundHandles) {
        document.removeEventListener("click", this._boundHandles.close);
    }
    this.isOpen = false;
    this._dropdown.style.display = "none";
    var arrowClasses = this._arrow.className.split(" ");
    var newArrowClasses = [];
    for (var i = 0; i < arrowClasses.length; i++) {
        if (arrowClasses[i] !== "selectbox-arrow-open") {
            newArrowClasses.push(arrowClasses[i]);
        }
    }
    this._arrow.className = newArrowClasses.join(" ");
    var headerClasses = this._header.className.split(" ");
    var newHeaderClasses = [];
    for (var i = 0; i < headerClasses.length; i++) {
        if (headerClasses[i] !== "selectbox-header-open") {
            newHeaderClasses.push(headerClasses[i]);
        }
    }
    this._header.className = newHeaderClasses.join(" ");
    if (this.searchInput) {
        this.searchInput.value = "";
    }
}

function _handleSearch(e) {
    var target = e.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }
    var searchTerm = target.value.toLowerCase();
    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, searchTerm);
}

function _selectNextPrevItem(direction) {
    var searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : "";
    var newItem;
    var items = this._items.filter(function(item) {
        return item !== null;
    });
    if (searchTerm) {
        items = items.filter(function(item) {
            return item.text.toLowerCase().indexOf(searchTerm) !== -1;
        });
    }
    if (items.length === 0) {
        return;
    }
    if (direction === "up") {
        if (this._selectedValues.size === 0 && items.length > 0) {
            newItem = items[items.length - 1];
            this._selectedValues.add(newItem.value);
        } else {
            var selectedArray = Array.from(this._selectedValues);
            var currentIndex = -1;
            for (var i = 0; i < items.length; i++) {
                if (items[i].value === selectedArray[0]) {
                    currentIndex = i;
                    break;
                }
            }
            var prevIndex = (currentIndex - 1 + items.length) % items.length;
            this._selectedValues.clear();
            newItem = items[prevIndex];
            this._selectedValues.add(newItem.value);
        }
    } else {
        if (this._selectedValues.size === 0 && items.length > 0) {
            newItem = items[0];
            this._selectedValues.add(newItem.value);
        } else {
            var selectedArray = Array.from(this._selectedValues);
            var currentIndex = -1;
            for (var i = 0; i < items.length; i++) {
                if (items[i].value === selectedArray[0]) {
                    currentIndex = i;
                    break;
                }
            }
            var nextIndex = (currentIndex + 1) % items.length;
            if (nextIndex === items.length) {
                nextIndex = 0;
            }
            this._selectedValues.clear();
            newItem = items[nextIndex];
            this._selectedValues.add(newItem.value);
        }
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    _assertClassBrand(_SelectBox_brand, this, _renderOptions).call(this, searchTerm, true);
    _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, newItem.value, true);
}

function _handleKeydown(e) {
    var key = e.key || e.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        e.preventDefault();
        _assertClassBrand(_SelectBox_brand, this, _toggle).call(this, e);
        break;

      case "Escape":
      case 27:
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        break;

      case "ArrowDown":
      case 40:
        e.preventDefault();
        _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "down");
        break;

      case "ArrowUp":
      case 38:
        e.preventDefault();
        _assertClassBrand(_SelectBox_brand, this, _selectNextPrevItem).call(this, "up");
        break;

      case "Tab":
      case 9:
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
        break;
    }
}

function _renderOptions(searchTerm, scrollIntoView) {
    searchTerm = searchTerm || "";
    if (!this._optionsContainer) return;
    this._optionsContainer.innerHTML = "";
    var selectedOption = null;
    var filteredItems = this._items;
    if (searchTerm) {
        filteredItems = filteredItems.filter(function(item) {
            return item !== null && item.text.toLowerCase().indexOf(searchTerm) !== -1;
        });
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < filteredItems.length; i++) {
        var item = filteredItems[i];
        if (!item) {
            var hr = document.createElement("hr");
            hr.className += " selectbox-option-divider";
            fragment.appendChild(hr);
            continue;
        }
        var option = document.createElement("div");
        option.className += " selectbox-option";
        if (this._selectedValues.has(item.value)) {
            option.className += " selectbox-option-selected checkbox--checked";
            selectedOption = option;
        }
        option.setAttribute("data-value", item.value);
        var label = document.createElement("label");
        label.className += " selectbox-option-text";
        label.textContent = item.text;
        if (this._options.multiple) {
            option.className += " selectbox-option-checkbox";
            var input = document.createElement("input");
            input.type = "checkbox";
            input.id = "checkbox-" + item.value;
            input.className += " selectbox-checkbox";
            input.checked = this._selectedValues.has(item.value);
            option.appendChild(input);
            var visualCheckbox = document.createElement("span");
            visualCheckbox.className = "checkbox-visual";
            visualCheckbox.setAttribute("aria-hidden", "true");
            var svgNS = "http://www.w3.org/2000/svg";
            var checkmarkSVG = document.createElementNS(svgNS, "svg");
            checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
            checkmarkSVG.setAttribute("class", "checkbox-checkmark");
            var path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-width", "2");
            checkmarkSVG.appendChild(path);
            visualCheckbox.appendChild(checkmarkSVG);
            option.appendChild(visualCheckbox);
        }
        option.appendChild(label);
        fragment.appendChild(option);
    }
    if (this._customItems.length) {
        var _hr = document.createElement("hr");
        _hr.className += " selectbox-option-divider";
        fragment.appendChild(_hr);
    }
    for (var i = 0; i < this._customItems.length; i++) {
        var _item = this._customItems[i];
        var _option = document.createElement("label");
        _option.className += " selectbox-custom-option";
        _option.setAttribute("data-value", _item.value);
        _option.setAttribute("for", _item.value);
        var span = document.createElement("span");
        span.className += " selectbox-option-text";
        span.textContent = _item.text;
        _option.appendChild(span);
        fragment.appendChild(_option);
    }
    this._optionsContainer.appendChild(fragment);
    if (scrollIntoView && this.isOpen && this._optionsContainer && selectedOption) {
        try {
            if (selectedOption.scrollIntoView) {
                selectedOption.scrollIntoView({
                    block: "nearest"
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

function _handleDropdownClick(e) {
    var target = e.target || e.srcElement;
    var option = null;
    if (target && target instanceof HTMLElement) {
        var temp = null;
        var classList = target.className.split(" ");
        var hasOptionClass = false;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i] === "selectbox-option") {
                hasOptionClass = true;
                break;
            } else if (classList[i] === "selectbox-custom-option") {
                var val = target.getAttribute("data-value");
                if (val) {
                    e.stopPropagation();
                    _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, val);
                    _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                    return;
                }
                break;
            }
        }
        if (hasOptionClass) {
            temp = target;
        } else if (target.parentNode && target.parentNode instanceof HTMLElement) {
            var parentClassList = target.parentNode.className.split(" ");
            var parentHasOptionClass = false;
            for (var i = 0; i < parentClassList.length; i++) {
                if (parentClassList[i] === "selectbox-option") {
                    parentHasOptionClass = true;
                    break;
                } else if (parentClassList[i] === "selectbox-custom-option") {
                    var _val = target.parentNode.getAttribute("data-value");
                    if (_val) {
                        e.stopPropagation();
                        _assertClassBrand(_SelectBox_brand, this, _triggerCustomChange).call(this, _val);
                        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
                        return;
                    }
                    break;
                }
            }
            if (parentHasOptionClass) {
                temp = target.parentNode;
            }
        }
        if (temp instanceof HTMLDivElement) {
            option = temp;
        } else {
            return;
        }
    } else {
        return;
    }
    var value = option.getAttribute("data-value");
    if (value === null) return;
    var enabled = true;
    if (this._options.multiple) {
        if (this._selectedValues.has(value)) {
            this.unselectItems(value, true);
            enabled = false;
        } else {
            this.selectItems(value, true);
        }
    } else {
        this.selectItems(value, true);
        _assertClassBrand(_SelectBox_brand, this, _closeDropdown).call(this);
    }
    _assertClassBrand(_SelectBox_brand, this, _updateSelectedText).call(this);
    _assertClassBrand(_SelectBox_brand, this, _triggerChange).call(this, value, enabled);
}

function _updateSelectedText() {
    if (this._selectedValues.size === 0) {
        this._selectedText.textContent = this._options.placeholder;
        return;
    }
    if (this._options.multiple) {
        var selectedItems = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this._selectedValues.has(item.value)) {
                selectedItems.push(item);
            }
        }
        if (selectedItems.length === 0) {
            this._selectedText.textContent = this._options.placeholder;
        } else if (selectedItems.length === 1) {
            this._selectedText.textContent = selectedItems[0].text;
        } else {
            this._selectedText.textContent = selectedItems.length + " items selected";
        }
    } else {
        var selectedItem = null;
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this._selectedValues.has(item.value)) {
                selectedItem = item;
                break;
            }
        }
        this._selectedText.textContent = selectedItem ? selectedItem.text : this._options.placeholder;
    }
}

function _triggerChange(currentValue, enabled) {
    var values = Array.from(this._selectedValues);
    var items = [];
    for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item && this._selectedValues.has(item.value)) {
            items.push(item);
        }
    }
    var detail = {
        values: values,
        items: items,
        current: currentValue,
        enabled: enabled
    };
    this._subscribers.forEach(function(cb) {
        cb({
            type: "selectbox:change",
            detail: detail
        });
    });
}

function _triggerCustomChange(currentValue) {
    var detail = {
        values: [],
        current: currentValue,
        enabled: false
    };
    this._subscribers.forEach(function(cb) {
        cb({
            type: "selectbox:custom",
            detail: detail
        });
    });
}

function _extractOptions(selectbox) {
    var options = Array.from(selectbox.options).map(option => [ option.value, option.text ]);
    var result = {
        values: options
    };
    var selectedValue = selectbox.value;
    if (selectedValue) result.selectedValue = selectedValue;
    return result;
}

var _instances = {
    _: new Set
};

({
    _: document.getElementById("loader")
});

var LOCATOR_VALUES = [ [ "appendix", "Appendix" ], [ "article", "Article" ], [ "book", "Book" ], [ "chapter", "Chapter" ], [ "column", "Column" ], [ "figure", "Figure" ], [ "folio", "Folio" ], [ "issue", "Issue" ], [ "line", "Line" ], [ "note", "Note" ], [ "opus", "Opus" ], [ "page", "Page" ], [ "paragraph", "Paragraph" ], [ "part", "Part" ], [ "rule", "Rule" ], [ "section", "Section" ], [ "sub-verbo", "Sub verbo" ], [ "table", "Table" ], [ "title", "Title" ], [ "verses", "Verses" ], [ "volume", "Volume" ] ];

var Theme = {
    addStylesForComponents: function addStylesForComponents(theme) {
        var styles = "";
        if (theme["background-toolbar"]) {
            styles += ".loader-body,\n" + ".loader-bg { background-color: " + theme["background-toolbar"] + "; }\n";
            styles += ".loader-body {     box-shadow: 0 0 99px 99px " + theme["background-toolbar"] + "; }\n";
        }
        if (theme["background-loader"]) {
            styles += ".loader-image { color: " + theme["background-loader"] + "; }\n";
        }
        if (theme["background-normal"]) {
            styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".input-field-element,\n" + ".selectbox-search-input,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".radio-visual, \n" + ".checkbox-visual, \n" + ".message { background-color: " + theme["background-normal"] + "; }\n";
        }
        if (theme["text-inverse"]) {
            styles += ".custom-button-primary { color: " + theme["text-inverse"] + "; }\n";
        }
        if (theme["border-regular-control"]) {
            styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".input-field-element,\n" + ".checkbox-visual,\n" + ".radio-visual,\n" + ".selectbox-header,\n" + ".selectbox-dropdown,\n" + ".selectbox-search-input:focus,\n" + ".message { border-color: " + theme["border-regular-control"] + "; }\n";
            styles += ".selectbox-search,\n" + ".selectbox-option-divider { border-color: " + theme["border-regular-control"] + " !important; }\n";
        }
        if (theme["border-error"]) {
            styles += ".input-field-invalid .input-field-element { border-color: " + theme["border-error"] + "; }\n";
        }
        if (theme["border-control-focus"]) {
            styles += ".custom-button-icon-only:focus:not(:active):not(:hover),\n" + ".custom-button-secondary-icon:focus:not(:active):not(:hover),\n" + ".custom-button-secondary:focus:not(:active):not(:hover),\n" + ".input-field-element:focus,\n" + ".input-field-focused .input-field-element,\n" + ".selectbox-header:active,\n" + ".selectbox-header:focus,\n" + ".selectbox-header-open { border-color: " + theme["border-control-focus"] + "; }\n";
        }
        if (theme["highlight-button-hover"]) {
            styles += ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" + ".custom-button-secondary:hover:not(.custom-button-disabled),\n" + ".selectbox-custom-option:hover,\n" + ".selectbox-option:hover { background-color: " + theme["highlight-button-hover"] + "; }\n";
        }
        if (theme["highlight-button-pressed"]) {
            styles += ".custom-button-icon-only:active:not(.custom-button-disabled),\n" + ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" + ".custom-button-secondary:active:not(.custom-button-disabled),\n" + ".selectbox-option-selected:hover,\n" + ".selectbox-option-selected { background-color: " + theme["highlight-button-pressed"] + "; }\n";
            styles += ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " + theme["highlight-button-pressed"] + "; }\n";
        }
        if (theme["highlight-primary-dialog-button-hover"]) {
            styles += ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " + theme["highlight-primary-dialog-button-hover"] + "; border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
        }
        if (theme["background-primary-dialog-button"]) {
            styles += ".checkbox-indeterminate,\n" + ".custom-button-primary { background-color: " + theme["background-primary-dialog-button"] + "; border-color: " + theme["background-primary-dialog-button"] + "; }\n";
        }
        if (theme["background-toolbar-additional"]) {
            styles += ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled { background-color: " + theme["background-toolbar-additional"] + "; border-color: " + theme["background-toolbar-additional"] + "; }\n";
        }
        if (theme["text-normal"]) {
            styles += ".custom-button-secondary-icon,\n" + ".custom-button-secondary,\n" + ".custom-button-secondary-icon,\n" + ".custom-button-icon-only,\n" + ".selectbox-search-input,\n" + ".loader-image,\n" + ".input-field-element { color: " + theme["text-normal"] + "; }\n";
            styles += ".input-field-search-icon svg { fill: " + theme["text-normal"] + "; }\n";
            styles += ".selectbox-arrow b { border-color: " + theme["text-normal"] + "; }\n";
        }
        if (theme["text-secondary"]) {
            styles += ".message-close:hover,\n" + ".input-field-clear:hover { color: " + theme["text-secondary"] + "; }\n";
        }
        if (theme["text-tertiary"]) {
            styles += ".input-field-clear,\n" + ".message-container:hover .message-close,\n" + ".custom-button-secondary-icon:disabled,\n" + ".custom-button-secondary-icon.custom-button-disabled,\n" + ".custom-button-secondary:disabled,\n" + ".custom-button-secondary.custom-button-disabled,\n" + ".input-field-element::placeholder,\n" + ".selectbox-search-input::placeholder { color: " + theme["text-tertiary"] + "; }\n";
        }
        var fontSize = "11px";
        if ([ "theme-white", "theme-night" ].indexOf(theme.name) !== -1 || [ "theme-white", "theme-night" ].indexOf(theme.Name) !== -1) {
            fontSize = "12px";
            styles += ".message,\n" + ".custom-button,\n" + ".selectbox-header,\n" + ".input-field-element { border-radius: 4px; }\n";
            styles += ".radio--checked .radio-visual { border-width: 4px; }\n";
            styles += ".checkbox-checkmark { color: " + theme["text-inverse"] + "; }\n";
            styles += ".checkbox--checked .checkbox-visual { background-color: " + theme["background-primary-dialog-button"] + "; }\n";
            styles += ".radio--checked .radio-visual,\n" + ".checkbox--checked .checkbox-visual { border-color: " + theme["background-primary-dialog-button"] + "; }\n";
            styles += ".radio-button-container:hover:not(.radio--checked) .radio-visual,\n" + ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { background-color: " + theme["highlight-button-hover"] + "; }\n";
            styles += ".checkbox--checked:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + theme["highlight-primary-dialog-button-hover"] + "; background-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
            styles += ".radio--checked:hover:not(.radio--disabled) .radio-visual { border-color: " + theme["highlight-primary-dialog-button-hover"] + "; }\n";
            styles += "body { font-size: 12px; }\n";
        } else {
            styles += ".checkbox-checkmark { color: " + theme["text-normal"] + "; }\n";
            styles += ".radio--checked .radio-visual { background-color: " + theme["text-normal"] + ";\n box-shadow: 0 0 0 2px" + theme["background-normal"] + " inset; }\n";
            styles += ".radio-button-container:hover .radio-visual,\n" + ".checkbox-container:hover:not(.checkbox--disabled) .checkbox-visual { border-color: " + theme["border-control-focus"] + "; }\n";
        }
        styles += "body, input, textarea, select, button { font-size: " + fontSize + "; }\n";
        var styleTheme = document.getElementById("componentsStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "componentsStyles";
            styleTheme.innerHTML = styles;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
            return styles;
        }
        styleTheme.innerHTML = styles;
        return styles;
    },
    fixThemeForIE: function fixThemeForIE(theme) {
        if (!theme["background-toolbar"]) {
            theme["background-toolbar"] = "#f7f7f7";
        }
        if (!theme["text-normal"]) {
            theme["text-normal"] = "rgb(51, 51, 51)";
        }
        if (!theme["text-secondary"]) {
            theme["text-secondary"] = "#848484";
        }
        if (!theme["highlight-button-hover"]) {
            theme["highlight-button-hover"] = "#e0e0e0";
        }
        if (!theme["background-normal"]) {
            theme["background-normal"] = "white";
        }
        if (!theme["background-loader"]) {
            theme["background-loader"] = "rgba(24, 24, 24, 0.9)";
        }
        if (!theme["highlight-button-pressed"]) {
            theme["highlight-button-pressed"] = "#cbcbcb";
        }
        if (!theme["text-inverse"]) {
            theme["text-inverse"] = "white";
        }
        if (!theme["border-regular-control"]) {
            theme["border-regular-control"] = "#c0c0c0";
        }
        if (!theme["border-error"]) {
            theme["border-error"] = "#f62211";
        }
        if (!theme["border-control-focus"]) {
            theme["border-control-focus"] = "#848484";
        }
        if (!theme["highlight-primary-dialog-button-hover"]) {
            theme["highlight-primary-dialog-button-hover"] = "#1c1c1c";
        }
        if (!theme["background-primary-dialog-button"]) {
            theme["background-primary-dialog-button"] = "#444444";
        }
        if (!theme["background-toolbar-additional"]) {
            theme["background-toolbar-additional"] = "#efefef";
        }
        if (!theme["text-tertiary"]) {
            theme["text-tertiary"] = "#bdbdbd";
        }
        return theme;
    }
};

(function() {
    class EditWindow {
        constructor() {
            var container = document.querySelector(".container");
            if (container instanceof HTMLElement === false) {
                throw new Error("container is not initialized");
            }
            this._container = container;
            this._field = null;
            this.citationObject = null;
            this.forms = [];
        }
        createForm(citationItem) {
            var form = document.createElement("form");
            form.classList.add("form");
            this._container.appendChild(form);
            var title = document.createElement("div");
            title.classList.add("title");
            title.textContent = citationItem.itemData.title;
            form.appendChild(title);
            var params = document.createDocumentFragment();
            var prefixSuffixContainer = document.createElement("div");
            var prefix = document.createElement("input");
            var suffix = document.createElement("input");
            var locatorContainer = document.createElement("div");
            var locatorSelect = document.createElement("div");
            var locator = document.createElement("input");
            var omitAuthorContainer = document.createElement("div");
            var omitAuthor = document.createElement("input");
            params.appendChild(locatorContainer);
            locatorContainer.appendChild(locatorSelect);
            locatorContainer.appendChild(locator);
            var locatorPlaceholder = "";
            params.appendChild(prefixSuffixContainer);
            prefixSuffixContainer.appendChild(prefix);
            prefixSuffixContainer.appendChild(suffix);
            params.appendChild(omitAuthorContainer);
            omitAuthorContainer.appendChild(omitAuthor);
            var prefixInput = new InputField(prefix, {
                type: "text",
                placeholder: "Prefix",
                value: citationItem.prefix
            });
            var suffixInput = new InputField(suffix, {
                type: "text",
                placeholder: "Suffix",
                value: citationItem.suffix
            });
            var locatorSelectbox = new SelectBox(locatorSelect, {
                placeholder: "Locator"
            });
            var locatorLabel = citationItem.label || "page";
            LOCATOR_VALUES.forEach(function(info) {
                var selected = info[0] === locatorLabel;
                locatorSelectbox.addItem(info[0], info[1], selected);
                if (selected) {
                    locatorPlaceholder = info[1];
                }
            });
            var locatorInput = new InputField(locator, {
                type: "text",
                placeholder: locatorPlaceholder,
                value: citationItem.locator
            });
            var omitAuthorInput = new Checkbox(omitAuthor, {
                label: "Omit author",
                checked: !!citationItem["suppress-author"]
            });
            locatorSelectbox.subscribe(function(event) {
                if (event.type !== "selectbox:change" || !event.detail.items) {
                    return;
                }
                var eventItem = event.detail.items[0];
                locatorInput.setPlaceholder(eventItem.text);
            });
            this.forms.push({
                omitAuthorInput: omitAuthorInput,
                prefixInput: prefixInput,
                suffixInput: suffixInput,
                locatorInput: locatorInput,
                locatorSelectbox: locatorSelectbox
            });
            form.appendChild(params);
        }
        onThemeChanged(theme) {
            window.Asc.plugin.onThemeChangedBase(theme);
            Theme.fixThemeForIE(theme);
            Theme.addStylesForComponents(theme);
        }
        onAttachedContent(field) {
            this._field = field;
            var citationStartIndex = field.Value.indexOf("{");
            var citationEndIndex = field.Value.lastIndexOf("}");
            if (citationStartIndex === -1) {
                return;
            }
            var citationString = field.Value.slice(citationStartIndex, citationEndIndex + 1);
            this.citationObject = JSON.parse(citationString);
            if (!this.citationObject) {
                return;
            }
            this.citationObject.citationItems.forEach(item => {
                this.createForm(item);
            });
            window.Asc.plugin.sendToPlugin("onUpdateHeight", document.body.scrollHeight);
        }
        onClickSave() {
            var bHasChanges = false;
            for (var i = 0; i < this.forms.length; i++) {
                var _this$citationObject;
                var form = this.forms[i];
                var citationItem = (_this$citationObject = this.citationObject) === null || _this$citationObject === void 0 ? void 0 : _this$citationObject.citationItems[i];
                if (!citationItem) {
                    continue;
                }
                var prefix = form.prefixInput.getValue();
                var suffix = form.suffixInput.getValue();
                var label = form.locatorSelectbox.getSelectedValue();
                var locator = form.locatorInput.getValue();
                var omitAuthor = form.omitAuthorInput.getState().checked;
                if ((citationItem.prefix || prefix) && citationItem.prefix !== prefix) {
                    citationItem.prefix = prefix;
                    bHasChanges = true;
                }
                if ((citationItem.suffix || suffix) && citationItem.suffix !== suffix) {
                    citationItem.suffix = suffix;
                    bHasChanges = true;
                }
                if ((citationItem.label || label) && citationItem.label !== label) {
                    if (label) {
                        citationItem.label = label;
                        bHasChanges = true;
                    }
                }
                if ((citationItem.locator || locator) && citationItem.locator !== locator) {
                    citationItem.locator = locator;
                    bHasChanges = true;
                }
                if (!!citationItem["suppress-author"] !== omitAuthor) {
                    citationItem["suppress-author"] = omitAuthor;
                    bHasChanges = true;
                }
            }
            return bHasChanges;
        }
    }
    var editWindow = new EditWindow;
    window.Asc.plugin.init = function() {
        window.Asc.plugin.sendToPlugin("onWindowReady", {});
    };
    window.Asc.plugin.onThemeChanged = editWindow.onThemeChanged.bind(editWindow);
    window.Asc.plugin.attachEvent("onThemeChanged", editWindow.onThemeChanged.bind(editWindow));
    window.Asc.plugin.attachEvent("onAttachedContent", editWindow.onAttachedContent.bind(editWindow));
    window.Asc.plugin.attachEvent("onClickSave", () => {
        var bHasChanges = editWindow.onClickSave();
        if (bHasChanges) {
            window.Asc.plugin.sendToPlugin("onSaveFields", editWindow.citationObject);
        } else {
            window.Asc.plugin.sendToPlugin("onSaveFields", null);
        }
    });
})();
//# sourceMappingURL=edit-window.modern.js.map
