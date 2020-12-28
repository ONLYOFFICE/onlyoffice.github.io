(function(window, undefined){

    var txt              = "";
    var translatedText   = [];
    var displayNoneClass = "display-none";
	var blurClass        = "blur";
    var elements         = null;
    var apikey           = "";

    function getMessage(key) {
        return window.Asc.plugin.tr(key);
    }

    function showError(message) {
        if (message) {
            switchClass(elements.error, displayNoneClass, false);
            elements.error.textContent = message;
            setTimeout(function () { window.onclick = function () { showError(); }; }, 100);
        } else {
            switchClass(elements.error, displayNoneClass, true);
            elements.error.textContent = "";
            window.onclick = null;
        }
    }

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

        if (text !== '') {
            var allParsedParas = SplitText(txt);
            var sParams = CreateParams(allParsedParas);
            var target_lang = GetTargetLang();

            Translate(apikey, target_lang, sParams);
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

    function Translate(apikey, targetLanguage, sParams) {
        showLoader(elements, true);
        $.ajax({
            method: 'GET',
            url: 'https://api.deepl.com/v2/translate?auth_key=' + apikey + sParams + '&target_lang=' + targetLanguage,
            dataType: 'json'
        }).success(function (oResponse) {
            container = document.getElementById('display');
            container.innerHTML = "";
            translatedText = [];
            for (var nText = 0; nText < oResponse.translations.length; nText++) {
                translatedText.push(oResponse.translations[nText].text);

                if (oResponse.translations[nText].text !== "")
                    container.innerHTML += oResponse.translations[nText].text + '<br>';
            }
            showLoader(elements, false);
        }).error(function() {
            showLoader(elements, false);
            container = document.getElementById('display');
            if (apikey == '') {
                container.innerHTML = "Apikey required!";
            }
            else {
                container.innerHTML = "Failed!";
            }

        });
    }

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

        setTimeout(function() {
            document.getElementById("copy").onclick = function () {
            selectText("display");
            }
        }, 500);

        $('#select_example').on('change', function() {
            var allParsedParas = SplitText(txt);
            var sParams = CreateParams(allParsedParas);
            var target_lang = GetTargetLang();
            Translate(apikey, target_lang, sParams);
        })

        $('#save').on('click', function() {
            apikey = elements.api_value.value.trim();
            if (apikey !== '') {
                switchClass(elements.api, 'display-none', true);
                switchClass(elements.re_api, 'display-none', false);
                switchClass(elements.translator, 'display-none', false);
            }
            else {
                showError(getMessage("Apikey is empty"));
            }
        })
        $('#reconf').on('click', function() {
            apikey = '';
            switchClass(elements.re_api, 'display-none', true)
            switchClass(elements.api, 'display-none', false);
            switchClass(elements.translator, 'display-none', true);
        })

        setTimeout(function() {
            $('#paste').click(function () {
                Asc.scope.arr = translatedText;
                window.Asc.plugin.callCommand(function() {
                    Api.ReplaceTextSmart(Asc.scope.arr);
                });
            })
        });
    })

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

})(window, undefined);
