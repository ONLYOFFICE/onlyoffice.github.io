import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{default:{off:{track:`#C0C0C0`,thumb:`#FFFFFF`},on:{track:`rgba(0, 0, 0, 0.80)`,thumb:`#FFFFFF`}},hover:{off:{track:`#C0C0C0`,thumb:`#FFFFFF`},on:{track:`rgba(0, 0, 0, 0.80)`,thumb:`#FFFFFF`}},disabled:{off:{track:`#EFEFEF`,thumb:`#FFFFFF`},on:{track:`rgba(0, 0, 0, 0.50)`,thumb:`#FFFFFF`}}},"Light Classic":{default:{off:{track:`#CFCFCF`,thumb:`#FFFFFF`},on:{track:`#444444`,thumb:`#FFFFFF`}},hover:{off:{track:`#CFCFCF`,thumb:`#FFFFFF`},on:{track:`#444444`,thumb:`#FFFFFF`}},disabled:{off:{track:`#F1F1F1`,thumb:`#FFFFFF`},on:{track:`#A5A5A5`,thumb:`#FFFFFF`}}},Dark:{default:{off:{track:`#666666`,thumb:`#333333`},on:{track:`rgba(255, 255, 255, 0.80)`,thumb:`#333333`}},hover:{off:{track:`#666666`,thumb:`#333333`},on:{track:`rgba(255, 255, 255, 0.80)`,thumb:`#333333`}},disabled:{off:{track:`#505050`,thumb:`#333333`},on:{track:`rgba(255, 255, 255, 0.50)`,thumb:`#333333`}}},"Dark Contrast":{default:{off:{track:`#696969`,thumb:`#1E1E1E`},on:{track:`#E8E8E8`,thumb:`#1E1E1E`}},hover:{off:{track:`#696969`,thumb:`#1E1E1E`},on:{track:`#E8E8E8`,thumb:`#1E1E1E`}},disabled:{off:{track:`#2A2A2A`,thumb:`#1E1E1E`},on:{track:`#888888`,thumb:`#1E1E1E`}}},"Modern Light":{default:{off:{track:`#FFFFFF`,trackBorder:`#7F7F7F`,thumb:`#7F7F7F`},on:{track:`#4473CA`,thumb:`#FFFFFF`}},hover:{off:{track:`#FFFFFF`,trackBorder:`#7F7F7F`,thumb:`#7F7F7F`},on:{track:`#4473CA`,thumb:`#FFFFFF`}},disabled:{off:{track:`#FFFFFF`,trackBorder:`#7F7F7F`,thumb:`#7F7F7F`,opacity:.4},on:{track:`#4473CA`,thumb:`#FFFFFF`,opacity:.4}}},"Modern Dark":{default:{off:{track:`#404040`,trackBorder:`#969696`,thumb:`#969696`},on:{track:`#4A7BE0`,thumb:`#404040`}},hover:{off:{track:`#404040`,trackBorder:`#969696`,thumb:`#969696`},on:{track:`#4A7BE0`,thumb:`#404040`}},disabled:{off:{track:`#404040`,trackBorder:`#969696`,thumb:`#969696`,opacity:.4},on:{track:`#4A7BE0`,thumb:`#404040`,opacity:.4}}}}}));function s({checked:e=!1,state:t=`default`,theme:n=`Light`}={}){let r=i(n),o=t===`disabled`,s=a[r]?.[t]??a.Light?.default,c=e?s.on:s.off,l=e?`flex-end`:`flex-start`,u=c.opacity??1;return`<button type="button" role="switch" aria-checked="${e}" class="ui-switch"
    style="width:30px;height:16px;border-radius:8px;border:${c.trackBorder?`1px solid ${c.trackBorder}`:`none`};background:${c.track};display:inline-flex;align-items:center;justify-content:${l};padding:1px;box-sizing:border-box;cursor:${o?`default`:`pointer`};opacity:${u};transition:all 120ms ease;"
    ${o?`disabled`:``}>
    <span style="width:12px;height:12px;border-radius:6px;background:${c.thumb};flex-shrink:0;"></span>
  </button>`}var c=e((()=>{o(),r()}));function l({checked:e,state:t,interactive:n,theme:r}){let i=t===`disabled`;if(!n||i){let n=document.createElement(`div`);return n.style.display=`contents`,n.innerHTML=s({checked:e,state:i?`disabled`:t,theme:r}),n}let a=document.createElement(`div`);a.style.display=`contents`;let o=!!e,c=!1,l=()=>{a.innerHTML=s({checked:o,state:c?`hover`:`default`,theme:r})};return a.addEventListener(`mouseenter`,()=>{c=!0,l()}),a.addEventListener(`mouseleave`,()=>{c=!1,l()}),a.addEventListener(`click`,()=>{o=!o,l()}),l(),a}var u,d,f,p,m,h;e((()=>{c(),r(),u=n,d={title:`Components/Form/Switches`,tags:[`autodocs`],args:{checked:!1,state:`default`,interactive:!0,themeMode:`Auto`},argTypes:{checked:{control:`boolean`,description:`Current on/off value`},state:{control:`select`,options:[`default`,`hover`,`disabled`],description:`Rendered visual state`},interactive:{control:`boolean`,description:`Allow hover and toggle behavior directly in the canvas`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...u],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},onChange:{table:{disable:!0}}},parameters:{docs:{description:{component:`Switch control with on/off values and state variants.`}}}},f={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return l({...e,theme:r})}},p={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return l({...e,state:`default`,interactive:!0,theme:r})},parameters:{docs:{description:{story:`Interactive hover demo for the switch. Move the pointer over the control in the canvas.`}}}},m={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);return i.style.display=`contents`,i.innerHTML=s({checked:!!e.checked,state:`disabled`,theme:r}),i},parameters:{docs:{description:{story:`Fixed disabled reference state for the switch.`}}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeSwitch({
      ...args,
      theme
    });
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeSwitch({
      ...args,
      state: 'default',
      interactive: true,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for the switch. Move the pointer over the control in the canvas.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.display = 'contents';
    el.innerHTML = Switch({
      checked: Boolean(args.checked),
      state: 'disabled',
      theme
    });
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed disabled reference state for the switch.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`HoveredSwitch`,`DisabledSwitches`]}))();export{f as Default,m as DisabledSwitches,p as HoveredSwitch,h as __namedExportsOrder,d as default};