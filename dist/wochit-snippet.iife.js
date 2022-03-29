var __wt = function() {
  "use strict";
  function config() {
    console.log("config");
    return "config";
  }
  function openShortcut() {
    console.log("openShortcut");
    return "openShortcut";
  }
  var wtModule = {
    config,
    openShortcut
  };
  var snippet = function wochitSnippet() {
    console.log("wochit-snippet", "0.0.0", window.wt, wtModule.config(), wtModule.openShortcut());
    return void 0;
  }();
  return snippet;
}();
