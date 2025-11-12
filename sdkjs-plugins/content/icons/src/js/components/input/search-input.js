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
            showClear: false,
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
            icon.innerHTML =
                '<svg width="14" height="14" viewBox="0 0 14 14" ' +
                'fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" clip-rule="evenodd" ' +
                'd="M10 5.5C10 7.98528 7.98528 10 5.5 10C3.01472 10 1 7.98528 1 5.5C1 3.01472 3.01472 1 5.5 1C7.98528 1 10 3.01472 10 5.5ZM9.01953 9.72663C8.06578 10.5217 6.83875 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0C8.53757 0 11 2.46243 11 5.5C11 6.83875 10.5217 8.06578 9.72663 9.01953L13.8536 13.1465L13.1465 13.8536L9.01953 9.72663Z" ' +
                'fill="black" fill-opacity="0.8"/>' +
                "</svg>";
            this._container.querySelector(".input-field-main")?.prepend(icon);
        }
    }
}

export { SearchInput };
