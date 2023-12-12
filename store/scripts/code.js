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

const version = '1.0.5';                                             // version of store (will change it when update something in store)
let start = Date.now();
const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) ); // desktop detecting
let isPluginLoading = false;                                         // flag plugins loading
let isOnline = true;                                                 // flag internet connection
isLocal && checkInternet();                                          // check internet connection (only for desktop)
let interval = null;                                                 // interval for checking internet connection (if it doesn't work on launch)
const OOMarketplaceUrl = 'https://onlyoffice.github.io/';            // url to oficial store (for local version store in desktop)
const OOIO = 'https://github.com/ONLYOFFICE/onlyoffice.github.io/';  // url to oficial github repository (for links and discussions)
const discussionsUrl = OOIO + 'discussions/';                        // discussions url
let searchTimeout = null;                                            // timeot for search
let founded = [];                                                    // last founded elemens (for not to redraw if a result is the same)
let catFiltred = [];                                                 // plugins are filtred by caterogy (used for search)
let updateCount = 0;                                                 // counter for plugins in updating process
let discussionCount = 0;                                             // counter for loading plugin`s discussions
let allPlugins = [];                                                 // list of all plugins from config
let installedPlugins;                                                // list of intalled plugins
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
let isResizeOnStart = false;                                         // flag for firs resize on start
let slideIndex = 1;                                                  // index for slides
let PsMain = null;                                                   // scroll for list of plugins
let PsChanglog = null;                                               // scroll for changlog preview
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

const pos = location.href.indexOf('store/index.html'); // position for make substring
const ioUrl = location.href.substring(0, pos);         // real IO URL
const configUrl = ( isLocal ? OOMarketplaceUrl : location.href.substring(0, pos) ) + 'store/config.json'; // url to config.json (it's for desktop. we should use remote config)

// get translation file
getTranslation();
// fetch all plugins from config
if (!isLocal)
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

	isFrameLoading = false;
	if (shortLang == "en" || (!isPluginLoading && !isTranslationLoading)) {
		// if nothing to translate
		showMarketplace();
	}

	elements.btnAvailablePl.onclick = function(event) {
		// click on available plugins button
		toogleView(event.target, elements.btnMarketplace, messages.linkManually, false, false);
	};

	elements.btnMarketplace.onclick = function(event) {
		// click on marketplace button
		toogleView(event.target, elements.btnAvailablePl, messages.linkPR, true, false);
	};

	elements.inpSearch.addEventListener('input', function(event) {
		makeSearch(event.target.value.trim().toLowerCase());
	});
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
			else if ( allPlugins.length || (isLocal && !isOnline) )
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
				if (!updateCount) {
					checkNoUpdated(true);
					toogleLoader(false);
				}
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
				$(pluginDiv.lastChild.firstChild.lastChild).remove();

			if (!updateCount) {
				checkNoUpdated(true);
				toogleLoader(false);
			}
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
				if (plugin && (!bHasLocal || (isLocal && !needBackup) ) ) {
					installedPlugins = installedPlugins.filter(function(el){return el.guid !== message.guid});
					bUpdate = true;
				} else {
					installed.removed = true;

					// нужно обновить список установленных плагинов, чтобы ссылки на ресурсы были правильными
					if (isLocal)
						sendMessage({ type: 'getInstalled', updateInstalled: true }, '*');
				}
			}

			if (elements.btnAvailablePl.classList.contains('btn_toolbar_active')) {
				if (bUpdate) {
					catFiltred = installedPlugins;
					let searchVal = elements.inpSearch.value.trim();
					if (searchVal !== '') {
						makeSearch(searchVal.toLowerCase());
					} else {
						let pluginDiv = this.document.getElementById(message.guid)
						$(pluginDiv).remove();
						Ps.update();
					}
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

			let rule = '.text-secondary{color:'+message.theme["text-secondary"]+';}\n';

			if (themeType.includes('light')) {
				this.document.getElementsByTagName('body')[0].classList.add('white_bg');
				rule += '.btn_install{background-color: #444 !important; color: #fff !important}\n';
				rule += '.btn_install:hover{background-color: #1c1c1c !important;}\n';
				rule += '.btn_install:active{background-color: #1c1c1c !important;}\n';
				rule += '.div_offered_votes{color: rgba(0,0,0,0.45) !important;}\n';
				rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #444 !important; color: #fff !important; border:1px solid #444 !important;}\n';
				rule += '.select2-container--default .select2-results__option[aria-selected=true] { color: black;}\n'
				message.style = message.style.replace(/#445799/g, 'rgba(0, 0, 0, 0.8)');
			} else {
				this.document.getElementsByTagName('body')[0].classList.remove('white_bg');
				rule += '.btn_install{background-color: #e0e0e0 !important; color: #333 !important}\n';
				rule += '.btn_install:hover{background-color: #fcfcfc !important;}\n';
				rule += '.btn_install:active{background-color: #fcfcfc !important;}\n';
				rule += '.div_offered_votes{color: rgba(255,255,255,0.8) !important;}\n';
				rule += '.btn_install[disabled]:hover,.btn_install.disabled:hover,.btn_install[disabled]:active,.btn_install[disabled].active,.btn_install.disabled:active,.btn_install.disabled.active{background-color: #e0e0e0 !important; color: #333 !important; border:1px solid #e0e0e0 !important;}\n';
				rule += '.select2-container--default .select2-results__option[aria-selected=true] { color: white;}\n';
				message.style = message.style.replace('.select2-container--default .select2-results__option--highlighted[aria-selected] {background-color : #555 !important; }','.select2-container--default .select2-results__option--highlighted[aria-selected] { background-color : #555 !important; color: white !important;}');
				message.style = message.style.replace(/#b5e4ff/g, 'rgba(255, 255, 255, 0.8)');
			}

			let styleTheme = document.getElementById('theme_style');
			if (!styleTheme) {
				styleTheme = document.createElement('style');
				styleTheme.id = 'theme_style';
				styleTheme.type = 'text/css';
				document.getElementsByTagName('head')[0].appendChild(styleTheme);
			} else {
				defaultBG = themeType == 'light' ? "#F5F5F5" : '#555555';
				let bshowMarketplace = elements.btnMarketplace && elements.btnMarketplace.classList.contains('btn_toolbar_active');
				let arrPl = bshowMarketplace ? allPlugins : installedPlugins;
				arrPl.forEach(function(pl) {
					let div = document.getElementById(pl.guid);
					if (div) {
						let variation = pl.variations ? pl.variations[0] : pl.obj.variations[0];
						let bg = defaultBG;
						if (variation.store) {
							if (variation.store.background)
								bg = variation.store.background[themeType]
						} else {
							// todo now we have one icon for all theme for plugins in store. change it when we will have different icons for different theme (now it's not necessary). use for all icons 'changeIcons'
							// It's why we should change icons only for plugins with default icon or plugins icon (which don't have 'store' field in config)
							div.firstChild.firstChild.setAttribute( 'src', getImageUrl( pl.guid, false, false, ('img_' + pl.guid) ) );
						}
						div.firstChild.setAttribute('style', ('background:' + bg) );
					}
				});
				let guid = elements.imgIcon.parentNode.parentNode.parentNode.getAttribute('data-guid');
				if (guid)
					elements.imgIcon.setAttribute('src', getImageUrl(guid, false, false, 'img_icon'));

				// todo change header background color and change icons for plugin cards and for plugin window
			}

			styleTheme.innerHTML = message.style + rule;
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

function makeDesktopRequest(_url) {
	// function for getting rating page in desktop
	return new Promise(function(resolve, reject) {
		if ( !_url.startsWith('http') ) {
			resolve({status:'skipped', response: {statusText: _url}});
		} else {
			window.AscSimpleRequest.createRequest({
				url: _url,
				crossOrigin: true,
				crossDomain: true,
				timeout: 10000,
				headers: '',
				complete: function(e, status) {
					if ( status == 'success' ) {
						resolve({status:status, response:e});
					} else {
						reject({status:status, response:e});
					}
				},
				error: function(e, status, error) {
					reject({status:status, response:e});
				}
			});
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
	elements.btnAvailablePl = document.getElementById('btn_AvailablePlugins');
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
	elements.linkPlugin = document.getElementById('link_plugin');
	elements.divScreen = document.getElementById("div_selected_image");
	elements.divGitLink = document.getElementById('div_github_link');
	elements.spanVersion = document.getElementById('span_ver');
	elements.divVersion = document.getElementById('div_version');
	elements.spanMinVersion = document.getElementById('span_min_ver');
	elements.divMinVersion = document.getElementById('div_min_version');
	elements.spanLanguages = document.getElementById('span_langs');
	elements.divLanguages = document.getElementById('div_languages');
	elements.inpSearch = document.getElementById('inp_search');
	elements.btnUpdateAll = document.getElementById('btn_updateAll');
	elements.divRatingLink = document.getElementById('div_rating_link');
	elements.discussionLink = document.getElementById('discussion_link');
	elements.ratingStars = document.getElementById('div_rating_stars');
	elements.totalVotes = document.getElementById('total_votes');
	elements.divVotes = document.getElementById('div_votes');
	elements.arrowPrev = document.getElementById('prev_arrow');
	elements.arrowNext = document.getElementById('next_arrow');
	elements.divReadme = document.getElementById('div_readme_link');
	elements.linkReadme = document.getElementById('link_readme');
};

function toogleLoader(show, text) {
	// show or hide loader (don't use elements for this function)
	if (!show) {
		clearTimeout(timeout);
		document.getElementById('loader-container').classList.add('hidden');
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;	
	} else if(!loader) {
		document.getElementById('loader-container').classList.remove('hidden');
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], ( getTranslated(text) ) + '...');
	}
};

function getAllPluginsData(bFirstRender, bshowMarketplace) {
	// get config file for each item in config.json
	isPluginLoading = true;
	let count = 0;
	let Unloaded = [];
	let url = isLocal ? OOMarketplaceUrl : ioUrl;
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
				
				makeRequest(pluginUrl + 'translations/langs.json', 'GET', null, null, false).then(
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
				makeRequest(pluginUrl + 'CHANGELOG.md', 'GET', null, null, false).then(
					function(response) {
						let settings = getMarkedSetting()
						let lexed = marked.lexer(response.replace('# Change Log\n\n', ''), settings);
						config.changelog = marked.parser(lexed, settings);
					}
				);
				if (plugin.discussion) {
					discussionCount++;
					config.discussionUrl = discussionsUrl + plugin.discussion;
					getDiscussion(config);
				}
				count--;
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

	if (isLocal && installedPlugins && bFirstRender && !isOnline) {
		isPluginLoading = false;
		getInstalledLanguages();
		showMarketplace();
	}
};

function getDiscussion(config) {
	// get discussion page
	if (isLocal && window.AscSimpleRequest && window.AscSimpleRequest.createRequest) {
		makeDesktopRequest(config.discussionUrl).then(
			function(data) {
				if (data.status == 'success') {
					config.rating = parseRatingPage(data.response.responseText);
				}
				discussionCount--;
				if (!discussionCount)
					showRating();
			},
			function(err) {
				createError(err.response, false);
				discussionCount--;
				if (!discussionCount)
					showRating();
			}
		);
	} else {
		let body = { target: config.discussionUrl };
		makeRequest(proxyUrl, 'POST', null, body, false).then(function(data) {
			data = JSON.parse(data);
			config.rating = parseRatingPage(data);
			discussionCount--;
			if (!discussionCount)
				showRating();
		}, function(err) {
			createError('Problem with loading rating', true);
			discussionCount--;
			if (!discussionCount)
				showRating();
		});
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
		toogleView(elements.btnMarketplace, elements.btnAvailablePl, messages.linkPR, true, true);
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
	if (!bAll && isLocal) {
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
		setTimeout(function(){if (PsMain) PsMain.update(); toogleLoader(false);});
	} else {
		// if no istalled plugins and available plugins button was clicked
		let notification = Array.isArray(sortedArr) ? 'Nothing was found for this query.' : bAll ? 'Problem with loading plugins.' : 'No installed plugins.';
		createNotification(notification);
		toogleLoader(false);
	}
	// scroll for list of plugins
	if (!PsMain) {
		PsMain = new PerfectScrollbar('#div_main', {});
		PsMain.update();
	} else {
		PsMain.update();
	}
	// scroll for changelog preview
	if (!PsChanglog) {
		PsChanglog = new PerfectScrollbar('#div_selected_changelog', {});
		PsChanglog.update();
	}
};

function getPluginVersion(text) {
	let factor = 1000;
	let major = 1;
	let minor = 0;
	let build = 0;

	if (text && text.split) {
		let arValues = text.split('.');
		let count = arValues.length;
		if (count > 0) major = parseInt(arValues[0]);
		if (count > 1) minor = parseInt(arValues[1]);
		if (count > 2) build = parseInt(arValues[2]);
	}

	return major * factor * factor + minor * factor + build;
};

function createPluginDiv(plugin, bInstalled) {
	// this function creates div (preview) for plugins
	let div = document.createElement('div');
	div.id = plugin.guid;
	div.setAttribute('data-guid', plugin.guid);
	div.className = 'div_item form-control noselect';
	let zoom;
	if (scale.devicePR < 1)
		zoom = (1 / devicePixelRatio);
	if (scale.devicePR > 2)
		zoom = (1 / devicePixelRatio) * 2;
	div.style.border = ((zoom > 1 ? 1 : zoom)) +'px solid ' + (themeType == 'ligh' ? '#c0c0c0' : '#666666');
	
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
							(plugin.rating
								? '<div class="flex div_rating_card"> <div class="div_rating"> <div class="stars_grey"></div> <div class="stars_orange" style="width:' + plugin.rating.percent + ';"></div> </div> <span style="margin-left: 5px;">' + plugin.rating.total + '</span> </div>'
								: '<div class="flex div_rating_card"> <div class="div_rating"> <div class="stars_grey"></div> <div class="stars_orange" style="width:0;"></div> </div> <span style="margin-left: 5px;"></span> </div>'
							) +
							(bHasUpdate
								? '<span class="span_update ' + (!bRemoved ? "" : "hidden") + '">' + getTranslated("Update") + '</span>'
								: '<div></div>'
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
	if (PsMain) PsMain.update();
};

function showRating() {
	// console.log('showRating: ' + (Date.now() - start));
	allPlugins.forEach(function(plugin) {
		let div = document.getElementById(plugin.guid);
		if (plugin.rating && div) {
			div = div.lastElementChild.firstElementChild.firstElementChild;
			div.firstElementChild.lastElementChild.style.width = plugin.rating.percent;
			div.lastElementChild.innerText = plugin.rating.total;
			div.classList.remove('hidden');
		}
	});

	if (elements.divSelected && !elements.divSelected.classList.contains('hidden')) {
		let guid = elements.divSelected.getAttribute('data-guid');
		let plugin = findPlugin(true, guid);
		if (plugin) {
			elements.totalVotes.innerText = plugin.rating.total;
			document.getElementById('stars_colored').style.width = plugin.rating.percent;
			// elements.divRatingLink.classList.remove('hidden');
			elements.divRatingLink.removeAttribute('title');
			elements.divVotes.classList.remove('hidden');
			elements.discussionLink.classList.remove('hidden');
		} else {
			elements.divRatingLink.setAttribute('title', getTranslated('No disscussion page for this plugin.'));
		}
	}
};

function onClickInstall(target, event) {
	// click install button
	event.stopImmediatePropagation();
	// click install button
	// we should do that because we have some problem when desktop is loading plugin
	if (isLocal) {
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
	if (isLocal) {
		setTimeout(function() {
			sendMessage(message);
		}, 200);
	} else {
		sendMessage(message);
	}
};

function onClickUpdate(target) {
	// click update button
	// we should do that because we have some problem when desktop is loading plugin
	if (isLocal) {
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
	if (isLocal) {
		setTimeout(function() {
			sendMessage(message);
		}, 200);
	} else {
		sendMessage(message);
	}
};

function onClickRemove(target, event) {
	event.stopImmediatePropagation();
	// click remove button
	if (isLocal) {
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

	return isLocal ? findPlugin(true, guid) == undefined : false;
}

function onClickUpdateAll() {
	clearTimeout(timeout);
	timeout = setTimeout(toogleLoader, 200, true, "Updating");
	elements.btnUpdateAll.classList.add('hidden');
	let arr = allPlugins.filter(function(el) {
		return el.bHasUpdate;
	});
	updateCount = arr.length;
	arr.forEach(function(plugin) {
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
	let hiddenCounter = 0;
	let guid = this.getAttribute('data-guid');
	let pluginDiv = document.getElementById(guid);
	let divPreview = document.createElement('div');
	divPreview.id = 'div_preview';
	divPreview.className = 'div_preview';

	let installed = findPlugin(false, guid);
	let plugin = findPlugin(true, guid);
	let discussionUrl = plugin ? plugin.discussionUrl : null;
	
	if (plugin && plugin.rating) {
		elements.divRatingLink.removeAttribute('title');
		elements.totalVotes.innerText = plugin.rating.total;
		document.getElementById('stars_colored').style.width = plugin.rating.percent;
		elements.discussionLink.classList.remove('hidden');
		elements.divVotes.classList.remove('hidden');
	} else {
		document.getElementById('stars_colored').style.width = 0;
		elements.divVotes.classList.add('hidden');
		elements.discussionLink.classList.add('hidden');
		if (!discussionCount)
			elements.divRatingLink.setAttribute('title', getTranslated('No disscussion page for this plugin.'));
	}

	if ( !plugin || ( isLocal && installed && plugin.baseUrl.includes('file:') ) ) {
		elements.divGitLink.classList.add('hidden');
		plugin = installed.obj;
	} else {
		elements.divGitLink.classList.remove('hidden');
	}

	let bWebUrl = !plugin.baseUrl.includes('http://') && !plugin.baseUrl.includes('file:') && !plugin.baseUrl.includes('../');
	let bCorrectUrl = isLocal || bWebUrl;

	if (bCorrectUrl && plugin.variations[0].store && plugin.variations[0].store.screenshots && plugin.variations[0].store.screenshots.length) {
		let arrScreens = plugin.variations[0].store.screenshots;
		arrScreens.forEach(function(screenUrl, ind) {
			let url = plugin.baseUrl + screenUrl;
			let container = document.createElement('div');
			container.className = 'mySlides fade';
			let screen = document.createElement('img');
			screen.className = 'screen';
			screen.setAttribute('src', url);
			container.appendChild(screen);
			document.getElementById('div_selected_container').insertBefore(container, elements.arrowPrev);
			if (arrScreens.length > 1) {
				let point = document.createElement('span');
				point.className = 'dot';
				point.onclick = function() {
					currentSlide(ind+1);
				};
				document.getElementById('points_container').appendChild(point);
			}
		});
		if (arrScreens.length > 1) {
			elements.arrowPrev.classList.remove('hidden');
			elements.arrowNext.classList.remove('hidden');
		}
		slideIndex = 1;
		showSlides(1);
	} else {
		elements.arrowPrev.classList.add('hidden');
		elements.arrowNext.classList.add('hidden');
	}

	let bHasUpdate = (pluginDiv.lastChild.firstChild.lastChild.tagName === 'SPAN' && !pluginDiv.lastChild.firstChild.lastChild.classList.contains('hidden'));
	
	if ( (installed && installed.obj.version) || plugin.version ) {
		elements.spanVersion.innerText = (installed && installed.obj.version ? installed.obj.version : plugin.version);
		elements.divVersion.classList.remove('hidden');
	} else {
		elements.spanVersion.innerText = '';
		elements.divVersion.classList.add('hidden');
		hiddenCounter++;
	}

	if ( (installed && installed.obj.minVersion) || plugin.minVersion ) {
		elements.spanMinVersion.innerText = (installed && installed.obj.minVersion ? installed.obj.minVersion : plugin.minVersion);
		elements.divMinVersion.classList.remove('hidden');
	} else {
		elements.spanMinVersion.innerText = '';
		elements.divMinVersion.classList.add('hidden');
		hiddenCounter++;
	}	

	if (plugin.languages) {
		elements.spanLanguages.innerText = plugin.languages.join(', ') + '.';
		elements.divLanguages.classList.remove('hidden');
	} else {
		elements.spanLanguages.innerText = '';
		elements.divLanguages.classList.add('hidden');
		hiddenCounter++;
	}

	if (plugin.changelog) {
		document.getElementById('span_changelog').classList.remove('hidden');
		document.getElementById('div_changelog_preview').innerHTML = plugin.changelog;
	} else {
		document.getElementById('span_changelog').classList.add('hidden');
		document.getElementById('div_changelog_preview').innerHTML = '';
	}

	let pluginUrl = plugin.baseUrl.replace(OOMarketplaceUrl, (OOIO + 'tree/master/') );
	
	// TODO problem with plugins icons (different margin from top)
	elements.divSelected.setAttribute('data-guid', guid);
	// we do this, because new icons for store are too big for use it in this window.
	let tmp = getImageUrl(guid, false, true, 'img_icon');
	document.getElementById('div_icon_info').style.background = this.firstChild.style.background;
	elements.imgIcon.setAttribute('src', tmp);
	elements.spanName.innerHTML = this.children[1].children[0].innerText;
	elements.spanOffered.innerHTML = plugin.offered || offered;
	elements.spanSelectedDescr.innerHTML = this.children[1].children[1].innerText;
	if (bWebUrl) {
		elements.linkPlugin.setAttribute('href', pluginUrl);
		elements.linkReadme.setAttribute('href', pluginUrl + 'README.md');
		elements.divReadme.classList.remove('hidden');
	} else {
		elements.linkPlugin.setAttribute('href', '');
		elements.linkReadme.setAttribute('href', '');
		elements.divReadme.classList.add('hidden');
	}
	
	if (discussionUrl)
		elements.discussionLink.setAttribute('href', discussionUrl);
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
	} else {
		elements.btnInstall.removeAttribute('disabled');
		elements.btnInstall.removeAttribute('title');
	}

	if (hiddenCounter == 3) {
		// if versions and languages fields are hidden, we should hide this div
		document.getElementById('div_plugin_info').classList.add('hidden');
	} else {
		document.getElementById('div_plugin_info').classList.remove('hidden');
	}

	elements.divSelected.classList.remove('hidden');
	elements.divSelectedMain.classList.remove('hidden');
	elements.divBody.classList.add('hidden');
	setDivHeight();
	sendMessage( { type : "showButton", show : true } );
	// elements.arrow.classList.remove('hidden');
};

function onClickBack() {
	// click on left arrow in preview mode
	elements.imgIcon.style.display = 'none';
	$('.dot').remove();
	$('.mySlides').remove();
	elements.arrowPrev.classList.add('hidden');
	elements.arrowNext.classList.add('hidden');
	document.getElementById('span_overview').click();
	elements.divSelected.classList.add('hidden');
	elements.divSelectedMain.classList.add('hidden');
	elements.divBody.classList.remove('hidden');
	if(PsMain) PsMain.update();
};

function onSelectPreview(target, type) {
	// change mode of preview
	if ( !target.classList.contains('span_selected') ) {
		$(".span_selected").removeClass("span_selected");
		target.classList.add("span_selected");
		$(".div_selected_preview").addClass("hidden");

		// type: 1 - Overview; 2 - Info; 3 - Changelog;
		if (type === 1) {
			document.getElementById('div_selected_preview').classList.remove('hidden');
			setDivHeight();
		} else if (type === 2) {
			document.getElementById('div_selected_info').classList.remove('hidden');
		} else {
			document.getElementById('div_selected_changelog').classList.remove('hidden');
			PsChanglog.update();
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
		$(background).remove();
		divErr.classList.add('hidden');
	}, 5000);
};

function setDivHeight() {
	// set height for div with image in preview mode
	if (PsMain) PsMain.update();
	// console.log(Math.round(window.devicePixelRatio * 100));
	if (elements.divScreen) {
		let height = elements.divScreen.parentNode.clientHeight - elements.divScreen.previousElementSibling.clientHeight - 70 + 'px';
		elements.divScreen.style.height = height;
		elements.divScreen.style.maxHeight = height;
		if (isIE) {
			// elements.imgScreenshot.style.maxHeight = height;
			// elements.imgScreenshot.style.maxWidth = elements.divScreen.clientWidth + 'px';
		}
	}
};

window.onresize = function(bForce) {
	if (scale.devicePR !== window.devicePixelRatio || bForce) {
		let html = document.getElementsByTagName('html')[0];
		scale.devicePR = window.devicePixelRatio;
		let revZoom = 1 / scale.devicePR;
		if (scale.devicePR > 2)
			revZoom *= 2;

		if (1 <= scale.devicePR && scale.devicePR <= 2 || isResizeOnStart) {
			setDivHeight();
			let oldScale = scale.value;
			isResizeOnStart = false;
			if (scale.devicePR < 1)
				return;

			calculateScale();
			html.setAttribute('style', '');

			if (scale.value !== oldScale)
				changeIcons();
		} else if (scale.devicePR < 1) {
			html.style.zoom = revZoom;
			// html.style['-moz-transform'] = 'scale('+ revZoom +')';
		}
		$('.div_item').css('border', ((revZoom > 1 ? 1 : revZoom) +'px solid ' + (themeType == 'ligh' ? '#c0c0c0' : '#666666')));
	}
	if (PsChanglog) PsChanglog.update();
};

// zoom on start if we start with a non 100% zoom
if (scale.devicePR < 1) {
	// maybe remove this flag
	isResizeOnStart = false;
	window.onresize(true);
}

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
	let guid = elements.imgIcon.parentNode.parentNode.parentNode.getAttribute('data-guid');
	elements.imgIcon.setAttribute('src', getImageUrl(guid, false, true, 'img_icon'));
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
	elements.btnAvailablePl.innerHTML = getTranslated('Available plugins');
	elements.btnMarketplace.innerHTML = getTranslated('Marketplace');
	elements.btnInstall.innerHTML = getTranslated('Install');
	elements.btnRemove.innerHTML = getTranslated('Remove');
	elements.btnUpdate.innerHTML = getTranslated('Update');
	elements.btnUpdateAll.innerHTML = getTranslated('Update All');
	elements.inpSearch.placeholder = getTranslated('Search plugins') + '...';
	document.getElementById('lbl_header').innerHTML = getTranslated('Manage plugins');
	document.getElementById('span_offered_caption').innerHTML = getTranslated('Offered by') + ' ';
	document.getElementById('span_overview').innerHTML = getTranslated('Overview');
	document.getElementById('span_info').innerHTML = getTranslated('Info & Support');
	document.getElementById('span_lern').innerHTML = getTranslated('Learn how to use') + ' ';
	document.getElementById('span_lern_plugin').innerHTML = getTranslated('the plugin in') + ' ';
	document.getElementById('span_contribute').innerHTML = getTranslated('Contribute') + ' ';
	document.getElementById('span_contribute_end').innerHTML = getTranslated('to the plugin development or report an issue on') + ' ';
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
	document.getElementById('discussion_link').innerHTML = getTranslated('Click to rate');
	showMarketplace();
};

function showMarketplace() {
	// show main window to user
	if (!isPluginLoading && !isTranslationLoading && !isFrameLoading && installedPlugins) {
		createSelect();
		if (isOnline)
			showListofPlugins(isOnline);
		else {
			toogleView(elements.btnAvailablePl, elements.btnMarketplace, messages.linkManually, false, false);
			toogleLoader(false);
		}
			
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

	if (installedPlugins && isLocal) {
		// it doesn't work when we use icons from other resource (cors problems)
		// it's why we use local icons only for desktop
		plugin = findPlugin(false, guid);
		if (plugin) {
			plugin = plugin.obj;
			baseUrl = plugin.baseUrl;
		}
	}

	if ( ( !plugin || !isLocal ) && allPlugins) {
		plugin = findPlugin(true, guid);
		if (plugin)
			baseUrl = plugin.baseUrl;
	}
	// github doesn't allow to use "http" or "file" as the URL for an image
	if ( plugin && ( baseUrl.includes('https://') || isLocal) ) {
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
		let flag = !isLocal && !isOnline;
		if ( ( bAll && (!isOnline || isPluginLoading) ) || flag) {
			$('.div_notification').remove();
			$('.div_item').remove();
			setTimeout(function(){if (PsMain) PsMain.update()});
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
		elements.linkNewPlugin.href = bAll ? (OOIO + "pulls") : "https://api.onlyoffice.com/plugin/installation";

		if (isLocal && !bAll) {
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
				let guarded = [];
				let removed = [];
				let arr = [];
				installedPlugins.forEach(function(pl) {
					if (!pl.canRemoved)
						guarded.push(pl);
					else if (pl.removed)
						removed.push(pl);
					else
						arr.push(pl);
				});
				installedPlugins = guarded.concat(arr, removed);
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

	let bHasUpdate = (btn.parentNode.firstChild.lastChild.tagName === 'SPAN');
	if (bHasUpdate) {
		if (bInstall)
			btn.parentNode.firstChild.lastChild.classList.remove('hidden');
		else
			btn.parentNode.firstChild.lastChild.classList.add('hidden');
	}

	if (!elements.divSelected.classList.contains('hidden')) {
		this.document.getElementById( ( bInstall ? 'btn_install' : 'btn_remove' ) ).classList.add('hidden');
		this.document.getElementById( ( bInstall ? 'btn_remove' : 'btn_install' ) ).classList.remove('hidden');
		if (bInstall && bHasUpdate)
			this.document.getElementById('btn_update').classList.remove('hidden');
		else
			this.document.getElementById('btn_update').classList.add('hidden');
	}
	checkNoUpdated(!bInstall);
};

function checkInternet() {
	// url for check internet connection
	let url = 'https://onlyoffice.github.io/store/translations/langs.json';
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
				toogleView(elements.btnMarketplace, elements.btnAvailablePl, messages.linkPR, true, true);
			} else if (!isLocal) {
				toogleView(elements.btnAvailablePl, elements.btnMarketplace, messages.linkManually, false, true);
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

	if ( (bshowMarketplace || !isLocal) && elements.divSelected && !elements.divSelected.classList.contains('hidden') ) {
		sendMessage( { type : "showButton", show : false } );
		onClickBack();
	}

	if (!document.getElementsByClassName('div_notification')[0]) {
		if (bshowMarketplace)
			toogleView(elements.btnMarketplace, elements.btnAvailablePl, messages.linkPR, true, true);
		else if (!isLocal)
			toogleView(elements.btnAvailablePl, elements.btnMarketplace, messages.linkManually, false, true);
	}
};

function getTranslated(text) {
	return translate[text] || text;
};

function parseRatingPage(data) {
	// if we load this page, parse it
	// remove head, because it can brake our styles
	if (data !== 'Not Found') {
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
		let percent = average / 5 * 100 + '%';
		return {
			total: total,
			average: average.toFixed(1),
			percent: percent
		};
	} else {
		return null;
	}
};

function checkNoUpdated(bRemove) {
	// todo it's a temp solution. We will change a work with updation in the feature.
	if ( (!elements.btnUpdateAll.classList.contains('hidden') && bRemove) || (elements.btnUpdateAll.classList.contains('hidden') && !bRemove) ) {
		let arr = document.getElementsByClassName('span_update');
		let bHasNoUpdated = false;
		for (let index = 0; index < arr.length; index++) {
			if (!arr[index].classList.contains('hidden')) {
				bHasNoUpdated = true;
				break;
			}
		}
		if (bHasNoUpdated) {
			elements.btnUpdateAll.classList.remove('hidden');
		} else {
			elements.btnUpdateAll.classList.add('hidden');
		}
	}
};

function plusSlides(n) {
	showSlides(slideIndex += n);
};

function currentSlide(n) {
	showSlides(slideIndex = n);
};

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName('mySlides');
	let dots = document.getElementsByClassName('dot');
	if (n > slides.length) {slideIndex = 1}    
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(' active', '');
	}
	if (slides.length)
		slides[slideIndex-1].style.display = "block";

	if(dots.length)
		dots[slideIndex-1].className += ' active';
};

function getMarkedSetting() {
	// function for marked librry
	let defaults = {};
	const settings = {};
	if (typeof marked.getDefaults === 'function') {
		defaults = marked.getDefaults();
	} else if ('defaults' in marked) {
		for (let prop in marked.defaults) {
			defaults[prop] = marked.defaults[prop];
		}
	}

	const invalidOptions = [
		'renderer',
		'tokenizer',
		'walkTokens',
		'extensions',
		'highlight',
		'sanitizer'
	];

	for (let prop in defaults) {
		if (!invalidOptions.includes(prop))
		settings[prop] = defaults[prop]
	}

	return settings;
};