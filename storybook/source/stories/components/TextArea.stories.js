import { TextArea } from '../../components/TextArea.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

// Copy button hover/pressed backgrounds match icon-button ghost style per theme
const COPY_HOVER_BG = {
  'Light':         '#E0E0E0',
  'Light Classic': '#D8DADC',
  'Dark':          '#555555',
  'Dark Contrast': '#424242',
  'Modern Light':  '#F9F9F9',
  'Modern Dark':   '#585858',
};

const COPY_PRESSED_BG = {
  'Light':         '#CBCBCB',
  'Light Classic': '#7D858C',
  'Dark':          '#606060',
  'Dark Contrast': '#666666',
  'Modern Light':  '#EAEAEA',
  'Modern Dark':   '#686868',
};

/** Wrap TextArea HTML and attach hover/pressed states to the copy button. */
function makeInteractiveTextArea(html, theme) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'contents';
  wrapper.innerHTML = html;

  const copyBtn = wrapper.querySelector('button[aria-label="Copy text"]');
  if (!copyBtn || copyBtn.disabled) return wrapper;

  const isModern = theme.startsWith('Modern');
  copyBtn.style.borderRadius = isModern ? '4px' : '2px';

  const hoverBg   = COPY_HOVER_BG[theme]   ?? '#E0E0E0';
  const pressedBg = COPY_PRESSED_BG[theme] ?? '#CBCBCB';

  copyBtn.addEventListener('mouseenter', () => { copyBtn.style.background = hoverBg; });
  copyBtn.addEventListener('mouseleave', () => { copyBtn.style.background = 'transparent'; });
  copyBtn.addEventListener('mousedown',  () => { copyBtn.style.background = pressedBg; });
  copyBtn.addEventListener('mouseup',    () => { copyBtn.style.background = hoverBg; });

  return wrapper;
}

export default {
  title: 'Components/Form/Text Area',
  tags: ['autodocs'],
  args: {
    label: 'Title',
    caption: 'Caption',
    state: 'no-scroll',
    width: 236,
    height: 188,
    showLabel: true,
    showCaption: true,
    showCopyButton: true,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Label above the text area' },
    caption: { control: 'text', description: 'Supporting text below the field' },
    value: { control: 'text', description: 'Current controlled text value' },
    state: {
      control: 'select',
      options: ['default', 'disabled', 'scroll', 'no-scroll'],
      description: 'Rendered visual state',
    },
    width: { control: 'number', description: 'Outer component width' },
    height: { control: 'number', description: 'Visible text area height' },
    showLabel: { control: 'boolean', description: 'Show the label row' },
    showCaption: { control: 'boolean', description: 'Show the caption below the field' },
    showCopyButton: { control: 'boolean', description: 'Show the copy action button' },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onCopy: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text field with optional copy action, caption, and themed scroll treatment for longer content.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({ ...args, theme }), theme);
  },
};

export const ScrollArea = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({ ...args, state: 'scroll', theme }), theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed scroll reference state for longer content.',
      },
    },
  },
};

export const NoScrollArea = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({ ...args, state: 'no-scroll', theme }), theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed no-scroll reference state without visible scrollbar treatment.',
      },
    },
  },
};

export const DisabledArea = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextArea({ ...args, state: 'disabled', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed disabled reference state that preserves layout without accepting input.',
      },
    },
  },
};

export const NoCaption = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({ ...args, showCaption: false, theme }), theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant without supporting caption text.',
      },
    },
  },
};

export const NoCopyButton = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextArea({ ...args, showCopyButton: false, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant without the copy action button.',
      },
    },
  },
};
