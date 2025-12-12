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

import { InputField } from "./input/input.js";

/// <reference path="../types.js" />
/// <reference path="./input/types.js" />

class SearchFilter {
    #catalogOfIcons;
    #filteredCatalog;
    #onFilterCallback;
    input;
    #text;
    /** @type {number} */
    // @ts-ignore
    #debounceTimeout;

    /**
     * @param {IconCategoryType[]} catalogOfIcons
     */
    constructor(catalogOfIcons) {
        this.#onFilterCallback = (
            /** @type {IconCategoryType[]} */ categories
        ) => {};
        this.#filteredCatalog = catalogOfIcons;
        this.#catalogOfIcons = catalogOfIcons;
        this.#text = "";
        this.input = new InputField("searchFilter", {
            autofocus: true,
            type: "search",
            showClear: false,
            showSearchIcon: true,
        });

        this.input.subscribe((/** @type {InputEventType} */ event) => {
            if (
                event.type !== "inputfield:input" ||
                this.#text === event.detail.value
            ) {
                return;
            }
            if (this.#debounceTimeout) {
                clearTimeout(this.#debounceTimeout);
            }

            this.#debounceTimeout = setTimeout(() => {
                this.#text = event.detail.value;
                this.#onInput(event.detail.value.toLowerCase());
            }, 500);
        });
    }

    reset() {
        if (this.input.getValue() !== "") {
            const bFocusInput = false;
            this.input.clear(bFocusInput);
            this.#text = "";
            this.#filteredCatalog = this.#catalogOfIcons;
        }
    }

    /**
     * @param {() => {}} callback
     */
    setOnFilterCallback(callback) {
        this.#onFilterCallback = callback;
    }

    /**
     * @param {string} value
     */
    #onInput(value) {
        if (value === "") {
            this.#filteredCatalog = this.#catalogOfIcons;
        } else {
            this.#filteredCatalog = this.#catalogOfIcons
                .slice()
                .map((categoryInfo) => {
                    /** @type {[string[]]} */
                    let filteredIcons = [[]];

                    categoryInfo.folders.forEach((folderName, index) => {
                        let icons = categoryInfo.icons[index];
                        filteredIcons[index] = icons.filter((iconName) =>
                            iconName.toLowerCase().includes(value)
                        );
                    });

                    return { ...categoryInfo, ...{ icons: filteredIcons } };
                });
        }
        this.#onFilterCallback(this.#filteredCatalog);
    }
}

export { SearchFilter };
