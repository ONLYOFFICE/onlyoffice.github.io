class SplitButton extends Button {
    constructor(container, options = {}) {
        super(container, {
            menuItems: options.menuItems || [],
            ...options,
        });
    }

    createDOM() {
        this.container.innerHTML = "";
        this.container.classList.add("custom-split-button-container");

        this.container.innerHTML = `
            <div class="custom-split-button">
                <button class="custom-split-button-main" type="${
                    this.options.type
                }">
                    ${
                        this.options.icon &&
                        this.options.iconPosition === "left"
                            ? `
                        <span class="custom-button-icon">${this.options.icon}</span>
                    `
                            : ""
                    }
                    <span class="custom-button-text">${this.options.text}</span>
                    ${
                        this.options.icon &&
                        this.options.iconPosition === "right"
                            ? `
                        <span class="custom-button-icon">${this.options.icon}</span>
                    `
                            : ""
                    }
                </button>
                <button class="custom-split-button-toggle" type="button">
                    ▼
                </button>
                <div class="custom-split-button-menu">
                    ${this.options.menuItems
                        .map(
                            (item) => `
                        <div class="custom-split-button-menu-item" data-action="${
                            item.action
                        }">
                            ${
                                item.icon
                                    ? `<span class="menu-item-icon">${item.icon}</span>`
                                    : ""
                            }
                            <span class="menu-item-text">${item.text}</span>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            </div>
        `;

        this.mainButton = this.container.querySelector(
            ".custom-split-button-main"
        );
        this.toggleButton = this.container.querySelector(
            ".custom-split-button-toggle"
        );
        this.menu = this.container.querySelector(".custom-split-button-menu");

        this.applyStyles();
    }

    applyStyles() {
        // Добавляем классы вариантов и размеров
        this.mainButton.classList.add(
            `custom-button-${this.options.variant}`,
            `custom-button-${this.options.size}`
        );
        this.toggleButton.classList.add(
            `custom-button-${this.options.variant}`,
            `custom-button-${this.options.size}`
        );
    }

    bindEvents() {
        super.bindEvents();

        this.toggleButton.addEventListener("click", (e) => this.toggleMenu(e));
        this.menu.addEventListener("click", (e) => this.handleMenuClick(e));

        // Закрытие меню при клике вне
        document.addEventListener("click", (e) => {
            if (!this.container.contains(e.target)) {
                this.hideMenu();
            }
        });
    }

    toggleMenu(e) {
        e.stopPropagation();
        const isVisible = this.menu.style.display === "block";
        isVisible ? this.hideMenu() : this.showMenu();
    }

    showMenu() {
        this.menu.style.display = "block";
    }

    hideMenu() {
        this.menu.style.display = "none";
    }

    handleMenuClick(e) {
        const menuItem = e.target.closest(".custom-split-button-menu-item");
        if (menuItem) {
            const action = menuItem.dataset.action;
            this.hideMenu();
            this.triggerMenuEvent(action, menuItem);
        }
    }

    triggerMenuEvent(action, menuItem) {
        const event = new CustomEvent("button:menuclick", {
            detail: {
                action: action,
                menuItem: menuItem,
                button: this,
            },
        });
        this.container.dispatchEvent(event);
    }
}
