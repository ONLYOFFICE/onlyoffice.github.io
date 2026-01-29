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
    /** @type {Map<string, Array<Radio>>} */
    static #instances = new Map();

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
    /** @type {Function[]} */
    #subscribers = [];

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
        this.#setupEventListeners();
        this.#updateVisualState();

        if (!this.#options.name) {
            throw new Error("Name attribute is required");
        }

        let sameNameInstances = Radio.#instances.get(this.#options.name);
        if (!sameNameInstances) {
            sameNameInstances = new Array();
            Radio.#instances.set(this.#options.name, sameNameInstances);
        }
        sameNameInstances.push(this);
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
    }

    #createDOM() {
        const parent = this.#input.parentNode;
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.#container);
        this.#container.classList.add("radio-button-container");
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

        this.#visualRadio.className = "radio-visual";
        this.#visualRadio.setAttribute("aria-hidden", "true");

        if (this.#options.label) {
            this.#labelElement = document.createElement("label");
            this.#labelElement.className = "i18n radio-label";
            this.#labelElement.htmlFor = String(this.#options.id);
            this.#labelElement.textContent = this.#options.label;
        }

        if (this.#options.disabled) {
            this.#container.classList.add("radio--disabled");
        }

        if (parent) {
            parent.insertBefore(fragment, this.#input);
        }
        this.#container.appendChild(this.#input);
        this.#container.appendChild(this.#visualRadio);
        if (this.#labelElement) {
            this.#container.appendChild(this.#labelElement);
        }

        this.#updateRadioGroupTabIndex();
    }

    #updateRadioGroupTabIndex() {
        if (this.#options.checked) {
            this.#container.tabIndex = this.#options.disabled ? -1 : 0;
        } else if (
            this.#options.name &&
            Radio.#instances.has(this.#options.name)
        ) {
            const radios = Radio.#instances.get(this.#options.name);
            let hasChecked = false;

            radios &&
                radios.forEach((radio) => {
                    if (radio.#options.checked && radio !== this) {
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

    #setupEventListeners() {
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

    #updateVisualState() {
        this.#container.setAttribute(
            "aria-checked",
            String(!!this.#options.checked)
        );

        this.#container.classList.toggle(
            "radio--checked",
            this.#options.checked
        );

        this.#input.checked = !!this.#options.checked;

        this.#updateRadioGroupTabIndex();
    }

    /** @param {Event} [e] */
    #triggerChange(e) {
        var detail = this.getState();
        /** @type {RadioEventType} */
        const objEvent = {
            type: "radio:change",
            detail: detail,
        };

        if (e) {
            objEvent.originalEvent = e;
        }

        this.#subscribers.forEach(function (cb) {
            cb(objEvent);
        });
    }

    /**
     * @param {function(RadioEventType): void} callback
     * @returns {Object}
     */
    subscribe(callback) {
        var self = this;
        this.#subscribers.push(callback);

        return {
            unsubscribe: function () {
                self.#subscribers = self.#subscribers.filter(function (cb) {
                    return cb !== callback;
                });
            },
        };
    }

    /**
     * @returns {HTMLElement}
     */
    getElement() {
        return this.#container;
    }

    /** @param {boolean} [bSilent] */
    check(bSilent) {
        if (this.#options.disabled || this.#options.checked) return;

        if (this.#options.name) {
            const radios = Radio.#instances.get(this.#options.name);
            radios &&
                radios.forEach((radio) => {
                    if (radio !== this && radio.#options.checked) {
                        radio.uncheck();
                    }
                });
        }

        this.#options.checked = true;
        this.#updateVisualState();
        if (bSilent) return;
        this.#triggerChange();
    }

    /** @param {boolean} [bSilent] */
    uncheck(bSilent) {
        if (this.#options.disabled || !this.#options.checked) return;

        this.#options.checked = false;
        this.#updateVisualState();
        if (bSilent) return;
        this.#triggerChange();
    }

    enable() {
        if (!this.#options.disabled) return;

        this.#options.disabled = false;
        this.#input.disabled = false;
        this.#container.setAttribute("aria-disabled", "false");

        if (this.#options.checked) {
            this.#container.tabIndex = 0;
        } else {
            this.#updateRadioGroupTabIndex();
        }

        this.#container.classList.remove("radio--disabled");
    }

    disable() {
        if (this.#options.disabled) return;

        this.#options.disabled = true;
        this.#input.disabled = true;
        this.#container.setAttribute("aria-disabled", "true");
        this.#container.tabIndex = -1;
        this.#container.classList.add("radio--disabled");
    }

    /** @param {string} label */
    setLabel(label) {
        this.#options.label = label;
        if (this.#labelElement) {
            this.#labelElement.textContent = label;
        } else if (label) {
            this.#labelElement = document.createElement("label");
            this.#labelElement.className = "radio-label";
            this.#labelElement.htmlFor = String(this.#options.id);
            this.#labelElement.textContent = label;
            this.#container.appendChild(this.#labelElement);
        }
    }

    /** @returns {{checked: boolean, disabled: boolean, value: string, name: string}}} */
    getState() {
        return {
            checked: !!this.#options.checked,
            disabled: !!this.#options.disabled,
            value: this.#options.value || "",
            name: this.#options.name || "",
        };
    }

    destroy() {
        this.#subscribers = [];
        if (!this.#options.name) return;
        let sameNameInstances = Radio.#instances.get(this.#options.name);
        if (sameNameInstances) {
            const index = sameNameInstances.indexOf(this);
            if (index >= 0) sameNameInstances.splice(index, 1);
        }
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
