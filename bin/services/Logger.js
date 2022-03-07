// @ts-check
class Logger {
  static colors = {
    red: '\x1b[31m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
  };

  static error(message, ...optionalParams) {
    console.error(Logger.colors.red, message, ...optionalParams);
  }

  static warn(message, ...optionalParams) {
    console.warn(Logger.colors.yellow, message, ...optionalParams);
  }

  static info(message, ...optionalParams) {
    console.info(Logger.colors.cyan, message, ...optionalParams);
  }

  static success(message, ...optionalParams) {
    console.info(Logger.colors.green, message, ...optionalParams);
  }

  static log(message, ...optionalParams) {
    console.log(message, ...optionalParams);
  }
}

export default Logger;
