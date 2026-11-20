// The types package exports these instead of declaring them globally; the plugin's scripts are
// classic scripts with no imports, so they are brought into the global scope here once.
import type {
    AscTheme as PackageAscTheme,
    PluginWindow as PackagePluginWindow,
} from "@onlyoffice/doceditor-plugin-types";

declare global {
    type AscTheme = PackageAscTheme;

    /**
     * `activate` exists at run time (sdkjs `common/plugins/plugin_base.js`,
     * `CPluginWindow.prototype.activate`, which sends `ActivateWindow`) but the types package does
     * not declare it yet; the AI plugin calls it the same way.
     */
    type PluginWindow = PackagePluginWindow & {
        activate(isFocus?: boolean): void;
    };
}
