import type { Word } from "../generated/word";

declare global {
    interface Window {
        Api: Word.Api;
    }

    var Api: Word.Api;
}

export type WordApi = Word.Api;
export type { Word };

export {};
