This repository hosts ONLYOFFICE plugins (`content/<plugin-name>/`) served from the public
`onlyoffice.github.io/sdkjs-plugins` CDN and consumed by web, desktop, and self-hosted editors.
This guide is for AI agents writing a plugin here. Most of it is about the plugin manager UI
in the editor — a plugin isn't just code, it's also what a user sees about it before and while
installing it, and that part gets skipped more often than the code does.

The full plugin development documentation is at
[api.onlyoffice.com/docs/plugins/get-started](https://api.onlyoffice.com/docs/plugins/get-started/).
This file only covers what's most commonly missed — read the docs for anything not covered here.

## 1. `translations/langs.json`

Add `translations/langs.json` even if your plugin only ships English strings — it's what the
plugin manager uses to show users which languages a plugin supports, independent of whether
you actually localize the UI text yourself (some plugins load i18n from an external service
instead of bundling per-language JSON, but the manager still needs to know which languages are
covered). Format — a flat array of locale codes, e.g. `content/zotero/translations/langs.json`:

```json
["cs-CS", "de-DE", "es-ES", "fr-FR", "ru-RU", "ja-JA", "pt-BR", "it-IT", "ar-SA"]
```

English is required as a baseline. Every other language is optional.

## 2. `README.md`

The plugin's `README.md` is shown in the plugin manager too, not just on GitHub — write it
for an end user deciding whether to install the plugin, not only for a future contributor
reading the source.

## 3. `config.json`: fill in `offered`

`offered` is the author/vendor name shown in the plugin manager so users know who published
the plugin. Don't leave it blank or as a placeholder:

```json
"offered": "YourNameOrOrg"
```

## 4. Icons

You need icon sets for both places a plugin appears: the toolbar (if the plugin is launched
from there) and the plugin manager listing (`resources/store/icons`, referenced from
`config.json`'s `store.icons`). Look at an existing plugin's `resources/` and `config.json`
for the exact sizes/scales expected (`icons2` with `100%`/`125%`/`150%`/`175%`/`200%`,
light/dark variants) rather than guessing.

## 5. `CHANGELOG.md`

Keep one. It's shown in the plugin manager so users can see what changed between versions —
not just a nice-to-have for the repo.

## 6. Third-party code: `licenses/` + `3rd-Party.txt`

If the plugin bundles third-party code (React, Radix UI, a specific npm package, etc.), add:

- `licenses/<Name>.license` — one file per dependency, containing that dependency's license text.
- `3rd-Party.txt` in the plugin root, listing each dependency: name, short description, link,
  license type, and which file in `licenses/` it corresponds to.

Follow the existing format exactly — see `content/drawio/3rd-Party.txt` and
`content/drawio/licenses/` for a real example with multiple dependencies.

## 7. Licensing

The repository root `LICENSE` is AGPLv3. Your plugin is covered by it unless you add your own
`LICENSE`/`LICENSE.txt` in the plugin's own folder — and if you do, it must not conflict with
the AGPLv3 terms above it (e.g. don't ship a plugin-level license that tries to forbid
redistribution the root license already permits).

## 8. Cross-window communication

Every plugin window — background script, settings panel, any popup — runs in its own iframe.
Don't reach into another window directly; use the SDK's own message-passing API:

- Editor events (key presses, selection changes, etc.): `Asc.plugin.attachEditorEvent(name, cb)`.
- Talking between two windows that belong to the *same* plugin (e.g. a background script and a
  window it opened): `Asc.PluginWindow` (`.attachEvent`/`.command()` on the side that owns/opened
  the window) paired with `Asc.plugin.sendToPlugin()` / `Asc.plugin.attachEvent()` on the window's
  own side.
- Anything else host-facing: `Asc.plugin.executeMethod(name, args, cb)`.

If you can't find an existing method for what you're trying to do, ask rather than working
around it — there's almost always a sanctioned way to do it.
