import { CommonOptions } from './CommonOptions';
import {
  ApplicationOptions,
  TApplicationEventCallback,
} from './ApplicationOptions';
import { hasObject, logError, uuid } from '../api/toolkit';
import {
  createContainer$,
  createIframe$,
  createStyle$,
  createSpinner$,
} from '../api/dom';
import {
  CONTAINER_CLASS,
  IFRAME_CLASS,
  LOGGER_PREFIX,
  WOCHIT_DOMAIN_MASK,
  INCOMING_MESSAGE,
  OUTGOING_MESSAGE,
  BODY_WHEN_MOUNTED_CLASS,
} from './const';

declare const __APP_VERSION__: string;

type TWindowMessageData = 'shortcutLoaded' | 'studioLoaded' | 'shortcutReady';
interface IApplicationEvent {
  type: string;
  event: string;
  payload: any;
}

let common: CommonOptions;
let shortcut: ApplicationOptions;

export class WochitEmbeddedApp {
  verbose = false;
  #uuid: string = uuid();
  #$iframe: HTMLIFrameElement | null = null;
  #$spinner: HTMLElement | null = null;

  constructor() {
    window.addEventListener('message', (e) => {
      if (this.#isRelevantMessage(e)) {
        this.#onMessage(e);
      }
    });
  }

  log(...args: any): void {
    if (this.verbose) {
      console?.log(LOGGER_PREFIX, ...args);
    }
  }

  #getContainer$(): HTMLElement | null {
    return document.querySelector(
      `.${CONTAINER_CLASS}[data-uuid="${this.#uuid}"]`
    );
  }

  #getIframe$(): HTMLElement | null {
    return document.querySelector(
      `.${IFRAME_CLASS}[data-uuid="${this.#uuid}"]`
    );
  }

  #isIframeMounted(): boolean {
    return !!this.#getIframe$();
  }

  #unmountIframe(): void {
    if (shortcut.containerEl) {
      // we won't remove user owned element - only it's content
      shortcut.containerEl.replaceChildren();
    } else {
      // otherwise we know we created it and can safely remove it
      this.#getContainer$()?.remove();
    }

    this.#$iframe = null;

    document.body.classList.remove(BODY_WHEN_MOUNTED_CLASS);
  }

  #mountIframe(): void {
    let $container = shortcut.containerEl;
    const $df = document.createDocumentFragment();

    if ($container) {
      $container.dataset.uuid = this.#uuid;
      $container.classList.add(CONTAINER_CLASS);
    } else {
      $container = createContainer$(this.#uuid);
    }

    if (!shortcut.containerEl) {
      const $style = createStyle$(this.#uuid);
      $df.appendChild($style);
    }

    this.#$spinner = createSpinner$();
    $df.appendChild(this.#$spinner);

    const src = `${shortcut.envUrl}?t=${Date.now().toString(36)}`;
    this.#$iframe = createIframe$(this.#uuid, src);
    $df.appendChild(this.#$iframe);

    $container.appendChild($df);

    if (!shortcut.containerEl) {
      document.body.appendChild($container);
    }

    document.body.classList.add(BODY_WHEN_MOUNTED_CLASS);
  }

  #unmountSpinner() {
    this.#$spinner?.remove();
  }

  setContext(_common: CommonOptions, _shortcut: ApplicationOptions): void {
    common = _common;
    shortcut = _shortcut;
  }

  mount(): void {
    if (this.#isIframeMounted()) {
      this.#unmountIframe();
    }

    this.#mountIframe();
  }

  #isRelevantMessage(e: MessageEvent<unknown>): boolean {
    let rv = false;
    try {
      const originUrl = new URL(e.origin);
      rv =
        originUrl.hostname.endsWith(WOCHIT_DOMAIN_MASK) &&
        hasObject(common) &&
        hasObject(shortcut) &&
        this.#$iframe !== null;
    } catch (ignore) {
      //
    }
    return rv;
  }

  #onMessage(e: MessageEvent<TWindowMessageData | IApplicationEvent>): void {
    this.log('#onMessage', e.data);

    if (e.data === INCOMING_MESSAGE.SHORTCUT_LOADED) {
      this.#onShortcutLoaded();
    } else if (e.data === INCOMING_MESSAGE.SHORTCUT_READY) {
      this.#onShortcutReady();
    } else if (e.data === INCOMING_MESSAGE.STUDIO_LOADED) {
      this.#onStudioLoaded();
    } else if (e.data && typeof e.data === 'object') {
      if (
        e.data.type === INCOMING_MESSAGE.APPLICATION_EVENT &&
        typeof e.data.type === 'string'
      ) {
        this.#onShortcutApplicationEvent(e as MessageEvent<IApplicationEvent>);
      }
    }
  }

  #preparePayloadForIframeWindow(
    common: CommonOptions,
    shortcut: ApplicationOptions
  ) {
    return JSON.parse(
      JSON.stringify({ ...common, ...shortcut }, (k, v) => {
        return [
          'on',
          'containerEl',
          'envUrl',
          'verbose',
          'skipLogin',
          'clientId',
          'userToken',
        ].includes(k)
          ? undefined
          : v;
      })
    );
  }

  #onShortcutLoaded(): void {
    if (!this.#$iframe || !this.#$iframe.contentWindow) {
      return;
    }

    try {
      shortcut.on.loaded(this.#$iframe);
    } catch (exc) {
      logError(exc);
    }

    this.#$iframe.contentWindow.postMessage(
      {
        cmd: OUTGOING_MESSAGE.SHORTCUT_OPTIONS,
        iframeVersion: __APP_VERSION__,
        channelId: common.clientId,
        JWT: common.userToken,
        ...this.#preparePayloadForIframeWindow(common, shortcut),
      },
      shortcut.envUrl
    );

    this.#unmountSpinner();
  }

  #onStudioLoaded(): void {
    if (!this.#$iframe || !this.#$iframe.contentWindow) {
      return;
    }

    try {
      shortcut.on.loaded(this.#$iframe);
    } catch (exc) {
      logError(exc);
    }

    this.#$iframe.contentWindow.postMessage(
      {
        cmd: OUTGOING_MESSAGE.STUDIO_OPTIONS,
        iframeVersion: __APP_VERSION__,
        channelId: common.clientId,
        JWT: common.userToken,
        isReEditing: !!shortcut.videoId,
        ...this.#preparePayloadForIframeWindow(common, shortcut),
      },
      '*'
    );

    this.#unmountSpinner();
  }

  #onShortcutReady(): void {
    try {
      shortcut.on.ready();
    } catch (exc) {
      logError(exc);
    }
  }

  #onShortcutApplicationEvent(e: MessageEvent<IApplicationEvent>): void {
    const eventName = e.data.event.toLowerCase();
    this.log('#onShortcutApplicationEvent', eventName, e.data.payload);

    const callback = shortcut.on[eventName] as TApplicationEventCallback;
    if (typeof callback === 'function') {
      try {
        callback(e.data.payload);
      } catch (exc) {
        logError(exc);
      }
    }

    if (eventName === 'abort') {
      this.#unmountIframe();
    }
  }
}
