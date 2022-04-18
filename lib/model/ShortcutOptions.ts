import {
  hasBoolean,
  hasHTMLElement,
  hasObject,
  hasString,
} from '../api/toolkit';
import { DEFAULT } from './const';

export class ShortcutOptions implements IApplicationOptions {
  [key: string]: unknown;
  readonly envUrl: string = DEFAULT.ENV_URL;
  readonly containerEl: HTMLElement | null = null;
  readonly isShownInModal: boolean | undefined = undefined;
  readonly videoId: string | null = null;
  readonly on: IApplicationCallbacks = { loaded: DEFAULT.CALLBACK_LOADED };

  constructor(options: IApplicationOptions) {
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        this[prop] = options[prop];
      }
    }

    if (!hasHTMLElement(this.containerEl)) {
      this.containerEl = null;
    }

    /**
     * if `isShownInModal` was not specified - it's value derived from existence of `containerEl`
     * in such a way that if `containerEl` is not an element then we assume iframe is opened
     * as a modal, and if `containerEl` is defined then iframe is embedded inline
     */
    if (!hasBoolean(this.isShownInModal)) {
      this.isShownInModal = !this.containerEl;
    }

    if (!hasString(this.videoId)) {
      this.videoId = null;
    }

    this.on = hasObject(this.on)
      ? this.on
      : { loaded: DEFAULT.CALLBACK_LOADED };

    if (typeof this.on?.loaded !== 'function') {
      this.on.loaded = DEFAULT.CALLBACK_LOADED;
    }
  }
}
