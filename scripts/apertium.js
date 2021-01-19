(function(window, undefined){

    var txt              = "";
    var translatedText   = [];
    var displayNoneClass = "display-none";
	var blurClass        = "blur";
    var elements         = null;
    var translatedParas  = [];
    var iterationCount   = 0;
    var curIter          = 0;
    var select           = null;
    var selectClone      = null;
    var allPairs         = {};

    function InitializationParas(nCount) {
        for (var nPara = 0; nPara < nCount; nPara++) {
            translatedParas.push("");
        }
    };
    function showLoader(elements, show) {

       switchClass(elements.contentHolder, blurClass, show);
       switchClass(elements.loader, displayNoneClass, !show);
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
        $('.select_example').select2({
			minimumResultsForSearch: Infinity,
		});

        var sourceLang     = GetSourceLang();
        //HideOptions(sourceLang, allPairs[sourceLang]);
        //updateSelect(allPairs[sourceLang]);
        txt = text;
        if (txt !== '') {
            //var sourceLang = IdentifyLang(PrepareTextToSend(allParas[0]));
            curIter            = 0;
            translatedParas    = [];
            var targetLang     = GetTargetLang();
            var allParas       = SplitText(txt);
            var txtToTranslate = PrepareTextToSend(allParas);
            iterationCount     = txtToTranslate.length - 1;
            InitializationParas(iterationCount);
            for (var nText = 0; nText < txtToTranslate.length; nText++) {
                Translate(sourceLang, targetLang, txtToTranslate[nText]);
            }
        }
	};

    function PrepareTextToSend(allParas) {
        var result = [];
        var preparedTxt = ""
        for (var nPara = 0; nPara < allParas.length; nPara++) {
            result.push({Index : nPara, Text : allParas[nPara].replace(/ /gi, "+")});
        }
        return result;
    };

    function GetSourceLang() {
        return document.getElementById("source").value;
    };
    function GetTargetLang() {
        return document.getElementById("target").value;
    };

    function IdentifyLang() {
        $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/https://www.apertium.org/apy/listPairs',
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
            url: 'https://cors-anywhere.herokuapp.com/https://www.apertium.org/apy/list?',
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

        });
    };

    function AddLangOptions(allPairs) {
        var sUrlRequest = 'listLanguageNames?locale=en&languages='
        for (var sLang in allPairs) {
            sUrlRequest += sLang + '+';
        }
        $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/https://www.apertium.org/apy/' + sUrlRequest,
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
        }).error(function(){

        });
    };
    function Translate(sourceLanguage, targetLanguage, oText) {
        showLoader(elements, true);
        $.ajax({
            method: 'GET',
            url: 'https://cors-anywhere.herokuapp.com/https://www.apertium.org/apy/translate?markUnknown=no&langpair=' + sourceLanguage + '|' + targetLanguage + '&q=' + oText.Text,
            dataType: 'json'
        }).success(function (oResponse) {
            translatedParas[oText.Index] = oResponse.responseData.translatedText;

            if (curIter === iterationCount) {
                container = document.getElementById('display');
                container.innerHTML = "";
                for (var nText = 0; nText < translatedParas.length; nText++) {
                    if (translatedParas[nText] !== "")
                        container.innerHTML += translatedParas[nText] + '<br>';
                }

                showLoader(elements, false);
            }

            curIter++;
        }).error(function() {
            showLoader(elements, false);
            container = document.getElementById('display');
            container.innerHTML = "Failed!"
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

    $(document).ready(function () {
        GetAllLangPairs();
        elements = {
            loader: document.getElementById("loader-container"),
            contentHolder: document.getElementById("display"),
            translator: document.getElementById("translator"),
            select: document.getElementById("select_example"),
		};

        setTimeout(function() {
            document.getElementById("copy").onclick = function () {
            selectText("display");
            }
        }, 500);

        $('.prefs__locale_source').on('change', function() {
            curIter = 0;

            var source_lang = GetSourceLang();
            var allParas = SplitText(txt);

            updateSelect(allPairs[source_lang]);

            var target_lang = GetTargetLang();
            var txtToTranslate = PrepareTextToSend(allParas);
            iterationCount = txtToTranslate.length - 1;

            for (var nText = 0; nText < txtToTranslate.length; nText++) {
                Translate(source_lang, target_lang, txtToTranslate[nText]);
            }
        })

        setTimeout(function() {
            $('#paste').click(function () {
                Asc.scope.arr = translatedParas;
                window.Asc.plugin.callCommand(function() {
                    Api.ReplaceTextSmart(Asc.scope.arr);
                });
            })
        });
    });

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
