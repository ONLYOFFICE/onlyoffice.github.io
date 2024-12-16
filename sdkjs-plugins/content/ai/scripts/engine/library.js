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
			Api.GetDocument().MoveCursorToEndPos();
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

	Library.prototype.InsertAsReview = async function(content, isHtml) {
		Asc.scope.content = content.trim();
		Asc.scope.isHtml = !!isHtml;
		return await Editor.callCommand(function(){
			let doc = Api.GetDocument();
			let isTrackRevisions = doc.IsTrackRevisions();
			doc.SetTrackRevisions(true);
			if (Asc.scope.isHtml)
				Api.pluginMethod_PasteHtml(Asc.scope.content);
			else
				Api.pluginMethod_PasteText(Asc.scope.content);
			if (!isTrackRevisions)
				doc.SetTrackRevisions(false);
		});
	}

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

})(window);
