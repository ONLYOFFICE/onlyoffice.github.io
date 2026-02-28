// public/onlyoffice-translations.js
(function () {
  'use strict';

  // --- helper seguro para traducciones ---
  function tSafe(s) {
    try {
      if (window?.Asc?.plugin && typeof window.Asc.plugin.tr === 'function') {
        return window.Asc.plugin.tr(s);
      }
    } catch (e) { /* ignore */ }
    return s;
  }

  // --- MAP: array de specs ---
  const MAP = [
    { selector: '#title-bg', original: 'BG', target: 'textContent' },
    { selector: '#model-label', original: 'Model:', target: 'textContent' },
    { selector: '#option-rmbg', original: 'RMBG-1.4 (Cross-browser)', target: 'optionText' },
    { selector: '#option-modnet', original: 'MODNet (WebGPU)', target: 'optionText' },
    { selector: '#ios-info', original: 'Using optimized iOS background removal', target: 'textContent' },
    { selector: '#hero-title', original: 'Remove Image Background', target: 'textContent' },
    { selector: '#hero-subtitle', original: '100% Automatically and Free', target: 'textContent' },
    { selector: '#hero-description', original: 'Upload your image and let our AI remove the background instantly. Perfect for professional photos, product images, and more.', target: 'textContent' },
    { selector: '#hero-credit', original: 'Built with love by Addy Osmani using Transformers.js', target: 'textContent' },
    { selector: '#loading-message', original: 'Loading background removal model...', target: 'textContent' },
    { selector: '#switching-models-message', original: 'Switching models...', target: 'textContent' },
    // nota: no sobrescribimos error-message (runtime)
    { selector: '#dropzone-prompt-default', original: 'Drag and drop images here', target: 'textContent' },
    { selector: '#dropzone-prompt-active', original: 'Drop the images here...', target: 'textContent' },
    { selector: '#dropzone-instruction', original: 'or click to select files', target: 'textContent' },
    { selector: '#sample-heading', original: 'No image? Try one of these:', target: 'textContent' },
    { selector: '#sample-note', original: 'All images are processed locally on your device and are not uploaded to any server.', target: 'textContent' },
    // LISTA IMÁGENES (clases -> muchas coincidencias)
    { selector: '.processing-text', original: 'Processing...', target: 'textContent' },
    { selector: '.btn-delete-label', original: 'Delete', target: 'attr', attrName: "title" },
    { selector: '.btn-edit-label', original: 'Edit', target: 'attr', attrName: "title" },
    { selector: '.btn-download-label', original: 'Download', target: 'attr', attrName: "title" },
    { selector: '.btn-insert-label', original: 'Insert', target: 'attr', attrName: "title" },
    // EDIT IMAGE
    { selector: '#edit-image-title', original: 'Edit Image', target: 'textContent' },
    { selector: '#bg-heading', original: 'Background', target: 'textContent' },
    { selector: '#custom-color-btn', original: 'Custom Color', target: 'textContent' },
    { selector: '#effects-heading', original: 'Effects', target: 'textContent' },
    { selector: '#preview-heading', original: 'Preview', target: 'textContent' },
    { selector: '#btn-cancel-edit', original: 'Cancel', target: 'textContent' },
    { selector: '#btn-save-edit', original: 'Save Changes', target: 'textContent' },
    { selector: '#option-effect-none', original: 'None', target: 'textContent' },
    { selector: '#option-effect-blur', original: 'Blur', target: 'textContent' },
    { selector: '#option-effect-brightness', original: 'Bright', target: 'textContent' },
    { selector: '#option-effect-contrast', original: 'Contrast', target: 'textContent' },
    { selector: '#bg-option-color', original: 'Solid Color', target: 'textContent' },
    { selector: '#bg-option-image', original: 'Image', target: 'textContent' }
  ];

  // --- util: escape selector (para construcción segura si hace falta) ---
  function escapeSelector(s) {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(s);
    return s.replace(/([ #;?%&,.+*~\':"!\^$\[\]\(\)=>|\/@])/g, '\\$1');
  }

  // --- aplica una sola spec a un elemento ---
  function applySpecToElement(el, spec) {
    if (!el || !spec) return;
    const translated = tSafe(spec.original);

    try {
      switch (spec.target) {
        case 'optionText':
          if (el.tagName === 'OPTION') {
            if (el.text !== translated) el.text = translated;
          } else {
            if (el.textContent !== translated) el.textContent = translated;
          }
          break;

        case 'value':
          if ('value' in el && el.value !== translated) el.value = translated;
          break;

        case 'innerHTML':
          if (el.innerHTML !== translated) el.innerHTML = translated;
          break;

        case 'attr':
          if (spec.attrName) {
            if (el.getAttribute(spec.attrName) !== translated) el.setAttribute(spec.attrName, translated);
          } else {
            if (el.textContent !== translated) el.textContent = translated;
          }
          break;

        case 'alt':
          if ('alt' in el && el.alt !== translated) el.alt = translated;
          break;

        case 'textContent':
        default:
          if (el.textContent !== translated) el.textContent = translated;
          break;
      }
    } catch (e) {
      // fallback seguro
      try { el.textContent = translated; } catch (err) { /* ignore */ }
    }
  }

  // --- devuelve los elementos relevantes para una spec dentro de un nodo raíz dado ---
  function elementsForSpecInNode(spec, rootNode) {
    const sel = spec.selector;
    const results = [];
    if (!rootNode) return results;

    try {
      // Si selector es id (empieza con #), buscar single
      if (typeof sel === 'string' && sel.startsWith('#')) {
        if (rootNode.nodeType === 1 && rootNode.matches && rootNode.matches(sel)) {
          results.push(rootNode);
          return results;
        }
        const found = rootNode.querySelector ? rootNode.querySelector(sel) : null;
        if (found) results.push(found);
        return results;
      }

      // Para clases u otros selectores: devolver todos en el subtree (y rootNode si coincide)
      if (rootNode.nodeType === 1 && rootNode.matches && rootNode.matches(sel)) {
        results.push(rootNode);
      }
      if (rootNode.querySelectorAll) {
        const nodeList = rootNode.querySelectorAll(sel);
        if (nodeList && nodeList.length) {
          nodeList.forEach(n => results.push(n));
        }
      }
    } catch (e) {
      // selector inválido -> ignorar
    }
    return results;
  }

  // --- aplicar todas las traducciones sobre el document ---
  function applyTranslations() {
    try {
      for (const spec of MAP) {
        if (spec.selector && typeof spec.selector === 'string' && spec.selector.startsWith('#')) {
          const el = document.querySelector(spec.selector);
          if (el) applySpecToElement(el, spec);
        } else {
          let nodeList = [];
          try {
            nodeList = document.querySelectorAll(spec.selector);
          } catch (e) { nodeList = []; }
          if (nodeList && nodeList.length) {
            nodeList.forEach(el => applySpecToElement(el, spec));
          }
        }
      }

      // ejemplo opt: traducir alt del hero si existe
      const heroImg = document.querySelector('img[alt="Surprised man"]');
      if (heroImg) {
        const altTranslated = tSafe("Surprised man");
        if (heroImg.alt !== altTranslated) heroImg.alt = altTranslated;
      }
    } catch (e) {
      console.warn('applyTranslations error', e);
    }
  }

  // --- aplicar traducciones a un subtree concreto ---
  function applyTranslationsToTree(rootNode) {
    if (!rootNode) return;
    for (const spec of MAP) {
      const els = elementsForSpecInNode(spec, rootNode);
      if (els && els.length) {
        els.forEach(el => applySpecToElement(el, spec));
      }
    }
  }

  // --- MutationObserver sobre #root (aplica solo donde hace falta) ---
  let observer = null;
  function setupObserver() {
    const root = document.getElementById('root');
    if (!root) return false;

    const opts = { childList: true, subtree: true, attributes: true, attributeOldValue: false };

    observer = new MutationObserver((mutations) => {
      if (observer) observer.disconnect();

      try {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) applyTranslationsToTree(node);
            });
          } else if (mutation.type === 'attributes') {
            const tgt = mutation.target;
            if (!tgt || tgt.nodeType !== 1) continue;

            for (const spec of MAP) {
              try {
                if (spec.selector && typeof spec.selector === 'string' && spec.selector.startsWith('#')) {
                  const id = spec.selector.slice(1);
                  if (tgt.id === id) {
                    applySpecToElement(tgt, spec);
                    break;
                  }
                } else {
                  if (tgt.matches && tgt.matches(spec.selector)) {
                    applySpecToElement(tgt, spec);
                    break;
                  }
                }
              } catch (e) { }
            }
          }
        }
      } catch (e) {
        try { applyTranslations(); } catch (ee) { /* ignore */ }
      } finally {
        if (observer) observer.observe(root, opts);
      }
    });

    observer.observe(root, opts);
    return true;
  }

  // --- apply theme (robusto) ---
  function applyTheme() {
    try {
      // preferimos .theme.type (más estándar), fallback a .theme.da
      const themeVal = (window?.Asc?.plugin?.theme?.type ?? window?.Asc?.plugin?.theme?.da ?? '').toString().toLowerCase();
      const isDark = themeVal === 'dark';
      document.body.classList.toggle('dark-mode', isDark);
    } catch (e) {
      // no hay Asc o theme -> no romper
    }
  }

  // --- inicialización: registrar onTranslate y montar observer ---
  function initTranslationSystem() {
    // pasada inicial
    try { applyTranslations(); } catch (e) { /* ignore */ }

    // registrar onTranslate en ONLYOFFICE (seguro)
    if (window?.Asc?.plugin) {
      try {
        // onTranslate debe aplicar traducciones y tema (al cambiar idioma puede requerirse re-evaluar textos)
        window.Asc.plugin.onTranslate = function () {
          try { applyTranslations(); } catch (e) { }
          try { applyTheme(); } catch (e) { }
        };
      } catch (e) { /* ignore */ }

      // preservar cualquier init anterior y envolverlo
      try {
        const prevInit = window.Asc.plugin.init;
        window.Asc.plugin.init = function () {


          // aplicar traducciones y tema inmediatamente en init
          try { applyTranslations(); } catch (e) { }
          try { applyTheme(); } catch (e) { }
          try { addContextMenuItem() } catch (e) { }

          // llamar init anterior (si existía)
          if (typeof prevInit === 'function') {
            try { prevInit(); } catch (err) { /* ignore */ }
          }
        };
      } catch (e) { /* ignore */ }

      // si el host expone onThemeChanged, registramos una escucha ligera
      try {
        window.Asc.plugin.onThemeChanged = function (themeObj) {
          try {
            // themeObj puede venir como { type: 'dark' } o similar
            applyTheme();
          } catch (e) { /* ignore */ }
        };
      } catch (e) { /* ignore */ }
    }

    // montar observer en #root (o esperar a load si no existe)
    if (!setupObserver()) {
      window.addEventListener('load', () => {
        try { setupObserver(); } catch (e) { /* ignore */ }
        // también aplicar tema en load si ascendió
        try { applyTheme(); } catch (e) { }
      }, { once: true });
    } else {
      // si observer montado ahora, aplicar tema inmediatamente
      try { applyTheme(); } catch (e) { }
    }
  }

  // helper global ligero para usar en React/JSX: window.t("text")
  if (!window.t) {
    window.t = function (s) { return tSafe(s); };
  }

  // arrancar cuando DOM listo
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initTranslationSystem();
  } else {
    window.addEventListener('DOMContentLoaded', initTranslationSystem, { once: true });
  }

  // Exponer para debug/inspección
  window.__onlyofficeTranslations = {
    MAP,
    applyTranslations,
    applyTranslationsToTree,
    applyTheme
  };

  function addContextMenuItem() {
    // dentro de window.Asc.plugin.init o en el script del plugin
    window.Asc.plugin.event_onContextMenuClick = (id) => {
      if (id === "remove-background-btn") {
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function (result) {
          var file = base64ToFile(result.src);
          window["passImageFile"](file);
        });
      }
    };

    Asc.plugin.attachEvent("onContextMenuShow", (options) => {
      if (options.type === "Image") {
        const items = {
          guid: window.Asc.plugin.guid,
          items: [
            {
              id: "remove-background-btn",
              text: tSafe("Remove background"),
              /* items: [], */

            },
          ],
        };

        window.Asc.plugin.executeMethod("AddContextMenuItem", [items]);
      }
    });



  }
  function base64ToFile(base64){
    // Extrae el mime type de la cadena base64 (ej: image/png, image/jpeg, etc.)
    const arr = base64.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";

    // Convierte la parte base64 a binario
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    // Usa la extensión adecuada según el mime type
    const ext = mime.split("/")[1] || "png";

    // Crea un File
    return new File([u8arr], `${Date.now()}.${ext}`, { type: mime });
  }
})();
