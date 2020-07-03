# ONLYOFFICE Zotero plugin

Zotero plugin allows users to create bibliographies in ONLYOFFICE editors using Zotero service.

The plugin is pre-installed in ONLYOFFICE Enterprise Edition, Community Edition, Integration Edition, ONLYOFFICE cloud service, and ONLYOFFICE Personal. It can also be installed to Document Server manually. 

## How to use

1. Search references by author, title or year.

2. Among search results, choose ones you want to add to your document.

3. Choose style (e.g. Chicago Manual, American Psychological Association) and language.

4. Press `Insert citation`.

Please note that Zotero works only with user’s personal library associated with the your account. The desired sources must be added to your library in Zotero before you can search and add them to your bibliography via plugin.

## How to install

Two installation ways are available:

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
                    "asc.{BFC5D5C6-89DE-4168-9565-ABD8D1E48711}",
                    ...
                ],
                "pluginsData": [
                    "https://example.com/path/to/zotero/config.json",
                    ...
                ]
            },
            ...
        },
        ...
    });
    ```
**Important**: when you integrate ONLYOFFICE Document Server with a 3rd-party storage, you need to use special connectors (integration apps). If you compile a connector from source code or create a new one, you can add plugins using Document Server config. If you use ready connectors (e.g. from ownCloud/Nextcloud marketplaces) adding plugins via config is not applicable.

## Configuration

1. Find Zotero plugin in `Plugins` tab of the ONLYOFFICE Document Editor and click it.

2. Follow `Zotero API settings` link from the plugin’s window.

3. Log in to your Zotero account, press `Create new private key`.

4. Fill in `Key Description`, make sure `Allow library access` box is checked and press `Save Key`.

5. Copy the newly created key and paste to `API Key` field in the plugin’s interface and save it. 

## Known issues

For CentOS users with SELinx enabled, after copying the src folder to sdkjs-plugins, plugins may not work due to the variable file security context. To restore the rights, use the following command:

```
sudo restorecon -Rv /var/www/onlyoffice/documentserver/sdkjs-plugins/
```

After that restart the services:

```
sudo supervisorctl restart ds:docservice
```

## User feedback and support

To ask questions and share feedback, use Issues in this repository.
