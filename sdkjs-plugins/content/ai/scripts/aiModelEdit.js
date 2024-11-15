var type = 'add';
var aiModel = null;
var isModelCmbInit = true;

var providersList = [];
var providerModelsList = [];

var nameInputEl = document.getElementById('name-input');
var providerNameCmbEl = document.getElementById('provider-name-cmb');
var providerUrlInputEl = document.getElementById('provider-url-input');
var providerKeyInputEl = document.getElementById('provider-key-input');
var modelNameCmbEl = document.getElementById('model-name-cmb');
var updateModelsBtnEl = document.getElementById('update-models-btn');

var isCustomName = false;

nameInputEl.addEventListener('change', onChangeNameInput);
providerUrlInputEl.addEventListener('change', onChangeProviderUrlInput);
providerKeyInputEl.addEventListener('change', onChangeProviderKeyInput)
updateModelsBtnEl.addEventListener('click', updateModelsList);


window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");	
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);
	window.Asc.plugin.attachEvent("onGetProviders", onGetProviders);
	window.Asc.plugin.attachEvent("onGetOptions", onGetOptions);
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

function onGetProviders(providers) {
	providersList = providers;
}

function onGetOptions(options) {
	type = options.type;
	aiModel = options.aiModel;
	if(aiModel) {
		isCustomName = true;
		nameInputEl.value = aiModel.name;

		$(providerNameCmbEl).val(aiModel.provider);

		providerKeyInputEl.value = aiModel.key;
	}
	updateProviderComboBox(!!aiModel);
}

function onSubmit() {
	var isCustomProvider = !providerModelsList.some(function(provider) { return provider.id == providerNameCmbEl.value });
	
	if(isCustomProvider) {
		window.Asc.plugin.sendToPlugin("onAddProvider", {
			name: providerNameCmbEl.value,
			url: providerUrlInputEl.value
		});
	}
	if(type == 'add') {
		window.Asc.plugin.sendToPlugin("onAddAiModel", {
			name: nameInputEl.value,
			provider: providerNameCmbEl.value,
			key: providerKeyInputEl.value,
			model: modelNameCmbEl.value
		});
	} else {
		aiModel.name = nameInputEl.value;
		aiModel.provider = providerNameCmbEl.value;
		aiModel.key = providerKeyInputEl.value;
		aiModel.model = modelNameCmbEl.value;
		window.Asc.plugin.sendToPlugin("onEditAiModel", aiModel);
	}
}

function onChangeNameInput() {
	isCustomName = nameInputEl.value.trim().length > 0;
}

function onChangeProviderComboBox() {
	var provider = providersList.filter(function(el) { return el.id == providerNameCmbEl.value })[0] || null;

	providerUrlInputEl.value = provider ? provider.url : '';
	if(providerUrlInputEl) {
		updateModelsList();
	}
}

function onChangeProviderUrlInput() {
	updateModelsList();
}

function onChangeProviderKeyInput() {
	updateModelsList();
}

function onChangeModelComboBox() {
	if(!isCustomName) {
		var providerObj = providersList.filter(function(provider) { return provider.id == providerNameCmbEl.value })[0] || null;
		var modelObj = providerModelsList.filter(function(model) { return model.name == modelNameCmbEl.value })[0] || null;

		if(providerObj && modelObj) {
			nameInputEl.value = providerObj.name + '[' + modelObj.name + ']';
		} else {
			nameInputEl.value = '';
		}
	}
}

function updateModelsList() {
	var updateHtmlElements = function() {
		modelNameCmbEl.removeAttribute('disabled');
		updateModelsBtnEl.removeAttribute('disabled');
		updateModelComboBox();
	};

	modelNameCmbEl.setAttribute('disabled', true);
	updateModelsBtnEl.setAttribute('disabled', true);
	fetchModelsForProvider(providerUrlInputEl.value, providerKeyInputEl.value).then(function(data) {
		providerModelsList = data;
		updateHtmlElements();
	}).catch(function(error) {
		console.log(error);
		providerModelsList = [];
		updateHtmlElements();
	});
}

function updateProviderComboBox(isInit) {
	var cmbEl = $('#provider-name-cmb');
	cmbEl.select2({
		data : providersList.map(function(model) {
			return {
				id: model.id,
				text: model.name
			}
		}),
		tags: true,
		dropdownAutoWidth: true
	});
	cmbEl.on('select2:select', onChangeProviderComboBox);
	if(isInit) {
		cmbEl.val(aiModel.provider);
	} else if(providersList.length > 0) {
		cmbEl.val(providersList[0].id);
	}
	cmbEl.trigger('select2:select');
	cmbEl.trigger('change');
}

function updateModelComboBox() {
	var cmbEl = $('#model-name-cmb');
	cmbEl.select2().empty();
	cmbEl.select2({
		data : providerModelsList.map(function(model) {
			return {
				id: model.name,
				text: model.name
			}
		}),
		language: {
			noResults: function() {
				return "Models not found";
		   }
	   	},
		minimumResultsForSearch: Infinity,
		dropdownAutoWidth: true
	});
	cmbEl.on('select2:select', onChangeModelComboBox);

	if(isModelCmbInit && aiModel) {
		cmbEl.val(aiModel.model);
	} else {
		cmbEl.val(providerModelsList[0] ? providerModelsList[0].name : null);
	}
	isModelCmbInit = false;
	cmbEl.trigger('select2:select');
	cmbEl.trigger('change');
}

function fetchModelsForProvider(url, key) {
	return new Promise(function(resolve, reject) {
		setTimeout(() => {
			if(url == 'https://chatgpt.com' && key) {
				resolve([
					{ name: 'gpt-3.5' },
					{ name: 'gpt-3.5-turbo' },
					{ name: 'gpt-4' }
				]);
			} if(url == 'https://ya.ru/ai/gpt-3' && key) {
				resolve([
					{ name: 'gpt 2' },
					{ name: 'gpt 4 pro' }
				]);
			} if(url == 'https://ollama.com') {
				resolve([
					{ name: 'Llama 3.2' },
					{ name: 'Gemma 2' }
				]);
			} if(url == 'https://www.deepseek.com') {
				resolve([
					{ name: 'V2' },
					{ name: 'Coder-V2' }
				]);
			} if(url == 'http://localhost:3000') {
				resolve([
					{ name: 'Model v-1' },
					{ name: 'Model v-2' }
				]);
			} else {
				resolve([]);
			}
		}, 200);
	});
}