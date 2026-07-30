import type { Cell } from "../generated/cell";

declare global {
    interface Window {
        Api: Cell.Api;
    }

    var Api: Cell.Api;
}

export type CellApi = Cell.Api;
export type { Cell };

export {};
