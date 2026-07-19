import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,t as i}from"./theme-utils-B-KYefhh.js";function a({text:e=`Texts`,theme:t}={}){let n=i(t),r=n.isModern,a=n.isDark,o=r?12:10,s=r?`16px`:`12px`,c=r?.24:.2,l=a?`0px 4px 10px rgba(0, 0, 0, 0.25)`:`0px 4px 10px rgba(0, 0, 0, 0.10)`;return`<div style="min-height:28px;padding:4px 8px;border-radius:2px;border:1px solid ${n.border};background:${n.bg};color:${n.fg};box-shadow:${l};display:inline-flex;align-items:center;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;font-size:${o}px;line-height:${s};letter-spacing:${c}px;">${e}</div>`}var o=e((()=>{r()})),s,c,l,u;e((()=>{o(),r(),s=n,c={title:`Components/Feedback/Tooltip`,tags:[`autodocs`],args:{text:`Texts`,themeMode:`Auto`},argTypes:{text:{control:`text`,description:`Tooltip text`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...s],description:`Auto = current Storybook toolbar theme`},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Compact tooltip for short helper text near controls and icon buttons. Use it for hints, not for long explanatory copy.`}}}},l={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({text:e.text,theme:r})}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Tooltip({
      text: args.text,
      theme
    });
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`]}))();export{l as Default,u as __namedExportsOrder,c as default};