interface TranslationRequest {
    from: string;
    to: string;
    text: string;
    html: boolean;
    priority?: number;
    qualityScores?: boolean;
}
interface TranslationRequestOptions {
    signal?: AbortSignal;
    onDownloadProgress?: (current: number, total: number) => void;
}
interface TranslationResponse {
    request: TranslationRequest;
    target: {
        text: string;
    };
}
interface TranslationModel {
    model: ArrayBuffer;
    shortlist: ArrayBuffer;
    vocabs: ArrayBuffer[];
    qualityModel?: ArrayBuffer;
    config?: Record<string, any>;
}
interface TranslatorBackingOptions {
    cacheSize?: number;
    useNativeIntGemm?: boolean;
    downloadTimeout?: number;
    workerUrl?: string;
    registryUrl?: string;
    pivotLanguage?: string;
    onerror?: (error: Error) => void;
}
interface Model {
    from: string;
    to: string;
    files: Record<string, {
        name: string;
        size: number;
        expectedSha256Hash: string;
    }>;
}
/**
 * Thrown when a pending translation is replaced by another newer pending
 * translation.
 */
export declare class SupersededError extends Error {
}
/**
 * Thrown when a translation was removed from the queue.
 */
export declare class CancelledError extends Error {
}
/**
 * Wrapper around bergamot-translator loading and model management.
 */
export declare class TranslatorBacking {
    options: TranslatorBackingOptions;
    registryUrl: string;
    workerUrl: string;
    downloadTimeout: number;
    /**
     * registry of all available models and their urls
     */
    registry: Promise<Model[]>;
    /**
     * Map of downloaded model data files as buffers per model.
     */
    buffers: Map<string, Promise<TranslationModel>>;
    pivotLanguage: string;
    /**
     * A map of language-pairs to a list of models you need for it.
     */
    models: Map<string, Promise<Omit<Model, "files">[]>>;
    /**
     * Map of model download state.
     */
    state: Map<string, "unavailable" | "downloadable" | "downloading" | "available">;
    /**
     * Error handler for all errors that are async, not tied to a specific
     * call and that are unrecoverable.
     */
    onerror: (error: Error) => void;
    constructor(options: TranslatorBackingOptions);
    /**
     * Loads a worker thread, and wraps it in a message passing proxy. I.e. it
     * exposes the entire interface of TranslationWorker here, and all calls
     * to it are async. Do note that you can only pass arguments that survive
     * being copied into a message.
     * @return {Promise<{worker:Worker, exports:Proxy<TranslationWorker>}>}
     */
    loadWorker(): Promise<{
        worker: Worker;
        exports: {};
    }>;
    /**
     * Loads the model registry. Uses the registry shipped with this extension,
     * but formatted a bit easier to use, and future-proofed to be swapped out
     * with a TranslateLocally type registry.
     */
    loadModelRegistry(): Promise<Model[]>;
    /**
     * Gets or loads translation model data. Caching wrapper around
     * `loadTranslationModel()`.
     */
    getTranslationModel({ from, to }: Omit<Model, "files">, options?: {
        signal?: AbortSignal;
    }): Promise<TranslationModel>;
    /**
     * Downloads a translation model and returns a set of
     * ArrayBuffers. These can then be passed to a TranslationWorker thread
     * to instantiate a TranslationModel inside the WASM vm.
     */
    loadTranslationModel({ from, to }: Omit<Model, "files">, options?: {
        signal?: AbortSignal;
    }): Promise<TranslationModel>;
    /**
     * Helper to download file from the web. Verifies the checksum.
     */
    fetch(url: string, checksum: string | undefined, extra: {
        signal?: AbortSignal;
    } | undefined): Promise<ArrayBuffer>;
    /**
     * Converts the hexadecimal hashes from the registry to something we can use with
     * the fetch() method.
     */
    hexToBase64(hexstring: any): string;
    /**
     * Crappy named method that gives you a list of models to translate from
     * one language into the other. Generally this will be the same as you
     * just put in if there is a direct model, but it could return a list of
     * two models if you need to pivot through a third language.
     * Returns just [{from:str,to:str}...]. To be used something like this:
     * ```
     * const models = await this.getModels(from, to);
     * models.forEach(({from, to}) => {
     *   const buffers = await this.loadTranslationModel({from,to});
     *   [TranslationWorker].loadTranslationModel({from,to}, buffers)
     * });
     * ```
     */
    getModels({ from, to }: {
        from: any;
        to: any;
    }): Promise<Omit<Model, "files">[]>;
    /**
     * Find model (or model pair) to translate from `from` to `to`.
     */
    findModels(from: string, to: string): Promise<Omit<Model, "files">[]>;
    /**
     * Checks whether a model is available or being downloaded.
     */
    getState({ from, to, }: Omit<Model, "files">): Promise<"unavailable" | "downloadable" | "downloading" | "available">;
}
interface BatchTranslatorOptions extends TranslatorBackingOptions {
    workers?: number;
    batchSize?: number;
}
interface Batch {
    id: number;
    key: string;
    priority: number;
    models: Omit<Model, "files">[];
    requests: Array<{
        request: TranslationRequest;
        resolve: (response: TranslationResponse) => void;
        reject: (error: Error) => void;
    }>;
}
/**
 * Translator balancing between throughput and latency. Can use multiple worker
 * threads.
 */
export declare class BatchTranslator {
    backing: TranslatorBacking;
    /**
     * List of active workers
     * (and a flag to mark them idle or not)
     */
    workers: Array<{
        idle: boolean;
        worker?: Worker;
        exports?: any;
    }>;
    /**
     * Maximum number of workers
     */
    workerLimit: number;
    /**
     * List of batches we push() to & shift() from using `enqueue`.
     */
    queue: Array<Batch>;
    /**
     * batch serial to help keep track of batches when debugging
     */
    batchSerial: number;
    /**
     * Number of requests in a batch before it is ready to be translated in
     * a single call. Bigger is better for throughput (better matrix packing)
     * but worse for latency since you'll have to wait for the entire batch
     * to be translated.
     */
    batchSize: number;
    onerror: (error: Error) => void;
    constructor(options: BatchTranslatorOptions, backing?: TranslatorBacking);
    /**
     * Destructor that stops and cleans up.
     */
    delete(): Promise<void>;
    /**
     * Makes sure queued work gets send to a worker. Will delay it till `idle`
     * to make sure the batches have been filled to some degree. Will keep
     * calling itself as long as there is work in the queue, but it does not
     * hurt to call it multiple times. This function always returns immediately.
     */
    notify(): void;
    /**
     * The only real public call you need!
     * ```
     * const {target: {text:string}} = await this.translate({
     *   from: 'de',
     *   to: 'en',
     *   text: 'Hallo Welt!',
     *   html: false, // optional
     *   priority: 0 // optional, like `nice` lower numbers are translated first
     * })
     * ```
     */
    translate(request: TranslationRequest): Promise<TranslationResponse>;
    /**
     * Prune pending requests by testing each one of them to whether they're
     * still relevant. Used to prune translation requests from tabs that got
     * closed.
     */
    remove(
    /** evaluates to true if request should be removed */
    filter: (request: TranslationRequest) => boolean): void;
    /**
     * Internal function used to put a request in a batch that still has space.
     * Also responsible for keeping the batches in order of priority. Called by
     * `translate()` but also used when filtering pending requests.
     */
    enqueue({ key, models, request, resolve, reject, priority, }: {
        key: string;
        models: Omit<Model, "files">[];
        request: TranslationRequest;
        resolve: (response: TranslationResponse) => void;
        reject: (error: Error) => void;
        priority?: number;
    }): void;
    /**
     * Internal method that uses a worker thread to process a batch. You can
     * wait for the batch to be done by awaiting this call. You should only
     * then reuse the worker otherwise you'll just clog up its message queue.
     */
    consumeBatch(batch: Batch, worker: any): Promise<void>;
}
interface LatencyOptimisedTranslatorOptions extends TranslatorBackingOptions {
    onDownloadProgress?: (current: number, total: number) => void;
}
/**
 * Translator optimised for interactive use.
 */
export declare class LatencyOptimisedTranslator {
    backing: TranslatorBacking;
    worker: Promise<{
        idle: boolean;
        worker: Worker;
        exports: any;
    }> | null;
    pending: {
        request: TranslationRequest;
        accept: (response: TranslationResponse) => void;
        reject: (error: Error) => void;
        options?: {
            signal?: AbortSignal;
        };
    } | null;
    constructor(request: {
        from: string;
        to: string;
    }, options: LatencyOptimisedTranslatorOptions, backing?: TranslatorBacking);
    /**
     * Destructor that stops and cleans up.
     */
    delete(): Promise<void>;
    /**
     * Sets `request` as the next translation to process. If there was already
     * a translation waiting to be processed, their promise is rejected with a
     * SupersededError.
     */
    translate(request: TranslationRequest, options?: TranslationRequestOptions): Promise<TranslationResponse>;
    notify(): void;
    fetchTranslationModels(worker: {
        idle: boolean;
        worker: Worker;
        exports: any;
    }, request: Pick<TranslationRequest, "from" | "to">, options?: TranslationRequestOptions): Promise<Omit<Model, "files">[]>;
}
export {};
