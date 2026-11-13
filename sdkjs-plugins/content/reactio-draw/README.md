## Overview

Draw chemical structures and reactions in ONLYOFFICE with [Reactio Draw](https://github.com/Paivel/reactio-draw),
and number the compounds of a document.

- **Plugins → Reactio Draw**: draw, press OK. The drawing goes into the document as an object; double-click it to edit
  it again. It keeps the Reactio Draw document inside, so it stays editable in the file on any computer with the plugin.
- **Plugins → Reactio Draw → Number compounds** (documents): write a mark where a number goes, in the text and in the
  drawings: `[[aldehyde]]` 1, `[[aldehyde.OMe]]` 1a, `[[aldehyde.OMe.num]]` 1.1, `[[A:catalyst]]` A. The same key gets
  the same number everywhere; drawings count first. `[[#format S{n}]]` and `[[#start 5]]` set the style and the first
  number, and start a chapter when they come after compounds. Show marks, Remove marks (numbers as plain text) and
  Final copy (and the drawings as ordinary pictures) are there too.

Works offline: Reactio Draw comes with the plugin (`reactio/index.html`, the release's web version, unchanged).

## How to use

1. Open the Plugins tab and click Reactio Draw.
2. Draw a structure or a reaction (or paste SMILES, a Molfile, CDXML…) and press OK.
3. Double-click the drawing to change it.
4. For numbers: put `[[key]]` marks in the text and under the structures, then Reactio Draw ⌄ → Number compounds → Number.

## Licence

Mozilla Public License 2.0, as Reactio Draw. The notices of the parts Reactio Draw includes are in
`reactio/THIRD-PARTY-NOTICES.md` and `reactio/LICENSES/`.

If you need more information about how to use or write your own plugin, please see
https://api.onlyoffice.com/docs/plugin-and-macros/get-started/overview/
