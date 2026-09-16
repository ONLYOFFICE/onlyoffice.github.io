import { iconSvgs } from '../../data/icon-svgs.ts';

export default {
  title: 'Foundations/Icons',
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        component: 'Icon catalog used by components across the kit.',
      },
    },
  },
};

const iconEntries = Object.keys(iconSvgs)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ name, svg: iconSvgs[name] }));

function iconCard(name, svg) {
  return `<div style="
    border: 1px solid var(--page-border);
    background: var(--page-surface);
    border-radius: 6px;
    padding: 8px;
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 8px;
    align-items: center;
  ">
    <span style="
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: var(--page-bg);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--page-border);
      flex-shrink: 0;
    ">${svg}</span>
    <span style="
      font-size: 11px;
      line-height: 16px;
      color: var(--page-fg);
      font-family: Arial, sans-serif;
      word-break: break-word;
    ">${name}</span>
  </div>`;
}

export const Catalog = {
  name: 'Catalog',
  render: (args, context) => {
    const theme = context.globals.theme || 'Light';
    const isDark = theme === 'Dark' || theme === 'Modern Dark' || theme === 'Dark Contrast';
    const svgFilter = isDark ? 'invert(1)' : 'none';
    return `<div style="display:grid;gap:16px;">
      <div style="color:var(--page-muted);font-size:12px;font-family:Arial,sans-serif;">
        Total icons: ${iconEntries.length}
      </div>
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 10px;
      ">
        ${iconEntries.map(({ name, svg }) => {
          const themedSvg = svg.replace(
            /(<svg[^>]*)>/,
            `$1 style="display:block;filter:${svgFilter};">`
          );
          return iconCard(name, themedSvg);
        }).join('')}
      </div>
    </div>`;
  },
  parameters: {
    docs: {
      description: {
        story: 'All available icons sorted alphabetically. Switch themes using the toolbar to preview icon appearance on dark backgrounds.',
      },
    },
  },
};
