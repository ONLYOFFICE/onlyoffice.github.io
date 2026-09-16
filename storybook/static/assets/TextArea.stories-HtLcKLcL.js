import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{background:`#FFFFFF`,border:`#C0C0C0`,hoverBorder:`#848484`,disabledBackground:`#EFEFEF`,disabledOpacity:.5,textColor:`rgba(0, 0, 0, 0.8)`,disabledTextColor:`rgba(0, 0, 0, 0.8)`,textTypography:{fontSize:11,lineHeight:14,letterSpacing:.22},labelColor:`rgba(0, 0, 0, 0.8)`,labelWeight:700,labelTypography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionColor:`rgba(0, 0, 0, 0.4)`,captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2},copyIconColor:`rgba(0, 0, 0, 0.8)`,copyIconStyle:`classic`,scrollTrack:`transparent`,scrollThumb:`#E0E0E0`,radius:2},"Light Classic":{background:`#FFFFFF`,border:`#CFCFCF`,hoverBorder:`#848484`,disabledBackground:`#F1F1F1`,disabledOpacity:.5,textColor:`#444444`,disabledTextColor:`#444444`,textTypography:{fontSize:11,lineHeight:14,letterSpacing:.22},labelColor:`#444444`,labelWeight:700,labelTypography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionColor:`#A5A5A5`,captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2},copyIconColor:`#444444`,copyIconStyle:`classic`,scrollTrack:`transparent`,scrollThumb:`#CFCFCF`,radius:2},Dark:{background:`#333333`,border:`#666666`,hoverBorder:`#CCCCCC`,disabledBackground:`#505050`,disabledOpacity:.5,textColor:`rgba(255, 255, 255, 0.8)`,disabledTextColor:`rgba(255, 255, 255, 0.8)`,textTypography:{fontSize:11,lineHeight:14,letterSpacing:.22},labelColor:`rgba(255, 255, 255, 0.8)`,labelWeight:700,labelTypography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionColor:`rgba(255, 255, 255, 0.4)`,captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2},copyIconColor:`rgba(255, 255, 255, 0.8)`,copyIconStyle:`classic`,scrollTrack:`transparent`,scrollThumb:`#616161`,radius:2},"Dark Contrast":{background:`#1E1E1E`,border:`#696969`,hoverBorder:`#B8B8B8`,disabledBackground:`#2A2A2A`,disabledOpacity:.5,textColor:`#E8E8E8`,disabledTextColor:`#E8E8E8`,textTypography:{fontSize:11,lineHeight:14,letterSpacing:.22},labelColor:`#E8E8E8`,labelWeight:700,labelTypography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionColor:`#B8B8B8`,captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2},copyIconColor:`#E8E8E8`,copyIconStyle:`classic`,scrollTrack:`transparent`,scrollThumb:`#616161`,radius:2},"Modern Light":{background:`#FFFFFF`,border:`#E1E1E1`,hoverBorder:`#4473CA`,disabledBackground:`#F3F3F3`,disabledOpacity:1,textColor:`#383838`,disabledTextColor:`rgba(0, 0, 0, 0.2)`,textTypography:{fontSize:12,lineHeight:16,letterSpacing:.24},labelColor:`#383838`,labelWeight:400,labelTypography:{fontSize:12,lineHeight:16,letterSpacing:.24},captionColor:`rgba(0, 0, 0, 0.2)`,captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2},copyIconColor:`#383838`,copyIconStyle:`modern`,scrollTrack:`transparent`,scrollThumb:`#E1E1E1`,radius:2},"Modern Dark":{background:`#404040`,border:`#686868`,hoverBorder:`#4A7BE0`,disabledBackground:`#2A2A2A`,disabledOpacity:1,textColor:`#F3F3F3`,disabledTextColor:`rgba(243, 243, 243, 0.4)`,textTypography:{fontSize:12,lineHeight:16,letterSpacing:.24},labelColor:`#F3F3F3`,labelWeight:400,labelTypography:{fontSize:12,lineHeight:16,letterSpacing:.24},captionColor:`rgba(243, 243, 243, 0.4)`,captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2},copyIconColor:`#EAEAEA`,copyIconStyle:`modern`,scrollTrack:`transparent`,scrollThumb:`#686868`,radius:2}}}));function s({label:e=`Title`,caption:t=`Caption`,value:n=c,state:r=`default`,width:o=236,height:s=188,showLabel:u=!0,showCaption:d=!0,showCopyButton:f=!0,theme:p=`Light`}={}){let m=a[i(p)]??a.Light,h=r===`disabled`,g=r===`scroll`,_=r===`no-scroll`,v=m.copyIconStyle===`modern`?24:20,y=u||f?`<div style="display:flex;align-items:center;justify-content:space-between;min-height:20px;">
        ${u?`<label style="color:${m.labelColor};font-weight:${m.labelWeight};font-size:${m.labelTypography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${m.labelTypography.lineHeight}px;letter-spacing:${m.labelTypography.letterSpacing}px;">${e}</label>`:`<span></span>`}
        ${f?`<button type="button" aria-label="Copy text" ${h?`disabled`:``} style="width:${v}px;height:${v}px;padding:0;border:none;background:transparent;cursor:${h?`default`:`pointer`};opacity:${h?m.disabledOpacity:1};display:inline-flex;align-items:center;justify-content:center;">${l(m.copyIconColor)}</button>`:``}
      </div>`:``,b=h||_?`hidden`:g?`scroll`:`auto`,x=g?`pre`:`pre-wrap`,S=_||h?`0`:`3px`,C=_||h?`0`:`4px`,w=[`width:100%`,`height:100%`,`border:none`,`outline:none`,`resize:none`,`background:transparent`,`color:${h?m.disabledTextColor:m.textColor}`,`font-family:Arial,Helvetica,sans-serif`,`font-size:${m.textTypography.fontSize}px`,`line-height:${m.textTypography.lineHeight}px`,`letter-spacing:${m.textTypography.letterSpacing}px`,`padding-top:0`,`padding-left:0`,`padding-right:${S}`,`padding-bottom:${C}`,`margin:0`,`overflow:${b}`,`white-space:${x}`,`word-break:break-word`,`box-sizing:border-box`,`scrollbar-color:${m.scrollThumb} ${m.scrollTrack}`,`scrollbar-width:thin`,h?`pointer-events:none`:``].filter(Boolean).join(`;`),T=d?`<span style="color:${m.captionColor};font-size:${m.captionTypography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${m.captionTypography.lineHeight}px;letter-spacing:${m.captionTypography.letterSpacing}px;">${t}</span>`:``;return`<div style="width:${o}px;display:grid;gap:${d?2:4}px;">
    ${y}
    <div style="width:${o}px;height:${s}px;border-radius:${m.radius}px;border:1px solid ${m.border};background:${h?m.disabledBackground:m.background};opacity:${h?m.disabledOpacity:1};box-sizing:border-box;padding:5px 5px 5px 8px;">
      <textarea ${h?`disabled`:``} wrap="${g?`off`:`soft`}" style="${w}">${n}</textarea>
    </div>
    ${T}
  </div>`}var c,l,u=e((()=>{o(),r(),c=`The 10 most undervalued stocks from our Best Companies to Own list as of Feb. 28, 2023, were:
Comcast CMCSA — a leading global media and technology company with businesses in cable, entertainment, and theme parks.
Taiwan Semiconductor Manufacturing TSM — the world's largest dedicated semiconductor foundry serving major chip designers.
Roche Holding RHHBY — a global pioneer in pharmaceuticals and diagnostics focused on oncology and rare diseases.
Walt Disney DIS — a diversified entertainment company spanning film, television, streaming, and theme park experiences.
Equifax EFX — one of the three major credit reporting agencies providing data analytics and risk solutions worldwide.
TransUnion TRU — a global information and insights company helping businesses manage risk and consumers manage credit.
International Flavors & Fragrances IFF — a leading creator of flavors, fragrances, and specialty ingredients.
Zimmer Biomet ZBH — a global medical device company specializing in musculoskeletal healthcare and reconstructive products.
Kenvue KVUE — a consumer health company spun off from Johnson & Johnson managing iconic personal care brands.
Anheuser-Busch InBev BUD — the world's largest brewer with a portfolio of over 500 beer brands sold globally.
Booking Holdings BKNG — the world's leading provider of online travel and related services across 220+ countries.
Stellantis STLA — a multinational automotive manufacturer formed from the merger of PSA Group and Fiat Chrysler.
Medtronic MDT — a global leader in medical devices, therapies, and services for chronic disease management.`,l=e=>`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 5H12V7H13V5C13 4.44772 12.5523 4 12 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13H6V12H4V5Z" fill="${e}"/><path d="M11 6H5V7H11V6Z" fill="${e}"/><path d="M15 11V10H9V11H15Z" fill="${e}"/><path d="M15 12V13H9V12H15Z" fill="${e}"/><path d="M15 15V14H9V15H15Z" fill="${e}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V9C17 8.44772 16.5523 8 16 8H8ZM8 9V16H16V9H8Z" fill="${e}"/><path d="M6 8H5V9H6V8Z" fill="${e}"/><path d="M5 10H6V11H5V10Z" fill="${e}"/></svg>`}));function d(e,t){let n=document.createElement(`div`);n.style.display=`contents`,n.innerHTML=e;let r=n.querySelector(`button[aria-label="Copy text"]`);if(!r||r.disabled)return n;let i=t.startsWith(`Modern`);r.style.borderRadius=i?`4px`:`2px`;let a=p[t]??`#E0E0E0`,o=m[t]??`#CBCBCB`;return r.addEventListener(`mouseenter`,()=>{r.style.background=a}),r.addEventListener(`mouseleave`,()=>{r.style.background=`transparent`}),r.addEventListener(`mousedown`,()=>{r.style.background=o}),r.addEventListener(`mouseup`,()=>{r.style.background=a}),n}var f,p,m,h,g,_,v,y,b,x,S;e((()=>{u(),r(),f=n,p={Light:`#E0E0E0`,"Light Classic":`#D8DADC`,Dark:`#555555`,"Dark Contrast":`#424242`,"Modern Light":`#F9F9F9`,"Modern Dark":`#585858`},m={Light:`#CBCBCB`,"Light Classic":`#7D858C`,Dark:`#606060`,"Dark Contrast":`#666666`,"Modern Light":`#EAEAEA`,"Modern Dark":`#686868`},h={title:`Components/Form/Text Area`,tags:[`autodocs`],args:{label:`Title`,caption:`Caption`,state:`no-scroll`,width:236,height:188,showLabel:!0,showCaption:!0,showCopyButton:!0,themeMode:`Auto`},argTypes:{label:{control:`text`,description:`Label above the text area`},caption:{control:`text`,description:`Supporting text below the field`},value:{control:`text`,description:`Current controlled text value`},state:{control:`select`,options:[`default`,`disabled`,`scroll`,`no-scroll`],description:`Rendered visual state`},width:{control:`number`,description:`Outer component width`},height:{control:`number`,description:`Visible text area height`},showLabel:{control:`boolean`,description:`Show the label row`},showCaption:{control:`boolean`,description:`Show the caption below the field`},showCopyButton:{control:`boolean`,description:`Show the copy action button`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...f],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},onChange:{table:{disable:!0}},onCopy:{table:{disable:!0}}},parameters:{docs:{description:{component:`Multi-line text field with optional copy action, caption, and themed scroll treatment for longer content.`}}}},g={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d(s({...e,theme:r}),r)}},_={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d(s({...e,state:`scroll`,theme:r}),r)},parameters:{docs:{description:{story:`Fixed scroll reference state for longer content.`}}}},v={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d(s({...e,state:`no-scroll`,theme:r}),r)},parameters:{docs:{description:{story:`Fixed no-scroll reference state without visible scrollbar treatment.`}}}},y={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,state:`disabled`,theme:r})},parameters:{docs:{description:{story:`Fixed disabled reference state that preserves layout without accepting input.`}}}},b={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d(s({...e,showCaption:!1,theme:r}),r)},parameters:{docs:{description:{story:`Variant without supporting caption text.`}}}},x={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,showCopyButton:!1,theme:r})},parameters:{docs:{description:{story:`Variant without the copy action button.`}}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({
      ...args,
      theme
    }), theme);
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({
      ...args,
      state: 'scroll',
      theme
    }), theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed scroll reference state for longer content.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({
      ...args,
      state: 'no-scroll',
      theme
    }), theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed no-scroll reference state without visible scrollbar treatment.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextArea({
      ...args,
      state: 'disabled',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed disabled reference state that preserves layout without accepting input.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveTextArea(TextArea({
      ...args,
      showCaption: false,
      theme
    }), theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant without supporting caption text.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextArea({
      ...args,
      showCopyButton: false,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant without the copy action button.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`ScrollArea`,`NoScrollArea`,`DisabledArea`,`NoCaption`,`NoCopyButton`]}))();export{g as Default,y as DisabledArea,b as NoCaption,x as NoCopyButton,v as NoScrollArea,_ as ScrollArea,S as __namedExportsOrder,h as default};