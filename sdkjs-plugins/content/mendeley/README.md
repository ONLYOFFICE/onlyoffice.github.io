# ONLYOFFICE Mendeley plugin

Mendeley plugin allows users to create bibliographies in ONLYOFFICE editors using [Mendeley service](https://www.mendeley.com/).

The plugin is pre-installed in [ONLYOFFICE Workspace](https://www.onlyoffice.com/workspace.aspx) (both Enterprise and Community Edition) and [ONLYOFFICE cloud service](https://www.onlyoffice.com/cloud-office.aspx). It can also be installed to [Document Server](https://github.com/ONLYOFFICE/DocumentServer) manually.

## How to use

1. Search references by author, title or year.

2. Among search results, choose ones you want to add to your document.

3. Choose style (e.g. Chicago Manual, American Psychological Association) and language.

4. Press `Insert citation`.

## How to install

Two installation ways are available:

1. Put the folder with Mendeley plugin (it must contain the content of the src folder only) to ONLYOFFICE Document Server folder depending on the operating system:

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

Detailed instructions can also be found in [ONLYOFFICE API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/).

**Important**: when you integrate ONLYOFFICE Document Server with a 3rd-party storage, you need to use [special connectors](https://api.onlyoffice.com/editors/plugins) (integration apps). If you compile a connector from source code or create a new one, you can add plugins using Document Server config. If you use ready connectors (e.g. from ownCloud/Nextcloud marketplaces) adding plugins via config is not applicable. 

## Configuration

You will need to register the application.

1. Go to https://dev.mendeley.com/myapps.html.

2. Fill in the form using link provided in the plugin interface as a redirect URL.

3. Press `Generate secret` and copy it.

4. Insert the Application ID into the appropriate field in the plugin interface and press `Login`.

<!-- Desktop Editors sign-in is not released yet.

### Desktop Editors

ONLYOFFICE Desktop Editors open the Mendeley sign-in page in the system browser, so the plugin uses an authorization code that you paste manually.

1. Register the application as described above. The redirect URL shown in the plugin is `https://onlyoffice.github.io/sdkjs-plugins/content/mendeley/oauth.html`.

2. Insert both the Application ID and the secret into the plugin and press `Login`.

3. Sign in to Mendeley in the browser that opens. The page shows an authorization code: press `Copy`.

4. Paste the code into the `Authorization code` field in the plugin and press `Confirm`.

You only need to do this once: the plugin keeps your session and renews it automatically. The Application ID and the secret are stored locally in the editor.
-->

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

If you need more information about how to use or write your own plugin, please visit our [API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/get-started/overview/).