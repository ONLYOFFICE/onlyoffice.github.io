// @ts-check

/** @typedef {import('./options-type.js').InputOptionsType} InputOptionsType */

class InputField {
    /** @type {HTMLElement} */
    _container;
    _options;
    /** @type {HTMLInputElement} */
    // @ts-ignore
    input;
    /** @type {HTMLButtonElement | undefined} */
    #clearButton;
    /** @type {HTMLDivElement | undefined} */
    #counter;
    /** @type {HTMLSpanElement | undefined} */
    #counterCurrent;
    /** @type {HTMLSpanElement | undefined} */
    #counterMax;
    /** @type {HTMLDivElement} */
    // @ts-ignore
    #validationElement;
    isFocused;
    isValid;
    _validationMessage;

    /**
     * @param {string | HTMLElement} container
     * @param {InputOptionsType} options
     */
    constructor(container, options = {}) {
        if (typeof container === "string") {
            let temp = document.getElementById(container);
            if (temp instanceof HTMLElement) {
                container = temp;
            }
        }
        if (container instanceof HTMLElement) {
            this._container = container;
        } else {
            throw new Error("Invalid container");
        }

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

        this._createDOM();
        this.#bindEvents();
        this.#updateState();
    }

    _createDOM() {
        this._container.innerHTML = "";
        this._container.classList.add("input-field-container");

        const fragment = document.createDocumentFragment();

        const inputField = document.createElement("div");
        fragment.appendChild(inputField);
        inputField.classList.add("input-field");
        if (this._options.disabled) {
            inputField.classList.add("input-field-disabled");
        }
        const inputFieldMain = document.createElement("div");
        inputField.appendChild(inputFieldMain);
        inputFieldMain.classList.add("input-field-main");
        this.input = document.createElement("input");
        this.input.classList.add("input-field-element");
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
        inputFieldMain.appendChild(this.input);

        if (this._options.showClear) {
            this.#clearButton = document.createElement("button");
            inputField.appendChild(this.#clearButton);
            this.#clearButton.classList.add("input-field-clear");
            this.#clearButton.style.display = "none";
            this.#clearButton.textContent = "×";
        }

        if (this._options.showCounter) {
            this.#counter = document.createElement("div");
            inputField.appendChild(this.#counter);
            this.#counter.classList.add("input-field-counter");
            this.#counterCurrent = document.createElement("span");
            this.#counterCurrent.classList.add("input-field-counter-current");
            this.#counterCurrent.textContent = "0";
            this.#counter.appendChild(this.#counterCurrent);
            let span = document.createElement("span");
            span.textContent = "/";
            this.#counter.appendChild(span);
            this.#counterMax = document.createElement("span");
            this.#counterMax.classList.add("input-field-counter-max");
            this.#counterMax.textContent =
                String(this._options.maxLength) || "∞";
            this.#counter.appendChild(this.#counterMax);
        }

        this.#validationElement = document.createElement("div");
        inputField.appendChild(this.#validationElement);
        this.#validationElement.classList.add("input-field-validation");
        this.#validationElement.style.display = "none";

        inputField.appendChild(inputFieldMain);

        this._container.appendChild(fragment);
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

    /**
     * @param {Event} e
     */
    #handleInput(e) {
        this.#updateClearButton();
        this.#updateCounter();
        this.#triggerInputEvent(e);
    }

    /**
     * @param {KeyboardEvent} e
     */
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

            if (this.#counterCurrent) {
                this.#counterCurrent.textContent = String(current);
            }
            if (this.#counterMax) {
                this.#counterMax.textContent = String(max);
            }
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

    /**
     * @param {string} value
     */
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

    /**
     * @param {Event} e
     */
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

export { InputField };
