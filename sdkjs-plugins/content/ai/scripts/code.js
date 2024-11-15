let settingsWindow = null;
let aiModelsListWindow = null; 
let aiModelEditWindow = null;

let actionsList = [];
let providersList = [];
let aiModelsList = [];

window.Asc.plugin.init = function() {
    getActions();
    getProviders();
    getAiModels();
    addActionButtons();
    window.Asc.plugin.attachToolbarMenuClickEvent('ai-btn-settings', onOpenSettingsModal);
    window.Asc.plugin.attachToolbarMenuClickEvent("ai-action-button", onClickActionButton);
};

window.Asc.plugin.button = function(id, windowId) {
    if (!windowId) {
        return
    }

    if(windowId == settingsWindow.id) {
        window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
    } else if(windowId == aiModelsListWindow.id) {
        window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
        onOpenSettingsModal();
    } else if(windowId == aiModelEditWindow.id) {
        if(id == 0) {
            window.Asc.plugin.executeMethod('SendToWindow', [windowId, 'onSubmit']); 
        } else {
            window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
        }
    }
};

window.Asc.plugin.onThemeChanged = function(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);
    if(settingsWindow) {
        window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onThemeChanged', theme]);
    }
    if(aiModelsListWindow) {
        window.Asc.plugin.executeMethod('SendToWindow', [aiModelsListWindow.id, 'onThemeChanged', theme]);
    }
    if(aiModelEditWindow) {
        window.Asc.plugin.executeMethod('SendToWindow', [aiModelEditWindow.id, 'onThemeChanged', theme]);
    }
}

function addActionButtons() {
    actionsList.forEach(function(action, index) {
        toolbarMenuMainItem["tabs"][0]["items"].push({ 
            id: "ai-action-button",
            type: "big-button",
            text: action.name,
            hint: action.name,
            icons: "resources/icons/%theme-type%(light|dark)/big/" + action.icon + "%scale%(default|*).png",
            data: action.id,
            lockInViewMode: true,
            enableToggle: false,
            separator: index == 0
        });
    });
    Asc.plugin.executeMethod("AddToolbarMenuItem", [toolbarMenuMainItem]);
}

function onClickActionButton(actionId) {
    var findedAction = actionsList.filter(function(action) {
        return action.id == actionId;
    })[0];
    console.log('Click in toolbar: ');
    console.log(findedAction);
}

function onOpenSettingsModal() {
    let location  = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);

    let variation = {
        url : location.href.replace(file, 'settings.html'),
        description : window.Asc.plugin.tr('Set up AI actions'),
        isVisual : true,
        buttons : [],
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [320, 330]
    };

    if (!settingsWindow) {
        settingsWindow = new window.Asc.PluginWindow();
        settingsWindow.attachEvent('onChangeAction', onChangeAction);
        settingsWindow.attachEvent('onOpenAiModelsModal', onOpenAiModelsModal);
        settingsWindow.attachEvent("onInit", function() {
            window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onGetActions', actionsList]);
            window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onResetAiModels', aiModelsList]);
        });
    }
    settingsWindow.show(variation);
}

function onChangeAction(data) {
    var findedAction = actionsList.filter(function(action) {
        return action.id == data.actionId;
    })[0];
    if(findedAction) {
        findedAction.aiModelId = data.aiModelId;
    }
    console.log('Change AI model in action:');
    console.log('action', findedAction);
    console.log('aiModel', aiModelsList.filter(function(model) { return model.id == data.aiModelId })[0]);
}

function onOpenAiModelsModal() {
    if(settingsWindow) {
        window.Asc.plugin.executeMethod('CloseWindow', [settingsWindow.id]);
    }

    let location  = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);

    let variation = {
        url : location.href.replace(file, 'aiModelsList.html'),
        description : window.Asc.plugin.tr('AI Models list'),
        isVisual : true,
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [320, 230]
    };

    if (!aiModelsListWindow) {
        aiModelsListWindow = new window.Asc.PluginWindow();
        aiModelsListWindow.attachEvent("onInit", function() {
            window.Asc.plugin.executeMethod('SendToWindow', [aiModelsListWindow.id, 'onResetAiModels', aiModelsList]);
        });
        aiModelsListWindow.attachEvent("onOpenEditModal", onOpenEditModal);
        aiModelsListWindow.attachEvent("onDeleteAiModel", onDeleteAiModel);
    }
    aiModelsListWindow.show(variation);
}

function onOpenEditModal(data) {
    let location  = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);

    let variation = {
        url : location.href.replace(file, 'aiModelEdit.html'),
        description : data.type == 'add' ? window.Asc.plugin.tr('Create AI Model') : window.Asc.plugin.tr('Edit AI Model'),
        isVisual : true,
        buttons : [ 
            { text: "OK", primary: true },
            { text: "Cancel", primary: false },
        ],
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [320, 280]
    };

    if (!aiModelEditWindow) {
        aiModelEditWindow = new window.Asc.PluginWindow();
        aiModelEditWindow.attachEvent("onAddAiModel", onAddAiModel);
        aiModelEditWindow.attachEvent("onEditAiModel", onEditAiModel);
        aiModelEditWindow.attachEvent("onAddProvider", onAddProvider);
    }
    aiModelEditWindow.attachEvent("onInit", function() {
        window.Asc.plugin.executeMethod('SendToWindow', [aiModelEditWindow.id, 'onGetProviders', providersList]);
        window.Asc.plugin.executeMethod('SendToWindow', [aiModelEditWindow.id, 'onGetOptions', {
            type: data.type,
            aiModel: data.aiModel || null
        }]);     
    });
    aiModelEditWindow.show(variation);
}

function onDeleteAiModel(aiModel) {
    aiModelsList = aiModelsList.filter(function(el) {
        return el.id != aiModel.id;
    });
    window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onResetAiModels', aiModelsList]);
    console.log('Delete AI model:');
    console.log(aiModel);
}

function onAddAiModel(data) {
    var addedModel = {
        id: createGuid(),
        name: data.name,
        provider: data.provider,
        key: data.key,
        model: data.model
    };
    aiModelsList.push(addedModel);
    window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onResetAiModels', aiModelsList]);
    window.Asc.plugin.executeMethod('SendToWindow', [aiModelsListWindow.id, 'onAddAiModel', addedModel]);
    window.Asc.plugin.executeMethod('CloseWindow', [aiModelEditWindow.id]);
    console.log('Add AI model:');
    console.log(addedModel);
}

function onEditAiModel(aiModel) {
    var aiModelInList = aiModelsList.filter(function(el) {
        return el.id == aiModel.id;
    })[0];
    if(aiModelInList) {
        for (var key in aiModel) {
			if (aiModelInList[key]) {
				aiModelInList[key] = aiModel[key];
			}
		}

        window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onResetAiModels', aiModelsList]);
        window.Asc.plugin.executeMethod('SendToWindow', [aiModelsListWindow.id, 'onEditAiModel', aiModelInList]);
    }
    window.Asc.plugin.executeMethod('CloseWindow', [aiModelEditWindow.id]);
    console.log('Edit AI model:');
    console.log(aiModel);
}

function onAddProvider(provider) {
    var addedProvider = {
        id: provider.name,
        name: provider.name,
        url: provider.url
    };
    providersList.push(addedProvider);
    console.log('Add Provider:');
    console.log(addedProvider);
}

function createGuid(a,b) {
    for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'');
    return b
}


// Method from SDK
function getActions() {
    actionsList = [
        { id: 'c4e186c6cd274461bfe14e1f12b02655', name: 'Ask AI', aiModelId: 'e41183e0b42547d4810b60ad0138bfaf', icon: 'ask-ai'},
        { id: '37b09f7ba40c490eb1f6ef30911ac91d', name: 'Summarization', aiModelId: '0bb492078d9e4eb2b1b99d349bb6d6b7', icon: 'summarization'},
        { id: '27eabf8d5aac464ab38c2bba100d09c1', name: 'Text to image', aiModelId: '826043bb87584e5194b2aac7436cd387', icon: 'text-to-image'},
        { id: '20186033ce444321b3603afd6c0aae91', name: 'Translation', aiModelId: '0e9c01f4901c42a4857fe721a10d2a3a', icon: 'translation'}
    ];
}
function getProviders() {
    providersList = [
        { id: '1e4b4bc60ee841d982877a00028b4196', name: 'Chat GPT', url: 'https://chatgpt.com'},
        { id: '2fba24f503ee4097a82271763cf22a2a', name: 'Yandex GPT', url: 'https://ya.ru/ai/gpt-3'},
        { id: '8bd7e5903807436290bf3273126b5df1', name: 'Ollama', url: 'https://ollama.com'},
        { id: '264033a11758423d94a536ec1bf85156', name: 'DeepSeek', url: 'https://www.deepseek.com'}
    ];
}
function getAiModels() {
    aiModelsList = [
        { id: 'e41183e0b42547d4810b60ad0138bfaf', name: 'Chat GPT', provider: '1e4b4bc60ee841d982877a00028b4196', model: 'gpt-3.5-turbo', key: 'key-for-chatgpt'},
        { id: '0bb492078d9e4eb2b1b99d349bb6d6b7', name: 'Yandex GPT', provider: '2fba24f503ee4097a82271763cf22a2a', model: 'gpt 2', key: 'key-for-yandexpgt'},
        { id: '826043bb87584e5194b2aac7436cd387', name: 'Ollama', provider: '8bd7e5903807436290bf3273126b5df1', model: 'Gemma 2', key: 'key-for-ollama'},
        { id: '0e9c01f4901c42a4857fe721a10d2a3a', name: 'DeepSeek', provider: '264033a11758423d94a536ec1bf85156', model: 'Coder-V2', key: 'key-for-deepseek'}
    ];
}
