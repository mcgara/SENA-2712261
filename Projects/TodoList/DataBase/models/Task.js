import { useLogger } from '../utils.js';
const logger = useLogger();

/**
 * @typedef {import('./Task').Task} ITask
 * @typedef {import('./models.js').ModelsConnection} ModelsConnection
 */

/**
 * @param {ModelsConnection} connection
 * @param {number} id
 */
export async function TaskFindById(connection, id) {
  const db = await connection;
  if (!db) return null;

  /** @type {ITask | null} */
  let Task = null;
  const query = 'SELECT * FROM task WHERE task.id = ?';

  try {
    const result = await db.query(query, [id]);
    if (result[0].length > 0) Task = result[0][0];
  } catch (err) {
    logger.log.error('DATABASE: ', err.message);
  }
  return Task;
}

/** @param {ModelsConnection} connection */
export function useTaskModel(connection) {
  return {
    findById: id => TaskFindById(connection, id)
  }
}

export default useTaskModel;
