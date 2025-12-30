// @ts-check

/// <reference path="../types-global.js" />

class AdditionalWindow {
    #window;
    #defaultButtonFn;
    #defaultThemeChangedFn;
    #defaultTranslateFn;

    constructor() {
        this.#window = new window.Asc.PluginWindow();
        this.#defaultButtonFn = window.Asc.plugin.button;
        this.#defaultThemeChangedFn = Asc.plugin.onThemeChanged;
        this.#defaultTranslateFn = Asc.plugin.onTranslate;
    }

    /**
     * @param {string} description
     * @param {string} text
     */
    show(description, text) {
        this.#window = new window.Asc.PluginWindow();
        this.#defaultButtonFn = window.Asc.plugin.button;
        this.#defaultThemeChangedFn = Asc.plugin.onThemeChanged;
        this.#defaultTranslateFn = Asc.plugin.onTranslate;
        const variation = {
            name: "Zotero",
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
            size: [380, 240],
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false,
        };

        this.#window.show(variation);

        window.Asc.plugin.onThemeChanged = (theme) => {
            this.#window.command("onThemeChanged", theme);
            this.#defaultThemeChangedFn(theme);
        };
        window.Asc.plugin.onTranslate = () => {
            this.#window.command("onTranslate");
            this.#defaultTranslateFn();
        };

        this.#window.attachEvent("onWindowReady", () => {
            this.#window.command("onAttachedText", text);
        });

        return new Promise((resolve, reject) => {
            window.Asc.plugin.button = (buttonId, windowId) => {
                if (buttonId === 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }

                this.#hide();
            };
        });
    }

    #hide() {
        if (this.#window) {
            this.#window.close();
        }
        window.Asc.plugin.button = this.#defaultButtonFn;
        window.Asc.plugin.onThemeChanged = this.#defaultThemeChangedFn;
    }

    destroy() {
        this.#hide();
        this.#window = null;
    }
}

export { AdditionalWindow };
