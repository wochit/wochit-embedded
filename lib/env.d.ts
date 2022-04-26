declare const __APP_VERSION__: string;

interface ICommonOptions {
  readonly channelId: string;
  readonly userToken?: string | null;
  readonly skipLogin?: boolean;
  readonly verbose?: boolean;
  /** for other props - see the online documentation */
  [key: string]: unknown;
}

interface IApplicationOptions {
  readonly envUrl?: string;
  readonly containerEl?: HTMLElement | null;
  readonly isShownInModal?: boolean;
  readonly videoId?: string | null;
  readonly on?: IApplicationCallbacks;
  /** for other props - see the online documentation */
  [key: string]: unknown;
}

declare type TLoadedCallback = ($iframe: HTMLIFrameElement) => void;
declare type TApplicationEventCallback = (payload: any) => void;

interface IApplicationCallbacks {
  loaded: TLoadedCallback;
  // Other callback names are not locked and opened application
  // is free to introduce other events as development unfolds.
  // Among already developed events are: 'abort', 'produce', 'save'
  [key: string]: TApplicationEventCallback | unknown;
}
