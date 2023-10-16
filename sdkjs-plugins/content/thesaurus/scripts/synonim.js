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
(function(window, undefined) {
	window.oncontextmenu = function(e) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};
	
	var ApiKey = localStorage.getItem("UserApiKey_Thesaurus") || "34aacef03e39ff2e622f10d1fc5313f3", // generated APi key on https://words.bighugelabs.com
		SynonimFormat = "json",
		version = 2,
		synonim_data = "",
		inputSerch,
		isInit = false,
		isInitp = false,
		predata = "";
	
	$(document).ready(function() {
		//event mouseout label
		$('body').on('mouseout', '.label-words', function() {
			$(this).removeClass('label-selected');
		});
		//event mouseover	label
		$('body').on('mouseover', '.label-words', function() {
			$(this).addClass('label-selected');
		});
		//event click label
		$('body').on('click', '.label-words', function() {
			if (!window.Asc.plugin.info.isViewMode)
				window.Asc.plugin.executeMethod("PasteText", [$(this).text() +" "]);	
		});
		//event button click
		btn_search = document.getElementById("btn_search");
		btn_search.onclick = function() {
			synonim_data = inputSerch.value.trim();
			if ('' !== synonim_data && null !== synonim_data) {
				if (predata !== synonim_data) {
					$('#global').empty(); // cleared global div
					synonim();
				}
			} else {
				$('#global').empty(); // cleared global div
			}
		};
		inputApiKey = document.getElementById("inp_ApiKey");
		btnEnterApiKey = document.getElementById("btn_enterApiKey");
		btnShowApiKey = document.getElementById("btn_showApiKey");
		btnShowApiKey.onclick = function() {
			divApiKey = document.getElementById("div_ApiKey");
			if (divApiKey.style.display == "none") {
				divApiKey.style.display = "block";
				inputApiKey.value = ApiKey;
			} else {
				divApiKey.style.display = "none";
				inputApiKey.value = "";
			}
		};
		btnEnterApiKey.onclick = function() {
			ApiKey = inputApiKey.value.trim();
			localStorage.setItem("UserApiKey_Thesaurus", ApiKey);
			btnShowApiKey.onclick();
		};
	});	

	function synonim() {
		if (!isInit) {
			var container = document.getElementById('scrollable-container-id');			
			Ps = new PerfectScrollbar('#' + container.id, {});
			updateScroll();
			updateScroll();
			isInit = true;
		}
		predata = synonim_data;
		var xhr = new XMLHttpRequest();
		var req_text = decodeURIComponent(synonim_data.replace('%0D%0A', ' ').replace(/%/g, "$")).trim();
		var _url = "https://words.bighugelabs.com/api/";
		_url += version + "/";
		_url += ApiKey + "/";
		_url += req_text + "/";
		_url += SynonimFormat;
		xhr.open('GET', _url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if (this.readyState === 4) {
				switch (this.status) {
					case 401:
					case 403:
						synonim();
						break;
					case 404:
						$('#global').append("<h3 id = \"not_found\" class = \"not-found\">" + window.Asc.plugin.tr("This word not found") + "</h3>"); //if synonym not found
						break;
					case 500:
						$('#global').append("<h3 id = \"not_found\" class = \"not-found\">"+this.statusText+"</h3>"); //if synonym not found
						break;
					case 200:
						if (!closed) {
							try {
								var _obj  = JSON.parse(this.responseText);
								if (_obj.noun)			//if noun exist
									drawWords(_obj.noun,"Noun");
			
								if(_obj.adjective)		//if andjective exist
									drawWords(_obj.adjective,"Adjective")
			
								if(_obj.verb)		//if verb exist
									drawWords(_obj.verb,"Verb")
							}
							catch (err){}
						}
				}
				updateScroll();
				updateScroll();
			}
		};
		xhr.send(null);
	};

	window.Asc.plugin.init = function(text)	{
		synonim_data = text.trim();
		if (!isInitp) {
			inputSerch = document.getElementById("inp_search");
			isInitp = true;
		}
		$('#global').empty(); // cleared global div
		window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(160)}], function(data) {
			var val =  (data === undefined) ? "" : (data.trim() == '') ? synonim_data : data.replace(/\r/g, ' ').trim();
			inputSerch.value = val;
			synonim_data = val;
			if (synonim_data && synonim_data !== "" && predata !== synonim_data)
				synonim();

			predata = val;
		});
	};
	
	window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};
	
	window.onresize = function() {
		updateScroll();
		updateScroll();
	};

	window.Asc.plugin.onExternalMouseUp = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};
	
	//draws the structure of the plugin
	function drawWords(response, type) {
		$('#global').append("<h3 class = \"h3-caption\">" + window.Asc.plugin.tr(type) + "</h3>");
		$('#global').append("<div id = " + type + " ></div>");
		if (response.syn && response.syn.length) {
			$("#"+type).append("<div id =\""+ type +"-synonims\" class = \"div-words\"></div>");
			for (let i = 0; i < response.syn.length; i++)
				$('#'+ type +'-synonims').append("<label class =\"label-words\">"+ response.syn[i] +"</label>");
		}
		if (response.ant && response.ant.length) {
			$("#"+type).append("<h3 class = \"h3-caption\">" + window.Asc.plugin.tr("Antonyms") + "</h3>");
			$("#"+type).append("<div id =\""+ type +"-antonyms\" class = \"div-words\"></div>");
			for (let i=0; i<response.ant.length; i++)
				$('#'+ type +'-antonyms').append("<label class =\"label-words\">"+ response.ant[i] +"</label>");
		}
	};

	function updateScroll() {
		Ps && Ps.update();
	};

	window.Asc.plugin.onTranslate = function() {
		var btn_search = document.getElementById("btn_search");
		if (btn_search)
			btn_search.innerHTML = window.Asc.plugin.tr("Lookup");
		var inp_search = document.getElementById("inp_search");
		if (inp_search)
			inp_search.placeholder = window.Asc.plugin.tr("Search");
		var inp_ApiKey = document.getElementById("inp_ApiKey");
		if (inp_ApiKey)
			inp_ApiKey.title = window.Asc.plugin.tr("Title");
			
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
	};
		  
})(window, undefined);