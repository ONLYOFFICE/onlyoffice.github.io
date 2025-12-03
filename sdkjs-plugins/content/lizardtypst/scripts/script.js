const InitTypstCode = `#set page(
  width: auto,
  height: auto,
  margin: .2cm,
  fill: none,
)
$
  sum_(k=1)^n k = (n(n+1))/2
$
`;

(function (window) {
  let input, preview;

  window.Asc.plugin.init = function () {
    input = document.getElementById("input");
    preview = document.getElementById("preview");

    // Initialize Typst compiler and renderer with WASM paths from CDN
    // This ensures typst.ts is correctly configured.
    window.$typst.setCompilerInitOptions({
      getModule: () =>
        'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
    });
    window.$typst.setRendererInitOptions({
      getModule: () =>
        'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
    });
    if(!input.value) input.value = InitTypstCode;
    
    // Bind previewSvg action to the textarea
    input.oninput = () => {
      updatePreview(input.value);
      // Optional: auto-resize textarea height
      input.style.height = '10px';
      input.style.height = input.scrollHeight + 'px';
    };

    // Trigger the first preview.
    updatePreview(input.value);
  };

  async function updatePreview(mainContent) {
    const code = mainContent.trim();
    if (!code) {
      preview.innerHTML = "Type formula to preview...";
      return;
    }

    preview.innerHTML = "Loading preview...";

    try {
      const typst = window.$typst || window.typst || null;
      if (!typst || typeof typst.svg !== "function") {
        preview.innerHTML = "Error: Typst runtime not loaded yet.";
        return;
      }

      const svg = await typst.svg({ mainContent: code });
      
      // Append svg text directly
      preview.innerHTML = svg;

      // Resize SVG to fit content div width
      const svgElem = preview.firstElementChild;
      if (svgElem) {
        // SVG sizing is now handled purely by CSS
      }
    } catch (e) {
      preview.innerHTML = `Error rendering preview: ${e.message || String(e)}`;
    }
  }

  // Remove the button function entirely as per user request (rendering only)
  window.Asc.plugin.button = function (id) {
    // Just close the plugin since insertion is removed.
    window.Asc.plugin.executeCommand("close", "");
  };
})(window);