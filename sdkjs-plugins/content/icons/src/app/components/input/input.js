// @ts-check

/// <reference path="./types.js" />
/**
 * @constructor
 * @param {string | HTMLInputElement} input
 * @param {InputOptionsType} options
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
        autocomplete: options.autocomplete || "off",
    };

    // Copy any additional properties
    for (var key in options) {
        if (!this._options.hasOwnProperty(key)) {
            // @ts-ignore
            this._options[key] = options[key];
        }
    }

    this._id = input.id || "input_" + Math.random().toString(36).slice(2, 9);
    this.isFocused = false;
    this.isValid = true;
    this._validationMessage = "";
    this._subscribers = [];
    this._boundHandles = {
        focus: function (/** @type {Event} */ e) {
            self._handleFocus(e);
        },
        blur: function (/** @type {Event} */ e) {
            self._handleBlur(e);
        },
        input: function (/** @type {Event} */ e) {
            self._handleInput(e);
        },
        keydown: function (/** @type {KeyboardEvent} */ e) {
            self._handleKeydown(e);
        },
        clear: function () {
            self.clear();
        },
        validate: function () {
            self.validate();
        },
    };
    this._clearButton = null;
    this._counter = null;
    this._counterCurrent = null;
    this._counterMax = null;
    this._validationElement = document.createElement("div");

    if (this._options.type === "search") {
        /** @type {HTMLSpanElement} */
        this._searchIcon = document.createElement("span");
        this._boundHandles.search = this._triggerSubmit.bind(this);
        this._container.classList.add("input-field-search");
    }

    this._createDOM();
    this._bindEvents();
    this._updateState();

    if (this._options.autofocus) {
        setTimeout(
            (function (self) {
                return function () {
                    self.focus();
                };
            })(this),
            100
        );
    }
}

InputField.prototype = {
    constructor: InputField,

    /** @type {HTMLInputElement} */
    // @ts-ignore
    input: null,
    /** @type {HTMLElement} */
    // @ts-ignore
    _container: null,
    /** @type {InputOptionsType} */
    _options: {},
    _id: "",
    isFocused: false,
    isValid: true,
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
    _createDOM: function () {
        var parent = this.input.parentNode;

        var fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.className +=
            " input-field-container  input-field-container-" + this._id;

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
            this._counterMax.textContent =
                String(this._options.maxLength) || "∞";
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
            this._searchIcon.innerHTML =
                '<svg width="14" height="14" viewBox="0 0 14 14" ' +
                'fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" clip-rule="evenodd" ' +
                'd="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" ' +
                'fill="currentColor"/>' +
                "</svg>";
            inputFieldMain.appendChild(this._searchIcon);
        }

        if (parent) {
            parent.insertBefore(fragment, this.input);
        }
        inputFieldMain.appendChild(this.input);
    },
    _bindEvents: function () {
        this.input.addEventListener("focus", this._boundHandles.focus);
        this.input.addEventListener("blur", this._boundHandles.blur);
        this.input.addEventListener("input", this._boundHandles.input);
        this.input.addEventListener("keydown", this._boundHandles.keydown);

        if (this._clearButton) {
            this._clearButton.addEventListener(
                "click",
                this._boundHandles.clear
            );
        }

        if (this._options.showSearchIcon && this._boundHandles.search) {
            this._searchIcon.addEventListener(
                "click",
                this._boundHandles.search
            );
        }

        this.input.addEventListener("change", this._boundHandles.validate);
    },
    /**
     * @param {Event} e
     */
    _handleFocus: function (e) {
        this.isFocused = true;
        this._container.className += " input-field-focused";
        this._updateClearButton();
        this._triggerFocusEvent(e);
    },
    /**
     * @param {Event} e
     */
    _handleBlur: function (e) {
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
    /**
     * @param {Event} e
     */
    _handleInput: function (e) {
        this._updateClearButton();
        this._updateCounter();
        this._triggerInputEvent(e);
    },

    /**
     * @param {KeyboardEvent} e
     */
    _handleKeydown: function (e) {
        var key = e.key || e.keyCode;

        if ((key === "Escape" || key === 27) && this._options.showClear) {
            this.clear();
            e.preventDefault();
        }

        if (key === "Enter" || key === 13) {
            this._triggerSubmit();
        }
    },

    _updateClearButton: function () {
        if (this._clearButton) {
            var hasValue = this.input.value.length > 0;
            this._clearButton.style.display = hasValue ? "block" : "none";
        }
    },

    _updateCounter: function () {
        if (this._counter && this._options.maxLength) {
            var current = this.input.value.length;
            var max = this._options.maxLength;

            if (this._counterCurrent) {
                this._counterCurrent.textContent = String(current);
            }
            if (this._counterMax) {
                this._counterMax.textContent = String(max);
            }

            // Change color when near max
            if (current > max * 0.9) {
                var counterClasses = this._counter.className.split(" ");
                if (
                    counterClasses.indexOf("input-field-counter-warning") === -1
                ) {
                    this._counter.className += " input-field-counter-warning";
                }
            } else {
                this._counter.className = this._counter.className
                    .split(" ")
                    .filter(function (cls) {
                        return cls !== "input-field-counter-warning";
                    })
                    .join(" ");
            }

            if (current > max) {
                var counterClasses = this._counter.className.split(" ");
                if (
                    counterClasses.indexOf("input-field-counter-error") === -1
                ) {
                    this._counter.className += " input-field-counter-error";
                }
            } else {
                this._counter.className = this._counter.className
                    .split(" ")
                    .filter(function (cls) {
                        return cls !== "input-field-counter-error";
                    })
                    .join(" ");
            }
        }
    },

    validate: function () {
        if (!this._options.validation) {
            this.isValid = true;
            return true;
        }

        var value = this.input.value;
        var isValid = true;
        var message = "";

        // Basic validation HTML
        if (this._options.required && !value.trim()) {
            isValid = false;
            message = "This field is required";
        } else if (
            this._options.minLength &&
            value.length < this._options.minLength
        ) {
            isValid = false;
            message =
                "Minimum length is " + this._options.minLength + " characters";
        } else if (
            this._options.maxLength &&
            value.length > this._options.maxLength
        ) {
            isValid = false;
            message =
                "Maximum length is " + this._options.maxLength + " characters";
        } else if (
            this._options.pattern &&
            !new RegExp(this._options.pattern).test(value)
        ) {
            isValid = false;
            message = "Invalid format";
        }

        // Custom validation
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

    updateValidationState: function () {
        if (!this.isValid) {
            this._validationElement.textContent = this._validationMessage;
            this._validationElement.style.display = "block";

            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-invalid") === -1) {
                this._container.className += " input-field-invalid";
            }

            this._container.className = this._container.className
                .split(" ")
                .filter(function (cls) {
                    return cls !== "input-field-valid";
                })
                .join(" ");
        } else if (this.input.value.length > 0) {
            this._validationElement.style.display = "none";

            var containerClasses = this._container.className.split(" ");
            if (containerClasses.indexOf("input-field-valid") === -1) {
                this._container.className += " input-field-valid";
            }

            this._container.className = this._container.className
                .split(" ")
                .filter(function (cls) {
                    return cls !== "input-field-invalid";
                })
                .join(" ");
        } else {
            this._validationElement.style.display = "none";
            this._container.className = this._container.className
                .split(" ")
                .filter(function (cls) {
                    return (
                        cls !== "input-field-valid" &&
                        cls !== "input-field-invalid"
                    );
                })
                .join(" ");
        }
    },

    _updateState: function () {
        this._updateClearButton();
        this._updateCounter();
        this.validate();
    },

    // Public API
    getValue: function () {
        return this.input.value.trim();
    },

    /**
     * @param {string} value
     */
    setValue: function (value) {
        this.input.value = value;
        this._updateState();
        this._triggerChange();
    },

    /**
     * @param {boolean} [bFocus]
     */
    clear: function (bFocus) {
        bFocus = bFocus !== undefined ? bFocus : true;
        this.setValue("");
        if (bFocus) {
            this.input.focus();
        }
    },

    focus: function () {
        this.input.focus();
    },

    blur: function () {
        this.input.blur();
    },

    enable: function () {
        this.input.disabled = false;
        this._options.disabled = false;

        this._container.className = this._container.className
            .split(" ")
            .filter(function (cls) {
                return cls !== "input-field-disabled";
            })
            .join(" ");
    },

    disable: function () {
        this.input.disabled = true;
        this._options.disabled = true;

        var containerClasses = this._container.className.split(" ");
        if (containerClasses.indexOf("input-field-disabled") === -1) {
            this._container.className += " input-field-disabled";
        }
    },

    /**
     * @param {function(InputEventType): void} callback
     * @returns {Object}
     */
    subscribe: function (callback) {
        var self = this;
        this._subscribers.push(callback);

        return {
            unsubscribe: function () {
                self._subscribers = self._subscribers.filter(function (cb) {
                    return cb !== callback;
                });
            },
        };
    },

    /**
     * @param {Event} e
     */
    _triggerInputEvent: function (e) {
        var detail = {
            value: this.input.value,
            originalEvent: e,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "inputfield:input",
                detail: detail,
            });
        });
    },

    /**
     * @param {Event} e
     */
    _triggerFocusEvent: function (e) {
        var detail = {
            value: this.input.value,
            originalEvent: e,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "inputfield:focus",
                detail: detail,
            });
        });
    },

    /**
     * @param {Event} e
     */
    _triggerBlurEvent: function (e) {
        var detail = {
            value: this.input.value,
            originalEvent: e,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "inputfield:blur",
                detail: detail,
            });
        });
    },

    _triggerChange: function () {
        var detail = {
            value: this.input.value,
            isValid: this.isValid,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "inputfield:change",
                detail: detail,
            });
        });
    },

    _triggerSubmit: function () {
        var detail = {
            value: this.input.value,
            isValid: this.isValid,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "inputfield:submit",
                detail: detail,
            });
        });
    },

    destroy: function () {
        this._subscribers = [];

        if (this._boundHandles) {
            try {
                this.input.removeEventListener(
                    "focus",
                    this._boundHandles.focus
                );
                this.input.removeEventListener("blur", this._boundHandles.blur);
                this.input.removeEventListener(
                    "input",
                    this._boundHandles.input
                );
                this.input.removeEventListener(
                    "keydown",
                    this._boundHandles.keydown
                );

                if (this._clearButton) {
                    this._clearButton.removeEventListener(
                        "click",
                        this._boundHandles.clear
                    );
                }

                if (this._options.showSearchIcon && this._boundHandles.search) {
                    this._searchIcon.removeEventListener(
                        "click",
                        this._boundHandles.search
                    );
                }

                this.input.removeEventListener(
                    "change",
                    this._boundHandles.validate
                );
            } catch (error) {
                console.error(error);
            }
        }

        this._container.innerHTML = "";

        this._container.className = this._container.className
            .split(" ")
            .filter(function (cls) {
                return cls !== "input-field-container";
            })
            .join(" ");
    },
};

export { InputField };
