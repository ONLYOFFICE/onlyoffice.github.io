import { PluginStorage } from './scroll-core/m_storage.js';
import { EditorController } from './scroll-core/m_editor.js';

const plugStore = new PluginStorage(window);
const editorCtrl = new EditorController(window);
let panelWindow = null;

window.Asc.plugin.init = async function () {
    // Add a button to the plugins tab to open the panel
    setupToolbar();

    // If the scroll wasn’t restored in the current session, we try to restore it.
    if (!plugStore.getIsRestoredFlag()) {
        await tryRestoreScroll();
        // Indicate that the score was restored
        // for not to restore it again in this session
        plugStore.setIsRestoredFlag(true);
    }

    // Saving the current position every second
    startTempScrollSaver();    
};

function setupToolbar() {
    // Add a button to the plugins tab to open the panel
    window.Asc.plugin.executeMethod("AddToolbarMenuItem", [{
        guid: window.Asc.plugin.guid,
        tabs: [
            {
                id: "plugins",
                text: "Scroll Panel",
                items: [
                    {
                        id: "openScrollPanelBtn",
                        type: "button",
                        text: "Scroll Panel",
                        hint: "Open Scroll Panel",
                        split: false,
                        enableToggle: false,
                        lockInViewMode: false,
                        icons: "resources/icons/icon%state%(normal)%scale%(default|*).%extension%(svg|png)"
                    },
                ],
            },
        ],
    }]);

    // Click handler for the panel opening button
    window.Asc.plugin.attachToolbarMenuClickEvent("openScrollPanelBtn", function () {
        if (!panelWindow) {
            panelWindow = new window.Asc.PluginWindow();
        }

        panelWindow.show({
            url: "panel.html",
            description: "Scroll Panel",
            type: "panel",
            isVisual: true,
            isViewer: true,
            EditorsSupport: ["pdf"],
            guid: window.Asc.plugin.guid
        });
        panelWindow.activate(true);
    });
}

async function tryRestoreScroll() {
    if (!plugStore.getSaveByCloseFlag()) return;

    let savedView = plugStore.getView();
    let tempSavedView = plugStore.getView(true);

    // if there is a temporary scroll, it becomes the main
    if (tempSavedView !== null && isViewDifferent(savedView, tempSavedView) && plugStore.getSaveByCloseFlag()) {
        savedView = tempSavedView;
        plugStore.saveView(savedView);
    }

    if (savedView === null) return;

    await editorCtrl.setView(savedView);
}

// Timer for saving the current position every second
async function startTempScrollSaver() {
    setInterval(async () => {
        if (!plugStore.getSaveByCloseFlag()) return;

        const currentView = await editorCtrl.getView();

        if (currentView === null) return;

        let tempSavedView = plugStore.getView(true);

        if (tempSavedView === null || isViewDifferent(currentView, tempSavedView)) {
            plugStore.saveView(currentView, true);
        }
    }, 1000);
}

function isViewDifferent(view1, view2) {
    // If one of them is null and the other is not — they are not equal
    if (!view1 || !view2) return view1 !== view2;

    // Compare fields directly
    return view1.x !== view2.x ||
        view1.y !== view2.y ||
        view1.zoom !== view2.zoom;
}

window.Asc.plugin.button = function (id) {
    // ONLYOFFICE passes id = -1 when you click the cross in the sidebar.
    if (Number(id) === -1) {
        panelWindow?.close();
        panelWindow = null;
    }
};
