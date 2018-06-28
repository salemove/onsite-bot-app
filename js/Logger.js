const createLoggerLevel = (level, prefix) => {
  return (...args) => {
    const prefixedArgs = [`[${prefix}]`, ...args];
    console[level].apply(console, prefixedArgs);
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
