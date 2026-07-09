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

/// <reference path="../../scripts/types.js" />
/// <reference path="../../../sdkjs-plugins/v1/onlyoffice-types/index.d.ts" /> 

(function(window, undefined) {
	const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) );

	// create iframe
	const iframe = document.createElement('iframe');
	const OOMarketplaceUrl = isLocal ? './store/plugin-card.html' : 'https://onlyoffice.github.io/store/plugin-card.html';
	let marketplaceUrl = OOMarketplaceUrl;
	try {
		// for incognito mode
		let developerMarketplaceUrl = localStorage.getItem('DeveloperMarketplaceUrl');
		if (developerMarketplaceUrl && developerMarketplaceUrl.indexOf('/store/') !== -1) {
			const storeIndex = developerMarketplaceUrl.indexOf('/store/');
			marketplaceUrl = developerMarketplaceUrl.substring(0, storeIndex) + '/store/plugin-card.html';
		}
	} catch (err) {
		marketplaceUrl = OOMarketplaceUrl;
	}
	
	window.Asc.plugin.init = function() {
		initPluginCard();
	};

	/** @param {Partial<PluginCardIframeMessage>} message */
	function postMessage(message) {
		if (!iframe || !iframe.contentWindow) {
			return;
		}
		iframe.contentWindow.postMessage(JSON.stringify(message), '*');
	};

	function initPluginCard() {
		document.body.appendChild(iframe);

		// send message that plugin is ready
		const pluginDataPromise =  new Promise(function(fResolve) {
            window.Asc.plugin.attachEvent("onShowPluginCard", fResolve);
            window.Asc.plugin.sendToPlugin("onWindowReady", {});
        });

		let divNoInt = document.getElementById('div_noIternet');
		let style = document.head.lastChild;
		let pageUrl = marketplaceUrl;
		iframe.src = pageUrl + window.location.search;
		iframe.onload = function() {
			pluginDataPromise.then(function(pluginData) {
				if (divNoInt && !divNoInt.classList.contains('hidden')) {
					divNoInt.classList.add('hidden');
				}
				if (style && style instanceof HTMLStyleElement) {
					postMessage( { type: 'Theme', theme: window.Asc.plugin.theme, style : style.innerHTML } );
				}
				postMessage( { type: 'PluginReady', data: pluginData } );
			});
		};
	};

	window.Asc.plugin.button = function() {
		this.executeCommand('close', '');
	};

	window.addEventListener('message', function(message) {
		// getting messages from marketplace
		/** @type {IframeMessage} */
		let data;
		try {
			data = JSON.parse(message.data);
		} catch (error) {
			// if we have a problem, don't process this message
			console.error('Failed to parse message', message);
			return;
		}

		switch (data.type) {
			case 'install':
				new Promise(function(fResolve) {
					window.Asc.plugin.attachEvent("Installed", fResolve);
					window.Asc.plugin.sendToPlugin("onInstall", data);
				}).then(function(result) {
					postMessage({ type: result.type, data: result });
				});
				break;
			case 'remove':
				new Promise(function(fResolve) {
					window.Asc.plugin.attachEvent("Removed", fResolve);
					window.Asc.plugin.sendToPlugin("onRemove", data);
				}).then(function(result) {
					postMessage({ type: result.type, data: result });
				});
				break;
			case 'update':
				new Promise(function(fResolve) {
					window.Asc.plugin.attachEvent("Updated", fResolve);
					window.Asc.plugin.sendToPlugin("onUpdate", data);
				}).then(function(result) {
					postMessage({ type: result.type, data: result });
				});
				break;
			case 'showButton' :
				window.Asc.plugin.executeMethod('ShowButton',['back', true]);
				break;
			case 'close':
				window.Asc.plugin.sendToPlugin("onClose", {});
				break;
			case 'resize':
				if (!data.width || !data.height) {
					return;
				}
				window.Asc.plugin.resizeWindow(data.width, data.height, data.width, data.height, 0, 0);
				break;
		}
		
	}, false);

	window.Asc.plugin.onExternalMouseUp = function() {
		// mouse up event outside the plugin window
		if (iframe && iframe.contentWindow) {
			postMessage( { type: 'onExternalMouseUp' } );
		}
	};

	/** @param {AscTheme} theme */
	window.Asc.plugin.onThemeChanged = function(theme) {
		// theme changed event
		if ( theme.type.indexOf('light') !== -1 ) {
			theme['background-toolbar'] = '#fff';
		}
		window.Asc.plugin.onThemeChangedBase(theme);
		let style = document.head.lastChild;
		if (iframe && iframe.contentWindow && style && style instanceof HTMLStyleElement) {
			postMessage( { type: 'Theme', theme: theme, style : style.innerHTML } );
		}
	};

	window.onresize = function() {
		// zoom for all elements in plugin window
		let zoom = 1;
		if (window.devicePixelRatio < 1)
			zoom = 1 / window.devicePixelRatio;
		
		document.documentElement.style.zoom = String(zoom);
	};

})(window, undefined);
