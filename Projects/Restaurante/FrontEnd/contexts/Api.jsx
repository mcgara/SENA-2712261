import { createContext } from 'react'
import EventEmitter from 'events'
import { useApiRoutes } from '../default'

/**
 * @typedef {import('../service/types').ApiRoutes} ApiRoutes
 * @typedef {import('../service/types').AllApiRoutes} AllApiRoutes
 * @typedef {import('../service/types').IApiRoutes} IApiRoutes
 * @typedef {(value: ApiRoutes | null) => void} SetApiRoutes
 * @typedef {'beforechange' | 'afterchange'} ApiEventNames
 * @typedef {import('../types').EventEmitter<ApiEventNames>} ApiEvents
 * @typedef {'SEARCH' | 'LIST' | 'CREATE' | 'UPDATE' | 'REPLACE' | 'DELETE'} ApiMode
 * @typedef {(value: ApiMode) => void} SetApiMode
 */

export const getApiRoute = (function () {
  const apiRoutes = Object.values(useApiRoutes).map(cb => cb())
  /**
   * @template {ApiRoutes} T
   * @param {T} route
   * @return {IApiRoutes[T]}
   */
  const handle = (route) => apiRoutes.find(value => value.route === route)
  return handle
})()

const route = {
  /** @type {AllApiRoutes | null} */
  value: null,
  /** @type {ApiEvents} */
  events: new EventEmitter(),
  /** @type {SetApiRoutes} */
  set: (value) => {
    route.events.emit('beforechange')
    route.value = getApiRoute(value) ?? null
    route.events.emit('afterchange')
  }
}

const mode = {
  /** @type {ApiMode} */
  value: 'LIST',
  /** @type {ApiEvents} */
  events: new EventEmitter(),
  /** @type {SetApiMode} */
  set: (value) => {
    mode.events.emit('beforechange')
    mode.value = value
    mode.events.emit('afterchange')
  }
}

const api = {
  route,
  mode
}

/** @typedef {typeof api} ApiContextValue */
export const ApiContext = createContext(api)

/**
 * @typedef {import('react').PropsWithChildren} ApiProviderProps
 * @type {import('react').FC<ApiProviderProps>}
 * @param {ApiProviderProps}
 */
export function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}

export default ApiContext
