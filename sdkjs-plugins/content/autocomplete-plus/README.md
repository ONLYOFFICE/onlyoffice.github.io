# Autocomplete Plus for ONLYOFFICE

A plugin for ONLYOFFICE editors that suggests German and English words while you type, most common words first. It works in documents, spreadsheets, presentations and PDFs.

> **This is a fork** of the Autocomplete plugin from [ONLYOFFICE/onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/autocomplete). The original plugin is the work of Ascensio System SIA and the ONLYOFFICE contributors. This repository keeps its history and adds the features below.

## Fork features

| Feature | Original plugin | This fork |
|---|---|---|
| Languages | English | German and English |
| Word list | 370,000 words, unranked | 409,000 words, most common first |
| German nouns | - | Capitalised (`hau` → `Haus`) |
| Personal dictionary | - | Yes |
| Ignored words | - | Yes |
| Text snippets | - | Yes (`mfg` → `Mit freundlichen Grüßen`) |
| Learns the words you choose | - | Yes |
| Continues a word after backspace | - | Yes |
| Settings window | - | Yes |
| PDF editor Support | - | Yes |
| ONLYOFFICE Theme Support | - | Yes |
| Interface languages | English | English and German |

It also fixes various performance issues and was refactored.

## Installation

1. Download `autocomplete.plugin` from the [latest release](https://github.com/devilAPI/onlyoffice-autocomplete-plus/releases/latest).
2. If the original Autocomplete plugin or a version of this plugin before 1.13.0 is installed, remove it first in *Plugins → Plugin Manager*: otherwise both suggest words.
3. In the editor, open *Plugins → Plugin Manager → Available plugins → Install plugin manually* and select the downloaded file.
4. Restart the editor.

The plugin is compatible with the [desktop](https://github.com/ONLYOFFICE/DesktopEditors) and [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) versions of ONLYOFFICE editors. For ONLYOFFICE Docs, see the [installation instructions](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/) in the ONLYOFFICE API documentation.

## Usage

1. Start typing. After three letters a list of suggestions appears.
2. Press Enter to take the first word, or pick another one with the arrow keys or a click. Keep typing to narrow the list; Escape closes it.

The plugin runs in the background. You can switch it on and off in the list of background plugins on the Plugins tab.

To switch the suggestions off for a moment, right-click in the document and choose **Pause autocomplete**; **Resume autocomplete** in the same menu brings them back. The settings window has a **Pause** button that does the same. The pause also ends when the editor is restarted.

Deleting letters does not start over: the suggestions continue with the word in front of the cursor, also after a space or after a suggestion was chosen.

In text documents the plugin reads that word from the document, so it also works when you click into a word typed earlier and go on typing. Spreadsheets, presentations and PDFs do not offer that: there the plugin knows only what you typed since you last moved the cursor, and starts a new word after you move it.

In the PDF editor of the self-hosted version a plugin cannot replace text you have typed, so there the suggestion completes the word in the case you typed it: German nouns are not capitalised for you. The desktop editors are not affected.

## Settings

Click the **Autocomplete** button on the Plugins tab, or right-click in the document and choose **Autocomplete settings**.

| Setting | Meaning | Default |
|---|---|---|
| German | Suggest German words | On |
| English | Suggest English words | On |
| Capitalise German nouns | Suggest `Haus` when you type `hau` | On |
| Show the words I choose first | Words you picked before move to the top of the list | On |
| Add a space after the chosen word | Write a space after the suggestion you choose, so you can go on with the next word | Off |
| Letters before suggesting | Letters you type before the suggestions appear, 1 to 6 | 3 |
| Maximum number of suggestions | 1 to 100 | 30 |

### Personal dictionary

In the settings window, click **Edit** next to *Personal dictionary* and enter your own words, one per line: names, technical terms, abbreviations. They are suggested before all other words and written exactly as you entered them, so `onl` offers `OnlyOffice`.

To add a word from your text, select it, right-click and choose **Add "…" to personal dictionary**. The item appears when a single word is selected that is not in the personal dictionary yet. If the word was among the ignored words, it is removed from them.

### Ignored words

To stop a word from being suggested, right-click it in the list of suggestions. To review the ignored words or bring one back, click **Edit** next to *Ignored words* in the settings window.

### Text snippets

In the settings window, click **Edit** next to *Text snippets* and enter an abbreviation and its text on each line:

```
mfg = Mit freundlichen Grüßen
tel = +49 30 1234567
```

Type the whole abbreviation and the text is offered at the top of the suggestions as `mfg → Mit freundlichen Grüßen`; choose it to replace the abbreviation with the text. The start of an abbreviation does not offer it. It is offered however short the abbreviation is, so `lg` works with *Letters before suggesting* at 3. An abbreviation is made of letters and digits, and a text is a single line. Snippets are not offered where the plugin cannot replace the typed letters (a PDF editor that does not allow it).

### Learned words

The plugin remembers each suggestion you choose. A word you have chosen at least twice is shown before the others: the more often you pick a word, the higher it appears. In the settings window, **Edit** next to *Learned words* lists them with the number of times you chose each; delete a line to forget that word. **Reset** forgets them all.

The settings, both word lists and the learned words are stored in the editor on your device.

## Development

| Path | Content |
|---|---|
| `index.html`, `scripts/code.js` | The background plugin: starts the parts below, toolbar button and context menu item |
| `scripts/store.js` | The settings, the personal dictionary, the ignored words, the text snippets and the learned words |
| `scripts/dictionary.js` | Loads the word list and finds the suggestions for the typed letters |
| `scripts/editor.js` | What the plugin can do in the editor it runs in, and writing into the PDF editor |
| `scripts/typing.js` | Follows the word in front of the cursor, shows the suggestions and writes the chosen one |
| `scripts/windows.js` | Opens the settings window and the word list editor and saves what they return |
| `settings.html`, `scripts/settings.js` | The settings window |
| `wordlist.html`, `scripts/wordlist.js` | The editor for the personal dictionary, the ignored words, the text snippets and the learned words |
| `dictionaries/words.txt` | The word list |
| `translations/` | Interface translations |
| `tools/build_words.py` | Builds the word list |
| `deploy/autocomplete.plugin` | The installable package |

### How the word list is built

`dictionaries/words.txt` lists one word per line, most frequent first. A tab followed by `d` or `e` marks a word as only German or only English. `tools/build_words.py` downloads the sources and writes the file:

```
python3 tools/build_words.py
```

Each language has a spelling list, which decides what is a word, and two frequency lists, which decide how common it is:

| | German | English |
|---|---|---|
| Spelling list | wordlist-german, 1.9 million word forms | english-words, 370,000 words |
| Everyday language | OpenSubtitles 2018, 156 million words of film subtitles | OpenSubtitles 2018, 735 million words |
| Formal language | German Wikipedia (2022), 863 million words | English Wikipedia (2023), 2.5 billion words |
| A word is kept if it occurs | 3 times in the subtitles or 50 times in Wikipedia | 10 times in the subtitles or 50 times in Wikipedia |
| Words kept | 307,000 | 113,000 |

For each language the script does this:

1. It takes the words of the spelling list that have at least four letters and consist only of the letters a to z, ä, ö, ü and ß. Shorter words are left out because the suggestions appear after three letters. The frequency lists are full of names, typos and foreign words; a word that is not in the spelling list is dropped.
2. It counts how often each of these words occurs per million words in the subtitles and in Wikipedia, and takes the mean of the two as the frequency of the word. The subtitles alone favour spoken language (`Entschuldigung` before `Entwicklung`); Wikipedia adds the vocabulary of school, work and technical writing.
3. It keeps the words that occur often enough in at least one of the two, as given in the table. The numbers differ because the collections of text differ in size.

Then the two languages are put together:

* The list is ordered by frequency. A word found in both languages, like `system`, is listed once with the higher of its two frequencies.
* A word is marked as only German or only English if it is at least 20 times more frequent in that language, or not found in the other at all. The remaining 10,000 words belong to both and are suggested whichever language is switched on.
* The frequency lists are all lower case. A German word gets its capital letter back from the spelling list, which has `Haus` but not `haus`. This is not done if the word is more frequent in English.

The result is 409,000 words: 296,000 only German, 103,000 only English.

After changing the plugin, repack it from the repository root:

```
rm deploy/autocomplete.plugin
zip -r deploy/autocomplete.plugin . -x 'deploy/*' 'tools/*' '.git/*' '.github/*' '.gitignore' 'LICENSE' 'IDEAS.md'
```

### Releasing

Raise the version in `config.json`, describe the changes in `CHANGELOG.md`, then run the **Release** workflow from the Actions tab. It builds the plugin and publishes it as a GitHub release named after the version.

## Credits

* [ONLYOFFICE](https://github.com/ONLYOFFICE/onlyoffice.github.io) - the original Autocomplete plugin (GNU AGPL v3.0).
* [FrequencyWords](https://github.com/hermitdave/FrequencyWords) by Hermit Dave - word frequencies built from OpenSubtitles 2018 (content licensed CC BY-SA 4.0).
* [wikipedia-word-frequency](https://github.com/IlyaSemenov/wikipedia-word-frequency) by Ilya Semenov - word frequencies built from the German and English Wikipedia (MIT; Wikipedia text is licensed CC BY-SA).
* [wordlist-german](https://gist.github.com/MarvinJWendt/2f4f4154b8ae218600eb091a5706b5f4) by Marvin Wendt - German spelling list used to filter the frequency data.
* [english-words](https://github.com/dwyl/english-words) by dwyl - English spelling list used to filter the frequency data (Unlicense).

## License

Like the original, this plugin is licensed under the GNU Affero General Public License v3.0. See [LICENSE](LICENSE) for more information.
