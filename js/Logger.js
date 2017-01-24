const createLoggerLevel = (level, prefix) => {
  return (...args) => {
    console[level].apply(console, [`[${prefix}]`, ...args]);
  };
};

const createLogger = prefix => {
  return {
    info: createLoggerLevel('info', prefix),
    warn: createLoggerLevel('warn', prefix),
    error: createLoggerLevel('error', prefix)
  };
};

export default createLogger;
