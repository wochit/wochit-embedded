import wtModule from './module';

declare global {
  interface Window {
    wt: any;
  }
}

export default (function wochitSnippet() {
  console.log(
    'wochit-snippet',
    __APP_VERSION__,
    window.wt,
    wtModule.config(),
    wtModule.openShortcut()
  );
  return void 0;
})();
