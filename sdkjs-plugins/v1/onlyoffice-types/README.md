# OnlyOffice Plugin API Types

TypeScript type definitions for OnlyOffice plugins.

For the official plugin API reference, guides, and examples (not TypeScript-specific), see
[api.onlyoffice.com/docs/plugins/get-started](https://api.onlyoffice.com/docs/plugins/get-started/).
This package only adds TypeScript types on top of that API.

## Installation

```bash
npm install @onlyoffice/plugins-types
```

## Usage

Add the root package and the entry point for the editor your plugin supports to your `tsconfig.json`
(`/word`, `/cell`, `/slide`, or `/pdf`):

```json
{
  "compilerOptions": {
    "types": ["@onlyoffice/plugins-types", "@onlyoffice/plugins-types/word"]
  }
}
```

The editor entry point declares the matching global `Api` type inside `callCommand`; the root
package intentionally does not declare a cross-editor `Api` intersection, so only include one
editor's entry point per project. Alternatively, reference it directly in a file:
`/// <reference types="@onlyoffice/plugins-types/word" />`.

```typescript
// plugin.ts
window.Asc.plugin.init = function() {
    window.Asc.plugin.callCommand(function() {
        const doc = Api.GetDocument();
        const para = Api.CreateParagraph();
        para.AddText('Hello from plugin!');
        doc.InsertContent([para]);
    }, true);
};

window.Asc.plugin.button = function(id) {
    console.log('Button clicked:', id);
};

window.Asc.plugin.executeMethod("GetSelectedText", [], function (text) {
    console.log('Selected:', text);
});
```

## API Types

Every editor's API is generated into its own TypeScript namespace (`Word`, `Cell`, `Slide`, `Forms`,
`Pdf`), so same-named classes across editors never collide - any type from any editor is importable
regardless of which editor's entry point your `tsconfig.json` declares:

```typescript
import type { Word } from "@onlyoffice/plugins-types/word";

window.Asc.plugin.callCommand(function() {
    const wordApi: Word.Api = Api;
    console.log(wordApi.GetDocument().GetAllParagraphs()[0].GetText());
});
```

`Cell`/`Slide`/`Pdf` follow the same pattern from `@onlyoffice/plugins-types/cell`, `/slide`, `/pdf`.
`Api<T>` (from the root package) also resolves the entry-point class generically, e.g. `Api<"word">`
is `Word.Api`.

`window.Asc.plugin.executeMethod` is typed per editor, by method name and argument tuple
(`WordMethodArgs`/`CellMethodArgs`/`SlideMethodArgs`/`PdfMethodArgs`/`FormsMethodArgs`). One documented
trap: `GetMacros`/`SetMacros` (all editors) use a raw JSON **string** wire format - `JSON.parse`/
`JSON.stringify` it yourself.

`attachEditorEvent`/`detachEditorEvent` are typed the same way per editor
(`Word.EditorEventArgs`/...), and `attachEvent`/plugin-window-level events (`onContextMenuShow`,
`onWindowResize`, ...) are typed via `PluginEventMap` - an unknown event name in either case falls
back to a loose `unknown[]`/`unknown` overload rather than `any`.

```typescript
window.Asc.plugin.attachEditorEvent("onParagraphAdd", (data) => {
    console.log(data.InternalId); // data: { InternalId: string }
});
```

## config.json Schema

`schemas/config.schema.json` validates a plugin's `config.json` (generated from this package's own
`PluginConfig`/`VariationConfig`/`ButtonConfig` types, so it can't drift). Point your editor at it:

```json
{
  "$schema": "https://raw.githubusercontent.com/ONLYOFFICE/onlyoffice.github.io/master/sdkjs-plugins/v1/onlyoffice-types/schemas/config.schema.json",
  "name": "My Plugin"
}
```

or map `sdkjs-plugins/content/*/config.json` to it once in your editor's settings instead of editing
every `config.json` (VS Code: `json.schemas`).

## Modular entry points

The root package remains the compatibility entry point. The same runtime types are also available by
layer for smaller imports: `@onlyoffice/plugins-types/plugin` (`AscPlugin`, events, buttons),
`/plugin/events`, `/plugin/buttons`, `/config`, `/services` - type-only re-exports of the same
declarations the root package uses, so existing root imports remain compatible.

## Versioning

This package's version tracks the ONLYOFFICE editor version its types were generated from, the same
way [`@onlyoffice/doceditor-types`](https://www.npmjs.com/package/@onlyoffice/doceditor-types) tracks
Docs Server:

| Package version | Editors (sdkjs) version |
| --------------- | ----------------------- |
| 9.5.0           | 9.5.0                   |

Pick the package version matching the editors you target. Because the version identifies a product
release rather than the shape of the type surface, it is **not** semver over these declarations: a
new editor release can rename or retype an API in any version segment, so a type-level breaking
change can arrive in what looks like a patch. Pin exactly (`"@onlyoffice/plugins-types": "9.5.0"`)
if that matters to you, and read the [changelog](CHANGELOG.md) before moving between editor
versions. The exact source commit each release was generated from is recorded in
`src/generated/generation-manifest.json`.

## Contributing / how the types are generated

See [CONTRIBUTING.md](CONTRIBUTING.md) for the generator pipeline, type-checking scripts, the
ambient bundle and machine-readable index, and the project layout.

## License

[Apache-2.0](LICENSE), Copyright 2026 Ascensio System SIA - the same license as
[`@onlyoffice/doceditor-types`](https://www.npmjs.com/package/@onlyoffice/doceditor-types), so these
declarations can be consumed by plugins under any license. Note that this covers the type
declarations only; the ONLYOFFICE editors themselves (`sdkjs`, from whose JSDoc these types are
generated) remain under AGPL-3.0-or-later.
