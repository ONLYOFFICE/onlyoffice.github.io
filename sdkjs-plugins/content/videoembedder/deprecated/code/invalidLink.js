(function (window, undefined) {
    window.Asc.plugin.init = function () {
      const textElement = document.getElementById("invalid-link-text");
      window.Asc.plugin.onTranslate = function () {
        textElement.innerText = window.Asc.plugin.tr(
          "The link you have entered is not a valid Bilibili link. Try again with the correct link."
        );
      };


    };
  })(window, undefined);
  