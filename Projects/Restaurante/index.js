import * as databaseLib from './DataBase/index.js';
import * as backendLib from './BackEnd/index.js';
import * as frontendLib from './FrontEnd/index.js';
import * as runAppLib from './run.js';

export const database = databaseLib;
export const backend = backendLib;
export const frontend = frontendLib;
export const runApp = runAppLib;

export default {
  database,
  backend,
  frontend,
  runApp
}
