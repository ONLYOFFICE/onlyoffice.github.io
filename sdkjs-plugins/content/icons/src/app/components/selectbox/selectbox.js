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

/**
 * @constructor
 * @param {string | HTMLElement} container
 * @param {SelectboxOptionsType} options
 */
function SelectBox(container, options) {
    const self = this;
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
    });

    this._selectedValues = new Set();
    this.isOpen = false;
    /** @type {Array<{ value: string, text: string, selected: boolean } | null>} */
    this._items = [];
    /** @type {Function[]} */
    this._subscribers = [];
    /** @type {BoundHandlesType} */
    this._boundHandles = {
        toggle: function (e) {
            self._toggle(e);
        },
        search: function (e) {
            self._handleSearch(e);
        },
        close: function (e) {
            if (
                e.target instanceof HTMLElement &&
                !self._container.contains(e.target) &&
                !e.target.classList.contains("selectbox-option")
            ) {
                self._closeDropdown();
            }
        },
        keydown: function (e) {
            self._handleKeydown(e);
        },
        dropdownClick: function (e) {
            self._handleDropdownClick(e);
        },
    };
    /** @type {HTMLElement|null} */
    this._optionsContainer = null;
    /** @type {HTMLInputElement | null} */
    this.searchInput = null;
    /** @type {HTMLElement} */
    this._header = document.createElement("div");
    this._selectedText = document.createElement("span");
    this._arrow = document.createElement("span");
    this._dropdown = document.createElement("div");

    this._createDOM();
    this._bindEvents();
    this._renderOptions();
}

SelectBox.prototype._createDOM = function () {
    this._container.innerHTML = "";
    this._container.className += " selectbox-container";

    var fragment = document.createDocumentFragment();
    var selectBox = document.createElement("div");
    selectBox.className += " selectbox";
    fragment.appendChild(selectBox);

    this._header.className += " selectbox-header";
    selectBox.appendChild(this._header);
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
    selectBox.appendChild(this._dropdown);

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
};

SelectBox.prototype._bindEvents = function () {
    var self = this;

    this._header.addEventListener("click", this._boundHandles.toggle);

    if (this.searchInput) {
        this.searchInput.addEventListener("input", this._boundHandles.search);
    }

    this._dropdown.addEventListener("click", this._boundHandles.dropdownClick);

    // Keyboard navigation
    this._header.addEventListener("keydown", this._boundHandles.keydown);
    this._dropdown.addEventListener("keydown", this._boundHandles.keydown);
};

/**
 * @param {Event} [e]
 */
SelectBox.prototype._toggle = function (e) {
    e && e.stopPropagation();
    this.isOpen ? this._closeDropdown() : this.openDropdown();
};

SelectBox.prototype.openDropdown = function () {
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

    this._renderOptions();
};

SelectBox.prototype._closeDropdown = function () {
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
};

/**
 * @param {Event} e
 */
SelectBox.prototype._handleSearch = function (e) {
    var target = e.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }
    var searchTerm = target.value.toLowerCase();
    this._renderOptions(searchTerm);
};

/**
 * @param {KeyboardEvent} e
 */
SelectBox.prototype._handleKeydown = function (e) {
    var key = e.key || e.keyCode;
    const items = this._items.filter(function (item) {
        return item !== null;
    });
    let newItem;

    switch (key) {
        case " ":
        case "Enter":
        case 32:
        case 13:
            e.preventDefault();
            this._toggle(e);
            break;
        case "Escape":
        case 27:
            this._closeDropdown();
            break;
        case "ArrowDown":
        case 40:
            e.preventDefault();
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
                this._selectedValues.clear();
                newItem = items[nextIndex];
                this._selectedValues.add(newItem.value);
            }
            this._updateSelectedText();
            this._renderOptions(this.searchInput ? this.searchInput.value : "");
            this._triggerChange(newItem.value, true);
            break;
        case "ArrowUp":
        case 38:
            e.preventDefault();
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
            this._updateSelectedText();
            this._renderOptions(this.searchInput ? this.searchInput.value : "");
            this._triggerChange(newItem.value, true);
            break;
        case "Tab":
        case 9:
            this._closeDropdown();
            break;
    }
};

/** @param {string} [searchTerm] */
SelectBox.prototype._renderOptions = function (searchTerm) {
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
        var item = filteredItems[i];
        if (!item) {
            const hr = document.createElement("hr");
            hr.className += " selectbox-option-divider";
            fragment.appendChild(hr);
            continue;
        }
        var option = document.createElement("div");
        option.className += " selectbox-option";
        if (this._selectedValues.has(item.value)) {
            option.className += " selectbox-option-selected";
            selectedOption = option;
        }
        option.setAttribute("data-value", item.value);

        if (this._options.multiple) {
            var input = document.createElement("input");
            input.type = "checkbox";
            input.className += " selectbox-checkbox";
            input.checked = this._selectedValues.has(item.value);
            option.appendChild(input);
        }

        var span = document.createElement("span");
        span.className += " selectbox-option-text";
        span.textContent = item.text;
        option.appendChild(span);
        fragment.appendChild(option);
    }

    this._optionsContainer.appendChild(fragment);

    if (this.isOpen && this._optionsContainer && selectedOption) {
        try {
            if (selectedOption.scrollIntoView) {
                selectedOption.scrollIntoView({ block: "nearest" });
            }
        } catch (err) {
            console.error(err);
        }
    }
};

/**
 * @param {Event} e
 */
SelectBox.prototype._handleDropdownClick = function (e) {
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
        this._closeDropdown();
    }

    this._updateSelectedText();

    this._triggerChange(value, enabled);
};

SelectBox.prototype._updateSelectedText = function () {
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
};

/**
 * @param {string} currentValue
 * @param {boolean} enabled
 */
SelectBox.prototype._triggerChange = function (currentValue, enabled) {
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
};

/**
 * @param {function(SelectboxEventType): void} callback
 * @returns {Object}
 */
SelectBox.prototype.subscribe = function (callback) {
    var self = this;
    this._subscribers.push(callback);

    return {
        unsubscribe: function () {
            self._subscribers = self._subscribers.filter(function (cb) {
                return cb !== callback;
            });
        },
    };
};

/**
 * @param {string} value
 * @param {string} text
 * @param {boolean} selected
 */
SelectBox.prototype.addItem = function (value, text, selected) {
    selected = selected || false;
    this._items.push({ value: value, text: text, selected: selected });

    if (selected) {
        if (this._options.multiple) {
            this._selectedValues.add(value);
        } else {
            this._selectedValues.clear();
            this._selectedValues.add(value);
        }
    }

    this._updateSelectedText();
};

/**
 * @param {Array<[string,string]>} values
 * @param {string} [selectedValue]
 */
SelectBox.prototype.addItems = function (values, selectedValue) {
    const self = this;
    values.forEach(function (pair, index) {
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

    this._updateSelectedText();
};

SelectBox.prototype.addSeparator = function () {
    this._items.push(null);
};

/**
 * @param {string} value
 */
SelectBox.prototype.removeItem = function (value) {
    this._items = this._items.filter(function (item) {
        if (item === null || item.value !== value) {
            return true;
        }
        return false;
    });
    this._selectedValues.delete(value);
    this._updateSelectedText();
};

/**
 * @return {null | string}
 */
SelectBox.prototype.getSelectedValue = function () {
    if (this._options.multiple) {
        console.error(
            "Method getSelectedValue is only available for single-select boxes."
        );
        return null;
    } else {
        var values = Array.from(this._selectedValues);
        return values.length > 0 ? values[0] : null;
    }
};

/**
 * @return {null | string | Array<string>}
 */
SelectBox.prototype.getSelectedValues = function () {
    if (this._options.multiple) {
        return Array.from(this._selectedValues);
    } else {
        var values = Array.from(this._selectedValues);
        return values.length > 0 ? values[0] : null;
    }
};

/**
 * @param {string | Array<string>} value
 */
SelectBox.prototype.setSelectedValues = function (value) {
    if (this._options.multiple && Array.isArray(value)) {
        this._selectedValues = new Set(value);
    } else {
        this._selectedValues = new Set([value]);
    }
    this._updateSelectedText();
    this._renderOptions();
};

/**
 * @param {string | Array<string>} values
 * @param {boolean} [bSilent]
 */
SelectBox.prototype.selectItems = function (values, bSilent) {
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
            });
            let option = this._optionsContainer.querySelector(
                '[data-value="' + value + '"]'
            );

            if (option) {
                option.classList.add("selectbox-option-selected");
            }
        }
        this._closeDropdown();
    }

    this._updateSelectedText();

    if (bSilent) {
        return;
    }

    this._triggerChange(value, true);
};

/**
 * @param {string | Array<string>} values
 * @param {boolean} [bSilent]
 */
SelectBox.prototype.unselectItems = function (values, bSilent) {
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
                let checkbox = option.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox instanceof HTMLInputElement) {
                    checkbox.checked = false;
                }
                option.classList.remove("selectbox-option-selected");
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

    this._updateSelectedText();

    if (bSilent) {
        return;
    }

    this._triggerChange(value, true);
};

/**
 * @param {boolean} bSelectFirst
 */
SelectBox.prototype.clear = function (bSelectFirst) {
    bSelectFirst = bSelectFirst || false;
    this._selectedValues.clear();
    if (bSelectFirst && this._items.length > 0) {
        var firstItem = this._items[0];
        if (firstItem) {
            this._selectedValues.add(firstItem.value);
        }
    }
    this._updateSelectedText();
    this._renderOptions();
};

SelectBox.prototype.destroy = function () {
    this._subscribers = [];

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
};
export { SelectBox };
