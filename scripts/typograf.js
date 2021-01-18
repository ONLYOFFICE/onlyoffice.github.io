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

        $('#select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '120px'
		});

        txt = text;
    };

	$(document).ready(function () {
	    $('.prefs__rule').removeAttr('title');
        $('.prefs__rule-checkbox').wrap("<label></label>");
        $("#correct").find(".btn-text-default").click(function() {
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
            var allParsedParas = [];

            for (var nStr = 0; nStr < allParasInSelection.length; nStr++) {
                if (allParasInSelection[nStr].search(/	/) === 0) {
                    allParasInSelection[nStr] = allParasInSelection[nStr].replace(/	/, "");
                }
                var sSplited = allParasInSelection[nStr].split(/	/);

                sSplited.forEach(function(item, i, sSplited) {
                    allParsedParas.push(item);
                });
            }

            var allTypografedParas = [];

            for (var Item = 0; Item < allParsedParas.length; Item++) {
                typografedText = tp.execute(allParsedParas[Item]);
                allTypografedParas.push(typografedText);
            }

            Asc.scope.arr = allTypografedParas;
            window.Asc.plugin.info.recalculate = true;

            window.Asc.plugin.callCommand(function() {
                var AllParas = [];
                var oPara    = null;
                for (var nText = 0; nText < Asc.scope.arr.length; nText++) {
                    if (Asc.scope.arr[nText] === "")
                        continue;
                    oPara = Api.CreateParagraph();
                    oPara.AddText(Asc.scope.arr[nText]);
                    AllParas.push(oPara);
                }
                if (AllParas.length === 1)
                    Api.GetDocument().InsertContent(AllParas, true);
                else
                    Api.GetDocument().InsertContent(AllParas, true);
                    
            });
        });

        $(".hidden").click(function() {
            $(this).hide();
            $("#hide_show").find(".opened").show();
            $(document).find("#settings").slideToggle("fast");
        });
        $(".opened").click(function() {
            $(this).hide();
            $("#hide_show").find(".hidden").show();
            $(document).find("#settings").slideToggle("fast");
        });
        $(".header.button").click(function() {
            $(this).closest(".prefs__fieldset").toggleClass("prefs__fieldset_visible").find(".prefs__group-rules").slideToggle("fast");
            $(this).closest(".prefs__fieldset").find(".arrow").toggleClass("transform");
        });

        $(".prefs__all-rules").click(function() {
            var inputMain = $(this).find(".form-control");
            var allInputs = $(this).closest(".prefs__fieldset").find(".prefs__rule").find(".form-control");

            allInputs.prop("checked", $(inputMain).prop('checked'));
        });
    });

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
