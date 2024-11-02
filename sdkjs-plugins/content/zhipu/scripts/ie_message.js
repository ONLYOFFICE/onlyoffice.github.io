(function(window, undefined) {

	window.oncontextmenu = function(e) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

	window.Asc.plugin.init = function() {};

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
	};

	window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onTranslate = function() {
		var elem = document.getElementById("message");
		if (elem) {
			elem.innerHTML = window.Asc.plugin.tr("This plugin is not supported by IE");
		}
	};
	
})(window, undefined);