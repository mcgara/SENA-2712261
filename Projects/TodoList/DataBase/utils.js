import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import logNode from 'log-node';
import log from 'log';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const root = __dirname;

/** @param {string[]} paths */
export function joinWithRoot(...paths) {
  return path.normalize(path.join(root, ...paths));
}

/**
 * @template {(...args: any) => any} T
 * @param {T} callback
 * @return {T}
 */
export function onceCallback(callback) {
  if (typeof callback !== 'function') throw TypeError('parameter callback must be type function');
  let value;
  let onceCall = false;
  return (...args) => {
    if (!onceCall) {
      value = callback(...args);
      onceCall = true;
    }
    return value;
  }
}

export const dotenvPathApp = joinWithRoot('../.env');
export const dotenvPath = joinWithRoot('.env');

export const useDotenv = onceCallback(() => {
  dotenv.config({ path: dotenvPathApp });
  dotenv.config({
    path: dotenvPath,
    override: !(process.env['DOTENV_APP_OVERRIDE']?.toLowerCase() === 'true')
  });
})

export function createLogger() {
  process.env['LOG_LEVEL'] = process.env['DEBUG'] ? 'debug' : 'info';
  const level = process.env['LOG_LEVEL'];
  const writter = logNode();
  return {
    level,
    writter,
    log
  }
}

export const useLogger = onceCallback(createLogger);

export default {
  root,
  joinWithRoot,
  onceCallback,
  dotenvPathApp,
  dotenvPath,
  useDotenv,
  createLogger,
  useLogger
}
