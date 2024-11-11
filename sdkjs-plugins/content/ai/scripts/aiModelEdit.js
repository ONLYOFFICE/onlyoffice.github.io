var type = 'add';
var aiModel = null;

var nameInputEl = document.getElementById('name-input');
var urlInputEl = document.getElementById('url-input');
var tokenInputEl = document.getElementById('token-input');

window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");	
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);
	window.Asc.plugin.attachEvent("onSetOptions", onSetOptions);
	window.Asc.plugin.attachEvent("onSubmit", onSubmit);
}
window.Asc.plugin.onThemeChanged = onThemeChanged;

function onThemeChanged(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);
	themeType = theme.Type;
	
	var classes = document.body.className.split(' ');
	classes.forEach(function(className) {
		if (className.indexOf('theme-') != -1) {
			document.body.classList.remove(className);
		}
	});
	document.body.classList.add(theme.name);
	document.body.classList.add('theme-type-' + theme.Type);
}

function onSetOptions(options) {
	type = options.type;
	aiModel = options.aiModel;
	if(aiModel) {
		nameInputEl.value = aiModel.name;
		urlInputEl.value = aiModel.url;
		tokenInputEl.value = aiModel.token;
	}
}

function onSubmit() {
	if(type == 'add') {
		window.Asc.plugin.sendToPlugin("onAddAiModel", {
			name: nameInputEl.value,
			url: urlInputEl.value,
			token: tokenInputEl.value
		});
	} else {
		aiModel.name = nameInputEl.value;
		aiModel.url = urlInputEl.value;
		aiModel.token = tokenInputEl.value;
		window.Asc.plugin.sendToPlugin("onEditAiModel", aiModel);
	}
}
