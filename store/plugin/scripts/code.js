/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function(window, undefined) {

	let isOnline = null;
	let isInit = false;
	let interval = null;
	checkInternet();

	// create iframe
	const iframe = document.createElement("iframe");
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
		iframe.contentWindow.postMessage(message, "*");
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
				postMessage( JSON.stringify( { type: 'PluginReady', version: editorVersion } ) );
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
					postMessage( JSON.stringify( { type: 'Theme', theme: window.Asc.plugin.theme, style : style.innerHTML } ) );
					postMessage( JSON.stringify( { type: 'PluginReady', version: editorVersion } ) );
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

    window.Asc.plugin.button = function(id) {
		if (id == 'back') {
			window.Asc.plugin.executeMethod('ShowButton',['back', false]);
			if (iframe && iframe.contentWindow)
				postMessage( JSON.stringify( { type: 'onClickBack' } ) );
		} else {
			this.executeCommand("close", "");
		}
    };

	window.addEventListener("message", function(message) {
		// getting messages from marketplace
		let data = JSON.parse(message.data);
			
		switch (data.type) {
			case 'getInstalled':
				window.Asc.plugin.executeMethod("GetInstalledPlugins", null, function(result) {
					postMessage( JSON.stringify( { type: 'InstalledPlugins', data: result } ) );
				});
				break;
			case 'install':
				window.Asc.plugin.executeMethod("InstallPlugin", [data.config, data.guid], function(result) {
					postMessage( JSON.stringify(result) );
				});
				break;
			case 'remove':
				window.Asc.plugin.executeMethod("RemovePlugin", [data.guid], function(result) {
					postMessage( JSON.stringify(result) );
				});
				break;
			case 'update':
				window.Asc.plugin.executeMethod("UpdatePlugin", [data.config, data.guid], function(result) {
					postMessage( JSON.stringify(result) );
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
			postMessage( JSON.stringify( { type: 'onExternalMouseUp' } ) );
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
			postMessage( JSON.stringify( { type: 'Theme', theme: theme, style : style.innerHTML } ) );
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

})(window, undefined);
