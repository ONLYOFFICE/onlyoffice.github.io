import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{background:`#FFFFFF`,border:`#C0C0C0`,radius:2,closeHoverBackground:`#E0E0E0`,textColor:`rgba(0, 0, 0, 0.80)`,subTextColor:`rgba(0, 0, 0, 0.40)`,iconColor:`rgba(0, 0, 0, 0.80)`,chipBackground:`#FFFFFF`,chipBorder:`#C0C0C0`,chipTextColor:`rgba(0, 0, 0, 0.80)`,actionHeight:22,actionPrimaryBackground:`#444444`,actionPrimaryHoverBackground:`#1C1C1C`,actionPrimaryTextColor:`#FFFFFF`,actionSecondaryBackground:`#FFFFFF`,actionSecondaryHoverBackground:`#E0E0E0`,actionSecondaryBorder:`#C0C0C0`,actionSecondaryTextColor:`rgba(0, 0, 0, 0.80)`},"Light Classic":{background:`#FFFFFF`,border:`#CFCFCF`,radius:2,closeHoverBackground:`#D8DADC`,textColor:`#444444`,subTextColor:`#A5A5A5`,iconColor:`#444444`,chipBackground:`#FFFFFF`,chipBorder:`#CFCFCF`,chipTextColor:`#444444`,actionHeight:22,actionPrimaryBackground:`#7D858C`,actionPrimaryHoverBackground:`#666D73`,actionPrimaryTextColor:`#FFFFFF`,actionSecondaryBackground:`#FFFFFF`,actionSecondaryHoverBackground:`#FFFFFF`,actionSecondaryBorder:`#CFCFCF`,actionSecondaryTextColor:`#444444`},"Modern Light":{background:`#FFFFFF`,border:`#E1E1E1`,radius:4,closeHoverBackground:`#F9F9F9`,textColor:`#383838`,subTextColor:`rgba(0, 0, 0, 0.60)`,iconColor:`#383838`,chipBackground:`#FFFFFF`,chipBorder:`#E1E1E1`,chipTextColor:`#383838`,actionHeight:24,actionPrimaryBackground:`#4473CA`,actionPrimaryHoverBackground:`#2A5BB9`,actionPrimaryTextColor:`#FFFFFF`,actionSecondaryBackground:`#FFFFFF`,actionSecondaryHoverBackground:`#F9F9F9`,actionSecondaryBorder:`#E1E1E1`,actionSecondaryTextColor:`#383838`},"Modern Dark":{background:`#404040`,border:`#686868`,radius:4,closeHoverBackground:`#585858`,textColor:`#F3F3F3`,subTextColor:`#969696`,iconColor:`#F3F3F3`,chipBackground:`#404040`,chipBorder:`#686868`,chipTextColor:`#F3F3F3`,actionHeight:24,actionPrimaryBackground:`#4A7BE0`,actionPrimaryHoverBackground:`#366CDA`,actionPrimaryTextColor:`#FFFFFF`,actionSecondaryBackground:`#404040`,actionSecondaryHoverBackground:`#585858`,actionSecondaryBorder:`#686868`,actionSecondaryTextColor:`#F3F3F3`},Dark:{background:`#333333`,border:`#666666`,radius:2,closeHoverBackground:`#555555`,textColor:`rgba(255, 255, 255, 0.80)`,subTextColor:`rgba(255, 255, 255, 0.40)`,iconColor:`rgba(255, 255, 255, 0.80)`,chipBackground:`#333333`,chipBorder:`#666666`,chipTextColor:`rgba(255, 255, 255, 0.80)`,actionHeight:22,actionPrimaryBackground:`#DDDDDD`,actionPrimaryHoverBackground:`#FCFCFC`,actionPrimaryTextColor:`#333333`,actionSecondaryBackground:`#333333`,actionSecondaryHoverBackground:`#555555`,actionSecondaryBorder:`#666666`,actionSecondaryTextColor:`rgba(255, 255, 255, 0.80)`},"Dark Contrast":{background:`#1E1E1E`,border:`#696969`,radius:2,closeHoverBackground:`#424242`,textColor:`#E8E8E8`,subTextColor:`#B8B8B8`,iconColor:`#E8E8E8`,chipBackground:`#1E1E1E`,chipBorder:`#696969`,chipTextColor:`#E8E8E8`,actionHeight:22,actionPrimaryBackground:`#E6E6E6`,actionPrimaryHoverBackground:`#A6A6A6`,actionPrimaryTextColor:`#121212`,actionSecondaryBackground:`#1E1E1E`,actionSecondaryHoverBackground:`#424242`,actionSecondaryBorder:`#696969`,actionSecondaryTextColor:`#E8E8E8`}}}));function s({type:e=`close`,state:t=`default`,theme:n,minWidth:r=236,title:o=u,helperText:s=`Text here`,actionLabel:f=`Button`,tags:p=d}={}){let m=i(n),h=a[m]??a.Light,g=m.startsWith(`Modern`),_=t===`hover`,v=e!==`close`,y=g?12:11,b=e===`close`&&_?h.closeHoverBackground:h.background,x=[`width:${r}px`,`min-width:${r}px`,`padding:6px`,`border-radius:${h.radius}px`,`border:1px solid ${h.border}`,`background:${b}`,`display:inline-flex`,`flex-direction:${e===`close`?`row`:`column`}`,`align-items:${e===`close`?`center`:`flex-start`}`,`justify-content:center`,`gap:${e===`close`?4:10}px`,`box-sizing:border-box`].join(`;`),S=`flex:1 1 0;min-width:0;font-size:${y}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:${g?.24:.22}px;color:${h.textColor};${v?`display:block;white-space:normal;overflow-wrap:anywhere;`:`overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;`}`,C=v?l(h.iconColor):c(h.iconColor),w=`<div style="width:100%;display:flex;align-items:${v?`flex-start`:`center`};gap:4px;">
    <div style="${S}">${o}</div>
    ${C}
  </div>`,T=``;if(e===`openWithButton`){let e=p.map(e=>`<div data-chip="true" data-rest-bg="${h.chipBackground}" data-hover-bg="${h.closeHoverBackground}" style="height:24px;min-width:48px;padding:0 12px;border-radius:31px;border:1px solid ${h.chipBorder};background:${h.chipBackground};color:${h.chipTextColor};font-size:${y}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:16px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">${e}</div>`).join(``),t=_?h.actionPrimaryHoverBackground:h.actionPrimaryBackground;T=`
      <div style="width:100%;display:flex;flex-wrap:wrap;gap:8px;">${e}</div>
      <div style="width:100%;">
        <button type="button" data-btn-type="primary" data-rest-bg="${h.actionPrimaryBackground}" data-hover-bg="${h.actionPrimaryHoverBackground}" style="width:100%;height:${h.actionHeight}px;padding:0 32px;border:none;border-radius:${h.radius===4?4:1}px;background:${t};color:${h.actionPrimaryTextColor};display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">
          <span style="text-align:center;font-size:${y}px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:${g?.24:.22}px;white-space:nowrap;color:${h.actionPrimaryTextColor};">${f}</span>
        </button>
      </div>`}else if(e===`openWithText`){let e=_?h.actionSecondaryHoverBackground:h.actionSecondaryBackground;T=`
      <div style="width:100%;color:${h.subTextColor};font-size:${y}px;font-family:Arial,Helvetica,sans-serif;font-weight:400;line-height:12px;letter-spacing:${g?.24:.22}px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${s}</div>
      <div style="width:100%;">
        <button type="button" data-btn-type="secondary" data-rest-bg="${h.actionSecondaryBackground}" data-hover-bg="${h.actionSecondaryHoverBackground}" style="width:100%;height:${h.actionHeight}px;padding:0 32px;border-radius:${h.radius===4?4:1}px;border:1px solid ${h.actionSecondaryBorder};background:${e};color:${h.actionSecondaryTextColor};display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">
          <span style="text-align:center;font-size:${y}px;font-family:Arial,Helvetica,sans-serif;font-weight:700;line-height:16px;letter-spacing:${g?.24:.22}px;white-space:nowrap;color:${h.actionSecondaryTextColor};">${f}</span>
        </button>
      </div>`}return`<div class="ui-card" style="${x}">${w}${T}</div>`}var c,l,u,d,f=e((()=>{r(),o(),c=e=>`<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="${e}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,l=e=>`<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 12L10 8L6 12" stroke="${e}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,u=`His English teacher says that he is a good pupil and a great student who always participates in class discussions and finishes his work carefully`,d=[`His`,`Her`,`Label`,`Label`,`Label`,`Label`]}));function p(e){e.querySelectorAll(`[data-chip="true"]`).forEach(e=>{let t=e.dataset.restBg,n=e.dataset.hoverBg;e.addEventListener(`mouseenter`,()=>{e.style.background=n}),e.addEventListener(`mouseleave`,()=>{e.style.background=t})});let t=e.querySelector(`button[data-btn-type]`);if(t){let e=t.dataset.restBg,n=t.dataset.hoverBg,r=!1,i=null,a=0;t.addEventListener(`mouseenter`,()=>{r=!0,i||(t.style.background=n)}),t.addEventListener(`mouseleave`,()=>{r=!1,i||(t.style.background=e)}),t.addEventListener(`mousedown`,()=>{a=Date.now(),i&&=(clearTimeout(i),null),t.style.background=n}),t.addEventListener(`mouseup`,()=>{let o=Date.now()-a,s=Math.max(0,150-o);i=setTimeout(()=>{i=null,t.style.background=r?n:e},s)})}}function m({title:e,helperText:t,actionLabel:n,tags:r,stretch:i,minWidth:a,openType:o,startExpanded:c,theme:l}){let u=document.createElement(`div`);u.style.display=`contents`;let d=!!c,f=o||`openWithButton`,m=()=>{if(u.innerHTML=s({type:d?f:`close`,state:`default`,title:e,helperText:t,actionLabel:n,tags:r,minWidth:i?void 0:a,theme:l}),i){let e=u.querySelector(`.ui-card`);e&&(e.style.width=`100%`)}let o=u.querySelector(`.ui-card > div`);o&&(o.style.cursor=`pointer`,o.addEventListener(`click`,()=>{d=!d,m()})),p(u)};return m(),u}var h,g,_,v,y,b,x,S,C,w;e((()=>{f(),r(),h=n,g=`His English teacher says that he is a good pupil and a great student who always participates in class discussions and finishes his work carefully`,_=[`His`,`Her`,`Label`,`Label`,`Label`,`Label`],v={title:`Components/Data Display/Cards`,tags:[`autodocs`],args:{state:`default`,interactive:!0,stretch:!1,minWidth:236,themeMode:`Auto`,openType:`openWithButton`,startExpanded:!1,title:g,helperText:`Text here`,actionLabel:`Button`,tags:_},argTypes:{openType:{control:`select`,options:[`openWithButton`,`openWithText`],description:`Expanded layout: tags + action button, or helper text + action button`},startExpanded:{control:`boolean`,description:`Open the card on first render`},state:{control:`select`,options:[`default`,`hover`],description:`Static visual state used when interactive mode is off`},interactive:{control:`boolean`,description:`Allow hover and expand/collapse interaction in the canvas`},stretch:{control:`boolean`,description:`Let the card fill the available row width`},minWidth:{control:{type:`number`},description:`Minimum card width`},maxWidth:{control:{type:`number`},description:`Maximum card width`},title:{control:`text`,description:`Main title shown in collapsed and expanded states`},helperText:{control:`text`,description:`Helper copy used in the text-based expanded variant`},actionLabel:{control:`text`,description:`Label for the action button inside the expanded card`},tags:{control:`object`,description:`Tag pills used in the tags-and-button expanded variant`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...h],description:`Auto = current Storybook toolbar theme`},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Collapsible information cards with a compact closed state and two expanded patterns: helper text or tag list plus action button.`}}}},y={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return m({...e,theme:r})}},b={args:{openType:`openWithButton`,startExpanded:!1,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,type:`close`,theme:r})},parameters:{docs:{description:{story:`Collapsed card state with title preview only.`}}}},x={args:{openType:`openWithButton`,startExpanded:!0,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,type:`openWithButton`,theme:r})},parameters:{docs:{description:{story:`Expanded card with tags and a single action button.`}}}},S={args:{openType:`openWithText`,startExpanded:!0,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,type:`openWithText`,theme:r})},parameters:{docs:{description:{story:`Expanded card with helper copy and a single action button.`}}}},C={args:{stretch:!0,interactive:!1},render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),{title:i,helperText:a,actionLabel:o,tags:c}=e;return`<div style="display:grid;gap:16px;">
      <div style="width:236px;">${s({type:`close`,title:i,helperText:a,actionLabel:o,tags:c,minWidth:236,theme:r})}</div>
      <div style="width:min(100%,760px);">${s({type:`close`,title:i,helperText:a,actionLabel:o,tags:c,minWidth:236,theme:r}).replace(`width:236px`,`width:100%`)}</div>
    </div>`},parameters:{docs:{description:{story:`Compare the same card in narrow and wide containers.`}}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveCard({
      ...args,
      theme
    });
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    openType: 'openWithButton',
    startExpanded: false,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Card({
      ...args,
      type: 'close',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsed card state with title preview only.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    openType: 'openWithButton',
    startExpanded: true,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Card({
      ...args,
      type: 'openWithButton',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Expanded card with tags and a single action button.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    openType: 'openWithText',
    startExpanded: true,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Card({
      ...args,
      type: 'openWithText',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Expanded card with helper copy and a single action button.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    stretch: true,
    interactive: false
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const {
      title,
      helperText,
      actionLabel,
      tags
    } = args;
    const narrow = Card({
      type: 'close',
      title,
      helperText,
      actionLabel,
      tags,
      minWidth: 236,
      theme
    });
    const wide = Card({
      type: 'close',
      title,
      helperText,
      actionLabel,
      tags,
      minWidth: 236,
      theme
    });
    return \`<div style="display:grid;gap:16px;">
      <div style="width:236px;">\${narrow}</div>
      <div style="width:min(100%,760px);">\${wide.replace('width:236px', 'width:100%')}</div>
    </div>\`;
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare the same card in narrow and wide containers.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`CloseVariant`,`OpenWithTagsAndButton`,`OpenWithTextAndButton`,`StretchLayout`]}))();export{b as CloseVariant,y as Default,x as OpenWithTagsAndButton,S as OpenWithTextAndButton,C as StretchLayout,w as __namedExportsOrder,v as default};