## Overview

Type with your voice in ONLYOFFICE Docs.

The plugin uses [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

The plugin can be installed manually to the [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) version of ONLYOFFICE Docs.

## How to use

1. Turn on your microphone.
2. Find the plugin on the Plugins tab and click it.
3. Set the language you use.
4. Click the microphone button and start speaking. 
5. After dictation is complete, the text is inserted into the document. To stop inserting text, click the microphone button again . 

## How to install

Detailed instructions can be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/plugin/installation).

## Known issues

- This plugin works in Google Chrome only. To use it in FireFox, enable recognition via `media.webspeech.recognition.enable` and `media.webspeech.recognition.force_enable` flags in `about:config` synthesis is switched on by default. More information [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). 

- The plugin does not work for the desktop version yet

- The plugin doesn't work with http (it works only with https).

