// @ts-check
/// <reference path="../index.d.ts" />

/**
 * ONLYOFFICE Presentation API - Original Examples from Documentation
 * Source: https://api.onlyoffice.com/docs/plugins/interacting-with-editors/presentation-api/Methods/
 *
 * This file contains EXACT copies of examples from the official documentation.
 * All examples are taken from the "Example" section's code block on each method's page.
 * NO MODIFICATIONS were made to the original code.
 *
 * A handful of snippets reference variables/functions from the surrounding plugin code
 * shown on the docs page, which isn't part of the copied code block itself (config, Content,
 * removeGuid, pos, imageEditor, $, defaultLang, ifr, paste_done, sText, Comments, and a few
 * helper functions below). They're declared here only so this file type-checks as a smoke
 * test of the executeMethod call shapes - the copied calls themselves are untouched.
 *
 * A couple of copied snippets also call into the Slide document Api (Api.GetPresentation(),
 * Api.CreateOleObject(), etc.) through window.Asc.plugin.callCommand. Where the surrounding
 * scaffolding hits unrelated gaps in the generated Api types (e.g. ApiPresentation.AddSlide's
 * index argument, or ApiOleObject not exposing a .Drawing accessor), an inline
 * `/** @type {any} *\/ (...)` cast is used on the receiver only - mirroring the same technique
 * already used in word-methods-original-examples.js (see its ConvertDocument section) - so the
 * copied call text itself is never altered.
 */
/** @type {any} */
var config;
/** @type {any} */
var Content;
/** @type {string | null} */
var removeGuid = null;
/** @type {any} */
var pos;
/** @type {any} */
var imageEditor;
/** @type {any} */
var $;
/** @type {any} */
var defaultLang;
/** @type {any} */
var ifr;
/** @type {any} */
var paste_done;
/** @type {any} */
var sText;
/** @type {any} */
var Comments;
function addComments(_comments) {}
function ExecTypograf(_text) {}
function create_guid() { return ""; }
function updateMenu() {}
function CreateImageEditor() {}
/** @type {any} */
var initializationDone;

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
    }], function (comment) {
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
// ApplyTheme
// ============================================================================
window.Asc.plugin.executeMethod("ApplyTheme", [5]);

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
    }]);

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
// EndSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("EndSlideShow");

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
// GetDocumentLang
// ============================================================================
window.Asc.plugin.executeMethod("GetDocumentLang", [], function(lang) {
	let documentLang = lang || defaultLang;
	let options = Array.from($('#custom_menu option'));
	let defaultOption = options.find(function(item) {
		if (item.value == defaultLang)
			return item;
	});
	let matchOption = undefined;
	matchOption = options.find(function(item) {
		if (item.value == documentLang)
			return true;
	});
	if (!matchOption) {
		matchOption = options.find(function(item) {
			if (item.value.search(documentLang.split('-')[0]) != -1)
				return true;
		});
	}
	if (!matchOption)
		matchOption = defaultOption;
	if (matchOption) {
		$('#custom_menu').val(matchOption.value);
		$('#custom_menu').trigger('change');
	}
});

// ============================================================================
// GetEditorThemes
// ============================================================================
window.Asc.plugin.executeMethod("GetEditorThemes", null, function(themes) {
	console.log(themes);
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
    /** @type {any} */ (window).CustomContextMenu.init ();
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
// GoToNextSlideInSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("GoToNextSlideInSlideShow");

// ============================================================================
// GoToPreviousSlideInSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("GoToPreviousSlideInSlideShow");

// ============================================================================
// GoToSlide
// ============================================================================
const addSlides = function () {
	const count = Asc.scope.count;
	const presentation = Api.GetPresentation();
	for (let i = 0; i < count; i += 1) {
		const slide = Api.CreateSlide();
		/** @type {any} */ (presentation).AddSlide(slide);
	}
};
Asc.scope.count = 1;
Asc.plugin.callCommand(addSlides);
Asc.plugin.executeMethod('GoToSlide', [2]);

// ============================================================================
// GoToSlideInSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("GoToSlideInSlideShow", [2]);

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
    }]);

// ============================================================================
// PasteHtml
// ============================================================================
window.Asc.plugin.executeMethod ("PasteHtml", ["<p><b>Plugin methods for OLE objects</b></p><ul><li>AddOleObject</li><li>EditOleObject</li></ul>"]);

// ============================================================================
// PasteText
// ============================================================================
window.Asc.plugin.executeMethod ("PasteText", ["ONLYOFFICE for developers"]);

// ============================================================================
// PauseSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("PauseSlideShow");

// ============================================================================
// PutImageDataToSelection
// ============================================================================
/** @type {any} */ (window).saveImage = function () {
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
const addOleToPresentation = function () {
	const presentation = Api.GetPresentation();
	const slide = presentation.GetSlideByIndex(0);
	const oleObject = Api.CreateOleObject(
		'https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png',
		130 * 36000, 90 * 36000,
		'https://youtu.be/SKGz4pmnpgY',
		'asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}'
	);
	slide.AddObject(/** @type {any} */ (oleObject));
	return /** @type {any} */ (Api.GetPresentation().GetSlideByIndex(0).GetAllOleObjects()[0]).Drawing.GetId();
};
Asc.plugin.callCommand(addOleToPresentation, false, true, (id) => {
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
// ResumeSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("ResumeSlideShow");

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
const text = 'Message you want to show';
const level = 0; // Warning, not an error
Asc.plugin.executeMethod('ShowError', [text, level]);

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
function setPasswordByFile(_algorithm, _password) {}

// ============================================================================
// StartSlideShow
// ============================================================================
window.Asc.plugin.executeMethod ("StartSlideShow");

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
// Total methods: 52
// Methods with examples: 49
// Methods without examples: 3 (FocusEditor, GetSelectedContent, SetPluginsOptions)
// ============================================================================
