import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,t as i}from"./theme-utils-B-KYefhh.js";function a({items:e=l,theme:t,isHoveredIndex:n=-1,isClickedIndex:r=-1,defaultOpenId:u}={}){let d=i(t),f=d.isModern,p=c[d.theme]??d.surfaceAlt,m=f?12:11,h=e.map((e,i)=>{let c=!!(e.items&&e.items.length>0),l=u===e.id,h=n===i||l,g=r===i,_=e.disabled?d.muted:d.fg,v=e.disabled?`transparent`:g?p:h?d.surfaceAlt:`transparent`,y=e.type===`iconsBoth`||c,b=e.type===`noIcon`?`5px 20px`:`3px 10px`,x=c&&l?`<div style="position:absolute;left:100%;top:0;z-index:1;">${a({items:e.items,theme:t})}</div>`:``;return`<div style="position:${c?`relative`:`static`};">
      <button type="button" style="width:100%;min-height:26px;border:none;border-radius:0;background:${v};padding:${b};color:${e.disabled?d.muted:d.fg};display:flex;align-items:center;gap:4px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;font-size:${m}px;line-height:16px;letter-spacing:${f?.24:.22}px;cursor:${e.disabled?`default`:`pointer`};text-align:left;">
        ${e.type===`noIcon`?``:`<span style="width:20px;display:inline-flex;justify-content:center;">${o(_)}</span>`}
        <span style="flex:1;min-width:0;">${e.label}</span>
        ${y?`<span style="width:20px;display:inline-flex;justify-content:center;">${s(_)}</span>`:``}
      </button>
      ${x}
    </div>`}).join(``);return`<div style="min-width:180px;border:1px solid ${d.border};background:${d.bg};border-radius:2px;padding:4px 0;display:inline-grid;box-sizing:border-box;">${h}</div>`}var o,s,c,l,u=e((()=>{r(),o=e=>`<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C8.4 2 7 3.1 7 4.5V5H5.5C4.7 5 4 5.7 4 6.5V15.5C4 16.3 4.7 17 5.5 17H14.5C15.3 17 16 16.3 16 15.5V6.5C16 5.7 15.3 5 14.5 5H13V4.5C13 3.1 11.6 2 10 2ZM10 3C11.1 3 12 3.7 12 4.5V5H8V4.5C8 3.7 8.9 3 10 3ZM5.5 6H14.5C14.8 6 15 6.2 15 6.5V15.5C15 15.8 14.8 16 14.5 16H5.5C5.2 16 5 15.8 5 15.5V6.5C5 6.2 5.2 6 5.5 6Z" fill="${e}"/></svg>`,s=e=>`<svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M2 1L4 3L2 5" stroke="${e}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,c={Light:`#CBCBCB`,"Light Classic":`#7D858C`,Dark:`#666666`,"Dark Contrast":`#666666`,"Modern Light":`#DCE7FA`,"Modern Dark":`#375478`},l=[{id:`1`,label:`Menu item`,type:`iconLeft`},{id:`2`,label:`Menu item`,type:`iconsBoth`},{id:`3`,label:`Menu item`,type:`noIcon`},{id:`4`,label:`Menu item`,type:`iconLeft`,disabled:!0}]}));function d({items:e,theme:t}){let n=document.createElement(`div`);n.style.display=`contents`;let r=-1,i=null,o=()=>{n.innerHTML=a({items:e,theme:t,isHoveredIndex:r,isClickedIndex:-1,defaultOpenId:i});let s=n.querySelector(`div[style*="min-width:180px"]`);s&&Array.from(s.children).forEach((t,n)=>{let a=e[n];if(!(!a||a.disabled))if(a.items&&a.items.length>0)t.addEventListener(`mouseenter`,()=>{r=n,i=a.id,o()}),t.addEventListener(`mouseleave`,()=>{r=-1,i=null,o()});else{let e=t.querySelector(`button`);if(!e)return;e.addEventListener(`mouseenter`,()=>{r=n,i=null,o()}),e.addEventListener(`mouseleave`,()=>{r=-1,o()})}})};return o(),n}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{u(),r(),f=n,p=[{id:`1`,label:`Menu item`,type:`iconLeft`},{id:`2`,label:`Menu item`,type:`iconsBoth`},{id:`3`,label:`Menu item`,type:`noIcon`},{id:`4`,label:`Disabled item`,type:`iconLeft`,disabled:!0}],m=[{id:`1`,label:`Menu item`,type:`iconLeft`},{id:`2`,label:`Another item`,type:`iconLeft`},{id:`3`,label:`Disabled item`,type:`iconLeft`,disabled:!0}],h=[{id:`1`,label:`Menu item`,type:`iconsBoth`},{id:`2`,label:`Submenu item`,type:`iconsBoth`},{id:`3`,label:`Disabled item`,type:`iconsBoth`,disabled:!0}],g=[{id:`1`,label:`Menu item`,type:`noIcon`},{id:`2`,label:`Another item`,type:`noIcon`},{id:`3`,label:`Disabled item`,type:`noIcon`,disabled:!0}],_=[{id:`1`,label:`Menu item`,type:`iconLeft`},{id:`2`,label:`Has submenu`,type:`iconLeft`,items:[{id:`2-1`,label:`Submenu item 1`,type:`iconLeft`},{id:`2-2`,label:`Submenu item 2`,type:`iconLeft`},{id:`2-3`,label:`Disabled`,type:`iconLeft`,disabled:!0}]},{id:`3`,label:`Menu item`,type:`noIcon`},{id:`4`,label:`Disabled item`,type:`iconLeft`,disabled:!0}],v={title:`Components/Actions/Context Menu`,tags:[`autodocs`],args:{items:p,interactive:!0,isHoveredIndex:void 0,isClickedIndex:void 0,themeMode:`Auto`},argTypes:{items:{control:`object`,description:`Menu items`},interactive:{control:`boolean`,description:`Enable real hover/press in canvas`},isHoveredIndex:{control:{type:`number`,min:0},description:`Force-hover item by index (0-based) for docs preview`},isClickedIndex:{control:{type:`number`,min:0},description:`Force-pressed item by index (0-based) for docs preview`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...f],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Context menu for compact action lists. Includes plain items, left-icon items, submenu-style dual-icon items, and disabled rows.`}}}},y={args:{items:_,interactive:!0},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d({items:e.items,theme:r})}},b={args:{items:m},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d({items:e.items,theme:r})},parameters:{docs:{description:{story:`Context menu with icon-left items only.`}}}},x={args:{items:h},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d({items:e.items,theme:r})}},S={args:{items:g},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return d({items:e.items,theme:r})}},C={args:{items:p,isHoveredIndex:0,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({items:e.items,theme:r,isHoveredIndex:e.isHoveredIndex??0,isClickedIndex:-1})},parameters:{docs:{description:{story:`Force-hover on the first item. Switch theme via toolbar to preview all themes.`}}}},w={args:{items:p,isClickedIndex:0,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({items:e.items,theme:r,isHoveredIndex:-1,isClickedIndex:e.isClickedIndex??0})},parameters:{docs:{description:{story:`Force-pressed on the first item. Switch theme via toolbar to preview all themes.`}}}},T={args:{items:_,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({items:e.items,theme:r,defaultOpenId:`2`,isHoveredIndex:-1,isClickedIndex:-1})},parameters:{docs:{description:{story:`Submenu expanded on «Has submenu» item. Switch theme in toolbar to preview across themes.`}}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    items: submenuItems,
    interactive: true
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({
      items: args.items,
      theme
    });
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    items: iconLeftItems
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({
      items: args.items,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu with icon-left items only.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    items: iconsBothItems
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({
      items: args.items,
      theme
    });
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    items: noIconItems
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveMenu({
      items: args.items,
      theme
    });
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixedItems,
    isHoveredIndex: 0,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return ContextMenu({
      items: args.items,
      theme,
      isHoveredIndex: args.isHoveredIndex ?? 0,
      isClickedIndex: -1
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Force-hover on the first item. Switch theme via toolbar to preview all themes.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    items: mixedItems,
    isClickedIndex: 0,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return ContextMenu({
      items: args.items,
      theme,
      isHoveredIndex: -1,
      isClickedIndex: args.isClickedIndex ?? 0
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Force-pressed on the first item. Switch theme via toolbar to preview all themes.'
      }
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    items: submenuItems,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return ContextMenu({
      items: args.items,
      theme,
      defaultOpenId: '2',
      isHoveredIndex: -1,
      isClickedIndex: -1
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Submenu expanded on «Has submenu» item. Switch theme in toolbar to preview across themes.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`IconLeftItems`,`IconsBothItems`,`NoIconItems`,`HoveredItem`,`PressedItem`,`WithSubmenu`]}))();export{y as Default,C as HoveredItem,b as IconLeftItems,x as IconsBothItems,S as NoIconItems,w as PressedItem,T as WithSubmenu,E as __namedExportsOrder,v as default};