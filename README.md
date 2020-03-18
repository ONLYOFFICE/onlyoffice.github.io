# ONLYOFFICE Zotero plugin

Zotero plugin allows users to create bibliographies in ONLYOFFICE editors using Zotero service.

The plugin is pre-installed in ONLYOFFICE Enterprise Edition, Community Edition (Document Server + Community Server), ONLYOFFICE cloud service, and ONLYOFFICE Personal. 

For ONLYOFFICE Integration Edition as well as ONLYOFFICE Document Server integrated with a 3rd-party storage manual installation is required. 

## How to use

1. Search references by author, title or year.

2. Among search results, choose ones you want to add to your document.

3. Choose style (e.g. Chicago Manual, American Psychological Association) and language.

4. Press `Insert citation`.

## How to install

For **Integration Edition and Document Server integrated with a 3rd-party storage** two installation ways are available:

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

## Configuration

For **Enterprise and Community Edition**


For **Integration Edition and Document Server integrated with a 3rd-party storage**:


## User feedback and support

To ask questions and share feedback, use Issues in this repository.
