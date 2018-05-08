/* eslint camelcase: 0 */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern":  "^_" }] */
import {httpResponse} from '../helpers';

const notFound = (logger, _method, _path) => {
  logger.info('(response)', 404);
  return Promise.reject(httpResponse(404, {code: 'E_404', message: 'No such service.'}));
};

export default {
  notFound,
};
