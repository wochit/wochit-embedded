import { CommonOptions, ICommonOptions } from './model/CommonOptions';
import {
  ApplicationOptions,
  IApplicationOptions,
} from './model/ApplicationOptions';
import { WochitEmbeddedApp } from './model/WochitEmbeddedApp';
import { hasObject, hasString, logError } from './api/toolkit';

let common: CommonOptions;
let shortcut: ApplicationOptions;
const app = new WochitEmbeddedApp();

/**
 * one time integration configuration
 * @param options
 */
export function config(options: ICommonOptions) {
  if (!hasObject(options)) {
    logError('calling config() without options');
    return;
  } else if (!hasString(options.channelId)) {
    logError('calling config() without channelId');
    return;
  } else if (!hasString(options.userToken) && options.skipLogin !== true) {
    logError('calling config() without userToken');
    return;
  }

  common = new CommonOptions(options);
  app.verbose = common.verbose;
  app.log('config', common);
}

export function openVideoCreator(options?: IApplicationOptions) {
  if (!common) {
    logError('calling openVideoCreator() before config()');
    return;
  }

  shortcut = new ApplicationOptions(
    hasObject(options) ? (options as IApplicationOptions) : {}
  );

  try {
    new URL(shortcut.envUrl);
  } catch (xcp) {
    logError(
      `calling openVideoCreator() with invalid envUrl: "${options?.envUrl}"`
    );
    return;
  }

  app.log('openVideoCreator', shortcut);
  app.setContext(common, shortcut);
  app.mount();
}

export default {
  config,
  openVideoCreator,
};
