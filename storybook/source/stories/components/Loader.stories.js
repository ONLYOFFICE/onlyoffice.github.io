import { Loader } from '../../components/Loader.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Feedback/Loader',
  tags: ['autodocs'],
  args: {
    size: 'S',
    label: 'Loading...',
    overlay: false,
    themeMode: 'Auto',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M'],
      description: 'Compact or regular loader size',
    },
    label: {
      control: 'text',
      description: 'Visible loading message',
    },
    overlay: {
      control: 'boolean',
      description: 'Use the blocking overlay presentation',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
    },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: 'Loader for inline busy states and blocking overlay states.',
      },
    },
  },
};

export const Default = {
  name: 'S',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Loader({ size: 'S', label: args.label, overlay: false, theme });
  },
};

export const Medium = {
  name: 'M',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Loader({ size: 'M', label: args.label, overlay: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Regular inline loader size.',
      },
    },
  },
};

export const OverlayLoader = {
  name: 'Loader With Background',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Loader({ size: 'M', label: 'Loading...', overlay: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Blocking overlay loader for modal or full-surface waiting states.',
      },
    },
  },
};
