import { URL } from 'node:url';
import useApp from './app.js';
import useAppConfig from './app.config.js';
import { onceCallback, useDotenv, useLogger } from './utils.js';
import { useDataBase } from './database.js';

export const useBackEnd = onceCallback(async () => {
  await useDataBase();
  useDotenv();
  const logger = useLogger();

  const app = await useApp();
  const config = useAppConfig();
  let url = new URL(`http://${config.host}:${config.port}`);
  app.listen(config.port, config.host, () => {
    logger.log.notice('%s: server listen on ' + url.href, 'BACKEND')
  });

  return app;
});

export default {
  useBackEnd
}
