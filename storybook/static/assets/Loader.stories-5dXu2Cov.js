import{n as e}from"./chunk-BneVvdWh.js";var t,n,r;e((()=>{t={title:`Components/Loader`,tags:[`autodocs`],parameters:{docs:{description:{component:`Loader from ONLYOFFICE plugin UI.`}}}},n=()=>(setTimeout(()=>{let e=e=>new Promise(t=>{if(document.querySelector(`script[src="${e}"]`))return t();let n=document.createElement(`script`);n.src=e,n.onload=t,document.head.appendChild(n)});(async()=>{await e(`https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js`),await e(`https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js`),await e(`https://onlyoffice.github.io/sdkjs-plugins/v1/plugins-ui.js`);let t=window.jQuery,n;t(`#show-loader`).on(`click`,function(){n&&(n.remove?n.remove():t(`#loader-container`)[0].removeChild(n)),n=window.showLoader(t(`#loader-container`)[0],`Loading...`)}),t(`#hide-loader`).on(`click`,function(){n&&(n.remove?n.remove():t(`#loader-container`)[0].removeChild(n)),n=void 0})})()},0),`
    <div id="loader-container" class="asc-loader-container" style="margin: 10px; height: 40px; border: 1px solid #cfcfcf;"></div>
    <button id="show-loader">Show Loader</button>
    <button id="hide-loader">Hide Loader</button>
  `),n.storyName=`Interactive Loader`,n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  setTimeout(() => {
    const loadScript = src => new Promise(resolve => {
      if (document.querySelector(\`script[src="\${src}"]\`)) return resolve();
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      document.head.appendChild(script);
    });
    (async () => {
      await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js');
      await loadScript('https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js');
      await loadScript('https://onlyoffice.github.io/sdkjs-plugins/v1/plugins-ui.js');
      const $ = window.jQuery;
      let loader;
      $('#show-loader').on('click', function () {
        loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
        loader = window.showLoader($('#loader-container')[0], 'Loading...');
      });
      $('#hide-loader').on('click', function () {
        loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
        loader = undefined;
      });
    })();
  }, 0);
  return \`
    <div id="loader-container" class="asc-loader-container" style="margin: 10px; height: 40px; border: 1px solid #cfcfcf;"></div>
    <button id="show-loader">Show Loader</button>
    <button id="hide-loader">Hide Loader</button>
  \`;
}`,...n.parameters?.docs?.source}}},r=[`InteractiveLoader`]}))();export{n as InteractiveLoader,r as __namedExportsOrder,t as default};