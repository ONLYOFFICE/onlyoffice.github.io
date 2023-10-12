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
		api,
		message = "This plugin is not supported by IE";
	
	
	window.Asc.plugin.init = function () {
		//event "init" for plugin
		if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
			document.getElementsByTagName('body')[0].innerHTML = "<div class='div_message'><p id='message' style='text-align:center; font-size:12pt;'>" + message + "<\/p><\/div>";
			return;
		}
		document.getElementById("btn_start").onclick = function() {
			if (!isInit) {
				document.getElementById('inp_room').classList.remove('inp_error');
				document.getElementById("div_err").classList.add("hidden");
				//create iframe jitsi
				const domain = document.getElementById("inp_domain").value.trim() || 'meet.jit.si';
				const roomName = document.getElementById('inp_room').value.trim();
				if (!roomName) {
					//the name of the room cannot be empty
					document.getElementById('inp_room').classList.add('inp_error');
					document.getElementById("div_err").classList.remove("hidden");
					return;
				}
				const options = {
					roomName: roomName,
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
				api.addEventListeners({
					videoConferenceLeft: function () {
						this._parentNode.ownerDocument.getElementById("btn_stop").onclick();
					}
				});				
				iframe = api.getIFrame();
				toogleClass();
			}
		};

		document.getElementById("btn_stop").onclick = function() {
			//destroy iframe jisti
			if (api)
				api.dispose();

			isInit = false;
			toogleClass();
		};

		function toogleClass() {
			document.getElementById('btn_stop').classList.toggle("hidden");
			document.getElementById('btn_start').classList.toggle("hidden");
			document.getElementById('inp_room').classList.toggle("hidden");
			document.getElementById('inp_domain').classList.toggle("hidden");
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

		var inp_room = document.getElementById("inp_room");
		if (inp_room)
			inp_room.placeholder = window.Asc.plugin.tr("Room name");

		var inp_domain = document.getElementById("inp_domain");
		if (inp_domain)
			inp_domain.placeholder = window.Asc.plugin.tr("Domain");

		var elem = document.getElementById("message");
		if (elem)
			elem.innerHTML = message = window.Asc.plugin.tr(message);
	};

})(window, undefined);