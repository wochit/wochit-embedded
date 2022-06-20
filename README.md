# @wochit/embedded NPM module


* [Documentation](https://docs.wochit.com)
* [Using NPM module](#using-npm-module)
* [Using script from CDN](#using-script-from-cdn) 


### Intro
https://user-images.githubusercontent.com/3756473/167427983-89c60590-a1f5-4c6c-9e95-bb54facdfddd.mp4



### Using [NPM](https://www.npmjs.com/package/@wochit/embedded) module

#### Install
```shell
npm i @wochit/embedded
```
```shell
yarn add @wochit/embedded
```
```shell
pnpm add @wochit/embedded
```

#### Using default import
```javascript
import wt from '@wochit/embedded';

wt.config({ clientId, userToken });

document.querySelector('.video-creator-btn').addEventListener('click', () => {
  wt.openVideoCreator({});
});
```

#### Using named import
```javascript
import { config, openVideoCreator } from '@wochit/embedded';

config({ clientId, userToken });

document.querySelector('.video-creator-btn').addEventListener('click', () => {
  openVideoCreator({});
});
```

### Using script from CDN
* async IIFE (non-blocking)
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
    })(window, document, 'script', 'https://embedded.wochit.com/latest.min.js', 'wt');
  </script>
  ```
  
* sync (blocking)
  ```xhtml
  <script
    src="https://embedded.wochit.com/latest.min.js"
    type="application/javascript"
  ></script>
  ```

Then somewhere in your app:
```javascript
window.wt('config', { clientId, userToken });

document.querySelector('.video-creator-btn').addEventListener('click', () => {
  window.wt('openVideoCreator', {});
});
```

#### Subresource Integrity ([SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity))
* To find integrity string for given version please check-out the [Releases](https://github.com/wochit/wochit-embedded/releases) page.
* Use versioned CDN link, for example: embedded.wochit.com/**#.#.#**.min.js
* add `crossorigin` and `integrity` attributes depending on usage like so:
```javascript
...
a.setAttribute('crossorigin', 'anonymous');
a.setAttribute('integrity', 'PASTE_INTEGRITY_STRING');
// paste the above before this line:
a.src = url;
...
```

```xhtml
<script
  src="https://embedded.wochit.com/#.#.#.min.js"
  type="application/javascript"
  crossorigin="anonymous"
  integrity="PASTE_INTEGRITY_STRING"
></script>
  ```
