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
(function(window, undefined)
{
	var isInit = false;

	window.Asc.plugin.init = function(text)
	{
		isInit = true;
		var str = text
		var REGEX_CHINESE = /[\u3131-\uD79D]|[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
		var REPLACE_REGEX = /[\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3131-\uD79D\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/gu;
		// /[\u3131-\uD79D]/ugi korean characters
		var hasChine = REGEX_CHINESE.test(str);
		var chars = text.replace(/\r*\n/g, '').replace(/\t/g,"").length;
		var words = text.replace(/—*\u3000-\u303f/g,"").replace(REPLACE_REGEX,"").match(/\S+/g);
		words = (words) ? words.length : 0;
		if (hasChine) {
			str = str.replace(/\u3000-\u303f/g, ""); //remove Japanese-style punctuation
			// .match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff]/g); //without single unicode characters
			words += str.match(REPLACE_REGEX).length;

		}
		var lines = text.split(/\r\n/);
		// // lines.length--; //will be like ms
		if (lines[lines.length-1] == "") lines.length--;
		showResults(text.replace(/\s+/g, '').length, chars, words, lines.length);		
	};

	function showResults (charsNoSpaces, chars, words, lines) {
		document.getElementById("charsNoSpaces").innerHTML = charsNoSpaces;
		document.getElementById("chars").innerHTML         = chars;
		document.getElementById("words").innerHTML         = words;
		document.getElementById("lines").innerHTML         = lines;
	}


	window.Asc.plugin.button = function()
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.event_onTargetPositionChanged = function()
	{
		if (!isInit)
			showResults(0, 0, 0, 0);
		else
			isInit = false;
	};

	window.Asc.plugin.onTranslate = function()
	{
		var label = document.getElementById("caption");
		if (label)
			label.innerHTML = window.Asc.plugin.tr("Select part of the text or the whole text to count words and characters.");

		var spanN = document.getElementById("spanN");
		if (spanN)
			spanN.innerHTML = window.Asc.plugin.tr("Characters without spaces");
		
		var spanC = document.getElementById("spanC");
		if (spanC)
			spanC.innerHTML = window.Asc.plugin.tr("Characters");

		var spanW = document.getElementById("spanW");
		if (spanW)
			spanW.innerHTML = window.Asc.plugin.tr("Words");

		var spanL = document.getElementById("spanL");
		if (spanL)
			spanL.innerHTML = window.Asc.plugin.tr("Paragraphs");
	};

})(window, undefined);
