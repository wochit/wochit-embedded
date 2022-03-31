declare const __APP_VERSION__: string;

type TEnvironment =
  | 'test'
  | 'prod'
  | 'stage'
  | 'test-local'
  | 'prod-local'
  | 'test-docker';

type TEnvironmentOptions = {
  [Properties in TEnvironment]: string;
};

interface IShortcutApplicationEvent {
  type: string;
  event: string;
  payload: any;
}

type TWindowMessageData =
  | 'shortcutLoaded'
  | 'studioLoaded'
  | 'communicatorLoaded'; // ???

interface ICommonOptions {
  readonly channelId: string;
  readonly organizationId?: number | null;
  readonly isShownInModal?: boolean;
  readonly idpServiceName?: string | null;
  readonly ssoUrl?: string | null;
  readonly verbose?: boolean;
  readonly env?: TEnvironment;
  [key: string]: unknown;
}

interface IShortcutOptions {
  readonly containerEl?: HTMLElement | null;
  readonly userToken?: string | null; // ??? rename to JWT ???
  readonly linkedFields?: object | null;
  readonly videoContext?: string | null;
  readonly categoryNames?: string | null;
  readonly storyboardId?: string | null;
  readonly videoId?: string | null;
  readonly videoTitle?: string | null;
  readonly showCreativeGallery?: boolean;
  readonly showUploadGallery?: boolean;
  readonly galleryAssets?: [] | null;
  readonly destLanguage?: string | null;
  readonly showSaveForLater?: boolean;
  readonly on?: IShortcutCallbacks;
  // ??? undocumented ???
  [key: string]: unknown;
  readonly kalturaProperties?: any;
}

declare type TReadyCallback = (w: Window) => void;
declare type TApplicationEventCallback = (payload: any) => void;

interface IShortcutCallbacks {
  ready: TReadyCallback;
  // Other callback names are not locked and shortcut-app
  // is free to introduce other events as development unfolds.
  // Among already developed events are: 'abort', 'produce', 'save'
  [key: string]: TApplicationEventCallback;
}
