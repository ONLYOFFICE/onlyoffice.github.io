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
	let loader = null;
	let Ps = null;

	window.Asc.plugin.init = function() {
		createLoader();
		Ps = new PerfectScrollbar('#container', {});
		// send message that modal window is ready
		window.Asc.plugin.sendToPlugin("onDoc2MdMessage");	
	};

	function createLoader() {
		$('#loader-container').removeClass( "hidden" );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], window.Asc.plugin.tr('Loading...'));
	};

	function destroyLoader() {
		$('#loader-container').addClass( "hidden" )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

	function mergeOptions(options) {
		const defaults = getDefaults();
		const opts = {};
		const invalidOptions = [
		  'renderer',
		  'tokenizer',
		  'walkTokens',
		  'extensions',
		  'highlight',
		  'sanitizer'
		];
		for (const prop in defaults) {
		  opts[prop] = invalidOptions.includes(prop) || !(prop in options)
			? defaults[prop]
			: options[prop];
		}
		return opts;
	};

	function getDefaults() {
		let defaults = {};
		if (typeof marked.getDefaults === 'function') {
		  defaults = marked.getDefaults();
		  delete defaults.renderer;
		} else if ('defaults' in marked) {
		  for (const prop in marked.defaults) {
			if (prop !== 'renderer') {
			  defaults[prop] = marked.defaults[prop];
			}
		  }
		}
		return defaults;
	};

	window.Asc.plugin.attachEvent("onDoc2MdData", function(message) {
		let result = message.data;
		if (message.type = 'markdown') {
			const options = mergeOptions({});
			const lexed = marked.lexer(message.data, options);
			result = marked.parser(lexed, options);
		}
		document.getElementById('preview').innerHTML = result;
		Ps && Ps.update();
		destroyLoader();
	});

})(window, undefined);
