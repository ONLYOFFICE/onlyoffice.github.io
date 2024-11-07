var actionsList = [];
let aiModelsList = [];

window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	window.Asc.plugin.attachEvent("onGetActions", function(list) {
		actionsList = list;
		renderActionsList();
	});
	window.Asc.plugin.attachEvent("onGetAiModels", function(list) {
		aiModelsList = list;
	});
}

function renderActionsList() {
	var actionsListEl = document.getElementById('actions-list');
	actionsList.forEach(function(action) {
		var createdEl = document.createElement('div');
		createdEl.classList.add('item');
		createdEl.innerHTML =
			'<div class="label">' +
				'<img src="resources/icons/light/' + action.icon + '.png"/>' +
				'<div>' + action.name + '</div>' +
			'</div>' +
			'<select class="ai-model-select" class="" value="test"></select>';
		actionsListEl.appendChild(createdEl);
		const test = $(createdEl).find('.ai-model-select')
		test.select2({
			data : aiModelsList.map(function(model) {
				return {
					id: model.aiModel,
					text: model.name
				}
			}),
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth: true,
			width : 95
		});
		test.val(action.aiModel);
		test.trigger('change');
		test.on('select2:select', function (e) {
			console.log(e);
		});
	});
}