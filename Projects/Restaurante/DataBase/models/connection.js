import { readFile } from 'node:fs/promises';
import { joinWithRoot, logger } from '../utils.js';

/** @typedef {import('../common').Connection} Connection */

export const FilePath = joinWithRoot('models/models.sql');
export const File = readFile(FilePath, { encoding: 'utf-8' });

/** @param {Promise<Connection>} connection */
export async function createModelConnection(connection) {
  /** @type {string | null} */
  let script = null;

  try {
    script = await File;
  } catch (err) {
    logger.log.error('DATABASE: ', err.message ?? 'error on load models file.');
  }
  
  if (!script) return connection;
  
  try {
    const queries = script.trim().split(';').map(query => query.trim());
    const modelsConnection = await connection;
    for (const query of queries) {
      if (!query) continue;
      await modelsConnection.query(query);
    }
    logger.log.notice('%s: successful queries of models file.', 'DATABASE');
  } catch (err) {
    logger.log.error(`DATABASE: ', '${err.message ?? 'error execute models file.'}`, err.code ?? '');
  }

  return connection;
}

export default createModelConnection;

/** @typedef {ReturnType<typeof createModelConnection>} ModelConnection */
