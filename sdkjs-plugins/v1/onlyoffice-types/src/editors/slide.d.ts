import type { Slide } from "../generated/slide";

declare global {
    interface Window {
        Api: Slide.Api;
    }

    var Api: Slide.Api;
}

export type SlideApi = Slide.Api;
export type { Slide };

export {};
