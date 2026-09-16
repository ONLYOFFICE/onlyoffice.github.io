import { resolveTheme } from './theme-utils.js';
import iconButtonsData from '../data/icon-buttons.ts';

const HIGHLIGHT_SVG = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9142 4.54282L16.5 5.1286C17.281 5.90965 17.281 7.17598 16.5 7.95703L9.91421 14.5428C9.29313 15.1639 8.36518 15.2911 7.6184 14.9244L6.5 16.0428H3.5L6.1184 13.4244C5.75171 12.6776 5.87891 11.7497 6.5 11.1286L13.0858 4.54282C13.8668 3.76177 15.1332 3.76177 15.9142 4.54282ZM15.2071 5.24992C14.8166 4.8594 14.1834 4.8594 13.7929 5.24992L13.3536 5.68926L15.3536 7.68926L15.7929 7.24992C16.1834 6.8594 16.1834 6.22624 15.7929 5.83571L15.2071 5.24992ZM7.20711 11.8357L12.6464 6.39637L14.6464 8.39637L9.20711 13.8357C8.81658 14.2262 8.18342 14.2262 7.79289 13.8357L7.20711 13.2499C6.81658 12.8594 6.81658 12.2262 7.20711 11.8357Z" fill="${color}"/></svg>`;


const TYPE_KEY = { outline: 'Outline', solid: 'Solid', rightExpander: 'RightExpander' };
const STATE_KEY = { default: 'Default', hover: 'Hover', pressed: 'Pressed' };

function containerToStyle(container) {
  if (!container) return '';
  const skip = new Set(['display', 'justifyContent', 'alignItems', 'gap', 'overflow', 'flexDirection']);
  return Object.entries(container)
    .filter(([k]) => !skip.has(k))
    .map(([k, v]) => {
      const prop = k.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (prop === 'border-radius') return `${prop}:${v}px`;
      if (prop === 'outline-offset') return `${prop}:${v}px`;
      if (prop === 'width') return `width:${v}px`;
      if (prop === 'height') return `height:${v}px`;
      if (prop === 'padding') return `padding:${v}px`;
      return `${prop}:${v}`;
    })
    .join(';');
}

export function IconButton({ type = 'outline', state = 'default', theme } = {}) {
  const resolved = resolveTheme(theme);
  const themeData = iconButtonsData[resolved] ?? iconButtonsData['Light'];
  const typeData = themeData[TYPE_KEY[type]] ?? themeData['Outline'];
  const token = typeData[STATE_KEY[state]] ?? typeData['Default'] ?? {};
  const container = token.container ?? {};
  const iconColor = token.iconColor ?? 'rgba(0,0,0,0.8)';

  const borderRadiusCss = container.borderRadius != null
    ? `border-radius:${container.borderRadius}px`
    : [
        container.borderTopLeftRadius != null     ? `border-top-left-radius:${container.borderTopLeftRadius}px`     : '',
        container.borderTopRightRadius != null    ? `border-top-right-radius:${container.borderTopRightRadius}px`    : '',
        container.borderBottomRightRadius != null ? `border-bottom-right-radius:${container.borderBottomRightRadius}px` : '',
        container.borderBottomLeftRadius != null  ? `border-bottom-left-radius:${container.borderBottomLeftRadius}px`  : '',
      ].filter(Boolean).join(';');

  const containerStyle = [
    `width:${container.width ?? 24}px`,
    `height:${container.height ?? 24}px`,
    `box-sizing:border-box`,
    `display:inline-flex`,
    `align-items:center`,
    `justify-content:center`,
    `border:none`,
    `outline:none`,
    `cursor:pointer`,
    container.background ? `background:${container.background}` : 'background:transparent',
    borderRadiusCss,
    container.outline ? `outline:${container.outline}` : '',
    container.outlineOffset != null ? `outline-offset:${container.outlineOffset}px` : '',
  ].filter(Boolean).join(';');

  // Mirror the reference SvgIcon wrapper: span with fixed 20×20 size and flex-shrink:0
  // so the icon is never squished inside the flex button regardless of padding.
  const iconSpanStyle = 'width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;line-height:0;flex-shrink:0;';
  const icon = `<span aria-hidden="true" style="${iconSpanStyle}">${HIGHLIGHT_SVG(iconColor)}</span>`;

  return `<button type="button" style="${containerStyle}" aria-label="Icon button">${icon}</button>`;
}
