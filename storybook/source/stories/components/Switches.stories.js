import { Switch } from '../../components/Switch.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Form/Switches',
  tags: ['autodocs'],
  args: {
    checked: false,
    state: 'default',
    interactive: true,
    themeMode: 'Auto',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Current on/off value',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Rendered visual state',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and toggle behavior directly in the canvas',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: 'Switch control with on/off values and state variants.',
      },
    },
  },
};

/** Build an interactive switch element that responds to hover and click. */
function makeSwitch({ checked: initialChecked, state, interactive, theme }) {
  const isDisabled = state === 'disabled';

  if (!interactive || isDisabled) {
    const el = document.createElement('div');
    el.style.display = 'contents';
    el.innerHTML = Switch({ checked: initialChecked, state: isDisabled ? 'disabled' : state, theme });
    return el;
  }

  const el = document.createElement('div');
  el.style.display = 'contents';
  let currentChecked = Boolean(initialChecked);
  let hovered = false;

  const update = () => {
    el.innerHTML = Switch({
      checked: currentChecked,
      state: hovered ? 'hover' : 'default',
      theme,
    });
  };

  el.addEventListener('mouseenter', () => { hovered = true; update(); });
  el.addEventListener('mouseleave', () => { hovered = false; update(); });
  el.addEventListener('click', () => { currentChecked = !currentChecked; update(); });

  update();
  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeSwitch({ ...args, theme });
  },
};

export const HoveredSwitch = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeSwitch({ ...args, state: 'default', interactive: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for the switch. Move the pointer over the control in the canvas.',
      },
    },
  },
};

export const DisabledSwitches = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.display = 'contents';
    el.innerHTML = Switch({ checked: Boolean(args.checked), state: 'disabled', theme });
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed disabled reference state for the switch.',
      },
    },
  },
};
