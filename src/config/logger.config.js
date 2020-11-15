const chalk = require("chalk");
const { error, warning, info } = require("../constants/logger.colors");
const log = console.log;

class logger {
  constructor() {}
  error(message) {
    log(error(message));
  }
  warn(message) {
    log(warning(message));
  }
  inform(message) {
    log(info(message));
  }
}

module.exports = new logger();
