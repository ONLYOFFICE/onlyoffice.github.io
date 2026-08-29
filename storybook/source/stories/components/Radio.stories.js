import { Radio } from '../../components/Radio.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Form/Radio',
  tags: ['autodocs'],
  args: {
    label: 'Default radio button',
    selected: 'no',
    state: 'default',
    interactive: true,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Visible radio label' },
    selected: {
      control: 'select',
      options: ['no', 'yes'],
      description: 'Unchecked or selected state',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'Rendered visual state',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and selection behavior directly in the canvas',
      table: { defaultValue: { summary: 'true' } },
    },
    isHovered: {
      control: 'boolean',
      description: 'Force hover appearance for review',
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
        component:
          'Radio control for mutually exclusive choices. Use it inside groups where one option should stay selected.',
      },
    },
  },
};

/** Build an interactive radio element that responds to hover and click. */
function makeRadio({ label, selected: initialSelected, state, interactive, isHovered, theme }) {
  const isDisabled = state === 'disabled';
  const initialVal = typeof initialSelected === 'boolean' ? (initialSelected ? 'yes' : 'no') : (initialSelected || 'no');

  if (!interactive || isDisabled) {
    const el = document.createElement('div');
    el.style.display = 'contents';
    const effectiveState = isDisabled ? 'disabled' : (isHovered ? 'hover' : state);
    el.innerHTML = Radio({ label, selected: initialVal, state: effectiveState, theme });
    return el;
  }

  const el = document.createElement('div');
  el.style.display = 'contents';
  let currentSelected = initialVal;
  let hovered = false;

  const update = () => {
    el.innerHTML = Radio({
      label,
      selected: currentSelected,
      state: hovered ? 'hover' : 'default',
      theme,
    });
  };

  el.addEventListener('mouseenter', () => { hovered = true; update(); });
  el.addEventListener('mouseleave', () => { hovered = false; update(); });
  el.addEventListener('click', () => { currentSelected = 'yes'; update(); });

  update();
  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeRadio({ ...args, theme });
  },
};

export const Checked = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeRadio({ ...args, label: 'Checked radio button', selected: 'yes', state: 'default', interactive: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Selected radio option inside a choice group.',
      },
    },
  },
};

export const Hovered = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeRadio({ ...args, label: 'Hovered radio button', selected: 'no', state: 'default', interactive: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for an unselected radio option. Move the pointer over the control in the canvas.',
      },
    },
  },
};

export const Disabled = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeRadio({ label: 'Disabled', selected: 'no', state: 'disabled', interactive: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled radio option that remains visible but unavailable.',
      },
    },
  },
};
