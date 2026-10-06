import{n as e}from"./chunk-BneVvdWh.js";import{a as t,i as n,n as r}from"./theme-utils-B-KYefhh.js";var i,a=e((()=>{i={Light:{Default:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`rgba(0, 0, 0, 0.80)`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`rgba(0, 0, 0, 0.8)`},Hover:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`rgba(0, 0, 0, 0.60)`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`rgba(0, 0, 0, 0.6)`}},"Light Classic":{Default:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`#444444`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`#444444`},Hover:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`#A5A5A5`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`#A5A5A5`}},Dark:{Default:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`rgba(255, 255, 255, 0.80)`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`rgba(255, 255, 255, 0.8)`},Hover:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`rgba(255, 255, 255, 0.60)`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`rgba(255, 255, 255, 0.6)`}},"Dark Contrast":{Default:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`#E8E8E8`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`#E8E8E8`},Hover:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`#B8B8B8`,fontSize:11,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.22,wordWrap:`break-word`},underlineColor:`#B8B8B8`}},"Modern Light":{Default:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`#383838`,fontSize:12,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.24,wordWrap:`break-word`},underlineColor:`#383838`},Hover:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`rgba(0, 0, 0, 0.60)`,fontSize:12,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.24,wordWrap:`break-word`},underlineColor:`rgba(0, 0, 0, 0.6)`}},"Modern Dark":{Default:{container:{flexDirection:`column`,justifyContent:`center`,alignItems:`flex-start`,display:`inline-flex`},text:{textAlign:`center`,justifyContent:`center`,display:`flex`,flexDirection:`column`,color:`#F3F3F3`,fontSize:12,fontFamily:`Arial`,fontWeight:`400`,lineHeight:16,letterSpacing:.24,wordWrap:`break-word`},underlineColor:`#F3F3F3`}}}}));function o({label:e=`Show advanced settings`,state:t=`default`,theme:n=`Light`}={}){let r=i[n]??i.Light,a=r[t===`hover`?`Hover`:`Default`]??r.Default??{},o=a.text??{},s=a.underlineColor??o.color??`rgba(0,0,0,0.8)`,c=typeof o.lineHeight==`number`?`${o.lineHeight}px`:o.lineHeight??`16px`;return`<button type="button" class="ui-link-button"
    style="display:inline-block;cursor:pointer;border:none;background:transparent;padding:0;">
    <span style="color:${o.color??`rgba(0,0,0,0.8)`};font-size:${o.fontSize??11}px;font-family:Arial,Helvetica,sans-serif;font-weight:${o.fontWeight??400};line-height:${c};letter-spacing:${o.letterSpacing??.22}px;text-decoration-line:underline;text-decoration-style:dotted;text-decoration-color:${s};text-underline-offset:2px;text-decoration-thickness:1px;white-space:nowrap;user-select:none;">${e}</span>
  </button>`}var s=e((()=>{a()})),c,l,u,d,f;e((()=>{s(),r(),c=n,l={title:`Components/Buttons/Link Buttons`,tags:[`autodocs`],args:{label:`Show advanced settings`,state:`default`,interactive:!0,isHovered:!1,themeMode:`Auto`},argTypes:{label:{control:`text`,description:`Visible link-style action label`},interactive:{control:`boolean`,description:`Allow hover feedback directly in the canvas`,table:{defaultValue:{summary:`true`}}},isHovered:{control:`boolean`,description:`Force hover appearance for visual review`},themeMode:{name:`theme`,control:`select`,options:[`Auto`,...c],description:`Auto = current Storybook toolbar theme`,table:{defaultValue:{summary:`Auto`}}},theme:{table:{disable:!0}},state:{table:{disable:!0}}},parameters:{docs:{story:{inline:!0},description:{component:`Text-only action styled like a link. Useful for secondary inline actions inside settings and informational blocks.`}}}},u={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);if(!e.interactive){let t=e.isHovered?`hover`:`default`;return o({label:e.label,state:t,theme:r})}let i=document.createElement(`div`);i.style.display=`contents`;let a=t=>{i.innerHTML=o({label:e.label,state:t,theme:r})};return i.addEventListener(`mouseenter`,()=>a(`hover`)),i.addEventListener(`mouseleave`,()=>a(`default`)),a(e.isHovered?`hover`:`default`),i}},d={render:(e,n)=>{let r=t(e.themeMode,n.globals.theme);return o({label:e.label||`Show advanced settings`,state:`hover`,theme:r})},parameters:{docs:{description:{story:`Interactive hover demo for the inline link-action style. Move the pointer over the link in the canvas.`}}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    if (!args.interactive) {
      const state = args.isHovered ? 'hover' : 'default';
      return LinkButton({
        label: args.label,
        state,
        theme
      });
    }
    const el = document.createElement('div');
    el.style.display = 'contents';
    const render = state => {
      el.innerHTML = LinkButton({
        label: args.label,
        state,
        theme
      });
    };
    el.addEventListener('mouseenter', () => render('hover'));
    el.addEventListener('mouseleave', () => render('default'));
    render(args.isHovered ? 'hover' : 'default');
    return el;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, context.globals.theme);
    return LinkButton({
      label: args.label || 'Show advanced settings',
      state: 'hover',
      theme
    });
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive hover demo for the inline link-action style. Move the pointer over the link in the canvas.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`HoveredButtons`]}))();export{u as Default,d as HoveredButtons,f as __namedExportsOrder,l as default};