import { hasArray, hasString } from '../api/toolkit';
import { DEFAULT, OBJECT_NAME_STASH } from './const';
import { initProxy, scanQue, TApi } from './api';

(function wochitSnippet() {
  if (!hasString(window[OBJECT_NAME_STASH])) {
    window[OBJECT_NAME_STASH] = DEFAULT.OBJECT_NAME;
  }

  const apiName = window[OBJECT_NAME_STASH];
  const api = window[apiName] as TApi;

  if (typeof api === 'function') {
    if (!api.initialized) {
      if (hasArray(api.q)) {
        scanQue(api.q);
      }

      initProxy(apiName);
    }
  } else {
    initProxy(apiName);
  }
})();
