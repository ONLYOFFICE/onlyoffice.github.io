import { resolveTheme } from './theme-utils.js';
import { cardsByTheme } from '../data/cards.ts';

const CHEVRON_DOWN = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRON_UP = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 12L10 8L6 12" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const DEFAULT_TITLE = "His English teacher says that he is a good pupil and a great student who always participates in class discussions and finishes his work carefully";
const DEFAULT_TAGS = ["His", "Her", "Label", "Label", "Label", "Label"];

export function Card({
  type = 'close',
  state = 'default',
  theme,
  minWidth = 236,
  title = DEFAULT_TITLE,
  helperText = 'Text here',
  actionLabel = 'Button',
  tags = DEFAULT_TAGS,
} = {}) {
  const resolved = resolveTheme(theme);
  const tokens = cardsByTheme[resolved] ?? cardsByTheme['Light'];
  const isModern = resolved.startsWith('Modern');
  const isHover = state === 'hover';
  const isExpanded = type !== 'close';

  const fontSize = isModern ? 12 : 11;

  const containerBg = (type === 'close' && isHover) ? tokens.closeHoverBackground : tokens.background;

  const containerStyle = [
    `width:${minWidth}px`, `min-width:${minWidth}px`, `padding:6px`,
    `border-radius:${tokens.radius}px`, `border:1px solid ${tokens.border}`,
    `background:${containerBg}`, `display:inline-flex`,
    `flex-direction:${type === 'close' ? 'row' : 'column'}`,
    `align-items:${type === 'close' ? 'center' : 'flex-start'}`,
    `justify-content:center`, `gap:${type === 'close' ? 4 : 10}px`,
    `box-sizing:border-box`,
  ].join(';');

  const textStyle = `flex:1 1 0;min-width:0;font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:${isModern ? 0.24 : 0.22}px;color:${tokens.textColor};${isExpanded ? 'display:block;white-space:normal;overflow-wrap:anywhere;' : 'overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;'}`;

  const chevron = isExpanded ? CHEVRON_UP(tokens.iconColor) : CHEVRON_DOWN(tokens.iconColor);

  const titleRow = `<div style="width:100%;display:flex;align-items:${isExpanded ? 'flex-start' : 'center'};gap:4px;">
    <div style="${textStyle}">${title}</div>
    ${chevron}
  </div>`;

  let expandedContent = '';
  if (type === 'openWithButton') {
    const chips = tags.map(tag => `<div data-chip="true" data-rest-bg="${tokens.chipBackground}" data-hover-bg="${tokens.closeHoverBackground}" style="height:24px;min-width:48px;padding:0 12px;border-radius:31px;border:1px solid ${tokens.chipBorder};background:${tokens.chipBackground};color:${tokens.chipTextColor};font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:16px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">${tag}</div>`).join('');
    const actionBg = isHover ? tokens.actionPrimaryHoverBackground : tokens.actionPrimaryBackground;
    expandedContent = `
      <div style="width:100%;display:flex;flex-wrap:wrap;gap:8px;">${chips}</div>
      <div style="width:100%;">
        <button type="button" data-btn-type="primary" data-rest-bg="${tokens.actionPrimaryBackground}" data-hover-bg="${tokens.actionPrimaryHoverBackground}" style="width:100%;height:${tokens.actionHeight}px;padding:0 32px;border:none;border-radius:${tokens.radius === 4 ? 4 : 1}px;background:${actionBg};color:${tokens.actionPrimaryTextColor};display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">
          <span style="text-align:center;font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:${isModern ? 0.24 : 0.22}px;white-space:nowrap;color:${tokens.actionPrimaryTextColor};">${actionLabel}</span>
        </button>
      </div>`;
  } else if (type === 'openWithText') {
    const actionBg = isHover ? tokens.actionSecondaryHoverBackground : tokens.actionSecondaryBackground;
    expandedContent = `
      <div style="width:100%;color:${tokens.subTextColor};font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:${isModern ? 0.24 : 0.22}px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${helperText}</div>
      <div style="width:100%;">
        <button type="button" data-btn-type="secondary" data-rest-bg="${tokens.actionSecondaryBackground}" data-hover-bg="${tokens.actionSecondaryHoverBackground}" style="width:100%;height:${tokens.actionHeight}px;padding:0 32px;border-radius:${tokens.radius === 4 ? 4 : 1}px;border:1px solid ${tokens.actionSecondaryBorder};background:${actionBg};color:${tokens.actionSecondaryTextColor};display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">
          <span style="text-align:center;font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:${isModern ? 0.24 : 0.22}px;white-space:nowrap;color:${tokens.actionSecondaryTextColor};">${actionLabel}</span>
        </button>
      </div>`;
  }

  return `<div class="ui-card" style="${containerStyle}">${titleRow}${expandedContent}</div>`;
}
