# Change Log

## 1.13.0

* Rename the plugin to Autocomplete Plus and give it its own identifier, so that it can be listed in the Plugin Manager next to the original Autocomplete plugin. If you installed an earlier version from a file, remove it in the Plugin Manager before installing this one.
* Fix the settings window and the word list editor not loading when the plugin is installed from the Plugin Manager in the web editors.

## 1.12.1

* Offer a text snippet only once its whole abbreviation is typed, not for the start of it.

## 1.12.0

* Add text snippets: an abbreviation such as `mfg` suggests the text you have set for it (`Mit freundlichen Grüßen`). They are edited in the settings window.

## 1.11.1

* Fix suggestions with two capital letters at the start, such as `HAuptsächlich` for `HAu`: the second capital letter is taken as typed by accident and the word is written `Hauptsächlich`.

## 1.11.0

* Show the list of suggestions in the colors of the editor theme, so that it is dark in a dark theme.

## 1.10.1

* Fix autocomplete suggestions not appearing when typing inside brackets or quotation marks.

## 1.10.0

* Add the selected word to the personal dictionary from the right-click menu.

## 1.9.0

* Add "Pause autocomplete" and "Resume autocomplete" to the right-click menu, to switch the suggestions off for a moment. The settings window has a button for it too.

## 1.8.0

* Rank the words by how often they occur in Wikipedia as well as in film subtitles, so that the words of formal and technical writing come earlier (`Entwicklung`, `Funktion`, `implementation`).
* Add 151,000 words that are common in Wikipedia: the word list now has 409,000 words.

## 1.7.1

* A word that was chosen only once is no longer moved to the top of the suggestions; it is from the second time on.

## 1.7.0

* Add a setting to write a space after the chosen suggestion. It is switched off by default.
* Fix a personal word like "constructor", which is also the name of something built into the browser, never being suggested.
* Split the code of the background plugin into several scripts.

## 1.6.1

* Fix the suggestions starting again after backspace: deleting letters continues the word in front of the cursor, also after a space or after a suggestion was chosen. In text documents the plugin now reads that word from the document instead of remembering what was typed.
* Fix the word in front of the cursor being forgotten after the Delete key.
* In text documents, suggest for a word typed earlier when you click into it and go on typing.
* In text documents, fix a chosen suggestion overwriting other text when the cursor was moved with the mouse while the list was shown.
* No longer suggest the word that is already typed in full, and do not reopen the list right after a suggestion was chosen.

## 1.6.0

* Learn from use: the words you choose are suggested first. Can be switched off, edited and reset in the settings.
* Add a short explanation to the edit windows of the personal dictionary, the ignored words and the learned words.

## 1.5.0

* Add ignored words: words that are never suggested. Right-click a suggestion to ignore it, or edit the list in the settings.
* Fix the selected suggestion not being written in the PDF editor: the plugin did not recognise the PDF editor. In the desktop editors German nouns are now capitalised in PDFs too.

## 1.4.0

* Add a personal dictionary: your own words are suggested first and written exactly as entered.

## 1.3.1

* Fix the selected suggestion not being written in the PDF editor.

## 1.3.0

* Add a settings window (languages, capitalisation, letters before suggesting, number of suggestions), opened from the Plugins tab or the context menu.
* Add German translation of the plugin interface.

## 1.2.0

* Add German words; German nouns are suggested with a capital letter.
* Rank suggestions by word frequency and show the 30 best matches.
* Add support for the PDF editor.
* Fix every second matching word being skipped.
* Sort the dictionary once instead of on every input.

## 1.1.0

* Update to last version from [dwyl/english-words](https://github.com/dwyl/english-words).
* Change plugin type to background.

## 1.0.0

* Initial release.