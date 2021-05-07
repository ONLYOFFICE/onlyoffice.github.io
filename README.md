## Overview

Count words, characters (with/without spaces), and paragraphs in the selected part of your document. 

The plugin is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop](https://github.com/ONLYOFFICE/DesktopEditors) versions of ONLYOFFICE editors. It can be added to ONLYOFFICE instances manually. 

## How to use

1. Select the text.
2. Open the Plugins tab and click "Count words and characters".

## How to install

**For server solutions**

Put the folder with the plugin code to ONLYOFFICE Document Server folder:

* For Linux - /var/www/onlyoffice/documentserver/sdkjs-plugins/.
* For Windows - %ProgramFiles%\ONLYOFFICE\DocumentServer\sdkjs-plugins\.

**For desktop editors**

* Archive the plugin files (it must contain config.json, index.html, and pluginCode.js).
* Change the file extension to .plugin. 
* Go to the Plugins tab, click Manage Plugins >> Add plugin, browse for the .plugin file.

## Known issues

* Footnotes/endnotes symbols are not included in the word count (bug #47828 in the internal bug tracker)
* Numbers from numbered lists are included in the word count (#47805)
* Page numbers are not included (#47809)
