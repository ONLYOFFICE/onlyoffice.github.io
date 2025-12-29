// @ts-check

/// <reference path="../../types-global.js" />

class AdditionalWindow {
    #window;

    constructor() {
        this.#window = new window.Asc.PluginWindow();
    }

    /**
     * @param {string} fileName
     * @param {string} description
     * @param {string} text
     */
    show(fileName, description, text) {
        const variation = {
            url: "info-window.html",
            description: window.Asc.plugin.tr(description),
            isVisual: true,
            buttons: [
                {
                    text: window.Asc.plugin.tr("Yes"),
                    primary: true,
                    isViewer: false,
                },
                { text: window.Asc.plugin.tr("No"), primary: false },
            ],
            isModal: false,
            EditorsSupport: ["word"],
            size: [300, 120],
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false,
        };

        this.#window.show(variation);

        return new Promise((resolve, reject) => {
            window.Asc.plugin.button = (buttonId, windowId) => {
                if (buttonId === 0) {
                    console.log("yes");
                    resolve(true);
                } else {
                    console.log("no");
                    resolve(false);
                }
                this.#window.close();
            };
        });
    }

    hide() {
        if (this.#window) {
            this.#window.close();
        }
    }

    destroy() {
        this.#window.close();
        this.#window = null;
        window.Asc.plugin.button = () => {};
    }
}

export { AdditionalWindow };
