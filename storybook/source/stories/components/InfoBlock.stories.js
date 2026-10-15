import { InfoBlock } from '../../components/InfoBlock.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Data Display/Info Block',
  tags: ['autodocs'],
  args: {
    title: 'Title',
    description: 'Description',
    showTitle: true,
    showDescription: true,
    iconMode: 'left',
    themeMode: 'Auto',
  },
  argTypes: {
    title: { control: 'text', description: 'Main heading text' },
    description: { control: 'text', description: 'Supporting descriptive copy' },
    showTitle: { control: 'boolean', description: 'Show the title row' },
    showDescription: { control: 'boolean', description: 'Show the description row' },
    iconMode: {
      control: 'select',
      options: ['none', 'left', 'right', 'both'],
      description: 'Icon placement around the title row',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Compact informational block for notices, inline explanations, and dismissible helper content.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, theme });
  },
};

export const WithoutIcon = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, iconMode: 'none', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Plain informational block without icons.',
      },
    },
  },
};

export const IconRight = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, iconMode: 'right', showTitle: true, showDescription: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant with a dismiss or action icon on the right.',
      },
    },
  },
};

export const IconLeft = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, iconMode: 'left', showTitle: true, showDescription: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant with an informational icon on the left.',
      },
    },
  },
};

export const IconBoth = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, iconMode: 'both', showDescription: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Title row with icons on both sides.',
      },
    },
  },
};

export const TitleOnly = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, showTitle: true, showDescription: false, iconMode: 'none', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Title-only informational block.',
      },
    },
  },
};

export const DescriptionOnly = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({ ...args, showTitle: false, showDescription: true, iconMode: 'none', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Description-only helper text block.',
      },
    },
  },
};
