import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{background:`#FFFFFF`,border:`#C0C0C0`,radius:1,titleColor:`rgba(0, 0, 0, 0.8)`,descriptionColor:`rgba(0, 0, 0, 0.6)`,closeColor:`rgba(0, 0, 0, 0.8)`,alertBackground:`#F62211`,alertMark:`#FFFFFF`,titleTypography:{fontSize:11,lineHeight:16,letterSpacing:.22,fontWeight:700},descriptionTypography:{fontSize:11,lineHeight:14,letterSpacing:.22,fontWeight:400}},"Light Classic":{background:`#FFFFFF`,border:`#CFCFCF`,radius:1,titleColor:`#444444`,descriptionColor:`#A5A5A5`,closeColor:`#444444`,alertBackground:`#D9534F`,alertMark:`#FFFFFF`,titleTypography:{fontSize:11,lineHeight:16,letterSpacing:.22,fontWeight:700},descriptionTypography:{fontSize:11,lineHeight:14,letterSpacing:.22,fontWeight:400}},Dark:{background:`#333333`,border:`#666666`,radius:1,titleColor:`rgba(255, 255, 255, 0.8)`,descriptionColor:`rgba(255, 255, 255, 0.6)`,closeColor:`rgba(255, 255, 255, 0.8)`,alertBackground:`#F62211`,alertMark:`rgba(255, 255, 255, 0.8)`,titleTypography:{fontSize:11,lineHeight:16,letterSpacing:.22,fontWeight:700},descriptionTypography:{fontSize:11,lineHeight:14,letterSpacing:.22,fontWeight:400}},"Dark Contrast":{background:`#1E1E1E`,border:`#696969`,radius:1,titleColor:`#E8E8E8`,descriptionColor:`#B8B8B8`,closeColor:`#E8E8E8`,alertBackground:`#F62211`,alertMark:`#E8E8E8`,titleTypography:{fontSize:11,lineHeight:16,letterSpacing:.22,fontWeight:700},descriptionTypography:{fontSize:11,lineHeight:14,letterSpacing:.22,fontWeight:400}},"Modern Light":{background:`#FFFFFF`,border:`#E1E1E1`,radius:4,titleColor:`#383838`,descriptionColor:`rgba(0, 0, 0, 0.6)`,closeColor:`#383838`,alertBackground:`rgba(242, 61, 61, 0.8)`,alertMark:`#FFFFFF`,titleTypography:{fontSize:12,lineHeight:20,letterSpacing:.24,fontWeight:500},descriptionTypography:{fontSize:12,lineHeight:16,letterSpacing:.24,fontWeight:400}},"Modern Dark":{background:`#404040`,border:`#686868`,radius:4,titleColor:`#F3F3F3`,descriptionColor:`#969696`,closeColor:`#EAEAEA`,alertBackground:`rgba(242, 61, 61, 0.8)`,alertMark:`#222222`,titleTypography:{fontSize:12,lineHeight:20,letterSpacing:.24,fontWeight:500},descriptionTypography:{fontSize:12,lineHeight:16,letterSpacing:.24,fontWeight:400}}}}));function s({title:e=`Title`,description:t=`Description`,showTitle:n=!0,showDescription:r=!0,iconMode:o=`left`,theme:s}={}){let u=a[i(s)]??a.Light,d=n&&(o===`left`||o===`both`),f=n&&(o===`right`||o===`both`),p=n?`<div style="display:flex;align-items:center;gap:8px;">
    ${d?c(u.alertBackground,u.alertMark):``}
    <span style="flex:1 1 0;min-width:0;color:${u.titleColor};font-family:Arial,Helvetica,sans-serif;font-size:${u.titleTypography.fontSize}px;font-weight:${u.titleTypography.fontWeight};line-height:${u.titleTypography.lineHeight}px;letter-spacing:${u.titleTypography.letterSpacing}px;">${e}</span>
    ${f?`<button type="button" style="width:12px;height:12px;padding:0;border:none;background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${l(u.closeColor)}</button>`:``}
  </div>`:``,m=r?`<div style="color:${u.descriptionColor};font-family:Arial,Helvetica,sans-serif;font-size:${u.descriptionTypography.fontSize}px;font-weight:${u.descriptionTypography.fontWeight};line-height:${u.descriptionTypography.lineHeight}px;letter-spacing:${u.descriptionTypography.letterSpacing}px;">${t}</div>`:``,h=n&&r?4:0;return`<div style="width:220px;padding:8px;border-radius:${u.radius}px;border:1px solid ${u.border};background:${u.background};display:grid;gap:${h}px;box-sizing:border-box;">
    ${p}${m}
  </div>`}var c,l,u=e((()=>{o(),r(),c=(e,t)=>`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
  <rect width="12" height="12" rx="6" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.14288 9.59985L6.85717 9.59985L6.85717 7.88557L5.14288 7.88557L5.14288 9.59985ZM5.14288 7.19985L6.85717 7.19985L6.85717 2.39985L5.14289 2.39985L5.14288 7.19985Z" fill="${t}"/>
</svg>`,l=e=>`<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.00838 8.72823L3.59718 9.14194L2.88793 8.43698L3.29914 8.02327L4.12155 7.19585L5.29498 6.01528L4.00049 4.71291L3.23857 3.94634L2.8576 3.56306L3.56686 2.8581L3.94782 3.24139L4.70974 4.00795L5.99995 5.30602L7.29024 4.00788L8.05217 3.24132L8.43314 2.85803L9.14238 3.56299L8.76142 3.94627L7.99949 4.71284L6.70492 6.01528L7.87843 7.19593L8.70085 8.02336L9.11206 8.43707L8.40281 9.14203L7.9916 8.72832L7.16918 7.90089L5.99995 6.72454L4.8308 7.90081L4.00838 8.72823Z" fill="${e}"/>
</svg>`})),d,f,p,m,h,g,_,v,y,b;e((()=>{u(),r(),d=n,f={title:`Components/Data Display/Info Block`,tags:[`autodocs`],args:{title:`Title`,description:`Description`,showTitle:!0,showDescription:!0,iconMode:`left`,themeMode:`Auto`},argTypes:{title:{control:`text`,description:`Main heading text`},description:{control:`text`,description:`Supporting descriptive copy`},showTitle:{control:`boolean`,description:`Show the title row`},showDescription:{control:`boolean`,description:`Show the description row`},iconMode:{control:`select`,options:[`none`,`left`,`right`,`both`],description:`Icon placement around the title row`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...d],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},onClose:{table:{disable:!0}}},parameters:{docs:{description:{component:`Compact informational block for notices, inline explanations, and dismissible helper content.`}}}},p={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,theme:r})}},m={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,iconMode:`none`,theme:r})},parameters:{docs:{description:{story:`Plain informational block without icons.`}}}},h={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,iconMode:`right`,showTitle:!0,showDescription:!0,theme:r})},parameters:{docs:{description:{story:`Variant with a dismiss or action icon on the right.`}}}},g={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,iconMode:`left`,showTitle:!0,showDescription:!0,theme:r})},parameters:{docs:{description:{story:`Variant with an informational icon on the left.`}}}},_={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,iconMode:`both`,showDescription:!1,theme:r})},parameters:{docs:{description:{story:`Title row with icons on both sides.`}}}},v={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,showTitle:!0,showDescription:!1,iconMode:`none`,theme:r})},parameters:{docs:{description:{story:`Title-only informational block.`}}}},y={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,showTitle:!1,showDescription:!0,iconMode:`none`,theme:r})},parameters:{docs:{description:{story:`Description-only helper text block.`}}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      theme
    });
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      iconMode: 'none',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Plain informational block without icons.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      iconMode: 'right',
      showTitle: true,
      showDescription: true,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant with a dismiss or action icon on the right.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      iconMode: 'left',
      showTitle: true,
      showDescription: true,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant with an informational icon on the left.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      iconMode: 'both',
      showDescription: false,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Title row with icons on both sides.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      showTitle: true,
      showDescription: false,
      iconMode: 'none',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Title-only informational block.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return InfoBlock({
      ...args,
      showTitle: false,
      showDescription: true,
      iconMode: 'none',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Description-only helper text block.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b=[`Default`,`WithoutIcon`,`IconRight`,`IconLeft`,`IconBoth`,`TitleOnly`,`DescriptionOnly`]}))();export{p as Default,y as DescriptionOnly,_ as IconBoth,g as IconLeft,h as IconRight,v as TitleOnly,m as WithoutIcon,b as __namedExportsOrder,f as default};