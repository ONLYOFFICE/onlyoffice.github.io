// @ts-check

/// <reference path="../../types-global.js" />

class AdditionalWindow {
    constructor() {
        this._window = null;
    }

    /**
     * @param {string} fileName
     * @param {string} description
     * @param {string} text
     */
    show(fileName, description, text) {
        const self = this;
        let variation = {
            url: fileName + ".html",
            description: window.Asc.plugin.tr(description),
            isVisual: true,
            /*buttons: [
                {
                    text: window.Asc.plugin.tr("Yes"),
                    primary: true,
                    isViewer: false,
                },
                { text: window.Asc.plugin.tr("No"), primary: false },
            ],*/
            isModal: false,
            EditorsSupport: ["word"],
            size: [400, 310],
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false,
        };

        this._window = new window.Asc.PluginWindow();

        this._window.show(variation);

        this._window.button = function (id) {
            console.log("button", id);
            window.Asc.plugin.executeCommand("close", "");
        };
    }

    hide() {}
}

export { AdditionalWindow };
