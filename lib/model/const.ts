import { noop } from '../api/toolkit';

export const LOGGER_PREFIX = '@wochit/embedded:';
export const CONTAINER_CLASS = 'wochit-embedded-container';
export const IFRAME_CLASS = 'wochit-embedded-iframe';
export const BODY_WHEN_MOUNTED_CLASS = 'wochit-embedded-mounted';
export const SPINNER_CLASS = 'wochit-embedded-spinner';
export const WOCHIT_DOMAIN_REGEXP = /\bwochit\.(com|ai)\b/i;
export enum INCOMING_MESSAGE {
  SHORTCUT_LOADED = 'shortcutLoaded',
  SHORTCUT_READY = 'shortcutReady',
  STUDIO_LOADED = 'studioLoaded',
  APPLICATION_EVENT = 'APPLICATION_EVENT',
}
export enum OUTGOING_MESSAGE {
  SHORTCUT_OPTIONS = 'shortcutOptions',
  STUDIO_OPTIONS = 'studioOptions',
  UPDATE_OPTIONS = 'updateOptions',
}
export const DEFAULT = {
  SKIP_LOGIN: false,
  VERBOSE: false,
  ENV_URL: 'https://shortcut.wochit.com',
  CALLBACK_STUB: noop,
};
