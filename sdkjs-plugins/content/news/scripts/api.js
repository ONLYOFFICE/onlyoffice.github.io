/**
 * API Manager for News Plugin
 * Handles all interactions with news APIs
 */

(function (window) {
  "use strict";

  /**
   * API Manager
   */
  var APIManager = {
    apiKey: "",
    provider: null,

    /**
     * Set the API key for subsequent requests
     * @param {string} key - The API key
     */
    setApiKey: function (key) {
      this.apiKey = key;
    },

    /**
     * Set the provider for subsequent requests
     * @param {string} providerId - The provider ID
     */
    setProvider: function (providerId) {
      this.provider = window.NewsProviders.setProvider(providerId);
    },

    /**
     * Get current provider
     */
    getProvider: function () {
      return this.provider || window.NewsProviders.getCurrentProvider();
    },

    /**
     * Build URL with query parameters
     * @param {string} base - Base URL
     * @param {object} params - Query parameters
     * @returns {string} - Complete URL with parameters
     */
    buildUrl: function (base, params) {
      const url = new URL(base);
      Object.keys(params).forEach(function (key) {
        if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
          url.searchParams.append(key, params[key]);
        }
      });
      return url.toString();
    },

    /**
     * Perform a generic API call
     * @param {string} url - The API endpoint URL
     * @param {function} callback - Callback function(result)
     */
    performAPICall: function (url, callback) {
      var provider = this.getProvider();
      
      // Prepare fetch options
      var fetchOptions = {
        method: 'GET',
      };
      
      // WorldNewsAPI uses header-based authentication
      if (provider.id === 'worldnewsapi') {
        fetchOptions.headers = {
          'x-api-key': this.apiKey,
        };
      }
      
      fetch(url, fetchOptions)
        .then(function (response) {
          if (response.ok) return response.json();
          
          // Handle specific HTTP errors
          throw new Error(
            response.status === 401
              ? "Invalid API token"
              : response.status === 429
              ? "API rate limit exceeded"
              : response.status === 400
              ? "Bad request - check your parameters"
              : "HTTP " + response.status
          );
        })
        .then(function (data) {
          // Use provider-specific response parser
          var result = provider.parseResponse(data);
          callback(result);
        })
        .catch(function (error) {
          console.error("API error:", error);
          
          const message = error.message.includes("Invalid API token")
            ? "Invalid API token. Please check your token and try again."
            : error.message.includes("rate limit")
            ? "API rate limit exceeded. Please try again later."
            : error.message.includes("CORS")
            ? "Network error: CORS issue"
            : "API failed: " + error.message;

          callback({ success: false, error: message, articles: [] });
        });
    },

    /**
     * Validate an API key
     * @param {string} apiKey - The API key to validate
     * @param {function} callback - Callback function(isValid, message)
     */
    validateApiKey: function (apiKey, callback) {
      try {
        var provider = this.getProvider();
        const testUrl = provider.buildValidationUrl(apiKey);

        // Prepare fetch options
        var fetchOptions = {
          method: 'GET',
        };
        
        // WorldNewsAPI uses header-based authentication
        if (provider.id === 'worldnewsapi') {
          fetchOptions.headers = {
            'x-api-key': apiKey,
          };
        }

        fetch(testUrl, fetchOptions)
          .then(function (response) {
            if (response.ok) return response.json();
            throw new Error(
              response.status === 401
                ? "Invalid API token"
                : "API validation failed"
            );
          })
          .then(function (data) {
            callback(true, "API key is valid");
          })
          .catch(function (error) {
            console.error("Validation error:", error);
            callback(false, error.message);
          });
      } catch (error) {
        console.error("Validation error:", error);
        callback(false, "Error validating API key: " + error.message);
      }
    },

    /**
     * Search for articles
     * @param {string} query - Search query
     * @param {object} settings - Additional settings (language, sortBy, etc.)
     * @param {function} callback - Callback function(result)
     */
    search: function (query, settings, callback) {
      try {
        var provider = this.getProvider();
        const searchUrl = provider.buildSearchUrl(this.apiKey, query, settings);

        this.performAPICall(searchUrl, callback);
      } catch (error) {
        console.error("Search error:", error);
        callback({ success: false, error: error.message, articles: [] });
      }
    },

    /**
     * Get top headlines
     * @param {object} params - Parameters (category, country, language, query)
     * @param {function} callback - Callback function(result)
     */
    getTopHeadlines: function (params, callback) {
      try {
        var provider = this.getProvider();
        const headlinesUrl = provider.buildHeadlinesUrl(this.apiKey, params);

        this.performAPICall(headlinesUrl, callback);
      } catch (error) {
        console.error("Headlines error:", error);
        callback({ success: false, error: error.message, articles: [] });
      }
    },
  };

  // Export to global scope
  window.GNewsAPI = APIManager;
})(window);
