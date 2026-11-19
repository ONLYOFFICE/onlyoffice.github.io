// Plugin settings (saved in localStorage), shared by code.js, options.js and settings.js
(function (window, undefined) {
    const SETTINGS_KEY = "numberedEquationSettings";
    const OPTIONS_KEY = "numberedEquationOptions"; // last choices of the insert window (options.js)

    const defaultSettings = {
        numberWidth: 15, // number column width (% of the page useful width); the equation gets the rest
        autoBookmark: true, // empty name: create an automatic bookmark
        autoPrefix: "eq_", // prefix of the automatic bookmarks (eq_aaa, eq_aab...)
        manualPrefix: "eqn_", // prefix added to the names typed by the user (can be ""); differs from eq_ so a typed name never joins the automatic sequence
    };

    function loadSettings() {
        let settings = Object.assign({}, defaultSettings);
        try {
            let saved = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
            if (typeof saved.numberWidth === "number") settings.numberWidth = saved.numberWidth;
            if (typeof saved.autoBookmark === "boolean") settings.autoBookmark = saved.autoBookmark;
            if (typeof saved.autoPrefix === "string") settings.autoPrefix = saved.autoPrefix;
            if (typeof saved.manualPrefix === "string") settings.manualPrefix = saved.manualPrefix;
        } catch (e) {}
        return settings;
    }

    function saveSettings(settings) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch (e) {}
    }

    // Back to the defaults: removes the saved settings and the last choices of the insert window
    function resetSettings() {
        try {
            localStorage.removeItem(SETTINGS_KEY);
            localStorage.removeItem(OPTIONS_KEY);
        } catch (e) {}
    }

    // Starts with a letter, only letters, digits or _, max. 30 (leaves room for the name)
    function isValidPrefix(prefix) {
        return /^[A-Za-z][A-Za-z0-9_]{0,29}$/.test(prefix);
    }

    window.NumberedEquationSettings = {
        defaults: defaultSettings,
        load: loadSettings,
        save: saveSettings,
        reset: resetSettings,
        isValidPrefix: isValidPrefix,
    };
})(window, undefined);
