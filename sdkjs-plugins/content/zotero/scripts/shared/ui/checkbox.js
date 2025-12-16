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
    this.id =
        options.id ||
        `checkbox_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    this._checked = options.checked || false;
    this._disabled = options.disabled || false;
    this._indeterminate = options.indeterminate || false;
    this._label = options.label || "";
    this._name = options.name || "";
    this._value = options.value || "on";

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
        this._container.classList.add("checkbox");
        this._container.setAttribute("role", "checkbox");
        this._container.setAttribute(
            "aria-checked",
            this._checked ? "true" : "false"
        );
        this._container.setAttribute(
            "aria-disabled",
            this._disabled ? "true" : "false"
        );
        this._container.tabIndex = this._disabled ? -1 : 0;

        this._input = checkbox;
        this._input.type = "checkbox";
        this._input.id = this.id;
        this._input.name = this._name;
        this._input.value = this._value;
        this._input.checked = this._checked;
        this._input.disabled = this._disabled;
        this._input.indeterminate = this._indeterminate;

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
        if (this._label) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label i18n";
            this._labelElement.htmlFor = this.id;
            this._labelElement.textContent = this._label;
        }

        // Add disabled state styling
        if (this._disabled) {
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
            if (!self._disabled && self._container) {
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
            if (self._disabled) return;

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
                    if (!self._checked && !self._indeterminate) {
                        self._checked ? self.setIndeterminate() : self.check();
                    }
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    e.preventDefault();
                    if (self._checked || self._indeterminate) {
                        self._indeterminate
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
            this._indeterminate ? "mixed" : this._checked.toString()
        );

        // Update visual classes
        this._container.classList.toggle("checkbox--checked", this._checked);
        this._container.classList.toggle(
            "checkbox--indeterminate",
            this._indeterminate
        );

        // Update hidden input
        this._input.checked = this._checked;
        this._input.indeterminate = this._indeterminate;
    },

    /**
     * Toggle checkbox state
     * @returns {boolean} - New checked state
     */
    toggle: function () {
        if (this._disabled) return this._checked;

        if (this._indeterminate) {
            this._indeterminate = false;
            this._checked = true;
        } else {
            this._checked = !this._checked;
        }

        this._updateVisualState();
        this._triggerChange();

        return this._checked;
    },

    /**
     * Set checkbox to checked state
     * @param {boolean} [bSilent]
     */
    check: function (bSilent) {
        if (this._disabled || (this._checked && !this._indeterminate)) return;

        this._checked = true;
        this._indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },

    /**
     * Set checkbox to unchecked state
     * @param {boolean} [bSilent]
     */
    uncheck: function (bSilent) {
        if (this._disabled || (!this._checked && !this._indeterminate)) return;

        this._checked = false;
        this._indeterminate = false;
        this._updateVisualState();
        if (!bSilent) this._triggerChange();
    },

    /**
     * Set checkbox to indeterminate state
     */
    setIndeterminate: function () {
        if (this._disabled || this._indeterminate) return;

        this._indeterminate = true;
        this._updateVisualState();
        this._triggerChange();
    },

    /**
     * Enable the checkbox
     */
    enable: function () {
        if (!this._disabled || !this._container || !this._input) return;

        this._disabled = false;
        this._input.disabled = false;
        this._container.setAttribute("aria-disabled", "false");
        this._container.tabIndex = 0;
        this._container.classList.remove("checkbox--disabled");
    },

    /**
     * Disable the checkbox
     */
    disable: function () {
        if (this._disabled || !this._container || !this._input) return;

        this._disabled = true;
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
        this._label = label;
        if (this._labelElement) {
            this._labelElement.textContent = label;
        } else if (label && this._container) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "checkbox-label";
            this._labelElement.htmlFor = this.id;
            this._labelElement.textContent = label;
            this._container.appendChild(this._labelElement);
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
