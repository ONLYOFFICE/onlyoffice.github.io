import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./theme-utils-B-KYefhh.js";function r({label:e=`Button`,state:t=`default`,type:r=`dropDown`,theme:s,isOpen:c=!1,items:l=[{id:`1`,label:`Option 1`},{id:`2`,label:`Option 2`},{id:`3`,label:`Option 3`},{id:`4`,label:`Disabled option`,disabled:!0}]}={}){let u=n(s),d=u.theme,f=u.isModern,p=f?4:1,m=t===`disabled`,h=t===`hover`,g=t===`pressed`,_=u.bg,v=u.surfaceAlt,y=o[d]??u.surfaceAlt,b=d===`Light Classic`||d===`Modern Dark`?`#FFFFFF`:u.fg,x=r===`iconLeft`&&d===`Modern Dark`?`#F3F3F3`:u.fg,S=f?12:11,C=[`height:24px`,`border:none`,`outline:none`,`font-family:Arial,Helvetica,sans-serif`,`font-size:${S}px`,`line-height:16px`,`letter-spacing:${f?.24:.22}px`,`cursor:${m?`not-allowed`:`pointer`}`,`box-sizing:border-box`,`white-space:nowrap`,`display:inline-flex`,`align-items:center`,`justify-content:center`].join(`;`),w=m?`opacity:0.6;`:``;if(r===`dropDown`){let t=c?y:h?v:_,n=c||g?b:u.fg,r=c?`
      <div style="position:absolute;top:calc(100% + 2px);left:0;z-index:100;min-width:100%;border:1px solid ${u.border};background:${u.bg};border-radius:2px;padding:4px 0;box-sizing:border-box;">
        ${l.map(e=>`<button type="button" style="width:100%;min-height:26px;border:none;border-radius:0;background:transparent;padding:5px 20px;color:${e.disabled?u.muted:u.fg};display:flex;align-items:center;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;font-size:${S}px;font-weight:400;cursor:${e.disabled?`default`:`pointer`};text-align:left;white-space:nowrap;">${e.label}</button>`).join(``)}
      </div>`:``;return`<div style="display:inline-block;position:relative;${w}">
      <div style="display:inline-flex;border-radius:${p}px;overflow:hidden;border:1px solid ${u.border};">
        <button type="button" style="${C};background:${_};color:${u.fg};min-width:96px;padding:0 12px;font-weight:${f?400:700};">${e}</button>
        <button type="button" aria-label="Open menu" style="${C};background:${t};color:${n};width:24px;min-width:24px;padding:0;border-left:1px solid ${u.border};">${i(n)}</button>
      </div>
      ${r}
    </div>`}if(r===`iconLeft`){let t=g?y:h?v:_,n=m?u.muted:g?b:x;return`<div style="display:inline-block;${w}">
      <div style="display:inline-flex;border-radius:${p}px;overflow:hidden;border:1px solid ${u.border};">
        <button type="button" style="${C};background:${t};color:${n};padding:0 12px;gap:4px;justify-content:flex-start;font-weight:${f?400:700};">
          ${a(n)}<span>${e}</span>
        </button>
      </div>
    </div>`}let T=g?y:h?v:_,E=m?u.muted:g?b:u.fg;return`<div style="display:inline-block;${w}">
    <div style="display:inline-flex;border-radius:31px;overflow:hidden;border:1px solid ${f&&g?`transparent`:u.border};">
      <button type="button" style="${C};background:${T};color:${E};min-width:48px;padding:0 12px;font-weight:400;">${e}</button>
    </div>
  </div>`}var i,a,o,s=e((()=>{t(),i=e=>`<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 2.5L4 5.5L7 2.5" stroke="${e}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,a=e=>`<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C8.4 2 7 3.1 7 4.5V5H5.5C4.7 5 4 5.7 4 6.5V15.5C4 16.3 4.7 17 5.5 17H14.5C15.3 17 16 16.3 16 15.5V6.5C16 5.7 15.3 5 14.5 5H13V4.5C13 3.1 11.6 2 10 2ZM10 3C11.1 3 12 3.7 12 4.5V5H8V4.5C8 3.7 8.9 3 10 3ZM5.5 6H14.5C14.8 6 15 6.2 15 6.5V15.5C15 15.8 14.8 16 14.5 16H5.5C5.2 16 5 15.8 5 15.5V6.5C5 6.2 5.2 6 5.5 6Z" fill="${e}"/></svg>`,o={Light:`#CBCBCB`,"Light Classic":`#7D858C`,Dark:`#666666`,"Dark Contrast":`#666666`,"Modern Light":`#DCE7FA`,"Modern Dark":`#375478`}}));export{s as n,r as t};