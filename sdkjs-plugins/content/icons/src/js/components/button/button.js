class Button {
    constructor(container, options = {}) {
        this.container =
            typeof container === "string"
                ? document.querySelector(container)
                : container;

        this.options = {
            text: options.text || "Button",
            type: options.type || "button", // button, submit, reset
            variant: options.variant || "primary", // primary, secondary, success, danger, etc.
            size: options.size || "medium", // small, medium, large
            disabled: options.disabled || false,
            loading: options.loading || false,
            icon: options.icon || null,
            iconPosition: options.iconPosition || "left", // left, right
            badge: options.badge || null,
            tooltip: options.tooltip || null,
            onClick: options.onClick || null,
            ...options,
        };

        this.isLoading = false;
        this.originalText = this.options.text;

        this.init();
    }

    init() {
        this.createDOM();
        this.bindEvents();
        this.updateState();
    }

    createDOM() {
        this.container.innerHTML = "";
        this.container.classList.add("custom-button-container");

        const buttonClasses = [
            "custom-button",
            `custom-button-${this.options.variant}`,
            `custom-button-${this.options.size}`,
            this.options.disabled ? "custom-button-disabled" : "",
            this.options.loading ? "custom-button-loading" : "",
        ]
            .filter(Boolean)
            .join(" ");

        this.container.innerHTML = `
            <button 
                class="${buttonClasses}"
                type="${this.options.type}"
                ${this.options.disabled ? "disabled" : ""}
                ${this.options.tooltip ? `title="${this.options.tooltip}"` : ""}
            >
                ${
                    this.options.loading
                        ? `
                    <span class="custom-button-spinner"></span>
                `
                        : ""
                }
                
                ${
                    this.options.icon && this.options.iconPosition === "left"
                        ? `
                    <span class="custom-button-icon custom-button-icon-left">${this.options.icon}</span>
                `
                        : ""
                }
                
                <span class="custom-button-text">${this.options.text}</span>
                
                ${
                    this.options.icon && this.options.iconPosition === "right"
                        ? `
                    <span class="custom-button-icon custom-button-icon-right">${this.options.icon}</span>
                `
                        : ""
                }
                
                ${
                    this.options.badge
                        ? `
                    <span class="custom-button-badge">${this.options.badge}</span>
                `
                        : ""
                }
            </button>
        `;

        // Сохраняем ссылки на элементы
        this.button = this.container.querySelector(".custom-button");
        this.buttonText = this.container.querySelector(".custom-button-text");
        this.spinner = this.container.querySelector(".custom-button-spinner");
        this.badgeElement = this.container.querySelector(
            ".custom-button-badge"
        );
    }

    bindEvents() {
        this.button.addEventListener("click", (e) => this.handleClick(e));
        this.button.addEventListener("mouseenter", () =>
            this.handleMouseEnter()
        );
        this.button.addEventListener("mouseleave", () =>
            this.handleMouseLeave()
        );
        this.button.addEventListener("focus", () => this.handleFocus());
        this.button.addEventListener("blur", () => this.handleBlur());

        // Keyboard events
        this.button.addEventListener("keydown", (e) => this.handleKeydown(e));
    }

    handleClick(e) {
        if (this.options.disabled || this.isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // Trigger custom event
        this.triggerClickEvent(e);

        // Call user-provided callback
        if (typeof this.options.onClick === "function") {
            this.options.onClick(e, this);
        }
    }

    handleMouseEnter() {
        this.container.classList.add("custom-button-hover");
        this.triggerEvent("mouseenter");
    }

    handleMouseLeave() {
        this.container.classList.remove("custom-button-hover");
        this.triggerEvent("mouseleave");
    }

    handleFocus() {
        this.container.classList.add("custom-button-focused");
        this.triggerEvent("focus");
    }

    handleBlur() {
        this.container.classList.remove("custom-button-focused");
        this.triggerEvent("blur");
    }

    handleKeydown(e) {
        switch (e.key) {
            case " ":
            case "Enter":
                if (this.button.tagName === "BUTTON") {
                    // Для button элемент уже обрабатывает клик
                    break;
                }
                // Для других элементов симулируем клик
                e.preventDefault();
                this.button.click();
                break;
            case "Escape":
                this.button.blur();
                break;
        }

        this.triggerEvent("keydown", { key: e.key });
    }

    // Public API
    setText(text) {
        this.options.text = text;
        if (this.buttonText) {
            this.buttonText.textContent = text;
        }
    }

    setIcon(icon, position = "left") {
        this.options.icon = icon;
        this.options.iconPosition = position;
        this.rebuild();
    }

    setBadge(badge) {
        this.options.badge = badge;
        if (this.badgeElement) {
            this.badgeElement.textContent = badge;
            this.badgeElement.style.display = badge ? "flex" : "none";
        } else if (badge) {
            this.rebuild();
        }
    }

    setVariant(variant) {
        // Удаляем старый класс варианта
        this.button.classList.remove(`custom-button-${this.options.variant}`);
        // Добавляем новый
        this.options.variant = variant;
        this.button.classList.add(`custom-button-${variant}`);
    }

    setSize(size) {
        // Удаляем старый класс размера
        this.button.classList.remove(`custom-button-${this.options.size}`);
        // Добавляем новый
        this.options.size = size;
        this.button.classList.add(`custom-button-${size}`);
    }

    enable() {
        this.options.disabled = false;
        this.button.disabled = false;
        this.container.classList.remove("custom-button-disabled");
    }

    disable() {
        this.options.disabled = true;
        this.button.disabled = true;
        this.container.classList.add("custom-button-disabled");
    }

    // Loading state
    startLoading() {
        this.isLoading = true;
        this.originalText = this.options.text;
        this.container.classList.add("custom-button-loading");

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
        this.container.classList.remove("custom-button-loading");

        if (this.spinner) {
            this.spinner.style.display = "none";
        }

        if (this.buttonText) {
            this.buttonText.textContent = this.originalText;
        }

        this.button.disabled = this.options.disabled;
    }

    // Tooltip
    setTooltip(tooltip) {
        this.options.tooltip = tooltip;
        this.button.title = tooltip || "";
    }

    // Events
    triggerClickEvent(e) {
        const event = new CustomEvent("button:click", {
            detail: {
                originalEvent: e,
                button: this,
            },
        });
        this.container.dispatchEvent(event);
    }

    triggerEvent(eventName, detail = {}) {
        const event = new CustomEvent(`button:${eventName}`, {
            detail: {
                ...detail,
                button: this,
            },
        });
        this.container.dispatchEvent(event);
    }

    // Rebuild the button (for major changes)
    rebuild() {
        this.createDOM();
        this.bindEvents();
        this.updateState();
    }

    updateState() {
        if (this.options.disabled) {
            this.disable();
        } else {
            this.enable();
        }

        if (this.options.loading) {
            this.startLoading();
        }
    }

    destroy() {
        this.container.innerHTML = "";
        this.container.classList.remove("custom-button-container");
    }
}

export { Button };
