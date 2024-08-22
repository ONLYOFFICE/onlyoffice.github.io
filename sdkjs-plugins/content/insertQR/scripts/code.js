/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function (window, undefined) {

  // Initialize global variables
  let textQR = ""; // Initialize selected text variable
  let modalWindow; // Declare modalWindow at the top level
  let warningModalWindow;
  // Define global variables to store QR parameters
  let qrText;
  let qrWidth;
  let qrHeight;
  let qrColor;
  let bgColor;
  let qr;
  // Define flags to display modal windows
  let displaySettings = 'displaySettings';
  let textWarning = 'textWarning';

  let currentObjectId = undefined;

  window.Asc.plugin.init = function(data) 
  {
    if (data) {
      let sep = ";;";
      let posQrColor = data.indexOf(sep);
      if (-1 == posQrColor)
        return;
      let posBgColor = data.indexOf(sep, posQrColor + 2);
      if (-1 == posBgColor)
        return;
      let posText = data.indexOf(sep, posBgColor + 2);
      if (-1 == posText)
        return;
      qrColor = data.substring(posQrColor + 2, posBgColor);
      bgColor = data.substring(posBgColor + 2, posText);
      qrText = data.substring(posText + 2);
      textQR = qrText;

      if (window.Asc.plugin.info.objectId)
        currentObjectId = window.Asc.plugin.info.objectId;

      displayFunction(displaySettings);
    }
  };

  // Attach event for context menu click on GenerateQR
  window.Asc.plugin.attachContextMenuClickEvent('GenerateQR', function () {
    displayFunction(displaySettings);
  });

  window.Asc.plugin.attachContextMenuClickEvent('GenerateQR_info', function () {
    displayFunction(textWarning);
  });

  window.Asc.plugin.attachContextMenuClickEvent('ChangeQR', function () {
    window.Asc.plugin.executeMethod("GetSelectedOleObjects", [], function(objects) {
      if (!objects || objects.length !== 1 || objects[0].guid !== window.Asc.plugin.info.guid)
        return;
      window.Asc.plugin.info.objectId = objects[0].objectId;
      window.Asc.plugin.init(objects[0].data);      
    });
  });

  //  Display context menu if the text is selected
  window.Asc.plugin.event_onContextMenuShow = function (options) {
    function addContextMenuItem(type) {
      let items = [];
      if(type == 'normal') {
        items = [{
          id: 'GenerateQR',
          text: generateText('Insert QR')
        }];
      } else if(type == 'warning') {
        items = [{
          id: 'GenerateQR_info',
          text: generateText('Insert QR: info')
        }];
      } else if(type == 'change') {
        items = [{
          id: 'ChangeQR',
          text: generateText('QR Settings')
        }];        
      }
      window.Asc.plugin.executeMethod("AddContextMenuItem", [{
        guid: window.Asc.plugin.guid,
        items: items
      }]);
    }

    if (options.type === "Selection") { // Check if the text is selected
      // Execute method to get selected text
      window.Asc.plugin.executeMethod("GetSelectedText", [{
        Numbering: true,
        Math: false,
        TableCellSeparator: "\n",
        ParaSeparator: "\n",
        TabSymbol: String.fromCharCode(9),
      }], function (data) {
        const selection = data.trim().replace(/\n/g, '');
        const selectionMaxLength = 1900;
        const editorType = window.Asc.plugin.info.editorType // retrieve the editor type

        switch (editorType) {
          case "word":
            if (selection === "○" || selection === "☐" || (selection.includes("○") && selection.includes("☐"))) { // exclude radio buttons and check boxes from the selection
              textQR = "";
            } else {
              textQR = selection;
            }

            if(textQR.length <= selectionMaxLength) {
              if (textQR !== "") {
                // If text is selected and it is not an empty string, add the context menu item for generating QR code
                addContextMenuItem('normal');
              } else {
                // if the text is not selected, add empty items array. This allows initializing the plugin in any scenario
                addContextMenuItem();
              }
            } else {
              addContextMenuItem('warning');
            }
            break;

          case "slide":
            if(selection.length <= selectionMaxLength) {
              if (selection !== "") {
                // If text is selected and it is not an empty string, add the context menu item for generating QR code
                addContextMenuItem('normal');
                textQR = selection;
              } else {
                // if the text is not selected, add empty items array. This allows initializing the plugin in any scenario
                addContextMenuItem();
              }
            } else {
              addContextMenuItem('warning');
            }
            break;

          case "cell":
            // Filter out capital letters from the selection
            const hasCapitals = selection.split('').filter(char => char === char.toUpperCase() && isNaN(char));
            let haslink = false;

            // Check if the selection contains only digits
            const hasdigits = /^\d+$/.test(selection);

            // Check if the selection contains 'http' or 'https'
            if (selection.includes('http') || selection.includes('https')) {
              haslink = true;
            }

            // Exclude formulas from the selection and set context menu item
            if ((hasCapitals.length !== 0 && !haslink) || (hasCapitals.length !== 0 && !haslink && !hasdigits)) {
              addContextMenuItem('warning');
            }

            // Allow generating QR code from single lowercase phrases or digits
            if (haslink || hasCapitals.length === 0 || hasdigits) {
              textQR = selection;

              if (textQR !== "") {
                addContextMenuItem('normal');
              } else {
                addContextMenuItem();
              }
            } else {
              // If none of the conditions are met, add empty items array
              addContextMenuItem();
            }
            break;
          default:
            break
        }

      });
    } else if (options.type === "OleObject" && options.guid === window.Asc.plugin.info.guid) {
      addContextMenuItem('change');
    } else {
      // if the text is not selected, add empty items array. This allows initializing the plugin in any scenario
      addContextMenuItem();
    }
  };

  // Function to generate text
  function generateText(text) {
    let result = window.Asc.plugin.tr(text);
    return result;
  }

  // Function to insert QR code
  function insertQR(qrText, qrWidth, qrHeight, qrColor, bgColor) {
    try {
      const qrCode = qrcodegen.QrCode.encodeText(qrText, qrcodegen.QrCode.Ecc.LOW);
      const size = qrCode.size;
      const scale = qrWidth / size || 1; // Graceful fallback to avoid zero divisions or NaN

      // Set adequate canvas dimensions
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size * scale;
      canvas.height = size * scale;

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR code modules
      ctx.fillStyle = qrColor;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (qrCode.getModule(x, y)) {
            ctx.fillRect(x * scale, y * scale, scale, scale);
          }
        }
      }

      const qrImageURI = canvas.toDataURL("image/png");

      if (qrImageURI === "data:,") throw new Error("Canvas didn't draw correctly, check SVG conversion.");

      const _info = window.Asc.plugin.info;
      const oImageData = {
        guid: _info.guid,
        widthPix: qrWidth,
        heightPix: qrHeight,
        width: qrWidth / _info.mmToPx,
        height: qrHeight / _info.mmToPx,
        imgSrc: qrImageURI,
        objectId: currentObjectId,
        data: (qrImageURI + ";;" + qrColor + ";;" + bgColor + ";;" + qrText),
        resize: true,
        recalculate: true
      };

      window.Asc.plugin.executeMethod(!currentObjectId ? "AddOleObject" : "EditOleObject", [oImageData]);

    } catch (error) {
      console.error("QR code generation failed:", error);
      displayFunction(textWarning);
    }
  }

  // Function to display message in modal window
  function displayFunction(option) {
    let location = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);
    let variation = {};

    switch (option) {
      case 'displaySettings':
        const langCode = window.Asc.plugin.info;
        const widthDict = {
          'de-DE': 350,
          'es-ES': 360,
          'fr-FR': 330,
          'it-IT': 350,
        };
        const windowWidth = widthDict[langCode] || 310;
        
        variation = {
          url: location.href.replace(file, 'settingsQR.html'),
          description: generateText('QR Settings'),
          isVisual: true,
          isModal: true,
          buttons: [
            {
                text: generateText('Insert QR'),
                primary: true
            },
            {
                text: generateText('Cancel'),
                primary: false
            }
          ],
          EditorsSupport: ['slide', 'word', 'cell'],
          size: [windowWidth, 330]
        };

        // Create and display the modal window
        modalWindow = new window.Asc.PluginWindow();
        modalWindow.show(variation);

        modalWindow.attachEvent("onWindowReady", function(){
          if (!currentObjectId)
            return;
          modalWindow.command("onWindowSettings", {
            qrColor : qrColor,
            bgColor : bgColor
          });
        });

        // Get the QR parameters from the message
        modalWindow.attachEvent("onWindowMessage", function (message) {
          qrText = textQR;
          qrWidth = message.qrWidth;
          qrHeight = message.qrHeight;
          qrColor = message.qrColor;
          bgColor = message.bgColor;

          // Insert QR code
          insertQR(qrText, qrWidth, qrHeight, qrColor, bgColor);
          currentObjectId = undefined;
          modalWindow.close();
          modalWindow = null;
        });
        break;
      case 'textWarning':
        variation = {
          url: location.href.replace(file, 'text_warning.html'),
          description: generateText('Warning'),
          isVisual: true,
          isModal: true,
          buttons: [
            {
              text: 'OK',
              primary: true
            }
          ],
          EditorsSupport: ['slide', 'word', 'cell'],
          size: [350, 80]
        };

        warningModalWindow = new window.Asc.PluginWindow();
        warningModalWindow.show(variation);
        break;
      default:
        break;
    }
  }

  console.log("Plugin initialized"); // Check if this log appears in the console

  // Handle button click events to close the modal window
  window.Asc.plugin.button = function (id, windowId) {
    if (modalWindow) {
      if (windowId == modalWindow.id) {
        if (id === 0) {
          modalWindow.command("onWindowMessage", "submit");
        } else {
          currentObjectId = undefined;
          modalWindow.close();
          modalWindow = null;
        }
      }
    } else if (windowId) {
      window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
    }
    if (undefined === windowId && -1 === id)
      this.executeCommand("close", "");
  };

})(window);
