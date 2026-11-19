import { SplitButton } from '../../components/SplitButton.js';
import { resolveStoryTheme, pluginThemeOptions, getTokens } from '../../components/theme-utils.js';

const PRESSED_BG = {
  'Light': '#CBCBCB', 'Light Classic': '#7D858C', 'Dark': '#666666',
  'Dark Contrast': '#666666', 'Modern Light': '#DCE7FA', 'Modern Dark': '#375478',
};

const THEMES = pluginThemeOptions;

const defaultItems = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Disabled option', disabled: true },
];

export default {
  title: 'Components/Buttons/Split Buttons/Drop Down',
  tags: ['autodocs'],
  args: {
    label: 'Button',
    state: 'default',
    type: 'dropDown',
    interactive: true,
    themeMode: 'Auto',
  },
  argTypes: {
    label: { control: 'text', description: 'Visible split-button label' },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and press feedback directly in the canvas',
    },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
    },
    type: { table: { disable: true } },
    state: { table: { disable: true } },
    items: { table: { disable: true } },
    isOpen: { table: { disable: true } },
    onItemSelect: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Split button with a dropdown affordance. Clicking the chevron opens a plain context-menu-style list of options.',
      },
    },
  },
};

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const tokens = getTokens(theme);
    const pressedBg = PRESSED_BG[tokens.theme] ?? tokens.surfaceAlt;

    const wrapper = document.createElement('div');
    wrapper.style.paddingBottom = '120px';

    const el = document.createElement('div');
    el.style.display = 'contents';

    let currentLabel = args.label ?? 'Button';
    let open = false;
    let outsideClickHandler = null;

    const update = () => {
      if (outsideClickHandler) {
        document.removeEventListener('click', outsideClickHandler, true);
        outsideClickHandler = null;
      }
      el.innerHTML = SplitButton({ label: currentLabel, type: 'dropDown', state: 'default', isOpen: open, items: defaultItems, theme });

      // Dropdown item hover/pressed + click
      if (open) {
        const dropdownContainer = el.querySelector('div[style*="position:absolute"]');
        if (dropdownContainer) {
          dropdownContainer.querySelectorAll('button').forEach((btn) => {
            const item = defaultItems.find((i) => i.label === btn.textContent?.trim());
            if (!item || item.disabled) return;
            btn.addEventListener('mouseenter', () => { btn.style.background = tokens.surfaceAlt; });
            btn.addEventListener('mouseleave', () => { btn.style.background = 'transparent'; });
            btn.addEventListener('mousedown',  () => { btn.style.background = pressedBg; });
            btn.addEventListener('mouseup',    () => { btn.style.background = tokens.surfaceAlt; });
            btn.addEventListener('click', () => {
              currentLabel = item.label;
              open = false;
              update();
            });
          });
        }
      }

      if (open) {
        outsideClickHandler = (e) => {
          if (!wrapper.contains(e.target)) {
            open = false;
            update();
          }
        };
        // Use capture so it fires before the chevron's own click handler
        document.addEventListener('click', outsideClickHandler, true);
      }

      const chevronBtn = el.querySelector('button[aria-label="Open menu"]');
      if (chevronBtn) {
        const chevronRestBg = open ? pressedBg : tokens.bg;
        chevronBtn.addEventListener('click', () => { open = !open; update(); });
        chevronBtn.addEventListener('mouseenter', () => { chevronBtn.style.background = tokens.surfaceAlt; });
        // Restore to the actual rest background (not '' which leaves it transparent)
        chevronBtn.addEventListener('mouseleave', () => { chevronBtn.style.background = chevronRestBg; });
        chevronBtn.addEventListener('mousedown', () => { chevronBtn.style.background = pressedBg; });
        chevronBtn.addEventListener('mouseup',   () => { chevronBtn.style.background = tokens.surfaceAlt; });
      }
    };

    update();
    wrapper.appendChild(el);
    return wrapper;
  },
};

export const Open = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const wrapper = document.createElement('div');
    wrapper.style.paddingBottom = '120px';
    wrapper.innerHTML = SplitButton({ label: args.label, type: 'dropDown', state: 'default', isOpen: true, items: defaultItems, theme });
    return wrapper;
  },
  args: { isOpen: true },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown in the open state. Switch the toolbar theme to preview across themes.',
      },
    },
  },
};

export const Disabled = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return SplitButton({ label: args.label, type: 'dropDown', state: 'disabled', isOpen: false, items: defaultItems, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled dropdown split button.',
      },
    },
  },
};
