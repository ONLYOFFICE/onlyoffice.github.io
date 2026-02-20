(function (window) {
  let currentSvgData = {
    svg: null,
    width: 0,
    height: 0,
  };
  let lastRequestId = 0;

  /**
   * Formats and displays rendering errors.
   * @param {HTMLElement} errorDiv The element to display the error in.
   * @param {any} error The error object from typst.
   */
  function displayRenderError(errorDiv, error) {
    errorDiv.innerHTML = ''; // Clear previous errors
    errorDiv.style.visibility = "visible"; // Always show the error div when there's an error

    const errorString = String(error.message || error); // Get the string representation of the error

    // Regex to extract message and hints
    const messageMatch = errorString.match(/message:\s*"(.*?)(?<!\\)"/);
    const hintsMatch = errorString.match(/hints:\s*\[(.*?)\]/);

    let message = messageMatch && messageMatch[1] ? messageMatch[1] : null;
    let hints = [];

    if (hintsMatch && hintsMatch[1]) {
      // Split hints by comma, and clean up quotes and backslashes
      hints = hintsMatch[1].split(/",\s*"/).map(hint => hint.replace(/^"|"$/g, '').replace(/\\"/g, '"').trim());
    }

    if (message || hints.length > 0) {
        // Display MESSAGE
        if (message) {
            const msgP = document.createElement('p');
            const msgB = document.createElement('b');
            msgB.textContent = 'MESSAGE: ';
            msgP.appendChild(msgB);
            msgP.appendChild(document.createTextNode(message));
            errorDiv.appendChild(msgP);
        }

        // Display HINTS
        if (hints.length > 0) {
            hints.forEach(hint => {
                const hintP = document.createElement('p');
                hintP.style.paddingLeft = '1em'; // Indent hints
                const hintB = document.createElement('b');
                hintB.textContent = 'HINT: ';
                hintP.appendChild(hintB);
                hintP.appendChild(document.createTextNode(hint));
                errorDiv.appendChild(hintP);
            });
        }
    } else {
        // Fallback if no specific message/hints are found (e.g., different error format)
        const fallbackP = document.createElement('p');
        fallbackP.textContent = `Error rendering preview: ${errorString}`;
        errorDiv.appendChild(fallbackP);
    }
  }

  /**
   * Updates the preview with the new SVG and calculates its dimensions.
   * @param {string} svg The SVG string from typst.
   * @param {HTMLElement} preview The preview element.
   */
  function updateSvgInPreview(svg, preview) {
    currentSvgData.svg = svg;
    preview.innerHTML = svg;

    const svgElem = preview.firstElementChild;
    if (svgElem) {
      const wAttr = svgElem.getAttribute("width");
      const hAttr = svgElem.getAttribute("height");
      let width = parseFloat(wAttr);
      let height = parseFloat(hAttr);
      const pt2px = 96 / 72;

      if (wAttr && wAttr.endsWith("pt")) width *= pt2px;
      if (hAttr && hAttr.endsWith("pt")) height *= pt2px;

      currentSvgData.width = width;
      currentSvgData.height = height;
    }
  }

  /**
   * Renders the typst code and updates the preview.
   * @param {HTMLTextAreaElement} input The input textarea.
   * @param {HTMLElement} preview The preview element.
   * @param {HTMLElement} errorDiv The error display element.
   */
  async function updatePreview(input, preview, errorDiv) {
    const code = input.value.trim();
    if (!code) {
      preview.innerHTML = "Type formula to preview...";
      currentSvgData.svg = null;
      errorDiv.style.visibility = "hidden";
      return;
    }

    lastRequestId++;
    const reqId = lastRequestId;
    preview.innerHTML = "Loading preview...";
    errorDiv.style.visibility = "hidden";

    try {
      const typst = window.$typst || window.typst || null;
      if (!typst || typeof typst.svg !== "function") {
        throw new Error("Typst runtime not loaded yet.");
      }

      const svg = await typst.svg({ mainContent: code });
      if (reqId !== lastRequestId) return;

      updateSvgInPreview(svg, preview);

    } catch (error) {
      if (reqId !== lastRequestId) return;
      currentSvgData.svg = null;
      preview.innerHTML = "";
      displayRenderError(errorDiv, error);
    }
  }

  window.TypstRenderer = {
    updatePreview: updatePreview,
    getCurrentSvgData: () => currentSvgData,
  };
})(window);
