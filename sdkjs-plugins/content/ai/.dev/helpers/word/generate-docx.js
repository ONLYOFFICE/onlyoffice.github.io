/*
 * (c) Copyright Ascensio System SIA 2010-2025
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

(function(){
	let func = new RegisteredFunction({
		"name": "generateDocx",
		"description": "Use this function if you are asked to generate a textual document (report, article, letter, etc.) based on a description. Input: Short description of what needs to be generated.",
		"parameters": {
			"type": "object",
			"properties": {
				"description": {
					"type": "string",
					"description": "Short description of the document to generate."
				}
			},
			"required": ["description"]
		}
	});
	
	func.call = async function(params) {
		const instructions = "Generate the document **preferably** in Markdown (.md) format.\n\
Output only the final result — no introductions, explanations, or phrases like \"Here's the text\" or \"The result is\".\n\
The document MUST be written in pure Markdown.\n\
Absolutely forbidden:\n\
- HTML tags (e.g., <p>, <div>, <span>, <h1>, <img>, <br>)\n\
- HTML attributes (e.g., align=\"center\", style=\"...\")\n\
- Embedded CSS\n\
- Raw HTML blocks of any kind\n\
Emoji MUST NOT be wrapped in HTML containers.\n\
If you cannot decorate or center text without HTML, do NOT decorate or center it at all.\n\
If possible, provide the output in valid Markdown (.md) format, but do not wrap it in ```markdown``` or any other code block.\n";

		let fullPrompt = instructions + "\nDescription:\n\n" + params.description;

		await streamPromptResultToDocument(fullPrompt);
	};

	return func;
})();
