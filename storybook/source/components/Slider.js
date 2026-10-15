import { sliderTokens } from '../data/slider.ts';
import { resolveTheme } from './theme-utils.js';

/**
 * Slider — HTML-rendering version
 *
 * @param {object} opts
 * @param {number} [opts.value]
 * @param {number} [opts.min]
 * @param {number} [opts.max]
 * @param {string} [opts.label]
 * @param {boolean} [opts.showValue]
 * @param {boolean} [opts.disabled]
 * @param {string} [opts.theme]
 * @param {number} [opts.width]
 */
export function Slider({
  value = 40,
  min = 0,
  max = 100,
  label = '',
  showValue = false,
  disabled = false,
  theme = 'Light',
  width = 220,
} = {}) {
  const resolved = resolveTheme(theme);
  const t = sliderTokens[resolved] ?? sliderTokens['Light'];

  const clampedValue = Math.max(min, Math.min(max, value));
  const pct = max === min ? 0 : Math.round(((clampedValue - min) / (max - min)) * 100);

  const disabledOpacity = disabled ? 0.5 : 1;

  const trackStyle = [
    `width:${width}px`,
    `height:4px`,
    `border-radius:2px`,
    `background:linear-gradient(to right, ${t.onTrack} ${pct}%, ${t.offTrack} ${pct}%)`,
    `position:relative`,
    `display:flex`,
    `align-items:center`,
  ].join(';');

  const thumbShadow = t.thumb.shadow ? `;box-shadow:${t.thumb.shadow}` : '';

  const thumbStyle = [
    `width:${t.thumb.size}px`,
    `height:${t.thumb.size}px`,
    `border-radius:50%`,
    `background:${t.thumb.fill}`,
    `border:${t.thumb.strokeWidth}px solid ${t.thumb.stroke}`,
    `position:absolute`,
    `left:calc(${pct}% - ${t.thumb.size / 2}px)`,
    `cursor:${disabled ? 'not-allowed' : 'pointer'}`,
    `box-sizing:border-box`,
  ].join(';') + thumbShadow;

  const labelHtml = label
    ? `<div style="color:${t.label.color};font-size:${t.label.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${t.label.lineHeight}px;letter-spacing:${t.label.letterSpacing}px;margin-bottom:6px;">${label}</div>`
    : '';

  const valueHtml = showValue
    ? `<span style="color:${t.label.color};font-size:${t.label.fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:700;margin-left:8px;white-space:nowrap;">${clampedValue}</span>`
    : '';

  const trackAndThumb = `<div style="position:relative;width:${width}px;height:20px;display:flex;align-items:center;">
      <div style="${trackStyle}">
        <div style="${thumbStyle}"></div>
      </div>
    </div>`;

  return `<div style="display:inline-flex;flex-direction:column;opacity:${disabledOpacity};">
    ${labelHtml}
    <div style="display:flex;align-items:center;">
      ${trackAndThumb}
      ${valueHtml}
    </div>
  </div>`;
}
