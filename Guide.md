# How to build your own plugin and submit it to ONLYOFFICE Plugin Manager

This guide is intended for developers who want to create their own plugins for ONLYOFFICE editors and publish the ready ones in the Plugin Manager.

## Plugin structure

Take into consideration that plugins in ONLYOFFICE have a certain [structure](https://api.onlyoffice.com/plugin/structure), check the example for the [Chess plugin](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/chess). 

To assist yourself in plugin building and coding, please refer to the [official documentation](https://api.onlyoffice.com/plugin/basic).

**Please note**: To publish your own plugin in the Plugin Manager, you need to add the necessary fields into the [plugin config.js file](https://api.onlyoffice.com/plugin/config):
1) "[version](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L10)" – necessary for correct work with our system update. It consists of three sections: ```x.x.x```.
2) "offered" – your name or your organization name. By default, this field has "Ascensio System SIA" value. It can be added after the "version" field.
3) "[store](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L81C8-L81C8)" – field for Plugin Manager which specifies how plugin should look like. We have default settings, but we recommend adjusting this field:
   <br>3.1. "[background](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L82)" – specifies background for the plugin card head (for Light and Dark theme).
   <br>3.2. "[screentshots](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L86)" – field for screenshots. If your plugin is non-interface, you can skip this field.
   <br>3.3. "[icons](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L87C8-L87C8)" – specifies icons for the plugin card (for Light and Dark theme).
   <br>3.4. "[categories](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L91)" – specifies categories of your plugin.

## Plugin submission

When your plugin is ready and you want to submit it to the ONLYOFFICE Plugin Manager, follow the steps:
* Create a fork from the [onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io) repository.
* Set up [GitHub Pages](https://pages.github.com/) for your fork.
* Add your plugin to the [sdkjs-plugins/content](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content) folder. It will be better if you follow our name structure.
* Add your plugin to the Plugin Manager [config.js file](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/store/config.json). Don't worry about the "discussion" field, we will adjust it ourselves.
* Make a deployment folder and ```plugin_name.plugin``` version for the desktop app. You can use our [packer](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/packer/make.py) or watch this [video guide](https://youtu.be/bHTia-F0K3w) and learn how to create such a version.
* Add [CHANGLOG.md](./sdkjs-plugins/content/chess/CHANGELOG.md) for your plugin. This file is needed for updates and version history.
* If your plugin is supposed to use any API key, leave your contacts so that we can reach you and ask the key for testing of your plugin.