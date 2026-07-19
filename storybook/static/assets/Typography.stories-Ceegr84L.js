import{n as e}from"./chunk-BneVvdWh.js";var t,n,r,i,a,o;e((()=>{t={title:`Foundations/Typography`,parameters:{docs:{description:{component:`Typography scale used across all plugin UI components. Primary font is Arial. Styles are grouped by role: headings, body, captions.`}}}},n=[{name:`Head1`,size:15,lineHeight:20,weight:400,weightName:`Regular`,letterSpacing:.3},{name:`Head1`,size:14,lineHeight:20,weight:700,weightName:`Bold`,letterSpacing:.28},{name:`Head2`,size:14,lineHeight:16,weight:700,weightName:`Bold`,letterSpacing:.28},{name:`Head3`,size:12,lineHeight:16,weight:500,weightName:`Medium`,letterSpacing:.24},{name:`Head3`,size:12,lineHeight:16,weight:400,weightName:`Regular`,letterSpacing:.24},{name:`Head4`,size:11,lineHeight:16,weight:700,weightName:`Bold`,letterSpacing:.22},{name:`Body`,size:11,lineHeight:16,weight:400,weightName:`Regular`,letterSpacing:.22},{name:`Body`,size:11,lineHeight:14,weight:400,weightName:`Regular`,letterSpacing:.22},{name:`Caption`,size:11,lineHeight:12,weight:400,weightName:`Regular`,letterSpacing:.22},{name:`Caption`,size:10,lineHeight:12,weight:400,weightName:`Regular`,letterSpacing:.2}],r={name:`Text Styles`,render:()=>{let e=document.createElement(`div`);e.style.fontFamily=`Arial, Helvetica, sans-serif`;let t=document.createElement(`div`);t.style.cssText=[`padding:28px 32px`,`border-radius:12px`,`background:var(--page-surface)`,`border:1px solid var(--page-border)`,`display:flex`,`align-items:center`,`gap:40px`,`margin-bottom:32px`].join(`;`),t.innerHTML=`
      <div style="flex:1;display:flex;flex-direction:column;gap:10px;">
        <div style="font-size:28px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:var(--page-fg);line-height:1;">Arial</div>
        <div style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:400;color:var(--page-muted);line-height:18px;word-break:break-all;">
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<br>
          1234567890 '?"!"(%)[#]{@}/&amp;&lt;-+÷×=&gt;®©₽$€£¥¢:;,.*
        </div>
      </div>
      <div style="font-size:80px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:var(--page-fg);line-height:1;flex-shrink:0;">Aa</div>
    `,e.appendChild(t);let r=document.createElement(`div`);r.style.cssText=`border:1px solid var(--page-border);border-radius:12px;overflow:hidden;`;let i=document.createElement(`div`);return i.style.cssText=[`display:grid`,`grid-template-columns:80px 64px 80px 1fr`,`padding:8px 20px`,`background:var(--page-surface)`,`border-bottom:1px solid var(--page-border)`,`gap:16px`].join(`;`),i.innerHTML=`
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Style</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Size/LH</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Weight</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Sample</div>
    `,r.appendChild(i),n.forEach((e,t)=>{let i=t%2==0?`var(--page-bg)`:`var(--page-surface)`,a=document.createElement(`div`);a.style.cssText=[`display:grid`,`grid-template-columns:80px 64px 80px 1fr`,`align-items:center`,`padding:10px 20px`,`gap:16px`,`background:${i}`,t<n.length-1?`border-bottom:1px solid var(--page-border)`:``].join(`;`),a.innerHTML=`
        <div style="font-size:12px;font-weight:700;color:var(--page-fg);">${e.name}</div>
        <div style="font-size:11px;color:var(--page-muted);font-variant-numeric:tabular-nums;">${e.size}/${e.lineHeight}</div>
        <div style="font-size:11px;color:var(--page-muted);">${e.weightName}</div>
        <div style="font-size:${e.size}px;font-family:Arial,Helvetica,sans-serif;font-weight:${e.weight};line-height:${e.lineHeight}px;letter-spacing:${e.letterSpacing}px;color:var(--page-fg);">
          Lorem ipsum dolor sit amet
        </div>
      `,r.appendChild(a)}),e.appendChild(r),e},parameters:{docs:{description:{story:`Full type scale — style name, size / line-height, weight, and live sample.`}}}},i={name:`Content Example`,render:(e,t)=>{[`Dark`,`Dark Contrast`,`Modern Dark`].includes(t.globals.theme);let n=(e,t,n,r,i,a,o)=>`
      <div style="flex:1;padding:28px;border-radius:12px;background:${e};border:1px solid var(--page-border);display:flex;flex-direction:column;gap:20px;box-sizing:border-box;">
        <div style="font-size:14px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:20px;letter-spacing:0.28px;color:${t};">Navigation</div>
        <div style="display:flex;flex-direction:column;gap:2px;">
          <div style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:0.24px;color:${n};">Header</div>
          <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:0.22px;color:${r};">Caption caption. Caption caption</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:16px;letter-spacing:0.22px;color:${i};">Text block text block. Text block text block.<br>Text block text block. Text block text block.</div>
          <div style="font-size:10px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:0.20px;color:${a};">Caption caption. Caption caption</div>
        </div>
      </div>
    `;return`<div style="font-family:Arial,Helvetica,sans-serif;display:flex;gap:16px;flex-wrap:wrap;">
      ${n(`var(--page-bg)`,`var(--page-fg)`,`var(--page-fg)`,`var(--page-muted)`,`var(--page-fg)`,`var(--page-muted)`,!0)}
      ${n(`#333333`,`rgba(255,255,255,0.80)`,`rgba(255,255,255,0.80)`,`rgba(255,255,255,0.60)`,`rgba(255,255,255,0.80)`,`rgba(255,255,255,0.60)`,!1)}
    </div>`},parameters:{docs:{description:{story:`Typography in context — left panel on a light background and a dark background.`}}}},a={name:`Links`,render:()=>`<div style="font-family:Arial,Helvetica,sans-serif;display:flex;flex-direction:column;gap:20px;">
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px;">Pseudolink (dashed underline)</div>
      <div style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:2px;cursor:pointer;">
        <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:14px;letter-spacing:0.22px;color:var(--page-fg);">Show advanced settings</div>
        <div style="width:100%;height:1px;background-image:repeating-linear-gradient(to right,var(--page-fg) 0,var(--page-fg) 1px,transparent 1px,transparent 2px);background-size:2px 1px;"></div>
      </div>
    </div>`,parameters:{docs:{description:{story:`Pseudolink style — plain text with a dashed 1px underline, no color change.`}}}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  name: 'Text Styles',
  render: () => {
    const root = document.createElement('div');
    root.style.fontFamily = 'Arial, Helvetica, sans-serif';

    // ── Font specimen ──
    const specimen = document.createElement('div');
    specimen.style.cssText = ['padding:28px 32px', 'border-radius:12px', 'background:var(--page-surface)', 'border:1px solid var(--page-border)', 'display:flex', 'align-items:center', 'gap:40px', 'margin-bottom:32px'].join(';');
    specimen.innerHTML = \`
      <div style="flex:1;display:flex;flex-direction:column;gap:10px;">
        <div style="font-size:28px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:var(--page-fg);line-height:1;">Arial</div>
        <div style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:400;color:var(--page-muted);line-height:18px;word-break:break-all;">
          ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<br>
          1234567890 '?"!"(%)[#]{@}/&amp;\\&lt;-+÷×=&gt;®©₽$€£¥¢:;,.*
        </div>
      </div>
      <div style="font-size:80px;font-family:Arial,Helvetica,sans-serif;font-weight:700;color:var(--page-fg);line-height:1;flex-shrink:0;">Aa</div>
    \`;
    root.appendChild(specimen);

    // ── Table header ──
    const table = document.createElement('div');
    table.style.cssText = 'border:1px solid var(--page-border);border-radius:12px;overflow:hidden;';
    const header = document.createElement('div');
    header.style.cssText = ['display:grid', 'grid-template-columns:80px 64px 80px 1fr', 'padding:8px 20px', 'background:var(--page-surface)', 'border-bottom:1px solid var(--page-border)', 'gap:16px'].join(';');
    header.innerHTML = \`
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Style</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Size/LH</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Weight</div>
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;">Sample</div>
    \`;
    table.appendChild(header);
    textStyles.forEach((s, i) => {
      const rowBg = i % 2 === 0 ? 'var(--page-bg)' : 'var(--page-surface)';
      const row = document.createElement('div');
      row.style.cssText = ['display:grid', 'grid-template-columns:80px 64px 80px 1fr', 'align-items:center', 'padding:10px 20px', 'gap:16px', \`background:\${rowBg}\`, i < textStyles.length - 1 ? 'border-bottom:1px solid var(--page-border)' : ''].join(';');
      row.innerHTML = \`
        <div style="font-size:12px;font-weight:700;color:var(--page-fg);">\${s.name}</div>
        <div style="font-size:11px;color:var(--page-muted);font-variant-numeric:tabular-nums;">\${s.size}/\${s.lineHeight}</div>
        <div style="font-size:11px;color:var(--page-muted);">\${s.weightName}</div>
        <div style="font-size:\${s.size}px;font-family:Arial,Helvetica,sans-serif;font-weight:\${s.weight};line-height:\${s.lineHeight}px;letter-spacing:\${s.letterSpacing}px;color:var(--page-fg);">
          Lorem ipsum dolor sit amet
        </div>
      \`;
      table.appendChild(row);
    });
    root.appendChild(table);
    return root;
  },
  parameters: {
    docs: {
      description: {
        story: 'Full type scale — style name, size / line-height, weight, and live sample.'
      }
    }
  }
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Content Example',
  render: (args, context) => {
    const isDark = ['Dark', 'Dark Contrast', 'Modern Dark'].includes(context.globals.theme);
    const card = (bg, nav, header, caption, body, smallCaption, isLight) => \`
      <div style="flex:1;padding:28px;border-radius:12px;background:\${bg};border:1px solid var(--page-border);display:flex;flex-direction:column;gap:20px;box-sizing:border-box;">
        <div style="font-size:14px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:20px;letter-spacing:0.28px;color:\${nav};">Navigation</div>
        <div style="display:flex;flex-direction:column;gap:2px;">
          <div style="font-size:12px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:0.24px;color:\${header};">Header</div>
          <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:0.22px;color:\${caption};">Caption caption. Caption caption</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:16px;letter-spacing:0.22px;color:\${body};">Text block text block. Text block text block.<br>Text block text block. Text block text block.</div>
          <div style="font-size:10px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:0.20px;color:\${smallCaption};">Caption caption. Caption caption</div>
        </div>
      </div>
    \`;
    const lightCard = card('var(--page-bg)', 'var(--page-fg)', 'var(--page-fg)', 'var(--page-muted)', 'var(--page-fg)', 'var(--page-muted)', true);
    const darkCard = card('#333333', 'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.60)', 'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.60)', false);
    return \`<div style="font-family:Arial,Helvetica,sans-serif;display:flex;gap:16px;flex-wrap:wrap;">
      \${lightCard}
      \${darkCard}
    </div>\`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Typography in context — left panel on a light background and a dark background.'
      }
    }
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Links',
  render: () => {
    return \`<div style="font-family:Arial,Helvetica,sans-serif;display:flex;flex-direction:column;gap:20px;">
      <div style="font-size:11px;font-weight:700;color:var(--page-muted);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px;">Pseudolink (dashed underline)</div>
      <div style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:2px;cursor:pointer;">
        <div style="font-size:11px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:14px;letter-spacing:0.22px;color:var(--page-fg);">Show advanced settings</div>
        <div style="width:100%;height:1px;background-image:repeating-linear-gradient(to right,var(--page-fg) 0,var(--page-fg) 1px,transparent 1px,transparent 2px);background-size:2px 1px;"></div>
      </div>
    </div>\`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pseudolink style — plain text with a dashed 1px underline, no color change.'
      }
    }
  }
}`,...a.parameters?.docs?.source}}},o=[`TextStyles`,`ContentExample`,`Links`]}))();export{i as ContentExample,a as Links,r as TextStyles,o as __namedExportsOrder,t as default};