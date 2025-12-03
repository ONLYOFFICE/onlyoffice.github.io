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
  /**
   * Creates and configures the history dropdown.
   * @param {HTMLElement} container The container to append the dropdown to.
   * @param {HTMLTextAreaElement} input The textarea to update on selection.
   * @param {Function} onSelect Callback to run when an item is selected.
   */
  function createHistoryDropdown(container, input, onSelect) {
    const history = window.TypstHistory.load();
    if (history.length === 0) {
      return; // Don't create dropdown if no history
    }

    const label = document.createElement('label');
    label.textContent = 'History:';
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.fontWeight = 'bold';


    const select = document.createElement('select');
    select.style.width = '100%';
    select.style.padding = '5px';

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select a formula from history...';
    defaultOption.value = '';
    select.appendChild(defaultOption);

    history.forEach(code => {
      const option = document.createElement('option');
      option.textContent = code.split('\n')[0].slice(0, 80) + '...'; // Show first line as preview
      option.value = code;
      select.appendChild(option);
    });

    select.onchange = () => {
      if (select.value) {
        input.value = select.value;
        onSelect();
      }
    };

    container.appendChild(label);
    container.appendChild(select);
  }

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

    // Create history dropdown
    createHistoryDropdown(historyContainer, input, updatePreviewAndResize);

    updatePreviewAndResize();
  };

  window.Asc.plugin.button = function (id) {
    if (id === 0) {
      const input = document.getElementById("input");
      const { svg, width, height } = window.TypstRenderer.getCurrentSvgData();
      
      // Save to history before inserting
      window.TypstHistory.save(input.value);

      window.SlideInserter.insert(svg, width, height);
    } else {
      window.Asc.plugin.executeCommand("close", "");
    }
  };
})(window);
