class InputField {
    _container;
    _options;
    input;
    #clearButton;
    #counter;
    #counterCurrent;
    #counterMax;
    #validationElement;
    isFocused;
    isValid;
    _validationMessage;

    constructor(container, options = {}) {
        this._container =
            typeof container === "string"
                ? document.querySelector(container)
                : container;

        this._options = {
            type: options.type || "text",
            placeholder: options.placeholder || "",
            value: options.value || "",
            disabled: options.disabled || false,
            readonly: options.readonly || false,
            required: options.required || false,
            maxLength: options.maxLength || null,
            minLength: options.minLength || null,
            pattern: options.pattern || null,
            showCounter: options.showCounter || false,
            showClear: options.showClear || false,
            validation: options.validation || null,
            ...options,
        };

        this.isFocused = false;
        this.isValid = true;
        this._validationMessage = "";

        this.#init();
    }

    #init() {
        this._createDOM();
        this.#bindEvents();
        this.#updateState();
    }

    _createDOM() {
        this._container.innerHTML = "";
        this._container.classList.add("input-field-container");

        this._container.innerHTML = `
            <div class="input-field ${
                this._options.disabled ? "input-field-disabled" : ""
            }">
                <div class="input-field-main">
                    <input 
                        class="input-field-element"
                        type="${this._options.type}"
                        placeholder="${this._options.placeholder}"
                        value="${this._options.value}"
                        ${this._options.disabled ? "disabled" : ""}
                        ${this._options.readonly ? "readonly" : ""}
                        ${this._options.required ? "required" : ""}
                        ${
                            this._options.maxLength
                                ? `maxlength="${this._options.maxLength}"`
                                : ""
                        }
                        ${
                            this._options.pattern
                                ? `pattern="${this._options.pattern}"`
                                : ""
                        }
                    >
                    ${
                        this._options.showClear
                            ? `
                        <button type="button" class="input-field-clear" style="display: none;">
                            ×
                        </button>
                    `
                            : ""
                    }
                </div>
                ${
                    this._options.showCounter
                        ? `
                    <div class="input-field-counter">
                        <span class="input-field-counter-current">0</span>
                        /
                        <span class="input-field-counter-max">${
                            this._options.maxLength || "∞"
                        }</span>
                    </div>
                `
                        : ""
                }
                <div class="input-field-validation" style="display: none;"></div>
            </div>
        `;

        // Links to elements
        this.input = this._container.querySelector(".input-field-element");
        this.#clearButton = this._container.querySelector(".input-field-clear");
        this.#counter = this._container.querySelector(".input-field-counter");
        this.#counterCurrent = this._container.querySelector(
            ".input-field-counter-current"
        );
        this.#counterMax = this._container.querySelector(
            ".input-field-counter-max"
        );
        this.#validationElement = this._container.querySelector(
            ".input-field-validation"
        );
    }

    #bindEvents() {
        this.input.addEventListener("focus", () => this.#handleFocus());
        this.input.addEventListener("blur", () => this.#handleBlur());

        this.input.addEventListener("input", (e) => this.#handleInput(e));

        this.input.addEventListener("keydown", (e) => this.#handleKeydown(e));

        if (this.#clearButton) {
            this.#clearButton.addEventListener("click", () => this.clear());
        }

        this.input.addEventListener("change", () => this.validate());
    }

    #handleFocus() {
        this.isFocused = true;
        this._container.classList.add("input-field-focused");
        this.#updateClearButton();
    }

    #handleBlur() {
        this.isFocused = false;
        this._container.classList.remove("input-field-focused");
        this.validate();
    }

    #handleInput(e) {
        this.#updateClearButton();
        this.#updateCounter();
        this.#triggerInputEvent(e);
    }

    #handleKeydown(e) {
        if (e.key === "Escape" && this._options.showClear) {
            this.clear();
            e.preventDefault();
        }

        if (e.key === "Enter") {
            this.#triggerSubmit();
        }
    }

    #updateClearButton() {
        if (this.#clearButton) {
            const hasValue = this.input.value.length > 0;
            this.#clearButton.style.display = hasValue ? "block" : "none";
        }
    }

    #updateCounter() {
        if (this.#counter && this._options.maxLength) {
            const current = this.input.value.length;
            const max = this._options.maxLength;

            this.#counterCurrent.textContent = current;
            this.#counterMax.textContent = max;

            // Change color when near max
            if (current > max * 0.9) {
                this.#counter.classList.add("input-field-counter-warning");
            } else {
                this.#counter.classList.remove("input-field-counter-warning");
            }

            if (current > max) {
                this.#counter.classList.add("input-field-counter-error");
            } else {
                this.#counter.classList.remove("input-field-counter-error");
            }
        }
    }

    validate() {
        if (!this._options.validation) {
            this.isValid = true;
            return true;
        }

        const value = this.input.value;
        let isValid = true;
        let message = "";

        // Basic validation HTML
        if (this._options.required && !value.trim()) {
            isValid = false;
            message = "This field is required";
        } else if (
            this._options.minLength &&
            value.length < this._options.minLength
        ) {
            isValid = false;
            message = `Minimum length is ${this._options.minLength} characters`;
        } else if (
            this._options.maxLength &&
            value.length > this._options.maxLength
        ) {
            isValid = false;
            message = `Maximum length is ${this._options.maxLength} characters`;
        } else if (
            this._options.pattern &&
            !new RegExp(this._options.pattern).test(value)
        ) {
            isValid = false;
            message = "Invalid format";
        }

        // Custom validation
        if (isValid && typeof this._options.validation === "function") {
            const customValidation = this._options.validation(value);
            if (customValidation && !customValidation.isValid) {
                isValid = false;
                message = customValidation.message || "Invalid value";
            }
        }

        this.isValid = isValid;
        this._validationMessage = message;
        this.updateValidationState();

        return isValid;
    }

    updateValidationState() {
        if (this.#validationElement) {
            if (!this.isValid) {
                this.#validationElement.textContent = this._validationMessage;
                this.#validationElement.style.display = "block";
                this._container.classList.add("input-field-invalid");
                this._container.classList.remove("input-field-valid");
            } else if (this.input.value.length > 0) {
                this.#validationElement.style.display = "none";
                this._container.classList.add("input-field-valid");
                this._container.classList.remove("input-field-invalid");
            } else {
                this.#validationElement.style.display = "none";
                this._container.classList.remove(
                    "input-field-valid",
                    "input-field-invalid"
                );
            }
        }
    }

    #updateState() {
        this.#updateClearButton();
        this.#updateCounter();
        this.validate();
    }

    // Public API
    getValue() {
        return this.input.value;
    }

    setValue(value) {
        this.input.value = value;
        this.#updateState();
        this.#triggerChange();
    }

    clear() {
        this.setValue("");
        this.input.focus();
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    enable() {
        this.input.disabled = false;
        this._options.disabled = false;
        this._container.classList.remove("input-field-disabled");
    }

    disable() {
        this.input.disabled = true;
        this._options.disabled = true;
        this._container.classList.add("input-field-disabled");
    }

    // Events
    #triggerInputEvent(e) {
        const event = new CustomEvent("inputfield:input", {
            detail: {
                value: this.input.value,
                originalEvent: e,
            },
        });
        this._container.dispatchEvent(event);
    }

    #triggerChange() {
        const event = new CustomEvent("inputfield:change", {
            detail: {
                value: this.input.value,
                isValid: this.isValid,
            },
        });
        this._container.dispatchEvent(event);
    }

    #triggerSubmit() {
        const event = new CustomEvent("inputfield:submit", {
            detail: {
                value: this.input.value,
                isValid: this.isValid,
            },
        });
        this._container.dispatchEvent(event);
    }

    destroy() {
        this._container.innerHTML = "";
        this._container.classList.remove("input-field-container");
    }
}
