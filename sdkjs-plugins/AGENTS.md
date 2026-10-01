# ONLYOFFICE Plugin Repository Guide

This repository hosts ONLYOFFICE plugins (`content/<plugin-name>/`) served from the public
`onlyoffice.github.io/sdkjs-plugins` CDN and consumed by web, desktop, and self-hosted editors.

This guide is intended for AI agents contributing plugins to this repository. It complements the
official ONLYOFFICE plugin documentation by covering repository conventions and the issues most
commonly found during review. For everything else, refer to the official documentation:

https://api.onlyoffice.com/docs/plugins/get-started/

Whenever possible, use an existing plugin in `content/` as a reference instead of inventing your
own project structure or `config.json` layout.

---

## 1. Add `translations/langs.json`

Always include `translations/langs.json`, even if your plugin only ships English strings.

The plugin manager uses this file to determine which languages the plugin supports. This is
independent of how your plugin performs localization internally (for example, some plugins load
translations from an external service instead of bundling JSON files).

Example:

```json
[
  "en-EN",
  "de-DE",
  "fr-FR",
  "es-ES",
  "ru-RU"
]
```

English is required. All other languages are optional.

---

## 2. Write `README.md` for users

The plugin manager renders this file directly.

Write it for someone deciding whether to install the plugin, not only for developers reading the
repository. Include what the plugin does, its capabilities, and any setup steps users should know.

---

## 3. Fill in `config.json`

At minimum, make sure the following field is present:

```json
"offered": "YourNameOrOrganization"
```

This value is displayed in the plugin manager as the plugin publisher.

Also make sure `guid` is unique to your plugin — generate a fresh one, don't copy it from the
example plugin you used as a reference. It's how the plugin manager and the editor tell plugins
apart internally, so a copied or reused `guid` will collide with the plugin it was copied from.

```json
"guid": "asc.{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"
```

When creating `config.json`, prefer copying an existing plugin over writing one from scratch.

---

## 4. Provide complete icon sets

Plugins require icons in two places:

- Toolbar icons (`icons`, `icons2`)
- Plugin manager icons (`resources/store/icons`)

Support all required DPI scales (`100%`, `125%`, `150%`, `175%`, `200%`) as well as both light
and dark themes. Missing dark-theme assets are one of the most common review issues.

When unsure about sizes or directory layout, copy an existing plugin.

---

## 5. Maintain `CHANGELOG.md`

Include a changelog describing changes between releases.

The plugin manager displays this file so users can easily see what's new before updating.

---

## 6. Include third-party licenses

If your plugin bundles third-party software (React, Radix UI, npm packages, etc.), include:

- `licenses/<Package>.license` — the full license text for each dependency.
- `3rd-Party.txt` — listing each dependency, its purpose, homepage, license type, and the
  corresponding license file.

Follow the format used by existing plugins (for example, `content/zotero`).

---

## 7. Plugin licensing

The repository itself is licensed under AGPLv3.

If you include a plugin-specific `LICENSE` or `LICENSE.txt`, make sure it is compatible with the
repository's licensing requirements and does not introduce conflicting redistribution terms.

---

## 8. Use the SDK for communication

Each plugin component (background script, settings window, popup, etc.) runs inside its own
iframe.

Do not communicate by directly accessing another window's JavaScript objects. Use the SDK APIs
instead.

| Task | API |
|------|-----|
| Listen for editor events | `Asc.plugin.attachEditorEvent()` |
| Communicate with another window belonging to the same plugin | `Asc.PluginWindow`, `Asc.plugin.sendToPlugin()`, `Asc.plugin.attachEvent()` |
| Call editor APIs | `Asc.plugin.executeMethod()` |

---

## 9. Verify both themes

Before submitting a plugin, verify that it works correctly in both light and dark editor themes.

Pay particular attention to:

- icons;
- text colors;
- borders;
- backgrounds;
- custom UI components.

---

## General advice

- Follow the structure of existing plugins.
- Don't invent new `config.json` fields.
- Don't assume browser-only APIs work in desktop editors.