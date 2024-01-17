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
(function(window, undefined) {

	var img;
	var editor;
	var UI = "kennedy";
	var loader;
	var lang = "";
	var title = "Click on diagram to edit."

	window.Asc.plugin.init = function(data)
	{
		lang = this.info.lang.split('-')[0];
		img = document.createElement('img');
		img.setAttribute('title', title)
		document.getElementById("div_preview").appendChild(img);
		// create an empty image for editor (if data doesn't set), after export we put the result in it
		if (!data)
			data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII=";

		img.setAttribute('src', data);
		var config = {css: "button.geBigButton:nth-of-type(1) {background-color:transparent !important; color:"+ (UI == 'dark' ? '#ccc' : '#000') +" !important;} body>a {display: none !important;} body {-khtml-user-select: none; user-select: none; -moz-user-select: none; -webkit-user-select: none;} div>img:not([title]) { pointer-events: none; }"};
		img.onclick = function() {
			makeLoader();
			editor = DiagramEditor.editElement([this, document.getElementById("div_preview")], config, UI, null, ['lang=' + lang], closePlugin, hideLoader);
			editor.isChanged = true;
		}
		editor = DiagramEditor.editElement([img, document.getElementById("div_preview")], config, UI, null, ['lang=' + lang + '&gapi=0&embed=1&dev=1&spin=0'], closePlugin, hideLoader);
		window.Asc.plugin.resizeWindow(1200, 1000, 800, 600, 0, 0);
	};

	window.Asc.plugin.button = function(id)
	{
		if (id == 0) {
			if (editor.frame) {
				// if editor is opened
				editor.closePlugin(true);
			} else {
				closePlugin(editor.isChanged);
			}			
		} else {
			this.executeCommand("close", "");
		}
	};

	function closePlugin (bPaste) {
		if (bPaste)
		{
			var _info = window.Asc.plugin.info;
			var _method = (_info.objectId === undefined) ? "AddOleObject" : "EditOleObject";
			// we should use timeout for image export from diagram editor
			setTimeout(function() {
				var _param = {
					guid : _info.guid,
					widthPix : (_info.mmToPx * (img.width >> 2) ) >> 0,
					heightPix : (_info.mmToPx * (img.height >> 2) ) >> 0,
					width : img.width ? (img.width >> 2) : _info.width ? _info.width : 100,
					height : img.height ? (img.height >> 2) : _info.height ? _info.height : 70,
					imgSrc : img.getAttribute('src'),
					data : img.getAttribute('src'),
					objectId : _info.objectId,
					resize : _info.resize
				};
	
				window.Asc.plugin.executeMethod(_method, [_param], function() {
					window.Asc.plugin.executeCommand("close", "");
				});
			}, 1);
			
		} else {
			window.Asc.plugin.executeCommand("close", "");
		}

	};

	function makeLoader() {
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], window.Asc.plugin.tr('Loading') + '...');
		if (img) img.classList.add('hidden');
	};

	function hideLoader() {
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

	window.Asc.plugin.onTranslate = function()
	{
		title = window.Asc.plugin.tr(title);
		if (img)
			img.setAttribute("title", title);
		makeLoader();
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);
		document.dispatchEvent(evt);
	};

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		UI = (theme.type.indexOf("dark") !== -1) ? "dark" : "kennedy";
	};

})(window, undefined);
