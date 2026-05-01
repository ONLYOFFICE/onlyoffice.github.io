import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{radius:1,background:`#FFFFFF`,border:`#C0C0C0`,hoverBorder:`#848484`,focusBorder:`#848484`,errorBorder:`#F62211`,disabledBackground:`#EFEFEF`,disabledOpacity:.5,titleColor:`rgba(0, 0, 0, 0.80)`,titleWeight:700,captionColor:`rgba(0, 0, 0, 0.40)`,errorTextColor:`#F62211`,placeholderColor:`rgba(0, 0, 0, 0.40)`,valueColor:`rgba(0, 0, 0, 0.80)`,disabledTextColor:`rgba(0, 0, 0, 0.80)`,cursorColor:`rgba(0, 0, 0, 0.80)`,iconColor:`rgba(0, 0, 0, 0.80)`,hiddenDotColor:`rgba(0, 0, 0, 0.80)`,typography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2}},"Light Classic":{radius:1,background:`#FFFFFF`,border:`#CFCFCF`,hoverBorder:`#848484`,focusBorder:`#848484`,errorBorder:`#D9534F`,disabledBackground:`#F1F1F1`,disabledOpacity:.5,titleColor:`#444444`,titleWeight:700,captionColor:`#A5A5A5`,errorTextColor:`#D9534F`,placeholderColor:`#A5A5A5`,valueColor:`#444444`,disabledTextColor:`#444444`,cursorColor:`#444444`,iconColor:`#444444`,hiddenDotColor:`#444444`,typography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2}},Dark:{radius:1,background:`#333333`,border:`#666666`,hoverBorder:`#CCCCCC`,focusBorder:`#CCCCCC`,errorBorder:`#F62211`,disabledBackground:`#505050`,disabledOpacity:.5,titleColor:`rgba(255, 255, 255, 0.80)`,titleWeight:700,captionColor:`rgba(255, 255, 255, 0.40)`,errorTextColor:`#F62211`,placeholderColor:`rgba(255, 255, 255, 0.40)`,valueColor:`rgba(255, 255, 255, 0.80)`,disabledTextColor:`rgba(255, 255, 255, 0.80)`,cursorColor:`rgba(255, 255, 255, 0.80)`,iconColor:`rgba(255, 255, 255, 0.80)`,hiddenDotColor:`rgba(255, 255, 255, 0.80)`,typography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2}},"Dark Contrast":{radius:1,background:`#1E1E1E`,border:`#696969`,hoverBorder:`#B8B8B8`,focusBorder:`#B8B8B8`,errorBorder:`#F62211`,disabledBackground:`#2A2A2A`,disabledOpacity:.5,titleColor:`#E8E8E8`,titleWeight:700,captionColor:`rgba(232, 232, 232, 0.50)`,errorTextColor:`#F62211`,placeholderColor:`rgba(232, 232, 232, 0.55)`,valueColor:`#E8E8E8`,disabledTextColor:`#E8E8E8`,cursorColor:`#E8E8E8`,iconColor:`#E8E8E8`,hiddenDotColor:`#E8E8E8`,typography:{fontSize:11,lineHeight:16,letterSpacing:.22},captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2}},"Modern Light":{radius:4,background:`#FFFFFF`,border:`#E1E1E1`,hoverBorder:`#4473CA`,focusBorder:`#4473CA`,errorBorder:`rgba(242, 61, 61, 0.80)`,disabledBackground:`#F3F3F3`,disabledOpacity:1,titleColor:`#383838`,titleWeight:400,captionColor:`rgba(0, 0, 0, 0.20)`,errorTextColor:`rgba(242, 61, 61, 0.80)`,placeholderColor:`rgba(0, 0, 0, 0.20)`,valueColor:`#383838`,disabledTextColor:`rgba(0, 0, 0, 0.20)`,cursorColor:`#383838`,iconColor:`#383838`,hiddenDotColor:`#383838`,typography:{fontSize:12,lineHeight:16,letterSpacing:.24},captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2}},"Modern Dark":{radius:4,background:`#404040`,border:`#686868`,hoverBorder:`#4A7BE0`,focusBorder:`#4A7BE0`,errorBorder:`rgba(242, 61, 61, 0.80)`,disabledBackground:`#222222`,disabledOpacity:1,titleColor:`#F3F3F3`,titleWeight:400,captionColor:`rgba(243, 243, 243, 0.40)`,errorTextColor:`rgba(242, 61, 61, 0.80)`,placeholderColor:`rgba(243, 243, 243, 0.40)`,valueColor:`#F3F3F3`,disabledTextColor:`rgba(243, 243, 243, 0.40)`,cursorColor:`#F3F3F3`,iconColor:`#EAEAEA`,hiddenDotColor:`#F3F3F3`,typography:{fontSize:12,lineHeight:16,letterSpacing:.24},captionTypography:{fontSize:10,lineHeight:12,letterSpacing:.2}}}}));function s({placeholder:e=`Enter text`,value:t=``,label:n=``,caption:r=``,errorText:o=`Error text`,state:s=`default`,placeholderState:c=`default`,withIconRight:l=!1,theme:u=`Light`,width:d=165}={}){let f=a[i(u)]??a.Light,p=s===`disabled`,m=s===`error`,h=s===`hover`,g=s===`focused`||s===`typing`,_=m?f.errorBorder:h||g?f.hoverBorder??f.focusBorder:f.border,v=c!==`hidden`;g&&`${f.focusBorder??f.hoverBorder}`;let y=[`flex:1`,`min-width:0`,`border:none`,`outline:none`,`background:transparent`,`color:${p?f.disabledTextColor:f.valueColor}`,`font-size:${f.typography.fontSize}px`,`font-family:Arial,Helvetica,sans-serif`,`line-height:${f.typography.lineHeight}px`,`letter-spacing:${f.typography.letterSpacing}px`,`padding:0`,`height:20px`].join(`;`),b=[`height:24px`,`display:flex`,`align-items:center`,`gap:8px`,`padding:0 8px`,`border-radius:${f.radius}px`,`border:1px solid ${_}`,`background:${p?f.disabledBackground:f.background}`,`opacity:${p?f.disabledOpacity:1}`,`box-sizing:border-box`].join(`;`),x=n?`<label style="color:${f.titleColor};font-weight:${f.titleWeight};font-size:${f.typography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${f.typography.lineHeight}px;letter-spacing:${f.typography.letterSpacing}px;">${n}</label>`:``,S=m?o:r,C=S?`<div style="color:${m?f.errorTextColor:f.captionColor};font-size:${f.captionTypography.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${f.captionTypography.lineHeight}px;">${S}</div>`:``,w=l?`<div style="flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;pointer-events:none;">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 7.00195L7 9.99976L10 12.9976L13 9.99976L10 7.00195ZM10 7.00249L7.75 9.25084L10 11.4992L12.25 9.25084L10 7.00249Z" fill="${f.iconColor}"/>
        </svg>
      </div>`:``;return`<div style="width:${d}px;display:grid;gap:4px;">
    ${x}
    <div style="${b}">
      <input type="text" placeholder="${v?e:``}" value="${t}" style="${y}" ${p?`disabled`:``}/>
      ${w}
    </div>
    ${C}
  </div>`}var c=e((()=>{o(),r()}));function l(e,t){let n=document.createElement(`div`);n.style.display=`contents`;let r=!1,i=!1,a=e.value??``,o=!1,c=(l=!1)=>{o=!0;let u=e.state===`disabled`?`disabled`:e.isHovered||i?`hover`:r?`focused`:a?`filled`:`default`;n.innerHTML=s({...e,theme:t,state:u,value:a});let d=n.querySelector(`input`);o=!1,d&&(d.value=a,l&&setTimeout(()=>{d.focus()},0),d.addEventListener(`focus`,()=>{o||r||(r=!0,c(!0))}),d.addEventListener(`blur`,()=>{o||!r||(r=!1,c(!1))}),d.addEventListener(`input`,e=>{a=e.target.value}),d.addEventListener(`mouseenter`,()=>{o||i||r||(i=!0,c(!1))}),d.addEventListener(`mouseleave`,()=>{o||!i||(i=!1,c(!1))}))};return c(!1),n}var u,d,f,p,m,h,g,_,v,y;e((()=>{c(),r(),u=n,d={title:`Components/Form/Text Field`,tags:[`autodocs`],args:{label:`Title`,caption:`Caption`,errorText:`Error text`,placeholder:`Line input`,value:``,state:`default`,placeholderState:`default`,withIconRight:!1,interactive:!0,isHovered:!1,themeMode:`Auto`},argTypes:{label:{control:`text`,description:`Label above the field`},caption:{control:`text`,description:`Supporting text below the field`},errorText:{control:`text`,description:`Validation message for the error state`},placeholder:{control:`text`,description:`Placeholder text shown inside the field`},value:{control:`text`,description:`Current controlled input value`},state:{control:`select`,options:[`default`,`hover`,`focused`,`typing`,`filled`,`error`,`disabled`],description:`Rendered visual state of the field`},placeholderState:{control:`select`,options:[`default`,`hidden`],description:`Show the placeholder normally or hide it for a denser layout`},withIconRight:{control:`boolean`,description:`Show the trailing icon button`},interactive:{control:`boolean`,description:`Allow hover/focus behavior directly in the canvas`},isHovered:{control:`boolean`,description:`Force hover appearance for review`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...u],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Single-line input with label, caption, error messaging, optional trailing icon, and theme-aware control states.`}}}},f={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return e.interactive===!1?s({...e,theme:r}):l(e,r)}},p={args:{state:`hover`,isHovered:!0,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,theme:r})},parameters:{docs:{description:{story:`Fixed hover reference state for the single-line field.`}}}},m={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,label:`Focused field`,state:`focused`,interactive:!1,theme:r})},parameters:{docs:{description:{story:`Fixed focused reference state used when the field is ready for typing.`}}}},h={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,label:`Field with error`,state:`error`,interactive:!1,theme:r})},parameters:{docs:{description:{story:`Fixed error reference state with validation messaging and error border.`}}}},g={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,label:`Disabled field`,state:`disabled`,interactive:!1,theme:r})},parameters:{docs:{description:{story:`Fixed disabled reference state that preserves layout but removes interaction.`}}}},_={args:{withIconRight:!0},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,label:`Icon right field`,withIconRight:!0,theme:r})},parameters:{docs:{description:{story:`Field with a trailing icon action.`}}}},v={args:{placeholderState:`hidden`},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return e.interactive===!1?s({...e,label:`Hidden placeholder`,placeholderState:`hidden`,theme:r}):l({...e,label:`Hidden placeholder`,placeholderState:`hidden`},r)},parameters:{docs:{description:{story:`Variant with hidden placeholder treatment for denser layouts.`}}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    if (args.interactive === false) {
      return TextField({
        ...args,
        theme
      });
    }
    return makeInteractiveTextField(args, theme);
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'hover',
    isHovered: true,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({
      ...args,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed hover reference state for the single-line field.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({
      ...args,
      label: 'Focused field',
      state: 'focused',
      interactive: false,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed focused reference state used when the field is ready for typing.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({
      ...args,
      label: 'Field with error',
      state: 'error',
      interactive: false,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed error reference state with validation messaging and error border.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({
      ...args,
      label: 'Disabled field',
      state: 'disabled',
      interactive: false,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed disabled reference state that preserves layout but removes interaction.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    withIconRight: true
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return TextField({
      ...args,
      label: 'Icon right field',
      withIconRight: true,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Field with a trailing icon action.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    placeholderState: 'hidden'
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    if (args.interactive === false) {
      return TextField({
        ...args,
        label: 'Hidden placeholder',
        placeholderState: 'hidden',
        theme
      });
    }
    return makeInteractiveTextField({
      ...args,
      label: 'Hidden placeholder',
      placeholderState: 'hidden'
    }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant with hidden placeholder treatment for denser layouts.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`HoveredField`,`FocusedField`,`ErrorField`,`DisabledField`,`IconRightField`,`HiddenPlaceholderField`]}))();export{f as Default,g as DisabledField,h as ErrorField,m as FocusedField,v as HiddenPlaceholderField,p as HoveredField,_ as IconRightField,y as __namedExportsOrder,d as default};