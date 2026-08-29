import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r,t as i}from"./theme-utils-B-KYefhh.js";import{n as a,t as o}from"./SplitButton-Bq4l2hJH.js";var s,c,l,u,d,f,p,m;e((()=>{a(),r(),s={Light:`#CBCBCB`,"Light Classic":`#7D858C`,Dark:`#666666`,"Dark Contrast":`#666666`,"Modern Light":`#DCE7FA`,"Modern Dark":`#375478`},c=n,l=[{id:`1`,label:`Option 1`},{id:`2`,label:`Option 2`},{id:`3`,label:`Option 3`},{id:`4`,label:`Disabled option`,disabled:!0}],u={title:`Components/Buttons/Split Buttons/Drop Down`,tags:[`autodocs`],args:{label:`Button`,state:`default`,type:`dropDown`,interactive:!0,themeMode:`Auto`},argTypes:{label:{control:`text`,description:`Visible split-button label`},interactive:{control:`boolean`,description:`Allow hover and press feedback directly in the canvas`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...c],description:`Auto = current Storybook toolbar theme`},type:{table:{disable:!0}},state:{table:{disable:!0}},items:{table:{disable:!0}},isOpen:{table:{disable:!0}},onItemSelect:{table:{disable:!0}},theme:{table:{disable:!0}}},parameters:{docs:{description:{component:`Split button with a dropdown affordance. Clicking the chevron opens a plain context-menu-style list of options.`}}}},d={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),a=i(r),c=s[a.theme]??a.surfaceAlt,u=document.createElement(`div`);u.style.paddingBottom=`120px`;let d=document.createElement(`div`);d.style.display=`contents`;let f=e.label??`Button`,p=!1,m=null,h=()=>{if(m&&=(document.removeEventListener(`click`,m,!0),null),d.innerHTML=o({label:f,type:`dropDown`,state:`default`,isOpen:p,items:l,theme:r}),p){let e=d.querySelector(`div[style*="position:absolute"]`);e&&e.querySelectorAll(`button`).forEach(e=>{let t=l.find(t=>t.label===e.textContent?.trim());!t||t.disabled||(e.addEventListener(`mouseenter`,()=>{e.style.background=a.surfaceAlt}),e.addEventListener(`mouseleave`,()=>{e.style.background=`transparent`}),e.addEventListener(`mousedown`,()=>{e.style.background=c}),e.addEventListener(`mouseup`,()=>{e.style.background=a.surfaceAlt}),e.addEventListener(`click`,()=>{f=t.label,p=!1,h()}))})}p&&(m=e=>{u.contains(e.target)||(p=!1,h())},document.addEventListener(`click`,m,!0));let e=d.querySelector(`button[aria-label="Open menu"]`);if(e){let t=p?c:a.bg;e.addEventListener(`click`,()=>{p=!p,h()}),e.addEventListener(`mouseenter`,()=>{e.style.background=a.surfaceAlt}),e.addEventListener(`mouseleave`,()=>{e.style.background=t}),e.addEventListener(`mousedown`,()=>{e.style.background=c}),e.addEventListener(`mouseup`,()=>{e.style.background=a.surfaceAlt})}};return h(),u.appendChild(d),u}},f={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme),i=document.createElement(`div`);return i.style.paddingBottom=`120px`,i.innerHTML=o({label:e.label,type:`dropDown`,state:`default`,isOpen:!0,items:l,theme:r}),i},args:{isOpen:!0},parameters:{docs:{description:{story:`Dropdown in the open state. Switch the toolbar theme to preview across themes.`}}}},p={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return o({label:e.label,type:`dropDown`,state:`disabled`,isOpen:!1,items:l,theme:r})},parameters:{docs:{description:{story:`Disabled dropdown split button.`}}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const tokens = getTokens(theme);
    const pressedBg = PRESSED_BG[tokens.theme] ?? tokens.surfaceAlt;
    const wrapper = document.createElement('div');
    wrapper.style.paddingBottom = '120px';
    const el = document.createElement('div');
    el.style.display = 'contents';
    let currentLabel = args.label ?? 'Button';
    let open = false;
    let outsideClickHandler = null;
    const update = () => {
      if (outsideClickHandler) {
        document.removeEventListener('click', outsideClickHandler, true);
        outsideClickHandler = null;
      }
      el.innerHTML = SplitButton({
        label: currentLabel,
        type: 'dropDown',
        state: 'default',
        isOpen: open,
        items: defaultItems,
        theme
      });

      // Dropdown item hover/pressed + click
      if (open) {
        const dropdownContainer = el.querySelector('div[style*="position:absolute"]');
        if (dropdownContainer) {
          dropdownContainer.querySelectorAll('button').forEach(btn => {
            const item = defaultItems.find(i => i.label === btn.textContent?.trim());
            if (!item || item.disabled) return;
            btn.addEventListener('mouseenter', () => {
              btn.style.background = tokens.surfaceAlt;
            });
            btn.addEventListener('mouseleave', () => {
              btn.style.background = 'transparent';
            });
            btn.addEventListener('mousedown', () => {
              btn.style.background = pressedBg;
            });
            btn.addEventListener('mouseup', () => {
              btn.style.background = tokens.surfaceAlt;
            });
            btn.addEventListener('click', () => {
              currentLabel = item.label;
              open = false;
              update();
            });
          });
        }
      }
      if (open) {
        outsideClickHandler = e => {
          if (!wrapper.contains(e.target)) {
            open = false;
            update();
          }
        };
        // Use capture so it fires before the chevron's own click handler
        document.addEventListener('click', outsideClickHandler, true);
      }
      const chevronBtn = el.querySelector('button[aria-label="Open menu"]');
      if (chevronBtn) {
        const chevronRestBg = open ? pressedBg : tokens.bg;
        chevronBtn.addEventListener('click', () => {
          open = !open;
          update();
        });
        chevronBtn.addEventListener('mouseenter', () => {
          chevronBtn.style.background = tokens.surfaceAlt;
        });
        // Restore to the actual rest background (not '' which leaves it transparent)
        chevronBtn.addEventListener('mouseleave', () => {
          chevronBtn.style.background = chevronRestBg;
        });
        chevronBtn.addEventListener('mousedown', () => {
          chevronBtn.style.background = pressedBg;
        });
        chevronBtn.addEventListener('mouseup', () => {
          chevronBtn.style.background = tokens.surfaceAlt;
        });
      }
    };
    update();
    wrapper.appendChild(el);
    return wrapper;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    const wrapper = document.createElement('div');
    wrapper.style.paddingBottom = '120px';
    wrapper.innerHTML = SplitButton({
      label: args.label,
      type: 'dropDown',
      state: 'default',
      isOpen: true,
      items: defaultItems,
      theme
    });
    return wrapper;
  },
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown in the open state. Switch the toolbar theme to preview across themes.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return SplitButton({
      label: args.label,
      type: 'dropDown',
      state: 'disabled',
      isOpen: false,
      items: defaultItems,
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled dropdown split button.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Open`,`Disabled`]}))();export{d as Default,p as Disabled,f as Open,m as __namedExportsOrder,u as default};