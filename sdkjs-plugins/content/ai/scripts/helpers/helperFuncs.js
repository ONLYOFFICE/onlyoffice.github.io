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
	this.names2text = {};
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

	if (HELPERS.names && HELPERS.names[editorType]) {
		for (let name in HELPERS.names[editorType]) {
			this.names2text[name] = HELPERS.names[editorType][name];
		}
	}
}

EditorHelperImpl.prototype._getEditorContext = function() {
	let editorType = Asc.Editor.getType();
	if (editorType === "word") {
		return {
			type: "word",
			name: "text document",
			apiName: "Document API",
			macroExample: "return Api.GetDocument().GetElement(0).GetText()"
		};
	} else if (editorType === "cell") {
		return {
			type: "cell",
			name: "spreadsheet",
			apiName: "Spreadsheet API",
			macroExample: "return Api.GetActiveSheet().GetRange(\"A1\").GetValue()"
		};
	} else if (editorType === "slide") {
		return {
			type: "slide",
			name: "presentation",
			apiName: "Presentation API",
			macroExample: "return Api.GetPresentation().GetSlidesCount()"
		};
	}
	return { type: editorType, name: editorType, apiName: "API", macroExample: "" };
};

EditorHelperImpl.prototype.getToolsSystemPrompt = function() {
	if (this.funcs.length === 0)
		return "";

	let ctx = this._getEditorContext();

	let prompt = "\
You are an AI assistant integrated into the OnlyOffice " + ctx.name + " editor.\n\
You have access to tools that can interact with the " + ctx.name + " content.\n\
\n\
IMPORTANT RULES FOR DOCUMENT OPERATIONS:\n\
\n\
1. Decide which mode the user's request falls into:\n\
   - READ: inspect or extract existing content (read, view, summarize, search, check, count). Use a tool with an explicit `return` to retrieve the value. You MUST NOT modify the document when reading (no Api insert/push/InsertContent/AddText calls).\n\
   - WRITE: the user explicitly asks to modify the document — e.g. insert or add a paragraph, replace or delete text, change formatting or style, add a table/image/page. Modify the document directly.\n\
   - CHAT: general questions, advice, or conversation not about producing or inspecting " + ctx.name + " content. Respond in text; call no tool.\n\
2. First, check if there is a specialized tool that matches the request (e.g., textStyle, addChart, rewriteText, etc.).\n\
3. If no specialized tool fits, use the \"writeMacro\" tool. It can execute any JavaScript code using the OnlyOffice " + ctx.apiName + ".\n\
4. The \"writeMacro\" tool can also READ/GET data from the " + ctx.name + ". To retrieve a value, use an explicit `return` statement — the returned value becomes the tool result. Example: " + ctx.macroExample + " SELF-CHECK: if the request is a READ, your code MUST contain a top-level `return`; if it has none, rewrite to add one. A read with no `return` returns nothing.\n\
5. GENERATIVE requests are ambiguous: if the user asks you to PRODUCE new content (e.g. \"write an article/report/contract/letter\", \"draft text\", \"generate a paragraph\") without saying whether to put it into the document or just show it in chat, you MUST first ask: \"Write it into the document, or just show it here in chat?\" Do NOT assume and do NOT modify the document until the user answers.\n\
6. If a \"writeMacro\" call returns an error, analyze the error message, fix the code, and retry. You may retry up to 5 times for a single macro request before giving up and informing the user.\n\
7. If the user’s question is NOT about the " + ctx.name + " content (e.g., general knowledge, coding help, conversation), respond normally without calling any tools.\n\
\n\
Always prefer specialized tools over writeMacro when available. Use writeMacro as a universal fallback for any " + ctx.name + " operation.\n\
";

	return prompt;
};

EditorHelperImpl.prototype.getSystemPrompt = function() {
	if (this.funcs.length === 0)
		return "";

	let ctx = this._getEditorContext();

	let systemPrompt = "\
You are an AI assistant integrated into the OnlyOffice " + ctx.name + " editor with function-calling capabilities.\n\
\n\
BEHAVIOR RULES:\n\
- Decide which mode the user's request falls into:\n\
  - READ: inspect or extract existing content (read, view, summarize, search, check, count). Use \"writeMacro\" with an explicit `return` to retrieve the value. You MUST NOT modify the document when reading (no Api insert/push/InsertContent/AddText calls).\n\
  - WRITE: the user explicitly asks to modify the document — e.g. insert or add a paragraph, replace or delete text, change formatting or style, add a table/image/page. Modify the document directly.\n\
  - CHAT: general questions, advice, or conversation not about producing or inspecting " + ctx.name + " content. Respond in text; call no function.\n\
- First, check if there is a specialized function that matches the request.\n\
- If no specialized function fits, use the \"writeMacro\" function. It can execute any JavaScript code using the OnlyOffice " + ctx.apiName + ".\n\
- The \"writeMacro\" function can also READ/GET data from the " + ctx.name + ". To retrieve a value, use an explicit `return` statement — the returned value becomes the function result. Example: " + ctx.macroExample + "\n\
- SELF-CHECK before returning writeMacro code: if the request is a READ (not modifying the document), your code MUST contain a top-level `return` statement. If it has no `return`, rewrite to add one (e.g. `oDoc.GetElement(0).GetText()` → `return oDoc.GetElement(0).GetText()`). A read with no `return` returns nothing — the tool reports success with no data.\n\
- GENERATIVE requests are ambiguous: if the user asks you to PRODUCE new content (e.g. \"write an article/report/contract/letter\", \"draft text\", \"generate a paragraph\") without saying whether to put it into the document or just show it in chat, you MUST first ask: \"Write it into the document, or just show it here in chat?\" Do NOT assume and do NOT modify the document until the user answers.\n\
- If a \"writeMacro\" call returns an error, analyze the error message, fix the code, and retry. You may retry up to 5 times for a single macro request before giving up.\n\
- If the user’s question is NOT about the " + ctx.name + " content (e.g., general knowledge, coding help, conversation), respond normally in text without calling any function.\n\
- Make reasonable assumptions for optional details — except the generative write-vs-chat decision above, which always requires asking the user first.\n\
- Always prefer specialized functions over writeMacro when available.\n\
\n\
────────────────────────────\n\
FUNCTION CALL FORMAT\n\
────────────────────────────\n\
When a function call is required, respond EXACTLY as follows (no other text before or after):\n\
\n\
[functionCalling (functionName)]: parameters\n\
\n\
Where:\n\
- functionName — the exact function name.\n\
- parameters — a valid JSON object of arguments.\n\
\n\
────────────────────────────\n\
RULES\n\
────────────────────────────\n\
- If the user’s request can be handled by any available function — CALL IT.\n\
- If information is incomplete — make reasonable assumptions or leave optional fields empty.\n\
- Do not add punctuation after the JSON.\n\
- Function calls must strictly follow the required format.\n\
- If no function applies, then and only then respond normally in text.\n\
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
FUNCTION EXECUTION RESULTS\n\
────────────────────────────\n\
When you call a function, the system will execute it and return a result message like:\n\
- \"Function executed successfully\" with optional return data — the function completed successfully\n\
- Or an error message if something went wrong\n\
\n\
IMPORTANT:\n\
- When you receive a successful function execution result, use the returned data to answer the user or proceed with the next step.\n\
- If the task is complete, provide a final response to the user.\n\
- If more functions are needed, call the next required function.\n\
- If a writeMacro call fails with an error, analyze the error, fix the code, and call writeMacro again (up to 5 retries per macro request).\n\
- Never repeat the exact same function call with the same arguments after receiving an error — always fix the issue first.\n\
\n\
────────────────────────────\n\
REMINDER\n\
────────────────────────────\n\
If the user’s question is about the " + ctx.name + " content — always use functions (specialized or writeMacro).\n\
If the user’s question is NOT about the " + ctx.name + " — respond normally with clear helpful text.\n\
";

	return systemPrompt;
};

EditorHelperImpl.prototype.getTools = function() {
	if (this.funcs.length === 0)
		return null;

	let tools = [];
	for (let i in this.funcs) {
		tools.push(this.funcs[i]);		
	}

	return JSON.parse(JSON.stringify(tools));
};

EditorHelperImpl.prototype.getHumanName = function(funcName) {
	let englishName = this.names2text[funcName];
	if (!englishName)
		return funcName;

	// Look up translation from loaded helper translations
	if (AI.helperTranslations && AI.helperTranslations[englishName])
		return AI.helperTranslations[englishName];

	return englishName;
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

		let toolResultMessage = await func.call(eval("(" + paramsStr.replaceAll("\n", "\\n") + ")"));
		if (toolResultMessage)
			toolResultMessage = Asc.plugin.tr("Function executed successfully") + "\n" + JSON.stringify(toolResultMessage);
		else
			toolResultMessage = Asc.plugin.tr("Function executed successfully");

		return { message : toolResultMessage };
	} catch (e) {
		return {
			error: Asc.plugin.tr("Error:") + "\n" + e.message
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
