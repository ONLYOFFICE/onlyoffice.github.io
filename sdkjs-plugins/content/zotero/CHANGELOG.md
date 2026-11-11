# Change Log

## 1.0.0

* Initial release.

## 1.0.1

* Add translations for Japanese and Chinese languages.
* Add ability to work with fields instead of text.
* Add ability to update links and bibliography.

## 1.0.2

* Fix the problem with IE.

## 1.0.4

* Update jquery version.

## 1.0.5

* Offline mode support for the Desktop Editors.
* Ability for users to upload custom citation styles.
* Add support for styles that inherit behavior from parent styles.
* Fix bibliography sorting issues.
* Fix citation numbering issues.
* Improved compatibility with MS Word.
* Remove extra blank lines in bibliography.

## 1.0.6

* Refreshed interface for better usability.
* The ability to choose which library to search in.
* Ability to add prefix and suffix.
* "Omit Author" feature.
* Citation locators support: Added ability to include page numbers, chapters, sections, and other location references in citations.

## 1.0.7

* Formatting text when inserting a bibliography using the Zotero plugin.
* Preserve formatting and editing of manual citations.
* Sorting bibliography according to style.
* Do not show attached files in search results.
* Support for styles with footnotes and endnotes.
* Ability to edit citations via the context menu.
* Improved handling of repeated citations (e.g., automatic `Ibid.` support).
* Added bibliography formatting feature. Starting from version 9.4.0, this feature will be fully supported.

## 1.0.8

* Added the ability to edit citations by adding new sources to them.

## 1.0.9

* Fixed a bibliography formatting issue.

## 1.1.0

* Improved the styling of the bibliography.
* Add MEDLINE journal title abbreviation option.
* Add option to include URLs of paper articles.
* Add bibliography preview to the settings page.
* Fix incorrect "(Version N)" appearing in bibliographies (e.g. APA 7th edition) for items with no real citable version.

## 1.1.1

* Fix loading more search results when scrolling: further pages of group libraries never loaded, and they stopped your own library from loading more too.
* Fix scrolling the search results: a touchpad swipe jumped to the end of the list, and the scroll bar kept following the pointer after the mouse button was released outside the plugin.
* Fix inserting a citation inside a footnote or endnote, which created a note within the note.
* Fix the formatting of citations inside footnotes and endnotes.
* Speed up inserting and refreshing citations.
* Show sources already cited in the document first in the search results.
* Keep the citation style in the document, so it stays available offline and on other computers.* Add settings to stop inserting a citation from updating the other citations and the bibliography.
* Add the Advanced page with a button that restores citations turned into plain text, for example by copying them from another document.

## 1.2.0

* Replace an editor API call deprecated starting from version 10.0.3.
* Add drag-and-drop reordering of sources in the citation editing window.
* Store the citation style in the document properties the way the Zotero plugin for Word does, so the style is kept when the document is opened in Word and restored when it is opened here.
* Refresh re-reads the cited items from Zotero, so changes made in the library reach the document. The items are fetched before the document is locked, with progress shown, so the editor stays usable meanwhile, and up to 50 at a time instead of one request per item.
* Add the missing contributors (editors, translators, series editors and others) and item fields (DOI, ISBN, ISSN, container and collection titles) to citations.
* Keep an item's abstract in the document only when the citation style uses it.
* Search in drop-down lists matches items that contain all the typed words.
* Reload the group libraries after reconnecting to Zotero, for example with another account.
* Load search results through the Zotero desktop app page by page while scrolling, as with the web API, instead of all at once.
* Search through the Zotero desktop app up to five times faster: one request per page instead of two, and only top-level items are searched.
* Search results and the list of recent items show only top-level items: notes and attachments inside an item cannot be cited and no longer fill the pages of results. Group libraries skip standalone attachments too, as your own library already did.
* Load further search results only when the list is scrolled to its end, one library at a time: your own library first, then the groups in the order of the library filter.
* Show the loading indicator while further search results load, and keep it until every library has answered.
* Send requests to the Zotero web API one at a time and wait when Zotero asks to slow down, instead of several at once that ran into its rate limit. A new search drops the requests the previous one still had waiting.

## 1.2.1

* Search in collections: the library filter shows the collections of each library as a tree, loaded when a library is opened. A checked library or collection is searched whole, subcollections included; a partly checked one only in its checked collections.
* Refresh restores the citations of a document Zotero converted for moving between word processors ("Switch to a Different Word Processor…"): the links become citations again and the document's citation style and language are applied.
