// @ts-check

/// <reference path="../../../shared/types-global.js" />

/**
 * Sends requests to the Zotero web API one at a time. The API limits how
 * fast a client may ask, and a search across several libraries would
 * otherwise fire one request per library at once.
 * A request that can be cancelled is a search's; one that cannot is for an
 * action the user waits on, such as inserting a citation, and is sent
 * before the searches waiting.
 */
class RateLimitedFetcher {
    #maxRetries;
    #initialDelay;
    #maxDelay;
    #backoffFactor;
    #retryOn;
    /** Shortest time between the starts of two requests, ms. */
    #minInterval;
    /**
     * The requests waiting for their turn, those of actions first.
     * @type {Array<{urgent: boolean, start: () => void}>}
     */
    #waiting;
    /** A request is being sent. */
    #busy;
    #lastRequestTime;
    /** Time before which the server asked not to be called (Backoff). */
    #backoffUntil;

    /**
     * @param {{maxRetries?: number, initialDelay?: number, maxDelay?: number, backoffFactor?: number, retryOn?: number[], minInterval?: number}} options
     */
    constructor(options = {}) {
        this.#maxRetries = options.maxRetries || 5;
        this.#initialDelay = options.initialDelay || 1000;
        this.#maxDelay = options.maxDelay || 5000;
        this.#backoffFactor = options.backoffFactor || 2;
        this.#retryOn = options.retryOn || [429, 502, 503, 504]; // Error codes for retry
        this.#minInterval =
            options.minInterval !== undefined ? options.minInterval : 300;

        this.#waiting = [];
        this.#busy = false;
        this.#lastRequestTime = 0;
        this.#backoffUntil = 0;
    }

    /**
     * Sends the request once every request queued before it has finished,
     * or every action's request for one without a signal.
     * An answer the server asks to repeat later (429, 5xx) is retried after
     * the delay it names, still holding the queue; any other answer is
     * returned as it is, for the caller to judge. Network errors are not
     * retried: offline, the search should fail at once.
     * A request whose signal is aborted while it waits is dropped without
     * reaching the server, so a replaced search costs nothing more.
     * @param {URL} url
     * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
     * @param {AbortSignal} [signal]
     * @returns {Promise<FetchResponse>}
     */
    fetchWithRetry(url, headers, signal) {
        return new Promise((resolve, reject) => {
            const urgent = !signal;
            const request = {
                urgent: urgent,
                start: () => {
                    // The next request waits for this one, whatever its
                    // outcome.
                    const done = () => {
                        this.#busy = false;
                        this.#startNext();
                    };
                    this.#send(url, headers, signal)
                        .then(resolve, reject)
                        .then(done, done);
                },
            };
            if (urgent) {
                // After the actions already waiting, before any search.
                let index = 0;
                while (index < this.#waiting.length && this.#waiting[index].urgent) {
                    index++;
                }
                this.#waiting.splice(index, 0, request);
            } else {
                this.#waiting.push(request);
            }
            this.#startNext();
        });
    }

    #startNext() {
        if (this.#busy) {
            return;
        }
        const request = this.#waiting.shift();
        if (!request) {
            return;
        }
        this.#busy = true;
        request.start();
    }

    resetCounter() {
        this.#lastRequestTime = 0;
        this.#backoffUntil = 0;
    }

    /**
     * @param {URL} url
     * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
     * @param {AbortSignal} [signal]
     * @returns {Promise<FetchResponse>}
     */
    async #send(url, headers, signal) {
        for (let attempt = 0; ; attempt++) {
            // Checked before waiting, so a dropped request delays nobody.
            throwIfAborted(signal);
            await this.#waitForTurn();
            throwIfAborted(signal);
            const response = await fetch(url, {
                headers: headers,
                cache: "no-store",
                signal: signal,
            });
            this.#applyBackoff(response);

            if (
                response.ok ||
                !this.#retryOn.includes(response.status) ||
                attempt >= this.#maxRetries
            ) {
                return response;
            }

            const delay = this.#calculateDelay(attempt, response);
            console.log(
                `Zotero answered ${response.status}, attempt ${attempt + 1}/${
                    this.#maxRetries
                }. Retrying in ${delay}ms`
            );
            await this.#delay(delay);
        }
    }

    async #waitForTurn() {
        const now = Date.now();
        const wait = Math.max(
            this.#lastRequestTime + this.#minInterval - now,
            this.#backoffUntil - now,
            0
        );
        if (wait > 0) {
            await this.#delay(wait);
        }
        this.#lastRequestTime = Date.now();
    }

    /**
     * The API sends Backoff when it is under load: no request until then.
     * @param {FetchResponse} response
     */
    #applyBackoff(response) {
        const backoff = parseInt(response.headers.get("Backoff") || "", 10);
        if (backoff > 0) {
            this.#backoffUntil = Math.max(
                this.#backoffUntil,
                Date.now() + backoff * 1000
            );
        }
    }

    /**
     * @param {number} attempt
     * @param {FetchResponse | null} response
     * @returns
     */
    #calculateDelay(attempt, response = null) {
        const retryAfterHeader = response?.headers.get("Retry-After");
        if (retryAfterHeader) {
            const seconds = parseInt(retryAfterHeader);
            if (seconds > 86400) {
                const timestamp = parseInt(retryAfterHeader) * 1000;
                return Math.max(0, timestamp - Date.now());
            }
            return seconds * 1000;
        }

        // Exponential backoff
        const exponentialDelay =
            this.#initialDelay * Math.pow(this.#backoffFactor, attempt);
        const jitter = Math.random() * 1000; // Random jitter
        return Math.min(exponentialDelay + jitter, this.#maxDelay);
    }

    /**
     * @param {number} ms
     * @returns {Promise<void>}
     */
    #delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

/**
 * @param {AbortSignal} [signal]
 */
function throwIfAborted(signal) {
    if (signal && signal.aborted) {
        const error = new Error("The request was cancelled");
        error.name = "AbortError";
        throw error;
    }
}

export { RateLimitedFetcher };
