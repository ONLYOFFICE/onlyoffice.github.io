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
var PsTextArea;
(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

	var isInit = false;
	var CurLang = "auto";
	var sText = "";
	var displayNoneClass = "display-none";
    var elements         = null;
    var serviceUrl = "https://languagetool.org/api/v2/check";
    var sPathRoot = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index.html", "vendor/grammalecte-sdk/grammalecte");
    var oGramma = null;
    var aResults = [];
	function showLoader(elements, show) {
       switchClass(elements.loader, displayNoneClass, !show);
    };

	function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    };
    function ConcatResults(arrResults) {
        var allParas          = SplitText(document.getElementById("textarea").innerText);
        var nCharsCountBefore = 0;
        var nCurMistakeIndex  = 1;
        var aConcatResults    = [];

        for (var nResult = 0; nResult < arrResults.length; nResult++) {
            for (var nGrammErr = 0; nGrammErr < arrResults[nResult].aGrammErr.length; nGrammErr ++) {
                arrResults[nResult].aGrammErr[nGrammErr].nStart += nCharsCountBefore === 0 ? nCharsCountBefore : nCharsCountBefore + nResult;
                arrResults[nResult].aGrammErr[nGrammErr].nEnd += nCharsCountBefore === 0 ? nCharsCountBefore : nCharsCountBefore + nResult;
                arrResults[nResult].aGrammErr[nGrammErr].i = nCurMistakeIndex++;
                nCharsCountBefore += allParas[nResult].length;
                aConcatResults.push({
                    nStart : arrResults[nResult].aGrammErr[nGrammErr].nStart,
                    nEnd : arrResults[nResult].aGrammErr[nGrammErr].nEnd,
                    aSuggestions : arrResults[nResult].aGrammErr[nGrammErr].aSuggestions,
                    nIndex : arrResults[nResult].aGrammErr[nGrammErr].i,
                    sMessage : arrResults[nResult].aGrammErr[nGrammErr].sMessage
                });
            }
            for (var nSpellErr = 0; nSpellErr < arrResults[nResult].aSpellErr.length; nSpellErr ++) {
                arrResults[nResult].aSpellErr[nSpellErr].nStart += nCharsCountBefore === 0 ? nCharsCountBefore : nCharsCountBefore + nResult;
                arrResults[nResult].aSpellErr[nSpellErr].nEnd += nCharsCountBefore === 0 ? nCharsCountBefore : nCharsCountBefore + nResult;
                arrResults[nResult].aSpellErr[nSpellErr].i = nCurMistakeIndex++;
                nCharsCountBefore += allParas[nResult].length;
                aConcatResults.push({
                    nStart : arrResults[nResult].aSpellErr[nSpellErr].nStart,
                    nEnd : arrResults[nResult].aSpellErr[nSpellErr].nEnd,
                    aSuggestions : arrResults[nResult].aSpellErr[nSpellErr].aSuggestions,
                    nIndex : arrResults[nResult].aSpellErr[nSpellErr].i,
                    sMessage : arrResults[nResult].aSpellErr[nSpellErr].sMessage || "Possible mistake"
                })
            }
        }
        return aConcatResults;
    };
	window.Asc.plugin.init = function(text)	{
		sText = text;
		document.getElementById("textarea").innerText = text;
		if (!isInit) {
			init();
			isInit = true;
		}
	};
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        var rule = '.arrow { border-color : ' + window.Asc.plugin.theme["text-normal"] + ';}'
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
    };

	$(document).ready(function () {
	    elements = {
            loader: document.getElementById("loader-container"),
            contentHolder: document.getElementById("result"),
		};
        PsTextArea = new PerfectScrollbar("#enter_container", { suppressScrollX  : true});

        oGramma = new GrammarChecker(sPathRoot, ["Grammalecte", "Graphspell", "TextFormatter", "Lexicographer", "Tokenizer"], "fr");
		$('#check').on('click', function(){
			sText = document.getElementById("textarea").innerText.trim();
			if (sText !== "") {
				$("#result").empty();
				aResult = checkText(sText);
				parseResult(aResult);
				if (window.Asc.plugin.theme)
				    $('.result_div').css('background', window.Asc.plugin.theme["background-normal"]);
				showLoader(elements, false);
			};
		});
		$('#replace').click(function () {
            Asc.scope.arr = SplitText(document.getElementById("textarea").innerText);
            window.Asc.plugin.info.recalculate = true;

            // for usual paste
            var strResult = "";
            for (var Item = 0; Item < Asc.scope.arr.length; Item++) {
                if (Asc.scope.arr[Item] === "")
                    continue;
                if (Item < Asc.scope.arr.length - 1)
                    strResult += Asc.scope.arr[Item] + '\n';
                else
                    strResult += Asc.scope.arr[Item];
            }

            window.Asc.plugin.executeMethod("GetVersion", [], function(version) {
                if (version === undefined) {
                    window.Asc.plugin.executeMethod("PasteText", [strResult]);
                }
                else {
                    window.Asc.plugin.executeMethod("GetSelectionType", [], function(sType) {
                        switch (sType) {
                            case "none":
                            case "drawing":
                                window.Asc.plugin.executeMethod("PasteText", [strResult]);
                                break;
                            case "text":
                                window.Asc.plugin.callCommand(function() {
                                    Api.ReplaceTextSmart(Asc.scope.arr);
                                });
                                break;
                        }
                    });
                }
            });
        });
	});

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
                allParsedParas.push(item.replace(/\r\n?/g, ''));
            });
        }

        return allParsedParas;
    };

	function checkText(sText) {
	    updateScroll();
	    showLoader(elements, true);

        aResults = ConcatResults(oGramma.parseAndSpellcheck(sText, "FR", false, false, oInfo={}))
        return aResults;
	};

	function parseResult (arrResults) {
        if (arrResults.length === 0) {
            $('<div>', {
                id: "no_mistakes",
                text: "No possible mistakes found"
            }).appendTo('#result');
        }
        else {
            $('<div>', {
                id: "yes_mistakes",
                text: "Possible mistakes found: " + arrResults.length
            }).appendTo('#result');
        }

		arrResults.forEach(function(el, ind) {
		    if (el.aSuggestions.length === 0) {
		        var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
			    $('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));
			    return;
		    }

			$('<div>', {
				id : "div_" + el.nIndex,
				"class": 'result_div',
				click: function() {
				        var mainElm = this;
                        $(this).find(".details").slideToggle("fast", function() {
                            updateScroll();
                            $(mainElm).find(".separator").toggleClass("display-none");
                        });
                        $(this).find(".arrow").toggleClass("down");
                        $(this).find(".arrow").toggleClass("up");
                    }
			}).appendTo('#result');

            var img_arrow = $('<i>', {
                "class": "arrow down",
            });
            var img_container = $('<div>', {
                "class": "arrow_container"
            });
            var caption_text = $('<span>', {
				"class": 'caption_text',
				text : el.sMessage
			});
            var caption = $('<div>', {
				"class": 'caption',
			});
            var separateLine = $('<div>', {
				"class": 'separator horizontal display-none',
			});

            img_arrow.appendTo(img_container);
            caption_text.appendTo(caption);
            img_container.appendTo(caption);
            caption.appendTo('#div_'+ el.nIndex);
            separateLine.appendTo('#div_'+ el.nIndex);

            var div_details = $('<div>', {
				"class": 'details'
			});

			$('<div>', {
				id : "div_replacments_" + el.nIndex,
				"class": 'replacments',
			}).appendTo(div_details);

			div_details.appendTo('#div_'+ el.nIndex);

			el.aSuggestions.forEach(function(elem) {
			    var sClass = '';
			    if (elem === ' ')
			        sClass = ' replacment_space';
				$('<button>', {
					"class": 'replacment btn-text-default' + sClass,
					text: elem,
					click : function () {
						var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
			            $('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));
						correctText($(this));
					}
				}).data({ index : el.nIndex })
				.appendTo('#div_replacments_' + el.nIndex);
			});

			var dismiss_buttons = $('<div>', {
			    "class": "dismiss_buttons"
			});

			$('<button>', {
			    text: "Dismiss",
			    click: function () {
					$('#div_'+$(this).data().nIndex).remove();
					var ind = aResults.findIndex(function(el) {
						if (el.i === ind) {
							return true;
						}
					});
					var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
					$('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));
					aResults.splice(ind, 1);
				},
			    "class": "dismiss btn-text-default"
			}).data({ index : el.nIndex}).appendTo(dismiss_buttons);

			$('<button>', {
			    text: "Dismiss all",
			    click: function () {
					$('.dismiss').each(function() {
					     $(this).trigger("click");
					});
				},
			    "class": "dismiss_all btn-text-default"
			}).appendTo(dismiss_buttons);
			dismiss_buttons.appendTo(div_details);
		});
		updateScroll();
	};

	function correctText(data) {
	    if (data.text()[0] === '(' && data.text()[data.text().length - 1] === ')') {
	        return data.parent().parent().find('.dismiss').trigger("click");
	    }

		var ind = data.data().index;
		ind = aResults.findIndex(function(el) {
			if (el.nIndex === ind) {
				return true;
			}
		});
		var end = aResults[ind].nEnd;
		var temp = sText.slice(0, aResults[ind].nStart) + data.text() + sText.slice(end);
		var count = sText.length - temp.length;
		aResults.splice(ind, 1);
		sText = temp;
		document.getElementById("textarea").innerText = sText;
		for (var i = ind; i < aResults.length; i++) {
			aResults[i].nStart -= count;
			aResults[i].nEnd -= count;
		}
		$('#div_' + data.data().index).remove();
        $('#check').trigger("click");
		updateScroll();
	};

	function init() {
		var container = document.getElementById('scrollable-container-id');
        Ps = new PerfectScrollbar('#' + container.id, { minScrollbarLength: 20 });
	};
	
	window.Asc.plugin.button = function(id)
	{
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
	
	function updateScroll()
	{
		Ps && Ps.update();
		PsTextArea && PsTextArea.update();
	};

	window.Asc.plugin.onTranslate = function()
	{
		var btn = document.getElementById("check");
		if (btn)
			btn.innerHTML = window.Asc.plugin.tr("Check");
	};
		  
})(window, undefined);