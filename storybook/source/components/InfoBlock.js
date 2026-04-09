import { infoBlockTokens } from '../data/info-block.ts';
import { resolveTheme } from './theme-utils.js';

const ALERT_SVG = (bg, mark) => `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
  <rect width="12" height="12" rx="6" fill="${bg}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.14288 9.59985L6.85717 9.59985L6.85717 7.88557L5.14288 7.88557L5.14288 9.59985ZM5.14288 7.19985L6.85717 7.19985L6.85717 2.39985L5.14289 2.39985L5.14288 7.19985Z" fill="${mark}"/>
</svg>`;

const CLOSE_MIN_SVG = (color) => `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.00838 8.72823L3.59718 9.14194L2.88793 8.43698L3.29914 8.02327L4.12155 7.19585L5.29498 6.01528L4.00049 4.71291L3.23857 3.94634L2.8576 3.56306L3.56686 2.8581L3.94782 3.24139L4.70974 4.00795L5.99995 5.30602L7.29024 4.00788L8.05217 3.24132L8.43314 2.85803L9.14238 3.56299L8.76142 3.94627L7.99949 4.71284L6.70492 6.01528L7.87843 7.19593L8.70085 8.02336L9.11206 8.43707L8.40281 9.14203L7.9916 8.72832L7.16918 7.90089L5.99995 6.72454L4.8308 7.90081L4.00838 8.72823Z" fill="${color}"/>
</svg>`;

/**
 * InfoBlock — HTML-rendering version
 */
export function InfoBlock({ title = 'Title', description = 'Description', showTitle = true, showDescription = true, iconMode = 'left', theme } = {}) {
  const resolved = resolveTheme(theme);
  const tokens = infoBlockTokens[resolved] ?? infoBlockTokens['Light'];
  const showLeftIcon = showTitle && (iconMode === 'left' || iconMode === 'both');
  const showRightIcon = showTitle && (iconMode === 'right' || iconMode === 'both');

  const titleRow = showTitle ? `<div style="display:flex;align-items:center;gap:8px;">
    ${showLeftIcon ? ALERT_SVG(tokens.alertBackground, tokens.alertMark) : ''}
    <span style="flex:1 1 0;min-width:0;color:${tokens.titleColor};font-family:Arial,Helvetica,sans-serif;font-size:${tokens.titleTypography.fontSize}px;font-weight:${tokens.titleTypography.fontWeight};line-height:${tokens.titleTypography.lineHeight}px;letter-spacing:${tokens.titleTypography.letterSpacing}px;">${title}</span>
    ${showRightIcon ? `<button type="button" style="width:12px;height:12px;padding:0;border:none;background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${CLOSE_MIN_SVG(tokens.closeColor)}</button>` : ''}
  </div>` : '';

  const descRow = showDescription ? `<div style="color:${tokens.descriptionColor};font-family:Arial,Helvetica,sans-serif;font-size:${tokens.descriptionTypography.fontSize}px;font-weight:${tokens.descriptionTypography.fontWeight};line-height:${tokens.descriptionTypography.lineHeight}px;letter-spacing:${tokens.descriptionTypography.letterSpacing}px;">${description}</div>` : '';

  const gap = (showTitle && showDescription) ? 4 : 0;

  return `<div style="width:220px;padding:8px;border-radius:${tokens.radius}px;border:1px solid ${tokens.border};background:${tokens.background};display:grid;gap:${gap}px;box-sizing:border-box;">
    ${titleRow}${descRow}
  </div>`;
}
