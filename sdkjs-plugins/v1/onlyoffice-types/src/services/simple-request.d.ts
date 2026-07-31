// window.AscSimpleRequest - a small cross-origin request helper injected alongside window.Asc.

interface AscSimpleRequestOptions {
    url: string;
    crossOrigin?: boolean;
    crossDomain?: boolean;
    timeout?: number;
    headers?: string;
    complete?: (response: any, status: string) => void;
    error?: (response: any, status: string, error: any) => void;
}

interface AscSimpleRequest {
    createRequest(options: AscSimpleRequestOptions): void;
}

export type { AscSimpleRequestOptions, AscSimpleRequest };
