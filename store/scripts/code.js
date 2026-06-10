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

/// <reference path="../../sdkjs-plugins/v1/onlyoffice-types/index.d.ts" /> 
/// <reference path="./types.js" />
/// <reference path="./marketplace-ui.js" />
/// <reference path="./marketplace-storage.js" />
/// <reference path="./utils.js" />
/// <reference path="./data-fetcher.js" />
/// <reference path="./common.js" />
/// <reference path="./marketplace-plugin-service.js" />

const storeVersion = '1.0.9';                                        // version of store (will change it when update something in store)
const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) ); // desktop detecting
const OOMarketplaceUrl = 'https://onlyoffice.github.io/';            // url to official store (for local version store in desktop)
const OOIO = 'https://github.com/ONLYOFFICE/onlyoffice.github.io/';  // url to official github repository (for links and discussions)
const discussionsUrl = OOIO + 'discussions/';                        // discussions url
/** @type {Plugins} */
let founded = [];                                                    // last founded elements (for not to redraw if a result is the same)
let updateCount = 0;                                                 // counter for plugins in updating process
const guidMarketplace = 'asc.{AA2EA9B6-9EC2-415F-9762-634EE8D9A95E}'; // guid marketplace
const guidSettings = 'asc.{8D67F3C5-7736-4BAE-A0F2-8C7127DC4BB8}';   // guid settings plugins
/** @type {number} */
let editorVersion;                                            		 // editor current version
let defaultBG = Utils.themeType == 'light' ? "#F5F5F5" : '#555555';    // default background color for plugin header
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
Utils.init();

// it's necessary for loader (because it detects theme by this object)
window.Asc = {
	plugin : {
		theme : {
			type :  Utils.themeType
		}
	}
};

let pos = location.href.indexOf('store/index.html'); // position for make substring
if (pos === -1 && location.href.slice(-5) !== '.html') { // when marketplace page address without index.html
    pos = location.href.lastIndexOf('/store/');
    if (pos !== -1) {
        pos++;
    }
}
if (pos === -1) pos = location.href.indexOf('store/');  // fallback for Cloudflare Pages (strips index.html)

const ioUrl = location.href.substring(0, pos);         // real IO URL
const configUrl = ( isLocal ? OOMarketplaceUrl : location.href.substring(0, pos) ) + 'store/config.json'; // url to config.json (it's for desktop. we should use remote config)

const Marketplace = {
	/** maximum number of rating requests in flight at once */
	_ratingConcurrency: 4,

	init: function() {
		const self = this;
		DataFetcher.subscribeToTheAppearanceOfALostInternetConnection(function(isOnline) {
			console.log('Internet connection status:', isOnline);
			if (isOnline) {
				self._onInternetConnectionRestored();
			} else {
				self._onInternetConnectionInterrupted();
			}
			
		});
	},

	/**
	 * Load all plugins and their ratings
	 * @returns {Promise<Array<PluginInfo>>}
	 */
	loadAllPluginsAndRating: function() {
		return Marketplace._fetchAllPlugins()
			.catch(function(err) {
				if (!isLocal) {
					createError( new Error('Problem with loading marketplace config.') );
				}
				return [];
			}).then(function(result) {
				const allPlugins = result;
				Marketplace.loadAndShowRating(allPlugins);
				return result;
			});
	},

	
	/**
	 * function for fetching all plugins from config
	 * @returns {Promise<PluginInfo[]>}
	 */
	_fetchAllPlugins: function() {
		const self = this;
		return DataFetcher.makeRequest(configUrl, 'GET', null, null)
			.then(function(/** @type {string} */response) {
				return JSON.parse(response);
			}).then(function(plugins) {
				return self._loadPluginsData(plugins);
			})
	},
	
	/**
	 * @param {string} lang
	 * @param {string} shortLang
	 * @returns {Promise<boolean>}
	 */
	loadAndApplyTranslations: function(lang, shortLang) {
		// gets translation for current language
		if (shortLang === "en") {
			return Promise.resolve(true);
		}
		return new Promise(function(fResolve, fReject) {
			DataFetcher.makeRequestWithWaitConnectionStrategy('./translations/langs.json', 'GET', null, null)
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
					Utils.bTranslate = true;
					DataFetcher.makeRequestWithWaitConnectionStrategy('./translations/' + name + '.json', 'GET', null, null)
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
		}).catch(function() {
			return false;
		});
	},

	/**
	 * The function consumes a lot of resources.ц
	 * @param {Array<PluginInfo>} plugins
	 * @returns {Promise<Array<Rating | null>>}
	 */
	loadAndShowRating: function(plugins) {
		const self = this;
		const bDesktopRequest = isLocal && !!window.AscSimpleRequest && !!window.AscSimpleRequest.createRequest;
		/**
		 * @param {PluginInfo} plugin
		 * @returns {Promise<Rating | null>}
		 */
		function loadOne(plugin) {
			if (!plugin.discussionUrl) return Promise.resolve(null);
			return DataFetcher.getRating(plugin.discussionUrl, bDesktopRequest)
				.then(function(rating) {
					if (!rating) return null;
					plugin.rating = rating;
					self._showRating(plugin);
					return rating;
				}).catch(function(err) {
					if (bDesktopRequest) {
						console.error('Problem with loading rating:', plugin.name);
						createError(err.response, false);
					} else {
						createError(new Error('Problem with loading rating'), true);
					}
					return null;
				});
		}

		/** @type {Array<Rating | null>} */
		const results = new Array(plugins.length);
		let cursor = 0;

		/** @returns {Promise<void>} */
		function next() {
			if (cursor >= plugins.length) return Promise.resolve();
			const idx = cursor++;
			return loadOne(plugins[idx]).then(function(rating) {
				results[idx] = rating;
				return next();
			});
		}

		const workers = [];
		const limit = Math.min(self._ratingConcurrency, plugins.length);
		for (let w = 0; w < limit; w++) {
			workers.push(next());
		}
		return Promise.all(workers).then(function() { return results; });
	},
	/**
	 * @param {PluginInfo} plugin
	 */
	_showRating: function(plugin) {
		if (!plugin.rating) return;
		const pluginPlate = UI.getPlugin(plugin.guid);
		if (!pluginPlate) {
			console.error('Failed to find plugin plate for guid: ' + plugin.guid);
			return;
		}
		const div = pluginPlate.querySelector('.rating');
		if (!div) return;
		div.innerHTML = UI.makeRatingElements(plugin.rating, Utils.getTranslated("Not rated"));
	},
	/**
	 * @param {Array<PluginInfo>} plugins
	 * @returns {Promise<PluginInfo[]>}
	 */
	_loadPluginsData: function(plugins) {
		// get config file for each item in config.json
		/** @type {Array<number>} */
		let Unloaded = [];
		let url = isLocal ? OOMarketplaceUrl : ioUrl;
		
		/** @type {Promise<any>[]} */
		const pluginsPromises = plugins.map(function(/** @type {PluginInfo} */ plugin, i, arr) {
			if (typeof plugin !== 'object') {
				plugin.name = plugin;
			}
			let pluginUrl = plugin.baseUrl;
			let confUrl = plugin.url;
			if (!pluginUrl || !confUrl) {
				pluginUrl = (plugin.name.indexOf(":/\/") == -1) ? url + 'sdkjs-plugins/content/' + plugin.name + '/' : plugin.name;
				confUrl = pluginUrl + 'config.json';
			}

			return DataFetcher.makeRequest(confUrl, 'GET', null, null)
				.then(function(response) {
					/** @type {PluginInfo} */
					let config = JSON.parse(response);
					config.url = confUrl;
					config.baseUrl = pluginUrl;
					arr[i] = config;
					return config;
				})
				.catch(function(err) {
					Unloaded.push(i);
					createError(new Error('Problem with loading plugin config.\nConfig: ' + confUrl));
					return arr[i];
				}).then(/** @param {PluginInfo} config */function(config) {
					if (plugin.discussion) {
						config.discussionUrl = discussionsUrl + plugin.discussion;
					}
					return config;
				});
		});

		return Promise.all(pluginsPromises).then(function(arr) {
			Utils.removeUnloaded(plugins, Unloaded);
			Utils.sortPlugins(plugins, 'name');
			return plugins;
		});
	},

	/** @returns {Promise<number>} */
	getEditorVersion: function() {
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
	},

	_onInternetConnectionInterrupted: function() {
		console.error('Internet connection interrupted');
	},

	_onInternetConnectionRestored: function() {
		if (MarketplaceStorage.allPlugins.length) {
			return;
		}
		Marketplace.loadAllPluginsAndRating()
			.then(function(allPlugins) {
				MarketplaceStorage.allPlugins = allPlugins;
				showListOfPlugins('all');
				updateCategories();
			});
	}

};

const editorVersionPromise = Marketplace.getEditorVersion().then(function(version) {
	editorVersion = version;
});

/** @type {Promise<InstalledPluginInfo[]>} */
const installedPluginsPromise = MarketplacePluginService.getInstalledPlugins(guidMarketplace, guidSettings)
	.catch(function(error) {
		console.error('Failed to load installed plugins:', error);
		return [];
	}).then(function(plugins) {
		Utils.sortPlugins(plugins, 'start');
		MarketplaceStorage.installedPlugins = plugins;
		return plugins;
	});
const translationsPromise = Marketplace.loadAndApplyTranslations(Utils.lang, Utils.shortLang);

/** @type {Promise<PluginInfo[]>} */
let allPluginsPromise = Marketplace.loadAllPluginsAndRating()
	.then(function(plugins) {
		MarketplaceStorage.allPlugins = plugins;
		return plugins;
	});

window.onload = function() {
	UI.init(Utils.themeType);
	UI.toggleLoader(true, "Loading");
	Marketplace.init();

	Promise.all([
		editorVersionPromise,
		translationsPromise,
		installedPluginsPromise,
		allPluginsPromise
	])
	.then(function(result) {
		if (MarketplaceStorage.installedPlugins) {
			if (DataFetcher.isOnline) {
				showListOfPlugins('all');
			} else {
				UI.clickMainFilter("installed");
				if (!isLocal && !DataFetcher.isOnline) {
					UI.divMain.textContent = '';
					setTimeout(function(){if (PsMain) PsMain.update()});
					UI.createNotification(Utils.getTranslated('No Internet Connection.'), Utils.getTranslated('Problem with loading some resources'), true);
				}
				UI.toggleLoader(false);
			}
			UI.pluginsList.classList.remove('transparent');
		}
		updateCategories();
	});

	UI.onChangeMainFilter = function(value) {
		MarketplaceStorage.mainFilter = value;
		UI.inpSearch.value = '';
		founded = [];
		updateCategories();
		showListOfPlugins('filtered');
		
		UI.linkNewPluginText.textContent = Utils.getTranslatedMessage(value);
		if (value === 'marketplace') {
			UI.linkNewPlugin.href = (OOIO + "pulls");
		} else {
			UI.linkNewPlugin.href = "https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/";
		}
		
		if (isLocal && value !== 'marketplace') {
			UI.linkNewPlugin.href = "#";
			UI.linkNewPlugin.onclick = function (e) {
				e.preventDefault();
				installPluginManually();
			}
		} else {
			UI.linkNewPlugin.onclick = null;
		}
	}
	UI.onChangeCategoryFilter = function(category) {
		MarketplaceStorage.categoryFilter = category;
		UI.inpSearch.value = '';
		founded = [];
		showListOfPlugins('filtered');
	}
	UI.onChangeSearchInput = function(query) {
		MarketplaceStorage.searchQuery = query;
		showListOfPlugins('filtered');
	}
};

/**
 * @returns {Promise<InstalledPluginInfo[]>}
 */
function updateInstalledPlugins() {
	return MarketplacePluginService.updateInstalledPlugins().then(function(plugins) {
		MarketplaceStorage.installedPlugins = plugins.filter(function(el) {
			return (el.guid !== guidMarketplace && el.guid !== guidSettings && !( el.removed && el.obj.baseUrl.includes(ioUrl) ));
		});
		Utils.sortPlugins(MarketplaceStorage.installedPlugins, 'start');
		showListOfPlugins('installed'); // need show installed
		return MarketplaceStorage.installedPlugins;
	});
}

window.addEventListener('message', function(message) {
	// getting messages from editor or plugin
	// try to parse message
	try {
		message = JSON.parse(message.data);
	} catch (error) {
		// if we have a problem, don't process this message
		console.error('Failed to parse message', message);
		return;
	}

	/** @type {PluginInfo | undefined} */
	let plugin;
	/** @type {InstalledPluginInfo | undefined} */
	let installed;
	switch (message.type) {
		case 'Installed':
			if (!message.guid) {
				// somethimes we can receive such message
				console.error('No guid in message');
				UI.toggleLoader(false);
				return;
			}
			plugin = MarketplaceStorage.findPlugin(message.guid);
			installed = MarketplaceStorage.findInstalledPlugin(message.guid);
			if (!installed && plugin) {
				MarketplaceStorage.installedPlugins.push(
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
			updateCount--;
			if (!message.guid) {
				// somethimes we can receive such message
				if (updateCount <= 0) {
					UI.toggleLoader(false);
				}
				return;
			}
			installed = MarketplaceStorage.findInstalledPlugin(message.guid);
			plugin = MarketplaceStorage.findPlugin(message.guid);
			if (!plugin || !installed) {
				console.error('Plugin or installed plugin not found');
				break;
			}

			installed.obj.version = plugin.version;
			plugin.bHasUpdate = false;

			if (updateCount <= 0) {
				UI.toggleLoader(false);
			}
			changeAfterInstallUpdateRemove(true, message.guid);
			break;
		case 'Removed':
			if (!message.guid) {
				// somethimes we can receive such message
				UI.toggleLoader(false);
				return;
			}

			let bUpdate = false;
			let bHasLocal = false;
			let needBackup = message.backup;

			plugin = MarketplaceStorage.findPlugin(message.guid);
			installed = MarketplaceStorage.findInstalledPlugin(message.guid);
			
			if (installed) {
				bHasLocal = !installed.obj.baseUrl.includes(ioUrl);
				if (plugin && (!bHasLocal || (isLocal && !needBackup) ) ) {
					MarketplaceStorage.installedPlugins = MarketplaceStorage.installedPlugins.filter(function(el){return el.guid !== message.guid});
					bUpdate = true;
				} else {
					installed.removed = true;

					// need to update the list of installed plugins so that resource links are correct
					if (isLocal)
						updateInstalledPlugins();
				}
			}

			if (bUpdate && MarketplaceStorage.mainFilter === 'installed') {
				if (MarketplaceStorage.searchQuery !== '') {
					showListOfPlugins('filtered');
				} else {
					UI.removePlugin(message.guid);
					PsMain.update();
				}
			}
			changeAfterInstallUpdateRemove(false, message.guid, bHasLocal);		

			UI.toggleLoader(false);
			break;
		case 'Error':
			createError(message.error);
			UI.toggleLoader(false);
			break;
		case 'Theme':
			if (message.theme.type)
				Utils.themeType = message.theme.type;
			let bg = UI.onChangeTheme(message.theme, Utils.themeType, message.style);
			if (bg) {
				defaultBG = bg;
				let bShowMarketplace = MarketplaceStorage.mainFilter === "marketplace";
				/** @type {Plugins} */
				let arrPl = bShowMarketplace ? MarketplaceStorage.allPlugins : MarketplaceStorage.installedPlugins;
				arrPl.forEach(function(pl) {

					let variation = pl.variations ? pl.variations[0] : pl.obj.variations[0];
					let imgSrc = null;
					if (variation.store) {
						if (variation.store.background)
							bg = variation.store.background[Utils.themeType]
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
	};
}, false);

function updateCategories() {
	MarketplaceStorage.categories = new Map();
	MarketplaceStorage.categories.set('all', 0);
	MarketplaceStorage.categories.set('onlyoffice', 0);
	/** @param {PluginInfo} plugin */
	const addCategoryToStorage = function(plugin) {
		let num = Number(MarketplaceStorage.categories.get('all'));
		MarketplaceStorage.categories.set('all', num + 1);
		if (!plugin.variations) {
			return;
		}
		if (!plugin.offered) {
			let category = 'onlyoffice';
			if (MarketplaceStorage.categories.has(category)) {
				let num = Number(MarketplaceStorage.categories.get(category));
				MarketplaceStorage.categories.set(category, num + 1);
			}
		}
		plugin.variations.forEach(function(variation) {
			if (!variation.store || !variation.store.categories) {
				return;
			}
			variation.store.categories.forEach(function(/** @type {string} */category) {
				if (MarketplaceStorage.categories.has(category)) {
					let num = Number(MarketplaceStorage.categories.get(category));
					MarketplaceStorage.categories.set(category, num + 1);
				} else {
					MarketplaceStorage.categories.set(category, 1);
				}
			})
		});
	}
	if (MarketplaceStorage.mainFilter === 'marketplace') {
		MarketplaceStorage.allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
			addCategoryToStorage(plugin);
		});
	} else if (MarketplaceStorage.mainFilter === 'installed') {
		MarketplaceStorage.installedPlugins.forEach(function(/** @type {InstalledPluginInfo} */ plugin) {
			if (!plugin.obj) {
				return;
			}
			addCategoryToStorage(plugin.obj);
		});
	} else {
		MarketplaceStorage.allPlugins.forEach(function(/** @type {PluginInfo} */ plugin) {
			if (!plugin.bHasUpdate) {
				return;
			}
			addCategoryToStorage(plugin);
		});
	}
	let numOfAllPlugins = MarketplaceStorage.allPlugins.length;
	let numOfInstalledPlugins = MarketplaceStorage.installedPlugins.length;
	let numOfPluginsToUpdate = MarketplaceStorage.allPlugins.reduce(function(acc, plugin) {
		return plugin.bHasUpdate ? acc + 1 : acc;
	}, 0);
	UI.updateCategories(MarketplaceStorage.categories);
	UI.updateMainCategories(numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate);
	if (MarketplaceStorage.mainFilter === 'updates' && numOfPluginsToUpdate === 0) {
		UI.clickMainFilter('installed');
	}

	updateToolbar(numOfPluginsToUpdate, MarketplaceStorage.mainFilter);
}

/**
 * @param {number} numOfPluginsToUpdate 
 * @param {MainFilter} mainFilter 
 */
function updateToolbar(numOfPluginsToUpdate, mainFilter) {
	if (!!numOfPluginsToUpdate && mainFilter === 'updates') {
		UI.btnUpdateAll.classList.remove('hidden');
	} else {
		UI.btnUpdateAll.classList.add('hidden');
	}
}

/**
 * @param {'filtered'|'all'|'installed'} typeOfOperation
 * @returns {number}
 */
function showListOfPlugins(typeOfOperation) {
	let arr = MarketplaceStorage.getFilteredPlugins(Utils.getTranslatedName.bind(Utils));
	if (arr.length && Utils.isSamePlugins(founded, arr) && typeOfOperation !== 'all') {
		UI.toggleLoader(false);
		return arr.length;
	}
	founded = arr;
	
	UI.divMain.textContent = '';

	// get list of backup plugins
	if (MarketplaceStorage.mainFilter === 'installed' && isLocal) {
		var _pluginsTmp = JSON.parse(window["AscDesktopEditor"]["GetBackupPlugins"]());

		if (_pluginsTmp.length) {
			var len = _pluginsTmp[0]["pluginsData"].length;
			for (var i = 0; i < len; i++) {
				let plugin = _pluginsTmp[0]["pluginsData"][i];
				plugin.baseUrl = _pluginsTmp[0]["url"] + plugin.guid.replace('asc.', '') + '/';

				const installed = MarketplaceStorage.findInstalledPlugin(plugin.guid);

				if (!installed) {
					MarketplaceStorage.installedPlugins.push({
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
		if (MarketplaceStorage.mainFilter === 'marketplace' && !DataFetcher.isOnline) {
			UI.createNotification(Utils.getTranslated('No Internet Connection.'), Utils.getTranslated('Problem with loading some resources'));
		} else {
			// if no installed plugins and available plugins button was clicked
			let notification = typeOfOperation === 'filtered' ? 'No plugins match your filters.' : typeOfOperation === 'all' ? 'Problem with loading plugins.' : 'No installed plugins.';
			UI.createNotification(Utils.getTranslated('Try a different category or search term.'), Utils.getTranslated(notification));
		}
		
		UI.toggleLoader(false);
	}
	// scroll for list of plugins
	if (!PsMain) {
		// @ts-ignore
		PsMain = new PerfectScrollbar('.plugins-container', {});
		PsMain.update();
	} else {
		PsMain.update();
	}

	return arr.length;
};

/**
 * This function creates div (preview) for plugins
 * @param {InstalledPluginInfo | PluginInfo} pluginOrInstalledPlugin
 */
function createPluginPlate(pluginOrInstalledPlugin) {
	const guid = pluginOrInstalledPlugin.guid;
	const bInstalled = MarketplaceStorage.mainFilter === 'installed';
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
	pluginPlate.style.borderStyle = 'solid';
	pluginPlate.style.borderWidth = ((zoom > 1 ? 1 : zoom)) +'px';

	pluginPlate.onclick = onClickPluginCard.bind(pluginPlate, guid);

	/** @type {InstalledPluginInfo} */
	let installed = bInstalled ? pluginOrInstalledPlugin : MarketplaceStorage.findInstalledPlugin(guid);
	/** @type {PluginInfo} */
	let plugin = bInstalled ? MarketplaceStorage.findPlugin(guid) : pluginOrInstalledPlugin;

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
		}
	}

	let variation = plugin.variations[0];
	let name = Utils.getTranslatedName(plugin);
	let description = Utils.getTranslatedDescription(variation);
	let bg = variation.store && variation.store.background ? variation.store.background[Utils.themeType] : defaultBG;
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
				(!plugin.offered ? '<span class="by-onlyoffice">✓</span>' : '') +
			'</div>' +
			'<div class="manufacturer">' + offered + '</div>' +
		'</div>' +
		'</div>' +

		'<div class="description">' + description + '</div>' +
		'<div class="management">' +
			'<div class="rating">' +
				(UI.makeRatingElements(plugin.rating, Utils.getTranslated("Not rated"))) +
			'</div>' +
			UI.makeActionButtons(guid, bNeedUpdateButton, bNeedRemoveButton, bNeedInstallButton, bNotAvailable) +
		'</div>' +
	'</div>';
	pluginPlate.innerHTML = template;
	UI.addPlugin(guid, pluginPlate);
	if (PsMain) PsMain.update();
};


/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickInstall(guid, event) {
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Installation');
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findPlugin(guid);
	/** @type {InstalledPluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(guid);
	if (!plugin && !installed) {
		// if we are here if means that plugin is uninstalled and we don't have internet connection
		UI.toggleLoader(false);
	}
	const url = (installed ? installed.obj.baseUrl : plugin.url);
	const config = (installed ? installed.obj : plugin);
	return Utils.waitForRepaint().then(function() { return MarketplacePluginService.doInstall(url, guid, config) });
}

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickUpdate(guid, event) {
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Updating');
	let plugin = MarketplaceStorage.findPlugin(guid);
	if (!plugin) {
		console.error('Plugin not found for update: ' + guid);
		UI.toggleLoader(false);
		return;
	}
	return Utils.waitForRepaint().then(function() { return MarketplacePluginService.doUpdate(guid, plugin) });
}

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickRemove(guid, event) {
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Removal');
	// check installed plugin:
	// if the plugin exists in the store (and its version <= ?), we can delete it, user will be able to install the current version
	// if the plugin is not in the store, we need to keep it for the user with the ability to restore
	const needBackup = isLocal ? MarketplaceStorage.findPlugin(guid) == undefined : false;
	return Utils.waitForRepaint().then(function() { return MarketplacePluginService.doRemove(guid, needBackup) });
}

function onClickUpdateAll() {
	UI.toggleLoader(true, 'Updating');
	UI.btnUpdateAll.classList.add('hidden');
	let arr = MarketplaceStorage.allPlugins.filter(function(el) {
		return el.bHasUpdate;
	});
	updateCount = arr.length;
	return Utils.waitForRepaint().then(function() { MarketplacePluginService.doUpdateAll(arr) });
}

/**
 * @param {string} guid 
 * @returns {Promise<boolean>}
 */
function onClickPluginCard(guid) {
	//onClickPluginPlate(guid);
	let pluginPlate = UI.getPlugin(guid);
	if (!pluginPlate) {
		console.error('Plugin not found: ' + guid);
		return Promise.resolve(false);
	}
	/** @type {InstalledPluginInfo} */
	let installed = MarketplaceStorage.findInstalledPlugin(guid);
	/** @type {PluginInfo} */
	let plugin = MarketplaceStorage.findPlugin(guid);
	MarketplaceStorage.selectedPluginGuid = guid;
	let iconSrc = getImageUrl(guid);
	let iconBackground = pluginPlate.querySelector('.image').style.background;
	const actionButton = UI.getPluginButton(guid);
	let bHasUpdate = actionButton && actionButton.classList.contains('btn_update');
	localStorage.setItem('test', JSON.stringify(Utils.translate));
	let config = plugin ? plugin : installed.obj;
	
	/** @type {PluginCardWindowParams} */
	let message = {
		type : 'showPluginCard',
		installed: installed || null,
		plugin: plugin || null,
		iconBackground: iconBackground,
		iconSrc: iconSrc,
		isLocal: isLocal,
		editorVersion: editorVersion,
		bHasUpdate: !!bHasUpdate,
		bActionDisabled: !!(actionButton && actionButton.hasAttribute('disabled')),
		OOMarketplaceUrl: OOMarketplaceUrl,
		OOIO: OOIO,
		pluginName: Utils.getTranslatedName(config),
		pluginDescription: Utils.getTranslatedDescription(config.variations[0]),
		translate: Utils.translate
	};
	return MarketplacePluginService.openPluginCard(message);
}

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
		let borderWidth = (revZoom > 1 ? 1 : revZoom);
		const pluginPlates = document.querySelectorAll('.plugin-plate');
		for (let i = 0; i < pluginPlates.length; i++) {
			/** @type {HTMLElement} */
			const element = pluginPlates[i];
			element.style.borderWidth = borderWidth + 'px';
		}
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

	/** @type {PluginInfo | undefined} */
	let plugin;
	/** @type {InstalledPluginInfo | undefined} */
	let installedPlugin = MarketplaceStorage.findInstalledPlugin(guid);
	let baseUrl;
	// We have a problem with "http" and "file" routes.
	// In desktop we have a local installed marketplace. It's why we use local routes only for desktop.
	if (MarketplaceStorage.installedPlugins && isLocal) {
		// it doesn't work when we use icons from other resource (cors problems)
		// it's why we use local icons only for desktop
		if (installedPlugin) {
			plugin = installedPlugin.obj;
			baseUrl = plugin.baseUrl;
		}
	}
	if ((!plugin || !isLocal) && MarketplaceStorage.allPlugins.length) {
		const found = MarketplaceStorage.findPlugin(guid);
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
		const folder = baseUrl + variation.store.icons[Utils.themeType];
		return buildImgAttrs(ICON_SCALES.map(function(s) { return folder + s[1]; }));
	}

	if (variation.icons2) {
		// old scheme: array of theme-tagged objects, each with all scale percents
		return buildImgAttrs(resolveOldThemedIcons(variation.icons2, baseUrl));
	}

	if (variation.icons) {
		if (!Array.isArray(variation.icons)) {
			// new scheme: object { light, dark } with folder paths
			const folder = baseUrl + variation.icons[Utils.themeType];
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
		if (style && Utils.themeType.includes(style)) {
			icon = icons[i];
			break;
		}
	}
	return ICON_SCALES.map(function(s) {
		const entry = icon[s[0]];
		return entry && entry.normal ? baseUrl + entry.normal : '';
	});
}

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
 * @param {boolean} bInstall 
 * @param {string} guid 
 * @param {boolean} [bHasLocal] 
 */
function changeAfterInstallUpdateRemove(bInstall, guid, bHasLocal) {

	let btn = UI.getPluginButton(guid);
	if (!btn) {
		console.error('Button not found for guid: ' + guid);
		return;
	}
	let bHasUpdate = btn.classList.contains('btn_update');

	/*if (bInstall && bHasUpdate) {
		btn.textContent = Utils.getTranslated('Update');
		btn.classList.add('btn_update');
		btn.classList.remove('btn_install');
		btn.classList.remove('btn_remove');
		btn.onclick = function(e) {
			onClickUpdate(guid, e);
		};
	} else */if (bInstall) {
		btn.textContent = Utils.getTranslated('Remove');
		btn.classList.add('btn_remove');
		btn.classList.remove('btn_install');
		btn.classList.remove('btn_update');
		btn.onclick = function(e) {
			onClickRemove(guid, e);
		};
	} else {
		btn.textContent = Utils.getTranslated('Install');
		btn.classList.add('btn_install');
		btn.classList.remove('btn_remove');
		btn.classList.remove('btn_update');
		btn.onclick = function(e) {
			onClickInstall(guid, e);
		};
	}

	// We need to keep the ability to install the local version that has been removed (maybe we should change the button)
	if ( !bInstall && btn.hasAttribute('dataDisabled') && !bHasLocal ) {
		btn.setAttribute('title', Utils.getTranslatedMessage('versionWarning'));
	}

	updateCategories();
};

