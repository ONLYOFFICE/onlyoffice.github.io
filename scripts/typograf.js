/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
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

	$(document).ready(function () {
	     $('#select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '120px',
		});
        SetSavedSettings();

        var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
        if (locale === 'ru') {
            if ($('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
        }
        else {
            if (!$('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
        }

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
            var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
            if (locale === 'ru') {
                if ($('.locale-ru').hasClass('display-none')) {
                    $('.locale-ru').toggleClass('display-none');
                }
            }
            else {
                if (!$('.locale-ru').hasClass('display-none')) {
                    $('.locale-ru').toggleClass('display-none');
                }
            }
        });
    });
    function processText(sTxt){
        if (sTxt[sTxt.length - 1] === '\n')
            sTxt = sTxt.slice(0, sTxt.length - 1);

	    var splittedParas = sTxt.split('\n');

        splittedParas.forEach(function(item, i, splittedParas) {
            splittedParas[i] = removeCR(item);
        });

	    return splittedParas;
	};
	function ExecTypograf(sText) {
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
                window.Asc.plugin.executeMethod("ReplaceTextSmart", [Asc.scope.arr, String.fromCharCode(9), String.fromCharCode(13)]);
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

    function removeCR(text) {
        //return text.replace(/\r\n?/g, '');
        return text;
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

		document.dispatchEvent(evt);
	};

})(window, undefined);
