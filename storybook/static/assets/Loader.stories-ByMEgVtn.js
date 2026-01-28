const i={title:"Components/Loader",tags:["autodocs"],parameters:{docs:{description:{component:"Loader from ONLYOFFICE plugin UI."}}}},r=()=>(setTimeout(()=>{const n=o=>new Promise(e=>{if(document.querySelector(`script[src="${o}"]`))return e();const t=document.createElement("script");t.src=o,t.onload=e,document.head.appendChild(t)});(async()=>{await n("https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"),await n("https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js"),await n("https://onlyoffice.github.io/sdkjs-plugins/v1/plugins-ui.js");const o=window.jQuery;let e;o("#show-loader").on("click",function(){e&&(e.remove?e.remove():o("#loader-container")[0].removeChild(e)),e=window.showLoader(o("#loader-container")[0],"Loading...")}),o("#hide-loader").on("click",function(){e&&(e.remove?e.remove():o("#loader-container")[0].removeChild(e)),e=void 0})})()},0),`
    <div id="loader-container" class="asc-loader-container" style="margin: 10px; height: 40px; border: 1px solid #cfcfcf;"></div>
    <button id="show-loader">Show Loader</button>
    <button id="hide-loader">Hide Loader</button>
  `);r.storyName="Interactive Loader";r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
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
}`,...r.parameters?.docs?.source}}};const a=["InteractiveLoader"];export{r as InteractiveLoader,a as __namedExportsOrder,i as default};
