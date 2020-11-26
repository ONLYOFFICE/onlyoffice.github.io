guessLanguage.js
====================

A natural language detection library based on trigram statistical analysis. This library is written in JavaScript and works equally well when run in either the Browser or Node.js.

#### Demo ####

An online demo is available [here](http://richtr.github.com/guessLanguage.js/).

#### Usage ####

You can clone this repo as follows:

```bash
git clone git@github.com:richtr/guessLanguage.js.git
```

You can use this library in a web page by including the following files:

```html
<script src="lib/_languageData.js"></script>
<script src="lib/guessLanguage.js"></script>
```

You can also use this library in a Node.js project. This library can be installed via [npm](https://www.npmjs.com) as follows:

```bash
sudo npm install -g guesslanguage
```

Including this library for use in a Node.js project can then be done as follows:

```javascript
var guessLanguage = require('./lib/guessLanguage');
// See the API section for usage
```

#### API ####

You can use guessLanguage.js in any of the following ways:

``` javascript
guessLanguage.detect('...input text here...', function(language) {
  console.log('Detected language code of provided text is [' + language + ']');
});
```

``` javascript
guessLanguage.name('...input text here...', function(languageName) {
  console.log('Detected language name of provided text is [' + languageName + ']');
});
```

``` javascript
guessLanguage.code('...input text here...', function(languageIANA) {
  console.log('Detected language IANA number of provided text is [' + languageIANA + ']');
});
```

``` javascript
guessLanguage.info('...input text here...', function(languageInfo) {
  console.log('Detected language code of provided text is [' + languageInfo[0] + ']');
  console.log('Detected language IANA number of provided text is [' + languageInfo[1] + ']');
  console.log('Detected language name of provided text is [' + languageInfo[2] + ']');
});
```

#### Languages Supported: 100 ####

* "ab": Abkhazian
* "af": Afrikaans
* "ar": Arabic
* "az": Azerbaijani
* "be": Belarusian
* "bg": Bulgarian
* "bn": Bengali
* "bo": Tibetan
* "br": Breton
* "ca": Catalan, Valencian
* "ceb": Cebuano
* "cs": Czech
* "cy": Welsh
* "da": Danish
* "de": German
* "el": Modern Greek
* "en": English
* "eo": Esperanto
* "es": Spanish, Castilian
* "et": Estonian
* "eu": Basque
* "fa": Persian
* "fi": Finnish
* "fo": Faroese
* "fr": French
* "fy": Western Frisian
* "gd": Scottish Gaelic, Gaelic
* "gl": Galician
* "gu": Gujarati
* "ha": Hausa
* "haw": Hawaiian
* "he": Hebrew
* "hi": Hindi
* "hr": Croatian
* "hu": Hungarian
* "hy": Armenian
* "id": Indonesian
* "is": Icelandic
* "it": Italian
* "ja": Japanese
* "ka": Georgian
* "kk": Kazakh
* "km": Central Khmer
* "kn": Kannada
* "ko": Korean
* "ku": Kurdish
* "ky": Kirghiz, Kyrgyz
* "la": Latin
* "lo": Lao
* "lt": Lithuanian
* "lv": Latvian
* "mg": Malagasy
* "mk": Macedonian
* "ml": Malayalam
* "mn": Mongolian
* "mr": Marathi
* "ms": Malay (macrolanguage)
* "nd": North Ndebele
* "ne": Nepali
* "nl": Dutch, Flemish
* "nn": Norwegian Nynorsk
* "no": Norwegian
* "nso": Pedi, Northern Sotho, Sepedi
* "or": Oriya
* "pa": Panjabi, Punjabi
* "pl": Polish
* "ps": Pushto, Pashto
* "pt": Portuguese
* "pt-BR": Portuguese (Brazil)
* "pt-PT": Portuguese (Portugal)
* "ro": Romanian, Moldavian, Moldovan
* "ru": Russian
* "sa": Sanskrit
* "sh": Serbo-Croatian
* "si": Sinhala, Sinhalese
* "sk": Slovak
* "sl": Slovenian, Slovene
* "so": Somali
* "sq": Albanian
* "sr": Serbian
* "sv": Swedish
* "sw": Swahili (macrolanguage)
* "ta": Tamil
* "te": Telugu
* "th": Thai
* "tl": Tagalog
* "tlh": Klingon, tlhIngan-Hol
* "tn": Tswana, Setswana
* "tr": Turkish
* "ts": Tsonga
* "tw": Twi
* "uk": Ukrainian
* "ur": Urdu
* "uz": Uzbek
* "ve": Venda
* "vi": Vietnamese
* "xh": Xhosa
* "zh": Chinese
* "zh-TW" Chinese (Taiwan)
* "zu": Zulu

#### Feedback ####

If you find any bugs or issues please file them on this project and I'll take a look.

Please also feel free to catch me on Twitter [@richtibbett](http://twitter.com/richtibbett/).
