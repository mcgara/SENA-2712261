import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { utils } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const root = __dirname;

/** @param {string[]} paths */
export function joinWithRoot(...paths) {
  return path.normalize(path.join(root, ...paths));
}

export const dotenvPathApp = joinWithRoot('../.env');
export const dotenvPath = joinWithRoot('.env');

export const onceCallback = utils.onceCallback;
export const useLogger = utils.useLogger;

export const useDotenv = onceCallback(() => {
  dotenv.config({ path: dotenvPathApp });
  dotenv.config({
    path: dotenvPath,
    override: !(process.env['DOTENV_APP_OVERRIDE']?.toLowerCase() === 'true')
  });
})

export default {
  root,
  joinWithRoot,
  onceCallback,
  dotenvPathApp,
  dotenvPath,
  useDotenv,
  useLogger
}
