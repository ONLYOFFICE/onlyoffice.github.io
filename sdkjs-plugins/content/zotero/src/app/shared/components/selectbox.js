/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

// @ts-check

/// <reference path="./types.js" />

/**
 * @typedef {Object} BoundHandlesType
 * @property {(e: Event) => void} toggle
 * @property {(e: Event) => void} search
 * @property {(e: MouseEvent) => void} close
 * @property {(e: KeyboardEvent) => void} keydown
 * @property {(e: Event) => void} dropdownClick
 */

class SelectBox {
    static #instances = new Set();

    /**
     * @param {string | HTMLElement} container
     * @param {SelectboxOptionsType} options
     */
    constructor(container, options) {
        if (typeof container === "string") {
            var temp = document.getElementById(container);
            if (temp instanceof HTMLElement) {
                container = temp;
            }
        }
        if (container instanceof HTMLElement) {
            this._container = container;
        } else {
            throw new Error("Invalid container");
        }

        /** @type {SelectboxOptionsType} */
        this._options = Object.assign(options, {
            placeholder: options.placeholder || "Select...",
            searchable: options.searchable || false,
            multiple: options.multiple || false,
            description: options.description || "",
        });

        this._selectedValues = new Set();
        this.isOpen = false;
        /** @type {Array<{ value: string, text: string, selected: boolean } | null>} */
        this._items = [];
        /** @type {Array<{ value: string, text: string, selected: boolean }>} */
        this._customItems = [];
        /** @type {Function[]} */
        this._subscribers = [];
        /** @type {BoundHandlesType} */
        this._boundHandles = {
            toggle: (e) => {
                this.#toggle(e);
            },
            search: (e) => {
                this.#handleSearch(e);
            },
            close: (e) => {
                if (
                    e.target instanceof HTMLElement &&
                    !this._container.contains(e.target) &&
                    !e.target.classList.contains("selectbox-option")
                ) {
                    this.#closeDropdown();
                }
            },
            keydown: (e) => {
                this.#handleKeydown(e);
            },
            dropdownClick: (e) => {
                this.#handleDropdownClick(e);
            },
        };
        /** @type {HTMLElement|null} */
        this._optionsContainer = null;
        /** @type {HTMLInputElement | null} */
        this.searchInput = null;
        /** @type {HTMLElement} */
        this._select = document.createElement("div");
        this._header = document.createElement("div");
        this._selectedText = document.createElement("span");
        this._arrow = document.createElement("span");
        this._dropdown = document.createElement("div");

        this.#createDOM();
        this.#bindEvents();
        this.#renderOptions();

        SelectBox.#instances.add(this);
    }

    #createDOM() {
        this._container.innerHTML = "";
        this._container.className += " selectbox-container";

        var fragment = document.createDocumentFragment();
        this._select.className += " selectbox";
        if (this._options.multiple) {
            this._select.className += " selectbox-multiple";
        }
        fragment.appendChild(this._select);

        this._header.className += " selectbox-header";
        this._select.appendChild(this._header);
        this._header.setAttribute("tabindex", "0");

        this._selectedText.className += " selectbox-selected-text";
        this._selectedText.textContent = this._options.placeholder;
        this._header.appendChild(this._selectedText);

        this._arrow.className += " selectbox-arrow";
        this._arrow.innerHTML =
            '<svg width="6" height="6" viewBox="0 0 6 6" ' +
            'fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path fill-rule="evenodd" clip-rule="evenodd"' +
            ' d="M3 0L0 2.9978L3 5.99561L6 2.9978L3 0ZM3 0.00053797L0.75 2.24889L3 4.49724L5.25 ' +
            '2.24889L3 0.00053797Z" fill="currentColor"/>' +
            "</svg>";
        this._header.appendChild(this._arrow);

        this._dropdown.className += " selectbox-dropdown";
        this._select.appendChild(this._dropdown);

        if (this._options.description) {
            var description = document.createElement("div");
            description.className += " i18n selectbox-description";
            description.textContent = this._options.description;
            this._dropdown.appendChild(description);
        }
        if (this._options.searchable) {
            var search = document.createElement("div");
            search.className += " selectbox-search";
            this._dropdown.appendChild(search);
            this.searchInput = document.createElement("input");
            this.searchInput.className += " selectbox-search-input";
            this.searchInput.type = "text";
            this.searchInput.placeholder = "Search...";
            search.appendChild(this.searchInput);
        }

        this._optionsContainer = document.createElement("div");
        this._optionsContainer.className += " selectbox-options";
        this._dropdown.appendChild(this._optionsContainer);

        this._container.appendChild(fragment);
    }

    #bindEvents() {
        var self = this;

        this._header.addEventListener("click", this._boundHandles.toggle);

        if (this.searchInput) {
            this.searchInput.addEventListener(
                "input",
                this._boundHandles.search
            );
        }

        this._dropdown.addEventListener(
            "click",
            this._boundHandles.dropdownClick
        );
        this._dropdown.addEventListener("wheel", function (e) {
            e.stopPropagation();
        });

        // Keyboard navigation
        this._header.addEventListener("keydown", this._boundHandles.keydown);
        this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
    }
    /**
     * @param {Event} [e]
     */
    #toggle(e) {
        e && e.stopPropagation();
        this.isOpen ? this.#closeDropdown() : this.openDropdown();

        if (e && e.type === "click") {
            for (const selBox of SelectBox.#instances) {
                if (selBox.isOpen && selBox !== this) {
                    selBox.#closeDropdown();
                }
            }
        }
    }
    openDropdown() {
        if (!this.isOpen) {
            // Close on outside click
            document.addEventListener("click", this._boundHandles.close);
        }
        this.isOpen = true;
        this._dropdown.style.display = "block";
        this._arrow.className += " selectbox-arrow-open";
        this._header.className += " selectbox-header-open";
        if (this.searchInput) {
            setTimeout(
                (function (self) {
                    return function () {
                        if (self.searchInput) {
                            self.searchInput.focus();
                        }
                    };
                })(this),
                100
            );
        }

        this.#renderOptions();
    }
    /**
     * @private
     */
    #closeDropdown() {
        if (this.isOpen && document && this._boundHandles) {
            document.removeEventListener("click", this._boundHandles.close);
        }
        this.isOpen = false;
        this._dropdown.style.display = "none";

        var arrowClasses = this._arrow.className.split(" ");
        var newArrowClasses = [];
        for (var i = 0; i < arrowClasses.length; i++) {
            if (arrowClasses[i] !== "selectbox-arrow-open") {
                newArrowClasses.push(arrowClasses[i]);
            }
        }
        this._arrow.className = newArrowClasses.join(" ");

        var headerClasses = this._header.className.split(" ");
        var newHeaderClasses = [];
        for (var i = 0; i < headerClasses.length; i++) {
            if (headerClasses[i] !== "selectbox-header-open") {
                newHeaderClasses.push(headerClasses[i]);
            }
        }
        this._header.className = newHeaderClasses.join(" ");

        if (this.searchInput) {
            this.searchInput.value = "";
        }
    }
    /**
     * @param {Event} e
     * @private
     */
    #handleSearch(e) {
        var target = e.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        var searchTerm = target.value.toLowerCase();
        this.#renderOptions(searchTerm);
    }
    /**
     * @param {'up'|'down'} direction
     */
    #selectNextPrevItem(direction) {
        const searchTerm = this.searchInput
            ? this.searchInput.value.toLowerCase()
            : "";
        let newItem;
        let items = this._items.filter(function (item) {
            return item !== null;
        });
        if (searchTerm) {
            items = items.filter(function (item) {
                return item.text.toLowerCase().indexOf(searchTerm) !== -1;
            });
        }
        if (items.length === 0) {
            return;
        }
        if (direction === "up") {
            if (this._selectedValues.size === 0 && items.length > 0) {
                newItem = items[items.length - 1];
                this._selectedValues.add(newItem.value);
            } else {
                var selectedArray = Array.from(this._selectedValues);
                var currentIndex = -1;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === selectedArray[0]) {
                        currentIndex = i;
                        break;
                    }
                }
                var prevIndex =
                    (currentIndex - 1 + items.length) % items.length;
                this._selectedValues.clear();
                newItem = items[prevIndex];
                this._selectedValues.add(newItem.value);
            }
        } else {
            if (this._selectedValues.size === 0 && items.length > 0) {
                newItem = items[0];
                this._selectedValues.add(newItem.value);
            } else {
                var selectedArray = Array.from(this._selectedValues);
                var currentIndex = -1;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === selectedArray[0]) {
                        currentIndex = i;
                        break;
                    }
                }
                var nextIndex = (currentIndex + 1) % items.length;
                if (nextIndex === items.length) {
                    nextIndex = 0;
                }
                this._selectedValues.clear();
                newItem = items[nextIndex];
                this._selectedValues.add(newItem.value);
            }
        }

        this.#updateSelectedText();
        this.#renderOptions(searchTerm, true);
        this.#triggerChange(newItem.value, true);
    }
    /**
     * @param {KeyboardEvent} e
     * @private
     */
    #handleKeydown(e) {
        var key = e.key || e.keyCode;

        switch (key) {
            case "Enter":
            case 13:
                e.preventDefault();
                this.#toggle(e);
                break;
            case "Escape":
            case 27:
                this.#closeDropdown();
                break;
            case "ArrowDown":
            case 40:
                e.preventDefault();
                this.#selectNextPrevItem("down");
                break;
            case "ArrowUp":
            case 38:
                e.preventDefault();
                this.#selectNextPrevItem("up");
                break;
            case "Tab":
            case 9:
                this.#closeDropdown();
                break;
        }
    }
    /**
     * @param {string} [searchTerm]
     * @param {boolean} [scrollIntoView]
     * @private
     * */
    #renderOptions(searchTerm, scrollIntoView) {
        searchTerm = searchTerm || "";
        if (!this._optionsContainer) return;
        this._optionsContainer.innerHTML = "";

        /** @type {HTMLDivElement | null} */
        var selectedOption = null;

        var filteredItems = this._items;
        if (searchTerm) {
            filteredItems = filteredItems.filter(function (item) {
                return (
                    item !== null &&
                    item.text.toLowerCase().indexOf(searchTerm) !== -1
                );
            });
        }

        var fragment = document.createDocumentFragment();
        for (var i = 0; i < filteredItems.length; i++) {
            let item = filteredItems[i];
            if (!item) {
                const hr = document.createElement("hr");
                hr.className += " selectbox-option-divider";
                fragment.appendChild(hr);
                continue;
            }
            let option = document.createElement("div");
            option.className += " selectbox-option";
            if (this._selectedValues.has(item.value)) {
                option.className +=
                    " selectbox-option-selected checkbox--checked";
                selectedOption = option;
            }
            option.setAttribute("data-value", item.value);

            let label = document.createElement("label");
            label.className += " selectbox-option-text";
            label.textContent = item.text;

            if (this._options.multiple) {
                option.className += " selectbox-option-checkbox";
                let input = document.createElement("input");
                input.type = "checkbox";
                input.id = "checkbox-" + item.value;
                input.className += " selectbox-checkbox";
                input.checked = this._selectedValues.has(item.value);
                option.appendChild(input);
                //label.htmlFor = input.id;
                const visualCheckbox = document.createElement("span");
                visualCheckbox.className = "checkbox-visual";
                visualCheckbox.setAttribute("aria-hidden", "true");

                const svgNS = "http://www.w3.org/2000/svg";
                const checkmarkSVG = document.createElementNS(svgNS, "svg");
                checkmarkSVG.setAttribute("viewBox", "0 0 10 8");
                checkmarkSVG.setAttribute("class", "checkbox-checkmark");

                const path = document.createElementNS(svgNS, "path");
                path.setAttribute(
                    "d",
                    "M0.682129 3.40702L3.68213 6.20702L9.18218 0.707116"
                );
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", "currentColor");
                path.setAttribute("stroke-width", "2");

                checkmarkSVG.appendChild(path);
                visualCheckbox.appendChild(checkmarkSVG);
                option.appendChild(visualCheckbox);
            }

            option.appendChild(label);
            fragment.appendChild(option);
        }
        if (this._customItems.length) {
            const hr = document.createElement("hr");
            hr.className += " selectbox-option-divider";
            fragment.appendChild(hr);
        }
        for (var i = 0; i < this._customItems.length; i++) {
            let item = this._customItems[i];

            let option = document.createElement("label");
            option.className += " selectbox-custom-option";
            option.setAttribute("data-value", item.value);
            option.setAttribute("for", item.value);

            var span = document.createElement("span");
            span.className += " selectbox-option-text";
            span.textContent = item.text;
            option.appendChild(span);
            fragment.appendChild(option);
        }

        this._optionsContainer.appendChild(fragment);

        if (
            scrollIntoView &&
            this.isOpen &&
            this._optionsContainer &&
            selectedOption
        ) {
            try {
                if (selectedOption.scrollIntoView) {
                    selectedOption.scrollIntoView({ block: "nearest" });
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
    /**
     * @param {Event} e
     * @private
     */
    #handleDropdownClick(e) {
        var target = e.target || e.srcElement;
        var option = null;

        if (target && target instanceof HTMLElement) {
            var temp = null;
            var classList = target.className.split(" ");
            var hasOptionClass = false;
            for (var i = 0; i < classList.length; i++) {
                if (classList[i] === "selectbox-option") {
                    hasOptionClass = true;
                    break;
                } else if (classList[i] === "selectbox-custom-option") {
                    const val = target.getAttribute("data-value");
                    if (val) {
                        e.stopPropagation();
                        this.#triggerCustomChange(val);
                        this.#closeDropdown();
                        return;
                    }
                    break;
                }
            }

            if (hasOptionClass) {
                temp = target;
            } else if (
                target.parentNode &&
                target.parentNode instanceof HTMLElement
            ) {
                var parentClassList = target.parentNode.className.split(" ");
                var parentHasOptionClass = false;
                for (var i = 0; i < parentClassList.length; i++) {
                    if (parentClassList[i] === "selectbox-option") {
                        parentHasOptionClass = true;
                        break;
                    } else if (
                        parentClassList[i] === "selectbox-custom-option"
                    ) {
                        const val =
                            target.parentNode.getAttribute("data-value");
                        if (val) {
                            e.stopPropagation();
                            this.#triggerCustomChange(val);
                            this.#closeDropdown();
                            return;
                        }
                        break;
                    }
                }

                if (parentHasOptionClass) {
                    temp = target.parentNode;
                }
            }

            if (temp instanceof HTMLDivElement) {
                option = temp;
            } else {
                return;
            }
        } else {
            return;
        }

        var value = option.getAttribute("data-value");
        if (value === null) return;
        let enabled = true;

        if (this._options.multiple) {
            if (this._selectedValues.has(value)) {
                this.unselectItems(value, true);
                enabled = false;
            } else {
                this.selectItems(value, true);
            }
        } else {
            this.selectItems(value, true);
            this.#closeDropdown();
        }

        this.#updateSelectedText();

        this.#triggerChange(value, enabled);
    }
    /**
     * @private
     */
    #updateSelectedText() {
        if (this._selectedValues.size === 0) {
            this._selectedText.textContent = this._options.placeholder;
            return;
        }

        if (this._options.multiple) {
            var selectedItems = [];
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                if (item && this._selectedValues.has(item.value)) {
                    selectedItems.push(item);
                }
            }

            if (selectedItems.length === 0) {
                this._selectedText.textContent = this._options.placeholder;
            } else if (selectedItems.length === 1) {
                this._selectedText.textContent = selectedItems[0].text;
            } else {
                this._selectedText.textContent =
                    selectedItems.length + " items selected";
            }
        } else {
            var selectedItem = null;
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                if (item && this._selectedValues.has(item.value)) {
                    selectedItem = item;
                    break;
                }
            }

            this._selectedText.textContent = selectedItem
                ? selectedItem.text
                : this._options.placeholder;
        }
    }
    /**
     * @param {string} currentValue
     * @param {boolean} enabled
     * @private
     */
    #triggerChange(currentValue, enabled) {
        var values = Array.from(this._selectedValues);
        var items = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this._selectedValues.has(item.value)) {
                items.push(item);
            }
        }

        /** @type {SelectboxEventDetail} */
        var detail = {
            values: values,
            items: items,
            current: currentValue,
            enabled: enabled,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "selectbox:change",
                detail: detail,
            });
        });
    }
    /**
     * @param {string} currentValue
     * @private
     */
    #triggerCustomChange(currentValue) {
        /** @type {SelectboxEventDetail} */
        var detail = {
            values: [],
            current: currentValue,
            enabled: false,
        };

        this._subscribers.forEach(function (cb) {
            cb({
                type: "selectbox:custom",
                detail: detail,
            });
        });
    }
    /**
     * @param {function(SelectboxEventType): void} callback
     * @returns {Object}
     */
    subscribe(callback) {
        var self = this;
        this._subscribers.push(callback);

        return {
            unsubscribe() {
                self._subscribers = self._subscribers.filter(function (cb) {
                    return cb !== callback;
                });
            },
        };
    }
    /**
     * @param {string} value
     * @param {string} text
     * @param {boolean} selected
     */
    addItem(value, text, selected) {
        selected = selected || false;
        const bHasItem = this._items.some(
            (item) => item && item.value === value
        );
        if (bHasItem) {
            const item = this._items.find(
                (item) => item && item.value === value
            );
            if (item) item.selected = selected;
        } else {
            this._items.push({ value: value, text: text, selected: selected });
        }

        if (selected) {
            if (this._options.multiple) {
                this._selectedValues.add(value);
            } else {
                this._selectedValues.clear();
                this._selectedValues.add(value);
            }
        }

        this.#updateSelectedText();
    }
    /**
     * @param {Array<[string,string]>} values
     * @param {string} [selectedValue]
     */
    addItems(values, selectedValue) {
        const self = this;
        values.forEach(function (pair, index) {
            const bHasItem = self._items.some(
                (item) => item && item.value === pair[0]
            );
            if (bHasItem) return;
            const isSelected = selectedValue
                ? pair[0] === selectedValue
                : index === 0;

            if (isSelected) {
                if (self._options.multiple) {
                    self._selectedValues.add(pair[0]);
                } else {
                    self._selectedValues.clear();
                    self._selectedValues.add(pair[0]);
                }
            }

            self._items.push({
                value: pair[0],
                text: pair[1],
                selected: isSelected,
            });
        }, this);

        if (this.isOpen) {
            this.#renderOptions();
        }

        this.#updateSelectedText();
    }
    /**
     * @param {string} value
     * @param {string} text
     */
    addCustomItem(value, text) {
        this._customItems.push({ value: value, text: text, selected: false });
    }
    addSeparator() {
        this._items.push(null);
    }
    /**
     * @param {string} value
     */
    removeItem(value) {
        this._items = this._items.filter(function (item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._customItems = this._customItems.filter(function (item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this._selectedValues.delete(value);
        this.#updateSelectedText();
    }
    /**
     * @return {null | string}
     */
    getSelectedValue() {
        if (this._options.multiple) {
            console.error(
                "Method getSelectedValue is only available for single-select boxes."
            );
            return null;
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    /**
     * @return {null | string | Array<string>}
     */
    getSelectedValues() {
        if (this._options.multiple) {
            return Array.from(this._selectedValues);
        } else {
            var values = Array.from(this._selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    /**
     * @param {string | Array<string>} values
     * @param {boolean} [bSilent]
     */
    selectItems(values, bSilent) {
        const self = this;
        if (!this._options.multiple && Array.isArray(values)) {
            console.error(
                "Method selectItem is only available for multi-select boxes."
            );
            return;
        }
        /** @type {string} */
        let value = "";

        if (this._options.multiple) {
            /**
             * @param {string} value
             */
            let checkMultiOption = function (value) {
                if (self._optionsContainer) {
                    let option = self._optionsContainer.querySelector(
                        '[data-value="' + value + '"]'
                    );

                    if (option) {
                        let checkbox = option.querySelector(
                            'input[type="checkbox"]'
                        );
                        if (checkbox && checkbox instanceof HTMLInputElement) {
                            checkbox.checked = true;
                        }
                        option.classList.add("selectbox-option-selected");
                        option.classList.add("checkbox--checked");
                    }
                }
            };
            if (Array.isArray(values)) {
                for (var i = 0; i < values.length; i++) {
                    value = values[i];
                    if (!this._selectedValues.has(value)) {
                        this._selectedValues.add(value);
                        checkMultiOption(value);
                    }
                }
            } else {
                value = values;
                if (!this._selectedValues.has(value)) {
                    this._selectedValues.add(value);
                    checkMultiOption(value);
                }
            }
        } else if (!Array.isArray(values)) {
            value = values;
            this._selectedValues.clear();
            this._selectedValues.add(value);

            if (this._optionsContainer) {
                let selectedOptions = this._optionsContainer.querySelectorAll(
                    '.selectbox-option-selected[data-value="' + value + '"]'
                );
                selectedOptions.forEach(function (option) {
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                });
                let option = this._optionsContainer.querySelector(
                    '[data-value="' + value + '"]'
                );

                if (option) {
                    option.classList.add("selectbox-option-selected");
                    option.classList.add("checkbox--checked");
                }
            }
            this.#closeDropdown();
        }

        this.#updateSelectedText();

        if (bSilent) {
            return;
        }

        this.#triggerChange(value, true);
    }
    /**
     * @param {string | Array<string>} values
     * @param {boolean} [bSilent]
     */
    unselectItems(values, bSilent) {
        const self = this;
        if (!this._options.multiple) {
            console.error(
                "Method unselectItem is only available for multi-select boxes."
            );
            return;
        }
        /** @type {string} */
        let value = "";

        /**
         * @param {string} value
         */
        let uncheckMultiOption = function (value) {
            if (self._optionsContainer) {
                let option = self._optionsContainer.querySelector(
                    '[data-value="' + value + '"]'
                );

                if (option) {
                    let checkbox = option.querySelector(
                        'input[type="checkbox"]'
                    );
                    if (checkbox && checkbox instanceof HTMLInputElement) {
                        checkbox.checked = false;
                    }
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                }
            }
        };

        if (Array.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                value = values[i];
                if (this._selectedValues.has(value)) {
                    this._selectedValues.delete(value);
                    uncheckMultiOption(value);
                }
            }
        } else {
            value = values;
            if (this._selectedValues.has(value)) {
                this._selectedValues.delete(value);
                uncheckMultiOption(value);
            }
        }

        this.#updateSelectedText();

        if (bSilent) {
            return;
        }

        this.#triggerChange(value, true);
    }
    disable() {
        this._select.classList.add("selectbox-disabled");
    }
    enable() {
        this._select.classList.remove("selectbox-disabled");
    }
    /**
     * @param {boolean} bSelectFirst
     */
    clear(bSelectFirst) {
        bSelectFirst = bSelectFirst || false;
        this._selectedValues.clear();
        if (bSelectFirst && this._items.length > 0) {
            var firstItem = this._items[0];
            if (firstItem) {
                this._selectedValues.add(firstItem.value);
            }
        }
        this.#updateSelectedText();
        this.#renderOptions();
    }
    destroy() {
        this._subscribers = [];
        SelectBox.#instances.delete(this);
        try {
            if (this._header && this._boundHandles) {
                this._header.removeEventListener(
                    "click",
                    this._boundHandles.toggle
                );
            }
            if (this.searchInput && this._boundHandles) {
                this.searchInput.removeEventListener(
                    "input",
                    this._boundHandles.search
                );
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener(
                    "click",
                    this._boundHandles.dropdownClick
                );
            }
            if (document && this._boundHandles) {
                document.removeEventListener("click", this._boundHandles.close);
            }
            if (this._header && this._boundHandles) {
                this._header.removeEventListener(
                    "keydown",
                    this._boundHandles.keydown
                );
            }
            if (this._dropdown && this._boundHandles) {
                this._dropdown.removeEventListener(
                    "keydown",
                    this._boundHandles.keydown
                );
            }
        } catch (error) {
            console.error(error);
        }

        this._container.innerHTML = "";

        var containerClasses = this._container.className.split(" ");
        var newClasses = [];
        for (var i = 0; i < containerClasses.length; i++) {
            if (containerClasses[i] !== "selectbox-container") {
                newClasses.push(containerClasses[i]);
            }
        }
        this._container.className = newClasses.join(" ");
    }
}

export { SelectBox };
