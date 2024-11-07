let settingsWindow = null;
let actionsList = [];
let aiModelsList = [];

window.Asc.plugin.init = function() {
    getActions();
    getAiModels();
    addActionButtons();
    window.Asc.plugin.attachToolbarMenuClickEvent('ai-btn-settings', onClickSettingButton);
    window.Asc.plugin.attachToolbarMenuClickEvent("ai-action-button", onClickActionButton);
};

window.Asc.plugin.button = function(id, windowId) {
	if (!settingsWindow)
		return;

	if (windowId) {
		switch (id) {
			case -1:
			default:
				window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
		}
	}
};

window.Asc.plugin.onThemeChanged = function(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);
    if(settingsWindow) {
        window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onThemeChanged', theme]);
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
            data: action.name,
            lockInViewMode: true,
            enableToggle: false,
            separator: index == 0
        });
    });
    Asc.plugin.executeMethod("AddToolbarMenuItem", [toolbarMenuMainItem]);
};

function onClickActionButton(action) {
    console.log(action);
}

function onClickSettingButton() {
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
        settingsWindow.attachEvent("onInit", function() {
            window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onGetAiModels', aiModelsList]);
            window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'onGetActions', actionsList]);
        });
    }
    settingsWindow.show(variation);
}

// Method from SDK
function getActions() {
    actionsList = [
        { id: 1, name: 'Ask AI', aiModel: 'Chat GPT', icon: 'ask-ai'},
        { id: 2, name: 'Summarization', aiModel: 'Chat GPT', icon: 'summarization'},
        { id: 3, name: 'Text to image', aiModel: 'Ollama', icon: 'text-to-image'},
        { id: 4, name: 'Translation', aiModel: 'Chat GPT', icon: 'translation'}
    ];
}
function getAiModels() {
    aiModelsList = [
        { id: 1, name: 'Chat GPT', aiModel: 'Chat GPT'},
        { id: 2, name: 'Yandex GPT', aiModel: 'Yandex GPT'},
        { id: 3, name: 'Ollama', aiModel: 'Ollama'},
        { id: 4, name: 'DeepSeek', aiModel: 'DeepSeek'}
    ];
}
