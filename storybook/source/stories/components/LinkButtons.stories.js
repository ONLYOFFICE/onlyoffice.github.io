import { LinkButton } from '../../components/LinkButton.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Buttons/Link Buttons',
  tags: ['autodocs'],
  args: {
    label: 'Show advanced settings',
    state: 'default',
    interactive: true,
    isHovered: false,
    themeMode: 'Auto',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible link-style action label',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover feedback directly in the canvas',
      table: { defaultValue: { summary: 'true' } },
    },
    isHovered: {
      control: 'boolean',
      description: 'Force hover appearance for visual review',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
    state: { table: { disable: true } },
  },
  parameters: {
    docs: {
      story: { inline: true },
      description: {
        component:
          'Text-only action styled like a link. Useful for secondary inline actions inside settings and informational blocks.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    if (!args.interactive) {
      const state = args.isHovered ? 'hover' : 'default';
      return LinkButton({ label: args.label, state, theme });
    }

    const el = document.createElement('div');
    el.style.display = 'contents';

    const render = (state) => {
      el.innerHTML = LinkButton({ label: args.label, state, theme });
    };

    el.addEventListener('mouseenter', () => render('hover'));
    el.addEventListener('mouseleave', () => render('default'));

    render(args.isHovered ? 'hover' : 'default');
    return el;
  },
};

export const HoveredButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return LinkButton({ label: args.label || 'Show advanced settings', state: 'hover', theme });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive hover demo for the inline link-action style. Move the pointer over the link in the canvas.',
      },
    },
  },
};
