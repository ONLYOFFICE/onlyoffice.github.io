import { resolveStoryTheme, pluginThemeOptions, makeInteractive } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

// ─── Design tokens ──────────────────────────────────────────────────────────

const SECONDARY_TOKENS = {
  'Light': {
    default:  { bg: '#FFFFFF', text: 'rgba(0,0,0,0.80)', outline: '1px solid #C0C0C0' },
    hover:    { bg: '#E0E0E0', text: 'rgba(0,0,0,0.80)', outline: '1px solid #C0C0C0' },
    pressed:  { bg: '#CBCBCB', text: 'rgba(0,0,0,0.80)', outline: '1px solid #C0C0C0' },
    disabled: { bg: '#EFEFEF', text: 'rgba(0,0,0,0.40)', outline: '1px solid #C0C0C0' },
    loader:   { bg: '#EFEFEF', text: 'rgba(0,0,0,0.80)', outline: '1px solid #C0C0C0' },
  },
  'Light Classic': {
    default:  { bg: '#FFFFFF', text: '#444444', outline: '1px solid #CFCFCF' },
    hover:    { bg: '#D8DADC', text: '#444444', outline: '1px solid #CFCFCF' },
    pressed:  { bg: '#7D858C', text: '#FFFFFF', outline: '1px solid #CFCFCF' },
    disabled: { bg: '#F1F1F1', text: '#A5A5A5', outline: '1px solid #CFCFCF' },
    loader:   { bg: '#F1F1F1', text: '#444444', outline: '1px solid #CFCFCF' },
  },
  'Dark': {
    default:  { bg: '#333333', text: 'rgba(255,255,255,0.80)', outline: '1px solid #666666' },
    hover:    { bg: '#555555', text: 'rgba(255,255,255,0.80)', outline: '1px solid #666666' },
    pressed:  { bg: '#606060', text: 'rgba(255,255,255,0.80)', outline: '1px solid #666666' },
    disabled: { bg: '#505050', text: 'rgba(255,255,255,0.40)', outline: '1px solid #666666' },
    loader:   { bg: '#505050', text: 'rgba(255,255,255,0.80)', outline: '1px solid #666666' },
  },
  'Dark Contrast': {
    default:  { bg: '#1E1E1E', text: '#E8E8E8', outline: '1px solid #696969' },
    hover:    { bg: '#424242', text: '#E8E8E8', outline: '1px solid #696969' },
    pressed:  { bg: '#666666', text: '#E8E8E8', outline: '1px solid #696969' },
    disabled: { bg: '#2A2A2A', text: 'rgba(0,0,0,0.20)', outline: '1px solid #696969' },
    loader:   { bg: '#2A2A2A', text: '#E8E8E8', outline: '1px solid #696969' },
  },
  'Modern Light': {
    default:  { bg: '#FFFFFF', text: '#383838', outline: '1px solid #E1E1E1' },
    hover:    { bg: '#F9F9F9', text: '#383838', outline: '1px solid #E1E1E1' },
    pressed:  { bg: '#EAEAEA', text: '#383838', outline: '1px solid #2A5BB9' },
    disabled: { bg: '#FFFFFF', text: 'rgba(56,56,56,0.40)', outline: '1px solid #E1E1E1' },
    loader:   { bg: '#F3F3F3', text: '#383838', outline: '1px solid #E1E1E1' },
  },
  'Modern Dark': {
    default:  { bg: '#404040', text: '#E8E8E8', outline: '1px solid #686868' },
    hover:    { bg: '#585858', text: '#E8E8E8', outline: '1px solid #686868' },
    pressed:  { bg: '#686868', text: '#E8E8E8', outline: '1px solid #4A7BE0' },
    disabled: { bg: '#343434', text: 'rgba(232,232,232,0.30)', outline: '1px solid #686868' },
    loader:   { bg: '#343434', text: '#E8E8E8', outline: '1px solid #686868' },
  },
};

// ─── Spinner SVG ─────────────────────────────────────────────────────────────

const spinnerSvg = (color) =>
  `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="animation:ui-dialog-spin 0.9s linear infinite;display:inline-block;" aria-hidden="true">` +
  `<path d="M14.6663 8.00008C14.6663 11.682 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.682 1.33301 8.00008C1.33301 4.31818 4.31778 1.33341 7.99967 1.33341C11.6816 1.33341 14.6663 4.31818 14.6663 8.00008ZM3.66634 8.00008C3.66634 10.3933 5.60644 12.3334 7.99967 12.3334C10.3929 12.3334 12.333 10.3933 12.333 8.00008C12.333 5.60684 10.3929 3.66675 7.99967 3.66675C5.60644 3.66675 3.66634 5.60684 3.66634 8.00008Z" fill="${color}" opacity="0.2"/>` +
  `<path d="M7.99967 1.33341C8.87515 1.33341 9.74206 1.50584 10.5509 1.84087C11.3597 2.1759 12.0947 2.66697 12.7137 3.28602C13.3328 3.90508 13.8238 4.64001 14.1589 5.44884C14.4939 6.25768 14.6663 7.12459 14.6663 8.00008H12.333C12.333 7.43101 12.2209 6.86753 12.0032 6.34178C11.7854 5.81604 11.4662 5.33834 11.0638 4.93596C10.6614 4.53357 10.1837 4.21438 9.65797 3.99661C9.13222 3.77884 8.56873 3.66675 7.99967 3.66675V1.33341Z" fill="${color}"/>` +
  `</svg>`;

// ─── Render helper ────────────────────────────────────────────────────────────

function renderDialogButton({ label = 'Button', size = 24, state = 'default', scale = false, theme = 'Light' }) {
  const map = SECONDARY_TOKENS;
  const tk = (map[theme] ?? map['Light'])[state] ?? (map[theme] ?? map['Light'])['default'];

  const isLoader = state === 'loader';
  const isDisabled = state === 'disabled';
  const cursor = isLoader || isDisabled ? 'not-allowed' : 'pointer';
  const width = scale ? '100%' : 'auto';
  const isModern = theme.startsWith('Modern');
  const radius = isModern ? 4 : 1;
  const fontSize = isModern ? 12 : 11;
  const letterSpacing = isModern ? 0.24 : 0.22;

  const btnStyle = [
    `height:${size}px`,
    `min-width:${isModern ? 48 : 80}px`,
    `padding:0 ${isModern ? 12 : 32}px`,
    `background:${tk.bg}`,
    `border:none`,
    `border-radius:${radius}px`,
    `outline:${tk.outline}`,
    `outline-offset:-1px`,
    `display:inline-flex`,
    `align-items:center`,
    `justify-content:center`,
    `box-sizing:border-box`,
    `cursor:${cursor}`,
    `width:${width}`,
  ].join(';');

  const textStyle = [
    `color:${tk.text}`,
    `font-size:${fontSize}px`,
    `font-family:Arial,Helvetica,sans-serif`,
    `font-weight:700`,
    `line-height:16px`,
    `letter-spacing:${letterSpacing}px`,
    `white-space:nowrap`,
    `user-select:none`,
  ].join(';');

  const inner = isLoader
    ? `<span aria-hidden="true">${spinnerSvg(tk.text)}</span>`
    : `<span style="${textStyle}">${label}</span>`;

  return `<button type="button" style="${btnStyle}" ${isDisabled || isLoader ? 'disabled' : ''}>${inner}</button>`;
}

// ─── Wrapper helper ───────────────────────────────────────────────────────────

function Wrapper(children, isScale = false) {
  return `<div style="display:grid;grid-template-columns:${isScale ? '1fr' : 'repeat(auto-fill, minmax(180px, 1fr))'};gap:16px;align-items:center;">${children}</div>`;
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Buttons/Dialog Buttons/Secondary',
  tags: ['autodocs'],
  args: {
    label: 'Button',
    size: 24,
    interactive: true,
    isHovered: false,
    isClicked: false,
    isDisabled: false,
    isLoading: false,
    themeMode: 'Auto',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible action label',
    },
    size: {
      control: 'select',
      options: [22, 24],
      description: 'Compact or regular dialog button height',
      table: { defaultValue: { summary: '24' } },
    },
    interactive: {
      control: 'boolean',
      description: 'Allow the story to react to hover and click in the canvas',
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
      description: 'Show the disabled state',
    },
    isLoading: {
      control: 'boolean',
      description: 'Replace the label with the loading indicator',
    },
    minWidth: {
      control: 'text',
      description: 'Override minimum button width (e.g. "120px")',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
    variant: { table: { disable: true } },
    scale: { table: { disable: true } },
    state: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Secondary dialog action button for cancel, back, or less prominent actions in modal footers and compact plugin flows.',
      },
    },
  },
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const state = args.isDisabled ? 'disabled' : args.isLoading ? 'loader' : 'default';

    return makeInteractive(
      (hoverState) => renderDialogButton({
        label: args.label,
        size: args.size,
        state: state !== 'default' ? state : hoverState,
        theme,
      }),
      { disabled: state !== 'default' }
    );
  },
};

export const Hovered = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(
      renderDialogButton({ label: 'Button', size: 22, state: 'hover', theme }) +
      renderDialogButton({ label: 'Button', size: 24, state: 'hover', theme })
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover state for both sizes. Move the pointer over the buttons in the canvas for the live effect.',
      },
    },
  },
};

export const Clicked = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);

    const makeClickDemo = (size) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'inline-block';

      let pressTimer = null;

      const render = (state) => {
        wrapper.innerHTML = renderDialogButton({ label: 'Button', size, state, theme });
      };

      wrapper.addEventListener('mousedown', () => {
        render('pressed');
        clearTimeout(pressTimer);
        pressTimer = setTimeout(() => render('default'), 180);
      });

      render('default');
      return wrapper;
    };

    const container = document.createElement('div');
    container.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:16px;align-items:center;';
    container.appendChild(makeClickDemo(22));
    container.appendChild(makeClickDemo(24));
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressed-state demo. Click a button to preview the active press moment.',
      },
    },
  },
};

export const Disabled = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(
      renderDialogButton({ label: 'Button', size: 22, state: 'disabled', theme }) +
      renderDialogButton({ label: 'Button', size: 24, state: 'disabled', theme })
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons keep layout but should not invite interaction.',
      },
    },
  },
};

export const Loading = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return `<style>@keyframes ui-dialog-spin{to{transform:rotate(360deg)}}</style>` +
      Wrapper(
        renderDialogButton({ label: 'Button', size: 22, state: 'loader', theme }) +
        renderDialogButton({ label: 'Button', size: 24, state: 'loader', theme })
      );
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state while the action is in progress.',
      },
    },
  },
};

export const Scale = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(
      renderDialogButton({ label: 'Button', size: 22, state: 'default', scale: true, theme }) +
      renderDialogButton({ label: 'Button', size: 24, state: 'default', scale: true, theme }),
      true
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-width layout variant for dense footers or narrow dialog flows.',
      },
    },
  },
};
