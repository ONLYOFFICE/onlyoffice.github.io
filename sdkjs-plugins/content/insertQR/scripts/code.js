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

(function (window, undefined) {

  // Initialize global variables
  let selectedText = ""; // Initialize selected text variable
  let modalWindow; // Declare modalWindow at the top level
  // Define global variables to store QR parameters
  let qrText;
  let qrWidth;
  let qrHeight;
  let qrColor;
  let bgColor;
  let qr;
  let displaySettings = 'displaySettings';
  let exceedsMaxLength = 'exceedsMaxLength';

  window.Asc.plugin.init = function () { };

  // Attach event for context menu click on GenerateQR
  window.Asc.plugin.attachContextMenuClickEvent('GenerateQR', function () {
    console.log("GenerateQR clicked");
    displayFunction(displaySettings);
  });
  //  Display context menu if the text is selected
  window.Asc.plugin.event_onContextMenuShow = function (options) {

    if (options.type === "Selection") { // Check if the text is selected
      // Execute method to get selected text
      window.Asc.plugin.executeMethod("GetSelectedText", [{
        Numbering: false,
        Math: false,
        TableCellSeparator: "\n",
        ParaSeparator: "\n",
        TabSymbol: String.fromCharCode(9),
      }], function (data) {
        selectedText = data.trim();
        console.log("the selected text is" + selectedText);

        if (selectedText !== "") {
          // If text is selected and it is not an empty string, add the context menu item for generating QR code
          window.Asc.plugin.executeMethod("AddContextMenuItem", [{
            guid: window.Asc.plugin.guid,
            items: [{
              id: 'GenerateQR',
              text: generateText('Insert QR')
            }]
          }]);
        } else {
          // if the text is not selected, add empty items array. This allows initializing the plugin in any scenario
          window.Asc.plugin.executeMethod("AddContextMenuItem", [{
            guid: window.Asc.plugin.guid,
            items: []
          }]);
        }
      });
    } else {
      // if the text is not selected, add empty items array. This allows initializing the plugin in any scenario
      window.Asc.plugin.executeMethod("AddContextMenuItem", [{
        guid: window.Asc.plugin.guid,
        items: []
      }]);
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
      qr = new QRCode(document.createElement('div'), {
        text: qrText,
        width: qrWidth,
        height: qrHeight,
        colorDark: qrColor,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.H
      });
    } catch (error) {
      if (error.message.includes("reading '3'")) {
        displayFunction(exceedsMaxLength);
      }
    }
    // Get the canvas element from QRCode library
    const canvas = qr._el.querySelector('canvas');
    // Get the data URL of the canvas
    const qrImageURI = canvas.toDataURL("image/png")
    const _info = window.Asc.plugin.info

    // Prepare image data object
    let oImageData = {
      guid: _info.guid,
      widthPix: qrWidth,
      heightPix: qrHeight,
      width: Math.round(qrWidth / _info.mmToPx),
      height: Math.round(qrHeight / _info.mmToPx),
      imgSrc: qrImageURI,
      objectId: _info.objectId,
      data: qrImageURI,
      resize: true,
      recalculate: true
    };

    window.Asc.plugin.executeMethod("AddOleObject", [oImageData]);
  }

  // Function to display message in modal window
  function displayFunction(option) {
    let location = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);
    let variation = {};

    switch (option) {
      case 'displaySettings':
        variation = {
          url: location.href.replace(file, 'settingsQR.html'),
          description: generateText('Settings'),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ['slide', 'word', 'cell'],
          size: [400, 500]
        };
        break;
      case 'exceedsMaxLength':
        variation = {
          url: location.href.replace(file, 'textLength_warning.html'),
          description: generateText('Warning'),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ['slide', 'word', 'cell'],
          size: [400, 200]
        };
        break;
      default:
        break;
    }

    // Create and display the modal window
    modalWindow = new window.Asc.PluginWindow();
    modalWindow.show(variation);

    // Get the QR parameters from the message
    modalWindow.attachEvent("onWindowMessage", function (message) {
      qrText = selectedText;
      qrWidth = message.qrWidth;
      qrHeight = message.qrHeight;
      qrColor = message.qrColor;
      bgColor = message.bgColor;

      // Insert QR code
      insertQR(qrText, qrWidth, qrHeight, qrColor, bgColor);
      modalWindow.close();
    });
  }

  console.log("Plugin initialized"); // Check if this log appears in the console

  // Handle button click events to close the modal window
  window.Asc.plugin.button = function (id, windowId) {
    if (!modalWindow) {
      return;
    }

    if (windowId) {
      switch (id) {
        case -1:
        default:
          window.Asc.plugin.executeMethod('CloseWindow', [windowId]);
          break;
      }
    }
  };

})(window);
