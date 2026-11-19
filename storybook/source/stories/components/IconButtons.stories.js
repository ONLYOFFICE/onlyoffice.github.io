import { IconButton } from '../../components/IconButton.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Buttons/Icon Buttons',
  tags: ['autodocs'],
  args: {
    type: 'outline',
    interactive: true,
    isHovered: false,
    isClicked: false,
    themeMode: 'Auto',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['outline', 'solid', 'rightExpander'],
      description: 'Visual style and icon-button role',
      table: { defaultValue: { summary: 'outline' } },
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and click feedback directly in the canvas',
      table: { defaultValue: { summary: 'true' } },
    },
    isHovered: {
      control: 'boolean',
      description: 'Force hover appearance for visual review',
    },
    isClicked: {
      control: 'boolean',
      description: 'Force pressed appearance for visual review',
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
      description: {
        component:
          'Compact icon-only actions for panel chrome and small utility controls. Includes outline, solid, and right-expander variants.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const state = args.isClicked ? 'pressed' : args.isHovered ? 'hover' : 'default';

    if (!args.interactive) {
      return IconButton({ type: args.type, state, theme });
    }

    const el = document.createElement('div');
    el.style.display = 'contents';

    let hovered = false;
    let pressed = false;

    const update = () => {
      const s = pressed ? 'pressed' : hovered ? 'hover' : 'default';
      el.innerHTML = IconButton({ type: args.type, state: s, theme });
    };

    el.addEventListener('mouseenter', () => { hovered = true; update(); });
    el.addEventListener('mouseleave', () => { hovered = false; pressed = false; update(); });
    el.addEventListener('mousedown', () => { pressed = true; update(); });
    el.addEventListener('mouseup', () => { pressed = false; update(); });

    update();
    return el;
  },
};

export const OutlineButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return IconButton({ type: 'outline', state: 'default', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline icon action for low-emphasis utility controls.',
      },
    },
  },
};

export const SolidButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return IconButton({ type: 'solid', state: 'default', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Solid icon action with stronger emphasis.',
      },
    },
  },
};


export const RightExpanderButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return IconButton({ type: 'rightExpander', state: 'default', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Chevron-style expander used for disclosure and nested sections.',
      },
    },
  },
};

export const SolidHoveredButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return IconButton({ type: 'solid', state: 'hover', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Solid button in forced hover state for visual review.',
      },
    },
  },
};

export const SolidClickedButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return IconButton({ type: 'solid', state: 'pressed', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Solid button in forced pressed state for visual review.',
      },
    },
  },
};

export const HoveredButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    const el = document.createElement('div');
    el.style.display = 'contents';

    let hovered = false;

    const update = () => {
      el.innerHTML = IconButton({ type: 'rightExpander', state: hovered ? 'hover' : 'default', theme });
    };

    el.addEventListener('mouseenter', () => { hovered = true; update(); });
    el.addEventListener('mouseleave', () => { hovered = false; update(); });

    update();
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for the icon-only control. Move the pointer over the button in the canvas.',
      },
    },
  },
};

export const ClickedButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    const el = document.createElement('div');
    el.style.display = 'contents';

    let pressed = false;
    let timer = null;

    const update = () => {
      el.innerHTML = IconButton({ type: 'rightExpander', state: pressed ? 'pressed' : 'default', theme });
    };

    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer);
      pressed = true;
      update();
      timer = setTimeout(() => {
        pressed = false;
        update();
        timer = null;
      }, 180);
    });

    update();
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressed-state demo for the right-expander variant.',
      },
    },
  },
};
