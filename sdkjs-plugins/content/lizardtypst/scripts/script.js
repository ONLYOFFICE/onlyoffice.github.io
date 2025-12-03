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
  window.Asc.plugin.init = function (text) {
    const input = document.getElementById("input");
    const preview = document.getElementById("preview");
    const errorDiv = document.getElementById("error");

    // Initialize Typst compiler and renderer
    window.$typst.setCompilerInitOptions({
      getModule: () =>
        "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm",
    });
    window.$typst.setRendererInitOptions({
      getModule: () =>
        "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm",
    });

    if (text) {
      input.value = text;
    } else if (input.value === "") {
      input.value = InitTypstCode;
    }

    input.oninput = () => {
      window.TypstRenderer.updatePreview(input, preview, errorDiv);
      input.style.height = "10px";
      input.style.height = input.scrollHeight + "px";
    };

    window.TypstRenderer.updatePreview(input, preview, errorDiv);
  };

  window.Asc.plugin.button = function (id) {
    if (id === 0) {
      const { svg, width, height } = window.TypstRenderer.getCurrentSvgData();
      window.SlideInserter.insert(svg, width, height);
    } else {
      window.Asc.plugin.executeCommand("close", "");
    }
  };
})(window);
