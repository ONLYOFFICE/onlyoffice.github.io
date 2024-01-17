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
var sTextForDisplay = null;
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
(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

	var isInit           = false;
	var CurLang          = "auto";
	var sText            = "";
	var displayNoneClass = "display-none";
    var elements     = null;
    var sPathRoot    = document.location.protocol + "//" + document.location.host + document.location.pathname.replace("index.html", "vendor/grammalecte-sdk/grammalecte");
    var oGramma      = null;
    var aResults     = [];
    var paste_done   = true;
    var canAddText   = true;
    var tempMatches  = null;
    var savedDismiss = [];

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
    function getMessage(key) {
        return window.Asc.plugin.tr(key.trim());
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
                aConcatResults.push({
                    nStart : arrResults[nResult].aGrammErr[nGrammErr].nStart,
                    nEnd : arrResults[nResult].aGrammErr[nGrammErr].nEnd,
                    aSuggestions : arrResults[nResult].aGrammErr[nGrammErr].aSuggestions.slice(0,5),
                    nIndex : arrResults[nResult].aGrammErr[nGrammErr].i,
                    sMessage : arrResults[nResult].aGrammErr[nGrammErr].sMessage
                });
            }
            for (var nSpellErr = 0; nSpellErr < arrResults[nResult].aSpellErr.length; nSpellErr ++) {
                arrResults[nResult].aSpellErr[nSpellErr].nStart += nCharsCountBefore === 0 ? nCharsCountBefore : nCharsCountBefore + nResult;
                arrResults[nResult].aSpellErr[nSpellErr].nEnd += nCharsCountBefore === 0 ? nCharsCountBefore : nCharsCountBefore + nResult;
                arrResults[nResult].aSpellErr[nSpellErr].i = nCurMistakeIndex++;
                aConcatResults.push({
                    nStart : arrResults[nResult].aSpellErr[nSpellErr].nStart,
                    nEnd : arrResults[nResult].aSpellErr[nSpellErr].nEnd,
                    aSuggestions : arrResults[nResult].aSpellErr[nSpellErr].aSuggestions.slice(0,5),
                    nIndex : arrResults[nResult].aSpellErr[nSpellErr].i,
                    sMessage : arrResults[nResult].aSpellErr[nSpellErr].sMessage || "Possible mistake"
                })
            }
            nCharsCountBefore += allParas[nResult].length;
        }
        return aConcatResults;
    };
    function compare(a, b) {
        if (a.nStart < b.nStart) {
          return -1;
        }
        if (a.nStart > b.nStart) {
          return 1;
        }
        if (a)
        return 0;
    };

	window.Asc.plugin.init = function(text)	{
		if (window.Asc.plugin.info.isViewMode)
			document.getElementById("replace").classList.add('hidden');

		if (!canAddText) {
	        return;
	    }

        if (text === "" && document.getElementById("textarea").innerText === "") {
            if ($('#check').hasClass('disabled') === false)
	            $('#check').toggleClass('disabled');
	        if ($('#replace').hasClass('disabled') === false)
	            $('#replace').toggleClass('disabled');
        }
        else {
            if ($('#check').hasClass('disabled') === true)
	            $('#check').toggleClass('disabled');
	        if ($('#replace').hasClass('disabled') === true)
	            $('#replace').toggleClass('disabled');
        }

        sText = text;
        savedDismiss = [];
        switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(160)}], function(data) {
                    sText = (data === undefined) ? "" : data.replace(/\r/g, ' ');
                    ExecPlugin();
                });
                break;
            }
            case 'cell':
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(160)}], function(data) {
                    if (data == '')
                        sText = sText.replace(/\r/g, ' ').replace(/\t/g, '\n');
                    else if (data !== undefined) {
                        sText = sText.replace(/\r/g, ' ');
                    }
                    ExecPlugin();
                });
                break;
        }
	};
	function ExecPlugin() {
	    processText(sText);
        
		updateScroll();
		$("#result").empty();
		if (!isInit) {
			init();
			isInit = true;
		}
	};
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);

        $('#enter_container').css('background-color', window.Asc.plugin.theme["background-normal"]);

        var rule = '.arrow { border-color : ' + window.Asc.plugin.theme["text-normal"] + ';}\n';
        rule += '#expand, #collapse { border-bottom: 1px dashed ' + window.Asc.plugin.theme["text-normal"] + ';}\n';
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
        $('.asc-loader-title').css('color', window.Asc.plugin.theme["text-normal"]);
        $('.result_div').css('background', window.Asc.plugin.theme["background-normal"]);
        if (!isIE) {
            $('#clear').css('border-bottom', 'var(--scaled-one-pixel, 1px) dotted ' + window.Asc.plugin.theme["text-normal"]);
            $('#enter_container').css('background-color', window.Asc.plugin.theme["background-normal"]);
            $('.asc-loader-title').css('color', window.Asc.plugin.theme["text-normal"]);
            $('#arrow-svg-path').css('fill', theme["text-normal"]);
        }
        else
            $('#enter_container').css('background-color', window.Asc.plugin.theme["RulerLight"]);
    };

	$(document).ready(function () {
	    elements = {
            loader: document.getElementById("loader-container"),
            contentHolder: document.getElementById("result"),
		};
        PsTextArea = new PerfectScrollbar("#enter_container", { suppressScrollX  : true});

        oGramma = new GrammarChecker(sPathRoot, ["Grammalecte", "Graphspell", "TextFormatter", "Lexicographer", "Tokenizer"], "fr");
		$('#check').on('click', function(){
            if ($('#check').hasClass('disabled'))
                return;

			sText = document.getElementById("textarea").innerText.trim();
			if (sText !== "") {
				$("#result").empty();
				aResult = checkText(sText).sort(compare);
				parseResult(aResult);
				if (window.Asc.plugin.theme)
				    $('.result_div').css('background', window.Asc.plugin.theme["background-normal"]);
				showLoader(elements, false);
			}
            else {
                $('#result').empty();
			    canAddText = true;
            }
		});
		$('#replace').click(function () {
		    if (!paste_done || $('#replace').hasClass('disabled'))
		        return;
		    else
		        paste_done = false;

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
                   window.Asc.plugin.executeMethod("PasteText", [strResult], function(result) {
                        paste_done = true;
                   });
                }
                else {
                    window.Asc.plugin.executeMethod("GetSelectionType", [], function(sType) {
                        switch (sType) {
                            case "none":
                            case "drawing":
                                window.Asc.plugin.executeMethod("PasteText", [strResult], function(result) {
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
        });
        $('#textarea').keyup(function(e) {
            if (document.getElementById("textarea").innerText.trim() !== "") {
                if ($('#check').hasClass('disabled') === true)
                    $('#check').toggleClass('disabled');
                if ($('#replace').hasClass('disabled') === true)
                    $('#replace').toggleClass('disabled');
            }
            else {
                canAddText = true;
                $('#result').empty();
                if ($('#check').hasClass('disabled') === false)
	                $('#check').toggleClass('disabled');
	            if ($('#replace').hasClass('disabled') === false)
	                $('#replace').toggleClass('disabled');
            }
            updateScroll();
        });

        $("#enter_container").click(function() {
            $("#textarea").focus();
        });

        $('#clear').click(function() {
		    savedDismiss = [];
		    canAddText = true;
		    $("#result").empty();
		    $('#textarea').empty();

		    // disable buttons
		    if ($('#check').hasClass('disabled') === false)
	            $('#check').toggleClass('disabled');
	        if ($('#replace').hasClass('disabled') === false)
	            $('#replace').toggleClass('disabled');

		    updateScroll();
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

    function processText(sTxt){
        if (sTxt[sTxt.length - 1] === '\n')
            sTxt = sTxt.slice(0, sTxt.length - 1);

        document.getElementById("textarea").innerText = sTxt;
    };

	function checkText(sText) {
	    updateScroll();
	    showLoader(elements, true);

        aResults = ConcatResults(oGramma.parseAndSpellcheck(sText, "FR", false, false, oInfo={}))
        return aResults;
	};

    function setTextWithErrors(sWord, nInd) {
		var ind = nInd;
		ind = tempMatches.findIndex(function(el) {
			if (el.nIndex === ind) {
				return true;
			}
		});
        if (!tempMatches[ind])
            return;

		var end = tempMatches[ind].nEnd;
		var temp = sTextForDisplay.slice(0, tempMatches[ind].nStart) + '<span id="' + tempMatches[ind].nIndex + '" style="color:#f62211; font-weight: bold;">' + sWord + '</span>' + sTextForDisplay.slice(end);
		var count = sTextForDisplay.length - temp.length;
		for (var i = ind; i < tempMatches.length; i++) {
			tempMatches[i].nStart -= count;
            tempMatches[i].nEnd -= count;
		}

		sTextForDisplay = temp;
	};

    // tempMatches используются для выделения ошибок внутри textarea,
    // функция нужна для того, чтобы с одинаковым началом или концом не выделялись дважды
    function delExternalMatches(aMatches) {
        for (var nItem1 = 0; nItem1 < aMatches.length - 1; nItem1++) {
            var bSkipped = false;
            for (var nSavedDismiss = 0; nSavedDismiss < savedDismiss.length; nSavedDismiss++) {
                if (savedDismiss[nSavedDismiss].nStart === aMatches[nItem1].nStart && savedDismiss[nSavedDismiss].nEnd === aMatches[nItem1].nEnd)
                    bSkipped = true;
            }
            if (!bSkipped){
                for (var nItem2 = nItem1 + 1; nItem2 < aMatches.length; nItem2++) {
                    if (aMatches[nItem1].nStart === aMatches[nItem2].nStart || aMatches[nItem1].nEnd === aMatches[nItem2].nEnd)
                        aMatches.splice(nItem2, nItem2 + 1);
                }
            }
        }
    };

	function parseResult (arrResults) {
        if (arrResults.length === 0) {
            sTextForDisplay = "";
            canAddText = true;
            $('<div>', {
                id: "no_mistakes",
                text: "No possible mistakes found"
            }).appendTo('#result');
        }
        else {
            canAddText = false;
            sTextForDisplay = sText;
            tempMatches = [];
            for (var nElm = 0; nElm < arrResults.length; nElm++) {
                tempMatches.push({
                    nEnd: arrResults[nElm].nEnd,
                    nStart: arrResults[nElm].nStart,
                    nIndex:  arrResults[nElm].nIndex
                });
            }
            delExternalMatches(tempMatches);
            $('<div>', {
                id: "yes_mistakes",
                text: "Possible mistakes found: " + arrResults.length
            }).appendTo('#result');
            $('<div>', {
                id: "hide_show",
                text: ""
            }).appendTo('#result');
            $('<label>', {
                id: "expand",
                text: "Expand all",
				click: function() {
				        $('.result_div').each(function() {
				            if ($(this).find('.details').css('display') === 'none')
				                $(this).trigger('click');
				        });
				        $(this).hide();
                        $('#collapse').show();
                }
            }).appendTo('#hide_show');
            $('<label>', {
                id: "collapse",
                text: "Collapse all",
                style: "display:none",
				click: function() {
				        $('.result_div').each(function() {
				            if ($(this).find('.details').css('display') !== 'none')
				                $(this).trigger('click');
				        });
				        $(this).hide();
                        $('#expand').show();
                }
            }).appendTo('#hide_show');
        }

		arrResults.forEach(function(el, ind) {
            // remember skipped words
            var bSkipped = false;
            for (var nSavedDismiss = 0; nSavedDismiss < savedDismiss.length; nSavedDismiss++) {
                if (savedDismiss[nSavedDismiss].nStart === el.nStart && savedDismiss[nSavedDismiss].nEnd === el.nEnd)
                    bSkipped = true;
            }

            if (bSkipped !== true)
                setTextWithErrors(sText.slice(el.nStart, el.nEnd), el.nIndex);
            else {
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

                            var nOpened = 0;
                            $('.result_div').each(function() {
                                if ($(this).find('.details').css('display') !== 'none')
                                    nOpened++;
                            });
                            if (nOpened === $('.result_div').length) {
                                $('#expand').hide();
                                $('#collapse').show();
                            }
                            else {
                                $('#expand').show();
                                $('#collapse').hide();
                            }
                        });
                        $(this).find(".arrow").toggleClass("down");
                        $(this).find(".arrow").toggleClass("up");
                        $(this).find(".caption_text").toggleClass("display-none");
                        $(this).find(".miniText").toggleClass("display-none");
                    }
			}).appendTo('#result');

            var img_arrow = $('<i>', {
                "class": "arrow down",
            });
            var img_container = $('<div>', {
                "class": "arrow_container"
            });
            var caption_text = $('<span>', {
				"class": 'caption_text display-none unselectable',
				text : el.sMessage
			});
            var caption = $('<div>', {
				"class": 'caption',
			});
            var separateLine = $('<div>', {
				"class": 'separator horizontal display-none',
			});

            var context = $('<div>', {
				html : sText.slice(0, el.nStart)
					+ '<span style="color:#f62211; font-weight: bold;">'
					+ sText.slice(el.nStart, el.nEnd)
					+ '</span>'
					+ sText.slice(el.nEnd),
				class: 'miniText unselectable'
			});
			context.appendTo(caption);

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
					var ind = $(this).data().index;
					// remove highlight of word
			        var DisplayedSpanWord = $('#' + ind)[0];
                    
                    if (DisplayedSpanWord)
					    DisplayedSpanWord.outerHTML = DisplayedSpanWord.innerText;

                    var ind = aResults.findIndex(function(el) {
						if (el.nIndex === ind) {
							return true;
						}
					});

                    savedDismiss.push({
					    nStart: aResults[ind].nStart,
					    nEnd: aResults[ind].nEnd
					});

                    aResults.splice(ind, 1);
                    
                    $('#div_'+$(this).data().index).remove();
					var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
					$('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));

                    $('#check').trigger("click");
				},
			    "class": "dismiss btn-text-default"
			}).data({ index : el.nIndex}).appendTo(dismiss_buttons);

			// $('<button>', {
			//     text: "Dismiss all",
			//     click: function () {
			// 		$('.dismiss').each(function() {
			// 		     $(this).trigger("click");
			// 		});
			// 	},
			//     "class": "dismiss_all btn-text-default"
			// }).appendTo(dismiss_buttons);

			dismiss_buttons.appendTo(div_details);
		});

        if (sTextForDisplay !== "") {
            sTextForDisplay = sTextForDisplay.replace(/\n/g, '<br>');
            $('#textarea').empty();
            var context = $('<div>', {
                    html : sTextForDisplay
                });
            context.appendTo('#textarea');
        }

        window.Asc.plugin.onTranslate();

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
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            if (el.innerText) el.innerText = getMessage(el.innerText);
        }
    }

})(window, undefined);