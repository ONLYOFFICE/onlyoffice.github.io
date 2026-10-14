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

	// The word list and the search in it.

	const store = window.Autocomplete.store;

	const MIN_USE_COUNT = 2;

	let sorted = null;         // lower-case words, sorted for the prefix search; null until the list is loaded
	const records = new Map(); // lower-case word -> { rank, text, lang }, rank 0 is the most frequent

	// the file lists one word per line, most frequent first;
	// "\td" or "\te" after the word marks it as only German or only English
	function load(url)
	{
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState !== 4)
				return;

			const keys = [];
			// a file of the desktop editors is answered with the status 0
			if (xhr.status === 200 || xhr.status === 0)
			{
				xhr.responseText.split(/\r?\n/).forEach((line, rank) => {
					const parts = line.split("\t");
					const key = parts[0].toLowerCase();
					if (!key || records.has(key))
						return;
					records.set(key, { rank : rank, text : parts[0], lang : parts[1] || "" });
					keys.push(key);
				});
				keys.sort();
			}
			sorted = keys;
		};
		xhr.onerror = function() {
			sorted = [];
		};
		xhr.send();
	}

	// the index of the first word that is not in front of the prefix
	function findFirst(prefix)
	{
		let start = 0;
		let end = sorted.length;
		while (start < end)
		{
			const middle = (start + end) >> 1;
			if (sorted[middle] < prefix)
				start = middle + 1;
			else
				end = middle;
		}
		return start;
	}

	function isWanted(lang)
	{
		const settings = store.settings;
		if (lang == "d")
			return settings.german;
		if (lang == "e")
			return settings.english;
		return settings.german || settings.english;
	}

	// The words that continue the typed text, best first. canReplace tells
	// whether the typed letters can be changed, which a word in another case
	// than the typed one needs.
	function suggest(typed, canReplace)
	{
		if (!sorted)
			return [];

		const settings = store.settings;
		const prefix = typed.toLowerCase();
		const result = [];

		// a capital letter behind the first one was typed by accident ("HAu"): no word is written like that
		const hasSlip = canReplace && typed.substr(1) != prefix.substr(1);

		// the word in the case of the typed text
		function complete(word)
		{
			if (hasSlip)
				return typed.charAt(0) + word.substr(1);
			return typed + word.substr(prefix.length);
		}

		// personal words come first, in the order they were entered
		const personal = new Set();
		for (const word of store.getList("personal"))
		{
			if (result.length >= settings.maxItems)
				break;

			const key = word.toLowerCase();
			// not the word that is already typed
			if (!key.startsWith(prefix) || key == prefix || store.isIgnored(key))
				continue;
			personal.add(key);
			// written as entered, unless it is all lower case
			result.push((word != key && canReplace) ? word : complete(word));
		}

		const found = [];
		for (let index = findFirst(prefix); index < sorted.length; index++)
		{
			const key = sorted[index];
			if (!key.startsWith(prefix))
				break;
			if (key == prefix || personal.has(key) || store.isIgnored(key))
				continue;

			const record = records.get(key);
			if (!isWanted(record.lang))
				continue;

			// a word chosen only once is not moved up: it may have been chosen by accident
			const used = settings.learn ? store.getUseCount(key) : 0;
			found.push({ record : record, used : used >= MIN_USE_COUNT ? used : 0 });
		}

		// the words chosen most often first, then the most frequent ones
		found.sort((a, b) => (b.used - a.used) || (a.record.rank - b.record.rank));

		// nouns and names keep their capital letter, everything else follows the typed text
		const keepCapital = settings.capitalize && settings.german && canReplace;
		for (const match of found.slice(0, settings.maxItems - result.length))
		{
			const word = match.record.text;
			const isCapital = word.charAt(0) != word.charAt(0).toLowerCase();
			result.push((keepCapital && isCapital) ? word : complete(word));
		}

		return result;
	}

	window.Autocomplete.dictionary = {
		load : load,
		suggest : suggest,

		// a word as the word list writes it
		getSpelling : function(key) {
			const record = records.get(key);
			return record ? record.text : key;
		}
	};

})(window, undefined);
