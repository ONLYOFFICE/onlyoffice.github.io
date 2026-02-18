/**
 * News API Providers Configuration
 * Defines available news API providers and their configurations
 */

(function (window) {
  "use strict";

  /**
   * Provider Configurations
   */
  var Providers = {
    GNEWS: {
      id: "gnews",
      name: "GNews",
      baseUrl: "https://gnews.io/api/v4",
      website: "https://gnews.io",
      
      // API endpoints
      endpoints: {
        search: "/search",
        topHeadlines: "/top-headlines",
      },

      // Build search URL
      buildSearchUrl: function (apiKey, query, settings) {
        var urlParams = {
          q: query,
          token: apiKey,
          lang: settings.language || "en",
          sortby: settings.sortBy || "publishedAt",
          country: settings.country || "us",
        };
        
        // Add "in" parameter (search in title, description, or content)
        if (settings.searchIn) {
          urlParams.in = settings.searchIn;
        }
        
        return this.buildUrl(this.baseUrl + this.endpoints.search, urlParams);
      },

      // Build top headlines URL
      buildHeadlinesUrl: function (apiKey, params) {
        var urlParams = {
          token: apiKey,
          lang: params.language || "en",
        };
        if (params.category) urlParams.category = params.category;
        if (params.country) urlParams.country = params.country;
        if (params.query) urlParams.q = params.query;

        return this.buildUrl(this.baseUrl + this.endpoints.topHeadlines, urlParams);
      },

      // Build validation URL
      buildValidationUrl: function (apiKey) {
        return this.buildUrl(this.baseUrl + this.endpoints.search, {
          q: "technology",
          token: apiKey,
          max: 1,
          lang: "en",
        });
      },

      // Parse API response
      parseResponse: function (data) {
        if (data.articles && Array.isArray(data.articles)) {
          return {
            success: true,
            articles: data.articles.map(function (article) {
              return {
                title: article.title,
                description: article.description,
                content: article.content,
                url: article.url,
                publishedAt: article.publishedAt,
                source: article.source,
              };
            }),
          };
        }
        return {
          success: false,
          error: data.errors ? data.errors.join(", ") : "No articles found",
          articles: [],
        };
      },

      // Helper to build URL with params
      buildUrl: function (base, params) {
        var url = new URL(base);
        Object.keys(params).forEach(function (key) {
          if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            url.searchParams.append(key, params[key]);
          }
        });
        return url.toString();
      },
    },

    THENEWSAPI: {
      id: "thenewsapi",
      name: "TheNewsAPI",
      baseUrl: "https://api.thenewsapi.com/v1/news",
      website: "https://www.thenewsapi.com",
      
      // API endpoints
      endpoints: {
        search: "/all",
        topHeadlines: "/top",
      },

      // Build search URL
      buildSearchUrl: function (apiKey, query, settings) {
        var urlParams = {
          search: query,
          api_token: apiKey,
          language: settings.language || "en",
          sort: settings.sortBy === "relevance" ? "relevance_score" : "published_at",
        };
        
        // Add domains filter if provided
        if (settings.domains && settings.domains.trim() !== "") {
          urlParams.domains = settings.domains.trim();
        }
        
        // Add search_fields if provided (for searching in specific fields)
        if (settings.search_fields && settings.search_fields.trim() !== "") {
          urlParams.search_fields = settings.search_fields.trim();
        }
        
        // Add exclude_domains if provided
        if (settings.exclude_domains && settings.exclude_domains.trim() !== "") {
          urlParams.exclude_domains = settings.exclude_domains.trim();
        }
        
        return this.buildUrl(this.baseUrl + this.endpoints.search, urlParams);
      },

      // Build top headlines URL
      buildHeadlinesUrl: function (apiKey, params) {
        var urlParams = {
          api_token: apiKey,
          language: params.language || "en",
        };
        
        // Add locale (country) parameter
        if (params.country) {
          urlParams.locale = params.country;
        }
        
        // Add categories filter if provided
        if (params.category && params.category !== "") {
          urlParams.categories = params.category;
        }
        
        // Add search query if provided
        if (params.query && params.query.trim() !== "") {
          urlParams.search = params.query.trim();
        }
        
        // Add domains filter if provided
        if (params.domains && params.domains.trim() !== "") {
          urlParams.domains = params.domains.trim();
        }
        
        // Add exclude_domains if provided
        if (params.exclude_domains && params.exclude_domains.trim() !== "") {
          urlParams.exclude_domains = params.exclude_domains.trim();
        }
        
        return this.buildUrl(this.baseUrl + this.endpoints.topHeadlines, urlParams);
      },

      // Build validation URL
      buildValidationUrl: function (apiKey) {
        return this.buildUrl(this.baseUrl + this.endpoints.search, {
          search: "technology",
          api_token: apiKey,
          limit: 1,
          language: "en",
        });
      },

      // Parse API response
      parseResponse: function (data) {
        if (data.data && Array.isArray(data.data)) {
          return {
            success: true,
            articles: data.data.map(function (article) {
              return {
                title: article.title,
                description: article.description || article.snippet,
                content: article.snippet || article.description,
                url: article.url,
                publishedAt: article.published_at,
                source: {
                  name: article.source || "Unknown",
                },
              };
            }),
          };
        }
        return {
          success: false,
          error: data.error ? data.error.message : "No articles found",
          articles: [],
        };
      },

      // Helper to build URL with params
      buildUrl: function (base, params) {
        var url = new URL(base);
        Object.keys(params).forEach(function (key) {
          if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            url.searchParams.append(key, params[key]);
          }
        });
        return url.toString();
      },
    },

    WORLDNEWSAPI: {
      id: "worldnewsapi",
      name: "WorldNewsAPI",
      baseUrl: "https://api.worldnewsapi.com",
      website: "https://worldnewsapi.com",
      
      // API endpoints
      endpoints: {
        search: "/search-news",
        topHeadlines: "/top-news",
      },

      // Build search URL
      buildSearchUrl: function (apiKey, query, settings) {
        var urlParams = {
          text: query,
          language: settings.language || "en",
          number: 100,
        };
        
        // WorldNewsAPI only supports 'publish-time' or empty for sort
        // 'publish-time' = sort by date, empty/omitted = sort by relevance (default)
        if (settings.sortBy && settings.sortBy === "publish-time") {
          urlParams.sort = "publish-time";
        }
        // If sortBy is 'relevance' or anything else, don't add sort parameter (defaults to relevance)
        
        // Add text-match-indexes (search in title, content, or both)
        if (settings.searchIn) {
          var searchInMap = {
            'title': 'title',
            'description': 'content',
            'content': 'content',
            'title,description': 'title,content',
            'title,content': 'title,content'
          };
          urlParams["text-match-indexes"] = searchInMap[settings.searchIn] || 'title,content';
        }
        
        // Add source-country if provided
        if (settings.country) {
          urlParams["source-country"] = settings.country;
        }
        
        // Add news-sources filter if provided
        if (settings.domains && settings.domains.trim() !== "") {
          urlParams["news-sources"] = settings.domains.trim();
        }
        
        // Add categories filter if provided
        if (settings.categories && settings.categories.trim() !== "") {
          urlParams.categories = settings.categories.trim();
        }
        
        // Add authors filter if provided
        if (settings.authors && settings.authors.trim() !== "") {
          urlParams.authors = settings.authors.trim();
        }
        
        return this.buildUrl(this.baseUrl + this.endpoints.search, urlParams);
      },

      // Build top headlines URL
      buildHeadlinesUrl: function (apiKey, params) {
        var urlParams = {
          language: params.language || "en",
        };
        
        // source-country is required for top-news endpoint
        urlParams["source-country"] = params.country || "us";
        
        // Add date if needed (defaults to today)
        if (params.date) {
          urlParams.date = params.date;
        }
        
        // Add headlines-only parameter if needed
        if (params.headlinesOnly) {
          urlParams["headlines-only"] = true;
        }
        
        return this.buildUrl(this.baseUrl + this.endpoints.topHeadlines, urlParams);
      },

      // Build validation URL
      buildValidationUrl: function (apiKey) {
        return this.buildUrl(this.baseUrl + this.endpoints.search, {
          text: "technology",
          language: "en",
          number: 1,
        });
      },

      // Parse API response
      parseResponse: function (data) {
        // Handle search-news response
        if (data.news && Array.isArray(data.news)) {
          return {
            success: true,
            articles: data.news.map(function (article) {
              return {
                title: article.title,
                description: article.summary || article.text,
                content: article.text,
                url: article.url,
                publishedAt: article.publish_date,
                source: {
                  name: article.source_country || "Unknown",
                },
              };
            }),
          };
        }
        
        // Handle top-news response (clustered news)
        if (data.top_news && Array.isArray(data.top_news)) {
          var allArticles = [];
          data.top_news.forEach(function (cluster) {
            if (cluster.news && Array.isArray(cluster.news)) {
              cluster.news.forEach(function (article) {
                allArticles.push({
                  title: article.title,
                  description: article.summary || article.text,
                  content: article.text,
                  url: article.url,
                  publishedAt: article.publish_date,
                  source: {
                    name: article.source_country || data.country || "Unknown",
                  },
                });
              });
            }
          });
          return {
            success: true,
            articles: allArticles,
          };
        }
        
        return {
          success: false,
          error: data.message || "No articles found",
          articles: [],
        };
      },

      // Helper to build URL with params
      buildUrl: function (base, params) {
        var url = new URL(base);
        Object.keys(params).forEach(function (key) {
          if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
            url.searchParams.append(key, params[key]);
          }
        });
        return url.toString();
      },
    },
  };

  /**
   * Provider Manager
   */
  var ProviderManager = {
    currentProvider: null,

    /**
     * Get all available providers
     */
    getProviders: function () {
      return [Providers.GNEWS, Providers.THENEWSAPI, Providers.WORLDNEWSAPI];
    },

    /**
     * Get provider by ID
     */
    getProvider: function (providerId) {
      return Providers[providerId.toUpperCase()] || null;
    },

    /**
     * Set current provider
     */
    setProvider: function (providerId) {
      this.currentProvider = this.getProvider(providerId);
      return this.currentProvider;
    },

    /**
     * Get current provider
     */
    getCurrentProvider: function () {
      return this.currentProvider || Providers.GNEWS;
    },
  };

  // Export to global scope
  window.NewsProviders = ProviderManager;
})(window);
