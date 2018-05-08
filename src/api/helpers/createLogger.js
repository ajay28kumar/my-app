import logger from '../../logger';

const bootTime = new Date();

export default (t, method, path) => ({
  info: (...args) =>
    logger.debug(
      `%c [I] ${Math.round((t - bootTime) / 100) / 10} -- ${method.toUpperCase()} ${path} -- ${Math.round(new Date() - t) / 1000}s --`,
      'color: blue; font-weight: bold; background-color: #eee; ',
      ...args,
    ),
  debug: (...args) =>
    logger.debug(
      `%c [D] ${Math.round((t - bootTime) / 100) / 10} -- ${method.toUpperCase()} ${path} -- ${Math.round(new Date() - t) / 1000}s --`,
      'color: blue; font-weight: normal; ',
      ...args,
    ),
});
