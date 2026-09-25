import { PluginStorage } from './scroll-core/m_storage.js';
import { EditorController } from './scroll-core/m_editor.js';

export class PluginUIController {
    /** @type {Window} */
    #win;
    /** @type {PluginStorage} */
    #plugStore;
    /** @type {EditorController} */
    #editorCtrl;

    // Cache of DOM elements
    #el_viewCard;
    #el_clearPositionBtn
    #el_saveBtn;
    #el_moveOnOpenCb;
    #el_saveOnCloseCb;
    #el_clearAllBtn;

    #text_viewCard;
    #text_clearPositionBtn;
    #text_savePositionBtn;
    #text_pluginSettings;
    #text_moveOnOpenCheckbox;
    #text_saveOnCloseCheckbox;
    #text_clearAllBtn;

    /**
     * @param {Window} win 
     * @param {PluginStorage} plugStore - A wrapper object over localStorage
     * @param {EditorController} editorCtrl - A controller for managing the editor
     */
    constructor(win, plugStore, editorCtrl) {
        this.#win = win;
        this.#plugStore = plugStore;
        this.#editorCtrl = editorCtrl;
    }

    // Initialization of UI: searching for elements and binding events
    initUI() {
        this.#cacheElements();
        this.#bindEvents();
        this.update();
    }

    #cacheElements() {
        this.#el_viewCard = this.#win.document.getElementById('viewCard');
        this.#el_clearPositionBtn = this.#win.document.getElementById('clearPositionBtn');
        this.#el_saveBtn = this.#win.document.getElementById('savePositionBtn');
        this.#el_moveOnOpenCb = this.#win.document.getElementById('moveOnOpenCheckbox');
        this.#el_saveOnCloseCb = this.#win.document.getElementById('saveOnCloseCheckbox');
        this.#el_clearAllBtn = this.#win.document.getElementById("clearAllBtn");


        this.#text_viewCard = this.#win.document.getElementById('text_viewCard');
        this.#text_clearPositionBtn = this.#win.document.getElementById('text_clearPositionBtn');
        this.#text_savePositionBtn = this.#win.document.getElementById('text_savePositionBtn');
        this.#text_pluginSettings = this.#win.document.getElementById('text_pluginSettings');
        this.#text_moveOnOpenCheckbox = this.#win.document.getElementById('text_moveOnOpenCheckbox');
        this.#text_saveOnCloseCheckbox = this.#win.document.getElementById('text_saveOnCloseCheckbox');
        this.#text_clearAllBtn = this.#win.document.getElementById('text_clearAllBtn');
    }

    #bindEvents() {
        // Use arrow functions so as not to lose the `this` of the class.

        this.#el_clearPositionBtn?.addEventListener('click', () => {
            this.#plugStore.removeView()
            this.update();

        });

        this.#el_viewCard?.addEventListener('click', () => {
            let savedView = this.#plugStore.getView();
            this.#editorCtrl.setView(savedView);
        });

        this.#el_saveBtn?.addEventListener('click', async () => {
            let view = this.#editorCtrl.getView();
            this.#plugStore.saveView(view);
            this.update();
        });

        this.#el_moveOnOpenCb?.addEventListener('change', (e) => {
            this.#plugStore.setMoveByOpenFlag(e.target.checked);
            this.update();
        });

        this.#el_saveOnCloseCb?.addEventListener('change', (e) => {
            this.#plugStore.setSaveByCloseFlag(e.target.checked);
            this.update();
        });

        this.#el_clearAllBtn?.addEventListener('click', () => {
            this.#plugStore.clearAll();
            this.update();
        });
    }

    update() {
        this.updViewInfo();
        this.updMoveOnOpenCheckbox();
        this.updSaveOnCloseCheckbox();
    }

    #tr(key, fallbackText) {
        const translation = this.#win.Asc.plugin.tr(key);
        // If the translation is not found, ONLYOFFICE returns the `key` itself.
        return (!translation || translation === key) ? fallbackText : translation;
    }

    translate() {
        // Update all text elements with translations

        // update text_viewCard
        this.updViewInfo();


        if (this.#text_clearPositionBtn) {
            this.#text_clearPositionBtn.innerHTML = this.#tr("text_clearPositionBtn", "Clear position");
        }
        if (this.#text_savePositionBtn) {
            this.#text_savePositionBtn.innerHTML = this.#tr("text_savePositionBtn", "Save position");
        }
        if (this.#text_pluginSettings) {
            this.#text_pluginSettings.innerHTML = this.#tr("text_pluginSettings", "PLUGIN SETTINGS");
        }
        if (this.#text_moveOnOpenCheckbox) {
            this.#text_moveOnOpenCheckbox.innerHTML = this.#tr("text_moveOnOpenCheckbox", "Go to saved position on open");
        }
        if (this.#text_saveOnCloseCheckbox) {
            this.#text_saveOnCloseCheckbox.innerHTML = this.#tr("text_saveOnCloseCheckbox", "Save position on close");
        }
        if (this.#text_clearAllBtn) {
            this.#text_clearAllBtn.innerHTML = this.#tr("text_clearAllBtn", "Clear all");
        }
    }

    updViewInfo() {
        if (!this.#el_viewCard || !this.#text_viewCard) return;

        const savedView = this.#plugStore.getView();

        if (!savedView) {
            this.#text_viewCard.innerHTML = this.#tr("text_viewCard", "Document opened for the first time, saved position not found");
            this.#el_viewCard.classList.add('disabled');

            // Make the button invisible, but leave space for it
            if (this.#el_clearPositionBtn) {
                this.#el_clearPositionBtn.disabled = true;
            }
        } else {
            this.#el_viewCard.classList.remove('disabled');
            this.#text_viewCard.innerHTML = `
            <div>x: <span class="val">${Number(savedView.x).toFixed(2)}</span></div>
            <div>y: <span class="val">${Number(savedView.y).toFixed(2)}</span></div>
            <div>zoom: <span class="val">${savedView.zoom}%</span></div>
        `;

            // Show the button
            if (this.#el_clearPositionBtn) {
                this.#el_clearPositionBtn.disabled = false;
            }
        }
    }

    updMoveOnOpenCheckbox() {
        if (this.#el_moveOnOpenCb) {
            this.#el_moveOnOpenCb.checked = this.#plugStore.getMoveByOpenFlag();
        }
    }

    updSaveOnCloseCheckbox() {
        if (this.#el_saveOnCloseCb) {
            this.#el_saveOnCloseCb.checked = this.#plugStore.getSaveByCloseFlag();
        }
    }
}
