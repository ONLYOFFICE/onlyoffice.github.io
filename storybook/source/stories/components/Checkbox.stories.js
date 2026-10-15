import { Checkbox } from '../../components/Checkbox.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Form/Checkbox',
  tags: ['autodocs'],
  args: {
    label: 'Checkbox',
    selected: 'no',
    state: 'default',
    interactive: true,
    isHovered: false,
    truncate: false,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Visible checkbox label' },
    selected: {
      control: 'select',
      options: ['no', 'yes', 'partial'],
      description: 'Unchecked, checked, or indeterminate state',
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
    isHovered: {
      control: 'boolean',
      description: 'Force hover appearance for review',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate long label with ellipsis instead of wrapping',
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
          'Checkbox control for independent on/off selections, including checked, indeterminate, and disabled states.',
      },
    },
  },
};

const CYCLE = { no: 'yes', yes: 'partial', partial: 'no' };

/** Build an interactive checkbox element that responds to hover and click. */
function makeCheckbox({ label, selected: initialSelected, state, interactive, isHovered, truncate, theme }) {
  const isDisabled = state === 'disabled';

  if (!interactive || isDisabled) {
    const el = document.createElement('div');
    el.style.display = 'contents';
    const effectiveState = isDisabled ? 'disabled' : (isHovered ? 'hover' : state);
    el.innerHTML = Checkbox({ label, selected: initialSelected, state: effectiveState, theme, truncate });
    return el;
  }

  const el = document.createElement('div');
  el.style.display = 'contents';
  let currentSelected = initialSelected;
  let hovered = false;

  const update = () => {
    el.innerHTML = Checkbox({
      label,
      selected: currentSelected,
      state: hovered ? 'hover' : 'default',
      theme,
      truncate,
    });
  };

  el.addEventListener('mouseenter', () => { hovered = true; update(); });
  el.addEventListener('mouseleave', () => { hovered = false; update(); });
  el.addEventListener('click', () => { currentSelected = CYCLE[currentSelected]; update(); });

  update();
  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeCheckbox({ ...args, theme });
  },
};

export const Checked = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeCheckbox({ ...args, label: 'Selected', selected: 'yes', state: 'default', interactive: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive checked-state demo for an active standalone selection.',
      },
    },
  },
};

export const Disabled = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeCheckbox({ label: 'Disabled', selected: 'no', state: 'disabled', interactive: false, isHovered: false, truncate: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox that preserves layout without allowing selection changes.',
      },
    },
  },
};

export const Indeterminate = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeCheckbox({ ...args, label: 'Indeterminate', selected: 'partial', state: 'default', interactive: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive indeterminate-state demo for partial selection in grouped lists.',
      },
    },
  },
};
