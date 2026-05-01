import { getTokens } from './theme-utils.js';

/**
 * Tooltip — HTML-rendering version
 */
export function Tooltip({ text = 'Texts', theme } = {}) {
  const tokens = getTokens(theme);
  const isModern = tokens.isModern;
  const isDark = tokens.isDark;
  const fontSize = isModern ? 12 : 10;
  const lineHeight = isModern ? '16px' : '12px';
  const letterSpacing = isModern ? 0.24 : 0.2;
  const boxShadow = isDark
    ? '0px 4px 10px rgba(0, 0, 0, 0.25)'
    : '0px 4px 10px rgba(0, 0, 0, 0.10)';

  return `<div style="min-height:28px;padding:4px 8px;border-radius:2px;border:1px solid ${tokens.border};background:${tokens.bg};color:${tokens.fg};box-shadow:${boxShadow};display:inline-flex;align-items:center;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;font-size:${fontSize}px;line-height:${lineHeight};letter-spacing:${letterSpacing}px;">${text}</div>`;
}
