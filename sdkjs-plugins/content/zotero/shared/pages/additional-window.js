// @ts-check

/// <reference path="../types-global.js" />
/// <reference types="@onlyoffice/doceditor-plugin-types" />

import { CslHtmlParser } from "../services/csl-html-parser";

/** @typedef {import("@onlyoffice/doceditor-plugin-types").PluginWindow} PluginWindow */
/** @typedef {import("@onlyoffice/doceditor-plugin-types").VariationConfig} VariationConfig */

class AdditionalWindow {
    /** @type {PluginWindow | null} */
    #window;
    #defaultButtonFn;
    #defaultThemeChangedFn;
    #defaultTranslateFn;

    constructor() {
        this.#window = null;
        this.#defaultButtonFn = window.Asc.plugin.button;
        this.#defaultThemeChangedFn = Asc.plugin.onThemeChanged;
        this.#defaultTranslateFn = Asc.plugin.onTranslate;
    }

    /**
     * @param {string} description
     * @param {string} text
     */
    show(description, text) {
        if (this.#window) {
            this.#hide();
        }
        this.#window = new window.Asc.PluginWindow();
        /** @type {VariationConfig} */
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
        if (this.#window) {
            this.#hide();
        }
        /**
         * @type {{min: [number, number], max: [number, number]}}
         */
        const EDIT_WINDOW_SIZE_LIMITS = {
            min: [380, 200],
            max: [600, 1000],
        };
        this.#window = new window.Asc.PluginWindow();
        /** @type {VariationConfig} */
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
			fixedSize : false,
            isViewer: true,
            isDisplayedInViewer: false,
            isInsideMode: false,
        };

        this.#onShow(variation, content, "default", EDIT_WINDOW_SIZE_LIMITS);
        this.#window.show(variation);

        return new Promise((resolve, reject) => {
            window.Asc.plugin.button = async (buttonId, windowId) => {
                const element = await new Promise(resolve => {
                    if (!this.#window) {
                        resolve(null);
                        return;
                    }
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
     * @param {"default" | "warning" | "success"} [type]
     */
    showInfoWindow(description, text, type) {
        if (this.#window) {
            this.#hide();
        }
        if (typeof type !== "string") {
            type = "warning";
        }
        this.#window = new window.Asc.PluginWindow();
        /** @type {VariationConfig} */
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

        this.#onShow(variation, window.Asc.plugin.tr(text), type);
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
     * @param {VariationConfig} variation
     * @param {any} content
     * @param {"default" | "warning" | "success"} type
     * @param {{min: [number, number], max: [number, number]}} [sizeLimits]
     */
    #onShow(variation, content, type, sizeLimits) {
        if (!this.#window) return;
        this.#defaultButtonFn = window.Asc.plugin.button;
        this.#defaultThemeChangedFn = Asc.plugin.onThemeChanged;
        this.#defaultTranslateFn = Asc.plugin.onTranslate;
        window.Asc.plugin.onThemeChanged = (theme) => {
            this.#window?.command("onThemeChanged", theme);
            this.#defaultThemeChangedFn(theme);
        };
        window.Asc.plugin.onTranslate = () => {
            this.#window?.command("onTranslate");
            this.#defaultTranslateFn();
        };

        this.#window.attachEvent("onWindowReady", () => {
            if (type === "warning") {
                this.#window?.command("onWarning", content);
            } else if (type === "success") {
                this.#window?.command("onSuccess", content);
            } else {
                this.#window?.command("onAttachedContent", content);
            }
        });

        this.#window.attachEvent(
            "onUpdateHeight",
            (/** @type {number} */ height) => {
                const args = [this.#window?.id, [variation.size[0] - 2, height]];
                if (sizeLimits) {
                    args.push(sizeLimits.min);
                    args.push(sizeLimits.max);
                }
                Asc.plugin.executeMethod("ResizeWindow", args, () => {});
            }
        );
    }

    #hide() {
        if (this.#window) {
            this.#window.close();
            this.#window = null;
        }
        window.Asc.plugin.button = this.#defaultButtonFn;
        window.Asc.plugin.onThemeChanged = this.#defaultThemeChangedFn;
    }
}

export { AdditionalWindow };
