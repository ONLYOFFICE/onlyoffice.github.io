/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

(function(window, undefined) {

	var recognition = {
		engine : null,
		isRecording : false,

		onStart : function() {
			console.log("Voice recognition: start");
		},

		onEnd : function() {
			console.log("Voice recognition: end");
		},

		onProgress : function(text) {
			console.log("Voice recognition: " + text);
		},

		onError : function(error) {
			console.log("Voice recognition error: " + text);
		}
	};

	window.initVoiceRecognitionEngine = function() {
		if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
			console.warn('Speech recognition not supported in this browser');
			return null;
		}

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		recognition.engine = new SpeechRecognition();
		recognition.engine.continuous = true;
		recognition.engine.interimResults = true;
		recognition.engine.maxAlternatives = 1;

		console.log('Voice recognition initialized with browser auto-detection');

		let finalTranscript = "";
		let interimTranscript = "";
		let lastUpdateTime = Date.now();

		recognition.engine.onstart = function() {
			isRecording = true;
			finalTranscript = "";
			interimTranscript = "";

			recognition.onStart && recognition.onStart();
		};

		recognition.engine.onresult = function(event) {
			interimTranscript = "";
			finalTranscript = "";

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += transcript;
				} else {
					interimTranscript += transcript;
				}
			}

			const now = Date.now();
			if (finalTranscript || (now - lastUpdateTime > 500)) {
				lastUpdateTime = now;
				if (finalTranscript) {
					recognition.onProgress && recognition.onProgress(processPunctuationCommands(finalTranscript));
					finalTranscript = "";
				}
			}
		};

		recognition.engine.onerror = function(event) {
			isRecording = false;
			console.error('Speech recognition error:', event.error);
			recognition.onError && recognition.onError(event.error);
		};

		recognition.engine.onend = function() {
			isRecording = false;
			recognition.onEnd && recognition.onEnd();
		};

		function processPunctuationCommands(text) {
			// English
			text = text.replace(/\speriod\s/gi, '. ');
			text = text.replace(/\scomma\s/gi, ', ');
			text = text.replace(/\squestion mark\s/gi, '? ');
			text = text.replace(/\sexclamation mark\s/gi, '! ');
			text = text.replace(/\scolon\s/gi, ': ');
			text = text.replace(/\ssemicolon\s/gi, '; ');
			text = text.replace(/\snew line\s/gi, '\n');
			text = text.replace(/\snew paragraph\s/gi, '\n\n');

			// Russian
			text = text.replace(/\sточка\s/gi, '. ');
			text = text.replace(/\sзапятая\s/gi, ', ');
			text = text.replace(/\sвопросительный знак\s/gi, '? ');
			text = text.replace(/\sвосклицательный знак\s/gi, '! ');
			text = text.replace(/\sдвоеточие\s/gi, ': ');
			text = text.replace(/\sточка с запятой\s/gi, '; ');
			text = text.replace(/\sновая строка\s/gi, '\n');
			text = text.replace(/\sновый абзац\s/gi, '\n\n');

			// Spanish
			text = text.replace(/\spunto\s/gi, '. ');
			text = text.replace(/\scoma\s/gi, ', ');
			text = text.replace(/\ssigno de interrogación\s/gi, '? ');
			text = text.replace(/\ssigno de exclamación\s/gi, '! ');
			text = text.replace(/\sdos puntos\s/gi, ': ');
			text = text.replace(/\spunto y coma\s/gi, '; ');
			text = text.replace(/\snueva línea\s/gi, '\n');
			text = text.replace(/\snuevo párrafo\s/gi, '\n\n');

			// French
			text = text.replace(/\spoint\s/gi, '. ');
			text = text.replace(/\svirgule\s/gi, ', ');
			text = text.replace(/\spoint d'interrogation\s/gi, '? ');
			text = text.replace(/\spoint d'exclamation\s/gi, '! ');
			text = text.replace(/\sdeux points\s/gi, ': ');
			text = text.replace(/\spoint virgule\s/gi, '; ');
			text = text.replace(/\snouvelle ligne\s/gi, '\n');
			text = text.replace(/\snouveau paragraphe\s/gi, '\n\n');

			// German
			text = text.replace(/\spunkt\s/gi, '. ');
			text = text.replace(/\skomma\s/gi, ', ');
			text = text.replace(/\sfragezeichen\s/gi, '? ');
			text = text.replace(/\sausrufezeichen\s/gi, '! ');
			text = text.replace(/\sdoppelpunkt\s/gi, ': ');
			text = text.replace(/\ssemikolon\s/gi, '; ');
			text = text.replace(/\sneue zeile\s/gi, '\n');
			text = text.replace(/\sneuer absatz\s/gi, '\n\n');

			// Italian
			text = text.replace(/\spunto\s/gi, '. ');
			text = text.replace(/\svirgola\s/gi, ', ');
			text = text.replace(/\spunto interrogativo\s/gi, '? ');
			text = text.replace(/\spunto esclamativo\s/gi, '! ');
			text = text.replace(/\sdue punti\s/gi, ': ');
			text = text.replace(/\spunto e virgola\s/gi, '; ');
			text = text.replace(/\snuova riga\s/gi, '\n');
			text = text.replace(/\snuovo paragrafo\s/gi, '\n\n');

			// Portuguese
			text = text.replace(/\sponto\s/gi, '. ');
			text = text.replace(/\svírgula\s/gi, ', ');
			text = text.replace(/\sponto de interrogação\s/gi, '? ');
			text = text.replace(/\sponto de exclamação\s/gi, '! ');
			text = text.replace(/\sdois pontos\s/gi, ': ');
			text = text.replace(/\sponto e vírgula\s/gi, '; ');
			text = text.replace(/\snova linha\s/gi, '\n');
			text = text.replace(/\snovo parágrafo\s/gi, '\n\n');

			// Polish
			text = text.replace(/\skropka\s/gi, '. ');
			text = text.replace(/\sprzecinek\s/gi, ', ');
			text = text.replace(/\sznak zapytania\s/gi, '? ');
			text = text.replace(/\sznak wykrzyknika\s/gi, '! ');
			text = text.replace(/\sdwukropek\s/gi, ': ');
			text = text.replace(/\średnik\s/gi, '; ');
			text = text.replace(/\snowa linia\s/gi, '\n');
			text = text.replace(/\snowy akapit\s/gi, '\n\n');

			// Czech
			text = text.replace(/\stečka\s/gi, '. ');
			text = text.replace(/\sčárka\s/gi, ', ');
			text = text.replace(/\sotazník\s/gi, '? ');
			text = text.replace(/\svykřičník\s/gi, '! ');
			text = text.replace(/\sdvojtečka\s/gi, ': ');
			text = text.replace(/\sstředník\s/gi, '; ');
			text = text.replace(/\snový řádek\s/gi, '\n');
			text = text.replace(/\snový odstavec\s/gi, '\n\n');

			// Ukrainian
			text = text.replace(/\sкрапка\s/gi, '. ');
			text = text.replace(/\sкома\s/gi, ', ');
			text = text.replace(/\sзнак питання\s/gi, '? ');
			text = text.replace(/\sзнак оклику\s/gi, '! ');
			text = text.replace(/\sдвокрапка\s/gi, ': ');
			text = text.replace(/\sкрапка з комою\s/gi, '; ');
			text = text.replace(/\sновий рядок\s/gi, '\n');
			text = text.replace(/\sновий абзац\s/gi, '\n\n');

			// Turkish
			text = text.replace(/\snokta\s/gi, '. ');
			text = text.replace(/\svirgül\s/gi, ', ');
			text = text.replace(/\ssoru işareti\s/gi, '? ');
			text = text.replace(/\sünlem işareti\s/gi, '! ');
			text = text.replace(/\siki nokta\s/gi, ': ');
			text = text.replace(/\snoktalı virgül\s/gi, '; ');
			text = text.replace(/\syeni satır\s/gi, '\n');
			text = text.replace(/\syeni paragraf\s/gi, '\n\n');

			// Dutch
			text = text.replace(/\spunt\s/gi, '. ');
			text = text.replace(/\skomma\s/gi, ', ');
			text = text.replace(/\svraagpunt\s/gi, '? ');
			text = text.replace(/\suitroepteken\s/gi, '! ');
			text = text.replace(/\sdubbele punt\s/gi, ': ');
			text = text.replace(/\spuntkomma\s/gi, '; ');
			text = text.replace(/\snieuwe regel\s/gi, '\n');
			text = text.replace(/\snieuwe alinea\s/gi, '\n\n');

			// Swedish
			text = text.replace(/\spunkt\s/gi, '. ');
			text = text.replace(/\skommatecken\s/gi, ', ');
			text = text.replace(/\sfrågetecken\s/gi, '? ');
			text = text.replace(/\sutropstecken\s/gi, '! ');
			text = text.replace(/\skolon\s/gi, ': ');
			text = text.replace(/\ssemikolon\s/gi, '; ');
			text = text.replace(/\sny rad\s/gi, '\n');
			text = text.replace(/\snytt stycke\s/gi, '\n\n');

			// Danish
			text = text.replace(/\spunktum\s/gi, '. ');
			text = text.replace(/\skomma\s/gi, ', ');
			text = text.replace(/\sspørgsmålstegn\s/gi, '? ');
			text = text.replace(/\sudråbstegn\s/gi, '! ');
			text = text.replace(/\skolon\s/gi, ': ');
			text = text.replace(/\ssemikolon\s/gi, '; ');
			text = text.replace(/\sny linje\s/gi, '\n');
			text = text.replace(/\snyt afsnit\s/gi, '\n\n');

			// Norwegian
			text = text.replace(/\spunkts\s/gi, '. ');
			text = text.replace(/\skomma\s/gi, ', ');
			text = text.replace(/\sspørsmålstegn\s/gi, '? ');
			text = text.replace(/\sutropstegn\s/gi, '! ');
			text = text.replace(/\skolon\s/gi, ': ');
			text = text.replace(/\ssemikolon\s/gi, '; ');
			text = text.replace(/\sny linje\s/gi, '\n');
			text = text.replace(/\snytt avsnitt\s/gi, '\n\n');

			// Finnish
			text = text.replace(/\spiste\s/gi, '. ');
			text = text.replace(/\spilkku\s/gi, ', ');
			text = text.replace(/\skysymysmerkki\s/gi, '? ');
			text = text.replace(/\shuutomerkki\s/gi, '! ');
			text = text.replace(/\skaksoispiste\s/gi, ': ');
			text = text.replace(/\spuolipiste\s/gi, '; ');
			text = text.replace(/\suusi rivi\s/gi, '\n');
			text = text.replace(/\suusi kappale\s/gi, '\n\n');

			// Greek
			text = text.replace(/\sτελεία\s/gi, '. ');
			text = text.replace(/\sκόμμα\s/gi, ', ');
			text = text.replace(/\sερωτηματικό\s/gi, '? ');
			text = text.replace(/\sθαυμαστικό\s/gi, '! ');
			text = text.replace(/\sάνω και κάτω τελεία\s/gi, ': ');
			text = text.replace(/\sάνω τελεία\s/gi, '; ');
			text = text.replace(/\sνέα γραμμή\s/gi, '\n');
			text = text.replace(/\sνέα παράγραφος\s/gi, '\n\n');

			// Japanese (romaji commands)
			text = text.replace(/\smaru\s/gi, '。');
			text = text.replace(/\sten\s/gi, '、');
			text = text.replace(/\sgimonfu\s/gi, '？');
			text = text.replace(/\skandofu\s/gi, '！');
			text = text.replace(/\skoron\s/gi, '：');
			text = text.replace(/\ssemikoron\s/gi, '；');

			// Chinese (pinyin commands)
			text = text.replace(/\sjuhao\s/gi, '。');
			text = text.replace(/\sdouhao\s/gi, '，');
			text = text.replace(/\swenhao\s/gi, '？');
			text = text.replace(/\stanhao\s/gi, '！');
			text = text.replace(/\smaohao\s/gi, '：');
			text = text.replace(/\sfenhao\s/gi, '；');

			// Korean (romanized commands)
			text = text.replace(/\smachiumpyo\s/gi, '．');
			text = text.replace(/\sswimpyo\s/gi, '，');
			text = text.replace(/\smulumpyo\s/gi, '？');
			text = text.replace(/\snuneumpyo\s/gi, '！');

			// Arabic (transliterated commands)
			text = text.replace(/\snuqta\s/gi, '.');
			text = text.replace(/\sfasila\s/gi, '،');
			text = text.replace(/\sistifsham\s/gi, '؟');
			text = text.replace(/\sta'ajub\s/gi, '!');

			// Hindi (transliterated commands)
			text = text.replace(/\spurna viram\s/gi, '।');
			text = text.replace(/\salp viram\s/gi, '，');
			text = text.replace(/\sprashan chinh\s/gi, '?');
			text = text.replace(/\svismayadibodhak chinh\s/gi, '!');

			// Hebrew (transliterated commands)
			text = text.replace(/\snekuda\s/gi, '.');
			text = text.replace(/\spasik\s/gi, ',');
			text = text.replace(/\ssheelah\s/gi, '?');
			text = text.replace(/\stmia\s/gi, '!');

			// Vietnamese
			text = text.replace(/\schấm\s/gi, '. ');
			text = text.replace(/\sdấu phẩy\s/gi, ', ');
			text = text.replace(/\sdấu hỏi\s/gi, '? ');
			text = text.replace(/\sdấu chấm than\s/gi, '! ');
			text = text.replace(/\shai chấm\s/gi, ': ');
			text = text.replace(/\schấm phẩy\s/gi, '; ');
			text = text.replace(/\sdòng mới\s/gi, '\n');
			text = text.replace(/\sđoạn mới\s/gi, '\n\n');

			return text;
		}

		return recognition;
	};
	
})(window, undefined);
