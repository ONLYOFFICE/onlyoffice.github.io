import { SplitButton } from '../../components/SplitButton.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Buttons/Split Buttons/Tabs',
  tags: ['autodocs'],
  args: {
    label: 'Label',
    state: 'default',
    type: 'tabs',
    interactive: true,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Visible tab-style label' },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and press feedback directly in the canvas',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
    },
    type: { table: { disable: true } },
    state: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: 'Split-button tab style used for compact segmented or tab-like actions.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    const el = document.createElement('div');
    el.style.display = 'contents';

    let hovered = false;
    let pressed = false;

    const update = () => {
      const state = pressed ? 'pressed' : hovered ? 'hover' : 'default';
      el.innerHTML = SplitButton({ label: args.label, type: 'tabs', state, theme });
    };

    el.addEventListener('mouseenter', () => { hovered = true; update(); });
    el.addEventListener('mouseleave', () => { hovered = false; pressed = false; update(); });
    el.addEventListener('mousedown', () => { pressed = true; update(); });
    el.addEventListener('mouseup', () => { pressed = false; update(); });

    update();
    return el;
  },
};

export const Hovered = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    const el = document.createElement('div');
    el.style.display = 'contents';

    let hovered = false;

    const update = () => {
      el.innerHTML = SplitButton({ label: args.label, type: 'tabs', state: hovered ? 'hover' : 'default', theme });
    };

    el.addEventListener('mouseenter', () => { hovered = true; update(); });
    el.addEventListener('mouseleave', () => { hovered = false; update(); });

    update();
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for the tab-style split button. Move the pointer over the control in the canvas.',
      },
    },
  },
};

export const Pressed = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    const el = document.createElement('div');
    el.style.display = 'contents';

    let toggled = false;

    const update = () => {
      el.innerHTML = SplitButton({ label: args.label, type: 'tabs', state: toggled ? 'pressed' : 'default', theme });
    };

    el.addEventListener('click', () => {
      toggled = !toggled;
      update();
    });

    update();
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressed-state demo toggled by clicking the control.',
      },
    },
  },
};

export const Disabled = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return SplitButton({ label: args.label, type: 'tabs', state: 'disabled', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled tab-style split button.',
      },
    },
  },
};
