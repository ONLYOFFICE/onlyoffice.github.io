import { Tabs } from '../../components/Tabs.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';
import { tabsByTheme } from '../../data/tabs.ts';

const THEMES = pluginThemeOptions;

const defaultItems = [
  { id: 'paragraph', label: 'Paragraph' },
  { id: 'table', label: 'Table' },
  { id: 'style', label: 'Style' },
];

export default {
  title: 'Components/Data Display/Tabs',
  tags: ['autodocs'],
  args: {
    items: defaultItems,
    activeId: 'paragraph',
    state: 'default',
    hoveredId: 'table',
    interactive: true,
    withIcon: false,
    scaled: false,
    themeMode: 'Auto',
  },
  argTypes: {
    activeId: { control: 'text', description: 'Currently selected tab id' },
    state: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'Rendered visual state used for reference-only tab styling',
    },
    hoveredId: {
      control: 'text',
      description: 'Tab id used when the hover state is forced for reference',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and selection changes in the canvas',
    },
    withIcon: { control: 'boolean', description: 'Show leading icons in the tab labels' },
    scaled: { control: 'boolean', description: 'Stretch tabs to fill the full container width' },
    items: { control: 'object', description: 'Tab definitions with ids and labels' },
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
          'Horizontal tabs for compact mode switching inside panels and dialogs, with optional icons and live hover behavior.',
      },
    },
  },
};

function makeInteractiveTabs({ items, activeId: initialActiveId, withIcon, scaled, theme }) {
  const el = document.createElement('div');
  el.style.display = 'contents';
  let activeId = initialActiveId ?? 'paragraph';

  // theme is already resolved by resolveStoryTheme before being passed here
  const tokens = tabsByTheme[theme] ?? tabsByTheme['Light'];

  const render = () => {
    el.innerHTML = Tabs({ items, activeId, withIcon, scaled, theme });
    const tabButtons = el.querySelectorAll('button[role="tab"]');
    tabButtons.forEach((btn, index) => {
      const item = items[index];
      if (!item) return;

      // Capture the at-rest background from the rendered HTML so mouseleave can restore it
      const restBg = btn.style.background;

      // Hover: update only this button's background — no DOM rebuild, so clicks aren't broken
      btn.addEventListener('mouseenter', () => { btn.style.background = tokens.hoverBg; });
      btn.addEventListener('mouseleave', () => { btn.style.background = restBg; });
      // Click: change active tab and re-render (only here is full re-render needed)
      btn.addEventListener('click', () => { activeId = item.id; render(); });
    });
  };

  render();
  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({ ...args, items, theme });
  },
};

export const IconTabs = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({ ...args, items, withIcon: true, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with leading icons for richer navigation labels.',
      },
    },
  },
};

export const HoveredTabs = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({ ...args, items, activeId: 'paragraph', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo where a non-selected tab can be highlighted. Move the pointer over another tab in the canvas.',
      },
    },
  },
};

export const HoveredSelected = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({ ...args, items, activeId: 'paragraph', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo when the selected tab is also under the pointer. Move the pointer over the active tab in the canvas.',
      },
    },
  },
};
