let settingsWindow = null;
let aiModelsListWindow = null; 
let aiModelEditWindow = null;
let summarizationWindow = null;

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
	summarizationWindow && summarizationWindow.command('onThemeChanged', theme);
};

/**
 * ACTIONS WINDOW
 */
function updateModels() {
	if (!AI.Storage.onChangeStorage) {
		AI.Storage.onChangeStorage = function() {
			updateModels();
		};
	}

	let models = AI.Storage.serializeModels();
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
		description : window.Asc.plugin.tr('AI configuration'),
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
			AI.Storage.removeModel(data.id);
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
		description : data.type == 'add' ? window.Asc.plugin.tr('Add AI Model') : window.Asc.plugin.tr('Edit AI Model'),
		isVisual : true,
		buttons : [ 
			{ text: window.Asc.plugin.tr('OK'), primary: true },
			{ text: window.Asc.plugin.tr('Cancel'), primary: false },
		],
		isModal : true,
		EditorsSupport : ["word", "slide", "cell"],
		size : [320, 325]
	};

	aiModelEditWindow = new window.Asc.PluginWindow();
	aiModelEditWindow.attachEvent("onChangeModel", function(model){
		AI.Storage.addModel(model);
		aiModelEditWindow.close();
		aiModelEditWindow = null;
	});
	aiModelEditWindow.attachEvent("onGetModels", async function(provider){
		let models = await AI.getModels(provider);
		aiModelEditWindow && aiModelEditWindow.command("onGetModels", models);
	});

	aiModelEditWindow.attachEvent("onInit", function() {
		aiModelEditWindow.command('onModelInfo', {
			model : data.model ? AI.Storage.getModelByName(data.model.name) : null,
			providers : AI.serializeProviders()
		});
	});
	aiModelEditWindow.show(variation);
}

/**
 * SUMMARIZATION WINDOW
 */
function onOpenSummarizationModal() {
    let variation = {
        url : 'summarization.html',
        description : window.Asc.plugin.tr('Summarization'),
        isVisual : true,
        buttons : [],
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [720, 310]
    };

    summarizationWindow = new window.Asc.PluginWindow();
    summarizationWindow.attachEvent("onInit", function() {

    });
    summarizationWindow.show(variation);
}
