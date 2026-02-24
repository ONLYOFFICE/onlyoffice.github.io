# Bergamot Translator Plugin for ONLYOFFICE

An offline machine translation plugin for ONLYOFFICE editors, powered by the Bergamot neural machine translation engine.

## Features

- **Offline Translation**: Works without internet connection after models are downloaded
- **Privacy-Friendly**: All translation happens locally in your browser using WebAssembly
- **Neural Machine Translation**: High-quality translations using the same technology as Firefox Translations
- **Multi-Language Support**: Supports translation between many European languages
- **Automatic Text Detection**: Automatically translates selected text in the document
- **Manual Input**: Option to manually enter text for translation

## Supported Language Pairs

The plugin supports translation between the following languages:

- English
- German
- Spanish
- French
- Italian
- Portuguese
- Polish
- Dutch
- Russian
- Ukrainian
- Czech
- Bulgarian
- Estonian
- Norwegian (Bokmal and Nynorsk)
- And more...

## How It Works

1. **First Use**: The plugin downloads the translation engine (WASM) and selected language models
2. **Model Caching**: Models are cached in your browser for offline use
3. **Translation**: Text is translated locally using neural machine translation

## Technical Details

- Uses [Bergamot Translator](https://github.com/browsermt/bergamot-translator) - a WebAssembly port of the Marian NMT framework
- Models are provided by [Mozilla Firefox Translations](https://github.com/mozilla/firefox-translations-models)
- Part of the [Bergamot Project](https://browser.mt/) funded by the European Union

## Usage

1. Install the plugin in your ONLYOFFICE editor
2. Select text you want to translate
3. Choose source and target languages
4. Click "Insert to document" to replace selected text with translation
5. Or click "Copy" to copy the translation to clipboard

## License

Apache License 2.0

## Third-party

* Bergamot Translator ([MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/))
* Firefox Translations Models ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/))
* jQuery ([MIT](https://opensource.org/licenses/MIT))
* Select2 ([MIT](https://opensource.org/licenses/MIT))
* Marian NMT ([MIT](https://opensource.org/licenses/MIT))
