import { createContext } from 'react'

/**
 * @typedef {{
 *   value: string | null,
 *   showValue: '0',
 *   result: number | null,
 *   showResult: '0'
 * }} DisplayValueContext
 * @type {import('react').Context<DisplayValueContext>}
 */
export const DisplayContext = createContext()

const displayValue = {
  value: null,
  showValue: '0',
  result: null,
  showResult: '0'
}

/** @param {import('react').PropsWithChildren} */
export function DisplayProvider({ children }) {
  return (
    <DisplayContext.Provider value={displayValue}>
      {children}
    </DisplayContext.Provider>
  )
}
