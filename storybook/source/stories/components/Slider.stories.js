import { Slider } from '../../components/Slider.js';
import { resolveStoryTheme, pluginThemeOptions } from '../../components/theme-utils.js';

const THEMES = pluginThemeOptions;

export default {
  title: 'Components/Form/Slider',
  tags: ['autodocs'],
  args: {
    value: 40,
    min: 0,
    max: 100,
    showValue: false,
    disabled: false,
    themeMode: 'Auto',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current slider value',
    },
    min: { control: 'number', description: 'Minimum allowed value' },
    max: { control: 'number', description: 'Maximum allowed value' },
    step: { control: 'number', description: 'Step increment between values' },
    showValue: { control: 'boolean', description: 'Show the numeric value on the right' },
    disabled: { control: 'boolean', description: 'Show the disabled state' },
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
          'Single-value slider for compact numeric adjustment with optional inline value display.',
      },
    },
  },
};

/**
 * Build an interactive DOM wrapper that lets the user drag/click the thumb
 * visually by updating only the track gradient and thumb position in-place.
 * Re-rendering the full HTML during drag destroys the <input> and breaks dragging.
 */
function makeInteractiveSlider(args, theme) {
  const el = document.createElement('div');
  el.style.display = 'contents';

  const min = args.min ?? 0;
  const max = args.max ?? 100;
  let value = args.value ?? 40;

  // Initial render only — no re-render during drag
  el.innerHTML = Slider({ ...args, theme, value });

  const wrapper = el.firstElementChild;
  if (!wrapper) return el;

  // Structure: wrapper(col) > [labelDiv?] + flexRow(flex) > posWrapper(rel,h:20) > trackEl(grad) > thumbEl
  // Use direct child traversal to avoid fragile multi-level CSS selectors.
  const flexRow = [...wrapper.children].find(c => c.style.display === 'flex') ?? wrapper.lastElementChild;
  const posWrapper = flexRow ? flexRow.children[0] : null;
  const trackEl = posWrapper ? posWrapper.children[0] : null;
  const thumbEl = trackEl ? trackEl.children[0] : null;

  if (!posWrapper) return el;

  const rangeInput = document.createElement('input');
  rangeInput.type = 'range';
  rangeInput.min = String(min);
  rangeInput.max = String(max);
  rangeInput.step = String(args.step ?? 1);
  rangeInput.value = String(value);

  Object.assign(rangeInput.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    cursor: args.disabled ? 'not-allowed' : 'pointer',
    margin: '0',
    padding: '0',
  });

  if (args.disabled) rangeInput.disabled = true;

  posWrapper.appendChild(rangeInput);

  rangeInput.addEventListener('input', (e) => {
    value = Number(e.target.value);
    const pct = max === min ? 0 : Math.round(((value - min) / (max - min)) * 100);

    if (trackEl) {
      const m = trackEl.style.background.match(/linear-gradient\(to right,\s*(.+?)\s+\d+%,\s*(.+?)\s+\d+%\)/);
      if (m) {
        trackEl.style.background = `linear-gradient(to right, ${m[1]} ${pct}%, ${m[2]} ${pct}%)`;
      }
    }
    if (thumbEl) {
      const halfSize = parseFloat(thumbEl.style.width) / 2;
      thumbEl.style.left = `calc(${pct}% - ${halfSize}px)`;
    }
  });

  return el;
}

export const Default = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveSlider(args, theme);
  },
};

export const WithValue = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveSlider({ ...args, showValue: true }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with the current numeric value shown inline.',
      },
    },
  },
};

export const Min = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Slider({ ...args, value: args.min ?? 0, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider positioned at the minimum value.',
      },
    },
  },
};

export const Max = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Slider({ ...args, value: args.max ?? 100, theme });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider positioned at the maximum value.',
      },
    },
  },
};
