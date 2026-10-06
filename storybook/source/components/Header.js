import { resolveTheme } from './theme-utils.js';

const HEADER_TOKENS = {
  'Light':        { bg: '#F7F7F7', text: 'rgba(0, 0, 0, 0.80)', panelDivider: '#E0E0E0', windowDivider: '#E0E0E0' },
  'Light Classic':{ bg: '#F1F1F1', text: '#444444', panelDivider: '#D8DADC', windowDivider: '#D8DADC' },
  'Dark':         { bg: '#404040', text: 'rgba(255, 255, 255, 0.80)', panelDivider: '#555555', windowDivider: '#555555' },
  'Dark Contrast':{ bg: '#2A2A2A', text: '#E8E8E8', panelDivider: '#424242', windowDivider: '#555555' },
  'Modern Light': { bg: '#FFFFFF', text: '#383838', panelDivider: '#EAEAEA', windowDivider: '#EAEAEA' },
  'Modern Dark':  { bg: '#404040', text: '#F3F3F3', panelDivider: '#585858', windowDivider: '#585858', windowWeight: 400 },
};

const CLOSE_SVG = (color) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M17.4997 6.50232L11.9993 12.0014M11.9993 12.0014L6.49902 17.5003M11.9993 12.0014L17.4997 17.5003M11.9993 12.0014L6.49919 6.50273" stroke="${color}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const COLLAPSE_SVG = (color) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M6.5 7C6.22386 7 6 7.22386 6 7.5V17.5C6 17.7761 6.22386 18 6.5 18C6.77614 18 7 17.7761 7 17.5V7.5C7 7.22386 6.77614 7 6.5 7ZM12.8535 8.14648C12.6583 7.95122 12.3417 7.95122 12.1465 8.14648L8.14648 12.1465C8.05272 12.2403 8 12.3674 8 12.5C8 12.6326 8.05272 12.7597 8.14648 12.8535L12.1465 16.8535C12.3417 17.0488 12.6583 17.0488 12.8535 16.8535C13.0488 16.6583 13.0488 16.3417 12.8535 16.1465L9.70703 13H18.5C18.7761 13 19 12.7761 19 12.5C19 12.2239 18.7761 12 18.5 12H9.70703L12.8535 8.85352C13.0488 8.65825 13.0488 8.34175 12.8535 8.14648Z" fill="${color}"/>
</svg>`;

/**
 * Header — HTML-rendering version
 * @param {object} props
 * @param {string} [props.title]
 * @param {number} [props.width]
 * @param {'panel'|'window'} [props.variant]
 * @param {string} [props.theme]
 */
export function Header({ title = 'Title', width = 261, variant = 'panel', theme } = {}) {
  const resolved = resolveTheme(theme);
  const tokens = HEADER_TOKENS[resolved] ?? HEADER_TOKENS['Light'];
  const isModern = resolved.startsWith('Modern');
  const isPanel = variant === 'panel';
  const isWindow = variant === 'window';
  const divider = isPanel ? tokens.panelDivider : tokens.windowDivider;
  const titleWeight = isWindow ? (tokens.windowWeight ?? 700) : 700;
  const height = isPanel ? 44 : 34;
  const padding = isPanel ? '11px 12px 12px' : '7px 12px';
  const justify = isPanel ? 'space-between' : 'center';
  const closeSize = (isModern && isPanel) ? 24 : 20;

  const collapseBtn = (isPanel && isModern)
    ? `<button type="button" aria-label="Collapse panel" style="width:24px;height:24px;border:none;background:transparent;padding:0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${COLLAPSE_SVG(tokens.text)}</button>`
    : '';

  const placeholder = isWindow ? `<span style="width:20px;height:20px;flex-shrink:0;" aria-hidden="true"></span>` : '';

  return `<div style="width:${width}px;height:${height}px;background:${tokens.bg};border-bottom:1px solid ${divider};display:flex;align-items:stretch;">
    <div style="width:100%;padding:${padding};display:flex;align-items:center;justify-content:${justify};gap:8px;position:relative;box-sizing:border-box;">
      ${placeholder}
      <div style="color:${tokens.text};font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:${titleWeight};line-height:16px;letter-spacing:0.24px;text-align:${isWindow ? 'center' : 'left'};flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${title}</div>
      <div style="display:inline-flex;align-items:center;gap:${(isModern && isPanel) ? 0 : 4}px;">
        ${collapseBtn}
        <button type="button" aria-label="Close" style="width:${closeSize}px;height:${closeSize}px;border:none;outline:none;background:transparent;padding:0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${CLOSE_SVG(tokens.text)}</button>
      </div>
    </div>
  </div>`;
}
