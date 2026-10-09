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

	// The background plugin: starts the parts in the other scripts and puts the
	// settings into the menus of the editor.

	const plugin = window.Asc.plugin;
	const store = window.Autocomplete.store;
	const dictionary = window.Autocomplete.dictionary;
	const editor = window.Autocomplete.editor;
	const typing = window.Autocomplete.typing;
	const windows = window.Autocomplete.windows;

	let isStarted = false;
	let selectedWord = ""; // the word the context menu offers to add to the personal dictionary

	dictionary.load("./dictionaries/words.txt");

	// The list of suggestions is drawn by the editor with fixed light colors:
	// these rules come after them and take the colors of the theme instead.
	function applyTheme(theme)
	{
		if (!isStarted)
			return;

		theme = theme || {};
		const isDark = theme.type === "dark";
		const background = theme["background-normal"] || (isDark ? "#333333" : "#FFFFFF");
		const text = theme["text-normal"] || (isDark ? "#D9D9D9" : "#373737");
		const border = theme["border-regular-control"] || (isDark ? "#666666" : "#CFCFCF");
		const highlight = theme["highlight-button-hover"] || (isDark ? "#555555" : "#D8DADC");

		let style = document.getElementById("autocomplete_theme");
		if (!style)
		{
			style = document.createElement("style");
			style.id = "autocomplete_theme";
		}
		style.innerHTML = ".ih_main { border-color: " + border + "; background-color: " + background + "; }" +
			" li, .li_selected, .li_selected:hover { color: " + text + "; }" +
			" li:hover, .li_selected, .li_selected:hover { background-color: " + highlight + "; }" +
			// a long text snippet is cut off at the end of its row
			" li { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }";
		// (again) at the end of the head, behind the rules of the editor
		document.getElementsByTagName("head")[0].appendChild(style);
		document.body.style.background = background;
	}

	// a button on the Plugins tab opens the settings
	function registerMenus()
	{
		plugin.executeMethod("AddToolbarMenuItem", [{
			guid : plugin.guid,
			tabs : [{
				id : "plugins",
				items : [{
					id : "autocompleteSettings",
					type : "button",
					text : plugin.tr("Autocomplete"),
					hint : plugin.tr("Autocomplete settings"),
					icons : "resources/img/icon%scale%(default).png",
					lockInViewMode : false,
					enableToggle : false,
					separator : true
				}]
			}]
		}]);
	}

	// and so does an item in the context menu, where another one pauses the
	// suggestions and a third one adds the selected word to the personal dictionary
	function addContextMenu(word)
	{
		const items = [{
			id : "autocompletePauseMenu",
			text : plugin.tr(typing.isPaused() ? "Resume autocomplete" : "Pause autocomplete")
		}, {
			id : "autocompleteSettingsMenu",
			text : plugin.tr("Autocomplete settings")
		}];

		selectedWord = (word && !store.hasPersonal(word)) ? word : "";
		if (selectedWord)
		{
			items.unshift({
				id : "autocompleteAddWordMenu",
				text : plugin.tr("Add \"%1\" to personal dictionary").replace("%1", () => selectedWord)
			});
		}

		plugin.executeMethod("AddContextMenuItem", [{ guid : plugin.guid, items : items }]);
	}

	// The editor shows its context menu when the plugin has added its items,
	// so the selected text can be asked for first.
	plugin.event_onContextMenuShow = function(options)
	{
		// nothing is selected where the menu is opened at the cursor, and no text in a picture
		const type = options && options.type;
		if (type === "Target" || type === "Image" || type === "OleObject")
			addContextMenu("");
		else
			editor.getSelectedWord(addContextMenu);
	};

	plugin.init = function(text)
	{
		if (isStarted)
			return;
		isStarted = true;

		plugin.createInputHelper();
		plugin.getInputHelper().createWindow();
		applyTheme(plugin.theme);

		plugin.attachToolbarMenuClickEvent("autocompleteSettings", windows.openSettings);
		plugin.attachContextMenuClickEvent("autocompleteSettingsMenu", windows.openSettings);
		plugin.attachContextMenuClickEvent("autocompleteAddWordMenu", function() {
			if (selectedWord)
				store.addPersonal(selectedWord);
		});
		plugin.attachContextMenuClickEvent("autocompletePauseMenu", function() {
			typing.setPaused(!typing.isPaused());
		});
		registerMenus();

		typing.start();
	};

	plugin.onThemeChanged = function(theme)
	{
		plugin.onThemeChangedBase(theme);
		applyTheme(theme);
	};

	plugin.onTranslate = function()
	{
		// update the button caption once the translations are loaded
		if (isStarted)
			registerMenus();
	};

	plugin.button = function(id, windowId)
	{
		if (windowId)
			windows.onButton(id, windowId);
		else
			this.executeCommand("close", "");
	};

})(window, undefined);
