function config() {
  console.log("config");
  return "config";
}
function openShortcut() {
  console.log("openShortcut");
  return "openShortcut";
}
var module = {
  config,
  openShortcut
};
export { config, module as default, openShortcut };
