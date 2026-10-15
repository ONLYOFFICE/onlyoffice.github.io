import { radioTokens, resolveRadioTheme } from '../data/radio.ts';

/**
 * Radio — HTML-rendering version
 * @param {object} props
 * @param {string} [props.label]
 * @param {'no'|'yes'} [props.selected]
 * @param {'default'|'hover'|'disabled'} [props.state]
 * @param {string} [props.theme]
 */
export function Radio({ label = 'Text', selected = 'no', state = 'default', theme = 'Light' } = {}) {
  const resolvedTheme = resolveRadioTheme(theme);
  const token = radioTokens[resolvedTheme][state][selected];
  const isDisabled = state === 'disabled';

  const dot = selected === 'yes' && token.dotFill
    ? `<circle cx="7" cy="7" r="4" fill="${token.dotFill}" fill-opacity="${token.dotOpacity ?? 1}"/>`
    : '';

  return `<button type="button" role="radio" aria-checked="${selected === 'yes'}"
    aria-disabled="${isDisabled}" class="ui-radio${isDisabled ? ' ui-radio--disabled' : ''}"
    style="justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;padding:2px 4px;border-radius:4px;"
    ${isDisabled ? 'disabled' : ''}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6.5" fill="${token.outerFill}" stroke="${token.outerStroke}"/>
      ${dot}
    </svg>
    <span style="color:${token.textColor};font-size:${token.fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:${token.lineHeight}px;letter-spacing:${token.letterSpacing}px;text-align:left;">${label}</span>
  </button>`;
}
