# Style Templates

Style Templates lets you reuse the look of a document. Save the styles of one document as a template, then apply that template to any other document with one click.

## Features

- **Save** the styles of the current document (Normal, Headings 1-9, Title, Quote, custom styles, etc.) as a named template.
- **Apply** a saved template to another document. Existing styles are updated and, optionally, missing ones are created.
- **Import** templates from Word (`.dotx`, `.docx`) and OpenOffice/LibreOffice (`.ott`, `.odt`) files, or from `.json` files exported by this plugin.
- **Export** templates to `.dotx`, `.ott` or `.json` to share them or keep a backup.
- Available in English, Spanish and Catalan.

## How to use

1. Open a document in the text editor and open **Style Templates** from the **Plugins** tab.
2. To save: type a name, optionally tick *Only styles used in this document*, and click **Save styles from the current document**.
3. To apply: open another document, find the template in **My templates** and click **Apply**.
4. To import or export, use **Import a template…** or the **Export as…** menu on each template.

No setup is needed.

## What is saved

| Text | Paragraph |
|---|---|
| Font, size, bold, italic, underline, strikethrough, caps, small caps, color, character spacing | Alignment, indents, spacing before/after, line spacing, outline level, keep with next, keep lines together |

The style inheritance (based on) is also saved.

## Limitations

- Templates are stored in the browser (`localStorage`), so they are per user and per browser. Export them to share them or back them up.
- Numbering/lists, borders, shading, tab stops and table styles are not saved.
- Importing `.dotx`/`.ott` requires a browser with `DecompressionStream` support (Chrome/Edge 80+, Firefox 113+, Safari 16.4+).
- Exported files are minimal: they contain only the styles and a sample paragraph per style.
- Requires ONLYOFFICE 9.4 or later.

## License

AGPL-3.0, see `LICENSE`.
