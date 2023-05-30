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
	const url = 'https://api.openai.com/v1/chat/completions';
	const apiKey = localStorage.getItem('OpenAIApiKey');
	const maxTokens = 4000;
	const settings = {
		model: 'gpt-3.5-turbo',
		messages: []
	};
	let interval = null;
	let tokenTimeot = null;
	let modalTimeout = null;

	window.Asc.plugin.init = function() {
		document.getElementById('message').onkeydown = function(e) {
			if ( (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				let value = e.target.value.trim();
				if (value.length) {
					createMessage(e.target.value.trim(), 1);
					e.target.value = '';
					document.getElementById('cur_tokens').innerText = 0;
				}
			}
		};

		document.getElementById('message').oninput = function(event) {
			if (tokenTimeot) {
				clearTimeout(tokenTimeot);
				tokenTimeot = null;
			}
			tokenTimeot = setTimeout(function() {
				let text = event.target.value.trim();
				let tokens = window.Asc.OpenAIEncode(text);
				document.getElementById('cur_tokens').innerText = tokens.length;
			}, 250);
		};

		document.getElementById('tokens_info').addEventListener('mouseenter', function (event) {
			event.target.children[0].classList.remove('hidden');
			if (modalTimeout) {
				clearTimeout(modalTimeout);
				modalTimeout = null;
			}
		});

		document.getElementById('tokens_info').addEventListener('mouseleave', function (event) {
			modalTimeout = setTimeout(function() {
				event.target.children[0].classList.add('hidden');
			}, 100)
		});

		document.getElementById('clear_history').onclick = function() {
			document.getElementById('chat').innerHTML = '';
			settings.messages = [];
			document.getElementById('total_tokens').classList.remove('err-message');
			document.getElementById('total_tokens').innerText = 0;
		};
	};

	function createMessage(text, type) {
		let chat = document.getElementById('chat');
		let message = type ? document.createElement('div') : document.getElementById('loading');
		let textMes = document.createElement('span');
		textMes.classList.add('form-control', 'span_message');
		textMes.innerText = text;
		message.appendChild(textMes);
		chat.scrollTop = chat.scrollHeight;
		chat.appendChild(message);
		if (type) {
			message.classList.add('user_message');
			sendMessage(text);
		} else {
			message.id = '';
		}
	};

	function sendMessage(text) {
		createLoader();
		settings.messages.push({role: 'user', content: text});
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + apiKey
			},
			body: JSON.stringify(settings),
		})
		.then(function(response) {
			return response.json()
		})
		.then(function(data) {
			if (data.error)
				throw data.error

			let text = data.choices[0].message.content;
			settings.messages.push({role: data.choices[0].message.role, content: text});
			destroyLoader();
			// to to add check for max tokens length
			createMessage(text, 0);
			document.getElementById('total_tokens').innerText = data.usage.total_tokens;
			if (data.usage.total_tokens >= maxTokens)
				document.getElementById('total_tokens').classList.add('err-message');
		})
		.catch(function(error) {
			console.error('Error:', error);
			destroyLoader();
		});
	};

	function createError(error) {
		document.getElementById('err_message').innerText = error.message;
		console.error(error);
	};

	function createLoader() {
		let chat = document.getElementById('chat');
		let message = document.createElement('div');
		let loading = document.createElement('span');
		message.id = 'loading';
		loading.classList.add('form-control', 'span_message');
		loading.innerText='.';
		message.appendChild(loading);
		chat.appendChild(message);
		chat.scrollTop = chat.scrollHeight;
		interval = setInterval(() => {
			let text = loading.innerText;
			text = text.length > 5 ? '.' : text + '.';
			loading.innerText = text;
		}, 500);
	};

	function destroyLoader() {
		clearInterval(interval);
		interval = null;
		document.getElementById('loading').innerHTML = '';
		return;
	};

	window.Asc.plugin.onTranslate = function() {
		let elements = document.querySelectorAll('.i18n');

		elements.forEach(function(element) {
			element.innerText = window.Asc.plugin.tr(element.innerText);
		});
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
	};

	/* EXAMPLE:
	window.Asc.plugin.attachEvent("onPluginMessage", function(data) {
		console.log(data);
	});
	window.Asc.plugin.sendToPlugin("onWindowMessage", {});
	*/

})(window, undefined);
