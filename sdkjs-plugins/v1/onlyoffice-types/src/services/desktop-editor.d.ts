// Native C++ object injected by OnlyOffice Desktop Editor into the browser window.

type DesktopDialogType = 'plugin' | 'images' | 'cell' | 'word' | 'slide';

interface AscDesktopEditor {
    // Plugin management
    GetInstallPlugins(): string;
    GetBackupPlugins(): string;
    PluginInstall(path: string): boolean;

    // File dialogs
    OpenFilenameDialog(type: DesktopDialogType, multiple: boolean, callback: (file: string | string[]) => void): void;

    // Local file operations
    LocalStartOpen(): void;
    LocalFileSave(params: string, password: string, docinfo?: unknown, fileType?: number, jsonOptions?: string, passwordOld?: string): void;
    LocalFileSaveChanges(changes: string, deleteIndex: number, count: number): void;
    LocalFileGetSaved(): boolean;
    LocalFileGetSourcePath(): string;
    LocalFileGetRelativePath(path: string): string;
    LocalFileGetOpenChangesCount(): number;
    LocalFileGetImageUrl(path: string): string;
    LocalFileGetImageUrlCorrect(path: string): string;
    IsLocalFileExist(path: string): boolean;
    GetOpenedFile(path: string): ArrayBuffer | null;
    AddChanges(type: number, base64: string): void;

    // Document state
    SetDocumentName(name: string): void;
    onDocumentModifiedChanged(isModified: boolean): void;
    SetLocalRestrictions(value: number): void;
    SetAdvancedOptions(xml: string): void;
    NativeViewerOpen(password: string): void;
    CheckUserId(): string;

    // Encryption
    buildCryptedEnd(success: boolean): void;

    // External conversions
    startExternalConvertation(type: string, params: string): void;
}

export type { DesktopDialogType, AscDesktopEditor };
