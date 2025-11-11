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
import { SelectBox } from "./selectbox/selectbox.js";
import "./categories-picker.css";

/** @typedef {import('../types.js').IconCategoryType} IconCategoryType */

class CategoriesPicker {
    #categories;
    #input;
    /**
     * @param {string} category
     */
    #onSelectCategoryCallback = (category) => {};
    #selectedCategory = "";

    /**
     * Constructor
     * @param {IconCategoryType[]} catalogOfIcons
     */
    constructor(catalogOfIcons) {
        const categories = new SelectBox("categorySelectList", {
            placeholder: "Loading...",
        });
        const input = document.getElementById("categorySelect");
        if (input instanceof HTMLInputElement === false) {
            throw new Error("categorySelect not found");
        }

        /** @type {HTMLDivElement} */
        this.#categories = categories;
        /** @type {HTMLInputElement} */
        this.#input = input;

        this.#addEventListener();
        this.#show(catalogOfIcons);
    }

    #initSelectBox() {
        const holder = this.#input?.parentElement;
        const arrow = document.createElement("span");
        arrow.classList.add("selectArrow");
        arrow.appendChild(document.createElement("span"));
        arrow.appendChild(document.createElement("span"));
        holder?.appendChild(arrow);

        const list = holder?.querySelector(".selectList");
        if (!list) {
            console.error("selectList not found");
            return;
        }

        const toggle = function () {
            list.classList.toggle("hidden");
            return true;
        };

        this.#input.onclick = toggle;
        arrow.onclick = toggle;
    }

    /**
     * @param {IconCategoryType[]} catalogOfIcons
     */
    #show(catalogOfIcons) {
        this.#selectedCategory = "";
        this.#categories.addItem("", "All");
        catalogOfIcons.forEach((categoryInfo) => {
            this.#categories.addItem(categoryInfo.id, categoryInfo.label);
        });

        return;
        const fragment = document.createDocumentFragment();
        const el = document.createElement("span");
        el.className = "category-name";
        el.setAttribute("data-value", "");
        el.textContent = "All";
        fragment.appendChild(el);
        this.#input.value = "All";

        catalogOfIcons.forEach((categoryInfo) => {
            const el = document.createElement("span");
            el.className = "category-name";
            el.setAttribute("data-value", categoryInfo.id);
            el.textContent = categoryInfo.label;
            fragment.appendChild(el);
            /*
            if (json[i].name == lastStyle) {
                el.setAttribute("selected", "");
                selectInput(
                    elements.styleSelect,
                    el,
                    elements.styleSelectList,
                    false
                );
            }*/
        });

        this.#categories.appendChild(fragment);
    }

    reset() {
        if (this.#selectedCategory === "") {
            return;
        }
        this.#selectedCategory = "";
        this.#categories.clear();
    }

    /**
     * @param {() => void} callback
     */
    setOnSelectCategoryCallback(callback) {
        this.#onSelectCategoryCallback = callback;
    }

    #addEventListener() {
        /*window.addEventListener("click", (e) => {
            if (
                e.target instanceof HTMLElement === false ||
                !e.target.closest(".selectHolder")
            ) {
                this.#categories.classList.add("hidden");
            }
        });*/
        /*this.#categories.addEventListener("click", (e) => {
            console.log("click inside categories");
            let categoryName;

            const target = e.target;
            if (target && target instanceof HTMLElement) {
                categoryName = target.closest(".category-name");
            }

            if (!categoryName) {
                return;
            }
            let id = categoryName.getAttribute("data-value");
            if (typeof id !== "string") {
                id = "";
            }

            this.#categories
                .querySelectorAll(".selected")
                .forEach((category) => {
                    category.classList.remove("selected");
                });

            categoryName?.classList.add("selected");
            this.#selectedCategory = id;
            this.#input.value = categoryName.textContent;

            this.#onSelectCategoryCallback(this.#selectedCategory);
            this.#categories.classList.add("hidden");
        });*/
    }
}

export { CategoriesPicker };
