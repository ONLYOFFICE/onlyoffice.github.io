import { Tooltip } from '../../components/Tooltip.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Feedback/Tooltip',
  tags: ['autodocs'],
  args: {
    text: 'Texts',
    themeMode: 'Auto',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip text',
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
        component:
          'Compact tooltip for short helper text near controls and icon buttons. Use it for hints, not for long explanatory copy.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Tooltip({ text: args.text, theme });
  },
};
