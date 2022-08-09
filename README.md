## Overview

Quickly translate the selected text into other languages.

The plugin uses [Apertium](https://www.apertium.org/), a free open-source machine translation platform.

Apertium is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop](https://github.com/ONLYOFFICE/DesktopEditors) versions of ONLYOFFICE editors. It can be added to ONLYOFFICE instances manually. 

## How to use

1. Select the text you want to translate.

2. Go to the Plugins tab and click on Apertium.

3. Alternatively, you can insert text for translation manually, without changing anything in your doc. To do so, click Enter text manually on the left panel. Type new text in the field that appears or edit already selected text (this will only affect the translation, the original text will remain unchanged).

4. Use the Copy button to copy the translation and the Replace button to replace the selected text with its translation.

## How to install

Detailed instructions can be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/plugin/installation).

## Using your own service

By default, the plugin uses the Apertium demo service with limited language pairs.

To use Apertium without limitations, install it to your own server.

To send translation requests to your own server, change the url address of the `serviceUrl` variable in the `./scripts/apertium.js` file.

## Know issues

Translation from English to Serbo-Croatian has errors: extra characters are added to the translation.