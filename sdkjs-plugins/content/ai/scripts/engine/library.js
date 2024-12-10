(function(exports, undefined)
{
	function Editor() {}
	
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

	var EditorInstance = new Editor();

	exports.Asc = exports.Asc || {};
	exports.Asc.Editor = EditorInstance;

	function Library() {}

	Library.prototype.GetCurrentWord = async function()
	{
		return await EditorInstance.callMethod("GetCurrentWord");
	};

	Library.prototype.GetSelectedText = async function()
	{
		return await EditorInstance.callMethod("GetSelectedText");
	};

	Library.prototype.ReplaceTextSmart = async function(text)
	{
		return await EditorInstance.callMethod("ReplaceTextSmart", [text]);
	};

	Library.prototype.InsertAsText = async function(text)
	{
		Asc.scope.data = (text || "").split("\n\n");
		return await EditorInstance.callCommand(function() {
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

	Library.prototype.InsertAsComment = async function(text)
	{
		return await EditorInstance.callMethod("AddComment", [{
			Username : "AI",
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
		return await EditorInstance.callCommand(function(){
			let oDocument = Api.GetDocument();
			let oRange = oDocument.GetRangeBySelect();
			oRange.AddHyperlink(Asc.scope.link, "Meaning of the word");
		});
	};

	Library.prototype.PasteText = async function(text)
	{
		return await EditorInstance.callMethod("PasteText", [text]);
	};

	exports.Asc = exports.Asc || {};
	exports.Asc.Library = new Library();

})(window);
