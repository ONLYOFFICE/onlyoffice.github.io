<!--
SPDX-License-Identifier: Apache-2.0
SPDX-FileCopyrightText: 2026 Desktiny contributors
-->

# Vietnamese document format check (ONLYOFFICE plugin)

Checks the open document against the layout rules for Vietnamese administrative
documents (*văn bản hành chính*) and lists what does not comply. It is a checker, not an
auto-formatter: it never changes the document.

*(Tiếng Việt: plugin ONLYOFFICE kiểm tra thể thức văn bản hành chính theo Nghị định
30/2020/NĐ-CP, Phụ lục I. Plugin chỉ báo lỗi, không tự sửa tài liệu.)*

**Status: version 0.1.0, not yet submitted to any marketplace. Run once in a real
ONLYOFFICE Document Server 8.3.3 (Docker) on two sample documents.** See "What has and has
not been verified".

## What it checks

Rules come from Nghị định 30/2020/NĐ-CP, Phụ lục I, Phần I. The values are in
[`src/rules.js`](src/rules.js) with the clause each one comes from.

| Check | Rule | Severity |
|---|---|---|
| Paper | A4, 210 x 297 mm (1 mm tolerance); landscape reported as a note | error |
| Margins | top and bottom 20-25 mm, left 30-35 mm, right 15-20 mm (0.5 mm tolerance) | error |
| Font | Times New Roman | error |
| Legacy encodings | fonts of the VNI, VietWare and TCVN3 families (`.VnTime`, `VNI-Times`) instead of Unicode | error |
| Colour | text is black | warning |
| Size | every element is 10-14 pt; long body paragraphs (100+ characters) are 13-14 pt | warning |
| National title | `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM`: exact wording, bold, 12-13 pt | error |
| Motto | `Độc lập - Tự do - Hạnh phúc`: exact wording, bold, 13-14 pt | error |
| Title and motto sizes | 12 with 13, or 13 with 14 (footnote 1 of the size table) | warning |

If the national title and motto are absent, the header checks are skipped with a note
(an internal memo or a draft is not an error).

## What it does not check

- Page numbers, the position of each element on the page, the signature block, the
  recipients list, document numbers and dates. The decree specifies these but the plugin
  does not read them yet.
- Per-element sizes beyond the national title and motto (for example the "Nơi nhận" block
  at 11-12 pt). Only the 10-14 pt range and the body rule are enforced.
- Text whose font or size comes from a paragraph style is reported as a note ("font
  inherited"), not guessed. A document whose font is set only in styles will show that
  note instead of a font error.
- Documents other than *văn bản hành chính* (the decree has separate rules for copies,
  and other document types follow other regulations).

## What has and has not been verified

Verified (`npm test`, Node 22, 29 tests):
- Every rule above against boundary values and violations, including wording with
  different dash characters, and that Verdana is not mistaken for a legacy font.
- The ONLYOFFICE glue against a **fake** editor API: it builds the model the checker
  expects, skips non-paragraph blocks, renders results as text (never markup), and
  `config.json` is valid and points at files that exist.
- The rule values were read from a PDF copy of Phụ lục I on 2026-10-30.

Verified by hand in ONLYOFFICE Document Server 8.3.3 (Docker image `onlyoffice/documentserver:8.3.3`,
2026-10-30), with two .docx files made by a script:
- A document that follows the rules (A4, Times New Roman, correct national title and motto):
  0 errors, 0 warnings, plus one note that margins were not checked.
- A document with deliberate faults (Letter paper, national title not upper case and not
  bold, motto at 12 pt, Arial text, a `.VnTime` run, 11 pt body text, red text): the plugin
  reported 6 errors and 3 warnings, one for each fault except the margins.
- This run found a real bug that the fake API had hidden: the margin getters do not exist in
  8.3.3, so the plugin failed and showed a misleading "header not found" note. It now
  detects the missing getters and shows an explicit note, and a failure inside the editor
  is shown as an error.
It was run once, on two small documents, in one editor version.

Not verified:
- **Other editor versions, other browsers, and real-world documents** (Word files with styles,
  tables, headers). Text whose font comes only from a style is reported as a note, not
  checked.
- **Margins need a newer editor than 8.3.3.** In a real ONLYOFFICE 8.3.3 the section
  object has no margin getters (only page width and height), so the plugin reports one note
  ("margins were not checked") instead of guessing. The margin check works only where
  `ApiSection.GetPageMarginLeft` and its siblings exist.
- **Colour** uses `ApiColor.GetRGB`, documented as available from ONLYOFFICE 9.1. It did detect
  red text on 8.3.3, but on other older builds the check may be skipped silently.
- **Icons and screenshots are first versions** drawn by the authors (a page with a check mark,
  light and dark, five scales, plus store icons). Screenshots were taken from the real editor
  in Docker (8.3.3) and are checked only for size, not for how the marketplace card renders.
- The rule values against the official gazette text, and with a records-management
  specialist.

## Run the tests

```bash
npm test
```

## Try it in ONLYOFFICE

1. Copy this folder into the editor's plugin directory (for Docs Developer or a self-hosted
   Document Server: `sdkjs-plugins/`), or load it with the Plugin Manager's "Add plugin".
2. Open a text document and start the plugin from the **Plugins** tab.

## Submitting to the ONLYOFFICE marketplace

The marketplace takes a pull request to
[`ONLYOFFICE/onlyoffice.github.io`](https://github.com/ONLYOFFICE/onlyoffice.github.io),
adding a folder under `sdkjs-plugins/content/`. Before submitting:

- Add the plugin folder to `sdkjs-plugins/content/vn-document-format` and an entry
  `{ "name": "vn-document-format", "discussion": "" }` to the repository's `store/config.json`
  (the maintainers fill in `discussion`). Their `pack-plugins` workflow builds `deploy/*.plugin`,
  so no packed file is committed.
- The marketplace repository is AGPL-3.0. Other third-party plugins there carry their own
  `offered` name and license files; this plugin is Apache-2.0 (one-way compatible with AGPL-3.0).
  The pull request should state the license and ask whether it is acceptable.
- Test in ONLYOFFICE Desktop Editors and in the Plugin Manager's dark theme, as their guide
  asks (done here only on Document Server 8.3.3 in a browser, light theme).
- Full checklist and pull request text: [docs/onlyoffice-submission.md](../../docs/onlyoffice-submission.md).

## License

Apache-2.0.
