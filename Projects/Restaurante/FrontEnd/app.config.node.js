import { URL } from 'node:url';

export const defaultAppConfig = {
  host: '127.0.0.1',
  port: 8020,
  https: false,
  url: 'http://127.0.0.1:8020',
  localhost: false,
  offline: false,
  debug: false
}

export const defaultAppConfigApi = {
  API_HOST: '127.0.0.1',
  API_PORT: 8010,
  API_HTTPS: false,
  API_URL: 'http://127.0.0.1:8010'
}

/**
 * @typedef {typeof defaultAppConfig} AppConfig
 * @typedef {typeof defaultAppConfigApi} AppConfigApi
 */

export function appConfig() {
  const environ = {
    host: process.env['FE_HOST'],
    port: process.env['FE_PORT'],
    url: process.env['FE_URL'],
    https: process.env['FE_HTTPS'],
    localhost: process.env['FE_LOCALHOST'],
    offline: process.env['FE_OFFLINE'],
    debug: process.env['FE_DEBUG']
  }

  const config = { ...defaultAppConfig }
  const realEnviron = Object.entries(environ).filter(item => !!item[1]);
  for (const [key, value] of realEnviron) config[key] = value;
  
  config.https = String(config.https) === 'true';
  config.localhost = String(config.localhost) === 'true';
  config.offline = String(config.offline) === 'true'
  config.debug = String(config.debug) === 'true';
  config.port = Number(config.port);
  if (isNaN(config.port)) config.port = defaultAppConfig.port;
  
  let url = null
  try { url = new URL(config.url); }
  catch { url = new URL(defaultAppConfig.url); }
  url.hostname = config.host;
  url.port = String(config.port);
  url.protocol = config.https ? 'https' : 'http';
  config.url = url.href;

  return config;
}

export function appConfigApi() {
  const environ = {
    API_HOST: process.env['BE_HOST'],
    API_PORT: process.env['BE_PORT'],
    API_HTTPS: process.env['BE_HTTPS'],
    API_URL: process.env['BE_URL']
  }

  const config = { ...defaultAppConfigApi }
  const realEnviron = Object.entries(environ).filter(item => !!item[1]);
  for (const [key, value] of realEnviron) config[key] = value;

  config.API_PORT = Number(config.API_PORT);
  if (isNaN(config.API_PORT)) config.API_PORT = defaultAppConfig.API_PORT;
  config.API_HTTPS = String(config.API_HTTPS) === 'true';

  let url = null
  try { url = new URL(config.API_URL); }
  catch { url = new URL(defaultAppConfigApi.API_URL); }
  url.hostname = config.API_HOST;
  url.port = String(config.API_PORT);
  url.protocol = config.API_HTTPS ? 'https' : 'http';
  config.API_URL = url.href;

  return config;
}

export default {
  defaultAppConfig,
  defaultAppConfigApi,
  appConfig,
  appConfigApi
}
