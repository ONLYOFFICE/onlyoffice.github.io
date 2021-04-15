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
(function(window, undefined){

    var txt              = "";
    var displayNoneClass = "display-none";
    var elements         = null;
    var sHelpText        = 'Choose Markdown or HTML. \r* Default: convert entire doc. \r* Select text to limit scope. \rFor more details, click the Docs link above.'
	var oConfig           = {
	    convertType : '',
	    htmlHeadings : false,
	    base64img : false,
	    demoteHeadings : false,
	    renderHTMLTags : false,
	    suppressInfo : false,
	};
	var sCopiedInfo = 'Output copied to clipboard!';
	var sTopInfo  = '<!-----\nNEW: Check the "Suppress top comment" option to remove this info from the output.\nUsing this Markdown file:\n1. Paste this output into your source file.\n2. See the notes and action items below regarding this conversion run.\n3. Check the rendered output (headings, lists, code blocks, tables) for proper formatting and use a linkchecker before you publish this page.----->\n\n'


	function showLoader(elements, show) {
       switchClass(elements.loader, displayNoneClass, !show);
    }

	function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

	window.Asc.plugin.init = function()
	{
        SetSavedFromLocalStorage();
	};
    function SaveToLocalStorage() {
        localStorage.setItem($('#demote_headings').attr('data-id'), $('#demote_headings').prop('checked'));
        localStorage.setItem($('#html_headings').attr('data-id'), $('#html_headings').prop('checked'));
        localStorage.setItem($('#base64img').attr('data-id'), $('#base64img').prop('checked'));
        localStorage.setItem($('#render_html_tags').attr('data-id'), $('#render_html_tags').prop('checked'));
        localStorage.setItem($('#suppress_info').attr('data-id'), $('#suppress_info').prop('checked'));
    };
    function SetSavedFromLocalStorage() {
        var isDemoteHeadings = localStorage.getItem($('#demote_headings').attr('data-id'));
        if (isDemoteHeadings !== null) {
            if (isDemoteHeadings === true.toString())
                $('#demote_headings').prop("checked", true);
            else
                $('#demote_headings').prop("checked", false);
        }

        var isHtmlHeadings = localStorage.getItem($('#html_headings').attr('data-id'));
        if (isHtmlHeadings !== null) {
            if (isHtmlHeadings === true.toString())
                $('#html_headings').prop("checked", true);
            else
                $('#html_headings').prop("checked", false);
        }

        var isBase64 = localStorage.getItem($('#base64img').attr('data-id'));
        if (isBase64 !== null) {
            if (isBase64 === true.toString())
                $('#base64img').prop("checked", true);
            else
                $('#base64img').prop("checked", false);
        }

        var isRenderHtmlTags = localStorage.getItem($('#render_html_tags').attr('data-id'));
        if (isRenderHtmlTags !== null) {
            if (isRenderHtmlTags === true.toString())
                $('#render_html_tags').prop("checked", true);
            else
                $('#render_html_tags').prop("checked", false);
        }

        var isSuppressInfo = localStorage.getItem($('#suppress_info').attr('data-id'));
        if (isSuppressInfo !== null) {
            if (isSuppressInfo === true.toString())
                $('#suppress_info').prop("checked", true);
            else
                $('#suppress_info').prop("checked", false);
        }
    };
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        $('#hide-settings, #show-settings').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme.Color);
    };
    function DelInvalidChars(arrParas) {
        for (var nPara = 0; nPara < arrParas.length; nPara++) {
            arrParas[nPara] = arrParas[nPara].replace(/#/gi, '');
            arrParas[nPara] = arrParas[nPara].replace(/&/gi, '');
        }
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

    function SetConfig(sConvertType) {
        oConfig.htmlHeadings   = false;
        oConfig.base64img      = false;
        oConfig.demoteHeadings = false;
        oConfig.renderHTMLTags = false;
        oConfig.suppressInfo   = false;
        oConfig.convertType = sConvertType;

        if (document.getElementById('demote_headings').checked) {
            oConfig.demoteHeadings = true;
        }
        if (document.getElementById('html_headings').checked) {
            oConfig.htmlHeadings = true;
        }
        if (document.getElementById('base64img').checked) {
            oConfig.base64img = true;
        }
        if (document.getElementById('render_html_tags').checked) {
            oConfig.renderHTMLTags = true;
        }
        if (document.getElementById('suppress_info').checked) {
            oConfig.suppressInfo = true;
        }
    };

    $(document).ready(function () {
        document.getElementById("text-area").value = sHelpText;
        $('#show-settings').click(function() {
            $(this).hide();
            $('#hide-settings').show();
            $('#settings').slideToggle('fast');
        });
        $('#hide-settings').click(function() {
            $(this).hide();
            $('#show-settings').show();
            $('#settings').slideToggle('fast');
        });
        $('#btn-markwodn').click(function() {
            SetConfig('markdown');
            var sInfo = '';
            if (!oConfig.suppressInfo)
                sInfo += sTopInfo;
            window.Asc.plugin.executeMethod('ConvertDocument', [oConfig.convertType, oConfig.htmlHeadings, oConfig.base64img, oConfig.demoteHeadings, oConfig.renderHTMLTags], function(sOutput) {
                document.getElementById("text-area").value = sInfo + sOutput;
            });
            SaveToLocalStorage();
        });
        $('#btn-html').click(function() {
            SetConfig('html');
            var sInfo = '';
            if (!oConfig.suppressInfo)
                sInfo += sTopInfo;
            window.Asc.plugin.executeMethod('ConvertDocument', [oConfig.convertType, oConfig.htmlHeadings, oConfig.base64img, oConfig.demoteHeadings, oConfig.renderHTMLTags], function(sOutput) {
                document.getElementById("text-area").value = sInfo + sOutput;
            });
            SaveToLocalStorage();
        });

        document.getElementById("btn-copy").onclick = function () {
            selectText('text-area');
            alert('Text was copied to buffer!');
            var oTextArea = document.getElementById('text-area');
            var sTemp = oTextArea.value;
            oTextArea.value = '';
            oTextArea.value = sTemp;
        }
    });
    function selectText(id) {
        var sel, range;
        var el = document.getElementById(id); //get element id
            if (window.getSelection && document.createRange) { //Browser compatibility
            el.select();
            sel = window.getSelection();
            document.execCommand("copy"); //copy
            sel.removeAllRanges(); //remove all ranges from selection
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
	};

})(window, undefined);
