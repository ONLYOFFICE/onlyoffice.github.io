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

/// <reference path="./utils/theme.js" />
/// <reference path="../vendor/select2-4.0.6-rc.1/dist/js/select2.js" />
/// <reference path="./text-annotations/custom-annotations/types.js" />


(function (window) {
    const LOCAL_STORAGE_KEY = "onlyoffice_ai_saved_assistants";
    /** @type {any} */
    let selectType = null;
    const { form, textarea, inputId, inputName } = initFormElements();
    const mainContainer = document.getElementById("custom_assistant_window");
    if (!mainContainer) {
        console.error("Custom Assistant: required elements are missing");
        return;
    }

    window.Asc.plugin.init = function () {
        window.Asc.plugin.sendToPlugin("onWindowReady", {});

        inputId.value = generateHashedDateString();
        inputName.focus();

        mainContainer.addEventListener("click", function (e) {
            if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault();
                window.open(e.target.href, "_blank");
            }
        });
    };

    window.Asc.plugin.attachEvent("onClickAdd", () => {
        let formFields = null;
        if (form.checkValidity()) {
            formFields = saveCustomAssistantToLocalStorage();
        } else {
            //form.reportValidity();
            if (!inputName.value) {
                inputName.focus();
            } else {
                textarea.focus();
            }
        }

        window.Asc.plugin.sendToPlugin("onAddEditAssistant", formFields);
    });

    window.Asc.plugin.attachEvent(
        "onEditAssistant",
        (/** @type {string} */ assistantId) => {
            const savedAssistants = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
            );
            const assistant = savedAssistants.find(
                (/** @type {localStorageCustomAssistantItem} */ item) =>
                    item.id === assistantId
            );
            if (assistant) {
                inputId.value = assistant.id;
                inputName.value = assistant.name;
                selectType.val(assistant.type).trigger('change');
                textarea.value = assistant.query;
            }

            textarea.focus();
        }
    );

    window.Asc.plugin.attachEvent(
        "onWarningAssistant",
        (/** @type {string} */ warningText) => {
            const image = '<svg width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">' + 
                '<path d="M20.5201 0.853631C21.1693 -0.284655 22.8103 -0.284653 23.4594 0.853633L43.7548 36.4414C44.398 37.5693 43.5835 38.9714 42.2851 38.9714H1.69445C0.396056 38.9714 -0.418416 37.5693 0.224796 36.4414L20.5201 0.853631Z" fill="#F2BE08"/>' +
                '<circle cx="21.99" cy="32.4614" r="2.51612" fill="white"/>' +
                '<path d="M25.3447 12.3324C25.3447 13.1968 24.33 17.5992 23.6672 21.5581C23.0761 25.0894 22.8285 28.2678 22.8285 28.2678C22.4092 28.2678 21.7103 28.2678 21.1511 28.2678C21.1511 28.2678 20.9036 25.0894 20.3124 21.5581C19.6496 17.5992 18.635 13.1968 18.635 12.3324C18.635 10.4795 20.137 8.97754 21.9898 8.97754C23.8427 8.97754 25.3447 10.4795 25.3447 12.3324Z" fill="white"/>' +
                '</svg>';
            const text =  '<div id="warning_text" class="noselect">' +
                image + '<p class="i18n">' + warningText + '</p></div>'   
            mainContainer.innerHTML = text;
            mainContainer.classList.add("warning");
        }
    );

    function onThemeChanged(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        updateBodyThemeClasses(theme.type, theme.name);
        updateThemeVariables(theme);
    }
    window.Asc.plugin.onTranslate = function () {
        let elements = document.querySelectorAll(".i18n");
        elements.forEach(function (element) {
            if (
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLInputElement
            ) {
                element.placeholder = window.Asc.plugin.tr(element.placeholder);
            } else if (element instanceof HTMLElement) {
                element.innerText = window.Asc.plugin.tr(element.innerText);
            }
        });
    };
    window.Asc.plugin.onThemeChanged = onThemeChanged;
    window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);

    /** @returns {localStorageCustomAssistantItem} */
    function saveCustomAssistantToLocalStorage() {
        const id = inputId.value;
        const name = inputName.value.trim();
        const type = Number(selectType.val());
        const query = textarea.value.trim();

        /** @type {localStorageCustomAssistantItem[]} */
        const savedAssistants = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
        );
        const existingAssistantIndex = savedAssistants.findIndex(
            (item) => item.id === id
        );
        if (existingAssistantIndex !== -1) {
            savedAssistants[existingAssistantIndex] = { id, name, type, query };
        } else {
            savedAssistants.push({ id, name, type, query });
        }

        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(savedAssistants)
        );

        return { id, name, type, query };
    }

    /** @returns {{textarea: HTMLTextAreaElement, inputId: HTMLInputElement, inputName: HTMLInputElement, form: HTMLFormElement}} */
    function initFormElements() {
        const form = document.getElementById("input_prompt_wrapper");
        const inputId = document.getElementById("input_prompt_id");
        const inputName = document.getElementById("input_prompt_name");
        const textarea = document.getElementById("input_prompt");
        if (form instanceof HTMLFormElement === false) {
            throw new Error("Custom Assistant: form is not HTMLFormElement");
        }
        if (textarea instanceof HTMLTextAreaElement === false) {
            throw new Error(
                "Custom Assistant: textarea is not HTMLTextAreaElement"
            );
        }
        if (inputId instanceof HTMLInputElement === false) {
            throw new Error(
                "Custom Assistant: input id is not HTMLInputElement"
            );
        }
        if (inputName instanceof HTMLInputElement === false) {
            throw new Error(
                "Custom Assistant: input name is not HTMLInputElement"
            );
        }
        form.onsubmit = function (e) {
            e.preventDefault();
        }

        selectType = $('#assistantType');

        selectType.on('select2:select', (e) => {
            
        });
        selectType.val(0); // Default value

        selectType.trigger('select2:select');
        selectType.trigger('change');

        return { form, textarea, inputId, inputName };
    }

    /** @returns {string} */
    function generateHashedDateString() {
        const date = new Date();
        const data = date.toISOString() + Math.random() + performance.now();

        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }

        return Math.abs(hash).toString(36) + "_" + date.getTime().toString(36);
    }
})(window);
