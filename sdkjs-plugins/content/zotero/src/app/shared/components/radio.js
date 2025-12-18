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
 * Custom radio button implementation
 * @class
 */
class Radio {
    /** @type {HTMLElement} */
    #container;
    /** @type {HTMLInputElement} */
    #input;
    /** @type {HTMLElement} */
    #visualRadio;
    /** @type {HTMLLabelElement | null} */
    #labelElement = null;
    /** @type {RadioOptionsType} */
    #options;
    /** @type {Map<string, function(any): void>} */
    #handlers = new Map();

    /**
     * Create a Radio instance
     * @constructor
     * @param {string | HTMLInputElement} radio
     * @param {RadioOptionsType} options
     * @throws {Error} If invalid input element
     */
    constructor(radio, options) {
        if (typeof radio === "string") {
            const temp = document.getElementById(radio);
            if (temp instanceof HTMLInputElement) {
                radio = temp;
            }
        }

        if (!(radio instanceof HTMLInputElement)) {
            throw new Error("Invalid input element");
        }
        this.#input = radio;
        this.#options = Object.assign(
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

        this.#applyInputAttributes();
        this.#container = document.createElement("div");
        this.#visualRadio = document.createElement("span");
        this.#createDOM();
        this._setupEventListeners();
        this._updateVisualState();
    }

    #applyInputAttributes() {
        this.#input.type = "radio";
        const elId = this.#input.getAttribute("id");
        const elName = this.#input.getAttribute("name");
        const elValue = this.#input.getAttribute("value");
        const elChecked = this.#input.getAttribute("checked");
        const elDisabled = this.#input.getAttribute("disabled");

        if (elId !== null) {
            this.#options.id = elId;
        } else if (this.#options.id) {
            this.#input.setAttribute("id", this.#options.id);
        }

        if (elName !== null) {
            this.#options.name = elName;
        } else if (this.#options.name) {
            this.#input.setAttribute("name", this.#options.name);
        }

        if (elValue !== null) {
            this.#options.value = elValue;
        } else if (this.#options.value) {
            this.#input.setAttribute("value", this.#options.value);
        }

        if (elChecked !== null) {
            this.#options.checked = elChecked === "true";
        } else if (this.#options.checked) {
            this.#input.setAttribute("checked", "true");
        }

        if (elDisabled !== null) {
            this.#options.disabled = elDisabled === "true";
        } else if (this.#options.disabled) {
            this.#input.setAttribute("disabled", "true");
        }

        this.#input.style.position = "absolute";
        this.#input.style.opacity = "0";
        this.#input.style.pointerEvents = "none";
    }

    #createDOM() {
        this.#container.setAttribute("role", "radio");
        this.#container.setAttribute(
            "aria-checked",
            String(!!this.#options.checked)
        );
        this.#container.setAttribute(
            "aria-disabled",
            String(!!this.#options.disabled)
        );
        this.#container.tabIndex = this.#options.disabled ? -1 : 0;

        this.#visualRadio.className = "radio__visual";
        this.#visualRadio.setAttribute("aria-hidden", "true");

        const innerCircle = document.createElement("span");
        innerCircle.className = "radio__inner-circle";
        this.#visualRadio.appendChild(innerCircle);

        if (this.#options.label) {
            this.#labelElement = document.createElement("label");
            this.#labelElement.className = "radio__label";
            this.#labelElement.htmlFor = String(this.#options.id);
            this.#labelElement.textContent = this.#options.label;
        }

        this.#container.appendChild(this.#input);
        this.#container.appendChild(this.#visualRadio);
        if (this.#labelElement) {
            this.#container.appendChild(this.#labelElement);
        }

        if (this.#options.disabled) {
            this.#container.classList.add("radio--disabled");
        }

        this._updateRadioGroupTabIndex();
    }

    /**
     * Update tabindex for radio group accessibility
     * @private
     */
    _updateRadioGroupTabIndex() {
        if (!this.#options.name) return;

        if (this.#options.checked) {
            this.#container.tabIndex = this.#options.disabled ? -1 : 0;
        } else {
            const radios = document.querySelectorAll(
                `[name="${this.#options.name}"]`
            );
            let hasChecked = false;

            radios.forEach((radio) => {
                if (
                    radio instanceof HTMLInputElement &&
                    radio.checked &&
                    radio !== this.#input
                ) {
                    hasChecked = true;
                }
            });

            if (
                !hasChecked &&
                !this.#options.checked &&
                !this.#options.disabled
            ) {
                this.#container.tabIndex = 0;
            } else {
                this.#container.tabIndex = -1;
            }
        }
    }

    /**
     * Setup event listeners
     * @private
     */
    _setupEventListeners() {
        /** @param {MouseEvent} e */
        const handleClick = (e) => {
            e.preventDefault();
            if (!this.#options.disabled && !this.#options.checked) {
                this.check();
                this.#container.focus();
            }
        };

        /** @param {KeyboardEvent} e */
        const handleKeyDown = (e) => {
            if (this.#options.disabled) return;

            switch (e.key) {
                case " ":
                case "Spacebar":
                case "Enter":
                    e.preventDefault();
                    if (!this.#options.checked) {
                        this.check();
                    }
                    break;
            }
        };

        const handleFocus = () => {
            this.#container.classList.add("radio--focused");
        };

        const handleBlur = () => {
            this.#container.classList.remove("radio--focused");
        };

        this.#handlers.set("click", handleClick);
        this.#handlers.set("keydown", handleKeyDown);
        this.#handlers.set("focus", handleFocus);
        this.#handlers.set("blur", handleBlur);

        this.#container.addEventListener("click", handleClick);
        this.#container.addEventListener("keydown", handleKeyDown);
        this.#container.addEventListener("focus", handleFocus);
        this.#container.addEventListener("blur", handleBlur);
    }

    /**
     * Update visual state based on current properties
     * @private
     */
    _updateVisualState() {
        this.#container.setAttribute(
            "aria-checked",
            String(!!this.#options.checked)
        );

        this.#container.classList.toggle(
            "radio--checked",
            this.#options.checked
        );

        this.#input.checked = !!this.#options.checked;

        this._updateRadioGroupTabIndex();
    }

    /**
     * Trigger change event
     * @private
     * @param {boolean} checked
     */
    _triggerChange(checked) {
        if (this.#options.name) {
            const event = new CustomEvent("radioChange", {
                detail: {
                    name: this.#options.name,
                    value: this.#options.value,
                    checked: checked,
                    id: this.#options.id,
                },
                bubbles: true,
            });
            this.#input.dispatchEvent(event);
        }
    }

    /**
     * Get the root DOM element
     * @returns {HTMLElement}
     */
    getElement() {
        return this.#container;
    }

    /**
     * Set radio button to checked state
     */
    check() {
        if (this.#options.disabled || this.#options.checked) return;

        if (this.#options.name) {
            const radios = document.querySelectorAll(
                `[name="${this.#options.name}"]`
            );
            radios.forEach((radio) => {
                if (
                    radio instanceof HTMLInputElement &&
                    radio !== this.#input &&
                    radio.checked
                ) {
                    radio.checked = false;
                    this.#options.checked = false;
                    this._updateVisualState();
                    this._triggerChange(false);
                }
            });
        }

        this.#options.checked = true;
        this._updateVisualState();
        this._triggerChange(true);
    }

    /**
     * Set radio button to unchecked state
     */
    uncheck() {
        if (this.#options.disabled || !this.#options.checked) return;

        this.#options.checked = false;
        this._updateVisualState();
        this._triggerChange(false);
    }

    /**
     * Enable the radio button
     */
    enable() {
        if (!this.#options.disabled) return;

        this.#options.disabled = false;
        this.#input.disabled = false;
        this.#container.setAttribute("aria-disabled", "false");

        if (this.#options.checked) {
            this.#container.tabIndex = 0;
        } else {
            this._updateRadioGroupTabIndex();
        }

        this.#container.classList.remove("radio--disabled");
    }

    /**
     * Disable the radio button
     */
    disable() {
        if (this.#options.disabled) return;

        this.#options.disabled = true;
        this.#input.disabled = true;
        this.#container.setAttribute("aria-disabled", "true");
        this.#container.tabIndex = -1;
        this.#container.classList.add("radio--disabled");
    }

    /**
     * Update radio button label
     * @param {string} label
     */
    setLabel(label) {
        this.#options.label = label;
        if (this.#labelElement) {
            this.#labelElement.textContent = label;
        } else if (label) {
            this.#labelElement = document.createElement("label");
            this.#labelElement.className = "radio__label";
            this.#labelElement.htmlFor = String(this.#options.id);
            this.#labelElement.textContent = label;
            this.#container.appendChild(this.#labelElement);
        }
    }

    /**
     * Get current radio button state
     * @returns {Object}
     */
    getState() {
        return {
            checked: this.#options.checked,
            disabled: this.#options.disabled,
            value: this.#options.value,
            name: this.#options.name,
        };
    }

    /**
     * Clean up event listeners and references
     */
    destroy() {
        this.#handlers.forEach((handler, event) => {
            this.#container.removeEventListener(event, handler);
        });
        this.#handlers.clear();

        if (this.#container && this.#container.parentNode) {
            this.#container.parentNode.removeChild(this.#container);
        }

        this.#labelElement = null;
    }
}

export { Radio };
