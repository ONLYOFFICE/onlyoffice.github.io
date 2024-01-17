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
	var isInit = false;
	var ifr;
	const isIE = checkInternetExplorer();	//check IE
	var txt;
	var paste_done  = true;
	var translated = '';
	
	window.Asc.plugin.init = function(text)
	{
		if (isIE) {
			showMessage("This plugin doesn't work in Internet Explorer.");
			return;
		}
		if (window.Asc.plugin.info.editorType === 'word') {
			window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false}], function(data) {
				txt = (!data) ? "" : ProcessText(data);
				ExecPlugin();
			});
		} else {
			txt = ProcessText(text);
			ExecPlugin();
		}
	};

	function ExecPlugin() {
		if (!isInit) {
			document.getElementById("iframe_parent").innerHTML = "";
			ifr                = document.createElement("iframe");
			ifr.position	   = "fixed";
			ifr.name           = "google_name";
			ifr.id             = "google_id";
			ifr.src            = "./index_widget.html";//?text=" + encodeURIComponent(text);
			ifr.style.top      = "0px";
			ifr.style.left     = "0px";
			ifr.style.width    = "100%";
			ifr.style.height   = "100%";
			ifr.setAttribute("frameBorder", "0");
			document.getElementById("iframe_parent").appendChild(ifr);
			isInit = true;
			ifr.onload = function() {
				if (ifr.contentWindow.document.readyState == 'complete')
					window.Asc.plugin.onThemeChanged(Asc.plugin.theme);
					setTimeout(function() {
						let element = ifr.contentDocument ? ifr.contentDocument.getElementById("google_translate_element") : null;
						if (element) {
							element.innerHTML = escape(txt);
							if (txt.length)
								ifr.contentDocument.getElementById("div_btn").classList.remove("hidden");
						}
					}, 500);

				var selectElement = ifr.contentDocument.getElementsByClassName('goog-te-combo')[0];
				if (!selectElement) {
					// in this case plugin won't work (it can be problem with region)
					showMessage(window.Asc.plugin.tr("This plugin doesn't work in your region."));
					return;
				}
				selectElement.addEventListener('change', function(event) {
					if (txt || ifr.contentDocument.getElementById("google_translate_element").innerHTML) {
						ifr.contentWindow.postMessage("onchange_goog-te-combo", '*');
						ifr.contentDocument.getElementById("google_translate_element").style.opacity = 0;
					}
				});
				ifr.contentDocument.getElementById("google_translate_element").style.height = "fit-content";
				var btn = ifr.contentDocument.createElement("button");
				var btnReplace = ifr.contentDocument.createElement("button");
				var div = ifr.contentDocument.createElement("div");
				var select = ifr.contentDocument.createElement("select");
				select.id = "select_lang";
				select.classList.add("select-lang");
				select.classList.add("goog-te-combo");
				div.appendChild(btn);
				if (!window.Asc.plugin.info.isViewMode)
					div.appendChild(btnReplace);
				div.id = "div_btn";
				div.classList.add("skiptranslate");
				div.classList.add("div_btn");
				div.classList.add("hidden");
				btn.innerHTML = window.Asc.plugin.tr("Copy");
				btn.id = "btn_copy";
				btn.classList.add("btn-text-default");
				btnReplace.classList.add("btn-text-default");
				btnReplace.innerHTML = window.Asc.plugin.tr("Insert");
				btnReplace.id = "btn_replace";
				setTimeout(function() {
					ifr.contentDocument.getElementById("body").appendChild(div);
					ifr.contentDocument.getElementById(":0.targetLanguage").appendChild(select);
				}, 100);

				setTimeout(function() {
					btnReplace.onclick = function () {
						if (!paste_done)
							return;
						else
							paste_done = false;

						var translatedTxt = ifr.contentDocument.getElementById("google_translate_element").outerText;
						var allParasTxt = translatedTxt.split(/\n/);
						var allParsedParas = [];

						for (var nStr = 0; nStr < allParasTxt.length; nStr++) {
							if (allParasTxt[nStr].search(/	/) === 0) {
								allParsedParas.push("");
								allParasTxt[nStr] = allParasTxt[nStr].replace(/	/, "");
							}
							var sSplited = allParasTxt[nStr].split(/	/);

							sSplited.forEach(function(item, i, sSplited) {
								allParsedParas.push(item);
							});
						}
						Asc.scope.arr = allParsedParas;
						window.Asc.plugin.executeMethod("GetVersion", [], function(version) {
							if (version === undefined) {
								window.Asc.plugin.executeMethod("PasteText", [ifr.contentDocument.getElementById("google_translate_element").outerText], function(result) {
									paste_done = true;
								});
							}
							else {
								window.Asc.plugin.executeMethod("GetSelectionType", [], function(sType) {
									switch (sType) {
										case "none":
										case "drawing":
											window.Asc.plugin.executeMethod("PasteText", [ifr.contentDocument.getElementById("google_translate_element").outerText], function(result) {
												paste_done = true;
											});
											break;
										case "text":
											window.Asc.plugin.callCommand(function() {
												Api.ReplaceTextSmart(Asc.scope.arr);
											}, undefined, undefined, function(result) {
												paste_done = true;
											});
											break;
									}
								});
							}
						});
					}
				});
				ifr.contentWindow.postMessage("update_scroll", '*');
				ifr.contentWindow.postMessage({type: 'translate', text: translated}, '*')
			}
		} else {
			ifr.contentWindow.postMessage(txt, '*');
			ifr.contentDocument.getElementById("google_translate_element").style.opacity = 0;
		}
	};
	function ProcessText(sText) {
		return sText.replace(/	/gi, '\n').replace(/	/gi, '\n');
	};

	function checkInternetExplorer(){
		var rv = -1;
		if (window.navigator.appName == 'Microsoft Internet Explorer') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		} else if (window.navigator.appName == 'Netscape') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');

			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}
		return rv !== -1;
	};

	function showMessage(message) {
		document.getElementById("iframe_parent").innerHTML = "<h4 id='h4' style='margin:5px'>" + message + "</h4>";
	};

	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.onresize = function()
	{
		ifr && ifr.contentWindow.postMessage("update_scroll", '*');
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

	window.Asc.plugin.onTranslate = function()
	{
		var field = document.getElementById("h4");
		if (field)
			field.innerHTML = window.Asc.plugin.tr(field.innerText);

		translated = window.Asc.plugin.tr('Select Language');
	};
	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		var style = document.getElementsByTagName('head')[0].lastChild;
		if (ifr && ifr.contentWindow)
			setTimeout( function() { ifr.contentDocument && ifr.contentWindow.postMessage({type: 'themeChanged', theme: theme, style: style.innerHTML}, '*' ) } ,600 );
	};
	
})(window, undefined);
