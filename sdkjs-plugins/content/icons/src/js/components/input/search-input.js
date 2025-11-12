// @ts-check

import { InputField } from "./input.js";

/** @typedef {import('./options-type.js').InputOptionsType} InputOptionsType */

class SearchInput extends InputField {
    /**
     * @param {string|HTMLElement} container
     * @param {InputOptionsType} options
     */
    constructor(container, options = {}) {
        super(container, {
            type: "search",
            showClear: true,
            showSearchIcon: true,
            ...options,
        });
    }

    _createDOM() {
        super._createDOM();
        this._container.classList.add("input-field-search");

        if (this._options.showSearchIcon) {
            const icon = document.createElement("span");
            icon.className = "input-field-search-icon";
            icon.innerHTML = "🔍";
            icon.style.position = "absolute";
            icon.style.left = "12px";
            icon.style.top = "50%";
            icon.style.transform = "translateY(-50%)";
            icon.style.color = "#c0c4cc";

            this._container.querySelector(".input-field-main")?.prepend(icon);
            this.input.style.paddingLeft = "36px";
        }
    }
}

export { SearchInput };
