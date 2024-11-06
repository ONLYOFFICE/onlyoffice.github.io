window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("requestActions");
	window.Asc.plugin.attachEvent("responseActions", function(list) {
		renderActionsList(list);
	});
}

function renderActionsList(list) {
	var actionsListEl = document.getElementById('actions-list');
	list.forEach(function(action) {
		var item = 
			'<div class="item">' + 
				'<div class="label">' +
					'<img src="resources/icons/light/' + action.icon + '.png"/>' +
					'<div>' + action.name + '</div>' +
				'</div>' +
				'<div class="ai-model">' + action.aiModel + '</div>' +
			'</div>';
		actionsListEl.insertAdjacentHTML('beforeend', item);
	});
}