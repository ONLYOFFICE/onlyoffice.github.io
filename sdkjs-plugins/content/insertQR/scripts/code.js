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
  let selectedText = ""; // Initialize selected text variable
  let modalWindow; // Declare modalWindow at the top level
  // Define global variables to store QR parameters
  let qrText;
  let qrWidth;
  let qrHeight;
  let qrColor;
  let bgColor;
  // Define flags for displaying modal windows
  let isIE = 'isIE';
  let displaySettings = 'displaySettings';

  // Function to check if the browser is Internet Explorer
  // function isInternetExplorer() {
  //   if (navigator && navigator.userAgent) {
  //     return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1;
  //   }
  //   return false; // Return false if navigator or navigator.userAgent is undefined
  // }

  // if (isInternetExplorer()) {
  //   displayModalWindow(isIE);
  // }

  window.Asc.plugin.init = function () { };

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

          // Attach event for context menu click on GenerateQR
          window.Asc.plugin.attachContextMenuClickEvent('GenerateQR', function () {
            console.log("GenerateQR clicked");
            displayModalWindow(displaySettings);
          });
        }
      });
    }
  };

  // Function to generate text
  function generateText(text) {
    let result = window.Asc.plugin.tr(text);
    return result;
  }

  // Function to insert QR code
  function insertQR(qrText, qrWidth, qrHeight, qrColor, bgColor) {
    var qr = new QRCode(document.createElement('div'), {
      text: qrText,
      width: qrWidth,
      height: qrHeight,
      colorDark: qrColor,
      colorLight: bgColor,
      correctLevel: QRCode.CorrectLevel.H
    });

    // Get the canvas element from QRCode library
    var canvas = qr._el.querySelector('canvas');

    // Get the data URL of the canvas
    var qrImageURI = canvas.toDataURL("image/png");

    // Prepare image data object
    let oImageData = {
      "src": qrImageURI,
      "replaceMode": "original"
    };

    // Execute method to put image data to selection
    window.Asc.plugin.executeMethod("PutImageDataToSelection", [oImageData]);
  }

  // Function to display message in modal window
  function displayModalWindow(type) {
    let location = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);
    let variation;

    switch (type) {
      case 'isIE':
        variation = {
          url: location.href.replace(file, 'ie_warning.html'),
          description: generateText('IE Warning'),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ['slide', 'word'],
          size: [400, 500]
        };
        break;
      case 'displaySettings':
        variation = {
          url: location.href.replace(file, 'settings.html'),
          description: generateText('Settings'),
          isVisual: true,
          isModal: true,
          buttons: [],
          EditorsSupport: ['slide', 'word'],
          size: [400, 500]
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
