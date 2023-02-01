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

(function (window, undefined) {
	let loader;
	let elements = {};
	let apiKey = null;
	let timeout = null;
	let bCreateLoader = true;

	window.Asc.plugin.init = function() {
		apiKey = localStorage.getItem('OpenAiApiKey') || null;
		initElements();
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
		elements.inpLen.oninput = onValInput;
		elements.inpTemp.oninput = onValInput;
		elements.inpTop.oninput = onValInput;

		elements.btnSaveConfig.onclick = function() {
			elements.apiKeyField.classList.remove('api_key_error');
			document.getElementById('apiKeyError').classList.add('hidden');
			document.getElementById('lb_key_err').innerHTML = '';
			document.getElementById('lb_key_err_mes').innerHTML = '';
			createLoader();
			elements.divConfig.classList.add('hidden');
			apiKey = elements.apiKeyField.value.trim();
			fetchModels();
		};

		elements.reconfigure.onclick = function() {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
				clearMainError();
			}
			localStorage.removeItem('OpenAiApiKey');
			apiKey = '';
			elements.apiKeyField.value = '';
			elements.divContent.classList.add('hidden');
			elements.divConfig.classList.remove('hidden');
		};

		elements.btnClear.onclick = function() {
			elements.textArea.value = '';
			elements.textArea.focus();
		};

		elements.btnReq.onclick = function() {
			createLoader();
			let settings = getSettings();
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

				window.Asc.plugin.executeMethod('PasteHtml', ['<div>'+data.choices[0].text+'</div>']);
			})
			.catch(function(error) {
				elements.mainError.classList.remove('hidden');
				elements.mainErrorLb.innerHTML = error.message;
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				timeout = setTimeout(clearMainError, 10000);
				console.error('Error:', error);
			}).finally(function(){
				destroyLoader();
			});
		}
	};

	function initElements() {
		elements.inpLen		= document.getElementById('inp_len');
		elements.inpLenSl	  = document.getElementById('inp_len_sl');
		elements.inpTemp	   = document.getElementById('inp_temp');
		elements.inpTempSl	 = document.getElementById('inp_temp_sl');
		elements.inpTop		= document.getElementById('inp_top');
		elements.inpTopSl	  = document.getElementById('inp_top_sl');
		elements.inpStop	   = document.getElementById('inp_stop');
		elements.textArea	  = document.getElementById('textarea');
		elements.btnReq		= document.getElementById('btn_req');
		elements.btnClear	  = document.getElementById('btn_clear');
		elements.btnLogout	 = document.getElementById('logoutLink');
		elements.btnSaveConfig = document.getElementById('btn_saveConfig');
		elements.apiKeyField   = document.getElementById('apiKeyField');
		elements.divContent	= document.getElementById('div_content');
		elements.divConfig	 = document.getElementById('div_config');
		elements.reconfigure   = document.getElementById('logoutLink');
		elements.mainError	 = document.getElementById('div_err');
		elements.mainErrorLb   = document.getElementById('lb_err');
		elements.keyError	  = document.getElementById('apiKeyError');
		elements.keyErrorLb	= document.getElementById('lb_key_err');
		elements.keyErrorMes   = document.getElementById('lb_key_err_mes');
	};

	function onSlInput(e) {
		e.target.previousElementSibling.children[1].value = e.target.value;
	};

	function onValInput(e) {
		e.target.parentElement.nextElementSibling.value = Number(e.target.value.trim());
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

			let arrModels = data.data.map(function(el) {
				return { id: el.id, text: el.id};
			});

			$('#sel_models').select2({
				data : arrModels
			}).on('select2:select', function(e) {
				//
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
			elements.apiKeyField.classList.add('api_key_error');
			elements.divConfig.classList.remove('hidden');
			console.error(error);
		}).finally(function(){
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
		obj.max_tokens = ( len < 0 ? 0 : ( len > 4096 ? 4096 : len ) );
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

	window.Asc.plugin.button = function(id) {
		window.Asc.plugin.executeCommand("close", "");
	};

})(window, undefined);
