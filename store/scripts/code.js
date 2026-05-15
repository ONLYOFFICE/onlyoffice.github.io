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
/// <reference path="./common.js" />

const version = '1.0.9';                                             // version of store (will change it when update something in store)
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
let editorVersion;                                            		 // editor current version
let themeType = detectThemeType();                                   // current theme
const lang = detectLanguage();                                       // current language
const shortLang = lang.split('-')[0];                                // short language
let bTranslate = false;                                              // flag translate or not
let defaultBG = themeType == 'light' ? "#F5F5F5" : '#555555';    // default background color for plugin header
let isResizeOnStart = false;                                         // flag for firs resize on start
/** @type {any} */
let PsMain = null;                                                   // scroll for list of plugins
const supportedScaleValues = [1, 1.25, 1.5, 1.75, 2];                // supported scale
let scale = {                                                        // current scale
	percent  : "100%",                                               // current scale in percent
	value    : 1,                                                    // current scale value
	devicePR : 1                                                     // device pixel ratio
};
calculateScale();

// it's necessary because we show loader before all (and getting translations too)
Utils.init(shortLang);

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
const translationsPromise = loadAndApplyTranslations();
/** @type {Promise<PluginInfo[]>} */
let allPluginsPromise = Promise.resolve([]);
console.log('is local: ', isLocal);
if (isLocal) {
	// check internet connection (only for desktop)
	allPluginsPromise = checkInternet()
		.then(function(bOnline) {
			if (bOnline) {
				return fetchAllPlugins();
			}
			return [];
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

	Promise.all([translationsPromise, pluginsPromise]).catch(function(err) {
		console.error('Error loading marketplace: ', err);
	}).finally(function() {
		showMarketplace();
		loadDiscussions().then(function() {
			showRating();
		});
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
				console.error('No guid in message');
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

			changeAfterInstallUpdateRemove(true, message.guid);
			UI.toggleLoader(false);
			break;
		case 'Updated':
			console.error('------- UPDATED -------');
			updateCount--;
			if (!message.guid) {
				// somethimes we can receive such message
				if (updateCount <= 0) {
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

			if (updateCount <= 0) {
				checkNoUpdated(true);
				UI.toggleLoader(false);
			}
			changeAfterInstallUpdateRemove(true, message.guid);
			break;
		case 'Removed':
			console.log('------- REMOVED -------');
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
					changeAfterInstallUpdateRemove(false, message.guid, bHasLocal);
				}
			} else {
				changeAfterInstallUpdateRemove(false, message.guid, bHasLocal);				
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

			let bg = UI.onChangeTheme(message.theme, themeType, message.style);
			if (bg) {
				defaultBG = bg;
				let bShowMarketplace = STORAGE.mainFilter === "marketplace";
				/** @type {Plugins} */
				let arrPl = bShowMarketplace ? allPlugins : installedPlugins;
				arrPl.forEach(function(pl) {

					let variation = pl.variations ? pl.variations[0] : pl.obj.variations[0];
					let imgSrc = null;
					if (variation.store) {
						if (variation.store.background)
							bg = variation.store.background[themeType]
					} else {
						// todo now we have one icon for all theme for plugins in store. change it when we will have different icons for different theme (now it's not necessary). use for all icons 'changeIcons'
						// It's why we should change icons only for plugins with default icon or plugins icon (which don't have 'store' field in config)
						imgSrc = getImageUrl(pl.guid);
					}
					
					UI.setPluginImage(pl.guid, bg, imgSrc);
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
			baseUrl: pluginUrl
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
	let name = getTranslatedName(plugin);
	let description = getTranslatedDescription(variation);
	let bg = variation.store && variation.store.background ? variation.store.background[themeType] : defaultBG;
	let additional = bNotAvailable ? 'disabled title="' + Utils.getTranslated(MESSAGES.versionWarning) + '"'  : '';
	let offered = plugin.offered || "ONLYOFFICE";

	const bNeedUpdateButton = bHasUpdate && !bRemoved;
	const bNeedRemoveButton = installed && !bRemoved && installed.canRemoved;
	const bNeedInstallButton = !installed || bRemoved;
	const imgSrc = getImageUrl(guid);

	let template = '<div class="introduction">' +
		'<div class="image" style="background: ' + bg + '">' +
			'<img id="img_' + guid + '" class="plugin_icon" data-guid="' + guid + '" src="' + imgSrc.src + '" srcset="' + imgSrc.srcset + '">' +
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
		result += 'update" onclick="onClickUpdate(\'' + guid + '\', event)">' + Utils.getTranslated("Update");
	} else if (bNeedRemoveButton) {
		result += 'remove" onclick="onClickRemove(\'' + guid + '\', event)" ' + (bNotAvailable ? 'dataDisabled="disabled"' : "") +'>';
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

/** @param {PluginInfo} plugin */
function getTranslatedName(plugin) {
	if (bTranslate && plugin.nameLocale && ( plugin.nameLocale[lang] || plugin.nameLocale[shortLang] )) {
		return ( plugin.nameLocale[lang] || plugin.nameLocale[shortLang] );
	}
	return plugin.name;
}

/** @param {any} variation */
function getTranslatedDescription(variation) {
	if ( bTranslate && variation.descriptionLocale && ( variation.descriptionLocale[lang] || variation.descriptionLocale[shortLang] ) ) {
		return ( variation.descriptionLocale[lang] || variation.descriptionLocale[shortLang] )
	}
	return variation.description;
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
}

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickInstall(guid, event) {
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Installation');
	return waitForRepaint().then(function() { _doInstall(guid) });
}
/**
 * @param {string} guid 
 */
function _doInstall(guid) {
	/** @type {PluginInfo | undefined} */
	let plugin = findPlugin(guid);
	/** @type {InstalledPluginInfo | undefined} */
	let installed = findInstalledPlugin(guid);
	if (!plugin && !installed) {
		// if we are here if means that plugin is uninstalled and we don't have internet connection
		UI.toggleLoader(false);
	}

	console.log(plugin);
	let message = {
		type : 'install',
		url : (installed ? installed.obj.baseUrl : plugin.url),
		guid : guid,
		config : (installed ? installed.obj : plugin)
	};

	sendMessage(message);
}
/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickUpdate(guid, event) {
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Updating');
	return waitForRepaint().then(function() { _doUpdate(guid) });
}
/**
 * @param {string} guid 
 */
function _doUpdate(guid) {
	let plugin = findPlugin(guid);
	if (!plugin) {
		console.error('Plugin not found for update: ' + guid);
		UI.toggleLoader(false);
		return;
	}
	let message = {
		type : 'update',
		url : plugin.url,
		guid : guid,
		config : plugin
	};

	sendMessage(message);
}

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickRemove(guid, event) {
	console.log(guid, event);
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Removal');
	return waitForRepaint().then(function() { _doRemove(guid) });
}
/**
 * @param {string} guid 
 */
function _doRemove(guid) {
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
	UI.toggleLoader(true, 'Updating');
	return waitForRepaint().then(function() { _doUpdateAll() });
}
function _doUpdateAll() {
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
	let iconSrc = getImageUrl(guid);
	let iconBackground = pluginPlate.querySelector('.image').style.background;
	const actionButton = UI.getPluginButton(guid);
	let bHasUpdate = actionButton && actionButton.classList.contains('update');
	localStorage.setItem('test', JSON.stringify(Utils.translate));
	/** @type {PluginCardMessage} */
	let message = {
		type : 'showPluginCard',
		guid : guid,
		installed: installed || null,
		plugin: plugin || null,
		shortLang: shortLang,
		iconBackground: iconBackground,
		iconSrc: iconSrc,
		themeType: themeType,
		isLocal: isLocal,
		editorVersion: editorVersion,
		bHasUpdate: !!bHasUpdate,
		bActionDisabled: !!(actionButton && actionButton.hasAttribute('disabled')),
		OOMarketplaceUrl: OOMarketplaceUrl,
		OOIO: OOIO,
		pluginName: plugin ? getTranslatedName(plugin) : getTranslatedName(installed.obj),
		pluginDescription: plugin ? getTranslatedDescription(plugin.variations[0]) : getTranslatedDescription(installed.obj.variations[0]),
		translate: Utils.translate
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
			isResizeOnStart = false;
			if (scale.devicePR < 1)
				return;

			calculateScale();
			html.setAttribute('style', '');
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

/** @returns {Promise<boolean>} */
function loadAndApplyTranslations() {
	// gets translation for current language
	if (shortLang === "en") {
		return Promise.resolve(true);
	}
	return new Promise(function(fResolve, fReject) {
		DataFetcher.makeRequestWithRetryStrategy('./translations/langs.json', 'GET', null, null)
			.onSuccess(function(/** @type {string} */response) {
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

				if (!name) {
					fResolve(false);
					return;
				}
				bTranslate = true;
				DataFetcher.makeRequestWithRetryStrategy('./translations/' + name + '.json', 'GET', null, null)
					.onSuccess(function(res) {
						if (!res) {
							return false;
						}
						Utils.setTranslations(JSON.parse(res));
						Utils.translateAll();
						fResolve(true);
					})
					.onFailure(function(err) {
						createError(new Error('Cannot load translation for current language.'));
						fReject(err);
					});
			})
			.onFailure(function(err) {
				createError( new Error('Cannot load translations list file.'));
				fReject(err);
			});
	}).then(function(/** @type {boolean} */res) {
		return res;
	}).catch(function() {
		return false;
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

// supported icon scales: [percent, suffix, descriptor]
const ICON_SCALES = [
	['100%', '/icon.png',       '1x'],
	['125%', '/icon@1.25x.png', '1.25x'],
	['150%', '/icon@1.5x.png',  '1.5x'],
	['175%', '/icon@1.75x.png', '1.75x'],
	['200%', '/icon@2x.png',    '2x'],
];

/**
 * @param {string[]} urls 5 URLs in ICON_SCALES order
 * @returns {{src: string, srcset: string}}
 */
function buildImgAttrs(urls) {
	const parts = [];
	for (let i = 0; i < urls.length; i++) {
		if (urls[i]) parts.push(urls[i] + ' ' + ICON_SCALES[i][2]);
	}
	return { src: urls[0], srcset: parts.join(', ') };
}

/**
 * Returns icon `src` (1x) and `srcset` covering all supported scales for use on <img>.
 * @param {string} guid
 * @returns {{src: string, srcset: string}}
 */
function getImageUrl(guid) {
	const defaults = ICON_SCALES.map(function(s) { return './resources/img/defaults/card' + s[1]; });

	/** @type {any} */
	let plugin;
	let baseUrl;
	// We have a problem with "http" and "file" routes.
	// In desktop we have a local installed marketplace. It's why we use local routes only for desktop.
	if (installedPlugins && isLocal) {
		// it doesn't work when we use icons from other resource (cors problems)
		// it's why we use local icons only for desktop
		const inst = findInstalledPlugin(guid);
		if (inst) {
			plugin = inst.obj;
			baseUrl = plugin.baseUrl;
		}
	}
	if ((!plugin || !isLocal) && allPlugins) {
		const found = findPlugin(guid);
		if (found) {
			plugin = found;
			baseUrl = found.baseUrl;
		}
	}
	// github doesn't allow to use "http" or "file" as the URL for an image
	if (!plugin || !(baseUrl.includes('https://') || isLocal)) {
		return buildImgAttrs(defaults);
	}

	const variation = plugin.variations[0];

	if (variation.store && variation.store.icons) {
		// new scheme: folder per theme + scale suffix
		const folder = baseUrl + variation.store.icons[themeType];
		return buildImgAttrs(ICON_SCALES.map(function(s) { return folder + s[1]; }));
	}

	if (variation.icons2) {
		// old scheme: array of theme-tagged objects, each with all scale percents
		return buildImgAttrs(resolveOldThemedIcons(variation.icons2, baseUrl));
	}

	if (variation.icons) {
		if (!Array.isArray(variation.icons)) {
			// new scheme: object { light, dark } with folder paths
			const folder = baseUrl + variation.icons[themeType];
			return buildImgAttrs(ICON_SCALES.map(function(s) { return folder + s[1]; }));
		}
		if (typeof variation.icons[0] === 'object') {
			// old scheme like icons2
			return buildImgAttrs(resolveOldThemedIcons(variation.icons, baseUrl));
		}
		// old scheme: plain string array [normal, retina]
		const normal = baseUrl + variation.icons[0];
		const retina = baseUrl + (variation.icons[1] || variation.icons[0]);
		// follow legacy threshold: scale.value >= 1.2 → retina
		return buildImgAttrs([normal, retina, retina, retina, retina]);
	}

	return buildImgAttrs(defaults);
};

/**
 * Picks the icon object matching current theme and returns urls for all 5 scales.
 * @param {Array<{style?: string, [scalePercent: string]: any}>} icons
 * @param {string} baseUrl
 * @returns {string[]}
 */
function resolveOldThemedIcons(icons, baseUrl) {
	let icon = icons[0];
	for (let i = 1; i < icons.length; i++) {
		const style = icons[i].style;
		if (style && themeType.includes(style)) {
			icon = icons[i];
			break;
		}
	}
	return ICON_SCALES.map(function(s) {
		const entry = icon[s[0]];
		return entry && entry.normal ? baseUrl + entry.normal : '';
	});
}

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
		plugins = allPlugins.filter(function(plugin) { return plugin.bHasUpdate; });
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
		let name = getTranslatedName(plugin);
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
function changeAfterInstallUpdateRemove(bInstall, guid, bHasLocal) {
	console.warn('change after install or remove');
	let btn = UI.getPluginButton(guid);
	if (!btn) {
		console.error('Button not found for guid: ' + guid);
		return;
	}
	let bHasUpdate = btn.classList.contains('update');

	/*if (bInstall && bHasUpdate) {
		btn.textContent = Utils.getTranslated('Update');
		btn.classList.add('update');
		btn.classList.remove('install');
		btn.classList.remove('remove');
		btn.onclick = function(e) {
			onClickUpdate(guid, e);
		};
	} else */if (bInstall) {
		btn.textContent = Utils.getTranslated('Remove');
		btn.classList.add('remove');
		btn.classList.remove('install');
		btn.classList.remove('update');
		btn.onclick = function(e) {
			onClickRemove(guid, e);
		};
	} else {
		btn.textContent = Utils.getTranslated('Install');
		btn.classList.add('install');
		btn.classList.remove('remove');
		btn.classList.remove('update');
		btn.onclick = function(e) {
			onClickInstall(guid, e);
		};
	}

	// We need to keep the ability to install the local version that has been removed (maybe we should change the button)
	if ( !bInstall && btn.hasAttribute('dataDisabled') && !bHasLocal ) {
		btn.setAttribute('title', Utils.getTranslated(MESSAGES.versionWarning));
	}

	/*if (STORAGE.bPluginCardShown) {
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
	}*/
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
