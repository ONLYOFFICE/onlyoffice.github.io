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

	// The settings window and the window that edits a word list.

	const plugin = window.Asc.plugin;
	const store = window.Autocomplete.store;
	const dictionary = window.Autocomplete.dictionary;
	const typing = window.Autocomplete.typing;

	const BUTTON_OK = 0;

	// the word lists the user can edit
	const LISTS = {
		personal : {
			title : "Personal dictionary",
			description : "Your own words, one per line. They are suggested first and written exactly as entered.",
			hint : "A word cannot contain spaces. Delete a line to remove the word."
		},
		ignored : {
			title : "Ignored words",
			description : "Words that are never suggested, one per line.",
			hint : "Right-click a suggestion while typing to add it here. Delete a line to have the word suggested again."
		},
		snippets : {
			title : "Text snippets",
			description : "Abbreviations and the text to write for them, one per line: abbreviation = text.",
			hint : "Type the abbreviation and choose the text from the suggestions. An abbreviation cannot contain spaces or punctuation. Delete a line to remove the snippet."
		},
		learned : {
			title : "Learned words",
			description : "The words you have chosen, most chosen first.",
			hint : "The number in brackets is how often you chose the word; a higher number moves it up. Delete a line to forget the word."
		}
	};

	// A modal window with the buttons OK and Cancel. Its page reports each
	// change with "onChange"; the last one is kept as the draft until a button
	// is pressed.
	class Dialog
	{
		constructor(url, size)
		{
			this.url = url;
			this.size = size;
			this.frame = null;
			this.draft = null;
		}

		get isOpen()
		{
			return null !== this.frame;
		}

		// events: what to do with the messages of the page, by their name
		open(title, events)
		{
			this.draft = null;
			this.frame = new window.Asc.PluginWindow();
			this.frame.attachEvent("onChange", draft => {
				this.draft = draft;
			});
			for (const name in events)
				this.frame.attachEvent(name, events[name]);

			this.frame.show({
				url : this.url,
				description : plugin.tr(title),
				isVisual : true,
				isModal : true,
				buttons : [
					{ text : plugin.tr("OK"), primary : true },
					{ text : plugin.tr("Cancel"), primary : false }
				],
				EditorsSupport : ["word", "slide", "cell", "pdf"],
				size : this.size
			});
		}

		send(name, data)
		{
			if (this.frame)
				this.frame.command(name, data);
		}

		owns(windowId)
		{
			return this.isOpen && this.frame.id === windowId;
		}

		close()
		{
			if (this.frame)
			{
				this.frame.close();
				this.frame = null;
			}
			this.draft = null;
		}
	}

	const settingsDialog = new Dialog("settings.html", [320, 474]);
	const listDialog = new Dialog("wordlist.html", [380, 380]);
	let listName = ""; // the list that is being edited

	function sendCounts()
	{
		settingsDialog.send("onListCounts", store.getCounts());
	}

	function getListText(name)
	{
		if (name == "snippets")
			return store.getSnippetsText();
		if (name != "learned")
			return store.getList(name).join("\n");

		// with the number of times each word was chosen
		return store.getLearned().map(entry => dictionary.getSpelling(entry[0]) + "  (" + entry[1] + ")").join("\n");
	}

	function setListText(name, text)
	{
		if (name == "snippets")
			store.saveSnippets(text);
		else if (name == "learned")
			store.setLearned(text);
		else
			store.saveList(name, text);
	}

	function openList(name)
	{
		const list = LISTS[name];
		if (listDialog.isOpen || !list)
			return;

		listName = name;
		listDialog.open(list.title, {
			onInit : function() {
				listDialog.send("onList", {
					description : plugin.tr(list.description),
					hint : plugin.tr(list.hint),
					text : getListText(name)
				});
			}
		});
	}

	function openSettings()
	{
		if (settingsDialog.isOpen)
			return;

		settingsDialog.open("Autocomplete settings", {
			onInit : function() {
				settingsDialog.send("onSettings", store.settings);
				settingsDialog.send("onPaused", typing.isPaused());
				sendCounts();
			},
			// pausing takes effect at once, like the changes of the word lists
			onTogglePause : function() {
				typing.setPaused(!typing.isPaused());
				settingsDialog.send("onPaused", typing.isPaused());
			},
			onEditList : openList,
			onResetLearned : function() {
				setListText("learned", "");
			}
		});
	}

	// a button of one of the windows was pressed
	function onButton(id, windowId)
	{
		if (listDialog.owns(windowId))
		{
			if (id === BUTTON_OK && listDialog.draft !== null)
				setListText(listName, listDialog.draft);
			listDialog.close();
		}
		else if (settingsDialog.owns(windowId))
		{
			if (id === BUTTON_OK && settingsDialog.draft)
			{
				store.saveSettings(settingsDialog.draft);
				typing.reset();
			}
			listDialog.close();
			settingsDialog.close();
		}
	}

	store.onCountsChanged = sendCounts;

	window.Autocomplete.windows = {
		openSettings : openSettings,
		onButton : onButton
	};

})(window, undefined);
