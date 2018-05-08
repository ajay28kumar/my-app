const isIE = navigator.appName === 'Microsoft Internet Explorer';
let console2;
if (!isIE) {
  const isChrome = () => {
    const isChromium = window.chrome;
    const winNav = window.navigator;
    const vendorName = winNav.vendor;
    const isOpera = winNav.userAgent.indexOf('OPR') > -1;
    const isIEedge = winNav.userAgent.indexOf('Edge') > -1;

    if (isIE || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/))) {
      return false;
    }

    return isChromium !== null && isChromium !== undefined && vendorName === 'Google Inc.' && !isOpera && !isIEedge;
  };
  console2 =
    isChrome() || window.useTestConsole
      ? window.console
      : {
          log: window.console.log.bind(window.console),
          info: window.console.info.bind(window.console),
          debug: window.console.log.bind(window.console),
          error: window.console.error.bind(window.console),
          warn: window.console.error.bind(window.console),
        };
} else {
  console2 = {
    log() {},
    info() {},
    debug() {},
    error() {},
    warn() {},
  };
}

const console3 = console2;
export default console3;
