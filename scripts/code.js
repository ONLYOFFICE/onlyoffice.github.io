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
			editor.focus();
			if (editor.getValue() == "")
				document.getElementById("textarea_copy").innerHTML = "⁣";
			else
				document.getElementById("textarea_copy").innerHTML = editor.getValue().replace(/>/g,"&gt").replace(/</g,"&lt").replace(/\n/g,"<br>").replace(/\t/g,"&nbsp&nbsp&nbsp&nbsp");
			selectText("textarea_copy");
			editor.focus();
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
	};

})(window, undefined);
