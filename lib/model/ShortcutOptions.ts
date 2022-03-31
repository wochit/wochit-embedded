import {
  hasArray,
  hasBoolean,
  hasHTMLElement,
  hasObject,
  hasString,
  noop,
} from '../api/toolkit';

export class ShortcutOptions implements IShortcutOptions {
  readonly containerEl: HTMLElement | null = null;
  readonly userToken: string | null = null;
  readonly linkedFields: object | null = null;
  readonly videoContext: string | null = null;
  readonly categoryNames: string | null = null;
  readonly storyboardId: string | null = null;
  readonly videoId: string | null = null;
  readonly videoTitle: string | null = null;
  readonly showCreativeGallery: boolean = false;
  readonly showUploadGallery: boolean = false;
  readonly galleryAssets: [] | null = null;
  readonly destLanguage: string | null = null;
  readonly showSaveForLater: boolean = false;
  readonly on: IShortcutCallbacks = { ready: noop };
  // ??? undocumented ???
  [key: string]: unknown;
  readonly kalturaProperties: any = null;

  constructor(options: IShortcutOptions) {
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        this[prop] = options[prop];
      }
    }

    if (!hasHTMLElement(this.containerEl)) {
      this.containerEl = null;
    }

    if (!hasString(this.userToken)) {
      this.userToken = null;
    }

    if (!hasObject(this.linkedFields)) {
      this.linkedFields = null;
    }

    if (!hasString(this.videoContext)) {
      this.videoContext = null;
    }

    if (!hasString(this.categoryNames)) {
      this.categoryNames = null;
    }

    if (!hasString(this.storyboardId)) {
      this.storyboardId = null;
    }

    if (!hasString(this.videoId)) {
      this.videoId = null;
    }

    if (!hasString(this.videoTitle)) {
      this.videoTitle = null;
    }

    if (!hasBoolean(this.showCreativeGallery)) {
      this.showCreativeGallery = false;
    }

    if (!hasBoolean(this.showUploadGallery)) {
      this.showUploadGallery = false;
    }

    if (!hasArray(this.galleryAssets)) {
      this.galleryAssets = null;
    }

    if (!hasString(this.destLanguage)) {
      this.destLanguage = null;
    }

    if (!hasBoolean(this.showSaveForLater)) {
      this.showSaveForLater = false;
    }

    this.on = hasObject(this.on) ? this.on : { ready: noop };
    if (typeof this.on?.ready !== 'function') {
      this.on.ready = noop;
    }
  }
}
