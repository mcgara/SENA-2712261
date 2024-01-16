import { useState, useCallback, useEffect } from 'react'

/** @param {import('react').DependencyList} [deps] */
export function useUpdater(deps) {
  const [, update] = useState()
  const updater = useCallback(() => update({}), deps)
  return updater
}

/**
 * @typedef {() => void} Destructor
 * @param {(updater: () => void) => void | Destructor} effect
 * @param {import('react').DependencyList} [deps]
 */
export default function useForceUpdate(effect, deps) {
  const updater = useUpdater([])
  useEffect(() => effect(updater), deps)
}
