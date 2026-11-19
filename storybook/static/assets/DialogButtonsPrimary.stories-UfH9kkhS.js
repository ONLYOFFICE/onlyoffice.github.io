import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,r as i}from"./theme-utils-B-KYefhh.js";function a({label:e=`Button`,size:t=24,state:n=`default`,scale:r=!1,theme:i=`Light`}){let a=c,o=(a[i]??a.Light)[n]??(a[i]??a.Light).default,s=n===`loader`,u=n===`disabled`,d=s||u?`not-allowed`:`pointer`,f=r?`100%`:`auto`,p=i.startsWith(`Modern`),m=p?4:1,h=p?12:11,g=p?.24:.22,_=[`height:${t}px`,`min-width:${p?48:80}px`,`padding:0 ${p?12:32}px`,`background:${o.bg}`,`border:none`,`border-radius:${m}px`,`outline:${o.outline}`,`outline-offset:-1px`,`display:inline-flex`,`align-items:center`,`justify-content:center`,`box-sizing:border-box`,`cursor:${d}`,`width:${f}`].join(`;`),v=[`color:${o.text}`,`font-size:${h}px`,`font-family:Arial,Helvetica,sans-serif`,`font-weight:700`,`line-height:16px`,`letter-spacing:${g}px`,`white-space:nowrap`,`user-select:none`].join(`;`),y=s?`<span aria-hidden="true">${l(o.text)}</span>`:`<span style="${v}">${e}</span>`;return`<button type="button" style="${_}" ${u||s?`disabled`:``}>${y}</button>`}function o(e,t=!1){return`<div style="display:grid;grid-template-columns:${t?`1fr`:`repeat(auto-fill, minmax(180px, 1fr))`};gap:16px;align-items:center;">${e}</div>`}var s,c,l,u,d,f,p,m,h,g,_;e((()=>{r(),s=n,c={Light:{default:{bg:`#444444`,text:`#FFFFFF`,outline:`none`},hover:{bg:`#1C1C1C`,text:`#FFFFFF`,outline:`none`},pressed:{bg:`#1C1C1C`,text:`#FFFFFF`,outline:`none`},disabled:{bg:`rgba(0,0,0,0.50)`,text:`rgba(255,255,255,0.60)`,outline:`none`},loader:{bg:`rgba(0,0,0,0.50)`,text:`#FFFFFF`,outline:`none`}},"Light Classic":{default:{bg:`#7D858C`,text:`#FFFFFF`,outline:`none`},hover:{bg:`#666D73`,text:`#FFFFFF`,outline:`none`},pressed:{bg:`#666D73`,text:`#FFFFFF`,outline:`none`},disabled:{bg:`#A5A5A5`,text:`rgba(255,255,255,0.60)`,outline:`none`},loader:{bg:`#A5A5A5`,text:`#FFFFFF`,outline:`none`}},Dark:{default:{bg:`#DDDDDD`,text:`#333333`,outline:`none`},hover:{bg:`#FCFCFC`,text:`#333333`,outline:`none`},pressed:{bg:`#FCFCFC`,text:`#333333`,outline:`none`},disabled:{bg:`rgba(255,255,255,0.50)`,text:`rgba(51,51,51,0.60)`,outline:`none`},loader:{bg:`rgba(255,255,255,0.50)`,text:`#333333`,outline:`none`}},"Dark Contrast":{default:{bg:`#E6E6E6`,text:`#121212`,outline:`none`},hover:{bg:`#A6A6A6`,text:`#121212`,outline:`none`},pressed:{bg:`#A6A6A6`,text:`#121212`,outline:`none`},disabled:{bg:`#888888`,text:`rgba(18,18,18,0.60)`,outline:`none`},loader:{bg:`#888888`,text:`#121212`,outline:`none`}},"Modern Light":{default:{bg:`#4473CA`,text:`#FFFFFF`,outline:`none`},hover:{bg:`#2A5BB9`,text:`#FFFFFF`,outline:`none`},pressed:{bg:`#1D4FAF`,text:`#FFFFFF`,outline:`1px solid #2A5BB9`},disabled:{bg:`#BFD0F5`,text:`rgba(255,255,255,0.70)`,outline:`none`},loader:{bg:`#BFD0F5`,text:`#FFFFFF`,outline:`none`}},"Modern Dark":{default:{bg:`#4A7BE0`,text:`#E8E8E8`,outline:`none`},hover:{bg:`#366CDA`,text:`#E8E8E8`,outline:`none`},pressed:{bg:`#2A5BB9`,text:`#E8E8E8`,outline:`1px solid #4A7BE0`},disabled:{bg:`#375478`,text:`rgba(232,232,232,0.30)`,outline:`none`},loader:{bg:`#375478`,text:`#E8E8E8`,outline:`none`}}},l=e=>`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="animation:ui-dialog-spin 0.9s linear infinite;display:inline-block;" aria-hidden="true"><path d="M14.6663 8.00008C14.6663 11.682 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.682 1.33301 8.00008C1.33301 4.31818 4.31778 1.33341 7.99967 1.33341C11.6816 1.33341 14.6663 4.31818 14.6663 8.00008ZM3.66634 8.00008C3.66634 10.3933 5.60644 12.3334 7.99967 12.3334C10.3929 12.3334 12.333 10.3933 12.333 8.00008C12.333 5.60684 10.3929 3.66675 7.99967 3.66675C5.60644 3.66675 3.66634 5.60684 3.66634 8.00008Z" fill="${e}" opacity="0.2"/><path d="M7.99967 1.33341C8.87515 1.33341 9.74206 1.50584 10.5509 1.84087C11.3597 2.1759 12.0947 2.66697 12.7137 3.28602C13.3328 3.90508 13.8238 4.64001 14.1589 5.44884C14.4939 6.25768 14.6663 7.12459 14.6663 8.00008H12.333C12.333 7.43101 12.2209 6.86753 12.0032 6.34178C11.7854 5.81604 11.4662 5.33834 11.0638 4.93596C10.6614 4.53357 10.1837 4.21438 9.65797 3.99661C9.13222 3.77884 8.56873 3.66675 7.99967 3.66675V1.33341Z" fill="${e}"/></svg>`,u={title:`Components/Buttons/Dialog Buttons/Primary`,tags:[`autodocs`],args:{label:`Button`,size:24,interactive:!0,isHovered:!1,isClicked:!1,isDisabled:!1,isLoading:!1,themeMode:`Auto`},argTypes:{label:{control:`text`,description:`Visible action label`},size:{control:`select`,options:[22,24],description:`Compact or regular dialog button height`,table:{defaultValue:{summary:`24`}}},interactive:{control:`boolean`,description:`Allow the story to react to hover and click in the canvas`,table:{defaultValue:{summary:`true`}}},isHovered:{control:`boolean`,description:`Force hover appearance for visual review`},isClicked:{control:`boolean`,description:`Force pressed appearance for visual review`},isDisabled:{control:`boolean`,description:`Show the disabled state`},isLoading:{control:`boolean`,description:`Replace the label with the loading indicator`},minWidth:{control:`text`,description:`Override minimum button width (e.g. "120px")`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...s],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},variant:{table:{disable:!0}},scale:{table:{disable:!0}},state:{table:{disable:!0}}},parameters:{docs:{description:{component:`Primary dialog action button for the main confirm action in modal footers and compact plugin flows.`}}}},d={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),o=e.isDisabled?`disabled`:e.isLoading?`loader`:`default`;return i(t=>a({label:e.label,variant:`primary`,size:e.size,state:o===`default`?t:o,theme:r}),{disabled:o!==`default`})}},f={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return o(a({label:`Button`,size:22,state:`hover`,theme:r})+a({label:`Button`,size:24,state:`hover`,theme:r}))},parameters:{docs:{description:{story:`Hover state for both sizes. Move the pointer over the buttons in the canvas for the live effect.`}}}},p={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=e=>{let t=document.createElement(`div`);t.style.display=`inline-block`;let n=null,i=n=>{t.innerHTML=a({label:`Button`,size:e,state:n,theme:r})};return t.addEventListener(`mousedown`,()=>{i(`pressed`),clearTimeout(n),n=setTimeout(()=>i(`default`),180)}),i(`default`),t},o=document.createElement(`div`);return o.style.cssText=`display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:16px;align-items:center;`,o.appendChild(i(22)),o.appendChild(i(24)),o},parameters:{docs:{description:{story:`Pressed-state demo. Click a button to preview the active press moment.`}}}},m={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return o(a({label:`Button`,size:22,state:`disabled`,theme:r})+a({label:`Button`,size:24,state:`disabled`,theme:r}))},parameters:{docs:{description:{story:`Disabled buttons keep layout but should not invite interaction.`}}}},h={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return`<style>@keyframes ui-dialog-spin{to{transform:rotate(360deg)}}</style>`+o(a({label:`Button`,size:22,state:`loader`,theme:r})+a({label:`Button`,size:24,state:`loader`,theme:r}))},parameters:{docs:{description:{story:`Loading state while the action is in progress.`}}}},g={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return o(a({label:`Button`,size:22,state:`default`,scale:!0,theme:r})+a({label:`Button`,size:24,state:`default`,scale:!0,theme:r}),!0)},parameters:{docs:{description:{story:`Full-width layout variant for dense footers or narrow dialog flows.`}}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const state = args.isDisabled ? 'disabled' : args.isLoading ? 'loader' : 'default';
    return makeInteractive(hoverState => renderDialogButton({
      label: args.label,
      variant: 'primary',
      size: args.size,
      state: state !== 'default' ? state : hoverState,
      theme
    }), {
      disabled: state !== 'default'
    });
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(renderDialogButton({
      label: 'Button',
      size: 22,
      state: 'hover',
      theme
    }) + renderDialogButton({
      label: 'Button',
      size: 24,
      state: 'hover',
      theme
    }));
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover state for both sizes. Move the pointer over the buttons in the canvas for the live effect.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const makeClickDemo = size => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'inline-block';
      let pressTimer = null;
      const render = state => {
        wrapper.innerHTML = renderDialogButton({
          label: 'Button',
          size,
          state,
          theme
        });
      };
      wrapper.addEventListener('mousedown', () => {
        render('pressed');
        clearTimeout(pressTimer);
        pressTimer = setTimeout(() => render('default'), 180);
      });
      render('default');
      return wrapper;
    };
    const container = document.createElement('div');
    container.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));gap:16px;align-items:center;';
    container.appendChild(makeClickDemo(22));
    container.appendChild(makeClickDemo(24));
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressed-state demo. Click a button to preview the active press moment.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(renderDialogButton({
      label: 'Button',
      size: 22,
      state: 'disabled',
      theme
    }) + renderDialogButton({
      label: 'Button',
      size: 24,
      state: 'disabled',
      theme
    }));
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons keep layout but should not invite interaction.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return \`<style>@keyframes ui-dialog-spin{to{transform:rotate(360deg)}}</style>\` + Wrapper(renderDialogButton({
      label: 'Button',
      size: 22,
      state: 'loader',
      theme
    }) + renderDialogButton({
      label: 'Button',
      size: 24,
      state: 'loader',
      theme
    }));
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state while the action is in progress.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Wrapper(renderDialogButton({
      label: 'Button',
      size: 22,
      state: 'default',
      scale: true,
      theme
    }) + renderDialogButton({
      label: 'Button',
      size: 24,
      state: 'default',
      scale: true,
      theme
    }), true);
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-width layout variant for dense footers or narrow dialog flows.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Hovered`,`Clicked`,`Disabled`,`Loading`,`Scale`]}))();export{p as Clicked,d as Default,m as Disabled,f as Hovered,h as Loading,g as Scale,_ as __namedExportsOrder,u as default};