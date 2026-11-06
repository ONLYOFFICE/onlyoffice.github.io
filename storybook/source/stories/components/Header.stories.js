import { Header } from '../../components/Header.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Layout/Header',
  tags: ['autodocs'],
  args: {
    title: 'Title',
  tags: ['autodocs'],
    width: 261,
    variant: 'panel',
    themeMode: 'Auto',
  },
  argTypes: {
    title: { control: 'text', description: 'Visible header title' },
    width: { control: 'number', description: 'Rendered header width' },
    variant: {
      control: 'select',
      options: ['panel', 'window'],
      description: 'Panel header or standalone window header layout',
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
        component: 'Header shell used at the top of plugin panels and standalone windows.',
      },
    },
  },
};

export const Default = {
  name: 'Panel',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Header({ title: args.title, width: args.width, variant: 'panel', theme });
  },
};

export const Window = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Header({ title: args.title, width: args.width, variant: 'window', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone window-style header with different chrome treatment.',
      },
    },
  },
};
