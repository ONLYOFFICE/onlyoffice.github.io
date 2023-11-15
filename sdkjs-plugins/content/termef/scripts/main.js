/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function(window, undefined){
	var oElements, oPs, sText;
	var aPropsToPaste = [];
	var sSplitText = " > ";

	window.Asc.plugin.init = function(text)
	{
		window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n', TabSymbol: String.fromCharCode(160)}], function(data) {
			text = (data === undefined) ? "" : data.replace(/\n/g, ' ');
			if (text.trim() !== "" && $('#props').hasClass('display-none') == true) {
				sText = text.trim();

				$('#info').hide();
				$('#mainContainer').show();
				$('input').val(sText);
				$('#results').empty();
				GetDefinitions(sText);
			}
		});

		
	};

	$(document).ready(function () {
		oElements = {
			loader:        document.getElementById("loader-container"),
			contentHolder: document.getElementById("mainContainer")
		}

		oPs = new PerfectScrollbar("#scrollable", {suppressScrollX: true});

		$("#search-fld").on('keyup', function (e) {
			sText = $('input').val();
			if ((e.key === 'Enter' || e.keyCode === 13) && sText.trim() !== "") {
				if (false == $("#button_wrapper").hasClass('display-none'))
					$('#button_wrapper').toggleClass("display-none");
				if (false == $("#props").hasClass('display-none'))
					$("#props").toggleClass('display-none');
				if (true == $("#scrollable").hasClass('scrollable-props'))
					$("#scrollable").toggleClass('scrollable-props');

				$("#results").show();
				$('#results').empty();
				updateScroll();
				GetDefinitions($('input').val());
			}
		});
		$("#insert").on('click', function() {
			var aFootnotesToAdd = [];
			$('.prop').each(function() {
				// check checked props
				if ($(this).find('.checkbox').is(':checked')) {
					var oPropLabel = $(this).find('.prop-label');
					var oFootnoteToAdd = {
						"label": oPropLabel.text()
					};
					// while prop hasn't group
					var oPropValue = $(this).find('.prop-value');
					if (oPropValue.length != 0)
						oFootnoteToAdd["value"] = $(this).find('.prop-value').text();

					// prop has group (ex. links)
					var oGroupWrap = $(this).find('.grp-wrap');
					if (oGroupWrap.length != 0) {
						oFootnoteToAdd["values"] = [];
						
						for (var nGrp = 0; nGrp < oGroupWrap.length; nGrp++) {
							var aGroupElms = [];
							var aChildElms = oGroupWrap[nGrp].childNodes; // child elements (ex link, separators)
							for (var nChld = 0; nChld < aChildElms.length; nChld++) {
								if ($(aChildElms[nChld]).hasClass('span-link')) {
									aGroupElms.push({
										url:  aChildElms[nChld].getAttribute('href'),
										text: aChildElms[nChld].textContent,
										type: 'link'
									});
								}
								else if ($(aChildElms[nChld]).hasClass('span-sep')) {
									aGroupElms.push({
										text: aChildElms[nChld].textContent,
										type: 'text'
									});
								}
							}
							oFootnoteToAdd["values"].push(aGroupElms);
						}
					}
					aFootnotesToAdd.push(oFootnoteToAdd);
				}
			});
			if (aFootnotesToAdd.length != 0)
				AddFootnotes(aFootnotesToAdd);
		});
		$("#back").on('click', function() {
			if (false == $("#button_wrapper").hasClass('display-none'))
				$('#button_wrapper').toggleClass("display-none");
			if (false == $("#props").hasClass('display-none'))
				$("#props").toggleClass('display-none');
			if (true == $("#scrollable").hasClass('scrollable-props'))
				$("#scrollable").toggleClass('scrollable-props');
				
			$("#results").show();
			updateScroll();
		});
	})

	$(document).on('copy', function(e) {
		if (e.target === document.getElementById('search-fld') || e.target === document.getElementById('main-label'))
			return;
		
		aPropsToPaste = [];
		if (window.getSelection && false == $("#props").hasClass('display-none')) {
			var sSelectedText = window.getSelection().toString();
			var sSelectedHTML = prepareHtmlToPaste(getSelectionHtml());
			
			sSelectedHTML += "<p><strong>Source:</strong> " + sText +" - <a href=\"https://terminologie.finances.gouv.fr/\">https://terminologie.finances.gouv.fr/</a></p>";

			e.originalEvent.clipboardData.setData('text/html', sSelectedHTML);
			e.originalEvent.clipboardData.setData('text/plain', sSelectedText);
			e.preventDefault();
		}
	})

	function getSelectionHtml() {
		var html = "";
		if (typeof window.getSelection != "undefined") {
			var sel = window.getSelection();
			if (sel.rangeCount) {
				var container = document.createElement("div");
				for (var i = 0, len = sel.rangeCount; i < len; ++i) {
					container.appendChild(sel.getRangeAt(i).cloneContents());
				}
				
				html = container.innerHTML;
			}
		} else if (typeof document.selection != "undefined") {
			if (document.selection.type == "Text") {
				html = document.selection.createRange().htmlText;
			}
		}
		return {
			container: container,
			html: container.innerHTML
		};
	}

	function prepareHtmlToPaste(oInfo) {
		var container = oInfo.container;
		
		var sHtmlToPaste = '';
		var aProps = container.getElementsByClassName('prop');
		var aChildNodes = container.childNodes;

		function preparePropsChilds(aChilds) {
			var sHtml = '';
			
			for (var nChild = 0; nChild < aChilds.length; nChild++) {
				// prop label
				if ($(aChilds[nChild]).hasClass('prop-head')) {
					var labelElm = aChilds[nChild].getElementsByClassName('prop-label')[0];
					if (labelElm)
						sHtml += '<span>' + labelElm.textContent + ': ' + '</span>';
				}
				// prop definition
				else if ($(aChilds[nChild]).hasClass('prop-value')) {
					sHtml += '"' + aChilds[nChild].textContent + '"';
				}
				// group elems
				else if ($(aChilds[nChild]).hasClass('grp-wrap')) {
					var aGroupElms = aChilds[nChild].childNodes;
					for (var nElm = 0; nElm < aGroupElms.length; nElm++) {
						if ($(aGroupElms[nElm]).hasClass('span-link')) {
							sHtml += '<a href="' + aGroupElms[nElm].getAttribute('href') +'">' + aGroupElms[nElm].textContent + '</a>';
						}
						if ($(aGroupElms[nElm]).hasClass('span-sep')) {
							sHtml += aGroupElms[nElm].textContent;
						}
					}
					sHtml += "<br>"
				}
				// link
				else if ($(aChilds[nChild]).hasClass('span-link')) {
					sHtml += '<a href="' + aChilds[nChild].getAttribute('href') + '">' + aChilds[nChild].textContent + '</a>';
				}
				else {
					sHtml += '<span>' + aChilds[nChild].textContent + '</span>';
				}
			}
			
			return sHtml;
		}

		if (aProps.length > 0) {
			for (var nProp = 0; nProp < aProps.length; nProp++) {
				sHtmlToPaste += '<p>';
				var aChildElms = aProps[nProp].childNodes;
				sHtmlToPaste += preparePropsChilds(aChildElms);
				sHtmlToPaste += '</p>';
			}
		}
		else {
			sHtmlToPaste += preparePropsChilds(aChildNodes);
		}

		return sHtmlToPaste;
	}

	function GetDefinitions(sText){
		showLoader(oElements, true);
		$.ajax({
			method: 'PUT',
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", 'application/json');
			},
			data: JSON.stringify({
				q: sText,
				lang: "FR",
				langDisplay: "FR",
				langs: "FR"
			}),
			url: 'https://terminologie.finances.gouv.fr/search'

		}).success(function (oResponse) {
			ParseResults(oResponse.items);
			showLoader(false);
		}).error(function(error) {
			console.log(error);
			showLoader(false);
		});
	}


	toUrlParams = function(obj) {
		var str = [];
		for (var p in obj)
		  if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		  }
		return str.join("&");
	}

	function ParseResults(aItems) {
		if (aItems.length === 0) {
			$('#results').empty();
			$('<div>', {
				id: "no_results",
				text: "Aucun résultat."
			}).appendTo('#results');
			updateScroll();
			return;
		}

		aItems.forEach(function(el, ind) {
			if (!el.fields["rdfs:label"] || !el.fields["rdfs:label"][0] || !el.fields["skos:definition"] || !el.fields["skos:definition"][0])
				return;

			var oResult = $('<div>', {
				"class": 'result_div',
				click: function () {
					var uri = $(this).data().uri;
					showLoader(oElements, true);

					$.ajax({
						method: 'GET',
						beforeSend: function(request) {
							request.setRequestHeader("Content-Type", 'application/json');
						},
						data: toUrlParams({
							appLang: "ru-RU",
							dataLang: "FR",
							restrictToVocab: false,
							uri: uri
						}),
						url: 'https://terminologie.finances.gouv.fr/topics?'
			
					}).success(function (oResponse) {
						$('#props-container').empty();
						$('#results').hide();
						ParseDefinitionProps(oResponse);
						
						if (true == $("#button_wrapper").hasClass('display-none'))
							$('#button_wrapper').toggleClass("display-none");
						if (true == $("#props").hasClass('display-none'))
							$('#props').toggleClass("display-none");
						if (false == $("#scrollable").hasClass('scrollable-props'))
							$("#scrollable").toggleClass('scrollable-props');
						
						showLoader(false);
						updateScroll();
					}).error(function(error) {
						console.log(error);
						showLoader(false);
					});

				}
			}).data({uri: el.uri});
			oResult.appendTo('#results');
			var oLabel = $('<label>', {
				"class": 'header',
				text: el.fields["rdfs:label"][0]
			});
			var oDescr = $('<span>', {
				"class": 'descr',
				text: el.fields["skos:definition"][0]
			});
			oLabel.appendTo(oResult);
			oDescr.appendTo(oResult);
		});

		updateScroll();
	}

	function ParseDefinitionProps(oResponse) {
		$('<label>', {
			id: "main-label",
			class: "header",
			text: oResponse.label
		}).appendTo('#props-container');

		oResponse.properties.forEach(function(el, ind) {
			if (el.propName === "notation" || el.propName === "concept associé" || el.propName === "URI")
				return;

			var oProp = $('<div>', {
				"class": 'prop'
			});
			oProp.appendTo('#props-container');

			var oPropHead = $('<div>', {
				"class": 'prop-head'
			});
			oPropHead.appendTo(oProp);

			var oCheckBox = $('<input>', {
				"class": 'form-control checkbox',
				"id": el.propName, 
				type: "checkbox"
			});
			oCheckBox.appendTo(oPropHead);

			var oLabel = $('<label>', {
				"class": 'header prop-label',
				text: el.propName,
				for: el.propName
			});
			oLabel.appendTo(oPropHead);

			if (el.isComplex) {
				el.propValues[0].propValues.forEach(function(elm, ind) {
					var oValue = $('<span>', {
						"class": 'prop-value',
						text: elm.display
					});
					oValue.appendTo(oProp);

				});
			}
			else {
				el.propValues.forEach(function(elm, ind) {
					if (elm.isAGroup == false) {
						var oValue = $('<span>', {
							"class": 'prop-value',
							text: elm.display
						});
						oValue.appendTo(oProp);
					}
					else {
						var oGroupWrap = $('<div>', {
							"class": 'grp-wrap'
						});
						oGroupWrap.appendTo(oProp);

						var nCount = elm.ancestors.length;
						elm.ancestors.forEach(function(item, ind) {
							var oAncestor = $('<span>', {
								"class": 'span-link',
								text: item.display,
								href: "https://terminologie.finances.gouv.fr/index#Group:uri=" + item.uri + ";tab=props;",
								click: function () {
									window.open($(this).attr('href'))
								}
							});
							oAncestor.appendTo(oGroupWrap);

							if (ind != nCount - 1) {
								var oSep = $('<span>', {
									"class": 'span-sep',
									text: sSplitText,
								});
								oSep.appendTo(oGroupWrap);
							}
						});
					}
				});
			}
		});
	}
	function AddFootnotes(aFootnotesToAdd) {
		window.Asc.scope.arr = aFootnotesToAdd;
		window.Asc.scope.word = sText;

		window.Asc.plugin.callCommand(function() {
			var oPara, oRun, oHyperlink, oChild;
			var aContent = [];
			var oDocument = Api.GetDocument();

			for (var nProp = 0; nProp < Asc.scope.arr.length; nProp++) {
				if (Asc.scope.arr[nProp].value) {
					oPara = Api.CreateParagraph();
					oPara.AddText(Asc.scope.arr[nProp].label + ': ');
					oPara.AddText('"' + Asc.scope.arr[nProp].value + '"');
					aContent.push(oPara);
				}
				else if (Asc.scope.arr[nProp].values) {
					oPara = Api.CreateParagraph();
					oPara.AddText(Asc.scope.arr[nProp].label + ': ');
					aContent.push(oPara);
					for (var nPara = 0; nPara < Asc.scope.arr[nProp].values.length; nPara++) {
						oPara = Api.CreateParagraph();

						for (var nChild = 0; nChild < Asc.scope.arr[nProp].values[nPara].length; nChild++) {
							oChild = Asc.scope.arr[nProp].values[nPara][nChild];
							if (oChild.type === "link") {
								oHyperlink = Api.CreateHyperlink(oChild.url, oChild.text);
								oPara.Push(oHyperlink);
							}
							else if (oChild.type === "text") {
								oRun = Api.CreateRun();
								oRun.AddText(oChild.text);
								oPara.Push(oRun);
							}
						}
							
						aContent.push(oPara);
					}
				}
			}

			// add source
			oPara = Api.CreateParagraph();
			oPara.AddText('Source: ' + Asc.scope.word + ' -');
			oHyperlink = Api.CreateHyperlink('https://terminologie.finances.gouv.fr/', 'https://terminologie.finances.gouv.fr/');
			oPara.Push(oHyperlink);
			aContent.push(oPara);

			// footnote style
			var oStyle = oDocument.GetStyle('footnote text');

			// add footnote
			var oFootnoteContent = oDocument.AddFootnote();
			if (oFootnoteContent !== null) {
				// add element from first our paragraph to first paragraph in footnote content 
				var oFirstParaFootnote = oFootnoteContent.GetElement(0);
				var oFirstOurPara = aContent[0];
				var oChild;
				for (var nElm = 0, nCount = oFirstOurPara.GetElementsCount(); nElm < nCount; nElm++) {
					oFirstParaFootnote.Push(oFirstOurPara.GetElement(nElm));
				}

				// add the rest of the paragraphs as usual
				for (nElm = 1; nElm < aContent.length; nElm++) {
					aContent[nElm].SetStyle(oStyle);
					oFootnoteContent.Push(aContent[nElm]);
				}
			}
		});
	}


	function updateScroll()	{
		oPs && oPs.update();
	}
	function showLoader(show) {
		switchClass(oElements.contentHolder, "empty", show);
		switchClass(oElements.loader, "display-none", !show);
	}
	function switchClass(el, className, add) {
		if (add) {
			el.classList.add(className);
		} else {
			el.classList.remove(className);
		}
	}

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		var rule = '.arrow { border-color : ' + window.Asc.plugin.theme["text-normal"] + ';}\n'
		if (theme.type == 'dark') {
			rule += '.asc-plugin-loader .asc-loader-image { background-image : url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGNpcmNsZSBjeD0iMTQiIGN5PSIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgcj0iMTAuMjUiIHN0cm9rZS1kYXNoYXJyYXk9IjE2MCUsIDQwJSIgLz48L3N2Zz4=) !important;}\n';
		}
		else if (theme.type == 'light') {
			rule += '.asc-plugin-loader .asc-loader-image { background-image : url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9IjEuNSIgcj0iNy4yNSIgc3Ryb2tlLWRhc2hhcnJheT0iMTYwJSwgNDAlIiAvPjwvc3ZnPg==) !important;}\n';
		}
		rule += ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";

		var styleTheme = document.createElement('style');
		styleTheme.type = 'text/css';
		styleTheme.innerHTML = rule;
		document.getElementsByTagName('head')[0].appendChild(styleTheme);
		$('.asc-loader-title').css('color', window.Asc.plugin.theme["text-normal"]);

		// if (!isIE) {
		//     $('#clear').css('border-bottom', 'var(--scaled-one-pixel, 1px) dotted ' + window.Asc.plugin.theme["text-normal"]);
		//     $('#enter_container').css('background-color', window.Asc.plugin.theme["background-normal"]);
		//     $('.asc-loader-title').css('color', window.Asc.plugin.theme["text-normal"]);
		//     $('#show_manually, #hide_manually').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme["text-normal"]);
		//     $('#arrow-svg-path').css('fill', theme["text-normal"]);
		// }
		// else
		//     $('#enter_container').css('background-color', window.Asc.plugin.theme["RulerLight"]);
	};

	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.onresize = function()
	{
		updateScroll();
	};
	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};

})(window, undefined);
