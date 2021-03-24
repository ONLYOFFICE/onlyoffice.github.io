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
	var message = "This plugin doesn't work in Internet Explorer."
	
	window.Asc.plugin.init = function(text)
	{
	   if (isIE) {
		   document.getElementById("iframe_parent").innerHTML = "<h4 id='h4' style='margin:5px'>" + message + "</h4>";
			 return;
		 }
    
	  text = ProcessText(text);

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
					setTimeout(function() {ifr.contentDocument.getElementById("google_translate_element").innerHTML = text;}, 500);
				
				var selectElement = ifr.contentDocument.getElementsByClassName('goog-te-combo')[0];
				selectElement.addEventListener('change', function(event) {
					ifr.contentWindow.postMessage("onchange_goog-te-combo", '*');
					ifr.contentDocument.getElementById("google_translate_element").style.opacity = 0;
				});
				var btn = ifr.contentDocument.createElement("button");
				var btnPaste = ifr.contentDocument.createElement("button");
				var div = ifr.contentDocument.createElement("div");
				div.appendChild(btn);
				div.appendChild(btnPaste);
				div.style = "padding-top:3px; padding-left:3px;"
				btn.innerHTML = window.Asc.plugin.tr("Copy");
				btn.id = "btn_copy";
				btn.style = "font-size: 11px;"
				btnPaste.innerHTML = window.Asc.plugin.tr("Paste");
				btnPaste.id = "btn_paste";
				btnPaste.style = "font-size: 11px;"
				btn.classList.add("skiptranslate");
				btnPaste.classList.add("skiptranslate");
				ifr.contentDocument.getElementById("google_translate_state").style = "display:flex;"
				setTimeout(function() {ifr.contentDocument.getElementById("google_translate_state").appendChild(div);}, 100);

				setTimeout(function() {
                    btnPaste.onclick = function () {
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
                        window.Asc.plugin.callCommand(function() {
                            Api.ReplaceTextSmart(Asc.scope.arr);
                        });
                    }
                });
			}
		} else {
			ifr.contentWindow.postMessage(text, '*');
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

	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
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
		if (isIE) {
			var field = document.getElementById("h4");
			if (field)
				field.innerHTML = message = window.Asc.plugin.tr(message);
		}
		
	};

})(window, undefined);
