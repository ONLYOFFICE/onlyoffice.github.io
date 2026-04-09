import { ContextMenu } from '../../components/ContextMenu.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

const mixedItems = [
  { id: '1', label: 'Menu item', type: 'iconLeft' },
  { id: '2', label: 'Menu item', type: 'iconsBoth' },
  { id: '3', label: 'Menu item', type: 'noIcon' },
  { id: '4', label: 'Disabled item', type: 'iconLeft', disabled: true },
];

const iconLeftItems = [
  { id: '1', label: 'Menu item', type: 'iconLeft' },
  { id: '2', label: 'Another item', type: 'iconLeft' },
  { id: '3', label: 'Disabled item', type: 'iconLeft', disabled: true },
];

const iconsBothItems = [
  { id: '1', label: 'Menu item', type: 'iconsBoth' },
  { id: '2', label: 'Submenu item', type: 'iconsBoth' },
  { id: '3', label: 'Disabled item', type: 'iconsBoth', disabled: true },
];

const noIconItems = [
  { id: '1', label: 'Menu item', type: 'noIcon' },
  { id: '2', label: 'Another item', type: 'noIcon' },
  { id: '3', label: 'Disabled item', type: 'noIcon', disabled: true },
];

const submenuItems = [
  { id: '1', label: 'Menu item', type: 'iconLeft' },
  {
    id: '2',
    label: 'Has submenu',
    type: 'iconLeft',
    items: [
      { id: '2-1', label: 'Submenu item 1', type: 'iconLeft' },
      { id: '2-2', label: 'Submenu item 2', type: 'iconLeft' },
      { id: '2-3', label: 'Disabled', type: 'iconLeft', disabled: true },
    ],
  },
  { id: '3', label: 'Menu item', type: 'noIcon' },
  { id: '4', label: 'Disabled item', type: 'iconLeft', disabled: true },
];

export default {
  title: 'Components/Actions/Context Menu',
  tags: ['autodocs'],
  args: {
    items: mixedItems,
    interactive: true,
    isHoveredIndex: undefined,
    isClickedIndex: undefined,
    themeMode: 'Auto',
  },
  argTypes: {
    items: { control: 'object', description: 'Menu items' },
    interactive: { control: 'boolean', description: 'Enable real hover/press in canvas' },
    isHoveredIndex: {
      control: { type: 'number', min: 0 },
      description: 'Force-hover item by index (0-based) for docs preview',
    },
    isClickedIndex: {
      control: { type: 'number', min: 0 },
      description: 'Force-pressed item by index (0-based) for docs preview',
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
          'Context menu for compact action lists. Includes plain items, left-icon items, submenu-style dual-icon items, and disabled rows.',
      },
    },
  },
};

function makeInteractiveMenu({ items, theme }) {
  const el = document.createElement('div');
  el.style.display = 'contents';

  let hoveredIndex = -1;
  let openSubmenuId = null;

  const update = () => {
    el.innerHTML = ContextMenu({ items, theme, isHoveredIndex: hoveredIndex, isClickedIndex: -1, defaultOpenId: openSubmenuId });

    // Attach listeners to top-level item wrappers (direct children of the menu div)
    const menu = el.querySelector('div[style*="min-width:180px"]');
    if (!menu) return;
    const itemDivs = Array.from(menu.children);
    itemDivs.forEach((itemDiv, index) => {
      const item = items[index];
      if (!item || item.disabled) return;
      const hasSubmenu = Boolean(item.items && item.items.length > 0);

      if (hasSubmenu) {
        itemDiv.addEventListener('mouseenter', () => {
          hoveredIndex = index;
          openSubmenuId = item.id;
          update();
        });
        itemDiv.addEventListener('mouseleave', () => {
          hoveredIndex = -1;
          openSubmenuId = null;
          update();
        });
      } else {
        const btn = itemDiv.querySelector('button');
        if (!btn) return;
        btn.addEventListener('mouseenter', () => {
          hoveredIndex = index;
          openSubmenuId = null;
          update();
        });
        btn.addEventListener('mouseleave', () => {
          hoveredIndex = -1;
          update();
        });
      }
    });
  };

  update();
  return el;
}

export const Default = {
  args: { items: submenuItems, interactive: true },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({ items: args.items, theme });
  },
};

export const IconLeftItems = {
  args: { items: iconLeftItems },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({ items: args.items, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu with icon-left items only.',
      },
    },
  },
};

export const IconsBothItems = {
  args: { items: iconsBothItems },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({ items: args.items, theme });
  },
};

export const NoIconItems = {
  args: { items: noIconItems },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({ items: args.items, theme });
  },
};

export const HoveredItem = {
  args: { items: mixedItems, isHoveredIndex: 0, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return ContextMenu({ items: args.items, theme, isHoveredIndex: args.isHoveredIndex ?? 0, isClickedIndex: -1 });
  },
  parameters: {
    docs: {
      description: {
        story: 'Force-hover on the first item. Switch theme via toolbar to preview all themes.',
      },
    },
  },
};

export const PressedItem = {
  args: { items: mixedItems, isClickedIndex: 0, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return ContextMenu({ items: args.items, theme, isHoveredIndex: -1, isClickedIndex: args.isClickedIndex ?? 0 });
  },
  parameters: {
    docs: {
      description: {
        story: 'Force-pressed on the first item. Switch theme via toolbar to preview all themes.',
      },
    },
  },
};

export const WithSubmenu = {
  args: { items: submenuItems, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return ContextMenu({ items: args.items, theme, defaultOpenId: '2', isHoveredIndex: -1, isClickedIndex: -1 });
  },
  parameters: {
    docs: {
      description: {
        story: 'Submenu expanded on «Has submenu» item. Switch theme in toolbar to preview across themes.',
      },
    },
  },
};
