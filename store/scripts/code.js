/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

let allPlugins;						// list of all plugins from config
let installedPlugins;				// list of intalled plugins
const configUrl = './config.json';	// url to config.json
const elements = {};				// all elements
const isDesctop = true;				// window.AscDesktopEditor !== undefined;
let isLoading = false;				// flag loading
let loader;							// loader
var Ps;								// perfect scrollbar 
// for making preview
let counter = 0;
let row;
const gitRaw = 'https://raw.githubusercontent.com';
const gitUrl = 'https://github.com';
let theme;

// TODO переводы добавить и решить что будем переводить (но по нормальному посмотреть можно будет только после интеграции в редактор)
// в теории язык можно вытащить из parent.location.search

// TODO решить проблему с темой и добавить для неё разные стили (после интеграции можно будет попробовать прокинуть событие смены темы)
// в теории её можно достать из parent.localStorage.getItem('ui-theme-id')
window.Asc = {
	plugin : {
		theme : {
			type : 'light'
		}
	}
}

window.onload = function() {
	// detect theme (this is not currently in use)
	theme = parent.localStorage.getItem('ui-theme-id') || '';
	console.log('detected theme: ' + theme);
	// init element
	initElemnts();

	elements.btnMyPlugins.onclick = function() {
		// click on my plugins button
		if ( !this.classList.contains('btn_selected') ) {
			elements.btnMarketplace.classList.remove('btn_selected');
			this.classList.add('btn_selected');
			elements.linkNewPlugin.innerHTML = "Install plugin manually";
			elements.divMain.innerHTML = "";
			Ps.update();
			counter = 0;
			installedPlugins.forEach(function(el) {
				createPluginDiv(el.guid);
			});
		}
	};

	elements.btnMarketplace.onclick = function() {
		// click on marketplace button
		if ( !this.classList.contains('primary') ) {
			elements.btnMyPlugins.classList.remove('btn_selected');
			this.classList.add('btn_selected');
			elements.linkNewPlugin.innerHTML = "Submit your own plugin";
			elements.divMain.innerHTML = "";
			Ps.update();
			for (const guid in allPlugins) {
				createPluginDiv(guid);	
			}
			Ps.update();
		}
	};

	elements.arrow.onclick = function() {
		// click on left arrow in preview mode
		document.getElementById('div_preview').remove();
		elements.divBody.classList.remove('hidden');
		elements.arrow.classList.add('hidden');
		Ps.update();
	};

	elements.close.onclick = function() {
		// click on close button
		console.log('close window');
	};

	if (isLoading) {
		toogleLoader(true);
	}
};

window.addEventListener('message', function(event) {
	// get message from editors
	switch (event.data.type) {
		case 'installed':
			installedPlugins = event.data.data;
			if (allPlugins)
				getAllPluginsData();
			break;
	
		default:
			break;
	}
}, false);

// fetch all plugins from config
fetchAllPlugins();
// get all installed plugins
sendMessage({type : 'getInstalled'}, '*');

function fetchAllPlugins() {
	// function for fetching all plugins from config
	makeRequest(configUrl).then(
		function(response) {
			allPlugins = JSON.parse(response);
			if (installedPlugins)
				getAllPluginsData();
		},
		function(err) {
			//TODO make error preview
			console.error(err);
			isLoading = false;
		}
	);
};

function makeRequest(url) {
	// this function makes GET request and return promise
	// maybe use fetch to in this function
	isLoading = true;
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		
		xhr.onload = function () {
			if (this.status == 200) {
				setTimeout(() => {
				resolve(this.response);
					
				}, 1000);
				// resolve(this.response);
			}
		};

		xhr.onerror = function (err) {
			reject(err);
		};

		xhr.send(null);
	});
};

function sendMessage(message) {
	// this function sends message to editor
	parent.postMessage(message, '*');
};

function initElemnts() {
	elements.btnMyPlugins = document.getElementById('btn_myPlugins');
	elements.btnMarketplace = document.getElementById('btn_marketplace');
	elements.linkNewPlugin = document.getElementById('link_newPlugin');
	elements.divBody = document.getElementById('div_body');
	elements.divMain = document.getElementById('div_main');
	elements.arrow = document.getElementById('arrow');
	elements.close = document.getElementById('close');
};

function toogleLoader(show) {
	// show or hide loader
	if (!show) {
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;	
	} else if(!loader) {
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], 'Loading...');
	}
};

function getAllPluginsData() {
	for (const guid in allPlugins) {
		const cur = allPlugins[guid];
		// gitRaw + cur.Url + '/master/config.json'
		var pluginUrl = gitRaw + cur.Url + (cur.Url.includes('sdkjs-plugins') ? '/config.json' : '/master/config.json');
		makeRequest(pluginUrl).then(
			function(response) {
				let config = JSON.parse(response);
				let guid = config.guid.substring(5, 41);
				allPlugins[guid].config = config;
				createPluginDiv(guid);
				Ps.update();
				isLoading = false;
				toogleLoader(false)
			},
			function(err) {
				//TODO make error preview
				console.error(err);
				isLoading = false;
				toogleLoader(false);
			}
		);
	}
	Ps = new PerfectScrollbar('#' + "div_main", {});
};


function createPluginDiv(guid) {
	// this function creates div (preview) for plugins
	// TODO может сделать динамическое количестов элементов в одной строке или переделать отображание через тег table
	if (counter <= 0 || counter >= 4) {
		row = document.createElement('div');
		row.className = "div_row"
		document.getElementById('div_main').append(row);
		counter = 1;
	}


	let mesh = "fhjdskhfjkdshfkjdshjkfhdjshfdkslnmchxjds jhfdksjka fjsd jksdfdslkfj";


	let div = document.createElement('div');
	div.setAttribute('data-guid', guid);
	div.className = 'div_item';
	let installed = installedPlugins.find(function(el) {
		return (el.guid == guid);
	});
	
	let bHasUpdate = false;
	if (isDesctop && installed) {
		let installedV = installed.obj.version.split('.').join('');
		let lastV = allPlugins[guid].config.version.split('.').join('');
		if (lastV > installedV)
			bHasUpdate = true;
	}

	let imageUrl = gitRaw + allPlugins[guid].Url + (allPlugins[guid].Url.includes('sdkjs-plugins') ? '' : 'master/');
	let variations = allPlugins[guid].config.variations[0];
	// TODO решить вопрос со scale, чтобы выбирать нужную иконку
	if (variations.icons2) {
		//
		let icon = variations.icons2[0];
		for (let i = 0; i < variations.icons2.length; i++) {
			if (theme.includes(variations.icons2[i].style)) {
				icon = variations.icons2[i];
				break;
			}
		}
		imageUrl += icon['200%'].normal;
	} else if (!variations.isSystem) {
		// TODO наверно надо переделать во всех плагинах, где это ещё осталось
		imageUrl += variations.icons[0];
	} else {
		imageUrl = "./resources/img/defaults/light/icon@2x.png"
	}
	// TODO подумать от куда брать цвет на фон под картинку (может в config добавить)
	// TODO добавить в репозитории системных плагинов (по типу settings) иконки, чтобы в маркетплейсе они подтягивались
	let template = '<div class="div_image" onclick="onClickItem(event.target)">' +
						// временно поставил такие размеры картинки (чтобы выглядело симминтрично пока)
						'<img style="width:56px;" src="' + imageUrl + '">' +
					'</div>' +
					'<div class="div_description">'+
						'<span class="span_name">' + allPlugins[guid].config.name + '</span>' +
						'<span class="span_description">' + variations.description + (counter==2 ? mesh : "") + '</span>' +
					'</div>' +
					'<div class="div_footer">' +
						(bHasUpdate
							? '<span class="span_update">Update</span>'
							: ''
						)+''+
						(installed
							? (installed.canRemoved ? '<button class="btn-text-default btn_install" onclick="onClickItemButton(event.target, false)">Remove</button>' : '<div style="height:20px"></div>')
							: '<button class="btn-text-default btn_install" onclick="onClickItemButton(event.target, true)">Install</button>'
						)
						+
					'</div>';
	div.innerHTML = template;
	row.append(div);
	counter++;
};

function onClickItemButton(target, bInstall) {
	// click on install/remove button
	let guid = target.parentNode.parentNode.getAttribute('data-guid');
	let message;
	// TODO update посылать отдельным собитием или можно как install его отправлять?
	if (bInstall) {
		message = {
			type : 'install',
			url : gitUrl + (allPlugins[guid].Url.includes('sdkjs-plugins') ? (allPlugins[guid].Url.replace('plugins/master', 'plugins/blob/master') + 'config.json') : (allPlugins[guid].Url + 'blob/master/config.json'))
		};
	} else {
		message = {
			type : 'remove',
			guid: guid
		};
	}
	// TODO наверно хотелось бы получать сообщения о том успешно ли прошел процесс установки/удаления/лбновления (чтобы уже в этом окне отобразить изменения)
	sendMessage(message);
	console.log(target.parentNode.parentNode.getAttribute('data-guid'));
};

function onClickItem(target) {
	// There we will make preview for selected plugin
	// TODO продумать где брать offered by и где брать текс для этого блока (может из конфига)
	let offered = "TESTdsadasddasdasdasdasdas";
	let description = "Correct French grammar and typography. The plugin uses Grammalecte, an open-source grammar and typographic corrector dedicated to the French language.Correct French grammar and typography."

	elements.arrow.classList.remove('hidden');
	let guid = target.parentNode.getAttribute('data-guid');
	console.log(guid);
	elements.divBody.classList.add('hidden');
	let divPreview = document.createElement('div');
	divPreview.id = 'div_preview';
	divPreview.className = 'div_preview noselect';

	let installed = installedPlugins.find(function(el) {
		return (el.guid == guid);
	});

	let bHasUpdate = false;
	if (isDesctop && installed) {
		let installedV = installed.obj.version.split('.').join('');
		let lastV = allPlugins[guid].config.version.split('.').join('');
		if (lastV > installedV)
			bHasUpdate = true;
	}
	let pluginUrl = gitUrl + (allPlugins[guid].Url.includes('sdkjs-plugins') ? allPlugins[guid].Url.replace('plugins/master', 'plugins/tree/master') : allPlugins[guid].Url);
	// TODO проблема с тем, что в некоторых иконках плагинов есть отступ сверху, а в некоторых его нет (исходя их этого нужен разный отступ у span справа, чтобы верхние края совпадали)
	let template = '<div class="div_selected_toolbar" data-guid="' + guid + '">' +
						// временно поставил такие размеры картинки 56 (чтобы выглядело симминтрично пока)
						'<div style="width:56px">' +
							'<img style="height:56px" src ="' + target.children[0].src + '">' +
						'</div>' +
						'<div class="div_selected_description">' +
							'<span class="span_name">' + target.nextSibling.children[0].innerText + '</span>' +
							'<span class="span_description">Offered by: ' + offered + '</span>' +
							'<div>' +
								(bHasUpdate
									? '<button class="btn-text-default btn_preview" onclick="onClickItemButton(event.target.parentNode, true)">Update</button>'
									: ''
								)
								+''+
								(installed
									? (installed.canRemoved ? '<button class="btn-text-default btn_preview" onclick="onClickItemButton(event.target.parentNode, false)">Remove</button>' : '')
									: '<button class="btn-text-default btn_preview" onclick="onClickItemButton(event.target.parentNode, true)">Install</button>'
								)
								+
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="div_selected_main">' +
						'<div style="width:100%; height:100%">' +
							'<div>' +
								'<span class="span_caption span_selected" onclick="onSelectPreview(event.target, true)">Overview</span>' +
								'<span class="span_caption" onclick="onSelectPreview(event.target, false)">Info & Suppor</span>' +
								'<hr>' +
							'</div>' +
							'<div id="div_selected_preview" class="div_selected_preview">' +
								'<div>' +
									'<span>' + description + '</span>' +
								'</div>' +
								'<div id="div_selected_image" class="div_selected_image">' +
									// TODO проблема со скрином (не получается его нормально позиционировать при изменении размера, плюс на нём нифига не видно, может использовать скрин только плагина)
									(allPlugins[guid].config.variations[0].isVisual
										// TODO подумать что показывать для не визуальных плагинов (пока решил ничего не показывать)
										? '<img src="./resources/img/screenshotes/' + guid + '.png" class="image_preview">'
										: ''
									)
									+
								'</div>' +
							'</div>' +
							'<div id="div_selected_info" class="div_selected_preview hidden">' +
								'<div class="div_selected_info"> <span class="span_info">Lern how to use</span> <span> the plugin in </span> <a class="aboutlink link_info" target="blank" href="https://api.onlyoffice.com/plugin/basic">Help Center.</a></div>' +
								'<div class="div_selected_info"> <span class="span_info">Contribute</span> <span> to the plugin developmen or report an issue on</span> <a class="aboutlink link_info" target="blank" href=' + pluginUrl + '>Github.</a></div>' +
								'<div class="div_selected_info"> <span class="span_info">Get help</span> <span> with the plugin functionality on our forum.</span></div>' +
								'<div class="div_selected_info"> <span>Create a new plugin using</span> <a class="aboutlink link_info" target="blank" href="https://api.onlyoffice.com/plugin/basic">ONLYOFFICE API.</a></div>' +
							'</div>' +
						'<div>' +
					'</div>';
	divPreview.innerHTML = template;
	document.body.append(divPreview);
	setDivHeight();
};

function onSelectPreview(target, isOverview) {
	// change mode of preview
	if ( !target.classList.contains('span_selected') ) {
		$(".span_selected").removeClass("span_selected");
		target.classList.add("span_selected");

		if (isOverview) {
			console.log("overview");
			document.getElementById('div_selected_info').classList.add('hidden');
			document.getElementById('div_selected_preview').classList.remove('hidden');
			setDivHeight();
		} else {
			console.log('Info & Support');
			document.getElementById('div_selected_preview').classList.add('hidden');
			document.getElementById('div_selected_info').classList.remove('hidden');

		}
	}
};

function setDivHeight() {
	// set height for div with image in preview mode
	Ps.update();
	console.log(Math.round(window.devicePixelRatio * 100));
	let div = document.getElementById("div_selected_image");
	if (div) {
		let height = div.parentNode.clientHeight - div.previousElementSibling.clientHeight - 20 + "px";
		div.style.height = height;
		div.style.maxHeight = height;
	}
};
window.onresize = function() {
	setDivHeight();
	// TODO change icons for plugins preview for new scale
};