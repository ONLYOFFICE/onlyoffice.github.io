export default {
  title: 'Foundations/Colors',
  parameters: {
    docs: {
      description: {
        component:
          'Semantic color tokens for all 6 plugin themes. Use the tabs to switch between themes. Click any swatch to copy its value.',
      },
    },
  },
};

// ─── Token data for all 6 themes ─────────────────────────────────────────────

const TOOLBAR_HEADER = [
  { name: 'Document',     value: '#446995', desc: 'Document editor toolbar' },
  { name: 'Spreadsheet',  value: '#40865C', desc: 'Spreadsheet editor toolbar' },
  { name: 'Presentation', value: '#BE664F', desc: 'Presentation editor toolbar' },
  { name: 'Forms',        value: '#AA5252', desc: 'Forms editor toolbar' },
];

const colorPalette = {
  Light: {
    Background: [
      { name: 'Normal',                  value: '#FFFFFF',                  desc: 'Content area, buttons' },
      { name: 'Toolbar',                 value: '#F7F7F7',                  desc: 'Left panel, toolbar' },
      { name: 'Toolbar Additional',      value: '#EFEFEF',                  desc: 'Inactive tabs' },
      { name: 'Primary Dialog Button',   value: '#444444',                  desc: 'Dialog buttons, tab underline' },
      { name: 'Loader',                  value: 'rgba(68, 68, 68, 0.95)',   desc: 'Loader overlay' },
      { name: 'Scrim',                   value: 'rgba(0, 0, 0, 0.20)',      desc: 'Modal backdrop' },
      { name: 'Notification Popover',    value: '#FCFED7',                  desc: 'Notification popups' },
    ],
    Highlight: [
      { name: 'Button Hover',                    value: '#E0E0E0', desc: 'Hover state' },
      { name: 'Button Pressed',                  value: '#CBCBCB', desc: 'Pressed state' },
      { name: 'Button Pressed Hover',            value: '#BABABA', desc: 'After press' },
      { name: 'Primary Dialog Button Hover',     value: '#1C1C1C', desc: 'Dialog button hover' },
    ],
    Border: [
      { name: 'Toolbar',         value: '#CBCBCB', desc: 'Toolbar divider, panel' },
      { name: 'Regular Control', value: '#C0C0C0', desc: 'Input border' },
      { name: 'Control Focus',   value: '#848484', desc: 'Active input border' },
      { name: 'Error',           value: '#F62211', desc: 'Error input border' },
    ],
    Text: [
      { name: 'Normal',    value: 'rgba(0, 0, 0, 0.80)', desc: 'Primary text' },
      { name: 'Secondary', value: 'rgba(0, 0, 0, 0.60)', desc: 'Secondary text' },
      { name: 'Tertiary',  value: 'rgba(0, 0, 0, 0.40)', desc: 'Tertiary text' },
      { name: 'Inverse',   value: '#FFFFFF',              desc: 'Text on dark backgrounds' },
      { name: 'Error',     value: '#F62211',              desc: 'Error text' },
    ],
    Icon: [
      { name: 'Normal',   value: 'rgba(0, 0, 0, 0.80)', desc: 'Primary icons' },
      { name: 'Inverse',  value: '#FFFFFF',              desc: 'Icons on dark backgrounds' },
      { name: 'Tertiary', value: 'rgba(0, 0, 0, 0.50)', desc: 'Secondary icons' },
    ],
    Scroll: [
      { name: 'Thumb',         value: '#F7F7F7', desc: 'Scrollbar thumb' },
      { name: 'Thumb Hover',   value: '#CBCBCB', desc: 'Scrollbar thumb hover' },
      { name: 'Thumb Pressed', value: '#ADADAD', desc: 'Scrollbar thumb pressed' },
      { name: 'Thumb Border',  value: '#CBCBCB', desc: 'Scrollbar thumb border' },
      { name: 'Arrow',         value: '#ADADAD', desc: 'Scroll arrow' },
      { name: 'Arrow Hover',   value: '#F7F7F7', desc: 'Scroll arrow hover & pressed' },
    ],
    'Toolbar Header': TOOLBAR_HEADER,
  },

  'Light Classic': {
    Background: [
      { name: 'Normal',                value: '#FFFFFF',                 desc: 'Content area, buttons' },
      { name: 'Toolbar',               value: '#F1F1F1',                 desc: 'Left panel, toolbar' },
      { name: 'Toolbar Additional',    value: '#F1F1F1',                 desc: 'Inactive tabs' },
      { name: 'Primary Dialog Button', value: '#7D858C',                 desc: 'Dialog buttons, tab underline' },
      { name: 'Loader',                value: 'rgba(0, 0, 0, 0.65)',     desc: 'Loader overlay' },
      { name: 'Scrim',                 value: 'rgba(0, 0, 0, 0.20)',     desc: 'Modal backdrop' },
      { name: 'Notification Popover',  value: '#FCFED7',                 desc: 'Notification popups' },
    ],
    Highlight: [
      { name: 'Button Hover',                value: '#D8DADC', desc: 'Hover state' },
      { name: 'Button Pressed',              value: '#7D858C', desc: 'Pressed state' },
      { name: 'Button Pressed Hover',        value: '#7D858C', desc: 'After press' },
      { name: 'Primary Dialog Button Hover', value: '#666D73', desc: 'Dialog button hover' },
    ],
    Border: [
      { name: 'Toolbar',         value: '#CBCBCB', desc: 'Toolbar divider, panel' },
      { name: 'Regular Control', value: '#CFCFCF', desc: 'Input border' },
      { name: 'Control Focus',   value: '#848484', desc: 'Active input border' },
      { name: 'Error',           value: '#D9534F', desc: 'Error input border' },
    ],
    Text: [
      { name: 'Normal',    value: '#444444', desc: 'Primary text' },
      { name: 'Secondary', value: '#A5A5A5', desc: 'Secondary text' },
      { name: 'Tertiary',  value: '#A5A5A5', desc: 'Tertiary text' },
      { name: 'Inverse',   value: '#FFFFFF', desc: 'Text on dark backgrounds' },
      { name: 'Error',     value: '#D9534F', desc: 'Error text' },
    ],
    Icon: [
      { name: 'Normal',   value: '#444444', desc: 'Primary icons' },
      { name: 'Inverse',  value: '#FFFFFF', desc: 'Icons on dark backgrounds' },
      { name: 'Tertiary', value: '#A5A5A5', desc: 'Secondary icons' },
    ],
    Scroll: [
      { name: 'Thumb',         value: '#F1F1F1', desc: 'Scrollbar thumb' },
      { name: 'Thumb Hover',   value: '#CFCFCF', desc: 'Scrollbar thumb hover' },
      { name: 'Thumb Pressed', value: '#ADADAD', desc: 'Scrollbar thumb pressed' },
      { name: 'Thumb Border',  value: '#CFCFCF', desc: 'Scrollbar thumb border' },
      { name: 'Arrow',         value: '#ADADAD', desc: 'Scroll arrow' },
      { name: 'Arrow Hover',   value: '#F1F1F1', desc: 'Scroll arrow hover & pressed' },
    ],
    'Toolbar Header': TOOLBAR_HEADER,
  },

  'Modern Light': {
    Background: [
      { name: 'Normal',                value: '#FFFFFF',                  desc: 'Content area, buttons' },
      { name: 'Toolbar',               value: '#FFFFFF',                  desc: 'Left panel, toolbar' },
      { name: 'Toolbar Additional',    value: '#F3F3F3',                  desc: 'Inactive tabs' },
      { name: 'Primary Dialog Button', value: '#4473CA',                  desc: 'Dialog buttons, tab underline' },
      { name: 'Loader',                value: 'rgba(56, 56, 56, 0.95)',   desc: 'Loader overlay' },
      { name: 'Scrim',                 value: 'rgba(0, 0, 0, 0.20)',      desc: 'Modal backdrop' },
      { name: 'Notification Popover',  value: '#FCFED7',                  desc: 'Notification popups' },
    ],
    Highlight: [
      { name: 'Button Hover',                value: '#F9F9F9', desc: 'Hover state' },
      { name: 'Button Pressed',              value: '#EAEAEA', desc: 'Pressed state' },
      { name: 'Button Pressed Hover',        value: '#DCE7FA', desc: 'After press' },
      { name: 'Primary Dialog Button Hover', value: '#2A5BB9', desc: 'Dialog button hover' },
    ],
    Border: [
      { name: 'Toolbar',         value: '#E1E1E1', desc: 'Toolbar divider, panel' },
      { name: 'Regular Control', value: '#E1E1E1', desc: 'Input border' },
      { name: 'Control Focus',   value: '#4473CA', desc: 'Active input border' },
      { name: 'Error',           value: '#F62211', desc: 'Error input border' },
    ],
    Text: [
      { name: 'Normal',    value: '#383838',                  desc: 'Primary text' },
      { name: 'Secondary', value: 'rgba(56, 56, 56, 0.60)',   desc: 'Secondary text' },
      { name: 'Tertiary',  value: 'rgba(56, 56, 56, 0.40)',   desc: 'Tertiary text' },
      { name: 'Inverse',   value: '#FFFFFF',                  desc: 'Text on dark backgrounds' },
      { name: 'Error',     value: '#F62211',                  desc: 'Error text' },
    ],
    Icon: [
      { name: 'Normal',   value: '#383838',                 desc: 'Primary icons' },
      { name: 'Inverse',  value: '#FFFFFF',                 desc: 'Icons on dark backgrounds' },
      { name: 'Tertiary', value: 'rgba(56, 56, 56, 0.50)',  desc: 'Secondary icons' },
    ],
    Scroll: [
      { name: 'Thumb',         value: '#F3F3F3', desc: 'Scrollbar thumb' },
      { name: 'Thumb Hover',   value: '#E1E1E1', desc: 'Scrollbar thumb hover' },
      { name: 'Thumb Pressed', value: '#C8C8C8', desc: 'Scrollbar thumb pressed' },
      { name: 'Thumb Border',  value: '#E1E1E1', desc: 'Scrollbar thumb border' },
      { name: 'Arrow',         value: '#C8C8C8', desc: 'Scroll arrow' },
      { name: 'Arrow Hover',   value: '#F3F3F3', desc: 'Scroll arrow hover & pressed' },
    ],
    'Toolbar Header': TOOLBAR_HEADER,
  },

  'Modern Dark': {
    Background: [
      { name: 'Normal',                value: '#404040',                  desc: 'Content area, buttons' },
      { name: 'Toolbar',               value: '#404040',                  desc: 'Left panel, toolbar' },
      { name: 'Toolbar Additional',    value: '#303030',                  desc: 'Inactive tabs' },
      { name: 'Primary Dialog Button', value: '#4A7BE0',                  desc: 'Dialog buttons, tab underline' },
      { name: 'Loader',                value: 'rgba(64, 64, 64, 0.95)',   desc: 'Loader overlay' },
      { name: 'Scrim',                 value: 'rgba(0, 0, 0, 0.40)',      desc: 'Modal backdrop' },
      { name: 'Notification Popover',  value: '#3A3A3A',                  desc: 'Notification popups' },
    ],
    Highlight: [
      { name: 'Button Hover',                value: '#585858', desc: 'Hover state' },
      { name: 'Button Pressed',              value: '#686868', desc: 'Pressed state' },
      { name: 'Button Pressed Hover',        value: '#375478', desc: 'After press' },
      { name: 'Primary Dialog Button Hover', value: '#366CDA', desc: 'Dialog button hover' },
    ],
    Border: [
      { name: 'Toolbar',         value: '#686868', desc: 'Toolbar divider, panel' },
      { name: 'Regular Control', value: '#686868', desc: 'Input border' },
      { name: 'Control Focus',   value: '#4A7BE0', desc: 'Active input border' },
      { name: 'Error',           value: '#FF6B6B', desc: 'Error input border' },
    ],
    Text: [
      { name: 'Normal',    value: '#F3F3F3',                    desc: 'Primary text' },
      { name: 'Secondary', value: 'rgba(243, 243, 243, 0.70)',  desc: 'Secondary text' },
      { name: 'Tertiary',  value: 'rgba(243, 243, 243, 0.50)',  desc: 'Tertiary text' },
      { name: 'Inverse',   value: '#404040',                    desc: 'Text on light backgrounds' },
      { name: 'Error',     value: '#FF6B6B',                    desc: 'Error text' },
    ],
    Icon: [
      { name: 'Normal',   value: '#F3F3F3',                   desc: 'Primary icons' },
      { name: 'Inverse',  value: '#404040',                   desc: 'Icons on light backgrounds' },
      { name: 'Tertiary', value: 'rgba(243, 243, 243, 0.50)', desc: 'Secondary icons' },
    ],
    Scroll: [
      { name: 'Thumb',         value: '#585858', desc: 'Scrollbar thumb' },
      { name: 'Thumb Hover',   value: '#686868', desc: 'Scrollbar thumb hover' },
      { name: 'Thumb Pressed', value: '#787878', desc: 'Scrollbar thumb pressed' },
      { name: 'Thumb Border',  value: '#686868', desc: 'Scrollbar thumb border' },
      { name: 'Arrow',         value: '#686868', desc: 'Scroll arrow' },
      { name: 'Arrow Hover',   value: '#585858', desc: 'Scroll arrow hover & pressed' },
    ],
    'Toolbar Header': TOOLBAR_HEADER,
  },

  Dark: {
    Background: [
      { name: 'Normal',                value: '#333333',                  desc: 'Content area, buttons' },
      { name: 'Toolbar',               value: '#333333',                  desc: 'Left panel, toolbar' },
      { name: 'Toolbar Additional',    value: '#2A2A2A',                  desc: 'Inactive tabs' },
      { name: 'Primary Dialog Button', value: '#DDDDDD',                  desc: 'Dialog buttons, tab underline' },
      { name: 'Loader',                value: 'rgba(51, 51, 51, 0.95)',   desc: 'Loader overlay' },
      { name: 'Scrim',                 value: 'rgba(0, 0, 0, 0.40)',      desc: 'Modal backdrop' },
      { name: 'Notification Popover',  value: '#2F2F2F',                  desc: 'Notification popups' },
    ],
    Highlight: [
      { name: 'Button Hover',                value: '#555555', desc: 'Hover state' },
      { name: 'Button Pressed',              value: '#666666', desc: 'Pressed state' },
      { name: 'Button Pressed Hover',        value: '#606060', desc: 'After press' },
      { name: 'Primary Dialog Button Hover', value: '#FCFCFC', desc: 'Dialog button hover' },
    ],
    Border: [
      { name: 'Toolbar',         value: '#666666', desc: 'Toolbar divider, panel' },
      { name: 'Regular Control', value: '#666666', desc: 'Input border' },
      { name: 'Control Focus',   value: '#AAAAAA', desc: 'Active input border' },
      { name: 'Error',           value: '#FF6B6B', desc: 'Error input border' },
    ],
    Text: [
      { name: 'Normal',    value: 'rgba(255, 255, 255, 0.80)', desc: 'Primary text' },
      { name: 'Secondary', value: 'rgba(255, 255, 255, 0.60)', desc: 'Secondary text' },
      { name: 'Tertiary',  value: 'rgba(255, 255, 255, 0.40)', desc: 'Tertiary text' },
      { name: 'Inverse',   value: '#333333',                   desc: 'Text on light backgrounds' },
      { name: 'Error',     value: '#FF6B6B',                   desc: 'Error text' },
    ],
    Icon: [
      { name: 'Normal',   value: 'rgba(255, 255, 255, 0.80)', desc: 'Primary icons' },
      { name: 'Inverse',  value: '#333333',                   desc: 'Icons on light backgrounds' },
      { name: 'Tertiary', value: 'rgba(255, 255, 255, 0.50)', desc: 'Secondary icons' },
    ],
    Scroll: [
      { name: 'Thumb',         value: '#333333', desc: 'Scrollbar thumb' },
      { name: 'Thumb Hover',   value: '#555555', desc: 'Scrollbar thumb hover' },
      { name: 'Thumb Pressed', value: '#666666', desc: 'Scrollbar thumb pressed' },
      { name: 'Thumb Border',  value: '#666666', desc: 'Scrollbar thumb border' },
      { name: 'Arrow',         value: '#ADADAD', desc: 'Scroll arrow' },
      { name: 'Arrow Hover',   value: '#333333', desc: 'Scroll arrow hover & pressed' },
    ],
    'Toolbar Header': TOOLBAR_HEADER,
  },

  'Dark Contrast': {
    Background: [
      { name: 'Normal',                value: '#1E1E1E',                  desc: 'Content area, buttons' },
      { name: 'Toolbar',               value: '#1E1E1E',                  desc: 'Left panel, toolbar' },
      { name: 'Toolbar Additional',    value: '#141414',                  desc: 'Inactive tabs' },
      { name: 'Primary Dialog Button', value: '#E6E6E6',                  desc: 'Dialog buttons, tab underline' },
      { name: 'Loader',                value: 'rgba(30, 30, 30, 0.95)',   desc: 'Loader overlay' },
      { name: 'Scrim',                 value: 'rgba(0, 0, 0, 0.50)',      desc: 'Modal backdrop' },
      { name: 'Notification Popover',  value: '#1A1A1A',                  desc: 'Notification popups' },
    ],
    Highlight: [
      { name: 'Button Hover',                value: '#424242', desc: 'Hover state' },
      { name: 'Button Pressed',              value: '#666666', desc: 'Pressed state' },
      { name: 'Button Pressed Hover',        value: '#555555', desc: 'After press' },
      { name: 'Primary Dialog Button Hover', value: '#A6A6A6', desc: 'Dialog button hover' },
    ],
    Border: [
      { name: 'Toolbar',         value: '#696969', desc: 'Toolbar divider, panel' },
      { name: 'Regular Control', value: '#696969', desc: 'Input border' },
      { name: 'Control Focus',   value: '#B8B8B8', desc: 'Active input border' },
      { name: 'Error',           value: '#FF6B6B', desc: 'Error input border' },
    ],
    Text: [
      { name: 'Normal',    value: '#E8E8E8',                    desc: 'Primary text' },
      { name: 'Secondary', value: '#B8B8B8',                    desc: 'Secondary text' },
      { name: 'Tertiary',  value: 'rgba(232, 232, 232, 0.50)',  desc: 'Tertiary text' },
      { name: 'Inverse',   value: '#1E1E1E',                    desc: 'Text on light backgrounds' },
      { name: 'Error',     value: '#FF6B6B',                    desc: 'Error text' },
    ],
    Icon: [
      { name: 'Normal',   value: '#E8E8E8', desc: 'Primary icons' },
      { name: 'Inverse',  value: '#1E1E1E', desc: 'Icons on light backgrounds' },
      { name: 'Tertiary', value: '#B8B8B8', desc: 'Secondary icons' },
    ],
    Scroll: [
      { name: 'Thumb',         value: '#1E1E1E', desc: 'Scrollbar thumb' },
      { name: 'Thumb Hover',   value: '#424242', desc: 'Scrollbar thumb hover' },
      { name: 'Thumb Pressed', value: '#666666', desc: 'Scrollbar thumb pressed' },
      { name: 'Thumb Border',  value: '#696969', desc: 'Scrollbar thumb border' },
      { name: 'Arrow',         value: '#B8B8B8', desc: 'Scroll arrow' },
      { name: 'Arrow Hover',   value: '#1E1E1E', desc: 'Scroll arrow hover & pressed' },
    ],
    'Toolbar Header': TOOLBAR_HEADER,
  },
};

const themeNames = Object.keys(colorPalette);
const groupNames = ['Background', 'Highlight', 'Border', 'Text', 'Icon', 'Scroll', 'Toolbar Header'];

// ─── Story ────────────────────────────────────────────────────────────────────

export const Palette = {
  name: 'Palette',
  render: (args, context) => {
    const globalTheme = context.globals.theme || 'Light';
    const initialTab = themeNames.includes(globalTheme) ? globalTheme : 'Light';

    const root = document.createElement('div');
    root.style.fontFamily = 'Arial, sans-serif';

    // ── Tab bar ──────────────────────────────────────────────────────────────
    const tabBar = document.createElement('div');
    tabBar.style.cssText = [
      'display:flex', 'flex-wrap:wrap', 'gap:0',
      'margin-bottom:28px',
      'border-bottom:2px solid var(--page-border)',
    ].join(';');

    themeNames.forEach(name => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = name;
      btn.dataset.tab = name;
      const active = name === initialTab;
      btn.style.cssText = [
        'padding:8px 18px', 'border:none', 'outline:none',
        'background:transparent', 'cursor:pointer',
        `color:${active ? 'var(--page-fg)' : 'var(--page-muted)'}`,
        'font-size:13px', `font-weight:${active ? 700 : 400}`,
        'margin-bottom:-2px',
        `border-bottom:${active ? '2px solid var(--page-fg)' : '2px solid transparent'}`,
      ].join(';');
      tabBar.appendChild(btn);
    });
    root.appendChild(tabBar);

    // ── Panels ────────────────────────────────────────────────────────────────
    const panels = {};

    themeNames.forEach(themeName => {
      const theme = colorPalette[themeName];
      const panel = document.createElement('div');
      panel.dataset.panel = themeName;
      if (themeName !== initialTab) panel.hidden = true;

      groupNames.forEach(groupName => {
        const tokens = theme[groupName];
        if (!tokens?.length) return;

        // Section header
        const section = document.createElement('div');
        section.style.marginBottom = '32px';

        const heading = document.createElement('div');
        heading.textContent = groupName;
        heading.style.cssText = [
          'font-size:11px', 'font-weight:700', 'letter-spacing:0.8px',
          'text-transform:uppercase', 'color:var(--page-muted)',
          'margin-bottom:12px', 'padding-bottom:8px',
          'border-bottom:1px solid var(--page-border)',
        ].join(';');
        section.appendChild(heading);

        // Card grid
        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(152px,1fr));gap:8px;';

        tokens.forEach(token => {
          const card = document.createElement('div');
          card.style.cssText = [
            'border:1px solid var(--page-border)', 'border-radius:8px',
            'overflow:hidden', 'cursor:pointer',
            'transition:box-shadow 0.12s,transform 0.12s',
          ].join(';');
          card.title = `Click to copy ${token.value}`;

          // Swatch
          const swatch = document.createElement('div');
          swatch.style.cssText = [
            `background:${token.value}`,
            'height:56px',
            'border-bottom:1px solid rgba(128,128,128,0.15)',
          ].join(';');
          card.appendChild(swatch);

          // Info
          const info = document.createElement('div');
          info.style.cssText = 'padding:8px 10px;background:var(--page-bg);';
          info.innerHTML = `
            <div class="t-name" style="font-size:11px;font-weight:700;color:var(--page-fg);line-height:1.35;margin-bottom:2px;">${token.name}</div>
            <div style="font-size:10px;color:var(--page-muted);margin-bottom:4px;line-height:1.3;">${token.desc}</div>
            <div class="t-val" style="font-size:10px;font-family:'Courier New',monospace;color:var(--page-muted);word-break:break-all;">${token.value}</div>
          `;
          card.appendChild(info);

          // Hover
          card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            card.style.transform = 'translateY(-1px)';
          });
          card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.transform = '';
          });

          // Click → copy
          card.addEventListener('click', () => {
            navigator.clipboard?.writeText(token.value).catch(() => {});
            const nameEl = info.querySelector('.t-name');
            const orig = nameEl.textContent;
            nameEl.style.color = 'var(--page-accent)';
            nameEl.textContent = 'Copied!';
            setTimeout(() => {
              nameEl.style.color = '';
              nameEl.textContent = orig;
            }, 1200);
          });

          grid.appendChild(card);
        });

        section.appendChild(grid);
        panel.appendChild(section);
      });

      panels[themeName] = panel;
      root.appendChild(panel);
    });

    // ── Tab switching ─────────────────────────────────────────────────────────
    tabBar.addEventListener('click', e => {
      const btn = e.target.closest('button[data-tab]');
      if (!btn) return;
      const selected = btn.dataset.tab;

      tabBar.querySelectorAll('button[data-tab]').forEach(b => {
        const active = b.dataset.tab === selected;
        b.style.color = active ? 'var(--page-fg)' : 'var(--page-muted)';
        b.style.fontWeight = active ? '700' : '400';
        b.style.borderBottom = active ? '2px solid var(--page-fg)' : '2px solid transparent';
      });

      Object.entries(panels).forEach(([name, panel]) => {
        panel.hidden = name !== selected;
      });
    });

    return root;
  },
  parameters: {
    docs: {
      description: {
        story:
          'All semantic color tokens grouped by category. Use the tabs to switch between themes — the active tab defaults to the current toolbar theme.',
      },
    },
  },
};
