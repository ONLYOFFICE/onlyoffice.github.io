// Plugin menu buttons (Asc.Buttons and the context-menu/toolbar/window-header/content-control
// button classes) - split out of index.d.ts since it's a self-contained group referencing only
// config types (EditorType/IconConfig), not the plugin runtime itself.

import type { EditorType, IconConfig } from "../config/plugin-config";

type CustomMenuClickCallback = (data?: string) => void;

type ToolbarButtonType = "button" | "big-button";

interface ButtonMenuItem {
    id: string;
    text: string;
    hint?: string;
    items?: ButtonMenuItem[];
    onclick?: CustomMenuClickCallback;
}

interface ButtonBase {
    id: string;
    editors: EditorType[];
    icons: IconConfig | string[] | string | null;
    text: string;
    hint: string | null;
    data: string;
    separator: boolean;
    lockInViewMode: boolean;
    enableToggle: boolean;
    disabled: boolean;
    removed: boolean;
    parent: ButtonBase | null;
    childs: ButtonBase[] | null;
    menu?: ButtonMenuItem[];
    split?: boolean;
    pressed?: boolean;
    attachOnClick: (callback: CustomMenuClickCallback) => void;
    copy?: () => ButtonBase;
}

interface ButtonContextMenu extends ButtonBase {
    showOnOptionsType: string[];
    addCheckers: (...keys: string[]) => void;
}

interface ButtonToolbar extends ButtonBase {
    type: ToolbarButtonType;
    tab: string;
}

interface ButtonContentControl extends ButtonBase {
    checker?: (contentControlId: string) => boolean | Promise<boolean>;
    addChecker: (checker: (contentControlId: string) => boolean | Promise<boolean>) => void;
}

interface ButtonWindowHeader extends ButtonBase {
    align: "left" | "center" | "right" | string;
    isLabel: boolean;
    isTitle: boolean;
}

interface Buttons {
    registerContextMenu: () => void;
    registerToolbarMenu: () => void;
    updateToolbarMenu: (id: string, text: string, buttons: ButtonToolbar[]) => void;
    registerWindowHeader: (id: string, buttons: ButtonWindowHeader[], frame?: WindowHeaderFrameOptions) => void;
    updateWindowHeader: (id: string, buttons: ButtonWindowHeader[], add?: boolean, frame?: WindowHeaderFrameOptions) => void;
    registerContentControl: () => void;
}

interface WindowHeaderFrameOptions {
    align?: "left" | "center" | "right" | string;
    isLabel?: boolean;
    isTitle?: boolean;
}

export type {
    CustomMenuClickCallback,
    ToolbarButtonType,
    ButtonMenuItem,
    ButtonBase,
    ButtonContextMenu,
    ButtonToolbar,
    ButtonContentControl,
    ButtonWindowHeader,
    Buttons,
    WindowHeaderFrameOptions,
};
