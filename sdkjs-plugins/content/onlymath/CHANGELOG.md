# Changelog

All notable changes to the OnlyMath plugin are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## 1.0.0

Initial public release.

- Insert a math field with **Alt+M** and evaluate mathematics directly in the document.
- **Calculate** (`Alt+C`) expressions, **solve** (`Alt+L`) equations, **differentiate**
  and **integrate** using a built-in Giac/Xcas computer-algebra engine
  (WebAssembly, runs client-side). No plot/graph shortcut.
- Right-side **Settings** panel with output precision control (including a symbolic
  "Mathematical" mode that keeps results like π and √2 exact).
- Danish high-school notation and locale: decimal comma, integration constant `k`,
  Scandinavian solution formatting.
- Works fully offline; the CAS engine is bundled with the plugin.
