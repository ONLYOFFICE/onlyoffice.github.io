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

(function (window, undefined) {
	let loader;
	let isDarkTheme = false;
	let elements = {};
	let apiKey = null;
	let errTimeout = null;
	let tokenTimeot = null;
	let bCreateLoader = true;
	let maxTokens = 4000;
	const isIE = checkInternetExplorer();
	const AllowedModels = {
		'text-ada-001' : true,

		'text-babbage-001' : true,

		'curie-instruct-beta' : true,
		'text-curie-001' : true,


		'text-davinci-003' : true,
		'text-davinci-002' : true,
		'text-davinci-001' : true,
		'davinchi-instruct-beta' : true,
		'davinchi:2020-05-03' : true
	};

	window.Asc.plugin.init = function() {
		if (isIE) {
			bCreateLoader = false;
			destroyLoader();
			document.getElementById('div_ie_error').classList.remove('hidden');
			return;
		} else {
			bCreateLoader = true;
		};
		apiKey = localStorage.getItem('OpenAiApiKey') || null;
		addSlidersListeners();
		initElements();
		initScrolls();
		if (apiKey) {
			fetchModels();
		} else {
			elements.divConfig.classList.remove('hidden');
			bCreateLoader = false;
			destroyLoader();
		}

		elements.inpLenSl.oninput = onSlInput;
		elements.inpTempSl.oninput = onSlInput;
		elements.inpTopSl.oninput = onSlInput;

		elements.btnSaveConfig.onclick = function() {
			elements.apiKeyField.classList.remove('error_border');
			elements.textArea.classList.remove('error_border');
			document.getElementById('apiKeyError').classList.add('hidden');
			document.getElementById('lb_key_err').innerHTML = '';
			document.getElementById('lb_key_err_mes').innerHTML = '';
			createLoader();
			elements.divConfig.classList.add('hidden');
			apiKey = elements.apiKeyField.value.trim();
			fetchModels();
		};

		elements.reconfigure.onclick = function() {
			if (errTimeout) {
				clearTimeout(errTimeout);
				errTimeout = null;
				clearMainError();
			}
			localStorage.removeItem('OpenAiApiKey');
			elements.apiKeyField.value = apiKey;
			apiKey = '';
			elements.divContent.classList.add('hidden');
			elements.divConfig.classList.remove('hidden');
		};

		elements.btnClear.onclick = function() {
			elements.textArea.value = '';
			elements.textArea.focus();
		};

		elements.textArea.oninput = function(event) {
			elements.textArea.classList.remove('error_border');
			if (tokenTimeot) {
				clearTimeout(tokenTimeot);
				tokenTimeot = null;
			}
			tokenTimeot = setTimeout(function() {
				let text = event.target.value.trim();
				let tokens = window.Asc.OpenAIEncode(text);
				elements.lbTokens.innerText = tokens.length;
				elements.lbModalTokens.innerText = tokens.length;
				checkLen();
			}, 250);

		};

		elements.divTokens.onmouseenter = function(e) {
			elements.modal.classList.remove('hidden');
		};

		elements.divTokens.onmouseleave = function(e) {
			elements.modal.classList.add('hidden');
		};

		elements.btnSubmit.onclick = function() {
			let settings = getSettings();
			if (!settings.prompt.length) {
				elements.textArea.classList.add('error_border');
				return;
			};
			if (!elements.modalError.classList.contains('hidden')) {
				return;
			}
			createLoader();

			fetch('https://api.openai.com/v1/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + apiKey,
				},
				body: JSON.stringify(settings),
			})
			.then(function(response) {
				return response.json()
			})
			.then(function(data) {
				if (data.error)
					throw data.error

				let text = data.choices[0].text;
				let textColor = '';
				if (!text.includes('</')) {
					// it's necessary because "PasteHtml" method ignores "\n" and we are trying to replace it on "<br>" when we don't have a html code in answer
					
					if (text.startsWith('\n'))
						text = text.replace('\n\n', '\n').replace('\n', '');
					
					text = text.replace(/\n\n/g,'\n').replace(/\n/g,'<br>');

					if (window.Asc.plugin.info.editorType == 'cell' && isDarkTheme) {
						// it's temporarily. remove it after fixing bug https://bugzilla.onlyoffice.com/show_bug.cgi?id=61095
						textColor = ' style="color:#000;"';
					}
				}
				
				window.Asc.plugin.executeMethod('PasteHtml', ['<div'+textColor+'>'+text+'</div>']);
			})
			.catch(function(error) {
				elements.mainError.classList.remove('hidden');
				elements.mainErrorLb.innerHTML = error.message;
				if (errTimeout) {
					clearTimeout(errTimeout);
					errTimeout = null;
				}
				errTimeout = setTimeout(clearMainError, 10000);
				console.error('Error:', error);
			}).finally(function(){
				destroyLoader();
			});
		};
	};

	function initElements() {
		elements.inpLenSl	   = document.getElementById('inp_len_sl');
		elements.inpTempSl	   = document.getElementById('inp_temp_sl');
		elements.inpTopSl	   = document.getElementById('inp_top_sl');
		elements.inpStop	   = document.getElementById('inp_stop');
		elements.textArea	   = document.getElementById('textarea');
		elements.btnSubmit	   = document.getElementById('btn_submit');
		elements.btnClear	   = document.getElementById('btn_clear');
		elements.btnLogout	   = document.getElementById('logoutLink');
		elements.btnSaveConfig = document.getElementById('btn_saveConfig');
		elements.apiKeyField   = document.getElementById('apiKeyField');
		elements.divContent	   = document.getElementById('div_content');
		elements.divConfig	   = document.getElementById('div_config');
		elements.reconfigure   = document.getElementById('logoutLink');
		elements.mainError	   = document.getElementById('div_err');
		elements.mainErrorLb   = document.getElementById('lb_err');
		elements.keyError	   = document.getElementById('apiKeyError');
		elements.keyErrorLb	   = document.getElementById('lb_key_err');
		elements.keyErrorMes   = document.getElementById('lb_key_err_mes');
		elements.lbTokens      = document.getElementById('lb_tokens');
		elements.divTokens     = document.getElementById('div_tokens');
		elements.modal         = document.getElementById('div_modal');
		elements.lbModalTokens = document.getElementById('lb_modal_tokens');
		elements.lbModalLen    = document.getElementById('lb_modal_length');
		elements.modalErrLen   = document.getElementById('modal_err_len');
		elements.modalError    = document.getElementById('modal_error');
	};

	function initScrolls() {
		PsMain = new PerfectScrollbar('#div_content', {});
		PsConf = new PerfectScrollbar('#div_config', {});
	};

	function addSlidersListeners() {
		const rangeInputs = document.querySelectorAll('input[type="range"]');

		function handleInputChange(e) {
			let target = e.target;
			if (e.target.type !== 'range') {
				target = document.getElementById('range');
			} 
			const min = target.min;
			const max = target.max;
			const val = target.value;
			
			target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
		};

		rangeInputs.forEach(function(input) {
			input.addEventListener('input', handleInputChange);
		});
	};

	function onSlInput(e) {
		e.target.nextElementSibling.innerText = e.target.value;
		if (e.target.id == elements.inpLenSl.id) {
			elements.lbModalLen.innerText = e.target.value;
			checkLen();
		}
	};

	function fetchModels() {
		fetch('https://api.openai.com/v1/models', {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + apiKey
			}
		})
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			if (data.error)
				throw data.error;

			let arrModels = [];
			
			for (let index = 0; index < data.data.length; index++) {
				let model = data.data[index];
				if (AllowedModels[model.id])
					arrModels.push( { id: model.id, text: model.id } );
			};

			$('#sel_models').select2({
				data : arrModels
			}).on('select2:select', function(e) {
				// e.currentTarget.value
				let curVal = Number(elements.inpLenSl.value);
				maxTokens = e.params.data.id.includes('text-davinci-003') ? 4000: 2000;
				if (curVal > maxTokens)
					curVal = maxTokens;

				elements.inpLenSl.setAttribute('max', maxTokens);
				elements.inpLenSl.value = curVal;
				let event = document.createEvent('Event');
				event.initEvent('input', true, true);
				elements.inpLenSl.dispatchEvent(event);
				elements.modalErrLen.innerText = maxTokens;
			});

			if ($('#sel_models').find('option[value=text-davinci-003]').length) {
				$('#sel_models').val('text-davinci-003').trigger('change');
			} else { 
				var newOption = new Option('text-davinci-003', 'text-davinci-003', true, true);
				$('#sel_models').append(newOption).trigger('change');
			}
			localStorage.setItem('OpenAiApiKey', apiKey);
			elements.divContent.classList.remove('hidden');
		})
		.catch(function(error) {
			elements.keyError.classList.remove('hidden');
			elements.keyErrorLb.innerHTML = error.code || 'Error:';
			elements.keyErrorMes.innerHTML = error.message;
			elements.apiKeyField.classList.add('error_border');
			elements.divConfig.classList.remove('hidden');
			console.error(error);
		}).finally(function() {
			updateScroll();
			destroyLoader();
		});
	};

	function getSettings() {
		let obj = {
			model : $('#sel_models').val(),
			prompt : elements.textArea.value.trim(),
		};
		let temp = Number(elements.inpTempSl.value);
		obj.temperature = ( temp < 0 ? 0 : ( temp > 1 ? 1 : temp ) );
		let len = Number(elements.inpLenSl.value);
		obj.max_tokens = ( len < 0 ? 0 : ( len > maxTokens ? maxTokens : len ) );
		let topP = Number(elements.inpTopSl.value);
		obj.top_p = ( topP < 0 ? 0 : ( topP > 1 ? 1 : topP ) );
		let stop = elements.inpStop.value;
		if (stop.length)
			obj.stop = stop;

		return obj;
	};

	function createLoader() {
		$('#loader-container').removeClass( "hidden" );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], getMessage('Loading...'));
	};

	function destroyLoader() {
		$('#loader-container').addClass( "hidden" )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

	function clearMainError() {
		elements.mainError.classList.add('hidden');
		elements.mainErrorLb.innerHTML = '';
	};

	function getMessage(key) {
		return window.Asc.plugin.tr(key);
	};

	function updateScroll() {
		PsMain && PsMain.update();
		PsConf && PsConf.update();
	};

	function checkInternetExplorer() {
		let rv = -1;
		if (window.navigator.appName == 'Microsoft Internet Explorer') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		} else if (window.navigator.appName == 'Netscape') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');

			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}
		return rv !== -1;
	};

	function checkLen() {
		let cur = new Number(elements.lbTokens.innerText);
		let maxLen = new Number(elements.inpLenSl.value);
		if (cur + maxLen > maxTokens) {
			elements.modalError.classList.remove('hidden');
			elements.lbTokens.classList.add('lb_err');
		} else {
			elements.modalError.classList.add('hidden');
			elements.lbTokens.classList.remove('lb_err');
		}
	};

	window.Asc.plugin.onTranslate = function() {
		if (bCreateLoader)
			createLoader();

		let elements = document.getElementsByClassName('i18n');
		let titles = document.getElementsByClassName('div_parametr');
		bCreateLoader = true;

		for (let i = 0; i < elements.length; i++)
			elements[i].innerText = getMessage(elements[i].innerText);

		for (let j = 0; j < titles.length; j++)
			titles[j].attributes["title"].value = getMessage(titles[j].attributes["title"].value);
	};

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		if (isIE) return;

		let rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
		let sliderBG, thumbBG;
		if (theme.type.includes("dark")) {
			isDarkTheme = true;
			sliderBG = theme.Border || '#757575';
			// for dark '#757575';
			// for contrast dark #616161
			thumbBG = '#fcfcfc';
		} else {
			isDarkTheme = false;
			sliderBG = '#ccc';
			thumbBG = '#444';
		}
		rule += '\n input[type="range"] { background-color: '+sliderBG+' !important; background-image: linear-gradient('+thumbBG+', '+thumbBG+') !important; }\n';
		rule += '\n input[type="range"]::-webkit-slider-thumb { background: '+thumbBG+' !important; }\n';
		rule += '\n input[type="range"]::-moz-range-thumb { background: '+thumbBG+' !important; }\n';
		rule += '\n input[type="range"]::-ms-thumb { background: '+thumbBG+' !important; }\n';
		let styleTheme = document.createElement('style');
		styleTheme.type = 'text/css';
		styleTheme.innerHTML = rule;
		document.getElementsByTagName('head')[0].appendChild(styleTheme);
	};

	window.onresize = function() {
		updateScroll();
		updateScroll();
	};

	window.Asc.plugin.button = function(id) {
		window.Asc.plugin.executeCommand("close", "");
	};

})(window, undefined);
