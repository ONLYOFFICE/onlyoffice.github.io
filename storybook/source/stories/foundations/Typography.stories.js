export default {
  title: 'Foundations/Typography',
  parameters: {
    docs: {
      description: {
        component:
          'Typography scale used across all plugin UI components. Primary font is Arial. Styles are grouped by role: headings, body, captions.',
      },
    },
  },
};

// ─── Text style definitions ───────────────────────────────────────────────────

const textStyles = [
  { name: 'Head1',   size: 15, lineHeight: 20, weight: 400, weightName: 'Regular', letterSpacing: 0.30 },
  { name: 'Head1',   size: 14, lineHeight: 20, weight: 700, weightName: 'Bold',    letterSpacing: 0.28 },
  { name: 'Head2',   size: 14, lineHeight: 16, weight: 700, weightName: 'Bold',    letterSpacing: 0.28 },
  { name: 'Head3',   size: 12, lineHeight: 16, weight: 500, weightName: 'Medium',  letterSpacing: 0.24 },
  { name: 'Head3',   size: 12, lineHeight: 16, weight: 400, weightName: 'Regular', letterSpacing: 0.24 },
  { name: 'Head4',   size: 11, lineHeight: 16, weight: 700, weightName: 'Bold',    letterSpacing: 0.22 },
  { name: 'Body',    size: 11, lineHeight: 16, weight: 400, weightName: 'Regular', letterSpacing: 0.22 },
  { name: 'Body',    size: 11, lineHeight: 14, weight: 400, weightName: 'Regular', letterSpacing: 0.22 },
  { name: 'Caption', size: 11, lineHeight: 12, weight: 400, weightName: 'Regular', letterSpacing: 0.22 },
  { name: 'Caption', size: 10, lineHeight: 12, weight: 400, weightName: 'Regular', letterSpacing: 0.20 },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const TextStyles = {
  name: 'Text Styles',
  render: () => {
    const root = document.createElement('div');
    root.style.fontFamily = 'Arial, Helvetica, sans-serif';

    // ── Font specimen ──
    const specimen = document.createElement('div');
    specimen.style.cssText = [
      'padding:28px 32px', 'border-radius:12px',
      'background:var(--page-surface)',
      'border:1px solid var(--page-border)',
      'display:flex', 'align-items:center', 'gap:40px',
      'margin-bottom:32px',
    ].join(';');
    specimen.innerHTML = `
      <div style="flex:1;display:flex;flex-direction:column;gap:10px;">
        <div style="font-size:28px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:var(--page-fg);line-height:1;">Arial</div>
        <div style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:400;color:var(--page-muted);line-height:18px;word-break:break-all;">
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<br>
          1234567890 '?"!"(%)[#]{@}/&amp;\&lt;-+÷×=&gt;®©₽$€£¥¢:;,.*
        </div>
      </div>
      <div style="font-size:80px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:var(--page-fg);line-height:1;flex-shrink:0;">Aa</div>
    `;
    root.appendChild(specimen);

    // ── Table header ──
    const table = document.createElement('div');
    table.style.cssText = 'border:1px solid var(--page-border);border-radius:12px;overflow:hidden;';

    const header = document.createElement('div');
    header.style.cssText = [
      'display:grid', 'grid-template-columns:80px 64px 80px 1fr',
      'padding:8px 20px',
      'background:var(--page-surface)',
      'border-bottom:1px solid var(--page-border)',
      'gap:16px',
    ].join(';');
    header.innerHTML = `
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Style</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Size/LH</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Weight</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Sample</div>
    `;
    table.appendChild(header);

    textStyles.forEach((s, i) => {
      const rowBg = i % 2 === 0 ? 'var(--page-bg)' : 'var(--page-surface)';
      const row = document.createElement('div');
      row.style.cssText = [
        'display:grid', 'grid-template-columns:80px 64px 80px 1fr',
        'align-items:center', 'padding:10px 20px', 'gap:16px',
        `background:${rowBg}`,
        i < textStyles.length - 1 ? 'border-bottom:1px solid var(--page-border)' : '',
      ].join(';');

      row.innerHTML = `
        <div style="font-size:12px;font-weight:700;color:var(--page-fg);">${s.name}</div>
        <div style="font-size:11px;color:var(--page-muted);font-variant-numeric:tabular-nums;">${s.size}/${s.lineHeight}</div>
        <div style="font-size:11px;color:var(--page-muted);">${s.weightName}</div>
        <div style="font-size:${s.size}px;font-family:Arial,Helvetica,sans-serif;font-weight:${s.weight};line-height:${s.lineHeight}px;letter-spacing:${s.letterSpacing}px;color:var(--page-fg);">
          Lorem ipsum dolor sit amet
        </div>
      `;
      table.appendChild(row);
    });

    root.appendChild(table);
    return root;
  },
  parameters: {
    docs: {
      description: {
        story: 'Full type scale — style name, size / line-height, weight, and live sample.',
      },
    },
  },
};

export const ContentExample = {
  name: 'Content Example',
  render: (args, context) => {
    const isDark = ['Dark', 'Dark Contrast', 'Modern Dark'].includes(context.globals.theme);

    const card = (bg, nav, header, caption, body, smallCaption, isLight) => `
      <div style="flex:1;padding:28px;border-radius:12px;background:${bg};border:1px solid var(--page-border);display:flex;flex-direction:column;gap:20px;box-sizing:border-box;">
        <div style="font-size:14px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:20px;letter-spacing:0.28px;color:${nav};">Navigation</div>
        <div style="display:flex;flex-direction:column;gap:2px;">
          <div style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:0.24px;color:${header};">Header</div>
          <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:0.22px;color:${caption};">Caption caption. Caption caption</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:16px;letter-spacing:0.22px;color:${body};">Text block text block. Text block text block.<br>Text block text block. Text block text block.</div>
          <div style="font-size:10px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:0.20px;color:${smallCaption};">Caption caption. Caption caption</div>
        </div>
      </div>
    `;

    const lightCard = card(
      'var(--page-bg)',
      'var(--page-fg)', 'var(--page-fg)', 'var(--page-muted)',
      'var(--page-fg)', 'var(--page-muted)',
      true
    );

    const darkCard = card(
      '#333333',
      'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.60)',
      'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.60)',
      false
    );

    return `<div style="font-family:Arial,Helvetica,sans-serif;display:flex;gap:16px;flex-wrap:wrap;">
      ${lightCard}
      ${darkCard}
    </div>`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Typography in context — left panel on a light background and a dark background.',
      },
    },
  },
};

export const Links = {
  name: 'Links',
  render: () => {
    return `<div style="font-family:Arial,Helvetica,sans-serif;display:flex;flex-direction:column;gap:20px;">
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px;">Pseudolink (dashed underline)</div>
      <div style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:2px;cursor:pointer;">
        <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:14px;letter-spacing:0.22px;color:var(--page-fg);">Show advanced settings</div>
        <div style="width:100%;height:1px;background-image:repeating-linear-gradient(to right,var(--page-fg) 0,var(--page-fg) 1px,transparent 1px,transparent 2px);background-size:2px 1px;"></div>
      </div>
    </div>`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pseudolink style — plain text with a dashed 1px underline, no color change.',
      },
    },
  },
};
