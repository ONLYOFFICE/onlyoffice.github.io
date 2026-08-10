// Example plugin demonstrating type usage
// This file shows how to use the OnlyOffice Plugin API types

// @ts-check

/// <reference path="./index.d.ts" />

// This file demonstrates multiple editor variants in one smoke-test file. In a real plugin,
// select exactly one editor entry point (`onlyoffice-plugins-api/word`, `/cell`, or `/slide`).
/** @type {any} */
var Api;

// Example 1: Basic plugin initialization
function basicPluginExample() {
    window.Asc.plugin.init = function() {
        console.log('Plugin initialized');
    };

    window.Asc.plugin.button = function(id) {
        console.log('Button clicked:', id);
    };
}

// Example 2: Using callCommand with document API (Word)
function documentPluginExample() {
    window.Asc.plugin.init = function() {
        // In a Word plugin, include `onlyoffice-plugins-api/word` in tsconfig.json.
        window.Asc.plugin.callCommand(function() {
            var oDocument = Api.GetDocument();
            var oParagraph = Api.CreateParagraph();
            oParagraph.AddText('Hello from plugin!');
            oDocument.InsertContent([oParagraph]);
        }, true);
    };

    window.Asc.plugin.button = function(id) {
        if (id === 1) {
            window.Asc.plugin.callCommand(function() {
                Api.Save();
            }, false);
        }
    };
}

// Example 2a: Using callCommand with Cell (Spreadsheet) editor
function spreadsheetPluginExample() {
    window.Asc.plugin.init = function() {
        window.Asc.plugin.callCommand(function() {
            /** @type {import("./src/editors/cell").Cell.Api} */
            var cellApi = Api;
            var activeSheet = cellApi.GetActiveSheet();
            cellApi.GetRange("A1").SetValue("Hello from plugin!");
        }, true);
    };
}

// Example 2b: Using callCommand with Slide (Presentation) editor
function presentationPluginExample() {
    window.Asc.plugin.init = function() {
        window.Asc.plugin.callCommand(function() {
            /** @type {import("./src/editors/slide").Slide.Api} */
            var slideApi = Api;
            var oPresentation = slideApi.GetPresentation();
            var oSlide = slideApi.CreateSlide();
            oPresentation.AddSlide(oSlide, 0);
        }, true);
    };
}

// Example 3: Working with events
function eventsExample() {
    window.Asc.plugin.attachEvent('onDocumentContentReady', function() {
        console.log('Document is ready');
    });

    window.Asc.plugin.attachEvent('onSelectionChange', function(event) {
        console.log('Selection changed:', event);
    });
}

// Example 4: Plugin configuration (for reference)
var pluginConfig = {
    name: 'My Plugin',
    nameLocale: {
        'en': 'My Plugin',
        'de': 'Mein Plugin',
        'fr': 'Mon Plugin',
        'es': 'Mi Plugin',
        'it': 'Il mio plugin',
        'ru': 'Мой плагин',
        'pt': 'Meu plugin',
        'zh': '我的插件',
        'ja': '私のプラグイン',

    },
    offered: 'John Doe',
    description: 'A sample plugin',
    guid: 'asc.{12345678-1234-1234-1234-123456789012}',
    version: '1.0.0',
    minVersion: '8.2.0'
};

export { 
    basicPluginExample, 
    documentPluginExample, 
    eventsExample, 
    pluginConfig 
};
