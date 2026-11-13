import { getTokens } from './theme-utils.js';

const CHEVRON_SVG = (color) => `<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 2.5L4 5.5L7 2.5" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_SVG = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C8.4 2 7 3.1 7 4.5V5H5.5C4.7 5 4 5.7 4 6.5V15.5C4 16.3 4.7 17 5.5 17H14.5C15.3 17 16 16.3 16 15.5V6.5C16 5.7 15.3 5 14.5 5H13V4.5C13 3.1 11.6 2 10 2ZM10 3C11.1 3 12 3.7 12 4.5V5H8V4.5C8 3.7 8.9 3 10 3ZM5.5 6H14.5C14.8 6 15 6.2 15 6.5V15.5C15 15.8 14.8 16 14.5 16H5.5C5.2 16 5 15.8 5 15.5V6.5C5 6.2 5.2 6 5.5 6Z" fill="${color}"/></svg>`;

const PRESSED_BG = {
  'Light': '#CBCBCB', 'Light Classic': '#7D858C', 'Dark': '#666666',
  'Dark Contrast': '#666666', 'Modern Light': '#DCE7FA', 'Modern Dark': '#375478',
};

export function SplitButton({
  label = 'Button',
  state = 'default',
  type = 'dropDown',
  theme,
  isOpen = false,
  items = [
    { id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' }, { id: '4', label: 'Disabled option', disabled: true }
  ],
} = {}) {
  const tokens = getTokens(theme);
  const resolved = tokens.theme;
  const isModern = tokens.isModern;
  const radius = isModern ? 4 : 1;
  const isDisabled = state === 'disabled';
  const isHover = state === 'hover';
  const isPressed = state === 'pressed';

  const defaultBg = tokens.bg;
  const hoverBg = tokens.surfaceAlt;
  const pressedBg = PRESSED_BG[resolved] ?? tokens.surfaceAlt;

  const pressedText = (resolved === 'Light Classic' || resolved === 'Modern Dark') ? '#FFFFFF' : tokens.fg;
  const iconDefaultColor = (type === 'iconLeft' && resolved === 'Modern Dark') ? '#F3F3F3' : tokens.fg;

  const fontSize = isModern ? 12 : 11;
  const commonStyle = [
    `height:24px`, `border:none`, `outline:none`,
    `font-family:Arial,Helvetica,sans-serif`, `font-size:${fontSize}px`,
    `line-height:16px`, `letter-spacing:${isModern ? 0.24 : 0.22}px`,
    `cursor:${isDisabled ? 'not-allowed' : 'pointer'}`, `box-sizing:border-box`,
    `white-space:nowrap`, `display:inline-flex`, `align-items:center`, `justify-content:center`,
  ].join(';');

  const opacity = isDisabled ? 'opacity:0.6;' : '';

  if (type === 'dropDown') {
    // Label button always stays at defaultBg; only the chevron changes state
    const iconBg = isOpen ? pressedBg : isHover ? hoverBg : defaultBg;
    const iconColor = (isOpen || isPressed) ? pressedText : tokens.fg;
    const dropdownHtml = isOpen ? `
      <div style="position:absolute;top:calc(100% + 2px);left:0;z-index:100;min-width:100%;border:1px solid ${tokens.border};background:${tokens.bg};border-radius:2px;padding:4px 0;box-sizing:border-box;">
        ${items.map(item => `<button type="button" style="width:100%;min-height:26px;border:none;border-radius:0;background:transparent;padding:5px 20px;color:${item.disabled ? tokens.muted : tokens.fg};display:flex;align-items:center;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;font-size:${fontSize}px;font-weight:400;cursor:${item.disabled ? 'default' : 'pointer'};text-align:left;white-space:nowrap;">${item.label}</button>`).join('')}
      </div>` : '';

    return `<div style="display:inline-block;position:relative;${opacity}">
      <div style="display:inline-flex;border-radius:${radius}px;overflow:hidden;border:1px solid ${tokens.border};">
        <button type="button" style="${commonStyle};background:${defaultBg};color:${tokens.fg};min-width:96px;padding:0 12px;font-weight:${isModern ? 400 : 700};">${label}</button>
        <button type="button" aria-label="Open menu" style="${commonStyle};background:${iconBg};color:${iconColor};width:24px;min-width:24px;padding:0;border-left:1px solid ${tokens.border};">${CHEVRON_SVG(iconColor)}</button>
      </div>
      ${dropdownHtml}
    </div>`;
  }

  if (type === 'iconLeft') {
    const bg = isPressed ? pressedBg : isHover ? hoverBg : defaultBg;
    const color = isDisabled ? tokens.muted : isPressed ? pressedText : iconDefaultColor;
    return `<div style="display:inline-block;${opacity}">
      <div style="display:inline-flex;border-radius:${radius}px;overflow:hidden;border:1px solid ${tokens.border};">
        <button type="button" style="${commonStyle};background:${bg};color:${color};padding:0 12px;gap:4px;justify-content:flex-start;font-weight:${isModern ? 400 : 700};">
          ${ICON_SVG(color)}<span>${label}</span>
        </button>
      </div>
    </div>`;
  }

  // tabs type — single pill button, no separator or chevron
  const bg = isPressed ? pressedBg : isHover ? hoverBg : defaultBg;
  const color = isDisabled ? tokens.muted : isPressed ? pressedText : tokens.fg;
  const tabsBorder = (isModern && isPressed) ? 'transparent' : tokens.border;
  return `<div style="display:inline-block;${opacity}">
    <div style="display:inline-flex;border-radius:31px;overflow:hidden;border:1px solid ${tabsBorder};">
      <button type="button" style="${commonStyle};background:${bg};color:${color};min-width:48px;padding:0 12px;font-weight:400;">${label}</button>
    </div>
  </div>`;
}
