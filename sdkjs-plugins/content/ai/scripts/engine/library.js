(function(window, undefined)
{
    
    function Library()
    {
    }

    Library.prototype.GetCurrentWord = async function()
    {
        return await AI.callMethod("GetCurrentWord");
    };

    Library.prototype.GetSelectedText = async function()
    {
        return await AI.callMethod("GetSelectedText");
    };

    Library.prototype.ReplaceTextSmart = async function(text)
    {
        return await AI.callMethod("ReplaceTextSmart", [text]);
    };

    Library.prototype.InsertAsText = async function(text)
    {
        Asc.scope.data = (text || "").split("\n\n");
        return await AI.callCommand(function() {
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
        return await AI.callMethod("AddComment", [{
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
        return await AI.callCommand(function(){
            let oDocument = Api.GetDocument();
            let oRange = oDocument.GetRangeBySelect();
            oRange.AddHyperlink(Asc.scope.link, "Meaning of the word");
        });
    };

    Library.prototype.PasteText = async function(text)
    {
        return await AI.callMethod("PasteText", [text]);
    };

    window.Asc = window.Asc || {};
    window.Asc.Library = new Library();

})(window);
