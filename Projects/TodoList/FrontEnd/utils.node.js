const path = require('node:path');
const dotenv = require('dotenv');
const logNode = require('log-node');
const log = require('log');

const { onceCallback } = require('./utils.js');
const root = __dirname;

/** @param {string[]} paths */
function joinWithRoot(...paths) {
  return path.normalize(path.join(root, ...paths));
}

const dotenvPathApp = joinWithRoot('../.env');
const dotenvPath = joinWithRoot('.env');

const useDotenv = onceCallback(() => {
  dotenv.config({ path: dotenvPathApp });
  dotenv.config({
    path: dotenvPath,
    override: !(process.env['DOTENV_APP_OVERRIDE']?.toLowerCase() === 'true')
  });
})

function createLogger() {
  process.env['LOG_LEVEL'] = process.env['DEBUG'] ? 'debug' : 'info';
  const level = process.env['LOG_LEVEL'];
  const writter = logNode();
  return {
    level,
    writter,
    log
  }
}

const useLogger = onceCallback(createLogger);

module.exports = {
  root,
  joinWithRoot,
  onceCallback,
  dotenvPathApp,
  dotenvPath,
  useDotenv,
  createLogger,
  useLogger
}
