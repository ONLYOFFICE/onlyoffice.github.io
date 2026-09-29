import { textAreaTokens } from '../data/text-area.ts';
import { resolveTheme } from './theme-utils.js';

const SAMPLE_TEXT = `The 10 most undervalued stocks from our Best Companies to Own list as of Feb. 28, 2023, were:
Comcast CMCSA — a leading global media and technology company with businesses in cable, entertainment, and theme parks.
Taiwan Semiconductor Manufacturing TSM — the world's largest dedicated semiconductor foundry serving major chip designers.
Roche Holding RHHBY — a global pioneer in pharmaceuticals and diagnostics focused on oncology and rare diseases.
Walt Disney DIS — a diversified entertainment company spanning film, television, streaming, and theme park experiences.
Equifax EFX — one of the three major credit reporting agencies providing data analytics and risk solutions worldwide.
TransUnion TRU — a global information and insights company helping businesses manage risk and consumers manage credit.
International Flavors & Fragrances IFF — a leading creator of flavors, fragrances, and specialty ingredients.
Zimmer Biomet ZBH — a global medical device company specializing in musculoskeletal healthcare and reconstructive products.
Kenvue KVUE — a consumer health company spun off from Johnson & Johnson managing iconic personal care brands.
Anheuser-Busch InBev BUD — the world's largest brewer with a portfolio of over 500 beer brands sold globally.
Booking Holdings BKNG — the world's leading provider of online travel and related services across 220+ countries.
Stellantis STLA — a multinational automotive manufacturer formed from the merger of PSA Group and Fiat Chrysler.
Medtronic MDT — a global leader in medical devices, therapies, and services for chronic disease management.`;

const COPY_SVG = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 5H12V7H13V5C13 4.44772 12.5523 4 12 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13H6V12H4V5Z" fill="${color}"/><path d="M11 6H5V7H11V6Z" fill="${color}"/><path d="M15 11V10H9V11H15Z" fill="${color}"/><path d="M15 12V13H9V12H15Z" fill="${color}"/><path d="M15 15V14H9V15H15Z" fill="${color}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V9C17 8.44772 16.5523 8 16 8H8ZM8 9V16H16V9H8Z" fill="${color}"/><path d="M6 8H5V9H6V8Z" fill="${color}"/><path d="M5 10H6V11H5V10Z" fill="${color}"/></svg>`;

/**
 * TextArea — HTML-rendering version
 *
 * @param {object} opts
 * @param {string} [opts.label]
 * @param {string} [opts.caption]
 * @param {string} [opts.value]
 * @param {'default'|'disabled'|'scroll'|'no-scroll'} [opts.state]
 * @param {number} [opts.width]
 * @param {number} [opts.height]
 * @param {boolean} [opts.showLabel]
 * @param {boolean} [opts.showCaption]
 * @param {boolean} [opts.showCopyButton]
 * @param {string} [opts.theme]
 */
export function TextArea({
  label = 'Title',
  caption = 'Caption',
  value = SAMPLE_TEXT,
  state = 'default',
  width = 236,
  height = 188,
  showLabel = true,
  showCaption = true,
  showCopyButton = true,
  theme = 'Light',
} = {}) {
  const resolved = resolveTheme(theme);
  const t = textAreaTokens[resolved] ?? textAreaTokens['Light'];

  const isDisabled = state === 'disabled';
  const forceScroll = state === 'scroll';
  const forceNoScroll = state === 'no-scroll';

  const copyButtonSize = t.copyIconStyle === 'modern' ? 24 : 20;

  const headerHtml = (showLabel || showCopyButton)
    ? `<div style="display:flex;align-items:center;justify-content:space-between;min-height:20px;">
        ${showLabel ? `<label style="color:${t.labelColor};font-weight:${t.labelWeight};font-size:${t.labelTypography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${t.labelTypography.lineHeight}px;letter-spacing:${t.labelTypography.letterSpacing}px;">${label}</label>` : '<span></span>'}
        ${showCopyButton ? `<button type="button" aria-label="Copy text" ${isDisabled ? 'disabled' : ''} style="width:${copyButtonSize}px;height:${copyButtonSize}px;padding:0;border:none;background:transparent;cursor:${isDisabled ? 'default' : 'pointer'};opacity:${isDisabled ? t.disabledOpacity : 1};display:inline-flex;align-items:center;justify-content:center;">${COPY_SVG(t.copyIconColor)}</button>` : ''}
      </div>`
    : '';

  const overflow = isDisabled || forceNoScroll ? 'hidden' : forceScroll ? 'scroll' : 'auto';
  const whiteSpace = forceScroll ? 'pre' : 'pre-wrap';
  const paddingRight = forceNoScroll || isDisabled ? '0' : '3px';
  const paddingBottom = forceNoScroll || isDisabled ? '0' : '4px';

  const textareaStyle = [
    `width:100%`,
    `height:100%`,
    `border:none`,
    `outline:none`,
    `resize:none`,
    `background:transparent`,
    `color:${isDisabled ? t.disabledTextColor : t.textColor}`,
    `font-family:Arial,Helvetica,sans-serif`,
    `font-size:${t.textTypography.fontSize}px`,
    `line-height:${t.textTypography.lineHeight}px`,
    `letter-spacing:${t.textTypography.letterSpacing}px`,
    `padding-top:0`,
    `padding-left:0`,
    `padding-right:${paddingRight}`,
    `padding-bottom:${paddingBottom}`,
    `margin:0`,
    `overflow:${overflow}`,
    `white-space:${whiteSpace}`,
    `word-break:break-word`,
    `box-sizing:border-box`,
    `scrollbar-color:${t.scrollThumb} ${t.scrollTrack}`,
    `scrollbar-width:thin`,
    isDisabled ? `pointer-events:none` : '',
  ].filter(Boolean).join(';');

  const captionHtml = showCaption
    ? `<span style="color:${t.captionColor};font-size:${t.captionTypography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${t.captionTypography.lineHeight}px;letter-spacing:${t.captionTypography.letterSpacing}px;">${caption}</span>`
    : '';

  const gap = showCaption ? 2 : 4;

  return `<div style="width:${width}px;display:grid;gap:${gap}px;">
    ${headerHtml}
    <div style="width:${width}px;height:${height}px;border-radius:${t.radius}px;border:1px solid ${t.border};background:${isDisabled ? t.disabledBackground : t.background};opacity:${isDisabled ? t.disabledOpacity : 1};box-sizing:border-box;padding:5px 5px 5px 8px;">
      <textarea ${isDisabled ? 'disabled' : ''} wrap="${forceScroll ? 'off' : 'soft'}" style="${textareaStyle}">${value}</textarea>
    </div>
    ${captionHtml}
  </div>`;
}
