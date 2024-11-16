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

var resolveModels = null;
window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");	
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);
	window.Asc.plugin.attachEvent("onModelInfo", onModelInfo);
	window.Asc.plugin.attachEvent("onSubmit", onSubmit);
	window.Asc.plugin.attachEvent("onGetModels", function(models) {
		let resCount = models.length;
		let res = new Array(resCount);
		for (let i = 0, len = models.length; i < len; i++)
			res[i] = { name : models[i] };
		if (resolveModels)
			resolveModels(res);
	});
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

function onModelInfo(info) {
	providersList = [];
	
	for (let prKey in info.providers) {
		let prValue = info.providers[prKey];
		providersList.push({
			id : prKey,
			name : prKey,
			url : prValue.url ? prValue.url : "",
			key : prValue.key ? prValue.key : "",
			models : prValue.models ? prValue.models : [],
		});
	}

	if(info.model) {
		isCustomName = true;

		aiModel = {
			name : info.model.name,
			nameOrigin : info.model.nameOrigin,
			provider : info.model.provider			
		};

		if (info.providers[aiModel.provider])
			aiModel.key = info.providers[aiModel.provider].key;

		if (undefined == aiModel.key)
			aiModel.key = "";

		nameInputEl.value = aiModel.name;

		$(providerNameCmbEl).val(aiModel.provider);
		
		providerKeyInputEl.value = aiModel.key;
	}
	updateProviderComboBox(!!aiModel);
}

function onSubmit() {
	let model = {
		provider : {
			name : providerNameCmbEl.value,
			url : providerUrlInputEl.value,
			key : providerKeyInputEl.value
		},
		name : nameInputEl.value,
		nameOrigin : modelNameCmbEl.value
	};

	if (!model.provider.name ||
		!model.provider.url ||
		!model.name ||
		!model.nameOrigin)
		return;

	window.Asc.plugin.sendToPlugin("onChangeModel", model);
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
			nameInputEl.value = providerObj.name + ' [' + modelObj.name + ']';
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
	fetchModelsForProvider({
		name : providerNameCmbEl.value, 
		url : providerUrlInputEl.value, 
		key: providerKeyInputEl.value
	}).then(function(data) {
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
		providerKeyInputEl.value = providersList[0].key;		
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
		cmbEl.val(aiModel.nameOrigin);
	} else {
		cmbEl.val(providerModelsList[0] ? providerModelsList[0].name : null);
	}
	isModelCmbInit = false;
	cmbEl.trigger('select2:select');
	cmbEl.trigger('change');
}

function fetchModelsForProvider(provider) {
	return new Promise(function(resolve, reject) {

		resolveModels = resolve;
		window.Asc.plugin.sendToPlugin("onGetModels", provider);

	});
}