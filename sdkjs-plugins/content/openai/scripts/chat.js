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
	const url = 'https://api.openai.com/v1/chat/completions';
	const apiKey = localStorage.getItem('OpenAIApiKey');
	const maxTokens = 4000;
	const settings = {
		model: 'gpt-3.5-turbo',
		messages: []
	};
	let interval = null;
	let tokenTimeot = null;
	let errTimeout = null;
	let modalTimeout = null;

	window.Asc.plugin.init = function() {
		document.getElementById('message').onkeydown = function(e) {
			if ( (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				if (document.getElementById('message').classList.contains('error_border')){
					setError('Too many tokens in your request.');
					return;
				}
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
				if (tokens.length > maxTokens) {
					event.target.classList.add('error_border');
				} else {
					event.target.classList.remove('error_border');
				}
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
			setError(error.message)
			destroyLoader();
		});
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
		document.getElementById('loading').remove();
		return;
	};

	function setError(error) {
		document.getElementById('lb_err').innerHTML = window.Asc.plugin.tr(error);
		document.getElementById('div_err').classList.remove('hidden');
		if (errTimeout) {
			clearTimeout(errTimeout);
			errTimeout = null;
		}
		errTimeout = setTimeout(clearError, 5000);
	};

	function clearError() {
		document.getElementById('div_err').classList.add('hidden');
		document.getElementById('lb_err').innerHTML = '';
	};

	window.Asc.plugin.onTranslate = function() {
		let elements = document.querySelectorAll('.i18n');

		elements.forEach(function(element) {
			element.innerText = window.Asc.plugin.tr(element.innerText);
		});
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
		let rule = '\n .err_background { background: ' + theme['background-toolbar'] + ' !important; }';
		let styleTheme = document.createElement('style');
		styleTheme.type = 'text/css';
		styleTheme.innerHTML = rule;
		document.getElementsByTagName('head')[0].appendChild(styleTheme);
	};

})(window, undefined);
