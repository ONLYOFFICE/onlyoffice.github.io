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
              window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                guid: window.Asc.plugin.guid,
                items: [{
                  id: 'GenerateQR_info',
                  text: generateText('Insert QR: info')
                }]
              }]);
            }

            // Allow generating QR code from single lowercase phrases or digits
            if (haslink || hasCapitals.length === 0 || hasdigits) {
              textQR = selection;

              if (textQR !== "") {
                window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                  guid: window.Asc.plugin.guid,
                  items: [{
                    id: 'GenerateQR',
                    text: generateText('Insert QR')
                  }]
                }]);
              } else {
                window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                  guid: window.Asc.plugin.guid,
                  items: []
                }]);
              }
            } else {
              // If none of the conditions are met, add empty items array
              window.Asc.plugin.executeMethod("AddContextMenuItem", [{
                guid: window.Asc.plugin.guid,
                items: []
              }]);
            }

            function generateText(text) {
              return text;
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
  function insertQR(qrText, qrWidth, qrHeight, qrColor, bgColor) {
    console.log("insertQR called with qrWidth:", qrWidth);

    try {
      const qrCode = qrcodegen.QrCode.encodeText(qrText, qrcodegen.QrCode.Ecc.LOW);
      const size = qrCode.size;
      const scale = qrWidth / size || 1; // Graceful fallback to avoid zero divisions or NaN
      console.log("QR code width:", qrWidth, "Scale:", scale);

      // Set adequate canvas dimensions
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size * scale;
      canvas.height = size * scale;

      // Verify canvas setup
      console.log("Canvas initialized with dimensions: ", canvas.width, canvas.height);

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log("Canvas background filled");

      // Draw QR code modules
      ctx.fillStyle = qrColor;
      console.log("QR code size:", size, "Scale:", scale);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (qrCode.getModule(x, y)) {
            ctx.fillRect(x * scale, y * scale, scale, scale);
            //console.log(`Drawing module at (${x * scale}, ${y * scale})`);
          }
        }
      }

      const qrImageURI = canvas.toDataURL("image/png");
      console.log("Generated Image URI:", qrImageURI);

      if (qrImageURI === "data:,") throw new Error("Canvas didn't draw correctly, check SVG conversion.");

      const _info = window.Asc.plugin.info;
      const oImageData = {
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

    } catch (error) {
      console.error("QR code generation failed:", error);
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
      console.log("Received message:", message);

      qrText = textQR;
      qrWidth = message.qrWidth;
      qrHeight = message.qrHeight;
      qrColor = message.qrColor;
      bgColor = message.bgColor;

      console.log("Parameters received: ", { qrText, qrWidth, qrHeight, qrColor, bgColor });

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
