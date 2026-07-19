import { Card } from '../../components/Card.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

const DEFAULT_TITLE =
  'His English teacher says that he is a good pupil and a great student who always participates in class discussions and finishes his work carefully';
const DEFAULT_TAGS = ['His', 'Her', 'Label', 'Label', 'Label', 'Label'];

export default {
  title: 'Components/Data Display/Cards',
  tags: ['autodocs'],
  args: {
    state: 'default',
    interactive: true,
    stretch: false,
    minWidth: 236,
    themeMode: 'Auto',
    openType: 'openWithButton',
    startExpanded: false,
    title: DEFAULT_TITLE,
    helperText: 'Text here',
    actionLabel: 'Button',
    tags: DEFAULT_TAGS,
  },
  argTypes: {
    openType: {
      control: 'select',
      options: ['openWithButton', 'openWithText'],
      description: 'Expanded layout: tags + action button, or helper text + action button',
    },
    startExpanded: {
      control: 'boolean',
      description: 'Open the card on first render',
    },
    state: {
      control: 'select',
      options: ['default', 'hover'],
      description: 'Static visual state used when interactive mode is off',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hover and expand/collapse interaction in the canvas',
    },
    stretch: { control: 'boolean', description: 'Let the card fill the available row width' },
    minWidth: { control: { type: 'number' }, description: 'Minimum card width' },
    maxWidth: { control: { type: 'number' }, description: 'Maximum card width' },
    title: { control: 'text', description: 'Main title shown in collapsed and expanded states' },
    helperText: { control: 'text', description: 'Helper copy used in the text-based expanded variant' },
    actionLabel: { control: 'text', description: 'Label for the action button inside the expanded card' },
    tags: { control: 'object', description: 'Tag pills used in the tags-and-button expanded variant' },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
    },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible information cards with a compact closed state and two expanded patterns: helper text or tag list plus action button.',
      },
    },
  },
};

function attachCardInteractivity(el) {
  // Chips
  el.querySelectorAll('[data-chip="true"]').forEach((chip) => {
    const restBg = chip.dataset.restBg;
    const hoverBg = chip.dataset.hoverBg;
    chip.addEventListener('mouseenter', () => { chip.style.background = hoverBg; });
    chip.addEventListener('mouseleave', () => { chip.style.background = restBg; });
  });

  // Action button
  const btn = el.querySelector('button[data-btn-type]');
  if (btn) {
    const restBg = btn.dataset.restBg;
    const hoverBg = btn.dataset.hoverBg;
    let hovered = false;
    let pressTimer = null;
    let pressStart = 0;

    btn.addEventListener('mouseenter', () => {
      hovered = true;
      if (!pressTimer) btn.style.background = hoverBg;
    });
    btn.addEventListener('mouseleave', () => {
      hovered = false;
      if (!pressTimer) btn.style.background = restBg;
    });
    btn.addEventListener('mousedown', () => {
      pressStart = Date.now();
      if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
      btn.style.background = hoverBg; // use hover as pressed (no separate pressed token)
    });
    btn.addEventListener('mouseup', () => {
      const elapsed = Date.now() - pressStart;
      const delay = Math.max(0, 150 - elapsed);
      pressTimer = setTimeout(() => {
        pressTimer = null;
        btn.style.background = hovered ? hoverBg : restBg;
      }, delay);
    });
  }
}

/** Interactive card that toggles between close and openType on title-row click. */
function makeInteractiveCard({ title, helperText, actionLabel, tags, stretch, minWidth, openType, startExpanded, theme }) {
  const el = document.createElement('div');
  el.style.display = 'contents';

  let isOpen = Boolean(startExpanded);
  const expandedType = openType || 'openWithButton';

  const update = () => {
    const type = isOpen ? expandedType : 'close';
    el.innerHTML = Card({ type, state: 'default', title, helperText, actionLabel, tags, minWidth: stretch ? undefined : minWidth, theme });
    if (stretch) {
      const card = el.querySelector('.ui-card');
      if (card) card.style.width = '100%';
    }
    const titleRow = el.querySelector('.ui-card > div');
    if (titleRow) {
      titleRow.style.cursor = 'pointer';
      titleRow.addEventListener('click', () => {
        isOpen = !isOpen;
        update();
      });
    }
    attachCardInteractivity(el);
  };

  update();
  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveCard({ ...args, theme });
  },
};

export const CloseVariant = {
  args: { openType: 'openWithButton', startExpanded: false, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Card({ ...args, type: 'close', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsed card state with title preview only.',
      },
    },
  },
};

export const OpenWithTagsAndButton = {
  args: { openType: 'openWithButton', startExpanded: true, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Card({ ...args, type: 'openWithButton', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Expanded card with tags and a single action button.',
      },
    },
  },
};

export const OpenWithTextAndButton = {
  args: { openType: 'openWithText', startExpanded: true, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Card({ ...args, type: 'openWithText', theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Expanded card with helper copy and a single action button.',
      },
    },
  },
};

export const StretchLayout = {
  args: { stretch: true, interactive: false },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const { title, helperText, actionLabel, tags } = args;
    const narrow = Card({ type: 'close', title, helperText, actionLabel, tags, minWidth: 236, theme });
    const wide = Card({ type: 'close', title, helperText, actionLabel, tags, minWidth: 236, theme });
    return `<div style="display:grid;gap:16px;">
      <div style="width:236px;">${narrow}</div>
      <div style="width:min(100%,760px);">${wide.replace('width:236px', 'width:100%')}</div>
    </div>`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare the same card in narrow and wide containers.',
      },
    },
  },
};
