var themeType = 'light';
var actionsList = [];
var aiModelsList = [];


window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	window.Asc.plugin.attachEvent("onGetActions", function(list) {
		actionsList = list;
		renderActionsList();
	});
	window.Asc.plugin.attachEvent("onGetAiModels", function(list) {
		aiModelsList = list;
	});
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);
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
	actionsList.forEach(function(action) {
		var createdEl = document.createElement('div');
		createdEl.classList.add('item');
		createdEl.innerHTML =
			'<div class="label">' +
				'<img src="resources/icons/' + themeType + '/' + action.icon + '.png"/>' +
				'<div>' + action.name + '</div>' +
			'</div>' +
			'<select class="ai-model-select" class="" value="test"></select>';
		actionsListEl.appendChild(createdEl);
		const test = $(createdEl).find('.ai-model-select')
		test.select2({
			data : aiModelsList.map(function(model) {
				return {
					id: model.aiModel,
					text: model.name,
					action: action.name
				}
			}),
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth: true,
			width : 95
		});
		test.val(action.aiModel);
		test.trigger('change');
		test.on('select2:select', function (e) {
			console.log(e.params.data.action + ' > ' + e.params.data.id);
		});
	});
}