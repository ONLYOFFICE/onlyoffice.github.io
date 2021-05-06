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
(function(window, undefined){

	var editor;
	window.Asc.plugin.init = function(text)
	{
		// text = text.replace(/\<[\/]?p[a-zA-Z0-9-:;+"\/= >.]*/g,"");
		text = text.replace(/class="[a-zA-Z0-9-:;+"\/=]*/g,"");
		text = text.replace(/\<p/g,"\r\n\t\t<p");
		text = text.replace(/\<img/g,"\r\n\t\t<img");
		var temp = (text.indexOf("<p") === -1) ? "\r\n" : ""
		if (text !== "")
			text = "<html>\r\n\t<body>" + temp + "\t\t" + text + '\r\n\t</body>\r\n</html>';
		// document.getElementById("div_main").style.width = document.getElementById("body").clientWidth- 20 +"px";
		if (editor) {
			editor.setValue(text);
		} 
		// else {
			// document.getElementById("main").value = text;
		// }
		window.onresize = function(e){
			// document.getElementById("div_main").style.width = document.getElementById("body").clientWidth- 20 +"px";
		}
		document.getElementById("btn_paste").onclick = function() {
			window.Asc.plugin.executeMethod("PasteHtml",[editor.getValue()]);
		};
		document.getElementById("btn_copy").onclick = function() {
			if (editor.getValue() !== "") {
				editor.focus();
				var start = {line : 0, ch : 0};
				var end = {line : (editor.lineCount() - 1), ch : (editor.getLine(editor.lineCount() - 1).length)};
				editor.setSelection(start, end);
				document.execCommand("copy"); //copy
				editor.undoSelection();
				editor.focus();
			} else {
				editor.focus();
			}
		};
		document.getElementById("btn_clear").onclick = function() {
			editor.setValue("");
		};
		if (!editor) {
			editor = CodeMirror(document.getElementById("main"), {
				mode: "text/html",
				value: text,
				lineNumbers: true,
				lineWrapping: false
			});
			// editor = CodeMirror.fromTextArea(document.getElementById("main"), {
			// 	mode: "text/html",
			// 	lineNumbers: true,
			// 	lineWrapping: false
			// });
		}
	};

	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onTranslate = function()
	{
		var btn = document.getElementById("btn_paste");
		if (btn)
			btn.innerHTML = window.Asc.plugin.tr("Paste into the document");
	};

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		if (theme.type.indexOf("dark") !== -1)
			setTimeout(()=>editor.setOption("theme", "bespin"));
		else
			setTimeout(()=>editor.setOption("theme", "default"));
	};

})(window, undefined);
