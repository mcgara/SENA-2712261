import { logger } from './utils.js';

/** @param {import('./common.js').Connection} connection */
export async function runDataBase (connection) {
  try {
    await connection.connect();
    logger.log.notice('%s', 'DATABASE: successful connection.');
  } catch (err) {
    logger.log.error('DATABASE: ', 'error CONNECT to database failed.\n\ntraceback: ' + err);
    throw err; // Exit service
  }

  return connection;
}

export default runDataBase;
