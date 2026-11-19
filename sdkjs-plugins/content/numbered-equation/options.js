(function (window, undefined) {
    const STORAGE_KEY = "numberedEquationOptions"; // also cleared by "Reset to defaults" (settings-store.js)

    //#region: Helpers

    function $(id) {
        return document.getElementById(id);
    }

    function loadSaved() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function save(options) {
        try {
            // The bookmark name changes for each equation, so it is not remembered
            let copy = Object.assign({}, options);
            delete copy.bookmarkName;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
        } catch (e) {}
    }

    // Enables/disables the fields that depend on a checkbox
    function updateEnabled() {
        $("titleStyle").disabled = !$("addTitle").checked;
    }

    //#endregion
    //#region: Fill the form

    function fillStyles(names, selected) {
        let select = $("titleStyle");
        select.innerHTML = "";
        for (let i = 0; i < names.length; i++) {
            let option = document.createElement("option");
            option.value = names[i];
            option.textContent = names[i];
            select.appendChild(option);
        }
        if (names.indexOf(selected) >= 0) select.value = selected;
        else if (names.indexOf("Heading 1") >= 0) select.value = "Heading 1";
    }

    // Shows the typed names prefix and what an empty name does (from the settings)
    function fillBookmark() {
        let settings = window.NumberedEquationSettings.load();
        $("bookmarkPrefix").textContent = settings.manualPrefix;
        if (settings.autoBookmark) {
            $("bookmarkName").placeholder = "empty = automatic (" + settings.autoPrefix + "aaa...)";
        } else {
            $("bookmarkName").placeholder = "empty = no bookmark";
        }
        // prefix + name must fit in 40 characters
        $("bookmarkName").maxLength = 40 - settings.manualPrefix.length;
    }

    function fillForm(saved) {
        if (saved.centered === false)
            document.querySelector('input[name="align"][value="left"]').checked = true;
        if (typeof saved.addTitle === "boolean") $("addTitle").checked = saved.addTitle;
        updateEnabled();
    }

    //#endregion
    //#region: Plugin events

    window.Asc.plugin.init = function () {
        let saved = loadSaved();
        fillForm(saved);
        fillBookmark();

        // Reads the paragraph style names of the document
        window.Asc.plugin.callCommand(
            function () {
                let styles = Api.GetDocument().GetAllStyles();
                let names = [];
                for (let i = 0; i < styles.length; i++) {
                    if (styles[i].GetType() === "paragraph") names.push(styles[i].GetName());
                }
                return names;
            },
            false,
            false,
            function (names) {
                if (!Array.isArray(names)) names = [];
                fillStyles(names, saved.titleStyle);

                // Window height = content height (no empty space at the bottom).
                // Only here, after the styles arrive: inside a window, the SDK answers callCommand and
                // executeMethod through one shared queue, so two pending calls can swap their answers.
                window.NumberedEquationWindow.fit();
            },
        );

        $("addTitle").addEventListener("change", updateEnabled);

        $("cancel").addEventListener("click", function () {
            window.Asc.plugin.sendToPlugin("cancel", {});
        });

        // "Insert" (button or Enter key)
        $("form").addEventListener("submit", function (event) {
            event.preventDefault();
            let options = {
                centered: document.querySelector('input[name="align"]:checked').value === "center",
                addTitle: $("addTitle").checked,
                titleStyle: $("titleStyle").value,
                bookmarkName: $("bookmarkName").value.trim(), // without prefix; empty = automatic or no bookmark (settings)
            };
            save(options);
            window.Asc.plugin.sendToPlugin("insert", options);
        });

        // Keyboard: Enter = Insert, Esc = Cancel (closes the window, like the X)
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                event.preventDefault();
                window.Asc.plugin.sendToPlugin("cancel", {});
                return;
            }
            if (event.key === "Enter") {
                // Enter on a button keeps its own action (e.g. Cancel)
                if (event.target.tagName === "BUTTON") return;
                event.preventDefault();
                $("form").requestSubmit();
            }
        });

        // Cursor in the bookmark name, so the keys work right away
        $("bookmarkName").focus();

    };

    // Follows the editor theme (light/dark)
    window.Asc.plugin.onThemeChanged = function (theme) {
        window.Asc.plugin.onThemeChangedBase(theme);
        let root = document.documentElement.style;
        if (theme["background-normal"]) root.setProperty("--bg", theme["background-normal"]);
        if (theme["text-normal"]) root.setProperty("--text", theme["text-normal"]);
        if (theme["border-regular-control"])
            root.setProperty("--border", theme["border-regular-control"]);
        if (theme["background-primary-dialog-button"])
            root.setProperty("--primary", theme["background-primary-dialog-button"]);
        if (theme["text-inverse"]) root.setProperty("--primary-text", theme["text-inverse"]);
    };

    //#endregion
})(window, undefined);
