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

	// Follows the word in front of the cursor and shows the suggestions for it.
	//
	// A text document is asked for the word each time something is typed or
	// deleted (documentWord), so it is what really stands there, whatever
	// happened before: a space, backspace, a chosen suggestion, a click into
	// another word.
	//
	// The other editors cannot be asked. There the plugin keeps what was typed
	// since the cursor was last moved, as far as it knows (typedWord).

	const plugin = window.Asc.plugin;
	const store = window.Autocomplete.store;
	const dictionary = window.Autocomplete.dictionary;
	const editor = window.Autocomplete.editor;

	const KEY_BACKSPACE = 8;
	const KEY_DELETE = 46;
	const LIST_WIDTH = 180;
	const LIST_ROWS = 5;
	const SNIPPET_ID = "snippet_"; // the ids of the snippets in the list start with it

	let readsDocument = false; // the document can be asked
	let isPaused = false;      // switched off by the user until it is resumed or the editor is restarted
	let currentWord = "";      // the word in front of the cursor
	let accepted = "";         // the suggestion that was just written
	let backspaceTime = 0;
	let deleteTime = 0;

	function hideSuggestions()
	{
		plugin.getInputHelper().unShow();
	}

	function escapeHtml(text)
	{
		return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}

	// The snippets for the typed letters as items of the list. A snippet is
	// offered once its whole abbreviation is typed, however short it is.
	function getSnippetItems()
	{
		// the abbreviation is not the start of the text, so it has to be replaced
		if (!editor.canReplaceTyped())
			return [];

		return store.findSnippets(currentWord).map((snippet, index) => ({
			id : SNIPPET_ID + index,
			text : escapeHtml(snippet.abbreviation + " \u2192 " + snippet.text), // the list shows it as HTML
			snippet : snippet.text
		}));
	}

	function showSuggestions()
	{
		const isLongEnough = currentWord.length >= store.settings.minLength;
		const words = isLongEnough ? dictionary.suggest(currentWord, editor.canReplaceTyped()) : [];
		const items = getSnippetItems().concat(words.map(word => ({ text : word })));
		if (items.length == 0)
		{
			hideSuggestions();
			return;
		}

		const list = plugin.getInputHelper();
		list.setItems(items);
		const height = Math.min(list.getScrollSizes().h, list.getItemsHeight(Math.min(LIST_ROWS, items.length)));
		list.show(LIST_WIDTH, height, false);
	}

	function suggest()
	{
		// no suggestions for the word that was just chosen
		if (accepted && accepted.toLowerCase() === currentWord.toLowerCase())
		{
			hideSuggestions();
			return;
		}
		accepted = "";

		showSuggestions();
	}

	// the last word of a text: what follows the last space, punctuation, bracket or quote
	function getLastWord(text)
	{
		return (typeof text === "string") ? /[^\s.,;:!?"'()\[\]{}«»„“”‚‘’‹›…<>\/\\|]*$/.exec(text)[0] : "";
	}

	function getTextToWrite(item)
	{
		const text = item.snippet || item.text;
		return store.settings.addSpace ? text + " " : text;
	}

	// to be called when the item was written
	function onWritten(item)
	{
		if (item.snippet)
		{
			// no suggestions for the last word of the snippet, which now stands in front of the cursor
			accepted = getLastWord(item.snippet);
		}
		else
		{
			store.recordUse(item.text);
			accepted = item.text;
		}
		hideSuggestions();
	}

	const documentWord = {
		readId : 0, // the last time the document was asked: earlier answers are outdated

		// asks the document for the word in front of the cursor
		read : function(callback)
		{
			const id = ++this.readId;
			plugin.executeMethod("GetCurrentSentence", ["beforeCursor"], text => {
				// outdated if more was typed or the cursor has moved since
				if (id !== this.readId)
					return;

				if (typeof text === "string")
				{
					callback(getLastWord(text));
					return;
				}

				// no text is returned for a sentence with a picture in it: ask for the word alone
				plugin.executeMethod("GetCurrentWord", ["beforeCursor"], word => {
					if (id === this.readId)
						callback(getLastWord(word));
				});
			});
		},

		readAndSuggest : function()
		{
			this.read(word => {
				currentWord = word;
				suggest();
			});
		},

		onInput : function()
		{
			this.readAndSuggest();
		},

		onClear : function(isBackspace, isDelete)
		{
			if (isBackspace)
			{
				this.readAndSuggest();
			}
			else if (!isDelete) // Delete leaves the word in front of the cursor as it is
			{
				// the word has ended or the cursor may have moved: wait for the next letter
				this.readId++;
				accepted = "";
				currentWord = "";
				hideSuggestions();
			}
		},

		onSelect : function(item)
		{
			// write only if the word the suggestions were made for still stands in front of the cursor
			const shown = currentWord;
			this.read(word => {
				currentWord = word;
				if (word !== shown)
				{
					suggest();
					return;
				}

				plugin.executeMethod("InputText", [getTextToWrite(item), word]);
				onWritten(item);
			});
		}
	};

	// The editor reports only the letters typed since it last cleared its input,
	// which it does after a space, after backspace or Delete and after a
	// suggestion is written; the plugin keeps the text typed before that itself,
	// so that the word in front of the cursor is still known afterwards.
	const typedWord = {
		typed : "",      // everything typed, ends in the current word
		base : "",       // the part of it typed before the editor's current input
		editorText : "", // the editor's current input
		staleText : "",  // a part of the editor's input that is not in the document any more
		inputTime : 0,

		setTyped : function(text)
		{
			this.typed = text.slice(-200);
			currentWord = getLastWord(this.typed);
		},

		// the editor's input starts where the typed text ends now
		setBase : function(text)
		{
			this.base = text;
			this.setTyped(text);
		},

		reset : function()
		{
			this.staleText = "";
			this.setBase("");
		},

		onInput : function(data)
		{
			if (data.add)
			{
				this.setTyped(this.typed + data.text);
			}
			else
			{
				let text = data.text;
				this.editorText = text;
				if (this.staleText && text.startsWith(this.staleText))
					text = text.substr(this.staleText.length);
				else
					this.staleText = "";
				this.setTyped(this.base + text);
			}
			this.inputTime = Date.now();

			suggest();
		},

		onClear : function(isBackspace, isDelete)
		{
			this.editorText = "";
			this.staleText = "";

			if (isBackspace)
			{
				backspaceTime = 0;
				accepted = "";
				this.setBase(this.typed.slice(0, -1));
				showSuggestions();
				return;
			}

			// Delete leaves the text in front of the cursor as it is
			if (isDelete)
			{
				deleteTime = 0;
				this.base = this.typed;
				return;
			}

			// cleared by the character that was just typed (a space, a full stop):
			// the cursor has not moved
			if ((Date.now() - this.inputTime) < 150)
			{
				this.base = this.typed;
				return;
			}

			reset();
		},

		onSelect : function(item)
		{
			const letters = currentWord;
			const before = this.typed.slice(0, this.typed.length - letters.length);
			let written = getTextToWrite(item);

			if (editor.isPdf())
			{
				written = editor.completeInPdf(letters, written);
				// the editor's input still holds the typed letters
				this.staleText = this.editorText;
			}
			else
			{
				// the editor adds the written word to its input and keeps the typed letters in it
				plugin.executeMethod("InputText", [written, letters]);
				this.staleText = this.editorText + written;
			}

			this.setBase(before + written);
			onWritten(item);
		}
	};

	function getTracker()
	{
		return readsDocument ? documentWord : typedWord;
	}

	// forgets the word in front of the cursor
	function reset()
	{
		accepted = "";
		typedWord.reset();
		hideSuggestions();
	}

	function onKeyDown(e)
	{
		if (e && e.keyCode === KEY_BACKSPACE)
			backspaceTime = Date.now();
		if (e && e.keyCode === KEY_DELETE)
			deleteTime = Date.now();
	}

	// a right click on a suggestion adds it to the ignored words
	function onContextMenu(e)
	{
		const target = e.target;
		if (!target || target.tagName != "LI")
			return;

		e.preventDefault();
		e.stopPropagation();

		// a snippet is removed in the settings
		if (target.id.indexOf(SNIPPET_ID) === 0)
			return;

		const word = (target.innerText || "").replace(/\s+/g, "").toLowerCase();
		if (!word || store.isIgnored(word))
			return;

		store.ignore(word);
		showSuggestions();
	}

	plugin.event_onInputHelperInput = function(data)
	{
		if (!isPaused)
			getTracker().onInput(data);
	};

	// The editor clears its input for many reasons: backspace, Delete, a typed
	// space, the cursor keys, Enter, and half a second after the window gets the
	// focus. It does not say which one it was.
	plugin.event_onInputHelperClear = function()
	{
		if (isPaused)
			return;

		const now = Date.now();
		getTracker().onClear((now - backspaceTime) < 500, (now - deleteTime) < 500);
	};

	plugin.inputHelper_onSelectItem = function(item)
	{
		if (item && plugin.ih.isVisible && !isPaused)
			getTracker().onSelect(item);
	};

	// While it is paused the plugin does not follow what is typed, so it
	// starts with a new word when it is resumed.
	function setPaused(paused)
	{
		isPaused = paused;
		documentWord.readId++; // an answer of the document that is still to come is outdated
		reset();
	}

	// to be called once the window of the suggestion list is created
	function start()
	{
		document.addEventListener("contextmenu", onContextMenu);

		// a text document can be asked for the text in front of the cursor (editors since 7.4)
		if (editor.isTextDocument())
		{
			plugin.executeMethod("GetCurrentSentence", ["beforeCursor"], function(text) {
				// an editor that does not know the method answers nothing at all
				readsDocument = (text !== undefined);
			});
		}

		// While the suggestions are shown the editor does not report backspace,
		// so watch the keys of the editor window where the plugin can reach it
		// (the desktop editors).
		try
		{
			window.parent.document.addEventListener("keydown", onKeyDown, true);
		}
		catch (err)
		{
		}

		// the suggestion list has just set its key handler: watch the keys before it
		const onListKeyDown = plugin.event_onKeyDown;
		plugin.event_onKeyDown = function(e)
		{
			onKeyDown(e);
			if (onListKeyDown)
				return onListKeyDown.apply(this, arguments);
		};
	}

	window.Autocomplete.typing = {
		start : start,
		reset : reset,
		isPaused : () => isPaused,
		setPaused : setPaused
	};

})(window, undefined);
