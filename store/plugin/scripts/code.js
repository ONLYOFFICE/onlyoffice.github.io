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

    window.Asc.plugin.init = function() {
		// resize window
		window.Asc.plugin.resizeWindow(608, 570, 608, 570, 0, 0);
		// identify iframe
		let ifr = document.getElementsByTagName('iframe')[0];
		// send message that plugin is ready
		ifr.contentWindow.postMessage(JSON.stringify({type: 'PluginReady'}), "*");
    };

    window.Asc.plugin.button = function(id) {
		if (id == 'back') {
			window.Asc.plugin.executeMethod('ShowButton',['back', false]);
			let ifr = document.getElementsByTagName('iframe')[0];
			if (ifr && ifr.contentWindow)
				ifr.contentWindow.postMessage(JSON.stringify({ type: 'onClickBack'}), "*");
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
					message.source.postMessage(JSON.stringify({type: 'InstalledPlugins', data: result}), "*");
				});
				break;
			case 'install':
				window.Asc.plugin.executeMethod("InstallPlugin", [data.config, data.guid], function(result) {
					message.source.postMessage(JSON.stringify(result), "*");
				});
				break;
			case 'remove':
				window.Asc.plugin.executeMethod("RemovePlugin", [data.guid], function(result) {
					message.source.postMessage(JSON.stringify(result), "*");
				});
				break;
			case 'update':
				window.Asc.plugin.executeMethod("UpdatePlugin", [data.config, data.guid], function(result) {
					message.source.postMessage(JSON.stringify(result), "*");
				});
				break;
			case 'showButton' :
				window.Asc.plugin.executeMethod('ShowButton',['back', true]);
				break;
		}
		
	}, false);

	window.Asc.plugin.onExternalMouseUp = function() {
		// mouse up event outside the plugin window
		let ifr = document.getElementsByTagName('iframe')[0];
		if (ifr && ifr.contentWindow)
			ifr.contentWindow.postMessage(JSON.stringify({ type: 'onExternalMouseUp'}), "*");
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		// theme changed event
		window.Asc.plugin.onThemeChangedBase(theme);
		let style = document.getElementsByTagName('head')[0].lastChild;
		let ifr = document.getElementsByTagName('iframe')[0];
		if (ifr && ifr.contentWindow)
			ifr.contentWindow.postMessage(JSON.stringify({ type: 'Theme', theme: theme, style : style.innerHTML}), "*");
	};

})(window, undefined);
