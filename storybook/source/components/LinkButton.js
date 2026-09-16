import linkButtonsData from '../data/link-buttons.ts';

/**
 * LinkButton — HTML-rendering version
 */
export function LinkButton({ label = 'Show advanced settings', state = 'default', theme = 'Light' } = {}) {
  const themeEntry = linkButtonsData[theme] ?? linkButtonsData['Light'];
  const stateKey = state === 'hover' ? 'Hover' : 'Default';
  const token = themeEntry[stateKey] ?? themeEntry['Default'] ?? {};
  const text = token.text ?? {};
  const underlineColor = token.underlineColor ?? text.color ?? 'rgba(0,0,0,0.8)';
  const lh = typeof text.lineHeight === 'number' ? `${text.lineHeight}px` : text.lineHeight ?? '16px';

  return `<button type="button" class="ui-link-button"
    style="display:inline-block;cursor:pointer;border:none;background:transparent;padding:0;">
    <span style="color:${text.color ?? 'rgba(0,0,0,0.8)'};font-size:${text.fontSize ?? 11}px;font-family:Arial,Helvetica,sans-serif;font-weight:${text.fontWeight ?? 400};line-height:${lh};letter-spacing:${text.letterSpacing ?? 0.22}px;text-decoration-line:underline;text-decoration-style:dotted;text-decoration-color:${underlineColor};text-underline-offset:2px;text-decoration-thickness:1px;white-space:nowrap;user-select:none;">${label}</span>
  </button>`;
}
