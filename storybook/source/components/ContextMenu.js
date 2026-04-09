import { getTokens } from './theme-utils.js';

const ICON_SVG = (color) => `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C8.4 2 7 3.1 7 4.5V5H5.5C4.7 5 4 5.7 4 6.5V15.5C4 16.3 4.7 17 5.5 17H14.5C15.3 17 16 16.3 16 15.5V6.5C16 5.7 15.3 5 14.5 5H13V4.5C13 3.1 11.6 2 10 2ZM10 3C11.1 3 12 3.7 12 4.5V5H8V4.5C8 3.7 8.9 3 10 3ZM5.5 6H14.5C14.8 6 15 6.2 15 6.5V15.5C15 15.8 14.8 16 14.5 16H5.5C5.2 16 5 15.8 5 15.5V6.5C5 6.2 5.2 6 5.5 6Z" fill="${color}"/></svg>`;
const SUBMENU_SVG = (color) => `<svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M2 1L4 3L2 5" stroke="${color}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const PRESSED_BG = {
  'Light': '#CBCBCB', 'Light Classic': '#7D858C', 'Dark': '#666666',
  'Dark Contrast': '#666666', 'Modern Light': '#DCE7FA', 'Modern Dark': '#375478',
};

const DEFAULT_ITEMS = [
  { id: '1', label: 'Menu item', type: 'iconLeft' },
  { id: '2', label: 'Menu item', type: 'iconsBoth' },
  { id: '3', label: 'Menu item', type: 'noIcon' },
  { id: '4', label: 'Menu item', type: 'iconLeft', disabled: true },
];

export function ContextMenu({
  items = DEFAULT_ITEMS,
  theme,
  isHoveredIndex = -1,
  isClickedIndex = -1,
  defaultOpenId,
} = {}) {
  const tokens = getTokens(theme);
  const isModern = tokens.isModern;
  const pressedBg = PRESSED_BG[tokens.theme] ?? tokens.surfaceAlt;

  const fontSize = isModern ? 12 : 11;

  const itemsHtml = items.map((item, index) => {
    const hasSubmenu = Boolean(item.items && item.items.length > 0);
    const isSubmenuOpen = defaultOpenId === item.id;
    const isItemHovered = isHoveredIndex === index || isSubmenuOpen;
    const isItemPressed = isClickedIndex === index;
    const iconColor = item.disabled ? tokens.muted : tokens.fg;
    const bg = item.disabled ? 'transparent'
      : isItemPressed ? pressedBg
      : isItemHovered ? tokens.surfaceAlt
      : 'transparent';

    const showRightIcon = item.type === 'iconsBoth' || hasSubmenu;
    const padding = item.type === 'noIcon' ? '5px 20px' : '3px 10px';

    const submenuHtml = (hasSubmenu && isSubmenuOpen)
      ? `<div style="position:absolute;left:100%;top:0;z-index:1;">${ContextMenu({ items: item.items, theme })}</div>`
      : '';

    return `<div style="position:${hasSubmenu ? 'relative' : 'static'};">
      <button type="button" style="width:100%;min-height:26px;border:none;border-radius:0;background:${bg};padding:${padding};color:${item.disabled ? tokens.muted : tokens.fg};display:flex;align-items:center;gap:4px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;font-size:${fontSize}px;line-height:16px;letter-spacing:${isModern ? 0.24 : 0.22}px;cursor:${item.disabled ? 'default' : 'pointer'};text-align:left;">
        ${item.type !== 'noIcon' ? `<span style="width:20px;display:inline-flex;justify-content:center;">${ICON_SVG(iconColor)}</span>` : ''}
        <span style="flex:1;min-width:0;">${item.label}</span>
        ${showRightIcon ? `<span style="width:20px;display:inline-flex;justify-content:center;">${SUBMENU_SVG(iconColor)}</span>` : ''}
      </button>
      ${submenuHtml}
    </div>`;
  }).join('');

  return `<div style="min-width:180px;border:1px solid ${tokens.border};background:${tokens.bg};border-radius:2px;padding:4px 0;display:inline-grid;box-sizing:border-box;">${itemsHtml}</div>`;
}
