import "./selectbox.css";

class SelectBox {
    #container;
    #options;
    #optionsContainer;
    #selectedValues;
    #isOpen;
    #items;

    /**
     * @param {string | HTMLElement} container
     * @param {*} options
     */
    constructor(container, options = {}) {
        this.#container =
            typeof container === "string"
                ? document.getElementById(container)
                : container;

        this.#options = {
            placeholder: options.placeholder || "Select an option",
            searchable: options.searchable || false,
            multiple: options.multiple || false,
            ...options,
        };

        this.#selectedValues = new Set();
        this.#isOpen = false;
        this.#items = [];

        this.#init();
    }

    #init() {
        this._createDOM();
        this.#bindEvents();
        this.#renderOptions();
    }

    _createDOM() {
        this.#container.innerHTML = "";
        this.#container.classList.add("selectbox-container");

        // Basic structure
        this.#container.innerHTML = `
            <div class="selectbox">
                <div class="selectbox-header" tabindex="0">
                    <span class="selectbox-selected-text">${
                        this.#options.placeholder
                    }</span>
                    <span class="selectbox-arrow"></span>
                </div>
                <div class="selectbox-dropdown">
                    ${
                        this.#options.searchable
                            ? `
                        <div class="selectbox-search">
                            <input type="text" class="selectbox-search-input" placeholder="Search...">
                        </div>
                    `
                            : ""
                    }
                    <div class="selectbox-options"></div>
                </div>
            </div>
        `;

        // Save references to key elements
        this.header = this.#container.querySelector(".selectbox-header");
        this.selectedText = this.#container.querySelector(
            ".selectbox-selected-text"
        );
        this.arrow = this.#container.querySelector(".selectbox-arrow");
        this.dropdown = this.#container.querySelector(".selectbox-dropdown");
        this.#optionsContainer =
            this.#container.querySelector(".selectbox-options");
        this.searchInput = this.#container.querySelector(
            ".selectbox-search-input"
        );
    }

    #bindEvents() {
        this.header.addEventListener("click", (e) => this.#toggleDropdown(e));

        // Search
        if (this.searchInput) {
            this.searchInput.addEventListener("input", (e) =>
                this.#handleSearch(e)
            );
        }

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!this.#container.contains(e.target)) {
                this.#closeDropdown();
            }
        });

        // Keyboard navigation
        this.header.addEventListener("keydown", (e) => this.#handleKeydown(e));
    }

    #toggleDropdown(e) {
        e.stopPropagation();
        this.#isOpen ? this.#closeDropdown() : this.#openDropdown();
    }

    #openDropdown() {
        this.#isOpen = true;
        this.dropdown.style.display = "block";
        this.arrow.classList.add("selectbox-arrow-open");
        this.header.classList.add("selectbox-header-open");

        if (this.searchInput) {
            setTimeout(() => this.searchInput.focus(), 100);
        }

        this.#renderOptions();
    }

    #closeDropdown() {
        this.#isOpen = false;
        this.dropdown.style.display = "none";
        this.arrow.classList.remove("selectbox-arrow-open");
        this.header.classList.remove("selectbox-header-open");

        if (this.searchInput) {
            this.searchInput.value = "";
        }
    }

    #handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        this.#renderOptions(searchTerm);
    }

    #handleKeydown(e) {
        switch (e.key) {
            case " ":
            case "Enter":
                e.preventDefault();
                this.#toggleDropdown(e);
                break;
            case "Escape":
                this.#closeDropdown();
                break;
            case "ArrowDown":
                e.preventDefault();
                if (!this.#isOpen) this.#openDropdown();
                break;
        }
    }

    #renderOptions(searchTerm = "") {
        if (!this.#optionsContainer) return;

        const filteredItems = searchTerm
            ? this.#items.filter((item) =>
                  item.text.toLowerCase().includes(searchTerm)
              )
            : this.#items;

        this.#optionsContainer.innerHTML = filteredItems
            .map(
                (item) => `
            <div class="selectbox-option ${
                this.#selectedValues.has(item.value)
                    ? "selectbox-option-selected"
                    : ""
            }" data-value="${item.value}">
                ${
                    this.#options.multiple
                        ? `
                    <input type="checkbox" ${
                        this.#selectedValues.has(item.value) ? "checked" : ""
                    } class="selectbox-checkbox">
                `
                        : ""
                }
                <span class="selectbox-option-text">${item.text}</span>
            </div>
        `
            )
            .join("");

        this.#optionsContainer
            .querySelectorAll(".selectbox-option")
            .forEach((option) => {
                option.addEventListener("click", (e) =>
                    this.#handleOptionClick(e, option)
                );
            });
    }

    #handleOptionClick(e, option) {
        const value = option.dataset.value;

        if (this.#options.multiple) {
            if (this.#selectedValues.has(value)) {
                this.#selectedValues.delete(value);
            } else {
                this.#selectedValues.add(value);
            }
        } else {
            this.#selectedValues.clear();
            this.#selectedValues.add(value);
            this.#closeDropdown();
        }

        this.#updateSelectedText();
        this.#renderOptions(this.searchInput?.value || "");

        // Trigger custom event
        this.#triggerChange();
    }

    #updateSelectedText() {
        if (this.#selectedValues.size === 0) {
            this.selectedText.textContent = this.#options.placeholder;
            return;
        }

        if (this.#options.multiple) {
            const selectedItems = this.#items.filter((item) =>
                this.#selectedValues.has(item.value)
            );
            if (selectedItems.length === 0) {
                this.selectedText.textContent = this.#options.placeholder;
            } else if (selectedItems.length === 1) {
                this.selectedText.textContent = selectedItems[0].text;
            } else {
                this.selectedText.textContent = `${selectedItems.length} items selected`;
            }
        } else {
            const selectedItem = this.#items.find((item) =>
                this.#selectedValues.has(item.value)
            );
            this.selectedText.textContent = selectedItem
                ? selectedItem.text
                : this.#options.placeholder;
        }
    }

    #triggerChange() {
        const event = new CustomEvent("selectbox:change", {
            detail: {
                values: Array.from(this.#selectedValues),
                items: this.#items.filter((item) =>
                    this.#selectedValues.has(item.value)
                ),
            },
        });
        this.#container.dispatchEvent(event);
    }

    // Public API

    addItem(value, text, selected = false) {
        this.#items.push({ value, text, selected });

        if (selected) {
            if (this.#options.multiple) {
                this.#selectedValues.add(value);
            } else {
                this.#selectedValues.clear();
                this.#selectedValues.add(value);
            }
        }

        this.#updateSelectedText();
    }

    removeItem(value) {
        this.#items = this.#items.filter((item) => item.value !== value);
        this.#selectedValues.delete(value);
        this.#updateSelectedText();
    }

    getValue() {
        return this.#options.multiple
            ? Array.from(this.#selectedValues)
            : Array.from(this.#selectedValues)[0] || null;
    }

    setValue(value) {
        if (this.#options.multiple && Array.isArray(value)) {
            this.#selectedValues = new Set(value);
        } else {
            this.#selectedValues = new Set([value]);
        }
        this.#updateSelectedText();
        this.#renderOptions();
    }

    clear() {
        this.#selectedValues.clear();
        this.#updateSelectedText();
        this.#renderOptions();
    }

    destroy() {
        document.removeEventListener("click", this.#closeDropdown);
        this.#container.innerHTML = "";
        this.#container.classList.remove("selectbox-container");
    }
}
export { SelectBox };
