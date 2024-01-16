import * as modelsLib from './models/index.js';
import * as connectionLib from './connection.js';
import * as connectionConfigLib from './connection.config.js';
import * as defaultDataBaseLib from './default.js';
import utilsLib from './utils.js';
import runDataBaseLib from './run.js';

export const models = modelsLib;
export const connection = connectionLib;
export const connectionConfig = connectionConfigLib;
export const defaultDataBase = defaultDataBaseLib;
export const utils = utilsLib;
export const runDataBase = runDataBaseLib;

export default {
  connection,
  connectionConfig,
  models,
  defaultDataBase,
  utils,
  runDataBase
}
