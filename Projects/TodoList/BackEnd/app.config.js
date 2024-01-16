import { onceCallback } from './utils.js';

export const defaultAppConfig = {
  host: 'localhost',
  port: 8010,
  debug: false,
  backlog: null
}

const useAppConfig = onceCallback(() => {
  let port = parseInt(process.env['BE_PORT']);
  if (isNaN(port)) port = null;

  let backlog = parseInt(process.env['BE_BACKLOG']);
  if (isNaN(backlog)) backlog = null;

  let appConfigEnv = {
    debug: process.env['BE_DEBUG'] === 'true',
    host: process.env['BE_HOST'] ?? '',
    port,
    backlog
  }
  
  appConfigEnv = Object.fromEntries(
    Object.entries(appConfigEnv)
      .reduce((p, c) => c[1] ? [...p, c] : p, [])
  );
  
  const appConfig = {
    ...defaultAppConfig,
    ...appConfigEnv
  }

    return appConfig;
})

export default useAppConfig;
