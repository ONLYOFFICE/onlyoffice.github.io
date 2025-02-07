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
	const maxTokens = 16000;
	const settings = {
		messages: []
	};
	let apiKey = '';
	let interval = null;
	let tokenTimeot = null;
	let errTimeout = null;
	let modalTimeout = null;
	let loader = null;
	let bCreateLoader = true;
	let localStorageKey = "onlyoffice_ai_chat_state";

	window.addEventListener("message", (event) => {
		const eventData = JSON.parse(event.data);
		if(!eventData) return;

		if(eventData.type == 'plugin_docked') {
			setState({
				messages: settings.messages,
				inputValue: document.getElementById('message').value
			});
		}
	});

	window.Asc.plugin.init = function() {
		restoreState();
		bCreateLoader = false;
		destroyLoader();
		document.getElementById('message').focus();
		window.Asc.plugin.sendToPlugin("onWindowReady", {});
		document.getElementById('message').onkeydown = function(e) {
			if ( (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				e.target.value += '\n';
			} else if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
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
		
		// TODO:
		if (true)
		{
			document.getElementById('tokens_info').style.display = "none";
		}

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

	function setState(state) {
		window.localStorage.setItem(localStorageKey + '-' + window.Asc.plugin.windowID, JSON.stringify(state));
	};

	function getState() {
		let state = window.localStorage.getItem(localStorageKey + '-' + window.Asc.plugin.windowID);
		return state ? JSON.parse(state) : null;
	};

	function restoreState() {
		let state = getState();
		if(!state) return;

		if(state.messages) {
			settings.messages = state.messages; 
			state.messages.forEach(function(message) {
				renderMessage(message.content, message.role == 'user');
			});
		}
		if(state.inputValue) {
			document.getElementById('message').value = state.inputValue;
		}
	};

	function createMessage(text, type) {
		if (type) {
			renderMessage(text, type);
			sendMessage(text);
		} else {
			renderMessage(text, type, document.getElementById('loading'));
		}
	};

	function renderMessage(text, type, messageEl) {
		let chat = document.getElementById('chat');
		let message = (messageEl || document.createElement('div'));
		let textMes = document.createElement('span');
		textMes.classList.add('form-control', 'span_message');

		if (false) {
			textMes.innerText = text;
		} else {
			let c = window.markdownit();
			let htmlContent = c.render(text);
			textMes.style.display = "block";
			textMes.innerHTML = htmlContent;
		}

		chat.scrollTop = chat.scrollHeight;
		if(messageEl) {
			message.id = '';
			message.innerText = '';
		}
		if(type) {
			message.classList.add('user_message');
		}
		chat.appendChild(message);
		message.appendChild(textMes);
	};

	function sendMessage(text) {
		createTyping();
		settings.messages.push({role: 'user', content: text});
		window.Asc.plugin.sendToPlugin("onChatMessage", settings.messages);		
	};

	function createTyping() {
		let chat = document.getElementById('chat');
		let message = document.createElement('div');
		let loading = document.createElement('span');
		message.id = 'loading';
		loading.classList.add('form-control', 'span_message');
		loading.innerText='.';
		message.appendChild(loading);
		chat.appendChild(message);
		chat.scrollTop = chat.scrollHeight;
		interval = setInterval(function() {
			let text = loading.innerText;
			text = text.length > 5 ? '.' : text + '.';
			loading.innerText = text;
		}, 500);
	};

	function removeTyping() {
		clearInterval(interval);
		interval = null;
		let element = document.getElementById('loading');
		element && element.remove();
		return;
	};

	function createLoader() {
		$('#loader-container').removeClass( "hidden" );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], window.Asc.plugin.tr('Loading...'));
	};

	function destroyLoader() {
		document.getElementById('chat_window').classList.remove('hidden');
		$('#loader-container').addClass( "hidden" )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
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
		if (bCreateLoader)
			createLoader();
		let elements = document.querySelectorAll('.i18n');

		elements.forEach(function(element) {
			element.innerText = window.Asc.plugin.tr(element.innerText);
		});

		// Textarea
		document.getElementById('message').setAttribute('placeholder', window.Asc.plugin.tr('Ask AI a question about something...'));
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		bCreateLoader = false;
		window.Asc.plugin.onThemeChangedBase(theme);
		let rule = '\n .err_background { background: ' + theme['background-toolbar'] + ' !important; }';
		let styleTheme = document.createElement('style');
		styleTheme.type = 'text/css';
		styleTheme.innerHTML = rule;
		document.getElementsByTagName('head')[0].appendChild(styleTheme);
	};

	window.Asc.plugin.attachEvent("onChatReply", function(reply) {
		settings.messages.push({role: "assistant", content: reply});
		createMessage(reply, 0);
		removeTyping();
		document.getElementById('message').focus();
	});

})(window, undefined);
