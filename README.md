# ONLYOFFICE Mendeley plugin

Mendeley plugin allows users to create bibliographies in ONLYOFFICE editors using Mendeley service.

The plugin is pre-installed in ONLYOFFICE Enterprise Edition, Community Edition (Document Server + Community Server), ONLYOFFICE cloud service, and ONLYOFFICE Personal. 

For ONLYOFFICE Integration Edition as well as ONLYOFFICE Document Server integrated with a 3rd-party storage (e.g. ownCloud, Nextcloud, Seafile) manual installation is required. 

## How to use

1. Search references by author, title or year.

2. Among search results, choose ones you want to add to your document.

3. Choose style (e.g. Chicago Manual, American Psychological Association) and language.

4. Press `Insert citation`.

## How to install

For **Integration Edition and Document Server integrated with a 3rd-party storage** (e.g. ownCloud, Nextcloud, Seafile) two installation ways are available:

1. Put the folder with the plugin code to ONLYOFFICE Document Server folder depending on the operating system:

    For Linux - `/var/www/onlyoffice/documentserver/sdkjs-plugins/`.

    For Windows - `%ProgramFiles%\ONLYOFFICE\DocumentServer\sdkjs-plugins\`.

    The plugins will be available to all the users users of ONLYOFFICE Document Server.
    No service restart is required.

2. Edit the Document Server config to add the following lines:

    ```
    var docEditor = new DocsAPI.DocEditor("placeholder", {
        "editorConfig": {
            "plugins": {
                "autostart": [
                    "asc.{BE5CBF95-C0AD-4842-B157-AC40FEDD9441}",
                    ...
                ],
                "pluginsData": [
                    "https://example.com/path/to/mendeley/config.json",
                    ...
                ]
            },
            ...
        },
        ...
    });
    ```
**Important**: when you integrate ONLYOFFICE Document Server with a 3rd-party storage, you need to use special connectors (integration apps). If you compile a connector from source code or create a new one, you can add plugins using Document Server config. If you use ready connectors (e.g. from ownCloud/Nextcloud marketplaces) adding plugins via config is not applicable. 

Mendeley plugin is installed by default for **Enterprise and Community Edition**.
In case you need to install it yourself, do the following:

1. Clone repository

    ```
    git clone --branch community-server https://github.com/ONLYOFFICE/onlyoffice-mendeley.git
    ```

2. Copy `onlyoffice-mendeley` directory to `<community-server>\web\studio\ASC.Web.Studio\ThirdParty\plugin\mendeley`

    ```
    cp src <community-server>\web\studio\ASC.Web.Studio\ThirdParty\plugin\mendeley
    ```

## Configuration

For **Enterprise and Community Edition**

1. Proceed to `Settings` -> `Integration` -> `Third Party Authorization`, find `Mendeley` and turn it on. Popup with configuration will appear.

2. Register the app here https://dev.mendeley.com/myapps.html. Use https://service.onlyoffice.com/oauth2.aspx as a redirect URL.

3. Press `Generate secret`, copy the secret and get the application id.

4. Paste the secret and the application id into the form in the popup configuration window.

For **Integration Edition and Document Server integrated with a 3rd-party storage** (e.g. ownCloud, Nextcloud, Seafile):

You will need to register the application.

1. Go to https://dev.mendeley.com/myapps.html.

2. Fill in the form using link provided in the plugin interface as a redirect URL.

3. Press `Generate secret` and copy it.

4. Insert the secret into the appropriate field in the plugin interface.

## User feedback and support

To ask questions and share feedback, use Issues in this repository.
