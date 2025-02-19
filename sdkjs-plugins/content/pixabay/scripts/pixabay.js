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

let  Ps1, Ps2;

(function(window) {

	const displayNoneClass = "display-none";
	const borderColor = '#cbcbcb';
	const OOKey = '52-50-56-53-54-54-48-53-45-50-55-48-50-102-49-49-52-49-97-52-50-101-55-101-50-54-98-48-100-48-53-49-53-98';

	function showLoader(show) {
		switchClass(elements.loader, displayNoneClass, !show);
	};

	function switchClass(el, className, add) {
		if (add) {
			el.classList.add(className);
		} else {
			el.classList.remove(className);
		}
	};

	function SetSavedSettings() {
		const allInputs = $('.rule-checkbox');

		const saved_apikey = localStorage.getItem($(elements.api_input).attr('data-id'));
		if (saved_apikey && saved_apikey !== '') {
			elements.api_input.value = saved_apikey;
			$('#save').trigger('click');
		}

		const savedQuery = localStorage.getItem($(elements.search_phrase).attr('data-id'));
		if (savedQuery) {
			sLastQuery = savedQuery;
			elements.search_phrase.value = sLastQuery;
		}

		const locale_saved = localStorage.getItem('pixabay-locale');
		if (locale_saved !== null) {
			$('#pixabay-locale').val(locale_saved);
			$('#pixabay-locale').trigger('change');
		}

		const category_saved = localStorage.getItem('pixabay-category');
		if (category_saved !== null) {
			$('#pixabay-category').val(category_saved);
			$('#pixabay-category').trigger('change');
		}

		$(allInputs).each(function() {
			const savedValue = localStorage.getItem($(this).attr("data-id"));
			if (savedValue !== null)
				if (savedValue === true.toString())
					$(this).prop("checked", true);
				else
					$(this).prop("checked", false);
		});
	};

	window.oncontextmenu = function(e) {
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

	let sLastQuery = 'flower',
		sEmptyQuery = 'summer',
		elements = {},
		nLastPage = 1,
		nLastPageCount = 1;
	const nImageWidth = 200;

	function createScript(oElement, w, h) {
		let sScript = '';

		// set a common size for each image if their size is bigger the 300px (saving proportions)
		if (w > 300 || h > 300) {
			const coef = w / h;
			if (coef > 1) {
				w = 300;
				h = w / coef;
			} else {
				h = 300;
				w = h * coef;
			}
		}

		if (oElement) {
			switch (window.Asc.plugin.info.editorType) {
				case 'word': {
					sScript += 'var oDocument = Api.GetDocument();';
					sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';
					sScript += '\noParagraph = Api.CreateParagraph();';
					sScript += '\narrInsertResult.push(oParagraph);';
					const nEmuWidth = ( ( w / 96 ) * 914400 ) >> 0;
					const nEmuHeight = ( ( h / 96 ) * 914400 ) >> 0;
					sScript += '\n oImage = Api.CreateImage(\'' + oElement.Src + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
					sScript += '\noParagraph.AddDrawing(oImage);';
					sScript += '\noDocument.InsertContent(arrInsertResult);';
					break;
				}
				case 'slide':{
					sScript += 'var oPresentation = Api.GetPresentation();';
					sScript += '\nvar oSlide = oPresentation.GetCurrentSlide()';
					sScript += '\nif (oSlide) {';
					sScript += '\nvar fSlideWidth = oSlide.GetWidth(), fSlideHeight = oSlide.GetHeight();';
					const nEmuWidth = ( ( w / 96 ) * 914400 ) >> 0;
					const nEmuHeight = ( ( h / 96 ) * 914400 ) >> 0;
					sScript += '\n var oImage = Api.CreateImage(\'' + oElement.Src + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
					sScript += '\n oImage.SetPosition((fSlideWidth -' + nEmuWidth +  ')/2, (fSlideHeight -' + nEmuHeight +  ')/2);';
					sScript += '\n oSlide.AddObject(oImage);';
					sScript += '\n}'
					break;
				}
				case 'cell':{
					sScript += '\nvar oWorksheet = Api.GetActiveSheet();';
					sScript += '\nif (oWorksheet) {';
					sScript += '\nvar oActiveCell = oWorksheet.GetActiveCell();';
					sScript += '\nvar nCol = oActiveCell.GetCol(), nRow = oActiveCell.GetRow();';
					const nEmuWidth = ( ( w / 96 ) * 914400 ) >> 0;
					const nEmuHeight = ( ( h / 96 ) * 914400 ) >> 0;
					sScript += '\n oWorksheet.AddImage(\'' + oElement.Src + '\', ' + nEmuWidth + ', ' + nEmuHeight + ', nCol, 0, nRow, 0);';
					sScript += '\n}';
					break;
				}
			}
		}
		return sScript;
	};

	function updateNavigation() {
		if (arguments.length == 2) {
			nLastPage = arguments[0];
			nLastPageCount = arguments[1];
		}

		// if (nLastPage <= nLastPageCount)
		let nUsePage = nLastPage - 1;
		let oPagesCell =  $('#pages-cell-id');
		oPagesCell.empty();
		let nW = $('#pagination-table-container-id').width() - $('#pagination-table-id').width();
		let nMaxCountPages = ( nW / 22 ) >> 0;

		if (nLastPageCount === 0) {
			$('#pagination-table-id').hide();
			return;
		} else {
			$('#pagination-table-id').show();
		}

		let nStart, nEnd;

		if (nLastPageCount <= nMaxCountPages) {
			nStart = 0;
			nEnd = nLastPageCount;
		} else if (nUsePage < nMaxCountPages) {
			nStart = 0;
			nEnd = nMaxCountPages;
		} else if ((nLastPageCount -  nUsePage) <= nMaxCountPages) {
			nStart = nLastPageCount -  nMaxCountPages;
			nEnd = nLastPageCount;
		} else {
			nStart = nUsePage - ((nMaxCountPages/2)>>0);
			nEnd = nUsePage + ((nMaxCountPages/2)>>0);
		}
		for (let i = nStart;  i< nEnd; ++i) {
			let oButtonElement = $('<div class="pagination-button-div noselect" style="width:22px; height:22px;"><p>' + (i + 1) +'</p></div>');
			oPagesCell.append(oButtonElement);
			oButtonElement.attr('data-index', i + '');
			if (i === nUsePage)
				oButtonElement.addClass('pagination-button-div-selected');

			oButtonElement.click(function(e) {
				$(this).addClass('pagination-button-div-selected');
				loadClipArtPage(parseInt($(this).attr('data-index')) + 1, sLastQuery);
			});
		}
	};

	function fillTableFromResponse(imgsInfo) {
		let oContainer = $('#preview-images-container-id');
		oContainer.empty();

		for (let i = 0; i < imgsInfo.length; ++i) {
			let oDivElement = $('<div></div>', {
				class: 'noselect'
			});
			oDivElement.css('display', 'flex');
			oDivElement.css('width', nImageWidth + 'px');
			oDivElement.css('height', nImageWidth + 'px');
			oDivElement.css('justify-content','center');
			oDivElement.css('align-items','center');
			oDivElement.css('margin', '0px 10px 10px 10px');
			oDivElement.css('border', '1px solid ' + borderColor);

			let oImageTh = {
				width : imgsInfo[i]["Width"],
				height : imgsInfo[i]["Height"]
			};
			let nMaxSize = Math.max(oImageTh.width, oImageTh.height);
			let fCoeff = nImageWidth / nMaxSize;
			let oImgElement = $('<img>');
			let nWidth = (oImageTh.width * fCoeff) >> 0;
			let nHeight = (oImageTh.height * fCoeff) >> 0;
			if (nWidth === 0 || nHeight === 0) {
				oImgElement.on('load', function(event) {
					let nMaxSize = Math.max(this.naturalWidth, this.naturalHeight);
					let fCoeff = nImageWidth / nMaxSize;
					let nWidth = (this.naturalWidth * fCoeff) >> 0;
					let nHeight = (this.naturalHeight * fCoeff) >> 0;
					$(this).css('width', nWidth + 'px');
					$(this).css('height', nHeight + 'px');
					$(this).css('margin-left', (((nImageWidth - nWidth)/2) >> 0) + 'px');
				});
			}
			oImgElement.css('width', nWidth + 'px');
			oImgElement.css('height', nHeight + 'px');
			oImgElement.css('margin-left', ( ( ( nImageWidth - nWidth ) / 2 ) >> 0) + 'px');
			oImgElement.attr('src',  imgsInfo[i].Src);
			oImgElement.attr('data-index', i + '');
			oImgElement.on('dragstart', function(event) { event.preventDefault(); });
			oImgElement.mouseenter(function(e) {
				$(this).css('opacity', '0.65');	
			});
			oImgElement.mouseleave(function(e) {
				$(this).css('opacity', '1');
			});
			oImgElement.click(function(e) {
				this.style.pointerEvents = "none";
				addImg(this);
			});

			function addImg(img) {
				window.Asc.plugin.info.recalculate = true;
				let oElement = imgsInfo[parseInt(img.dataset.index)];
				window.Asc.plugin.executeCommand("command", createScript(oElement, img.naturalWidth, img.naturalHeight), function() {
					img.style.pointerEvents = "auto";
				});
			};

			oDivElement.append(oImgElement);
			oContainer.append(oDivElement);
		}
		updateScroll();
		showLoader(false);
	};

	function updateScroll() {
		Ps1.update();
		Ps2.update();
	};

	window.Asc.plugin.init = function() {
		elements = {
			loader: document.getElementById("loader-container"),
			locale: document.getElementById("pixabay-locale"),
			search_phrase: document.getElementById("search-phrase"),
			category: document.getElementById("pixabay-category"),
			img_type_all: document.getElementById("type-all"),
			img_type_photo: document.getElementById("type-photo"),
			img_type_illustration: document.getElementById("type-illustration"),
			img_type_vector: document.getElementById("type-vector"),
			orient_vert: document.getElementById("type-vertical"),
			orient_hor: document.getElementById("type-horizontal"),
			contentHolder: document.getElementById("main-container-id"),
			api: document.getElementById("api"),
			api_input: document.getElementById("api-value"),
			re_api: document.getElementById("re-api"),
		};
		SetSavedSettings();
		Ps1 = new PerfectScrollbar('#scrollable-container-id', {});
		Ps2 = new PerfectScrollbar('#main-container-id', {});
		
		$(window).resize(function() {
			updateScroll();
			updateNavigation();
		});
	
		$('input').keydown(function(e) {
			if (e.keyCode === 13)
				$('#button-search-id').trigger('click');
		});
	
		$('#button-search-id').click(function() {
			sLastQuery = elements.search_phrase.value.trim();
			if (sLastQuery === '') {
				sLastQuery = sEmptyQuery;
				elements.search_phrase.value = sLastQuery;
			}
			loadClipArtPage(1, sLastQuery);
		});
	
		$('.input_container').click(function() {
			localStorage.setItem($(this).find('.rule-checkbox').attr('data-id'), $(this).prop('checked'));
		});

		$('.select_example').change(function() {
			localStorage.setItem($(this).attr('data-id'), $(this).val());
		});

		$('#navigation-first-page-id').click(function(e) {
			if (nLastPage > 1)
				loadClipArtPage(1, sLastQuery);
		});

		$('#navigation-prev-page-id').click(function(e) {
			if (nLastPage > 1)
				loadClipArtPage(Number(nLastPage) - 1, sLastQuery);
		});

		$('#navigation-next-page-id').click(function(e) {
			if (nLastPage < nLastPageCount)
				loadClipArtPage(Number(nLastPage) + 1, sLastQuery);
		});

		$('#navigation-last-page-id').click(function(e) {
			if (nLastPage < nLastPageCount)
				loadClipArtPage(Number(nLastPageCount), sLastQuery);
		});

		$(".hidden").click(function() {
			$(this).hide();
			$("#hide_show_reconf").find(".opened").show();
			if ($('#preview-images-container-id')[0].children.length !== 0)
				$('#first-separator').show();

			$(document).find("#settings").slideToggle("fast", function() { updateScroll(); });
		});

		$(".opened").click(function() {
			$(this).hide();
			$("#hide_show_reconf").find(".hidden").show();
			$('#first-separator').hide();
			$(document).find("#settings").slideToggle("fast", function() { updateScroll(); });
		});

		$('#save').on('click', function() {
			const apikey = elements.api_input.value.trim();
			if (true || apikey !== '') {
				loadClipArtPage(1, sLastQuery);
			} else {
				$('#preview-images-container-id').empty();

				if (!$('#api-value').hasClass('error_api'))
					$('#api-value').toggleClass('error_api');

				if (!$('#api-value').hasClass('api_empty'))
					$('#api-value').toggleClass('api_empty');

				if ($('#empty-key'))
					$('#empty-key').remove();

				$('<div>', {
					id : "empty-key",
					"class": "error_color",
					text: window.Asc.plugin.tr("API key is empty!")
				}).appendTo('#preview-images-container-id');
				updateScroll();
			}
		});

		$(elements.api_input).focus(function() {
			if (this.value !== this.defaultValue)
				this.select();
		});

		$('#reconf').on('click', function() {
			showLoader(false);
			saved_key = localStorage.getItem($('#api-value').attr('data-id'));
			localStorage.removeItem	($('#api-value').attr('data-id'));
			if (saved_key !== null)
				elements.api_input.value = saved_key;

			if ($('#api-value').hasClass('error_api'))
					$('#api-value').toggleClass('error_api');

			$('#api').show();
			$('#main-search-container-id').hide();
			$('#preview-images-container-id').empty();
			$('#pagination-container-id').hide();
			$(elements.api_input).focus();
		});

		updateScroll();
		if (true || elements.api_input.value.trim() !== '')
			loadClipArtPage(1, sLastQuery);
	};

	window.Asc.plugin.onThemeChanged = function(theme) {
		window.Asc.plugin.onThemeChangedBase(theme);
		$('#body').css('color', window.Asc.plugin.theme.Color);
		$('.hidden, .opened, #reconf').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme.Color);
	};

	function loadClipArtPage(nIndex, sQuery) {
		showLoader(true);
		const sRequest = CreateRequest(nIndex, sQuery);
		$.ajax({
			method: 'GET',
			url: 'https://pixabay.com/api/?' + sRequest,
			dataType: 'json'
		}).done(function(oResponse) {
			$('#api').hide();
			$('#main-search-container-id').show();
			$('#scrollable-container-id').show();
			$('#pagination-container-id').show();
			localStorage.setItem($(elements.api_input).attr('data-id'), elements.api_input.value.trim());
			localStorage.setItem($(elements.search_phrase).attr('data-id'), elements.search_phrase.value);

			if ($('#api-value').hasClass('error_api'))
				$('#api-value').toggleClass('error_api');

			if ($('#api-value').hasClass('api_empty'))
				$('#api-value').toggleClass('api_empty');

			container = document.getElementById('scrollable-container-id');
			container.scrollTop = 0;
			updateScroll();
			updateNavigation( nIndex, Math.ceil(oResponse.totalHits / 20) );

			let imgCount = oResponse.hits.length;
			let imgsInfo = [];

			function loadImgs(sUrl) {
				let img = new Image();
				img.onload = function() {
					let imgInfo = {
						"Width": this.width,
						"Height": this.height,
						"Src": this.src,
						"HTML": this.outerHTML
					};

					imgsInfo.push(imgInfo);

					if (imgsInfo.length === imgCount && imgsInfo.length !== 0) {
						fillTableFromResponse(imgsInfo);
						$('#first-separator').show();
					}
				};

				img.onerror = function() {
					imgCount--;
				};

				img.src = sUrl;
			};

			if (oResponse.hits.length == 0) {
				showLoader(false);
				$('#preview-images-container-id').empty();
				$('<div>', {
					"class": "no-results i18n",
					text: window.Asc.plugin.tr("No results.")
				}).appendTo('#preview-images-container-id');
				updateScroll();
				return;
			}
			for (let nUrl = 0; nUrl < oResponse.hits.length; nUrl++) {
				//loadImgs(oResponse.items[nUrl].pngurl[oResponse.items[0].pngurl.length - 1]);
				loadImgs(oResponse.hits[nUrl].largeImageURL);
			}
		}).fail(function(oError) {
			$('#reconf').trigger('click');
			showLoader(false);
			container = document.getElementById('scrollable-container-id');
			container.scrollTop = 0;
			updateScroll();
			updateNavigation(0, 0);
			$('#preview-images-container-id').empty();
			if (true || elements.api_input.value.trim() !== '') {
				if (!$('#api-value').hasClass('error_api'))
					$('#api-value').toggleClass('error_api');

				if (!$('#api-value').hasClass('api_empty'))
					$('#api-value').toggleClass('api_empty');

				$('#preview-images-container-id').empty();

				if ($('#empty-key'))
					$('#empty-key').remove();

				$('<div>', {
					id : 'empty-key',
					"class": "error_color",
					text: window.Asc.plugin.tr("Invalid API key!")
				}).appendTo('#preview-images-container-id');
				
				updateScroll();
			}
		});
	};

	function getKey() {
		let arr = OOKey.split('-');
		let result = '';
		arr.forEach(function(el) {
			result += String.fromCharCode(el);
		});
		return result;
	};

	function CreateRequest(nPageIndex, sQuery) {
		let sRequest = 'key=';
		let apikey = elements.api_input.value.trim();
		if (!apikey) apikey = getKey();
		let lang = elements.locale.value;
		let category = elements.category.value;
		let search_phrase = elements.search_phrase.value.replace(/ /gi, "+") || sQuery.replace(/ /gi, "+");
		let image_types = [];
		if (elements.img_type_all.checked) {
			image_types.push('all');
		} else {
			if (elements.img_type_photo.checked)
				image_types.push('photo');

			if (elements.img_type_illustration.checked)
				image_types.push('illustration');

			if (elements.img_type_vector.checked)
				image_types.push('vector');
		}

		let orientations = [];
		if (elements.orient_vert.checked)
			orientations.push('vertical');

		if (elements.orient_hor.checked)
			orientations.push('horizontal');

		sRequest += apikey + '&lang=' + lang + '&q=' + search_phrase + '&category=' + category + '&page=' + nPageIndex;
		
		for (let nImgType = 0; nImgType < image_types.length; nImgType++)
			sRequest += '&image_type=' + image_types[nImgType];

		for (let nOrientType = 0; nOrientType < orientations.length; nOrientType++)
			sRequest += '&orientation=' + orientations[nOrientType];

		return sRequest;
	};
	
	window.Asc.plugin.button = function() {
		this.executeCommand("close", '');
	};

	window.Asc.plugin.onTranslate = function() {
		sLastQuery = window.Asc.plugin.tr(sLastQuery);
		sEmptyQuery = window.Asc.plugin.tr(sEmptyQuery);

		let elementsTr = document.getElementsByClassName("i18n");
		for (let i = 0; i < elementsTr.length; i++) {
			let el = elementsTr[i];
			if (el.attributes["placeholder"]) el.attributes["placeholder"].value = window.Asc.plugin.tr(el.attributes["placeholder"].value);
			if (el.innerText) el.innerText = window.Asc.plugin.tr(el.innerText);
		}
		
		$('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '100%'
		});
	};

})(window);