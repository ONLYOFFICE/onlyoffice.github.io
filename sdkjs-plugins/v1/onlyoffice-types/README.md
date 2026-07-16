# OnlyOffice Plugin API Types

TypeScript type definitions for OnlyOffice plugins.

## Installation

```bash
npm install @types/onlyoffice-plugins-api
```

## Usage

### For Plugins

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["types-onlyoffice-plugins-api"]
  }
}
```

Or reference directly in your TypeScript files:

```typescript
/// <reference types="types-onlyoffice-plugins-api" />
```

### Example Plugin

```typescript
// plugin.ts
window.Asc.plugin.init = function() {
    console.log('Plugin initialized');
    
    // Use Document API
    window.Asc.plugin.callCommand(function() {
        const Api = (window as any).Api;
        const doc = Api.GetDocument();
        const para = Api.CreateParagraph();
        para.AddText('Hello from plugin!');
        doc.InsertContent([para]);
    }, true);
};

window.Asc.plugin.button = function(id) {
    console.log('Button clicked:', id);
};

// Get selected text
window.Asc.plugin.getSelectedText(function(text) {
    console.log('Selected:', text);
});
```

## API Types

- **Plugin API**: `window.Asc.plugin` - Main plugin interface
- **Word API**: Types for text documents (generated from office-js-api-declarations)
- **Cell API**: Types for spreadsheets
- **Slide API**: Types for presentations

## Generating Types

Run the generation script against a local `sdkjs` checkout:

```bash
SDKJS_PATH=/path/to/sdkjs npm run generate
```

If `sdkjs-forms` is not next to `sdkjs`, set `SDKJS_FORMS_PATH` as well:

```bash
SDKJS_PATH=/path/to/sdkjs SDKJS_FORMS_PATH=/path/to/sdkjs-forms npm run generate
```

On Windows PowerShell:

```powershell
$env:SDKJS_PATH = 'E:\onlyoffice\repo\sdkjs'
$env:SDKJS_FORMS_PATH = 'E:\onlyoffice\repo\sdkjs-forms'
npm run generate
```

The generator reads JSDoc directly from the `apiBuilder.js` sources and writes the Office API types to `src/generated/`. It no longer depends on `ONLYOFFICE/office-js-api-declarations`.

## Project Structure

```
onlyoffice-types/
├── index.d.ts          # Main plugin API types
├── src/generated/      # Auto-generated Office API types
│   ├── word.ts
│   ├── cell.ts
│   └── slide.ts
├── scripts/
│   └── generate-types.js
├── example.ts          # Usage examples
├── package.json
└── tsconfig.json
```
