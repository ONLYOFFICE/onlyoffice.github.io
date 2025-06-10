export default {
  title: 'Components/Loader',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Loader from ONLYOFFICE plugin UI.'
      }
    }
  }
};

export const InteractiveLoader = () => {
  setTimeout(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
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

  return `
    <div id="loader-container" class="asc-loader-container" style="margin: 10px; height: 40px; border: 1px solid #cfcfcf;"></div>
    <button id="show-loader">Show Loader</button>
    <button id="hide-loader">Hide Loader</button>
  `;
};

InteractiveLoader.storyName = 'Interactive Loader';
