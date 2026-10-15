import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,t as i}from"./theme-utils-B-KYefhh.js";function a({size:e=`S`,label:t=`Loading...`,overlay:n=!1,theme:r}={}){let a=i(r),o=e===`M`?28:20,s=e===`M`?15:a.isModern?12:11,c=e===`M`?20:16,l=e===`M`?12:8,u=e===`M`?.3:a.isModern?.24:.22,d=n?`#FFFFFF`:a.fg,f=n?`rgba(255,255,255,0.25)`:a.border,p=n?{Light:`rgba(68, 68, 68, 0.95)`,"Light Classic":`#000000a6`,"Modern Light":`#383838`,"Modern Dark":`#343434`,"Dark Contrast":`rgba(18, 18, 18, 0.95)`,Dark:`rgba(24, 24, 24, 0.95)`}[a.theme]??`rgba(68,68,68,0.95)`:`transparent`;return`<div style="display:inline-flex;align-items:center;gap:${l}px;padding:${n?`24px 32px`:`0`};border-radius:${n?8:0}px;box-sizing:border-box;background:${p};">
    <span class="ui-loader-spinner" style="width:${o}px;height:${o}px;border-radius:50%;border:2px solid ${f};border-top-color:${d};display:inline-block;"></span>
    <span style="color:${d};font-family:Arial,Helvetica,sans-serif;font-size:${s}px;line-height:${c}px;letter-spacing:${u}px;">${t}</span>
  </div>`}var o=e((()=>{r()})),s,c,l,u,d,f;e((()=>{o(),r(),s=n,c={title:`Components/Feedback/Loader`,tags:[`autodocs`],args:{size:`S`,label:`Loading...`,overlay:!1,themeMode:`Auto`},argTypes:{size:{control:`select`,options:[`S`,`M`],description:`Compact or regular loader size`},label:{control:`text`,description:`Visible loading message`},overlay:{control:`boolean`,description:`Use the blocking overlay presentation`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...s],description:`Auto = current Storybook toolbar theme`},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Loader for inline busy states and blocking overlay states.`}}}},l={name:`S`,render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({size:`S`,label:e.label,overlay:!1,theme:r})}},u={name:`M`,render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({size:`M`,label:e.label,overlay:!1,theme:r})},parameters:{docs:{description:{story:`Regular inline loader size.`}}}},d={name:`Loader With Background`,render:(e,n)=>a({size:`M`,label:`Loading...`,overlay:!0,theme:t(e.themeMode,n.globals.theme)}),parameters:{docs:{description:{story:`Blocking overlay loader for modal or full-surface waiting states.`}}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'S',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Loader({
      size: 'S',
      label: args.label,
      overlay: false,
      theme
    });
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'M',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Loader({
      size: 'M',
      label: args.label,
      overlay: false,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Regular inline loader size.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Loader With Background',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Loader({
      size: 'M',
      label: 'Loading...',
      overlay: true,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Blocking overlay loader for modal or full-surface waiting states.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Medium`,`OverlayLoader`]}))();export{l as Default,u as Medium,d as OverlayLoader,f as __namedExportsOrder,c as default};