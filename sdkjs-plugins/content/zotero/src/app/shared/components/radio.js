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
 * @param {string | HTMLInputElement} radio
 * @param {RadioOptionsType} options
 */
function Radio(radio, options) {
    if (typeof radio === "string") {
        var temp = document.getElementById(radio);
        if (temp instanceof HTMLInputElement) {
            radio = temp;
        }
    }
    if (radio instanceof HTMLInputElement === false) {
        throw new Error("Invalid input element");
    }

    /** @type {RadioOptionsType} */
    this._options = Object.assign(
        {
            id: `radio_${Date.now()}_${Math.random()
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

    this._container = document.createElement("div");
    this._input = radio;
    this._visualRadio = document.createElement("span");

    // Event handlers map for cleanup
    this.handlers = new Map();

    this._createDOM(radio);
    this._setupEventListeners();
    this._updateVisualState();
}

Radio.prototype = /** @lends Radio.prototype */ {
    constructor: Radio,
    /**
     * @type {HTMLLabelElement | null}
     * @private
     */
    _labelElement: null,

    /**
     * @param {HTMLInputElement} radio
     * @private
     */
    _createDOM: function (radio) {
        // Create main container
        this._container.setAttribute("role", "radio");
        this._container.setAttribute(
            "aria-checked",
            String(!!this._options.checked)
        );
        this._container.setAttribute(
            "aria-disabled",
            String(!!this._options.disabled)
        );
        this._container.tabIndex = this._options.disabled ? -1 : 0;

        this._input.type = "radio";
        const elId = this._input.getAttribute("id");
        const elName = this._input.getAttribute("name");
        const elValue = this._input.getAttribute("value");
        const elChecked = this._input.getAttribute("checked");
        const elDisabled = this._input.getAttribute("disabled");
        if (elId !== null) {
            this._options.id = elId;
        } else if (this._options.id) {
            this._input.setAttribute("id", this._options.id);
        }
        if (elName !== null) {
            this._options.name = elName;
        } else if (this._options.name) {
            this._input.setAttribute("name", this._options.name);
        }
        if (elValue !== null) {
            this._options.value = elValue;
        } else if (this._options.value) {
            this._input.setAttribute("value", this._options.value);
        }
        if (elChecked !== null) {
            this._options.checked = elChecked === "true";
        } else if (this._options.checked) {
            this._input.setAttribute("checked", "true");
        }
        if (elDisabled !== null) {
            this._options.disabled = elDisabled === "true";
        } else if (this._options.disabled) {
            this._input.setAttribute("disabled", "true");
        }
        this._input.style.position = "absolute";
        this._input.style.opacity = "0";
        this._input.style.pointerEvents = "none";

        this._visualRadio.className = "radio__visual";
        this._visualRadio.setAttribute("aria-hidden", "true");

        // Create inner circle for checked state
        const innerCircle = document.createElement("span");
        innerCircle.className = "radio__inner-circle";
        this._visualRadio.appendChild(innerCircle);

        // Create label if provided
        if (this._options.label) {
            this._labelElement = document.createElement("label");
            this._labelElement.className = "radio__label";
            this._labelElement.htmlFor = String(this._options.id);
            this._labelElement.textContent = this._options.label;
        }

        // Assemble components
        this._container.appendChild(this._input);
        this._container.appendChild(this._visualRadio);
        if (this._labelElement) {
            this._container.appendChild(this._labelElement);
        }

        // Add disabled state styling
        if (this._options.disabled) {
            this._container.classList.add("radio--disabled");
        }

        // Update tabindex for radio group behavior
        this._updateRadioGroupTabIndex();
    },

    /**
     * Update tabindex for radio group accessibility
     * Only one radio in a group should be tabbable
     * @private
     */
    _updateRadioGroupTabIndex: function () {
        if (!this._options.name) return;

        if (this._options.checked) {
            this._container.tabIndex = this._options.disabled ? -1 : 0;
        } else {
            // Uncheck all other radios in the same group
            const radios = document.querySelectorAll(
                `[name="${this._options.name}"]`
            );
            let hasChecked = false;

            radios.forEach((radio) => {
                if (
                    radio instanceof HTMLInputElement &&
                    radio.checked &&
                    radio !== this._input
                ) {
                    hasChecked = true;
                }
            });

            // If no radio in group is checked, make this one tabbable
            if (
                !hasChecked &&
                !this._options.checked &&
                !this._options.disabled
            ) {
                this._container.tabIndex = 0;
            } else {
                this._container.tabIndex = -1;
            }
        }
    },

    /**
     * Set up event listeners
     * @private
     */
    _setupEventListeners: function () {
        const self = this;

        /** @param {Event} e */
        const handleClick = function (e) {
            e.preventDefault();
            if (!self._options.disabled && !self._options.checked) {
                self.check();
                self._container.focus();
            }
        };

        /** @param {KeyboardEvent} e */
        const handleKeyDown = function (e) {
            if (self._options.disabled) return;

            switch (e.key) {
                case " ":
                case "Spacebar":
                case "Enter":
                    e.preventDefault();
                    if (!self._options.checked) {
                        self.check();
                    }
                    break;
            }
        };

        // Focus handler for styling
        const handleFocus = function () {
            self._container.classList.add("radio--focused");
        };

        const handleBlur = function () {
            self._container.classList.remove("radio--focused");
        };

        // Handle radio group changes from other radios
        const handleGroupChange = function () {
            if (self._options.name) {
                self._handleExternalRadioChange();
            }
        };

        // Store handlers for cleanup
        this.handlers.set("click", handleClick);
        this.handlers.set("keydown", handleKeyDown);
        this.handlers.set("focus", handleFocus);
        this.handlers.set("blur", handleBlur);
        this.handlers.set("groupChange", handleGroupChange);

        // Attach event listeners
        this._container.addEventListener("click", handleClick);
        this._container.addEventListener("keydown", handleKeyDown);
        this._container.addEventListener("focus", handleFocus);
        this._container.addEventListener("blur", handleBlur);

        // Listen for changes in radio group
        if (this._options.name) {
            document.addEventListener("change", handleGroupChange);
        }
    },

    /**
     * Handle external radio changes in the same group
     * @private
     */
    _handleExternalRadioChange: function () {
        const radios = document.querySelectorAll(
            `[name="${this._options.name}"]`
        );
        let isChecked = false;

        radios.forEach((radio) => {
            if (
                radio instanceof HTMLInputElement &&
                radio !== this._input &&
                radio.checked
            ) {
                isChecked = true;
            }
        });

        if (isChecked && this._options.checked) {
            this.uncheck();
        }
    },

    /**
     * Update visual state based on current properties
     * @private
     */
    _updateVisualState: function () {
        // Update ARIA attributes
        this._container.setAttribute(
            "aria-checked",
            String(!!this._options.checked)
        );

        // Update visual classes
        this._container.classList.toggle(
            "radio--checked",
            this._options.checked
        );

        // Update hidden input
        this._input.checked = !!this._options.checked;

        // Update tabindex for radio group
        this._updateRadioGroupTabIndex();
    },

    /**
     * Get the root DOM element
     * @returns {HTMLElement}
     */
    getElement: function () {
        return this._container;
    },

    /**
     * Set radio button to checked state
     * Unchecks other radios in the same group
     */
    check: function () {
        if (this._options.disabled || this._options.checked) return;

        // Uncheck other radios in the same group
        if (this._options.name) {
            const radios = document.querySelectorAll(
                `[name="${this._options.name}"]`
            );
            radios.forEach((radio) => {
                if (
                    radio instanceof HTMLInputElement &&
                    radio !== this._input &&
                    radio.checked
                ) {
                    radio.checked = false;
                    const parentRadio = radio.parentNode.radioInstance;
                    if (parentRadio) {
                        parentRadio.checked = false;
                        parentRadio._updateVisualState();
                        parentRadio._triggerChange(false);
                    }
                }
            });
        }

        this._options.checked = true;
        this._updateVisualState();
        this._triggerChange(true);
    },

    /**
     * Set radio button to unchecked state
     */
    uncheck: function () {
        if (this._options.disabled || !this._options.checked) return;

        this._options.checked = false;
        this._updateVisualState();
        this._triggerChange(false);
    },

    /**
     * Enable the radio button
     */
    enable: function () {
        if (!this._options.disabled) return;

        this._options.disabled = false;
        this._input.disabled = false;
        this._container.setAttribute("aria-disabled", "false");

        // Update tabindex based on checked state
        if (this._options.checked) {
            this._container.tabIndex = 0;
        } else {
            this._updateRadioGroupTabIndex();
        }

        this._container.classList.remove("radio--disabled");
    },

    /**
     * Disable the radio button
     */
    disable: function () {
        if (this._options.disabled) return;

        this._options.disabled = true;
        this._input.disabled = true;
        this._container.setAttribute("aria-disabled", "true");
        this._container.tabIndex = -1;
        this._container.classList.add("radio--disabled");
    },

    /**
     * Update radio button label
     * @param {string} label - New label text
     */
    setLabel: function (label) {
        this._options.label = label;
        if (this._labelElement) {
            this._labelElement.textContent = label;
        } else if (label) {
            // Create label if it didn't exist
            this._labelElement = document.createElement("label");
            this._labelElement.className = "radio__label";
            this._labelElement.htmlFor = String(this._options.id);
            this._labelElement.textContent = label;
            this._container.appendChild(this._labelElement);
        }
    },

    /**
     * Get current radio button state
     * @returns {Object} - State object
     */
    getState: function () {
        return {
            checked: this._options.checked,
            disabled: this._options.disabled,
            value: this._options.value,
            name: this._options.name,
        };
    },

    /**
     * @private
     * @param {boolean} checked - Whether the radio is now checked
     */
    _triggerChange: function (checked) {
        // Dispatch custom event for radio group
        if (this._options.name) {
            const event = new CustomEvent("radioChange", {
                detail: {
                    name: this._options.name,
                    value: this._options.value,
                    checked: checked,
                    id: this._options.id,
                },
                bubbles: true,
            });
            this._input.dispatchEvent(event);
        }
    },

    /**
     * Clean up event listeners and references
     */
    destroy: function () {
        // Remove event listeners
        this.handlers.forEach((handler, event) => {
            if (event === "groupChange") {
                document.removeEventListener("change", handler);
            } else {
                this._container.removeEventListener(event, handler);
            }
        });
        this.handlers.clear();

        // Remove DOM elements
        if (this._container && this._container.parentNode) {
            this._container.parentNode.removeChild(this._container);
        }

        this._labelElement = null;
    },
};

export { Radio };
