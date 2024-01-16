import mysql from 'mysql2/promise.js';
import { logger } from './utils.js';

/** @param {string | import('./common').ConnectionConfig} config */
export function createConnection(config) {
  const connection = mysql.createConnection(config);
  connection.catch(err => {
    logger.log.error('DATABASE:', err.message ?? 'error create connection in MySQL database.');
  });
  
  return connection;
}

export default createConnection;
