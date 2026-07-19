import '../styles/preview.css';
import '../styles/dialog-button.css';
import '../styles/plugin-buttons.css';
import '../styles/cards.css';
import '../styles/checkbox.css';
import '../styles/radio.css';
import '../styles/common-controls.css';
import '../styles/textarea.css';

const themeTokens = {
  'Light': {
    pageBg: '#FFFFFF',
    pageSurface: '#F7F7F7',
    pageSurfaceAlt: '#F9F9F9',
    pageBorder: '#DFDFDF',
    pageFg: 'rgba(0, 0, 0, 0.80)',
    pageMuted: 'rgba(0, 0, 0, 0.60)',
  },
  'Light Classic': {
    pageBg: '#FFFFFF',
    pageSurface: '#F1F1F1',
    pageSurfaceAlt: '#D8DADC',
    pageBorder: '#CBCBCB',
    pageFg: '#444444',
    pageMuted: '#A5A5A5',
  },
  'Modern Light': {
    pageBg: '#FFFFFF',
    pageSurface: '#F3F3F3',
    pageSurfaceAlt: '#F9F9F9',
    pageBorder: '#E1E1E1',
    pageFg: '#383838',
    pageMuted: undefined,
  },
  'Modern Dark': {
    pageBg: '#404040',
    pageSurface: '#404040',
    pageSurfaceAlt: '#585858',
    pageBorder: '#686868',
    pageFg: '#E8E8E8',
    pageMuted: 'rgba(232, 232, 232, 0.70)',
  },
  'Dark': {
    pageBg: '#333333',
    pageSurface: '#333333',
    pageSurfaceAlt: '#555555',
    pageBorder: '#666666',
    pageFg: 'rgba(255, 255, 255, 0.80)',
    pageMuted: 'rgba(255, 255, 255, 0.60)',
  },
  'Dark Contrast': {
    pageBg: '#1E1E1E',
    pageSurface: '#1E1E1E',
    pageSurfaceAlt: '#424242',
    pageBorder: '#696969',
    pageFg: '#E8E8E8',
    pageMuted: '#B8B8B8',
  },
};

const THEME_ALIASES = {
  light: 'Light',
  lightclassic: 'Light Classic',
  modernlight: 'Modern Light',
  moderndark: 'Modern Dark',
  dark: 'Dark',
  darkcontrast: 'Dark Contrast',
};

function normalizeThemeName(rawTheme) {
  if (!rawTheme) return 'Light';
  const cleaned = decodeURIComponent(String(rawTheme)).replace(/^!/, '').trim();
  const compact = cleaned.replace(/[\s_-]+/g, '').toLowerCase();
  return THEME_ALIASES[compact] ?? 'Light';
}

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global plugin UI theme',
      defaultValue: 'Light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          'Light',
          'Light Classic',
          'Dark',
          'Dark Contrast',
          'Modern Light',
          'Modern Dark',
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Typography', 'Colors', 'Icons'],
          'Components',
          [
            'Buttons',
            ['Dialog Buttons', 'Panel Buttons', 'Icon Buttons', 'Link Buttons', 'Split Buttons'],
            'Form',
            ['Checkbox', 'Radio', 'Switches', 'Slider', 'Text Field', 'Text Area'],
            'Data Display',
            ['Cards', 'Info Block', 'Tabs'],
            'Layout',
            ['Header', 'Modal Window', 'Scroll'],
            'Feedback',
            ['Loader', 'Tooltip'],
            'Actions',
            ['Context Menu', 'Preview Controls'],
          ],
          '*',
        ],
      },
    },
    docs: {
      toc: true,
      story: { inline: true },
      canvas: { withToolbar: true },
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (storyFn, context) => {
      const theme = normalizeThemeName(context.globals.theme);
      const tokens = themeTokens[theme] || themeTokens['Light'];
      const isDark = theme === 'Dark' || theme === 'Dark Contrast' || theme === 'Modern Dark';
      const isDocs = context.viewMode === 'docs';

      const pageBg = tokens.pageBg;
      const pageFg = tokens.pageFg;
      const pageSurface = tokens.pageSurface;
      const pageSurfaceAlt = tokens.pageSurfaceAlt;
      const pageBorder = tokens.pageBorder;
      const pageMuted = tokens.pageMuted ?? (isDark ? 'rgba(255, 255, 255, 0.60)' : 'rgba(0, 0, 0, 0.60)');
      const pageAccent = isDark ? '#4D9DFF' : '#0B6DFF';

      const root = document.documentElement;
      root.style.setProperty('--page-bg', pageBg);
      root.style.setProperty('--page-fg', pageFg);
      root.style.setProperty('--page-border', pageBorder);
      root.style.setProperty('--page-surface', pageSurface);
      root.style.setProperty('--page-surface-alt', pageSurfaceAlt);
      root.style.setProperty('--page-muted', pageMuted);
      root.style.setProperty('--page-accent', pageAccent);
      root.dataset.pluginTheme = theme.replace(/\s+/g, '-').toLowerCase();

      // OnlyOffice plugin theme compatibility
      if (!window.Asc) window.Asc = {};
      if (!window.Asc.plugin) window.Asc.plugin = {};
      window.Asc.plugin.theme = { type: theme };

      const wrapper = document.createElement('div');
      wrapper.style.cssText = [
        `background-color:${pageBg}`,
        `color:${pageFg}`,
        `padding:${isDocs ? '0' : '20px'}`,
        'min-height:0',
        'width:100%',
        `--page-bg:${pageBg}`,
        `--page-fg:${pageFg}`,
        `--page-border:${pageBorder}`,
        `--page-surface:${pageSurface}`,
        `--page-surface-alt:${pageSurfaceAlt}`,
        `--page-muted:${pageMuted}`,
        `--page-accent:${pageAccent}`,
      ].join(';');

      const storyEl = storyFn();
      if (typeof storyEl === 'string') {
        wrapper.innerHTML = storyEl;
      } else if (storyEl instanceof Node) {
        wrapper.appendChild(storyEl);
      } else {
        wrapper.textContent = String(storyEl ?? '');
      }
      return wrapper;
    },
  ],
};

export default preview;
