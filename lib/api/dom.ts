import { CONTAINER_CLASS, IFRAME_CLASS, IFRAME_ID } from '../model/const';
import { normalizeSpace } from './toolkit';

export function createContainer$(uuid: string): HTMLElement {
  const $el = document.createElement('DIV');

  $el.dataset['uuid'] = uuid;
  $el.classList.add(CONTAINER_CLASS);

  return $el;
}

export function createIframe$(uuid: string, src: string): HTMLIFrameElement {
  const $el = document.createElement('IFRAME') as HTMLIFrameElement;

  $el.dataset['uuid'] = uuid;
  $el.id = IFRAME_ID;
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
  $el.textContent = normalizeSpace(`
    .${CONTAINER_CLASS}[data-uuid="${uuid}"]:not(:empty) {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      padding: 5vh 5vw;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${CONTAINER_CLASS}[data-uuid="${uuid}"]:not(:empty) .${IFRAME_CLASS} {
      width: 100%;
      height: 100%;
      border: none;
    }
  `);

  return $el;
}
