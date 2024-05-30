window.initCounter = 0;
let mode = 1; // 1 - macros; 0 - custom functions
const localStorageKey = 'custom_functions';
let macrosOnStart = ''; // copy of macros object on start (for comparison on save)
let functionsOnStart = ''; // copy of custom functions object on start (for comparison on save)
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
ace.config.loadModule('ace/ext/language_tools', function () {
	editor.setOptions({
		enableBasicAutocompletion: false,
		enableLiveAutocompletion: true
	});
});


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
	// make this object as a macros object (because we don't want to make some extra code and can use the same one)
	var CustomFunctions = {
		macrosArray: [],
		current: -1
	};
	let zoom = 1;

	editor.getSession().on('change', function() {
		let current = mode ? Content.current : CustomFunctions.current;
		let obj = mode ? Content : CustomFunctions;
		
		if (current == -1 || window.isDisable)
			return;

		obj.macrosArray[current].value = editor.getValue();
	});

	function create_guid(a,b)
	{
		for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'');
		return b
	};

	function updateMacrosMenu()
	{
		if (mode && Content.current < 0)
			Content.current = 0;
		if (mode && Content.current >= Content.macrosArray.length)
			Content.current = Content.macrosArray.length - 1;
			
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
		
		if (mode)
			onItemClick(Content.current, true);

		updateScrollMenu();
	}

	function updateFunctionsMenu()
	{
		if (!mode && CustomFunctions.current < 0)
			CustomFunctions.current = 0;
		if (!mode && CustomFunctions.current >= CustomFunctions.macrosArray.length)
			CustomFunctions.current = CustomFunctions.macrosArray.length - 1;
			
		var menuContent = "";
		for (var i = 0; i < CustomFunctions.macrosArray.length; i++)
		{
			var cl = (i == CustomFunctions.current) ? "functionSelected" : "function";
			var name = $('<div/>').text(CustomFunctions.macrosArray[i].name).html();
			let imgSrc = './resources/img/dots_' + (window.Asc.plugin.theme.type.includes('dark') ? 'white': 'dark') + '.svg'
			var item = "<div class=\"common_punct draggable " + cl + "\" id=\"function" + i + "\" onclick=\"window.onItemClick(" + i + ", false);\" draggable=\"true\">" + name;
			item += '<div id="func_btn' + i + '" class="btn-text-default header_btn cc_btn function_btn" style="border: none !important;" onclick="onClickCC(event)""><img class="func_img" id="func_img"' + i + ' onclick="onClickCC(event)" src="' + imgSrc + '" style="width: 20px; height: 20px;" /></div>';
			item += "</div>";
			menuContent += item;

			if (!CustomFunctions.macrosArray[i]["guid"])
				CustomFunctions.macrosArray[i]["guid"] = create_guid();
		}
		

		var elem = document.getElementById("menu_content_functions");
		elem.innerHTML = menuContent;
		
		if (!mode)
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

			macrosList.insertBefore(activeElement, nextElement);
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

			functionList.insertBefore(activeElement, nextElement);
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
			let bDragAllowed = !!(mode && currentElement.id.includes('mac'));
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
			let bDragAllowed = !!(!mode && currentElement.id.includes('function'));
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
			mode = 1;
			CustomFunctions.current = -1;
		} else {
			mode = 0;
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
		event.preventDefault();
		event.stopPropagation();
		var className = event.srcElement.getAttribute("class");
		if (className && (-1 != className.indexOf("mac") || -1 != className.indexOf("fun")))
		{
			window.CustomContextMenu.mode = event.srcElement.id.includes('mac') ? 1 : 0;
			let len = window.CustomContextMenu.mode ? 6 : 8;
			window.CustomContextMenu.macrosIndex = parseInt(event.srcElement.id.substr(len));
			let obj = window.CustomContextMenu.mode ? Content : CustomFunctions;
			if (window.CustomContextMenu.mode)
				document.getElementById("menu_autostart_id").innerHTML = window.Asc.plugin.tr(obj.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? "Unmake autostart" : "Make autostart");

			let buttonRun = this.document.getElementById('menu_run_id');
			let buttonAutoStart = this.document.getElementById('menu_autostart_id');
			if (window.CustomContextMenu.mode) {
				buttonRun.style.display = "block";
				buttonAutoStart.style.display = "block";

			} else {
				buttonRun.style.display = "none";
				buttonAutoStart.style.display = "none";
			}
			window.CustomContextMenu.position(event.pageX, event.pageY);
			onItemClick(window.CustomContextMenu.macrosIndex, window.CustomContextMenu.mode);
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
		mode = 1;
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
		mode = 0;
		updateFunctionsMenu();
		editor.focus();
	};
	// document.getElementById("button_delete").onclick = function() {
	// 	if (mode && Content.current != -1)
	// 	{
	// 		Content.macrosArray.splice(Content.current, 1);
	// 		updateMacrosMenu();
	// 	} else if (!mode && CustomFunctions.current != -1) {
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
		let obj = mode ? Content : CustomFunctions;
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
		let obj = mode ? Content : CustomFunctions;

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
			if (mode)
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

	function compareMacros() {
		// function for compare macros (not make a history point if nothing is change)
		// here is simple comparison, because we save it as a string
		let result = false;
		if (macrosOnStart.current !== Content.current) {
			// if we change current macros we should update macros
			result = true;
		} else if (macrosOnStart.macrosArray.length !== Content.macrosArray.length) {
			// if we add or delete some macros we should update macros
			result = true;
		} else {
			// compare each macros for changes (compare it as a string)
			for (let index = 0; index < Content.macrosArray.length; index++) {
				let onStart = JSON.stringify(macrosOnStart.macrosArray[index]);
				let curVariant = JSON.stringify(Content.macrosArray[index]);
				if (onStart !== curVariant) {
					result = true;
					break;
				}
			}
		}
		return result;
	};

	function compareFunctions() {
		// function for compare custom functions (for add, update or delete functions that have been changed)
		
		let result = false;
		if (functionsOnStart.current !== CustomFunctions.current) {
			// if we change current function we should update functions
			result = true;
		} else if (functionsOnStart.macrosArray.length !== CustomFunctions.macrosArray.length) {
			// if we add or delete some function we should update functions
			result = true;
		} else {
			// compare each macros for changes (compare it as a string)
			for (let index = 0; index < CustomFunctions.macrosArray.length; index++) {
				let onStart = JSON.stringify(functionsOnStart.macrosArray[index]);
				let curVariant = JSON.stringify(CustomFunctions.macrosArray[index]);
				if (onStart !== curVariant) {
					result = true;
					break;
				}
			}
		}
		
		if (result) {
			// check where is changes and update custom functions in editor (if it's necessary)
			updateCustomFunctions();
		}
		return result;
	};

	function updateCustomFunctions() {
		// compare each function for changes (compare it as a string by value)
		// if changes in name of function we just update it in localStorage
		let curMacrosArr = JSON.parse(JSON.stringify(CustomFunctions.macrosArray)); // copy of current array of custom functions
		let length = functionsOnStart.macrosArray.length - 1; // length of custom functions array
		for (let index = length; index >= 0; index--) {
			let onStart = JSON.stringify(functionsOnStart.macrosArray[index].value);
			let foundIndex = curMacrosArr.findIndex(function(func){
				return onStart === JSON.stringify(func.value);
			});
			if (foundIndex !== -1) {
				curMacrosArr.splice(foundIndex, 1);
				functionsOnStart.macrosArray.splice(foundIndex, 1);
			}
		}
		// functions that we should delete are in functionsOnStart.macrosArray
		// functions that we should add in curMacrosArr 
		// now we should run each new function
		// and create a new macros for each function that should be removed and run it too (we should parse macros and get functuion name for remove it)
		// todo может добавить промис на каждую команду и когда они закончатся (через Promise.all) мы уже закрываем плагин (проверить не будет ли что-то не выполнено, если сразу закрывать плагин)
		functionsOnStart.macrosArray.forEach(function(func) {
			let value = func.value;
			const searchStr = 'AddCustomFunction(';
			let start = 0;
			// in one script could be more than one function. we should unregister all.
			while (true) {
				start = value.indexOf(searchStr, start);
				if (start == -1)
					break;
				else
					start += searchStr.length;

				let end = value.indexOf(')', start);
				let funcName = value.substring(start, end);
				let code = '(function(){Api.RemoveCustomFunction("' + funcName + '")})();'
				window.Asc.plugin.executeCommand("command", code);
			}
			
		});
		curMacrosArr.forEach(function(func) {
			window.Asc.plugin.executeCommand("command", func.value);
		});
	};

	function checkShowCustomFunctions() {
		let bCustom = window.Asc.plugin.info.editorType === 'cell';
		if (bCustom) {
			document.getElementById('hr_separator').style.display = 'block';
			document.getElementById('menu_functions').style.display = 'block';
			document.getElementById('menu_macros').className = 'menu_macros_short';
		}
		return bCustom;
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

	window.Asc.plugin.init = function() {
		window.Asc.plugin.resizeWindow(800, 600, 800, 600, 0, 0);
		let bCellEditor = checkShowCustomFunctions();
		zoom = document.getElementsByTagName('html')[0].style.zoom || 1;
		setStyles();
		on_init_server(2);
		this.executeMethod("GetMacros", [JSON.stringify(Content)], function(data) {
			Content = parseData(data);
			CustomFunctions = parseData(localStorage.getItem(localStorageKey));
			functionsOnStart = JSON.parse(JSON.stringify(CustomFunctions));
			mode = bCellEditor && CustomFunctions.current != -1 ? 0 : 1;

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
				updateFunctionsMenu();
				window.CustomContextMenu.init();
				makeDragable();
				if (mode && Content.current === -1)
				{
					document.getElementById("create_macros").onclick();
				}
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
			/*
				there we check macros and custom functions for changes
				macros we save in the document
				custom functions we save in localStorage
				also we should register and unregister custom functions on save
			*/
			if (compareFunctions()) {
				localStorage.setItem(localStorageKey, JSON.stringify(CustomFunctions));
			}

			if (compareMacros()) {
				this.executeMethod("SetMacros", [JSON.stringify(Content)], function(){
					window.Asc.plugin.executeCommand("close", "");
				});
			} else {
				window.Asc.plugin.executeCommand("close", "");
			}
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
		// document.getElementById("button_run").innerHTML = window.Asc.plugin.tr("Run");
		document.getElementById("rename_ok").innerHTML = window.Asc.plugin.tr("Ok");
		document.getElementById("rename_cancel").innerHTML = window.Asc.plugin.tr("Cancel");
		document.getElementById("input_error_id").title = window.Asc.plugin.tr("Title");
		document.getElementById("menu_run_id").innerHTML = window.Asc.plugin.tr("Run")
		document.getElementById("menu_rename_id").innerHTML = window.Asc.plugin.tr("Rename");
		document.getElementById("menu_delete_id").innerHTML = window.Asc.plugin.tr("Delete");
		document.getElementById("menu_copy_id").innerHTML = window.Asc.plugin.tr("Copy");
	};

	// context menu
	window.CustomContextMenu = {
		element: null,
		visible: false,
		macrosIndex: 0,
		mode: 1, // 1 - macros; 0 - function
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
					window.CustomContextMenu.mode = e.srcElement.id.includes('mac') ? 1 : 0;
					let len = window.CustomContextMenu.mode ? 6 : 8;
					window.CustomContextMenu.macrosIndex = parseInt(e.srcElement.id.substr(len));
					let obj = window.CustomContextMenu.mode ? Content : CustomFunctions;
					if (window.CustomContextMenu.mode)
						document.getElementById("menu_autostart_id").innerHTML = window.Asc.plugin.tr(obj.macrosArray[window.CustomContextMenu.macrosIndex].autostart ? "Unmake autostart" : "Make autostart");

					let buttonRun = this.document.getElementById('menu_run_id');
					let buttonAutoStart = this.document.getElementById('menu_autostart_id');
					if (window.CustomContextMenu.mode) {
						buttonRun.style.display = "block";
						buttonAutoStart.style.display = "block";
					} else {
						buttonRun.style.display = "none";
						buttonAutoStart.style.display = "none";
					}
					window.CustomContextMenu.position(e.pageX, e.pageY);
					onItemClick(window.CustomContextMenu.macrosIndex, window.CustomContextMenu.mode);
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
			let obj = window.CustomContextMenu.mode ? Content : CustomFunctions;
			if (!obj.macrosArray[window.CustomContextMenu.macrosIndex])
				return;

			onItemClick(window.CustomContextMenu.macrosIndex, window.CustomContextMenu.mode);
			showRename();
		},
		onDeleteClick: function()
		{
			let obj = window.CustomContextMenu.mode ? Content : CustomFunctions;
			if (!obj.macrosArray[window.CustomContextMenu.macrosIndex])
				return;
			
			obj.macrosArray.splice(window.CustomContextMenu.macrosIndex, 1);
			if (window.CustomContextMenu.mode)
				updateMacrosMenu();
			else
				updateFunctionsMenu();
		},
		onCopyClick: function()
		{
			let obj = window.CustomContextMenu.mode ? Content : CustomFunctions;
			if (!obj.macrosArray[window.CustomContextMenu.macrosIndex])
				return;

			obj.macrosArray.push({ name : (obj.macrosArray[window.CustomContextMenu.macrosIndex].name + "_copy"), value : obj.macrosArray[window.CustomContextMenu.macrosIndex].value });
			obj.current = obj.macrosArray.length - 1;
			if (window.CustomContextMenu.mode)
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
			rules += '.Ace-Tern-farg { color: #d900ff; }\n';
			rules += '.Ace-Tern-farg-current { color: #d900ff; }\n';
			rules += '.Ace-Tern-jsdoc-param-name { color: #d900ff; }\n';
			rules += '.gutter_bg {background-color: #333 !important}\n';
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
			rules += '.Ace-Tern-jsdoc-param-name { color: #70a; }\n';
			rules += '.gutter_bg {background-color: #fff !important}\n';
			imgSrc += '_dark.svg'
		}
		let imgArr = document.querySelectorAll('.img_plus');
		imgArr.forEach(function(img){
			img.setAttribute('src', imgSrc);
		});
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