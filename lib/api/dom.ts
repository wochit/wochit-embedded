import {
  BODY_WHEN_MOUNTED_CLASS,
  CONTAINER_CLASS,
  IFRAME_CLASS,
  SPINNER_CLASS,
} from '../model/const';
import { normalizeSpace } from './toolkit';

export function createContainer$(uuid: string): HTMLElement {
  const $el = document.createElement('DIV');

  $el.dataset['uuid'] = uuid;
  $el.classList.add(CONTAINER_CLASS);

  return $el;
}

export function createSpinner$(): HTMLElement {
  const $el = document.createElement('DIV');

  $el.classList.add(SPINNER_CLASS);

  return $el;
}

export function createIframe$(uuid: string, src: string): HTMLIFrameElement {
  const $el = document.createElement('IFRAME') as HTMLIFrameElement;

  $el.dataset['uuid'] = uuid;
  $el.classList.add(IFRAME_CLASS);
  $el.setAttribute(
    'allow',
    'fullscreen *; microphone *;camera *;display-capture *;'
  );
  $el.setAttribute('src', src);

  return $el;
}

export function createStyle$(uuid: string): HTMLElement {
  const $el = document.createElement('STYLE');

  $el.dataset.uuid = uuid;
  // language=CSS
  $el.textContent = normalizeSpace(`
    .${BODY_WHEN_MOUNTED_CLASS} {
      overscroll-behavior-x: none;
      overflow: hidden;
    }
    .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} {
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
    }
    .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${SPINNER_CLASS} {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 50px;
      margin-left: -40px;
      margin-top: -25px;
      background-image: url("data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='8.042%25' y1='0%25' x2='65.682%25' y2='23.865%25' id='a'%3E%3Cstop stop-color='%2306A9F4' stop-opacity='0' offset='0%25'/%3E%3Cstop stop-color='%2306A9F4' stop-opacity='.331' offset='63.146%25'/%3E%3Cstop stop-color='%2306A9F4' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1 1)'%3E%3Cpath d='M36 18c0-9.94-8.06-18-18-18' id='Oval-2' stroke='url(%23a)' stroke-width='2'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='0.9s' repeatCount='indefinite' /%3E%3C/path%3E%3Ccircle fill='%2306A9F4' cx='36' cy='18' r='1'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='0.9s' repeatCount='indefinite' /%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${IFRAME_CLASS} {
      border: none;
      width: 100%;
      height: 100%;
    }
    @media (min-width: 1440px) {
      .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${IFRAME_CLASS} {
        max-width: 90%;
        max-height: 90%;
        min-width: 1280px;
      }
    }
    @media (max-width: 1440px) {
      .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${IFRAME_CLASS} {
        max-width: 100%;
        max-height: 100%;
      }
    }
  `);

  return $el;
}
