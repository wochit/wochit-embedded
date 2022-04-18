import { CommonOptions } from './model/CommonOptions';
import { ApplicationOptions } from './model/ApplicationOptions';
import { WochitEmbeddedApp } from './model/WochitEmbeddedApp';
import { hasObject, hasString, logError } from './api/toolkit';

let common: CommonOptions;
let shortcut: ApplicationOptions;
const app = new WochitEmbeddedApp();

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
  app.openVideoEditor();
}

export default {
  config,
  openVideoEditor,
};
