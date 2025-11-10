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
import "./categories-picker.css";

/** @typedef {import('../types.js').IconCategoryType} IconCategoryType */

class CategoriesPicker {
    #categories;
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
        /** @type {HTMLDivElement} */
        this.#categories = document.getElementById("categories");
        this.#addEventListener();
        this.#show(catalogOfIcons);
    }
    /**
     * @param {IconCategoryType[]} catalogOfIcons
     */
    #show(catalogOfIcons) {
        this.#selectedCategory = "";
        const fragment = document.createDocumentFragment();

        catalogOfIcons.forEach((categoryInfo) => {
            let id = categoryInfo.id;
            let label = categoryInfo.label;

            const categoryContainer = document.createElement("div");
            fragment.appendChild(categoryContainer);

            categoryContainer.className = "category";
            const categoryName = document.createElement("span");
            categoryContainer.appendChild(categoryName);
            categoryName.textContent = label;
            categoryName.setAttribute("data-value", id);
            categoryName.className = "category-name";

            /** ******************** */
            var el = document.createElement("span");
            el.className = "category";
            el.setAttribute("data-value", id);
            el.textContent = label;

            this.#categories?.appendChild(el);
            /*el.onclick = onStyleSelectOther();
            
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

        this.#categories?.appendChild(fragment);
    }

    reset() {
        if (this.#selectedCategory === "") {
            return;
        }
        this.#selectedCategory = "";
        this.#categories
            ?.querySelectorAll(".category.selected")
            .forEach((category) => {
                category.classList.remove("selected");
            });
    }

    /**
     * @param {() => void} callback
     */
    setOnSelectCategoryCallback(callback) {
        this.#onSelectCategoryCallback = callback;
    }

    #addEventListener() {
        /*this.#categories?.addEventListener("click", (e) => {
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
            let category = categoryName.parentElement;
            let wasSelected = category?.classList.contains("selected");

            this.#categories
                ?.querySelectorAll(".category.selected")
                .forEach((category) => {
                    category.classList.remove("selected");
                });

            if (wasSelected) {
                category?.classList.remove("selected");
                this.#selectedCategory = "";
            } else {
                category?.classList.add("selected");
                this.#selectedCategory = id;
            }
            this.#onSelectCategoryCallback(this.#selectedCategory);
        });*/
    }
}

export { CategoriesPicker };
