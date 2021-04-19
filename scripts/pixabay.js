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

var  Ps;

(function(window, undefined) {

	var displayNoneClass = "display-none";
	var waitForLoad = false;

	function showLoader(elements, show) {
        switchClass(elements.loader, displayNoneClass, !show);
    }

	function switchClass(el, className, add) {
        if (add) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

    function SetSavedSettings() {
	    var allInputs = $('.rule-checkbox');

	    var saved_apikey = localStorage.getItem($(elements.api_input).attr('data-id'));
	    if (saved_apikey && saved_apikey !== '') {
            elements.api_input.value = saved_apikey;
            $('#save').trigger('click');
	    }

        var savedQuery = localStorage.getItem($(elements.search_phrase).attr('data-id'));
        if (savedQuery) {
            sLastQuery = savedQuery;
            elements.search_phrase.value = sLastQuery;
        }

        var locale_saved = localStorage.getItem('pixabay-locale');
        if (locale_saved !== null) {
            $('#pixabay-locale').val(locale_saved);
            $('#pixabay-locale').trigger('change');
        }
        var category_saved = localStorage.getItem('pixabay-category');
        if (category_saved !== null) {
            $('#pixabay-category').val(category_saved);
            $('#pixabay-category').trigger('change');
        }

	    $(allInputs).each(function() {
	        var savedValue = localStorage.getItem($(this).attr("data-id"));
	        if (savedValue !== null)
	            if (savedValue === true.toString())
                    $(this).prop("checked", true);
                else
                    $(this).prop("checked", false);
	    });
    };

    window.oncontextmenu = function(e)
    {
        if (e.preventDefault)
            e.preventDefault();
        if (e.stopPropagation)
            e.stopPropagation();
        return false;
    };

    var widthPix = 185;
    var sLastQuery = 'flower';
    var sEmptyQuery = 'summer';
    var elements = {};
    var nLastPage = 1, nLastPageCount = 1;
    var nImageWidth = 200;
    var nVertGap = 5;
    
    function createScript(oElement, w, h){
        var sScript = '';

        if(oElement) {
            switch (window.Asc.plugin.info.editorType) {
                case 'word': {
                    sScript += 'var oDocument = Api.GetDocument();';
                    sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';

                    sScript += '\noParagraph = Api.CreateParagraph();';
                    sScript += '\narrInsertResult.push(oParagraph);';
                    var sSrc = oElement.Src;
                    var nEmuWidth = ((w / 96) * 914400) >> 0;
                    var nEmuHeight = ((h / 96) * 914400) >> 0;
                    sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                    sScript += '\noParagraph.AddDrawing(oImage);';
                    sScript += '\noDocument.InsertContent(arrInsertResult);';
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
    }

    function updatePaddings(){
        var oContainer = $('#preview-images-container-id');
        var nFullWidth = $('#scrollable-container-id').width() - 24;
        var nCount = (nFullWidth/(nImageWidth + 2*nVertGap) + 0.01) >> 0;
        if(nCount < 1){
            nCount = 1;
        }
        var nGap = (((nFullWidth - nCount*nImageWidth)/(nCount))/2) >> 0;
        var aChildNodes = oContainer[0].childNodes;

        for (var i = 0; i < aChildNodes.length; ++i) {
            var oDivElement = aChildNodes[i];
                $(oDivElement).css('margin-left', nGap + 'px');
                $(oDivElement).css('margin-right', nGap + 'px');
        }
    };

    function updateNavigation() {
        if(arguments.length == 2){
            nLastPage = arguments[0];
            nLastPageCount = arguments[1];
        }

        if (nLastPage <= nLastPageCount)
        var nUsePage = nLastPage - 1;
        var oPagesCell =  $('#pages-cell-id');
        oPagesCell.empty();
        var nW = $('#pagination-table-container-id').width() - $('#pagination-table-id').width();
        var nMaxCountPages = (nW/22)>>0;

        if(nLastPageCount === 0)
        {
            $('#pagination-table-id').hide();
            return;
        }
        else
        {
            $('#pagination-table-id').show();
        }
        var nStart, nEnd;
        if(nLastPageCount <= nMaxCountPages){
            nStart = 0;
            nEnd = nLastPageCount;
        }
        else if(nUsePage < nMaxCountPages){
            nStart = 0;
            nEnd = nMaxCountPages;
        }
        else if((nLastPageCount -  nUsePage) <= nMaxCountPages){
            nStart = nLastPageCount -  nMaxCountPages;
            nEnd = nLastPageCount;
        }
        else {
            nStart = nUsePage - ((nMaxCountPages/2)>>0);
            nEnd = nUsePage + ((nMaxCountPages/2)>>0);
        }
        for(var i = nStart;  i< nEnd; ++i){
            var oButtonElement = $('<div class="pagination-button-div noselect" style="width:22px; height:22px;"><p>' + (i + 1) +'</p></div>');
            oPagesCell.append(oButtonElement);
            oButtonElement.attr('data-index', i + '');
            if(i === nUsePage){
                oButtonElement.addClass('pagination-button-div-selected');
            }
            oButtonElement.click(function (e) {
                $(this).addClass('pagination-button-div-selected');
                loadClipArtPage(parseInt($(this).attr('data-index')) + 1, sLastQuery);
            });
        }
    };

    function fillTableFromResponse(imgsInfo) {
        var oContainer = $('#preview-images-container-id');
        oContainer.empty();

        //calculate count images in string
        var nFullWidth = $('#scrollable-container-id').width() - 24;
        var nCount = (nFullWidth/(nImageWidth + 2*nVertGap) + 0.01) >> 0;
        if(nCount < 1){
            nCount = 1;
        }
        var nGap = 0;
        nGap = (((nFullWidth - nCount*nImageWidth)/(nCount))/2) >> 0;

        for (var i = 0; i < imgsInfo.length; ++i) {
            var oDivElement = $('<div></div>');
            oDivElement.css('display', 'inline-block');
            oDivElement.css('width', nImageWidth + 'px');
            oDivElement.css('height', nImageWidth + 'px');
            oDivElement.css('vertical-align','middle');
            $(oDivElement).addClass('noselect');
            oDivElement.css('margin-left', nGap + 'px');
            oDivElement.css('margin-right', nGap + 'px');
            oDivElement.css('margin-bottom', (nVertGap/2) + 'px');

            var oImageTh = {
                width : imgsInfo[i]["Width"],
                height : imgsInfo[i]["Height"]
            };
            var nMaxSize = Math.max(oImageTh.width, oImageTh.height);
            var fCoeff = nImageWidth/nMaxSize;
            var oImgElement = $('<img>');
            var nWidth = (oImageTh.width * fCoeff) >> 0;
            var nHeight = (oImageTh.height * fCoeff) >> 0;
            if (nWidth === 0 || nHeight === 0) {
                 oImgElement.on('load', function(event) {
                    var nMaxSize = Math.max(this.naturalWidth, this.naturalHeight);
                    var fCoeff = nImageWidth/nMaxSize;
                    var nWidth = (this.naturalWidth * fCoeff) >> 0;
                    var nHeight = (this.naturalHeight * fCoeff) >> 0;

                    $(this).css('width', nWidth + 'px');
                    $(this).css('height', nHeight + 'px');
                    $(this).css('margin-left', (((nImageWidth - nWidth)/2) >> 0) + 'px');
                    //$(this).css('margin-top', (((nImageWidth - nHeight)/2) >> 0) + 'px');
                 });
            }
            oImgElement.css('width', nWidth + 'px');
            oImgElement.css('height', nHeight + 'px');
            oImgElement.css('margin-left', (((nImageWidth - nWidth)/2) >> 0) + 'px');
            //oImgElement.css('margin-top', (((nImageWidth - nHeight)/2) >> 0) + 'px');
            oImgElement.attr('src',  imgsInfo[i].Src);
            oImgElement.attr('data-index', i + '');
            oImgElement.mouseover(
                function (e) {
                    $(this).css('opacity', '0.65');
                }
            );
            oImgElement.mouseleave(
                function (e) {
                    $(this).css('opacity', '1');
                }
            );

            function addImg(img) {
                window.Asc.plugin.info.recalculate = true;
                var oElement = imgsInfo[parseInt(img.dataset.index)];
                window.Asc.plugin.executeCommand("command", createScript(oElement, img.naturalWidth, img.naturalHeight), function() {
                    img.style.pointerEvents = "auto";
                });
            }
            oImgElement.click(
                function (e) {
                    var img = this;
                    img.style.pointerEvents = "none";
                    addImg(img);
                }
            );

            oImgElement.on('dragstart', function(event) { event.preventDefault(); });

            oDivElement.append(oImgElement);
            oContainer.append(oDivElement);
        }
        updateScroll();
        showLoader(elements, false);
    };

    function updateScroll(){
        Ps.update();
    };

    window.Asc.plugin.init = function () {
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

		var container = document.getElementsByClassName ('scrollable-container-id');
        Ps = new PerfectScrollbar('#scrollable-container-id', {});

        $( window ).resize(function(){
            updatePaddings();
            updateScroll();
            updateNavigation();
        });
        $('input').keydown(function(e) {
            if(e.keyCode === 13)
                $('#button-search-id').trigger('click');
        });
        $('#button-search-id').click(function() {
            sLastQuery = elements.search_phrase.value;
            if(sLastQuery === ''){
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

        $('#navigation-first-page-id').click(function(e){
            if(nLastPage > 1){
                loadClipArtPage(1, sLastQuery);
            }
        });
        $('#navigation-prev-page-id').click(function(e){
            if(nLastPage > 1){
                loadClipArtPage(Number(nLastPage) - 1, sLastQuery);
            }
        });
        $('#navigation-next-page-id').click(function(e){
            if(nLastPage < nLastPageCount){
                loadClipArtPage(Number(nLastPage) + 1, sLastQuery);
            }
        });
        $('#navigation-last-page-id').click(function(e){
            if(nLastPage < nLastPageCount){
                loadClipArtPage(Number(nLastPageCount), sLastQuery);
            }
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

        $('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '100%'
		});

        $('#save').on('click', function() {
            $('.select_example').select2({
                minimumResultsForSearch: Infinity,
                width: "100%"
		    });
		    apikey = elements.api_input.value.trim();
		    if (apikey !== '') {
                loadClipArtPage(1, sLastQuery);
            }
            else {
                if (!$('#api-value').hasClass('error_api'))
                    $('#api-value').toggleClass('error_api');
                $('#img_error').hide();
                $('#api_empty').show();
            }
        });

        $(elements.api_input).focus(function(){
            if(this.value !== this.defaultValue){
                this.select();
            }
        });
        $('#reconf').on('click', function() {
            saved_key = localStorage.getItem('deepL_Apikey');
            if (saved_key !== null) {
                elements.api_input.value = saved_key;

            }
            if ($('#api-value').hasClass('error_api')) {
                    $('#api-value').toggleClass('error_api');
                    $('#api_empty').hide();
                    $('#img_error').hide();
            }
            $('#api').show();
            $('#main-search-container-id').hide();
            $('#scrollable-container-id').hide();
            $('#pagination-container-id').hide();
            $(elements.api_input).focus();
        });

        updateScroll();
        if (elements.api_input.value.trim() !== '')
            loadClipArtPage(1, sLastQuery);
    };
    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        $('#body').css('color', window.Asc.plugin.theme.Color);
        $('.hidden, .opened, #reconf').css('border-bottom', '1px dashed ' + window.Asc.plugin.theme.Color);
    };

    function loadClipArtPage(nIndex, sQuery) {
        showLoader(elements, true);
        var sRequest = CreateRequest(nIndex, sQuery);
        $.ajax({
            method: 'GET',
            url: 'https://pixabay.com/api/?' + sRequest,
            dataType: 'json'
        }).success(function (oResponse) {
            $('#api').hide();
            $('#main-search-container-id').show();
            $('#scrollable-container-id').show();
            $('#pagination-container-id').show();
            localStorage.setItem($(elements.api_input).attr('data-id'), elements.api_input.value.trim());
            localStorage.setItem($(elements.search_phrase).attr('data-id'), elements.search_phrase.value);

            container = document.getElementById('scrollable-container-id');
            container.scrollTop = 0;
            Ps.update();
            updateNavigation(nIndex, Math.ceil(oResponse.totalHits/20) + 1);

            var imgCount = oResponse.hits.length;
            var imgsInfo = [];

            function loadImgs(sUrl)
            {
                var img = new Image();
                img.onload = function() {
                    var imgInfo = {
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
                }
                img.src = sUrl;
            }

            if (oResponse.hits.length == 0) {
                showLoader(elements, false);
                $('#preview-images-container-id').empty();
                $('<div>', {
                    "class": "no-results",
                    text: "No results."
                }).appendTo('#preview-images-container-id');
                return;
            }
            for (var nUrl = 0; nUrl < oResponse.hits.length; nUrl++) {
                //loadImgs(oResponse.items[nUrl].pngurl[oResponse.items[0].pngurl.length - 1]);
                loadImgs(oResponse.hits[nUrl].largeImageURL);
            }
        }).error(function(oError) {
            showLoader(elements, false);
            container = document.getElementById('scrollable-container-id');
            container.scrollTop = 0;
            Ps.update();
            updateNavigation(0, 0);
            var oContainer = $('#preview-images-container-id');
            oContainer.empty();
            if (elements.api_input.value.trim() === '') {
                if (!$('#api-value').hasClass('error_api'))
                    $('#api-value').toggleClass('error_api');
                $('#img_error').hide();
                $('#api_empty').show();
            }
            else {
                if (!$('#api-value').hasClass('error_api'))
                    $('#api-value').toggleClass('error_api');
                $('#img_error').show();
                $('#api_empty').hide();
            }
        });
    };

    function CreateRequest(nPageIndex, sQuery) {
        var sRequest = 'key=';

		var apikey = elements.api_input.value.trim();
		var lang = elements.locale.value;
		var category = elements.category.value;
		var search_phrase = elements.search_phrase.value.replace(/ /gi, "+") || sQuery.replace(/ /gi, "+");
		var image_types = [];
		if (elements.img_type_all.checked)
		    image_types.push('all');
		else {
		    if (elements.img_type_photo.checked)
                image_types.push('photo');
            if (elements.img_type_illustration.checked)
                image_types.push('illustration');
            if (elements.img_type_vector.checked)
                image_types.push('vector');
		}

		var orientations = [];
		if (elements.orient_vert.checked)
		    orientations.push('vertical');
		if (elements.orient_hor.checked)
		    orientations.push('horizontal');

        sRequest += apikey + '&lang=' + lang + '&q=' + search_phrase + '&category=' + category + '&page=' + nPageIndex;
        for (var nImgType = 0; nImgType < image_types.length; nImgType++) {
            sRequest += '&image_type=' + image_types[nImgType];
        }
        for (var nOrientType = 0; nOrientType < orientations.length; nOrientType++) {
            sRequest += '&orientation=' + orientations[nOrientType];
        }

        return sRequest;
    };
    window.Asc.plugin.button = function (id) {
            this.executeCommand("close", '');
    };

    window.Asc.plugin.onExternalMouseUp = function()
    {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);

        document.dispatchEvent(evt);
        $('.select_example').select2({
			minimumResultsForSearch: Infinity,
			width : '100%'
		});
    };
})(window);