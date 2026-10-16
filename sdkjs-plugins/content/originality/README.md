## Overview

Check documents for AI-generated text and plagiarism with [Originality.ai](https://originality.ai/), and see how a document was written: what was typed, what was pasted, and whether the typing looks like an auto-typer.

The plugin works in the ONLYOFFICE Document Editor, version 9.2 or later. It is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop](https://github.com/ONLYOFFICE/DesktopEditors) versions of ONLYOFFICE editors.

## Features

* **AI detection.** The share of original and AI-generated text, with the sentences that look AI-written. The AI allowance sets how much AI-assisted writing is acceptable.
* **Plagiarism check.** The share of text found elsewhere and the sources, with the matching phrases.
* **Readability and fact checking**, if you turn them on.
* **Marks in the document.** Click a finding to go to its text. The ONLYOFFICE Docs Developer Edition and the desktop editors also highlight the findings in the text.
* **Writing record.** Off by default. Once turned on, the plugin records how the text changes and when keys are pressed, while the panel is open. It shows:
  * how much text was typed and how much was pasted;
  * every paste;
  * whether the typing rhythm looks natural or auto-typed.
* **Writer Replay.** Watch the document being written, jump between pastes, skip long pauses.
* **Several writers.** Each person who wrote with the panel open has their own record.
* **Tracked changes.** If the document is edited in review mode, the plugin also shows who changed how much and when, and which changes were made while no panel was recording.
* **Report.** Export the last scan as a single HTML file.

## Requirements

* An Originality.ai API key. API access is part of the Originality.ai Enterprise plan; every scan costs credits.
* Highlights in the text need the ONLYOFFICE Docs Developer Edition or the desktop editors. Other editions show the findings in the panel and select their text on click.

## How to use

1. Open the **Plugins** tab and click **Originality.ai**.
2. Click the gear button next to **Scan document**, enter your API key and choose the checks, then click **Done**.
3. On the **Scan** tab, click **Scan document**. To scan a part of the text, select at least 100 words: the button turns into **Scan selection**. You can also right-click the selection and choose **Scan with Originality.ai**.
4. To record your writing, turn on **Record my writing** on the **Writing** tab and keep the panel open while you write. The tab shows the record of the selected writer; click **Watch replay** to replay it.
5. After a scan, click **Export report** on the **Scan** tab to save its report.

## Data and privacy

* The text you scan is sent to `api.originality.ai`. With **Store scans on Originality.ai** on, Originality.ai keeps the scan in your account, and it can be shared with a link.
* The API key and the settings are kept in the browser's local storage. They are not stored in the document.
* The writing record is stored in the document itself, as one custom XML part per writer. It holds the text changes and when keys were pressed, with the kind of key (a character, Backspace, Delete, Enter, a paste or an undo), but not which character was typed. Anyone who has the file can read the record.
* The record goes wherever the file goes — deleted drafts and pasted text included. Recording is off until you turn on **Record my writing** on the **Writing** tab; use **Delete record…** there to remove your record, or everyone's, before you send the file on.

## Limitations

* One scan covers up to 10,000 words. For a longer text the plugin asks first whether to scan only its first 10,000 words; scan the rest as a selection.
* Writing is recorded only while the panel is open. Changes made with the panel closed are shown as "Changed while nothing was recording".
* The record is part of the document, so the document's editors can remove or alter it. Treat it, and the auto-typing score, as an indication, not proof.
* The record is kept in DOCX files. Other formats may drop it on save.
* Saving the record adds a step to the undo history.
* When several people write at once, the plugin tells the user's edits from the others' by the keys they pressed and where they last edited. Two people editing the same paragraph within the same second cannot be told apart.
* Tracked changes tell who changed the text and when, not whether it was typed or pasted. They disappear once accepted or rejected.

## How to install

Detailed instructions can be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/).

## Development

The plugin is plain JavaScript checked with JSDoc types; there is no build step.

```bash
npm install
npm test
npx tsc -p jsconfig.json
```
