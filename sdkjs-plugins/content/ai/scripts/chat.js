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

	let actionButtons = [
		{ 
			icon: 'resources/icons/light/btn-copy.png', 
			tipOptions: {
				text: 'Copy',
				align: 'left'
			},
			hanlder: function(text) { 
				var prevTextareaVal = $('#input_message').val();
				$('#input_message').val(text);
				$('#input_message').select();
				document.execCommand('copy');
				$('#input_message').val(prevTextareaVal);
			}
		},
		{ 
			icon: 'resources/icons/light/btn-replace.png', 
			tipOptions: {
				text: 'Replace original text',
				align: 'left'
			},
			hanlder: function(text) { insertEngine('replace', text); }
		},
		{ 
			icon: 'resources/icons/light/btn-select-tool.png', 
			tipOptions: {
				text: 'Insert result',
				align: 'left'
			},
			hanlder: function(text) { insertEngine('insert', text); }
		},
		{ 
			icon: 'resources/icons/light/btn-menu-comments.png', 
			tipOptions: {
				text: 'In comment',
				align: 'left'
			},
			hanlder: function(text) { insertEngine('comment', text); }
		},
		{ 
			icon: 'resources/icons/light/btn-ic-review.png', 
			tipOptions: {
				text: 'As review',
				align: 'left'
			},
			hanlder: function(text) { insertEngine('review', text);}
		},
	];
	let welcomeButtons = [
		{ text: 'Blog post about', prompt: 'Blog post about' },
		{ text: 'Press release about', prompt: 'Press release about' },
		{ text: 'Social media post about', prompt: 'Social media post about' },
		{ text: 'Brainstorm ideas for', prompt: 'Brainstorm ideas for' },
		{ text: 'Project proposal about', prompt: 'Project proposal about' },
		{ text: 'An essay about', prompt: 'An essay about' },
		{ text: 'Creative story about', prompt: 'Creative story about' }
	];


	function insertEngine(type, text) {
		window.Asc.plugin.sendToPlugin("onChatReplace", {
			type : type,
			data : text
		});
	}
	let localStorageKey = "onlyoffice_ai_chat_state";

	window.Asc.plugin.init = function() {
		restoreState();
		bCreateLoader = false;
		destroyLoader();

		if(settings.messages.length) {
			hideStartPanel();
		}
		updateTextareaSize();

		window.Asc.plugin.sendToPlugin("onWindowReady", {});

		document.getElementById('input_message_submit').addEventListener('click', function() {
			onSubmit();
		});
		document.getElementById('input_message').onkeydown = function(e) {
			if ( (e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				e.target.value += '\n';
				updateTextareaSize();
			} else if (e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				onSubmit();
			}
		};

		document.getElementById('input_message').addEventListener('focus', function(event) {
			$('#input_message_wrapper').addClass('focused');
		});
		document.getElementById('input_message').addEventListener('blur', function(event) {
			$('#input_message_wrapper').removeClass('focused');
		});
		document.getElementById('input_message').focus();

		document.getElementById('input_message').addEventListener('input', function(event) {
			//autosize
			updateTextareaSize();

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
		});
		
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

		window.addEventListener("resize", function() {
			updateTextareaSize();
		});
	};


	function onSubmit() {
		let textarea = document.getElementById('input_message');
		if (textarea.classList.contains('error_border')){
			setError('Too many tokens in your request.');
			return;
		}
		let value = textarea.value.trim();
		if (value.length) {
			createMessage(textarea.value.trim(), 1);
			textarea.value = '';
			updateTextareaSize();
			document.getElementById('cur_tokens').innerText = 0;
		}
	};

	function updateStartPanel() {
		updateWelcomeText();
		renderWelcomeButtons();
	};

	function hideStartPanel() {
		$('#start_panel').css('display', 'none');
	};

	function updateWelcomeText() {
		let welcomeText = window.Asc.plugin.tr('Welcome');
		if(window.Asc.plugin.info.userName) {
			welcomeText += ', ' + window.Asc.plugin.info.userName;
		}
		welcomeText += '!';
		$("#welcome_text").prepend('<span>' + welcomeText + '</span>');
	};

	function renderWelcomeButtons() {
		welcomeButtons.forEach(function(button) {
			let addedEl = $('<div class="welcome_button form-control noselect">' + button.text + '...</div>');
			addedEl.on('click', function() {
				$('#input_message').val(button.prompt).focus();
			});
			$('#welcome_buttons_list').append(addedEl);
		});
	};

	function updateTextareaSize() {
		let textarea = $('#input_message')[0];
		textarea.style.height = "auto";
		textarea.style.height = Math.min(textarea.scrollHeight, 98) +2 + "px";
	};

	function setState(state) {
		window.localStorage.setItem(localStorageKey, JSON.stringify(state));
	};

	function getState() {
		let state = window.localStorage.getItem(localStorageKey);
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
			document.getElementById('input_message').value = state.inputValue;
		}
	};

	function createMessage(text, type) {
		if (type) {
			renderMessage(text, type);
			sendMessage(text);
		} else {
			renderMessage(text, type);
		}
	};

	function renderMessage(text, type) {
		let chatEl = $('#chat');
		let messageEl = $('<div class="message"></div>');
		let spanMessageEl = $('<span class="form-control span_message"></span>');
		
		if (false) {
			spanMessageEl.text(text);
		} else {
			let c = window.markdownit();
			let htmlContent = c.render(text);
			spanMessageEl.css('display', 'block');
			spanMessageEl.html(htmlContent);
		}

		if(type) {
			messageEl.addClass('user_message');
		} else {
			let actionButtonsEl = $('<div class="action_buttons_list"></div>');
			actionButtons.forEach(function(button) {
				let buttonEl = $('<button class="action_button btn-text-default"></button>');
				buttonEl.append('<img src="' + getFormattedPathForIcon(button.icon) + '"/>');
				buttonEl.on('click', function() {
					button.hanlder(text);
				});

				if(button.tipOptions) {
					new Tooltip(buttonEl[0], button.tipOptions);
				}
				
				actionButtonsEl.append(buttonEl);
			});
			messageEl.append(actionButtonsEl);
		}
		messageEl.prepend(spanMessageEl);
		chatEl.prepend(messageEl);
		chatEl.scrollTop(chatEl[0].scrollHeight);
	};

	function sendMessage(text) {
		hideStartPanel();
		createTyping();
		settings.messages.push({role: 'user', content: text});
		window.Asc.plugin.sendToPlugin("onChatMessage", settings.messages);		
	};

	function createTyping() {
		let chatEl = $('#chat');
		let messageEl = $('<div id="loading" class="message"></div>');
		let spanMessageEl = $('<div class="span_message"></div>');
		spanMessageEl.text(window.Asc.plugin.tr('Thinking'));
		messageEl.append(spanMessageEl);
		chatEl.prepend(messageEl);
		chatEl.scrollTop(chatEl[0].scrollHeight);
		interval = setInterval(function() {
			let countDots = (loading.innerText.match(/\./g) || []).length;
			countDots = countDots < 3 ? countDots + 1 : 0;
			spanMessageEl.text(window.Asc.plugin.tr('Thinking') + Array(countDots + 1).join("."));
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

	function getFormattedPathForIcon(path) {
		let themeType = window.Asc.plugin.info.theme.type || 'light';
		path = path.replace(/\/(light|dark)\//, '/' + themeType + '/');
		path = path.replace(/(\.\w+)$/, getZoomSuffixForImage() + '$1');
		return path;
	}

	function onResize () {
		$('img').each(function() {
			var el = $(this);
			var src = $(el).attr('src');
			if(!src.includes('resources/icons/')) return;
	
			var srcParts = src.split('/');
			var fileNameWithRatio = srcParts.pop();
			var clearFileName = fileNameWithRatio.replace(/@\d+(\.\d+)?x/, '');
			var newFileName = clearFileName;
			newFileName = clearFileName.replace(/(\.[^/.]+)$/, getZoomSuffixForImage() + '$1');
			srcParts.push(newFileName);
			el.attr('src', srcParts.join('/'));
		});
	}

	function getZoomSuffixForImage() {
		var ratio = Math.round(window.devicePixelRatio / 0.25) * 0.25;
		ratio = Math.max(ratio, 1);
		ratio = Math.min(ratio, 2);
		if(ratio == 1) return ''
		else {
			return '@' + ratio + 'x';
		}
	}

	function onThemeChanged(theme) {
		bCreateLoader = false;
		window.Asc.plugin.onThemeChangedBase(theme);

		addCssVariables(theme);
		themeType = theme.type || 'light';
		
		var classes = document.body.className.split(' ');
		classes.forEach(function(className) {
			if (className.indexOf('theme-') != -1) {
				document.body.classList.remove(className);
			}
		});
		document.body.classList.add(theme.name);
		document.body.classList.add('theme-type-' + themeType);

		$('img.icon').each(function() {
			var src = $(this).attr('src');
			var newSrc = src.replace(/(icons\/)([^\/]+)(\/)/, '$1' + themeType + '$3');
			$(this).attr('src', newSrc);
		});
	}

	function addCssVariables(theme) {
		let colorRegex = /^(#([0-9a-f]{3}){1,2}|rgba?\([^\)]+\)|hsl\([^\)]+\))$/i;

		let oldStyle = document.getElementById('theme-variables');
		if (oldStyle) {
			oldStyle.remove();
		}

		let style = document.createElement('style');
		style.id = 'theme-variables';
		let cssVariables = ":root {\n";

		for (let key in theme) {
			let value = theme[key];

			if (colorRegex.test(value)) {
				let cssKey = '--' + key.replace(/([A-Z])/g, "-$1").toLowerCase();
				cssVariables += ' ' + cssKey + ': ' + value + ';\n';
			}
		}

		cssVariables += "}";

		style.textContent = cssVariables;
		document.head.appendChild(style);
	}

	window.addEventListener("resize", onResize);
	onResize();

	window.Asc.plugin.onTranslate = function() {
		if (bCreateLoader)
			createLoader();
		let elements = document.querySelectorAll('.i18n');

		elements.forEach(function(element) {
			element.innerText = window.Asc.plugin.tr(element.innerText);
		});

		// Textarea
		document.getElementById('input_message').setAttribute('placeholder', window.Asc.plugin.tr('Ask AI a question about something...'));

		//Action buttons
		actionButtons.forEach(function(button) {
			button.tipOptions.text = window.Asc.plugin.tr(button.tipOptions.text);
		});

		//Welcome buttons
		welcomeButtons.forEach(function(button) {
			button.text = window.Asc.plugin.tr(button.text);
			button.prompt = window.Asc.plugin.tr(button.prompt);
		});

		updateStartPanel();
	};

	window.Asc.plugin.onThemeChanged = onThemeChanged;

	window.Asc.plugin.attachEvent("onChatReply", function(reply) {
		settings.messages.push({role: "assistant", content: reply});
		removeTyping();
		createMessage(reply, 0);
		document.getElementById('input_message').focus();
	});

	window.Asc.plugin.attachEvent("onThemeChanged", onThemeChanged);

	window.Asc.plugin.attachEvent("onUpdateState", function() {
		setState({
			messages: settings.messages,
			inputValue: document.getElementById('input_message').value
		});
		window.Asc.plugin.sendToPlugin("onUpdateState");
	});

})(window, undefined);
