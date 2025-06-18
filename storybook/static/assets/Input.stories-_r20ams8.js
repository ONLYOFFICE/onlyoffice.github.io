const c={title:"Components/Input",tags:["autodocs"],parameters:{docs:{description:{component:"Various styled inputs from ONLYOFFICE plugin UI."}}}},e=()=>`
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
`;t.storyName="Text Field Control";var r,o,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => \`
  <textarea
    style="height:45px;width: 100%;"
    class="form-control"
    placeholder="textarea control"
  ></textarea>
\``,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var s,n,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => \`
  <input
    type="text"
    class="form-control"
    placeholder="text field"
    style="width: 100%; margin-bottom: 2px;"
  >
\``,...(l=(n=t.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const p=["Textarea","TextField"];export{t as TextField,e as Textarea,p as __namedExportsOrder,c as default};
