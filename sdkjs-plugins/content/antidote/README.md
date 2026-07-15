# Antidote plugin for ONLYOFFICE

Check spelling, grammar and style with [Antidote](https://www.antidote.info/) directly from
ONLYOFFICE, and look words up in its Dictionaries and Guides.

## Requirements

- ONLYOFFICE 9.3.0+
- Antidote 12, installed and running locally (the plugin talks to Antidote's `AgentConnectix`
  daemon over a local WebSocket connection — see
  [Developer tools](https://www.antidote.info/en/antidote-12/documentation/developer-tools))

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
