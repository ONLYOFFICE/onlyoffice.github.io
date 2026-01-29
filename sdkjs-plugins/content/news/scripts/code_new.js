/**
 * News Plugin - Main Entry Point
 * Coordinates between API, UI, Storage, and Translation modules
 */

(function (window, undefined) {
  "use strict";

  // Plugin state
  let savedApiKey = "";
  let savedProvider = "gnews";

  /**
   * Initialize the plugin
   */
  window.Asc.plugin.init = function () {
    try {
      // Load saved provider
      savedProvider = window.GNewsStorage.loadProvider();
      window.GNewsAPI.setProvider(savedProvider);
      window.NewsProviders.setProvider(savedProvider);
      console.log("Loaded provider:", savedProvider);

      // Load saved API key
      savedApiKey = window.GNewsStorage.loadApiKey();
      if (savedApiKey) {
        window.GNewsAPI.setApiKey(savedApiKey);
        console.log("Loaded API key from storage");
      }

      // Initialize UI after a short delay
      setTimeout(function () {
        window.GNewsUI.initializeDisplayOptions();
        window.GNewsUI.createAdvancedSettings();
        window.GNewsUI.initializeProviderSelector(savedProvider);
        window.GNewsUI.updateProviderInfo();

        if (savedApiKey) {
          window.GNewsUI.showSearchInterface();
          setTimeout(function () {
            const searchInput = window.GNewsUI.$("search-query");
            if (searchInput) searchInput.focus();
          }, 100);
        } else {
          window.GNewsUI.showApiSetup();
        }

        setupEventListeners();
        window.GNewsTranslations.applyTranslations();
      }, 50);
    } catch (error) {
      console.error("Init error:", error);
    }
  };

  /**
   * Handle theme changes
   */
  window.Asc.plugin.onThemeChanged = function (theme) {
    // Set the data-theme attribute on the body
    document.body.setAttribute("data-theme", theme.type);
    console.log("Applied theme:", theme.type);
  };

  /**
   * Handle translation changes
   */
  window.Asc.plugin.onTranslate = function () {
    window.GNewsTranslations.applyTranslations();
  };

  /**
   * Setup event listeners for Enter key support
   */
  function setupEventListeners() {
    const apiKeyInput = window.GNewsUI.$("api-key-setup");
    const queryInput = window.GNewsUI.$("search-query");
    const headlinesQueryInput = window.GNewsUI.$("headlines-query");

    if (apiKeyInput) {
      apiKeyInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          window.saveApiKey();
        }
      });
    }

    if (queryInput) {
      queryInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          window.searchNews();
        }
      });
    }

    if (headlinesQueryInput) {
      headlinesQueryInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          window.getTopHeadlines();
        }
      });
    }
  }

  /**
   * Save and validate API key
   */
  window.saveApiKey = function () {
    const apiKeyInput = window.GNewsUI.$("api-key-setup");
    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {
      window.GNewsUI.showStatus("Please enter an API key", true);
      return;
    }

    if (apiKey.length < 10) {
      window.GNewsUI.showStatus("API key seems too short", true);
      return;
    }

    window.GNewsUI.setElementState("save-api-btn", true, "Validating...");
    window.GNewsUI.showStatus("Validating API token...", false);

    window.GNewsAPI.validateApiKey(apiKey, function (isValid, message) {
      window.GNewsUI.setElementState("save-api-btn", false, "Login");

      if (isValid) {
        savedApiKey = apiKey;
        window.GNewsAPI.setApiKey(apiKey);
        
        if (window.GNewsStorage.saveApiKey(apiKey)) {
          window.GNewsUI.showStatus("API key saved successfully!", false);
        } else {
          window.GNewsUI.showStatus(
            "API key validated but couldn't save to storage",
            true
          );
        }

        setTimeout(function () {
          window.GNewsUI.showSearchInterface();
          const searchInput = window.GNewsUI.$("search-query");
          if (searchInput) searchInput.focus();
        }, 1000);
      } else {
        window.GNewsUI.showStatus(message || "Invalid API key", true);
      }
    });
  };

  /**
   * Change/reconfigure API key
   */
  window.changeApiKey = function () {
    savedApiKey = "";
    window.GNewsAPI.setApiKey("");

    if (window.GNewsStorage.removeApiKey()) {
      window.GNewsUI.showStatus("API key removed", false);
    } else {
      window.GNewsUI.showStatus("Couldn't remove API key from storage", true);
    }

    window.GNewsUI.showApiSetup();
    const apiKeyInput = window.GNewsUI.$("api-key-setup");
    if (apiKeyInput) {
      apiKeyInput.value = "";
      apiKeyInput.focus();
    }

    const status = window.GNewsUI.$("status");
    if (status) {
      setTimeout(function () {
        status.textContent = "";
        status.className = "";
      }, 2000);
    }
  };

  /**
   * Change provider
   */
  window.changeProvider = function () {
    const providerSelect = window.GNewsUI.$("provider-select");
    if (!providerSelect) return;

    const newProvider = providerSelect.value;
    savedProvider = newProvider;
    
    window.GNewsAPI.setProvider(newProvider);
    window.NewsProviders.setProvider(newProvider);
    window.GNewsStorage.saveProvider(newProvider);
    window.GNewsUI.currentProvider = newProvider;
    window.GNewsUI.updateProviderInfo();

    
    // Clear API key since different providers need different keys
    if (savedApiKey) {
      window.GNewsUI.showStatus(
        "Provider changed. Please enter your API key for " + 
        window.NewsProviders.getCurrentProvider().name,
        false
      );
      savedApiKey = "";
      window.GNewsAPI.setApiKey("");
      window.GNewsStorage.removeApiKey();
      
      const apiKeyInput = window.GNewsUI.$("api-key-setup");
      if (apiKeyInput) {
        apiKeyInput.value = "";
      }
    }
  };

  /**
   * Switch between tabs
   */
  window.switchTab = function (tabName) {
    window.GNewsUI.switchTab(tabName);
  };

  /**
   * Toggle advanced settings
   */
  window.toggleAdvancedSettings = function () {
    window.GNewsUI.toggleAdvancedSettings();
  };

  window.advancedSettings = function () {
    window.toggleAdvancedSettings();
  };

  /**
   * Perform news search
   */
  window.searchNews = function () {
    const queryInput = window.GNewsUI.$("search-query");
    if (!queryInput) {
      window.GNewsUI.showStatus("Search input not found", true);
      return;
    }

    const query = queryInput.value.trim();
    if (!query) {
      window.GNewsUI.showStatus("Please enter a search query", true);
      return;
    }

    if (!savedApiKey) {
      window.GNewsUI.showStatus("Please configure your API key first", true);
      return;
    }

    window.GNewsUI.setElementState("search-btn", true, "Searching...");
    window.GNewsUI.showStatus("Searching...", false);

    const settings = window.GNewsUI.getAdvancedSettings("search");
    
    window.GNewsAPI.search(query, settings, function (result) {
      window.GNewsUI.setElementState("search-btn", false, "Find");

      if (result.success) {
        window.GNewsUI.displaySearchResults(result.articles, true);
      } else {
        window.GNewsUI.showStatus(result.error || "Search failed", true);
      }
    });
  };

  /**
   * Get top headlines
   */
  window.getTopHeadlines = function () {
    if (!savedApiKey) {
      window.GNewsUI.showStatus("Please configure your API key first", true);
      return;
    }

    const query = window.GNewsUI.$("headlines-query").value;
    const category = window.GNewsUI.$("headlines-category").value;
    const country = window.GNewsUI.$("headlines-country").value;
    const settings = window.GNewsUI.getAdvancedSettings("headlines");

    window.GNewsUI.setElementState("headlines-btn", true, "Loading...");
    window.GNewsUI.showStatus("Loading headlines...", false);

    const params = {
      category: category,
      country: country,
      language: settings.language,
      query: query,
      domains: settings.domains,
      exclude_domains: settings.exclude_domains,
    };

    window.GNewsAPI.getTopHeadlines(params, function (result) {
      window.GNewsUI.setElementState("headlines-btn", false, "Find");

      if (result.success) {
        window.GNewsUI.displaySearchResults(result.articles, true);
      } else {
        window.GNewsUI.showStatus(result.error || "Failed to load headlines", true);
      }
    });
  };

  /**
   * Insert single article (open in browser)
   */
  window.insertSingleArticle = function (index) {
    if (index < 0 || index >= window.GNewsUI.currentArticles.length) {
      window.GNewsUI.showStatus("Invalid article index", true);
      return;
    }

    const article = window.GNewsUI.currentArticles[index];
    window.GNewsUI.openArticleLink(article);
  };

  /**
   * Go back to search form
   */
  window.goBackToSearch = function () {
    window.GNewsUI.goBackToSearch();
  };

  /**
   * Clear results
   */
  window.clearResults = function () {
    window.GNewsUI.goBackToSearch();
  };

  /**
   * Update article display when checkboxes change
   */
  window.updateArticleDisplay = function () {
    if (window.GNewsUI.currentArticles.length > 0) {
      window.GNewsUI.displaySearchResults(window.GNewsUI.currentArticles, false);
    }
  };

  /**
   * Handle plugin button clicks
   */
  window.Asc.plugin.button = function (id) {
    if (id === -1 || id === 0) {
      this.executeCommand("close", "");
    }
  };

  /**
   * Handle external mouse events
   */
  window.Asc.plugin.onExternalMouseUp = function () {
    return false;
  };

  /**
   * Handle beforeunload event
   */
  window.addEventListener("beforeunload", function (e) {
    window.GNewsUI.currentArticles = [];
    window.GNewsUI.currentTab = "search";
  });

  /**
   * Handle plugin commands
   */
  window.Asc.plugin.executeCommand = function (command, data) {
    if (command === "close") {
      this.executeCommand("close", "");
    }
  };

  /**
   * Handle method return values
   */
  window.Asc.plugin.onMethodReturn = function (returnValue) {};
})(window, undefined);
