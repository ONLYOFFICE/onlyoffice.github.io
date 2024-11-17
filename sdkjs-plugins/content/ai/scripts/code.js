let settingsWindow = null;
let aiModelsListWindow = null; 
let aiModelEditWindow = null;

let initCounter = 0;
function initWithTranslate() {
    initCounter++;
    if (2 === initCounter) {
        Asc.Buttons.registerContextMenu();
        Asc.Buttons.registerToolbarMenu();    
    }
}

window.Asc.plugin.init = function() {
    initWithTranslate();
};

window.Asc.plugin.onTranslate = function() {
    initWithTranslate();
};

window.Asc.plugin.button = function(id, windowId) {
    if (!windowId) {
        return
    }

    if (settingsWindow && windowId === settingsWindow.id) {
        settingsWindow.close();
        settingsWindow = null;
    } else if (aiModelsListWindow && windowId === aiModelsListWindow.id) {
        aiModelsListWindow.close();
        aiModelsListWindow = null;
        onOpenSettingsModal();
    } else if (aiModelEditWindow && windowId === aiModelEditWindow.id) {
        if (id == 0) {
            aiModelEditWindow.command('onSubmit');
        } else {
            aiModelEditWindow.close();
            aiModelEditWindow = null;
        }
    } else {
        window.Asc.plugin.executeMethod("CloseWindow", [windowId]);
    }
};

window.Asc.plugin.onThemeChanged = function(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);

    settingsWindow && settingsWindow.command('onThemeChanged', theme);
    aiModelsListWindow && aiModelsListWindow.command('onThemeChanged', theme);
    aiModelEditWindow && aiModelEditWindow.command('onThemeChanged', theme);
};

/**
 * ACTIONS WINDOW
 */
function updateModels() {
    if (!AI.storage.onChangeStorage) {
        AI.storage.onChangeStorage = function() {
            updateModels();
        };
    }

    let models = AI.storage.getModels();
    if (settingsWindow)
        settingsWindow.command('onUpdateModels', models);
    if (aiModelsListWindow)
        aiModelsListWindow.command('onUpdateModels', models);
}
function updateActions() {
    if (settingsWindow)
        settingsWindow.command('onUpdateActions', AI.ActionsGetSorted());
}

function onOpenSettingsModal() {
    let variation = {
        url : 'settings.html',
        description : window.Asc.plugin.tr('Set up AI actions'),
        isVisual : true,
        buttons : [],
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [320, 350]
    };

    if (!settingsWindow) {
        settingsWindow = new window.Asc.PluginWindow();
        settingsWindow.attachEvent("onInit", function() {
            updateActions();
            updateModels();
        });
        settingsWindow.attachEvent('onChangeAction', function(data){
            AI.ActionsChange(data.id, data.model);
        });
        settingsWindow.attachEvent('onOpenAiModelsModal', onOpenAiModelsModal);
    }
    settingsWindow.show(variation);
}

/**
 * MODELS WINDOW
 */
function onOpenAiModelsModal() {
    if (settingsWindow) {
        settingsWindow.close();
        settingsWindow = null;
    }

    let variation = {
        url : 'aiModelsList.html',
        description : window.Asc.plugin.tr('AI Models list'),
        isVisual : true,
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [320, 230]
    };

    if (!aiModelsListWindow) {
        aiModelsListWindow = new window.Asc.PluginWindow();
        aiModelsListWindow.attachEvent("onInit", function() {
            updateModels();
        });
        aiModelsListWindow.attachEvent("onOpenEditModal", onOpenEditModal);
        aiModelsListWindow.attachEvent("onDeleteAiModel", function(data) {
            AI.storage.removeModel(data.name);
        });
    }
    aiModelsListWindow.show(variation);
}

/**
 * ADD/EDIT WINDOW
 */
function onOpenEditModal(data) {
    let variation = {
        url : 'aiModelEdit.html',
        description : data.type == 'add' ? window.Asc.plugin.tr('Create AI Model') : window.Asc.plugin.tr('Edit AI Model'),
        isVisual : true,
        buttons : [ 
            { text: "OK", primary: true },
            { text: "Cancel", primary: false },
        ],
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [320, 350]
    };

    aiModelEditWindow = new window.Asc.PluginWindow();
    aiModelEditWindow.attachEvent("onChangeModel", function(model){
        onChangeModel(model);
        aiModelEditWindow.close();
        aiModelEditWindow = null;
    });
    aiModelEditWindow.attachEvent("onGetModels", function(provider){
        AI.getModels(provider).then(function(data){
            let models = [];
            if (data.error === 0 && data.data)
                models = new Array(data.data.length);
            for (let i = 0, len = models.length; i < len; i++)
                models[i] = data.data[i].id;
            aiModelEditWindow.command("onGetModels", models);
        });
    });

    aiModelEditWindow.attachEvent("onInit", function() {
        aiModelEditWindow.command('onModelInfo', {
            model : data.model ? AI.storage.getModel(data.model.name) : null,
            providers : AI.providers
        });
    });
    aiModelEditWindow.show(variation);
}

function onChangeModel(model) {
    /**
     * {
     *   provider : {
     *     name : "",
     *     models : [],
     *     key
     *   },
     *   name : ""
     * }
     */
    AI.storage.addModel(model);
}
