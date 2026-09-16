import { checkboxTokens, resolveCheckboxTheme } from '../data/checkbox.ts';

const CHECK_PATH = 'M2.75 6.94995L5.75 9.74995L11.25 4.25005';

/**
 * Checkbox — HTML-rendering version
 * @param {object} props
 * @param {string} [props.label]
 * @param {'no'|'yes'|'partial'} [props.selected]
 * @param {'default'|'hover'|'disabled'} [props.state]
 * @param {string} [props.theme]
 * @param {boolean} [props.truncate] - Truncate long label with ellipsis instead of wrapping
 */
export function Checkbox({ label = 'Text', selected = 'no', state = 'default', theme = 'Light', truncate = false } = {}) {
  const resolvedTheme = resolveCheckboxTheme(theme);
  const token = checkboxTokens[resolvedTheme][state][selected];
  const isDisabled = state === 'disabled';
  const fontSize = resolvedTheme.startsWith('Modern') ? 12 : 11;
  const letterSpacing = resolvedTheme.startsWith('Modern') ? 0.24 : 0.22;

  const checkMark = selected === 'yes' && token.markColor
    ? `<path d="${CHECK_PATH}" stroke="${token.markColor}" stroke-opacity="${token.markOpacity ?? 1}" stroke-width="2"/>`
    : '';
  const partialMark = selected === 'partial' && token.markColor
    ? `<rect x="3" y="6" width="8" height="2" fill="${token.markColor}" fill-opacity="${token.markOpacity ?? 1}"/>`
    : '';

  return `<button type="button" role="checkbox" aria-checked="${selected === 'partial' ? 'mixed' : selected === 'yes'}"
    aria-disabled="${isDisabled}" class="ui-checkbox${isDisabled ? ' ui-checkbox--disabled' : ''}"
    style="justify-content:flex-start;align-items:center;gap:8px;display:inline-flex;"
    ${isDisabled ? 'disabled' : ''}>
    <span style="padding-top:2px;padding-bottom:2px;display:flex;align-items:center;">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="13" height="13" rx="${token.boxRadius}" fill="${token.boxFill}" stroke="${token.boxStroke}"/>
        ${checkMark}${partialMark}
      </svg>
    </span>
    <span style="color:${token.textColor};font-size:${fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:16px;letter-spacing:${letterSpacing}px;text-align:left;${truncate ? 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;' : 'word-wrap:break-word;'}">${label}</span>
  </button>`;
}
