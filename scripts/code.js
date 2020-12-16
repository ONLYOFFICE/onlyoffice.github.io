(function(window, undefined){

    window.Asc.plugin.init = function()
    {
        if ((navigator.userAgent.indexOf("Chrome") !== -1) && (navigator.vendor.indexOf("Google Inc") !== -1) && !window.AscDesktopEditor) {
             //check incognito mode only in chrome
             var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
             if (fs) {
                 fs(window.TEMPORARY, 100, function(fs) {
                     document.getElementById("iframe").style.display = "block";
                 }, function(err) {
                     document.getElementById("result").style.display = "block";
                     document.getElementById("iframe").style.display = "none";
                 });
             } 
            
        } else {
           document.getElementById("iframe").style.display = "block";
        }
    };

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };

    window.Asc.plugin.onExternalMouseUp = function()
    {        
    };

})(window, undefined);
