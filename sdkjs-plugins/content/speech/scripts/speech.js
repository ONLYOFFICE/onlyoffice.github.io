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
(function(window, undefined)
{
    function detectChrome(){
        var isChromium = window.chrome;
        var winNav = window.navigator;
        var vendorName = winNav.vendor;
        var isOpera = typeof window.opr !== "undefined";
        var isIEedge = winNav.userAgent.indexOf("Edg") > -1;

        if (isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false)
            return true;

        return false;
    };

    var isChrome = detectChrome();
    var Max_Chars = 32767; // max chars in one sentense
	var text_init = "";
    var timer;
    var voice_name, oMainVoice;
    var curTextIdx = 0;
    var allParagraphs = [];
    var pitch     = 1;
    var rate      = 1;
    var voices    = [];
    var bDefaultLang = false;
    var aAllUtterance = [];
    var synth = window.speechSynthesis;
    var langsMap = {
        "ab": "ab",
        "af": "af-ZA",
        "ar": "ar-SA",
        "az": "az-AZ",
        "be": "be-BY",
        "bg": "bg-BG",
        "bn": "bn-IN",
        "bo": "bo-CN",
        "br": "br-FR",
        "ca": "ca-ES",
        "ceb": "ceb",
        "cs": "cs-CZ",
        "cy": "cy-GB",
        "da": "da-DK",
        "de": "de-DE",
        "el": "el-GR",
        "en": "en-GB",
        "eo": "eo",
        "es": "es-ES",
        "et": "et-EE",
        "eu": "eu-ES",
        "fa": "fa-IR",
        "fi": "fi-FI",
        "fo": "fo-FO",
        "fr": "fr-FR",
        "fy": "fy-NL",
        "gd": "gd-GB",
        "gl": "gl",
        "gu": "gu-IN",
        "ha": "ha",
        "haw": "haw-US",
        "he": "he-IL",
        "hi": "hi-IN",
        "hr": "hr-HR",
        "hu": "hu-HU",
        "hy": "hy-AM",
        "id": "id-ID",
        "is": "is-IS",
        "it": "it-IT",
        "ja": "ja-JP",
        "ka": "ka-GE",
        "kk": "kk-KZ",
        "km": "km-KH",
        "kn": "kn",
        "ko": "ko-KR",
        "ku": "ku",
        "ky": "ky-KG",
        "la": "la",
        "lo": "lo-LA",
        "lt": "lt-LT",
        "lv": "lv-LV",
        "mg": "mg",
        "mk": "mk-MK",
        "ml": "ml-IN",
        "mn": "mn-MN",
        "mr": "mr-IN",
        "ms": "ms-MY",
        "nd": "nd",
        "ne": "ne-NP",
        "nl": "nl-NL",
        "nn": "nn-NO",
        "no": "nb-NO",
        "nso": "nso-ZA",
        "or": "or-IN",
        "nr": "nr",
        "pa": "pa-PK",
        "pl": "pl-PL",
        "ps": "ps-AF",
        "pt": "pt-PT",
        "pt-br": "pt-BR",
        "pt-pt": "pt-PT",
        "ro": "ro-RO",
        "ru": "ru-RU",
        "sa": "sa-IN",
        "sh": "sh",
        "si": "si-LK",
        "sk": "sk-SK",
        "sl": "sl-SI",
        "so": "so-SO",
        "sq": "sq-AL",
        "sr": "sr-RS",
        "ss": "ss",
        "st": "st",
        "sv": "sv-SE",
        "sw": "sw-KE",
        "ta": "ta-LK",
        "te": "te-IN",
        "th": "th-TH",
        "tl": "tl",
        "tlh": "tlh",
        "tn": "tn",
        "tr": "tr-TR",
        "ts": "ts",
        "tw": "tw",
        "uk": "uk-UA",
        "ur": "ur-PK",
        "uz": "uz-UZ",
        "ve": "ve",
        "vi": "vi-VN",
        "xh": "xh",
        "zh": "zh",
        "zh-TW": "zh-TW",
        "zu": "zu-ZA"
    }
    var cyrilic = ["uk", "kk", "uz", "mn", "sr", "ru", "mk", "bg", "ky"]
	window.Asc.plugin.init = function(text)
	{
		if ("" == text)
		{
			window.Asc.plugin.executeCommand("close", "");
			return;
		}
		text_init = text;

		if (!synth || voices.length === 0)
        {
            synth != null && voices.length === 0 && console.log("No voices for web speech api!");
            window.Asc.plugin.executeCommand("close", "");
            return;
        }

        guessLanguage.info(text_init, function(info) {
            Run(info[0]);
        });
	};

    function FindVoice(lang, bSkipGoogle) {
        if (!voice_name || voice_name === "Auto") {
            for (var i = 0; i < voices.length; i++) {
                if (langsMap[lang]) {
                    if (langsMap[lang].search(voices[i].lang) !== -1) {
                        if (bSkipGoogle && voices[i].name.search('Google') !== -1)
                            continue;

                        voice_name = voices[i].name;
                        oMainVoice = voices[i];
                        break;
                    }
                }
            }
            if (!voice_name) {
                for (var i = 0; i < voices.length; i++) {
                    if (langsMap[lang]) {
                        if (langsMap[lang].split('-')[0] === voices[i].lang.split('-')[0]) {
                            if (bSkipGoogle && voices[i].name.search('Google') !== -1)
                                continue;

                            voice_name = voices[i].name;
                            oMainVoice = voices[i];
                            break;
                        }
                    }
                }
            }

            if (!oMainVoice && bSkipGoogle)
                FindVoice(lang, false);
            if (oMainVoice)
                return true;

            if ((!voice_name || voice_name === "Auto") && cyrilic.indexOf(lang) !== -1) {
                voice_name = langsMap["ru"];
                bSkipGoogle = true;
            }
            else if (!voice_name || voice_name === "Auto") {
                bSkipGoogle = true;
                bDefaultLang = true;
                voice_name = "en-US";
            }
        }

        for(i = 0; i < voices.length ; i++) {
            if(voices[i].name === voice_name && !bDefaultLang) {
                if (bSkipGoogle && voices[i].name.search('Google') !== -1)
                    continue;

                oMainVoice = voices[i];
                break;
            }
            else if (voices[i].lang === voice_name) {
                if (bSkipGoogle && voices[i].name.search('Google') !== -1)
                    continue;

                oMainVoice = voices[i];
                break;
            }
        }
    }

    function Run(lang)
    {
        FindVoice(lang, true);
        if (!oMainVoice)
            FindVoice(lang, false);
        if (oMainVoice == null && voices.length > 0)
            oMainVoice = voices[0];
        if (!oMainVoice) {
            window.Asc.plugin.executeCommand("close", "");
            return false;
        }
            
        allParagraphs = correctSentLength(text_init.split('\n'));
        createAllUtterance();
        speak();
    }

    function initVoices() {
        voices = synth.getVoices().sort(function (a, b) {
            const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
            if ( aname < bname ) return -1;
            else if ( aname == bname ) return 0;
            else return +1;
        });
    }

    function correctSentLength(allSentenses) {
        if (isChrome && !oMainVoice.localService)
            Max_Chars = 100;

        var aResult = [];
        var sCurSentense, nTimes, nTempLength, nTempPos;
        var sTemp = "";
        
        for (var nSen = 0; nSen < allSentenses.length; nSen++) {
            sCurSentense = allSentenses[nSen];
            nTempLength = 0;
            if(sCurSentense.length > Max_Chars) {
                aSplitSentense = [];
                nTimes =  Math.floor(sCurSentense.length / Max_Chars) + 1;

                for (var nTime = 0; nTime < nTimes; nTime++) {
                    nTempPos = -1;
                    sTemp = sCurSentense.slice(nTempLength, Max_Chars * (nTime + 1));
                    if (sTemp === "")
                        break;

                    if (!sTemp[sTemp.length - 1].match(new RegExp(/[.!?,;\r ]/))) {
                        var aMatches = Array.from(sTemp.matchAll(/[.!?;,\r]/g));
                        if (aMatches.length === 0)
                            aMatches = Array.from(sTemp.matchAll(' '));

                        if (aMatches.length !== 0)
                            sTemp = sTemp.slice(0, aMatches[aMatches.length - 1].index + 1);
                    }

                    nTempLength += sTemp.length;
                    sTemp.trim() !== "" && aResult.push(sTemp);
                }
            }
            else
                sCurSentense.trim() !== "" && aResult.push(sCurSentense);
        }
        return aResult;
    }

    function resumeInfinity() {
        synth.pause();
        synth.resume();
        timer = setTimeout(function () {
            resumeInfinity()
        }, 3000)
    }
    function clear() {  clearTimeout(timer) }
    
    function createAllUtterance() {
        var oUtterance;
        for (var nTxt = 0; nTxt < allParagraphs.length; nTxt++) {
            if (allParagraphs[nTxt].trim() === "")
                continue;
            
            oUtterance = new SpeechSynthesisUtterance(allParagraphs[nTxt]);
            oUtterance.voice = oMainVoice;
            oUtterance.pitch = pitch;
            oUtterance.rate = rate;
            oUtterance.onend = onEnd;
            oUtterance.onstart = onStart;
            oUtterance.onerror = onError;
            oUtterance.idx = nTxt;

            aAllUtterance.push(oUtterance);
        }
    }

    function onStart() {
        console.log(this);
    }
    function onEnd() {
        console.log('SpeechSynthesisUtterance.onend');
        if (this.idx === aAllUtterance.length - 1) {
            synth.cancel();
            window.Asc.plugin.executeCommand("close", "");
        }
        else if (this.idx === curTextIdx + 9 && isChrome && !oMainVoice.localService) {
            curTextIdx += 10;
            clear();
            speak();
        }
    }
    function onError (oError) {
        console.error('SpeechSynthesisUtterance.onerror');
        console.log(oError);
        synth.cancel();
        window.Asc.plugin.executeCommand("close", "");
    }

	function speak() {
        var utterThis;
        synth.cancel();

        if (synth.speaking) {
            console.error('speechSynthesis.speaking');
            synth.cancel();
            window.Asc.plugin.executeCommand("close", "");
            return;
        }
        
        console.log(utterThis);
        
        if (isChrome && !oMainVoice.localService) {
            for (var nUtter = curTextIdx; nUtter < curTextIdx + 10 && nUtter < aAllUtterance.length; nUtter++) {
                synth.speak(aAllUtterance[nUtter]);
            }

            resumeInfinity();
        }
        else {
            for (var nUtter = curTextIdx; nUtter < aAllUtterance.length; nUtter++) {
                synth.speak(aAllUtterance[nUtter]);
            }
        }
    }

    $(document).ready(function () {
        if (!synth) {
            console.error('Web speech api is not supported in this browser!');
            return;
        }
        
        initVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = initVoices;
        }

        var saved_pitch = localStorage.getItem("plugin-speech-pitch");
        if (saved_pitch)
            pitch = saved_pitch;

        var saved_rate = localStorage.getItem("plugin-speech-rate");
        if (saved_rate)
            rate = saved_rate;

        var saved_voice = localStorage.getItem("plugin-speech-voice-name");
        if (saved_voice)
            voice_name = saved_voice;
    });
    
	window.Asc.plugin.button = function(id)
	{
        synth && synth.cancel();
		this.executeCommand("close", "");
	};

    window.onunload = function()
    {
        synth && synth.cancel();
    };
})(window, undefined);