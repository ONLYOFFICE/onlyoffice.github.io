// @ts-check
/// <reference path="../index.d.ts" />

/**
 * ONLYOFFICE Spreadsheet API - Original Examples from Documentation
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/spreadsheet-api/Methods/
 *
 * This file contains EXACT copies of examples from the official documentation.
 * All examples are taken from the "Example" section of each method's docs page.
 * NO MODIFICATIONS were made to the original code.
 *
 * A handful of snippets reference variables/functions from the surrounding
 * plugin code shown on the docs page, which isn't part of the copied example
 * block itself. They're declared here only so this file type-checks as a
 * smoke test of the executeMethod call shapes - the copied calls themselves
 * are untouched.
 */
/** @type {any} */
var config;
/** @type {any} */
var Content;
/** @type {any} */
var Comments;
function addComments(_comments) {}
function create_guid() { return ""; }
function updateMenu() {}
/** @type {any} */
var pos;
/** @type {any} */
var imageEditor;
/** @type {any} */
var initializationDone;
function CreateImageEditor() {}
/** @type {any} */
var sText;
function ExecTypograf(_sText) {}
/** @type {any} */
var $;
/** @type {any} */
var paste_done;
/** @type {any} */
var ifr;
/** @type {string | null} */
var removeGuid = null;
function setPasswordByFile(_algorithm, _password) {}

// ============================================================================
// AddComment
// ============================================================================
window.Asc.plugin.executeMethod ("AddComment", [
    {
        "UserName": "John Smith",
        "QuoteText": "text",
        "Text": "comment",
        "Time": "1662737941471",
        "Solved": true,
        "Replies": [
            {
                "UserName": "Mark Potato",
                "Text": "reply 1",
                "Time": "1662740895892",
                "Solved": false
            }
        ]
    }
], function (comment) {
    console.log (comment)
});

// ============================================================================
// AddOleObject
// ============================================================================
var _param = {
    "data": "{data}",
    "imgSrc": "https://link-to-the-image.jpg",
    "guid": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}",
    "width": 70,
    "height": 70,
    "widthPix": 60 * 36000,
    "heightPix": 60 * 36000
};
window.Asc.plugin.executeMethod ("AddOleObject", [_param], function() {
    window.Asc.plugin.executeCommand ("close", "");
});

// ============================================================================
// ChangeComment
// ============================================================================
window.Asc.plugin.executeMethod ("ChangeComment", ["1_631",
    {
        "UserName": "John Smith",
        "QuoteText": "text",
        "Text": "comment",
        "Time": "1662737941471",
        "Solved": true,
        "Replies": [
            {
                "UserName": "Mark Potato",
                "Text": "reply 1",
                "Time": "1662740895892",
                "Solved": false
            }
        ]
    }
]);

// ============================================================================
// CoAuthoringChatSendMessage
// ============================================================================
window.Asc.plugin.executeMethod ("CoAuthoringChatSendMessage", [Asc.scope.meeting_info], function (isTrue) {
    if (isTrue)
        alert ("Meeting was created");
    else
        alert ("Meeting was create, please update SDK for checking info about created meeting in chat.");
});

// ============================================================================
// EditOleObject
// ============================================================================
var _param2 = {
    "data": "{data}",
    "imgSrc": "https://link-to-the-image.jpg",
    "objectId": "5_556",
    "width": 70,
    "height": 70,
    "widthPix": 60 * 36000,
    "heightPix": 60 * 36000
};
window.Asc.plugin.executeMethod ("EditOleObject", [_param2], function () {
    window.Asc.plugin.executeCommand ("close", "");
});

// ============================================================================
// EndAction
// ============================================================================
window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to local storage...", ""]);

// ============================================================================
// FocusEditor
// ============================================================================
// [No example in documentation]

// ============================================================================
// GetAllComments
// ============================================================================
window.Asc.plugin.executeMethod ("GetAllComments", null, function (comments) {
    Comments = comments;
    addComments (comments);
});

// ============================================================================
// GetCustomFunctions
// ============================================================================
window.Asc.plugin.executeMethod ("GetCustomFunctions", null, function (res) {
    console.log ("First custom function: " + res[0])
});

// ============================================================================
// GetFileToDownload
// ============================================================================
window.Asc.plugin.executeMethod ("GetFileToDownload", ["pdf"], function (res) {
    console.log (res)
});

// ============================================================================
// GetFontList
// ============================================================================
window.Asc.plugin.executeMethod ("GetFontList", null, function (res) {
    console.log (res)
});

// ============================================================================
// GetImageDataFromSelection
// ============================================================================
window.Asc.plugin.executeMethod ("GetImageDataFromSelection", [], function (result) {
    let image = document.createElement("img");
    image.src = result.src;
    image.width = result.width;
    image.height = result.height;
    CreateImageEditor ();
    initializationDone = true;
    var imageHeight = null;
    image.height > 500 ? imageHeight = 500 : imageHeight = image.height;
    window.Asc.plugin.resizeWindow (undefined, undefined, 870, imageHeight + 300, 0, 0);
});

// ============================================================================
// GetInstalledPlugins
// ============================================================================
window.Asc.plugin.executeMethod ("GetInstalledPlugins", null, function (result) {
    postMessage (JSON.stringify ({type: 'InstalledPlugins', data: result }));
});

// ============================================================================
// GetMacros
// ============================================================================
// NOTE: the docs Example passes [JSON.stringify(Content)] as the first argument
// to GetMacros, even though the same page's Parameters section states "This
// method doesn't have any parameters." (verified 2026-07-30 against both the
// live docs page and the source .md in the ONLYOFFICE/api.onlyoffice.com repo -
// looks like a copy/paste leftover from the SetMacros example.) CellMethodArgs
// was made to accept an optional arg to accommodate this real, verified example
// without breaking plain no-arg callers - see src/cell-methods.d.ts.
window.Asc.plugin.executeMethod ("GetMacros", [JSON.stringify(Content)], function(data) {
    try
    {
        Content = JSON.parse (data);
        for (var i = 0; i < Content.macrosArray.length; i++)
        {
            var value = Content.macrosArray[i].name;
            if (undefined === value)
                value = "";
            value = value.replace (/&/g,'&amp;');
            value = value.replace (/</g,'&lt;');
            value = value.replace (/>/g,'&gt;');
            value = value.replace (/'/g,'&apos;');
            value = value.replace (/"/g,'&quot;');
            Content.macrosArray[i].name = value;
        }
    }
    catch (err)
    {
        Content = {
            macrosArray : [],
            current : -1
        };
    }
});

// ============================================================================
// GetSelectedContent
// ============================================================================
// [No example in documentation]

// ============================================================================
// GetSelectedOleObjects
// ============================================================================
window.Asc.plugin.executeMethod ("GetSelectedOleObjects");

// ============================================================================
// GetSelectedText
// ============================================================================
function CorrectText () {
    switch (window.Asc.plugin.info.editorType) {
        case 'word':
        case 'slide': {
            window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": '\n', "ParaSeparator": '\n', "TabSymbol": String.fromCharCode(9)}], function (data) {
                sText = data;
                ExecTypograf (sText);
            });
            break;
        }
        case 'cell': {
            window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": '\n', "ParaSeparator": '\n', "TabSymbol": String.fromCharCode(9)}], function (data) {
                if (data == '') {
                    sText = sText.replace (/\t/g, '\n');
                    ExecTypograf (sText);
                }
                else {
                    sText = data;
                    ExecTypograf (sText);
                }
            });
            break;
        }
    }
}

// ============================================================================
// GetSelectionType
// ============================================================================
window.Asc.plugin.executeMethod ("GetSelectionType", [], function(type) {
    switch (type) {
        case "none":
        case "drawing":
            window.Asc.plugin.executeMethod ("PasteText", [$("#txt_shower")[0].innerText], function (result) {
                paste_done = true;
            });
            break;
        case "text":
            window.Asc.plugin.callCommand (function() {
                Api.ReplaceTextSmart (Asc.scope.arr);
            }, undefined, undefined, function(result) {
                paste_done = true;
            });
            break;
    }
});

// ============================================================================
// GetVBAMacros
// ============================================================================
window.Asc.plugin.executeMethod ("GetVBAMacros", null, function (data) {
    if (data && typeof data === 'string' && data.includes ('<Module')) {
        var arr = data.split ('<Module ').filter (function (el) {return el.includes ('Type="Procedural"')});
        arr.forEach (function (el) {
            var start = el.indexOf ('<SourceCode>') + 12;
            var end = el.indexOf ('</SourceCode>', start);
            var macros = el.slice (start, end);

            start = el.indexOf ('Name="') + 6;
            end = el.indexOf ('"', start);
            var name = el.slice (start, end);
            var index = Content.macrosArray.findIndex (function (macr) {return macr.name == name});
            if (index == -1) {
                macros = macros.replace (/&amp;/g,'&');
                macros = macros.replace (/&lt;/g,'<');
                macros = macros.replace (/&gt;/g,'>');
                macros = macros.replace (/&apos;/g,'\'');
                macros = macros.replace (/&quot;/g,'"');
                macros = macros.replace (/Attribute [\w \.="\\]*/g,'');
                Content.macrosArray.push (
                    {
                        name: name,
                        value: '(function ()\n{\n\t/* Enter your code here. */\n})();\n\n/*\nExecution of VBA commands does not support.\n' + macros + '*/',
                        guid: create_guid ()
                    }
                );
            }
        });
    }
    updateMenu ();
    // @ts-ignore - CustomContextMenu is app-level plugin UI code, not part of the SDK's ambient types
    window.CustomContextMenu.init ();
    if (Content.current === -1)
    {
        let event = new Event ("click");
        document.getElementById ("button_new").dispatchEvent (event);
    }
});

// ============================================================================
// GetVersion
// ============================================================================
window.Asc.plugin.executeMethod ("GetVersion", [], function (version) {
    if (version === undefined) {
        window.Asc.plugin.executeMethod ("PasteText", [ifr.contentDocument.getElementById ("google_translate_element").outerText], function (result) {
            paste_done = true;
        });
    }
    else {
        window.Asc.plugin.executeMethod ("GetSelectionType", [], function (type) {
            switch (type) {
                case "none":
                case "drawing":
                    window.Asc.plugin.executeMethod("PasteText", [ifr.contentDocument.getElementById ("google_translate_element").outerText], function (result) {
                        paste_done = true;
                    });
                    break;
                case "text":
                    window.Asc.plugin.callCommand (function () {
                        Api.ReplaceTextSmart (Asc.scope.arr);
                    }, undefined, undefined, function (result) {
                        paste_done = true;
                    });
                    break;
            }
        });
    }
});

// ============================================================================
// InputText
// ============================================================================
window.Asc.plugin.executeMethod ("InputText", ["ONLYOFFICE Plugins", "ONLYOFFICE for developers"]);

// ============================================================================
// InstallPlugin
// ============================================================================
window.Asc.plugin.executeMethod ("InstallPlugin", [config], function (result) {
    postMessage (JSON.stringify (result));
});

// ============================================================================
// MouseMoveWindow
// ============================================================================
window.Asc.plugin.executeMethod ("MouseMoveWindow", ["iframe_asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9841}", 70, 40]);

// ============================================================================
// MouseUpWindow
// ============================================================================
window.Asc.plugin.executeMethod ("MouseUpWindow", ["iframe_asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9841}", 70, 40]);

// ============================================================================
// OnDropEvent
// ============================================================================
window.Asc.plugin.executeMethod ("OnDropEvent", [{
  "type": "onbeforedrop",
  "x" : pos.x,
  "y" : pos.y
}]);

window.Asc.plugin.executeMethod ("OnDropEvent", [{
  "type": "ondrop",
  "x" : pos.x,
  "y" : pos.y,
  "text" : "test text",
  "html" : "<span>test html</span>"
}]);

// ============================================================================
// OnEncryption
// ============================================================================
window.Asc.plugin.executeMethod ("OnEncryption", [
    {
        "type": "getPasswordByFile",
        "password": "123456",
        "docinfo": "{docinfo}",
        "hash": "sha256"
    }
]);

// ============================================================================
// OpenFile
// ============================================================================
// [No example in documentation] - this method also has no dedicated docs page
// under the spreadsheet-api Methods section at all (verified: no OpenFile.md
// in ONLYOFFICE/api.onlyoffice.com's spreadsheet-api/Methods directory).

// ============================================================================
// PasteHtml
// ============================================================================
window.Asc.plugin.executeMethod ("PasteHtml", ["&lt;p&gt;&lt;b&gt;Plugin methods for OLE objects&lt;/b&gt;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;AddOleObject&lt;/li&gt;&lt;li&gt;EditOleObject&lt;/li&gt;&lt;/ul&gt;"]);

// ============================================================================
// PasteText
// ============================================================================
window.Asc.plugin.executeMethod ("PasteText", ["ONLYOFFICE for developers"]);

// ============================================================================
// PutImageDataToSelection
// ============================================================================
// @ts-ignore - saveImage is app-level plugin UI code, not part of the SDK's ambient Window type
window.saveImage = function () {
    let imageSrc = imageEditor.toDataURL ();
    let editorDimension = imageEditor.getCanvasSize ();
    let width = editorDimension.width;
    let height = editorDimension.height;
    let imageData = {
        "src": imageSrc,
        "width": width,
        "height": height
    };
    window.Asc.plugin.executeMethod ("PutImageDataToSelection", [imageData]);
    window.Asc.plugin.executeCommand ("close", "");
};

// ============================================================================
// RemoveComments
// ============================================================================
window.Asc.plugin.executeMethod ("RemoveComments", [["1_631", "1_632"]]);

// ============================================================================
// RemoveOleObject
// ============================================================================
const addOleToWorksheet = function () {
	const worksheet = Api.GetActiveSheet();
	/** @type {any} */
	const oleObject = worksheet.AddOleObject(
		'https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png',
		130 * 36000, 90 * 36000,
		'https://youtu.be/SKGz4pmnpgY',
		'asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}',
		0, 2 * 36000, 4, 3 * 36000
	);
	return oleObject.Drawing.GetId();
};
Asc.plugin.callCommand(addOleToWorksheet, false, true, (id) => {
	console.log('We added OLE object with id: ' + id);
	Asc.plugin.executeMethod('RemoveOleObject', [id]);
	console.log('We removed OLE object with id: ' + id);
});

// ============================================================================
// RemovePlugin
// ============================================================================
function removePlugin(backup) {
    if (removeGuid)
        window.Asc.plugin.executeMethod('RemovePlugin', [removeGuid, backup], function(result) {
            postMessage(result);
        });

    removeGuid = null;
};

// ============================================================================
// ReplaceTextSmart
// ============================================================================
window.Asc.plugin.executeMethod ("ReplaceTextSmart", [Asc.scope.arr, String.fromCharCode(9), String.fromCharCode(13)], function (isDone) {
    if (!isDone)
        window.Asc.plugin.callCommand (function () {
            Api.ReplaceTextSmart (Asc.scope.arr);
        });
});

// ============================================================================
// ResizeWindow
// ============================================================================
// [No example in documentation] - this method also has no dedicated docs page
// under the spreadsheet-api Methods section at all (verified: no ResizeWindow.md
// in ONLYOFFICE/api.onlyoffice.com's spreadsheet-api/Methods directory).

// ============================================================================
// SetCustomFunctions
// ============================================================================
window.Asc.plugin.executeMethod ("SetCustomFunctions", [JSON.stringify (Content)], function () {
    window.Asc.plugin.executeCommand ("close", "");
});

// ============================================================================
// SetMacros
// ============================================================================
window.Asc.plugin.executeMethod ("SetMacros", [JSON.stringify (Content)], function () {
    window.Asc.plugin.executeCommand ("close", "");
});

// ============================================================================
// SetPluginsOptions
// ============================================================================
// [No example in documentation]

// ============================================================================
// SetProperties
// ============================================================================
var initSettings = {
    "copyoutenabled" : false,
    "hideContentControlTrack" : false,
    "watermark_on_draw" : JSON.stringify ( {
        "transparent" : 0.3,
        "type" : "rect",
        "width" : 100,
        "height" : 100,
        "rotate" : -45,
        "margins" : [ 10, 10, 10, 10 ],
        "fill" : [255, 0, 0],
        "stroke-width" : 1,
        "stroke" : [0, 0, 255],
        "align" : 1,

        "paragraphs" : [ {
            "align" : 2,
            "fill" : [255, 0, 0],
            "linespacing" : 1,

            "runs" : [
                        {
                            "text" : "Do not steal, %user_name%!",
                            "fill" : [0, 0, 0],
                            "font-family" : "Arial",
                            "font-size" : 40,
                            "bold" : true,
                            "italic" : false,
                            "strikeout" : false,
                            "underline" : false
                        },
                        {
                            "text" : "<%br%>"
                        }
                    ]
            }
        ]
    }),
    "disableAutostartMacros" : true,
    "fillForms" : JSON.stringify ( {
        "tags" : {
            "111" : {
                "text" : "Text in form with tag 111",
                "checkBox" : "true",
                "picture" : "https://upload.wikimedia.org/wikipedia/commons/9/91/ONLYOFFICE_logo.png",
                "comboBox" : "item1"
            },
            "222" : {
                "text" : "Text in form with tag 222",
                "checkBox" : "false",
                "comboBox" : "item2"
            },
            "333" : {
                "text" : "OnlyOffice"
            }
        }
    })
};
window.Asc.plugin.executeMethod ("SetProperties", [initSettings], function () {
    window.Asc.plugin.executeCommand ("close", "");
});

// ============================================================================
// ShowButton
// ============================================================================
window.Asc.plugin.executeMethod ("ShowButton", ["back", false, "right"]);

// ============================================================================
// ShowError
// ============================================================================
{
    const text = 'Message you want to show';
    const level = 0; // Warning, not an error
    Asc.plugin.executeMethod('ShowError', [text, level]);
}

// ============================================================================
// ShowInputHelper
// ============================================================================
window.Asc.plugin.executeMethod ("ShowInputHelper", ["asc.{UUID}", 70, 70, true]);

// ============================================================================
// StartAction
// ============================================================================
window.Asc.plugin.executeMethod ("StartAction", ["Block", "Save to local storage..."], function () {
    setPasswordByFile ("sha256", "123456");

    setTimeout (function () {
        window.Asc.plugin.executeMethod ("EndAction", ["Block", "Save to localstorage..."]);
    }, 200);
});

// ============================================================================
// UnShowInputHelper
// ============================================================================
window.Asc.plugin.executeMethod ("UnShowInputHelper", ["asc.{UUID}", true]);

// ============================================================================
// UpdatePlugin
// ============================================================================
window.Asc.plugin.executeMethod ("UpdatePlugin", [config], function (result) {
    postMessage (JSON.stringify (result));
});

// ============================================================================
// Summary
// ============================================================================
// Total methods: 45
// Methods with examples: 40
// Methods without examples: 5 (FocusEditor, GetSelectedContent, OpenFile,
//   ResizeWindow, SetPluginsOptions) - OpenFile and ResizeWindow additionally
//   have no dedicated docs page at all under spreadsheet-api/Methods/.
// ============================================================================
