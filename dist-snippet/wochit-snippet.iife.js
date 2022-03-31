var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
(function() {
  "use strict";
  const LOGGER_PREFIX = "@wochit/embedded:";
  const CONTAINER_CLASS = "wochit-embedded-container";
  const IFRAME_ID = "wtInsideIframe";
  const IFRAME_CLASS = "wochit-embedded-iframe";
  const WOCHIT_DOMAIN_MASK = ".wochit.com";
  const ENV_URL_SHORTCUT = {
    test: "https://shortcut-test.wochit.com/",
    "test-local": "https://localhost.wochit.com:8080/",
    "test-docker": "https://fb-self-serve-shortcut.wochit.com/",
    stage: "https://shortcut-stage.wochit.com/",
    prod: "https://shortcut.wochit.com/",
    "prod-local": "https://localhost.wochit.com:8080/"
  };
  var INCOMING_MESSAGE;
  (function(INCOMING_MESSAGE2) {
    INCOMING_MESSAGE2["SHORTCUT_READY"] = "shortcutLoaded";
    INCOMING_MESSAGE2["STUDIO_READY"] = "studioLoaded";
    INCOMING_MESSAGE2["APPLICATION_EVENT"] = "APPLICATION_EVENT";
  })(INCOMING_MESSAGE || (INCOMING_MESSAGE = {}));
  var OUTGOING_MESSAGE;
  (function(OUTGOING_MESSAGE2) {
    OUTGOING_MESSAGE2["SHORTCUT_OPTIONS"] = "shortcutOptions";
    OUTGOING_MESSAGE2["STUDIO_OPTIONS"] = "studioOptions";
  })(OUTGOING_MESSAGE || (OUTGOING_MESSAGE = {}));
  function noop() {
  }
  function hasHTMLElement(value) {
    return value instanceof HTMLElement;
  }
  function hasBoolean(value) {
    return value === true || value === false;
  }
  function hasString(value) {
    return typeof value === "string" && value.length > 0;
  }
  function hasNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }
  function hasArray(value) {
    return value instanceof Array && value.length > 0;
  }
  function hasObject(value) {
    return typeof value === "object" && value !== null;
  }
  function logError(msg) {
    console == null ? void 0 : console.error(LOGGER_PREFIX, msg);
  }
  function uuid() {
    return (crypto == null ? void 0 : crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36);
  }
  function normalizeSpace(str) {
    return str.trim().replace(/\s+/gm, " ");
  }
  var __classPrivateFieldGet$1 = globalThis && globalThis.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _CommonOptions_environments;
  class CommonOptions {
    constructor(options) {
      _CommonOptions_environments.set(this, [
        "test",
        "prod",
        "stage",
        "test-local",
        "prod-local",
        "test-docker"
      ]);
      Object.defineProperty(this, "channelId", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ""
      });
      Object.defineProperty(this, "organizationId", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "isShownInModal", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: true
      });
      Object.defineProperty(this, "idpServiceName", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "ssoUrl", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "verbose", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "env", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "prod"
      });
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
      if (!(hasString(this.env) && __classPrivateFieldGet$1(this, _CommonOptions_environments, "f").indexOf(this.env) >= 0)) {
        this.env = "prod";
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
  _CommonOptions_environments = /* @__PURE__ */ new WeakMap();
  class ShortcutOptions {
    constructor(options) {
      var _a;
      Object.defineProperty(this, "containerEl", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "userToken", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "linkedFields", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "videoContext", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "categoryNames", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "storyboardId", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "videoId", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "videoTitle", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "showCreativeGallery", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "showUploadGallery", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "galleryAssets", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "destLanguage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
      Object.defineProperty(this, "showSaveForLater", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "on", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: { ready: noop }
      });
      Object.defineProperty(this, "kalturaProperties", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: null
      });
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
      if (typeof ((_a = this.on) == null ? void 0 : _a.ready) !== "function") {
        this.on.ready = noop;
      }
    }
  }
  function createContainer$(uuid2) {
    const $el = document.createElement("DIV");
    $el.dataset["uuid"] = uuid2;
    $el.classList.add(CONTAINER_CLASS);
    return $el;
  }
  function createIframe$(uuid2, src) {
    const $el = document.createElement("IFRAME");
    $el.dataset["uuid"] = uuid2;
    $el.id = IFRAME_ID;
    $el.classList.add(IFRAME_CLASS);
    $el.setAttribute("allow", "fullscreen *; microphone *;camera *;display-capture *;");
    $el.setAttribute("src", src);
    return $el;
  }
  function createStyle$(uuid2) {
    const $el = document.createElement("STYLE");
    $el.dataset.uuid = uuid2;
    $el.textContent = normalizeSpace(`
    .${CONTAINER_CLASS}[data-uuid="${uuid2}"]:not(:empty) {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      padding: 5vh 5vw;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.6);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${CONTAINER_CLASS}[data-uuid="${uuid2}"]:not(:empty) .${IFRAME_CLASS} {
      width: 100%;
      height: 100%;
      border: none;
    }
  `);
    return $el;
  }
  var __classPrivateFieldGet = globalThis && globalThis.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var __classPrivateFieldSet = globalThis && globalThis.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var _WochitEmbeddedApp_instances, _WochitEmbeddedApp_uuid, _WochitEmbeddedApp_$iframe, _WochitEmbeddedApp_getContainer$, _WochitEmbeddedApp_getIframe$, _WochitEmbeddedApp_isIframeMounted, _WochitEmbeddedApp_unmountIframe, _WochitEmbeddedApp_mountIframe, _WochitEmbeddedApp_isRelevantMessage, _WochitEmbeddedApp_onMessage, _WochitEmbeddedApp_onShortcutReady, _WochitEmbeddedApp_onStudioReady, _WochitEmbeddedApp_onShortcutApplicationEvent;
  let common$1;
  let shortcut$1;
  class WochitEmbeddedApp {
    constructor() {
      _WochitEmbeddedApp_instances.add(this);
      Object.defineProperty(this, "verbose", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: false
      });
      _WochitEmbeddedApp_uuid.set(this, uuid());
      _WochitEmbeddedApp_$iframe.set(this, null);
      window.addEventListener("message", (e) => {
        if (__classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_isRelevantMessage).call(this, e)) {
          __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onMessage).call(this, e);
        }
      });
    }
    log(...args) {
      if (this.verbose) {
        console == null ? void 0 : console.log(LOGGER_PREFIX, ...args);
      }
    }
    setContext(_common, _shortcut) {
      common$1 = _common;
      shortcut$1 = _shortcut;
    }
    openShortcut() {
      if (__classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_isIframeMounted).call(this)) {
        __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_unmountIframe).call(this);
      }
      __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_mountIframe).call(this);
    }
  }
  _WochitEmbeddedApp_uuid = /* @__PURE__ */ new WeakMap(), _WochitEmbeddedApp_$iframe = /* @__PURE__ */ new WeakMap(), _WochitEmbeddedApp_instances = /* @__PURE__ */ new WeakSet(), _WochitEmbeddedApp_getContainer$ = function _WochitEmbeddedApp_getContainer$2() {
    return document.querySelector(`.${CONTAINER_CLASS}[data-uuid="${__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f")}"]`);
  }, _WochitEmbeddedApp_getIframe$ = function _WochitEmbeddedApp_getIframe$2() {
    return document.querySelector(`.${IFRAME_CLASS}[data-uuid="${__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f")}"]`);
  }, _WochitEmbeddedApp_isIframeMounted = function _WochitEmbeddedApp_isIframeMounted2() {
    return !!__classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_getIframe$).call(this);
  }, _WochitEmbeddedApp_unmountIframe = function _WochitEmbeddedApp_unmountIframe2() {
    var _a;
    (_a = __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_getContainer$).call(this)) == null ? void 0 : _a.replaceChildren();
    __classPrivateFieldSet(this, _WochitEmbeddedApp_$iframe, null, "f");
  }, _WochitEmbeddedApp_mountIframe = function _WochitEmbeddedApp_mountIframe2() {
    let $container = shortcut$1.containerEl;
    if ($container) {
      $container.dataset.uuid = __classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f");
      $container.classList.add(CONTAINER_CLASS);
    } else {
      $container = __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_getContainer$).call(this);
      if (!$container) {
        $container = createContainer$(__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f"));
        document.body.appendChild($container);
      }
    }
    const $style = createStyle$(__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f"));
    $container.appendChild($style);
    const src = `${ENV_URL_SHORTCUT[common$1.env]}?t=${Date.now()}`;
    __classPrivateFieldSet(this, _WochitEmbeddedApp_$iframe, createIframe$(__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f"), src), "f");
    $container.appendChild(__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f"));
  }, _WochitEmbeddedApp_isRelevantMessage = function _WochitEmbeddedApp_isRelevantMessage2(e) {
    const originUrl = new URL(e.origin);
    return originUrl.hostname.endsWith(WOCHIT_DOMAIN_MASK) && hasObject(common$1) && hasObject(shortcut$1) && __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f") !== null;
  }, _WochitEmbeddedApp_onMessage = function _WochitEmbeddedApp_onMessage2(e) {
    var _a;
    this.log("#onMessage", e.data);
    if (e.data === INCOMING_MESSAGE.SHORTCUT_READY) {
      __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onShortcutReady).call(this);
    } else if (e.data === INCOMING_MESSAGE.STUDIO_READY) {
      __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onStudioReady).call(this);
    } else if (typeof e.data === "object") {
      if (((_a = e.data) == null ? void 0 : _a.type) === INCOMING_MESSAGE.APPLICATION_EVENT) {
        __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onShortcutApplicationEvent).call(this, e);
      }
    }
  }, _WochitEmbeddedApp_onShortcutReady = function _WochitEmbeddedApp_onShortcutReady2() {
    var _a, _b, _c;
    shortcut$1.on.ready((_a = __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f")) == null ? void 0 : _a.contentWindow);
    (_c = (_b = __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f")) == null ? void 0 : _b.contentWindow) == null ? void 0 : _c.postMessage(__spreadValues({
      cmd: OUTGOING_MESSAGE.SHORTCUT_OPTIONS,
      version: "0.0.0",
      JWT: shortcut$1.userToken
    }, JSON.parse(JSON.stringify(__spreadValues(__spreadValues({}, common$1), shortcut$1)))), ENV_URL_SHORTCUT[common$1.env]);
  }, _WochitEmbeddedApp_onStudioReady = function _WochitEmbeddedApp_onStudioReady2() {
    var _a, _b;
    (_b = (_a = __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f")) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.postMessage({
      cmd: OUTGOING_MESSAGE.STUDIO_OPTIONS,
      JWT: shortcut$1.userToken,
      kalturaProperties: shortcut$1.kalturaProperties,
      isReEditing: !!shortcut$1.videoId
    }, "*");
  }, _WochitEmbeddedApp_onShortcutApplicationEvent = function _WochitEmbeddedApp_onShortcutApplicationEvent2(e) {
    var _a, _b;
    const eventName = e.data.event.toLowerCase();
    this.log("#onShortcutApplicationEvent", eventName, e.data.payload);
    if (typeof shortcut$1.on[eventName] === "function") {
      (_b = shortcut$1 == null ? void 0 : (_a = shortcut$1.on)[eventName]) == null ? void 0 : _b.call(_a, e.data.payload);
    }
    if (eventName === "abort") {
      __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_unmountIframe).call(this);
    }
  };
  let common;
  let shortcut;
  const app = new WochitEmbeddedApp();
  function config(options) {
    if (!hasObject(options)) {
      logError("calling config() without options");
      return;
    } else if (!hasString(options.channelId)) {
      logError("calling config() without channelId");
      return;
    }
    common = new CommonOptions(options);
    app.verbose = common.verbose;
    app.log("config", common);
  }
  function openShortcut(options) {
    if (!common) {
      logError("calling openShortcut() before config()");
      return;
    }
    shortcut = new ShortcutOptions(hasObject(options) ? options : {});
    app.log("openShortcut", shortcut);
    app.setContext(common, shortcut);
    app.openShortcut();
  }
  var wt = {
    config,
    openShortcut
  };
  function wochitSnippet() {
    wt.config({ channelId: "1" });
    wt.openShortcut({});
    console.log("wochit-snippet", "0.0.0", window.wt);
  }
  wochitSnippet();
})();
