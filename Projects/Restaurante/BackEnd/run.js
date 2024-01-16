import { URL } from 'node:url';
import { logger } from './utils.js';

/**
 * @param {import('express').Express} app
 * @param {import('./app.config').AppConfig} config
 */
export function runBackEnd(app, config) {
  let url = new URL(`http://${config.host}:${config.port}`);
  app.listen(config.port, config.host, () => {
    logger.log.notice('%s: server listen on ' + url.href, 'BACKEND')
  });

  return app;
}

export default runBackEnd
