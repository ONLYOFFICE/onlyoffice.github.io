## Overview

Highlight syntax of the code selecting the necessary language, style, and background color.

The plugin uses the [highlight.js](https://highlightjs.org/) engine, [prettier](https://github.com/prettier/prettier) library, [prettier-plugin-php] (https://github.com/prettier/plugin-php) plugin, [xml-formatter.js](https://github.com/chrisbottin/xml-formatter) library and [js-beautify.js](https://github.com/beautify-web/js-beautify) library. 

It is installed by default in cloud, [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop version](https://github.com/ONLYOFFICE/DesktopEditors) of ONLYOFFICE editors. 
## Supported languages and styles

Supported languages are populated from the bundled `highlight.js` build at runtime via `hljs.listLanguages()`. The language picker also matches aliases exposed by `highlight.js`, such as `js`, `c++`, `c#`, `sh`, and `yml`.

Supported styles: Googlecode, GitHub, GitHub Gist, Android Studio, Visual Studio, Visual Studio 2015, Idea, Qtcreator Dark, Qtcreator Light, XCode, Fortran, Foundation, XML 1, XML 2. 

Code formatting is available for: `xml`, `javascript`, `typescript`, `css`, `markdown`, `json`, `php`, and `html`.

## How to use

1. Find the plugin in the Plugins tab.
2. Insert your code.
3. Set the language you use. It will be defined automatically, but you can also change it manually. 
4. Choose style/background color and press OK to insert your code into the document. 

If you need more information about how to use or write your own plugin, please see this https://api.onlyoffice.com/docs/plugin-and-macros/get-started/overview/
