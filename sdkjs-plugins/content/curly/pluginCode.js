/**
 * OnlyOffice plugin bridge — runs at top level of the plugin frame.
 *
 * Responsibilities:
 *   - Complete the Asc.plugin handshake by implementing init()
 *   - Expose a global readiness flag our React bundle waits on
 *   - Mirror the editor theme onto our Tailwind `.dark` class
 *   - Handle the Close button from the task panel
 *
 * The actual React UI lives in bundle/addin.js and picks up the plugin
 * via the OnlyOfficeAdapter.
 */
(function () {
    'use strict';

    // The SDK injects window.Asc.plugin before this script runs.
    if (typeof window.Asc === 'undefined' || !window.Asc.plugin) {
        console.error('[Curly] Asc.plugin not available — is plugins.js loaded?');

        return;
    }

    // plugins.js paints the pane body for the editor theme (dark background,
    // light inherited text) but knows nothing about our component palette.
    // Without flipping our own `.dark` class the pane renders a half-dark
    // hybrid: shadcn's outline button keeps its LIGHT background while
    // inheriting the injected light text — white-on-white, invisible label.
    // Theme objects differ across SDK builds (type/Type/name), so sniff all.
    function applyEditorTheme(theme) {
        var label = String((theme && (theme.type || theme.Type || theme.name)) || 'light');
        document.documentElement.classList.toggle('dark', label.toLowerCase().indexOf('dark') !== -1);
    }

    window.Asc.plugin.onThemeChanged = function (theme) {
        // Keep the SDK's own default styling pass, then ours on top.
        if (typeof window.Asc.plugin.onThemeChangedBase === 'function') {
            window.Asc.plugin.onThemeChangedBase(theme);
        }

        applyEditorTheme(theme);
    };

    // Desktop builds (observed v9, 2026-07) do NOT invoke onThemeChanged at
    // startup: Asc.plugin.theme simply appears a few ticks AFTER init() —
    // checking it inside init() loses the race and the pane stays light.
    // Poll briefly until the host has delivered the current theme.
    var themePoll = setInterval(function () {
        if (window.Asc.plugin.theme) {
            applyEditorTheme(window.Asc.plugin.theme);
            clearInterval(themePoll);
            themePoll = null;
        }
    }, 100);

    setTimeout(function () {
        if (themePoll) {
            clearInterval(themePoll);
        }
    }, 10000);

    window.Asc.plugin.init = function () {
        // Editors that don't fire onThemeChanged on startup still expose the
        // current theme here.
        if (window.Asc.plugin.theme) {
            applyEditorTheme(window.Asc.plugin.theme);
        }

        window.__curlyOnlyOfficeReady = true;
        var ev = new CustomEvent('curly:onlyoffice-ready');
        window.dispatchEvent(ev);
    };

    window.Asc.plugin.button = function () {
        // The only button defined in config.json is "Close" (id === 0).
        this.executeCommand('close', '');
    };
})();
