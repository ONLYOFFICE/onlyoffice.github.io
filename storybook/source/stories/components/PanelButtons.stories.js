import { PanelButton } from '../../components/PanelButton.js';
import { resolveStoryTheme, pluginThemeOptions, makeInteractive } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Buttons/Panel Buttons',
  tags: ['autodocs'],
  args: {
    label: 'Button',
    size: 24,
    interactive: true,
    isHovered: false,
    isClicked: false,
    isDisabled: false,
    isLoading: false,
    scale: false,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Visible action label' },
    size: {
      control: 'select', options: [24, 30],
      description: 'Default or larger panel button height',
      table: { defaultValue: { summary: '24' } },
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and click feedback directly in the canvas',
      table: { defaultValue: { summary: 'true' } },
    },
    isHovered: { control: 'boolean', description: 'Force hover appearance for visual review' },
    isClicked: { control: 'boolean', description: 'Force pressed appearance for visual review' },
    isDisabled: { control: 'boolean', description: 'Show the disabled state' },
    isLoading: { control: 'boolean', description: 'Show the loading indicator instead of the normal label' },
    scale: { control: 'boolean', description: 'Stretch the button to fill the available row' },
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
        component: 'Panel action buttons used inside plugin side panels. Includes compact and larger heights plus hover, pressed, disabled, loading, and stretched states.',
      },
    },
  },
};

function resolveDisplayState(args, hovered, pressed) {
  if (args.isLoading) return 'loader';
  if (args.isDisabled) return 'disabled';
  if (args.isClicked) return 'pressed';
  if (args.isHovered) return 'hover';
  if (args.interactive !== false) {
    if (pressed) return 'pressed';
    if (hovered) return 'hover';
  }
  return 'default';
}

function renderInteractive(args, theme) {
  const isStatic = args.interactive === false || args.isDisabled || args.isLoading;

  if (isStatic) {
    const state = args.isLoading ? 'loader' : args.isDisabled ? 'disabled' : args.isClicked ? 'pressed' : args.isHovered ? 'hover' : 'default';
    return PanelButton({ label: args.label, size: args.size, state, theme, scale: args.scale });
  }

  let hovered = false;
  let pressed = false;
  const el = document.createElement('div');
  el.style.display = 'contents';

  const update = () => {
    el.innerHTML = PanelButton({ label: args.label, size: args.size, state: resolveDisplayState(args, hovered, pressed), theme, scale: args.scale });
  };

  el.addEventListener('mouseenter', () => { hovered = true; update(); });
  el.addEventListener('mouseleave', () => { hovered = false; pressed = false; update(); });
  el.addEventListener('mousedown', () => { pressed = true; update(); });
  el.addEventListener('mouseup', () => { pressed = false; update(); });

  update();
  return el;
}

function Wrapper(children, isScale = false) {
  return `<div style="display:grid;grid-template-columns:${isScale ? '1fr' : 'repeat(auto-fill, minmax(180px, 1fr))'};gap:16px;align-items:center;">${children}</div>`;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return renderInteractive(args, theme);
  },
};

export const HoveredButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:16px;align-items:center;';
    // These are interactive — hover works natively in the canvas
    const make = (size) => {
      const w = document.createElement('div');
      w.style.display = 'contents';
      let hovered = false, pressed = false;
      const update = () => { w.innerHTML = PanelButton({ label: args.label ?? 'Button', size, state: pressed ? 'pressed' : hovered ? 'hover' : 'default', theme }); };
      w.addEventListener('mouseenter', () => { hovered = true; update(); });
      w.addEventListener('mouseleave', () => { hovered = false; pressed = false; update(); });
      w.addEventListener('mousedown', () => { pressed = true; update(); });
      w.addEventListener('mouseup', () => { pressed = false; update(); });
      update();
      return w;
    };
    el.appendChild(make(24));
    el.appendChild(make(30));
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for both panel button sizes. Move the pointer over each button in the canvas.',
      },
    },
  },
};

export const ClickedButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:16px;align-items:center;';

    [24, 30].forEach(size => {
      const w = document.createElement('div');
      w.style.display = 'contents';
      let pressed = false;
      let timer = null;
      const update = () => { w.innerHTML = PanelButton({ label: args.label ?? 'Button', size, state: pressed ? 'pressed' : 'default', theme }); };
      w.addEventListener('click', () => {
        if (timer) clearTimeout(timer);
        pressed = true; update();
        timer = setTimeout(() => { pressed = false; update(); }, 180);
      });
      update();
      el.appendChild(w);
    });

    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressed-state demo. Click the buttons to preview the active press moment.',
      },
    },
  },
};

export const DisabledButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(
      PanelButton({ label: args.label ?? 'Button', size: 24, state: 'disabled', theme }) +
      PanelButton({ label: args.label ?? 'Button', size: 30, state: 'disabled', theme })
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled panel actions that keep layout without inviting interaction.',
      },
    },
  },
};

export const IsLoadingButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(
      PanelButton({ label: args.label ?? 'Button', size: 24, state: 'loader', theme }) +
      PanelButton({ label: args.label ?? 'Button', size: 30, state: 'loader', theme })
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state for long-running panel actions.',
      },
    },
  },
};

export const ScaleButtons = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(
      PanelButton({ label: args.label ?? 'Scale Small', size: 24, state: 'default', theme, scale: true }) +
      PanelButton({ label: args.label ?? 'Scale Normal', size: 30, state: 'default', theme, scale: true }),
      true
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-width layout variant for dense side-panel flows.',
      },
    },
  },
};
