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
/// <reference path="./utils.js" />

const MarketplacePluginService = {
    /**
     * @param {string} guid 
     * @param {PluginInfo} config 
     */
    close: function(guid, config) {
        /** @type {IframeMessage} */
        let message = {
            type : 'close',
            guid : guid,
            config : config
        };

        this._sendMessage(message);
    },
    /**
     * @param {string} url
     * @param {string} guid
     * @param {PluginInfo} [config]
     * @returns {Promise<{guid?: string} | undefined>}
     */
    doInstall: function(url, guid, config) {
        const self = this;
        let message = {
            type : 'install',
            url : url,
            guid : guid,
            config : config
        };
		return new Promise(function(fResolve) {
			/**
			 * @param {MessageEvent} event
			 */
			let onInstall = function(event) {
				/** @type {{type: string, data: {guid?: string}}} */
				let message;
				try {
					message = JSON.parse(event.data);
				} catch (error) {
					return;
				}
				if (message.type === 'Installed') {
					window.removeEventListener('message', onInstall);
					fResolve(message.data);
				}
			};
			window.addEventListener('message', onInstall);
			self._sendMessage(message);
        });
    },
    /**
     * @param {string} guid
     * @param {boolean} needBackup
     * @returns {Promise<{guid?: string} | undefined>}
     */
    doRemove: function(guid, needBackup) {
        const self = this;
        let message = {
            type : 'remove',
            guid : guid,
            backup : needBackup
        };
		return new Promise(function(fResolve) {
			/** @param {MessageEvent} event */
			let onRemove = function(event) {
				/** @type {{type: string, data: {guid?: string}}} */
				let message;
				try {
					message = JSON.parse(event.data);
				} catch (error) {
					return;
				}
				if (message.type === 'Removed') {
					window.removeEventListener('message', onRemove);
					fResolve(message.data);
				}
			};
			window.addEventListener('message', onRemove);
			self._sendMessage(message);
        });
    },
    /**
     * @param {string} guid
     * @param {PluginInfo} plugin
     * @returns {Promise<{guid?: string} | undefined>}
     */
    doUpdate: function(guid, plugin) {
        const self = this;
        let message = {
            type : 'update',
            url : plugin.url,
            guid : guid,
            config : plugin
        };
		return new Promise(function(fResolve) {
			/** @param {MessageEvent} event */
			let onUpdate = function(event) {
				/** @type {{type: string, data: {guid?: string}}} */
				let message;
				try {
					message = JSON.parse(event.data);
				} catch (error) {
					return;
				}
				if (message.type === 'Updated') {
					window.removeEventListener('message', onUpdate);
					fResolve(message.data);
				}
			};
			window.addEventListener('message', onUpdate);
			self._sendMessage(message);
        });
    },
    /**
     * @param {Array<PluginInfo>} plugins 
     * @returns {Promise<Array<{guid?: string} | undefined>>}
     */
    doUpdateAll: function(plugins) {
        const self = this;
        /** @type {Promise<{guid?: string} | undefined>[]} */
        const promises = [];
        plugins.forEach(function(plugin) {
            promises.push(self.doUpdate(plugin.guid, plugin));
        });
        return Promise.all(promises);
    },
	/**
	 * Get all installed plugins
     * @param {string} guidMarketplace - GUID of the marketplace plugin
     * @param {string} guidSettings - GUID of the settings plugin
	 * @returns {Promise<InstalledPluginInfo[]>}
	 */
	getInstalledPlugins: function(guidMarketplace, guidSettings) {
        const self = this;
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
					} 
					fResolve(plugins);
				}
			};
			window.addEventListener('message', onGetInstalled);
			self._sendMessage({type: 'getInstalled'});
		});
	},
    /**
     * @param {PluginCardWindowParams} params 
     * @returns {Promise<boolean>}
     */
    openPluginCard: function(params) {
        this._sendMessage(params);
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
        
    },
    showBackButton: function() {
        this._sendMessage({ type: "showButton", show: true });
    },
    /**
     * @returns {Promise<InstalledPluginInfo[]>}
     */
    updateInstalledPlugins: function() {
        const self = this;
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
                    if (message.data) {
                        fResolve(message.data);
                    } else {
                        fResolve([]);
                    }
                }	
            };
            window.addEventListener('message', onGetInstalled);
            self._sendMessage({type: 'getInstalled', updateInstalled: true});
        });
    },

    /**
     * @param {Object} message
     * @private
     */
    _sendMessage: function(message) {
        // this function sends message to editor
        parent.postMessage(JSON.stringify(message), '*');
    }

};