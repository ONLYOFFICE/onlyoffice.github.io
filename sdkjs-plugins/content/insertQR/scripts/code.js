/*
 * (c) Copyright Ascensio System SIA 2010
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

(function (window, undefined) {

  // Initialize global variables
  let textQR = ""; // Initialize selected text variable
  let modalWindow; // Declare modalWindow at the top level
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


  window.Asc.plugin.init = function () { };

  // Attach event for context menu click on GenerateQR
  window.Asc.plugin.attachContextMenuClickEvent('GenerateQR', function () {
    console.log("GenerateQR clicked");
    displayFunction(displaySettings);
  });

  window.Asc.plugin.attachContextMenuClickEvent('GenerateQR_info', function () {
    console.log("GenerateQR clicked");
    displayFunction(textWarning);
  });

  //  Display context menu if the text is selected
  window.Asc.plugin.event_onContextMenuShow = function (options) {

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
        const editorType = window.Asc.plugin.info.editorType // retrieve the editor type
        switch (editorType) {

          case "word":
            if (selection === "○" || selection === "☐" || (selection.includes("○") && selection.includes("☐"))) { // exclude radio buttons and check boxes from the selection
              textQR = "";
              console.log("the selected text has been reset to an empty string");
            } else {
              textQR = selection;
              console.log(textQR)
            }

            if (textQR !== "") {
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
            break;

          case "slide":
            if (selection !== "") {
              // If text is selected and it is not an empty string, add the context menu item for generating QR code
              window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                guid: window.Asc.plugin.guid,
                items: [{
                  id: 'GenerateQR',
                  text: generateText('Insert QR')
                }]
              }]);
              textQR = selection;
            } else {
              // if the text is not selected, add empty items array. This allows initializing the plugin in any scenario
              window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                guid: window.Asc.plugin.guid,
                items: []
              }]);
            }
            break;
            
          case "cell":
            const hasCapitals = selection.split('').filter(char => char === char.toUpperCase()); // filter out capital letters from the selection
            let haslink = false;

            if (selection.includes('http') || selection.includes('https')) { // set the flag if the selection contains 'http' or 'https'
              haslink = true;
            }
            console.log(hasCapitals)

            // exclude formulas from the selection
            if (hasCapitals.length !== 0 && !haslink) { // Check if the filtered array is not empty and the selection does not contain 'http' or 'https'
              window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                guid: window.Asc.plugin.guid,
                items: [{
                  id: 'GenerateQR_info',
                  text: generateText('Insert QR: info')
                }]
              }]);
            }

            if (haslink) { // Check if selection contains 'http' or 'https'
              textQR = selection;
              console.log(textQR);
            } else if (hasCapitals.length === 0) { // Check if the filtered array is empty to allow generating QR code from single Lowercase phrases
              textQR = selection;
              console.log(textQR);
            }

            if (textQR !== "") {
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

            break;
          default:
            break
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
  function insertQR(qr, qrText, qrWidth, qrHeight, qrColor, bgColor) {
    try {
      qr = new QRCode(document.createElement('div'), {
        text: qrText,
        width: qrWidth,
        height: qrHeight,
        colorDark: qrColor,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.L
      });
    } catch (error) {
      // handle errors when selected data exceeds the limit
      if (error.message.includes("reading '3'") || error.message.includes("code length overflow")) {
        displayFunction(textWarning);
      } else {
        console.error("QR code generation failed:", error);
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
      width: qrWidth / _info.mmToPx,
      height: qrHeight / _info.mmToPx,
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
          description: generateText('QR Settings'),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ['slide', 'word', 'cell'],
          size: [400, 550]
        };
        break;
      case 'textWarning':
        variation = {
          url: location.href.replace(file, 'text_warning.html'),
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
      qrText = textQR;
      qrWidth = message.qrWidth;
      qrHeight = message.qrHeight;
      qrColor = message.qrColor;
      bgColor = message.bgColor;

      // Insert QR code
      insertQR(qr, qrText, qrWidth, qrHeight, qrColor, bgColor);
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
