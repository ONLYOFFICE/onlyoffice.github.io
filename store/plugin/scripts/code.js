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

	// create iframe
	const iframe = document.createElement("iframe");
	let BFrameReady = false;
	let BPluginReady = false;

	document.addEventListener("DOMContentLoaded", function() {
		let pageUrl = "https://onlyoffice.github.io/store/index.html";
		iframe.src = pageUrl + window.location.search;
		document.body.appendChild(iframe);
		iframe.onload = function() {
			BFrameReady = true;
			if (BPluginReady)
				postMessage( JSON.stringify( { type: 'PluginReady' } ) );
		};
	});			
	

    window.Asc.plugin.init = function() {
		// resize window
		window.Asc.plugin.resizeWindow(608, 570, 608, 570, 0, 0);
		BPluginReady = true;
		if (BFrameReady)
			postMessage( JSON.stringify( { type: 'PluginReady' } ) );
    };

	function postMessage(message) {
		iframe.contentWindow.postMessage(message, "*");
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
		window.Asc.plugin.onThemeChangedBase(theme);
		let style = document.getElementsByTagName('head')[0].lastChild;
		if (iframe && iframe.contentWindow)
			postMessage( JSON.stringify( { type: 'Theme', theme: theme, style : style.innerHTML } ) );
	};

})(window, undefined);
