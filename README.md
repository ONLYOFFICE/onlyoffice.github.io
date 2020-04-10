# Autocomplete plugin

This plugin is an example of an input assistant for ONLYOFFICE editors.

## How to use

1. Start typing and the plugin will suggest variants for you. 
2. Click on the variant you want to be inserted into your doc.

Please note that it is the system plugin so that's OK that you can't see it in the Plugins tab. 

## How to install

**For server solutions**

Put the folder with the plugin code to ONLYOFFICE Document Server folder:

* For Linux - /var/www/onlyoffice/documentserver/sdkjs-plugins/.
* For Windows - %ProgramFiles%\ONLYOFFICE\DocumentServer\sdkjs-plugins\.

**For desktop editors**

* Archive the plugin files (it must contain config.json, index.html, and pluginCode.js).
* Change the file extension to .plugin. 
* Go to the Plugins tab, click Manage Plugins >> Add plugin, browse for the .plugin file.

**For the cloud version**

Turn your plugin into a browser extension. Currently, it works for Chrome users only.

Use [chrome_extension_example](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/examples/chrome_extension_example) to learn how to transform an ONLYOFFICE plugin into a Chrome extension.

## Documentation

Plugins structure and installation https://api.onlyoffice.com/plugin/basic.

Plugins code and methods https://api.onlyoffice.com/docbuilder/basic.

## User feedback and support

To ask questions and share feedback, use Issues in this repository.
