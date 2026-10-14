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

	// What the user has set up and what the plugin has learned, kept in the
	// local storage of the editor.

	const SETTINGS_KEY = "onlyoffice_autocomplete_settings";
	const USAGE_KEY = "onlyoffice_autocomplete_usage";
	const SNIPPETS_KEY = "onlyoffice_autocomplete_snippets";
	const LIST_KEYS = {
		personal : "onlyoffice_autocomplete_personal", // suggested before the word list and written as entered
		ignored : "onlyoffice_autocomplete_ignored"    // never suggested
	};

	const DEFAULTS = {
		german : true,
		english : true,
		capitalize : true, // suggest German nouns with a capital letter
		learn : true,      // suggest the words that were chosen before first
		addSpace : false,  // write a space after the chosen word
		minLength : 3,     // typed letters before the suggestions appear
		maxItems : 30
	};
	const LIMITS = {
		minLength : [1, 6],
		maxItems : [1, 100]
	};
	const LIST_MAX = 5000;
	const USAGE_MAX = 3000;

	let settings = checkSettings(readJson(SETTINGS_KEY), DEFAULTS);
	const lists = { personal : [], ignored : [] };
	let ignored = new Set();          // lower-case ignored words
	let snippets = [];                // { abbreviation, key, text }: the text is written for the abbreviation
	let usage = Object.create(null);  // how often each suggestion was chosen: lower-case word -> count

	function read(key)
	{
		try
		{
			return window.localStorage.getItem(key);
		}
		catch (err)
		{
			return null;
		}
	}

	function readJson(key)
	{
		try
		{
			return JSON.parse(window.localStorage.getItem(key));
		}
		catch (err)
		{
			return null;
		}
	}

	function write(key, value)
	{
		try
		{
			window.localStorage.setItem(key, value);
		}
		catch (err)
		{
		}
	}

	// the values of the right type, and those of the fallback instead of the others
	function checkSettings(values, fallback)
	{
		const result = {};
		for (const name in DEFAULTS)
		{
			const value = values ? values[name] : undefined;
			result[name] = (typeof value === typeof DEFAULTS[name]) ? value : fallback[name];
		}
		for (const name in LIMITS)
		{
			const min = LIMITS[name][0];
			const max = LIMITS[name][1];
			result[name] = Math.min(max, Math.max(min, Math.round(result[name]) || DEFAULTS[name]));
		}
		return result;
	}

	function saveSettings(values)
	{
		settings = checkSettings(values, settings);
		write(SETTINGS_KEY, JSON.stringify(settings));
	}

	// the words of a text, each one once
	function parseList(text)
	{
		const result = [];
		const used = new Set();
		for (const word of String(text || "").split(/[\s,;]+/))
		{
			if (result.length >= LIST_MAX)
				break;

			const key = word.toLowerCase();
			if (!key || used.has(key))
				continue;
			used.add(key);
			result.push(word);
		}
		return result;
	}

	function setList(name, text)
	{
		lists[name] = parseList(text);
		if (name == "ignored")
			ignored = new Set(lists.ignored.map(word => word.toLowerCase()));
	}

	function saveList(name, text)
	{
		setList(name, text);
		write(LIST_KEYS[name], lists[name].join("\n"));
		onCountsChanged();
	}

	function hasPersonal(word)
	{
		const key = word.toLowerCase();
		return lists.personal.some(entry => entry.toLowerCase() == key);
	}

	// an ignored word would not be suggested, so it is taken from the ignored words
	function addPersonal(word)
	{
		const key = word.toLowerCase();
		if (ignored.has(key))
			saveList("ignored", lists.ignored.filter(entry => entry.toLowerCase() != key).join("\n"));
		saveList("personal", lists.personal.concat([word]).join("\n"));
	}

	function ignore(word)
	{
		saveList("ignored", lists.ignored.concat([word.toLowerCase()]).join("\n"));
	}

	// the snippets of a text with a line "abbreviation = text" for each, each abbreviation once
	function parseSnippets(text)
	{
		const result = [];
		const used = new Set();
		for (const line of String(text || "").split(/\r?\n/))
		{
			if (result.length >= LIST_MAX)
				break;

			const match = /^\s*([^\s=]+)\s*=\s*(.*\S)\s*$/.exec(line);
			if (!match || used.has(match[1].toLowerCase()))
				continue;
			used.add(match[1].toLowerCase());
			result.push({ abbreviation : match[1], key : match[1].toLowerCase(), text : match[2] });
		}
		return result;
	}

	function getSnippetsText()
	{
		return snippets.map(snippet => snippet.abbreviation + " = " + snippet.text).join("\n");
	}

	function saveSnippets(text)
	{
		snippets = parseSnippets(text);
		write(SNIPPETS_KEY, getSnippetsText());
		onCountsChanged();
	}

	// the snippets the typed letters are the whole abbreviation of
	function findSnippets(typed)
	{
		const key = typed.toLowerCase();
		return snippets.filter(snippet => snippet.key == key);
	}

	function saveUsage()
	{
		write(USAGE_KEY, JSON.stringify(usage));
	}

	function loadUsage()
	{
		const saved = readJson(USAGE_KEY);
		for (const word in saved)
		{
			if (typeof saved[word] === "number" && saved[word] > 0)
				usage[word] = saved[word];
		}
	}

	function recordUse(word)
	{
		if (!settings.learn || !word)
			return;

		const key = word.toLowerCase();
		usage[key] = (usage[key] || 0) + 1;

		// forget the least used words when there are too many
		const words = Object.keys(usage);
		if (words.length > USAGE_MAX)
		{
			words.sort((a, b) => usage[b] - usage[a]);
			for (const rare of words.slice(Math.round(USAGE_MAX * 0.9)))
			{
				if (rare != key)
					delete usage[rare];
			}
		}
		saveUsage();
	}

	// the learned words as [word, count], most chosen first
	function getLearned()
	{
		return Object.keys(usage)
			.sort((a, b) => (usage[b] - usage[a]) || (a < b ? -1 : 1))
			.map(word => [word, usage[word]]);
	}

	// keeps the words that are listed, each on a line as "word" or "word (count)"
	function setLearned(text)
	{
		usage = Object.create(null);
		for (const line of String(text || "").split(/\r?\n/))
		{
			const match = /^\s*(\S+)\s*(?:\((\d+)\))?\s*$/.exec(line);
			if (match)
				usage[match[1].toLowerCase()] = Math.max(1, parseInt(match[2]) || 1);
		}
		saveUsage();
		onCountsChanged();
	}

	function onCountsChanged()
	{
		if (api.onCountsChanged)
			api.onCountsChanged();
	}

	function getCounts()
	{
		return {
			personal : lists.personal.length,
			ignored : lists.ignored.length,
			snippets : snippets.length,
			learned : Object.keys(usage).length
		};
	}

	for (const name in LIST_KEYS)
		setList(name, read(LIST_KEYS[name]));
	snippets = parseSnippets(read(SNIPPETS_KEY));
	loadUsage();

	const api = {
		get settings() { return settings; },
		saveSettings : saveSettings,

		// the personal dictionary and the ignored words, by name
		getList : name => lists[name],
		saveList : saveList,
		hasPersonal : hasPersonal,
		addPersonal : addPersonal,
		isIgnored : key => ignored.has(key),
		ignore : ignore,

		// the text snippets, edited as a text with a line for each
		getSnippetsText : getSnippetsText,
		saveSnippets : saveSnippets,
		findSnippets : findSnippets,

		getUseCount : key => usage[key] || 0,
		recordUse : recordUse,
		getLearned : getLearned,
		setLearned : setLearned,

		// the number of words in each list; onCountsChanged is called when a list was edited
		getCounts : getCounts,
		onCountsChanged : null
	};

	window.Autocomplete = { store : api };

})(window, undefined);
