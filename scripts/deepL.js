var Ps;
(function(window, undefined){

    var txt              = "";
    var translatedText   = [];
    var displayNoneClass = "display-none";
	var blurClass        = "no_class";
    var elements         = null;
    var apikey           = "";
    var isValidKey       = false;

	function showLoader(elements, show) {

       switchClass(elements.contentHolder, blurClass, show);
       switchClass(elements.loader, displayNoneClass, !show);
    }

	function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

	window.Asc.plugin.init = function(text)
	{
        $('#select_example').select2({
			minimumResultsForSearch: Infinity,
		});

        txt = text;

        if (txt !== '') {
            RunTranslate(txt);
        }
	};

    function CreateParams(allParas) {
        var sRequest = "";

        for (var nPara = 0; nPara < allParas.length; nPara++) {
            sRequest += '&text=' + allParas[nPara];
        }

        return sRequest;
    }

    function GetTargetLang() {
        return document.getElementsByClassName("prefs__set-locale")[0].value;
    }

    function DelInvalidChars(arrParas) {
        for (var nPara = 0; nPara < arrParas.length; nPara++) {
            arrParas[nPara] = arrParas[nPara].replace(/#/gi, '');
            arrParas[nPara] = arrParas[nPara].replace(/&/gi, '');
        }
    };

    function Translate(apikey, targetLanguage, sParams) {
        showLoader(elements, true);
        $.ajax({
            method: 'POST',
            beforeSend: function(request) {
				request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
			},
			data: '?auth_key=' + apikey + sParams  + '&target_lang=' + targetLanguage,
            url: 'https://api.deepl.com/v2/translate?auth_key=' + apikey

        }).success(function (oResponse) {
            isValidKey = true;
            if ($('#txt_shower').hasClass('error'))
                $('#txt_shower').toggleClass('error');
            if ($('#api-value').hasClass('error_api'))
                $('#api-value').toggleClass('error_api');
            $('#img_error').hide();

            localStorage.setItem('deepL_Apikey', apikey);

            //switching menu
            switchClass(elements.api, 'display-none', true);
            switchClass(elements.re_api, 'display-none', false);
            switchClass(elements.translator, 'display-none', false);

            container = document.getElementById('txt_shower');
            container.innerHTML = "";
            for (var nText = 0; nText < oResponse.translations.length; nText++) {
                translatedText.push(oResponse.translations[nText].text);

                if (oResponse.translations[nText].text !== "")
                    container.innerHTML += oResponse.translations[nText].text + '<br>';
            }
            updateScroll();
            updateScroll();
            showLoader(elements, false);
        }).error(function(oResponse) {
            isValidKey = false;
            showLoader(elements, false);
            container = document.getElementById('txt_shower');
            if (!$('#txt_shower').hasClass('error'))
                $('#txt_shower').toggleClass('error');

            if (apikey == '') {
                container.innerHTML = "API key required!";
            }
            else {
                if (oResponse.status === 403) {
                    $('#api_empty').hide();
                    $('#img_error').show();
                    if (!$('#api-value').hasClass('error_api'))
                        $('#api-value').toggleClass('error_api');
                }
                else
                    container.innerHTML = "Connection failed!";
            }
        });
    };

    function SplitText(sText) {
        var allParasInSelection = sText.split(/\n/);
        var allParsedParas = [];

        for (var nStr = 0; nStr < allParasInSelection.length; nStr++) {
            if (allParasInSelection[nStr].search(/	/) === 0) {
                allParsedParas.push("");
                allParasInSelection[nStr] = allParasInSelection[nStr].replace(/	/, "");
            }
            var sSplited = allParasInSelection[nStr].split(/	/);

            sSplited.forEach(function(item, i, sSplited) {
                allParsedParas.push(item);
            });
        }

        return allParsedParas;
    }

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

    $(document).ready(function () {
        elements = {
            loader: document.getElementById("loader-container"),
            contentHolder: document.getElementById("display"),
            api: document.getElementById("api"),
            api_value: document.getElementById("api-value"),
            re_api: document.getElementById("re-api"),
            translator: document.getElementById("translator"),
            select: document.getElementById("select_example"),
            error: document.getElementById("errorWrapper")
		};

        Ps = new PerfectScrollbar("#display", {suppressScrollX: true});

        setTimeout(function() {
            document.getElementById("copy").onclick = function () {
            selectText("txt_shower");
            }
        }, 500);

        $('#select_example').on('change', function() {
            translatedText = [];
            if (txt !== '')
                RunTranslate(txt);
        })

        $('#save').on('click', function() {
            $('#select_example').select2({
                minimumResultsForSearch: Infinity,
                width: "calc(100% - 24px)"
		    });
		    apikey = elements.api_value.value.trim();
		    if (apikey !== '') {
		        window.Asc.plugin.executeMethod("GetSelectedText", [], function(sText) {
                    document.getElementById('txt_shower').innerHTML = '';
                    var allParsedParas = SplitText(sText);
                    DelInvalidChars(allParsedParas);
                    var sParams = CreateParams(allParsedParas);
                    var target_lang = GetTargetLang();
                    Translate(apikey, target_lang, sParams);
                });
            }
            else {
                if (!$('#txt_shower').hasClass('error'))
                    $('#txt_shower').toggleClass('error');
                if (!$('#api-value').hasClass('error_api'))
                    $('#api-value').toggleClass('error_api');
                $('#img_error').hide();
                $('#api_empty').show();
            }
        })
        $('#reconf').on('click', function() {
            apikey = '';
            saved_key = localStorage.getItem('deepL_Apikey');
            if (saved_key !== null) {
                elements.api_value.value = saved_key;
            }
            switchClass(elements.re_api, 'display-none', true)
            switchClass(elements.api, 'display-none', false);
            switchClass(elements.translator, 'display-none', true);
            $(elements.api_value).focus();
        })
        $(elements.api_value).focus(function(){
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        setTimeout(function() {
            $('#paste').click(function () {
                Asc.scope.arr = translatedText;
                window.Asc.plugin.info.recalculate = true;

                window.Asc.plugin.callCommand(function() {
                    Api.ReplaceTextSmart(Asc.scope.arr);
                });
            })
        });

        apikey = localStorage.getItem('deepL_Apikey');
        if (apikey !== null) {
            switchClass(elements.api, 'display-none', true);
            switchClass(elements.re_api, 'display-none', false);
            switchClass(elements.translator, 'display-none', false);
        }
        else
            apikey = '';
    })

    function updateScroll()
	{
		Ps && Ps.update();
	};

	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

    function IsLastTransate(arrParas) {
        if (arrParas.length !== translatedText.length)
            return false;
        for (var nPara = 0; nPara < arrParas.length; nPara++) {
            if (arrParas[nPara] !== translatedText[nPara])
                return false;
        }
        return true;
    };

    function RunTranslate(sText) {

        var allParsedParas = SplitText(sText);
        DelInvalidChars(allParsedParas);
        if (IsLastTransate(allParsedParas))
            return false;
        var sParams = CreateParams(allParsedParas);
        var target_lang = GetTargetLang();

        document.getElementById('txt_shower').innerHTML = '';
        translatedText = [];
        Translate(apikey, target_lang, sParams);
    };
	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
		$('#select_example').select2({
            minimumResultsForSearch: Infinity,
            width: "calc(100% - 24px)"
        });
	};

})(window, undefined);
