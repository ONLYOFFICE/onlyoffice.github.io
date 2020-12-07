(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
    var txt ="";

	window.Asc.plugin.init = function (text) {

        txt = text;
    };

	$(document).ready(function () {

        $("#correct").click(function() {
            var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
            var tp = new Typograf({locale: [locale]});
            var rules = document.getElementsByClassName("prefs__rule-checkbox");

            for (var rule = 0; rule < rules.length; rule++) {
                if (rules[rule].checked) {
                    tp.enableRule(rules[rule].getAttribute("data-id"));
                }
                else {
                    tp.disableRule(rules[rule].getAttribute("data-id"));
                }
            }

            var allParasInSelection = txt.split(/\n/);
            var allTypografedParas = [];

            for (var Item = 0; Item < allParasInSelection.length; Item++) {
                typografedText = tp.execute(allParasInSelection[Item]);
                allTypografedParas.push(typografedText);
            }

            window.Asc.plugin.info.recalculate = true;
            window.Asc.plugin.executeCommand("command", createScript(allTypografedParas));
        })
    });


    function createScript(arrParas){
        var sScript = '';

        if(arrParas.length !== 0) {
            switch (window.Asc.plugin.info.editorType) {
                case 'word': {
                    var lastParaIdx = arrParas.length - 1;
                    sScript += 'var oDocument = Api.GetDocument();';
                    sScript += '\nvar arrInsertResult = [];';
                    arrParas.forEach(function(item, i, arrParas) {
                        sScript += '\nvar oParagraph' + i + ' = Api.CreateParagraph();';
                        sScript += '\noParagraph' + i + '.AddText("' + item + '");';
                        sScript += '\narrInsertResult.push(oParagraph' + i + ');'
                    })
                    sScript += '\noDocument.InsertContent(arrInsertResult, true);';
                    sScript += '\nif (oParagraph0.GetPrevious() !== null) { oParagraph0.GetPrevious().private_GetImpl().Concat(oParagraph0.private_GetImpl()); oParagraph0.Delete(); }';
                    sScript += '\nif (oParagraph' + String(lastParaIdx) + '.GetNext() !== null) { oParagraph' + String(lastParaIdx) + '.private_GetImpl().Concat(oParagraph' + String(lastParaIdx) + '.GetNext().private_GetImpl()); oParagraph' + String(lastParaIdx) + '.GetNext().Delete(); }';

                    //sScript += '\noDocument.Document.Remove(-1, true, false, false, false);';

                    //sScript += '\noParagraph0.MoveCursorToStartPos();';
                    //sScript += '\noParagraph0.Paragraph.ConcatBefore(oDocument.GetElement(0).Paragraph);';
                    //sScript += '\noDocument.Document.Recalculate();';
                    //sScript += '\noDocument.Document.Remove(-1, true, false, false, false);';
                    break;
                }
                case 'slide':{
                    sScript += 'var oPresentation = Api.GetPresentation();';

                    sScript += '\nvar oSlide = oPresentation.GetCurrentSlide()';
                    sScript += '\nif(oSlide){';
                    sScript += '\nvar fSlideWidth = oSlide.GetWidth(), fSlideHeight = oSlide.GetHeight();';
                    var sSrc = oElement.Src;
                    var nEmuWidth = ((w / 96) * 914400) >> 0;
                    var nEmuHeight = ((h / 96) * 914400) >> 0;
                    sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                    sScript += '\n oImage.SetPosition((fSlideWidth -' + nEmuWidth +  ')/2, (fSlideHeight -' + nEmuHeight +  ')/2);';
                    sScript += '\n oSlide.AddObject(oImage);';
                    sScript += '\n}'
                    break;
                }
                case 'cell':{
                    sScript += '\nvar oWorksheet = Api.GetActiveSheet();';
                    sScript += '\nif(oWorksheet){';
                    sScript += '\nvar oActiveCell = oWorksheet.GetActiveCell();';
                    sScript += '\nvar nCol = oActiveCell.GetCol(), nRow = oActiveCell.GetRow();';
                    var sSrc = oElement.Src;
                    var nEmuWidth = ((w / 96) * 914400) >> 0;
                    var nEmuHeight = ((h / 96) * 914400) >> 0;
                    sScript += '\n oImage = oWorksheet.AddImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ', nCol, 0, nRow, 0);';
                    sScript += '\n}';
                    break;
                }
            }
        }
        return sScript;
    };

    window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

})(window, undefined);
