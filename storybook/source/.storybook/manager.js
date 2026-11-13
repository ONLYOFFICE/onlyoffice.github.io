import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';
import '../styles/manager.css';

const onlyofficeTheme = create({
  base: 'dark',
  colorPrimary: '#4D9DFF',
  colorSecondary: '#4D9DFF',
  appBg: '#1E1E1E',
  appContentBg: '#252525',
  appBorderColor: 'rgba(255, 255, 255, 0.12)',
  appBorderRadius: 10,
  barBg: '#1E1E1E',
  barTextColor: '#A0A0A0',
  barSelectedColor: '#4D9DFF',
  barHoverColor: '#E0E0E0',
  textColor: '#DEDEDE',
  textInverseColor: '#1E1E1E',
  inputBg: '#333333',
  inputBorder: '#555555',
  inputTextColor: '#DEDEDE',
  brandTitle: 'ONLYOFFICE Plugin UI',
  brandUrl: 'https://www.onlyoffice.com/',
  brandTarget: '_self',
});

addons.setConfig({
  theme: onlyofficeTheme,
  sidebar: {
    showRoots: false,
  },
});
