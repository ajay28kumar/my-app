/* global window */
import createLogger from './createLogger';
import standardErrors from './standardErrors';

const currentDomainName = () => {
  const temp = window.location.hostname.split(':')[0].split('.').reverse();
  return `.${temp[1]}.${temp[0]}`;
};

const myDomain = currentDomainName();

const errorFor = ({code, message}) => ({
  code: code || message,
  message: standardErrors[code] || standardErrors[message] || message,
});

const httpResponse = (status, data) => {
  if (status >= 300 || status < 200) {
    return {response: {status, data}};
  }
  return {status, data, statusText: 'OK'};
};


/* eslint default-case: 0, no-prototype-builtins: 0 */
const createCookie = (sKey, sValue, vEnd, sPath = '/', sDomain = myDomain, bSecure = false) => {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/.test(sKey)) {
    return;
  }
  let sExpires = '';
  if (vEnd) {
    switch (typeof vEnd) {
      case 'number':
        sExpires = `; max-age=${vEnd}`;
        break;
      case 'string':
        sExpires = `; expires=${vEnd}`;
        break;
      case 'object':
        if (vEnd.hasOwnProperty('toGMTString')) {
          sExpires = `; expires=${vEnd.toGMTString()}`;
        }
        break;
    }
  }
  document.cookie = `${escape(sKey)}=${escape(sValue)}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath
    ? `; path=${sPath}`
    : ''}${bSecure ? '; secure' : ''}`;
};

const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${currentDomainName()};path=/`;
  }
};


export {
  errorFor,
  createCookie,
  deleteAllCookies,
  httpResponse,
  createLogger,
};
