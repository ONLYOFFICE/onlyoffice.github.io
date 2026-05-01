import { tabsByTheme } from '../data/tabs.ts';
import { resolveTheme } from './theme-utils.js';

const COPY_SVG = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 5H12V7H13V5C13 4.44772 12.5523 4 12 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13H6V12H4V5Z" fill="${color}"/><path d="M11 6H5V7H11V6Z" fill="${color}"/><path d="M15 11V10H9V11H15Z" fill="${color}"/><path d="M15 12V13H9V12H15Z" fill="${color}"/><path d="M15 15V14H9V15H15Z" fill="${color}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V9C17 8.44772 16.5523 8 16 8H8ZM8 9V16H16V9H8Z" fill="${color}"/><path d="M6 8H5V9H6V8Z" fill="${color}"/><path d="M5 10H6V11H5V10Z" fill="${color}"/></svg>`;

/**
 * Tabs — HTML-rendering version
 * @param {object} props
 * @param {Array<{id:string, label:string}>} [props.items]
 * @param {string} [props.activeId]
 * @param {string} [props.hoveredId]
 * @param {boolean} [props.withIcon]
 * @param {string} [props.theme]
 * @param {boolean} [props.scaled]
 */
export function Tabs({ items = [{ id: 'paragraph', label: 'Paragraph' }, { id: 'table', label: 'Table' }, { id: 'style', label: 'Style' }], activeId = 'paragraph', hoveredId, withIcon = false, theme, scaled = false } = {}) {
  const resolved = resolveTheme(theme);
  const tokens = tabsByTheme[resolved] ?? tabsByTheme['Light'];
  const isModern = resolved.startsWith('Modern');

  const tabs = items.map((item) => {
    const isActive = item.id === activeId;
    const isHovered = item.id === hoveredId;
    const bg = isHovered ? tokens.hoverBg : isActive ? tokens.selectedBg : tokens.unselectedBg;
    const borderBottom = isActive ? 'none' : `1px solid ${tokens.border}`;
    const contentHeight = isModern && isActive ? 37 : 40;

    const indicator = (isModern && isActive)
      ? `<span aria-hidden="true" style="height:${tokens.indicatorHeight ?? 3}px;width:100%;background:${tokens.indicatorColor ?? 'transparent'};display:block;"></span>`
      : '';

    const iconHtml = withIcon ? COPY_SVG(tokens.text) : '';

    return `<button type="button" role="tab" aria-selected="${isActive}" style="appearance:none;-webkit-appearance:none;outline:none;height:40px;padding:0;border:1px solid ${tokens.border};border-bottom:${borderBottom};background:${bg};color:${tokens.text};box-sizing:border-box;display:inline-flex;flex-direction:column;align-items:stretch;justify-content:flex-start;cursor:pointer;${scaled ? 'flex:1;' : ''}">
      <span style="height:${contentHeight}px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;gap:4px;font-size:${tokens.typography.fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:${tokens.typography.fontWeight};line-height:${tokens.typography.lineHeight}px;letter-spacing:${tokens.typography.letterSpacing}px;color:${tokens.text};white-space:nowrap;">${iconHtml}${item.label}</span>
      ${indicator}
    </button>`;
  }).join('');

  return `<div class="ui-tabs" role="tablist" style="display:${scaled ? 'flex' : 'inline-flex'};${scaled ? 'width:100%;' : ''}background:transparent;">${tabs}</div>`;
}
