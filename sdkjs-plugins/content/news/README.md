# News Plugin

## Overview

Search through millions of articles from multiple news sources using various news API providers. This plugin allows you to search for articles by keywords and browse top headlines by category and country, then open them directly in your browser.

The plugin supports multiple news API providers. Choose your preferred provider and get a free API key to start using the plugin.

## Features

- **Multiple Providers**: Support for GNews and TheNewsAPI with easy provider switching
- **Keyword Search**: Search for articles using specific keywords or phrases
- **Top Headlines**: Browse top headlines by category (Business, Technology, Sports, etc.)
- **Provider-Specific Options**: Dynamic UI that adapts to each provider's capabilities
- **Language Support**: Support for multiple languages (English, Spanish, French, German, etc.)
- **Advanced Settings**: Sort by publication date or relevance, filter by domains (TheNewsAPI)
- **Display Options**: Choose what to display (available for GNews)
- **Direct Access**: Click any article to open it in a new browser tab

## Supported Providers

### GNews ([gnews.io](https://gnews.io))
- 100 requests/day (free tier)
- Search in title, description, or content
- 60,000+ news sources

### TheNewsAPI ([thenewsapi.com](https://www.thenewsapi.com))
- 150 requests/day (free tier)
- Filter by specific domains
- Locale-based filtering

## How to use

1. **Choose Provider**: Select your preferred news provider (GNews or TheNewsAPI)
2. **Get API Key**: Register at your chosen provider's website and get your free API key
3. **Install Plugin**: Open the plugin from the Plugins tab in ONLYOFFICE
4. **Setup**: Enter your API key when prompted
5. **Search**: Use the Search tab to find articles by keywords
6. **Headlines**: Use the Top Headlines tab to browse news by category
7. **Open Articles**: Click on any article to open it in your browser

### Search Tab

1. Enter keywords in the search field
2. **(GNews only)** Choose what to display using the checkboxes (Title, Description, Content)
3. Optionally configure advanced settings (language, sort order, domains for TheNewsAPI)
4. Click "Find" to search

### Top Headlines Tab

1. Optionally enter keywords to filter headlines
2. Select a category (General, Business, Technology, etc.)
3. Select a country
4. Click "Find" to get headlines

## Requirements

- ONLYOFFICE Document Editor
- Internet connection
- Free API key from your chosen provider ([gnews.io](https://gnews.io) or [thenewsapi.com](https://www.thenewsapi.com))

## Known Issues

- Requires internet connection to fetch articles
- API rate limits apply based on your provider's plan
- Some regions may have limited access to certain news sources
- Each provider requires its own API key

## Support

For issues and feature requests, please contact the plugin developer.

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture and code organization
- [PROVIDER_FEATURES.md](PROVIDER_FEATURES.md) - Detailed comparison of provider features and capabilities
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes

## API Information

This plugin supports multiple news API providers:
- [GNews API](https://gnews.io) - 100 requests/day free tier
- [TheNewsAPI](https://www.thenewsapi.com) - 150 requests/day free tier

Please refer to each provider's documentation for API limits and terms of service.
