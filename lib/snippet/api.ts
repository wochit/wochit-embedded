import wtModule from '../module';
import { hasString, logError } from '../api/toolkit';
import { OBJECT_NAME_STASH } from './const';

declare global {
  interface Window {
    [OBJECT_NAME_STASH]: string;
    [key: string]: any;
  }
}
type TWtModuleKey = typeof wtModule[keyof typeof wtModule];
type TWtModule = { [k: string]: TWtModuleKey };
type TQueTuple = [fnName: string, ...args: unknown[]];
interface ICallbackQue {
  q?: TQueTuple[];
  initialized?: boolean;
}
type TProxyFunction = (fnName: string, ...args: unknown[]) => void;
export type TApi = ICallbackQue & TProxyFunction;

export function scanQue(que: TQueTuple[]) {
  for (let i = 0, I = que.length; i < I; i++) {
    const [fnName, ...args] = que[i];
    proxyFunction(fnName, ...args);
  }
}

export function initProxy(apiName: string) {
  window[apiName] = proxyFunction;
  window[apiName].initialized = true;
}

function proxyFunction(fnName: string, ...args: unknown[]) {
  if (hasString(fnName)) {
    const moduleFunction = (wtModule as TWtModule)[fnName];

    if (typeof moduleFunction === 'function') {
      // @ts-ignore
      moduleFunction(...args);
    } else {
      logError(`'${fnName}' not implemented`);
    }
  } else {
    logError('expected first argument to be a function name');
  }
}
