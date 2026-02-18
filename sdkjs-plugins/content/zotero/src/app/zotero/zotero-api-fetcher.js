// @ts-check

/// <reference path="../types-global.js" />

class RateLimitedFetcher {
    #maxRetries;
    #initialDelay;
    #maxDelay;
    #backoffFactor;
    #retryOn;
    #requestLimit;
    #requestWindow;
    /** @type {number[]} */
    #requestTimestamps;
    #requestCount;
    #lastRequestTime;

    /**
     * @param {{maxRetries?: number, initialDelay?: number, maxDelay?: number, backoffFactor?: number, retryOn?: number[]}} options
     */
    constructor(options = {}) {
        this.#maxRetries = options.maxRetries || 5;
        this.#initialDelay = options.initialDelay || 1000;
        this.#maxDelay = options.maxDelay || 5000;
        this.#backoffFactor = options.backoffFactor || 2;
        this.#retryOn = options.retryOn || [429, 502, 503, 504]; // Error codes for retry

        this.#requestLimit = 10; // first N requests per minute without delay
        this.#requestWindow = 5000; // 5 sec

        this.#requestTimestamps = [];
        this.#requestCount = 0;
        this.#lastRequestTime = 0;
    }

    /**
     * @param {URL} url
     * @param {{ "Zotero-API-Version": string; "Zotero-API-Key": string; }} headers
     * @param {number} attempt
     * @returns {Promise<FetchResponse>}
     */
    async fetchWithRetry(url, headers, attempt) {
        try {
            await this.#checkAndApplyRateLimit();

            const response = await fetch(url, { headers: headers });

            if (response.ok) {
                return response;
            }

            if (
                this.#retryOn.includes(response.status) &&
                attempt < this.#maxRetries
            ) {
                const delay = this.#calculateDelay(attempt, response);
                console.log(
                    `Attempt ${attempt + 1}/${this.#maxRetries} failed with ${
                        response.status
                    }. Retrying in ${delay}ms`
                );

                await this.#delay(delay);
                return this.fetchWithRetry(url, headers, attempt + 1);
            }

            throw new Error(`${response.status} ${response.statusText}`);
        } catch (error) {
            if (attempt >= this.#maxRetries) {
                let message = "";
                if (error instanceof Error) {
                    message = error.message;
                }
                throw new Error(
                    `Request failed after ${
                        this.#maxRetries
                    } attempts: ${message}`
                );
            }

            // For network errors
            if (attempt < this.#maxRetries) {
                const delay = this.#calculateDelay(attempt);
                console.log(
                    `Network error on attempt ${
                        attempt + 1
                    }. Retrying in ${delay}ms`
                );

                await this.#delay(delay);
                return this.fetchWithRetry(url, headers, attempt + 1);
            }

            throw error;
        }
    }

    resetCounter() {
        this.#requestTimestamps = [];
        this.#requestCount = 0;
        this.#lastRequestTime = 0;
    }

    #cleanupOldRequests() {
        const now = Date.now();
        this.#requestTimestamps = this.#requestTimestamps.filter(
            (timestamp) => now - timestamp < this.#requestWindow
        );
    }

    async #checkAndApplyRateLimit() {
        this.#cleanupOldRequests();

        // If we have too many requests
        if (this.#requestTimestamps.length >= this.#requestLimit) {
            const oldestRequest = this.#requestTimestamps[0];
            const timeSinceOldest = Date.now() - oldestRequest;

            // If we are within the rate limit window, wait
            if (timeSinceOldest < this.#requestWindow) {
                let waitTime =
                    500 * this.#requestTimestamps.length - this.#requestLimit;
                if (waitTime < 0) {
                    waitTime = 0;
                    console.warn("Wait time is less than 0");
                }
                console.log(
                    `Rate limit prevention: ${
                        this.#requestTimestamps.length
                    } requests in last ${
                        this.#requestWindow
                    }ms. Waiting ${waitTime}ms...`
                );
                await this.#delay(waitTime);
                this.#cleanupOldRequests(); // Update timestamps
            }
        }

        this.#requestTimestamps.push(Date.now());
        this.#requestCount++;

        const now = Date.now();
        const timeSinceLastRequest = now - this.#lastRequestTime;
        const minDelay = 100;

        if (timeSinceLastRequest < minDelay && this.#lastRequestTime > 0) {
            await this.#delay(minDelay - timeSinceLastRequest);
        }

        this.#lastRequestTime = Date.now();
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

export { RateLimitedFetcher };
