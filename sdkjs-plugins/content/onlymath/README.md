# OnlyMath

OnlyMath adds a lightweight computer-algebra tool to the ONLYOFFICE **Document**
editor. Insert a math field and evaluate it in place — no external service, no
account, everything runs locally in your browser/editor.

## Features

- **Insert math** with `Alt+M`.
- **Calculate** arithmetic and symbolic expressions.
- **Solve** equations.
- **Differentiate** and **integrate** functions.
- **Precision control** in the right-side Settings panel, including a symbolic
  "Mathematical" mode that keeps `π`, `√2`, `e` exact instead of rounding.
- Danish high-school conventions: decimal comma, integration constant `k`,
  Scandinavian solution notation.

## How it works

The math is evaluated by **Giac/Xcas**, compiled to WebAssembly and run in a Web
Worker. The engine is bundled with the plugin, so OnlyMath works fully offline.

## Usage

1. Open a text document.
2. Press `Alt+M` (or use the Plugins tab) to insert a math field.
3. Type an expression; use the Plugins menu / panel actions to calculate or solve.
4. Adjust output precision in the OnlyMath **Settings** panel on the right.

## License

OnlyMath is distributed under the **GNU General Public License v3.0 or later**
(see [`LICENSE`](./LICENSE)), because it bundles and links the GPL-licensed
Giac/Xcas engine. The engine's own license is included at
`cas/giac/LICENSE`.
