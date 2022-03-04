const colors = {
  red: '\x1b[31m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
  cyan: '\x1b[36m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m'
};

const LCERROR = colors.red;
const LCWARN = colors.yellow;
const LCINFO = colors.cyan;
const LCSUCCESS = colors.green;

class Logger {
  static error(message, ...optionalParams) {
    console.error(LCERROR, message, ...optionalParams);
  }
  static warn(message, ...optionalParams) {
    console.warn(LCWARN, message, ...optionalParams);
  }
  static info(message, ...optionalParams) {
    console.info(LCINFO, message, ...optionalParams);
  }
  static success(message, ...optionalParams) {
    console.info(LCSUCCESS, message, ...optionalParams);
  }
};

export default Logger;
