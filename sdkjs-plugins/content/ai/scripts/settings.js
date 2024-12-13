var themeType = 'light';
var actionsList = [];
var aiModelsList = [];
var capabilitiesList = {
	[AI.CapabilitiesUI.Chat]: {name: window.Asc.plugin.tr('Text-Based'), icon: 'ai-texts.png'},
	[AI.CapabilitiesUI.Image]: {name: window.Asc.plugin.tr('Images'), icon: 'ai-images.png'},
	[AI.CapabilitiesUI.Embeddings]: {name: window.Asc.plugin.tr('Embeddings'), icon: 'ai-embeddings.png'},
	[AI.CapabilitiesUI.Audio]: {name: window.Asc.plugin.tr('Audio'), icon: 'ai-audio.png'},
	[AI.CapabilitiesUI.Moderations]: {name: window.Asc.plugin.tr('Moderations'), icon: 'ai-moderations.png'},
	[AI.CapabilitiesUI.Realtime]: {name: window.Asc.plugin.tr('Realtime'), icon: 'ai-realtime.png'},
	[AI.CapabilitiesUI.Code]: {name: window.Asc.plugin.tr('Code'), icon: 'ai-code.png'},
	[AI.CapabilitiesUI.Vision]: {name: window.Asc.plugin.tr('Vision'), icon: 'ai-visual-analysis.png'}
};

var scrollbarList = new PerfectScrollbar("#actions-list", {});

window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	window.Asc.plugin.attachEvent("onUpdateActions", function(list) {
		actionsList = list;
		renderActionsList();
	});
	window.Asc.plugin.attachEvent("onUpdateModels", function(list) {
		aiModelsList = list;
		updatedComboBoxes();
	});
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);

	$('#edit-ai-models label').click(function(e) {
		window.Asc.plugin.sendToPlugin("onOpenAiModelsModal");
	});
}
window.Asc.plugin.onThemeChanged = onThemeChanged;

window.Asc.plugin.onTranslate = function () {
	let elements = document.querySelectorAll('.i18n');
	elements.forEach(function(element) {
		element.innerText = window.Asc.plugin.tr(element.innerText);
	});
};

function onThemeChanged(theme) {
	window.Asc.plugin.onThemeChangedBase(theme);
	themeType = theme.type;
	
	var classes = document.body.className.split(' ');
	classes.forEach(function(className) {
		if (className.indexOf('theme-') != -1) {
			document.body.classList.remove(className);
		}
	});
	document.body.classList.add(theme.name);
	document.body.classList.add('theme-type-' + theme.type);
	$('#actions-list img').each(function() {
		var src = $(this).attr('src');
		var newSrc = src.replace(/(icons\/)([^\/]+)(\/)/, '$1' + theme.type + '$3');
		$(this).attr('src', newSrc);
	});
}

function renderActionsList() {
	var actionsListEl = document.getElementById('actions-list');
	actionsListEl.innerHTML = '';
	actionsList.forEach(function(action, index) {
		var createdEl = document.createElement('div');
		var icon = action.icon || 'default';
		createdEl.classList.add('item');
		if(index == 0) {
			createdEl.classList.add('first');
		} else if(index == actionsList.length - 1) {
			createdEl.classList.add('last');
		}
		createdEl.innerHTML =
			'<div class="label">' +
				'<img src="resources/icons/' + themeType + '/' + icon + '.png"/>' +
				'<div>' + action.name + '</div>' +
			'</div>' +
			'<select class="ai-model-select" class=""></select>';
		actionsListEl.appendChild(createdEl);
		var selectEl = $(createdEl).find('.ai-model-select');
		selectEl.on('select2:select', function (e) {
			window.Asc.plugin.sendToPlugin("onChangeAction", { 
				id: e.params.data.actionId,
				model: e.params.data.id 
			});
		});
	});
	toggleScrollbarPadding();
	scrollbarList.update();
}

function toggleScrollbarPadding() {
	var actionsListEl = document.getElementById('actions-list');
	// Проверяем, есть ли скроллбар
	if (actionsListEl.scrollHeight > actionsListEl.clientHeight) {
		actionsListEl.classList.add('with-scrollbar');
	} else {
		actionsListEl.classList.remove('with-scrollbar');
	}
}

function updatedComboBoxes() {
	$('#actions-list .item .ai-model-select').each(function(index) {
		var selectEl = $(this);
		var action = actionsList[index];
		var options = aiModelsList.filter(function(model) {
			return (action.capabilities & model.capabilities) !== 0;
		}).map(function(model) {
			return {
				id: model.id,
				text: model.name,
				actionId: action.id
			}
		});

		selectEl.select2().empty();
		selectEl.select2({
			data : [{
				text: 'Text-Based Models',
				children: options
			}],
			templateResult: function (data) {
				if(!data.children) {
					return data.text;
				}

				var capability = capabilitiesList[action.capabilities];
				if(!capability) {
					return 'Available models';
				}

				var src = 'resources/icons/light/' + capability.icon;
				var result ='<img src="' + src + '"/>';
				result += '<div>' + window.Asc.plugin.tr(capability.name) + ' ' + window.Asc.plugin.tr('Models') + '</div>';
				return $(result);
			},
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth: true,
			width : 150
		});
		// TODO: Если активной модели больше нету в списке, ставить null и тригерить событие на изменение модели
		selectEl.val(action.model);
		selectEl.trigger('change');
	});
}