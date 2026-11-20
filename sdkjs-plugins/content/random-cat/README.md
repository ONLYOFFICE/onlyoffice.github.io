## Overview

Random Cat adds a random cat picture to your document, spreadsheet or presentation in a couple of clicks.

The plugin uses [The Cat API](https://thecatapi.com), a public service that provides cat photos. No API key or registration is required.

Random Cat is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop](https://github.com/ONLYOFFICE/DesktopEditors) versions of ONLYOFFICE editors. It can be added to ONLYOFFICE instances manually.

## How to use

1. Open the Plugins tab and click Random Cat. A random cat picture appears in the plugin panel.
2. Click **Another cat** until you find the picture you like.
3. Choose the image size: Small, Medium or Large.
4. Click **Insert**:
   * in the Document Editor, the picture is inserted at the cursor position;
   * in the Spreadsheet Editor, the picture is placed at the active cell;
   * in the Presentation Editor, the picture is placed in the center of the current slide.

## How to install

Detailed instructions can be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/).

## Known issues

* An internet connection is required: the pictures are loaded from `api.thecatapi.com` and its image CDN.
* Requests without an API key are rate-limited by The Cat API. If a picture fails to load, wait a little and click **Another cat** again.

## Third-party services

The plugin sends requests to [The Cat API](https://thecatapi.com) from the user's browser. No document content or personal data is transmitted. Please refer to the service's own terms of use and privacy policy.

## License

The plugin is distributed under the MIT License. See [LICENSE](LICENSE) for details.
