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

/// <reference path="../../../v1/plugins.js" />
/// <reference path="./utils/theme.js" />

(function (window) {
    const mainContainer = document.getElementById("custom_assistant_window");

    const tempTextarea = document.getElementById("input_prompt");
    if (tempTextarea instanceof HTMLTextAreaElement === false) {
        console.error("Custom Assistant: textarea is not HTMLTextAreaElement");
        return;
    }
    /** @type {HTMLTextAreaElement} */
    const textarea = tempTextarea;

    if (
        !textarea ||
        !mainContainer ||
        textarea instanceof HTMLTextAreaElement === false
    ) {
        console.error("Custom Assistant: required elements are missing");
        return;
    }

    window.Asc.plugin.init = function () {
        window.Asc.plugin.sendToPlugin("onWindowReady", {});

        textarea.focus();

        mainContainer.addEventListener("click", function (e) {
            if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();
                window.open(e.target.href, "_blank");
            }
        });
    };

    function onThemeChanged(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        updateBodyThemeClasses(theme.type, theme.name);
        updateThemeVariables(theme);
    }

    window.Asc.plugin.onTranslate = function () {
        let elements = document.querySelectorAll(".i18n");

        elements.forEach(function (element) {
            if (element instanceof HTMLElement === false) {
                return;
            }
            element.innerText = window.Asc.plugin.tr(element.innerText);
        });

        // Textarea
        textarea.setAttribute(
            "placeholder",
            window.Asc.plugin.tr("Enter your query here...")
        );
    };

    window.Asc.plugin.onThemeChanged = onThemeChanged;
    window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);

    window.Asc.plugin.attachEvent("onClickAdd", () => {
        let value = textarea.value.trim();
        textarea.focus();
        window.Asc.plugin.sendToPlugin("onAddNewAssistant", value);
    });
})(window);
