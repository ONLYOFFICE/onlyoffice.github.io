window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	window.Asc.plugin.attachEvent("onUpdateLangList", function(list) {
		updateLangList(list);
	});
	window.Asc.plugin.attachEvent("onUpdateInsertAsList", function(list) {
		updateInsertAsList(list);
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
}

function updateLangList(list) {
	var cmbEl = $('#target-lang-cmb');
	cmbEl.select2({
		data : list.map(function(item) {
			return {
				id: item.value,
				text: item.name
			}
		}),
		minimumResultsForSearch: Infinity,
		dropdownAutoWidth: true,
		width: 'auto'
	});
}

function updateInsertAsList(list) {
	console.log(list);
	
	var cmbEl = $('#insert-as-cmb');
	cmbEl.select2({
		data : list.map(function(item) {
			return {
				id: item.value,
				text: item.name
			}
		}),
		minimumResultsForSearch: Infinity,
		dropdownAutoWidth: true,
		width: 'auto'
	});
}