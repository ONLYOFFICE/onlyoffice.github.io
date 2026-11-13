import { resolveTheme } from './theme-utils.js';

const PREVIEW_THEMES = {
  'Light':        { bg: 'rgba(0, 0, 0, 0.80)',    fg: '#FFFFFF', shadow: '0px 4px 10px rgba(0, 0, 0, 0.10)' },
  'Light Classic':{ bg: '#444444',                 fg: '#FFFFFF', shadow: '0px 4px 10px rgba(0, 0, 0, 0.10)' },
  'Dark':         { bg: 'rgba(255, 255, 255, 0.80)',fg: '#444444', shadow: '0px 4px 10px rgba(0, 0, 0, 0.40)' },
  'Dark Contrast':{ bg: '#E8E8E8',                 fg: '#2A2A2A', shadow: '0px 4px 10px rgba(0, 0, 0, 0.40)' },
  'Modern Light': { bg: '#383838',                 fg: '#FFFFFF', shadow: '0px 4px 10px rgba(0, 0, 0, 0.10)' },
  'Modern Dark':  { bg: '#EAEAEA',                 fg: '#222222', shadow: '0px 4px 10px rgba(0, 0, 0, 0.10)' },
};

const ARROW_PATH = {
  back: 'M8 12L17.5 2L16.5 1L6 12L16.5 23L17.5 22L8 12Z',
  next: 'M16 12L6.5 22L7.5 23L18 12L7.5 1L6.5 2L16 12Z',
};

export function PreviewControl({ direction = 'back', state = 'default', theme, isDisabled = false } = {}) {
  const resolved = resolveTheme(theme);
  const resolvedTheme = PREVIEW_THEMES[resolved] ?? PREVIEW_THEMES['Light'];

  const isHover   = state === 'hover';
  const isPressed = state === 'pressed';
  const disabled  = isDisabled || state === 'disabled';

  const shadow = isPressed ? '0px 2px 6px rgba(0, 0, 0, 0.30)'
               : isHover   ? '0px 6px 12px rgba(0, 0, 0, 0.18)'
               :              resolvedTheme.shadow;

  const transform = isPressed ? 'translateY(0.5px)' : 'none';
  const opacity   = disabled ? '0.45' : '1';

  const path = ARROW_PATH[direction] ?? ARROW_PATH.back;

  return `<button
    type="button"
    aria-label="${direction === 'back' ? 'Previous' : 'Next'}"
    style="
      display:inline-flex;
      align-items:center;
      justify-content:center;
      width:40px;
      height:40px;
      border-radius:50%;
      border:none;
      outline:none;
      cursor:${disabled ? 'not-allowed' : 'pointer'};
      background:${resolvedTheme.bg};
      color:${resolvedTheme.fg};
      box-shadow:${shadow};
      transform:${transform};
      opacity:${opacity};
      box-sizing:border-box;
      padding:0;
      transition:box-shadow 120ms ease, opacity 120ms ease;
      flex-shrink:0;
    "
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="${path}" fill="${resolvedTheme.fg}"/>
    </svg>
  </button>`;
}
