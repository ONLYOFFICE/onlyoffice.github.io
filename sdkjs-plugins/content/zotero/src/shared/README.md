# Shared code of the Zotero and Mendeley plugins

Source code used by both plugins. Each plugin imports it as `@shared/...`
and builds it into its own `dist/`, so the plugins stay separate: their own
`config.json`, GUID, version, translations and package.

It lives in `src/` with the rest of the source code, so it is not part of
the Zotero plugin package either.

The code here must not depend on how a plugin stores citations in the
document (Zotero uses addin fields, Mendeley uses content controls) or on
its reference service. Those parts stay in each plugin's `src/`.

Tests of the shared code live next to it as `*.test.js` and run with the
tests of both plugins (`npm test` in `zotero/` and in `mendeley/`).
