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

/// <reference path="./types.js" />

const themes = new Set([
    "theme-classic-light",
    "theme-classic-dark",
    "theme-light",
    "theme-dark",
    "theme-contrast-dark",
    "theme-gray",
    "theme-night",
    "theme-white",
]);

class Theme {
    /**
     * @param {ThemeColors} theme
     */
    static onThemeChanged(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);

        let rules =
            ".icons-container { background-color: " +
            theme["background-normal"] +
            "; }\n";
        rules += ".icons .icon { color: " + theme["text-normal"] + "; }\n";

        rules +=
            ".icons .icon:focus { background-color: " +
            theme["highlight-button-hover"] +
            "; }\n";
        rules +=
            ".icons .icon:hover { background-color: " +
            theme["highlight-button-hover"] +
            "; }\n";
        rules +=
            ".icons .icon.selected { background-color: " +
            theme["highlight-button-pressed"] +
            "; }\n";

        let styleTheme = document.getElementById("pluginStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "pluginStyles";
            styleTheme.innerHTML = rules;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
        } else {
            styleTheme.innerHTML = rules;
        }

        Theme.addStylesForComponents(theme);

        let themeName = theme.name;
        console.warn(theme);
        if (!themes.has(themeName)) {
            if (theme.type === "dark") {
                themeName = "theme-dark";
            } else {
                themeName = "theme-light";
            }
        }

        const body = document.body;
        for (const className of themes) {
            body.classList.remove(className);
        }
        body.classList.add(themeName);
    }

    /**
     * @param {ThemeColors} theme
     */
    static addStylesForComponents(theme) {
        let styles = "";

        if (theme["background-normal"]) {
            styles +=
                ".custom-button-secondary-icon,\n" +
                ".custom-button-secondary,\n" +
                ".input-field-element,\n" +
                ".selectbox-header,\n" +
                ".selectbox-dropdown,\n" +
                ".message { background-color: " +
                theme["background-normal"] +
                "; }\n";
        }
        if (theme["text-inverse"]) {
            styles +=
                ".custom-button-primary { color: " +
                theme["text-inverse"] +
                "; }\n";
        }
        if (theme["border-regular-control"]) {
            styles +=
                ".custom-button-icon-only:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:active:not(.custom-button-disabled),\n" +
                ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary,\n" +
                ".custom-button-secondary-icon,\n" +
                ".input-field-element,\n" +
                ".selectbox-header,\n" +
                ".selectbox-dropdown,\n" +
                ".selectbox-search-input:focus,\n" +
                ".selectbox-option-divider,\n" +
                ".message { border-color: " +
                theme["border-regular-control"] +
                "; }\n";
        }
        if (theme["border-error"]) {
            styles +=
                ".input-field-invalid .input-field-element { border-color: " +
                theme["border-error"] +
                "; }\n";
        }
        if (theme["border-control-focus"]) {
            styles +=
                ".custom-button-icon-only:focus:not(:active):not(:hover),\n" +
                ".custom-button-secondary-icon:focus:not(:active):not(:hover),\n" +
                ".custom-button-secondary:focus:not(:active):not(:hover),\n" +
                ".input-field-element:focus,\n" +
                ".input-field-focused .input-field-element,\n" +
                ".selectbox-header:active,\n" +
                ".selectbox-header:focus,\n" +
                ".selectbox-header-open { border-color: " +
                theme["border-control-focus"] +
                "; }\n";
        }
        if (theme["highlight-button-hover"]) {
            styles +=
                ".custom-button-icon-only:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:hover:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:hover:not(.custom-button-disabled),\n" +
                ".selectbox-search,\n" +
                ".selectbox-option:hover { background-color: " +
                theme["highlight-button-hover"] +
                "; }\n";
        }
        if (theme["highlight-button-pressed"]) {
            styles +=
                ".custom-button-icon-only:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary-icon:active:not(.custom-button-disabled),\n" +
                ".custom-button-secondary:active:not(.custom-button-disabled),\n" +
                ".selectbox-option-selected:hover,\n" +
                ".selectbox-option-selected { background-color: " +
                theme["highlight-button-pressed"] +
                "; }\n";
            styles +=
                ".selectbox-dropdown { box-shadow: 1px 1px 4px -1px " +
                theme["highlight-button-pressed"] +
                "; }\n";
        }
        if (theme["highlight-primary-dialog-button-hover"]) {
            styles +=
                ".custom-button-primary:hover:not(.custom-button-disabled) { background-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; border-color: " +
                theme["highlight-primary-dialog-button-hover"] +
                "; }\n";
        }
        if (theme["background-primary-dialog-button"]) {
            styles +=
                ".custom-button-primary { background-color: " +
                theme["background-primary-dialog-button"] +
                "; border-color: " +
                theme["background-primary-dialog-button"] +
                "; }\n";
        }
        if (theme["background-toolbar-additional"]) {
            styles +=
                ".custom-button-secondary-icon:disabled,\n" +
                ".custom-button-secondary-icon.custom-button-disabled,\n" +
                ".custom-button-secondary:disabled,\n" +
                ".custom-button-secondary.custom-button-disabled { background-color: " +
                theme["background-toolbar-additional"] +
                "; border-color: " +
                theme["background-toolbar-additional"] +
                "; }\n";
        }
        if (theme["text-normal"]) {
            styles +=
                ".custom-button-secondary-icon,\n" +
                ".custom-button-secondary,\n" +
                ".input-field-element { color: " +
                theme["text-normal"] +
                "; }\n";
            styles +=
                ".input-field-search-icon svg { fill: " +
                theme["text-normal"] +
                "; }\n";
        }
        if (theme["text-secondary"]) {
            styles +=
                ".message-close:hover,\n" +
                ".input-field-clear:hover { color: " +
                theme["text-secondary"] +
                "; }\n";
        }
        if (theme["text-tertiary"]) {
            styles +=
                ".input-field-clear,\n" +
                ".message-container:hover .message-close,\n" +
                ".custom-button-secondary-icon:disabled,\n" +
                ".custom-button-secondary-icon.custom-button-disabled,\n" +
                ".custom-button-secondary:disabled,\n" +
                ".custom-button-secondary.custom-button-disabled,\n" +
                ".input-field-element::placeholder,\n" +
                ".selectbox-search-input::placeholder { color: " +
                theme["text-tertiary"] +
                "; }\n";
        }
        if (
            ["theme-white", "theme-night"].indexOf(theme.name) !== -1 ||
            ["theme-white", "theme-night"].indexOf(theme.Name) !== -1
        ) {
            styles +=
                ".message,\n" +
                ".custom-button,\n" +
                ".selectbox-header,\n" +
                ".input-field-element { border-radius: 4px; }\n";
        }

        let styleTheme = document.getElementById("componentsStyles");
        if (!styleTheme) {
            styleTheme = document.createElement("style");
            styleTheme.id = "componentsStyles";
            styleTheme.innerHTML = styles;
            document.getElementsByTagName("head")[0].appendChild(styleTheme);
            return styles;
        }
        styleTheme.innerHTML = styles;
        return styles;
    }
}

export { Theme };
