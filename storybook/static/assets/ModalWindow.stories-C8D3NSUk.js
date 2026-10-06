import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";import{n as a,t as o}from"./Header-D2BDzFwA.js";function s({title:e=`Title`,contentLabel:t=`Content`,notificationText:n=`Text
Text`,primaryLabel:r=`Button`,secondaryLabel:a=`Button`,size:s=`M`,notification:h=!1,footerMode:g=`auto`,theme:_}={}){let v=i(_),y=c[v]??c.Light,b=v.startsWith(`Modern`),x=g===`auto`?s===`L`?`double`:`single`:g,S=d[s]??d.M,C=p[v]??2,w=l[v]??l.Light,T=u[v]??u.Light,E=b?12:11,D=b?.24:.22,O=b?12:16,k=o({title:e,width:S,variant:`window`,theme:v}),A=h?`<div style="min-height:44px;display:inline-flex;align-items:center;gap:16px;">
        ${m}
        <div style="color:${y.notificationText};font-family:Arial,Helvetica,sans-serif;font-size:${E}px;font-weight:400;line-height:16px;letter-spacing:${D}px;white-space:pre-line;">${n}</div>
      </div>`:`<div style="min-height:${f[s]??206}px;display:flex;align-items:center;justify-content:center;color:${y.contentText};font-family:Arial,Helvetica,sans-serif;font-size:${E}px;font-weight:400;line-height:16px;letter-spacing:${D}px;text-align:center;">${t}</div>`,j=w.border?`1px solid ${w.border}`:`1px solid transparent`,M=w.pressedBorder?`1px solid ${w.pressedBorder}`:j,N=`<button type="button" data-role="primary" data-rest-bg="${w.bg}" data-hover-bg="${w.hoverBg}" data-pressed-bg="${w.pressedBg}" data-rest-border="${j}" data-pressed-border="${M}" style="height:${w.size}px;${w.minWidth?`min-width:${w.minWidth}px;`:``}padding:0 ${w.px}px;border-radius:${w.radius}px;border:${j};background:${w.bg};color:${w.text};font-family:Arial,Helvetica,sans-serif;font-size:${w.fontSize}px;font-weight:700;line-height:16px;letter-spacing:${w.letterSpacing}px;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;">${r}</button>`,P=T.border?`1px solid ${T.border}`:`1px solid transparent`,F=T.pressedBorder?`1px solid ${T.pressedBorder}`:P,I=`<button type="button" data-role="secondary" data-rest-bg="${T.bg}" data-hover-bg="${T.hoverBg}" data-pressed-bg="${T.pressedBg}" data-rest-border="${P}" data-pressed-border="${F}" style="height:${T.size}px;${T.minWidth?`min-width:${T.minWidth}px;`:``}padding:0 ${T.px}px;border-radius:${T.radius}px;border:${P};background:${T.bg};color:${T.text};font-family:Arial,Helvetica,sans-serif;font-size:${T.fontSize}px;font-weight:700;line-height:16px;letter-spacing:${T.letterSpacing}px;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;">${a}</button>`,L=x===`double`?`${N}${I}`:N;return`<div role="dialog" aria-modal="true" style="width:${S}px;display:flex;flex-direction:column;border:1px solid ${y.frameBorder};background:${y.frameBg};border-radius:${C}px;box-sizing:border-box;overflow:hidden;">
  ${k}
  <div style="background:${y.contentBg};padding:16px;display:flex;flex-direction:column;gap:16px;box-sizing:border-box;">
    ${A}
  </div>
  <div style="background:${y.contentBg};">
    <div style="height:1px;background:${y.divider};"></div>
    <div style="padding:${O}px 16px;display:flex;align-items:center;justify-content:center;gap:10px;box-sizing:border-box;flex-wrap:wrap;">
      ${L}
    </div>
  </div>
</div>`}var c,l,u,d,f,p,m,h=e((()=>{a(),r(),c={Light:{frameBg:`#FFFFFF`,frameBorder:`#E0E0E0`,contentBg:`#FFFFFF`,contentText:`rgba(0, 0, 0, 0.60)`,notificationText:`rgba(0, 0, 0, 0.80)`,divider:`#E0E0E0`},"Light Classic":{frameBg:`#FFFFFF`,frameBorder:`#D8DADC`,contentBg:`#FFFFFF`,contentText:`#A5A5A5`,notificationText:`#444444`,divider:`#D8DADC`},Dark:{frameBg:`#333333`,frameBorder:`#555555`,contentBg:`#333333`,contentText:`rgba(255, 255, 255, 0.60)`,notificationText:`rgba(255, 255, 255, 0.80)`,divider:`#555555`},"Dark Contrast":{frameBg:`#1E1E1E`,frameBorder:`#424242`,contentBg:`#1E1E1E`,contentText:`#B8B8B8`,notificationText:`#E8E8E8`,divider:`#424242`},"Modern Light":{frameBg:`#FFFFFF`,frameBorder:`#EAEAEA`,contentBg:`#FFFFFF`,contentText:`#383838`,notificationText:`#383838`,divider:`#EAEAEA`},"Modern Dark":{frameBg:`#404040`,frameBorder:`#585858`,contentBg:`#404040`,contentText:`#F3F3F3`,notificationText:`#F3F3F3`,divider:`#585858`}},l={Light:{bg:`#444444`,text:`#FFFFFF`,hoverBg:`#333333`,pressedBg:`#1F1F1F`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},"Light Classic":{bg:`#7D858C`,text:`#FFFFFF`,hoverBg:`#666D73`,pressedBg:`#666D73`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},Dark:{bg:`#DDDDDD`,text:`#333333`,hoverBg:`#FCFCFC`,pressedBg:`#FCFCFC`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},"Dark Contrast":{bg:`#E6E6E6`,text:`#121212`,hoverBg:`#A6A6A6`,pressedBg:`#A6A6A6`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},"Modern Light":{bg:`#4473CA`,text:`#FFFFFF`,hoverBg:`#2A5BB9`,pressedBg:`#1D4FAF`,pressedBorder:`#2A5BB9`,radius:4,size:24,minWidth:48,px:12,letterSpacing:.24,fontSize:12},"Modern Dark":{bg:`#4A7BE0`,text:`#FFFFFF`,hoverBg:`#366CDA`,pressedBg:`#2D66CC`,pressedBorder:`#4A7BE0`,radius:4,size:24,minWidth:48,px:12,letterSpacing:.24,fontSize:12}},u={Light:{bg:`#FFFFFF`,text:`rgba(0, 0, 0, 0.80)`,border:`#C0C0C0`,hoverBg:`#E0E0E0`,pressedBg:`#CBCBCB`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},"Light Classic":{bg:`#FFFFFF`,text:`#444444`,border:`#CFCFCF`,hoverBg:`#D8DADC`,pressedBg:`#7D858C`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},Dark:{bg:`#333333`,text:`rgba(255, 255, 255, 0.80)`,border:`#666666`,hoverBg:`#555555`,pressedBg:`#606060`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},"Dark Contrast":{bg:`#1E1E1E`,text:`#E8E8E8`,border:`#696969`,hoverBg:`#424242`,pressedBg:`#666666`,radius:1,size:22,px:32,letterSpacing:.22,fontSize:11},"Modern Light":{bg:`#FFFFFF`,text:`#383838`,border:`#E1E1E1`,hoverBg:`#F9F9F9`,pressedBg:`#EAEAEA`,pressedBorder:`#2A5BB9`,radius:4,size:24,minWidth:48,px:12,letterSpacing:.24,fontSize:12},"Modern Dark":{bg:`#404040`,text:`#F3F3F3`,border:`#686868`,hoverBg:`#585858`,pressedBg:`#686868`,pressedBorder:`#4A7BE0`,radius:4,size:24,minWidth:48,px:12,letterSpacing:.24,fontSize:12}},d={S:350,M:610,L:1380},f={S:206,M:206,L:423},p={Light:2,"Light Classic":2,Dark:2,"Dark Contrast":2,"Modern Light":4,"Modern Dark":4},m=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
  <path d="M20.5303 0.882195C21.1795 -0.256091 22.8205 -0.256088 23.4696 0.882198L43.765 36.47C44.4082 37.5978 43.5937 38.9999 42.2953 38.9999H1.70464C0.406249 38.9999 -0.408223 37.5978 0.234989 36.47L20.5303 0.882195Z" fill="#F2BE08"/>
  <path d="M22.0007 29.9739C23.39 29.9741 24.5161 31.1002 24.5163 32.4895C24.5163 33.879 23.3901 35.0059 22.0007 35.0061C20.6111 35.0061 19.4841 33.8791 19.4841 32.4895C19.4843 31.1001 20.6112 29.9739 22.0007 29.9739ZM21.9997 9.0061C23.8524 9.0061 25.355 10.5079 25.3552 12.3606C25.3552 13.225 24.3402 17.6282 23.6775 21.5872C23.089 25.1023 22.8408 28.2677 22.8386 28.2961H21.1618C21.1598 28.2695 20.9116 25.1033 20.323 21.5872C19.6602 17.6282 18.6452 13.225 18.6452 12.3606C18.6454 10.508 20.1472 9.00628 21.9997 9.0061Z" fill="#FFFFFF"/>
</svg>`}));function g(e,t){let n=document.createElement(`div`);return n.style.cssText=`padding:24px;display:inline-block;`,n.innerHTML=s({...e,theme:t}),n.querySelectorAll(`button[data-role]`).forEach(e=>{let t=e.dataset.restBg,n=e.dataset.hoverBg,r=e.dataset.pressedBg,i=e.dataset.restBorder,a=e.dataset.pressedBorder,o=!1,s=null,c=0;e.addEventListener(`mouseenter`,()=>{o=!0,s||(e.style.background=n)}),e.addEventListener(`mouseleave`,()=>{o=!1,s||(e.style.background=t,e.style.border=i)}),e.addEventListener(`mousedown`,()=>{c=Date.now(),s&&=(clearTimeout(s),null),e.style.background=r,e.style.border=a}),e.addEventListener(`mouseup`,()=>{let r=Date.now()-c,a=Math.max(0,150-r);s=setTimeout(()=>{s=null,e.style.background=o?n:t,e.style.border=i},a)})}),n}var _,v,y,b,x,S;e((()=>{h(),r(),_={title:`Components/Layout/Modal Window`,tags:[`autodocs`],args:{title:`Title`,tags:[`autodocs`],contentLabel:`Content`,notificationText:`Text
Text`,primaryLabel:`Button`,secondaryLabel:`Button`,size:`M`,notification:!1,footerMode:`auto`,themeMode:`Auto`},argTypes:{title:{control:`text`,description:`Main dialog title`},contentLabel:{control:`text`,description:`Placeholder copy for the main content area`},notificationText:{control:`text`,description:`Inline warning or notification message`},primaryLabel:{control:`text`,description:`Primary footer action label`},secondaryLabel:{control:`text`,description:`Secondary footer action label`},size:{control:`select`,options:[`S`,`M`,`L`],description:`Modal width preset`},notification:{control:`boolean`,description:`Show the notification block above the footer`},footerMode:{control:`select`,options:[`auto`,`single`,`double`],description:`One-button or two-button footer layout`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...n],description:`Auto = current Storybook toolbar theme`},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Dialog window shell with size presets, optional notification block, and single or double action footers.`}}}},v={args:{size:`M`,notification:!1,footerMode:`single`},render:(e,n)=>g(e,t(e.themeMode,n.globals.theme)),parameters:{docs:{description:{story:`Medium modal preset for standard confirmation and settings flows.`}}}},y={args:{size:`S`,notification:!1,footerMode:`single`},render:(e,n)=>g(e,t(e.themeMode,n.globals.theme)),parameters:{docs:{description:{story:`Small modal for short confirmations and compact messages.`}}}},b={args:{size:`L`,notification:!1,footerMode:`double`},render:(e,n)=>g(e,t(e.themeMode,n.globals.theme)),parameters:{docs:{description:{story:`Large modal for richer content and double-action layouts.`}}}},x={args:{size:`S`,notification:!0,footerMode:`single`},render:(e,n)=>g(e,t(e.themeMode,n.globals.theme)),parameters:{docs:{description:{story:`Modal with an inline warning or explanatory notification block.`}}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'M',
    notification: false,
    footerMode: 'single'
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium modal preset for standard confirmation and settings flows.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'S',
    notification: false,
    footerMode: 'single'
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Small modal for short confirmations and compact messages.'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'L',
    notification: false,
    footerMode: 'double'
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Large modal for richer content and double-action layouts.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'S',
    notification: true,
    footerMode: 'single'
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveModalWindow(args, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with an inline warning or explanatory notification block.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Small`,`Large`,`WithNotification`]}))();export{v as Default,b as Large,y as Small,x as WithNotification,S as __namedExportsOrder,_ as default};