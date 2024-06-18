window.initCounter = 0;

var CurrentElementModeType = {
	CustomFunction  : 0,
	Macros 			: 1
};
var CurrentElementMode = CurrentElementModeType.Macros;

var macrosOnStart = {};
var functionsOnStart = {};

var bIsCustomFunctionsSupport = false;

function on_init_server(type)
{
	if (type === (window.initCounter & type))
		return;
	window.initCounter |= type;
	if (window.initCounter === 3)
	{
		load_library("onlyoffice", "./libs/" + Asc.plugin.info.editorType + "/api.js");
	}
}

function load_library(name, url) 
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4)
		{
			var EditSession = ace.require("ace/edit_session").EditSession;
			var editDoc = new EditSession(xhr.responseText, "ace/mode/javascript");
			editor.ternServer.addDoc(name, editDoc);
		}
	};
	xhr.send();
}

document.addEventListener("DOMContentLoaded", function() {
	window.Asc.plugin.enableDrops = true;
	let el = document.getElementById('editorWrapper');
	el.ondrop = function(e) {
		if (e && e.preventDefault)
			e.preventDefault();
		return false;
	};
	el.ondragenter = function(e) {
		if (e && e.preventDefault)
			e.preventDefault();
		return false;
	};
	el.ondragover = function(e) {
		if (e && e.preventDefault)
			e.preventDefault();
		if (e && e.dataTransfer)
			e.dataTransfer.dropEffect = "none";
		return false;
	};
});

function setStyles() {
	var styleTheme = document.createElement('style');
	styleTheme.type = 'text/css';

	window.lockTooltipsPosition = true;
	var editor_elem = document.getElementById("editorWrapper");
	var rules = ".Ace-Tern-tooltip {\
				box-sizing: border-box;\
				max-width: " + editor_elem.offsetWidth + "px !important;\
				min-width: " + editor_elem.offsetWidth + "px !important;\
				left: " + editor_elem.offsetLeft + "px !important;\
				bottom: 0px !important;\
				}";
				// bottom: " + parseInt(document.getElementsByClassName("divHeader")[0].offsetHeight) + "px !important;\

	styleTheme.innerHTML = rules;
	document.getElementsByTagName('head')[0].appendChild(styleTheme);
};

var editor = ace.edit("editor");
editor.session.setMode("ace/mode/javascript");
editor.container.style.lineHeight = "20px";
editor.setValue("");

editor.getSession().setUseWrapMode(true);
editor.getSession().setWrapLimitRange(null, null);
editor.setShowPrintMargin(false);
editor.$blockScrolling = Infinity;

ace.config.loadModule('ace/ext/tern', function () {
	editor.setOptions({
		enableTern: {
			defs: ['browser', 'ecma5'],
			plugins: { doc_comment: { fullDocs: true } },
			useWorker: !!window.Worker,
			switchToDoc: function (name, start) {},
			startedCb: function () {
				on_init_server(1);
			},
		}, 
		enableSnippets: false
	});
});

if (!window.isIE) {
	ace.config.loadModule('ace/ext/language_tools', function () {
		editor.setOptions({
			enableBasicAutocompletion: false,
			enableLiveAutocompletion: true
		});
	});
}

ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
	editor.setOptions({
		autoBeautify: true,
		htmlBeautify: true,
	});
	window.beautifyOptions = beautify.options;
});

(function(window, undefined){

	var Content = {
		macrosArray : [],
		current : -1
	};
	var CustomFunctions = {
		macrosArray: [],
		current: -1
	};
	let zoom = 1;

	editor.getSession().on('change', function() {
		let obj = (CurrentElementModeType.Macros === CurrentElementMode) ? Content : CustomFunctions;

		if (obj.current == -1 || window.isDisable)
			return;

		obj.macrosArray[obj.current].value = editor.getValue();
	});

	function create_guid(a,b)
	{
		for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'');
		return b
	};

	function updateMacrosMenu()
	{
		if (CurrentElementModeType.Macros === CurrentElementMode)
		{
			if (Content.current < 0)
				Content.current = 0;

			if (Content.current >= Content.macrosArray.length)
				Content.current = Content.macrosArray.length - 1;
		}
					
		var menuContent = "";
		for (var i = 0; i < Content.macrosArray.length; i++)
		{
			var cl = (i == Content.current) ? "macrosSelected" : "macros";
			var name = $('<div/>').text(Content.macrosArray[i].name).html();
			var item = "<div class=\"common_punct draggable " + cl + "\" id=\"macros" + i + "\" onclick=\"window.onItemClick(" + i + ", true);\" draggable=\"true\">" + name;
			if (true === Content.macrosArray[i].autostart) {
				let prop = "";
				if (navigator.userAgent.indexOf('Macintosh') != -1) {
					prop = "style = \"top : calc(50% - 6px) !important\"";
				} else if (navigator.userAgent.indexOf('Linux') != -1) {
					prop = "style = \"top : calc(50% - 4px) !important\"";
				}
				item += ("<div class=\"macrosAutostart\"" + prop + ">(A)</div>");
			}
			let imgSrc = './resources/img/dots_' + (window.Asc.plugin.theme.type.includes('dark') ? 'white': 'dark') + '.svg'
			item += '<div id="mac_bt' + i + '" class="btn-text-default header_btn cc_btn macros_btn" style="border: none !important;" onclick="onClickCC(event)""><img class="img_macros" id="mac_im' + i + '" onclick="onClickCC(event)" src="' + imgSrc + '" style="width: 20px; height: 20px;" /></div>';
			item += "</div>";
			menuContent += item;

			if (!Content.macrosArray[i]["guid"])
				Content.macrosArray[i]["guid"] = create_guid();
		}
		
		var elem = document.getElementById("menu_content_macros");
		elem.innerHTML = menuContent;
		
		if (CurrentElementModeType.Macros === CurrentElementMode)
			onItemClick(Content.current, true);

		updateScrollMenu();
	}

	function updateFunctionsMenu()
	{
		if (CurrentElementModeType.CustomFunction === CurrentElementMode)
		{
			if (CustomFunctions.current < 0)
				CustomFunctions.current = 0;
			if (CustomFunctions.current >= CustomFunctions.macrosArray.length)
				CustomFunctions.current = CustomFunctions.macrosArray.length - 1;
		}
		
		var menuContent = "";
		for (var i = 0; i < CustomFunctions.macrosArray.length; i++)
		{
			var cl = (i == CustomFunctions.current) ? "functionSelected" : "function";
			var name = $('<div/>').text(CustomFunctions.macrosArray[i].name).html();
			let imgSrc = './resources/img/dots_' + (window.Asc.plugin.theme.type.includes('dark') ? 'white': 'dark') + '.svg'
			var item = "<div class=\"common_punct draggable " + cl + "\" id=\"function" + i + "\" onclick=\"window.onItemClick(" + i + ", false);\" draggable=\"true\">" + name;
			item += '<div id="func_btn' + i + '" class="btn-text-default header_btn cc_btn function_btn" style="border: none !important;" onclick="onClickCC(event)""><img class="func_img" id="func_img' + i + '" onclick="onClickCC(event)" src="' + imgSrc + '" style="width: 20px; height: 20px;" /></div>';
			item += "</div>";
			menuContent += item;

			if (!CustomFunctions.macrosArray[i]["guid"])
				CustomFunctions.macrosArray[i]["guid"] = create_guid();
		}		

		var elem = document.getElementById("menu_content_functions");
		elem.innerHTML = menuContent;
		
		if (CurrentElementModeType.CustomFunction === CurrentElementMode)
			onItemClick(CustomFunctions.current, false);

		updateScrollMenu();
	}

	let indActive = 0;
	let activeElement;
	let currentElement;
	let nextElement;
	function makeDragable() {
		const macrosList = document.getElementById("menu_content_macros");
		const functionList = document.getElementById("menu_content_functions");

		macrosList.addEventListener('dragstart', function(evt) {
			window.CustomContextMenu.hide();
			evt.dataTransfer.setData("text", evt.target.id);
			evt.dataTransfer.effectAllowed = "move";
			activeElement = evt.target;
			evt.target.classList.add('dragged');
			indActive = Content.macrosArray.findIndex(function(el) {
				return (el.name == evt.target.innerText)
			})
			evt.target.onclick();
		});

		functionList.addEventListener('dragstart', function(evt) {
			window.CustomContextMenu.hide();
			evt.dataTransfer.setData("text", evt.target.id);
			evt.dataTransfer.effectAllowed = "move";
			activeElement = evt.target;
			evt.target.classList.add('dragged');
			indActive = CustomFunctions.macrosArray.findIndex(function(el) {
				return (el.name == evt.target.innerText)
			})
			evt.target.onclick();
		});

		macrosList.addEventListener('dragend', function(evt) {
			evt.target.classList.remove('dragged');
			$('.dragHovered').removeClass("dragHovered");

			if (currentElement === activeElement)
				return;

			try {
				macrosList.insertBefore(activeElement, nextElement);
			} catch (err) {
				return;				
			}			
			let indNext = Content.macrosArray.findIndex(function(el) {
				return (nextElement && el.name == nextElement.innerText)
			})
			if (indNext === -1)
				indNext = Content.macrosArray.length;

			if (indActive < indNext)
				indNext--;

			let tmp = Content.macrosArray.splice(indActive, 1)[0];
			Content.macrosArray.splice(indNext, 0, tmp);
			Content.current = indNext;
			indActive = 0;
			updateMacrosMenu();
		});

		functionList.addEventListener('dragend', function(evt) {
			evt.target.classList.remove('dragged');
			$('.dragHovered').removeClass("dragHovered");

			if (currentElement === activeElement)
				return;

			try {
				functionList.insertBefore(activeElement, nextElement);
			} catch (err) {
				return;				
			}
			let indNext = CustomFunctions.macrosArray.findIndex(function(el) {
				return (nextElement && el.name == nextElement.innerText)
			})
			if (indNext === -1)
				indNext = CustomFunctions.macrosArray.length;

			if (indActive < indNext)
				indNext--;

			let tmp = CustomFunctions.macrosArray.splice(indActive, 1)[0];
			CustomFunctions.macrosArray.splice(indNext, 0, tmp);
			CustomFunctions.current = indNext;
			indActive = 0;
			updateFunctionsMenu();
		});

		function getNextElement(cursorPosition, currentElement) {
			cursorPosition = cursorPosition * ((1 + (1 - zoom)).toFixed(1));
			const currentElementCoord = currentElement.getBoundingClientRect();
			const currentElementCenter = currentElementCoord.y + currentElementCoord.height * 0.45;
			const nextElement = (cursorPosition < currentElementCenter) ? currentElement : currentElement.nextElementSibling;
			return nextElement;
		};

		macrosList.addEventListener('dragover', function(evt) {
			currentElement = evt.target;
			let bDragAllowed = !!((CurrentElementModeType.Macros === CurrentElementMode) && currentElement.id.includes('mac'));
			evt.preventDefault();
			evt.dataTransfer.dropEffect = bDragAllowed ? "move" : "none";
			const isMoveable = currentElement.classList.contains('draggable');
			if (!isMoveable)
				return;

			nextElement = getNextElement(evt.clientY, currentElement);
			$('.dragHovered').removeClass("dragHovered")
			if (nextElement)
				nextElement.classList.add('dragHovered');
		});
		
		functionList.addEventListener('dragover', function(evt) {
			currentElement = evt.target;
			let bDragAllowed = !!((CurrentElementModeType.CustomFunction === CurrentElementMode) && currentElement.id.includes('function'));
			evt.preventDefault();
			evt.dataTransfer.dropEffect = bDragAllowed ? "move" : "none";
			const isMoveable = currentElement.classList.contains('draggable');
			if (!isMoveable)
				return;

			nextElement = getNextElement(evt.clientY, currentElement);
			$('.dragHovered').removeClass("dragHovered")
			if (nextElement)
				nextElement.classList.add('dragHovered');
		});
	};

	function onItemClick(index, isMacros)
	{
		let obj = isMacros ? Content : CustomFunctions,
			normalClass = isMacros ? 'macros' : 'function',
			selectedClass = isMacros ? 'macrosSelected' : 'functionSelected';

		if (isMacros) {
			CurrentElementMode = CurrentElementModeType.Macros;
			CustomFunctions.current = -1;
		} else {
			CurrentElementMode = CurrentElementModeType.CustomFunction;
			Content.current = -1;
		}

		let arr = document.getElementsByClassName('macrosSelected');
		if (arr.length) {
			let macrosSelected = arr[0];
			macrosSelected.classList.remove('macrosSelected');
			macrosSelected.classList.add('macros');
			if (window.Asc.plugin.theme.type == 'light')
				macrosSelected.lastChild.lastChild.setAttribute('src' ,'./resources/img/dots_dark.svg');
		}
		arr = document.getElementsByClassName('functionSelected');
		if (arr.length) {
			let functionSelected = arr[0];
			functionSelected.classList.remove('functionSelected');
			functionSelected.classList.add('function');
			if (window.Asc.plugin.theme.type == 'light')
				functionSelected.lastChild.lastChild.setAttribute('src' ,'./resources/img/dots_dark.svg');
		}
		let elSelected = document.getElementById(normalClass + index);
		if (elSelected) {
			elSelected.classList.remove(normalClass);
			elSelected.classList.add(selectedClass);
			elSelected.lastChild.lastChild.setAttribute('src' ,'./resources/img/dots_white.svg');
		}
		obj.current = index;

		// if (index != obj.current || isAttack)
		// {
		// 	for (var i = 0; i < obj.macrosArray.length; i++)
		// 	{
		// 		var elem = document.getElementById(normalClass + i);
		// 		if (i == index)
		// 		{
		// 			elem.classList.remove(normalClass);
		// 			elem.classList.add(selectedClass);
		// 		}
		// 		else if (i == obj.current)
		// 		{
		// 			elem.classList.remove(selectedClass);
		// 			elem.classList.add(normalClass);
		// 		}
		// 	}
		// 	obj.current = index;
		// }

		// var buttonAutoStart = document.getElementById("button_autostart");
		var buttonRun = document.getElementById("button_run");
		if (-1 == obj.current)
		{
			window.isDisable = true;
			editor.setValue('');
			editor.setReadOnly(true);
			window.isDisable = false;
			// buttonAutoStart.style.display = "none";
		}
		else
		{
			window.isDisable = true;
			editor.setValue(obj.macrosArray[index].value);
			editor.setReadOnly(false);
			window.isDisable = false;
			// buttonAutoStart.style.display = "inline-block";
			editor.focus();
			if (isMacros) {
				buttonRun.style.opacity = 1;
				// if (obj.macrosArray[obj.current].autostart)
				// 	buttonAutoStart.classList.add("primary");
				// else
				// 	buttonAutoStart.classList.remove("primary");
			} else {
				// buttonAutoStart.style.display = "none";
				buttonRun.style.opacity = 0.6;
			}
			
		}
			
		editor.selection.clearSelection();
		editor.scrollToRow(0);
	};
	window.onItemClick = onItemClick;

	function onClickCC(event) {
		if (!event)
			return;
		event.preventDefault();
		event.stopPropagation();
		const srcElement = event.srcElement;
		var className = srcElement.getAttribute("class");
		if (className && (-1 != className.indexOf("mac") || -1 != className.indexOf("fun")))
		{
			window.CustomContextMenu.mode = srcElement.id.includes('mac') ? CurrentElementModeType.Macros : CurrentElementModeType.CustomFunction;
			let len = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? 6 : 8;
			window.CustomContextMenu.macrosIndex = parseInt(srcElement.id.substr(len));
			let obj = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? Content : CustomFunctions;
			if (window.CustomContextMenu.mode === CurrentElementModeType.Macros)
				document.getElementById("menu_autostart_id").innerHTML = window.Asc.plugin.tr(obj.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? "Unmake autostart" : "Make autostart");

			let buttonRun = this.document.getElementById('menu_run_id');
			let buttonAutoStart = this.document.getElementById('menu_autostart_id');
			if (window.CustomContextMenu.mode === CurrentElementModeType.Macros) {
				buttonRun.style.display = "block";
				buttonAutoStart.style.display = "block";

			} else {
				buttonRun.style.display = "none";
				buttonAutoStart.style.display = "none";
			}

			let curObj = window.CustomContextMenu.mode ? Content : CustomFunctions;
			if ( curObj.current != window.CustomContextMenu.macrosIndex || !window.CustomContextMenu.visible) {
				const parentRect = (!srcElement.classList.contains('macros_btn') ? srcElement.parentNode : srcElement).getBoundingClientRect();
				window.CustomContextMenu.position(parentRect.left, parentRect.top + parentRect.height + 2);
				onItemClick(window.CustomContextMenu.macrosIndex, window.CustomContextMenu.mode);
			} else {
				window.CustomContextMenu.hide();
			}

			return;
		}
		if (event.srcElement.id && (0 == event.srcElement.id.indexOf("menu_") || 0 == event.srcElement.id.indexOf("button")))
		{
			event.preventDefault();
		}
		if (window.CustomContextMenu.visible)
			window.CustomContextMenu.hide();
	};
	window.onClickCC = onClickCC;

	document.getElementById("create_macros").onclick = function() {
		var indexMax = 0;
		var macrosTranslate = window.Asc.plugin.tr("Macros");
		for (var i = 0; i < Content.macrosArray.length; i++)
		{
			if (0 == Content.macrosArray[i].name.indexOf("Macros"))
			{
				var index = parseInt(Content.macrosArray[i].name.substr(6));
				if (!isNaN(index) && (indexMax < index))
					indexMax = index;
			}
			else if (0 == Content.macrosArray[i].name.indexOf(macrosTranslate))
			{
				var index = parseInt(Content.macrosArray[i].name.substr(macrosTranslate.length));
				if (!isNaN(index) && (indexMax < index))
					indexMax = index;
			}
		}
		indexMax++;
		Content.macrosArray.push({ name : (macrosTranslate + " " + indexMax), value : "(function()\n{\n})();" });
		Content.current = Content.macrosArray.length - 1;
		CurrentElementMode = CurrentElementModeType.Macros;
		updateMacrosMenu();
		editor.focus();
	};
	document.getElementById("create_functions").onclick = function() {
		var indexMax = 0;
		var nameTranslated = window.Asc.plugin.tr("Custom function");
		for (var i = 0; i < CustomFunctions.macrosArray.length; i++)
		{
			if (0 == CustomFunctions.macrosArray[i].name.indexOf("Macros"))
			{
				var index = parseInt(CustomFunctions.macrosArray[i].name.substr(6));
				if (!isNaN(index) && (indexMax < index))
					indexMax = index;
			}
			else if (0 == CustomFunctions.macrosArray[i].name.indexOf(nameTranslated))
			{
				var index = parseInt(CustomFunctions.macrosArray[i].name.substr(nameTranslated.length));
				if (!isNaN(index) && (indexMax < index))
					indexMax = index;
			}
		}
		indexMax++;
		CustomFunctions.macrosArray.push({ name : (nameTranslated + " " + indexMax), value : '(function()\n{\n\t/**\n\t * Function that returns the argument\n\t * @customfunction\n\t * @param {any} arg Any data.\n     * @returns {any} The argumet of the function.\n\t*/\n\tfunction myFunction(arg) {\n\t    return arg;\n\t}\n\tApi.AddCustomFunction(myFunction);\n})();' });
		CustomFunctions.current = CustomFunctions.macrosArray.length - 1;
		CurrentElementMode = CurrentElementModeType.CustomFunction;
		updateFunctionsMenu();
		editor.focus();
	};
	// document.getElementById("button_delete").onclick = function() {
	// 	if ((CurrentElementModeType.Macros === CurrentElementMode) && Content.current != -1)
	// 	{
	// 		Content.macrosArray.splice(Content.current, 1);
	// 		updateMacrosMenu();
	// 	} else if ((CurrentElementModeType.CustomFunction === CurrentElementMode) && CustomFunctions.current != -1) {
	// 		CustomFunctions.macrosArray.splice(CustomFunctions.current, 1);
	// 		updateFunctionsMenu();
	// 	}
	// };
	// document.getElementById("button_rename").onclick = function() {
	// 	showRename();
	// };
	// document.getElementById("button_autostart").onclick = function() {
	// 	Content.macrosArray[Content.current].autostart = Content.macrosArray[Content.current].autostart ? false : true;
	// 	onItemClick(Content.current, true);
	// 	updateMacrosMenu();
	// };
	document.getElementById("button_run").onclick = function() {
		if (Content.current != -1)
		{
			window.Asc.plugin.info.recalculate = true;
			window.Asc.plugin.executeCommand("command", Content.macrosArray[Content.current].value);
		}
	};

	document.getElementById("rename_ok").onclick = function() {
		unShowRename(true);
	};
	document.getElementById("rename_cancel").onclick = function() {
		unShowRename(false);
	};

	document.addEventListener("keydown", function(event)
	{
		// todo поправить (может убрать вообще это)
		if ( (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's')
		{
			event.preventDefault();
			event.stopPropagation();
			return;
			if (!isShowRename)
			{
				window.Asc.plugin.executeMethod("SetMacros", [JSON.stringify(Content)], function() {
					// console.log('saved');
				});
			}
		}
	}, false);

	document.addEventListener("keyup", function(event)
	{
		if ( (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's')
		{
			event.preventDefault();
			event.stopPropagation();
		}
	}, false);

	PsMacros = new PerfectScrollbar("#menu_content_macros", {});
	PsFunctions = new PerfectScrollbar("#menu_content_functions", {});
	updateScrollMenu();

	function updateScrollMenu()
	{
		PsMacros.update();
		PsMacros.update();
		PsFunctions.update();
		PsFunctions.update();
	}

	var isShowRename = false;
	function showRename()
	{
		let obj = (CurrentElementModeType.Macros === CurrentElementMode) ? Content : CustomFunctions;
		if (obj.current < 0)
			return;

		var _elem1 = document.getElementById("idRenameMask");
		var _elem2 = document.getElementById("idRename");
		_elem1.style.display = "block";
		_elem2.style.display = "block";
		document.getElementById("rename_text").value = obj.macrosArray[obj.current].name;
		document.getElementById("rename_text").select();

		isShowRename = true;
	};

	function unShowRename(isOK)
	{
		var value = document.getElementById("rename_text").value;
		let obj = (CurrentElementModeType.Macros === CurrentElementMode) ? Content : CustomFunctions;

		if ((isOK && value) || !isOK) {
			var _elem1 = document.getElementById("idRenameMask");
			var _elem2 = document.getElementById("idRename");
			_elem1.style.display = "none";
			_elem2.style.display = "none";
			document.getElementById("input_error_id").style.display = "none";
			document.getElementById("rename_text").style.borderColor = "#cfcfcf";
			isShowRename = false;
		}		

		if (obj.current < 0)
			return;

		if (isOK && value)
		{
			obj.macrosArray[obj.current].name = value;
			if (CurrentElementModeType.Macros === CurrentElementMode)
				updateMacrosMenu();
			else
				updateFunctionsMenu();
		} else if (isOK && !value) {
			document.getElementById("input_error_id").style.display = "block";
			document.getElementById("rename_text").style.borderColor = "#d9534f";
		}

		value.value = "";
	};

	function parseData(data) {
		// function for parsing saved macros and custom functions on start
		let obj = {
			macrosArray : [],
			current : -1
		};
		if (data) {
			try {
				obj = JSON.parse(data);
			} catch (err) {
				obj = {
					macrosArray : [],
					current : -1
				};
			}
		}
		return obj;
	};

	function compareMacros() 
	{
		if (macrosOnStart.current !== Content.current) 
			return true;
		
		if (macrosOnStart.macrosArray.length !== Content.macrosArray.length) 
			return true;

		let names = ["name", "guid", "value"];
		for (let index = 0; index < Content.macrosArray.length; index++) 
		{
			for (let prop in names)
			{
				if (macrosOnStart.macrosArray[index][names[prop]] != Content.macrosArray[index][names[prop]])
					return true;
			}
		}

		return false;
	};

	function compareFunctions() 
	{
		if (functionsOnStart.macrosArray.length !== CustomFunctions.macrosArray.length) 
			return true;

		let names = ["name", "guid", "value"];
		for (let index = 0; index < CustomFunctions.macrosArray.length; index++) 
		{
			for (let prop in names)
			{
				if (functionsOnStart.macrosArray[index][names[prop]] != CustomFunctions.macrosArray[index][names[prop]])
					return true;
			}
		}

		return false;
	};

	window.onresize = function()
	{
		updateScrollMenu();
	};

	window.onkeydown = function(e)
	{
		if (isShowRename)
		{
			switch (e.keyCode)
			{
				case 27:
				{
					unShowRename(false);
					break;
				}
				case 13:
				{
					unShowRename(true);
					break;
				}
				default:
					break;
			}
		}
	};

	window.Asc.plugin.init = function() 
	{
		window.Asc.plugin.resizeWindow(800, 600, 800, 600, 0, 0);

		if (window.Asc.plugin.info.editorType === "cell")
		{
			this.executeMethod("GetVersion", [], function(version) {
				if ("develop" === version)
					bIsCustomFunctionsSupport = true;
				else
				{
					let arrVer = version.split(".");
					while (3 > arrVer.length)
						arrVer.push("0");

					let ver = 1000000 * parseInt(arrVer[0]) +  1000 * parseInt(arrVer[1]) + parseInt(arrVer[2]);
					if (ver >= 8001000)
						bIsCustomFunctionsSupport = true;
				}

				if (bIsCustomFunctionsSupport)
				{
					document.getElementById('hr_separator').style.display = 'block';
					document.getElementById('menu_functions').style.display = 'block';
					document.getElementById('menu_macros').className = 'menu_macros_short';

					window.Asc.plugin.executeMethod("GetCustomFunctions", [], function(data) {
						CustomFunctions = parseData(data);
						functionsOnStart = JSON.parse(JSON.stringify(CustomFunctions));

						updateFunctionsMenu();
					});
				}
			});
		}

		zoom = document.getElementsByTagName('html')[0].style.zoom || 1;
		setStyles();
		on_init_server(2);

		this.executeMethod("GetMacros", [], function(data) {
			Content = parseData(data);
			CurrentElementMode = CurrentElementModeType.Macros;

			window.Asc.plugin.executeMethod("GetVBAMacros", null, function(data) {
				if (data && typeof data === 'string' && data.includes('<Module')) {
					var arr = data.split('<Module ').filter(function(el){return el.includes('Type="Procedural"') || el.includes('Type="Class"')});
					arr.forEach(function(el) {
						var start = el.indexOf('<SourceCode>') + 12;
						var end = el.indexOf('</SourceCode>', start);
						var macros = el.slice(start, end);

						start = el.indexOf('Name="') + 6;
						end = el.indexOf('"', start);
						var name = el.slice(start, end);
						var index = Content.macrosArray.findIndex(function(macr){return macr.name == name});
						if (index == -1) {
							macros = macros.replace(/&amp;/g,'&');
							macros = macros.replace(/&lt;/g,'<');
							macros = macros.replace(/&gt;/g,'>');
							macros = macros.replace(/&apos;/g,'\'');
							macros = macros.replace(/&quot;/g,'"');
							macros = macros.replace(/Attribute [^\r\n]*\r\n/g, "");
							Content.macrosArray.push(
								{
									name: name,
									value: '(function()\n{\n\t/* Enter your code here. */\n})();\n\n/*\nExecution of VBA commands does not support.\n' + macros + '*/',
									guid: create_guid()
								}
							);
						}
					});
				}
				macrosOnStart = JSON.parse(JSON.stringify(Content));
				
				updateMacrosMenu();
				window.CustomContextMenu.init();
				makeDragable();

				if (Content.current === -1)
					document.getElementById("create_macros").onclick();
			});
		});

		var _textbox = document.getElementById("rename_text");
		// clear validation on input/paste
		_textbox.oninput = _textbox.onpaste = function(e)
		{
			this.style.borderColor = "";
			document.getElementById("input_error_id").style.display = "none";
		};
		// ie
		_textbox.addEventListener("paste", function(e)
		{
			this.style.borderColor = "";
			document.getElementById("input_error_id").style.display = "none";
		});
	};

	window.Asc.plugin.button = function(id) {
		if (id == 0) {

 			window.Asc.plugin.exitChecker = 0;
 			function incrementExitChecker() {
 				++window.Asc.plugin.exitChecker;
 				if (3 == window.Asc.plugin.exitChecker)
 					window.Asc.plugin.executeCommand("close", "");
 			}

 			if (!compareMacros())
 				++window.Asc.plugin.exitChecker;
 			else
 			{
 				this.executeMethod("SetMacros", [JSON.stringify(Content)], function(){
 					incrementExitChecker();
				});
 			}

 			if (!bIsCustomFunctionsSupport || !compareFunctions())
 				++window.Asc.plugin.exitChecker;
 			else
 			{
 				this.executeMethod("SetCustomFunctions", [JSON.stringify(CustomFunctions)], function(){
 					incrementExitChecker();
				});
 			}

 			incrementExitChecker();			
		} else {
			this.executeCommand("close", "");
		}
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

	window.Asc.plugin.onTranslate = function()
	{
		// document.getElementById("button_delete").innerHTML = window.Asc.plugin.tr("Delete");
		// document.getElementById("button_rename").innerHTML = window.Asc.plugin.tr("Rename");
		// document.getElementById("button_autostart").innerHTML = window.Asc.plugin.tr("Autostart");
		document.getElementById("button_run").title = window.Asc.plugin.tr("Run");
		document.getElementById("create_macros").title = window.Asc.plugin.tr("Add macros");
		document.getElementById("create_functions").title = window.Asc.plugin.tr("Add custom function");
		document.getElementById("rename_ok").innerHTML = window.Asc.plugin.tr("Ok");
		document.getElementById("rename_cancel").innerHTML = window.Asc.plugin.tr("Cancel");
		document.getElementById("input_error_id").title = window.Asc.plugin.tr("Title");
		document.getElementById("menu_run_id").innerHTML = window.Asc.plugin.tr("Run")
		document.getElementById("menu_rename_id").innerHTML = window.Asc.plugin.tr("Rename");
		document.getElementById("menu_delete_id").innerHTML = window.Asc.plugin.tr("Delete");
		document.getElementById("menu_copy_id").innerHTML = window.Asc.plugin.tr("Copy");
		document.querySelector('#menu_macros .header').innerHTML = window.Asc.plugin.tr("Macros");
		document.querySelector('#menu_functions .header').innerHTML = window.Asc.plugin.tr("Custom functions");
	};

	// context menu
	window.CustomContextMenu = {
		element: null,
		visible: false,
		macrosIndex: 0,
		mode: CurrentElementModeType.Macros,
		position: function(x, y) {
			if (!this.element)
				return;
			this.element.style.left = x + "px";
			this.element.style.top = y + "px";
			this.visible = true;
			this.element.style.opacity = 0;
			this.element.style.display = "block";
			if (document.body.clientHeight < y + this.element.clientHeight) {
				// if menu is going over the bottom we should show it above the cursor
				this.element.style.top = y - this.element.clientHeight + 'px';
			}
			this.element.style.opacity = 1;
		},
		hide: function(){
			this.visible = false;
			this.element.style.display = "none";
		},
		init: function(){
			if (this.element)
				return;

			this.element = document.getElementById("context-menu-id");
			window.addEventListener("click", function(e) {
				window.CustomContextMenu.visible && window.CustomContextMenu.hide();
			});
			window.addEventListener("contextmenu", function(e) {
				var className = e.srcElement.getAttribute("class");
				if (className && (-1 != className.indexOf("mac") || -1 != className.indexOf("fun")))
				{
					e.preventDefault();
					window.CustomContextMenu.mode = e.srcElement.id.includes('mac') ? CurrentElementModeType.Macros : CurrentElementModeType.CustomFunction;
					let len = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? 6 : 8;
					window.CustomContextMenu.macrosIndex = parseInt(e.srcElement.id.substr(len));
					let obj = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? Content : CustomFunctions;
					if (window.CustomContextMenu.mode === CurrentElementModeType.Macros)
						document.getElementById("menu_autostart_id").innerHTML = window.Asc.plugin.tr(obj.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? "Unmake autostart" : "Make autostart");

					let buttonRun = this.document.getElementById('menu_run_id');
					let buttonAutoStart = this.document.getElementById('menu_autostart_id');
					if (window.CustomContextMenu.mode === CurrentElementModeType.Macros) {
						buttonRun.style.display = "block";
						buttonAutoStart.style.display = "block";
					} else {
						buttonRun.style.display = "none";
						buttonAutoStart.style.display = "none";
					}
					window.CustomContextMenu.position(e.pageX, e.pageY);
					onItemClick(window.CustomContextMenu.macrosIndex, (window.CustomContextMenu.mode === CurrentElementModeType.Macros));
					return;
				}
				if (e.srcElement.id && (0 == e.srcElement.id.indexOf("menu_") || 0 == e.srcElement.id.indexOf("button")))
				{
					e.preventDefault();
				}
				if (window.CustomContextMenu.visible)
					window.CustomContextMenu.hide();
			});
		},
		onAutostartClick: function()
		{
			if (!Content.macrosArray[window.CustomContextMenu.macrosIndex])
				return;

			Content.macrosArray[window.CustomContextMenu.macrosIndex].autostart = 
				Content.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? false : true;

			updateMacrosMenu();
		},
		onRunClick: function()
		{
			if (!Content.macrosArray[window.CustomContextMenu.macrosIndex])
				return;

			window.Asc.plugin.info.recalculate = true;
			window.Asc.plugin.executeCommand("command", Content.macrosArray[window.CustomContextMenu.macrosIndex].value);
		},
		onRenameClick: function()
		{
			let obj = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? Content : CustomFunctions;
			if (!obj.macrosArray[window.CustomContextMenu.macrosIndex])
				return;

			onItemClick(window.CustomContextMenu.macrosIndex, (window.CustomContextMenu.mode === CurrentElementModeType.Macros));
			showRename();
		},
		onDeleteClick: function()
		{
			let obj = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? Content : CustomFunctions;
			if (!obj.macrosArray[window.CustomContextMenu.macrosIndex])
				return;
			
			obj.macrosArray.splice(window.CustomContextMenu.macrosIndex, 1);
			if (window.CustomContextMenu.mode === CurrentElementModeType.Macros)
				updateMacrosMenu();
			else
				updateFunctionsMenu();
		},
		onCopyClick: function()
		{
			let obj = (window.CustomContextMenu.mode === CurrentElementModeType.Macros) ? Content : CustomFunctions;
			if (!obj.macrosArray[window.CustomContextMenu.macrosIndex])
				return;

			obj.macrosArray.push({ name : (obj.macrosArray[window.CustomContextMenu.macrosIndex].name + "_copy"), value : obj.macrosArray[window.CustomContextMenu.macrosIndex].value });
			obj.current = obj.macrosArray.length - 1;
			if (window.CustomContextMenu.mode === CurrentElementModeType.Macros)
				updateMacrosMenu();
			else
				updateFunctionsMenu();
			editor.focus();
		}
	};

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		$('.common_menu, .ace_content').css('background', window.Asc.plugin.theme["background-normal"]);
		$('.common_menu, .ace_content').css('color', window.Asc.plugin.theme["text-normal"]);
		$('.ace_layer.ace_gutter-layer.ace_folding-enabled').css('background', window.Asc.plugin.theme["background-toolbar"]);
		$('.ace_layer.ace_gutter-layer.ace_folding-enabled').css('color', window.Asc.plugin.theme["text-normal"]);
		$('#menu, .divHeader').css('border-color', window.Asc.plugin.theme["border-divider"]);
		$('.ace_scroller').css('border-left', 'solid 0.73px ' + window.Asc.plugin.theme["border-divider"]);
		$('.ace_cursor').css('color', window.Asc.plugin.theme["text-normal"]);
		$('#menu').css('background-color', window.Asc.plugin.theme["background-normal"]);
		$('#idRename').css('background-color', window.Asc.plugin.theme["background-toolbar"]);
		$('#idRename').css('border-color', window.Asc.plugin.theme["border-toolbar-button-hover"]);
		$('.context-menu-options').css('background', window.Asc.plugin.theme["background-normal"]);

		
		var rules = '.macros, .ace_content, .Ace-Tern-tooltip, .Ace-Tern-jsdoc-param-description { color: ' + window.Asc.plugin.theme["text-normal"] + '; background-color: ' + window.Asc.plugin.theme['background-toolbar'] + '}\n';
		rules += '.macros:hover { background-color: ' + window.Asc.plugin.theme['highlight-button-hover'] + '}\n';
		// rules += '.macrosSelected { background-color: ' + window.Asc.plugin.theme['highlight-button-pressed'] + '}\n';
		rules += '.function { color: ' + window.Asc.plugin.theme["text-normal"] + '; background-color: ' + window.Asc.plugin.theme['background-toolbar'] + '}\n';
		rules += '.function:hover { background-color: ' + window.Asc.plugin.theme['highlight-button-hover'] + '}\n';
		// rules += '.functionSelected { background-color: ' + window.Asc.plugin.theme['highlight-button-pressed'] + '}\n';
		rules += '.dragHovered { background-color: ' + window.Asc.plugin.theme['highlight-button-pressed'] + '}\n';
		rules += '.context-menu-option:hover { background-color: ' + window.Asc.plugin.theme['highlight-button-hover'] + '}\n';
		rules += '.sep_border { border-color: ' + window.Asc.plugin.theme['border-toolbar'] + '!important}\n';
		let imgSrc = './resources/img/plus';
		if (theme.type === 'dark') {
			rules += '.ace-chrome .ace_marker-layer .ace_selected-word { background: rgb(250, 250, 255, 0.3) !important; border: 1px solid rgb(200, 200, 250); }\n';
			rules += '.ace_active-line, { border-color: #333 !important;}\n';
			rules += '.ace_active-line, .ace_gutter-active-line-bg { border-color: #555 !important; background-color: #333 !important;}\n';
			rules += '.oo_highlight, { background-color: #555 !important;}\n';
			rules += '.ace_line-hover { background-color: #333 !important; border-color: #555 !important;}\n';
			rules += '.ace_completion-highlight {color: #4FC1FF !important; text-shadow: 0 0 0.01em;\}\n';
			rules += '.Ace-Tern-farg { color: gray; }\n';
			rules += '.Ace-Tern-farg-current { color: gray; }\n';
			rules += '.Ace-Tern-type { color: #569CD6; }\n';
			rules += '.Ace-Tern-jsdoc-param-name { color: gray; }\n';
			rules += '.gutter_bg {background-color: #333 !important}\n';
			rules += '.Ace-Tern-jsdoc-tag { color: #FF5E5C; }\n';
			rules += '.Ace-Tern-farg-current-description { color : #FFFFFF; }\n';
			rules += '.Ace-Tern-farg-current-name { color : white; }\n';			
			imgSrc += '_white.svg'
		} else {
			rules += '.ace-chrome .ace_marker-layer .ace_selected-word { background: rgb(255, 255, 255); border: 1px solid rgb(200, 200, 250); }\n';
			rules += '.ace_active-line, { border-color: #eee !important;}\n';
			rules += '.ace_active-line, .ace_gutter-active-line-bg { border-color: #eee !important; background-color: #fff !important;}\n';
			rules += '.oo_highlight { background-color: #ccc !important;}\n';
			rules += '.ace_line-hover { background-color: #aaa !important; border-color: #eee !important;}\n';
			rules += '.ace_completion-highlight {color: #0000ff !important; text-shadow: 0 0 0.01em;\}\n';
			rules += '.Ace-Tern-farg { color: #70a; }\n';
			rules += '.Ace-Tern-farg-current { color: #70a; }\n';
			rules += '.Ace-Tern-jsdoc-param-name { color: gray; }\n';
			rules += '.gutter_bg {background-color: #fff !important}\n';
			rules += '.Ace-Tern-farg { color: gray; }\n';
			rules += '.Ace-Tern-farg-current { color: gray; }\n';
			rules += '.Ace-Tern-jsdoc-param-name { color: gray; }\n';
			imgSrc += '_dark.svg'
		}
		let imgArr = document.querySelectorAll('.img_plus');
		for (let i = 0; i < imgArr.length; i++) {
			imgArr[i].setAttribute('src', imgSrc);
		}
		var styleTheme = document.createElement('style');
		styleTheme.type = 'text/css';
		styleTheme.innerHTML = rules;
		document.getElementsByTagName('head')[0].appendChild(styleTheme);

		if (theme.type === 'dark')
			editor.setTheme("ace/theme/vs-dark")
		else
			editor.setTheme("ace/theme/vs-light")

	};

})(window, undefined);