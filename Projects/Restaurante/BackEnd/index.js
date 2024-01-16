import * as appLib from './app.js';
import * as appConfigLib from './app.config.js';
import * as routersLib from './routers/index.js';
import * as defaultBackEndLib from './default.js';
import databaseLib from './database.js';
import utilsLib from './utils.js';
import runBackEndLib from './run.js';

export const app = appLib;
export const appConfig = appConfigLib;
export const routers = routersLib;
export const defaultBackEnd = defaultBackEndLib;
export const database = databaseLib;
export const utils = utilsLib;
export const runBackEnd = runBackEndLib;

export default {
  app,
  appConfig,
  routers,
  database,
  defaultBackEnd,
  utils,
  runBackEnd
}
