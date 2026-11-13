# Third-party components

Reactio Draw is licensed under the Mozilla Public License 2.0 (see `LICENSE`).
It includes or uses the components below; each keeps its own license. Full texts are in `LICENSES/`.

## Included in the program

| Component | Used for | License | Copyright | Source |
| --- | --- | --- | --- | --- |
| OpenChemLib (openchemlib-js 9.25.1), with its MMFF94 tables and torsion data | 3D shapes, stereo SMILES, structure comparison | BSD-3-Clause | © 2015–2017 cheminfo (JS); © 1997–2016 Actelion Pharmaceuticals Ltd. / Idorsia (Java core) | https://github.com/cheminfo/openchemlib-js |
| InChI library 1.07 (compiled to WebAssembly from the unchanged C source; `tools/inchi`) | InChI and InChIKey of a structure | MIT (`LICENSES/InChI-MIT.txt`) | © 2024 InChI Project (InChI Trust / IUPAC) | https://github.com/IUPAC-InChI/InChI |
| OPSIN 2.9.0 (`opsin-2.9.0.jar` in `tools/` on Windows and Linux, `opsin.jar` on the Mac; shipped unchanged) | name → structure | MIT | © 2017 Daniel Lowe | https://github.com/dan2097/opsin |
| Libraries inside the OPSIN jar: jna-inchi 1.3.1 with InChI 1.07, JNA, Apache Log4j 2.25.3, Woodstox 7.1.1, StAX2 4.2.2, Apache Commons IO 2.21.0 and CLI 1.11.0, dk.brics.automaton 1.12-4, MSV xsdlib 2022.7, ISO RELAX | used by OPSIN | LGPL-2.1-or-later (jna-inchi), Apache-2.0 or LGPL-2.1 (JNA), Apache-2.0, BSD-2-Clause, BSD-3-Clause, MIT | their authors | the full list with versions, licenses and sources: `LICENSES/OPSIN-bundled-libraries.txt` |
| ReShiki: journal style values, color themes and the CDX property table (data; ReShiki takes the CDX table from the published CDX documentation of CambridgeSoft, the CDX SDK archived by IUPAC FAIRSpec) | drawing styles, color themes, CDX reading and writing | MIT OR Apache-2.0 (used under MIT) | © 2026 Ameyanagi and ReShiki contributors | https://github.com/Ameyanagi/ReShiki |
| OPSIN 2.8.0 compiled to JavaScript (`names/opsin.js`, `names/opsin-data.bin`; taken unchanged from Octet Draw, inside the page as the name reader) | name → structure in the page, the browser included | MIT (OPSIN); Apache-2.0 (TeaVM 0.16.0, StAX API, Octet Draw's own classes); BSD-3-Clause (dk.brics.automaton); Unicode-3.0 (Unicode data) | © 2017 Daniel Lowe; © 2026 Sam Ellis; their authors | https://github.com/SamChemMan/Octet-Draw ; all notices: `LICENSES/OPSIN-js-NOTICES.txt`, `LICENSES/Octet-Draw-Apache-2.0.txt` |
| Octet Draw's structure → name module (`names/octet-namer.js`: its `src/namer.ts` and `src/complexes.ts` (names of coordination compounds) with the files they import, at commit 1296e6b, types and comments taken out by `tools/bundle_octet.cjs`, otherwise unchanged) | structure → name (Alternative name), complexes included; the IUPAC numbers on the atoms (Numbering) | Apache-2.0 (`LICENSES/Octet-Draw-Apache-2.0.txt`) | © 2026 Sam Ellis | https://github.com/SamChemMan/Octet-Draw |
| Octet Draw's reader of condensed formulas (`names/octet-condensed.js`: its `src/condensed.ts` and `src/labels.ts` at commit 1296e6b, types and comments taken out by `tools/bundle_octet.cjs`, otherwise unchanged) | CH3CH2OH, PhCH2OH… → structure (Paste name, text to structure) | Apache-2.0 (`LICENSES/Octet-Draw-Apache-2.0.txt`) | © 2026 Sam Ellis | https://github.com/SamChemMan/Octet-Draw |
| go-webview2 (Windows app) | window and web view | MIT | © 2020 John Chadwick; portions © 2017 Serge Zaitsev | https://github.com/jchv/go-webview2 |
| go-ole code inside go-webview2 (`pkg/edge/guid.go`, adapted; Windows app) | COM GUIDs | MIT (`LICENSES/go-ole-MIT.txt`) | © 2013–2017 Yasuhiro Matsumoto | https://github.com/go-ole/go-ole |
| golang.org/x/sys (Windows app) | Windows system calls | BSD-3-Clause | © 2009 The Go Authors | https://go.googlesource.com/sys |
| Microsoft WebView2Loader.dll (beside the Windows app as WebView2Loader-x64.dll or WebView2Loader-arm64.dll, unchanged and Microsoft-signed) | starting Edge WebView2 | BSD-3-Clause | © Microsoft Corporation | [WebView2 SDK](https://www.nuget.org/packages/Microsoft.Web.WebView2) |
| purego 0.8.4 (Linux app) | loading GTK and WebKitGTK at start | Apache-2.0 | © 2022 The Ebitengine Authors | https://github.com/ebitengine/purego |
| cdxmorph 1.49.0 (Python), its way of pairing two drawings atom by atom (place, label and bonds, Hungarian assignment, growing a pairing along the bonds) and of moving the atoms between them, rewritten in JavaScript in the page (`animMatch…`, `animPlaces`); its example drawing, saved again by Reactio Draw as `examples/Animation - 3D turns and a reaction.cdxml` | File → Export as → Animation; the example to try it | MIT (`LICENSES/cdxmorph-MIT.txt`) | © 2026 Ryan Shenvi | https://github.com/rshenvi/cdxmorph |

## Data included in the program

| Data | Used for | License | Note |
| --- | --- | --- | --- |
| NMR shift tables derived from nmrshiftdb2 (export 2026-03-15, measured spectra) | NMR prediction | nmrshiftdb2 Database License (`LICENSES/nmrshiftdb2-Database-License.txt`) | Contains information from nmrshiftdb2 (https://nmrshiftdb.nmr.uni-koeln.de), which is made available here under the nmrshiftdb2 Database License. The derivative tables and the code that makes them are in `data/nmr/`. |
| The look of the 3D styles from xyzrender's presets (default, tube and vdw): ball, bond and outline sizes as fractions of the van der Waals radius, the shading tints and the depth fog values | 3D styles (Ball and stick, Tubes, Spheres) | MIT (`LICENSES/xyzrender-MIT.txt`) | © 2026 Alister S. Goodfellow, https://github.com/aligfellow/xyzrender (commit 828e721e40b18f1944c87f949ce224af812dc649); only these values were taken, the drawing is Reactio Draw's own code |
| Octet Draw's name tables (`names/octet-names.json`: abbreviations and names of solvents, reagents and ligands, drugs and natural products, from its `src/common.ts` and `src/drugs.ts`) | names to structures | Apache-2.0 (`LICENSES/Octet-Draw-Apache-2.0.txt`) | © 2026 Sam Ellis, https://github.com/SamChemMan/Octet-Draw (commit 1296e6b3bf81eecfc6bd3e36956f88ef9198485b); written out as JSON, the entries unchanged |
| Drawings of 83 natural products and drugs from ChEBI (`names/depictions.txt`: atom places, bonds and wedges, each checked against its InChIKey) | a structure added from a name or SMILES that is one of them is drawn as chemists draw it (strychnine, paclitaxel, morphine, steroids…) | CC BY 4.0 (`LICENSES/ChEBI-NOTICE.txt`) | EMBL-EBI, ChEBI, https://www.ebi.ac.uk/chebi/ ; coordinates rounded to 0.01, otherwise unchanged |
| Dictionary of compound names from Wikidata (`names/dictionary.tsv.gz`: 28,880 compounds with common, trade and other names, CAS numbers and InChIKeys), as selected by Octet Draw | names, CAS numbers and InChIKeys to structures | Wikidata: CC0 1.0 (`LICENSES/Wikidata-NOTICE.txt`); the selection: Apache-2.0 | Wikidata contributors, https://www.wikidata.org ; selection © 2026 Sam Ellis (Octet Draw); unchanged |
| Abbreviations and reagent names from the Beilstein Chemical Lookup Collection (BChemLookup, 2026-10-08) | atom labels (OTES, DMTr, 2-py…), names to structures, reagents written as text | CC0 1.0 Universal | Beilstein-Institut, https://github.com/Beilstein-Institut/BChemLookup ; only entries Reactio Draw did not know, each group rewritten with its attachment atom first |
| Dimorphite-DL's table of ionizable substructures (`site_substructures.smarts`: 65 group SMARTS with the mean pKa and standard deviation of each site) | pKa (typical) in Properties and in the API's analyze | Apache-2.0 (`LICENSES/Dimorphite-DL-Apache-2.0.txt`) | Durrant lab, https://github.com/durrantlab/dimorphite_dl (commit 69ec38e964bd2b2a9d4543df3f13f8d61063f553); Ropp et al., J. Cheminform. 2019, 11, 14. Copied as a table into the page, values rounded to 0.01; a short group name and acid/base added to each row; the matching is Reactio Draw's own code |

## Used but not included

| Component | Used for | License | Note |
| --- | --- | --- | --- |
| openclatura | structure → name (“Name it”) | MIT | installed by the user (`pip install openclatura`); run unchanged; https://github.com/lamalab-org/openclatura |
| RDKit | used by openclatura | BSD-3-Clause | installed with openclatura |
| Java runtime, Python | run OPSIN and openclatura | their own licenses | installed by the user |
| GTK 3, WebKitGTK (Linux app) | the window and the page | LGPL-2.1-or-later (and BSD for parts of WebKit) | the system's own libraries, loaded at start; not shipped |

## Data and references (facts, no code copied)

- Atomic weights, monoisotopic masses, isotope abundances: IUPAC/NIST values.
- MMFF94 force field (in OpenChemLib): T. A. Halgren, J. Comput. Chem. 1996, 17, 490; MMFF94s: T. A. Halgren, J. Comput. Chem. 1999, 20, 720.
- CDX tag numbers and enumerations: the CDX property table of ReShiki (`crates/io/src/exchange/schema.rs`, `decode.rs`, `values.rs`, and `reference/engine/cdx_schema.py`, commit 50453022fb59f8f79b03996f2d4e5cb24f68654e; MIT / Apache-2.0, see above). ReShiki generated it from the published CDX format documentation (CambridgeSoft CDX SDK, “Table of Properties”, which describes the format as being in the public domain; archived at https://iupac.github.io/IUPAC-FAIRSpec/cdx_sdk/TableOfProperties.htm). All 269 codes also appear in `CDXConstants.h` of Revvity's open-source ChemDraw file format library (BSD-3-Clause, © 1986–2025 CambridgeSoft Corp, Revvity Inc and others; https://github.com/Glysade/chemdraw, commit 5dd743230d75ecacacdf8dcd0b0e022f13173b9c), the stoichiometry grid of ChemDraw (objects 0x8022–0x8024, properties 0x1200–0x1208, also in that library's `CDXML.dtd`) included; 266 of the 269 data types agree, the other three are ReShiki's corrections (0x0013, 0x0308, 0x0A39). Only these numbers and names were taken: no code of ReShiki's CDXML reader, nor of the RDKit or Glysade ChemDraw readers it adapts (BSD-3-Clause, © Revvity Inc, CambridgeSoft Corp and others), is used here.
- Ideas from penzene (James O'Brien, GPL-3.0-or-later, https://github.com/JamesOBrien2/penzene): structure checks, stereo groups (abs, &, or), partial charges δ+/δ−, automatic renumbering of compound numbers when the scheme changes, and the command line (the list of structure checks: overlapping atoms, atoms on bonds, stray atoms, wedges not at stereocentres). Only the ideas were taken, no code: these features are Reactio Draw's own code, and the stereocentres are found with OpenChemLib.
- Journal style values follow the publishers' guidelines for authors (ACS, RSC, Nature, Angewandte; Synthesis / Synlett: the font size from Thieme's instructions); the other values are as ReShiki records them.
- Interface polish follows advice from two design guides, no code taken: Impeccable (Paul Bakaus, Apache-2.0, https://github.com/pbakaus/impeccable) and Taste Skill (Leonxlnx, MIT, https://github.com/Leonxlnx/taste-skill).
- Interface font: the fonts installed on the computer; nothing is downloaded.
- Jmol element colors (via ReShiki): https://jmol.sourceforge.net/jscolors/
- Open Reaction Database schema (for the ORD export format): https://github.com/open-reaction-database/ord-schema (Apache-2.0), format followed, no code copied.
- Office file formats: Microsoft Open Specifications (MS-EMF, MS-CFB, MS-OVBA, MS-CUSTOMUI, OOXML).
