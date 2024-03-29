import { CommonOptions, ICommonOptions } from './model/CommonOptions';
import {
  ApplicationOptions,
  IApplicationOptions,
} from './model/ApplicationOptions';
import { WochitEmbeddedApp } from './model/WochitEmbeddedApp';
import { hasObject, hasString, logError } from './api/toolkit';

declare const __APP_VERSION__: string;
let common: CommonOptions;
let shortcut: ApplicationOptions;
const app = new WochitEmbeddedApp();

/**
 * One time integration configuration.
 * Call it where you have easy access to `clientId` and `userToken`.
 * If called multiple times, only last time options are in effect.
 * @param options {ICommonOptions}
 */
export function config(options: ICommonOptions) {
  if (!hasObject(options)) {
    logError('config() missing required argument');
    return;
  } else if (!hasString(options.clientId)) {
    logError(
      `config() expected type of 'clientId' is string, got ${options.clientId}`
    );
    return;
  } else if (!hasString(options.userToken) && options.skipLogin !== true) {
    logError(
      `config() expected type of 'userToken' is string, got ${options.userToken}`
    );
    return;
  }

  common = new CommonOptions(options);
  app.verbose = common.verbose;

  app.log(`version ${__APP_VERSION__}`);
  app.log('config', common);
}

/**
 * Mounts iframe to the page
 * @param [options] {IApplicationOptions}
 */
export function openVideoEditor(options?: IApplicationOptions) {
  if (!common) {
    logError('calling openVideoEditor() before config()');
    return;
  }

  shortcut = new ApplicationOptions(
    hasObject(options) ? (options as IApplicationOptions) : {}
  );

  try {
    new URL(shortcut.envUrl);
  } catch (xcp) {
    logError(
      `calling openVideoEditor() with invalid envUrl: "${options?.envUrl}"`
    );
    return;
  }

  app.log('openVideoEditor', shortcut);
  app.setContext(common, shortcut);
  app.mount();
}

/**
 * Update video editor configuration
 * @param options {ApplicationOptions}
 */
export function updateVideoEditor(options: ApplicationOptions) {
  if (!hasObject(options)) {
    logError('updateVideoEditor() missing required argument');
    return;
  } else if (!shortcut) {
    logError('calling updateVideoEditor() before openVideoEditor()');
    return;
  }

  app.updateAppContext(options);

  app.log('updateVideoEditor', options);
}

export default {
  config,
  openVideoEditor,
  updateVideoEditor,
};
