## Overview

The Insert QR plugin allows users to effortlessly insert a QR code generated from selected text in the Presentation and Text Editor.

The plugin uses:

- [Bootstrap Colorpicker](https://github.com/itsjavi/bootstrap-colorpicker) by [Nayuki](https://github.com/nayuki).
- [QRCode.js](https://www.nayuki.io/page/qr-code-generator-library) by [Sangmin, Shim](https://github.com/davidshimjs)

## Installation

1. Install the Insert QR Plugin from the plugin marketplace.

## Usage

1. Activate the Insert QR Plugin:
   - Go to the plugin tab.
   - Activate the Insert QR plugin in the "Background Plugins" section

2. Select Text:
   - Right-click on the text where you want to insert the QR code.

3. Set QR Color:
   - Click the "Set QR Color" radio button to choose the color of the QR code.
   - Click on the color picker to activate it and select the desired color.
   - Alternatively, input a custom hexadecimal color code into the text box below the "Set QR Color" option.

4. Set Background Color:
   - Click the "Set Background Color" radio button to choose the background color of the QR code.
   - Click on the color picker to activate it and select the desired background color.
   - Alternatively, input a custom hexadecimal color code into the text box below the "Set Background Color" option.

5. Set QR Width and Height:
   - Optionally, adjust the width and height of the QR code if necessary.

6. Insert QR:
   - Click the "Insert QR" button to generate and insert the QR code into the selected text.

## Note for Spreadsheet Editor
QR code generation is restricted to:
- Links.
- Single phrases without capital letters and symbols present in formulas.

If you need more information about how to use or write your own plugin, please see this [link](https://api.onlyoffice.com/plugin/basic).
