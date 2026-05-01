import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,o as i}from"./theme-utils-B-KYefhh.js";var a,o=e((()=>{a={Light:{offTrack:`#C0C0C0`,onTrack:`rgba(0, 0, 0, 0.80)`,thumb:{size:12,fill:`#FFFFFF`,stroke:`rgba(0, 0, 0, 0.80)`,strokeWidth:1},label:{color:`rgba(0, 0, 0, 0.80)`,fontSize:11,lineHeight:14,letterSpacing:.22}},"Light Classic":{offTrack:`#CFCFCF`,onTrack:`#444444`,thumb:{size:12,fill:`#FFFFFF`,stroke:`rgba(0, 0, 0, 0.80)`,strokeWidth:1},label:{color:`#444444`,fontSize:11,lineHeight:14,letterSpacing:.22}},Dark:{offTrack:`#666666`,onTrack:`rgba(255, 255, 255, 0.80)`,thumb:{size:12,fill:`#333333`,stroke:`#FFFFFF`,strokeWidth:1},label:{color:`rgba(255, 255, 255, 0.80)`,fontSize:11,lineHeight:14,letterSpacing:.22}},"Dark Contrast":{offTrack:`#696969`,onTrack:`#E8E8E8`,thumb:{size:12,fill:`#1E1E1E`,stroke:`#FFFFFF`,strokeWidth:1},label:{color:`#E8E8E8`,fontSize:11,lineHeight:14,letterSpacing:.22}},"Modern Light":{offTrack:`#E1E1E1`,onTrack:`#4473CA`,thumb:{size:18,fill:`#4473CA`,stroke:`#FFFFFF`,strokeWidth:3,shadow:`0 4px 12px rgba(0, 32, 51, 0.10), 0 8px 100px rgba(0, 32, 51, 0.14)`},label:{color:`#383838`,fontSize:12,lineHeight:16,letterSpacing:.24}},"Modern Dark":{offTrack:`#686868`,onTrack:`#4A7BE0`,thumb:{size:18,fill:`#4A7BE0`,stroke:`#FFFFFF`,strokeWidth:3,shadow:`0 4px 12px rgba(0, 32, 51, 0.10), 0 8px 100px rgba(0, 32, 51, 0.14)`},label:{color:`#F3F3F3`,fontSize:12,lineHeight:16,letterSpacing:.24}}}}));function s({value:e=40,min:t=0,max:n=100,label:r=``,showValue:o=!1,disabled:s=!1,theme:c=`Light`,width:l=220}={}){let u=a[i(c)]??a.Light,d=Math.max(t,Math.min(n,e)),f=n===t?0:Math.round((d-t)/(n-t)*100),p=s?.5:1,m=[`width:${l}px`,`height:4px`,`border-radius:2px`,`background:linear-gradient(to right, ${u.onTrack} ${f}%, ${u.offTrack} ${f}%)`,`position:relative`,`display:flex`,`align-items:center`].join(`;`),h=u.thumb.shadow?`;box-shadow:${u.thumb.shadow}`:``,g=[`width:${u.thumb.size}px`,`height:${u.thumb.size}px`,`border-radius:50%`,`background:${u.thumb.fill}`,`border:${u.thumb.strokeWidth}px solid ${u.thumb.stroke}`,`position:absolute`,`left:calc(${f}% - ${u.thumb.size/2}px)`,`cursor:${s?`not-allowed`:`pointer`}`,`box-sizing:border-box`].join(`;`)+h,_=r?`<div style="color:${u.label.color};font-size:${u.label.fontSize}px;font-family:Arial,Helvetica,sans-serif;line-height:${u.label.lineHeight}px;letter-spacing:${u.label.letterSpacing}px;margin-bottom:6px;">${r}</div>`:``,v=o?`<span style="color:${u.label.color};font-size:${u.label.fontSize}px;font-family:Arial,Helvetica,sans-serif;font-weight:700;margin-left:8px;white-space:nowrap;">${d}</span>`:``;return`<div style="display:inline-flex;flex-direction:column;opacity:${p};">
    ${_}
    <div style="display:flex;align-items:center;">
      ${`<div style="position:relative;width:${l}px;height:20px;display:flex;align-items:center;">
      <div style="${m}">
        <div style="${g}"></div>
      </div>
    </div>`}
      ${v}
    </div>
  </div>`}var c=e((()=>{o(),r()}));function l(e,t){let n=document.createElement(`div`);n.style.display=`contents`;let r=e.min??0,i=e.max??100,a=e.value??40;n.innerHTML=s({...e,theme:t,value:a});let o=n.firstElementChild;if(!o)return n;let c=[...o.children].find(e=>e.style.display===`flex`)??o.lastElementChild,l=c?c.children[0]:null,u=l?l.children[0]:null,d=u?u.children[0]:null;if(!l)return n;let f=document.createElement(`input`);return f.type=`range`,f.min=String(r),f.max=String(i),f.step=String(e.step??1),f.value=String(a),Object.assign(f.style,{position:`absolute`,inset:`0`,width:`100%`,height:`100%`,opacity:`0`,cursor:e.disabled?`not-allowed`:`pointer`,margin:`0`,padding:`0`}),e.disabled&&(f.disabled=!0),l.appendChild(f),f.addEventListener(`input`,e=>{a=Number(e.target.value);let t=i===r?0:Math.round((a-r)/(i-r)*100);if(u){let e=u.style.background.match(/linear-gradient\(to right,\s*(.+?)\s+\d+%,\s*(.+?)\s+\d+%\)/);e&&(u.style.background=`linear-gradient(to right, ${e[1]} ${t}%, ${e[2]} ${t}%)`)}if(d){let e=parseFloat(d.style.width)/2;d.style.left=`calc(${t}% - ${e}px)`}}),n}var u,d,f,p,m,h,g;e((()=>{c(),r(),u=n,d={title:`Components/Form/Slider`,tags:[`autodocs`],args:{value:40,min:0,max:100,showValue:!1,disabled:!1,themeMode:`Auto`},argTypes:{value:{control:{type:`range`,min:0,max:100,step:1},description:`Current slider value`},min:{control:`number`,description:`Minimum allowed value`},max:{control:`number`,description:`Maximum allowed value`},step:{control:`number`,description:`Step increment between values`},showValue:{control:`boolean`,description:`Show the numeric value on the right`},disabled:{control:`boolean`,description:`Show the disabled state`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...u],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},onChange:{table:{disable:!0}}},parameters:{docs:{description:{component:`Single-value slider for compact numeric adjustment with optional inline value display.`}}}},f={render:(e,n)=>l(e,t(e.themeMode,n.globals.theme))},p={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return l({...e,showValue:!0},r)},parameters:{docs:{description:{story:`Slider with the current numeric value shown inline.`}}}},m={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,value:e.min??0,theme:r})},parameters:{docs:{description:{story:`Slider positioned at the minimum value.`}}}},h={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return s({...e,value:e.max??100,theme:r})},parameters:{docs:{description:{story:`Slider positioned at the maximum value.`}}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveSlider(args, theme);
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return makeInteractiveSlider({
      ...args,
      showValue: true
    }, theme);
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with the current numeric value shown inline.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Slider({
      ...args,
      value: args.min ?? 0,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider positioned at the minimum value.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Slider({
      ...args,
      value: args.max ?? 100,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider positioned at the maximum value.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`WithValue`,`Min`,`Max`]}))();export{f as Default,h as Max,m as Min,p as WithValue,g as __namedExportsOrder,d as default};