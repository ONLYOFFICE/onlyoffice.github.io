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
