## Overview

Convert selected text into speech. 

The plugin uses [guessLanguage](http://richtr.github.io/guessLanguage.js/) to recognize the language and the SpeechSynthesis - interface of the Web Speech API is the controller interface for the speech service. 

The Speech plugin is installed by default in cloud and [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) of ONLYOFFICE editors. 

## How to use

1. Highlight the phrase you want to here.
2. Open the plugin settings to select the language for the voiceover (The default setting is auto-recognition mode).
3. Click on the plugin to sound out the text

### Note

Some browsers, e.g. Mozzila, Opera, can only use pre-installed languages on your system for speech generation.
So to use new languages you need to add them to your system.

### Known issues

* The plugin doesn't work on Safari 15.3 (17612.4.9.1.8). Problem fixed on Safari 15.4 (17614.1.7.7)

If you need more information about how to use or write your own plugin, please see this https://api.onlyoffice.com/plugin/basic
