/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (window, undefined) {
 // Initialize an empty object to store colors
 let colors = {};
 // Initialize a variable to store the API key
 let storedApiKey = '';
 // Flag to switch between scenarios inside the getAllColors function
 let bHasKey;
 // Define a global variable to access the plugin modal window
 let modalWindow;
 // Define constants for different scenarios
 let apiKeyMissing = 'apiKeyMissing';
 let noSelectedText = 'noSelectedText';
 let wrongApiKey = 'wrongApiKey';

  //Generate a localized representation of the input text in the editor's language.
function generateText(text) {
  // Get the language code from the editor's language
  let lang = window.Asc.plugin.info.lang.substring(0,2);
  // Determine whether to translate the text or use it as is
  let result = lang !== "en" ? window.Asc.plugin.tr(text) : text;
  return result;
};

  // Check if the API key is present and update the flag accordingly
  function checkApiKey() {
    storedApiKey = localStorage.getItem('ApiNinjasApiKey') || '';
    if (!storedApiKey.length) {
        bHasKey = false;
    } else {
        bHasKey = true;
    }
  }

   // Display a modal window message based on the selected case
  function displayMessage(selectedCase) {
    let location = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);

    let variation;

    switch (selectedCase) {
        case apiKeyMissing:
            variation = {
                url: location.href.replace(file, 'settings.html'),
                description: generateText('Settings'),
                isVisual: true,
                isModal: true,
                buttons: [],
                EditorsSupport: ['slide'],
                size: [392, 250]
            };
            break;

        case noSelectedText:
            variation = {
                url: location.href.replace(file, 'noTextWarning.html'),
                description: generateText('Warning'),
                isVisual: true,
                isModal: true,
                buttons: [],
                EditorsSupport: ['slide'],
                size: [350, 200]
            };
            break;

        case wrongApiKey:
            variation = {
                url: location.href.replace(file, 'wrongApiKeyWarning.html'),
                description: generateText('Warning'),
                isVisual: true,
                isModal: true,
                buttons: [],
                EditorsSupport: ['slide'],
                size: [350, 200]
            };
            localStorage.clear();
            
            break;

        default:
            console.error('Invalid case');
            return;
    }
    // Create and display the modal window
    modalWindow = new window.Asc.PluginWindow();
    modalWindow.show(variation);

  }
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
                initializePlugin();
                break;
        }
    }
  };

  // Function to store both QR and background colors and trigger event
  function getAllColors(color, isBgColor) {
    if (!isBgColor) {
      // First call with qrColor
      colors.qrColor = color;
    } else {
      // Second call with bgColor
      colors.bgColor = color;
      let colorQr = colors.qrColor;
      let colorBg = colors.bgColor;
      // pass the colorQr and the colorBg into the insertQR function ;
      insertQR(colorQr, colorBg);
    }
  }

  // Function to display the input helper for color selection
  function inputHelper() {
    window.Asc.plugin.executeMethod("ShowInputHelper", [
      "asc.{BBF949B2709AD000-34E836B1-49B77-8EC06-2BA704B9AC3F2000}",
      150,
      400,
      true
    ]);
    if (!window.isInit) {
      window.isInit = true;
      window.Asc.plugin.currentText = "";
      window.Asc.plugin.createInputHelper();
      window.Asc.plugin.getInputHelper().createWindow();
      const items = [
        { text: generateText('White background'), id: "WhiteBg" },
        { text: generateText('Black background'), id: "BlackBg" },
        { text: generateText('Gray background'), id: "GrayBg" },
        { text: generateText('Red background'), id: "RedBg" },
        { text: generateText('Green background'), id: "GreenBg" },
        { text: generateText('Yellow background'), id: "YellowBg" },
        { text: generateText('Blue background'), id: "BlueBg" },
        { text: generateText('Aqua background'), id: "AquaBg" },
        { text: generateText('Navy background'), id: "NavyBg" },
        { text: generateText('Purple background'), id: "PurpleBg" },
        { text: generateText('Maroon background'), id: "MaroonBg" },
        { text: generateText('Fuchsia background'), id: "FuchsiaBg" },
        { text: generateText('Teal background'), id: "TealBg" },
        { text: generateText('Olive background'), id: "OliveBg" },
        { text: generateText('Lime background'), id: "LimeBg" },
        { text: generateText('Close'), id: "CloseHelper" }
      ];
      window.Asc.plugin.getInputHelper().setItems(items);
    }
  }

  // Function to hide the input helper
  function hideInputHelper() {
    window.Asc.plugin.executeMethod("UnShowInputHelper", [
      "asc.{BBF949B2709AD000-34E836B1-49B77-8EC06-2BA704B9AC3F2000}",
      true
    ]);
  }

  // Function for generating QR code
  function insertQR(colorQr, colorBg) {
    window.Asc.plugin.executeMethod("GetSelectedText", [
        {
            Numbering: false,
            Math: false,
            TableCellSeparator: "\n",
            ParaSeparator: "\n",
            TabSymbol: String.fromCharCode(9),
        },
    ], 
    function (data) {
        console.log(data);
        if (data == "") {
           displayMessage(noSelectedText);
            return;
        }

        const onSuccess = function (result) {
            let oImageData = {
              "src": 'data:image/png;base64,' + result,
              "width": 500,
              "height": 500,
              "replaceMode": "original"
          };
          window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
        };

        let fmt = 'png';
        $.ajax({
            method: 'GET',
            async: true,
            url: 'https://api.api-ninjas.com/v1/qrcode?data=' + encodeURIComponent(data) + '&format=' + fmt + '&fg_color=' + encodeURIComponent(colorQr) + '&bg_color=' + encodeURIComponent(colorBg),
            headers: { 'X-Api-Key': storedApiKey },
            contentType: 'image/png',
            success: function (result) {
                onSuccess(result);
            },
            
            error: function ajaxError(jqXHR) {
              console.log('Response Text:', jqXHR.responseText);
                if (jqXHR.responseText === '{"error": "Invalid API Key."}') {
                    displayMessage(wrongApiKey);
                }
            }
        });
    });
  }

  // Function to initialize the plugin
  function initializePlugin() {
    window.Asc.plugin.event_onContextMenuShow = function (options) {
      checkApiKey() 
      if (bHasKey) {
        this.executeMethod("AddContextMenuItem", [
          {
            guid: this.guid,
            items: [
              {
                id: "InsertQR",
                text: generateText('Insert QR'),
                items: [
                  { id: "Black", text: generateText('Black QR'), disabled: false },
                  { id: "White", text: generateText('White QR'), separator: true },
                  { id: "Gray", text: generateText('Gray QR'), separator: true },
                  { id: "Red", text: generateText('Red QR'), separator: true },
                  { id: "Green", text: generateText('Green QR'), separator: true },
                  { id: "Yellow", text: generateText('Yellow QR'), separator: true },
                  { id: "Blue", text: generateText('Blue QR'), separator: true },
                  { id: "Aqua", text: generateText('Aqua QR'), separator: true },
                  { id: "Navy", text: generateText('Navy QR'), separator: true },
                  { id: "Purple", text: generateText('Purple QR'), separator: true },
                  { id: "Maroon", text: generateText('Maroon QR'), separator: true },
                  { id: "Fuchsia", text: generateText('Fuchsia QR'), separator: true },
                  { id: "Teal", text: generateText('Teal QR'), separator: true },
                  { id: "Olive", text: generateText('Olive QR'), separator: true },
                  { id: "Lime", text: generateText('Lime QR'), separator: true },
                  { id: "Settings", text: generateText('Settings') }
                ]
              },
            ],
          },
        ]);
      };
 
      // Dynamically generate context menu items for colors
      const colorContextMenuItems = [
        'Black', 'White', 'Gray', 'Red', 'Green', 'Yellow',
        'Blue', 'Aqua', 'Navy', 'Purple', 'Maroon', 'Fuchsia',
        'Teal', 'Olive', 'Lime'
      ];

      window.Asc.plugin.attachEvent('onContextMenuShow', function (options) {
        if (!options) return;
    
        const menuItems = [];
    
        if (options.type === 'Selection' || options.type === 'Target') {
            menuItems.push({ id: "InsertQR", text: generateText('Insert QR') });
    
            // Add color items dynamically
            menuItems.push(...colorContextMenuItems.map(color => ({ id: color, text: generateText(`${color} QR`), disabled: false })));
        }
    
        // Add the "Settings" item to the context menu
        menuItems.push({ id: "Settings", text: generateText('Settings') });
    
        this.executeMethod('AddContextMenuItem', [
            {
                guid: this.guid,
                items: menuItems
            }
        ]);
    });

      // Attach click events for color context menu items
      colorContextMenuItems.forEach(function (color) {
        window.Asc.plugin.attachContextMenuClickEvent(color, function () {
          // Get color code and trigger input helper
          getAllColors(getColorCode(color), false);
          // Display the input helper
          inputHelper();
        });
      });

      window.Asc.plugin.attachContextMenuClickEvent("Settings", function () {
        // Execute the apiKeyMissing scenario when the 'Settings' item is clicked
        displayMessage(apiKeyMissing);
    });

      // Event handler for input helper item selection
      window.Asc.plugin.inputHelper_onSelectItem = function (item) {
        if (!item)
          return;

        switch (item.id) {
          case "CloseHelper":
            hideInputHelper();
            break;
          // Handle background color options
          case "WhiteBg":
          case "BlackBg":
          case "GrayBg":
          case "RedBg":
          case "GreenBg":
          case "YellowBg":
          case "BlueBg":
          case "AquaBg":
          case "NavyBg":
          case "PurpleBg":
          case "MaroonBg":
          case "FuchsiaBg":
          case "TealBg":
          case "OliveBg":
          case "LimeBg":         
            getAllColors(getColorCode(item.id.replace('Bg', '')), true);
            hideInputHelper();
            break;
        }
      };
    };

    // Function to map color names to color codes
    function getColorCode(colorName) {
      switch (colorName) {
        case 'White':
          return 'ffffff';
        case 'Black':
          return '000000';
        case 'Gray':
          return '808080';
        case 'Red':
          return 'FF0000';
        case 'Green':
          return '008000';
        case 'Yellow':
          return 'FFFF00';
        case 'Blue':
          return '0000FF';
        case 'Aqua':
          return '00FFFF';
        case 'Navy':
          return '000080';
        case 'Purple':
          return '800080';
        case 'Maroon':
          return '800000';
        case 'Fuchsia':
          return 'FF00FF';
        case 'Teal':
          return '008080';
        case 'Olive':
          return '808000';
        case 'Lime':
          return '00FF00';
        default:
          return '';
      }
    }
    checkApiKey(); 
    // Handle scenario when API key is missing
    if (!bHasKey) {
      window.Asc.plugin.event_onContextMenuShow = function (options) {
        const contextMenuItem = {
          id: "Settings",
          text: generateText('Insert QR settings')
        };
      
        const addContextMenuItem = () => {
          this.executeMethod('AddContextMenuItem', [{
            guid: this.guid,
            items: [contextMenuItem],
          }]);
        };
      
        addContextMenuItem();
      
        window.Asc.plugin.attachEvent('onContextMenuShow', function (options) {
          if (options && (options.type === 'Selection' || options.type === 'Target')) {
            addContextMenuItem();
          }
        });
      
        // Display the modal window when the 'Settings' item is clicked
        window.Asc.plugin.attachContextMenuClickEvent("Settings", function () {
          displayMessage(apiKeyMissing);
        });
      }
    }

  }   
  
     // Initialize the plugin on editor load
    window.Asc.plugin.init = function () {
  initializePlugin();
  };
  
})(window, undefined);