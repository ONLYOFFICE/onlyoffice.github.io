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
var sText = '';
(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
	window.Asc.plugin.init = function (text) {
        sText = text;
    };
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);

        var rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);

        $('#floating').css('background', window.Asc.plugin.theme["background-toolbar"]);
        $('.opened, .hidden').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme["text-normal"]);
        $('.arrow').css('border-color', window.Asc.plugin.theme["text-normal"]);
    };

    function SetSavedSettings() {
        var inputsMain = $(".prefs__all-rules").find(".form-control");
	    var allInputs = $(inputsMain).closest(".prefs__fieldset").find(".prefs__rule").find(".form-control");

        var locale_saved = localStorage.getItem('locale_typograf');
        if (locale_saved !== null) {
            $('#select_example').val(locale_saved);
            $('#select_example').trigger('change');
        }

	    $(inputsMain).each(function() {
	        var savedValue = localStorage.getItem($(this).attr("data-id"));
	        if (savedValue !== null)
	            if (savedValue === true.toString())
                    $(this).prop("checked", true);
                else
                    $(this).prop("checked", false);
	    });
	    $(allInputs).each(function() {
	        var savedValue = localStorage.getItem($(this).attr("data-id"));
	        if (savedValue !== null)
	            if (savedValue === true.toString())
                    $(this).prop("checked", true);
                else
                    $(this).prop("checked", false);
	    });
    };

    function hideShowForLocale() {
        var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
        if (locale === 'ru') {
            if ($('#dash-hyphen').hasClass('display-none')) {
                $('#dash-hyphen').toggleClass('display-none');
            }
            if ($('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
            if (!$('.locale-en-US').hasClass('display-none')) {
                $('.locale-en-US').toggleClass('display-none');
            }
        }
        else if (locale === 'en-US') {
            if ($('#dash-hyphen').hasClass('display-none')) {
                $('#dash-hyphen').toggleClass('display-none');
            }
            if ($('.locale-en-US').hasClass('display-none')) {
                $('.locale-en-US').toggleClass('display-none');
            }
            if (!$('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
        }
        else {
            if (!$('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
            if (!$('.locale-en-US').hasClass('display-none')) {
                $('.locale-en-US').toggleClass('display-none');
            }
            if (!$('#dash-hyphen').hasClass('display-none')) {
                $('#dash-hyphen').toggleClass('display-none');
            }
        }
    }

	$(document).ready(function () {
	     $('#select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '120px',
		});
        SetSavedSettings();

        hideShowForLocale();

		Ps = new PerfectScrollbar("#settings", {suppressScrollX: true});

	    $('.prefs__rule').removeAttr('title');
        $('.prefs__rule-checkbox').wrap("<label></label>");

        $("#correct").find(".btn-text-default").click(function() {
            CorrectText();
        });

        $(".hidden").click(function() {
            $(this).hide();
            $("#hide_show").find(".opened").show();
            $(document).find("#settings").slideToggle("fast", function() { updateScroll(); });
        });
        $(".opened").click(function() {
            $(this).hide();
            $("#hide_show").find(".hidden").show();
            $(document).find("#settings").slideToggle("fast", function() { updateScroll(); });
        });
        $(".button").click(function() {
            $(this).closest(".prefs__fieldset").toggleClass("prefs__fieldset_visible").find(".prefs__group-rules").slideToggle("fast", function() { updateScroll(); });
            $(this).closest(".prefs__fieldset").find(".arrow").toggleClass("down");
            $(this).closest(".prefs__fieldset").find(".arrow").toggleClass("up");
        });

        $(".prefs__all-rules").click(function() {
            var inputMain = $(this).find(".form-control");
            var allInputs = $(this).closest(".prefs__fieldset").find(".prefs__rule").find(".form-control");

            allInputs.prop("checked", $(inputMain).prop('checked'));

            localStorage.setItem($(inputMain).attr("data-id"), $(inputMain).prop('checked'));
            allInputs.each(function() {
                localStorage.setItem($(this).attr("data-id"), $(this).prop('checked'));
            });
        });

        $(".prefs__all-rules").closest(".prefs__fieldset").find(".prefs__rule").find(".form-control").click(function() {
            localStorage.setItem($(this).attr("data-id"), $(this).prop('checked'));
        });
        $("#select_example").change(function() {
            localStorage.setItem('locale_typograf', $(this).val());
            hideShowForLocale();
        });
    });
    function processText(sTxt){
        if (sTxt[sTxt.length - 1] === '\n')
            sTxt = sTxt.slice(0, sTxt.length - 1);

        sTxt = sTxt.replace(/\r/g, "");
	    var splittedParas = sTxt.split('\n');

        splittedParas.forEach(function(item, i, splittedParas) {
            splittedParas[i] = item;
        });

	    return splittedParas;
	};
	function ExecTypograf(sText) {
	    if (sText == undefined)
	        return;
	        
	    var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
        var tp = new Typograf({locale: [locale]});
        var rules = document.getElementsByClassName("prefs__rule-checkbox");

        for (var rule = 0; rule < rules.length; rule++) {
            if (rules[rule].checked) {
                tp.enableRule(rules[rule].getAttribute("data-id"));
            }
            else {
                tp.disableRule(rules[rule].getAttribute("data-id"));
            }
        }

        var allParsedParas = processText(sText);
        var allTypografedParas = [];

        for (var Item = 0; Item < allParsedParas.length; Item++) {
            typografedText = tp.execute(allParsedParas[Item]);
            typografedText = typografedText.replace(/\n/g, String.fromCharCode(13));
            allTypografedParas.push(typografedText);
        }

        Asc.scope.arr = allTypografedParas;

        window.Asc.plugin.executeMethod("GetVersion", [], function(version) {
            if (version === undefined) {
                var strResult = "";

                for (var Item = 0; Item < allTypografedParas.length; Item++) {
                    if (allTypografedParas[Item] === "")
                        continue;
                    if (Item < allTypografedParas.length - 1)
                        strResult += allTypografedParas[Item] + '\n';
                    else
                        strResult += allTypografedParas[Item];
                }
                window.Asc.plugin.executeMethod("PasteText", [strResult]);
            }
            else {
                window.Asc.plugin.executeMethod("ReplaceTextSmart", [Asc.scope.arr, String.fromCharCode(9), String.fromCharCode(13)], function(isDone) {
                    if (!isDone)
                        window.Asc.plugin.callCommand(function() {
                            Api.ReplaceTextSmart(Asc.scope.arr);
                        });
                });
            }
        });
	};
    function CorrectText() {
        switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(9)}], function(data) {
                    sText = data;
                    ExecTypograf(sText);
                });
                break;
            }
            case 'cell': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(9)}], function(data) {
                    if (data == ''){
                        sText = sText.replace(/\t/g, '\n');
                        ExecTypograf(sText);
                    }
                    else {
                        sText = data;
                        ExecTypograf(sText);
                    }
                });
                break;
            }
        }
    }

    function updateScroll()
	{
		Ps && Ps.update();
	};

    function getMessage(key) {
        return window.Asc.plugin.tr(key.trim());
    };
    window.Asc.plugin.onTranslate = function()
    {
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            let isRussianRule = el.innerText.slice(el.innerText.length - 2, el.innerText.length) === "ru";
            let textWithourRuMark = isRussianRule ? el.innerText.slice(0, el.innerText.length - 2) : "";
            if (el.innerText && isRussianRule)
            {
                el.outerHTML = el.outerHTML.replace(textWithourRuMark, getMessage(textWithourRuMark));
            }
            else
                el.innerText = getMessage(el.innerText);
        }
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

})(window, undefined);
