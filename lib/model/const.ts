export const LOGGER_PREFIX = '@wochit/embedded:';
export const CONTAINER_CLASS = 'wochit-embedded-container';
export const IFRAME_ID = 'wtInsideIframe';
export const IFRAME_CLASS = 'wochit-embedded-iframe';
export const WOCHIT_DOMAIN_MASK = '.wochit.com';
export const ENV_URL_SHORTCUT: TEnvironmentOptions = {
  test: 'https://shortcut-test.wochit.com/',
  'test-local': 'https://localhost.wochit.com:8080/',
  'test-docker': 'https://fb-self-serve-shortcut.wochit.com/',
  stage: 'https://shortcut-stage.wochit.com/',
  prod: 'https://shortcut.wochit.com/',
  'prod-local': 'https://localhost.wochit.com:8080/',
};
export enum INCOMING_MESSAGE {
  SHORTCUT_READY = 'shortcutLoaded',
  STUDIO_READY = 'studioLoaded',
  APPLICATION_EVENT = 'APPLICATION_EVENT',
}
export enum OUTGOING_MESSAGE {
  SHORTCUT_OPTIONS = 'shortcutOptions',
  STUDIO_OPTIONS = 'studioOptions',
}
