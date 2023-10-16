# ONLYOFFICE Plugin Marketplace 

ONLYOFFICE Plugin Marketplace (or Plugin Manager) allows users to explore all available plugins and install or remove any plugin with just one click right in the editors.

## How to build and add your own plugin

In case you would like to create and add your own plugin to the marketplace, follow the steps below.

**1. Fork the plugin marketplace repository**: [https://github.com/ONLYOFFICE/onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io). 

To further test in the web version, you need to enable [GitHub Pages](https://docs.github.com/en/pages/quickstart).

Clone the fork to your folder (e.g. *work*).

**2. Add the plugin folder** to the *work/sdkjs-plugins/content* folder.

**3. Create your plugin** as described in the [API documentation](https://api.onlyoffice.com/plugin/gettingstarted).  

Your plugin folder must contain three main files: [config.json](https://api.onlyoffice.com/plugin/config), [index.html](https://api.onlyoffice.com/plugin/indexhtml), [pluginCode.js](https://api.onlyoffice.com/plugin/code), and [CHANGLOG.md](./sdkjs-plugins/content/chess/CHANGELOG.md) for your plugin. This file is needed for updates and version history. You also need to adjust its style, localize, add descriptions and icons.

**Please note**: To publish your own plugin in the Plugin Manager, you need to add the necessary fields into the [plugin config.js file](https://api.onlyoffice.com/plugin/config):
* "[version](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L10)" – necessary for correct work with our system update. It consists of three sections: ```x.x.x```.
* "offered" – your name or your organization name. By default, this field has "Ascensio System SIA" value. It can be added after the "version" field.
* "[store](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L81C8-L81C8)" – field for Plugin Manager which specifies how plugin should look like. We have default settings, but we recommend adjusting this field:
   <br>- "[background](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L82)" – specifies background for the plugin card head (for Light and Dark theme).
   <br>- "[screentshots](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L86)" – field for screenshots. If your plugin is non-interface, you can skip this field.
   <br>- "[icons](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L87C8-L87C8)" – specifies icons for the plugin card (for Light and Dark theme).
   <br>- "[categories](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L91)" – specifies categories of your plugin.

**4. Test your plugin in the desktop app.**  

Get [ONLYOFFICE Desktop Editors](https://github.com/ONLYOFFICE/DesktopEditors) and install your plugin as described [here](https://api.onlyoffice.com/plugin/installation/desktop). You need to pack all the plugin files within the plugin folder into a zip archive, change its extension to *.plugin*, and add your plugin through the plugin manager.

Once tested, you can build your pugin further or fix the identified issues. To get the developer console, run the desktop app with the `--ascdesktop-support-debug-info` key. To do it, click the mouse in the document and press F1.

**5. Test your plugin in the web.**

Upload the plugin folder to GitHub.

Go to the *work/store/plugin-dev/extension* folder.

In the *inject.js* file, specify the path to your plugin on GitHub.

Launch Chrome browser and switch to the *chrome://extensions/* page. Click *Load unpacked* and select the *work/store/plugin-dev/extension* folder.

Once done, run your ONLYOFFICE Document Server and find the plugin in the Plugin Manager.

Please note: when you are working on your plugin, it’s important to open the Plugin Manager to check and if necessary to improve how your plugin looks like there. You also need to take into consideration how the plugin looks like when switching to the Dark theme. Check the [icons requirements](https://api.onlyoffice.com/plugin/icons).

**6. Test your plugin in the plugin manager.**

* Add your plugin to the [sdkjs-plugins/content](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content) folder. It will be better if you follow our name structure.
* Add your plugin to the Plugin Manager [config.js file](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/store/config.json). Don't worry about the "discussion" field, we will adjust it ourselves.

**7. When you are ready with the plugin creation**, make pull request from your fork to the [https://github.com/ONLYOFFICE/onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io) repository.

Please note: If your plugin is supposed to use any API key, leave your contacts so that we can reach you and ask the key for testing of your plugin.

**8. In case everything is OK and it works properly**, we will approve the PR and the plugin will appear in the marketplace.

## How to test your own plugin manager

If you want test your own plugin manager, you should create a variable in localStorage named "DeveloperMarketplaceUrl" and put the URL of your plugin manager in it. You will see a notification at the top of the plugin manager window, if you are not using the original plugin manager.