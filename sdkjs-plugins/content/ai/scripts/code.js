let settingsWindow = null;
let actionsList = [];
let aiModelsList = [];

window.Asc.plugin.init = function() {
    getActions();
    getAiModels();
    window.Asc.plugin.attachToolbarMenuClickEvent('ai-btn-settings', onClickSettings);
};

function onClickSettings() {
    let location  = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);

    // default settings for modal window (I created separate settings, because we have many unnecessary field in plugin variations)
    let variation = {
        url : location.href.replace(file, 'settings.html'),
        description : window.Asc.plugin.tr('Set up AI actions'),
        isVisual : true,
        buttons : [],
        isModal : true,
        EditorsSupport : ["word", "slide", "cell"],
        size : [375, 465]
    };

    if (!settingsWindow) {
        settingsWindow = new window.Asc.PluginWindow();
        settingsWindow.attachEvent("requestActions", function() {
            window.Asc.plugin.executeMethod('SendToWindow', [settingsWindow.id, 'responseActions', actionsList])
        });
    }
    settingsWindow.show(variation);
}

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

function methodName() {
    console.log('test');
    return 'leha';
}

// Method from SDK
function getActions() {
    actionsList = [
        {name: 'Ask AI', aiModel: 'Chat GPT', icon: 'ask-ai'},
        {name: 'Summarization', aiModel: 'Chat GPT', icon: 'summarization'},
        {name: 'Text to image', aiModel: 'Ollama', icon: 'text-to-image'},
        {name: 'Translation', aiModel: 'Chat GPT', icon: 'translation'}
    ];

    actionsList.forEach(function(action, index) {
        toolbarMenuMainItem["tabs"][0]["items"].push({ 
            id: "ai-action-button",
            type: "big-button",
            text: action.name,
            hint: action.name,
            icons: "resources/icons/%theme-type%(light|dark)/big/" + action.icon + "%scale%(default|*).png",
            data: null,
            lockInViewMode: true,
            enableToggle: false,
            separator: index == 0
        });
    });
    Asc.plugin.executeMethod("AddToolbarMenuItem", [toolbarMenuMainItem]);
}

function getAiModels() {
    
}
