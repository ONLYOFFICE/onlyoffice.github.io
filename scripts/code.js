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

})(window, undefined);
