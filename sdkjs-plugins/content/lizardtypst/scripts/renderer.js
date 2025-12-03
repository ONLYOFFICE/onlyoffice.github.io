(function (window) {
  let currentSvgData = {
    svg: null,
    width: 0,
    height: 0,
  };
  let lastRequestId = 0;

  async function updatePreview(input, preview, errorDiv) {
    const code = input.value.trim();
    if (!code) {
      preview.innerHTML = "Type formula to preview...";
      currentSvgData.svg = null;
      return;
    }

    lastRequestId++;
    const reqId = lastRequestId;
    preview.innerHTML = "Loading preview...";

    try {
      const typst = window.$typst || window.typst || null;
      if (!typst || typeof typst.svg !== "function") {
        throw new Error("Typst runtime not loaded yet.");
      }

      let svg = await typst.svg({ mainContent: code });
      if (reqId !== lastRequestId) return;

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
      errorDiv.style.display = "none";
    } catch (e) {
      currentSvgData.svg = null;
      errorDiv.textContent = `Error rendering preview: ${
        e.message || String(e)
      }`;
      errorDiv.style.display = "block";
      preview.innerHTML = "";
    }
  }

  window.TypstRenderer = {
    updatePreview: updatePreview,
    getCurrentSvgData: () => currentSvgData,
  };
})(window);
