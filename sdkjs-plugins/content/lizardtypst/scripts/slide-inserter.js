/**
 * Removes <script> tags from an SVG string.
 * @param {string} svgString The raw SVG string.
 * @returns {string} The sanitized SVG string.
 */
function sanitizeSvgString(svgString) {
  if (typeof svgString !== "string") {
    return "";
  }
  return svgString.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

(function (window) {
  /**
   * Inserts an SVG image into the current slide.
   * @param {string} svgString The raw, processed SVG string.
   * @param {number} width The width of the SVG in pixels.
   * @param {number} height The height of the SVG in pixels.
   */
  function insertSvgIntoSlide(svgString, width, height) {
    if (!svgString) {
      console.error("insertSvgIntoSlide: No SVG string provided.");
      return;
    }
    svgString = sanitizeSvgString(svgString);
    console.log("Inserting SVG into slide:", { width, height });
    console.log(svgString);

    const base64 = btoa(unescape(encodeURIComponent(svgString)));
    Asc.scope.dataUrl = "data:image/svg+xml;base64," + base64;

    const scale = 2.0; // Apply a default scaling factor to make it larger
    Asc.scope.nWidth = (((width * scale) / 96) * 914400 + 0.5) >> 0;
    Asc.scope.nHeight = (((height * scale) / 96) * 914400 + 0.5) >> 0;

    window.Asc.plugin.callCommand(function () {
      var oPresentation = Api.GetPresentation();
      var oSlide = oPresentation.GetCurrentSlide();
      if (oSlide) {
        var oImage = Api.CreateImage(
          Asc.scope.dataUrl,
          Asc.scope.nWidth,
          Asc.scope.nHeight
        );
        oSlide.AddObject(oImage);
      }
    }, true);
  }

  // Expose the function to the global window object.
  window.SlideInserter = {
    insert: insertSvgIntoSlide,
  };
})(window);
