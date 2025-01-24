(function (window, undefined) {
    window.Asc.plugin.init = function () {
      const textElement = document.getElementById("broken-link-text");
      window.Asc.plugin.onTranslate = function () {
        textElement.innerText = window.Asc.plugin.tr(
          "Could not extract video ID from the link. Please check the URL and try again."
        );
      };


    };
  })(window, undefined);
  