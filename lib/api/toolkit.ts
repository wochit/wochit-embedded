import { LOGGER_PREFIX } from '../model/const';

export function noop() {
  // no operation
}

export function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined;
}

export function hasHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

export function hasBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}

export function hasString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

export function hasNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function hasArray(value: unknown): value is [] {
  return value instanceof Array && value.length > 0;
}

export function hasObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function logError(error: unknown) {
  if (typeof window.reportError === 'function') {
    if (hasString(error)) {
      window.reportError(new Error(`${LOGGER_PREFIX} ${error}`));
    } else {
      window.reportError(error);
    }
  } else {
    console?.error(LOGGER_PREFIX, error);
  }
}

export function uuid(): string {
  return crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
}

export function normalizeSpace(str: string): string {
  return str.trim().replace(/\s+/gm, ' ');
}
