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
		document.getElementById("btn_start").onclick = function() {
			if (!isInit) {
				//create iframe jitsi
				const domain = 'meet.jit.si';
				const options = {
					roomName: 'Test meeting',
					width: document.getElementById("body").clientWidth + "px",
					height: document.getElementById("meet").clientHeight - 5 + "px",
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

		document.getElementById("btn_stop").onclick = function() {
			//destroy iframe jisti
			if (api)
				api.dispose();

			isInit = false;
		};
	};

	window.onresize = function(e) {
		//event resize for window
		if (iframe)
			iframe.style.width = document.getElementById("body").clientWidth +"px";
	}

	window.Asc.plugin.button = function() {		
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onTranslate = function() {
		var btn_start = document.getElementById("btn_start");
		if (btn_start)
			btn_start.innerHTML = window.Asc.plugin.tr("Start");
		
		var btn_stop = document.getElementById("btn_stop");
		if (btn_stop)
			btn_stop.innerHTML = window.Asc.plugin.tr("Stop");
	};

})(window, undefined);