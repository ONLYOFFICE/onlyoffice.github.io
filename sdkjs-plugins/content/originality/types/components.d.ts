// What the plugin uses of the components in scripts/ui/components. Those files are copies of the
// zotero and AI plugins' components and stay out of type checking (see jsconfig.json): zotero's are
// ES5 constructor functions, which TypeScript 7 no longer types from JavaScript, so their shape is
// declared here instead. Only the members the plugin calls are listed.

interface ComponentSubscription {
    unsubscribe(): void;
}

interface ComponentEvent<TType extends string, TDetail> {
    type: TType;
    detail: TDetail;
}

declare class Button {
    constructor(button: string | HTMLButtonElement, options?: {
        text?: string;
        variant?: "primary" | "secondary" | "secondary-icon" | "icon-only";
        size?: "small" | "medium" | "large";
        disabled?: boolean;
        tooltip?: string;
        /** markup put before the text (after it with iconPosition "right"); shown with a text only */
        icon?: string;
        iconPosition?: "left" | "right";
    });
    /** Every event of the button, hovering and focus included: actions filter on "button:click". */
    subscribe(callback: (event: ComponentEvent<"button:click" | "button:mouseenter" | "button:mouseleave" | "button:focus" | "button:blur" | "button:keydown", { originalEvent?: Event; key?: string | number }>) => void): ComponentSubscription;
    setText(text: string): void;
    enable(): void;
    disable(): void;
    startLoading(): void;
    stopLoading(): void;
}

declare class InputField {
    constructor(input: string | HTMLInputElement, options?: {
        type?: string;
        placeholder?: string;
        value?: string;
        disabled?: boolean;
        showClear?: boolean;
    });
    subscribe(callback: (event: ComponentEvent<"inputfield:input" | "inputfield:change" | "inputfield:focus" | "inputfield:blur" | "inputfield:submit", { value: string }>) => void): ComponentSubscription;
    getValue(): string;
    setValue(value: string): void;
    enable(): void;
    disable(): void;
}

declare class Checkbox {
    constructor(checkbox: string | HTMLInputElement, options?: {
        label?: string;
        checked?: boolean;
        disabled?: boolean;
    });
    subscribe(callback: (event: ComponentEvent<"checkbox:change", { value: string; checked: boolean; disabled: boolean }>) => void): ComponentSubscription;
    check(silent?: boolean): void;
    uncheck(silent?: boolean): void;
    enable(): void;
    disable(): void;
}

declare class Message {
    constructor(container: string | HTMLElement, options: {
        type: "error" | "warning" | "info" | "success";
        title?: string;
        /** a node for a text with markup in it, e.g. a link; a string is shown as plain text */
        text?: string | Node;
        duration?: number;
        closeButton?: boolean;
        autoClose?: boolean;
        closeOnClickOutside?: boolean;
    });
    show(text?: string, title?: string): Message;
    close(): void;
}

declare class Loader {
    constructor(containerId: string, text: string);
    show(): void;
    hide(): void;
}

declare class SelectBox {
    constructor(selectbox: string | HTMLSelectElement | HTMLElement, options: {
        placeholder: string;
        searchable?: boolean;
        multiple?: boolean;
        description?: string;
        translate?: (text: string) => string;
    });
    subscribe(callback: (event: ComponentEvent<"selectbox:change" | "selectbox:custom", { values: Array<string | number>; current: string | number; enabled: boolean }>) => void): ComponentSubscription;
    addItems(values: Array<[string, string, boolean?]>, selectedValue?: string): void;
    getSelectedValue(): string | null;
    enable(): void;
    disable(): void;
}
