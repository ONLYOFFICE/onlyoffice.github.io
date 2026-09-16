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
(function(window, undefined) {

	var img;
	var editor;
	var UI = "kennedy";
	var loader;
	var lang = "";
	var title = "Click on diagram to edit."
	var STORAGE_KEY = "drawio_export_format";

	function getExportFormat()
	{
		try {
			return localStorage.getItem(STORAGE_KEY) || 'xmlsvg';
		} catch (e) {
			return 'xmlsvg';
		}
	};

	function setExportFormat(format)
	{
		try {
			localStorage.setItem(STORAGE_KEY, format);
		} catch (e) {
			// localStorage may be blocked in sandboxed environments
		}
	};

	function initFormatSelector()
	{
		var select = document.getElementById('format-select');

		if (select) {
			select.value = getExportFormat();
			select.addEventListener('change', function() {
				setExportFormat(this.value);

				if (editor) {
					editor.format = this.value;
				}
			});
		}
	};

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
		initFormatSelector();
		img.onclick = function() {
			makeLoader();
			editor = DiagramEditor.editElement([this, document.getElementById("div_preview")], config, UI, null, ['lang=' + lang], closePlugin, hideLoader);
			if (editor) {
				editor.format = getExportFormat();
				editor.isChanged = true;
			}
		}
		editor = DiagramEditor.editElement([img, document.getElementById("div_preview")], config, UI, null, ['lang=' + lang + '&gapi=0&embed=1&dev=1&spin=0'], closePlugin, hideLoader);
		if (editor)
			editor.format = getExportFormat();
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
