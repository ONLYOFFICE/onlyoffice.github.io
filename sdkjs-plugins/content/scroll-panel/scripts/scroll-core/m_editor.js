export class EditorController {
    /** @type {Window} */
    #win;

    /**
     * @param {Window} win
     */
    constructor(win = window) {
        this.#win = win;
    }

    /**
     * @typedef { Object } ViewState
     * @property { number } x - Scroll X coordinate
     * @property { number } y - Scroll Y coordinate
     * @property { number } zoom - Zoom level (in percentages, e.g. 130)
     */

    /**
     * @returns {ViewState | null} The state object or null if there is no data.
     */
    getView() {
        try {
            const scrollInfo = this.#win?.parent?.Asc?.editor?.getCurScroll();
            const zoomText = this.#win?.parent?.document?.querySelector('#label-zoom')?.textContent;

            const res = {
                x: scrollInfo?.x ?? null,
                y: scrollInfo?.y ?? null,
                zoom: zoomText ? Number(zoomText.replace(',', '.').match(/[\d.]+/)?.[0]) : null
            };

            // If at least one of the values is null, undefined, or NaN - return null.
            const hasInvalidValue = Object.values(res).some(
                val => val === null || val === undefined || Number.isNaN(val)
            );

            return hasInvalidValue ? null : res;
        } catch (e) {
            return null;
        }
    }

    /**
     * @param {ViewState | null} view - The state object or null if there is no data.
     */
    setView(view) {
        if (view) {
            this.#win?.parent?.Asc?.editor.zoom(view.zoom);
            this.#win?.parent?.Asc?.editor.scrollToXY(view.x, view.y);
        }
    }
}