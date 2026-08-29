import { scrollByTheme, scrollSizePixels } from '../data/scroll.ts';
import { resolveTheme } from './theme-utils.js';

const ARROW_UP_SVG = (color) =>
  `<svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true"><path d="M3 0H4V1H5V2H6V3H7V4H0V3H1V2H2V1H3V0Z" fill="${color}"/></svg>`;

const ARROW_DOWN_SVG = (color) =>
  `<svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true" style="transform:rotate(180deg);"><path d="M3 0H4V1H5V2H6V3H7V4H0V3H1V2H2V1H3V0Z" fill="${color}"/></svg>`;

function notchLines(notchColor, notchWidth) {
  return Array.from({ length: 7 }, () =>
    `<span style="display:block;height:1px;width:${notchWidth}px;background:${notchColor};flex-shrink:0;"></span>`
  ).join('');
}

/**
 * Scroll — HTML string generator for a scrollbar component.
 *
 * @param {object} [opts]
 * @param {'vertical'|'horizontal'} [opts.orientation='vertical']
 * @param {'XS'|'S'|'M'} [opts.size='M']
 * @param {'withButtons'|'withoutButtons'} [opts.type='withoutButtons']
 * @param {'default'|'hover'|'pressed'} [opts.state='default']
 * @param {number} [opts.length=167] - total rendered length in px
 * @param {number} [opts.viewportSize=100] - visible viewport size
 * @param {number} [opts.contentSize=200] - full scrollable content size
 * @param {number} [opts.scrollValue=0] - current scroll position (0..contentSize-viewportSize)
 * @param {string} [opts.theme]
 * @returns {string} HTML string
 */
export function Scroll({
  orientation = 'vertical',
  size = 'M',
  type = 'withoutButtons',
  state = 'default',
  length = 167,
  viewportSize = 100,
  contentSize = 200,
  scrollValue = 0,
  theme,
} = {}) {
  const resolved = resolveTheme(theme);
  const themeTokens = scrollByTheme[resolved] ?? scrollByTheme['Light'];
  const tokens = themeTokens[state] ?? themeTokens['default'];

  const isHorizontal = orientation === 'horizontal';
  const showButtons = type === 'withButtons';
  const effectiveSize = showButtons ? 'M' : size;
  const metrics = scrollSizePixels[effectiveSize];
  const liftTokens = tokens.lift[effectiveSize];
  const buttonTokens = tokens.button;

  const totalLength = Math.max(48, length);
  const trackLength = Math.max(
    24,
    totalLength - (showButtons ? metrics.button * 2 + metrics.gap * 2 : 0),
  );

  const viewport = Math.max(1, viewportSize);
  const content = Math.max(viewport, contentSize);
  const maxValue = Math.max(0, content - viewport);

  const thumbRaw = Math.round((viewport / content) * trackLength);
  const thumbMin = effectiveSize === 'XS' ? 18 : 24;
  const thumbLength = Math.max(Math.min(thumbMin, trackLength), Math.min(thumbRaw, trackLength));
  const travel = Math.max(0, trackLength - thumbLength);
  const clampedValue = Math.max(0, Math.min(scrollValue, maxValue));
  const thumbPosition = travel === 0 || maxValue === 0 ? 0 : (clampedValue / maxValue) * travel;
  const thumbCrossOffset = Math.floor((metrics.frameCross - metrics.railInner) / 2);

  // Track container style
  const trackW = isHorizontal ? trackLength : metrics.frameCross;
  const trackH = isHorizontal ? metrics.frameCross : trackLength;
  const trackStyle = `position:relative;width:${trackW}px;height:${trackH}px;box-sizing:border-box;`;

  // Thumb style
  const thumbLeft = isHorizontal ? thumbPosition : thumbCrossOffset;
  const thumbTop = isHorizontal ? thumbCrossOffset : thumbPosition;
  const thumbW = isHorizontal ? thumbLength : metrics.railInner;
  const thumbH = isHorizontal ? metrics.railInner : thumbLength;
  const thumbStyle = [
    'position:absolute',
    `left:${thumbLeft}px`,
    `top:${thumbTop}px`,
    `width:${thumbW}px`,
    `height:${thumbH}px`,
    `background:${liftTokens.bg}`,
    `border:1px solid ${liftTokens.border}`,
    `border-radius:${metrics.radius}px`,
    'box-sizing:border-box',
    'display:inline-flex',
    'align-items:center',
    'justify-content:center',
  ].join(';');

  const notchHtml = metrics.hasNotching
    ? isHorizontal
      ? `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;">${
          Array.from({ length: 7 }, () =>
            `<span style="display:block;width:1px;height:${metrics.notch}px;background:${liftTokens.notch};flex-shrink:0;"></span>`
          ).join('')
        }</div>`
      : `<div style="display:grid;grid-template-rows:repeat(7,1fr);gap:1px;">${notchLines(liftTokens.notch, metrics.notch)}</div>`
    : '';

  const trackHtml = `<div style="${trackStyle}"><div style="${thumbStyle}">${notchHtml}</div></div>`;

  // Button style
  const buttonStyle = [
    `width:${metrics.button}px`,
    `height:${metrics.button}px`,
    `border:1px solid ${buttonTokens.border}`,
    'border-radius:1px',
    `background:${buttonTokens.bg}`,
    'display:inline-flex',
    'align-items:center',
    'justify-content:center',
    'box-sizing:border-box',
    'cursor:pointer',
    'padding:0',
  ].join(';');

  const btnBefore = showButtons
    ? `<button type="button" aria-label="${isHorizontal ? 'Scroll left' : 'Scroll up'}" style="${buttonStyle}">${ARROW_UP_SVG(buttonTokens.arrow)}</button>`
    : '';
  const btnAfter = showButtons
    ? `<button type="button" aria-label="${isHorizontal ? 'Scroll right' : 'Scroll down'}" style="${buttonStyle}">${ARROW_DOWN_SVG(buttonTokens.arrow)}</button>`
    : '';

  // Root container
  const rootStyle = [
    'display:inline-flex',
    `flex-direction:${isHorizontal ? 'row' : 'column'}`,
    `gap:${metrics.gap}px`,
    'align-items:center',
    'justify-content:flex-start',
    'user-select:none',
  ].join(';');

  return `<div role="scrollbar" aria-orientation="${orientation}" aria-valuemin="0" aria-valuemax="${maxValue}" aria-valuenow="${Math.round(clampedValue)}" style="${rootStyle}">${btnBefore}${trackHtml}${btnAfter}</div>`;
}
