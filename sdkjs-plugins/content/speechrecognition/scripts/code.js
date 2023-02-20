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

	var curLang;
    var oTheme = null;
	var defaultLang = "en-US";
	
	// If you modify this array, also update default language / dialect below.
	var langs =
		[['Afrikaans',      [['af-ZA']]],
		['አማርኛ',           [['am-ET']]],
		['Azərbaycanca',    [['az-AZ']]],
		['বাংলা',            [['bn-BD', 'বাংলাদেশ'],
							['bn-IN', 'ভারত']]],
		['Bahasa Indonesia',[['id-ID']]],
		['Bahasa Melayu',   [['ms-MY']]],
		['Català',          [['ca-ES']]],
		['Čeština',         [['cs-CZ']]],
		['Dansk',           [['da-DK']]],
		['Deutsch',         [['de-DE']]],
		['English',         [['en-AU', 'Australia'],
							['en-CA', 'Canada'],
							['en-IN', 'India'],
							['en-KE', 'Kenya'],
							['en-TZ', 'Tanzania'],
							['en-GH', 'Ghana'],
							['en-NZ', 'New Zealand'],
							['en-NG', 'Nigeria'],
							['en-ZA', 'South Africa'],
							['en-PH', 'Philippines'],
							['en-GB', 'United Kingdom'],
							['en-US', 'United States']]],
		['Español',         [['es-AR', 'Argentina'],
							['es-BO', 'Bolivia'],
							['es-CL', 'Chile'],
							['es-CO', 'Colombia'],
							['es-CR', 'Costa Rica'],
							['es-EC', 'Ecuador'],
							['es-SV', 'El Salvador'],
							['es-ES', 'España'],
							['es-US', 'Estados Unidos'],
							['es-GT', 'Guatemala'],
							['es-HN', 'Honduras'],
							['es-MX', 'México'],
							['es-NI', 'Nicaragua'],
							['es-PA', 'Panamá'],
							['es-PY', 'Paraguay'],
							['es-PE', 'Perú'],
							['es-PR', 'Puerto Rico'],
							['es-DO', 'República Dominicana'],
							['es-UY', 'Uruguay'],
							['es-VE', 'Venezuela']]],
		['Euskara',         [['eu-ES']]],
		['Filipino',        [['fil-PH']]],
		['Français',        [['fr-FR']]],
		['Basa Jawa',       [['jv-ID']]],
		['Galego',          [['gl-ES']]],
		['ગુજરાતી',           [['gu-IN']]],
		['Hrvatski',        [['hr-HR']]],
		['IsiZulu',         [['zu-ZA']]],
		['Íslenska',        [['is-IS']]],
		['Italiano',        [['it-IT', 'Italia'],
							['it-CH', 'Svizzera']]],
		['ಕನ್ನಡ',             [['kn-IN']]],
		['ភាសាខ្មែរ',          [['km-KH']]],
		['Latviešu',        [['lv-LV']]],
		['Lietuvių',        [['lt-LT']]],
		['മലയാളം',          [['ml-IN']]],
		['मराठी',            [['mr-IN']]],
		['Magyar',          [['hu-HU']]],
		['ລາວ',             [['lo-LA']]],
		['Nederlands',      [['nl-NL']]],
		['नेपाली भाषा',         [['ne-NP']]],
		['Norsk bokmål',    [['nb-NO']]],
		['Polski',          [['pl-PL']]],
		['Português',       [['pt-BR', 'Brasil'],
							['pt-PT', 'Portugal']]],
		['Română',          [['ro-RO']]],
		['සිංහල',            [['si-LK']]],
		['Slovenščina',     [['sl-SI']]],
		['Basa Sunda',      [['su-ID']]],
		['Slovenčina',      [['sk-SK']]],
		['Suomi',           [['fi-FI']]],
		['Svenska',         [['sv-SE']]],
		['Kiswahili',       [['sw-TZ', 'Tanzania'],
							['sw-KE', 'Kenya']]],
		['ქართული',         [['ka-GE']]],
		['Հայերեն',         [['hy-AM']]],
		['தமிழ்',            [['ta-IN', 'இந்தியா'],
						    ['ta-SG', 'சிங்கப்பூர்'],
							['ta-LK', 'இலங்கை'],
							['ta-MY', 'மலேசியா']]],
		['తెలుగు',           [['te-IN']]],
		['Tiếng Việt',      [['vi-VN']]],
		['Türkçe',          [['tr-TR']]],
		['اُردُو',            [['ur-PK', 'پاکستان'],
							['ur-IN', 'بھارت']]],
		['Ελληνικά',        [['el-GR']]],
		['български',       [['bg-BG']]],
		['Русский',         [['ru-RU']]],
		['Српски',          [['sr-RS']]],
		['Українська',      [['uk-UA']]],
		['한국어',            [['ko-KR']]],
		['中文',             [['cmn-Hans-CN', '普通话 (中国大陆)'],
							['cmn-Hans-HK', '普通话 (香港)'],
							['cmn-Hant-TW', '中文 (台灣)'],
							['yue-Hant-HK', '粵語 (香港)']]],
		['日本語',           [['ja-JP']]],
		['हिन्दी',             [['hi-IN']]],
		['ภาษาไทย',         [['th-TH']]]];

	var	ignore_onend = true;
    var sLastResult = '';

    String.prototype.replaceAt = function(nIndex, sReplacement) {
      return this.substr(0, nIndex) + sReplacement + this.substr(nIndex + sReplacement.length);
    }

	window.Asc.plugin.init = function() {
		switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetDocumentLang", [], function(lang) {
                    let documentLang = lang || defaultLang;

					let aOptions = Array.from($('#custom_menu option'));
					let oDefaultOption = aOptions.find(function(item) {
						if (item.value == defaultLang)
							return item;
					});

					let oMatchOption = undefined;
					// ищем по полному совпадению
					oMatchOption = aOptions.find(function(item) {
						if (item.value == documentLang)
							return true;
					});
					// ищем на совпадению по осносному языку
					if (!oMatchOption) {
						oMatchOption = aOptions.find(function(item) {
							if (item.value.search(documentLang.split('-')[0]) != -1)
								return true;
						});
					}

					if (!oMatchOption)
						oMatchOption = oDefaultOption;

					if (oMatchOption) {
						$('#custom_menu').val(oMatchOption.value);
						$('#custom_menu').trigger('change');
					}
                });
                break;
            }
        }

		if (typeof(webkitSpeechRecognition) == "undefined") {
			alert('Web Speech API is not supported by this browser. Please open it in Google Chrome browser.');
			document.getElementById("div_main").style.display = "none";
			return;
		}
		var languages = langs.map(function(el, ind) {
			return {
				id : ind,
				text : el[0],
				code : el[1]
			};
		});
		curLang = languages[0].code[0][0];

		for (var nLang = 0; nLang < languages.length; nLang++) {
            if (languages[nLang].code.length > 1) {
                for (var nDialect = 0; nDialect < languages[nLang].code.length; nDialect++) {
                    $("#custom_menu").append($("<option>", {
                        value: languages[nLang].code[nDialect][0],
                        text: languages[nLang].text + ' (' + languages[nLang].code[nDialect][1] + ')'
                    }));
                }
            }
            else {
                $("#custom_menu").append($("<option>", {
                    value: languages[nLang].code[0][0],
                    text: languages[nLang].text
                }));
            }
		}
		$('#custom_menu').select2({});
		$('#custom_menu').on('change', function() {
            localStorage.setItem($(this).attr('data-id'), $(this).val());
            curLang = document.getElementById("custom_menu").value;
        });
        var savedLang = localStorage.getItem($('#custom_menu').attr('data-id'));
        if (savedLang !== null) {
            $('#custom_menu').val(savedLang);
            $('#custom_menu').trigger('change');
        }

		var final_transcript = '',
		recognizing = false,
		start_timestamp;

		if (!('webkitSpeechRecognition' in window)) {
			upgrade();
		} else {
			start_button.style.display = 'inline-block';
			var recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;

			recognition.onstart = function() {
				recognizing = true;
			};

			recognition.onerror = function(event) {
			    ignore_onend = false;
			    if (event.error == 'network') {
					if (event.message == "") {
						ignore_onend = true;
						return;
					}
					else {
						alert('Error with connection to recognition service of this browser, please use the Chrome browser');
						window.Asc.plugin.executeCommand("close", "");
					}
				}
					
				$('#micro_img_path').toggleClass('recording_color');
				$('#start_info').show();
				$('#speak_info').hide();

				if (event.error == 'no-speech') {
					alert('No speech was detected. You may need to adjust your microphone settings.');
				}
				if (event.error == 'audio-capture') {
					alert('No microphone was found. Ensure that a microphone is installed and that	microphone settings are configured correctly.');
				}
				if (event.error == 'not-allowed') {
					if (event.timeStamp - start_timestamp < 100) {
						alert('Permission to use microphone is blocked. To change, go to chrome://settings/content/microphone');
					} else {
						alert('Permission to use microphone was denied.');
					}
				}
			};

			recognition.onend = function() {
			    if (!ignore_onend) {
			        recognizing = false;
                    if (!final_transcript) {
                        return;
                    }
			    }
				else {
                    final_transcript = '';
                    recognition.lang = curLang;
                    recognition.start();
                    ignore_onend = true;
                    interim_span.innerHTML = '';
                    start_timestamp = event.timeStamp;
                }
			};

			recognition.onresult = function(event) {
				var interim_transcript = '';
				final_transcript = '';
				if (typeof(event.results) == 'undefined') {
					recognition.onend = null;
					recognition.stop();
					upgrade();
					return;
				}
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						final_transcript += event.results[i][0].transcript;
					} else {
						interim_transcript += event.results[i][0].transcript;
					}
				}
				final_transcript = capitalize(final_transcript);
				if (event.results[0].isFinal && final_transcript !== '') {
				    if (sLastResult[sLastResult.length - 1] === '.' || sLastResult === '')
				        for (var nChar = 0; nChar < final_transcript.length; nChar++) {
				            if (final_transcript[nChar] !== ' ') {
				                final_transcript = final_transcript.replaceAt(nChar, final_transcript[nChar].toUpperCase());
				                break;
				            }
				        }
				    else {
				        for (var nChar = 0; nChar < final_transcript.length; nChar++) {
				            if (final_transcript[nChar] !== ' ') {
				                final_transcript = final_transcript.replaceAt(nChar, final_transcript[nChar].toLowerCase());
				                break;
				            }
				        }
				    }
				    if (sLastResult === '')
				        final_transcript = final_transcript.trim();
				    sLastResult = final_transcript;
					window.Asc.plugin.executeMethod("PasteHtml",[linebreak(final_transcript)]);
				}
				interim_span.innerHTML = linebreak(interim_transcript);
			};
		};

		function upgrade() {
			start_button.style.visibility = 'hidden';
			alert('Web Speech API is not supported by this browser. Upgrade to Chrome version 25 or later.');
		};

		const paragraph = '<!--StartFragment--><p style="margin-top:0pt;margin-bottom:9.999977952755906pt;border:none;mso-border-left-alt:none;mso-border-top-alt:none;mso-border-right-alt:none;mso-border-bottom-alt:none;mso-border-between:none" class="docData;DOCY;v5;1177;BAiAAgAABoQCAAAD3AIAAAXqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUAAAAAE8AAAABGAAAAAEGAAAAAAkGAAAAABoGAAAAABsGAAAAAAItAAAABQoAAAABAAAAAAgAAAAABQoAAAABAAAAAAgAAAAABQoAAAABAAAAAAgAAAAACgAAAAAAAAAAEQAAAACrAQAAAOIAAAAAAQABBhIAAAACBQAAAAADBQAAAAAEBQAAAAAFAQEGAQAHAQAIAQAJBhsAAAAKBTfBAQALAQEcAQAMBQAAAAAdAQANBQliBQAOBg4AAAAAAQEBA////wIGAAAAABkBARsGfQAAAAAUAAAAAAMAAAABBQAAAAACBeZEAAADAQABFAAAAAADAAAAAQUAAAAAAgXmRAAAAwEAAhQAAAAAAwAAAAEFAAAAAAIF5kQAAAMBAAMUAAAAAAMAAAABBQAAAAACBeZEAAADAQALFAAAAAADAAAAAQUAAAAAAgXmRAAAAwEAAboAAAAAAQABAQACAQADAQAEBgoAAABBAHIAaQBhAGwABQYKAAAAQQByAGkAYQBsAAcGCgAAAEEAcgBpAGEAbAAGBgoAAABBAHIAaQBhAGwACAQWAAAACgEADAEADgUAAAAADwEAEAEAEQEAEgUAAAAAFAEAFQEAFgQWAAAAFwEAGAEAGQYKAAAAZQBuAC0AVQBTABoGCgAAAGEAcgAtAFMAQQAbBgoAAABlAG4ALQBVAFMAHAYCAAAAAAAeAQACAAAAAA==">&nbsp;</p><!--EndFragment-->'; 
		const two_line = /\n\n/g;
		const one_line = /\n/g;
		function linebreak(s) {
			if (s.indexOf('\n') !== -1) {
				s = s.substr(1);
			}
			return s.replace(two_line, paragraph).replace(one_line, paragraph);
		};

		const first_char = /\S/;
		function capitalize(s) {
			return s.replace(first_char, function(m) { return m.toUpperCase(); });
		};
        start_button.onclick = function(event) {
			if (recognizing) {
			    ignore_onend = false;
				recognition.stop();
				$('#micro_img_path').toggleClass('recording_color');
				$('#start_info').show();
				$('#speak_info').hide();
				return;
			}

			$('#start_info').hide();
            $('#speak_info').show();
            $('#micro_img_path').toggleClass('recording_color');

			ignore_onend = true;
			final_transcript = '';
			recognition.lang = curLang;
			recognition.start();
			interim_span.innerHTML = '';
			start_timestamp = event.timeStamp;
		};
	};
	window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);

        var sRecordingColor = theme.type === 'dark' ? '#EE5959' : '#EC4949';
        var rule = '.recording_color { fill: ' + sRecordingColor + ' !important;}\n';
        rule += '.btn-text-default:hover { background-color : ' + theme["highlight-button-pressed"] + ' !important;}\n';
        rule += ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";

        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);

        $('.btn-text-default').css('border-color', theme["background-toolbar"]);
        $('.btn-text-default').css('background-color', theme["background-toolbar"]);
        $('.btn-text-default:hover').css('background-color', "#fff !important");

        $('#micro_img_path').css('fill', theme["text-normal"]);
    };
	function getMessage(key) {
        return window.Asc.plugin.tr(key.trim());
    };
	window.Asc.plugin.onTranslate = function()
    {
        var elements = document.getElementsByClassName("i18n");

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.attributes["placeholder"]) el.attributes["placeholder"].value = getMessage(el.attributes["placeholder"].value);
            let isRussianRule = el.innerText.slice(el.innerText.length - 2, el.innerText.length) === "ru";
            let textWithourRuMark = isRussianRule ? el.innerText.slice(0, el.innerText.length - 2) : "";
            if (el.innerText && isRussianRule)
            {
                el.outerHTML = el.outerHTML.replace(textWithourRuMark, getMessage(textWithourRuMark));
            }
            else
                el.innerText = getMessage(el.innerText);
        }
    };

})(window, undefined);