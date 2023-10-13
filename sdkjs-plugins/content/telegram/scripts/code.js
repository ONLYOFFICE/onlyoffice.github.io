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

    window.Asc.plugin.init = function()
    {
		let messageIE = "This plugin is not supported by IE";
		let messageIncognito = "This plugin does not work in the browser's incognito mode. Please switch to normal mode.";
        if ((navigator.userAgent.indexOf("Chrome") !== -1) && (navigator.vendor.indexOf("Google Inc") !== -1) && !window.AscDesktopEditor) {
			//check incognito mode only in chrome
			var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
			if (fs) {
				fs(window.TEMPORARY, 100, function(fs) {
					showFrame();
				}, function(err) {
					createMessage(messageIncognito);
				});
			} 
        } else if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
			createMessage(messageIE);
		} else {
			showFrame();
        }
    };

	function createMessage(message) {
		document.getElementById("iframe").style.display = "none";
		let divMessage = document.getElementById("div_message");
		divMessage.style.display = "flex";
		divMessage.innerHTML = "<p id='message' style='text-align:center; font-size:12pt;'>" + message + "<\/p>";
		divMessage.style.display = "block";
	};

	function showFrame() {
		let frame = document.getElementById("iframe");
		frame.src = "https://evgeny-nadymov.github.io/telegram-react/";
		frame.style.display = "block";
	}

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };

	window.Asc.plugin.onTranslate = function() {
		var elem = document.getElementById("message");
		if (elem)
			elem.innerHTML = window.Asc.plugin.tr(elem.innerHTML);     
    };

})(window, undefined);
