(function(exports, undefined)
{
	let Editor = {};
	
	Editor.callMethod = async function(name, args)
	{
		return new Promise(resolve => (function(){
			Asc.plugin.executeMethod(name, args || [], function(returnValue){
				resolve(returnValue);
			});
		})());
	};

	Editor.callCommand = async function(func)
	{
		return new Promise(resolve => (function(){
			Asc.plugin.callCommand(func, false, true, function(returnValue){
				resolve(returnValue);
			});
		})());
	};

	Editor.pause = async function(msec)
	{
		return new Promise(resolve => (function(){
			setTimeout(function(){
				resolve();				
			}, msec);
		})());
	};

	exports.Asc = exports.Asc || {};
	exports.Asc.Editor = Editor;

	function Library() {}

	Library.prototype.GetCurrentWord = async function()
	{
		return await Editor.callMethod("GetCurrentWord");
	};

	Library.prototype.GetSelectedText = async function()
	{
		return await Editor.callMethod("GetSelectedText");
	};

	Library.prototype.ReplaceTextSmart = async function(text)
	{
		return await Editor.callMethod("ReplaceTextSmart", [text]);
	};

	Library.prototype.InsertAsText = async function(text)
	{
		Asc.scope.data = (text || "").split("\n\n");
		return await Editor.callCommand(function() {
			let oDocument = Api.GetDocument();
			for (let ind = 0; ind < Asc.scope.data.length; ind++) {
				let text = Asc.scope.data[ind];
				if (text.length) {
					let oParagraph = Api.CreateParagraph();
					oParagraph.AddText(text);
					oDocument.Push(oParagraph);
				}
			}
		});
	};

	Library.prototype.InsertAsHTML = async function(data)
	{
		await Editor.callCommand(function() {
			let doc = Api.GetDocument();
			let paras = doc.GetAllParagraphs();
			if (paras.length)
			{
				let lastPara = paras[paras.length - 1];
				let lastElement = lastPara.GetElement(lastPara.GetElementsCount() - 1);
				if (lastElement && lastElement.MoveCursorToPos)
				{
					lastElement.MoveCursorToPos(100000);
				}
			}
		});
		return await Editor.callMethod("PasteHtml", [data]);
	};

	Library.prototype.InsertAsComment = async function(text)
	{
		return await Editor.callMethod("AddComment", [{
			UserName : "AI",
			Text : text,
			Time: Date.now(),
			Solver: false
		}]);
	};

	Library.prototype.InsertAsHyperlink = async function(content, hint)
	{
		let text = content;
		start = text.indexOf('htt');
		end = text.indexOf(' ', start);
		if (end == -1)
			end = text.length;

		Asc.scope.link = text.slice(start, end);
		return await Editor.callCommand(function(){
			let oDocument = Api.GetDocument();
			let oRange = oDocument.GetRangeBySelect();
			oRange.AddHyperlink(Asc.scope.link, "Meaning of the word");
		});
	};

	Library.prototype.InsertAsReview = async function(content, isHtml) 
	{
		let isTrackRevisions = await Editor.callCommand(function(){
			let res = Api.asc_GetLocalTrackRevisions();
			Api.asc_SetLocalTrackRevisions(true);
			return res;
		});

		Asc.scope.localTrackRevisions = isTrackRevisions;

		await Editor.callMethod(isHtml ? "PasteHtml" : "PasteText", [content.trim()]);

		if (true !== isTrackRevisions) 
		{
			await Editor.callCommand(function(){
				Api.asc_SetLocalTrackRevisions(Asc.scope.localTrackRevisions);
			});
		}
	};

	Library.prototype.PasteText = async function(text)
	{
		return await Editor.callMethod("PasteText", [text]);
	};

	Library.prototype.SendError = async function(text, errorLevel)
	{
		Asc.scope.errorText = text;
		Asc.scope.errorLevel = errorLevel;
		return await Editor.callCommand(function(){
			Api.sendEvent("asc_onError", Asc.scope.errorText, Asc.scope.errorLevel);
		});
	};

	exports.Asc = exports.Asc || {};
	exports.Asc.Library = new Library();

	exports.Asc.Prompts = {
		getFixAndSpellPrompt(content) {
			let prompt = `I want you to act as an editor and proofreader. \
I will provide you with some text that needs to be checked for spelling and grammar errors. \
Your task is to carefully review the text and correct any mistakes, \
ensuring that the corrected text is free of errors and maintains the original meaning. \
Only return the corrected text. \
Here is the text that needs revision: \"${content}\"`;
			return prompt;
		},
		getSummarizationPrompt(content, language) {
			let prompt = "Summarize the following text. ";
			if (language) {
				prompt += "and translate the result to " + language;
				prompt += "Return only the resulting translated text.";
			} else {
				prompt += "Return only the resulting text.";
			}
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		},
		getTranslatePrompt(content, language) {
			let prompt = "Translate the following text to " + language;
			prompt += ". Return only the resulting text.";
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		},
		getExplainPrompt(content) {
			let prompt = "Explain what the following text means. Return only the resulting text.";
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		},
		getTextLongerPrompt(content) {
			let prompt = "Make the following text longer. Return only the resulting text.";
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		},
		getTextShorterPrompt(content) {
			let prompt = "Make the following text simpler. Return only the resulting text.";
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		},
		getTextRewritePrompt(content) {
			let prompt = "Rewrite the following text differently. Return only the resulting text.";
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		},
		getTextKeywordsPrompt(content) {
			let prompt = `Get Key words from this text: "${content}"`;
			return prompt;
		},
		getExplainAsLinkPrompt(content) {
			let prompt = "Give a link to the explanation of the following text. Return only the resulting link.";
			prompt += "Text: \"\"\"\n";
			prompt += content;
			prompt += "\n\"\"\"";
			return prompt;
		}
	};

})(window);
