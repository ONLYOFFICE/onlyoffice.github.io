(function (window, undefined) {
    const store = window.NumberedEquationSettings;

    //#region: Helpers

    function $(id) {
        return document.getElementById(id);
    }

    // Puts the settings values in the fields
    function fillForm(settings) {
        $("numberWidth").value = settings.numberWidth;
        $("autoBookmark").checked = settings.autoBookmark;
        $("autoPrefix").value = settings.autoPrefix;
        $("manualPrefix").value = settings.manualPrefix;
        updateEnabled();
    }

    // Shows a message under the fields (error in red, information in the normal color)
    function showMessage(text, isError) {
        $("error").textContent = text;
        $("error").className = isError ? "" : "info";
        window.NumberedEquationWindow.fit(); // a long message can take two lines
    }

    // Enables/disables the fields that depend on a checkbox
    function updateEnabled() {
        $("autoPrefix").disabled = !$("autoBookmark").checked;
    }

    //#endregion
    //#region: Plugin events

    window.Asc.plugin.init = function () {
        fillForm(store.load());

        $("autoBookmark").addEventListener("change", updateEnabled);

        // "Reset to defaults": clears the saved settings and the insert window choices
        $("reset").addEventListener("click", function () {
            store.reset();
            fillForm(store.load()); // nothing saved: load() gives the defaults
            showMessage("Defaults restored (settings and insert window choices).", false);
        });

        $("cancel").addEventListener("click", function () {
            window.Asc.plugin.sendToPlugin("cancel", {});
        });

        // Keyboard: Enter = Save, Esc = Cancel (closes the window, like the X)
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

        // Cursor in the first field, so the keys work right away
        $("numberWidth").focus();

        // Window height = content height (no empty space at the bottom)
        window.NumberedEquationWindow.fit();

        // "Save" (button or Enter key)
        $("form").addEventListener("submit", function (event) {
            event.preventDefault();

            let numberWidth = Number($("numberWidth").value);
            let autoBookmark = $("autoBookmark").checked;
            let autoPrefix = $("autoPrefix").value.trim();
            let manualPrefix = $("manualPrefix").value.trim();

            // Empty field gives 0; the browser already blocks values out of 1-99
            // Centered uses it twice (left and right), so it must be below 50%
            if (numberWidth < 1 || numberWidth > 49) {
                showMessage("Number column width: from 1 to 49%.", true);
                return;
            }

            if (autoBookmark) {
                if (!store.isValidPrefix(autoPrefix)) {
                    showMessage("Automatic prefix: start with a letter, use only letters, digits or _.", true);
                    return;
                }
            }
            if (manualPrefix !== "") {
                if (!store.isValidPrefix(manualPrefix)) {
                    showMessage("Typed names prefix: start with a letter, use only letters, digits or _ (or leave it empty).", true);
                    return;
                }
            }

            // An unchecked automatic bookmark keeps its prefix (or the default one, if it is invalid)
            if (!store.isValidPrefix(autoPrefix)) {
                autoPrefix = store.defaults.autoPrefix;
            }

            store.save({
                numberWidth: numberWidth,
                autoBookmark: autoBookmark,
                autoPrefix: autoPrefix,
                manualPrefix: manualPrefix,
            });
            window.Asc.plugin.sendToPlugin("save", {});
        });
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
