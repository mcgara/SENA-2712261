import { useState, useEffect } from 'react'

/**
 * @template T
 * @template U
 * @param {() => Promise<T>} factory
 * @param {U} [initial]
 * @param {import('react').DependencyList} deps
 */
export function useAsyncValue(factory, initial, deps) {
  /** @type {T | U} */
  const initialState = initial
  
  const state = useState(initialState)
  const setValue = state[1]
  useEffect(() => { (async () => setValue(await factory()))() }, deps)

  return state
}

export default useAsyncValue
