import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r}from"./theme-utils-B-KYefhh.js";import{n as i,t as a}from"./SplitButton-Bq4l2hJH.js";var o,s,c,l,u,d,f;e((()=>{i(),r(),o=n,s={title:`Components/Buttons/Split Buttons/Tabs`,tags:[`autodocs`],args:{label:`Label`,state:`default`,type:`tabs`,interactive:!0,themeMode:`Auto`},argTypes:{label:{control:`text`,description:`Visible tab-style label`},interactive:{control:`boolean`,description:`Allow hover and press feedback directly in the canvas`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...o],description:`Auto = current Storybook toolbar theme`},type:{table:{disable:!0}},state:{table:{disable:!0}},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Split-button tab style used for compact segmented or tab-like actions.`}}}},c={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);i.style.display=`contents`;let o=!1,s=!1,c=()=>{let t=s?`pressed`:o?`hover`:`default`;i.innerHTML=a({label:e.label,type:`tabs`,state:t,theme:r})};return i.addEventListener(`mouseenter`,()=>{o=!0,c()}),i.addEventListener(`mouseleave`,()=>{o=!1,s=!1,c()}),i.addEventListener(`mousedown`,()=>{s=!0,c()}),i.addEventListener(`mouseup`,()=>{s=!1,c()}),c(),i}},l={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);i.style.display=`contents`;let o=!1,s=()=>{i.innerHTML=a({label:e.label,type:`tabs`,state:o?`hover`:`default`,theme:r})};return i.addEventListener(`mouseenter`,()=>{o=!0,s()}),i.addEventListener(`mouseleave`,()=>{o=!1,s()}),s(),i},parameters:{docs:{description:{story:`Interactive hover demo for the tab-style split button. Move the pointer over the control in the canvas.`}}}},u={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);i.style.display=`contents`;let o=!1,s=()=>{i.innerHTML=a({label:e.label,type:`tabs`,state:o?`pressed`:`default`,theme:r})};return i.addEventListener(`click`,()=>{o=!o,s()}),s(),i},parameters:{docs:{description:{story:`Pressed-state demo toggled by clicking the control.`}}}},d={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return a({label:e.label,type:`tabs`,state:`disabled`,theme:r})},parameters:{docs:{description:{story:`Disabled tab-style split button.`}}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.display = 'contents';
    let hovered = false;
    let pressed = false;
    const update = () => {
      const state = pressed ? 'pressed' : hovered ? 'hover' : 'default';
      el.innerHTML = SplitButton({
        label: args.label,
        type: 'tabs',
        state,
        theme
      });
    };
    el.addEventListener('mouseenter', () => {
      hovered = true;
      update();
    });
    el.addEventListener('mouseleave', () => {
      hovered = false;
      pressed = false;
      update();
    });
    el.addEventListener('mousedown', () => {
      pressed = true;
      update();
    });
    el.addEventListener('mouseup', () => {
      pressed = false;
      update();
    });
    update();
    return el;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.display = 'contents';
    let hovered = false;
    const update = () => {
      el.innerHTML = SplitButton({
        label: args.label,
        type: 'tabs',
        state: hovered ? 'hover' : 'default',
        theme
      });
    };
    el.addEventListener('mouseenter', () => {
      hovered = true;
      update();
    });
    el.addEventListener('mouseleave', () => {
      hovered = false;
      update();
    });
    update();
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for the tab-style split button. Move the pointer over the control in the canvas.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const el = document.createElement('div');
    el.style.display = 'contents';
    let toggled = false;
    const update = () => {
      el.innerHTML = SplitButton({
        label: args.label,
        type: 'tabs',
        state: toggled ? 'pressed' : 'default',
        theme
      });
    };
    el.addEventListener('click', () => {
      toggled = !toggled;
      update();
    });
    update();
    return el;
  },
  parameters: {
    docs: {
      description: {
        story: 'Pressed-state demo toggled by clicking the control.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return SplitButton({
      label: args.label,
      type: 'tabs',
      state: 'disabled',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled tab-style split button.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Hovered`,`Pressed`,`Disabled`]}))();export{c as Default,d as Disabled,l as Hovered,u as Pressed,f as __namedExportsOrder,s as default};