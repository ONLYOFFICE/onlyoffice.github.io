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
	const isLocal = ( (window.AscDesktopEditor !== undefined) && (window.location.protocol.indexOf('file') !== -1) );
	let interval = null;
	let errTimeout = null;
	let loader = null;
	let loaderTimeout = null;

	// create iframe
	const iframe = document.createElement('iframe');

	let warningWindow = null;
	let developerWindow = null;
	let removeGuid = null;
	let BFrameReady = false;
	let BPluginReady = false;
	let editorVersion = null;
	let marketplaceURl = null;
	const OOMarketplaceUrl = isLocal ? './store/index.html' : 'https://onlyoffice.github.io/store/index.html';
	try {
		// for incognito mode
		marketplaceURl = localStorage.getItem('DeveloperMarketplaceUrl') || OOMarketplaceUrl;
	} catch (err) {
		marketplaceURl = OOMarketplaceUrl;
	}
	
	window.Asc.plugin.init = function() {
		window.Asc.plugin.executeMethod('ShowButton',['developer', true, 'right']);
		// resize window
		window.Asc.plugin.resizeWindow(608, 600, 608, 600, 0, 0);
		if (!isLocal) {
			checkInternet(true);
			loaderTimeout = setTimeout(createLoader, 500);
		} else {
			initPlugin();
		}
	};

	function postMessage(message) {
		iframe.contentWindow.postMessage(JSON.stringify(message), '*');
	};

	function initPlugin() {
		document.body.appendChild(iframe);
		if (marketplaceURl !== OOMarketplaceUrl)
			document.getElementById('notification').classList.remove('hidden');

		// send message that plugin is ready
		window.Asc.plugin.executeMethod('GetVersion', null, function(version) {
			editorVersion = version;
			BPluginReady = true;
			if (BFrameReady)
				postMessage( { type: 'PluginReady', version: editorVersion } );
		});

		let divNoInt = document.getElementById('div_noIternet');
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
	};

	window.Asc.plugin.button = function(id, windowID) {
		if (warningWindow && warningWindow.id == windowID) {
			switch (id) {
				case 0:
					removePlugin(false);
					break;
				case 1:
					removePlugin(true);
					break;
				default:
					postMessage( {type: 'Removed', guid: ''} );
					break;
			}
			window.Asc.plugin.executeMethod('CloseWindow', [windowID]);
		} else if (developerWindow && developerWindow.id == windowID) {
			if (id == 0)
				developerWindow.command('onClickBtn');
			else
				window.Asc.plugin.executeMethod('CloseWindow', [windowID]);
		} else if (id == 'back') {
			window.Asc.plugin.executeMethod('ShowButton',['back', false]);
			if (iframe && iframe.contentWindow)
				postMessage( { type: 'onClickBack' } );
		} else if (id == 'developer') {
			createWindow('developer');
		} else {
			this.executeCommand('close', '');
		}
	};

	window.addEventListener('message', function(message) {
		// getting messages from marketplace
		let data = JSON.parse(message.data);
			
		switch (data.type) {
			case 'getInstalled':
				// this message is used only during plugin initialization, by default plugins from the store are parsed and rendered
				// added updateInstalled flag - in this case we don't load plugins from the store again, we only work with installed ones

				window.Asc.plugin.executeMethod('GetInstalledPlugins', null, function(result) {
					postMessage({ type: 'InstalledPlugins', data: result, updateInstalled: data.updateInstalled } );
				});
				break;
			case 'install':
				window.Asc.plugin.executeMethod('InstallPlugin', [data.config, data.guid], function(result) {
					postMessage(result);
				});
				break;
			case 'remove':
				removeGuid = data.guid;
				if ( Number( editorVersion.split('.').join('') < 740) )
					removePlugin(true);
				else if ( !data.backup )
					removePlugin(data.backup);
				else
					createWindow('warning');
				break;
			case 'update':
				window.Asc.plugin.executeMethod('UpdatePlugin', [data.config, data.guid], function(result) {
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

	function checkInternet(bSetTimeout) {
		try {
			let xhr = new XMLHttpRequest();
			let url = 'https://onlyoffice.github.io/store/translations/langs.json';
			xhr.open('GET', url, true);
			
			xhr.onload = function () {
				if (this.readyState == 4) {
					if (this.status >= 200 && this.status < 300) {
						endInternetChecking(true);
					}
				}
			};

			xhr.onerror = function (err) {
				endInternetChecking(false);
			};

			xhr.send(null);
		} catch (error) {
			endInternetChecking(false);
		}
		if (bSetTimeout) {
			errTimeout = setTimeout(function() {
				// if loading is too long show the error (because sometimes requests can not send error)
				endInternetChecking(false);
			}, 15000);
		}
	};

	function endInternetChecking(isOnline) {
		clearTimeout(errTimeout);
		errTimeout = null;
		destroyLoader();
		if (isOnline) {
			initPlugin();
		} else {
			document.getElementById('div_noIternet').classList.remove('hidden');
			if (!interval) {
				interval = setInterval(function() {
					checkInternet(false);
				}, 5000);
			}
		}
	};

	function createWindow(type) {
		let fileName = type + '.html';
		let description = window.Asc.plugin.tr('Warning');
		let size = [350, 100];
		let buttons = [
			{
				'text': window.Asc.plugin.tr('Yes'),
				'primary': true
			},
			{
				'text': window.Asc.plugin.tr('No'),
				'primary': false
			}
		];
		if (type == 'developer') {
			fileName = 'developer.html';
			description = window.Asc.plugin.tr('Developer Mode');
			size = [500, 150];
			buttons = [
				{
					'text': window.Asc.plugin.tr('Ok'),
					'primary': true
				},
				{
					'text': window.Asc.plugin.tr('Cancel'),
					'primary': false
				}
			];
		}
		let location = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);
		
		let variation = {
			url : location.href.replace(file, fileName),
			description : description,
			isVisual : true,
			isModal : true,
			isViewer: true,
			EditorsSupport : ['word', 'cell', 'slide', 'pdf'],
			size : size,
			buttons : buttons
		};
		
		if (type == 'warning') {
			if (!warningWindow) {
				warningWindow = new window.Asc.PluginWindow();
			}
			warningWindow.show(variation);
		} else {
			if (!developerWindow) {
				developerWindow = new window.Asc.PluginWindow();
				developerWindow.attachEvent('onWindowMessage', function(message) {
					if (message.type == 'SetURL') {
						if (message.url.length) {
							marketplaceURl = message.url;
							localStorage.setItem('DeveloperMarketplaceUrl', marketplaceURl);
							document.getElementById('notification').classList.remove('hidden');
						} else {
							marketplaceURl = OOMarketplaceUrl;
							localStorage.removeItem('DeveloperMarketplaceUrl');
							document.getElementById('notification').classList.add('hidden');
						}
						iframe.src = marketplaceURl + window.location.search;
					}
					window.Asc.plugin.executeMethod('CloseWindow', [developerWindow.id]);
				});
			}
			developerWindow.show(variation);
		}
		
	};

	function removePlugin(backup) {
		if (removeGuid)
			window.Asc.plugin.executeMethod('RemovePlugin', [removeGuid, backup], function(result) {
				postMessage(result);
			});
		
		removeGuid = null;
	};

	window.onresize = function() {
		// zoom for all elements in plugin window
		let zoom = 1;
		if (window.devicePixelRatio < 1)
			zoom = 1 / window.devicePixelRatio;
		
		document.getElementsByTagName('html')[0].style.zoom = zoom;
	};

	function createLoader() {
		$('#loader-container').removeClass( 'hidden' );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], window.Asc.plugin.tr('Checking internet connection...'));
	};

	function destroyLoader() {
		clearTimeout(loaderTimeout);
		loaderTimeout = null;
		$('#loader-container').addClass( 'hidden' )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

})(window, undefined);
