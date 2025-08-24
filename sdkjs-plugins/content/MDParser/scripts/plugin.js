(function () {
  'use strict';
  window.MdParserContext = {
    theFormulas: []
  }

  // markdown-it inicial + katex
  const mdParser = window.markdownit({ html: true, linkify: true })


  var wrapClientHeight = (document.querySelector("body > div.wrap").clientHeight - 10) + "px";
  // elementos UI
  const ta = document.getElementById('md-input');
  const wrap = document.querySelector('.wrap'); // ← Selección del div con clase .wrap

  const preview = document.getElementById('preview');
  const btnInsert = document.getElementById('btn-insert');
  const btnPreviewToggle = document.getElementById('btn-preview-toggle');
  const inputFile = document.getElementById('file-md');



  preview.style.height = wrapClientHeight;
  ta.style.height = wrapClientHeight;




  // renderiza preview desde el markdown actual
  function renderPreview() {
    const text = ta.value || '';
    if (!mdParser) {
      preview.innerHTML = '<em>No hay markdown-it cargado.</em>';
      return;
    }
    try {
      const html = mdParser.render(text);
      preview.innerHTML = html;


      //RESET FORMULA ARRAY
      window.MdParserContext.theFormulas = [];

      // 👇 Renderiza las fórmulas con KaTeX (auto-render)
      if (window.renderMathInElement) {
        renderMathInElement(preview, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }

      return html;
    } catch (err) {
      preview.innerHTML = '<pre style="color:red;">Error al parsear Markdown: ' + err.message + '</pre>';
      return '';
    }
  }

  // Función para convertir estilos CSS a inline
  function aplicarSoloEstilosDefinidos(elementoPadre) {
    function obtenerEstilosDefinidos(elemento) {
      let estilosDefinidos = '';

      // Obtener estilos de hojas de estilo
      for (let hoja of document.styleSheets) {
        try {
          for (let regla of hoja.cssRules) {
            if (regla.type === CSSRule.STYLE_RULE) {
              if (elemento.matches(regla.selectorText)) {
                estilosDefinidos += regla.style.cssText;
              }
            }
          }
        } catch (e) { } // Ignorar hojas de otros dominios
      }

      return estilosDefinidos;
    }

    // Aplicar al padre
    elementoPadre.style.cssText = obtenerEstilosDefinidos(elementoPadre);

    // Aplicar a hijos
    const hijos = elementoPadre.querySelectorAll('*');
    hijos.forEach(hijo => {
      hijo.style.cssText = obtenerEstilosDefinidos(hijo);
    });
  }

  function limpiarFormulas() {
    window.MdParserContext.theFormulas = window.MdParserContext.theFormulas.map(({ formula, id }) => {
      let text = String(formula).trim();

      // saltos reales -> espacio
      text = text.replace(/\r/g, '').replace(/\s*\n\s*/g, ' ');

      // saltos LaTeX: \\  \\*  \\[...]
      text = text.replace(/\\\\(\[[^\]]*\])?\*?/g, ' ');

      // quitar delimitadores de math
      text = text.replace(/^\s*\${2}\s*|\s*\${2}\s*$/g, '')   // $$...$$
        .replace(/^\s*\$\s*|\s*\$\s*$/g, '')         // $...$
        .replace(/^\s*\\\(\s*|\s*\\\)\s*$/g, '')     // \(...\)
        .replace(/^\s*\\\[\s*|\s*\\\]\s*$/g, '');    // \[...\]

      // compactar
      text = text.replace(/\s{2,}/g, ' ').trim();
      return {
        formula: text,
        id
      }
    });


  }



  // Inserta el HTML convertido en el documento (ONLYOFFICE)
  async function insertIntoDocument() {
    var html = renderPreview();
    //LIMPIAR FORMULAS

    //ADD ID TO EACH FORMULA
    window.MdParserContext.theFormulas = window.MdParserContext.theFormulas.map(formula => {
      return {
        formula,
        id: generateId(7)
      }
    })

    window.MdParserContext.theFormulas.forEach(({ formula, id }) => {
      //IMPORT FIRST BLOCK ($$)
      html = html.replace("$$" + formula + "$$", id);
      html = html.replace("$" + formula + "$", id);
    })

    limpiarFormulas();


    if (!html) {
      alert('Preview vacío — nada que insertar.');
      return;
    }

    // html completo recomendado por html->docx libs: incluimos wrapper
    const wrapped = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' + html + '</body></html>';

    if (window.Asc && window.Asc.plugin && window.Asc.plugin.executeMethod && window.Asc.plugin.callCommand) {
      // PasteHtml inserta HTML en el documento. (ONLYOFFICE Plugin API)
      window.Asc.plugin.executeMethod('PasteHtml', [wrapped], function () {
        // callback opcional
        console.info('HTML insertado en el documento.');
        // puedes cerrar la UI si el plugin es modal: window.Asc.plugin.executeCommand("close", "");


      });

      Asc.scope.theFormulas = window.MdParserContext.theFormulas;



      if (window.MdParserContext.theFormulas.length > 0) {
        //var start = Date.now();
        var promise = await new Promise((resolve, reject) => {
          var times = 0;
          window.MdParserContext.foundFormulaId = false;
          var intervalId = setInterval(() => {
            //console.log("Intento" + times);
            if (times === 5) reject(false);
            Asc.plugin.callCommand(() => {
              const doc = Api.GetDocument();
              var formulas = Asc.scope.theFormulas;
              var lastFormulaId = formulas[formulas.length - 1].id;
              var results = doc.Search(lastFormulaId);
              return (results.length > 0)

            }, false, false, (foundFormulaId) => {
              window.MdParserContext.foundFormulaId = foundFormulaId
              //console.log(window.MdParserContext.foundFormulaId)
            })

            if (window.MdParserContext.foundFormulaId) {
              clearInterval(intervalId);
              resolve(true)
            };

            times++;
          }, 200);
        })
        //console.log(Date.now() - start, promise)

        if (promise) {
          Asc.plugin.callCommand(async () => {
            const formulas = Asc.scope.theFormulas;
            const doc = Api.GetDocument();

            formulas.forEach(({ formula, id }) => {

              const matches = doc.Search(id);

              if (matches.length > 0) {
                const rng = matches[0];
                rng.Select();         // Selecciona el placeholder
                rng.Delete();         // Lo elimina
                doc.AddMathEquation(formula, "latex"); // Inserta la ecuación
              }
            });

            return "Se remplazaron " + formulas.length + " formulas"

          }, false, false, (res) => console.log(res));
        }

      }




    }
  }


  // arrastrar/soltar o abrir archivo .md
  inputFile.addEventListener('change', (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      ta.value = e.target.result || '';
      renderPreview();
    };
    reader.readAsText(f, 'utf-8');
  });

  // render en tiempo real (simple debounce)
  let tId = null;
  ta.addEventListener('input', () => {
    clearTimeout(tId);
    tId = setTimeout(renderPreview, 150);
  });

  // botones
  btnInsert.addEventListener('click', insertIntoDocument);
  btnPreviewToggle.addEventListener('click', () => {
    const isHidden = preview.style.display === 'none';

    preview.style.display = isHidden ? 'block' : 'none';

    if (isHidden) {
      // Preview mostrado → textarea solo en la primera columna
      ta.classList.remove('fullwidth');
      wrap.style.gridTemplateColumns = '1fr 1fr';
    } else {
      // Preview oculto → textarea ocupa todo el ancho
      ta.classList.add('fullwidth');
      wrap.style.gridTemplateColumns = '1fr';
    }
  });


  // soporte para arrastrar al textarea
  ta.addEventListener('dragover', (e) => { e.preventDefault(); });
  ta.addEventListener('drop', (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!f) return;
    if (!f.type || f.name.toLowerCase().endsWith('.md') || f.type.indexOf('text') !== -1) {
      const r = new FileReader();
      r.onload = (ev) => { ta.value = ev.target.result || ''; renderPreview(); };
      r.readAsText(f, 'utf-8');
    } else alert('Archivo no soportado (sube un .md o archivo de texto).');
  });

  // ONLYOFFICE plugin init hook (si estamos dentro del editor)
  if (window.Asc && window.Asc.plugin) {
    window.Asc.plugin.init = function () {
      renderPreview();
      window.Asc.plugin.executeMethod("GetSelectedText", [], function (selectedText) {
        if (ta && typeof selectedText === "string") {
          ta.value = selectedText;
          renderPreview();
        }
      });

      window.Asc.plugin.onTranslate = () => {
        document.querySelector("#btn-insert").innerHTML = window.Asc.plugin.tr("Insert into document");
        document.querySelector("#btn-preview-toggle").innerHTML = window.Asc.plugin.tr("Show/Hide preview");
        document.querySelector("#info-text").innerHTML = window.Asc.plugin.tr("You can paste Markdown here or open a .md file");
        document.querySelector("#file-md-button").innerHTML = window.Asc.plugin.tr("Select Markdown file");
      }

    };
  } else {
    // Si pruebas en navegador fuera de ONLYOFFICE
    window.addEventListener('load', renderPreview);
  }

  function generateId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }


})();
