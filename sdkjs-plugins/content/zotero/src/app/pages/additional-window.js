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

        this.#onShow(variation, text, "default");
        this.#window.show(variation);

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
    /**
     * @param {any} content
     */
    showEditWindow(content) {
        this.#window = new window.Asc.PluginWindow();
        const variation = {
            name: "Zotero",
            url: "edit-window.html",
            description: window.Asc.plugin.tr("Edit citation"),
            isVisual: true,
            buttons: [
                {
                    text: window.Asc.plugin.tr("Save"),
                    primary: true,
                    isViewer: false,
                },
                { text: window.Asc.plugin.tr("Cancel"), primary: false },
            ],
            isModal: false,
            EditorsSupport: ["word"],
            size: [380, 150],
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false,
        };

        this.#onShow(variation, content, "default");
        this.#window.show(variation);

        return new Promise((resolve, reject) => {
            window.Asc.plugin.button = async (buttonId, windowId) => {
                const element = await new Promise(resolve => {
					this.#window.attachEvent("onSaveFields", resolve);
					this.#window.command('onClickSave');
				});
                if (buttonId === 0) {
                    resolve(element);
                } else {
                    resolve(null);
                }

                this.#hide();
            };
        });
    }
    
    /**
     * @param {string} description
     * @param {string} text
     */
    showWarningWindow(description, text) {
        this.#window = new window.Asc.PluginWindow();
        const variation = {
            name: "Zotero",
            url: "info-window.html",
            description: window.Asc.plugin.tr(description),
            isVisual: true,
            buttons: [
                {
                    text: window.Asc.plugin.tr("OK"),
                    primary: true,
                    isViewer: false,
                },
            ],
            isModal: false,
            EditorsSupport: ["word"],
            size: [350, 76],
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false,
        };

        this.#onShow(variation, window.Asc.plugin.tr(text), "warning");
        this.#window.show(variation);

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

    /**
     * @param {Object} variation
     * @param {any} content
     * @param {"default" | "warning" | "success"} type
     */
    #onShow(variation, content, type) {
        this.#defaultButtonFn = window.Asc.plugin.button;
        this.#defaultThemeChangedFn = Asc.plugin.onThemeChanged;
        this.#defaultTranslateFn = Asc.plugin.onTranslate;
        window.Asc.plugin.onThemeChanged = (theme) => {
            this.#window.command("onThemeChanged", theme);
            this.#defaultThemeChangedFn(theme);
        };
        window.Asc.plugin.onTranslate = () => {
            this.#window.command("onTranslate");
            this.#defaultTranslateFn();
        };

        this.#window.attachEvent("onWindowReady", () => {
            if (type === "warning") {
                this.#window.command("onWarning", content);
            } else {
                this.#window.command("onAttachedContent", content);
            }
        });

        this.#window.attachEvent(
            "onUpdateHeight",
            (/** @type {number} */ height) => {
                Asc.plugin.executeMethod(
                    "ResizeWindow",
                    [this.#window.id, [variation.size[0] - 2, height]],
                    () => {}
                ); // 2 is the border-width at the window
            }
        );
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
