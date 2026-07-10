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

class Loader {
    static #mainLoaderContainer = document.getElementById("loader");
    static #mainLoaderCircle = document.querySelector("#loader .loader-image circle");
    static #mainLoaderTitle = document.querySelector("#loader .loader-title");
    /** Circumference of the loader ring, in the same user units as its r=7.25 viewBox. */
    static #circumference = 2 * Math.PI * 7.25;

    #container;
    /** @type {SVGCircleElement|null} */
    #circle = null;
    /** @type {HTMLElement|null} */
    #title = null;

    /**
     * @param {string} containerId
     * @param {string} text
     */
    constructor(containerId, text) {
        const temp = document.getElementById(containerId);
        if (temp instanceof HTMLElement === false)
            throw new Error("Invalid container");

        this.#container = temp;

        this.#createDOM(text);
    }

    /**
     * @param {string} text
     */
    #createDOM(text) {
        this.#container.classList.add("loader-container");
        const svgNS = "http://www.w3.org/2000/svg";
        const image = document.createElementNS(svgNS, "svg");
        image.classList.add("loader-image");
        image.setAttribute("viewBox", "0 0 20 20");
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", "10");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "currentColor");
        circle.setAttribute("stroke-width", "1.5");
        circle.setAttribute("r", "7.25");
        circle.setAttribute("stroke-dasharray", "160%, 40%");
        image.appendChild(circle);
        this.#container.appendChild(image);
        const title = document.createElement("div");
        title.classList.add("loader-title");
        title.classList.add("i18n");
        title.innerText = text;
        this.#container.appendChild(title);

        this.#circle = circle;
        this.#title = title;
    }

    show() {
        this.#container?.classList.remove("hidden");
    }

    hide() {
        this.#container?.classList.add("hidden");
    }

    /** @param {string} text */
    setText(text) {
        if (this.#title) {
            this.#title.innerText = text;
        }
    }

    /**
     * Switches the ring from an indeterminate spin to a determinate progress
     * arc, or back to indeterminate when called with null/undefined.
     * @param {number|null} [fraction] value from 0 to 1
     */
    setProgress(fraction) {
        Loader.#applyProgress(this.#container, this.#circle, fraction);
    }

    static show() {
        this.#mainLoaderContainer?.classList.remove("hidden");
    }

    static hide() {
        this.#mainLoaderContainer?.classList.add("hidden");
    }

    /** @param {string} text */
    static setText(text) {
        if (this.#mainLoaderTitle) {
            this.#mainLoaderTitle.innerText = text;
        }
    }

    /** @param {number|null} [fraction] value from 0 to 1 */
    static setProgress(fraction) {
        this.#applyProgress(this.#mainLoaderContainer, this.#mainLoaderCircle, fraction);
    }

    /**
     * @param {HTMLElement|null} [container]
     * @param {SVGCircleElement|null} [circle]
     * @param {number|null} [fraction]
     */
    static #applyProgress(container, circle, fraction) {
        if (!container || !circle) {
            return;
        }
        if (fraction === null || fraction === undefined) {
            container.classList.remove("loader-determinate");
            circle.style.strokeDasharray = "";
            circle.style.strokeDashoffset = "";
            return;
        }
        const clamped = Math.max(0, Math.min(1, fraction));
        container.classList.add("loader-determinate");
        circle.style.strokeDasharray = String(this.#circumference);
        circle.style.strokeDashoffset = String(
            this.#circumference * (1 - clamped),
        );
    }
}

export { Loader };
