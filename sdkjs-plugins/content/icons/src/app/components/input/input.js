// @ts-check

/** @typedef {import('./options-type.js').InputOptionsType} InputOptionsType */
/**
 * @typedef {Object} BoundHandlesType
 * @property {() => void} focus
 * @property {() => void} blur
 * @property {(ev: Event) => void} input
 * @property {(ev: KeyboardEvent) => void} keydown
 * @property {() => void} clear
 * @property {() => void} validate
 */

import "./input.css";

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
    /** @type {Function[]} */
    _subscribers = [];
    /** @type {BoundHandlesType} */
    // @ts-ignore
    #boundHandles;

    /**
     * @param {string | HTMLInputElement} input
     * @param {InputOptionsType} options
     */
    constructor(input, options = {}) {
        if (typeof input === "string") {
            let temp = document.getElementById(input);
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
            maxLength: options.maxLength || null,
            minLength: options.minLength || null,
            pattern: options.pattern || null,
            showCounter: options.showCounter || false,
            showClear: options.showClear || true,
            validation: options.validation || null,
            autocomplete: options.autocomplete || "off",
            ...options,
        };

        this.isFocused = false;
        this.isValid = true;
        this._validationMessage = "";

        this._createDOM();
        this.#bindEvents();
        this.#updateState();

        if (this._options.autofocus) {
            setTimeout(() => this.focus(), 100);
        }
    }

    _createDOM() {
        const parent = this.input.parentNode;

        const fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.classList.add("input-field-container");

        const inputField = document.createElement("div");
        this._container.appendChild(inputField);
        inputField.classList.add("input-field");
        if (this._options.disabled) {
            inputField.classList.add("input-field-disabled");
        }
        const inputFieldMain = document.createElement("div");
        inputField.appendChild(inputFieldMain);
        inputFieldMain.classList.add("input-field-main");
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
        if (this._options.autocomplete) {
            this.input.autocomplete = this._options.autocomplete;
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

        if (this._options.showClear) {
            this.#clearButton = document.createElement("button");
            inputField.appendChild(this.#clearButton);
            this.#clearButton.classList.add("input-field-clear");
            this.#clearButton.style.display = "none";
            this.#clearButton.textContent = "×";
        }

        parent?.insertBefore(fragment, this.input);
        inputFieldMain.appendChild(this.input);
    }

    #bindEvents() {
        this.#boundHandles = {
            focus: this.#handleFocus.bind(this),
            blur: this.#handleBlur.bind(this),
            input: this.#handleInput.bind(this),
            keydown: this.#handleKeydown.bind(this),
            clear: this.clear.bind(this),
            validate: this.validate.bind(this),
        };
        this.input.addEventListener("focus", this.#boundHandles.focus);
        this.input.addEventListener("blur", this.#boundHandles.blur);

        this.input.addEventListener("input", this.#boundHandles.input);

        this.input.addEventListener("keydown", this.#boundHandles.keydown);

        if (this.#clearButton) {
            this.#clearButton.addEventListener(
                "click",
                this.#boundHandles.clear
            );
        }

        this.input.addEventListener("change", this.#boundHandles.validate);
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
            this._triggerSubmit();
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

    clear(bFocus = true) {
        this.setValue("");
        if (bFocus) {
            this.input.focus();
        }
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
     * @param {Function} callback
     * @returns
     */
    subscribe(callback) {
        this._subscribers.push(callback);
        return {
            unsubscribe: () => {
                this._subscribers = this._subscribers.filter(
                    (cb) => cb !== callback
                );
            },
        };
    }

    /**
     * @param {Event} e
     */
    #triggerInputEvent(e) {
        const detail = {
            value: this.input.value,
            originalEvent: e,
        };
        const event = new CustomEvent("inputfield:input", {
            detail,
        });
        this._container.dispatchEvent(event);

        this._subscribers.forEach((cb) =>
            cb({
                type: "inputfield:input",
                detail,
            })
        );
    }

    #triggerChange() {
        const detail = {
            value: this.input.value,
            isValid: this.isValid,
        };
        const event = new CustomEvent("inputfield:change", {
            detail,
        });
        this._container.dispatchEvent(event);

        this._subscribers.forEach((cb) =>
            cb({
                type: "inputfield:change",
                detail,
            })
        );
    }

    _triggerSubmit() {
        const detail = {
            value: this.input.value,
            isValid: this.isValid,
        };
        const event = new CustomEvent("inputfield:submit", {
            detail,
        });
        this._container.dispatchEvent(event);

        this._subscribers.forEach((cb) =>
            cb({
                type: "inputfield:submit",
                detail,
            })
        );
    }

    destroy() {
        this._subscribers = [];
        try {
            this.input.removeEventListener("focus", this.#boundHandles.focus);
            this.input.removeEventListener("blur", this.#boundHandles.blur);
            this.input.removeEventListener("input", this.#boundHandles.input);
            this.input.removeEventListener(
                "keydown",
                this.#boundHandles.keydown
            );
            if (this.#clearButton) {
                this.#clearButton.removeEventListener(
                    "click",
                    this.#boundHandles.clear
                );
            }
            this.input.removeEventListener(
                "change",
                this.#boundHandles.validate
            );
        } catch (error) {
            console.error(error);
        }
        this._container.innerHTML = "";
        this._container.classList.remove("input-field-container");
    }
}

export { InputField };
