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
 const configUrl = "./config.json";
 window.onload = function() {
	 
 };
 
//  fetchAllPlugins();

// fetch(configUrl)
// .then(res => res.json())
// .then(data => console.log(data))
 
 function fetchAllPlugins() {
	 makeRequest(configUrl).then(function(response) {
		 console.log(response);
	 },
	 function(err) {
		 //TODO make error preview
		 console.error(err);
	 });
 };
 
 function makeRequest(url) {
	 // this function makes GET request and return promise
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