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

/// <reference path="../../sdkjs-plugins/v1/onlyoffice-types/index.d.ts" /> 
/// <reference path="./types.js" />
/// <reference path="./marketplace/ui.js" />
/// <reference path="./marketplace/storage.js" />
/// <reference path="./shared/utils.js" />
/// <reference path="./shared/data-fetcher.js" />
/// <reference path="./marketplace/service.js" />
/// <reference path="./marketplace/scale.js" />
/// <reference path="./marketplace/plugin-icons.js" />
/// <reference path="./card/plugin-card.js" />

// #region Constants

const storeVersion = '1.0.9';                                        // version of store (will change it when update something in store)
const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) ); // desktop detecting
const OOMarketplaceUrl = 'https://onlyoffice.github.io/';            // url to official store (for local version store in desktop)
const OOIO = 'https://github.com/ONLYOFFICE/onlyoffice.github.io/';  // url to official github repository (for links and discussions)
const discussionsUrl = OOIO + 'discussions/';                        // discussions url
const guidMarketplace = 'asc.{AA2EA9B6-9EC2-415F-9762-634EE8D9A95E}'; // guid marketplace
const guidSettings = 'asc.{8D67F3C5-7736-4BAE-A0F2-8C7127DC4BB8}';   // guid settings plugins
const independentMode = window.parent === window;                    // when opening the marketplace in a browser tab
const releaseUrl = 'https://github.com/ONLYOFFICE/onlyoffice.github.io/releases/latest/download/'; // to download plugins
// #endregion

// #region Mutable state

/** @type {Array<PluginInfo>} */
let founded = [];        // last founded elements (for not to redraw if a result is the same)
let updateCount = 0;     // counter for plugins in updating process
/** @type {number} */
let editorVersion;       // editor current version
/** @type {number} */
let pluginVersion;       // marketplace plugin version
let defaultBG = Utils.themeType == 'light' ? '#F5F5F5' : '#555555'; // default background color for plugin header

let isPluginCardHistoryPushed = false;


// #endregion

// #region Initialization

// it's necessary because we show loader before all (and getting translations too)
Utils.init();

// it's necessary for loader (because it detects theme by this object)
window.Asc = /** @type {Asc} */ (/** @type {unknown} */ ({ plugin: { theme: { type: Utils.themeType } } }));



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
	loadMarketplacePluginsAndRating: function() {
		const self = this;
		return this._fetchMarketplacePlugins()
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
	_fetchMarketplacePlugins: function() {
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
						.onSuccess(function(/** @type {string} */res) {
							if (!res) {
								return false;
							}
							Utils.setTranslations(JSON.parse(res));
							Utils.translateAll();
							fResolve(true);
						})
						.onFailure(function(/** @type {Error} */err) {
							createError(new Error('Cannot load translation for current language.'));
							fReject(err);
						});
				})
				.onFailure(function(/** @type {Error} */err) {
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
					UI.showRating(plugin);
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
				// @ts-ignore - i do not know why this condition was added
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
			return plugins;
		});
	},

	/** @returns {Promise<{editorVersion: number, pluginVersion: number, editorType?: EditorType}>} */
	getEditorAndPluginVersions: function() {
		const defaultVersions = {
			editorVersion: 1e8,
			pluginVersion: 1000005
		};
		return new Promise(function(fResolve) {
			let isResolved = false;
			/** @type {any} */
			let timeoutId = undefined;
			/** @param {MessageEvent} event */
			let onLoad = function(event) {
				/** @type {PluginReadyMessage} */
				let message;
				try {
					message = JSON.parse(event.data);
				} catch (error) {
					return;
				}
				if (message.type === 'PluginReady') {
					if (isResolved) {
						return;
					}
					isResolved = true;
					window.removeEventListener('message', onLoad);
					clearTimeout(timeoutId);
					let pluginVersion = 1000005; // 1.0.5
					if (message.pluginVersion && message.pluginVersion.includes('.')) {
						pluginVersion = Utils.convertPluginVersionToNumber(message.pluginVersion);
					}
					const editorVersion = ( message.version && message.version.includes('.') ? Utils.convertPluginVersionToNumber(message.version) : 1e8 );
					const editorType = message.editorType;
					fResolve({
						pluginVersion: pluginVersion,
						editorVersion: editorVersion,
						editorType: editorType
					});
				}
			};
			
			if (independentMode) { // browser tab
				fResolve(defaultVersions);
			} else {
				// This case is impossible, but let it be processed
				timeoutId = setTimeout(function() {
					if (isResolved) {
						return;
					}
					isResolved = true;
					window.removeEventListener('message', onLoad);
					fResolve(defaultVersions);
				}, 5000);
			}
			window.addEventListener('message', onLoad);
		});
	},

	_onInternetConnectionInterrupted: function() {
		console.error('Internet connection interrupted');
	},

	_onInternetConnectionRestored: function() {
		if (MarketplaceStorage.hasAllPlugins()) {
			return;
		}
		this.loadMarketplacePluginsAndRating()
			.then(function(allPlugins) {
				MarketplaceStorage.setMarketplacePlugins(allPlugins);
				updateListOfPlugins(true);
				updateCategories();
			});
	}

};

/**
 * for v1.0.5
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
	if (versions.editorType) {
		MarketplaceStorage.editorType = versions.editorType;
		UI.showFilterByEditorType(MarketplaceStorage.filterByCurrentEditor);
	}
	return versions;
});

/** @type {Promise<AvailablePluginInfo[]>} */
const availablePluginsPromise = MarketplacePluginService.getAvailablePlugins(guidMarketplace, guidSettings)
	.catch(function(error) {
		console.error('Failed to load available plugins:', error);
		return [];
	}).then(function(/** @type {Array<AvailablePluginInfo>} */availablePlugins) {
		const backupPlugins = _loadBackupPlugins();
		backupPlugins.forEach(function(plugin) {
			if (availablePlugins.findIndex(function(el) { return el.guid === plugin.guid; }) === -1) {
				availablePlugins.push(plugin);
			}
		});
		MarketplaceStorage.setAvailablePlugins(availablePlugins);
		return availablePlugins;
	});
const translationsPromise = Marketplace.loadAndApplyTranslations(Utils.lang, Utils.shortLang);

/** @type {Promise<PluginInfo[]>} */
let allPluginsPromise = Marketplace.loadMarketplacePluginsAndRating()
	.then(function(plugins) {
		MarketplaceStorage.setMarketplacePlugins(plugins);
		return plugins;
	});

function _resetSearchState() {
	UI.inpSearch.value = '';
	MarketplaceStorage.searchQuery = '';
	founded = [];
}

window.onload = function() {
	UI.init(Utils.themeType, independentMode);
	UI.toggleLoader(true, "Loading");
	Marketplace.init();
	if (independentMode) {
		setThemeForBrowserTabMode();
	}

	Promise.all([
		versionsPromise,
		translationsPromise,
		availablePluginsPromise,
		allPluginsPromise
	])
	.then(function(result) {
			if (DataFetcher.isOnline) {
				updateListOfPlugins(true);
			} else {
				UI.clickMainFilter("installed");
				if (!isLocal && !DataFetcher.isOnline) {
					UI.divMain.textContent = '';
					setTimeout(Scale.updateScroll.bind(Scale));
					UI.createNotification(Utils.getTranslated('No Internet Connection.'), Utils.getTranslated('Problem with loading some resources'), true);
				}
				UI.toggleLoader(false);
			}
		updateCategories();
	}).catch(function(error) {
		console.error('Failed to load plugins:', error);
		UI.toggleLoader(false);
	}).finally(function() {
		UI.pluginsList.classList.remove('transparent');
	});

	/** @param {CategoryFilter} category */
	UI.onChangeCategoryFilter = function(category) {
		MarketplaceStorage.categoryFilter = category;
		_resetSearchState();
		updateListOfPlugins();

		let numOfPluginsToUpdate = MarketplaceStorage.getNumOfPluginsToUpdate();
		UI.updateToolbar(numOfPluginsToUpdate, category);
	}
	/** @param {string} query */
	UI.onChangeSearchInput = function(query) {
		MarketplaceStorage.searchQuery = query;
		updateListOfPlugins();
	}
	/** @param {boolean} filterByCurrentEditor */
	UI.onChangeCurrentEditor = function(filterByCurrentEditor) {
        MarketplaceStorage.saveFilterCurrentEditorState(filterByCurrentEditor);
		updateListOfPlugins();
		updateCategories();
	};
};

/**
 * @returns {Promise<AvailablePluginInfo[]>}
 */
function updateAvailablePlugins() {
	return MarketplacePluginService.updateAvailablePlugins().then(function(plugins) {
		const availablePlugins = plugins.filter(function(el) {
			return (el.guid !== guidMarketplace && el.guid !== guidSettings && !( el.removed && el.obj.baseUrl.includes(ioUrl) ));
		});
		const backupPlugins = _loadBackupPlugins();
		backupPlugins.forEach(function(plugin) {
			if (availablePlugins.findIndex(function(el) { return el.guid === plugin.guid; }) === -1) {
				availablePlugins.push(plugin);
			}
		});

		MarketplaceStorage.setAvailablePlugins(availablePlugins);
		return availablePlugins;
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
		case 'onClickBack':       _onClickBackToMarketplace();  break;
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
	let plugin = MarketplaceStorage.findMarketplacePlugin(message.guid);
	/** @type {PluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(message.guid);
	/** @type {AvailablePluginInfo | undefined} */
	let available = MarketplaceStorage.findAvailablePlugin(message.guid);
	if (!available && plugin) {
		MarketplaceStorage.addAvailablePlugin({
			baseUrl: plugin.url,
			guid: message.guid,
			canRemoved: true,
			obj: plugin,
			removed: false
		});
	} else if (available) {
		if (!installed) {
			MarketplaceStorage.addInstalledPlugin(plugin || available.obj);
		}
		available.removed = false;
		if (available.obj.backup) {
			// need to update the list of installed plugins so that resource links are correct
			updateAvailablePlugins().then(function() {
				updateListOfPlugins();
			});
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
	/** @type {AvailablePluginInfo | undefined} */
	let available = MarketplaceStorage.findAvailablePlugin(message.guid);
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findPlugin(message.guid);
	if (!plugin || !available) {
		console.error('Plugin or available plugin not found');
		return;
	}
	available.obj.version = plugin.version;
	plugin.bHasUpdate = false;
	available.obj.bHasUpdate = false;
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
	let bHasLocal = false;
	let needBackup = message.backup;
	
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findMarketplacePlugin(message.guid);
	/** @type {AvailablePluginInfo | undefined} */
	let available = MarketplaceStorage.findAvailablePlugin(message.guid);
	if (available) {
		bHasLocal = !available.obj.baseUrl.includes(ioUrl);
		MarketplaceStorage.removeInstalledPlugin(message.guid);
		available.removed = true;
		if (plugin && (!bHasLocal || (isLocal && !needBackup))) {
			// do nothing
		} else if (isLocal) {
			if (needBackup === false) {
				MarketplaceStorage.removePluginEverywhere(message.guid);
			}
		}
	}
	if (isLocal) {
		// need to update the list of installed plugins so that resource links are correct
		updateAvailablePlugins();
	}
	changeAfterInstallUpdateRemove(false, message.guid, bHasLocal);

	updateListOfPlugins();

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
	/** @type {string | false} */
	let bg = UI.onChangeTheme(message.theme, Utils.themeType, message.style);
	if (!bg) return;
	defaultBG = bg;
	let bInstalled = MarketplaceStorage.categoryFilter === 'installed';
	/** @type {Array<PluginInfo>} */
	let arrPl = bInstalled ? MarketplaceStorage.getInstalledPlugins() : MarketplaceStorage.getAllPlugins();
	arrPl.forEach(function(plugin) {
		let variation = plugin.variations && plugin.variations[0];
		let imgSrc = null;
		if (variation && variation.store) {
			if (variation.store.background)
				bg = variation.store.background[Utils.themeType];
		} else {
			// todo now we have one icon for all theme for plugins in store. change it when we will have different icons for different theme (now it's not necessary). use for all icons 'changeIcons'
			// It's why we should change icons only for plugins with default icon or plugins icon (which don't have 'store' field in config)
			imgSrc = PluginIcons.getImageUrl(plugin.guid, isLocal);
		}
		UI.setPluginImage(plugin.guid, String(bg), imgSrc);
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
	let numOfAllPlugins = MarketplaceStorage.getAllPlugins().length;
	let numOfInstalledPlugins = MarketplaceStorage.getNumOfInstalledPlugins();
	let numOfPluginsToUpdate = MarketplaceStorage.getNumOfPluginsToUpdate();
	UI.updateCategories(MarketplaceStorage.getCategories(), numOfAllPlugins, numOfInstalledPlugins, numOfPluginsToUpdate);
	if (MarketplaceStorage.categoryFilter === 'updates' && numOfPluginsToUpdate === 0) {
		UI.clickMainFilter('installed');
	}

	UI.updateToolbar(numOfPluginsToUpdate, MarketplaceStorage.categoryFilter);
}

/** @returns {Array<AvailablePluginInfo>} */
function _loadBackupPlugins() {
	/** @type {Array<AvailablePluginInfo>} */
	const availablePlugins = [];
	if (!isLocal || !window["AscDesktopEditor"]) {
		return availablePlugins;
	}
	let _pluginsTmp = JSON.parse(window["AscDesktopEditor"]["GetBackupPlugins"]());
	if (!_pluginsTmp || !_pluginsTmp.length) return availablePlugins;
	const len = _pluginsTmp[0]["pluginsData"].length;
	for (var i = 0; i < len; i++) {
		let plugin = _pluginsTmp[0]["pluginsData"][i];
		plugin.baseUrl = _pluginsTmp[0]["url"] + plugin.guid.replace('asc.', '') + '/';
		availablePlugins.push({
			"baseUrl": _pluginsTmp[0]["url"],
			"guid": plugin.guid,
			"canRemoved": true,
			"obj": plugin,
			"removed": true
		});

	}
	return availablePlugins;
}

/** @param {boolean} [bDirectLoad] */
function _showEmptyNotification(bDirectLoad) {
	if (MarketplaceStorage.categoryFilter !== 'installed' && !DataFetcher.isOnline) {
		UI.createNotification(Utils.getTranslated('No Internet Connection.'), Utils.getTranslated('Problem with loading some resources'));
	} else if (MarketplaceStorage.categoryFilter === 'updates' && MarketplaceStorage.getNumOfPluginsToUpdate() === 0) {
		UI.createNotification(Utils.getTranslated('No updates available.'), Utils.getTranslated('All your plugins are up to date.'));
	} else if (MarketplaceStorage.categoryFilter === 'installed' && MarketplaceStorage.getNumOfInstalledPlugins() === 0) {
		UI.createNotification(Utils.getTranslated('Try a different category or search term.'), Utils.getTranslated('No installed plugins.'));
	} else {
		let notification = bDirectLoad ? 'Problem with loading plugins.' : 'No plugins match your filters.';
		UI.createNotification(Utils.getTranslated('Try a different category or search term.'), Utils.getTranslated(notification));
	}
}

/**
 * @param {boolean} [bDirectLoad]
 * @returns {number}
 */
function updateListOfPlugins(bDirectLoad) {
	let arr = MarketplaceStorage.getFilteredPlugins(Utils.getTranslatedName.bind(Utils));
	if (arr.length && Utils.isSamePlugins(founded, arr) && !bDirectLoad) {
		UI.toggleLoader(false);
		return arr.length;
	}
	founded = arr;
	UI.divMain.textContent = '';

	if (arr.length) {
		arr.forEach(function(plugin) {
			if (plugin && plugin.guid) {
        		const state = _getPluginPlateState(plugin);
				const pluginPlate = UI.createPluginPlate(plugin.guid, isLocal, defaultBG, state);
				pluginPlate.onclick = function() {
					onClickPluginPlate(plugin.guid);
				};
				UI.addPlugin(plugin.guid, pluginPlate);
			}
				
		});
		setTimeout(function() { Scale.updateScroll(); UI.toggleLoader(false); });
	} else {
		_showEmptyNotification(bDirectLoad);
		UI.toggleLoader(false);
		Scale.updateScroll();
	}

	return arr.length;
};

/**
 * Resolves plugin and installed state for a plate.
 * @param {PluginInfo} pluginOrInstalledPlugin
 * @returns {PluginPlateState}
 */
function _getPluginPlateState(pluginOrInstalledPlugin) {
	const guid = pluginOrInstalledPlugin.guid;
	const bInstalled = MarketplaceStorage.categoryFilter === 'installed';
	/** @type {PluginInfo | undefined} */
	let installed = bInstalled ? /** @type {PluginInfo} */(pluginOrInstalledPlugin) : MarketplaceStorage.findInstalledPlugin(guid);
	let available = MarketplaceStorage.findAvailablePlugin(guid);
	/** @type {PluginInfo | undefined} */
	let plugin = bInstalled ? MarketplaceStorage.findMarketplacePlugin(guid) : /** @type {PluginInfo} */(pluginOrInstalledPlugin);
	/** @type {PluginInfo} */
	let config = /** @type {PluginInfo} */(plugin || (available && available.obj));

	let bCheckUpdate = true;
	if (!plugin) {
		bCheckUpdate = false;
	}

	let bNotAvailable = false;
	const minV = config.minVersion ? Utils.convertPluginVersionToNumber(config.minVersion) : -1;
	if (minV > editorVersion) {
		bCheckUpdate = false;
		bNotAvailable = true;
	}

	let bHasUpdate = false;
	let bRemoved = !!(available && available.removed);
	if (bCheckUpdate && available && plugin) {
		const installedV = Utils.convertPluginVersionToNumber(available.obj.version || '');
		const lastV = Utils.convertPluginVersionToNumber(plugin.version || '');
		if (lastV > installedV) {
			bHasUpdate = true;
			plugin.bHasUpdate = true;
			available.obj.bHasUpdate = true;
		}
	}

	return {
		config: config,
		installed: installed,
		bHasUpdate: bHasUpdate,
		bRemoved: bRemoved,
		bNotAvailable: bNotAvailable,
		bNeedUpdateButton: bHasUpdate && !bRemoved,
		bNeedRemoveButton: !!(installed && !bRemoved && available && available.canRemoved),
		bNeedInstallButton: !installed || bRemoved,
		independentMode: independentMode
	};
}

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickDownload(guid, event) {
	event.stopImmediatePropagation();
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findMarketplacePlugin(guid);
	if (!plugin) {
		// if we are here if means that plugin is uninstalled and we don't have internet connection
		return;
	}
	let baseUrlParts = plugin.baseUrl ? plugin.baseUrl.split('/').filter(Boolean) : [];
	let pluginFileName = baseUrlParts.length ? baseUrlParts[baseUrlParts.length - 1] : '';
	let url = plugin.baseUrl ? releaseUrl + pluginFileName + '.plugin' : '';

	if (url) {
		let link = document.createElement('a');
		link.href = url;
		link.download = '';
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
}

/**
 * @param {string} guid 
 * @param {Event} event 
 */
function onClickInstall(guid, event) {
	event.stopImmediatePropagation();
	UI.toggleLoader(true, 'Installation');
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findMarketplacePlugin(guid);
	/** @type {AvailablePluginInfo | undefined} */
	let available = MarketplaceStorage.findAvailablePlugin(guid);
	if (!plugin && !available) {
		// if we are here if means that plugin is uninstalled and we don't have internet connection
		UI.toggleLoader(false);
	}
	let url = '';
	if (plugin) {
		url = plugin.url;
	} else if (available) {
		url = available.obj.baseUrl;
	}
	const config = plugin ? plugin : available && available.obj;
	return Utils.waitForRepaint()
		.then(function() { return MarketplacePluginService.doInstall(url, guid, config) })
		.then(function(result) {
			if (!result) {
				UI.toggleLoader(false);
			}
			return result;
		});
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
	return Utils.waitForRepaint()
		.then(function() { return MarketplacePluginService.doUpdate(guid, plugin) })
		.then(function(result) {
			if (!result) {
				UI.toggleLoader(false);
			}
			return result;
		});
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
	const needBackup = isLocal ? MarketplaceStorage.findMarketplacePlugin(guid) == undefined : false;
	return Utils.waitForRepaint().then(function() { return MarketplacePluginService.doRemove(guid, needBackup) });
}
function onClickUpdateAll() {
	UI.toggleLoader(true, 'Updating');
	UI.updateToolbar(0, MarketplaceStorage.categoryFilter);
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
	/** @type {PluginInfo | undefined} */
	let installed = MarketplaceStorage.findInstalledPlugin(guid);
	let available = MarketplaceStorage.findAvailablePlugin(guid);
	/** @type {PluginInfo | undefined} */
	let plugin = MarketplaceStorage.findMarketplacePlugin(guid);
	let iconSrc = PluginIcons.getImageUrl(guid, isLocal);
	let iconBackground = 'transparent';
	const image = pluginPlate.querySelector('.image');
	if (image && (image instanceof HTMLElement) && image.style) {
		iconBackground = image.style.background;
	}
	const actionButton = UI.getPluginButton(guid);
	let bHasUpdate = actionButton && actionButton.classList.contains('btn_update');
	let config = /** @type {PluginInfo} */(plugin ? plugin : (available && available.obj));

	/** @type {PluginCardWindowParams} */
	let message = {
		type : 'showPluginCard',
		installed: installed,
		available: available,
		plugin: plugin,
		iconBackground: iconBackground,
		iconSrc: iconSrc,
		isLocal: isLocal,
		editorVersion: editorVersion,
		bHasUpdate: !!bHasUpdate,
		bActionDisabled: !!(actionButton && actionButton.hasAttribute('disabled')),
		OOMarketplaceUrl: OOMarketplaceUrl,
		OOIO: OOIO,
		ioUrl: ioUrl,
		pluginName: Utils.getTranslatedName(config),
		pluginDescription: config.variations ? Utils.getTranslatedDescription(config.variations[0]) : '',
		translate: Utils.translate,
		removed: available ? !!available.removed : false,
		canRemoved: available ? !!available.canRemoved : false,
		independentMode: independentMode,
		releaseUrl: releaseUrl
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

	isPluginCardHistoryPushed = true;
	history.pushState({ pluginCardOpen: true }, '');
}
// for v1.0.5
/** @param {boolean} [blockForwardHistory] - discard the forward history entry left by history.back(), so the user can't navigate forward to reopen the card */
function hidePluginCard(blockForwardHistory) {
	let pluginCardDiv = document.getElementById('plugin_card_panel');
	let marketplaceDiv = document.getElementById('plugins');
	if (pluginCardDiv && marketplaceDiv) {
		pluginCardDiv.classList.add('hidden');
		marketplaceDiv.classList.remove('hidden');
	}
	window.onresize = Scale.onResize.bind(Scale, false);
	if (blockForwardHistory) {
		history.pushState(null, '');
	}
}

function _onClickBackToMarketplace() {
	if (isPluginCardHistoryPushed) {
		// consume the history entry pushed by showPluginCard,
		// the actual hiding is done by the popstate handler
		history.back();
	} else {
		hidePluginCard();
	}
}

window.addEventListener('popstate', function() {
	if (isPluginCardHistoryPushed) {
		isPluginCardHistoryPushed = false;
		hidePluginCard(true);
	}
});

function installPluginManually() {
	if (!window["AscDesktopEditor"]) {
		return;
	}
	window["AscDesktopEditor"]["OpenFilenameDialog"]("plugin", false, function (_file) {
		var file = _file;
		if (Array.isArray(file))
			file = file[0];
		if (!window["AscDesktopEditor"]) {
			return;
		}
		let result = window["AscDesktopEditor"]["PluginInstall"](file);
		if (result) {
			// need to update the list of installed plugins
			updateAvailablePlugins()
				.then(function() {
					updateCategories();
					updateListOfPlugins();
				});
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

function setThemeForBrowserTabMode() {
	// theme data is kept in a separate file and loaded on demand only when the marketplace is opened in an independent browser tab
	if (typeof ThemeDefaultMessage !== 'undefined') {
		_onMessageTheme(ThemeDefaultMessage);
		return;
	}
	var script = document.createElement('script');
	script.src = 'scripts/marketplace/theme-default.js';
	script.onload = function() {
		_onMessageTheme(ThemeDefaultMessage);
	};
	document.head.appendChild(script);
}
