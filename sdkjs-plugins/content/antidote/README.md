# Antidote plugin for ONLYOFFICE

Check spelling, grammar and style with [Antidote](https://www.antidote.info/) directly from
ONLYOFFICE, and look words up in its Dictionaries and Guides.

## Requirements

- ONLYOFFICE 9.3.0+
- Antidote 12, installed and running locally (the plugin talks to Antidote's `AgentConnectix`
  daemon over a local WebSocket connection — see
  [Developer tools](https://www.antidote.info/en/antidote-12/documentation/developer-tools))

### Browser limitations

In the desktop app, this connection always works. In a browser, some (notably Chrome 142+) restrict
a page's access to `127.0.0.1`/`localhost` behind a permission that ONLYOFFICE's plugin iframe
doesn't currently delegate — the connection then fails silently, with no prompt for the user to
approve. This is known to work when the plugin is installed directly onto the same server that
serves the editor itself (so the plugin's iframe is same-origin with the editor), and to fail when
the plugin is only referenced live from an external URL (e.g. a marketplace/CDN). If browser support
matters for your deployment, install the plugin on the document server rather than linking it
externally, or use the desktop app instead.

## Development

```bash
npm install
npm run dev      # Vite dev server
npm run build    # type-checks then builds dist/index.js + dist/index.css
npm run lint
```

## Architecture

- `src/api/document-editor.ts` — ONLYOFFICE document access (selection + whole-document paragraphs)
- `src/api/antidote.ts` — resolves the Connectix WebSocket port (manual override or auto-detected)
- `src/features/correction` — the "Corrector" flow: `DocumentCorrectionAgent` (whole document,
  word only) and `SelectionCorrectionAgent` (selection, any editor type), both implementing
  `@druide-informatique/antidote-api-js`'s `WordProcessorAgent`
- `src/features/lookup` — the "Dictionaries"/"Guides" flow, a one-shot read-only zone
- `src/pages` — `Main` (scope toggle, check, lookup) and `Settings` (manual Connectix port)
- `src/components` — small owned UI kit (button/input/layout/state), styled against
  `sdkjs-plugins/v1/plugins.css`

## Attribution

Uses `@druide-informatique/antidote-api-js` (MIT, © Druide informatique inc.), `preact`,
`preact-iso`, and `@preact/signals` — see [3rd-Party.txt](3rd-Party.txt) and [licenses](licenses).
