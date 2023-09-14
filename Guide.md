# How to make your own plugin and suggest it to ONLYOFFICE

This is a guide for any developers who want to create their own plugins for ONLYOFFICE editors and publish it into the plugin manager.

## Plugin Structure

First of all you should know that our plugins have a certain [structure](https://api.onlyoffice.com/plugin/structure), for example you can see on [Chess](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/chess) plugin. Also you can check our [documentation](https://api.onlyoffice.com/plugin/basic), it can help you with codding.

**Notice**: For publish your plugin in plugin manager, you should add into a plugin [config.js](https://api.onlyoffice.com/plugin/config) file some necessary fields:
1) "[version](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L10)" - it's necessary for correct work with uur updating system. It cosist of three sections: ```x.x.x```.
2) "offered" - it's your name or your organisation name. By default this field has "Ascensio System SIA" value. It can be added after "version" field.
3) "[store](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L81C8-L81C8)" - it's field for plugin manager. It specifies how plugin should looks. We have default settings, but we reccomend to set this field.
   <br>3.1. "[background](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L82)" - this field specifies background for head of plugin card (for light and dark theme).
   <br>3.2. "[screentshots](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L86)" - this field for screenshots. If your plugin is non interface, you can sceep this field.
   <br>3.3. "[icons](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L87C8-L87C8)" - this field specifies icons for plugin card (for light and dark theme).
   <br>3.4. "[categories](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/3cafe43099a3768c4a2834298058b2748ac4de45/sdkjs-plugins/content/chess/config.json#L91)" - this field specifies categories of your plugin.

## Suggestion plugin

When your plugin is ready and you want to publish it in ONLYOFFICE plugin manager, you should follow next steps:
* Create a fork from [onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io) repository.
* Setting a github pages for your fork.
* Then add your plugin in [sdkjs-plugins/content](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content) folder. It will be better if you follow our name structure.
* Add your plugin for plugin manager [config.js](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/store/config.json) file as other. Don't worry about "discussoion" field, we will create it by ourself later.
* Make a deploy folder and ```plugin_name.plugin``` version - it's version for desktop editors. You can use our [packer](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/packer/make.py) or see this [video guide](https://youtu.be/bHTia-F0K3w) how to create such version.
* If your plugin suppouse to use some Api key, leave your contact how we can contact to you and ask key for testing your plugin on write our commet for your plugin.
