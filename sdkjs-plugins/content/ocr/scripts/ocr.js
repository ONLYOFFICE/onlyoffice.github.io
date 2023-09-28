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

	var oLangMap = {};    
    oLangMap['eng'] = "English";
    oLangMap['chi_sim'] = "Chinese";
    oLangMap['rus'] = "Russian";
    oLangMap['meme'] = "Meme";
    oLangMap['tha'] = "Thai";
    oLangMap['deu'] = "German";
    oLangMap['jpn'] = "Japanese";
    oLangMap['spa'] = "Spanish";
    oLangMap['fra'] = "French";
    oLangMap['por'] = "Portuguese";
    oLangMap['ita'] = "Italian";
    oLangMap['pol'] = "Polish";
    oLangMap['tur'] = "Turkish";
    oLangMap['nld'] = "Dutch";
    oLangMap['ara'] = "Arabic";
    oLangMap['ces'] = "Czech";
    oLangMap['kor'] = "Korean";
    oLangMap['swe'] = "Swedish";
    oLangMap['vie'] = "Vietnamese";
    oLangMap['ron'] = "Romanian";
    oLangMap['ell'] = "Greek";
    oLangMap['ind'] = "Indonesian";
    oLangMap['hun'] = "Hungarian";
    oLangMap['dan'] = "Danish";
    oLangMap['bul'] = "Bulgarian";
    oLangMap['fin'] = "Finnish";
    oLangMap['nor'] = "Norwegian";
    oLangMap['ukr'] = "Ukrainian";
    oLangMap['cat'] = "Catalan";
    oLangMap['hrv'] = "Croatian";
    oLangMap['heb'] = "Hebrew";
    oLangMap['lit'] = "Lithuanian";
    oLangMap['slv'] = "Slovenian";
    oLangMap['hin'] = "Hindi";
    oLangMap['ben'] = "Bengali";
    oLangMap['tel'] = "Telugu";
    oLangMap['tam'] = "Tamil";
    oLangMap['kan'] = "Kannada";
    oLangMap['mal'] = "Malayalam";
    oLangMap['tgl'] = "Tagalog";
    oLangMap['swa'] = "Swahili";
    oLangMap['aze'] = "Azerbaijani";
    oLangMap['bel'] = "Belarusian";
    oLangMap['afr'] = "Afrikaans";
    oLangMap['sqi'] = "Albanian";
    oLangMap['eus'] = "Basque";
    oLangMap['epo'] = "Esperanto";
    oLangMap['est'] = "Estonian";
    oLangMap['glg'] = "Galician";
    oLangMap['isl'] = "Icelandic";
    oLangMap['lav'] = "Latvian";
    oLangMap['mkd'] = "Macedonian";
    oLangMap['msa'] = "Malay";
    oLangMap['mlt'] = "Maltese";
    oLangMap['grc'] = "Ancient Greek";
    oLangMap['chr'] = "Cherokee";
    oLangMap['enm'] = "English (Old)";
    oLangMap['frk'] = "Frankish";
    oLangMap['equ'] = "Math";
    oLangMap['srp'] = "Serbian (Latin)";
    oLangMap['slk'] = "Slovak";

    window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
    
    function escapeHtml(string) {
        var res = string;
        res = res.replace(/[\', \", \\,]/g, function (sSymbol) {
            return '\\' + sSymbol;
        });
        return res;
    }

    var arrParsedData = [];

    window.Asc.plugin.init = function(){
        $('#lang-select').select2({
            minimumResultsForSearch: Infinity
        });
        this.resizeWindow(592, 100, 592, 100, 592, 100);
        var nStartFilesCount = 0, arrImages;
        $( window ).resize(function(){
            updateScroll();
        });

        function updateScroll(){
            Ps.update();
        }
        var container = document.getElementById('scrollable-image-text-div');        
		Ps = new PerfectScrollbar("#" + container.id, {});
        $('#load-file-button-id').click(
          					
			function (e) {
				
				if (window["AscDesktopEditor"])
				{
					window["AscDesktopEditor"]["OpenFilenameDialog"]("images", true, function(files) {
                        arrImages = [];
                        
                        if (!Array.isArray(files)) // string detect
                            files = [files];

						if (files.length == 0)
							return;
						
						window.Asc.plugin.resizeWindow(800, 571, 800, 571);
						
						var oImagesContainer = document.getElementById('image-container-div');
						while (oImagesContainer.firstChild) {
							oImagesContainer.removeChild(oImagesContainer.firstChild);
						}
						var oTextContainer = document.getElementById('text-container-div');
						while (oTextContainer.firstChild) {
							oTextContainer.removeChild(oTextContainer.firstChild);
						}
						
						for (var i = 0; i < files.length; i++) 
						{
							var oImgElement = document.createElement('img');
							oImgElement.src = window["AscDesktopEditor"]["GetImageBase64"](files[i], false);
							oImgElement.style.width = '100%';
							oImgElement.style.marginBottom = "10px";
							arrImages.push(oImgElement);
							oImagesContainer.appendChild(oImgElement);
						}
						
						document.getElementById('lang-select').removeAttribute('disabled');
						document.getElementById('recognize-button').removeAttribute('disabled');
						nStartFilesCount = files.length;
						$('#status-label').text('');
						$('#scrollable-image-text-div').css('display', 'inline-block');
						updateScroll();
					});
					
					return;							
				}
			
                $('#images-input').click();
            }
        );				

        $('#images-input').change(function(e) {
            var arrFiles = e.target.files;
			//check for images in file list
			var arrFiles2 = [];
			for(var i = 0; i < arrFiles.length; ++i){
				if(arrFiles[i] && arrFiles[i].type && arrFiles[i].type.indexOf('image') === 0){
					arrFiles2.push(arrFiles[i]);
				}
				else{
					alert(arrFiles[i].name + "\nOCR plugin cannot read this file.");
				}
			}
			arrFiles = arrFiles2;
            if(arrFiles.length > 0){
                window.Asc.plugin.resizeWindow(800, 571, 800, 571);

                var oImagesContainer = document.getElementById('image-container-div');
                while (oImagesContainer.firstChild) {
                    oImagesContainer.removeChild(oImagesContainer.firstChild);
                }
                var oTextContainer = document.getElementById('text-container-div');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                arrParsedData.length = 0;
                var oFileReader = new FileReader();
                var nIndex = 0;
                arrImages = [];                
                $('#status-label').text('Loading images');
                oFileReader.onloadend = function() {
                    var oImgElement = document.createElement('img');
                    oImgElement.src = oFileReader.result;
                    oImgElement.style.width = '100%';
                    arrImages.push(oImgElement);
                    oImagesContainer.appendChild(oImgElement);
                    ++nIndex;
                    if(nIndex < arrFiles.length){
                        oFileReader.readAsDataURL(arrFiles[nIndex]);
                        $(oImgElement).css("margin-bottom", "10px");
                    }
                    else{
                        document.getElementById('lang-select').removeAttribute('disabled');
                        document.getElementById('recognize-button').removeAttribute('disabled');
                        nStartFilesCount = arrImages.length;
                        $('#status-label').text('');
                        $('#scrollable-image-text-div').css('display', 'inline-block');

                    }
                    updateScroll();
                };
                oFileReader.readAsDataURL(arrFiles[nIndex]);
            }
        });
        $('#recognize-button').click(
            function () {

                var arrImagesCopy = [].concat(arrImages);
                for (var i = 0; i < arrImagesCopy.length; i++)
                {
                    if (arrImagesCopy[i] && (0 == arrImagesCopy[i].naturalWidth) && (0 == arrImagesCopy[i].naturalHeight))
                    {
                        arrImagesCopy.splice(i, 1);
                        i--;
                    }
                }
                if (0 == arrImagesCopy.length)
                    return;

                var oTextContainer = document.getElementById('text-container-div');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
					updateScroll();
                }
                arrParsedData.length = 0;
                document.getElementById('recognize-button').setAttribute('disabled', '');
                document.getElementById('lang-select').setAttribute('disabled', '');
                document.getElementById('load-file-button-id').setAttribute('disabled', '');
				
                var fTesseractCall = function(){
					let sLang = $('#lang-select option:selected')[0].value;
					let worker = null;
					let result = null;
					Tesseract.createWorker({
					  logger: (progress) => {   
						  if(progress && progress.status === "recognizing text"){
								var nPercent =  (100*(progress.progress + nStartFilesCount - arrImagesCopy.length - 1)/nStartFilesCount) >> 0;
								$('#status-label').text('Recognizing: '+ nPercent + '%');
							}
						}
					}).then((oWorker) => {
						worker = oWorker;
					}).then(() => {
						return worker.loadLanguage(sLang);
					}).then(() => {
						return worker.initialize(sLang);
					}).then(() => {
						return worker.setParameters({
							tessedit_pageseg_mode: Tesseract.PSM.AUTO,
						});
					}).then(() => {
						return worker.recognize(arrImagesCopy.splice(0, 1)[0]);
					}).then((oResult) => {
						result = oResult;
						document.getElementById('text-container-div').appendChild($(generateHTMLByData(result.data))[0]);
						arrParsedData.push(result);
						updateScroll();
						if(arrImagesCopy.length > 0){
							fTesseractCall();
						}
						else{								
							$('#status-label').text('');
							document.getElementById('recognize-button').removeAttribute('disabled');
							document.getElementById('lang-select').removeAttribute('disabled');
							document.getElementById('load-file-button-id').removeAttribute('disabled', '');
						}
					}).then((oResult) => {
						worker.terminate();
					});

                };
                $('#status-label').text('Recognizing: 0%');
                fTesseractCall();
            }
        );
    
		function generateHTMLByData(oData) {
			let sResult = "<div>";
			function commitSpan(sLastSpanText, oLastWord) {
				if(sLastSpanText.length > 0 && oLastWord) {
					let sStyle = "";
					if(oLastWord.font_name && oLastWord.font_name.length > 0) {
						sStyle += ("font-family:" + oLastWord.font_name + ";");
					}
					//if(oLastWord.font_size) {
					//}
					
					sStyle += ("font-size:" + 11 + "pt;");
					if(oLastWord.is_bold) {
						sStyle += ("font-weight:bold;");
					}
					if(oLastWord.is_italic) {
						sStyle += ("font-style:italic;");
					}
					if(oLastWord.is_smallcaps) {
						sStyle += ("font-variant:small-caps;");
					}
					if(oLastWord.is_underlined) {
						sStyle += ("text-decoration:underline;");
					}
					sResult += "<span lang=\"" + oLastWord.language +"\" style=\"" + sStyle + "\">" + sLastSpanText + "</span>";
				}
			}
			
			let aBlocks = oData.blocks;
			for(let nBlock = 0; nBlock < aBlocks.length; ++nBlock) {
				let oBlock = aBlocks[nBlock]; 
				let aDataPar = oBlock.paragraphs;
				for(let nPar = 0; nPar < aDataPar.length; ++nPar) {
					let oDataPar = aDataPar[nPar];
					let aLines = oDataPar.lines;
					let nPixIndent = 0;
					
					let oFirstLine, oFirstWord;
					oFirstLine = aLines[0];
					if(oFirstLine) {
						oFirstWord = oFirstLine.words[0];
						if(oFirstWord) {
							nPixIndent = oFirstWord.bbox.x0 - oBlock.bbox.x0;
						}
					}
					if(Math.abs(nPixIndent) > 5) {
						let nIndent = (nPixIndent / 72) * 25.4 + 0.5 >> 0;
						sResult += "<p style=\"text-indent:" + nIndent + "mm;\">";
					}
					else {
						sResult += "<p>";
					}
					
					let oLastWord = null;
					let sLastSpanText = "";
					for(let nLine = 0; nLine < aLines.length; ++nLine) {
						let oLine = aLines[nLine];
						let aWords = oLine.words;
						for(let nWrd = 0; nWrd < aWords.length; ++nWrd) {
							let oWord = aWords[nWrd];
							if(!oLastWord || 
								oWord.font_name !== oLastWord.font_name ||
								//Math.abs(oWord.font_size - oLastWord.font_size) > 4 ||
								oWord.is_bold !== oLastWord.is_bold ||
								oWord.is_italic !== oLastWord.is_italic ||
								oWord.is_smallcaps !== oLastWord.is_smallcaps ||
								oWord.is_underlined !== oLastWord.is_underlined ||
								oWord.language !== oLastWord.language) {
								commitSpan(sLastSpanText, oLastWord);
								sLastSpanText = "";
							}
							if(sLastSpanText.length > 0) {
								sLastSpanText += " ";
							}
							if(nLine > 0 && nWrd === 0) {
								//sLastSpanText += "<br/>";
							}
							sLastSpanText += oWord.text;
							oLastWord = oWord;
						}
					}
					
					commitSpan(sLastSpanText, oLastWord);
					sResult += "</p>";
				}
			}
			sResult += "</div>";
			return sResult;
		}
	};

    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);

        var rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
    };

    window.Asc.plugin.button = function(id){
        if (id == 0){
            this.executeMethod("PasteHtml", [document.getElementById('text-container-div').innerHTML]);
            this.executeCommand("close", "");
        }
        else{
            this.executeCommand("close", "");
        }
    };


	window.Asc.plugin.onTranslate = function(){
		var elem = document.getElementById("label1");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("Tesseract.js lets recognize text in pictures (png, jpg)");
		}
		elem = document.getElementById("load-file-button-id");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("Load File");
		}	
		elem = document.getElementById("label2");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("Choose language");
		}
		elem = document.getElementById("recognize-button");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("Recognize");
		}
		elem = document.getElementById("lang-select");
		if(elem){
			var sInnerHtml = "";
			for(var key in oLangMap){
				if(oLangMap.hasOwnProperty(key)){
					sInnerHtml += "<option value = \'" + key + "'>" + window.Asc.plugin.tr(oLangMap[key]) + "</option>";
				}
			}
			elem.innerHTML = sInnerHtml;
		}
	};
	
	})(window, undefined);