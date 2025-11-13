// @ts-check

/** @typedef {import('./options-type.js').SelectboxOptionsType} SelectboxOptionsType */
/**
 * @typedef {Object} BoundHandlesType
 * @property {(e: Event) => void} toggle
 * @property {(e: Event) => void} search
 * @property {(e: MouseEvent) => void} close
 * @property {(e: KeyboardEvent) => void} keydown
 * @property {(e: Event) => void} dropdownClick
 */

import "./selectbox.css";

class SelectBox {
    /** @type {HTMLElement} */
    #container;
    /** @type {SelectboxOptionsType} */
    #options;
    /** @type {HTMLElement} */
    // @ts-ignore
    #optionsContainer;
    #selectedValues;
    #isOpen;
    /** @type {Array<{ value: string | number, text: string, selected: boolean }>} */
    #items;
    /** @type {HTMLInputElement | undefined} */
    searchInput;
    /** @type {HTMLElement} */
    // @ts-ignore
    header;
    /** @type {HTMLElement} */
    // @ts-ignore
    selectedText;
    /** @type {HTMLElement} */
    // @ts-ignore
    arrow;
    /** @type {HTMLElement} */
    // @ts-ignore
    dropdown;
    /** @type {Function[]} */
    _subscribers = [];
    /** @type {BoundHandlesType} */
    // @ts-ignore
    #boundHandles;

    /**
     * @param {string | HTMLElement} container
     * @param {SelectboxOptionsType} options
     */
    constructor(container, options) {
        if (typeof container === "string") {
            let temp = document.getElementById(container);
            if (temp instanceof HTMLElement) {
                container = temp;
            }
        }
        if (container instanceof HTMLElement) {
            this.#container = container;
        } else {
            throw new Error("Invalid container");
        }

        this.#options = {
            searchable: options.searchable || false,
            multiple: options.multiple || false,
            ...options,
        };

        this.#selectedValues = new Set();
        this.#isOpen = false;
        this.#items = [];

        this._createDOM();
        this.#bindEvents();
        this.#renderOptions();
    }

    _createDOM() {
        this.#container.innerHTML = "";
        this.#container.classList.add("selectbox-container");

        const fragment = document.createDocumentFragment();
        const selectBox = document.createElement("div");
        selectBox.classList.add("selectbox");
        fragment.appendChild(selectBox);

        this.header = document.createElement("div");
        this.header.classList.add("selectbox-header");
        selectBox.appendChild(this.header);
        this.header.setAttribute("tabindex", "0");

        this.selectedText = document.createElement("span");
        this.selectedText.classList.add("selectbox-selected-text");
        this.selectedText.textContent = this.#options.placeholder;
        this.header.appendChild(this.selectedText);

        this.arrow = document.createElement("span");
        this.arrow.classList.add("selectbox-arrow");
        this.header.appendChild(this.arrow);

        this.dropdown = document.createElement("div");
        this.dropdown.classList.add("selectbox-dropdown");
        selectBox.appendChild(this.dropdown);

        if (this.#options.searchable) {
            const search = document.createElement("div");
            search.classList.add("selectbox-search");
            this.dropdown.appendChild(search);
            this.searchInput = document.createElement("input");
            this.searchInput.classList.add("selectbox-search-input");
            this.searchInput.type = "text";
            this.searchInput.placeholder = "Search...";
            search.appendChild(this.searchInput);
        }

        this.#optionsContainer = document.createElement("div");
        this.#optionsContainer.classList.add("selectbox-options");
        this.dropdown.appendChild(this.#optionsContainer);

        this.#container.appendChild(fragment);
    }

    #bindEvents() {
        this.#boundHandles = {
            toggle: this.#toggleDropdown.bind(this),
            search: this.#handleSearch.bind(this),
            close: (/** @type {MouseEvent} */ e) => {
                if (
                    e.target instanceof HTMLElement &&
                    !this.#container.contains(e.target)
                ) {
                    this.#closeDropdown();
                }
            },
            keydown: this.#handleKeydown.bind(this),
            dropdownClick: this.#handleDropdownClick.bind(this),
        };
        this.header.addEventListener("click", this.#boundHandles.toggle);
        if (this.searchInput) {
            this.searchInput.addEventListener(
                "input",
                this.#boundHandles.search
            );
        }
        this.dropdown.addEventListener(
            "click",
            this.#boundHandles.dropdownClick
        );
        // Close on outside click
        document.addEventListener("click", this.#boundHandles.close);
        // Keyboard navigation
        this.header.addEventListener("keydown", this.#boundHandles.keydown);
    }

    /**
     * @param {Event} e
     */
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
            setTimeout(() => this.searchInput?.focus(), 100);
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

    /**
     * @param {Event} e
     */
    #handleSearch(e) {
        if (e.target instanceof HTMLInputElement === false) {
            return;
        }
        const searchTerm = e.target.value.toLowerCase();
        this.#renderOptions(searchTerm);
    }

    /**
     * @param {KeyboardEvent} e
     */
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
                if (this.#selectedValues.size === 0 && this.#items.length > 0) {
                    const firstItem = this.#items[0];
                    this.#selectedValues.add(firstItem.value);
                } else {
                    const selectedArray = Array.from(this.#selectedValues);
                    const currentIndex = this.#items.findIndex(
                        (item) => item.value === selectedArray[0]
                    );
                    const nextIndex = (currentIndex + 1) % this.#items.length;
                    this.#selectedValues.clear();
                    this.#selectedValues.add(this.#items[nextIndex].value);
                }
                this.#updateSelectedText();
                this.#renderOptions(this.searchInput?.value || "");
                this.#triggerChange();
                break;
            case "ArrowUp":
                e.preventDefault();
                if (this.#selectedValues.size === 0 && this.#items.length > 0) {
                    const lastItem = this.#items[this.#items.length - 1];
                    this.#selectedValues.add(lastItem.value);
                } else {
                    const selectedArray = Array.from(this.#selectedValues);
                    const currentIndex = this.#items.findIndex(
                        (item) => item.value === selectedArray[0]
                    );
                    const prevIndex =
                        (currentIndex - 1 + this.#items.length) %
                        this.#items.length;
                    this.#selectedValues.clear();
                    this.#selectedValues.add(this.#items[prevIndex].value);
                }
                this.#updateSelectedText();
                this.#renderOptions(this.searchInput?.value || "");
                this.#triggerChange();
                break;
        }
    }

    #renderOptions(searchTerm = "") {
        if (!this.#optionsContainer) return;
        this.#optionsContainer.innerHTML = "";

        /** @type {HTMLDivElement} */
        let selectedOption;

        const filteredItems = searchTerm
            ? this.#items.filter((item) =>
                  item.text.toLowerCase().includes(searchTerm)
              )
            : this.#items;

        /** @type {HTMLDivElement[]} */
        const options = [];
        const fragment = document.createDocumentFragment();
        filteredItems.forEach((item, index) => {
            options[index] = document.createElement("div");
            options[index].classList.add("selectbox-option");
            if (this.#selectedValues.has(item.value)) {
                options[index].classList.add("selectbox-option-selected");
                selectedOption = options[index];
            }
            options[index].setAttribute("data-value", String(item.value));

            if (this.#options.multiple) {
                const input = document.createElement("input");
                input.type = "checkbox";
                input.classList.add("selectbox-checkbox");
                input.checked = this.#selectedValues.has(item.value);
                options[index].appendChild(input);
            }
            const span = document.createElement("span");
            span.classList.add("selectbox-option-text");
            span.textContent = item.text;
            options[index].appendChild(span);
            fragment.appendChild(options[index]);
        });
        this.#optionsContainer.appendChild(fragment);
        // Scroll to selected option if present and dropdown is open
        if (this.#isOpen && this.#optionsContainer && selectedOption) {
            try {
                // Prefer scrollIntoView with nearest block to avoid abrupt jumps
                selectedOption.scrollIntoView({ block: "nearest" });
            } catch (err) {
                console.error(err);
            }
        }
    }

    /**
     *
     * @param {Event} e
     */
    #handleDropdownClick(e) {
        /** @type {HTMLDivElement} */
        let option;

        const target = e.target;
        if (target && target instanceof HTMLElement) {
            let temp = target.closest(".selectbox-option");
            if (temp instanceof HTMLDivElement) {
                option = temp;
            } else {
                return;
            }
        } else {
            return;
        }

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
        const detail = {
            values: Array.from(this.#selectedValues),
            items: this.#items.filter((item) =>
                this.#selectedValues.has(item.value)
            ),
        };
        const event = new CustomEvent("selectbox:change", {
            detail,
        });
        this.#container.dispatchEvent(event);
        this._subscribers.forEach((cb) =>
            cb({
                type: "selectbox:change",
                detail,
            })
        );
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
     * @param {string | number} value
     * @param {string} text
     * @param {boolean} selected
     */
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

    /**
     * @param {string} value
     */
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

    /**
     * @param {string} value
     */
    setValue(value) {
        if (this.#options.multiple && Array.isArray(value)) {
            this.#selectedValues = new Set(value);
        } else {
            this.#selectedValues = new Set([value]);
        }
        this.#updateSelectedText();
        this.#renderOptions();
    }

    clear(bSelectFirst = false) {
        this.#selectedValues.clear();
        if (bSelectFirst && this.#items.length > 0) {
            const firstItem = this.#items[0];
            this.#selectedValues.add(firstItem.value);
        }
        this.#updateSelectedText();
        this.#renderOptions();
    }

    destroy() {
        this._subscribers = [];
        try {
            this.header.removeEventListener("click", this.#boundHandles.toggle);
            if (this.searchInput) {
                this.searchInput.removeEventListener(
                    "input",
                    this.#boundHandles.search
                );
            }
            this.dropdown.removeEventListener(
                "click",
                this.#boundHandles.dropdownClick
            );
            document.removeEventListener("click", this.#boundHandles.close);
            this.header.removeEventListener(
                "keydown",
                this.#boundHandles.keydown
            );
        } catch (error) {
            console.error(error);
        }
        this.#container.innerHTML = "";
        this.#container.classList.remove("selectbox-container");
    }
}
export { SelectBox };
