import { api, routes } from './api'

/** @typedef {import('./types').Task} Task */

/**
 * @param {number | string} id
 * @return {Promise<Task | null>}
 */
export const getTaskById = async (id) => {
  if (!api) return null
  let task = null
  try { task = (await api.get(routes.task.get(id))).data }
  catch (err) { console.error(err) }
  return task
}

export default {
  getById: getTaskById
}
