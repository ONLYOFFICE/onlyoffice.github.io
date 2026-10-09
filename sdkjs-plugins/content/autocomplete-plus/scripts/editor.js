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

	// What the plugin can do in the editor it runs in.

	const plugin = window.Asc.plugin;

	const SELECTION_TIMEOUT = 300; // milliseconds
	const WORD_EDGE = /^[\s.,;:!?"'()\[\]{}«»„“”‚‘’‹›…<>]+|[\s.,;:!?"'()\[\]{}«»„“”‚‘’‹›…<>]+$/g;

	function isPdf()
	{
		// the PDF editor is built on the document editor and reports itself as "word" with the sub type "pdf"
		const info = plugin.info;
		return !!info && (info.editorType === "pdf" || info.editorSubType === "pdf");
	}

	function isTextDocument()
	{
		const info = plugin.info;
		return !!info && info.editorType === "word" && !isPdf();
	}

	// The editor API of the PDF editor, if the plugin can reach it (it can in the
	// desktop editors, where the plugin and the editor are loaded from files).
	function getPdfApi()
	{
		try
		{
			const api = window.parent.Asc.editor;
			if (api && typeof api.asc_correctEnterText === "function" && typeof api.asc_enterText === "function")
				return api;
		}
		catch (err)
		{
		}
		return null;
	}

	// whether choosing a suggestion can change the letters that are already typed
	function canReplaceTyped()
	{
		return !isPdf() || null !== getPdfApi();
	}

	function getCodePoints(text)
	{
		return Array.from(text, character => character.codePointAt(0));
	}

	// Completes the typed letters to the word in the PDF editor, where InputText
	// does nothing. Returns what stands in the document afterwards.
	function completeInPdf(typed, word)
	{
		const rest = word.substr(typed.length);
		const api = getPdfApi();
		if (api)
		{
			if (false !== api.asc_correctEnterText(getCodePoints(typed), getCodePoints(word)) || !rest)
				return word;

			api.asc_enterText(getCodePoints(rest));
			return typed + rest;
		}

		// the typed letters cannot be replaced: add the rest of the word
		if (rest)
			plugin.executeMethod("PasteText", [rest]);
		return typed + rest;
	}

	// the text without the spaces and punctuation around it if it is a single word, "" otherwise
	function getSingleWord(text)
	{
		if (typeof text !== "string")
			return "";

		const word = text.replace(WORD_EDGE, "");
		return (word.length < 2 || word.length > 50 || /[\s,;]/.test(word)) ? "" : word;
	}

	// Answers with the selected word, or with "" if anything else is selected.
	function getSelectedWord(callback)
	{
		let isAnswered = false;
		function answer(text)
		{
			if (isAnswered)
				return;
			isAnswered = true;
			callback(getSingleWord(text));
		}

		plugin.executeMethod("GetSelectedText", [{ Numbering : false, Math : false }], answer);
		// this is asked while the editor waits with its context menu: do not let it wait long
		window.setTimeout(answer, SELECTION_TIMEOUT);
	}

	window.Autocomplete.editor = {
		isPdf : isPdf,
		isTextDocument : isTextDocument,
		canReplaceTyped : canReplaceTyped,
		completeInPdf : completeInPdf,
		getSelectedWord : getSelectedWord
	};

})(window, undefined);
