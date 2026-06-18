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
/// <reference path="./marketplace-plugin-service.js" />
/// <reference path="./scale.js" />
/// <reference path="./plugin-icons.js" />
/// <reference path="./card/plugin-card.js" />

// #region Constants

const storeVersion = '1.0.9';                                        // version of store (will change it when update something in store)
const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) ); // desktop detecting
const OOMarketplaceUrl = 'https://onlyoffice.github.io/';            // url to official store (for local version store in desktop)
const OOIO = 'https://github.com/ONLYOFFICE/onlyoffice.github.io/';  // url to official github repository (for links and discussions)
const discussionsUrl = OOIO + 'discussions/';                        // discussions url
const guidMarketplace = 'asc.{AA2EA9B6-9EC2-415F-9762-634EE8D9A95E}'; // guid marketplace
const guidSettings = 'asc.{8D67F3C5-7736-4BAE-A0F2-8C7127DC4BB8}';   // guid settings plugins
// #endregion

// #region Mutable state

/** @type {Plugins} */
let founded = [];        // last founded elements (for not to redraw if a result is the same)
let updateCount = 0;     // counter for plugins in updating process
/** @type {number} */
let editorVersion;       // editor current version
/** @type {number} */
let pluginVersion;       // marketplace plugin version
let defaultBG = Utils.themeType == 'light' ? '#F5F5F5' : '#555555'; // default background color for plugin header


// #endregion

// #region Initialization

// it's necessary because we show loader before all (and getting translations too)
Utils.init();

// it's necessary for loader (because it detects theme by this object)
window.Asc = {
	plugin : {
		theme : {
			type : Utils.themeType
		}
	}
};

/**
 * Resolves the base IO URL from the current page href.
 * @returns {string}
 */
function _resolveBaseUrl() {
	let pos = location.href.indexOf('store/index.html');
	if (pos === -1 && location.href.slice(-5) !== '.html') { // when marketplace page address without index.html
		pos = location.href.lastIndexOf('/store/');
		if (pos !== -1) pos++;
	}
	if (pos === -1) pos = location.href.indexOf('store/'); // fallback for Cloudflare Pages (strips index.html)
	return location.href.substring(0, pos);
}

const ioUrl = _resolveBaseUrl();                                                         // real IO URL
const configUrl = ( isLocal ? OOMarketplaceUrl : ioUrl ) + 'store/config.json'; // url to config.json (it's for desktop. we should use remote config)

// #endregion

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
		const self = this;
		return this._fetchAllPlugins()
			.catch(function(err) {
				if (!isLocal) {
					createError( new Error('Problem with loading marketplace config.') );
				}
				return [];
			}).then(function(result) {
				self._loadAndShowRating(result);
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
	_loadAndShowRating: function(plugins) {
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

	/** @returns {Promise<{editorVersion: number, pluginVersion: number}>} */
	getEditorAndPluginVersions: function() {
		return new Promise(function(fResolve) {
			/** @param {MessageEvent} event */
			let onLoad = function(event) {
				/** @type {{type: string, version?: string, pluginVersion?: string}} */
				let message;
				try {
					message = JSON.parse(event.data);
				} catch (error) {
					return;
				}
				if (message.type === 'PluginReady') {
					window.removeEventListener('message', onLoad);
					let pluginVersion = 1000005; // 1.0.5
					if (message.pluginVersion && message.pluginVersion.includes('.')) {
						pluginVersion = Utils.convertPluginVersionToNumber(message.pluginVersion);
					}
					const editorVersion = ( message.version && message.version.includes('.') ? Utils.convertPluginVersionToNumber(message.version) : 1e8 );
					fResolve({
						pluginVersion: pluginVersion,
						editorVersion: editorVersion
					});
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
		this.loadAllPluginsAndRating()
			.then(function(allPlugins) {
				MarketplaceStorage.allPlugins = allPlugins;
				showListOfPlugins('all');
				updateCategories();
			});
	},
	
	/**
	 * @param {number} numOfPluginsToUpdate 
	 * @param {MainFilter} mainFilter 
	 */
	updateToolbar: function(numOfPluginsToUpdate, mainFilter) {
		if (!!numOfPluginsToUpdate && mainFilter === 'updates') {
			UI.toolbarTools.classList.remove('hidden');
		} else {
			UI.toolbarTools.classList.add('hidden');
		}
	}

};

/**
 * Dynamically loads CSS and JS assets needed for the inline plugin card.
 * @returns {Promise<void>}
 */
function loadPluginCardAssets() {
	return new Promise(function(resolve) {
		var loaded = 0;
		var scripts = [
			'vendor/marked/marked.min.js',
			'scripts/card/plugin-card-ui.js',
			'scripts/card/plugin-card.js'
		];

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'resources/css/plugin-card.css';
		document.head.appendChild(link);

		function onScriptLoad() {
			loaded++;
			if (loaded === scripts.length) resolve();
		}

		scripts.forEach(function(src) {
			var s = document.createElement('script');
			s.src = src;
			s.onload = onScriptLoad;
			s.onerror = onScriptLoad;
			document.head.appendChild(s);
		});
	});
}

const versionsPromise = Marketplace.getEditorAndPluginVersions().then(function(versions) {
	editorVersion = versions.editorVersion;
	pluginVersion = versions.pluginVersion;
	if (pluginVersion <= 1000005) {
		UI.makeSidebarToggleButton();
		return loadPluginCardAssets().then(function() { return versions; });
	}
	return versions;
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

function _resetSearchState() {
	UI.inpSearch.value = '';
	MarketplaceStorage.searchQuery = '';
	founded = [];
}

window.onload = function() {
	UI.init(Utils.themeType);
	UI.toggleLoader(true, "Loading");
	Marketplace.init();

	Promise.all([
		versionsPromise,
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
					setTimeout(Scale.updateScroll.bind(Scale));
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
		_resetSearchState();
		showListOfPlugins('filtered');
		updateCategories();
		
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
		_resetSearchState();
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

window.addEventListener('message', function(event) {
    // getting messages from editor or plugin
    // try to parse message
	/** @type {any} */
	let message;
	try {
		message = JSON.parse(event.data);
	} catch (error) {
		// if we have a problem, don't process this message
		console.error('Failed to parse message', event);
		return;
	}

	switch (message.type) {
		case 'Installed':         _onMessageInstalled(message); break;
		case 'Updated':           _onMessageUpdated(message);   break;
		case 'Removed':           _onMessageRemoved(message);   break;
		case 'Error':             _onMessageError(message);     break;
		case 'Theme':             _onMessageTheme(message);     break;
		case 'onExternalMouseUp': _onMessageMouseUp();          break;
		case 'onClickBack':       hidePluginCard();             break;
	}
}, false);

/** @param {any} message */
function _onMessageInstalled(message) {
	if (!message.guid) {
		// somethimes we can receive such message
		console.error('No guid in message');
		UI.toggleLoader(false);
		return;
	}
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findPlugin(message.guid);
	/** @type {InstalledPluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(message.guid);
	if (!installed && plugin) {
		MarketplaceStorage.installedPlugins.push({
			baseUrl: plugin.url,
			guid: message.guid,
			canRemoved: true,
			obj: plugin,
			removed: false
		});
	} else if (installed) {
		if (installed.obj.backup) {
			// need to update the list of installed plugins so that resource links are correct
			updateInstalledPlugins();
		} else {
			installed.removed = false;
		}
	}
	changeAfterInstallUpdateRemove(true, message.guid);
	UI.toggleLoader(false);
}
/** @param {any} message */
function _onMessageUpdated(message) {
	updateCount--;
	if (!message.guid) {
		// somethimes we can receive such message
		if (updateCount <= 0) {
			UI.toggleLoader(false);
		}
		return;
	}
	/** @type {InstalledPluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(message.guid);
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findPlugin(message.guid);
	if (!plugin || !installed) {
		console.error('Plugin or installed plugin not found');
		return;
	}
	installed.obj.version = plugin.version;
	plugin.bHasUpdate = false;
	installed.obj.bHasUpdate = false;
	if (updateCount <= 0) {
		UI.toggleLoader(false);
	}
	changeAfterInstallUpdateRemove(true, message.guid);
}
/** @param {any} message */
function _onMessageRemoved(message) {
	if (!message.guid) {
		// somethimes we can receive such message
		UI.toggleLoader(false);
		return;
	}
	let bUpdate = false;
	let bHasLocal = false;
	let needBackup = message.backup;
	
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findPlugin(message.guid);
	/** @type {InstalledPluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(message.guid);
	if (installed) {
		bHasLocal = !installed.obj.baseUrl.includes(ioUrl);
		if (plugin && (!bHasLocal || (isLocal && !needBackup))) {
			MarketplaceStorage.installedPlugins = MarketplaceStorage.installedPlugins.filter(function(el) { return el.guid !== message.guid; });
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
			Scale.updateScroll();
		}
	}
	changeAfterInstallUpdateRemove(false, message.guid, bHasLocal);
	UI.toggleLoader(false);
}
/** @param {any} message */
function _onMessageError(message) {
	createError(message.error);
	UI.toggleLoader(false);
}
/** @param {any} message */
function _onMessageTheme(message) {
	Utils.theme = message.theme;
	if (message.theme.type)
		Utils.themeType = message.theme.type;
	let bg = UI.onChangeTheme(message.theme, Utils.themeType, message.style);
	if (!bg) return;
	defaultBG = bg;
	let bShowMarketplace = MarketplaceStorage.mainFilter === 'marketplace';
	/** @type {Plugins} */
	let arrPl = bShowMarketplace ? MarketplaceStorage.allPlugins : MarketplaceStorage.installedPlugins;
	arrPl.forEach(function(pl) {
		let variation = pl.variations ? pl.variations[0] : pl.obj.variations[0];
		let imgSrc = null;
		if (variation.store) {
			if (variation.store.background)
				bg = variation.store.background[Utils.themeType];
		} else {
			// todo now we have one icon for all theme for plugins in store. change it when we will have different icons for different theme (now it's not necessary). use for all icons 'changeIcons'
			// It's why we should change icons only for plugins with default icon or plugins icon (which don't have 'store' field in config)
			imgSrc = PluginIcons.getImageUrl(pl.guid, isLocal);
		}
		UI.setPluginImage(pl.guid, bg, imgSrc);
	});
	// todo change header background color and change icons for plugin cards and for plugin window
}
function _onMessageMouseUp() {
	if (pluginVersion > 1000005) {
		MarketplacePluginService.closePluginCard();
		return;
	}
	let evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('mouseup', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	document.dispatchEvent(evt);
}

function updateCategories() {
	MarketplaceStorage.updateCategories();
	let numOfAllPlugins = MarketplaceStorage.allPlugins.length;
	let numOfInstalledPlugins = MarketplaceStorage.installedPlugins.length;
	let numOfPluginsToUpdate = MarketplaceStorage.getNumOfPluginsToUpdate();
	UI.updateCategories(MarketplaceStorage.getCategories());
	UI.updateMainCategories(numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate);
	if (MarketplaceStorage.mainFilter === 'updates' && numOfPluginsToUpdate === 0) {
		UI.clickMainFilter('installed');
	}

	Marketplace.updateToolbar(numOfPluginsToUpdate, MarketplaceStorage.mainFilter);
}

function _loadBackupPlugins() {
	var _pluginsTmp = JSON.parse(window["AscDesktopEditor"]["GetBackupPlugins"]());
	if (!_pluginsTmp.length) return;
	var len = _pluginsTmp[0]["pluginsData"].length;
	for (var i = 0; i < len; i++) {
		let plugin = _pluginsTmp[0]["pluginsData"][i];
		plugin.baseUrl = _pluginsTmp[0]["url"] + plugin.guid.replace('asc.', '') + '/';
		if (!MarketplaceStorage.findInstalledPlugin(plugin.guid)) {
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

/**
 * @param {'filtered'|'all'|'installed'} typeOfOperation
 */
function _showEmptyNotification(typeOfOperation) {
	if (MarketplaceStorage.mainFilter === 'marketplace' && !DataFetcher.isOnline) {
		UI.createNotification(Utils.getTranslated('No Internet Connection.'), Utils.getTranslated('Problem with loading some resources'));
	} else {
		// if no installed plugins and available plugins button was clicked
		let notification = typeOfOperation === 'filtered' ? 'No plugins match your filters.' : typeOfOperation === 'all' ? 'Problem with loading plugins.' : 'No installed plugins.';
		UI.createNotification(Utils.getTranslated('Try a different category or search term.'), Utils.getTranslated(notification));
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

	if (MarketplaceStorage.mainFilter === 'installed' && isLocal) {
		_loadBackupPlugins();
	}

	if (arr.length) {
		arr.forEach(function(plugin) {
			if (plugin && plugin.guid)
				createPluginPlate(plugin);
		});
		setTimeout(function() { Scale.updateScroll(); UI.toggleLoader(false); });
	} else {
		_showEmptyNotification(typeOfOperation);
		UI.toggleLoader(false);
		Scale.updateScroll();
	}

	return arr.length;
};

/**
 * Resolves plugin and installed state for a plate.
 * @param {InstalledPluginInfo | PluginInfo} pluginOrInstalledPlugin
 * @returns {{config: PluginInfo, installed: InstalledPluginInfo | undefined, bHasUpdate: boolean, bRemoved: boolean, bNotAvailable: boolean, bNeedUpdateButton: boolean, bNeedRemoveButton: boolean, bNeedInstallButton: boolean}}
 */
function _getPluginPlateState(pluginOrInstalledPlugin) {
	const guid = pluginOrInstalledPlugin.guid;
	const bInstalled = MarketplaceStorage.mainFilter === 'installed';
	/** @type {InstalledPluginInfo | undefined} */
	let installed = bInstalled ? /** @type {InstalledPluginInfo} */(pluginOrInstalledPlugin) : MarketplaceStorage.findInstalledPlugin(guid);
	/** @type {PluginInfo | undefined} */
	let plugin = bInstalled ? MarketplaceStorage.findPlugin(guid) : /** @type {PluginInfo} */(pluginOrInstalledPlugin);
	/** @type {PluginInfo} */
	let config = /** @type {PluginInfo} */(plugin || (installed && installed.obj));

	let bCheckUpdate = true;
	if (!plugin) {
		if (!installed) return /** @type {any} */(null);
		bCheckUpdate = false;
	}

	let bNotAvailable = false;
	const minV = config.minVersion ? Utils.convertPluginVersionToNumber(config.minVersion) : -1;
	if (minV > editorVersion) {
		bCheckUpdate = false;
		bNotAvailable = true;
	}

	let bHasUpdate = false;
	let bRemoved = !!(installed && installed.removed);
	if (bCheckUpdate && installed && plugin) {
		const installedV = Utils.convertPluginVersionToNumber(installed.obj.version || '');
		const lastV = Utils.convertPluginVersionToNumber(plugin.version || '');
		if (lastV > installedV) {
			bHasUpdate = true;
			plugin.bHasUpdate = true;
			installed.obj.bHasUpdate = true;
		}
	}

	return {
		config: config,
		installed: installed,
		bHasUpdate: bHasUpdate,
		bRemoved: bRemoved,
		bNotAvailable: bNotAvailable,
		bNeedUpdateButton: bHasUpdate && !bRemoved,
		bNeedRemoveButton: !!(installed && !bRemoved && installed.canRemoved),
		bNeedInstallButton: !installed || bRemoved
	};
}

/**
 * @param {string} guid
 * @param {PluginInfo} config
 * @param {{bNeedUpdateButton: boolean, bNeedRemoveButton: boolean, bNeedInstallButton: boolean, bNotAvailable: boolean}} flags
 * @returns {string}
 */
function _buildPluginPlateHtml(guid, config, flags) {
	const variation = config.variations[0];
	const name = Utils.getTranslatedName(config);
	const description = Utils.getTranslatedDescription(variation);
	const bg = variation.store && variation.store.background ? variation.store.background[Utils.themeType] : defaultBG;
	const offered = config.offered || 'ONLYOFFICE';
	const imgSrc = PluginIcons.getImageUrl(guid, isLocal);

	return '<div class="introduction">' +
		'<div class="image" style="background: ' + bg + '">' +
			'<img id="img_' + guid + '" class="plugin_icon" data-guid="' + guid + '" src="' + imgSrc.src + '" srcset="' + imgSrc.srcset + '">' +
		'</div>' +
		'<div class="name">' +
			'<div>' +
				'<span>' + name + '</span>' +
				(!config.offered ? '<span class="by-onlyoffice">✓</span>' : '') +
			'</div>' +
			'<div class="manufacturer">' + offered + '</div>' +
		'</div>' +
		'</div>' +
		'<div class="description">' + description + '</div>' +
		'<div class="management">' +
			'<div class="rating">' +
				UI.makeRatingElements(config.rating, Utils.getTranslated('Not rated')) +
			'</div>' +
			UI.makeActionButtons(guid, flags.bNeedUpdateButton, flags.bNeedRemoveButton, flags.bNeedInstallButton, flags.bNotAvailable) +
		'</div>' +
	'</div>';
}

/**
 * This function creates div (preview) for plugins
 * @param {InstalledPluginInfo | PluginInfo} pluginOrInstalledPlugin
 */
function createPluginPlate(pluginOrInstalledPlugin) {
	const guid = pluginOrInstalledPlugin.guid;
	const pluginPlate = document.createElement('div');
	pluginPlate.id = guid;
	pluginPlate.setAttribute('data-guid', guid);
	pluginPlate.className = 'plugin-plate form-control noselect';
	let zoom = 1;
	if (Scale.devicePR < 1)
		zoom = (1 / devicePixelRatio);
	else if (Scale.devicePR > 2)
		zoom = (1 / devicePixelRatio) * 2;
	pluginPlate.style.borderStyle = 'solid';
	pluginPlate.style.borderWidth = (zoom > 1 ? 1 : zoom) + 'px';
	pluginPlate.onclick = onClickPluginPlate.bind(pluginPlate, guid);

	const state = _getPluginPlateState(pluginOrInstalledPlugin);
	pluginPlate.innerHTML = _buildPluginPlateHtml(guid, state.config, state);
	UI.addPlugin(guid, pluginPlate);
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
	UI.toolbarTools.classList.add('hidden');
	let arr = MarketplaceStorage.getPluginsToUpdate();
	updateCount = arr.length;
	return Utils.waitForRepaint().then(function() { MarketplacePluginService.doUpdateAll(arr) });
}

/**
 * @param {string} guid 
 * @returns {Promise<boolean>}
 */
function onClickPluginPlate(guid) {
	let pluginPlate = UI.getPlugin(guid);
	if (!pluginPlate) {
		console.error('Plugin not found: ' + guid);
		return Promise.resolve(false);
	}
	/** @type {InstalledPluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(guid);
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findPlugin(guid);
	MarketplaceStorage.selectedPluginGuid = guid;
	let iconSrc = PluginIcons.getImageUrl(guid, isLocal);
	let iconBackground = pluginPlate.querySelector('.image').style.background;
	const actionButton = UI.getPluginButton(guid);
	let bHasUpdate = actionButton && actionButton.classList.contains('btn_update');
	let config = /** @type {PluginInfo} */(plugin ? plugin : (installed && installed.obj));

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
	if (pluginVersion > 1000005) {
		return MarketplacePluginService.openPluginCard(message);
	}
	showPluginCard(message);
	MarketplacePluginService.showBackButton(true);
	return Promise.resolve(true);
}

/**
 * @param {PluginCardWindowParams} data
 */
function showPluginCard(data) {
	let pluginCardDiv = document.getElementById('plugin_card_panel');
	let marketplaceDiv = document.getElementById('plugins');
	if (pluginCardDiv && marketplaceDiv) {
		pluginCardDiv.classList.remove('hidden');
		marketplaceDiv.classList.add('hidden');
	}

	PluginCard.init(data);
}
function hidePluginCard() {
	let pluginCardDiv = document.getElementById('plugin_card_panel');
	let marketplaceDiv = document.getElementById('plugins');
	if (pluginCardDiv && marketplaceDiv) {
		pluginCardDiv.classList.add('hidden');
		marketplaceDiv.classList.remove('hidden');
	}
	window.onresize = Scale.onResize.bind(Scale, false);
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

	if (bInstall) {
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

