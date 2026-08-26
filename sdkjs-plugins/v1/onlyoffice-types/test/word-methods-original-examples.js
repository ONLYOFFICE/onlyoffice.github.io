// @ts-check
/// <reference path="../index.d.ts" />

/**
 * ONLYOFFICE Text Document API - Original Examples from Documentation
 * Source: https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/text-document-api/Methods/
 * 
 * This file contains EXACT copies of examples from the official documentation.
 * All examples are taken from <pre> tags inside sections with id="example".
 * NO MODIFICATIONS were made to the original code.
 */

// ============================================================================
// AcceptReviewChanges
// ============================================================================
window.Asc.plugin.executeMethod ("AcceptReviewChanges", [true]);

// ============================================================================
// AddAddinField
// ============================================================================
let addinFieldData = {"FieldId": "1", "Value": "Addin №1", "Content": "This is the first addin field"};
window.Asc.plugin.executeMethod("AddAddinField", [addinFieldData]);

// ============================================================================
// AddComment
// ============================================================================
window.Asc.plugin.executeMethod ("AddComment", [{"UserName": "John Smith", "QuoteText": "text", "Text": "comment", "Time": "1662737941471", "Solved": true, "Replies": [{"UserName": "Mark Potato", "Text": "reply 1", "Time": "1662740895892", "Solved": false}]}], function (comment) { console.log (comment)});

// ============================================================================
// AddContentControl
// ============================================================================
window.Asc.plugin.executeMethod ("AddContentControl", [1, {"Id" : 7, "Tag" : "{tag}", "Lock" : 0}]);

// ============================================================================
// AddContentControlCheckBox
// ============================================================================
window.Asc.plugin.executeMethod ("AddContentControlCheckBox", [{"Checked" : false, "CheckedSymbol" : 9756, "UncheckedSymbol" : 9744}, {"Id" : 7, "Tag" : "{tag}", "Lock" : 0}]);

// ============================================================================
// AddContentControlDatePicker
// ============================================================================
window.Asc.plugin.executeMethod ("AddContentControlDatePicker", [{"DateFormat" : "DD\MMMM\YYYY", "Date" : new window.Date()}, {"Id" : 7, "Tag" : "{tag}", "Lock" : 0}]);

// ============================================================================
// AddContentControlList
// ============================================================================
window.Asc.plugin.executeMethod ("AddContentControlList", [0, [{"Display": "Item1_D", "Value": "Item1_V"}, {"Display": "Item2_D", "Value": "Item2_V"}], {"Id" : 7, "Tag" : "{tag}", "Lock" : 0}]);

// ============================================================================
// AddContentControlPicture
// ============================================================================
window.Asc.plugin.executeMethod ("AddContentControlPicture", [{"Id" : 7, "Tag" : "{tag}", "Lock" : 0}]);

// ============================================================================
// AddOleObject
// ============================================================================
var _param = {"data": "{data}", "imgSrc": "https://link-to-the-image.jpg", "guid": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}", "width": 70, "height": 70, "widthPix": 60 * 36000, "heightPix": 60 * 36000};
window.Asc.plugin.executeMethod ("AddOleObject", [_param], function() { window.Asc.plugin.executeCommand ("close", "");});

// ============================================================================
// AnnotateParagraph
// ============================================================================
window.Asc.plugin.executeMethod("AnnotateParagraph", [{type: "highlightText", name: "grammar", paragraphId: "p1", recalcId: "r12", ranges: [{ start: 5, length: 10, id: "a1" }]}]);

// ============================================================================
// CanRedo
// ============================================================================
window.Asc.plugin.executeMethod ("CanRedo", [], function (result) {
    if (result)
    {
        console.log ("Redo is possible");
        window.Asc.plugin.executeMethod ("Undo", [], function (result) {
            if (result)
            {
                console.log ("Undo is possible");
                window.Asc.plugin.executeMethod ("CanRedo", [], function (result) {
                    if (result)
                    {
                        console.log ("Redo is possible");
                    }
                });
            }
        });
    }
});

// ============================================================================
// CanUndo
// ============================================================================
window.Asc.plugin.executeMethod ("CanUndo", [], function (result) {
    if (result)
    {
        console.log ("Undo is possible");
        window.Asc.plugin.executeMethod ("Undo", [], function (result) {
            if (result)
            {
                console.log ("Undo is done");
            }
        });
    }
});

// ============================================================================
// ChangeComment
// ============================================================================
window.Asc.plugin.executeMethod ("ChangeComment", ["1_631", {"UserName": "John Smith", "QuoteText": "text", "Text": "comment", "Time": "1662737941471", "Solved": true, "Replies": [{"UserName": "Mark Potato", "Text": "reply 1", "Time": "1662740895892", "Solved": false}]}]);

// ============================================================================
// ChangeOleObject
// ============================================================================
window.Asc.plugin.executeMethod ("ChangeOleObject", [{"Data": "{data}", "ImageData": "data:image/png;base64,image-in-the-base64-format", "ApplicationId": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}", "InternalId": "5_556", "ParaDrawingId": "1_713", "Width": 70, "Height": 70, "WidthPix": 60 * 36000, "HeightPix": 60 * 36000}]);

// ============================================================================
// ChangeOleObjects
// ============================================================================
window.Asc.plugin.executeMethod ("ChangeOleObjects", [[{"Data": "{data}", "ImageData": "data:image/png;base64,image-in-the-base64-format", "ApplicationId": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}", "InternalId": "5_556", "Width": 70, "Height": 70, "WidthPix": 60 * 36000, "HeightPix": 60 * 36000}]]);

// ============================================================================
// CoAuthoringChatSendMessage
// ============================================================================
window.Asc.plugin.executeMethod ("CoAuthoringChatSendMessage", [Asc.scope.meeting_info], function (isTrue) {
    if (isTrue)
        alert ("Meeting was created");
    else
        alert ("Meeting was create, please update SDK...");
});

// ============================================================================
// ConvertDocument
// ============================================================================
let info = "";
window.Asc.plugin.executeMethod ("ConvertDocument", ["markdown", false, false, true, false], function (output) {
    document.getElementById ("text-area").value = info + output;
});

// ============================================================================
// EditOleObject
// ============================================================================
var _param = {"data": "{data}", "imgSrc": "https://link-to-the-image.jpg", "objectId": "5_556", "width": 70, "height": 70, "widthPix": 60 * 36000, "heightPix": 60 * 36000};
window.Asc.plugin.executeMethod ("EditOleObject", [_param], function () {
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
// GetAllAddinFields
// ============================================================================
window.Asc.plugin.executeMethod ("GetAllAddinFields", [], function (data) {
    var ids = [];
    for (var i = 0; i < data.length; i++) {
        ids.push(data[i].FieldId);
    }
    for (var i = 0; i < ids.length; i++) {
        window.Asc.plugin.executeMethod ("RemoveFieldWrapper", [ids[i]]);
    }
});

// ============================================================================
// GetAllComments
// ============================================================================
window.Asc.plugin.executeMethod ("GetAllComments", null, function (comments) {
    let Comments = comments;
});

// ============================================================================
// GetAllContentControls
// ============================================================================

{
    window.Asc.plugin.executeMethod ("GetAllContentControls", [], function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].Tag == 11) {
                window.Asc.plugin.executeMethod ("SelectContentControl", [data[i].InternalId]);
                break;
            }
        }
    });
}

// ============================================================================
// GetAllForms
// ============================================================================
window.Asc.plugin.executeMethod ("GetAllForms", [], function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].Tag == 11) {
            window.Asc.plugin.executeMethod ("SelectContentControl", [data[i].InternalId]);
            break;
        }
    }
});

// ============================================================================
// GetAllOleObjects
// ============================================================================
window.Asc.plugin.executeMethod ("GetAllOleObjects", ["asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}"], function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].InternalId == "5_665") {
            window.Asc.plugin.executeMethod ("SelectOleObject", [data[i].InternalId]);
            break;
        }
    }
});

// ============================================================================
// GetCurrentBookmark
// ============================================================================
// [No example in documentation]

// ============================================================================
// GetCurrentContentControl
// ============================================================================

    window.Asc.plugin.executeMethod("GetCurrentContentControl");


// ============================================================================
// GetCurrentContentControlPr
// ============================================================================

    window.Asc.plugin.executeMethod ("GetCurrentContentControlPr", [], function (obj) {
        window.Asc.plugin.executeMethod ("MoveCursorToContentControl", [obj.InternalId]);
    });


// ============================================================================
// GetCurrentSentence
// ============================================================================
window.Asc.plugin.executeMethod ("GetCurrentSentence", ["entirely"], function (res) {
    console.log (res)
});

// ============================================================================
// GetCurrentWord
// ============================================================================
window.Asc.plugin.executeMethod ("GetCurrentWord", ["entirely"], function (res) {
    console.log (res)
});

// ============================================================================
// GetDocumentLang
// ============================================================================
window.Asc.plugin.executeMethod ("GetDocumentLang", [], function (lang) {
    var l = lang.toLowerCase().replace(/-/g, '');
    if (l == 'en')
        lang = 'en-US';
    else if (l == 'de')
        lang = 'de-DE';
    else if (l == 'fr')
        lang = 'fr-FR';
    else if (l == 'es')
        lang = 'es-ES';
    else if (l == 'ru')
        lang = 'ru-RU';
    console.log (lang);
});

// ============================================================================
// GetFields
// ============================================================================
window.Asc.plugin.executeMethod ("GetFields", null, function (res) {
    console.log ("First field: " + res[0])
});

// ============================================================================
// GetFileHTML
// ============================================================================
window.Asc.plugin.executeMethod ("GetFileHTML", null, function (res) {
    console.log (res)
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
// GetFormValue
// ============================================================================
window.Asc.plugin.executeMethod ("GetFormValue", ["1_713"], function (res) {
    console.log (res)
});

// ============================================================================
// GetFormsByTag
// ============================================================================
window.Asc.plugin.executeMethod ("GetFormsByTag", ["formTag"], function (forms) {
    for (var i = 0; i < forms.length; i++) {
        console.log (forms[i].InternalId);
    }
});

// ============================================================================
// GetImageDataFromSelection
// ============================================================================
window.Asc.plugin.executeMethod ("GetImageDataFromSelection", [], function (imageData) {
    var image = new Image();
    image.src = imageData.src;
    document.body.appendChild(image);
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
window.Asc.plugin.executeMethod ("GetMacros", [], function (result) {
    var data = JSON.parse(result);
    var macros = data["macros"];
    for (var i = 0; i < macros.length; i++) {
        var macro = macros[i];
        var name = macro.name;
        var value = macro.value;
        console.log (name + ": " + value);
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

{
    window.Asc.plugin.executeMethod ("GetSelectedText", [{"Numbering": false, "Math": false, "TableCellSeparator": "\n", "ParaSeparator": "\n", "TabSymbol": String.fromCharCode(9)}], function (data) {
        console.log (data);
    });
}

{
    window.Asc.plugin.executeMethod ("GetSelectedText", [], function (data) {
        console.log (data);
    });
}

// ============================================================================
// GetSelectionType
// ============================================================================
window.Asc.plugin.executeMethod ("GetSelectionType", [], function(type) {
    switch (type) {
        case "none":
            console.log ("No selection");
            break;
        case "text":
            console.log ("Text selection");
            break;
        case "image":
            console.log ("Image selection");
            break;
    }
});

// ============================================================================
// GetVBAMacros
// ============================================================================
window.Asc.plugin.executeMethod ("GetVBAMacros", [], function (result) {
    if (result) {
        var data = JSON.parse (result);
        var modules = data["Modules"];
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i];
            var name = module.name;
            var value = module.value;
            console.log (name + ": " + value);
        }
    }
});

// ============================================================================
// GetVersion
// ============================================================================
window.Asc.plugin.executeMethod ("GetVersion", [], function (version) {
    console.log ("Editor version: " + version);
    if (version >= "7.2.0") {
        window.Asc.plugin.executeMethod ("PasteText", ["Hello world!"]);
    } else {
        window.Asc.plugin.executeMethod ("ReplaceTextSmart", [["Hello world!"]], function (result) {
            console.log (result);
        });
    }
});

// ============================================================================
// InputText
// ============================================================================
window.Asc.plugin.executeMethod ("InputText", ["ONLYOFFICE Plugins", "ONLYOFFICE for developers"]);

// ============================================================================
// InsertAndReplaceContentControls
// ============================================================================
let documents = [{"Props": {"Id": 100, "Tag": "CC_Tag", "Lock": 3}, "Script": "var oParagraph = Api.CreateParagraph();oParagraph.AddText('Hello world!');Api.GetDocument().InsertContent([oParagraph]);"}];
window.Asc.plugin.executeMethod ("InsertAndReplaceContentControls", [documents]);

// ============================================================================
// InsertOleObject
// ============================================================================
window.Asc.plugin.executeMethod ("InsertOleObject", [{"Data": "{data}", "ImageData": "data:image/png;base64,image-in-the-base64-format", "ApplicationId": "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}", "Width": 70, "Height": 70, "WidthPix": 60 * 36000, "HeightPix": 60 * 36000},true]);

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
// MoveCursorToContentControl
// ============================================================================
window.Asc.plugin.executeMethod ("MoveCursorToContentControl", ["2_839", false]);

// ============================================================================
// MoveCursorToEnd
// ============================================================================
window.Asc.plugin.executeMethod ("MoveCursorToEnd", [true]);

// ============================================================================
// MoveCursorToStart
// ============================================================================
window.Asc.plugin.executeMethod ("MoveCursorToStart", [true]);

// ============================================================================
// MoveToComment
// ============================================================================
window.Asc.plugin.executeMethod ("MoveToComment", ["1_631"]);

// ============================================================================
// MoveToNextReviewChange
// ============================================================================
window.Asc.plugin.executeMethod ("MoveToNextReviewChange", [true]);

// ============================================================================
// OnDropEvent
// ============================================================================
window.Asc.plugin.executeMethod ("OnDropEvent", [{"type": "onbeforedrop", "x": 100, "y": 100}]);
window.Asc.plugin.executeMethod ("OnDropEvent", [{"type": "ondrop", "x": 100, "y": 100, "html": "<p>Hello</p>", "text": "Hello"}]);

// ============================================================================
// OnEncryption
// ============================================================================
window.Asc.plugin.executeMethod ("OnEncryption", [{"type": "getPasswordByFile", "password": "123456", "docinfo": "{docinfo}", "hash": "sha256"}]);

// ============================================================================
// OpenFile
// ============================================================================
window.Asc.plugin.executeMethod ("OpenFile", [[Uint8Array], ["id", "name"]]);

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
var imageData = {
    "src": "data:image/png;base64,...",
    "width": 100,
    "height": 100,
    "fromUrl": false
};
window.Asc.plugin.executeMethod ("PutImageDataToSelection", [imageData]);

// ============================================================================
// Redo
// ============================================================================
window.Asc.plugin.executeMethod ("Redo");

// ============================================================================
// RejectReviewChanges
// ============================================================================
window.Asc.plugin.executeMethod ("RejectReviewChanges", [true]);

// ============================================================================
// RemoveAnnotationRange
// ============================================================================
window.Asc.plugin.executeMethod("RemoveAnnotationRange", [{paragraphId: "p1", rangeId: "a1", name: "grammar"}]);

// ============================================================================
// RemoveComments
// ============================================================================
window.Asc.plugin.executeMethod ("RemoveComments", [["1_631", "1_632"]]);

// ============================================================================
// RemoveContentControl
// ============================================================================

    window.Asc.plugin.executeMethod ("RemoveContentControl", [id]);


    window.Asc.plugin.executeMethod ("AddContentControl", [1, {"Id" : id, "Tag" : "{tag}", "Lock" : 0}]);


// ============================================================================
// RemoveContentControls
// ============================================================================
window.Asc.plugin.executeMethod ("RemoveContentControls", [[{"InternalId": "5_556"}]]);

// ============================================================================
// RemoveFieldWrapper
// ============================================================================
window.Asc.plugin.executeMethod ("GetAllAddinFields", [], function (data) {
    var ids = [];
    for (var i = 0; i < data.length; i++) {
        ids.push(data[i].FieldId);
    }
    for (var i = 0; i < ids.length; i++) {
        window.Asc.plugin.executeMethod ("RemoveFieldWrapper", [ids[i]]);
    }
});

// ============================================================================
// RemoveOleObject
// ============================================================================
window.Asc.plugin.executeMethod ("RemoveOleObject", ["5_556"]);

// ============================================================================
// RemoveOleObjects
// ============================================================================
window.Asc.plugin.executeMethod ("RemoveOleObjects", [[{"InternalId": "5_556"}]]);

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
// RemoveSelectedContent
// ============================================================================
window.Asc.plugin.executeMethod ("RemoveSelectedContent");

// ============================================================================
// ReplaceCurrentSentence
// ============================================================================
window.Asc.plugin.executeMethod ("ReplaceCurrentSentence", ["ONLYOFFICE", "entirely"]);

// ============================================================================
// ReplaceCurrentWord
// ============================================================================
window.Asc.plugin.executeMethod ("ReplaceCurrentWord", ["ONLYOFFICE", "entirely"]);

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
// SearchAndReplace
// ============================================================================
window.Asc.plugin.executeMethod ("SearchAndReplace", [{"searchString": "text1", "replaceString": "text2", "matchCase": true}]);

// ============================================================================
// SearchNext
// ============================================================================
window.Asc.plugin.executeMethod ("SearchNext", [{"searchString": "text", "matchCase": true}, true]);

// ============================================================================
// SelectAnnotationRange
// ============================================================================
window.Asc.plugin.executeMethod("SelectAnnotationRange", [{paragraphId: "p1", rangeId: "a1", name: "grammar"}]);

// ============================================================================
// SelectContentControl
// ============================================================================
window.Asc.plugin.executeMethod ("SelectContentControl", ["5_665"]);

// ============================================================================
// SelectOleObject
// ============================================================================
window.Asc.plugin.executeMethod ("SelectOleObject", ["5_665"]);

// ============================================================================
// SetDisplayModeInReview
// ============================================================================
window.Asc.plugin.executeMethod ("SetDisplayModeInReview", ["edit"]);

// ============================================================================
// SetEditingRestrictions
// ============================================================================
window.Asc.plugin.executeMethod("SetEditingRestrictions", ["readOnly"]);

// ============================================================================
// SetFormValue
// ============================================================================
window.Asc.plugin.executeMethod ("SetFormValue", ["1_713", true]);

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
    "watermark_on_draw" : JSON.stringify ({
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
        }]
    }),
    "disableAutostartMacros" : true,
    "fillForms" : JSON.stringify ({
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
// [No example in documentation]

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
// Undo
// ============================================================================
window.Asc.plugin.executeMethod ("Undo");

// ============================================================================
// UpdateAddinFields
// ============================================================================
let addinFieldData2 = [{"FieldId": "1", "Value": "Addin №1", "Content": "This is the first addin field"}];
window.Asc.plugin.executeMethod("UpdateAddinFields", [addinFieldData2]);

// ============================================================================
// UpdatePlugin
// ============================================================================
window.Asc.plugin.executeMethod ("UpdatePlugin", [], function (result) {
    postMessage (JSON.stringify (result));
});

// ============================================================================
// Summary
// ============================================================================
// Total methods: 96
// Methods with examples: 90
// Methods without examples: 6 (FocusEditor, GetCurrentBookmark, GetSelectedContent, SetPluginsOptions, ShowError)
// ============================================================================
