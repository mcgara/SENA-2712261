const { spawn } = require('node:child_process');
const { URL } = require('node:url');
const { useDotenv, onceCallback, useLogger } = require('./utils.node.js');

const commandFrontEnd = 'npx expo start';
const ExpoPrefixEnv = 'EXPO_PUBLIC';
const ExpoURLEnv = 'EXPO_PACKAGER_PROXY_URL';

/** @type {import('node:child_process').SpawnOptions} */
const frontEndSpawnOptions = {
  stdio: 'inherit', // interactive expo commands stdin
  shell: true
}

const defaultConfig = {
  host: '127.0.0.1',
  port: 8020,
  https: false,
  url: 'http://127.0.0.1:8020',
  localhost: false,
  offline: false,
  debug: false
}

const defaultConfigApi = {
  API_HOST: '127.0.0.1',
  API_PORT: 8010,
  API_HTTPS: false,
  API_URL: 'http://127.0.0.1:8010'
}

const useFrontEndConfig = onceCallback(() => {
  useDotenv();
  
  const environ = {
    host: process.env['FE_HOST'],
    port: process.env['FE_PORT'],
    url: process.env['FE_URL'],
    https: process.env['FE_HTTPS'],
    localhost: process.env['FE_LOCALHOST'],
    offline: process.env['FE_OFFLINE'],
    debug: process.env['FE_DEBUG']
  }

  const config = { ...defaultConfig }
  const realEnviron = Object.entries(environ).filter(item => !!item[1]);
  for (const [key, value] of realEnviron) config[key] = value;
  
  config.https = String(config.https) === 'true';
  config.localhost = String(config.localhost) === 'true';
  config.offline = String(config.offline) === 'true'
  config.debug = String(config.debug) === 'true';
  config.port = Number(config.port);
  if (isNaN(config.port)) config.port = defaultConfig.port;
  
  let url = null
  try { url = new URL(config.url); }
  catch { url = new URL(defaultConfig.url); }
  url.hostname = config.host;
  url.port = String(config.port);
  url.protocol = config.https ? 'https' : 'http';
  config.url = url.href;

  return config;
})

const useApiConfig = onceCallback(() => {
  useDotenv();

  const environ = {
    API_HOST: process.env['BE_HOST'],
    API_PORT: process.env['BE_PORT'],
    API_HTTPS: process.env['BE_HTTPS'],
    API_URL: process.env['BE_URL']
  }

  const config = { ...defaultConfigApi }
  const realEnviron = Object.entries(environ).filter(item => !!item[1]);
  for (const [key, value] of realEnviron) config[key] = value;

  config.API_PORT = Number(config.API_PORT);
  if (isNaN(config.API_PORT)) config.API_PORT = defaultConfig.API_PORT;
  config.API_HTTPS = String(config.API_HTTPS) === 'true';

  let url = null
  try { url = new URL(config.API_URL); }
  catch { url = new URL(defaultConfigApi.API_URL); }
  url.hostname = config.API_HOST;
  url.port = String(config.API_PORT);
  url.protocol = config.API_HTTPS ? 'https' : 'http';
  config.API_URL = url.href;

  return config;
})

const useFrontEndArgv = onceCallback(() => {
  const config = useFrontEndConfig();
  
  /** @type {string[]} */
  const argv = [];
  argv.push('--port', String(config.port));
  if (config.https) argv.push('--https');
  if (config.localhost) argv.push('--localhost');
  if (config.offline) argv.push('--offline');

  return argv
})

const useFrontEnd = onceCallback(() => {
  const logger = useLogger();
  const config = useFrontEndConfig();
  const argv = process.argv.slice(2);
  argv.push(...useFrontEndArgv());
  const configApi = useApiConfig();

  // Set URL on running Expo App
  const isExpoURL = !!process.env[ExpoURLEnv];
  if (!isExpoURL) process.env[ExpoURLEnv] = config.url;

  // Set Api config
  for (const [ENV_API, ENV_API_VALUE] of Object.entries(configApi)) {
    const ENV_EXPO_API = `${ExpoPrefixEnv}_${ENV_API}`;
    process.env[ENV_EXPO_API] = ENV_API_VALUE;
  }

  const app = spawn(commandFrontEnd, argv, frontEndSpawnOptions);
  app.on('error', err => logger.error('FrontEnd %s:' + err.message, err.name));
  return app
})

module.exports = {
  commandFrontEnd,
  frontEndSpawnOptions,
  ExpoPrefixEnv,
  ExpoURLEnv,
  defaultConfig,
  defaultConfigApi,
  useFrontEndConfig,
  useFrontEndArgv,
  useApiConfig,
  useFrontEnd
}
