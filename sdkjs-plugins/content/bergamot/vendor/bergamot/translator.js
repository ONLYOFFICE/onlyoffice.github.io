/**
 * NodeJS compatibility, a thin WebWorker layer around node:worker_threads.
 */
if (!(typeof window !== "undefined" && window.Worker)) {
    globalThis.Worker = class {
        worker;
        constructor(url) {
            this.worker = new Promise(async (accept) => {
                // @ts-ignore
                const { Worker } = await import(/* webpackIgnore: true */ "node:worker_threads");
                accept(new Worker(url));
            });
        }
        addEventListener(eventName, callback) {
            this.worker.then((worker) => worker.on(eventName, (data) => callback({ data })));
        }
        postMessage(message) {
            this.worker.then((worker) => worker.postMessage(message));
        }
        terminate() {
            this.worker.then((worker) => worker.terminate());
        }
    };
}
/**
 * Thrown when a pending translation is replaced by another newer pending
 * translation.
 */
export class SupersededError extends Error {
}
/**
 * Thrown when a translation was removed from the queue.
 */
export class CancelledError extends Error {
}
/**
 * Wrapper around bergamot-translator loading and model management.
 */
export class TranslatorBacking {
    options;
    registryUrl;
    workerUrl;
    downloadTimeout;
    /**
     * registry of all available models and their urls
     */
    registry;
    /**
     * Map of downloaded model data files as buffers per model.
     */
    buffers = new Map();
    pivotLanguage;
    /**
     * A map of language-pairs to a list of models you need for it.
     */
    models;
    /**
     * Map of model download state.
     */
    state;
    /**
     * Error handler for all errors that are async, not tied to a specific
     * call and that are unrecoverable.
     */
    onerror;
    constructor(options) {
        this.options = options || {};
        this.registryUrl =
            this.options.registryUrl ||
                "https://bergamot.s3.amazonaws.com/models/index.json";
        this.workerUrl = this.options.workerUrl || "./worker/translator-worker.js";
        this.downloadTimeout =
            "downloadTimeout" in this.options
                ? parseInt(this.options.downloadTimeout)
                : 60000;
        this.registry = this.loadModelRegistry();
        this.buffers = new Map();
        this.pivotLanguage =
            "pivotLanguage" in this.options ? options.pivotLanguage : "en";
        this.models = new Map();
        this.state = new Map();
        this.onerror =
            this.options.onerror ||
                ((err) => console.error("WASM Translation Worker error:", err));
    }
    /**
     * Loads a worker thread, and wraps it in a message passing proxy. I.e. it
     * exposes the entire interface of TranslationWorker here, and all calls
     * to it are async. Do note that you can only pass arguments that survive
     * being copied into a message.
     * @return {Promise<{worker:Worker, exports:Proxy<TranslationWorker>}>}
     */
    async loadWorker() {
        const worker = new Worker(new URL(this.workerUrl, import.meta.url));
        /**
         * Incremental counter to derive request/response ids from.
         */
        let serial = 0;
        /**
         * Map of pending requests
         */
        const pending = new Map();
        // Function to send requests
        const call = (name, ...args) => new Promise((accept, reject) => {
            const id = ++serial;
            pending.set(id, {
                accept,
                reject,
                callsite: {
                    // for debugging which call caused the error
                    message: `${name}(${args.map((arg) => String(arg)).join(", ")})`,
                    stack: new Error().stack,
                },
            });
            worker.postMessage({ id, name, args });
        });
        // … receive responses
        worker.addEventListener("message", function ({ data: { id, result, error } }) {
            if (!pending.has(id)) {
                console.debug("Received message with unknown id:", arguments[0]);
                throw new Error(`BergamotTranslator received response from worker to unknown call '${id}'`);
            }
            const { accept, reject, callsite } = pending.get(id);
            pending.delete(id);
            if (error !== undefined)
                reject(Object.assign(new Error(), error, {
                    message: error.message + ` (response to ${callsite.message})`,
                    stack: error.stack
                        ? `${error.stack}\n${callsite.stack}`
                        : callsite.stack,
                }));
            else
                accept(result);
        });
        // … and general errors
        worker.addEventListener("error", this.onerror.bind(this));
        // Await initialisation. This will also nicely error out if the WASM
        // runtime fails to load.
        await call("initialize", this.options);
        /**
         * Little wrapper around the message passing api of Worker to make it
         * easy to await a response to a sent message. This wraps the worker in
         * a Proxy so you can treat it as if it is an instance of the
         * TranslationWorker class that lives inside the worker. All function
         * calls to it are transparently passed through the message passing
         * channel.
         */
        return {
            worker,
            exports: new Proxy({}, {
                get(target, name, receiver) {
                    // Prevent this object from being marked "then-able"
                    if (name !== "then")
                        return (...args) => call(name, ...args);
                },
            }),
        };
    }
    /**
     * Loads the model registry. Uses the registry shipped with this extension,
     * but formatted a bit easier to use, and future-proofed to be swapped out
     * with a TranslateLocally type registry.
     */
    async loadModelRegistry() {
        const response = await fetch(this.registryUrl, {
            headers: { Accept: "application/json" },
            credentials: "omit",
        });
        const registry = await response.json();
        // Add 'from' and 'to' keys for each model.
        return Array.from(Object.entries(registry), ([key, files]) => {
            return {
                from: key.substring(0, 2),
                to: key.substring(2, 4),
                files: files,
            };
        });
    }
    /**
     * Gets or loads translation model data. Caching wrapper around
     * `loadTranslationModel()`.
     */
    getTranslationModel({ from, to }, options) {
        const key = JSON.stringify({ from, to });
        if (!this.buffers.has(key)) {
            const promise = this.loadTranslationModel({ from, to }, options);
            // set the promise so we return the same promise when its still pending
            this.buffers.set(key, promise);
            this.state.set(key, "downloading");
            // But if loading fails, remove the promise again so we can try again later
            promise.catch((err) => {
                this.buffers.delete(key);
                this.state.set(key, "available");
            });
        }
        return this.buffers.get(key);
    }
    /**
     * Downloads a translation model and returns a set of
     * ArrayBuffers. These can then be passed to a TranslationWorker thread
     * to instantiate a TranslationModel inside the WASM vm.
     */
    async loadTranslationModel({ from, to }, options) {
        const key = JSON.stringify({ from, to });
        performance.mark(`loadTranslationModule.${key}`);
        // Find that model in the registry which will tell us about its files
        const entries = (await this.registry).filter((model) => model.from == from && model.to == to);
        if (!entries)
            throw new Error(`No model for '${from}' -> '${to}'`);
        const files = entries[0].files;
        let abort;
        // Promise that resolves (or rejects really) when the abort signal hits
        const escape = new Promise((accept, reject) => {
            if (options?.signal) {
                abort = () => reject(new CancelledError("abort signal"));
                options.signal.addEventListener("abort", abort);
            }
        });
        // Download all files mentioned in the registry entry. Race the promise
        // of all fetch requests, and a promise that rejects on the abort signal
        const buffersEntries = (await Promise.race([
            Promise.all(Object.entries(files).map(async ([part, file]) => {
                // Special case where qualityModel is not part of the model, and this
                // should also catch the `config` case.
                if (file === undefined || file.name === undefined)
                    return [part, null];
                try {
                    return [
                        part,
                        await this.fetch(file.name, file.expectedSha256Hash, options),
                    ];
                }
                catch (cause) {
                    throw new Error(`Could not fetch ${file.name} for ${from}->${to} model. Cause: ${cause}`);
                }
            })),
            escape,
        ]));
        const buffers = Object.fromEntries(buffersEntries);
        // Nothing to abort now, clean up abort promise
        if (options?.signal)
            options.signal.removeEventListener("abort", abort);
        performance.measure("loadTranslationModel", `loadTranslationModule.${key}`);
        let vocabs = [];
        if (buffers.vocab)
            vocabs = [buffers.vocab];
        else if (buffers.trgvocab && buffers.srcvocab)
            vocabs = [buffers.srcvocab, buffers.trgvocab];
        else
            throw new Error(`Could not identify vocab files for ${from}->${to} model among: ${Array.from(Object.keys(files)).join(" ")}`);
        const config = {};
        // For the Ukrainian models we need to override the gemm-precision
        if (files.model.name.endsWith("intgemm8.bin"))
            config["gemm-precision"] = "int8shiftAll";
        // If quality estimation is used, we need to turn off skip-cost. Turning
        // this off causes quite the slowdown.
        if (files.qualityModel)
            config["skip-cost"] = false;
        // Allow the registry to also specify marian configuration parameters
        if (files.config)
            Object.assign(config, files.config);
        this.state.set(key, "available");
        // Translate to generic bergamot-translator format that also supports
        // separate vocabularies for input & output language, and calls 'lex'
        // a more descriptive 'shortlist'.
        return {
            model: buffers.model,
            shortlist: buffers.lex,
            vocabs,
            qualityModel: buffers.qualityModel,
            config,
        };
    }
    /**
     * Helper to download file from the web. Verifies the checksum.
     */
    async fetch(url, checksum, extra) {
        // Rig up a timeout cancel signal for our fetch
        const controller = new AbortController();
        const abort = () => controller.abort();
        const timeout = this.downloadTimeout
            ? setTimeout(abort, this.downloadTimeout)
            : null;
        try {
            // Also maintain the original abort signal
            if (extra?.signal)
                extra.signal.addEventListener("abort", abort);
            const options = {
                credentials: "omit",
                signal: controller.signal,
            };
            if (checksum)
                options["integrity"] = `sha256-${this.hexToBase64(checksum)}`;
            // Disable the integrity check for NodeJS because of
            // https://github.com/nodejs/undici/issues/1594
            if (typeof window === "undefined")
                delete options["integrity"];
            // Start downloading the url, using the hex checksum to ask
            // `fetch()` to verify the download using subresource integrity
            const response = await fetch(url, options);
            // Finish downloading (or crash due to timeout)
            return response.arrayBuffer();
        }
        finally {
            if (timeout)
                clearTimeout(timeout);
            if (extra?.signal)
                extra.signal.removeEventListener("abort", abort);
        }
    }
    /**
     * Converts the hexadecimal hashes from the registry to something we can use with
     * the fetch() method.
     */
    hexToBase64(hexstring) {
        return btoa(hexstring
            .match(/\w{2}/g)
            .map((a) => String.fromCharCode(parseInt(a, 16)))
            .join(""));
    }
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
    getModels({ from, to }) {
        const key = JSON.stringify({ from, to });
        // Note that the `this.models` map stores Promises. This so that
        // multiple calls to `getModels` that ask for the same model will
        // return the same promise, and the actual lookup is only done once.
        // The lookup is async because we need to await `this.registry`
        if (!this.models.has(key))
            this.models.set(key, this.findModels(from, to));
        return this.models.get(key);
    }
    /**
     * Find model (or model pair) to translate from `from` to `to`.
     */
    async findModels(from, to) {
        const registry = await this.registry;
        const direct = [], outbound = [], inbound = [];
        registry.forEach((model) => {
            if (model.from === from && model.to === to)
                direct.push(model);
            else if (model.from === from && model.to === this.pivotLanguage)
                outbound.push(model);
            else if (model.to === to && model.from === this.pivotLanguage)
                inbound.push(model);
        });
        if (direct.length)
            return [direct[0]];
        if (outbound.length && inbound.length)
            return [outbound[0], inbound[0]];
        throw new Error(`No model available to translate from '${from}' to '${to}'`);
    }
    /**
     * Checks whether a model is available or being downloaded.
     */
    async getState({ from, to, }) {
        const key = JSON.stringify({ from, to });
        try {
            const models = await this.findModels(from, to);
            if (!models.length)
                return "unavailable";
            return this.state.get(key) || "downloadable";
        }
        catch (e) {
            return "unavailable";
        }
    }
}
/**
 * Translator balancing between throughput and latency. Can use multiple worker
 * threads.
 */
export class BatchTranslator {
    backing;
    /**
     * List of active workers
     * (and a flag to mark them idle or not)
     */
    workers = [];
    /**
     * Maximum number of workers
     */
    workerLimit;
    /**
     * List of batches we push() to & shift() from using `enqueue`.
     */
    queue = [];
    /**
     * batch serial to help keep track of batches when debugging
     */
    batchSerial = 0;
    /**
     * Number of requests in a batch before it is ready to be translated in
     * a single call. Bigger is better for throughput (better matrix packing)
     * but worse for latency since you'll have to wait for the entire batch
     * to be translated.
     */
    batchSize;
    onerror;
    constructor(options, backing) {
        if (!backing)
            backing = new TranslatorBacking(options);
        this.backing = backing;
        this.workerLimit = Math.max(options?.workers || 0, 1);
        this.batchSize = Math.max(options?.batchSize || 8, 1);
        this.onerror =
            options?.onerror ||
                ((err) => console.error("WASM Translation Worker error:", err));
    }
    /**
     * Destructor that stops and cleans up.
     */
    async delete() {
        // Empty the queue
        this.remove(() => true);
        // Terminate the workers
        this.workers.forEach(({ worker }) => worker.terminate());
    }
    /**
     * Makes sure queued work gets send to a worker. Will delay it till `idle`
     * to make sure the batches have been filled to some degree. Will keep
     * calling itself as long as there is work in the queue, but it does not
     * hurt to call it multiple times. This function always returns immediately.
     */
    notify() {
        setTimeout(async () => {
            // Is there work to be done?
            if (!this.queue.length)
                return;
            // Find an idle worker
            let worker = this.workers.find((worker) => worker.idle);
            // No worker free, but space for more?
            if (!worker && this.workers.length < this.workerLimit) {
                try {
                    // Claim a place in the workers array (but mark it busy so
                    // it doesn't get used by any other `notify()` calls).
                    const placeholder = { idle: false };
                    this.workers.push(placeholder);
                    // adds `worker` and `exports` props
                    Object.assign(placeholder, await this.backing.loadWorker());
                    // At this point we know our new worker will be usable.
                    worker = placeholder;
                }
                catch (e) {
                    this.onerror(new Error(`Could not initialise translation worker: ${e.message}`));
                }
            }
            // If no worker, that's the end of it.
            if (!worker)
                return;
            // Up to this point, this function has not used await, so no
            // chance that another call stole our batch since we did the check
            // at the beginning of this function and JavaScript is only
            // cooperatively parallel.
            const batch = this.queue.shift();
            // Put this worker to work, marking as busy
            worker.idle = false;
            try {
                await this.consumeBatch(batch, worker.exports);
            }
            catch (e) {
                batch.requests.forEach(({ reject }) => reject(e));
            }
            worker.idle = true;
            // Is there more work to be done? Do another idleRequest
            if (this.queue.length)
                this.notify();
        });
    }
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
    translate(request) {
        const { from, to, priority } = request;
        return new Promise(async (resolve, reject) => {
            try {
                // Batching key: only requests with the same key can be batched
                // together. Think same translation model, same options.
                const key = JSON.stringify({ from, to });
                // (Fetching models first because if we would do it between looking
                // for a batch and making a new one, we end up with a race condition.)
                const models = await this.backing.getModels(request);
                // Put the request and its callbacks into a fitting batch
                this.enqueue({ key, models, request, resolve, reject, priority });
                // Tell a worker to pick up the work at some point.
                this.notify();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Prune pending requests by testing each one of them to whether they're
     * still relevant. Used to prune translation requests from tabs that got
     * closed.
     */
    remove(
    /** evaluates to true if request should be removed */
    filter) {
        const queue = this.queue;
        this.queue = [];
        queue.forEach((batch) => {
            batch.requests.forEach(({ request, resolve, reject }) => {
                if (filter(request)) {
                    // Add error.request property to match response.request for
                    // a resolve() callback. Pretty useful if you don't want to
                    // do all kinds of Funcion.bind() dances.
                    reject(Object.assign(new CancelledError("removed by filter"), { request }));
                    return;
                }
                this.enqueue({
                    key: batch.key,
                    priority: batch.priority,
                    models: batch.models,
                    request,
                    resolve,
                    reject,
                });
            });
        });
    }
    /**
     * Internal function used to put a request in a batch that still has space.
     * Also responsible for keeping the batches in order of priority. Called by
     * `translate()` but also used when filtering pending requests.
     */
    enqueue({ key, models, request, resolve, reject, priority, }) {
        if (priority === undefined)
            priority = 0;
        // Find a batch in the queue that we can add to
        // (TODO: can we search backwards? that would speed things up)
        let batch = this.queue.find((batch) => {
            return (batch.key === key &&
                batch.priority === priority &&
                batch.requests.length < this.batchSize);
        });
        // No batch or full batch? Queue up a new one
        if (!batch) {
            batch = { id: ++this.batchSerial, key, priority, models, requests: [] };
            this.queue.push(batch);
            this.queue.sort((a, b) => a.priority - b.priority);
        }
        batch.requests.push({ request, resolve, reject });
    }
    /**
     * Internal method that uses a worker thread to process a batch. You can
     * wait for the batch to be done by awaiting this call. You should only
     * then reuse the worker otherwise you'll just clog up its message queue.
     */
    async consumeBatch(batch, worker) {
        performance.mark("BergamotBatchTranslator.start");
        // Make sure the worker has all necessary models loaded. If not, tell it
        // first to load them.
        await Promise.all(batch.models.map(async ({ from, to }) => {
            if (!(await worker.hasTranslationModel({ from, to }))) {
                const buffers = await this.backing.getTranslationModel({ from, to });
                await worker.loadTranslationModel({ from, to }, buffers);
            }
        }));
        // Call the worker to translate. Only sending the actually necessary
        // parts of the batch to avoid trying to send things that don't survive
        // the message passing API between this thread and the worker thread.
        const responses = await worker.translate({
            models: batch.models.map(({ from, to }) => ({ from, to })),
            texts: batch.requests.map(({ request: { text, html, qualityScores } }) => ({
                text: text.toString(),
                html: !!html,
                qualityScores: !!qualityScores,
            })),
        });
        // Responses are in! Connect them back to their requests and call their
        // callbacks.
        batch.requests.forEach(({ request, resolve, reject }, i) => {
            // TODO: look at response.ok and reject() if it is false
            resolve({
                request, // Include request for easy reference? Will allow you
                // to specify custom properties and use that to link
                // request & response back to each other.
                ...responses[i], // {target: {text: String}}
            });
        });
        performance.measure("BergamotBatchTranslator", "BergamotBatchTranslator.start");
    }
}
/**
 * Translator optimised for interactive use.
 */
export class LatencyOptimisedTranslator {
    backing;
    worker;
    pending;
    constructor(request, options, backing) {
        if (!backing)
            backing = new TranslatorBacking(options);
        this.backing = backing;
        // Exposing the this.loadWorker() returned promise through this.worker
        // so that you can use that to catch any errors that happened during
        // loading.
        this.worker = this.backing
            .loadWorker()
            .then((worker) => ({ ...worker, idle: true }));
        this.worker.then((worker) => {
            this.fetchTranslationModels(worker, request, options);
        });
    }
    /**
     * Destructor that stops and cleans up.
     */
    async delete() {
        // Cancel pending translation
        if (this.pending) {
            this.pending.reject(new CancelledError("translator got deleted"));
            this.pending = null;
        }
        // Terminate the worker (I don't care if this fails)
        try {
            const { worker } = await this.worker;
            worker.terminate();
        }
        finally {
            this.worker = null;
        }
    }
    /**
     * Sets `request` as the next translation to process. If there was already
     * a translation waiting to be processed, their promise is rejected with a
     * SupersededError.
     */
    translate(request, options) {
        if (this.pending)
            this.pending.reject(new SupersededError());
        return new Promise((accept, reject) => {
            const pending = { request, accept, reject, options };
            if (options?.signal) {
                options.signal.addEventListener("abort", (e) => {
                    reject(new CancelledError("abort signal"));
                    if (this.pending === pending)
                        this.pending = null;
                });
            }
            this.pending = pending;
            this.notify();
        });
    }
    notify() {
        setTimeout(async () => {
            if (!this.pending)
                return;
            // Catch errors such as the worker not working
            try {
                // Possibly wait for the worker to finish loading. After it loaded
                // these calls are pretty much instantaneous.
                const worker = await this.worker;
                // Is another notify() call hogging the worker? Then stop.
                if (!worker.idle)
                    return;
                // Claim the pending translation request.
                const { request, accept, reject, options } = this.pending;
                this.pending = null;
                // Mark the worker as occupied
                worker.idle = false;
                try {
                    console.log("huj");
                    const models = await this.fetchTranslationModels(worker, request, options);
                    console.log("chuj");
                    const { text, html, qualityScores } = request;
                    const responses = await worker.exports.translate({
                        models: models.map(({ from, to }) => ({ from, to })),
                        texts: [{ text, html, qualityScores }],
                    });
                    accept({ request, ...responses[0] });
                }
                catch (e) {
                    reject(e);
                }
                worker.idle = true;
                // Is there more work to be done? Do another idleRequest
                if (this.pending)
                    this.notify();
            }
            catch (e) {
                this.backing.onerror(e);
            }
        });
    }
    async fetchTranslationModels(worker, request, options) {
        // Fetch the models needed for translation
        const models = await this.backing.getModels(request);
        options?.onDownloadProgress?.(0, models.length);
        let downloaded = 0;
        // Ensure all required translation models are loaded in the worker
        await Promise.all(models.map(async ({ from, to }) => {
            if (!(await worker.exports.hasTranslationModel({ from, to }))) {
                const buffers = await this.backing.getTranslationModel({ from, to }, options);
                await worker.exports.loadTranslationModel({ from, to }, buffers);
            }
            options?.onDownloadProgress?.(++downloaded, models.length);
        }));
        return models;
    }
}
