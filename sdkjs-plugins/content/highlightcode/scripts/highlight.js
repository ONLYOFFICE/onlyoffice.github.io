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
	
	window.oncontextmenu = function(e) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

	var languages = hljs.listLanguages().sort(),									// array languages
		style_value,																// current value style
		code_field,																	// field for higlight code
		container,																	// scrollable conteiner
		timer,																		// for timer
		f_Paste = false,															// flag paste
		need_formatting = false,													// flag to check need format code or not
		flag_init = false,															// flag for restore background
		fontsAvailable = [];														// list of supported fonts
	const isIE = checkInternetExplorer();											// check IE
	const isDE = (window.AscDesktopEditor) ? true : false;							// check desktope editor
	const isFF = (navigator.userAgent.indexOf("Firefox") > -1) ? true : false;		// check FF
	const isOldChrome = checkOldChrome();                                           // check chrome older than 50 version
	var message = "This plugin doesn't work in Internet Explorer."                  // message for IE
	var xml_formatter = require('xml-formatter');									// object for xml formatting
	var format_lang = {																// list of supported languages for formatting
		xml : true,
		javascript : true,
		typescript: !isOldChrome,
		css : true,
		markdown : !isOldChrome,
		json : !isOldChrome,
		php : !isOldChrome,
		html : true
	};
	var settings = {								// object with current settings for user (there are default values)
		curLang : "Auto",							// current language (default - Auto)
		style : "googlecode.css",					// current style name (dafault - googlecode.css)
		background : "#FFFFFF",						// current background color (default - #FFFFFF)
		tab_replace : "0",							// value for tab raplace (default - 0)
		font : "Arial",								// current font (default - Arial)
		font_size : 14								// current font_size (default - 14)
	};
	var xml_formatter_settings = {					// object with settings for xml_formatter ( https://github.com/chrisbottin/xml-formatter )
		indentation: "\t",							// (String, default=' ') The value used for indentation.
		collapseContent: false,						// (Boolean, default=false] True to keep content in the same line as the element. Only works if element contains at least one text node
		lineSeparator: "\r\n",						// (String, default=\r\n) Specify the line separator to use
		whiteSpaceAtEndOfSelfclosingTag: false     	// (Boolean, default=false) to either end ad self closing tag with <tag/> or <tag \r\n />
	};
	var prettier_settings = {}						// object with settings for prettier ( https://prettier.io/docs/en/options.html )
	if (!isOldChrome) {
		prettier_settings = {						// object with settings for prettier ( https://prettier.io/docs/en/options.html )
			arrowParens: "always",					// Include parentheses around a sole arrow function parameter. (default - always)
			bracketSameLine: false,					// Put the closed bracket of a multi-line element at the end of the last line instead of being alone on the next line. (default - true)
			endOfLine : "crlf",						// Type of line separating. (default - lf)
			bracketSpacing: false,					// Print spaces between brackets in object literals. (default - true)
			embeddedLanguageFormatting: "off",		// Control whether Prettier formats quoted code embedded in the file. (default - auto)
			htmlWhitespaceSensitivity: "css",		// Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars. See whitespace-sensitive formatting for more info. (default - css)
			jsxSingleQuote: false,					// Use single quotes instead of double quotes in JSX. (default - false)
			printWidth: 1e+42,						// Specify the line length that the printer will wrap on. (default - 80)
			proseWrap: "never",						// By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer, e.g. GitHub comment and BitBucket. In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out with. (default - preserve)
			quoteProps: "as-needed",				// Change when properties in objects are quoted. (default - as-needed)
			semi: true,								// Print semicolons at the ends of statements. (default - true)
			singleQuote: false,						// Use single quotes instead of double quotes. (default - false)
			tabWidth: 4,							// Specify the number of spaces per indentation-level. (default - 2)
			trailingComma: "all",					// Print trailing commas wherever possible in multi-line comma-separated syntactic structures. (A single-line array, for example, never gets trailing commas.) (defalut - es5)
			useTabs: true,							// Indent lines with tabs instead of spaces. (default - false)
			vueIndentScriptAndStyle: false,			// Whether or not to indent the code inside <script> and <style> tags in Vue files. Some people (like the creator of Vue) don’t indent to save an indentation level, but this might break code folding in your editor. (default - false)
			jsxBracketSameLine: true,				// Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements). (default - false)
			plugins: prettierPlugins,				// list of available plugins.
			parser: null							// type of parser for current case
		};
	}
	var js_beautify_settings = {					// object with settings for js-beautify (https://github.com/beautify-web/js-beautify)
		indent_size: 4,								// Indentation size (default - 4)
		indent_char: " ",							// Indentation character (default - " ")
		indent_with_tabs: false,					// Indent with tabs (defailt - false)
		eol: "\n",									// Character(s) to use as line terminator (default - \n)
		end_with_newline: false,					// End output with newline (default - false)
		indent_level: 0,							// Initial indentation level (default - 0)
		preserve_newlines: true,					// Preserve line-breaks (defailt - true)
		max_preserve_newlines: 10,					// Number of line-breaks to be preserved in one chunk (defalit - 10)
		space_in_paren: false,						// Add padding spaces within paren, ie. f( a, b ) (defailt - false)
		space_in_empty_paren: false,				// Add a single space inside empty paren, ie. f( ) (default - false)
		jslint_happy: false,						// Enable jslint-stricter mode (default - false)
		space_after_anon_function: false,			// Add a space before an anonymous function's parens, ie. function () (default - false)
		space_after_named_function: false,			// Add a space before a named function's parens, i.e. function example () (default - false)
		brace_style: "collapse",					// The position of brackets in functions, conditions, etc. (defalut - "collapse")
		unindent_chained_methods: false,			// Don't indent chained method calls (default - false)
		break_chained_methods: false,				// Break chained method calls across subsequent lines (default - false)
		keep_array_indentation: false,				// Preserve array indentation (delault - false)
		unescape_strings: false,					// Decode printable characters encoded in xNN notation (default - false)
		wrap_line_length: 0,						// Wrap lines that exceed N characters (default - 0)
		e4x: false,									// Pass E4X xml literals through untouched (default - false)
		comma_first: false,							// Put commas at the beginning of new line instead of end (default - false)
		operator_position: "before-newline",		// Set operator position (default - "before-newline")
		indent_scripts: "keep",						// Sets indent level inside script tags (default - "keep")
		indent_inner_html: false,					// Ident html code inner other code (default - false)
		indent_empty_lines: false,					// Keep indentation on empty lines (default - false)
		templating: ["auto"]						// List of templating languages (auto,django,erb,handlebars,php,smarty) auto = none in JavaScript, all in html (default - auto)
	};
	// how to use:
	// output = html_beautify(source, js_beautify_settings);
	// output = css_beautify(source, js_beautify_settings);
	// output = js_beautify(source, js_beautify_settings);

	var myscroll = window.Asc.ScrollableDiv;

	window.Asc.plugin.init = function(text) {

		get_supported_fonts();
		$('#style_id').select2({
			minimumResultsForSearch: Infinity
		}).on('select2:select', function(e) {
			document.getElementById("style").href = "vendor/highlight/styles/" + e.params.data.id;
			settings.style = e.params.data.id;
			window.Asc.plugin.loadModule("./vendor/highlight/styles/" + e.params.data.id , function(content){
				style_value = content;
				set_bacground_color();
				if (isDE || isFF) {
					$("#jq_color").spectrum("set", settings.background);
				} else {
					background_color.value = settings.background;
				}
				flag_init = false;
			});
		});
		document.getElementById("btn_format").onclick = function() {
			need_formatting = true;
			grab();
		};
		document.getElementById("font_size").onchange = function() {
			if (this.value > 300) this.value = 300;
			if (this.value < 1) this.value = 1;
			document.getElementById('conteiner_id1').style["font-size"] = this.value + "pt";
			settings.font_size = this.value;
		};
		$('#language_id').select2({
			data : createLangForSelect(),
			minimumResultsForSearch: Infinity
		}).on('select2:select', function(e) {
			text = code_field.innerText;
			settings.curLang = e.params.data.text;		// change current language
			if (format_lang[settings.curLang]) {
				document.getElementById("btn_format").removeAttribute('disabled');
			} else {
				document.getElementById("btn_format").setAttribute('disabled', true);
			}
			ChangeCode(settings.curLang);
			flag = true;
		});
		myscroll = window.Asc.ScrollableDiv;
		myscroll.create_div("div_settings", {
					width: "",
					height: "",
					left: "10px",
					right: "10px",
					top: "60px",
					bottom: "5px"
		});
		myscroll.addEventListener();
		code_field = document.getElementById("conteiner_id1");
		container = document.getElementById('scrollable-container-id1');
		$(container).addClass('codefield');
		$(code_field).addClass('content');
		$(container).addClass('hljs');
		var background_color = document.getElementById("background_color");
		var temp_code,
			flag = false;	//flag change code (true = changed)

		if (isDE || isFF) {
			document.getElementById("jq_color").style.display = "inline";
			document.getElementById("background_color").style.display = "none";
			initSpectrum("#FFFFFF");
		}
		background_color.onchange = function() {
			set_bacground_color(background_color.value);
		};

		function createLangForSelect() {
			var tmpArr = [{id:0, text:"Auto"}];
			for (var i = 0; i < languages.length; i++) {
				tmpArr.push({
					id : i+1,
					text : languages[i]
				});
			}
			return tmpArr;
		};	

		function deleteSelected(start,end) {
			text = code_field.innerText;
			text = text.substring(0, start) + text.substring(end);
			clearTimeout(timer);
			timer = setTimeout(ChangeCode, 35);
		};

		restore_settings();

		if (!flag) { 
			text = text.replace(/<span style="mso-tab-count:1;">	<\/span>/g,"%%%bpmn%%%");
			text = text.replace(/<p/g,"<div");
			text = text.replace(/<\/p>/g,"</div>");
			code_field.focus();
			code_field.innerHTML = text;
			text = code_field.innerText;
			code_field.innerText = text;
			text = code_field.innerHTML;
			text = text.replace(/%%%bpmn%%%/g,"\t");
			//text = text.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g,"\t");
			code_field.innerHTML = "";
			text = text.replace(/&nbsp;/g," ");
			text = text.replace(/<br>/g,"\n");
			text = text.replace(/&lt;/g,"<");
			text = text.replace(/&gt;/g,">");
			ChangeCode();
		}

		function highlight(text) {
			temp_code = hljs.highlight(text, {language: settings.curLang});
			createPreview(temp_code);
		};

		function ChangeCode() {
			if (text.trim().replace(/\r\n/g, "")) {
				if (need_formatting) {
					var isAuto = false;
					if (settings.curLang == "Auto") {
						temp_code = hljs.highlightAuto(text, languages);
						settings.curLang = temp_code.language;
						isAuto = true;
					}
					if (format_lang[settings.curLang]) {
						try {
							switch (settings.curLang) {
								case "xml":
									if (text.indexOf("<html") !== -1 || text.indexOf("<body") !== -1) {
										if (isOldChrome) {
											text = html_beautify(text, js_beautify_settings);
										} else {
											prettier_settings.parser = "html";
											text = prettier.format(text, prettier_settings);
										}
									
									} else {
										text = xml_formatter(text, xml_formatter_settings);
									}
									break;
								case "javascript":
									if (isOldChrome) {
										text = js_beautify(text, js_beautify_settings);
									} else {
										prettier_settings.parser = "babel";
										text = prettier.format(text, prettier_settings);
									}
									break;
								case "typescript":
									prettier_settings.parser = "typescript";
									text = prettier.format(text, prettier_settings);
									break;
								case "css":
									if (isOldChrome) {
										text = css_beautify(text, js_beautify_settings);
									} else {
										prettier_settings.parser = "css";
										text = prettier.format(text, prettier_settings);
									}
									break;
								case "markdown":
									prettier_settings.parser = "markdown"
									text = prettier.format(text, prettier_settings);
									break;
								case "json":
									prettier_settings.parser = "json";
									text = prettier.format(text, prettier_settings);
									break;
								case "php":
									prettier_settings.parser = "php";
									text = prettier.format(text, prettier_settings);
									break;
							}
							highlight(text, settings.curLang);
						} catch (error) {
							console.log(error.name + ':' + error.message);
						}
					} else {
						if (!isAuto) {
							highlight(text, settings.curLang);
						} else {
							temp_code = hljs.highlightAuto(text, languages);
							createPreview(temp_code);
						}
					}
					need_formatting = false;
				} else {
					if (settings.curLang == "Auto")
						temp_code = hljs.highlightAuto(text, languages);
					else
						temp_code = hljs.highlight(text, {language: settings.curLang});

					createPreview(temp_code);
				}
			}
			$("#conteiner_id1").focus();
		};

		$("#conteiner_id1").keydown(function(event) {
			if ( event.keyCode == 13 ) {	
				cancelEvent(event);
				var range = $("#conteiner_id1").get_selection_range();
				if (range.end == code_field.innerText.length)
					insertHTML("\n");

				insertHTML("\n");
				deleteSelected(range.start + 1, range.end + 1);
				myscroll.updateScroll(code_field);
				myscroll.updateScroll(code_field);
				$("#conteiner_id1").set_selection(range.start + 1, range.start + 1);
			}
			if ( event.keyCode == 9 ) { 
				cancelEvent(event);
				tab_untab(event);
				myscroll.updateScroll(code_field);
				myscroll.updateScroll(code_field);
			}
		});

		function tab_untab(event) {
			let one_line = false;
			let right_tab = false;
			var range = $("#conteiner_id1").get_selection_range();
			text = $("#conteiner_id1").text();
			let substr_left = text.substring(range.start, range.start - 1);
			let substr_right = text.substring(range.start, range.end + 1);
			if ((substr_left =="\t" && event.shiftKey))
				range.start--;
			let start = range.start;
			let end = range.end;
			let arr = text.substring(range.start, range.end);
			arr = arr.split("\n");

			if (!event.shiftKey) {
				if (range.start != range.end)
					one_line = true;

				for (let i in arr) {
					arr[i] = '\t' + arr[i];
					end++;
					if (i == 0)
						start++;
				}
			} else {
				if ( (end == 0) && (start == 0) && (text.substring(0, 1) == "\t") ) {
					text = text.substring(1);
					code_field.innerText= text;
					ChangeCode();
					return;
				}
				if (range.start != range.end)
					for (let i in arr)
						if (arr[i][0] == "\t")
							one_line = true;
	
				if ((substr_left != "\t") && !one_line && (substr_left != "\n") && (substr_right != "\t"))
					return;
				if ( (substr_left == "\t") && !one_line && arr.length > 1)
					end--;

				if ( ( (range.start == range.end) || !one_line) && (substr_left != "\n") && (substr_right != "\t") )
					range.start--;

				for (let i in arr) {
					if ( text.substring(range.end,range.end + 1) == '\t') {
						text = text.slice(0, range.end) + text.slice((range.end + 1));
						right_tab = true;
						continue;
					}
					if (arr[i][0] == '\t')
						arr[i] = arr[i].substr(1);
					else if (arr.length > 1)
						end++;

					if (substr_left != "\n")
						end--;
				}
			}
			arr = arr.join('\n');
			text = text.slice(0, range.start) + arr + text.slice(range.end);
			range.start = range.start != range.end ? range.start : end;
			range.end = end;
			if (right_tab)
				range.start = end;
			if (!event.shiftKey && one_line)
				range.start = start;
			code_field.innerText = text;
			ChangeCode();
			$("#conteiner_id1").set_selection(range.start, range.end);
		};
		
		document.getElementById("btn_highlight").onclick = function() {
			text = code_field.innerHTML;
			if (text != code_field.innerText) {
				text = text.replace(/<p/g,"<div");
				text = text.replace(/<\/p>/g,"</div>");	
			}
			code_field.innerHTML = text;
			text = code_field.innerText;
			ChangeCode();
		};

		document.addEventListener('paste', function() {
			var range = $("#conteiner_id1").get_selection_range();
			text = code_field.innerText.substring(0, range.start) + "%%%bpmn%%%" + code_field.innerText.substring(range.end);
			f_Paste = true;
			code_field.innerHTML ="";
		});

		$("#conteiner_id1").on("input", function() {
			if (f_Paste){
				grab();
				f_Paste = false;
				return;
			}
			clearTimeout(timer);
			timer = setTimeout(grab,1000);
		});

		function grab() {
			if (f_Paste) {
				let count = code_field.innerHTML;
				if (count != code_field.innerText) {
					count = count.replace(/<p/g,"<div");
					count = count.replace(/<\/p>/g,"</div>");
				}
				code_field.innerHTML = count;
				count = code_field.innerText;
				count = count.substring(0);
				count = count.split("\n");
				if (navigator.userAgent.search(/Firefox/) <= 0)
					if (count[count.length-1] == "")
						count.pop();

				text = text.replace(/&nbsp;/g, " ");
				text = text.split("%%%bpmn%%%");
				let new_text = text[0] + count.join('\n') + text[1];
				if (navigator.userAgent.search(/Firefox/) > 0)
					new_text = new_text.replace(/\n/g,"╫");

				code_field.innerText = new_text;
				var start = (new_text.length - text[1].length);
				$("#conteiner_id1").set_selection((start), (start));
				text = code_field.innerText;
				if (navigator.userAgent.search(/Firefox/) > 0)
					text = text.replace(/╫/g,"\n");

				ChangeCode();
			} else {
				var range = (need_formatting) ? null : $("#conteiner_id1").get_selection_range();
				text = code_field.innerHTML;
				code_field.innerHTML = text;
				text = code_field.innerText;
				ChangeCode();
				if (range)
					$("#conteiner_id1").set_selection(range.start, range.start);
			}
		};
		
		window.Asc.plugin.resizeWindow(800, 600, 800, 600, 0, 0);				//resize plugin window		
		
		window.onresize = function() {
			myscroll.updateScroll(code_field);
			myscroll.updateScroll(code_field);
		};
	};

	function initSpectrum(clr) {
		$("#jq_color").spectrum({
			color: clr,
			showInput: true,
			className: "full-spectrum",
			showInitial: true,
			showPalette: true,
			showSelectionPalette: true,
			maxSelectionSize: 10,
			preferredFormat: "hex",
			move: function(color) {
				
			},
			show: function() {
			
			},
			beforeShow: function() {
			
			},
			hide: function(color) {
				set_bacground_color(color.toHexString());
				background_color.value = color.toHexString();
			},
			change: function() {
				
			},
			palette: [
				["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
				"rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
				["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
				"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
				["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
				"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
				"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
				"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
				"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
				"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
				"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
				"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
				"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
				"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
			]
		});
	};
	
	function insertHTML(html) {
		try {
			var selection = window.getSelection(),
				range = selection.getRangeAt(0),
				temp = document.createElement("div"),
				insertion = document.createDocumentFragment();
			temp.innerHTML = html;
			while (temp.firstChild) {
				insertion.appendChild(temp.firstChild);
			}
			//range.deleteContents();	//delete the value
			range.insertNode(insertion);
		} catch (z) {
			try {
				document.selection.createRange().pasteHTML(html);
			} catch (z) {}
		}
		var range = $("#conteiner_id1").get_selection_range();
		$("#conteiner_id1").set_selection(range.end, range.end);
	};

	function createPreview(code) {
		var range = (need_formatting) ? null : $("#conteiner_id1").get_selection_range();
		code_field.innerHTML = code.value;   // paste the value
		if (range) {
			$("#conteiner_id1").set_selection(range.start, range.end);
		} else if (need_formatting) {
			$("#conteiner_id1").set_selection($("#conteiner_id1").text().length, $("#conteiner_id1").text().length);
		}
			
		select_language(code.language);
		myscroll.updateScroll(code_field);
		myscroll.updateScroll(code_field);
	};
	
	function createHTML(code) {
		var tab_rep_count = $('#tab_replace_id option:selected')[0].value;
		if (tab_rep_count == 2) {
			code = code.replace(/\t/g,"&nbsp;&nbsp;");
		} else if (tab_rep_count == 4) {
			code = code.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
		} else {
			code = code.replace(/\t/g,"<span style='mso-tab-count:1'></span>");
		}
		code = code.split("\n");
		for (var i in code)
			code[i] = (code[i] == "") ? "<p>&nbsp</p>" : "<p>" +code[i] + "</p>";

		if (code[code.length-1] == "<p>&nbsp</p>")
			code.pop();

		window.Asc.plugin.executeMethod("PasteHtml",['<html lang=\"en\"><head><style> p{background:'+settings.background+'}\r\n'+style_value +'</style></head><body><div style = \"white-space: pre;\"><span style =\"font-size:'+settings.font_size+'pt; font-family:'+settings.font+';\">'+code.join("")+'</span></div></body></html>']);
	};

	$.fn.get_selection_range = function() {
		var selection = window.getSelection();
		if (!selection.rangeCount)
			return null;
			
		var range = window.getSelection().getRangeAt(0);
		var cloned_range = range.cloneRange();
		cloned_range.selectNodeContents(this.get(0));
		cloned_range.setEnd(range.startContainer, range.startOffset);
		var start = cloned_range.toString().length;
		var selected_text = range.toString();
		var end = start + selected_text.length;
		var result = {
			start: start,
			end: end,
			selected_text: selected_text
		}
		return result;
	};

	$.fn.set_selection = function(start, end) {
		var target_element = this.get(0);
		start = start || 0;
		if (typeof(target_element.selectionStart) == "undefined") {
			if (typeof(end) == "undefined") end = target_element.innerHTML.length;
	
			var character_index = 0;
			var range = document.createRange();
			range.setStart(target_element, 0);
			range.collapse(true);
			var node_stack = [target_element];
			var node = null;
			var start_found = false;
			var stop = false;
	
			while (!stop && (node = node_stack.pop()) ) {
				if (node.nodeType == 3){
					var next_character_index = character_index + node.length;
					if (!start_found && start >= character_index && start <= next_character_index) {
						range.setStart(node, start - character_index);
						start_found = true;
					}
					
					if (start_found && end >= character_index && end <= next_character_index) {
						range.setEnd(node, end - character_index);
						stop = true;
					}
					character_index = next_character_index;
				} else {
					var child_counter = node.childNodes.length;
					while (child_counter --) {
						node_stack.push(node.childNodes[child_counter]);
					}
				}
			}

			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			if (typeof(end) == "undefined") end = target_element.value.length;
			target_element.focus();
			target_element.selectionStart = start;
			target_element.selectionEnd = end;
		}
	};

	function checkInternetExplorer() {
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

	function checkOldChrome() {
		let raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
		let version = raw ? parseInt(raw[2], 10) : -1;
		console.log(version);
		return version <= 49;
	}

	function cancelEvent(e) {
		if (e && e.preventDefault) {
			e.stopPropagation(); // DOM style (return false doesn't always work in FF)
			e.preventDefault();
		} else {
			window.event.cancelBubble = true; //IE stopPropagation
		}
	};

	function hexc(colorval) {
		var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		delete(parts[0]);
		for (var i = 1; i <= 3; ++i) {
			parts[i] = parseInt(parts[i]).toString(16);
			if (parts[i].length == 1) parts[i] = '0' + parts[i];
		}
		return ('#' + parts.join(''));
	};

	function get_supported_fonts() {
		const fontCheck = new Set([
			'Arial', 'Asana', 'Monotype corsiva', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman',
			'American Typewriter', 'Andale Mono', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Copperplate', 'Courier', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Times', 'Trattatello', 'Zapfino', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji','Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic'
		].sort());
		  
		document.fonts.ready.then(function() {
			for (const font of fontCheck.values()) {
				if (document.fonts.check(`14px "${font}"`))
					fontsAvailable.push({ id : font, text : font});
			}
			$('#fonts').select2({
				data : fontsAvailable,
				minimumResultsForSearch: Infinity
			}).on('select2:select', function(e) {
				document.getElementById('conteiner_id1').style["font-family"] = e.params.data.text;
				settings.font = e.params.data.id;
			});
			$('#fonts').val(settings.font).trigger("change");
			document.getElementById('conteiner_id1').style["font-family"] = settings.font;
		});
	};

	function select_language(lang) {
		for (var i=0; i<$('#language_id')[0].length;i++) {
			if ($('#language_id')[0].options[i].text == lang) {
				settings.curLang = lang;
				if (format_lang[lang]) {
					document.getElementById("btn_format").removeAttribute('disabled');
				} else {
					document.getElementById("btn_format").setAttribute('disabled', true);
				}
				$('#language_id').val(i).trigger("change");
				break;
			}	
		}
	};

	function select_style(style) {
		flag_init = true;
		$('#style_id').val(style).trigger("change");
		var data = {
			"id": style
		  };
		  
		  $('#style_id').trigger({
			  type: 'select2:select',
			  params: {
				  data: data
			  }
		  });
	};
	
	function set_bacground_color(color) {
		if (flag_init)
			return;
		
		var main;

		for (var i = 0; i < document.styleSheets.length; i++) {
			if (!color && document.styleSheets[i].href && document.styleSheets[i].href.indexOf(settings.style) !== -1) {
				var rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
				color = (rules[0].style.background.indexOf("rgb") !== -1) ? hexc(rules[0].style.background) : rules[0].style.background;
			}
			if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf("resources/css/plugin_style.css") !== -1) {
				main = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
			}
			if (color && main)
				break;
		}
		main[0].style.background = color;
		settings.background = color;
	}

	function save_settings() {
		localStorage.setItem("pluginHighglightSettings", JSON.stringify(settings));
	};

	function restore_settings() {
		var tmp = JSON.parse(localStorage.getItem("pluginHighglightSettings"));

		if (tmp) {
			
			if (tmp.curLang)
				select_language(tmp.curLang);

			if (tmp.background) {
				set_bacground_color(tmp.background);
				background_color.value = settings.background;
			}

			if (tmp.style)
				select_style(tmp.style);

			if (tmp.tab_replace) {
				settings.tab_replace = tmp.tab_replace;
				$('#tab_replace_id').val(settings.tab_replace).trigger("change");
			}

			if (tmp.font)
				settings.font = tmp.font;

			if (tmp.font_size) {
				document.getElementById("font_size").value = tmp.font_size;
			}
		}
		document.getElementById("font_size").onchange();
	};

	window.Asc.plugin.button = function(id) {
		save_settings();
		if (id == 0) {
			createHTML(code_field.innerHTML);
			this.executeCommand("close", "");
		}
		if ( (id==-1) || (id==1) ) {
			this.executeCommand("close", "");
		}
	};

	window.Asc.plugin.onExternalMouseUp = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);
		document.dispatchEvent(evt);
	};

    window.Asc.plugin.onThemeChanged = function(theme) {
        window.Asc.plugin.onThemeChangedBase(theme);

        var rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
    };

	window.Asc.plugin.onTranslate = function() {
		var lb_lanuage = document.getElementById("lb_lanuage");
		if (lb_lanuage) 
			lb_lanuage.innerHTML = window.Asc.plugin.tr("Language");

		var btn_highlight = document.getElementById("btn_highlight");
		if (btn_highlight)
			btn_highlight.innerHTML = window.Asc.plugin.tr("Highlight");

		var lb_style = document.getElementById("lb_style");
		if (lb_style)
			lb_style.innerHTML = window.Asc.plugin.tr("Style");

		var lb_repTab = document.getElementById("lb_repTab");
		if (lb_repTab)
			lb_repTab.innerHTML = window.Asc.plugin.tr("Tab replace");

		var lb_font = document.getElementById("lb_font");
		if (lb_font)
			lb_font.innerHTML = window.Asc.plugin.tr("Font settings");

		var opt_DontRep = document.getElementById("opt_DontRep");
		if (opt_DontRep)
			opt_DontRep.innerHTML = window.Asc.plugin.tr("Use tabs");

		var opt_2sp = document.getElementById("opt_2sp");
		if (opt_2sp)
			opt_2sp.innerHTML = window.Asc.plugin.tr("2 spaces");

		var opt_4sp = document.getElementById("opt_4sp");
		if (opt_4sp)
			opt_4sp.innerHTML = window.Asc.plugin.tr("4 spaces");

		var lb_bgColor = document.getElementById("lb_bgColor");
		if (lb_bgColor)
			lb_bgColor.innerHTML = window.Asc.plugin.tr("Background");

		var btn_format = document.getElementById("btn_format");
		if (btn_format) {
			btn_format.innerHTML = window.Asc.plugin.tr("Format");
			btn_format.title = window.Asc.plugin.tr("Available only for the following languages") + ": xml, javascript, typescript, css, markdown, json, php, html";

		}
			
		$('#tab_replace_id').select2({
			minimumResultsForSearch: Infinity
		}).on('change', function(e) {
			// так как парсятся не все языки, то на редактировании изменения будут только у тех, что обрабатываются через библиотеки (при вставке в документ у всех)
			switch (e.currentTarget.value) {
				case "0":
					xml_formatter_settings.indentation = "\t";
					prettier_settings.useTabs = true;
					js_beautify_settings.indent_with_tabs = true;
					settings.tab_replace = 0;
					break;
				case "2":
					xml_formatter_settings.indentation = "  ";
					prettier_settings.useTabs = false;
					prettier_settings.tabWidth = 2;
					js_beautify_settings.indent_size = 2;
					settings.tab_replace = 2;
					break;
				case "4":
					xml_formatter_settings.indentation = "    ";
					prettier_settings.useTabs = false;
					prettier_settings.tabWidth = 4;
					js_beautify_settings.indent_size = 4;
					settings.tab_replace = 4;
					break;
			}
		});
	};
})(window, undefined);