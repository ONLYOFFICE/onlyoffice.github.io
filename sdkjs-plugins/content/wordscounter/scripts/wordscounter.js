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
