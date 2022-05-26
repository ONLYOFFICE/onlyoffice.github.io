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

let allPlugins;	// list of all plugins from config
let installed = [];	// list of intalled plugins
const configUrl = './config.json';	// url to config.json
const elements = {};	// all elements
let isLoading = false;	// flag loading
let loader;	// loader

// TODO решить проблему с темой
window.Asc = {
	plugin : {
		theme : {
			type : 'light'
		}
	}
}

window.onload = function() {
	initElemnts();

	elements.btnMyPlugins.onclick = function() {
		if ( !this.classList.contains('btn_selected') ) {
			elements.btnMarketplace.classList.remove('btn_selected');
			this.classList.add('btn_selected');
		}
	};

	elements.btnMarketplace.onclick = function() {
		if ( !this.classList.contains('primary') ) {
			elements.btnMyPlugins.classList.remove('btn_selected');
			this.classList.add('btn_selected');
		}
	};

	if (isLoading) {
		toogleLoader(true);
	}
	parent.postMessage({type : 'getInstalled'}, '*');
};

window.addEventListener('message', function(event) {
	switch (event.data.type) {
		case 'installed':
			installed = JSON.parse(event.data.data)
			break;
	
		default:
			break;
	}
}, false);

fetchAllPlugins();

function fetchAllPlugins() {
	makeRequest(configUrl).then(function(response) {
		allPlugins = JSON.parse(response);
		isLoading = false;
		toogleLoader(false);
	},
	function(err) {
		//TODO make error preview
		console.error(err);
		isLoading = false;
	});
};

function makeRequest(url) {
	// this function makes GET request and return promise
	isLoading = true;
	return new Promise(function (resolve, reject) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		
		xhr.onload = function () {
			if (this.status == 200) {
				resolve(this.response);
			}
		};

		xhr.onerror = function (err) {
			reject(err);
		};

		xhr.send(null);
	});
};

function initElemnts() {
	elements.btnMyPlugins = document.getElementById('btn_myPlugins');
	elements.btnMarketplace = document.getElementById('btn_marketplace');
};

function toogleLoader(show) {
	if (!show) {
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;	
	} else if(!loader) {
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], 'Loading...');
	}
};