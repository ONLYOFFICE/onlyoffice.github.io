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

// todo поправить с ошибкой, что у нее нет поля message (может её тогда совсем не выводить или показать просто error)
let start = Date.now();
let isPluginLoading = false;                                         // flag plugins loading
const isDesktop = window.AscDesktopEditor !== undefined;             // desktop detecting
let isOnline = true;                                                 // flag internet connection
isDesktop && checkInternet();                                        // check internet connection (only for desktop)
let interval = null;                                                 // interval for checking internet connection (if it doesn't work on launch)
const OOMarketplaceUrl = 'https://onlyoffice.github.io/';            // url to oficial store (for local version store in desktop)
let current = {index: 0, screenshots: [], url: ''};                  // selected plugin (for plugin view)
let searchTimeout = null;                                            // timeot for search
let founded = [];                                                    // last founded elemens (for not to redraw if a result is the same)
let catFiltred = [];                                                 // plugins are filtred by caterogy (used for search)
let updateCount = 0;                                                 // counter for plugins in updating process
let allPlugins = [];                                                 // list of all plugins from config
let installedPlugins;                                                // list of intalled plugins
const configUrl = './config.json';                                   // url to config.json
const elements = {};                                                 // all elements
const guidMarkeplace = 'asc.{AA2EA9B6-9EC2-415F-9762-634EE8D9A95E}'; // guid marketplace
const guidSettings = 'asc.{8D67F3C5-7736-4BAE-A0F2-8C7127DC4BB8}';   // guid settings plugins
let editorVersion = null;                                            // edior current version
let loader;                                                          // loader
let themeType = detectThemeType();                                   // current theme
const lang = detectLanguage();                                       // current language
const shortLang = lang.split('-')[0];                                // short language
let bTranslate = false;                                              // flag translate or not
let isTranslationLoading = false;                                    // flag translation loading
let isFrameLoading = true;                                           // flag window loading
let translate = {'Loading': 'Loading'};                              // translations for current language (thouse will necessary if we don't get tranlation file)
let timeout = null;                                                  // delay for loader
let defaultBG = themeType == 'light' ? "#F5F5F5" : '#555555';        // default background color for plugin header
let isResizeOnStart = true;                                          // flag for firs resize on start
const proxyUrl = 'https://plugins-services.onlyoffice.com/proxy';    // url to proxy for getting rating
const supportedScaleValues = [1, 1.25, 1.5, 1.75, 2];                // supported scale
let scale = {                                                        // current scale
	percent  : "100%",                                               // current scale in percent
	value    : 1,                                                    // current scale value
	devicePR : 1                                                     // device pixel ratio
};
calculateScale();
const languages = [                                                  // list of languages
	['cs-CZ', 'cs', 'Czech'],
	['de-DE', 'de', 'German'],
	['es-ES', 'es', 'Spanish'],
	['fr-FR', 'fr', 'French'],
	['it-IT', 'it', 'Italian'],
	['ja-JA', 'ja', 'Japanese'],
	['nl-NL', 'nl', 'Dutch'],
	['pt-PT', 'pt', 'Portuguese'],
	['ru-RU', 'ru', 'Russian'],
	['zh-ZH', 'zh', 'Chinese']
];
const messages = {
	versionWarning: 'This plugin will only work in a newer version of the editor.',
	linkManually: 'Install plugin manually',
	linkPR: 'Submit your own plugin'
};
const isIE = (navigator.userAgent.toLowerCase().indexOf("msie") > -1 ||
				navigator.userAgent.toLowerCase().indexOf("trident") > -1 ||
				navigator.userAgent.toLowerCase().indexOf("edge") > -1);

// it's necessary because we show loader before all (and getting translations too)
switch (shortLang) {
	case 'ru':
		translate["Loading"] = "Загрузка"
		break;
	case 'fr':
		translate["Loading"] = "Chargement"
		break;
	case 'es':
		translate["Loading"] = "Carga"
		break;
	case 'de':
		translate["Loading"] = "Laden"
		break;
	case 'cs':
		translate["Loading"] = "Načítání"
		break;
}

// it's necessary for loader (because it detects theme by this object)
window.Asc = {
	plugin : {
		theme : {
			type :  themeType
		}
	}
};

const pos = location.href.indexOf('store/index.html');
const ioUrl = location.href.substring(0, pos);

// get translation file
getTranslation();
// fetch all plugins from config
if (!isDesktop)
	fetchAllPlugins(true, false);

window.onload = function() {
	let rule = '\n.asc-plugin-loader{background-color:' + (themeType == 'light' ? '#ffffff' : '#333333') + ';padding: 10px;display: flex;justify-content: center;align-items: center;border-radius: 5px;}\n'
	rule += '.asc-plugin-loader{color:' + (themeType == 'light' ? '#444444' : 'rgba(255,255,255,0.8)') + '}\n';
	let styleTheme = document.createElement('style');
	styleTheme.type = 'text/css';
	styleTheme.innerHTML = rule;
	document.getElementsByTagName('head')[0].appendChild(styleTheme);
	if (isPluginLoading || isTranslationLoading) {
		toogleLoader(true, "Loading");
	}
	// init element
	initElemnts();
	if (isIE)
		elements.imgScreenshot.classList.remove('image_preview');

	isFrameLoading = false;
	if (shortLang == "en" || (!isPluginLoading && !isTranslationLoading)) {
		// if nothing to translate
		showMarketplace();
	}

	elements.btnMyPlugins.onclick = function(event) {
		// click on my plugins button
		toogleView(event.target, elements.btnMarketplace, messages.linkManually, false, false);
	};

	elements.btnMarketplace.onclick = function(event) {
		// click on marketplace button
		toogleView(event.target, elements.btnMyPlugins, messages.linkPR, true, false);
	};

	// elements.arrow.onclick = onClickBack;

	// elements.imgScreenshot.onclick = onClickScreenshot;
	elements.arrowPrev.onclick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (current.index > 0) {
			// todo maybe show loader
			current.index--;
			let url = current.url + current.screenshots[current.index];
			elements.imgScreenshot.setAttribute('src', url);
			elements.imgScreenshot.onload = function() {
				elements.arrowNext.classList.remove('hidden');
				// todo maybe hide loader
			}
			if (!current.index)
				elements.arrowPrev.classList.add('hidden');
		}
	};

	elements.arrowNext.onclick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (current.index < current.screenshots.length - 1) {
			// todo maybe show loader
			current.index++;
			let url = current.url + current.screenshots[current.index];
			elements.imgScreenshot.setAttribute('src', url);
			elements.imgScreenshot.onload = function() {
				elements.arrowPrev.classList.remove('hidden');
				// todo maybe hide loader
			}
			if (current.index == current.screenshots.length - 1)
				elements.arrowNext.classList.add('hidden');
		} 
	};

	// elements.divArrow.onclick = onClickScreenshot;

	elements.inpSearch.addEventListener('input', function(event) {
		makeSearch(event.target.value.trim().toLowerCase());
	});

	elements.divRatingLink.onclick = function() {
		elements.discussionLink.click();
	};
};

window.addEventListener('message', function(message) {
	// getting messages from editor or plugin

	// try to parse message
	try {
		message = JSON.parse(message.data);
	} catch (error) {
		// if we have a problem, don't process this message
		return;
	}

	let plugin;
	let installed;
	switch (message.type) {
		case 'InstalledPlugins':
			if (message.data) {
				// filter installed plugins (delete removed, that are in store and some system plugins)
				installedPlugins = message.data.filter(function(el) {
					return (el.guid !== guidMarkeplace && el.guid !== guidSettings && !( el.removed && el.obj.baseUrl.includes(ioUrl) ));
				});
				sortPlugins(false, true, 'start');
			} else {
				installedPlugins = [];
			}

			// console.log('getInstalledPlugins: ' + (Date.now() - start));

			if (message.updateInstalled)
				showListofPlugins(false);
			else if ( allPlugins.length || (isDesktop && !isOnline) )
				getAllPluginsData(true, false);
			
			break;
		case 'Installed':
			if (!message.guid) {
				// somethimes we can receive such message
				toogleLoader(false);
				return;
			}
			plugin = findPlugin(true, message.guid);
			installed = findPlugin(false, message.guid);
			if (!installed && plugin) {
				installedPlugins.push(
					{
						baseUrl: plugin.url,
						guid: message.guid,
						canRemoved: true,
						obj: plugin,
						removed: false
					}
				);
				// sortPlugins(false, true, 'name');
			} else if (installed) {
				if (installed.obj.backup) {
					// нужно обновить список установленных плагинов, чтобы ссылки на ресурсы были правильными
					sendMessage({ type: 'getInstalled', updateInstalled: true }, '*');
				}
				else
					installed.removed = false;
			}

			changeAfterInstallOrRemove(true, message.guid);
			toogleLoader(false);
			break;
		case 'Updated':
			updateCount--;
			if (!message.guid) {
				// somethimes we can receive such message
				if (!updateCount)
					toogleLoader(false);
				return;
			}
			installed = findPlugin(false, message.guid);
			plugin = findPlugin(true, message.guid);

			installed.obj.version = plugin.version;
			plugin.bHasUpdate = false;

			if (!elements.divSelected.classList.contains('hidden')) {
				this.document.getElementById('btn_update').classList.add('hidden');
			}

			elements.spanVersion.innerText = plugin.version;
			let pluginDiv = this.document.getElementById(message.guid);
			if (pluginDiv)
				pluginDiv.lastChild.firstChild.remove();

			if (!updateCount)
				toogleLoader(false);
			break;
		case 'Removed':
			if (!message.guid) {
				// somethimes we can receive such message
				toogleLoader(false);
				return;
			}

			let bUpdate = false;
			let bHasLocal = false;
			let needBackup = message.backup;

			plugin = findPlugin(true, message.guid);
			installed = findPlugin(false, message.guid);
			
			if (installed) {
				bHasLocal = !installed.obj.baseUrl.includes(ioUrl);
				if (plugin && (!bHasLocal || (isDesktop && !needBackup) ) ) {
					installedPlugins = installedPlugins.filter(function(el){return el.guid !== message.guid});
					bUpdate = true;
				} else {
					installed.removed = true;

					// нужно обновить список установленных плагинов, чтобы ссылки на ресурсы были правильными
					if (isDesktop)
						sendMessage({ type: 'getInstalled', updateInstalled: true }, '*');
				}
			}

			if (elements.btnMyPlugins.classList.contains('btn_toolbar_active')) {
				if (bUpdate) {
					catFiltred = installedPlugins;
					let searchVal = elements.inpSearch.value.trim();
					if (searchVal !== '')
						makeSearch(searchVal.toLowerCase());
					else
						this.document.getElementById(message.guid).remove();
				} else {
					changeAfterInstallOrRemove(false, message.guid, bHasLocal);
				}
			} else {
				changeAfterInstallOrRemove(false, message.guid, bHasLocal);				
			}

			toogleLoader(false);
			break;
		case 'Error':
			createError(message.error);
			toogleLoader(false);
			break;
		case 'Theme':
			if (message.theme.type)
				themeType = message.theme.type;

			let rule = 'a{color:'+message.theme.DemTextColor+'!important;}\na:hover{color:'+message.theme.DemTextColor+'!important;}\na:active{color:'+message.theme.DemTextColor+'!important;}\na:visited{color:'+message.theme.DemTextColor+'!important;}\n.text-secondary{color:'+message.theme["text-secondary"]+';}\n';

			if (themeType.includes('light')) {
				this.document.getElementsByTagName('body')[0].classList.add('white_bg');
				rule += '.btn_install{background-color: #444 !important; color: #fff !important}\n';
				rule += '.btn_install:hover{background-color: #1c1c1c !important;}\n';
				rule += '.btn_install:active{background-color: #446995 !important;}\n';
				rule += '.btn_remove:active{background-color: #293f59 !important; color: #fff !important}\n';
				rule += '.div_offered{color: rgba(0,0,0,0.45); !important;}\n';
				rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #444 !important; color: #fff !important; border:1px solid #444 !important;}\n';
			} else {
				rule += '.btn_install{background-color: #e0e0e0 !important; color: #333 !important}\n';
				rule += '.btn_install:hover{background-color: #fcfcfc !important;}\n';
				rule += '.btn_install:active{background-color: #fcfcfc !important;}\n';
				rule += '.btn_remove:active{background-color: #555 !important; color: rgb(255,255,255,0.8) !important}\n';
				rule += '.div_offered{color: rgba(255,255,255,0.8); !important;}\n';
				rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #e0e0e0 !important; color: #333 !important; border:1px solid #e0e0e0 !important;}\n';
			}

			let styleTheme = document.createElement('style');
			styleTheme.type = 'text/css';
			styleTheme.innerHTML = message.style + rule;
			document.getElementsByTagName('head')[0].appendChild(styleTheme);
			break;
		case 'onExternalMouseUp':
			let evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			document.dispatchEvent(evt);
			break;
		case 'PluginReady':
			// get all installed plugins
			editorVersion = ( message.version && message.version.includes('.') ? getPluginVersion(message.version) : 1e8 );
			sendMessage({type: 'getInstalled'}, '*');
			break;
		case 'onClickBack':
			onClickBack();
			break;
	};
}, false);

function fetchAllPlugins(bFirstRender, bshowMarketplace) {
	// function for fetching all plugins from config
	isPluginLoading = true;
	makeRequest(configUrl, 'GET', null, null, true).then(
		function(response) {
			allPlugins = JSON.parse(response);
			if (installedPlugins)
				getAllPluginsData(bFirstRender, bshowMarketplace);
		},
		function(err) {
			createError( new Error( getTranslated( 'Problem with loading markeplace config.' ) ) );
			isPluginLoading = false;
			showMarketplace();
		}
	);
};

function makeRequest(url, method, responseType, body, bHandeNoInternet) {
	// this function makes GET request and return promise
	// maybe use fetch to in this function
	if (!method)
		method = 'GET';
	
	if (body)
		body = JSON.stringify(body);

	return new Promise(function (resolve, reject) {
		try {
			let xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			if (responseType)
				xhr.responseType = responseType;
			
			xhr.onload = function () {
				if (this.readyState == 4) {
					if (this.status !== 404 && (this.status == 200 || location.href.indexOf("file:") == 0)) {
						resolve(this.response);
					}
					if (this.status >= 400) {
						let errorText = this.status === 404 ? 'File not found.' : 'Network problem.';
						reject( new Error( getTranslated(errorText) ) );
					}
				}
			};

			xhr.onerror = function (err) {
				reject(err);
				if (url.includes('https') && bHandeNoInternet)
					handeNoInternet();
			};

			xhr.send(body);
		} catch (error) {
			reject(error);
		}
		
	});
};

function sendMessage(message) {
	// this function sends message to editor
	parent.postMessage(JSON.stringify(message), '*');
};

function detectLanguage() {
	// detect language or return default
	let lang = getUrlSearchValue("lang");
	if (lang.length == 2)
		lang = (lang.toLowerCase() + "-" + lang.toUpperCase());
	return lang || 'en-EN';
};

function detectThemeType() {
	// detect theme or return default
	let type = getUrlSearchValue("theme-type");
	return type || 'light';
};

function initElemnts() {
	elements.btnMyPlugins = document.getElementById('btn_myPlugins');
	elements.btnMarketplace = document.getElementById('btn_marketplace');
	elements.linkNewPlugin = document.getElementById('link_newPlugin');
	elements.divBody = document.getElementById('div_body');
	elements.divMain = document.getElementById('div_main');
	// elements.arrow = document.getElementById('arrow');
	// elements.close = document.getElementById('close');
	elements.divHeader = document.getElementById('div_header');
	elements.divSelected = document.getElementById('div_selected_toolbar');
	elements.divSelectedMain = document.getElementById('div_selected_main');
	elements.imgIcon = document.getElementById('img_icon');
	elements.spanName = document.getElementById('span_name');
	elements.spanOffered = document.getElementById('span_offered');
	elements.btnUpdate = document.getElementById('btn_update');
	elements.btnRemove = document.getElementById('btn_remove');
	elements.btnInstall = document.getElementById('btn_install');
	elements.spanSelectedDescr = document.getElementById('span_selected_description');
	elements.imgScreenshot = document.getElementById('image_screenshot');
	elements.linkPlugin = document.getElementById('link_plugin');
	elements.divScreen = document.getElementById("div_selected_image");
	elements.divGitLink = document.getElementById('div_github_link');
	elements.spanVersion = document.getElementById('span_ver');
	elements.divVersion = document.getElementById('div_version');
	elements.spanMinVersion = document.getElementById('span_min_ver');
	elements.divMinVersion = document.getElementById('div_min_version');
	elements.spanLanguages = document.getElementById('span_langs');
	elements.divLanguages = document.getElementById('div_languages');
	elements.divArrow = document.getElementById('div_arrows');
	elements.arrowPrev = document.getElementById('arrow_prev');
	elements.arrowNext = document.getElementById('arrow_next');
	elements.inpSearch = document.getElementById('inp_search');
	elements.btnUpdateAll = document.getElementById('btn_updateAll');
	elements.divRatingLink = document.getElementById('div_rating_link');
	elements.discussionLink = document.getElementById('discussion_link');
	elements.ratingStars = document.getElementById('div_rating_stars');
	elements.totalVotes = document.getElementById('total_votes');
	elements.divVotes = document.getElementById('div_votes');
	elements.loader = document.getElementById('loader-container');
};

function toogleLoader(show, text) {
	// show or hide loader
	if (!show) {
		clearTimeout(timeout);
		elements.loader.classList.add('hidden');
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;	
	} else if(!loader) {
		elements.loader.classList.remove('hidden');
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], ( getTranslated(text) ) + '...');
	}
};

function getAllPluginsData(bFirstRender, bshowMarketplace) {
	// get config file for each item in config.json
	isPluginLoading = true;
	let count = 0;
	let Unloaded = [];
	let url = isDesktop ? OOMarketplaceUrl : ioUrl;
	allPlugins.forEach(function(plugin, i, arr) {
		count++;
		if (typeof plugin !== 'object') {
			plugin.name = plugin;
		}
		let pluginUrl = (plugin.name.indexOf(":/\/") == -1) ? url + 'sdkjs-plugins/content/' + plugin.name + '/' : plugin.name;
		let confUrl = pluginUrl + 'config.json';
		makeRequest(confUrl, 'GET', null, null, true).then(
			function(response) {
				let config = JSON.parse(response);
				config.url = confUrl;
				config.baseUrl = pluginUrl;
				arr[i] = config;
				
				makeRequest(pluginUrl + 'translations/langs.json', 'GET', null, null, true).then(
					function(response) {
						let supportedLangs = [ getTranslated('English') ];
						let arr = JSON.parse(response);
						arr.forEach(function(full) {
							let short = full.split('-')[0];
							for (let i = 0; i < languages.length; i++) {
								if (languages[i][0] == short || languages[i][1] == short) {
									supportedLangs.push( getTranslated( languages[i][2] ) );
								}
							}
						});
						if (supportedLangs.length > 1)
							config.languages = supportedLangs;
					},
					function(error) {
						config.languages = [ getTranslated('English') ];
					}
				);
				if (plugin.discussion) {
					// get discussion page
					config.discussionUrl = plugin.discussion;
					let body = { target: plugin.discussion };
					makeRequest(proxyUrl, 'POST', null, body, false).then(function(data) {
						data = JSON.parse(data);
						if (data !== 'Not Found') {
							// if we load this page, parse it
							// remove head, because it can brake our styles
							let start = data.indexOf('<head>');
							let end = data.indexOf('</head>') + 7;
							document.getElementById('div_rating_git').innerHTML = data.substring(0, start) + data.substring(end);
							// we will have a problem if github change their page
							let first = Number(document.getElementById('result-row-1').childNodes[1].childNodes[3].innerText.replace(/[\n\s%]/g,''));
							let second = Number(document.getElementById('result-row-2').childNodes[1].childNodes[3].innerText.replace(/[\n\s%]/g,''));
							let third = Number(document.getElementById('result-row-3').childNodes[1].childNodes[3].innerText.replace(/[\n\s%]/g,''));
							let fourth = Number(document.getElementById('result-row-4').childNodes[1].childNodes[3].innerText.replace(/[\n\s%]/g,''));
							let fifth = Number(document.getElementById('result-row-5').childNodes[1].childNodes[3].innerText.replace(/[\n\s%]/g,''));
							let total = Number(document.getElementsByClassName('text-small color-fg-subtle')[0].childNodes[1].firstChild.textContent.replace(/[\n\sa-z]/g,''));
							first = Math.ceil(total * first / 100) * 5;   // it's 5 stars
							second = Math.ceil(total * second / 100) * 4; // it's 4 stars
							third = Math.ceil(total * third / 100) * 3;   // it's 3 stars
							fourth = Math.ceil(total * fourth / 100) * 2; // it's 2 stars
							fifth = Math.ceil(total * fifth / 100);       // it's 1 star
							let average = total === 0 ? 0 : (first + second + third + fourth + fifth) / total;
							let tmp = value | 0;
							// if we have an average value less than 0.5, we round down, if more than 0.5, then up
							average = ( (value - tmp) >= 0.5) ? value | 1 : tmpVal;
							config.rating = {
								total: total,
								average: average,
								string: getStringRating(average)
							};
						}
					}).catch(function(err){
						createError('Problem with loading rating', true);
					}).finally(function(){
						count--;
						if (!count)
							endPluginsDataLoading(bFirstRender, bshowMarketplace, Unloaded);
					});
				} else {
					count--;
				}

				if (!count)
					endPluginsDataLoading(bFirstRender, bshowMarketplace, Unloaded);
			},
			function(err) {
				count--;
				Unloaded.push(i);
				createError(new Error('Problem with loading plugin config.\nConfig: ' + confUrl));
				if (!count)
					endPluginsDataLoading(bFirstRender, bshowMarketplace, Unloaded);
			}
		);
	});

	if (isDesktop && installedPlugins && bFirstRender) {
		isPluginLoading = false;
		getInstalledLanguages();
		showMarketplace();
	}
};

function endPluginsDataLoading(bFirstRender, bshowMarketplace, Unloaded) {
	// console.log('getAllPluginsData: ' + (Date.now() - start));
	removeUnloaded(Unloaded);
	sortPlugins(true, false, 'name');
	isPluginLoading = false;
	if (bFirstRender)
		showMarketplace();
	else if (bshowMarketplace)
		toogleView(elements.btnMarketplace, elements.btnMyPlugins, messages.linkPR, true, true);
};

function getInstalledLanguages() {
	installedPlugins.forEach(function(pl) {
		makeRequest(pl.obj.baseUrl + 'translations/langs.json', 'GET', null, null, true).then(
			function(response) {
				let supportedLangs = [ getTranslated('English') ];
				let arr = JSON.parse(response);
				arr.forEach(function(full) {
					let short = full.split('-')[0];
					for (let i = 0; i < languages.length; i++) {
						if (languages[i][0] == short || languages[i][1] == short) {
							supportedLangs.push( getTranslated( languages[i][2] ) );
						}
					}
				});
				if (supportedLangs.length > 1)
					pl.obj.languages = supportedLangs;
			},
			function(error) {
				pl.obj.languages = [ getTranslated('English') ];
			}
		)
	});
};

function showListofPlugins(bAll, sortedArr) {
	// show list of plugins
	$('.div_notification').remove();
	$('.div_item').remove();
	let arr = (sortedArr ? sortedArr : (bAll ? allPlugins : installedPlugins));

	// получаем список backup плагинов
	if (!bAll && isDesktop) {
		var _pluginsTmp = JSON.parse(window["AscDesktopEditor"]["GetBackupPlugins"]());

		if (_pluginsTmp.length) {
			var len = _pluginsTmp[0]["pluginsData"].length;
			for (var i = 0; i < len; i++) {
				let plugin = _pluginsTmp[0]["pluginsData"][i];
				plugin.baseUrl = _pluginsTmp[0]["url"] + plugin.guid.replace('asc.', '') + '/';

				installed = findPlugin(false, plugin.guid);

				if (!installed) {
					installedPlugins.push({
						"baseUrl": _pluginsTmp[0]["url"],
						"guid": plugin.guid,
						"canRemoved": true,
						"obj": plugin,
						"removed": true
					});
				}
			}
		}
	}

	if (arr.length) {
		arr.forEach(function(plugin) {
			if (plugin && plugin.guid)
				createPluginDiv(plugin, !bAll);
		});
		setTimeout(function(){if (Ps) Ps.update()});
	} else {
		// if no istalled plugins and my plugins button was clicked
		let notification = Array.isArray(sortedArr) ? 'Nothing was found for this query.' : bAll ? 'Problem with loading plugins.' : 'No installed plugins.';
		createNotification(notification);
	}
	if (!Ps) {
		Ps = new PerfectScrollbar('#div_main', {});
		Ps.update();
	}
};

function getPluginVersion(text)
{
	let factor = 1000;
	let major = 1;
	let minor = 0;
	let build = 0;

	if (text && text.split)
	{
		let arValues = text.split('.');
		let count = arValues.length;
		if (count > 0) major = parseInt(arValues[0]);
		if (count > 1) minor = parseInt(arValues[1]);
		if (count > 2) build = parseInt(arValues[2]);
	}

	return major * factor * factor + minor * factor + build;
}

function createPluginDiv(plugin, bInstalled) {
	// this function creates div (preview) for plugins
	let div = document.createElement('div');
	div.id = plugin.guid;
	div.setAttribute('data-guid', plugin.guid);
	div.className = 'div_item form-control noselect';
	div.style.border = (1 / scale.devicePR) +'px solid ' + (themeType == 'ligh' ? '#c0c0c0' : '#666666');
	
	div.onmouseenter = function(event) {
		event.target.classList.add('div_item_hovered');
	};

	div.onmouseleave = function(event) {
		event.target.classList.remove('div_item_hovered');
	};

	div.onclick = onClickItem;

	let installed = bInstalled ? plugin : findPlugin(false, plugin.guid);
	if (bInstalled) {
		plugin = findPlugin(true, plugin.guid);
	}

	let bCheckUpdate = true;
	if (!plugin) {
		plugin = installed.obj;
		bCheckUpdate = false;
	}

	let bNotAvailable = false;
	const minV = (plugin.minVersion ? getPluginVersion(plugin.minVersion) : -1);
	if (minV > editorVersion) {
		bCheckUpdate = false;
		bNotAvailable = true;
	}

	let bHasUpdate = false;
	let bRemoved = (installed && installed.removed);
	if (bCheckUpdate && installed && plugin) {
		const installedV = getPluginVersion(installed.obj.version);
		const lastV = getPluginVersion(plugin.version);
		if (lastV > installedV) {
			bHasUpdate = true;
			plugin.bHasUpdate = true;
			if (!bRemoved)
				elements.btnUpdateAll.classList.remove('hidden');
		}
	}
	
	let variation = plugin.variations[0];
	let name = (bTranslate && plugin.nameLocale && plugin.nameLocale[shortLang]) ? plugin.nameLocale[shortLang] : plugin.name;
	let description = (bTranslate && variation.descriptionLocale && variation.descriptionLocale[shortLang]) ? variation.descriptionLocale[shortLang] : variation.description;
	let bg = variation.store && variation.store.background ? variation.store.background[themeType] : defaultBG;
	let additional = bNotAvailable ? 'disabled title="' + getTranslated(messages.versionWarning) + '"'  : '';
	let template = '<div class="div_image" style="background: ' + bg + '">' +
						'<img id="img_'+plugin.guid+'" class="plugin_icon" style="display:none" data-guid="' + plugin.guid + '" src="' + getImageUrl(plugin.guid, false, true, ('img_' + plugin.guid) ) + '">' +
					'</div>' +
					'<div class="div_description">'+
						'<span class="span_name">' + name + '</span>' +
						'<span class="span_description">' + description + '</span>' +
					'</div>' +
					'<div class="div_footer">' +
						'<div class="advanced_info">' +
							'<div id="div_rating" class="div_rating">'+ (plugin.rating ? plugin.rating.string : '') +'</div>' +
							(bHasUpdate
								? '<span class="span_update ' + (!bRemoved ? "" : "hidden") + '">' + getTranslated("Update") + '</span>'
								: ''
							) +
						'</div>' +
						( (installed && !bRemoved)
							? (installed.canRemoved ? '<button class="btn-text-default btn_item btn_remove" onclick="onClickRemove(event.target, event)" ' + (bNotAvailable ? "dataDisabled=\"disabled\"" : "") +'>' + getTranslated("Remove") + '</button>' : '<div style="height:20px"></div>')
							: '<button class="btn_item btn-text-default btn_install" onclick="onClickInstall(event.target, event)"' + additional + '>'  + getTranslated("Install") + '</button>'
						)
						+
					'</div>';
	div.innerHTML = template;
	elements.divMain.appendChild(div);
	if (Ps) Ps.update();
};

function onClickInstall(target, event) {
	// click install button
	event.stopImmediatePropagation();
	// click install button
	// we should do that because we have some problem when desktop is loading plugin
	if (isDesktop) {
		toogleLoader(true, 'Installation');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(toogleLoader, 200, true, "Installation");
	}
	let guid = target.parentNode.parentNode.getAttribute('data-guid');
	let plugin = findPlugin(true, guid);
	let installed = findPlugin(false, guid);
	if (!plugin && !installed) {
		// if we are here if means that plugin tab is opened, plugin is uninstalled and we don't have internet connection
		sendMessage( { type : "showButton", show : false } );
		onClickBack();
		toogleLoader(false);
	}
	let message = {
		type : 'install',
		url : (installed ? installed.obj.baseUrl : plugin.url),
		guid : guid,
		config : (installed ? installed.obj : plugin)
	};
	// we should do that because we have some problem when desktop is loading plugin
	if (isDesktop) {
		setTimeout(function(){
			sendMessage(message);
		}, 200);
	} else {
		sendMessage(message);
	}
};

function onClickUpdate(target) {
	// click update button
	// we should do that because we have some problem when desktop is loading plugin
	if (isDesktop) {
		toogleLoader(true, 'Updating');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(toogleLoader, 200, true, "Updating");
	}
	let guid = target.parentElement.parentElement.parentElement.getAttribute('data-guid');
	let plugin = findPlugin(true, guid);
	updateCount++;
	let message = {
		type : 'update',
		url : plugin.url,
		guid : guid,
		config : plugin
	};
	// we should do that because we have some problem when desktop is loading plugin
	if (isDesktop) {
		setTimeout(function(){
			sendMessage(message);
		}, 200);
	} else {
		sendMessage(message);
	}
};

function onClickRemove(target, event) {
	event.stopImmediatePropagation();
	// click remove button
	if (isDesktop) {
		toogleLoader(true, 'Removal');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(toogleLoader, 200, true, "Removal");
	}
	let guid = target.parentNode.parentNode.getAttribute('data-guid');
	let message = {
		type : 'remove',
		guid : guid,
		backup : needBackupPlugin(guid)
	};
	sendMessage(message);
};

function needBackupPlugin(guid) {
	// проверяем установленный плагин:
	// если плагин есть в стор ( и его версия <= ? ), то можем удалить, пользователь сможет поставить актуальную версию
	// если плагина нет в стор, нужно его хранить у пользователя с возможностью восстановления

	return isDesktop ? findPlugin(true, guid) == undefined : false;
}

function onClickUpdateAll() {
	clearTimeout(timeout);
	timeout = setTimeout(toogleLoader, 200, true, "Updating");
	elements.btnUpdateAll.classList.add('hidden');
	let arr = allPlugins.filter(function(el) {
		return el.bHasUpdate;
	});
	updateCount = arr.length;
	arr.forEach(function(plugin){
		let message = {
			type : 'update',
			url : plugin.url,
			guid : plugin.guid,
			config : plugin
		};
		sendMessage(message);
	});
};

function onClickItem() {
	// There we will make preview for selected plugin
	let offered = "Ascensio System SIA";
	
	let guid = this.getAttribute('data-guid');
	let pluginDiv = document.getElementById(guid);
	let divPreview = document.createElement('div');
	divPreview.id = 'div_preview';
	divPreview.className = 'div_preview';

	let installed = findPlugin(false, guid);
	let plugin = findPlugin(true, guid);
	if ( !plugin || ( isDesktop && installed ) ) {
		elements.divGitLink.classList.add('hidden');
		plugin = installed.obj;
	} else {
		elements.divGitLink.classList.remove('hidden');
	}

	let bCorrectUrl = isDesktop || ( !plugin.baseUrl.includes('http://') && !plugin.baseUrl.includes('file:') && !plugin.baseUrl.includes('../'));

	if (bCorrectUrl && plugin.variations[0].store && plugin.variations[0].store.screenshots && plugin.variations[0].store.screenshots.length) {
		current.screenshots = plugin.variations[0].store.screenshots;
		current.index = 0;
		current.url = plugin.baseUrl;
		let url = current.url + current.screenshots[current.index];
		elements.imgScreenshot.setAttribute('src', url);
		elements.imgScreenshot.onload = function() {
			elements.imgScreenshot.classList.remove('hidden');
			if (current.screenshots.length > 1)
				elements.divArrow.classList.remove('hidden');
			setDivHeight();
		}
	} else {
		elements.imgScreenshot.classList.add('hidden');
		elements.divArrow.classList.add('hidden');
	}

	let bHasUpdate = (pluginDiv.lastChild.firstChild.tagName === 'SPAN' && !pluginDiv.lastChild.firstChild.classList.contains('hidden'));
	
	if ( (installed && installed.obj.version) || plugin.version ) {
		elements.spanVersion.innerText = (installed && installed.obj.version ? installed.obj.version : plugin.version);
		elements.divVersion.classList.remove('hidden');
	} else {
		elements.spanVersion.innerText = '';
		elements.divVersion.classList.add('hidden');
	}

	if ( (installed && installed.obj.minVersion) || plugin.minVersion ) {
		elements.spanMinVersion.innerText = (installed && installed.obj.minVersion ? installed.obj.minVersion : plugin.minVersion);
		elements.divMinVersion.classList.remove('hidden');
	} else {
		elements.spanMinVersion.innerText = '';
		elements.divMinVersion.classList.add('hidden');
	}

	if (plugin.languages) {
		elements.spanLanguages.innerText = plugin.languages.join(', ') + '.';
		elements.divLanguages.classList.remove('hidden');
	} else {
		elements.spanLanguages.innerText = '';
		elements.divLanguages.classList.add('hidden');
	}

	let pluginUrl = plugin.baseUrl.replace('https://onlyoffice.github.io/', 'https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/');

	elements.ratingStars.innerText = plugin.rating ? plugin.rating.string : '';
	if (plugin.rating) {
		elements.totalVotes.innerText = plugin.rating.total;
		elements.divVotes.classList.remove('hidden');
	} else {
		elements.divVotes.classList.add('hidden');
	}
	
	// TODO problem with plugins icons (different margin from top)
	elements.divSelected.setAttribute('data-guid', guid);
	// we do this, because new icons for store are too big for use it in this window.
	let tmp = getImageUrl(guid, true, true, 'img_icon');
	elements.imgIcon.setAttribute('src', tmp);
	elements.spanName.innerHTML = this.children[1].children[0].innerText;
	elements.spanOffered.innerHTML = plugin.offered || offered;
	elements.spanSelectedDescr.innerHTML = this.children[1].children[1].innerText;
	elements.linkPlugin.setAttribute('href', pluginUrl);
	if (plugin.discussionUrl)
		elements.discussionLink.setAttribute('href', plugin.discussionUrl);
	else
		elements.discussionLink.removeAttribute('href');

	if (bHasUpdate) {
		elements.btnUpdate.classList.remove('hidden');
	} else {
		elements.btnUpdate.classList.add('hidden');
	}

	if (installed && !installed.removed) {
		if (installed.canRemoved) {
			elements.btnRemove.classList.remove('hidden');
		} else {
			elements.btnRemove.classList.add('hidden');
		}
		elements.btnInstall.classList.add('hidden');
	} else {
		elements.btnRemove.classList.add('hidden');
		elements.btnInstall.classList.remove('hidden');
	}

	if (pluginDiv.lastChild.lastChild.hasAttribute('disabled')) {// || pluginDiv.lastChild.lastChild.hasAttribute('dataDisabled')) {
		elements.btnInstall.setAttribute('disabled','');
		elements.btnInstall.setAttribute('title', getTranslated(messages.versionWarning));
	}
	else {
		elements.btnInstall.removeAttribute('disabled');
		elements.btnInstall.removeAttribute('title');
	}

	elements.divSelected.classList.remove('hidden');
	elements.divSelectedMain.classList.remove('hidden');
	elements.divBody.classList.add('hidden');
	sendMessage( { type : "showButton", show : true } );
	// elements.arrow.classList.remove('hidden');
};

function onClickBack() {
	// click on left arrow in preview mode
	elements.imgIcon.style.display = 'none';
	elements.imgScreenshot.setAttribute('src','')
	document.getElementById('span_overview').click();
	elements.divSelected.classList.add('hidden');
	elements.divSelectedMain.classList.add('hidden');
	elements.divBody.classList.remove('hidden');
	elements.divArrow.classList.add('hidden');
	current.index = 0;
	current.screenshots = [];
	current.url = '';
	// elements.arrow.classList.add('hidden');
	if(Ps) Ps.update();
};

function onClickScreenshot() {
	// todo create a modal with the big screenshot and exit from this mode
	// $(".arrow_conteiner_small").addClass("arrow_conteiner_big");
	// $(".arrow_small").removeClass("arrow_big");
	// $(".arrow_conteiner_small").removeClass(".arrow_conteiner_small");
	// $(".arrow_small").removeClass(".arrow_small");
};

function onSelectPreview(target, isOverview) {
	// change mode of preview
	if ( !target.classList.contains('span_selected') ) {
		$(".span_selected").removeClass("span_selected");
		target.classList.add("span_selected");

		if (isOverview) {
			document.getElementById('div_selected_info').classList.add('hidden');
			document.getElementById('div_selected_preview').classList.remove('hidden');
			setDivHeight();
		} else {
			document.getElementById('div_selected_preview').classList.add('hidden');
			document.getElementById('div_selected_info').classList.remove('hidden');
		}
	}
};

function createNotification(text, err) {
	// creates any notification for user inside elements.divMain window (you should clear this element before making notification)
	let div = document.createElement('div');
	div.className = 'div_notification';
	if (err) {
		let icon = document.createElement('div');
		icon.className = 'icon_notification';
		div.appendChild(icon);
		let spanErr = document.createElement('span');
		spanErr.className = 'error_caption';
		spanErr.innerHTML = getTranslated(err);
		div.appendChild(spanErr);
	}
	let spanNot = document.createElement('span');
	spanNot.className = 'span_notification text-secondary';
	spanNot.innerHTML = getTranslated(text);
	div.appendChild(spanNot);
	elements.divMain.appendChild(div);
};

function createError(err, bDontShow) {
	// creates a modal window with error message for user and error in console
	console.error(err);
	let divErr = document.getElementById('div_error');
	// we don't show a new error if we have previous one
	if (!divErr.classList.contains('hidden') || bDontShow)
		return;
	let background = document.createElement('div');
	background.className = 'asc-plugin-loader';
	let span = document.createElement('span');
	span.className = 'error_caption';
	span.innerHTML = err.message || getTranslated('Problem with loading some resources');
	background.appendChild(span);
	divErr.appendChild(background);
	divErr.classList.remove('hidden');
	setTimeout(function() {
		// remove error after 5 seconds
		background.remove();
		divErr.classList.add('hidden');
	}, 5000);
};

function setDivHeight() {
	// set height for div with image in preview mode
	if (Ps) Ps.update();
	// console.log(Math.round(window.devicePixelRatio * 100));
	if (elements.divScreen) {
		let height = elements.divScreen.parentNode.clientHeight - elements.divScreen.previousElementSibling.clientHeight - 40 + 'px';
		elements.divScreen.style.height = height;
		elements.divScreen.style.maxHeight = height;
		if (isIE) {
			elements.imgScreenshot.style.maxHeight = height;
			elements.imgScreenshot.style.maxWidth = elements.divScreen.clientWidth + 'px';
		}
	}
};

window.onresize = function() {
	setDivHeight();
	if (scale.devicePR !== window.devicePixelRatio) {
		scale.devicePR = window.devicePixelRatio;
		$('.div_item').css('border', ((1 / scale.devicePR) +'px solid ' + (themeType == 'ligh' ? '#c0c0c0' : '#666666')));
		if (1 < scale.devicePR && scale.devicePR <= 2 || isResizeOnStart) {
			let oldScale = scale.value;
			isResizeOnStart = false;
			if (scale.devicePR < 1)
				return;

			calculateScale();

			if (scale.value !== oldScale)
				changeIcons();
		}
	}
};

function calculateScale() {
	let bestIndex = 0;
	scale.devicePR = window.devicePixelRatio;
	let bestDistance = Math.abs(supportedScaleValues[0] - scale.devicePR);
	let currentDistance = 0;
	for (let i = 1, len = supportedScaleValues.length; i < len; i++) {
		if (true) {
			if (Math.abs(supportedScaleValues[i] - scale.devicePR) > 0.0001) {
				if ( (supportedScaleValues[i] - 0.0501) > (scale.devicePR - 0.0001))
					break;
			}
		}

		currentDistance = Math.abs(supportedScaleValues[i] - scale.devicePR);
		if (currentDistance < (bestDistance - 0.0001)) {
			bestDistance = currentDistance;
			bestIndex = i;
		}
	}
	scale.percent = supportedScaleValues[bestIndex] * 100 + '%';
	scale.value = supportedScaleValues[bestIndex];
};

function changeIcons() {
	let arr = document.getElementsByClassName('plugin_icon');
	for (let i = 0; i < arr.length; i++) {
		let guid = arr[i].getAttribute('data-guid');
		arr[i].setAttribute( 'src', getImageUrl( guid, false, true, ('img_' + guid) ) );
	}
	let guid = elements.imgIcon.parentNode.parentNode.getAttribute('data-guid');
	elements.imgIcon.setAttribute('src', getImageUrl(guid, true, true, 'img_icon'));
};

function getTranslation() {
	// gets translation for current language
	if (shortLang != "en") {
		isTranslationLoading = true
		makeRequest('./translations/langs.json', 'GET', null, null, true).then(
			function(response) {
				let arr = JSON.parse(response);
				let fullName, shortName;
				for (let i = 0; i < arr.length; i++) {
					let file = arr[i];
					if (file == lang) {
						fullName = file;
						break;
					} else if (file.split('-')[0] == shortLang) {
						shortName = file;
					}
				}
				if (fullName || shortName) {
					bTranslate = true;
					makeRequest('./translations/' + (fullName || shortName) + '.json', 'GET', null, null, true).then(
						function(res) {
							// console.log('getTranslation: ' + (Date.now() - start));
							translate = JSON.parse(res);
							onTranslate();
						},
						function(err) {
							createError( new Error( getTranslated( 'Cannot load translation for current language.' ) ) );
							isTranslationLoading = false;
							showMarketplace();
						}
					);
				} else {
					isTranslationLoading = false;
					showMarketplace();
				}	
			},
			function(err) {
				createError( new Error( getTranslated( 'Cannot load translations list file.' ) ) );
				isTranslationLoading = false;
				showMarketplace();
			}
		);
	} else {
		isTranslationLoading = false;
		showMarketplace();
	}
};

function onTranslate() {
	isTranslationLoading = false;
	// translates elements on current language
	elements.linkNewPlugin.innerHTML = getTranslated(messages.linkPR);
	elements.btnMyPlugins.innerHTML = getTranslated('My plugins');
	elements.btnMarketplace.innerHTML = getTranslated('Marketplace');
	elements.btnInstall.innerHTML = getTranslated('Install');
	elements.btnRemove.innerHTML = getTranslated('Remove');
	elements.btnUpdate.innerHTML = getTranslated('Update');
	elements.btnUpdateAll.innerHTML = getTranslated('Update All');
	elements.inpSearch.placeholder = getTranslated('Search plugins') + '...';
	document.getElementById('lbl_header').innerHTML = getTranslated('Manage plugins');
	document.getElementById('span_offered_caption').innerHTML = getTranslated('Offered by') + ': ';
	document.getElementById('span_overview').innerHTML = getTranslated('Overview');
	document.getElementById('span_info').innerHTML = getTranslated('Info & Support');
	document.getElementById('span_lern').innerHTML = getTranslated('Learn how to use') + ' ';
	document.getElementById('span_lern_plugin').innerHTML = getTranslated('the plugin in') + ' ';
	document.getElementById('span_contribute').innerHTML = getTranslated('Contribute') + ' ';
	document.getElementById('span_contribute_end').innerHTML = getTranslated('to the plugin developmen or report an issue on') + ' ';
	document.getElementById('span_help').innerHTML = getTranslated('Get help') + ' ';
	document.getElementById('span_help_end').innerHTML = getTranslated('with the plugin functionality on our forum.');
	document.getElementById('span_create').innerHTML = getTranslated('Create a new plugin using') + ' ';
	document.getElementById('span_ver_caption').innerHTML = getTranslated('Version') + ': ';
	document.getElementById('span_min_ver_caption').innerHTML = getTranslated('The minimum supported editors version') + ': ';
	document.getElementById('span_langs_caption').innerHTML = getTranslated('Languages') + ': ';
	document.getElementById('span_categories').innerHTML = getTranslated('Categories');
	document.getElementById('opt_all').innerHTML = getTranslated('All');
	document.getElementById('opt_rec').innerHTML = getTranslated('Recommended');
	document.getElementById('opt_dev').innerHTML = getTranslated('Developer tools');
	document.getElementById('opt_work').innerHTML = getTranslated('Work');
	document.getElementById('opt_enter').innerHTML = getTranslated('Entertainment');
	document.getElementById('opt_com').innerHTML = getTranslated('Communication');
	document.getElementById('opt_spec').innerHTML = getTranslated('Special abilities');
	document.getElementById('votes_caption').innerHTML = getTranslated('votes');
	showMarketplace();
};

function showMarketplace() {
	// show main window to user
	if (!isPluginLoading && !isTranslationLoading && !isFrameLoading && installedPlugins) {
		createSelect();
		if (isOnline)
			showListofPlugins(isOnline);
		else
			toogleView(elements.btnMyPlugins, elements.btnMarketplace, messages.linkManually, false, false);
			
		toogleLoader(false);
		catFiltred = allPlugins;
		// elements.divBody.classList.remove('hidden');
		elements.divBody.classList.remove('transparent');

		// console.log('showMarketplace: ' + (Date.now() - start));
		// we are removing the header for now, since the plugin has its own
		// elements.divHeader.classList.remove('hidden');
	}
};

function createSelect() {
	$('#select_categories').select2({
		minimumResultsForSearch: Infinity
	}).on('change', function(event) {
		filterByCategory(event.currentTarget.value);
	});

	// $('#select_sortBy').select2({
	// 	minimumResultsForSearch: Infinity
	// }).on('change', function(event) {
	// 	console.log(event.currentTarget.value);
	// });
};

function getImageUrl(guid, bNotForStore, bSetSize, id) {
	// get icon url for current plugin (according to theme and scale)
	let iconScale = '/icon.png';
	switch (scale.percent) {
		case '125%':
			iconScale = '/icon@1.25x.png'
			break;
		case '150%':
			iconScale = '/icon@1.5x.png'
			break;
		case '175%':
			iconScale = '/icon@1.75x.png'
			break;
		case '200%':
			iconScale = '/icon@2x.png'
			break;
	}
	let curIcon = './resources/img/defaults/' + (bNotForStore ? ('info/' + themeType) : 'card') + iconScale;
	let plugin;
	// We have a problem with "http" and "file" routes.
	// In desktop we have a local installed marketplace. It's why we use local routes only for desktop.
	let baseUrl;

	if (installedPlugins && isDesktop) {
		// it doesn't work when we use icons from other resource (cors problems)
		// it's why we use local icons only for desktop
		plugin = findPlugin(false, guid);
		if (plugin) {
			plugin = plugin.obj;
			baseUrl = plugin.baseUrl;
		}
	}

	if ( ( !plugin || !isDesktop ) && allPlugins) {
		plugin = findPlugin(true, guid);
		if (plugin)
			baseUrl = plugin.baseUrl;
	}
	// github doesn't allow to use "http" or "file" as the URL for an image
	if ( plugin && ( baseUrl.includes('https://') || isDesktop) ) {
		let variation = plugin.variations[0];
		
		if (!bNotForStore && variation.store && variation.store.icons) {
			// icons are in config of store field (work only with new scheme)
			// it's an object with 2 fields (for dark and light theme), which contain route to icons folder
			curIcon = baseUrl + variation.store.icons[themeType] + iconScale;
		} else if (variation.icons2) {
			// it's old scheme. There could be an array with objects which have theme field or an array from one object without theme field
			let icon = variation.icons2[0];
			for (let i = 1; i < variation.icons2.length; i++) {
				if ( themeType.includes(variation.icons2[i].style) ) {
					icon = variation.icons2[i];
					break;
				}
			}
			curIcon = baseUrl + icon[scale.percent].normal;
		} else if (variation.icons) {
			// there could be old and new scheme
			// there will be a string array or object like icons2 above (old scheme)
			// there will be a object with 2 fields (for dark and light theme), which contain route to icons folder (new scheme)
			if (!Array.isArray(variation.icons)) {
				// new scheme
				curIcon = baseUrl + variation.icons[themeType] + iconScale;
			} else {
				// old scheme
				if (typeof(variation.icons[0]) == 'object' ) {
					// old scheme and icons like icons2 above
					let icon = variation.icons[0];
					for (let i = 1; i < variation.icons.length; i++) {
						if ( themeType.includes(variation.icons[i].style) ) {
							icon = variation.icons[i];
							break;
						}
					}
					curIcon = baseUrl + icon[scale.percent].normal;
				} else {
					// old scheme and icons is a string array
					curIcon = baseUrl + (scale.value >= 1.2 ? variation.icons[1] : variation.icons[0]);
				}
			}
		}	
	}

	if (bSetSize) {
		makeRequest(curIcon, 'GET', 'blob', null, true).then(
			function (res) {
				let reader = new FileReader();
				reader.onloadend = function() {
					let imageUrl = reader.result;		
					let img = document.createElement('img');
					img.setAttribute('src', imageUrl);
					img.onload = function () {
						let icon = document.getElementById(id);
						icon.style.width = ( (img.width/scale.value) >> 0 ) + 'px';
						icon.style.height = ( (img.height/scale.value) >> 0 ) + 'px';
						icon.style.display = '';
					}
					
				}
				reader.readAsDataURL(res);
			},
			function(error) {
				// it's because we have a new maket for error messages
				createError(error, true);
			}
		);
	}
	
	return curIcon;
};

function getUrlSearchValue(key) {
	let res = '';
	if (window.location && window.location.search) {
		let search = window.location.search;
		let pos1 = search.indexOf(key + '=');
		if (-1 != pos1) {
			pos1 += key.length + 1;
			let pos2 = search.indexOf("&", pos1);
			res = search.substring(pos1, (pos2 != -1 ? pos2 : search.length) )
		}
	}
	return res;
};

function toogleView(current, oldEl, text, bAll, bForce) {
	if ( !current.classList.contains('btn_toolbar_active') || bForce ) {
		elements.inpSearch.value = '';
		founded = [];
		oldEl.classList.remove('btn_toolbar_active');
		current.classList.add('btn_toolbar_active');
		elements.linkNewPlugin.innerHTML = getTranslated(text);
		let toolbar = document.getElementById('toolbar_tools');
		let flag = !isDesktop && !isOnline;
		if ( ( bAll && (!isOnline || isPluginLoading) ) || flag) {
			$('.div_notification').remove();
			$('.div_item').remove();
			setTimeout(function(){if (Ps) Ps.update()});
			toolbar.classList.add('hidden');
			createNotification('No Internet Connection.', 'Problem with loading some resources')
		} else {
			toolbar.classList.remove('hidden');
			if (document.getElementById('select_categories').value == 'all') {
				showListofPlugins(bAll);
				catFiltred = bAll ? allPlugins : installedPlugins;
			} else {
				filterByCategory(document.getElementById('select_categories').value);
			}
		}
		elements.linkNewPlugin.href = bAll ? "https://github.com/ONLYOFFICE/onlyoffice.github.io/pulls" : "https://api.onlyoffice.com/plugin/installation";

		if (isDesktop && !bAll) {
			elements.linkNewPlugin.href = "#";
			elements.linkNewPlugin.onclick = function (e) {
				e.preventDefault();
				installPluginManually();
			}
		}
	}
};

function installPluginManually() {
	window["AscDesktopEditor"]["OpenFilenameDialog"]("plugin", false, function (_file) {
		var file = _file;
		if (Array.isArray(file))
			file = file[0];

		let result = window["AscDesktopEditor"]["PluginInstall"](file);
		if (result) {
			// нужно обновить список установленных плагинов
			sendMessage({ type: 'getInstalled', updateInstalled: true }, '*');
		}
	});
};

function sortPlugins(bAll, bInst, type) {
	switch (type) {
		case 'rating':
			// todo
			break;
		case 'instalations':
			// todo
			break;
		case 'start':
			if (bInst) {
				let protected = [];
				let removed = [];
				let arr = [];
				installedPlugins.forEach(function(pl){
					if (!pl.canRemoved)
						protected.push(pl);
					else if (pl.removed)
						removed.push(pl);
					else
						arr.push(pl);
				});
				installedPlugins = protected.concat(arr, removed);
			}
			break;
	
		default:
			if (bAll) {
				allPlugins.sort(function(a, b) {
					return a.name.localeCompare(b.name);
				});
			}
			if (bInst) {
				installedPlugins.sort(function(a, b) {
					return a.obj.name.localeCompare(b.obj.name);
				});
			}
			break;
	}
};

function makeSearch(val) {
	clearTimeout(searchTimeout);
	searchTimeout = setTimeout(function() {
		let plugins = catFiltred;
		let bUpdate = false;
		let arr = plugins.filter(function(el) {
			let plugin = el.obj || el;
			let name = (plugin.nameLocale && plugin.nameLocale[shortLang]) ? plugin.nameLocale[shortLang] : plugin.name;
			return name.toLowerCase().includes(val);
		});

		if (founded.length == arr.length) {
			if (JSON.stringify(founded) != JSON.stringify(arr)) {
				founded = arr;
				bUpdate = true;
			}
		} else {
			founded = arr;
			bUpdate = true;
		}

		if (founded.length) {
			if (bUpdate)
				showListofPlugins(elements.btnMarketplace.classList.contains('btn_toolbar_active'), founded);
		} else {
			showListofPlugins(elements.btnMarketplace.classList.contains('btn_toolbar_active'), []);
		}
	}, 100);
};

function filterByCategory(category) {
	let plugins = elements.btnMarketplace.classList.contains('btn_toolbar_active') ? allPlugins : installedPlugins;
	let arr;
	if (category != "all") {
		arr = plugins.filter(function(plugin) {
			let variation = plugin.variations ? plugin.variations[0] : plugin.obj.variations[0];
			let arrCat = (variation.store && variation.store.categories) ? variation.store.categories : [];
			return arrCat.includes(category);
		});
	} else {
		arr = plugins;
	}
	catFiltred = arr;
	if (elements.inpSearch.value.trim() == '')
		showListofPlugins(elements.btnMarketplace.classList.contains('btn_toolbar_active'), arr);
	else
		makeSearch(elements.inpSearch.value.trim().toLowerCase());
};

function removeUnloaded(unloaded) {
	unloaded.forEach(function(el){
		allPlugins.splice(el, 1);
	})
};

function findPlugin(bAll, guid) {
	let res = bAll
			? allPlugins.find(function(el){return el.guid === guid})
			: installedPlugins.find(function(el){return el.guid === guid});
	return res;
};

function changeAfterInstallOrRemove(bInstall, guid, bHasLocal) {
	let btn = this.document.getElementById(guid).lastChild.lastChild;
	btn.innerHTML = getTranslated( ( bInstall ? 'Remove' : 'Install' ) );
	btn.classList.add( ( bInstall ? 'btn_remove' : 'btn_install' ) );
	btn.classList.remove( ( bInstall ? 'btn_install' : 'btn_remove' ) );
	btn.onclick = function(e) {
		if (bInstall)
			onClickRemove(e.target, e);
		else
			onClickInstall(e.target, e);
	};
	// We need to keep the ability to install the local version that has been removed (maybe we should change the button)
	if ( !bInstall && btn.hasAttribute('dataDisabled') && !bHasLocal ) {
		btn.setAttribute('title', getTranslated(messages.versionWarning));
		btn.setAttribute('disabled', '');
	}

	let bHasUpdate = (btn.parentNode.childElementCount > 1);
	if (bHasUpdate) {
		if (bInstall)
			btn.parentNode.firstChild.classList.remove('hidden');
		else
			btn.parentNode.firstChild.classList.add('hidden');
	}

	if (!elements.divSelected.classList.contains('hidden')) {
		this.document.getElementById( ( bInstall ? 'btn_install' : 'btn_remove' ) ).classList.add('hidden');
		this.document.getElementById( ( bInstall ? 'btn_remove' : 'btn_install' ) ).classList.remove('hidden');
		if (bInstall && bHasUpdate)
			this.document.getElementById('btn_update').classList.remove('hidden');
		else
			this.document.getElementById('btn_update').classList.add('hidden');
	}
};

function checkInternet() {
	// url for check internet connection
	let url = 'https://raw.githubusercontent.com/ONLYOFFICE/onlyoffice.github.io/master/store/translations/langs.json';
	makeRequest(url, 'GET', null, null, true).then(
		function() {
			isOnline = true;
			let bShowSelected = elements.divSelected && !elements.divSelected.classList.contains('hidden');
			let bshowMarketplace = bShowSelected ? false : ( ( elements.btnMarketplace && elements.btnMarketplace.classList.contains('btn_toolbar_active') ) ? true : false );
			if (!allPlugins.length) {
				fetchAllPlugins(interval === null, bshowMarketplace);
			} else if (bShowSelected) {
				let guid = elements.divSelected.getAttribute('data-guid');
				let div = document.getElementById(guid);
				if (div)
					div.onclick();
			} else if (bshowMarketplace) {
				toogleView(elements.btnMarketplace, elements.btnMyPlugins, messages.linkPR, true, true);
			} else if (!isDesktop) {
				toogleView(elements.btnMyPlugins, elements.btnMarketplace, messages.linkManually, false, true);
			}
			clearInterval(interval);
			interval = null;
		}
	);
};

function handeNoInternet() {
	isOnline = false;
	if (!interval) {
		interval = setInterval(function() {
			checkInternet();
		}, 5000);
	}

	let bshowMarketplace = elements.btnMarketplace && elements.btnMarketplace.classList.contains('btn_toolbar_active');

	if ( (bshowMarketplace || !isDesktop) && elements.divSelected && !elements.divSelected.classList.contains('hidden') ) {
		sendMessage( { type : "showButton", show : false } );
		onClickBack();
	}

	if (!document.getElementsByClassName('div_notification')[0]) {
		if (bshowMarketplace)
			toogleView(elements.btnMarketplace, elements.btnMyPlugins, messages.linkPR, true, true);
		else if (!isDesktop)
			toogleView(elements.btnMyPlugins, elements.btnMarketplace, messages.linkManually, false, true);
	}
};

function getTranslated(text) {
	return translate[text] || text;
};

function getStringRating(value) {
	let rating = '';
	switch (value) {
		case 5:
			rating = '★★★★★';
			break;
		case 4:
			rating = '★★★★✩';
			break;
		case 3:
			rating = '★★★✩✩';
			break;
		case 2:
			rating = '★★✩✩✩';
			break;
		case 1:
			rating = '★✩✩✩✩';
			break;
	
		default:
			rating = '✩✩✩✩✩';
			break;
	}
	return rating;
};