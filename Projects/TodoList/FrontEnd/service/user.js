import { api, routes } from './api'

/** @typedef {import('./types').User} User */

/**
 * @param {number | string} id
 * @return {Promise<User | null>}
 */
export const getUserById = async (id) => {
  if (!api) return null
  let user = null
  try { user = (await api.get(routes.user.get(id))).data }
  catch (err) { console.error(err) }
  return user
}

export default {
  getById: getUserById
}
