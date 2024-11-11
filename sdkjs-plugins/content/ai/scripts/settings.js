var themeType = 'light';
var actionsList = [];
var aiModelsList = [];

window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	window.Asc.plugin.attachEvent("onGetActions", function(list) {
		actionsList = list;
		renderActionsList();
	});
	window.Asc.plugin.attachEvent("onResetAiModels", function(list) {
		aiModelsList = list;
		updatedComboBoxes();
	});
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);

	$('#edit-ai-models label').click(function(e) {
		window.Asc.plugin.sendToPlugin("onOpenAiModelsModal");
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
	$('#actions-list img').each(function() {
		var src = $(this).attr('src');
		var newSrc = src.replace(/(icons\/)([^\/]+)(\/)/, '$1' + theme.Type + '$3');
		$(this).attr('src', newSrc);
	});
}

function renderActionsList() {
	var actionsListEl = document.getElementById('actions-list');
	actionsListEl.innerHTML = '';
	actionsList.forEach(function(action) {
		var createdEl = document.createElement('div');
		createdEl.classList.add('item');
		createdEl.innerHTML =
			'<div class="label">' +
				'<img src="resources/icons/' + themeType + '/' + action.icon + '.png"/>' +
				'<div>' + action.name + '</div>' +
			'</div>' +
			'<select class="ai-model-select" class=""></select>';
		actionsListEl.appendChild(createdEl);
		var selectEl = $(createdEl).find('.ai-model-select');
		selectEl.on('select2:select', function (e) {
			window.Asc.plugin.sendToPlugin("onChangeAction", { 
				actionId: e.params.data.actionId,
				aiModelId: e.params.data.id 
			});
		});
	});
}

function updatedComboBoxes() {
	$('#actions-list .item .ai-model-select').each(function(index) {
		var selectEl = $(this);
		var action = actionsList[index];
		selectEl.select2().empty();
		selectEl.select2({
			data : aiModelsList.map(function(model) {
				return {
					id: model.id,
					text: model.name,
					actionId: action.id
				}
			}),
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth: true,
			width : 95
		});
		// TODO: Если активной модели больше нету в списке, ставить null и тригерить событие на изменение модели
		selectEl.val(action.aiModelId);
		selectEl.trigger('change');
	});
}