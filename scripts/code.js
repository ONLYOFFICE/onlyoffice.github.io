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
(function(window, undefined){

	var iframe,
		isInit = false,
		api;
	
	window.Asc.plugin.init = function () {
		//event "init" for plugin
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
	};

})(window, undefined);