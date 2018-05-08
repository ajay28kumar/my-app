import { httpResponse, errorFor } from '../helpers';

export default (reject, logger) => error => {
  if (error && error.response) {
    const { status, data } = error.response;
    const st = status && status >= 400 ? status : 400;
    if (status && data && data.error && data.error.message) {
      logger.info('(response)', st);
      reject(httpResponse(st, errorFor(data.error)));
    } else {
      logger.info('(response)', st);
      reject(httpResponse(st, error));
    }
  } else if (error.config && error.config.url) {
    reject(error);
  } else {
    Promise.reject(error);
    reject(httpResponse(500, error));
  }
  return true;
};
