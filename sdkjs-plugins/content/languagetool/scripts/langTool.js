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
const isIE          = checkInternetExplorer();	//check IE
var sTextForDisplay = null;
var tempMatches     = null;
var savedDismiss    = [];
var languages;

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
	var isInit = false;
	var CurLang = "auto";
	var txt = "";
	var txtForChek = "";
	var matches;
	var displayNoneClass = "display-none";
	var blurClass        = "no_class";
    var elements         = null;
    var serviceUrl       = "https://languagetool.org/api/v2/check";
    var paste_done       = true;
    var canAddText       = true;
    var isLangChangedManually = false;

	function showLoader(elements, show) {

       switchClass(elements.contentHolder, blurClass, show);
       switchClass(elements.loader, displayNoneClass, !show);
    };
    function getMessage(key) {
        return window.Asc.plugin.tr(key.trim());
    };
	function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
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

		txt = text;
		savedDismiss = [];
		switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(160)}], function(data) {
                    txt = (data === undefined) ? "" : data.replace(/\r/g, ' ');
                    ExecPlugin();
                });
                break;
            }
            case 'cell':
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(160)}], function(data) {
                    if (data == '')
                        txt = txt.replace(/\r/g, ' ').replace(/\t/g, '\n');
                    else if (data !== undefined) {
                        txt = data.replace(/\r/g, ' ');
                    }
                    ExecPlugin();
                });
                break;
        }
	};
	function processText(sTxt){
        if (sTxt[sTxt.length - 1] === '\n')
            sTxt = sTxt.slice(0, sTxt.length - 1);

	    var splittedParas = sTxt.split('\n');
        var parasToTranslate = [];

        document.getElementById("textarea").innerText = sTxt;

	    return splittedParas;
	};

	function ExecPlugin() {
	    processText(txt);

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
        var rule = '.arrow { border-color : ' + window.Asc.plugin.theme["text-normal"] + ';}\n'
		rule += '.asc-plugin-loader .asc-loader-image { background-image : url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgcj0iMTAuMjUiIHN0cm9rZS1kYXNoYXJyYXk9IjE2MCUsIDQwJSIgLz48L3N2Zz4=) !important;}\n';
        rule += ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";

        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
        $('.result_div').css('background', window.Asc.plugin.theme["background-normal"]);

        if (!isIE) {
            $('#clear').css('border-bottom', 'var(--scaled-one-pixel, 1px) dotted ' + window.Asc.plugin.theme["text-normal"]);
            $('#enter_container').css('background-color', window.Asc.plugin.theme["background-normal"]);
            $('#show_manually, #hide_manually').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme["text-normal"]);
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

		$('#check').on('click', function(){
			if ($('#check').hasClass('disabled'))
                return;
			txt = document.getElementById("textarea").innerText;
			if (txt !== "") {
				$("#result").empty();
				txtForChek = txt.replace(/\n/g, '\n\n');
				checkText(txtForChek, CurLang);
			}
			else {
			    $('#result').empty();
			    canAddText = true;
			}
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

            if (!isLangChangedManually){
                $('#language_id').val(0);
                $('#language_id').trigger('change');
                CurLang = 'auto';
            }

		    updateScroll();
		});
		$('#replace').click(function () {
		    if (!paste_done || $('#replace').hasClass('disabled'))
		        return;
		    else
		        paste_done = false;

            Asc.scope.arr = document.getElementById("textarea").innerText.split(/\n/);
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

            if (strResult === "")
                return;

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
                                    Api.ReplaceTextSmart(Asc.scope.arr, String.fromCharCode(160));
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
	});

	function getLanguages() {
		var url = "https://languagetool.org/api/v2/languages";
		return $.ajax({
			method: 'GET',
			url: url
		});
	};

	function checkText(txt, lang) {
	    updateScroll();
	    showLoader(elements, true);
		var data = {
			text : txt,
			language : lang,
			enabledOnly : false//,
			//disabledRules: "WORD_REPEAT_RULE"
		}

		$.ajax({
			method: 'POST',
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
			},
			data : data,
			url: serviceUrl
		}).success(function (oResponse) {
			matches = oResponse.matches.map(function(el, ind) {
				el.index = ind;
				return el;
			});
			parseResult(oResponse);
			if (window.Asc.plugin.theme)
			    $('.result_div').css('background', window.Asc.plugin.theme["background-normal"]);
			showLoader(elements, false);
		}).error(function(e){
		    $('<span>', {
		        "class": "error",
		        text: e.responseText
		    }).appendTo('#result');
			console.log(e);
			showLoader(elements, false);
		});
	};

    function changeLangInSelect(sLangName){
        if (languages[$('#language_id').val()].text === sLangName)
            return;

        for (var nLang = 0; nLang < languages.length; nLang++){
            if (sLangName === languages[nLang].text){
                $('#language_id').val(languages[nLang].id);
                $('#language_id').trigger('change');
                CurLang = languages[nLang].longcode;
            }
        }
    };
	function parseResult (oResponse) {
        $('#result').empty();
		var data = oResponse.matches.map(function (el) {
			return {
				shortMessage : el.shortMessage,
				message : el.message,
				replacements : el.replacements.slice(0, 5),
				context : el.context
			}
		});

        var nStartPos       = 0;

        if (data.length === 0) {
            document.getElementById("textarea").innerText = txt;
            canAddText = true;
            sTextForDisplay = "";
            $('<div>', {
                id: "no_mistakes",
                text: "No possible mistakes found"
            }).appendTo('#result');
        }
        else {
            canAddText = false;
            changeLangInSelect(oResponse.language.name);

			// чтобы сервис различал параграфы необходимо разделять их двумя "\n" во время отправки,
			// поэтому после получения ответа нужно поправить позиции, чтобы в исходном тексте верно делать исправления
            correctMistakesPosition(matches);
            
            sTextForDisplay = txt;
            tempMatches = [];
            for (var nElm = 0; nElm < matches.length; nElm++) {
                tempMatches.push({
                    length: matches[nElm].length,
                    offset: matches[nElm].offset,
                    index:  matches[nElm].index
                });
            }
            $('<div>', {
                id: "yes_mistakes",
                text: "Possible mistakes found: " + data.length
            }).appendTo('#result');
        }

		data.forEach(function(el, ind) {
            // remember skipped words
            var bSkipped = false;
            for (var nSavedDismiss = 0; nSavedDismiss < savedDismiss.length; nSavedDismiss++) {
                if (savedDismiss[nSavedDismiss].offset === matches[ind].offset && savedDismiss[nSavedDismiss].length === matches[ind].length)
                    bSkipped = true;
            }

            if (bSkipped !== true)
                setTextWithErrors(txt.slice(matches[ind].offset, matches[ind].offset + matches[ind].length), ind);
            else {
                var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
                $('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));
                return;
            }

			$('<div>', {
				id : "div_" + ind,
				"class": 'result_div',
				click: function() {
				        var mainElm = this;
                        $(this).find(".details").slideToggle("fast", function() {
                            updateScroll();
                            $(mainElm).find(".separator").toggleClass("display-none");
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
				text : el.message.slice(0, el.message.length - 1)
			});
            var caption = $('<div>', {
				"class": 'caption',
			});
            var separateLine = $('<div>', {
				"class": 'separator horizontal display-none',
			});

            var context = $('<div>', {
				html : el.context.text.slice(0, el.context.offset)
					+ '<span style="color:#f62211; font-weight: bold;">'
					+ el.context.text.slice(el.context.offset,el.context.offset + el.context.length)
					+ '</span>'
					+ el.context.text.slice(el.context.offset + el.context.length),
				class: 'miniText unselectable'
			});
			context.appendTo(caption);

            img_arrow.appendTo(img_container);
            caption_text.appendTo(caption);
            img_container.appendTo(caption);
            caption.appendTo('#div_'+ind);
            separateLine.appendTo('#div_'+ind);

            var div_details = $('<div>', {
				"class": 'details'
			});

			$('<div>', {
				id : "div_replacments_" + ind,
				"class": 'replacments',
			}).appendTo(div_details);

			div_details.appendTo('#div_'+ind);

			el.replacements.forEach(function(elem) {
			    var sClass = '';
			    if (elem.value === ' ')
			        sClass = ' replacment_space';
				$('<button>', {
					"class": 'replacment btn-text-default' + sClass,
					text: elem.value,
					click : function () {
						var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
			            $('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));
						correctText($(this));
					}
				}).data({ index : ind })
				.appendTo('#div_replacments_'+ind);
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
					DisplayedSpanWord.outerHTML = DisplayedSpanWord.innerText;

                    var ind = matches.findIndex(function(el) {
						if (el.index === ind) {
							return true;
						}
					});

					savedDismiss.push({
					    offset: matches[ind].offset,
					    length: matches[ind].length
					});

					matches.splice(ind, 1);

					$('#div_'+$(this).data().index).remove();
					var countMistakes = Number($('#yes_mistakes').text().split(' ')[3]);
					$('#yes_mistakes').text("Possible mistakes found: " + String(countMistakes - 1));
				},
			    "class": "dismiss btn-text-default i18n"
			}).data({ index : ind }).appendTo(dismiss_buttons);

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

		updateScroll();
        window.Asc.plugin.onTranslate();
	};

	function correctText(data) {
	    if (data.text()[0] === '(' && data.text()[data.text().length - 1] === ')') {
	        return data.parent().parent().find('.dismiss').trigger("click");
	    }

		var ind = data.data().index;
		ind = matches.findIndex(function(el) {
			if (el.index === ind) {
				return true;
			}
		});
		var end = matches[ind].offset + matches[ind].length;
		var temp = txt.slice(0, matches[ind].offset) + data.text() + txt.slice(end);
		var count = txt.length - temp.length;
		matches.splice(ind, 1);
		txt = temp;
		document.getElementById("textarea").innerText = txt;
		for (var i = ind; i < matches.length; i++) {
			matches[i].offset -= count;
			if (savedDismiss[i] && savedDismiss[i].offset > 0)
			    savedDismiss[i].offset -= count;
		}
		$('#div_'+data.data().index).remove();
        $('#check').trigger("click");
		updateScroll();
	};

    function correctMistakesPosition(matches) {
        var aPosWithAddedBreaks = [];
        for (var nChar = 0; nChar < txtForChek.length; nChar++) {
            if (txtForChek[nChar] === '\n')
            {
                aPosWithAddedBreaks.push(nChar);
                nChar++;
            }
        }
        for (var nMatch = 0; nMatch < matches.length; nMatch++)
        {
            var nOffset = 0;
            for (var nPosWithBreak = 0; nPosWithBreak < aPosWithAddedBreaks.length; nPosWithBreak++)
            {
                if (matches[nMatch].offset > aPosWithAddedBreaks[nPosWithBreak])
                    nOffset++;
            }

            matches[nMatch].offset -= nOffset;
        }
    };
	function setTextWithErrors(sWord, nInd) {
		var ind = nInd;
		ind = tempMatches.findIndex(function(el) {
			if (el.index === ind) {
				return true;
			}
		});
		var end = tempMatches[ind].offset + tempMatches[ind].length;
		var temp = sTextForDisplay.slice(0, tempMatches[ind].offset) + '<span id="' + ind + '" style="color:#f62211; font-weight: bold;">' + sWord + '</span>' + sTextForDisplay.slice(end);
		var count = sTextForDisplay.length - temp.length;
		for (var i = ind; i < tempMatches.length; i++) {
			tempMatches[i].offset -= count;
		}

		sTextForDisplay = temp;
	};

	function init() {
		getLanguages().then(function(oResponse) {
		    for (var nLang1 = 0; nLang1 < oResponse.length; nLang1++) {
			    for (var nLang2 = nLang1 + 1; nLang2 < oResponse.length; nLang2++) {
                    if (oResponse[nLang1].name === oResponse[nLang2].name)
                    {
                        oResponse.splice(nLang2, 1);
                        nLang2--;
                    }
			    }
			}
			languages = oResponse.map(function(el, ind) {
				return {
					id : ind + 1,
					text : el.name,
					code : el.code,
					longcode : el.longCode
				};
			});

			languages.unshift({id : 0, text:"Auto", code : "auto", longcode : "auto"});
			$('#language_id').select2({
				data : languages
			}).on('select2:select', function (e) {
				localStorage.setItem('langtool_lang', e.params.data.id);

				CurLang = e.params.data.longcode;
				if (e.params.data.longcode === "auto")
				    isLangChangedManually = false;
				else
				    isLangChangedManually = true;
			});
			
			let sSavedLang = localStorage.getItem('langtool_lang');
			if (sSavedLang != null) {
				$('#language_id').val(sSavedLang);
            	$('#language_id').trigger('change');
				isLangChangedManually = true;
			}

		}, function(err) {console.log("ouch" +err)});

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
    };
		  
})(window, undefined);