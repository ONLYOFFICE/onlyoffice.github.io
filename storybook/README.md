# ONLYOFFICE Storybook

A comprehensive component library documentation for ONLYOFFICE plugin UI components, built with Storybook.

## Overview

This Storybook project showcases and documents the UI components used in ONLYOFFICE plugins. It provides an interactive environment for developers to explore, test, and understand the available components and their various states.

## Components

The following components are documented in this Storybook:

- **Button** - Various styled buttons including default, primary, secondary, and edit buttons
- **Checkbox** - Checkbox controls with different states
- **ComboBox** - Dropdown selection components
- **Input** - Text inputs and textarea controls
- **Label** - Text labels for form elements
- **Loader** - Loading indicators and spinners
- **Separator** - Visual dividers and separators

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ONLYOFFICE/onlyoffice.github.io.git
cd onlyoffice.github.io/storybook
```

2. Navigate to the source directory:
```bash
cd source
```

3. Install dependencies:
```bash
npm install
```

### Development

To start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can view and interact with all components.

### Building

To build the static Storybook for production:

```bash
npm run build-storybook
```

This will generate a static build in the `../static` directory, which can be deployed to any web server.

## Project Structure

```
storybook/
├── source/
│   ├── package.json          # Project dependencies and scripts
│   ├── images/              # Image assets
│   │   └── logo.svg
│   └── stories/             # Component stories
│       ├── Button.stories.js
│       ├── Checkbox.stories.js
│       ├── ComboBox.stories.js
│       ├── Input.stories.js
│       ├── Label.stories.js
│       ├── Loader.stories.js
│       └── Separator.stories.js
└── static/                  # Built Storybook files
    ├── index.html
    ├── assets/
    └── sb-*/               # Storybook runtime files
```

## Writing Stories

Stories are written in JavaScript and follow the Component Story Format (CSF). Each story file exports:

- A default export with component metadata
- Named exports for each story variant

Example story structure:

```javascript
export default {
  title: 'Components/ComponentName',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Description of the component.'
      }
    }
  }
};

export const Default = () => `
  <div class="component-class">Component HTML</div>
`;
Default.storyName = 'Default State';
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-component`)
3. Add your component story in the `source/stories/` directory
4. Test your changes locally with `npm run storybook`
5. Commit your changes (`git commit -am 'Add new component story'`)
6. Push to the branch (`git push origin feature/new-component`)
7. Create a Pull Request

### Adding New Components

To add a new component story:

1. Create a new `.stories.js` file in the `source/stories/` directory
2. Follow the existing naming convention: `ComponentName.stories.js`
3. Include comprehensive examples showing different states and variations
4. Add appropriate documentation and descriptions
5. Test the component in the Storybook interface

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Links

- [ONLYOFFICE Website](https://www.onlyoffice.com/)
- [ONLYOFFICE GitHub](https://github.com/ONLYOFFICE)
- [Storybook Documentation](https://storybook.js.org/docs)

## Support

For questions and support regarding ONLYOFFICE plugins and components, please visit:
- [ONLYOFFICE Forum](https://forum.onlyoffice.com/)
- [GitHub Issues](https://github.com/ONLYOFFICE/onlyoffice.github.io/issues)
