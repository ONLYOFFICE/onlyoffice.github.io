/**
 * OnlyOffice plugin bridge — runs at top level of the plugin frame.
 *
 * Responsibilities:
 *   - Complete the Asc.plugin handshake by implementing init()
 *   - Expose a global readiness flag our React bundle waits on
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

    window.Asc.plugin.init = function () {
        window.__curlyOnlyOfficeReady = true;
        var ev = new CustomEvent('curly:onlyoffice-ready');
        window.dispatchEvent(ev);
    };

    window.Asc.plugin.button = function () {
        // The only button defined in config.json is "Close" (id === 0).
        this.executeCommand('close', '');
    };
})();
