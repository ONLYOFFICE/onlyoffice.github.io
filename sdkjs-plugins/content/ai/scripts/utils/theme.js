function updateBodyThemeClasses(themeType, themeName) {
    var classes = document.body.className.split(' ');
    classes.forEach(function(className) {
        if (className.indexOf('theme-') != -1) {
            document.body.classList.remove(className);
        }
    });
    themeName && document.body.classList.add(themeName);
    themeType && document.body.classList.add('theme-type-' + themeType);
}

function updateThemeVariables(theme) {
	let colorRegex = /^(#([0-9a-f]{3}){1,2}|rgba?\([^\)]+\)|hsl\([^\)]+\))$/i;

	let oldStyle = document.getElementById('theme-variables');
	if (oldStyle) {
		oldStyle.remove();
	}

	let style = document.createElement('style');
	style.id = 'theme-variables';
	let cssVariables = ":root {\n";

	for (let key in theme) {
		let value = theme[key];

		if (colorRegex.test(value)) {
			let cssKey = '--' + key.replace(/([A-Z])/g, "-$1").toLowerCase();
			cssVariables += ' ' + cssKey + ': ' + value + ';\n';
		}
	}

	cssVariables += "}";

	style.textContent = cssVariables;
	document.head.appendChild(style);
}