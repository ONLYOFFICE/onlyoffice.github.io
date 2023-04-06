/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function(window, undefined){
	let modalWindow = null;

	window.Asc.plugin.init = function(){};
	
	function createWindow() {
		let location  = window.location;
		let start = location.pathname.lastIndexOf('/') + 1;
		let file = location.pathname.substring(start);
		
		// default settings for modal window
		let variation = {
			url : location.href.replace(file, 'index.html'),
			description : window.Asc.plugin.tr('Document to Markdown'),
			isVisual : true,
			isModal : true,
			EditorsSupport : ["word"],
			buttons : [],
			size : [600, 600]
		};
		
		if (!modalWindow) {
			modalWindow = new window.Asc.PluginWindow();
			modalWindow.attachEvent("onWindowMessage", function(data){
				let oConfig = data.config;
				window.Asc.plugin.executeMethod('ConvertDocument', [oConfig.convertType, oConfig.htmlHeadings, oConfig.base64img, oConfig.demoteHeadings, oConfig.renderHTMLTags], function(sOutput) {
					modalWindow.command('onConverted', sOutput);
				});
			});
		}
		modalWindow.show(variation);
	};

	window.Asc.plugin.button = function(id, windowId) {
		if (!modalWindow)
			return;

		if (windowId) {
			switch (id) {
				case -1:
				default:
					// if we use close, it is unregister this window and we won't be able to receive messages from this window
					// window.Asc.plugin.init();
					// settingsWindow.close();
					// settingsWindow = null;
					window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
			}
		}
		// this.executeCommand("close", "");
	};

	function getMessage(key) {
		return window.Asc.plugin.tr(key.trim());
	};

	function getContextMenuItems() {
		let settings = {
			guid: window.Asc.plugin.guid,
			items: [
				{
					id : 'onConvert',
					text : getMessage('Convert to Markdown or HTML')
				}
			]
		};
		return settings;
	};

	window.Asc.plugin.attachContextMenuClickEvent('onConvert', function() {
		createWindow();
	});


	window.Asc.plugin.attachEvent('onContextMenuShow', function(options) {
		if (!options) return;

		if (options.type === 'Selection' || options.type === 'Target')
			this.executeMethod('AddContextMenuItem', [getContextMenuItems()]);
	});

})(window, undefined);
