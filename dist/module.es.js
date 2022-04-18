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
const LOGGER_PREFIX = "@wochit/embedded:";
const CONTAINER_CLASS = "wochit-embedded-container";
const IFRAME_CLASS = "wochit-embedded-iframe";
const BODY_WHEN_MOUNTED_CLASS = "wochit-embedded-mounted";
const SPINNER_CLASS = "wochit-embedded-spinner";
const WOCHIT_DOMAIN_MASK = ".wochit.com";
var INCOMING_MESSAGE;
(function(INCOMING_MESSAGE2) {
  INCOMING_MESSAGE2["SHORTCUT_LOADED"] = "shortcutLoaded";
  INCOMING_MESSAGE2["STUDIO_LOADED"] = "studioLoaded";
  INCOMING_MESSAGE2["APPLICATION_EVENT"] = "APPLICATION_EVENT";
})(INCOMING_MESSAGE || (INCOMING_MESSAGE = {}));
var OUTGOING_MESSAGE;
(function(OUTGOING_MESSAGE2) {
  OUTGOING_MESSAGE2["SHORTCUT_OPTIONS"] = "shortcutOptions";
  OUTGOING_MESSAGE2["STUDIO_OPTIONS"] = "studioOptions";
})(OUTGOING_MESSAGE || (OUTGOING_MESSAGE = {}));
const DEFAULT = {
  SKIP_LOGIN: false,
  VERBOSE: false,
  ENV_URL: "https://shortcut.wochit.com",
  CALLBACK_LOADED: noop
};
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
class CommonOptions {
  constructor(options) {
    Object.defineProperty(this, "channelId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: ""
    });
    Object.defineProperty(this, "userToken", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, "skipLogin", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: DEFAULT.SKIP_LOGIN
    });
    Object.defineProperty(this, "verbose", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: DEFAULT.VERBOSE
    });
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
class ShortcutOptions {
  constructor(options) {
    var _a;
    Object.defineProperty(this, "envUrl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: DEFAULT.ENV_URL
    });
    Object.defineProperty(this, "containerEl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, "isShownInModal", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "videoId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, "on", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: { loaded: DEFAULT.CALLBACK_LOADED }
    });
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        this[prop] = options[prop];
      }
    }
    if (!hasHTMLElement(this.containerEl)) {
      this.containerEl = null;
    }
    if (!hasBoolean(this.isShownInModal)) {
      this.isShownInModal = !this.containerEl;
    }
    if (!hasString(this.videoId)) {
      this.videoId = null;
    }
    this.on = hasObject(this.on) ? this.on : { loaded: DEFAULT.CALLBACK_LOADED };
    if (typeof ((_a = this.on) == null ? void 0 : _a.loaded) !== "function") {
      this.on.loaded = DEFAULT.CALLBACK_LOADED;
    }
  }
}
function createContainer$(uuid2) {
  const $el = document.createElement("DIV");
  $el.dataset["uuid"] = uuid2;
  $el.classList.add(CONTAINER_CLASS);
  return $el;
}
function createSpinner$() {
  const $el = document.createElement("DIV");
  $el.classList.add(SPINNER_CLASS);
  return $el;
}
function createIframe$(uuid2, src) {
  const $el = document.createElement("IFRAME");
  $el.dataset["uuid"] = uuid2;
  $el.classList.add(IFRAME_CLASS);
  $el.setAttribute("allow", "fullscreen *; microphone *;camera *;display-capture *;");
  $el.setAttribute("src", src);
  return $el;
}
function createStyle$(uuid2) {
  const $el = document.createElement("STYLE");
  $el.dataset.uuid = uuid2;
  $el.textContent = normalizeSpace(`
    .${BODY_WHEN_MOUNTED_CLASS} {
      overscroll-behavior-x: none;
      overflow: hidden;
    }
    .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} {
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
    }
    .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${SPINNER_CLASS} {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 50px;
      margin-left: -40px;
      margin-top: -25px;
      background-image: url("data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='8.042%25' y1='0%25' x2='65.682%25' y2='23.865%25' id='a'%3E%3Cstop stop-color='%2306A9F4' stop-opacity='0' offset='0%25'/%3E%3Cstop stop-color='%2306A9F4' stop-opacity='.331' offset='63.146%25'/%3E%3Cstop stop-color='%2306A9F4' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1 1)'%3E%3Cpath d='M36 18c0-9.94-8.06-18-18-18' id='Oval-2' stroke='url(%23a)' stroke-width='2'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='0.9s' repeatCount='indefinite' /%3E%3C/path%3E%3Ccircle fill='%2306A9F4' cx='36' cy='18' r='1'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='0.9s' repeatCount='indefinite' /%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${IFRAME_CLASS} {
      border: none;
      width: 100%;
      height: 100%;
    }
    @media (min-width: 1440px) {
      .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${IFRAME_CLASS} {
        max-width: 90%;
        max-height: 90%;
        min-width: 1280px;
      }
    }
    @media (max-width: 1440px) {
      .${BODY_WHEN_MOUNTED_CLASS} .${CONTAINER_CLASS} .${IFRAME_CLASS} {
        max-width: 100%;
        max-height: 100%;
      }
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
var _WochitEmbeddedApp_instances, _WochitEmbeddedApp_uuid, _WochitEmbeddedApp_$iframe, _WochitEmbeddedApp_$spinner, _WochitEmbeddedApp_getContainer$, _WochitEmbeddedApp_getIframe$, _WochitEmbeddedApp_isIframeMounted, _WochitEmbeddedApp_unmountIframe, _WochitEmbeddedApp_mountIframe, _WochitEmbeddedApp_unmountSpinner, _WochitEmbeddedApp_isRelevantMessage, _WochitEmbeddedApp_onMessage, _WochitEmbeddedApp_onShortcutLoaded, _WochitEmbeddedApp_onStudioLoaded, _WochitEmbeddedApp_onShortcutApplicationEvent;
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
    _WochitEmbeddedApp_$spinner.set(this, null);
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
_WochitEmbeddedApp_uuid = /* @__PURE__ */ new WeakMap(), _WochitEmbeddedApp_$iframe = /* @__PURE__ */ new WeakMap(), _WochitEmbeddedApp_$spinner = /* @__PURE__ */ new WeakMap(), _WochitEmbeddedApp_instances = /* @__PURE__ */ new WeakSet(), _WochitEmbeddedApp_getContainer$ = function _WochitEmbeddedApp_getContainer$2() {
  return document.querySelector(`.${CONTAINER_CLASS}[data-uuid="${__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f")}"]`);
}, _WochitEmbeddedApp_getIframe$ = function _WochitEmbeddedApp_getIframe$2() {
  return document.querySelector(`.${IFRAME_CLASS}[data-uuid="${__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f")}"]`);
}, _WochitEmbeddedApp_isIframeMounted = function _WochitEmbeddedApp_isIframeMounted2() {
  return !!__classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_getIframe$).call(this);
}, _WochitEmbeddedApp_unmountIframe = function _WochitEmbeddedApp_unmountIframe2() {
  var _a;
  if (shortcut$1.containerEl) {
    shortcut$1.containerEl.replaceChildren();
  } else {
    (_a = __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_getContainer$).call(this)) == null ? void 0 : _a.remove();
  }
  __classPrivateFieldSet(this, _WochitEmbeddedApp_$iframe, null, "f");
  document.body.classList.remove(BODY_WHEN_MOUNTED_CLASS);
}, _WochitEmbeddedApp_mountIframe = function _WochitEmbeddedApp_mountIframe2() {
  let $container = shortcut$1.containerEl;
  const $df = document.createDocumentFragment();
  if ($container) {
    $container.dataset.uuid = __classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f");
    $container.classList.add(CONTAINER_CLASS);
  } else {
    $container = createContainer$(__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f"));
  }
  if (!shortcut$1.containerEl) {
    const $style = createStyle$(__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f"));
    $df.appendChild($style);
  }
  __classPrivateFieldSet(this, _WochitEmbeddedApp_$spinner, createSpinner$(), "f");
  $df.appendChild(__classPrivateFieldGet(this, _WochitEmbeddedApp_$spinner, "f"));
  const src = `${shortcut$1.envUrl}?t=${Date.now().toString(36)}`;
  __classPrivateFieldSet(this, _WochitEmbeddedApp_$iframe, createIframe$(__classPrivateFieldGet(this, _WochitEmbeddedApp_uuid, "f"), src), "f");
  $df.appendChild(__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f"));
  $container.appendChild($df);
  if (!shortcut$1.containerEl) {
    document.body.appendChild($container);
  }
  document.body.classList.add(BODY_WHEN_MOUNTED_CLASS);
}, _WochitEmbeddedApp_unmountSpinner = function _WochitEmbeddedApp_unmountSpinner2() {
  var _a;
  (_a = __classPrivateFieldGet(this, _WochitEmbeddedApp_$spinner, "f")) == null ? void 0 : _a.remove();
}, _WochitEmbeddedApp_isRelevantMessage = function _WochitEmbeddedApp_isRelevantMessage2(e) {
  const originUrl = new URL(e.origin);
  return originUrl.hostname.endsWith(WOCHIT_DOMAIN_MASK) && hasObject(common$1) && hasObject(shortcut$1) && __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f") !== null;
}, _WochitEmbeddedApp_onMessage = function _WochitEmbeddedApp_onMessage2(e) {
  this.log("#onMessage", e.data);
  if (e.data === INCOMING_MESSAGE.SHORTCUT_LOADED) {
    __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onShortcutLoaded).call(this);
  } else if (e.data === INCOMING_MESSAGE.STUDIO_LOADED) {
    __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onStudioLoaded).call(this);
  } else if (e.data && typeof e.data === "object") {
    if (e.data.type === INCOMING_MESSAGE.APPLICATION_EVENT && typeof e.data.type === "string") {
      __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_onShortcutApplicationEvent).call(this, e);
    }
  }
}, _WochitEmbeddedApp_onShortcutLoaded = function _WochitEmbeddedApp_onShortcutLoaded2() {
  if (!__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f") || !__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f").contentWindow) {
    return;
  }
  shortcut$1.on.loaded(__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f"));
  __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f").contentWindow.postMessage(__spreadValues({
    cmd: OUTGOING_MESSAGE.SHORTCUT_OPTIONS,
    version: "0.0.0",
    JWT: shortcut$1.userToken
  }, JSON.parse(JSON.stringify(__spreadValues(__spreadValues({}, common$1), shortcut$1)))), shortcut$1.envUrl);
  __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_unmountSpinner).call(this);
}, _WochitEmbeddedApp_onStudioLoaded = function _WochitEmbeddedApp_onStudioLoaded2() {
  if (!__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f") || !__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f").contentWindow) {
    return;
  }
  shortcut$1.on.loaded(__classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f"));
  __classPrivateFieldGet(this, _WochitEmbeddedApp_$iframe, "f").contentWindow.postMessage(__spreadValues({
    cmd: OUTGOING_MESSAGE.STUDIO_OPTIONS,
    version: "0.0.0",
    JWT: shortcut$1.userToken,
    isReEditing: !!(shortcut$1 == null ? void 0 : shortcut$1.videoId)
  }, JSON.parse(JSON.stringify(__spreadValues(__spreadValues({}, common$1), shortcut$1)))), "*");
  __classPrivateFieldGet(this, _WochitEmbeddedApp_instances, "m", _WochitEmbeddedApp_unmountSpinner).call(this);
}, _WochitEmbeddedApp_onShortcutApplicationEvent = function _WochitEmbeddedApp_onShortcutApplicationEvent2(e) {
  const eventName = e.data.event.toLowerCase();
  this.log("#onShortcutApplicationEvent", eventName, e.data.payload);
  const callback = shortcut$1.on[eventName];
  if (typeof callback === "function") {
    callback(e.data.payload);
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
  } else if (!hasString(options.userToken) && options.skipLogin !== true) {
    logError("calling config() without userToken");
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
  try {
    new URL(shortcut.envUrl);
  } catch (xcp) {
    logError(`calling openShortcut() with invalid envUrl: "${options == null ? void 0 : options.envUrl}"`);
    return;
  }
  app.log("openShortcut", shortcut);
  app.setContext(common, shortcut);
  app.openShortcut();
}
var module = {
  config,
  openShortcut
};
export { config, module as default, openShortcut };
