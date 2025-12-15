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

/// <reference path="../types.js" />

import { Button } from "./button/button.js";

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
        this.#insertButton = new Button("insertIcon", {
            disabled: true,
        });

        this.#listOfIconNames = new Set();
        this.#selectedIcons = new Map();
        this.#addEventListener();
    }

    /**
     * @param {IconCategoryType[]} foundIcons
     * returns {Promise<boolean>}
     */
    showFound(foundIcons) {
        return new Promise((resolve) => {
            this.#unselectAll(true);
            this.#hideAll();
            let displayedIcons = 0;

            setTimeout(() => {
                foundIcons.forEach((categoryInfo) => {
                    categoryInfo.folders.forEach((folderName, index) => {
                        let icons = categoryInfo.icons[index];
                        icons.forEach((iconName) => {
                            const iconElement = this.#container.querySelector(
                                `.icon[data-name="${iconName}"][data-section="${folderName}"]`
                            );
                            if (iconElement) {
                                let currentClass =
                                    iconElement.getAttribute("class") || "";
                                currentClass = currentClass
                                    .replace(
                                        new RegExp(
                                            "\\b" + "hidden" + "\\b",
                                            "g"
                                        ),
                                        ""
                                    )
                                    .trim();
                                iconElement.setAttribute("class", currentClass);
                                displayedIcons++;
                            }
                        });
                    });
                });

                this.#onChange();

                const noIconsElement = document.getElementById("noIcons");
                if (noIconsElement) {
                    if (displayedIcons === 0) {
                        noIconsElement.style.display = "block";
                    } else {
                        noIconsElement.style.display = "none";
                    }
                }

                resolve(true);
            }, 0);
        });
    }

    /**
     * @param {string} [categoryId]
     * returns {Promise<boolean>}
     */
    showCategory(categoryId = "") {
        return new Promise((resolve) => {
            this.#unselectAll(true);

            setTimeout(() => {
                const icons = this.#container.getElementsByClassName("icon");
                for (let i = 0; i < icons.length; i++) {
                    let icon = icons[i];
                    let category = icon.getAttribute("data-category");
                    let currentClass = icon.getAttribute("class") || "";
                    if (categoryId === "" || category === categoryId) {
                        currentClass = currentClass
                            .replace(
                                new RegExp("\\b" + "hidden" + "\\b", "g"),
                                ""
                            )
                            .trim();
                        icon.setAttribute("class", currentClass);
                    } else {
                        if (currentClass.indexOf("hidden") === -1) {
                            icon.setAttribute(
                                "class",
                                currentClass +
                                    (currentClass ? " " : "") +
                                    "hidden"
                            );
                        }
                    }
                }

                this.#onChange();
                resolve(true);
            }, 0);
        });
    }

    /**
     * @param {() => void} callback
     */
    setOnSelectIconCallback(callback) {
        this.#onSelectIconCallback = callback;
    }

    /**
     * @return {Array<string>}
     */
    getSelectedSvgIcons() {
        const icons = this.#container.querySelectorAll(".icon.selected");

        const serializer = new XMLSerializer();
        return Array.from(icons).map((svg) =>
            serializer.serializeToString(svg)
        );
    }

    #addEventListener() {
        this.#container.addEventListener("click", (e) => {
            let icon;
            const target = e.target;
            if (
                !target ||
                (target instanceof HTMLElement === false &&
                    target instanceof SVGElement === false)
            ) {
                return;
            }

            let currentClass = target.getAttribute("class") || "";
            if (currentClass.indexOf("icon") !== -1) {
                icon = target;
            }

            if (!icon) {
                console.warn("icon not found");
                return;
            }

            const isModifierPressed = e.ctrlKey || e.metaKey;

            let iconId = icon.getAttribute("data-name");
            let section = icon.getAttribute("data-section");
            if (!iconId || !section) {
                return;
            }
            if (!isModifierPressed) {
                this.#unselectAll(true);
            }
            if (this.#selectedIcons.has(iconId)) {
                this.#setSelectedToIcon(icon, false);
                this.#selectedIcons.delete(iconId);
            } else {
                this.#setSelectedToIcon(icon, true);
                this.#selectedIcons.set(iconId, section);
            }
            icon.setAttribute("tabindex", "0");

            this.#onChange();
        });
        this.#container.addEventListener("dblclick", (e) => {
            let icon;
            const target = e.target;
            if (
                !target ||
                (target instanceof HTMLElement === false &&
                    target instanceof SVGElement === false)
            ) {
                return;
            }

            let currentClass = target.getAttribute("class") || "";
            if (currentClass.indexOf("icon") !== -1) {
                icon = target;
            }

            if (!icon) {
                console.log("icon not found");
                return;
            }
            let iconId = icon.getAttribute("data-name");
            let section = icon.getAttribute("data-section");
            this.#setSelectedToIcon(icon, true);
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
                    this.#setSelectedToIcon(focusedIcon, true);
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
                this.#setSelectedToIcon(icon, true);
                this.#selectedIcons.set(iconId, section);
            });
        this.#onChange();
    }

    #unselectAll(silent = false) {
        this.#selectedIcons = new Map();
        this.#container.querySelectorAll(".icon.selected").forEach((icon) => {
            this.#setSelectedToIcon(icon, false);
        });
        if (silent) return;
        this.#onChange();
    }

    #hideAll() {
        this.#container
            .querySelectorAll(".icon:not(.hidden)")
            .forEach((icon) => {
                let currentClass = icon.getAttribute("class") || "";
                icon.setAttribute(
                    "class",
                    currentClass + (currentClass ? " " : "") + "hidden"
                );
            });
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
     * @param {HTMLElement | SVGElement} icon
     * @param {boolean} isSelected
     */
    #setSelectedToIcon(icon, isSelected) {
        if (isSelected) {
            let currentClass = icon.getAttribute("class") || "";
            if (currentClass.indexOf("selected") === -1) {
                icon.setAttribute(
                    "class",
                    currentClass + (currentClass ? " " : "") + "selected"
                );
            }
        } else {
            let currentClass = icon.getAttribute("class") || "";
            currentClass = currentClass
                .replace(new RegExp("\\b" + "selected" + "\\b", "g"), "")
                .trim();
            icon.setAttribute("class", currentClass);
        }
    }
}

export { IconPicker };
