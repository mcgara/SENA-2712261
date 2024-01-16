import * as appConfigLib from './app.config.node.js';
import * as runFrontEndLib from './run.node.js';
import * as defaultFrontEndLib from './default.node.js';
import utilsLib from './utils.js'
import utilsNodeLib from './utils.node.js'

export const appConfig = appConfigLib;
export const runFrontEnd = runFrontEndLib;
export const defaultFrontEnd = defaultFrontEndLib;
export const utils = utilsLib;
export const utilsNode = utilsNodeLib;

export default {
  appConfig,
  runFrontEnd,
  defaultFrontEnd,
  utils,
  utilsNode
}
