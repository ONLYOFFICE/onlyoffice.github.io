import { ModalWindow } from '../../components/ModalWindow.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

function makeInteractiveModalWindow(args, theme) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'padding:24px;display:inline-block;';
  wrapper.innerHTML = ModalWindow({ ...args, theme });

  wrapper.querySelectorAll('button[data-role]').forEach((btn) => {
    const restBg = btn.dataset.restBg;
    const hoverBg = btn.dataset.hoverBg;
    const pressedBg = btn.dataset.pressedBg;
    const restBorder = btn.dataset.restBorder;
    const pressedBorder = btn.dataset.pressedBorder;

    let hovered = false;
    let pressTimer = null;
    let pressStart = 0;

    btn.addEventListener('mouseenter', () => {
      hovered = true;
      if (!pressTimer) btn.style.background = hoverBg;
    });
    btn.addEventListener('mouseleave', () => {
      hovered = false;
      if (!pressTimer) {
        btn.style.background = restBg;
        btn.style.border = restBorder;
      }
    });
    btn.addEventListener('mousedown', () => {
      pressStart = Date.now();
      if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
      btn.style.background = pressedBg;
      btn.style.border = pressedBorder;
    });
    btn.addEventListener('mouseup', () => {
      const elapsed = Date.now() - pressStart;
      const delay = Math.max(0, 150 - elapsed);
      pressTimer = setTimeout(() => {
        pressTimer = null;
        btn.style.background = hovered ? hoverBg : restBg;
        btn.style.border = restBorder;
      }, delay);
    });
  });

  return wrapper;
}

export default {
  title: 'Components/Layout/Modal Window',
  tags: ['autodocs'],
  args: {
    title: 'Title',
  tags: ['autodocs'],
    contentLabel: 'Content',
    notificationText: 'Text\nText',
    primaryLabel: 'Button',
    secondaryLabel: 'Button',
    size: 'M',
    notification: false,
    footerMode: 'auto',
    themeMode: 'Auto',
  },
  argTypes: {
    title: { control: 'text', description: 'Main dialog title' },
    contentLabel: { control: 'text', description: 'Placeholder copy for the main content area' },
    notificationText: { control: 'text', description: 'Inline warning or notification message' },
    primaryLabel: { control: 'text', description: 'Primary footer action label' },
    secondaryLabel: { control: 'text', description: 'Secondary footer action label' },
    size: { control: 'select', options: ['S', 'M', 'L'], description: 'Modal width preset' },
    notification: { control: 'boolean', description: 'Show the notification block above the footer' },
    footerMode: {
      control: 'select',
      options: ['auto', 'single', 'double'],
      description: 'One-button or two-button footer layout',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...pluginThemeOptions],
      description: 'Auto = current Storybook toolbar theme',
    },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Dialog window shell with size presets, optional notification block, and single or double action footers.',
      },
    },
  },
};

export const Default = {
  args: {
    size: 'M',
    notification: false,
    footerMode: 'single',
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium modal preset for standard confirmation and settings flows.',
      },
    },
  },
};

export const Small = {
  args: {
    size: 'S',
    notification: false,
    footerMode: 'single',
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Small modal for short confirmations and compact messages.',
      },
    },
  },
};

export const Large = {
  args: {
    size: 'L',
    notification: false,
    footerMode: 'double',
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Large modal for richer content and double-action layouts.',
      },
    },
  },
};

export const WithNotification = {
  args: {
    size: 'S',
    notification: true,
    footerMode: 'single',
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with an inline warning or explanatory notification block.',
      },
    },
  },
};
