import { hasBoolean, hasString } from '../api/toolkit';
import { DEFAULT } from './const';

export interface ICommonOptions {
  readonly channelId: string;
  readonly userToken?: string | null;
  readonly skipLogin?: boolean;
  readonly verbose?: boolean;
  /** for other props - see the online documentation */
  [key: string]: unknown;
}

export class CommonOptions implements ICommonOptions {
  [key: string]: unknown;
  readonly channelId: string = '';
  readonly userToken: string | null = null;
  readonly skipLogin: boolean = DEFAULT.SKIP_LOGIN;
  readonly verbose: boolean = DEFAULT.VERBOSE;

  constructor(options: ICommonOptions) {
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        this[prop] = options[prop];
      }
    }

    if (!hasBoolean(this.skipLogin)) {
      this.skipLogin = DEFAULT.SKIP_LOGIN;
    }

    if (!hasBoolean(this.verbose)) {
      this.verbose = false;
    }

    if (!hasString(this.envUrl)) {
      this.envUrl = DEFAULT.ENV_URL;
    }
  }
}
