import { Scroll } from '../../components/Scroll.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';
import { scrollByTheme, scrollSizePixels } from '../../data/scroll.ts';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Layout/Scroll',
  tags: ['autodocs'],
  args: {
    orientation: 'vertical',
    size: 'M',
    type: 'withButtons',
    state: 'default',
    length: 167,
    interactive: true,
    isHovered: false,
    isPressed: false,
    viewportSize: 160,
    contentSize: 520,
    step: 24,
    themeMode: 'Auto',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Vertical or horizontal scrollbar layout',
    },
    size: {
      control: 'select',
      options: ['XS', 'S', 'M'],
      description: 'Scrollbar thickness preset',
    },
    type: {
      control: 'select',
      options: ['withButtons', 'withoutButtons'],
      description: 'Scrollbar with arrow buttons or without them',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'pressed'],
      description: 'Static visual state used when interactive mode is off',
    },
    length: { control: 'number', description: 'Rendered scrollbar length in px' },
    viewportSize: { control: 'number', description: 'Visible viewport size used to compute the thumb ratio' },
    contentSize: { control: 'number', description: 'Scrollable content size used to compute the thumb ratio' },
    step: { control: 'number', description: 'Scroll increment for arrow buttons and keyboard input' },
    interactive: {
      control: 'boolean',
      description: 'Allow hover, drag, click, wheel, and arrow-button interaction in the canvas',
    },
    isHovered: { control: 'boolean', description: 'Force hover appearance for review' },
    isPressed: { control: 'boolean', description: 'Force pressed appearance for review' },
    themeMode: {
      name: 'theme',
      control: 'select',
      options: ['Auto', ...THEMES],
      description: 'Auto = current Storybook toolbar theme',
      table: { defaultValue: { summary: 'Auto' } },
    },
    theme: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Scrollbar variants for panel and canvas-like areas. Includes with-buttons and without-buttons styles, multiple thicknesses, and an interactive demo with dragging and wheel input.',
      },
    },
  },
};

/**
 * Interactive scrollbar: drag thumb, click arrow buttons, mouse-wheel.
 * Updates thumb position and visual states (hover/pressed) entirely in-place
 * without any full re-render, so interactions are smooth and uninterrupted.
 */
function makeInteractiveScroll(args, theme) {
  const orientation = args.orientation ?? 'vertical';
  const size        = args.size        ?? 'M';
  const type        = args.type        ?? 'withButtons';
  const totalLength = Math.max(48, args.length ?? 167);
  const viewportSize = args.viewportSize ?? 160;
  const contentSize  = args.contentSize  ?? 520;
  const step         = args.step         ?? 24;
  const isHorizontal = orientation === 'horizontal';
  const showButtons  = type === 'withButtons';
  const effectiveSize = showButtons ? 'M' : size;

  const themeTokens = scrollByTheme[theme] ?? scrollByTheme['Light'];
  const metrics     = scrollSizePixels[effectiveSize];
  const trackLength = Math.max(24, totalLength - (showButtons ? metrics.button * 2 + metrics.gap * 2 : 0));

  const viewport = Math.max(1, viewportSize);
  const content  = Math.max(viewport, contentSize);
  const maxValue = Math.max(0, content - viewport);
  const thumbRaw = Math.round((viewport / content) * trackLength);
  const thumbMin = effectiveSize === 'XS' ? 18 : 24;
  const thumbLength = Math.max(Math.min(thumbMin, trackLength), Math.min(thumbRaw, trackLength));
  const travel      = Math.max(0, trackLength - thumbLength);

  let scrollValue = 0;

  const el = document.createElement('div');
  el.style.display = 'contents';
  el.innerHTML = Scroll({ ...args, theme, scrollValue, state: 'default' });

  const root = el.firstElementChild;
  if (!root) return el;

  const buttons        = [...root.querySelectorAll('button')];
  const trackContainer = root.querySelector('div');
  const thumb          = trackContainer ? trackContainer.firstElementChild : null;
  if (!thumb) return el;

  const updatePosition = () => {
    const clamped = Math.max(0, Math.min(scrollValue, maxValue));
    const pos = travel === 0 || maxValue === 0 ? 0 : (clamped / maxValue) * travel;
    thumb.style[isHorizontal ? 'left' : 'top'] = `${pos}px`;
    root.setAttribute('aria-valuenow', String(Math.round(clamped)));
  };

  const applyThumbState = (state) => {
    const t = (themeTokens[state] ?? themeTokens['default']).lift[effectiveSize];
    thumb.style.background   = t.bg;
    thumb.style.borderColor  = t.border;
    thumb.querySelectorAll('span').forEach(s => { s.style.background = t.notch; });
  };

  const applyButtonState = (btn, state) => {
    const t = (themeTokens[state] ?? themeTokens['default']).button;
    btn.style.background  = t.bg;
    btn.style.borderColor = t.border;
    const path = btn.querySelector('path');
    if (path) path.setAttribute('fill', t.arrow);
  };

  // Thumb drag
  thumb.style.cursor = 'grab';
  let isDragging = false, dragStart = 0, dragStartValue = 0;

  thumb.addEventListener('mouseenter', () => { if (!isDragging) applyThumbState('hover'); });
  thumb.addEventListener('mouseleave', () => { if (!isDragging) applyThumbState('default'); });
  thumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStart      = isHorizontal ? e.clientX : e.clientY;
    dragStartValue = scrollValue;
    applyThumbState('pressed');
    thumb.style.cursor = 'grabbing';
    e.preventDefault();

    const onMove = (e) => {
      const delta = (isHorizontal ? e.clientX : e.clientY) - dragStart;
      if (travel > 0 && maxValue > 0)
        scrollValue = Math.max(0, Math.min(maxValue, dragStartValue + (delta / travel) * maxValue));
      updatePosition();
    };
    const onUp = () => {
      isDragging = false;
      applyThumbState('hover');
      thumb.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  });

  // Arrow buttons
  if (buttons.length >= 2) {
    const setupBtn = (btn, dir) => {
      btn.addEventListener('mouseenter', () => applyButtonState(btn, 'hover'));
      btn.addEventListener('mouseleave', () => applyButtonState(btn, 'default'));
      btn.addEventListener('mousedown',  () => applyButtonState(btn, 'pressed'));
      btn.addEventListener('mouseup',    () => applyButtonState(btn, 'hover'));
      btn.addEventListener('click', () => {
        scrollValue = Math.max(0, Math.min(maxValue, scrollValue + dir * step));
        updatePosition();
      });
    };
    setupBtn(buttons[0], -1);
    setupBtn(buttons[1], +1);
  }

  // Wheel
  root.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = isHorizontal ? (e.deltaX || e.deltaY) : e.deltaY;
    scrollValue = Math.max(0, Math.min(maxValue, scrollValue + (delta > 0 ? step : -step)));
    updatePosition();
  }, { passive: false });

  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveScroll(args, theme);
  },
};

export const WithButtonsM = {
  name: 'WithBtn M',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveScroll({ ...args, orientation: 'vertical', type: 'withButtons', size: 'M' }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium scrollbar with arrow buttons.',
      },
    },
  },
};

export const WithoutButtonsM = {
  name: 'WithoutBtn M',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveScroll({ ...args, orientation: 'vertical', type: 'withoutButtons', size: 'M' }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium scrollbar without arrow buttons.',
      },
    },
  },
};

export const WithoutButtonsS = {
  name: 'WithoutBtn S',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveScroll({ ...args, orientation: 'vertical', type: 'withoutButtons', size: 'S' }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Slim scrollbar without arrow buttons.',
      },
    },
  },
};

export const WithoutButtonsXS = {
  name: 'WithoutBtn XS',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveScroll({ ...args, orientation: 'vertical', type: 'withoutButtons', size: 'XS' }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra-slim scrollbar for dense layouts.',
      },
    },
  },
};

export const Horizontal = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveScroll({
      ...args,
      orientation: 'horizontal',
      type: 'withButtons',
      size: 'M',
      length: 240,
      viewportSize: 180,
      contentSize: 500,
    }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal scrollbar variant with arrow buttons.',
      },
    },
  },
};
