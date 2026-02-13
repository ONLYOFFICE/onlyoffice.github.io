const a={title:"Components/Button",tags:["autodocs"],parameters:{docs:{description:{component:"Various styled buttons from ONLYOFFICE plugin UI."}}}},t=()=>`
  <button class="btn-text-default" style="width:75px;">Button 1</button>
`;t.storyName="Default Button";const e=()=>`
  <button class="btn-text-default submit primary" style="width:75px;">Button 2</button>
`;e.storyName="Primary Button";const s=()=>`
  <button class="btn-text-default submit" style="width:75px;">Button 3</button>
`;s.storyName="Secondary Button";const o=()=>`
  <label class="for-combo">Edit button</label>
  <div class="btn-edit" style="display: inline-block; margin-left: 10px;"></div>
`;o.storyName="Edit Button";t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn-text-default" style="width:75px;">Button 1</button>\n`',...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn-text-default submit primary" style="width:75px;">Button 2</button>\n`',...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn-text-default submit" style="width:75px;">Button 3</button>\n`',...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => \`
  <label class="for-combo">Edit button</label>
  <div class="btn-edit" style="display: inline-block; margin-left: 10px;"></div>
\``,...o.parameters?.docs?.source}}};const r=["Default","Primary","Secondary","EditButton"];export{t as Default,o as EditButton,e as Primary,s as Secondary,r as __namedExportsOrder,a as default};
