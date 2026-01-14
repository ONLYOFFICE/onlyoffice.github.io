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

(function (window, undefined) {
    let errTimeout = null;
    let loader = null;
    let themeType = "light";
    let regenerationMessageIndex = null; //Index of the message for which a new reply is being created

    let scrollbarList;

    let localStorageKey = "onlyoffice_ai_chat_state";

    window.Asc.plugin.init = function () {
        scrollbarList = new PerfectScrollbar("#custom_assistant", {});
        restoreState();

        updateTextareaSize();

        window.Asc.plugin.sendToPlugin("onWindowReady", {});

        document
            .getElementById("input_prompt_submit")
            .addEventListener("click", function () {
                onSubmit();
            });
        document.getElementById("input_prompt").onkeydown = function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.target.value += "\n";
                updateTextareaSize();
            } else if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                onSubmit();
            }
        };

        document
            .getElementById("input_prompt")
            .addEventListener("focus", function (event) {
                document
                    .getElementById("input_prompt_wrapper")
                    .classList.add("focused");
            });
        document
            .getElementById("input_prompt")
            .addEventListener("blur", function (event) {
                document
                    .getElementById("input_prompt_wrapper")
                    .classList.remove("focused");
            });
        document.getElementById("input_prompt").focus();

        document
            .getElementById("input_prompt")
            .addEventListener("input", function (event) {
                //autosize
                updateTextareaSize();
            });

        document
            .getElementById("custom_assistant_wrapper")
            .addEventListener("click", function (e) {
                if (e.target.tagName === "A") {
                    e.preventDefault();
                    window.open(e.target.href, "_blank");
                }
            });
    };

    function onSubmit() {
        let textarea = document.getElementById("input_prompt");

        let value = textarea.value.trim();
        if (value.length) {
            sendMessage(textarea.value.trim());
            textarea.value = "";
            updateTextareaSize();
            document.getElementById("cur_tokens").innerText = 0;
        }
    }

    function updateStartPanel() {
        updateWelcomeText();
    }

    function updateWelcomeText() {
        let welcomeText = window.Asc.plugin.tr("Welcome");
        if (window.Asc.plugin.info.userName) {
            welcomeText += ", " + window.Asc.plugin.info.userName;
        }
        welcomeText += "!";
        document
            .getElementById("welcome_text")
            .prepend("<span>" + welcomeText + "</span>");
    }

    function updateTextareaSize() {
        let textarea = document.getElementById("input_prompt");
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height =
                Math.min(textarea.scrollHeight, 98) + 2 + "px";
        }
    }

    function setState(state) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(state));
    }

    function getState() {
        let state = window.localStorage.getItem(localStorageKey);
        return state ? JSON.parse(state) : null;
    }

    function restoreState() {
        let state = getState();
        if (!state) return;

        if (state.messages) {
            messagesList.set(state.messages);
        }
        if (state.inputValue) {
            document.getElementById("input_prompt").value = state.inputValue;
        }
    }

    function sendMessage(text) {
        const isRegenerating = regenerationMessageIndex !== null;
        const message = { role: "user", content: text };

        if (!isRegenerating) {
            messagesList.add(message);
            createTyping();
        }

        let list = isRegenerating
            ? messagesList.get().slice(0, regenerationMessageIndex)
            : messagesList.get();

        //Remove the errors and user messages that caused the error
        list = list.filter(function (item, index) {
            const nextItem = list[index + 1];
            return !item.error && !(nextItem && nextItem.error);
        });
        list = list.map(function (item) {
            return { role: item.role, content: item.getActiveContent() };
        });

        window.Asc.plugin.sendToPlugin("onChatMessage", list);
    }

    function createTyping() {
        let chatEl = document.getElementById("custom_assistant");
        let messageEl = document.createElement("div");
        messageEl.id = "loading";
        messageEl.classList.add("message");
        messageEl.style.order = messagesList.get().length;

        let spanMessageEl = document.createElement("div");
        spanMessageEl.classList.add("span_message");
        spanMessageEl.textContent = window.Asc.plugin.tr("Thinking");
        messageEl.append(spanMessageEl);
        chatEl.prepend(messageEl);
        chatEl.scrollTop(chatEl.scrollHeight);
        interval = setInterval(function () {
            let countDots = (spanMessageEl.text().match(/\./g) || []).length;
            countDots = countDots < 3 ? countDots + 1 : 0;
            spanMessageEl.text(
                window.Asc.plugin.tr("Thinking") +
                    Array(countDots + 1).join(".")
            );
        }, 500);
    }

    function onResize() {
        updateTextareaSize();
        scrollbarList && scrollbarList.update();
    }

    function onThemeChanged(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);

        themeType = theme.type || "light";
        updateBodyThemeClasses(theme.type, theme.name);
        updateThemeVariables(theme);
    }

    window.addEventListener("resize", onResize);
    onResize();

    window.Asc.plugin.onTranslate = function () {
        let elements = document.querySelectorAll(".i18n");

        elements.forEach(function (element) {
            element.innerText = window.Asc.plugin.tr(element.innerText);
        });

        // Textarea
        document
            .getElementById("input_prompt")
            .setAttribute(
                "placeholder",
                window.Asc.plugin.tr("Enter your query here...")
            );

        updateStartPanel();
    };

    window.Asc.plugin.onThemeChanged = onThemeChanged;

    window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);

    window.Asc.plugin.attachEvent("onUpdateState", function () {
        setState({
            inputValue: document.getElementById("input_prompt").value,
            type: "", // paint, replace, underline
        });
        window.Asc.plugin.sendToPlugin("onUpdateState");
    });
})(window, undefined);
