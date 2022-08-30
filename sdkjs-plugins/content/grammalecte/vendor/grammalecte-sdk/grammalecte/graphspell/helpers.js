// HELPERS

/* jshint esversion:6, -W097 */
/* jslint esversion:6 */
/* global require, exports, console, XMLHttpRequest */

"use strict";

window.grammalecte = {};

window.grammalecte["helpers"] = {

    inspect: function (o) {
        let sMsg = "__inspect__: " + typeof o;
        for (let sParam in o) {
            sMsg += "\n" + sParam + ": " + o.sParam;
        }
        sMsg += "\n" + JSON.stringify(o) + "\n__end__";
        console.log(sMsg);
    },

    loadFile: function (spf) {
        // load ressources in workers (suggested by Mozilla extensions reviewers)
        // for more options have a look here: https://gist.github.com/Noitidart/ec1e6b9a593ec7e3efed
        // if not in workers, use sdk/data.load() instead
        try {
            if(typeof(process) !== 'undefined') {
                //console.log('loadFile(disque): ' + spf);
                let fs = require("fs");
                return fs.readFileSync(spf, "utf8");
            } else {
                console.log("loadFile: " + spf);
                let xRequest;
                xRequest = new XMLHttpRequest();
                xRequest.open('GET', spf, false); // 3rd arg is false for synchronous, sync is acceptable in workers
                xRequest.overrideMimeType('text/json');
                xRequest.send();
                return xRequest.responseText;
            }
        }
        catch (e) {
            console.error(e);
            return null;
        }
    },

    // conversions
    objectToMap: function (obj) {
        if (obj == null) {
            return null;
        }
        let m = new Map();
        for (let param in obj) {
            m.set(param, obj[param]);
        }
        return m;
    },

    mapToObject: function (m) {
        if (m == null) {
            return null;
        }
        let obj = {};
        for (let [k, v] of m) {
            obj[k] = v;
        }
        return obj;
    }
};


if (typeof(exports) !== 'undefined') {
    exports.inspect = helpers.inspect;
    exports.loadFile = helpers.loadFile;
    exports.objectToMap = helpers.objectToMap;
    exports.mapToObject = helpers.mapToObject;
}
