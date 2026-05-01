import { textFieldTokens } from '../data/text-field.ts';
import { resolveTheme } from './theme-utils.js';

/**
 * TextField — HTML-rendering version
 *
 * @param {object} opts
 * @param {string} [opts.placeholder]
 * @param {string} [opts.value]
 * @param {string} [opts.label]
 * @param {string} [opts.caption]
 * @param {string} [opts.errorText]
 * @param {'default'|'hover'|'focused'|'typing'|'filled'|'error'|'disabled'} [opts.state]
 * @param {'default'|'hidden'} [opts.placeholderState]
 * @param {boolean} [opts.withIconRight]
 * @param {string} [opts.theme]
 * @param {number} [opts.width]
 */
export function TextField({
  placeholder = 'Enter text',
  value = '',
  label = '',
  caption = '',
  errorText = 'Error text',
  state = 'default',
  placeholderState = 'default',
  withIconRight = false,
  theme = 'Light',
  width = 165,
} = {}) {
  const resolved = resolveTheme(theme);
  const t = textFieldTokens[resolved] ?? textFieldTokens['Light'];

  const isDisabled = state === 'disabled';
  const isError = state === 'error';
  const isHover = state === 'hover';
  const isFocused = state === 'focused' || state === 'typing';

  const borderColor = isError
    ? t.errorBorder
    : (isHover || isFocused)
      ? (t.hoverBorder ?? t.focusBorder)
      : t.border;

  const showPlaceholder = placeholderState !== 'hidden';

  // For focused state we show a visual focus ring via box-shadow
  const boxShadow = isFocused
    ? `0 0 0 2px ${(t.focusBorder ?? t.hoverBorder)}33`
    : 'none';

  const inputStyle = [
    `flex:1`,
    `min-width:0`,
    `border:none`,
    `outline:none`,
    `background:transparent`,
    `color:${isDisabled ? t.disabledTextColor : t.valueColor}`,
    `font-size:${t.typography.fontSize}px`,
    `font-family:Arial,Helvetica,sans-serif`,
    `line-height:${t.typography.lineHeight}px`,
    `letter-spacing:${t.typography.letterSpacing}px`,
    `padding:0`,
    `height:20px`,
  ].join(';');

  const wrapStyle = [
    `height:24px`,
    `display:flex`,
    `align-items:center`,
    `gap:8px`,
    `padding:0 8px`,
    `border-radius:${t.radius}px`,
    `border:1px solid ${borderColor}`,
    `background:${isDisabled ? t.disabledBackground : t.background}`,
    `opacity:${isDisabled ? t.disabledOpacity : 1}`,
    `box-sizing:border-box`,
  ].join(';');

  const labelHtml = label
    ? `<label style="color:${t.titleColor};font-weight:${t.titleWeight};font-size:${t.typography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${t.typography.lineHeight}px;letter-spacing:${t.typography.letterSpacing}px;">${label}</label>`
    : '';

  // Caption: show errorText when in error state, otherwise show caption
  const captionText = isError ? errorText : caption;
  const captionHtml = captionText
    ? `<div style="color:${isError ? t.errorTextColor : t.captionColor};font-size:${t.captionTypography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${t.captionTypography.lineHeight}px;">${captionText}</div>`
    : '';

  // Optional trailing icon — chevron icon SVG inline
  const iconHtml = withIconRight
    ? `<div style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;pointer-events:none;">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 7.00195L7 9.99976L10 12.9976L13 9.99976L10 7.00195ZM10 7.00249L7.75 9.25084L10 11.4992L12.25 9.25084L10 7.00249Z" fill="${t.iconColor}"/>
        </svg>
      </div>`
    : '';

  return `<div style="width:${width}px;display:grid;gap:4px;">
    ${labelHtml}
    <div style="${wrapStyle}">
      <input type="text" placeholder="${showPlaceholder ? placeholder : ''}" value="${value}" style="${inputStyle}" ${isDisabled ? 'disabled' : ''}/>
      ${iconHtml}
    </div>
    ${captionHtml}
  </div>`;
}
