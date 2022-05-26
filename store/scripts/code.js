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