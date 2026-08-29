import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{border:`#C0C0C0`,text:`rgba(0, 0, 0, 0.8)`,unselectedBg:`#EFEFEF`,selectedBg:`#F7F7F7`,hoverBg:`#F9F9F9`,typography:{fontSize:11,fontWeight:400,lineHeight:16,letterSpacing:.22}},"Light Classic":{border:`#CFCFCF`,text:`#444444`,unselectedBg:`#F1F1F1`,selectedBg:`#F1F1F1`,hoverBg:`#D8DADC`,typography:{fontSize:11,fontWeight:400,lineHeight:16,letterSpacing:.22}},Dark:{border:`#666666`,text:`rgba(255, 255, 255, 0.8)`,unselectedBg:`#505050`,selectedBg:`#404040`,hoverBg:`#555555`,typography:{fontSize:11,fontWeight:400,lineHeight:16,letterSpacing:.22}},"Dark Contrast":{border:`#696969`,text:`#E8E8E8`,unselectedBg:`#2A2A2A`,selectedBg:`#2A2A2A`,hoverBg:`#424242`,typography:{fontSize:11,fontWeight:400,lineHeight:16,letterSpacing:.22}},"Modern Light":{border:`#EAEAEA`,text:`#383838`,unselectedBg:`#F3F3F3`,selectedBg:`#FFFFFF`,hoverBg:`#F9F9F9`,typography:{fontSize:12,fontWeight:500,lineHeight:20,letterSpacing:.24},indicatorColor:`#4473CA`,indicatorHeight:3},"Modern Dark":{border:`#585858`,text:`#F3F3F3`,unselectedBg:`#222222`,selectedBg:`#404040`,hoverBg:`#585858`,typography:{fontSize:12,fontWeight:500,lineHeight:20,letterSpacing:.24},indicatorColor:`#4A7BE0`,indicatorHeight:3}}}));function s({items:e=[{id:`paragraph`,label:`Paragraph`},{id:`table`,label:`Table`},{id:`style`,label:`Style`}],activeId:t=`paragraph`,hoveredId:n,withIcon:r=!1,theme:o,scaled:s=!1}={}){let l=i(o),u=a[l]??a.Light,d=l.startsWith(`Modern`),f=e.map(e=>{let i=e.id===t,a=e.id===n?u.hoverBg:i?u.selectedBg:u.unselectedBg,o=i?`none`:`1px solid ${u.border}`,l=d&&i?37:40,f=d&&i?`<span aria-hidden="true" style="height:${u.indicatorHeight??3}px;width:100%;background:${u.indicatorColor??`transparent`};display:block;"></span>`:``,p=r?c(u.text):``;return`<button type="button" role="tab" aria-selected="${i}" style="appearance:none;-webkit-appearance:none;outline:none;height:40px;padding:0;border:1px solid ${u.border};border-bottom:${o};background:${a};color:${u.text};box-sizing:border-box;display:inline-flex;flex-direction:column;align-items:stretch;justify-content:flex-start;cursor:pointer;${s?`flex:1;`:``}">
      <span style="height:${l}px;padding:0 12px;display:inline-flex;align-items:center;justify-content:center;gap:4px;font-size:${u.typography.fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:${u.typography.fontWeight};line-height:${u.typography.lineHeight}px;letter-spacing:${u.typography.letterSpacing}px;color:${u.text};white-space:nowrap;">${p}${e.label}</span>
      ${f}
    </button>`}).join(``);return`<div class="ui-tabs" role="tablist" style="display:${s?`flex`:`inline-flex`};${s?`width:100%;`:``}background:transparent;">${f}</div>`}var c,l=e((()=>{o(),r(),c=e=>`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 5H12V7H13V5C13 4.44772 12.5523 4 12 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13H6V12H4V5Z" fill="${e}"/><path d="M11 6H5V7H11V6Z" fill="${e}"/><path d="M15 11V10H9V11H15Z" fill="${e}"/><path d="M15 12V13H9V12H15Z" fill="${e}"/><path d="M15 15V14H9V15H15Z" fill="${e}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V9C17 8.44772 16.5523 8 16 8H8ZM8 9V16H16V9H8Z" fill="${e}"/><path d="M6 8H5V9H6V8Z" fill="${e}"/><path d="M5 10H6V11H5V10Z" fill="${e}"/></svg>`}));function u({items:e,activeId:t,withIcon:n,scaled:r,theme:i}){let o=document.createElement(`div`);o.style.display=`contents`;let c=t??`paragraph`,l=a[i]??a.Light,u=()=>{o.innerHTML=s({items:e,activeId:c,withIcon:n,scaled:r,theme:i}),o.querySelectorAll(`button[role="tab"]`).forEach((t,n)=>{let r=e[n];if(!r)return;let i=t.style.background;t.addEventListener(`mouseenter`,()=>{t.style.background=l.hoverBg}),t.addEventListener(`mouseleave`,()=>{t.style.background=i}),t.addEventListener(`click`,()=>{c=r.id,u()})})};return u(),o}var d,f,p,m,h,g,_,v;e((()=>{l(),r(),o(),d=n,f=[{id:`paragraph`,label:`Paragraph`},{id:`table`,label:`Table`},{id:`style`,label:`Style`}],p={title:`Components/Data Display/Tabs`,tags:[`autodocs`],args:{items:f,activeId:`paragraph`,state:`default`,hoveredId:`table`,interactive:!0,withIcon:!1,scaled:!1,themeMode:`Auto`},argTypes:{activeId:{control:`text`,description:`Currently selected tab id`},state:{control:`select`,options:[`default`,`hover`],description:`Rendered visual state used for reference-only tab styling`},hoveredId:{control:`text`,description:`Tab id used when the hover state is forced for reference`},interactive:{control:`boolean`,description:`Allow hover and selection changes in the canvas`},withIcon:{control:`boolean`,description:`Show leading icons in the tab labels`},scaled:{control:`boolean`,description:`Stretch tabs to fill the full container width`},items:{control:`object`,description:`Tab definitions with ids and labels`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...d],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},onChange:{table:{disable:!0}}},parameters:{docs:{description:{component:`Horizontal tabs for compact mode switching inside panels and dialogs, with optional icons and live hover behavior.`}}}},m={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=e.items??f;return u({...e,items:i,theme:r})}},h={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=e.items??f;return u({...e,items:i,withIcon:!0,theme:r})},parameters:{docs:{description:{story:`Tabs with leading icons for richer navigation labels.`}}}},g={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=e.items??f;return u({...e,items:i,activeId:`paragraph`,theme:r})},parameters:{docs:{description:{story:`Interactive hover demo where a non-selected tab can be highlighted. Move the pointer over another tab in the canvas.`}}}},_={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=e.items??f;return u({...e,items:i,activeId:`paragraph`,theme:r})},parameters:{docs:{description:{story:`Interactive hover demo when the selected tab is also under the pointer. Move the pointer over the active tab in the canvas.`}}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({
      ...args,
      items,
      theme
    });
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({
      ...args,
      items,
      withIcon: true,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with leading icons for richer navigation labels.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({
      ...args,
      items,
      activeId: 'paragraph',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo where a non-selected tab can be highlighted. Move the pointer over another tab in the canvas.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const items = args.items ?? defaultItems;
    return makeInteractiveTabs({
      ...args,
      items,
      activeId: 'paragraph',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo when the selected tab is also under the pointer. Move the pointer over the active tab in the canvas.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v=[`Default`,`IconTabs`,`HoveredTabs`,`HoveredSelected`]}))();export{m as Default,_ as HoveredSelected,g as HoveredTabs,h as IconTabs,v as __namedExportsOrder,p as default};