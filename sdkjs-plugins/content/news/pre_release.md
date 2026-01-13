# Change Log

## 0.4.0

- Added WorldNewsAPI as a third news provider
- WorldNewsAPI: Advanced filtering

## 0.3.0

- Added support for multiple news providers (GNews and TheNewsAPI)
- Provider selection dropdown with automatic API key clearing on switch
- Plugin renamed from "GNews API" to "News"
- Dynamic advanced settings that adapt to selected provider
- TheNewsAPI: Added domain filtering and search field options
- New providers.js module for centralized configuration

## 0.2.0

- Major refactoring: Split monolithic code into modular architecture
- Created separate modules: storage.js, api.js, ui.js, translations.js
- Enhanced error handling and separation of concerns
- Zero breaking changes - all existing functionality preserved

## 0.1.3

- Added persistent API key storage using localStorage - users no longer need to re-enter API key each time
- Fixed "Show advanced settings" translation - now properly translates in all languages
- Enhanced API key management with automatic loading and pre-filling of stored keys
- Improved plugin initialization to automatically show search interface when API key is stored
- Added comprehensive error handling for localStorage operations with fallback support

## 0.1.2

- Added larger icon sizes for marketplace submission
- Prepared marketplace documentation and assets

## 0.1.1

- Fixed bug where "Back to search" triggered search when checking display options
- Improved status message handling - no longer shows success message when updating display options
- Removed hardcoded article limit for headlines to show actual API results
- Enhanced scrolling support for small plugin heights
- Repositioned "Reconfigure" button to prevent overlap issues

## 0.1.0

- Initial development version
- Keyword search functionality
- Top headlines browsing
- Support for multiple languages and countries
- Advanced search settings (sort by date/relevance)
- Display options for title, description, and content
- Direct article opening in browser
