
// Example insert text into editors (different implementations)
(function(window, undefined){
      window.Asc.plugin.init = function()
        {
            this.resizeWindow(392, 147, 392, 147, 392, 147);
            // none
        };

        window.Asc.plugin.button = function(id)
        {
            this.executeCommand("close", "");
        };
})(window, undefined);