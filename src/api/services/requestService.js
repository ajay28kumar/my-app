import {httpResponse} from '../helpers';
import server from '../server';
import errorService from './errorService';

export default (logger, query, auth, request, decorator, errorDecorator, configOverrides = {}) =>
  new Promise((resolve, reject) => {
    server({
      ...request
    })
      .then(response => {
        if (response.status === 200) {
          const err = errorDecorator && errorDecorator(response.data);
          if (err) {
            reject(httpResponse(400, {message: err.message || err.code}));
          } else {
            const data = decorator(response.data);
            logger.info('(response)', 200);
            resolve(httpResponse(200, data));
          }
        } else {
          const error = `${response.message || `Something went wrong (${response.status}).  Our tech team is looking into it.`}`;
          logger.info('(response)', 400);
          reject(
            httpResponse(400, {
              message: error,
            }),
          );
        }
      })
      .catch(errorService(reject, logger));
  });
