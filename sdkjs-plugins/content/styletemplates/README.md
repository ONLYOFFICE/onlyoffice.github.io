# Plantilles d'estil (Style Templates) per a ONLYOFFICE

Plugin per a l'editor de documents d'ONLYOFFICE (inclòs el de kDrive d'Infomaniak) que permet:

- **Desar** els estils d'un document (Normal, Títols 1-9, Cita, etc. i els estils personalitzats) com a plantilla.
- **Aplicar** una plantilla desada a qualsevol altre document.
- **Importar** plantilles de Word (`.dotx`, `.docx`) i OpenOffice/LibreOffice (`.ott`, `.odt`).
- **Exportar** plantilles a `.dotx`, `.ott` o `.json`.

Idiomes: català (per defecte), castellà i anglès.

## Estructura

```
onlyoffice-styletemplates/
├── config.json              Manifest del plugin
├── index.html               Interfície del panell
├── scripts/
│   ├── i18n.js              Traduccions (ca / es / en)
│   ├── formats.js           Lectura/escriptura .dotx, .ott, .json (ZIP sense dependències)
│   └── code.js              Lògica: capturar, aplicar, desar, importar, exportar
└── resources/
    ├── css/styles.css
    ├── light/icon.png, icon@2x.png    (40x40 i 80x80)
    ├── dark/icon.png, icon@2x.png
    └── store/icons/icon.svg
```

## Propietats que es desen per estil

| Text | Paràgraf |
|---|---|
| Font, mida, negreta, cursiva, subratllat, ratllat, majúscules, versaletes, color, espaiat entre caràcters | Alineació, sagnies (esquerra, dreta, primera línia/francesa), espai abans/després, interlineat, nivell d'esquema, mantenir amb el següent, mantenir línies juntes |

També es desa l'herència (`basedOn`).

## Limitacions conegudes

- Les plantilles es guarden al `localStorage` del navegador: són per usuari i per navegador. Per compartir-les o fer-ne còpia, exporta-les.
- No es desen numeracions/llistes, vores, ombrejats, tabulacions ni estils de taula.
- La importació de `.dotx`/`.ott` necessita un navegador amb `DecompressionStream` (Chrome 80+, Edge 80+, Firefox 113+, Safari 16.4+).
- Les exportacions són fitxers mínims amb només els estils i un paràgraf de mostra per estil.

## Llicència

AGPL-3.0 (vegeu `LICENSE`), la mateixa que el repositori del marketplace d'ONLYOFFICE.

## Instal·lació i publicació

- **Prova local (Desktop):** comprimeix el contingut del repo (amb `config.json` a l'arrel del ZIP), reanomena'l a `.plugin` i instal·la'l des del Gestor de connectors d'ONLYOFFICE Desktop.
- **kDrive d'Infomaniak:** no permet pujar plugins propis; cal publicar-lo al marketplace d'ONLYOFFICE. Vegeu [`docs/TUTORIAL-GITHUB.md`](docs/TUTORIAL-GITHUB.md).
