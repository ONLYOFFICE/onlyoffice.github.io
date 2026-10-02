export class PluginStorage {
    // Private variables for storing state
    /** @type {Window} */
    #win;
    /** @type {String} */
    #prefix;
    /** @type {Boolean} */
    #idMoveByOpenFlag;
    /** @type {Boolean} */
    #idSaveByCloseFlag;

    /**
     * @param {Window} win
     */
    constructor(win = window) {
        this.#win = win;
        this.#prefix = "oautoscroll_plugin_";
        this.#idMoveByOpenFlag = this.#prefix + "move_by_open";
        this.#idSaveByCloseFlag = this.#prefix + "save_by_close";
    }

    getIdDoc() {
        return this.#prefix + (this.#win.Asc?.plugin?.info?.documentTitle || "default_doc");
    }

    getTempIdDoc() {
        return this.#prefix + "temp_" + (this.#win.Asc?.plugin?.info?.documentTitle || "default_doc");
    }

    /**
     * @typedef { Object } ViewState
     * @property { number } x - Scroll X coordinate
     * @property { number } y - Scroll Y coordinate
     * @property { number } zoom - Zoom level (in percentages, e.g. 130)
     */

    /**
     * Save the view state to localStorage
     * @param {ViewState | null} view - The state object or null
     * @param {boolean} [isTemp=false] - Flag for temporary storage
     */
    saveView(view, isTemp = false) {
        if (!view) return;

        let storageKey = isTemp ? this.getTempIdDoc() : this.getIdDoc();

        try {
            localStorage.setItem(storageKey, JSON.stringify(view));
        } catch (e) {
            console.error("PluginStorage [saveView]: ", e);
        }
    }

    /**
     * Get the saved display state from localStorage.
     * 
     * @param {boolean} [isTemp=false] - Flag for reading from temporary storage
     * @returns {ViewState | null} The state object or null if there is no data
     */
    getView(isTemp = false) {
        let storageKey = isTemp ? this.getTempIdDoc() : this.getIdDoc();
        const rawData = localStorage.getItem(storageKey);
        if (!rawData) return null;

        try {
            const parsedData = JSON.parse(rawData);
            if (typeof parsedData === 'object' && parsedData !== null) {
                return parsedData;
            }
        } catch (e) {
            console.error("PluginStorage [getView]: ", e);
        }

        return null;
    }

    /**
     * @param {boolean} [isTemp=false] - Flag for reading from temporary storage
     */
    removeView(isTemp = false) {
        let storageKey = isTemp ? this.getTempIdDoc() : this.getIdDoc();
        localStorage.removeItem(storageKey);
    }

    // --- Settings (Checkboxes) ---

    getMoveByOpenFlag() {
        const rawData = localStorage.getItem(this.#idMoveByOpenFlag);
        return rawData ? JSON.parse(rawData) : false;
    }

    setMoveByOpenFlag(flag) {
        if (flag) {
            try {
                localStorage.setItem(this.#idMoveByOpenFlag, flag.toString());
            } catch (e) {
                console.error("PluginStorage [setMoveByOpenFlag]: ", e);
            }
        } else {
            localStorage.removeItem(this.#idMoveByOpenFlag);
        }
    }

    getSaveByCloseFlag() {
        const rawData = localStorage.getItem(this.#idSaveByCloseFlag);
        return rawData ? JSON.parse(rawData) : false;
    }

    setSaveByCloseFlag(flag) {
        if (flag) {
            try {
                localStorage.setItem(this.#idSaveByCloseFlag, flag.toString());
            } catch (e) {
                console.error("PluginStorage [setSaveByCloseFlag]: ", e);
            }
        } else {
            localStorage.removeItem(this.#idSaveByCloseFlag);
        }
    }

    count() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.#prefix)) {
                total++;
            }
        }
        return total;
    }

    clearAll() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.#prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
    }
}