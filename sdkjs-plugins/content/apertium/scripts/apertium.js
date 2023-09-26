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
var Ps;
const isIE = checkInternetExplorer();	//check IE
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
function getMessage(key) {
    return window.Asc.plugin.tr(key.trim());
};
(function(window, undefined){

    var txt                 = "";
    var displayNoneClass    = "display-none";
	var blurClass           = "no_class";
    var elements            = null;
    var translatedParas     = [];
    var iterationCount      = 0;
    var curIter             = 0;
    var select              = null;
    var selectClone         = null;
    var allPairs            = {};
    var serviceUrl          = "https://www.apertium.org/"; //paste your service's url address here
    var paste_done          = true;

    function showLoader(elements, show) {

       switchClass(elements.contentHolder, blurClass, show);
       switchClass(elements.loader, displayNoneClass, !show);
    };
    function showLoader2(elements, show) {

       switchClass(elements.contentHolder2, blurClass, show);
       switchClass(elements.loader2, displayNoneClass, !show);
    };
	function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    };

	window.Asc.plugin.init = function(text)
	{
		if (window.Asc.plugin.info.isViewMode)
			document.getElementById("paste").classList.add('hidden');

	    txt = text;
        updateScroll();

        if (!isReadyToTranslate()) {
            console.log('Languages not loaded!');
            return false;
        }

        RunTranslate(txt);
	};

    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);

        var rule = ''
        if (theme.type == 'dark') {
            rule += '.asc-plugin-loader .asc-loader-image { background-image : url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgcj0iMTAuMjUiIHN0cm9rZS1kYXNoYXJyYXk9IjE2MCUsIDQwJSIgLz48L3N2Zz4=) !important;}\n';
        }
        else if (theme.type == 'light') {
            rule += '.asc-plugin-loader .asc-loader-image { background-image : url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9IjEuNSIgcj0iNy4yNSIgc3Ryb2tlLWRhc2hhcnJheT0iMTYwJSwgNDAlIiAvPjwvc3ZnPg==) !important;}\n';
        }
        rule += ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);

        if (!isIE) {
            $('.asc-loader-title').css('color', window.Asc.plugin.theme["text-normal"]);
            $('#show_manually, #hide_manually').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme["text-normal"]);
            $('#arrow-svg-path').css('fill', theme["text-normal"]);
        }
    };

    function PrepareTextToSend(allParas) {
        var result = [];
        for (var nPara = 0; nPara < allParas.length; nPara++) {
            result.push({Index : nPara, Text : allParas[nPara].replace(/ /gi, "+")});
        }
        return result;
    };

    function IsLastTransate(arrParas) {
        if (arrParas.length !== translatedParas.length)
            return false;
        for (var nPara = 0; nPara < arrParas.length; nPara++) {
            if (arrParas[nPara] !== translatedParas[nPara])
                return false;
        }
        return true;
    };
    function GetSourceLang() {
        return document.getElementById("source").value;
    };
    function GetTargetLang() {
        return document.getElementById("target").value;
    };

    //don't work with default(web) service
    function IdentifyLang() {
        $.ajax({
            method: 'GET',
            url: serviceUrl + 'apy/listPairs',
            dataType: 'json'
        }).success(function (oResponse) {
            var maxPredicVal = 0;
            var maxPredict = null;

            for (var predict in oResponse) {
                if (oResponse[predict] > maxPredicVal) {
                    maxPredicVal = oResponse[predict];
                    maxPredict = predict;
                }
            }
        }).error(function(){

        });
    };

    function GetAllLangPairs() {
        $.ajax({
            method: 'GET',
            url: serviceUrl + 'apy/list?',
            dataType: 'json'
        }).success(function (oResponse) {
            var sourceLang = oResponse.responseData[0].sourceLanguage;
            var targetLang = oResponse.responseData[0].targetLanguage;

            allPairs[sourceLang] = [targetLang];

            for (var nPair = 1; nPair < oResponse.responseData.length; nPair++) {
                if (oResponse.responseData[nPair].sourceLanguage === sourceLang) {
                    allPairs[sourceLang].push(oResponse.responseData[nPair].targetLanguage);
                }
                else {
                    sourceLang = oResponse.responseData[nPair].sourceLanguage;
                    targetLang = oResponse.responseData[nPair].targetLanguage;
                    allPairs[sourceLang] = [targetLang];
                }
            }

            AddLangOptions(allPairs);
        }).error(function(){
            showLoader2(elements, false);
        });
    };

    function AddLangOptions(allPairs) {
        var sUrlRequest = 'listLanguageNames?locale=en&languages='
        for (var sLang in allPairs) {
            sUrlRequest += sLang + '+';
        }
        $.ajax({
            method: 'GET',
            url: serviceUrl + 'apy/' + sUrlRequest,
            dataType: 'json'
        }).success(function (oResponse) {
            var sourceLang     = GetSourceLang();

            for (var sLang in oResponse) {
                $("#source").append($("<option>", {
                    value: sLang,
                    text: oResponse[sLang],
                    class: "source"
                    }));
                $("#target").append($("<option>", {
                    value: sLang,
                    text: oResponse[sLang],
                    class: "target"
                    }
                ));
            }
            $("#source option[value=eng]").prop('selected', true);
            select = $('#target');
            selectClone = select.clone();
            updateSelect(allPairs["eng"]);
            showLoader2(elements, false);

            RunTranslate(txt);

            $('.prefs__locale_target').on('change', function() {
                translatedParas = [];
                RunTranslate(txt);
            });
        }).error(function(){
            showLoader2(elements, false);
        });
    };

    function Translate(sourceLanguage, targetLanguage, oText) {
        if (!$('#vanish_container').hasClass('display-none'))
            $('#vanish_container').toggleClass('display-none');
        showLoader(elements, true);
        $.ajax({
            method: 'GET',
            url: serviceUrl + 'apy/translate?markUnknown=no&langpair=' + sourceLanguage + '|' + targetLanguage + '&q=' + oText.Text,
            dataType: 'json'
        }).success(function (oResponse) {
            translatedParas[oText.Index] = oResponse.responseData.translatedText;

            curIter++;
            if (curIter === iterationCount) {
                container = document.getElementById('txt_shower');
                container.innerHTML = "";
                for (var nText = 0; nText < translatedParas.length; nText++) {
                    if (translatedParas[nText] !== "" && translatedParas[nText])
                        container.innerHTML += escape(translatedParas[nText]) + '<br>';
                }
                if ($('#vanish_container').hasClass('display-none'))
                    $('#vanish_container').toggleClass('display-none');
                updateScroll();
                updateScroll();
                showLoader(elements, false);
            }
            else if (curIter > iterationCount) {
                updateScroll();
                updateScroll();
                showLoader(elements, false);
            }
        }).error(function(error) {
            if (error.readyState === 4 && error.status === 200) {
                translatedParas[oText.Index] = oText.Text;

                curIter++;
                if (curIter === iterationCount) {
                    container = document.getElementById('txt_shower');
                    container.innerHTML = "";
                    for (var nText = 0; nText < translatedParas.length; nText++) {
                        if (translatedParas[nText] !== "" && translatedParas[nText])
                            container.innerHTML += escape(translatedParas[nText]) + '<br>';
                    }
                    if ($('#vanish_container').hasClass('display-none'))
                        $('#vanish_container').toggleClass('display-none');
                    updateScroll();
                    updateScroll();
                    showLoader(elements, false);
                }
                else if (curIter > iterationCount) {
                    updateScroll();
                    updateScroll();
                    showLoader(elements, false);
                }
            }
            else {
                showLoader(elements, false);
                container = document.getElementById('txt_shower');
                container.innerHTML = "Failed!"
            }
        });
    };

    function DelInvalidChars(arrParas) {
        for (var nPara = 0; nPara < arrParas.length; nPara++) {
            var sSearch = '?';
            var replaceWith = '%3F';
            arrParas[nPara] = arrParas[nPara].split(sSearch).join(replaceWith);

            sSearch = '#';
            replaceWith = '%23';
            arrParas[nPara] = arrParas[nPara].split(sSearch).join(replaceWith);

            sSearch = '&';
            replaceWith = '%26';
            arrParas[nPara] = arrParas[nPara].split(sSearch).join(replaceWith);
        }
    };

    function processText(sTxt){
        if (sTxt[sTxt.length - 1] === '\n')
            sTxt = sTxt.slice(0, sTxt.length - 1);

	    var splittedParas = sTxt.split('\n');
        var parasToTranslate = [];

        if (txt.trim() !== "")
            document.getElementById("enter_container").value = sTxt;

	    return splittedParas;
	};

    function selectText(id) {
        var sel, range;
        var el = document.getElementById(id); //get element id
        if (window.getSelection && document.createRange) { //Browser compatibility
        sel = window.getSelection();
        if (sel.toString() == '') { //no text selection
            window.setTimeout(function(){
                range = document.createRange(); //range object
                range.selectNodeContents(el); //sets Range
                sel.removeAllRanges(); //remove all ranges from selection
                sel.addRange(range);//add Range to a Selection.
                document.execCommand("copy"); //copy
                sel.removeAllRanges(); //remove all ranges from selection
            },1);
        }
        } else if (document.selection) { //older ie
            sel = document.selection.createRange();
            if (sel.text == '') { //no text selection
                range = document.body.createTextRange();//Creates TextRange object
                range.moveToElementText(el);//sets Range
                range.select(); //make selection.
                document.execCommand("copy"); //copy
            }
        }
    }

    function updateSelect(arrTargetLangs) {
        // first, remove all options
        select.find("option").remove();

        var options = [];

        for (var nLang = 0; nLang < arrTargetLangs.length; nLang++) {
            options.push(selectClone.find("option[value=" + arrTargetLangs[nLang] + "]").clone()[0]);
        }

        select.append(options);

        // update select2
        select.trigger('change');
    }

    function isReadyToTranslate() {
        if ($('#source').val() == null)
            return false;
        return true;
    };

    $(document).ready(function () {
        document.getElementById("enter_container").value = "";

        $('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width: "100%"
		});
        elements = {
            loader: document.getElementById("loader-container"),
            loader2: document.getElementById("loader-container2"),
            contentHolder: document.getElementById("display"),
            contentHolder2: document.getElementById("main_panel"),
            translator: document.getElementById("translator"),
            select: document.getElementById("select_example"),
		};

        Ps = new PerfectScrollbar("#display", {suppressScrollX  : true});
        showLoader2(elements, true);
        GetAllLangPairs();

        setTimeout(function() {
            document.getElementById("copy").onclick = function () {
                if (isReadyToTranslate())
                    selectText("txt_shower");
            }
        }, 500);

        $('.prefs__locale_source').on('change', function() {
            updateSelect(allPairs[GetSourceLang()]);
        });

        setTimeout(function() {
            $('#paste').click(function () {
                if (isReadyToTranslate()) {
                    if (!paste_done)
                        return;
                    else
                        paste_done = false;

                    Asc.scope.arr = translatedParas;
                    window.Asc.plugin.info.recalculate = true;

                    window.Asc.plugin.executeMethod("GetVersion", [], function(version) {
                        if (version === undefined) {
                           window.Asc.plugin.executeMethod("PasteText", [$("#txt_shower")[0].innerText], function(result) {
                                paste_done = true;
                           });
                        }
                        else {
                            window.Asc.plugin.executeMethod("GetSelectionType", [], function(sType) {
                                switch (sType) {
                                    case "none":
                                    case "drawing":
                                        window.Asc.plugin.executeMethod("PasteText", [$("#txt_shower")[0].innerText], function(result) {
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
                return;
            })
        });

        var textShower = document.getElementById('txt_shower');
        textShower.addEventListener('copy', function(event) {
            const selection = document.getSelection();
            event.clipboardData.setData('text/html', selection.toString());
            event.clipboardData.setData('text/plain', selection.toString());
            event.preventDefault();
        });
        $('#show_manually').click(function() {
            $(this).hide();
            $('#hide_manually').show();
            $('#enter_container').show();
            updateScroll();
        });
        $('#hide_manually').click(function() {
            $(this).hide();
            $('#show_manually').show();
            $('#enter_container').hide();
            updateScroll();
        });

        function delay(callback, ms) {
            var timer = 0;
            return function() {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                    }, ms || 0);
            };
        };
        $('#enter_container').keyup(delay(function(e) {
            updateScroll();
            txt = document.getElementById("enter_container").value;
            switch (window.Asc.plugin.info.editorType) {
                case 'word':
                case 'slide': {
                    if (txt !== "") {
                        ExecApertium(txt);
                    }
                    break;
                }
                case 'cell': {
                    ExecApertium(txt);
                }
                break;
            }
        }, 1000));
    });

    function ExecApertium(sText) {
        if (sText.trim() === "")
            return;
            
        curIter = 0;
        var source_lang = GetSourceLang();
        var allParas = processText(sText);
        DelInvalidChars(allParas);
        if (IsLastTransate(allParas))
            return false;

        translatedParas = [];
        document.getElementById('txt_shower').innerHTML = "";

        var target_lang = GetTargetLang();
        var txtToTranslate = PrepareTextToSend(allParas);
        iterationCount = 0;
        for (var nText = 0; nText < txtToTranslate.length; nText++) {
            if (txtToTranslate[nText].Text === "" || txtToTranslate[nText].Text === "?")
                continue;
            iterationCount++;
        }

        for (var nText = 0; nText < txtToTranslate.length; nText++) {
            if (txtToTranslate[nText].Text === "" || txtToTranslate[nText].Text === "?") {
                translatedParas[nText] = txtToTranslate[nText].Text;
                continue;
            }
            Translate(source_lang, target_lang, txtToTranslate[nText]);
        }
    }
    function RunTranslate(sText) {
        switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                    sText = data.replace(/\r/g, ' ');
                    ExecApertium(sText);
                });
                break;
            }
            case 'cell':
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                    if (data == '')
                        sText = txt.replace(/\r/g, ' ').replace(/\t/g, '\n');
                    else {
                        sText = data.replace(/\r/g, ' ');
                    }
                    ExecApertium(sText);
                });
                break;
        }
    };

    function updateScroll()
	{
		Ps && Ps.update();
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

        $('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width: "100%"
		});
		document.dispatchEvent(evt);
	};
	window.Asc.plugin.onTranslate = function()
	{
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            if (el.innerText) el.innerText = getMessage(el.innerText);
        }
    };

})(window, undefined);
