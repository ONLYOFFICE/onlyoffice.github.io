# Naqsha for ONLYOFFICE

Draw Naqsha diagrams inside ONLYOFFICE documents, spreadsheets and presentations, the way Visio
drawings sit inside Word: the document shows (and prints) a picture of the diagram, and
double-clicking it opens the diagram again for editing.

The plugin shows the Naqsha editor from <https://nixpx.com/naqsha/app/> in the plugin window, so it
needs an internet connection, and it always runs the latest Naqsha. Pro features work as on the
web: start the trial or activate a licence from the Pro tab inside the plugin. Some browsers keep
an embedded site's storage separate, so the plugin may need its own activation (one device seat).

## Install

Package it (from the repo root):

```sh
./onlyoffice/package.sh        # → dist/naqsha-onlyoffice.plugin
```

- **ONLYOFFICE Desktop Editors:** Plugins › Plugin Manager › Install plugin manually, and choose
  `naqsha-onlyoffice.plugin`.
- **ONLYOFFICE Docs (server):** copy the `onlyoffice` folder to the server's plugins folder (for
  Docker: `/var/www/onlyoffice/documentserver/sdkjs-plugins/naqsha`) and restart, or install the
  `.plugin` file from the Plugin Manager.

Then: Plugins › Naqsha opens the editor; pick a template or draw, and press **Insert**.
Double-click an inserted diagram to edit it.

## How it works

`scripts/naqsha.js` loads `…/naqsha/app/?embed=onlyoffice` in an iframe and talks to it with
`postMessage` (the messages are described in `src/embed.rs`). On Insert the editor sends the
whole diagram (`.nqs` JSON) and a PNG of the current page; the plugin stores them as an OLE
object (`AddOleObject`, or `EditOleObject` for a diagram that is being edited). The document
keeps the diagram JSON as the object's data, so nothing is stored anywhere else.

The plugin GUID, `asc.{DA395EC3-313E-48F3-BE8D-A4217BE92C27}`, is written into every document
that holds a Naqsha diagram: never change it.

## Publishing to the ONLYOFFICE marketplace

1. Fork <https://github.com/ONLYOFFICE/onlyoffice.github.io> on GitHub and clone the fork.
2. `./onlyoffice/marketplace.sh <path to the clone>`: copies the plugin to
   `sdkjs-plugins/content/naqsha` and adds it to `store/config.json`.
3. Commit, push, and open a pull request to ONLYOFFICE/onlyoffice.github.io with the text in
   `PULL_REQUEST.md`.

For an update, raise `version` in `config.json`, add a `CHANGELOG.md` entry, and repeat.
