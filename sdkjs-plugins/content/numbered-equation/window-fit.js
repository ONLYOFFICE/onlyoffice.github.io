// Resizes the plugin window to the height of its content (used by options.js and settings.js)
(function (window, undefined) {
    const WINDOW_WIDTH = 360;

    function fitWindowToContent() {
        let form = document.getElementById("form");
        if (!form || !window.Asc.plugin.windowID) return;

        // Bottom of the form + the body bottom padding
        let bodyStyle = window.getComputedStyle(document.body);
        let paddingBottom = parseFloat(bodyStyle.paddingBottom) || 0;
        let height = Math.ceil(form.getBoundingClientRect().bottom + paddingBottom);

        window.Asc.plugin.executeMethod("ResizeWindow", [window.Asc.plugin.windowID, [WINDOW_WIDTH, height]]);
    }

    window.NumberedEquationWindow = {
        width: WINDOW_WIDTH,
        fit: fitWindowToContent,
    };
})(window, undefined);
