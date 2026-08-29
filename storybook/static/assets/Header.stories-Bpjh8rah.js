import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r}from"./theme-utils-B-KYefhh.js";import{n as i,t as a}from"./Header-D2BDzFwA.js";var o,s,c,l,u;e((()=>{i(),r(),o=n,s={title:`Components/Layout/Header`,tags:[`autodocs`],args:{title:`Title`,tags:[`autodocs`],width:261,variant:`panel`,themeMode:`Auto`},argTypes:{title:{control:`text`,description:`Visible header title`},width:{control:`number`,description:`Rendered header width`},variant:{control:`select`,options:[`panel`,`window`],description:`Panel header or standalone window header layout`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...o],description:`Auto = current Storybook toolbar theme`},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Header shell used at the top of plugin panels and standalone windows.`}}}},c={name:`Panel`,render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({title:e.title,width:e.width,variant:`panel`,theme:r})}},l={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({title:e.title,width:e.width,variant:`window`,theme:r})},parameters:{docs:{description:{story:`Standalone window-style header with different chrome treatment.`}}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Panel',
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Header({
      title: args.title,
      width: args.width,
      variant: 'panel',
      theme
    });
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return Header({
      title: args.title,
      width: args.width,
      variant: 'window',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone window-style header with different chrome treatment.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`Window`]}))();export{c as Default,l as Window,u as __namedExportsOrder,s as default};