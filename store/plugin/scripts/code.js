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
(function(window, undefined) {

	let isOnline = null;
	let isInit = false;
	let interval = null;
	checkInternet();
	// create iframe
	const iframe = document.createElement("iframe");
	let modalWindow = null;
	let removeGuid = null;
	let BFrameReady = false;
	let BPluginReady = false;
	let editorVersion = null;
	let marketplaceURl = null;
	const OOMarketplaceUrl = 'https://onlyoffice.github.io/store/index.html';
	try {
		// for incognito mode
		marketplaceURl = localStorage.getItem('DeveloperMarketplaceUrl') || OOMarketplaceUrl;
	} catch (err) {
		marketplaceURl = OOMarketplaceUrl;
	}
	
	window.Asc.plugin.init = function() {
		isInit = true;
		if (typeof isOnline === 'boolean') {
			initPlugin();
		}
	};

	function postMessage(message) {
		iframe.contentWindow.postMessage(JSON.stringify(message), "*");
	};

	function initPlugin() {
		document.body.appendChild(iframe);
		// resize window
		if (marketplaceURl !== OOMarketplaceUrl)
			document.getElementById('notification').classList.remove('hidden');

		window.Asc.plugin.resizeWindow(608, 570, 608, 570, 0, 0);
		window.Asc.plugin.executeMethod("GetVersion", null, function(version) {
			editorVersion = version;
			BPluginReady = true;
			if (BFrameReady)
				postMessage( { type: 'PluginReady', version: editorVersion } );
		});

		let divNoInt = document.getElementById('div_noIternet');
		// send message that plugin is ready
		if (isOnline) {
			let style = document.getElementsByTagName('head')[0].lastChild;
			let pageUrl = marketplaceURl;
			iframe.src = pageUrl + window.location.search;
			iframe.onload = function() {
				BFrameReady = true;
				if (BPluginReady) {
					if (!divNoInt.classList.contains('hidden')) {
						divNoInt.classList.add('hidden');
						clearInterval(interval);
						interval = null;
					}
					postMessage( { type: 'Theme', theme: window.Asc.plugin.theme, style : style.innerHTML } );
					postMessage( { type: 'PluginReady', version: editorVersion } );
				}
			};
		} else {
			divNoInt.classList.remove('hidden');
			if (!interval) {
				interval = setInterval(function() {
					checkInternet();
				}, 5000);
			}
		}
	};

	window.Asc.plugin.button = function(id, windowID) {
		if (modalWindow && windowID) {
			switch (id) {
				case 0:
					removePlugin(true);
					break;
				case 1:
					removePlugin(false);
					break;
				default:
					postMessage( {type: 'Removed', guid: ''} );
					break;
			}
			window.Asc.plugin.executeMethod('CloseWindow', [windowID]);
		} else if (id == 'back') {
			window.Asc.plugin.executeMethod('ShowButton',['back', false]);
			if (iframe && iframe.contentWindow)
				postMessage( { type: 'onClickBack' } );
		} else {
			this.executeCommand('close', '');
		}
	};

	window.addEventListener("message", function(message) {
		// getting messages from marketplace
		let data = JSON.parse(message.data);
			
		switch (data.type) {
			case 'getInstalled':
				window.Asc.plugin.executeMethod("GetInstalledPlugins", null, function(result) {
					postMessage( { type: 'InstalledPlugins', data: result } );
				});
				break;
			case 'install':
				window.Asc.plugin.executeMethod("InstallPlugin", [data.config, data.guid], function(result) {
					postMessage(result);
				});
				break;
			case 'remove':
				removeGuid = data.guid;
				if (window.AscDesktopEditor === undefined)
					removePlugin(false);
				else
					createWindow();
				break;
			case 'update':
				window.Asc.plugin.executeMethod("UpdatePlugin", [data.config, data.guid], function(result) {
					postMessage(result);
				});
				break;
			case 'showButton' :
				window.Asc.plugin.executeMethod('ShowButton',['back', true]);
				break;
		}
		
	}, false);

	window.Asc.plugin.onExternalMouseUp = function() {
		// mouse up event outside the plugin window
		if (iframe && iframe.contentWindow) {
			postMessage( { type: 'onExternalMouseUp' } );
		}
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		// theme changed event
		if ( theme.type.indexOf('light') !== -1 ) {
			theme['background-toolbar'] = '#fff';
		}
		window.Asc.plugin.onThemeChangedBase(theme);
		let style = document.getElementsByTagName('head')[0].lastChild;
		if (iframe && iframe.contentWindow)
			postMessage( { type: 'Theme', theme: theme, style : style.innerHTML } );
	};

	window.Asc.plugin.onTranslate = function() {
		let label = document.getElementById('lb_notification');
		if (label)
			label.innerHTML = window.Asc.plugin.tr(label.innerHTML);
		
		label = document.getElementById('lb_noInternet');
		if (label)
			label.innerHTML = window.Asc.plugin.tr(label.innerHTML);
	};

	function checkInternet() {
		try {
			let xhr = new XMLHttpRequest();
			let url = 'https://raw.githubusercontent.com/ONLYOFFICE/onlyoffice.github.io/master/store/translations/langs.json';
			xhr.open('GET', url, true);
			
			xhr.onload = function () {
				if (this.readyState == 4) {
					if (this.status >= 200 && this.status < 300) {
						isOnline = true;
						if (isInit)
							initPlugin();
					}
				}
			};

			xhr.onerror = function (err) {
				isOnline = false;
				if (isInit)
					initPlugin();
			};

			xhr.send(null);
		} catch (error) {
			isOnline = false;
			if (isInit)
				initPlugin();
		}
	};

	function createWindow() {
		let location  = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);
		
		let variation = {
			url : location.href.replace(file, 'modal.html'),
			description : window.Asc.plugin.tr('Warning'),
			isVisual : true,
			isModal : true,
			EditorsSupport : ['word', 'cell', 'slide'],
			size : [350, 100],
			buttons : [
				{
					'text': window.Asc.plugin.tr('Yes'),
					'primary': true
				},
				{
					'text': window.Asc.plugin.tr('No'),
					'primary': false
				}
			]
		};
		
		if (!modalWindow) {
			modalWindow = new window.Asc.PluginWindow();
			modalWindow.attachEvent('onWindowMessage', function(data){
				let oConfig = data.config;
				window.Asc.plugin.executeMethod('ConvertDocument', [oConfig.convertType, oConfig.htmlHeadings, oConfig.base64img, oConfig.demoteHeadings, oConfig.renderHTMLTags], function(sOutput) {
					modalWindow.command('onConverted', sOutput);
				});
			});
		}
		modalWindow.show(variation);
	};

	function removePlugin(bCompletely) {
		if (removeGuid)
			window.Asc.plugin.executeMethod('RemovePlugin', [removeGuid, bCompletely], function(result) {
				postMessage(result);
			});
		
		removeGuid = null;
	};

})(window, undefined);
