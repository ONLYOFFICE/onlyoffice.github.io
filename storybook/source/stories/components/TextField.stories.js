import { TextField } from '../../components/TextField.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Form/Text Field',
  tags: ['autodocs'],
  args: {
    label: 'Title',
    caption: 'Caption',
    errorText: 'Error text',
    placeholder: 'Line input',
    value: '',
    state: 'default',
    placeholderState: 'default',
    withIconRight: false,
    interactive: true,
    isHovered: false,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Label above the field' },
    caption: { control: 'text', description: 'Supporting text below the field' },
    errorText: { control: 'text', description: 'Validation message for the error state' },
    placeholder: { control: 'text', description: 'Placeholder text shown inside the field' },
    value: { control: 'text', description: 'Current controlled input value' },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focused', 'typing', 'filled', 'error', 'disabled'],
      description: 'Rendered visual state of the field',
    },
    placeholderState: {
      control: 'select',
      options: ['default', 'hidden'],
      description: 'Show the placeholder normally or hide it for a denser layout',
    },
    withIconRight: { control: 'boolean', description: 'Show the trailing icon button' },
    interactive: {
      control: 'boolean',
      description: 'Allow hover/focus behavior directly in the canvas',
    },
    isHovered: { control: 'boolean', description: 'Force hover appearance for review' },
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
          'Single-line input with label, caption, error messaging, optional trailing icon, and theme-aware control states.',
      },
    },
  },
};

/**
 * Build an interactive DOM wrapper that tracks focus/blur/hover on the real
 * <input> element and re-renders the HTML string on each state change.
 */
function makeInteractiveTextField(args, theme) {
  const el = document.createElement('div');
  el.style.display = 'contents';

  let isFocused = false;
  let isHovered = false;
  let value = args.value ?? '';
  // Prevents spurious blur/focus events fired by the browser when innerHTML
  // replacement removes the focused <input> from the DOM mid-update.
  let inUpdate = false;

  const update = (restoreFocus = false) => {
    inUpdate = true;

    const state = args.state === 'disabled'
      ? 'disabled'
      : args.isHovered || isHovered
        ? 'hover'
        : isFocused
          ? 'focused'
          : value
            ? 'filled'
            : 'default';

    el.innerHTML = TextField({ ...args, theme, state, value });

    const input = el.querySelector('input');
    inUpdate = false;

    if (!input) return;
    input.value = value;

    // Restore focus to the newly rendered input without triggering another update
    if (restoreFocus) setTimeout(() => { input.focus(); }, 0);

    input.addEventListener('focus', () => {
      if (inUpdate || isFocused) return;
      isFocused = true;
      update(true);
    });
    input.addEventListener('blur', () => {
      if (inUpdate || !isFocused) return;
      isFocused = false;
      update(false);
    });
    input.addEventListener('input', (e) => { value = e.target.value; });
    input.addEventListener('mouseenter', () => {
      if (inUpdate || isHovered || isFocused) return;
      isHovered = true;
      update(false);
    });
    input.addEventListener('mouseleave', () => {
      if (inUpdate || !isHovered) return;
      isHovered = false;
      update(false);
    });
  };

  update(false);
  return el;
}

// ---------------------------------------------------------------------------
// Default — interactive field with real hover/focus/blur behavior
// ---------------------------------------------------------------------------
export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    if (args.interactive === false) {
      return TextField({ ...args, theme });
    }
    return makeInteractiveTextField(args, theme);
  },
};

// ---------------------------------------------------------------------------
// HoveredField — fixed hover reference state
// ---------------------------------------------------------------------------
export const HoveredField = {
  args: {
    state: 'hover',
    isHovered: true,
    interactive: false,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({ ...args, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed hover reference state for the single-line field.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// FocusedField — fixed focused reference state
// ---------------------------------------------------------------------------
export const FocusedField = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({ ...args, label: 'Focused field', state: 'focused', interactive: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed focused reference state used when the field is ready for typing.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// ErrorField — fixed error reference state
// ---------------------------------------------------------------------------
export const ErrorField = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({ ...args, label: 'Field with error', state: 'error', interactive: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed error reference state with validation messaging and error border.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// DisabledField — fixed disabled reference state
// ---------------------------------------------------------------------------
export const DisabledField = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({ ...args, label: 'Disabled field', state: 'disabled', interactive: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed disabled reference state that preserves layout but removes interaction.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// IconRightField — field with trailing icon
// ---------------------------------------------------------------------------
export const IconRightField = {
  args: {
    withIconRight: true,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({ ...args, label: 'Icon right field', withIconRight: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a trailing icon action.',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// HiddenPlaceholderField — placeholder hidden for denser layouts
// ---------------------------------------------------------------------------
export const HiddenPlaceholderField = {
  args: {
    placeholderState: 'hidden',
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    if (args.interactive === false) {
      return TextField({ ...args, label: 'Hidden placeholder', placeholderState: 'hidden', theme });
    }
    return makeInteractiveTextField(
      { ...args, label: 'Hidden placeholder', placeholderState: 'hidden' },
      theme,
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant with hidden placeholder treatment for denser layouts.',
      },
    },
  },
};
