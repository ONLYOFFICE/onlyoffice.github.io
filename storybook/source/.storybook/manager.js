import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.normal,
    brandImage: './logo.svg',
    brandUrl: 'https://onlyoffice.github.io/',
  },
});
