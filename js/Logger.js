import prepend from 'ramda/src/prepend';
import append from 'ramda/src/append';
import urlParam from './UrlParam';

const nullLogger = {
  info: () => {},
  warn: () => {},
  error: () => {}
};

function createLoggerLevel(level, prefixes, systemLogger) {
  return (...args) => {
    const argsWithPrefix = prepend(`[${prefixes.join(', ')}]`, args);
    systemLogger[level].apply(systemLogger, argsWithPrefix);
  };
}

function getSystemLogger() {
  if (typeof window !== 'undefined')
    return window.sm && window.sm.logger || window.console || nullLogger;

  return nullLogger;
}

/**
 * @return {function} a promise logger
 * @param {function} logger regular logger
 *
 * @example
 *   const p = Promise.resolve('All good');
 *   p.then(logger.promise.info('Msg from promise:'));
 */
function promiseLogger(logger) {
  return (...msgs) => promiseMsg =>
    promiseMsg ?
      logger.apply(null, append(promiseMsg, msgs)) :
      logger.apply(null, msgs);
}

export default function createLogger(prefix) {
  const actorPrefix = urlParam('actor');
  const prefixes = actorPrefix ? [actorPrefix, prefix] : [prefix];
  const systemLogger = getSystemLogger();
  const info = createLoggerLevel('info', prefixes, systemLogger);
  const warn = createLoggerLevel('warn', prefixes, systemLogger);
  const error = createLoggerLevel('error', prefixes, systemLogger);

  return {
    info: info,
    warn: warn,
    error: error,
    promise: {
      info: promiseLogger(info),
      warn: promiseLogger(warn),
      error: promiseLogger(error)
    }
  };
}
