import { PreviewControl } from '../../components/PreviewControl.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Actions/Preview Controls',
  tags: ['autodocs'],
  args: {
    direction: 'back',
    interactive: true,
    isHovered: false,
    isClicked: false,
    isDisabled: false,
    themeMode: 'Auto',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['back', 'next'],
      description: 'Arrow direction',
      table: { defaultValue: { summary: 'back' } },
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
    isDisabled: {
      control: 'boolean',
      description: 'Render in disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Circular arrow button used for navigating forward and backward in a preview carousel. Theme-aware with shadow-based state feedback.',
      },
    },
  },
};

/** Make a single interactive PreviewControl DOM element. */
function makeInteractiveControl({ direction, theme, isDisabled, args }) {
  if (isDisabled) {
    const el = document.createElement('div');
    el.style.display = 'contents';
    el.innerHTML = PreviewControl({ direction, state: 'disabled', theme, isDisabled: true });
    return el;
  }

  const el = document.createElement('div');
  el.style.display = 'contents';

  if (!args.interactive) {
    const state = args.isClicked ? 'pressed' : args.isHovered ? 'hover' : 'default';
    el.innerHTML = PreviewControl({ direction, state, theme });
    return el;
  }

  let hovered = false;
  let pressed = false;

  const update = () => {
    const state = pressed ? 'pressed' : hovered ? 'hover' : 'default';
    el.innerHTML = PreviewControl({ direction, state, theme });
  };

  el.addEventListener('mouseenter', () => { hovered = true; update(); });
  el.addEventListener('mouseleave', () => { hovered = false; pressed = false; update(); });
  el.addEventListener('mousedown', () => { pressed = true; update(); });
  el.addEventListener('mouseup', () => { pressed = false; update(); });

  update();
  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '40px';
    wrapper.style.alignItems = 'center';

    wrapper.appendChild(makeInteractiveControl({ direction: 'back', theme, isDisabled: args.isDisabled, args }));
    wrapper.appendChild(makeInteractiveControl({ direction: 'next', theme, isDisabled: args.isDisabled, args }));

    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: 'Back and next preview controls side by side. Hover or click to see state transitions.',
      },
    },
  },
};

export const Back = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveControl({ direction: 'back', theme, isDisabled: args.isDisabled, args });
  },
  parameters: {
    docs: {
      description: {
        story: 'Back (previous) preview control in isolation.',
      },
    },
  },
};

export const Next = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveControl({ direction: 'next', theme, isDisabled: args.isDisabled, args });
  },
  parameters: {
    docs: {
      description: {
        story: 'Next preview control in isolation.',
      },
    },
  },
};

export const Disabled = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '40px';
    wrapper.style.alignItems = 'center';

    const back = document.createElement('div');
    back.style.display = 'contents';
    back.innerHTML = PreviewControl({ direction: 'back', state: 'disabled', theme, isDisabled: true });

    const next = document.createElement('div');
    next.style.display = 'contents';
    next.innerHTML = PreviewControl({ direction: 'next', state: 'disabled', theme, isDisabled: true });

    wrapper.appendChild(back);
    wrapper.appendChild(next);
    return wrapper;
  },
  args: { isDisabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Both preview controls in the disabled state.',
      },
    },
  },
};
