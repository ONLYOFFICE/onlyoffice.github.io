// Example plugin demonstrating type usage
// This file shows how to use the OnlyOffice Plugin API types

// @ts-check

/// <reference path="./index.d.ts" />

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
        // Use JSDoc to specify Api type: /** @type {import("./index").ApiWord} */
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
            var activeSheet = Api.GetActiveSheet();
            Api.GetRange("A1").SetValue("Hello from plugin!");
        }, true);
    };
}

// Example 2b: Using callCommand with Slide (Presentation) editor
function presentationPluginExample() {
    window.Asc.plugin.init = function() {
        window.Asc.plugin.callCommand(function() {
            var oPresentation = Api.GetPresentation();
            var oSlide = Api.CreateSlide();
            oPresentation.AddSlide(oSlide);
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
    description: 'A sample plugin',
    guid: 'asc.{12345678-1234-1234-1234-123456789012}',
    minVersion: '7.0.0'
};

export { 
    basicPluginExample, 
    documentPluginExample, 
    eventsExample, 
    pluginConfig 
};
