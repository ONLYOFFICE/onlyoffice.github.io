# onlyoffice-textcure

Unofficial Antidote plugin for [ONLYOFFICE](https://www.onlyoffice.com/). Powered by [@druide-informatique/antidote-api-js](https://www.jsdelivr.com/package/npm/@druide-informatique/antidote-api-js).

## Installation

You can go to the [release page](https://github.com/yiranlus/onlyoffice-textcure/releases) to download the latest version of the plugin. The filename is ended with `.plugin`.

Please manually install this plugin to OnlyOffice.

## Build Instructions

Clone the repository
```
git clone https://github.com/onlyoffice/onlyoffice-textcure.git
```
  
Install dependencies
```
npm install
```

Build the plugin
```
npm run build:plugin
```

After that, you should be able to see that a `*.plugin` file is created at the root directory.

Note: The plugin has only be tested with Desktop version of ONLYOFFICE.

## Development

If you are interested in fixing bugs or adding new features, you are free to fork the repository.

The whole project is writen in Typescript and built using [Vite](https://vite.dev/). The Javascript code is minified in the plugin. For debugging, you may want to modify `vite.config.ts` to avoid minification:
```javascript
export default defineConfig({
  build: {
    minify: false,
  }
});
```
