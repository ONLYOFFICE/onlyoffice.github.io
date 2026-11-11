/*
 * (c) Copyright Ascensio System SIA 2010-2026
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

/// <reference path="../app/types-global.js" />

/** @typedef {import("@onlyoffice/doceditor-plugin-types").AscTheme} AscTheme */


import { InputField, Checkbox, SelectBox } from "./shared/components";
import LOCATOR_VALUES from "./shared/constants/locator-values";
import { Theme } from "./theme";

import "../components.css";
import "../edit-window.css";

/**
 * @typedef {Object} CitationItem
 * @property {string} id
 * @property {{title: string, type: string, version: number}} itemData
 * @property {string} [label]
 * @property {string} [locator]
 * @property {string} [prefix]
 * @property {string} [suffix]
 * @property {boolean} [suppress-author]
 */

/**
 * @typedef {Object} EditedCitation
 * @property {CitationItem[]} citationItems
 * @property {{unsorted?: boolean}} [properties]
 */

/**
 * @typedef {Object} EditWindowForm
 * @property {string} id
 * @property {HTMLFormElement} element
 * @property {Checkbox} omitAuthorInput
 * @property {InputField} prefixInput
 * @property {InputField} suffixInput
 * @property {InputField} locatorInput
 * @property {SelectBox} locatorSelectbox
 */

(function () {

    const GRIP_ICON =
        '<svg width="8" height="14" viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="2" cy="3" r="1" fill="currentColor"/>' +
        '<circle cx="6" cy="3" r="1" fill="currentColor"/>' +
        '<circle cx="2" cy="7" r="1" fill="currentColor"/>' +
        '<circle cx="6" cy="7" r="1" fill="currentColor"/>' +
        '<circle cx="2" cy="11" r="1" fill="currentColor"/>' +
        '<circle cx="6" cy="11" r="1" fill="currentColor"/>' +
        '</svg>';

    class EditWindow {
        constructor() {
            const container = document.querySelector(".container");
            if (container instanceof HTMLElement === false) {
                throw new Error("container is not initialized");
            }
            /** @type {HTMLElement} */
            this._container = container;
            
            /** @type {EditedCitation | null} */
            this.citationObject = null;
            /**
             * "Keep sources sorted": unchecked, the sources stay in the order
             * set here instead of the one the style sorts them in.
             * @type {Checkbox | null}
             */
            this._keepSortedInput = null;
            /** @type {HTMLElement | null} */
            this._keepSortedWrapper = null;
            /** @type {EditWindowForm[]} */
            this.forms = [];
            this._hasRemovedItems = false;
            /**
             * The item order the window was opened with
             * @type {string[]}
             */
            this._initialOrder = [];
            /** @type {{entry: EditWindowForm, startY: number, moved: boolean} | null} */
            this._drag = null;
            this._onDragMoveBound = this.onDragMove.bind(this);
            this._onDragEndBound = this.onDragEnd.bind(this);
        }

        /**
         * @param {CitationItem} citationItem
         */
        createForm(citationItem) {
            const form = document.createElement("form");
            form.classList.add("form");
            form.classList.add("message-container");
            this._container.appendChild(form);

            var deleteBtn = document.createElement("button");
            deleteBtn.className = "message-close i18n";
            deleteBtn.textContent = "×";
            deleteBtn.setAttribute("aria-label", "Close");
            deleteBtn.setAttribute("title", "Remove");
            deleteBtn.setAttribute("type", "button");

            deleteBtn.onclick = this.removeItem.bind(this, form, citationItem.id);
            form.appendChild(deleteBtn);

            const header = document.createElement("div");
            header.classList.add("form-header");

            const grip = document.createElement("span");
            grip.classList.add("form-grip");
            grip.innerHTML = GRIP_ICON;
            header.appendChild(grip);

            const title = document.createElement("div");
            title.classList.add("title");
            title.textContent = citationItem.itemData.title;
            header.appendChild(title);

            header.onmousedown = this.onDragStart.bind(this, citationItem.id);
            form.appendChild(header);
            const params = document.createDocumentFragment();
            const prefixSuffixContainer = document.createElement("div");
            const prefix = document.createElement("input");
            const suffix = document.createElement("input");
            const locatorContainer = document.createElement("div");
            const locatorSelect = document.createElement("div");
            const locator = document.createElement("input");
            const omitAuthorContainer = document.createElement("div");
            const omitAuthor = document.createElement("input");

            params.appendChild(locatorContainer);
            locatorContainer.appendChild(locatorSelect);
            locatorContainer.appendChild(locator);
            let locatorPlaceholder = "";

            params.appendChild(prefixSuffixContainer);
            prefixSuffixContainer.appendChild(prefix);
            prefixSuffixContainer.appendChild(suffix);

            params.appendChild(omitAuthorContainer);
            omitAuthorContainer.appendChild(omitAuthor);

            const prefixInput = new InputField(prefix, {
                type: "text",
                placeholder: "Prefix",
                value: citationItem.prefix,
                showClear: false,
            });
            const suffixInput = new InputField(suffix, {
                type: "text",
                placeholder: "Suffix",
                value: citationItem.suffix,
                showClear: false,
            });
            const locatorSelectbox = new SelectBox(locatorSelect, {
                placeholder: "Locator",
                translate: Asc.plugin.tr,
            });
            const locatorLabel = citationItem.label || "page";
            LOCATOR_VALUES.forEach(function (info) {
                const selected = info[0] === locatorLabel;
                locatorSelectbox.addItem(info[0], info[1], selected);
                if (selected) {
                    locatorPlaceholder = info[1];
                }
            });
            const locatorInput = new InputField(locator, {
                type: "text",
                placeholder: locatorPlaceholder,
                value: citationItem.locator,
                showClear: false,
            });
            const omitAuthorInput = new Checkbox(omitAuthor, {
                label: "Omit Author",
                checked: !!citationItem["suppress-author"],
            });

            locatorSelectbox.subscribe(function (event) {
                if (event.type !== "selectbox:change" || !event.detail.items) {
                    return;
                }
                const eventItem = event.detail.items[0];
                locatorInput.setPlaceholder(eventItem.text);
            });

            this.forms.push({
                id: citationItem.id,
                element: form,
                omitAuthorInput,
                prefixInput,
                suffixInput,
                locatorInput,
                locatorSelectbox,
            });

            form.appendChild(params);
        }

        updateItemControlsVisibility() {
            if (!this.citationObject) {
                return;
            }
            const numOfCitations = this.citationObject.citationItems.length;
            if (numOfCitations > 1) {
                this._container.classList.remove('hide-item-controls');
            } else {
                this._container.classList.add('hide-item-controls');
            }
        }

        updateWindowHeight() {
            if (!this.citationObject) {
                return;
            }
            const numOfCitations = this.citationObject.citationItems.length;
            const formHeight = (document.querySelector('form')?.offsetHeight || 134);
            // Hidden with a single source, and then of no height.
            const keepSortedHeight = this._keepSortedWrapper
                ? this._keepSortedWrapper.offsetHeight
                : 0;
            const winHeight = (numOfCitations * formHeight) + keepSortedHeight + 16;
            window.Asc.plugin.sendToPlugin("onUpdateHeight", winHeight);
        }

        /**
         * Reflows the forms in the container so that the markup follows the
         * current item order. appendChild moves a node that is already in the
         * container, so this both reorders and leaves every form in place.
         */
        syncDomOrder() {
            const container = this._container;
            this.forms.forEach(function (entry) {
                container.appendChild(entry.element);
            });
        }

        /**
         * Swaps two positions in the item list and in the forms that mirror
         * it, keeping the two arrays index-aligned.
         * @param {number} first
         * @param {number} second
         */
        swapItems(first, second) {
            if (!this.citationObject) {
                return;
            }
            const items = this.citationObject.citationItems;
            const item = items[first];
            items[first] = items[second];
            items[second] = item;

            const form = this.forms[first];
            this.forms[first] = this.forms[second];
            this.forms[second] = form;

            this.syncDomOrder();
        }

        /**
         * @returns {boolean}
         */
        isOrderChanged() {
            if (!this.citationObject) {
                return false;
            }
            const current = this.citationObject.citationItems.map(
                (/** @type {CitationItem} */ item) => item.id,
            );
            return (
                current.join("\u0000") !== this._initialOrder.join("\u0000")
            );
        }

        /**
         * @param {string} id
         * @param {MouseEvent} event
         */
        onDragStart(id, event) {
            if (event.button !== 0 || this.forms.length < 2 || this._drag) {
                return;
            }
            const entry = this.forms.find(form => form.id === id);
            if (!entry) {
                return;
            }
            event.preventDefault();

            this._drag = { entry: entry, startY: event.clientY, moved: false };
            entry.element.classList.add("dragging");
            document.addEventListener("mousemove", this._onDragMoveBound);
            document.addEventListener("mouseup", this._onDragEndBound);
        }

        /** @param {MouseEvent} event */
        onDragMove(event) {
            const drag = this._drag;
            if (!drag) {
                return;
            }
            let delta = event.clientY - drag.startY;
            const index = this.forms.indexOf(drag.entry);

            // A form only has to pass half of its neighbour to trade places
            // with it. The swap moves the form in the markup as well, so the
            // offset it is drawn with is corrected by the neighbour's height
            // to keep the form under the pointer.
            if (delta < 0 && index > 0) {
                const above = this.forms[index - 1].element.offsetHeight;
                if (-delta > above / 2) {
                    this.swapItems(index, index - 1);
                    drag.moved = true;
                    drag.startY -= above;
                    delta += above;
                }
            } else if (delta > 0 && index < this.forms.length - 1) {
                const below = this.forms[index + 1].element.offsetHeight;
                if (delta > below / 2) {
                    this.swapItems(index, index + 1);
                    drag.moved = true;
                    drag.startY += below;
                    delta -= below;
                }
            }

            drag.entry.element.style.transform = "translateY(" + delta + "px)";
        }

        onDragEnd() {
            const drag = this._drag;
            if (!drag) {
                return;
            }
            this._drag = null;
            drag.entry.element.classList.remove("dragging");
            drag.entry.element.style.transform = "";
            document.removeEventListener("mousemove", this._onDragMoveBound);
            document.removeEventListener("mouseup", this._onDragEndBound);
            // An order set by hand is kept only if the style does not sort
            // the sources again, as Zotero does when they are dragged.
            if (drag.moved && this._keepSortedInput) {
                this._keepSortedInput.uncheck();
            }
        }

        /**
         * Adds "Keep sources sorted" above the sources.
         * @param {EditedCitation} citationObject
         */
        createKeepSorted(citationObject) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("keep-sorted");
            const input = document.createElement("input");
            wrapper.appendChild(input);
            this._container.appendChild(wrapper);

            this._keepSortedWrapper = wrapper;
            this._keepSortedInput = new Checkbox(input, {
                label: "Keep sources sorted",
                checked: !(
                    citationObject.properties &&
                    citationObject.properties.unsorted
                ),
            });
        }

        /**
         * @param {HTMLFormElement} form
         * @param {string} id
         */
        removeItem(form, id) {
            if (!this.citationObject) {
                return;
            }

            const index = this.citationObject.citationItems.findIndex(
                item => item.id === id
            );
            if (index === -1) {
                return;
            }
            this.citationObject.citationItems.splice(index, 1);
            this.forms.splice(index, 1);
            this._hasRemovedItems = true;
            this._container.removeChild(form);

            this.updateItemControlsVisibility();
            this.updateWindowHeight();
        }

        onTranslate() {
            const elements = document.getElementsByClassName("i18n");
            for (let i = 0; i < elements.length; i++) {
                let el = elements[i];
                if (el instanceof HTMLElement === false) continue;

                ["placeholder", "title"].forEach((attr) => {
                    if (el.hasAttribute(attr)) {
                        el.setAttribute(
                            attr,
                            window.Asc.plugin.tr(el.getAttribute(attr) || ""),
                        );
                    }
                });

                const translated = window.Asc.plugin.tr(
                    el.innerText.trim().replace(/\s+/g, " "),
                );
                if (translated) el.innerText = translated;
            }
        }

        /** @param {AscTheme} theme */
        onThemeChanged(theme) {
            window.Asc.plugin.onThemeChangedBase(theme);
            Theme.fixThemeForIE(theme);
            Theme.addStylesForComponents(theme);
            let rules = "";
            rules +=
                "body { background-color: " +
                theme["background-normal"]  +
                " !important;}\n";

            let styleTheme = document.getElementById("pluginStyles");
            if (!styleTheme) {
                styleTheme = document.createElement("style");
                styleTheme.id = "pluginStyles";
                styleTheme.innerHTML = rules;
                document.getElementsByTagName("head")[0].appendChild(styleTheme);
            } else {
                styleTheme.innerHTML = rules;
            }
        }

        /** @param {EditedCitation} citationObject */
        async onAttachedContent(citationObject) {
            this.citationObject = citationObject;

            if (!this.citationObject) {
                return;
            }
            this._initialOrder = this.citationObject.citationItems.map(
                (/** @type {CitationItem} */ item) => item.id,
            );
            // First in the container: reordering appends the forms after it.
            this.createKeepSorted(this.citationObject);
            this.citationObject.citationItems.forEach(
                (/** @type {CitationItem} */ item) => {
                    this.createForm(item);
                },
            );
            this.updateItemControlsVisibility();
            this.updateWindowHeight();

            for (let i = 0; i < 10; i++) {
                if (window.Asc.plugin.translateManager) {
                    this.onTranslate();
                    i = Number.MAX_SAFE_INTEGER;
                    break;
                }
                await new Promise(resolve => setTimeout(() => resolve(true), 100));
            }
        }

        onClickSave() {
            let bHasChanges = this._hasRemovedItems || this.isOrderChanged();
            for (let i = 0; i < this.forms.length; i++) {
                const form = this.forms[i];
                const citationItem = this.citationObject?.citationItems.find(
                    (item) => item.id === form.id,
                );
                if (!citationItem) {
                    continue;
                }
                const prefix = form.prefixInput.getValue();
                const suffix = form.suffixInput.getValue();
                const label = form.locatorSelectbox.getSelectedValue();
                const locator = form.locatorInput.getValue();
                const omitAuthor = form.omitAuthorInput.getState().checked;

                if ((citationItem.prefix || prefix) && citationItem.prefix !== prefix) {
                    citationItem.prefix = prefix;
                    bHasChanges = true;
                }
                if ((citationItem.suffix || suffix) && citationItem.suffix !== suffix) {
                    citationItem.suffix = suffix;
                    bHasChanges = true;
                }
                if ((citationItem.label || label) && citationItem.label !== label) {
                    if (label) {
                        citationItem.label = label;
                        bHasChanges = true;
                    }
                }
                if ((citationItem.locator || locator) && citationItem.locator !== locator) {
                    citationItem.locator = locator;
                    bHasChanges = true;
                }
                if (!!citationItem["suppress-author"] !== omitAuthor) {
                    citationItem["suppress-author"] = omitAuthor;
                    bHasChanges = true;
                }
            }
            if (this.citationObject && this._keepSortedInput) {
                const keepSorted = this._keepSortedInput.getState().checked;
                const properties =
                    this.citationObject.properties ||
                    (this.citationObject.properties = {});
                if (keepSorted === !!properties.unsorted) {
                    // Zotero writes the flag only for an unsorted citation.
                    if (keepSorted) {
                        delete properties.unsorted;
                    } else {
                        properties.unsorted = true;
                    }
                    bHasChanges = true;
                }
            }
            return bHasChanges || this._hasRemovedItems;
        }
    }

    const editWindow = new EditWindow();

    window.Asc.plugin.init = function () {
        window.Asc.plugin.sendToPlugin("onWindowReady", {});
    };
    window.Asc.plugin.onThemeChanged =
        editWindow.onThemeChanged.bind(editWindow);
    window.Asc.plugin.attachEvent(
        "onThemeChanged",
        editWindow.onThemeChanged.bind(editWindow),
    );
    window.Asc.plugin.attachEvent(
        "onAttachedContent",
        editWindow.onAttachedContent.bind(editWindow),
    );
    window.Asc.plugin.attachEvent("onClickSave", () => {
        let bHasChanges = editWindow.onClickSave();
        if (bHasChanges) {
            window.Asc.plugin.sendToPlugin("onSaveFields", editWindow.citationObject);
        } else {
            window.Asc.plugin.sendToPlugin("onSaveFields", null);
        }
    });
})();
