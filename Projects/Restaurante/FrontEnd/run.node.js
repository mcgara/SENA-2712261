import { spawn } from 'node:child_process';
import { root, logger } from './utils.node.js';

export const expoPrefixEnv = 'EXPO_PUBLIC';
export const expoURLEnv = 'EXPO_PACKAGER_PROXY_URL';

/**
 * @typedef {import('./app.config.node').AppConfig} AppConfig
 * @typedef {import('./app.config.node').AppConfigApi} AppConfigApi
 * @typedef {typeof expoPrefixEnv} ExpoPrefixEnv
 * @typedef {typeof expoURLEnv} ExpoURLEnv
 */

export const appCommand = `npx expo start`;

/** @type {import('node:child_process').SpawnOptions} */
export const appCommandOptions = {
  stdio: 'inherit', // interactive expo commands stdin
  shell: true,
  cwd: root
}

/** @param {AppConfig} config */
export function appArgv(config) {
  /** @type {string[]} */
  const argv = process.argv.slice(2);
  argv.push('--port', String(config.port));
  if (config.https) argv.push('--https');
  if (config.localhost) argv.push('--localhost');
  if (config.offline) argv.push('--offline');

  return argv;
}

/**
 * @param {string[]} argv
 * @param {AppConfig} config
 * @param {AppConfigApi} configApi
 */
export function runFrontEnd(argv, config, configApi) {
  // Set URL on running Expo App
  const isExpoURL = !!process.env[expoURLEnv];
  if (!isExpoURL) process.env[expoURLEnv] = config.url;

  // Set Api config
  for (const [ENV_API, ENV_API_VALUE] of Object.entries(configApi)) {
    const ENV_EXPO_API = `${expoPrefixEnv}_${ENV_API}`;
    process.env[ENV_EXPO_API] = ENV_API_VALUE;
  }

  const app = spawn(appCommand, argv ?? [], appCommandOptions);
  app.on('error', err => {
    logger.log.error('FRONTEND %s:' + err.message, err.name)
  });
  return app;
}

export default {
  expoPrefixEnv,
  expoURLEnv,
  appCommand,
  appCommandOptions,
  appArgv,
  frontend: runFrontEnd
}
