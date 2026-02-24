const s={title:"Components/Label",tags:["autodocs"],parameters:{docs:{description:{component:"Various styled labels from ONLYOFFICE plugin UI."}}}},e=()=>`
  <label class="header">Header label</label>
`;e.storyName="Header Label";const a=()=>`
  <label class="link">Link label</label>
`;a.storyName="Link Label";e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:'() => `\n  <label class="header">Header label</label>\n`',...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:'() => `\n  <label class="link">Link label</label>\n`',...a.parameters?.docs?.source}}};const r=["Header","Link"];export{e as Header,a as Link,r as __namedExportsOrder,s as default};
