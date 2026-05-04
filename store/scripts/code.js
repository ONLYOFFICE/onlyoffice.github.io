/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
*
 */

// @ts-check
/// <reference path="./types.js" />
/// <reference path="./ui.js" />
/// <reference path="./storage.js" />

const version = '1.0.8';                                             // version of store (will change it when update something in store)
let start = Date.now();
const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) ); // desktop detecting
let isOnline = true;                                                 // flag internet connection
const OOMarketplaceUrl = 'https://onlyoffice.github.io/';            // url to official store (for local version store in desktop)
const OOIO = 'https://github.com/ONLYOFFICE/onlyoffice.github.io/';  // url to official github repository (for links and discussions)
const discussionsUrl = OOIO + 'discussions/';                        // discussions url
/** @type {Plugins} */
let founded = [];                                                    // last founded elements (for not to redraw if a result is the same)
let updateCount = 0;                                                 // counter for plugins in updating process
/** @type {Array<PluginInfo>} */
let allPlugins = [];                                                 // list of all plugins from config
/** @type {Array<InstalledPluginInfo>} */
let installedPlugins = [];                                           // list of installed plugins
const guidMarketplace = 'asc.{AA2EA9B6-9EC2-415F-9762-634EE8D9A95E}'; // guid marketplace
const guidSettings = 'asc.{8D67F3C5-7736-4BAE-A0F2-8C7127DC4BB8}';   // guid settings plugins
/** @type {number} */
let editorVersion;                                            // editor current version
/** @type {HTMLDivElement | undefined} */
let loader;                                                          // loader
let themeType = detectThemeType();                                   // current theme
const lang = detectLanguage();                                       // current language
const shortLang = lang.split('-')[0];                                // short language
let bTranslate = false;                                              // flag translate or not
/** @type {Object<string, string>} */
let translate = {'Loading': 'Loading'};                              // translations for current language (thouse will necessary if we don't get translation file)
/** @type {number} */
let timeout;                                                 		 // delay for loader
let defaultBG = themeType == 'light' ? "#F5F5F5" : '#555555';    // default background color for plugin header
let isResizeOnStart = false;                                         // flag for firs resize on start
let slideIndex = 1;                                                  // index for slides
/** @type {any} */
let PsMain = null;                                                   // scroll for list of plugins
/** @type {any} */
let PsChangelog = null;                                              // scroll for changelog preview
const proxyUrl = 'https://plugins-services.onlyoffice.com/proxy';    // url to proxy for getting rating
const supportedScaleValues = [1, 1.25, 1.5, 1.75, 2];                // supported scale
let scale = {                                                        // current scale
	percent  : "100%",                                               // current scale in percent
	value    : 1,                                                    // current scale value
	devicePR : 1                                                     // device pixel ratio
};
calculateScale();
const LANGUAGES = [                                                  // list of languages
	['cs-CZ', 'cs', 'Czech'],
	['de-DE', 'de', 'German'],
	['es-ES', 'es', 'Spanish'],
	['fr-FR', 'fr', 'French'],
	['it-IT', 'it', 'Italian'],
	['ja-JA', 'ja', 'Japanese'],
	['nl-NL', 'nl', 'Dutch'],
	['pt-PT', 'pt', 'Portuguese'],
	['pt-BR', 'pt', 'Brazilian'],
	['ru-RU', 'ru', 'Russian'],
	['si-SI', 'si', 'Sinhala'],
	['uk-UA', 'uk', 'Ukrainian'],
	['zh-ZH', 'zh', 'Chinese']
];
const MESSAGES = {
	versionWarning: 'This plugin will only work in a newer version of the editor.',
	installed: 'Install plugin manually',
	updates: 'Install plugin manually',
	marketplace: 'Submit your own plugin'
};

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
	case 'it':
		translate["Loading"] = "Caricamento"
		break;
	case 'ja':
		translate["Loading"] = "積み込み"
		break;
	case 'pt':
		translate["Loading"] = "Carregamento"
		break;
	case 'si':
		translate["Loading"] = "පැටවීම"
		break;
	case 'uk':
		translate["Loading"] = "Вантаження"
		break;
	case 'zh':
		translate["Loading"] = "装载量"
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

const installedPluginsPromise = getMarketplaceVersion()
	.then(function(version) {
		console.log('------- PLUGIN READY -------');
		editorVersion = version;
		return getInstalledPlugins();
	}).then(function(plugins) {
		installedPlugins = plugins;
		return plugins;
	});
const translationsPromise = getTranslation();
/** @type {Promise<PluginInfo[]>} */
let allPluginsPromise = Promise.resolve([]);
console.log('is local: ', isLocal);
if (isLocal) {
	// check internet connection (only for desktop)
	allPluginsPromise = checkInternet()
		.then(function(bOnline) {
			if (bOnline) {
				return fetchAllPlugins();
			} else {
				return loadInstalledLanguages()
					.finally(function() {
						return [];
					});
			}
		});
} else {
	// fetch all plugins from config
	allPluginsPromise = fetchAllPlugins();
}

const pluginsPromise = Promise.all([installedPluginsPromise, allPluginsPromise])
	.then(function(plugins) {
		console.log('installed', plugins[0]);
		console.log('all', plugins[1]);
		return loadAllPluginsData();
		/*
		if (bFirstRender)
			showMarketplace();
		else if (bShowMarketplace)
			toggleView("marketplace", true);
		*/
	})

window.onload = function() {
	UI.init(themeType);
	toggleLoader(true, "Loading");

	Promise.all([translationsPromise, pluginsPromise]).then(function() {
		onTranslate();
		showMarketplace();
	}).catch(function(err) {
		console.error('Error loading marketplace: ', err);
		onTranslate();
		showMarketplace();
	}).finally(function() {
		onTranslate();
		showMarketplace();
		loadDiscussions();
		loadChangelogs();
		loadAllPluginsLanguages();
		updateCategories();
	});

	UI.onChangeMainFilter = function(value) {
		STORAGE.mainFilter = value;
		showListOfPlugins('filtered');
		updateCategories();
	}
	UI.onChangeCategoryFilter = function(category) {
		STORAGE.categoryFilter = category;
		showListOfPlugins('filtered');
	}
	UI.onChangeSearchInput = function(query) {
		STORAGE.searchQuery = query;
		showListOfPlugins('filtered');
	}
};

/**
 * @returns {Promise<number>}
 */
function getMarketplaceVersion() {
	return new Promise(function(fResolve) {
		/**
		 * @param {MessageEvent} event
		 */
		let onLoad = function(event) {
			/** @type {{type: string, version?: string}} */
			let message;
			try {
				message = JSON.parse(event.data);
			} catch (error) {
				return;
			}
			if (message.type === 'PluginReady') {
				window.removeEventListener('message', onLoad);
				const editorVersion = ( message.version && message.version.includes('.') ? convertPluginVersionToNumber(message.version) : 1e8 );
				fResolve(editorVersion);
			}
		};
		window.addEventListener('message', onLoad);
	});
}

/**
 * Get all installed plugins
 * @returns {Promise<InstalledPluginInfo[]>}
 */
function getInstalledPlugins() {
	return new Promise(function(fResolve) {
		/**
		 * @param {MessageEvent} event
		 */
		let onGetInstalled = function(event) {
			/** @type {{type: string, data?: InstalledPluginInfo[], updateInstalled?: boolean}} */
			let message;
			try {
				message = JSON.parse(event.data);
			} catch (error) {
				return;
			}
			if (message.type === 'InstalledPlugins' && !message.updateInstalled) {
				window.removeEventListener('message', onGetInstalled);
				/** @type {InstalledPluginInfo[]} */
				let plugins = [];
				if (message.data) {
					// filter installed plugins (delete removed, that are in store and some system plugins)
					plugins = message.data.filter(function(el) {
						return (el.guid !== guidMarketplace && el.guid !== guidSettings && !( el.removed && el.obj.baseUrl.includes(ioUrl) ));
					});
					sortPlugins(false, true, 'start');
				} 
				fResolve(plugins);
			}
		};
		window.addEventListener('message', onGetInstalled);
		sendMessage({type: 'getInstalled'});
	});
}

/**
 * @returns {Promise<InstalledPluginInfo[]>}
 */
function updateInstalledPlugins() {
	return new Promise(function(fResolve) {
		/**
		 * @param {MessageEvent} event
		 */
		let onGetInstalled = function(event) {
			/** @type {{type: string, data?: InstalledPluginInfo[], updateInstalled?: boolean}} */
			let message;
			try {
				message = JSON.parse(event.data);
			} catch (error) {
				return;
			}
			if (message.type === 'InstalledPlugins' && message.updateInstalled) {
				window.removeEventListener('message', onGetInstalled);
				console.log('installed plugins', message);
				if (message.data) {
					// filter installed plugins (delete removed, that are in store and some system plugins)
					installedPlugins = message.data.filter(function(el) {
						return (el.guid !== guidMarketplace && el.guid !== guidSettings && !( el.removed && el.obj.baseUrl.includes(ioUrl) ));
					});
					sortPlugins(false, true, 'start');
				} else {
					installedPlugins = [];
				}

				showListOfPlugins('installed'); // need show installed
				fResolve(installedPlugins);
			}	
		};
		window.addEventListener('message', onGetInstalled);
		sendMessage({type: 'getInstalled', updateInstalled: true});
	});
}

window.addEventListener('message', function(message) {
	// getting messages from editor or plugin
	// try to parse message
	try {
		message = JSON.parse(message.data);
	} catch (error) {
		// if we have a problem, don't process this message
		console.error('Failed to parse message')
		return;
	}

	/** @type {PluginInfo | undefined} */
	let plugin;
	/** @type {InstalledPluginInfo | undefined} */
	let installed;
	switch (message.type) {
		case 'Installed':
			console.error('------- INSTALLED -------');
			if (!message.guid) {
				// somethimes we can receive such message
				toggleLoader(false);
				return;
			}
			plugin = findPlugin(message.guid);
			installed = findInstalledPlugin(message.guid);
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
			} else if (installed) {
				if (installed.obj.backup) {
					// need to update the list of installed plugins so that resource links are correct
					updateInstalledPlugins();
				}
				else
					installed.removed = false;
			}

			changeAfterInstallOrRemove(true, message.guid);
			toggleLoader(false);
			break;
		case 'Updated':
			console.error('------- UPDATED -------');
			updateCount--;
			if (!message.guid) {
				// somethimes we can receive such message
				if (!updateCount) {
					checkNoUpdated(true);
					toggleLoader(false);
				}
				return;
			}
			installed = findInstalledPlugin(message.guid);
			plugin = findPlugin(message.guid);
			if (!plugin || !installed) {
				console.error('Plugin or installed plugin not found');
				break;
			}

			installed.obj.version = plugin.version;
			plugin.bHasUpdate = false;

			if (!UI.divSelected.classList.contains('hidden')) {
				UI.btnUpdate.classList.add('hidden');
			}

			UI.spanVersion.textContent = String(plugin.version);
			UI.removeUpdateButton(message.guid);

			if (!updateCount) {
				checkNoUpdated(true);
				toggleLoader(false);
			}
			break;
		case 'Removed':
			console.error('------- REMOVED -------');
			if (!message.guid) {
				// somethimes we can receive such message
				toggleLoader(false);
				return;
			}

			let bUpdate = false;
			let bHasLocal = false;
			let needBackup = message.backup;

			plugin = findPlugin(message.guid);
			installed = findInstalledPlugin(message.guid);
			
			if (installed) {
				bHasLocal = !installed.obj.baseUrl.includes(ioUrl);
				if (plugin && (!bHasLocal || (isLocal && !needBackup) ) ) {
					installedPlugins = installedPlugins.filter(function(el){return el.guid !== message.guid});
					bUpdate = true;
				} else {
					installed.removed = true;

					// need to update the list of installed plugins so that resource links are correct
					if (isLocal)
						updateInstalledPlugins();
				}
			}

			if (STORAGE.mainFilter === 'installed') {
				if (bUpdate) {
					if (STORAGE.searchQuery !== '') {
						showListOfPlugins('filtered');
					} else {
						UI.removePlugin(message.guid);
						PsMain.update();
					}
				} else {
					changeAfterInstallOrRemove(false, message.guid, bHasLocal);
				}
			} else {
				changeAfterInstallOrRemove(false, message.guid, bHasLocal);				
			}

			toggleLoader(false);
			break;
		case 'Error':
			console.log('error');
			createError(message.error);
			toggleLoader(false);
			break;
		case 'Theme':
			console.log('theme');
			if (message.theme.type)
				themeType = message.theme.type;

			let defaultBG = UI.onChangeTheme(message.theme, themeType, message.style);
			if (defaultBG) {
				let bShowMarketplace = STORAGE.mainFilter === "marketplace";
				/** @type {Plugins} */
				let arrPl = bShowMarketplace ? allPlugins : installedPlugins;
				arrPl.forEach(function(pl) {

					let variation = pl.variations ? pl.variations[0] : pl.obj.variations[0];
					let bg = defaultBG;
					let imgUrl = '';
					if (variation.store) {
						if (variation.store.background)
							bg = variation.store.background[themeType]
					} else {
						// todo now we have one icon for all theme for plugins in store. change it when we will have different icons for different theme (now it's not necessary). use for all icons 'changeIcons'
						// It's why we should change icons only for plugins with default icon or plugins icon (which don't have 'store' field in config)
						imgUrl = getImageUrl( pl.guid, false, false, ('img_' + pl.guid) );
					}
					
					UI.setPluginImage(pl.guid, bg, imgUrl);
				});
				let guid = UI.divSelected.getAttribute('data-guid');
				if (guid)
					UI.imgIcon.setAttribute('src', getImageUrl(guid, false, false, 'img_icon'));

				// todo change header background color and change icons for plugin cards and for plugin window
			}
			break;
		case 'onExternalMouseUp':
			let evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			document.dispatchEvent(evt);
			break;
		case 'onClickBack':
			onClickBack();
			break;
	};
}, false);

/**
 * function for fetching all plugins from config
 * @returns {Promise<PluginInfo[]>}
 */
function fetchAllPlugins() {
	return makeRequest(configUrl, 'GET', null, null, true)
		.then(function(response) {
			allPlugins = JSON.parse(response);
			return allPlugins;
		}).catch(function(err) {
			createError( new Error('Problem with loading marketplace config.') );
			showMarketplace();
			return allPlugins;
		});
};

/**
 * @param {string} url 
 * @param {'GET' | 'POST'} method 
 * @param {*} responseType 
 * @param {*} body 
 * @param {*} bHandleNoInternet 
 * @returns 
 */
function makeRequest(url, method, responseType, body, bHandleNoInternet) {
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
				if (url.includes('https') && bHandleNoInternet)
					handleNoInternet();
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

/** @param {Object} message */
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

/**
 * @param {boolean} show 
 * @param {string} [text]
 */
function toggleLoader(show, text) {
	// show or hide loader (don't use UI for this function)
	let loaderContainer = document.getElementById('loader-container');
	if (!loaderContainer) {
		return;
	}
	if (!show) {
		clearTimeout(timeout);
		loaderContainer.classList.add('hidden');
		loader && (loader.remove ? loader.remove() : loaderContainer.removeChild(loader));
		loader = undefined;	
	} else if (!loader) {
		loaderContainer.classList.remove('hidden');
		loader = showLoader(loaderContainer, ( getTranslated(text || '') ) + '...');
		console.log('Show loader ...')
	}
};

/**
 * @returns {Promise<PluginInfo[]>}
 */
function loadAllPluginsData() {
	// get config file for each item in config.json
	/** @type {Array<number>} */
	let Unloaded = [];
	let url = isLocal ? OOMarketplaceUrl : ioUrl;
	/** @type {Promise<any>[]} */
	const pluginsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin, i, arr) {
		if (typeof plugin !== 'object') {
			plugin.name = plugin;
		}
		let pluginUrl = plugin.baseUrl;
		let confUrl = plugin.url;
		if (!pluginUrl || !confUrl) {
			pluginUrl = (plugin.name.indexOf(":/\/") == -1) ? url + 'sdkjs-plugins/content/' + plugin.name + '/' : plugin.name;
			confUrl = pluginUrl + 'config.json';
		}
		/** @type {PluginInfo} */
		let config = {
			url: confUrl,
			baseUrl: pluginUrl,
			languages: [ getTranslated('English') ]
		};
		return makeRequest(confUrl, 'GET', null, null, true)
			.then(function(response) {
				config = Object.assign(JSON.parse(response), config);
				arr[i] = config;
			})
			.catch(function(err) {
				Unloaded.push(i);
				console.error(plugin.name);
				createError(new Error('Problem with loading plugin config.\nConfig: ' + confUrl));
			}).then(function() {
				if (plugin.discussion) {
					config.discussionUrl = discussionsUrl + plugin.discussion;
				}
				return config;
			});
	});

	return Promise.all(pluginsPromises).then(function(arr) {
		removeUnloaded(Unloaded);
		sortPlugins(true, false, 'name');
		return allPlugins;
	});
};

/**
 * @returns {Promise<void>}
 */
function loadDiscussions() {
	/** @type {Promise<any>[]} */
	const discussionsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin, i, arr) {
		if (plugin.discussionUrl) {
			return getRating(plugin.discussionUrl)
				.then(function(rating) {
					if (!rating) return;
					plugin.rating = rating;
				});
		} else {
			return Promise.resolve();
		}
	});

	return Promise.all(discussionsPromises).then(function() {
		showRating();
	});
};

/** @returns {Promise<any[]>} */
function loadChangelogs() {
	/** @type {Promise<any>[]} */
	const pluginsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin) {
		return makeRequest(plugin.baseUrl + 'CHANGELOG.md', 'GET', null, null, false)
			.then(function(response) {
				let settings = getMarkedSetting();
				let value = parseChangelog(response);
				let lexed = marked.lexer(value, settings);
				plugin.changelog = marked.parser(lexed, settings);
			}).catch(function() {
				console.error('Failed to load changelog', plugin.name);
			});
	});

	return Promise.all(pluginsPromises);
}

/**
 * @param {string} discussionUrl 
 * @returns {Promise<Rating | null>}
 */
function getRating(discussionUrl) {
	// get discussion page
	if (isLocal && window.AscSimpleRequest && window.AscSimpleRequest.createRequest) {
		return makeDesktopRequest(discussionUrl)
			.then(function(data) {
				if (data.status == 'success') {
					return parseRatingPage(data.response.responseText);
				}
				return null;
			},
			function(err) {
				createError(err.response, false);
				return null;
			}
		);
	} else {
		let body = { target: discussionUrl };
		return makeRequest(proxyUrl, 'POST', null, body, false)
			.then(function(data) {
				data = JSON.parse(data);
				return parseRatingPage(data);
			}, function(err) {
				createError( new Error('Problem with loading rating'), true);
				return null;
			});
	}
};

/** @returns {Promise<void[]>} */
function loadAllPluginsLanguages() {
	let url = isLocal ? OOMarketplaceUrl : ioUrl;
	/** @type {Promise<any>[]} */
	const pluginsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin, i, arr) {
		return makeRequest(plugin.baseUrl + 'translations/langs.json', 'GET', null, null, false)
			.then(function(response) {
					/** @type {Array<string>} */
					let langs = JSON.parse(response);
					langs.forEach(function(full) {
						let short = full.split('-')[0];
						for (let i = 0; i < LANGUAGES.length; i++) {
							// detect only full language (because we can make mistake with some langs. for instance: "pt-PT" and "pt-BR")
							if (LANGUAGES[i][0] == full /*|| LANGUAGES[i][1] == short*/) {
								plugin.languages.push( getTranslated( LANGUAGES[i][2] ) );
							}
						}
					});
				}
			).catch(function() {
				console.error('Failed to load languages.json', plugin.name);
			});
	});

	return Promise.all(pluginsPromises);
}

/** @returns {Promise<void[]>} */
function loadInstalledLanguages() {
	const promises = installedPlugins.map(function(pl) {
		console.warn('get installed languages', pl);
		return makeRequest(pl.obj.baseUrl + 'translations/langs.json', 'GET', null, null, true).then(
			function(response) {
				let supportedLangs = [ getTranslated('English') ];
				let arr = JSON.parse(response);
				arr.forEach(function(full) {
					let short = full.split('-')[0];
					for (let i = 0; i < LANGUAGES.length; i++) {
						if (LANGUAGES[i][0] == short || LANGUAGES[i][1] == short) {
							supportedLangs.push( getTranslated( LANGUAGES[i][2] ) );
						}
					}
				});
				if (supportedLangs.length > 1)
					pl.obj.languages = supportedLangs;
			},
			function(error) {
				pl.obj.languages = [ getTranslated('English') ];
			}
		);
	});
	return Promise.all(promises);
};

function updateCategories() {
	STORAGE.categories = new Map();
	STORAGE.categories.set('all', 0);
	STORAGE.categories.set('onlyoffice', 0);
	/** @param {PluginInfo} plugin */
	const addCategoryToStorage = function(plugin) {
		let num = Number(STORAGE.categories.get('all'));
		STORAGE.categories.set('all', num + 1);
		if (!plugin.variations) {
			return;
		}
		if (plugin.onlyofficeScheme) {
			let category = 'onlyoffice';
			if (STORAGE.categories.has(category)) {
				let num = Number(STORAGE.categories.get(category));
				STORAGE.categories.set(category, num + 1);
			}
		}
		plugin.variations.forEach(function(variation) {
			if (!variation.store || !variation.store.categories) {
				return;
			}
			variation.store.categories.forEach(function(/** @type {string} */category) {
				if (STORAGE.categories.has(category)) {
					let num = Number(STORAGE.categories.get(category));
					STORAGE.categories.set(category, num + 1);
				} else {
					STORAGE.categories.set(category, 1);
				}
			})
		});
	}
	if (STORAGE.mainFilter === 'marketplace') {
		allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
			addCategoryToStorage(plugin);
		});
	} else if (STORAGE.mainFilter === 'installed') {
		installedPlugins.forEach(function(/** @type {InstalledPluginInfo} */ plugin) {
			if (!plugin.obj) {
				return;
			}
			addCategoryToStorage(plugin.obj);
		});
	} else {
		allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
			if (!plugin.bHasUpdate) {
				return;
			}
			addCategoryToStorage(plugin);
		});
	}
	let numOfAllPlugins = allPlugins.length;
	let numOfInstalledPlugins = installedPlugins.length;
	let numOfPluginsToUpdate = allPlugins.reduce(function(acc, plugin) {
		return plugin.bHasUpdate ? acc + 1 : acc;
	}, 0);
	UI.updateCategories(STORAGE.categories);
	UI.updateMainCategories(numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate);
}

/**
 * @param {'filtered'|'all'|'installed'} typeOfOperation
 * @returns {number}
 */
function showListOfPlugins(typeOfOperation) {
	console.log('show list of plugins', typeOfOperation);
	let arr = getFilteredPlugins();
	if (arr.length && isSamePlugins(founded, arr)) {
		console.log('Same plugins');
		toggleLoader(false);
		return arr.length;
	}
	founded = arr;
	
	UI.divMain.textContent = '';

	// get list of backup plugins
	if (STORAGE.mainFilter === 'installed' && isLocal) {
		var _pluginsTmp = JSON.parse(window["AscDesktopEditor"]["GetBackupPlugins"]());

		if (_pluginsTmp.length) {
			var len = _pluginsTmp[0]["pluginsData"].length;
			for (var i = 0; i < len; i++) {
				let plugin = _pluginsTmp[0]["pluginsData"][i];
				plugin.baseUrl = _pluginsTmp[0]["url"] + plugin.guid.replace('asc.', '') + '/';

				const installed = findInstalledPlugin(plugin.guid);

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
				createPluginPlate(plugin);
		});
		setTimeout(function(){if (PsMain) PsMain.update(); toggleLoader(false);});
	} else {
		// if no installed plugins and available plugins button was clicked
		let notification = typeOfOperation === 'filtered' ? 'Nothing was found for this query.' : typeOfOperation === 'all' ? 'Problem with loading plugins.' : 'No installed plugins.';
		createNotification(notification);
		toggleLoader(false);
	}
	// scroll for list of plugins
	if (!PsMain) {
		PsMain = new PerfectScrollbar('.plugins-container', {});
		PsMain.update();
	} else {
		PsMain.update();
	}
	// scroll for changelog preview
	if (!PsChangelog) {
		PsChangelog = new PerfectScrollbar('#div_selected_changelog', {});
		PsChangelog.update();
	}

	return arr.length;
};

/**
 * @param {Plugins} pluginsOld 
 * @param {Plugins} pluginsNew 
 * @returns {boolean}
 */
function isSamePlugins(pluginsOld, pluginsNew) {
    if (pluginsOld.length !== pluginsNew.length) {
        return false;
    }
    
    for (let i = 0; i < pluginsOld.length; i++) {
        if (pluginsOld[i].guid !== pluginsNew[i].guid) {
            return false;
        }
    }
    
    return true;
}

/**
 * @param {string} text 
 * @returns {number}
 */
function convertPluginVersionToNumber(text) {
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

/**
 * This function creates div (preview) for plugins
 * @param {InstalledPluginInfo | PluginInfo} pluginOrInstalledPlugin
 */
function createPluginPlate(pluginOrInstalledPlugin) {
	const guid = pluginOrInstalledPlugin.guid;
	const bInstalled = STORAGE.mainFilter === 'installed';
	const pluginPlate = document.createElement('div');
	pluginPlate.id = guid;
	pluginPlate.setAttribute('data-guid', guid);
	pluginPlate.className = 'plugin-plate form-control noselect';
	/** @type {number} */
	let zoom;
	if (scale.devicePR < 1)
		zoom = (1 / devicePixelRatio);
	if (scale.devicePR > 2)
		zoom = (1 / devicePixelRatio) * 2;
	pluginPlate.style.border = ((zoom > 1 ? 1 : zoom)) +'px solid ' + (themeType == 'light' ? '#c0c0c0' : '#666666');

	pluginPlate.onclick = onClickPluginPlate.bind(pluginPlate, guid);

	/** @type {InstalledPluginInfo} */
	let installed = bInstalled ? pluginOrInstalledPlugin : findInstalledPlugin(guid);
	/** @type {PluginInfo} */
	let plugin = bInstalled ? findPlugin(guid) : pluginOrInstalledPlugin;


	let bCheckUpdate = true;
	if (!plugin) {
		plugin = installed.obj;
		bCheckUpdate = false;
	}

	let bNotAvailable = false;
	const minV = (plugin.minVersion ? convertPluginVersionToNumber(plugin.minVersion) : -1);
	if (minV > editorVersion) {
		bCheckUpdate = false;
		bNotAvailable = true;
	}

	let bHasUpdate = false;
	let bRemoved = (installed && installed.removed);
	if (bCheckUpdate && installed && plugin) {
		const installedV = convertPluginVersionToNumber(installed.obj.version);
		const lastV = convertPluginVersionToNumber(plugin.version);
		if (lastV > installedV) {
			bHasUpdate = true;
			plugin.bHasUpdate = true;
			if (!bRemoved)
				UI.btnUpdateAll.classList.remove('hidden');
		}
	}

	let variation = plugin.variations[0];
	let name = ( bTranslate && plugin.nameLocale && ( plugin.nameLocale[lang] || plugin.nameLocale[shortLang] ) ) ? ( plugin.nameLocale[lang] || plugin.nameLocale[shortLang] ) : plugin.name;
	let description = ( bTranslate && variation.descriptionLocale && ( variation.descriptionLocale[lang] || variation.descriptionLocale[shortLang] ) ) ? ( variation.descriptionLocale[lang] || variation.descriptionLocale[shortLang] ) : variation.description;
	let bg = variation.store && variation.store.background ? variation.store.background[themeType] : defaultBG;
	let additional = bNotAvailable ? 'disabled title="' + getTranslated(MESSAGES.versionWarning) + '"'  : '';
	let offered = plugin.offered || "ONLYOFFICE";

	const bNeedUpdateButton = bHasUpdate && !bRemoved;
	const bNeedRemoveButton = installed && !bRemoved && installed.canRemoved;
	const bNeedInstallButton = !installed || bRemoved;

	let template = '<div class="introduction">' +
		'<div class="image" style="background: ' + bg + '">' +
			'<img id="img_' + guid + '" class="plugin_icon" style="display:none" data-guid="' + guid + '" src="' + getImageUrl(guid, false, true, ('img_' + guid) ) + '">' +
		'</div>' +
		'<div class="name">' +
			'<div>' +
				'<span>' + name + '</span>' +
				(!!plugin.onlyofficeScheme ? '<span class="by-onlyoffice">✓</span>' : '') +
			'</div>' +
			'<div class="manufacturer">' + offered + '</div>' +
		'</div>' +
		'</div>' +

		'<div class="description">' + description + '</div>' +
		'<div class="management">' +
			'<div class="rating">' +
				(makeRatingElements(plugin.rating)) +
			'</div>' +
			makeActionButtons(guid, bNeedUpdateButton, bNeedRemoveButton, bNeedInstallButton, bNotAvailable, additional) +
		'</div>' +
	'</div>';
	pluginPlate.innerHTML = template;
	UI.addPlugin(guid, pluginPlate);
	if (PsMain) PsMain.update();
};

/**
 * @param {string} guid 
 * @param {boolean} bNeedUpdateButton 
 * @param {boolean} bNeedRemoveButton 
 * @param {boolean} bNeedInstallButton
 * @param {boolean} [bNotAvailable] 
 * @param {string} [additional] 
 * @returns {string}
 */
function makeActionButtons(guid, bNeedUpdateButton, bNeedRemoveButton, bNeedInstallButton, bNotAvailable, additional) {
	let result = '<button class="btn-text-default ';
	if (bNeedUpdateButton) {
		result += 'update" onclick="onClickUpdate(' + guid + ', event)">' + getTranslated("Update");
	} else if (bNeedRemoveButton) {
		result += 'remove" onclick="onClickRemove(' + guid + ', event)" ' + (bNotAvailable ? 'dataDisabled="disabled"' : "") +'>';
		result += getTranslated("Remove");
	} else if (bNeedInstallButton) {
		result += 'install" onclick="onClickInstall(\'' + guid + '\', event)" ' + (additional || "") + '>'  + getTranslated("Install");
	} else {
		return '';
	}
	result += '</button>';
	return result;
}

/**
 * @param {Rating} [rating]
 * @returns {string}
 */
function makeRatingElements(rating) {
	let result = '';
	if (!rating) {
		result = '<em class="i18n">' + getTranslated("Not rated") + '</em>';
	} else {
		result = '<div class="stars">';
		let percents = rating.percent;
		for (let i = 0; i < 5; i++) {
			let opacity = percents >= 20 ? 1 : percents === 0 ? 0.1 : percents / 20;
			if (opacity === 1) {
				result += '<span>★</span>';
			} else {
				result += '<span style="opacity: ' + opacity + '">★</span>';
			}
			if (percents >= 20) {
				percents -= 20;
			} else {
				percents = 0;
			}
		}

		result += '</div> <span>' + rating.average + '</span><span>(' + rating.total + ')</span>'
	}

	return result;
}

function showRating() {
	let showRatingHandle = 0;
	const SHOW_RATING_CHUNK = 25;

	// cancel previous unfinished pass, so repeated calls don't pile up
	if (showRatingHandle) {
		cancelAnimationFrame(showRatingHandle);
		showRatingHandle = 0;
	}

	// snapshot the list so it can't change mid-iteration
	const plugins = allPlugins.slice();
	let i = 0;

	function processChunk() {
		showRatingHandle = 0;
		const end = Math.min(i + SHOW_RATING_CHUNK, plugins.length);
		for (; i < end; i++) {
			const plugin = plugins[i];
			const pluginPlate = UI.getPlugin(plugin.guid);
			if (!pluginPlate) {
				console.error('Failed to find plugin plate for guid: ' + plugin.guid);
				continue;
			}
			const div = pluginPlate.querySelector('.rating');
			if (!div) continue;
			div.innerHTML = makeRatingElements(plugin.rating);
		}
		if (i < plugins.length) {
			// yield back to the browser so it can paint / handle input
			showRatingHandle = requestAnimationFrame(processChunk);
		}
	}

	showRatingHandle = requestAnimationFrame(processChunk);

	if (UI.divSelected && !UI.divSelected.classList.contains('hidden')) {
		let guid = UI.divSelected.getAttribute('data-guid');
		if (!guid) {
			console.error('Failed to find guid for selected plugin');
			return;
		}
		let plugin = findPlugin(guid);
		if (plugin && plugin.rating) {
			UI.totalVotes.textContent = String(plugin.rating.total);
			UI.divStarsColored.style.width = plugin.rating.percent + '%';
			// UI.divRatingLink.classList.remove('hidden');
			UI.divRatingLink.removeAttribute('title');
			UI.divVotes.classList.remove('hidden');
			UI.discussionLink.classList.remove('hidden');
		} else {
			UI.divRatingLink.setAttribute('title', getTranslated('No disscussion page for this plugin.'));
		}
	}
};

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickInstall(guid, event) {
	// click install button
	event.stopImmediatePropagation();
	// click install button
	// we should do that because we have some problem when desktop is loading plugin
	if (isLocal) {
		toggleLoader(true, 'Installation');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(toggleLoader, 200, true, "Installation");
	}
	/** @type {PluginInfo | undefined} */
	let plugin = findPlugin(guid);
	/** @type {InstalledPluginInfo | undefined} */
	let installed = findInstalledPlugin(guid);
	if (!plugin && !installed) {
		// if we are here if means that plugin tab is opened, plugin is uninstalled and we don't have internet connection
		sendMessage( { type : "showButton", show : false } );
		onClickBack();
		toggleLoader(false);
	}
	console.warn(event, guid, plugin);
	console.log(plugin);
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

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickUpdate(guid, event) {
	// click update button
	// we should do that because we have some problem when desktop is loading plugin
	if (isLocal) {
		toggleLoader(true, 'Updating');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(toggleLoader, 200, true, "Updating");
	}
	let plugin = findPlugin(guid);
	if (!plugin) {
		console.error('Plugin not found for update: ' + guid);
		return;
	}
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
/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickRemove(guid, event) {
	event.stopImmediatePropagation();
	// click remove button
	if (isLocal) {
		toggleLoader(true, 'Removal');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(toggleLoader, 200, true, "Removal");
	}
	let message = {
		type : 'remove',
		guid : guid,
		backup : needBackupPlugin(guid)
	};
	sendMessage(message);
};

function needBackupPlugin(guid) {
	// check installed plugin:
	// if the plugin exists in the store (and its version <= ?), we can delete it, user will be able to install the current version
	// if the plugin is not in the store, we need to keep it for the user with the ability to restore

	return isLocal ? findPlugin(guid) == undefined : false;
}

function onClickUpdateAll() {
	clearTimeout(timeout);
	timeout = setTimeout(toggleLoader, 200, true, "Updating");
	UI.btnUpdateAll.classList.add('hidden');
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

/** @param {string} guid */
function onClickPluginPlate(guid) {
	// There we will make preview for selected plugin
	let offered = "Ascensio System SIA";
	let hiddenCounter = 0;
	let pluginPlate = UI.getPlugin(guid);
	if (!pluginPlate) {
		console.error('Plugin not found: ' + guid);
		return;
	}
	let divPreview = document.createElement('div');
	divPreview.id = 'div_preview';
	divPreview.className = 'div_preview';

	/** @type {InstalledPluginInfo} */
	let installed = findInstalledPlugin(guid);
	/** @type {PluginInfo} */
	let plugin = findPlugin(guid);
	let discussionUrl = plugin ? plugin.discussionUrl : null;
	
	if (plugin && plugin.rating) {
		UI.divRatingLink.removeAttribute('title');
		UI.totalVotes.textContent = String(plugin.rating.total);
		UI.divStarsColored.style.width = plugin.rating.percent + '%';
		UI.discussionLink.classList.remove('hidden');
		UI.divVotes.classList.remove('hidden');
	} else {
		UI.divStarsColored.style.width = "0";
		UI.divVotes.classList.add('hidden');
		UI.discussionLink.classList.add('hidden');
	}

	if ( !plugin || ( isLocal && installed && plugin.baseUrl.includes('file:') ) ) {
		UI.divGitLink.classList.add('hidden');
		plugin = installed.obj;
	} else {
		UI.divGitLink.classList.remove('hidden');
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
			document.getElementById('div_selected_container').insertBefore(container, UI.arrowPrev);
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
			UI.arrowPrev.classList.remove('hidden');
			UI.arrowNext.classList.remove('hidden');
		}
		slideIndex = 1;
		showSlides(1);
	} else {
		UI.arrowPrev.classList.add('hidden');
		UI.arrowNext.classList.add('hidden');
	}

	const actionButton = UI.getPluginButton(guid);
	let bHasUpdate = actionButton && actionButton.classList.contains('update');
	
	if ( (installed && installed.obj.version) || plugin.version ) {
		UI.spanVersion.textContent = String(installed && installed.obj.version ? installed.obj.version : plugin.version);
		UI.divVersion.classList.remove('hidden');
	} else {
		UI.spanVersion.textContent = '';
		UI.divVersion.classList.add('hidden');
		hiddenCounter++;
	}

	if ( (installed && installed.obj.minVersion) || plugin.minVersion ) {
		UI.spanMinVersion.textContent = String(installed && installed.obj.minVersion ? installed.obj.minVersion : plugin.minVersion);
		UI.divMinVersion.classList.remove('hidden');
	} else {
		UI.spanMinVersion.textContent = '';
		UI.divMinVersion.classList.add('hidden');
		hiddenCounter++;
	}	

	if (plugin.languages) {
		UI.spanLanguages.textContent = plugin.languages.join(', ') + '.';
		UI.divLanguages.classList.remove('hidden');
	} else {
		UI.spanLanguages.textContent = '';
		UI.divLanguages.classList.add('hidden');
		hiddenCounter++;
	}

	if (plugin.changelog) {
		document.getElementById('span_changelog').classList.remove('hidden');
		document.getElementById('div_changelog_preview').innerHTML = plugin.changelog;
	} else {
		document.getElementById('span_changelog').classList.add('hidden');
		document.getElementById('div_changelog_preview').textContent = '';
	}

	let pluginUrl = plugin.baseUrl.replace(OOMarketplaceUrl, (OOIO + 'tree/master/') );
	
	// TODO problem with plugins icons (different margin from top)
	UI.divSelected.setAttribute('data-guid', guid);
	// we do this, because new icons for store are too big for use it in this window.
	let tmp = getImageUrl(guid, false, true, 'img_icon');
	document.getElementById('div_icon_info').style.background = pluginPlate.querySelector('.image').style.background;
	UI.imgIcon.setAttribute('src', tmp);
	UI.spanName.textContent = plugin.name;
	UI.spanOffered.textContent = plugin.offered || offered;
	UI.spanSelectedDescr.textContent = plugin.variations[0].description;
	if (bWebUrl) {
		UI.linkPlugin.setAttribute('href', pluginUrl);
		UI.linkReadme.setAttribute('href', pluginUrl + 'README.md');
		UI.divReadme.classList.remove('hidden');
	} else {
		UI.linkPlugin.setAttribute('href', '');
		UI.linkReadme.setAttribute('href', '');
		UI.divReadme.classList.add('hidden');
	}
	
	if (discussionUrl)
		UI.discussionLink.setAttribute('href', discussionUrl);
	else
		UI.discussionLink.removeAttribute('href');

	if (bHasUpdate) {
		UI.btnUpdate.classList.remove('hidden');
	} else {
		UI.btnUpdate.classList.add('hidden');
	}

	if (installed && !installed.removed) {
		if (installed.canRemoved) {
			UI.btnRemove.classList.remove('hidden');
		} else {
			UI.btnRemove.classList.add('hidden');
		}
		UI.btnInstall.classList.add('hidden');
	} else {
		UI.btnRemove.classList.add('hidden');
		UI.btnInstall.classList.remove('hidden');
	}

	if (actionButton && actionButton.hasAttribute('disabled')) {
		UI.btnInstall.setAttribute('disabled','');
		UI.btnInstall.setAttribute('title', getTranslated(MESSAGES.versionWarning));
	} else {
		UI.btnInstall.removeAttribute('disabled');
		UI.btnInstall.removeAttribute('title');
	}

	if (hiddenCounter == 3) {
		// if versions and languages fields are hidden, we should hide this div
		document.getElementById('div_plugin_info').classList.add('hidden');
	} else {
		document.getElementById('div_plugin_info').classList.remove('hidden');
	}

	UI.divSelected.classList.remove('hidden');
	UI.divSelectedMain.classList.remove('hidden');
	UI.pluginsList.classList.add('hidden');
	setDivHeight();
	sendMessage( { type : "showButton", show : true } );
	// UI.arrow.classList.remove('hidden');
};

function onClickBack() {
	// click on left arrow in preview mode
	UI.imgIcon.style.display = 'none';
	document.querySelectorAll('.dot').forEach(function(el) { el.remove(); });
	document.querySelectorAll('.mySlides').forEach(function(el) { el.remove(); });
	UI.arrowPrev.classList.add('hidden');
	UI.arrowNext.classList.add('hidden');
	document.getElementById('span_overview').click();
	UI.divSelected.classList.add('hidden');
	UI.divSelectedMain.classList.add('hidden');
	UI.pluginsList.classList.remove('hidden');
	if(PsMain) PsMain.update();
};

function onSelectPreview(target, type) {
	// change mode of preview
	if ( !target.classList.contains('span_selected') ) {
		document.querySelectorAll(".span_selected").forEach(function(el) { el.classList.remove("span_selected"); });
		target.classList.add("span_selected");
		document.querySelectorAll(".div_selected_preview").forEach(function(el) { el.classList.add("hidden"); });

		// type: 1 - Overview; 2 - Info; 3 - Changelog;
		if (type === 1) {
			UI.divSelectedPreview.classList.remove('hidden');
			setDivHeight();
		} else if (type === 2) {
			document.getElementById('div_selected_info').classList.remove('hidden');
		} else {
			document.getElementById('div_selected_changelog').classList.remove('hidden');
			PsChangelog.update();
		}
	}
};

/**
 * @param {string} text 
 * @param {string} [err] 
 */
function createNotification(text, err) {
	// creates any notification for user inside UI.divMain window (you should clear this element before making notification)
	let div = document.createElement('div');
	div.className = 'div_notification';
	if (err) {
		let icon = document.createElement('div');
		icon.className = 'icon_notification';
		div.appendChild(icon);
		let spanErr = document.createElement('span');
		spanErr.className = 'error_caption';
		spanErr.textContent = getTranslated(err);
		div.appendChild(spanErr);
	}
	let spanNot = document.createElement('span');
	spanNot.className = 'span_notification text-secondary';
	spanNot.textContent = getTranslated(text);
	div.appendChild(spanNot);
	UI.divMain.appendChild(div);
};

/**
 * @param {{message: string}} err 
 * @param {boolean} [bDontShow]
 * @returns 
 */
function createError(err, bDontShow) {
	// creates a modal window with error message for user and error in console
	console.error(err);
	let divErr = document.getElementById('div_error');
	if (!divErr) {
		return;
	}
	// we don't show a new error if we have previous one
	if (!divErr.classList.contains('hidden') || bDontShow)
		return;
	let background = document.createElement('div');
	background.className = 'asc-plugin-loader';
	let span = document.createElement('span');
	span.className = 'error_caption';
	let message = err.message || 'Problem with loading some resources';
	span.textContent = getTranslated(message);
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
	if (PsMain) PsMain.update();
	// console.log(Math.round(window.devicePixelRatio * 100));
	if (UI.divSelectedImage) {
		let height = UI.divSelectedPreview.clientHeight - UI.divDescriptionSelected.clientHeight - 70 + 'px';
		UI.divSelectedImage.style.height = height;
		UI.divSelectedImage.style.maxHeight = height;
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
		let borderValue = ((revZoom > 1 ? 1 : revZoom) +'px solid ' + (themeType == 'light' ? '#c0c0c0' : '#666666'));
		document.querySelectorAll('.plugin-plate').forEach(function(el) { el.style.border = borderValue; });
	}
	if (PsChangelog) PsChangelog.update();
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
		if (!guid) continue;
		arr[i].setAttribute( 'src', getImageUrl( guid, false, true, ('img_' + guid) ) );
	}
	let guid = UI.divSelected.getAttribute('data-guid');
	if (!guid) return;
	UI.imgIcon.setAttribute('src', getImageUrl(guid, false, true, 'img_icon'));
};

/** @returns {Promise<boolean>} */
function getTranslation() {
	// gets translation for current language
	if (shortLang === "en") {
		return Promise.resolve(true);
	}
	let errorMessage = 'Cannot load translations list file.';
	return makeRequest('./translations/langs.json', 'GET', null, null, true)
		.then(function(response) {
			let arr = JSON.parse(response);
			let name = '';
			for (let i = 0; i < arr.length; i++) {
				let file = arr[i];
				if (file == lang) {
					name = file;
					break;
				} else if (file.split('-')[0] == shortLang) {
					name = file;
				}
			}
			errorMessage = 'Cannot load translation for current language.';
			if (!name) {
				return;
			}
			bTranslate = true;
			return makeRequest('./translations/' + name + '.json', 'GET', null, null, true);
		}).then(function(res) {
			if (!res) {
				return false;
			}
			// console.log('get translation: ' + (Date.now() - start));
			translate = JSON.parse(res);
			return true;
		}).catch(function(err) {
			createError( new Error(errorMessage));
			return false;
		});

};

function onTranslate() {
	document.querySelectorAll(".i18n").forEach((el) => {
		if (el instanceof HTMLElement === false) return;

		["placeholder", "title"].forEach((attr) => {
			if (el.hasAttribute(attr)) {
				el.setAttribute(
					attr,
					getTranslated(el.getAttribute(attr) || ""),
				);
			}
		});

		const translated = getTranslated(
			el.textContent.trim().replace(/\s+/g, " "),
		);
		if (translated) el.textContent = translated;
	});
};

function showMarketplace() {
	// show main window to user
	if (installedPlugins) {
		if (isOnline) {
			showListOfPlugins('all');
		} else {
			toggleView("installed");
			toggleLoader(false);
		}
		UI.pluginsList.classList.remove('transparent');

		console.log('show marketplace');
	}
};

/**
 * @param {string} guid 
 * @param {boolean} bNotForStore 
 * @param {boolean} bSetSize 
 * @param {string} id 
 * @returns 
 */
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
		plugin = findInstalledPlugin(guid);
		if (plugin) {
			plugin = plugin.obj;
			baseUrl = plugin.baseUrl;
		}
	}

	if ( ( !plugin || !isLocal ) && allPlugins) {
		plugin = findPlugin(guid);
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
					if (typeof reader.result !== "string") {
						return;
					}
					/** @type {string} */
					let imageUrl = reader.result;
					let img = document.createElement('img');
					img.setAttribute('src', imageUrl);
					img.onload = function () {
						let icon = document.getElementById(id);
						if (!icon) return;
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

/**
 * @param {string} key 
 * @returns {string}
 */
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

/**
 * @param {InstalledFilter} currentValue
 * @param {boolean} [bForce]
 */
function toggleView(currentValue, bForce) {
	console.log('toggle view', currentValue);
	if (STORAGE.mainFilter === currentValue && !bForce) {
		return;
	}
	STORAGE.mainFilter = currentValue;
	UI.inpSearch.value = '';
	UI.setCheckedInstalledFilter(currentValue);
	UI.linkNewPlugin.textContent = getTranslated(MESSAGES[currentValue]);
	founded = [];

	const bAll = currentValue === 'marketplace';
	let toolbar = document.getElementById('toolbar_tools');
	if (!toolbar) {
		console.error('Failed to get toolbar');
		return;
	}

	let flag = !isLocal && !isOnline;
	if ( ( bAll && (!isOnline) ) || flag) {
		console.warn(1);
		UI.divMain.textContent = '';
		setTimeout(function(){if (PsMain) PsMain.update()});
		toolbar.classList.add('hidden');
		createNotification('No Internet Connection.', 'Problem with loading some resources');
	} else {
		console.warn(2);
		toolbar.classList.remove('hidden');
		showListOfPlugins(bAll ? 'all' : 'installed');
	}
	UI.linkNewPlugin.href = bAll ? (OOIO + "pulls") : "https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/";

	if (isLocal && !bAll) {
		console.warn(3);
		UI.linkNewPlugin.href = "#";
		UI.linkNewPlugin.onclick = function (e) {
			e.preventDefault();
			installPluginManually();
		}
	} else {
		console.warn(4);
		UI.linkNewPlugin.onclick = null;
	}
};

function installPluginManually() {
	window["AscDesktopEditor"]["OpenFilenameDialog"]("plugin", false, function (_file) {
		var file = _file;
		if (Array.isArray(file))
			file = file[0];

		let result = window["AscDesktopEditor"]["PluginInstall"](file);
		if (result) {
			// need to update the list of installed plugins
			updateInstalledPlugins();
		} else {
			createError(new Error('Problem with plugin installation.'), false);
		}
	});
};

/**
 * @param {boolean} bAll 
 * @param {boolean} bInst 
 * @param {"rating" | "installations" | "start" | "name"} type 
 */
function sortPlugins(bAll, bInst, type) {
	switch (type) {
		case 'rating':
			// todo
			break;
		case 'installations':
			// todo
			break;
		case 'start':
			if (bInst) {
				/** @type {Array<InstalledPluginInfo>} */
				let guarded = [];
				/** @type {Array<InstalledPluginInfo>} */
				let removed = [];
				/** @type {Array<InstalledPluginInfo>} */
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
		case 'name':
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
		default:
			break;
	}
};

/** @returns {Plugins} */
function getFilteredPlugins() {
	const category = STORAGE.categoryFilter;
	const mainFilter = STORAGE.mainFilter;
	const searchQuery = STORAGE.searchQuery;

	/** @type {Plugins} */
	let plugins = allPlugins;
	if (mainFilter === 'installed') {
		plugins = installedPlugins;
	} else if (mainFilter === 'updates') {
		plugins = allPlugins.filter(plugin => plugin.bHasUpdate);
	}

	if (category === "onlyoffice") {
		plugins = plugins.filter(function(plugin) {
			if (Object.prototype.hasOwnProperty.call(plugin, 'obj')) {
				return plugin.obj.onlyofficeScheme;
			}
			return plugin.onlyofficeScheme;
		});
	} else if (category != "all") {
		plugins = plugins.filter(function(plugin) {
			let variations = plugin.variations;
			if (Object.prototype.hasOwnProperty.call(plugin, 'obj')) {
				variations = plugin.obj.variations;
			}
			let variation = variations[0];
			let arrCat = (variation.store && variation.store.categories) ? variation.store.categories : [];
			return arrCat.includes(category);
		});
	}

	plugins = plugins.filter(function(el) {
		let plugin = el.obj || el;
		let name = (plugin.nameLocale && ( plugin.nameLocale[lang] || plugin.nameLocale[shortLang] ) ) ? ( plugin.nameLocale[lang] || plugin.nameLocale[shortLang] ) : plugin.name;
		return name.toLowerCase().includes(searchQuery);
	});

	return plugins;
};

/** @param {Array<number>} unloaded */
function removeUnloaded(unloaded) {
	for (let i = unloaded.length - 1; i >= 0; i--) {
		allPlugins.splice(unloaded[i], 1);
	}
};

/**
 * @param {string} guid 
 * @returns {PluginInfo | undefined}
 */
function findPlugin(guid) {
	let res = allPlugins.find(function(el){return el.guid === guid});
	return res;
};

/**
 * @param {string} guid 
 * @returns {InstalledPluginInfo | undefined}
 */
function findInstalledPlugin(guid) {
	return installedPlugins.find(function(el){return el.guid === guid});
};

/**
 * @param {boolean} bInstall 
 * @param {string} guid 
 * @param {boolean} [bHasLocal] 
 */
function changeAfterInstallOrRemove(bInstall, guid, bHasLocal) {
	console.warn('change after install or remove');
	let btn = UI.getPluginButton(guid);
	if (!btn) return;
	let bHasUpdate = btn.classList.contains('update');

	if (bInstall && bHasUpdate) {
		btn.textContent = getTranslated('Update');
		btn.classList.add('update');
		btn.classList.remove('install');
		btn.onclick = function(e) {
			onClickUpdate(guid, e);
		};
	} else if (bInstall) {
		btn.textContent = getTranslated('Remove');
		btn.classList.add('remove');
		btn.classList.remove('install');
		btn.onclick = function(e) {
			onClickRemove(guid, e);
		};
	} else {
		btn.textContent = getTranslated('Install');
		btn.classList.add('install');
		btn.classList.remove('remove');
		btn.onclick = function(e) {
			onClickInstall(guid, e);
		};
	}

	// We need to keep the ability to install the local version that has been removed (maybe we should change the button)
	if ( !bInstall && btn.hasAttribute('dataDisabled') && !bHasLocal ) {
		btn.setAttribute('title', getTranslated(MESSAGES.versionWarning));
	}

	if (!UI.divSelected.classList.contains('hidden')) {
		if (bInstall) {
			UI.btnInstall.classList.add('hidden');
			UI.btnRemove.classList.remove('hidden');
		} else {
			UI.btnInstall.classList.remove('hidden');
			UI.btnRemove.classList.add('hidden');
		}
		if (bInstall && bHasUpdate)
			UI.btnUpdate.classList.remove('hidden');
		else
			UI.btnUpdate.classList.add('hidden');
	}
	checkNoUpdated(!bInstall);
};

/**
 * @returns {Promise<boolean>}
 */
function checkInternet() {
	// url for check internet connection
	let url = 'https://onlyoffice.github.io/store/translations/langs.json';
	return makeRequest(url, 'GET', null, null, false)
		.then(function(res) {
			isOnline = true;
			return true;
		}).catch(function(error) {
			isOnline = false;
			return false;
		});
};

function handleNoInternet() {
	(function checkInternetRecursion() {
		setTimeout(function() {
			checkInternet()
				.then(function(bOnline) {
					if (!bOnline) {
						return checkInternetRecursion();
					}

					let bShowSelected = UI.divSelected && !UI.divSelected.classList.contains('hidden');
					let bShowMarketplace = bShowSelected ? false : ( ( STORAGE.mainFilter === 'marketplace' ) ? true : false );
					if (!allPlugins.length) {
						return fetchAllPlugins();
					} else if (bShowSelected) {
						let div = UI.getSelectedPlugin();
						if (div)
							div.click();
					} else if (bShowMarketplace) {
						toggleView("marketplace", true);
					} else if (!isLocal) {
						toggleView("installed", true);
					}
					return bOnline;
				});
		}, 3000);
	})();
	
	let bShowMarketplace = false;
	if (STORAGE.mainFilter === 'marketplace') {
		bShowMarketplace = true;
	}

	if ( (bShowMarketplace || !isLocal) && UI.divSelected && !UI.divSelected.classList.contains('hidden') ) {
		sendMessage( { type : "showButton", show : false } );
		onClickBack();
	}

	if (!document.getElementsByClassName('div_notification')[0] && (bShowMarketplace || !isLocal)) {
		toggleView(STORAGE.mainFilter, true);
	}
};

/**
 * @param {string} text
 * @returns {string}
 */
function getTranslated(text) {
	return translate[text.trim()] || text;
};

/**
 * @param {*} data 
 * @returns {Rating | null}
 */
function parseRatingPage(data) {
	// if we load this page, parse it
	/** @type {Rating | null} */
	let result = null;
	if (data !== 'Not Found') {
		try {
			let parser = new DOMParser();
			let doc = parser.parseFromString(data, "text/html");
			// we will have a problem if github change their page
			let first = Number(doc.getElementById('result-row-1').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
			let second = Number(doc.getElementById('result-row-2').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
			let third = Number(doc.getElementById('result-row-3').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
			let fourth = Number(doc.getElementById('result-row-4').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
			let fifth = Number(doc.getElementById('result-row-5').childNodes[1].childNodes[3].textContent.replace(/[\n\s%]/g,''));
			let total = Number(doc.getElementsByClassName('text-small color-fg-subtle')[0].childNodes[1].firstChild.textContent.replace(/[\n\sa-z]/g,''));
			first = Math.ceil(total * first / 100) * 5;   // it's 5 stars
			second = Math.ceil(total * second / 100) * 4; // it's 4 stars
			third = Math.ceil(total * third / 100) * 3;   // it's 3 stars
			fourth = Math.ceil(total * fourth / 100) * 2; // it's 2 stars
			fifth = Math.ceil(total * fifth / 100);       // it's 1 star
			let average = total === 0 ? 0 : (first + second + third + fourth + fifth) / total;
			let percent = average / 5 * 100;
			result = {
				total: total,
				average: average.toFixed(1),
				percent: percent
			};
		} catch (error) {
			// nothing to do
			return result;
		}
	}
	return result;
};

/** @param {string} data */
function parseChangelog(data) {
	let arr = data.replace('# Change Log', '').split('\n\n## ');
	if (arr[0] == '')
		arr.shift();

	let indLast = arr.length - 1;
	let end = arr[0].indexOf('\n\n');
	let firstVersion = convertPluginVersionToNumber( arr[0].slice(0, end) );
	end = arr[indLast].indexOf('\n\n');
	let lastVersion = convertPluginVersionToNumber( arr[indLast].slice(0, end) );
	if (lastVersion > firstVersion)
		arr = arr.reverse();

	return ( '## ' + arr.join('\n\n## ') );
};

/** @param {boolean} bRemove */
function checkNoUpdated(bRemove) {
	// todo it's a temp solution. We will change a work with updation in the feature.
	if ( (!UI.btnUpdateAll.classList.contains('hidden') && bRemove) || (UI.btnUpdateAll.classList.contains('hidden') && !bRemove) ) {
		let arr = document.getElementsByClassName('span_update');
		let bHasNoUpdated = false;
		for (let index = 0; index < arr.length; index++) {
			if (!arr[index].classList.contains('hidden')) {
				bHasNoUpdated = true;
				break;
			}
		}
		if (bHasNoUpdated) {
			UI.btnUpdateAll.classList.remove('hidden');
		} else {
			UI.btnUpdateAll.classList.add('hidden');
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
	/** @type {HTMLCollectionOf<HTMLDivElement>} */
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