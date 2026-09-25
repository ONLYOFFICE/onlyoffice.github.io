import { PluginStorage } from './scroll-core/m_storage.js';
import { EditorController } from './scroll-core/m_editor.js';

const plugStore = new PluginStorage(window);
const editorCtrl = new EditorController(window);

window.Asc.plugin.init = function () {
    tryRestoreScroll();
    startTempScrollSaver();
};

// Минималистичный таймер, который почти не тратит CPU
function startTempScrollSaver() {
    setInterval(() => {
        if (!plugStore.getSaveByCloseFlag()) return;

        const currentView = editorCtrl.getView();

        if (currentView === null) return;

        let tempSavedView = plugStore.getView(true);

        if (tempSavedView === null || isViewDifferent(currentView, tempSavedView)) {
            plugStore.saveView(currentView, true);
        }
    }, 1000);
}

function isViewDifferent(view1, view2) {
    // Если один из них null, а другой нет — они не равны
    if (!view1 || !view2) return view1 !== view2;

    // Сравниваем поля напрямую
    return view1.x !== view2.x ||
        view1.y !== view2.y ||
        view1.zoom !== view2.zoom;
}

function tryRestoreScroll() {
    if (plugStore.getMoveByOpenFlag()) {
        let savedView = plugStore.getView();
        let tempSavedView = plugStore.getView(true);

        // При загрузке плагина, если есть временный скролл, то он становится основным
        if (tempSavedView !== null && isViewDifferent(savedView, tempSavedView) && plugStore.getSaveByCloseFlag()) {
            savedView = tempSavedView;
            plugStore.saveView(savedView);
        }

        if (savedView === null) return;

        editorCtrl.setView(savedView);
    }
}