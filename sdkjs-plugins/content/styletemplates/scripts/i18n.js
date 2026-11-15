/* Traduccions de la interficie. Idioma per defecte: catala. */
(function (window) {
  "use strict";

  var STRINGS = {
    ca: {
      saveTitle: "Desa una plantilla",
      templateName: "Nom de la plantilla",
      onlyUsed: "Només els estils utilitzats en aquest document",
      saveBtn: "Desa els estils del document actual",
      listTitle: "Les meves plantilles",
      createMissing: "Crea els estils que no existeixin al document",
      importTitle: "Importa",
      importHint: "Fitxers .dotx/.docx (Word), .ott/.odt (OpenOffice/LibreOffice) o .json d’aquest plugin.",
      importBtn: "Importa una plantilla\u2026",
      empty: "Encara no tens cap plantilla.",
      apply: "Aplica",
      del: "Elimina",
      exportAs: "Exporta com a\u2026",
      exportJson: "JSON (aquest plugin)",
      exportDotx: "Word (.dotx)",
      exportOtt: "OpenOffice / LibreOffice (.ott)",
      styles: "estils",
      nameRequired: "Escriu un nom per a la plantilla.",
      overwrite: "Ja existeix una plantilla amb aquest nom. Vols substituir-la?",
      confirmDelete: "Segur que vols eliminar la plantilla \u00AB{0}\u00BB?",
      saved: "Plantilla \u00AB{0}\u00BB desada ({1} estils).",
      noStyles: "No s’ha trobat cap estil per desar.",
      applied: "Aplicat: {0} estils actualitzats, {1} creats, {2} omesos.",
      imported: "Importada \u00AB{0}\u00BB ({1} estils).",
      importError: "No s’ha pogut importar el fitxer: {0}",
      unsupported: "Format no compatible.",
      exported: "Exportada \u00AB{0}\u00BB.",
      error: "Error: {0}",
      working: "Treballant\u2026"
    },
    es: {
      saveTitle: "Guardar una plantilla",
      templateName: "Nombre de la plantilla",
      onlyUsed: "Solo los estilos utilizados en este documento",
      saveBtn: "Guardar los estilos del documento actual",
      listTitle: "Mis plantillas",
      createMissing: "Crear los estilos que no existan en el documento",
      importTitle: "Importar",
      importHint: "Archivos .dotx/.docx (Word), .ott/.odt (OpenOffice/LibreOffice) o .json de este plugin.",
      importBtn: "Importar una plantilla\u2026",
      empty: "Todav\u00EDa no tienes ninguna plantilla.",
      apply: "Aplicar",
      del: "Eliminar",
      exportAs: "Exportar como\u2026",
      exportJson: "JSON (este plugin)",
      exportDotx: "Word (.dotx)",
      exportOtt: "OpenOffice / LibreOffice (.ott)",
      styles: "estilos",
      nameRequired: "Escribe un nombre para la plantilla.",
      overwrite: "Ya existe una plantilla con este nombre. \u00BFQuieres sustituirla?",
      confirmDelete: "\u00BFSeguro que quieres eliminar la plantilla \u00AB{0}\u00BB?",
      saved: "Plantilla \u00AB{0}\u00BB guardada ({1} estilos).",
      noStyles: "No se ha encontrado ning\u00FAn estilo para guardar.",
      applied: "Aplicado: {0} estilos actualizados, {1} creados, {2} omitidos.",
      imported: "Importada \u00AB{0}\u00BB ({1} estilos).",
      importError: "No se ha podido importar el archivo: {0}",
      unsupported: "Formato no compatible.",
      exported: "Exportada \u00AB{0}\u00BB.",
      error: "Error: {0}",
      working: "Trabajando\u2026"
    },
    en: {
      saveTitle: "Save a template",
      templateName: "Template name",
      onlyUsed: "Only styles used in this document",
      saveBtn: "Save styles from the current document",
      listTitle: "My templates",
      createMissing: "Create styles that do not exist in the document",
      importTitle: "Import",
      importHint: ".dotx/.docx (Word), .ott/.odt (OpenOffice/LibreOffice) or .json files from this plugin.",
      importBtn: "Import a template\u2026",
      empty: "You have no templates yet.",
      apply: "Apply",
      del: "Delete",
      exportAs: "Export as\u2026",
      exportJson: "JSON (this plugin)",
      exportDotx: "Word (.dotx)",
      exportOtt: "OpenOffice / LibreOffice (.ott)",
      styles: "styles",
      nameRequired: "Enter a name for the template.",
      overwrite: "A template with this name already exists. Replace it?",
      confirmDelete: "Delete template \u201C{0}\u201D?",
      saved: "Template \u201C{0}\u201D saved ({1} styles).",
      noStyles: "No styles found to save.",
      applied: "Applied: {0} styles updated, {1} created, {2} skipped.",
      imported: "Imported \u201C{0}\u201D ({1} styles).",
      importError: "Could not import the file: {0}",
      unsupported: "Unsupported format.",
      exported: "Exported \u201C{0}\u201D.",
      error: "Error: {0}",
      working: "Working\u2026"
    }
  };
  var current = "ca";

  function setLang(code) {
    var c = String(code || "").toLowerCase().slice(0, 2);
    current = STRINGS[c] ? c : "ca";
    return current;
  }

  function t(key) {
    var s = (STRINGS[current] && STRINGS[current][key]) || STRINGS.ca[key] || key;
    for (var i = 1; i < arguments.length; i++) {
      s = s.split("{" + (i - 1) + "}").join(String(arguments[i]));
    }
    return s;
  }

  function translateDom(root) {
    var els = (root || document).querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = t(els[i].getAttribute("data-i18n"));
    }
  }

  window.STI18n = { setLang: setLang, t: t, translateDom: translateDom };
})(window);
