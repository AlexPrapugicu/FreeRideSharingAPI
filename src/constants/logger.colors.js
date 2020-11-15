const chalk = require("chalk");

const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const info = chalk.keyword("purple");

module.exports = { error, warning, info };
