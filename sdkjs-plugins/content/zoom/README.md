# Zoom plugin

The Zoom plugin allows users to schedule meetings and make calls.

It is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) version of ONLYOFFICE editors. It can be added to ONLYOFFICE instances manually.

## How to use

1. Go to the plugins tab and click on Zoom.
2. Add your meeting topic and choose Start a meeting or Schedule a meeting. 

## How to install

Detailed instructions can be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/plugin/installation).

## Configuration

1. To use the meeting schedule create a JWT app at https://marketplace.zoom.us/develop/create. Fill the all necessary fields and activate the app.
2. To join to meetings create a Meeting SDK app at https://marketplace.zoom.us/develop/create. Fill the all necessary fields and activate the app.
2. Copy SDK Key, SDK Secret and JWT Token from your JWT and SDK apps credentials and paste it to specified fields in plugin, click Save.

## Note
For desktop infromation about created meeting will be add to comments of the document, however in web version it will be send to the chat.

## Known issues
A black window may appear in the safari browser when joining a meeting. In order for the problem to disappear, you need to resize the plugin window or zoom in on the browser.