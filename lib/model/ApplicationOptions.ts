import { hasBoolean, hasHTMLElement, hasObject } from '../api/toolkit';
import { DEFAULT } from './const';

export interface IApplicationOptions {
  /**
   * Open different url in iframe
   * @internal
   */
  readonly envUrl?: string;
  /**
   * If not specified the iframe appended into document.body element alongside with the style,
   * Use this to create your own custom look and feel - iframe will be injected into this element
   */
  readonly containerEl?: HTMLElement | null;
  /**
   * Render close modal button that will trigger `on.abort()` callback.
   * if `isShownInModal` was not specified - it's value derived from existence of `containerEl`
   * in such a way that if `containerEl` is not an element then we assume iframe is opened
   * as a modal, and if `containerEl` is defined then iframe is embedded inline
   */
  readonly isShownInModal?: boolean;
  /**
   * Callbacks hub
   */
  readonly on?: IApplicationCallbacks;
  /**
   * For other props - see the online documentation
   * @link https://docs.wochit.com/
   */
  [key: string]: unknown;
}

export declare type TLoadedCallback = ($iframe: HTMLIFrameElement) => void;
export declare type TReadyCallback = () => void;
export declare type TApplicationEventCallback = (payload: any) => void;

export interface IApplicationCallbacks {
  /**
   * Fired when main application resources are loaded but before application
   * instantiated
   */
  loaded: TLoadedCallback;
  /**
   * Fired when main application instantiated and ready to receive additional
   * window message events
   */
  ready: TReadyCallback;
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
  readonly on: IApplicationCallbacks = {
    loaded: DEFAULT.CALLBACK_STUB,
    ready: DEFAULT.CALLBACK_STUB,
  };

  constructor(options: IApplicationOptions) {
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        this[prop] = options[prop];
      }
    }

    if (!hasHTMLElement(this.containerEl)) {
      this.containerEl = null;
    }

    if (!hasBoolean(this.isShownInModal)) {
      this.isShownInModal = !this.containerEl;
    }

    this.on = hasObject(this.on)
      ? this.on
      : { loaded: DEFAULT.CALLBACK_STUB, ready: DEFAULT.CALLBACK_STUB };

    if (typeof this.on?.loaded !== 'function') {
      this.on.loaded = DEFAULT.CALLBACK_STUB;
    }

    if (typeof this.on?.ready !== 'function') {
      this.on.ready = DEFAULT.CALLBACK_STUB;
    }
  }
}
