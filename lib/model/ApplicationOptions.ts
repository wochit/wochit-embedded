import {
  hasBoolean,
  hasHTMLElement,
  hasObject,
  hasString,
} from '../api/toolkit';
import { DEFAULT } from './const';

export interface IApplicationOptions {
  readonly envUrl?: string;
  readonly containerEl?: HTMLElement | null;
  readonly isShownInModal?: boolean;
  readonly videoId?: string | null;
  readonly on?: IApplicationCallbacks;
  /** for other props - see the online documentation */
  [key: string]: unknown;
}

export declare type TLoadedCallback = ($iframe: HTMLIFrameElement) => void;
export declare type TApplicationEventCallback = (payload: any) => void;

export interface IApplicationCallbacks {
  /**
   * fired when main application resources are loaded but before application instantiated
   */
  loaded: TLoadedCallback;
  /**
   * Other callback names are not locked and opened application
   * is free to introduce other events as development unfolds.
   * Among already developed events are: 'abort', 'produce', 'save'
   */
  [key: string]: TApplicationEventCallback | unknown;
}

export class ApplicationOptions implements IApplicationOptions {
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
