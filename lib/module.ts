import { CommonOptions } from './model/CommonOptions';
import { ShortcutOptions } from './model/ShortcutOptions';
import { WochitEmbeddedApp } from './model/WochitEmbeddedApp';
import { hasObject, hasString, logError } from './api/toolkit';

let common: CommonOptions;
let shortcut: ShortcutOptions;
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

export function openShortcut(options?: IApplicationOptions) {
  if (!common) {
    logError('calling openShortcut() before config()');
    return;
  }

  shortcut = new ShortcutOptions(
    hasObject(options) ? (options as IApplicationOptions) : {}
  );

  try {
    new URL(shortcut.envUrl);
  } catch (xcp) {
    logError(
      `calling openShortcut() with invalid envUrl: "${options?.envUrl}"`
    );
    return;
  }

  app.log('openShortcut', shortcut);
  app.setContext(common, shortcut);
  app.openShortcut();
}

export default {
  config,
  openShortcut,
};
