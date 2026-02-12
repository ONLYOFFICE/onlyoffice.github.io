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

/// <reference path="../app/types-global.js" />

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

(function () {

    class EditWindow {
        constructor() {
            const container = document.querySelector(".container");
            if (container instanceof HTMLElement === false) {
                throw new Error("container is not initialized");
            }
            /** @type {HTMLElement} */
            this._container = container;
            this._field = null;
            
            /** @type {{citationItems: CitationItem[]} | null} */
            this.citationObject = null;
            /** @type {Array<{omitAuthorInput: Checkbox, prefixInput: InputField, suffixInput: InputField, locatorInput: InputField, locatorSelectbox: SelectBox}>} */
            this.forms = [];
        }

        /**
         * @param {CitationItem} citationItem
         */
        createForm(citationItem) {
            const form = document.createElement("form");
            form.classList.add("form");
            this._container.appendChild(form);

            const title = document.createElement("div");
            title.classList.add("title");
            title.textContent = citationItem.itemData.title;
            form.appendChild(title);
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
            });
            const suffixInput = new InputField(suffix, {
                type: "text",
                placeholder: "Suffix",
                value: citationItem.suffix,
            });
            const locatorSelectbox = new SelectBox(locatorSelect, {
                placeholder: "Locator",
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
            });
            const omitAuthorInput = new Checkbox(omitAuthor, {
                label: "Omit author",
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
                omitAuthorInput,
                prefixInput,
                suffixInput,
                locatorInput,
                locatorSelectbox,
            });

            form.appendChild(params);
        }

        /** @param {ThemeColors} theme */
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

        /** @param {CustomField} field */
        onAttachedContent(field) {
            this._field = field;

            const citationStartIndex = field.Value.indexOf("{");
            const citationEndIndex = field.Value.lastIndexOf("}");
            if (citationStartIndex === -1) {
                return;
            }
            const citationString = field.Value.slice(
                citationStartIndex,
                citationEndIndex + 1,
            );
            this.citationObject = JSON.parse(citationString);

            if (!this.citationObject) {
                return;
            }
            this.citationObject.citationItems.forEach(
                (/** @type {CitationItem} */ item) => {
                    this.createForm(item);
                },
            );

            window.Asc.plugin.sendToPlugin(
                "onUpdateHeight",
                document.body.scrollHeight,
            );
        }

        onClickSave() {
            let bHasChanges = false;
            for (let i = 0; i < this.forms.length; i++) {
                const form = this.forms[i];
                const citationItem = this.citationObject?.citationItems[i];
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
            return bHasChanges;
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
