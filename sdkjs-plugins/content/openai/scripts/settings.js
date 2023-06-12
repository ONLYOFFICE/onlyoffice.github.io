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
	let loader = null;
	let errMessage = 'Invalid Api key.';
	let loadMessage = 'Loading...';

	window.Asc.plugin.init = function() {
		createLoader();
		sendPluginMessage({type: 'onWindowReady'});
		
		document.getElementById('btn_save').onclick = function() {
			document.getElementById('err_message').innerText = '';
			document.getElementById('success_message').classList.add('hidden');
			sendPluginMessage({type: 'onRemoveApiKey'});
			let key = document.getElementById('inp_key').value.trim();
			if (key.length) {
				createLoader();
				// check api key by fetching models
				fetch('https://api.openai.com/v1/models', {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + key
					}
				}).
				then(function(response) {
					if (response.ok) {
						sendPluginMessage({type: 'onAddApiKey', key: key});
						document.getElementById('success_message').classList.remove('hidden');
					} else {
						response.json().then(function(data) {
							let message = data.error && data.error.message ? data.error.message : errMessage;
							createError(new Error(message));
						});
					}
				})
				.catch(function(error) {
					createError(error);
				})
				.finally(function(){
					destroyLoader();
				});
			} else {
				createError(new Error(errMessage));
			}
		}
	};

	function createError(error) {
		document.getElementById('err_message').innerText = errMessage;
		console.error(error.message || errMessage);
	};

	function createLoader() {
		if (!window.Asc.plugin.theme)
			window.Asc.plugin.theme = {type: 'light'};
		$('#loader-container').removeClass( "hidden" );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], loadMessage);
	};

	function destroyLoader() {
		$('#loader-container').addClass( "hidden" )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = null;
	};

	function sendPluginMessage(message) {
		window.Asc.plugin.sendToPlugin("onWindowMessage", message);
	};

	window.Asc.plugin.onTranslate = function() {
		errMessage = window.Asc.plugin.tr(errMessage);
		loadMessage = window.Asc.plugin.tr(loadMessage);
		let elements = document.querySelectorAll('.i18n');
		elements.forEach(function(element) {
			element.innerText = window.Asc.plugin.tr(element.innerText);
		})
	};

	window.Asc.plugin.attachEvent("onApiKey", function(key) {
		document.getElementById('inp_key').value = key;
		destroyLoader();
	});

})(window, undefined);
