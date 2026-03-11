# ONLYOFFICE Plugin Marketplace

ONLYOFFICE Plugin Marketplace (or Plugin Manager) allows users to explore all available plugins and install or remove any plugin with just one click right in the editors.

## How to build and add your own plugin

If you would like to create and add your own plugin to the marketplace, follow the steps below.

**1. Fork the plugin marketplace repository**: [https://github.com/ONLYOFFICE/onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io).

To further test in the web version, you need to enable [GitHub Pages](https://docs.github.com/en/pages/quickstart).

Clone the fork to your folder (e.g. *work*).

**2. Add the plugin folder** to the *work/sdkjs-plugins/content* folder.

**3. Create your plugin** as described in the [API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/structure/getting-started/).

Your plugin folder must contain four main files: [config.json](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/), [index.html](https://api.onlyoffice.com/docs/plugin-and-macros/structure/entry-point/), [pluginCode.js](https://api.onlyoffice.com/docs/plugin-and-macros/interacting-with-editors/overview/), and [CHANGELOG.md](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/CHANGELOG.md) for your plugin. The CHANGELOG.md file is needed for updates and version history. You also need to adjust its style, localize it, and add descriptions and icons.

**Please note**: To publish your own plugin in the Plugin Manager, you need to add the necessary fields into the [plugin config.json file](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/):
* "[version](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#version)" ([example](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/config.json#L16)) – necessary for our update system to work correctly. It consists of three sections: `x.x.x`.
* "[offered](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#offered)" – your name or your organization name. By default, this field has the "Ascensio System SIA" value. It can be added after the "version" field.
* "[store](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#variationsstore)" ([example](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/config.json#L94)) – a field for the Plugin Manager which specifies how the plugin should look. We have default settings, but we recommend adjusting this field:
   * "[background](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#variationsstorebackground)" ([example](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/config.json#L95)) – specifies the background for the plugin card head (for the Light and Dark themes).
   * "[screenshots](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#variationsstorescreenshots)" ([example](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/config.json#L99)) – a field for screenshots. If your plugin is non-interface, you can skip this field.
   * "[icons](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#variationsstoreicons)" ([example](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/config.json#L103)) – specifies the icons for the plugin card (for the Light and Dark themes).
   * "[categories](https://api.onlyoffice.com/docs/plugin-and-macros/structure/configuration/#variationsstorecategories)" ([example](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/chess/config.json#L107)) – specifies the categories of your plugin.

**4. Test your plugin in the desktop app.**

Get [ONLYOFFICE Desktop Editors](https://github.com/ONLYOFFICE/DesktopEditors) and install your plugin as described [here](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-desktop-editors/). You need to pack all the plugin files within the plugin folder into a zip archive, change its extension to *.plugin*, and add your plugin through the plugin manager.

Once tested, you can build your plugin further or fix the identified issues. To get the developer console, run the desktop app with the `--ascdesktop-support-debug-info` key. To do it, click anywhere in the document and press F1.

**5. Test your plugin in the web.**

Upload the plugin folder to GitHub.

Go to the *work/store/plugin-dev/extension* folder.

In the *inject.js* file, specify the path to your plugin on GitHub.

Launch the Chrome browser and switch to the *chrome://extensions/* page. Click *Load unpacked* and select the *work/store/plugin-dev/extension* folder.

Once done, run your ONLYOFFICE Document Server and find the plugin in the Plugin Manager.

Please note: When you are working on your plugin, it's important to open the Plugin Manager to check and, if necessary, improve how your plugin looks there. You also need to take into consideration how the plugin looks when switching to the Dark theme. Check the [icons requirements](https://api.onlyoffice.com/docs/plugin-and-macros/customization/icons/).

**6. Test your plugin in the plugin manager.**

* Add your plugin to the [sdkjs-plugins/content](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content) folder. It would be better if you followed our naming structure.
* Add your plugin to the Plugin Manager [config.json file](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/store/config.json). Don't worry about the "discussion" field, we will adjust it ourselves.

**7. When you have finished creating the plugin**, make a pull request from your fork to the [https://github.com/ONLYOFFICE/onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io) repository.

Please note: If your plugin is supposed to use any API key, leave your contacts so that we can reach you and ask for the key for testing of your plugin.

**8. If everything is OK and it works properly**, we will approve the PR and the plugin will appear in the marketplace.

## How to test your own plugin manager

If you want to test your own plugin manager, you should create a variable in localStorage named "DeveloperMarketplaceUrl" and put the URL of your plugin manager in it. You will see a notification at the top of the plugin manager window if you are not using the original plugin manager.
