import models, { useModelsConnection } from './models/index.js';
import utils, { onceCallback, useDotenv, useLogger } from './utils.js';

export const useDataBase = onceCallback(async () => {
  useDotenv();
  const logger = useLogger();

  const connection = await useModelsConnection();
  if (connection) {
    await connection.connect();
    logger.log.notice('%s', 'DATABASE: successful connection.');
  } else {
    logger.log.error('DATABASE: ', 'error CONNECT to database failed.');
  }

  return connection;
})

export default {
  ...models,
  utils,
  useDataBase
}
