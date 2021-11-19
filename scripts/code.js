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
(function(window, undefined){

	var iframe,
		isInit = false,
		api;
	
	window.Asc.plugin.init = function () {
		//event "init" for plugin
		document.getElementById("start").onclick = function() {
			if (!isInit) {
				//create iframe jitsi
				const domain = 'meet.jit.si';
				const options = {
					roomName: 'Test meet',
					width: document.getElementById("body").clientWidth- 10 +"px",
					height: '550px',
					parentNode: document.querySelector('#meet'),
					interfaceConfigOverwrite: { SHOW_CHROME_EXTENSION_BANNER: false },
					onload : function () {
						if (isInit) {
							api.dispose();
							isInit = false;
						} else {
							isInit = true;
						}
					}
				};
				api = new JitsiMeetExternalAPI(domain, options);
				iframe = api.getIFrame();
			}
		};

		document.getElementById("stop").onclick = function() {
			//destroy iframe jisti
			api.dispose();
			isInit = false;
		};
	};

	window.onresize = function(e){
		//event resize for window
		iframe.style.width = document.getElementById("body").clientWidth- 10 +"px";
	}
	window.Asc.plugin.button = function() {		
		this.executeCommand("close", "");
	};


})(window, undefined);