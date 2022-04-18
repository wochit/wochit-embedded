import { hasBoolean, hasNumber, hasString } from '../api/toolkit';

export class CommonOptions implements ICommonOptions {
  #environments: TEnvironment[] = [
    'test',
    'prod',
    'stage',
    'test-local',
    'prod-local',
    'test-docker',
  ];

  readonly channelId: string = '';
  readonly organizationId: number | null = null;
  readonly isShownInModal: boolean = true;
  readonly idpServiceName: string | null = null;
  readonly ssoUrl: string | null = null;
  readonly verbose: boolean = false;
  readonly env: TEnvironment = 'prod';
  [key: string]: unknown;

  constructor(options: ICommonOptions) {
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        this[prop] = options[prop];
      }
    }

    if (!hasNumber(this.organizationId)) {
      this.organizationId = null;
    }

    if (!hasBoolean(this.verbose)) {
      this.verbose = false;
    }

    if (!(hasString(this.env) && this.#environments.indexOf(this.env) >= 0)) {
      this.env = 'prod';
    }

    if (!hasBoolean(this.isShownInModal)) {
      this.isShownInModal = true;
    }

    if (!hasString(this.idpServiceName)) {
      this.idpServiceName = null;
    }

    if (!hasString(this.ssoUrl)) {
      this.ssoUrl = null;
    }
  }
}
