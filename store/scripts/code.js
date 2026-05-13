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
/// <reference path="./utils.js" />
/// <reference path="./data-fetcher.js" />

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
let themeType = detectThemeType();                                   // current theme
const lang = detectLanguage();                                       // current language
const shortLang = lang.split('-')[0];                                // short language
let bTranslate = false;                                              // flag translate or not
/** @type {number} */
let timeout;                                                 		 // delay for loader
let defaultBG = themeType == 'light' ? "#F5F5F5" : '#555555';    // default background color for plugin header
let isResizeOnStart = false;                                         // flag for firs resize on start
/** @type {any} */
let PsMain = null;                                                   // scroll for list of plugins
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
		Utils.translate["Loading"] = "Загрузка"
		break;
	case 'fr':
		Utils.translate["Loading"] = "Chargement"
		break;
	case 'es':
		Utils.translate["Loading"] = "Carga"
		break;
	case 'de':
		Utils.translate["Loading"] = "Laden"
		break;
	case 'cs':
		Utils.translate["Loading"] = "Načítání"
		break;
	case 'it':
		Utils.translate["Loading"] = "Caricamento"
		break;
	case 'ja':
		translate["Loading"] = "積み込み"
		break;
	case 'pt':
		Utils.translate["Loading"] = "Carregamento"
		break;
	case 'si':
		translate["Loading"] = "පැටවීම"
		break;
	case 'uk':
		Utils.translate["Loading"] = "Вантаження"
		break;
	case 'zh':
		Utils.translate["Loading"] = "装载量"
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

let pos = location.href.indexOf('store/index.html'); // position for make substring
if (pos === -1) pos = location.href.indexOf('store/');  // fallback for Cloudflare Pages (strips index.html)
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
	UI.toggleLoader(true, "Loading");

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
		loadDiscussions().then(function() {
			showRating();
		});
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
				const editorVersion = ( message.version && message.version.includes('.') ? Utils.convertPluginVersionToNumber(message.version) : 1e8 );
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
				UI.toggleLoader(false);
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
			UI.toggleLoader(false);
			break;
		case 'Updated':
			console.error('------- UPDATED -------');
			updateCount--;
			if (!message.guid) {
				// somethimes we can receive such message
				if (!updateCount) {
					checkNoUpdated(true);
					UI.toggleLoader(false);
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

			if (STORAGE.bPluginCardShown) {
				UI.btnUpdate.classList.add('hidden');
			}

			UI.spanVersion.textContent = String(plugin.version);
			UI.removeUpdateButton(message.guid);

			if (!updateCount) {
				checkNoUpdated(true);
				UI.toggleLoader(false);
			}
			break;
		case 'Removed':
			console.error('------- REMOVED -------');
			if (!message.guid) {
				// somethimes we can receive such message
				UI.toggleLoader(false);
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

			UI.toggleLoader(false);
			break;
		case 'Error':
			console.log('error');
			createError(message.error);
			UI.toggleLoader(false);
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
	return makeRequestWithNoInternetHandler(configUrl, 'GET', null, null)
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
function makeRequestWithNoInternetHandler(url, method, responseType, body) {
	return DataFetcher.makeRequest(url, method, responseType, body)
		.catch(function(err) {
			if (typeof err === 'string' && url.includes('https')) {
				handleNoInternet();
			} else {
				throw err;
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
			languages: [ Utils.getTranslated('English') ]
		};
		return makeRequestWithNoInternetHandler(confUrl, 'GET', null, null)
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
 * @returns {Promise<Array<Rating | null>>}
 */
function loadDiscussions() {
	/** @type {Promise<any>[]} */
	const discussionsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin, i, arr) {
		if (plugin.discussionUrl) {
			const bDesktopRequest = isLocal && window.AscSimpleRequest && window.AscSimpleRequest.createRequest;
			return DataFetcher.getRating(plugin.discussionUrl, bDesktopRequest)
				.then(function(rating) {
					if (!rating) return null;
					plugin.rating = rating;
					return rating;
				}).catch(function(err) {
					if (bDesktopRequest) {
						createError(err.response, false);
					} else {
						createError( new Error('Problem with loading rating'), true);
					}
					return null;
				});
		} else {
			return Promise.resolve(null);
		}
	});

	return Promise.all(discussionsPromises);
};

/** @returns {Promise<any[]>} */
function loadChangelogs() {
	/** @type {Promise<any>[]} */
	const pluginsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin) {
		return DataFetcher.getChangelog(plugin.baseUrl)
			.then(function(changelog) {
				plugin.changelog = changelog;
			}).catch(function() {
				console.error('Failed to load changelog', plugin.name);
			});
	});

	return Promise.all(pluginsPromises);
}

/** @returns {Promise<void[]>} */
function loadAllPluginsLanguages() {
	let url = isLocal ? OOMarketplaceUrl : ioUrl;
	/** @type {Promise<any>[]} */
	const pluginsPromises = allPlugins.map(function(/** @type {PluginInfo} */ plugin, i, arr) {
		return DataFetcher.makeRequest(plugin.baseUrl + 'translations/langs.json', 'GET', null, null)
			.then(function(response) {
					/** @type {Array<string>} */
					let langs = JSON.parse(response);
					langs.forEach(function(full) {
						let short = full.split('-')[0];
						for (let i = 0; i < LANGUAGES.length; i++) {
							// detect only full language (because we can make mistake with some langs. for instance: "pt-PT" and "pt-BR")
							if (LANGUAGES[i][0] == full /*|| LANGUAGES[i][1] == short*/) {
								plugin.languages.push( Utils.getTranslated( LANGUAGES[i][2] ) );
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
		return makeRequestWithNoInternetHandler(pl.obj.baseUrl + 'translations/langs.json', 'GET', null, null).then(
			function(response) {
				let supportedLangs = [ Utils.getTranslated('English') ];
				let arr = JSON.parse(response);
				arr.forEach(function(full) {
					let short = full.split('-')[0];
					for (let i = 0; i < LANGUAGES.length; i++) {
						if (LANGUAGES[i][0] == short || LANGUAGES[i][1] == short) {
							supportedLangs.push( Utils.getTranslated( LANGUAGES[i][2] ) );
						}
					}
				});
				if (supportedLangs.length > 1)
					pl.obj.languages = supportedLangs;
			},
			function(error) {
				pl.obj.languages = [ Utils.getTranslated('English') ];
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
		UI.toggleLoader(false);
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
		setTimeout(function(){if (PsMain) PsMain.update(); UI.toggleLoader(false);});
	} else {
		// if no installed plugins and available plugins button was clicked
		let notification = typeOfOperation === 'filtered' ? 'Nothing was found for this query.' : typeOfOperation === 'all' ? 'Problem with loading plugins.' : 'No installed plugins.';
		createNotification(notification);
		UI.toggleLoader(false);
	}
	// scroll for list of plugins
	if (!PsMain) {
		PsMain = new PerfectScrollbar('.plugins-container', {});
		PsMain.update();
	} else {
		PsMain.update();
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

	pluginPlate.onclick = openPluginCard.bind(pluginPlate, guid);

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
	const minV = (plugin.minVersion ? Utils.convertPluginVersionToNumber(plugin.minVersion) : -1);
	if (minV > editorVersion) {
		bCheckUpdate = false;
		bNotAvailable = true;
	}

	let bHasUpdate = false;
	let bRemoved = (installed && installed.removed);
	if (bCheckUpdate && installed && plugin) {
		const installedV = Utils.convertPluginVersionToNumber(installed.obj.version);
		const lastV = Utils.convertPluginVersionToNumber(plugin.version);
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
	let additional = bNotAvailable ? 'disabled title="' + Utils.getTranslated(MESSAGES.versionWarning) + '"'  : '';
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
		result += 'update" onclick="onClickUpdate(' + guid + ', event)">' + Utils.getTranslated("Update");
	} else if (bNeedRemoveButton) {
		result += 'remove" onclick="onClickRemove(' + guid + ', event)" ' + (bNotAvailable ? 'dataDisabled="disabled"' : "") +'>';
		result += Utils.getTranslated("Remove");
	} else if (bNeedInstallButton) {
		result += 'install" onclick="onClickInstall(\'' + guid + '\', event)" ' + (additional || "") + '>'  + Utils.getTranslated("Install");
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
		result = '<em class="i18n">' + Utils.getTranslated("Not rated") + '</em>';
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
		UI.toggleLoader(true, 'Installation');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(UI.toggleLoader.bind(UI), 200, true, "Installation");
	}
	/** @type {PluginInfo | undefined} */
	let plugin = findPlugin(guid);
	/** @type {InstalledPluginInfo | undefined} */
	let installed = findInstalledPlugin(guid);
	if (!plugin && !installed) {
		// if we are here if means that plugin tab is opened, plugin is uninstalled and we don't have internet connection
		//sendMessage( { type : "showButton", show : false } );
		onClickBack();
		UI.toggleLoader(false);
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
		UI.toggleLoader(true, 'Updating');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(UI.toggleLoader.bind(UI), 200, true, "Updating");
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
		UI.toggleLoader(true, 'Removal');
	} else {
		clearTimeout(timeout);
		timeout = setTimeout(UI.toggleLoader.bind(UI), 200, true, "Removal");
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
	timeout = setTimeout(UI.toggleLoader.bind(UI), 200, true, "Updating");
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

/**
 * @param {string} guid 
 * @returns {Promise<boolean>}
 */
function openPluginCard(guid) {
	//onClickPluginPlate(guid);
	let pluginPlate = UI.getPlugin(guid);
	if (!pluginPlate) {
		console.error('Plugin not found: ' + guid);
		return Promise.resolve(false);
	}
	/** @type {InstalledPluginInfo} */
	let installed = findInstalledPlugin(guid);
	/** @type {PluginInfo} */
	let plugin = findPlugin(guid);
	STORAGE.bPluginCardShown = true;
	STORAGE.selectedPluginGuid = guid;
	let iconUrl = getImageUrl(guid, false, true, 'img_icon');
	let iconBackground = pluginPlate.querySelector('.image').style.background;
	const actionButton = UI.getPluginButton(guid);
	let bHasUpdate = actionButton && actionButton.classList.contains('update');
	/** @type {PluginCardMessage} */
	let message = {
		type : 'showPluginCard',
		guid : guid,
		installed: installed || null,
		plugin: plugin || null,
		iconBackground: iconBackground,
		iconUrl: iconUrl,
		isLocal: isLocal,
		editorVersion: editorVersion,
		bHasUpdate: !!bHasUpdate,
		bActionDisabled: !!(actionButton && actionButton.hasAttribute('disabled')),
		OOMarketplaceUrl: OOMarketplaceUrl,
		OOIO: OOIO
	};
	sendMessage(message);
	return new Promise(function(fResolve, fReject) {
		/**
		 * @param {MessageEvent} event
		 */
		let onLoad = function(event) {
			/** @type {{type: string, version?: string}} */
			let message;
			try {
				message = JSON.parse(event.data);
			} catch (error) {
				fReject(error);
				return;
			}
			if (message.type === 'onShowPluginCard') {
				window.removeEventListener('message', onLoad);
				fResolve(true);
			}
		};
		window.addEventListener('message', onLoad);
	});
	
}

function onClickBack() {
	// click on left arrow in preview mode
	document.querySelectorAll('.dot').forEach(function(el) { el.remove(); });
	document.querySelectorAll('.mySlides').forEach(function(el) { el.remove(); });
	UI.arrowPrev.classList.add('hidden');
	UI.arrowNext.classList.add('hidden');
	document.getElementById('span_overview').click();
	STORAGE.bPluginCardShown = false;
	if(PsMain) PsMain.update();
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
		spanErr.textContent = Utils.getTranslated(err);
		div.appendChild(spanErr);
	}
	let spanNot = document.createElement('span');
	spanNot.className = 'span_notification text-secondary';
	spanNot.textContent = Utils.getTranslated(text);
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
	span.textContent = Utils.getTranslated(message);
	background.appendChild(span);
	divErr.appendChild(background);
	divErr.classList.remove('hidden');
	setTimeout(function() {
		// remove error after 5 seconds
		background.remove();
		divErr.classList.add('hidden');
	}, 5000);
};

window.onresize = function(bForce) {
	if (scale.devicePR !== window.devicePixelRatio || bForce) {
		let html = document.getElementsByTagName('html')[0];
		scale.devicePR = window.devicePixelRatio;
		let revZoom = 1 / scale.devicePR;
		if (scale.devicePR > 2)
			revZoom *= 2;

		if (1 <= scale.devicePR && scale.devicePR <= 2 || isResizeOnStart) {
			// set height for div with image in preview mode
			if (PsMain) PsMain.update();
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
};

/** @returns {Promise<boolean>} */
function getTranslation() {
	// gets translation for current language
	if (shortLang === "en") {
		return Promise.resolve(true);
	}
	let errorMessage = 'Cannot load translations list file.';
	return makeRequestWithNoInternetHandler('./translations/langs.json', 'GET', null, null)
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
			return makeRequestWithNoInternetHandler('./translations/' + name + '.json', 'GET', null, null);
		}).then(function(res) {
			if (!res) {
				return false;
			}
			// console.log('get translation: ' + (Date.now() - start));
			Utils.translate = JSON.parse(res);
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
					Utils.getTranslated(el.getAttribute(attr) || ""),
				);
			}
		});

		const translated = Utils.getTranslated(
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
			UI.toggleLoader(false);
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
		makeRequestWithNoInternetHandler(curIcon, 'GET', 'blob', null).then(
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
	UI.linkNewPlugin.textContent = Utils.getTranslated(MESSAGES[currentValue]);
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
		btn.textContent = Utils.getTranslated('Update');
		btn.classList.add('update');
		btn.classList.remove('install');
		btn.onclick = function(e) {
			onClickUpdate(guid, e);
		};
	} else if (bInstall) {
		btn.textContent = Utils.getTranslated('Remove');
		btn.classList.add('remove');
		btn.classList.remove('install');
		btn.onclick = function(e) {
			onClickRemove(guid, e);
		};
	} else {
		btn.textContent = Utils.getTranslated('Install');
		btn.classList.add('install');
		btn.classList.remove('remove');
		btn.onclick = function(e) {
			onClickInstall(guid, e);
		};
	}

	// We need to keep the ability to install the local version that has been removed (maybe we should change the button)
	if ( !bInstall && btn.hasAttribute('dataDisabled') && !bHasLocal ) {
		btn.setAttribute('title', Utils.getTranslated(MESSAGES.versionWarning));
	}

	if (STORAGE.bPluginCardShown) {
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
	return DataFetcher.makeRequest(url, 'GET', null, null)
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

					let bShowSelected = STORAGE.bPluginCardShown;
					let bShowMarketplace = bShowSelected ? false : ( ( STORAGE.mainFilter === 'marketplace' ) ? true : false );
					if (!allPlugins.length) {
						return fetchAllPlugins();
					} else if (bShowSelected) {
						let div = UI.getSelectedPlugin(STORAGE.selectedPluginGuid);
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

	if ( (bShowMarketplace || !isLocal) && STORAGE.bPluginCardShown) {
		//sendMessage( { type : "showButton", show : false } );
		onClickBack();
	}

	if (!document.getElementsByClassName('div_notification')[0] && (bShowMarketplace || !isLocal)) {
		toggleView(STORAGE.mainFilter, true);
	}
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
