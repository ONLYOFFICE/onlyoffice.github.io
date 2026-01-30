const r={title:"Components/Input",tags:["autodocs"],parameters:{docs:{description:{component:"Various styled inputs from ONLYOFFICE plugin UI."}}}},e=()=>`
  <textarea
    style="height:45px;width: 100%;"
    class="form-control"
    placeholder="textarea control"
  ></textarea>
`;e.storyName="Textarea Control";const t=()=>`
  <input
    type="text"
    class="form-control"
    placeholder="text field"
    style="width: 100%; margin-bottom: 2px;"
  >
`;t.storyName="Text Field Control";e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => \`
  <textarea
    style="height:45px;width: 100%;"
    class="form-control"
    placeholder="textarea control"
  ></textarea>
\``,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => \`
  <input
    type="text"
    class="form-control"
    placeholder="text field"
    style="width: 100%; margin-bottom: 2px;"
  >
\``,...t.parameters?.docs?.source}}};const o=["Textarea","TextField"];export{t as TextField,e as Textarea,o as __namedExportsOrder,r as default};
