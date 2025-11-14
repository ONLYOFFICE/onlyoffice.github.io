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

/** @typedef {import('../types.js').IconCategoryType} IconCategoryType */

import { Button } from "./button/button.js";
import "./icon-picker.css";

class IconPicker {
    /** @type {HTMLElement} */
    #container;
    #insertButton;
    /**
     * @param {Map<string, string>} map
     * @param {boolean} [needToRun]
     */
    #onSelectIconCallback = (map, needToRun) => {};
    #listOfIconNames;
    #selectedIcons;

    /**
     * Constructor
     * @param {IconCategoryType[]} catalogOfIcons
     */
    constructor(catalogOfIcons) {
        const container = document.getElementById("icons");
        if (container) {
            this.#container = container;
        } else {
            throw new Error("Icons container not found");
        }
        this.#insertButton = new Button("insertIcon");

        this.#listOfIconNames = new Set();
        this.#selectedIcons = new Map();
        this.#addEventListener();
        this.show(catalogOfIcons);
    }

    /**
     * @param {IconCategoryType[]} catalogOfIcons
     * @param {string} categoryId
     */
    show(catalogOfIcons, categoryId = "") {
        this.#listOfIconNames = new Set();
        this.#selectedIcons = new Map();

        this.#container.textContent = "";

        const fragment = document.createDocumentFragment();

        catalogOfIcons.forEach((categoryInfo) => {
            let id = categoryInfo.id;

            if (categoryId !== "" && categoryId !== id) {
                return;
            }

            categoryInfo.folders.forEach((folderName, index) => {
                let icons = categoryInfo.icons[index];
                icons.forEach((iconName) => {
                    if (this.#listOfIconNames.has(iconName)) {
                        return;
                    }
                    this.#listOfIconNames.add(iconName);
                    let img = this.#createIcon(iconName, folderName);
                    fragment.appendChild(img);
                });
            });

            this.#onChange();
        });

        this.#container.appendChild(fragment);

        if (this.#listOfIconNames.size === 0) {
            this.#container.textContent =
                "Your search didn't match any content. Please try another term.";
        }
    }

    /**
     * @param {() => void} callback
     */
    setOnSelectIconCallback(callback) {
        this.#onSelectIconCallback = callback;
    }

    #addEventListener() {
        this.#container.addEventListener("click", (e) => {
            let icon;
            const target = e.target;
            if (
                (target && target instanceof HTMLElement) ||
                target instanceof SVGElement
            ) {
                icon = target.closest(".icon");
            }
            if (!icon) {
                console.warn("icon not found");
                return;
            }

            const isModifierPressed = e.ctrlKey || e.metaKey;

            let iconId = icon.getAttribute("data-name");
            let section = icon.getAttribute("data-section");
            if (!isModifierPressed) {
                this.#unselectAll(true);
            }
            if (this.#selectedIcons.has(iconId)) {
                icon.classList.remove("selected");
                this.#selectedIcons.delete(iconId);
            } else {
                icon.classList.add("selected");
                this.#selectedIcons.set(iconId, section);
            }
            icon.setAttribute("tabindex", "0");

            this.#onChange();
        });
        this.#container.addEventListener("dblclick", (e) => {
            let icon;
            const target = e.target;
            if (
                (target && target instanceof HTMLElement) ||
                target instanceof SVGElement
            ) {
                icon = target.closest(".icon");
            }

            if (!icon) {
                console.log("icon not found");
                return;
            }
            let iconId = icon.getAttribute("data-name");
            let section = icon.getAttribute("data-section");
            icon.classList.add("selected");
            this.#selectedIcons.set(iconId, section);
            const needToRun = true;
            this.#onSelectIconCallback(this.#selectedIcons, needToRun);
        });
        this.#container.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.code === "KeyA") {
                e.preventDefault();
                this.#selectAll();
            }
            if (e.code === "Escape") {
                e.preventDefault();
                this.#unselectAll();
            }
            if (e.code === "Space") {
                const focusedIcon =
                    this.#container.querySelector(".icon:focus");
                if (focusedIcon) {
                    e.preventDefault();
                    this.#unselectAll();
                    let iconId = focusedIcon.getAttribute("data-name");
                    let section = focusedIcon.getAttribute("data-section");
                    focusedIcon.classList.add("selected");
                    this.#selectedIcons.set(iconId, section);
                    this.#onChange();
                }
            }
            if (e.code === "Enter") {
                e.preventDefault();
                if (this.#selectedIcons.size === 0) {
                    return;
                }
                const needToRun = true;
                this.#onSelectIconCallback(this.#selectedIcons, needToRun);
            }
        });
        this.#insertButton.subscribe((event) => {
            if (event.type === "button:click") {
                const needToRun = true;
                this.#onSelectIconCallback(this.#selectedIcons, needToRun);
            }
        });
    }

    #selectAll() {
        this.#container
            .querySelectorAll(".icon:not(.selected)")
            .forEach((icon) => {
                let iconId = icon.getAttribute("data-name");
                let section = icon.getAttribute("data-section");
                icon.classList.add("selected");
                this.#selectedIcons.set(iconId, section);
            });
        this.#onChange();
    }

    #unselectAll(silent = false) {
        this.#selectedIcons = new Map();
        this.#container.querySelectorAll(".icon.selected").forEach((icon) => {
            icon.classList.remove("selected");
        });
        if (silent) return;
        this.#onChange();
    }

    #onChange() {
        if (this.#selectedIcons.size === 0) {
            this.#insertButton.disable();
        } else {
            this.#insertButton.enable();
        }
        this.#onSelectIconCallback(this.#selectedIcons);
    }

    /**
     * @param {string} iconId
     * @param {string} section
     * @returns
     */
    #createIcon(iconId, section) {
        const svgNS = "http://www.w3.org/2000/svg";
        const xlinkNS = "http://www.w3.org/1999/xlink";

        const fragment = document.createDocumentFragment();
        const svg = document.createElementNS(svgNS, "svg");
        fragment.appendChild(svg);
        svg.setAttribute("class", "icon");
        svg.setAttribute("role", "img");
        svg.setAttribute("data-name", iconId);
        svg.setAttribute("data-section", section);
        svg.setAttribute("tabindex", "0");

        const title = document.createElementNS(svgNS, "title");
        svg.appendChild(title);
        title.textContent = iconId;

        const use = document.createElementNS(svgNS, "use");
        svg.appendChild(use);
        use.setAttributeNS(xlinkNS, "xlink:href", `#${iconId}`);
        use.setAttribute("href", `#${iconId}`);

        return fragment;
    }
}

export { IconPicker };
