/**
 * @typedef {import('axios').AxiosInstance | null} Api
 * @typedef {import('./types').ApiRoutes} ApiRoutes
 * @typedef {import('./types').IApiRoutesData} IApiRoutesData
 */

/**
 * @template {ApiRoutes} T
 * @param {Api} api
 * @param {T} route
 * @param {Partial<IApiRoutesData[T]>} [fields]
 * @return {Promise<IApiRoutesData[T][] | null>}
 */
export async function find(api, route, fields) {
  if (!api) return null
  let response = null
  try { response = (await api.get(route, { params: fields })).data }
  catch {}
  return response
}

/**
 * @template {ApiRoutes} T
 * @param {Api} api
 * @param {T} route
 * @param {IApiRoutesData[T]['id']} id
 * @return {Promise<IApiRoutesData[T] | null>}
 */
export async function findById(api, route, id) {
  if (!api) return null
  let response = null
  try { response = (await api.get(route + `/${id}`)).data }
  catch {}
  return response
}

/**
 * @template {ApiRoutes} T
 * @param {Api} api
 * @param {T} route
 * @param {IApiRoutesData[T]} fields
 * @return {Promise<any | null>}
 */
export async function create(api, route, fields) {
  if (!api) return null
  let response = null
  try { response = (await api.post(route, fields)).data }
  catch {}
  return response
}

/** @template {ApiRoutes} T */
export class CommonRoute {
  /**
   * @param {Api} api
   * @param {T} route
   */
  constructor(api, route) {
    this.api = api
    this.route = route
  }

  /** @param {Partial<IApiRoutesData[T]>} fields */
  find(fields) { return find(this.api, this.route, fields) }
  /** @param {IApiRoutesData[T]['id']} id */
  findById(id) { return findById(this.api, this.route, id) }
  /** @param {IApiRoutesData[T]} fields */
  create(fields) { return create(this.api, this.route, fields) }
}

export default CommonRoute
