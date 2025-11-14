// @ts-check
import { Button } from "./button.js";

/** @typedef {import('./options-type.js').ButtonOptionsType} ButtonOptionsType */

class SplitButton extends Button {
    /**
     * @param {string | HTMLButtonElement} button
     * @param {ButtonOptionsType} options
     */
    constructor(container, options = {}) {
        super(container, {
            menuItems: options.menuItems || [],
            ...options,
        });
    }

    _createDOM() {
        this._container.innerHTML = "";
        this._container.classList.add("custom-split-button-container");

        this._container.innerHTML = `
            <div class="custom-split-button">
                <button class="custom-split-button-main" type="${
                    this._options.type
                }">
                    ${
                        this._options.icon &&
                        this._options.iconPosition === "left"
                            ? `
                        <span class="custom-button-icon">${this._options.icon}</span>
                    `
                            : ""
                    }
                    <span class="custom-button-text">${
                        this._options.text
                    }</span>
                    ${
                        this._options.icon &&
                        this._options.iconPosition === "right"
                            ? `
                        <span class="custom-button-icon">${this._options.icon}</span>
                    `
                            : ""
                    }
                </button>
                <button class="custom-split-button-toggle" type="button">
                    ▼
                </button>
                <div class="custom-split-button-menu">
                    ${this._options.menuItems
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

        this.mainButton = this._container.querySelector(
            ".custom-split-button-main"
        );
        this.toggleButton = this._container.querySelector(
            ".custom-split-button-toggle"
        );
        this.menu = this._container.querySelector(".custom-split-button-menu");

        this.applyStyles();
    }

    applyStyles() {
        // Добавляем классы вариантов и размеров
        this.mainButton.classList.add(
            `custom-button-${this._options.variant}`,
            `custom-button-${this._options.size}`
        );
        this.toggleButton.classList.add(
            `custom-button-${this._options.variant}`,
            `custom-button-${this._options.size}`
        );
    }

    _bindEvents() {
        super._bindEvents();

        this.toggleButton.addEventListener("click", (e) => this.toggleMenu(e));
        this.menu.addEventListener("click", (e) => this.handleMenuClick(e));

        // Закрытие меню при клике вне
        document.addEventListener("click", (e) => {
            if (!this._container.contains(e.target)) {
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
        this._container.dispatchEvent(event);
    }
}
