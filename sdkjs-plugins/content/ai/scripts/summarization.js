var langCmbEl = document.getElementById('target-lang-cmb');
var insertCmbEl = document.getElementById('insert-as-cmb');

var originalAreaEl = document.getElementById('original-textarea');
var resultAreaEl = document.getElementById('result-textarea');

var summariazeBtnEl = document.getElementById('summariaze-btn');
summariazeBtnEl.addEventListener('click', onSummariaze);

var insertBtnEl = document.getElementById('insert-btn');
insertBtnEl.setAttribute('disabled', true);
insertBtnEl.addEventListener('click', onInsert);
window.Asc.plugin.tr('Set Background Color')
var copyBtnEl = document.getElementById('copy-btn');
copyBtnEl.setAttribute('disabled', true);
copyBtnEl.addEventListener('click', function() {
	resultAreaEl.select();
	document.execCommand('copy');
});

var errorAlertEl = document.getElementById('error-alert');
var loaderEl = document.getElementById('loader-wrapper');

var langList = [
	{name: 'English', value: 'en-US'},
	{name: 'Russian', value: 'ru-RU'}
];

var insertList = [
	{
		name: 'Review', 
		value: 'review', 
		insertCallback: function() {
			// Here the logic of insert as review
			console.log('insert as review');
		}
	},
	{
		name: 'Comment', 
		value: 'comment', 
		insertCallback: function() {
			// Here the logic of insert as comment
			console.log('insert as comment');
		}
	}
];


window.Asc.plugin.init = function() {
	window.Asc.plugin.sendToPlugin("onInit");
	
	updateLangList();
	updateInsertList();

	window.Asc.plugin.executeMethod("GetDocumentLang", [], setDefaultLang);
	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);
}
window.Asc.plugin.onThemeChanged = onThemeChanged;

window.Asc.plugin.onTranslate = function () {
    $('#original-label').text(window.Asc.plugin.tr('Your text'));
    $('#lang-label').text(window.Asc.plugin.tr('Target language'));
	$('#summariaze-btn').text(window.Asc.plugin.tr('Summariaze'));
	$('#result-label').text(window.Asc.plugin.tr('Summary result'));
	$('#insert-label').text(window.Asc.plugin.tr('Insert result as'));
	$('#insert-btn').text(window.Asc.plugin.tr('Insert'));
	$('#error-alert .error-title').text(window.Asc.plugin.tr('Error'));
};

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

function setDefaultLang(documentLang) {
	var findedLang = langList.filter(function(lang) { return lang.value == documentLang})[0];
	if(findedLang) {
		$(langCmbEl).val(findedLang.value);
		$(langCmbEl).trigger('change');
	}
}

function updateLangList() {
	var cmbEl = $(langCmbEl);
	cmbEl.select2({
		data : langList.map(function(item) {
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

function updateInsertList() {	
	var cmbEl = $(insertCmbEl);
	cmbEl.select2({
		data : insertList.map(function(item) {
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

function onSummariaze() {
	var originalText = originalAreaEl.value.trim();
	if(!originalText.length) return;

	var startLoader = function() {
		$(loaderEl).show();
	};
	var endLoader = function(errorText) {
		$(loaderEl).hide();
	};

	startLoader();
	fetchSummariaze(originalText).then(function(data) {
		endLoader();
		resultAreaEl.value = data;
		insertBtnEl.removeAttribute('disabled');
		copyBtnEl.removeAttribute('disabled');
		$(errorAlertEl).hide();
	}).catch(function(error) {
		endLoader();
		resultAreaEl.value = '';
		insertBtnEl.setAttribute('disabled', true);
		copyBtnEl.setAttribute('disabled', true);
		$(errorAlertEl).show().find('.error-description')[0].textContent = error;
	});
}

function onInsert() {
	var itemInInsertLits = insertList.filter(function(item) {return item.value == insertCmbEl.value})[0];
	if(!itemInInsertLits) return;

	itemInInsertLits.insertCallback();
}

function fetchSummariaze(text) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			if(text == 'error') {
				reject('You exceeded your current quota, please check your plan and billing details.');
			} else {
				resolve(text);
			}
			
		}, 500);
	});
}