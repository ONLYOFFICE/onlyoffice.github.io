(function (root, factory) {
    if (typeof exports === "object" && typeof module === "object") {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.MendeleyApp = root.MendeleyApp || {};
        root.MendeleyApp.Logger = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {

    // Logger implementation
    function log(level, event, data) {
        var payload = {
            timestamp: new Date().toISOString(),
            level: level,
            event: event,
            data: data || {}
        };
        try {
            console.log(JSON.stringify(payload));
        } catch (e) {
            console.log(level + ": " + event);
        }
    }

    return {
        log: log,
        debug: function (event, data) { log("debug", event, data); },
        info: function (event, data) { log("info", event, data); },
        warn: function (event, data) { log("warn", event, data); },
        error: function (event, data) { log("error", event, data); },
        success: function (event, data) { log("success", event, data); }
    };
});
