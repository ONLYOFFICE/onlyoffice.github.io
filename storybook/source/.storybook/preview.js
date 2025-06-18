/** @type { import('@storybook/html-vite').Preview } */
const preview = {
/*  globalTypes: {
    theme: {
      description: 'Theme switcher',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', icon: 'sun', title: 'light' },
          { value: 'dark', icon: 'moon', title: 'dark' }
        ],
        dynamicTitle: true,
      },
    },
  },*/

  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (storyFn, context) => {
    const theme = context.globals.theme || 'light';
    
    // Apply the theme as a data attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Set window.Asc.plugin.theme for OnlyOffice plugin compatibility
    if (!window.Asc) {
      window.Asc = {};
    }
    if (!window.Asc.plugin) {
      window.Asc.plugin = {};
    }
    window.Asc.plugin.theme = {
      type: theme
    };

    return storyFn();
  },
];

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.css';
document.head.appendChild(link);

export default preview;
