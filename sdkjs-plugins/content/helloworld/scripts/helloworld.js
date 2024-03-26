/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Example insert text into editors (different implementations)
(function(window, undefined){
    
    var text = "Hello world!";

    window.Asc.plugin.init = function()
    {
        var variant = 2;

        switch (variant)
        {
            case 0:
            {
                // serialize command as text
                var sScript = "var oDocument = Api.GetDocument();";
                sScript += "oParagraph = Api.CreateParagraph();";
                sScript += "oParagraph.AddText('Hello world!');";
                sScript += "oDocument.InsertContent([oParagraph]);";
                this.info.recalculate = true;
                this.executeCommand("close", sScript);
                break;
            }
            case 1:
            {
                // call command without external variables
                this.callCommand(function() {
                    var oDocument = Api.GetDocument();
                    var oParagraph = Api.CreateParagraph();
                    oParagraph.AddText("Hello world!");
                    oDocument.InsertContent([oParagraph]);
                }, true);
                break;
            }
            case 2:
            {
                // call command with external variables
                Asc.scope.text = text; // export variable to plugin scope
                this.callCommand(function() {
                    var oDocument = Api.GetDocument();
                    var oParagraph = Api.CreateParagraph();
                    oParagraph.AddText(Asc.scope.text); // or oParagraph.AddText(scope.text);
                    oDocument.InsertContent([oParagraph]);
                }, true);
                break;
            }
            default:
                break;
        }
    };

    window.Asc.plugin.button = function(id)
    {
    };

})(window, undefined);
