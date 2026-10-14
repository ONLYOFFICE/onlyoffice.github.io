/*
 * (c) Copyright Ascensio System SIA 2010-2026
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

// A copy of sdkjs-plugin-ai/scripts/custom-actions/utils/selectBox.js, kept as close to it as possible so the plugins look and behave alike.
// Changes: a classic script instead of an ES module (no import/export).
// Not type-checked here: types/components.d.ts declares what the plugin uses of it.


/**
 * @typedef {Object} SelectboxOptionsType
 * @property {string} placeholder
 * @property {boolean} [searchable]
 * @property {boolean} [sortable]
 * @property {boolean} [multiple]
 * @property {boolean} [usePortal]
 * @property {string} [description]
 * @property {(text: string) => string} [translate]
 */

/**
 * @typedef {Object} SelectboxEventType
 * @property {string} type
 * @property {SelectboxEventDetail} detail
 */

/**
 * @typedef {Object} SelectboxEventDetail
 * @property {Array<string|number>} values
 * @property {string|number} current
 * @property {boolean} enabled
 * @property {Array<SelectboxItem>} [items]
 */

/**
 * @typedef {{ value: string, text: string, selected: boolean, disabled?: boolean }} SelectboxItem
 */

/**
 * @typedef {Object} BoundHandlesType
 * @property {(e: Event) => void} toggle
 * @property {(e: Event) => void} search
 * @property {(e: MouseEvent) => void} close
 * @property {(e: KeyboardEvent) => void} keydown
 * @property {(e: Event) => void} dropdownClick
 * @property {(e: Event) => void} scrollCheck
 */

class SelectBox {
    #arrow;
    /** @type {BoundHandlesType} */
    #boundHandles;
    /** @type {Array<SelectboxItem>} */
    #customItems;
    #dropdown;
    #header;
    /** @type {DOMRect|undefined} */
    #headerRectOnOpen;
    /** @type {HTMLElement|null} */
    #optionsContainer;
    /** @type {HTMLElement} */
    #select;
    #selectbox;
    #selectedText;
    #selectedValues;

    static #instances = new Set(); 

    /**
     * @param {string | HTMLSelectElement | HTMLElement} selectbox
     * @param {SelectboxOptionsType} options
     */
    constructor(selectbox, options) {
        if (typeof selectbox === "string") {
            const temp = document.getElementById(selectbox);
            if (temp instanceof HTMLSelectElement) {
                selectbox = temp;
            } else if (temp instanceof HTMLElement) {
                this._container = temp;
            } else {
                throw new Error("Invalid selectbox");
            }
        } else if (selectbox instanceof HTMLElement) {
            this._container = selectbox;
        }

        if (selectbox instanceof HTMLSelectElement) {
            this.#selectbox = selectbox;
            this._container = document.createElement("div");
        } else if (this._container instanceof HTMLElement === false) {
            throw new Error("Invalid container");
        }

        /** @type {SelectboxOptionsType} */
        this._options = Object.assign(options, {
            placeholder: options.placeholder || "Select...",
            searchable: options.searchable || false,
            sortable: options.sortable || false,
            translate: options.translate,
            multiple: options.multiple || false,
            usePortal: options.usePortal || false,
            description: options.description || "",
        });

        this.#selectedValues = new Set();
        this.isOpen = false;
        /** @type {Array<SelectboxItem | null>} */
        this._items = [];
        this.#customItems = [];
        /** @type {Function[]} */
        this._subscribers = [];
        this.#boundHandles = {
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
            scrollCheck: () => {
                if (!this.#headerRectOnOpen) return;
                const rect = this.#header.getBoundingClientRect();
                if (Math.abs(rect.top - this.#headerRectOnOpen.top) > 1) {
                    this.#closeDropdown();
                }
            },
        };
        this.#optionsContainer = null;
        /** @type {HTMLInputElement | null} */
        this.searchInput = null;
        this.#select = document.createElement("div");
        this.#header = document.createElement("div");
        this.#selectedText = document.createElement("span");
        this.#arrow = document.createElement("span");
        this.#dropdown = document.createElement("div");

        this.#createDOM();
        this.#bindEvents();
        this.#renderOptions();

        SelectBox.#instances.add(this);
    }

    #createDOM() {
        this._container.innerHTML = "";
        this._container.className += " selectbox-container";

        var fragment = document.createDocumentFragment();
        this.#select.className += " selectbox";
        if (this._options.multiple) {
            this.#select.className += " selectbox-multiple";
        }
        fragment.appendChild(this.#select);

        this.#header.className += " selectbox-header";
        this.#select.appendChild(this.#header);
        this.#header.setAttribute("tabindex", "0");

        this.#selectedText.className += " selectbox-selected-text i18n";
        this.#selectedText.textContent = this._options.placeholder;
        this.#header.appendChild(this.#selectedText);

        this.#arrow.className += " selectbox-arrow";
        this.#arrow.innerHTML = "<b></b>";
        this.#header.appendChild(this.#arrow);

        this.#dropdown.className += " selectbox-dropdown";
        if (this._options.usePortal) {
            this.#dropdown.className += " selectbox-fixed";
        }
        this.#select.appendChild(this.#dropdown);

        if (this._options.description) {
            var description = document.createElement("div");
            description.className += " i18n selectbox-description";
            description.textContent = this._options.description;
            this.#dropdown.appendChild(description);
        }
        if (this._options.searchable) {
            var search = document.createElement("div");
            search.className += " selectbox-search";
            this.#dropdown.appendChild(search);
            this.searchInput = document.createElement("input");
            this.searchInput.className += " selectbox-search-input";
            this.searchInput.type = "text";
            this.searchInput.placeholder = "Search...";
            search.appendChild(this.searchInput);
        }

        this.#optionsContainer = document.createElement("div");
        this.#optionsContainer.className += " selectbox-options";
        this.#dropdown.appendChild(this.#optionsContainer);

        this._container.appendChild(fragment);

        if (this.#selectbox) {
            const parent = this.#selectbox.parentNode;
            if (parent) {
                parent.insertBefore(this._container, this.#selectbox);
                const options = this.#extractOptions(this.#selectbox);
                this.addItems(options.values, options.selectedValue);
                this.#selectbox.remove();
            }
        }
    }

    #bindEvents() {
        var self = this;

        this.#header.addEventListener("click", this.#boundHandles.toggle);

        if (this.searchInput) {
            this.searchInput.addEventListener(
                "input",
                this.#boundHandles.search
            );
        }

        this.#dropdown.addEventListener(
            "click",
            this.#boundHandles.dropdownClick
        );
        this.#dropdown.addEventListener("wheel", function (e) {
            e.stopPropagation();
        });

        // Keyboard navigation
        this.#header.addEventListener("keydown", this.#boundHandles.keydown);
        this.#dropdown.addEventListener("keydown", this.#boundHandles.keydown);
    }
    /** @param {Event} [e] */
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
            document.addEventListener("click", this.#boundHandles.close);
        }
        this.isOpen = true;
        this.#dropdown.style.display = "block";
        this.#headerRectOnOpen = this.#header.getBoundingClientRect();
        document.addEventListener("scroll", this.#boundHandles.scrollCheck, true);
        this.#arrow.className += " selectbox-arrow-open";
        this.#header.className += " selectbox-header-open";
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
        this.#improvePositioning();
    }

    #closeDropdown() {
        if (this.isOpen && document && this.#boundHandles) {
            document.removeEventListener("click", this.#boundHandles.close);
            document.removeEventListener("scroll", this.#boundHandles.scrollCheck, true);
        }
        this.isOpen = false;
        this.#dropdown.style.display = "none";
        if (this._options.usePortal) {
            this.#dropdown.style.left = "";
            this.#dropdown.style.width = "";
            this.#dropdown.style.top = "";
        } else {
            this.#dropdown.classList.remove('selectbox-dropdown-top');
        }

        var arrowClasses = this.#arrow.className.split(" ");
        var newArrowClasses = [];
        for (var i = 0; i < arrowClasses.length; i++) {
            if (arrowClasses[i] !== "selectbox-arrow-open") {
                newArrowClasses.push(arrowClasses[i]);
            }
        }
        this.#arrow.className = newArrowClasses.join(" ");

        var headerClasses = this.#header.className.split(" ");
        var newHeaderClasses = [];
        for (var i = 0; i < headerClasses.length; i++) {
            if (headerClasses[i] !== "selectbox-header-open") {
                newHeaderClasses.push(headerClasses[i]);
            }
        }
        this.#header.className = newHeaderClasses.join(" ");

        if (this.searchInput) {
            this.searchInput.value = "";
        }
    }
    /** @param {Event} e */
    #handleSearch(e) {
        var target = e.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        var searchTerm = target.value.toLowerCase();
        this.#renderOptions(searchTerm);
    }
    /** @param {'up'|'down'} direction */
    #selectNextPrevItem(direction) {
        const searchTerm = this.searchInput
            ? this.searchInput.value.toLowerCase()
            : "";
        let newItem;
        let items = this._items.filter(function (item) {
            return item !== null && !item.disabled;
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
            if (this.#selectedValues.size === 0 && items.length > 0) {
                newItem = items[items.length - 1];
                this.#selectedValues.add(newItem.value);
            } else {
                var selectedArray = Array.from(this.#selectedValues);
                var currentIndex = -1;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value === selectedArray[0]) {
                        currentIndex = i;
                        break;
                    }
                }
                var prevIndex =
                    (currentIndex - 1 + items.length) % items.length;
                this.#selectedValues.clear();
                newItem = items[prevIndex];
                this.#selectedValues.add(newItem.value);
            }
        } else {
            if (this.#selectedValues.size === 0 && items.length > 0) {
                newItem = items[0];
                this.#selectedValues.add(newItem.value);
            } else {
                var selectedArray = Array.from(this.#selectedValues);
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
                this.#selectedValues.clear();
                newItem = items[nextIndex];
                this.#selectedValues.add(newItem.value);
            }
        }

        this.#updateSelectedText();
        this.#renderOptions(searchTerm, true);
        this.#triggerChange(newItem.value, true);
    }
    /** @param {KeyboardEvent} e */
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
     */
    #renderOptions(searchTerm, scrollIntoView) {
        searchTerm = searchTerm || "";
        if (!this.#optionsContainer) return;
        this.#optionsContainer.innerHTML = "";

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
            if (this.#selectedValues.has(item.value)) {
                option.className +=
                    " selectbox-option-selected checkbox--checked";
                selectedOption = option;
            }
            option.setAttribute("data-value", item.value);
            if (item.disabled) {
                option.className += " selectbox-option-disabled";
            }

            let label = document.createElement("label");
            label.className += " selectbox-option-text i18n";
            if (this._options.translate) {
                item.text = this._options.translate(item.text);
            }
            label.textContent = item.text;

            if (this._options.multiple) {
                option.className += " selectbox-option-checkbox";
                let input = document.createElement("input");
                input.type = "checkbox";
                input.id = "checkbox-" + item.value;
                input.className += " selectbox-checkbox";
                input.checked = this.#selectedValues.has(item.value);
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
        if (this.#customItems.length) {
            const hr = document.createElement("hr");
            hr.className += " selectbox-option-divider";
            fragment.appendChild(hr);
        }
        for (var i = 0; i < this.#customItems.length; i++) {
            let item = this.#customItems[i];

            let option = document.createElement("label");
            option.className += " selectbox-custom-option";
            option.setAttribute("data-value", item.value);
            option.setAttribute("for", item.value);

            var span = document.createElement("span");
            span.className += " selectbox-option-text i18n";
            if (this._options.translate) {
                item.text = this._options.translate(item.text);
            }
            span.textContent = item.text;
            option.appendChild(span);
            fragment.appendChild(option);
        }

        this.#optionsContainer.appendChild(fragment);

        if (
            scrollIntoView &&
            this.isOpen &&
            this.#optionsContainer &&
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
    /** @param {Event} e */
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
        if (option.classList.contains("selectbox-option-disabled")) return;

        let enabled = true;

        if (this._options.multiple) {
            if (this.#selectedValues.has(value)) {
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

    #updateSelectedText() {
        if (this.#selectedValues.size === 0) {
            this.#selectedText.textContent = this._options.placeholder;
            return;
        }

        if (this._options.multiple) {
            var selectedItems = [];
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                if (item && this.#selectedValues.has(item.value)) {
                    selectedItems.push(item);
                }
            }

            if (selectedItems.length === 0) {
                this.#selectedText.textContent = this._options.placeholder;
            } else if (selectedItems.length === 1) {
                this.#selectedText.textContent = selectedItems[0].text;
            } else {
                this.#selectedText.textContent =
                    selectedItems.length + " items selected";
            }
        } else {
            var selectedItem = null;
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                if (item && this.#selectedValues.has(item.value)) {
                    selectedItem = item;
                    break;
                }
            }

            this.#selectedText.textContent = selectedItem
                ? selectedItem.text
                : this._options.placeholder;
        }
    }
    #improvePositioning() {
        const viewportHeight = window.innerHeight;

        if (this._options.usePortal) {
            const headerRect = this.#header.getBoundingClientRect();
            const dropdownHeight = this.#dropdown.offsetHeight;

            this.#dropdown.style.left = headerRect.left + "px";
            this.#dropdown.style.width = (headerRect.width - 2) + "px";

            const spaceBelow = viewportHeight - headerRect.bottom;
            if (spaceBelow < dropdownHeight && headerRect.top > spaceBelow) {
                this.#dropdown.style.top = ((headerRect.top - dropdownHeight) - 2) + "px";
            } else {
                this.#dropdown.style.top = headerRect.bottom + 2 + "px";
            }
        } else {
             const dropdownRect = this.#dropdown.getBoundingClientRect();
            if (dropdownRect.bottom > viewportHeight) {
                this.#dropdown.classList.add('selectbox-dropdown-top');
            }
        }
        
    }
    /**
     * @param {string} currentValue
     * @param {boolean} enabled
     */
    #triggerChange(currentValue, enabled) {
        var values = Array.from(this.#selectedValues);
        var items = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (item && this.#selectedValues.has(item.value)) {
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
    /** @param {string} currentValue */
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
     * @param {HTMLSelectElement} selectbox
     * @returns {{values: Array<[string, string]>, selectedValue?: string}}
     */
    #extractOptions(selectbox) {
        /** @type {Array<[string, string]>} */
        const options = Array.from(selectbox.options).map((option) => {
            return [option.value, option.text];
        });
        /** @type {{values: Array<[string, string]>, selectedValue?: string}} */
        const result = { values: options };
        const selectedValue = selectbox.value;
        if (selectedValue) result.selectedValue = selectedValue;
        return result;
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
     * @param {boolean} [disabled] - shown, but out of reach of a pick
     */
    addItem(value, text, selected, disabled) {
        selected = selected || false;
        const bHasItem = this._items.some(
            (item) => item && item.value === value
        );
        if (bHasItem) {
            const item = this._items.find(
                (item) => item && item.value === value
            );
            if (item) {
                item.selected = selected;
                if (disabled !== undefined) item.disabled = !!disabled;
            }
        } else {
            this._items.push({
                value: value, text: text, selected: selected, disabled: !!disabled,
            });
            if (this._options.sortable) {
                this._items.sort((a, b) => (!!a && !!b ? a.text.localeCompare(b.text) : (!!a ? -1 : (!!b ? 1 : 0))));
            }
        }

        if (selected) {
            if (this._options.multiple) {
                this.#selectedValues.add(value);
            } else {
                this.#selectedValues.clear();
                this.#selectedValues.add(value);
            }
        }

        this.#updateSelectedText();
    }
    /**
     * @param {Array<[string, string, boolean?]>} values
     * @param {string} [selectedValue]
     */
    addItems(values, selectedValue) {
        const self = this;
        let autoSelected = false;
        values.forEach(function (pair) {
            const bHasItem = self._items.some(
                (item) => item && item.value === pair[0]
            );
            if (bHasItem) return;
            const disabled = !!pair[2];
            // with nothing asked for, the first option that can be picked is
            const isSelected = selectedValue
                ? pair[0] === selectedValue
                : (!disabled && !autoSelected);
            if (isSelected) autoSelected = true;

            if (isSelected) {
                if (self._options.multiple) {
                    self.#selectedValues.add(pair[0]);
                } else {
                    self.#selectedValues.clear();
                    self.#selectedValues.add(pair[0]);
                }
            }

            self._items.push({
                value: pair[0],
                text: pair[1],
                selected: isSelected,
                disabled: disabled,
            });
        }, this);

        if (this.isOpen) {
            this.#renderOptions();
        }

        this.#updateSelectedText();
    }
    /**
     * Replaces every item with a new list.
     * @param {Array<[string, string, boolean?]>} values
     * @param {string} [selectedValue]
     */
    setItems(values, selectedValue) {
        this._items = [];
        this.#customItems = [];
        this.#selectedValues.clear();
        this.addItems(values, selectedValue);
        this.#renderOptions();
    }
    /**
     * @param {string} value
     * @param {string} text
     */
    addCustomItem(value, text) {
        this.#customItems.push({ value: value, text: text, selected: false });
    }
    addSeparator() {
        this._items.push(null);
    }
    /** @param {string} value */
    removeItem(value) {
        this._items = this._items.filter(function (item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this.#customItems = this.#customItems.filter(function (item) {
            if (item === null || item.value !== value) {
                return true;
            }
            return false;
        });
        this.#selectedValues.delete(value);
        this.#updateSelectedText();
    }
    /** @return {null | string} */
    getSelectedValue() {
        if (this._options.multiple) {
            console.error(
                "Method getSelectedValue is only available for single-select boxes."
            );
            return null;
        } else {
            var values = Array.from(this.#selectedValues);
            return values.length > 0 ? values[0] : null;
        }
    }
    /** @return {null | string | Array<string>} */
    getSelectedValues() {
        if (this._options.multiple) {
            return Array.from(this.#selectedValues);
        } else {
            var values = Array.from(this.#selectedValues);
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
            /** @param {string} value */
            let checkMultiOption = function (value) {
                if (self.#optionsContainer) {
                    let option = self.#optionsContainer.querySelector(
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
                    if (!this.#selectedValues.has(value)) {
                        this.#selectedValues.add(value);
                        checkMultiOption(value);
                    }
                }
            } else {
                value = values;
                if (!this.#selectedValues.has(value)) {
                    this.#selectedValues.add(value);
                    checkMultiOption(value);
                }
            }
        } else if (!Array.isArray(values)) {
            value = values;
            this.#selectedValues.clear();
            this.#selectedValues.add(value);

            if (this.#optionsContainer) {
                let selectedOptions = this.#optionsContainer.querySelectorAll(
                    '.selectbox-option-selected[data-value="' + value + '"]'
                );
                selectedOptions.forEach(function (option) {
                    option.classList.remove("selectbox-option-selected");
                    option.classList.remove("checkbox--checked");
                });
                let option = this.#optionsContainer.querySelector(
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

        /** @param {string} value */
        let uncheckMultiOption = function (value) {
            if (self.#optionsContainer) {
                let option = self.#optionsContainer.querySelector(
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
                if (this.#selectedValues.has(value)) {
                    this.#selectedValues.delete(value);
                    uncheckMultiOption(value);
                }
            }
        } else {
            value = values;
            if (this.#selectedValues.has(value)) {
                this.#selectedValues.delete(value);
                uncheckMultiOption(value);
            }
        }

        this.#updateSelectedText();

        if (bSilent) {
            return;
        }

        this.#triggerChange(value, true);
    }
    /**
     * Whether the box offers this value at all.
     * @param {string} value
     * @returns {boolean}
     */
    has(value) {
        return this._items.some((item) => item && item.value === value);
    }
    /**
     * The element the box lives in — the one that took the place of the select it
     * was built from.
     * @returns {HTMLElement}
     */
    container() {
        return this._container;
    }
    /** Takes the cursor, so that a form can point at this box. */
    focus() {
        this.#header.focus();
    }
    disable() {
        this.#select.classList.add("selectbox-disabled");
    }
    enable() {
        this.#select.classList.remove("selectbox-disabled");
    }
    /** @param {boolean} bSelectFirst */
    clear(bSelectFirst) {
        bSelectFirst = bSelectFirst || false;
        this.#selectedValues.clear();
        if (bSelectFirst && this._items.length > 0) {
            var firstItem = this._items[0];
            if (firstItem) {
                this.#selectedValues.add(firstItem.value);
            }
        }
        this.#updateSelectedText();
        this.#renderOptions();
    }
    destroy() {
        this._subscribers = [];
        SelectBox.#instances.delete(this);
        try {
            if (this.#header && this.#boundHandles) {
                this.#header.removeEventListener(
                    "click",
                    this.#boundHandles.toggle
                );
            }
            if (this.searchInput && this.#boundHandles) {
                this.searchInput.removeEventListener(
                    "input",
                    this.#boundHandles.search
                );
            }
            if (this.#dropdown && this.#boundHandles) {
                this.#dropdown.removeEventListener(
                    "click",
                    this.#boundHandles.dropdownClick
                );
            }
            if (document && this.#boundHandles) {
                document.removeEventListener("click", this.#boundHandles.close);
            }
            if (this.#header && this.#boundHandles) {
                this.#header.removeEventListener(
                    "keydown",
                    this.#boundHandles.keydown
                );
            }
            if (this.#dropdown && this.#boundHandles) {
                this.#dropdown.removeEventListener(
                    "keydown",
                    this.#boundHandles.keydown
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

