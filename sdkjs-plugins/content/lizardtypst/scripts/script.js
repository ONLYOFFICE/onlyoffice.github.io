(function (window) {
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

  window.Asc.plugin.init = function (text) {
    const input = document.getElementById("input");
    const preview = document.getElementById("preview");
    const errorDiv = document.getElementById("error");
    const historyContainer = document.getElementById("history-container");

    const updatePreviewAndResize = () => {
      window.TypstRenderer.updatePreview(input, preview, errorDiv);
      input.style.height = "1px";
      input.style.height = input.scrollHeight + "px";
    };

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

    input.oninput = updatePreviewAndResize;

    // Initialize the UI, including the history dropdown
    window.TypstUI.initialize({
      container: historyContainer,
      input: input,
      onSelect: updatePreviewAndResize
    });

    updatePreviewAndResize();
  };

  window.Asc.plugin.button = function (id) {
    if (id === 0) {
      const input = document.getElementById("input");
      const { svg, width, height } = window.TypstRenderer.getCurrentSvgData();
      
      // Save to history before inserting
      window.TypstHistory.save(input.value);

      window.SlideInserter.insert(svg, width, height);
      window.Asc.plugin.executeCommand("close", "");
    } else {
      window.Asc.plugin.executeCommand("close", "");
    }
  };
})(window);
