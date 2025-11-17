// @ts-check

/** @typedef {import('./options-type.js').ButtonOptionsType} ButtonOptionsType */
/**
 * @typedef {Object} BoundHandlesType
 * @property {(e: Event) => void} click
 * @property {() => void} mouseenter
 * @property {() => void} mouseleave
 * @property {() => void} focus
 * @property {() => void} blur
 * @property {(ev: KeyboardEvent) => void} keydown
 */

class Button {
    /** @type {HTMLDivElement} */
    _container;
    /** @type {HTMLButtonElement} */
    button;
    _options;
    #originalText;
    /** @type {Function[]} */
    _subscribers = [];
    /** @type {BoundHandlesType} */
    // @ts-ignore
    #boundHandles;

    /**
     * @param {string | HTMLButtonElement} button
     * @param {ButtonOptionsType} [options]
     */
    constructor(button, options = {}) {
        if (typeof button === "string") {
            let temp = document.getElementById(button);
            if (temp instanceof HTMLButtonElement) {
                button = temp;
            }
        }
        if (button instanceof HTMLButtonElement) {
            this.button = button;
        } else {
            throw new Error("Invalid button");
        }

        this._container = document.createElement("div");

        this._options = {
            text: options.text || button.textContent,
            type: options.type || "button",
            variant: options.variant || "primary",
            size: options.size || "medium",
            iconPosition: options.iconPosition || "left",
            ...options,
        };

        this.isLoading = false;
        this.#originalText = this._options.text;

        this._createDOM();
        this._bindEvents();
        this.updateState();
    }

    _createDOM() {
        const parent = this.button.parentNode;

        const fragment = document.createDocumentFragment();
        fragment.appendChild(this._container);
        this._container.classList.add("custom-button-container");

        this.button.classList.add("custom-button");
        this.button.classList.add(`custom-button-${this._options.variant}`);
        this.button.classList.add(`custom-button-${this._options.size}`);
        if (this._options.disabled) {
            this.button.classList.add("custom-button-disabled");
        }
        if (this._options.loading) {
            this.button.classList.add("custom-button-loading");
        }
        this.button.type = this._options.type;
        if (this._options.tooltip) {
            this.button.title = this._options.tooltip;
        }
        if (this._options.disabled) {
            this.button.disabled = true;
        }
        if (this._options.loading) {
            this.spinner = document.createElement("span");
            this.spinner.classList.add("custom-button-spinner");
            this.button.appendChild(this.spinner);
        }
        this.buttonText = document.createElement("span");
        this.buttonText.classList.add("custom-button-text");

        this.buttonText.textContent = "";

        if (this._options.icon) {
            const iconSpan = document.createElement("span");
            iconSpan.classList.add("custom-button-icon");
            if (this._options.iconPosition === "left") {
                iconSpan.classList.add("custom-button-icon-left");
                this.button.appendChild(iconSpan);
                this.button.appendChild(this.buttonText);
            } else {
                iconSpan.classList.add("custom-button-icon-right");
                this.button.appendChild(this.buttonText);
                this.button.appendChild(iconSpan);
            }
            iconSpan.innerHTML = this._options.icon;
        } else {
            this.button.appendChild(this.buttonText);
        }

        if (this._options.badge) {
            this.badgeElement = document.createElement("span");
            this.badgeElement.classList.add("custom-button-badge");
            this.badgeElement.textContent = this._options.badge;
            this.button.appendChild(this.badgeElement);
        }

        parent?.insertBefore(fragment, this.button);
        this._container.appendChild(this.button);
    }

    _bindEvents() {
        this.#boundHandles = {
            click: this._handleClick.bind(this),
            mouseenter: this.#handleMouseEnter.bind(this),
            mouseleave: this.#handleMouseLeave.bind(this),
            focus: this.#handleFocus.bind(this),
            blur: this.#handleBlur.bind(this),
            keydown: this.#handleKeydown.bind(this),
        };
        this.button.addEventListener("click", this.#boundHandles.click);
        this.button.addEventListener(
            "mouseenter",
            this.#boundHandles.mouseenter
        );
        this.button.addEventListener(
            "mouseleave",
            this.#boundHandles.mouseleave
        );
        this.button.addEventListener("focus", this.#boundHandles.focus);
        this.button.addEventListener("blur", this.#boundHandles.blur);
        this.button.addEventListener("keydown", this.#boundHandles.keydown);
    }

    /**
     *
     * @param {Event} e
     * @returns
     */
    _handleClick(e) {
        if (this._options.disabled || this.isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // Trigger custom event
        this.triggerClickEvent(e);
    }

    #handleMouseEnter() {
        this._container.classList.add("custom-button-hover");
        this.triggerEvent("mouseenter");
    }

    #handleMouseLeave() {
        this._container.classList.remove("custom-button-hover");
        this.triggerEvent("mouseleave");
    }

    #handleFocus() {
        this._container.classList.add("custom-button-focused");
        this.triggerEvent("focus");
    }

    #handleBlur() {
        this._container.classList.remove("custom-button-focused");
        this.triggerEvent("blur");
    }

    /**
     * @param {KeyboardEvent} e
     */
    #handleKeydown(e) {
        switch (e.key) {
            case " ":
            case "Enter":
                if (this.button.tagName === "BUTTON") {
                    break;
                }
                e.preventDefault();
                this.button.click();
                break;
            case "Escape":
                this.button.blur();
                break;
        }

        this.triggerEvent("keydown", { key: e.key });
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
     * @param {ButtonOptionsType['text']} text
     */
    setText(text) {
        if (typeof text === "undefined") return;
        this._options.text = text;
        if (this.buttonText) {
            this.buttonText.textContent = text;
        }
    }

    /**
     * @param {string} icon
     * @param {ButtonOptionsType['iconPosition']} position
     */
    setIcon(icon, position = "left") {
        this._options.icon = icon;
        this._options.iconPosition = position;
        //this.rebuild();
    }

    /**
     * @param {ButtonOptionsType['badge']} badge
     */
    setBadge(badge) {
        if (typeof badge === "undefined") return;
        this._options.badge = badge;
        if (this.badgeElement) {
            this.badgeElement.textContent = badge;
            this.badgeElement.style.display = badge ? "flex" : "none";
        } else if (badge) {
            //this.rebuild();
        }
    }

    /**
     *
     * @param {ButtonOptionsType['variant']} variant
     */
    setVariant(variant) {
        if (typeof variant === "undefined") return;
        this.button.classList.remove(`custom-button-${this._options.variant}`);
        this._options.variant = variant;
        this.button.classList.add(`custom-button-${variant}`);
    }

    /**
     * @param {ButtonOptionsType['size']} size
     */
    setSize(size) {
        if (typeof size === "undefined") return;
        this.button.classList.remove(`custom-button-${this._options.size}`);
        this._options.size = size;
        this.button.classList.add(`custom-button-${size}`);
    }

    enable() {
        this._options.disabled = false;
        this.button.disabled = false;
        this._container.classList.remove("custom-button-disabled");
    }

    disable() {
        this._options.disabled = true;
        this.button.disabled = true;
        this._container.classList.add("custom-button-disabled");
    }

    startLoading() {
        this.isLoading = true;
        this.#originalText = this._options.text;
        this._container.classList.add("custom-button-loading");

        if (this.spinner) {
            this.spinner.style.display = "inline-block";
        }

        if (this.buttonText) {
            this.buttonText.textContent = "Loading...";
        }

        this.button.disabled = true;
    }

    stopLoading() {
        this.isLoading = false;
        this._container.classList.remove("custom-button-loading");

        if (this.spinner) {
            this.spinner.style.display = "none";
        }

        if (this.buttonText) {
            this.buttonText.textContent = this.#originalText;
        }

        this.button.disabled = !!this._options.disabled;
    }

    /**
     *
     * @param {ButtonOptionsType['tooltip']} tooltip
     */
    setTooltip(tooltip) {
        if (typeof tooltip === "undefined") return;
        this._options.tooltip = tooltip;
        this.button.title = tooltip || "";
    }

    /**
     * @param {Event} e
     */
    triggerClickEvent(e) {
        const detail = {
            originalEvent: e,
            button: this,
        };

        this._subscribers.forEach((cb) =>
            cb({
                type: "button:click",
                detail,
            })
        );
    }

    /**
     * @param {"click"|"keydown" | "mouseenter" | "mouseleave" | "focus" | "blur"} eventName
     * @param {Object} detail
     */
    triggerEvent(eventName, detail = {}) {
        detail = {
            ...detail,
            button: this,
        };

        this._subscribers.forEach((cb) =>
            cb({
                type: `button:${eventName}`,
                detail,
            })
        );
    }

    updateState() {
        if (this._options.disabled) {
            this.disable();
        } else {
            this.enable();
        }

        if (this._options.loading) {
            this.startLoading();
        }
    }

    destroy() {
        this._subscribers = [];
        try {
            this.button.removeEventListener("click", this.#boundHandles.click);
            this.button.removeEventListener(
                "mouseenter",
                this.#boundHandles.mouseenter
            );
            this.button.removeEventListener(
                "mouseleave",
                this.#boundHandles.mouseleave
            );
            this.button.removeEventListener("focus", this.#boundHandles.focus);
            this.button.removeEventListener("blur", this.#boundHandles.blur);
            this.button.removeEventListener(
                "keydown",
                this.#boundHandles.keydown
            );
        } catch (error) {
            console.error(error);
        }
        this._container.innerHTML = "";
        this._container.classList.remove("custom-button-container");
    }
}

export { Button };
