var Ps;

(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };

    var sText = '';
	window.Asc.plugin.init = function (text) {
        sText = text;
    };

    function SetSavedSettings() {
        var inputsMain = $(".prefs__all-rules").find(".form-control");
	    var allInputs = $(inputsMain).closest(".prefs__fieldset").find(".prefs__rule").find(".form-control");

        var locale_saved = localStorage.getItem('locale_typograf');
        if (locale_saved !== null) {
            $('#select_example').val(locale_saved);
            $('#select_example').trigger('change');
        }

	    $(inputsMain).each(function() {
	        var savedValue = localStorage.getItem($(this).attr("data-id"));
	        if (savedValue !== null)
	            if (savedValue === true.toString())
                    $(this).prop("checked", true);
                else
                    $(this).prop("checked", false);
	    });
	    $(allInputs).each(function() {
	        var savedValue = localStorage.getItem($(this).attr("data-id"));
	        if (savedValue !== null)
	            if (savedValue === true.toString())
                    $(this).prop("checked", true);
                else
                    $(this).prop("checked", false);
	    });
    };

	$(document).ready(function () {
	     $('#select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '120px',
		});
        SetSavedSettings();

        var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
        if (locale === 'ru') {
            if ($('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
        }
        else {
            if (!$('.locale-ru').hasClass('display-none')) {
                $('.locale-ru').toggleClass('display-none');
            }
        }

		Ps = new PerfectScrollbar("#settings", {suppressScrollX: true});

	    $('.prefs__rule').removeAttr('title');
        $('.prefs__rule-checkbox').wrap("<label></label>");

        $("#correct").find(".btn-text-default").click(function() {
            CorrectText(sText);
        });

        $(".hidden").click(function() {
            $(this).hide();
            $("#hide_show").find(".opened").show();
            $(document).find("#settings").slideToggle("fast", function() { updateScroll(); });
        });
        $(".opened").click(function() {
            $(this).hide();
            $("#hide_show").find(".hidden").show();
            $(document).find("#settings").slideToggle("fast", function() { updateScroll(); });
        });
        $(".button").click(function() {
            $(this).closest(".prefs__fieldset").toggleClass("prefs__fieldset_visible").find(".prefs__group-rules").slideToggle("fast", function() { updateScroll(); });
            $(this).closest(".prefs__fieldset").find(".arrow").toggleClass("transform");

        });

        $(".prefs__all-rules").click(function() {
            var inputMain = $(this).find(".form-control");
            var allInputs = $(this).closest(".prefs__fieldset").find(".prefs__rule").find(".form-control");

            allInputs.prop("checked", $(inputMain).prop('checked'));

            localStorage.setItem($(inputMain).attr("data-id"), $(inputMain).prop('checked'));
            allInputs.each(function() {
                localStorage.setItem($(this).attr("data-id"), $(this).prop('checked'));
            });
        });

        $(".prefs__all-rules").closest(".prefs__fieldset").find(".prefs__rule").find(".form-control").click(function() {
            localStorage.setItem($(this).attr("data-id"), $(this).prop('checked'));
        });
        $("#select_example").change(function() {
            localStorage.setItem('locale_typograf', $(this).val());
            var locale = document.getElementsByClassName("prefs__set-locale")[0].value;
            if (locale === 'ru') {
                if ($('.locale-ru').hasClass('display-none')) {
                    $('.locale-ru').toggleClass('display-none');
                }
            }
            else {
                if (!$('.locale-ru').hasClass('display-none')) {
                    $('.locale-ru').toggleClass('display-none');
                }
            }
        });
    });

    function CorrectText(sText) {
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

        var allParasInSelection = sText.split(/\n/);

        var allParsedParas = [];

        for (var nStr = 0; nStr < allParasInSelection.length; nStr++) {
            if (allParasInSelection[nStr].search(/	/) === 0) {
                allParsedParas.push("");
                allParasInSelection[nStr] = allParasInSelection[nStr].replace(/	/, "");
            }
            var sSplited = allParasInSelection[nStr].split(/	/);

            sSplited.forEach(function(item, i, sSplited) {
                allParsedParas.push(removeCR(item));
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
            Api.ReplaceTextSmart(Asc.scope.arr);
        });
    }

    function removeCR(text) {
        return text.replace(/\r\n?/g, '');
    };

    function updateScroll()
	{
		Ps && Ps.update();
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
