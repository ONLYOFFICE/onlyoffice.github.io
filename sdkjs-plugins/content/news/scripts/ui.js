/**
 * UI Manager for News Plugin
 * Handles all UI state management and DOM manipulation
 */

(function (window) {
  "use strict";

  var UIManager = {
    currentArticles: [],
    currentTab: "search",
    currentProvider: "gnews",

    /**
     * Helper function to get element by ID
     */
    $: function (id) {
      return document.getElementById(id);
    },

    /**
     * Set element state (disabled/enabled and text)
     */
    setElementState: function (id, disabled, text) {
      const el = this.$(id);
      if (el) {
        if (disabled !== undefined) el.disabled = disabled;
        if (text !== undefined) el.textContent = text;
      }
    },

    /**
     * Show status message
     */
    showStatus: function (message, isError) {
      const status = this.$("status");
      if (!status) return;

      status.textContent = message;
      status.className = isError ? "error" : "success";
      
      setTimeout(function () {
        status.textContent = "";
        status.className = "";
      }, 4000);
    },

    /**
     * Show API setup screen
     */
    showApiSetup: function () {
      this.$("api-setup").style.display = "block";
      this.$("search-interface").style.display = "none";
    },

    /**
     * Show search interface
     */
    showSearchInterface: function () {
      this.$("api-setup").style.display = "none";
      this.$("search-interface").style.display = "block";
    },

    /**
     * Update provider information in UI
     */
    updateProviderInfo: function (providerId) {
      if (providerId) {
        this.currentProvider = providerId;
      }
      
      var provider = window.NewsProviders.getCurrentProvider();
      
      // Update API key link
      var apiKeyLink = this.$("provider-website-link");
      if (apiKeyLink && provider) {
        apiKeyLink.href = provider.website;
        apiKeyLink.textContent = provider.website.replace("https://", "").replace("www.", "");
      }
      
      // Update placeholder
      var apiKeyInput = this.$("api-key-setup");
      if (apiKeyInput && provider) {
        apiKeyInput.placeholder = "Enter your " + provider.name + " API key";
      }
      
      // Recreate advanced settings with provider-specific options
      this.createAdvancedSettings();
    },

    /**
     * Create provider selector HTML
     */
    createProviderSelector: function () {
      var providers = window.NewsProviders.getProviders();
      var html = '<div class="form-group"><label for="provider-select" id="provider-label">News Provider:</label><select id="provider-select" onchange="changeProvider()">';
      
      providers.forEach(function (provider) {
        html += '<option value="' + provider.id + '">' + provider.name + '</option>';
      });
      
      html += '</select></div>';
      return html;
    },

    /**
     * Initialize provider selector
     */
    initializeProviderSelector: function (selectedProvider) {
      var providerSelect = this.$("provider-select");
      if (providerSelect && selectedProvider) {
        providerSelect.value = selectedProvider;
        this.currentProvider = selectedProvider;
        
        // Update UI for the selected provider
        window.NewsProviders.setProvider(selectedProvider);
        this.updateProviderInfo(selectedProvider);
      }
    },

    /**
     * Show search form
     */
    showSearchForm: function () {
      const searchForm = document.querySelector(".search-form-container");
      const resultsSection = this.$("results-section");

      if (searchForm) searchForm.style.display = "block";
      if (resultsSection) resultsSection.style.display = "none";
    },

    /**
     * Show search results
     */
    showSearchResults: function () {
      const searchForm = document.querySelector(".search-form-container");
      const resultsSection = this.$("results-section");

      if (searchForm) searchForm.style.display = "none";
      if (resultsSection) resultsSection.style.display = "block";
    },

    /**
     * Switch between tabs
     */
    switchTab: function (tabName) {
      this.currentTab = tabName;

      const searchTab = this.$("search-tab");
      const headlinesTab = this.$("headlines-tab");
      const searchContent = this.$("search-content");
      const headlinesContent = this.$("headlines-content");

      if (tabName === "search") {
        searchTab.classList.add("active");
        headlinesTab.classList.remove("active");
        searchContent.style.display = "block";
        headlinesContent.style.display = "none";
      } else {
        searchTab.classList.remove("active");
        headlinesTab.classList.add("active");
        searchContent.style.display = "none";
        headlinesContent.style.display = "block";
      }

      const advancedBtn = this.$("advanced-settings-btn");
      if (advancedBtn && window.Asc && window.Asc.plugin && window.Asc.plugin.tr) {
        advancedBtn.textContent = window.Asc.plugin.tr("Show advanced settings");
      }

      const searchAdvanced = this.$("search-advanced-settings");
      const headlinesAdvanced = this.$("headlines-advanced-settings");
      if (searchAdvanced) searchAdvanced.style.display = "none";
      if (headlinesAdvanced) headlinesAdvanced.style.display = "none";

      this.showSearchForm();
      this.currentArticles = [];
    },

    /**
     * Toggle advanced settings visibility
     */
    toggleAdvancedSettings: function () {
      const advancedSection = this.$(this.currentTab + "-advanced-settings");
      const advancedBtn = this.$("advanced-settings-btn");

      if (advancedSection && advancedBtn && window.Asc && window.Asc.plugin && window.Asc.plugin.tr) {
        if (advancedSection.style.display === "none") {
          advancedSection.style.display = "block";
          advancedBtn.textContent = window.Asc.plugin.tr("Hide advanced settings");
        } else {
          advancedSection.style.display = "none";
          advancedBtn.textContent = window.Asc.plugin.tr("Show advanced settings");
        }
      }
    },

    /**
     * Get display options from checkboxes
     */
    getDisplayOptions: function () {
      if (this.currentTab === "headlines") {
        return { title: true, description: true, content: false };
      }

      const showTitle = this.$("show-title").checked;
      const showDescription = this.$("show-description").checked;
      const showContent = this.$("show-content").checked;

      if (!showTitle && !showDescription && !showContent) {
        return { title: true, description: true, content: false };
      }

      return {
        title: showTitle,
        description: showDescription,
        content: showContent,
      };
    },

    /**
     * Get advanced settings for a tab
     */
    getAdvancedSettings: function (tabPrefix) {
      const sortElement = this.$(tabPrefix + "-sortby");
      const langElement = this.$(tabPrefix + "-lang");
      const domainsElement = this.$(tabPrefix + "-domains");
      const excludeDomainsElement = this.$(tabPrefix + "-exclude-domains");
      const searchFieldsElement = this.$(tabPrefix + "-search-fields");
      const authorsElement = this.$(tabPrefix + "-authors");
      const categoriesElement = this.$(tabPrefix + "-categories");

      var settings = {
        sortBy: sortElement ? sortElement.value || "publishedAt" : "publishedAt",
        language: langElement ? langElement.value || "en" : "en",
      };
      
      // Add "Search In" settings (for GNews and WorldNewsAPI)
      if (tabPrefix === "search") {
        const showTitle = this.$("show-title");
        const showDescription = this.$("show-description");
        const showContent = this.$("show-content");
        
        if (showTitle && showDescription && showContent) {
          var searchInParts = [];
          if (showTitle.checked) searchInParts.push("title");
          if (showDescription.checked || showContent.checked) searchInParts.push("description");
          
          if (searchInParts.length > 0) {
            settings.searchIn = searchInParts.join(",");
          }
        }
      }
      
      // Add provider-specific settings
      if (domainsElement && domainsElement.value) {
        settings.domains = domainsElement.value;
      }
      
      if (excludeDomainsElement && excludeDomainsElement.value) {
        settings.exclude_domains = excludeDomainsElement.value;
      }
      
      if (searchFieldsElement && searchFieldsElement.value) {
        settings.search_fields = searchFieldsElement.value;
      }
      
      if (authorsElement && authorsElement.value) {
        settings.authors = authorsElement.value;
      }
      
      if (categoriesElement && categoriesElement.value) {
        settings.categories = categoriesElement.value;
      }
      
      return settings;
    },

    /**
     * Get provider-specific advanced settings configuration
     */
    getProviderAdvancedConfig: function (providerId) {
      if (providerId === "gnews") {
        return {
          supportsDomains: false,
          supportsSearchIn: true,
          supportsLocale: false,
          supportsSearchFields: false,
          supportsExcludeDomains: false,
          supportsCategories: false,
          supportsExcludeCategories: false,
          supportsAuthors: false,
          supportsHeadlinesQuery: true, 
          supportsHeadlinesCategory: true, 
          sortOptions: [
            { value: "publishedAt", label: "Publication Date" },
            { value: "relevance", label: "Relevance" }
          ]
        };
      } else if (providerId === "thenewsapi") {
        return {
          supportsDomains: true,
          supportsSearchIn: false,
          supportsLocale: false,
          supportsSearchFields: true,
          supportsExcludeDomains: true,
          supportsCategories: true,
          supportsExcludeCategories: true,
          supportsAuthors: false,
          supportsHeadlinesQuery: true,
          supportsHeadlinesCategory: true,
          sortOptions: [
            { value: "published_at", label: "Publication Date" },
            { value: "relevance_score", label: "Relevance" }
          ]
        };
      } else if (providerId === "worldnewsapi") {
        return {
          supportsDomains: true,
          supportsSearchIn: true,
          supportsLocale: false,
          supportsSearchFields: false,
          supportsExcludeDomains: false,
          supportsCategories: true,
          supportsExcludeCategories: false,
          supportsAuthors: true,
          supportsHeadlinesQuery: false,
          supportsHeadlinesCategory: false,
          sortOptions: [
            { value: "publish-time", label: "Publication Date" },
            { value: "relevance", label: "Relevance" }
          ]
        };
      }
      // Default configuration
      return {
        supportsDomains: false,
        supportsSearchIn: true,
        supportsLocale: false,
        supportsSearchFields: false,
        supportsExcludeDomains: false,
        supportsCategories: false,
        supportsExcludeCategories: false,
        supportsAuthors: false,
        supportsHeadlinesQuery: true,
        supportsHeadlinesCategory: true,
        sortOptions: [
          { value: "publishedAt", label: "Publication Date" },
          { value: "relevance", label: "Relevance" }
        ]
      };
    },

    /**
     * Create advanced settings HTML based on provider
     */
    createAdvancedSettings: function () {
      var config = this.getProviderAdvancedConfig(this.currentProvider);
      var tr = window.Asc && window.Asc.plugin && window.Asc.plugin.tr ? window.Asc.plugin.tr : function(s) { return s; };
      
      // Helper function to build base HTML (sort + language)
      var buildBaseHTML = function() {
        var html = "";
        
        // Sort by dropdown (common to all providers)
        html += '<div class="form-group">';
        html += '<label for="PREFIX-sortby">' + tr("Sort by") + ':</label>';
        html += '<select id="PREFIX-sortby">';
        config.sortOptions.forEach(function(opt) {
          html += '<option value="' + opt.value + '">' + tr(opt.label) + '</option>';
        });
        html += '</select>';
        html += '</div>';
        
        // Language dropdown (common to all providers)
        html += '<div class="form-group">';
        html += '<label for="PREFIX-lang">' + tr("Language") + ':</label>';
        html += '<select id="PREFIX-lang">';
        html += '<option value="en">' + tr("English") + '</option>';
        html += '<option value="es">' + tr("Spanish") + '</option>';
        html += '<option value="fr">' + tr("French") + '</option>';
        html += '<option value="de">' + tr("German") + '</option>';
        html += '<option value="it">' + tr("Italian") + '</option>';
        html += '<option value="pt">' + tr("Portuguese") + '</option>';
        html += '<option value="ja">' + tr("Japanese") + '</option>';
        html += '<option value="zh">' + tr("Chinese") + '</option>';
        html += '<option value="ar">' + tr("Arabic") + '</option>';
        html += '<option value="ru">' + tr("Russian") + '</option>';
        html += '<option value="hi">' + tr("Hindi") + '</option>';
        html += '<option value="ko">' + tr("Korean") + '</option>';
        html += '</select>';
        html += '</div>';
        
        return html;
      };
      
      // Helper function to build provider-specific fields
      var buildProviderFields = function(isHeadlines) {
        var html = "";
        
        // For WorldNewsAPI Top Headlines, skip domains, authors, and categories
        if (isHeadlines && this.currentProvider === "worldnewsapi") {
          // Don't add domains, authors, or categories for WorldNewsAPI headlines
          return html;
        }
        
        // Provider-specific: Domains (TheNewsAPI and WorldNewsAPI search)
        if (config.supportsDomains) {
          html += '<div class="form-group">';
          html += '<label for="PREFIX-domains">' + tr("Domains") + ':</label>';
          html += '<input type="text" id="PREFIX-domains" placeholder="' + tr("e.g., bbc.co.uk, cnn.com") + '" />';
          html += '<div class="help-text">' + tr("Comma-separated list of domains to include") + '</div>';
          html += '</div>';
        }
        
        // Provider-specific: Exclude Domains (TheNewsAPI)
        if (config.supportsExcludeDomains) {
          html += '<div class="form-group">';
          html += '<label for="PREFIX-exclude-domains">' + tr("Exclude Domains") + ':</label>';
          html += '<input type="text" id="PREFIX-exclude-domains" placeholder="' + tr("e.g., example.com") + '" />';
          html += '<div class="help-text">' + tr("Comma-separated list of domains to exclude") + '</div>';
          html += '</div>';
        }
        
        // Provider-specific: Authors (WorldNewsAPI search only)
        if (config.supportsAuthors) {
          html += '<div class="form-group">';
          html += '<label for="PREFIX-authors">' + tr("Authors") + ':</label>';
          html += '<input type="text" id="PREFIX-authors" placeholder="' + tr("e.g., John Doe, Jane Smith") + '" />';
          html += '<div class="help-text">' + tr("Comma-separated list of author names") + '</div>';
          html += '</div>';
        }
        
        // Provider-specific: Categories (WorldNewsAPI search and TheNewsAPI)
        if (config.supportsCategories) {
          html += '<div class="form-group">';
          html += '<label for="PREFIX-categories">' + tr("Categories Filter") + ':</label>';
          html += '<input type="text" id="PREFIX-categories" placeholder="' + tr("e.g., politics, sports") + '" />';
          html += '<div class="help-text">' + tr("Comma-separated list of categories") + '</div>';
          html += '</div>';
        }
        
        return html;
      }.bind(this);
      
      // Build HTML for search tab
      var searchHTML = buildBaseHTML() + buildProviderFields(false);
      
      // Build HTML for headlines tab
      var headlinesHTML = buildBaseHTML() + buildProviderFields(true);
      
      // Provider-specific: Search Fields (TheNewsAPI, search only)
      if (config.supportsSearchFields) {
        var searchFieldsHTML = '<div class="form-group">';
        searchFieldsHTML += '<label for="search-search-fields">' + tr("Search Fields") + ':</label>';
        searchFieldsHTML += '<select id="search-search-fields">';
        searchFieldsHTML += '<option value="title,main_text">' + tr("Title and Content") + '</option>';
        searchFieldsHTML += '<option value="title">' + tr("Title Only") + '</option>';
        searchFieldsHTML += '<option value="description">' + tr("Description Only") + '</option>';
        searchFieldsHTML += '<option value="main_text">' + tr("Content Only") + '</option>';
        searchFieldsHTML += '<option value="title,description,keywords">' + tr("Title, Description & Keywords") + '</option>';
        searchFieldsHTML += '<option value="title,description,keywords,main_text">' + tr("All Fields") + '</option>';
        searchFieldsHTML += '</select>';
        searchFieldsHTML += '<div class="help-text">' + tr("Fields to search within") + '</div>';
        searchFieldsHTML += '</div>';
        
        searchHTML += searchFieldsHTML;
      }
      
      // Apply HTML to search tab
      var searchOptionsEl = this.$('search-advanced-options');
      if (searchOptionsEl) {
        searchOptionsEl.innerHTML = searchHTML.replace(/PREFIX/g, 'search');
      }
      
      // Apply HTML to headlines tab
      var headlinesOptionsEl = this.$('headlines-advanced-options');
      if (headlinesOptionsEl) {
        headlinesOptionsEl.innerHTML = headlinesHTML.replace(/PREFIX/g, 'headlines');
      }
      
      // Update "Search In" visibility for search tab
      this.updateSearchInVisibility(config.supportsSearchIn);
      
      // Update headlines query visibility based on provider
      this.updateHeadlinesQueryVisibility(config.supportsHeadlinesQuery);
      
      // Update headlines category visibility based on provider
      this.updateHeadlinesCategoryVisibility(config.supportsHeadlinesCategory);
    },

    /**
     * Update "Search In" section visibility
     */
    updateSearchInVisibility: function (visible) {
      var searchInSection = this.$('search-in-section');
      if (searchInSection) {
        searchInSection.style.display = visible ? 'block' : 'none';
      }
    },

    /**
     * Update headlines query field visibility based on provider support
     */
    updateHeadlinesQueryVisibility: function (visible) {
      var headlinesQueryGroup = this.$('headlines-query');
      if (headlinesQueryGroup && headlinesQueryGroup.parentElement) {
        // Hide/show the entire form-group containing the query field
        headlinesQueryGroup.parentElement.style.display = visible ? 'block' : 'none';
      }
    },

    /**
     * Update headlines category field visibility based on provider support
     */
    updateHeadlinesCategoryVisibility: function (visible) {
      var headlinesCategoryGroup = this.$('headlines-category');
      if (headlinesCategoryGroup && headlinesCategoryGroup.parentElement) {
        // Hide/show the entire form-group containing the category field
        headlinesCategoryGroup.parentElement.style.display = visible ? 'block' : 'none';
      }
    },

    /**
     * Initialize display options checkboxes
     */
    initializeDisplayOptions: function () {
      const checkboxes = ["show-title", "show-description", "show-content"];
      var self = this;
      checkboxes.forEach(function (id, index) {
        const el = self.$(id);
        if (el) el.checked = index < 2;
      });
    },

    /**
     * Display search results
     */
    displaySearchResults: function (articles, showStatusMessage) {
      this.currentArticles = articles;
      const resultsList = this.$("articles-list");
      
      if (!resultsList) return;

      if (articles.length === 0) {
        // Clear the results header when no articles found
        const resultsHeader = document.querySelector(".results-header");
        if (resultsHeader) {
          resultsHeader.textContent = "";
        }
        
        resultsList.innerHTML =
          '<div class="no-results">' +
          (window.Asc.plugin.tr
            ? window.Asc.plugin.tr("No articles found")
            : "No articles found. Try a different search query.") +
          "</div>";
        this.showSearchResults();
        if (showStatusMessage) {
          this.showStatus("No articles found", true);
        }
        return;
      }

      const displayOptions = this.getDisplayOptions();
      this.updateResultsHeader(articles.length, displayOptions);

      let html = "";
      articles.forEach(function (article, index) {
        html += '<div class="article-item">';
        html += '<div class="article-content">';
        html += '<h3 class="article-title">' + UIManager.escapeHtml(article.title) + "</h3>";
        html +=
          '<p class="article-source">' +
          UIManager.escapeHtml(article.source.name) +
          " • " +
          new Date(article.publishedAt).toLocaleDateString() +
          "</p>";
        if (article.description) {
          html +=
            '<p class="article-description">' +
            UIManager.escapeHtml(article.description) +
            "</p>";
        }
        html += "</div>";
        html +=
          '<button class="btn-open" onclick="insertSingleArticle(' +
          index +
          ')">' +
          (window.Asc.plugin.tr ? window.Asc.plugin.tr("Open") : "Open") +
          "</button>";
        html += "</div>";
      });

      resultsList.innerHTML = html;
      this.showSearchResults();

      if (showStatusMessage) {
        this.showStatus("Found " + articles.length + " articles", false);
      }
    },

    /**
     * Update results header
     */
    updateResultsHeader: function (count, displayOptions) {
      const resultsHeader = document.querySelector(".results-header");
      if (!resultsHeader) return;

      if (count === 0) {
        resultsHeader.textContent = "";
        return;
      }

      const searchFields = [];
      if (displayOptions.title) {
        searchFields.push(
          window.Asc.plugin.tr ? window.Asc.plugin.tr("title") : "title"
        );
      }
      if (displayOptions.description) {
        searchFields.push(
          window.Asc.plugin.tr
            ? window.Asc.plugin.tr("description")
            : "description"
        );
      }
      if (displayOptions.content) {
        searchFields.push(
          window.Asc.plugin.tr ? window.Asc.plugin.tr("content") : "content"
        );
      }

      const allFieldsText = window.Asc.plugin.tr
        ? window.Asc.plugin.tr("all fields")
        : "all fields";
      const searchFieldsText =
        searchFields.length === 0 ? allFieldsText : searchFields.join(", ");
      const successText = window.Asc.plugin.tr
        ? window.Asc.plugin.tr("Success! {0} results were found by {1}")
        : "Success! {0} results were found by {1}";
      const headerText = successText
        .replace("{0}", count)
        .replace("{1}", searchFieldsText);

      resultsHeader.textContent = headerText;
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml: function (text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    },

    /**
     * Open article link in browser
     */
    openArticleLink: function (article) {
      if (!article.url) {
        this.showStatus("Article URL not available", true);
        return;
      }

      try {
        window.open(article.url, "_blank");
      } catch (error) {
        console.error("Failed to open article:", error);
        this.showStatus("Failed to open article", true);
      }
    },

    /**
     * Clear results and go back to search
     */
    goBackToSearch: function () {
      this.showSearchForm();
      this.currentArticles = [];
      const status = this.$("status");
      if (status) {
        status.textContent = "";
        status.className = "";
      }
    },
  };

  // Export to global scope
  window.GNewsUI = UIManager;
})(window);
