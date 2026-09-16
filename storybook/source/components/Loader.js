import { getTokens } from './theme-utils.js';

/**
 * Loader — HTML-rendering version
 * @param {object} props
 * @param {'S'|'M'} [props.size]
 * @param {string} [props.label]
 * @param {boolean} [props.overlay]
 * @param {string} [props.theme]
 */
export function Loader({ size = 'S', label = 'Loading...', overlay = false, theme } = {}) {
  const tokens = getTokens(theme);
  const spinnerSize = size === 'M' ? 28 : 20;
  const fontSize = size === 'M' ? 15 : tokens.isModern ? 12 : 11;
  const lineHeight = size === 'M' ? 20 : 16;
  const gap = size === 'M' ? 12 : 8;
  const letterSpacing = size === 'M' ? 0.3 : tokens.isModern ? 0.24 : 0.22;

  const fg = overlay ? '#FFFFFF' : tokens.fg;
  const borderColor = overlay ? 'rgba(255,255,255,0.25)' : tokens.border;

  const overlayBg = {
    'Light': 'rgba(68, 68, 68, 0.95)',
    'Light Classic': '#000000a6',
    'Modern Light': '#383838',
    'Modern Dark': '#343434',
    'Dark Contrast': 'rgba(18, 18, 18, 0.95)',
    'Dark': 'rgba(24, 24, 24, 0.95)',
  };

  const bg = overlay ? (overlayBg[tokens.theme] ?? 'rgba(68,68,68,0.95)') : 'transparent';

  return `<div style="display:inline-flex;align-items:center;gap:${gap}px;padding:${overlay ? '24px 32px' : '0'};border-radius:${overlay ? 8 : 0}px;box-sizing:border-box;background:${bg};">
    <span class="ui-loader-spinner" style="width:${spinnerSize}px;height:${spinnerSize}px;border-radius:50%;border:2px solid ${borderColor};border-top-color:${fg};display:inline-block;"></span>
    <span style="color:${fg};font-family:Arial,Helvetica,sans-serif;font-size:${fontSize}px;line-height:${lineHeight}px;letter-spacing:${letterSpacing}px;">${label}</span>
  </div>`;
}
