/** @param {string} route */
export const guardEndSlash = (route, set=true) => {
  const isEndSlash = route.endsWith('/')
  if (!isEndSlash && set) route += '/'
  if (isEndSlash && !set) route = route.slice(0, route.length - 1)
  return route
}

/**
 * @param {`/${string}`} baseRoute
 * @param {number | string} id
 */
export const routerGet = (baseRoute, id) => guardEndSlash(baseRoute) + id

/** @param {`/${string}`} baseRoute */
export const routerGetAll = baseRoute => guardEndSlash(baseRoute, false)
export const routerPost = routerGetAll
export const routerDelete = routerGet
export const routerPut = routerGet
export const routerPatch = routerGet

/** @param {`/${string}`} baseRoute */
export const createRouter = baseRoute => {
  /** @param {number | string} id */
  const routeById = id => routerGet(baseRoute, id)

  return {
    get: routeById,
    getAll: () => routerGetAll(baseRoute),
    post: () => routerPost(baseRoute),
    delete: routeById,
    put: routeById,
    patch: routeById
  }
}

export default {
  get: routerGet,
  getAll: routerGetAll,
  post: routerPost,
  delete: routerDelete,
  put: routerPut,
  patch: routerPatch,
  create: createRouter
}
