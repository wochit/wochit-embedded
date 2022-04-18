import { CommonOptions } from './CommonOptions';
import { ShortcutOptions } from './ShortcutOptions';
import { hasObject, uuid } from '../api/toolkit';
import { createContainer$, createIframe$, createStyle$ } from '../api/dom';
import {
  CONTAINER_CLASS,
  IFRAME_CLASS,
  LOGGER_PREFIX,
  ENV_URL_SHORTCUT,
  WOCHIT_DOMAIN_MASK,
  INCOMING_MESSAGE,
  OUTGOING_MESSAGE,
} from './const';

let common: CommonOptions;
let shortcut: ShortcutOptions;

export class WochitEmbeddedApp {
  verbose = false;
  #uuid: string = uuid();
  #$iframe: HTMLIFrameElement | null = null;

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
    this.#getContainer$()?.replaceChildren();
    this.#$iframe = null;
  }

  #mountIframe(): void {
    let $container = shortcut.containerEl;
    if ($container) {
      $container.dataset.uuid = this.#uuid;
      $container.classList.add(CONTAINER_CLASS);
    } else {
      $container = this.#getContainer$();
      if (!$container) {
        $container = createContainer$(this.#uuid);
        document.body.appendChild($container);
      }
    }

    // ??? if (common.isShownInModal) ???
    const $style = createStyle$(this.#uuid);
    $container.appendChild($style);

    const src = `${ENV_URL_SHORTCUT[common.env]}?t=${Date.now()}`;
    this.#$iframe = createIframe$(this.#uuid, src);
    $container.appendChild(this.#$iframe);
  }

  setContext(_common: CommonOptions, _shortcut: ShortcutOptions): void {
    common = _common;
    shortcut = _shortcut;
  }

  openShortcut(): void {
    if (this.#isIframeMounted()) {
      this.#unmountIframe();
    }

    this.#mountIframe();
  }

  #isRelevantMessage(e: MessageEvent<any>): boolean {
    const originUrl = new URL(e.origin);
    return (
      originUrl.hostname.endsWith(WOCHIT_DOMAIN_MASK) &&
      hasObject(common) &&
      hasObject(shortcut) &&
      this.#$iframe !== null
    );
  }

  #onMessage(
    e: MessageEvent<TWindowMessageData | IShortcutApplicationEvent>
  ): void {
    this.log('#onMessage', e.data);

    if (e.data === INCOMING_MESSAGE.SHORTCUT_READY) {
      this.#onShortcutReady();
    } else if (e.data === INCOMING_MESSAGE.STUDIO_READY) {
      this.#onStudioReady();
    } else if (typeof e.data === 'object') {
      if (e.data?.type === INCOMING_MESSAGE.APPLICATION_EVENT) {
        this.#onShortcutApplicationEvent(
          e as MessageEvent<IShortcutApplicationEvent>
        );
      }
    }
  }

  #onShortcutReady(): void {
    shortcut.on.ready(this.#$iframe?.contentWindow as Window);

    this.#$iframe?.contentWindow?.postMessage(
      {
        cmd: OUTGOING_MESSAGE.SHORTCUT_OPTIONS,
        version: __APP_VERSION__,
        JWT: shortcut.userToken,
        ...JSON.parse(JSON.stringify({ ...common, ...shortcut })),
      },
      ENV_URL_SHORTCUT[common.env]
    );
  }

  #onStudioReady(): void {
    this.#$iframe?.contentWindow?.postMessage(
      {
        cmd: OUTGOING_MESSAGE.STUDIO_OPTIONS,
        version: __APP_VERSION__,
        JWT: shortcut.userToken,
        kalturaProperties: shortcut.kalturaProperties,
        isReEditing: !!shortcut.videoId,
      },
      '*'
    );
  }

  #onShortcutApplicationEvent(
    e: MessageEvent<IShortcutApplicationEvent>
  ): void {
    const eventName = e.data.event.toLowerCase();
    this.log('#onShortcutApplicationEvent', eventName, e.data.payload);

    if (typeof shortcut.on[eventName] === 'function') {
      shortcut?.on[eventName]?.(e.data.payload);
    }

    if (eventName === 'abort') {
      this.#unmountIframe();
    }
  }
}
