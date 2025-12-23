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
 * @constructor
 * @param {string | HTMLInputElement} checkbox
 * @param {CheckboxOptionsType} options
 */
function Checkbox(checkbox, options) {
    if (typeof checkbox === "string") {
        var temp = document.getElementById(checkbox);
        if (temp instanceof HTMLInputElement) {
            checkbox = temp;
        }
    }
    if (checkbox instanceof HTMLInputElement === false) {
        throw new Error("Invalid input element");
    }

    /** @type {CheckboxOptionsType} */
    this._options = Object.assign(
        {
            id: `checkbox_${Date.now()}_${Math.random()
                .toString(36)
                .slice(2, 11)}`,
            checked: false,
            disabled: false,
            indeterminate: false,
            label: "",
            name: "",
            value: "on",
        },
        options
    );

    this._options.disabled = options.disabled || false;

    this._handlers = new Map();

    // Initialize component
    this._createDOM(checkbox);
    this._setupEventListeners();
    this._updateVisualState();
    /** @type {Function[]} */
    this._subscribers = [];
}

Checkbox.prototype = {
    constructor: Checkbox,

    /**
     * @type {HTMLDivElement | null}
     * @private
     */
    // @ts-ignore
    _container: null,
    /**
     * @type {HTMLInputElement | null}
     */
    _input: null,
    /**
     * @type {null | HTMLSpanElement}
     * @private
     */
    _visualCheckbox: null,
    /**
     * @type {null | HTMLLabelElement}
     * @private
     */
    _labelElement: null,

    /**
     * @param {HTMLInputElement} checkbox
     * @private
     */
    _createDOM: function (checkbox) {
        var parent = checkbox.parentNode;
        var fragment = document.createDocumentFragment();
        this._container = document.createElement("div");

        fragment.appendChild(this._container);
        this._container.classList.add("checkbox-container");
        this._container.setAttribute("role", "checkbox");
        this._container.setAttribute(
            "aria-checked",
            this._options.checked ? "true" : "false"
        );
        this._container.setAttribute(
            "aria-disabled",
            this._options.disabled ? "true" : "false"
        );
        this._container.tabIndex = this._options.disabled ? -1 : 0;

        this._input = checkbox;
        const elId = this._input.getAttribute("id");
        if (elId !== null) {
            this._options.id = elId;
        } else if (this._options.id) {
            this._input.setAttribute("id", this._options.id);
        }
        this._input.type = "checkbox";

        if (this._options.name) {
            this._input.name = this._options.name;
        }
        if (this._options.value) {
            this._input.value = this._options.value;
        }
        this._input.checked = !!this._options.checked;
        if (this._options.disabled) {
            this._input.disabled = true;
        }
        if (this._options.indeterminate) {
            this._input.indeterminate = true;
        }

        // Create visual checkbox element
        this._visualCheckbox = document.createElement("span");
        this._visualCheckbox.className = "checkbox-visual";
        this._visualCheckbox.setAttribute("aria-hidden", "true");

        // Create SVG checkmark
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
        this._visualCheckbox.appendChild(checkmarkSVG);

        // Create indeterminate line
        const indeterminateLine = document.createElement("span");
        indeterminateLine.className = "checkbox-indeterminate";
        this._visualCheckbox.appendChild(indeterminateLine);

        // Create label if provided
        if (this._options.label) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label i18n";
            if (this._options.id) this._labelElement.htmlFor = this._options.id;
            this._labelElement.textContent = this._options.label;
            if (this._options.title) {
                this._labelElement.setAttribute("title", this._options.label);
            }
        }

        // Add disabled state styling
        if (this._options.disabled) {
            this._container.classList.add("checkbox--disabled");
        }
        if (parent) {
            parent.insertBefore(fragment, checkbox);
        }
        this._container.appendChild(this._input);
        this._container.appendChild(this._visualCheckbox);
        if (this._labelElement) {
            this._container.appendChild(this._labelElement);
        }
    },

    /**
     * Set up event listeners
     * @private
     */
    _setupEventListeners: function () {
        const self = this;
        if (!this._container) return;

        /**
         * @param {MouseEvent} e
         */
        const handleClick = function (e) {
            e.preventDefault();
            if (!self._options.disabled && self._container) {
                self.toggle();
                self._container.focus();
            }
        };

        /**
         *
         * @param {KeyboardEvent} e
         * @returns
         */
        const handleKeyDown = function (e) {
            if (self._options.disabled) return;

            switch (e.key) {
                case " ":
                case "Spacebar":
                case "Enter":
                    e.preventDefault();
                    self.toggle();
                    break;
                case "ArrowRight":
                case "ArrowDown":
                    e.preventDefault();
                    if (
                        !self._options.checked &&
                        !self._options.indeterminate
                    ) {
                        self._options.checked
                            ? self.setIndeterminate()
                            : self.check();
                    }
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    if (self._options.checked || self._options.indeterminate) {
                        self._options.indeterminate
                            ? self.uncheck()
                            : self.setIndeterminate();
                    }
                    break;
            }
        };

        // Focus handler for styling
        const handleFocus = function () {
            if (!self._container) return;
            self._container.classList.add("checkbox--focused");
        };

        const handleBlur = function () {
            if (!self._container) return;
            self._container.classList.remove("checkbox--focused");
        };

        // Store handlers for cleanup
        this._handlers.set("click", handleClick);
        this._handlers.set("keydown", handleKeyDown);
        this._handlers.set("focus", handleFocus);
        this._handlers.set("blur", handleBlur);

        // Attach event listeners
        this._container.addEventListener("click", handleClick);
        this._container.addEventListener("keydown", handleKeyDown);
        this._container.addEventListener("focus", handleFocus);
        this._container.addEventListener("blur", handleBlur);
    },

    /**
     * Update visual state based on current properties
     * @private
     */
    _updateVisualState: function () {
        if (!this._container || !this._input) return;
        this._container.setAttribute(
            "aria-checked",
            this._options.indeterminate
                ? "mixed"
                : String(this._options.checked)
        );

        // Update visual classes
        this._container.classList.toggle(
            "checkbox--checked",
            this._options.checked
        );
        this._container.classList.toggle(
            "checkbox--indeterminate",
            this._options.indeterminate
        );

        // Update hidden input
        this._input.checked = !!this._options.checked;
        this._input.indeterminate = !!this._options.indeterminate;
    },

    /**
     * Toggle checkbox state
     * @returns {boolean} - New checked state
     */
    toggle: function () {
        if (this._options.disabled) return !!this._options.checked;

        if (this._options.indeterminate) {
            this._options.indeterminate = false;
            this._options.checked = true;
        } else {
            this._options.checked = !this._options.checked;
        }

        this._updateVisualState();
        this._triggerChange();

        return this._options.checked;
    },

    /**
     * Set checkbox to checked state
     * @param {boolean} [bSilent]
     */
    check: function (bSilent) {
        if (
            this._options.disabled ||
            (this._options.checked && !this._options.indeterminate)
        )
            return;

        this._options.checked = true;
        this._options.indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },

    /**
     * Set checkbox to unchecked state
     * @param {boolean} [bSilent]
     */
    uncheck: function (bSilent) {
        if (
            this._options.disabled ||
            (!this._options.checked && !this._options.indeterminate)
        )
            return;

        this._options.checked = false;
        this._options.indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },

    /**
     * Set checkbox to indeterminate state
     */
    setIndeterminate: function () {
        if (this._options.disabled || this._options.indeterminate) return;

        this._options.indeterminate = true;
        this._updateVisualState();
        this._triggerChange();
    },

    /**
     * Enable the checkbox
     */
    enable: function () {
        if (!this._options.disabled || !this._container || !this._input) return;

        this._options.disabled = false;
        this._input.disabled = false;
        this._container.setAttribute("aria-disabled", "false");
        this._container.tabIndex = 0;
        this._container.classList.remove("checkbox--disabled");
    },

    /**
     * Disable the checkbox
     */
    disable: function () {
        if (this._options.disabled || !this._container || !this._input) return;

        this._options.disabled = true;
        this._input.disabled = true;
        this._container.setAttribute("aria-disabled", "true");
        this._container.tabIndex = -1;
        this._container.classList.add("checkbox--disabled");
    },

    /**
     * Update checkbox label
     * @param {string} label - New label text
     */
    setLabel: function (label) {
        this._options.label = label;
        if (this._labelElement) {
            this._labelElement.textContent = label;
        } else if (label && this._container) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label";
            if (this._options.id) this._labelElement.htmlFor = this._options.id;
            this._labelElement.textContent = label;
            this._container.appendChild(this._labelElement);
        }
        if (this._options.title && this._labelElement) {
            this._labelElement.setAttribute("title", label);
        }
    },

    /**
     * Get current checkbox state
     * @returns {{value: string, disabled: boolean, checked: boolean}} - State object
     */
    getState: function () {
        if (this._input) {
            return {
                checked: this._input.checked,
                disabled: this._input.disabled,
                value: this._input.value,
            };
        }
        return {
            checked: false,
            disabled: false,
            value: "",
        };
    },

    /**
     * @param {function(CheckboxEventType): void} callback
     * @returns {Object}
     */
    subscribe: function (callback) {
        var self = this;
        this._subscribers.push(callback);

        return {
            unsubscribe: function () {
                self._subscribers = self._subscribers.filter(function (cb) {
                    return cb !== callback;
                });
            },
        };
    },

    /**
     * @param {Event} [e]
     * @private
     */
    _triggerChange: function (e) {
        var detail = this.getState();
        /** @type {CheckboxEventType} */

        const objEvent = {
            type: "checkbox:change",
            detail: detail,
        };

        if (e) {
            objEvent.originalEvent = e;
        }

        this._subscribers.forEach(function (cb) {
            cb(objEvent);
        });
    },

    /**
     * Clean up event listeners and references
     */
    destroy: function () {
        this._subscribers = [];
        this._handlers.forEach((handler, event) => {
            this._container &&
                this._container.removeEventListener(event, handler);
        });
        this._handlers.clear();

        if (this._container && this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
        }

        this._container = null;
        this._input = null;
        this._visualCheckbox = null;
        this._labelElement = null;
    },
};

export { Checkbox };
