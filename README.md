# wochit-embedded



https://user-images.githubusercontent.com/3756473/167427983-89c60590-a1f5-4c6c-9e95-bb54facdfddd.mp4



### Usage
* Install module via [NPM](https://www.npmjs.com/package/@wochit/embedded)
  ```shell
  npm i @wochit/embedded
  ```
  Install via yarn
  ```shell
  yarn add @wochit/embedded
  ```
  somewhere in your app
  ```javascript
  import wt from '@wochit/embedded';

  wt.config({ channelId, userToken });
  
  document.querySelector('.video-creator-btn').addEventListener('click', () => {
    wt.openVideoCreator({});
  });
  ```
  or
  ```javascript
  import { config, openVideoCreator } from '@wochit/embedded';
  
  config({ channelId, userToken });
  
  document.querySelector('.video-creator-btn').addEventListener('click', () => {
    openVideoCreator({});
  });
  ```

* CDN async (non-blocking)
  ```xhtml
  <script type="application/javascript">
    (function (window, document, tag, url, name, a, m) {
      window['__wochit_object_name__'] = name;
      window[name] =
        window[name] ||
        function () {
          (window[name].q = window[name].q || []).push(arguments);
        };
      (a = document.createElement(tag)), (m = document.getElementsByTagName(tag)[0]);
      a.async = 1;
      a.src = url;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://cdn.wochit.com/wochit-embedded/latest.min.js', 'wt');
  </script>
  ```
  somewhere in your app
  ```javascript
  window.wt('config', { channelId, userToken });
  document.querySelector('.video-creator-btn').addEventListener('click', () => {
    window.wt('openVideoCreator', {});
  });
  ```
  
* CDN sync (blocking)
  ```xhtml
  <script src="https://cdn.wochit.com/wochit-embedded/latest.min.js" type="application/javascript"></script>
  <script type="application/javascript">
    window.wt('config', { channelId, userToken });
    document.querySelector('.video-creator-btn').addEventListener('click', () => {
      window.wt('openVideoCreator', {});
    });
  </script>
  ```
