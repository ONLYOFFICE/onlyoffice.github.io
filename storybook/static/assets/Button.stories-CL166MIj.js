const x={title:"Components/Button",tags:["autodocs"],parameters:{docs:{description:{component:"Various styled buttons from ONLYOFFICE plugin UI."}}}},t=()=>`
  <button class="btn-text-default" style="width:75px;">Button 1</button>
`;t.storyName="Default Button";const e=()=>`
  <button class="btn-text-default submit primary" style="width:75px;">Button 2</button>
`;e.storyName="Primary Button";const s=()=>`
  <button class="btn-text-default submit" style="width:75px;">Button 3</button>
`;s.storyName="Secondary Button";const o=()=>`
  <label class="for-combo">Edit button</label>
  <div class="btn-edit" style="display: inline-block; margin-left: 10px;"></div>
`;o.storyName="Edit Button";var a,r,n;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:'() => `\n  <button class="btn-text-default" style="width:75px;">Button 1</button>\n`',...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var u,c,l;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:'() => `\n  <button class="btn-text-default submit primary" style="width:75px;">Button 2</button>\n`',...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var i,d,m;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:'() => `\n  <button class="btn-text-default submit" style="width:75px;">Button 3</button>\n`',...(m=(d=s.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var b,p,y;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
  <label class="for-combo">Edit button</label>
  <div class="btn-edit" style="display: inline-block; margin-left: 10px;"></div>
\``,...(y=(p=o.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};const f=["Default","Primary","Secondary","EditButton"];export{t as Default,o as EditButton,e as Primary,s as Secondary,f as __namedExportsOrder,x as default};
