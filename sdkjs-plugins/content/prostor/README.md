## Overview

The plugin is designed for receiving, parsing and inserting the results of a get request from a third-party site or service into spreadsheet cells.
Arbitrary get requests are implemented, parsing using JSONPath expressions, saving previously made requests in a separate (special) sheet, updating cell values in accordance with previously generated queries on the sheet.

![Example JSON API plugin](https://github.com/VyachL84/JsonAPIOnlyofficePlugin/blob/ef8da9cef4459f6786e9bdcdd471638c2ea5d85b/jsonApiPlugin.png)

## Install
Follow onlyoffice instructions:
https://api.onlyoffice.com/plugin/installation/onpremises#plugin-folder

## How to use

1. Start SpreadsheetEditor
2. Select some range of cells in whicg you want to paste your data from request
3. Open the Plugins tab and press "JSON API"/ API JSON
4. Edit "Request URL" field
5. Edit JSON path expression field. If you want to get several rows you can provide sevevral JsonPath expressions separated by ;  
6. Tap Ok button and enjoy with your result

If you need more information about how to use or write your own plugin, please see this https://api.onlyoffice.com/plugin/basic
