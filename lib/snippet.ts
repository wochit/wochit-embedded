import wt from './module';

declare global {
  interface Window {
    wt: any;
  }
}

function wochitSnippet() {
  wt.config({ channelId: '1' });
  wt.openVideoCreator({});

  console.log('wochit-snippet', __APP_VERSION__, window.wt);
}

wochitSnippet();