import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";function a({direction:e=`back`,state:t=`default`,theme:n,isDisabled:r=!1}={}){let a=o[i(n)]??o.Light,c=t===`hover`,l=t===`pressed`,u=r||t===`disabled`,d=l?`0px 2px 6px rgba(0, 0, 0, 0.30)`:c?`0px 6px 12px rgba(0, 0, 0, 0.18)`:a.shadow,f=l?`translateY(0.5px)`:`none`,p=u?`0.45`:`1`,m=s[e]??s.back;return`<button
    type="button"
    aria-label="${e===`back`?`Previous`:`Next`}"
    style="
      display:inline-flex;
      align-items:center;
      justify-content:center;
      width:40px;
      height:40px;
      border-radius:50%;
      border:none;
      outline:none;
      cursor:${u?`not-allowed`:`pointer`};
      background:${a.bg};
      color:${a.fg};
      box-shadow:${d};
      transform:${f};
      opacity:${p};
      box-sizing:border-box;
      padding:0;
      transition:box-shadow 120ms ease, opacity 120ms ease;
      flex-shrink:0;
    "
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="${m}" fill="${a.fg}"/>
    </svg>
  </button>`}var o,s,c=e((()=>{r(),o={Light:{bg:`rgba(0, 0, 0, 0.80)`,fg:`#FFFFFF`,shadow:`0px 4px 10px rgba(0, 0, 0, 0.10)`},"Light Classic":{bg:`#444444`,fg:`#FFFFFF`,shadow:`0px 4px 10px rgba(0, 0, 0, 0.10)`},Dark:{bg:`rgba(255, 255, 255, 0.80)`,fg:`#444444`,shadow:`0px 4px 10px rgba(0, 0, 0, 0.40)`},"Dark Contrast":{bg:`#E8E8E8`,fg:`#2A2A2A`,shadow:`0px 4px 10px rgba(0, 0, 0, 0.40)`},"Modern Light":{bg:`#383838`,fg:`#FFFFFF`,shadow:`0px 4px 10px rgba(0, 0, 0, 0.10)`},"Modern Dark":{bg:`#EAEAEA`,fg:`#222222`,shadow:`0px 4px 10px rgba(0, 0, 0, 0.10)`}},s={back:`M8 12L17.5 2L16.5 1L6 12L16.5 23L17.5 22L8 12Z`,next:`M16 12L6.5 22L7.5 23L18 12L7.5 1L6.5 2L16 12Z`}}));function l({direction:e,theme:t,isDisabled:n,args:r}){if(n){let n=document.createElement(`div`);return n.style.display=`contents`,n.innerHTML=a({direction:e,state:`disabled`,theme:t,isDisabled:!0}),n}let i=document.createElement(`div`);if(i.style.display=`contents`,!r.interactive)return i.innerHTML=a({direction:e,state:r.isClicked?`pressed`:r.isHovered?`hover`:`default`,theme:t}),i;let o=!1,s=!1,c=()=>{i.innerHTML=a({direction:e,state:s?`pressed`:o?`hover`:`default`,theme:t})};return i.addEventListener(`mouseenter`,()=>{o=!0,c()}),i.addEventListener(`mouseleave`,()=>{o=!1,s=!1,c()}),i.addEventListener(`mousedown`,()=>{s=!0,c()}),i.addEventListener(`mouseup`,()=>{s=!1,c()}),c(),i}var u,d,f,p,m,h,g;e((()=>{c(),r(),u=n,d={title:`Components/Actions/Preview Controls`,tags:[`autodocs`],args:{direction:`back`,interactive:!0,isHovered:!1,isClicked:!1,isDisabled:!1,themeMode:`Auto`},argTypes:{direction:{control:`select`,options:[`back`,`next`],description:`Arrow direction`,table:{defaultValue:{summary:`back`}}},interactive:{control:`boolean`,description:`Allow hover and click feedback directly in the canvas`,table:{defaultValue:{summary:`true`}}},isHovered:{control:`boolean`,description:`Force hover appearance for visual review`},isClicked:{control:`boolean`,description:`Force pressed appearance for visual review`},isDisabled:{control:`boolean`,description:`Render in disabled state`,table:{defaultValue:{summary:`false`}}},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...u],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Circular arrow button used for navigating forward and backward in a preview carousel. Theme-aware with shadow-based state feedback.`}}}},f={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);return i.style.display=`flex`,i.style.gap=`40px`,i.style.alignItems=`center`,i.appendChild(l({direction:`back`,theme:r,isDisabled:e.isDisabled,args:e})),i.appendChild(l({direction:`next`,theme:r,isDisabled:e.isDisabled,args:e})),i},parameters:{docs:{description:{story:`Back and next preview controls side by side. Hover or click to see state transitions.`}}}},p={render:(e,n)=>l({direction:`back`,theme:t(e.themeMode,n.globals.theme),isDisabled:e.isDisabled,args:e}),parameters:{docs:{description:{story:`Back (previous) preview control in isolation.`}}}},m={render:(e,n)=>l({direction:`next`,theme:t(e.themeMode,n.globals.theme),isDisabled:e.isDisabled,args:e}),parameters:{docs:{description:{story:`Next preview control in isolation.`}}}},h={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);i.style.display=`flex`,i.style.gap=`40px`,i.style.alignItems=`center`;let o=document.createElement(`div`);o.style.display=`contents`,o.innerHTML=a({direction:`back`,state:`disabled`,theme:r,isDisabled:!0});let s=document.createElement(`div`);return s.style.display=`contents`,s.innerHTML=a({direction:`next`,state:`disabled`,theme:r,isDisabled:!0}),i.appendChild(o),i.appendChild(s),i},args:{isDisabled:!0},parameters:{docs:{description:{story:`Both preview controls in the disabled state.`}}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '40px';
    wrapper.style.alignItems = 'center';
    wrapper.appendChild(makeInteractiveControl({
      direction: 'back',
      theme,
      isDisabled: args.isDisabled,
      args
    }));
    wrapper.appendChild(makeInteractiveControl({
      direction: 'next',
      theme,
      isDisabled: args.isDisabled,
      args
    }));
    return wrapper;
  },
  parameters: {
    docs: {
      description: {
        story: 'Back and next preview controls side by side. Hover or click to see state transitions.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveControl({
      direction: 'back',
      theme,
      isDisabled: args.isDisabled,
      args
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Back (previous) preview control in isolation.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveControl({
      direction: 'next',
      theme,
      isDisabled: args.isDisabled,
      args
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Next preview control in isolation.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '40px';
    wrapper.style.alignItems = 'center';
    const back = document.createElement('div');
    back.style.display = 'contents';
    back.innerHTML = PreviewControl({
      direction: 'back',
      state: 'disabled',
      theme,
      isDisabled: true
    });
    const next = document.createElement('div');
    next.style.display = 'contents';
    next.innerHTML = PreviewControl({
      direction: 'next',
      state: 'disabled',
      theme,
      isDisabled: true
    });
    wrapper.appendChild(back);
    wrapper.appendChild(next);
    return wrapper;
  },
  args: {
    isDisabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Both preview controls in the disabled state.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Back`,`Next`,`Disabled`]}))();export{p as Back,f as Default,h as Disabled,m as Next,g as __namedExportsOrder,d as default};