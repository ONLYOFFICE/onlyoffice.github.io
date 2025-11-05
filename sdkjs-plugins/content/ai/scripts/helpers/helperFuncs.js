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

function RegisteredFunction(obj)
{
	this.name = obj.name || "";
	this.description = obj.description || "";
	this.parameters = obj.parameters || {};
	this.examples = obj.examples || [];
	this.returns = obj.returns || {};

	this.call = null;
}

function EditorHelperImpl() {

	this.funcs = [];
	this.names2funcs = {};
	this.isSupportStreaming = false;

	let editorType = Asc.Editor.getType();

	if (editorType === "word") {
		this.isSupportStreaming = true;
	}

	let hs = [];

	switch (editorType) {
		case "word": {
			hs = HELPERS.word;
			break;
		}
		case "cell": {
			hs = HELPERS.cell;	
			break;
		}
		case "slide": {
			hs = HELPERS.slide;
			break;
		}
		default:
			break;
	}

	for (let i = 0, len = hs.length; i < len; i++) {
		if (Array.isArray(hs[i])) {
			for (let j = 0, len2 = hs[i].length; j < len2; j++)
				this.funcs.push(hs[i][j]);
		} else {
			this.funcs.push(hs[i]);
		}
	}

	for (let i = 0; i < this.funcs.length; i++) {
		let func = this.funcs[i];
		this.names2funcs[func.name] = func;
	}
}

EditorHelperImpl.prototype.getSystemPrompt = function() {
	if (this.funcs.length === 0)
		return "";

	let systemPrompt = "\n\
You are a function-calling assistant.\n\
\n\
Your task:\n\
- Decide whether a user's request requires calling one of the available functions.\n\
- If a function is required, respond **only** with the exact function call in the strict format below.\n\
- If no function call is needed, respond with normal helpful text (no function syntax).\n\
\n\
────────────────────────────\n\
FUNCTION CALLING FORMAT\n\
────────────────────────────\n\
If you decide a function call is required, respond **only** like this:\n\
\n\
[functionCalling (functionName)]: parameters\n\
\n\
Where:\n\
- functionName — the exact name of the function to call.\n\
- parameters — a valid JSON object containing all function arguments.\n\
\n\
────────────────────────────\n\
STRICT RULES (CRITICAL)\n\
────────────────────────────\n\
- You MUST follow the exact format. No deviations.\n\
- NO explanations, introductions, or comments.\n\
- NO extra text before or after the function call.\n\
- NO markdown formatting.\n\
- NO code blocks.\n\
- NO \"I will now...\", \"Let me...\", \"Here's the...\" or similar phrases.\n\
- Only respond with plain text exactly matching the format.\n\
- Do NOT include trailing punctuation (like \".\") after the call.\n\
- Use a function call only if explicitly required to fulfill the user's request.\n\
- If the user's message doesn't need a function, respond normally with helpful natural text.\n\
\n\
────────────────────────────\n\
AVAILABLE FUNCTIONS\n\
────────────────────────────\n\
";

	for (let i in this.funcs) {
		let func = this.funcs[i];
		systemPrompt += "\n\
- " + func.name + "\n\
Description: " + func.description + "\n\
Parameters schema:\n" + 
JSON.stringify(func.parameters.properties) + "\n\
Returns:\n" +
JSON.stringify(func.returns);

		systemPrompt += "\n\n";
	}
	
	systemPrompt += "\
────────────────────────────\n\
EXAMPLES\n\
────────────────────────────\n\
";
	
	for (let i in this.funcs) {
		let func = this.funcs[i];
		for (let j = 0, len = func.examples.length; j < len; j++) {
			let ex = func.examples[j];
			systemPrompt += "If the user says: \"" + ex.prompt + "\"\n\
Respond exactly with:\n\
[functionCalling (" + func.name + ")]: " + JSON.stringify(ex.arguments) + "\n";
		}
	}

	systemPrompt += "\
────────────────────────────\n\
REMINDER\n\
────────────────────────────\n\
If no function call is needed — respond normally with clear helpful text.\n\
Never output a function call unless the user's request explicitly requires it.\n\
";

	return systemPrompt;
};

EditorHelperImpl.prototype.callFunc = async function(data) {

	let index1 = data.indexOf("(");
	let index2 = data.indexOf(")");
	let index3 = data.indexOf("{");

	let funcName = data.substring(index1 + 1, index2).trim();
	let paramsStr = getJsonResult(data, index3);

	try {
		let func = this.names2funcs[funcName];
		if (!func) {
			let errorMsg = "Function not found: " + funcName;
			console.error(errorMsg);
			return {
				error: errorMsg
			};
		}

		let result = await func.call(eval("(" + paramsStr.replaceAll("\n", "\\n") + ")"));
		if (!result)
			result = {};

		result.message = "System function '" + funcName + "' executed successfully";
		return result;
	} catch (e) {
		let errorMsg = "Error calling function: " + funcName;
		console.error(errorMsg);
		return {
			error: errorMsg
		};
	}
	
};

function getJsonResult(responseText, startPos) {
		
	let result = "";

	let isEscaped = false;
	let inString = false;
	let braceCount = 0;
	let inputLen = responseText.length;
	
	for (let i = startPos; i < inputLen; i++) {
		let char = responseText[i];
		
		if (char === '\n') {
			this.lineNumber++;
		}
		
		if (char === '"' && !isEscaped) {
			inString = !inString;
		}
		
		isEscaped = (char === '\\' && !isEscaped);
		
		if (!inString) {
			if (char === '{') {
				braceCount++;
			}
			else if (char === '}') {
				braceCount--;

				if (braceCount === 0) {
					return responseText.substring(startPos, i + 1);
				}
			}				
		}
	}

	return responseText.substring(startPos);
}
